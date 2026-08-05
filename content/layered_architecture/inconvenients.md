+++
title = "Inconvénients"
weight = 10
+++

> [!ressource] Ressource
> - 🚩 [Layered Architecture Disadvantages + intro to Onion, Clean and Hexagonale](https://www.happycoders.eu/software-craftsmanship/hexagonal-architecture/)
> - [Why You Should NOT Implement Layered Architectures](https://blog.jooq.org/why-you-should-not-implement-layered-architecture/)
> - [Domain-Driven Design (DDD) and Hexagonal Architecture in Java](https://vaadin.com/blog/ddd-part-3-domain-driven-design-and-the-hexagonal-architecture)

## Couplage

> The biggest offender (and most common) is the coupling of UI and business logic to data access.  Yes, UI is coupled to data access with this approach.  Transitive dependencies are still dependencies. [^1]

> For example, it is not uncommon for errors to occur because an attempt is made in the presentation layer to iterate over an uninitialized one-to-many collection of a JPA entity. And so we have to worry about technical issues such as transactions and lazy and eager loading in the business layer. [^2]

Dans une architecture en couches classique, l'infrastructure est au cœur des préoccupations : toutes les dépendances convergent vers elle (*data-driven design*). Pourtant, la véritable valeur d'un logiciel réside dans son domaine métier. Il est donc essentiel de repenser cette architecture afin qu'elle soit orientée autour du cœur métier, et non l'inverse.

> The fundamental rule is that all code can depend on layers more central, but code cannot depend on layers further out from the core.  In other words, all coupling is toward the center.   This architecture is unashamedly biased toward object-oriented programming, and it puts objects before all others.

## Changement Multi-couches
>  Although the layers can be designed to be independent, a requirement change may require changes in multiple layers. This type of coupling lowers the overall agility of the software application. [^3]

Ceci nous permet rebondir sur l'importance de la [structure organisationnelle]({{< relref "software_architecture/architect_role/organization" >}}). Avec des couches distinctes il devient très facile de créer involontairement des silos organisationnels en divisant les équipes selon les couches techniques : une équipe front-end, une équipe back-end et une équipe DBA.


## Axes d'amélioration
Ce qui nous amène à plusieurs patrons architecturaux
- Onion Architecture
- Hexagonale Architecture
- Clean Architecture

[^1]: https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/
[^2]: https://www.happycoders.eu/software-craftsmanship/hexagonal-architecture/`
[^3]: https://www.oreilly.com/library/view/software-architects-handbook/9781788624060/5433901e-3197-42b2-9de4-e5b21ae3a5b5.xhtml