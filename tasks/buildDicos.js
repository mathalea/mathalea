const fs = require('fs')
const path = require('path')

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

module.exports = function buildDico () {
  // pour charger dans node des js avec une syntaxe export (sans l'extension mjs, sinon y'aurait pas besoin de ça)
  const requireImport = require('esm')(module)

  const jsDir = path.resolve(__dirname, '..', 'src', 'js')
  const exercicesDir = path.resolve(jsDir, 'exercices')
  const prefixLength = jsDir.length

  const exercicesList = getAllFiles(exercicesDir)

  const dicoAlea = {}
  const dicoAMC = {}

  for (const file of exercicesList) {
    const name = path.basename(file, '.js')
    let titre, amcReady
    try {
      if (dicoAlea[name]) throw Error(`${file} en doublon, on avait déjà un ${name}`)
      const module = requireImport(file)
      if (!module.titre) {
        console.error(`${file} n’a pas d’export titre => IGNORÉ`)
        continue
      }
      titre = module.titre
      amcReady = Boolean(module.amcReady)
    } catch (error) {
      // ça marche pas pour ce fichier, probablement parce qu'il importe du css et qu'on a pas les loader webpack
      // on passe à l'ancienne méthode qui fouille dans le code source
      const srcContent = fs.readFileSync(file, { encoding: 'utf8' })
      const chunks = /export const titre *= *(['"])([^'"]+)\1/.test(srcContent)
      if (chunks) {
        titre = chunks[2]
        amcReady = /export +const +amcReady *= *true/.test(srcContent)
      } else {
        console.error(Error(`Pas trouvé de titre dans ${file} => IGNORÉ`))
      }
    }
    if (titre) {
      const url = file.substr(prefixLength)
      dicoAlea[name] = { titre, url }
      if (amcReady) {
        dicoAMC[name] = { titre, url }
      }
    }
  }

  let dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAleatoires.js')
  fs.writeFileSync(dictFile, `export default ${JSON.stringify(dicoAlea, null, 2)}`)
  console.log(`${dictFile} généré`)
  dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAMC.js')
  fs.writeFileSync(dictFile, `export default ${JSON.stringify(dicoAMC, null, 2)}`)
  console.log(`${dictFile} généré`)
}
