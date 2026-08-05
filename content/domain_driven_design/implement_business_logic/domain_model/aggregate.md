+++
title = "Aggregate"
weight = 20
+++

> [!ressource]
> - [How to design the aggregate boundaries?](https://softwareengineering.stackexchange.com/questions/361089/how-to-design-the-aggregate-boundaries)
> - [https://martinfowler.com/bliki/DDD_Aggregate.html](https://martinfowler.com/bliki/DDD_Aggregate.html)


> [!definition] Définition
> Un agrégat est un ensemble cohérent d’objets du domaine (entités et éventuellement objets valeur) qui sont traités comme une seule unité de cohérence.
> L’agrégat constitue une frontière de cohérence transactionnelle et a pour rôle principal de garantir les invariants métier qui s’appliquent à l’ensemble des objets qu’il contient.
> Au sein de cet ensemble, une entité particulière est désignée comme racine d’agrégat (Aggregate Root). Cette racine est le seul point d’accès externe permettant de modifier l’état de l’agrégat. Ainsi, toutes les opérations susceptibles d’affecter les objets internes doivent obligatoirement passer par cette racine, ce qui permet d’assurer le respect des règles métier.

![alt text](agregate_illustration.png)

## Exemple d'agrégat
Un exemple classique d’agrégat est celui d’une Commande (Order) et de ses Lignes de commande (OrderLine).

Dans ce modèle :
- Commande constitue la racine de l’agrégat.
- LigneCommande est une entité interne appartenant à cet agrégat.

Un invariant métier pourrait être formulé ainsi : *Une commande ne peut être validée que si son montant total est supérieur à 10 euros.*

La responsabilité de garantir cet invariant revient à la racine d’agrégat Commande. Par conséquent, toute modification de l’état de l’agrégat doit passer par cette racine, par exemple :
- ajouter une ligne de commande,
- supprimer une ligne de commande,
- modifier la quantité d’un article,
- calculer le montant total,
- changer le statut de la commande (ex. : brouillon, validée, expédiée).

Les entités internes, telles que LigneCommande, ne doivent pas être manipulées directement depuis l’extérieur de l’agrégat. Cette contrainte garantit que toutes les règles métier restent cohérentes et centralisées au sein de la racine d’agrégat.

```java
public class Order {
    private final String id;
    private final List<OrderLine> lines = new ArrayList<>();
    private OrderStatus status = OrderStatus.DRAFT;

    public Order(String id) {
        this.id = id;
    }

    public void addLine(String productId, int quantity, double price) {
        lines.add(new OrderLine(productId, quantity, price));
    }

    public void removeLine(int index) {
        lines.remove(index);
    }

    public double totalAmount() {
        return lines.stream()
                .mapToDouble(OrderLine::getTotal)
                .sum();
    }

    public void validate() {
        if (totalAmount() <= 10) {
            throw new IllegalStateException(
                "Une commande doit être supérieure à 10 euros pour être validée"
            );
        }

        this.status = OrderStatus.VALIDATED;
    }
}
```

## Deux bonnes pratiques sur les Agrégats

### Favoriser des relations unidirectionnelles

![bidirectionnal](bidirectionnal.png)

Est-il vraiment nécessaire de charger tous les produits d'un fournisseur alors que l'on souhaite simplement modifier ses coordonnées ? Est-ce grave si un produit ne dispose pas d'une liste navigable de fournisseurs ? Comme
vous pouvez le constater, une relation bidirectionnelle Fournisseur ajoute une complexité technique et obscurcit les concepts métier : on ne sait pas qui est le propriétaire (*owner*) de la relation.

Pour simplifier la relation, on peut la rendre unidirectionnelle 

![alt text](unidirectionelle.png)


### Référencer un autre Agrégat par son Id
Lorsqu'un Aggregate doit communiquer avec un autre, deux options s'offrent à nous :
- utiliser une référence d'objet
- utiliser un identifiant (type primitif `int`)

```java
class Order {
    private Customer customer;
    private List<OrderLine> lines;
}
```

![alt text](reference_by_id.png)

En effet, ce code pourrait être lent car un graphe d'objets volumineux (le client et toutes ses commandes existantes) doit être chargé pour le cas d'utilisation de base consistant à passer une commande. Ces problèmes surviennent parce que la relation est modélisée comme une référence d'objet, ce qui nécessite que tous les objets du graphe d'objets soient chargés collectivement depuis la persistance.

On pourrait faire valoir que le chargement différé (*Lazy Loading*) résout ces problèmes, mais celui-ci peut compliquer davantage le modèle ; de plus, il ne rend guère compte de la manière dont les objets de domaine sont utilisés pour répondre aux
cas d'utilisation métier.

Une autre méthode pour implémenter les associations consiste à stocker l'ID de l'objet et via le *Repository* au sein de l'application service pour récupérer les objets de domaine requis pour un cas d'utilisation

![alt text](reference_by_id2.png)

```java
class Order {
    private CustomerId customerId;
    private List<OrderLine> lines;

    public Order(OrderId id, CustomerId customerId) {
        this.id = id;
        this.customerId = customerId;
    }

    public void addProduct(Product product) {
        lines.add(new OrderLine(
                product.getId(),
                product.getPrice(),
                1
        ));
    }
}

public class Customer {
    private CustomerId id;
    private String name;

    public Customer(CustomerId id, String name) {
        this.id = id;
        this.name = name;
    }

    public Order createOrder(List<Product> products) {
        Order order = new Order(OrderId.generate(), this.id);

        for (Product product : products) {
            order.addProduct(product);
        }

        return order;
    }
}
```

Dans l'application Service nous aurions

```java
public void placeOrder(CustomerId customerId, List<Product> products) {
    Customer customer = customerRepository.findById(customerId);

    Order order = customer.createOrder(products);

    orderRepository.save(order);
}
```