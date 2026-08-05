+++
draft = "true"
title = "SAGA"
weight = 15
+++

> [!ressource] Ressources
> - [https://microservices.io/patterns/data/saga.html](https://microservices.io/patterns/data/saga.html)
> - [https://www.baeldung.com/cs/saga-pattern-microservices](https://www.baeldung.com/cs/saga-pattern-microservices)

Le patron SAGA permet de gérer les transactions en utilisant une séquence de transactions locales de microservices. Chaque microservice possède sa propre base de données et peut gérer les transactions locales de manière atomique avec une cohérence stricte.

Ce patron peut être implémenté à la fois avec une _Choreography-based_ et avec une _Orchestration-based_ (voir [les ressources](https://microservices.io/patterns/data/saga.html))

Ici nous nous concentrons sur l'explication théorique de son fonctionnement.

1. Le service `médiateur` reçoit une requête
2. Il effectue une requête vers le service `CreditCardWallet`
3. Qui lui retourne une réponse pour signifier que la demande est _enregistrée_
4. Le service `médiateur` envoie également une requête vers le service `CustomerProfile`
5. Mais une **erreur se produit**
6. Le service `médiateur` rollback donc la demande _enregistrée_ en 3) pour revenir à un état stable
7. L'utilisateur est informé d'une erreur

Si à l'étape 5) nous avions eu un succès de l'étape, alors les demandes _enregistrées_ auraient été validées (commit)

![SAGA](images/SAGA.png?width=35pc)
