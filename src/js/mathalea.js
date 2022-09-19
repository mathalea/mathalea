/* global $ jQuery JSZip saveAs */
import { strRandom, creerDocumentAmc, telechargeFichier, introLatex, introLatexCoop, scratchTraductionFr, modalYoutube, exerciceSimpleToContenu, listeQuestionsToContenu, introLatexCan, arrondi, dataTailleDiaporama, contraindreValeur } from './modules/outils.js'
import { getUrlVars, getFilterFromUrl, setUrl, getUrlSearch, getUserId, setUrlAndGo, replaceQueryParam, goTabVue } from './modules/gestionUrl.js'
import { menuDesExercicesDisponibles, dictionnaireDesExercices, apparenceExerciceActif, supprimerExo } from './modules/menuDesExercicesDisponibles.js'
import { loadIep, loadPrism, loadGiac, loadMathLive } from './modules/loaders.js'
import { waitFor } from './modules/outilsDom.js'
import { mg32DisplayAll } from './modules/mathgraph.js'
import {
  errorHandler,
  getInvalidModuleError, getNoLatexError,
  getUnknownError,
  UserFriendlyError
} from './modules/messages.js'
import { exerciceInteractif, setReponse } from './modules/gestionInteractif.js'
import Exercice from './exercices/Exercice.js'
import Clipboard from 'clipboard'
import QRCode from 'qrcode'
import seedrandom from 'seedrandom'

import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'

import '../css/style_mathalea.css'
import { context } from './modules/context.js'
import { gestionVue } from './modules/gestionVue.js'
import { initDom } from './modules/initDom.js'
import gestionScores from './modules/gestionScores.js'
import { modalTimer } from './modules/modalTimer.js'
import { zoomAffichage } from './modules/zoom.js'
import { ajouteChampTexteMathLive } from './modules/interactif/questionMathLive.js'

// "3" isNumeric (pour gérer le sup venant de l'URL)
function isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

let listeObjetsExercice = [] // Liste des objets listeObjetsExercices
let listeDesExercices = [] // Liste des identifiants des exercices
let codeMoodle = ''
let codeAmc = ''
let listePackages = new Set()

// Variables pour mathalea_AMC
let nbExemplaires = 1
let nbQuestions = []
let nomFichier = ''
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let typeEntete = ''
let format = ''

// création des figures MG32 (géométrie dynamique)
window.listeScriptsIep = {} // Dictionnaire de tous les scripts xml IEP
window.listeAnimationsIepACharger = [] // Liste des id des scripts qui doivent être chargés une fois le code HTML mis à jour
// menuDesExercicesDisponibles() // Fait une fois le dom initialisé

/**
 * PolyFill pour replaceAll
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
  // eslint-disable-next-line no-extend-native
  String.prototype.replaceAll = function (str, newStr) {
    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr)
    } // If a string
    return this.replace(new RegExp(str, 'g'), newStr)
  }
}

// fonctions de gestion de la liste des exercices cg 04-2021 ****
// fonctions : copierVersExerciceForm ; selectionnerCode ; ajoutHandlersEtiquetteExo ; gestionSpanChoixExercice ; copierExercicesFormVersAffichage

function copierVersExerciceForm () {
  // envoie des informations depuis les étiquettes vers le formulaire et déclenchement de l'evt change.
  // utilisé lorsque l'utilisateur valide/supprime ou déplace une étiquette exercices.
  let i, texteCode
  const listeTag = $('.choix_exercices.valide')
  const listeTagLength = listeTag.length
  texteCode = ''
  for (i = 0; i < listeTagLength; i++) {
    texteCode += listeTag[i].textContent + ','
  }
  // Suppression de la dernière virgule
  texteCode = texteCode.slice(0, -1)
  document.getElementById('choix_des_exercices').value = texteCode
  const evenement = new window.Event('change')
  document.getElementById('choix_des_exercices').dispatchEvent(evenement)
}

function selectionnerCode (elem) {
  // Fonction permettant de sélectionner tout le texte de l'étiquette lors du click sur cette dernière.
  const range = document.createRange()
  range.selectNodeContents(elem)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

// Gestionnaire d'evenement sur les étiquettes d'exercice.
function ajoutHandlersEtiquetteExo () {
  $('.choix_exercices')
    .off('input')
    .on('input', function (e) {
      // On détecte le changement de la valeur de l'étiquette.
      gestionSpanChoixExercice(e.target)
    })
  $('.choix_exercices')
    .off('keyup')
    .on('keyup', function (e) {
      if (e.which === 9 || e.which === 13) {
        // validation de l'étiquette sur tab ou entrée.
        copierVersExerciceForm()
        $('.choix_exercices:last').focus()
      }
      if ((e.which === 8 || e.which === 46) && (e.target.innerText === '' || e.target.innerText === '\n')) {
        // suppression de l'étiquette.
        copierVersExerciceForm()
        $('.exoSelectionne').removeClass('exoSelectionne') // pour alc
        $('.choix_exercices:last').focus()
      }
    })
  if (typeof ($('#choix_exercices_div').sortable) === 'function') { // quelques cas dans bugsnag, dans ces rares cas, le glissé-déposé des étiquettes pour changer l'ordre n'est pas optimal mais tout le reste fonctionne.
    $('#choix_exercices_div').sortable({
      cancel: 'i',
      placeholder: 'sortableplaceholder',
      update: function () {
        copierVersExerciceForm()
      }
    })
  }
  $('.choix_exercices')
    .off('mousedown')
    .on('mousedown', function () {
      // nécessaire car le sortable ne permet plus la sélection des contenteditable une fois activé
      this.focus()
      if (context.isAlc) {
        $(this).addClass('exoSelectionne')
      } else {
        selectionnerCode(this)
      }
    })
}

function gestionSpanChoixExercice (elem) {
  // quand on donne le code d'un exercice existant, le style change et on créé un autre span à suivre.
  const listeCodesExercices = Object.keys(dictionnaireDesExercices)
  if ((listeCodesExercices.indexOf($(elem).text()) >= 0 || listeCodesExercices.indexOf($(elem).text().split(',')[0]) >= 0) && !$(elem).hasClass('valide')) {
    $(elem).addClass('valide')
    if ($('.choix_exercices:last').hasClass('valide')) {
      // si le dernier élément n'est pas valide on n'en créé pas un nouveau.
      $(elem.parentElement.parentElement).append('<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"><br/></span></div>')
    }
    ajoutHandlersEtiquetteExo() // On ajoute la gestion des evenements sur l'étiquette créée.
    // sur la perte de focus, si le span est valide alors on met à jour la liste des exercices (maj du champ texte + event change)
  } else if (listeCodesExercices.indexOf($(elem).text()) < 0 && listeCodesExercices.indexOf($(elem).text().split(',')[0]) < 0 && $(elem).hasClass('valide')) {
    // si on change le contenteditable et que l'exercice n'est plus un code valide
    $(elem).removeClass('valide')
  }
}

function copierExercicesFormVersAffichage (exliste) {
  // fonction déclenchée à chaque mise à jour du formulaire (ajout, suppression, déplacement d'un exercice via les icones)
  // pour mettre à jour l'affichage des étiquettes.
  // (on créé les étiquettes à partir du formulaire)
  let tagexercices, i
  const listeLength = exliste.length
  tagexercices = ''
  const divExercice = document.getElementById('choix_exercices_div')
  if (listeLength > 0 && divExercice) {
    for (i = 0; i < listeLength; i++) {
      // création d'une étiquette pour chaque exercice trouvé dans le formulaire.
      tagexercices += `<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices valide">${exliste[i]}</span></div>`
    }
  }
  tagexercices += '<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"><br></span></div>' // ajout du <br> pour alignement dans firefox
  if (divExercice) {
    divExercice.innerHTML = tagexercices
    ajoutHandlersEtiquetteExo()
  }
}

//* ************

/**
 * Gère le chargement des différents modules, appelé après "création" des exercices, pour gérer leur affichage
 * ATTENTION, fct async, elle retourne une promesse de chargement, faut attendre que la promesse
 * soit résolue avant d'utiliser ce qui est chargé (et gérer l'éventuel pb de chargement)
 * @private
 * @param listeObjetsExercice
 * @return {Promise}
 */
async function gestionModules (listeObjetsExercice) {
  try {
    // besoin katex, mg32, iep, scratch
    // appelée dès lors que l'on affiche le code html des exercices : depuis "miseAJourDuCode" en mode html et pour le preview.
    loadMathLive()
    renderMathInElement(document.body, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false }
      ],
      preProcess: (chaine) => chaine.replaceAll(String.fromCharCode(160), '\\,'),
      throwOnError: true,
      errorColor: '#CC0000',
      strict: 'warn',
      trust: false
    })
    $('.katexPopup').popup({
      popup: '.special.popup',
      on: 'hover',
      variation: 'inverted',
      inline: true
    })
    const exosMg32 = listeObjetsExercice.filter((exo) => exo.typeExercice === 'MG32')
    if (exosMg32.length) {
      // faut charger mathgraph et lui filer ces figures

      // faut attendre que le div soit créé
      // @todo ce code devrait plutôt être exécuté après la création du div
      // (et ce serait même mieux d'ajouter les conteneurs comme propriétés des exos passés à mg32DisplayAll
      // => il n'y aurait plus de couplage sur le préfixe MG32div)
      await waitFor('MG32div0')
      await mg32DisplayAll(exosMg32)
    }
    const besoinScratch = listeObjetsExercice.some((exo) => exo.typeExercice === 'Scratch')
    if (besoinScratch) {
      await scratchTraductionFr()
      /* global scratchblocks */
      scratchblocks.renderMatching('pre.blocks', {
        style: 'scratch3',
        languages: ['fr']
      })
      scratchblocks.renderMatching('code.b', {
        inline: true,
        style: 'scratch3',
        languages: ['fr']
      })
    }
    const besoinIEP = listeObjetsExercice.some((exo) => exo.typeExercice === 'IEP')
    if (besoinIEP) {
      for (const id of window.listeAnimationsIepACharger) {
        const element = document.getElementById(`IEPContainer${id}`)
        if (!element) {
          console.error(Error(`Pas d’élément IEPContainer${id} dans le dom, chargement instrumenpoche ignoré`))
          continue
        }
        element.style.marginTop = '30px'
        const xml = window.listeScriptsIep[id]
        await loadIep(element, xml)
      }
      // On prévient Anki oqu'il faut une plus grande fenêtre
      const IEPAffiche = new window.Event('IEPAffiche', { bubbles: true })
      document.dispatchEvent(IEPAffiche)
    }
  } catch (error) {
    errorHandler(error)
  }
}

function contenuExerciceHtml (obj, numeroExercice) {
  // appelée dès lors que l'on affiche le code html des exercices : depuis "miseAJourDuCode" en mode html et pour le preview.
  // fonction construisant le html pour l'affichage d'un exercice :
  // * mise en page du titre,
  // * icones
  // * boutons
  // * formulaires
  // renvoie un objet : { contenu_un_exercice: le html de l'exercice  ,contenu_une_correction: le html de la correction }

  let contenuUnExercice = ''
  let contenuUneCorrection = ''
  let paramTooltip = ''
  let iconeInteractif = ''
  // Pour factoriser les entrées des exos statiques
  const factoExosStatiques = ['crpe', 'dnb', 'bac', 'e3c', 'crpeCoop']
  if (factoExosStatiques.includes(obj.typeExercice)) {
    const crpe = {
      titreEx: `<h3> Exercice ${numeroExercice} − CRPE ${obj.annee} - ${obj.lieu} - ${obj.numeroInitial}</h3>`,
      titreExCorr: `<h3 class="ui dividing header">Exercice ${numeroExercice} − CRPE ${obj.annee} - ${obj.lieu} - ${obj.numeroInitial} - Correction par la Copirelem</h3>`
    }

    // Deux fonctions pour factoriser les 3 constantes dnb, bac et e3c
    function titreEx (type) {
      return `<h3> Exercice ${numeroExercice} − ${type} ${obj.mois} ${obj.annee} - ${obj.lieu} (ex ${obj.numeroInitial})</h3>`
    }

    function titreExCorr (type, coopmaths = false) {
      let h3Tag = ''
      if (coopmaths === true) {
        h3Tag += `<h3 class="ui dividing header">Exercice ${numeroExercice} − ${type} ${obj.mois} ${obj.annee} - ${obj.lieu} (ex ${obj.numeroInitial}) - Corrigé alternatif COOPMATHS</h3>`
      } else {
        h3Tag += `<h3 class="ui dividing header">Exercice ${numeroExercice} − ${type} ${obj.mois} ${obj.annee} - ${obj.lieu} (ex ${obj.numeroInitial}) - Corrigé par l'APMEP</h3>`
      }
      return h3Tag
    }
    const dnb = {
      titreEx: titreEx('DNB'),
      titreExCorr: titreExCorr('DNB')
    }

    const bac = {
      titreEx: titreEx('BAC'),
      titreExCorr: titreExCorr('BAC')
    }

    const e3c = {
      titreEx: titreEx('E3C'),
      titreExCorr: titreExCorr('E3C')
    }

    switch (obj.typeExercice) {
      case 'crpe':
        contenuUnExercice += crpe.titreEx
        break
      case 'crpeCoop':
        contenuUnExercice += crpe.titreEx
        break
      case 'dnb':
        contenuUnExercice += dnb.titreEx
        break
      case 'bac':
        contenuUnExercice += bac.titreEx
        break
      case 'e3c':
        contenuUnExercice += e3c.titreEx
        break
    }

    contenuUnExercice += '<div><div class="question">'

    switch (obj.typeExercice) {
      case 'crpe': {
        let i = 1
        for (const png of obj.png) {
          contenuUnExercice += `<img id="${obj.id}-${i}" width="90%" src="${png}">`
          i++
        }
      }
        break
      case 'crpeCoop': {
        let i = 1
        for (const png of obj.png) {
          contenuUnExercice += `<img id="${obj.id}-${i}" width="90%" src="${png}">`
          i++
        }
      }
        break
      case 'dnb':
      case 'bac':
      case 'e3c':
        contenuUnExercice += `<img id="${obj.id}" width="90%" src="${obj.png}"></img>`
        break
    }
    contenuUnExercice += '</div></div>'

    switch (obj.typeExercice) {
      case 'crpe':
        contenuUneCorrection += crpe.titreExCorr
        break
      case 'crpeCoop':
        contenuUneCorrection += crpe.titreExCorr
        break
      case 'dnb':
        contenuUneCorrection += dnb.titreExCorr
        break
      case 'bac':
        contenuUneCorrection += bac.titreExCorr
        break
      case 'e3c':
        contenuUneCorrection += e3c.titreExCorr
        break
    }

    if (obj.correctionIsCachee) {
      contenuUneCorrection += '<div><div class="correction">Correction masquée</div></div>'
    } else {
      contenuUneCorrection += '<div><div class="correction">'
      switch (obj.typeExercice) {
        case 'crpe': {
          let i = 1
          for (const png of obj.pngCor) {
            contenuUneCorrection += `<img id="${obj.id}-${i}Cor" width="90%" src="${png}">`
            i++
          }
        }
          break
        case 'crpeCoop': {
          let i = 1
          for (const png of obj.pngCor) {
            contenuUneCorrection += `<img id="${obj.id}-${i}Cor" width="90%" src="${png}">`
            i++
          }
        }
          break
        case 'dnb':
        case 'bac':
        case 'e3c':
          contenuUneCorrection += `<img id="${obj.id}Cor" width="90%" src="${obj.pngcor}">`
          if (typeof obj.pngcorcoop !== 'undefined') {
            contenuUneCorrection += titreExCorr('DNB', true)
            contenuUneCorrection += `<img id="${obj.id}Cor" width="90%" src="${obj.pngcorcoop}">`
          }
          break
      }
      contenuUneCorrection += '</div></div>'
    }
    obj.video = false
    // Pour permettre l'ajout d'exos DNB/BAC/CRPE/E3C statiques et l'affichage de la correction dans la vue eval
    if (obj.interactif || obj.interactifObligatoire) {
      contenuUnExercice += `<button class="ui button blue checkReponses" type="submit" style="margin-bottom: 20px; margin-top: 20px" id="btnValidationEx${obj.numeroExercice}-${obj.id}">Vérifier les réponses</button>`
      exerciceInteractif(obj)
    }
  } else if (obj.typeExercice === 'simple') {
    if (obj.interactif) {
      iconeInteractif = `<span data-tooltip="Auto-correction en ligne"><i id="boutonInteractif${numeroExercice - 1}" data-num="${
          numeroExercice - 1
        }" class="keyboard icon iconeInteractif"></i><span>`
    } else {
      iconeInteractif = `<span data-tooltip="Auto-correction en ligne"><i id="boutonInteractif${numeroExercice - 1}" data-num="${
          numeroExercice - 1
        }" class="keyboard outline icon iconeInteractif"></i><span>`
    }
    if (obj.besoinFormulaireNumerique && obj.besoinFormulaireNumerique[2]) {
      paramTooltip += obj.besoinFormulaireNumerique[0] + ' : \n' + obj.besoinFormulaireNumerique[2] + '\n'
    }
    if (obj.besoinFormulaire2Numerique && obj.besoinFormulaire2Numerique[2]) {
      paramTooltip += obj.besoinFormulaire2Numerique[0] + ' : \n' + obj.besoinFormulaire2Numerique[2]
    }
    paramTooltip = paramTooltip ? `data-tooltip="${paramTooltip}" data-position="right center"` : ''
    contenuUnExercice += `<span ${paramTooltip}> Exercice ${numeroExercice} − ${obj.id} <i class="cog icon icone_param"></i></span>${iconeInteractif}</h3>`
    contenuUneCorrection += `<h3 class="ui dividing header">Exercice ${numeroExercice}</h3>`
    if (obj.consigne) {
      contenuUnExercice += `<h4> ${obj.consigne} </h4>`
    }
    contenuUnExercice += (obj.nbQuestions !== 1) ? '<ol>' : ''
    // Pour la numérotation de diapCorr, il faut qu'il y ait toujours des listes même s'il n'y a qu'une seule question
    contenuUneCorrection += (obj.nbQuestions !== 1 || context.vue === 'diapCorr') ? '<ol>' : ''
    for (let numQuestion = 0, cpt = 0; numQuestion < obj.nbQuestions && cpt < 50; cpt++) {
      try {
        obj.nouvelleVersion()
      } catch (error) {
        console.log(error)
      }

      if (obj.questionJamaisPosee(numQuestion, obj.question)) {
        if (obj.nbQuestions === 1) {
          contenuUnExercice += `<div><div class="question" id="exercice${numeroExercice - 1}Q${numQuestion}" ${dataTailleDiaporama(obj)}>${obj.question.replace(/\\dotfill/g, '..............................').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....')}</div></div>`
        } else {
          contenuUnExercice += `<li class="question" id="exercice${numeroExercice - 1}Q${numQuestion}" ${dataTailleDiaporama(obj)}>${obj.question.replace(/\\dotfill/g, '..............................').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....')}`
        }
        if (obj.interactif && obj.interactifReady) {
          if (obj.formatChampTexte) {
            if (obj.optionsChampTexte) {
              contenuUnExercice += ajouteChampTexteMathLive(obj, numQuestion, obj.formatChampTexte, obj.optionsChampTexte)
            } else {
              contenuUnExercice += ajouteChampTexteMathLive(obj, numQuestion, obj.formatChampTexte)
            }
          } else {
            if (obj.optionsChampTexte) {
              contenuUnExercice += ajouteChampTexteMathLive(obj, numQuestion, '', obj.optionsChampTexte)
            } else {
              contenuUnExercice += ajouteChampTexteMathLive(obj, numQuestion)
            }
          }
        }
        contenuUnExercice += (obj.nbQuestions !== 1) ? '</li>' : ''
        if (obj.formatInteractif) {
          setReponse(obj, numQuestion, obj.reponse, { formatInteractif: obj.formatInteractif })
        } else {
          setReponse(obj, numQuestion, obj.reponse)
        }
        // Pour la numérotation de diapCorr, il faut qu'il y ait toujours des listes même s'il n'y a qu'une seule question
        if (obj.nbQuestions === 1 && context.vue !== 'diapCorr') {
          contenuUneCorrection += obj.correctionIsCachee ? 'Correction masquée' : `<div><div class="correction">${obj.correction}</div></div>`
        } else {
          contenuUneCorrection += `<li class="correction">${obj.correctionIsCachee ? 'Correction masquée' : obj.correction}</li>`
        }
        numQuestion++
      }
    }

    contenuUnExercice += (obj.nbQuestions !== 1) ? '</ol>' : ''
    contenuUneCorrection += (obj.nbQuestions !== 1) ? '</ol>' : ''
    if (obj.interactif || obj.interactifObligatoire) {
      contenuUnExercice += `<button class="ui button blue checkReponses" type="submit" style="margin-bottom: 20px; margin-top: 20px" id="btnValidationEx${obj.numeroExercice}-${obj.id}">Vérifier les réponses</button>`
      exerciceInteractif(obj)
    }
  } else { // Exercice classique
    try {
      obj.nouvelleVersion(numeroExercice - 1)
    } catch (error) {
      console.log(error)
    }
    if (obj.interactifReady && obj.interactif && !obj.interactifObligatoire) {
      iconeInteractif = `<span data-tooltip="Auto-correction en ligne"><i id="boutonInteractif${numeroExercice - 1}" data-num="${
          numeroExercice - 1
        }" class="keyboard icon iconeInteractif"></i><span>`
    } else if (obj.interactifReady && !obj.interactifObligatoire) {
      iconeInteractif = `<span data-tooltip="Auto-correction en ligne"><i id="boutonInteractif${numeroExercice - 1}" data-num="${
          numeroExercice - 1
        }" class="keyboard outline icon iconeInteractif"></i><span>`
    }
    if (obj.interactif || obj.interactifObligatoire) {
      exerciceInteractif(obj)
    }
    if (
      (!obj.nbQuestionsModifiable && !obj.besoinFormulaireNumerique && !obj.besoinFormulaireTexte && !obj.interactifReady) ||
        context.vue === 'l' || context.vue === 'light' || context.vue === 'embed' || context.vue === 'e' || context.vue === 'eval' || context.vue === 'multi'
    ) {
      // Dans v=l on ne met pas les raccourcis vers interactif et paramètres.
      contenuUnExercice += `Exercice ${numeroExercice} − ${obj.id} </h3>`
    } else {
      if (obj.besoinFormulaireNumerique && obj.besoinFormulaireNumerique[2]) {
        paramTooltip += obj.besoinFormulaireNumerique[0] + ' : \n' + obj.besoinFormulaireNumerique[2] + '\n'
      }
      if (obj.besoinFormulaire2Numerique && obj.besoinFormulaire2Numerique[2]) {
        paramTooltip += obj.besoinFormulaire2Numerique[0] + ' : \n' + obj.besoinFormulaire2Numerique[2]
      }
      paramTooltip = paramTooltip ? `data-tooltip="${paramTooltip}" data-position="right center"` : ''
      contenuUnExercice += `<span ${paramTooltip}> Exercice ${numeroExercice} − ${obj.id} <i class="cog icon icone_param"></i></span>${iconeInteractif}</h3>`
    }
    if (obj.video.length > 3) {
      contenuUnExercice += `<div id=video${numeroExercice - 1}>` + modalYoutube(numeroExercice - 1, obj.video, '', 'Aide', 'youtube') + '</div>'
    }
    if (obj.boutonAide) {
      contenuUnExercice += `<div id=aide${numeroExercice - 1}> ${obj.boutonAide}</div>`
    }
    contenuUnExercice += obj.contenu
    if (obj.typeExercice === 'MG32') {
      contenuUnExercice += `<div id="MG32div${numeroExercice - 1}" class="MG32"></div>`
    }
    contenuUneCorrection += `<h3 class="ui dividing header">Exercice ${numeroExercice}</h3>`
    contenuUneCorrection += obj.correctionIsCachee ? 'Correction masquée' : obj.contenuCorrection

    if (obj.typeExercice === 'MG32' && obj.MG32codeBase64corr) {
      contenuUneCorrection += `<div id="MG32divcorr${numeroExercice - 1}" class="MG32"></div>`
    }
  }
  return {
    contenu_un_exercice: contenuUnExercice,
    contenu_une_correction: contenuUneCorrection
  }
}

