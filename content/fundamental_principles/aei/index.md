+++
title = "Abstraction/Encapsulation"
weight = 5
isClose = true
+++

> [!ressource] Ressources
> - [Edward V. Berard - Abstraction, Encapsulation, and Information Hiding](https://web.archive.org/web/20071214085409/http://www.itmweb.com/essay550.htm)
> - [Abstraction VS Information Hiding VS Encapsulation](https://stackoverflow.com/questions/24626/abstraction-vs-information-hiding-vs-encapsulation)

> **Abstraction and encapsulation are complementary** concepts: abstraction focuses on the observable behavior of an object... encapsulation focuses upon the implementation that gives rise to this behavior... **encapsulation is most often achieved through information hiding**, which is the process of hiding all of the secrets of object that do not contribute to its essential characteristics.

> Abstraction, information hiding, and encapsulation are very different, but highly-related, concepts. One could argue that **abstraction is a technique that help us identify which specific information should be visible**, and which information should be hidden. **Encapsulation is then the technique for packaging the information** in such a way as to hide what should be hidden, and make visible what is intended to be visible.

D'après les deux citations précédentes nous pouvons dire :
- L'abstraction permet à l'utilisateur de se concentrer sur ce que fait l'objet (par exemple, ajouter des chaînes de caractères, effacer le contenu).
- L'encapsulation cache la manière dont l'objet procède (par exemple, gestion de la mémoire tampon interne, redimensionnement en cas de besoin).
  - Le masquage d'informations est réalisé via l'encapsulation

Par exemple, en utilisant les classes (POO), nous mettons en œuvre simultanément les trois concepts : Abstraction, Masquage de l'information et Encapsulation :
- abstraction : permet de travailler sur un concept sans s'occuper des détails de son implémentation interne.
- masquage : cache les données (e.g. `private` et `public` mot-clés)
- encapsulation : regroupe à un même endroit toutes les données (attributs) et les comportements (méthodes) associés

<!-- 
## Informations complémentaires
Un [Anemic Domain Model](https://en.wikipedia.org/wiki/Anemic_domain_model) est décrit comme un anti-pattern de programmation où les objets du domaine contiennent peu ou pas de logique métier, comme des validations, des calculs, des règles. En d'autres termes, ce sont des classes qui ne contiennent que des getters et setters.

En utilisant un modèle de domaine anémique nous avant une

> Violation of the encapsulation and information hiding principles.

- Les objets de domaine ne contiennent pas leur propre logique métier, ce qui signifie que leur comportement n'est pas cohérent avec leur état. Cela entraîne une séparation artificielle entre les données (domaines) et les règles métier (souvent déplacées dans des classes "services")
    > Needs a separate business layer to contain the logic otherwise located in a domain model. It also means that domain model's objects cannot guarantee their correctness at any moment, because their validation and mutation logic is placed somewhere outside (most likely in multiple places).
-->