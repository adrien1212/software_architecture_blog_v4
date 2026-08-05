+++
title = "BC et Microservices"
weight = 20
+++

> [!ressource] Ressources
> - [Bounded Contexts are NOT Microservices](https://vladikk.com/2018/01/21/bounded-contexts-vs-microservices/)
> - [About Bounded Contexts and Microservices](https://blog.avanscoperta.it/2020/06/11/about-bounded-contexts-and-microservices/)
> - [Video - Bounded Contexts, Microservices, and Everything In Between - KanDDDinsky 2018 ](https://youtu.be/dlnu5pSsg7k)
> - [Identify microservice boundaries](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/microservice-boundaries)

## Bounded Context == microservice ?
### Théoriquement non ...
On pourrait rapidement penser d'un Bounded Context peut se matérialiser par un microservice. Mais en réalité nous sommes entrain de comparer les pommes avec des oranges.
- Un Bounded Context définit les limites les plus vastes des services : c'est-à-dire des services ne rencontrant aucun conflit d'Ubiquitous Language entre eux. Ainsi comme présenté dans la [stratégie de découpage d'un Bounded Context]({{< relref "fundamental_principles/bounded_context/#stratégie-de-découpage" >}}) nous pouvons obtenir un *Monolith BC* qui est un bon monolithe car il ne contiendra pas d’ambiguïté.
- Maintenant, si on décompose davantage le Bounded Context, vous trouverez les microservices recherchés.

> Therefore, A Microservice is a Bounded Context, but not vice versa. Not every Bounded Context is a Microservice.

![bc_and_ms](bc_and_ms.png)

Les Bounded Context vont nous aider à concevoir nos microservices. Et on peut noter qu'un Bounded Context peut englober plusieurs microservice.

### Mais ...
Sam Newman dans son livre *Building microservices* page 52 nous dit

> **Both the aggregate and the bounded context give us units of cohesion with well-defined interfaces with the wider system [...] Both can therefore work well as service boundaries.** As you
find your feet and decide to break these services into smaller services, you need to
remember that aggregates themselves don’t want to be split apart—one microservice
can manage one or more aggregates, but we don’t want one aggregate to be managed
by more than one microservice.

## Subdomain == microservice ?
> [!ressource] Ressource
> [Pattern: Decompose by subdomain](https://microservices.io/patterns/decomposition/decompose-by-subdomain.html)

Nous pouvons concevoir nos microservices en nous appuyant sur les sous-domaine

![alt text](subdomain_microservices.png)

> A more balanced heuristic for designing microservices is to align the services with the boundaries of business subdomains.
> - From a business domain perspective, subdomains describe the capabilities—what the business does—without explaining how the capabilities are implemented. 
> - From a technical standpoint, subdomains represent sets of coherent use cases: using the same model of the business domain, working on the same or closely related data, and having a strong functional relationship.[^1]

[^1]: Learning Domain Driven Design p228