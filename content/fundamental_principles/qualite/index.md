+++
title = "Définir la qualité"
weight = 3
+++

> [!Ressource] Ressource
> - [Is High Quality Software Worth the Cost?](https://martinfowler.com/articles/is-quality-worth-cost.html)
> - [IEEE - What is Software Quality?](https://www.computer.org/resources/what-is-software-quality)

## Définir la qualité 
Définir ce que signifie un "logiciel" de qualité est une excellente question. Quels attributs permettent de dire qu'un logiciel est de qualité ?

> I thus divide software quality attributes into external (such as the UI and defects) and internal (architecture).


## Les impacts de la qualité
![](https://martinfowler.com/articles/is-quality-worth-cost/both.png)

> The fundamental role of internal quality is that it lowers the cost of future change. 

- Avec un faible qualité, le progrès initial est rapide mais avec le temps il devient difficile d'ajouter de nouvelles fonctionnalités
  - de petit changement nécessite de comprendre la globalité du logiciel (e.i [obscurité]({{< relref "fundamental_principles/complexity/index" >}}))
  - un changement casse quelque chose autre part
- En se concentrant sur une qualité interne élevée, la création de nouvelle fonctionnalité n'est pas ralentie 

> **High quality software is cheaper to produce**

- Neglecting internal quality leads to rapid build up of cruft
- This cruft slows down feature development
- Even a great team produces cruft, but by keeping internal quality high, is able to keep it under control
- High internal quality keeps cruft to a minimum, allowing a team to add features with less effort, time, and cost.
