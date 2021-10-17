---

MathAlea permet de rendre un exercice utilisable avec AMC (pour [Auto Multiple Choice](https://www.auto-multiple-choice.net/exemples.fr)). C'est un document Latex pour enseignant qui est produit. Sur feuille, l'elève aura un document qui reprend toutes les questions de l'exercice mais sous forme de QCM, de réponses numériques à coder, de questions ouvertes ou bien encore un mélange de toutes ces possibilités. Les copies des élèves peuvent être scannées et corrigées automatiquement via AMC  et dont un guide se trouve dans le [panneau de gauche](https://coopmaths.fr/documentation/tutorial-Utiliser_AMC.html).
 
 ---

 Les actions obligatoires à mener, pour permettre à un exercice d'être utilisable avec AMC, sont décrites ci-dessous et explicitées, plus bas, en détail.

1. [Charger le code nécessaire](#1)
1. [Définir la correction](#2)
1. [Configurer le typeAMC choisi](#3)
    1. [types `'qcmMono'` et `'qcmMult'`](#4)
    1. [type `'AMCOpen'`](#5)
    1. [types `'AMCNum'`, `'AMCOpenNum'`, `'AMCOpenNum✖︎2'` et `'AMCOpenNum✖︎3'`](#6)
    1. [type `'AMCHybride'`](#7)
1. [Plusieurs sorties AMC différentes dans un même exercice](#8)

    

## <a id="1" href="#1"></a> 1. Charger le code nécessaire pour rendre un exercice utilisable avec AMC
Pour charger le code nécessaire pour rendre un exercice utilisable avec AMC, il faut ajouter ces deux lignes de code juste après les `import` de début d'exercice :
```js
export const amcReady = true // pour définir que l'exercice peut servir à AMC
export const amcType = 'typeAMC'
```
|Choix de `'typeAMC'`|Description de ce choix|Exercice témoin|
|-----|-----|-----|
|[`'qcmMono'`](#4)|qcm avec une seule bonne réponse|**6C10-2**|
|[`'qcmMult'`](#4)|qcm avec possibilité de plusieurs bonnes réponses ou une unique ou bien aucune|**6N43-2**|
|[`'AMCOpen'`](#5)|question ouverte, avec la possibilité d'afficher ou pas le cadre de saisie qui peut être inutile en géométrie.|**6C10-5** et **6G12-1**|
|[`'AMCNum'`](#6)|réponse numérique à coder (AMCNumericChoice dans le langage AMC)|**6C10**|
|[`'AMCOpenNum'`](#6)|mélange de `'AMCOpen'` et `'AMCNum'`, une question ouverte et une réponse numérique à coder. Octobre 2021 : il est préférable ne plus utiliser `AMCOpenNum` au profit de `AMCHybride`.|**3G30**|
|[`'AMCOpenNum✖︎2'`](#6)|identique à `'AMCOpenNum'` avec deux réponses numériques (`reponse` et `reponse2`). Octobre 2021 : il est préférable ne plus utiliser `AMCOpenNum✖︎2` au profit de `AMCHybride`.|**4C21**|
|[`'AMCOpenNum✖︎3'`](#6)|identique à `'AMCOpenNum'` avec trois réponses numériques (`reponse`, `reponse2` et `reponse3`). Octobre 2021 : il est préférable ne plus utiliser `AMCOpenNum✖︎3` au profit de `AMCHybride`.|**3L11-1**|
|[`'AMCHybride'`](#7)|utilisation de plusieurs choix (exclusifs ou répétés) parmi `'qcmMono'`, `'qcmMult'`, `'AMCOpen'` et `'AMCNum'` |**2F10-2**|

## <a id="2" href="#2"></a> 2. Définir la correction

La définition de la correction se fait via la variable `this.autoCorrection`.
```js
this.autoCorrection = [] // doit contenir un tableau d'objets avec autant d'éléments qu'il y a de répétitions de l'énoncé (this.nbQuestions).
                        // this.autoCorrection[0] définira la première question
                        // this.autoCorrection[1] définira la deuxième question et ainsi de suite.
```
## <a id="3" href="#3"></a> 3. Configurer le typeAMC choisi

Il faut adapter `this.autoCorrection` en le configurant selon le type `AMCType` choisi, comme décrit dans les paragraphes ci-dessous.

>>## <a id="4" href="#4"></a> 3.1. types `'qcmMono'` et `'qcmMult'`

```js
this.autoCorrection[i] = {
  enonce: 'la question est posée ici',
  propositions: [
    {
      texte: 'ce qui est écrit à droite de la case à cocher',
      statut: true, // true ou false pour indiquer si c'est une bonne réponse (true) - En Mono, une unique bonne réponse ; en Mult, plusieurs bonnes réponses ou une seule ou bien aucune
      feedback: 'message' // qui s'affichera si la réponse est juste ou s'il n'y a qu'une erreur
    },
    {
      texte: 'deuxième proposition',
      statut: false, // true ou false pour indiquer si c'est une bonne réponse (true) - En Mono, une unique bonne réponse ; en Mult, plusieurs bonnes réponses ou une seule ou bien aucune
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


>>## <a id="5" href="#5"></a> 3.2. type `'AMCOpen'`

```js
this.autoCorrection = [
  { 
    enonce: 'ici la question est posée'
    propositions: [
      { 
        texte: 'Ce qui apparaitra sur le corrigé',
        statut: 3 // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
        feedback: '',
        enonce: 'Texte écrit au dessus ou avant les cases à cocher' // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
        sanscadre : false // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
    
      }
    ]
  }
]
```

L'exemple ci-dessus est pour un exercice ne produisant qu'une seule zone de réponse, quel que soit le nombre de questions.



>>## <a id="6" href="#6"></a> 3.3. types `'AMCNum'`, `'AMCOpenNum'`, `'AMCOpenNum✖︎2'` et `'AMCOpenNum✖︎3'` 


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
      alignement: 'flushleft' // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte pqui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
      param: {
        digits: 3, // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
        decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
        signe: false, // (présence d'une case + ou - pour AMC)
        exposantNbChiffres: 0, // facultatif (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant)
        exposantSigne: false, // (présence d'une case + ou - pour l'exposant précédent)
        approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance... voir plus bas pour un point technique non intuitif)
      }
    }


// La valeur de tolérance "approx" est forcément un entier avec la contrainte suivante :
// AMC transforme tous les nombres (décimaux inclus) comme des entiers (en enlevant
// la virgule) avant de faire la diﬀérence et de comparer avec approx. Par exemple, si
// decimals=2, si la bonne valeur est 3,14 et si la valeur saisie est 3,2 alors la diﬀérence
// entière calculée est 320-314=6, de sorte que les points scoreapprox ne sont acquis que
// si approx vaut 6 ou plus.

```
`'AMCOpenNum✖︎2'` contient aussi un attribut `reponse2` au fonctionnement identique à celui de l'attribut `reponse` ci-dessus.

`'AMCOpenNum✖︎3'` contient aussi des attributs `reponse2` et `reponse3` aux fonctionnements identiques à celui de l'attribut `reponse` ci-dessus.

Les types `'AMCOpenNum'`, `'AMCOpenNum✖︎2'` et `'AMCOpenNum✖︎3'` sont amenés à disparaître au profit de `'AMCHybride'`.



>>## <a id="7" href="#7"></a> 3.4. type `'AMCHybride'` 


Dans ce type, chaque question-réponse peut avoir un type différent. Il y a un seul énoncé, une seule correction et plusieurs champs question-réponse (il faudra donc numéroter les questions dans l'énoncé).

```js
this.autoCorrection[i] = {
  enonce: 'ici la (ou les) question(s) est(sont) posée(s)',
  enonceAvant: true, //EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de la question. 
  propositions: [
    {
      type: type1, // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
      propositions : [ // une ou plusieurs (Qcms) 'propositions'
        {
          texte: '',// Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm 
          statut: ,// true au false pour un QCM
          feedback: ''

        }
      ],
      reponse: { // utilisé si type = 'AMCNum'
        texte: 'le texte affiché au dessus du formulaire numerique dans AMC', //facultatif
        valeur: nombre, // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9
        param: {
          digits: 3, // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
          decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
          signe: false, // (présence d'une case + ou - pour AMC)
          exposantNbChiffres: 0, // facultatif (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant)
          exposantSigne: false, // (présence d'une case + ou - pour l'exposant précédent)
          approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
        }
      }
      options: {ordered: false, lastChoice: false} // options pour Qcms
    },
    {
      type: type2, // on donne le type de la deuxième question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
      proposition : [ // une ou plusieurs (Qcms) 'propositions'
        {
          texte: '',// Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm 
          statut: ,// true au false pour un QCM
          feedback: ''
        }
      ],
      reponse: { // utilisé si type = 'AMCNum'
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
Pour le type `'AMCHybride'`, les possibilités étant si nombreuses qu'il ne faut pas hésiter à aller regarder le code d'un exercice dont la sortie peut correspondre à vos envies de programmeur.

A FAIRE : METTRE ICI UN TABLEAU D'EXERCICES TEMOINS RECENSANT DIFFERENTES UTILISATIONS D'HYBRIDE...

## <a id="8" href="#8"></a> 4. Plusieurs sorties AMC différentes dans un même exercice

On peut aussi faire le choix de ne pas imposer à un utilisateur le choix d'un type AMC mais en proposer plusieurs. Un exemple de ce type est le beta6C12 (à modifier) avec une sortie de type `'AMCOpen'`, une autre sortie de type `'AMCNum'` et enfin une dernière sortie `'AMCHybride'` avec `'AMCOpen'` et `'AMCNum'`.