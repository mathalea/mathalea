# Tests fonctionnels automatisés

Il s'agit de piloter un navigateur avec du code pour vérifier que tout se passe comme attendu

`pnpm run test:list` pour voir la liste des tests implémentés

Attention, par défaut les tests sont lancés sur http://localhost:8080/, ça suppose qu'un devServer tourne déjà, sinon il faut préciser `--devServer` pour que le test le lance au préalable (mais en général on préfère lancer `pnpm start` d'un coté puis un `pnpm test --scenario xxx` de l'autre, pour éviter de relancer la compilation webpack complète à chaque test du scenario)

## tasks
Ce sont des tâches génériques. Par exemple
* loadAll : passe en revue tous les exercices pour vérifier qu'il n'y a pas de plantage en console.error
* runAllScenarios : lance tous les scérarios

Elles se lancent avec par ex la commande `pnpm test --task xxx`

## scenario

Chaque scénario doit exporter une fct async qui prend un objet Page et doit faire ses tests.
En cas de pb ça throw une Error, sinon ça retourne une promesse résolue.

On utilise pas mocha/chai ici pour ne pas alourdir et simplifier la syntaxe, il n'y a que du code [playwrigth](https://playwright.dev/docs/api/class-page/) à écrire.

