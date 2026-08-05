+++
title = "Domain Service"
weight = 40
+++

> [!ressource] Ressource
> - [Services in Domain-Driven Design (DDD)](http://gorodinski.com/blog/2012/04/14/services-in-domain-driven-design-ddd/)
> - [Services in Domain-Driven Design (un autre article)](https://lostechies.com/jimmybogard/2008/08/21/services-in-domain-driven-design/)

## Quand coder un Service ?

> **A Service in the domain is a stateless operation that fulfills a domain-specific task. Often the best indication that you should create a Service in the domain model is when the operation you need to perform feels out of place as a method on an Aggregate or a Value Object.** To alleviate that uncomfortable feeling, our natural tendency might be to create a static method on the class of an Aggregate Root. However, when using DDD, that tactic is a code smell that likely indicates you need a Service instead. [^1]

Nous avons déjà évoqué la notion de [Service]({{< relref "fundamental_principles/service/index" >}}) au sens SOA/Microservice. Mais aucune de ces notions ne correspond au *Domain Service*.

> Just because a Domain Service has the word service in its name does not mean that it is required to be a coarse-grained, remote-capable, heavyweight transactional operation

## Qu'est-ce qu'un Domain Service ?
Lorsqu’une opération métier implique plusieurs Aggregates, il devient nécessaire d’introduire une couche de coordination spécifique : le Domain Service. Ce dernier permet **d’exprimer une logique métier transverse, sans rompre les principes d’encapsulation propres à chaque Aggregate**.

Un Domain Service ne possède généralement pas d’état propre ; il agit comme un orchestrateur, manipulant les entités du domaine pour garantir la cohérence transactionnelle et l’application des invariants métier. Son rôle est donc de capturer un comportement métier significatif qui ne peut légitimement appartenir à aucun Aggregate particulier.

### Exemple : transfert d’argent entre comptes** 

Prenons l’exemple d’un transfert de fonds entre deux comptes bancaires.
L’entité Account expose déjà des opérations élémentaires telles que `debit()` et `credit()`. Toutefois, le transfert lui-même — qui implique deux comptes — dépasse le périmètre d’un seul Aggregate. Il convient donc d’introduire un Domain Service chargé d’orchestrer cette interaction :

```java
public final class TransferDomainService {

  public void transfer(Account from, Account to, BigDecimal amount) {
    if (from.id().equals(to.id())) {
      throw new IllegalArgumentException("Cannot transfer to the same account");
    }
    if (!from.currency().equals(to.currency())) {
      throw new IllegalArgumentException("Cross-currency transfer not supported here");
    }

    // Application des invariants métier via les agrégats. 
    // Dans débit() nous vérifions que "balance - amount > 0" sinon Exception "Fonds insuffisants"
    from.debit(amount, "transfer-out:" + to.id()); 
    to.credit(amount, "transfer-in:" + from.id());
  }
}
```

Dans cet exemple, le Domain Service TransferDomainService assure la cohérence métier du transfert, tout en déléguant la validation des invariants internes à chaque Aggregate concerné (`Account`)

### Attention, ne pas tout coder dans le Service

Dans l’exemple précédent, nous avions soigneusement distingué deux types de logique métier :
- La logique métier propre à l’entité `Account` : par exemple, vérifier que les fonds disponibles sont suffisants avant d’effectuer un débit.
- La logique métier d’orchestration, incarnée par le Domain Service, dont le rôle est de coordonner plusieurs Aggregates (ici, effectuer un transfert entre comptes).

Il est essentiel de préserver cette séparation.
Si l’on déplace toute la logique métier dans le Domain Service, celui-ci devient une simple façade procédurale dépourvue de véritable encapsulation d’état. On obtient alors un [Anemic Domain Model]({{< relref "commun_antipattern/anemic_model" >}}) — un anti-pattern où les entités du domaine se réduisent à de simples structures de données sans comportement, contredisant les principes du Domain-Driven Design.


```java
public final class TransferDomainService {

  public void transfer(Account from, Account to, BigDecimal amount) {
    ...

    // Métier de l'entité Account dans Domain Service - pas bon !
    if (from.getAmount().subtract(amount).compareTo(BigDecimal.ZERO) < 0) {
      throw new BusinessException("Insufficient funds");
    }

    from.debit(amount, "transfer-out:" + to.id()); 
    to.credit(amount, "transfer-in:" + from.id());
  }
}
```

Le Domain Service doit orchestrer les interactions entre les Aggregates, et non porter toute la logique métier. Les invariants et les règles de cohérence doivent demeurer dans les entités du domaine, afin de préserver un modèle riche et cohérent.

[^1]: Implementing DDD (Red Book)