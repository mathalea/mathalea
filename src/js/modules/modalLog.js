/* global $ */
import { context } from './context.js'
import { addFetchHtmlToParent } from './dom'
import { getUserId, setUrl } from './gestionUrl'

export const modalLog = async () => {
  if (document.getElementById('modalLog') === null) {
    await addFetchHtmlToParent('templates/modalLog.html', document.body)
  }
  $('#modalLog').modal('show')
  document.getElementById('scoresInputUserId').focus()
  document.getElementById('scoresSubmitUserId').addEventListener('click', () => {
    context.userId = document.getElementById('scoresInputUserId').value

    // On récupère la valeur saisie
    const userId = context.userId // document.getElementById('scoresInputUserId').value
    async function myFirstScoresManageFetch () {
      const response = await fetch('scoresManage.php', {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isSubmitUserId: true,
          isVerifResult: false,
          userId: userId,
          prof1: userId[0],
          prof2: userId[1],
          prof3: userId[2],
          classe1: userId[3],
          classe2: userId[4],
          eleve1: userId[5],
          eleve2: userId[6],
          eleve3: userId[7]
        })
      })
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`)
      }
      const myResponseJson = await response.json()
      if (myResponseJson.errors !== '') { // S'il y a des erreurs on ne fait rien
        document.getElementById('scoresInputUserIdError').hidden = false
        if (document.getElementById('scoresInputUserIdError')) {
        // eslint-disable-next-line quotes
          document.getElementById('scoresInputUserIdErrorHeader').innerHTML = `Échec de la connexion, corriger les erreurs suivantes :`
          document.getElementById('scoresInputUserIdErrorBody').innerHTML = `
                          ${myResponseJson.errors}
                        `
        }
        console.log('Enregistrement vers un espace scores KO')
      } else { // sinon
        $('#modalLog').modal('hide')
        // On ajoute/met à jourle parametre userId dans l'url
        // On récrit d'abord l'url pour éviter les transformations de caractères intempestives
        const urlRacine = window.location.href.split('?')[0]
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        if (urlParams.has('userId')) {
          urlParams.set('userId', myResponseJson.userId)
        } else {
          urlParams.append('userId', myResponseJson.userId)
        }
        // On met à jour/ajoute au stockage de session dans le navigateur
        context.userId = urlParams.get('userId')
        try {
          if (typeof (window.sessionStorage) === 'object') {
            window.sessionStorage.setItem('userId', context.userId)
          }
        } catch (err) {}
        // On finit la réécriture de l'url
        const entries = urlParams.entries()

        let urlRewrite = urlRacine + '?'
        for (const entry of entries) {
          urlRewrite += entry[0] + '=' + entry[1] + '&'
        }
        urlRewrite = urlRewrite.slice(0, -1)
        urlRewrite = new URL(urlRewrite)
        // On remplace dans l'historique
        window.history.replaceState('', '', urlRewrite)
        // On met à jour l'url
        setUrl('myFirstScoresManagerFetch')
        initialiseBoutonsConnexion()
        // Cache le numéro de série
        if (document.getElementById('form_serie')) {
          document.getElementById('form_serie').style.display = 'none'
        }
        const label = document.querySelector('label[for=form_serie]')
        if (label) {
          label.style.display = 'none'
        }
      }
    }

    myFirstScoresManageFetch()
      .catch(e => {
        console.log('/!\\ firstScoresManage.php /!\\ Pb avec l\'opération de récupération sûrement en dev local sans serveur PHP, message d\'erreur => ' + e.message)
      })
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
