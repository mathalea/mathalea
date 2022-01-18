**<a id="1" href="#1">#</a> Message d'erreur :**

![](img/Conflit-0.png)

Ce n'est pas un message d'erreur ! Il vous dit juste que ça c'est bien passé ! (et qu'il aimerait un petit commentaire). Il suffit de faire ctrl + x pour quitter, la fusion sera effective quand même :)

---
**<a id="2" href="#2">#</a> Message d'erreur :**

![](img/Erreur-1.png)

**Description de l'erreur :**
* Vous avez des fichiers enregistrés avec des modifications
* Vous n'avez pas commit les modifications
* Vous essayez de changer de branche
* Si vous changez de branche, vos modifications non commit seront perdues

**Solution :**
* Vous pouvez choisir de commit vos modifications si vous êtes prêt à le faire :
    * `git commit -am "message de description du commit"`
* Si vous n'êtes pas prêt à commit, vous pouvez mettre de côté vos modifications pour les reprendre plus tard :
    * `git stash` pour mettre de côté
    * faites ce que vous avez à faire
    * une fois que vous avez terminé, revenez sur votre branche avec `git checkout laBrancheOuJaiEuLeMessageDErreur`
    * puis ressortez tous vos fichiers avec `git stash pop`
---
**<a id="3" href="#3">#</a> Message d'erreur :**

![](img/Erreur-2.png)

**Description de l'erreur :**
* Vous avez essayé de **Pull Request** une branche sur github
* Il y a un conflit

**Solution :**
* Vous pouvez poursuivre le merge et laisser Rémi Angot gérer le conflit si vous n'êtes pas à l'aise
* Vous pouvez aussi le gérer vous-même : pour le soulager d'une part, et d'autre part si le conflit concerne un fichier sur lequel vous êtes en train de travailler, vous pourrez décider d'adapter votre code en fonction de ces nouvelles informations.
    * `git checkout master` pour se positionner sur le master
    * `git pull` pour le mettre à jour
    * `git checkout laBranqueQueJeVeuxPullRequest` pour se repositionner sur la branche avec qu'on veut **Pull Request**
    * `git merge master` pour la fusionner (merge) avec le master
    * Suivre ensuite les [instructions pour gérer un conflit de merge](https://coopmaths.fr/documentation/tutorial-Utiliser_git_en_ligne_de_commandes.html#12)

---
**<a id="4" href="#4">#</a> Message d'erreur :**

![](img/Erreur-3.png)

**Description de l'erreur :**
* Vous avez lancé `pnpm run build:dicos` ou `pnpm start`
* Il y a un problème dans le dictionnaire des exercices aléatoires
* Ça arrive souvent après un merge

**Solution :**
* Reconstruire le dictionnaire des exercices aléatoires :
    * `pnpm run build:dicos` dans un terminal pour le faire
    * On enregistre le(s) fichier(s)
    * Et voilà !

---
**<a id="5" href="#5">#</a> Message d'erreur :**

![](img/Erreur-4.png)

**Description de l'erreur :**
* Vous avez voulu mettre à jour une branche autre que master
* Vous avez oublié de préciser qu'il fallait la mettre à jour à partir du dépôt distant "origin"

**Solution :**
* Lancer
    * `git pull origin nomDeLaBranche` dans un terminal

---
**<a id="6" href="#6">#</a> Message d'erreur :**

![](img/Erreur-5.png)

**Description de l'erreur :**
* Vous avez lancé un `pnpm i` (par exemple lors de la première installation)
* Il y a un souci avec le serveur de certificats de votre système Linux

**Solution :**
* Lancer
    * `sudo apt-get install --reinstall ca-certificates` dans un terminal
    * puis à nouveau `pnpm i`

---
**<a id="7" href="#7">#</a> Message d'erreur :**

![](img/Erreur-6.png)

**Description de l'erreur :**
* Vous avez voulu installer pnpm en lançant `npm install -g pnpm` ou `sudo npm install -g pnpm`
* pnpm est déjà installé

**Solution :**
* Il n'y a rien à faire, c'est bon ! pnpm est installé !