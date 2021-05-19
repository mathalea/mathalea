import { addElement, addText, get } from './dom'
// Module regroupant les fonctions de gestions des erreurs.

const types = ['info', 'warning', 'error', 'positive']

/**
 * Ajoute le feedback dans container
 * @param {HTMLElement} container
 * @param {Object} erreur
 * @param {string} [erreur.message]
 * @param {string} [erreur.level]
 * @param {string} [erreur.titre]
 */
export function addFeedback (container, { message = 'Une erreur est survenue', level = 'erreur', titre = 'Erreur interne' } = {}) {
  if (!types.includes(level)) {
    console.error(Error(`type de message inconnu : ${level}`))
    level = 'error'
  }
  const cssDiv = level === 'info' ? '' : level
  const div = addElement(container, 'div', { className: `ui message ${cssDiv}` })
  const cssIcon = level === 'error'
    ? 'frown outline'
    : (level === 'warning')
        ? 'bullhorn'
        : 'bell outline' // info
  const iconClose = addElement(div, 'i', { className: 'close icon' })
  iconClose.addEventListener('click', () => div.remove())
  if (titre) {
    const divTitre = addElement(div, 'div', { className: 'header' })
    addElement(divTitre, 'i', { className: `${cssIcon} icon` })
    addText(divTitre, titre)
  }
  addText(div, message)
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
        level: 'error'
      })
      break
    case 'mg32load':
      addFeedback(container, {
        titre: 'Erreur de chargement du module mg32',
        message: `Une erreur est survenue lors du chargement d'un module pour l'affichage de l'exercice. <br>
          Essayez de rafraichir la page. <br> Si l'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>`,
        level: 'warning'
      })
      break
    case 'scratchLoad':
      addFeedback(container, {
        titre: 'Erreur de chargement du module scratch',
        message: `Une erreur est survenue lors du chargement d'un module pour l'affichage de l'exercice. <br>
          Essayez de rafraichir la page. <br> Si l'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>`,
        level: 'warning'
      })
      break
    default:
      console.error(Error(`code ${code} non géré par messageUtilisateur`))
      addFeedback(container, {
        titre: 'Erreur interne',
        message: `Une erreur est survenue.<br>
          Essayez de rafraichir la page. <br> Si l'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>`,
        level: 'warning'
      })
  }
}

/**
 * Ajoute un feedback (erreur ou encouragement)
 * @param {Object} data
 * @param {string} data.id id du div conteneur à utiliser
 * @param {string} data.texte Le texte à afficher
 * @param {string} data.type error|positive
 * @author Rémi ANGOT
 */
export function messageFeedback ({ id, texte = '', type = 'error' } = {}) {
  if (!id || !texte) return console.error(TypeError('arguments manquants'))
  const container = get(id)
  const div = addFeedback(container, { message: texte, level: type })
  div.style.width = '400px'
}
