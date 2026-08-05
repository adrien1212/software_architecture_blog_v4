+++
title = "Abstract Factory"
weight = 30
+++

## Comprendre Abstract Factory avec un exemple
*Factory* signifie fabriquer, créer un objet. Les patrons employant le terme *Factory* permettent de créer de nouveaux objets sans exposer la logique d'instanciation (i.e l'appel à `new`). Commençons donc par illustrer ceci, nous souhaitons créer des animaux. 

![factory simple](factory_simple.png)

```java
public IAnimal creerAnimal(String type) {
    switch type:
        case "chien": return new Chien();
        case "tigre": return new Tigre();
}

main() {
    IAnimal dog = simpleFactory.create("dog");
}
```

Notre *Factory Simple* permet de cacher la logique d'instanciation. Nous ajoutons maintenant la notion de domestique et de sauvage.
- premièrement notre `switch` doit évoluer (non respect de l'Open/Closed Principle)
- ensuite on peut se demander si les animaux domestiques et sauvages possèdent les mêmes méthodes

![alt text](ajout_animaux.png)

Pour ces deux raisons, le diagramme de classe ci-dessus n'est pas satisfaisant. Nous devons trouver une solution pour séparer les animaux domestiques des animaux sauvages. Pour ce faire, définissons deux interfaces distinctes représentant nos *produits*.

![alt text](sauvage_domestique.png)

Puis comment, pouvons nous fabriquer ces différents objets ?
- pour chaque *variante de produit* (i.e Chien et Tigre) définir une fabrique (factory)

![abs factory animal](abs_factory_animal.png)

```java
public ChienFactory implement IAnimalFactory {
    public IAnimalDomestique creerAnimalDomestique() {
        return new ChienDomestique();
    }

    public IAnimalSauvage creerAnimalSauvage() {
        return new ChienSauvage();
    }
}
```

```java
main() {
    IAnimalFactory animalFactory;
    if(...) {
        animalFactory = new ChienFactory();
    } else {
        animalFactory = new TigreFactory();
    }

    IAnimalSauvage animalSauvage = animalFactory.creerAnimalSauvage();
    animalSauvage.chasser();
}
```
Le client peut travailler avec n’importe quelle variante de fabrique ou produit, tant qu'il interagit avec les interfaces abstraites.
- Le client n'a pas à se préoccuper du type concret qui est choisi à l'exécution
- Il se concentre sur le comportement à apporter, ici `chasser()` quel que soit le type concret de l'animal

### Open/Closed Principle
Maintenant, nous pouvons ajouter de nouvelles *variantes de produits* (e.g. Chat) sans endommager l’existant.
- implémenter `IAnimalDomestique` et `IAnimalSauvage`
- implémenter `IAnimalFactory`

La seule contrainte est que si nous souhaitons ajouter un produit, par exemple *Habitat* alors nous devrions modifier `IAnimalFactory` et l'ensemble des implémentations concrètes.[^2]

## Théorie derrière Abstract Factory
### Découpler le comportement de la création 

> [!affirmation] Affirmation
> - We need to decouple the behavior of an object from its creation. <br>
> - This might happen, for example, in a framework, where we can't anticipate the kind of objects we must create, but we can anticipate their behavior. [^1]

C'est bien le cas dans l'exemple précédent :
- le comportement (appel à `chasser()`) est découplé de la création de l'objet
- on ne peut pas anticiper qu'un utilisateur rajoute un produit mais nous pouvons anticiper les comportements sur ce produit (e.g. un chat qui chasse)

### Créer des objets complexes
> [!affirmation] Affirmation
> Les patrons Factory nous aident à construire des objets complexes sans que le client n'ait à se préoccuper des détails

Notre exemple avec les animaux est très simpliste, mais le patron factory joue un rôle très important lorsque la construction des objets est complexe (pas un simple constructeur). Nous y reviendrons lorsque nous aborderons le *patron Abstract Factory avec JDBC*

### Définition
> [!définition] Définition
> 1. Le but de ce patron de conception est d'isoler la création des objets de leur utilisation. 
> 2. Il fournit une interface pour créer des familles d'objets (e.g. domestique/sauvage) liés ou interdépendants sans avoir à préciser au moment de leur création la classe concrète à utiliser.

## Real-world example : API JDBC et Abstract Factory
Nous avons défini le patron Abstract Factory mais vous ne voyez peut-être pas l’intérêt concret. Nous allons repartir de l'exemple JDBC qui utilise ce patron de conception. 

JDBC nous permet d’interagir avec la base de données, dont voici un bref exemple
```java
Connection connection = DriverManager.getConnection(url); // initialiser la connexion
Statement statement = connection.createStatement();       // préparer un objet statement
ResultSet resultSet = statement.executeQuery("SELECT * FROM t_article");  // qui est utilisé pour exécuter une requête SQL
```

### Pourquoi pattern Abstract Factory
Lorsque vous écrivez le code ci-dessus, vous n'avez pas à vous préoccuper du SGBD qui sera utilisé à l'exécution (MySQL, Postgres, etc ...)
- --> isoler la création des objets de leur utilisation

Ensuite, vous n'avez pas à vous soucier de comment est créé l'objet `Connection`, `Statement` ou encore `ResultSet`
- --> construire des objets complexes sans que le client n'ait à se préoccuper des détails

### Créer un framework
Ensuite, l'API JDBC ne définit que les interfaces, si vous n'importez pas une dépendance Maven comme MySQL ou Postgres alors le code ci-dessus ne se lancera pas.

Par conséquent, le patron Abstract Factory nous permet de définir le contrat d'un framework et chaque fournisseur de SGBD implémente sa propre "Factory" concrète.[^3]

![jdbc](jdbc.png)

**Driver Factory**
- `Driver` joue également un rôle d'Abstract Factory pour permettre la création d'une `Connection`

**Connection Factory**
- `Connection` joue également un rôle d'Abstract Factory
- Les différents produits sont `Statement`, `PrepareStatement`, etc ...
- Et chaque SGBD implémente ses propres *variantes de produit*

### Avantages
- Interchangeabilité : On peut changer de SGBD sans modifier le code client car il ne dépend que des interfaces
- Encapsulation de la complexité : La création des objets JDBC est complexe (gestion des pools de connexions, paramètres spécifiques...) mais reste cachée derrière les interfaces simples
- Extension facile : Ajouter le support d'un nouveau SGBD ne nécessite que l'implémentation des interfaces existantes

Dans l'exemple sur les animaux, la création d'un nouvel animal n'était pas complexe, regardons ce qu'il en est pour créer une `Connection` depuis un `Driver`

**Cas MySQL**
![connection-mysql](connection-mysql.png)

**Cas Postgres**
![connection-postgres](connection-postgres.png)


[^1]: http://www.cs.sjsu.edu/faculty/pearce/modules/patterns/creational/factory.htm
[^2]: https://stackoverflow.com/a/60795309/9399016 (problème connu)
[^3]: https://stackoverflow.com/a/7550752/9399016


<!-- 
![alt text](getConnection.png)

Les lignes 677 à 699 sont très intéressantes :
1. si vous n'avez que la dépendance Maven MySQl alors `registeredDrivers` contient un seul élément le DriverMySQL, si vous avez les dépendances MySQL et PostgreSQL alors le tableau contient les deux drivers
2. Ensuite, ligne 683 via la méthode `Driver.connect()` il va essayer de se connecter en fonction de l'url `jdbc:mysql//localhost:...` ou `jdbc:postgres//localhost:...`
   - s'il réussit il retourne la connexion construite via la Factory Driver.connect
   - sinon il essaie avec le driver suivant

=> Ceci permet de rajouter des SGBD qui seront automatiquement scannés sans avoir besoin de recoder une seule ligne de code 

-->


## Notes complémentaires
> Factory Method : And finally, the third point to note is that the Creator (parent) class invokes its own factoryMethod(). If we remove anOperation() from the parent class, leaving only a single method behind, it is no longer the Factory Method pattern. In other words, Factory Method cannot be implemented with less than two methods in the parent class; and one must invoke the other. (https://stackoverflow.com/a/50786084/9399016)


> If the Abstract Factory has only one creator and one product, is it still the Abstract Factory pattern? (an interface for creating familes) ? <br>
> No. An Abstract Factory must create more than one product to make a "family of related products". (https://stackoverflow.com/a/38668246/9399016)