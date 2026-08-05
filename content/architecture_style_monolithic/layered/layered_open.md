+++
draft = "true"
title = "Couche Ouverte"
weight = 15
+++

En ayant des couches fermées une couche ne peut interagir qu'avec sa n+1 ou sa n-1. Néanmoins comment pouvons-nous restreindre l'accès à certains composants de couches n-1 ou n+1 ? 

Dans l'architecture suivante, la couche métier a défini des composants partagés, par conséquent la couche de présentation peut y accéder. Cependant, la couche de présentation n'a pas à connaître ces composants, comment faire ?

![Alt text](../images/open1.png)

Nous pouvons découper la couche métier en deux, ainsi la partie présentation n'aura maintenant accès qu'à la partie métier. Les services partagés sont dans une couche inférieure. Et comme la couche métier n'est pas obligée de passer par la couche de service nous disons que celle-ci est *ouverte* :
- la couche métier peut contacter la couche service
- la couche métier peut aussi contacter la couche persistance

![Alt text](../images/open2.png)

## Conclusion
L'utilisation du concept de couches ouvertes et fermées permet de définir la relation entre les couches de l'architecture et les flux de demandes. Il fournit également aux développeurs les informations pour comprendre les différentes restrictions d'accès aux couches.
