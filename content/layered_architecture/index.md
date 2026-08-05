+++
title = "Layered Architecture (Couches)"
weight = 60
+++

> [!ressource] Ressources
> - [Chapitre 9 à 12 - Application Architecture Guide](https://guidanceshare.com/wiki/Application_Architecture_Guide)

L'architecture en couches (*Layered Architecture*) est l'un des styles architectural les plus populaires. L'article suivant [Reevaluating the Layered Architecture](https://javadevguy.wordpress.com/2019/01/06/reevaluating-the-layered-architecture/) présente pourquoi ce style c'est largement imposé dans le monde logiciel.

> [!definition] Définition
> The idea behind Layered Architecture is that modules or components with similar functionalities are organized into horizontal layers. As a result, each layer performs a specific role within the application[^2]

## Topologie
Dans le style d'architecture en couches, les composants sont organisés en *couches techniques* (en opposition au *domain-partitioned* architecture), chaque couche jouant un rôle spécifique au sein de l'application. Malgré que le nombre de couches peut varier, la majorité des architectures sont composées de quatre couches :
- Presentation
- Business/Persistance qui peuvent être combinées en une seule
- Database

![Layered Architecture](layered_architecture.png)

### Separation of Concern
> The primary advantages of this architecture are isolation and separation of concerns. Each layer is isolated from the others, accessible via a well-defined interface. This allows for implementation changes within the layer without
affecting the other layers[^3]

L'architecture en couches respectent le principe de [Separation of Concern]({{< relref "fundamental_principles/separation_of_concern/" >}}) en rendant chaque couche responsable. Les composants au sein d'une couche spécifique ont un périmètre limité, ne traitant que la logique qui se rapporte à cette couche.
Par exemple, les composants de la couche de présentation ne traitent que la logique de présentation, tandis que les composants résidant dans la couche métier ne traitent que la logique métier.

### Layers of Isolation
> [!definition] Définition
> Le concept de Layers of isolation signifie que les modifications apportées à une couche de l’architecture n’ont généralement pas d’impact ou d’incidence sur les composants des autres couches.

Pour garantir ce principe, les couches doivent être fermées (*closed*), c'est-à-dire que lorsqu'une requête se déplace de haut en bas d'une couche à l'autre, elle ne peut sauter aucune couche. Si vous autorisez la couche de présentation à accéder directement à la couche de persistance, les modifications apportées à SQL dans la couche de persistance auront un impact à la fois sur la couche métier et sur la couche de présentation, ce qui produira une application très étroitement couplée avec de nombreuses interdépendances entre les composants.

![Layer of Isolation](https://www.oreilly.com/api/v2/epubs/9781491971437/files/assets/sapr_0102.png)

En ayant des couches indépendantes, si on souhaite remplacer une technologie sur une couche par une autre (e.g. JSF par React.js) cela n’impactera pas les autres couches.

## Déploiement
[Depuis les années 60, l'architecture en couche a évolué](https://herbertograca.com/2017/08/03/layered-architecture/) est sa stratégie de déploiement avec. La première variante combine les couches de présentation, métier et de persistance en une seule unité de déploiement. Puis des déploiement plus complexe sont apparues (n-tiers) [^1]

![](https://guidanceshare.com/images/4/4b/NTier.PNG)


## Ce que n'est pas une architecture en couche
### Couches métiers
En début de page nous avons souligné le fait que les composants sont organisés en *couches techniques* en opposition au *domain-partitioned* architecture. Chaque domaine (e.g. un Client, une Facture) est représenté dans les trois couches. L’inconvénient réside dans le fait que si nous modifions les règles du domaine, nous devrons impacter les trois couches. 

Par conséquent, une approche *Domain Driven* n’est pas des plus compatible avec le style architectural Layered. Une variante consiste à retravailler l'architecture en couches vers une *Vertical Slice Architecture*

[^1]: https://guidanceshare.com/wiki/Application_Architecture_Guide_-_Chapter_9_-_Layers_and_Tiers
[^2]: https://cs.uwaterloo.ca/%7Em2nagapp/courses/CS446/1195/Arch_Design_Activity/Layered.pdf
[^3]: Building Evolutionary Architecture p55