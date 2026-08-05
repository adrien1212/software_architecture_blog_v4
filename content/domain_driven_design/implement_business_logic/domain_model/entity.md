+++
title = "Entité"
weight = 10
+++

> [definition] Définition
> In Domain-Driven Design (DDD), **an entity is an object that is uniquely identifiable** and represents a core concept within your domain. Entities differ from other objects because their identity does not change over time, even if their properties do.

L'identification d'un objet peut être via un ID, ou un attribut métier qui la rend uniquement : ISBN pour un livre.

Une entité aura ensuite son cycle de vie : le prix du livre peut augmenter, diminuer mais son identité restera identiquement.

