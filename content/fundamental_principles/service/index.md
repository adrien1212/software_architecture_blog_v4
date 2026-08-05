+++
title = "Service"
weight = 70
+++

> [!ressource] Ressources
> - [Lesson 134 - What is a Service?](https://youtu.be/AHMlV_Y80Zw)
> - [You first need to define what a service is](https://softwareengineering.stackexchange.com/a/218394/385571)

Tout au long des chapitres suivants nous allons parler de _Service_, regardons donc ensemble que signifie ce terme.

[Services in Domain-Driven Design (DDD)](http://gorodinski.com/blog/2012/04/14/services-in-domain-driven-design-ddd/)
> The term service is overloaded and its meaning takes on different shades depending on the context

Un service n'est pas quelque chose de clairement défini. En réalité, ce qu'un service doit faire est très spécifique à l'architecture :
- Dans une architecture en couche, un service est synonyme de la couche *Business Logic*. C'est la couche entre l'interface utilisateur et les données. 
- Dans une architecture SOA, un service est une propriété d'un domaine métier (chaque service possède ses propres données, ses propres règles métier et sa propre UI)

## Définition

> [!danger] Définition
>  Un service est une unité déployable qui accomplit une activité métier ou d'infrastructure

![Service example](service_example.png)

Dans l'exemple de la vidéo, nous obtenons :

- un service `Ticket` qui contient l'ensemble de règles de métiers. Un service est donc un regroupement logique de règles (qui sont des classes Modules, des classes Java, etc ...)
- mais ce même service peut être vu comme deux services distincts. Un premier qui assure la maintenance du ticket (sa création, sa réalisation, etc ...), un second qui s'occupe de l'acheminement des tickets.

Avec cette exemple, on voit que nos services peuvent être vus avec des granularités différentes.

### Service as composant

L'une des principales raisons d'utiliser les services comme composants (plutôt que comme bibliothèques) est que les services peuvent être déployés indépendamment les uns des autres. Si vous avez une application qui consiste en plusieurs bibliothèques dans un processus unique, une modification de l'un des composants entraîne le redéploiement de l'ensemble de l'application. En revanche, si cette application est décomposée en plusieurs services, on peut s'attendre à ce que de nombreuses modifications apportées à un seul service n'entraînent qu'un redéploiement de ce dernier.

## Caractérisiques par architecture

### Microservices

> Le service se nomme un _microservice_

Caractéristiques :

- répond à un seul objectif (e.g. Service création de tickets)
- d'une granularité fine
- possède leur propre base de données
- communique fréquemment avec les autres (micro)services

### Service-Based

> Le service se nomme un _domain service_

Caractéristiques :

- contient plusieurs fonctionnalités métiers (e.g. le domaine ticket, le domaine facture, etc ...)
- d'une granularité gros grain
- tous les domain services partagent une même base de données
- communique rarement avec les autres (domain)services

### Event-Driven

> Le service se nomme un _event processor_

Caractéristiques :

- d'une granularité variante
- Déclenche et/ou répond à des évènements
- La communication entres les events processus se fait de manière asynchrone (via broker)
- peut posséder sa propre base de données ou avoir une base de données partagée

### Space-based

> Le service se nomme une _processing unit_

Caractéristiques :

- d'une granularité variante
- Contient un stockage de données in-memory
- La communication avec la base de données se fait de manière asynchrone
- Les services se up et se down fréquemment ([élasticité]({{< relref "software_characteristics/elasticity.md" >}}) forte)
