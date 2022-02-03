const annee = '2019'
const testFolder = 'src/assets/crpe/' + annee
const fs = require('fs')
let content = ''
const listeFichiers = []
const listeFichiersCor = []
const dictionnaire = {}

fs.readdir(testFolder, (_err, files) => {
  files.forEach(file => {
    file.includes('cor') ? listeFichiersCor.push(`assets/crpe/${annee}/` + file) : listeFichiers.push(`assets/crpe/${annee}/` + file)
  })
  console.log(listeFichiers)
  // content += listeFichiers.join('\n')
  for (const lieu of [['g1', 'Groupement 1'], ['g2', 'Groupement 2'], ['g3', 'Groupement 3'], ['g4', 'Groupement 4'], ['g5', 'Groupement 5'], ['cre', 'Créteil'], ['pol', 'Polynésie'], ['aix', 'Aix-Marseille'], ['ver', 'ESPE Versailles'], ['bes', 'ESPE Besançon'], ['bre', 'ESPE Bretagne'], ['cle', 'ESPE Clermont-Ferrand'], ['dij', 'ESPE Dijon'], ['tou', 'ESPE Toulouse'], ['s2', 'ESPE Paris'], ['s4', 'ESPE Paris - Sujet 2'], ['s5', 'ESPE Dijon - Sujet 2'], ['s6', 'ESPE Dijon - Sujet 3 '], ['s7', 'ESPE Paris - Sujet 3'], ['s8', 'ESPE Roche sur Yon'], ['s9', 'ESPE Paris - Sujet 4'], ['s10', 'ESPE Besançon']]) {
    for (const ex of ['dida', 'dida1', 'dida2', 'dida3', 'dida4', 'dida5']) {
    // for (const ex of ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'pb']) {
      let key = `${annee}-${lieu[0]}-${ex}`
      const listePng = listeFichiers.filter(s => s.includes(key))
      const listePngCor = listeFichiersCor.filter(s => s.includes(key))
      key = `crpe-${annee}-${lieu[0]}-${ex}`
      if (listePng.length > 0) {
        dictionnaire[key] = {}
        dictionnaire[key].typeExercice = 'crpe'
        dictionnaire[key].annee = annee
        dictionnaire[key].lieu = lieu[1]
        let numeroInitial = ''
        if (ex === 'pb') {
          numeroInitial = 'Problème'
        } else if (ex.substring(0, 2) === 'ex') {
          numeroInitial = `Ex ${ex.substring(2, 3)}`
        } else {
          numeroInitial = `Situation ${ex.substring(4, 5) || '1'}`
        }
        dictionnaire[key].numeroInitial = numeroInitial
        dictionnaire[key].png = listePng
        dictionnaire[key].pngCor = listePngCor
        dictionnaire[key].tags = []
      }
    }
  }
  console.log(dictionnaire)
  content = JSON.stringify(dictionnaire, null, 2)
  fs.writeFile('src/js/modules/dictionnaireCrpe.json', content, err => {
    if (err) {
      console.error(err)
    }
  })
})

// Pour exécuter ce script : node tasks/creerDictionnaireCrpe.js
