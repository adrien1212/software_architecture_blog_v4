+++
title = "La bonne taille part 2"
weight = 21
draft = true
+++

> [!ressource] Ressources
> - [Effective Aggregate Design Part II: Making Aggregates Work Together](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_2.pdf)
> - [Effective Aggregate Design Part III: Gaining Insight Through Discovery](https://www.dddcommunity.org/wp-content/uploads/files/pdf_articles/Vernon_2011_3.pdf)

Un agrégat n'est pas un regroupement d'objets qui « vont ensemble ». C'est une **frontière de cohérence transactionnelle** : l'ensemble minimal d'objets qui doivent être justes **au même instant**.

Toute la difficulté tient dans ce mot : *minimal*. Cet article applique la démarche à un cas concret, une règle à la fois.

> [!note] Le point de départ
> La règle empirique de Vernon est *Design Small Aggregates*. On ne part donc jamais d'un gros agrégat qu'on découpe : on part du plus petit possible, et **chaque regroupement doit être payé** par un invariant démontré. La charge de la preuve pèse sur celui qui veut fusionner.

## Les trois questions

Pour chaque règle énoncée par le métier, dans cet ordre :

| | Question | Ce qu'elle décide |
| --- | --- | --- |
| **Q1** | Qu'observe-t-on si la règle est fausse pendant une seconde ? | Est-ce un invariant, ou une simple règle métier ? |
| **Q2** | Que faut-il avoir chargé pour la vérifier ? | L'ensemble minimal d'objets à réunir |
| **Q3** | Cet ensemble est-il borné ? | La frontière est-elle tenable dans le temps ? |

La frontière recherchée est **la plus petite réunion d'objets qui satisfait Q2**, pour les seules règles qui passent Q1, sous réserve de Q3.

Une règle qui échoue à Q1 ne contraint pas la frontière — quelle que soit son importance. Un échec à Q3 ne signifie pas qu'il faut découper : il signifie qu'on n'a pas encore posé Q2 assez précisément.

---

## Le scénario

Un catalogue e-commerce expose la création d'un article :

```http
POST /articles
{ "title": "Produit XYZ", "unit": 5, "price": 10 }
```

Trois règles sont énoncées par les experts métier :

1. Un `Article` possède au moins un `Package` (un conditionnement).
2. Deux `Package` d'un même article ne peuvent pas avoir la même unité.
3. Chaque `Package` porte un historique de prix, sous forme de `PricePeriod`.

Volumétrie observée : environ **10 packages par article**, stable ; un historique qui dépasse la **centaine de périodes par package** après quelques années, **sans plafond**.

---

# Règle 1 — « au moins un package »

## Q1 — Qu'observe-t-on pendant une seconde ?

C'est la seule question qui sépare un invariant d'une règle qui tolère un délai. Elle ne se pose pas au métier sous la forme *« la règle est-elle importante ? »* — la réponse sera toujours oui — mais :

> Qu'observe-t-on concrètement si un article existe une seconde sans conditionnement ?

Deux réponses sont possibles, et elles ne conduisent pas au même modèle :

> **(a)** Un article sans conditionnement n'existe pas. Nos exports, la recherche et l'ERP supposent tous qu'il en a un, et échouent sinon.

> **(b)** Un article sans conditionnement n'est pas vendable, c'est tout. Un gestionnaire crée d'ailleurs souvent la fiche, puis la complète plus tard dans la semaine.

Le métier répond **(b)**.

Ce n'est donc **pas un invariant**, mais une **règle de complétude** : elle qualifie un état (vendable / non vendable) sans interdire l'état inverse. Une règle dont personne ne sait nommer la conséquence observable n'est pas un invariant.

> [!note] « Whose job is it? »
> La même question, posée autrement par Vernon : ce travail est-il celui de l'utilisateur qui exécute la commande, ou celui d'un autre acteur ? Ici, la fiche et son conditionnement sont deux gestes distincts, parfois à plusieurs jours d'écart. La réponse converge : cohérence à terme.

## Q2 et Q3 — sans objet

Une règle qui échoue à Q1 n'impose aucun regroupement. On s'arrête là.

**À ce stade, `Package` reste dehors.** La complétude n'est pas garantie par le modèle, elle est *calculée* :

```java
// Modèle de lecture, pas modèle de domaine.
boolean sellable = packageRepository.countByArticle(articleId) > 0;
```

Le prix de ce choix est explicite : il existe une fenêtre pendant laquelle un article n'a pas de conditionnement, et la suppression du dernier ne peut pas être refusée de façon atomique.

---

# Règle 2 — « deux packages ne partagent pas la même unité »

## Q1 — Qu'observe-t-on pendant une seconde ?

> Deux conditionnements de 5 unités sur le même article, c'est une ligne de commande ambiguë : on ne sait pas lequel le client a acheté, ni lequel le préparateur doit sortir. Le problème n'est pas qu'il faille corriger — c'est qu'entre-temps on aura expédié n'importe quoi.

La violation est **immédiatement lisible et immédiatement exploitée**. Aucun délai n'est acceptable : c'est un invariant.

## Q2 — Que faut-il pour la vérifier ?

**Tous les packages de l'article.** Contrairement à la règle 1, qui portait sur un cardinal, celle-ci porte sur une **relation entre les membres de la collection** : on ne peut pas décider de l'unité `10` sans connaître les autres.

C'est ce que Q2 produit toujours : un ensemble d'objets, pas un choix technique.

## Q3 — Cet ensemble est-il borné ?

Environ 10 packages par article, stable dans le temps, borné par une réalité métier — un article n'a pas cinquante conditionnements. **Oui.**

## La frontière s'élargit

Les trois questions convergent : `Package` rejoint `Article`.

```
ARTICLE (racine d'agrégat)
├── Package  unit=5
├── Package  unit=10
└── Package  unit=20        (~10, borné)

Invariant : unités uniques
```

```java
public void addPackage(PackageId packageId, Unit unit) {
    if (hasUnit(unit)) {
        throw new DuplicateUnitException(id, unit);
    }
    packages.add(new Package(packageId, unit));
}
```

C'est le point central de la démarche : **l'invariant métier a contraint la structure technique, et non l'inverse.** La frontière n'a pas été élargie par confort, mais parce qu'une règle l'exigeait — et elle ne l'a été que d'exactement ce que Q2 réclamait.

> [!note] On aurait pu ne pas fusionner
> Un invariant impose qu'il existe **une garantie atomique**. L'agrégat en est une ; une contrainte `UNIQUE (article_id, unit)` en est une autre, et elle aurait laissé `Package` autonome.
>
> Ce n'est pas absurde, mais on paie trois choses : la règle disparaît du modèle et des tests de domaine, l'erreur remonte sous forme de violation SQL à retraduire, et surtout la règle devient difficile à enrichir — une contrainte `UNIQUE` ne saura jamais dire « au plus cinq conditionnements » ou « l'unité doit être un multiple de la plus petite ».
>
> Le critère de décision est Q3. Collection petite et bornée, avec d'autres règles d'ensemble en réserve → la règle reste dans le modèle. Collection grande ou non bornée → la contrainte SGBD redevient le bon choix, parce que le regroupement ne serait alors plus tenable.

# Règle 3 — l'historique de prix

## Q1 — l'invariant n'est pas énoncé

La règle 3 se présente comme de la donnée volumineuse, apparemment sans règle. Les invariants qu'elle porte ne sont presque jamais énoncés spontanément : ils paraissent trop évidents pour être dits. Ils apparaissent quand on demande *que se passe-t-il si deux périodes se recouvrent ? et s'il en manque une ?*

```
valide          01/01 ─── 10 € ───┤01/06 ─── 12 € ───┤01/09 ─── 11 € ───▶

chevauchement   01/01 ─── 10 € ──────────────┤01/07
                          01/06 ─── 12 € ──────────────▶   deux prix au 15/06

trou            01/01 ─── 10 € ───┤30/06         01/08 ─── 11 € ───▶
                                        aucun prix en juillet
```

Un chevauchement rend le prix **indéterminé**, un trou le rend **absent**. Les deux n'en font qu'une, du point de vue métier :

> **À toute date à partir de la première mise en prix, il existe un prix et un seul.**

Une vente est impossible ou ambiguë dès la première seconde de violation. **C'est un invariant.**

## Q2 — les périodes d'un seul package

Constat décisif : cet invariant s'évalue **package par package**. Les périodes du package `unit=5` se vérifient sans rien connaître de celles du package `unit=10`.

| Invariant | Objets à réunir |
| --- | --- |
| Unicité de l'unité (règle 2) | Tous les packages d'un article |
| Un prix et un seul (règle 3) | Les périodes d'**un seul** package |

Les deux ensembles sont **disjoints**. Aucun invariant ne relie un prix à l'article : les réunir sous une racine unique ferait payer à chaque changement de prix le chargement et le verrouillage de tout le catalogue de l'article, sans aucune contrepartie. Deux changements de prix sur des packages différents entreraient en conflit alors qu'ils ne partagent aucune règle.

> [!note] Le prix ne doit pas être dupliqué sur `Package`
> Le payload `POST /articles` porte un `price`. Il serait naturel d'en faire un champ de `Package` — « le prix courant » — et de ne garder dans l'historique que les prix passés.
>
> Ce serait recoller les deux ensembles : le prix courant devrait alors rester cohérent avec la période ouverte, ce qui recréerait un invariant entre `Article` et les périodes. **Le prix courant se lit dans la période ouverte ; il ne se stocke pas ailleurs.**

## Q3 — non borné

Le nombre de packages est stable ; l'historique de prix, lui, ne décroît jamais. **La volumétrie de départ décrit l'agrégat au premier jour, pas au bout de trois ans.**

C'est le coût le plus facile à manquer : un agrégat dont la taille est fonction du temps écoulé finit toujours par devenir le goulot d'étranglement.

Q3 est donc négatif. Deux réponses en découlent, et **la première est celle qu'on oublie**.

### Réponse 1 — reposer Q2 plus précisément

Q3 signale d'abord qu'on a énoncé l'invariant trop largement. On interroge donc le métier **une fois de plus** :

> Peut-on modifier le prix d'une période déjà écoulée ?

> Non. Une commande passée au tarif de mars reste facturée au tarif de mars ; une erreur se corrige par un avoir, pas par une réécriture de l'historique.

Cette réponse **borne l'invariant**. « À toute date un prix et un seul » ne contraint les écritures que sur la **période courante et les périodes à venir** — les seules qu'une écriture puisse encore rendre incohérentes. Les périodes closes ne participent plus à aucune vérification : elles sortent de la frontière transactionnelle.

```
     périodes closes                    │  période courante  │  futures
     (hors agrégat, lecture seule)      │◀───── frontière transactionnelle ─────▶
──── 10 € ───┤─── 12 € ───┤─── 11 € ────┤──── 13 € ────┤──── 14 € ────▶
                                      aujourd'hui
```

L'agrégat retombe à quelques objets, **indépendamment de l'ancienneté de l'article**. L'historique complet reste disponible, mais comme **modèle de lecture**, pas comme partie du modèle de domaine.

### Réponse 2 — séparer

Q2 ayant montré deux ensembles disjoints, les périodes de prix forment leur propre agrégat, `PriceSchedule`, identifié par le package qu'il concerne.

Les deux réponses sont **cumulatives et indépendantes** : la séparation supprime la contention entre le catalogue et les tarifs, le bornage temporel supprime la croissance. Aucune ne remplace l'autre.

---

# Le modèle obtenu

```
┌─────────────────────────────────────────┐
│  ARTICLE  (racine d'agrégat)            │
├─────────────────────────────────────────┤
│  ArticleId                              │
│  title                                  │
│  Package[]  (~10, borné)                │
│    ├── PackageId  (identité)            │
│    └── unit                             │
├─────────────────────────────────────────┤
│  Invariant  : unités uniques            │
│  Complétude : au moins un package       │
└─────────────────────────────────────────┘
                  ▲
                  │  PackageId — référence par identité
                  │
┌─────────────────────────────────────────┐
│  PRICE SCHEDULE  (racine d'agrégat)     │
├─────────────────────────────────────────┤
│  PackageId                              │
│  PricePeriod[]  (courante + futures)    │
│    ├── price                            │
│    ├── from                             │
│    └── to   (null = en cours)           │
├─────────────────────────────────────────┤
│  Invariant : à toute date couverte,     │
│              un prix et un seul         │
└─────────────────────────────────────────┘
```

Chaque agrégat correspond exactement à un ensemble d'invariants. La référence va de `PriceSchedule` vers `Package`, jamais l'inverse : **`Article` ignore l'existence des grilles tarifaires.**

## `PriceSchedule`

La liste est maintenue **ordonnée, contiguë, la dernière ouverte**. Cette forme élimine la classe d'opérations capables de créer un chevauchement ou un trou.

```java
public class PriceSchedule {

    private final PackageId packageId;
    private final List<PricePeriod> periods; // ordonnées, contiguës, la dernière ouverte

    public static PriceSchedule open(PackageId packageId, Price price, LocalDate from) {
        return new PriceSchedule(packageId,
                new ArrayList<>(List.of(PricePeriod.openFrom(price, from))));
    }

    /**
     * Seul moyen d'ajouter une période : clôturer la courante et en ouvrir une nouvelle.
     * `today` est un paramètre : le domaine ne lit pas d'horloge ambiante.
     */
    public void changePriceFrom(Price newPrice, LocalDate effectiveDate, LocalDate today) {
        if (effectiveDate.isBefore(today)) {
            throw new CannotRewritePastPriceException(packageId, effectiveDate, today);
        }
        PricePeriod last = last();
        if (!effectiveDate.isAfter(last.from())) {        // sinon : période vide ou inversée
            throw new PriceChangeTooEarlyException(packageId, effectiveDate, last.from());
        }
        periods.set(periods.size() - 1, last.endingOn(effectiveDate.minusDays(1)));
        periods.add(PricePeriod.openFrom(newPrice, effectiveDate));
    }

    private PricePeriod last() {
        return periods.get(periods.size() - 1);
    }
}
```

**Aucune méthode ne permet de retirer une période au milieu** : c'est précisément l'opération qui ouvrirait un trou. L'invariant de continuité n'est pas défendu par un test, il est rendu **inexprimable par l'API**.

**`effectiveDate.isBefore(today)` est refusé, `effectiveDate == today` est accepté.** La nuance est métier : appliquer un tarif dès aujourd'hui clôt la période courante *hier* et ne modifie aucune date écoulée. Surtout, cette garde est ce qui **fonde** le bornage temporel — sans elle, sortir les périodes closes de l'agrégat serait faux, puisqu'une écriture pourrait encore les concerner.

> [!warning] Un agrégat chargé sur une fenêtre doit le dire
> Le repository ne recharge que les périodes encore contraintes par l'invariant, et sa signature porte la date : `findById(packageId, today)`.
>
> Deux conséquences : l'agrégat **ne peut pas répondre à « quel était le prix en mars »** — c'est un modèle de lecture, pas une méthode du domaine ; et la persistance ne doit **jamais supprimer de ligne hors fenêtre**, sous peine d'effacer l'historique au premier `save`.

## Le prix payé

`PriceSchedule` est identifié par un `PackageId`, or `Package` n'est **pas** une racine. Un agrégat se retrouve indexé sur l'identité d'une entité interne d'un autre agrégat.

Ce n'est pas une violation de *Reference Other Aggregates By Identity* — aucune référence objet ne traverse la frontière. C'est un écart à la règle d'Evans selon laquelle **rien à l'extérieur ne détient de référence vers autre chose que la racine**, identité comprise : les entités internes n'ont qu'une identité *locale*.

L'écart est assumé, et payé par trois garanties :

- `PackageId` est une identité **opaque, générée et stable**. Ce n'est *pas* `(articleId, unit)` : `unit` est modifiable, et un package supprimé puis recréé avec la même unité hériterait silencieusement de l'ancienne grille ;
- `Article` ne recycle **jamais** un `PackageId` ;
- **aucun autre agrégat** ne détient cette identité.

C'est la sortie prévue, avec un déclencheur nommé : **le jour où la logistique raisonne en conditionnements, `Package` est déjà une racine dans le langage** — il faut alors le sortir d'`Article`, et la règle 2 repasse par la note « on aurait pu ne pas fusionner ».

---

# Ce qui reste entre les agrégats

Règle d'implémentation : **une transaction ne modifie qu'un seul agrégat**.

```java
@Transactional
public ArticleId createArticle(String title, Unit unit, Price price, LocalDate from) {
    ArticleId articleId = ArticleId.generate();
    PackageId packageId = PackageId.generate();

    Article article = Article.create(articleId, title);
    article.addPackage(packageId, unit);

    articleRepository.save(article);
    outbox.enqueue(new OpenPriceSchedule(packageId, price, from)); // même transaction
    return articleId;
}

@Transactional
public void changePrice(PackageId packageId, Price price, LocalDate effectiveDate) {
    LocalDate today = clock.today();
    PriceSchedule schedule = priceScheduleRepository.findById(packageId, today);

    schedule.changePriceFrom(price, effectiveDate, today);  // l'article n'est pas chargé

    priceScheduleRepository.save(schedule);
}
```

Trois règles restent hors des agrégats, chacune avec l'état transitoire qu'elle autorise :

| Règle | Mécanisme | État transitoire toléré |
| --- | --- | --- |
| Un article possède au moins un package | Calculée à la lecture | Article non vendable |
| Tout package possède une grille tarifaire | *Outbox*, seconde transaction, rejeu idempotent | Package sans prix, non vendable |
| Un package supprimé n'a plus de grille | Événement `PackageRemoved`, traité en asynchrone | Grille orpheline, jamais lue |

> [!warning] Attention
> Un agrégat n'est **jamais** « eventually consistent ». La cohérence à terme qualifie la relation *entre* agrégats, pas leur contenu. Chaque agrégat est transactionnellement cohérent en lui-même, à tout instant observable.

---

# Résumé

La frontière ne vient pas d'une préférence technique, mais de trois questions posées à chaque règle.

1. **Q1 sépare l'invariant de la règle.** « Au moins un package » était formulée comme absolue ; elle tolère un délai. Elle ne contraint donc pas la frontière, quelle que soit son importance.
2. **Q2 donne un ensemble d'objets, pas une décision technique.** L'unicité des unités exige *tous les packages d'un article* — c'est ce qui les fait entrer dans `Article`. L'invariant de prix n'exige que *les périodes d'un package* — c'est ce qui les en fait sortir.
3. **Q3 renvoie d'abord à Q2.** Un agrégat non borné signale un invariant énoncé trop largement, avant de signaler un découpage manquant. Ici, « un prix et un seul » ne concernait en réalité que le présent et le futur.
4. **Un invariant possible n'est pas un invariant.** Une fois les packages réunis, garantir la règle 1 devenait gratuit — ce n'est pas une raison de le faire.
5. **Ce qui reste dehors** est traité explicitement en cohérence à terme, avec l'état transitoire que chaque règle autorise.

La démarche est itérative dans les deux sens : chaque invariant découvert élargit la frontière, chaque invariant correctement délimité la resserre.
