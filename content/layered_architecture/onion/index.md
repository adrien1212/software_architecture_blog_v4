+++
title = "Architecture en Onion"
weight = 20
+++

> [!ressource] Ressources
> - [Source primaire - Jeffrey Palermo](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
> - [Onion Architecture - The Software Architecture Chronicles](https://herbertograca.com/2017/09/21/onion-architecture/)
> - [Onion Architecture](https://medium.com/expedia-group-tech/onion-architecture-deed8a554423)

Comme expliqué dans [Se centrer sur le domaine]({{< relref "layered_architecture/domain_centric#pourquoi-est-ce-important-" >}}) nous cherchons à ne pas avoir de couplage entre le coeur applicatif et les applications tierces (e.g. BDD).

## L'architecture

> [!definition] Règle
> The fundamental rule is that all code can depend on layers more central, but code cannot depend on layers further out from the core.

![onion](layered_architecture/onion/images/onion_architecture.png)

### Application Core
En fonction de la complexité et des besoins le coeur applicatif peut être composé d'autant de couches que nécessaire. Classiquement on retrouve les trois couches du diagramme ci-dessus. Et en prêtant attention aux noms de ces couches, on remarque immédiatement un fort lien avec les concepts du DDD.
- Le [Domain Model]({{< relref "domain_driven_design/implement_business_logic/domain_model/index" >}}) qui représente les concepts métiers, leurs attributs et leurs comportements (Entités, Aggregates et Value Object)
- Le [Domain Service]({{< relref "domain_driven_design/implement_business_logic/domain_service" >}}) quand de la logique métier ne dépend pas que d'une seule entité
- Et l’[Application Service]({{< relref "domain_driven_design/implement_business_logic/application_service" >}}) qui sert d'interface entre le monde extérieur (e.g. BDD) et le domaine métier

=> Nous pouvons nous appuyez sur le DDD pour implémenter la coeur applicatif de notre application

### Communiquer avec l'extérieur
Puis pour communiquer avec l'extérieur, nous nous appuyons sur la notion d'[Adapter]({{< relref "design_patterns/adapter/" >}})

> Hexagonal architecture and Onion Architecture share the following premise: Externalize infrastructure and write adapter code so that the infrastructure does not become tightly coupled.[^1]

[^1]: https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/