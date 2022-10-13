/* eslint-disable camelcase */
/* globals jQuery $ */
/*
  Alacarte
 @name      alacarte.js
 @author    Rémi Angot
 @license   MIT License
 @homepage  https://copmaths.fr
 @example   http://coopmaths.fr/alacarte
*/

import dictionnaireDesExercicesAleatoires from './modules/dictionnaireDesExercicesAleatoires.js'
import { dictionnaireC3 } from './modules/dictionnaireC3.js'
import { dictionnaireDNB } from './modules/dictionnaireDNB.js'
import { dictionnaireLycee } from './modules/dictionnaireLycee.js'
import { loadPrism } from './modules/loaders.js'
import { setOutputLatex } from './modules/context.js'
import '../css/style_mathalea.css'
import { exerciceSimpleToContenu } from './modules/outils/miseEnForme.js'
import { telechargeFichier } from './modules/outils/fichier.js'
import { introLatex, introLatexCoop } from './modules/outils/preambules.js'

const dictionnaireDesExercices = { ...dictionnaireDesExercicesAleatoires, ...dictionnaireDNB, ...dictionnaireC3, ...dictionnaireLycee }

// Les variables globales nécessaires aux exercices (pas terrible...)
window.mathalea = { sortieNB: false, anglePerspective: 30, coeffPerspective: 0.5, pixelsParCm: 20, scale: 1, unitesLutinParCm: 50, mainlevee: false, amplitude: 1, fenetreMathalea2d: [-1, -10, 29, 10], objets2D: [] }
setOutputLatex()

// Pour le menu du haut
document.addEventListener('DOMContentLoaded', (event) => {
  $('.ui.dropdown').dropdown()
})

let codeLatex; let codeLatex_corr; let tableau_de_demandes; const objet_contenu = []; const objet_contenuCorrection = []
const listeDesExercicesDemandes = []; let contenu_fichier = ''; const listeObjetsExercice = {}; let message_d_erreur = ''

const tableau_url_tex = [['items/MATHS.6.G14_ProgrammeConstruction', 'MATHS.6.G14_.tex', 'MATHS.6.G14_-cor.tex'], ['items/MATHS.6.M20_Aire_triangles', 'MATHS.6.M20v2.tex', 'MATHS.6.M20v2-cor.tex'], ['items/MATHS.6.M20_Aire_triangles', 'MATHS.6.M20_.tex', 'MATHS.6.M20_-cor.tex'], ['items/MATHS.6.G11_Perpendiculaire', 'MATHS.6.G11_.tex', 'MATHS.6.G11_-cor.tex'], ['items/MATHS.6.G23_Rapporteur', 'MATHS.6.G23.tex', 'MATHS.6.G23-cor.tex'], ['items/MATHS.6.M23_PerimetreAiresDisques', 'MATHS.6.M23.tex', 'MATHS.6.M23-cor.tex'], ['items/MATHS.6.N22_CalculsFractions', 'MATHS.6.N22_.tex', 'MATHS.6.N22_-cor.tex'], ['items/MATHS.6.G10_VocabulaireNotations', 'MATHS.6.G10_.tex', 'MATHS.6.G10_-cor.tex'], ['items/MATHS.6.R10_ProprietesParallelesPerpendiculaires', 'MATHS.6.R10_.tex', 'MATHS.6.R10_-cor.tex'], ['items/MATHS.6.N23_NombresDecimaux', 'MATHS.6.N23_.tex', 'MATHS.6.N23_-cor.tex'], ['items/MATHS.6.C11_DivisionsEuclidiennes', 'MATHS.6.C11_v1.tex', 'MATHS.6.C11_v1-cor.tex'], ['items/MATHS.6.N21_AbscissesFractionnaires', 'MATHS.6.N21_.tex', 'MATHS.6.N21_-cor.tex'], ['items/MATHS.6.R12_ProprietesDefinitionsMediatrice', 'MATHS.6.R12.tex', 'MATHS.6.R12-cor.tex'], ['items/MATHS.6.G13_CarresRectangles', 'MATHS.6.G13_.tex', 'MATHS.6.G13_-cor.tex'], ['items/MATHS.6.C12_ProblemesNiveau1', 'MATHS.6.C12_v1.tex', 'MATHS.6.C12_v1-cor.tex'], ['items/MATHS.6.G12_Paralleles', 'MATHS.6.G12_.tex', 'MATHS.6.G12_-cor.tex'], ['items/MATHS.6.R11_SchemaProprietesParallelesPerpendiculaires', 'MATHS.6.R11_v1.tex', 'MATHS.6.R11_v1-cor.tex'], ['items/MATHS.6.M21_Aire_assemblage', 'MATHS.6.M21.tex', 'MATHS.6.M21-cor.tex'], ['items/MATHS.6.M24_Portions_disque', 'MATHS.6.M24.tex', 'MATHS.6.M24-cor.tex'], ['items/MATHS.6.N20_FractionsEtEntiers', 'MATHS.6.N20_v1.tex', 'MATHS.6.N20_v1-cor.tex'], ['items/MATHS.6.C10_AddSousMulEntiers', 'MATHS.6.C10_v1.tex', 'MATHS.6.C10_v1-cor.tex'], ['items/MATHS.6.C22_Problemes2', 'MATHS.6.C22.tex', 'MATHS.6.C22-cor.tex']]
const listePackages = new Set()

