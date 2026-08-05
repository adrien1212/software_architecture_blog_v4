+++
title = "Controller et Presenter"
weight = 10
+++

> [!ressource] Ressource
> - [Implementing Clean Architecture - Of controllers and presenters](http://www.plainionist.net/Implementing-Clean-Architecture-Controller-Presenter/)

![clean architecture detail](layered_architecture/clean/clean-details.png)

## Explications Presenter

- Le `Presenter` (un adaptateur) implémente une interface définie dans la couche métier (_Application Business Rules Layer_).
- L'interface `Output Port` représente un _interactor_; c'est-à-dire que les méthodes de cette interface sont conçues pour servir les besoins d'un `UseCase Interactor` spécifique.
- C'est donc l'intéractor qui détient l'interface (on le voit avec la flèche)
- Le `Presenter` forme donc un pont entre l'interface requise par l'intéractor et l'interface requise par la librairie qu'on utilise pour faire l'IHM.

En d'autres termes, le `Presenter` _adapte_ l'interface de la couche métier pour travailler avec l'interface de l'IHM

## Explications Controller

De manière similaire le Controller fonctionne de la même manière mais pour l'autre sens.

- L'interface `Input Port` fournie les méthodes qui devront être implémentées par un `UseCase Interactor` spécifique
- Le `Controller` pourra appeler ces méthodes pour effectuer une action de la couche métier

En d'autres termes, le `Controller` adapte l'entrée de l'API en un format compris par la couche métier.
