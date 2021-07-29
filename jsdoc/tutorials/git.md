
## Un peu de vocabulaire
* Le dépôt principal sur lequel on se base tous se nomme **master**
* Si on veut participer au développement, on copie le **master** et on se crée sa propre **branche** que nous avons décidé de nommer par convention NomDeLaPersonne-ReferenceDeLExercice-PrecisionEventuelle
* Une fois nos fichiers sauvegardés localement, on peut faire une photo de tout notre dossier mathalea par le biais de ce qu'on appelle un **commit** (ce n'est pas aussi gros que ça en a l'air, en fait le **commit** ne liste que les différences par rapport à une version précédente et est par conséquent très léger !)
* On peut envoyer ce commit sur GitHub pour le rendre accessible aux autres en faisant ce qu'on appelle un **push**
* Les autres peuvent alors le récupérer en faisant ce qu'on appelle un **pull**
* Une fois qu'on est satisfait de son code, on peut demander à l'intégrer au **master** en faisant un **Pull Request** qu'on appelle plus communément **PR**.

Pour faire tout cela, on peut utiliser une interface graphique comme [GitKraken](https://www.gitkraken.com/download) (qui semble être le plus populaire parmi nous) ou [GitHub Desktop](https://desktop.github.com/) ou encore utiliser les lignes de commandes ci-dessous (il n'y a pas d'interférence, par exemple on peut très bien d'une part faire les tâches les plus communes et les plus simples en ligne de commande et d'autre part passer par une interface graphique lorsqu'on veut faire des choses inhabituelles ou compliquées).
GitKraken permet d'ailleurs de très efficacement visualiser ces différentes étapes :

![](img/Git-1.png)

## Quelques situations usuelles

#### Je suis où là ?
```shell
# Affiche l'ensemble des branches locales avec une étoile et de la couleur sur la branche actuelle
git branch
```
#### Je m'appelle John et je veux m'atteler à la création de l'exercice 5P12 qui portera sur les ratios.
```shell
# Je commence par me placer sur le master
git checkout master

# Je récupère les dernières modifications
git pull

# Je copie la branche sur laquelle je suis (master) et crée ma nouvelle branche en respectant la syntaxe NomDeLaPersonne-ReferenceDeLExercice-PrecisionEventuelle
git checkout -b John-5P12-Ratios

# Après avoir fait quelques modifications (sans oublier d'enregistrer les fichiers), je peux les commit
git commit -am "quelques modifications de faites"

# Après avoir commit, je peux envoyer ce que j'ai fait sur GitHub pour le rendre accessible aux autres
git push origin John-5P12-Ratios

# Mon exercice était tellement bien qu'il a déjà été intégré au master, je n'ai plus besoin de ma branche locale et peux donc la supprimer
git branch -d John-5P12-Ratios

# Ou sinon il était tellement nul que je décide de le bazarder sans l'intégrer à quoi que ce soit
git branch -D John-5P12-Ratios

```
#### OUPS j'ai commit sur master au lieu de le faire sur ma branche !
```shell
# Pas de panique, je copie ce que j'ai fait dans une nouvelle branche
git checkout -b nouvelleBranche

# Je reviens au master
git checkout master

# Je le reset en récupérant la version présente sur GitHub
 git reset origin/master

```
#### Je suis en train de faire un truc de OUF mais je dois aller aider mon pote Joey !
```shell
# Je commence par mettre mon côté de côté. En étant sur maBrancheAvecUnTrucDeOUF, je fais :
git stash

# Je récupère la liste des branches distantes
git fetch origin

# Je vais sur la branche de Joey pour l'aider
git checkout laBrancheDeJoey

# Une fois que j'ai terminé, je peux revenir sur ma branche
git checkout maBrancheAvecUnTrucDeOUF

# Je récupère le contenu que j'avais mis de côté
git stash pop

# Remarque : la remise est une pile, donc elle peut contenir des éléments de différentes branches
# Pour voir la liste des choses en remise, je peux faire
git stash list

```
#### Anticiper un conflit de merge en local
```shell
# dans maBranche, on vérifie que tout est clean
git status

# on en crée une autre
git checkout -b tmp

# on tente un merge, par exemple de la branche main
git merge main

# on sait si ça passe (ou pas), on revient où on en était
git checkout maBranche

# et on efface le test
git branch -D tmp
```

#### Pour aller plus loin
* un [cours interactif en français](https://learngitbranching.js.org/?locale=fr_FR)
* de [bon tutoriaux en français](https://fr.atlassian.com/git/tutorials)
* Des articles de Christophe Porteneuve [généralités](https://delicious-insights.com/fr/articles/git-workflows-generality/), [git-log](https://delicious-insights.com/fr/articles/git-log/), [hooks](https://delicious-insights.com/fr/articles/git-hooks-commit/)
* [Git : 10 commandes utiles](http://pioupioum.fr/developpement/git-10-commandes-utiles.html)
* la [documentation Git sur Sesamath](https://wiki.sesamath.net/doku.php?id=public:dev:git:start)
* une [aide-mémoire de l'ensemble des commandes](http://ndpsoftware.com/git-cheatsheet.html)
* un [article intéressant](https://delicious-insights.com/fr/articles/apprendre-git)
* le [git book en français](https://git-scm.com/book/fr/v2) (2ème édition 2014)
* la [référence](https://git-scm.com/docs) (en anglais)
