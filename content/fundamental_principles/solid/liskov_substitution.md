+++
title = "Liskov Substitution Principle"
weight = 3
+++

> If S subtypes T, what holds for T-objects holds for S-objects

Cela signifie que les objets d'une superclasse doivent pouvoir être remplacés par des objets de ses sous-classes sans que l'application ne soit interrompue. Cela implique que les objets de vos sous-classes se comportent de la même manière que les objets de votre superclasse. Vous pouvez y parvenir en suivant quelques règles :

- Une méthode surchargée d'une sous-classe doit accepter les mêmes valeurs de paramètres d'entrée que la méthode de la superclasse. Cela signifie que vous pouvez mettre en œuvre des règles de validation moins restrictives, mais que vous n'êtes pas autorisé à appliquer des règles plus strictes dans votre sous-classe. Sinon, tout code qui appelle cette méthode sur un objet de la superclasse risque de provoquer une exception s'il est appelé avec un objet de la sous-classe.

- La valeur de retour d'une méthode de la sous-classe doit respecter les mêmes règles que la valeur de retour de la méthode de la superclasse. Nous pouvons appliquer un type de retour plus strict qui est une sous-classe spécifique de la valeur de retour définie de la superclasse.

- Aucune nouvelle exception ne doit être générée par la méthode du sous-type, sauf si celles-ci sont elles-mêmes des sous-types des exceptions levées par la méthode du supertype.

## Exemple

> Si « S » est un sous-type de « T », alors tout objet de type « T » peut être remplacé par un objet de type « S » sans altérer les propriétés désirables du programme concerné.

Dans l'exemple des carrées et des rectancles, cela veut dire que partout où, dans votre code, vous vous attendez à recevoir un rectangle en paramètre, vous pouvez le remplacer par un carré, sans que cela pose un souci.
Ce n’est malheureusement pas le cas, car le développeur qui travaille sur un rectangle veut pouvoir changer la largeur et la hauteur indépendamment l’un de l’autre. C’est impossible avec un carré, ce qui « altère les propriétés d’un programme ».