function miseAJourDuCode () {
  // fonction permettant de mettre à jour la liste des exercices affichés.
  // puis gère les gestionnaires d'évènements sur les éléments en provenance des exercices (icones pour supprimer/déplacer...)
  // Appelée dès lors que l'on a une modification sur l'affichage d'un ou plusieurs exercices
  //    suppression d'un exercice, nouvelle donnée, changement de paramètre...)
  // C'est dans cette fonction que l'on va executer les this.nouvelleVersion des exercices.
  setUrl('miseAjourDuCode')
  context.listeObjetsExercice = listeObjetsExercice

  // Active ou désactive l'icone de la course aux nombres
  let tousLesExercicesSontInteractifs = true
  for (const exercice of listeObjetsExercice) {
    if (exercice.interactifReady === undefined) { // Rajout EE : Parfois, certains exos n'ont pas de propriété interactifReady définie
      tousLesExercicesSontInteractifs = false
      if (document.getElementById('btnCan') && document.getElementById('btnEval')) {
        document.getElementById('btnCan').classList.add('disabled')
        document.getElementById('btnEval').classList.add('disabled')
      }
    } else if (!exercice.interactifReady) {
      tousLesExercicesSontInteractifs = false
      if (document.getElementById('btnCan') && document.getElementById('btnEval')) {
        document.getElementById('btnCan').classList.add('disabled')
        document.getElementById('btnEval').classList.add('disabled')
      }
    }
  }
  if (document.getElementById('btnCan') !== null && document.getElementById('btnEval') !== null) {
    tousLesExercicesSontInteractifs ? document.getElementById('btnCan').classList.remove('disabled') : document.getElementById('btnCan').classList.add('disabled')
    tousLesExercicesSontInteractifs ? document.getElementById('btnEval').classList.remove('disabled') : document.getElementById('btnEval').classList.add('disabled')
  }

  const btn1Question = document.getElementById('btn1Question')
  if (btn1Question !== null) {
    btn1Question.addEventListener('click', () => {
      for (let i = 0; i < listeObjetsExercice.length; i++) {
        listeObjetsExercice[i].nbQuestions = 1
      }
      miseAJourDuCode()
    })
  }

  const btnTousInteractifs = document.getElementById('btnTousInteractifs')
  if (btnTousInteractifs !== null) {
    btnTousInteractifs.addEventListener('click', () => {
      for (let i = 0; i < listeObjetsExercice.length; i++) {
        if (listeObjetsExercice[i] !== undefined) {
          if (listeObjetsExercice[i].interactifReady) {
            listeObjetsExercice[i].interactif = true
          }
        }
      }
      miseAJourDuCode()
    })
  }

  window.MG32_tableau_de_figures = []
  window.listeScriptsIep = {} // Dictionnaire de tous les scripts xml IEP
  window.listeAnimationsIepACharger = [] // Liste des id des scripts qui doivent être chargés une fois le code HTML mis à jour
  // Fixe la graine pour les fonctions aléatoires
  if (!context.graine) {
    context.graine = strRandom({
      includeUpperCase: true,
      includeNumbers: true,
      length: 4,
      startsWithLowerCase: false
    })
    // Saisi le numéro de série dans le formulaire
    if (document.getElementById('form_serie')) {
      // pas de formulaire existant si premier preview
      document.getElementById('form_serie').value = context.graine
    }
  }
  // Contrôle l'aléatoire grâce à SeedRandom
  const maGraine = context.seedSpecial ? context.graine + '@' : context.graine
  seedrandom(maGraine, { global: true })
  // ajout des paramètres des exercices dans l'URL et pour le bouton "copier l'url"
  ;(function gestionURL () {
    if (listeDesExercices.length > 0) {
      let finUrl = ''
      if (context.isHtml) {
        finUrl += 'mathalea.html'
      }
      finUrl += `?ex=${listeDesExercices[0]}`
      if (listeObjetsExercice[0]) {
        if (listeObjetsExercice[0].sup !== undefined) {
          finUrl += `,s=${listeObjetsExercice[0].sup}`
        }
        if (listeObjetsExercice[0].sup2 !== undefined) {
          finUrl += `,s2=${listeObjetsExercice[0].sup2}`
        }
        if (listeObjetsExercice[0].sup3 !== undefined) {
          finUrl += `,s3=${listeObjetsExercice[0].sup3}`
        }
        if (listeObjetsExercice[0].sup4 !== undefined) {
          finUrl += `,s4=${listeObjetsExercice[0].sup4}`
        }
        if (listeObjetsExercice[0].nbQuestionsModifiable) {
          finUrl += `,n=${listeObjetsExercice[0].nbQuestions}`
        }
        if (listeObjetsExercice[0].video.length > 1) {
          finUrl += `,video=${encodeURIComponent(listeObjetsExercice[0].video)}`
        }
        if (listeObjetsExercice[0].correctionIsCachee) {
          finUrl += ',cc=1'
        }
        if (listeObjetsExercice[0].correctionDetaillee && listeObjetsExercice[0].correctionDetailleeDisponible) {
          finUrl += ',cd=1'
        }
        if (!listeObjetsExercice[0].correctionDetaillee && listeObjetsExercice[0].correctionDetailleeDisponible) {
          finUrl += ',cd=0'
        }
        if (listeObjetsExercice[0].interactif) {
          finUrl += ',i=1'
        }
        if (!listeObjetsExercice[0].interactif && listeObjetsExercice[0].interactifReady) {
          finUrl += ',i=0'
        }
        listeObjetsExercice[0].numeroExercice = 0
      }
      for (let i = 1; i < listeDesExercices.length; i++) {
        finUrl += `&ex=${listeDesExercices[i]}`
        if (listeObjetsExercice[i].sup !== undefined) {
          finUrl += `,s=${listeObjetsExercice[i].sup}`
        }
        if (listeObjetsExercice[i].sup2 !== undefined) {
          finUrl += `,s2=${listeObjetsExercice[i].sup2}`
        }
        if (listeObjetsExercice[i].sup3 !== undefined) {
          finUrl += `,s3=${listeObjetsExercice[i].sup3}`
        }
        if (listeObjetsExercice[i].sup4 !== undefined) {
          finUrl += `,s4=${listeObjetsExercice[i].sup4}`
        }
        if (listeObjetsExercice[i].nbQuestionsModifiable) {
          finUrl += `,n=${listeObjetsExercice[i].nbQuestions}`
        }
        if (listeObjetsExercice[i].video) {
          if (listeObjetsExercice[i].video.length > 1) {
            // Pour dnb,bac,e3c et crpe video est à false, pour les exercices interactif, par défaut c'est ''
            finUrl += `,video=${encodeURIComponent(listeObjetsExercice[i].video)}`
          }
        }
        if (listeObjetsExercice[i].correctionIsCachee) {
          finUrl += ',cc=1'
        }
        if (listeObjetsExercice[i].correctionDetaillee && listeObjetsExercice[i].correctionDetailleeDisponible) {
          finUrl += ',cd=1'
        }
        if (!listeObjetsExercice[i].correctionDetaillee && listeObjetsExercice[i].correctionDetailleeDisponible) {
          finUrl += ',cd=0'
        }
        if (listeObjetsExercice[i].interactif) {
          finUrl += ',i=1'
        }
        if (!listeObjetsExercice[i].interactif && listeObjetsExercice[i].interactifReady) {
          finUrl += ',i=0'
        }
        listeObjetsExercice[i].numeroExercice = i
      }
      if (Number.isInteger(parseInt(context.duree))) {
        finUrl += `&duree=${context.duree}`
      }
      if (!getUserId()) {
        // On affiche la série uniquement si l'utilisateur n'est pas connecté
        finUrl += `&serie=${context.graine}`
      }
      if (context.vue) {
        finUrl += `&v=${context.vue}`
      }
      if (context.zoom) {
        finUrl += `&z=${context.zoom}`
      }
      try {
        if (context.userId) {
          finUrl += `&userId=${context.userId}`
        } else if (typeof (window.sessionStorage) === 'object') {
          if (window.sessionStorage.getItem('userId') !== null) {
            context.userId = window.sessionStorage.getItem('userId')
            finUrl += `&userId=${context.userId}`
          }
        }
      } catch (err) {}
      if (context.isAmc) {
        finUrl += `&f=${format}&e=${typeEntete}`
      }
      if (context.vue === 'exMoodle' || context.vue === 'correctionMoodle') {
        const iMoodle = new URLSearchParams(window.location.search).get('iMoodle')
        if (iMoodle !== null) {
          finUrl += `&iMoodle=${iMoodle}`
        }
        let moodleJson = new URLSearchParams(window.location.search).get('moodleJson')
        if (moodleJson !== null) {
          moodleJson = encodeURIComponent(moodleJson)
          finUrl += `&moodleJson=${moodleJson}`
        }
      }
      window.history.replaceState('', '', finUrl)
      const url = window.location.href.split('&serie')[0] + '&v=l' // met l'URL dans le bouton de copie de l'URL sans garder le numéro de la série et en ajoutant le paramètre pour le mettre en plein écran
      const clipboardURL = new Clipboard('#btnCopieURL', { text: () => url })
      clipboardURL.on('success', function (e) {
        console.info(e.text + ' copié dans le presse-papier.')
      })
      const btnCopieURL = document.getElementById('btnCopieURL')
      if (btnCopieURL) {
        btnCopieURL.classList.remove('disabled')
      }
    }
  })()
  apparenceExerciceActif() // mise en évidence des exercices sélectionnés : mise en gras + ajout de l'icone - et du nombre si plus de 2 éléments
  renderMathInElement(document.body, {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '$', right: '$', display: false }
    ],
    throwOnError: true,
    errorColor: '#CC0000',
    strict: 'warn',
    trust: false
  })
  let contenu
  // Dans la suite test selon les affichages :
  // 1/ context.isHtml => &v=menu, &v=ex, &v=exEtChoix
  // 2/ context.isAmc => &v=amc
  // 3/ contex.isMoodle => &v=moodle
  // 4/ !context.isHtml && !context.isAmc && !context.isAlc  => &v=latex

  // Ajoute le contenu dans les div #exercices et #corrections
  if (context.isHtml && !context.isMoodle) {
    let scrollLevel
    // récupération du scrollLevel pour ne pas avoir un comportement "bizarre"
    //    lors des modification sur les exercices via les paramètres et/ou icones dans la colonne de droite d'affichage des exercices.
    if (document.getElementById('right')) {
      scrollLevel = document.getElementById('right').scrollTop
    }
    document.getElementById('exercices').innerHTML = ''
    document.getElementById('corrections').innerHTML = ''
    let contenuDesExercices = ''
    let contenuDesCorrections = ''
    if (listeDesExercices.length > 0 && listeObjetsExercice.length > 0) {
      for (let i = 0; i < listeDesExercices.length; i++) {
        // const contenu_un_exercice = ''; const contenu_une_correction = ''
        listeObjetsExercice[i].id = listeDesExercices[i]
        contenu = contenuExerciceHtml(listeObjetsExercice[i], i + 1)
        if ($('#liste_des_exercices').is(':visible') || $('#exercices_disponibles').is(':visible') || $('#exo_plein_ecran').is(':visible')) {
          // si on n'a plus la liste des exercices il ne faut plus pouvoir en supprimer (pour v=l)
          if (listeDesExercices.length === 1) {
            // si on a qu'un seul exercice, uniquement l'icone poubelle
            contenuDesExercices += `<div id="exercice${i}" style="margin-top: 20px"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i>${contenu.contenu_un_exercice} </div>`
          } else if (i === 0) {
            // si c'est le premier exercice icone poubelle plus fleche vers le bas
            contenuDesExercices += `<div id="exercice${i}" style="margin-top: 20px"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle down icon icone_down"></i>${contenu.contenu_un_exercice} </div>`
          } else if (i === listeDesExercices.length - 1) {
            // Pour le dernier exercice pas de fleche vers le bas
            contenuDesExercices += `<div id="exercice${i}" style="margin-top: 20px"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle up icon icone_up"></i>${contenu.contenu_un_exercice} </div>`
          } else {
            // pour les autres exercices affichage de l'icone poubelle et des deux flèches (haut et bas)
            contenuDesExercices += `<div id="exercice${i}" style="margin-top: 20px"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle down icon icone_down"></i><i id="${i}" class="arrow circle up icon icone_up"></i>${contenu.contenu_un_exercice} </div>`
          }
        } else {
          contenuDesExercices += `<div id="exercice${i}" class="titreExercice" style="margin-top: 20px"> <h3 class="ui dividing header">${contenu.contenu_un_exercice} </div>`
        }
        contenuDesCorrections += `<div id="divexcorr${i}" class="titreExercice"> ${contenu.contenu_une_correction} </div>`
      }
      contenuDesExercices = `${contenuDesExercices}`
      contenuDesCorrections = `${contenuDesCorrections}`
      $('#message_liste_exercice_vide').hide()
      $('#cache').dimmer('hide')
    } else {
      $('#message_liste_exercice_vide').show() // Message au dessus de la liste des exercices
      $('#cache').dimmer('show') // Cache au dessus du code LaTeX
    }
    $('#popup_preview .icone_param').remove() // dans l'aperçu pas d'engrenage pour les paramètres.
    $('#popup_preview .iconeInteractif').remove() // dans l'aperçu pas d'icone interactif.
    document.getElementById('exercices').innerHTML = contenuDesExercices
    if (scrollLevel) {
      document.getElementById('right').scrollTop = scrollLevel
    }
    document.getElementById('corrections').innerHTML = contenuDesCorrections
    gestionModules(listeObjetsExercice)
    const exercicesAffiches = new window.Event('exercicesAffiches', { bubbles: true })
    document.dispatchEvent(exercicesAffiches)
    // En cas de clic sur la correction, on désactive les exercices interactifs
    const bntCorrection = document.getElementById('btnCorrection')
    if (bntCorrection) {
      bntCorrection.addEventListener('click', () => {
        // Le bouton "Vérifier les réponses" devient inactif
        const boutonsCheck = document.querySelectorAll('.checkReponses')
        boutonsCheck.forEach(function (bouton) {
          bouton.classList.add('disabled')
        })
        // On ne peut plus cliquer dans les checkboxs
        const checkboxs = document.querySelectorAll('.monQcm')
        checkboxs.forEach(function (checkbox) {
          checkbox.classList.add('read-only')
        })
      })
    }
  }
  if (context.isAmc) {
    const questions = []
    codeAmc = ''
    const output = context.isHtml
    context.isHtml = false
    listePackages = new Set()
    if (listeDesExercices.length > 0) {
      for (let i = 0; i < listeDesExercices.length; i++) {
        listeObjetsExercice[i].id = listeDesExercices[i] // Pour récupérer l'id qui a appelé l'exercice
        listeObjetsExercice[i].autoCorrection = []
        listeObjetsExercice[i].nouvelleVersion(i)
        if (listeObjetsExercice[i].typeExercice === 'simple') {
          exerciceSimpleToContenu(listeObjetsExercice[i])
        }
        questions.push(listeObjetsExercice[i])
        if (typeof listeObjetsExercice[i].listePackages === 'string') {
          listePackages.add(listeObjetsExercice[i].listePackages)
        } else {
          // si c'est un tableau
          listeObjetsExercice[i].listePackages.forEach(listePackages.add, listePackages)
        }
      }
      context.isHtml = output
      codeAmc = creerDocumentAmc({ questions: questions, nbQuestions: nbQuestions, nbExemplaires: nbExemplaires, typeEntete: typeEntete, format: format })
        .replace(/<br><br>/g, '\n\n\\medskip\n')
        .replace(/<br>/g, '\\\\\n')

      $('#message_liste_exercice_vide').hide()
      $('#cache').show()
      div.innerHTML = '<pre><code class="language-latex">' + codeAmc + '</code></pre>'
      loadPrism()
        .then(() => {
          /* global Prism */
          Prism.highlightAllUnder(div) // Met à jour la coloration syntaxique
        })
        .catch((error) => console.error(error))
      const clipboardURL = new Clipboard('#btnCopieLatex', { text: () => codeAmc })
      clipboardURL.on('success', function (e) {
        console.info('Code LaTeX copié dans le presse-papier.')
      })
    } else {
      codeAmc = ''
      $('#message_liste_exercice_vide').show() // Message au dessus de la liste des exercices
      $('#cache').hide() // Cache au dessus du code LaTeX
      div.innerHTML = ''
    }

    // Gestion du téléchargement
    $('#btn_telechargement')
      .off('click')
      .on('click', function () {
        // Gestion du style pour l'entête du fichier

        let contenuFichier = `
      
                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                  % Document généré avec MathALEA sous licence CC-BY-SA
                  %
                  % ${window.location.href}
                  %
                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                  
                  `
        const load = function (monFichier) {
          let request

          if (window.XMLHttpRequest) {
            // Firefox
            request = new window.XMLHttpRequest()
          } else if (window.ActiveXObject) {
            // IE
            request = new window.ActiveXObject('Microsoft.XMLHTTP')
          } else {
            return // Non supporte
          }

          // Pour éviter l'erreur d'interpretation du type Mime
          request.overrideMimeType('text/plain')

          request.open('GET', monFichier, false) // Synchro
          request.send(null)

          return request.responseText
        }

        contenuFichier += codeAmc
        const monzip = new JSZip()
        if ($('#nom_du_fichier').val() !== '') {
          nomFichier = $('#nom_du_fichier').val() + '.tex'
        } else {
          nomFichier = 'mathalea.tex'
        }
        monzip.file(`${nomFichier}`, contenuFichier)
        monzip.file('automultiplechoice.sty', load('assets/fichiers/automultiplechoice.sty'))
        monzip.generateAsync({ type: 'blob' })
          .then(function (content) {
          // see FileSaver.js
            saveAs(content, 'Projet.zip')
          })
      })

    $('#btn_overleaf')
      .off('click')
      .on('click', function () {
        // Gestion du style pour l'entête du fichier

        let contenuFichier = `
                
                %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                % Document généré avec MathALEA sous licence CC-BY-SA
                %
                % ${window.location.href}
                %
                %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                
                
                `
        contenuFichier += codeAmc
        // Gestion du LaTeX statique
        // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

        $('input[name=encoded_snip]').val(encodeURIComponent(contenuFichier))
        if (listePackages.has('dnb') || listePackages.has('bac') || listePackages.has('e3c') || listePackages.has('crpe')) { // Force le passage à xelatex sur Overleaf pour les exercices de DNB, BAC ou CRPE
          $('input[name=engine]').val('xelatex')
        }
        if ($('#nom_du_fichier').val()) {
          $('input[name=snip_name]').val($('#nom_du_fichier').val()) // nomme le projet sur Overleaf
        }
      })
  }
  if (context.isMoodle) {
    // Sortie Moodle
    const listeExercicesLength = listeDesExercices.length
    codeMoodle = ''
    if (listeExercicesLength > 0) {
      for (let i = 0; i < listeExercicesLength; i++) {
        if (listeObjetsExercice[i].pasDeVersionLatex) {
          // on affiche le pb mais on continue quand même
          errorHandler(getNoLatexError(listeObjetsExercice[i].id))
        }
        const id = listeDesExercices[i] // Pour récupérer l'id qui a appelé l'exercice
        const nbQuestions = listeObjetsExercice[i].nbQuestions
        const titre = listeObjetsExercice[i].titre
        // ToFix à quoi servait ce pointsParQuestions ?? @mathieu.degrange ?
        // const pointsParQuestions = listeObjetsExercice[i].pointsParQuestions
        let params = ''
        if (listeObjetsExercice[i].sup !== undefined) {
          params += `s=${listeObjetsExercice[i].sup}`
        }
        if (listeObjetsExercice[i].sup2 !== undefined) {
          params += `,s2=${listeObjetsExercice[i].sup2}`
        }
        if (listeObjetsExercice[i].sup3 !== undefined) {
          params += `,s3=${listeObjetsExercice[i].sup3}`
        }
        if (listeObjetsExercice[i].sup4 !== undefined) {
          params += `,s4=${listeObjetsExercice[i].sup4}`
        }
        if (listeObjetsExercice[i].nbQuestionsModifiable) {
          params += `,n=${listeObjetsExercice[i].nbQuestions}`
        }
        // if (listeObjetsExercice[i].video.length > 1) {
        //   params += `,video=${encodeURIComponent(listeObjetsExercice[i].video)}`
        // }
        params += ',video=0'
        if (listeObjetsExercice[i].correctionIsCachee) {
          params += ',cc=1'
        }
        if (listeObjetsExercice[i].correctionDetaillee && listeObjetsExercice[i].correctionDetailleeDisponible) {
          params += ',cd=1'
        }
        if (!listeObjetsExercice[i].correctionDetaillee && listeObjetsExercice[i].correctionDetailleeDisponible) {
          params += ',cd=0'
        }
        // params += ',i=1'
        const mathAleaURL = new URL('.', location.href).href

        codeMoodle += `
:: ${id.replace(/[~=#{}:]/g, '\\$&')} - ${titre.replace(/[~=#{}:]/g, '\\$&')} - ${nbQuestions} ${nbQuestions > 1 ? 'questions' : 'question'},${params.replace(/[~=#{}:]/g, '\\$&')} ::
<script src\\="${mathAleaURL.replace(/[~=#{}:]/g, '\\$&')}assets/externalJs/moodle.js" type\\="module"></script>
<mathalea-moodle ex\\="${id.replace(/[~=#{}:]/g, '\\$&')},${params.replace(/[~=#{}:]/g, '\\$&')}" />
{
  =%100%100|*=%90%90|*=%80%80|*=%75%75|*=%66.66667%66.666|*=%60%60|*=%50%50|*=%40%40|*=%33.33333%33.333|*=%30%30|*=%25%25|*=%20%20|*=%16.66667%16.666|*=%14.28571%14.2857|*=%12.5%12.5|*=%11.11111%11.111|*=%10%10|*=%5%5|*=%0%0|*
  #### <script src\\="${mathAleaURL.replace(/[~=#{}:]/g, '\\$&')}assets/externalJs/moodle.js" type\\="module"></script>
  <mathalea-moodle ex\\="${id.replace(/[~=#{}:]/g, '\\$&')},${params.replace(/[~=#{}:]/g, '\\$&')}" correction />
}
`
      }
      $('#message_liste_exercice_vide').hide()
      copierExercicesFormVersAffichage(listeDesExercices)
      $('#cache').show()
      div.innerHTML = '<pre><code class="language-html"><xmp>' + codeMoodle + '</xmp></code></pre>'
      loadPrism()
        .then(() => {
          Prism.highlightAllUnder(div) // Met à jour la coloration syntaxique
        })
        .catch((error) => console.error(error))
      const clipboardURL = new Clipboard('#btnCopieLatex', { text: () => codeMoodle })
      clipboardURL.on('success', function (e) {
        console.info('Code LaTeX copié dans le presse-papier.')
      })
    } else {
      codeMoodle = ''
      $('#message_liste_exercice_vide').show() // Message au dessus de la liste des exercices
      $('#cache').hide() // Cache au dessus du code LaTeX
      div.innerHTML = ''
    }
    $('.icone_param').remove() // dans mathalealatex pas d'engrenage pour les paramètres.
    $('.iconeInteractif').remove() // dans l'aperçu pas d'icone QCM.

    // Gestion du téléchargement
    $('#btn_telechargement')
      .off('click')
      .on('click', function () {
        // Gestion du style pour l'entête du fichier
        let contenuFichier = codeMoodle
        contenuFichier += `\n// Document généré avec MathALEA sous licence CC-BY-SA \n // ${window.location.href}`

        if ($('#nom_du_fichier').val()) {
          telechargeFichier(contenuFichier, $('#nom_du_fichier').val() + '.txt')
        } else {
          telechargeFichier(contenuFichier, 'mathalea.txt')
        }
      })
  }

  if (!context.isHtml && !context.isAmc && !context.isAlc) {
    // Sortie LaTeX
    // code pour la sortie LaTeX
    let codeEnonces = ''
    let codeCorrections = ''
    const listeExercicesLength = listeDesExercices.length
    codeMoodle = ''
    listePackages = new Set()
    if (listeExercicesLength > 0) {
      for (let i = 0; i < listeExercicesLength; i++) {
        listeObjetsExercice[i].id = listeDesExercices[i] // Pour récupérer l'id qui a appelé l'exercice
        if (listeObjetsExercice[i].typeExercice === 'dnb' || listeObjetsExercice[i].typeExercice === 'bac' || listeObjetsExercice[i].typeExercice === 'e3c' || listeObjetsExercice[i].typeExercice === 'crpe') {
          switch (listeObjetsExercice[i].typeExercice) {
            case 'dnb':
              listePackages.add('dnb')
              break
            case 'bac':
              listePackages.add('bac')
              break
            case 'e3c':
              listePackages.add('e3c')
              break
            case 'crpe':
              listePackages.add('crpe')
              break
          }
          codeEnonces += '\n\n\\exo{}\n\n'
          codeEnonces += listeObjetsExercice[i].contenu
          codeEnonces += '\n\n'
          codeCorrections += '\n\n\\exo{}\n\n'
          codeCorrections += listeObjetsExercice[i].correctionIsCachee ? '\n\n\\exo{}\n\nCorrection masquée' : listeObjetsExercice[i].contenuCorrection
          codeCorrections += '\n\n'
        } else {
          listeObjetsExercice[i].nouvelleVersion()
          if (listeObjetsExercice[i].pasDeVersionLatex) {
            // on affiche le pb mais on continue quand même
            errorHandler(getNoLatexError(listeObjetsExercice[i].id))
          }
          if (listeObjetsExercice[i].typeExercice === 'simple') {
            exerciceSimpleToContenu(listeObjetsExercice[i])
          }
          codeEnonces += listeObjetsExercice[i].contenu
          codeEnonces += '\n\n'
          codeCorrections += listeObjetsExercice[i].correctionIsCachee ? '\n\n\\exo{}\n\nCorrection masquée' : listeObjetsExercice[i].contenuCorrection
          codeCorrections += '\n\n'
          if (typeof listeObjetsExercice[i].listePackages === 'string') {
            listePackages.add(listeObjetsExercice[i].listePackages)
          } else {
            // si c'est un tableau
            listeObjetsExercice[i].listePackages.forEach(listePackages.add, listePackages)
          }
        }
      }
      function concatExercices (listeObjetsExercice) {
        const monSuperExercice = new Exercice()
        monSuperExercice.id = ''
        monSuperExercice.nbCols = 2
        monSuperExercice.nbColsCorr = 2
        monSuperExercice.listeQuestions = []
        monSuperExercice.listeCorrections = []
        for (const exercice of listeObjetsExercice) {
          exercice.nouvelleVersion()
          if (exercice.typeExercice === 'simple') {
            exerciceSimpleToContenu(exercice)
          // Comment gérer les exercices où la consigne est importante dans la présentation CAN ?
          } else {
            exercice.listeQuestions[0] = exercice.consigne + '\n\n' + exercice.listeQuestions[0]
          }
          monSuperExercice.listeQuestions = [...monSuperExercice.listeQuestions, ...exercice.listeQuestions]
          monSuperExercice.listeCorrections = [...monSuperExercice.listeCorrections, ...exercice.listeCorrections]
        }
        listeQuestionsToContenu(monSuperExercice)
        return monSuperExercice
      }
      if ($('#style_can:checked').val()) {
        const monSuperExercice = concatExercices(listeObjetsExercice)
        codeEnonces = monSuperExercice.contenu.replace('\\exo{}', '').replace('\\marginpar{\\footnotesize }', '').replace('\\begin{enumerate}', `\\begin{spacing}{1.5}
        \\begin{longtable}{|c|>{\\centering}p{0.65\\textwidth}|>{\\centering}p{0.15\\textwidth}|c|}%
        \\hline
        \\rowcolor{gray!20}\\#&Énoncé&Réponse&Jury\\tabularnewline \\hline
        \\thenbEx \\addtocounter{nbEx}{1}&`).replace('\\item', '').replaceAll('\\item', `&&\\tabularnewline \\hline
        \\thenbEx  \\addtocounter{nbEx}{1}&`).replace('\\end{enumerate}', `&&\\tabularnewline \\hline
        \\end{longtable}
        \\end{spacing}
        \\addtocounter{nbEx}{-1}`).replace('\\begin{multicols}{2}', '').replace('\\end{multicols}', '').replaceAll('\\\\', '')
        codeCorrections = monSuperExercice.contenuCorrection.replace('\\exo{}', '').replace('\\marginpar{\\footnotesize }', '')
      }
      if ($('#supprimer_correction:checked').val()) {
        codeMoodle = codeEnonces
      } else {
        codeMoodle =
          codeEnonces +
          '\n\n%%%%%%%%%%%%%%%%%%%%%%\n%%%   CORRECTION   %%%\n%%%%%%%%%%%%%%%%%%%%%%\n\n\\newpage\n\\begin{correction}\n\n' +
          codeCorrections +
          '\\end{correction}'
      }
      $('#message_liste_exercice_vide').hide()
      copierExercicesFormVersAffichage(listeDesExercices)
      $('#cache').show()

      // Gestion du nombre de versions
      if ($('#nombre_de_versions').val() > 1) {
        codeMoodle = ''
        let codeExercices = ''
        let codeCorrection = ''
        for (let v = 0; v < $('#nombre_de_versions').val(); v++) {
          codeExercices += '\\version{' + (v + 1) + '}\n\n'
          codeCorrection += '\n\n\\newpage\n\\version{' + (v + 1) + '}\n\\begin{correction}'
          if ($('#style_can:checked').val()) {
            const monSuperExercice = concatExercices(listeObjetsExercice)            
            codeExercices += monSuperExercice.contenu.replace('\\exo{}', '').replace('\\marginpar{\\footnotesize }', '').replace('\\begin{enumerate}', `\\begin{spacing}{1.5}
            \\begin{longtable}{|c|>{\\centering}p{0.65\\textwidth}|>{\\centering}p{0.15\\textwidth}|c|}%
            \\hline
            \\rowcolor{gray!20}\\#&Énoncé&Réponse&Jury\\tabularnewline \\hline
            \\thenbEx \\addtocounter{nbEx}{1}&`).replace('\\item', '').replaceAll('\\item', `&&\\tabularnewline \\hline
            \\thenbEx  \\addtocounter{nbEx}{1}&`).replace('\\end{enumerate}', `&&\\tabularnewline \\hline
            \\end{longtable}
            \\end{spacing}
            \\addtocounter{nbEx}{-1}`).replace('\\begin{multicols}{2}', '').replace('\\end{multicols}', '').replace('\\\\', '')
            codeExercices += '\n\n'
            codeCorrection += monSuperExercice.contenuCorrection.replace('\\exo{}', '').replace('\\marginpar{\\footnotesize }', '')
            codeCorrection += '\n\n'
          } else {
            for (let i = 0; i < listeDesExercices.length; i++) {
              if (listeObjetsExercice[i].typeExercice === 'dnb' || listeObjetsExercice[i].typeExercice === 'bac' || listeObjetsExercice[i].typeExercice === 'e3c') {
                switch (listeObjetsExercice[i].typeExercice) {
                  case 'dnb':
                    listePackages.add('dnb')
                    break
                  case 'bac':
                    listePackages.add('bac')
                    break
                  case 'e3c':
                    listePackages.add('e3c')
                    break
                }
                codeExercices += '\n\n\\exo{}\n\n'
                codeExercices += listeObjetsExercice[i].contenu
                codeExercices += '\n\n'
                codeCorrection += '\n\n\\exo{}\n\n'
                codeCorrection += listeObjetsExercice[i].contenuCorrection
                codeCorrection += '\n\n'
              } else {
                listeObjetsExercice[i].nouvelleVersion()
                codeExercices += listeObjetsExercice[i].contenu
                codeExercices += '\n\n'
                codeCorrection += listeObjetsExercice[i].contenuCorrection
                codeCorrection += '\n\n'
              }
            }
          }
          if (v < $('#nombre_de_versions').val() - 1) {
            if ($('#style_classique:checked').val()) {
              codeExercices += '\n\\newpage\n\\setcounter{exo}{0}\n'
            } else if ($('#style_can:checked').val()) {
              codeExercices += '\n\\newpage\n\\setcounter{exo}{0}\n'
              codeExercices += '\n\\thispagestyle{premierePage}\n'
            } else {
              codeExercices += '\n\\newpage\n\\setcounter{section}{0}\n'
            }
          }
          codeCorrection += '\n\\end{correction}'
        }
        codeMoodle = codeExercices + codeCorrection
      }
      div.innerHTML = '<pre><code class="language-latex">' + codeMoodle + '</code></pre>'
      loadPrism()
        .then(() => {
          Prism.highlightAllUnder(div) // Met à jour la coloration syntaxique
        })
        .catch((error) => console.error(error))
      const clipboardURL = new Clipboard('#btnCopieLatex', { text: () => codeMoodle })
      clipboardURL.on('success', function (e) {
        console.info('Code LaTeX copié dans le presse-papier.')
      })
    } else {
      codeMoodle = ''
      $('#message_liste_exercice_vide').show() // Message au dessus de la liste des exercices
      $('#cache').hide() // Cache au dessus du code LaTeX
      div.innerHTML = ''
    }
    $('.icone_param').remove() // dans mathalealatex pas d'engrenage pour les paramètres.
    $('.iconeInteractif').remove() // dans l'aperçu pas d'icone QCM.

    // Gestion du téléchargement
    $('#btn_telechargement')
      .off('click')
      .on('click', function () {
        // Gestion du style pour l'entête du fichier
        let contenuFichier = `
    
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % Document généré avec MathALEA sous licence CC-BY-SA
    %
    % ${window.location.href}
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    `

        if ($('#style_classique:checked').val()) {
          if ($('#entete_du_fichier').val() === '') {
            $('#entete_du_fichier').val('Exercices')
          }
          contenuFichier += '\\documentclass[a4paper,11pt,fleqn]{article}\n'
          contenuFichier += `\\input{preambule}\n\\pagestyle{fancy}\n\\renewcommand{\\headrulewidth}{1pt}\n\\fancyhead[C]{${$(
            '#entete_du_fichier'
          ).val()}}\n\\fancyhead[L]{}`
          contenuFichier += '\\fancyhead[R]{}\n\\renewcommand{\\footrulewidth}{1pt}\n\\fancyfoot[C]{}\n\\fancyfoot[L]{}\n\\fancyfoot[R]{}\n\n'
          contenuFichier += '\\begin{document}\n\n' + codeMoodle + '\n\n\\end{document}'
        } else if ($('#style_can:checked').val()) {
          contenuFichier += '\\documentclass[a5paper,11pt,fleqn]{article}\n'
          contenuFichier += `\\input{preambule}\n\\pagestyle{empty}
          ${$('#entete_du_fichier').val()}}`
          contenuFichier += '\\begin{document}\n\n' + codeMoodle + '\n\n\\end{document}'
        } else {
          contenuFichier += '\\documentclass[a4paper,11pt,fleqn]{article}\n\\input{preambule_coop}\n'
          contenuFichier += '\\theme{' + $('input[name=theme]:checked').val() + '}{' + $('#entete_du_fichier').val() + '}'
          contenuFichier += '{' + $('#items').val() + '}{' + $('#domaine').val() + '}\n\\begin{document}\n\n' + codeMoodle
          contenuFichier += '\n\n\\end{document}'
        }

        if ($('#nom_du_fichier').val()) {
          telechargeFichier(contenuFichier, $('#nom_du_fichier').val() + '.tex')
        } else {
          telechargeFichier(contenuFichier, 'mathalea.tex')
        }
      })

    $('#btn_overleaf')
      .off('click')
      .on('click', function () {
        // Gestion du style pour l'entête du fichier

        let contenuFichier = `
    
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % Document généré avec MathALEA sous licence CC-BY-SA
    %
    % ${window.location.href}
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    
    `

        if ($('#style_classique:checked').val()) {
          contenuFichier += introLatex($('#entete_du_fichier').val(), listePackages) + codeMoodle + '\n\n\\end{document}'
        } else if ($('#style_can:checked').val()) {
          contenuFichier += introLatexCan($('#entete_du_fichier').val(), listePackages) + codeMoodle + '\n\n\\end{document}'
        } else {
          contenuFichier += introLatexCoop(listePackages)
          contenuFichier += '\n\n\\theme{' + $('input[name=theme]:checked').val() + '}{' + $('#entete_du_fichier').val() + '}'
          contenuFichier += '{' + $('#items').val() + '}{' + $('#domaine').val() + '}\n\\begin{document}\n\n' + codeMoodle
          contenuFichier += '\n\n\\end{document}'
        }

        // Gestion du LaTeX statique

        // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

        $('input[name=encoded_snip]').val(encodeURIComponent(contenuFichier))
        if (listePackages.has('dnb') || listePackages.add('bac') || listePackages.add('e3c')) {
          // Force le passage à xelatex sur Overleaf pour les exercices de DNB
          $('input[name=engine]').val('xelatex')
        }
        if ($('#nom_du_fichier').val()) {
          $('input[name=snip_name]').val($('#nom_du_fichier').val()) // nomme le projet sur Overleaf
        }
      })

    // Gestion des paramètres du fichier LaTeX

    $('#options_style_CoopMaths').show() // par défaut le style coop
    $('a.lien_images').show()
    $(function () {
      $("input:radio[name='style']").change(function () {
        if ($('#style_classique:checked').val() || $('#style_can:checked').val()) {
          $('#options_style_CoopMaths').hide()
          $('a.lien_preambule').attr('href', 'fichiers/preambule.tex')
          $('a.lien_images').hide()
        } else {
          $('a.lien_images').show()
          $('#options_style_CoopMaths').show()
          $('a.lien_preambule').attr('href', 'fichiers/preambule_coop.tex')
        }
      })
    })
  }

  //* ******* Gestion des évènements sur les éléments liés aux exercices ********

  $('.iconeInteractif')
    .off('click')
    .on('click', function (e) {
      // Au click sur l'icone interactif on coche le mode interactif de l'exercice dans les paramètres et on relance la mise à jour des exercices.
      $('#accordeon_parametres >div').addClass('active')
      const numeroExerciceExercice = $(e.target).attr('data-num')
      const checkElem = $(`#formInteractif${numeroExerciceExercice}`)
      if (checkElem.prop('checked')) {
        $(`#formInteractif${numeroExerciceExercice}`).prop('checked', false).trigger('change')
        listeObjetsExercice[numeroExerciceExercice].interactif = false
        miseAJourDuCode()
      } else {
        $(`#formInteractif${numeroExerciceExercice}`).prop('checked', true).trigger('change')
        listeObjetsExercice[numeroExerciceExercice].interactif = true
        miseAJourDuCode()
        $(`#boutonInteractif${numeroExerciceExercice}`).removeClass('outline')
      }
    })

  // icone_paramètres fait le focus sur les parmètres correspondant à l'exercice
  $('.icone_param')
    .off('click')
    .on('click', function (e) {
      $('#accordeon_parametres >div').addClass('active')
      const numeroExercice = e.target.parentElement.parentElement.parentElement.id
      $(`.${numeroExercice} + div :input`).focus()
    })

  // ******** possibilité de manipuler la liste des exercices via les exercices. ******

  function monterExo (num) {
    // remonte un exercice d'un cran dans la liste (déclenché sur l'icone fleche vers le haut au niveau du titre d'un exercice.
    // récupère la liste des exercices dans le formulaire, la réordonne et relance la fonction miseAJourDeLaListeDesExercices()
    const formChoixDesExercices = document.getElementById('choix_des_exercices')
    listeDesExercices = formChoixDesExercices.value.replace(/\s/g, '').replace(';', ',').split(',')
    num = parseInt(num)
    if (num !== 0) {
      const tmp = listeDesExercices[num]
      listeDesExercices[num] = listeDesExercices[num - 1]
      listeDesExercices[num - 1] = tmp
      const tmpobj = listeObjetsExercice[num]
      listeObjetsExercice[num] = listeObjetsExercice[num - 1]
      listeObjetsExercice[num - 1] = tmpobj
      formChoixDesExercices.value = listeDesExercices.toString()
      copierExercicesFormVersAffichage(listeDesExercices)
      miseAJourDuCode()
    }
  }

  function descendreExo (num) {
    // descend un exercice d'un cran dans la liste (déclenché sur l'icone fleche vers le bas au niveau du titre d'un exercice.
    // récupère la liste des exercices dans le formulaire, la réordonne et relance la fonction miseAJourDeLaListeDesExercices()
    const formChoixDesExercices = document.getElementById('choix_des_exercices')
    listeDesExercices = formChoixDesExercices.value.replace(/\s/g, '').replace(';', ',').split(',')
    num = parseInt(num)
    if (num !== listeDesExercices.length + 1) {
      const tmp = listeDesExercices[num]
      listeDesExercices[num] = listeDesExercices[num + 1]
      listeDesExercices[num + 1] = tmp
      const tmpobj = listeObjetsExercice[num]
      listeObjetsExercice[num] = listeObjetsExercice[num + 1]
      listeObjetsExercice[num + 1] = tmpobj
      formChoixDesExercices.value = listeDesExercices.toString()
      copierExercicesFormVersAffichage(listeDesExercices)
      miseAJourDuCode()
    }
  }

  // gestion des évènements sur les click sur les icones liés aux titres des exercices :

  $('.icone_moins')
    .off('click')
    .on('click', function (e) {
      supprimerExo(e.target.id) // fonction présente dans menuDesExercicesDisponibles car utilisée aussi avec le petit icone - dans l'apparence de la ligne exercice
    })

  $('.icone_up')
    .off('click')
    .on('click', function (e) {
      monterExo(e.target.id)
    })

  $('.icone_down')
    .off('click')
    .on('click', function (e) {
      descendreExo(e.target.id)
    })
  //* ***************
}

