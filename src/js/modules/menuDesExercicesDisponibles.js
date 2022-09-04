/* global Event event */
import { tridictionnaire, filtreDictionnaire, filtreDictionnaireValeurCle, filtreDictionnaireValeurTableauCle, enleveElement, compteOccurences } from './outils.js'
import dictionnaireDesExercicesAleatoires from './dictionnaireDesExercicesAleatoires.js'
import { dictionnaireC3 } from './dictionnaireC3.js'
import { dictionnaireDNB } from './dictionnaireDNB.js'
import { dictionnaireBAC } from './dictionnaireBAC.js'
import { dictionnaireE3C } from './dictionnaireE3C.js'
import { dictionnaireLycee } from './dictionnaireLycee.js'
import { dictionnaireCrpe } from './dictionnaireCrpe.js'
import { dictionnaireCrpeCoop } from './dictionnaireCrpeCoop'
import $ from 'jquery'
import 'datatables.net-dt/css/jquery.dataTables.css'
import { getFilterFromUrl, getVueFromUrl } from './gestionUrl.js'
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import { context } from './context.js'

// Liste tous les tags qui ont été utilisé dans un dictionnaire
function dictionnaireToTableauTags (dictionnaire) {
  const tags = new Set()
  for (const item in dictionnaire) {
    for (const k of dictionnaire[item].tags) {
      tags.add(k)
    }
  }
  // transforme le set en tableau dans l'ordre alphabétique
  return ([...tags].sort((a, b) => { return a.localeCompare(b) })) // Ordre alphabétique avec localCompare pour tenir compte des accents
}

const tableauTags = dictionnaireToTableauTags(dictionnaireDNB)
enleveElement(tableauTags, "Système d'équations")
enleveElement(tableauTags, 'Hors programme')

const tableauTagsCrpe = dictionnaireToTableauTags(dictionnaireCrpe)

const tableauTagsBAC = dictionnaireToTableauTags(dictionnaireBAC)

const tableauTagsE3C = dictionnaireToTableauTags(dictionnaireE3C)

// On concatène les différentes listes d'exercices
export const dictionnaireDesExercices = { ...dictionnaireDesExercicesAleatoires, ...dictionnaireDNB, ...dictionnaireC3, ...dictionnaireLycee, ...dictionnaireCrpe, ...dictionnaireCrpeCoop, ...dictionnaireBAC, ...dictionnaireE3C }
let listeDesExercicesDisponibles
if (getVueFromUrl() === 'amc') {
  const dictionnaireDesExercicesAMC = {}
  Object.entries(dictionnaireDesExercicesAleatoires).forEach(([id, props]) => {
    if (props.amcReady) dictionnaireDesExercicesAMC[id] = props
  })
  listeDesExercicesDisponibles = tridictionnaire(dictionnaireDesExercicesAMC)
} else {
  listeDesExercicesDisponibles = tridictionnaire(dictionnaireDesExercices)
}

function coupeChaine (titre, maxLength) {
  // permet de couper les titres trop longs pour affichage
  for (let i = maxLength; i > 5; i--) {
    if (titre[i] === ' ') {
      return titre.substr(0, i) + '\n' + titre.substr(i + 1, titre.length)
    }
  }
}

function spanExercice (id, titre) {
  // Construit le span de la ligne d'exercice (sauf pour les exercices dnb,bac,e3c ou crpe qui sont particuliers.
  let maxLength
  // Selon la taille de la fenêtre (de l'écran) on tronque les titres trop longs pour qu'ils restent sur une ligne.
  if (document.getElementById('exercices_disponibles') && document.getElementById('exercices_disponibles').clientWidth > 600) {
    maxLength = 80
  } else if (document.getElementById('exercices_disponibles') && document.getElementById('exercices_disponibles').clientWidth > 490) {
    maxLength = 60
  } else {
    maxLength = 50
  }
  // pour les titres trop longs on ajoute un tooltip avec le titre complet
  const tooltip = titre.length > maxLength
    ? 'data-tooltip="' + coupeChaine(titre, maxLength + 20) + '"'
    : ''
  const titreTronque = titre.length > maxLength ? titre.substr(0, maxLength) + '...' : titre
  const amcPrecisionType = context.isAmc ? `<span style="color:#f15929;"> ${listeDesExercicesDisponibles[id].amcType.text} </span>` : ''
  const filtre = getFilterFromUrl()
  const vue = getVueFromUrl()
  const iconeInteractifDisponible = (listeDesExercicesDisponibles[id].interactifReady && filtre !== 'interactif' && vue !== 'latex' && vue !== 'amc') ? `<span data-tooltip="Version interactive disponible."><a class="ui bouton lien_id_exercice" data-id_exercice="${id}" data-mode="interactif"><i id="${id}" class="keyboard outline icon orange" size="mini"></i></a></span>` : ''
  const tagNew = (listeDesExercicesDisponibles[id].newEx !== undefined && listeDesExercicesDisponibles[id].newEx.isNew) ? listeDesExercicesDisponibles[id].newEx.tag : ''
  const tagFeat = (listeDesExercicesDisponibles[id].updateEx !== undefined && listeDesExercicesDisponibles[id].updateEx.isNewFeat) ? listeDesExercicesDisponibles[id].updateEx.tag : ''
  return `<span class="id_exercice">${id}</span> - ${tagNew} ${tagFeat} <a class="ui bouton lien_id_exercice" ${tooltip} data-id_exercice="${id}">${titreTronque} ${amcPrecisionType ? '-' + amcPrecisionType : ''}</a></a>${iconeInteractifDisponible}<span data-content="Prévisualiser l'exercice."><i id="${id}" class="eye icon icone_preview" size="mini"></i></span></br>\n`
}

function listeHtmlDesExercicesDUnTheme (theme) {
  // Pour un thème donné fait la liste des titres des exercices disponibles
  // Appelée lorsqu'on fait la liste par niveau
  let liste = ''
  const dictionnaire = filtreDictionnaire(listeDesExercicesDisponibles, theme)
  let filtre = getFilterFromUrl()
  if (getVueFromUrl() === 'moodle') {
    filtre = 'interactif'
  }
  for (const id in dictionnaire) {
    if (filtre === 'interactif') {
      // avant il y avait un focntionnement avec qcmInteractif qui devient interactifReady cf commit f59bb8e
      if (dictionnaire[id].interactifReady) {
        liste += spanExercice(id, dictionnaire[id].titre)
      }
    } else if (context.isAmc > 0) {
      // à supprimer avant push liste += '<b>'+ dictionnaire[id].amcType.text+'</b> '
      liste += spanExercice(id, dictionnaire[id].titre)
    } else {
      liste += spanExercice(id, dictionnaire[id].titre)
    }
  }
  return liste
}
function aCrpe (id, dictionnaire, mode) {
  // donne la ligne pour un exercice d'annale de Crpe lorsqu'on les regarde par année.
  if (mode === 'annee') {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].lieu} -  ${dictionnaire[id].numeroInitial}</a> ${listeHtmlDesTags(dictionnaire[id])} </br>\n`
  } else {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].annee} - ${dictionnaire[id].lieu} -  ${dictionnaire[id].numeroInitial}</a> ${listeHtmlDesTags(dictionnaire[id])} </br>\n`
  }
}
function aDnb (id, dictionnaire, mode) {
  // donne la ligne pour un exercice dnb lorsqu'on les regarde par année.
  if (mode === 'annee') {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].lieu} - ${dictionnaire[id].mois} -  Ex ${dictionnaire[id].numeroInitial}</a> ${listeHtmlDesTags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`
  } else {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].annee} - ${id.substr(9, 2)} - ${dictionnaire[id].lieu} - Ex ${dictionnaire[id].numeroInitial}</a> ${listeHtmlDesTags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`
  }
}
function aBac (id, dictionnaire, mode) {
  // donne la ligne pour un exercice bac lorsqu'on les regarde par année.
  if (mode === 'annee') {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].lieu} - ${dictionnaire[id].mois} -  Ex ${dictionnaire[id].numeroInitial}</a> ${listeHtmlDesTags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`
  } else {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].annee} - ${id.substr(9, 2)} - ${dictionnaire[id].lieu} - Ex ${dictionnaire[id].numeroInitial}</a> ${listeHtmlDesTags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`
  }
}

