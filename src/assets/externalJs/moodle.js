if (typeof window.iMathAlea === 'undefined') {
  // Normalement ce script ne devrait être chargé qu'une unique fois car appelé en module
  // On vérifie tout de même au cas où que le fichier ne soit pas appelé en module
  // Ou que l'on appelle des fichiers depuis des serveurs différents
  // Remarque dans ce dernier cas : tout les exos seront chargés depuis le premier serveur
  window.iMathAlea = []

  window.addEventListener('message', (event) => {
    if (typeof event.data.iMoodle === 'number' && typeof window.iMathAlea[event.data.iMoodle] !== 'undefined') {
      const iframe = window.iMathAlea[event.data.iMoodle]
      let hauteur = event.data.hauteurExercice || event.data.hauteurExerciceCorrection
      if (typeof hauteur !== 'undefined') {
        hauteur += 50
        iframe.setAttribute('height', hauteur.toString())
      }
      if (event.data.score !== undefined) {
        iframe.parentNode.parentNode.querySelector('[name$="_answer"]').value = event.data.score + '|' + JSON.stringify(event.data.reponses)
        iframe.parentNode.parentNode.querySelector('[name$="_-submit"]')?.click()
      }
    }
  })

  const style = document.createElement('style')
  style.innerHTML = '.mathalea-question-type .form-inline, .mathalea-question-type .im-controls, .mathalea-question-type .rightanswer { display: none !important; }'
  document.head.appendChild(style)

  // Create a class for the element
  class MathALeaMoodle extends HTMLElement {
    /*
    // Appelé lors de la création de l'élément
    constructor () {
      // Always call super first in constructor
      super()
    }
    */

    // Appelé lorsque l'élément est inséré dans le DOM
    connectedCallback () {
      // Si l'attribut serveur est défini, on l'utilise (url non vérifiée / sécurisée)
      // Sinon on utilise l'url du script actuel récupérée soit via
      // document.currentScript si le fichier n'est pas appelé en mode module
      // import.meta.url si le fichier appelé en mode module
      let SERVEUR_URL
      try {
        SERVEUR_URL = new URL('../..', this.getAttribute('serveur') || document.currentScript?.src || import.meta.url) // ou origin + pathname
        if (SERVEUR_URL.protocol !== 'http:' && SERVEUR_URL.protocol !== 'https:') {
          throw new Error('Le serveur doit avoir un protocol en http ou https')
        }
        SERVEUR_URL = SERVEUR_URL.href
      } catch (e) {
        SERVEUR_URL = 'data:text,' + e
      }

      const shadow = this.attachShadow({ mode: 'open' }) // this.shadowRoot

      const iMoodle = window.iMathAlea.length
      let questionSeed = ''

      let questionDiv = this.parentNode
      // On remonte de parent en parent depuis la balise script jusqu'à trouver le div avec le numero de la question en id
      while (questionDiv !== null) { // s'arrêtera lorsqu'il n'y aura plus de parents
        if (typeof questionDiv.id === 'string' && questionDiv.id.startsWith('question-')) {
          questionSeed = this.getAttribute('graine') || questionDiv.id
          break // la seed a été trouvée
        }
        questionDiv = questionDiv.parentNode
      }

      if (questionDiv === null) {
        shadow.appendChild(document.createTextNode('[Erreur de détection de la l’environnement moodle]'))
        return
      }

      questionDiv.classList.add('mathalea-question-type')

      let answer
      const addIframe = () => {
        iframe.setAttribute('width', '100%')
        iframe.setAttribute('height', '400')
        iframe.setAttribute('src', SERVEUR_URL + '/mathalea.html?ex=' + this.getAttribute('ex') + ',i=1&v=' + (this.getAttribute('correction') === null ? 'exMoodle' : 'correctionMoodle') + '&z=1&iMoodle=' + iMoodle + '&serie=' + questionSeed + (typeof answer !== 'undefined' ? '&moodleJson=' + answer : ''))
        iframe.setAttribute('frameBorder', '0')
        iframe.setAttribute('allow', 'fullscreen')
        shadow.appendChild(iframe)
      }

      const iframe = document.createElement('iframe')
      this.iframe = iframe
      window.iMathAlea.push(this)

      if (questionDiv.classList.contains('notyetanswered')) {
        // L'élève n'a pas encore répondu à la question, on affiche immédiatement l'iframe
        addIframe()
      } else {
        // L'élève a répondu, on attend que la page charge pour récupérer ses réponses
        document.addEventListener('DOMContentLoaded', () => { // facultatif si le fichier est importé en mode module car l'exécution du script est deferred
          answer = questionDiv.querySelector('[name$="_answer"]').value
          answer = answer.substring(answer.indexOf('|') + 1)
          addIframe()
        })
      }

      shadow.appendChild(iframe)
    }

    attributeChangedCallback (name, oldValue, newValue) {
      name === 'height' && (this.iframe.height = newValue)
    }

    static get observedAttributes () { return ['height'] }
  }

  // Define the new element
  customElements.define('mathalea-moodle', MathALeaMoodle)
}
