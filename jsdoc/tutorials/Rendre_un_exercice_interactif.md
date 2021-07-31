MathAlea permet de rendre un exercice interactif de deux façons :
- en ligne : l'utilisateur saisit une réponse (dans un champ ou coche une case), celle-ci est vérifiée automatiquement et son score peut éventuellement être récupéré par son professeur.
- sur papier : principalement sous forme de QCM ou de réponses numériques à coder mais pas que, les copies des élèves peuvent être scannées et corrigées automatiquement via ce qu'on appele communément AMC pour [Auto Multiple Choice](https://www.auto-multiple-choice.net/exemples.fr).

Dans les deux cas, pour rendre un exercice interactif, il faut deux chose :
1. Faire charger le nécessaire.
2. Définir la correction et le feedback éventuel.

## 1.a Faire charger le nécessaire pour rendre un exercice en ligne interactif
Pour faire charger le nécessaire, il faut ajouter ces lignes juste après les `import` de début d'exercice :
```js
export const interactifReady = true // pour définir qu'exercice peut s'afficher en mode interactif.
export const interactifType = 'typeInteractivite'
```
`'typeInteractivite'` peut être :
* `'qcm'` pour avoir un qcm. Modèle : 5L10-2
* `'numerique'` pour avoir une réponse numérique. Modèle : 5R22
* `'mathLive'`pour avoir un champ avec clavier et vérification d'égalité formelle. Modèle : 4C10-4
* `'cliqueFigure'` pour choisir une figure. Modèle : 6G10-3
* `'custom'` pour appeler la fonction this.correctionInteractive() définie dans l'exercice. Modèle : 6N11-2

