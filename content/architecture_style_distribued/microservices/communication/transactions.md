+++
draft = "true"
title = "Transactions"
weight = 10
+++

Là où l'atomicité est un principe trivial en architecture monolithique, il devient compliqué de le mettre en place dans une architecture distribuée en microservices. En effet, avec l'architecture microservices, nous souhaitons un découplage fort, mais comment doit-on assurer les transactions qui se déroulent au sein de plusieurs services ?

## Rappel transaction
> [!danger] Définition
>  Une transaction doit répondre aux caractéristiques ACID

Dans un scénario de transactions distribuées, comme la transaction s'étend sur plusieurs services, il faut toujours garantir les propriétés ACID

### Le problème
Avec une architecture monolithique, tous les *create* ou *update* sont réalisés dans une même transaction. Dans l'exemple ci-dessous, créer une commande et insérer un enregistrement dans l'entrepôt sont réalisés dans une même transaction

![Single transaction](../images/single_transaction.png?width=20pc)

Mais que se passe-t-il lorsqu'on a deux services distincts ?  Qu'arriverait-il si nous insérons dans la table *Order* avec succès mais qu'une erreur se produit lors de l'insertion dans *Picking* ?

![distributed transaction](../images/distributed_transaction.png?width=20pc)

## Solutions
### Revoir la granularité (Boundaries)

Etant donné que la gestion des transactions entre plusieurs services est difficile, la première solution consiste à revoir la granularité de nos composants. Comme nous l'avons vu dans la section dédiée au [Bounded Context]({{% relref "../../../basics_for_modeling/bounded_context" %}}) les limites de transaction (_transaction boundaries_) sont l'un des indicateurs courants de la granularité des services.

> Don’t do transactions in microservices — fix granularity instead!

### Patrons transactionnels

Des solutions existent pour assurer les transactions distribuées :

- Le Two-Phase Commit protocol (2PC) qui est un patron largement utilisé. Mais, il pose plusieurs problèmes
- Le SAGA est une deuxième stratégie qui repose sur des **transactions locales**. Par conséquent, chaque transaction locale (effectuée sur un microservice) peut être annulée (rollback) si la transaction locale effectuée sur un autre microservice échoue.

> Par conséquent, le modèle Saga garantit que toutes les opérations se terminent avec succès ou que des transactions de compensation soient exécutées pour annuler le travail effectué précédemment.
