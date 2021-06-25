# Redirection

`https://coopmaths.fr/exXXXXX` est redirigé vers `https://coopmaths.fr/exercice.html?ex=XXXXXX`. On peut donc utiliser des URL raccourcies comme `coopmaths.fr/ex6C10` ou `coopmaths.fr/ex6C10&ex=6C11` (seul le premier exercice n'a pas besoin du =).

# Paramétrage d'une série d'exercices

- `i=1` ou `i=0` pour avoir un exercice interactif ou pas (précédemment interactif=)
- `n=5` pour avoir 5 questions (précédemment nbQuestions=)
- `v=XXXX` pour spécifier l'URL d'un complément numérique (id Youtube, url, code iframe...)
- `s=`, `s2=`, `s3=` pour changer les réglages de l'exercices (au travers des variables `this.sup`, `this.sup2`, `this.sup3`)
- `cd=1` ou `cd=0`pour avoir une correction détaillée ou pas (par défaut 1 en sortie HTML et 0 en sortie LaTeX) 
- tout à la fin de l'URL, le `&serie=XXXX` permet de contrôler l'aléatoire et d'avoir exactement les mêmes valeurs numériques
- `&duree=10` est utilisé pour la durée des diaporamas