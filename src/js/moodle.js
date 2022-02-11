if (typeof window.iMathAlea === 'undefined') {
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
}

const currentScript = document.currentScript
const iMoodle = window.iMathAlea.length
let questionSeed = ''

let questionDiv = currentScript
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
  iframe.setAttribute('src', url + '&iMoodle=' + iMoodle + '&serie=' + questionSeed + (typeof answer !== 'undefined' ? '&moodleJson=' + answer : ''))
  iframe.setAttribute('frameBorder', '0')
  iframe.setAttribute('allow', 'fullscreen')
  currentScript.parentNode.insertBefore(iframe, currentScript)
}

const iframe = document.createElement('iframe')
window.iMathAlea.push(iframe)

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