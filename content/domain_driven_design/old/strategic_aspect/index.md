+++
draft = "true"
title = "Aspect Stratégique"
weight = 10
+++

> [!danger] Définition
>  L'aspect stratégique du DDD consiste à répondre aux questions "quoi ?" et "pourquoi ?". C'est-à-dire quel logiciel nous construisons et pourquoi nous le construisons.

> A software project’s success depends on the effectiveness of knowledge sharing between domain experts and software engineers. We have to understand the problem in order to solve it.
> -- Alberto Brandolini

Les patrons stratégiques sont de haut niveau, ils permettent à l'équipe d'extraire les Bounded Context d'un système.

En utilisant des outils stratégiques : _context map_, _event storming_, vous êtes en mesure d'obtenir une _context map_ qui définit clairement les Bounded Context de notre _domain model_. Que vous construisiez un système distribué ou non, ceci est extrêmement important, car ce type de couplage de domaine est ce qui tue les systèmes au fil du temps.

Dans le monde SOA ou microservices, le fait de pouvoir décomposer votre _domain model_ en une série de contextes, avec des dépendances événementielles claires entre eux, vous permet de définir les limites des microservices de manière structurée.
