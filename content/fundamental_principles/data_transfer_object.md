+++
title = 'Data Transfer Object'
weight = 9
+++

> [!ressource] Ressources
> - [ Why use DTOs (Data Transfer Objects)? ](https://youtu.be/JJT1xykf1do)
> - [Don’t expose your JPA entities in your REST API](https://thorben-janssen.com/dont-expose-entities-in-api/)
> - [DTOs & Mapping : The Good, The Bad, And The Excessive](https://youtu.be/FKFxWrwdAWc)

## Définition
> [!danger] Définition
>  A Data Transfer Object (DTO) is an object that is used to encapsulate data, and send it from one subsystem of an application to another.

### Pourquoi est-ce important ?
> Prevent leaking internal structure

En exposant à l'utilisateur une structure différente de notre structure interne, nous aurons la possibilité de changer ultérieurement la structure interne sans impacter le client. En effet, dans le cas d'une API REST, si nous changeons la structure de retour ceci peut avoir des conséquences dramatiques pour l'appelant.

## Exemple
Il permet de transformer des informations qui transitent entre deux couches. Par exemple, dans l'exemple suivant le `AccountService` attend des objets de type `AccountRequestModel`.
Ainsi, le contrôleur :
- Récupère les informations fournies par l'utilisateur (ex : identifiant utilisateur, nom du compte, etc.).
- Au lieu de transférer directement les informations au Service métier, il va les encapsuler dans un objet DTO.
- Transmet le DTO au Service métier

![DTO](fundamental_principles/images/dto.png)

### Un peu de code
```java
public interface AccountService {
    public void create(AccountRequestModel accountRM);
}
```

```java
public class AccountRequestModel {
    private Long idCustomer;
    private Long idAccount;
    private String name;
    private String accountType;
}
```

Maintenant quand le contrôleur va recevoir les données il devra créer un `AccountRequestModel` et seulement après appeler le service. Néanmoins pour diminuer le nombre de DTOs dans le système il est envisageable que la méthode `create()` prenne en paramètre le même DTO (la vue et le contrôleur ont le même *request dto*).
```java
@PostMapping()
public void create(@RequestBody AccountRequestModel requestModel) {
    accountService.create(requestModel);
}
```

Le client doit ainsi envoyer un JSON correspondant à un `AccountRequestModel`, le contrôleur le transmettra ensuite au service
```json
{
    idCustomer: 1,
    idAccount: 4,
    name: "adrien"
    accountType: "CREDIT"
}
```
### ResponseModel (DTO de réponse)
> [!note] Note
> Nous nous concentrons sur les données que nous voulons exposer au frontend. 

En effet, nous ne souhaitons pas forcément exposer l'ensemble des informations de notre service. Ainsi on retourne un `AccountResponseDTO` qui contient des attributs correspondant à ceux qu'on souhaite réellement exposer au frontend 
