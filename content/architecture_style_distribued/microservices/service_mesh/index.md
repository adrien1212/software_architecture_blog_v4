+++
draft = "true"
title = "Service Mesh"
weight = 40
+++

> [!ressource] Ressources
> - [https://dzone.com/articles/the-service-mesh-in-the-microservices-world](https://dzone.com/articles/the-service-mesh-in-the-microservices-world)
> - [https://www.nginx.com/blog/what-is-a-service-mesh/](https://www.nginx.com/blog/what-is-a-service-mesh/)

Quand vous avez de plus en plus de services, il peut devenir très compliqué de gérer l'ensemble des communications inter-services.

## Problématique

Les microservices communiquent énormément entre eux, par conséquent de nombreux problèmes peuvent survenir :

- Timeout
- Securité
- Rejouer

### Première approche

En conséquence, les développeurs ont fini par utiliser des bibliothèques et des composants tiers tels qu'Eureka, Ribbon, Hystrix pour fournir ces fonctionnalités communes supplémentaires : service discovery, load balancing, circuit breaker, logging, etc.

![without_service_mesh](images/without_service_mesh.png?width=20pc)

Mais avec cette approche, notre logique métier et la configuration sont fortement couplées. La complexité augmente et il peut vite devenir compliqué de maintenir toute cette architecture sur plusieurs dizaines de microservices.

## Service Mesh

> [!danger] Définition
>  Un Service Mesh est un ensemble de composants logiciels que l'on positionne à côté du microservice et qui gèrent l'ensemble des communications inter-services.

Le Service Mesh est un service dédié qui va gérer l'ensemble des communications inter-services :

- Load balancing
- Découverte de services (Service discovery)
- Vérifications de santé (Health checks)
- Authentification (Authentication)
- Traffic management and routing
- Circuit breaking and failover policy
- Security and policy management
- Metrics and telemetry
- Fault injection

Par conséquent, l'ensemble des microservices ne communiquent maintenant qu'avec le Service Mesh. En général, le pattern Sidecar est utilisé pour mettre en œuvre le Service Mesh, c'est-à-dire que le Service Mesh est déployé à côté (et non avec) de la logique métier.

![Service Mesh](images/service_mesh.png?width=35pc)

### Aller un peu plus loin

Tous les Service Mesh sont gérés de manière centralisée par un Control Panel. Ceci est très utile pour soutenir les capacités de maillage de services : contrôle d'accès, l'observabilité, la découverte de services, etc.

![service mesh control panel](https://www.nginx.com/wp-content/uploads/2019/02/service-mesh-generic-topology_social.png?width=50pc)
