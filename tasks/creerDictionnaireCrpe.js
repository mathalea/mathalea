const testFolder = 'src/assets/crpe/2017'
const fs = require('fs')
let content = ''
const listeFichiers = []
const listeFichiersCor = []
const dictionnaire = {}

fs.readdir(testFolder, (_err, files) => {
  files.forEach(file => {
    file.includes('cor') ? listeFichiersCor.push('assets/crpe/2017/' + file) : listeFichiers.push('assets/crpe/2017/' + file)
  })
  // content += listeFichiers.join('\n')
  for (const annee of ['2017']) {
    for (const lieu of [['g1', 'Groupement 1'], ['g2', 'Groupement 2'], ['g3', 'Groupement 3'], ['g4', 'Groupement 4'], ['g5', 'Groupement 5']]) {
      for (const ex of ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'pb']) {
        const key = `crpe-${annee}-${lieu[0]}-${ex}`
        const listePng = listeFichiers.filter(s => s.includes(key))
        const listePngCor = listeFichiersCor.filter(s => s.includes(key))
        if (listePng.length > 0) {
          dictionnaire[key] = {}
          dictionnaire[key].typeExercice = 'crpe'
          dictionnaire[key].annee = annee
          dictionnaire[key].lieu = lieu[1]
          dictionnaire[key].numeroInitial = (ex === 'pb') ? 'Problème' : `Ex ${ex.substring(2, 3)}`
          dictionnaire[key].png = listePng
          dictionnaire[key].pngCor = listePngCor
          dictionnaire[key].tags = []
        }
      }
    }
  }
  content = JSON.stringify(dictionnaire, null, 2)
  fs.writeFile('src/js/modules/dictionnaireCrpe.json', content, err => {
    if (err) {
      console.error(err)
    }
  })
})

// Pour exécuter ce script : node tasks/creerDictionnaireCrpe.js
