// lance jsdoc sur tous les jsdoc/*.json existants
const fs = require('fs')
const path = require('path')
const { execFile } = require('child_process')

const jsDocDir = path.resolve(__dirname, '..', 'jsdoc')
const jsDocBin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'jsdoc')

fs.readdirSync(jsDocDir).forEach(entry => {
  if (!/\.json/.test(entry)) return
  const fullEntry = path.join(jsDocDir, entry)
  execFile(jsDocBin, ['-c', fullEntry], (error, stdout, stderr) => {
    if (error) return console.error(`Pb avec ${entry}`, error)
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
    if (!stdout && !stderr) console.log(`Génération de la doc ${entry} ok`)
  })
})
