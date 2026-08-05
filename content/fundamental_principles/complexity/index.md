+++
title = "Définir la complexité"
weight = 2
+++

> [!ressource] Ressource
> - A Philosophy of Software Design
> - [The Nature of Complexity - Synthèse](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php?topic=complexity)

De nombreux livre évoque la terme de complexité logicielle. Mais à mon sens celui qui la définie le mieux est *A Philosophy of Software Design* de John Ousterhout.

## Définition

> [!definition] Définition
> la complexité c'est ce qui rend un logiciel difficile à comprendre et à modifier

> The art of Programming is the art of managing complexity [^1]

### Symptôme de la complexité
La complexité se manifeste généralement par une des 3 façons suivantes :
- **Change Amplification** = un changement doit être effectuée à plusieurs endroit. L'objectif d'une bonne conception est de limité le nombre d'éléments affectés par modification.  <br><br>

- **Cognitive Load** = ce qu'un développeur doit savoir pour accomplir une tâche. Plus il est élevé plus le développeur devra passer du temps pour apprendre et comprendre l'information. Exemple :
  - dépendances entres modules
  - API avec beaucoup de méthodes <br><br>

- **Unknown unknown** = il n'est pas évident de savoir quelle partie du logiciel doit être modifiée. 
  - > One of the most important goals of good design is for a system to be *obvious*

### Causes de la complexité 
> [!affirmation] Affirmation
> Complexity is caused by two things : **dependencies** and **obscurity**

- Une dépendance existe si une partie du code ne peut pas être compréhensible ou modifiable de manière isolée. Les dépendances ne peuvent pas être totalement éliminé, mais l'objectif est de les réduire au maximum.
- L’obscurité apparaît lorsqu'une information importante n'est pas évidente.

> Dependencies lead to change amplification and high cognitive load. Obscurity creates unknown unknown, and also contribute to cognitive load.

## Conclusion
Notre objectif est de respecter les attributs de [Modularité]({{< relref "fundamental_principles/modularity/index" >}}) et de la [Couplage Faible et Forte Cohésion]({{< relref "fundamental_principles/couplage_and_cohesion/index" >}}) 
en s'appuyant sur les notions techniques d'[Abstraction - Information hinding]({{< relref "fundamental_principles/aei/index" >}}) et de [Separation of Concern]({{< relref "fundamental_principles/separation_of_concern/index" >}}) afin de rendre notre code (et notre système) moins complexe.


[^1]: Modern Software Engineer - page 22