Si vous êtes sur cette page, c'est que vous souhaitez rajouter à votre exercice, un export AMC. Bonne idée, vous êtes sur la bonne page ! Tout le déroulé est décrit, sur cette page, étapes par étapes, selon vos envies. Si toutefois l'exercice est déjà interactif, il est possible que peu de lignes de code supplémentaires soient nécessaires pour le rendre exportable AMC et alors, il est préférable, avant de continuer, de consulter cette page sur la [compatibilité entre l'interactivité et un export AMC](tutorial-Rendre_un_exercice_interactif.html#compatibilite_interactivite_AMC). Si l'offre n'est pas satisfaisante, alors revenez sur cette page.

---

MathAlea permet de rendre un exercice utilisable avec AMC (pour [Auto Multiple Choice](https://www.auto-multiple-choice.net/exemples.fr)). C'est un document Latex pour enseignant qui est produit. Sur feuille, l'elève aura un document qui reprend toutes les questions de l'exercice mais sous forme de QCM, de réponses numériques à coder, de questions ouvertes ou bien encore un mélange de toutes ces possibilités. Les copies des élèves peuvent être scannées et corrigées automatiquement via AMC et dont un guide se trouve dans le [panneau de gauche](tutorial-Utiliser_AMC.html).
 
 ---

>>```js
>> if (this.interactif && !context.isAmc) {
>>          setReponse(this, i, reponse)
>> }
>>```



 Les actions obligatoires à mener, pour permettre à un exercice d'être utilisable avec AMC, sont décrites ci-dessous et explicitées, plus bas, en détail.

1. [Charger le code nécessaire](#code_necessaire)
1. [Définir la correction](#definir_correction)
1. [Configurer le `typeAMC` choisi](#configurer_typeAMC)
    1. [`qcmMono` et `qcmMult`](#qcmMono_qcmMult)
    1. [`AMCOpen`](#AMCOpen)
    1. [`AMCNum`, `AMCOpenNum`, `AMCOpenNum✖︎2` et `AMCOpenNum✖︎3`](#AMCNum_AMCOpenNum)
    1. [`AMCHybride`](#AMCHybride)
1. [Plusieurs sorties AMC différentes dans un même exercice](#plusieurs_sorties)

    

## <a id="code_necessaire" href="#code_necessaire"></a> [1. Charger le code nécessaire pour rendre un exercice utilisable avec AMC](#code_necessaire)
Pour charger le code nécessaire pour rendre un exercice utilisable avec AMC, il faut ajouter ces deux lignes de code juste après les `import` de début du code de l'exercice :
```js
export const amcReady = true // pour définir que l'exercice peut servir à AMC
export const amcType = 'typeAMC'
```
|Choix de `'typeAMC'`|Description de ce choix|Exercices-témoins|
|-----|-----|-----|
|[`'qcmMono'`](#qcmMono_qcmMult)|qcm avec une seule bonne réponse|**6C10-2**|
|[`'qcmMult'`](#qcmMono_qcmMult)|qcm avec possibilité de plusieurs bonnes réponses ou une unique ou bien aucune|**6N43-2**|
|[`'AMCOpen'`](#AMCOpen)|question ouverte, avec la possibilité d'afficher ou pas le cadre de saisie qui peut être inutile en géométrie.|**6C10-5** et **6G12-1**|
|[`'AMCNum'`](#AMCNum_AMCOpenNum)|réponse numérique à coder (AMCNumericChoice dans le langage AMC)|**6C10**|
|[`'AMCOpenNum'`](#AMCNum_AMCOpenNum)|mélange de `'AMCOpen'` et `'AMCNum'`, une question ouverte et une réponse numérique à coder. Octobre 2021 : il est préférable ne plus utiliser `AMCOpenNum` au profit de `AMCHybride`.|**3G30**|
|[`'AMCOpenNum✖︎2'`](#AMCNum_AMCOpenNum)|identique à `'AMCOpenNum'` avec deux réponses numériques (`reponse` et `reponse2`). Octobre 2021 : il est préférable ne plus utiliser `AMCOpenNum✖︎2` au profit de `AMCHybride`.|**4C21**|
|[`'AMCOpenNum✖︎3'`](#AMCNum_AMCOpenNum)|identique à `'AMCOpenNum'` avec trois réponses numériques (`reponse`, `reponse2` et `reponse3`). Octobre 2021 : il est préférable ne plus utiliser `AMCOpenNum✖︎3` au profit de `AMCHybride`.|**3L11-1**|
|[`'AMCHybride'`](#AMCHybride)|utilisation de plusieurs choix (exclusifs ou répétés) parmi `'qcmMono'`, `'qcmMult'`, `'AMCOpen'` et `'AMCNum'` |**2F10-2**|

## <a id="definir_correction" href="#definir_correction"></a> [2. Définir la correction](#definir_correction)

La définition de la correction se fait via la variable `this.autoCorrection`.
```js
this.autoCorrection = [] // doit contenir un tableau d'objets avec autant d'éléments qu'il y a de répétitions de l'énoncé (this.nbQuestions).
                        // this.autoCorrection[0] définira la première question
                        // this.autoCorrection[1] définira la deuxième question et ainsi de suite.
```
## <a id="configurer_typeAMC" href="#configurer_typeAMC"></a> 3. [Configurer le `typeAMC` choisi](#configurer_typeAMC)

Il faut adapter `this.autoCorrection` en le configurant selon le type `AMCType` choisi, comme décrit dans les paragraphes ci-dessous.

>>## <a id="qcmMono_qcmMult" href="#qcmMono_qcmMult"></a> 3.1. [`qcmMono` et `qcmMult`](#qcmMono_qcmMult)

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


>>## <a id="AMCOpen" href="#AMCOpen"></a> [3.2.`AMCOpen`](#AMCOpen)

```js
this.autoCorrection = [
  { 
    enonce: 'ici la question est posée',
    propositions: [
      { 
        texte: 'Ce qui apparaitra sur le corrigé',
        statut: 3, //OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
        feedback: '',
        enonce: 'Texte écrit au dessus ou avant les cases à cocher', // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
        sanscadre : false // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
    
      }
    ]
  }
]
```

L'exemple ci-dessus est pour un exercice ne produisant qu'une seule zone de réponse, quel que soit le nombre de questions. Pour une zone de réponse par question, il faut utiliser le type [`AMCHybride`](#AMCHybride). 



>>## <a id="AMCNum_AMCOpenNum" href="#AMCNum_AMCOpenNum"></a> [3.3. `AMCNum`, `AMCOpenNum`, `AMCOpenNum✖︎2` et `AMCOpenNum✖︎3`](#AMCNum_AMCOpenNum)


```js
this.autoCorrection[i] = {
  enonce: 'ici la question est posée', // Si vide, l'énoncé est celui de l'exercice.
  propositions: [
    {
      texte: 'ce qui est affiché dans le corrigé AMC' // Si vide, le texte est la correction de l'exercice.
      }
  ],
    reponse: {
      texte: 'le texte affiché au dessus du formulaire numerique dans AMC', // facultatif
      valeur: [nombre], // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9. Cette valeur doit être passée dans un tableau d'où la nécessité des crochets.
      alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
      param: {
        digits: 3, // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
        decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
        signe: false, // (présence d'une case + ou - pour AMC)
        exposantNbChiffres: 0, // facultatif (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant). Si la réponse est une puissance, exposantNbChiffres est le nombre de chiffres sur lequel on veut que AMC code l'exposant. Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur la plus adéquate.
        exposantSigne: false, // (présence d'une case + ou - pour l'exposant précédent)
        approx: 0, // (0 = valeur exacte attendue, sinon valeur de tolérance... voir plus bas pour un point technique non intuitif)
        vertical : false, // facultatif. Si true, les cases à cocher seront positionnées verticalement
        nbCols : 4, // Ne fonctionne que si vertical est true. Indique le nb de colonnes dans lesquelles seront positionnées les cases à cocher.
        vhead : 'descriptif#1', // Ne fonctionne que si vertical est true. Permet d'écrire au-dessus de la colonne de chaque série de cases à cocher un texte.
        tpoint : ',', // Facultatif. Permet dans AMCNum de remplacer la virgule par un autre séparateur décimal. 
        digitsNum : 2, // Facultatif. digitsNum correspond au nombre TOTAL de chiffres du numérateur à coder si la réponse est une fraction.
        digitsDen : 3, // Facultatif. digitsDencorrespond au nombre TOTAL de chiffres du dénominateur à coder si la réponse est une fraction.
        basePuissance : 5, // Si la réponse est une puissance, basePuissance correspond à la base de la réponse
        exposantPuissance : 34, // Si la réponse est une puissance, exposantPuissance correspond à l'exposant de la réponse
        baseNbChiffres : 2, // facultatif. Si la réponse est une puissance, baseNbChiffres est le nombre de chiffres sur lequel on veut que AMC code la base. Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur la plus adéquate.
      }
    }


// La valeur de tolérance "approx" est forcément un entier avec la contrainte suivante :
// AMC transforme tous les nombres (décimaux inclus) comme des entiers (en enlevant
// la virgule) avant de faire la diﬀérence et de comparer avec approx. Par exemple, si
// decimals=2, si la bonne valeur est 3,14 et si la valeur saisie est 3,2 alors la diﬀérence
// entière calculée est 320-314=6, de sorte que les points scoreapprox ne sont acquis que
// si approx vaut 6 ou plus.

```
`AMCOpenNum✖︎2` contient aussi un attribut `reponse2` au fonctionnement identique à celui de l'attribut `reponse` ci-dessus.

`AMCOpenNum✖︎3` contient aussi des attributs `reponse2` et `reponse3` aux fonctionnements identiques à celui de l'attribut `reponse` ci-dessus.

Les dernières options ajoutées pour `AMCNum` n'ont pas été implémentées pour `AMCOpenNum`, `AMCOpenNum✖︎2` et pour `AMCOpenNum✖︎3` parce que les types `AMCOpenNum`, `AMCOpenNum✖︎2` et `AMCOpenNum✖︎3` sont amenés à disparaître au profit de `AMCHybride`.



>>## <a id="AMCHybride" href="#AMCHybride"></a> [3.4. `AMCHybride`](#AMCHybride)


Dans ce type, chaque question-réponse peut avoir un type différent. Il y a un seul énoncé, une seule correction et plusieurs champs question-réponse (il faudra donc numéroter les questions dans l'énoncé).

```js
this.autoCorrection[i] = {
  enonce: 'ici la (ou les) question(s) est(sont) posée(s)',
  enonceAvant: true, //EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question. 
  enonceAvantUneFois: true, //EE : ce champ est facultatif et permet (si true) d'afficher l'énoncé ci-dessus une seule fois avant la numérotation de la première question de l'exercice. Ne fonctionne correctement que si l'option melange est à false.
  enonceCentre: false, //EE : ce champ est facultatif et permet (si true) de centrer le champ 'enonce' ci-dessus.
  melange: false, //EE : ce champ est facultatif et permet (si false) de ne pas provoquer le mélange des questions.
  options: { multicols: true, barreseparation:false }, // facultatif. Par défaut, multicols est à false. Ce paramètre provoque un multicolonnage (sur 2 colonnes par défaut) : pratique quand on met plusieurs AMCNum. !!! Attention, cela ne fonctionne pas, nativement, pour AMCOpen. !!!
  // barreseparation (par défaut à false) permet de mettre une barre de séparation entre les deux colonnes.
  propositions: [
    {
      type: type1, // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
      propositions : [ // une ou plusieurs (Qcms) 'propositions'
        {
          texte: '',// Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm 
          statut: true,// true au false pour un QCM
          sanslignes: true, // facultatif. Permet d'enlever les lignes dans AMCOpen.
          feedback: '',
          reponse: { // utilisé si type = 'AMCNum'
            texte: 'le texte affiché au dessus du formulaire numerique dans AMC', //facultatif
            valeur: nombre, // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
            alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
            param: {
              digits: 3, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              signe: false, // obligatoire pour AMC (présence d'une case + ou -)
              exposantNbChiffres: 0, // facultatif (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant). Si la réponse est une puissance, exposantNbChiffres est le nombre de chiffres sur lequel on veut que AMC code l'exposant. Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur la plus adéquate.
              exposantSigne: false, // (présence d'une case + ou - pour l'exposant précédent)
              approx: 0, // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
              vertical : false, // facultatif. Si true, les cases à cocher seront positionnées verticalement
              nbCols : 4, // Ne fonctionne que si vertical est true. Indique le nb de colonnes dans lesquelles seront positionnées les cases à cocher.
              vhead : 'descriptif#1', // Ne fonctionne que si vertical est true. A commenter (ou supprimer) si vertical est false. Permet d'écrire au-dessus de la colonne de chaque série de cases à cocher un texte.
              tpoint : ',', // Facultatif. Permet dans AMCNum de remplacer la virgule par un autre séparateur décimal. 
              digitsNum : 2, // Facultatif. digitsNum correspond au nombre TOTAL de chiffres du numérateur à coder si la réponse est une fraction.
              digitsDen : 3, // Facultatif. digitsDencorrespond au nombre TOTAL de chiffres du dénominateur à coder si la réponse est une fraction.
              basePuissance : 5, // Si la réponse est une puissance, basePuissance correspond à la base de la réponse
              exposantPuissance : 34, // Si la réponse est une puissance, exposantPuissance correspond à l'exposant de la réponse
              baseNbChiffres : 2, // facultatif. Si la réponse est une puissance, baseNbChiffres est le nombre de chiffres sur lequel on veut que AMC code la base. Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur la plus adéquate. 
            }
          },
          options: {ordered: false, lastChoice: false} // options pour Qcms
        }
      ]
    },
    {
      type: type2, // on donne le type de la deuxième question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
      propositions : [ // une ou plusieurs (Qcms) 'propositions'
        {
          texte: '',// Facultatif. la proposition de Qcm ou ce qui est affiché dans le corrigé pour cette question quand ce n'est pas un Qcm 
          statut: true,// true au false pour un QCM
          sanslignes: true, // facultatif. Permet d'enlever les lignes dans AMCOpen.
          feedback: '',
          reponse: { // utilisé si type = 'AMCNum'
            texte: 'le texte affiché au dessus du formulaire numerique dans AMC', //facultatif
            valeur: nombre, // obligatoire (la réponse numérique à comparer à celle de l'élève). EE : Si une fraction est la réponse, mettre un tableau sous la forme [num,den]
            alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
            param: {
              digits: 3, // obligatoire pour AMC (le nombre de chiffres dans le nombre, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              decimals: 0, // obligatoire pour AMC (le nombre de chiffres dans la partie décimale du nombre, si decimals est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              signe: false, // obligatoire pour AMC (présence d'une case + ou -)
              exposantNbChiffres: 0, // facultatif (présence de x10^ pour AMC si >0 c'est le nombre de chiffres pour l'exposant). Si la réponse est une puissance, exposantNbChiffres est le nombre de chiffres sur lequel on veut que AMC code l'exposant. Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur la plus adéquate.
              exposantSigne: false, // (présence d'une case + ou - pour l'exposant précédent)
              approx: 0, // (0 = valeur exacte attendue, sinon valeur de tolérance (voir explication détaillée dans type AMCNum))
              vertical : false, // facultatif. Si true, les cases à cocher seront positionnées verticalement
              nbCols : 4, // Ne fonctionne que si vertical est true. Indique le nb de colonnes dans lesquelles seront positionnées les cases à cocher.
              vhead : 'descriptif#1', // Ne fonctionne que si vertical est true. A commenter (ou supprimer) si vertical est false. Permet d'écrire au-dessus de la colonne de chaque série de cases à cocher un texte.
              tpoint : ',', // Facultatif. Permet dans AMCNum de remplacer la virgule par un autre séparateur décimal. 
              digitsNum : 2, // Facultatif. digitsNum correspond au nombre TOTAL de chiffres du numérateur à coder si la réponse est une fraction.
              digitsDen : 3, // Facultatif. digitsDencorrespond au nombre TOTAL de chiffres du dénominateur à coder si la réponse est une fraction.
              basePuissance : 5, // Si la réponse est une puissance, basePuissance correspond à la base de la réponse
              exposantPuissance : 34, // Si la réponse est une puissance, exposantPuissance correspond à l'exposant de la réponse
              baseNbChiffres : 2, // facultatif. Si la réponse est une puissance, baseNbChiffres est le nombre de chiffres sur lequel on veut que AMC code la base. Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur la plus adéquate. 
            }
          },
          options: {ordered: false, lastChoice: false} // options pour Qcms
        }
      ]
    },
    {
        .... // et ainsi de suite pour toutes les questions-reponses
    } 
  ]
}
```


Pour le type `AMCHybride`, les possibilités étant si nombreuses qu'il ne faut pas hésiter à aller regarder le code d'un exercice dont la sortie peut correspondre à vos envies de programmeur et dont quelques exemples apparaissent ci-dessous.

|Exercices-témoins avec `AMCHybride`|TypeAMC utilisés|
|-----|-----|
|**2F32**|double usage de `AMCNum`|
|**3A14**|triple usage de `AMCNum`|
|**6N23-1**|quadruple usage de `AMCNum`|
|**6C10**|usage simple de `AMCOpen` et usage simple de `AMCNum`|
|**4G20-6**|usage de `AMCOpen` et double usage de `AMCNum`|
|**4G12**|usage multiple de `AMCOpen`|




## <a id="plusieurs_sorties" href="#plusieurs_sorties"></a> [4. Plusieurs sorties AMC différentes dans un même exercice](#plusieurs_sorties)

On peut aussi faire le choix de ne pas imposer à un utilisateur le choix d'un type AMC mais en proposer plusieurs. Un exercice-témoin de ce type est le **6C12** avec une sortie de type `AMCOpen`, une autre sortie de type `AMCNum` et enfin une dernière sortie de type `AMCHybride` avec un usage simple de `AMCOpen` et un usage simple de `AMCNum`.