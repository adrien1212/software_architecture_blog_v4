+++
draft = "true"
title = "Front End"
weight = 25
+++

Dans la version initiale de l'architecture microservices la couche de présentation était incluse dans les [Bounded Context]({{% relref "../../basics_for_modeling/bounded_context/" %}}), mais cette approche rendait l'architecture compliquée. Ainsi deux solutions ont émergé :
- Une architecture microservices avec une interface utilisateur monolithique
- Une architecture microservices avec une interface utilisateur *microfrontend*

## Interface utilisateur monolithique
une interface utilisateur unique qui fait appel à la couche API pour répondre aux demandes des utilisateurs. Il peut s'agir d'une application bureautique, mobile ou web. Par exemple, de nombreuses applications web utilisent désormais un framework web JavaScript pour construire une interface utilisateur unique.

![monolithic ui](../images/monolithic_ui.png?width=35pc)

## Interface utilisateur Microfrontend
En utilisant ce modèle, les équipes peuvent isoler les limites des services depuis l'interface utilisateur jusqu'aux services backend. Ainsi une équipe de développement peut faire l'ensemble du service de A (frontend) à Z (backend).

Les développeurs peuvent mettre en œuvre le modèle de microfrontend de différentes manières, par exemple en utilisant du React.

![monolithic ui](../images/microfrontend_ui.png?width=35pc)
