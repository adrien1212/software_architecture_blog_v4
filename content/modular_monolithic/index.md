+++
title = "Modular Monolithique"
weight = 70
+++

> [!ressource] Ressources
> - [MUST READ - Modular Monolith: A Primer](https://www.kamilgrzybek.com/blog/posts/modular-monolith-primer)
> - [MUST READ - Modular Monolith: Série d'articles](https://www.kamilgrzybek.com/blog/categories/modular-monolith)
> - [Modular Monolith by microservices.io](https://microservices.io/post/architecture/2023/07/31/how-modular-can-your-monolith-go-part-1.html)
> - [Lesson 159 - Modular Monolith Architecture](https://youtu.be/ikuu3QIuJuc)
> - [Modular Monoliths • Simon Brown • GOTO 2018](https://youtu.be/5OjqD-ow8GE)
> - [Are Modular Monoliths a Winner?](https://hexmaster.nl/posts/are-modular-monoliths-a-winner/)
>
> - [Un excellent talk qui revient sur bcp bcp de principe + code](https://youtu.be/nuHMlA3iLjY)
>   - Est-ce que le moduleA peut accéder au @Repository du module B et pourquoi ?
>   - Gérer relation cyclique entre Service/Module

Lors de la création d’un projet, il est courant d’opter pour une architecture en couches. Cette approche permet une structuration claire du code et une séparation des responsabilités. Cependant, à mesure que le projet prend de l’ampleur, il devient difficile de maintenir la même vélocité de développement. Face à cette complexité croissante, de nombreuses équipes se tournent alors vers une architecture en microservices, perçue comme une solution aux problèmes de scalabilité et de modularité. Mais ...

> If you can't build a monolith, what makes you think microservices are the answer ? - Simon Brown

Cette citation nous invite à la prudence : elle souligne que les microservices ne sont pas une solution miracle. Avant de fragmenter notre système en plusieurs services distribués — avec toutes les complexités techniques, organisationnelles et opérationnelles que cela implique — il est essentiel de comprendre pourquoi notre monolithe actuel ne fonctionne pas. Une mauvaise architecture monolithique ne justifie pas, à elle seule, le passage aux microservices. 

## La mauvaise raison des microservices

Une erreur fréquente consiste à justifier le passage aux microservices par la simple présence d’un Big Ball of Mud. L’argument avancé est souvent le suivant : "Les microservices vont nous permettre de mieux structurer notre code en créant des domaines indépendants."

Mais cette approche revient à introduire une architecture inutilement complexe pour masquer un manque de rigueur dans la conception initiale. Le véritable problème ne réside pas dans le fait d’utiliser un monolithe, mais dans la manière dont il a été structuré. Ce que nous rencontrons, ce n’est pas une limite inhérente au monolithe, mais l’absence de principes fondamentaux de conception logicielle : un manque de [modularité]({{< relref "fundamental_principles/modularity/index" >}}), une violation du principe de [couplage faible et de forte cohésion]({{< relref "fundamental_principles/couplage_and_cohesion/index" >}}).

> Many of the benefits architects tout about microservices : isolation, independence, small unit of change, can be achieved in monolithic architectures if developers are extremely disciplined about coupling.[^1]

## L'arrivé du Modular Monolith

L'architecture *Modular Monilithe* propose de garder la simplicité d'un déploiement d'une seule instance tout en découpant notre produit suivant les *Bounded Context*. Ainsi cette alternative est fortement envisageable si notre système n'a pas besoin de scalabilité (avantage principal du microservice).

=> Des avantages des microservices sans ses inconvénients

![alt text](alternative.png)

### Modular Monolith vers Microservices

Puis lorsqu'on aura un besoin de migrer les du microservices, chaque module sera un candidat idéal pour devenir un microservice indépendant dans le futur.

[^1]: Building Evolutionary Architecture p56
