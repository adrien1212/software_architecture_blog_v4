+++
draft = "true"
title = "Service-Based vs Microservices"
linkTitle = "Service-B vs Microservices"
weight = 40 
+++

> [!ressource] Ressources
> - [Lesson 114 - Microservices vs. Service Based Architecture](https://youtu.be/xkr5nGJYx_U)

> Service-based architecture is a hybrid of the microservices architecture style and is considered one of the most pragmatic architecture styles.

Après avoir compris comment chaque architecture se structure, l'essentiel est d'identifier les avantages et inconvénients puis de comparer les architectures entre elles. L'architecture *Service Based* et *Microservices* sont deux architectures populaires qui sont faciles à mettre en opposition.

Ainsi **cette section est primordiale** pour pouvoir répondre au mieux aux besoins et comprendre les compromis à faire.

![SB vs MS](../images/sb_vs_ms.png?width=30pc)

## Comparaison

|                    | **Service Based**                                                      | **Microservices**                                                                                       |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Taille             | Services gros grains, 3 à 12 services                                  | Service "fin" grains, plusieurs centaines de services                                                   |
| Cout               | Faible, pas besoin de DevOps Docker, Kubernates optionnel              | Elevé, besoin de DevOps                                                                                 |
| BDD                | Une seule ou plusieurs => cout faible                                  | Une par microservice                                                                                    |
| Transaction en BDD | Facile, partage d'une seule base de données                            | On souhaite éviter au maximum les transactions inter-service. Il faudra utiliser des patterns comme SAGA |
| Elasticité         | Faible, comme les services sont "larges" leur démarrage sera trop long | Elevé, démarrage rapide d'un service en cas de pic                                                      |

### Quand l'utiliser
L'architecture *Service Based* offre de nombreux avantages :
- Son coût est très faible par rapport à une architecture microservices
  - Pas besoin de DevOps ni d'une insfrastructure CI/CD
  - Une seule base de données à gérer

- La gestion est donc simplifiée avec un déploiement unique tout en ayant une gestion par service
  - Si un service tombe (crash) alors les autres seront toujours opérationnels
  ![Alt text](../images/crash.png)

### Quand l'éviter
Néanmoins on n'utilisera pas l'architecture *Space Based* (on préfèrera du microservices) dans les cas suivants :
- Il nous faut une forte [élasticité]({{% relref "../../../characteristics/elasticity.md" %}}). Ayant des services de taille conséquente leur allumage sera trop long

- Nous avons beaucoup de communication entre services. L'architecture *Service Based* est vraiment sympa lorsque nos services ne communiquent pas entre eux mais seulement avec la base de données où ils peuvent partager des informations (transaction facile).
![Alt text](../images/interservice.png)

- Nous avons trop de services
  - Il faudra soit les regrouper dans des services de taille plus grosse
  - Il faudra envisager plusieurs bases de données (pas forcément une par service)
