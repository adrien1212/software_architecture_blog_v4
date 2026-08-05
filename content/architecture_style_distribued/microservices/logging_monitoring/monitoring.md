+++
draft = "true"
title = "Monitoring"
weight = 1
+++

## Implémenter le Monitoring

> [!danger] Définition
>  Le Monitoring regarde les métriques et détecte les anomalies

Cela permet de fournir une vue simplifiée du système. Par exemple Kibana propose la vue suivante

![kibana](../images/kibana.png?width=40pc)

## Deux types de monitoring

Il existe deux types de monitoring :

- Monitoring d'infrastructure
- Monitoring d'application

### Monitoring d'infrastructure

> [!danger] Définition
>  On y contrôle le serveur (CPU, RAM, Disque, Réseau)

On alerte lorsqu'un problème d'infrastructure est détecté.

### Monitoring d'application
 
 > [!danger] Définition
 >  On y contrôle l'application elle-même (Requêtes par minute, commandes par jour, etc.)

On alerte quand un problème applicatif est détecté.

## Les outils

Comme pour le Logging il existe plusieurs produits pour le Monitoring :

- Nagios
- Stack
- New Relic
- Application Insights
