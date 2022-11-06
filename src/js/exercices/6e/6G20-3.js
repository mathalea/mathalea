import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, lettreDepuisChiffre, combinaisonListes } from '../../modules/outils.js'
import { point, pointSurCercle, cercle, polygoneAvecNom } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { context } from '../../modules/context.js'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = false
export const titre = 'Connaitre le vocabulaire de base des polygones'

export const dateDePublication = '21/10/2022'

/**
 * Connaissance du vocabulaire de base des polygones : nom, côté, sommet, diagonale
 * @author Guillaume Valmont
 * 6G20-3
*/
export const uuid = '18672'
export const ref = '6G20-3'
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.correctionDetailleeDisponible = true
    this.nbQuestions = 4
    this.nbQuestionsModifiable = false
    this.besoinFormulaireTexte = ['Texte de la 4ème possibilité', 'Retire la 4ème possibilité si le champ est vide']
    this.sup = ''
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const typeQuestionsDisponibles = ['nom', 'sommet', 'cote', 'diagonale']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    const objets2d = []
    const O = point(0, 0, 'O')
    const points = []

    const nbSommets = randint(4, 6)
    // On commence par créer les angles à partir desquels les points seront créés
    const anglesPoints = []
    for (let i = 0; i < nbSommets; i++) {
      anglesPoints.push(randint(1, 12, anglesPoints))
    }
    for (let i = 0; i < anglesPoints.length; i++) {
      anglesPoints[i] = anglesPoints[i] * 30
    }
    anglesPoints.sort((a, b) => a - b)
    // On crée leurs noms
    const numerosNomsPoints = []
    for (let i = 0; i < nbSommets; i++) {
      numerosNomsPoints.push(randint(1, 26, [22, ...numerosNomsPoints])) // Il y a un espace bizarre après les V en LateX, alors on les zappe
    }
    // On crée les points autour d'un point O à partir des angles précédemment créés
    for (let i = 0; i < nbSommets; i++) {
      points.push(pointSurCercle(cercle(O, randint(20, 50) / 10), anglesPoints[i], lettreDepuisChiffre(numerosNomsPoints[i])))
    }
    const polygon = polygoneAvecNom(...points)
    objets2d.push(polygon[0], polygon[1])
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
    this.introduction = '' + mathalea2d(parametres2d, objets2d)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      // On construit les questions
      const indiceA = randint(0, (nbSommets - 1))
      const indiceB = (indiceA + 1) % nbSommets
      const indiceC = (indiceA + 2) % nbSommets
      const A = points[indiceA].nom
      const B = points[indiceB].nom
      const C = points[indiceC].nom

      const indiceDepart = randint(0, points.length)
      let nomDirectCorrect = '$'
      for (let i = 0; i < nbSommets; i++) {
        nomDirectCorrect += points[(indiceDepart + i) % nbSommets].nom
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
      let questionReponse
      switch (listeTypeQuestions[i]) {
        case 'nom':
          questionReponse =
          {
            question: 'Quels sont les deux noms possibles de ce polygone ?',
            propositions: [nomDirectCorrect, nomDirectIncorrect, nomIndirectCorrect, nomIndirrectIncorrect],
            reponses: [nomDirectCorrect, nomIndirectCorrect],
            explications: `On peut le nommer de plein de façons différentes.<br>
              Il faut partir d'un point (n'importe lequel) et nommer les points qu'on rencontre lorsqu'on fait le tour de la figure dans un sens ou dans l'autre.`
          }
          break
        case 'sommet':
          questionReponse =
          {
            question: `$${A}$ est :`,
            propositions: ['un sommet', 'un côté', 'une diagonale'],
            reponses: ['un sommet'],
            explications: 'Les sommets sont les extrémités des côtés.'
          }

          break
        case 'cote':
          questionReponse =
          {
            question: `$[${B}${C}]$ est :`,
            propositions: ['un sommet', 'un côté', 'une diagonale'],
            reponses: ['un côté'],
            explications: 'Les côtés sont les segments qui forment le polygone.'
          }

          break
        case 'diagonale':
          questionReponse =
          {
            question: `$[${C}${A}]$ est :`,
            propositions: ['un sommet', 'un côté', 'une diagonale'],
            reponses: ['une diagonale'],
            explications: 'Une diagonale est un segment qui a pour extrémités deux sommets non consécutifs (deux côtés qui ne se suivent pas).'
          }

          break
      }
      if (this.sup !== '' && this.sup !== undefined && this.sup !== 'NaN' && listeTypeQuestions[i] !== 'nom') questionReponse.propositions.push(this.sup)
      const propositions = []
      for (const proposition of questionReponse.propositions) {
        let statut = false
        for (const reponse of questionReponse.reponses) {
          if (proposition === reponse) statut = true
        }
        propositions.push({
          texte: proposition,
          statut,
          feedback: ''
        })
      }
      this.autoCorrection[i] = {
        enonce: questionReponse.question,
        options: { ordered: false },
        propositions: propositions
      }
      const monQcm = propositionsQcm(this, i)
      texte += context.isAmc ? '' : questionReponse.question + '<br>'
      texte += monQcm.texte
      texteCorr += context.isAmc ? '' : questionReponse.question + '<br>'
      texteCorr += monQcm.texteCorr
      this.correctionDetaillee ? texteCorr += questionReponse.explications + '<br><br>' : texteCorr += '<br>'
      if (this.questionJamaisPosee(i, ...pointsX, ...pointsY, listeTypeQuestions[i])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
