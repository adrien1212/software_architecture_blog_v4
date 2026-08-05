+++
draft = "true"
title = 'Questionnement'
weight = 30
+++

**Pourquoi les flèches sont orientées vers le domaine ?**
 
Lorsque j'ai commencé à étudier les architectures, je n'avais jamais pensé à me poser cette question; cela me semblait naturel, mais je n'avais pas de réponse concrète. Ici, je souhaite partager avec vous le *pourquoi*.

## Ce que nous avons

L'architecture hexagonale est comme suit : tout dépend de la couche Service (ou Domaine). La question est de savoir si nous ne pourrions pas avoir à la place une couche Service dépendant de la Persistance.

![alt text](../images/question1.png)

## Pourquoi la figure de gauche ?

La figure de gauche est la meilleure approche, regardons pourquoi.

Pour ce faire, nous devons reprendre les bases avec l'inversion de dépendance. En effet, dans la [partie 2]({{% relref "../../basics_for_coding/dependency_inversion/Dependency_Inversion_2.md" %}}) nous affirmions

> [!danger] Définition
>  L'inversion de dépendance permet aux éléments les plus stables de ne pas dépendre d'éléments moins stables, qui sont plus sujets aux changements.

Dans l'architecture hexagonale l'élément qui est le plus stable est la couche Service. Nous affirmons cela car nous souhaitons que Service ne soit pas impacté par des changements (e.g. de technologie) dans la couche Persistance ou Présentation. Pour ce faire, nous faisons en sorte que la couche Service embarque les interfaces pour :

- qu'on puisse l'appeler via la couche Présentation
- pour qu'elle puisse appeler les autres couches (e.g. couche persistance)

Nous avons donc bien l'architecture suivante, où **tout dépend du Domaine et le Domaine ne dépend de rien**. Nous avons inversé les dépendances pour que Service utilise Persistance et Présentation sans en dépendre.

![alt text](../images/hexa4.png)

## Conclusion

Service (ou Domaine ou Cœur Applicatif) est un module de haut niveau :

- Il utilise la couche Persistance et Présentation
- MAIS pour faire en sorte qu'il ne dépende ni de Persistance ni de Présentation nous avons inversé les dépendances via des interfaces
  - Et nous ne voulons pas de ces dépendances, car nous souhaitons avoir un cœur applicatif totalement indépendant des changements dans les autres couches : **nous voulons qu'il soit stable**
