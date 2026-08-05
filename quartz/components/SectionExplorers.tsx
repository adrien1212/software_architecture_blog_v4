import { JSX } from "preact"
import { Explorer } from "@quartz-community/explorer"
import { normalizeResource } from "../util/resources"
import { classNames } from "../util/lang"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export interface ExplorerSection {
  /** stable id, used as the value of `data-section` and in localStorage */
  id: string
  /** label shown in the tab bar */
  title: string
  /** top-level content folders that belong to this section */
  folders: string[]
}

export interface SectionExplorersOptions {
  sections: ExplorerSection[]
  /** which section is shown when nothing else applies; defaults to the first */
  defaultSection?: string
  folderClickBehavior?: "collapse" | "link"
  folderDefaultState?: "collapsed" | "open"
  useSavedState?: boolean
  /** serialized to the client by the explorer, see quartz.ts */
  sortFn?: (a: unknown, b: unknown) => number
}

/**
 * The explorer serializes `filterFn` with toString() and re-evaluates it in the
 * browser, so the folder list has to be inlined in the function body rather than
 * captured from this scope.
 */
function makeSectionFilter(folders: string[]) {
  return new Function(
    "node",
    `const allowed = ${JSON.stringify(folders)}
if (node.slugSegment === "tags") return false
// the root node has no segments and must survive the filter
const segments = node.slugSegments || []
if (segments.length === 0) return true
// every descendant carries its top-level folder as its first segment
return allowed.indexOf(segments[0]) !== -1`,
  ) as (node: unknown) => boolean
}

const tabsScript = `
document.addEventListener("nav", (e) => {
  const container = document.querySelector(".section-explorers")
  if (!container) return

  const panels = [...container.querySelectorAll(".section-explorer-panel")]
  const tabs = [...container.querySelectorAll(".section-explorer-tab")]
  if (panels.length === 0) return

  const show = (id, persist) => {
    for (const panel of panels) {
      panel.dataset.active = String(panel.dataset.section === id)
    }
    for (const tab of tabs) {
      const active = tab.dataset.section === id
      tab.dataset.active = String(active)
      tab.setAttribute("aria-selected", String(active))
    }
    if (persist) {
      try {
        localStorage.setItem("sectionExplorer", id)
      } catch {}
    }
  }

  // the section owning the current page wins, so a link out of the active
  // section moves the tab bar with it
  const segment = (e.detail?.url || "").replace(/^\\/+/, "").split("/")[0]
  const owning = panels.find((panel) => {
    try {
      return JSON.parse(panel.dataset.folders || "[]").includes(segment)
    } catch {
      return false
    }
  })

  let saved = null
  try {
    saved = localStorage.getItem("sectionExplorer")
  } catch {}
  const known = panels.some((panel) => panel.dataset.section === saved)

  show(
    owning?.dataset.section ?? (known ? saved : container.dataset.defaultSection),
    Boolean(owning),
  )

  const cleanups = []
  for (const tab of tabs) {
    const onClick = () => show(tab.dataset.section, true)
    tab.addEventListener("click", onClick)
    cleanups.push(() => tab.removeEventListener("click", onClick))
  }
  window.addCleanup?.(() => cleanups.forEach((fn) => fn()))
})
`

const tabsStyle = `
.section-explorers {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  min-height: 0;
  flex: 0 1 auto;
}

.section-explorer-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
  flex-shrink: 0;
}

button.section-explorer-tab {
  font-family: var(--headerFont);
  font-size: 0.8rem;
  line-height: 1.2;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--lightgray);
  border-radius: 4px;
  background-color: transparent;
  color: var(--darkgray);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

button.section-explorer-tab:hover {
  color: var(--secondary);
  border-color: var(--gray);
}

button.section-explorer-tab[data-active="true"] {
  color: var(--light);
  background-color: var(--secondary);
  border-color: var(--secondary);
}

.section-explorer-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.section-explorer-panel[data-active="false"] {
  display: none;
}

/* each section already has its name in the tab bar */
.section-explorer-panel .explorer button.desktop-explorer {
  display: none;
}

.section-explorer-panel .explorer .explorer-content {
  margin-top: 0;
}

@media all and (max-width: 800px) {
  .section-explorers {
    order: -1;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
    margin-top: auto;
    margin-bottom: auto;
  }

  .section-explorer-tabs {
    margin-bottom: 0;
    flex-wrap: nowrap;
  }

  button.section-explorer-tab {
    font-size: 0.7rem;
    padding: 0.15rem 0.35rem;
  }
}
`

export default ((opts: SectionExplorersOptions) => {
  const sections = opts.sections
  const defaultSection = opts.defaultSection ?? sections[0]?.id

  const explorers = sections.map((section) =>
    Explorer({
      title: section.title,
      folderClickBehavior: opts.folderClickBehavior ?? "link",
      folderDefaultState: opts.folderDefaultState ?? "collapsed",
      useSavedState: opts.useSavedState ?? true,
      sortFn: opts.sortFn as never,
      filterFn: makeSectionFilter(section.folders) as never,
    }),
  )

  const SectionExplorers: QuartzComponent = (props: QuartzComponentProps) => (
    <div
      class={classNames(props.displayClass, "section-explorers")}
      data-default-section={defaultSection}
    >
      <div class="section-explorer-tabs" role="tablist">
        {sections.map((section) => (
          <button
            type="button"
            role="tab"
            class="section-explorer-tab"
            data-section={section.id}
            data-active={String(section.id === defaultSection)}
            aria-selected={section.id === defaultSection}
          >
            {section.title}
          </button>
        ))}
      </div>
      {sections.map((section, i) => {
        const SectionExplorer = explorers[i] as (props: QuartzComponentProps) => JSX.Element
        return (
          <div
            class="section-explorer-panel"
            data-section={section.id}
            data-folders={JSON.stringify(section.folders)}
            data-active={String(section.id === defaultSection)}
          >
            <SectionExplorer {...props} displayClass={undefined} />
          </div>
        )
      })}
    </div>
  )

  // The explorers are rendered as children rather than sitting in the layout, so
  // their css/scripts are not collected for us. Each instance ships the same
  // shared explorer script plus a per-instance overflow script (joined with a
  // newline); splitting them keeps the shared part from being emitted 3 times,
  // which would register the nav handler 3 times.
  const css = new Set<string>([tabsStyle])
  const scripts = new Set<string>()
  for (const explorer of explorers) {
    for (const c of normalizeResource(explorer.css)) css.add(c)
    for (const script of normalizeResource(explorer.afterDOMLoaded)) {
      const split = script.indexOf("\n")
      if (split === -1) {
        scripts.add(script)
        continue
      }
      scripts.add(script.slice(0, split))
      scripts.add(script.slice(split + 1))
    }
  }
  scripts.add(tabsScript)

  // marks this as an already-instantiated component so the layout builder uses
  // it as-is instead of treating it as a constructor
  SectionExplorers.displayName = "SectionExplorers"
  SectionExplorers.css = [...css]
  SectionExplorers.afterDOMLoaded = [...scripts]
  return SectionExplorers
}) satisfies QuartzComponentConstructor<SectionExplorersOptions>
