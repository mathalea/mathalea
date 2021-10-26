Si vous êtes sur cette page, c'est que vous souhaitez rajouter à votre exercice de l'interactif. Bonne idée, vous êtes sur la bonne page ! Tant que vous y êtes, pensez aussi à rendre cet exercice exportable AMC même si vous n'utilisez pas AMC, certains seront ravis de découvrir cette opportunité dans votre exercice. Dans la plupart des cas, il y a très peu de codage à ajouter (parfois que deux lignes) pour rendre l'exercice exportable AMC. Pour cela, n'hésitez pas à lire le dernier chapitre : [Compatibilité entre l'interactivité et un export AMC](#14)

---

MathAlea permet de rendre un exercice interactif. Directement sur l'interface Web, l'élève saisit une réponse (dans un champ, dans une liste déroulante, en cochant une case ou bien encore en cliquant sur une figure). Celle-ci est vérifiée automatiquement et le score de toutes les réponses à l'exercice peut éventuellement être récupéré par son professeur ([documentation de la gestion des scores](https://coopmaths.fr/mathalea.html?v=scores)).

---



 Les actions obligatoires à mener, pour permettre à un exercice d'être interactif, sont décrites ci-dessous et explicitées, plus bas, en détail.

1. [Charger le code nécessaire](#1)
1. [Configurer le `typeInteractivite` choisi](#2)
    1. [`mathlive`](#3)
        1. [Lignes de code spécifiques](#4)
        1. [Détail de la fonction `setReponse()`](#4bis)
        1. [Gestion des différentes types de réponses attendues](#5)
        1. [Comprendre pourquoi une réponse correcte est pourtant considérée fausse](#6)
        1. [Dans les exercices de la Course Aux Nombres](#7)
        1. [Permettre plusieurs champs de réponse pour une même question](#8)
    1. [`qcm`](#9)
        1. [Lignes de code spécifiques](#91)
        1. [Construction des propositions de chaque QCM](#92)
        1. [Usage indispensable de la fonction `propositionsQcm()`](#93)
    1. [`numerique`](#10)
    1. [`cliqueFigure`](#11)
    1. [`listeDeroulante`](#12)
    1. [`custom`](#13)
1. [Compatibilité entre l'interactivité et un export AMC](#14)
    1. [L'export AMC automatisé](#14bis)
        1. [Avec `formatInteractif : 'calcul'`](#141)
        1. [Avec `formatInteractif : 'fraction'`](#142)
        1. [Avec `formatInteractif : 'fractionPlusSimple'` ou `formatInteractif : 'fractionEgale'`](#143)
        1. [Avec `formatInteractif : 'texte'`, `formatInteractif : 'ignorerCasse'` ou `formatInteractif : 'longueur'`](#144)
    1. [Avec `mathlive`](#15)
    1. [Avec `qcm`](#16)
    1. [Avec `cliqueFigure`](#17)

## <a id="1" href="#1"></a> [1. Charger le code nécessaire pour rendre un exercice interactif](#1)


- Pour charger le code nécessaire pour rendre un exercice interactif, il faut ajouter ces deux lignes de code juste après les `import` du début du code de l'exercice :
>>```js
>>export const interactifReady = true // pour définir qu'exercice peut s'afficher en mode interactif.
>>export const interactifType = 'typeInteractivite'
>>```

- Même si le `typeInteractivite` le plus simple et rapide à utiliser pour rendre un exercice interactif est `'mathLive'`, on peut utiliser tous les choix décrits ci-dessous et détaillés plus bas.

|Choix de `'typeInteractivite'`|Description de ce choix|Exercices-témoins|
|-----|-----|-----|
|[`'mathLive'`](#3)|pour proposer un champ de réponses avec un clavier virtuel et vérification possible d'égalité formelle|4C10-4|
|[`'qcm'`](#9)|pour proposer un qcm|5L10-2|
|[`'numerique'`](#10)|pour proposer une réponse numérique|4G20-2|
|[`'cliqueFigure'`](#11)|pour proposer des figures à cliquer|6G10-3|
|[`'listeDeroulante'`](#12)|pour proposer une liste déroulante avec la réponse et différents autres choix possibles|6N43-4|
|[`'custom'`](#13)|pour proposer une réponse originale, différente des précédentes. |4G20-2|

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

## <a id="2" href="#2"></a> [2. Configurer le `typeInteractivite` choisi](#2)

Selon le `typeInteractivite` choisi, la programmation est différente. Les paragraphes suivants détaillent chacune des configurations.

>>## <a id="3" href="#3"></a> [2. 1. `mathLive`](#3)

MathLive est une technologie qui permet de proposer à l'élève un champ de réponses avec un clavier virtuel (pratique sur les téléphones portables).

Pour rendre un exercice interactif en utilisant MathLive, il faut rajouter des lignes de codes spécifiques décrites [ci-dessous](#4). Ce fonctionnement suffit pour tout concepteur désireux d'introduire, a minima, une interactivité avec MathLive.

Les concepteurs plus curieux, trouveront, aussi, dans ce chapitre :
>> - [comment comprendre, par des exemples, le détail de traitement de la comparaison entre la réponse saisie par l'élève et la réponse exacte attendue](#4bis),
>> - [comment gérer une réponse sous forme de texte, sous forme de fraction, sous forme de longueur ou d'aire (avec l'unité adéquate)](#5),
>> - [comment débugguer pourquoi une réponse correcte peut être pourtant considérée fausse](#6),
>> - [comment utiliser MathLive dans les exercices adaptés à la Course Aux Nombres](#7),
>> - [comment permettre plusieurs champs de réponse pour une même question](#8).

>>>>## <a id="4" href="#4"></a> [2. 1. 1. Lignes de code spécifiques](#4)

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
>>Par défaut, `resultat` est une valeur numérique (donc sans formatage avec `texNombre` par exemple) ou bien un tableau de bons résultats possibles. On verra, [plus bas](#5), que `resultat` peut être plus divers que cela (un texte, une fraction, une grandeur avec son unité) et les modifications à apporter alors.

3. Ajouter, pour chaque question, le champ de réponses avec le clavier virtuel après l'énoncé de la sorte :
>>```js 
>> if (this.interactif) {   // Si l'exercice est interactif
>>      texte += ajouteChampTexteMathLive(this, i)
>> }
>>```
>>`ajouteChampTexteMathLive` a le fonctionnement par défaut ci-dessus, mais possède les options suivantes :
>>```js 
>> // syntaxe de ajouteChampTexteMathLive() : ajouteChampTexteMathLive(this, i, 'style', {...options})
>>texte += ajouteChampTexteMathLive(this, i,'largeur 25') // 25 % de la largeur de la page est occupés par le champ de réponses
>>texte += ajouteChampTexteMathLive(this, i,'inline') // sans retour à la ligne 
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur 25') // mélange des deux options précédentes
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur 25',{ texte: 'avant' })) // écrit "avant" devant le champ de réponses
>>texte += ajouteChampTexteMathLive(this, i,'inline largeur 25',{ texteApres: 'après' })) // écrit "après" derrière le champ de réponses
>>texte += ajouteChampTexteMathLive(this, i,'longueur') // le champ de réponses oblige l'élève à remplir une valeur numérique ET une unité de longueur (ou d'aires).
 >>```


>>>>## <a id="4bis" href="#4bis"></a>[2. 1. 2. Détail de la fonction `setReponse()`](#4bis)

Toutes les réponses sont traitées en comparant la saisie de l'élève avec la réponse (ou les réponses) choisie(s) par le concepteur de l'exercice qui utilise, pour cela, la fonction `setReponse()`.

- La syntaxe complète de la fonction `setReponse()` est la suivante :
>>```js
>>setReponse (this, i, a, {digits = 0, decimals = 0, signe = false, exposantNbChiffres = 0, exposantSigne = false, approx = 0, formatInteractif = 'calcul'}
>>```
>>Les 3 premiers paramètres sont obligatoires et désignent, respectivement, l'exercice appelant, le numéro de la question dans la programmation de l'exercice et la réponse attendue.

>>A cela, s'ajoutent toute sorte de paramètres optionnels dont la plupart servent uniquement afin de rendre un exercice exportable AMC, soit de [façon automatisée](#14), soit de [façon autonome](tutorial-Rendre_un_exercice_pour_usage_AMC.html). Seul le dernier paramètre `formatInteractif` est pertinent ici et indique le type de réponses attendues. On verra son utilité au [prochain paragraphe](#5).

- Le fonctionnement, par défaut, de la fonction `setReponse()` est de comparer des expressions des nombres ou des résultats de calcul, de façon intuitive. On remarque que `formatInteractif: 'calcul'` étant défini par défaut, on peut s'en passer.

>>```js
>>setReponse(this, i, 5.4)  // Pour comparer la réponse saisie avec le nombre 5.4
>>                          // équivalent à setReponse(this, i, 5.4,{ formatInteractif: 'calcul' })
>>
>> setReponse(this, i, [2, 3*6, 7/2])   // Pour comparer la réponse saisie avec tous ces nombres ou résultats de calcul
>>                                      // équivalent à setReponse(this, i, [2, 3*6, 7/2],{ formatInteractif: 'calcul' })
>>```

>>>>## <a id="5" href="#5"></a> [2. 1. 3. Gestion des différents types de réponses attendues](#5)


- Pour comparer des **textes avec respect strict de la casse**, on code, comme dans l'exercice-témoin **2N14-1** :

>>```js
>>setReponse(this, i, 'resultat', { formatInteractif: 'texte' }) // resultat = 'KWh' par exemple
>>```

- Pour comparer des **textes sans respect de la casse**, on code, comme dans l'exercice-témoin **6C11-2** :

>>```js
>>setReponse(this, i, 'resultat', { formatInteractif: 'ignorerCasse' }) // resultat = 'Dividende' par exemple
>>```

- Pour comparer des **fractions**, il y a trois méthodes différentes pour coder.
 
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

- Pour comparer des **grandeurs (avec des unités)**, on code, comme dans l'exercice-témoin **6M11** :
>>``` js
>>setReponse(this, i, new Grandeur(resultat, 'cm'), { formatInteractif: 'longueur' }) // resultat est un nombre. On personnalisera le champ texte avec ajouteChampTexteMathLive(this, i, 'longueur')
>>```

>>>>## <a id="6" href="#6"></a> [2. 1. 4. Comprendre pourquoi une réponse correcte est pourtant considérée fausse](#6)

Le fonctionnement de MathLive peut parfois donner un résultat étonnant. Alors qu'on attend la réponse, "**1h45min**", `verifieQuestionMathLive` peut attendre "**1h45\\min**" par exemple.

Si le concepteur de l'exercice se trouve dans la situation où une réponse correcte est considérée fausse, voici la procédure à suivre pour trouver la raison :
* Ouvrir l'inspecteur (CTRL+MAJ+C sur Firefox et Chrome, Command+Option+I sur Safari).
* Sur l'onglet débugueur, chercher dans l'onglet sources `webpack/src/js/modules/gestionInteractifs.js`.
* Mettre un point d'arrêt sur la ligne 95 (numéro actuel de ligne mais sous réserve de non-rajout de code au-dessus évidemment) juste après le `let saisie = champTexte.value` (clic droit sur 95 puis sur Ajouter un point d'arrêt).
* Cliquer sur Actualiser.
* Saisir la réponse attendue dans le champ et valider la saisie.
* Mettre le curseur sur `saisie` pour visualiser la saisie qu'il a récupéré comme sur cette [capture d'écran](img/Interactif-1.png).

>>>>## <a id="7" href="#7"></a> [2. 1. 5. Dans les exercices de la Course Aux Nombres](#7)

Exercice-témoin : **can6C15**

Les exercices utilisables dans la Course Aux Nombres sont des exercices avec `this.typeExercice = 'simple'`.

L'utilisation de MathLive au sein de ces exercices nécessitent ces actions :
* Mettre l'énoncé dans `this.question`.
* Mettre la correction dans `this.correction`.
* Mettre la réponse attendue dans `this.reponse`.
Si le format de MathLive par défaut ne convient pas, on peut le changer. Pour cela, il suffit de placer après `Exercice.call(this)` :
>>* `this.formatInteractif = ` et de compléter avec un des formats vus <a href="#5">ci-dessus</a>.
>>* `this.formatChampTexte = 'largeur10 inline'` pour personnaliser le champ de réponse (10 % de la largeur sans retour à la ligne, dans cet exemple).
>>* `this.optionsChampTexte = { texte: 'l = ', texteApres: ' cm'}` permet d'avoir du texte avant et après le champ de réponse.

>>>>## <a id="8" href="#8"></a> [2. 1. 6. Permettre plusieurs champs de réponse pour une même question](#8)

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

>>## <a id="9" href="#9"></a> [2. 2. `qcm`](#9)

Exercice-témoin : **5L10-2**

Pour rendre un exercice interactif en utilisant `qcm` et en permettant, aux élèves, de choisir une bonne réponse parmi plusieurs propositions, il faut rajouter des nouvelles lignes de code, construire les propositions de chaque question du QCM et avoir recours à la fonction `propositionsQcm()` qui crée les cases à cocher.

>>>>## <a id="91" href="#91"></a> [2. 2. 1. Lignes de code spécifiques](#91)

Rajouter un import dans l'en-tête comme ceci :
>>```js
>>import { propositionsQcm } from '../../modules/gestionInteractif.js'
>>export const interactifReady = true
>>export const interactifType = 'qcm'
>>```

>>>>## <a id="92" href="#92"></a>[2. 2. 2. Construction des propositions de chaque QCM](#92)

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
>>    ordered: true // (true si les réponses doivent rester dans l'ordre ci-dessus, false s'il faut les mélanger),
>>    lastChoice: index // (en cas de mélange, l'index à partir duquel les propositions restent à leur place, souvent le dernier choix par défaut)
>>                      // Cet index a tout son intérêt s'il existe une dernière proposition du genre "aucune des propositions n'est correcte".
 >>  }
>>}
>>```

>>>>## <a id="93" href="#93"></a>[2. 2. 3. Usage indispensable de la fonction `propositionsQcm()`](#93)

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



>>## <a id="10" href="#10"></a> [2. 3. `numerique`](#10)

Octobre 2021 : Le type `numerique` est à proscrire au profit de `mathLive`. Ce type est uniquement dans cette documentation car encore en place dans des exercices plus anciens.


>>## <a id="11" href="#11"></a> [2. 4. `cliqueFigure`](#11)

Exercice-témoin : **6G10-3**

Ici, l'élève devra cliquer sur une figure pour signaler sa réponse. Le concepteur de l'exercice aura créé un tableau contenant toutes les références aux différentes figures, associées chacune à un identifiant unique et à un booléen de bonne ou mauvaise réponse. Ensuite, c'est la fonction `resultatCheckEx()` qui gère la partie interactive.

>>## <a id="12" href="#12"></a> [2. 5. `listeDeroulante`](#12)

Exercice-témoin : **6N43-4**

Ici, l'élève devra sélectionner une réponse dans un menu déroulant dont les différentes options sont définies, par le créateur de l'exercice, par la fonction `choixDeroulant()`.

>>```js
>>texte = 'Choisir une bonne réponse parmi ' + choixDeroulant(this, i, 0, [a, b, c, d]) // Si on veut avoir plusieurs menus déroulants dans la même question, il suffit d'incrémenter le troisième paramètre comme choixDeroulant(this, i, 1, [a, b, c, d]) (voir ex. 6N43-4)
>>texteCorr = `Les bonnes réponses sont ${a} et ${d}.`
>>setReponse(this, i, [a, d]) // S'il y a plusieurs menus déroulants, le troisième paramètre peut être une liste de listes comme setReponse(this, i, [[a, d], [c, d])
>>```


>>## <a id="13" href="#13"></a> [2. 6. `custom`](#13)

Exercices-témoins : **6I12**, **5R11-2**, **6N11-2**, **6N21**, **6N30-2**

Le type `custom` est réservé aux concepteurs avertis. Il n'a pas de syntaxe particulière et sa programmation est propre à chaque concepteur. Les divers exercices-témoins peuvent témoigner de cette hétérogénéité et donner cours à l'inspiration pour d'autres exercices interactifs.

## <a id="14" href="#14"></a> [3. Compatibilité entre l'interactivité et un usage AMC](#14)

Historiquement, la sortie des premiers exercices exportables AMC est plus précoce que la mise en place de l'interactivité dans les exercices. De ce fait, il existe une documentation indépendante qui permet de rendre un [exercice exportable AMC](tutorial-Rendre_un_exercice_pour_usage_AMC.html).

Toutefois, la création de l'interactivité dans un exercice permet de créer un export AMC automatisé par l'ajout de très peu de lignes de codes supplémentaires.
il existe un lien important entre ces deux compléments d'exercices bien qu'ils soient indépendants : on peut développer l'un sans l'autre.

Toutefois, en octobre 2021, il y a maintenant plus d'exercices interactifs que d'[exercices exportables AMC](tutorial-Rendre_un_exercice_pour_usage_AMC.html) mais il est probable que cet écart s'aménuise. De ce fait, lorsqu'on conçoit un exercice intertactif, il serait bien de penser immédiatement à son passage en AMC et de prendre la précaution suivante.

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
>> // Cette remarque est d'ordre générale, il peut y avoir des cas particuliers, notamment pour les qcmNUM
>>```

>>## <a id="14bis" href="#14bis"></a> [3. 1. L'export AMC automatisé](#14bis)

Octobre 2021 : Des retours sont encore attendus en cas d'utilisation de cette méthode car on n'a pas assez d'expérience et il peut donc rester des bugs.

L'export AMC par défaut, est réalisable en très peu d'ajout de lignes de code. En effet, grâce à la gestion anticipée de l'export AMC quand un exercice est rendu interactif, certaines informations programmées lorsqu'on rend un exercice interactif sont également données instantanément à l'export AMC. De ce fait, très peu d'informations sont à rajouter pour qu'un export AMC soit fonctionnel.
Si le concepteur de l'exercice souhaite un export AMC plus personnalisé, il se reportera à .... EE.


>>>>## <a id="141" href="#141"></a> [3. 1. 1. Avec `formatInteractif : 'calcul'`](#14bis)

Supposons, par exemple, que votre exercice interactif exploite les réponses sous forme d'un nombre avec `formatInteractif : calcul` (ou rien puisque c'est le format par défaut) et que vous utilisiez :

>>```js
>>setReponse(this,i, reponse) // ou bien setReponse(this,i, reponse,{formatInteractif: 'calcul'})
>>```

Alors, rendre l'exercice exportable AMC, est instantané si on rajoute, avec les autres export/import, seulement ces deux lignes de code.
>>```js
>>export const amcReady = true // pour définir que l'exercice peut servir à AMC
>>export const amcType = 'AMCNum'
>>```

L'export AMC possèdera un nombre à coder où le nombre de chiffres sera automatiquement détecté par la bonne réponse à fournir ainsi que le signe du nombre.

Si toutefois, le concepteur de l'exercice trouve que donner le nombre exact de chiffres du nombre-solution et le signe est une aide trop importante pour l'élève, il pourra imposer lui-même le nombre de chiffres et le choix du signe de la façon suivante.

>>```js
>>setReponse(this,i, reponse, {digits: 6, decimals: 5, signe: true}) // ou bien setReponse(this,i, reponse,{digits: 6, decimals: 5, signe: true, formatInteractif: 'calcul'})
>> // digits correspond au nombre TOTAL de chiffres du nombre à coder.
>> // decimals correspond au nombre de chiffres de la partie décimale du nombre à coder.
>> // signe correspond à la présence ou non du codage pour le signe positif ou négatif.
>> // Chacun de ces paramètres est facultatif. Ne pas en mettre, c'est laisser la place à la valeur idéale.
>>```

Si digits et decimals sont mal renseignés (par exemple, digits=3 et decimals=1 pour coder le nombre 456,17), alors ces valeurs ne seront pas prises en compte et les valeurs, par défaut, seront utilisés (dans l'exemple ci-dessus, digits=5 et decimals=2).

**Remarque importante** : Si, en interactif, MathLive gère sans problème, via `setReponse`, un tableau de bonnes réponses, l'export AMC automatique sera moins fonctionnel puisque AMC ne pouvant coder qu'une seule réponse, seule la première réponse du tableau sera considérée comme correcte dans AMC par ce procédé. Il faudra, soit changer la consigne pour l'export AMC, soit programmmer l'export AMC de façon plus personnalisée en suivant telle doc... EE.


>>>>## <a id="142" href="#142"></a> [3. 1. 2. Avec `formatInteractif : 'fraction'`](#142)

Supposons, par exemple, que votre exercice interactif exploite les réponses sous forme d'une fraction avec le `formatInteractif` `fraction` et que vous utilisiez :

>>```js
>>setReponse(this,i, new Fraction(n, d), {formatInteractif: 'fraction'})
>>```

Alors, rendre l'exercice exportable AMC, est instantané si on rajoute, avec les autres export/import, seulement ces deux lignes de code.
>>```js
>>export const amcReady = true // pour définir que l'exercice peut servir à AMC
>>export const amcType = 'AMCNum'
>>```

L'export AMC possèdera deux nombres à coder où le nombre de chiffres sera automatiquement détecté par la bonne réponse à fournir.

Si toutefois, le concepteur de l'exercice trouve que donner le nombre de chiffres exact du numérateur et du dénominateur est une aide trop importante pour l'élève, il pourra imposer lui-même le nombre de chiffres (digits) de la façon suivante.
Si on souhaite imposer le même nombre de chiffres au numérateur et au dénumérateur, on pourra agir de la même sorte qu'au paragraphe précédent :

>>```js
>>setReponse(this,i, reponse, {digits: 3, signe: true, formatInteractif: 'fraction'}) // Pour imposer 3 chiffres, ici, au numérateur et au dénominateur.
>> // digits correspond au nombre TOTAL de chiffres du nombre à coder.
>> // signe correspond à la présence ou non du codage pour le signe positif ou négatif.
>>```

Si on ne souhaite pas imposer le même nombre de chiffres au dénominateur et au numérateur, il faut aussi agir sur `setReponse` mais coder de la façon suivante :

>>```js
>>setReponse(this,i, reponse, {digitsNum: 3, digitsDen: 2, signe: true, formatInteractif: 'fraction'}) // Pour imposer, ici, 3 chiffres au numérateur et 2 chiffres au dénominateur.
>>// digitsNum correspond au nombre TOTAL de chiffres du numérateur à coder.
>>// digitsDen correspond au nombre TOTAL de chiffres du dénominateur à coder.
>>```

**Remarque** : Si le nombre choisi de chiffres est trop petit par rapport au nombre à coder (digits=2 alors que le nombre à coder est 236), alors ce nombre de chiffres sera automatiquement remis à la valeur minimale (3, dans l'exemple précédent).

>>>>## <a id="143" href="#143"></a> [3. 1. 3. Avec `formatInteractif : 'fractionPlusSimple'` ou `formatInteractif : 'fractionEgale'`](#143)


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
>>export const amcReady = true // pour définir que l'exercice peut servir à AMC
>>export const amcType = 'AMCNum'
>>```

L'export AMC possèdera deux nombres à coder où le nombre de chiffres sera automatiquement détecté par la bonne réponse à fournir.

Ce rajout n'est toutefois pas suffisant, cette fois-ci, car, dans chaque cas ici, il n'existe pas de réponse unique et AMC ne sait tester qu'une réponse unique.
Donc il faudra imposer à l'export AMC une unique solution (par exemple, la fraction irréductible) et changer éventuellement la consigne par rapport à l'énoncé (pour exiger, par exemple, une fraction irréductible). Le code ci-dessous décrit ce fonctionnement.

>>```js
>> if (context.isAmc) {
>>      this.autoCorrection[i]reponse.valeur[0] = resultat.simplifie() // Il n'existe qu'une seule fraction irréductible égale à la bonne réponse.
>> 
>>      this.consigne = "Donner la réponse sous forme d'une fraction irréductible"
>> }
>>
>>```

Ce codage est parfaitement fonctionnel mais est tellement bien fait que si la bonne réponse attendue est 3/2, alors AMC proposera un dénominateur à un chiffre et un numérateur à un chiffre, ce qui peut être une aide pour les élèves et qu'on ne souhaite pas fournir.

Si on souhaite imposer le même nombre de chiffres au numérateur et au dénumérateur, on pourra agir de la même sorte qu'au paragraphe précédent :

>>```js
>>setReponse(this, i, reponse, {digits: 3, signe: true, formatInteractif: 'fractionPlusSimple'}) // ou bien setReponse(this,i, reponse,{digits: 3, signe: true, formatInteractif: 'fractionEgale'}) 
>> // digits correspond au nombre TOTAL de chiffres du nombre à coder.
>> // signe correspond à la présence ou non du codage pour le signe positif ou négatif.
>>```

Si on ne souhaite pas imposer le même nombre de chiffres au dénominateur et au numérateur, il ne faut pas agir sur `setReponse` mais coder de la façon suivante :


>>```js
>>if (context.isAmc) {
>>      this.autoCorrection[j].reponse.valeur[0].num.digits = 4 // Pour que le numérateur soit codé sur 4 chiffres
>>      this.autoCorrection[j].reponse.valeur[0].den.digits = 2 // Pour que le dénominateur soit codé sur 2 chiffres
>>}
>>```

>>>>## <a id="144" href="#144"></a> [3. 1. 4. Avec `formatInteractif : 'texte'`, `formatInteractif : 'ignorerCasse'` ou `formatInteractif : 'longueur'`](#144)

**Exercice-témoin pour 'texte' : 2N14-1**
**Exercice-témoin pour 'ignorerCasse' : 6C11-2**

Alors, rendre l'exercice exportable AMC, est instantané si on rajoute, avec les autres export/import, seulement ces deux lignes de code.
>>```js
>>export const amcReady = true // pour définir que l'exercice peut servir à AMC
>>export const amcType = 'AMCOpen'
>>```


L'export AMC possèdera une zone de texte que l'enseignant codera après correction

Trois lignes sont, par défaut, définies pour chaque zone de texte. Si le concepteur de l'exercice souhaite avoir un nombre de lignes différent, il pourra coder ainsi, dans son exercice :
>>```js
>>if (context.isAmc) {
>>        this.autoCorrection[i].propositions = [{ texte: this.listeCorrections[i], statut: '1' }] // Ici, une seule ligne pour chaque zone de texte
>>}
>>```



>>## <a id="15" href="#15"></a> [3. 2. Avec `mathlive`](#15)

L'utilisation de `mathlive` est propre à l'interactivité d'un exercice et non à un export pour AMC.

De ce fait, pour permettre une bonne cohabitation entre l'interactivité et l'export pour AMC, il est important de faire attention au code suivant :

>>```js
>> // En interactif, il serait bon de ne jamais programmer ainsi :
>> texte = propositionsQcm(......).texte             // A EVITER
>> texte = ajouteChampTexteMathLive(......)     // A EVITER
>>
>> // mais plutôt comme ceci :
>> if (this.interactif && !context.isAmc) {     // A RECOMMANDER
>>      texte += propositionsQcm(......).texte            // Noter bien ici le +=
>>      texte += ajouteChampTexteMathLive(......)     
>> }
>>
>> // Si la prem
>>```


>>## <a id="16" href="#16"></a> [3. 2. Avec `qcm`](#16)

A peu de choses près, la conception d'un QCM interactif est semblable à la conception d'un QCM pour AMC. Donc avis aux concepteurs, ne pas négliger la sortie AMC si vous concevez un QCM interactif puisqu'à deux-trois lignes de codes près, il n'y a rien à rajouter. EE : Se rendre sur la doc adéquate.

>>## <a id="17" href="#17"></a> [3. 3. Avec `cliqueFigure`](#17)

EE : Voir l'exercice cliqueFigure transformé en AMC