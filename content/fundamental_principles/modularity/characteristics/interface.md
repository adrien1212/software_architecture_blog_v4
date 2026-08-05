+++
title = "Interfaces"
weight = 3
+++

La troisième caractéristique est la définition d'interface qui feront office de point d'entrée / de contrat.

> Sometimes it is some kind of facade for synchronous calls (e.g. public method or REST service), sometimes it can be an published event for asynchronous communication

![interface](fundamental_principles/modularity/characteristics/images/interface.png)

Deux modules communiquent au travers d'interfaces, elles peuvent prendre plusieurs formes :
- *in-memory*, par exemple en définissant une interface en Java qui sera appelée
- via un appel HTTP/Rest
- ou encore de manière asynchrone avec du *messaging* entre les deux modules