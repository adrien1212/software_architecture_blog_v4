+++
title = "Flexibilité"
weight = 40
+++

> [!ressource] Ressources
> - [https://informativearchitecture.wordpress.com/2011/10/04/software-flexibility/](https://informativearchitecture.wordpress.com/2011/10/04/software-flexibility/)

> [!definition] Définition
>  La flexibilité fait référence à la capacité de la solution à s'adapter aux changements possibles ou futurs de ses exigences

Lorsqu'un changement devra être fait nous devrons évaluer son coût, l'objectif est donc de minimiser le coût du changement. Ainsi lors de la conception de nos première version nous devons nous assurer de respecter les principes de bonne conception :

- SOLID
- Design Patterns
- Modularité

La flexibilité logicielle permet aux développeurs de répondre efficacement à l'évolution des besoins des clients, aux demandes du marché et aux technologies émergentes.

## Paraxode

Néanmoins, a chaque fois que vous ajoutez quelque chose pour rendre votre système plus facile à changer (_easy to change_), le logiciel devient en réalité un peu plus complexe. Raplh Johnson a observé se comportement

> making everything easy to change, makes the entire system very complex. Complexity is what makes software hard to change

> [!affirmation] Affirmation
>  L'augmentation de la flexibilité s'accompagne d'une augmentation de la [complexité]({{< relref "complexity" >}})

L'objectif est donc de concevoir un logiciel flexible sans augmenter sa complexité. En combinant les principes SOLID, les Design Patterns et la Modularité nous nous mettons dans les meilleures conditions pour réduire le cout du changement.
