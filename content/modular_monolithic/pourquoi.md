+++
draft = true
title = "Pourquoi ?"
weight = 10
+++

> [!ressource] Ressources
> - [Monolithe vs Microservices - Il existe des solutions intermédiaires](https://youtu.be/YwxSPmaW2SQ?t=655)


## Rappels
- L'architecture monolithe à pour principals défauts de ne pas avoir de *bounded context* bien définis et d'être difficilement scalable. 
- L'architecture microservices vient avec un besoin le besoin de scalabité. Mais créer un ensemble de microservices implique un coût extrêmement élevé pour leur gestion :
  - la surveillance
  - l'alerte
  - la gestion des versions
  - l'authentification et l'autorisation
  - le déploiement
  - exigences d'idempotence
  - etc ...

On notera également un coût de déploiement important :
- Plusieurs pipeline de déploiement
- Infrastructure pour répliquer les services

L'architecture microservice nécessite donc une équipe correctement dimensionnée (pour ne pas dire nombreuse) pour être capable d'absorber ce travail supplémentaire.

## L'arrivé du Modular Monolithe
L'architecture *Modular Monilithe* propose de garder la simplicité d'un déploiement d'une seule instance tout en découpant notre produit suivant les *Bounded Context*. Ainsi cette alternative est fortement envisageable si notre système n'a pas besoin de scalabilité (avantage principal du microservice).

### Monolithe vers Modular Monolithe

> [!note] Note
> Qu'on souhaite réaliser du Microservice ou du Modular Monolithe la première étape consiste à bien définir les Bounded Context. Si cette étape est mal réalisé nous obtiendrons un "Distribued Monolith"

- En suivant une approche DDD on identifie les Bounded Context  

### Modular Monolithe vers Microservice
- Chaque module sera un candidat idéal pour devenir un microservice indépendant dans le futur.
- Les interfaces pour évoluer en contrat (e.g. REST API) entre des microservices déployable indépendamment.
