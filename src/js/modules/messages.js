import { addElement, addText, get } from './dom.js'
/**
 * Fonctions pour gérer les messages utilisateur (feedback erreur|warning ou messages positifs)
 * @module
 */

/**
 * Les types possibles
 * @type {string[]}
 */
const types = ['info', 'warning', 'error', 'positive']

/**
 * Ajoute le feedback dans container
 * @param {HTMLElement} container
 * @param {Object} feedback
 * @param {string} feedback.message
 * @param {string} [feedback.type=error]
 * @param {string} [feedback.titre]
 * @return {HTMLElement} L'élément du feedback (déjà ajouté dans le container)
 */
export function addFeedback (container, { message, type = 'error', titre } = {}) {
  if (!types.includes(type)) {
    console.error(Error(`type de message inconnu : ${type}`))
    type = 'error'
  }
  if (!message) throw Error('Message obligatoire pour tout retour utilisateur')
  const cssDiv = type === 'info' ? '' : type
  const div = addElement(container, 'div', { className: `ui message ${cssDiv}` })
  const cssIcon = type === 'error'
    ? 'frown outline'
    : (type === 'warning')
        ? 'bullhorn'
        : 'bell outline' // info
  const iconClose = addElement(div, 'i', { className: 'close icon' })
  iconClose.addEventListener('click', () => div.remove())
  if (titre) {
    const divTitre = addElement(div, 'div', { className: 'header' })
    addElement(divTitre, 'i', { className: `${cssIcon} icon` })
    addText(divTitre, titre)
  }
  if (/<[a-zA-Z0-9_ "']+/.test(message)) div.innerHTML += message
  else addText(div, message)
  return div
}

/**
 * Ajoute un feedback (erreur ou encouragement)
 * @param {Object} feedback
 * @param {string} feedback.id id du div conteneur à utiliser
 * @param {string} feedback.message Le message à afficher
 * @param {string} feedback.type error|positive
 * @author Rémi ANGOT
 */
export function messageFeedback ({ id, message = '', type = 'error' } = {}) {
  if (!id || !message) return console.error(TypeError('arguments manquants'))
  const container = get(id)
  const div = addFeedback(container, { message, type })
  div.style.width = '400px'
  return div
}

export class UserFriendlyError extends Error {
  /**
   * Erreur destinée à être affichée à l'utilisateur
   * @param {string} [message] Si non fourni ce sera le texte générique 'Une erreur est survenue…
   * @param {Object} [options]
   * @param {string} [options.titre=Erreur interne]
   * @param {string} [options.type=error]
   */
  constructor (message, { titre, type } = {}) {
    if (!message) message = 'Une erreur est survenue.<br>Essayez de rafraichir la page.<br>Si l\'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>'
    super(message)
    this.isUserFriendly = true // pour indiquer que le message peut être affiché tel quel à l'utilisateur
    this.titre = titre || 'Erreur interne'
    this.type = (types.includes(type) && type) || 'error'
  }
}

export const getInvalidModuleError = (path) => new UserFriendlyError(`${path} existe mais ne fournit pas les données attendues, impossible de charger cet exercice`)
export const getNoLatexError = (id) => new UserFriendlyError(`L'exercice ${id} n'a, pour l'instant, pas de version Latex`, { titre: 'Pas de contenu Latex pour cet exercice', type: 'warning' })
export const getUnknownError = (id) => new UserFriendlyError(`L'identifiant ${id} ne correspond à aucun exercice MathALEA.<br>Ceci est peut-être dû à un lien incomplet ou obsolète.`, { titre: 'Le code de l’exercice n’est pas valide' })

/**
 * Gestionnaire d'erreur générique (à mettre dans un catch). Il affichera l'erreur à l'utilisateur en cas de UserFriendlyError, ou le message d'erreur par défaut
 * @param {Error} error
 */
export function errorHandler (error) {
  // on sort toujours l'erreur d'origine en console
  console.error(error)
  // et on gère un retour utilisateur
  const container = get('containerErreur')
  if (!error.isUserFriendly) error = new UserFriendlyError() // le message d'erreur par défaut
  addFeedback(container, error)
}
