# Outils utilisant Mathjs

Ces outils ont pour objectif d'utiliser la puissance de mathjs pour simplifier la réalisation d'exercices dans Mathalea.

## La fonction aleaVariables()

### Un premier exemple basique : l'inégalité triangulaire

Imaginons que nous voulions obtenir trois longueurs d'un triangle au hasard. Il faut vérifier l'inégalité triangulaire pour le plus grand côté.

```Javascript
>   aleaVariables(
        {
            a: false,
            b: false,
            c: false,
            test : 'a+b>c and a+c>b and b+c>a'
        }
    )
< ► {a: 3, b: 8, c: 7}
```

L'indication `false` indique que a,b et c seront choisis aléatoirement entre 1 et 9 (compris tous les deux).

Voici un autre exemple donnant le même résultat mais avec un autre algorithme :

```Javascript
>   aleaVariables(
        {
            a: false,
            b: false,
            c: false,
            test : 'max([a,b,c])<min([a+b,a+c,b+c])'
        }
    )
< ► {a: 5, b: 3, c: 4}
```

Et si nous souhaitons des nombres plus grands il y a la fonction randomInt()

```Javascript
>   aleaVariables(
        {
            a: 'randomInt(1,100)',
            b: 'randomInt(1,100)',
            c: 'randomInt(1,100)',
            test : 'max([a,b,c])<min([a+b,a+c,b+c])'
        }
    )
< ► {a: 44, b: 54, c: 36}
```

Pour des nombres décimaux compris entre 0 et 10 et avec au maximum deux chiffres significatifs.

```Javascript
>   aleaVariables(
        {
            a: 'round(random(0.1,10),1)',
            b: 'round(random(0.1,10),1)',
            c: 'round(random(0.1,10),1)',
            test : 'max([a,b,c])<min([a+b,a+c,b+c])'
        }
    )
< ► {a: 1.9, b: 6, c: 4.9}
```

### Un deuxième exemple basique : a+b-c

On souhaite obtenir deux entiers relatifs dont la somme est toujours positif.

```Javascript
>   aleaVariables(
        {
            a: true,
            b: true,
            test : 'a+b>0'
        }
    )
< ► {a: -1, b: 8}
```

`true` est un paramètre pour indiquer que les nombres sont des entiers *non nuls* compris entre -9 et 9 (tous les deux compris).

Pour des nombres plus grands :

```Javascript

>   aleaVariables(
        {
            a: 'pickRandom([-1,1])*randomInt(1,100)',
            b: 'pickRandom([-1,1])*randomInt(1,100)',
            test : 'a+b>0'
        }
    )
< ► {a: -57, b: 59}
```

Les fonctions pickRandom() et randomInt sont des fonctions Mathjs (voir la documentation).

Et pour les nombres décimaux :

```Javascript

>   aleaVariables(
        {
            a: 'pickRandom([-1,1])*round(random(0.1,10),1)',
            b: 'pickRandom([-1,1])*round(random(0.1,10),1)',
            test : 'a+b>0'
        }
    )
< ► {a: 9, b: -3.6}
```

### Gérer les conversions en nombres décimaux

Voici deu exemples qui montrent les problèmes liés aux conversions en `float` en Javascript :

```Javascript

>   0.1+0.2
<   0.30000000000000004
>   0.3/0.2
<   1.4999999999999998
```

Imaginons que nous souhaitions afficher la somme de deux nombres décimaux pris au hasrad compris entre 0 et 1 à un seul chiffre significatif.
Voici une utilisation possible :

```Javascript

>   aleaVariables(
        {
            a: 'round(random(0,1),1)',
            b: 'round(random(0,1),1)',
            c: 'a+b'
        }
    )
< ► {a: 0.8, b: 0.9, c: 1.7000000000000002}
```

Pour contourner ce problème nous pouvons utiliser plusieurs fonctionnalités de mathjs. Mathjs utilise trois formats de nombres : `number`, `Fraction` et `BigNumber` (voir documentation).

L'avantage du format Fraction est que nous pouvons demander des calculs exacts si nous convertissons tous les nombres en Fractions.
Ce qui donne :

```Javascript

>   aleaVariables(
        {
            a: 'round(random(0,1),1)',
            b: 'round(random(0,1),1)',
            c: 'fraction(a)+fraction(b)'
        }
    )
< ► {a: 0.6, b: 0.1, c: Fraction}
```

On constate que le nombre `c` est maintenant un objet de type Fraction.

```Javascript
< ► {a: 0.6, b: 0.1, c: Fraction}
        a: 0.6
        b: 0.1
        c: Fraction {s: 1, n: 7, d: 10}
        [[Prototype]]: Object
```

- `s` est le signe (1 ou -1)
- `n` est le numérateur
- `d` est le dénominateur

Le nombre `c` est donc la fraction 7/10.

Pour obtenir sa valeur décimale il suffit d'utiliser les méthodes de l'objet fraction de mathjs :

```Javascript
> aleaVariables(
        {
            a: 'round(random(0,1),1)',
            b: 'round(random(0,1),1)',
            c: 'fraction(a)+fraction(b)',
            d: 'c.valueOf()',
            e: 'a+b'
        }
    )
< ► {a: 0.8, b: 0.9, c: Fraction, d: 1.7, e: 1.7000000000000002}
```

À noter que Mathjs convertis apparemment à la volée les nombres en fractions s'ils doivent être opérés avec des fractions.

```Javascript
> aleaVariables(
        {
            a: 'round(random(0,1),1)',
            b: 'round(random(0,1),1)',
            c: 'a+fraction(b)',
            d: 'c.valueOf()',
            e: 'a+b'
        }
    )
< ► {a: 0.4, b: 0.8, c: Fraction, d: 1.2, e: 1.2000000000000002}
```

La méthode `valueOf()` permet d'obtenir la valeur en `float` de `c`.

`c` est la somme de a qui est un `float` et de `fraction(b)` qui est une fraction Mathjs. Pourtant on obtient une fraction Mathjs en faisant la somme !

```Javascript
> aleaVariables(
        {
            a: '0.1+0.2',
            b: '(fraction(0.1)+fraction(0.2)).valueOf()',
            c: 'fraction(0.1+0.2).valueOf()'
        }
    )
< ► {a: 0.30000000000000004, b: 0.3, c: 0.3}
```

Il y aurait des tests à faire mais utiliser la fonction `fraction` seulement pour le résultat ne donne pas nécessairement la valeur exacte comme dans l'exemple `c`.
