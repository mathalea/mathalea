import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, texteGras, modalUrl, modalPdf, combinaisonListes } from '../../modules/outils.js'
import { attendre, angleScratchTo2d, clone, orienter, mathalea2d, scratchblock, fond_ecran, creerLutin, avance, tournerD, tournerG, baisseCrayon, allerA } from '../../modules/2d.js'
import { param } from 'jquery'
export const titre = 'Note la couleur'
export function dessineAvecScratch (instruction, lutin) {
  switch (instruction.texte) {
    case 'avancer' :
      lutin.codeScratch += `\\blockmove{avancer de \\ovalnum{${instruction.val1}} pas}\n`
      avance(instruction.val1, lutin)
      break
    case 'tournerD' :
      lutin.codeScratch += `\\blockmove{tourner \\turnright{} de \\ovalnum{${instruction.val1}} degrés}\n`
      tournerD(instruction.val1, lutin)
      break
    case 'tournerG' :
      lutin.codeScratch += `\\blockmove{tourner \\turnleft{} de \\ovalnum{${instruction.val1}} degrés}\n`
      tournerG(instruction.val1, lutin)
      break
    case 'ajouter à x' :
      lutin.codeScratch += `\\blockmove{ajouter \\ovalnum{${instruction.val1}}  à  x}\n`
      break
    case 'ajouter à y' :
      lutin.codeScratch += `\\blockmove{ajouter \\ovalnum{${instruction.val1}}  à  y}\n`
      break
    case 'aller à' :
      lutin.codeScratch += `\\blockmove{aller à x: \\ovalnum{${instruction.val1}} y: \\ovalnum{${instruction.val2}}}\n `
      allerA(instruction.val1, instruction.val2, lutin)
      break
    case "s'orienter à" :
      lutin.codeScratch += `\\blockmove{s'orienter à \\ovalnum{${instruction.val1}}}\n`
      orienter(angleScratchTo2d(instruction.val1), lutin)
      break
    case 'baisseCrayon' :
      lutin.codeScratch += '\\blockpen{stylo en position d\'écriture}\n'
      baisseCrayon(lutin)
      break
  }
}

export default function AlgoTortue () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.typeExercice = 'Scratch'
  this.listePackages = 'scratch3'

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    const objetsEnonce = []
    const objetsCorrection = []
    const paramsCorrection = { pixelsParCm: 20, scale: 1 }
    let listeTypeDeQuestions
    let sequence

    const TypesDeQuestionsDisponibles = ['deplacements']
    let commandesDisponibles
    let sequencesDisponibles
    listeTypeDeQuestions = combinaisonListes(TypesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0; i < this.nbQuestions; i++) {
      switch (listeTypeDeQuestions[i]) {
        case 'deplacements':
          commandesDisponibles = ['avancer', 'ajouter à x', 'ajouter à y', 'tourner à', 'aller à']
          break
      }

      const lutin = creerLutin()
      lutin.color = 'green'
      lutin.epaisseur = 3
      lutin.pointilles = 2
      const angleDepart = choice([-90, 0, 90, 180])
      const xDepart = 0
      const yDepart = 0
      context.unitesLutinParCm = 10
      context.pixelsParCm = 20

      let texte = ''
      let texteCorr = ''
      // On écrit le début du programme
      lutin.codeScratch = '\\begin{scratch}[print,fill,blocks]\n \\blockinit{quand \\greenflag est cliqué}\n '
      // On commence à dessiner
      dessineAvecScratch({ texte: 'aller à', val1: xDepart, val2: yDepart }, lutin)
      // On met le stylo en position pour générer la trace
      dessineAvecScratch({ texte: 'baisseCrayon' }, lutin)
      dessineAvecScratch({ texte: "s'orienter à", val1: angleDepart }, lutin)

      const np1 = randint(1, 4) * 20
      const np2 = randint(1, 4) * 20
      const ag1 = randint(1, 3) * 90

      dessineAvecScratch({ texte: 'avancer', val1: np1 }, lutin)
      if (choice([true, false])) {
        dessineAvecScratch({ texte: 'tournerD', val1: ag1 }, lutin)
      } else {
        dessineAvecScratch({ texte: 'tournerG', val1: ag1 }, lutin)
      }
      dessineAvecScratch({ texte: 'avancer', val1: np2 }, lutin)

      lutin.codeScratch += '\\end{scratch}'
      texte = 'Dessine la figure tracée par le lutin à l\'éxécution du programme ci-dessous.<br>'
      objetsEnonce.push(lutin)

      if (context.isHtml) {
        texte += '<table style="width: 100%"><tr><td>'
      } else {
        texte += '\\begin{minipage}[t]{.25\\textwidth}'
      }
      texte += scratchblock(lutin.codeScratch)

      if (context.isHtml) {
        texte += '</td><td>'
        texte += '             '
        texte += '</td><td style="vertical-align: top; text-align: center">'
      } else {
        texte += '\\end{minipage} '
        texte += '\\hfill \\begin{minipage}[t]{.74\\textwidth}'
      }
      paramsCorrection.xmin = lutin.xMin - 1.5
      paramsCorrection.ymin = lutin.yMin - 1.5
      paramsCorrection.xmax = lutin.xMax + 1.5
      paramsCorrection.ymax = lutin.yMax + 1.5

      texteCorr += '<br><br>' + mathalea2d(paramsCorrection, objetsCorrection, lutin)
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
