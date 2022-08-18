/**
 * Module pour coopmaths.fr qui sert à lister les exercices d'un thème
 */

import dictionnaireDesExercicesAleatoires from './dictionnaireDesExercicesAleatoires.js'
import { dictionnaireC3 } from './dictionnaireC3.js'
import { dictionnaireDNB } from './dictionnaireDNB.js'
import { dictionnaireLycee } from './dictionnaireLycee.js'

function tridictionnaire (dict) {
  const sorted = []
  for (const key in dict) {
    sorted[sorted.length] = key
  }
  sorted.sort()

  const tempDict = {}
  for (let i = 0; i < sorted.length; i++) {
    tempDict[sorted[i]] = dict[sorted[i]]
  }

  return tempDict
}

export function filtreDictionnaireValeurTableauCle (dict, key, val) {
  return Object.fromEntries(Object.entries(dict).filter(([k, v]) => cleExisteEtContient(v[key], val)))
}

function cleExisteEtContient (v, val) {
  if (v !== undefined) {
    return v.includes(val)
  } else {
    return false
  }
}

const dictionnaireDesExercices = { ...dictionnaireDesExercicesAleatoires, ...dictionnaireDNB, ...dictionnaireC3, ...dictionnaireLycee }
const listeDesExercicesDisponibles = tridictionnaire(dictionnaireDesExercices)

function filtreDictionnaire (dict, sub) {
  return Object.assign(
    {},
    ...Object.entries(dict)
      .filter(([k]) => k.substring(0, sub.length) === sub)
      .map(([k, v]) => ({ [k]: v }))
  )
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

export function menuTheme (theme) {
  let codeHTML = '<h2 class="ui horizontal divider header">Exercices en ligne à données aléatoires</h2>'
  codeHTML += '\n<div class="ui middle aligned animated selection divided list">'
  const dictionnaire = filtreDictionnaire(listeDesExercicesDisponibles, theme)
  for (const id in dictionnaire) {
    codeHTML += `<a class="item" href="/mathalea.html?ex=${id}&v=ex" target="_blank">
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
