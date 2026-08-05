+++
draft = "true"
title = "Ubiquitous Language"
weight = 20
+++

> [!ressource] Ressources

> - [Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html)

## Le problème

![Ubiquitous Language](../images/ubiquitous_language.png)

Un peu comme au jeu du Téléphone Arabe, le message va être altéré. L'expert métier utilise un vocabulaire que les développeurs vont interpréter qui est encore différent de celui utilisé le client. Par conséquent, les développeurs peuvent se retrouver à développer une bonne solution mais sur le mauvais problème ou tout simplement à développer une mauvaise solution.

## La solution

> [!danger] Définition
>  Le Ubiquitous Language fait référence à un vocabulaire partagé et cohérent utilisé par l'ensemble des parties prenantes, favorisant la communication et la compréhension des concepts du domaine métier tout au long du processus de développement du logiciel.

Pour que les partie prenantes communiquent efficacement nous devons éliminer les traductions inter-partie et à la place utiliser un vocabulaire commun. Qu'ils soient ingénieurs logiciel, Product Owner, experts du domaine, concepteurs UI/UX ils doivent utiliser un langage universel pour décrire le domaine d'activité.

### Lien avec le Bounded Context

Il est possible qu'un terme soit identique entre plusieurs domaines. Dans ce cas, il faut regarder si ces domaines ne peuvent pas être vu comme étant des [bounded context]({{% relref "../../basics_for_modeling/bounded_context" %}}).

![ubiquitous_language](../images/ubiquitous_language2.png)

On peut ainsi redéfinir se que signifie "commun" dans _vocabulaire commun_. Il ne consiste pas à un vocabulaire partagée dans toute l'entreprise ou dans tout le projet mais uniquement dans son _bounded context_

> A ubiquitous language is ubiquitous only in the boundaries of its bounded context.

# Une équipe par Bounded Context

Un Bounded Context et son ubiquitous language sont impélmentés et maintenus par une seule équipe. Deux équipes ne peuvent pas se partager le travail sur le même Bounded Context. Toutefois, une équipe peut travailler sur plusieurs Bounded Context.
