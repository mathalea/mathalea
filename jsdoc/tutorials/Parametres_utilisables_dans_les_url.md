## <a id="1" href="#1">#</a> Redirection

`https://coopmaths.fr/exXXXXX` est redirigé vers `https://coopmaths.fr/exercice.html?ex=XXXXXX`. On peut donc utiliser des URL raccourcies comme `coopmaths.fr/ex6C10` ou `coopmaths.fr/ex6C10&ex=6C11` (seul le premier exercice n'a pas besoin du =).

## <a id="2" href="#2">#</a> Paramétrage d'une série d'exercices

- `,i=1` ou `,i=0` pour avoir un exercice interactif ou pas (précédemment interactif=).
- `,n=5` pour avoir 5 questions (précédemment nbQuestions=).
- `,vXXXX` pour spécifier l'URL d'un complément numérique (id Youtube, url, code iframe...).
- `,s=`, `,s2=`, `,s3=` pour changer les réglages de l'exercices (au travers des variables `this.sup`, `this.sup2`, `this.sup3`).
- `,cd=1` ou `,cd=0`pour avoir une correction détaillée ou pas (par défaut 1 en sortie HTML et 0 en sortie LaTeX).
- `&serie=XXXX` permet de contrôler l'aléatoire et d'avoir exactement les mêmes valeurs numériques.
- `&log=1` déclenche une fenêtre modale de connexion pour l'enregistrement des scores (un peu comme un popup dans la page).
- `&v=` détermine le contexte de la vue :
    - `&v=menu` dirige vers la page principale du générateur d'exercices avec à gauche la liste des exercices et à droite les exercices.
    - `&v=ex` dirige vers l'affichage normal de l'exercice (avec tous les boutons zoom, copier le lien, export latex/pdf, code html, QRCode etc.).
    - `&v=exEtChoix` dirige vers le même affichage que `&v=ex` avec en plus un bandeau permettant d'ajouter directement des exercices dont on connaît la référence.
    - `&v=l` ou `&v=light` dirige vers un affichage léger mais autorisant le reparamétrage contrairement à `&v=e`.
    - `&v=latex` dirige vers l'écran de paramétrage en vue d'une exportation vers un code LateX ou d'un fichier pdf.
    - `&v=eval` dirige vers la vue évaluation où l’élève peut aller d’un exercice à l’autre et n’a qu’une seule chance par exercice.
    - `&v=can` dirige vers une vue similaire mais où chaque page correspond à une question, parfaite pour une course aux nombres !
    - `&v=recto` et `&v=verso` dirigent vers des versions épurées contenant uniquement les énnoncés (recto) ou les correction (verso) ainsi que le logo COOPMaths, utilisés pour les intégrer à Anki.
    - `&v=e` ou `&v=embed` permet d'épurer la page, de grossir le texte, d'ajouter le logo COOPMaths et de rendre inaccessibles les paramètres, parfait pour l'intégration dans d'autres sites !
    - `&v=multi` permet d'afficher plusieurs énoncés sur toute la largeur de l'écran, notamment pour être utilisés comme questions flash.
    - `&v=cm` dirige vers l'écran de paramétrage en vue d'un affichage sous forme de diaporama.
        - `&duree=10` est utilisé pour la durée des diaporamas.

 <a id="3" href="#3">#</a> Quelques exemples de vues :

![](img/Url-1.jpg)