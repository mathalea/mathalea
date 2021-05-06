/* global mathalea sortieHtml est_diaporama scratchblocks Prism fetch mtg32App mtgLoad  MG32_tableau_de_figures Module $  */
/* eslint-disable camelcase */
import { strRandom, telechargeFichier, introLatex, introLatexCoop, scratchTraductionFr, modalYoutube } from './modules/outils.js'
import { getUrlVars } from './modules/getUrlVars.js'
import { menuDesExercicesDisponibles, dictionnaireDesExercices, apparence_exercice_actif, supprimerExo } from './modules/menuDesExercicesDisponibles.js'
import { iep, loadScript /*, prism */ } from './modules/loaders'

import Clipboard from 'clipboard'
import QRCode from 'qrcode'
import seedrandom from 'seedrandom'

// @todo importer katex à la demande
// import katex from 'katex'
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'

import '../css/style_mathalea.css'

// Prism n'est utilisé que pour mathalealatex.html
// => utiliser la fct prism (dans modules/loaders.js) si y'en a besoin

// Pour le menu du haut
document.addEventListener('DOMContentLoaded', (event) => {
  $('.ui.dropdown').dropdown()
})

// Les variables globales nécessaires aux exercices (pas terrible...)
window.mathalea = { sortieNB: false, anglePerspective: 30, coeffPerspective: 0.5, pixelsParCm: 20, scale: 1, unitesLutinParCm: 50, mainlevee: false, amplitude: 1, fenetreMathalea2d: [-1, -10, 29, 10], objets2D: [] }
window.sortieHtml = true
window.est_diaporama = false

if (document.location.href.indexOf('mathalealatex.html') > 0) {
  window.sortieHtml = false
}
if (document.location.href.indexOf('cm.html') > 0) {
  window.est_diaporama = true
}

let listeObjetsExercice = [] // Liste des objets listeObjetsExercices
let liste_des_exercices = [] // Liste des identifiants des exercices
let codeLatex = ''
let listePackages = new Set()
// création des figures MG32 (géométrie dynamique)
window.listeScriptsIep = {} // Dictionnaire de tous les scripts xml IEP
window.listeAnimationsIepACharger = [] // Liste des id des scripts qui doivent être chargés une fois le code HTML mis à jour
menuDesExercicesDisponibles()
// fonctions de gestion de la liste des exercices cg 04-2021 ****

function copier_vers_exercice_form () {
  // envoie des informations vers le formulaire et déclenchement de l'evt change.
  let i, texte_code
  const liste_tag = $('.choix_exercices.valide')
  const liste_tag_length = liste_tag.length
  texte_code = ''
  for (i = 0; i < liste_tag_length; i++) {
    if (i === 0) {
      texte_code += liste_tag[i].textContent
    } else {
      texte_code += ',' + liste_tag[i].textContent
    }
  }
  document.getElementById('choix_des_exercices').value = texte_code
  const evenement = new Event('change')
  document.getElementById('choix_des_exercices').dispatchEvent(evenement)
}

