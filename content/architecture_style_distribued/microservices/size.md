+++
draft = "true"
title = "Quelle taille ?"
weight = 15
+++

La principale difficulté réside dans le fait de déterminer la bonne granularité pour un service.

## Déterminer la bonne granularité

{{% notice style="note" title= "" icon="" %}}
Le terme _microservice_ ne signifie pas qu'on doit faire des services les plus petits possibles.
{{% /notice %}}

En effet, à cause du terme _micro_, des personnes commettent souvent l'erreur de rendre leurs services trop petits, ce qui les oblige à établir des liens de communication entre les services pour effectuer un travail utile. Créer du lien, c'est créer du couplage; créer du couplage montre une forte dépendance; pourquoi pas les réunir dans un seul et même service ?

Pour trouver les bonnes frontières on peut suivre ces recommandations :

- Objectif : chaque service doit avoir une très forte cohésion fonctionnelle. Contribuant à un comportement significatif de l'application.
- Transaction : les transactions posent des problèmes dans les architectures distribuées si on veut les éviter le mieux est de regrouper les services les partageant.
- Chorégraphie : si un architecte construit un ensemble de services qui offrent une excellente isolation, mais qui nécessitent une communication importante pour fonctionner, il peut envisager de regrouper ces services dans un service plus important afin d'éviter la surcharge de communication.

{{% notice style="warning" title= "Anti-patron" icon="" %}}
un anti-patron courant consiste à prendre chaque nom important et à y créer son propre microservice.
{{% /notice %}}

## Conséquence

La détermination de la taille appropriée pour les microservices semble être un problème omniprésent - les services trop petits créent des problèmes transactionnels et d'orchestration, et les services trop grands créent des problèmes de mise à l'échelle et de distribution.