function aE3c (id, dictionnaire, mode) {
  // donne la ligne pour un exercice e3c lorsqu'on les regarde par année.
  if (mode === 'annee') {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].lieu} - ${dictionnaire[id].mois} -  Ex ${dictionnaire[id].numeroInitial}</a> ${listeHtmlDesTags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`
  } else {
    return `<a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${id}">${dictionnaire[id].annee} - ${id.substr(9, 2)} - ${dictionnaire[id].lieu} - Ex ${dictionnaire[id].numeroInitial}</a> ${listeHtmlDesTags(dictionnaire[id])} <i id="${id}" class="eye icon icone_preview"></i></br>\n`
  }
}

function listeHtmlDesExercicesCrpeAnnee (annee) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurCle(dictionnaireCrpe, 'annee', annee)
  for (const id in dictionnaire) {
    liste += aCrpe(id, dictionnaire, 'annee')
  }
  return liste
}
function listeHtmlDesExercicesCrpeCoopAnnee (annee) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurCle(dictionnaireCrpeCoop, 'annee', annee)
  for (const id in dictionnaire) {
    liste += aCrpe(id, dictionnaire, 'annee')
  }
  return liste
}
function listeHtmlDesExercicesCrpeCoopTheme (theme) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireCrpeCoop, 'tags', theme)
  let tableauDesExercices = []
  for (const id in dictionnaire) {
    tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaître les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (const id of tableauDesExercices) {
    liste += aCrpe(id, dictionnaire, 'theme')
  }
  return liste
}
function listeHtmlDesExercicesCrpeTheme (theme) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireCrpe, 'tags', theme)
  let tableauDesExercices = []
  for (const id in dictionnaire) {
    tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaître les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (const id of tableauDesExercices) {
    liste += aCrpe(id, dictionnaire, 'theme')
  }
  return liste
}
function listeHtmlDesExercicesDNBAnnee (annee) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurCle(dictionnaireDNB, 'annee', annee)
  for (const id in dictionnaire) {
    liste += aDnb(id, dictionnaire, 'annee')
  }
  return liste
}
function listeHtmlDesExercicesDNBTheme (theme) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireDNB, 'tags', theme)
  let tableauDesExercices = []
  for (const id in dictionnaire) {
    tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaître les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (const id of tableauDesExercices) {
    liste += aDnb(id, dictionnaire, 'theme')
  }
  return liste
}
function listeHtmlDesExercicesBACAnnee (annee) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurCle(dictionnaireBAC, 'annee', annee)
  for (const id in dictionnaire) {
    liste += aBac(id, dictionnaire, 'annee')
  }
  return liste
}
function listeHtmlDesExercicesBACTheme (theme) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireBAC, 'tags', theme)
  let tableauDesExercices = []
  for (const id in dictionnaire) {
    tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaître les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (const id of tableauDesExercices) {
    liste += aBac(id, dictionnaire, 'theme')
  }
  return liste
}
function listeHtmlDesExercicesE3CAnnee (annee) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurCle(dictionnaireE3C, 'annee', annee)
  for (const id in dictionnaire) {
    liste += aE3c(id, dictionnaire, 'annee')
  }
  return liste
}
function listeHtmlDesExercicesE3CTheme (theme) {
  let liste = ''
  const dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireE3C, 'tags', theme)
  let tableauDesExercices = []
  for (const id in dictionnaire) {
    tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaître les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (const id of tableauDesExercices) {
    liste += aE3c(id, dictionnaire, 'theme')
  }
  return liste
}
function listeHtmlDesExercicesDUnNiveau (listeDeThemes) { // liste_de_themes = [['6N1','6N1 - Numérations et fractions niveau 1'] , [' ',' '] ]
  // Appelée par la fonction menuDesExercicesDisponibles
  let liste = ''
  for (const theme of listeDeThemes) {
    liste += `<h3>${theme[1]}</h3>`
    liste += listeHtmlDesExercicesDUnTheme(theme[0])
  }
  return liste
}
function listeHtmlDesExercicesDUnNiveauAvecSousTheme (listeDeThemes) { // liste_de_themes = [['6N1','6N1 - Numérations et fractions niveau 1'] , [' ',' '] ]
  // Appelée par la fonction menuDesExercicesDisponibles
  let liste = '<div class="accordion transition">'
  for (const theme of listeDeThemes) {
    liste += `<div class="title"><h3><i class="dropdown icon"></i>${theme[1]}</h3></div>`
    liste += '<div class="content">'
    for (let i = 2; i < theme.length; i++) {
      liste += `<h4 style="color:#f15929">${theme[i]}</h4>`
      if (theme[0].substr(0, 5) === 'canc3') {
        liste += listeHtmlDesExercicesDUnTheme(theme[i].substr(0, 6))
      } else if (theme[0].substr(0, 3) === 'can') {
        liste += listeHtmlDesExercicesDUnTheme(theme[i].substr(0, 5))
      } else {
        liste += listeHtmlDesExercicesDUnTheme(theme[i].substr(0, 4))
      }
    }
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}
function getListeHtmlDesExercicesCrpe () {
  let liste = '<div class="accordion">'
  for (const annee of ['2019', '2018', '2017', '2016', '2015']) {
    liste += `<div class="title"><i class="dropdown icon"></i> ${annee}</div><div class="content">`
    liste += listeHtmlDesExercicesCrpeAnnee(annee)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}
function getListeHtmlDesExercicesCrpeCoop () {
  let liste = '<div class="accordion">'
  for (const annee of ['2022']) {
    liste += `<div class="title"><i class="dropdown icon"></i> ${annee}</div><div class="content">`
    liste += listeHtmlDesExercicesCrpeCoopAnnee(annee)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}
function getListeHtmlDesExercicesDNB () {
  let liste = '<div class="accordion">'
  for (const annee of ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013']) {
    liste += `<div class="title"><i class="dropdown icon"></i> ${annee}</div><div class="content">`
    liste += listeHtmlDesExercicesDNBAnnee(annee)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}

function getListeHtmlDesExercicesDNBTheme () {
  let liste = '<div class="accordion">'
  for (const theme of tableauTags) {
    //     [
    //   "Agrandissement-réduction",
    //   "Aires et périmètres",
    //   "Algorithmique-programmation",
    //   "Arithmétique",
    //   "Calcul littéral",
    //   "Calculs numériques",
    //   "Durées",
    //   "Équations",
    //   "Fonctions",
    //   "Fractions",
    //   "Géométrie dans l'espace",
    //   "Géométrie plane",
    //   "Grandeurs composées",
    //   "Lecture graphique",
    //   "Pourcentages",
    //   "Prise d'initiatives",
    //   "Probabilités",
    //   "Programme de calculs",
    //   "Proportionnalité",
    //   "Puissances",
    //   "Pythagore",
    //   "QCM",
    //   "Recherche d'informations",
    //   "Statistiques",
    //   "Tableur",
    //   "Thalès",
    //   "Transformations",
    //   "Trigonométrie",
    //   "Vitesses",
    //   "Volumes",
    //   "Vrai-faux"
    // ]){
    liste += `<div class="title"><i class="dropdown icon"></i> ${theme}</div><div class="content">`
    liste += listeHtmlDesExercicesDNBTheme(theme)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}

function getListeHtmlDesExercicesBAC () {
  let liste = '<div class="accordion">'
  for (const annee of ['2021']) {
    liste += `<div class="title"><i class="dropdown icon"></i> ${annee}</div><div class="content">`
    liste += listeHtmlDesExercicesBACAnnee(annee)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}

function getListeHtmlDesExercicesBACTheme () {
  let liste = '<div class="accordion">'
  for (const theme of tableauTagsBAC) {
    liste += `<div class="title"><i class="dropdown icon"></i> ${theme}</div><div class="content">`
    liste += listeHtmlDesExercicesBACTheme(theme)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}

function getListeHtmlDesExercicesE3C () {
  let liste = '<div class="accordion">'
  for (const annee of ['2021']) {
    liste += `<div class="title"><i class="dropdown icon"></i> ${annee}</div><div class="content">`
    liste += listeHtmlDesExercicesE3CAnnee(annee)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}

function getListeHtmlDesExercicesE3CTheme () {
  let liste = '<div class="accordion">'
  for (const theme of tableauTagsE3C) {
    liste += `<div class="title"><i class="dropdown icon"></i> ${theme}</div><div class="content">`
    liste += listeHtmlDesExercicesE3CTheme(theme)
    liste += '</div>'
  }
  liste += '</div>'
  return liste
}

function getListeHtmlDesExercicesCrpeCoopTheme () {
  let liste = '<div class="accordion">'
  for (const theme of tableauTagsCrpe) {
    const listeHtml = listeHtmlDesExercicesCrpeCoopTheme(theme)
    if (listeHtml.length > 1) {
      liste += `<div class="title"><i class="dropdown icon"></i> ${theme}</div><div class="content">`
      liste += listeHtml
      liste += '</div>'
    }
  }
  liste += '</div>'
  return liste
}
function getListeHtmlDesExercicesCrpeTheme () {
  let liste = '<div class="accordion">'
  for (const theme of tableauTagsCrpe) {
    const listeHtml = listeHtmlDesExercicesCrpeTheme(theme)
    if (listeHtml.length > 1) {
      liste += `<div class="title"><i class="dropdown icon"></i> ${theme}</div><div class="content">`
      liste += listeHtml
      liste += '</div>'
    }
  }
  liste += '</div>'
  return liste
}

function listeHtmlDesTags (objet) {
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

function divNiveau (obj, active, id) {
  // construction de la div contenant l'ensemble d'un niveau.
  let nombreExo = ''
  if (id !== 'DNB' && id !== 'DNBtheme' && id !== 'CRPE' && id !== 'CRPECoop' && id !== 'CrpeCoopTheme' && id !== 'CrpeTheme' && id !== 'BAC' && id !== 'BACtheme' && id !== 'E3C' && id !== 'E3Ctheme') {
    nombreExo = '(' + obj.nombre_exercices_dispo + ')'
  }
  return `<div id=${id} class="${active ? 'active title fermer_niveau' : 'title ouvrir_niveau'}"><i class="dropdown icon"></i>${obj.label} ${nombreExo}</div><div id="content${id}" class="${active} content">${active ? obj.liste_html_des_exercices : ''}</div>`
}

function addExercice (e) {
  // fonction ajout d'un exercice : ajoute l'exercice dans l'input avec la liste des exercice et provoque l'evt change pour recalcul de la page.
  // utilisée lors du clic sur le nom d'un exercice.
  if ($(e.target).parents('a.lien_id_exercice').attr('data-mode') === 'interactif' || $(e.target).attr('data-mode') === 'interactif') {
    if (!document.getElementById('exoModeInteractif')) {
      $('#choix_exercices_menu').append('<span style="display:none" id="exoModeInteractif">ModeInteractifActivé</span>')
    }
  } else {
    $('#exoModeInteractif').remove()
  }
  const numero = $(e.target).attr('data-id_exercice') ? $(e.target).attr('data-id_exercice') : $(e.target).parents('a.lien_id_exercice').attr('data-id_exercice')
  if ($('#choix_des_exercices').val() === '' || context.vue === 'alc') { // Pour a la carte on ne selectionne qu'un seul exercice pour choisir ses paramètres.
    $('#choix_des_exercices').val(numero)
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

export function apparenceExerciceActif () {
  // Fonction permettant la mise en gras des exercices sélectionnés, d'ajouter l'icone moins et le nombre de fois ou on l'a sélectionné
  // appelée dans miseajourducode et afficheniveau (dès lors que les listes sont susceptibles d'être changées)
  let listeExercicesSelectionnes = document.getElementById('choix_des_exercices')
  if (listeExercicesSelectionnes !== null) {
    $('.exerciceactif').removeClass('exerciceactif')
    $('.delexercice').remove()
    listeExercicesSelectionnes = listeExercicesSelectionnes.value.split(',')
    for (let i = 0; i < listeExercicesSelectionnes.length; i++) {
      const elemListe = $(`a.lien_id_exercice[data-id_exercice='${listeExercicesSelectionnes[i]}']:not([data-mode])`)
      // Si un exercice a été mis plus d'une fois, on affiche le nombre de fois où il est demandé
      if (compteOccurences(listeExercicesSelectionnes, listeExercicesSelectionnes[i]) > 1) {
      // Ajout de first() car un exercice de DNB peut apparaître à plusieurs endroits
        if (document.getElementById(`count¤${listeExercicesSelectionnes[i]}`)) {
          document.getElementById(`count¤${listeExercicesSelectionnes[i]}`).innerText = ` ✖︎ ${compteOccurences(listeExercicesSelectionnes, listeExercicesSelectionnes[i])}`
        } else {
          elemListe.after(`<span id="count¤${listeExercicesSelectionnes[i]}"> ✖︎ ${compteOccurences(listeExercicesSelectionnes, listeExercicesSelectionnes[i])} </span>`)
        }
      } else {
        if (document.getElementById(`count¤${listeExercicesSelectionnes[i]}`)) {
          document.getElementById(`count¤${listeExercicesSelectionnes[i]}`).remove()
        }
      }
      if (!elemListe.hasClass('exerciceactif')) {
        elemListe.after(`<span data-tooltip="Supprimer la dernière occurence de l'exercice." class="delexercice"><i class="minus square icon delexercice" id="del¤${listeExercicesSelectionnes[i]}" ></i></span>`)
      }
      elemListe.addClass('exerciceactif')
    }
    $('.delexercice').off('click').on('click', function (e) {
      supprimerExo(e.target.id, true)
      e.stopPropagation()
    })
    $('.icone_preview').off('click').on('click', function (e) {
      e.stopPropagation()
      $('.popup').attr('data-exoId', e.target.id)
      $('.popup').trigger(e)
    })
  }
}

export function supprimerExo (num, last) {
// fonction suppression d'un exercice : supprime l'exercice dans l'input avec la liste des exercice et provoque l'evt change pour recalcul de la page.
  let idExo; const formChoixDesExercices = document.getElementById('choix_des_exercices')
  const listeExercicesSelectionnes = formChoixDesExercices.value.replace(/\s/g, '').replace(';', ',').split(',')
  if (last) { // alors on est dans le cas de la liste : on supprime la dernière occurence de l'identifiant de l'exercice.
    idExo = num.split('¤')
    num = listeExercicesSelectionnes.lastIndexOf(idExo[1])
  } else {
    num = parseInt(num)
  }
  listeExercicesSelectionnes.splice(num, 1)
  formChoixDesExercices.value = listeExercicesSelectionnes.toString()
  const event = new Event('change')
  document.getElementById('choix_des_exercices').dispatchEvent(event)
}

function ligneTableau (exercice) {
  // Construction d'une ligne du tableau pour l'affichage en mode tableau
  let ligne = ''
  const modeAmc = dictionnaireDesExercices[exercice].amcReady ? `AMC <b>${dictionnaireDesExercices[exercice].amcType.text}</b>` : ''
  // avant il y avait un focntionnement avec qcmInteractif qui devient interactifReady cf commit f59bb8e
  const modeInteractif = dictionnaireDesExercices[exercice].interactifReady ? `<a class="ui bouton lien_id_exercice" data-id_exercice="${exercice}" data-mode="interactif"> Interactif </a>` : ''
  const tagNew = (dictionnaireDesExercices[exercice].newEx !== undefined && dictionnaireDesExercices[exercice].newEx.isNew) ? dictionnaireDesExercices[exercice].newEx.tag : ''
  const tagFeat = (dictionnaireDesExercices[exercice].updateEx !== undefined && dictionnaireDesExercices[exercice].updateEx.isNewFeat) ? dictionnaireDesExercices[exercice].updateEx.tag : ''
  if (dictionnaireDesExercices[exercice].titre) {
    if (context.isAmc) {
      ligne = `<tr><td class="colonnecode"><span class="id_exercice">${exercice} <br> ${tagNew} ${tagFeat}
      </span></td> <td> <a class="lien_id_exercice" data-id_exercice="${exercice}">${dictionnaireDesExercices[exercice].titre}
      </a></td><td> ${modeAmc} <br> ${modeInteractif}
      </td><td data-tooltip="Prévisualiser l'exercice."><i id="${exercice}" class="eye icon icone_preview" ></td></tr>`
    } else {
      ligne = `<tr><td class="colonnecode"><span class="id_exercice">${exercice} <br> ${tagNew} ${tagFeat}
      </span></td> <td> <a class="lien_id_exercice" data-id_exercice="${exercice}">${dictionnaireDesExercices[exercice].titre}
      </a></td><td> ${modeAmc} ${modeInteractif}
      </td><td data-tooltip="Prévisualiser l'exercice."><i id="${exercice}" class="eye icon icone_preview" ></td></tr>`
    }
  } else {
    ligne = `<tr><td class="colonnecode"><span class="id_exercice">${exercice}<br>${tagNew}${tagFeat}
    </span></td> <td><a style="line-height:2.5" class="lien_id_exercice" data-id_exercice="${exercice}">${dictionnaireDesExercices[exercice].annee} - ${exercice.substr(9, 2)} - ${dictionnaireDesExercices[exercice].lieu} - Ex ${dictionnaireDesExercices[exercice].numeroInitial}
    </a> ${listeHtmlDesTags(dictionnaireDesExercices[exercice])} </br>\n
    </td><td></td><td><i id=${exercice} class="eye icon icone_preview"></i></td></tr>`
  }
  return ligne
}

function htmlListes (objaff) {
  const listeAffichageLength = objaff.liste_affichage.length
  let liste = ''; let lignes = ''
  for (let i = 0; i < listeAffichageLength; i++) {
    if (objaff.liste_affichage[i] === objaff.liste_affichage.active) { // liste active
      liste += divNiveau(objaff.obj_ex[objaff.liste_affichage[i]], 'active', objaff.liste_affichage[i])
    } else {
      liste += divNiveau(objaff.obj_ex[objaff.liste_affichage[i]], '', objaff.liste_affichage[i])
    }
    lignes += objaff.obj_ex[objaff.liste_affichage[i]].lignes_tableau
  }
  return { liste: liste, lignes: lignes }
}

export function menuDesExercicesDisponibles () {
// Construction des menus disponibles dans le contexte choisi (en lien avec les filtres ou la page utilisée)
// Détermine le nombre d'exercices par niveaux
// appelé :
//   * au chargement de mathalea.html, cm.html, mathalealatex.html mathalea_amc.html, beta.html
//   * lors de l'application des filtres (evenement change du select des filtres)
// le tableau est mis dans le DOM, la liste des exercices n'est pas mise dans le DOM mais conservée pour les ajouter lorsqu'on déplie les accordéons.
  let listeHtmlDesExercices, htmlAffichage, listeHtmlDesExercicesTab
  if (document.getElementById('liste_des_exercices_tableau')) {
    document.getElementById('liste_des_exercices_tableau').innerHTML = ''
    document.getElementById('liste_des_exercices').innerHTML = ''
  }
  const listeThemesCan = [
    ['canc3', 'canc3 - Course aux nombres niveau CM1-CM2', 'canc3C - Calculs', 'canc3D - Durées', 'canc3M - Mesures', 'canc3N - Numération'],
    ['can6', 'can6 - Course aux nombres niveau 6e', 'can6a - Annales aléatoires', 'can6C - Calculs', 'can6D - Durées', 'can6G - Géométrie', 'can6I - Algorithmique', 'can6M - Mesures', 'can6N - Numération', 'can6P - Proportionnalité', 'can6S - Statistiques'],
    ['can5', 'can5 - Course aux nombres niveau 5e', 'can5a - Annales aléatoires', 'can5A - Algorithmes', 'can5C - Calculs', 'can5D - Durées', 'can5G - Géométrie', 'can5L - Calcul littéral', 'can5N - Numération', 'can5P - Proportionnalité'],
    ['can4', 'can4 - Course aux nombres niveau 4e', 'can4a - Annales aléatoires', 'can4C - Calculs', 'can4G - Géométrie', 'can4L - Calcul littéral', 'can4P - Proportionnalité'],
    ['can3', 'can3 - Course aux nombres niveau 3e', 'can3a - Annales aléatoires', 'can3C - Calculs', 'can3F - Fonctions', 'can3G - Géométrie', 'can3L - Calcul littéral', 'can3M - Mesures', 'can3P - Proportionnalité', 'can3S - Statistiques & probabilités'],
    ['can2', 'can2 - Course aux nombres niveau 2e', 'can2a - Annales aléatoires', 'can2C - Calculs', 'can2F - Fonctions', 'can2G - Géométrie', 'can2L - Calcul littéral', 'can2N - Numération', 'can2P - Probabilités'],
    ['can1', 'can1 - Course aux nombres niveau 1e', 'can1a - Annales aléatoires', 'can1F - Fonctions', 'can1G - Géométrie', 'can1L - Calcul littéral', 'can1P - Probabilités', 'can1S - Suites'],
    ['canT', 'canT - Course aux nombres niveau Terminale'],
    ['canEx', 'canExpert - Course aux nombres niveau Terminale expert'],
    ['canP', 'canPredef - Courses aux nombres clé en main']]
  const listeThemesC3 = [
    ['c3C1', 'c3C1 - Calculs niveau 1'], ['c3C2', 'c3C2 - Calculs niveau 2'], ['c3C3', 'c3C3 - Calculs niveau 3'], ['c3I1', 'c3I1 - Algorithmique'],
    ['c3N1', 'c3N1 - Numération Niveau 1'], ['c3N2', 'c3N2 - Numération Niveau 2'], ['c3N3', 'c3N3 - Numération Niveau 3']]
  const listeThemes6 = [
    ['6C1', '6C1 - Calculs niveau 1'], ['6C2', '6C2 - Calculs niveau 2'], ['6C3', '6C3 - Calculs niveau 3'],
    ['6D1', '6D1 - Les durées'],
    ['6G1', '6G1 - Géométrie niveau 1'], ['6G2', '6G2 - Géométrie niveau 2'], ['6G3', '6G3 - Géométrie niveau 3'], ['6G4', '6G4 - Géométrie niveau 4'],
    ['6I1', '6I1 - Algorithmique'],
    ['6M1', '6M1 - Grandeurs et mesures niveau 1'], ['6M2', '6M2 - Grandeurs et mesures niveau 2'], ['6M3', '6M3 - Volumes'],
    ['6N1', '6N1 - Numération et fractions niveau 1'], ['6N2', '6N2 - Numération et fractions niveau 2'], ['6N3', '6N3 - Numération et fractions niveau 3'], ['6N4', '6N4 - Numération et fractions niveau 4'],
    ['6P1', '6P1 - Proportionnalité'], ['6S1', '6S1 - Statistiques']]
  const listeThemes5 = [
    ['5A1', '5A1 - Arithmetique'], ['5C1', '5C1 - Calculs'],
    ['5G1', '5G1 - Symétries'], ['5G2', '5G2 - Triangles'], ['5G3', '5G3 - Angles'], ['5G4', '5G4 - Parallélogrammes'], ['5G5', '5G5 - Espace'],
    ['5I1', '5I1 - Algorithmique'],
    ['5L1', '5L1 - Calcul littéral'],
    ['5M1', '5M1 - Périmètres et aires'], ['5M2', '5M2 - Volumes'], ['5M3', '5M3 - Durées'],
    ['5N1', '5N1 - Numération et fractions niveau 1'], ['5N2', '5N2 - Calculs avec les fractions'],
    ['5P1', '5P1 - Proportionnalité'], ['5R1', '5R1 - Relatifs niveau 1'], ['5R2', '5R2 - Relatifs niveau 2'],
    ['5S1', '5S1 - Statistiques'], ['5S2', '5S2 - Probabilités']]
  const listeThemes4 = [
    ['4A1', '4A1 - Arithmétique'],
    ['4C1', '4C1 - Relatifs'], ['4C2', '4C2 - Fractions'], ['4C3', '4C3 - Puissances'],
    ['4F1', '4F1 - Notion de fonction'],
    ['4G1', '4G1 - Translation et rotation'], ['4G2', '4G2 - Théorème de Pythagore'], ['4G3', '4G3 - Théorème de Thalès'], ['4G4', "4G4 - Cosinus d'un angle"], ['4G5', '4G5 - Espace'],
    ['4I1', '4I1 - Algorithmique'],
    ['4L1', '4L1 - Calcul littéral'], ['4L2', '4L2 - Équation'], ['4P1', '4P1 - Proportionnalité'], ['4S1', '4S1 - Statistiques'], ['4S2', '4S2 - Probabilités']]
  const listeThemes3 = [
    ['3A1', '3A1 - Arithmetique'],
    ['3F1', '3F1 - Généralités sur les fonctions'], ['3F2', '3F2 - Fonctions affines et linéaires'],
    ['3G1', '3G1 - Homothétie et rotation'], ['3G2', '3G2 - Théorème de Thalès'], ['3G3', '3G3 - Trigonométrie'], ['3G4', '3G4 - Espace'],
    ['3I1', '3I1 - Algorithmique premier niveau'],
    ['3L1', '3L1 - Calcul littéral'], ['3P1', '3P1 - Proportionnalité'], ['3S1', '3S1 - Statistiques'], ['3S2', '3S2 - Probabilités']]
  const listeThemes2 = [
    ['2F1', '2F1 - Se constituer un répertoire de fonctions de référence', '2F10 - Connaître les  fonctions affines',
      '2F11 - Comparer et calculer des images en utilisant les fonctions de référence',
      '2F12 - Résoudre algébriquement ou graphiquement  f(x)=k ou f(x)&lt;k avec f fonction de référence'],
    ['2F2', '2F2 - Représenter algébriquement et graphiquement les fonctions', '2F20 - Exploiter l\'équation y=f(x) d\'une courbe : appartenance, calcul de coordonnées',
      '2F21 - Modéliser par des fonctions des situations issues des mathématiques, des autres disciplines',
      '2F22 - Résoudre f(x)=k ou f(x)&lt;k en choisissant une méthode adaptée',
      '2F23 - Résoudre une équation, une inéquation produit ou quotient, à l\'aide d\'un tableau de signes',
      '2F24 - Résoudre graphiquement ou avec un outil numérique, f(x)=g(x) ou f(x)&lt;g(x)',
      '2F25 - Étudier la parité d\'une fonction'],
    ['2F3', '2F3 - Étudier les variations et les extremums d\'une fonction', '2F30 - Relier représentation graphique et tableau de variations',
      '2F31 - Utiliser les variations d\'une fonction',
      '2F32 - Déterminer les extremums d\'une fonction'],
    ['2G1', '2G1 - Les bases en géométrie',
      '2G10 - Connaître les définitions et propriétés de bases en géométrie plane',
      '2G11 - Calculer des longueurs, des angles, des aires et des volumes',
      '2G12 - Calculer la distance entre deux points. Calculer les coordonnées du milieu d’un segment',
      '2G13 - Traiter des problèmes d’optimisation'],
    ['2G2', '2G2 - Les vecteurs', '2G20 - Représenter géométriquement des vecteurs',
      '2G21 - Construire géométriquement la somme de deux vecteurs',
      '2G22 - Représenter un vecteur dont on connaît les coordonnées. Lire les coordonnées d’un vecteur',
      '2G23 - Utiliser et connaître les translations définies par des vecteurs',
      '2G24 - Calculer les coordonnées d’une somme de vecteurs, d’un produit d’un vecteur par un nombre réel',
      '2G25 - Caractériser alignement et parallélisme par la colinéarité de vecteurs',
      '2G26 - Résoudre des problèmes en utilisant la représentation la plus adaptée des vecteurs'],
    ['2G3', '2G3 - Représenter et caractériser les droites du plan', '2G30 - Déterminer une équation de droite à partir de deux points, un point et un vecteur directeur ou un point et la pente',
      '2G31 - Déterminer la pente ou un vecteur directeur d’une droite donnée par une équation ou une représentation graphique',
      '2G32 - Tracer une droite connaissant son équation cartésienne ou réduite',
      '2G33 - Établir alignement et parallélisme',
      '2G34 - Résoudre un système de deux équations linéaires à deux inconnues, déterminer le point d’intersection de deux droites sécantes'],
    ['2N1', '2N1 - Manipuler les nombres réels', '2N10 - Associer à chaque point de la droite graduée un unique nombre réel et réciproquement',
      '2N11 - Représenter un intervalle de la droite numérique. Déterminer si un nombre réel appartient à un intervalle donné',
      '2N12 - Donner un encadrement, d’amplitude donnée, d’un nombre réel par des décimaux',
      '2N13 - Dans le cadre de la résolution de problèmes, arrondir en donnant le nombre de chiffres significatifs adapté à la situation étudiée',
      '2N14 - Connaître Les ensembles de nombres',
      '2N15 - Connaître et utiliser la notation |a|'],
    ['2N2', '2N2 - Utiliser les notions de multiple, diviseur et de nombre premier', '2N20 - Modéliser et résoudre des problèmes mobilisant les notions de multiple, de diviseur, de nombre pair, de nombre impair, de nombre premier'],
    ['2N3', '2N3 - Utiliser les fractions, les puissances et les racines carrées', '2N30 - Éffectuer des calculs numériques mettant en jeu des écritures fractionnaires',
      '2N31 - Effectuer des calculs numériques mettant en jeu des puissances',
      '2N32 - Effectuer des calculs numériques mettant en jeu des racines carrées'],
    ['2N4', '2N4 - Utiliser le calcul littéral', '2N40 - Les bases du calcul littéral',
      '2N41 - Factoriser, développer avec, ou sans, les identités remarquables',
      '2N42 - Utiliser le calcul littéral'],
    ['2N5', '2N5 - Équations', '2N50 - Modéliser un problème par une équation',
      '2N51 - Résoudre une équation du premier degré',
      '2N52 - Résoudre une équation avec un produit nul'],
    ['2N6', '2N6 - Inéquations', '2N60 - Résoudre une inéquation du premier degré',
      '2N61 - Résoudre une inéquation produit'],
    ['2S1', '2S1 - Utiliser l\'information chiffrée', '2S10 - Exploiter la relation entre effectifs, proportions et pourcentages. Pourcentage de pourcentage',
      '2S11 - Exploiter la relation entre deux valeurs successives et leur taux d\'évolution',
      '2S12 - Calculer le taux d\'évolution global à partir des taux d\'évolution successifs. Calculer un taux d\'évolution réciproque'],
    ['2S2', '2S2 - Statistique descriptive', '2S20 - Les indicateurs statistiques',
      '2S21 - Décrire les différences entre deux séries statistiques',
      '2S22 - Lire et comprendre une fonction écrite en Python renvoyant la moyenne (m), l\'écart type (s) et la proportion d\'éléments dans [m-2s;m+2s]'],
    ['2S3', '2S3 - Modéliser le hasard, calculer des probabiltés', '2S31 - Utiliser des modèles théoriques de référence',
      '2S30 - Calculer des probabilités dans des cas simples'],
    ['2S4', '2S4 - Échantillonnage']
  ]
  const listeThemesTechno1 = [
    ['techno1P', 'techno1P - Proportions'], ['techno1E', 'techno1E - Évolutions']
  ]
  const listeThemesEx = [
    ['ExC1', 'ExC1 - Calculs avec nombres complexes'], ['ExE1', 'ExE1 - Équations'], ['ExL1', 'ExL1 - Calcul littéral']
  ]
  const listeThemesHP = [
    ['HPC1', 'HPC1 - Calculs']
  ]

  const objExercicesDisponibles = {
    ca: {
      label: 'Course aux nombres',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveauAvecSousTheme(listeThemesCan),
      lignes_tableau: ''
    },
    c3: {
      label: 'CM1 /CM2',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveau(listeThemesC3),
      lignes_tableau: ''
    },
    6: {
      label: 'Sixième',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveau(listeThemes6),
      lignes_tableau: ''
    },
    5: {
      label: 'Cinquième',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveau(listeThemes5),
      lignes_tableau: ''
    },
    4: {
      label: 'Quatrième',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveau(listeThemes4),
      lignes_tableau: ''
    },
    3: {
      label: 'Troisième',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveau(listeThemes3),
      lignes_tableau: ''
    },
    DNB: {
      label: 'Exercices de brevet corrigés par l\'APMEP (classés par année)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesDNB(),
      lignes_tableau: ''
    },
    DNBtheme: {
      label: 'Exercices de brevet corrigés par l\'APMEP (classés par thème)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesDNBTheme(),
      lignes_tableau: ''
    },
    BAC: {
      label: 'Exercices de bac corrigés par l\'APMEP (classés par année)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesBAC(),
      lignes_tableau: ''
    },
    BACtheme: {
      label: 'Exercices de bac corrigés par l\'APMEP (classés par thème)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesBACTheme(),
      lignes_tableau: ''
    },
    E3C: {
      label: 'Exercices E3C corrigés par l\'APMEP (classés par année)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesE3C(),
      lignes_tableau: ''
    },
    E3Ctheme: {
      label: 'Exercices E3C corrigés par l\'APMEP (classés par thème)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesE3CTheme(),
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
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveauAvecSousTheme(listeThemes2),
      lignes_tableau: ''
    },
    1: {
      label: 'Première',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    },
    techno1: {
      label: 'Première Technologique',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveau(listeThemesTechno1),
      lignes_tableau: ''
    },
    T: {
      label: 'Terminale',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: '',
      lignes_tableau: ''
    },
    Ex: {
      label: 'Terminale expert',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveau(listeThemesEx),
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
    },
    HP: {
      label: 'Hors programme Lycée',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: listeHtmlDesExercicesDUnNiveau(listeThemesHP),
      lignes_tableau: ''
    },
    CRPECoop: {
      label: 'Concours CRPE 2022',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesCrpeCoop(),
      lignes_tableau: ''
    },
    CrpeCoopTheme: {
      label: 'Concours CRPE 2022 (classés par thème)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesCrpeCoopTheme(),
      lignes_tableau: ''
    },
    CRPE: {
      label: 'Concours CRPE 2015-2019 corrigés par la Copirelem (classés par année)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesCrpe(),
      lignes_tableau: ''
    },
    CrpeTheme: {
      label: 'Concours CRPE 2015-2019 corrigés par la Copirelem (classés par thème)',
      nombre_exercices_dispo: 0,
      liste_html_des_exercices: getListeHtmlDesExercicesCrpeTheme(),
      lignes_tableau: ''
    }
  }

  listeHtmlDesExercicesTab = ''
  const filtre = getFilterFromUrl()

  // Calcul et comptage des lignes
  for (const id in listeDesExercicesDisponibles) {
    if ((id[0] === 'c' && id[1] === 'a') || (id[0] === 'c' && id[1] === '3') || (id[0] === 'P' && id[1] === '0') || (id[0] === 'P' && id[1] === 'E') || (id[0] === 'b' && id[1] === 'e') || (id[0] === 'E' && id[1] === 'x') || (id[0] === 'H' && id[1] === 'P')) {
      if (filtre === 'interactif') {
        if (dictionnaireDesExercices[id].interactifReady) {
          objExercicesDisponibles[id[0] + id[1]].nombre_exercices_dispo += 1
          objExercicesDisponibles[id[0] + id[1]].lignes_tableau += ligneTableau(id)
        }
      } else {
        objExercicesDisponibles[id[0] + id[1]].nombre_exercices_dispo += 1
        objExercicesDisponibles[id[0] + id[1]].lignes_tableau += ligneTableau(id)
      }
    }
    if (id[0] === '6' || id[0] === '5' || id[0] === '4' || id[0] === '3' || id[0] === '2' || id[0] === '1' || id[0] === 'T' || id[0] === 'C') {
      if (filtre === 'interactif') {
        if (dictionnaireDesExercices[id].interactifReady) {
          objExercicesDisponibles[id[0]].nombre_exercices_dispo += 1
          objExercicesDisponibles[id[0]].lignes_tableau += ligneTableau(id)
        }
      } else {
        objExercicesDisponibles[id[0]].nombre_exercices_dispo += 1
        objExercicesDisponibles[id[0]].lignes_tableau += ligneTableau(id)
      }
    }
    if (id[0] === '1' || id[0] === 'T' || id[0] === 'C') {
      if (filtre === 'interactif') {
        if (dictionnaireDesExercices[id].interactifReady) {
          objExercicesDisponibles[id[0]].liste_html_des_exercices += spanExercice(id, dictionnaireDesExercices[id].titre)
        }
      } else {
        objExercicesDisponibles[id[0]].liste_html_des_exercices += spanExercice(id, dictionnaireDesExercices[id].titre)
      }
    }
    if ((id[0] === 'P' && id[1] === '0') || (id[0] === 'P' && id[1] === 'E') || (id[0] === 'b' && id[1] === 'e')) {
      if (filtre !== 'interactif') {
        objExercicesDisponibles[id[0] + id[1]].liste_html_des_exercices += spanExercice(id, dictionnaireDesExercices[id].titre)
      }
    }
    if (id[0] === 'd' && id[1] === 'n' && id[2] === 'b') {
      if (filtre !== 'interactif') {
        objExercicesDisponibles.DNB.lignes_tableau += ligneTableau(id)
      }
    }
    if (id[0] === 'c' && id[1] === 'r' && id[2] === 'p' && id[3] === 'e') {
      if (filtre !== 'interactif') {
        objExercicesDisponibles.CRPE.lignes_tableau += ligneTableau(id)
      }
    }
    if (id.substring(0, 7) === 'techno1') {
      if (filtre === 'interactif') {
        if (dictionnaireDesExercices[id].interactifReady) {
          objExercicesDisponibles.techno1.nombre_exercices_dispo += 1
          objExercicesDisponibles.techno1.lignes_tableau += ligneTableau(id)
        }
      } else {
        objExercicesDisponibles.techno1.nombre_exercices_dispo += 1
        objExercicesDisponibles.techno1.lignes_tableau += ligneTableau(id)
      }
    }
    if (id[0] === 'b' && id[1] === 'a' && id[2] === 'c') {
      if (filtre !== 'interactif') {
        objExercicesDisponibles.BAC.lignes_tableau += ligneTableau(id)
      }
    }
    if (id[0] === 'e' && id[1] === '3' && id[2] === 'c') {
      if (filtre !== 'interactif') {
        objExercicesDisponibles.E3C.lignes_tableau += ligneTableau(id)
      }
    }
  }

  listeHtmlDesExercices = '<div class="ui accordion">'
  // Change l'ordre des exercices suivant l'URL ou le filtre.
  if (filtre === 'beta') {
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.be, 'active', 'be')
    listeHtmlDesExercices += '</div>'
    listeHtmlDesExercicesTab += objExercicesDisponibles.be.lignes_tableau
  } else if (context.vue === 'cm') {
    htmlAffichage = htmlListes({
      liste_affichage: ['ca', 'C', 'c3', 6, 5, 4, 3, 2, 1, 'techno1', 'T', 'Ex', 'HP', 'PE'],
      active: 'C',
      obj_ex: objExercicesDisponibles
    })
    listeHtmlDesExercices += htmlAffichage.liste + '</div>'
    listeHtmlDesExercicesTab += htmlAffichage.lignes
  } else if (filtre === 'outils') {
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.P0, 'active', 'P0')
    listeHtmlDesExercices += '</div>'
    listeHtmlDesExercicesTab += objExercicesDisponibles.P0.lignes_tableau
  } else if (context.vue === 'crpe') {
    // listeHtmlDesExercices += divNiveau(objExercicesDisponibles.CRPECoop, 'active', 'CrpeTheme')
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.CrpeTheme, 'active', 'CrpeTheme')
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.CRPE, 'active', 'CRPE')
    listeHtmlDesExercices += '</div>'
    listeHtmlDesExercicesTab += objExercicesDisponibles.CRPE.lignes_tableau
  } else if (filtre === 'dnb') {
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.DNB, 'active', 'DNB')
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.DNBtheme, 'active', 'DNBtheme')
    listeHtmlDesExercices += '</div>'
    listeHtmlDesExercicesTab += objExercicesDisponibles.DNB.lignes_tableau
  } else if (filtre === 'bac') {
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.BAC, 'active', 'BAC')
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.BACtheme, 'active', 'BACtheme')
    listeHtmlDesExercices += '</div>'
    listeHtmlDesExercicesTab += objExercicesDisponibles.BAC.lignes_tableau
  } else if (filtre === 'e3c') {
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.E3C, 'active', 'E3C')
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.E3Ctheme, 'active', 'E3Ctheme')
    listeHtmlDesExercices += '</div>'
    listeHtmlDesExercicesTab += objExercicesDisponibles.E3C.lignes_tableau
  } else if (filtre === 'primaire') {
    listeHtmlDesExercices += divNiveau(objExercicesDisponibles.c3, 'active', 'c3')
    listeHtmlDesExercices += '</div>'
    listeHtmlDesExercicesTab += objExercicesDisponibles.c3.lignes_tableau
  } else if (filtre === 'college') {
    htmlAffichage = htmlListes({
      liste_affichage: ['ca', 6, 5, 4, 3, 'DNB', 'DNBtheme', 'C'],
      active: '',
      obj_ex: objExercicesDisponibles
    })
    listeHtmlDesExercices += htmlAffichage.liste + '</div>'
    listeHtmlDesExercicesTab += htmlAffichage.lignes
  } else if (filtre === 'lycee') {
    htmlAffichage = htmlListes({
      liste_affichage: ['ca', 2, 1, 'techno1', 'T', 'Ex'],
      active: '',
      obj_ex: objExercicesDisponibles
    })
    listeHtmlDesExercices += htmlAffichage.liste + '</div>'
    listeHtmlDesExercicesTab += htmlAffichage.lignes
  } else if (filtre === 'crpe') {
    htmlAffichage = htmlListes({
      liste_affichage: ['PE'],
      active: '',
      obj_ex: objExercicesDisponibles
    })
    listeHtmlDesExercices += htmlAffichage.liste + '</div>'
    listeHtmlDesExercicesTab += htmlAffichage.lignes
  } else if (context.isAmc) {
    htmlAffichage = htmlListes({
      liste_affichage: ['ca', 'c3', 6, 5, 4, 3, 2, 1, 'techno1', 'T', 'Ex', 'HP', 'PE', 'C'],
      active: '',
      obj_ex: objExercicesDisponibles
    })
    listeHtmlDesExercices += htmlAffichage.liste + '</div>'
    listeHtmlDesExercicesTab += htmlAffichage.lignes
  } else {
    htmlAffichage = htmlListes({
      liste_affichage: ['ca', 'c3', 6, 5, 4, 3, 'DNB', 'DNBtheme', 2, 1, 'techno1', 'T', 'Ex', 'HP', 'E3C', 'E3Ctheme', 'BAC', 'BACtheme', 'PE', 'CrpeCoopTheme', 'CRPECoop', 'CrpeTheme', 'CRPE', 'C'],
      active: '',
      obj_ex: objExercicesDisponibles
    })
    listeHtmlDesExercices += htmlAffichage.liste
    listeHtmlDesExercicesTab += htmlAffichage.lignes
    // Ajoute les outils prof sur mathalealatex
    if (context.vue === 'latex') {
      listeHtmlDesExercices += divNiveau(objExercicesDisponibles.P0, '', 'P0')
      listeHtmlDesExercicesTab += objExercicesDisponibles.P0.lignes_tableau
    }
    listeHtmlDesExercices += '</div>'
  }

  $('#liste_des_exercices').html(listeHtmlDesExercices)
  $('.lien_id_exercice').off('click').on('click', function () { addExercice(event) })
  listeHtmlDesExercicesTab = `<div id="recherche"> </div><table id='listtab' class="stripe"><thead>
    <tr><th class="colonnecode">Code</th><th>Intitulé de l'exercice</th><th>Mode</th><th>Prévisualiser</th></thead><tbody>
    ${listeHtmlDesExercicesTab}
    </tbody><tfoot><tr><th class="colonnecode">Code</th><th>Intitulé de l'exercice</th><th>Mode</th><th>Prévisualiser</th></tr>
    </tfoot></table>`
  $('#liste_des_exercices_tableau').html(listeHtmlDesExercicesTab)
  $('#liste_des_exercices_tableau').hide()
  $('#mode_choix_liste').hide()
  $('.popuptext').hide()

  // lancement de katex pour les titres qui ont du latex
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
    apparenceExerciceActif()
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

  function afficherNiveau () {
  // Fonction qui permet l'ajout dans le dom de la liste des exercices correspondant à l'accordéo déplié.
    let elem
    if ($(event.target).hasClass('dropdown')) {
      elem = event.target.parentElement
    } else {
      elem = event.target
    }
    $('.fermer_niveau').trigger('click')
    $(elem).replaceWith(divNiveau(objExercicesDisponibles[elem.id], 'active', elem.id))
    $(elem).removeClass('ouvrir_niveau')
    $(elem).addClass('fermer_niveau')
    $('.fermer_niveau').off('click').on('click', function () {
      masquerNiveau()
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
    apparenceExerciceActif() // Lorsqu'on déplie un accordéon il faut gérer l'apprence des exercices qui avaient été sélectionnés.
    $('.lien_id_exercice').off('click').on('click', function (e) { addExercice(e) })
    $('.icone_preview').off('click').on('click', function (e) {
      $('.popup').trigger('click')
    })
  }

  function masquerNiveau () {
  // Lorsqu'on ferme un niveau on supprime du DOM la liste des exercices.
    $('.fermer_niveau').next().remove()
    $('.fermer_niveau').removeClass('active')
    $('.fermer_niveau').addClass('ouvrir_niveau')
    $('.fermer_niveau').removeClass('fermer_niveau')
    $('.ouvrir_niveau').off('click').on('click', function () {
      afficherNiveau()
    })
  }

  // Gestionnaire d'évenement de l'ouverture/fermeture d'un niveau d'exercices.
  $('.ouvrir_niveau').off('click').on('click', function () {
    afficherNiveau()
  })
  $('.fermer_niveau').off('click').on('click', function () {
    masquerNiveau()
  })

  async function gestionTableau () {
    // Fonction qui charge datatable pour l'affichage du tableau (champ de recherche et pagination)
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
      return !data ? '' : typeof data === 'string' ? removeAccents(data) : data
    }
    searchType.html = function (data) {
      return !data ? '' : typeof data === 'string' ? removeAccents(data.replace(/<.*?>/g, '')) : data
    }
    $('#listtab').DataTable({
      ordering: false,
      fixedHeader: true,
      language: {
        sEmptyTable: 'Aucune donnée disponible dans le tableau',
        sInfo: "Affichage de l'élément _START_ à _END_ sur _TOTAL_ élément(s)",
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
      await gestionTableau()
    }
    $('#liste_des_exercices_tableau').show()
    $('#liste_des_exercices').hide()
    $('#mode_choix_liste').show()
    $('#mode_choix_tableau').hide()
    $('#replier').html('-')
  })

  // Gestion de l'evenement du click sur le - qui est présent en mode une colonne pour replier la partie "choix des exercices".
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
  const dictionnaire = filtreDictionnaire(listeDesExercicesDisponibles, theme)
  for (const id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/mathalea.html?ex=${id}&v=ex" target="_blank">
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
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaître les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (const id of tableauDesExercices) {
    codeHTML +=
      `<a style="line-height:2.5" class="item" href="/mathalea.html?ex=${id}&v=ex" target="_blank"><div class="header content"> ${dictionnaire[id].annee} - ${dictionnaire[id].lieu} - Ex ${dictionnaire[id].numeroInitial} ${listeHtmlDesTags(dictionnaire[id])} </div></a> \n`
  }
  codeHTML += '\n</div>'
  return codeHTML
}
