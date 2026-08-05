+++
draft = "true"
title = "Avantages"
weight = 30
+++

> [!ressource] Ressources
> - [https://home.cs.colorado.edu/~kena/classes/5828/s10/presentations/soa.pdf](https://home.cs.colorado.edu/~kena/classes/5828/s10/presentations/soa.pdf)

L'architecture SOA offre de nombreux avantages sur différents plans.

## Plan Architectural

- Couplage faible : les services entretiennent une relation qui minimise les dépendances et ne font que s'informer mutuellement

- Abstraction : les services n'exposent que leur contrat au monde extérieur. Ils cachent leur logique interne

- Réutilisation : la logique est divisée en services dans le but de promouvoir la réutilisation

- Autonomie : les services contrôlent la logique qu'ils encapsulent

- Composition : les services peuvent être assemblés et coordonnés pour former un service plus complexe

- Découverte : les services sont conçus pour être décrits de l'extérieur afin de pouvoir être trouvés et évalués par le biais des mécanismes de découverte.

## Plan Business

- Diminution du coût : Ajouter de la valeur en tirant parti des services existants

  - Les nouveaux systèmes peuvent être construits plus rapidement et à moindre coût car
  - Réduire les dépenses d'intégration
  - Construit pour la flexibilité
  - Valeur à long terme de l'interopérabilité

- Conçu pour les partenariats :

  - Basé sur des normes (e.g. SOAP, WSDL)
  - L'intégration est motivée par ce qui est nécessaire, et non par ce qui est
    techniquement possible

- Agilité : Conçu pour le changement
  - Permet aux applications d'évoluer dans le temps et de durer
  - Abstraire le backend et le remplacer au fil du temps
  - Sous-traitance pour créer des services

## Plan Technique

- Scalable

- Gérer des systèmes complexes

  - Ne nécessite pas de services centralisés

- Utilisation de plateformes indépendantes

- Utilisation de standard pour communiquer entre les services (HTTP, SOAP, etc ...)

- Le couplage faible permet une forte flexibilité

- partage de données et de fonctionnalités, ceci n'était pas possible avec une architecture monolithique qui était fermée au monde extérieur