/**
* tableau_url_tex est un tableau de tableaux
*
* Chaque tableau est de la forme [nom du répertoire,nom du fichier, nom du fichier de la correction]
*
* On ajoute un dernnier element qui est une simplification du nom du répertoire (pas de points, pas /items)
*
* @author Rémi Angot
*/
function creeIdPourComparaison (item, index, arr) {
  item[3] = item[0].replace(/\./g, '').replace('items/', '')
  // une fois tous les points supprimés, on chercher le dernier 'tex' du string pour remettre '.tex'
  // plus utilisé : .replace(/tex(?!.*tex)/g,'.tex') pour trouver le dernier 'tex' et le remplacer par '.tex'
  item[3] = item[3].split('_')[0]
  // ne garde que ce qui est avant le caractère _
}

tableau_url_tex.forEach(creeIdPourComparaison)

/**
* Récupère le texte saisi pour le transformer en tableau de tableaux.
*
* Premier séparateur le saut de ligne ; deuxième séparateur le point-virgule.
*
* @author Rémi Angot
*/
function textarea_to_array (textarea_id_textarea) {
  const text = textarea_id_textarea.value// .replace(/[ ]/g,'');
  // récupère le texte en effaçant tous les espaces
  const tableau = text.split('\n')
  tableau.forEach(function (ligne, i) {
    tableau[i] = ligne.split(';')
    // Regarde s'il y a besoin de modifier le préambule
    // if (tableau[i].includes('6N21')) {besoin_des_axes_gradues=true} inutile avec liste_package
  })
  return tableau
}

/**
* Transforme un id d'exercice en url d'exercice statique
*
* Affiche un message d'erreur s'il n'y a pas d'exercice disponible.
*
* @author Rémi Angot
*/
// function id_to_url (id) {
//   // Retourne les éléments du tableau qui inclue l'id demandé
//   const tableau_items = tableau_url_tex.filter(element => element[3].includes(id))
//   if (tableau_items.length === 0) {
//     return 'pas_d_url'
//   } else {
//     // Choisit un fichier tex au hasard dans les répertoires
//     const item = tableau_items[Math.floor(Math.random() * tableau_items.length)]
//     return [item[0] + '/' + item[1], item[0] + '/' + item[2]]
//   }
// }

