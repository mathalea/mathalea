/* global fetch */

// =============================================================================================================================
// Gestion des scores
// Sébastien LOZANO
// https://docs.google.com/document/d/17ajVHWDkrSYj2VA_OulWgl9iz8zxBLAkfgeEK6m0OXU/edit?usp=sharing
// https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Async_await
// =============================================================================================================================

import { context } from './context.js'
import { setUrl, setUrlAndGo } from './gestionUrl.js'

export default function gestionScores () {
  // On vérfie s'il faut remettre à zéro le répertoire de stockage des espaces de scores
  async function myCleanSpacesFetch () {
    const response = await fetch('scoresCleanSpaces.php', {
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`)
    }
    const myResponseJson = await response.json()
    if (document.getElementById('scoresInfosTimeLeft')) {
      document.getElementById('scoresInfosTimeLeft').innerHTML = `
        Ce service ne garantit en rien la pérennité des données. Bien au contraire, <b>les données sont actuellement effacées tous les jours</b>. <!--une fois par an.-->
        <ul>
          <li>    
            <b>Charge aux utilisateurs du service de les récupérer avant</b>.
            <ul>
              <li>Nous sommes le ${myResponseJson.currentDate}, <b>le prochain effacement complet est prévu à partir du ${myResponseJson.deleteNextDate}.</b></li>
              <li>Il reste donc <b>${myResponseJson.timeLeft} jour(s) avant la prochaine remise à zéro</b> des espaces de scores.</li>          
              <li>Le répertoire père est créé depuis ${myResponseJson.timeSinceCreation} seconde(s).</li>
            </ul>
          </li>
          <li>Si vous découvrez l'enregistrement des scores, c'est mieux de <b>consulter la documentation</b> ! </li>
          <li>Ce module ne fonctionne qu'avec les exercices interactifs, ce qui est loin d'être la majorité des ressources... pour l'instant.</li>
          <li><b>Ce module est encore en cours de développement donc il risque d'y avoir des comportements inattendus.</b></li>
        </ul>
        `
    }
  }

  myCleanSpacesFetch()
    .catch(e => {
      console.log('/!\\ scoresCleanScpaces.php /!\\ Pb avec l\'opération de récupération sûrement en dev local sans serveur PHP, message d\'erreur => ' + e.message)
    })

  // Deconnexion scores
  if (document.getElementById('scoresLogOut')) {
    document.getElementById('scoresLogOut').addEventListener('click', function () {
      // Effacer le champ de saisie de l'userId
      if (document.getElementById('scoresInputUserId')) {
        document.getElementById('scoresInputUserId').value = ''
      }
      // Réécrire l'url sans le userId
      const urlRacine = window.location.href.split('?')[0]
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      if (urlParams.has('userId')) {
        // On supprime le userId de l'url
        urlParams.delete('userId')
      }
      try {
        if (typeof (window.sessionStorage) === 'object') {
          if (window.sessionStorage.getItem('userId')) {
            // On supprime le userId du stockage
            window.sessionStorage.removeItem('userId')
          }
        }
      } catch (err) {}
      if (context.userId) {
        // On suprime le userId du context
        delete context.userId
      }
      // Pour cacher le champ userId sur la page courante et le conserver en cas de changement de page
      // On cache le champ prévu pour l'affichage du userId courant
      if (document.getElementById('userIdDisplay')) {
        document.getElementById('userIdDisplay').style.display = 'none'
        // On laisse le bouton de déconnexion caché
        document.getElementById('scoresLogOut').style.display = 'none'
        // On affiche le bouton de connexion
        document.getElementById('scoresLogIn').style.display = 'initial'
      }
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
      setUrlAndGo()
    })
  }

  // Clic sur documentation - page prof et modale connexion
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
      // document.getElementById('scoresDocumentationFeedbackBody').innerHTML = `
      //     Ma superDoc : <br>
      //     ...<br>
      //     ...<br>
      //     ...
      //   `
      document.getElementById('scoresDocumentationFeedback').hidden = false
    })
  }

  // Clic sur "Enregistrer des scores"  - page prof et modale connexion
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
        document.getElementById('userIdDisplay').style.display = 'initial'
      }
    })
  }

  // Clic sur le bouton "Submit" qui envoie un userId - page prof et modale connexion
  if (document.getElementById('scoresSubmitUserId')) {
    document.getElementById('scoresSubmitUserId').addEventListener('click', function () {
    // On récupère la valeur saisie
      const userId = document.getElementById('scoresInputUserId').value
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
            eleve2: userId[6]
          })
        })
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`)
        }
        const myResponseJson = await response.json()
        if (myResponseJson.errors !== '') { // S'il y a des erreurs on ne fait rien
          if (document.getElementById('scoresInputUserIdError')) {
          // eslint-disable-next-line quotes
            document.getElementById('scoresInputUserIdErrorHeader').innerHTML = `Échec de la création, corriger les erreurs suivantes :`
            document.getElementById('scoresInputUserIdErrorBody').innerHTML = `
                            ${myResponseJson.errors}
                          `
            document.getElementById('scoresFeedback').hidden = true
            document.getElementById('scoresInputUserIdError').hidden = false
          }
          console.log('Enregistrement vers un espace scores KO')
        } else { // sinon
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
          // keys = urlParams.keys (),
          // values = urlParams.values (),

          let urlRewrite = urlRacine + '?'
          for (const entry of entries) {
            urlRewrite += entry[0] + '=' + entry[1] + '&'
          }
          urlRewrite = urlRewrite.slice(0, -1)
          urlRewrite = new URL(urlRewrite)
          // On remplace dans l'historique
          window.history.replaceState('', '', urlRewrite)
          // On met à jour l'url
          setUrl()

          if (document.getElementById('scoresFeedback')) {
            document.getElementById('scoresFeedbackHeader').innerHTML = `Espace scores - Enregistrement pour le userId ${myResponseJson.userId} validé`
            document.getElementById('scoresFeedbackBody').innerHTML = `
                            Un bilan de vos scores sera accessible en fin de session en cliquant sur ...<br>
                            ${myResponseJson.url}<br>                          
                            Vous pourrez ajouter des scores pour votre prof en utilisant le code suivant : <b>${myResponseJson.userId}</b>
                          `
            document.getElementById('scoresFeedback').hidden = false
            document.getElementById('scoresPromptUserId').hidden = true
            document.getElementById('scoresDocumentationFeedback').hidden = true
          }
          // On affiche le userId dans la fenetre principale
          if (document.getElementById('userIdDisplayValue')) {
            // document.getElementById('userIdDisplayValue').value = response.userId
            document.getElementById('userIdDisplayValue').innerHTML = myResponseJson.userId
          }
        }
      }

      myFirstScoresManageFetch()
        .catch(e => {
          console.log('/!\\ firstScoresManage.php /!\\ Pb avec l\'opération de récupération sûrement en dev local sans serveur PHP, message d\'erreur => ' + e.message)
        })
    })
  }

  // Clic sur "Créer un espace" - uniquement sur la page prof
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
      async function mySecondScoresManageFetch () {
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
            isVerifResult: false
          })
        })
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`)
        }
        const myResponseJson = await response.json()
        if (document.getElementById('scoresFeedback')) {
          document.getElementById('scoresFeedbackHeader').innerHTML = 'Espace scores - Création validée'
          document.getElementById('scoresFeedbackBody').innerHTML = `
              Vos fichiers seront enregistrés à cette adresse : <br>
              <a href="${myResponseJson.url}" target="_blank">${window.location.href.split('?')[0] + myResponseJson.url.substr(1)}</a><br>
              <b>Conservez la précieusement.</b><br>
              Vous pourrez y ajouter des éléments en utilisant le code prof suivant : <b>${myResponseJson.userId}</b>
            `
          document.getElementById('scoresFeedback').hidden = false
        }
      }

      mySecondScoresManageFetch()
        .catch(e => {
          console.log('/!\\ secondScoresManage.php /!\\ Pb avec l\'opération de récupération sûrement en dev local sans serveur PHP, message d\'erreur => ' + e.message)
        })
    })
  }

  // Clic sur "Espace professeur" - uniquement dans la modale connexion
  if (document.getElementById('scoresToProfSpace')) {
    document.getElementById('scoresToProfSpace').addEventListener('click', function () {
    })
  }
}
