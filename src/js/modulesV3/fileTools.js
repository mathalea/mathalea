/* eslint-disable no-unused-vars */

/**
 * @author Sylvain Chambon
 * @param {object} obj
 * @returns {Map}
 */
export function toMap (obj) {
  const dico = new Map()
  for (const cle of Object.keys(obj)) {
    if (obj[cle] instanceof Object) {
      if (obj[cle] instanceof Array) {
        dico.set(cle, obj[cle])
      } else {
        dico.set(cle, toMap(obj[cle]))
      }
    } else {
      dico.set(cle, obj[cle])
    }
  }
  return dico
}

/**
 *
 * @param {Map} dico
 * @returns {object}
 */
export function toObjet (dico) {
  const obj = {}
  for (const [cle, valeur] of dico) {
    if (valeur instanceof Map) {
      obj[cle] = toObjet(valeur)
    } else {
      obj[cle] = valeur
    }
  }
  return obj
}
/***************************************************/
/** ************ fonctions de recherche *************/
/***************************************************/
/**
 *
 * @param {string} ref : la référence cherchée dans le référentiel2022
 * @returns {string} l'uuid de l'exercice dont la référence dans le référentiel2022 est ref
 */
export function uuidFromRef (ref, referentiel) {
  if (!(referentiel instanceof Map)) {
    console.log('referentiel2022 non valide ou non initialisé')
    return ''
  }
  for (const [niv, chaps] of referentiel) {
    for (const [chap, exos] of chaps) {
      if (exos.get(ref)) return exos.get(ref)
    }
  }
  return ''
}
/**
 *
 * @param {string} uuid : l'uuid cherchée
 * @returns {string} la référence correspondante dans le référentiel2022
 */
export function urlFromUuid (uuid, uuidstourl) { // peut être remplacé par uuidstourl.get(uuid)
  if (!(uuidstourl instanceof Map)) {
    console.log('dictionnaire uurlToUuid non valide ou non initialisé')
    return ''
  }
  const cheminFichier = uuidstourl.get(uuid)
  if (cheminFichier) return cheminFichier[0] + '/' + cheminFichier[1]
  else return ''
}
/**
 *
 * @param {string} level : le niveau ('1e', '6e', ...) duquel on veut la liste des références (can comprises)
 * @returns {array} la liste des uuids des exercices du niveau charché.
 */
export function listeChapitresDuNiveau (level, referentiel) {
  if (!(referentiel instanceof Map)) {
    console.log('referentiel2022 non valide ou non initialisé')
    return []
  }
  const chaps = referentiel.get(level)
  const listeChapitres = []
  if (chaps) {
    chaps.forEach((value, key, map) => listeChapitres.push(key))
  }
  return listeChapitres
}
/**
 *
 * @param {string} chap : le chapitre ('1AN', '1E1', '6C1', ...) dont on veut la liste des exercices
 * @returns la liste des uuids des exercices du chapitre cherché
 */
export function listeExosDuChapitre (chap, referentiel) {
  const listeExos = []
  if (!(referentiel instanceof Map)) {
    console.log('referentiel2022 non valide ou non initialisé')
    return listeExos
  }
  for (const [niv, chaps] of referentiel) {
    if (chaps.get(chap)) {
      chaps.get(chap).forEach((value, key) => listeExos.push([key, value]))
    }
  }
  return listeExos
}
/**
 *
 * @param {string} tag : Le mot clé cherché dans les thèmes d'exercice
 * @returns la liste des uuids des exercices qui ont le mot clé dans leur thèmes
 */
export function listeExosAvecTag (tag, dico) {
  const listeExos = []
  if (!(dico instanceof Map)) {
    console.log('dictionnaire des exercices disponibles non valide ou non initialisé')
    return listeExos
  }
  for (const [niv, chaps] of dico) {
    for (const [chap, exos] of chaps) {
      exos.forEach((value, key, exos) => {
        try {
          if (value.get('themes').includes(tag)) listeExos.push(key)
        } catch (error) {
          console.log(`erreur avec le chapitre ${chap} et l'uuid ${key}`, error)
        }
      })
    }
  }
  return listeExos
}
export function collecteUuidsFromDico (dico) {
  const listeUUID = []
  dico.forEach(element => {
    listeUUID.push(element.uuid)
  })
  return listeUUID
}

export function extraitLevelExercice (exercice) {
  let exo = exercice
  const structure = { level: '', chap: '', isCan: false, ref: '' }
  if (exo.substring(0, 3) === 'can') {
    structure.isCan = true
    exo = exo.substring(3)
  }
  if (['1', '2', '3', '4', '5', '6', 'T'].indexOf(exo[0]) !== -1) {
    structure.level = exo.substring(0, 1) + 'e'
    exo = exo.substring(1)
  } else {
    structure.level = exo.substring(0, 2)
    exo = exo.substring(2)
  }
  structure.chap = exo.substring(0, 1)
  structure.ref = exo
  return structure
}
