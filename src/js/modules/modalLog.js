/* global $ */
import { context } from './context'
import { addFetchHtmlToParent } from './dom'
import { getUserId, setUrl } from './gestionUrl'

export const modalLog = async () => {
  if (document.getElementById('modalLog') === null) {
    await addFetchHtmlToParent('templates/modalLog.html', document.body)
  }
  $('#modalLog').modal('show')
  document.getElementById('scoresInputUserId').focus()
  document.getElementById('scoresSubmitUserId').addEventListener('click', () => {
    $('#modalLog').modal('hide')
    context.userId = document.getElementById('scoresInputUserId').value
    setUrl()
    initialiseBoutonsConnexion()
    // Cache le numéro de série
    if (document.getElementById('form_serie')) {
      document.getElementById('form_serie').style.display = 'none'
    }
    const label = document.querySelector('label[for=form_serie]')
    if (label) {
      label.style.display = 'none'
    }
  })
}

export const initialiseBoutonsConnexion = () => {
  if (document.getElementById('scoresLogIn')) {
    document.getElementById('scoresLogIn').addEventListener('click', modalLog)
  }
  const userId = getUserId()
  if (userId && document.getElementById('userIdDisplay')) {
    // On affiche le champ prévu pour l'affichage du userId courant
    document.getElementById('userIdDisplay').style.display = 'initial'
    // On affiche le userId dans la fenetre principale
    if (document.getElementById('userIdDisplayValue')) {
      document.getElementById('userIdDisplayValue').innerHTML = userId
    }
    // On affiche le bouton de déconnexion
    document.getElementById('scoresLogOut').style.display = 'initial'
    // On cache le bouton de connexion
    document.getElementById('scoresLogIn').style.display = 'none'
  }
}
