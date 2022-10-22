import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, lettreDepuisChiffre, numAlpha, shuffle } from '../../modules/outils.js'
import { point, pointSurCercle, cercle, polygoneAvecNom } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { context } from '../../modules/context.js'
export const interactifReady = true
export const interactifType = 'qcm'
export const titre = 'Connaitre le vocabulaire de base des polygones'

export const dateDePublication = '21/10/2022'

/**
 * Connaissance du vocabulaire de base des polygones : nom, côté, sommet, diagonale
 * @author Guillaume Valmont
 * 6G20-3
*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.correctionDetailleeDisponible = true
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      const objets2d = []
      const O = point(0, 0, 'O')
      const points = []

      const nbPoints = randint(4, 6)
      // On commence par créer les angles à partir desquels les points seront créés
      const anglesPoints = []
      for (let i = 0; i < nbPoints; i++) {
        anglesPoints.push(randint(1, 12, anglesPoints))
      }
      for (let i = 0; i < anglesPoints.length; i++) {
        anglesPoints[i] = anglesPoints[i] * 30
      }
      anglesPoints.sort((a, b) => a - b)
      // On crée leurs noms
      const numerosNomsPoints = []
      for (let i = 0; i < nbPoints; i++) {
        numerosNomsPoints.push(randint(1, 26, [22, ...numerosNomsPoints])) // Il y a un espace bizarre après les V en LateX, alors on les zappe
      }
      // On crée les points autour d'un point O à partir des angles précédemment créés
      for (let i = 0; i < nbPoints; i++) {
        points.push(pointSurCercle(cercle(O, randint(20, 50) / 10), anglesPoints[i], lettreDepuisChiffre(numerosNomsPoints[i])))
      }
      const polygon = polygoneAvecNom(points)
      objets2d.push(polygon)
      // On affiche le cadre mathalea2d
      const pointsX = []
      const pointsY = []
      for (const point of points) {
        pointsX.push(point.x)
        pointsY.push(point.y)
      }
      const xmin = Math.min(...pointsX) - 2
      const xmax = Math.max(...pointsX) + 2
      const ymin = Math.min(...pointsY) - 2
      const ymax = Math.max(...pointsY) + 2
      const parametres2d = { xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, scale: 1 }
      texte += mathalea2d(parametres2d, objets2d)

      // On construit les questions
      const indiceA = randint(0, (nbPoints - 1))
      const indiceB = (indiceA + 1) % nbPoints
      const indiceC = (indiceA + 2) % nbPoints
      const A = points[indiceA].nom
      const B = points[indiceB].nom
      const C = points[indiceC].nom

      const indiceDepart = randint(0, points.length)
      let nomDirectCorrect = '$'
      for (let i = 0; i < nbPoints; i++) {
        nomDirectCorrect += points[(indiceDepart + i) % nbPoints].nom
      }
      nomDirectCorrect += '$'
      const nomIndirectCorrect = nomDirectCorrect.split('').reverse().join('')
      const nomDirectIncorrect = inverse2lettres(nomDirectCorrect)
      const nomIndirrectIncorrect = inverse2lettres(nomIndirectCorrect)
      function inverse2lettres (str) {
        const arr = str.split('')
        const temp = arr[1]
        arr[1] = arr[2]
        arr[2] = temp
        return arr.join('')
      }
      let questionsReponses = [
        {
          question: 'Quels sont les deux noms possibles de ce polygone ?',
          propositions: [nomDirectCorrect, nomDirectIncorrect, nomIndirectCorrect, nomIndirrectIncorrect],
          reponses: [nomDirectCorrect, nomIndirectCorrect],
          explications: `On peut le nommer de plein de façons différentes.<br>
          Il faut partir d'un point (n'importe lequel) et de nommer les points qu'on rencontre lorsqu'on fait le tour de la figure dans un sens ou dans l'autre.`
        },
        {
          question: `$${A}$ est :`,
          propositions: ['un sommet', 'un côté', 'une diagonale', 'je ne sais pas'],
          reponses: ['un sommet'],
          explications: 'Les sommets délimitent les côtés d\'un polygone'
        },
        {
          question: `[$${B}${C}$] est :`,
          propositions: ['un sommet', 'un côté', 'une diagonale', 'je ne sais pas'],
          reponses: ['un côté'],
          explications: 'Les segments d\'un polygone sont appelés ses côtés.'
        },
        {
          question: `[$${C}${A}$] est :`,
          propositions: ['un sommet', 'un côté', 'une diagonale', 'je ne sais pas'],
          reponses: ['une diagonale'],
          explications: 'Une diagonale est un segment qui a pour extrémités deux côtés non consécutifs (deux côtés qui ne se suivent pas).'
        }
      ]
      questionsReponses = shuffle(questionsReponses)
      let j = 0
      for (const questionReponse of questionsReponses) {
        const propositions = []
        for (const proposition of questionReponse.propositions) {
          let statut = false
          for (const reponse of questionReponse.reponses) {
            if (proposition === reponse) statut = true
          }
          propositions.push({
            texte: proposition,
            statut,
            feedback: questionReponse.explications
          })
        }
        this.autoCorrection[i * questionsReponses.length + j] = {
          enonce: questionReponse.question,
          options: { ordered: false },
          propositions: propositions
        }
        const monQcm = propositionsQcm(this, i * questionsReponses.length + j)
        texte += numAlpha(j)
        texte += context.isAmc ? '' : questionReponse.question
        texte += monQcm.texte + '<br>'
        texteCorr += numAlpha(j)
        texteCorr += context.isAmc ? '' : questionReponse.question
        texteCorr += monQcm.texteCorr
        this.correctionDetaillee ? texteCorr += questionReponse.explications + '<br><br>' : texteCorr += '<br>'
        j++
      }
      if (this.questionJamaisPosee(i, ...pointsX, ...pointsY)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
