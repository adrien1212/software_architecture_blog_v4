+++
title = "Idempotence"
weight = 45
+++

> [!ressource] Ressource
> https://fr.wikipedia.org/wiki/Idempotence

L'idempotence est la propriété d'une opération qui garantit que l'exécution de la même action plusieurs fois produit le même résultat que si elle était effectuée une seule fois.

Dans le contexte des API, cela signifie qu'un client peut envoyer la même requête plusieurs fois sans provoquer de conséquences involontaires, telles que des doublons ou des effets secondaires répétés.

## Exemple
Lorsqu'un utilisateur initie un paiement en ligne mais subit un délai d’expiration en raison de problèmes de réseau, l'API de paiement est appelée à nouveau dans le cadre du mécanisme de réessai. Sans idempotence, l'utilisateur pourrait être facturé plusieurs fois pour la même transaction.

Un client ajoute des articles à son panier et passe une commande. Cependant, en raison d'une connexion Internet lente, il appuie plusieurs fois sur le bouton « Passer la commande ». Sans idempotence, plusieurs commandes identiques pourraient être créées, entraînant des expéditions en double et une mauvaise gestion des stocks.

## Importance de l'idempotence pour la fiabilité et la cohérence
- Les problèmes de réseau peuvent entraîner l'échec ou l'expiration des requêtes API. Dans ces cas, les clients réessayent souvent les requêtes pour s'assurer que l'opération réussit. Sans idempotence, ces réessais peuvent entraîner des doublons indésirables ou une corruption des données.
- Les opérations idempotentes aident à gérer les conditions de concurrence où plusieurs requêtes peuvent être traitées simultanément.
- L'idempotence apporte prévisibilité et stabilité, garantissant que les utilisateurs ne rencontrent pas de résultats incohérents ou erronés.