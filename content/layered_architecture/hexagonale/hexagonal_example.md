+++
title = "Exemple"
weight = 2
+++

![Alt text](layered_architecture/hexagonale//images/hexa5.png)

## Communication entrante code
```java
/* Port entrant */
public interface IService {
   void creer(UserDTO dto);!
}
```

```java
/* Port entrant */
public class Controler {
   public void creerNouvelUser(String nom, email, mdp) {
        UserDTO userDTO = new UserDTO(nom, email, mdp);
        iService.create(userDTO)
   }
}
```

## Communication sortante code
```java
/* Port sortant */
public interface IRepository {
   void create(UserRepoDTO dto);
}
```

```java
/* Adaptateur */
public class RepositoryAdapteur {
    public void create(UserRepoDTO dto) {
        UserJPAEntity jpaEntity = UserJPAEntity(dto.nom, dto.email, dto.mdp, dto.dateDuJour)
        postgresRepository.save(jpaEntity)
    }
}
```

## Le service
Il récupère les informations du contrôleur, transforme le DTO, et envoie au port sortant

```java
/* Port entrant */
public class ServiceImpl implements IService {
   public void creer(UserDTO dto) {
       userRepoDTO = new UserRepoDTO(dto.nom, dto.email, dto.mdp, dateDuJour()); // la date du jour est calculée par le service
       iRepository.create(userRepoDTO)
   }
}
```
