+++
title = "Invariants multi-aggregats"
weight = 30
+++

> [!ressource] Ressources
> - [The Aggregate Pattern](https://dcb.events/topics/aggregates/)
> - [Modelling Business Rules: Invariants vs Corrective Policies](https://domaincentric.net/blog/modelling-business-rules-invariants-vs-corrective-policies)
> - [Effective Aggregate Design Part II](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_2.pdf)

Lorsqu'on décide de séparer un aggrégat en deux il peut toujours s'avérer que nous avons une règle qui affecte les invariants de deux aggrégats, comme illustré dans [cet article](https://dcb.events/topics/aggregates/)

![image](https://dcb.events/topics/img/course-and-student-aggregates.png)

Nous avons deux aggrégats mais on rajoute la règle "A student must not be enrolled in more than 10 courses"

## Le problème

Chaque agrégat garantit son propre invariant :

- `Course` garantit « un cours ne peut pas dépasser sa capacité » ;
- `Student` garantit « un étudiant n'est pas inscrit à plus de 10 cours ».

L'inscription est une seule et même action métier. Mais elle doit vérifier deux invariants situés dans deux frontières de cohérence différentes. Or la règle d'implémentation dit qu'**une transaction ne modifie qu'un seul agrégat**.

Le problème n'est pas de lire les deux agrégats : c'est de garantir qu'aucun autre processus ne modifie l'un des deux entre le moment où on décide et le moment où on écrit. C'est un problème de concurrence, pas de lecture.

Aucune des solutions ci-dessous n'est parfaite. Il s'agit de choisir quel prix on accepte de payer.

## Solution 1 : re-faire un large aggrégat

On agrandit la frontière jusqu'à ce qu'elle contienne les deux invariants.

> Likewise, making the Aggregate larger, covering more entities and value objects, is not a real option in this situation. Indeed, it would mean creating a single aggregate that includes all courses and all students, to cover any possible subscription. However, this has the obvious drawback of reducing scalability, cohesion, and the degree of parallel processing.

Ici l'invariant croise *n'importe quel* cours avec *n'importe quel* étudiant. L'agrégat devient donc l'ensemble des cours et des étudiants : un unique point de sérialisation pour toutes les inscriptions de l'école.

- ✅ Cohérence forte, garantie par le modèle de domaine seul, sans dépendance externe.
- ✅ Le code reste simple : une transaction, pas de compensation.
- ❌ Toutes les écritures se sérialisent : le parallélisme disparaît.
- ❌ L'agrégat grossit sans limite et perd sa cohésion métier.

À retenir : cette solution reste valable quand la frontière élargie reste **bornée** (par exemple « tous les créneaux d'une journée » plutôt que « tous les créneaux de l'année »). Elle ne l'est pas quand elle revient à charger toute la base.

## Solution 2 : eventually consistency

On garde deux agrégats, on écrit dans l'un, puis un processus asynchrone corrige si nécessaire.

> Instead, the typical solution in such cases is to decompose the process into a series of coordinated steps. This means dropping the strong consistency of all the invariants and accepting partial updates that will be eventually reverted by corrective Events if needed. While this approach can work, it introduces significant complexity and can lead to invalid intermediate states until the compensating action is executed. Moreover, in event-driven architectures, this strategy leads to the generation of additional Events that, although necessary from a technical perspective, don't correspond to meaningful business interactions.

C'est le pattern **Saga** / *process manager* : `SubscriptionRequested` → vérification → `SubscriptionConfirmed` ou `SubscriptionRejected`.

- ✅ Les agrégats restent petits et les écritures parallèles.
- ✅ Solution standard, sans exigence particulière sur l'infrastructure.
- ❌ Il existe des états intermédiaires invalides, visibles par les utilisateurs.
- ❌ Il faut écrire et tester les compensations, et gérer les échecs de compensation.
- ❌ On pollue le langage métier avec des événements purement techniques.

À retenir : c'est le bon choix quand le métier **tolère réellement** le délai, et quand annuler après coup a un sens dans la vraie vie (annuler une inscription, envoyer un mail d'excuse).

### DCB : une alternative

En event sourcing, il existe une piste pour éviter la saga : le *Dynamic Consistency Boundary*. Plutôt que de figer la frontière de cohérence dans la structure des agrégats, on la calcule à l'exécution pour chaque cas d'usage, et le verrou optimiste porte sur une requête plutôt que sur un flux d'agrégat. On obtient une cohérence forte sur les deux règles sans fusionner les agrégats, mais cela exige un event store compatible.

Lire [DCB - A simpler and more flexible approach to consistency in event-driven systems](https://dcb.events/#dcb-approach)

## Solution 3 : accepter la violation et la corriger (corrective policy)

On cesse de traiter la règle comme un invariant. On l'implémente comme une politique de détection et de correction.

> It's usually not feasible to model a system in a way that will in 100% reflect the real world.[^2]

La 11ᵉ inscription est enregistrée, puis un contrôle signale le cas au secrétariat, qui tranche. Le logiciel détecte, l'humain corrige.

- ✅ Aucune contrainte technique : les agrégats restent petits et indépendants.
- ✅ Souvent plus proche du fonctionnement réel de l'organisation.
- ❌ Le système accepte durablement des états invalides.
- ❌ Impose un processus de correction, parfois manuel.

À retenir : c'est la meilleure option quand la violation est **rare** et son coût **faible**. Elle exige une discussion explicite avec l'expert métier : « que se passe-t-il, en vrai, si un étudiant s'inscrit à 11 cours ? ». La réponse est très souvent « pas grand-chose ».

## Comment choisir

| Solution | Cohérence | Complexité | Quand la choisir |
|---|---|---|---|
| Large agrégat | Forte | Faible | La frontière élargie reste bornée et peu concurrente |
| Eventual consistency | À terme | Élevée | Le métier accepte le délai, la compensation a un sens |
| Corrective policy | Aucune | Très faible | Violation rare et peu coûteuse |

Avant de choisir, il faut vérifier que l'invariant en est vraiment un. Beaucoup de règles énoncées comme absolues par les parties prenantes tolèrent en réalité un délai, ou n'ont jamais été appliquées strictement dans le processus manuel qu'elles remplacent. Les bonnes questions sont :

- Cette règle doit-elle être vraie **à tout instant**, ou seulement au moment de la validation finale ?
- Que se passe-t-il concrètement si elle est violée pendant quelques secondes ? Pendant une journée ?
- Existe-t-il déjà une étape du processus (validation pédagogique, début du semestre) où le contrôle a naturellement sa place ?

Si la règle n'est pas un invariant strict, on part sur une corrective policy ou de l'eventual consistency. Si elle l'est vraiment, on regarde si la frontière peut être élargie sans devenir infinie.

## En résumé

- Un invariant qui traverse deux agrégats est d'abord un problème de concurrence.
- Il n'existe pas de solution sans compromis : on paie soit en parallélisme, soit en complexité, soit en exactitude.
- La question à poser en premier est métier, pas technique : cette règle doit-elle vraiment être vraie à chaque instant ?
- La réponse la moins coûteuse est souvent d'accepter la violation et de la corriger, quand elle est rare.

[^2]: [Modelling Business Rules: Invariants vs Corrective Policies](https://domaincentric.net/blog/modelling-business-rules-invariants-vs-corrective-policies)