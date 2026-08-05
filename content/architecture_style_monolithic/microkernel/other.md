+++
draft = "true"
title = "Autres considérations"
weight = 10
+++

## Implémenter le coeur 
Le coeur applicatif peut être implémenté de différentes façons :
- nous pouvons utiliser une [architecture Layered]({{% relref "../Layered" %}})
- nous pouvons le découper en différents domaines logiques qui intègrent un ou plusieurs plugins. Par exemple le service de paiement pourra faire appel à plusieurs plugins (carte bancaire, paypal, etc.).

![core organization](../images/core_organization.png)


Une alternative consiste à séparer la couche présentation du cœur applicatif (elle peut avoir ou non des plugins).
![core organization](../images/core_organization2.png?width=30pc)

## Gestion des données
Pour les données nous pouvons :
- soit avoir une base de données unique gérée par le noyau (kernel)
- soit chaque plugin gère ses propres données (en mémoire (in-memory) ou en base de données)

![BDD](../images/db.png?width=35pc)
