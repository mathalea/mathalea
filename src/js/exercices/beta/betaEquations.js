import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { polygone, segment, ObjetMathalea2D, point, mathalea2d, texteParPosition, fixeBordures } from '../../modules/2d.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { create, all, parse } from 'mathjs'
import { calculExpression, calculExpression2, resoudreEquation, aleaEquation, aleaExpressionLitterale, aleaVariables, traduireProgrammeCalcul, appliquerProgrammeCalcul, remonterProgrammeCalcul, ecrireProgrammeCalcul } from '../../modules/outilsMathjs.js'

const math = create(all)
math.config({
  number: 'Fraction'
})
// eslint-disable-next-line no-debugger
// debugger
export const titre = 'Calculs algébriques'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '02/01/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

function TraceSchemaBarre (x, y, legende = '', { epaisseur = 0.6, couleurDeRemplissage = 'blue', color = 'black', opaciteDeRemplissage = 0.3, angle = 66, unite = 1, hachures = false } = {}) {
  ObjetMathalea2D.call(this)
  this.bordures = [x, 0, x + epaisseur, y * unite]
  const p = polygone(
    point(x, 0),
    point(x, y * unite),
    point(x + epaisseur, y * unite),
    point(x + epaisseur, 0)
  )
  p.couleurDeRemplissage = couleurDeRemplissage
  p.opaciteDeRemplissage = opaciteDeRemplissage
  p.color = color
  if (hachures) {
    p.hachures = hachures
  }
  const texte = texteParPosition(legende, x, -0.2, angle, 'black', 1, 'gauche')

  this.tikz = function () {
    return p.tikz() + '\n' + texte.tikz()
  }
  this.svg = function (coeff) {
    return p.svg(coeff) + '\n' + texte.svg(coeff)
  }
}

function traceSchemaBarre (...args) {
  return new TraceSchemaBarre(...args)
}

function schemaBarre () {
  const diagramme = []
  const longueur1 = segment(point(0, 1.5), point(6, 1.5))
  longueur1.styleExtremites = '<->'
  diagramme.push(longueur1)
  diagramme.push(traceSchemaBarre(0, 1, '', { couleurDeRemplissage: 'blue', epaisseur: 6 }))
  diagramme.push(traceSchemaBarre(6, 1, '', { couleurDeRemplissage: 'blue', epaisseur: 5 }))
  const diagrammeMathalea = mathalea2d(Object.assign({}, fixeBordures(diagramme, { rxmin: -3, rymin: -2, rymax: 1.5 }), { style: 'inline', scale: 1 }), ...diagramme)
  const texte = `${diagrammeMathalea}`
  const texteCorr = ''
  return { texte: texte, texteCorr: texteCorr }
}
/**
 * Résoudre des équations du premier degré
 * @author Frédéric PIOU
 * Référence
*/

