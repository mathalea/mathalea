## <a id="Redirection" href="#Redirection"></a> [1. Redirection](#Redirection)

`https://coopmaths.fr/exXXXXX` est redirigé vers `https://coopmaths.fr/exercice.html?ex=XXXXXX`. On peut donc utiliser des URL raccourcies comme `coopmaths.fr/ex6C10` ou `coopmaths.fr/ex6C10&ex=6C11` (seul le premier exercice n'a pas besoin du =).

## <a id="Parametrage" href="#Parametrage"></a> [2. Paramétrage d'une série d'exercices](#Parametrage)

- `,i=1` ou `,i=0` pour avoir un exercice interactif ou pas (précédemment interactif=).
- `,n=5` pour avoir 5 questions (précédemment nbQuestions=).
- `,vXXXX` pour spécifier l'URL d'un complément numérique (id Youtube, url, code iframe...).
- `,s=`, `,s2=`, `,s3=`, `,s4=` pour changer les réglages de l'exercice (au travers des variables `this.sup`, `this.sup2`, `this.sup3`, `this.sup4`).
- `,cd=1` ou `,cd=0`pour avoir une correction détaillée ou pas (par défaut 1 en sortie HTML et 0 en sortie LaTeX).
- `&serie=XXXX` permet de contrôler l'aléatoire et d'avoir exactement les mêmes valeurs numériques.
- `&log=1` déclenche une fenêtre modale de connexion pour l'enregistrement des scores (un peu comme un popup dans la page).
- `&duree=10` permet d'ajouter un compte à rebours aux différentes vues.
- `&v=` détermine le contexte de la vue :
    - `&v=menu` dirige vers la page principale du générateur d'exercices avec à gauche la liste des exercices et à droite les exercices.
    - `&v=ex` dirige vers l'affichage normal de l'exercice (avec la barre des boutons zoom, copier le lien, export latex/pdf, interactivité, modification...).
    - `&v=exEtChoix` dirige vers le même affichage que `&v=ex` avec en plus un bandeau permettant d'ajouter directement des exercices dont on connaît la référence.
    - `&v=l` ou `&v=light` dirige vers un affichage léger mais autorisant le reparamétrage contrairement à `&v=e`.
    - `&v=latex` dirige vers l'écran de paramétrage en vue d'une exportation vers un code LateX ou d'un fichier pdf.
    - `&v=eval` dirige vers la vue évaluation où l’élève peut aller d’un exercice à l’autre et n’a qu’une seule chance par exercice.
    - `&v=can` propose le même genre de vue mais forcément interactive où chaque page ne propose qu'une question. Parfaite pour une course aux nombres !
    - `&v=recto` et `&v=verso` dirigent vers des versions épurées contenant uniquement les énoncés (recto) ou les corrections (verso) ainsi que le logo COOPMaths, utilisés pour les intégrer à Anki.
    - `&v=e` ou `&v=embed` permet d'épurer la page, de grossir le texte, d'ajouter le logo COOPMaths et de rendre inaccessibles les paramètres, parfait pour l'intégration dans d'autres sites !
    - `&v=multi` permet d'afficher plusieurs énoncés sur toute la largeur de l'écran, notamment pour être utilisé comme questions flash.
    - `&v=diap` permet d'afficher sous forme de diaporama, une question après l'autre, un ou plusieurs exercices.
- `&z=1.5` permet d'ajuster la taille de la police. L'unité est em et est à 1.5 par défaut. Fonctionne autant avec les textes qu'avec les figures. Ne fonctionne pas avec la vue `&v=latex`.

 ## <a id="Exemples" href="#Exemples"></a> [3. Quelques exemples de vues](#Exemples)

![](img/Url-1.jpg)