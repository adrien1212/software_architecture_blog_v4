+++
title = "Communication entre Agrégats"
weight = 10
+++

## Le code
```java
@Entity
public class SessionEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "sessionEnrollment", cascade = CascadeType.ALL, optional = true)
    private Feedback feedback;

    public void addFeedback(String comment, int rating) {
        if (this.getFeedback() != null) throw new DomainException("Feedback already enrolled");

        if (comment == null || comment.isBlank()) throw new DomainException("Comment is required");

        if (rating < 0 || rating > 5) throw new DomainException("Rating must be between 0 and 5");

        if (!session.isSessionComplete()) {
            throw new DomainException("Session not completed");
        }

        Feedback feedback = new Feedback(rating, comment);
        feedback.setCompany(session.getTraining().getCompany());
        feedback.setComment(comment);
        feedback.setRating(rating);
        feedback.setSessionEnrollment(this);
        this.feedback = feedback;
    }
}

public class FeedbackService {
    @Transactional
    public void giveFeedback(FeedbackRequestModel feedbackRequestModel) {
        SessionEnrollment sessionEnrollment = sessionEnrollmentRepository.findByFeedbackToken(feedbackRequestModel.getAccessToken()).orElseThrow(() -> new DomainException("Invalid feedback token"));

        sessionEnrollment.addFeedback(feedbackRequestModel.getComment(), feedbackRequestModel.getRating());

        sessionEnrollmentRepository.save(sessionEnrollment);
    }
}
```

## Le problème
Nous avons deux agrégats (`SessionEnrollment` et `Feedback`), mais on continue à traiter `Feedback` comme un enfant interne de `SessionEnrollment` (référence d'entité bidirectionnelle, cascade et invariants imposés par le parent). [Vernon](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_2.pdf?utm_source=chatgpt.com) recommande explicitement que les agrégats référencent d'autres agrégats uniquement par leur identifiant (id).

## Solution : Feedback dans son propre Agrégat
- Dans SessionEnrollment, supprimer la relation vers Feedback
- Dans Feedback, remplacer la relation par `Long sessionEnrollmentId;`
- Dans la couche Application Service, orchestrer la création d'un feedback

### Feedback Entity
```java
@Entity
public class Feedback {
  @Id private UUID id;
  private UUID sessionEnrollmentId;
  private int rating;
  private String comment;

  public static Feedback create(UUID enrollmentId, String comment, int rating) { ... }
}

```

### Application Service Layer
```java
@Service
public class FeedbackService {

    @Transactional
    public void giveFeedback(FeedbackRequestModel req) {
        var enr = enrollmentRepo.findByFeedbackToken(req.getAccessToken())
                    .orElseThrow(...);

        boolean sessionCompleted = sessionService.isCompleted(enr.getSessionId());
        if(!sessionCompleted) {
            throw new BusinessException(...)
        }

        var fb = enr.createFeedback(req.getComment(), req.getRating(), sessionCompleted);
        feedbackRepo.save(fb); // separate repo
    }
}
```

## Pourquoi avons-nous ce problème ?
> [!ressource] Ressource
> - https://matthiasnoback.nl/2022/04/ddd-entities-and-orm-entities/
> - [Modeling Aggregates with DDD and Entity Framework](https://web.archive.org/web/20150320062723/https://vaughnvernon.co/?p=879)

On essaie de mixer les bonnes pratiques JPA et DDD :
- Avec JPA, on tend à avoir une relation bidirectionnelle entre nos entités
- Tandis que le DDD nous dit de référencer une entité d'un agrégat extérieur uniquement par son id.

Une première solution consisterait à séparer le Domain Model du Persistence Model (architecture hexagonale stricte). Mais cela implique la création d'adaptateur et beaucoup de code boilerplate (https://stackoverflow.com/questions/31400432/ddd-domain-entities-vo-and-jpa)

Une seconde solution est d'utiliser `@JoinColumn`

```java
@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Store the ID directly
    @Column(name = "session_enrollment_id")
    private Long sessionEnrollmentId;
    
    // Optional: Keep JPA relationship for queries but don't use in domain logic
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_enrollment_id", insertable = false, updatable = false)
    private SessionEnrollment sessionEnrollment;
}
```