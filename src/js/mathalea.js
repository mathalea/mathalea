/* global $ fetch Event ActiveXObject XMLHttpRequest JSZip saveAs */
import { strRandom, creerDocumentAmc, telechargeFichier, introLatex, introLatexCoop, scratchTraductionFr, modalYoutube } from './modules/outils.js'
import { getUrlVars, getFilterFromUrl, setUrl, getUrlSearch, setUrlAndGo, getUserId } from './modules/gestionUrl.js'
import { menuDesExercicesDisponibles, dictionnaireDesExercices, apparenceExerciceActif, supprimerExo } from './modules/menuDesExercicesDisponibles.js'
import { loadIep, loadPrism, loadGiac, loadMathLive } from './modules/loaders'
import { waitFor } from './modules/outilsDom'
import { mg32DisplayAll } from './modules/mathgraph'
import { messageUtilisateur } from './modules/messages.js'
import { exerciceInteractif } from './modules/gestionInteractif.js'
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

// "3" isNumeric (pour gérer le sup venant de l'URL)
function isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

let listeObjetsExercice = [] // Liste des objets listeObjetsExercices
let listeDesExercices = [] // Liste des identifiants des exercices
let codeLatex = ''
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
    if (i === 0) {
      texteCode += listeTag[i].textContent
    } else {
      texteCode += ',' + listeTag[i].textContent
    }
  }
  document.getElementById('choix_des_exercices').value = texteCode
  const evenement = new Event('change')
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
        $('.choix_exercices:last').focus()
      }
    })
  $('#choix_exercices_div').sortable({
    cancel: 'i',
    placeholder: 'sortableplaceholder',
    update: function () {
      copierVersExerciceForm()
    }
  })
  $('.choix_exercices')
    .off('mousedown')
    .on('mousedown', function () {
      // nécessaire car le sortable ne permet plus la sélection des contenteditable une fois activé
      this.focus()
      selectionnerCode(this)
    })
}

