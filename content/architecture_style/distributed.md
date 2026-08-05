+++
title = "Architectures Distribuées"
weight = 20
+++

> [!definition] Définition
>  A distributed architecture is a group of deployment units connected through remote access protocols.

## Avantages généraux

- Tolérance aux pannes : si un service s'effondre, le reste de l'application peut continuer à être utilisé
- Scalabilité : nous pouvons facilement scaler le service ayant une surcharge d'utilisation sans avoir à scaler l'application dans sa globalité
- Agilité : des équipes plus autonomes; on va pouvoir cloisonner les équipes, chacune travaillant sur un microservice (e.g. pas le même langage, pas la même organisation). La communication entre services se fera au travers d'interfaces (e.g. API Rest)

## Inconvénients généraux

Mais un système distribué a également de nombreux désavantages

- Mise en place compliquée : là où avec une architecture monolithique le déploiement se faisait sur un seul serveur, ici notre application est distribuée sur un ensemble de serveurs qu'il va falloir gérer
- Monitoring : nous devons nous assurer que l'ensemble des services, des serveurs et du réseau est opérationnel. Cela demande plus de travail que dans une architecture monolithique car nous gérons des réplicats sur une multitude de serveurs. Il faut une équipe dédiée pour maintenir l'architecture et le réseau
- Coût élevé : par conséquent, nous avons un coût plus élevé. On notera que certaines entreprises reviennent en arrière pour réduire leurs coûts (e.g. Prime Video sont passés du microservice au monolithe pour réduire leur coût de 90%)
