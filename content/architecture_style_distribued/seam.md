+++
linkTitle = "Notion de Seam"
title = "Notion de Seam"
weight = 5
+++

## Problème du Monolithe

Nous voulons que nos services soient *[highly cohesive and loosely coupled]({{% relref "../../characteristics/couplage_and_cohesion" %}})*. Le problème du monolithe est qu'il est trop souvent l'opposé de ces deux caractéristiques.
- Plutôt que de tendre vers la cohésion et de garder ensemble des choses qui ont tendance à changer ensemble, nous acquérons et collons ensemble toutes sortes de codes sans rapport les uns avec les autres. 
- De même, le couplage faible n'existe pas vraiment : si je veux modifier une ligne de code, je devrais pouvoir le faire assez facilement, mais, en réalité, je ne peux pas déployer cette modification sans avoir un impact potentiel sur une grande partie du reste du monolithe. Je devrai certainement redéployer l'ensemble du système.

### Concept de Seam
> [!danger] Définition
>  Seam : une partie du code qui peut être traitée de manière isolée et sur laquelle on peut travailler sans avoir d'impact sur le reste du système

Dans son livre Working Effectively with Legacy Code (Prentice-Hall), Michael Feathers
définit le concept de *Seam*.  Nous voulons donc identifier les *seams* qui peuvent devenir des *[service boundaries]({{% relref "../../basics_for_modeling/bounded_context" %}})*

Ainsi les *bounded context* sont de bons *seams* car par définition ils représentent un ensemble cohérent et faiblement couplé.
