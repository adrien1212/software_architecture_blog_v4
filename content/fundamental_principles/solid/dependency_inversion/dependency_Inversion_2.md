+++
title = 'Inversion de dépendances (2)'
date = 2023-10-27T18:26:00+02:00
weight = 20
+++

> [!ressource] Ressource
> - [Dependency Inversion: What, Why & How? | By Example](https://youtu.be/-3Z9L6sIAMM)

Dans la [partie précédente]({{< relref "dependency_Inversion_1.md" >}}) nous avons défini le notion d'inversion de dépendances. Dans cette seconde partie, nous l'améliorons.

## Retour sur la partie 1

Dans la figure de gauche, nous avons un module de bas niveau qui défini une API (via un interface) et un module de haut niveau qui interagit avec le module de bas niveau au travers de cette API.

Dans la figure de droite, nous avons changeons le propriétaire du contrat. C'est maintenant c'est le module de haut niveau qui définit les fonctionnalités qui sont requises par chaque implémentation de cette interface.

Ainsi le module de haut niveau défini une abstraction où :

- Le module de haut niveau dépend de cette abstraction
- Le module de bas niveau dépend aussi de cette abstraction (implémentation)

![Alt text](DI2-1.png)

### Pourquoi préférer le graphique de droite ?

L'inversion de dépendance permet aux éléments les plus stables de ne pas dépendre pas d'éléments moins stables, qui sont plus sujet aux changement.

Dans l'exemple de dessus, c'est le module de haut niveau qui est le plus stable car il donne les règles. Le module de bas niveau ne fait qu'implémenter ces règles. La conséquence directe est d'avoir un module de haut niveau qui est totalement autonome et ne qui dépend pas de modules de bas niveau qui sont sujet à des changements récurrents.

C'est pour cette dernière raison principalement que nous _placerons toujours l'interface dans le module le plus stable_. A noter que le module le plus stable n'est pas forcément le module de plus haut niveau (voir [architecture hexagonale]({{% relref "../../architecture_pattern/hexagonale/question.md" %}})).

## Améliorer l'inversion de dépendance

Etant donné que le module de bas niveau implémente le module de haut niveau il est impossible de réutiliser le module de bas niveau dans un autre contexte, par exemple dans une autre application. Pour résoudre ce problème nous utilisons de patron de conception _Adaptateur_.

![Alt text](DI2-2.png)

1. Nous créons une interface dans le module de bas niveau. Par conséquent, les deux modules peuvent maintenant être réutilisés dans n'importe quel contexte.
2. Nous créons une nouvelle classe _Adapter_ que nous positionnons dans un module tier.
   - L'adaptateur implémente l'interface du module de haut niveau
   - L'adaptateur utilise l'interface du module de bas niveau
   - L'adaptateur permet aussi de convertir les structuteurs de données entre les deux modules.

## Conclusion

- Le module de haut niveau est indépendant des détails.
- Le module de bas niveau peut être réutilisé dans différent contexte.
- Les informations convertie sont transmisses au travers de DTOs
