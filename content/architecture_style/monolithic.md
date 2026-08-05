+++
title = "Architectures Monolithiques"
weight = 10
+++

> [!definition] Définition
>  In Monolith Architecture, our system consists of exactly one piece of executable code and nothing more.

C'est l'architecture originale des logiciels. Avec l'architecture monolithique tous les composants logiciels sont exécutés dans un seul processus (même mémoire, thread).

## Inconvénients généraux

- Déployabilité (faible) : L'ensemble de l'application ou du site web doit être déployé en une seule unité, ce qui rend les déploiements fréquents difficiles. Même le plus simple des changements nécessite une construction et un déploiement complets de l'ensemble de l'application. Les cycles de développement sont donc extrêmement longs (tout retester, tout packager, tout redéployer).

- Tolérance aux pannes (faible) : Du à son caractère monolithique si une partie de l'architecture provoque une erreur hors mémoire, l'ensemble de l'unité d'application est affectée et tombe en panne.

- Scalabilité (faible) : peu de choses peuvent être faites après le déploiement pour réagir à une augmentation de la charge.

- Élasticité (faible) : comme pour la scalabilité, ce style d'architecture ne peut pas répondre aux pics d'utilisation au-delà de sa capacité intégrée.

- Couplage (fort) : les classes sont fortement couplées. Par exemple, il n'y a pas d'API standardisée permettant d'assurer un découplage. Ainsi, un petit changement à un endroit peut impacter un composant.

- Partage (faible) : une application monolithique n'expose rien à d'autres applications, pas d'API externe ou de listener.

- Une seule plateforme technologique : comme c'est un seul processus, on ne peut pas développer une partie en Java et l'autre en Python.
  Or un langage n'est pas forcément adapté pour tout (Python pour logiciel lourd et Java pour Machine Learning). De plus, si notre application utilise Java 8 et que nous souhaitons passer à Java 11 nous devrons migrer toute l'application.
