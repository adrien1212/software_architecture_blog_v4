+++
draft = "true"
title = "Composants"
weight = 10
+++

Une architecture orientée services (SOA) est constituée de quatre composants principaux.

## Services

> [!danger] Définition
>  L’architecture orientée services expose les fonctionnalités de l’entreprise sous la forme de services destinés à être consommés par les applications.

> En plus des notes données dans cette section, vous pouvez vous référer à la partie [Définition]({{% relref "../definition.md" %}}) 

Les services sont les éléments constitutifs de base d'une SOA. Ils peuvent être privés (uniquement disponibles pour les utilisateurs internes d'une organisation) ou publics (disponibles pour tous via Internet). De manière individuelle, chaque service est doté de trois fonctions principales.

**Mise en œuvre du service**  
La mise en œuvre du service est le code qui construit la logique permettant de réaliser la fonction spécifique du service, telle que l'authentification des utilisateurs ou le calcul des factures.

**Contrat du service**  
Le contrat du service définit la nature du service ainsi que les conditions générales qui y sont associées, par exemple les prérequis d'utilisation du service, le coût et la qualité du service offert.
 
**Interface du service**  
Dans une SOA, les autres services ou systèmes communiquent avec un service via son interface. L'interface définit comment vous pouvez invoquer le service pour réaliser des activités ou échanger des données. Elle réduit les dépendances entre les services et le demandeur de service. Par exemple, même les utilisateurs avec pas ou peu de compréhension de la logique de code sous-jacente peuvent utiliser un service via son interface. 


## Fournisseur de services

Le fournisseur du service crée, maintient et fournit un ou plusieurs services que d'autres entités peuvent utiliser. Ces services encapsulent des fonctionnalités spécifiques ou des règles métiers qui peuvent être par exemple achetées par des services tiers.

## Consommateur de services
Le consommateur de services demande au fournisseur de services d'exécuter une action spécifique. Le contrat de service (accessible via le registre) spécifie les règles que le fournisseur et le consommateur de services doivent suivre lorsqu'ils interagissent l'un avec l'autre (e.g. protocole, paramètres d'entrée, paramètre de sortie, etc ...)

## Broker ou registre de services
Pour savoir quels services existent et comment communiquer avec eux nous avons besoin d'un registre.

Un *registre de service*, ou broker, est un répertoire contenant les services disponibles, accessible via le réseau. Il stocke les contrats des services émis par les fournisseurs. 
Le contrat précise la manière dont la communication doit se faire avec le service (e.g. protocole, paramètres d'entrée, paramètre de sortie, etc ...)


![services](../../images/histoire.png?width=30pc)
