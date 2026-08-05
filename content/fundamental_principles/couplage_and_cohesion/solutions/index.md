+++
title = "Package by feature, not layer"
weight = 10
+++

Nous devons mettre en œuvre le principe [Low Coupling, High Cohesion]({{< relref "fundamental_principles/couplage_and_cohesion" >}}) :
- à la fois à l’intérieur (*intra*) de nos [modules]({{< relref "fundamental_principles/modularity/definition" >}}), en organisant nos classes, packages et les dépendances entre eux
- et aussi entre (*inter*) les [modules]({{< relref "fundamental_principles/modularity/definition" >}}), en minimisant les dépendances croisées et en favorisant des interfaces claires.

## Intra Module
> [!ressource] Ressources
> - [https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/)
> - [Package by feature, not layer](http://www.javapractices.com/topic/TopicAction.do?Id=205)
> - [Domain Layer Structure & Skeleton | Clean Architecture & DDD From Scratch Tutorial](https://youtu.be/jnutb5Z4wyg)

Au lieu de packager son application par utilisation (Entity, Service, Repository) il est préférable de l'organiser par logique métier, ce principe se nomme **Package by feature, not layer**

<div style="display: flex; justify-content: space-between;">
  <div style="text-align: center;">
    <img src="poorly_boundaries.png" alt="Poorly Boundaries" width="65%">
  </div>
  <div style="text-align: center;">
    <img src="better_boundaries.png" alt="Better Boundaries" width="70%">
  </div>
</div>

La cohésion de chaque module est maintenant maximale et le couplage entre les 3 modules (order, products et users) est faible.

## Inter Module
> To achieve less coupling, each module should know the minimum about each other

Nous devons donc concevoir nos services pour qu’ils puissent être modifiés et déployés de manière indépendante. Pour ce faire :
- Le [Bounded Context]({{< relref "bounded_context/index" >}}) de chaque service doit être correctement défini
- et les services communiquent via des interfaces (e.g. API REST)

### Conséquences
- Vous aurez un modèle clair, une représentation claire de votre base de code. Il sera plus facile de le modifier et de le maintenir.
- Différentes équipes peuvent travailler sur différentes parties de la base de code, sans se marcher sur les pieds. Si les modules de haut niveau ont une forte cohésion et un faible couplage, la modification d'un module n'affectera pas les autres.
- Utiliser une partie de votre base de code sur une autre.

### Event-driven architecture
Une approche par *Messages & Évènements* est souvent utilisée pour rendre nos systèmes faiblement couplés. Elle met en œuvre un ensemble de *producers* qui transmettent des évènements sous la forme d'un message à des *consumers* qui les traitent.
 
 On peut affirmer que notre architecture est très peu couplée car les *consumers* ne connaissent pas les *producers* et vice-versa.