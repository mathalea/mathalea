/**
 * La configuration spécifique à ce clone du dépôt git.
 * Utile pour y mettre des infos qui ne doivent pas être sous git, comme la clé bugsnag
 * (cela pourrait être également des infos pour le déploiement, ce genre de chose)
 *
 * Pour l'utiliser, copier ce dossier _private.example en _private et renseigner la clé bugsnag
 * @module
 */

/**
 * Une apiKey pour bugsnag, si elle existe webpack va ajouter bugsnag à la compilation
 * @type {string}
 */
export const bugsnagApiKey = ''