**Remarque :**
On peut utiliser `this.interactif = false` pour définir le mode dans lequel l'exercice va s'afficher par défaut (on le place avec les autres réglages par défaut de l'exercice entre `Exercice.call(this)` et `this.nouvelleVersion = function`)

## 1.b Faire charger le nécessaire pour rendre un exercice utilisable avec AMC
Pour faire charger le nécessaire, il faut ajouter ces lignes juste après les `import` de début d'exercice :
```js
export const amcReady = true // pour définir que l'exercice peut servir à AMC
export const amcType = 'typeAMC'
```
`'typeAMC'` peut être l'une des valeurs suivantes :
* `'qcmMono'` : qcm avec une seule bonne réponse (évolution vers le bouton radio ?). Modèle : 6C10-2
* `'qcmMult'` : qcm avec possibilité de plusieurs bonnes réponses. Modèle : 6N43-2
* `'AMCOpen'` : question ouverte -> il n'y a pas d'interactivité l'affichage est classique par contre on peut l'exporter vers AMC en question ouverte. Modèle : 6C10-5
* `'AMCNum'` : réponse numérique à entrer dans un formulaire texte. AmcNumeriqueChoice (voire attribut reponse). Modèle : 6C10
* `'AMCOpenNum'` : réponse identique au type `'AMCNum'` mais AMC ajoute une zone pour une réponse ouverte. Modèle : 3G30
* `'AMCOpenNum✖︎2'` : identique à `'AMCOpenNum'` avec deux réponses numériques (`reponse` et `reponse2`). Modèle : 4C21
* `'AMCOpenNum✖︎3'` : identique à `'AMCOpenNum'` avec trois réponses numériques (`reponse`, `reponse2` et `reponse3`). Modèle : 3L11-1
* `'custom'` : Ces exercices ne sont pas prédéfinis, ils partagent le bouton de validation puis appellent la méthode `correctionInteractive()` définie dans l'exercice. Ils ne sont pas compatibles avec AMC

## 2. Définir la correction et le feedback éventuel
La définition de la correction ainsi que celle du feedback éventuel se font via la variable `this.autoCorrection`
```js
this.autoCorrection // doit contenir un tableau d'objets avec autant d'éléments qu'il y a de répétitions de l'énoncé (this.nbQuestions).
this.autoCorrection[0] // définit la première question
this.autoCorrection[1] // definit la deuxième question et ainsi de suite.
```

Selon les types, `this.autoCorrection` s'adapte :

* **types `'qcm'`** (Interactif)**, `'qcmMono'` et `'qcmMult'`** (AMC) **:** (à la différence des deux autres, `'qcmMono'` ne peut avoir qu'un seul `statut` à `true`)
```js
this.autoCorrection[i] = {
  enonce: 'la question est posée ici',
  propositions: [
    {
      texte: 'ce qui est écrit à droite de la case à cocher',
      statut: // true ou false pour indiquer si c'est une bonne réponse (true),
      feedback: 'message' // qui s'affichera si la réponse est juste ou s'il n'y a qu'une erreur
    },
    {
      texte: 'deuxième proposition',
      statut: //true ou false,
      feedback: '...'
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
* **type `'AMCOpen'`** (AMC) **:** ici un exemple pour une exercice ne produisant qu'une question (il y aura autant d'objets que `this.nbQuestion` > 1)
```js
this.autoCorrection = [
  { 
    enonce: 'ici la question est posée'
    propositions: [
      { 
        texte: 'Ce qui apparaitra sur le corrigé',
        statut: 3 // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
        feedback: ''
      }
    ]
  }
]
```
* **types `'numerique'`** (Interactif) **, `'AMCNum'`, `'AMCOpenNum'` et `'AMCOpenNum✖︎2'`** (AMC) **:** (`'AMCOpenNum✖︎2'` contient aussi un attribut `reponse2` au fonctionnement identique à celui de l'attribut `reponse` ci-dessous)
```js
this.autoCorrection[i] = {
  enonce: 'ici la question est posée',
  propositions: [
    {
      texte: 'ce qui est affiché dans le corrigé AMC',
      statut: nombreDeRéponsesNumériques,
      feedback: ''
    }
  ],
    reponse: {
      texte: 'le texte affiché au dessus du formulaire numerique dans AMC', //facultatif
      valeur: nombre, // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9
      param: {
        digits: 3, // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
        decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
        signe: false, // (présence d'une case + ou - pour AMC)
        exposantNbChiffres: 0, // facultatif (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant)
        exposantSigne: false, // (présence d'une case + ou - pour l'exposant précédent)
        approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance... voir AMC)
      }
    }
```
* **type `'AMCHybride'`** (AMC) **:** Dans ce type, chaque question-réponse peut avoir un type différent. Il y a un énoncé, une correction et plusieurs question-réponse.
```js
this.autoCorrection[i] = {
  enonce: 'ici la (ou les) question(s) est(sont) posée(s)',
  propositions: [
    {
      type: type1, // on donne le type de la première question-réponse qcmMono, qcmMult, Num...
      propositions : [ // une ou plusieures(Qcms) 'propositions'
        {
          texte: // la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm ,
          statut: // true au false(Qcms) ,
          feedback: ''
        }
      ],
      reponse: { // utilisé si type = 'Num'
        texte: 'le texte affiché au dessus du formulaire numerique dans AMC', //facultatif
        valeur: nombre, // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9
        param: {
          digits: 3, // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
          decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
          signe: false, // (présence d'une case + ou - pour AMC)
          exposantNbChiffres: 0, // facultatif (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant)
          exposantSigne: false, // (présence d'une case + ou - pour l'exposant précédent)
          approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance... voir AMC)
        }
      }
      options: {ordered: false, lastChoice: false} // options pour Qcms
    },
    {
      type: type2, // on donne le type de la deuxième question-réponse qcmMono, qcmMult, Num...
      proposition : [ // une ou plusieures(Qcms) 'propositions'
        {
          texte: // la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm ,
          statut: // true au false(Qcms) ,
          feedback: ''
        }
      ],
      reponse: { // utilisé si type = 'Num'
        texte: 'le texte affiché au dessus du formulaire numerique dans AMC', //facultatif
        valeur: nombre, // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9
        param: {
          digits: 3, // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
          decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
          signe: false, // (présence d'une case + ou - pour AMC)
          exposantNbChiffres: 0, // facultatif (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant)
          exposantSigne: false, // (présence d'une case + ou - pour l'exposant précédent)
          approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance... voir AMC)
        }
      },
      options: {ordered: false, lastChoice: false} // options pour Qcms
    } // et ainsi de suite pour toutes les question-reponse
  ]
}
```
## Les fonctions
Pour gérer l'interactivité Rémi Angot a implémenté quelques fonctions dont l'appel permet de générer le code nécessaire facilement :

```js
function setReponse (this, i, a, {digits = 0, decimals = 0, signe = false, exposantNbChiffres = 0, exposantSigne = false, approx = 0} = {})
```
Cette fonction permet de fixer une réponse numérique à une exercice interactif/AMC de type `'numerique'`, `'mathLive'`, `'AMCNum'` ou `'AMCOpenNum'`. 

(à développer une fonction `setReponses()` qui fixe les réponses des exercices de type `'AMCOpenNum✖︎2'` ou `'AMCOpenNum✖︎3'`.

Les trois premiers arguments sont obligatoires : l'exercice appelant (`this`), l'index de la question (`i`), une réponse numérique (`a`).

Le quatrième est facultatif et ne sert que pour AMC (des valeurs par défaut seront mises garantissant un fonctionnement correct dans la plupart des cas : la fonction d'export AMC calculera le nombre de chiffres à coder à partir de la réponse).
```js
function propositionsQcm (this, i)
```
Cette fonction va retourner un objet `{ texte, texteCorr }` qui contient les propositions faites pour le qcm avec leur case à cocher pour l'énoncé (`texte`) et pour la correction (`texteCorr`).

Si le `texte` est toujours utilisé, on préférera souvent la correction classique au `texteCorr` retourné par cette fonction (à réfléchir : pourquoi ne pas activer la correction classique avec le bouton 'correction détaillée' ?)

## MathLive

Nous n'avons pas encore parlé du type d'interactivité `'mathLive'` qui est pourtant très pratique ! et pas très compliqué à mettre en place comme nous allons le voir :

Pour rendre un exercice interactif en utilisant MathLive, il suffit de :
1. `export const interactifType = 'mathLive'`
2. mettre dans la boucle `setReponse(this, i, maRéponse)` avec maRéponse un string LaTeX ou une valeur numérique (donc sans `texNombre` ou des équivalents)
3. faire `texte += ajouteChampTexteMathLive(this, i)` pour ajouter le champ de réponse.

Par défaut, on compare des expressions littérales ou des nombres. 
- Pour comparer des textes sans traitement, on fait `setReponse(this, i, '+', { formatInteractif: 'texte' })`.
- Pour comparer des fractions et attendre exactement une forme, on fait `setReponse(this, i, '+', { formatInteractif: 'fraction' })` et la réponse doit être un objet fraction (créé avec `new Fraction(a, b)`)
- Pour comparer des fractions, on peut aussi faire `setReponse(this, i, new Fraction(n, d), { formatInteractif: 'fractionPlusSimple' })` et la réponse doit être un objet fraction égale à la réponse mais avec un numérateur strictement inférieur (on compare les valeurs absolues).
- Pour comparer des fractions, on peut aussi faire `setReponse(this, i, new Fraction(n, d), { formatInteractif: 'fractionEgale' })` et la réponse doit être un objet fraction égale à la réponse.
- Pour comparer des longueurs (ou des aires), on peut faire `setReponse(this, i, new Grandeur(4, 'cm'), { formatInteractif: 'longueur' })` et personnaliser le champ texte avec `ajouteChampTexteMathLive(this, i, 'longueur')`

## Remarque  :
Pour une compatibilité entre les exercices interactifs en ligne et AMC,

**il ne faut pas faire :**
* `texte = propositionsQcm()` ;
* `texte = ajouteChampTexteMathLive()`.

Mais **il faut faire :**
* `texte += propositionsQcm()` ;
* `texte += ajouteChampTexteMathLive()`.

La raison se trouve ci-dessous :

Afin de ne pas se retrouver avec un code hors contexte, les fonctions `propositionsQcm` et `ajouteChampTexteMathLive` retournent des chaines vides lorsque le contexte est la sortie Latex ou le générateur AMC.

Il convient donc de ne pas utiliser l'affectation `texte = ...` mais la concaténation `texte += ...`

En effet, le `texte` initial de l'énoncé sert souvent tel quel pour les énoncés AMC. En cas d'affectation `texte` transmettrait une chaine vide comme énoncé pour AMC. Il en va de même pour l'utilisation de `propositionsQcm()` qui retourne un tableau avec deux chaines vides dans ce contexte de sortie AMC.
