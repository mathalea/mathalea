/* eslint-disable camelcase */
import { tridictionnaire, filtreDictionnaire, filtreDictionnaireValeurCle, filtreDictionnaireValeurTableauCle, enleveElement, compteOccurences } from './outils.js'
import dictionnaireDesExercicesAleatoires from './dictionnaireDesExercicesAleatoires.js'
import { dictionnaireC3 } from './dictionnaireC3.js'
import { dictionnaireDNB } from './dictionnaireDNB.js'
import $ from 'jquery'
import 'datatables.net-dt/css/jquery.dataTables.css'

import renderMathInElement from 'katex/dist/contrib/auto-render.js'

// Liste tous les tags qui ont été utilisé
const tags = new Set()
for (const item in dictionnaireDNB) {
  for (const k of dictionnaireDNB[item].tags) {
    tags.add(k)
  }
}
// transforme le set en tableau dans l'ordre alphabétique
const tableauTags = ([...tags].sort())
enleveElement(tableauTags, "Système d'équations")
enleveElement(tableauTags, 'Hors programme')

// On concatène les différentes listes d'exercices
export const dictionnaireDesExercices = { ...dictionnaireDesExercicesAleatoires, ...dictionnaireDNB, ...dictionnaireC3 }
const liste_des_exercices_disponibles = tridictionnaire(dictionnaireDesExercices)

function coupe_chaine (titre, max_length) {
  for (let i = max_length; i > 5; i--) {
    if (titre[i] === ' ') {
      return titre.substr(0, i) + '\n' + titre.substr(i + 1, titre.length)
    }
  }
}

function span_exercice (id, titre) {
  let max_length
  if (document.getElementById('exercices_disponibles') && document.getElementById('exercices_disponibles').clientWidth > 600) {
    max_length = 80
  } else if (document.getElementById('exercices_disponibles') && document.getElementById('exercices_disponibles').clientWidth > 490) {
    max_length = 60
  } else {
    max_length = 50
  }
  const tooltip = titre.length > max_length
    ? 'data-tooltip="' + coupe_chaine(titre, max_length + 20) + '"'
    : ''
  const titre_tronque = titre.length > max_length ? titre.substr(0, max_length) + '...' : titre
  return `<span class="id_exercice">${id}</span> - <a class="ui bouton lien_id_exercice" ${tooltip} data-id_exercice="${id}">${titre_tronque}</a></a><span data-content="Prévisualiser l'exercice."><i id="${id}" class="eye icon icone_preview" size="mini"></i></span></br>\n`
}

function liste_html_des_exercices_d_un_theme (theme) {
  let liste = ''
  const dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles, theme)
  for (const id in dictionnaire) {
    liste += span_exercice(id, dictionnaire[id].titre)
  }
  return liste
}
function a_dnb (id, dictionnaire, mode) {
  if (mode === 'annee') {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].lieu} - ${dictionnaire[id].mois} -  Ex ${dictionnaire[id].numeroExercice}</a> ${liste_html_des_tags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`
  } else {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].annee} - ${id.substr(9, 2)} - ${dictionnaire[id].lieu} - Ex ${dictionnaire[id].numeroExercice}</a> ${liste_html_des_tags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`
  }
}
function liste_html_des_exercices_DNB_annee (annee) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurCle(dictionnaireDNB, 'annee', annee)
  for (const id in dictionnaire) {
    liste += a_dnb(id, dictionnaire, 'annee')
  }
  return liste
}
function liste_html_des_exercices_DNB_theme (theme) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireDNB, 'tags', theme)
  let tableauDesExercices = []
  for (const id in dictionnaire) {
    tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaitre les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (const id of tableauDesExercices) {
    liste += a_dnb(id, dictionnaire, 'theme')
  }
  return liste
}

function liste_html_des_exercices_d_un_niveau (liste_de_themes) { // liste_de_themes = [['6N1','6N1 - Numérations et fractions niveau 1'] , [' ',' '] ]
  let liste = ''
  for (const theme of liste_de_themes) {
    liste += `<h3>${theme[1]}</h3>`
    liste += liste_html_des_exercices_d_un_theme(theme[0])
  }
  return liste
}

