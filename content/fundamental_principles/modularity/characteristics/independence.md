+++
title = "Indépendance"
weight = 1
+++

On dit qu'un module est indépendant, mais que cela signifie-t-il ? L'indépendance du module est déterminée par trois facteurs principaux :

- number of dependencies
- strength of dependenies
- stability of the modules on which the module depends on

Ce concept est fortement lié à [High cohesive, Loosely coupled]({{< relref "fundamental_principles/couplage_and_cohesion/index" >}}).

## Nombre de dépendances
> In the diagram below on the left we have a module that has a lot of dependencies and you can definitely not say that it is independent. On the other hand, on the right, the situation is the opposite - the module contains a minimum of dependencies and they are more loose, it is finally more independent

![nb dependance](fundamental_principles/modularity/characteristics/images/nb_dep.png)

## La force des dépendances
> The second measure is how strong the dependency is. In other words, do we call it very often using multiple methods or occasionally using one or a few methods?

![strength](fundamental_principles/modularity/characteristics/images/strength.png)

Si nous remarquons que la force des dépendances est trop élevée, il advient de se demander si nous ne devrions pas agréger les deux modules

![high_stregth](fundamental_principles/modularity/characteristics/images/high_stregth.png)

## Stabilité par rapport aux autres modules

> The last attribute affecting the independence of the module is the frequency of changes of the modules on which it depends on. As you can guess - the less often they are changed, the more the module is independent. On the other hand, if changes are frequent - we must change our module often and it loses its independence.

Mal définir les [Bounded Context]({{< relref "basics_for_modeling/bounded_context" >}}) résultera à une architecture dites *Distribued Monolithic* (pire architecture). Lorsqu'on met à jour un module nous devons impacter les autres. Ainsi avec cet approche nous n'avons :
- ni les avantages d'une architecture distribuée (e.g. microservice) ni ceux d'une architecture monolithique
- les désavantages des deux approches précédentes

![stability](fundamental_principles/modularity/characteristics/images/stability.png)
