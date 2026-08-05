+++
title = "Scalabilité"
weight = 80
+++

> [!ressource] Ressources
> - [https://stackoverflow.com/questions/9420014/what-does-scalability-mean](https://stackoverflow.com/questions/9420014/what-does-scalability-mean)
> - [https://itrexgroup.com/blog/what-is-software-scalability/](https://itrexgroup.com/blog/what-is-software-scalability/)


D'après wikipédia, 

> [!definition] Définition
>  La scalabilité est la capacité d'un système à subvenir aux besoins en ressources, sans prendre en compte la rapidité, le temps, la fréquence, ni la granularité de ses actions lorsque le nombre d'utilisateur augmente

La *scalabilité* consiste à gérer un grand nombre d'utilisateur sans avoir une dégradation sérieuse des performance. Il peut s'agir, d'un nombre de requêtes plus important, d'une plus grande quantité de données (data-set) à traiter, etc ...

La *scalabilité* correspond donc à la capacité du système à faire face à des charges plus importantes en ajoutant des ressources :
- soit en ajoutant des nœuds supplémentaires (scale out)
- soit en renforçant le matériel (scale up)

## Scale out (horizontale)
Vous pouvez *scaler* un logiciel horizontalement en incorporant des nœuds supplémentaires dans le système pour gérer une charge plus importante.
![hozitontal scalability](scalability1.png)

## Scale up (verticale)
Le *scale* verticale consiste à ajouter de la puissance au matériel existant. Il s'agit ici d’upgrade le serveur existant en y ajoutant de la puissance de traitement, de la mémoire, etc.

![hozitontal scalability](scalability2.png)

- La mise à l'échelle verticale a une limite stricte. Il est impossible d'ajouter un nombre illimité de CPU et de mémoire à un seul serveur.
- La mise à l'échelle verticale ne permet pas le basculement et la redondance. Si un serveur tombe en panne, le site web/l'application tombe aussi en panne.

## Assurer le passage à l'échelle
Un *Load balancer* permet de distribuer le traffic entre plusieurs serveurs (scale out). 
- Si le serveur 1 tombe en panne, tout le trafic sera acheminé vers le serveur 2. Cela permet d'éviter que le site web ne soit mis hors ligne. Nous ajouterons également un nouveau serveur web sain au pool de serveurs afin d'équilibrer la charge.
- Si le trafic du site web augmente rapidement et que deux serveurs ne suffisent pas à gérer le trafic, l'équilibreur de charge peut gérer ce problème avec élégance. Il suffit d'ajouter d'autres serveurs au pool de serveurs web pour que l'équilibreur de charge commence automatiquement à leur envoyer des requêtes.

![Alt text](loadbalancer.png)
