/* eslint-disable camelcase */
import { creerDocumentAmc, strRandom, compteOccurences, introLatexCoop } from './modules/outils.js'
import { getUrlVars } from './modules/getUrlVars.js'
import { menuDesExercicesQcmDisponibles } from './modules/menuDesExercicesQcmDisponibles'
import { dictionnaireDesExercices, apparence_exercice_actif, supprimerExo } from './modules/menuDesExercicesDisponibles.js'
import dictionnaireDesExercicesAMC from './modules/dictionnaireDesExercicesAMC.js'
import { loadScript } from './modules/loaders'

// import katex from 'katex'
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import Clipboard from 'clipboard'
// import QRCode from 'qrcode'
import seedrandom from 'seedrandom'

import 'katex/dist/katex.min.css'
import '../css/style_mathalea.css'

// Prism n'est utilisé que pour mathalealatex.html. Faut-il ajouter un test sur l'URL
// Prism est utilisé pour la coloration syntaxique du LaTeX
import '../assets/externalJs/prism.js'
import '../assets/externalJs/prism.css'

// Pour le menu du haut
document.addEventListener('DOMContentLoaded', (event) => {
  $('.ui.dropdown').dropdown()
})

// Les variables globales nécessaires aux exercices (pas terrible...)
window.mathalea = { sortieNB: false, anglePerspective: 30, coeffPerspective: 0.5, pixelsParCm: 20, scale: 1, unitesLutinParCm: 50, mainlevee: false, amplitude: 1, fenetreMathalea2d: [-1, -10, 29, 10], objets2D: [] }
window.sortieHtml = true
window.est_diaporama = false

// (function () {
// IIFE principal
let listeObjetsExercice = [] // Liste des objets listeObjetsExercices
let liste_des_exercices = [] // Liste des identifiants des exercices
let codeLatex = ''
let listePackages = new Set()
let nb_exemplaires = 1
let nbQuestions = []
let nom_fichier = ''
let type_entete = 'AMCcodeGrid'
let format = 'A4'

// fonctions de gestion de la liste des exercices cg 04-2021 ****

function copier_vers_exercice_form () {
  // envoie des informations vers le formulaire et déclenchement de l'evt change.
  let i, liste_tag, liste_tag_length, texte_code, evenement
  liste_tag = $('.choix_exercices.valide')
  liste_tag_length = liste_tag.length
  texte_code = ''
  for (i = 0; i < liste_tag_length; i++) {
    if (i == 0) {
      texte_code += liste_tag[i].textContent
    } else {
      texte_code += ',' + liste_tag[i].textContent
    }
  }
  document.getElementById('choix_des_exercices').value = texte_code
  evenement = new Event('change')
  document.getElementById('choix_des_exercices').dispatchEvent(evenement)
}

