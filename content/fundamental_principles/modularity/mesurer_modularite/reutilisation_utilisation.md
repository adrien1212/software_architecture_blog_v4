+++
title = "Utilisation/Réutilisation Paradoxe"
weight = 30
+++

## Le paradoxe

Le paradoxe se résume en

> [!danger] Définition
>  _Ce qui est facile à utiliser est difficile à réutiliser. Ce qui est facile à réutiliser est difficile à utiliser._

En essayant de rendre le code plus réutilisable (plus générique, plus abstrait, plus personnalisable), nous le rendons plus difficile à utiliser. En effet ce module/bibliothèque devra être adapté pour notre contexte et pour chaque contexte individuellement.
D'autre part, lorsque nous rendons le code plus utilisable (plus adapté à un contexte spécifique), nous le rendons moins réutilisable.

## Fine-grained/Lightweight module

Le fait de viser des modules [Fine-grained et Lightweight]({{< relref "fundamental_principles/modularity/mesurer_modularite/index" >}}) permet d'avoir

- des modules facilement réutilisables
- une compréhension du système simplifié

Mais si nous sommes trop fin et trop léger

- nous obtenons une explosition du nombre de module et donc de dépendances inter-modules
- donc un énorme travail de configuration inter-module
- et plus nous avons de dépendances plus nos modules deviennent complexes et difficilement utilisables
- donc un changement dans un module peut impacter plusieurs autres modules

> [!note] Note
>  Maximiser la réutilisation complique l'utilisation

## Coarse-grained/Heavyweight module

Le fait de viser des modules [Coarse-grained et Heavyweight]({{< relref "fundamental_principles/modularity/mesurer_modularite/index" >}}) permet :

- de diminuer le nombre de dépendances inter-modules
- de maintenir le changement dans un seul module
- la configuration ne se fait que à un seul endroit

Mais en contre-partie

- nous diminuons la réutilisation de notre module
- il peut fournir plus que nécessaire au client
- et il devient plus compliqué à comprendre et l'impact d'un changement peut être difficile à analyser

## Conclusion

La clé est de trouver le bon équilibre dans la tension utilisation/réutilisation.
