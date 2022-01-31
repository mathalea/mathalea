Toutes nos documents sont sous licence libre (AGPL pour le JavaScript CC-BY-SA pour le tex et les pdf).
Ce fichier décrit les choix d'architecture de code et les outils de développement utilisés.

## <a id="1" href="#1">#</a> Arborescence
#### <a id="2" href="#2">#</a> Les dossiers principaux
- Les exercices sont rangés par niveau dans `/src/js/exercices/`.
- Les fonctions que l'on souhaite utiliser dans plusieurs exercices sont à ranger dans `/src/js/modules/`.
- Les fichiers statiques légers sont à déposer dans `/assets/`.
- Les fichiers statiques lourds (vidéos...) sont à déposer dans le dépôt du site coopmaths.
- Les sources des tutoriels sont dans `/jsdoc/tutorials` et les fichiers statiques destinés aux tutoriels sont dans `/jsdoc/static/`.

#### <a id="3" href="#3">#</a> Les autres
- Le dossier `/build/` contient la version en développement du site [coopmaths.fr](https://coopmaths.fr/), est construit avec `pnpm run build` et est consultable en faisant `pnpm start`.
- Le dossier `/documentation/` contient toute la documentation générée à l'aide de jsdoc et consultable en ligne [ici](https://coopmaths.fr/documentation/) et en local en faisant `pnpm run doc:show`.
- Le dossier `/node_modules/` contient toutes les dépendances installées grâce à `pnpm i`.
- Le dossier `/src/assets/externalJs/` contient des bibliothèques JavaScript utilisées par le projet.
- Le dossier `/tasks/` contient des fichiers permettant la création de la liste des exercices `pnpm build:dicos` et de la doc `pnpm run build:doc` ainsi que l'affichage de cette dernière `pnpm run doc:show`.
- Le dossier `/testsBrowser/` contient le nécessaire pour lancer des tests automatisés (par exemple lancer tous les exercices pour voir s'il n'y a pas d'erreur dans la console).

## <a id="4" href="#4">#</a> package.json
le format json du `package.json` ne permettant pas d'y ajouter des commentaires, voici quelques explications sur son contenu

Cf la [doc officielle](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)

## <a id="5" href="#5">#</a> Dépendances (si vous voulez faire un super truc, l'outil nécessaire se trouve ci-dessous, probablement :) )
**Dans l'entrée `dependencies` du `package.json` on indique les dépendances utilisées au runtime (par notre code quand il est exécuté)**
* [Bugsnag](https://www.bugsnag.com) v. 7.11.0 : Outil de suivi des bugs.
* [cortex-js/math-json](https://cortexjs.io/math-json/) v. 0.1.1 : Utilisé pour son clavier et la saisie des mathématiques dans les champs de réponses.
* [SVG.js](https://svgjs.dev/docs/3.0/) v. 3.1.1 : Bibliothèque JavaScript pour manipuler et animer des SVG utilisée pour afficher des figures.
* [Algebrite](http://algebrite.org/) v. 1.4.0 : Bibliothèque Javascript pour le calcul exact avec les nombres décimaux et le calcul formel.
* [Clipboard.js](https://clipboardjs.com/) v. 2.0.8 : Permet de copier du texte vers le presse-papier utilisé pour le bouton "Copier le code LaTeX".
* [CodeMirror](https://codemirror.net) v. 5.63.1 : Editeur de code dans le navigateur utilisé pour l'éditeur de MathALEA2D.
* [core-js](https://www.npmjs.com/package/core-js) v. 3.18.2 : Utilisé par babel pour charger dynamiquement ce qui sera utilisé dans le code qui va être chargé et que le navigateur courant ne connaîtrait pas (pas dans les devDependencies car c'est bien utilisé au runtime).
* [InstrumEnPoche](https://instrumenpoche.sesamath.net) : Permet de faire des animations avec les instruments de géométrie.
* [jQuery](https://jquery.com/) v. 3.6.0 : Dépendance de datatables et de Semantic UI.
* [jquery-ui](https://jqueryui.com/about/) v. 1.13.1 : Interface utilisateur pour jQuery.
* [KaTeX](https://katex.org/) v. 0.13.18 : Pour le rendu LaTeX des exercices en ligne.
* [loadjs](https://github.com/muicss/loadjs) v. 4.2.0 : Loader qui récupère le JavaScript, le CSS et les images en parallèle et exécute ensuite le code.
* [maths.js](https://mathjs.org) v. 9.5.0 : Utilisé pour le calcul exact et le calcul formel en mathématiques.
* [MathLive](https://mathlive.io) v. 0.69.7 : Permet de faire des exercices interactifs.
* [QRCode.js](https://davidshimjs.github.io/qrcodejs/) v. 1.4.4 : Générateur de QRCode.
* [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) v. 0.13.9 : Utilisé par babel pour les générateurs (s'il y en a) et la syntaxe [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function) / [await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await) => ne sera pas chargé si cette syntaxe n'est pas utilisée dans les fichiers chargés.
* [seedrandom](https://github.com/davidbau/seedrandom) v. 3.0.5 : Générateur de nombre aléatoire à l'aide d'une graine.
* [sval](https://github.com/Siubaak/sval) v. 0.4.8 : Interpréteur de JavaScript, écrit en JavaScript.

**Dans l'entrée `devDependencies` du `package.json` on indique les dépendances nécessaire pour le développement, mais qui ne sont pas utilisées par notre code ensuite.**
* [babel/core](https://babeljs.io/) v. 7.15.8 : Sert à convertir les instructions js utilisées qui serait trop récentes pour les navigateurs ciblés (permet d'utiliser dans le code les toutes dernières avancées de js sans se préoccuper de savoir quel navigateur les comprend, ce sera traduit si le navigateur en a besoin).
* [babel/plugin-syntax-dynamic-import](https://babeljs.io/) v. 7.8.3 : idem
* [babel/preset-modules](https://babeljs.io/) v. 0.1.4 : idem
* [babel-loader](https://webpack.js.org/loaders/babel-loader/) v. 8.2.2 : Loader webpack pour les fichiers js (passe le fichier à babel avant de le compresser ou pas et le mettre dans build).
* [browserslist](https://github.com/browserslist/browserslist) v. 4.17.3 : Pour avoir des critères simples permettant de lister les navigateurs ciblés.
* [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/) v. 8.1.1 : Plugin webpack pour copier des fichiers ou dossiers dans le dossier `/build/`.
* [css-loader](https://webpack.js.org/loaders/css-loader/) v. 5.2.7 : Loader webpack pour les fichiers css (permet de faire du `import 'path/to/css'` dans le code js pour ajouter les css à la page courante).
* [datatables.net](https://datatables.net) v. 1.11.3 : Plugin jQuery pour faire de beaux tableaux pour la liste des exercices et le moteur de recherche.
* [datatables.net-dt](https://www.npmjs.com/package/datatables.net-dt) v. 1.10.25 : Fichiers pour styliser DataTables.
* [docdash](https://github.com/clenemt/docdash) v. 1.2.0 : Thème pour JSDoc.
* [eslint](https://eslint.org/) v. 7.32.0 : Permet d'avoir un code normalisé (pour le style mais évite aussi des bugs probables, variables non déclarées, imports non utilisés, etc.).
* [eslint-config-standard](https://github.com/standard/eslint-config-standard) v. 16.0.2 : Configuration standard d'ESLint.
* [eslint-import-resolver-node](https://eslint.org/) v. 0.3.6 : Plugin du plugin `eslint-plugin-import` pour gérer la résolution des modules de type Node.
* [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) v. 2.24.2 : Plugin ESLint pour gérer les imports et exports des noms et chemins de fichiers.
* [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) v. 11.1.0 : Plugin ESLint pour gérer Node.js.
* [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise) v. 4.3.1 : Plugin ESLint pour gérer les promesses.
* [esm](https://github.com/standard-things/esm) v. 3.2.25 : Loader de module ECMAScript.
* [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/) v. 5.3.2 : Plugin webpack simplifiant la création des HTML.
* [husky](https://typicode.github.io/husky/) v. 6.0.0 : Permet de lancer des tâches automatiquement, par exemple ESLint en pre-commit et les tests unitaires en pre-push.
* [jsdoc](https://jsdoc.app/) v. 3.6.7 : Générateur de documentation. JSDoc scanne le code source en JavaScript et génère une documentation en HTML.
* [json-loader](https://webpack-v3.jsx.app/loaders/json-loader/) v. 0.5.7 : **L'import de fichiers JSON fonctionne par défaut dans webpack, alors que fait cette extention ici ?**
* [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) v. 1.6.2 : Plugin webpack qui crée un CSS par JavaScript qui contient du CSS.
* [minimist](https://github.com/substack/minimist) v. 1.2.5 : Permet de manipuler facilement les arguments passés au script pour les tests de playwright.
* [playwright](https://playwright.dev/) v. 1.15.2 : Fournit les navigateurs et l'api pour les piloter pour les tests fonctionnels (automatisés).
* [sesajs-date](https://framagit.org/Sesamath/sesajs-date.git#main) : Utilisé pour formater les dates dans les logs des tests de playwright.
* [style-loader](https://webpack.js.org/loaders/style-loader/) v. 2.0.0 : Loader webpack pour les CSS (injecte le CSS dans le DOM).
* [terser-webpack-plugin](https://webpack.js.org/plugins/terser-webpack-plugin/) v. 5.2.4 : Plugin webpack pour minifier le JavaScript.
* [webpack](https://webpack.js.org/) v. 5.58.1 : Pour compiler js|css & co.
* [webpack-cli](https://webpack.js.org/) v. 4.9.0 : Interface en Ligne de Commande (CLI) pour webpack.
* [webpack-dev-server](https://webpack.js.org/) v. 3.11.2 : Pour développer en local (lancer un navigateur sur http://localhost avec le code courant et profiter du hot module reloading, qui va recharger le code js dans le navigateur s'il change dans les sources, sans avoir besoin de recharger la page).

**Dans le dossier `/src/assets/externalJs/` se trouvent d'autre bibliothèques JavaScript**
* [Semantic UI](https://semantic-ui.com/) v. 2.0.7 : Permet de standardiser l'interface utilisateur.
* [cm-resize](https://github.com/Sphinxxxx/cm-resize) v. 1.0.1 : Ajoute une poignée de redimensionnement à l'éditeur de CodeMirror.
* [filesaver](https://github.com/eligrey/FileSaver.js/) v. 2.0.4 : Permet de sauvegarder des fichiers générés côté client.
* [Giac/XCas](https://www-fourier.ujf-grenoble.fr/~parisse/giac_fr.html) développé par Bernard Parisse et Renée De Graeve (pour le calcul formel dans les exercices de lycée)
* [JSZip](https://stuk.github.io/jszip/) v3.6.0 : Permet de créer, lire et modifier des .zip.
* [prismjs](http://prismjs.com/) v. 1.11 : Permet la coloration syntaxique du code LaTeX entre autres.
* [Scratchblocks](https://scratchblocks.github.io/) v. 3.5 : Permet de créer des SVG de blocs Scratch à partir de lignes de code.

**Données présentes dans le README.MD mais présentes ni dans les `devDependencies`, ni les `dependencies` du `package.json`, ni dans le dossier `/src/assets/externalJs/`. Où sont-elles ?**
* [Download.js](http://danml.com/download.html) CCBY2 (pour le téléchargement du fichier LaTeX généré).

## <a id="6" href="#6">#</a> navigateurs ciblés
Avant le passage à webpack, mathalea exigeait des navigateurs récents (qui gèrent les [imports dynamiques](https://caniuse.com/?search=es6-module-dynamic-import)), on garde pour ce moment ce critère avec `"browserslist ["supports es6-module-dynamic-import"]`. Attention, il ne faut pas mettre de targets dans la conf babel (sinon browserlist est ignoré et c'est targets qui impose ses choix).

## <a id="7" href="#7">#</a> configuration babel
On se limite à une configuration minimaliste :
* https://babeljs.io/docs/en/babel-preset-env
* [useBuiltIns: "usage"](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) avec core-js 3, pour ne charger que les polyfill nécessaires pour le navigateur courant (donc souvent aucun), et alléger les js produits.

## <a id="8" href="#8">#</a> configuration eslint
On suit la norme de style de code de [standardJs](https://standardjs.com/).
