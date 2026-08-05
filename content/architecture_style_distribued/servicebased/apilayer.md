+++
draft = "true"
title = "Api Layer"
weight = 20
+++

> [!ressource] Ressources
> - [6 More Microservices Interview Questions - question 1](https://blog.bytebytego.com/p/6-more-microservices-interview-questions)
> - [API Gateway](https://microservices.io/patterns/apigateway.html)

Nous pouvons ajouter une couche "API Layer" qui va faire office de _reverse proxy_ ou de _gateway_ entre nos services et l'interface utilisateur.

![Alt text](../images/api_layer.png)

## API Gateway

> In a microservices architecture, an API gateway acts as a single entry point for client requests. The API gateway is responsible for request routing, composition, and protocol translation. It also provides additional features like authentication, authorization, caching, and rate limiting.

[api gateway](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F82be2aaf-c292-481e-b8d5-d47cbe9e64d7_1243x1600.png)

## Pourquoi l'utiliser ?

L'avantage de cette pratique est qu'elle abstrait notre système derrière un "mur". Les systèmes externes communiquent avec nos services uniquement au travers de la couche API. Cette couche peut par exemple s'assurer que l'utilisateur a le droit de consulter la ressource (authentification et autorisation).

1. L'utilisateur envoie une requête au service de Commande
2. La couche API Layer contacte le service d'Authentification
3. Le service d'authentification retourne une réponse autorisant ou non l'accès (e.g. vérifier si l'utilisateur saisi est le bon)
4. Si l'authentification est réussie, alors la couche API Layer transmet la requête au service Commande. Dans le cas contraire, l'API Layer ne contacte pas le service et retourne un code d'erreur au client (e.g. mot de passe incorrect)

> On retrouve un fonctionnement similaire avec la bibliothèque [Spring Cloud Gateway](https://spring.io/blog/2019/08/16/securing-services-with-spring-cloud-gateway)

## Rate Limiter

Il est parfois souhaité de limiter le nombre de connexions d'une adresse IP ou d'un utilisateur sur le serveur. Pour ce faire, on utilise un Rate Limiter. Cet outil peut être mis en place sur le serveur ou sur une couche intermédiaire (middleware) entre le client et le serveur

![ratelimiter](../images/ratelimiter.png)

De plus, si nous avons une architecture microservice possédant une API Gateway qui gère l'authentification, etc. nous pouvons y rajouter le Rate Limiter. Si une requête atteint le nombre limite de demandes, alors une erreur 429 (Too Many Requests) est renvoyée.
