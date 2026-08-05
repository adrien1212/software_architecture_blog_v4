+++
draft = "true"
title = "Enterprise Service Bus"
weight = 20
+++

Nous avons vu que notre SI est composé de plusieurs services. Mais ces services n'étant pas forcément écrits dans un même langage, n'utilisant pas les mêmes protocoles doivent pouvoir fonctionner ensemble. Nous devons trouver un moyen d'assurer la communication entre nos différents services.

## Définition

> [!danger] Définition
>  Un ESB fournit des capacités de communication et de transformation à travers une interface de service réutilisable. Vous pouvez considérer un ESB comme un service centralisé qui achemine les demandes de service vers le service approprié.

Un Enterprise Service Bus (ESB) est un composant central qui se positionnera comme un interlocuteur unique pour tous les composants du SI. Ainsi, quand vous voudrez appeler un composant X, vous n'irez plus jamais lui parler directement. Vous ne saurez même pas quel protocole il accepte, ni son URL ! Il suffira d'envoyer une requête (e.g. SOAP) à l'ESB qui lui s'occupera ensuite de faire le nécessaire pour transformer votre message et l'adapter avant de le transférer au composant demandé. Il fera ensuite la même chose pour la réponse.

Avec une connexion point-à-point les différents services auraient dû adapter leur message pour chaque service interrogé. Maintenant avec un ESB qui centralise tous les adaptateurs nous n'avons besoin de connecter nos services qu'à l'ESB qui se charge de traduire la requête puis la réponse.

![ESB](https://it.ucla.edu/sites/default/files/media/images/esb_diagrams_1b.jpg)

{{% notice style="note" title= "" icon="" %}}
Dans une architecture SOA, l'ESB intègre un Service Broker
{{% /notice %}}

## Effet néfaste

L'ESB essaie de tout faire (routing, validation, authentification, protocole, etc ...) et ceci crée une énorme complexité pour le maintenir.

C'est pour cette raison, qu'avec l'architecture microservice nous n'utilisons plus l'ESB mais une approche par _Smart Endpoint and Dumb pipe_ (utiliser les protocoles de communication standards sans utiliser un médiateur pour les connecter entre eux mais des Gateway ou du Discovery).
