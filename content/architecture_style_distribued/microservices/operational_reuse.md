+++
draft = "true"
title = "Partage de données"
weight = 20
+++

## Problématique

Comment devons-nous gérer lorsque des données sont dans deux microservices et que la valeur ajoutée nécessite un couplage ?

Par exemple _nous souhaitons récupérer le nombre de commandes passées par chaque client alors nous couplons les services Client et Commande_.

### Trois solutions possibles

![components coupling](../images/couplage_solution.png)

- **Duplication de données** (Data duplication) qui consiste à avoir le nombre de commandes stocké à la fois dans le service Commande et Client. Par conséquent, lorsqu'une commande est ajoutée/supprimée nous devons mettre à jour le montant des deux services
- **Requête de service** (Service Query) où le service Client fait une requête au service Commande mais ceci pose un problème de surcharge du trafic et du service. En effet si nous avons 2000 clients alors nous devons contacter 2000 fois le service Commande.
- **Aggregation** où nous créons un troisième service qui agrège les données des deux services.

### Approche recommandée

> [!danger] Définition
>  Avec l'architecture microservices on préférera dupliquer plutôt que coupler

Étant donné qu'avec l'architecture microservices nous essayons d'éviter le couplage, nous préférerons dupliquer le composant.

## Réutilisation

Cependant, certains composants ont une réelle valeur ajoutée uniquement lorsque nous réalisons un couplage. C'est le cas d'un système de _Logging_ (logs) ou un _Circuit Breaker_.
De plus pour ces composants nous pouvons nous demander si nous préférions que chaque équipe en soit responsable ou avoir une organisation plus globale avec une équipe d'infrastructure.

### Patron Sidecar

Le composant sidecar gère toutes les questions opérationnelles que les équipes ont intérêt à coupler. Ainsi, lorsque le moment est venu de mettre à jour l'outil, l'équipe chargée de l'infrastructure peut mettre à jour le sidecar, et chaque microservice bénéficie de la nouvelle fonctionnalité.

![Sidecar](../images/sidecar.png)
