+++
title = "Voir plusieurs dimensions"
weight = 20
+++

> [!ressource] Ressources
> - [https://youtu.be/w9a7eI6BlVc?t=1677](https://youtu.be/w9a7eI6BlVc?t=1677)

Un architecte doit être capable de cerner les différentes questions et problématique qui se cachent derrière un sujet. Pour illustrer, qu'est-ce qui pourrais mal se passer dans l'architecture suivante ?

![what goes wrong](wrong.png)

La question n'est pas si simple qu'elle laisse paraître. En effet cette question en cache plusieurs autres :
- Premièrement, *comment fonctionne le système ?* (appel de méthode, point-to-point, synchrone/asynchrone, etc ...) suivant la réponse les problématiques seront différentes
- Ensuite on peut se demander se que représente concrètement A et B. Sont-ils des systèmes ou des instances d'un système particulier ?
- Puis des problématiques techniques apparaissent, comment gérer les erreurs ? est-ce qu'on *retry* lorsqu'une erreur ce produit ? Et si B est off est-ce qu'on arrête de *retry* ? etc ...

On remarque bien qu'il y a différents sujets à aborder derrière cette question qui semblait simpliste. En tant qu'architecte on a besoin de comprendre l'ensemble de ces considération lorsqu'il dessine cette ligne.

![architect dimension](architect_dimension.png)

L'équipe de développement est très contente du choix technologique MAIS les implications de ce choix sont un peu flous dans leur esprit. L'architecte est donc là pour analyser un ensemble de facteurs et d'en étudier des compromis.
