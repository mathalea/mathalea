# Documentation pour développeurs

La documentation cite partout le gestionnaire de modules [pnpm](https://pnpm.io/), mais vous pouvez utiliser `npm` à la place (remplacer les commandes `pnpm xxx` par `npm xxx`).

## Démarrage
Une fois cloné le projet localement, il faut installer les dépendances avec `pnpm i` (à refaire après chaque modif du package.json)

Ensuite vous pouvez lancer `pnpm start`, cela va ouvrir votre navigateur par défaut sur http://localhost:8080/ qui va afficher ce qui serait compilé dans /build/ (mathalea.html devient le index.html, et les js sont générés dynamiquement, ils sont servi directement sans que le fichier ne soit créé dans le dossier build, ça reste en mémoire, c'est webpack qui gère ça).

Pour que tout fonctionne bien sous windows il faut avoir installé https://gitforwindows.org/
