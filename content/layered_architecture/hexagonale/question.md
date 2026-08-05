+++
title = 'Questionnement'
weight = 30
+++

**Pourquoi les flèches sont orientés vers le domaine ?**

Lorsque j'ai commencé à étudier les architectures je n'avais jamais pensé à me poser cette question, cela me semblait naturel mais n'avait pas la réponse concrète. Ici je souhaite vous partager le _pourquoi?_

## Ce que nous avons

L'architecture hexagonale est comme suit, tout dépend de la couche Service (ou Domaine). La question que nous soulevons est de savoir si nous ne pouvons pas avoir à la place la couche Service qui dépend de la Persistance

![alt text](layered_architecture/hexagonale/images/question1.png)

## Pourquoi la figure de gauche ?

La figure de gauche est la meilleure approche, regardons pourquoi.

Pour ce faire, nous devons reprendre les bases avec l'inversion de dépendance. En effet, dans la [partie 2]({{< relref "fundamental_principles/solid/dependency_inversion/dependency_Inversion_2" >}}) nous affirmions

> [!danger] Définition
>  L'inversion de dépendance permet aux éléments les plus stables de ne pas dépendre pas d'éléments moins stables, qui sont plus sujet aux changement.

Dans l'architecture hexagonale l'élément qui est le plus stable est la couche Service. Nous affirmons cela car nous souhaitons que Service ne soit pas impacté par des changements (e.g. de technologie) dans la couche Persistance ou Présentation. Pour ce faire, nous faisons en sorte que la couche Service embarque les interfaces pour :

- qu'on puisse l'appeler via la couche Présentation
- pour qu'elle puisse appeler les autres couches (e.g. couche persistance)

Nous avons donc bien l'architecture suivante, où **tout dépend de Domaine et Domaine qui ne dépend de rien**. Nous avons invervé les dépendances pour que Service utilise Persistance et Présentation sans en dépendre

![alt text](layered_architecture/hexagonale/images/hexa4.png)

## Conclusion

Service (ou Domaine ou Coeur Applicatif) est un module de haut niveau :

- Il utilise la couche Persistance et Présentation
- MAIS pour faire en sorte qu'il ne dépende ni de Persistance ni de Présentation nous avons inversé les dépendances via des interfaces
  - Et nous ne voulons pas ces dépendances car nous souhaitons avoir un coeur applicatif totalement indépendant des changements dans les autres couches : **nous voulons qu'il soit stable**
