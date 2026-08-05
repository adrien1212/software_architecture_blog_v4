+++
title = "Transaction Script"
weight = 10
+++

> [!ressource] Ressource
> [Transaction Script](https://martinfowler.com/eaaCatalog/transactionScript.html)
> Learning Domain-Driven Design - Chapitre 5 section Transaction Script

> [!definition] Définition
> Organizes business logic by procedures where each procedure handles a single request from the presentation.

![transaction_script](transaction_script.png)

Le Transaction Script n'est pas un anti-pattern mais un pattern. Lorsqu'on réalise un [Anemic Domain Model]({{< relref "commun_antipattern/anemic_model/index" >}}) on obtient une classe xxxService qui centralise toute la logique métier, comme illustré dans cet [article](https://www.petrikainulainen.net/software-development/design/the-biggest-flaw-of-spring-web-applications/).

> The service layer which acts as a *transaction boundary*. It is also responsible of authorization and contains the business logic of our application. **The service layer manages the domain model objects (e.i ce n'est pas son role) and communicates with other services and the repository layer**. [...] First, we have to move the business logic of our application from the service layer to the domain model classes.

Martin Fowler dans son article [Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html) écrit

> By pulling all the behavior out into services, however, you essentially end up with Transaction Scripts, and thus lose the advantages that the domain model can bring.

Et dans son livre *pattern of enterprise application architecture* il met en garde contre le Transaction Script. 

> The harder thing to imagine is what happens as the rules get
more complicated [...]. It's difficult to keep a coherent design with
Transaction Script once things get that complicated, which is why object bigots like me prefer using a **Domain
Model** in these circumstances.

## Quand utiliser Transaction Script pattern ?
Quand la *Business Logic* est simple. Par exemple, si notre application ne fait que du CRUD ou du ETL (Extract-Transform-Load)

> The transaction script pattern naturally fits supporting subdomains where, by definition, the business logic is simple.     