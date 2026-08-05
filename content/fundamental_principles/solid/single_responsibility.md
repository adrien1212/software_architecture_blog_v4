+++
title = "Single Responsibility Principle"
weight = 1
+++

> [!ressource] Ressources
> - [The Single Responsibility Principle (original mention)](https://drive.google.com/file/d/0ByOwmqah_nuGNHEtcU5OekdDMkk/view?resourcekey=0-AbuGpXQzwZcUGExkktKt0g)
> - [Single Responsibility Principle (FR)](https://youtu.be/rjSw45LgysA)
> - [Why Every Element of SOLID is Wrong](https://speakerdeck.com/tastapod/why-every-element-of-solid-is-wrong?slide=20)
> - [I’ve vastly misunderstood the Single Responsibility Principle](https://www.sicpers.info/2023/10/ive-vastly-misunderstood-the-single-responsibility-principle/)
> - [I don't love the single responsibility principle](https://sklivvz.com/posts/i-dont-love-the-single-responsibility-principle)
> - [The Single Responsibility Principle Revisited (+ voir ressources fin article)](https://thevaluable.dev/single-responsibility-principle-revisited/)


> When you write a software module, you want to make sure that when changes are requested, those changes can only originate from a single person, or rather, a single tightly coupled group of people representing a single narrowly defined business function.

> A module (e.g. Java class) should be responsible to one, and only one, actor.

**Attention**, cela ne signifie pas qu'un module (e.g. une classe) ne doit faire qu'une seule chose. Le SRP nous dit que cette classe est responsable devant un seul acteur où autrement dit un seul acteur est demandeur du changement sur ce module.
[Voir ma video 1:48](https://youtu.be/Awmnk62AjAY?t=108)

## Exemple 1

Prenons l'exemple d'une classe (i.g un module) qui compile et imprime un rapport. Cette classe ne respecte pas le SRP :

- Premièrement, le contenu du rapport pourrait changer.
- Deuxièmement, le format du rapport peut être modifié.

Cette même classe peut être amenée à changer pour des raisons différentes. Le principe de la responsabilité unique stipule que ces deux aspects du problème sont en réalité deux responsabilités distinctes et qu'ils doivent donc se trouver dans des classes séparées.

## Exemple 2

![Alt text](../images/srp_violation.png)

Cette classe viole également le SRP car les trois méthodes sont responsables devant trois acteurs différents :

- la méthode `calculerSalaire()` est appelée par les acteurs du département ressources humaine
- la méthode `notifierHoraire()` est appelée par les acteurs salariés de l’entreprise
- la méthode `sauvegarderDonnees()` est appelée par les acteurs du service informatique de l’entreprise.

Ainsi, en regroupant tous ces services dans une même classe, chaque acteur est couplé avec les autres. Ce couplage peut causer des problèmes car certains acteurs pourraient être impactés par le comportement d'un autre acteur.

### Solution

![Alt text](../images/srp.png)

La solution consiste à séparer les fonctionnalités dans trois classes distinctes. Ainsi, si le service de ressource humaine demande une mise à jour pour le calcul des salaires, les modifitions n'impacteront uniquement la classe `CalculateurSalaire`. Nous n'avons donc pas besoin de re-tester `HoraireNotificateur` et `SauvegardeEmploye`.

## Avantages

- **Augmente la réutilisation du code** : Le code qui respecte le SRP est souvent plus modulaire et réutilisable. Cela signifie que les développeurs peuvent facilement réutiliser un module (e.g. une classe) dans d'autres parties du système. Par exemple, si un autre projet à uniquement besoin de la classe `CalculateurSalaire` nous n'embarquons que cette classes avec ces méthodes. Sans le SRP, nous aurions du embarquer `Employe` avec des fonctionnalités tierces qui seraient inutiles pour le nouveau projet.

- **Facilité de tester** : Le code qui viole le SRP est généralement plus difficile à tester. Avec de multiples responsabilités imbriquées dans une classe, il devient difficile d'isoler et de tester des fonctionnalités individuelles. Cela peut conduire à des tests moins efficaces et moins complets, augmentant ainsi les risques de bugs non détectés.

## Lien avec Couplage et Cohésion
