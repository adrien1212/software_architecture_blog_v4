+++
draft = "true"
title = "Layered VS N-tiered"
weight = 20
+++

{{% notice style="note" title="TL;DR" icon="" %}}
N-tiered : séparation *physique*, Layered : séparation *logique* (cf [séparation Physique/Logique]({{% relref "../../basics_for_modeling/logical_physical_separation.md" %}}))
{{% /notice %}}

Presque tout le monde dans le domaine du logiciel utilise ces deux termes de manière interchangeable, comme s'il s'agissait exactement de la même chose. 
 
 En d'autres termes, nous pouvons positionner notre code dans différents packages (e.g. pour améliorer la lisibilité) mais le déploiement d'un seul package n'est pas possible.


## N-tiered
Correspond à une division physique (hardware) du système et de la manière dont le code s'exécute (e.g client et serveur).
Lorsqu'on parle d'architecture 3-tier on fait donc référence à une séparation physique.

![tiers](https://librecours.net/module/culture/langages-du-web/pres/res/servers.png?width=30pc)

Si votre logiciel complet est hébergé sur un serveur, il s'agit d'une architecture 1-tier. Si votre logiciel est stocké sur deux serveurs :
- un premier qui est responsable de la couche (layer) présentation
- un second qui est responsable de la partie backend (couche métier, couche accès à la base de données)

Vous avez donc une architecture 2-tier, où chaque tiers peut gérer plusieurs couches.

## Layered
Une architecture Layered est une organisation *logique du code* en couches : présentation, métier et persistance. Les composants sont regroupés en fonction de leur rôle, et pour chaque rôle (présentation, métier et persistance) on va souvent associer un serveur, d'où la proximité avec l'architecture n-tier.


![layered](https://www.oreilly.com/api/v2/epubs/9781491971437/files/assets/sapr_0101.png?width=30pc)


### Ce que n'est pas une architecture Layered
Dans la section nous précisons une organisation *logique **du code***. Et non une organisation logique du domaine. En effet, chaque domaine (e.g. un client) est représenté dans les trois couches. L'inconvénient réside dans le fait que si nous modifions les règles du domaine, nous devrons impacter les trois couches.

Par conséquent, une approche *Domain Driven* n'est pas des plus compatibles avec le style architectural Layered.


## Un fort lien
Les deux architectures peuvent être fortement liées. En effet, si notre code est déjà logiquement séparé en couches distinctes (interface utilisateur, logique métier, accès aux données), cela peut rendre plus facile la distribution physique de ces couches sur des serveurs distincts dans une architecture n-tier.

On privilégiera donc en premier un découpage logique de notre code pour préparer un éventuel découpage physique.
