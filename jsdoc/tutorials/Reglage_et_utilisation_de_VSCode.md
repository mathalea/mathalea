# **VSCode**
Voici une aide pour les débutants afin qu'ils puissent être en mesure de coder le plus rapidement et efficacement possible.

# Installation
- À faire
## Extensions
1. Vérification de l'orthographe
   - Pour l'anglais [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker "cliquer sur ce lien")

   - Pour le Français [French - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-french "cliquer sur ce lien")

2. Vérification de la syntaxe et mise en forme
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint "cliquer sur ce lien")

3. Résolution automatique des imports manquants
   - [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport "cliquer sur ce lien")

4. Visualisation des branches Git 
   - [Git Graph](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint "cliquer sur ce lien")

5. Optimisation des fonctionnalités (Annotation du code en relation avec les commit, etc.)
   - [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens "cliquer sur ce lien")

6. Pose de signets cliquables dans le code afin de se déplacer très efficacement
   - [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks "cliquer sur ce lien")

7. Collaboration asynchrone qui simplifie la discussion et la révision du code entre développeurs en gardant le contexte du code
   - [New Relic CodeStream](https://marketplace.visualstudio.com/items?itemName=CodeStream.codestream "cliquer sur ce lien")

8. Collaboration en temps réel (chat textuel et audio, révisions de code à distance, conférences interactives, etc.)
   - [Live Share Extension Pack](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack "cliquer sur ce lien")

9. Utilisation de blocks de code préfabriqués
   
   On pourrait peut-être en faire nous même pour qu'ils correspondent au **squelettes des exercices**
   - [Nom](https:// "cliquer sur ce lien")

# Configuration
- À faire
# Utilisation
## Comprendre l'interface utilisateur
Être efficace avec un logiciel, c'est tout d'abord repérer les différentes zones de l'interface graphique

![](img/tutoVSCode/interfaceGeneraleVSCodeAvecCadres.png)
- En rouge, la barre de menus
  
  Comme dans tous les logiciels, c'est dans cette barre que vous allez trouvez la plupart des fonctionnalités présentes dans VSCode.
- En bleu, la barre d'icônes

  Cette barre permet de choisir le cadre de gauche que vous souhaitez pour :
   - ![](img/tutoVSCode/) Avoir un explorateur de fichiers.
   - ![](img/tutoVSCode/) Faire une recherche dans tous les fichiers du projet.![](img/tutoVSCode/) Travailler de manière graphique avec Git.
   - ![](img/tutoVSCode/) Déboguer votre code.
   - ![](img/tutoVSCode/) Gérer vos extensions VSCode.

  Les quatre icônes suivantes sont ajoutées par certaines extensions installées:
   - ![](img/tutoVSCode/) représente l'extension Bookmarks
   - ![](img/tutoVSCode/) représente l'extension GitLens
   - ![](img/tutoVSCode/) représente l'extension Live Share
   - ![](img/tutoVSCode/) représente l'extension New Relic CodeStream
  
  Enfin, les deux dernières icônes sont des icônes propres à VSCode :
   - ![](img/tutoVSCode/) concerne vos comptes (gitHub)
   - ![](img/tutoVSCode/) est un raccourci vers File>Preferences


- En violet,la barre d'état
  
  Comme la barre d'icônes, la barre d'état est très importante car VSCode donne beaucoup de renseignements (Branche sur laquelle vous vous trouvez, type de fichier sur lequel vous codez, etc.) dans celle-ci. De plus, certaines extensions (Git Graph) y place leur raccourci. Etc.


- En vert, le cadre de gauche

   Il s'agit du cadre qui est ouvert quand vous cliquez une première fois sur l'une des icônes de la barre d'icônes.

   Si vous souhaitez fermer le cadre de gauche et ainsi agrandir le cadre central (jaune) pour coder plus confortablement, il suffit de cliquez une deuxième fois sur l'icône active (blanchie) de la barre d'icônes.

- En jaune, le cadre central

   C'est ici que vous allez coder. Il y a un onglet par fichier ouvert. Il est possible de scinder le cadre central pour, par exemple, avoir un visualisateur de fichiers (exemple, fichier markDown, etc.).
## Les raccourcis clavier
Voici par ordre d'importance les principaux raccourcis clavier pour être rapidement productif

1. Ouvrir la palette
   - Ctrl+Maj+p (Windows)
   - Cmd+Maj+p (macOSX)
   - Ctrl+Maj+p (Linux)
2. Trouver rapidement un fichier dans tout le projet
   - Ctrl+p (Windows)
   - Cmd+p (macOSX)
   - Ctrl+p (Linux)
3. Trouver une chaîne de caractère dans le fichier dans lequel on travaille
4. Trouver et remplacer une chaîne de caractère dans lequel on travaille
5. Trouver une chaîne de caractère dans tout le projet
6. Lancer le debugger
   - F5 (Windows)
   - ? (macOSX)
   - F5 (Linux)
7. Renommer une variable ou une fonction
   - F2 (Windows)
   - ? (macOSX)
   - F2 (Linux)
8. Édition multiple Ctrl+alt+flèche haut ou bas
   Attention, il s'agit d'un search and replace textuel et non sémantique.
   - Ctrl+Alt+flèche haut ou bas ou bien Alt+clic (Windows)
   - Ctrl+D sur la sélection courante. À chaque Ctrl+D on obtient la prochaine occurrence pour ajouter un curseur
   - Ctrl+Maj+L sur la sélection courante. On obtient un curseur sur toutes les occurrences de la sélection
   - ? (macOSX)
   - Alt+Maj+flèche haut ou bas (Linux)


9.  Plier tout le code du fichier en cours
   - Ctrl+k-0
   - ? (macOSX)
   - Ctrl+k-0 (Linux)
11. Déplier tout le code du fichier en cours
    - Ctrl+k-j (Windows)
    - ? (macOSX)
    - Ctrl+k-j (Linux)
12. Plier seulement le bloc en cours
    - ? (Windows)
    - ? (macOSX)
    - ? (Linux)
13. Déplier seulement le bloc en cours
    - ? (Windows)
    - ? (macOSX)
    - ? (Linux)
14. Utiliser des snippets
    - ? (Windows)
    - ? (macOSX)
    - ? (Linux)
