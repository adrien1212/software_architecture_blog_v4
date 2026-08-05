+++
title = "Eventual Consistency"
weight = 70
+++

> [!ressource] Ressource
> - [DDD Decoded - Don't Fear Eventual Consistency](https://blog.sapiensworks.com/post/2016/07/23/DDD-Eventual-Consistency)
> - [Dealing with Eventual Consistency, and Causal Consistency using Predictable Identifiers](https://www.architecture-weekly.com/p/dealing-with-eventual-consistency)
> - [ Eventual Consistency: Good, Bad, and a HUGE Mistake - CodeOpinion](https://www.youtube.com/watch?v=_lyPYG1hdtE)

> [!warning] Attention à la traduction
> **L'Eventual Consistancy se traduit par *Cohérence Finale*** car, à la fin de la saga, les données SONT cohérentes entre elles, soit parce que tout s'est bien passé, soit parce qu'il y a eu compensation afin de maintenir, in fine, lesdites données

> Remember that we try to identify aggregates i.e we're actively looking for areas, **islands that need to be immediately consistent in an ocean of eventual consistency**. [...] And maybe that's one of the biggest things with DDD, the revelation that a model doesn't really need to always be immediately consistent, like in the CRUD approach; some parts need it, others don't. [^1]

- Chaque agrégat reste toujours valide en interne
- Les agrégats ne sont pas forcément cohérents entre eux immédiatement
- La cohérence globale est atteinte plus tard (eventual consistency)

## Exemple
Règle métier
- Une Commande peut être créée immédiatement
- La réservation de stock se fait asynchronement
- Pendant un court laps de temps, une commande peut exister sans stock réservé : C’est acceptable pour le métier
### Agrégat 1 : Order (Commande)
```java
public class Order {

    private final UUID orderId;
    private final UUID productId;
    private final int quantity;
    private OrderStatus status;

    public OrderCreatedEvent createEvent() {
        return new OrderCreatedEvent(orderId, productId, quantity);
    }

    public void markAsConfirmed() {
        this.status = OrderStatus.CONFIRMED;
    }

    public void markAsRejected() {
        this.status = OrderStatus.REJECTED;
    }
}

```

### Agrégat 2 : Inventory (Stock)
```java
public class Inventory {

    private final UUID productId;
    private int availableQuantity;

    public boolean reserve(int quantity) {
        if (availableQuantity >= quantity) {
            availableQuantity -= quantity;
            return true;
        }
        return false;
    }
}
```

### ApplicationService
```java
public class OrderService {
    public void placeOrder(UUID productId, int quantity) {
        Order order = new Order(UUID.randomUUID(), productId, quantity);

        orderRepository.save(order); // transaction locale
        eventBus.publish(order.createEvent()); // async
    }
}
```

```java
public class InventoryEventHandler {
    public void on(OrderCreatedEvent event) {
        Inventory inventory = inventoryRepository.findByProductId(event.productId());
        Order order = orderRepository.findById(event.orderId());

        if (inventory.reserve(event.quantity())) {
            inventoryRepository.save(inventory);
            order.markAsConfirmed();
        } else {
            order.markAsRejected();
        }

        orderRepository.save(order);
    }
}
```

### Ce qui est temporairement incohérent (et acceptable)
| Moment | Commande  | Stock        |
|--------|-----------|--------------|
| t0     | CREATED   | Non réservé  |
| t1     | CONFIRMED | Réservé      |

### Avec deux commande en même temps
Situation de départ
- Stock du produit P = 5
- Deux commandes arrivent quasi simultanément
    - Commande A : quantité 3
    - Commande B : quantité 3

#### t0 – Réception des commandes
```
Order A → CREATED
Order B → CREATED
Stock → 5
```

#### t1 – Publication des événements
```
OrderCreatedEvent(A)
OrderCreatedEvent(B)
```
Les événements partent dans le bus (Kafka, RabbitMQ, etc.)
-  Aucun ordre garanti
-  Possibilité de traitement concurrent

#### t1 - Traitement séquentiel
A traité en premier puis B 
```
Stock = 5
Reserve 3 → OK
Stock = 2
Order A → CONFIRMED

Stock = 2
Reserve 3 → FAIL
Order B → REJECTED
```

=> Acceptable si le métier l’accepte


[^1]: [DDD Decoded - Don't Fear Eventual Consistency](https://blog.sapiensworks.com/post/2016/07/23/DDD-Eventual-Consistency)