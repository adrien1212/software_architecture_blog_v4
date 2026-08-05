+++
title = "Implémenter la logique métier"
weight = 20
+++

Une *logique métier* (Business Logic) simple peut être implémentée avec le [Transaction Script Pattern]({{< relref "commun_antipattern/anemic_model/transaction_script" >}}) par exemple. Mais lorsqu'elle devient complexe il est nécessaire d'implémenter plusieurs patrons autour de la notion de [Modèle de Domaine (Domain Model)](https://en.wikipedia.org/wiki/Domain_model).

> In his book, Evans presents a set of patterns aimed at tightly relating the code to the
underlying model of the business domain: aggregate, value objects, repositories, and
others. These patterns closely follow where Fowler left off in his book and resemble
an effective set of tools for implementing the domain model pattern.