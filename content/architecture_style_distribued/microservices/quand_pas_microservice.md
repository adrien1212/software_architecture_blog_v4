+++
draft = "true"
title = "Quand éviter les microservices ?"
weight = 60
+++

L'architecture microservices est devenue très populaire ces dernières années en raison de ses nombreux avantages potentiels, tels que la scalabilité, la flexibilité et la facilité de déploiement. Cependant, il est important de reconnaître qu'elle n'est pas toujours la meilleure solution pour tous les systèmes.

## Petits systèmes

Les petits systèmes avec peu de complexité devraient continuer d'utiliser une architecture monolithique.
En effet, l'architecture microservice ajoute de la complexité.

Ainsi, si vous n'avez que deux ou trois services, alors il vaut mieux éviter d'utiliser les microservices.

## Fonctionnalités/données mélangées

Pour rappel, dans une architecture microservice un service doit être le plus autonome possible.

Par conséquent, si vous ne pouvez pas séparer votre logique ou vos données alors il ne sert à rien d'essayer de faire du microservices.
Pour savoir si c'est votre cas, regardez combien de services sont appelés par vos requêtes. S'il y a plus d'un service alors vos services ne sont pas autonomes.

## Système performant

Pour les systèmes dont la performance est la caractéristique première l'architecture microservices n'est pas la plus adaptée :

- beaucoup de communications qui rajoutent de la latence (réseau, cryptage, etc ...)

## Quick-and-Dirty Systems

Lorsqu'on veut créer rapidement un logiciel (e.g. faire un Proof of Concept (POC)), il faut privilégier le monolithe. En effet, implémenter des microservices demande du temps et rajoute de la complexité.

## Aucune mise à jour prévue

Bien que cela soit de moins en moins fréquent, il existe des applications qui ne nécessitent presque aucune mise à jour (e.g. système embarqué).

L'avantage du microservice est sa rapidité de mise à jour grâce à des cycles itératifs. Par conséquent, aucune raison d'utiliser cette approche si le système n’est jamais mis à jour.
