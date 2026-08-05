+++
title = 'Inversion de dépendances (1)'
date = 2023-10-27T18:26:00+02:00
weight = 20
+++

## Le problème
Supposons l'architecture suivante où la classe `A` dépend de la classe `B`.

![Alt text](DI1-1.png)

Dans cette conception, si `B` est amenée à changer (e.g. montée en version), alors la classe `B` **et** la classe `A` vont devoir être rédéployées.
On va devoir :
- packager `B` **et** `A`
- build `B` **et** `A`
- pour finalement déployer `B` **et** `A` chez le client    

![Alt text](DI1-2.png)

Or, seulement `B` a été modifiée. Nous souhaitons donc que seulement `B` soit packagée, build et déployée chez le client.

## Inversion de dépendance
Pour ce faire, nous allons utiliser le principe d'*Inversion de dépendances*.


> [!note] Note
> - Les modules de haut niveau (e.g. `A`) ne doivent pas dépendre des modules de bas niveau (e.g. `B`).  
> - Les abstractions ne doivent pas dépendre des détails. Les détails doivent dépendre des abstractions.

En d'autre terme, `A` qui est un détail doit dépendre d'une interface `I`.

Si nous appliquons ces deux affirmations à notre architecture nous obtenons 

![Alt text](DI1-3.png)

- `A` ne dépend plus de `B` mais de son interface `IB`
- Donc si `B` est modifiée alors seulement `B` sera packagée, build et déployée chez le client

> [!note] Note
> Cependant, si nous modifions l'interface `IB` alors les classes `B` et `A` devront être packagées, build et déployées chez le client. Néanmoins une interface est moins *volatile* qu'une implémentation.
