+++
title = "Adapter"
weight = 20
+++

Dans ce chapitre nous étudierons le patron adaptateur au travers d'un exemple pour permettre de communiquer facilement avec la base de données

## Représenter une BDD
Classiquement pour créer une base de données, effectuer des requêtes nous utilisons le langage SQL. Néanmoins, il existe des outils (ORM - Object-Relational Mapping) qui permettent la gestion de la persistance des données, permettant aux développeurs de travailler avec des bases de données relationnelles en utilisant des objets Java plutôt que des requêtes SQL. JPA est un ORM qui fait la relation (mapping) entre les objets applicatifs et les tables en base de données.

![Alt text](design_patterns/adapter/images/adapter1.png)

> [!note] Note
> Pour le moment, nous n'avons pas parlé d'adaptateur. Je montre juste une façon de représenter une table SQL en Java. `FactureJPA` est *l'entité base de données*


## Accéder à la base de données
### Mauvaise approche
Une première façon (mais fausse) serait que le coeur applicatif contacte directement la classe `FactureRepository`.

![Alt text](design_patterns/adapter/images/adapter2.png)

```java
private FactureRepository factureRepository;

public void imprimer(int id) {
    FactureJPA factureJPA = factureRepository.get(id);
       
    /* imprimer factureJPA */
}
```

Malgré que cette approche compile et s'exécute correctement elle pose un problème de *couplage fort* :
- premièrement si nous devons changer la classe `FactureRepository` qui est fortement liée à un ORM nous devrions également changer la couche métier de notre application.
- deuxièmement si nous changeons notre table en base de données (donc `FactureJPA` qui représente en Java la table) alors le coeur applicatif devra être recompilé et redéployé chez le client

### Bonne approche
Une approche alternative qui assure un couplage faible est l'utilisation du patron adaptateur. Il va traduire la notion de `Facture` (entité métier) en notion de `FactureJPA` (entité base de données). Nous avons deux représentations d'un même concept mais les attributs peuvent être différents. Par exemple en base de données je souhaite stocker la date de dernière consultation mais dans la couche métier ceci ne m'intéresse pas.

![Alt text](design_patterns/adapter/images/adapter3.png)

L'adaptateur :
- reçoit en entrée une `Facture` qu'il transforme en `FactureJPA`
- récupère en retour une `FactureJPA` qu'il transforme en `Facture`

Mais afin d'accentuer le découplage, nous allons utiliser des DTOs, l'adaptateur :
- reçoit en entrée une `FactureDTO` (provenant du coeur applicatif) qu'il transforme en `FactureJPA`
- récupère en retour une `FactureJPA` qu'il transforme en `FactureDTO` (pour le retourner au coeur applicatif)

![Alt text](design_patterns/adapter/images/adapter4.png)

```java
public class FactureBDDAdapter {
    private FactureRepository factureRepository;
	
    void enregistrer(FactureDTO factureDTO) {
        FactureJPA factureJPA = factureDTO2factureJPA(factureDTO);
		
        factureRepository.save(factureJPA);
    }
	
    FactureDTO get(int id) {
        FactureJPA factureJPA = factureRepository.get(id);		
        return factureJPA2factureDTO(factureJPA);
    }
	
    FactureJPA factureDTO2factureJPA(FactureDTO fDTO) {
        // dateCreation et dateLastConsultation sont crees ici en interne 
        // dans le systeme via Date.now()
        return new FactureJPA(
                fDTO.getNom(), fDTO.getTotal(), Date.now(), fDTO.getEcheance(), fDTO.now()))
    }
}
```

Et `FactureService` passe par l'adaptateur pour contacter la base de données

```java
public class FactureService {
    private Facture facture

    private IFactureBDDAdapter iFactureBDDAdapter

    void imprimer(int id) {
        FactureDTO fDTO = iFactureBDDAdapter.get(id);

        Facture facture = factureDTO2facture(fDTO)

        /* Imprime facture */
    }

    FactureDTO factureDTO2facture(FactureDTO factureDTO) {
        return new Facture(factureDTO.getName(), etc ...) 
    }
}
```

Maintenant si `FactureJPA` est modifié alors nous n'aurons qu'à modifier l'adaptateur. La couche métier reste inchangée grâce au patron adaptateur.

## Conclusion

- `Facture` représente une *entité métier*
- `FactureJPA` représente une *entité base de données*
- Les deux ne sont pas forcément identiques.


Les DTO permettent de traverser les couches. On envoie/reçoit que les informations stricte-
ment nécessaires.
- `FactureDTO` représente un DTO entre la couche métier et la couche persistance
- `FactureJPA` représente en soit le DTO entre la couche persistance et la couche base de données
