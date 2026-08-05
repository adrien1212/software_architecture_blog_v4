+++
title = "Conclusion"
weight = 60
+++

Il est compliqué de conclure simplement sur cette différence. Le plus important est de noter la **collaboration entre l'architecte logiciel et les développeurs** (voir [D'après Marc Richards]({{% relref "mark_richards_definition.md" %}}))

## Architecture Logicielle

Le rôle de l'architecture est de **minimiser le coût du changement**.

- _Quoi?_ faire pour répondre au besoin client
- _Pourquoi?_ faire ce choix
- Se concentre sur les choix stratégiques
- Language, framework, périmètre, méthodologie de travail, etc
- E.g. [styles architecturaux]({{< relref "architecture_style/index" >}}), [caractérisitques architecturales]({{< relref "software_characteristics/index" >}}), etc ...

> Architecture is the part of design that deals with the aspects that are difficult to change such as the technology choices, application/system structure, trade-offs between quality attributes, how and where data is stored, deployment and runtime properties

### Focus on

L'Architecture Logicielle se concentrer sur les principales décisions de conception :

- Structure : composants et connexions
- Comportement : responsabilités de chaque composant, algorithmes de haut niveau
- Interaction : règles régissant la communication entre les composants
- Attributs de qualité : stratégie pour y parvenir
- Mise en œuvre : langage, plate-forme, bibliothèques, etc.

En soit, toutes décisions qui a un impact sur les préoccupations des principales parties prenantes ou qui a un
ou qui a un impact global sur le programme

Et on ne se concentre pas sur les détails sans importance. Par exemple les décisions internes d'un composant : algorithmes internes, structures de données, modèles de conception locaux. ET qui n'ont pas d'impact sur les préoccupations des principales parties prenantes.

## Conception Logicielle

- Complète l'Architecture Logicelle avec le _Comment?_ implémenter
- Se concentre sur les contraintes locales
- E.g. Design Patterns, [SOLID]({{< relref "fundamental_principles/solid/index" >}}), etc ...

## Conclusion

Gardez à l'esprit que la frontière est très mince, l'architecture et la conception logicielle sont fortement liées.

![archivsdesign](architecture_vs_design3.png)
