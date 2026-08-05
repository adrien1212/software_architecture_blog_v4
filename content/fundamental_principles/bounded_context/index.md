+++
title = "Bounded Context"
weight = 50
+++

> [!ressource] Ressources
> - [https://martinfowler.com/bliki/BoundedContext.html](https://martinfowler.com/bliki/BoundedContext.html)

> [!definition] Définition
> Divide the ubiquitous language into multiple smaller language, then assign each one to the explicit context in which it can be applied : its *bounded context* [^1]

[^1]: Learning Domain Driven Design page 35

Un Bounded Context représente une limite spécifique et bien définie à l'intérieur de laquelle les termes, les concepts et les règles d'une logique métier sont définis et cohérents. Il s'agit d'un moyen de segmenter un système logiciel plus vaste en parties plus petites et plus faciles à gérer. 

## Périmètre d'un bounded context

Chaque Bounded Context doit être implémenté comme un projet/service individuel. Codé, évolué et versionné indépendamment des autres Bounded Context. Si un Bounded Context contient plusieurs sous-domaine (*sub-domain*) alors :
- le BC correspond à la séparation physique
- les sous-domaine une séparation logique, les frontières logiques font références aux namespaces/packages suivant le langage de programmation

### Stratégie de découpage
En théorie, un modèle unique pourrait couvrir l'ensemble du domaine commercial. Cette stratégie pourrait fonctionner pour un petit système, comme le montre la figure 3-5.
![monolith_bc](monolith_bc.png)

Lorsque des modèles contradictoires apparaissent, nous pouvons décomposer les systèmes en Bounded Context, comme le montre la figure 3-3.
- Le terme *Lead* ne voulant pas dire la même chose dans les contextes.

![ul_bc](ul_bc.png)

Si les modèles sont encore volumineux et difficiles à maintenir, nous pouvons les décomposer en Bounded Context encore plus petits ; par exemple, en ayant un Bounded Context pour chaque sous-domaine.

![subdomain_bc](subdomain_bc.png)


### Propriétaire d'un Bounded Context
> [!info] Info
> Un Bounded Context est implémenté et maintenu par une seule équipe

Pour choisir une stratégie de découpage, nous devons également prendre en compte l'aspect organisationnel. Afin de renforcer l'autonomie et de réduire les dépendances les Bounded Context doivent être conçu de manière a pouvoir être gérer par une seule équipe.



