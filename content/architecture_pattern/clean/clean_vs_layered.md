+++
draft = "true"
title = "Clean Architecture VS Layered"
weight = 20
+++

> [!danger] Définition
>  Architecture Layered + Dependency Inversion Principle = Clean Architecture

La Clean Architecture est composée de plusieurs couches sur lesquelles on pousse à l'extrême l'inversion de dépendance.

## Construction
### 1. Architecture Layered
Nous repartons de l'architecture [Layered]({{% relref "layered" %}}) présentée. Elle permet d'avoir des couches logiques isolées.

![Layered](../images/layered-detailled.png)

### 2. Architecture Layered à l'extrême
Maintenant si on pousse le concept [d'inversion de dépendances]({{% relref "../../basics_for_coding/dependency_inversion" %}})
 à l'extrême, on obtient l'architecture suivante :
- Le module de haut niveau *Business* est indépendant du module de bas niveau (couplage faible)
- Le module de bas niveau *Persistance* peut être utilisé dans plusieurs contextes
- Le module de haut niveau communique donc avec le module de bas niveau via un *Adaptateur*

![Alt text](../images/layeredVSClean.png)

Nous obtenons notre Clean Architecture. On notera l'utilisation du patron Adaptateur au lieu du patron Gateway mais le principe est exactement le même.

## Pourquoi l'invention de la Clean Architecture ?
Alors me direz-vous, pourquoi donne-t-on un nom à quelque chose de si évident ? 

> Appliquer une architecture layered sans avoir une inversion de dépendance n'a pas vraiment de sens ?

Vous avez totalement raison, mais de nombreuses personnes n'arrivent pas à aller au-delà de l'architecture Layered. En proposant ce nouveau nom, Uncle Bob a mis en lumière l'importance de l'inversion de dépendances.
