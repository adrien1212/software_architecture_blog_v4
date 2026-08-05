+++
title = "Anemic Domain Model"
weight = 10
+++

> [!ressource] Ressources
> - [Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html)
> - [Reevaluating the Layered Architecture](https://javadevguy.wordpress.com/2019/01/06/reevaluating-the-layered-architecture/)
> - [The Biggest Flaw of Spring Web Applications](https://www.petrikainulainen.net/software-development/design/the-biggest-flaw-of-spring-web-applications/)

## Définition

> [!definition] Définition
> Un Anemic Domain Model est décrit comme un anti-pattern de programmation où les [domain object](https://en.wikipedia.org/wiki/Domain-driven_design) contiennent peu ou pas de logique métier, comme des validations, des calculs, des règles.



## Pourquoi est-ce problématique ?
Nous créons du code procédural, c'est-à-dire qui va en l'encontre de la POO où la logique métier et la structure des données doivent vivre dans la même classe.

### État incohérent
Les objets ne contiennent plus les règles permettant de garantir un état cohérent

> Needs a separate business layer to contain the logic otherwise located in a domain model. It also means that domain model’s objects cannot guarantee their correctness at any moment, because their validation and mutation logic is placed somewhere outside (most likely in multiple places).

### Violation du principe d'encapsulation
> Violation of the [encapsulation]({{< relref "fundamental_principles/aei/index" >}}) and information hiding principles [^1]

La structure des données et la logique métier (*behavior*) doivent vivre dans la même classe.

## Quand le retrouve-t-on ?
Une mauvaise structure de la Layered Architecture peut conduire à cet anti-pattern. Je vous recommande de lire [The Biggest Flaw of Spring Web Applications](https://www.petrikainulainen.net/software-development/design/the-biggest-flaw-of-spring-web-applications/) qui présente comment des applications Spring peuvent rapidement être mal conçues avec des classes `xService` qui contiennent la logique métier et le `Modèle de données` qui ne contient que des getters et setters

### Mauvais code
```java
public class BankAccountServiceImpl implements BankAccountService {

	public void withdraw(String iban, double amount) throws InsufficientBalanceException {
		
		BankAccount account = //Find bank account by using iban
		
		//Tiny innocent if clause which can be copied from one class to another
		if (account.getBalance() < amount) {
			throw new InsufficientBalanceException();
		}
		
		account.setBalance(account.getBalance() - amount)
	}
}
```

### Préférez  
```java
public class BankAccountServiceImpl implements BankAccountService {
    public void withdraw(String iban, double amount) throws InsufficientBalanceException {
        
        BankAccount account = //Find bank account by using iban		
        account.withdraw(amount);
    }
}
```

```java
public class BankAccount {
	private double balance;
	...
	
	public void withdraw(double amount)  throws InsufficientBalanceException {
		if (balance < amount) {
			throw new InsufficientBalanceException();
		}

		balance -= amount;
	}
}
```

Le rôle de l'Application Layer (== Service Layer) est défini par Eric Evans
> Application Layer [his name for Service Layer]: Defines the jobs the software is supposed to do and directs the expressive domain objects to work out problems. The tasks **this layer is responsible** for are meaningful to the business or necessary **for interaction with the application layers of other systems**. This layer is kept thin. It **does not contain business rules or knowledge, but only coordinates tasks and delegates work to collaborations of domain objects** in the next layer down. It does not have state reflecting the business situation, but it can have state that reflects the progress of a task for the user or the program.


[^1]: (https://en.wikipedia.org/wiki/Anemic_domain_model)