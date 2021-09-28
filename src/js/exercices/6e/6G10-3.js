import Exercice from '../Exercice.js'
import { combinaisonListes, enleveElement, lettreDepuisChiffre, listeQuestionsToContenu, randint, shuffle } from '../../modules/outils.js'
import { demiDroite, droite, labelPoint, mathalea2d, point, segmentAvecExtremites } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'
export const titre = 'Choisir la bonne figure'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'cliqueFigure']

/**
 * Plusieurs éléments sont proposés, il faut choisir le bon (par clic si interactif, par case à cocher par AMC)
 * @author ANGOT Rémi (Ajout AMC par Eric Elter)
 * Référence
*/
export default function cliqueFigure () {
  Exercice.call(this)
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.interactifType = parseInt(this.sup2) === 2 ? 'cliqueFigure' : 'qcm'
    this.autoCorrection = []
    this.consigne = (this.interactif) ? 'Cliquer sur la bonne figure.' : 'Entourer la bonne figure.' /// Penser ici à AMC aussi.
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.figures = [] // Liste des objets de toutes les figures sur lesquelles on pourra cliquer avec leur id et un booléen de réponse
    const typesDeQuestions = combinaisonListes(['segment', 'droite', 'demidroite', 'demidroite2'], this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const numeroLettre = randint(1, 20)
      const A = point(0, 0)
      const B = point(4, randint(-1, 3))
      A.nom = lettreDepuisChiffre(numeroLettre)
      B.nom = lettreDepuisChiffre(numeroLettre + 1)
      const labels = labelPoint(A, B)
      this.figures[i] = [{ id: `figure0Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `figure1Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `figure2Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `figure3Ex${this.numeroExercice}Q${i}`, solution: false }
      ]
      const figSegment = mathalea2d({ xmin: -2, xmax: 6, ymin: -2, style: '', scale: 0.4, id: `figure0Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B))
      const figDroite = mathalea2d({ xmin: -2, xmax: 6, ymin: -2, style: '', scale: 0.4, id: `figure1Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B), droite(A, B))
      const figDemiDroite = mathalea2d({ xmin: -2, xmax: 6, ymin: -2, style: '', scale: 0.4, id: `figure2Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B), demiDroite(A, B))
      const figDemiDroite2 = mathalea2d({ xmin: -2, xmax: 6, ymin: -2, style: '', scale: 0.4, id: `figure3Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B), demiDroite(B, A))
      let figCorr
      let figCorrecteQCM
      const figIncorrect = [figSegment, figDroite, figDemiDroite, figDemiDroite2]
      switch (typesDeQuestions[i]) {
        case 'segment':
          texte = `Le segment d'extrémités $${A.nom}$ et $${B.nom}$.`
          this.figures[i][0].solution = true
          figCorr = {}
          figCorrecteQCM = figSegment
          break
        case 'droite':
          texte = `La droite passant par les points $${A.nom}$ et $${B.nom}$.`
          this.figures[i][1].solution = true
          figCorr = droite(A, B)
          figCorrecteQCM = figDroite
          break
        case 'demidroite':
          texte = `La demi-droite d'origine $${A.nom}$ passant par $${B.nom}$.`
          this.figures[i][2].solution = true
          figCorr = demiDroite(A, B)
          figCorrecteQCM = figDemiDroite
          break
        case 'demidroite2':
          texte = `La demi-droite d'origine $${B.nom}$ passant par $${A.nom}$.`
          this.figures[i][3].solution = true
          figCorr = demiDroite(B, A)
          figCorrecteQCM = figDemiDroite2
          break
      }
      enleveElement(figIncorrect, figCorrecteQCM)
      if (this.interactif && this.interactifType === 'qcm') {
        this.autoCorrection[i] = {}
        this.autoCorrection[i].propositions = [
          {
            texte: figCorrecteQCM,
            statut: true,
            feedback: 'Correct !'
          },
          {
            texte: figIncorrect[0],
            statut: false,
            feedback: 'xxxxxxxxx.'
          },
          {
            texte: figIncorrect[1],
            statut: false,
            feedback: 'xxxxxxxxx.'
          },
          {
            texte: figIncorrect[2],
            statut: false,
            feedback: 'xxxxxxxxx.'
          }
        ]
        this.autoCorrection[i].options = {
          ordered: false,
          lastChoice: 4
        }
        texte += propositionsQcm(this, i).texte
      } else {
        texte += '<br>'
        texteCorr = texte + mathalea2d({ xmin: -4, xmax: 6, ymin: -2, style: '', scale: 0.4, id: `figure3Ex${this.numeroExercice}Q${i}` }, labels, segmentAvecExtremites(A, B), figCorr)
        const figures = shuffle([figSegment, figDroite, figDemiDroite, figDemiDroite2])
        texte += figures.join('')
        if (this.interactif && context.isHtml) {
          texte += `<span id="resultatCheckEx${this.numeroExercice}Q${i}"></span>`
        }
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
  if (context.isHtml && !context.isDiaporama) this.besoinFormulaire2Numerique = ['Exercice interactif', 2, '1 : QCM\n2 : Cliquer sur figure'] // Texte, tooltip
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