/**
 * Fonction à lancer une fois que la liste des exercices a été mise à jour.
 * Elle va importer les différents exercices depuis ./exercices/id.js et remplir listeObjetsExercice.
 * Une fois que tout est importé, elle créé les formulaires pour les paramètres des exercices.
 * Ensuite, elle regarde dans l'URL si il y a des paramètres à récupérer et à saisir dans le formulaire.
 * Enfin, elle délègue à mise_a_jour du code l'affichage
 *
 * cg 04-2021 ajout de l'argument preview (facultatif (un code exercice)) permettant l'affichage dans une popup
 * sans l'ajouter à la liste
 * @private
 */
async function miseAJourDeLaListeDesExercices (preview) {
  try {
    let besoinXCas = false
    const promises = []
    // pour ne pas ajouter preview à la liste originale
    const listeExercices = listeDesExercices
    if (preview) listeExercices.push(preview)
    listeObjetsExercice = []
    listeExercices.forEach((id, i) => {
      let url
      try {
        url = dictionnaireDesExercices[id].url
      } catch (error) {
        console.error(error)
        throw getUnknownError(id)
      }

      if (dictionnaireDesExercices[id].typeExercice === 'dnb' || dictionnaireDesExercices[id].typeExercice === 'bac' || dictionnaireDesExercices[id].typeExercice === 'e3c' || dictionnaireDesExercices[id].typeExercice === 'crpe') {
        listeObjetsExercice[i] = dictionnaireDesExercices[id]
        if (url) {
          promises.push(
            window.fetch(url)
              .then((response) => response.text())
              .then((data) => {
                listeObjetsExercice[i].nbQuestionsModifiable = false
                listeObjetsExercice[i].video = ''
                listeObjetsExercice[i].titre = id
                listeObjetsExercice[i].contenu = data
              })
          )
          promises.push(
            window.fetch(dictionnaireDesExercices[id].urlcor)
              .then((response) => response.text())
              .then((data) => {
                listeObjetsExercice[i].contenuCorrection = listeObjetsExercice[i].correctionIsCachee ? 'Correction masquée' : data
              })
          )
        } else {
          listeObjetsExercice[i].nbQuestionsModifiable = false
          listeObjetsExercice[i].video = ''
          listeObjetsExercice[i].titre = id
          listeObjetsExercice[i].contenu = 'Exercice non disponible en LaTeX.'
          listeObjetsExercice[i].contenuCorrection = 'Exercice non disponible en LaTeX.'
        }
        if (typeof dictionnaireDesExercices[id].urlcorcoop !== 'undefined') {
          promises.push(
            window.fetch(dictionnaireDesExercices[id].urlcorcoop)
              .then((response) => response.text())
              .then((data) => {
                listeObjetsExercice[i].contenuCorrection += listeObjetsExercice[i].correctionIsCachee ? 'Correction masquée' : '\\begin{LARGE}\\textbf{Correction alternative COOPMATHS}\\end{LARGE} \\par\\vspace{0.5cm}' + data
              })
          )
        }
      // } else if (dictionnaireDesExercices[id].typeExercice === 'crpe') {
      //   listeObjetsExercice[i] = dictionnaireDesExercices[id]
      //   listeObjetsExercice[i].nbQuestionsModifiable = false
      //   listeObjetsExercice[i].video = ''
      //   listeObjetsExercice[i].titre = id
      //   listeObjetsExercice[i].contenu = 'Exercice non disponible en version LaTeX'
      //   listeObjetsExercice[i].contenuCorrection = 'Exercice non disponible en version LaTeX'
      } else {
        // avec webpack on ne peut pas faire de import(url), car il faut lui indiquer quels fichiers sont susceptibles d'être chargés
        // ici il ne peut s'agir que de js contenus dans exercices (dnb,bac,e3c,crpe déjà traité dans le if au dessus)
        const chunks = /^\/exercices\/(.*)/.exec(url)
        if (!chunks) throw UserFriendlyError(`url invalide : ${url}`)
        const path = chunks[1]
        promises.push(
          // cf https://webpack.js.org/api/module-methods/#magic-comments
          import(/* webpackMode: "lazy" */ './exercices/' + path).then((module) => {
            if (!module) throw getInvalidModuleError(path)
            const Exo = module.default
            listeObjetsExercice[i] = new Exo()
            ;['titre', 'amcReady', 'amcType', 'interactifType', 'interactifReady'].forEach((p) => {
              if (module[p] !== undefined) listeObjetsExercice[i][p] = module[p]
            })
            ;['sup', 'sup2', 'sup3', 'sup4', 'nbQuestions', 'besoinFormulaireNumerique', 'besoinFormulaire2Numerique', 'besoinFormulaire3Numerique',
              'besoinFormulaire4Numerique', 'besoinFormulaireCaseACocher', 'besoinFormulaire2CaseACocher', 'besoinFormulaire3CaseACocher', 'besoinFormulaire4CaseACocher',
              'besoinFormulaireTexte', 'besoinFormulaire2Texte', 'besoinFormulaire3Texte', 'besoinFormulaire4Texte'].forEach((p) => {
              if (dictionnaireDesExercices[id][p] !== undefined) {
                listeObjetsExercice[i][p] = dictionnaireDesExercices[id][p]
              }
            })
            // On ajoute la propriété name pour pouvoir éventuellement récupérer la ref de l'exo
            listeObjetsExercice[i].name = dictionnaireDesExercices[id].name
            if (listeObjetsExercice[i].typeExercice === 'XCas') {
              besoinXCas = true
            }
          })
        )
      }
    })
    await Promise.all(promises)
    if (!preview) parametresExercice(listeObjetsExercice)
    if (!preview || context.isHtml) {
      // ajout de context.isHtml par conserver les infos sur le fait que les exercices sont en mode interactif
      // Récupère les paramètres passés dans l'URL
      const urlVars = getUrlVars()
      // trier et mettre de côté les urlvars qui ne sont plus dans la liste des exercices
      // => évite les erreurs lors de la suppression de question dans la liste.
      if (urlVars.length < listeObjetsExercice.length && ((document.getElementById('filtre') && document.getElementById('filtre').value === 'interactif') || document.getElementById('exoModeInteractif'))) {
        listeObjetsExercice[listeObjetsExercice.length - 1].interactif = true
        if (formInteractif[listeObjetsExercice.length - 1]) {
          formInteractif[listeObjetsExercice.length - 1].checked = true
        }
      }
      if (urlVars.length < 0 && (document.getElementById('filtre').value === 'interactif' || document.getElementById('exoModeInteractif'))) {
        listeObjetsExercice[0].interactif = true
        formInteractif[0].checked = true
      }
      for (let i = 0; i < urlVars.length; i++) {
        if (urlVars[i].id !== listeExercices[i]) {
          urlVars.splice(i, 1)
        }
      }
      for (let i = 0; i < urlVars.length; i++) {
        // récupère les éventuels paramètres dans l'URL
        // et les recopie dans les formulaires des paramètres
        if (urlVars[i].n && listeObjetsExercice[i].nbQuestionsModifiable) {
          listeObjetsExercice[i].nbQuestions = parseInt(urlVars[i].n)
          formNbQuestions[i].value = listeObjetsExercice[i].nbQuestions
        }
        if (urlVars[i].video && context.isHtml) {
          listeObjetsExercice[i].video = decodeURIComponent(urlVars[i].video)
          formVideo[i].value = listeObjetsExercice[i].video
        }
        if (urlVars[i].cc) {
          listeObjetsExercice[i].correctionIsCachee = !!urlVars[i].cc
          formCorrectionIsCachee[i].checked = !!urlVars[i].cc
          context.seedSpecial = !!urlVars[i].cc && context.isHtml
        }
        if (urlVars[i].cd !== undefined) {
          if (urlVars[i].cd === 1 && listeObjetsExercice[i].correctionDetailleeDisponible) {
            listeObjetsExercice[i].correctionDetaillee = true
            formCorrectionDetaillee[i].checked = true
          }
          if (urlVars[i].cd === 0 && listeObjetsExercice[i].correctionDetailleeDisponible) {
            listeObjetsExercice[i].correctionDetaillee = false
            formCorrectionDetaillee[i].checked = false
          }
        }
        // En vue CAN ou eval on met toujours les exercices en interactif
        if (context.vue === 'can' || context.vue === 'eval') {
          listeObjetsExercice[i].interactif = true
        } else {
          if (urlVars[i].i !== undefined) {
            if (urlVars[i].i) {
              listeObjetsExercice[i].interactif = true
              if (formInteractif[i]) {
                formInteractif[i].checked = true
              }
            } else {
              listeObjetsExercice[i].interactif = false
              if (formInteractif[i]) {
                formInteractif[i].checked = false
              }
            }
          }
        }
        if (typeof urlVars[i].s !== 'undefined') {
          // Si le string peut être convertit en int alors on le fait
          if (isNumeric(urlVars[i].s) && listeObjetsExercice[i].besoinFormulaireNumerique) {
            // Avec sup numérique, on peut récupérer le max définit dans le formulaire
            const max = listeObjetsExercice[i].besoinFormulaireNumerique[1]
            listeObjetsExercice[i].sup = contraindreValeur(1, max, Number(urlVars[i].s))
          } else { // Il faut que ce soit un string car soit ce n'est pas un nombre, soit ça vient d'un formulaire Texte.
            listeObjetsExercice[i].sup = typeof urlVars[i].s === 'boolean' ? urlVars[i].s : urlVars[i].s.toString()
          }
          // Un exercice avec un this.sup mais pas de formulaire pouvait poser problème
          try {
            if (listeObjetsExercice[i].besoinFormulaireCaseACocher) {
              formSup[i].checked = listeObjetsExercice[i].sup
            } else {
              formSup[i].value = listeObjetsExercice[i].sup
            }
          } catch {}
        }
        if (typeof urlVars[i].s2 !== 'undefined') {
          if (isNumeric(urlVars[i].s2) && listeObjetsExercice[i].besoinFormulaire2Numerique) {
            // Avec sup numérique, on peut récupérer le max définit dans le formulaire
            const max = listeObjetsExercice[i].besoinFormulaire2Numerique[1]
            listeObjetsExercice[i].sup2 = contraindreValeur(1, max, Number(urlVars[i].s2))
          } else {
            listeObjetsExercice[i].sup2 = typeof urlVars[i].s2 === 'boolean' ? urlVars[i].s2 : urlVars[i].s2.toString()
          }
          try {
            if (listeObjetsExercice[i].besoinFormulaire2CaseACocher) {
              formSup2[i].checked = listeObjetsExercice[i].sup2
            } else {
              formSup2[i].value = listeObjetsExercice[i].sup2
            }
          } catch (error) {}
        }
        if (typeof urlVars[i].s3 !== 'undefined') {
          if (isNumeric(urlVars[i].s3) && listeObjetsExercice[i].besoinFormulaire3Numerique) {
            // Avec sup numérique, on peut récupérer le max définit dans le formulaire
            const max = listeObjetsExercice[i].besoinFormulaire3Numerique[1]
            listeObjetsExercice[i].sup3 = contraindreValeur(1, max, Number(urlVars[i].s3))
          } else {
            listeObjetsExercice[i].sup3 = typeof urlVars[i].s3 === 'boolean' ? urlVars[i].s3 : urlVars[i].s3.toString()
          }
          try {
            if (listeObjetsExercice[i].besoinFormulaire3CaseACocher) {
              formSup3[i].checked = listeObjetsExercice[i].sup3
            } else {
              formSup3[i].value = listeObjetsExercice[i].sup3
            }
          } catch (error) {
            // console.error(error)
          }
        }
        if (typeof urlVars[i].s4 !== 'undefined') {
          if (isNumeric(urlVars[i].s4) && listeObjetsExercice[i].besoinFormulaire4Numerique) {
            // Avec sup numérique, on peut récupérer le max définit dans le formulaire
            const max = listeObjetsExercice[i].besoinFormulaire4Numerique[1]
            listeObjetsExercice[i].sup4 = contraindreValeur(1, max, Number(urlVars[i].s4))
          } else {
            listeObjetsExercice[i].sup4 = typeof urlVars[i].s4 === 'boolean' ? urlVars[i].s4 : urlVars[i].s4.toString()
          }
          try {
            formSup4[i].value = listeObjetsExercice[i].sup4
          } catch (error) {
            // console.error(error)
          }
        }
      }
    }
    if (besoinXCas) {
      // On charge le javascript de XCas
      let div // le div dans lequel on fera apparaître le cercle de chargement
      if (context.isHtml) {
        div = document.getElementById('exercices')
      } else {
        div = document.getElementById('div_codeLatex')
      }
      div.innerHTML = `<div class="profile-main-loader">
                    <div class="loader">
                      <svg class="circular-loader"viewBox="25 25 50 50" >
                        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="2" />
                      </svg>
                    </div>
                  </div>`
      await loadGiac()
    }

    if (preview) {
      // gestion de l'affichage des exercices
      const output = context.isHtml
      context.isHtml = true // pour que l'aperçu fonctionne dans mathalealatex besoin d'avoir l'exercice en mode html
      let filtre
      if (document.getElementById('filtre')) {
        filtre = document.getElementById('filtre').value
      }
      if (typeof listeObjetsExercice[listeExercices.length - 1].nouvelleVersion === 'function') {
        try {
          if (filtre && filtre === 'interactif') {
            // lorsqu'on est en mode interactif la prévisualisation est en mode interactif.
            listeObjetsExercice[listeExercices.length - 1].interactif = 1
          }
          listeObjetsExercice[listeExercices.length - 1].nouvelleVersion(0)
        } catch (error) {
          console.error(error)
        }
      }
      listeObjetsExercice[listeExercices.length - 1].id = listeExercices[listeExercices.length - 1]
      const contenu = contenuExerciceHtml(listeObjetsExercice[listeExercices.length - 1], listeExercices.length)
      $('#popup_preview').html(contenu.contenu_un_exercice)
      $('.popup').addClass('show')
      if (document.getElementById('left')) {
        $('.popuptext').css({ top: document.getElementById('left').scrollTop - 10 })
        $('.popuptext').css({ left: document.getElementById('left').offsetLeft + 5 })
        if (window.innerWidth < 765) {
          $('.popuptext').css({ left: document.getElementById('left').offsetLeft + 25 })
          $('.popup').css({ left: document.getElementById('left').offsetLeft + 25 })
        }
      } else {
        $('.popuptext').css({ top: document.documentElement.scrollTop - 10 })
      }
      $('.popuptext').show()
      listeDesExercices.pop()
      if (!output) {
        gestionModules(listeObjetsExercice)
      }
      context.isHtml = output
      miseAJourDuCode() // permet de gérer les popup avec module.
    } else {
      miseAJourDuCode()
    }
  } catch (error) {
    errorHandler(error)
  }
}

