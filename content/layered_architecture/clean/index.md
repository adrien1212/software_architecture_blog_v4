+++
title = "Clean Archiecture"
weight = 30
+++

> [!ressource] Ressource
> - [The Beginner's Guide to Clean Architecture](https://youtu.be/TQdLgzVk2T8?list=PLYpjLpq5ZDGv370qMB4PLF-PlGdBhP0PA)
> - [Clean Architecture isn't understood by article authors](https://www.reddit.com/r/softwarearchitecture/comments/sjl9d1/clean_architecture_isnt_understood_by_article/)

> La Clean Architecture met l'accent sur la séparation des préoccupations et sur la dépendance des couches internes du système sur les couches externes. Elle favorise également l'indépendance des frameworks, des bibliothèques et des outils externes

Elle rend les systèmes logiciels maintenables, évolutifs et testables en isolant les détails d'implémentation dans les couches internes et en favorisant l'indépendance des couches externes.

> La Clean Architecture est _domain-centric_

![Alt text](layered_architecture/clean/images/clean.png)

## Composition

### Entités

L'entité ne dépend de rien, sauf éventuellement d'autres entités. Elle contient des données (état) et une logique réutilisables pour diverses applications. Elles sont le cœur de notre application.

### Cas d'utililisation

Les cas d'utilisation interagissent avec les entités (dépendent d'elles) et détiennent la logique de l'application spécifique. Les UseCase peuvent être lié à des librairies. Par exemple avec une couche d'accès aux données.

### Interface et Adaptateur

La couche d'adaptateur est une couche qui sert d'interface entre la logique métier (domaine) et les frameworks ou technologies externes tels que les bases de données, les services web, les systèmes de messagerie, accès aux bases de données, etc. Elle a pour rôle de traduire les données provenant de ces sources externes vers un format que la logique métier peut comprendre et utiliser, et vice versa.

### Librairies

Le cœur de l'application doit être indépendant des points d'entrée et des points de sortie (les librairies). En effet, si un framework ou une technologie externe ne répond plus aux besoins du système, il peut être remplacé facilement sans impacter la logique métier.

## Exemple

![Alt text](layered_architecture/clean/images/clean-example.png)
