import { context } from './context'
import { get, setStyles } from './dom'
import { getVueFromUrl, setUrl } from './gestionUrl'

export async function gestionVue (vue) {
  if (vue) {
    context.vue = vue
  } else {
    context.vue = getVueFromUrl()
  }
  if (context.vue) {
    // const nav = document.getElementsByTagName('nav')
    // const footer = document.getElementsByTagName('footer')
    const divChoixExercices = document.getElementById('choix_exercices_menu')
    // const divMessageIntro = get('messageIntro', false)
    // const divBoutonsAuDessusDesExercices = get('boutonsAuDessusDesExercices', false)
    // const divParametres = get('parametres', false)
    // const divExercice = get('exercices', false)
    // const divCorrection = get('corrections', false)
    // const btnZoomPlus = get('btn_zoom_plus', false)
    // const btnZoomMoins = get('btn_zoom_moins', false)
    const btnEdit = document.getElementById('buttonEdit')
    // const btnMiseAJourCode = get('btn_mise_a_jour_code', false)
    // const btnCopieURL = get('btnCopieURL', false)
    // const btnLaTeX = get('btnLaTeX', false)
    // const btnEmbed = get('btnEmbed', false)
    // const btnQRcode = get('btnQRcode', false)
    // const buttonFullScreen = get('buttonFullScreen', false)
    const colonneGauche = document.getElementById('left')
    const colonneDroite = document.getElementById('right')
    const container2Colonnes = document.getElementById('mathaleaContainer')
    const boutonDoubleChevron = document.getElementById('exo_plein_ecran')
    const titreExerciceAvecChevron = document.getElementById('titreExerciceAvecChevron')

    // const masqueEspaces = () => {
    //   const espaces = document.getElementsByClassName('ui hidden divider')
    //   for (const espace of espaces) {
    //     espace.style.display = 'none'
    //   }
    // }

    const masqueMenuDesExercices = () => {
      if (colonneGauche !== null) {
        colonneGauche.style = ''
        colonneGauche.style.display = 'none'
      }
      if (colonneDroite !== null) colonneDroite.style = ''
      if (container2Colonnes) {
        container2Colonnes.classList.remove('ui', 'stackable', 'two', 'column', 'grid')
      }
      const boutonDoubleChevron = document.getElementById('exo_plein_ecran')
      if (boutonDoubleChevron) {
        boutonDoubleChevron.classList.add('right')
        boutonDoubleChevron.classList.remove('left')
      }
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

    // const minifieTousLesBoutons = () => {
    //   const boutons = document.getElementsByTagName('button')
    //   for (const btn of boutons) {
    //     btn.classList.add('mini')
    //   }
    // }

    const masqueBandeauTitre = () => {
      const bandeauTitres = document.querySelectorAll('h3.ui.block.header')
      for (const e of bandeauTitres) {
        e.style.display = 'none'
      }
    }
    if (context.vue === 'ex') { // Affichage des seuls exercices
      masqueMenuDesExercices()
      masqueBandeauTitre()
      if (btnEdit) btnEdit.style.display = 'inline'
      for (const e of [divChoixExercices, titreExerciceAvecChevron]) {
        if (e !== null) e.style.display = 'none'
      }
    }
    if (context.vue === 'exEtChoix') { // Affichage des seuls exercices
      masqueMenuDesExercices()
      if (btnEdit) btnEdit.style.display = 'inline'
    }
    if (context.vue === 'menu') { // Affichage des seuls exercices
      demasqueMenuDesExercices()
      if (btnEdit) btnEdit.style.display = 'none'
    }
    // Met à jour l'URL avec notamment la nouvelle vue
    setUrl()
  }
}
