+++
title = "C4 Model"
weight = 20
+++

> [!ressource] Ressources
> - [https://c4model.com/](https://c4model.com/)
> - [Visualising software architecture with the C4 model - Simon Brown](https://youtu.be/x2-rSnhpw0g)

> [!affirmation] Affirmation
> Représenter notre système avec différents niveau de détail

Le C4 Model permet de visualiser du code à différentes échelles (zoom / dézoom). On crée une carte (map) de notre code à différent niveau

> Différentes échelles pour différents usages pour s’adresser à différentes personnes

![zoom](zoom.png)

> A software system is made up of one or more containers (applications and data stores), each of which
contains one or more components, which in turn are implemented by one or more code elements (classes,
interfaces, objects, functions, etc)

![zoom](zoom2.png)

## Software System
- Décrit quelque chose qui apporte de la valeur au client
- On modélise
  - Notre software System
  - Et également ses interactions avec des autres Software System
    - E.g. dans le cas d’un SI on aura plusieurs logiciel qui vont communiquer ensemble pour pouvoir apporter la valeur

![https://static.structurizr.com/workspace/76748/diagrams/SystemContext.png](https://static.structurizr.com/workspace/76748/diagrams/SystemContext.png)

## Containers
Le diagramme des conteneurs montre la forme de haut niveau de l'architecture logicielle et la manière dont les responsabilités sont réparties. Il montre également les principaux choix technologiques et la manière dont les conteneurs communiquent entre eux. Il s'agit d'un diagramme simple, axé sur la technologie de haut niveau, qui est utile aux développeurs de logiciels et au personnel d'assistance et d'exploitation.

Exemples :
- Server-side Web App : Java EE sur serveur apache TomCat
- Client-side Web App : JavaScript qui tourne sur un navigateur web
- Client-side Desktop App : JavaFX
- Database : SGBD, MongoDB

![https://static.structurizr.com/workspace/76748/diagrams/Containers.png](https://static.structurizr.com/workspace/76748/diagrams/Containers.png)

## Component
Le diagramme des composants montre comment un conteneur est constitué (i.e ses « composants »), leurs responsabilités et les détails de la technologie et de la mise en œuvre. Sur l'image précédente, nous avons un conteneur nommé "API Application" et ici nous rentrons dans les détails de ce conteneur

Exemples :
- on parler techno : Spring Bean, Spring MVN, REST
- Découpage en modules
- Découpage en package / namespace

![https://static.structurizr.com/workspace/76748/diagrams/Components.png](https://static.structurizr.com/workspace/76748/diagrams/Components.png)
