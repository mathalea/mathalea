const fs = require('fs')
const path = require('path')

const isVerbose = /-(-verbode|v)/.test(process.argv)
const logIfVerbose = (...args) => { if (isVerbose) console.log(...args) }

function getAllFiles (dir) {
  const files = []
  fs.readdirSync(dir).forEach(entry => {
    if (entry === 'ClasseExercice.js') return
    const fullEntry = path.join(dir, entry)
    if (fs.statSync(fullEntry).isDirectory()) {
      getAllFiles(fullEntry).forEach(file => files.push(file))
    } else if (/\.js$/.test(entry) && !/^_/.test(entry)) {
      files.push(fullEntry)
    } // sinon on ignore
  })
  return files
}

// pour la fct qui a servi à transformer tous les exos pour ajouter le export const titre = …, cf commit 6d281fb4
// mais attention elle avait un petit bug sur les titres qui finissaient par $ (bug rectifié manuellement dans les 4 exos concernés)

// pour charger dans node des js avec une syntaxe export (sans l'extension mjs, sinon y'aurait pas besoin de ça)
const requireImport = require('esm')(module)

const debut = Date.now()

const jsDir = path.resolve(__dirname, '..', 'src', 'js')
const exercicesDir = path.resolve(jsDir, 'exercices')
const prefixLength = jsDir.length

const exercicesList = getAllFiles(exercicesDir)

const dicoAlea = {}
const dicoAMC = {}

for (const file of exercicesList) {
  const name = path.basename(file, '.js')
  // amcType est un booléen qui permet de savoir qu'on peut avoir une sortie html qcm interactif
  let titre, amcReady, amcType, qcmInteractif
  try {
    if (dicoAlea[name]) throw Error(`${file} en doublon, on avait déjà un ${name}`)
    const module = requireImport(file)
    if (!module.titre) {
      console.error(`${file} n’a pas d’export titre => IGNORÉ`)
      continue
    }
    titre = module.titre
    amcReady = Boolean(module.amcReady)
    if (module.amcReady && !module.amcType) {
      console.error(`\x1b[41m${file} n'a pas d'export amcType => IL FAUT L'AJOUTER !!!\x1b[0m`)
    } else {
      qcmInteractif = module.amcType in [1,2] ? true : false // seulement les types 1 et 2 sont de vrais qcm
      amcType = module.amcType 
    }    
  } catch (error) {
    // ça marche pas pour ce fichier, probablement parce qu'il importe du css et qu'on a pas les loader webpack
    // on passe à l'ancienne méthode qui fouille dans le code source
    const srcContent = fs.readFileSync(file, { encoding: 'utf8' })
    const chunks = /export const titre *= *(['"])([^'"]+)\1/.exec(srcContent)
    if (chunks) {
      titre = chunks[2]
      amcReady = /export +const +amcReady *= *true/.test(srcContent)
      if (amcReady && !/export +const +amcType */.test(srcContent)) {
        console.error(`\x1b[41m${file} n'a pas d'export amcType => IL FAUT L'AJOUTER !!!\x1b[0m`)
      } else {
        qcmInteractif = /export +const +amcType *= *([1-2])/.test(srcContent) // seulement les types 1 et 2 sont de vrais qcm
        if (/export +const +amcType *= *([0-9])/.test(srcContent)) {
          // galère ça reste à faire
          //amcType = /export +const +amcType *= *([0-9])/
        }        
      }      
    } else {
      console.error(Error(`Pas trouvé de titre dans ${file} => IGNORÉ`))
    }
  }
  if (titre) {
    // Attention, on veut des séparateurs posix (/), pour faire propre faudrait
    // if (path.sep !== path.posix.sep) url = url.replace(new RegExp(path.sep, 'g'), path.posix.sep)
    // mais ça va bcp plus vite de faire
    const url = file.substr(prefixLength).replace(/\\/g, '/')
    dicoAlea[name] = { titre, url, amcReady, amcType, qcmInteractif, name }
    if (amcReady) {
      dicoAMC[name] = { titre, url, amcType, qcmInteractif }
    }
    logIfVerbose(`${name} traité (${titre})`)
  } else {
    console.error(`${name} ignoré (pas de titre)`)
  }
}

let dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAleatoires.js')
fs.writeFileSync(dictFile, `export default ${JSON.stringify(dicoAlea, null, 2)}`)
console.log(`${dictFile} généré`)
dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAMC.js')
fs.writeFileSync(dictFile, `export default ${JSON.stringify(dicoAMC, null, 2)}`)
console.log(`${dictFile} généré`)
const fin = Date.now()
console.log(`${path.resolve(__dirname, __filename)} terminé en ${fin - debut}ms`)
