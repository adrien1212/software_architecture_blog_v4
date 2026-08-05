+++
title = "Application Service"
weight = 50
+++

> [!note] Domain Service vs Application Service
> - [La différence]({{< relref "domain_driven_design/implement_business_logic/application_vs_domain_service" >}})

## Le rôle de l'application service

![alt text](applicationservice.png)

Il est essentiel de bien comprendre la différence entre la logique d'application et la logique métier si vous souhaitez élaborer un modèle qui mette en avant les concepts métier et les distingue des détails purement techniques.
Dans l'ensemble, ce n'est pas une tâche difficile, même s'il existe une petite zone d'ombre. Cette section vise à vous donner une vision claire afin que vous n'ayez plus à vous demander où votre code
doit être placé.

L'application service :
- est chargé des aspects liés à l'infrastructure : gestion des transactions, envoi d'e-mails et autres tâches techniques de ce type
- se coordonne avec le domaine pour mettre en oeuvre l'ensemble des cas métier

```java
public class OrderApplicationService {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final EmailService emailService;

    public void placeOrder(CustomerId customerId, List<Product> products) {

        // 1. Charger les agrégats nécessaires
        Customer customer = customerRepository.findById(customerId);

        // 2. Déléguer la logique métier au domaine
        Order order = customer.createOrder(products);

        // 3. Persister l’agrégat
        orderRepository.save(order);

        // 4. Action technique (infrastructure)
        emailService.sendOrderConfirmation(customer.getEmail(), order.getId());
    }
}
```