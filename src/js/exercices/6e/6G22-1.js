import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, lettreDepuisChiffre, combinaisonListes, choice } from '../../modules/outils.js'
import { point, tracePoint, longueur, codageAngle, demiDroite, texteParPoint, rotation, homothetie, angle } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { context } from '../../modules/context.js'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = false
export const titre = 'Connaitre le vocabulaire de base des angles'

export const dateDePublication = '03/12/2022'

/**
 * Connaissance du vocabulaire de base des angles : nom, sommet, côté
 * @author Guillaume Valmont
 * 6G22-1
*/
export const uuid = 'e8d33'
export const ref = '6G22-1'
export default class VocabulaireDeBaseDesAngles extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.correctionDetailleeDisponible = true
    this.nbColsCorr = 2
    this.nbQuestions = 4
    this.nbQuestionsModifiable = false
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const typeQuestionsDisponibles = ['nom', 'sommet', 'cote', 'autre']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    const objets2d = []
    const xMin = -4
    const xMax = 4
    const yMin = -3
    const yMax = 3
    const distanceMin = 3
    const indiceNomA = randint(1, 26)
    const indiceNomB = randint(1, 26, [indiceNomA])
    const indiceNomC = randint(1, 26, [indiceNomA, indiceNomB])
    const A = point(randint(xMin, xMax), randint(yMin, yMax), lettreDepuisChiffre(indiceNomA))
    let B = point(randint(xMin, xMax), randint(yMin, yMax), lettreDepuisChiffre(indiceNomB))
    while (longueur(A, B) < distanceMin) {
      B = point(randint(xMin, xMax), randint(yMin, yMax), lettreDepuisChiffre(indiceNomB))
    }
    let C = point(randint(xMin, xMax), randint(yMin, yMax), lettreDepuisChiffre(indiceNomC))
    while (longueur(A, C) < distanceMin || longueur(B, C) < distanceMin || angle(A, B, C) < 10 || angle(A, B, C) > 170) {
      C = point(randint(xMin, xMax), randint(yMin, yMax), lettreDepuisChiffre(indiceNomC))
    }
    const points = [A, B, C]
    const angleABC = codageAngle(A, B, C, 2)
    const demiDroiteBA = demiDroite(B, A)
    const demiDroiteCA = demiDroite(B, C)
    objets2d.push(tracePoint(...points), texteParPoint(A.nom, rotation(A, B, -10)), texteParPoint(C.nom, rotation(C, B, 10)), texteParPoint(B.nom, homothetie(B, A, 1.2)), angleABC, demiDroiteBA, demiDroiteCA)
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
    const parametres2d = { xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, scale: 0.6 }
    this.introduction = '' + mathalea2d(parametres2d, objets2d)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      // On construit les questions

      const nomDirectCorrect = '\\widehat{' + A.nom + B.nom + C.nom + '}'
      const nomIndirrectIncorrect = '\\widehat{' + B.nom + C.nom + A.nom + '}'
      let questionReponse
      switch (listeTypeQuestions[i]) {
        case 'nom':
          questionReponse =
          {
            question: `$${nomDirectCorrect}$ est :`,
            propositions: ['le sommet', 'un côté', 'le nom de l\'angle', 'rien de cela'],
            reponses: ['le nom de l\'angle'],
            explications: `C'est l'angle qui part de ${A.nom}, qui passe par ${B.nom} et qui va vers ${C.nom}`
          }
          break
        case 'sommet':
          questionReponse =
          {
            question: `$${B.nom}$ est :`,
            propositions: ['le sommet', 'un côté', 'le nom de l\'angle', 'rien de cela'],
            reponses: ['le sommet'],
            explications: 'Le sommet de l\'angle est l\'origine commune des demi-droites qui le forment.'
          }

          break
        case 'cote':
          questionReponse =
          {
            question: `$[${B.nom}${C.nom})$ est :`,
            propositions: ['le sommet', 'un côté', 'le nom de l\'angle', 'rien de cela'],
            reponses: ['un côté'],
            explications: 'Les côtés sont les demi-droites qui forment l\'angle.'
          }

          break
        case 'autre': {
          let question = ''
          let explications = ''
          switch (choice(['sommet', 'cote', 'nom'])) {
            case 'sommet':
              question = `$${A.nom}$ est :`
              explications = 'Le sommet de l\'angle est l\'origine commune des demi-droites qui le forment.'
              break
            case 'cote':
              question = `$${B.nom}${A.nom}$ est :`
              explications = 'Les côtés sont des demi-droites et se notent donc avec un crochet et une parenthèse.'
              break
            case 'nom':
              question = `$${nomIndirrectIncorrect}$ est :`
              explications = `C'est l'angle qui part de ${A.nom}, qui passe par ${B.nom} et qui va vers ${C.nom}, c'est donc l'angle $${nomDirectCorrect}$`
              break
          }
          questionReponse =
          {
            question,
            propositions: ['le sommet', 'un côté', 'le nom de l\'angle', 'rien de cela'],
            reponses: ['rien de cela'],
            explications
          }

          break
        }
      }
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
        options: { ordered: true },
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
