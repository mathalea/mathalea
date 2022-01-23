# Outils utilisant Mathjs

Ces outils ont pour objectif d'utiliser la puissance de [Mathjs](https://mathjs.org/) pour simplifier la réalisation d'exercices dans Mathalea.

## Sommaire

1. [Documentation utile](#section0)
2. [La fonction aleaVariables() de outilsMathjs](#section1)
3. [Convertir une expression numérique ou littérale en latex](#section2)
4. [Remplacer des variables par des valeurs](#section3)
5. [Transformer une expression littérale](#section4)
6. [RandomSeed](#section5)
7. [La fonction toTex() de outilsMathjs](#section6)
8. [La fonction calculer() de outilsMathjs](#section7)
8. [La fonction resoudre() de outilsMathjs](#section8)

## Documentation utile <a id="section0"></a>

- [La syntaxe de Mathjs](https://mathjs.org/docs/expressions/syntax.html)
- [Les fonctions](https://mathjs.org/docs/reference/functions.html)
- [Les fractions](https://mathjs.org/docs/datatypes/fractions.html)

## La fonction aleaVariables() <a id="section1"></a>

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

L'indication `false` indique que `a`, `b` et `c` seront choisis aléatoirement entre 1 et 9 (compris tous les deux).

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

Voici deux exemples qui montrent les problèmes liés aux conversions en `float` en Javascript :

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

Dans l'exemple précédent `c` est la somme de `a` qui est un `float` et de `fraction(b)` qui est une fraction Mathjs. Pourtant on obtient une fraction Mathjs en faisant la somme. Mathjs a implicitement convertit `c` en une fraction.

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

> *Remarque :* La fonction `fraction` permet de convertir un nombre décimal en une fraction avec parfois une approximation quand c'est possible.
Pour éviter les erreurs il faut préférer le calcul de `b` au calcul de `c` dans l'exemple précédent. En effet, le calcul de `0.1+0.2` est erroné mais compensé par l'application de `fraction()`. Il faut s'attendre à ce que certaines valeurs ne soient pas simplement convertibles en une fraction et donc renvoient une erreur.

Nous atteignons les limites de cette fonction avec les nombres irrationnels comme dans l'exemple suivant.

```Javascript
> aleaVariables(
        {
            a: 'cos(pi/3)',
            b: Math.cos(Math.PI/3)
        }
    )
< ► {a: 0.5000000000000001, b: 0.5000000000000001}
```

Dans ce dernier exemple, on constate que Mathjs ne fait pas mieux que Javascript. On pourra dans ce cas obtenir de meilleur résultat avec une bibliothèque de calculs formels comme `Algebrite`.

```Javascript
> aleaVariables(
        {
            a: 'cos(pi/3)',
            b: Math.cos(Math.PI/3),
            c: Algebrite.run('cos(pi/3)'),
            test: 'a==c'
        }
    )
< ► {a: 0.5000000000000001, b: 0.5000000000000001, c: 0.5}
```

> *Remarque :* Le `test` effectué dans aleaVariables n'est pas "gêné" par le fait que les nombres `a` et `c` ne sont pas égaux. Mathjs utilise pour les comparaisons une précision appelée `epsilon` et qui vaut `1e-12` par défaut.

Autre exemple qui montre que *Algebrite* fait mieux que *Mathjs* et permet d'éviter les erreurs de conversion binaire/décimal :

```Javascript
aleaVariables(
        {
            a: '(sqrt(2)/2)^2',
            b: (Math.sqrt(2)/2)**2,
            c: Algebrite.run('(sqrt(2)/2)^2')
        }
    )
< ► {a: 0.5000000000000001, b: 0.5000000000000001, c: 0.5}
```

## Convertir une expression numérique ou littérale en latex <a id="section2"></a>

L'objectif est de transformer `'a*x+e/c'` en latex.
Cela se passe en deux étapes :

1. On commence par tranformer une expression en un arbre grâce à la fonction `math.parse()`
2. On utilise la méthode `toTex()` pour convertir l'arbre en une expression latex

```Javascript
>   node = math.parse('a*x+e/c')
< {
    "mathjs": "OperatorNode",
    "op": "+",
    "fn": "add",
    "args": [
        {
            "mathjs": "OperatorNode",
            "op": "*",
            "fn": "multiply",
            "args": [
                {
                    "mathjs": "SymbolNode",
                    "name": "a"
                },
                {
                    "mathjs": "SymbolNode",
                    "name": "x"
                }
            ],
            "implicit": false,
            "isPercentage": false
        },
        {
            "mathjs": "OperatorNode",
            "op": "/",
            "fn": "divide",
            "args": [
                {
                    "mathjs": "SymbolNode",
                    "name": "e"
                },
                {
                    "mathjs": "SymbolNode",
                    "name": "c"
                }
            ],
            "implicit": false,
            "isPercentage": false
        }
    ],
    "implicit": false,
    "isPercentage": false
}
>   node.toTex()
< ' a\\cdot x+\\frac{ e}{ c}'
```

Plusieurs observations :

- les divisions ont été automatiquement converties en écriture fractionnaire
- le signe de la multiplication est `\cdots` comme pour les anglo-saxons.
- la commande pour l'affichage en fraction est `\frac` par défaut

Il faut donc un post-traitement pour modifier les `\cdots` notamment

> **Remarque :** Il serait peut-être intéressant d'étudier la possibilité de convertir tous les `\cdots` nativement dans mathjs.

## Remplacer des variables par des valeurs <a id="section3"></a>

Nous pouvons passer des valeurs à Mathjs pour certaines variables.

Nous allons utiliser pour cela `math.simplify()` à la place de `math.parse()`.

```Javascript
>   node = math.simplify('a*x+e/c', {a: 3, e:2, c:5}, )
    node.toString()
< '3 * x + 2 / 5'
```

La méthode `toString()` permet d'avoir un meilleur aperçu de l'expression obtenue.

Voici un autre exemple qui montre que la fonction math.simplify() porte bien son nom :

```Javascript
>   node = math.simplify('a*x+c*x+e*x^2', {a: 3, e:2, c:5}, )
    node.toString()
< '8 * x + 2 * x ^ 2'
```

La fonction math.simplify() comporte un certains nombres de règles de transformation et l'on peut voir qu'une réduction a été opérée.

Si nous ne souhaitons aucune transformations nous pouvons supprimer ces règles en plaçant en paramètre `{l: 'n', r: 'n'}`.

Une autre méthode consiste à vider les règles placées dans math.simplify.rules et qui est un tableau comportant 29 règles :

```Javascript
> math.simplify.rules
    0: ƒ e(m)
    1: {l: 'log(e)', r: '1'}
    2: {l: 'n-n1', r: 'n+-n1'}
    3: {l: '-(c*v)', r: '(-c) * v'}
    4: {l: '-v', r: '(-1) * v'}
    5: {l: 'n/n1^n2', r: 'n*n1^-n2'}
    6: {l: 'n/n1', r: 'n*n1^-1'}
    7: {l: '(n ^ n1) ^ n2', r: 'n ^ (n1 * n2)'}
    8: {l: 'n*n', r: 'n^2'}
    9: {l: 'n * n^n1', r: 'n^(n1+1)'}
    10: {l: 'n^n1 * n^n2', r: 'n^(n1+n2)'}
    11: {l: 'n+n', r: '2*n'}
    12: {l: 'n+-n', r: '0'}
    13: {l: 'n1*n2 + n2', r: '(n1+1)*n2'}
    14: {l: 'n1*n3 + n2*n3', r: '(n1+n2)*n3'}
    15: {l: 'n1 + -1 * (n2 + n3)', r: 'n1 + -1 * n2 + -1 * n3'}
    16: ƒ (e,t)
    17: {l: '(-n)*n1', r: '-(n*n1)'}
    18: {l: 'c+v', r: 'v+c', context: {…}}
    19: {l: 'v*c', r: 'c*v', context: {…}}
    20: {l: 'n+-n1', r: 'n-n1'}
    21: {l: 'n*(n1^-1)', r: 'n/n1'}
    22: {l: 'n*n1^-n2', r: 'n/n1^n2'}
    23: {l: 'n1^-1', r: '1/n1'}
    24: {l: 'n*(n1/n2)', r: '(n*n1)/n2'}
    25: {l: 'n-(n1+n2)', r: 'n-n1-n2'}
    26: {l: '1*n', r: 'n'}
    27: {l: 'n1/(n2/n3)', r: '(n1*n3)/n2'}
    28: {l: 'n1/(-n2)', r: '-n1/n2'}
```

`n` est un noeud, `v` une variable et `c` une constante.
On peut ajouter autant de règles que l'on souhaite.
Elles sont récursivement appliquées jusqu'à ce qu'elles soient satisfaites.

```Javascript
>   node = math.simplify('a*x+c*x+e*x^2', [], {a: 3, e:2, c:5})
    node.toString()
< '3 * x + 5 * x + 2 * x ^ 2'
```

On peut donc utiliser quelques règles de bases pour faire disparaitre certaines écritures.

```Javascript
>   rules = [
        {l: '1*n', r: 'n'},
        {l: '-1*n', r: '-n'},
        {l: 'n1+-n2', r:'n1-n2'}
]
    expr = 'a*x+c*x+e*x^2'
    node1 = math.simplify(expr, {a: 1, e:-1, c:3})
    node2 = math.simplify(expr, rules, {a: 1, e:-1, c:3})
    console.log('node1 : ', node1.toString())
    console.log('node2 : ', node2.toString())
<   'node1 :  1 * x + 3 * x + -1 * x ^ 2'
    'node2 :  x - x ^ 2 + 3 * x'
```

On constate par contre que nos règles donnent des choses imprévues comme la changement de place de certains termes.

> **Conclusion :** Cette méthode a donc ses limites. La méthode `transform()` permet de contrôler plus précisément la transformation des écritures littérales.

## Transformer une expression littérale <a id="section4"></a>

Nous avons vu les limites de `math.simplify()`. Voici une autre manière de transformer nos écritures.

```Javascript
>   node = math.simplify('a*x+c*x+e*x^2', [], {a: 1, e:-1, c:3})
    node = node.transform( // Cette fonction parcourt de manière récursive tous les noeuds
        function (node, path, parent) {
            switch (node.type) {
                case 'OperatorNode': // On ne s'intéresse qu'aux noeuds de type Operateur
                    switch (node.op) {
                        case '+': // En cas d'addition
                            if (node.args[1].toString()[0] === '-') { // Le plus est suivi d'un -
                                node.op = '-' // les + deviennent -
                                node.fn = 'subtract'
                                node.args[1] = math.parse(node.args[1].toString().replace('-', '')) // On supprime le -
                            }
                            break
                        case '*': // En cas de multiplications
                            if (node.isOperatorNode && node.op === '*') {
                                if (node.args[0].toString() === '1') { // Pour corriger 1*n en n
                                    node = node.args[1]
                                } else if (node.args[0].toString() === '-1') { // Pour convertir -1*n en -n
                                    node = parse('-' + node.args[1].toString())
                                }
                            }
                            break
                    }
                break
            }
            return node // On retourne le noeud transformé
        }
    )
    node.toString()
< 'x + 3 * x - x ^ 2'

```

On a ainsi résolu le problème de déplacement des termes qu'il y avait avec les règles dans `math.simplify()`.

## RandomSeed <a id="section5"></a>

Pour pouvoir conserver la graine afin de debugger au mieux son programme, on passe la graine de mathalea à mathjs.

Il faut pour cela créer une instance de mathjs.

```Javascript
// Imports nécessaires
import {context} from '../../context.js'
import {create, all} from 'mathjs'

// Création d'une instance de mathjs
const math = create(all)
math.config({
  number: 'number',
  randomSeed: context.graine
})

// Début du programme
const result = math.random()
// Si context.graine = 'a' alors result = 0.43449421599986604 
```

## La fonction toTex() de outilsMathjs <a id="section6"></a>

L'objectif de cette fonction est de mettre en forme une expression mathématique (numérique ou littérale), une équation ou une inéquation décrite par une chaîne de caractères ascii. Cette chaîne est convertie au format mathjs avant traitement.
La sortie est une chaîne de caractères décrivant l'expression au format LaTex.

Elle repose sur des choix mais certains sont paramétrables :

- a/b deviendra $\dfrac{a}{b}$
- les divisions sont "applaties" : a/b*c/d qui donne $\dfrac{\dfrac{a}{b}\times c}{d}$ avec `'mathjs'`, donneront $\dfrac{a}{b}\times \dfrac{c}{d}$ avec `toTex()`.
- $\dfrac{-2}{3}$ est converti en $-\dfrac{2}{3}$
- les parenthèses inutiles sont supprimées
- les 1 ou -1 sont supprimés devant une parenthèse ou une lettre (paramétrable)
- les +0 ou +0*n sont supprimés (paramétrable)
- 5+(-6) est converti en 5-6 (paramétrable)

Voici un exemple d'utilisation et de paramétrage :

```Javascript
toTex('(4+(-6)*x)/(-8)=1*x+(-7)/3')
toTex('(4+(-6)*x)/(-8)=1*x+(-7)/3', { supprPlusMoins: false })
```
Le première ligne donnera : $\dfrac{4-6x}{-8}=x-\dfrac{7}{3}$

La seconde donnera : $\dfrac{4+(-6)x}{-8}=x-\dfrac{7}{3}$

## La fonction calculer() de outilsMathjs <a id="section7"></a>

Mathsteps est un outil reposant sur Mathjs et qui a pour objectif de donner les étapes d'un calcul.
Il possède une fonction appelée simplifyExpression() et qui détaille l'ensemble des étapes permettant de :

- calculer des sommes, différences, produits ou quotients de fractions
- simplifier des écritures littérales en les développant et en les réduisant

Il n'est plus développé par son auteur. Mathalea en héberge un fork et qui a été modifié pour notamment développer l'identité remarquable $(a+b)^2$.

Voici un exemple d'exercice :

```Javascript
exercice = calculer('(5*x-3)^2', { name: 'A' })
exercice.texte = `Développer puis réduire l'expression suivante : $${exercice.name}=${exercice.printExpression}$`
exercice.texteCorr = this.correctionDetaillee ? exercice.texteCorr : `$${exercice.name}=${exercice.printResult}$`
```

Et voici le résultat obtenu :
![](../static/img/outilsMathjs-betaEquations107.png)

Toutes les étapes du calcul sont visibles dans un ordre prédéfini par Mathsteps. Chaque ligne correspond à une étape et une seule ce qui peut ammener à de nombreuses lignes.

Certaines étapes sont masquées dans des sous-étapes :

```Javascript
exercice = calculer('2/9*(4/3+7/8)')
exercice.texte = `Calculer : $${exercice.printExpression}$`
exercice.texteCorr = this.correctionDetaillee ? exercice.texteCorr : `$${exercice.printExpression}=${exercice.printResult}$`
```

![](../static/img/outilsMathjs-betaEquations109.png)

Le paramètre `substeps` permet ici de contrôler l'affichage des sous-étapes.
L'exemple précédent ne montrait pas l'étape de mise au même dénominateur 

```Javascript
exercice = calculer('2/9*(4/3+7/8)', { substeps: true })
```

![](../static/img/outilsMathjs-betaEquations109bis.png)

## La fonction resoudre() de outilsMathjs <a id="section8"></a>

Cette fonction donne les étapes de résolution d'une équation du premier degré en utilisant Mathsteps.

```Javascript
exercice = resoudre('3*x+2=9*x-3')
exercice.texte = `Résoudre l'équation $${exercice.equation}$ en détaillant les étapes.`
exercice.texteCorr += `<br>La solution de cette équation est donc $${exercice.solution}$.`
```
![](../static/img/outilsMathjs-betaEquations110.png)

On peut retirer la coloration en ajoutant le paramètre `{ color: false }` (qui bug parfois) ou ajouter des commentaires.

On peut également modifier les commentaires.

```Javascript
const commentairesPersonnalises = {
    CANCEL_MINUSES: 'Simplifier l\'écriture',
    SUBTRACT_FROM_BOTH_SIDES: 'Enlever {stepChange} à chaque membre.',
    SIMPLIFY_ARITHMETIC: ''
}
exercice = resoudre('3*x+2=9*x-3', { comment: true, comments: commentairesPersonnalises })
```

![](../static/img/outilsMathjs-betaEquations110bis.png)

Les commentaires par défaut sont les suivants :

```Javascript
const defaultComments = {
    MULTIPLY_BOTH_SIDES_BY_NEGATIVE_ONE: 'Multiplier les deux membres par $-1$.',
    SUBTRACT_FROM_BOTH_SIDES: `Soustraire $${stepChange}$ à chaque membre.`,
    ADD_TO_BOTH_SIDES: `Ajouter $${stepChange}$ à chaque membre`,
    MULTIPLY_TO_BOTH_SIDES: `Multiplier chaque membre par $${stepChange}$.`,
    DIVIDE_FROM_BOTH_SIDES: `Diviser chaque membre par $${stepChange}$.`,
    MULTIPLY_BOTH_SIDES_BY_INVERSE_FRACTION: `Multiplier chaque membre par $${stepChange}$.`,
    SWAP_SIDES: 'Echanger les deux membres.',
    STATEMENT_IS_FALSE: 'L\'égalité est fausse.',
    STATEMENT_IS_TRUE: 'L\'égalité est vraie.',
    DISTRIBUTE: 'Distribution.',
    SIMPLIFY_RIGHT_SIDE: 'Simplifier le membre de droite.',
    SIMPLIFY_LEFT_SIDE: 'Simplifier le membre de gauche.',
    COLLECT_AND_COMBINE_LIKE_TERMS: 'Regrouper et réduire les termes de même nature.',
    SIMPLIFY_ARITHMETIC: 'Calcul arithmétique.',
    SIMPLIFY_FRACTION: 'Simplifier une fraction.',
    REMOVE_MULTIPLYING_BY_NEGATIVE_ONE: 'Calculer la multiplication par $-1$.',
    REMOVE_ADDING_ZERO: 'Enlever des zéros.',
    CANCEL_MINUSES: 'Annuler les signes moins.',
    FIND_ROOTS: 'Trouver la (ou les) solution(s).',
    SIMPLIFY_SIGNS: 'Simplifier le signe.',
    MULTIPLY_BY_ZERO: 'Multiplication par zéro.',
    ADD_FRACTIONS: 'Additionner des fractions.',
    BREAK_UP_FRACTION: 'Séparer une fraction.',
    CANCEL_TERMS: 'Annuler les termes.',
    REMOVE_MULTIPLYING_BY_ONE: 'Retirer la multiplication par $1$.'
  }
```

L'exemple suivant montre les étapes de résolution d'une inéquation :

```Javascript
exercice = resoudre('3*x+2<9*x-3')
```

![](../static/img/outilsMathjs-betaEquations111.png)