function gestionSpanChoixExercice (elem) {
  // quand on donne le code d'un exercice existant, le style change et on créé un autre span à suivre.
  const listeCodesExercices = Object.keys(dictionnaireDesExercices)
  if (listeCodesExercices.indexOf($(elem).text()) >= 0 && !$(elem).hasClass('valide')) {
    $(elem).addClass('valide')
    if ($('.choix_exercices:last').hasClass('valide')) {
      // si le dernier élément n'est pas valide on n'en créé pas un nouveau.
      $(elem.parentElement.parentElement).append('<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"><br/></span></div>')
    }
    ajoutHandlersEtiquetteExo() // On ajoute la gestion des evenements sur l'étiquette créée.
    // sur la perte de focus, si le span est valide alors on met à jour la liste des exercices (maj du champ texte + event change)
  } else if (listeCodesExercices.indexOf($(elem).text()) < 0 && $(elem).hasClass('valide')) {
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
 * @param isdiaporama
 * @param listeObjetsExercice
 * @return {Promise}
 */
async function gestionModules (isdiaporama, listeObjetsExercice) {
  // besoin katex, mg32, iep, scratch
  // appelée dès lors que l'on affiche le code html des exercices : depuis "miseAJourDuCode" en mode html (diaporama et !diaporama) et pour le preview.
  loadMathLive()
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
  $('.katexPopup').popup({
    popup: '.special.popup',
    on: 'hover',
    variation: 'inverted',
    inline: true
  })
  const exosMg32 = listeObjetsExercice.filter((exo) => exo.typeExercice === 'MG32')
  if (exosMg32.length) {
    // faut charger mathgraph et lui filer ces figures
    try {
      // faut attendre que le div soit créé
      // @todo ce code devrait plutôt être exécuté après la création du div
      // (et ce serait même mieux d'ajouter les conteneurs comme propriétés des exos passés à mg32DisplayAll
      // => il n'y aurait plus de couplage sur le préfixe MG32div)
      await waitFor('MG32div0')
      await mg32DisplayAll(exosMg32)
    } catch (error) {
      // On traite l'erreur
      console.log(error)
      messageUtilisateur({ code: 'mg32load' })
    }
  }
  try {
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
  } catch (error) {
    // On traite l'erreur
    console.log(error)
    messageUtilisateur({ code: 'scratchLoad' })
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
  }
}

function contenuExerciceHtml (obj, numeroExercice, isdiaporama) {
  // appelée dès lors que l'on affiche le code html des exercices : depuis "miseAJourDuCode" en mode html (diaporama et !diaporama) et pour le preview.
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
  if (isdiaporama) {
    contenuUnExercice += '<section class="slider single-item" id="diaporama">'
    for (const question of obj.listeQuestions) {
      contenuUnExercice +=
        `\n<div id="question_diap" style="font-size:${obj.tailleDiaporama}px"><span>` +
        question
          .replace(/\\dotfill/g, '...')
          .replace(/\\not=/g, '≠')
          .replace(/\\ldots/g, '....') +
        '</span></div>' // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
    }
    contenuUnExercice += '<div id="question_diap" style="font-size:100px"><span>$\\text{Terminé !}$</span></div></section>'
    if (obj.typeExercice === 'MG32') {
      contenuUnExercice += `<div id="MG32div${numeroExercice - 1}" class="MG32"></div>`
    }
    contenuUneCorrection += obj.contenuCorrection
    if (obj.typeExercice === 'MG32' && obj.MG32codeBase64corr) {
      contenuUneCorrection += `<div id="MG32divcorr${numeroExercice - 1}" class="MG32"></div>`
    }
  }
  if (!isdiaporama) {
    if (obj.typeExercice === 'dnb') {
      contenuUnExercice += ` Exercice ${numeroExercice} − DNB ${obj.mois} ${obj.annee} - ${obj.lieu} (ex ${obj.numeroExercice})</h3>`
      contenuUnExercice += `<img width="90%" src="${obj.png}">`
      contenuUneCorrection += `<h3 class="ui dividing header">Exercice ${numeroExercice} − DNB ${obj.mois} ${obj.annee} - ${obj.lieu} (ex ${
        obj.numeroExercice
      },'${numeroExercice - 1}')</h3>`
      contenuUneCorrection += `<img width="90%" src="${obj.pngcor}">`
      obj.video = false
    } else {
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
          paramTooltip += obj.besoinFormulaireNumerique[0] + ': \n' + obj.besoinFormulaireNumerique[2] + '\n'
        }
        if (obj.besoinFormulaire2Numerique && obj.besoinFormulaire2Numerique[2]) {
          paramTooltip += obj.besoinFormulaire2Numerique[0] + ': \n' + obj.besoinFormulaire2Numerique[2]
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
      contenuUneCorrection += obj.contenuCorrection
      if (obj.typeExercice === 'MG32' && obj.MG32codeBase64corr) {
        contenuUneCorrection += `<div id="MG32divcorr${numeroExercice - 1}" class="MG32"></div>`
      }
    }
  }
  return {
    contenu_un_exercice: contenuUnExercice,
    contenu_une_correction: contenuUneCorrection
  }
}

function miseAJourDuCode () {
  // fonction permettant de mettre à jour la liste des exercices affichées.
  // puis gère les gestionnaires d'évènements sur les éléments en provenance des exercices (icones pour supprimer/déplacer...)
  // Appelée dès lors que l'on a une modification sur l'affichage d'un ou plusieurs exercices
  //    suppression d'un exercice, nouvelle donnée, changement de paramètre...)
  // C'est dans cette fonction que l'on va executer les this.nouvelleVersion des exercices.
  setUrl()
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
  seedrandom(context.graine, { global: true })
  // ajout des paramètres des exercices dans l'URL et pour le bouton "copier l'url"
  ;(function gestionURL () {
    if (listeDesExercices.length > 0) {
      let finUrl = ''
      if (context.isHtml && !context.isDiaporama) {
        finUrl += 'mathalea.html'
      }
      finUrl += `?ex=${listeDesExercices[0]}`
      if (typeof listeObjetsExercice[0].sup !== 'undefined') {
        finUrl += `,s=${listeObjetsExercice[0].sup}`
      }
      if (typeof listeObjetsExercice[0].sup2 !== 'undefined') {
        finUrl += `,s2=${listeObjetsExercice[0].sup2}`
      }
      if (typeof listeObjetsExercice[0].sup3 !== 'undefined') {
        finUrl += `,s3=${listeObjetsExercice[0].sup3}`
      }
      if (listeObjetsExercice[0].nbQuestionsModifiable) {
        finUrl += `,n=${listeObjetsExercice[0].nbQuestions}`
      }
      if (listeObjetsExercice[0].video.length > 1) {
        finUrl += `,v${encodeURIComponent(listeObjetsExercice[0].video)}`
      }
      if (listeObjetsExercice[0].correctionDetaillee && listeObjetsExercice[0].correctionDetailleeDisponible) {
        finUrl += ',cd=1'
      }
      if (!listeObjetsExercice[0].correctionDetaillee && listeObjetsExercice[0].correctionDetailleeDisponible) {
        finUrl += ',cd=0'
      }
      if (listeObjetsExercice[0].interactif && !context.isDiaporama) {
        finUrl += ',i=1'
      }
      if (!listeObjetsExercice[0].interactif && listeObjetsExercice[0].interactifReady && !context.isDiaporama) {
        finUrl += ',i=0'
      }
      listeObjetsExercice[0].numeroExercice = 0
      for (let i = 1; i < listeDesExercices.length; i++) {
        finUrl += `&ex=${listeDesExercices[i]}`
        if (typeof listeObjetsExercice[i].sup !== 'undefined') {
          finUrl += `,s=${listeObjetsExercice[i].sup}`
        }
        if (typeof listeObjetsExercice[i].sup2 !== 'undefined') {
          finUrl += `,s2=${listeObjetsExercice[i].sup2}`
        }
        if (typeof listeObjetsExercice[i].sup3 !== 'undefined') {
          finUrl += `,s3=${listeObjetsExercice[i].sup3}`
        }
        if (listeObjetsExercice[i].nbQuestionsModifiable) {
          finUrl += `,n=${listeObjetsExercice[i].nbQuestions}`
        }
        if (listeObjetsExercice[i].video) {
          if (listeObjetsExercice[i].video.length > 1) {
            // Pour dnb, video est à false, pour les exercices interactif, par défaut c'est ''
            finUrl += `,v${encodeURIComponent(listeObjetsExercice[i].video)}`
          }
        }
        if (listeObjetsExercice[i].correctionDetaillee && listeObjetsExercice[i].correctionDetailleeDisponible) {
          finUrl += ',cd=1'
        }
        if (!listeObjetsExercice[i].correctionDetaillee && listeObjetsExercice[i].correctionDetailleeDisponible) {
          finUrl += ',cd=0'
        }
        if (listeObjetsExercice[i].interactif && !context.isDiaporama) {
          finUrl += ',i=1'
        }
        if (!listeObjetsExercice[i].interactif && listeObjetsExercice[i].interactifReady && !context.isDiaporama) {
          finUrl += ',i=0'
        }
        listeObjetsExercice[i].numeroExercice = i
      }
      if (typeof context.duree !== 'undefined' && context.isDiaporama) {
        finUrl += `&duree=${context.duree}`
      }
      if (!getUserId()) {
        // On affiche la série uniquement si l'utilisateur n'est pas connecté
        finUrl += `&serie=${context.graine}`
      }
      if (context.vue) {
        finUrl += `&v=${context.vue}`
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
      window.history.pushState('', '', finUrl)
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
  let contenu, contenuDesExercices, contenuDesCorrections
  // Dans la suite test selon les affichages :
  // 1/ context.isHtml && diaporama => &v=cm pour le calcul mental.
  // 2/ context.isHtml && !diaporama => &v=menu, &v=ex, &v=exEtChoix
  // 3/ context.isAmc => &v=amc
  // 4/ !context.isHtml && !context.isAmc => &v=latex
  if (context.isHtml && context.isDiaporama) {
    if (listeDesExercices.length > 0) {
      // Pour les diaporamas tout cacher quand un exercice est choisi
      $('#exercices_disponibles').hide()
      $('#icones').show() // on affiche les boutons du diaporama uniquement quand un exercice est choisi.
      $('#corrections_et_parametres').show()
      $('#parametres_generaux').show()
    } else {
      $('#exercices_disponibles').show()
      $('h3').show()
      $('#formulaire_choix_de_la_duree').show()
    }
    document.getElementById('exercices').innerHTML = ''
    document.getElementById('corrections').innerHTML = ''
    if (listeDesExercices.length > 0) {
      for (let i = 0; i < listeDesExercices.length; i++) {
        listeObjetsExercice[i].id = listeDesExercices[i]
        listeObjetsExercice[i].interactif = false
        try {
          listeObjetsExercice[i].nouvelleVersion(i)
        } catch (error) {
          console.log(error)
        }
        contenu = contenuExerciceHtml(listeObjetsExercice[i], i + 1, true)
      }
      contenuDesExercices = contenu.contenu_un_exercice
      contenuDesCorrections = `${contenu.contenu_une_correction}`
      $('#message_liste_exercice_vide').hide()
      $('#cache').dimmer('hide')
    } else {
      $('#message_liste_exercice_vide').show() // Message au dessus de la liste des exercices
      $('#cache').dimmer('show') // Cache au dessus du code LaTeX
    }
    $('#popup_preview .icone_param').remove() // dans l'aperçu pas d'engrenage pour les paramètres.
    $('#popup_preview .iconeInteractif').remove() // dans l'aperçu pas d'icone interactif.
    document.getElementById('exercices').innerHTML = contenuDesExercices
    document.getElementById('corrections').innerHTML = contenuDesCorrections
    gestionModules(true, listeObjetsExercice)
  }

  // Ajoute le contenu dans les div #exercices et #corrections
  if (context.isHtml && !context.isDiaporama) {
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
    if (listeDesExercices.length > 0) {
      for (let i = 0; i < listeDesExercices.length; i++) {
        // const contenu_un_exercice = ''; const contenu_une_correction = ''
        listeObjetsExercice[i].id = listeDesExercices[i]
        contenu = contenuExerciceHtml(listeObjetsExercice[i], i + 1, false)
        if ($('#liste_des_exercices').is(':visible') || $('#exercices_disponibles').is(':visible') || $('#exo_plein_ecran').is(':visible')) {
          // si on n'a plus la liste des exercices il ne faut plus pouvoir en supprimer (pour v=l)
          if (listeDesExercices.length === 1) {
            // si on a q'un seul exercice, uniquement l'icone poubelle
            contenuDesExercices += `<div id="exercice${i}"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i>${contenu.contenu_un_exercice} </div>`
          } else if (i === 0) {
            // si c'est le premier exercice icone poubelle plus fleche vers le bas
            contenuDesExercices += `<div id="exercice${i}"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle down icon icone_down"></i>${contenu.contenu_un_exercice} </div>`
          } else if (i === listeDesExercices.length - 1) {
            // Pour le dernier exercice pas de fleche vers le bas
            contenuDesExercices += `<div id="exercice${i}"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle up icon icone_up"></i>${contenu.contenu_un_exercice} </div>`
          } else {
            // pour les autres exercices affichage de l'icone poubelle et des deux flèches (haut et bas)
            contenuDesExercices += `<div id="exercice${i}"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle down icon icone_down"></i><i id="${i}" class="arrow circle up icon icone_up"></i>${contenu.contenu_un_exercice} </div>`
          }
        } else {
          contenuDesExercices += `<div id="exercice${i}" class="titreExercice"> <h3 class="ui dividing header">${contenu.contenu_un_exercice} </div>`
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
    gestionModules(false, listeObjetsExercice)
    const exercicesAffiches = new Event('exercicesAffiches', { bubbles: true })
    document.dispatchEvent(exercicesAffiches)
    // En cas de clic sur la correction, on désactive les exercices interactifs
    const bntCorrection = document.getElementById('btnCorrection')
    if (bntCorrection) {
      // Cache la correction et les paramètres au clic sur "Nouvelles données"
      $('#affichage_exercices > .ui.accordion').accordion('close', 0)
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
    codeLatex = ''
    const output = context.isHtml
    context.isHtml = false
    listePackages = new Set()
    if (listeDesExercices.length > 0) {
      for (let i = 0; i < listeDesExercices.length; i++) {
        listeObjetsExercice[i].id = listeDesExercices[i] // Pour récupérer l'id qui a appelé l'exercice
        listeObjetsExercice[i].nouvelleVersion(i)
        questions.push(listeObjetsExercice[i])
        if (typeof listeObjetsExercice[i].listePackages === 'string') {
          listePackages.add(listeObjetsExercice[i].listePackages)
        } else {
          // si c'est un tableau
          listeObjetsExercice[i].listePackages.forEach(listePackages.add, listePackages)
        }
      }
      context.isHtml = output
      codeLatex = creerDocumentAmc({ questions: questions, nbQuestions: nbQuestions, nbExemplaires: nbExemplaires, typeEntete: typeEntete, format: format })
        .replace(/<br><br>/g, '\n\n\\medskip\n')
        .replace(/<br>/g, '\\\\\n')

      $('#message_liste_exercice_vide').hide()
      $('#cache').show()
      div.innerHTML = '<pre><code class="language-latex">' + codeLatex + '</code></pre>'
      loadPrism()
        .then(() => {
          /* global Prism */
          Prism.highlightAllUnder(div) // Met à jour la coloration syntaxique
        })
        .catch((error) => console.error(error))
      const clipboardURL = new Clipboard('#btnCopieLatex', { text: () => codeLatex })
      clipboardURL.on('success', function (e) {
        console.info('Code LaTeX copié dans le presse-papier.')
      })
    } else {
      codeLatex = ''
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
            request = new XMLHttpRequest()
          } else if (window.ActiveXObject) {
            // IE
            request = new ActiveXObject('Microsoft.XMLHTTP')
          } else {
            return // Non supporte
          }

          // Pour éviter l'erreur d'interpretation du type Mime
          request.overrideMimeType('text/plain')

          request.open('GET', monFichier, false) // Synchro
          request.send(null)

          return request.responseText
        }

        contenuFichier += codeLatex
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
        contenuFichier += codeLatex
        // Gestion du LaTeX statique
        // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

        $('input[name=encoded_snip]').val(encodeURIComponent(contenuFichier))
        if (listePackages.has('dnb')) { // Force le passage à xelatex sur Overleaf pour les exercices de DNB
          $('input[name=engine]').val('xelatex')
        }
        if ($('#nom_du_fichier').val()) {
          $('input[name=snip_name]').val($('#nom_du_fichier').val()) // nomme le projet sur Overleaf
        }
      })
  }
  if (!context.isHtml && !context.isAmc) {
    // Sortie LaTeX
    // code pour la sortie LaTeX
    let codeEnonces = ''
    let codeCorrections = ''
    const listeExercicesLength = listeDesExercices.length
    codeLatex = ''
    listePackages = new Set()
    if (listeExercicesLength > 0) {
      for (let i = 0; i < listeExercicesLength; i++) {
        listeObjetsExercice[i].id = listeDesExercices[i] // Pour récupérer l'id qui a appelé l'exercice
        if (listeObjetsExercice[i].typeExercice === 'dnb') {
          listePackages.add('dnb')
          codeEnonces += '\n\n\\exo{}\n\n'
          codeEnonces += listeObjetsExercice[i].contenu
          codeEnonces += '\n\n'
          codeCorrections += '\n\n\\exo{}\n\n'
          codeCorrections += listeObjetsExercice[i].contenuCorrection
          codeCorrections += '\n\n'
        } else {
          listeObjetsExercice[i].nouvelleVersion()
          if (listeObjetsExercice[i].pasDeVersionLatex) {
            messageUtilisateur({ code: 'noLatex', exercice: listeObjetsExercice[i].id })
          }
          codeEnonces += listeObjetsExercice[i].contenu
          codeEnonces += '\n\n'
          codeCorrections += listeObjetsExercice[i].contenuCorrection
          codeCorrections += '\n\n'
          if (typeof listeObjetsExercice[i].listePackages === 'string') {
            listePackages.add(listeObjetsExercice[i].listePackages)
          } else {
            // si c'est un tableau
            listeObjetsExercice[i].listePackages.forEach(listePackages.add, listePackages)
          }
        }
      }
      if ($('#supprimer_correction:checked').val()) {
        codeLatex = codeEnonces
      } else {
        codeLatex =
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
        codeLatex = ''
        let codeExercices = ''
        let codeCorrection = ''
        for (let v = 0; v < $('#nombre_de_versions').val(); v++) {
          codeExercices += '\\version{' + (v + 1) + '}\n\n'
          codeCorrection += '\n\n\\newpage\n\\version{' + (v + 1) + '}\n\\begin{correction}'
          for (let i = 0; i < listeDesExercices.length; i++) {
            listeObjetsExercice[i].nouvelleVersion()
            codeExercices += listeObjetsExercice[i].contenu
            codeExercices += '\n\n'
            codeCorrection += listeObjetsExercice[i].contenuCorrection
            codeCorrection += '\n\n'
          }
          if (v < $('#nombre_de_versions').val() - 1) {
            if ($('#style_classique:checked').val()) {
              codeExercices += '\n\\newpage\n\\setcounter{exo}{0}\n'
            } else {
              codeExercices += '\n\\newpage\n\\setcounter{section}{0}\n'
            }
          }
          codeCorrection += '\n\\end{correction}'
        }
        codeLatex = codeExercices + codeCorrection
      }
      div.innerHTML = '<pre><code class="language-latex">' + codeLatex + '</code></pre>'
      loadPrism()
        .then(() => {
          Prism.highlightAllUnder(div) // Met à jour la coloration syntaxique
        })
        .catch((error) => console.error(error))
      const clipboardURL = new Clipboard('#btnCopieLatex', { text: () => codeLatex })
      clipboardURL.on('success', function (e) {
        console.info('Code LaTeX copié dans le presse-papier.')
      })
    } else {
      codeLatex = ''
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
          contenuFichier += '\\begin{document}\n\n' + codeLatex + '\n\n\\end{document}'
        } else {
          contenuFichier += '\\documentclass[a4paper,11pt,fleqn]{article}\n\\input{preambule_coop}\n'
          contenuFichier += '\\theme{' + $('input[name=theme]:checked').val() + '}{' + $('#entete_du_fichier').val() + '}'
          contenuFichier += '{' + $('#items').val() + '}{' + $('#domaine').val() + '}\n\\begin{document}\n\n' + codeLatex
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
          contenuFichier += introLatex($('#entete_du_fichier').val(), listePackages) + codeLatex + '\n\n\\end{document}'
        } else {
          contenuFichier += introLatexCoop(listePackages)
          contenuFichier += '\n\n\\theme{' + $('input[name=theme]:checked').val() + '}{' + $('#entete_du_fichier').val() + '}'
          contenuFichier += '{' + $('#items').val() + '}{' + $('#domaine').val() + '}\n\\begin{document}\n\n' + codeLatex
          contenuFichier += '\n\n\\end{document}'
        }

        // Gestion du LaTeX statique

        // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

        $('input[name=encoded_snip]').val(encodeURIComponent(contenuFichier))
        if (listePackages.has('dnb')) {
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
      ;[listeDesExercices[num - 1], listeDesExercices[num]] = [listeDesExercices[num], listeDesExercices[num - 1]]
      formChoixDesExercices.value = listeDesExercices.toString()
      copierExercicesFormVersAffichage(listeDesExercices)
      miseAJourDeLaListeDesExercices()
    }
  }

  function descendreExo (num) {
    // descend un exercice d'un cran dans la liste (déclenché sur l'icone fleche vers le bas au niveau du titre d'un exercice.
    // récupère la liste des exercices dans le formulaire, la réordonne et relance la fonction miseAJourDeLaListeDesExercices()
    const formChoixDesExercices = document.getElementById('choix_des_exercices')
    listeDesExercices = formChoixDesExercices.value.replace(/\s/g, '').replace(';', ',').split(',')
    num = parseInt(num)
    if (num !== listeDesExercices.length - 1) {
      ;[listeDesExercices[num], listeDesExercices[num + 1]] = [listeDesExercices[num + 1], listeDesExercices[num]]
      formChoixDesExercices.value = listeDesExercices.toString()
      copierExercicesFormVersAffichage(listeDesExercices)
      miseAJourDeLaListeDesExercices()
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
function miseAJourDeLaListeDesExercices (preview) {
  let besoinXCas = false
  const promises = []
  const listeExercices = listeDesExercices
  if (preview) {
    listeExercices.push(preview)
  }
  listeObjetsExercice = []
  for (let i = 0, id; i < listeExercices.length; i++) {
    id = listeExercices[i]
    let url
    try {
      url = dictionnaireDesExercices[id].url
    } catch (error) {
      console.log(error)
      console.log(`Exercice ${id} non disponible`)
      throw new Error(`code: 'codeExerciceInconnu', exercice: ${id}`)
    }
    if (dictionnaireDesExercices[id].typeExercice === 'dnb') {
      listeObjetsExercice[i] = dictionnaireDesExercices[id]
      promises.push(
        fetch(url)
          .then((response) => response.text())
          .then((data) => {
            listeObjetsExercice[i].nbQuestionsModifiable = false
            listeObjetsExercice[i].video = ''
            listeObjetsExercice[i].titre = id
            listeObjetsExercice[i].contenu = data
          })
      )
      promises.push(
        fetch(dictionnaireDesExercices[id].urlcor)
          .then((response) => response.text())
          .then((data) => {
            listeObjetsExercice[i].contenuCorrection = data
          })
      )
    } else {
      // avec webpack on ne peut pas faire de import(url), car il faut lui indiquer quels fichiers sont susceptibles d'être chargés
      // ici il ne peut s'agir que de js contenus dans exercices (dnb déjà traité dans le if au dessus)
      const chunks = /^\/exercices\/(.*)/.exec(url)
      if (!chunks) throw Error(`url non prévue : ${url}`)
      const path = chunks[1]
      promises.push(
        // cf https://webpack.js.org/api/module-methods/#magic-comments
        import(/* webpackMode: "lazy" */ './exercices/' + path).then((module) => {
          if (!module) throw Error(`l'import de ${path} a réussi mais on ne récupère rien, il doit y avoir un oubli d'export`)
          const Exo = module.default
          listeObjetsExercice[i] = new Exo()
          ;['titre', 'amcReady', 'amcType', 'interactifType', 'interactifReady'].forEach((p) => {
            if (module[p] !== undefined) listeObjetsExercice[i][p] = module[p]
          })
          if (dictionnaireDesExercices[id].sup !== undefined) {
            listeObjetsExercice[i].sup = dictionnaireDesExercices[id].sup
          }
          if (dictionnaireDesExercices[id].sup2 !== undefined) {
            listeObjetsExercice[i].sup2 = dictionnaireDesExercices[id].sup2
          }
          if (dictionnaireDesExercices[id].sup3 !== undefined) {
            listeObjetsExercice[i].sup3 = dictionnaireDesExercices[id].sup3
          }
          if (dictionnaireDesExercices[id].nbQuestions !== undefined) {
            listeObjetsExercice[i].nbQuestions = dictionnaireDesExercices[id].nbQuestions
          }
          if (listeObjetsExercice[i].typeExercice === 'XCas') {
            besoinXCas = true
          }
        })
      )
    }
  }
  Promise.all(promises)
    .then(() => {
      if (!preview) {
        parametresExercice(listeObjetsExercice)
      }
    })
    .then(() => {
      if (!preview || context.isHtml) {
        // ajout de context.isHtml par conserver les infos sur le fait que les exercices sont en mode interactif
        // Récupère les paramètres passés dans l'URL
        const urlVars = getUrlVars()
        // trier et mettre de côté les urlvars qui ne sont plus dans la liste des exercices
        // => évite les erreurs lors de la suppression de question dans la liste.
        if (urlVars.length < listeObjetsExercice.length && document.getElementById('filtre') && document.getElementById('filtre').value === 'interactif') {
          listeObjetsExercice[listeObjetsExercice.length - 1].interactif = true
          if (formInteractif[listeObjetsExercice.length - 1]) {
            formInteractif[listeObjetsExercice.length - 1].checked = true
          }
        }
        if (urlVars.length < 0 && document.getElementById('filtre').value === 'interactif') {
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
          if (urlVars[i].v && context.isHtml && !context.isDiaporama) {
            listeObjetsExercice[i].video = decodeURIComponent(urlVars[i].v)
            formVideo[i].value = listeObjetsExercice[i].video
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
            if (isNumeric(urlVars[i].s)) {
              listeObjetsExercice[i].sup = parseInt(urlVars[i].s)
            } else {
              listeObjetsExercice[i].sup = urlVars[i].s
            }
            // Un exercice avec un this.sup mais pas de formulaire pouvait poser problème
            try {
              formSup[i].value = listeObjetsExercice[i].sup
            } catch {}
          }
          if (typeof urlVars[i].s2 !== 'undefined') {
            if (isNumeric(urlVars[i].s2)) {
              listeObjetsExercice[i].sup2 = parseInt(urlVars[i].s2)
            } else {
              listeObjetsExercice[i].sup2 = urlVars[i].s2
            }
            try {
              formSup2[i].value = listeObjetsExercice[i].sup2
            } catch (error) {}
          }
          if (typeof urlVars[i].s3 !== 'undefined') {
            if (isNumeric(urlVars[i].s3)) {
              listeObjetsExercice[i].sup3 = parseInt(urlVars[i].s3)
            } else {
              listeObjetsExercice[i].sup3 = urlVars[i].s3
            }
            try {
              formSup3[i].value = listeObjetsExercice[i].sup3
            } catch (error) {}
          }
        }
      }
    })
    .then(() => {
      if (besoinXCas) {
        // On charge le javascript de XCas
        let div // le div dans lequel on fera apparaitre le cercle de chargement
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
        return loadGiac()
      }
    })
    .then(() => {
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
            console.log(error)
          }
        }
        listeObjetsExercice[listeExercices.length - 1].id = listeExercices[listeExercices.length - 1]
        const contenu = contenuExerciceHtml(listeObjetsExercice[listeExercices.length - 1], listeExercices.length, false)
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
          gestionModules(false, listeObjetsExercice)
        }
        context.isHtml = output
        miseAJourDuCode() // permet de gérer les popup avec module.
      } else {
        miseAJourDuCode()
      }
    })
}

let div// div dans lequel le code va être affiché
let divParametresGeneraux // div dans lequel vont être inséré tous les formulaires
const formConsigne = []
const formNbQuestions = []
const formVideo = []
const formCorrectionDetaillee = []
const formNbCols = []
const formNbColsCorr = []
const formSpacing = []
const formSpacingCorr = []
const formSup = []
const formSup2 = []
const formSup3 = []
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
      if (!context.isDiaporama) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_video' +
          i +
          '" data-tooltip="URL, code iframe, identifiant YouTube" data-inverted="" >Vidéo ou complément numérique : <input id="form_video' +
          i +
          '" type="texte" size="20"  ></label></div>'
      }
      if (exercice[i].correctionDetailleeDisponible) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="form_correctionDetaillee' +
          i +
          '">Correction détaillée : </label> <input id="form_correctionDetaillee' +
          i +
          '" type="checkbox" ></div>'
      }
      if (exercice[i].interactifReady && !exercice[i].interactifObligatoire && !context.isDiaporama) {
        divParametresGeneraux.innerHTML +=
          '<div><label for="formInteractif' + i + '">Exercice interactif : </label> <input id="formInteractif' + i + '" type="checkbox" ></div>'
      }

      if (
        !exercice[i].nbQuestionsModifiable &&
        !exercice[i].correctionDetailleeDisponible &&
        !exercice[i].besoinFormulaireNumerique &&
        !exercice[i].besoinFormulaireTexte &&
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
      divParametresGeneraux.innerHTML += `<div style='display: inline'><label for='form_sup${i}'> ${exercice[i].besoinFormulaireTexte[0]} : </label>
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
        "<div style='display: inline'><label for='form_sup" +
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
        "<div style='display: inline'><label for='form_sup2" +
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
      divParametresGeneraux.innerHTML += `<div style='display: inline'><label for='form_sup2${i}'> ${exercice[i].besoinFormulaire2Texte[0]} : </label>
                    <div style='display: inline' ${paramTooltip} data-inverted=''>
                    <input id='form_sup2${i}' type='text' size='20' ></div></div>`
    }

    if (exercice[i].besoinFormulairei3CaseACocher) {
      // Création d'un formulaire texte
      divParametresGeneraux.innerHTML +=
        "<div style='display: inline'><label for='form_sup3" +
        i +
        "'>" +
        exercice[i].besoinFormulairei3CaseACocher[0] +
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
      divParametresGeneraux.innerHTML +=
        "<p></p><div style='display: inline'><label for='form_sup3" +
        i +
        "'>" +
        exercice[i].besoinFormulaire3Texte[0] +
        " : </label><div style='display: inline' data-tooltip='" +
        exercice[i].besoinFormulaire3Texte[1] +
        "' data-inverted=''><input id='form_sup3" +
        i +
        "' type='text' size='20' ></div></div>"
    }
  }

  for (let i = 0; i < exercice.length; i++) {
    if (!context.isHtml && !context.isAmc) {
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

      // Gestion du nombre de la correction détaillée
      if (exercice[i].correctionDetailleeDisponible) {
        formCorrectionDetaillee[i] = document.getElementById('form_correctionDetaillee' + i)
        formCorrectionDetaillee[i].checked = exercice[i].correctionDetaillee // Rempli le formulaire avec la valeur par défaut
        formCorrectionDetaillee[i].addEventListener('change', function (e) {
          // Dès que le statut change, on met à jour
          exercice[i].correctionDetaillee = e.target.checked
          miseAJourDuCode()
        })
      }

      // Gestion du nombre de colones
      if (exercice[i].nbColsModifiable) {
        formNbCols[i] = document.getElementById('form_nbCols' + i)
        formNbCols[i].value = exercice[i].nbCols // Rempli le formulaire avec le nombre de colonnes
        formNbCols[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].nbCols = e.target.value
          miseAJourDuCode()
        })
      }

      // Gestion du nombre de colones dans la correction
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
      btnRadioStyleClassique.addEventListener('change', miseAJourDuCode)
      const btnRadioStyleCoopMaths = document.getElementById('style_CoopMaths')
      btnRadioStyleCoopMaths.addEventListener('change', miseAJourDuCode)
    }

    // Gestion du nombre de questions
    if (exercice[i].nbQuestionsModifiable) {
      formNbQuestions[i] = document.getElementById('formNbQuestionsParGroupe' + i)
      formNbQuestions[i].value = exercice[i].nbQuestions // Rempli le formulaire avec le nombre de questions
      formNbQuestions[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].nbQuestions = e.target.value
        miseAJourDuCode()
      })
    }

    // Gestion de la vidéo
    if (context.isHtml && !context.isDiaporama) {
      formVideo[i] = document.getElementById('form_video' + i)
      formVideo[i].value = exercice[i].video // Rempli le formulaire
      formVideo[i].addEventListener('change', function (e) {
        // Dès que ça change, on met à jour
        exercice[i].video = e.target.value
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
      formSup[i] = document.getElementById('form_sup' + i)
      formSup[i].value = exercice[i].sup // Rempli le formulaire avec le paramètre supplémentaire
      formSup[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup = e.target.value
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
      formSup2[i] = document.getElementById('form_sup2' + i)
      formSup2[i].value = exercice[i].sup2 // Rempli le formulaire avec le paramètre supplémentaire
      formSup2[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup2 = e.target.value
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

    if (exercice[i].besoinFormulairei3CaseACocher) {
      formSup3[i] = document.getElementById('form_sup3' + i)
      formSup3[i].checked = exercice[i].sup3 // Rempli le formulaire avec le paramètre supplémentaire
      formSup3[i].addEventListener('change', function (e) {
        //
        exercice[i].sup3 = e.target.checked
        miseAJourDuCode()
      })
    }

    if (exercice[i].besoinFormulaire3Numerique) {
      formSup3[i] = document.getElementById('form_sup3' + i)
      formSup3[i].value = exercice[i].sup3 // Rempli le formulaire avec le paramètre supplémentaire
      formSup3[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup3 = e.target.value
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
  }
}

// Initialisation de la page
document.addEventListener('DOMContentLoaded', async () => {
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
      const regex = /'([?;&])filtre[^&;]*[;&]?'/
      const query = window.location.search.replace(regex, '$1').replace(/&$/, '')
      const filtre = document.getElementById('filtre').value
      const url = (query.length > 2 ? query + '&' : '?') + (filtre !== 'tous' ? 'filtre=' + filtre : '')
      let modeTableauActif = false // Gestion pour le mode tableau particulière pour gérer l'activation de "datatable"
      window.history.pushState('', '', url)
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
    btnMiseAJourCode.addEventListener('click', nouvellesDonnees)
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
    miseAJourDuCode()
  }

  if (context.isHtml && !context.isDiaporama) {
    // gestion du bouton de zoom
    let taille = parseInt($('#affichage_exercices').css('font-size'))
    let lineHeight = parseInt($('#affichage_exercices').css('line-height'))
    $('#btn_zoom_plus').click(function () {
      taille *= 1.2
      lineHeight *= 1.2
      $('#affichage_exercices').css('font-size', `${taille}px`)
      $('.monQcm').css('font-size', `${taille}px`)
      $('#affichage_exercices').css('line-height', `${lineHeight}px`)
      $('.monQcm').css('line-height', `${lineHeight}px`)
      $('#affichage_exercices').find('h3').css('font-size', `${taille}px`)
      $('#affichage_exercices').find('h4').css('font-size', `${taille}px`)
      $('.mathalea2d').css('width', parseFloat($('.mathalea2d').css('width')) * 1.2)
      $('.mathalea2d').css('height', parseFloat($('.mathalea2d').css('height')) * 1.2)
    })
    $('#btn_zoom_moins').click(function () {
      if (parseInt(taille) > 10) {
        taille *= 0.8
        lineHeight *= 0.8
      }
      $('#affichage_exercices').css('font-size', `${taille}px`)
      $('#affichage_exercices').css('line-height', `${lineHeight}px`)
      $('.monQcm').css('font-size', `${taille}px`)
      $('.monQcm').css('line-height', `${lineHeight}px`)
      $('#affichage_exercices').find('h3').css('font-size', `${taille}px`)
      $('#affichage_exercices').find('h4').css('font-size', `${taille}px`)
      $('.mathalea2d').css('width', parseFloat($('.mathalea2d').css('width')) * 0.8)
      $('.mathalea2d').css('height', parseFloat($('.mathalea2d').css('height')) * 0.8)
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
    if ($('#exo_plein_ecran').hasClass('left')) {
      gestionVue('exEtChoix')
    } else {
      gestionVue('menu')
    }
  })

  const btnPleinEcran = document.getElementById('buttonFullScreen')
  if (btnPleinEcran !== null) {
    btnPleinEcran.addEventListener('click', () => {
      context.vue = 'light'
      setUrlAndGo()
    })
  }

  window.addEventListener('resize', function (e) {
    // Pour gérer un problème de dimension de la colonne de droite si on change la taille de fenêtre après un passage en mode plein écran des exercices.
    if ($('#exo_plein_ecran').hasClass('left')) {
      $('#right').css('width', $('#left').css('width'))
    }
  })

  // Gestion des boutons QRcode et copie du lien
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
  if (urlVars.length > 0) {
    for (let i = 0; i < urlVars.length; i++) {
      listeDesExercices.push(urlVars[i].id)
    }
    if (formChoixDesExercices !== null) {
      formChoixDesExercices.value = listeDesExercices.join(',')
      copierExercicesFormVersAffichage(listeDesExercices)
    }
    try {
      miseAJourDeLaListeDesExercices()
    } catch (err) {
      messageUtilisateur(err)
    }
  }
})
