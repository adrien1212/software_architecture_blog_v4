+++
title = "Gérer la concurrence"
weight = 30
+++

> [!ressource] Ressources
> - [DDD Aggregates: Optimistic Concurrency](https://www.jamesmichaelhickey.com/optimistic-concurrency/)
> - Implementing Domain-Driven Design, Vaughn Vernon, chap. 10

> What happens when multiple users of your system try to operate on the same piece at the “same” time? Who wins? Who loses? [^1]

Un agrégat garantit ses invariants à l'intérieur d'une transaction. Cette garantie disparaît dès lors que deux transactions concurrentes lisent le même état, décident chacune de leur côté que la règle est respectée, puis écrivent. Aucune des deux n'a tort isolément ; c'est leur superposition qui produit un état invalide. Le contrôle de concurrence est le mécanisme qui rétablit cette garantie.

## Le problème de la lecture périmée

Soit la règle : *un employé ne peut pas dépasser 40 heures par semaine*. L'employé en a déjà déclaré 35.

| Temps | Transaction A | Transaction B |
|---|---|---|
| t1 | lit l'agrégat : 35 h | |
| t2 | | lit l'agrégat : 35 h |
| t3 | ajoute 3 h → 38 h ≤ 40, valide | |
| t4 | | ajoute 4 h → 39 h ≤ 40, valide |
| t5 | écrit | |
| t6 | | écrit |

Chaque transaction a correctement vérifié l'invariant sur l'état qu'elle avait lu. L'état final est pourtant de 42 heures. La validation métier seule est donc insuffisante : elle doit s'accompagner d'une garantie que l'état lu est toujours celui qui sera écrit.

> [!note] Lecture périmée et mise à jour perdue
> Ces deux phénomènes sont voisins mais distincts, et c'est le modèle de données qui détermine lequel se produit :
>
> - si les heures sont stockées dans un champ scalaire `totalHours` porté par `Employee`, l'écriture de B **écrase** celle de A : l'état final est 39 h et les 3 heures de A ont disparu. C'est la **mise à jour perdue** (*lost update*).
> - si les heures sont stockées dans une collection d'entités `WorkingHours`, chaque transaction produit un `INSERT` distinct : **aucune écriture n'est perdue**, les deux atterrissent, et l'état final est bien 42 h. L'invariant est violé non par écrasement, mais parce que chaque décision a été prise sur un état déjà périmé.
>
> C'est ce second cas qui est illustré ici, et c'est le plus fréquent dès qu'un agrégat contient une collection. Le remède est le même dans les deux cas.

## Deux stratégies

- **Verrouillage pessimiste** — la transaction verrouille l'agrégat dès la lecture (`SELECT ... FOR UPDATE`). Les autres attendent. Le conflit est évité, au prix d'une sérialisation des accès et d'un risque d'interblocage. Réservée aux cas de forte contention où le rejeu est coûteux.

- **Verrouillage optimiste** — aucun verrou n'est posé **à la lecture**. La transaction lit un numéro de version, et l'écriture n'est acceptée que si la version en base est restée inchangée. Sinon la transaction est rejetée et rejouée. C'est la stratégie par défaut : elle suppose que les conflits sont rares, ce qui est le cas lorsque les agrégats sont correctement dimensionnés.

Ce qui distingue réellement les deux stratégies n'est pas l'existence d'un verrou — l'`UPDATE` final d'une transaction optimiste pose lui aussi un verrou de ligne jusqu'au *commit* — mais **le moment où il est acquis** : à la lecture, ou à l'écriture.

## Verrouillage optimiste

La version est portée par **la racine**, et non par les entités internes. Cette localisation n'est pas arbitraire : elle découle du fait que l'agrégat est la frontière transactionnelle. Modifier une entité interne, c'est modifier l'agrégat dans son ensemble, puisque l'invariant porte sur l'ensemble.

```java
// Racine d'agrégat
@Entity
public class Employee {

    private static final int MAX_HOURS_PER_WEEK = 40;

    @Id
    private Long id;
    private String name;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkingHours> workingHoursList = new ArrayList<>();

    @Version
    private Long version; // porté par la racine, pas par WorkingHours
}

// Entité interne, accessible uniquement via la racine
@Entity
public class WorkingHours {

    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private LocalDate date;
    private int hours;
}
```

L'invariant est vérifié par la racine, seul point d'entrée de l'agrégat. La règle portant sur **une semaine**, la somme doit être restreinte à la semaine concernée : sommer toute la collection ferait respecter une autre règle que celle énoncée.

```java
public void addWorkingHours(LocalDate date, int hours) {
    int weekTotal = workingHoursList.stream()
        .filter(wh -> isSameWeek(wh.getDate(), date))
        .mapToInt(WorkingHours::getHours)
        .sum();

    if (weekTotal + hours > MAX_HOURS_PER_WEEK) {
        throw new BusinessRuleViolationException(...);
    }
    workingHoursList.add(new WorkingHours(this, date, hours));
}

private static boolean isSameWeek(LocalDate a, LocalDate b) {
    WeekFields week = WeekFields.ISO;
    return a.get(week.weekBasedYear()) == b.get(week.weekBasedYear())
        && a.get(week.weekOfWeekBasedYear()) == b.get(week.weekOfWeekBasedYear());
}
```

### Le conflit détecté à l'écriture

Une fois l'incrément garanti, JPA émet au *commit* une écriture conditionnée par la version lue :

```sql
UPDATE employee SET version = 2, ... WHERE id = ? AND version = 1
```

Dans le scénario ci-dessus, la transaction A passe la version de 1 à 2. L'écriture de B ne trouve alors aucune ligne à mettre à jour et provoque une `OptimisticLockException`. L'invariant est préservé.

### Subtilité Hibernate : `mappedBy` n'incrémente pas la version de la racine

C'est le piège central de ce montage : sans traitement, `@Version` reste sans effet et le scénario des 42 heures se reproduit à l'identique.

> When you remove/add an object from/to a collection, the version number of the collection owner is incremented.

Cette phrase est vraie, mais uniquement pour les collections **détenues** par la racine (`@JoinColumn` côté parent, ou association unidirectionnelle). Attention à ne pas confondre deux emplois du mot *owner* :

- le *collection owner* de la citation est l'entité qui **détient la collection**, donc `Employee` ;
- le *owner* d'une association JPA est le côté qui **porte la clé étrangère**, donc `WorkingHours`.

En déclarant `@OneToMany(mappedBy = "employee")`, le *owning side* est `WorkingHours` parce que c'est lui qui a la clé étrangère `employee_id`. Ajouter un `WorkingHours` n'entraine donc pas d'UPDATE sur la table employee, et la version de `Employee` ne s'incrémente pas.

La réponse standard est de forcer l'incrément au chargement, avec `OPTIMISTIC_FORCE_INCREMENT` :

```java
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    @Query("SELECT e FROM Employee e WHERE e.id = :id")
    Optional<Employee> findByIdForceIncrement(@Param("id") Long id);
}
```

Hibernate incrémente alors la version de la racine au *commit*, que ses champs scalaires aient changé ou non.

[How to increment the parent entity version whenever a child entity gets modified](https://discourse.hibernate.org/t/how-to-increment-the-parent-entity-version-whenever-a-child-entity-gets-modified/10255)

## Verrouillage pessimiste

Le verrouillage pessimiste renverse l'hypothèse : plutôt que de détecter le conflit à l'écriture, il l'empêche à la lecture. La transaction pose un verrou exclusif sur la ligne de la racine, que la base ne libère qu'au *commit*. Toute transaction concurrente qui tente de lire le même agrégat pour le modifier (`findByIdForUpdate`) est mise en attente.

Le point important est que **le verrou porte sur la racine seule**. Il protège néanmoins l'agrégat entier, puisque aucune entité interne n'est accessible autrement que par la racine. La règle d'encapsulation de l'agrégat est ici ce qui rend le mécanisme correct.

```java
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT e FROM Employee e WHERE e.id = :id")
    Optional<Employee> findByIdForUpdate(@Param("id") Long id);
}
```

Hibernate traduit ce mode de verrouillage par :

```sql
SELECT ... FROM employee WHERE id = ? FOR UPDATE
```

L'appelant n'a plus qu'à charger l'agrégat par cette méthode, la transaction devenant le périmètre de protection :

```java
@Transactional
public void declareHours(Long employeeId, LocalDate date, int hours) {
    Employee employee = employeeRepository.findByIdForUpdate(employeeId)
        .orElseThrow(EmployeeNotFoundException::new);

    employee.addWorkingHours(date, hours); // l'invariant est vérifié sur un état verrouillé
}
```

Dans le scénario initial, la transaction B reste bloquée à `t2` jusqu'au *commit* de A. Elle relit alors 38 heures et rejette légitimement l'ajout de 4 heures. Aucune exception de concurrence n'est levée : le conflit n'a pas eu lieu.

> [!warning] La protection dépend d'une discipline d'équipe
> Le verrou n'a d'effet que si **toutes** les transactions modifiantes passent par `findByIdForUpdate`. Une seule qui charge l'agrégat par un `findById` ordinaire puis écrit contourne entièrement le mécanisme, sans erreur ni avertissement.
>
> C'est le pendant exact de l'argument sur l'encapsulation de la racine : dans les deux cas, la correction du dispositif est garantie par une convention de conception, pas par la base de données. D'où l'intérêt de ne pas exposer, sur le repository de la racine, de méthode de chargement concurrente à celle qui verrouille.

## Conclusion

Le verrouillage optimiste est le choix par défaut. Le verrouillage pessimiste devient préférable lorsque deux conditions sont réunies : la contention sur un même agrégat est élevée, et le rejeu est coûteux ou non reformulable — parce que le traitement est long, ou parce qu'il déclenche des effets externes qu'on ne peut pas rejouer.

[^1]: [DDD Aggregates: Optimistic Concurrency](https://www.jamesmichaelhickey.com/optimistic-concurrency/)
