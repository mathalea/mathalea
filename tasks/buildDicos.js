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
// ligne supprimée avant il y avait un dico spécifique pour AMC cf commit 7dac24e

var warnings = 0;

function beginWarnText() {
  warnings+=1
  if (warnings === 1) {
    return console.log(`\x1b[33m ======================================== WARNINGS ========================================\x1b[37m`)
  }  
}

function endWarnText() {
  if (warnings != 0) {
    return console.log(`\x1b[33m ==================================== END WARNINGS ========================================\x1b[37m`)
  }
}


function sumWarnings() {    
    if (warnings === 1) {
      out = `avec \x1b[33m ${warnings} WARNING\x1b[37m`
    } else {
      out = `avec \x1b[33m ${warnings} WARNINGS\x1b[37m`
    };
    return out;  
}

for (const file of exercicesList) {
  const name = path.basename(file, '.js')
  // interactifReady est un booléen qui permet de savoir qu'on peut avoir une sortie html qcm interactif
  // amcType est un objet avec une propriété num et une propriété text pour le type de question AMC
  let titre, amcReady, amcType={}, interactifReady, interactifType, description
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
    interactifReady = Boolean(module.interactifReady)
    description = module.description ? module.description : 'pas de description'
    // On verifie s'il y a une incohérence amcType amcReady et on affiche un warning au besoin         
    if (amcReady && !module.amcType) {      
     beginWarnText()
      console.error(`\x1b[33m${file} n'a pas d'export amcType => IL FAUT L'AJOUTER !!! (module)\x1b[37m`)
    }
    if (module.amcType && !module.amcReady) {
     beginWarnText()
      console.error(`\x1b[33m${file} a un export amcType mais amcReady est false => VÉRIFIER ÇA !!! (module)\x1b[37m`)
    } 
    // Avant on testait le type AMC pour définir qcmInteractif cf commmit f59bb8e
    if (amcReady) {    
      amcType.num = module.amcType      
    }    

    // On verifie s'il y a une incohérence interactifType interactifReady et on affiche un warning au besoin         
    if (interactifReady && !module.interactifType) {      
      beginWarnText()
      console.error(`\x1b[34m${file} n'a pas d'export interactifType => IL FAUT L'AJOUTER !!! (module)\x1b[37m`)
    }
    if (module.interactifType && !module.interactifReady) {
    beginWarnText()
      console.error(`\x1b[34m${file} a un export interactifType mais interactifReady est false => VÉRIFIER ÇA !!! (module)\x1b[37m`)
    }
    if (interactifReady) {
      interactifType = module.interactifType
    } 
     
  } catch (error) {
    // ça marche pas pour ce fichier, probablement parce qu'il importe du css et qu'on a pas les loader webpack
    // on passe à l'ancienne méthode qui fouille dans le code simport { amcReady } from '../src/js/exercices/3e/3G21';
    const srcContent = fs.readFileSync(file, { encoding: 'utf8' })
    const chunks = /export const titre *= *(['"])([^'"]+)\1/.exec(srcContent)
    if (chunks) {
      titre = chunks[2]
      amcReady = /export +const +amcReady *= *true/.test(srcContent)
      interactifReady = /export +const +interactifReady *= *true/.test(srcContent)
      // On verifie s'il y a une incohérence amcType amcReady et on affiche un warning au besoin               
      if (amcReady && !/export +const +amcType */.test(srcContent)) {
       beginWarnText()
        console.error(`\x1b[33m${file} n'a pas d'export amcType => IL FAUT L'AJOUTER !!! (à l'ancienne)\x1b[37m`)
      }
      if (/export +const +amcType */.test(srcContent) && !amcReady) {
       beginWarnText()
        console.error(`\x1b[33m${file} a un export amcType mais amcReady est false => VÉRIFIER ÇA !!! (à l'ancienne)\x1b[37m`)
      }
      // Avant on testait le type AMC pour définir qcmInteractif cf commmit f59bb8e   
      if (amcReady) {
        amcType.num = parseInt(srcContent.match(/export +const +amcType *= *(\d*)/)[1])
      }

      // On verifie s'il y a une incohérence interactifType interactifReady et on affiche un warning au besoin         
      if (interactifReady && !/export +const +interactifType */.test(srcContent)) {
        beginWarnText()
        console.error(`\x1b[34m${file} n'a pas d'export interactifType => IL FAUT L'AJOUTER !!! (module)\x1b[37m`)
      }
      if (/export +const +interactifType */.test(srcContent) && !interactifReady) {
      beginWarnText()
        console.error(`\x1b[34m${file} a un export interactifType mais interactifReady est false => VÉRIFIER ÇA !!! (module)\x1b[37m`)
      }
      if (interactifReady) {//regex à vérifier même si elle ne doit théoriquement pas servir puisque le module fonctionne
        interactifType = srcContent.match(/export +const +interactifType *= *(\"[a-zA-Z0-9].*\")/)[1]
      }
      
    // ajouter la description avec une regex ?!
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
      // On ajuste la propriété text de amcType différemment si c'est un tableau ou non
      let typeText = ["qcmMono","qcmMult","AMCOpen","AMCNum","AMCOpenNum","AMCOpenNum✖︎2","AMCOpenNum✖︎3"]      
      if (typeof amcType.num === 'number')  {        
        switch (amcType.num) {
          case 1:
            amcType.text = typeText[0];
            break;
          case 2:
            amcType.text = typeText[1];
            break;
          case 3:
            amcType.text = typeText[2];
            break;
          case 4:
            amcType.text = typeText[3];
            break;
          case 5:
            amcType.text = typeText[4];
            break;
          case 6:
            amcType.text = typeText[5];
            break;
          case 7:
            amcType.text = typeText[6];
            break;  
          default:
           beginWarnText()
            console.error(`\x1b[33m${file} contient un amcType numerique non prévu => IL FAUT VÉRIFIER ÇA (number)!!!\x1b[37m`)
            amcType.text = "type de question AMC non prévu";
        }
      } else  if (typeof amcType.num === 'object')  {
        amcType.text = []
        amcType.num.forEach(
          function(num) { 
            switch (num) {
              case 1:
                amcType.text = typeText[0];
                break;
              case 2:
                amcType.text = typeText[1];
                break;
              case 3:
                amcType.text = typeText[2];
                break;
              case 4:
                amcType.text = typeText[3];
                break;
              case 5:
                amcType.text = typeText[4];
                break;
              case 6:
                amcType.text = typeText[5];
                break;
              case 7:
                amcType.text = typeText[6];
                break;  
              default:
               beginWarnText()
                console.error(`\x1b[33m${file} contient un element numérique non prévu dans le tableau amcType => IL FAUT VÉRIFIER ÇA (object)!!!\x1b[37m`)
                amcType.text.push("type de question AMC non prévu");
            }
          }        
        )
      } else {
       beginWarnText()
        console.error(`\x1b[33m${file} contient amcType ni entier ni liste => IL FAUT VÉRIFIER ÇA !!!\x1b[37m`)
        amcType.text = "bug amcType.num"
      }
      if (interactifReady) {
        dicoAlea[name] = { titre, url, amcReady, amcType, interactifReady, interactifType, name, description }
      } else {
        dicoAlea[name] = { titre, url, amcReady, amcType, interactifReady, name, description }
      }            
    } else {
      if (interactifReady) {
        dicoAlea[name] = { titre, url, amcReady, interactifReady, interactifType, name, description }
      } else {
        dicoAlea[name] = { titre, url, amcReady, interactifReady, name, description }
      }
      
    }    
// ligne supprimée avant il y avait un dico spécifique pour AMC cf commit 7dac24e
    logIfVerbose(`${name} traité (${titre})`)
  } else {
    console.error(`${name} ignoré (pas de titre)`)
  }
}

let dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAleatoires.js')
fs.writeFileSync(dictFile, `export default ${JSON.stringify(dicoAlea, null, 2)}`)
endWarnText()
console.log(`${dictFile} généré ${sumWarnings()}`)
// ligne supprimée avant il y avait un dico spécifique pour AMC cf commit 7dac24e
// const csvDir = path.resolve(__dirname, '..', 'src', 'csv')
// let csvFile = path.resolve(csvDir,'.','listingParTypes.csv')
// fs.writeFileSync(csvFile,`id,titre,amcReady,amcType,interactifReady,\r\n`)
// Object.entries(dicoAlea).forEach(([id,props]) => {
//   if (props.amcReady && props.interactifReady) {
//     fs.appendFileSync(csvFile,`${id},${props.titre.replace(/[,;]/g, '')},OK,${props.amcType.text},OK,${props.interactifType}\r\n`)
//   } else if (props.amcReady && !props.interactifReady) {
//     fs.appendFileSync(csvFile,`${id},${props.titre.replace(/[,;]/g, '')},OK,${props.amcType.text},KO,KO\r\n`)
//   } else if (!props.amcReady && props.interactifReady) {
//     fs.appendFileSync(csvFile,`${id},${props.titre.replace(/[,;]/g, '')},KO,KO,OK,${props.interactifType}\r\n`)
//   }
// })
// console.log(`${csvFile} généré`)

const mdDir = path.resolve(__dirname, '..', 'src', '.')
let mdFile  = path.resolve(mdDir,'.','exosAmcInteractifs.md')
fs.writeFileSync(mdFile,`|id|titre|description|amcReady|amcType|interactifReady|interactifType|\r\n`)
fs.appendFileSync(mdFile,`|:-----:|:-----------------------------------------------:|:-----------------------------------------------:|:-----:|:----------------:|:-----:|:----------:|\r\n`)
Object.entries(dicoAlea).forEach(([id,props]) => {
  if (props.amcReady && props.interactifReady) {
    fs.appendFileSync(mdFile,`|${id}|${props.titre}|${props.description}|OK|${props.amcType.text}|OK|${props.interactifType}|\r\n`)    
  } else if (props.amcReady && !props.interactifReady) {
    fs.appendFileSync(mdFile,`|${id}|${props.titre}|${props.description}|OK|${props.amcType.text}|KO|KO|\r\n`)    
  } else if (!props.amcReady && props.interactifReady) {
    fs.appendFileSync(mdFile,`|${id}|${props.titre}|${props.description}|KO|KO|OK|${props.interactifType}|\r\n`)    
  }
})
console.log(`${mdFile} généré`)
const fin = Date.now()
console.log(`${path.resolve(__dirname, __filename)} terminé en ${fin - debut}ms`)
