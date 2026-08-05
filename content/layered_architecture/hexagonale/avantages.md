+++
title = "Avantages/Inconvénients"
weight = 3
+++

> [!ressource] Ressources
> [Partie 6. - Pros and Cons](https://jmgarridopaz.github.io/content/hexagonalarchitecture.html#tc6)

## Avantages

**Testabilité**

- Pour chaque Driver port, on peut développer un *Adapter* qui va exécuter les tests au travers du port
- Pour chaque Driven port, on peut développer un *Adapter* bouchon (mock adapter)

**Maintenabilité**

- L'architecture Hexagonale assure la _Separation of Concerns_ et le découplage de la logique métier, ce qui facilite la localisation du code que nous voulons modifier.

**Fléxibilité**

- Pour chaque port, on peut facilement changer l'adaptateur
- On peut développer une nouveau *Adapter* sans toucher au coeur applicatif

**Retarder les décisions technologiques**

- Lorsqu'on commence à développer on peut se concentrer sur le coeur applicatif (dont les ports)
- Puis choisir les frameworks/technologies plus tard qui seront des *Adapter* de nos ports.

## Inconvénients

**Complexité**

- Augmentation du nombre de classes (un port par usecase et plusieurs adaptateur par ports)
- [La flexibilité ajoute de la compléxité]({{% relref "../../characteristics/flexibility.md" %}})
