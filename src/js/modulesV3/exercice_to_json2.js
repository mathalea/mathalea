/* eslint-disable no-unused-vars */
import fs from 'fs'
import path from 'path'
import { uuidFromRef, urlFromUuid, listeChapitresDuNiveau, listeExosDuChapitre, listeExosAvecTag, toObjet, toMap, collecteUuidsFromDico } from './fileTools.js'

const isVerbose = /-(-verbode|v)/.test(process.argv)
const logIfVerbose = (...args) => { if (isVerbose) console.log(...args) }
// const jsDir = '../' // path.resolve('./src')
const dictFile = path.relative('.', 'exercicesDisponiblesReferentiel2022.json')
const uuidToUrlFile = path.relative('.', '../jsons/uuidsToUrl.json')
const referentiel2022File = path.relative('.', '../jsons/referentiel2022.json')
const levelsThemesListFile = path.relative('.', '../jsons/levelsThemesList.json')
let levelsThemesList
let dictionnaire
let referentiel2022
let uuidsToUrl

/**
 * Crée une Uuid de 5 caractères hexadécimaux (1M de possibilités)
 * @returns {string}
 */
function createUuid () {
  let dt = new Date().getTime()
  const uuid = 'xxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}
/**
 *
 * @returns un tableau de tous les fichiers js ou ts d'un dossier (ne parcours pas les dossiers si il y en a)
 * @author Jean-Claude Lhote
 */
function getAllFilesOfDir (dir) {
  const files = []
  fs.readdirSync(dir).forEach(entry => {
    if (entry === 'Exercice.js' || entry === 'ExerciceTs.ts' || entry === 'beta' || entry === 'Profs') return
    const fullEntry = path.join(dir, entry)
    console.log(fullEntry)
    if (!fs.statSync(fullEntry).isDirectory()) {
      if ((/\.js$/.test(entry) || (/\.ts$/.test(entry))) && !/^_/.test(entry)) {
        files.push(fullEntry)
      }
    } // sinon on ignore
  })
  return files
}
/**
 *
 * @param {string} dir
 * @returns {string[]} un tableau de tous les fichiers contenus dans le dossier et tous les sous-dossiers
 */
function getAllFiles (dir) {
  const files = []
  fs.readdirSync(dir).forEach(entry => {
    if (entry === 'Exercice.js' || entry === 'ExerciceTs.ts') return
    const fullEntry = path.join(dir + path.sep, entry)
    if (fs.statSync(fullEntry).isDirectory()) {
      getAllFiles(fullEntry).forEach(file => files.push(file))
    } else if (/\.js$/.test(entry) && !/^_/.test(entry)) {
      files.push(fullEntry)
    } // sinon on ignore
  })
  return files
}

// *****************************************************/
// ***************** Fonctions outils ******************/
// *****************************************************/

function ecrireUuidDansFichier (uuid, name, file) {
  let fichier = fs.readFileSync(file, 'utf-8')
  if (fichier) {
    const parts = fichier.split('export default')
    fichier = parts[0] + `export const uuid = '${uuid}'\nexport const ref = '${name}'\n` + 'export default' + parts[1]
    fs.writeFileSync(file, fichier, 'utf-8')
    return true
  } else {
    console.log(`Le fichier ${file} n'a pas pu être ouvert en lecture`)
    return false
  }
}

function ajouteExoReferentiel ({ uuid, name, level, chap, referentiel }) {
  if (!(referentiel instanceof Map)) {
    console.log('référentiel non valide')
    return false
  }
  let refLevel = referentiel.get(level)
  if (!refLevel) {
    referentiel.set(level, new Map())
    refLevel = referentiel.get(level)
  }
  let refChap = refLevel.get(chap)
  if (!refChap) {
    refLevel.set(chap, new Map())
    refChap = refLevel.get(chap)
  }
  refChap.set(name, uuid)
}

function ajouteExoDico ({ uuid = '', name = '', titre = '', level = '', chap = '', leTheme, leSousTheme, keywords = [], tags = {}, datePublication = '', dateModification = '', dico }) {
  let theme = ''; let sousTheme = ''
  if (!(Array.isArray(dico))) {
    console.log('dictionnaire non valide')
    return false
  }
  /* let dicoLevel = dico.get(level)
  if (!dicoLevel) {
    dico.set(level, new Map())
    dicoLevel = dico.get(level)
  }
  let dicoChap = dicoLevel.get(chap)
  if (!dicoChap) {
    dicoLevel.set(chap, new Map())
    dicoChap = dicoLevel.get(chap)
  }
  */
  if (levelsThemesList.get(leTheme) !== undefined) {
    theme = leTheme // ici on ne stocke que la clé... à l'inverse ci-dessous on stocke le titre complet
    // theme = levelsThemesList.get(leTheme).get('titre')
    if (theme !== '') {
      if (levelsThemesList.get(leTheme).get('sousThemes') !== undefined) {
        if (levelsThemesList.get(leTheme).get('sousThemes').get(leSousTheme) !== undefined) {
          sousTheme = leSousTheme // ici on stocke la clé... ci-dessous on stocke la définition complète
        // sousTheme = levelsThemesList.get(leTheme).get('sousThemes').get(leSousTheme) || ''
        }
      }
    } else {
      sousTheme = ''
    }
  }
  const exo = { uuid, theme, sousTheme, AMC: tags.AMC, Interactif: tags.Interactif, Can: tags.Can, keywords, datePublication, dateModification }
  // dicoChap.set(uuid, exo
  dico.push(exo)
}

function mettreAJourFichierDico (file, dico) {
  const contenuFichier = JSON.stringify(dico, null, 2)
  const dictFile = path.relative('.', `../jsons/${file}`)
  fs.writeFileSync(dictFile, contenuFichier, 'utf-8')
}
function mettreAJourFichierReferentiel (file, dico) {
  const objDico = toObjet(dico)
  const contenuFichier = JSON.stringify(objDico, null, 2)
  const dictFile = path.relative('.', `../jsons/${file}`)
  fs.writeFileSync(dictFile, contenuFichier, 'utf-8')
}
function mettreAJourFichierUuidToUrl (file, dico) {
  const objDico = toObjet(dico)
  const contenuFichier = JSON.stringify(objDico, null, 2)
  const dictFile = path.relative('.', `../jsons/${file}`)
  fs.writeFileSync(dictFile, contenuFichier, 'utf-8')
}
function gereModuleJs (module, file, name, dictionnaire, referentiel2022, uuidsToUrl, listOfUuids, isCan) {
  if (module.uuid === undefined) {
    let uuid, level, chap, leTheme, leSousTheme, titre, isAmcReady, isInteractifReady, keywords, datePublication, dateModification
    try {
      do {
        uuid = createUuid()
      } while (listOfUuids.get(uuid) !== undefined)
      titre = module.titre
      isAmcReady = Boolean(module.amcReady)
      isInteractifReady = Boolean(module.interactifReady)
      keywords = module.keywords ? module.keywords : []
      datePublication = module.dateDePulication
      dateModification = module.dateDeModificationImportante
    } catch (error) {
      console.log(`Erreur avec ${name} : ${error}`)
    }
    if (isCan) {
      if (['1', '2', '3', '4', '5', '6', 'T'].indexOf(name[3]) !== -1) {
        level = name[3] + 'e'
        chap = name.substring(3, 5)
      } else {
        level = name.substring(3, 5)
        chap = name.substring(3, 6)
      }
      leTheme = ''
      leSousTheme = ''
    } else {
      if (['1', '2', '3', '4', '5', '6', 'T'].indexOf(name[0]) !== -1) {
        level = name[0] + 'e'
        chap = name.substring(0, 3)
        leTheme = name.substring(0, 3)
        leSousTheme = name.substring(0, 4)
      } else if (name.substring(0, 7) === 'techno1') {
        level = name.substring(0, 7)
        chap = name.substring(7, 8)
        leTheme = name.substring(7, 8)
        leSousTheme = name.substring(7, 8)
      } else {
        level = name[0] + name[1]
        chap = name.substring(0, 4)
        leTheme = name.substring(0, 4)
        leSousTheme = name.substring(0, 4)
      }
    }
    const tags = { AMC: !!isAmcReady, Interactif: !!isInteractifReady, Can: !!isCan }
    ecrireUuidDansFichier(uuid, name, file)
    ajouteExoDico({ uuid, name, titre, level, chap, leTheme, leSousTheme, keywords, tags, datePublication, dateModification, dico: dictionnaire })
    ajouteExoReferentiel({ uuid, name, level, chap, referentiel: referentiel2022 })
    if (isCan) {
      uuidsToUrl.set(uuid, [`can/${level}`, name])
    } else {
      uuidsToUrl.set(uuid, [level, name])
    }
  }
  return true
}

/**
 * Fonction qui génère ou maintient à jour le dictionnaire de tous les exercices.
 * Elle parcourt l'ensemble des fichiers exercice
 * vérifie si la constante uuid existe (signe que l'exercice est déjà dans le dictionnaire)
 * Si elle existe, on passe au fichier suivant
 * Sinon, on génère une uuid nouvelle qu'on écrit dans le fichier : export const uuid = 'xxxxx' à la première ligne
 * Puis on ajoute l'exercice dans le dictionnaire avec son uuid
 * En même temps, on alimente le fichier uuidToUrl.json qui stocke les url des fichiers référencés par leur uuid.
 * @author Jean-Claude Lhote
 */
async function builJsonDictionnaireExercices () {
  try {
    levelsThemesList = await import('../jsons/levelsThemesList.json', { assert: { type: 'json' } })
    levelsThemesList = toMap(levelsThemesList.default)
  } catch (error) {
    console.log('problème avec levelsThemesList.json')
    console.error(error)
  }
  // on charge le dictionnaire si il existe et on génère la liste des UUID déjà prises
  // On prépare les fichiers que l'on va alimenter : listOfUuids, dictionnaire, uuidsToUrl
  let contenuFichierDico
  let listOfUuids = []
  try {
    dictionnaire = await import(dictFile, { assert: { type: 'json' } })
    // dictionnaire = JSON.parse(contenuFichierDico)
    listOfUuids = collecteUuidsFromDico(dictionnaire.default)
  } catch (error) {
    dictionnaire = []
    listOfUuids = new Map()
  }

  let fichierUuidsToUrl
  try {
    fichierUuidsToUrl = await import(uuidToUrlFile, { assert: { type: 'json' } })
    uuidsToUrl = toMap(fichierUuidsToUrl.default)
  } catch (error) {
    uuidsToUrl = new Map()
  }

  let fichierReferentiel
  try {
    fichierReferentiel = await import(referentiel2022File, { assert: { type: 'json' } })
    referentiel2022 = toMap(fichierReferentiel.default)
  } catch (error) {
    referentiel2022 = new Map()
  }

  // On charge la liste des exercices
  const exercicesDir = path.relative(path.resolve('.'), path.resolve('..', 'exercices'))
  //  const prefixLength = jsDir.length
  const exercicesList = getAllFiles(exercicesDir)
  const promesses = []
  for (const file of exercicesList) {
    if (file.indexOf('beta') !== -1) continue
    if (file.indexOf('Prof') !== -1) continue
    const name = path.basename(file, path.extname(file))
    const isCan = file.includes('can')
    const promesse = import(file.replace('\\', '/'))
      .then(
        (module) => gereModuleJs(module, file, name, dictionnaire, referentiel2022, uuidsToUrl, listOfUuids, isCan)
      )
      .catch(error => {
        console.log(file.substring(file.length - 2))
        if (file.substring(file.length - 2) !== 'ts') console.error(error)
      }
      )
    promesses.push(promesse)
  }
  Promise.all(promesses)
    .then(() => {
      mettreAJourFichierDico(dictFile, dictionnaire)
      mettreAJourFichierReferentiel(uuidToUrlFile, uuidsToUrl)
      mettreAJourFichierUuidToUrl(referentiel2022File, referentiel2022)
    })
    .catch(error => {
      console.log(' Il y a une erreur avec le Promise.All : ', error.message)
    })
}
/**
 * Fonction qui extrait les exercices d'un niveau pour créer un dictionnaire de ce niveau
 * Les niveaux possibles sont '1e', '2e', '3e', '4e', '5e', '6e', 'c3', 'CM', 'Ex', 'HP', 'PE', 'Te'
 * @param {string} level
 * @author Jean-Claude Lhote
 */
function buildJsonExercicesOfLevel (level) { // level contient la première lettre du niveau
  let listeExosLevel
  if (dictionnaire === undefined) dictionnaire = toMap(JSON.parse(fs.readFileSync(dictFile, 'utf-8')))
  const entrées = Object.entries(toObjet(dictionnaire))
  const listeExos = []
  for (const [clé, liste] of entrées) {
    if (clé === level) {
      for (const [key, data] of Object.entries(liste)) {
        const exos = Object.entries(data)
        for (const [key2, value] of Object.entries(exos)) {
          listeExos.push([value[0], value[1]])
        }
      }
    }
  }

  const dicoLevel = Object.fromEntries(listeExos)
  const dicoLevelFile = `./exercicesDisponiblesNiveau${level}Referentiel2022.json`// path.resolve('src', 'modules', `exercicesDisponiblesNiveau${level}Referentiel2022.json`)
  fs.writeFileSync(dicoLevelFile, JSON.stringify(dicoLevel, null, 2))
}

// main script
builJsonDictionnaireExercices()
// buildJsonExercicesOfLevel('1e')
// buildJsonExercicesOfLevel('2e')
// buildJsonExercicesOfLevel('3e')
// buildJsonExercicesOfLevel('4e')
// buildJsonExercicesOfLevel('5e')
// buildJsonExercicesOfLevel('6e')
// buildJsonExercicesOfLevel('techno1')
// buildJsonExercicesOfLevel('CM')
// buildJsonExercicesOfLevel('HP')
// buildJsonExercicesOfLevel('PE')
// buildJsonExercicesOfLevel('Ex')
// buildJsonExercicesOfLevel('c3')
//

// buildJsonExercicesOfLevel('Te')
