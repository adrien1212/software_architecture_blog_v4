+++
title = "Module vs Service"
weight = 10
+++

## Modularité

La [modularité]({{< relref "fundamental_principles/modularity/index" >}}) est toujours une bonne idée. Pour la mettre en place nous avons deux choix :

- Créer des librairies (modules) : qui sont directement appelée (in-memory called)
- Créer des services : qui eux sont appelée via des protocole standardisés (out-of-process). Par exemple, l'approche microservice préférera mettre en application la modularité en utilisant l'approche par services.


## Le conditionnement

La **différence** entre un module et un service **réside donc dans le conditionnement**.

- Les modules sont des composants au niveau de la programmation qui encapsulent un morceau de logiciel pour qu'il soit réutilisé par d'autres logiciels via un _in-memory function calls_ (i.e. appel classique d’une fonction). Par exemple, une dépendance Maven.
- Un microservice est le déploiement d'un logiciel destiné à être utilisé par d'autres logiciels au travers d'un protocole (e.g. http); on parle donc de _out-of-process_.

![module vs service](module_vs_service.png)

Comme on le voit ci-dessus :

- Les microservices peuvent être composés de modules (qui permettent de structure le code). Ces modules sont soient des fonctionnalités internes mais peuvent être également des dépendances externes (e.g. Junit et Log4j). Ces dépendances ne sont pas déployées sur un serveur, nous allons les utilisées en interne sans passer par un protocole (http) mais en faisant des appel classique de fonction (_in-memory function calls_).
- D'un autre côté les microservices qui sont un niveau d'abstraction au dessus peuvent également se transmettre des données, mais au lieu d'avoir une dépendance nous préférons avoir un protocole standardisée permettant l'échange.

> Un module encapsule du code pour pouvoir être réutilisée au sein d'une application. Un microservice encapsule un besoin (sous forme de code) et offre ce service aux autres.

### Componentization

[https://martinfowler.com/articles/microservices.html#ComponentizationViaServices](https://martinfowler.com/articles/microservices.html#ComponentizationViaServices)

Martin Fowler appelle ceci la _Componentization_.

Nous définissons les bibliothèques (modules) comme des composants liés à un programme et appelés à l'aide _in-memory function calls_ (i.e. appel classique d'une fonction), tandis que les services sont des composants _out-of-process_ qui communiquent avec un mécanisme tel qu'une demande de service web (http) ou un appel de procédure à distance (remote).
