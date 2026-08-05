+++
draft = "true"
title = "Définition"
weight = 20
+++

> [!ressource] Ressources
> - [https://aws.amazon.com/fr/what-is/service-oriented-architecture/](https://aws.amazon.com/fr/what-is/service-oriented-architecture/)
> - [https://www.redhat.com/fr/topics/cloud-native-apps/what-is-service-oriented-architecture](https://www.redhat.com/fr/topics/cloud-native-apps/what-is-service-oriented-architecture){{% /notice %}} 

## Définition

> [!danger] Définition
>  Service-Oriented Architecture (SOA) is an architectural style that supports *service orientation*.  
>  *Service orientation* is a way of thinking in terms of services and service-based development and the outcomes of services.[^1]
>  
>  [^1]: https://collaboration.opengroup.org/projects/soa-book/pages.php?action=show&ggid=1314

> [!danger] Définition
>  La SOA sépare les fonctions en unités distinctes (i.e. services), que les développeurs rendent accessibles sur un réseau afin de permettre aux utilisateurs de les combiner et de les réutiliser dans la production d'applications.

Un service :
- Est une représentation logique d'une activité métier reproductible ayant un résultat précis (e.g. vérifier le crédit d'un client, fournir des données météorologiques, consolider les rapports de forage).
- Est autonome
- Peut être composé d'autres services
- Est une "boîte noire" pour les consommateurs du service.

Les développeurs utilisent la SOA pour réutiliser des services dans différents systèmes ou combiner plusieurs services indépendants pour effectuer des tâches complexes.  
Par exemple, plusieurs processus métier dans une organisation nécessitent la fonctionnalité d'authentification de l'utilisateur. Au lieu de réécrire le code d'authentification pour tous les processus métier, vous pouvez créer un service d'authentification unique et le réutiliser pour toutes les applications. 

## Principes SOA
Il n'existe pas de directives standard bien définies pour la mise en place d'une architecture orientée services (SOA). Cependant, certains principes de base sont répandus dans toutes les mises en place de la SOA.


### Interopérabilité

Chaque service dans une SOA inclut des documents descriptifs qui indiquent la fonctionnalité du service et les conditions générales qui y sont liées. Tout système client peut exécuter un service, peu importe la plateforme sous-jacente ou le langage de programmation. Par exemple, les processus métier peuvent utiliser des services rédigés en C# et en Python. Puisqu'il n'y a pas d'interactions directes, les modifications d'un service n'affectent pas les autres composants qui utilisent ce service.

### Couplage faible

Les services d'une SOA doivent être couplés de manière faible et dépendre aussi peu que possible des sources externes comme les modèles de données ou les systèmes d'information. Ils doivent également être sans état et ne retenir aucune information des sessions ou des transactions passées. Ainsi, si vous modifiez un service, cela n'affectera pas de manière significative les applications client et les autres services qui l'utilisent.

### Principe d'abstraction du service

Les clients ou les utilisateurs de service d'une SOA ne doivent pas connaître la logique de code ou les détails de mise en œuvre du service. Ils doivent considérer les services comme une boîte noire. Les clients obtiennent les informations nécessaires relatives à la fonction et à l'utilisation du service via des contrats de service et autres documents de description du service.

### Principe de granularité du service

Les services d'une SOA doivent avoir une taille et une portée appropriées, l'idéal étant de regrouper une fonction
métier individuelle par service. Ensuite, les développeurs peuvent utiliser plusieurs services pour créer un service composite destiné à réaliser des opérations complexes.