function selectionner_code (elem) {
  const range = document.createRange()
  range.selectNodeContents(elem)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

function ajout_handlers_etiquette_exo () {
  $('.choix_exercices').off('input').on('input', function (e) {
    gestion_span_choix_exercice(event.target)
  })
  $('.choix_exercices').off('keyup').on('keyup', function (e) {
    if (e.which === 9 || e.which === 13) { // validation de l'étiquette sur tab ou entrée.
      copier_vers_exercice_form()
      $('.choix_exercices:last').focus()
    }
  })
  $('#choix_exercices_div').sortable({ cancel: 'i', placeholder: 'sortableplaceholder', update: function () { copier_vers_exercice_form() } })
  $('.choix_exercices').off('mousedown').on('mousedown', function () {
  // nécessaire car le sortable ne permet plus la sélection des contenteditable une fois activé
    this.focus()
    selectionner_code(this)
  })
}

function gestion_span_choix_exercice (elem) {
  // quand on donne le code d'un exercice existant, le style change et on en créé un autre à suivre.
  const liste_codes_exercices = Object.keys(dictionnaireDesExercices)
  if (liste_codes_exercices.indexOf($(event.target).text()) >= 0 && !$(event.target).hasClass('valide')) {
    $(event.target).addClass('valide')
    if ($('.choix_exercices:last').hasClass('valide')) { // si le dernier élément n'est pas valide on n'en créé pas un nouveau.
      $(event.target.parentElement.parentElement).append('<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"><br/></span></div>')
    }
    ajout_handlers_etiquette_exo()
    // sur la perte de focus, si le span est valide alors on met à jour la liste des exercices (maj du champ texte + event change)
  } else if (liste_codes_exercices.indexOf($(event.target).text()) < 0 && $(event.target).hasClass('valide')) {
    // si on change le contenteditable et que l'exercice n'est plus un code valide
    $(event.target).removeClass('valide')
  }
}

if (document.getElementById('choix_exercices_div')) {
  ajout_handlers_etiquette_exo()
}

function copier_exercices_form_vers_affichage (exliste) {
  let tagexercices, i
  const liste_length = exliste.length
  tagexercices = ''
  const div_exercice = document.getElementById('choix_exercices_div')
  if (liste_length > 0 && div_exercice) {
    for (i = 0; i < liste_length; i++) {
      tagexercices += `<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices valide">${exliste[i]}</span></div>`
    }
  }
  tagexercices += '<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"><br></span></div>' // ajout du <br> pour alignement dans firefox
  if (div_exercice) {
    div_exercice.innerHTML = tagexercices
    ajout_handlers_etiquette_exo()
  }
}

//* *******

// Mise à jour du formulaire de la liste des exercices
const form_choix_des_exercices = document.getElementById('choix_des_exercices')
form_choix_des_exercices.addEventListener('change', function (e) {
  // Changement du texte
  if (e.target.value === '') {
    liste_des_exercices = []
    listeObjetsExercice = []
  } else {
    liste_des_exercices = []
    listeObjetsExercice = []
    liste_des_exercices = e.target.value.replace(/\s/g, '').replace(';', ',').split(',') // Récupère  la saisie de l'utilisateur
    // en supprimant les espaces et en remplaçant les points-virgules par des virgules.
  }
  copier_exercices_form_vers_affichage(liste_des_exercices)
  mise_a_jour_de_la_liste_des_exercices()
})

if (document.getElementById('choix_exercices_div')) {
  $('#choix_des_exercices').parent().hide()
}

async function gestion_modules (isdiaporama, listeObjetsExercice) { // besoin katex, iep, scratch
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
  let besoinScratch = false
  let besoinIEP = false
  let besoinMG32 = false
  for (let i = 0; i < listeObjetsExercice.length; i++) {
    if (listeObjetsExercice[i].typeExercice === 'MG32') {
      besoinMG32 = true
    }
  }
  if (besoinMG32) {
    loadScript('https://www.mathgraph32.org/js/mtgLoad/mtgLoad.min.js')
      .then(() => {
        // Ajoute figures MG32
        for (let i = 0; i < listeObjetsExercice.length; i++) {
          if (listeObjetsExercice[i].typeExercice === 'MG32') {
            MG32_ajouter_figure(i)
          }
        }
        MG32_tracer_toutes_les_figures()
      })
  }
  for (let i = 0; i < listeObjetsExercice.length; i++) {
    if (listeObjetsExercice[i].typeExercice === 'Scratch') {
      besoinScratch = true
    }
    if (listeObjetsExercice[i].typeExercice === 'IEP') {
      besoinIEP = true
    }
  }
  if (besoinScratch) {
    await loadScript('assets/externalJs/scratchblocks-v3.5-min.js')
    // FIXME il faudrait un try/catch pour gérer l'erreur de chargement éventuelle (avec feedback utilisateur)
    scratchTraductionFr()
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
  if (besoinIEP) {
    for (const id of window.listeAnimationsIepACharger) {
      const element = document.getElementById(`IEPContainer${id}`)
      if (!element) {
        console.error(Error(`Pas d’élément IEPContainer${id} dans le dom, chargement instrumenpoche ignoré`))
        continue
      }
      element.style.marginTop = '30px'
      const xml = window.listeScriptsIep[id]
      await iep(element, xml)
    }
  }
}

function contenu_exercice_html (obj, num_exercice, isdiaporama) {
  let contenu_un_exercice = ''
  let contenu_une_correction = ''
  let param_tooltip = ''
  if (isdiaporama) {
    contenu_un_exercice += '<section class="slider single-item" id="diaporama">'
    for (const question of obj.listeQuestions) {
      contenu_un_exercice += `\n<div id="question_diap" style="font-size:${obj.tailleDiaporama}px"><span>` + question.replace(/\\dotfill/g, '...').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....') + '</span></div>' // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
    }
    contenu_un_exercice += '<div id="question_diap" style="font-size:100px"><span>$\\text{Terminé !}$</span></div></section>'
    if (obj.typeExercice === 'MG32') {
      contenu_un_exercice += `<div id="MG32div${num_exercice - 1}" class="MG32"></div>`
    }
    contenu_une_correction += obj.contenuCorrection
    if (obj.typeExercice === 'MG32' && obj.MG32codeBase64corr) {
      contenu_une_correction += `<div id="MG32divcorr${num_exercice - 1}" class="MG32"></div>`
    }
  }
  if (!isdiaporama) {
    if (obj.typeExercice === 'dnb') {
      contenu_un_exercice += ` Exercice ${num_exercice} − DNB ${obj.mois} ${obj.annee} - ${obj.lieu} (ex ${obj.numeroExercice})</h3>`
      contenu_un_exercice += `<img width="90%" src="${obj.png}">`
      contenu_une_correction += `<h3 class="ui dividing header">Exercice ${num_exercice} − DNB ${obj.mois} ${obj.annee} - ${obj.lieu} (ex ${obj.numeroExercice},'${num_exercice - 1}')</h3>`
      contenu_une_correction += `<img width="90%" src="${obj.pngcor}">`
      obj.video = false
    } else {
      try {
        obj.nouvelleVersion(num_exercice - 1)
      } catch (error) {
        console.log(error)
      }
      if ((!obj.nbQuestionsModifiable && !obj.besoinFormulaireNumerique && !obj.besoinFormulaireTexte && !obj.qcmDisponible) || (!$('#liste_des_exercices').is(':visible') && !$('#exercices_disponibles').is(':visible'))) {
        contenu_un_exercice += `Exercice ${num_exercice} − ${obj.id} </h3>`
      } else {
        if (obj.besoinFormulaireNumerique && obj.besoinFormulaireNumerique[2]) {
          param_tooltip += (obj.besoinFormulaireNumerique[0] + ': \n' + obj.besoinFormulaireNumerique[2]) + '\n'
        }
        if (obj.besoin_formulaire2_numerique && obj.besoin_formulaire2_numerique[2]) {
          param_tooltip += (obj.besoin_formulaire2_numerique[0] + ': \n' + obj.besoin_formulaire2_numerique[2])
        }
        param_tooltip = param_tooltip ? `data-tooltip="${param_tooltip}" data-position="right center"` : ''
        contenu_un_exercice += `<span ${param_tooltip}> Exercice ${num_exercice} − ${obj.id} <i class="cog icon icone_param"></i></span></h3>`
      }
      if (obj.video.length > 3) {
        contenu_un_exercice += `<div id=video${num_exercice - 1}>` + modalYoutube(num_exercice - 1, obj.video, '', 'Aide', 'youtube') + '</div>'
      }
      if (obj.boutonAide) {
        contenu_un_exercice += `<div id=aide${num_exercice - 1}> ${obj.boutonAide}</div>`
      }
      contenu_un_exercice += obj.contenu
      if (obj.typeExercice === 'MG32') {
        contenu_un_exercice += `<div id="MG32div${num_exercice - 1}" class="MG32"></div>`
      }
      contenu_une_correction += `<h3 class="ui dividing header">Exercice ${num_exercice}</h3>`
      contenu_une_correction += obj.contenuCorrection
      if (obj.typeExercice === 'MG32' && obj.MG32codeBase64corr) {
        contenu_une_correction += `<div id="MG32divcorr${num_exercice - 1}" class="MG32"></div>`
      }
    }
  }
  return {
    contenu_un_exercice: contenu_un_exercice,
    contenu_une_correction: contenu_une_correction
  }
}

function mise_a_jour_du_code () {
  window.MG32_tableau_de_figures = []
  window.listeScriptsIep = {} // Dictionnaire de tous les scripts xml IEP
  window.listeAnimationsIepACharger = [] // Liste des id des scripts qui doivent être chargés une fois le code HTML mis à jour
  // Fixe la graine pour les fonctions aléatoires
  if (!mathalea.graine) {
    mathalea.graine = strRandom({
      includeUpperCase: true,
      includeNumbers: true,
      length: 4,
      startsWithLowerCase: false
    })
    // Saisi le numéro de série dans le formulaire
    if (document.getElementById('form_serie')) { // pas de formulaire existant si premier preview
      document.getElementById('form_serie').value = mathalea.graine
    }
  }
  // Contrôle l'aléatoire grâce à SeedRandom
  seedrandom(mathalea.graine, { global: true });
  // ajout des paramètres des exercices dans l'URL
  (function gestionURL () {
    if (liste_des_exercices.length > 0) {
      let fin_de_l_URL = ''
      if (sortieHtml && !est_diaporama && window.location.pathname.indexOf('exo.html') < 0) {
        fin_de_l_URL += 'exercice.html'
      }
      fin_de_l_URL += `?ex=${liste_des_exercices[0]}`
      if (typeof listeObjetsExercice[0].sup !== 'undefined') {
        fin_de_l_URL += `,sup=${listeObjetsExercice[0].sup}`
      }
      if (typeof listeObjetsExercice[0].sup2 !== 'undefined') {
        fin_de_l_URL += `,sup2=${listeObjetsExercice[0].sup2}`
      }
      if (typeof listeObjetsExercice[0].sup3 !== 'undefined') {
        fin_de_l_URL += `,sup3=${listeObjetsExercice[0].sup3}`
      }
      if (listeObjetsExercice[0].nbQuestionsModifiable) {
        fin_de_l_URL += `,nbQuestions=${listeObjetsExercice[0].nbQuestions}`
      }
      if (listeObjetsExercice[0].video.length > 1) {
        fin_de_l_URL += `,video=${encodeURIComponent(listeObjetsExercice[0].video)}`
      }
      for (let i = 1; i < liste_des_exercices.length; i++) {
        fin_de_l_URL += `&ex=${liste_des_exercices[i]}`
        if (typeof listeObjetsExercice[i].sup !== 'undefined') {
          fin_de_l_URL += `,sup=${listeObjetsExercice[i].sup}`
        }
        if (typeof listeObjetsExercice[i].sup2 !== 'undefined') {
          fin_de_l_URL += `,sup2=${listeObjetsExercice[i].sup2}`
        }
        if (typeof listeObjetsExercice[i].sup3 !== 'undefined') {
          fin_de_l_URL += `,sup3=${listeObjetsExercice[i].sup3}`
        }
        if (listeObjetsExercice[i].nbQuestionsModifiable) {
          fin_de_l_URL += `,nbQuestions=${listeObjetsExercice[i].nbQuestions}`
        }
        if (listeObjetsExercice[i].video.length > 1) {
          fin_de_l_URL += `,video=${encodeURIComponent(listeObjetsExercice[i].video)}`
        }
      }
      if (typeof mathalea.duree !== 'undefined') {
        fin_de_l_URL += `&duree=${mathalea.duree}`
      }
      fin_de_l_URL += `&serie=${mathalea.graine}`
      window.history.pushState('', '', fin_de_l_URL)
      const url = window.location.href.split('&serie')[0] // met l'URL dans le bouton de copie de l'URL sans garder le numéro de la série
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
  // mise en évidence des exercices sélectionnés.
  apparence_exercice_actif()
  let contenu, contenuDesExercices, contenuDesCorrections
  if (sortieHtml && est_diaporama) {
    if (liste_des_exercices.length > 0) { // Pour les diaporamas tout cacher quand un exercice est choisi
      $('#exercices_disponibles').hide()
      $('#parametres_generaux').show()
    } else {
      $('#exercices_disponibles').show()
      $('h3').show()
      $('#formulaire_choix_de_la_duree').show()
    }
    document.getElementById('exercices').innerHTML = ''
    document.getElementById('corrections').innerHTML = ''
    if (liste_des_exercices.length > 0) {
      for (let i = 0; i < liste_des_exercices.length; i++) {
        listeObjetsExercice[i].id = liste_des_exercices[i]
        try {
          listeObjetsExercice[i].nouvelleVersion(i)
        } catch (error) {
          console.log(error)
        }
        contenu = contenu_exercice_html(listeObjetsExercice[i], i + 1, true)
      }
      contenuDesExercices = contenu.contenu_un_exercice
      contenuDesCorrections = `<ol>\n${contenu.contenu_une_correction}\n</ol>`
      $('#message_liste_exercice_vide').hide()
      $('#cache').dimmer('hide')
    } else {
      $('#message_liste_exercice_vide').show() // Message au dessus de la liste des exercices
      $('#cache').dimmer('show') // Cache au dessus du code LaTeX
    }
    document.getElementById('exercices').innerHTML = contenuDesExercices
    document.getElementById('corrections').innerHTML = contenuDesCorrections
    gestion_modules(true, listeObjetsExercice)
  }

  // Ajoute le contenu dans les div #exercices et #corrections
  if (sortieHtml && !est_diaporama) {
    let scroll_level
    if (document.getElementById('right')) {
      scroll_level = document.getElementById('right').scrollTop
    }
    document.getElementById('exercices').innerHTML = ''
    document.getElementById('corrections').innerHTML = ''
    let contenuDesExercices = ''
    let contenuDesCorrections = ''
    if (liste_des_exercices.length > 0) {
      for (let i = 0; i < liste_des_exercices.length; i++) {
        // const contenu_un_exercice = ''; const contenu_une_correction = ''
        listeObjetsExercice[i].id = liste_des_exercices[i]
        contenu = contenu_exercice_html(listeObjetsExercice[i], i + 1, false)
        if ($('#liste_des_exercices').is(':visible') || $('#exercices_disponibles').is(':visible')) { // si on n'a plus la liste des exercices il ne faut plus pouvoir en supprimer (pour exercice.html et exo.html)
          if (liste_des_exercices.length === 1) {
            contenuDesExercices += `<div id="exercice${i}"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i>${contenu.contenu_un_exercice} </div>`
          } else if (i === 0) {
            contenuDesExercices += `<div id="exercice${i}"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle down icon icone_down"></i>${contenu.contenu_un_exercice} </div>`
          } else if (i === liste_des_exercices.length - 1) {
            contenuDesExercices += `<div id="exercice${i}"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle up icon icone_up"></i>${contenu.contenu_un_exercice} </div>`
          } else {
            contenuDesExercices += `<div id="exercice${i}"> <h3 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle down icon icone_down"></i><i id="${i}" class="arrow circle up icon icone_up"></i>${contenu.contenu_un_exercice} </div>`
          }
        } else {
          contenuDesExercices += `<div id="exercice${i}" class="titreExercice"> <h3 class="ui dividing header">${contenu.contenu_un_exercice} </div>`
        }
        contenuDesCorrections += `<div id="divexcorr${i}" class="titreExercice"> ${contenu.contenu_une_correction} </div>`
      }
      contenuDesExercices = `<ol>\n${contenuDesExercices}\n</ol>`
      contenuDesCorrections = `<ol>\n${contenuDesCorrections}\n</ol>`
      $('#message_liste_exercice_vide').hide()
      $('#cache').dimmer('hide')
    } else {
      $('#message_liste_exercice_vide').show() // Message au dessus de la liste des exercices
      $('#cache').dimmer('show') // Cache au dessus du code LaTeX
    }
    $('#popup_preview .icone_param').remove() // dans l'aperçu pas d'engrenage pour les paramètres.
    document.getElementById('exercices').innerHTML = contenuDesExercices
    if (scroll_level) {
      document.getElementById('right').scrollTop = scroll_level
    }
    document.getElementById('corrections').innerHTML = contenuDesCorrections
    gestion_modules(false, listeObjetsExercice)
  }
  if (!sortieHtml) {
    // Sortie LaTeX
    // code pour la sortie LaTeX
    let codeEnonces = ''
    let codeCorrections = ''
    const length_liste_exercices = liste_des_exercices.length
    codeLatex = ''
    listePackages = new Set()
    if (length_liste_exercices > 0) {
      for (let i = 0; i < length_liste_exercices; i++) {
        listeObjetsExercice[i].id = liste_des_exercices[i] // Pour récupérer l'id qui a appelé l'exercice
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
                        codeEnonces + '\n\n%%%%%%%%%%%%%%%%%%%%%%\n%%%   CORRECTION   %%%\n%%%%%%%%%%%%%%%%%%%%%%\n\n\\newpage\n\\begin{correction}\n\n' + codeCorrections + '\\end{correction}'
      }
      $('#message_liste_exercice_vide').hide()
      copier_exercices_form_vers_affichage(liste_des_exercices)
      $('#cache').show()

      // Gestion du nombre de versions
      if ($('#nombre_de_versions').val() > 1) {
        codeLatex = ''
        let code_exercices = ''
        let code_correction = ''
        for (let v = 0; v < $('#nombre_de_versions').val(); v++) {
          code_exercices += '\\version{' + (v + 1) + '}\n\n'
          code_correction += '\n\n\\newpage\n\\version{' + (v + 1) + '}\n\\begin{correction}'
          for (let i = 0; i < liste_des_exercices.length; i++) {
            listeObjetsExercice[i].nouvelleVersion()
            code_exercices += listeObjetsExercice[i].contenu
            code_exercices += '\n\n'
            code_correction += listeObjetsExercice[i].contenuCorrection
            code_correction += '\n\n'
          }
          if (v < $('#nombre_de_versions').val() - 1) {
            if ($('#style_classique:checked').val()) {
              code_exercices += '\n\\newpage\n\\setcounter{exo}{0}\n'
            } else {
              code_exercices += '\n\\newpage\n\\setcounter{section}{0}\n'
            }
          }
          code_correction += '\n\\end{correction}'
        }
        codeLatex = code_exercices + code_correction
      }
      div.innerHTML = '<pre><code class="language-latex">' + codeLatex + '</code></pre>'
      Prism.highlightAllUnder(div) // Met à jour la coloration syntaxique
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
  }

  if (!sortieHtml) {
    // Gestion du téléchargement
    $('#btn_telechargement').off('click').on('click', function () {
      // Gestion du style pour l'entête du fichier
      let contenu_fichier = `
    
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
        contenu_fichier += '\\documentclass[a4paper,11pt,fleqn]{article}\n'
        contenu_fichier += `\\input{preambule}\n\\pagestyle{fancy}\n\\renewcommand{\\headrulewidth}{1pt}\n\\fancyhead[C]{${$('#entete_du_fichier').val()}}\n\\fancyhead[L]{}`
        contenu_fichier += '\\fancyhead[R]{}\n\\renewcommand{\\footrulewidth}{1pt}\n\\fancyfoot[C]{}\n\\fancyfoot[L]{}\n\\fancyfoot[R]{}\n\n'
        contenu_fichier += '\\begin{document}\n\n' + codeLatex + '\n\n\\end{document}'
      } else {
        contenu_fichier += '\\documentclass[a4paper,11pt,fleqn]{article}\n\\input{preambule_coop}\n'
        contenu_fichier += '\\theme{' + $('input[name=theme]:checked').val() + '}{' + $('#entete_du_fichier').val() + '}'
        contenu_fichier += '{' + $('#items').val() + '}{' + $('#domaine').val() + '}\n\\begin{document}\n\n' + codeLatex
        contenu_fichier += '\n\n\\end{document}'
      }

      if ($('#nom_du_fichier').val()) {
        telechargeFichier(contenu_fichier, $('#nom_du_fichier').val() + '.tex')
      } else {
        telechargeFichier(contenu_fichier, 'mathalea.tex')
      }
    })

    $('#btn_overleaf').off('click').on('click', function () {
      // Gestion du style pour l'entête du fichier

      let contenu_fichier = `
    
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    % Document généré avec MathALEA sous licence CC-BY-SA
    %
    % ${window.location.href}
    %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    
    `

      if ($('#style_classique:checked').val()) {
        contenu_fichier += introLatex($('#entete_du_fichier').val(), listePackages) + codeLatex + '\n\n\\end{document}'
      } else {
        contenu_fichier += introLatexCoop(listePackages)
        contenu_fichier += '\n\n\\theme{' + $('input[name=theme]:checked').val() + '}{' + $('#entete_du_fichier').val() + '}'
        contenu_fichier += '{' + $('#items').val() + '}{' + $('#domaine').val() + '}\n\\begin{document}\n\n' + codeLatex
        contenu_fichier += '\n\n\\end{document}'
      }

      // Gestion du LaTeX statique

      // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

      $('input[name=encoded_snip]').val(encodeURIComponent(contenu_fichier))
      if (listePackages.has('dnb')) { // Force le passage à xelatex sur Overleaf pour les exercices de DNB
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

  // cg 04/2021 : icone_parmètres fait le focus sur les parmètres correspondant à l'exercice
  $('.icone_param').off('click').on('click', function (e) {
    $('#accordeon_parametres >div').addClass('active')
    const num_ex = event.target.parentElement.parentElement.parentElement.id
    $(`.${num_ex} + div :input`).focus()
  })
  // cg 04-2021 possibilité de manipuler la liste des exercices via les exercices.

  $('.icone_moins').off('click').on('click', function (e) {
    supprimerExo(event.target.id)
  })

  function monterExo (num) {
    const form_choix_des_exercices = document.getElementById('choix_des_exercices')
    liste_des_exercices = form_choix_des_exercices.value.replace(/\s/g, '').replace(';', ',').split(',')
    num = parseInt(num)
    if (num !== 0) {
      [liste_des_exercices[num - 1], liste_des_exercices[num]] = [liste_des_exercices[num], liste_des_exercices[num - 1]]
      form_choix_des_exercices.value = liste_des_exercices.toString()
      copier_exercices_form_vers_affichage(liste_des_exercices)
      mise_a_jour_de_la_liste_des_exercices()
    }
  }

  $('.icone_up').off('click').on('click', function (e) {
    monterExo(event.target.id)
  })

  function descendreExo (num) {
    const form_choix_des_exercices = document.getElementById('choix_des_exercices')
    liste_des_exercices = form_choix_des_exercices.value.replace(/\s/g, '').replace(';', ',').split(',')
    num = parseInt(num)
    if (num !== liste_des_exercices.length - 1) {
      [liste_des_exercices[num], liste_des_exercices[num + 1]] = [liste_des_exercices[num + 1], liste_des_exercices[num]]
      form_choix_des_exercices.value = liste_des_exercices.toString()
      copier_exercices_form_vers_affichage(liste_des_exercices)
      mise_a_jour_de_la_liste_des_exercices()
    }
  }

  $('.icone_down').off('click').on('click', function (e) {
    descendreExo(event.target.id)
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
     *
     */
function mise_a_jour_de_la_liste_des_exercices (preview) {
  let besoinXCas = false
  const promises = []
  const liste_exercices = liste_des_exercices
  if (preview) {
    liste_exercices.push(preview)
  }
  listeObjetsExercice = []
  for (let i = 0, id; i < liste_exercices.length; i++) {
    id = liste_exercices[i]
    let url
    try {
      url = dictionnaireDesExercices[id].url
    } catch (error) {
      console.log(error)
      console.log(`Exercice ${id} non disponible`)
    }
    if (dictionnaireDesExercices[id].typeExercice === 'dnb') {
      listeObjetsExercice[i] = dictionnaireDesExercices[id]
      promises.push(
        fetch(url)
          .then(response => response.text())
          .then(data => {
            listeObjetsExercice[i].nbQuestionsModifiable = false
            listeObjetsExercice[i].video = ''
            listeObjetsExercice[i].titre = id
            listeObjetsExercice[i].contenu = data
          })
      )
      promises.push(
        fetch(dictionnaireDesExercices[id].urlcor)
          .then(response => response.text())
          .then(data => {
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
        import(/* webpackMode: "lazy" */ './exercices/' + path)
          .catch((error) => {
            console.log(error)
            listeObjetsExercice[i] = { titre: "Cet exercice n'existe pas", contenu: '', contenuCorrection: '' } // Un exercice vide pour l'exercice qui n'existe pas
          })
          .then((module) => {
            if (module) {
              listeObjetsExercice[i] = new module.default() // Ajoute l'objet dans la liste des
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
            }
          })
      )
    }
  }
  Promise.all(promises)
    .then(() => {
      if (!preview) {
        parametres_exercice(listeObjetsExercice)
      }
    })
    .then(() => {
      if (!preview) {
        // Récupère les paramètres passés dans l'URL
        const urlVars = getUrlVars()
        // trier et mettre de côté les urlvars qui ne sont plus dans la liste des exercices
        // => évite les erreurs lors de la suppression de question dans la liste.
        for (let i = 0; i < urlVars.length; i++) {
          if (urlVars[i].id !== liste_exercices[i]) {
            urlVars.splice(i, 1)
          }
        }
        for (let i = 0; i < urlVars.length; i++) {
          // récupère les éventuels paramètres dans l'URL
          // et les recopie dans les formulaires des paramètres
          if (urlVars[i].nbQuestions && listeObjetsExercice[i].nbQuestionsModifiable) {
            listeObjetsExercice[i].nbQuestions = urlVars[i].nbQuestions
            form_nbQuestions[i].value = listeObjetsExercice[i].nbQuestions
          }
          if (urlVars[i].video && sortieHtml && !est_diaporama) {
            listeObjetsExercice[i].video = decodeURIComponent(urlVars[i].video)
            form_video[i].value = listeObjetsExercice[i].video
          }
          if (typeof urlVars[i].sup !== 'undefined') {
            listeObjetsExercice[i].sup = urlVars[i].sup
            // Un exercice avec un this.sup mais pas de formulaire pouvait poser problème
            try {
              form_sup[i].value = listeObjetsExercice[i].sup
            } catch {
            }
          }
          if (typeof urlVars[i].sup2 !== 'undefined') {
            listeObjetsExercice[i].sup2 = urlVars[i].sup2
            try {
              form_sup2[i].value = listeObjetsExercice[i].sup2
            } catch (error) {
            }
          }
          if (typeof urlVars[i].sup3 !== 'undefined') {
            listeObjetsExercice[i].sup3 = urlVars[i].sup3
            try {
              form_sup3[i].value = listeObjetsExercice[i].sup3
            } catch (error) {

            }
          }
        }
      }
    })
    .then(() => {
      if (besoinXCas) {
        // On charge le javascript de XCas
        let div // le div dans lequel on fera apparaitre le cercle de chargement
        if (sortieHtml) {
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
        return loadScript('/assets/externalJs/giacsimple.js')
      }
    })
    .then(() => {
      if (besoinXCas) {
        // On vérifie que le code WebAssembly est bien chargé en mémoire et disponible
        return checkXCas()
      }
    })
    .then(() => {
      if (preview) {
        const output = sortieHtml
        sortieHtml = true // pour que l'aperçu fonctionne dans mathalealatex besoin d'avoir l'exercice en mode html
        try {
          listeObjetsExercice[liste_exercices.length - 1].nouvelleVersion(0)
        } catch (error) {
          console.log(error)
        }
        listeObjetsExercice[liste_exercices.length - 1].id = liste_exercices[liste_exercices.length - 1]
        const contenu = contenu_exercice_html(listeObjetsExercice[liste_exercices.length - 1], liste_exercices.length, false)
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
        liste_des_exercices.pop()
        if (!output) {
          gestion_modules(false, listeObjetsExercice)
        }
        sortieHtml = output
        mise_a_jour_du_code() // permet de gérer les popup avec module.
      } else {
        mise_a_jour_du_code()
      }
    })
}

const checkXCas = () => {
  return new Promise((resolve, reject) => {
    const monInterval = setInterval(() => {
      if (typeof (Module) !== 'undefined') {
        if (Module.ready === true) {
          resolve()
          clearInterval(monInterval)
        }
      }
    }, 500)
  })
}

// GESTION DE MG32
/**
    * Récupère le code JS d'un exercice qui modifie les valeurs d'une figure MG32 et actualise la figure
    * @Auteur Rémi Angot
    */
function MG32_modifie_figure (numero_figure) {
  let code_pour_modifier_la_figure = listeObjetsExercice[numero_figure].MG32code_pour_modifier_la_figure
  if (window.mtg32App.docs.length === 1) {
    code_pour_modifier_la_figure = code_pour_modifier_la_figure.replace('display', 'updateDisplay')
  }
  // eslint-disable-next-line no-new-func
  const modification = new Function('numero_figure', code_pour_modifier_la_figure)
  modification(numero_figure)
}

/**
    * Actualise toutes les figures MG32 avec les nouvelles valeurs
    * @Auteur Rémi Angot
    */
function MG32_modifie_toutes_les_figures () {
  for (let i = 0; i < liste_des_exercices.length; i++) {
    if (listeObjetsExercice[i].typeExercice === 'MG32') {
      MG32_modifie_figure(i)
    }
  }
}

/**
    * Ajoute une figure MG32 dans le code HTML de la page
    * @Auteur Rémi Angot
    */
function MG32_ajouter_figure (numeroExercice) {
  if (window.mtg32App) {
    for (let i = 0; i < mtg32App.docs.length; i++) {
      mtg32App.removeDoc(mtg32App.docs[i].idDoc)
    }
  }
  MG32_tableau_de_figures.push(
    // pour chaque figure on précise ici ses options
    {
      idContainer: `MG32div${numeroExercice}`,
      svgOptions: {
        width: `${listeObjetsExercice[numeroExercice].dimensionsDivMg32[0]}`,
        height: `${listeObjetsExercice[numeroExercice].dimensionsDivMg32[1]}`,
        idSvg: `MG32svg${numeroExercice}`
      },
      mtgOptions: {
        fig: listeObjetsExercice[numeroExercice].MG32codeBase64,
        isEditable: listeObjetsExercice[numeroExercice].mg32Editable
      }
    }
  )

  if (listeObjetsExercice[numeroExercice].MG32codeBase64corr) {
    MG32_tableau_de_figures.push(
      // pour chaque figure on précise ici ses options
      {
        idContainer: `MG32divcorr${numeroExercice}`,
        svgOptions: {
          width: `${listeObjetsExercice[numeroExercice].dimensionsDivMg32[0]}`,
          height: `${listeObjetsExercice[numeroExercice].dimensionsDivMg32[1]}`,
          idSvg: `MG32svgcorr${numeroExercice}`
        },
        mtgOptions: {
          fig: listeObjetsExercice[numeroExercice].MG32codeBase64corr,
          isEditable: false
        }
      }
    )
  }
}

/**
    * Pour chaque figure on récupère une promesse de chargement,
    * on lance tout en parallèle,
    * et quand toutes seront résolues on continue
    * @Auteur Rémi Angot
    */
function MG32_tracer_toutes_les_figures () {
  (function verifie_div_MG32 () {
    const el = document.getElementsByClassName('MG32')
    // Sélectionne les div de classe MG32
    if (el.length) { // S'ils existent, on peut appeler MG32
      Promise.all(MG32_tableau_de_figures.map(({ idContainer, svgOptions, mtgOptions }) => mtgLoad(idContainer, svgOptions, mtgOptions)))
        .then(results => {
          // results est le tableau des valeurs des promesses résolues, avec la même instance du player pour chacune, la 1re valeur nous suffit donc
          window.mtg32App = results[0]
          // on peut l'utiliser…
          MG32_modifie_toutes_les_figures()
        })
        .catch(error => console.error(error))
    } else {
      setTimeout(verifie_div_MG32, 300) // retente dans 300 milliseconds
    }
  })()
}

// FIN DE GESTION DE MG32

// Gestion des paramètres
const div = document.getElementById('div_codeLatex') // Récupère le div dans lequel le code va être affiché
// const div_overleaf = document.getElementById('overleaf') // Récupère le div dans lequel le code va être affiché
const div_parametres_generaux = document.getElementById('parametres_generaux') // Récupère le div dans lequel seront inscrit les paramètres
const form_consigne = []
const form_nbQuestions = []
const form_video = []
const form_correctionDetaillee = []
const form_nbCols = []
const form_nbColsCorr = []
const form_spacing = []
const form_spacingCorr = []
const form_sup = []
const form_sup2 = []
const form_sup3 = []
const form_modeQcm = [] // Création de tableaux qui recevront les éléments HTML de chaque formulaires

function parametres_exercice (exercice) {
  /* Pour l'exercice i, on rajoute un formulaire avec 5 inputs :
        nombre de questions, nombre de colonnes,nombre de colonnes dans le corrigé,
        espacement et espacement dans le corrigé.
        Les réponses modifient les caractéristiques de l'exercice puis le code LaTeX est mis à jour
        */
  div_parametres_generaux.innerHTML = '' // Vide le div parametres_generaux
  if (exercice.length > 0) {
    div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'

    div_parametres_generaux.innerHTML += `<div><label for="form_serie">Clé de la série d'exercice : </label> <input id="form_serie" type="text" style="padding: 5px;
  border: 1px solid #ccc;border-radius: 4px;"></div>`
  }

  for (let i = 0; i < exercice.length; i++) {
    if (sortieHtml) {
      div_parametres_generaux.innerHTML += '<h4 class="ui dividing header exercice' + i + '">Exercice n°' + (i + 1) + ' : ' + exercice[i].titre + ' − ' + liste_des_exercices[i] + '</h4>'
      if (exercice[i].pasDeVersionLatex) {
        div_parametres_generaux.innerHTML += "<p><em>Cet exercice n'a pas de version LaTeX et ne peut donc pas être exporté en PDF.</em></p>"
      }
      if (exercice[i].nbQuestionsModifiable) {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_nbQuestions' + i + '">Nombre de questions : </label> <input id="form_nbQuestions' + i + '" type="number"  min="1" max="99"></div>'
      }
      if (!est_diaporama) {
        div_parametres_generaux.innerHTML += '<div><label for="form_video' + i + '" data-tooltip="URL, code iframe, identifiant YouTube" data-inverted="" >Vidéo ou complément numérique : <input id="form_video' + i + '" type="texte" size="20"  ></label></div>'
      }
      if (exercice[i].correctionDetailleeDisponible) {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_correctionDetaillee' + i + '">Correction détaillée : </label> <input id="form_correctionDetaillee' + i + '" type="checkbox" ></div>'
      }
      if (exercice[i].qcmDisponible) {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_modeQcm' + i + '">Mode QCM : </label> <input id="form_modeQcm' + i + '" type="checkbox" ></div>'
      }

      if (!exercice[i].nbQuestionsModifiable && !exercice[i].correctionDetailleeDisponible && !exercice[i].besoinFormulaireNumerique && !exercice[i].besoinFormulaireTexte && !exercice[i].qcmDisponible) {
        div_parametres_generaux.innerHTML += '<p><em>Cet exercice ne peut pas être paramétré.</em></p>'
      }
    } else {
      div_parametres_generaux.innerHTML += '<h4 class="ui dividing header">Exercice n°' + (i + 1) + ' : ' + exercice[i].titre + '</h4>'

      if (exercice[i].consigneModifiable) {
        div_parametres_generaux.innerHTML += '<div><label for="form_consigne' + i + '">Consigne : </label> <input id="form_consigne' + i + '" type="texte" size="20"></div>'
      }
      if (exercice[i].nbQuestionsModifiable) {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_nbQuestions' + i + '">Nombre de questions : </label> <input id="form_nbQuestions' + i + '" type="number"  min="1" max="99"></div>'
      }
      if (exercice[i].correctionDetailleeDisponible) {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_correctionDetaillee' + i + '">Correction détaillée : </label> <input id="form_correctionDetaillee' + i + '" type="checkbox" ></div>'
      }
      if (exercice[i].qcmDisponible) {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_modeQcm' + i + '">Mode QCM : </label> <input id="form_modeQcm' + i + '" type="checkbox" ></div>'
      }
      if (exercice[i].nbColsModifiable) {
        div_parametres_generaux.innerHTML += '<div><label for="form_nbCols' + i + '">Nombre de colonnes : </label><input id="form_nbCols' + i + '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].nbColsCorrModifiable) {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_nbColsCorr' + i + '">Nombre de colonnes dans la correction : </label><input id="form_nbColsCorr' + i + '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].spacingModifiable) {
        div_parametres_generaux.innerHTML += '<div><label for="form_nbColsCorr' + i + '">Espacement : </label><input id="form_spacing' + i + '" type="number" min="1" max="99"></div>'
      }
      if (exercice[i].spacingCorrModifiable) {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_nbColsCorr' + i + '">Espacement dans la correction : </label><input id="form_spacingCorr' + i + '" type="number" min="1" max="99"></div>'
      }

      // Si le nombre de versions changent
      $('#nombre_de_versions').change(function () {
        mise_a_jour_du_code()
      })
    }

    // Si un formulaire supplémentaire est défini dans l'exercice alors on l'ajoute
    if (exercice[i].besoinFormulaireNumerique || exercice[i].besoinFormulaireTexte) {
      // Ajout du titre pour les réglages supplémentaires
      div_parametres_generaux.innerHTML += "<h4 class='ui dividing header'></h4>"
    }

    if (exercice[i].besoinFormulaireNumerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoinFormulaireNumerique[2]) {
        // Si un tooltip est défini
        div_parametres_generaux.innerHTML +=
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
        div_parametres_generaux.innerHTML +=
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
      div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup" +
                    i +
                    "'>" +
                    exercice[i].besoinFormulaireTexte[0] +
                    " : </label><div style='display: inline' data-tooltip='" +
                    exercice[i].besoinFormulaireTexte[1] +
                    "' data-inverted=''><input id='form_sup" +
                    i +
                    "' type='text' size='20' ></div></div>"
    }

    if (exercice[i].besoin_formulaire_long_texte) {
      // Création d'un long formulaire de texte
      div_parametres_generaux.innerHTML +=
                    "<label for='form_sup" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire_long_texte[0] +
                    " : </label> <div style='display: inline' data-tooltip='" +
                    exercice[i].besoin_formulaire_long_texte[1] +
                    "' data-inverted=''><textarea id='form_sup" +
                    i +
                    "'></textarea></div>"
      div_parametres_generaux.innerHTML += `<div class="ui form">
<div class="field">
<label>Text</label>
<textarea></textarea>
</div>
</div>`
    }

    if (exercice[i].besoinFormulaireCaseACocher) {
      // Création d'un formulaire texte
      div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup" +
                    i +
                    "'>" +
                    exercice[i].besoinFormulaireCaseACocher[0] +
                    " : </label><input id='form_sup" +
                    i +
                    "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoin_formulaire2_case_a_cocher) {
      // Création d'un formulaire texte
      div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup2" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire2_case_a_cocher[0] +
                    " : </label><input id='form_sup2" +
                    i +
                    "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoin_formulaire2_numerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoin_formulaire2_numerique[2]) {
        // Si un tooltip est défini
        div_parametres_generaux.innerHTML +=
                        '<div data-tooltip="' +
                        exercice[i].besoin_formulaire2_numerique[2] +
                        '"" data-inverted="" data-position="top left"><label for="form_sup2' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire2_numerique[0] +
                        ' : </label><input id="form_sup2' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire2_numerique[1] +
                        '"></div>'
      } else {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_sup2' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire2_numerique[0] +
                        ' : </label><input id="form_sup2' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire2_numerique[1] +
                        '"></div>'
      }
    }

    if (exercice[i].besoin_formulaire2_texte) {
      // Création d'un formulaire texte
      div_parametres_generaux.innerHTML +=
                    "<p></p><div style='display: inline'><label for='form_sup2" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire2_texte[0] +
                    " : </label><div style='display: inline' data-tooltip='" +
                    exercice[i].besoin_formulaire2_texte[1] +
                    "' data-inverted=''><input id='form_sup2" +
                    i +
                    "' type='text' size='20' ></div></div>"
    }

    if (exercice[i].besoin_formulaire3_case_a_cocher) {
      // Création d'un formulaire texte
      div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup3" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire3_case_a_cocher[0] +
                    " : </label><input id='form_sup3" +
                    i +
                    "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoin_formulaire3_numerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoin_formulaire3_numerique[2]) {
        // Si un tooltip est défini
        div_parametres_generaux.innerHTML +=
                        '<div data-tooltip="' +
                        exercice[i].besoin_formulaire3_numerique[2] +
                        '"" data-inverted="" data-position="top left"><label for="form_sup3' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire3_numerique[0] +
                        ' : </label><input id="form_sup3' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire3_numerique[1] +
                        '"></div>'
      } else {
        div_parametres_generaux.innerHTML +=
                        '<div><label for="form_sup3' +
                        i +
                        '">' +
                        exercice[i].besoin_formulaire3_numerique[0] +
                        ' : </label><input id="form_sup3' +
                        i +
                        '" type="number"  min="1" max="' +
                        exercice[i].besoin_formulaire3_numerique[1] +
                        '"></div>'
      }
    }

    if (exercice[i].besoin_formulaire3_texte) {
      // Création d'un formulaire texte
      div_parametres_generaux.innerHTML +=
                    "<p></p><div style='display: inline'><label for='form_sup3" +
                    i +
                    "'>" +
                    exercice[i].besoin_formulaire3_texte[0] +
                    " : </label><div style='display: inline' data-tooltip='" +
                    exercice[i].besoin_formulaire3_texte[1] +
                    "' data-inverted=''><input id='form_sup3" +
                    i +
                    "' type='text' size='20' ></div></div>"
    }
  }

  for (let i = 0; i < exercice.length; i++) {
    if (!sortieHtml) {
      // Les paramètres à ne gérer que pour la version LaTeX
      // Gestion de la consigne
      if (exercice[i].consigneModifiable) {
        form_consigne[i] = document.getElementById('form_consigne' + i)
        form_consigne[i].value = exercice[i].consigne // Rempli le formulaire avec la consigne
        form_consigne[i].addEventListener('change', function (e) {
          // Dès que le texte change, on met à jour
          exercice[i].consigne = e.target.value
          mise_a_jour_du_code()
        })
      }

      // Gestion du nombre de la correction détaillée
      if (exercice[i].correctionDetailleeDisponible) {
        form_correctionDetaillee[i] = document.getElementById('form_correctionDetaillee' + i)
        form_correctionDetaillee[i].checked = exercice[i].correctionDetaillee // Rempli le formulaire avec la valeur par défaut
        form_correctionDetaillee[i].addEventListener('change', function (e) {
          // Dès que le statut change, on met à jour
          exercice[i].correctionDetaillee = e.target.checked
          mise_a_jour_du_code()
        })
      }

      // Gestion du nombre de colones
      if (exercice[i].nbColsModifiable) {
        form_nbCols[i] = document.getElementById('form_nbCols' + i)
        form_nbCols[i].value = exercice[i].nbCols // Rempli le formulaire avec le nombre de colonnes
        form_nbCols[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].nbCols = e.target.value
          mise_a_jour_du_code()
        })
      }

      // Gestion du nombre de colones dans la correction
      if (exercice[i].nbColsCorrModifiable) {
        form_nbColsCorr[i] = document.getElementById('form_nbColsCorr' + i)
        form_nbColsCorr[i].value = exercice[i].nbColsCorr // Rempli le formulaire avec le nombre de colonnes de la correction
        form_nbColsCorr[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].nbColsCorr = e.target.value
          mise_a_jour_du_code()
        })
      }

      // Gestion de l'espacement
      if (exercice[i].spacingModifiable) {
        form_spacing[i] = document.getElementById('form_spacing' + i)
        form_spacing[i].value = exercice[i].spacing // Rempli le formulaire avec le nombre de colonnes de la correction
        form_spacing[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].spacing = e.target.value
          mise_a_jour_du_code()
        })
      }

      // Gestion de l'espacement dans la correction
      if (exercice[i].spacingCorrModifiable) {
        form_spacingCorr[i] = document.getElementById('form_spacingCorr' + i)
        form_spacingCorr[i].value = exercice[i].spacingCorr // Rempli le formulaire avec le nombre de colonnes de la correction
        form_spacingCorr[i].addEventListener('change', function (e) {
          // Dès que le nombre change, on met à jour
          exercice[i].spacingCorr = e.target.value
          mise_a_jour_du_code()
        })
      }

      // Gestion de la suppression de la correction
      const form_correction_affichee = document.getElementById('supprimer_correction')
      form_correction_affichee.addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        mise_a_jour_du_code()
      })

      // Gestion du mode N&B pour les remplissages
      const form_ModeNB = document.getElementById('ModeNB')
      form_ModeNB.addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        if ($('#ModeNB:checked').val()) {
          mathalea.sortieNB = true
        } else {
          mathalea.sortieNB = false
        }
        mise_a_jour_du_code()
      })

      // Gestion de la suppression des identifiants
      const form_supprimer_reference = document.getElementById('supprimer_reference')
      form_supprimer_reference.addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        // nouvelles_donnees();
        mise_a_jour_du_code()
      })

      // Gestion du changement de style
      const btn_radio_style_classique = document.getElementById('style_classique')
      btn_radio_style_classique.addEventListener('change', mise_a_jour_du_code)
      const btn_radio_style_CoopMaths = document.getElementById('style_CoopMaths')
      btn_radio_style_CoopMaths.addEventListener('change', mise_a_jour_du_code)
    }

    // Gestion du nombre de questions
    if (exercice[i].nbQuestionsModifiable) {
      form_nbQuestions[i] = document.getElementById('form_nbQuestions' + i)
      form_nbQuestions[i].value = exercice[i].nbQuestions // Rempli le formulaire avec le nombre de questions
      form_nbQuestions[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].nbQuestions = e.target.value
        mise_a_jour_du_code()
      })
    }

    // Gestion de la vidéo
    if (sortieHtml && !est_diaporama) {
      form_video[i] = document.getElementById('form_video' + i)
      form_video[i].value = exercice[i].video // Rempli le formulaire
      form_video[i].addEventListener('change', function (e) {
        // Dès que ça change, on met à jour
        exercice[i].video = e.target.value
        mise_a_jour_du_code()
      })
    }

    // Gestion de la correction détaillée
    if (exercice[i].correctionDetailleeDisponible) {
      form_correctionDetaillee[i] = document.getElementById('form_correctionDetaillee' + i)
      form_correctionDetaillee[i].checked = exercice[i].correctionDetaillee // Rempli le formulaire avec la valeur par défaut
      form_correctionDetaillee[i].addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        exercice[i].correctionDetaillee = e.target.checked
        mise_a_jour_du_code()
      })
    }

    // Gestion du mode QCM
    if (exercice[i].qcmDisponible) {
      form_modeQcm[i] = document.getElementById('form_modeQcm' + i)
      form_modeQcm[i].checked = exercice[i].modeQcm // Rempli le formulaire avec la valeur par défaut
      form_modeQcm[i].addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        exercice[i].modeQcm = e.target.checked
        mise_a_jour_du_code()
      })
    }
    // Gestion de l'identifiant de la série
    if (exercice.length > 0) {
      const form_serie = document.getElementById('form_serie')
      form_serie.value = mathalea.graine // Rempli le formulaire avec la graine
      form_serie.addEventListener('change', function (e) {
        // Dès que le statut change, on met à jour
        mathalea.graine = e.target.value
        mise_a_jour_du_code()
      })
    }

    // Gestion des paramètres supplémentaires s'ils existent

    if (exercice[i].besoinFormulaireTexte) {
      form_sup[i] = document.getElementById('form_sup' + i)
      form_sup[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup = e.target.value // Récupère  la saisie de l'utilisateur
          mise_a_jour_du_code()
        }
      })

      form_sup[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup = e.target.value
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoin_formulaire_long_texte) {
      form_sup[i] = document.getElementById('form_sup' + i)
      form_sup[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup = e.target.value // Récupère  la saisie de l'utilisateur
          mise_a_jour_du_code()
        }
      })

      form_sup[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup = e.target.value
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoinFormulaireNumerique) {
      form_sup[i] = document.getElementById('form_sup' + i)
      form_sup[i].value = exercice[i].sup // Rempli le formulaire avec le paramètre supplémentaire
      form_sup[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup = e.target.value
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoinFormulaireCaseACocher) {
      form_sup[i] = document.getElementById('form_sup' + i)
      form_sup[i].checked = exercice[i].sup // Rempli le formulaire avec le paramètre supplémentaire
      form_sup[i].addEventListener('change', function (e) {
        //
        exercice[i].sup = e.target.checked
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoin_formulaire2_case_a_cocher) {
      form_sup2[i] = document.getElementById('form_sup2' + i)
      form_sup2[i].checked = exercice[i].sup2 // Rempli le formulaire avec le paramètre supplémentaire
      form_sup2[i].addEventListener('change', function (e) {
        //
        exercice[i].sup2 = e.target.checked
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoin_formulaire2_numerique) {
      form_sup2[i] = document.getElementById('form_sup2' + i)
      form_sup2[i].value = exercice[i].sup2 // Rempli le formulaire avec le paramètre supplémentaire
      form_sup2[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup2 = e.target.value
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoin_formulaire2_texte) {
      form_sup2[i] = document.getElementById('form_sup2' + i)
      form_sup2[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup2 = e.target.value // Récupère  la saisie de l'utilisateur
          mise_a_jour_du_code()
        }
      })

      form_sup2[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup2 = e.target.value
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoin_formulaire3_case_a_cocher) {
      form_sup3[i] = document.getElementById('form_sup3' + i)
      form_sup3[i].checked = exercice[i].sup3 // Rempli le formulaire avec le paramètre supplémentaire
      form_sup3[i].addEventListener('change', function (e) {
        //
        exercice[i].sup3 = e.target.checked
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoin_formulaire3_numerique) {
      form_sup3[i] = document.getElementById('form_sup3' + i)
      form_sup3[i].value = exercice[i].sup3 // Rempli le formulaire avec le paramètre supplémentaire
      form_sup3[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup3 = e.target.value
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoin_formulaire3_texte) {
      form_sup3[i] = document.getElementById('form_sup3' + i)
      form_sup3[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode === 13) {
          exercice[i].sup3 = e.target.value // Récupère  la saisie de l'utilisateur
          mise_a_jour_du_code()
        }
      })

      form_sup3[i].addEventListener('blur', function (e) {
        // Perte du focus
        exercice[i].sup3 = e.target.value
        mise_a_jour_du_code()
      })
    }
  }
}

// Initialisation de la page
window.addEventListener('DOMContentLoaded', () => {
  $('.ui.dropdown').dropdown() // Pour le menu des exercices
  $('.ui.accordion').accordion('refresh')
  $('.ui.checkbox').checkbox()
  // Gestion du bouton de copie
  $('.ui.button.toggle').state() // initialise le bouton

  // Gestion du bouton « Nouvelles données »
  const btn_mise_a_jour_code = document.getElementById('btn_mise_a_jour_code')
  if (btn_mise_a_jour_code) {
    btn_mise_a_jour_code.addEventListener('click', nouvelles_donnees)
  }
  function nouvelles_donnees () {
    mathalea.graine = strRandom({
      includeUpperCase: true,
      includeNumbers: true,
      length: 4,
      startsWithLowerCase: false
    })
    document.getElementById('form_serie').value = mathalea.graine // mise à jour du formulaire
    mise_a_jour_du_code()
  }

  if (sortieHtml && !est_diaporama) {
    // Gestion du bouton de zoom
    // let zoom = 1
    // $('#btn_zoom_plus').click(function () {
    //   zoom += 0.5
    //   $('#affichage_exercices').css('transform', `scale(${zoom})`)
    //   $('#affichage_exercices').css('transform-origin', '0 0px')
    // })
    // $('#btn_zoom_moins').click(function () {
    //   if (zoom > 1) {
    //     zoom -= 0.5
    //   }
    //   $('#affichage_exercices').css('transform', `scale(${zoom})`)
    //   $('#affichage_exercices').css('transform-origin', '0 0px')
    // })

    let taille = parseInt($('#affichage_exercices').css('font-size'))
    let lineHeight = parseInt($('#affichage_exercices').css('line-height'))
    $('#btn_zoom_plus').click(function () {
      taille *= 1.2
      lineHeight *= 1.2
      $('#affichage_exercices').css('font-size', `${taille}px`)
      $('#affichage_exercices').css('line-height', `${lineHeight}px`)
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
      $('#affichage_exercices').find('h3').css('font-size', `${taille}px`)
      $('#affichage_exercices').find('h4').css('font-size', `${taille}px`)
      $('.mathalea2d').css('width', parseFloat($('.mathalea2d').css('width')) * 0.8)
      $('.mathalea2d').css('height', parseFloat($('.mathalea2d').css('height')) * 0.8)
    })
  }

  // Gestion de la redirection vers MathaleaLaTeX
  $('#btnLaTeX').click(function () {
    window.location.href = window.location.href.replace('exercice.html', 'mathalealatex.html')
  })

  // handlers pour la prévisualisation des exercices cg 04-20201
  function afficher_popup () {
    if ($('.popuptext').is(':visible')) {
      $('.popuptext').empty()
      $('.popuptext').hide()
    } else {
      mise_a_jour_de_la_liste_des_exercices(event.target.id)
    }
  }

  $('.popup').off('click').on('click', function (e) {
    event.stopPropagation()
    afficher_popup()
  })

  $(document).click(function (event) {
    if ($('.popuptext').is(':visible') || !$(event.target).hasClass('poppup') || !$(event.target).hasClass('icone_ppreview')) {
      $('.popuptext').hide()
      $('.popuptext').empty()
      $('.icone_preview').off('click').on('click', function (e) {
        $('.popup').trigger('click')
      })
    }
  })

  $('#exo_plein_ecran').click(function (event) {
    if ($('#exo_plein_ecran').hasClass('left')) {
      $('#left').hide()
      $('#right').removeClass('column')
      $('#right').css('width', '100%')
      $('#exo_plein_ecran').removeClass('left')
      $('#exo_plein_ecran').addClass('right')
    } else {
      $('#left').show()
      $('#right').addClass('column')
      $('#right').css('width', $('#left').css('width'))
      $('#exo_plein_ecran').removeClass('right')
      $('#exo_plein_ecran').addClass('left')
    }
  })

  window.addEventListener('resize', function (e) {
    if ($('#exo_plein_ecran').hasClass('left')) {
      $('#right').css('width', $('#left').css('width'))
    }
  })
  if (document.getElementById('btnQRcode')) {
    document.getElementById('btnQRcode').addEventListener('click', function () {
      $('#ModalQRcode').html('<canvas width="800" height="800" id="canvasQRCode"></canvas>')
      const canvas = document.getElementById('canvasQRCode')
      QRCode.toCanvas(canvas, window.location.href, { width: Math.min(window.innerHeight, window.innerWidth) * 0.9, height: Math.min(window.innerHeight, window.innerWidth) * 0.9 })
      $('#ModalQRcode').modal('show')
    })
  }
  if (document.getElementById('btnEmbed')) {
    document.getElementById('btnEmbed').addEventListener('click', function () {
      $('#ModalEmbed').html(`<div class="content"><p><pre><code>&lt;iframe width="660"
        height="315" 
        src="${window.location.href.replace('exercice.html', 'exo.html')}"
        frameborder="0" >
&lt;/iframe></code><pre></p>
        <button id="btnEmbedCode" style="margin:10px" class="btn ui toggle button labeled icon url"
        data-clipboard-action="copy" data-clipboard-text=url_courant()><i class="copy icon"></i>Copier le code HTML</button></div>`)
      const clipboard = new Clipboard('#btnEmbedCode', { text: () => `<iframe\n\t width="660" height="315"\n\t src="${window.location.href.replace('exercice.html', 'exo.html')}"\n\tframeborder="0" >\n</iframe>` })
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
    mathalea.graine = serie
  }
  if (params.get('duree')) {
    mathalea.duree = params.get('duree')
  }
  const urlVars = getUrlVars()
  if (urlVars.length > 0) {
    for (let i = 0; i < urlVars.length; i++) {
      liste_des_exercices.push(urlVars[i].id)
    }
    form_choix_des_exercices.value = liste_des_exercices.join(',')
    mise_a_jour_de_la_liste_des_exercices()
  }
})
