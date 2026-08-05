+++
draft = "true"
title = "Clean Architecture"
weight = 30
+++

> [!ressource] Ressource
> - [The Beginner's Guide to Clean Architecture](https://youtu.be/TQdLgzVk2T8?list=PLYpjLpq5ZDGv370qMB4PLF-PlGdBhP0PA)
> - [Clean Architecture isn't understood by article authors](https://www.reddit.com/r/softwarearchitecture/comments/sjl9d1/clean_architecture_isnt_understood_by_article/)

> La Clean Architecture met l'accent sur la séparation des préoccupations et sur l'indépendance des couches internes du système vis-à-vis des couches externes. Elle favorise également l'indépendance des frameworks, des bibliothèques et des outils externes

Elle rend les systèmes logiciels maintenables, évolutifs et testables en isolant les détails d'implémentation dans les couches internes et en favorisant l'indépendance des couches externes.

> La Clean Architecture est _domain-centric_

![Alt text](images/clean.png?width=40pc)

## 4 patterns derrière la Clean Architecture
> [!ressource] Ressource
> - [Les effets indésirables de nos Clean Archis  12:50](https://youtu.be/tZMPOnE2fSE)


## Composition

### Entités

L'entité ne dépend de rien, sauf éventuellement d'autres entités. Elle contient des données (état) et une logique réutilisables pour diverses applications. Elles sont le cœur de notre application.

### Cas d'utilisation

Les cas d'utilisation interagissent avec les entités (dépendent d'elles) et détiennent la logique de l'application spécifique. Les UseCase peuvent être liés à des bibliothèques. Par exemple avec une couche d'accès aux données.

### Interface et Adaptateur

La couche d'adaptateur est une couche qui sert d'interface entre la logique métier (domaine) et les frameworks ou technologies externes tels que les bases de données, les services web, les systèmes de messagerie, l'accès aux bases de données, etc. Elle a pour rôle de traduire les données provenant de ces sources externes vers un format que la logique métier peut comprendre et utiliser, et vice versa.

### Bibliothèques

Le cœur de l'application doit être indépendant des points d'entrée et des points de sortie (les bibliothèques). En effet, si un framework ou une technologie externe ne répond plus aux besoins du système, il peut être remplacé facilement sans impacter la logique métier.

## Exemple

![Alt text](images/clean-example.png)
