
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

# Remarque, s'il y a trop de branches distantes pour être affichées d'un coup, le terminal ne sera pas "disponible" tant que vous ne les aurez pas toutes vues
# Appuyer sur "Entrée" fait avancer d'une ligne
# Si on veut "quitter", il faut alors appuyer sur la touche "Q"
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
#### J'ai créé ma branche il y a un moment, j'aimerais la mettre à jour avec les dernières nouveautés du master, comment faire ?
```shell
# Je commence par me placer sur le master
git checkout master

# Si j'ai un message d'erreur qui me dit que je dois valider ou remiser mes modifications avant de basculer de branche, je les remise avec
git stash

# Une fois sur le master, je le mets à jour
git pull

# Je repars sur ma branche
git checkout maBranche

# Je récupère éventuellement mes modificasions remisées
git stash pop

# Je mets à jour ma branche à partir du master
git merge master

# Avec un peu de chance, il n'y a pas de conflit.
# Si j'ai moins de chance, il y aura un conflit. Mais j'ai quand même de la chance ! En bas de cette page est expliqué comment régler un conflit ! :D
```
#### Quelqu'un m'a filé un coup de main et a fait des modifications sur ma branche, comment la mettre à jour ?
```shell
git pull origin nomDeLaBranche
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
#### Je veux aller sur une autre branche mais je ne suis pas encore prêt à **commit** mon travail sur maBrancheEnCoursDeTravaux
```shell
# Je peux mettre mon travail de côté grâce à
git stash

# Si besoin, je peux récupérer la liste des branches distantes avec
git fetch origin

# Je vais sur laBrancheCible
git checkout laBrancheCible

# Une fois que j'ai terminé, je peux revenir sur maBrancheEnCoursDeTravaux
git checkout maBrancheEnCoursDeTravaux

# Je peux récupérer le contenu que j'avais mis de côté avec
git stash pop

# Remarque : la remise (stash) est une pile, donc elle peut contenir des éléments de différentes branches
# Pour voir la liste des choses en remise, je peux faire
git stash list
```
#### HELP ! J'ai supprimé ma branche et je n'arrive plus à retrouver mes fichiers !
```shell
# Pas de panique, la commande suivante va ressortir tout l'historique de ce que tu as pu faire avec git
git reflog --no-abbrev

# Tu copies le grand code juste avant la suppression de ta branche (le [sha]), et lances la commande suivante pour réouvrir ta branche disparue !
git checkout [sha]

# Par contre, pour éviter les problèmes, ne travailles pas à partir de cette ancienne branche,
# copie plutôt les fichiers qui t'intéressent à l'aide de l'explorateur de ton système d'exploitation et crée une nouvelle branche à partir du master
```
#### HELP ! J'ai fait n'importe quoi avec ma branche et plus rien ne marche !
```shell
# On va te refaire une belle branche toute propre :

# Commence par copier les fichiers sur lesquels tu as travaillé à l'aide de l'explorateur de ton système d'exploitation

# Crée une nouvelle branche à partir du master (à jour tant qu'à faire)
git checkout master
git pull
git checkout -b nouvelleBranche

# Replace les fichiers au bon endroit à l'aide de l'explorateur de ton système d'exploitation

# Supprime la branche toute cassée
git branch -D brancheTouteCassee
```
#### Anticiper un conflit de merge en local
```shell
# dans maBranche, on vérifie que tout est clean
git status

# on crée une autre branche temporaire à partir de maBranche
git checkout -b tmp

# on tente un merge, par exemple de la branche master
git merge master

# on sait si ça passe (ou pas), on revient où on en était
git checkout maBranche

# et on efface le test
git branch -D tmp
```
## J'ai tenté de merge, mais ça ne se passe pas bien :'( Comment faire ?
![](img/Conflit-1.png)
![](img/Conflit-2.png)
![](img/Conflit-3.png)
![](img/Conflit-4.png)
![](img/Conflit-5.png)
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
