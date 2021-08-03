![](img/Conflit-0.png)
Ce n'est pas un message d'erreur ! Il vous dit juste que ça c'est bien passé ! (et qu'il aimerait un petit commentaire). Il suffit de faire ctrl + x pour quitter, la fusion sera effective quand même :)
---
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