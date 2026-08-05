+++
draft = "true"
title = "Microkernel (Plugin)"
weight = 20
alwaysopen = false
+++

> [!ressource] Ressources
> - [Lesson 160 - Microkernel Architecture](https://www.youtube.com/watch?v=rDDsP1hqKa4)
> - [https://www.oreilly.com/library/view/software-architecture-patterns/9781098134280/ch04.html](https://www.oreilly.com/library/view/software-architecture-patterns/9781098134280/ch04.html)

L'architecture microkernel permet à un développeur ou à un utilisateur final d'ajouter facilement des fonctionnalités et des caractéristiques supplémentaires à une application existante sous la forme d'extensions sans avoir d'impact sur la fonctionnalité de base du système.

Cette architecture vise à maintenir le noyau du système (kernel) aussi petit et simple que possible (micro), en déléguant la plupart des fonctionnalités à des processus tiers.

## Composition
Une application microkernel se décompose en deux composants : le cœur applicatif et des plugins qui gravitent autour. Généralement le cœur applicatif contient les fonctionnalités minimales pour rendre le système opérationnel. 

![microkernel](https://www.oreilly.com/api/v2/epubs/9781098134280/files/assets/sap2_0401.png?width=30pc)

L'IDE Eclipse peut être vu comme une architecture microkernel. Nous avons l'éditeur puis plusieurs plugins qui peuvent venir se greffer à l'IDE suivant les besoins de l'utilisateur.

### Plugins
Les plugins devraient être indépendants les uns des autres (standalone), et chaque plugin contient un traitement spécialisé, des fonctionnalités supplémentaires destinées à améliorer ou à étendre le système.


### Kernel
Le cœur applicatif doit être capable de connaître l'ensemble des plugins disponibles (voir [la communication]({{% relref "communication.md" %}}))

