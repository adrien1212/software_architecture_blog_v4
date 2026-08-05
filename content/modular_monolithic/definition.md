+++
title = "Définition"
weight = 15
+++

> [!ressource] Ressources
> - [Modular Monolith: A Primer](https://www.kamilgrzybek.com/blog/posts/modular-monolith-primer)
> - [Shopify - Deconstructing the Monolith: Designing Software that Maximizes Developer Productivity](https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity#)

Tout d'abord, je vous invite à lire la section dédiée à la [Modularité]({{< relref "fundamental_principles/modularity/index" >}}), où nous avons noté les caractéristiques d'un module
- doivent être indépendants et interchangeables et
- doivent disposer de tout ce qui est nécessaire pour fournir la fonctionnalité souhaitée
- doit avoir une interface définie

Dans le même article qui a donné les caractéristiques précédentes - [Modular Monolith: A Primer](https://www.kamilgrzybek.com/blog/posts/modular-monolith-primer), Kamil Grzybek nous donnes les définitions suivantes.

> Monolith is nothing more than a system that **has exactly one deployment unit**. No less no more.

> Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.

- Une seule unité de déploiement (== *monolithe*)
- Respecte la notion et les caractéristique des *modules*

Ainsi [Simon Brown définit](https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity#) l'architecture Modular Monolithique

> [!danger] Définition
>  A modular monolith is a system where all of the code powers a single application and there are strictly enforced boundaries between different domains.
