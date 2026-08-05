+++
draft = "true"
title = "Conclusion"
weight = 15
+++

## Avantages
L'architecture microkernel offre de nombreux avantages. 
- Modularité : l'ajout, la mise à jour ou la suppression d'un module est très simple.
- Fiabilité : même en cas de crash d'un composant, l'application peut rester utilisable.
- Maintenance : les plugins gèrent leur propre maintenance

## Discussions
Elle offre deux choix d'implémentation pour la communication :
- point-à-point : nous avons donc une architecture monolithique
- via des API : nous avons donc une architecture pouvant être distribuée. Il faut donc prendre en compte les difficultés de déploiement et le coût supplémentaire.
