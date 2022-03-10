Si vous êtes sur cette page, c'est que vous souhaitez rajouter à votre exercice de l'interactif. Bonne idée, vous êtes sur la bonne page ! Tant que vous y êtes, pensez aussi à rendre cet exercice exportable AMC même si vous n'utilisez pas AMC, certains seront ravis de découvrir cette opportunité dans votre exercice. Une fonctionnalité a été rajoutée pour créer, de façon extrèmement simple, un export AMC automatisé. Dans la plupart des cas, il y a très peu de codage à ajouter (parfois que deux lignes) pour rendre l'exercice exportable AMC. Pour cela, n'hésitez pas à lire le dernier chapitre : [Compatibilité entre l'interactivité et un export AMC](#compatibilite_interactivite_AMC).

---

MathAlea permet de rendre un exercice interactif. Directement sur l'interface Web, l'élève saisit une réponse (dans un champ, dans une liste déroulante, en cochant une case ou bien encore en cliquant sur une figure). Celle-ci est vérifiée automatiquement et le score de toutes les réponses à l'exercice peut éventuellement être récupéré par son professeur ([documentation de la gestion des scores](https://coopmaths.fr/mathalea.html?v=scores)).

---



 Les actions obligatoires à mener, pour permettre à un exercice d'être interactif, sont décrites ci-dessous et explicitées, plus bas, en détail.

1. [Charger le code nécessaire](#code_necessaire)
1. [Configurer le `typeInteractivite` choisi](#configurer_typeInteractivite)
    1. [`mathLive`](#typeInteractivite_mathLive)
        1. [Lignes de code spécifiques](#typeInteractivite_mathLive_lignescodespecifiques)
            1.  [`ajouteChampTexteMathLive()`](#ajouteChampTexteMathLive)
            1.  [`ajouteChampTexte()`](#ajouteChampTexte)
            1.  [`ajouteChampFractionMathLive()`](#ajouteChampFractionMathLive)
        1. [Détail de la fonction `setReponse()`](#typeInteractivite_mathLive_fonction_setReponse)
        1. [Gestion des différentes types de réponses attendues](#typeInteractivite_mathLive_types_reponses)
        1. [Comprendre pourquoi une réponse correcte est pourtant considérée fausse](#typeInteractivite_mathLive_debug)
        1. [Dans les exercices de la Course Aux Nombres](#typeInteractivite_mathLive_CAN)
        1. [Permettre plusieurs champs de réponse pour une même question](#typeInteractivite_mathLive_plusieurs_champs)
    1. [`qcm`](#typeInteractivite_qcm)
        1. [Lignes de code spécifiques](#typeInteractivite_qcm_lignescodespecifiques)
        1. [Construction des propositions de chaque QCM](#typeInteractivite_qcm_constructions_propositions)
        1. [Usage indispensable de la fonction `propositionsQcm()`](#typeInteractivite_qcm_fonction_propositionsQcm)
    1. [`numerique`](#typeInteractivite_numerique)
    1. [`cliqueFigure`](#typeInteractivite_cliqueFigure)
    1. [`listeDeroulante`](#typeInteractivite_listeDeroulante)
    1. [`custom`](#typeInteractivite_custom)
1. [Compatibilité entre l'interactivité et un export AMC](#compatibilite_interactivite_AMC)
    1. [L'export AMC automatisé avec `mathLive`](#export_AMC_automatise_mathLive)
        1. [Avec `formatInteractif : 'calcul'`](#export_AMC_automatise_mathLive_calcul)
        1. [Avec `formatInteractif: 'ecritureScientifique'`](#export_AMC_automatise_mathLive_ecritureScientifique)
        1. [Avec `formatInteractif : 'fraction'`](#export_AMC_automatise_mathLive_fraction)
        1. [Avec `formatInteractif : 'fractionPlusSimple'` ou `formatInteractif : 'fractionEgale'`](#export_AMC_automatise_mathLive_fractionEgale)
        1. [Avec `formatInteractif : 'intervalle'` ou `formatInteractif : 'intervalleStrict'`](#export_AMC_automatise_mathLive_intervalle)
        1. [Avec `formatInteractif : 'texte'`, `formatInteractif : 'ignorerCasse'` ou `formatInteractif : 'longueur'`](#export_AMC_automatise_mathLive_texte)
    1. [L'export AMC automatisé avec `qcm`](#export_AMC_automatise_qcm)
    1. [L'export AMC automatisé avec `cliqueFigure`](#export_AMC_automatise_cliqueFigure)
    1. [L'export AMC automatisé avec `listeDeroulante`](#export_AMC_automatise_listeDeroulante)
    1. [L'export AMC automatisé avec `custom`](#export_AMC_automatise_custom)

## <a id="code_necessaire" href="#code_necessaire"></a> [1. Charger le code nécessaire pour rendre un exercice interactif](#code_necessaire)


- Pour charger le code nécessaire pour rendre un exercice interactif, il faut ajouter ces deux lignes de code juste après les `import` du début du code de l'exercice :
>>```js
>>export const interactifReady = true // pour définir qu'exercice peut s'afficher en mode interactif.
>>export const interactifType = 'typeInteractivite'
>>```

- Même si le `typeInteractivite` le plus simple et rapide à utiliser pour rendre un exercice interactif est `'mathLive'`, on peut utiliser tous les choix décrits ci-dessous et détaillés plus bas.

|Choix de `'typeInteractivite'`|Description de ce choix|Exercices-témoins|
|-----|-----|-----|
|[`'mathLive'`](#typeInteractivite_mathLive)|pour proposer un champ de réponses avec un clavier virtuel et vérification possible d'égalité formelle|4C10-4|
|[`'qcm'`](#typeInteractivite_qcm)|pour proposer un qcm|5L10-2|
|[`'numerique'`](#typeInteractivite_numerique)|pour proposer une réponse numérique|4G20-2|
|[`'cliqueFigure'`](#typeInteractivite_cliqueFigure)|pour proposer des figures à cliquer|6G10-3|
|[`'listeDeroulante'`](#typeInteractivite_listeDeroulante)|pour proposer une liste déroulante avec la réponse et différents autres choix possibles|6N43-4|
|[`'custom'`](#typeInteractivite_custom)|pour proposer une réponse originale, différente des précédentes. |4G20-2|

- Pour définir le mode dans lequel l'exercice va s'afficher par défaut (interactif ou pas), on initialisera le booléen `this.interactif` placé de la sorte :
>> ```js
>> Exercice.call(this)
>> ..... // D'autres instructions
>> this.interactif = true // true : par défaut, l'exercice est interactif. false : par défaut, l'exercice n'est pas interactif
>> ..... // D'autres instructions
>> this.nouvelleVersion = function () {
>> ```

- La consigne de l'exercice peut être différente en interactif car on ne demandera pas, alors, par exemple, d'explications ou de justifications. Il faudra alors penser à remplacer la consigne initiale ainsi :
>> ```js
>> if (this.interactif) {
>>      this.consigne = "consigne pour exercice en interactif"
>> } else {
>>      this.consigne = "consigne pour exercice en non interactif"
>> }
>> ```

- Afin d'anticiper la mise place d'AMC automatisé ou d'AMC indépendant, il est recommandé d'ajouter l'initialisation de `autoCorrection` dès la création de `nouvelleVersion`, comme sont déjà faites celles de `listeQuestions` et de `listeCorrections`.
>> ```js
>> this.nouvelleVersion = function () {
>>      this.listeQuestions = [] // Liste de questions
>>      this.listeCorrections = [] // Liste de questions corrigées
>>      this.autoCorrection = []
>> ```


## <a id="configurer_typeInteractivite" href="#configurer_typeInteractivite"></a> [2. Configurer le `typeInteractivite` choisi](#configurer_typeInteractivite)

Selon le `typeInteractivite` choisi, la programmation est différente. Les paragraphes suivants détaillent chacune des configurations.

>>## <a id="typeInteractivite_mathLive" href="#typeInteractivite_mathLive"></a> [2. 1. `mathLive`](#typeInteractivite_mathLive)

MathLive est une technologie qui permet de proposer à l'élève un champ de réponses avec un clavier virtuel (pratique sur les téléphones portables).

Pour rendre un exercice interactif en utilisant MathLive, il faut rajouter des lignes de codes spécifiques décrites [ci-dessous](#typeInteractivite_mathLive_lignescodespecifiques). Ce fonctionnement suffit pour tout concepteur désireux d'introduire, a minima, une interactivité avec MathLive.

Les concepteurs plus curieux, trouveront, aussi, dans ce chapitre :
>> - [comment comprendre, par des exemples, le détail de traitement de la comparaison entre la réponse saisie par l'élève et la réponse exacte attendue](#typeInteractivite_mathLive_fonction_setReponse),
>> - [comment gérer une réponse sous forme de texte, sous forme d'une écriture scientifique, sous forme de fraction, sous forme d'intervalle, sous forme de longueur ou d'aire (avec l'unité adéquate)](#typeInteractivite_mathLive_types_reponses),
>> - [comment débugguer pourquoi une réponse correcte peut être pourtant considérée fausse](#typeInteractivite_mathLive_debug),
>> - [comment utiliser MathLive dans les exercices adaptés à la Course Aux Nombres](#typeInteractivite_mathLive_CAN),
>> - [comment permettre plusieurs champs de réponse pour une même question](#typeInteractivite_mathLive_plusieurs_champs).

>>>>## <a id="typeInteractivite_mathLive_lignescodespecifiques" href="#typeInteractivite_mathLive_lignescodespecifiques"></a> [2. 1. 1. Lignes de code spécifiques](#typeInteractivite_mathLive_lignescodespecifiques)

1. Rajouter un import dans l'en-tête comme ceci :
>>```js
>>import { setReponse } from '../../modules/gestionInteractif.js'
>>import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
>>export const interactifReady = true
>>export const interactifType = 'mathLive'
>>```
2. Initialiser la variable `setReponse` dans la boucle principale, pour chaque question. Par défaut, c'est de la sorte :
>>```js 
>>setReponse(this, i, resultat) 
>>```
>>Par défaut, `resultat` est une valeur numérique (donc sans formatage avec `texNombre` par exemple) ou bien un tableau de bons résultats possibles. On verra, [plus bas](#typeInteractivite_mathLive_types_reponses), que `resultat` peut être plus divers que cela (un texte, une fraction, une grandeur avec son unité) et les modifications à apporter alors.

3. Ajouter, pour chaque question, le champ de réponses parmi 3 choix possibles, après l'énoncé, de la sorte :
>>```js 
>> if (this.interactif) {   // Si l'exercice est interactif
>>      // Choix 1 (le plus courant)
>>      texte += ajouteChampTexteMathLive(this, i) // Fonctionnement par défaut
>>      // Choix 2
>>      texte += ajouteChampTexte(this, i) // Fonctionnement par défaut
>>      // Choix 3
>>      texte += ajouteChampFractionMathLive(this, i, false, false)
>> }


>>>>>>## <a id="ajouteChampTexteMathLive" href="#ajouteChampTexteMathLive"></a> [2. 1. 1. 1. `ajouteChampTexteMathLive()`](#ajouteChampTexteMathLive)

>>>>`ajouteChampTexteMathLive()` permet d'ajouter un champ ainsi qu'un clavier virtuel. C'est ce champ qui est le plus utilisé dans la conception interactive des exercices car il possède de nombreuses options comme :
>>>> - modifier sa longueur, voire proposer une longueur variable,
>>>> - forcer un retour à ligne ou non, devant le champ,
>>>> - obliger l'utilisateur à indiquer une unité, en plus de sa réponse numérique,
>>>> - proposer un clavier incluant des lettres grecques et les 3 principales fonctions trigonométriques,
>>>> - ôter l'espace par défaut, devant le champ,
>>>> - noter un texte avant et/ou après le champ.

>>```js 
>> // syntaxe de ajouteChampTexteMathLive() : ajouteChampTexteMathLive(this, i, {...options})
>>texte += ajouteChampTexteMathLive(this, i,'inline') // sans retour à la ligne 
>>texte += ajouteChampTexteMathLive(this, i,'longueur') // le champ de réponses oblige l'élève à remplir une valeur numérique ET une unité de longueur (ou d'aires). le clavier change et permet de saisir aussi des unités de longueur (ou d'aires).
>>texte += ajouteChampTexteMathLive(this, i,'grecTrigo') // introduction d'un clavier virtuel qui permet de saisir 9 lettres grecques différentes et les fonctions trigonométriques classiques. Avec cette option et sans ce clavier, on peut tout de même saisir une lettre grecque en tapant sur le clavier, par exemple, "alpha" pour obtenir la lettre grecque associée.
>>texte += ajouteChampTexteMathLive(this, i,'nospacebefore') // permet d'ôter l'espace qui, par défaut, précède le champ.
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur25 grecTrigo nospacebefore') // mélange possible des options précédentes. Options non compatibles : largeur25 avec fixed-width-150 et longueur avec grecTrigo
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur25',{ texte: 'avant' }) // écrit "avant" devant le champ de réponses
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur25',{ texteApres: 'après' }) // écrit "après" derrière le champ de réponses
>>texte += ajouteChampTexteMathLive(this, i,{ tailleExtensible: true }) // permet de rendre le champ de taille minuscule mais dont la taille augmente à la saisie pour s'adapter au contenu. Cette option rend caduque toutes les options qui ne sont pas dans les accolades, qu'elles soient indiquées ou non.
>>texte += ajouteChampTexteMathLive(this, i,{ texte: 'avant', texteApres: 'après', tailleExtensible: true }) // mélange possible des options entre accolades.
 >>```


>>>>>>## <a id="ajouteChampTexte" href="#ajouteChampTexte"></a> [2. 1. 1. 2. `ajouteChampTexte()`](#ajouteChampTexte)

>>>>`ajouteChampTexte()` permet d'ajouter un champ mais n'est associé à aucun clavier virtuel. Le remplissage de ce champ ne pourra se faire qu'avec le clavier de son ordinateur ou avec le clavier virtuel natif d'une tablette ou d'un Smartphone. Ce champ a été conçu dans MathALEA avant le champ induit par `ajouteChampTexteMathLive()` et il est préférable, sauf besoin particulier (comme dans la Course aux Nombres) de ne plus l'utiliser au profit de `ajouteChampTexteMathLive()`. 

>>```js 
>> // syntaxe de ajouteChampTexte() : ajouteChampTexte(this, i, {...options})
>>texte += ajouteChampTexte(this, i,'inline') // sans retour à la ligne 
>> // Il existe d'autres options, non indiquées ici...
>>```

>>>>>>## <a id="ajouteChampFractionMathLive" href="#ajouteChampFractionMathLive"></a> [2. 1. 1. 3. `ajouteChampFractionMathLive()`](#ajouteChampFractionMathLive)

>>>>`ajouteChampFractionMathLive()` a un usage particulier et ne sert que pour les fractions. Alors que `ajouteChampTexteMathLive()` permet de gérer les fractions comme un tout, `ajouteChampFractionMathLive()` permet de séparer la validation du numérateur et du dénominateur en créant deux champs différents. Dans d'autres cas, elle permet aussi d'aider l'utilisateur en lui signifiant le numérateur tout en créant un champ pour le dénominateur ou le contraire. `ajouteChampFractionMathLive()` met à disposition un clavier virtuel et crée des champs de taille extensible.

>>>>Exercice-témoin : **6N23-1**

>>```js 
>> // syntaxe de ajouteChampFractionMathLive() : ajouteChampFractionMathLive(this, i, numerateur, denominateur, {...options})
>>texte += ajouteChampFractionMathLive(this, i, false, false) // Une fraction avec deux champs, l'un pour le numérateur, l'autre pour le dénominateur
>>texte += ajouteChampFractionMathLive(this, i, false, 100) // Une fraction avec un seul champ pour le numérateur, le dénominateur valant ici 100.
>>texte += ajouteChampFractionMathLive(this, i, 8, false) // Une fraction avec un seul champ pour le dénominateur, le numérateur valant ici 8.
>>texte += ajouteChampFractionMathLive(this, i, false, false,{ texte: 'avant' }) // écrit "avant" devant les champs de réponses.
>>texte += ajouteChampFractionMathLive(this, i, false, false,{ texteApres: 'après' }) // écrit "après" derrière les champs de réponse.
>>```

>>>>## <a id="typeInteractivite_mathLive_fonction_setReponse" href="#typeInteractivite_mathLive_fonction_setReponse"></a>[2. 1. 2. Détail de la fonction `setReponse()`](#typeInteractivite_mathLive_fonction_setReponse)

Toutes les réponses sont traitées en comparant la saisie de l'élève avec la réponse (ou les réponses) choisie(s) par le concepteur de l'exercice qui utilise, pour cela, la fonction `setReponse()`.

- La syntaxe complète de la fonction `setReponse()` est la suivante :
>>```js
>>setReponse (this, i, a, {digits : 0, decimals : 0, signe : false, exposantNbChiffres : 0, exposantSigne : false, approx : 0, formatInteractif : 'calcul'}
>>```
>>Les 3 premiers paramètres sont obligatoires et désignent, respectivement, l'exercice appelant, le numéro de la question dans la programmation de l'exercice et la réponse attendue.

>>A cela, s'ajoutent toute sorte de paramètres optionnels dont la plupart servent uniquement afin de rendre un exercice exportable AMC, soit de [façon automatisée](#compatibilite_interactivite_AMC), soit de [façon autonome](tutorial-Rendre_un_exercice_exportable_AMC.html). Seul le dernier paramètre `formatInteractif` est pertinent ici et indique le type de réponses attendues. On verra son utilité au [prochain paragraphe](#typeInteractivite_mathLive_types_reponses).

- Le fonctionnement, par défaut, de la fonction `setReponse()` est de comparer des expressions des nombres ou des résultats de calcul, de façon intuitive. On remarque que `formatInteractif: 'calcul'` étant défini par défaut, on peut s'en passer.

>>```js
>>setReponse(this, i, 5.4)  // Pour comparer la réponse saisie avec le nombre 5.4
>>                          // équivalent à setReponse(this, i, 5.4,{ formatInteractif: 'calcul' })
>>
>> setReponse(this, i, [2, 3*6, 7/2])   // Pour comparer la réponse saisie avec tous ces nombres ou résultats de calcul
>>                                      // équivalent à setReponse(this, i, [2, 3*6, 7/2],{ formatInteractif: 'calcul' })
>>```

- Lorsque la réponse attendue contient des puissances, il y aura deux types

>>>>## <a id="typeInteractivite_mathLive_types_reponses" href="#typeInteractivite_mathLive_types_reponses"></a> [2. 1. 3. Gestion des différents types de réponses attendues](#typeInteractivite_mathLive_types_reponses)


- Pour comparer des **valeurs numériques**, on utilise la version par défaut `formatInteractif: 'calcul'`, présentée ci-dessus. Toutefois, si le résultat est attendu sous forme d'une écriture en notation scientifique, on utilisera plutôt `formatInteractif: 'ecritureScientifique'` présentée ci-dessous.


- Pour comparer des **nombres avec leur écriture scientifique**, on code, comme dans l'exercice-témoin **4C32** :

>>```js
>>setReponse(this, i, 'resultat', { formatInteractif: 'ecritureScientifique' }) // resultat = 3700 par exemple mais la réponse saisie devra être 3,7*10^3
>>```

- Pour comparer des **textes avec respect strict de la casse**, on code, comme dans l'exercice-témoin **2N14-1** :

>>```js
>>setReponse(this, i, 'resultat', { formatInteractif: 'texte' }) // resultat = 'KWh' par exemple
>>```

- Pour comparer des **textes sans respect de la casse**, on code, comme dans l'exercice-témoin **6C11-2** :

>>```js
>>setReponse(this, i, 'resultat', { formatInteractif: 'ignorerCasse' }) // resultat = 'Dividende' par exemple
>>```

- Pour comparer des **fractions** avec [`ajouteChampTexteMathLive`](#ajouteChampTexteMathLive), il y a trois méthodes différentes pour coder :
 
>>``` js
>> // Méthode 1 : Exercice-témoin 4C22
>>setReponse(this, i, maFractionReponse, { formatInteractif: 'fraction' }) // maFractionReponse doit être un objet fraction (créé avec new FractionX(n, d))
>> // Dans ce cas, la réponse fournie par l'élève doit être exactement égale à maFractionReponse.
>>
>> // Méthode 2 : Exercice-témoin 5N13
>>setReponse(this, i, maFractionReponse, { formatInteractif: 'fractionPlusSimple' }) // maFractionReponse doit être un objet fraction (créé avec new FractionX(n, d))
>> // Dans ce cas, la réponse fournie par l'élève doit forcément être simplifiée.
>> // Si maFractionReponse est 16/32, l'élève ne peut pas fournir 16/32 ou 160/320 comme bonne réponse mais peut fournir 8/16 ou 4/8.
>>
>> // Méthode 3 : Exercice-témoin 3L13-1
>>setReponse(this, i, maFractionReponse, { formatInteractif: 'fractionEgale' }) // maFractionReponse doit être un objet fraction (créé avec new FractionX(n, d))
>> // Dans ce cas, la réponse fournie par l'élève peut être une autre fraction ou un nombre décimal. 
>> // Si maFractionReponse est 1/2, l'élève peut toutefois fournir comme bonne réponse 2/4 ou bien 0.5.
>>```

- Pour comparer des **fractions** avec [`ajouteChampFractionMathLive`](#ajouteChampFractionMathLive), il y a trois méthodes différentes pour coder :
 
>>``` js
>> // Méthode 1 : Exercice-témoin 6N23-1
>> // Associée à ajouteChampFractionMathLive(this, i, false, 100)
>>setReponse(this, i, fraction(reponse, 100), { formatInteractif: 'Num' }) // Le champ n'est que sur le numérateur, le dénominateur vaut, ici, 100.
>>
>> // Méthode 2
>> // Associée à ajouteChampFractionMathLive(this, i, 8, false)
>>setReponse(this, i, fraction(8, reponse), { formatInteractif: 'Den' }) // Le champ n'est que sur le dénominateur, le numérateur vaut, ici, 8.
>>
>> // Méthode 3 : Exercice-témoin 6N23-1
>> // Associée à ajouteChampFractionMathLive(this, i, false, false)
>>setReponse(this, i, fraction(reponse1, reponse2), { formatInteractif: 'NumDen' }) // Il y a deux champs différents : un sur le numérateur et un autre sur le dénominateur.
>>```

- Pour comparer des **grandeurs (avec des unités)**, on code, comme dans l'exercice-témoin **6M11** :
>>``` js
>>setReponse(this, i, new Grandeur(resultat, 'cm'), { formatInteractif: 'longueur' }) // resultat est un nombre. On personnalisera le champ texte avec ajouteChampTexteMathLive(this, i, 'longueur')
>> // Pour utiliser Grandeur, il faudra penser à rajouter dans l'en-tête du fichier : import Grandeur from '../../modules/Grandeur.js'
>>```


- Pour comparer un nombre au sein d'un **intervalle**, on code, comme dans l'exercice-témoin **4S11** :
>>``` js
>> // Si les bornes de l'intervalle sont incluses
>>setReponse(this, i, [a, b], { formatInteractif: 'intervalle' }) 
>> // a est la borne inférieure de l'intervalle
>> // b est la borne supérieure de l'intervalle
>> 
>> // Si les bornes de l'intervalle sont exclues
>>setReponse(this, i, [a, b], { formatInteractif: 'intervalleStrict' }) 
>> // a est la borne inférieure de l'intervalle
>> // b est la borne supérieure de l'intervalle
>> 
>>```

>>>>## <a id="typeInteractivite_mathLive_debug" href="#typeInteractivite_mathLive_debug"></a> [2. 1. 4. Comprendre pourquoi une réponse correcte est pourtant considérée fausse](#typeInteractivite_mathLive_debug)

Le fonctionnement de MathLive peut parfois donner un résultat étonnant. Alors qu'on attend la réponse, "**1h45min**", `verifieQuestionMathLive` peut attendre "**1h45\\min**" par exemple.

Si le concepteur de l'exercice se trouve dans la situation où une réponse correcte est considérée fausse, voici la procédure à suivre pour trouver la raison :
* Ouvrir l'inspecteur (CTRL+MAJ+C sur Firefox et Chrome, Command+Option+I sur Safari).
* Sur l'onglet débugueur, chercher dans l'onglet sources `webpack/src/js/modules/interactif/questionMathLive.js`.
* En supposant que je formatInteractif est `calcul`, mettre un point d'arrêt sur la ligne 55 (numéro actuel de ligne mais sous réserve de non-rajout de code au-dessus évidemment) juste après le `let saisie = champTexte.value` (clic droit sur 55 puis sur Ajouter un point d'arrêt).
* Cliquer sur Actualiser.
* Saisir la réponse attendue dans le champ et valider la saisie.
* Mettre le curseur sur `saisie` pour visualiser la saisie qu'il a récupéré comme sur cette [capture d'écran](img/Interactif-1.png).

>>>>## <a id="typeInteractivite_mathLive_CAN" href="#typeInteractivite_mathLive_CAN"></a> [2. 1. 5. Dans les exercices de la Course Aux Nombres](#typeInteractivite_mathLive_CAN)

Exercice-témoin : **can6C15**

Les exercices utilisables dans la Course Aux Nombres sont des exercices avec `this.typeExercice = 'simple'`.

L'utilisation de MathLive au sein de ces exercices nécessitent ces actions :
* Mettre l'énoncé dans `this.question`.
* Mettre la correction dans `this.correction`.
* Mettre la réponse attendue dans `this.reponse`.
Si le format de MathLive par défaut ne convient pas, on peut le changer. Pour cela, il suffit de placer après `Exercice.call(this)` :
>>* `this.formatInteractif = ` et de compléter avec un des formats vus [ci-dessus](typeInteractivite_mathLive_types_reponses).
>>* `this.formatChampTexte = 'largeur10 inline'` pour personnaliser le champ de réponse (10 % de la largeur sans retour à la ligne, dans cet exemple).
>>* `this.optionsChampTexte = { texte: 'l = ', texteApres: ' cm'}` permet d'avoir du texte avant et après le champ de réponse.

>>>>## <a id="typeInteractivite_mathLive_plusieurs_champs" href="#typeInteractivite_mathLive_plusieurs_champs"></a> [2. 1. 6. Permettre plusieurs champs de réponse pour une même question](#typeInteractivite_mathLive_plusieurs_champs)

Exercice-témoin : **3F12-3**

Il est possible d'avoir plusieurs champs de réponse pour une même question.

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

>>## <a id="typeInteractivite_qcm" href="#typeInteractivite_qcm"></a> [2. 2. `qcm`](#typeInteractivite_qcm)

Exercice-témoin : **5L10-2**

Pour rendre un exercice interactif en utilisant `qcm` et en permettant, aux élèves, de choisir une bonne réponse parmi plusieurs propositions, il faut rajouter des nouvelles lignes de code, construire les propositions de chaque question du QCM et avoir recours à la fonction `propositionsQcm()` qui crée les cases à cocher.

>>>>## <a id="typeInteractivite_qcm_lignescodespecifiques" href="#typeInteractivite_qcm_lignescodespecifiques"></a> [2. 2. 1. Lignes de code spécifiques](#typeInteractivite_qcm_lignescodespecifiques)

Rajouter un import dans l'en-tête comme ceci :
>>```js
>>import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
>>export const interactifReady = true
>>export const interactifType = 'qcm'
>>```

>>>>## <a id="typeInteractivite_qcm_constructions_propositions" href="#typeInteractivite_qcm_constructions_propositions"></a>[2. 2. 2. Construction des propositions de chaque QCM](#typeInteractivite_qcm_constructions_propositions)

Pour chaque question, un QCM sera créé et constitué de plusieurs cases à cocher, correspondant chacune à une proposition de réponse. La configuration et le contenu des propositions de réponses se font pendant la définition de la correction via le tableau `this.autoCorrection`. L'indice de ce tableau correspond au numéro de la question. Le code générique ressemble à celui-ci :

>>```js
>>this.autoCorrection[i] = {
>>  enonce: 'la question n°i est posée ici',
>>  propositions: [
>>    {
>>      texte: 'première proposition du QCM écrite à droite de la case à cocher',
>>      statut: true, // true ou false pour indiquer si c'est une bonne réponse (true)
>>      feedback: 'message1' // qui s'affichera si la réponse est juste ou s'il n'y a qu'une erreur
>>    },
>>    {
>>      texte: 'deuxième proposition du QCM écrite à droite de la case à cocher',
>>      statut: false, // true ou false pour indiquer si c'est une bonne réponse (true)
>>      feedback: 'message1'
>>    },
>>    {
>>    } //.... autant de fois qu'il y a de propositions dans le qcm
>>  ],
>>  options: {
>>      ordered: true, // (true si les réponses doivent rester dans l'ordre ci-dessus, false s'il faut les mélanger),
>>      lastChoice: index, // (en cas de mélange, l'index à partir duquel les propositions restent à leur place, souvent le dernier choix par défaut)
>>                      // Cet index a tout son intérêt s'il existe une dernière proposition du genre "aucune des propositions n'est correcte".
>>      vertical: true, // facultatif. true : si on veut une présentation en plusieurs colonnes. false : valeur par défaut, les cases à cocher sont à la suite, toutes sur une colonne. Exercice-témoin : can5A01
>>      nbCols: 4, // Le nb de colonnes si vertical est true. Sans effet si vertical est false.
>>      vhead : 'descriptif#1', // Ne fonctionne que si vertical est true. Permet d'écrire au-dessus de la colonne de chaque série de cases à cocher un texte.             
>>  }
>>}
>>```

>>>>## <a id="typeInteractivite_qcm_fonction_propositionsQcm" href="#typeInteractivite_qcm_fonction_propositionsQcm"></a>[2. 2. 3. Usage indispensable de la fonction `propositionsQcm()`](#typeInteractivite_qcm_fonction_propositionsQcm)

- Il est indispensable de faire appel à la fonction qui crée les cases à cocher, il s'agit de la fonction `propositionsQcm()`.

>> Elle retourne un objet `{ texte, texteCorr }` qui, pour chaque case à cocher du QCM, contient, d'une part, son codage HTML et son énoncé (`texte`) et, d'autre part, sa correction (`texteCorr`). Cet énoncé et, facultativement, cette correction sont à inclure dans l'énoncé global et la correction globale de l'exercice.

- L'appel de la fonction `propositionsQcm()` et l'usage de `texte` et `texteCorr` se font de la manière suivante :
>>```js
>>monQcm = propositionsQcm(this, i) // Les deux paramètres sont obligatoires et désignent, respectivement, l'exercice appelant, le numéro de la question dans la programmation de l'exercice.
>> if (this.interactif) {
>>        enonce = enonce + monQcm.texte // enonce est l'énoncé global de l'exercice
>>        texteCorr = monQcm.texteCorr // texteCorr est la correction globale de l'exercice
>> }
>>```

>> La correction `texteCorr` est simplement la case cochée ou non cochée selon que la proposition associée est correcte ou pas. De ce fait, certains concepteurs d'exercice n'utilisent pas cette correction et préfèrent utiliser la correction habituelle, celle sans intervention d'interactivité. Auquel cas, dans l'exemple ci-dessus, il suffit d'enlever la dernière ligne.

- Il est important, de **NE PAS REPRODUIRE** le code ci-dessous :
>>```js 
>> if (this.interactif) {
>>        enonce = enonce + propositionsQcm(this, i).texte  // MAUVAIS CODAGE VOLONTAIRE : NE PAS RECOPIER
>>        texteCorr = propositionsQcm(this, i).texteCorr    // MAUVAIS CODAGE VOLONTAIRE : NE PAS RECOPIER
>> }
>>```
>> En effet, comme la fonction `propositionsQcm()` produit un objet `{texte, texteCorr}` à chaque appel ; si on l'appelle 2 fois, on brasse 2 fois les propositions, et l'ordre des réponses ne sera, alors, pas le même que celui qui est affiché et donc celui sur lequel on clique.



>>## <a id="typeInteractivite_numerique" href="#typeInteractivite_numerique"></a> [2. 3. `numerique`](#typeInteractivite_numerique)

Octobre 2021 : Le type `numerique` est à proscrire au profit de `mathLive`. Ce type est uniquement dans cette documentation car encore en place dans des exercices plus anciens.


>>## <a id="typeInteractivite_cliqueFigure" href="#typeInteractivite_cliqueFigure"></a> [2. 4. `cliqueFigure`](#typeInteractivite_cliqueFigure)

Exercice-témoin : **6G10-3**

Ici, l'élève devra cliquer sur une figure pour signaler sa réponse. Le concepteur de l'exercice aura créé un tableau contenant toutes les références aux différentes figures, associées chacune à un identifiant unique et à un booléen de bonne ou mauvaise réponse. Ensuite, c'est la fonction `resultatCheckEx()` qui gère la partie interactive.

>>## <a id="typeInteractivite_listeDeroulante" href="#typeInteractivite_listeDeroulante"></a> [2. 5. `listeDeroulante`](#typeInteractivite_listeDeroulante)

Exercice-témoin : **6N43-4**

Ici, l'élève devra sélectionner une réponse dans un menu déroulant dont les différentes options sont définies, par le créateur de l'exercice, par la fonction `choixDeroulant()`.

>>```js
>>texte = 'Choisir une bonne réponse parmi ' + choixDeroulant(this, i, 0, [a, b, c, d]) // Si on veut avoir plusieurs menus déroulants dans la même question, il suffit d'incrémenter le troisième paramètre comme choixDeroulant(this, i, 1, [a, b, c, d]) (voir ex. 6N43-4)
>>texteCorr = `Les bonnes réponses sont ${a} et ${d}.`
>>setReponse(this, i, [a, d]) // S'il y a plusieurs menus déroulants, le troisième paramètre peut être une liste de listes comme setReponse(this, i, [[a, d], [c, d])
>>```


>>## <a id="typeInteractivite_custom" href="#typeInteractivite_custom"></a> [2. 6. `custom`](#typeInteractivite_custom)

Exercices-témoins : **6I12**, **5R11-2**, **6N11-2**, **6N21**, **6N30-2**

Le type `custom` est réservé aux concepteurs avertis. Il n'a pas de syntaxe particulière et sa programmation est propre à chaque concepteur. Les divers exercices-témoins peuvent témoigner de cette hétérogénéité et donner cours à l'inspiration pour d'autres exercices interactifs.

## <a id="compatibilite_interactivite_AMC" href="#compatibilite_interactivite_AMC"></a> [3. Compatibilité entre l'interactivité et un export AMC](#compatibilite_interactivite_AMC)

Historiquement, la sortie des premiers exercices exportables AMC est plus précoce que la mise en place de l'interactivité dans les exercices. De ce fait, il existe une documentation indépendante qui permet de rendre un [exercice exportable AMC](tutorial-Rendre_un_exercice_exportable_AMC.html). L'interactivité et l'export AMC sont, donc, deux compléments d'exercices qui peuvent être indépendants.

Toutefois, la création de l'interactivité dans un exercice, quel que soit le type d'interactivité choisi, permet de créer un **export AMC automatisé** par l'ajout de très peu de lignes de codes supplémentaires et sans aucune connaissance d'AMC. C'est ce codage qu'il ne faut pas hésiter de mettre en place quand on vient de rendre un exercice interactif.

De ce fait, lorsqu'on conçoit un exercice interactif, il serait bien de penser immédiatement à son passage en AMC et de prendre la précaution suivante.

>>```js
>> // Il serait bon de remplacer tous les conditionnels de ce style :
>> if (this.interactif) { // A EVITER
>>    ........
>> }
>>
>> // par ce code là :
>> if (this.interactif && !context.isAmc) { // A RECOMMANDER
>>    ........
>> }
>>
>> // Cette remarque est d'ordre général, il peut y avoir des cas particuliers, notamment pour les AMCNum.
>>```


>>## <a id="export_AMC_automatise_mathLive" href="#export_AMC_automatise_mathLive"></a> [3. 1. L'export AMC automatisé avec `mathLive`](#export_AMC_automatise_mathLive)

Une fois qu'un exercice est interactif avec MathLive, quel que soit le formatInteractif choisi, l'export AMC automatisé est réalisable en très peu d'ajout de lignes de code. Souvent, deux lignes de codes suffisent ! En effet, grâce à la gestion anticipée de l'export AMC, certaines informations programmées lorsqu'on rend un exercice interactif sont également fournies instantanément à l'export AMC. De ce fait, très peu d'informations sont à rajouter pour qu'un export AMC soit fonctionnel.

Si le concepteur de l'exercice souhaite un export AMC plus personnalisé, il se reportera à la méthode indépendante de rendre un [exercice exportable AMC](tutorial-Rendre_un_exercice_exportable_AMC.html).

**Remarque importante** : Si, en interactif, MathLive gère sans problème, via `setReponse`, un tableau de bonnes réponses, l'export AMC automatisé sera moins fonctionnel puisque AMC ne pouvant coder qu'une seule réponse, seule la première réponse du tableau sera considérée comme correcte dans AMC par ce procédé. Il faudra, soit changer la consigne pour l'export AMC, soit programmmer l'[export AMC de façon plus personnalisée](tutorial-Rendre_un_exercice_exportable_AMC.html).

L'utilisation de `ajouteChampTexteMathLive` est propre à l'interactivité avec MathLive d'un exercice et non à un export pour AMC.

De ce fait, pour permettre une bonne cohabitation entre l'interactivité avec MathLive et l'export automatisé pour AMC, il est important de faire attention au code suivant :

>>```js
>> // En interactif, il serait bon de ne jamais programmer ainsi :
>> texte = ajouteChampTexteMathLive(......)     // A EVITER
>>
>> // mais plutôt comme ceci :
>> if (this.interactif && !context.isAmc) {     // A RECOMMANDER
>>      texte += ajouteChampTexteMathLive(......)     // Noter bien ici le +=
>> }
>>```

>>>>## <a id="export_AMC_automatise_mathLive_calcul" href="#export_AMC_automatise_mathLive_calcul"></a> [3. 1. 1. Avec `formatInteractif : 'calcul'`](#export_AMC_automatise_mathLive_calcul)

Supposons, par exemple, que votre exercice interactif exploite les réponses sous forme d'un nombre avec `formatInteractif : 'calcul'` (ou rien puisque c'est le format par défaut) et que vous utilisiez :

>>```js
>>setReponse(this, i, reponse) // ou bien setReponse(this, i, reponse,{formatInteractif: 'calcul'})
>>```

Alors, rendre l'exercice exportable AMC, est **instantané** (sauf pour les puissances) si on rajoute, avec les autres export/import, **seulement ces deux lignes** de code.
>>```js
>>export const amcReady = true // pour définir que l'exercice est exportable AMC
>>export const amcType = 'AMCNum'
>>```

L'export AMC possèdera un nombre à coder où le nombre de chiffres sera automatiquement détecté par la bonne réponse à fournir ainsi que le signe du nombre.

Si toutefois, le concepteur de l'exercice trouve que donner le nombre exact de chiffres du nombre-solution et le signe est une aide trop importante pour l'élève, il pourra imposer lui-même le nombre de chiffres et le choix du signe de la façon suivante.

>>```js
>>setReponse(this, i, reponse, {digits: 6, decimals: 5, signe: true}) // ou bien setReponse(this, i, reponse,{digits: 6, decimals: 5, signe: true, formatInteractif: 'calcul'})
>> // digits correspond au nombre TOTAL de chiffres du nombre à coder.
>> // decimals correspond au nombre de chiffres de la partie décimale du nombre à coder.
>> // signe correspond à la présence ou non du codage pour le signe positif ou négatif.
>> // Chacun de ces paramètres est facultatif. Ne pas en mettre, c'est laisser la place à la valeur idéale.
>>```

**Remarque** : Si digits et decimals sont mal renseignés (par exemple, digits=3 et decimals=1 pour coder le nombre 456,17), alors ces valeurs ne seront pas prises en compte et les valeurs, par défaut, seront utilisés (dans l'exemple ci-dessus, digits=5 et decimals=2).

Dans le cas où le concepteur souhaite que, sur AMC, la réponse numérique soit donnée sous forme d'**une puissance**, alors on doit préciser à AMC à la fois la base et à la fois l'exposant pour que les deux puissent être codés. Il suffira, pour cela, de **rajouter** à `setReponse()` des paramètres comme dans le code de l'exemple suivant.


>>```js
>> baseReponse = 2          // Ceci est un exemple pour illustrer le code ci-dessous.
>> exposantReponse = 46     // Ceci est un exemple pour illustrer le code ci-dessous.
>> setReponse(this, i, baseReponse ** exposantReponse, { basePuissance: baseReponse, exposantPuissance: exposantReponse, baseNbChiffres: 2, exposantNbChiffres: 3})
>> // basePuissance correspond à la base de la réponse
>> // exposantPuissance correspond à l'exposant de la réponse
>> // baseNbChiffres est facultatif et est le nombre de chiffres sur lequel on veut que AMC code la base.
>> //   Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur par défaut (ici 1).
>> // exposantNbChiffres est facultatif et est le nombre de chiffres sur lequel on veut que AMC code l'exposant.
>> //   Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur par défaut (ici 2).
>>```


>>>>## <a id="export_AMC_automatise_mathLive_ecritureScientifique" href="#export_AMC_automatise_mathLive_ecritureScientifique"></a> [3. 1. 2. Avec `formatInteractif : 'ecritureScientifique'`](#export_AMC_automatise_mathLive_ecritureScientifique)


Supposons, par exemple, que votre exercice interactif exploite les réponses sous forme d'un nombre en écriture scientifique avec `formatInteractif : 'ecritureScientifique'` et que vous utilisiez :

>>```js
>>setReponse(this, i, reponse, {formatInteractif: 'ecritureScientifique'})
>>```


Alors, rendre l'exercice exportable AMC, doit commencer par l'ajout des deux lignes de code suivants, avec les autres export/import.
>>```js
>>export const amcReady = true // pour définir que l'exercice est exportable à AMC
>>export const amcType = 'AMCNum'
>>```


Ensuite, on doit préciser à AMC qu'il faut coder à la fois la mantisse et à la fois l'exposant, sans avoir besoin de rajouter ces informations. Il suffira, pour cela, de **rajouter** à `setReponse()` des paramètres comme dans le code de l'exemple suivant.


>>```js
>> reponse = 87.46 // Ceci est un exemple pour illustrer le code ci-dessous.
>> setReponse(this, i, reponse, { digits: 3, decimal: 4, signe: false, exposantNbChiffres: 2, exposantSigne: true, formatInteractif: 'ecritureScientifique'})
>> // digits est facultatif et correspond au nombre total de chiffres sur lequel on veut que AMC code la mantisse.
>> //   Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur par défaut (sur l'exemple, 4).
>> // decimal est facultatif et correspond au nombre de chiffres de la partie décimale sur lequel on veut que AMC code la mantisse.
>> //   Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur par défaut (ici 3).
>> // signe est facultatif et vaut true ou false selon que l'on veut que sur AMC, la case à cocher du signe de la mantisse apparaisse ou pas.
>> // exposantNbChiffres est facultatif et est le nombre de chiffres sur lequel on veut que AMC code l'exposant.
>> //   Si cette valeur est trop petite ou absente, elle sera automatiquement adaptée pour être la valeur par défaut (ici 1).
>> // exposantsigne est facultatif et vaut true ou false selon que l'on veut que sur AMC, la case à cocher du signe de l'exposant apparaisse ou pas.
>>```

On pourrait très bien souhaiter une réponse AMC en notation scientifique, dans `formatInteractif: 'calcul'`. Alors, il suffirait alors d'insérer le code ci-dessus en supprimant `formatInteractif: 'ecritureScientifique'`.

>>>>## <a id="export_AMC_automatise_mathLive_fraction" href="#export_AMC_automatise_mathLive_fraction"></a> [3. 1. 3. Avec `formatInteractif : 'fraction'`](#export_AMC_automatise_mathLive_fraction)

Supposons, par exemple, que votre exercice interactif exploite les réponses sous forme d'une fraction avec `formatInteractif : 'fraction'` et que vous utilisiez :

>>```js
>>setReponse(this, i, new FractionX(n, d), {formatInteractif: 'fraction'})
>>```

Alors, rendre l'exercice exportable AMC, est **instantané** si on rajoute, avec les autres export/import, **seulement ces deux lignes** de code.
>>```js
>>export const amcReady = true // pour définir que l'exercice est exportable AMC
>>export const amcType = 'AMCNum'
>>```

L'export AMC possèdera deux nombres à coder où le nombre de chiffres sera automatiquement détecté par la bonne réponse à fournir.

Si toutefois, le concepteur de l'exercice trouve que, dans AMC, donner le nombre exact de chiffres à coder du numérateur et du dénominateur ou donner le signe de la fraction est une aide trop importante pour l'élève, il pourra imposer lui-même le nombre de chiffres (digits) au numérateur et au dénominateur.

* Si on souhaite imposer un même nombre de chiffres au numérateur et au dénumérateur, il faut aussi agir sur `setReponse` mais coder de la façon suivante :

>>```js
>>setReponse(this, i, reponse, {digits: 3, signe: true, formatInteractif: 'fraction'}) // Pour imposer 3 chiffres, ici, au numérateur et au dénominateur.
>> // digits correspond au nombre TOTAL de chiffres du nombre à coder.
>> // signe correspond à la présence ou non du codage pour le signe positif ou négatif.
>>```

* Si on ne souhaite pas imposer un même nombre de chiffres au dénominateur et au numérateur, il faut aussi agir sur `setReponse` mais coder de la façon suivante :

>>```js
>>setReponse(this, i, reponse, {digitsNum: 3, digitsDen: 2, signe: true, formatInteractif: 'fraction'}) // Pour imposer, ici, 3 chiffres au numérateur et 2 chiffres au dénominateur.
>>// digitsNum correspond au nombre TOTAL de chiffres du numérateur à coder.
>>// digitsDen correspond au nombre TOTAL de chiffres du dénominateur à coder.
>>```

**Remarque** : Si le nombre choisi de chiffres est trop petit par rapport au nombre à coder (digits=2 alors que le nombre à coder est 236), alors ce nombre de chiffres sera automatiquement remis à la valeur minimale (3, dans l'exemple précédent).

>>>>## <a id="export_AMC_automatise_mathLive_fractionEgale" href="#export_AMC_automatise_mathLive_fractionEgale"></a> [3. 1. 4. Avec `formatInteractif : 'fractionPlusSimple'` ou `formatInteractif : 'fractionEgale'`](#export_AMC_automatise_mathLive_fractionEgale)


Supposons, par exemple, que votre exercice interactif exploite les réponses sous forme d'une fraction avec `formatInteractif : 'fractionPlusSimple'` ou `formatInteractif : 'fractionEgale'` et que vous utilisiez :

>>```js
>> resultat = fraction(60,40)
>> setReponse(this, i, resultat, {formatInteractif: 'fractionPlusSimple'}) // Plusieurs bonnes réponses sont possibles comme par exemple : 3/2, 6/4 ou 30/20
>>
>> // ou bien
>>
>> resultat = fraction(6,4)
>> setReponse(this, i, resultat, {formatInteractif: 'fractionEgale'}) // Une infinité de bonnes réponses est possible comme par exemple : 3/2, 6/4, 30/20 ou 1.5
>>```

Alors, rendre l'exercice exportable AMC, doit commencer par l'ajout des deux lignes de code suivants, avec les autres export/import.
>>```js
>>export const amcReady = true // pour définir que l'exercice est exportable à AMC
>>export const amcType = 'AMCNum'
>>```

L'export AMC possèdera deux nombres à coder où le nombre de chiffres sera automatiquement détecté par la bonne réponse à fournir.

Cette fois-ci, **ce rajout de code n'est toutefois pas suffisant**, car, dans chaque cas ici, il n'existe pas de réponse unique et AMC ne sait tester qu'une réponse unique.
Donc il faudra imposer à l'export AMC une unique solution (par exemple, la fraction irréductible) et changer éventuellement la consigne par rapport à l'énoncé (pour exiger, par exemple, une fraction irréductible). Le code ci-dessous décrit ce fonctionnement.

>>```js
>> if (context.isAmc) {
>>      resultat = fraction(6,4)
>>      setReponse(this, i, resultat.simplifie(), {formatInteractif: 'fractionPlusSimple'}) // ou bien setReponse(this, i, resultat.simplifie(), {formatInteractif: 'fractionEgale'})
>> 
>>      this.consigne = "Donner la réponse sous forme d'une fraction irréductible"
>> }
>>
>>```

* **Remarque** : L'usage de `context.isAmc` nécessite en en-tête du code de l'exercice d'avoir à insérer :
>>```js
>> import { context } from '../../modules/context.js'
>>```

Ce codage ci-dessus est parfaitement fonctionnel mais est tellement bien fait que si la bonne réponse attendue est 3/2, alors AMC proposera, dans AMC, un dénominateur à coder à un chiffre et un numérateur à coder à un chiffre, ce qui peut être une aide pour les élèves et qu'on ne souhaite pas fournir.

* Si on souhaite imposer un même nombre de chiffres au numérateur et au dénumérateur, il faut aussi agir sur `setReponse` mais coder de la façon suivante :

>>```js
>>setReponse(this, i, reponse, {digits: 3, signe: true, formatInteractif: 'fractionPlusSimple'})
>> // ou bien
>>setReponse(this, i, reponse, {digits: 3, signe: true, formatInteractif: 'fractionEgale'}) // Pour imposer 3 chiffres, ici, au numérateur et au dénominateur.
>> // digits correspond au nombre TOTAL de chiffres du nombre à coder.
>> // signe correspond à la présence ou non du codage pour le signe positif ou négatif.
>>```

* Si on ne souhaite pas imposer un même nombre de chiffres au dénominateur et au numérateur, il faut aussi agir sur `setReponse` mais coder de la façon suivante :

>>```js
>>setReponse(this, i, reponse, {digitsNum: 3, digitsDen: 2, signe: true, formatInteractif: 'fractionPlusSimple'})
>> // ou bien
>>setReponse(this, i, reponse, {digitsNum: 3, digitsDen: 2, signe: true, formatInteractif: 'fractionEgale'}) // Pour imposer, ici, 3 chiffres au numérateur et 2 chiffres au dénominateur.
>>// digitsNum correspond au nombre TOTAL de chiffres du numérateur à coder.
>>// digitsDen correspond au nombre TOTAL de chiffres du dénominateur à coder.
>>```


>>>>## <a id="export_AMC_automatise_mathLive_intervalle" href="#export_AMC_automatise_mathLive_intervalle"></a> [3. 1. 5. Avec `formatInteractif : 'intervalle'` ou `formatInteractif : 'intervalleStrict'`](#export_AMC_automatise_mathLive_intervalle)

**Exercice-témoin pour 'texte' : 4S11**


Supposons, par exemple, que votre exercice interactif exploite les réponses sous forme d'un nombre compris dans un intervalle avec `formatInteractif : 'intervalle'` ou `formatInteractif : 'intervalleStrict'` et que vous utilisiez :

>>```js
>> setReponse(this, i, [-1, 3], {formatInteractif: 'intervalle'}) // Toute réponse entre -1 et 3, bornes incluses, est acceptée.
>>
>> // ou bien
>>
>> setReponse(this, i, [-1, 3], {formatInteractif: 'intervalleStrict'}) // Toute réponse entre -1 et 3, bornes exclues, est acceptée.
>>```

Alors, rendre l'exercice exportable AMC, doit commencer par l'ajout des deux lignes de code suivants, avec les autres export/import.
>>```js
>>export const amcReady = true // pour définir que l'exercice est exportable à AMC
>>export const amcType = 'AMCNum'
>>```

L'export AMC possèdera un nombre à coder, correct dans l'intervalle voulu, où le nombre de chiffres, par défaut, sera celui de la valeur du milieu de l'intervalle.

Cette fois-ci, **ce rajout de code n'est toutefois pas suffisant**, car, dans chaque cas ici, il n'existe pas de réponse unique et AMC ne sait tester qu'une réponse unique.
Donc il faudra imposer à l'export AMC une unique solution (ce sera la valeur du milieu de l'intervalle) et préciser l'écart accepté entre la réponse fournie par l'élève et la valeur du milieu de l'intervalle (ce sera donc la demi-valeur de l'intervalle) . Le code ci-dessous décrit ce fonctionnement.

>>```js
>> // Pour le formatInteractif : 'intervalle'
>> setReponse(this, i, [a,b], {milieuIntervalle: calcul((a+b)/2), approx:calcul((b-a)/2), formatInteractif: 'intervalle'})
>>
>> // Pour le formatInteractif : 'intervalleStrict'
>> setReponse(this, i, [a,b], {milieuIntervalle: calcul((a+b)/2), approx:calcul((b-a)/2-0.00001), formatInteractif: 'intervalleStrict'})
>>```

Si on souhaite imposer le nombre de chiffres à coder dans la partie entière et dans la partie décimale, on codera de la façon suivante.

>>```js
>> // Pour le formatInteractif : 'intervalle'
>> setReponse(this, i, [a,b], {digits: 5, decimals: 3, milieuIntervalle: calcul((a+b)/2), formatInteractif: 'intervalle'})
>> // Dans cet exemple, il y a aura au minimum 3 décimales pour 5 chiffres en tout (donc 2 pour la partie entière)
>> // digits est facultatif et est le nombre minimal de chiffre total du nombre à coder.
>> // decimals est facultatif et est le nombre minimal de chiffre de la partie décimale du nombre à coder.
>>
>> // Pour le formatInteractif : 'intervalleStrict'
>> setReponse(this, i, [a,b], {digits: 5, decimals: 3, milieuIntervalle: calcul((a+b)/2), approx: 'intervalleStrict', formatInteractif: 'intervalle'})
>> // Dans cet exemple, il y a aura au minimum 3 décimales pour 5 chiffres en tout (donc 2 pour la partie entière)
>> // digits est facultatif et est le nombre minimal de chiffre total du nombre à coder.
>> // decimals est facultatif et est le nombre minimal de chiffre de la partie décimale du nombre à coder.
>> // approx: 'intervalleStrict' est obligatoire si on ne souhaite pas inclure les bornes de l'intervalle
>>```

>>>>## <a id="export_AMC_automatise_mathLive_texte" href="#export_AMC_automatise_mathLive_texte"></a> [3. 1. 6. Avec `formatInteractif : 'texte'`, `formatInteractif : 'ignorerCasse'` ou `formatInteractif : 'longueur'`](#export_AMC_automatise_mathLive_texte)

**Exercice-témoin pour 'texte' : 2N14-1**

**Exercice-témoin pour 'ignorerCasse' : 6C11-2**

Alors, rendre l'exercice exportable AMC, est **instantané** si on rajoute, avec les autres export/import, seulement ces deux lignes de code.
>>```js
>>export const amcReady = true // pour définir que l'exercice est exportable AMC
>>export const amcType = 'AMCOpen'
>>```


L'export AMC possèdera une zone de texte que l'enseignant codera après correction

Trois lignes sont, par défaut, définies pour chaque zone de texte. Si le concepteur de l'exercice souhaite avoir un nombre de lignes différent, il pourra coder ainsi, dans son exercice :
>>```js
>>if (context.isAmc) {
>>        this.autoCorrection[i].propositions = [{ texte: this.listeCorrections[i], statut: '1' }] // Ici, une seule ligne pour chaque zone de texte
>>}
>>```


>>## <a id="export_AMC_automatise_qcm" href="#export_AMC_automatise_qcm"></a> [3. 2. L'export AMC automatisé avec `qcm`](#export_AMC_automatise_qcm)

**Exercice-témoin : 5N14**

A peu de choses près, la conception d'un QCM interactif est semblable à la conception d'un QCM pour AMC. Donc avis aux concepteurs, ne pas négliger la sortie AMC si vous concevez un QCM interactif puisqu'à deux lignes de codes près, il n'y a rien à rajouter.

Rendre l'exercice exportable AMC, est **instantané** si on rajoute, avec les autres export/import, **seulement ces deux lignes** de code.
>>```js
>>export const amcReady = true // pour définir que l'exercice est exportable AMC
>>export const amcType = 'qcmMono' // ou 'qcmMult'
>>```
>>## <a id="export_AMC_automatise_cliqueFigure" href="#export_AMC_automatise_cliqueFigure"></a> [3. 3. L'export AMC automatisé avec `cliqueFigure`](#export_AMC_automatise_cliqueFigure)

L'interactivité avec `cliqueFigure` étant sans doute la moins simple à mettre en œuvre, l'export AMC automatisé n'est pas mis en place. Toutefois, les deux exercices-témoins (6G10-3 et 4AI1-1) sont déjà exportables AMC. Les concepteurs intéressés pourront s'y référer et consulter la documentation pour [rendre un exercice exportable AMC](tutorial-Rendre_un_exercice_exportable_AMC.html).


>>## <a id="export_AMC_automatise_listeDeroulante" href="#export_AMC_automatise_listeDeroulante"></a> [3. 3. L'export AMC automatisé avec `listeDeroulante`](#export_AMC_automatise_listeDeroulante)

Octobre 2021 : Il n'existe qu'un seul exercice dans le format interactif `listeDeroulante` et il n'est pas encore exportable AMC. S'il devait l'étre ce ne serait pas en mode automatisé mais en mode indépendant via cette [documentation](tutorial-Rendre_un_exercice_exportable_AMC.html). car ce serait soit un QCM, soit une question ouverte au choix du concepteur.


>>## <a id="export_AMC_automatise_custom" href="#export_AMC_automatise_custom"></a> [3. 3. L'export AMC automatisé avec `custom`](#export_AMC_automatise_custom)

L'export AMC automatisé avec `custom` n'existe pas du fait de l'originalité des exercices associés. Si une question ouverte est toutefois désirée, il sera aisé de conférer au même processus que pour ['formatInteractif : `custom`'](#export_AMC_automatise_mathLive_texte).
