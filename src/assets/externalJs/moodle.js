if (typeof window.iMathAlea === 'undefined') {
  // Normalement ce script ne devrait être chargé qu'une unique fois car appelé en module
  // On vérifie tout de même au cas où que le fichier ne soit pas appelé en module
  // Ou que l'on appelle des fichiers depuis des serveurs différents
  // Remarque dans ce dernier cas : tout les exos seront chargés depuis le premier serveur
  window.iMathAlea = []

  window.addEventListener('message', (event) => {
    if (typeof event.data.iMoodle === 'number' && typeof window.iMathAlea[event.data.iMoodle] !== 'undefined') {
      const iframe = window.iMathAlea[event.data.iMoodle]
      let hauteur = event.data.hauteurExercice
      if (typeof hauteur !== 'undefined') {
        hauteur += 50
        iframe.height = hauteur.toString()
      }
      if (event.data.score !== undefined) {
        iframe.parentNode.parentNode.querySelector('[name$="_answer"]').value = event.data.score + '|' + JSON.stringify(event.data.reponses)
        iframe.parentNode.parentNode.querySelector('[name$="_-submit"]')?.click()
      }
    }
  })

  const style = document.createElement('style')
  style.innerHTML = '.mathalea-question-type .form-inline, .mathalea-question-type .im-controls, .mathalea-question-type .rightanswer { display: none; }'
  document.head.appendChild(style)

  // Create a class for the element
  class MathALeaMoodle extends HTMLElement {
    constructor () {
      // Always call super first in constructor
      super()

      const SERVEUR_URL = new URL('../..', document.currentScript?.src || import.meta.url).href // ou origin + pathname

      const shadow = this.attachShadow({ mode: 'open' }) // this.shadowRoot

      const iMoodle = window.iMathAlea.length
      let questionSeed = ''

      let questionDiv = this.parentNode
      // On remonte de parent en parent depuis la balise script jusqu'à trouver le div avec le numero de la question en id
      while (questionDiv !== null) { // s'arrêtera lorsqu'il n'y aura plus de parents
        if (typeof questionDiv.id === 'string' && questionDiv.id.startsWith('question-')) {
          questionSeed = questionDiv.id
          break // la seed a été trouvée
        }
        questionDiv = questionDiv.parentNode
      }

      let answer
      const addIframe = () => {
        iframe.setAttribute('width', '100%')
        iframe.setAttribute('height', '400')
        iframe.setAttribute('src', SERVEUR_URL + 'mathalea.html?ex=' + this.getAttribute('ex') + '&v=' + (this.getAttribute('correction') === null ? 'exMoodle' : 'correctionMoodle') + '&z=1&iMoodle=' + iMoodle + '&serie=' + questionSeed + (typeof answer !== 'undefined' ? '&moodleJson=' + answer : ''))
        iframe.setAttribute('frameBorder', '0')
        iframe.setAttribute('allow', 'fullscreen')
        shadow.appendChild(iframe)
      }

      const iframe = document.createElement('iframe')
      window.iMathAlea.push(this)

      if (questionDiv.classList.contains('notyetanswered')) {
        // L'élève n'a pas encore répondu à la question, on affiche immédiatement l'iframe
        addIframe()
      } else {
        // L'élève a répondu, on attend que la page charge pour récupérer ses réponses
        document.addEventListener('DOMContentLoaded', () => {
          answer = questionDiv.querySelector('[name$="_answer"]').value
          answer = answer.substring(answer.indexOf('|') + 1)
          addIframe()
        })
      }

      shadow.appendChild(iframe)
    }

    connectedCallback () {
      // Différent de constructor si l'élément est créé avec createElement
    }
  }

  // Define the new element
  customElements.define('mathalea-moodle', MathALeaMoodle)
}