/**
* Transforme le texte saisi par l'utilisateur en un dictionnaire avec l'id des exercices et les éventuels paramètres (sup, sup2, nbQuestions)
*
*
* txt_to_objet_parametres_exercice('6C10,sup=false,nbQuestions=5')
* {id: "6C10", sup: false, nbQuestions: 5}
* @author Rémi Angot
*/
function txt_to_objet_parametres_exercice (txt) {
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
* //// ANNULÉ   //// Si ce n'est pas le cas, on cherche dans le répertoire /items s'il y a un répertoire qui correspond
*
* @author Rémi Angot
*/
function item_to_contenu (txt) {
  // De préférence un exercice aléatoire
  const dictionnaire = txt_to_objet_parametres_exercice(txt)
  const e = dictionnaire.id
  const idExerciceMathALEA = e.replace('MATHS', '').replace(/\./g, '').replace(/ /g, '')
  // Pour faire la correspondance entre SACoche et MathALEA, on supprime 'MATHS' et tous les points dans les noms des id
  if (idExerciceMathALEA in listeObjetsExercice) {
    const exercice_aleatoire = listeObjetsExercice[idExerciceMathALEA]
    // Les paramètres peuvent être saisies de manière longue (nb_questions, sup, sup2, sup3) ou de manière courte (n, s, s2, s3)
    if (dictionnaire.sup) {
      exercice_aleatoire.sup = dictionnaire.sup
    }
    if (dictionnaire.s) {
      exercice_aleatoire.sup = dictionnaire.s
    }
    if (dictionnaire.sup2) {
      exercice_aleatoire.sup2 = dictionnaire.sup2
    }
    if (dictionnaire.s2) {
      exercice_aleatoire.sup2 = dictionnaire.s2
    }
    if (dictionnaire.sup3) {
      exercice_aleatoire.sup3 = dictionnaire.sup3
    }
    if (dictionnaire.s3) {
      exercice_aleatoire.sup3 = dictionnaire.s3
    }
    if (dictionnaire.s4) {
      exercice_aleatoire.sup4 = dictionnaire.s4
    }
    if (dictionnaire.nb_questions) {
      exercice_aleatoire.nbQuestions = dictionnaire.nb_questions
    }
    if (dictionnaire.n) {
      exercice_aleatoire.nbQuestions = dictionnaire.n
    }
    exercice_aleatoire.id = idExerciceMathALEA
    if (exercice_aleatoire.typeExercice !== 'dnb') {
      exercice_aleatoire.nouvelleVersion()
    }
    if (exercice_aleatoire.typeExercice === 'simple') {
      exerciceSimpleToContenu(exercice_aleatoire)
    }
    codeLatex += `\n\n%%% ${e} : Exercice aléatoire - ${exercice_aleatoire.titre}%%%\n\n`
    codeLatex += exercice_aleatoire.contenu + '\n\n'
    codeLatex_corr += exercice_aleatoire.contenuCorrection + '\n\n'

    if (typeof exercice_aleatoire.listePackages === 'string') {
      listePackages.add(exercice_aleatoire.listePackages)
    } else { // si c'est un tableau
      exercice_aleatoire.listePackages.forEach(listePackages.add, listePackages)
    }

    // Sinon un exercice statique si le nom de l'item est inclus dans le nom du répertoire
  } else {
    // Si l'identifiant de l'exercice n'est disponible ni sur MathALEA ni dans la liste statique des url tableau_url_tex
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
  if (message_d_erreur.indexOf(text) === -1) {
    message_d_erreur += text
  }
}

window.addEventListener('load', function () {
  jQuery.ajaxSetup({ async: false }) // Tout le traitement se fait de manière synchrone.
  // On attend le résultat des requetes url vers les fichiers statiques pour bien avoir les exercices dans l'ordre
  $('.ui.radio.checkbox').checkbox() // active les boutons radio (pour le style)
  $('.ui.checkbox').checkbox()
  // Gestion du menu déroulant par une fonction auto-exécutante
  let attendre = 0;
  (function menu_deroulant () {
    const el = document.getElementsByClassName('menu_exercices_construit')
    // Vérifie que ce div inutile a bien été créé
    if (el.length && attendre > 1) {
      // S'il est présent on règle le menu
      $('.ui.dropdown').dropdown({ // gestion du clic sur le menu déroulant pour ajouter un item dans le textarea
        action: function (text, value, element) { $('#textarea_id_items').val($('#textarea_id_items').val() + ';' + text.split(' ')[0]) }
      }) // active les menus déroulants
    } else {
      setTimeout(menu_deroulant, 300) // retente dans 300 milliseconds
      attendre += 1
    }
  })()

  $('.ui.radio.checkbox').checkbox() // active les boutons radio (pour le style)

  // Gestion de la suppression des identifiants
  //   const form_supprimer_reference = document.getElementById('supprimer_reference')
  //   form_supprimer_reference.addEventListener('change', function (e) { // Dès que le statut change, on met à jour
  //     document.getElementById('valider').click()
  //   })

  $('#reglages_sortie_LaTeX').hide()

  $('#valider').click(function () {
    $('#div_codeLatex').html(' ')
    codeLatex = ''
    codeLatex_corr = ''
    message_d_erreur = ''
    tableau_de_demandes = textarea_to_array(textarea_id_items)

    tableau_de_demandes.forEach(function (ligne, numero_de_ligne) {
      // On créé un tableau pour chaque élève
      objet_contenu[numero_de_ligne] = []
      objet_contenuCorrection[numero_de_ligne] = []
      ligne.forEach(function (e, i) {
        let rang_premier_item = 0
        if ($('#style1:checked').val()) {
          rang_premier_item = 2
          if (i === 0) {
            objet_contenu[numero_de_ligne][i] = entete_eleve(ligne[0], ligne[1])
            objet_contenuCorrection[numero_de_ligne][i] = entete_eleve(ligne[0], ligne[1])
          }
        }
        if ($('#style2:checked').val()) {
          rang_premier_item = 1
          if (i === 0) {
            objet_contenu[numero_de_ligne][i] = entete_eleve(ligne[0])
            objet_contenuCorrection[numero_de_ligne][i] = entete_eleve(ligne[0])
          }
        }
        if ($('#style3:checked').val()) {
          rang_premier_item = 0
          if (i === 0) {
            objet_contenu[numero_de_ligne][i] = entete_eleve()
            objet_contenuCorrection[numero_de_ligne][i] = entete_eleve()
          }
        }

        if (i >= rang_premier_item) {
          if (e.replace(/ /g, '').length > 2) {
            e = e.replace(/ /g, '')
            e = e.split(',')[0]
            e = e.replace('MATHS', '').replace(/\./g, '').replace(/ /g, '')
            // Pour faire la correspondance entre SACoche et MathALEA, on supprime 'MATHS' et tous les points dans les noms des id
            objet_contenu[numero_de_ligne][i] = e
            objet_contenuCorrection[numero_de_ligne][i] = e
            if (dictionnaireDesExercices[e]) {
              if (listeDesExercicesDemandes.indexOf(e) < 0) {
                listeDesExercicesDemandes.push(e)
              }
            } else {
              // console.log(`Pas d'exercice disponible pour ${e}.`)
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
        // console.log(`Exercice ${id} non disponible`);
      }
      if (dictionnaireDesExercices[id].typeExercice === 'dnb') {
        listeObjetsExercice[id] = dictionnaireDesExercices[id]
        promises.push(
          fetch(url)
            .then((response) => response.text())
            .then((data) => {
              listeObjetsExercice[id].nbQuestionsModifiable = false
              listeObjetsExercice[id].video = ''
              listeObjetsExercice[id].titre = id
              listeObjetsExercice[id].contenu = data
              listeObjetsExercice[id].listePackages = 'dnb'
            })
        )
        promises.push(
          fetch(dictionnaireDesExercices[id].urlcor)
            .then((response) => response.text())
            .then((data) => {
              listeObjetsExercice[id].contenuCorrection = data
            })
        )
      } else {
        // promises.push(
      // import(url)
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
              // FIXME si c'est effectivement un [i] et pas [id], mettre un commentaire ici pour dire pourquoi, car en survolant le code ça semble un bug
              listeObjetsExercice[i] = { titre: "Cet exercice n'existe pas", contenu: '', contenuCorrection: '' } // Un exercice vide pour l'exercice qui n'existe pas
            })
            .then(({ default: Exo }) => {
              listeObjetsExercice[id] = new Exo() // Ajoute l'objet dans la liste des
            })
        )
      }
    }
    // FIXME ce promise.all est lancé avant que le chargement de l'exo ne soit fini (listeObjetsExercice n'est pas encore complété), et on sait pas qui va terminer en premier
    Promise.all(promises)
      .then(() => {
        tableau_de_demandes.forEach(function (ligne) {
          ligne.forEach(function (e, i) {
            let rang_premier_item = 0
            if ($('#style1:checked').val()) {
              rang_premier_item = 2
              if (i === 0) {
                codeLatex += entete_eleve(ligne[0], ligne[1])
                codeLatex_corr += entete_eleve(ligne[0], ligne[1])
              }
            }
            if ($('#style2:checked').val()) {
              rang_premier_item = 1
              if (i === 0) {
                codeLatex += entete_eleve(ligne[0])
                codeLatex_corr += entete_eleve(ligne[0])
              }
            }
            if ($('#style3:checked').val()) {
              rang_premier_item = 0
              if (i === 0) {
                codeLatex += entete_eleve()
                codeLatex_corr += entete_eleve()
              }
            }

            if (i >= rang_premier_item) {
              if (e.replace(/ /g, '').length > 2) {
                item_to_contenu(e)
              }
            }
          })
        })

        if (message_d_erreur.length > 1) {
          window.alert(message_d_erreur)
        }
        // Affiche les boutons de compilation
        if (codeLatex.length > 2) {
          $('#reglages_sortie_LaTeX').show()
        }
        // Affiche le code LaTeX
        $('#div_codeLatex').html('<pre><code class="language-latex">' + codeLatex + intro_correction +
                    codeLatex_corr + '</code></pre>')
      })
      .then(loadPrism)
      .then(() => {
        /* global Prism */
        const div = document.getElementById('div_codeLatex')
        Prism.highlightAllUnder(div) // Met à jour la coloration syntaxique
      })
  })

  // Gestion du téléchargement

  $('#btn_telechargement').click(function () {
    creer_fichier()

    if ($('#nom_du_fichier').val()) {
      telechargeFichier(contenu_fichier, $('#nom_du_fichier').val() + '.tex')
    } else {
      telechargeFichier(contenu_fichier, 'mathalea.tex')
    }
  })

  $('#btn_overleaf').click(function () {
    creer_fichier()
    // Envoi à Overleaf.com en modifiant la valeur dans le formulaire

    $('input[name=encoded_snip]').val(encodeURIComponent(contenu_fichier))
    if (listePackages.has('dnb')) {
      // Force le passage à xelatex sur Overleaf pour les exercices de DNB
      $('input[name=engine]').val('xelatex')
    }
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
})

function creer_fichier () {
  // Gestion du style pour l'entête du fichier
  if ($('#style_classique:checked').val()) {
    contenu_fichier = introLatex($('#entete_du_fichier').val(), listePackages) + macro_nom_copie() + codeLatex + intro_correction +
            codeLatex_corr + '\n\n\\end{document}'
  } else {
    contenu_fichier = introLatexCoop(listePackages) + macro_nom_copie('coop')
    // contenu_fichier +='\n\n\\theme{' + $('input[name=theme]:checked').val() + '}{' + $("#entete_droit_du_fichier").val() + '}'
    // contenu_fichier += '{' + $("#items").val() + '}{' + $("#domaine").val() + '}\n'
    contenu_fichier += '\\begin{document}\n\n' + codeLatex + intro_correction +
            codeLatex_corr + '\n\n\\end{document}'
  }
}

// Gestion des en-têtes

let counter = 'section'
let entete_correction = ''
if ($('#style_classique:checked').val()) {
  counter = 'exo'
  entete_correction = '\\fancyhead[C]{Correction}\n'
}

function entete_eleve (prenom = '', nom = '') {
  return `\n\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n
\\newpage
\\NomCopie{${prenom.toUpperCase()} ${nom.toUpperCase()}}
\\bigskip
`
}

const intro_correction = '\n%%%%%%%%%%%%%%%%\n%%%CORRECTION%%%\n%%%%%%%%%%%%%%%%' +
    `\n\n\\newpage\n${entete_correction}\\setcounter{${counter}}{0}\n\n`

function macro_nom_copie (style = 'classique') {
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
