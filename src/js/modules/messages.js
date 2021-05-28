import { addElement, addText, get } from './dom'
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
* Affiche un message à l'utilisateur
* @author Cédric GROLLEAU
* @param {Object} datas
* @param {string} datas.code codeExerciceInconnu|mg32load|scratchLoad
* @param {string} [datas.exercice] à fournir si code vaut 'codeExerciceInconnu'
*/
export function messageUtilisateur ({ code, exercice }) {
  const container = get('containerErreur')
  switch (code) {
    case 'codeExerciceInconnu':
      addFeedback(container, {
        titre: 'le code de l’exercice n’est pas valide',
        message: `L'identifiant ${exercice} ne correspond à aucun exercice MathALEA. <br> Ceci est peut-être dû à un lien incomplet ou obsolète. `,
        type: 'error'
      })
      break
    case 'mg32load':
      addFeedback(container, {
        titre: 'Erreur de chargement du module mg32',
        message: `Une erreur est survenue lors du chargement d'un module pour l'affichage de l'exercice. <br>
          Essayez de rafraichir la page. <br> Si l'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>`,
        type: 'warning'
      })
      break
    case 'scratchLoad':
      addFeedback(container, {
        titre: 'Erreur de chargement du module scratch',
        message: `Une erreur est survenue lors du chargement d'un module pour l'affichage de l'exercice. <br>
          Essayez de rafraichir la page. <br> Si l'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>`,
        type: 'warning'
      })
      break
    case 'noLatex':
      addFeedback(container, {
        titre: 'Pas de contenu Latex pour cet exercice',
        message: `L'exercice ${exercice} n'a, pour l'instant, pas de version Latex`,
        type: 'warning'
      })
      break
    default:
      console.error(Error(`code ${code} non géré par messageUtilisateur`))
      addFeedback(container, {
        titre: 'Erreur interne',
        message: `Une erreur est survenue.<br>
          Essayez de rafraichir la page. <br> Si l'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>`,
        type: 'warning'
      })
  }
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
