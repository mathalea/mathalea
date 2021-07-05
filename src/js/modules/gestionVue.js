import { context } from './context'
import { get } from './dom'
import { getVueFromUrl, setUrl } from './getUrlVars'

export function gestionVue (vue) {
  if (vue) {
    context.vue = vue
  } else {
    context.vue = getVueFromUrl()
  }
  if (context.vue) {
    const nav = document.getElementsByTagName('nav')
    const footer = document.getElementsByTagName('footer')
    const divChoixExercices = document.getElementById('choix_exercices_menu')
    const divMessageIntro = get('messageIntro', false)
    const divBoutonsAuDessusDesExercices = get('boutonsAuDessusDesExercices', false)
    const divParametres = get('parametres', false)
    const divExercice = get('exercices', false)
    const divCorrection = get('corrections', false)
    const btnZoomPlus = get('btn_zoom_plus', false)
    const btnZoomMoins = get('btn_zoom_moins', false)
    const btnEdit = get('btn_edit', false)
    const btnMiseAJourCode = get('btn_mise_a_jour_code', false)
    const btnCopieURL = get('btnCopieURL', false)
    const btnLaTeX = get('btnLaTeX', false)
    const btnEmbed = get('btnEmbed', false)
    const btnQRcode = get('btnQRcode', false)
    const buttonFullScreen = get('buttonFullScreen', false)
    const colonneGauche = document.getElementById('left')
    const colonneDroite = document.getElementById('right')
    const container2Colonnes = document.getElementById('mathaleaContainer')
    const boutonDoubleChevron = document.getElementById('exo_plein_ecran')
    const titreExerciceAvecChevron = document.getElementById('titreExerciceAvecChevron')

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

    const masqueMenuDesExercices = () => {
      if (colonneGauche !== null) {
        colonneGauche.style = ''
        colonneGauche.style.display = 'none'
      }
      if (colonneDroite !== null) colonneDroite.style = ''
      container2Colonnes.classList.remove('ui', 'stackable', 'two', 'column', 'grid')
      const boutonDoubleChevron = document.getElementById('exo_plein_ecran')
      boutonDoubleChevron.classList.add('right')
      boutonDoubleChevron.classList.remove('left')
    }

    const demasqueMenuDesExercices = () => {
      if (colonneGauche !== null) {
        colonneGauche.style.height = '75vh'
        colonneGauche.style.display = 'block'
      }
      if (colonneDroite !== null) {
        colonneDroite.style.height = '75vh'
        colonneDroite.style.overflowY = 'auto'
      }
      container2Colonnes.classList.add('ui', 'stackable', 'two', 'column', 'grid')
      boutonDoubleChevron.classList.add('left')
      boutonDoubleChevron.classList.remove('right')
    }

    const minifieTousLesBoutons = () => {
      const boutons = document.getElementsByTagName('button')
      for (const btn of boutons) {
        btn.classList.add('mini')
      }
    }

    if (context.vue === 'recto' || context.vue === 'verso') {
      masqueMenuDesExercices()
      const accordions = document.getElementsByClassName('ui fluid accordion')
      for (const accordion of accordions) {
        accordion.style.visibility = 'hidden'
      }
      for (const e of [nav[0], footer[0], divMessageIntro, btnMiseAJourCode, btnZoomPlus, btnZoomMoins, btnCopieURL, btnLaTeX, btnEmbed, btnQRcode, buttonFullScreen, btnEdit, divChoixExercices, titreExerciceAvecChevron]) {
        if (e !== null) e.style.display = 'none'
      }
      divExercice.style.fontSize = '1.5em'
      divCorrection.style.fontSize = '1.5em'
      if (context.vue === 'verso') {
        divExercice.style.display = 'none'
        document.body.appendChild(divCorrection)
      }
      // Le titre de l'exercice ne peut être masqué qu'après l'affichage
      document.addEventListener('exercicesAffiches', masqueTitreExerciceEtEspaces)
      document.addEventListener('exercicesAffiches', () => {
        // Envoi des informations à Anki
        const hauteur = window.document.body.scrollHeight
        window.parent.postMessage({ hauteur: hauteur, reponse: 'A_COMPLETER' }, '*')
      })
    }
    if (context.vue === 'l' || context.vue === 'light') { // Affichage léger pour embed par exemple
      // divExercice.style.fontSize = '1.5em'
      // divCorrection.style.fontSize = '1.5em'

      // Si l'URL de départ est sur cette vue
      document.addEventListener('exercicesAffiches', () => {
        minifieTousLesBoutons()
      })
      // Si les exercices sont déjà affichés
      minifieTousLesBoutons()
      masqueEspaces()
      masqueMenuDesExercices()
      for (const e of [nav[0], footer[0], divMessageIntro, btnZoomPlus, btnZoomMoins, btnCopieURL, btnLaTeX, btnEmbed, btnQRcode, buttonFullScreen, btnEdit, divChoixExercices, titreExerciceAvecChevron]) {
        if (e !== null) e.style.display = 'none'
      }
    }
    if (context.vue === 'ex') { // Affichage des seuls exercices
      masqueMenuDesExercices()
      for (const e of [divChoixExercices, titreExerciceAvecChevron]) {
        if (e !== null) e.style.display = 'none'
      }
    }
    if (context.vue === 'exEtChoix') { // Affichage des seuls exercices
      masqueMenuDesExercices()
    }
    if (context.vue === 'menu') { // Affichage des seuls exercices
      demasqueMenuDesExercices()
    }
    // Met à jour l'URL avec notamment la nouvelle vue
    setUrl()
  }
}
