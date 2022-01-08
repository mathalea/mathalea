import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, choice } from '../../modules/outils.js'
import { homothetie, point, rotation, mathalea2d, fixeBordures, droite, translation, vecteur, arcPointPointAngle } from '../../modules/2d.js'
import { evaluate } from 'mathjs'
export const titre = 'Angles alternes-internes ou correspondants'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '08/01/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '08/01/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export function aleaVariables (variables = { a: false, b: false, c: true, d: 'fraction(a,10)+fraction(b,100)', test: 'b!=0 and b>a>c' }, debug = false) {
  const assignations = {}
  let cpt = 0
  let test = true
  do {
    cpt++
    for (const v of Object.keys(variables)) {
      if (typeof variables[v] === 'boolean') {
        assignations[v] = evaluate('(pickRandom([-1,1]))^(n)*randomInt(1,10)', { n: variables[v] })
      } else if (v !== 'test') {
        assignations[v] = evaluate(variables[v], assignations)
      }
    }
    if (variables.test !== undefined) test = evaluate(variables.test, assignations)
  } while (!test && cpt < 1000)
  if (cpt === 1000) window.notify('Attention ! 1000 essais dépassés.\n Trop de contraintes.\n Le résultat ne vérifiera pas le test.')
  return assignations
}

function anglesSecantes (A, rot = { O: 60, A: 0 }) {
  const s = rotation(translation(A, vecteur(1, 0)), A, rot.A)
  const t = rotation(s, A, 180)
  const x = rotation(translation(A, vecteur(1, 0)), A, rot.O)
  const Ox = rotation(x, A, 180)
  return {
    a: arcPointPointAngle(s, x, rot.O - rot.A, true, 'blue'),
    b: arcPointPointAngle(x, t, 180 - (rot.O - rot.A), true, 'green'),
    c: arcPointPointAngle(t, Ox, rot.O - rot.A, true, 'red'),
    d: arcPointPointAngle(Ox, s, 180 - (rot.O - rot.A), true, 'gray'),
    s: s,
    t: t,
    x: x,
    As: droite(A, s),
    Ax: droite(A, x),
    A: A
  }
}
/**
 * Description didactique de l'exercice
 * @author Frédéric PIOU
 * Référence
*/
export default function exercicesAnglesAIC () {
  Exercice.call(this)
  const formulaire = [
    '0 : Mélange des types de questions',
    '1 : Angle alterne-interne ou correspondant ?'
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
      switch (nquestion) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1: {
          const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
          const objetsEnonceml = [] // Idem pour l'enoncé à main levée si besoin
          const objetsCorrection = [] // Idem pour la correction
          const param = aleaVariables(
            {
              O: 'randomInt(0,90)',
              A: 'randomInt(-90,90)',
              B: 'randomInt(-90,90)',
              r1: 'pickRandom([1.5,2])',
              r2: 'pickRandom([1.5,2])',
              test: 'O-A>30 and O-B>30'
            }
          )
          if (dDebug) console.log(param)
          const O = point(0, 0)
          const anglesA = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O), O, param.r1), { O: param.O, A: param.A })
          const anglesB = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O + 180), O, param.r2), { O: param.O, A: param.B })
          for (const i of ['a', 'b', 'c', 'd']) {
            anglesA[i].couleurDeRemplissage = 'red'
            anglesB[i].couleurDeRemplissage = 'red'
          }
          const ab = choice([
            choice(['aa', 'bb', 'cc', 'dd']),
            choice(['ca', 'db']),
            choice(['a', 'b', 'c', 'd']) + choice(['a', 'b', 'c', 'd'])
          ])
          const a = ab[0]
          const b = ab[1]
          objetsEnonce.push(
            anglesA[a],
            anglesA.As,
            anglesA.Ax,
            anglesB[b],
            anglesB.As,
            anglesB.Ax
          )
          const paramsEnonce = fixeBordures([
            ...Object.keys(anglesA).map(key => { return anglesA[key] }),
            ...Object.keys(anglesB).map(key => { return anglesB[key] })
          ])
          // On copie tout le contenu de objetsEnonce et de objetsEnonceml dans objetsCorrection
          objetsEnonce.forEach(objet => {
            objetsCorrection.push(objet)
          })
          objetsEnonceml.forEach(objet => {
            objetsCorrection.push(objet)
          })
          // ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          let texte = 'Les angles marqués sont-ils alternes-internes, correspondants ou ni l\'un ni l\'autre ?<br>'
          let reponse
          if (a === b) {
            reponse = 'correspondants'
          } else if (a + b === 'ca' || a + b === 'db') {
            reponse = 'alternes-internes'
          } else {
            reponse = 'ni l\'un ni l\'autre'
          }
          const texteCorr = `Les angles sont ${reponse}.`
          texte += mathalea2d(paramsEnonce, objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
          break
        }
      }
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
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
