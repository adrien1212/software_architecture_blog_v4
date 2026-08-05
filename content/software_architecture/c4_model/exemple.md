+++
title = "Exemple concret"
weight = 20
+++

> [!ressource] Ressources
> - [Slide - Le versionning des APIs REST: dans la vraie vie, on fait comment?](https://speakerdeck.com/alexandretouret/bdxjug24-le-versioning-des-apis-rest-dans-la-vraie-vie-on-fait-comment?slide=14)

Lors d'un talk [Le versionning des APIs REST: dans la vraie vie, on fait comment?](https://youtu.be/m8DbVbMDe2w) j'ai été agréablement surpris par l'utilisation des diagrammes C4 Model. Les exemples qui suivent proviennent donc d'un cas d'usage réel.


## Container diagram
On représente ci-dessous la vue de haut niveau d'une application *BookStore* avec deux types d'utilisateurs (client et administrateur) puis on retrouve le coeur de notre application :
- notre système, où nous pouvons créer, rechercher des livres, ...
- un module de sécurité IAM pour l'authentification et l’autorisation

![component_diagram](exemple_container_diagram.png)

## Component diagram
Si on descent d'un niveau avec une *vue composent*, le diagramme présente l'architecture microservice élaboré par les développeurs :
- une API BookStore
- exposé au travers d'une Gateway qui est le point d'entré
- un serveur de configuration 
- l'IAM qui va nous permettre de nous identifier et fournir un jeton JWT
- un serveur d’observabilité (zipkin)

![component_diagram](exemple_component_diagram.png)

Le talk est sur le versionnage des API (v1, v2, ...) et on se demande qui doit porter la version ?
- uniquement sur la gateway car c'est notre porte d'entrée avec un routage vers le bon backend
  - `/v1` routage vers backend v1
  - `/v2` routage vers backend v2
- également, on peut se poser la question sur les services tiers, est-ce qu'il porte la version aussi.

Note, la base de données est partagé entre nos différentes versions.

![component_diagram](exemple_component_diagram2.png)

