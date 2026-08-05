+++
draft = "true"
title = "Exemple"
weight = 2
+++

![Alt text](../images/hexa5.png)

## Code de communication entrante
```java
/* Port entrant */
public interface IService {
   void creer(UserDTO dto);
}
```

```java
/* Port entrant */
public class Controler {
   public void creerNouvelUser(String nom, String email, String mdp) {
        UserDTO userDTO = new UserDTO(nom, email, mdp);
        iService.create(userDTO);
   }
}
```

## Code de communication sortante
```java
/* Port sortant */
public interface IRepository {
   void create(UserRepoDTO dto);
}
```

```java
/* Adaptateur */
public class RepositoryAdaptateur {
    public void create(UserRepoDTO dto) {
        UserJPAEntity jpaEntity = new UserJPAEntity(dto.nom, dto.email, dto.mdp, dto.dateDuJour);
        postgresRepository.save(jpaEntity);
    }
}
```

## Le service
Il récupère les informations du contrôleur, transforme le DTO, et les envoie au port sortant

```java
/* Port entrant */
public class ServiceImpl implements IService {
   public void creer(UserDTO dto) {
       UserRepoDTO userRepoDTO = new UserRepoDTO(dto.nom, dto.email, dto.mdp, dateDuJour()); // la date du jour est calculée par le service
       iRepository.create(userRepoDTO);
   }
}
```
