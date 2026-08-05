+++
draft = "true"
title = "Chorégraphie/Orchestration"
weight = 20
+++

> [!ressource] Ressources
> - [SAGA - Chorégraphie](https://microservices.io/post/sagas/2019/08/15/developing-sagas-part-3.html)
> - [SAGA - Orchestration](https://microservices.io/post/sagas/2019/08/15/developing-sagas-part-4.html)
> - [Chorégraphie vs Orchestration](https://camunda.com/blog/2023/02/orchestration-vs-choreography/)

Ce sont des implémentations du patron SAGA

## Chorégraphie (front controller pattern)

La chorégraphie utilise le même style de communication que l'architecture [Event Driven]({{% relref "../../../eventdriven" %}}). En d'autres termes, il n'existe pas de broker central dans cette architecture, nous travaillons au travers d'évènements.

Ainsi chaque service appelle les services nécessaires à la demande. Le principal effet négatif est l'ajout de complexité au niveau du service.

![choregraphie](../images/choregraphie.png?width=35pc)

## Orchestration

Une alternative consiste à avoir un médiateur local qui va englober la complexité et la coordination. Bien que ceci crée un couplage entre ces services, cela permet à l'architecte de concentrer la coordination sur un seul service, en laissant les autres moins affectés.

![orchestration](../images/orchestration.png?width=35pc)

## Quoi choisir ?

La première loi de l'architecture logicielle[^1] suggère qu'aucune de ces solutions n'est parfaite et que chacune présente des compromis.  
Le travail de l'architecte consiste à trouver le meilleur moyen de représenter ce couplage de manière à soutenir à la fois le domaine et les objectifs architecturaux.

[^1]: En Architecture Logicielle, tout est affaire de compromis (_tradeoff_)
