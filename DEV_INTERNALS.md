# Documentation pour développeurs

Ce fichier donne quelques infos sur les choix d'architecture de code et les outils de développement utilisés

# package.json
le format json du package.json ne permettant pas d'y ajouter des commentaires, voici quelques explications sur son contenu

Cf la [doc officielle](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)

## dépendances
Dans `dependencies` on indique les dépendances utilisées au runtime (par notre code quand il est exécuté)
* core-js : utilisé par babel pour charger dynamiquement ce qui sera utilisé dans le code qui va être chargé et que le navigateur courant ne connaitrait pas (pas dans les devDependencies car c'est bien utilisé au runtime).
* regenerator-runtime : idem, utilisé par babel pour les générateurs (s'il y en a) et la syntaxe [async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function) / [await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await) => ne sera pas chargé si cette syntaxe n'est pas utilisée dans les fichiers chargés
* instrumenpoche : pour les exercices qui l'utilisent
  
Dans les devDependencies on indique les dépendances nécessaire pour le développement, mais qui ne sont pas utilisées par notre code ensuite.
* babel (@babel/core + @babel/plugin-syntax-dynamic-import + @babel/preset-env) : sert à convertir les instructions js utilisées qui serait trop récentes pour les navigateurs ciblés (permet d'utiliser dans le code les toutes dernières avancées de js sans se préoccuper de savoir quel navigateur les comprend, ce sera traduit si le navigateur en a besoin)
* babel-loader : loader webpack pour les fichiers js (passe le fichier à babel avant de le compresser ou pas et le mettre dans build)
* browserslist : pour avoir des critères simples permettant de lister les navigateurs ciblés
* babel-loader : loader webpack pour les fichiers js
* css-loader : loader webpack pour les fichiers css (permet de faire du `import 'path/to/css'` dans le code js pour ajouter les css à la page courante)
* eslint* : pour signaler les pbs de code (style mais aussi les bugs probables, variables non déclarées, imports non utilisés, etc.)
* html-webpack-plugin : plugin webpack (cf commentaires dans la config webpack)
* husky : pour les git hooks (lancer des tâches automatiquement, par ex eslint en pre-commit et les tests unitaires en pre-push)
* mini-css-extract-plugin : plugin webpack (cf commentaires dans la config webpack)
* sass : pour compiler les fichiers scss en css
* sass-plugin : plugin webpack pour les scss
* style-loader : loader webpack pour les css
* webpack, webpack-cli : pour compiler js|css & co
* webpack-dev-server : pour développer en local (lancer un navigateur sur http://localhost avec le code courant et profiter du hot module reloading, qui va recharger le code js dans le navigateur s'il change dans les sources, sans avoir besoin de recharger la page)

Et pour les tests fonctionnels (avec les navigateurs fournis par playwright)
* playwright : le paquet principal, qui fournit les navigateurs et l'api pour les piloter
* sesajs-date : utiliser pour formater les dates dans les logs
* minimist : pour manipuler facilement les arguments passés au script

## navigateurs ciblés
Avant le passage à webpack, mathalea exigeait des navigateurs récents (qui gèrent les [imports dynamiques](https://caniuse.com/?search=es6-module-dynamic-import)), on garde pour ce moment ce critère avec `"browserslist": ["supports es6-module-dynamic-import"]`. Attention, il ne faut pas mettre de targets dans la conf babel (sinon browserlist est ignoré et c'est targets qui impose ses choix).

## configuration babel
On se limite à une configuration minimaliste
* https://babeljs.io/docs/en/babel-preset-env
* [useBuiltIns: "usage"](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) avec core-js 3, pour ne charger que les polyfill nécessaires pour le navigateur courant (donc souvent aucun), et alléger les js produits.

# configuration eslint
On suit la norme de style de code de [standardJs](https://standardjs.com/)