export default function equationsProgression () {
  Exercice.call(this)
  const formulaire = [
    '0 : Mélange des types de questions',
    '1 : Programme de calcul : 3 étapes, quatre opérations, cube, carré.',
    '2 : Programme de calcul : 4 étapes, quatre opérations, cube, carré.',
    '3 : Programme de calcul : 5 étapes, quatre opérations, cube, carré.',
    '4 : Programme de calcul : 5 étapes, quatre opérations.',
    '5 : Résoudre une équation',
    '6 : Résoudre une équation',
    '7 : Résoudre une équation',
    '8 : Résoudre une équation',
    '9 : Résoudre une équation',
    '10 : Résoudre une équation',
    '11 : Résoudre une équation',
    '12 : Résoudre une équation',
    '13 : Résoudre une équation',
    '14 : Résoudre une équation',
    '15 : Résoudre une équation',
    '16 : Résoudre une équation',
    '17 : Résoudre une équation',
    '18 : Résoudre une équation',
    '19 : Calculer',
    '20 : Calculer',
    '21 : Calculer',
    '22 : Calculer',
    '23 : Calculer',
    '24 : Calculer',
    '25 : Calculer',
    '26 : Calculer',
    '27 : Calculer',
    '28 : Calculer',
    '29 : Calculer',
    '30 : Calculer',
    '31 : Calculer',
    '32 : Calculer',
    '33 : Calculer',
    '34 : Calculer',
    '35 : Calculer',
    '36 : Calculer',
    '37 : Calculer',
    '38 : Calculer',
    '39 : Calculer',
    '40 : Calculer',
    '41 : Calculer',
    '42 : Calculer',
    '43 : Calculer',
    '44 : Calculer',
    '45 : Calculer',
    '46 : Calculer',
    '47 : Calculer',
    '48 : Calculer',
    '49 : Calculer',
    '50 : Calculer',
    '51 : Calculer',
    '52 : Calculer',
    '53 : Calculer',
    '54 : Calculer',
    '55 : Calculer',
    '56 : Calculer',
    '57 : Calculer',
    '58 : Calculer',
    '59 : Calculer',
    '60 : Calculer',
    '61 : Calculer',
    '62 : Calculer',
    '63 : Calculer',
    '64 : Calculer',
    '65 : Calculer',
    '66 : Calculer',
    '67 : Calculer',
    '68 : Calculer',
    '69 : Calculer',
    '70 : Calculer'
  ]
  this.nbQuestions = 0
  this.besoinFormulaireNumerique = [
    'Type de question', this.nbQuestions, formulaire.join('\n')
  ]
  this.consigne = ''
  this.nbCols = 0
  this.nbColsCorr = 0
  this.tailleDiaporama = 1
  this.video = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 0)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 0)
  this.sup = 0 // Type d'exercice
  this.nouvelleVersion = function (numeroExercice, dDebug = false) {
    this.nbQuestions = this.NbQuestions > 0 ? this.nbQuestions : this.sup !== 0 ? 1 : formulaire.length - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let nquestion = 0
    for (let i = 0, exercice, cpt = 0; i < this.nbQuestions && cpt < 100;) { // Boucle principale où i+1 correspond au numéro de la question
      nquestion = this.sup === 0 ? cpt + 1 : this.sup
      if (dDebug) {
        console.log(`
        ********************************
        Exercice ${i + 1} Case ${nquestion}
        ********************************`)
      }
      switch (nquestion) {
        case 1: {
          exercice = traduireProgrammeCalcul(['+', '*'], parse(1), dDebug)
          break
        }
        case 2: {
          exercice = traduireProgrammeCalcul(['*', '+'], parse(1), dDebug)
          break
        }
        case 3: {
          exercice = traduireProgrammeCalcul(['+', '*', '-'], parse(1), dDebug)
          break
        }
        case 4: {
          exercice = traduireProgrammeCalcul(['-', '*', '2*x'], parse(1), dDebug)
          break
        }
        case 5: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', { // Ici le type de l'équation
            a: false, // a est un nombre entier compris entre 1 et 9 (1 et 9 compris)
            b: false, // idem
            c: false,
            d: false, // aleaEquation va choisir au hasard les nombres a, b, c et d
            test: 'a!=c' // mais elle vérfie que a est différent de c (1000 essais autorisés)
          }), dDebug)
          break
        }
        case 6: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', {
            a: false,
            b: true, // Si c'est true alors le nombre pourra être négatif (mais pas nul)
            c: false,
            d: true, // C'est toujours un nombre entier compris entre -9 et 9 cette fois-ci (non nul)
            test: 'a!=c'
          }), dDebug)
          break
        }
        case 7: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', {
            a: true,
            b: true,
            c: false,
            d: true,
            test: 'a!=c'
          }), dDebug)
          break
        }
        case 8: {
          exercice = resoudreEquation(aleaEquation('x/a=b/c', {
            a: false,
            b: true,
            c: false,
            test: 'a!= 1 and abs(b)%c!=0' // Ici on fait en sorte que b/c ne soit pas simplifiable en utilisant le reste
          }), dDebug)
          break
        }
        case 9: {
          exercice = resoudreEquation(aleaEquation('-x/a=b/c', {
            a: false,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), dDebug)
          break
        }
        case 10: {
          exercice = resoudreEquation(aleaEquation('a/x=b/c', {
            a: true,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), dDebug)
          break
        }
        case 11: {
          exercice = resoudreEquation(aleaEquation('(a*x+b)/c=d/e', {
            a: true,
            b: true,
            c: false,
            d: true,
            e: false,
            test: 'c>1 and a%c!=0 and abs(d)%e!=0'
          }), dDebug)
          break
        }
        case 12: {
          exercice = resoudreEquation(aleaEquation('a*x+b/c=d/e', {
            a: true,
            b: true,
            c: false,
            d: true,
            e: false,
            test: 'c>1 and abs(d)%e!=0 and abs(b)%c!=0'
          }), dDebug)
          break
        }
        case 13: {
          exercice = resoudreEquation(aleaEquation('a/(b*x+c)=d/e', {
            a: true,
            b: true,
            c: true,
            d: true,
            e: false,
            test: 'abs(d)%e!=0'
          }), dDebug)
          break
        }
        case 14: {
          exercice = resoudreEquation(aleaEquation('A*x+B=C*x+D', {
            s: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)', // les calculs avec fraction donnent des valeurs exactes
            a: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)', // même si on les additionnent
            b: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)', // c'est un avantage
            c: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)', //
            A: 'a+b', // on construit les coefficient de l'équation
            B: 'c', // pour que la solution
            C: 'b', // soit le nombre s (qui est décimal)
            D: 'a*s+c',
            test: 'A!=0 and D!=0' // Le test permet d'éliminer les cas particuliers
          }), dDebug)
          break
        }
        case 15: {
          exercice = resoudreEquation(aleaEquation('a*(b*x+c)=d*x+e', {
            a: true,
            b: true,
            c: true,
            d: true,
            e: false,
            test: 'a!=1 and a*b!=d' // Pour qu'il y ait une solution
          }), dDebug)
          break
        }
        case 16: {
          exercice = resoudreEquation(aleaEquation('a*x+b*y=c', { // On résous l'équation en x
            a: true, // On aura donc y en fonction de x
            b: true,
            c: true
          }), dDebug)
          break
        }
        case 17: {
          exercice = resoudreEquation(aleaEquation('a*x^2+b=a*x*(x+c)', {
            a: true, // On s'arrange pour qu'on puisse
            b: true, // se ramener à une équation
            c: true // du premier degré
          }), dDebug)
          break
        }
        case 18: {
          exercice = resoudreEquation(aleaEquation('x/a=y', {
            a: false,
            test: 'a!=1'
          }), dDebug)
          break
        }
        case 19: {
          exercice = calculExpression(aleaExpressionLitterale('a/b+c/d',
            aleaVariables({
              a: false,
              b: 'randomInt(2,100)',
              c: false,
              d: 'randomInt(2,100)',
              test: '(d%b==0 or b%d==0) and gcd(a,b)==1 and gcd(c,d)==1'
            })).toString(), false, dDebug)
          break
        }
        case 20: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x', aleaVariables({
            a: 'randomInt(2,100)',
            b: 'randomInt(2,100)'
          })).toString(), false, dDebug)
          break
        }
        case 21: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x-c*x', aleaVariables({
            a: 'randomInt(2,100)',
            b: 'randomInt(2,100)',
            c: 'randomInt(2,100)',
            test: 'a+b>=c'
          })).toString(), false, dDebug)
          break
        }
        case 22: {
          exercice = calculExpression(aleaExpressionLitterale('a/b*x+c/d*x', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: '(d%b==0 or b%d==0) and gcd(a,b)==1 and gcd(c,d)==1'
            // On souhaite que l'une des deux fractions soit simplifiable
          })).toString(), false, dDebug)
          break
        }
        case 23: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2+b*x+c*x^2', aleaVariables({
            a: 'randomInt(1,20)',
            b: 'randomInt(1,20)',
            c: 'randomInt(1,20)'
          })).toString(), false, dDebug)
          break
        }
        case 24: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2+b*x+c', aleaVariables({
            a: 'randomInt(1,15)^2',
            c: 'randomInt(1,15)^2',
            b: '2*sqrt(a)*sqrt(c)'
          })).toString(), true, dDebug)
          break
        }
        case 25: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2-b*x+c', aleaVariables({
            a: 'randomInt(1,15)^2',
            c: 'randomInt(1,15)^2',
            b: '2*sqrt(a)*sqrt(c)'
          })).toString(), true, dDebug)
          break
        }
        case 26: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2-b', aleaVariables({
            a: 'randomInt(1,15)^2',
            b: 'randomInt(1,15)^2'
          })).toString(), true, dDebug)
          break
        }
        case 27: {
          exercice = ecrireProgrammeCalcul(['-', '*', '2*x'], parse(1), dDebug)
          break
        }
        case 28: {
          exercice = ecrireProgrammeCalcul(['-', '*', '2*x'], parse(1), dDebug)
          break
        }
        case 29: {
          exercice = calculExpression(aleaExpressionLitterale('a+c/d', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0'
          })).toString(), false, dDebug)
          break
        }
        case 30: {
          exercice = calculExpression(aleaExpressionLitterale('a-c/d', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0 and a-c/d>0'
          })).toString(), false, dDebug)
          break
        }
        case 31: {
          exercice = calculExpression(aleaExpressionLitterale('a/b-c/d', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'gcd(a,b)==1 and gcd(c,d)==1 and d!=b and (d%b==0 or b%d==0) and a/b-c/d>0'
          })).toString(), false, dDebug)
          break
        }
        case 32: {
          exercice = resoudreEquation(aleaEquation('a*x+b>c*x+d', { // On résoud maintenant une inéquation
            a: false,
            b: false,
            c: false,
            d: false,
            test: 'a!=c'
          }), dDebug)
          break
        }
        case 33: {
          exercice = resoudreEquation(aleaEquation('a*x^2+b*x+c=0', { // On résoud une équation du second degré
            s: true,
            t: true,
            a: true,
            b: 'a*(-s-t)', // les racines sont des entiers (seuls gérés par mathsteps)
            c: 'a*s*t'
          }, dDebug), dDebug)
          break
        }
        case 34: {
          exercice = traduireProgrammeCalcul(['+', '*'], parse(1), dDebug)
          break
        }
        case 35: {
          exercice = ecrireProgrammeCalcul(['*', '+'], parse(1), dDebug)
          break
        }
        case 36: {
          exercice = traduireProgrammeCalcul(['*', '2*x'], parse(1), dDebug)
          break
        }
        case 37: {
          exercice = traduireProgrammeCalcul(['-', '-2*x'], parse(1), dDebug)
          break
        }
        case 38: {
          exercice = traduireProgrammeCalcul(['-', '/', 'x'], parse(1), dDebug)
          break
        }
        case 39: {
          exercice = appliquerProgrammeCalcul(
            ['-', '/', 'x', '*', 'x^2'],
            aleaVariables(
              {
                a: true,
                b: false,
                c: 'fraction(a,b)',
                test: 'a%b!=0'
              }).c, dDebug)
          break
        }
        case 40: {
          exercice = remonterProgrammeCalcul(
            ['-', '/', '*', '+'],
            aleaVariables(
              {
                a: true,
                b: false,
                c: 'fraction(a,b)',
                test: 'a%b!=0'
              }).c, dDebug)
          break
        }
        case 41: {
          exercice = remonterProgrammeCalcul(
            ['-'],
            aleaVariables(
              {
                a: false
              }).a, dDebug)
          break
        }
        case 42: {
          exercice = remonterProgrammeCalcul(
            ['-', '*'],
            aleaVariables(
              {
                a: false
              }).a, dDebug)
          break
        }
        case 43: {
          exercice = calculExpression(aleaExpressionLitterale('(a/b)*(c/d)', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'gcd(a,b)==1 and gcd(c,d)==1 and d!=b and (d%b==0 or b%d==0) and a/b-c/d>0'
          })).toString({ parenthesis: 'keep' }), false, dDebug)
          break
        }
        case 44: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x', aleaVariables({
            a: 'round(random(1,10),1)',
            b: 'round(random(-10,10),1)',
            test: 'b!=0 and a+b>0'
          })).toString(), false, dDebug)
          break
        }
        case 45: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b', aleaVariables({
            a: false,
            b: false,
            test: 'a>1 and b>1'
          })).toString(), false, dDebug)
          break
        }
        case 46: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b+c*x', aleaVariables({
            a: false,
            b: false,
            c: true,
            test: 'b>1 and a>1 and a*b+c>0'
          })).toString(), false, dDebug)
          break
        }
        case 47: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b+c*x', aleaVariables({
            a: false,
            b: false,
            c: true,
            test: 'b>1 and a>1 and a*b+c>0'
          })).toString(), false, dDebug)
          break
        }
        case 48: {
          exercice = calculExpression(aleaExpressionLitterale('x*a*x*b', aleaVariables({
            a: false,
            b: false,
            test: 'b>1 and a>1'
          })).toString(), false, dDebug)
          break
        }
        case 49: {
          exercice = calculExpression(aleaExpressionLitterale('x*a*x+b*x^2', aleaVariables({
            a: false,
            b: true,
            test: 'a>1 and a+b>0'
          })).toString(), false, dDebug)
          break
        }
        case 50: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b*x*c*x+d*x^2', aleaVariables({
            a: false,
            b: false,
            c: false,
            d: true,
            test: 'a>1 and b>1 and c>1'
          })).toString(), false, dDebug)
          break
        }
        case 51: {
          exercice = traduireProgrammeCalcul(['+', '/', '-x^2'], parse(1), dDebug)
          break
        }
        case 52: {
          exercice = traduireProgrammeCalcul(['*', '-x', '/'], parse(1), dDebug)
          break
        }
        case 53: {
          exercice = traduireProgrammeCalcul(['/', '-x', '*'], parse(1), dDebug)
          break
        }
        case 54: {
          exercice = appliquerProgrammeCalcul(['+', '*', '-'], aleaVariables(
            {
              a: true
            }).a, dDebug)
          break
        }
        case 55: {
          exercice = remonterProgrammeCalcul(['*', '-', '/'], aleaVariables(
            {
              a: true
            }).a, dDebug)
          break
        }
        case 56: {
          exercice = remonterProgrammeCalcul(['+', '*', '-'], aleaVariables(
            {
              a: true
            }).a, dDebug)
          break
        }
        case 57: {
          exercice = calculExpression(aleaExpressionLitterale('a/b+c/d',
            aleaVariables({
              a: true,
              b: 'randomInt(2,100)',
              c: true,
              d: 'randomInt(2,100)',
              test: '(d%b==0 or b%d==0) and gcd(abs(a),b)==1 and gcd(abs(c),d)==1'
            })).toString(), false, dDebug)
          break
        }
        case 58: {
          exercice = calculExpression(aleaExpressionLitterale('a+c/d', aleaVariables({
            a: true,
            b: 'randomInt(2,100)',
            c: true,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0'
          })).toString(), false, dDebug)
          break
        }
        case 59: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x', aleaVariables({
            a: 'round(random(-10,10),1)',
            b: 'round(random(-10,10),1)',
            test: 'b!=0 and a!=0'
          })).toString(), false, dDebug)
          break
        }
        case 60: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b', aleaVariables({
            a: true,
            b: true,
            test: 'a!= 1 and abs(b)!=1'
          })).toString(), false, dDebug)
          break
        }
        case 61: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b+c*x', aleaVariables({
            a: true,
            b: true,
            c: true,
            test: 'a!= 1 and b!=1'
          })).toString(), false, dDebug)
          break
        }
        case 62: {
          exercice = calculExpression(aleaExpressionLitterale('x*a*x*b', aleaVariables({
            a: true,
            b: true,
            test: 'a!=1 and b!=1'
          })).toString(), false, dDebug)
          break
        }
        case 63: {
          exercice = calculExpression(aleaExpressionLitterale('x*a*x+b*x^2', aleaVariables({
            a: true,
            b: true,
            test: 'a!=1 and b!=1'
          })).toString(), false, dDebug)
          break
        }
        case 64: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b*x*c*x+d*x^2', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: true,
            test: 'a!= 1 and b!=1 and c!=1'
          })).toString(), false, dDebug)
          break
        }
        case 65: {
          exercice = schemaBarre()
          break
        }
        case 66: {
          exercice = calculExpression(aleaExpressionLitterale('a/e*x*b/f*x*c*x+d*x^2', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: true,
            e: 'randomInt(1,10)',
            f: 'randomInt(1,10)',
            test: 'a!= 1 and b!=1 and c!=1'
          })).toString(), false, dDebug)
          break
        }
        case 67: {
          exercice = appliquerProgrammeCalcul(
            ['+', '*', 'x'],
            aleaVariables(
              {
                a: true,
                b: false,
                c: 'fraction(a,b)',
                test: 'a%b!=0'
              }).c, dDebug)
          break
        }
        case 68: {
          exercice = remonterProgrammeCalcul(['+', '/'], aleaVariables(
            {
              a: true,
              b: false,
              c: 'fraction(a,b)',
              test: 'a%b!=0'
            }).c, dDebug)
          break
        }
        case 69: {
          exercice = calculExpression2(aleaExpressionLitterale('(a*x+b)^2+(c*x+d)*(e*x+f)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: true,
            e: true,
            f: true
          })).toString(), false, dDebug)
          break
        }
        case 70: {
          exercice = calculExpression2(aleaExpressionLitterale('(a*x+b)^2+(c*x+d)*(c*x-d)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false
          })).toString(), false, dDebug)
          break
        }
        case 71: {
          exercice = calculExpression2(aleaExpressionLitterale('(8*x-6)^2+(-9*x-2)*(7*x+2)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false
          })).toString(), false, dDebug)
          break
        }
      }
      if (this.questionJamaisPosee(i, nquestion)) {
        this.listeQuestions.push(exercice.texte)
        this.listeCorrections.push(exercice.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
