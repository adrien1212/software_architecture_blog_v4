+++
title = "Caractéristiques"
weight = 20
+++

> [!ressource] Ressources
> - [Will Modular Monolith Replace Microservices Architecture?](https://medium.com/att-israel/will-modular-monolith-replace-microservices-architecture-a8356674e2ea)
> - [When (‌modular) monolith is the better way to build software](https://www.thoughtworks.com/en-us/insights/blog/microservices/modular-monolith-better-way-build-software)

- Dans le monolithe modulaire, comme dans les microservices, chaque module communique avec un autre module par l'intermédiaire d'API, de préférence une communication asynchrone à couplage lâche.
  - Ce point est néanmoins discutable, des auteurs proposent également de garder des appels *in-memory called* (appel classique de fonction) mais avec chaque service qui définie une Interface (Java) avec quelques méthodes publiques qui feront offices de contrat.

- Dans un monolithe modulaire, tout comme le monolithe, la base de données est unique, contrairement aux microservices où chaque microservice doit avoir son propre schéma.

- Généralement, tous les modules d'un monolithe modulaire s'exécutent sur la même machine virtuelle ou chaque module s'exécute sur une machine virtuelle spécifique. Les modules sont trop volumineux pour tenir dans un conteneur.

## La réponse apportée par MM
> Instead of focusing on architectural drivers, we believed that microservices are medicine for all the evil that sits in monolithic applications
