import { context } from './context.js'
import { create } from './dom.js'
import { getVueFromUrl, setUrl } from './gestionUrl.js'

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
    // const btnEmbed = get('btnEmbed', false)
    // const btnQRcode = get('btnQRcode', false)
    const buttonFullScreen = document.getElementById('buttonFullScreen2')
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
      if (buttonFullScreen) buttonFullScreen.style.display = 'none'
      for (const e of [divChoixExercices, titreExerciceAvecChevron]) {
        if (e !== null) e.style.display = 'none'
      }
    }
    if (context.vue === 'exEtChoix') { // Affichage des seuls exercices
      masqueMenuDesExercices()
      if (btnEdit) btnEdit.style.display = 'inline'
      if (buttonFullScreen) buttonFullScreen.style.display = 'inline'
    }
    if (context.vue === 'menu') { // Affichage des seuls exercices
      demasqueMenuDesExercices()
      if (btnEdit) btnEdit.style.display = 'none'
    }
    if (context.vue === 'crpe') { // Affichage des seuls exercices
      const section = document.querySelector('section')
      const divCopirelem = create('div')
      divCopirelem.innerHTML = `<div class="ui icon message">
      <a href="https://www.copirelem.fr/ressources/pour-le-crpe/" target="_blank"><img src="assets/images/logo_copi.png"></a>
      <div class="content">
        <div class="header">
          Les annales du CRPE rédigées par la <a href="https://www.copirelem.fr/ressources/pour-le-crpe/" target="_blank">COPIRELEM</a>
        </div>
        <p> 
        (Commission Permanente des IREM sur l’Enseignement Élémentaire)<br>
        Les sujets du CRPE et exercices issus d’examens dans les INSPÉ corrigés par la <a href="https://www.copirelem.fr/ressources/pour-le-crpe/" target="_blank">COPIRELEM</a> sont classés ci-dessous par thème et par année.<br> 
        Les annales récentes pour préparer le CRPE sont disponibles à la commande sur le <a href="http://www.arpeme.fr/index.php?id_page=18" target="_blank">site de l’ARPEME</a>.<br>
      </div>
    </div>`
      divCopirelem.style.marginBottom = '30px'
      section.insertBefore(divCopirelem, divChoixExercices)
      demasqueMenuDesExercices()
      if (btnEdit) btnEdit.style.display = 'none'
      const btnLaTeX = document.getElementById('btnLaTeX')
      if (btnLaTeX) btnLaTeX.style.display = 'none'
      const btnTousInteractifs = document.getElementById('btnTousInteractifs')
      if (btnTousInteractifs) btnTousInteractifs.style.display = 'none'
      const menuAvecFiltre = document.getElementById('exercices_disponibles')
      if (menuAvecFiltre) menuAvecFiltre.style.display = 'none'
    }
    if (context.vue === 'alcexEtChoix') { // Affichage des seuls exercices
      masqueMenuDesExercices()
      if (btnEdit) btnEdit.style.display = 'inline'
      context.vue = 'alc'
    }
    if (context.vue === 'alcmenu') { // Affichage des seuls exercices
      demasqueMenuDesExercices()
      if (btnEdit) btnEdit.style.display = 'none'
      context.vue = 'alc'
    }
    // Met à jour l'URL avec notamment la nouvelle vue
    setUrl('gestionVue')
  }
  if (document.getElementById('buttonEdit') && context.vue === null) document.getElementById('buttonEdit').style.display = 'none'
}
