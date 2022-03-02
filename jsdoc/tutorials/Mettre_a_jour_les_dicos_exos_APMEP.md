## Mise à jour des dictionnaires APMEP

Pour les exercices DNB, BAC ou E3C :

- Générer les fichiers **eps**, **png** et **tex** qui seront utilisés par mathalea avec [cette moulinette maison](https://github.com/slozano54/projetDNB).

> Ces fichiers ne sont pas sur le dépot mathalea car non suivis par git, pour tester en local, il faut créer les dossier **/dnb/**, **/e3c/** et **/bac/** à la racine du projet.

- Les fichiers **eps** vont dans :
    - **/dnb/aaaa/tex/eps/** pour le DNB
    - **/e3c/aaaa/tex/eps/** pour E3C
    - **/bac/aaaa/tex/eps/** pour le BAC
- Les fichiers **png** vont dans :
    - **/dnb/aaaa/tex/png/** pour le DNB
    - **/e3c/aaaa/tex/png/** pour E3C
    - **/bac/aaaa/tex/png/** pour le BAC
- Les fichiers **tex** vont dans :
    - **/dnb/aaaa/tex/** pour le DNB
    - **/e3c/aaaa/tex/** pour E3C
    - **/bac/aaaa/tex/** pour le BAC
- Sur une nouvelle branche, lancer le module python de mise à jour des dictionnaires en suivant [cette doc](dicosDnbBacE3c/index.html)
- Faire un **commit** puis une **Pull Request**
- Transmettre les archives avec les fichiers à Remi ANGOT
- Modifier enfin uniquement les tableau des tags pour chaque exercice.
