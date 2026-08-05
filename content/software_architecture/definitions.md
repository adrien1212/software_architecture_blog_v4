+++
title = "Définitions"
weight = 5
+++

> [!ressource] Ressources
> - [What Is Software Architecture - Bredemeyer Consulting](https://www.bredemeyer.com/whatis.htm)
> - [https://martinfowler.com/architecture/](https://martinfowler.com/architecture/)

Il est très compliqué de donner _une_ définition pour l'architecture logicielle. Ci-dessous voici comment des spécialistes du domaine définissent l'archictecture logicielle. D'autres définitions sont disponibles [ici](https://beza1e1.tuxen.de/definitions_software_architecture.html)

> [!definition] IEEE 1471-2000
> Software architecture is the fundamental organization of a system, embodied in its components, their
> relationships to each other and the environment, and the principles governing its design and evolution. [^1]
> [^1]: IEEE 1471-2000

> [!definition] Grady Booch
> Architecture represents the significant design _decisions_ that shape a system, where significant is measured by cost of change.

> [!definition] Ralph Johnson
> In most successful software projects, the expert developers working on that project have a shared understanding of the system design. This shared understanding is called “architecture.” This understanding includes _how the system is divided into components and how the components interact through interfaces_. These components are usually composed of smaller components, _but the architecture only includes the components and interfaces that are understood by all the developers_ 
> Architecture is about the important stuff. Whatever that is.. [^3]
> [^3]: [https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf)

> [!definition] Philippe Kruchten
> An architecture is the set of significant decisions about the organization of a software system, the selection of structural elements and their interfaces by which the system is composed, together with their behavior as specified in the collaborations among those elements, the composition of these elements into progressively larger subsystems, and the architectural style that guides this organization -- these elements and their interfaces, their collaborations, and their composition.[^4]
> [^4]: Kruchten (2003) The Rational Unified Process: An Introduction

## Quoi retenir

- Prendre des décisions sur l'organisation du logiciel, ses composants et leurs relations
- Minimiser le coût du changement en écrivant un logiciel flexible
- Les développeurs et les architectes doivent avoir une compréhension commune de comment diviser le système et comment les composants interagissent entre eux. L'architecture n'est pas qu'un concept technique c'est également du _social_.

> The best architecture is the one that fits the business needs, not the one that mimics the tech giants (Google, Netflix, ...)
