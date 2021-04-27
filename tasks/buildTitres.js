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

function transformExport (file) {
  const srcContent = fs.readFileSync(file, { encoding: 'utf8' })
  if (/^export const titre/.test(srcContent)) return console.log(`${file} : export titre déjà là`)
  // faut faire deux regexp suivant délimiteur ' ou " (on peut faire un rappel arrière pour le délimiteur fermant mais pas pour la négation)
  let chunks = /this.titre *= *'([^']+)'/.exec(srcContent)
  if (!chunks) chunks = /this.titre *= *"([^"]+)"/.exec(srcContent)
  if (chunks) {
    const titre = chunks[1].replace(/\\?'/g, '’')
    const newContent = srcContent
      .replace(/(\/\*\*.*)?export +default/ms, `export const titre = '${titre}'\n\n$&`)
      .replace(chunks[0], 'this.titre = titre')
    fs.writeFileSync(file, newContent)
    console.log(`${file} : remplacement ok`)
  }
}

const jsDir = path.resolve(__dirname, '..', 'src', 'js')
const exercicesDir = path.resolve(jsDir, 'exercices')

const exercicesList = getAllFiles(exercicesDir)

for (const file of exercicesList) {
  transformExport(file)
}
