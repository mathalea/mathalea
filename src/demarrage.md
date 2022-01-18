Cette documentation est une base pour la plupart des développeurs et développeuses d'exercices.

Il y en a d'autres plus spécifiques :
* [mathalea2D](2d/)
* [mathaleaInstrumenpoche](instrumenpoche/)
* [tout](tout/) La doc complète. À priori pour les développeurs du moteur, mais si vous avez besoin d'une fonction particulière lorsque vous créez un exercice, vous pouvez y jeter un oeil pour voir si quelqu'un d'autre ne l'a pas déjà créé.

Différents tutoriels sont accessibles via le panneau de gauche, n'hésitez pas à y jeter un oeil !

# Guide de première installation
Le but de ce guide n'est pas de vous guider pas à pas mais de vous faire éviter tous les écueils. Il vous aiguillera à chaque "intersection" mais supposera que vous serez capables de vous en sortir à chaque "ligne droite" comme par exemple que vous serez capables de cliquer sur "suivant" lors des installations (même si c'est écrit en anglais !).

Par contre, il est important que vous suiviez chacune de ces étapes, car si vous en oubliez une, vous serez certainement bloqué par une erreur par la suite.

Le corollaire étant, si vous êtes bloqués par une erreur, passez en revue les points précédents pour vérifier si vous avez bien tout fait.
## Installation des logiciels
- Commencer par se créer un compte sur Github.com puis le communiquer à Rémi Angot pour obtenir des droits d'écriture (sauf sur la branche master qui est protégée pour tout le monde). Vous n'avez pas à attendre qu'il le fasse pour faire la suite, alors c'est parti !
- Installer [Visual Studio Code](https://code.visualstudio.com/Download) (conseillé si vous voulez avoir moins de soucis lors de l'installation) ou [VSCodium](https://vscodium.com) (si vous êtes plus débrouillard et voulez une installation sans aucune trace de Microsoft), appelés **VSC** par la suite.
- Installer NodeJS :
    - Pour [Windows et MacOS](https://nodejs.org/fr/) (la version LTS).
    - Pour les distributions **Linux** basées sur Debian (comme Ubuntu), ouvrir un terminal et saisir :
        - `sudo apt-get install curl apt-transport-https lsb-release`
        - `sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -`
        - `sudo apt-get install -y nodejs`
    - Pour savoir à quoi correspondent les lignes précédentes et savoir comment installer sur les autres distributions [c'est par ici](https://coopmaths.fr/documentation/tutorial-Installer_NodeJS_sur_Linux.html).
    
- Installer Git :
    - [Pour Windows](https://git-scm.com/download/).
    - Pour **MacOS** :
        - Commencer par ouvrir un terminal (cliquer sur le LaunchPad et rechercher `Terminal`).
        - Commencer par installer Homebrew si ce n'est pas déjà fait en copiant-collant cette commande :
            - `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
            - (ça peut prendre un moment)
        - Puis installer Git en copiant-collant cette commande : `brew install git`
    - Pour **Linux**, saisir `sudo apt-get install git` dans un terminal (pour les distributions basées sur Debian comme Ubuntu).
- Installer [GitKraken](https://www.gitkraken.com/download) (qui semble être le plus populaire parmi nous) ou [GitHub Desktop](https://desktop.github.com/) et se connecter avec le compte GitHub créé précédemment.

## Paramétrage de VSC (Visual Studio Code)
- Ouvrir VSC.
- Il vous proposera très rapidement d'installer le module linguistique pour le traduire en français. Sachez que dans la suite de ce tuto, ce seront les noms anglais qui seront utilisés donc si vous voulez faire le choix de le traduire en français, mieux vaut attendre la fin du tuto ;).
- Cliquer sur "Source Control" dans le panneau de gauche, puis "Clone Repository" et ensuite sur "Clone from GitHub". [image](img/Config_VSC-1.png)
- Vous devrez alors vous connecter sur GitHub et autoriser VSC à accéder à votre compte.
- Rechercher "mathalea" dans la barre du haut et cliquer sur "mathalea/mathalea" qui est le dépôt original (s'il n'y a pas de barre de recherche en haut, cliquer à nouveau sur "Clone Repository"). [image](img/Config_VSC-2.png)
- Il faut ensuite choisir dans quel dossier local sera copié le code source de mathalea et ensuite laisser la copie se faire tranquillement.
- Une fois la copie terminée, vous pourrez ouvrir directement le dossier grâce à la notification en bas à droite (si vous n'étiez pas devant l'ordinateur à ce moment là et que vous l'avez loupée, vous pouvez la faire réapparaître avec la toute petite cloche en bas à droite). [image](img/Config_VSC-3.png)
- Vous avez maintenant accès au code source de MathALEA soigneusement copié sur votre ordinateur ! [image](img/Config_VSC-4.png)
- Vous pouvez le parcourir rapidement si vous êtes curieux ou continuer le paramétrage :)
- Installer l’extension [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
- Ouvrir le terminal (CTRL+J pour **Windows** et **Linux** ou CTRL+` pour **Mac**).
    - Sur **Windows**, le terminal par défaut est **powershell** mais il rend plus compliqué les étapes suivantes, nous allons donc le remplacer par **cmd**. Pour cela :
        - Cliquer sur la petite flèche qui pointe vers le bas à droite du terminal puis sur "Select Default Profile". [image](img/Config_VSC-5.png)
        - Cliquer sur Command Prompt dans le menu qui s'affiche puis fermer le terminal actuel grâce à la petite poubelle en bas à droite. [image](img/Config_VSC-6.png)
        - Vous pouvez réouvrir un nouveau terminal avec (CTRL+J) et vérifier que ce n'est plus **powershell** mais **cmd** (s'il y a un souci fermez et relancez VSC). [image](img/Config_VSC-7.png)
    - Remarque : Si vous voulez conserver **powershell**, à chaque fois que vous voudrez lancer un script qui commence par `npm` ou `pnpm`, il faudra faire :
        - `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser` pour enlever la sécurité.
        - `pnpm votreCommande` pour exécuter votre commande.
        - `Set-ExecutionPolicy -ExecutionPolicy Restricted -Scope CurrentUser` pour remettre la sécurité.
- Installer pnpm (uniquement en cas de première installation sur cet ordinateur, si vous tentez de l'installer à nouveau, il vous affichera [un message d'erreur](img/Erreur-6.png) vous prévenant qu'il est déjà installé).
    - Sur **Windows** il faut être administrateur et saisir `npm install -g pnpm` dans le terminal.
    - Sur **Mac** et **Linux** il faut le préfixer de `sudo`, ce qui donne `sudo npm install -g pnpm`.
- De la même façon, saisir `pnpm i` pour installer les dépendances nécessaires (ça prendra un moment si c'est la première fois, faites autre chose en attendant mais ne fermez pas le logiciel pour éviter les problèmes). Il faudra le refaire lorsqu'on intègrera de nouveaux outils externes, ce qui n'arrivera pas tous les jours (on préviendra sur Slack).
Il se peut que l'installation stoppe à cause d'une erreur : "server certificate verification failed". Pour remédier à ce problème vous devez installer (ou réinstaller les certificats sur votre système Linux en tapant `sudo apt-get install --reinstall ca-certificates` dans le terminal. Puis relancez la commande `pnpm i`)
- Enfin, vous pouvez vérifier que tout fonctionne en lançant `pnpm start` qui va ouvrir votre navigateur par défaut pour afficher (au bout de quelques dizaines de secondes) la dernière version de MathAlea en développement !

Si le site s'affiche bien, Félicitations ! vous êtes fin prêt(e) à participer à ce projet ! et vous pouvez cliquer sur [Architecture du code](https://coopmaths.fr/documentation/tutorial-Architecture_du_code.html) pour comprendre comment est structuré le code de MathALEA ou directement sur [Créer un exercice](https://coopmaths.fr/documentation/tutorial-Creer_un_exercice.html) si vous voulez apprendre à créer votre premier exercice sans plus attendre !

Sinon, c'est que cette documentation est encore à améliorer ! et vous êtes invité(e) à faire part de vos soucis sur Slack pour qu'on vous aide et qu'on améliore cette documentation :)
