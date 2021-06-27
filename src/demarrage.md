Cette documentation est une base pour la plupart des développeurs et développeuses d'exercices.

Il y en a d'autres plus spécifiques :
* [mathalea2D](2d/)
* [mathaleaInstrumenpoche](instrumenpoche/)
* [tout](tout/) La doc complète. À priori pour les développeurs du moteur, mais si vous ne trouvez pas la doc de la fonction dont vous auriez besoin allez voir par là-bas si elle n'y est pas

# Logiciels à installer pour pouvoir participer

- Installer [VSCodium](https://vscodium.com) ou Visual Studio Code 
- Installer [Github Desktop](https://desktop.github.com) (ou équivalent)
- Installer [NodeJS](https://nodejs.org/fr/)
- Installer pnpm avec `npm install -g pnpm` dans un terminal (il faut être admin, préfixer éventuellement la commande par sudo sous linux|mac)
- Installer l’extension [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) dans Visual Studio Code
- Se créer un compte sur Github.com puis le communiquer à Rémi Angot pour obtenir des droits d'écriture (sauf sur la branche master qui est protégée pour tout le monde)
- Cloner le dépôt [github.com/mathalea/mathalea](https://github.com/mathalea/mathalea)

# Premiers pas

Une fois le projet cloné localement, il faut installer les dépendances avec `pnpm i` dans un terminal à la racine du projet (à refaire après chaque modification de package.json lorsqu'on intègre de nouveaux outils externes)

Ensuite vous pouvez lancer `pnpm start`, cela va ouvrir votre navigateur par défaut sur http://localhost:8080/ qui va afficher ce qui serait compilé dans /build/ (les js sont générés dynamiquement, ils sont servis directement sans que le fichier ne soit créé dans le dossier build, ça reste en mémoire, c'est webpack qui gère ça).

Rendez-vous sur [http://localhost:8080/mathalea.html](http://localhost:8080/mathalea.html) ou sur [http://localhost:8080/mathalea.html?filtre=beta](http://localhost:8080/mathalea.html?filtre=beta) si le nom de fichier de votre exercice commence par beta.

Si vous créez un nouvel exercice, lancez `pnpm build:dicos` pour mettre à jour la liste des exercices.

Pour générer la documentation, lancer `pnpm run build:doc`

Et ensuite, pour visualiser cette documentation, lancer `pnpm run doc:show`


Vous avez des modèles pour commencer votre exercice : 

- src/js/beta/betaExemple1Type.js // Un même type de question répété 
- src/js/beta/betaExemple.js // Les questions peuvent être très différentes et leur nombre est fixé
- src/js/beta/betaExemple1TypeCalculLettre.js // Un même type de question répété  mais présenté A=..., B=...
- src/js/beta/betaExemple3Types.js // On créé 3 types de questions  qui seront alternés (et que l'on peut pondérer)

Avec VSCodium ou VSCode, l'extension ESLint permet de repérer les erreurs et améliorer la mise en forme de votre document (avec les règles de [StandardJS](https://standardjs.com)). Voir Affichages > Problèmes pour une description des erreurs et `CTRL+MAJ+P` ou `CMD+MAJ+P`  puis `ESLint: Fix all auto-fixable Problems` pour améliorer la typographie et le style de votre code.



