---

MathAlea permet de rendre un exercice interactif. Directement sur l'interface Web, l'élève saisit une réponse (dans un champ, dans une liste déroulante, en cochant une case ou bien encore en cliquant sur une figure). Celle-ci est vérifiée automatiquement et le score de toutes les réponses à l'exercice peut éventuellement être récupéré par son professeur ([documentation de la gestion des scores](https://coopmaths.fr/mathalea.html?v=scores)).

---

 Les actions obligatoires à mener, pour permettre à un exercice d'être interactif, sont décrites ci-dessous et explicitées, plus bas, en détail.

1. [Charger le code nécessaire](#1)
1. [Configurer le `typeInteractivite` choisi](#2)
    1. [`mathlive`](#3)
        1. [Lignes de code spécifiques](#4)
        1. [Gestion des différentes types de réponse](#5)
        1. [Comprendre pourquoi une réponse correcte est pourtant considérée fausse](#6)
        1. [Dans les exercices de la Course Aux Nombres](#7)
        1. [Permettre deux champs de réponse sur une même question](#8)
    1. [`qcm`](#9)
    1. [`numerique`](#10)
    1. [`cliqueFigure`](#11)
    1. [`listeDeroulante`](#12)
    1. [`custom`](#13)

## <a id="1" href="#1"></a> 1. Charger le code nécessaire pour rendre un exercice interactif


Pour charger le code nécessaire pour rendre un exercice interactif, il faut ajouter ces deux lignes de code juste après les `import` de début d'exercice :
```js
export const interactifReady = true // pour définir qu'exercice peut s'afficher en mode interactif.
export const interactifType = 'typeInteractivite'
```

Même si le `typeInteractivite` le plus simple à utiliser pour rendre un exercice interactif est `'mathLive'`, on peut utiliser tous les choix décrits ci-dessous.

|Choix de `'typeInteractivite'`|Description de ce choix|Exercices-témoins|
|-----|-----|-----|
|`'mathLive'`|pour proposer un champ de réponses avec un clavier virtuel et vérification possible d'égalité formelle|4C10-4|
|`'qcm'`|pour proposer un qcm|5L10-2|
|`'numerique'`|pour proposer une réponse numérique|4G20-2|
|`'cliqueFigure'`|pour proposer des figures à cliquer|6G10-3|
|`'listeDeroulante'`|pour proposer une liste déroulante avec la réponse et différents autres choix possibles|6N43-4|
|`'custom'`|pour proposer une réponse originale, différente des précédentes, en appelant `this.correctionInteractive()` |4G20-2|

> **Remarque** : pour définir le mode dans lequel l'exercice va s'afficher par défaut (interactif ou pas), on initialisera le booléen `this.interactif = false` placé de la sorte :
> ```js
> Exercice.call(this)
> ..... // D'autres instructions
> this.interactif = false // true ou false
> ..... // D'autres instructions
> this.nouvelleVersion = function () {
> ```

## <a id="2" href="#2"></a> 2. Configurer le `typeInteractivite` choisi

Selon le `typeInteractivite` choisi, la programmation est différente. Les paragraphes suivant détaillent chacune des configurations.

>>## <a id="3" href="#3"></a> 2. 1. `mathLive`

Pour rendre un exercice interactif en utilisant MathLive, il faut rajouter 3 nouvelles lignes de code, gérer les types de réponses attendues.

>>>>## <a id="4" href="#4"></a> 2. 1. 1. Lignes de code spécifiques

1. Rajouter un import dans l'en-tête comme ceci :
>>```js
>>import { setReponse, ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'
>>export const interactifReady = true
>>export const interactifType = 'mathLive'
>>```
2. <a id="59" href="#59"></a>Initialiser la variable `setReponse` dans la boucle principale, pour chaque question. Par défaut, c'est de la sorte :
>>```js 
>>setReponse(this, i, resultat) 
>>```
Par défaut, `resultat` est une chaîne de caractère LaTeX (de type `'${x1}'`) ou une valeur numérique (donc sans formatage avec `texNombre` par exemple). On verra, [plus bas](#5), que `resultat` peut être plus divers que cela et les modifications à apporter alors.

3. Ajouter, pour chaque question, le champ de réponse avec le clavier virtuel après l'énoncé de la sorte :
>>```js 
>>texte += ajouteChampTexteMathLive(this, i)
>>```
`ajouteChampTexteMathLive` a le fonctionnement par défaut ci-dessus, mais possède les options suivantes :
>>```js 
>> // syntaxe de ajouteChampTexteMathLive() : ajouteChampTexteMathLive(this, i, 'style', {...options})
>>texte += ajouteChampTexteMathLive(this, i,'largeur 25') // 25 % de la largeur de la page est occupés par le champ de réponse
>>texte += ajouteChampTexteMathLive(this, i,'inline') // sans retour à la ligne 
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur 25') // mélange des deux options précédentes
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur 25',{ texte: 'avant' })) // écrit "avant" devant le champ de réponses
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur 25',{ texteApres: 'après' })) // écrit "après" derrière le champ de réponses
 >>```



>>>>## <a id="5" href="#5"></a> 2. 1. 2. Gestion des différentes types de réponses attendues

Toutes les réponses sont traitées en comparant la saisie de l'élève avec la réponse (ou les réponses) choisie(s) par le concepteur de l'exercice.

- Le fonctionnement, par défaut, est de comparer des expressions littérales ou des nombres, de façon intuitive. On a indiqué le code [plus haut](#59) et on le retrouve ici. On remarque que, par défaut, on peut ommettre `formatInteractif: 'calcul'`.

>>``` js
>>setReponse(this, i, resultat) // équivalent à setReponse(this, i, resultat,{ formatInteractif: 'calcul' })
>>```


- Pour comparer des textes sans traitement, on code, comme dans l'exercice-témoin **2N14-1** :
>>```js
>>setReponse(this, i, 'resultat', { formatInteractif: 'texte' }) // resultat doit être saisie sans les $ délimiteurs du LaTeX
>>```

- Pour comparer des fractions, il y a trois méthodes différentes pour coder.
 
>>``` js
>> // Méthode 1 : Exercice-témoin 4C22
>>setReponse(this, i, maFractionReponse, { formatInteractif: 'fraction' }) // maFractionReponse doit être un objet fraction (créé avec new Fraction(n, d))
>> // Dans ce cas, la réponse fournie par l'élève doit être exactement égale à maFractionReponse.
>>
>> // Méthode 2 : Exercice-témoin 5N13
>>setReponse(this, i, maFractionReponse, { formatInteractif: 'fractionPlusSimple' }) // maFractionReponse doit être un objet fraction (créé avec new Fraction(n, d))
>> // Dans ce cas, la réponse fournie par l'élève doit forcément être simplifiée.
>> // Si maFractionReponse est 16/32, l'élève ne peut pas fournir 16/32 ou 160/320 comme bonne réponse mais peut fournir 8/16 ou 4/8.
>>
>> // Méthode 3 : Exercice-témoin 3L13-1
>>setReponse(this, i, maFractionReponse, { formatInteractif: 'fractionEgale' }) // maFractionReponse doit être un objet fraction (créé avec new Fraction(n, d))
>> // Dans ce cas, la réponse fournie par l'élève peut être une autre fraction ou un nombre décimal. 
>> // Si maFractionReponse est 1/2, l'élève peut toutefois fournir comme bonne réponse 2/4 ou bien 0.5.
>>```

- Pour comparer des longueurs (ou des aires), on code, comme dans l'exercice-témoin **6M11** :
>>``` js
>>setReponse(this, i, new Grandeur(resultat, 'cm'), { formatInteractif: 'longueur' }) // resultat est un nombre. On personnalisera le champ texte avec ajouteChampTexteMathLive(this, i, 'longueur')
>>```

EE : Une réflexion pour moi uniquement. Ne pas s'en préoccuper. Non non NON ???? Réponse différente
 
>>>>## <a id="6" href="#6"></a> 2. 1. 3. Comprendre pourquoi une réponse correcte est pourtant considérée fausse

Le fonctionnement de MathLive peut parfois donner un résultat étonnant. Alors qu'on attend la réponse, "**1h45min**", `verifieQuestionMathLive` peut attendre "**1h45\\min**" par exemple.

Si vous vous trouvez dans la situation où une réponse correcte est considérée fausse, voici la procédure à suivre :
* Ouvrir l'inspecteur (CTRL+MAJ+C sur Firefox et Chrome, Command+Option+I sur Safari).
* Sur l'onglet débugueur, chercher dans l'onglet sources `webpack/src/js/modules/gestionInteractifs.js`.
* Mettre un point d'arrêt sur la ligne 95 (numéro actuel de ligne mais sous réserve de non-rajout de code au-dessus évidemment) juste après le `let saisie = champTexte.value` (clic droit sur 95 puis sur Ajouter un point d'arrêt).
* Cliquer sur Actualiser.
* Saisir la réponse attendue dans le champ et valider la saisie.
* Mettre le curseur sur `saisie` pour visualiser la saisie qu'il a récupéré comme sur cette [capture d'écran](img/Interactif-1.png).

>>>>## <a id="7" href="#7"></a> 2. 1. 4. Dans les exercices de la Course Aux Nombres

Les exercices utilisables dans la Course Aux Nombres sont des exercices avec `this.typeExercice = 'simple'`.

L'utilisation de mathLive au sein de ces exercices nécessitent ces actions :
* Mettre l'énoncé dans `this.question`
* Mettre la correction dans `this.correction`
* Mettre la réponse attendue dans `this.reponse`
Si le format de mathLive par défaut ne convient pas, on peut le changer. Pour cela, il suffit de placer après `Exercice.call(this)` :
* `this.formatInteractif = ` et de compléter avec un des formats vus <a href="#5">ci-dessus</a> : `'texte'`, `'fraction'`, `'fractionPlusSimple'`, `'fractionEgale'`, `'longueur'`, `'calcul'` (Exercice-témoin **can6C15**).
* `this.formatChampTexte = 'largeur10 inline'` pour personnaliser le champTexte (10 % de la largeur sans retour à la ligne, dans cet exemple)
* `this.optionsChampTexte = { texte: 'l = ', texteApres: ' cm'}` permet d'avoir du texte avant et après le champTexte MathLive.

>>>>## <a id="7" href="#7"></a> 2. 1. 5. Permettre deux champs de réponse sur une même question

Exercice-témoin : **3F12-3**

Il est possible d'avoir plusieurs champs de réponse sur une même question.

Pour cela, si dans un exercice interactif par défaut, on a ceci :

>>```js 
>>setReponse(this, i, resultat) 
>>texte += ajouteChampTexteMathLive(this, i)
>>```

Alors, si on souhaite trois champs de réponse pour une même question, on codera alors ainsi :
>>```js 
>>setReponse(this, i * 3, resultat1) 
>>setReponse(this, i * 3 + 1, resultat2) 
>>setReponse(this, i * 3 + 2, resultat3) 
>>texte += ajouteChampTexteMathLive(this, i * 3)
>>texte += ajouteChampTexteMathLive(this, i * 3 + 1)
>>texte += ajouteChampTexteMathLive(this, i * 3 + 2)
>>```

Le souci, c'est que pour l'instant chaque question rapporte 1 point au niveau du score. Il y aura donc, dans l'exemple ci-dessus, au moins une question à 3 points.

>>## <a id="9" href="#9"></a> 2. 2. `qcm`

Exercice-témoin : **5L10-2**

Pour chaque question, la configuration des réponses se fait pendant la définition de la correction se fait via par le tableau `this.autoCorrection`. L'indice du tableau correspond au numéro de la question.

```js
this.autoCorrection[i] = {
  enonce: 'la question est posée ici',
  propositions: [
    {
      texte: 'première proposition du QCM écrite à droite de la case à cocher',
      statut: true, // true ou false pour indiquer si c'est une bonne réponse (true)
      feedback: 'message1' // qui s'affichera si la réponse est juste ou s'il n'y a qu'une erreur
    },
    {
      texte: 'deuxième proposition du QCM écrite à droite de la case à cocher',
      statut: false, // true ou false pour indiquer si c'est une bonne réponse (true)
      feedback: 'message1'
    },
    {

    } //.... autant de fois qu'il y a de propositions dans le qcm
  ],
  options: {
    ordered: true // (si les réponses doivent rester dans l'ordre ci-dessus, false s'il faut les mélanger),
    lastChoice: index // (en cas de mélange, l'index à partir duquel les propositions restent à leur place, souvent le dernier choix par défaut)
  }
}
```
>>## <a id="10" href="#10"></a> 2. 3. `numerique`

Octobre 2021 : Le type `numerique` est à proscrire au profit de `mathLive`. Ce type est encore dans cette documentation car encore en place dans des exercices plus anciens.


>>## <a id="11" href="#11"></a> 2. 4. `cliqueFigure`

Exercice-témoin : **6G10-3**

Ici, l'élève devra cliquer sur une figure pour signaler sa réponse. Le concepteur de l'exercice aura créé un tableau contenant toutes les références aux différentes figures, associées chacune à un identifiant unique et à un booléen de bonne ou mauvaise réponse. Ensuite, c'est la fonction `resultatCheckEx` qui gère la partie interactive.

>>## <a id="12" href="#12"></a> 2. 5. `listeDeroulante`

Exercice-témoin : **6N43-4**

Ici, l'élève devra sélectionner une réponse dans un menu déroulant dont les différentes options sont définies, par le créateur de l'exercice, par la fonction `choixDeroulant`.

```js
texte = 'Choisir une bonne réponse parmi ' + choixDeroulant(this, i, 0, [a, b, c, d]) // Si on veut avoir plusieurs menus déroulants dans la même question, il suffit d'incrémenter le troisième paramètre comme choixDeroulant(this, i, 1, [a, b, c, d]) (voir ex. 6N43-4)
texteCorr = `Les bonnes réponses sont ${a} et ${d}.`
setReponse(this, i, [a, d]) // S'il y a plusieurs menus déroulants, le troisième paramètre peut être une liste de listes comme setReponse(this, i, [[a, d], [c, d])
```


>>## <a id="13" href="#13"></a> 2. 5. `custom`

Exercices-témoins : **6I12**, **5R11-2**, **6N11-2**, **6N21**, **6N30-2**

Le type `custom` est réservé aux concepteurs avertis. Il n'a pas de syntaxe particulière et sa programmation est propre à chaque concepteur. Les divers exercices-témoins peuvent témoigner de cette hétérogénéité et donner cours à l'inspiration pour d'autres exercices interactifs.

---

**Ci-dessous est un pense-bête**

Ne pas oublier d'introduire dans ce doc,

Lien Interactif-AMC comme indiqué ici : [https://coopmaths.fr/documentation/tutorial-Rendre_un_exercice_interactif_complet.html#11](https://coopmaths.fr/documentation/tutorial-Rendre_un_exercice_interactif_complet.html#11). Est-ce encore utile ?

Un autre lien AMC ici aussi : [https://coopmaths.fr/documentation/tutorial-Rendre_un_exercice_interactif_complet.html#15](https://coopmaths.fr/documentation/tutorial-Rendre_un_exercice_interactif_complet.html#15). Est-ce utile et toujours fonctionnel ?


 [https://coopmaths.fr/documentation/tutorial-Rendre_un_exercice_interactif_complet.html#8](https://coopmaths.fr/documentation/tutorial-Rendre_un_exercice_interactif_complet.html#8)