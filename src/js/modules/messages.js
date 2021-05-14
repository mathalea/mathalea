// Module regroupant les fonctions de gestions des erreurs.

function divMessage (erreur) {
// Construit le message d'erreur pour insertion dans la page.
  if (erreur.niveau === 'erreur') {
    return `<div id="affichageErreur" class="ui error message"><i id="fermerMessageErreur" class="close icon"></i>
    <div class="header">
      <i class="frown outline icon"></i> ${erreur.titre}
    </div>
      ${erreur.message}
  </div>`
  }
  if (erreur.niveau === 'warning') {
    return `<div id="affichageErreur" class="ui warning message"><i id="fermerMessageErreur" class="close icon"></i>
    <div class="header">
      <i class="bullhorn icon"></i> ${erreur.titre}
    </div>
      ${erreur.message}
  </div>`
  }
  if (erreur.niveau === 'info') {
    return `<div id="affichageErreur" class="ui message"><i id="fermerMessageErreur" class="close icon"></i>
    <div class="header">
      <i class="bell outline icon"></i> ${erreur.titre}
    </div>
      ${erreur.message}
  </div>`
  }
}

/**
*
* @param {code:'code de l'erreur',[exercice : 'identifiant de l'exercice']}
* @author Cédric GROLLEAU
*/
export function messageUtilisateur (erreur) {
  let divErreur = ''
  if (erreur.code === 'codeExerciceInconnu') {
    divErreur = divMessage({
      titre: 'le code de l\'exercice n\'est pas valide',
      message: `L'identifiant ${erreur.exercice} ne correspond à aucun exercice MathALEA. <br> Ceci est peut-être dû à un lien incomplet ou obsolète. `,
      niveau: 'erreur'
    })
  } else if (erreur.code === 'mg32load') {
    divErreur = divMessage({
      titre: 'Erreur de chargement du module mg32',
      message: `Une erreur est survenue lors du chargement d'un module pour l'affichage de l'exercice. <br>
        Essayez de rafraichir la page. <br> Si l'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>`,
      niveau: 'warning'
    })
  } else if (erreur.code === 'scratchLoad') {
    divErreur = divMessage({
      titre: 'Erreur de chargement du module scratch',
      message: `Une erreur est survenue lors du chargement d'un module pour l'affichage de l'exercice. <br>
        Essayez de rafraichir la page. <br> Si l'erreur persiste merci de contacter : <a href="mailto:contact@coopmaths.fr">contact@coopmaths.fr</a>`,
      niveau: 'warning'
    })
  }
  document.getElementById('containerErreur').innerHTML = divErreur
  document.getElementById('fermerMessageErreur').addEventListener('click', function () {
    document.getElementById('affichageErreur').remove()
  })
}

/**
 *
 * @param {id : 'id du div', texte: 'message', type:'error ou positive'}
 * @author Rémi ANGOT
 */
export function messageFeedback (options) {
  const typeMessage = options.type || 'error'
  if (options.id && options.texte) {
    const html = `<div id="messageFeedback${options.id}" class="ui ${typeMessage} message" style="width:400px"><i id="fermerFeedback${options.id}" class="close icon"></i>
        ${options.texte}
  </div>`
    document.getElementById(options.id).innerHTML = html
    document.getElementById(`fermerFeedback${options.id}`).addEventListener('click', function () {
      document.getElementById(`messageFeedback${options.id}`).remove()
    })
  }
}