function selectionner_code (elem) {
  let range, sel
  range = document.createRange()
  range.selectNodeContents(elem)
  sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

function ajout_handlers_etiquette_exo () {
  $('.choix_exercices').off('input').on('input', function (e) {
    gestion_span_choix_exercice(event.target)
  })
  $('.choix_exercices').off('keyup').on('keyup', function (e) {
    if (e.which == 9 || e.which == 13) { // validation de l'étiquette sur tab ou entrée.
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
  const liste_codes_exercices = Object.keys(dictionnaireDesExercicesAMC)
  if (liste_codes_exercices.indexOf($(event.target).text()) >= 0 && !$(event.target).hasClass('valide')) {
    $(event.target).addClass('valide')
    if ($('.choix_exercices:last').hasClass('valide')) { // si le dernier élément n'est pas valide on n'en créé pas un nouveau.
      $(event.target.parentElement.parentElement).append('<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"></span></div>')
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
  let tagexercices, liste_length, i, div_exercice
  liste_length = exliste.length
  tagexercices = ''
  div_exercice = document.getElementById('choix_exercices_div')
  if (liste_length > 0 && div_exercice) {
    for (i = 0; i < liste_length; i++) {
      tagexercices += `<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices valide">${exliste[i]}</span></div>`
    }
  }
  tagexercices += '<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"></span></div>'
  if (div_exercice) {
    div_exercice.innerHTML = tagexercices
    ajout_handlers_etiquette_exo()
  }
}

if (document.getElementById('choix_exercices_div')) {
  $('#choix_des_exercices').parent().hide()
}
//* *******
menuDesExercicesQcmDisponibles()

// Mise à jour du formulaire de la liste des exercices
const form_choix_des_exercices = document.getElementById('choix_des_exercices')
form_choix_des_exercices.addEventListener('change', function (e) {
  // Changement du texte
  if (e.target.value == '') {
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
        if (obj.besoinFormulaire2Numerique && obj.besoinFormulaire2Numerique[2]) {
          param_tooltip += (obj.besoinFormulaire2Numerique[0] + ': \n' + obj.besoinFormulaire2Numerique[2])
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
      if (listeObjetsExercice[0].qcmDisponible) {
        fin_de_l_URL += `,modeQcm=${listeObjetsExercice[0].modeQcm}`
      }
      if (listeObjetsExercice[0].nbQuestionsModifiable) {
        fin_de_l_URL += `,nbQuestions=${listeObjetsExercice[0].nbQuestions}`
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
        if (listeObjetsExercice[i].qcmDisponible) {
          fin_de_l_URL += `,modeQcm=${listeObjetsExercice[i].modeQcm}`
        }
        if (listeObjetsExercice[i].nbQuestionsModifiable) {
          fin_de_l_URL += `,nbQuestions=${listeObjetsExercice[i].nbQuestions}`
        }
      }
      fin_de_l_URL += `&serie=${mathalea.graine}`
      window.history.pushState('', '', fin_de_l_URL)
      const url = window.location.href.split('&serie')[0] // met l'URL dans le bouton de copie de l'URL sans garder le numéro de la série
      // new Clipboard(".url", {
      //     text: function () {
      //         return url;
      //     },
      // });
    }
  })()
  // mise en évidence des exercices sélectionnés.
  $('.exerciceactif').removeClass('exerciceactif')
  for (let i = 0; i < liste_des_exercices.length; i++) {
    $(`a.lien_id_exercice[numero='${liste_des_exercices[i]}']`).addClass('exerciceactif')
    // Si un exercice a été mis plus d'une fois, on affiche le nombre de fois où il est demandé
    if (compteOccurences(liste_des_exercices, liste_des_exercices[i]) > 1) {
      // Ajout de first() car un exercice de DNB peut apparaitre à plusieurs endroits
      const ancienTexte = $(`a.lien_id_exercice[numero='${liste_des_exercices[i]}']`).first().text()
      const txt = ancienTexte.split('✖︎')[0] + ` ✖︎ ${compteOccurences(liste_des_exercices, liste_des_exercices[i])}`
      $(`a.lien_id_exercice[numero='${liste_des_exercices[i]}']`).text(txt)
    } else {
      const ancienTexte = $(`a.lien_id_exercice[numero='${liste_des_exercices[i]}']`).first().text()
      const txt = ancienTexte.split('✖︎')[0]
      $(`a.lien_id_exercice[numero='${liste_des_exercices[i]}']`).text(txt)
    }
  }
  // Sortie LaTeX quoi qu'il advienne !
  // code pour la sortie LaTeX

  const questions = []
  codeLatex = ''
  listePackages = new Set()
  if (liste_des_exercices.length > 0) {
    for (let i = 0; i < liste_des_exercices.length; i++) {
      listeObjetsExercice[i].id = liste_des_exercices[i] // Pour récupérer l'id qui a appelé l'exercice
      listeObjetsExercice[i].nouvelleVersion(i)
      questions.push(listeObjetsExercice[i].qcm)

      if (typeof listeObjetsExercice[i].listePackages === 'string') {
        listePackages.add(listeObjetsExercice[i].listePackages)
      } else {
        // si c'est un tableau
        listeObjetsExercice[i].listePackages.forEach(listePackages.add, listePackages)
      }
    }
    codeLatex = creerDocumentAmc({ questions: questions, nbQuestions: nbQuestions, nb_exemplaires: nb_exemplaires, type_entete: type_entete, format: format }).replace(/<br><br>/g, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n')

    $('#message_liste_exercice_vide').hide()
    $('#cache').show()

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
    const load = function (monFichier) {
      let request

      if (window.XMLHttpRequest) { // Firefox
        request = new XMLHttpRequest()
      } else if (window.ActiveXObject) { // IE
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

    contenu_fichier += codeLatex
    const monzip = new JSZip()
    if ($('#nom_du_fichier').val() != '') {
      nom_fichier = $('#nom_du_fichier').val() + '.tex'
    } else {
      nom_fichier = 'mathalea.tex'
    }
    monzip.file(`${nom_fichier}`, codeLatex)
    monzip.file('automultiplechoice.sty', load('assets/fichiers/automultiplechoice.sty'))
    monzip.generateAsync({ type: 'blob' })
      .then(function (content) {
        // see FileSaver.js
        saveAs(content, 'Projet.zip')
      })
    /* if ($("#nom_du_fichier").val()) {
                    telechargeFichier(contenu_fichier, $("#nom_du_fichier").val() + ".tex");
                } else {
                    telechargeFichier(contenu_fichier, "mathalea.tex");
                } */
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

    // if ($('#style_classique:checked').val()) {
    //   contenu_fichier += introLatex($('#entete_du_fichier').val(), listePackages) + codeLatex + '\n\n\\end{document}'
    // } else {
    //   contenu_fichier += introLatexCoop(listePackages)
    //   contenu_fichier += '\n\n\\theme{' + $('input[name=theme]:checked').val() + '}{' + $('#entete_du_fichier').val() + '}'
    //   contenu_fichier += '{' + $('#items').val() + '}{' + $('#domaine').val() + '}\n\\begin{document}\n\n' + codeLatex
    //   contenu_fichier += '\n\n\\end{document}'
    // }

    contenu_fichier += codeLatex

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

  // cg 04-2021 possibilité de manipuler la liste des exercices via les exercices.

  function supprimerExo (num) {
    const form_choix_des_exercices = document.getElementById('choix_des_exercices')
    liste_des_exercices = form_choix_des_exercices.value.replace(/\s/g, '').replace(';', ',').split(',')
    num = parseInt(num)
    liste_des_exercices.splice(num, 1)
    form_choix_des_exercices.value = liste_des_exercices.toString()
    copier_exercices_form_vers_affichage(liste_des_exercices)
    mise_a_jour_de_la_liste_des_exercices()
  }

  $('.icone_moins').off('click').on('click', function (e) {
    supprimerExo(event.target.id)
  })

  function monterExo (num) {
    const form_choix_des_exercices = document.getElementById('choix_des_exercices')
    liste_des_exercices = form_choix_des_exercices.value.replace(/\s/g, '').replace(';', ',').split(',')
    num = parseInt(num)
    if (num != 0) {
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
    if (num != liste_des_exercices.length - 1) {
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
      url = dictionnaireDesExercicesAMC[id].url
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
      if (!/^\/exercices\//.test(url)) throw Error('')
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
            listeObjetsExercice[i].video = urlVars[i].video
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
    .then((resolve, reject) => {
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
  return new Promise((resolve) => {
    const monInterval = setInterval(() => {
      if (typeof (Module) !== 'undefined') {
        if (Module.ready == true) {
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
  if (window.mtg32App.docs.length == 1) {
    code_pour_modifier_la_figure = code_pour_modifier_la_figure.replace('display', 'updateDisplay')
  }
  const modification = new Function('numero_figure', code_pour_modifier_la_figure)
  modification(numero_figure)
}

// FIN DE GESTION DE MG32

// Gestion des paramètres
const div = document.getElementById('div_codeLatex') // Récupère le div dans lequel le code va être affiché
const form_nbQuestions = []
const form_sup = []
const form_sup2 = []
const form_sup3 = []
const form_modeQcm = []
// Création de tableaux qui recevront les éléments HTML de chaque formulaires

function parametres_exercice (exercice) {
  /* Pour l'exercice i, on rajoute un formulaire avec 5 inputs :
        nombre de questions, nombre de colonnes,nombre de colonnes dans le corrigé,
        espacement et espacement dans le corrigé.
        Les réponses modifient les caractéristiques de l'exercice puis le code LaTeX est mis à jour
        */
  const div_parametres_generaux = document.getElementById('parametres_generaux') // Récupère le div dans lequel seront inscrit les paramètres
  div_parametres_generaux.innerHTML = '' // Vide le div parametres_generaux
  if (exercice.length > 0) {
    div_parametres_generaux.innerHTML += '<div class="ui hidden divider"></div>'

    div_parametres_generaux.innerHTML += '<div><label for="form_serie">Clé de la série d\'exercice : </label> <input id="form_serie" type="text" style="padding: 5px;  border: 1px solid #ccc;border-radius: 4px;"></div>'
  }

  for (let i = 0; i < exercice.length; i++) {
    exercice[i].modeQcm = true
    div_parametres_generaux.innerHTML += `<h4 class="ui dividing header"><i id="${i}" class="trash alternate icon icone_moins"></i><i id="${i}" class="arrow circle down icon icone_down"></i><i id="${i}" class="arrow circle up icon icone_up"></i>Exercice n°` + (i + 1) + ' : ' + exercice[i].titre + '</h4>'

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
                    " : </label>\
			<div style='display: inline' data-tooltip='" +
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
                    " : </label>\
			<div style='display: inline' data-tooltip='" +
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
                    " : </label>\
			<input id='form_sup" +
                    i +
                    "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoinFormulaire2CaseACocher) {
      // Création d'un formulaire texte
      div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup2" +
                    i +
                    "'>" +
                    exercice[i].besoinFormulaire2CaseACocher[0] +
                    " : </label>\
			<input id='form_sup2" +
                    i +
                    "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoinFormulaire2Numerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoinFormulaire2Numerique[2]) {
        // Si un tooltip est défini
        div_parametres_generaux.innerHTML +=
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
        div_parametres_generaux.innerHTML +=
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
      div_parametres_generaux.innerHTML +=
                    "<p></p><div style='display: inline'><label for='form_sup2" +
                    i +
                    "'>" +
                    exercice[i].besoinFormulaire2Texte[0] +
                    " : </label>\
			<div style='display: inline' data-tooltip='" +
                    exercice[i].besoinFormulaire2Texte[1] +
                    "' data-inverted=''><input id='form_sup2" +
                    i +
                    "' type='text' size='20' ></div></div>"
    }

    if (exercice[i].besoinFormulairei3CaseACocher) {
      // Création d'un formulaire texte
      div_parametres_generaux.innerHTML +=
                    "<div style='display: inline'><label for='form_sup3" +
                    i +
                    "'>" +
                    exercice[i].besoinFormulairei3CaseACocher[0] +
                    " : </label>\
			<input id='form_sup3" +
                    i +
                    "' type='checkbox'  ></div>"
    }

    if (exercice[i].besoinFormulaire3Numerique) {
      // Création d'un formulaire numérique
      if (exercice[i].besoinFormulaire3Numerique[2]) {
        // Si un tooltip est défini
        div_parametres_generaux.innerHTML +=
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
        div_parametres_generaux.innerHTML +=
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
      div_parametres_generaux.innerHTML +=
                    "<p></p><div style='display: inline'><label for='form_sup3" +
                    i +
                    "'>" +
                    exercice[i].besoinFormulaire3Texte[0] +
                    " : </label>\
			<div style='display: inline' data-tooltip='" +
                    exercice[i].besoinFormulaire3Texte[1] +
                    "' data-inverted=''><input id='form_sup3" +
                    i +
                    "' type='text' size='20' ></div></div>"
    }
  }

  for (let i = 0; i < exercice.length; i++) {
    // Gestion de la suppression des identifiants
    const form_supprimer_reference = document.getElementById('supprimer_reference')
    form_supprimer_reference.addEventListener('change', function (e) {
      // Dès que le statut change, on met à jour
      // nouvelles_donnees();
      mise_a_jour_du_code()
    })
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

    // Gestion du mode QCM
    // exercice[i].modeQcm=true
    // mise_a_jour_du_code();

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
        if (e.keyCode == 13) {
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
        if (e.keyCode == 13) {
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

    if (exercice[i].besoinFormulaire2CaseACocher) {
      form_sup2[i] = document.getElementById('form_sup2' + i)
      form_sup2[i].checked = exercice[i].sup2 // Rempli le formulaire avec le paramètre supplémentaire
      form_sup2[i].addEventListener('change', function (e) {
        //
        exercice[i].sup2 = e.target.checked
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoinFormulaire2Numerique) {
      form_sup2[i] = document.getElementById('form_sup2' + i)
      form_sup2[i].value = exercice[i].sup2 // Rempli le formulaire avec le paramètre supplémentaire
      form_sup2[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup2 = e.target.value
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoinFormulaire2Texte) {
      form_sup2[i] = document.getElementById('form_sup2' + i)
      form_sup2[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode == 13) {
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

    if (exercice[i].besoinFormulairei3CaseACocher) {
      form_sup3[i] = document.getElementById('form_sup3' + i)
      form_sup3[i].checked = exercice[i].sup3 // Rempli le formulaire avec le paramètre supplémentaire
      form_sup3[i].addEventListener('change', function (e) {
        //
        exercice[i].sup3 = e.target.checked
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].qcmDisponible) {
      form_modeQcm[i] = document.getElementById('form_modeQcm' + i)
      form_modeQcm[i].checked = exercice[i].modeQcm // Rempli le formulaire avec le paramètre supplémentaire
      form_modeQcm[i].addEventListener('change', function (e) {
        //
        exercice[i].modeQcm = e.target.checked
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoinFormulaire3Numerique) {
      form_sup3[i] = document.getElementById('form_sup3' + i)
      form_sup3[i].value = exercice[i].sup3 // Rempli le formulaire avec le paramètre supplémentaire
      form_sup3[i].addEventListener('change', function (e) {
        // Dès que le nombre change, on met à jour
        exercice[i].sup3 = e.target.value
        mise_a_jour_du_code()
      })
    }

    if (exercice[i].besoinFormulaire3Texte) {
      form_sup3[i] = document.getElementById('form_sup3' + i)
      form_sup3[i].addEventListener('keydown', function (e) {
        // Appui sur la touche entrée
        if (e.keyCode == 13) {
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
    form_serie.value = mathalea.graine // mise à jour du formulaire
    mise_a_jour_du_code()
  }
  // Gestion du nombre d'exemplaire

  const form_nb_exemplaires = document.getElementById('nombre_d_exemplaires')
  form_nb_exemplaires.value = 1 // Rempli le formulaire avec le nombre de questions
  form_nb_exemplaires.addEventListener('change', function (e) {
    // Dès que le nombre change, on met à jour
    if (type_entete == 'AMCassociation') {
      nb_exemplaires = 1
      form_nb_exemplaires.value = 1
    } else {
      nb_exemplaires = e.target.value
    }
    mise_a_jour_du_code()
  })
  // Gestion des paramètres du fichier LaTeX
  // gestion de l'entête
  const form_entete = document.getElementById('options_type_entete')
  form_entete.value = 'AMCcodeGrid'
  $('#type_AMCcodeGrid').show()
  $('#type_champnom').hide()
  $('#type_AMCassociation').hide()
  form_entete.addEventListener('change', function (e) {
    type_entete = e.target.value
    if (type_entete == 'AMCassociation') {
      nb_exemplaires = 1
      form_nb_exemplaires.value = 1
    }
    mise_a_jour_du_code()
  })

  // gestion du format
  const form_format = document.getElementById('options_format')
  form_format.value = 'A4'
  $('#format_A4').show()
  $('#format_A3').hide()
  form_format.addEventListener('change', function (e) {
    format = e.target.value
    console.log(format)
    mise_a_jour_du_code()
  })

  // gestion du nombre de questions par groupe
  const form_nbQuestions = document.getElementById('nbQuestions_par_groupe')
  form_nbQuestions.value = []
  form_nbQuestions.addEventListener('change', function (e) {
    const saisie = e.target.value
    nbQuestions = saisie.split(',')
    mise_a_jour_du_code()
  })

  // $("#btn_overleaf").click(function () {
  //     // Gestion du style pour l'entête du fichier

  //     let contenu_fichier = `

  //         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  //         % Document généré avec MathALEA sous licence CC-BY-SA
  //         %
  //         % ${window.location.href}
  //         %
  //         %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  //     `;
  //     contenu_fichier +=  codeLatex ;

  //     // Gestion du LaTeX statique

  //     // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

  //     //$("input[name=encoded_snip]").val(encodeURIComponent(contenu_fichier));
  //     $("input[name=encoded_snip]").val(contenu_fichier);
  //     if ($("#nom_du_fichier").val()) {
  //         $("input[name=snip_name]").val($("#nom_du_fichier").val()); //nomme le projet sur Overleaf
  //     }

  // });

  // Récupère la graine pour l'aléatoire dans l'URL
  const params = new URL(document.location).searchParams
  const serie = params.get('serie')
  if (serie) {
    mathalea.graine = serie
  }
  const urlVars = getUrlVars()
  if (urlVars.length > 0) {
    liste_des_exercices = []
    for (let i = 0; i < urlVars.length; i++) {
      liste_des_exercices.push(urlVars[i].id)
    }
    form_choix_des_exercices.value = liste_des_exercices.join(',')
    copier_exercices_form_vers_affichage(liste_des_exercices)
    mise_a_jour_de_la_liste_des_exercices()
  }
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
// $(".icone_preview").off("click").on("click", function (e) {
// 	if ($(".popuptext").is(":visible")) {
// 		$(".popuptext").hide();
// 	} else {
// 		mise_a_jour_de_la_liste_des_exercices(event.target.id)
// 	}
// });
// $(".popuptext").off("click").on("click", function (e) {
// 	$(".popuptext").hide();
// });
// $(document).click(function(event) {
// 		$(".popuptext").hide();
// });
// })();
