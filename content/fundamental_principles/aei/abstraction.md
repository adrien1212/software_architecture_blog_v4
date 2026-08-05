+++
title = "Abstraction"
weight = 5
isClose = true
+++

> [!ressource] Ressources
> - [[MUST READ] What Are Abstractions in Software Engineering with Examples](https://thevaluable.dev/abstraction-type-software-example/)
> - [When NOT to write an Abstraction Layer](https://codeopinion.com/when-not-to-write-an-abstraction-layer/)
> - [Abstraction VS Information Hiding VS Encapsulation](https://stackoverflow.com/questions/24626/abstraction-vs-information-hiding-vs-encapsulation)

> Most people confuse the idea of abstraction with the idea of [information hiding](https://en.wikipedia.org/wiki/Information_hiding). Abstraction does not mean "putting all the details behind some interface." Abstraction is the process of isolating and identifying patterns

L'article [What Are Abstractions in Software Engineering](https://thevaluable.dev/abstraction-type-software-example/) résume parfaitement le concept d'abstraction et son importante dans l’ingénierie logicielle. Il définit l'abstraction comme un ensemble de propriétés :
- The concept of *hiding*
- The concept of *generalization*
- The concept of *idea versus reality*

## Types d'abstraction
Par la suite, il nous montre qu'il existe deux types d’abstractions :
- *data abstraction* qui représente un type de données
- et *control flow abstraction* : les fonctions sont des abstractions car elle cache (*hide*) un comportement et généralise un comportement que nous pourrons utiliser à plusieurs endroit de l'application.

## Abstraction et POO
En POO, on peut également noter les abstractions suivantes ([Abstraction in OOP](https://en.wikipedia.org/wiki/Abstraction_(computer_science)#Abstraction_in_object_oriented_programming)) :
- les *classes*
  - simplifient les opérations sur des données en les [encapsulant](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming))
  - généralisent un concept, on pourra utiliser cette classe dans notre application pour répondre à un besoin
- les *interfaces*
  - cachent les détails de l'implémentation. Il n'y a que la signature de la méthode, pas d'implémentation.
  - généralisent un concept. L'interface peut être implémentée par un nombre illimité de classes.

## Abstraction et architecture
### Exemple architecture en couche
Pour le moment nous n'avons évoqué l'abstraction au niveau code. Lorsque l’on prend un peu de hauteur, on constate que l’abstraction joue également un rôle clé dans l’architecture logicielle. L’une des illustrations les plus classiques de cette approche est l’architecture en couches (layered architecture) : chaque couche repose sur la couche sous-jacente via un contrat, tout en masquant les détails de son fonctionnement interne.

> Each layer in the architecture forms an abstraction around the work that needs to be done to satisfy a particular business request. For example, the presentation layer doesn’t need to know or worry about how to get customer data; it only needs to display that information on a screen in particular format. [^la]



### Design-time
> Modules that are not good abstractions only provide encapsulation. The term encapsulation means hiding details at compile-time, but not necessarily at design-time. Abstractions are what our brains use, so only abstractions hide details at design-time. [^dt]

L'architecture s'appuie également sur la notion d'abstraction car pour concevoir notre système, nous pouvons choisir le niveau de détail à, qui peut être superposé dans une approche telle que le [C4 Model](https://c4model.com/)

> Software architecture is an abstraction. The structures of a software system consist of its elements. Software architecture concerns itself with defining and detailing the structures, their elements, and the relationships of those elements with each other.[^sa]



[^la]: [Chapter 1. Layered Architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html)
[^dt]: [Abstraction Layered Architecture](https://www.abstractionlayeredarchitecture.com/)
[^sa]: [Software architecture is an abstraction](https://www.oreilly.com/library/view/software-architects-handbook/9781788624060/8fbf40b8-5da6-42cd-bdc7-5df4ede606c5.xhtml)