let div// div dans lequel le code va être affiché
let divParametresGeneraux // div dans lequel vont être inséré tous les formulaires
const formConsigne = []
const formNbQuestions = []
const formVideo = []
const formCorrectionDetaillee = []
const formCorrectionIsCachee = []
const formNbCols = []
const formNbColsCorr = []
const formSpacing = []
const formSpacingCorr = []
const formSup = []
const formSup2 = []
const formSup3 = []
const formSup4 = []
const formInteractif = [] // Création de tableaux qui recevront les éléments HTML de chaque formulaires

function parametresExercice (exercice) {
  /* Pour l'exercice i, on rajoute un formulaire avec 5 inputs :
        nombre de questions, nombre de colonnes,nombre de colonnes dans le corrigé,
        espacement et espacement dans le corrigé.
        Les réponses modifient les caractéristiques de l'exercice puis le code LaTeX est mis à jour
        */
  divParametresGeneraux.innerHTML = '' // Vide le div parametres_generaux
  if (exercice.length > 0) {
    divParametresGeneraux.innerHTML += '<div class="ui hidden divider"></div>'

    divParametresGeneraux.innerHTML += `<div><label for="form_serie">Clé de la série d'exercice : </label> <input id="form_serie" type="text" style="padding: 5px;
  border: 1px solid #ccc;border-radius: 4px;"></div>`
  }

  for (let i = 0; i < exercice.length; i++) {
    if (context.isHtml) {
      divParametresGeneraux.innerHTML +=
        '<h4 class="ui dividing header exercice' + i + '">Exercice n°' + (i + 1) + ' : ' + exercice[i].titre + ' − ' + listeDesExercices[i] + '</h4>'
      if (exercice[i].pasDeVersionLatex) {
        divParametresGeneraux.innerHTML += "<p><em>Cet exercice n'a pas de version LaTeX et ne peut donc pas être exporté en PDF.</em></p>"
      }
      if (exercice[i].nbQuestionsModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="formNbQuestionsParGroupe' +
          i +
          '">Nombre de questions : </label> <input id="formNbQuestionsParGroupe' +
          i +
          '" type="number"  min="1" max="99"></div>'
      }
      divParametresGeneraux.innerHTML +=
          '<div><label for="form_video' +
          i +
          '" data-tooltip="URL, code iframe, identifiant YouTube" data-inverted="" >Vidéo ou complément numérique : <input id="form_video' +
          i +
          '" type="texte" size="20"  ></label></div>'
      if (exercice[i].correctionDetailleeDisponible) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_correctionDetaillee' +
          i +
          '">Correction détaillée : </label> <input id="form_correctionDetaillee' +
          i +
          '" type="checkbox" ></div>'
      }

      divParametresGeneraux.innerHTML += `<div><label for="form_correctionCachee${i}" data-tooltip="Les élèves pourront s'auto-corriger sur tous les exercices\nsauf ceux sélectionnés pour être vérifiés par le professeur" data-position="top left" data-inverted="">Correction cachée : </label> <input id="form_correctionCachee${i}" type="checkbox"></div>`

      if (exercice[i].interactifReady && !exercice[i].interactifObligatoire && !context.isMoodle) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="formInteractif' + i + '">Exercice interactif : </label> <input id="formInteractif' + i + '" type="checkbox" ></div>'
      }

      if (
        !exercice[i].nbQuestionsModifiable &&
        !exercice[i].correctionDetailleeDisponible &&
        !exercice[i].besoinFormulaireNumerique &&
        !exercice[i].besoinFormulaireTexte &&
        !exercice[i].besoinFormulaireCaseACocher &&
        !exercice[i].interactif
      ) {
        divParametresGeneraux.innerHTML += '<p><em>Cet exercice ne peut pas être paramétré.</em></p>'
      }
    } else if (context.isAmc) {
      exercice[i].modeQcm = true
      divParametresGeneraux.innerHTML +=
        `<h4 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle down icon icone_down"></i><i id="${i}" class="arrow circle up icon icone_up"></i>Exercice n°` +
        (i + 1) +
        ' : ' +
        exercice[i].titre +
        '</h4>'

      if (exercice[i].consigneModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_consigne' + i + '">Consigne : </label> <input id="form_consigne' + i + '" type="texte" size="20"></div>'
      }
      if (exercice[i].nbQuestionsModifiable) {
        divParametresGeneraux.innerHTML +=
                          '<div><label for="formNbQuestionsParGroupe' + i + '">Nombre de questions : </label> <input id="formNbQuestionsParGroupe' + i + '" type="number"  min="1" max="99"></div>'
      }
      if (exercice[i].correctionDetailleeDisponible) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_correctionDetaillee' +
          i +
          '">Correction détaillée : </label> <input id="form_correctionDetaillee' +
          i +
          '" type="checkbox" ></div>'
      }
      if (exercice[i].qcmDisponible) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_modeQcm' + i + '">Mode QCM : </label> <input id="form_modeQcm' + i + '" type="checkbox" ></div>'
      }
      if (exercice[i].nbColsModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_nbCols' + i + '">Nombre de colonnes : </label><input id="form_nbCols' + i + '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].nbColsCorrModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_nbColsCorr' +
          i +
          '">Nombre de colonnes dans la correction : </label><input id="form_nbColsCorr' +
          i +
          '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].spacingModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_nbColsCorr' + i + '">Espacement : </label><input id="form_spacing' + i + '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].spacingCorrModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_nbColsCorr' +
          i +
          '">Espacement dans la correction : </label><input id="form_spacingCorr' +
          i +
          '" type="number" min="1" max="99"></div>'

        // Si le nombre de versions changent
        $('#nombre_de_versions').change(function () {
          miseAJourDuCode()
        })
      }
    } else if (context.isAlc) {
      divParametresGeneraux.innerHTML += '<h4 class="ui dividing header exercice' + i + '">Exercice n°' + (i + 1) + ' : ' + exercice[i].titre + '</h4>'

      if (exercice[i].consigneModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_consigne' + i + '">Consigne : </label> <input id="form_consigne' + i + '" type="texte" size="20"></div>'
      }
      if (exercice[i].nbQuestionsModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="formNbQuestionsParGroupe' +
          i +
          '">Nombre de questions : </label> <input id="formNbQuestionsParGroupe' +
          i +
          '" type="number"  min="1" max="99"></div>'
      }
      if (exercice[i].correctionDetailleeDisponible) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_correctionDetaillee' +
          i +
          '">Correction détaillée : </label> <input id="form_correctionDetaillee' +
          i +
          '" type="checkbox" ></div>'
      }
      // passage amsType num à string cf commit 385b5ea
      if (exercice[i].interactifReady && (exercice[i].amcType === 'qcmMono' || exercice[i].amcType === 'qcmMult')) {
        // En LaTeX les seuls exercices interactifs sont les QCM
        divParametresGeneraux.innerHTML +=
          '<div><label for="formInteractif' + i + '">QCM : </label> <input id="formInteractif' + i + '" type="checkbox" ></div>'
      }

      // Si le nombre de versions changent
      $('#nombre_de_versions').change(function () {
        miseAJourDuCode()
      })
      $('#popup_preview .icone_param').remove() // Dans la popup de visualisation pas d'icone engrenage.
      $('#popup_preview .iconeInteractif').remove() // Dans la popup de visualisation pas d'icone interactif
    } else {
      divParametresGeneraux.innerHTML += '<h4 class="ui dividing header">Exercice n°' + (i + 1) + ' : ' + exercice[i].titre + '</h4>'

      if (exercice[i].consigneModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_consigne' + i + '">Consigne : </label> <input id="form_consigne' + i + '" type="texte" size="20"></div>'
      }
      if (exercice[i].nbQuestionsModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="formNbQuestionsParGroupe' +
          i +
          '">Nombre de questions : </label> <input id="formNbQuestionsParGroupe' +
          i +
          '" type="number"  min="1" max="99"></div>'
      }
      if (exercice[i].correctionDetailleeDisponible) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_correctionDetaillee' +
          i +
          '">Correction détaillée : </label> <input id="form_correctionDetaillee' +
          i +
          '" type="checkbox" ></div>'
      }
      divParametresGeneraux.innerHTML += `<div><label for="form_correctionCachee${i}">Correction cachée : </label> <input id="form_correctionCachee${i}" type="checkbox"></div>`
      // passage amsType num à string cf commit 385b5ea
      if (exercice[i].interactifReady && (exercice[i].amcType === 'qcmMono' || exercice[i].amcType === 'qcmMult')) {
        // En LaTeX les seuls exercices interactifs sont les QCM
        divParametresGeneraux.innerHTML +=
          '<div><label for="formInteractif' + i + '">QCM : </label> <input id="formInteractif' + i + '" type="checkbox" ></div>'
      }
      if (exercice[i].nbColsModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_nbCols' + i + '">Nombre de colonnes : </label><input id="form_nbCols' + i + '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].nbColsCorrModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_nbColsCorr' +
          i +
          '">Nombre de colonnes dans la correction : </label><input id="form_nbColsCorr' +
          i +
          '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].spacingModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_nbColsCorr' + i + '">Espacement : </label><input id="form_spacing' + i + '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].spacingCorrModifiable) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_nbColsCorr' +
          i +
          '">Espacement dans la correction : </label><input id="form_spacingCorr' +
          i +
          '" type="number" min="1" max="99"></div>'
      }

      // Si le nombre de versions changent
      $('#nombre_de_versions').change(function () {
        miseAJourDuCode()
      })
    }

    // Si un formulaire supplémentaire est défini dans l'exercice alors on l'ajoute
    if (exercice[i].besoinFormulaireNumerique || exercice[i].besoinFormulaireTexte) {
      // Ajout du titre pour les réglages supplémentaires
      divParametresGeneraux.innerHTML += "<h4 class='ui dividing header'></h4>"
    }

    if (exercice[i].besoinFormulaireNumerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoinFormulaireNumerique[2]) {
        // Si un tooltip est défini
        divParametresGeneraux.innerHTML +=
          '<div data-tooltip="' +
          exercice[i].besoinFormulaireNumerique[2] +
          '"" data-inverted="" data-position="top left"><label for="form_sup' +
          i +
          '">' +
          exercice[i].besoinFormulaireNumerique[0] +
          ' : </label><input id="form_sup' +
          i +
          '" type="number"  min="1" max="' +
          exercice[i].besoinFormulaireNumerique[1] +
          '"></div>'
      } else {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_sup' +
          i +
          '">' +
          exercice[i].besoinFormulaireNumerique[0] +
          ' : </label><input id="form_sup' +
          i +
          '" type="number"  min="1" max="' +
          exercice[i].besoinFormulaireNumerique[1] +
          '"></div>'
      }
    }

    if (exercice[i].besoinFormulaireTexte) {
      // Création d'un formulaire texte
      const paramTooltip = exercice[i].besoinFormulaireTexte[1] ? `data-tooltip="${exercice[i].besoinFormulaireTexte[1]}"` : ''
      divParametresGeneraux.innerHTML += `<div><label for='form_sup${i}'> ${exercice[i].besoinFormulaireTexte[0]} : </label>
                    <div style='display: inline' ${paramTooltip} data-inverted=''>
                    <input id='form_sup${i}' type='text' size='20' ></div></div>`
    }

    if (exercice[i].besoin_formulaire_long_texte) {
      // Création d'un long formulaire de texte
      divParametresGeneraux.innerHTML +=
        "<label for='form_sup" +
        i +
        "'>" +
        exercice[i].besoin_formulaire_long_texte[0] +
        " : </label> <div style='display: inline' data-tooltip='" +
        exercice[i].besoin_formulaire_long_texte[1] +
        "' data-inverted=''><textarea id='form_sup" +
        i +
        "'></textarea></div>"
      divParametresGeneraux.innerHTML += `<div class="ui form">
<div class="field">
<label>Text</label>
<textarea></textarea>
</div>
</div>`
    }

    if (exercice[i].besoinFormulaireCaseACocher) {
      // Création d'un formulaire texte
      divParametresGeneraux.innerHTML +=
        "<div><label for='form_sup" +
        i +
        "'>" +
        exercice[i].besoinFormulaireCaseACocher[0] +
        " : </label><input id='form_sup" +
        i +
        "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoinFormulaire2CaseACocher) {
      // Création d'un formulaire texte
      divParametresGeneraux.innerHTML +=
        "<div><label for='form_sup2" +
        i +
        "'>" +
        exercice[i].besoinFormulaire2CaseACocher[0] +
        " : </label><input id='form_sup2" +
        i +
        "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoinFormulaire2Numerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoinFormulaire2Numerique[2]) {
        // Si un tooltip est défini
        divParametresGeneraux.innerHTML +=
          '<div data-tooltip="' +
          exercice[i].besoinFormulaire2Numerique[2] +
          '"" data-inverted="" data-position="top left"><label for="form_sup2' +
          i +
          '">' +
          exercice[i].besoinFormulaire2Numerique[0] +
          ' : </label><input id="form_sup2' +
          i +
          '" type="number"  min="1" max="' +
          exercice[i].besoinFormulaire2Numerique[1] +
          '"></div>'
      } else {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_sup2' +
          i +
          '">' +
          exercice[i].besoinFormulaire2Numerique[0] +
          ' : </label><input id="form_sup2' +
          i +
          '" type="number"  min="1" max="' +
          exercice[i].besoinFormulaire2Numerique[1] +
          '"></div>'
      }
    }

    if (exercice[i].besoinFormulaire2Texte) {
      // Création d'un formulaire texte
      const paramTooltip = exercice[i].besoinFormulaire2Texte[1] ? `data-tooltip="${exercice[i].besoinFormulaire2Texte[1]}"` : ''
      divParametresGeneraux.innerHTML += `<div><label for='form_sup2${i}'> ${exercice[i].besoinFormulaire2Texte[0]} : </label>
                    <div style='display: inline' ${paramTooltip} data-inverted=''>
                    <input id='form_sup2${i}' type='text' size='20' ></div></div>`
    }

    if (exercice[i].besoinFormulaire3CaseACocher) {
      // Création d'un formulaire texte
      divParametresGeneraux.innerHTML +=
        "<div><label for='form_sup3" +
        i +
        "'>" +
        exercice[i].besoinFormulaire3CaseACocher[0] +
        " : </label><input id='form_sup3" +
        i +
        "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoinFormulaire3Numerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoinFormulaire3Numerique[2]) {
        // Si un tooltip est défini
        divParametresGeneraux.innerHTML +=
          '<div data-tooltip="' +
          exercice[i].besoinFormulaire3Numerique[2] +
          '"" data-inverted="" data-position="top left"><label for="form_sup3' +
          i +
          '">' +
          exercice[i].besoinFormulaire3Numerique[0] +
          ' : </label><input id="form_sup3' +
          i +
          '" type="number"  min="1" max="' +
          exercice[i].besoinFormulaire3Numerique[1] +
          '"></div>'
      } else {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_sup3' +
          i +
          '">' +
          exercice[i].besoinFormulaire3Numerique[0] +
          ' : </label><input id="form_sup3' +
          i +
          '" type="number"  min="1" max="' +
          exercice[i].besoinFormulaire3Numerique[1] +
          '"></div>'
      }
    }

    if (exercice[i].besoinFormulaire3Texte) {
      // Création d'un formulaire texte
      const paramTooltip = exercice[i].besoinFormulaire3Texte[1] ? `data-tooltip="${exercice[i].besoinFormulaire3Texte[1]}"` : ''
      divParametresGeneraux.innerHTML += `<div><label for='form_sup3${i}'> ${exercice[i].besoinFormulaire3Texte[0]} : </label>
                    <div style='display: inline' ${paramTooltip} data-inverted=''>
                    <input id='form_sup3${i}' type='text' size='20' ></div></div>`
    }

    if (exercice[i].besoinFormulaire4CaseACocher) {
      // Création d'un formulaire texte
      divParametresGeneraux.innerHTML +=
        "<div><label for='form_sup4" +
        i +
        "'>" +
        exercice[i].besoinFormulaire4CaseACocher[0] +
        " : </label><input id='form_sup4" +
        i +
        "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoinFormulaire4Numerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoinFormulaire4Numerique[2]) {
        // Si un tooltip est défini
        divParametresGeneraux.innerHTML +=
          '<div data-tooltip="' +
          exercice[i].besoinFormulaire4Numerique[2] +
          '"" data-inverted="" data-position="top left"><label for="form_sup4' +
          i +
          '">' +
          exercice[i].besoinFormulaire4Numerique[0] +
          ' : </label><input id="form_sup4' +
          i +
          '" type="number"  min="1" max="' +
          exercice[i].besoinFormulaire4Numerique[1] +
          '"></div>'
      } else {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_sup4' +
          i +
          '">' +
          exercice[i].besoinFormulaire4Numerique[0] +
          ' : </label><input id="form_sup4' +
          i +
          '" type="number"  min="1" max="' +
          exercice[i].besoinFormulaire4Numerique[1] +
          '"></div>'
      }
    }

    if (exercice[i].besoinFormulaire4Texte) {
      // Création d'un formulaire texte
      const paramTooltip = exercice[i].besoinFormulaire4Texte[1] ? `data-tooltip="${exercice[i].besoinFormulaire4Texte[1]}"` : ''
      divParametresGeneraux.innerHTML += `<div><label for='form_sup4${i}'> ${exercice[i].besoinFormulaire4Texte[0]} : </label>
                    <div style='display: inline' ${paramTooltip} data-inverted=''>
                    <input id='form_sup4${i}' type='text' size='20' ></div></div>`
    }
  }

  for (let i = 0; i < exercice.length; i++) {
    if (!context.isHtml && !context.isAmc && !context.isAlc) {
      // Les paramètres à ne gérer que pour la version LaTeX
      // Gestion de la consigne
      if (exercice[i].consigneModifiable) {
        formConsigne[i] = document.getElementById('form_consigne' + i)
        formConsigne[i].value = exercice[i].consigne // Rempli le formulaire avec la consigne
        formConsigne[i].addEventListener('change', function (e) {
          // Dès que le texte change, on met à jour
          exercice[i].consigne = e.target.value
          miseAJourDuCode()
        })
      }

      // Gestion de la correction détaillée
      if (exercice[i].correctionDetailleeDisponible) {
        formCorrectionDetaillee[i] = document.getElementById('form_correctionDetaillee' + i)
        formCorrectionDetaillee[i].checked = exercice[i].correctionDetaillee // Rempli le formulaire avec la valeur par défaut
        formCorrectionDetaillee[i].addEventListener('change', function (e) {
          // Dès que le statut change, on met à jour
          exercice[i].correctionDetaillee = e.target.checked
          miseAJourDuCode()
        })
      }

      // Gestion de la correction masquée
      formCorrectionIsCachee[i] = document.getElementById('form_correctionCachee' + i)
      if (formCorrectionIsCachee[i]) {
        formCorrectionIsCachee[i].addEventListener('change', function (e) {
          // Dès que le statut change, on met à jour
          exercice[i].correctionIsCachee = e.target.checked
          context.seedSpecial = e.target.checked && context.isHtml
          miseAJourDuCode()
        })
      }

      // Gestion du nombre de colonnes
      if (exercice[i].nbColsModifiable) {
        formNbCols[i] = document.getElementById('form_nbCols' + i)
        formNbCols[i].value = exercice[i].nbCols // Rempli le formulaire avec le nombre de colonnes
        formNbCols[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].nbCols = e.target.value
          miseAJourDuCode()
        })
      }

      // Gestion du nombre de colonnes dans la correction
      if (exercice[i].nbColsCorrModifiable) {
        formNbColsCorr[i] = document.getElementById('form_nbColsCorr' + i)
        formNbColsCorr[i].value = exercice[i].nbColsCorr // Rempli le formulaire avec le nombre de colonnes de la correction
        formNbColsCorr[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].nbColsCorr = e.target.value
          miseAJourDuCode()
        })
      }

      // Gestion de l'espacement
      if (exercice[i].spacingModifiable) {
        formSpacing[i] = document.getElementById('form_spacing' + i)
        formSpacing[i].value = exercice[i].spacing // Rempli le formulaire avec le nombre de colonnes de la correction
        formSpacing[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].spacing = e.target.value
          miseAJourDuCode()
        })
      }

      // Gestion de l'espacement dans la correction
      if (exercice[i].spacingCorrModifiable) {
        formSpacingCorr[i] = document.getElementById('form_spacingCorr' + i)
        formSpacingCorr[i].value = exercice[i].spacingCorr // Rempli le formulaire avec le nombre de colonnes de la correction
        formSpacingCorr[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].spacingCorr = e.target.value
          miseAJourDuCode()
        })
      }

      // Gestion de la suppression de la correction
      const formCorrectionAffichee = document.getElementById('supprimer_correction')
      formCorrectionAffichee.addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        miseAJourDuCode()
      })

      // Gestion du mode N&B pour les remplissages
      const formModeNB = document.getElementById('ModeNB')
      formModeNB.addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        if ($('#ModeNB:checked').val()) {
          context.sortieNB = true
        } else {
          context.sortieNB = false
        }
        miseAJourDuCode()
      })

      // Gestion de la suppression des identifiants
      const formSupprimerReference = document.getElementById('supprimer_reference')
      formSupprimerReference.addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        // nouvelles_donnees();
        miseAJourDuCode()
      })

      // Gestion du changement de style
      const btnRadioStyleClassique = document.getElementById('style_classique')
      btnRadioStyleClassique.addEventListener('change', () => {
        if ($('#entete_du_fichier').val() === '' || $('#entete_du_fichier').val() === 'Course aux nombres') {
          $('#entete_du_fichier').val('Exercices')
        }
        miseAJourDuCode()
      })
      const btnRadioStyleCan = document.getElementById('style_can')
      btnRadioStyleCan.addEventListener('change', () => {
        if ($('#entete_du_fichier').val() === '' || $('#entete_du_fichier').val() === 'Exercices') {
          $('#entete_du_fichier').val('Course aux nombres')
        }
        miseAJourDuCode()
      })
      const btnRadioStyleCoopMaths = document.getElementById('style_CoopMaths')
      btnRadioStyleCoopMaths.addEventListener('change', () => {
        if ($('#entete_du_fichier').val() === '' || $('#entete_du_fichier').val() === 'Course aux nombres') {
          $('#entete_du_fichier').val('Exercices')
        }
        miseAJourDuCode()
      })
    }

    // Gestion du nombre de questions
    if (exercice[i].nbQuestionsModifiable) {
      formNbQuestions[i] = document.getElementById('formNbQuestionsParGroupe' + i)
      formNbQuestions[i].value = exercice[i].nbQuestions // Rempli le formulaire avec le nombre de questions
      formNbQuestions[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].nbQuestions = parseInt(e.target.value)
        miseAJourDuCode()
      })
    }

    // Gestion de la vidéo
    if (context.isHtml) {
      if (document.getElementById('form_video' + i)) {
        formVideo[i] = document.getElementById('form_video' + i)
        formVideo[i].value = exercice[i].video // Rempli le formulaire
        formVideo[i].addEventListener('change', function (e) {
          // Dès que ça change, on met à jour
          exercice[i].video = e.target.value
          miseAJourDuCode()
        })
      }
    }

    // Gestion de la correction détaillée
    if (exercice[i].correctionDetailleeDisponible) {
      formCorrectionDetaillee[i] = document.getElementById('form_correctionDetaillee' + i)
      formCorrectionDetaillee[i].checked = exercice[i].correctionDetaillee // Rempli le formulaire avec la valeur par défaut
      formCorrectionDetaillee[i].addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        exercice[i].correctionDetaillee = e.target.checked
        miseAJourDuCode()
      })
    }
    // Gestion de la correction masquée
    formCorrectionIsCachee[i] = document.getElementById('form_correctionCachee' + i)
    if (formCorrectionIsCachee[i]) {
      formCorrectionIsCachee[i].addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        exercice[i].correctionIsCachee = e.target.checked
        context.seedSpecial = e.target.checked && context.isHtml
        miseAJourDuCode()
      })
    }

    // Gestion du mode interactif
    if (exercice[i].interactifReady && !exercice[i].interactifObligatoire) {
      // Pour un exercice qui n'a que la version QCM, pas de menu
      formInteractif[i] = document.getElementById('formInteractif' + i)
      if (formInteractif[i]) {
        formInteractif[i].checked = exercice[i].interactif // Rempli le formulaire avec la valeur par défaut
        formInteractif[i].addEventListener('change', function (e) {
          // Dès que le statut change, on met à jour
          exercice[i].interactif = e.target.checked
          miseAJourDuCode()
        })
      }
    }
    // Gestion de l'identifiant de la série
    if (exercice.length > 0) {
      const formSerie = document.getElementById('form_serie')
      formSerie.value = context.graine // Rempli le formulaire avec la graine
      formSerie.addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        context.graine = e.target.value
        miseAJourDuCode()
      })
    }

    // Gestion des paramètres supplémentaires s'ils existent

    if (exercice[i].besoinFormulaireTexte) {
      formSup[i] = document.getElementById('form_sup' + i)
      formSup[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup = e.target.value // Récupère  la saisie de l'utilisateur
          miseAJourDuCode()
        }
      })

      formSup[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup = e.target.value
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoin_formulaire_long_texte) {
      formSup[i] = document.getElementById('form_sup' + i)
      formSup[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup = e.target.value // Récupère  la saisie de l'utilisateur
          miseAJourDuCode()
        }
      })

      formSup[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup = e.target.value
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaireNumerique) {
      const max = exercice[i].besoinFormulaireNumerique[1]
      formSup[i] = document.getElementById('form_sup' + i)
      formSup[i].value = contraindreValeur(1, max, exercice[i].sup) // Rempli le formulaire avec le paramètre supplémentaire
      formSup[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup = contraindreValeur(1, max, Number(e.target.value))
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaireCaseACocher) {
      formSup[i] = document.getElementById('form_sup' + i)
      formSup[i].checked = exercice[i].sup // Rempli le formulaire avec le paramètre supplémentaire
      formSup[i].addEventListener('change', function (e) {
        //
        exercice[i].sup = e.target.checked
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire2CaseACocher) {
      formSup2[i] = document.getElementById('form_sup2' + i)
      formSup2[i].checked = exercice[i].sup2 // Rempli le formulaire avec le paramètre supplémentaire
      formSup2[i].addEventListener('change', function (e) {
        //
        exercice[i].sup2 = e.target.checked
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire2Numerique) {
      const max = exercice[i].besoinFormulaire2Numerique[1]
      formSup2[i] = document.getElementById('form_sup2' + i)
      formSup2[i].value = contraindreValeur(1, max, exercice[i].sup2) // Rempli le formulaire avec le paramètre supplémentaire
      formSup2[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup2 = contraindreValeur(1, max, Number(e.target.value))
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire2Texte) {
      formSup2[i] = document.getElementById('form_sup2' + i)
      formSup2[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup2 = e.target.value // Récupère  la saisie de l'utilisateur
          miseAJourDuCode()
        }
      })

      formSup2[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup2 = e.target.value
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire3CaseACocher) {
      formSup3[i] = document.getElementById('form_sup3' + i)
      formSup3[i].checked = exercice[i].sup3 // Rempli le formulaire avec le paramètre supplémentaire
      formSup3[i].addEventListener('change', function (e) {
        //
        exercice[i].sup3 = e.target.checked
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire3Numerique) {
      const max = exercice[i].besoinFormulaire3Numerique[1]
      formSup3[i] = document.getElementById('form_sup3' + i)
      formSup3[i].value = contraindreValeur(1, max, exercice[i].sup3) // Rempli le formulaire avec le paramètre supplémentaire
      formSup3[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup3 = contraindreValeur(1, max, Number(e.target.value))
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire3Texte) {
      formSup3[i] = document.getElementById('form_sup3' + i)
      formSup3[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup3 = e.target.value // Récupère  la saisie de l'utilisateur
          miseAJourDuCode()
        }
      })

      formSup3[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup3 = e.target.value
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire4CaseACocher) {
      formSup4[i] = document.getElementById('form_sup4' + i)
      formSup4[i].checked = exercice[i].sup4 // Rempli le formulaire avec le paramètre supplémentaire
      formSup4[i].addEventListener('change', function (e) {
        //
        exercice[i].sup4 = e.target.checked
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire4Numerique) {
      const max = exercice[i].besoinFormulaire4Numerique[1]
      formSup4[i] = document.getElementById('form_sup4' + i)
      formSup4[i].value = contraindreValeur(1, max, exercice[i].sup4) // Rempli le formulaire avec le paramètre supplémentaire
      formSup4[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup4 = contraindreValeur(1, max, Number(e.target.value))
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire4Texte) {
      formSup4[i] = document.getElementById('form_sup4' + i)
      formSup4[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup4 = e.target.value // Récupère  la saisie de l'utilisateur
          miseAJourDuCode()
        }
      })

      formSup4[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup4 = e.target.value
        miseAJourDuCode()
      })
    }
  }
}

// Initialisation de la page
document.addEventListener('DOMContentLoaded', async () => {
  // On force la réactualisation dela page quand l'utilisateur utilise les boutons précédent ou suivant de son navigateur
  function urlToListeDesExercices () {
    // Récupère la graine pour l'aléatoire dans l'URL
    const params = new URL(document.location).searchParams
    const serie = params.get('serie')
    if (serie) {
      context.graine = serie
    }
    const vue = params.get('v')
    if (vue) {
      context.vue = vue
    }
    if (params.get('duree')) {
      context.duree = params.get('duree')
    }
    const urlVars = getUrlVars()
    listeDesExercices = []
    if (urlVars.length > 0) {
      for (let i = 0; i < urlVars.length; i++) {
        listeDesExercices.push(urlVars[i].id)
      }
      const formChoixDesExercices = document.getElementById('choix_des_exercices')
      if (formChoixDesExercices !== null) {
        formChoixDesExercices.value = listeDesExercices.join(',')
        copierExercicesFormVersAffichage(listeDesExercices)
      }
      miseAJourDeLaListeDesExercices()
    }
  }
  // À l'appui sur précédent ou suivant, on relance l'analyse de l'URL
  window.onpopstate = function () {
    urlToListeDesExercices()
  }
  await initDom()
  // Gestion des paramètres
  div = document.getElementById('div_codeLatex') // Récupère le div dans lequel le code va être affiché
  divParametresGeneraux = document.getElementById('parametres_generaux') // Récupère le div dans lequel seront inscrit les paramètres

  // gestion de la vue
  // si dans l'url il y a un paramètre &v=... on modifie le DOM et/ou le CSS
  gestionVue()
  if ((context.vue !== 'recto' && context.vue !== 'verso') || (!context.vue)) {
    gestionScores()
  } else {
    console.log('Gestion des scores non gérée')
  }
  if (context.isAmc) {
    if (urlParams.get('e')) {
      typeEntete = urlParams.get('e')
    } else {
      typeEntete = 'AMCcodeGrid'
    }
    if (urlParams.get('f')) {
      format = urlParams.get('f')
    } else {
      format = 'A4'
    }
  }
  // Mise à jour du formulaire (gestion de l'evenement "change" du formulaire de la liste des exercices activé lors :
  //  * du chargement
  //  * de l'ajout d'un exercice (click sur le lien)
  //  * du déplacement, suppression d'un exercice (manipulation des étiquettes et ou utilisation des icones.
  // A la fin appel de la fonction miseAJourDeLaListeDesExercices() => pour l'affichage des exercices choisis.
  const formChoixDesExercices = document.getElementById('choix_des_exercices')
  if (formChoixDesExercices !== null) {
    formChoixDesExercices.addEventListener('change', function (e) {
    // Changement du texte
      if (e.target.value === '') {
        listeDesExercices = []
        listeObjetsExercice = []
      } else {
        listeDesExercices = []
        listeObjetsExercice = []
        listeDesExercices = e.target.value.replace(/\s/g, '').replace(';', ',').split(',') // Récupère  la saisie de l'utilisateur
      // en supprimant les espaces et en remplaçant les points-virgules par des virgules.
      }
      if (document.getElementById('affichageErreur')) {
        document.getElementById('affichageErreur').remove()
      }
      copierExercicesFormVersAffichage(listeDesExercices)
      miseAJourDeLaListeDesExercices()
    })
  }

  if (document.getElementById('choix_exercices_div')) {
  // On cache le formulaire pour les feuilles qui ont les étiquettes.
    $('#choix_des_exercices').parent().hide()
  }

  // pour ne pas déclencher la gestion des evenemet sur les pages qui n'ont pas la div choix d'exercice.
  if (document.getElementById('choix_exercices_div')) {
    ajoutHandlersEtiquetteExo()
  }

  await menuDesExercicesDisponibles()
  // gestion des filtres :
  //  au chargement de la page on vérifie s'il y a un filtre dans l'url si c'est le cas on selectionne le filtre dans la page html.
  //  gestion d'evenement sur le "select" filtre. Au changement on place la valeur dans l'url et on relance le calcul des exercices à afficher.
  if (document.getElementById('filtre')) {
    const filtre = getFilterFromUrl()
    if (filtre) {
      document.getElementById('filtre').value = filtre
    }
    document.getElementById('filtre').addEventListener('change', function () {
      // gestion du changement du select.
      const searchParams = new URLSearchParams(window.location.search)
      const newFiltre = document.getElementById('filtre').value
      searchParams.set('filtre', newFiltre)
      const newParams = searchParams.toString()
      const url = window.location.href.split('?')[0] + '?' + decodeURIComponent(newParams)
      let modeTableauActif = false // Gestion pour le mode tableau particulière pour gérer l'activation de "datatable"
      window.history.replaceState('', '', url)
      if ($('#mode_choix_liste').is(':visible')) {
        $('#mode_choix_liste').trigger('click')
        modeTableauActif = true
      }
      menuDesExercicesDisponibles() // Calcul de la liste des exercices à afficher.
      if (modeTableauActif) {
        $('#mode_choix_tableau').trigger('click')
      }
      $('.ui.dropdown').dropdown() // Pour le menu des exercices, mise à jour des "accordion"
      $('.ui.accordion').accordion('refresh')
      $('.ui.checkbox').checkbox()
    })
  }
  $('.ui.dropdown').dropdown() // Pour le menu des exercices
  $('.ui.accordion').accordion('refresh')
  $('.ui.checkbox').checkbox()
  // Gestion du bouton de copie
  $('.ui.button.toggle').state() // initialise le bouton

  // Gestion du bouton « Nouvelles données »
  const btnMiseAJourCode = document.getElementById('btn_mise_a_jour_code')
  if (btnMiseAJourCode) {
    btnMiseAJourCode.addEventListener('click', () => {
      nouvellesDonnees()
      // Cache la correction et les paramètres au clic sur "Nouvelles données"
      $('#affichage_exercices > .ui.accordion').accordion('close', 0)
    })
  }
  function nouvellesDonnees () {
    context.graine = strRandom({
      includeUpperCase: true,
      includeNumbers: true,
      length: 4,
      startsWithLowerCase: false
    })
    if (document.getElementById('form_serie')) {
      document.getElementById('form_serie').value = context.graine // mise à jour du formulaire
    }
    context.aGarderDansHistorique = true
    // Dans l'historique du navigateur, tous les changements d'URL sont consignés
    // Mais pour l'historique de navigation, on ne garde que les appuis sur Nouvelles Données
    miseAJourDuCode()
  }

  if (context.isHtml) {
    // gestion du bouton de zoom
    $('#btn_zoom_plus').click(function () {
      context.zoom = arrondi(Number(context.zoom) + 0.2)
      zoomAffichage(context.zoom)
      window.history.replaceState('', '', getUrlSearch())
    })
    $('#btn_zoom_moins').click(function () {
      if (Number(context.zoom > 0.5)) {
        context.zoom = arrondi(Number(context.zoom) - 0.2)
        zoomAffichage(context.zoom)
        window.history.replaceState('', '', getUrlSearch())
      }
    })
  }

  // Gestion de la redirection vers MathaleaLaTeX
  $('#btnLaTeX').click(function () {
    if (window.location.href.includes('v=')) {
      context.vue = 'latex'
      window.location.href = getUrlSearch()
    } else {
      window.location.href += '&v=latex'
    }
  })

  if (context.isAmc) {
    // Gestion des cases à cocher sur le format de l'évaluation (taille de la page, entête) pour AMC
    const formNbExemplaires = document.getElementById('nombre_d_exemplaires')
    formNbExemplaires.value = 1 // Rempli le formulaire avec le nombre de questions
    formNbExemplaires.addEventListener('change', function (e) {
      // Dès que le nombre change, on met à jour
      if (typeEntete === 'AMCassociation') {
        nbExemplaires = 1
        formNbExemplaires.value = 1
      } else {
        nbExemplaires = e.target.value
      }
      miseAJourDuCode()
    })
    // Gestion des paramètres du fichier LaTeX
    // gestion de l'entête
    const formEntete = document.getElementById('options_type_entete')
    if (urlParams.get('e')) {
      formEntete.value = urlParams.get('e')
      $('#type_AMCcodeGrid').attr('checked', false)
      $('#type_champnom').attr('checked', false)
      $('#type_AMCassociation').attr('checked', false)
      $('#type_AMCcodeGrid').hide()
      $('#type_champnom').hide()
      $('#type_AMCassociation').hide()
      $(`#type_${urlParams.get('e')}`).attr('checked', true)
      $(`#type_${urlParams.get('e')}`).show()
    } else {
      formEntete.value = 'AMCcodeGrid'
      $('#type_AMCcodeGrid').show()
      $('#type_champnom').hide()
      $('#type_AMCassociation').hide()
    }
    formEntete.addEventListener('change', function (e) {
      typeEntete = e.target.value
      if (typeEntete === 'AMCassociation') {
        nbExemplaires = 1
        formNbExemplaires.value = 1
      }
      miseAJourDuCode()
    })

    // gestion du format
    const formFormat = document.getElementById('options_format')
    if (urlParams.get('f')) {
      formFormat.value = urlParams.get('f')
      $('#format_A4').attr('checked', false)
      $('#format_A3').attr('checked', true)
    } else {
      formFormat.value = 'A4'
      $('#format_A4').show()
      $('#format_A3').hide()
    }
    formFormat.addEventListener('change', function (e) {
      format = e.target.value
      miseAJourDuCode()
    })

    const formNbQuestionsParGroupe = document.getElementById('nbQuestions_par_groupe')
    formNbQuestionsParGroupe.value = []
    formNbQuestionsParGroupe.addEventListener('change', function (e) {
      const saisie = e.target.value
      nbQuestions = saisie.split(',')
      miseAJourDuCode()
    })
  }

  if (context.isAlc) {
    $('#alcSelectLignes').on('click', function (e) {
      if ($(e.target).is(':checked')) {
        $('.checkeval').prop('checked', true)
      } else {
        $('.checkeval').prop('checked', false)
      }
    })

    $('#paramVisu').on('click', function () {
      if ($('#paramVisu').hasClass('up')) {
        $('#parametresExercice').hide()
        $('#paramVisu').removeClass('up')
        $('#paramVisu').addClass('down')
      } else {
        $('#parametresExercice').show()
        $('#paramVisu').removeClass('down')
        $('#paramVisu').addClass('up')
      }
    })

    $('#ajoutetiquette').on('click', function (e) {
      if ($('.exercice0').html()) {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const ex = urlParams.get('ex')
        const tooltip = $('.exercice0').html().substr(15)
        const tagexercices = `<div class="choix_exo sortable" data-tooltip="${tooltip}"><span contenteditable="true" class="choix_exercices valide">${ex}</span></div>`
        $('#choix_exercices_dispos span.choix_exercices:last-child:last').before(tagexercices)
        ajoutHandlersEtiquetteExo()
      }
    })

    $('#ajoutetiquettecoche').on('click', function (e) {
      if ($('.exercice0').html()) {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const ex = urlParams.get('ex')
        const tooltip = $('.exercice0').html().substr(15)
        const tagexercices = `<div class="choix_exo sortable" data-tooltip="${tooltip}"><span contenteditable="true" class="choix_exercices valide">${ex}</span></div>`
        const checkboxes = $('.checkeval')
        for (let i = 0; i < checkboxes.length; i++) {
          if ($(checkboxes[i]).is(':checked')) {
            $(checkboxes[i]).next().next().next().children().last().before(tagexercices)
          }
        }
        $('#choix_exercices_dispos span.choix_exercices:last-child:last').before(tagexercices)
        ajoutHandlersEtiquetteExo()
      }
    })

    function ajoutHandlersTrash () {
      $('.supprexoligne').off('click')
        .on('click', function (e) {
          $(e.target).parent().remove()
        })
    }

    function handlerAjoutDansLigne () {
      $('.ajoutexoligne').off('click')
        .on('click', function (e) {
          const tagexercices = $('.exoSelectionne').parent().html()
          $(this).next().next().children().last().before(tagexercices)
          $('.exoSelectionne').removeClass('exoSelectionne')
          ajoutHandlersTrash()
          ajoutHandlersEtiquetteExo()
        })
    }

    $('#ajoutexoselection').on('click', function (e) {
      const tagexercices = $('.exoSelectionne').parent().html()
      const checkboxes = $('.checkeval')
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(':checked')) {
          $(checkboxes[i]).next().next().next().children().last().before(tagexercices)
        }
      }
      $('.exoSelectionne').removeClass('exoSelectionne')
      ajoutHandlersEtiquetteExo()
    })

    function ligneExercices (objligne) {
      const nomCopie = objligne && objligne.nomCopie ? objligne.nomCopie : ''
      let items = ''
      if (objligne && objligne.items) {
        const listeItems = objligne.items.split(';')
        for (let i = 0; i < listeItems.length; i++) {
          if (i === listeItems.length - 1) {
            items += `<span contenteditable="true" class="choix_exercices valide">${listeItems[i]}</span><span contenteditable="true" class="choix_exercices"><br></span>`
          } else {
            items += `<span contenteditable="true" class="choix_exercices valide">${listeItems[i]}</span>`
          }
        }
      } else {
        items = '<span contenteditable="true" class="choix_exercices"><br></span>'
      }
      return `<div class="evalelem"><input type="checkbox" class="checkeval"><i class="sign-in icon ajoutexoligne"></i><input type="text" style="width:70px" data-tooltip="Nom qui apparaîtra sur la copie." value="${nomCopie}">
      <div id="choix_exercices_div" style="width:65%" data-tooltip="Identifiants des exercices" ><div class="choix_exo sortable">${items}</div></div><i class="trash alternate outline icon supprexoligne"></i></div>`
    }

    $('#ajoutligne').on('click', function (e) {
      $('#listeEval').append(ligneExercices())
      handlerAjoutDansLigne()
      ajoutHandlersEtiquetteExo()
      ajoutHandlersTrash()
    })

    handlerAjoutDansLigne()
    ajoutHandlersTrash()

    let codeLatex; let codeLatexCorr; let tableauDeDemandes; const objetContenu = []; const objetContenuCorrection = []
    const listeDesExercicesDemandes = []; let contenuFichier = ''; const listeObjetsExercice = {}; let messageErreur = ''

    /**
    * Récupère le texte saisi pour le transformer en tableau de tableaux.
    * Premier séparateur le saut de ligne ; deuxième séparateur le point-virgule.
    *
    * @author Rémi Angot
    * utilisé pour le chargement d'un fichier sauvegardé et pour le lien avec sacoche.
    */
    function textareaToArray (textareaIdTextarea) {
      const text = textareaIdTextarea.val()
      const tableau = text.split('\n')
      tableau.forEach(function (ligne, i) {
        tableau[i] = ligne.split(';')
      })
      return tableau
    }

    /**
    * Transforme le texte saisi par l'utilisateur en un dictionnaire avec l'id des exercices et les éventuels paramètres (sup, sup2, nbQuestions)
    *
    * txtToObjetParametresExercice('6C10,sup=false,nbQuestions=5')
    * {id: "6C10", sup: false, nbQuestions: 5}
    * @author Rémi Angot
    */
    function txtToObjetParametresExercice (txt) {
      const CleValeur = txt.split(',')
      const ObjetParametres = {}
      ObjetParametres.id = CleValeur[0] // Récupère le premier élément qui est forcément l'id
      CleValeur.shift() // Retire ce premier élément
      if (CleValeur.length > 0) {
        for (const i in CleValeur) {
          CleValeur[i] = CleValeur[i].split('=')
          // change le type de ce qui ne doit pas être un string
          if (CleValeur[i][1] === 'true' || CleValeur[i][1] === 'false') { // "true"=>true
            ObjetParametres[CleValeur[i][0]] = (CleValeur[i][1] === 'true')
          } else if (!isNaN(CleValeur[i][1])) { // "17"=>17
            ObjetParametres[CleValeur[i][0]] = parseInt(CleValeur[i][1])
          } else {
            ObjetParametres[CleValeur[i][0]] = CleValeur[i][1]
          }
        }
      }
      return ObjetParametres
    }

    /**
    * Met à jour le code LaTeX à partir de l'identifiant d'un exercice.
    *
    * On regarde d'abord si un exercice aléatoire a le même identifiant.
    *
    * @author Rémi Angot
    */
    function itemToContenu (txt) {
      // De préférence un exercice aléatoire
      const dictionnaire = txtToObjetParametresExercice(txt)
      const e = dictionnaire.id
      const idExerciceMathALEA = e.replace('MATHS', '').replace(/\./g, '').replace(/ /g, '')
      // Pour faire la correspondance entre SACoche et MathALEA, on supprime 'MATHS' et tous les points dans les noms des id
      if (idExerciceMathALEA in listeObjetsExercice) {
        const exerciceAleatoire = listeObjetsExercice[idExerciceMathALEA]
        // Les paramètres peuvent être saisies de manière longue (nb_questions, sup, sup2, sup3) ou de manière courte (n, s, s2, s3)
        if (dictionnaire.sup) {
          exerciceAleatoire.sup = dictionnaire.sup
        }
        if (dictionnaire.s) {
          exerciceAleatoire.sup = dictionnaire.s
        }
        if (dictionnaire.sup2) {
          exerciceAleatoire.sup2 = dictionnaire.sup2
        }
        if (dictionnaire.s2) {
          exerciceAleatoire.sup2 = dictionnaire.s2
        }
        if (dictionnaire.sup3) {
          exerciceAleatoire.sup3 = dictionnaire.sup3
        }
        if (dictionnaire.s3) {
          exerciceAleatoire.sup3 = dictionnaire.s3
        }
        if (dictionnaire.nb_questions) {
          exerciceAleatoire.nbQuestions = dictionnaire.nb_questions
        }
        if (dictionnaire.n) {
          exerciceAleatoire.nbQuestions = dictionnaire.n
        }
        exerciceAleatoire.id = idExerciceMathALEA
        exerciceAleatoire.nouvelleVersion()
        codeLatex += `\n\n%%% ${e} : Exercice aléatoire - ${exerciceAleatoire.titre}%%%\n\n`
        codeLatex += exerciceAleatoire.contenu + '\n\n'
        codeLatexCorr += exerciceAleatoire.correctionIsCachee ? 'Correction masquée' : exerciceAleatoire.contenuCorrection + '\n\n'

        if (typeof exerciceAleatoire.listePackages === 'string') {
          listePackages.add(exerciceAleatoire.listePackages)
        } else { // si c'est un tableau
          exerciceAleatoire.listePackages.forEach(listePackages.add, listePackages)
        }

        // Sinon un exercice statique si le nom de l'item est inclus dans le nom du répertoire
      } else {
        // Si l'identifiant de l'exercice n'est disponible ni sur MathALEA ni dans la liste statique des url tableauUrlTex
        codeLatex += `\n\n%%% Pas d'exercice disponible pour ${e}.\n\n`
        updateMessageErreur(`Pas d'exercice disponible pour ${e}.\n`)
      }
    }

    /**
    * Met à jour le message d'erreur en évitant les doublons.
    *
    * @author Rémi Angot
    */
    function updateMessageErreur (text) {
      if (messageErreur.indexOf(text) === -1) {
        messageErreur += text
      }
    }

    jQuery.ajaxSetup({ async: false }) // Tout le traitement se fait de manière synchrone.
    // On attend le résultat des requetes url vers les fichiers statiques pour bien avoir les exercices dans l'ordre
    $('.ui.checkbox').checkbox()
    $('.ui.radio.checkbox').checkbox() // active les boutons radio (pour le style)
    $('#reglages_sortie_LaTeX').hide()

    // On garde le système avec textarea, cela permet de rester compatible avec les anciens formats et avec ce qui provient de sacoche.
    // Pour éviter deux traitemets (un depuis la sauvegarde et un second depuis l'interface, création de deux fonctions qui permettent de
    // synchroniser un textarea caché et l'affichage.

    function affichageVersTextarea () {
      const lignesExos = $('.evalelem')
      let textareaContent = ''
      for (let i = 1; i < lignesExos.length; i++) {
        const listeExosLigne = $(lignesExos[i]).find('span.valide')
        let ligne = $(lignesExos[i]).find('input')[1].value + ';'
        for (let j = 0; j < listeExosLigne.length; j++) {
          if (j === listeExosLigne.length - 1) {
            ligne += listeExosLigne[j].innerText
          } else {
            ligne += listeExosLigne[j].innerText + ';'
          }
        }
        if (i === lignesExos.length - 1) {
          textareaContent += ligne
        } else {
          textareaContent += ligne + '\n'
        }
      }
      $('#textareaIdItems').val(textareaContent)
    }

    function TextareaVersAffichage (fileContent) { // Fonction utilisée au chargement d'un fichier et pour l'interface avec SACoche.
      // Cas particuliers à gérer :
      //  anciens fichiers : formats (nom;prenom;items) ou (nom;items) ou (items)
      //  venant de SACoche
      //  uniquement des noms d'élèves
      let listeExos = fileContent || document.getElementById('textareaIdItems').value
      listeExos = listeExos.replace('MATHS', '').replace(/\./g, '').replace(/ /g, '')
      // Pour faire la correspondance entre SACoche et MathALEA, on supprime 'MATHS' et tous les points dans les noms des id
      let listeLignes = []
      if (listeExos.indexOf('\r\n') >= 0) {
        listeLignes = listeExos.split('\r\n')
      } else {
        listeLignes = listeExos.split('\n')
      }
      let itemListe = []
      const listeCodesExercices = Object.keys(dictionnaireDesExercices)
      let casFormat = 2
      let items = ''
      let nomCopie = ''
      for (let i = 0; i < listeLignes.length; i++) {
        itemListe = listeLignes[i].split(';')
        let itemId = []
        if (i === 0) {
          for (let j = 0; j < 2; j++) {
          // Pour la première ligne on regarde si l'item0 ; item1 ou item2 est un exercice valide, sinon on suppose que c'est un nom élève.
            if (itemListe.length > 1) {
              if (itemListe[j]) {
                itemId = itemListe[j].split(',')[0]
                if (listeCodesExercices.indexOf(itemId[0]) < 0) {
                  casFormat = j
                }
              }
            }
          }
        }
        if (casFormat === 0) {
          ligneExercices({ items: itemListe })
        } else {
          items = ''
          for (let j = casFormat; j < itemListe.length; j++) {
            if (j === itemListe.length - 1) {
              items += itemListe[j]
            } else {
              items += itemListe[j] + ';'
            }
          }
          if (casFormat === 1 || !itemListe[1]) {
            nomCopie = itemListe[0]
          } else {
            nomCopie = itemListe[0] + ' ' + itemListe[1]
          }
          $('#listeEval').append(ligneExercices({
            nomCopie: nomCopie,
            items: items
          }))
        }
      }
    }

    $('#enregistrer').click(function () {
      affichageVersTextarea()
      const blob = new window.Blob([$('#textareaIdItems').val()], { type: 'application/octet-stream' })
      const url = URL.createObjectURL(blob)
      const link = $('.download-link')
      link.attr('href', url)
      link.attr('download', 'alacarte.csv')
      link.get(0).click()
    })

    const fileReader = new window.FileReader()
    fileReader.onload = function (event) {
      TextareaVersAffichage(fileReader.result)
      handlerAjoutDansLigne()
      ajoutHandlersTrash()
    }

    document.getElementById('chargerALC').onchange = function (event) {
      fileReader.readAsText(event.target.files[0])
    }

    $('#btn1Question').click(function () {
      $('#listeEval').html('')
      $('#chargerALC').click()
    })

    $('#valider').click(function () {
      // Affichage des paramètres pour créer le pdf via overleaf.
      $('#div_codeLatex').html(' ')
      codeLatex = ''
      codeLatexCorr = ''
      messageErreur = ''
      affichageVersTextarea()
      tableauDeDemandes = textareaToArray($('#textareaIdItems'))
      const listeCodesExercices = Object.keys(dictionnaireDesExercices)
      tableauDeDemandes.forEach(function (ligne, numeroDeLigne) {
        // On créé un tableau pour chaque élève
        objetContenu[numeroDeLigne] = []
        objetContenuCorrection[numeroDeLigne] = []
        ligne.forEach(function (e, i) {
          if (i === 0) {
            objetContenu[numeroDeLigne][i] = enteteEleve(ligne[0])
            objetContenuCorrection[numeroDeLigne][i] = enteteEleve(ligne[0])
          }
          if (i > 0) {
            if (e.replace(/ /g, '').length > 2) {
              objetContenu[numeroDeLigne][i] = e
              objetContenuCorrection[numeroDeLigne][i] = e
              e = e.replace(/ /g, '')
              e = e.split(',')[0]
              e = e.replace('MATHS', '').replace(/\./g, '').replace(/ /g, '')
              if (listeCodesExercices.indexOf(e) > 0) {
                if (listeDesExercicesDemandes.indexOf(e) < 0) {
                  listeDesExercicesDemandes.push(e)
                }
              }
            }
          }
        })
      })

      const promises = []
      for (let i = 0, id; i < listeDesExercicesDemandes.length; i++) {
        id = listeDesExercicesDemandes[i]
        let url
        try {
          url = dictionnaireDesExercices[id].url
        } catch (error) {
          console.log(error)
        }
        // avec webpack on ne peut pas faire de import(url), car il faut lui indiquer quels fichiers sont susceptibles d'être chargés
        // ici il ne peut s'agir que de js contenus dans exercices (dnb déjà traité dans le if au dessus)
        const chunks = /^\/exercices\/(.*)/.exec(url)
        if (!chunks) throw Error(`url non prévue : ${url}`)
        const path = chunks[1]
        promises.push(
          // cf https://webpack.js.org/api/module-methods/#magic-comments
          import(/* webpackMode: "lazy" */ './exercices/' + path)
            .catch((error) => {
              console.log(error)
              listeObjetsExercice[id] = { titre: "Cet exercice n'existe pas", contenu: '', contenuCorrection: '' } // Un exercice vide pour l'exercice qui n'existe pas
            })
            .then(({ default: Exo }) => {
              listeObjetsExercice[id] = new Exo() // Ajoute l'objet dans la liste des
            })
        )
      }
      Promise.all(promises)
        .then(() => {
          tableauDeDemandes.forEach(function (ligne) {
            ligne.forEach(function (e, i) {
              if (i === 0) {
                codeLatex += enteteEleve(ligne[0])
                codeLatexCorr += enteteEleve(ligne[0])
              }
              if (i > 0) {
                if (e.replace(/ /g, '').length > 2) {
                  itemToContenu(e)
                }
              }
            })
          })

          if (messageErreur.length > 1) {
            window.alert(messageErreur)
          }
          // Affiche les boutons de compilation
          $('#reglages_sortie_LaTeX').show()
          // Affiche le code LaTeX
          $('#div_codeLatex').html('<pre><code class="language-latex">' + codeLatex + introCorrection +
                      codeLatexCorr + '</code></pre>')
        })
        .then(loadPrism)
        .then(() => {
          const div = document.getElementById('div_codeLatex')
          Prism.highlightAllUnder(div) // Met à jour la coloration syntaxique
        })
    })

    // Gestion du téléchargement

    $('#btn_telechargement').click(function () {
      creerFichier()

      if ($('#nom_du_fichier').val()) {
        telechargeFichier(contenuFichier, $('#nom_du_fichier').val() + '.tex')
      } else {
        telechargeFichier(contenuFichier, 'mathalea.tex')
      }
    })

    $('#btn_overleaf').click(function () {
      creerFichier()
      // Envoi à Overleaf.com en modifiant la valeur dans le formulaire
      $('input[name=encoded_snip]').val(encodeURIComponent(contenuFichier))
      if ($('#nom_du_fichier').val()) {
        $('input[name=snip_name]').val($('#nom_du_fichier').val()) // nomme le projet sur Overleaf
      }
    })

    // Gestion des paramètres du fichier LaTeX

    $('#options_style_CoopMaths').hide() // par défaut le style est classique donc on
    $('a.lien_images').hide() // cache les options du style Coop
    $(function () {
      $("input:radio[name='style']").change(function () {
        if ($('#style_classique:checked').val()) {
          $('#options_style_CoopMaths').hide()
          $('a.lien_preambule').attr('href', 'fichiers/preambule.tex')
          $('a.lien_images').hide()
        } else {
          $('a.lien_images').show()
          $('#options_style_CoopMaths').show()
          $('a.lien_preambule').attr('href', 'fichiers/preambule_coop.tex')
        }
      })
    })

    function creerFichier () {
      // Gestion du style pour l'entête du fichier
      if ($('#style_classique:checked').val()) {
        contenuFichier = introLatex($('#entete_du_fichier').val(), listePackages) + macroNomCopie() + codeLatex + introCorrection +
                codeLatexCorr + '\n\n\\end{document}'
      } else {
        contenuFichier = introLatexCoop(listePackages) + macroNomCopie('coop')
        contenuFichier += '\\begin{document}\n\n' + codeLatex + introCorrection +
                codeLatexCorr + '\n\n\\end{document}'
      }
    }

    // Gestion des en-têtes

    let counter = 'section'
    let enteteCorrection = ''
    if ($('#style_classique:checked').val()) {
      counter = 'exo'
      enteteCorrection = '\\fancyhead[C]{Correction}\n'
    }

    function enteteEleve (prenom = '', nom = '') {
      return `\n\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n
    \\newpage
    \\NomCopie{${prenom.toUpperCase()} ${nom.toUpperCase()}}
    \\bigskip
    `
    }

    const introCorrection = '\n%%%%%%%%%%%%%%%%\n%%%CORRECTION%%%\n%%%%%%%%%%%%%%%%' +
        `\n\n\\newpage\n${enteteCorrection}\\setcounter{${counter}}{0}\n\n`

    function macroNomCopie (style = 'classique') {
      if (style === 'classique') {
        return `\\newcommand\\NomCopie[1]{\\fancyhead[L]{#1}
            \\fancyhead[R]{${$('#entete_droit_du_fichier').val()}}
            \\setcounter{exo}{0}
        }\n\n`
      } else {
        return `\\newcommand\\NomCopie[1]{\\theme{${$('input[name=theme]:checked').val()}}{${$('#entete_du_fichier').val()}}{${$('#entete_droit_du_fichier').val()}}{#1}
        \\setcounter{section}{0}
        }\n\n`
      }
    }
  }

  // handlers pour la prévisualisation des exercices cg 04-20201
  function afficherPopup (exoId) {
    // lors du clic sur l'oeil, si la popup est affichée on la cache, sinon on ouvre la prévisulisation.
    if ($('.popuptext').is(':visible')) {
      $('.popuptext').empty()
      $('.popuptext').hide()
    } else {
      miseAJourDeLaListeDesExercices(exoId)
    }
  }

  $('.popup')
    .off('click')
    .on('click', function (e) {
      e.stopPropagation()
      afficherPopup($('.popup').attr('data-exoId'))
      $('.popup').attr('data-exoId', '')
    })

  $(document).click(function (e) {
    // On ferme la popup si au clic partout sur la feuille.
    if ($('.popuptext').is(':visible') || !$(e.target).hasClass('popup') || !$(e.target).hasClass('icone_preview')) {
      $('.popuptext').hide()
      $('.popuptext').empty()
      $('.icone_preview')
        .off('click')
        .on('click', function (e) {
          $('.popup').trigger('click')
        })
    }
  })

  // Gestion de l'évènement sur le click sur les flèches pour basculer les exercices en plein écran.
  $('#exo_plein_ecran').click(function (e) {
    if (context.vue && context.vue.substring(0, 3) === 'alc') {
      if ($('#exo_plein_ecran').hasClass('left')) {
        gestionVue('alcexEtChoix')
      } else {
        gestionVue('alcmenu')
      }
    } else {
      if ($('#exo_plein_ecran').hasClass('left')) {
        gestionVue('exEtChoix')
      } else {
        gestionVue('menu')
      }
    }
  })

  const buttonDiap = document.getElementById('buttonDiap')
  if (buttonDiap !== null) {
    buttonDiap.addEventListener('click', () => {
      // On s'assure qu'il y ait des questions avant de lancer un diaporama
      if (context.listeObjetsExercice && context.listeObjetsExercice.length > 0) goTabVue('diap')
    })
  }
  const btnPleinEcran = document.getElementById('buttonFullScreen')
  if (btnPleinEcran !== null) {
    btnPleinEcran.addEventListener('click', () => {
      goTabVue('light')
    })
  }
  const btnPleinEcran2 = document.getElementById('buttonFullScreen2')
  if (btnPleinEcran2 !== null) {
    btnPleinEcran2.addEventListener('click', () => {
      context.vue = 'ex'
      setUrlAndGo()
    })
  }
  const btnEdit = document.getElementById('buttonEdit')
  if (btnEdit !== null) {
    btnEdit.addEventListener('click', () => {
      context.vue = 'menu'
      setUrlAndGo()
    })
  }

  const btnSetDuree = document.getElementById('btnSetDuree')
  if (btnSetDuree !== null) {
    btnSetDuree.addEventListener('click', () => {
      modalTimer()
    })
  }
  const btnMulti = document.getElementById('btnMulti')
  if (btnMulti !== null) {
    btnMulti.addEventListener('click', () => {
      goTabVue('multi')
    })
  }
  const btnVueEmbed = document.getElementById('btnVueEmbed')
  if (btnVueEmbed !== null) {
    btnVueEmbed.addEventListener('click', () => {
      goTabVue('embed')
    })
  }
  const btnCan = document.getElementById('btnCan')
  if (btnCan !== null) {
    btnCan.addEventListener('click', () => {
      goTabVue('can')
    })
  }
  const btnEval = document.getElementById('btnEval')
  if (btnEval !== null) {
    btnEval.addEventListener('click', () => {
      goTabVue('eval')
    })
  }

  window.addEventListener('resize', function (e) {
    // Pour gérer un problème de dimension de la colonne de droite si on change la taille de fenêtre après un passage en mode plein écran des exercices.
    if ($('#exo_plein_ecran').hasClass('left')) {
      $('#right').css('width', $('#left').css('width'))
    }
  })

  // Gestion du bonton de copie du lien
  if (document.getElementById('btnEmbed')) {
    document.getElementById('btnEmbed').addEventListener('click', function () {
      $('#ModalEmbed').html(`<div class="content"><p><pre><code>&lt;iframe width="660"
        height="315" 
        src="${window.location.href + '&v=e'}"
        frameborder="0" >
&lt;/iframe></code><pre></p>
        <button id="btnEmbedCode" style="margin:10px" class="btn ui toggle button labeled icon url"
        data-clipboard-action="copy" data-clipboard-text=url_courant()><i class="copy icon"></i>Copier le code HTML</button></div>`)
      const clipboard = new Clipboard('#btnEmbedCode', {
        text: () =>
          `<iframe\n\t width="660" height="315"\n\t src="${window.location.href + '&v=e'}"\n\tframeborder="0" >\n</iframe>`
      })
      clipboard.on('success', function (e) {
        console.info(e.text + ' copié dans le presse-papier.')
      })
      $('.ui.button.toggle').state() // initialise le bouton
      $('#ModalEmbed').modal('show')
    })
  }
  if (document.getElementById('buttonOptions')) {
    document.getElementById('buttonOptions').addEventListener('click', function () {
      const div = document.getElementById('ModalEmbed')
      div.innerHTML = `
      <div class="content">
      <h3 class="ui dividing header">Affichage ou export</h3>
      <div class="ui link relaxed list">
        <div class="active item"><a class="mesLiensModaux"  href="${replaceQueryParam('v', 'diap')}" target="_blank"><i class="play icon"></i>Diaporama (navigation avec les flèches, pause avec la barre espace)</a></div>
        <div class="active item"><a class="mesLiensModaux"  href="${replaceQueryParam('v', 'l')}" target="_blank"><i class="expand icon"></i>Simplifié (sans le menu de coopmaths.fr)</a></div>
        <div class="active item"><a class="mesLiensModaux"  href="${replaceQueryParam('v', 'multi')}" target="_blank"><i class="map outline icon"></i>En colonnes</a></div>
        <div class="active item"><a class="mesLiensModaux" href="${replaceQueryParam('v', 'embed')}" target="_blank"><i class="tablet alternate icon"></i>Optimisé pour les smartphones</a></div>
        <div class="active item"><a class="mesLiensModaux" href="${replaceQueryParam('v', 'can')}" target="_blank"><i class="flag checkered icon"></i>Course aux nombres (interactif et une question à la fois)</a></div>
        <div class="active item"><a class="mesLiensModaux" href="${replaceQueryParam('v', 'eval')}" target="_blank"><i class="tasks icon"></i>Interactif et un exercice par page</a></div>
        <div class="active item"><a class="mesLiensModaux" href="${replaceQueryParam('v', 'moodle')}" target="_blank"><i class="share square icon"></i>Export Moodle</a></div>
        <div class="active item"><a class="mesLiensModaux" href="${replaceQueryParam('v', 'latex')}" target="_blank"><i class="cogs icon"></i>Export LaTeX</a></div>
        <div class="active item"><a class="mesLiensModaux" href="${replaceQueryParam('v', 'amc')}" target="_blank"><i class="check square outline icon"></i>Export AMC</a></div>
        <div class="active item"><a class="mesLiensModaux" href="https://coopmaths.fr/beta/${window.location.search.replace('?ex=', '?id=').replaceAll(',ex=', '&id=').replaceAll(',', '&')}" target="_blank"><i class="exclamation triangle icon"></i>Version béta</a></div>
      </div>

      <h3 class="ui dividing header">Imposer un temps</h3>
        <div class="ui left icon input" id="formTimer" style="margin: 10px" data-tooltip='Temps en secondes'>
          <i class="hourglass start icon"></i>
          <input id='inputTimer' type='number' min='2' max='999' ${context.duree ? 'value="' + context.duree + '"' : ''} >
        </div>

        
      <h3 class="ui dividing header">Code d'intégration</h3>
      <div class="content"><p><div style="white-space: pre-wrap;">&lt;iframe width="660"
        height="315" 
        src="https://coopmaths.fr/mathalea.html${replaceQueryParam('v', 'e')}"
        frameborder="0" >
&lt;/iframe><div></p>
        <button id="btnEmbedCode" style="margin:10px" class="btn ui toggle button labeled icon url"
        data-clipboard-action="copy" data-clipboard-text=url_courant()><i class="copy icon"></i>Copier le code HTML</button></div>

        

        <h3 class="ui dividing header">QR-Code</h3>
        <div class="ui center aligned container">
        <button id="btnQRcode" style="margin: 10px" class="btn ui huge button icon" data-tooltip="Afficher le QR-Code"><i class="qrcode icon"></i></button>
        </div>
        </div>
      `
      if (document.getElementById('btnQRcode')) {
        document.getElementById('btnQRcode').addEventListener('click', function () {
          $('#ModalQRcode').html('<canvas width="800" height="800" id="canvasQRCode"></canvas>')
          const canvas = document.getElementById('canvasQRCode')
          QRCode.toCanvas(canvas, window.location.href, {
            width: Math.min(window.innerHeight, window.innerWidth) * 0.9,
            height: Math.min(window.innerHeight, window.innerWidth) * 0.9
          })
          $('#ModalQRcode').modal('show')
        })
      }
      const clipboard = new Clipboard('#btnEmbedCode', {
        text: () =>
          `<iframe\n\t width="660" height="315"\n\t src="${window.location.href + '&v=e'}"\n\tframeborder="0" >\n</iframe>`
      })
      clipboard.on('success', function (e) {
        console.info(e.text + ' copié dans le presse-papier.')
      })
      document.getElementById('inputTimer').addEventListener('change', () => {
        context.duree = document.getElementById('inputTimer').value
        const mesLiens = document.querySelectorAll('.mesLiensModaux')
        for (const lien of mesLiens) {
          lien.href = replaceQueryParam('duree', context.duree, lien.href)
        }
        setUrl('inputTimer.addEventListener()')
      })
      $('.ui.button.toggle').state() // initialise le bouton
      $('#ModalEmbed').modal('show')
    })
  }

  urlToListeDesExercices()
})
