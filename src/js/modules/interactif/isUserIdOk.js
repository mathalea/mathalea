import { context } from '../context.js'
import { getUserIdFromUrl, getVueFromUrl } from '../gestionUrl.js'

/**
 * @author Sébastien LOZANO
 * @param {object} exercice
 * @param {number} nbBonnesReponses
 * @param {number} nbMauvaisesReponses
 */

export function isUserIdOk (exercice, nbBonnesReponses, nbMauvaisesReponses) {
  // => vérifier si le paramètre existe dans l'url : OK
  // il a pu être entré manuellement
  // agir en fonction pour les enregistrements
  const userId = getUserIdFromUrl() // ne renvoit pas ce que je veux, en fait si ??? bizarre
  // TODO => gérer un chrono à partir du serveur si on est en mode chrono
  // Pour le moment je l'ajoute aux csv avec un string 'à venir'
  let duree = null
  if (context.duree) {
    // duree = getDureeFromUrl() // Pour quand ce sera fait
    duree = 'à venir'
    // console.log('context duree : ' + duree)
  } else {
    duree = 'à venir'
    // console.log('pas context duree : ' + duree)
  }
  // const str = window.location.href
  // const url = new URL(str)
  // const userId = url.searchParams.get('userId')
  async function myThirdScoresManageFetch () {
    const response = await fetch('scoresManage.php', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Booléen pour savoir si on crée un espace ou si on en crée un nouveau
        isSubmitUserId: false,
        isVerifResult: true,
        userId: userId,
        prof1: userId[0],
        prof2: userId[1],
        prof3: userId[2],
        classe1: userId[3],
        classe2: userId[4],
        eleve1: userId[5],
        eleve2: userId[6],
        eleve3: userId[7],
        // eslint-disable-next-line no-unneeded-ternary
        isCan: getVueFromUrl() === 'can' ? 'oui' : 'non',
        urlExos: document.location.href + '&serie=' + context.graine,
        exId: exercice.id,
        sup: exercice.sup,
        sup2: exercice.sup2,
        sup3: exercice.sup3,
        nbBonnesReponses: nbBonnesReponses,
        nbQuestions: nbBonnesReponses + nbMauvaisesReponses,
        score: nbBonnesReponses / (nbBonnesReponses + nbMauvaisesReponses) * 100,
        duree: duree
      })
    })
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`)
    }
  }
  // eslint-disable-next-line no-unused-expressions
  userId === null
    ? (
        console.log('userId KO')
      )
    : (
        console.log('userId OK : ' + userId),
        myThirdScoresManageFetch()
          .catch(e => {
            console.log('/!\\ thirdScoresManage.php /!\\ Pb avec l\'opération de récupération sûrement en dev local sans serveur PHP, message d\'erreur => ' + e.message)
          })
      )
}
