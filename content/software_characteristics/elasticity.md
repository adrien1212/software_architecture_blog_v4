+++
title = "Elasticité"
weight = 20
+++

> [!ressource] Ressources
> - [https://fr.wikipedia.org/wiki/%C3%89lasticit%C3%A9\_(cloud_computing)](<https://fr.wikipedia.org/wiki/%C3%89lasticit%C3%A9_(cloud_computing)>)

D'après wikipédia,

> [!definition] Définition
>  L'élasticité (souplesse en français) est le degré auquel un système est capable de s'adapter aux demandes en approvisionnant et désapprovisionnant des ressources de manière automatique, de telle façon à ce que les ressources fournies soient conformes à la demande du système.

L'élasticité permet de saisir les aspects essentiels de l'adaptation, à savoir :

- La vitesse : correspond au temps necessaire pour scale up, c'est-à-dire passer d'un état de sous-provisionnement à un état de sous-provisionnement (on tient le même raisonnemennt pour un scale down)
- La précision : est défini comme l'écart absolu entre la quantité actuelle de ressources allouées et la demande réelle de ressources

On veut donc scaler notre système le plus rapidement et avec la meilleure précision possible.

## Elasticité et scalabilité

> [!ressource] Ressources

> - [https://stackoverflow.com/questions/9587919/what-is-the-difference-between-scalability-and-elasticity](https://stackoverflow.com/questions/9587919/what-is-the-difference-between-scalability-and-elasticity)
> - [Lesson 85 - Defining Scalability and Elasticity ](https://www.youtube.com/watch?v=Em3em-al7vc)

Les deux concepts sont fortement liés. L’élasticité permet d’automatiser le mécanisme de [scalabilité]({{< relref "scalability" >}}) des ressources informatique mise à disposition.

Lorsque la charge augmente, vous augmentez la capacité en ajoutant des ressources et lorsque la demande diminue, vous réduisez la capacité et supprimez les ressources inutiles. Pour ce faire on utilisera souvant le _scale out_.
