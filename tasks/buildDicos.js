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
  const dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAleatoires.js')

  const exercicesList = getAllFiles(exercicesDir)

  const dictionnaire = {}

  for (const file of exercicesList) {
    const name = path.basename(file, '.js')
    let titre
    try {
      if (dictionnaire[name]) throw Error(`${file} en doublon, on avait déjà un ${name}`)
      titre = requireImport(file).titre
    } catch (error) {
      // ça marche pas pour ce fichier, probablement parce qu'il importe du css et qu'on a pas les loader webpack
      // on passe à l'ancienne méthode qui fouille dans le code source
      const srcContent = fs.readFileSync(file, { encoding: 'utf8' })
      const chunks = /export const titre *= *(['"])([^'"]+)\1/.test(srcContent)
      if (chunks) {
        titre = chunks[2]
      } else {
        console.error(Error(`Pas trouvé de titre dans ${file} => ABANDON (il sera exclu de ${dictFile}`))
      }
    }
    if (titre) {
      dictionnaire[name] = {
        titre,
        url: file.substr(prefixLength)
      }
    }
  }

  fs.writeFileSync(dictFile, `export default ${JSON.stringify(dictionnaire, null, 2)}`)
  console.log(`${dictFile} généré`)
}
