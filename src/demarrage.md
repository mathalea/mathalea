# Démarrage

## nodeJs & npm
Installer [nodeJs](https://nodejs.org/en/download/) installera aussi npm (node package manager, un gestionnaire de paquets js).

La documentation cite partout le gestionnaire de modules [pnpm](https://pnpm.io/), mais vous pouvez utiliser `npm` à la place (remplacer les commandes `pnpm xxx` par `npm xxx`).

Pour installer pnpm c'est `npm install -g pnpm` (il faut être admin, préfixer éventuellement la commande par sudo sous linux|mac)

## git
* windows : https://gitforwindows.org/ (installe aussi gitBash qui vous permettra de taper les commandes trouvées un peu partout dans un terminal)
* linux : installer le paquet git de votre distribution
* macOs : https://git-scm.com/download/mac

Cf aussi éventuellement https://git-scm.com/downloads/guis
  
```shell
# Dans le répertoire où l'on veut cloner de dépôt
git clone https://github.com/mathalea/mathalea.git
# Dans le répertoire fraîchement cloné pour passer dans la branche webpack
git checkout webpack
# pour installer les modules js utilisés en dépendances
pnpm install
# pour lancer le build de dev et ouvrir le navigateur dessus
pnpm start

# pour créer une branche locale
git branch branchetest
# pour aller sur cette branche
git checkout branchetest
# pour faire les deux commandes précédentes en une
git checkout -b branchetest

# pour pousser/créer cette nouvelle branche sur le depot distant
git push origin branchetest
# pour supprimer cette nouvelle branche sur le depot distant
git push origin --delete branchetest
# pour supprimer cette nouvelle branche locale
git branch -d branchetest

# pour récupérer toutes les branches distantes en local (sans modifier le dossier courant)
git fetch origin

# pour mettre à jour la branche locale d'après sa branche distante
git pull

# pour annuler complétement un commit sur une branche locale, 
# notamment si on a oublié qu'on est sur master et qu'on a fait des commit
# annuler uniquement le dernier commit
git reset --hard HEAD^
# annuler les deux derniers commits
git reset --hard HEAD~2
# annuler les trois derniers commits
git reset --hard HEAD~3
# etc
```

### docs
* [L'aide-mémoire indispensable](http://ndpsoftware.com/git-cheatsheet.html)
* un [article intéressant](https://delicious-insights.com/fr/articles/apprendre-git)
* le [git book en français](https://git-scm.com/book/fr/v2) (2ème édition 2014)
* la [référence](https://git-scm.com/docs) (en anglais)
* un [cours interactif en français](https://learngitbranching.js.org/)
* de [bon tutoriaux en français](https://fr.atlassian.com/git/tutorials)
* Des articles de Christophe Porteneuve [généralités](https://delicious-insights.com/fr/articles/git-workflows-generality/), [git-log](https://delicious-insights.com/fr/articles/git-log/), [hooks](https://delicious-insights.com/fr/articles/git-hooks-commit/)
* qq [recettes de cuisine](http://pioupioum.fr/developpement/git-10-commandes-utiles.html)

## Démarrage
Une fois cloné le projet localement, il faut installer les dépendances avec `pnpm i` (à refaire après chaque modif du package.json)

Ensuite vous pouvez lancer `pnpm start`, cela va ouvrir votre navigateur par défaut sur http://localhost:8080/ qui va afficher ce qui serait compilé dans /build/ (mathalea.html devient le index.html, et les js sont générés dynamiquement, ils sont servi directement sans que le fichier ne soit créé dans le dossier build, ça reste en mémoire, c'est webpack qui gère ça).
