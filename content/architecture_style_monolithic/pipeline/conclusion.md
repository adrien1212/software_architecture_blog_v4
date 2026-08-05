+++
draft = "true"
title = "Conclusion"
weight = 10
+++

## Avantages
- Modularité : Les filtres peuvent être développés et maintenus indépendamment, ce qui simplifie le processus de développement et favorise la réutilisation du code.

- Flexibilité : Le pipeline peut être facilement adapté à l'évolution des besoins en ajoutant, modifiant ou supprimant des filtres.

- Parallélisme : dans certains cas, les filtres peuvent être exécutés en parallèle, ce qui améliore les performances, en particulier dans les systèmes multicœurs.

- Lisibilité et maintenabilité : La structure du pipeline permet souvent d'obtenir un code plus propre et organisé, ce qui facilite sa compréhension et sa maintenance.

## Inconvénients
On reste sur une architecture monolithique avec ses [inconvénients]({{% relref "../../architecture_style_monolithic/" %}})

## Conclusion
Une architecture en pipeline est efficace pour les problèmes qui peuvent être décomposés en une série d'étapes de traitement indépendantes et séquentielles. Cependant, elle n'est pas forcément adaptée aux problèmes qui nécessitent des dépendances complexes ou un traitement parallèle.
