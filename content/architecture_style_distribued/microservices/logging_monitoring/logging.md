+++
draft = "true"
title = "Logging"
weight = 1
+++

## Implémenter le Logging

> [!danger] Définition
>  Le Logging doit fournir une vue holistique du système

Notre implémentation doit tracer le flux de bout en bout et capturer le plus d'informations possible.

Dans une architecture microservices nous allons avoir un service dédié au logging. Les logs sont maintenant unifiés, agrégés et peuvent être facilement analysés.

![Logging](../images/logging.png?width=40pc)

Nous devons considérer le logging à différents endroits :

- au niveau de service métier, où il nous faudra une bibliothèque de logging pour générer les logs
- le transport, les logs doivent être transportés vers le service de logging
- service de logging, comment le construire ? utiliser un service existant ?

### Bibliothèque de logging

En Java, Log4j est la bibliothèque la plus populaire pour capturer les logs. Les principales informations à capturer sont les suivantes :

- La date et l'heure
- L'utilisateur
- La sévérité (INFO, WARNING, ERROR)
- Le service
- Le message
- L'ID de corrélation : lorsqu'une erreur est partagée entre deux services (début et fin de flux), nous devons les considérer comme provenant de la même erreur. Nous pouvons donc filtrer nos erreurs en fonction du correlation id et avoir une vue globale du flux
  ![correlation id](../images/correlationid.png?width=40pc)

### Transport

Il faut transporter les informations du service métier vers le service de logging. La stratégie la plus utilisée est les Files d'attente (Queues) (e.g. Apache Kafka, RabbitMQ)

### Service de Logging

Il existe plusieurs solutions déjà existantes pour tracer les logs en fournissant de bonnes visualisations.

- Stack
- Splunk
