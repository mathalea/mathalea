import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
import { angleScratchTo2d, orienter, mathalea2d, scratchblock, creerLutin, avance, tournerD, tournerG, baisseCrayon, allerA, leveCrayon, grille, tracePoint, point, ajouterAx, ajouterAy } from '../../modules/2d.js'
export const titre = 'Tortue Scratch'
export function dessineAvecScratch (instruction, lutin) {
  switch (instruction.texte) {
    case 'baisseCrayon' :
      lutin.codeScratch += '\\blockpen{stylo en position d\'écriture}\n'
      baisseCrayon(lutin)
      break
    case 'lèveCrayon' :
      lutin.codeScratch += '\\blockpen{relever le stylo}\n'
      leveCrayon(lutin)
      break
  }
}

export default function AlgoTortue () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.typeExercice = 'Scratch'
  this.listePackages = 'scratch3'
  this.sup = 7
  this.sup2 = 2

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    const objetsEnonce = []
    const paramsCorrection = { pixelsParCm: 20, scale: 1 }
    const sequences = [
      ['avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerD'],
      ['avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG'],
      ['avancer', 'tournerG', 'ajouter à x', 'tournerD', 'avancer', 'tournerG', 'ajouter à y', 'tournerD', 'avancer', 'tournerG'],
      ['avancer', 'tournerD', 'ajouter à x', 'tournerG', 'avancer', 'tournerG', 'ajouter à y', 'tournerD', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'ajouter à y', 'tournerG', 'avancer', 'tournerG', 'ajouter à x', 'tournerD', 'avancer', 'tournerG'],
      ['avancer', 'tournerD', 'ajouter à y', 'tournerD', 'ajouter à y', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG']
    ]
    let choix
    if (parseInt(this.sup2) === 1) {
      choix = randint(0, 3)
    } else {
      choix = randint(4, 7)
    }
    const commandes = combinaisonListesSansChangerOrdre(sequences[choix], parseInt(this.sup))
    console.log(commandes)
    let val1, val2
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
    lutin.codeScratch += `\\blockmove{aller à x: \\ovalnum{${xDepart}} y: \\ovalnum{${yDepart}}}\n `
    allerA(xDepart, yDepart, lutin)
    // On met le stylo en position pour générer la trace
    dessineAvecScratch({ texte: 'baisseCrayon' }, lutin)
    lutin.codeScratch += `\\blockmove{s'orienter à \\ovalnum{${angleDepart}}}\n`
    orienter(angleScratchTo2d(angleDepart), lutin)

    for (let i = 0; i < parseInt(this.sup); i++) {
      switch (commandes[i]) {
        case 'avancer':
          val1 = randint(1, 4) * 10
          lutin.codeScratch += `\\blockmove{avancer de \\ovalnum{${val1}} pas}\n`
          avance(val1, lutin)
          break
        case 'tournerD' :
          lutin.codeScratch += '\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}\n'
          tournerD(90, lutin)
          break
        case 'tournerG' :
          lutin.codeScratch += '\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}\n'
          tournerG(90, lutin)
          break
        case 'ajouter à x' :
          val1 = randint(1, 4) * 10
          lutin.codeScratch += `\\blockmove{ajouter \\ovalnum{${val1}}  à  x}\n`
          ajouterAx(val1, lutin)
          break
        case 'ajouter à y' :
          val1 = randint(1, 4) * 10
          lutin.codeScratch += `\\blockmove{ajouter \\ovalnum{${val1}}  à  y}\n`
          ajouterAy(val1, lutin)
          break
        case 'aller à' :
          val1 = randint(-3, 3) * 10
          val2 = randint(-3, 3) * 10
          lutin.codeScratch += `\\blockmove{aller à x: \\ovalnum{${val1}} y: \\ovalnum{${val2}}}\n `
          allerA(val1, val2, lutin)
          break
        case "s'orienter à" :
          val1 = choice([0, -90, 90, 180])
          lutin.codeScratch += `\\blockmove{s'orienter à \\ovalnum{${val1}}}\n`
          orienter(angleScratchTo2d(val1), lutin)
          break
      }
    }
    dessineAvecScratch({ texte: 'lèveCrayon' }, lutin)
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
      texte += '    '
      texte += '</td><td style="vertical-align: top; text-align: center">'
    } else {
      texte += '\\end{minipage} '
      texte += '\\hfill \\begin{minipage}[t]{.74\\textwidth}'
    }
    paramsCorrection.xmin = lutin.xMin - 1.5
    paramsCorrection.ymin = lutin.yMin - 1.5
    paramsCorrection.xmax = lutin.xMax + 1.5
    paramsCorrection.ymax = lutin.yMax + 1.5
    texte += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, scale: 0.5 }, grille(-10, -10, 10, 10), tracePoint(point(0, 0)))
    if (context.isHtml) {
      texte += '</td><td>'
    } else {
      texte += '\\end{minipage} '
    }
    texteCorr += '<br><br>' + mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, scale: 0.5 }, grille(-10, -10, 10, 10), tracePoint(point(0, 0)), lutin)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ["Nombre d'instructions"]
  this.besoinFormulaire2Numerique = ["Type d'instructions", '1 : sans calcul\n 2: Avec calcul']
}
