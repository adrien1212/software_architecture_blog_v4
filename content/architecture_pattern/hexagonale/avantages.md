+++
draft = "true"
title = "Avantages/Inconvénients"
weight = 3
+++

> [!ressource] Ressources
> [Partie 6. - Pros and Cons](https://jmgarridopaz.github.io/content/hexagonalarchitecture.html#tc6)

## Avantages

**Testabilité**

- Pour chaque Driver port, on peut développer un adaptateur qui va exécuter les tests au travers du port
- Pour chaque Driven port, on peut développer un adaptateur bouchon (mock adapter)

**Maintenabilité**

- L'architecture Hexagonale assure la _Separation of Concerns_ et le découplage de la logique métier, ce qui facilite la localisation du code que nous voulons modifier.

**Flexibilité**

- Pour chaque port, on peut facilement changer l'adaptateur
- On peut développer un nouvel adaptateur sans toucher au cœur applicatif

**Retarder les décisions technologiques**

- Lorsqu'on commence à développer, on peut se concentrer sur le cœur applicatif (dont les ports)
- Puis choisir les frameworks/technologies plus tard qui seront des adaptateurs de nos ports.

## Inconvénients

**Complexité**

- Augmentation du nombre de classes (un port par use case et plusieurs adaptateurs par port)
- [La flexibilité ajoute de la complexité]({{% relref "../../characteristics/flexibility.md" %}})
