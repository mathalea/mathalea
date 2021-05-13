const fs = require('fs')
const path = require('path')

const isVerbose = /-(-verbode|v)/.test(process.argv)
const logIfVerbose = (...args) => { if (isVerbose) console.log(...args) }

function getAllFiles (dir) {
  const files = []
  fs.readdirSync(dir).forEach(entry => {
    if (entry === 'Exercice.js') return
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
//const dicoAMC = {}

for (const file of exercicesList) {
  const name = path.basename(file, '.js')
  // Pour l'instant je fais comme ça car je ne sais pas fair autrement
  // Je systematise la lecture du contenu du fichier en esperant que ça ne ralentisse pas trop l'execution
  const srcContent = fs.readFileSync(file, { encoding: 'utf8' })
  // qcmInteractif est un booléen qui permet de savoir qu'on peut avoir une sortie html qcm interactif
  // amcType est un objet avec une propriété num et une propriété text pour le type de question AMC
  let titre, amcReady, amcType={}, qcmInteractif
  try {
    if (dicoAlea[name]) throw Error(`${file} en doublon, on avait déjà un ${name}`)
    const module = requireImport(file)
    if (!module.titre) {
      console.error(`${file} n’a pas d’export titre => IGNORÉ`)
      continue
    }
    titre = module.titre
    // On teste à l'ancienne la présence de this.qcm dans le code car dans ce cas le booléen amcReady doit être true
    // On affiche une erreur dans le terminal pour signaler qu'il faut l'ajouter    
    amcReady = Boolean(module.amcReady)
    // Pour l'instant je mets ça en doublon, il faudra factoriser/nettoyer aussi qq lignes plus bas 
    // const srcContentt = fs.readFileSync(file, { encoding: 'utf8' })    
    if (/this.qcm/.test(srcContent) && !amcReady) {
      console.error(`\x1b[41m${file} est amcReady mais n'a pas d'export amcReady => IL FAUT L'AJOUTER !!!\x1b[0m`)
    }         
    if (amcReady && !module.amcType) {
      console.error(`\x1b[41m${file} n'a pas d'export amcType => IL FAUT L'AJOUTER !!! (module)\x1b[0m`)
    } else {
      qcmInteractif = module.amcType in [1,2] ? true : false // seulement les types 1 et 2 sont de vrais qcm
    }
    if (amcReady) {    
      amcType.num = module.amcType      
    }    
  } catch (error) {
    // ça marche pas pour ce fichier, probablement parce qu'il importe du css et qu'on a pas les loader webpack
    // on passe à l'ancienne méthode qui fouille dans le code simport { amcReady } from '../src/js/exercices/3e/3G21';
    //const srcContent = fs.readFileSync(file, { encoding: 'utf8' })
    const chunks = /export const titre *= *(['"])([^'"]+)\1/.exec(srcContent)
    if (chunks) {
      titre = chunks[2]
      amcReady = /export +const +amcReady *= *true/.test(srcContent)
      // Pas sûr que ce qui suit fonctionne, notamment pour mes regex
      if (amcReady && !/export +const +amcType */.test(srcContent)) {
        console.error(`\x1b[41m${file} n'a pas d'export amcType => IL FAUT L'AJOUTER !!! (à l'ancienne)\x1b[0m`)
      } else {
        qcmInteractif = /export +const +amcType *= *([1-2])/.test(srcContent) // seulement les types 1 et 2 sont de vrais qcm       
      }      
      if (amcReady) {
        amcType.num = parseInt(srcContent.match(/export +const +amcType *= *(\d*)/)[1])      }
    } else {
      console.error(Error(`Pas trouvé de titre dans ${file} => IGNORÉ`))
    }
  }
  if (titre) {
    // Attention, on veut des séparateurs posix (/), pour faire propre faudrait
    // if (path.sep !== path.posix.sep) url = url.replace(new RegExp(path.sep, 'g'), path.posix.sep)
    // mais ça va bcp plus vite de faire
    const url = file.substr(prefixLength).replace(/\\/g, '/')
    // On ajoute amcType que si amcReady est à true
    if (amcReady) {
      // On ajuste la propriété text de amcType
      switch (amcType.num) {
        case 1:
          amcType.text = "qcmMono";
          break;
        case 2:
          amcType.text = "qcmMult";
          break;
        case 3:
          amcType.text = "AMCOpen "
          break;
        case 4:
          amcType.text = "AMCOpen Num"
          break;
        case 5:
          amcType.text = "AMCOpen NC"
          break;
        case 6:
          amcType.text = "AMCOpen double NC"
          break;
        default:
          console.error(`\x1b[41m${file} contient un amcType non prévu => IL FAUT VÉRIFIER ÇA !!!\x1b[0m`)
          amcType.text = "type de question AMC non prévu"
      }
      dicoAlea[name] = { titre, url, amcReady, amcType, qcmInteractif, name }
    } else {
      dicoAlea[name] = { titre, url, amcReady, qcmInteractif, name }
    }    
    // // En attendant de virer le fichier dictionnaireDesExercicesAMC.js
    // if (amcReady) {
    //   switch (amcType.num) {
    //     case 1:
    //       amcType.text = "qcmMono";
    //       break;
    //     case 2:
    //       amcType.text = "qcmMult";
    //       break;
    //     case 3:
    //       amcType.text = "AMCOpen "
    //       break;
    //     case 4:
    //       amcType.text = "AMCOpen Num"
    //       break;
    //     case 5:
    //       amcType.text = "AMCOpen NC"
    //       break;
    //     case 6:
    //       amcType.text = "AMCOpen double NC"
    //       break;
    //     default:
    //       console.error(`\x1b[41m${file} contient un amcType non prévu => IL FAUT VÉRIFIER ÇA !!!(pour dictionnaireDesExercicesAMC.js en attendant sa suppression)\x1b[0m`)
    //       amcType.text = "type de question AMC non prévu"
    //   }
    //   dicoAMC[name] = { titre, url, amcType, qcmInteractif }
    // }
    logIfVerbose(`${name} traité (${titre})`)
  } else {
    console.error(`${name} ignoré (pas de titre)`)
  }
}

let dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAleatoires.js')
fs.writeFileSync(dictFile, `export default ${JSON.stringify(dicoAlea, null, 2)}`)
console.log(`${dictFile} généré`)
//dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAMC.js')
//fs.writeFileSync(dictFile, `export default ${JSON.stringify(dicoAMC, null, 2)}`)
//console.log(`${dictFile} généré`)
const fin = Date.now()
console.log(`${path.resolve(__dirname, __filename)} terminé en ${fin - debut}ms`)
