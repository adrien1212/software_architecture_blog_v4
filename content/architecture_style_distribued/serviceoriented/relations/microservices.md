+++
draft = "true"
title = "Microservices"
weight = 20
+++

> [!ressource] Ressources
> - [https://www.ibm.com/blog/soa-vs-microservices/](https://www.ibm.com/blog/soa-vs-microservices/)
> - [https://badia-kharroubi.gitbooks.io/microservices-architecture/content/](https://badia-kharroubi.gitbooks.io/microservices-architecture/content/)
> - [The Evolution of Microservices with SOA: Navigating the Architectural Landscape](https://foojay.io/today/evolution-of-microservices-from-soa-to-modern-architecture/)

> L'architecture de microservices est une évolution du style d'architecture de SOA.

## Périmètre

Dans l'introduction de ce chapitre j'évoquais SOA comme une "philosophie" à adopter dans son organisation.

En effet l'architecture orientée services (SOA) a une portée d'entreprise, elle est conçue pour répondre aux besoins d'intégration et de collaboration d'une entreprise entière, englobant diverses unités commerciales, départements et systèmes.

Quant à elle l'architecture microservices a une portée plus ciblée au niveau de l'application. Elle s'intéresse principalement à la conception et à la structure d'un service spécifique.

![Alt text](../images/perimetre.png)

> Si vous acceptez la différence de champ d'application, nous pouvons rapidement nous rendre compte que les deux approches peuvent potentiellement se compléter, plutôt que se concurrencer.

## "Quelques autres différences"

{{% notice style="note" title= "" icon="" %}}
La notion importante à retenir ici est le _périmètre_ de chaque architecture.
{{% /notice %}}

Nous détaillons ici d'autres différences pour comparer ces deux architectures même si nous ne devrions pas les évoquer (périmètre différent).

**Communication**

- Dans une architecture SOA la communication se fait au travers d'un ESB, la rendant ainsi vulnérable en cas de problème sur ce dernier.
- Avec l'architecture microservices, les services communiquent via des _lightweight messaging protocols_ (e.g. HTTP, REST, JMS). Les services peuvent communiquer de manière asynchrone (event, publish/subscribe) à travers ces APIs pour permettre à un composant microservices de rester informé des modifications apportées si celui-ci tombe (shutdown).

**Source de vérité**

- Avec une architecture SOA nous avons une base de données centrale qui est partagée par plusieurs services.
- Dans une architecture microservices, chaque service possède sa propre base de données. On préfèrera ainsi dupliquer une donnée plutôt que se la partager entre deux microservices.

**Granularité**

- Les architectures microservices sont composées de services hautement spécialisés, chacun d'entre eux étant conçu pour faire une chose très bien.
- Les services qui composent la SOA, en revanche, peuvent aller de petits services spécialisés à des services à l'échelle de l'entreprise.
