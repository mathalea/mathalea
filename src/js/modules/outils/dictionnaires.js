/** @module dictionnaires */

/**
* Trie un dictionnaire suivant ses clés
*
* @Example
* dictionnaire_tri = tridictionnaire(dictionnaire)
* @Source https://stackoverflow.com/questions/10946880/sort-a-dictionary-or-whatever-key-value-data-structure-in-js-on-word-number-ke
*/
export function tridictionnaire (dict) {
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

/**
  * Filtre un dictionnaire suivant les premiers caractères de ses clés
  *
  * @Example
  * filtreDictionnaire(dict,'6N') renvoie un dictionnaire où toutes les clés commencent par 6N
  * @author Rémi Angot
  */
export function filtreDictionnaire (dict, sub) {
  return Object.assign({}, ...Object.entries(dict).filter(([k]) => k.substring(0, sub.length) === sub).map(([k, v]) => ({ [k]: v }))
  )
}

/**
  * Polyfill Object.fromEntries
  *
  * @Source : https://gitlab.com/moongoal/js-polyfill-object.fromentries/
  */
if (!Object.fromEntries) {
  Object.defineProperty(Object, 'fromEntries', {
    value (entries) {
      if (!entries || !entries[Symbol.iterator]) { throw new Error('Object.fromEntries() requires a single iterable argument') }

      const o = {}

      Object.keys(entries).forEach((key) => {
        const [k, v] = entries[key]

        o[k] = v
      })

      return o
    }
  })
}

/**
  * Filtre un dictionnaire suivant la valeur d'une clé
  *
  * @Example
  * filtreDictionnaireValeurCle(dict,'annee',2020) renvoie un dictionnaire où toutes les clés annee seront égales à 2020
  * @author Rémi Angot
  */
export function filtreDictionnaireValeurCle (dict, key, val) {
  return Object.fromEntries(Object.entries(dict).filter(([k, v]) => v[key] === val))
}

/**
  * Filtre un dictionnaire si une valeur appartient à une clé de type tableau
  *
  * @Example
  * filtreDictionnaireValeurCle(dict,'annee',2020) renvoie un dictionnaire où toutes les clés annee seront égales à 2020
  * @author Rémi Angot
  */
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
