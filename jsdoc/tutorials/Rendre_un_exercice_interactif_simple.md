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
        1. [Ligne de code spécifique](#91)
        1. [Construction des propositions de chaque QCM](#92)
        1. [Usage indispensable de la fonction `propositionsQcm()`](#93)
    1. [`numerique`](#10)
    1. [`cliqueFigure`](#11)
    1. [`listeDeroulante`](#12)
    1. [`custom`](#13)
1. [Compatibilité entre l'interactivité et un usage AMC](#14)
    1. [Avec `mathlive`](#15)
    1. [Avec `qcm`](#16)
    1. [Avec `cliqueFigure`](#17)

## <a id="1" href="#1"></a> [1. Charger le code nécessaire pour rendre un exercice interactif](#1)


- Pour charger le code nécessaire pour rendre un exercice interactif, il faut ajouter ces deux lignes de code juste après les `import` de début d'exercice :
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

- Pour définir le mode dans lequel l'exercice va s'afficher par défaut (interactif ou pas), on initialisera le booléen `this.interactif = false` placé de la sorte :
>> ```js
>> Exercice.call(this)
>> ..... // D'autres instructions
>> this.interactif = false // true ou false
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

Selon le `typeInteractivite` choisi, la programmation est différente. Les paragraphes suivant détaillent chacune des configurations.

>>## <a id="3" href="#3"></a> [2. 1. `mathLive`](#3)

Pour rendre un exercice interactif en utilisant MathLive, il faut rajouter 3 nouvelles lignes de code et gérer éventuellement les types de réponses attendues. D'autres actions, pour concepteurs plus curieux, sont egalement précisées dans les paragraphes ci-dessous.

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
>>Par défaut, `resultat` est une chaîne de caractère LaTeX (de type `'${x1}'`), une valeur numérique (donc sans formatage avec `texNombre` par exemple) ou bien un tableau de bons résultats possibles. On verra, [plus bas](#5), que `resultat` peut être plus divers que cela et les modifications à apporter alors.

3. Ajouter, pour chaque question, le champ de réponses avec le clavier virtuel après l'énoncé de la sorte :
>>```js 
>>texte += ajouteChampTexteMathLive(this, i)
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

>>A cela, s'ajoutent toute sorte de paramètres optionnels dont la plupart servent uniquement pour AMC (lien vers doc). Seul le dernier paramètre `formatInteractif` est pertinent ici et indique le type de réponses attendues. On verra son utilité au [prochain paragraphe](#5).

- Le fonctionnement, par défaut, de la fonction `setReponse()` est de comparer des expressions littérales ou des nombres, de façon intuitive. On remarque que `formatInteractif: 'calcul'` étant défini par défaut, on peut s'en passer.

###### <a id="EE1" href="#EE1"></a>Questionnement EE1

**EE1 : Première question dans l'encadré noir ci-dessous. La seconde, dessous.**
>>```js
>>setReponse(this, i, 5.4)  // Pour comparer la réponse saisie avec le nombre 5.4
>>                          // équivalent à setReponse(this, i, 5.4,{ formatInteractif: 'calcul' })
>>
>>setReponse(this, i, '${reste}') // Pour comparer la réponse saisie avec le chaine de caractères 'reste'
>>                                // équivalent à setReponse(this, i, '${reste}',{ formatInteractif: 'calcul' })
>> EE : Pour l'exemple ci-dessus, s'il est vrai, quelle différence y a-t-il avec { formatInteractif: 'texte' } ? 
>>
>> setReponse(this, i, ['Non','non,'NON'])  // Pour comparer la réponse saisie avec le mot 'non' écrit sous trois formes différentes
>>                                          // équivalent à setReponse(this, i, ['Non','non,'NON'],{ formatInteractif: 'calcul' })
>>```
**EE1 : Est-ce que quand la réponse est une chaine de caractères, la casse est importante ? Si oui, pourquoi est-ce nécessaire, ne peut-on pas recoder setReponse pour ne pas considérer la casse d'un texte significative ?**


**EE1 : Voir questionnement EE2 plus bas.**

- Parce que la conception d'un exercice en AMC ne gère pas tout à fait les réponses comme la conception d'un exercice en interactif, il est important (si on souhaite proposer une sortie AMC) de n'appeler `setReponse()` que lorqu'on n'est pas dans le contexte AMC :

>>```js
>> if (this.interactif && !context.isAmc) {
>>          setReponse(this, i, reponse)
>> }
>>```

>>>>## <a id="5" href="#5"></a> [2. 1. 3. Gestion des différents types de réponses attendues](#5)


- Pour comparer des **textes** avec respect strict de la casse, on code, comme dans l'exercice-témoin **2N14-1** :

>>```js
>>setReponse(this, i, 'resultat', { formatInteractif: 'texte' }) // resultat doit être saisie sans les $ délimiteurs du LaTeX
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

- Pour comparer des **longueurs** (ou des **aires**), on code, comme dans l'exercice-témoin **6M11** :
>>``` js
>>setReponse(this, i, new Grandeur(resultat, 'cm'), { formatInteractif: 'longueur' }) // resultat est un nombre. On personnalisera le champ texte avec ajouteChampTexteMathLive(this, i, 'longueur')
>>```
###### <a id="EE2" href="#EE2"></a>Questionnement EE2

**EE2 : Voici un copier-coller de la doc initiale :**

 Lien avec AMC : Si on a un setReponse(this,i, new Fraction(n,d),{formatInteractif: 'fraction'}), alors on peut mettre amcType = 'AMCNum' et ça passe automatiquement en un simili amcHybride avec 2 champs : un pour le numérateur, et un pour le dénominateur !

 **EE2 : Je ne comprends pas ce copier-coller. En mettant juste amcType, l'exercice devient AMC ? C'est quoi un simili-hybride ?**

>>>>## <a id="6" href="#6"></a> [2. 1. 4. Comprendre pourquoi une réponse correcte est pourtant considérée fausse](#6)

Le fonctionnement de MathLive peut parfois donner un résultat étonnant. Alors qu'on attend la réponse, "**1h45min**", `verifieQuestionMathLive` peut attendre "**1h45\\min**" par exemple.

Si vous vous trouvez dans la situation où une réponse correcte est considérée fausse, voici la procédure à suivre :
* Ouvrir l'inspecteur (CTRL+MAJ+C sur Firefox et Chrome, Command+Option+I sur Safari).
* Sur l'onglet débugueur, chercher dans l'onglet sources `webpack/src/js/modules/gestionInteractifs.js`.
* Mettre un point d'arrêt sur la ligne 95 (numéro actuel de ligne mais sous réserve de non-rajout de code au-dessus évidemment) juste après le `let saisie = champTexte.value` (clic droit sur 95 puis sur Ajouter un point d'arrêt).
* Cliquer sur Actualiser.
* Saisir la réponse attendue dans le champ et valider la saisie.
* Mettre le curseur sur `saisie` pour visualiser la saisie qu'il a récupéré comme sur cette [capture d'écran](img/Interactif-1.png).

>>>>## <a id="7" href="#7"></a> [2. 1. 5. Dans les exercices de la Course Aux Nombres](#7)

Exercice-témoin : **can6C15**

Les exercices utilisables dans la Course Aux Nombres sont des exercices avec `this.typeExercice = 'simple'`.

L'utilisation de mathLive au sein de ces exercices nécessitent ces actions :
* Mettre l'énoncé dans `this.question`.
* Mettre la correction dans `this.correction`.
* Mettre la réponse attendue dans `this.reponse`.
Si le format de mathLive par défaut ne convient pas, on peut le changer. Pour cela, il suffit de placer après `Exercice.call(this)` :
* `this.formatInteractif = ` et de compléter avec un des formats vus <a href="#5">ci-dessus</a> : `'texte'`, `'fraction'`, `'fractionPlusSimple'`, `'fractionEgale'`, `'longueur'`, `'calcul'`.
* `this.formatChampTexte = 'largeur10 inline'` pour personnaliser le champTexte (10 % de la largeur sans retour à la ligne, dans cet exemple).
* `this.optionsChampTexte = { texte: 'l = ', texteApres: ' cm'}` permet d'avoir du texte avant et après le champTexte MathLive.

>>>>## <a id="7" href="#7"></a> [2. 1. 6. Permettre plusieurs champs de réponse pour une même question](#7)

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

Pour rendre un exercice interactif en utilisant `qcm` et en permettant, aux élèves, de choisir une bonne réponse parmi plusieurs propositions, il faut rajouter une nouvelle ligne de code et utiliser la fonction `propositionsQcm()`.


>>>>## <a id="91" href="#91"></a> [2. 2. 1. Ligne de code spécifique](#91)

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
>> if (!this.interactif) {
>>        enonce = enonce + monQcm.texte // enonce est l'énoncé global de l'exercice
>>        texteCorr = monQcm.texteCorr // texteCorr est la correction globale de l'exercice
>> }
>>```

>> La correction `texteCorr` est simplement la case cochée ou non cochée selon que la proposition associée est correcte ou pas. De ce fait, certains concepteurs d'exercice n'utilisent pas cette correction et préfèrent utiliser la correction habituelle, celle sans intervention d'interactivité. Auquel cas, dans l'exemple ci-dessus, il suffit d'enlever la dernière ligne.

- Il est important, de **NE PAS REPRODUIRE** le code ci-dessous :
>>```js 
>> if (!this.interactif) {
>>        enonce = enonce + propositionsQcm(this, i).texte  // MAUVAIS CODAGE VOLONTAIRE : NE PAS RECOPIER
>>        texteCorr = propositionsQcm(this, i).texteCorr    // MAUVAIS CODAGE VOLONTAIRE : NE PAS RECOPIER
>> }
>>```
>> En effet, comme la fonction `propositionsQcm()` produit un objet `{texte, texteCorr}` à chaque appel, si on l'appelle 2 fois, on brasse 2 fois les propositions, et l'ordre des réponses ne sera, alors, pas le même que celui qui est affiché et donc celui sur lequel on clique.



>>## <a id="10" href="#10"></a> [2. 3. `numerique`](#10)

Octobre 2021 : Le type `numerique` est à proscrire au profit de `mathLive`. Ce type est uniquement dans cette documentation car encore en place dans des exercices plus anciens.


>>## <a id="11" href="#11"></a> [2. 4. `cliqueFigure`](#11)

Exercice-témoin : **6G10-3**

Ici, l'élève devra cliquer sur une figure pour signaler sa réponse. Le concepteur de l'exercice aura créé un tableau contenant toutes les références aux différentes figures, associées chacune à un identifiant unique et à un booléen de bonne ou mauvaise réponse. Ensuite, c'est la fonction `resultatCheckEx()` qui gère la partie interactive.

>>## <a id="12" href="#12"></a> [2. 5. `listeDeroulante`](#12)

Exercice-témoin : **6N43-4**

Ici, l'élève devra sélectionner une réponse dans un menu déroulant dont les différentes options sont définies, par le créateur de l'exercice, par la fonction `choixDeroulant()`.

```js
texte = 'Choisir une bonne réponse parmi ' + choixDeroulant(this, i, 0, [a, b, c, d]) // Si on veut avoir plusieurs menus déroulants dans la même question, il suffit d'incrémenter le troisième paramètre comme choixDeroulant(this, i, 1, [a, b, c, d]) (voir ex. 6N43-4)
texteCorr = `Les bonnes réponses sont ${a} et ${d}.`
setReponse(this, i, [a, d]) // S'il y a plusieurs menus déroulants, le troisième paramètre peut être une liste de listes comme setReponse(this, i, [[a, d], [c, d])
```


>>## <a id="13" href="#13"></a> [2. 6. `custom`](#13)

Exercices-témoins : **6I12**, **5R11-2**, **6N11-2**, **6N21**, **6N30-2**

Le type `custom` est réservé aux concepteurs avertis. Il n'a pas de syntaxe particulière et sa programmation est propre à chaque concepteur. Les divers exercices-témoins peuvent témoigner de cette hétérogénéité et donner cours à l'inspiration pour d'autres exercices interactifs.

## <a id="14" href="#14"></a> [3. Compatibilité entre l'interactivité et un usage AMC](#14)

Historiquement, la sortie des premiers exercices pour un usage AMC est plus précoce que la mise en place de l'interactivité dans les exercices. De ce fait, il existe un lien important entre ces deux améliorations d'exercices.

EE : On pourra se référer à telle doc pour AMC.


---

**Ci-dessous est un pense-bête. Inutile de relire, cela sera amené à être retravaillé.**

>>## <a id="15" href="#15"></a> [3. 1. Avec `mathlive`](#15)
EE ; A mettre en forme 
Pour une compatibilité entre les exercices interactifs en ligne et AMC,

il ne faut pas faire :

    texte = propositionsQcm() ;
    texte = ajouteChampTexteMathLive().

Mais il faut faire :

    texte += propositionsQcm() ;
    texte += ajouteChampTexteMathLive().

La raison se trouve ci-dessous :

Afin de ne pas se retrouver avec un code hors contexte, les fonctions propositionsQcm et ajouteChampTexteMathLive retournent des chaines vides lorsque le contexte est la sortie Latex ou le générateur AMC.

Il convient donc de ne pas utiliser l'affectation texte = ... mais la concaténation texte += ...

En effet, le texte initial de l'énoncé sert souvent tel quel pour les énoncés AMC. En cas d'affectation texte transmettrait une chaine vide comme énoncé pour AMC. Il en va de même pour l'utilisation de propositionsQcm() qui retourne un tableau avec deux chaines vides dans ce contexte de sortie AMC.

Si vous bricolez this.autoCorrection[i].reponse.valeur à la main pour AMC

Il faut intégrer que cette variable doit être un tableau dont on n'utilisera pour AMC que le premier élément.

Donc vous devez renseigner :

    this.autoCorrection[i]reponse.valeur[0] <- Notez bien le [0] qui indique que c'est un tableau
    this.autoCorrection[i]reponse.param.digits
    this.autoCorrection[i]reponse.param.decimals

Sinon, vous pouvez laisser faire setReponse(this,i,reponses) en veillant à ce que le premier élément de réponses (ou le seul) soit un nombre décimal (6.543 par exemple). setReponse crée un tableau même si il n'y a qu'une valeur.

setReponse(this,i,reponse) renseigne le this.autoCorrection[i] pour une réponse de type numérique ou une réponse avec plusieurs valeurs en affectant la variable this.autoCorrection[i].reponse.valeur.

Cette variable est un tableau pour pouvoir en mode interactif tester plusieurs formes de réponse.

En mode AMCNum, on récupère la valeur décimale contenue dans this.autoCorrection[i].reponse.valeur[0].

Mais AMC a besoin de savoir combien de chiffres présenter au codage, combien de chiffres dans la partie décimale, si on le veut en notation scientifique, si il y a besoin d'un signe, si on tolère une marge d'erreur...

setReponse() ne fixe ces paramètres qui sont dans this.autoCorrection[i].reponse.param que s'ils sont passés en argument (il faut donc y penser). un setReponse(this, i, reponse, {digits: 6, decimals: 5, signe: true, exposantNbChiffres: 2, exopsantSigne: true, approx:1, formatInteractif: 'calcul'}) règle AMCNum pour un nombre dont la mantisse comporte 6 chiffres dont 5 après la virgule avec case signe +/- avec un codage en notation scientifique avec signe pour l'exposant et avec 2 chiffres pour l'exposant, la tolérance est de 1 sur le dernier chiffre significatif (valeur approchée par défaut ou par excès acceptée). Exemple de résultat possible : -124.924 seront tolérés -124.923, -124.924 et -124.925 (je crois car je ne sais pas trop quel comportement aurait AMC si le nombre envoyé comme premier paramètre était -123,9247 en précisant 6 chiffres, mais il me semble que AMC provoquerait un warning disant qu'il n'y a pas assez de chiffres pour coder la réponse 'number is to large'...)

>>## <a id="16" href="#16"></a> [3. 2. Avec `qcm`](#16)

A peu de choses près, la conception d'un QCM interactif est semblable à la conception d'un QCM pour AMC. Donc avis aux concepteurs, ne pas négliger la sortie AMC si vous concevez un QCM interactif puisqu'à deux-trois lignes de codes près, il n'y a rien à rajouter. EE : Se rendre sur la doc adéquate.

>>## <a id="17" href="#17"></a> [3. 3. Avec `cliqueFigure`](#17)

EE : Voir l'exercice cliqueFigure transformé en AMC