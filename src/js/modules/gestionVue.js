import { context } from './context'
import { get } from './dom'
import { getVueFromUrl } from './getUrlVars'

export function gestionVue () {
  const vue = getVueFromUrl()
  if (vue) {
    context.vue = vue
    const nav = document.getElementsByTagName('nav')
    const footer = document.getElementsByTagName('footer')
    const divMessageIntro = get('messageIntro')
    const divBoutonsAuDessusDesExercices = get('boutonsAuDessusDesExercices')
    const divParametres = get('parametres')
    const divExercice = get('exercices')
    const divCorrection = get('corrections')
    const btnZoomPlus = get('btn_zoom_plus')
    const btnZoomMoins = get('btn_zoom_moins')
    const btnEdit = get('btn_edit')
    const btnMiseAJourCode = get('btn_mise_a_jour_code')
    const masqueEspaces = () => {
      const espaces = document.getElementsByClassName('ui hidden divider')
      for (const espace of espaces) {
        espace.style.display = 'none'
      }
    }
    const masqueTitreExerciceEtEspaces = () => {
      const titresExercice = document.getElementsByClassName('ui dividing header')
      for (const titre of titresExercice) {
        titre.style.display = 'none'
      }
      masqueEspaces()
    }

    if (context.vue === 'recto' || context.vue === 'verso') {
      for (const e of [nav[0], footer[0], divMessageIntro, divBoutonsAuDessusDesExercices, divParametres]) {
        e.style.display = 'none'
      }
      divExercice.style.fontSize = '1.5em'
      divCorrection.style.fontSize = '1.5em'
      if (context.vue === 'verso') {
        divExercice.style.display = 'none'
        const accordion = document.getElementsByClassName('ui fluid accordion')
        accordion[0].style.visibility = 'hidden'
        document.body.appendChild(divCorrection)
      }
      // Le titre de l'exercice ne peut être masqué qu'après l'affichage
      document.addEventListener('exercicesAffiches', masqueTitreExerciceEtEspaces)
      document.addEventListener('exercicesAffiches', () => {
        // Envoi des informations à Anki
        const hauteur = window.document.body.scrollHeight
        window.parent.postMessage(hauteur, '*')
      })
    }
    if (context.vue === 'l' || context.vue === 'light') { // Affichage léger pour embed par exemple
      divExercice.style.fontSize = '1.5em'
      divCorrection.style.fontSize = '1.5em'
      btnMiseAJourCode.classList.add('mini')
      masqueEspaces()
      for (const e of [nav[0], footer[0], divMessageIntro, btnZoomPlus, btnZoomMoins, btnEdit]) {
        e.style.display = 'none'
      }
    }
  }
}
