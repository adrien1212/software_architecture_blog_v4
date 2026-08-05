+++
draft = "true"
title = "Layered (Couche)"
weight = 10
alwaysopen = false
+++


> [!ressource] Ressources
> - [Layered Architecture, de 1960 à Aujourd'hui](https://herbertograca.com/2017/08/03/layered-architecture/)  
> - [Reevaluating the Layered Architecture](https://javadevguy.wordpress.com/2019/01/06/reevaluating-the-layered-architecture/)
> - [How to Differentiate Business and Service Layers in Layered Architecture](https://levelup.gitconnected.com/how-to-differentiate-business-and-service-layers-in-layered-architecture-912123b2ccf1) Très intéressant !!
> - [Application Architecture Guide - Chapter 9 - Layers and Tiers](https://guidanceshare.com/wiki/Application_Architecture_Guide_-_Chapter_9_-_Layers_and_Tiers)

## Objectif du découpage

Le concept fondamental de l'architecture n-tier est le _Separation of Concerns_. Les composants d'une couche spécifique ne traitent que les informations spécifiques à cette couche. Par exemple, l'IHM ne sait pas comment les utilisateurs sont récupérés de la base de données.

Ensuite, cette architecture permet d'avoir un code facilement testable et maintenable. En effet des changements effectués sur une couche n'impacteront pas les autres couches, le changement est _isolé_.

![Alt text](images/n-tiers.png)

## Couche fermée

> [!danger] Définition
>  Les couches communiquent par le biais d'interfaces ou d'API bien définies, abstrayant les détails de la mise en œuvre de chaque couche.
Pour éviter qu'une requête traverse toutes les couches [sinkhole antipattern]({{% relref "/architecture_antipattern/sinkhole_antipattern.md" %}}), nous appliquons de l'inversion de dépendance entre nos couches.

![Alt text](images/n-tiers-detailled.png)

### Interface de contrat

Chaque couche définit son contrat au travers d'interfaces.

1. Le Controller envoie une requête au service dont le contrat d'échange est `A`
2. Le Service doit transformer cette requête pour respecter le contrat d'échange avec le repository qui est `B`

![Alt text](images/ntiers-dto.png)

En d'autres termes :
 
 - `A` est le DTO de requête (car il peut y avoir un DTO de réponse) entre la _présentation_ et la _logique métier_. Le Controller doit envoyer ses données sous le format `A`
 - `B` est le DTO de requête (car il peut y avoir un DTO de réponse) entre la _logique métier_ et la _persistance_. Le Service doit envoyer ses données sous le format `B`

## Layers of isolation

> [!danger] Définition
>  Le concept de _Layers of isolation_ signifie que les modifications apportées à une couche de l'architecture n'ont généralement pas d'impact ou d'incidence sur les composants des autres couches.

Le point fort de l'architecture Layered est d'avoir des couches indépendantes des autres. Ainsi si l'on souhaite remplacer les technologies sur une couche (e.g. JSF par React.js) cela n'impactera pas les autres couches.

## Conclusion

L'isolement favorisé dans cette architecture contribue à maintenir l'intégrité et la stabilité de la couche, la rendant moins sensible aux changements et aux perturbations causées par des facteurs externes. La maintenabilité et l'évolutivité de notre système sont grandement améliorées.

- chaque couche ne communique qu'avec son n+1 ou n-1 - fermée
- chaque couche est totalement indépendante des autres - isolée
