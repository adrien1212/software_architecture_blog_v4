+++
title = "Encapsulation"
weight = 10
+++

## Encapsulation et architecture
Si nous reprenons l'exemple de l'architecture en couche, en plus de permettre [l'abstraction]({{< ref "abstraction" >}}), cette architecture permet l'encapsulation des données. 
- En effet, chaque couche cache le fonctionnement de la couche du dessous. Lorsque la couche de *Présentation* appelle la couche *Métier* alors elle n'a pas à se préoccupe pas de savoir comment les données vont être retournées par la couche de *Persistance*
- De plus, la logique métier peut être complexe. Par exemple, lorsque depuis la couche Présentation nous réalisons un achat, cela déclenche plusieurs actions qui sont encapsulées dans la couche Métier : déstockage de l'article, confirmation du paiement, envoi d'un mail.
