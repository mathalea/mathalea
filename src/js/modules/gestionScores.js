/* global $ fetch */

// =============================================================================================================================
// Gestion des scores
// Sébastien LOZANO
// https://docs.google.com/document/d/17ajVHWDkrSYj2VA_OulWgl9iz8zxBLAkfgeEK6m0OXU/edit?usp=sharing
// =============================================================================================================================

import { context } from './context.js'
import { setUrl } from './gestionUrl.js'

export default function gestionScores () {
// Deconnexion scores
  if (document.getElementById('scoresKeyLogOut')) {
    document.getElementById('scoresKeyLogOut').addEventListener('click', function () {
    // Réécrire l'url sans le userId
      const urlRacine = window.location.href.split('?')[0]
      // console.log(urlRacine)
      const queryString = window.location.search
      // console.log(queryString)
      const urlParams = new URLSearchParams(queryString)
      // console.log(urlParams)
      if (urlParams.has('userId')) {
        // On supprime le userId de l'url
        urlParams.delete('userId')
        console.log('Suppression du parametre userId de l\'url OK => ' + urlParams.has('userId'))
      }
      if (window.sessionStorage.getItem('userId')) {
        // On supprime le userId du stockage
        window.sessionStorage.removeItem('userId')
        console.log('Suppression du userId de session.stockage OK => ' + window.sessionStorage.getItem('userId'))
      }
      if (context.userId) {
        // On suprime le userId du context
        delete context.userId
        console.log('Suppression de la propriété context.userId OK => ' + context.userId)
      }
      // Pour cacher le champ userId sur la page courante et le conserver en cas de changement de page
      // On cache le champ prévu pour l'affichage du userId courant
      document.getElementById('userIdDisplay').style.display = 'none'
      // On laisse le bouton de déconnexion caché
      document.getElementById('scoresKeyLogOut').style.display = 'none'
      // On affiche le bouton de connexion
      document.getElementById('scoresKey').style.display = 'initial'
      // On finit la réécriture de l'url
      const entries = urlParams.entries()

      let urlRewrite = urlRacine + '?'
      for (const entry of entries) {
        urlRewrite += entry[0] + '=' + entry[1] + '&'
      }
      urlRewrite = urlRewrite.slice(0, -1)
      // console.log(urlRewrite)
      urlRewrite = new URL(urlRewrite)
      // On remplace dans l'historique
      window.history.replaceState('', '', urlRewrite)
      // On met à jour l'url
      setUrl()
    })
  }

  // Si le bouton existe et que l'utilisateur clique de dessus on ouvre une modale et on propose deux choix
  // => Créer un userId
  // => Utiliser un userId existant

  if (document.getElementById('scoresKey')) {
    document.getElementById('scoresKey').addEventListener('click', function () {
      $('#modalScoresKey').modal({
        onApprove: function () {
        // On ne veut pas que la modale se ferme au click sur un bouton vert
          return false
        },
        onHide: function () {
        // On cache les feedbacks lorsqu'on ferme la modale
          document.getElementById('scoresFeedback').hidden = true
          document.getElementById('scoresInputUserIdError').hidden = true
          document.getElementById('scoresDocumentationFeedback').hidden = true
          // S'il n'y a pas de userId on n'affiche pas le champ du userId courant
          if (!window.sessionStorage.getItem('userId')) {
            // On cache le champ prévu pour l'affichage du userId courant
            document.getElementById('userIdDisplay').style.display = 'none'
            // On laisse le bouton de déconnexion caché
            document.getElementById('scoresKeyLogOut').style.display = 'none'
            // On affiche le bouton de connexion
            document.getElementById('scoresKey').style.display = 'initial'
          } else {
            // On affiche le champ prévu pour l'affichage du userId courant
            document.getElementById('userIdDisplay').style.display = 'initial'
            // On affiche le bouton de déconnexion
            document.getElementById('scoresKeyLogOut').style.display = 'initial'
            // On cache le bouton de connexion
            document.getElementById('scoresKey').style.display = 'none'
          }
        }
      }).modal('show')
    })
  }

  // Dans la modale :
  // Si on clique sur créer un espace => on se contente de créer l'espace
  // Si on clique sur enregistrer des scores => ce sera une autre modale

  // Gestion du click sur "Créer un espace tout neuf"
  if (document.getElementById('scoresCreateSpace')) {
    document.getElementById('scoresCreateSpace').addEventListener('click', function () {
      if (document.getElementById('scoresPromptUserId')) {
        // On cache le champ de saisie
        document.getElementById('scoresPromptUserId').hidden = true
        // On vide le champ input
        document.getElementById('scoresInputUserId').value = ''
      }
      if (document.getElementById('scoresDocumentationFeedback')) {
        // On cache le feedback si il y en a un
        document.getElementById('scoresDocumentationFeedback').hidden = true
      }
      // On génère le userId côté serveur
      fetch('scoresKey.php', {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        // Booléen pour savoir si on crée un espace ou si on en crée un nouveau
          isSubmitUserId: false,
          isVerifResult: false
        })
      })
        .then(response => response.json())// on a besoin de récupérer la réponse du serveur avant de l'utiliser
        .then(response => {
          if (document.getElementById('scoresFeedback')) {
            document.getElementById('scoresFeedbackHeader').innerHTML = 'Espace scores - Création validée'
            document.getElementById('scoresFeedbackBody').innerHTML = `
                Vos fichiers seront enregistrés à cette adresse : <br>
                <a href="${response.url}" target="_blank">${window.location.href.split('?')[0] + response.url.substr(1)}</a><br>
                <b>Conservez la précieusement.</b><br>
                Vous pourrez y ajouter des éléments en utilisant le code prof suivant : <b>${response.userId}</b>
              `
            document.getElementById('scoresFeedback').hidden = false
          }
          console.log('Création d\'un espace scores OK => ' + response.userId)
        })
    })
  }

  // Gestion du click sur "Enregistrer dans un espace existant"
  // Il faut encore gérer le feedback des erreurs sur le userId
  if (document.getElementById('scoresSaveToUserId')) {
    document.getElementById('scoresSaveToUserId').addEventListener('click', function () {
      if (document.getElementById('scoresFeedback')) {
        // On cache le feedback si il y en a un
        document.getElementById('scoresFeedback').hidden = true  
      }
      if (document.getElementById('scoresDocumentationFeedback')) {
        // On cache le feedback si il y en a un
        document.getElementById('scoresDocumentationFeedback').hidden = true
      }
      if (document.getElementById('scoresPromptUserId')) {
      // On affiche le champ de saisie
        document.getElementById('scoresPromptUserId').hidden = false
        // On vide le champ input
        document.getElementById('scoresInputUserId').value = ''
      }
      if (document.getElementById('userIdDisplay')) {
      // On montre le champ prévu pour l'affichage du userId courant
        // document.getElementById('userIdDisplay').hidden = false
        document.getElementById('userIdDisplay').style.display = 'block'
      }
    })
  }

  // Gestion du click sur le bouton "Submit" qui envoie un userId
  if (document.getElementById('scoresSubmitUserId')) {
    document.getElementById('scoresSubmitUserId').addEventListener('click', function () {
    // On récupère la valeur saisie
    // Il faudra vérifier tout ça côté serveur
      const userId = document.getElementById('scoresInputUserId').value
      fetch('scoresKey.php', {
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
          eleve2: userId[6]
        })
      })
        .then(response => response.json())// on a besoin de récupérer la réponse du serveur avant de l'utiliser
        .then(response => {
          if (response.errors !== '') { // S'il y a des erreurs on ne fait rien
            if (document.getElementById('scoresInputUserIdError')) {
            // eslint-disable-next-line quotes
              document.getElementById('scoresInputUserIdErrorHeader').innerHTML = `Échec de la création, corriger les erreurs suivantes :`
              document.getElementById('scoresInputUserIdErrorBody').innerHTML = `
                              ${response.errors}
                            `
              document.getElementById('scoresFeedback').hidden = true
              document.getElementById('scoresInputUserIdError').hidden = false
            }
            console.log('Enregistrement vers un espace scores KO')
          } else { // sinon
          // On ajoute/met à jourle parametre userId dans l'url
          // On récrit d'abord l'url pour éviter les transformations de caractères intempestives
            const urlRacine = window.location.href.split('?')[0]
            // console.log(urlRacine)
            const queryString = window.location.search
            // console.log(queryString)
            const urlParams = new URLSearchParams(queryString)
            // console.log(urlParams)
            if (urlParams.has('userId')) {
              urlParams.set('userId', response.userId)
              console.log(`Modification du parametre userId OK => ${response.userId}`)
            } else {
              urlParams.append('userId', response.userId)
              console.log(`Ajout du parametre userId OK => ${response.userId}`)
            }
            // On met à jour/ajoute au stockage de session dans le navigateur
            context.userId = urlParams.get('userId')
            window.sessionStorage.setItem('userId', context.userId)
            // On finit la réécriture de l'url
            const entries = urlParams.entries()
            // keys = urlParams.keys (),
            // values = urlParams.values (),

            let urlRewrite = urlRacine + '?'
            for (const entry of entries) {
              urlRewrite += entry[0] + '=' + entry[1] + '&'
            }
            urlRewrite = urlRewrite.slice(0, -1)
            // console.log(urlRewrite)
            urlRewrite = new URL(urlRewrite)
            // On remplace dans l'historique
            window.history.replaceState('', '', urlRewrite)
            // On met à jour l'url
            setUrl()

            if (document.getElementById('scoresFeedback')) {
              document.getElementById('scoresFeedbackHeader').innerHTML = `Espace scores - Enregistrement pour le userId ${response.userId} validé`
              document.getElementById('scoresFeedbackBody').innerHTML = `
                              Un bilan de vos scores sera accessible en fin de session en cliquant sur ...<br>
                              ${response.url}<br>                          
                              Vous pourrez ajouter des scores pour votre prof en utilisant le code suivant : <b>${response.userId}</b>
                            `
              document.getElementById('scoresFeedback').hidden = false
              document.getElementById('scoresPromptUserId').hidden = true
              document.getElementById('scoresDocumentationFeedback').hidden = true
            }
            console.log('Enregistrement vers un espace scores OK => ' + response.userId)
            // On affiche le userId dans la fenetre principale
            if (document.getElementById('userIdDisplayValue')) {
              // document.getElementById('userIdDisplayValue').value = response.userId
              document.getElementById('userIdDisplayValue').innerHTML = response.userId
            }
          }
        })
    })
  }

  // Gestion du click sur documentation
  if (document.getElementById('scoresDocumentation')) {
    document.getElementById('scoresDocumentation').addEventListener('click', function () {
      // On cache les feedbacks inutiles
      if (document.getElementById('scoresFeedback')) {
        document.getElementById('scoresFeedback').hidden = true
      }
      if (document.getElementById('scoresPromptUserId')) {
        // On cache le champ de saisie
        document.getElementById('scoresPromptUserId').hidden = true
        // On vide le champ input
        document.getElementById('scoresInputUserId').value = ''
      }

      // On affiche la documentation
      document.getElementById('scoresDocumentationFeedbackHeader').innerHTML = 'Documentation'
      document.getElementById('scoresDocumentationFeedbackBody').innerHTML = `
          Ma superDoc : <br>
          ...<br>
          ...<br>
          ...
        `
      document.getElementById('scoresDocumentationFeedback').hidden = false
    })
  }
}
