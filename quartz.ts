import fs from "fs"
import path from "path"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import SectionExplorers from "./quartz/components/SectionExplorers"
import { slugifyFilePath } from "./quartz/util/path"
import type { FilePath } from "./quartz/util/path"

// Explorer ordering is driven by the `weight` frontmatter property.
// The explorer builds its tree in the browser from static/contentIndex.json,
// which only carries a fixed set of fields (slug, title, links, tags, ...) —
// `weight` never reaches the client. So the weights are read from disk here at
// config load time and baked into the sort function below.
const contentDir = "content"
const weights: Record<string, number> = {}

function collectWeights(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      collectWeights(fp)
      continue
    }

    if (!entry.name.endsWith(".md")) continue
    // matches both toml (+++) and yaml (---) frontmatter, tolerating trailing
    // whitespace on the delimiter lines
    const frontmatter = fs
      .readFileSync(fp, "utf8")
      .match(/^\s*(\+\+\+|---)[^\S\r\n]*\r?\n([\s\S]*?)\r?\n[^\S\r\n]*\1/)
    const weight = frontmatter?.[2].match(/^[^\S\r\n]*weight\s*[:=]\s*(-?\d+)/m)?.[1]
    if (weight === undefined) continue

    const relative = path.relative(contentDir, fp).split(path.sep).join("/")
    weights[slugifyFilePath(relative as FilePath)] = Number(weight)
  }
}

if (fs.existsSync(contentDir)) {
  collectWeights(contentDir)
}

// `sortFn` is serialized with toString() and re-evaluated in the browser, so the
// weight table has to be inlined in the function body rather than captured.
const sortByWeight = new Function(
  "a",
  "b",
  `const weights = ${JSON.stringify(weights)}
const weightOf = (node) => {
  const slug = node.data && node.data.slug
  return slug in weights ? weights[slug] : Infinity
}

// lower weight first, ties fall back to alphabetical order
const weightA = weightOf(a)
const weightB = weightOf(b)
if (weightA !== weightB) return weightA - weightB
return a.displayName.localeCompare(b.displayName, undefined, {
  numeric: true,
  sensitivity: "base",
})`,
) as (a: unknown, b: unknown) => number

// Three section explorers replace the single explorer plugin. A yaml plugin
// entry can only be declared once and cannot carry functions, so the component
// is built here and registered under the "explorer" key — the layout builder
// resolves the explorer entry in quartz.config.yaml to whatever is registered
// under that name, and the plugin loader will not overwrite an existing entry.
const sectionExplorers = SectionExplorers({
  sections: [
    {
      id: "architecture",
      title: "Architecture",
      folders: [
        "software_architecture",
        "fundamental_principles",
        "software_characteristics",
        "architecture_style",
        "architecture_style_monolithic",
        "architecture_style_distribued",
        "layered_architecture",
        "modular_monolithic",
        "architecture_pattern",
        "architecture_measure",
        "architecture_antipattern",
        "commun_antipattern",
        "resources",
      ],
    },
    {
      id: "ddd",
      title: "DDD",
      folders: ["domain_driven_design", "domain_driven_design_example"],
    },
  ],
  folderClickBehavior: "link",
  folderDefaultState: "open",
  useSavedState: true,
  sortFn: sortByWeight,
})

// keyed under every name the layout builder may derive from the `source` field,
// so it works whether the explorer is configured as "@quartz-community/explorer"
// or as "github:quartz-community/explorer"
for (const key of ["@quartz-community/explorer", "explorer", "Explorer"]) {
  componentRegistry.register(key, sectionExplorers, "quartz.ts")
}

const config = await loadQuartzConfig()

// The plugin loader also registers the raw explorer under a fully-qualified key
// ("<plugin>/Explorer"), which it does unconditionally. That entry is picked up
// when component css/scripts are collected, so it would ship a second copy of
// the explorer script and double up its click handlers. Point it at the section
// explorers too. Re-using the existing source keeps the registry from warning
// about an overwrite.
for (const [key, entry] of componentRegistry.getAll()) {
  if (entry.component === sectionExplorers) continue
  if (/(^|\/)explorer$/i.test(key)) {
    componentRegistry.register(key, sectionExplorers, entry.source)
  }
}

export default config
export const layout = await loadQuartzLayout()
