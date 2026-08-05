+++
title = "Repository"
weight = 40
+++

> [!ressource] Ressources
> - [Repository](https://martinfowler.com/eaaCatalog/repository.html)
> - [Should I use an aggregate root when designing my repository?](https://softwareengineering.stackexchange.com/questions/124380/should-i-use-an-aggregate-root-when-designing-my-repository)

> [!definition] Définition
> > Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects. — Martin Fowler, *Patterns of Enterprise Application Architecture*
>
> Un *Repository* est une abstraction qui donne au domaine **l'illusion de manipuler une collection d'agrégats en mémoire**, alors que ceux-ci sont en réalité stockés dans une base de données, un fichier ou un service distant.

## Le rôle du Repository

Le [Domain Model](./index.md) ne doit dépendre d'aucune problématique technique : ce sont des POJO. Mais un agrégat doit bien, à un moment, être chargé puis persisté. Le Repository est la pièce qui rend cela possible **sans polluer le domaine** :

- il **masque** la technologie de persistance (JPA, JDBC, MongoDB, appel HTTP…) ;
- il expose une interface **exprimée dans le langage du domaine** (*Ubiquitous Language*) ;
- il reconstitue un agrégat complet et cohérent à partir du stockage, et sait le ré-enregistrer.

L'idée directrice est que le code métier doit pouvoir se lire comme s'il travaillait sur une simple `List<Order>` :

```java
// Ce que le domaine « croit » manipuler
Order order = orders.findById(orderId);
order.addLine(productId, 2, 19.99);
orders.save(order);
```

## Seulement sur les Aggregate Root

> Only Aggregate Roots can be obtained directly with database queries. Everything else must be done through traversal.

Nous avons vu dans la section [Aggregate](./aggregate.md) que `Order` et `OrderLine` appartiennent au même agrégat, dont le point d'entrée est `Order`.

Si nous créons un repository `OrderLineRepository`, alors nous autorisons la lecture et la modification des `OrderLine` **sans passer par la racine**, ce qui peut conduire au non-respect des invariants.

```java
// ❌ À proscrire : contourne la racine d'agrégat
public interface OrderLineRepository {
    OrderLine findById(OrderLineId id);
    void save(OrderLine line);
}
```

```java
// ❌ L'invariant « une commande validée ne peut plus être modifiée »
//    est ici totalement contourné
OrderLine line = orderLineRepository.findById(lineId);
line.setQuantity(100);
orderLineRepository.save(line);
```

La règle est donc : **un Repository par racine d'agrégat**, et uniquement pour les racines d'agrégat. Toute modification d'une entité interne se fait par traversée depuis la racine, qui reste garante des invariants.

```java
// ✅ La racine reste le seul point d'entrée
public interface OrderRepository {
    Order findById(OrderId id);
    void save(Order order);
}
```

```java
Order order = orderRepository.findById(orderId);
order.changeLineQuantity(lineId, 100); // la racine vérifie le statut, recalcule le total…
orderRepository.save(order);
```

> [!note] Note
> Le nombre de Repositories de votre application est égal au nombre de racines d'agrégat, **pas au nombre de tables** de votre base de données. Un agrégat `Order` réparti sur les tables `orders` et `order_lines` n'a qu'un seul Repository.

## Charger et sauvegarder l'agrégat entier

Un agrégat est une **frontière de cohérence transactionnelle** : il est donc chargé et sauvegardé comme un tout. Le Repository n'expose pas de méthodes de mise à jour partielle.

```java
// ❌ Le Repository devient un pilote SQL déguisé
public interface OrderRepository {
    void updateStatus(OrderId id, OrderStatus status);
    void insertLine(OrderId id, OrderLine line);
    void deleteLine(OrderLineId lineId);
}
```

Avec une telle interface, la logique de mise à jour (« dans quel ordre ? avec quelles vérifications ? ») remonte inévitablement dans l'[Application Service](../application_service.md), et le domaine s'anémie.

```java
// ✅ Une opération de persistance = un agrégat
public interface OrderRepository {
    Optional<Order> findById(OrderId id);
    void save(Order order);
    void remove(Order order);
}
```

> [!warning] Attention à la taille des agrégats
> Charger l'agrégat entier a un coût. C'est précisément l'arbitrage décrit dans [Domain Model Purity](./domain_model_purity.md) : de gros agrégats protègent mieux les invariants mais dégradent les performances. Si le chargement complet devient trop coûteux, c'est généralement le signe que la **frontière de l'agrégat est mal découpée**, pas que le Repository doit être contourné.

## L'interface appartient au domaine, l'implémentation à l'infrastructure

C'est une application directe du [Dependency Inversion Principle](../../../concepts-fondamentaux/solid/dependency_inversion/dependency_Inversion_1) : le domaine **définit le contrat dont il a besoin**, l'infrastructure le satisfait. Dans le vocabulaire de l'[architecture hexagonale](../../../architecture-monolithique/layered_architecture/hexagonale/), l'interface est un *port sortant* et son implémentation un *adaptateur*.

```
domain/
  order/
    Order.java              // agrégat
    OrderRepository.java    // ← l'interface (port), sans aucune dépendance technique
infrastructure/
  persistence/
    JpaOrderRepository.java // ← l'implémentation (adaptateur)
    OrderJpaEntity.java     // ← le modèle de persistance
```

```java
// domain — aucun import Spring, JPA, Hibernate…
public interface OrderRepository {
    Optional<Order> findById(OrderId id);
    void save(Order order);
}
```

```java
// infrastructure
@Component
public class JpaOrderRepository implements OrderRepository {

    private final SpringDataOrderJpa jpa;
    private final OrderMapper mapper;

    @Override
    public Optional<Order> findById(OrderId id) {
        return jpa.findById(id.value())
                  .map(mapper::toDomain);     // reconstitution de l'agrégat
    }

    @Override
    public void save(Order order) {
        jpa.save(mapper.toJpaEntity(order));  // traduction vers le modèle de persistance
    }
}
```

> [!note] Modèle de domaine ≠ modèle de persistance
> Le mapping explicite (`OrderMapper`) a un coût, mais il évite que les contraintes de l'ORM (constructeur vide obligatoire, setters, annotations, relations bidirectionnelles) ne dictent la conception de votre modèle métier. C'est le prix à payer pour garder un domaine réellement pur.

## Une interface exprimée dans le langage du domaine

Un Repository n'est pas une API de requêtage générique. Ses méthodes doivent nommer des **concepts métier**, et non des critères techniques.

```java
// ❌ Le vocabulaire de la base de données remonte dans le domaine
List<Order> findByStatusAndCreatedAtBefore(String status, LocalDateTime date);
```

```java
// ✅ Le vocabulaire du métier
List<Order> findOverdueOrders();
```

De la même manière, il ne faut pas laisser fuiter la technologie sous-jacente dans la signature :

```java
// ❌ Le domaine devient dépendant de JPA / SQL / du driver
List<Order> findAll(Specification<OrderJpaEntity> spec);
Stream<ResultSet> query(String sql);
```

## Repository, DAO et repository CRUD générique

Ces trois notions sont souvent confondues.

| | Repository (DDD) | DAO | `CrudRepository<T, ID>` générique |
|---|---|---|---|
| Granularité | Un agrégat | Une table | Une entité de persistance |
| Retourne | Des objets du domaine riches | Des lignes / DTO | Des entités ORM |
| Interface | Métier, restreinte, dictée par les cas d'usage | Technique, CRUD | CRUD exhaustif imposé |
| Dépendance | Le domaine ne dépend de rien | Dépend de la base | Le domaine dépend du framework |

Hériter directement de `CrudRepository` dans le domaine est un anti-pattern fréquent : cela expose mécaniquement `deleteAll()`, `findAll()` ou `count()` — des opérations dont le métier n'a pas besoin — et couple le domaine à Spring Data. Préférez une interface étroite, définie par ce que les cas d'usage exigent réellement.

## Le Repository ne contient pas de logique métier

Le Repository traduit, il ne décide pas. Toute règle qui apparaît dans son implémentation est une règle qui a échappé au domaine.

```java
// ❌ Une règle métier cachée dans l'infrastructure
public void save(Order order) {
    if (order.totalAmount() > 10_000) {
        order.setStatus(OrderStatus.NEEDS_APPROVAL); // ← ceci appartient à Order
    }
    jpa.save(mapper.toJpaEntity(order));
}
```

## Les lectures : ne pas déformer le Repository

Reconstruire des agrégats complets est adapté aux **cas d'usage qui modifient l'état**. Pour l'affichage (un tableau de bord, une liste paginée, un export), c'est souvent inutilement coûteux : on charge tout un graphe d'objets pour n'en afficher que trois champs.

La tentation est alors d'ajouter au Repository des méthodes qui retournent des DTO, et il finit par mélanger deux responsabilités.

La réponse habituelle est de séparer les deux chemins (principe de CQRS) :

- **Écriture** : `OrderRepository` → charge l'agrégat `Order`, applique la règle métier, sauvegarde.
- **Lecture** : `OrderQueryService` (ou *read model*) → requête optimisée qui retourne directement un DTO, sans passer par le domaine.

```java
// Côté lecture : pas d'agrégat, pas d'invariant à protéger, juste des données
public interface OrderQueryService {
    Page<OrderSummaryDto> searchOrders(OrderSearchCriteria criteria, Pageable pageable);
}
```

## Transaction et cohérence

Une transaction ne doit couvrir **qu'un seul agrégat**. C'est le corollaire direct du fait que l'agrégat est la frontière de cohérence.

```java
// ❌ Deux agrégats modifiés dans la même transaction
@Transactional
public void transfer(...) {
    orderRepository.save(order);
    customerRepository.save(customer);
}
```

Lorsque plusieurs agrégats doivent évoluer ensemble, la cohérence entre eux devient *eventual* : on publie un [Domain Event](./domain_event.md) et on met à jour le second agrégat dans une transaction distincte — voir [Eventual Consistency](../eventual_consisteny.md).

La gestion de la transaction elle-même est une responsabilité **d'infrastructure** : elle est portée par l'[Application Service](../application_service.md), pas par le Repository ni par le domaine.

## Tester avec un Repository en mémoire

Un bénéfice immédiat de l'inversion de dépendance : puisque le domaine ne connaît qu'une interface, les tests des cas d'usage n'ont besoin ni de base de données ni de mocks complexes.

```java
public class InMemoryOrderRepository implements OrderRepository {

    private final Map<OrderId, Order> store = new HashMap<>();

    @Override
    public Optional<Order> findById(OrderId id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public void save(Order order) {
        store.put(order.getId(), order);
    }
}
```

```java
@Test
void une_commande_de_moins_de_10_euros_ne_peut_pas_etre_validee() {
    OrderRepository orders = new InMemoryOrderRepository();
    // … test rapide, sans Spring ni base de données
}
```

## Récapitulatif

| Anti-pattern | Correction |
|---|---|
| Un Repository par entité (`OrderLineRepository`) | Un Repository par racine d'agrégat |
| Méthodes de mise à jour partielle (`updateStatus`) | `save(aggregate)` : l'agrégat entier |
| Interface Repository placée dans la couche infrastructure | Interface dans le domaine, implémentation dans l'infrastructure |
| Le domaine hérite de `CrudRepository` | Interface étroite, écrite à la main, dictée par les cas d'usage |
| Méthodes nommées d'après les colonnes SQL | Méthodes nommées d'après le métier |
| Le Repository retourne des entités JPA | Il retourne des objets du domaine |
| Logique métier dans l'implémentation du Repository | Logique métier dans l'agrégat |
| Repository utilisé pour les écrans de consultation | Read model / Query Service séparé (CQRS) |
| Plusieurs agrégats sauvegardés dans une même transaction | Un agrégat par transaction + Domain Events |
