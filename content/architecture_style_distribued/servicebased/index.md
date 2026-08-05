+++
draft = "true"
title = "Service-Based"
weight = 20
alwaysopen = false
+++

La *Service Based Architecture* est essentielle à comprendre. Elle s'inscrit comme bon compromis entre les [architectures monolithiques]({{% relref "../../architecture_style_monolithic/" %}}) et l'[architecture microservices]({{% relref "../microservices/" %}}). De nombreux concepts de l'architecture *Service Based* sont repris dans le chapitre dédié aux microservices. 

> [!danger] Définition
>  L'essentiel est de comprendre les [différences]({{% relref "servicebased_vs_microservices.md" %}}) entre l'architecture service-based et l'architecture microservices.

## Introduction par Mark Richard
Pour en remettre une couche sur l'importance de considérer cette architecture, je vous copie/colle l'introduction de cette architecture par Mark Richard
> Service-based architecture is a hybrid of the microservices architecture style and is considered one of the most pragmatic architecture styles, mostly due to its architec‐ tural flexibility. Although service-based architecture is a distributed architecture, it doesn’t have the same level of complexity and cost as other distributed architectures, such as microservices or event-driven architecture, making it a very popular choice for many business-related applications.

## Composition
Cette architecture se compose :
- de plusieurs services qui sont des domaines indépendants déployés en tant qu'unités logicielles distinctes.
- d'une base de données centrale qui est partagée avec l'ensemble des services
- les services sont accessibles via un protocole d'accès à distance (e.g. REST)

![Service Based Architecture](images/servicebased.png)

Les services représentent le cœur applicatif. Étant donné que nous n'avons qu'une seule base de données, nous limiterons le nombre de services de 4 à 12. Le principal problème surviendra lorsque nous souhaiterons changer l'architecture de notre base de données : l'ensemble des services sera impacté. Une solution consiste à faire du [Database Partitioning]({{% relref "database_partitioning.md" %}})
