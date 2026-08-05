+++
title = "Subdomain"
weight = 20
+++

> [!ressource] Ressource
> - [Chapter 1. Analyzing Business Domains](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/ch01.html)
> - [Revisiting the Basics of Domain-Driven Design](https://vladikk.com/2018/01/26/revisiting-the-basics-of-ddd/)

> [!definition] Définition
> To achieve its [business domain’s]({{< relref "domain_driven_design/analyzing_business_domain/domain" >}}) goals and targets, a company has to operate in multiple subdomains. A subdomain is a fine-grained area of business activity.

 Par exemple, Starbucks est peut-être plus connu pour son café (business domain), mais pour créer une chaîne de cafés prospère, il ne suffit pas de savoir faire du bon café. Il faut également acheter ou louer des biens immobiliers à des emplacements efficaces, embaucher du personnel et gérer les finances, etc. Aucun de ces sous-domaines ne permet à lui seul de créer une entreprise rentable. Ils sont tous nécessaires pour qu'une entreprise soit compétitive dans son (ses) domaine(s) d'activité.

## 3 types de sous-domaines

![3 types subdomain](domain_driven_design/analyzing_business_domain/images/three_types_subdomain.png)

### 1. Core subdomain

> Le Core subdomain est ce qui donne un avantage compétitif à une entreprise. Ce qui la différencie de ses concurrents

- Il n'est pas facilement copiable (c/c) par une autre entreprise
- Il est complexe et change souvent

### 2. Generic subdomain

> Les Generic subdomains sont les choses que toutes les entreprises font

- Peuvent être complexes à mettre en oeuvre mais n'offrent pas un avantage compétitif
- Par exemple, la plupart des systèmes ont besoin d'authentifier et d'autoriser leurs utilisateurs. Au lieu d'inventer son propre mécanisme d'authentification, il est plus judicieux d'utiliser une solution existante.

### 3. Supporting subdomain

> Soutiennent le business de l'entreprise, mais n'offrent pas un avantage compétitif (core subdomain)

- Ces *supporting subdomains* sont souvent très simples et s’apparentent à des CRUD ou ETL.
- Par exemple, on stocke les documents dans une base MongoDB, on va créer une simple API CRUD permettant de faciliter l’échange des core-subdomain avec MongoDB en optimisant la taille des fichiers

### Comparaison
![comparing subdomain](domain_driven_design/analyzing_business_domain/images/comparing_types_subdomain.png)

Lire la ressource [Chapter 1. Analyzing Business Domains](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/ch01.html)

### Migration d'un vers l'autre
Au fil que le domaine évolue (fonctionnalité, lois, concurrents, etc) vos sous-domaines peuvent être amenés à migrer.
Par exemple vous aviez un algorithme très performant pour la gestion des stocks dans votre usine mais un groupe de recherche a rendu public un algorithme tout aussi performant. Vos concurrents vont donc pouvoir s'appuyer dessus et vous ne bénéficiez plus d'un avantage concurrentiel sur ce sous-domaine (core -> generic)

## Identifier Subdomain Boundaries

