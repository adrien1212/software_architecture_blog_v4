+++
title = "Se centrer sur le domaine"
weight = 15
+++

Dans la section précédente [inconvenients]({{< relref "inconvenients" >}}) nous avons vu que l'architecture en couche classique présente des inconvénients. Les patrons architecturaux *Clean Architecture*, *Hexagonale Architecture* et *Onion Architecture* présentent des caractéristiques communes

## Centré sur le domaine
Le concept le plus important est qu'elles soient centrées sur le *domaine métier*. Là où l'architecture en couche nous pointons vers la base de données, ici nous inversons les dépendances pour que le *domaine métier* (aka coeur applicatif) soit au centre de nos architectures.

> In contrast to the hexagonal architecture (here in its original representation by Alistair Cockburn without explicit ports), the layered architecture does not focus on the business logic but on the database [^1]

![hexa vs layered](layered_architecture/images/hexa_vs_layered.png)

Et ces trois architecture *Clean*, *Hexagonale* et *Onion* partage ce même principe malgré des différences d'implémentation

![](https://www.happycoders.eu/wp-content/uploads/2023/01/hexagonal-architecture-vs-clean-architecture-2.v4-800x310.png)

### Pourquoi est-ce important ?
Avoir une architecture centré sur le domaine est important pour garantir la maintenabilité et l'évolutivité de l'application. L'article [Hexagonal Architecture – What Is It? Why Use It?](https://www.happycoders.eu/software-craftsmanship/hexagonal-architecture/) ou encore [The Onion Architecture : part 1](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/) expliquent très bien cela.

> The big drawback to this top-down layered architecture is the coupling that it creates.  Each layer is coupled to the layers below it, and each layer is often coupled to various infrastructure concerns. [...] The biggest offender (and most common) is the coupling of UI and business logic to data access.

Lorsqu'on souhaite par exemple connecter notre application avec une application tierce, dans un architecture classique n'importe quelle couche va pouvoir appeler cette application tierce (souvent la *Business Logic*). Notre système dépend maintenant de cette application et de ces évolution. Ainsi pour garantir que notre système ne soit pas compromis par une application tierce nous souhaitons un couplage faible avec cette application tierce. Pour ce faire on peut par exemple implémenter des Port/Adapter (autre nom de l'architecture hexagonale)

![alt text](layered_architecture/images/hexa_vs_layered_2.png)

### Comment implémenter le coeur applicatif ?
D'abord, qu'est-ce que le "cœur applicatif" exactement ? Le cœur (ou application core) est la partie de ton projet qui contient :
- Les entités métiers (modèles purs, sans dépendance technique).
- Les règles métiers (services métiers, use cases).
- Les interfaces (ports) que la couche extérieure doit respecter (ex: repository, service externe).
- Les exceptions métiers.

=> **Règle d’or : PAS de framework (pas de SQL, pas de HTTP, pas de classes Spring, pas d’ORM ici).**

Mais libre à chacun de l'implémenter comme il le souhaite. On peut néanmoins noter que le [Domaine Driven Design]({{< relref "domain_driven_design/index" >}}) et les architectures centrés sur le domaine se complètent exceptionnellement bien car le permet de bien structurer ce coeur applicatif (entité, règles métiers).

> Hexagonal architecture and Onion Architecture share the following premise:  Externalize infrastructure and write adapter code so that the infrastructure does not become tightly coupled. [^2]

> [!definition] A retenir
> Tout (BDD, APIs, UI, fichiers, etc.) tourne autour de la *Business Logic* (coeur applicatif), mais sans jamais l'influencer directement.

[^1]: https://www.happycoders.eu/software-craftsmanship/hexagonal-architecture/
[^2]: https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/