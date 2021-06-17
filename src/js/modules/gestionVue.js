import { context } from './context'
import { getVueFromUrl } from './getUrlVars'

export function gestionVue () {
  const vue = getVueFromUrl()
  if (vue) {
    context.vue = vue
    const nav = document.getElementsByTagName('nav')
    const footer = document.getElementsByTagName('footer')
    const divMessageIntro = document.getElementById('messageIntro')
    const divBoutonsAuDessusDesExercices = document.getElementById('boutonsAuDessusDesExercices')
    const divParametres = document.getElementById('parametres')
    const divExercice = document.getElementById('exercices')
    const divCorrection = document.getElementById('corrections')
    const btnZoomPlus = document.getElementById('btn_zoom_plus')
    const btnZoomMoins = document.getElementById('btn_zoom_moins')
    const btnEdit = document.getElementById('btn_edit')
    const btnMiseAJourCode = document.getElementById('btn_mise_a_jour_code')
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
