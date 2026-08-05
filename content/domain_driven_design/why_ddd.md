+++
title = "Pourquoi le DDD ?"
weight = 1
+++

> [!ressource] Ressources
> - [Essence of Domain-Driven Design (DDD)](https://youtu.be/Y0txTmT3k7M)

Selon des études, environ 70 % des projets de logiciels ne sont pas livrés à temps, dans le respect du budget ou des exigences du client.

Le terme _crise du logiciel_ (software crisis) a été introduit en 1968. On pourrait supposer que les choses se sont améliorées au cours des 50 années qui ont suivi. En effet, de nombreuses approches, méthodologies et disciplines ont été introduites pour rendre l'ingénierie logicielle plus efficace : Manifeste Agile, extreme programming, développement piloté par les tests (TDD), DevOps, etc. Malheureusement, les choses n'ont pas beaucoup changé. Les projets échouent encore assez souvent et la crise du logiciel est toujours là.

## L'approche DDD
La valeur d'un logiciel réside dans la logique métier (Business Logic) qu'il fournit à ses clients. L'objectif du Domain-Driven Design (DDD) est de nous aider à implémenter correctement cette logique métier, en particulier lorsqu'elle est complexe. On parle de logique métier complexe lorsqu'elle ne se réduit pas à un simple CRUD ou à un pipeline ETL.

Aujourd’hui, de nombreux logiciels sont développés en suivant une approche [Anemic Domain Model]({{< relref "commun_antipattern/anemic_model/" >}}). Cela aboutit à un code difficile à comprendre et à maintenir, car :
- **Le code ne reflète pas l’intention métier.**
Par exemple, au lieu d'avoir une méthode explicite comme `Account.open()` pour ouvrir un compte, on retrouve souvent du code fragmenté avec getters/setters comme :
```java
public void createAccount(AccountDTO accountDTO) {
    Account account = new Account();
    account.setName(accountDTO.getName())
    ...
    account.setStatus("OPEN");
    account.setOpenedAt(LocalDateTime.now());
}
```

- **La logique métier est dispersée entre plusieurs classes.**
Les règles de validation, les calculs ou les contrôles d'invariants sont souvent externalisés dans des services utilitaires ou des contrôleurs. Par exemple, le contrôle d'un solde suffisant avant un retrait peut se retrouver dans un `AccountService` :
```java
if (account.getBalance() >= amount) {
    account.setBalance(account.getBalance() - amount);
} else {
    throw new InsufficientFundsException();
}
```

En DDD, on préférera encapsuler cette logique directement dans l'entité `Account` et créer une méthode qui représente le métier :
```java
public void withdraw(Money amount) {
    if (!canWithdraw(amount)) {
        throw new InsufficientFundsException();
    }
    this.balance = this.balance.subtract(amount);
}
```

- **Un domaine qui ne reflète pas le modèle relationnel BDD**
Dans de nombreux projets, la conception logicielle commence par le schéma de base de données relationnelle. Résultat : toute la modélisation métier est contrainte dès le départ par des choix techniques liés à la persistance. Cette approche, bien que familière, est en contradiction avec les principes du Domain-Driven Design (DDD), où c'est le domaine métier qui doit dicter la structure du logiciel — et non l'inverse.

Le DDD nous invite à prendre conscience du métier, à comprendre ses règles, ses invariants, son langage, puis à retranscrire cette compréhension dans le code de manière structurée, cohérente et lisible. 

> [!definition] Définition
> Domain-driven design (DDD) is an approach to developing software for complex needs by deeply connecting the implementation to an evolving model of the core business concepts. [^1]

[^1]: https://www.dddcommunity.org/learning-ddd/what_is_ddd/