// lance jsdoc sur tous les jsdoc/*.json existants
import fs from 'fs'
import path from 'path'
import * as pkg from 'child_process'
const execFile = pkg.execFile
const jsDocDir = path.resolve('.', 'jsdoc')
const jsDocBin = path.resolve('.', 'node_modules', '.bin', 'jsdoc')

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
