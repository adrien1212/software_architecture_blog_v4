+++
title = "Définir un module"
weight = 10
+++

> [!ressource] Ressources
> - [Modular programming - Wikipédia](https://en.wikipedia.org/wiki/Modular_programming)



> [!danger] Définition
>  Modularity is the property of a system to which degree it is composed of modules. Modularity is recursive - Modules may be further decomposed into submodules. A module is a [cohesive, loosely coupled]({{< ref "fundamental_principles/couplage_and_cohesion/definition" >}}), encapsulated and composable piece of software that does one thing.[^1]
>  
>  [^1]:
>      [https://gregorriegler.com/2020/08/08/levels-of-modularity.html](https://gregorriegler.com/2020/08/08/levels-of-modularity.html)

![Module](fundamental_principles/modularity/images/module.png)

## Ce que n'est pas un module
Un module n'est :
- ni une classe
- ni un package
- ni un Module de Java 9

## Définir un module

> [!danger] Définition
>  La modularité consiste à décrire un regroupement logique de code (_related grouping of_). Ce regroupement devient une unité logicielle déployable, gérable (manageable), réutilisable, composable et sans état (stateless) qui fournit une interface concise au client.
 
Un module, regroupe plusieurs packages qui collaborent pour fournir une fonctionnalité métier complète et cohérente. Par exemple, le module "Gestion des commandes" pourrait inclure les packages suivants :
- `com.example.commandes.creation` (création de commandes)
- `com.example.commandes.suivi` (suivi des commandes)
- `com.example.commandes.historique` (historique des commandes).

Puis chaque package peut être redivisé à sa guise, par exemple
- `com.example.commandes.creation`
  - `com.example.commandes.creation.controller`
  - `com.example.commandes.creation.service`
  - `com.example.commandes.creation.repository`

### Objectifs de la modularité
En créant plusieurs modules (e.g. le module "Gestion des commandes") nous souhaitons :
- faciliter la compréhension, en divisant le système en modules, chaque module représente une fonctionnalité métier distincte ou une unité logique clairement définie.
- encourager la réutilisabilité, les modules bien conçus peuvent être réutilisés dans plusieurs projets ou dans différentes parties du même système.
- cacher ses détails d’implémentation et expose uniquement ce qui est nécessaire via des interfaces publiques.
- faciliter l'évolutivité, en permettant de faire évoluer un module de manière isolée, sans perturber l’ensemble de l’application.
- qu'il soit déployable indépendant des autres modules


## Caractéristiques
Un module est donc un concept qui [abstrait]({{< relref "abstraction" >}}) notre système et qui répond aux caractéristiques suivantes 
- **Objectif Unique et Cohérent**
  Un module doit regrouper des fonctions, des classes ou des composants qui poursuivent un même objectif ou qui sont étroitement liés entre eux (c.-à-d. **haute cohésion**).

- **Interface Bien Définie**
  La manière dont le code externe interagit avec le module doit être clairement spécifiée (par exemple, via des fonctions publiques, des méthodes de classe ou une API). Cette interface doit masquer les détails internes de sorte que, si ces derniers changent, l’impact sur les autres modules reste minimal.

- **Encapsulation de l’Implémentation**
  Un module conserve sa logique interne privée. Les autres parties du système ne voient que ce que le module choisit d’exposer. Cette [encapsulation]({{< relref "encapsulation" >}}) permet de maintenir un **faible couplage** entre les modules.

- **Déploiement et Tests Indépendants**
  Un module bien conçu peut souvent être développé, testé, voire déployé indépendamment du reste de l’application, ce qui facilite sa maintenance et son évolution.


> The crucial aspect of modularity is concept of 'interchangeability'. If you can replace one component of your design with another component without changing anything else, we can say there is a high degree of modularity with that aspect of the design.

Dans la section [Caractéristiques d'un module]({{< relref "fundamental_principles/modularity/characteristics" >}}) nous verrons comment implémenter ces caractéristiques dans nos solutions


## Lien avec l’architecture logicielle
> L’architecture Logicielle a pour objectif de **minimiser l’impact et le coût du changement**. La modularité est un intermédiaire important pour augmenter l’agilité architecturale.
 
En prenant en compte la modularité pour la création de nos architectures, nous maximisons les chances d'avoir un système 
- Facilement déployable
- Gérable (Manageable)
- Testable
- Réutilisable
 
La modularité est ainsi au cœur de la conception des architectures. Lorsqu'on souhaite réaliser un logiciel avec une architecture [Microservices]({{< relref "architecture_style_distribued/microservices" >}}) ou [Modular Monolithique]({{< relref "modular_monolithic" >}}) la première chose à faire est de définir des [Bounded Context]({{< relref "basics_for_modeling/bounded_context/" >}}) afin d'avoir des services/modules faiblement couplés.

[^1]: (https://www.kamilgrzybek.com/blog/posts/modular-monolith-primer)
