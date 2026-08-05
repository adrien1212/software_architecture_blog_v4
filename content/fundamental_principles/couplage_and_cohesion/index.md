+++
title = "Low Coupling, High Cohesion"
weight = 20
+++

> [!ressource] Ressources
> - [Cohesion and Coupling in Software with Examples - Thevaluable.dev](https://thevaluable.dev/cohesion-coupling-guide-examples/)
> - [Highly COHESIVE Software Design to tame Complexity](https://codeopinion.com/highly-cohesive-software-design-to-tame-complexity/)
> - [SOLID? Nope, just Coupling and Cohesion](https://codeopinion.com/solid-nope-just-coupling-and-cohesion/)
> - [(Fin de l'article) I don't love the single responsibility principle](https://sklivvz.com/posts/i-dont-love-the-single-responsibility-principle/)

Les principales causes d'un logiciel pourrissant sont *le code fortement couplé avec un trop grand nombre de dépendances*. Il est donc primordial d'avoir conscience de ce principe pour réduire les coûts de maintenance.
 
 Ce principe est tellement important qu'on le retrouve dans de nombreux livres :
 - Java Application Architecture - Section 4.3
- Modern Software Engineering - Chapitre 11
- Accelerate - Chapitre 5

## Couplage et Cohésion
### Couplage

> [!danger] Définition
>  Coupling tells to which degree a change in one part of the system affects another. Usually we aim for loose coupling so that we can change things independently. But the decoupling may come with a burden, which forces us to make trade offs.

A est couplé à B, si pour créer/utiliser A nous devons nécessairement avoir créé B. En d'autres termes, le couplage est le nombre de connexions entre deux ou plusieurs unités (e.g. des classes, des modules, etc.). Plus ce nombre est faible, plus le couplage est faible.

![couplage](couplage.png)

```java
B b = new B()
A a = new A( b ) // A couplé à B
```

### Cohésion

> [!danger] Définition
>  Cohesion tells whether code that changes for the same reason, is put closely. We aim for high cohesion.

La cohésion représente la mesure dans laquelle une partie d'un code (e.g. un ensemble de classes) constitue une unité logique. L'objectif est de regrouper les éléments partageant une même logique ensemble ; ceci peut être des classes qu'on regroupe dans un même module/service, des fonctions qu'on regroupe dans une même classe, etc.

### Concepts liés

Le _couplage_ et la _cohésion_ sont liés :

- Si vous avez une bonne cohésion dans votre module, tous les éléments sont couplés.
- Si tout ce qui va ensemble est ensemble, changer le module n'affectera pas les autres modules.
- Si changer quelque chose dans le module A affecte le module B, cela signifie que cette chose du module A devrait être dans le module B.

Notre objectif est de structurer notre système de manière à regrouper les composants étroitement liés, tout en veillant à ce qu'ils n'interagissent avec les autres modules qu'à travers des interfaces publiques spécifiques.

<img src="https://enterprisecraftsmanship.com/images/2015/2015-09-02-1-01.png" alt="Ideal cohesion couplage" width="35%">

> - Coupling is about connections across the boundaries of different modules, 
> - while cohesion is about the connections between the elements inside the boundary of a module. [^1]

## Métriques
> [!ressource] Ressources
> - [Write Stable Code using Coupling Metrics](https://codeopinion.com/write-stable-code-using-coupling-metrics/)

Utilisez les mesures de couplage comme *Afferent Coupling (Ca)*, *Efferent Coupling (Ce)* et *Instability (I)* permettent d'examiner notre système et de guider la prise de décision pour refactorer si nécessaire.


## Dépendances excessives ?
> [!ressource] Ressources
> - Java Application Architecture - Section 4.3
 
 Dans les lignes suivantes nous allons détailler *pourquoi les dépendances excessives ruinent notre code ?*


### Gêne la maintenance

### Empêche l'extension

### Freine la réutilisation

### Ralentit l'intégration

### Limite la compréhension

[^1]: https://thevaluable.dev/cohesion-coupling-guide-examples/