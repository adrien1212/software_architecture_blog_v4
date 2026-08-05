+++
title = "Separation of Concern"
weight = 10
+++

> [!ressource] Ressources
> - [Separation of Concerns in Software Design](https://nalexn.github.io/separation-of-concerns/)
> - Modern Software Engineering - Chapitre 11

La séparation des préoccupations (SoC) est l'un des principes les plus fondamentaux du développement logiciel.

Il est si crucial que deux des cinq principes SOLID ([SRP]({{< relref "single_responsibility" >}}) et [ISP]({{< relref "Interface_segregation" >}})) sont des dérivés directs de ce concept.

## Principaux aspects du Separation of Concerns
1. **Modularité**  Diviser un programme en parties plus petites et plus gérables (modules), chacune étant responsable d’un aspect spécifique de la fonctionnalité du programme. Cela facilite la compréhension, le développement et la maintenance du programme.

2. **Simplification**  En se concentrant sur une seule préoccupation à la fois, les développeurs peuvent réduire la complexité à gérer, diminuant ainsi la charge cognitive et rendant la résolution de problèmes plus efficace.

3. **Maintenabilité**  Les modifications apportées à une partie du système ont un impact minimal sur les autres parties. Cette isolation des préoccupations signifie que les bogues sont moins susceptibles de se propager dans l’ensemble du système et que les mises à jour ou modifications peuvent être effectuées plus facilement.

4. **Réutilisabilité**  Les modules conçus pour répondre à des préoccupations spécifiques peuvent souvent être réutilisés dans différentes parties d’un même système ou même dans d’autres projets, car ils ne sont pas étroitement couplés aux détails du contexte d’origine.

5. **Collaboration accrue**  Dans un environnement d’équipe, différents membres peuvent travailler simultanément sur des préoccupations distinctes sans générer de conflits, ce qui améliore l’efficacité du développement.
