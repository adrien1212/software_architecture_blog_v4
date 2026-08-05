+++
title = "Open/Close Principle"
weight = 2
+++

> Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification

L'ensemble des principes SOLID sont des bonnes pratiques à garder en tête lorsqu'on développe. Avec le OCP on ne vous dit pas qu'il est interdit de modifier une classe mais plutôt lors de la phase de conception pensée au futur et s'arrurer qu'on va pouvoir facilement étendre cette entité.

L'OCP signifie que nous devons nous efforcer d'écrire un code qui ne doit pas être modifié à chaque fois que les exigences changent.

## Exemple

### Problème

Nous avons une classe `Rectangle` composée de la longueur et de la largeur

```java
public class Rectangle
{
    private double longueur; // + getter et setter
    private double largeur; // + getter et setter
}
```

Et nous souhaitons calculer les aires d'une collection de rectangle. Pour ce faire nous introduisons une nouvelle classe `AireCalculateur`

```java
public class AireCalculateur
{
    public double aire(List<Rectangle> formes)
    {
        double aire = 0;
        foreach (Rectangle forme : formes)
        {
            area += forme.getLongueur() * forme.getLargeur();
        }
        return area;
    }
}
```

Cette solution semble satisfaisante pour le moment. Néanmoins quelques jours plus tard la règle métier change. Nous souhaitons pouvoir calculer les aires d'un rectangle et d'un cercle.
Pour ce faire, nous modifions notre code pour accepter une _liste d'objet_ et suivant son type appliquer la bonne formule.

```java
public class AireCalculateur
{
    public double aire(List<Object> formes)
    {
        double aire = 0;
        foreach (Object forme : formes)
        {
            if (shape instanceof Rectangle)
            {
                Rectangle rectangle = (Rectangle) forme;
                area += forme.getLongueur() * forme.getLargeur();
            }
            else
            {
                Cercle cercle = (Cercle) forme;
                area += cercle.getRayon() * cercle.getRayon() * Math.PI;
            }
        }
        return area;
    }
}
```

La solution fonctionne mais qu'en sera-t-il lorsque les règles vont changer pour ajouter une nouvelle forme ? La classe `AireCalculateur` n'est pas fermé à la modification, car nous devons la modifier pour l'étendre. En d'autres termes, elle n'est pas ouvert à l'extension.

### Solution

Une façon de résoudre ce problème serait de créer une classe de base pour les rectangles et les cercles, etc ..., qui définit une méthode abstraite de calcul de la surface.

{{< tabs title="" >}}
{{% tab title="Interface" %}}

```java
public interface Forme
{
    public double aire();
}
```

{{% /tab %}}
{{% tab title="Rectangle" %}}

```java
public class Rectangle implements Forme
{
    private double longueur; // + getter et setter
    private double largeur; // + getter et setter

    public double aire() {
        return this.longueur * this.largeur;
    }
}
```

{{% /tab %}}
{{% tab title="Cercle" %}}

```java
public class Cercle implements Forme
{
    private double rayon; // + getter et setter

    public double aire() {
        return this.rayon * this.rayon * Math.PI;
    }
}
```

{{% /tab %}}
{{< /tabs >}}

La classe `AireCalculateur` peut maintenant gérer n'importe quel type de forme car le calcul de l'aire est délégué à l'instance de la forme

```java
public class AireCalculateur
{
    public double aire(List<Forme> formes)
    {
        double aire = 0;
        foreach (Formes forme : formes)
        {
            area += forme.getAire();
        }
        return area;
    }
}
```

- La classe `AireCalculateur` est maintenant fermée à la modification : quelque soit la nouvelle forme ajoutée nous n'avons pas besoin de la modifier. ``
- Et `AireCalculateur` devient ouverte à l'extension : nous pouvons facilement ajouter une nouvelle forme.
