+++
title = "Subdomain vs BC"
weight = 50
+++

> [!Ressource] Ressource
> - [StackOverflow](https://stackoverflow.com/questions/73077578/what-actually-is-a-subdomain-in-domain-driven-design/73080428#73080428)
> - [The difference between domains, subdomains and bounded contexts](https://ddd-practitioners.com/2023/03/07/the-difference-between-domains-subdomains-and-bounded-contexts/)

> [!warning] Note
> It’s crucial to remember that subdomains are discovered and bounded contexts are designed.

Il faut se rappeler que les sous-domaines sont une partie du métier de l'organisation et existent naturellement dans l'organisation indépendamment de la modélisation logicielle. Il en existe trois types : *Core* qui représente notre valeur ajoutée, *Supporting* qui soutient le core mais sans y apporter un avantage compétitif et finalement *Generic* qui correspond à des solutions que tout le monde utilise (e.g. Keycloak pour l'authentification).

Tandis que les *Bounded Context* sont une solution technique et architecturale qui encapsule un modèle cohérent où l'on partage le même Langage Ubiquitaire (Ubiquitous Language), ses propres entités et règles métiers. Chaque BC est un service/projet qui peut être implémenté, versionné et évoluer indépendamment des autres BC.

## Relations entre les deux
- Idéalement, on vise une relation 1:1 entre sous-domaines et bounded contexts
- Un sous-domaine peut être implémenté par un ou plusieurs bounded contexts lorsqu'il est complexe


Par exemple le sous-domaine Paiements peut avoir trois Bounded Contexts :
  - Bounded Context 1 : Paiements en ligne
  - Bounded Context 2 : Traitement des remboursements
  - Bounded Context 3 : Détection de la fraude

Où la notion de `Transaction` dans le BC1 représente une opération de paiement initiée par un utilisateur via une plateforme de paiement (ex: Stripe, PayPal). Tandis que dans le BC3 cela représente un événement d’activité financière (paiement, remboursement, retrait, etc.) observé pour détection de comportement suspect, elle peut être enrichie de métadonnées (IP, localisation, device).