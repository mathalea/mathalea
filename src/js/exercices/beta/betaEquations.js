import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { polygone, segment, ObjetMathalea2D, point, mathalea2d, texteParPosition, fixeBordures } from '../../modules/2d.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { parse, simplify, compare, evaluate } from 'mathjs'
import { aleaName, aleaExpression, resoudre, toTex, calculer, calculExpression2, resoudreEquation, aleaEquation, expressionLitterale, aleaVariables, traduireProgrammeCalcul, appliquerProgrammeCalcul, remonterProgrammeCalcul, ecrireProgrammeCalcul } from '../../modules/outilsMathjs.js'
import Algebrite from 'algebrite'

// eslint-disable-next-line no-debugger
debugger
const nbCase = 139

export const titre = 'Calculs algébriques'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '02/01/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

function TraceSchemaBarre (x, y, legende = '', { epaisseur = 0.6, couleurDeRemplissage = 'blue', color = 'black', opaciteDeRemplissage = 0.3, angle = 66, unite = 1, hachures = false } = {}) {
   ObjetMathalea2D.call(this, { })
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
  const formulaire = []
  for (let i = 0; i < nbCase; i++) formulaire.push(`${i}`)
  this.nbQuestions = 0
  this.besoinFormulaireNumerique = [
    'Type de question', nbCase, formulaire.join('\n')
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
  this.sup = 'all' // Type d'exercice
  this.nouvelleVersion = function (numeroExercice, debug = true) {
    const ddbug = debug
    this.nbQuestions = this.NbQuestions > 0 ? this.nbQuestions : this.sup !== 'all' ? 1 : formulaire.length - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let nquestion = 0
    for (let i = 0, exercice = { texte: '', texteCorr: '' }, cpt = 0; i < this.nbQuestions && cpt < 200;) { // Boucle principale où i+1 correspond au numéro de la question
      nquestion = this.sup === 'all' ? cpt + 1 : this.sup
      if (ddbug) {
        console.log(`
        ********************************
        Exercice ${i + 1} Case ${nquestion}
        ********************************`)
      }
      switch (nquestion) {
        case 1: {
          exercice = traduireProgrammeCalcul(['+', '*'], parse(1), ddbug)
          break
        }
        case 2: {
          exercice = traduireProgrammeCalcul(['*', '+'], parse(1), ddbug)
          break
        }
        case 3: {
          exercice = traduireProgrammeCalcul(['+', '*', '-'], parse(1), ddbug)
          break
        }
        case 4: {
          exercice = traduireProgrammeCalcul(['-', '*', '2*x'], parse(1), ddbug)
          break
        }
        case 5: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', { // Ici le type de l'équation
            a: false, // a est un nombre entier compris entre 1 et 9 (1 et 9 compris)
            b: false, // idem
            c: false,
            d: false, // aleaEquation va choisir au hasard les nombres a, b, c et d
            test: 'a!=c' // mais elle vérfie que a est différent de c (1000 essais autorisés)
          }), ddbug)
          break
        }
        case 6: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', {
            a: false,
            b: true, // Si c'est true alors le nombre pourra être négatif (mais pas nul)
            c: false,
            d: true, // C'est toujours un nombre entier compris entre -9 et 9 cette fois-ci (non nul)
            test: 'a!=c'
          }), ddbug)
          break
        }
        case 7: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', {
            a: true,
            b: true,
            c: false,
            d: true,
            test: 'a!=c'
          }), ddbug)
          break
        }
        case 8: {
          exercice = resoudreEquation(aleaEquation('x/a=b/c', {
            a: false,
            b: true,
            c: false,
            test: 'a!= 1 and abs(b)%c!=0' // Ici on fait en sorte que b/c ne soit pas simplifiable en utilisant le reste
          }), ddbug)
          break
        }
        case 9: {
          exercice = resoudreEquation(aleaEquation('-x/a=b/c', {
            a: false,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), ddbug)
          break
        }
        case 10: {
          exercice = resoudreEquation(aleaEquation('a/x=b/c', {
            a: true,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), ddbug)
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
          }), ddbug)
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
          }), ddbug)
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
          }), ddbug)
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
          }), ddbug)
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
          }), ddbug)
          break
        }
        case 16: {
          exercice = resoudreEquation(aleaEquation('a*x+b*y=c', { // On résous l'équation en x
            a: true, // On aura donc y en fonction de x
            b: true,
            c: true
          }), ddbug)
          break
        }
        case 17: {
          exercice = resoudreEquation(aleaEquation('a*x^2+b=a*x*(x+c)', {
            a: true, // On s'arrange pour qu'on puisse
            b: true, // se ramener à une équation
            c: true // du premier degré
          }), ddbug)
          break
        }
        case 18: {
          exercice = resoudreEquation(aleaEquation('x/a=y', {
            a: false,
            test: 'a!=1'
          }), ddbug)
          break
        }
        case 19: {
          exercice = calculer('a/b+c/d',
            {
              comment: true,
              substeps: true,
              variables: aleaVariables({
                a: false,
                b: 'randomInt(2,100)',
                c: false,
                d: 'randomInt(2,100)',
                test: '(d%b==0 or b%d==0) and gcd(a,b)==1 and gcd(c,d)==1'
              })
            })
          break
        }
        case 20: {
          exercice = calculer(aleaExpression('a*x+b*x', aleaVariables({
            a: 'randomInt(2,100)',
            b: 'randomInt(2,100)'
          })).toString())
          break
        }
        case 21: {
          exercice = calculer(aleaExpression('a*x+b*x-c*x', aleaVariables({
            a: 'randomInt(2,100)',
            b: 'randomInt(2,100)',
            c: 'randomInt(2,100)',
            test: 'a+b>=c'
          })).toString())
          break
        }
        case 22: {
          exercice = calculer(aleaExpression('a/b*x+c/d*x', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: '(d%b==0 or b%d==0) and gcd(a,b)==1 and gcd(c,d)==1'
            // On souhaite que l'une des deux fractions soit simplifiable
          })).toString())
          break
        }
        case 23: {
          exercice = calculer(aleaExpression('a*x^2+b*x+c*x^2', aleaVariables({
            a: 'randomInt(1,20)',
            b: 'randomInt(1,20)',
            c: 'randomInt(1,20)'
          })).toString())
          break
        }
        case 24: {
          const variables = aleaVariables(
            {
              a: 'randomInt(1,15)^2',
              c: 'randomInt(1,15)^2',
              b: '2*sqrt(a)*sqrt(c)'
            }
          )
          exercice = calculer('a*x^2+c*x+b', {
            variables: variables
          })
          break
        }
        case 25: {
          // doublon avec le case 24
          const variables = aleaVariables(
            {
              a: 'randomInt(1,15)^2',
              c: 'randomInt(1,15)^2',
              b: '2*sqrt(a)*sqrt(c)'
            }
          )
          exercice = calculer('a*x^2+c*x+b', {
            variables: variables
          })
          break
        }
        case 26: {
          exercice = calculer(aleaExpression('a*x^2-b', aleaVariables({
            a: 'randomInt(1,15)^2',
            b: 'randomInt(1,15)^2'
          })).toString(), true, ddbug)
          break
        }
        case 27: {
          exercice = ecrireProgrammeCalcul(['-', '*', '2*x'], parse(1), ddbug)
          break
        }
        case 28: {
          exercice = ecrireProgrammeCalcul(['-', '*', '2*x'], parse(1), ddbug)
          break
        }
        case 29: {
          exercice = calculer(aleaExpression('a+c/d', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0'
          })).toString())
          break
        }
        case 30: {
          exercice = calculer(aleaExpression('a-c/d', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0 and a-c/d>0'
          })).toString())
          break
        }
        case 31: {
          exercice = calculer(aleaExpression('a/b-c/d', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'gcd(a,b)==1 and gcd(c,d)==1 and d!=b and (d%b==0 or b%d==0) and a/b-c/d>0'
          })).toString())
          break
        }
        case 32: {
          exercice = resoudreEquation(aleaEquation('a*x+b>c*x+d', { // On résoud maintenant une inéquation
            a: false,
            b: false,
            c: false,
            d: false,
            test: 'a!=c'
          }), ddbug)
          break
        }
        case 33: {
          exercice = resoudreEquation(aleaEquation('a*x^2+b*x+c=0', { // On résoud une équation du second degré
            s: true,
            t: true,
            a: true,
            b: 'a*(-s-t)', // les racines sont des entiers (seuls gérés par mathsteps)
            c: 'a*s*t'
          }, ddbug), ddbug)
          break
        }
        case 34: {
          exercice = traduireProgrammeCalcul(['+', '*'], parse(1), ddbug)
          break
        }
        case 35: {
          exercice = ecrireProgrammeCalcul(['*', '+'], parse(1), ddbug)
          break
        }
        case 36: {
          exercice = traduireProgrammeCalcul(['*', '2*x'], parse(1), ddbug)
          break
        }
        case 37: {
          exercice = traduireProgrammeCalcul(['-', '-2*x'], parse(1), ddbug)
          break
        }
        case 38: {
          exercice = traduireProgrammeCalcul(['-', '/', 'x'], parse(1), ddbug)
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
              }).c, ddbug)
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
              }).c, ddbug)
          break
        }
        case 41: {
          exercice = remonterProgrammeCalcul(
            ['-'],
            aleaVariables(
              {
                a: false
              }).a, ddbug)
          break
        }
        case 42: {
          exercice = remonterProgrammeCalcul(
            ['-', '*'],
            aleaVariables(
              {
                a: false
              }).a, ddbug)
          break
        }
        case 43: {
          exercice = calculer(aleaExpression('(a/b)*(c/d)', aleaVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'gcd(a,b)==1 and gcd(c,d)==1 and d!=b and (d%b==0 or b%d==0) and a/b-c/d>0'
          })).toString({ parenthesis: 'keep' }))
          break
        }
        case 44: {
          exercice = calculer(aleaExpression('a*x+b*x', aleaVariables({
            a: 'round(random(1,10),1)',
            b: 'round(random(-10,10),1)',
            test: 'b!=0 and a+b>0'
          })).toString())
          break
        }
        case 45: {
          exercice = calculer(aleaExpression('a*x*b', aleaVariables({
            a: false,
            b: false,
            test: 'a>1 and b>1'
          })).toString())
          break
        }
        case 46: {
          exercice = calculer(aleaExpression('a*x*b+c*x', aleaVariables({
            a: false,
            b: false,
            c: true,
            test: 'b>1 and a>1 and a*b+c>0'
          })).toString())
          break
        }
        case 47: {
          exercice = calculer(aleaExpression('a*x*b+c*x', aleaVariables({
            a: false,
            b: false,
            c: true,
            test: 'b>1 and a>1 and a*b+c>0'
          })).toString())
          break
        }
        case 48: {
          exercice = calculer(aleaExpression('x*a*x*b', aleaVariables({
            a: false,
            b: false,
            test: 'b>1 and a>1'
          })).toString())
          break
        }
        case 49: {
          exercice = calculer(aleaExpression('x*a*x+b*x^2', aleaVariables({
            a: false,
            b: true,
            test: 'a>1 and a+b>0'
          })).toString())
          break
        }
        case 50: {
          exercice = calculer(aleaExpression('a*x*b*x*c*x+d*x^2', aleaVariables({
            a: false,
            b: false,
            c: false,
            d: true,
            test: 'a>1 and b>1 and c>1'
          })).toString())
          break
        }
        case 51: {
          exercice = traduireProgrammeCalcul(['+', '/', '-x^2'], parse(1), ddbug)
          break
        }
        case 52: {
          exercice = traduireProgrammeCalcul(['*', '-x', '/'], parse(1), ddbug)
          break
        }
        case 53: {
          exercice = traduireProgrammeCalcul(['/', '-x', '*'], parse(1), ddbug)
          break
        }
        case 54: {
          exercice = appliquerProgrammeCalcul(['+', '*', '-'], aleaVariables(
            {
              a: true
            }).a, ddbug)
          break
        }
        case 55: {
          exercice = remonterProgrammeCalcul(['*', '-', '/'], aleaVariables(
            {
              a: true
            }).a, ddbug)
          break
        }
        case 56: {
          exercice = remonterProgrammeCalcul(['+', '*', '-'], aleaVariables(
            {
              a: true
            }).a, ddbug)
          break
        }
        case 57: {
          exercice = calculer(aleaExpression('a/b+c/d',
            aleaVariables({
              a: true,
              b: 'randomInt(2,100)',
              c: true,
              d: 'randomInt(2,100)',
              test: '(d%b==0 or b%d==0) and gcd(abs(a),b)==1 and gcd(abs(c),d)==1'
            })).toString())
          break
        }
        case 58: {
          exercice = calculer(aleaExpression('a+c/d', aleaVariables({
            a: true,
            b: 'randomInt(2,100)',
            c: true,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0'
          })).toString())
          break
        }
        case 59: {
          exercice = calculer(aleaExpression('a*x+b*x', aleaVariables({
            a: 'round(random(-10,10),1)',
            b: 'round(random(-10,10),1)',
            test: 'b!=0 and a!=0'
          })).toString())
          break
        }
        case 60: {
          exercice = calculer(aleaExpression('a*x*b', aleaVariables({
            a: true,
            b: true,
            test: 'a!= 1 and abs(b)!=1'
          })).toString())
          break
        }
        case 61: {
          exercice = calculer(aleaExpression('a*x*b+c*x', aleaVariables({
            a: true,
            b: true,
            c: true,
            test: 'a!= 1 and b!=1'
          })).toString())
          break
        }
        case 62: {
          exercice = calculer(aleaExpression('x*a*x*b', aleaVariables({
            a: true,
            b: true,
            test: 'a!=1 and b!=1'
          })).toString())
          break
        }
        case 63: {
          exercice = calculer(aleaExpression('x*a*x+b*x^2', aleaVariables({
            a: true,
            b: true,
            test: 'a!=1 and b!=1'
          })).toString())
          break
        }
        case 64: {
          exercice = calculer(aleaExpression('a*x*b*x*c*x+d*x^2', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: true,
            test: 'a!= 1 and b!=1 and c!=1'
          })).toString())
          break
        }
        case 65: {
          exercice = schemaBarre()
          break
        }
        case 66: {
          exercice = calculer(aleaExpression('a/e*x*b/f*x*c*x+d*x^2', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: true,
            e: 'randomInt(1,10)',
            f: 'randomInt(1,10)',
            test: 'a!= 1 and b!=1 and c!=1'
          })).toString())
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
              }).c, ddbug)
          break
        }
        case 68: {
          exercice = remonterProgrammeCalcul(['+', '/'], aleaVariables(
            {
              a: true,
              b: false,
              c: 'fraction(a,b)',
              test: 'a%b!=0'
            }).c, ddbug)
          break
        }
        case 69: {
          exercice = calculExpression2(expressionLitterale('(a*x+b)^2+(c*x+d)*(e*x+f)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: true,
            e: true,
            f: true
          })).toString())
          break
        }
        case 70: {
          exercice = calculExpression2(expressionLitterale('(a*x+b)^2+(c*x+d)*(c*x-d)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false
          })).toString())
          break
        }
        case 71: {
          exercice = calculExpression2(expressionLitterale('(8*x-6)^2+(-9*x-2)*(7*x+2)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false
          })).toString())
          break
        }
        case 72: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c', { // On résoud une équation du second degré
            a: true,
            b: true,
            c: true
          }, ddbug), ddbug)
          break
        }
        case 73: {
          exercice = resoudreEquation(aleaEquation('x/a+b=c', { // On résoud une équation du second degré
            a: true,
            b: true,
            c: true
          }, ddbug), ddbug)
          break
        }
        case 74: {
          exercice = resoudreEquation(aleaEquation('c=a*x+b', { // On résoud une équation du second degré
            a: true,
            b: true,
            c: true
          }, ddbug), ddbug)
          break
        }
        case 75: {
          exercice = resoudreEquation(aleaEquation('a*(x+b)=c', { // On résoud une équation du second degré
            a: 'randomInt(2,10)',
            b: true,
            c: true
          }, ddbug), ddbug)
          break
        }
        case 76: {
          exercice = resoudreEquation(aleaEquation('a*(x+b)+d*x=c', { // On résoud une équation du second degré
            a: 'randomInt(2,10)',
            b: true,
            c: true,
            d: false,
            test: 'a+d!=0'
          }, ddbug), ddbug)
          break
        }
        case 77: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', { // On résoud une équation du second degré
            a: true,
            b: true,
            c: true,
            d: true,
            test: 'a!=c'
          }, ddbug), ddbug)
          break
        }
        case 78: {
          exercice = calculer(aleaExpression('a*(b*x+c)+d*x', aleaVariables({
            a: false,
            b: true,
            c: true,
            d: true,
            test: 'a> 1'
          })).toString())
          break
        }
        case 79: {
          exercice = calculer(aleaExpression('(a/b)*(a/b)+c/d*(e/f)',
            aleaVariables({
              a: true,
              b: 'randomInt(2,100)',
              c: true,
              d: 'randomInt(2,100)',
              e: true,
              f: false,
              test: '(d%b==0 or b%d==0) and gcd(abs(a),b)==1 and gcd(abs(c),d)==1'
            })).toString())
          break
        }
        case 80: {
          exercice = calculer(aleaExpression('9*(-2*x)',
            aleaVariables({
              a: true,
              b: 'randomInt(2,100)',
              c: true,
              d: 'randomInt(2,100)',
              e: true,
              f: false,
              test: '(d%b==0 or b%d==0) and gcd(abs(a),b)==1 and gcd(abs(c),d)==1'
            })).toString())
          break
        }
        case 81: {
          exercice = calculer(aleaExpression('(-8/71)*(-8/71)',
            aleaVariables({
              a: true,
              b: 'randomInt(2,100)',
              c: true,
              d: 'randomInt(2,100)',
              e: true,
              f: false,
              test: '(d%b==0 or b%d==0) and gcd(abs(a),b)==1 and gcd(abs(c),d)==1'
            })).toString())
          break
        }
        case 82: {
          exercice = resoudreEquation(aleaEquation('(-2*x+8)/8=7/2', {
            a: true,
            b: true,
            c: false,
            d: true,
            e: false,
            test: 'c>1 and a%c!=0 and abs(d)%e!=0'
          }), ddbug)
          break
        }
        case 83: {
          exercice = resoudreEquation(aleaEquation('-2*x^2-14*x-24=0', { // On résoud une équation du second degré
            s: true,
            t: true,
            a: true,
            b: 'a*(-s-t)', // les racines sont des entiers (seuls gérés par mathsteps)
            c: 'a*s*t'
          }, ddbug), ddbug)
          break
        }
        case 84: {
          exercice = resoudreEquation(aleaEquation('-x/9=-2/3', {
            a: false,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), ddbug)
          break
        }
        case 85: {
          exercice = calculer(aleaExpression('(-2/3)*(-2/3)-4*(-2/3)*(-2/3)',
            aleaVariables({
              a: true,
              b: 'randomInt(2,100)',
              c: true,
              d: 'randomInt(2,100)',
              e: true,
              f: false,
              test: '(d%b==0 or b%d==0) and gcd(abs(a),b)==1 and gcd(abs(c),d)==1'
            })).toString())
          break
        }
        case 86: {
          exercice = calculer(aleaExpression('(8*x-6)^2+(-9*x-2)*(7*x+2)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false
          })).toString())
          break
        }
        case 87: {
          exercice = calculer(aleaExpression('(-3)^2', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false
          })).toString())
          break
        }
        case 88: {
          exercice = calculer(aleaExpression('a/d*(b/e)*(c/f)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false,
            e: false,
            f: false,
            test: 'd>1 and e>1 and f>1'
          })).toString())
          break
        }
        case 89: {
          exercice = calculer('a/d+8+x+b/e*e-7+(x-3)^2/6', {
            variables: aleaVariables({
              a: true,
              b: true,
              c: true,
              d: false,
              e: false,
              f: false,
              test: 'd>1 and e>1 and f>1'
            }),
            valueOf: true
          })
          break
        }
        case 90: {
          exercice = calculer(expressionLitterale('nthRoot(4)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false,
            e: false,
            f: false,
            test: 'd>1 and e>1 and f>1'
          })).toString())
          break
        }
        case 91: {
          exercice = calculer(expressionLitterale('nthRoot(24)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false,
            e: false,
            f: false,
            test: 'd>1 and e>1 and f>1'
          })).toString())
          break
        }
        case 92: {
          exercice = resoudreEquation(aleaEquation('5^2=AB^2+3^2', {
            a: false,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), ddbug)
          break
        }
        case 93: {
          exercice = resoudreEquation(aleaEquation('AB^2-3^2=0', {
            a: false,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), ddbug)
          break
        }
        case 94: {
          exercice = resoudreEquation(aleaEquation('AB^2-3=0', {
            a: false,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), ddbug)
          break
        }
        case 95: {
          exercice = calculer(expressionLitterale('nthRoot(24)', aleaVariables({
            a: true,
            b: true,
            c: true,
            d: false,
            e: false,
            f: false,
            test: 'd>1 and e>1 and f>1'
          })).toString())
          break
        }
        case 96: {
          exercice = calculer('(2*x-3)^2')
          break
        }
        case 97: {
          exercice = calculer('(2*x-3*x)^2')
          break
        }
        case 98: {
          exercice = calculer('a/d+(b/e)', {
            substeps: true,
            variables: aleaVariables({
              a: 'pickRandom([-1,1])*randomInt(1,20)',
              b: 'pickRandom([-1,1])*randomInt(1,20)',
              // c: true,
              d: 'randomInt(1,20)',
              e: 'randomInt(1,20)',
              // f: false,
              test: 'd!=e and d>1 and e>1 and a%d!=0 and b%e!=0 and gcd(abs(a),d)==1 and gcd(abs(b),e)==1 and (d%e==0 or e%d==0)'
            })
          })
          exercice.texte = `Calculer $${exercice.printExpression}$`
          break
        }
        case 99: {
          exercice = calculer('a/d+(b/e)', {
            substeps: true,
            variables: aleaVariables({
              a: 'pickRandom([-1,1])*randomInt(1,10)',
              b: 'pickRandom([-1,1])*randomInt(1,10)',
              // c: true,
              d: 'randomInt(1,10)',
              e: 'randomInt(1,10)',
              // f: false,
              test: 'gcd(d,e)==1 and d>1 and e>1 and a%d!=0 and b%e!=0 and gcd(abs(a),d)==1 and gcd(abs(b),e)==1'
            })
          })
          exercice.texte = `Calculer $${exercice.printExpression}$`
          break
        }
        case 100: {
          exercice = calculer('a+(b/e)', {
            substeps: true,
            variables: aleaVariables({
              a: 'pickRandom([-1,1])*randomInt(1,20)',
              b: 'pickRandom([-1,1])*randomInt(1,20)',
              // c: true,
              // d: 'randomInt(1,10)',
              e: 'randomInt(1,10)',
              // f: false,
              test: 'e>1 and gcd(abs(b),e)==1 and abs(b)>e'
            })
          })
          exercice.texte = `Calculer $${exercice.printExpression}$`
          break
        }
        case 101: {
          exercice = calculer('(8*x-6)^2', { substeps: true })
          exercice.texte = `Calculer $${exercice.printExpression}$`
          break
        }
        case 102: {
          exercice = calculer('(6*x-7)^2', { comment: true, substeps: false }, ddbug)
          break
        }
        case 103: {
          exercice = {}
          const expr = '5+1*4+1*x-1*(x^2+1*3^2+0)+0*4+0*y+(-5)*(-6)+4/1+4/5+4/(-1)+4/(-5)'
          exercice.texte = `
          $${toTex(expr, { suppr0: false, suppr1: false })}$
          <br>
          $${toTex(expr, { suppr0: true, suppr1: true })}$
          `
          exercice.texteCorr = ''
          break
        }
        case 104: {
          exercice = {}
          const expr = '5+1*4+1*x-1*(x^2+1*3^2+0)+0*4+0*y+(-5)*(-6)+4/1+4/5+4/(-1)+4/(-5)'
          exercice.texte = `
          $${toTex(expr, { suppr0: false, suppr1: false })}$
          <br>
          $${toTex(expr, { suppr0: true, suppr1: true })}$
          `
          exercice.texteCorr = ''
          break
        }
        case 105: {
          const variables = aleaVariables(
            {
              a: true,
              b: true,
              c: true,
              d: false,
              e: false,
              f: false,
              test: 'abs(a)!=d and abs(b)!=e and abs(c)!=f and abs(a)<6 and abs(b)<6 and abs(c)<6 and 1<=d<6 and 1<=e<6 and 1<=f<6 and gcd(abs(a),d)==1 and gcd(abs(b),e)==1 and gcd(abs(c),f)==1'
            }, { valueOf: true }
          )
          const disc = aleaVariables(Object.assign(variables, { disc: '(b/e)^2-4*(a/d)*(c/f)' }), { valueOf: false }).disc
          const polynomeTex = toTex(simplify('a/d*x^2+b/e*x+c/f', [], variables), { suppr1: true })
          const discriminantTex = toTex(simplify('(b/e)^2-4*(a/d)*(c/f)', [], variables), { suppr1: true })
          const stepscalculsDiscriminant = calculer('(b/e)^2-4*(a/d)*c/f', { comments: false, mixed: false, variables: variables }).texteCorr
          exercice = {}
          exercice.texteCorr = `$\\Delta = b^2-4ac=${discriminantTex}=${toTex(disc.toFraction())}$
          <br>
          ${stepscalculsDiscriminant}`
          exercice.texte = `Le discriminant de $${polynomeTex}$ est : `
          break
        }
        case 106: {
          const variables = aleaVariables(
            {
              a: true,
              b: true,
              c: true,
              d: false,
              e: false,
              f: false,
              test: 'abs(a)!=d and abs(b)!=e and abs(c)!=f and abs(a)<6 and abs(b)<6 and abs(c)<6 and 1<=d<6 and 1<=e<6 and 1<=f<6 and gcd(abs(a),d)==1 and gcd(abs(b),e)==1 and gcd(abs(c),f)==1'
            }, { valueOf: true }
          )
          const disc = aleaVariables(Object.assign(variables, { disc: '(b/e)^2-4*(a/d)*(c/f)' }), { valueOf: false }).disc
          const polynomeTex = toTex(simplify('a/d*x^2+b/e*x+c/f', [], variables), { suppr1: true })
          const discriminantTex = toTex(simplify('(b/e)^2-4*(a/d)*(c/f)', [], variables), { suppr1: true })
          const stepscalculsDiscriminant = calculer('(b/e)^2-4*(a/d)*c/f', { comments: false, mixed: false, variables: variables }).texteCorr
          exercice = {}
          exercice.texteCorr = `$\\Delta = b^2-4ac=${discriminantTex}=${toTex(disc.toFraction())}$
          <br>
          Calcul détaillé :
          <br>
          ${stepscalculsDiscriminant}`
          exercice.texte = `Le discriminant de $${polynomeTex}$ est : `
          break
        }
        case 107: {
          exercice = calculer('(5*x-3)^2', { name: 'A' })
          exercice.texte = `Développer puis réduire l'expression suivante : $${exercice.name}=${exercice.printExpression}$`
          exercice.texteCorr = this.correctionDetaillee ? exercice.texteCorr : `$${exercice.name}=${exercice.printResult}$`
          break
        }
        case 108: {
          exercice = {}
          exercice.texte = `$${toTex('(4+(-6)*x)/(-8)=1*x+(-7)/3', { supprPlusMoins: false })}$`
          exercice.texteCorr = ''
          break
        }
        case 109: {
          exercice = calculer('9/2*(4/3+7/8)', { substeps: true })
          exercice.texte = `Calculer : $${exercice.printExpression}$`
          exercice.texteCorr = this.correctionDetaillee ? exercice.texteCorr : `$${exercice.printExpression}=${exercice.printResult}$`
          break
        }
        case 110: {
          const commentairesPersonnalises = {
            CANCEL_MINUSES: 'Simplifier l\'écriture',
            SUBTRACT_FROM_BOTH_SIDES: 'Enlever {stepChange} à chaque membre.',
            SIMPLIFY_ARITHMETIC: '',
            SIMPLIFY_RIGHT_SIDE: 'Réduire.',
            SIMPLIFY_LEFT_SIDE: 'Réduire.'
          }
          exercice = resoudre('3*x+2=9*x-3', { comment: true, comments: commentairesPersonnalises })
          exercice.texte = `Résoudre l'équation $${exercice.equation}$ en détaillant les étapes.`
          exercice.texteCorr += `
          <br>
          La solution de cette équation est donc $${exercice.solution.print}$.
          `
          break
        }
        case 111: {
          exercice = resoudre('9*x+2<3*x-3')
          exercice.texte = `Résoudre l'inéquation $${exercice.equation}$ en détaillant les étapes.`
          exercice.texteCorr += `
          <br>
          Les solutions de cette inéquation sont donc tous les nombres $x$ vérifiant $${exercice.solution.print}$.
          `
          break
        }
        case 112: {
          exercice = calculer('x*x*x')
          exercice.texte = `Calculer : $${exercice.printExpression}$`
          exercice.texteCorr = this.correctionDetaillee ? exercice.texteCorr : `$${exercice.printExpression}=${exercice.printResult}$`
          break
        }
        case 113: {
          exercice = resoudre('9*x+7=6*x-3', { color: 'black', comment: true })
          exercice.texte = `Résoudre : $${exercice.equation}$`
          exercice.texteCorr = this.correctionDetaillee ? exercice.texteCorr : `La solution est $${exercice.solution.print}$`
          break
        }
        case 114: {
          exercice = resoudre('9*x+7=6*x-3', { color: 'black', comment: true })
          exercice.texte = `Résoudre : $${exercice.equation}$`
          exercice.texteCorr = `<br>
          ${exercice.texteCorr}<br>
          La solution est $${exercice.solution.print}$.
          <br>
          Vérification :
          <br>
          D'une part : $${exercice.verifLeftSide.printExpression}=${exercice.verifLeftSide.printResult}$
          <br>
          D'autre part : $${exercice.verifRightSide.printExpression}=${exercice.verifRightSide.printResult}$
          `
          break
        }
        case 115: {
          const variables = aleaVariables(
            {
              a: true,
              b: true,
              c: 'randomInt(0,10)'
            }
          )
          exercice = {}
          exercice.texte = `$${toTex(`${variables.a}+(${variables.b})+${variables.c}`, { supprPlusMoins: false })}$`
          exercice.texteCorr = ''
          break
        }
        case 116: {
          exercice = calculer('(-4)+(-3)+7', { supprPlusMoins: false })
          break
        }
        case 117: {
          const variables =
            {
              a: true,
              b: true
            }
          exercice = resoudre('9*x+a=6*x+b', { variables: variables, color: 'blue', comment: true })
          exercice.texte = `Résoudre : $${exercice.equation}$`
          exercice.texteCorr = `
          <br>
          ${exercice.texteCorr}
          <br>
          La solution est $${exercice.solution.print}$.
          <br>
          Vérification :
          <br>
          D'une part : $${exercice.verifLeftSide.printExpression}=${exercice.verifLeftSide.printResult}$
          <br>
          D'autre part : $${exercice.verifRightSide.printExpression}=${exercice.verifRightSide.printResult}$
          `
          break
        }
        case 118 : {
          const comments = {
            MULTIPLY_FRACTIONS: 'Multiplier numérateurs et dénominateurs entre eux.'
          }
          exercice = calculer('5/2*(7/3+6/8)', { substeps: true, comment: true, comments: comments })
          exercice.texte = `Calculer : $${exercice.printExpression}$`
          exercice.texteCorr = this.correctionDetaillee ? '<br>' + exercice.texteCorr : `$${exercice.printExpression}=${exercice.printResult}$`
          break
        }
        case 119 : {
          exercice = resoudre('10*x+5=1')
          exercice.texte = `
          <br>
          Résoudre : $${exercice.equation}$`
          exercice.texteCorr = this.correctionDetaillee ? '<br>' + exercice.texteCorr : `$${exercice.printExpression}=${exercice.printResult}$`
          exercice.texteCorr += `La solution est $${exercice.solution.printDecimal}$`
          break
        }
        case 120: {
          const variables = aleaVariables({
            n: 'pickRandom([randomInt(2,9), randomInt(11, 99), randomInt(101, 999)])',
            d: 'pickRandom([randomInt(2,9), randomInt(11, 99), randomInt(101, 999)])',
            p: 'randomInt(0,7)',
            nb: 'n+d/pickRandom([10,100,1000])',
            s: 'nb*10^(-p)'
          }, { valueOf: true, format: true })
          exercice = {}
          exercice.texte = `$${variables.nb} \\times 10^{-${variables.p}}$`
          exercice.texteCorr = exercice.texte
          exercice.texteCorr += `$=${variables.s}$`
          exercice.texte = exercice.texteCorr
          break
        }
        case 121: {
          const variables = aleaVariables({
            n: 'cos(pi/3)',
            p: Algebrite.run('cos(pi/3)')
          }, { valueOf: false })
          exercice = {}
          exercice.texte = `$${variables.n}+${variables.p}$`
          exercice.texteCorr = exercice.texte
          break
        }
        case 122: {
          const variables = aleaVariables(
            {
              a: 'randomInt(1,10)',
              test: 'a!=7'
            }
            , { valueOf: true })
          exercice = resoudre('a*(x+6)-7=7*x-3', { variables: variables })
          break
        }
        case 123: {
          exercice = resoudre('2/x=3')
          break
        }
        case 124: {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=124,n=1,cd=1&serie=uAXn&z=1&v=ex
          const questions = []
          questions.push(calculer(aleaName(['(a)', '(b)']).join('+'), { // 1
            variables: {
              a: 'round(random(-10,-1),0)',
              b: 'round(random(1,10),0)'
            },
            supprPlusMoins: false,
            substeps: true
          }))
          questions.push(calculer(aleaName(['(a)', '(b)']).join('+'), { // 2
            variables: {
              a: 'round(random(-10,-1),0)',
              b: 'round(random(-10,-1),0)'
            },
            supprPlusMoins: false,
            substeps: true
          }))
          questions.push(calculer(aleaName(['(a)', '(b)']).join('+'), { // 3
            variables: {
              a: 'round(random(-10,10),1)',
              b: 'round(random(-10,10),1)',
              test: 'a*b<0 or (a<0 and b<0)'
            },
            supprPlusMoins: false,
            substeps: true
          }))
          questions.push(calculer(aleaName(['(a)', '(b)']).join('+'), { // 4
            variables: {
              a: 'round(random(-10,10),1)',
              b: 'round(random(-10,10),1)',
              test: 'a*b<0 or (a<0 and b<0)'
            },
            supprPlusMoins: false,
            substeps: true
          }))
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 125 : {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=125
          // TODO : Bug de mathsteps pour calculer('-3/7-(-4/8)')
          const questions = []
          questions.push(calculer('-3/7-(-4/8)'))
          questions.push(calculer('-3/7-(0-4/8)'), { suppr0: true })
          questions.push(calculer('-3/7--4/8', { substeps: true }))
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 126 : {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=126
          // TODO : Corriger parenthèses de toTex() pour calculer('-3/7--4/8')
          const questions = []
          questions.push(calculer('-3/7--4/8', { substeps: true }))
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 127 : {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=127
          // TODO : Bug de mathsteps pour calculer('2/3-(-4/8)')
          const questions = []
          questions.push(calculer('2/3-(-4/8)'), { suppr0: true })
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 128 : {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=127
          // TODO : Bug de mathsteps pour calculer('2/3-(-4/8)')
          const questions = []
          questions.push(calculer('2/3-(-4/8)'), { suppr0: true })
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 129: {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=124,n=1,cd=1&serie=uAXn&z=1&v=ex
          const questions = []
          questions.push(calculer(aleaName(['(a)', '(b)']).join('-'), { // 6
            variables: {
              a: 'round(random(-10,-1),0)',
              b: 'round(random(-10,10),0)',
              test: 'b!=0'
            },
            supprPlusMoins: false,
            substeps: true
          }))
          questions.push(calculer(aleaName(['(a)', '(b)']).join('-'), { // 7
            variables: {
              a: 'round(random(-10,-0.1),1)',
              b: 'round(random(0.1,10),1)'
            },
            supprPlusMoins: false,
            substeps: true
          }))
          questions.push(calculer(aleaName(['(a)', '(b)']).join('-'), { // 8
            variables: {
              a: 'round(random(-10,-0.1),1)',
              b: 'round(random(-10,10),1)',
              test: 'a*b<0 or (a<0 and b<0)'
            },
            supprPlusMoins: false,
            substeps: true
          }))
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 130: {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=130,n=1,cd=1&serie=uAXn&z=1&v=ex
          const questions = []
          let calcul, variables, expression, intro
          const terms = []
          const lettres = ['A', 'B']
          // Calcul astucieux
          calcul = []
          variables = aleaVariables({
            a: 'round(random(1,10),1)', // a>0
            b: 'round(random(-10,10),1)', // b != 0
            c: 'round(random(-10,-1),1)', // c<0
            d: '-b',
            e: '-c',
            test: 'b!=0 and b!=a and b!=c'
          })
          expression = aleaExpression(aleaName(['(a)', '(b)', '(c)', '(d)', '(e)']).join('+'), variables)
          calcul.push(expression)
          calcul.push(aleaExpression(['(a)', '(b)', '(d)', '(c)', '(e)'].join('+'), variables))
          calcul.push(evaluate(expression).toFixed(1))
          intro = 'On peut regrouper les termes opposés pour faciliter les calculs.<br>'
          questions.push({
            texte: `Calculer $${toTex(lettres[0] + '=' + expression, { supprPlusMoins: false })}$`,
            texteCorr: intro + calcul.map((x, i) => `$${toTex(lettres[0] + '=' + x, { supprPlusMoins: false })}$`).join('<br>')
          })
          // Regrouper les nombres de même signe
          calcul = []
          variables = aleaVariables({
            a: 'round(random(1,10),1)', // a>0
            b: 'round(random(-10,-1),1)', // b<0
            c: 'round(random(-10,10),1)',
            d: 'round(random(-10,10),1)',
            e: 'round(random(-10,10),1)'
          })
          expression = aleaExpression(aleaName(['(a)', '(b)', '(c)', '(d)', '(e)']).join('+'), variables)
          calcul.push(expression)
          let newNode = parse(expression)
          newNode = newNode.transform((node, path, parent) => {
            if (node.isParenthesisNode) terms.push(node)
            return node
          })
          terms.sort((a, b) => compare(b.content.toString(), a.content.toString()))
          calcul.push(terms.map(x => x.toString()).join('+'))
          let positive = evaluate(terms.filter(x => x.content.toString() > 0).map(x => x.toString()).join('+')).toFixed(1)
          let negative = terms.filter(x => x.content.toString() < 0).map(x => x.toString()).join('+')
          calcul.push(positive + '+' + negative)
          positive = evaluate(terms.filter(x => x.content.toString() > 0).map(x => x.toString()).join('+')).toFixed(1)
          negative = `(${evaluate(terms.filter(x => x.content.toString() < 0).map(x => x.toString()).join('+')).toFixed(1)})`
          calcul.push(positive + '+' + negative)
          calcul.push(evaluate(expression).toFixed(1))
          intro = 'On peut additionner les termes positifs entre eux puis les termes négatifs entre eux puis terminer le calcul.<br>'
          questions.push({
            texte: `Calculer $${toTex(lettres[1] + '=' + expression, { supprPlusMoins: false })}$`,
            texteCorr: intro + calcul.map((x, i) => `$${toTex(lettres[1] + '=' + x, { supprPlusMoins: false })}$`).join('<br>')
          })
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 131: {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=131,n=1,cd=1&serie=uAXn&z=1&v=ex
          const questions = []
          let calcul, variables, expression, expression1, intro, terms
          const lettres = ['A', 'B']
          // Calcul astucieux
          calcul = []
          terms = []
          variables = aleaVariables({
            a: 'round(random(-10,10),0)',
            b: 'round(random(-10,10),0)',
            c: 'round(random(1,10),0)', // c>0
            d: 'round(random(-10,10),0)',
            e: 'round(random(1,10),0)', // e<0
            test: 'a!=0'
          })
          expression1 = aleaExpression('(a)+(b)-(c)+(d)-(-e)', variables)
          calcul.push(expression1)
          expression = aleaExpression('(a)+(b)+(-c)+(d)+(e)', variables)
          calcul.push(expression)
          let newNode = parse(expression)
          newNode = newNode.transform((node, path, parent) => {
            if (node.isParenthesisNode) terms.push(node)
            return node
          })
          terms.sort((a, b) => compare(b.content.toString(), a.content.toString()))
          calcul.push(terms.map(x => x.toString()).join('+'))
          let positive = evaluate(terms.filter(x => x.content.toString() > 0).map(x => x.toString()).join('+')).toFixed(1)
          let negative = terms.filter(x => x.content.toString() < 0).map(x => x.toString()).join('+')
          calcul.push(positive + '+' + negative)
          positive = evaluate(terms.filter(x => x.content.toString() > 0).map(x => x.toString()).join('+')).toFixed(1)
          negative = `(${evaluate(terms.filter(x => x.content.toString() < 0).map(x => x.toString()).join('+')).toFixed(1)})`
          calcul.push(positive + '+' + negative)
          calcul.push(evaluate(expression).toFixed(1))
          intro = 'On peut transfomer toutes les soustractions en additions.<br>'
          questions.push({
            texte: `Calculer $${toTex(lettres[0] + '=' + expression1, { supprPlusMoins: false })}$`,
            texteCorr: intro + calcul.map((x, i) => `$${toTex(lettres[0] + '=' + x, { supprPlusMoins: false })}$`).join('<br>')
          })
          // Deuxième calcul
          // Calcul astucieux
          calcul = []
          terms = []
          variables = aleaVariables({
            a: 'round(random(-10,10),0)',
            b: 'round(random(-10,10),0)',
            c: 'round(random(1,10),0)', // c>0
            d: 'round(random(-10,10),0)',
            e: 'round(random(1,10),0)', // e<0
            test: 'a!=0'
          })
          expression1 = aleaExpression('(a)-(-e)+(b)-(c)+(d)', variables)
          calcul.push(expression1)
          expression = aleaExpression('(a)+(e)+(b)+(-c)+(d)', variables)
          calcul.push(expression)
          newNode = parse(expression)
          newNode = newNode.transform((node, path, parent) => {
            if (node.isParenthesisNode) terms.push(node)
            return node
          })
          terms.sort((a, b) => compare(b.content.toString(), a.content.toString()))
          calcul.push(terms.map(x => x.toString()).join('+'))
          positive = evaluate(terms.filter(x => x.content.toString() > 0).map(x => x.toString()).join('+')).toFixed(1)
          negative = terms.filter(x => x.content.toString() < 0).map(x => x.toString()).join('+')
          calcul.push(positive + '+' + negative)
          positive = evaluate(terms.filter(x => x.content.toString() > 0).map(x => x.toString()).join('+')).toFixed(1)
          negative = `(${evaluate(terms.filter(x => x.content.toString() < 0).map(x => x.toString()).join('+')).toFixed(1)})`
          calcul.push(positive + '+' + negative)
          calcul.push(evaluate(expression).toFixed(1))
          intro = 'On peut transfomer toutes les soustractions en additions.<br>'
          questions.push({
            texte: `Calculer $${toTex(lettres[0] + '=' + expression1, { supprPlusMoins: false })}$`,
            texteCorr: intro + calcul.map((x, i) => `$${toTex(lettres[0] + '=' + x, { supprPlusMoins: false })}$`).join('<br>')
          })
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 132: {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=132,n=1,cd=1&serie=uAXn&z=1&v=ex
          let questions = []
          let calcul, expression, solution
          const variables = []
          // Calcul astucieux
          variables.push(aleaVariables({
            a: 'round(random(1,10),0)', // a>0
            b: 'round(random(-10,-1),0)', // b<0
            c: 'a+b',
            test: 'a!=0 and b!=0 and c>0'
          }))
          variables.push(aleaVariables({
            a: 'round(random(-10,-1),0)', // a<0
            b: 'round(random(1,10),0)', // b>0
            c: 'a+b',
            test: 'a!=0 and b!=0 and c<0'
          }))
          variables.push(aleaVariables({
            a: 'round(random(-10,-1),0)', // a<0
            b: 'round(random(-10,-1),0)', // b<0
            c: 'a+b',
            test: 'a!=0 and b!=0 and c<0'
          }))
          variables.push(aleaVariables({
            a: 'round(random(-10,10),0)',
            b: '-a',
            c: 'a+b',
            test: 'a!=0 and b!=0'
          }))
          for (let i = 0; i < variables.length; i++) {
            calcul = []
            expression = aleaExpression('(a)+(ldots)', variables[i]) + '=' + aleaExpression('c', variables[i])
            solution = aleaExpression('(a)+(b)', variables[i]) + '=' + aleaExpression('c', variables[i])
            calcul.push(solution)
            questions.push({
              texte: `Compléter $${toTex(expression, { supprPlusMoins: false })}$`.replace('ldots', '\\ldots'),
              texteCorr: calcul.map(x => `$${toTex(x, { supprPlusMoins: false })}$`).join('<br>')
            })
          }
          questions = aleaName(questions)
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 133: {
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=133,n=1,cd=1&serie=uAXn&z=1&v=ex
          const questions = []
          let calcul = {}
          let variable
          // Calcul astucieux
          variable = aleaVariables({
            a: 'round(random(-10,-1),0)', // a<0
            b: 'round(random(1,10),0)', // b>0
            c: 'a-b'
          })
          calcul.texte = 'Calculer ' + `$${toTex(aleaExpression('(a)-b', variable))}$`
          calcul.texteCorr = 'Soustraire un nombre revient à ajouter son opposé.<br>' + `$${toTex(aleaExpression('(a)-b', variable) + '=' + aleaExpression('(a)+(-b)', variable), { supprPlusMoins: false })}$<br>` + `$${toTex(aleaExpression('(a)-b', variable) + '=' + aleaExpression('c', variable), { supprPlusMoins: false })}$`
          questions.push(calcul)
          // Calcul 2
          variable = aleaVariables({
            a: 'round(random(-10,10),0)', // a!=0
            b: 'round(random(1,10),0)', // b>0
            test: 'a!= 0 and a<b'
          })
          calcul = calculer('(a)-b', { // 1
            variables: variable,
            supprPlusMoins: false,
            substeps: true
          })
          calcul.texteCorr = 'Soustraire un nombre revient à ajouter son opposé.<br>' + `$${toTex(aleaExpression('(a)-b', variable) + '=' + aleaExpression('(a)+(-b)', variable), { supprPlusMoins: false })}$<br>` + calcul.texteCorr
          questions.push(calcul)
          // Calcul 3
          variable = aleaVariables({
            a: 'round(random(-10,10),0)', // a!=0
            b: 'round(random(-10,-1),0)', // b<0
            test: 'a!= 0 and a<b'
          })
          calcul = calculer('(a)-(b)', { // 1
            variables: variable,
            supprPlusMoins: false,
            substeps: true
          })
          // calcul.texteCorr = 'Soustraire un nombre revient à ajouter son opposé.<br>' + `$${toTex(aleaExpression('(a)-(b)', variable) + '=' + aleaExpression('(a)+(b)', Object.assign(variable, { b: -variable.b })), { supprPlusMoins: false })}$<br>` + calcul.texteCorr
          questions.push(calcul)
          // questions = aleaName(questions)
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          exercice.texte = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ ' + x.texte).join('<br>')
          exercice.texteCorr = questions.map((x, i) => '$\\textbf{' + (i + 1) + '.}$ <br>' + x.texteCorr).join('<br>')
          break
        }
        case 134: {
          // Produits en croix
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=134,n=1,cd=1&serie=uAXn&z=1&v=ex
          const variables = {
            a: 'randomInt(2,10)',
            b: 'randomInt(2,10)',
            c: 'randomInt(2,10)',
            test: 'gcd(a,b)==1 and a!=c'
          }
          exercice = resoudre(aleaName(['a/b', 'c/x']).join('='), { variables: variables, produitsencroix: true, comment: true, verifications: true })
          break
        }
        case 135: {
          // Produits en croix
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=135,n=1,cd=1&serie=uAXn&z=1&v=ex
          const variables = {
            a: 'randomInt(2,10)',
            b: 'randomInt(2,10)',
            c: 'randomInt(2,10)',
            d: 'randomInt(2,10)',
            test: 'gcd(a,b)==1 and b!=c'
          }
          exercice = resoudre(aleaName(['a/b', 'x/c']).join('='), { variables: variables, produitsencroix: true, comment: true, verifications: true })
          break
        }
        case 136: {
          // Produits en croix
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=136,n=1,cd=1&serie=uAXn&z=1&v=ex
          const variables = {
            a: 'randomInt(2,10)',
            b: 'randomInt(2,10)',
            c: 'randomInt(2,10)',
            d: 'randomInt(2,10)',
            test: 'gcd(a,b)==1 and a!=c'
          }
          exercice = resoudre(aleaName(['a/b', 'c/(x+d)']).join('='), { variables: variables, produitsencroix: true, comment: true, changeType: ['DISTRIBUTE'], verifications: true })
          break
        }
        case 137: {
          // Produits en croix
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=137,n=1,cd=1&serie=uAXn&z=1&v=ex
          const variables = {
            a: 'randomInt(2,10)',
            b: 'randomInt(2,10)',
            c: 'randomInt(2,10)',
            d: 'randomInt(2,10)',
            test: 'gcd(a,b)==1 and a!=c'
          }
          exercice = resoudre(aleaName(['a/b', 'c*x/(x+d)']).join('='), { variables: variables, produitsencroix: true, comment: true, changeType: ['DISTRIBUTE'], verifications: true })
          break
        }
        case 138: {
          // Pour comparaison sans les produits en croix avec Case 137
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=138,n=1,cd=1&serie=uAXn&z=1&v=ex
          const variables = {
            a: 'randomInt(2,10)',
            b: 'randomInt(2,10)',
            c: 'randomInt(2,10)',
            d: 'randomInt(2,10)',
            test: 'gcd(a,b)==1 and a!=c'
          }
          exercice = resoudre(aleaName(['a/b', 'c*x/(x+d)']).join('='), { variables: variables, comment: true, changeType: ['DISTRIBUTE'], verifications: true })
          break
        }
        case 139: {
          // Produits en croix
          // http://localhost:8080/mathalea.html?ex=betaEquations,s=139,n=1,cd=1&serie=uAXn&z=1&v=ex
          const variables = {
            a: 'randomInt(2,10)',
            c: 'randomInt(2,10)',
            d: 'randomInt(2,10)',
            test: 'a!=c'
          }
          exercice = resoudre(aleaName(['a/x', 'c/(x+d)']).join('='), { variables: variables, produitsencroix: true, comment: true, changeType: ['DISTRIBUTE'], verifications: true })
          break
        }
      }
      if (this.questionJamaisPosee(i, nquestion)) {
        // this.listeQuestions.push(exercice.texte + '<br>--------$\\textbf{CORRECTION}$----------<br>' + exercice.texteCorr)
        this.listeQuestions.push(exercice.texte)
        this.listeCorrections.push(exercice.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
