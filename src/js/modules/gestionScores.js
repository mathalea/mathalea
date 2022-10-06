/* global fetch */

// =============================================================================================================================
// Gestion des scores
// Sébastien LOZANO
// https://docs.google.com/document/d/17ajVHWDkrSYj2VA_OulWgl9iz8zxBLAkfgeEK6m0OXU/edit?usp=sharing
// https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Async_await
// commits de suppression d'anciens fonctionnements
//    => https://github.com/mathalea/mathalea/commit/77d7599a1d03f966fd6e16361c034f089d820bbd
//    => https://github.com/mathalea/mathalea/commit/88d7df0817541cf52d3c6e83568c466a4045f0e0
// =============================================================================================================================

import { context } from './context.js'
// import { setUrl, setUrlAndGo } from './gestionUrl.js'
import { setUrlAndGo } from './gestionUrl.js'

export default function GestionScores () {
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
        Ce service ne garantit en rien la pérennité des données. Bien au contraire, <b>les données sont régulièrement effacées</b>.<br> <!--une fois par an.-->

        <div class="ui error message">          
          <div class="header">
            Conseil avisé.
          </div>
          <p>
            <b>Nous conseillons aux utilisateurs du service de récupérer les enregistrements chaque jour dans leurs espaces de scores.</b>
          </p>
        </div>
        <ul>
          <li> Informations non garanties quant aux espaces de scores :            
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

  // Clic sur documentation - page prof
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

      // On modifie/affiche l'entête de la documentation
      document.getElementById('scoresDocumentationFeedbackHeader').innerHTML = 'Documentation'
      // On affiche le contenu de la doc
      document.getElementById('scoresDocumentationFeedback').hidden = false
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
              <a href="${myResponseJson.url}" target="_blank">https://coopmaths.fr/${myResponseJson.url.substr(2)}</a><br>
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
}