function get_liste_html_des_exercices_DNB () {
  let liste = '<div class="accordion">'
  for (const annee of ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013']) {
    liste += `<div class="title"><i class="dropdown icon"></i> ${annee}</div><div class="content">`
    liste += liste_html_des_exercices_DNB_annee(annee)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}

function get_liste_html_des_exercices_DNB_theme () {
  let liste = '<div class="accordion">'
  for (const theme of tableauTags) {
    //     [
    //   "Agrandissement-réduction",
    //   "Aires et périmètres",
    //   "Algorithmique-programmation",
    //   "Arithmétique",
    //   "Calcul littéral",
    //   "Calculs numériques",
    //   "Géométrie dans l'espace",
    //   "Durées",
    //   "Equations",
    //   "Fractions",
    //   "Fonctions",
    //   "Géométrie plane",
    //   "Grandeurs composées",
    //   "Pourcentages",
    //   "Prise d'initiatives",
    //   "Programme de calculs",
    //   "Probabilités",
    //   "Proportionnalité",
    //   "Puissances",
    //   "Pythagore",
    //   "QCM",
    //   "Thalès",
    //   "Transformations",
    //   "Trigonométrie",
    //   "Vitesses",
    //   "Volumes",
    //   "Vrai-faux",
    //   "Statistiques",
    //   "Tableur"
    // ]){
    liste += `<div class="title"><i class="dropdown icon"></i> ${theme}</div><div class="content">`
    liste += liste_html_des_exercices_DNB_theme(theme)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}

function liste_html_des_tags (objet) {
  let result = ''
  if (objet.tags !== undefined) {
    for (const tag of objet.tags) {
      if (tag === 'Hors programme') {
        result += `<div class="ui mini red label">${tag}</div>`
      } else {
        result += `<div class="ui mini blue label">${tag}</div>`
      }
    }
  }
  return result
}

function div_niveau (obj, active, id) {
  let nombre_exo = ''
  if (id !== 'DNB' && id !== 'DNBtheme') {
    nombre_exo = '(' + obj.nombre_exercices_dispo + ')'
  }
  return `<div id=${id} class="${active ? 'active title fermer_niveau' : 'title ouvrir_niveau'}"><i class="dropdown icon"></i>${obj.label} ${nombre_exo}</div><div id="content${id}" class="${active} content">${active ? obj.liste_html_des_exercices : ''}</div>`
}

// fonction ajout d'un exercice : ajoute l'exercice dans l'input avec la liste des exercice et provoque l'evt change pour recalcul de la page.
function addExercice (e) {
  const numero = $(e.target).attr('data-id_exercice')
  if ($('#choix_des_exercices').val() === '') {
    $('#choix_des_exercices').val($('#choix_des_exercices').val() + numero)
  } else {
    $('#choix_des_exercices').val(
      $('#choix_des_exercices').val() + ',' + numero
    )
  }

  // Créé un évènement de changement de la valeur du champ pour déclencher la mise à jour
  const event = new Event('change')
  document.getElementById('choix_des_exercices').dispatchEvent(event)

  // Actualise KaTeX pour les titres d'exercices utilisant LaTeX
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
}

export function apparence_exercice_actif () {
  $('.exerciceactif').removeClass('exerciceactif')
  $('.delexercice').remove()
  const liste_exercices_selectionnes = document.getElementById('choix_des_exercices').value.split(',')
  for (let i = 0; i < liste_exercices_selectionnes.length; i++) {
    const elem_liste = $(`a.lien_id_exercice[data-id_exercice='${liste_exercices_selectionnes[i]}']`)

    if (!elem_liste.hasClass('exerciceactif')) {
      elem_liste.after(`<span data-tooltip="Supprimer le dernière occurence de l'exercice." class="delexercice"><i class="minus square icon delexercice" id="del¤${liste_exercices_selectionnes[i]}" ></i></span>`)
    }
    elem_liste.addClass('exerciceactif')
    // Si un exercice a été mis plus d'une fois, on affiche le nombre de fois où il est demandé
    if (compteOccurences(liste_exercices_selectionnes, liste_exercices_selectionnes[i]) > 1) {
      // Ajout de first() car un exercice de DNB peut apparaitre à plusieurs endroits
      const ancienTexte = elem_liste.first().text()
      const txt = ancienTexte.split('✖︎')[0] + ` ✖︎ ${compteOccurences(liste_exercices_selectionnes, liste_exercices_selectionnes[i])}`
      elem_liste.text(txt)
    } else {
      const ancienTexte = elem_liste.first().text()
      const txt = ancienTexte.split('✖︎')[0]
      elem_liste.text(txt)
    }
  }
  $('.delexercice').off('click').on('click', function (e) {
    supprimerExo(event.target.id, true)
    event.stopPropagation()
  })
  $('.icone_preview').off('click').on('click', function (e) {
    $('.popup').trigger('click')
  })
}

export function supprimerExo (num, last) {
// fonction suppression d'un exercice : supprime l'exercice dans l'input avec la liste des exercice et provoque l'evt change pour recalcul de la page.
  let id_exo; const form_choix_des_exercices = document.getElementById('choix_des_exercices')
  const liste_exercices_selectionnes = form_choix_des_exercices.value.replace(/\s/g, '').replace(';', ',').split(',')
  if (last) { // alors on est dans le cas de la liste : on supprime la dernière occurence de l'identifiant de l'exercice.
    id_exo = num.split('¤')
    num = liste_exercices_selectionnes.lastIndexOf(id_exo[1])
  } else {
    num = parseInt(num)
  }
  liste_exercices_selectionnes.splice(num, 1)
  form_choix_des_exercices.value = liste_exercices_selectionnes.toString()
  const event = new Event('change')
  document.getElementById('choix_des_exercices').dispatchEvent(event)
}

function ligne_tableau (exercice) {
  let ligne = ''
  if (dictionnaireDesExercices[exercice].titre) {
    ligne = '<tr><td class="colonnecode"><span class="id_exercice">' +
    exercice +
    '</span></td> <td> <a class="lien_id_exercice" data-id_exercice="' +
    exercice + '">' + dictionnaireDesExercices[exercice].titre +
    '</a></td><td data-tooltip="Prévisualiser l\'exercice."><i id="' +
    exercice + '" class="eye icon icone_preview" ></td></tr>'
  } else {
    ligne = '<tr><td class="colonnecode"><span class="id_exercice">' +
    exercice +
    '</span></td> <td>' +
    `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${exercice}">${dictionnaireDesExercices[exercice].annee} - ${exercice.substr(9, 2)} - ${dictionnaireDesExercices[exercice].lieu} - Ex ${dictionnaireDesExercices[exercice].numeroExercice}</a> ${liste_html_des_tags(dictionnaireDesExercices[exercice])} </br>\n` +
    '</td><td><i id=' + exercice + ' class="eye icon icone_preview"></i></td></tr>'
  }
  return ligne
}

function html_listes (objaff) {
  const liste_affichage_length = objaff.liste_affichage.length
  let liste = ''; let lignes = ''
  for (let i = 0; i < liste_affichage_length; i++) {
    if (objaff.liste_affichage[i] === objaff.liste_affichage.active) { // liste active
      liste += div_niveau(objaff.obj_ex[objaff.liste_affichage[i]], 'active', objaff.liste_affichage[i])
    } else {
      liste += div_niveau(objaff.obj_ex[objaff.liste_affichage[i]], '', objaff.liste_affichage[i])
    }
    lignes += objaff.obj_ex[objaff.liste_affichage[i]].lignes_tableau
  }
  return { liste: liste, lignes: lignes }
}

export function menuDesExercicesDisponibles () {
// Détermine le nombre d'exercices par niveaux
  let liste_html_des_exercices, html_affichage, liste_html_des_exercicestab
  const liste_themes_c3 = [
    ['c3C1', 'c3C1 - Calculs niveau 1'], ['c3C2', 'c3C2 - Calculs niveau 2'], ['c3C3', 'c3C3 - Calculs niveau 3'],
    ['c3N1', 'c3N1 - Numération Niveau 1'], ['c3N2', 'c3N2 - Numération Niveau 2'], ['c3N3', 'c3N3 - Numération Niveau 3']]
  const liste_themes_6 = [
    ['6C1', '6C1 - Calculs niveau 1'], ['6C2', '6C2 - Calculs niveau 2'], ['6C3', '6C3 - Calculs niveau 3'],
    ['6D1', '6D1 - Les durées'],
    ['6G1', '6G1 - Géométrie niveau 1'], ['6G2', '6G2 - Géométrie niveau 2'], ['6G3', '6G3 - Géométrie niveau 3'], ['6G4', '6G4 - Géométrie niveau 4'],
    ['6M1', '6M1 - Grandeurs et mesures niveau 1'], ['6M2', '6M2 - Grandeurs et mesures niveau 2'], ['6M3', '6M3 - Volumes'],
    ['6N1', '6N1 - Numération et fractions niveau 1'], ['6N2', '6N2 - Numération et fractions niveau 2'], ['6N3', '6N3 - Numération et fractions niveau 3'], ['6N4', '6N4 - Numération et fractions niveau 4'],
    ['6P1', '6P1 - Proportionnalité'], ['6S1', '6S1 - Statistiques'],
    ['6Algo1', '6A - Algorithmique']]
  const liste_themes_5 = [
    ['5A1', '5A1 - Arithmetique'], ['5C1', '5C1 - Calculs'],
    ['5G1', '5G1 - Symétries'], ['5G2', '5G2 - Triangles'], ['5G3', '5G3 - Angles'], ['5G4', '5G4 - Parallélogrammes'], ['5G5', '5G5 - Espace'],
    ['5L1', '5L1 - Calcul littéral'],
    ['5M1', '5M1 - Périmètres et aires'], ['5M2', '5M2 - Volumes'], ['5M3', '5M3 - Durées'],
    ['5N1', '5N1 - Numération et fractions niveau 1'], ['5N2', '5N2 - Calculs avec les fractions'],
    ['5P1', '5P1 - Proportionnalité'], ['5R1', '5R1 - Relatifs niveau 1'], ['5R2', '5R2 - Relatifs niveau 2'],
    ['5S1', '5S1 - Statistiques'], ['5S2', '5S2 - Probabilités']]
  const liste_themes_4 = [
    ['4C1', '4C1 - Relatifs'], ['4C2', '4C2 - Fractions'], ['4C3', '4C3 - Puissances'],
    ['4F1', '4F1 - Notion de fonction'],
    ['4G1', '4G1 - Translation et rotation'], ['4G2', '4G2 - Théorème de Pythagore'], ['4G3', '4G3 - Théorème de Thalès'], ['4G4', "4G4 - Cosinus d'un angle"], ['4G5', '4G5 - Espace'],
    ['4L1', '4L1 - Calcul littéral'], ['4L2', '4L2 - Équation'], ['4P1', '4P1 - Proportionnalité'], ['4S1', '4S1 - Statistiques'], ['4S2', '4S2 - Probabilités'],
    ['4Algo1', '4A1 - Algorithmique']]
  const liste_themes_3 = [
    ['3A1', '3A1 - Arithmetique'],
    ['3F1', '3F1 - Généralités sur les fonctions'], ['3F2', '3F2 - Fonctions affines et linéaires'],
    ['3G1', '3G1 - Homothétie et rotation'], ['3G2', '3G2 - Théorème de Thalès'], ['3G3', '3G3 - Trigonométrie'], ['3G4', '3G4 - Espace'],
    ['3L1', '3L1 - Calcul littéral'], ['3P1', '3P1 - Proportionnalité'], ['3S1', '3S1 - Statistiques'], ['3S2', '3S2 - Probabilités'],
    ['3Algo1', '3Algo1 - Algorithmique premier niveau']]
  const obj_exercices_disponibles = {
    c3: {
      label: 'CM1 /CM2',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: liste_html_des_exercices_d_un_niveau(liste_themes_c3),
      lignes_tableau: ''
    },
    6: {
      label: 'Sixième',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: liste_html_des_exercices_d_un_niveau(liste_themes_6),
      lignes_tableau: ''
    },
    5: {
      label: 'Cinquième',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: liste_html_des_exercices_d_un_niveau(liste_themes_5),
      lignes_tableau: ''
    },
    4: {
      label: 'Quatrième',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: liste_html_des_exercices_d_un_niveau(liste_themes_4),
      lignes_tableau: ''
    },
    3: {
      label: 'Troisième',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: liste_html_des_exercices_d_un_niveau(liste_themes_3),
      lignes_tableau: ''
    },
    DNB: {
      label: 'Exercices de brevet (classés par année)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: get_liste_html_des_exercices_DNB(),
      lignes_tableau: ''
    },
    DNBtheme: {
      label: 'Exercices de brevet (classés par thème)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: get_liste_html_des_exercices_DNB_theme(),
      lignes_tableau: ''
    },
    C: {
      label: 'Calcul mental',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    },
    2: {
      label: 'Seconde',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    },
    1: {
      label: 'Première',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    },
    T: {
      label: 'Terminale',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    },
    be: {
      label: 'Beta',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    },
    PE: {
      label: 'CRPE',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    },
    P0: {
      label: 'Outils pour le professeur',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    }
  }

  liste_html_des_exercicestab = ''
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const filtre = urlParams.get('filtre')

  for (const id in liste_des_exercices_disponibles) {
    if ((id[0] === 'c' && id[1] === '3') || (id[0] === 'P' && id[1] === '0') || (id[0] === 'P' && id[1] === 'E') || (id[0] === 'b' && id[1] === 'e')) {
      obj_exercices_disponibles[id[0] + id[1]].nombre_exercices_dispo += 1
      obj_exercices_disponibles[id[0] + id[1]].lignes_tableau += ligne_tableau(id)
    }
    if (id[0] === '6' || id[0] === '5' || id[0] === '4' || id[0] === '3' || id[0] === '2' || id[0] === '1' || id[0] === 'T' || id[0] === 'C') {
      obj_exercices_disponibles[id[0]].nombre_exercices_dispo += 1
      obj_exercices_disponibles[id[0]].lignes_tableau += ligne_tableau(id)
    }
    if (id[0] === '2' || id[0] === '1' || id[0] === 'T' || id[0] === 'C') {
      obj_exercices_disponibles[id[0]].liste_html_des_exercices += span_exercice(id, dictionnaireDesExercices[id].titre)
    }
    if ((id[0] === 'P' && id[1] === '0') || (id[0] === 'P' && id[1] === 'E') || (id[0] === 'b' && id[1] === 'e')) {
      obj_exercices_disponibles[id[0] + id[1]].liste_html_des_exercices += span_exercice(id, dictionnaireDesExercices[id].titre)
    }
    if (id[0] === 'd' && id[1] === 'n' && id[2] === 'b') {
      obj_exercices_disponibles.DNB.lignes_tableau += ligne_tableau(id)
    }
  }

  liste_html_des_exercices = '<div class="ui accordion">'
  // Change l'ordre des exercices suivant l'URL
  if (filtre === 'beta') {
    liste_html_des_exercices += div_niveau(obj_exercices_disponibles.be, 'active', 'be')
    liste_html_des_exercices += '</div>'
    liste_html_des_exercicestab += obj_exercices_disponibles.be.lignes_tableau
  } else if (window.location.href.indexOf('cm.html') > 0) {
    html_affichage = html_listes({
      liste_affichage: ['C', 'c3', 6, 5, 4, 3, 2, 1, 'T', 'PE'],
      active: 'C',
      obj_ex: obj_exercices_disponibles
    })
    liste_html_des_exercices += html_affichage.liste + '</div>'
    liste_html_des_exercicestab += html_affichage.lignes
  } else if (filtre === 'outils') {
    liste_html_des_exercices += div_niveau(obj_exercices_disponibles.P0, 'active', 'P0')
    liste_html_des_exercices += '</div>'
    liste_html_des_exercicestab += obj_exercices_disponibles.P0.lignes_tableau
  } else if (filtre === 'dnb') {
    liste_html_des_exercices += div_niveau(obj_exercices_disponibles.DNB, 'active', 'DNB')
    liste_html_des_exercices += div_niveau(obj_exercices_disponibles.DNBtheme, 'active', 'DNBtheme')
    liste_html_des_exercices += '</div>'
    liste_html_des_exercicestab += obj_exercices_disponibles.DNB.lignes_tableau
  } else if (filtre === 'primaire') {
    liste_html_des_exercices += div_niveau(obj_exercices_disponibles.c3, 'active', 'c3')
    liste_html_des_exercices += '</div>'
    liste_html_des_exercicestab += obj_exercices_disponibles.c3.lignes_tableau
  } else if (filtre === 'college') {
    html_affichage = html_listes({
      liste_affichage: [6, 5, 4, 3, 'DNB', 'DNBtheme', 'C'],
      active: '',
      obj_ex: obj_exercices_disponibles
    })
    liste_html_des_exercices += html_affichage.liste + '</div>'
    liste_html_des_exercicestab += html_affichage.lignes
  } else if (filtre === 'lycee') {
    html_affichage = html_listes({
      liste_affichage: [2, 1, 'T'],
      active: '',
      obj_ex: obj_exercices_disponibles
    })
    liste_html_des_exercices += html_affichage.liste + '</div>'
    liste_html_des_exercicestab += html_affichage.lignes
  } else {
    html_affichage = html_listes({
      liste_affichage: ['c3', 6, 5, 4, 3, 'DNB', 'DNBtheme', 2, 1, 'T', 'PE', 'C'],
      active: '',
      obj_ex: obj_exercices_disponibles
    })
    liste_html_des_exercices += html_affichage.liste
    liste_html_des_exercicestab += html_affichage.lignes
    // Ajoute les outils prof sur mathalealatex
    if (window.location.href.indexOf('mathalealatex.html') > 0) {
      liste_html_des_exercices += div_niveau(obj_exercices_disponibles.P0, '', 'P0')
      liste_html_des_exercicestab += obj_exercices_disponibles.P0.lignes_tableau
    }
    liste_html_des_exercices += '</div>'
  }

  $('#liste_des_exercices').html(liste_html_des_exercices)
  $('.lien_id_exercice').off('click').on('click', function () { addExercice(event) })
  liste_html_des_exercicestab = `<div id="recherche"> </div><table id='listtab' class="stripe"><thead>
    <tr><th class="colonnecode">Code</th><th>Intitulé de l'exercice</th><th>Prévisualiser</th></thead><tbody>
    ${liste_html_des_exercicestab}
    </tbody><tfoot><tr><th class="colonnecode">Code</th><th>Intitulé de l'exercice</th><th>prévisualiser</th></tr>
    </tfoot></table>`
  $('#liste_des_exercices_tableau').html(liste_html_des_exercicestab)
  $('#liste_des_exercices_tableau').hide()
  $('#mode_choix_liste').hide()
  $('.popuptext').hide()

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

  // Gère le clic sur un exercice de la liste

  // Lorsqu'on change de page le tableau il faut ajouter le handler d'evenement sur la liste des exercices.
  $('#listtab').on('draw.dt', function () {
    apparence_exercice_actif()
    $('.lien_id_exercice').off('click').on('click', function () { addExercice(event) })
    $('.icone_preview').off('click').on('click', function (e) {
      $('.popup').trigger('click')
    })
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
  })

  function afficher_niveau () {
    let elem
    if ($(event.target).hasClass('dropdown')) {
      elem = event.target.parentElement
    } else {
      elem = event.target
    }
    $('.fermer_niveau').trigger('click')
    $(elem).replaceWith(div_niveau(obj_exercices_disponibles[elem.id], 'active', elem.id))
    $(elem).removeClass('ouvrir_niveau')
    $(elem).addClass('fermer_niveau')
    $('.fermer_niveau').off('click').on('click', function () {
      masquer_niveau()
    })
    // Actualise KaTeX pour les titres d'exercices utilisant LaTeX
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
    apparence_exercice_actif()
    $('.lien_id_exercice').off('click').on('click', function () { addExercice(event) })
    $('.icone_preview').off('click').on('click', function (e) {
      $('.popup').trigger('click')
    })
  }

  function masquer_niveau () {
    $('.fermer_niveau').next().html('')
    $('.fermer_niveau').addClass('ouvrir_niveau')
    $('.fermer_niveau').removeClass('fermer_niveau')
    $('.ouvrir_niveau').off('click').on('click', function () {
      afficher_niveau()
    })
  }

  $('.ouvrir_niveau').off('click').on('click', function () {
    afficher_niveau()
  })
  $('.fermer_niveau').off('click').on('click', function () {
    masquer_niveau()
  })

  async function gestion_tableau () {
    // eslint-disable-next-line no-unused-vars
    const Datatable = await import('datatables.net-dt')
    // plugin datatable pour ignorer les accents
    function removeAccents (data) {
      if (data.normalize) {
        // Use I18n API if avaiable to split characters and accents, then remove
        // the accents wholesale. Note that we use the original data as well as
        // the new to allow for searching of either form.
        return data + ' ' + data
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      }
      return data
    }
    const searchType = $.fn.DataTable.ext.type.search
    searchType.string = function (data) {
      console.log('search ' + data)
      return !data ? '' : typeof data === 'string' ? removeAccents(data) : data
    }
    searchType.html = function (data) {
      return !data ? '' : typeof data === 'string' ? removeAccents(data.replace(/<.*?>/g, '')) : data
    }
    $('#listtab').DataTable({
      ordering: false,
      language: {
        sEmptyTable: 'Aucune donnée disponible dans le tableau',
        sInfo: "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        sInfoEmpty: "Affichage de l'élément 0 à 0 sur 0 élément",
        sInfoFiltered: '(filtré à partir de _MAX_ éléments au total)',
        sInfoThousands: ',',
        sLengthMenu: 'Afficher _MENU_ éléments',
        sLoadingRecords: 'Chargement...',
        sProcessing: 'Traitement...',
        sSearch: 'Rechercher :',
        sZeroRecords: 'Aucun élément correspondant trouvé',
        oPaginate: {
          sFirst: 'Premier',
          sLast: 'Dernier',
          sNext: 'Suivant',
          sPrevious: 'Précédent'
        },
        oAria: {
          sSortAscending: ': activer pour trier la colonne par ordre croissant',
          sSortDescending: ': activer pour trier la colonne par ordre décroissant'
        },
        select: {
          rows: {
            _: '%d lignes sélectionnées',
            0: 'Aucune ligne sélectionnée',
            1: '1 ligne sélectionnée'
          }
        }
      },
      initComplete: function () {
        $('#listtab_filter').detach().appendTo('#recherche')
      }
    })
  }
  // Gestion d'affichage de l'un ou l'autre des modes.
  $('#mode_choix_liste').off('click').on('click', function () {
    $('#liste_des_exercices_tableau').hide()
    $('#liste_des_exercices').show()
    $('#mode_choix_liste').hide()
    $('#mode_choix_tableau').show()
    $('#replier').html('-')
  })
  $('#mode_choix_tableau').off('click').on('click', async function () {
    if (!document.getElementById('listtab_length')) { // si on clique pour la première fois sur l'affichage table alors on charge datatable
      await gestion_tableau()
    }
    $('#liste_des_exercices_tableau').show()
    $('#liste_des_exercices').hide()
    $('#mode_choix_liste').show()
    $('#mode_choix_tableau').hide()
    $('#replier').html('-')
  })

  $('#replier').off('click').on('click', function () {
    if ($('#liste_des_exercices').is(':visible') || $('#liste_des_exercices_tableau').is(':visible')) {
      $('#liste_des_exercices_tableau').hide()
      $('#liste_des_exercices').hide()
      $('#replier').html('+')
    } else if ($('#mode_choix_liste').is(':visible')) {
      $('#liste_des_exercices_tableau').show()
      $('#liste_des_exercices').hide()
      $('#replier').html('-')
    } else {
      $('#liste_des_exercices_tableau').hide()
      $('#liste_des_exercices').show()
      $('#replier').html('-')
    }
  })
}

export function menuTheme (theme) {
  let codeHTML = '<h2 class="ui horizontal divider header">Exercices en ligne à données aléatoires</h2>'
  codeHTML += '\n<div class="ui middle aligned animated selection divided list">'
  const dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles, theme)
  for (const id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  codeHTML += '\n</div>'
  return codeHTML
}

export function menuThemeDNB (theme) {
  let codeHTML = `<h2 class="ui horizontal divider header">Exercices du brevet des collèges - ${theme}</h2>`
  codeHTML += '\n<div class="ui middle aligned animated selection divided list">'

  const dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireDNB, 'tags', theme)
  let tableauDesExercices = []
  for (const id in dictionnaire) {
    tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaitre les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (const id of tableauDesExercices) {
    codeHTML +=
      `<a style="line-height:2.5" class="item" href="/exercice.html?ex=${id}" target="_blank"><div class="header content"> ${dictionnaire[id].annee} - ${dictionnaire[id].lieu} - Ex ${dictionnaire[id].numeroExercice} ${liste_html_des_tags(dictionnaire[id])} </div></a> \n`
  }
  codeHTML += '\n</div>'
  return codeHTML
}
