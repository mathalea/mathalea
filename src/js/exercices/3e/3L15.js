import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { pgcd, randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, rienSi1 } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFraction, texFractionReduite } from '../../modules/outils/arrayFractions.js'
export const titre = 'Équations du second degré se ramenant au premier degré'

/**
 *
 * Résoudre une équation du type (ax)2 - b2 = 0
 *
 * Résoudre une équation du type ax2 + bx = 0
 *
 * @author Rémi Angot
 * Référence 3L15
*/
export const uuid = '231d2'
export const ref = '3L15'
export default function ExerciceEquations () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les équations suivantes.'
  this.nbQuestions = 6
  this.nbCols = 2
  this.nbColsCorr = 1
  this.sup = 4
  this.spacingCorr = 3
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let typeQuestionsDisponibles = []
    if (this.sup === 1) {
      typeQuestionsDisponibles = ['ax2+bx', 'ax2+bxAvec1']
    }
    if (this.sup === 2) {
      typeQuestionsDisponibles = ['ax2-b2', 'ax2=b2']
    }
    if (this.sup === 3) {
      typeQuestionsDisponibles = ['bcx2+a=bx(cx+d)', 'bcx2+a=bx(cx+d)', '(ax+b)(cx+d)=acx2']
    }
    if (this.sup === 4) {
      typeQuestionsDisponibles = ['ax2+bx', 'ax2+bxAvec1', 'bcx2+a=bx(cx+d)', 'ax2-b2', 'ax2=b2', '(ax+b)(cx+d)=acx2']
    }
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, b, c, d, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'ax2+bx':
          a = randint(-9, 9, 0)
          b = randint(-9, 9, 0)
          texte = ax2plusbx(a, b)[0]
          texteCorr = ax2plusbx(a, b)[1]
          break
        case 'ax2+bxAvec1':
          if (randint(1, 2) === 1) {
            a = choice([-1, 1])
            b = randint(-9, 9, [-1, 0, 1])
          } else {
            b = choice([-1, 1])
            a = randint(-9, 9, [-1, 0, 1])
          }
          texte = ax2plusbx(a, b)[0]
          texteCorr = ax2plusbx(a, b)[1]
          break
        case 'ax2-b2':
          a = randint(1, 10)
          b = randint(1, 10)
          texte = `$ ${rienSi1(a ** 2)}x^2 - ${b ** 2} = 0 $ `
          texteCorr = `$ ${rienSi1(a ** 2)}x^2 - ${b ** 2} = 0 $ `
          texteCorr += '<br>'
          texteCorr += `$ (${rienSi1(a)}x+${b})(${rienSi1(a)}x-${b}) = 0 $ `
          texteCorr += '<br>'
          texteCorr += `$${rienSi1(a)}x+${b} = 0 \\quad \\text{ou} \\quad ${rienSi1(a)}x-${b} = 0$ `
          texteCorr += '<br>'
          texteCorr += `$${rienSi1(a)}x = ${-b} \\quad \\text{ou} \\quad ${rienSi1(a)}x = ${b}$ `
          texteCorr += '<br>'
          if (pgcd(a, b) !== 1) {
            texteCorr += `$x = ${texFraction(-b, a)} \\quad \\text{ou} \\quad x = ${texFraction(b, a)}$ `
          } else {
            texteCorr += `$x = ${texFraction(-b, a)}=${texFractionReduite(-b, a)} \\quad \\text{ou} \\quad x = ${texFraction(b, a)}=${texFractionReduite(b, a)}$ `
          }
          break
        case 'ax2=b2':
          a = randint(1, 10)
          b = randint(1, 10)
          texte = `$ ${rienSi1(a ** 2)}x^2 = ${b ** 2}$ `
          texteCorr = `$ ${rienSi1(a ** 2)}x^2 = ${b ** 2}$ `
          texteCorr += '<br>'
          texteCorr += `$ ${rienSi1(a ** 2)}x^2 - ${b ** 2} = 0 $ `
          texteCorr += '<br>'
          texteCorr += `$ (${rienSi1(a)}x+${b})(${a}x-${b}) = 0 $ `
          texteCorr += '<br>'
          texteCorr += `$${rienSi1(a)}x+${b} = 0 \\quad \\text{ou} \\quad ${rienSi1(a)}x-${b} = 0$ `
          texteCorr += '<br>'
          texteCorr += `$${rienSi1(a)}x = ${-b} \\quad \\text{ou} \\quad ${rienSi1(a)}x = ${b}$ `
          texteCorr += '<br>'
          if (pgcd(a, b) !== 1) {
            texteCorr += `$x = ${texFraction(-b, a)} \\quad \\text{ou} \\quad x = ${texFraction(b, a)}$ `
          } else {
            texteCorr += `$x = ${texFraction(-b, a)}=${texFractionReduite(-b, a)} \\quad \\text{ou} \\quad x = ${texFraction(b, a)}=${texFractionReduite(b, a)}$ `
          }
          break
        case 'bcx2+a=bx(cx+d)':
          a = randint(1, 10)
          b = randint(1, 10)
          c = randint(1, 10)
          d = randint(1, 10)
          if (randint(1, 2) === 1) {
            texte = `$ ${rienSi1(b * c)}x^2 ${ecritureAlgebrique(a)} = ${rienSi1(b)}x(${rienSi1(c)}x ${ecritureAlgebrique(d)}) $`
            texteCorr = `$ ${rienSi1(b * c)}x^2 ${ecritureAlgebrique(a)} = ${rienSi1(b)}x(${rienSi1(c)}x ${ecritureAlgebrique(d)}) $`
            texteCorr += '<br>'
            texteCorr += `$ ${rienSi1(b * c)}x^2 ${ecritureAlgebrique(a)} = ${rienSi1(b * c)}x^2 ${ecritureAlgebriqueSauf1(d * b)}x $`
            texteCorr += '<br>'
            texteCorr += `$ ${a} = ${rienSi1(d * b)}x $`
            texteCorr += '<br>'
            texteCorr += `$ ${texFraction(a, d * b)} = x $`
            if ((a < 0 && d * b < 0) || pgcd(a, d * b) !== 1) {
              texteCorr += '<br>'
              texteCorr += ` $ x = ${texFractionReduite(a, d * b)} $`
            }
          } else {
            texte = `$ ${rienSi1(b)}x(${rienSi1(c)}x ${ecritureAlgebrique(d)}) = ${rienSi1(b * c)}x^2 ${ecritureAlgebrique(a)} $`
            texteCorr = `$  ${rienSi1(b)}x(${rienSi1(c)}x ${ecritureAlgebrique(d)}) = ${rienSi1(b * c)}x^2 ${ecritureAlgebrique(a)} $`
            texteCorr += '<br>'
            texteCorr += `$ ${rienSi1(b * c)}x^2 ${ecritureAlgebriqueSauf1(b * d)}x = ${rienSi1(b * c)}x^2 ${ecritureAlgebrique(a)}$`
            texteCorr += '<br>'
            texteCorr += `$ ${rienSi1(b * d)}x = ${a} $`
            texteCorr += '<br>'
            texteCorr += `$ x = ${texFraction(a, b * d)}$`
            if ((a < 0 && b * d < 0) || pgcd(a, b * d) !== 1) {
              texteCorr += '<br>'
              texteCorr += ` $ x = ${texFractionReduite(a, b * d)} $`
            }
          }

          break
        case '(ax+b)2=0':
          a = randint(1, 10)
          b = randint(1, 10)
          texte = `$ (${rienSi1(a)}x ${ecritureAlgebrique(b)})^2 = 0 $`
          texteCorr = `$ (${rienSi1(a)}x ${ecritureAlgebrique(b)})^2 = 0 $`
          texteCorr += '<br>'
          texteCorr += `$ ${rienSi1(a)}x ${ecritureAlgebrique(b)} = 0$`
          texteCorr += '<br>'
          texteCorr += `$ ${rienSi1(a)}x = ${-b} $`
          texteCorr += '<br>'
          texteCorr += `$ x = ${texFraction(-b, a)}$`
          if ((-b < 0 && a < 0) || pgcd(a, b) !== 1) {
            texteCorr += '<br>'
            texteCorr += ` $ x = ${texFractionReduite(-b, a)} $`
          }
          break
        case '(ax+b)(cx+d)=acx2':
          a = randint(1, 5)
          b = randint(1, 5)
          c = randint(1, 5)
          d = randint(1, 5)
          texte = `$ (${rienSi1(a)}x ${ecritureAlgebrique(b)})(${rienSi1(c)}x ${ecritureAlgebrique(d)}) = ${rienSi1(a * c)}x^2 $`
          texteCorr = `$ (${rienSi1(a)}x ${ecritureAlgebrique(b)})(${rienSi1(c)}x ${ecritureAlgebrique(d)}) = ${rienSi1(a * c)}x^2 $`
          texteCorr += '<br>'
          texteCorr += `$ ${rienSi1(a * c)}x^2 ${ecritureAlgebriqueSauf1(a * d)}x ${ecritureAlgebriqueSauf1(b * c)}x ${ecritureAlgebrique(b * d)} = ${rienSi1(a * c)}x^2 $`
          texteCorr += '<br>'
          texteCorr += `$ ${rienSi1(a * c)}x^2 ${ecritureAlgebriqueSauf1(a * d + b * c)}x ${ecritureAlgebrique(b * d)} = ${rienSi1(a * c)}x^2 $`
          texteCorr += '<br>'
          texteCorr += `$ ${rienSi1(a * d + b * c)}x ${ecritureAlgebrique(b * d)} = 0 $`
          texteCorr += '<br>'
          texteCorr += `$ ${rienSi1(a * d + b * c)}x = ${-b * d}$ `
          texteCorr += '<br>'
          texteCorr += `$ x = ${texFraction(-b * d, a * d + b * c)}$`
          if ((-b * d < 0 && a * d + b * c < 0) || pgcd(-b * d, a * d + b * c) !== 1) {
            texteCorr += '<br>'
            texteCorr += `$ x = ${texFractionReduite(-b * d, a * d + b * c)}$`
          }

          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ["Type d'équations", 4, "1 : Factoriser avec x en facteur commun\n2 : Factoriser avec l'identité remarquable\n3 : Développer et réduire\n4 : Mélange"]
}

function ax2plusbx (a, b) {
  const texte = `$ ${rienSi1(a)} x^2 ${ecritureAlgebriqueSauf1(b)} x=0$`
  let texteCorr = `$ ${rienSi1(a)} x^2 ${ecritureAlgebriqueSauf1(b)} x=0$`
  texteCorr += '<br>'
  texteCorr += `$x(${rienSi1(a)} x ${ecritureAlgebrique(b)})=0$`
  texteCorr += '<br>'
  texteCorr += `$ x = 0 \\text{ \\quad ou \\quad } ${rienSi1(a)} x ${ecritureAlgebrique(b)} = 0 $ `
  texteCorr += '<br>'
  texteCorr += `$ \\phantom{x = 0 \\text{ \\quad ou \\quad }} ${rienSi1(a)} x = ${-b} $ `
  texteCorr += '<br>'
  texteCorr += `$ \\phantom{x = 0 \\text{ \\quad ou \\quad }}  x = ${texFraction(-b, a)} `
  if ((b > 0 && a < 0) || pgcd(a, b) !== 1) {
    texteCorr += ` = ${texFractionReduite(-b, a)} `
  }
  texteCorr += '$'
  return [texte, texteCorr]
}
