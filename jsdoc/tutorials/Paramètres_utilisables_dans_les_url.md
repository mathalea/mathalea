## Redirection

`https://coopmaths.fr/exXXXXX` est redirigé vers `https://coopmaths.fr/exercice.html?ex=XXXXXX`. On peut donc utiliser des URL raccourcies comme `coopmaths.fr/ex6C10` ou `coopmaths.fr/ex6C10&ex=6C11` (seul le premier exercice n'a pas besoin du =).

## Paramétrage d'une série d'exercices

- `,i=1` ou `,i=0` pour avoir un exercice interactif ou pas (précédemment interactif=)
- `,n=5` pour avoir 5 questions (précédemment nbQuestions=)
- `,vXXXX` pour spécifier l'URL d'un complément numérique (id Youtube, url, code iframe...)
- `,s=`, `,s2=`, `,s3=` pour changer les réglages de l'exercices (au travers des variables `this.sup`, `this.sup2`, `this.sup3`)
- `,cd=1` ou `,cd=0`pour avoir une correction détaillée ou pas (par défaut 1 en sortie HTML et 0 en sortie LaTeX) 
- `&serie=XXXX` permet de contrôler l'aléatoire et d'avoir exactement les mêmes valeurs numériques
- `&v=` détermine le contexte de la vue :
    - `&v=menu` dirige vers la page principale du générateur d'exercices avec à gauche la liste des exercices et à droite les exercices
    - `&v=ex` dirige vers l'affichage normal de l'exercice (avec tous les boutons zoom, copier le lien, export latex/pdf, code html, QRCode etc.)
    - `&v=exEtChoix` dirige vers le même affichage que `&v=ex` avec en plus un bandeau permettant d'ajouter directement des exercices dont on connaît la référence.
    - `&v=l` ou `&v=light` dirige vers un affichage léger pour embed par exemple (avec juste "Nouvelles données" et les boutons liés au score)
    - `&v=cm` dirige vers l'écran de paramétrage en vue d'un affichage sous forme de diaporame
    - `&v=latex` dirige vers l'écran de paramétrage en vue d'une exportation vers un code LateX ou d'un fichier pdf.
    - `&v=eval` dirige vers la vue évaluation où l’élève peut aller d’un exercice à l’autre et n’a qu’une seule chance par exercice.
    - `&v=recto` et `&v=verso` dirigent vers des versions épurées contenant uniquement les énnoncés (recto) ou les correction (verso)
- `&duree=10` est utilisé pour la durée des diaporamas