import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { point, mathalea2d, tracePoint, segment, colorToLatexOrHTML, droite, polygone, cercle, labelPoint, codageAngleDroit, codeSegment, texteParPoint, codageMediatrice, codageMilieu, codeAngle, codageBissectrice, nomVecteurParPosition, ellipse } from '../../modules/2d.js'
export const titre = 'Calculer un angle, déduit de figures simples'
export const interactifType = 'mathLive'
export const interactifReady = true

export const dateDePublication = '03/05/2022'

/**
 *
 * Calculer un angle à partir de figures simples
 * Ref 6G23-5
 * @author Eric Elter
 * Publié le 03/05/2022
 */
export default function CalculedddrUnAngle () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, paramsEnonce; i < this.nbQuestions; i++) {
      texte = ''
      texteCorr = ''
      // On prépare la figure...
      const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      // const objetsCorrection = [] // Idem pour la correction
      const A = point(0, 0, 'A')
      const B = point(0, 5, 'B')
      const C = point(5, 0, 'C')
      const D = point(5, 5)
      // const pt = tracePoint(AA, BB, '#f15929')
      const p1 = tracePoint(A, B, C, 'blue')
      p1.style = 'x'
      p1.epaisseur = 1
      const p2 = segment(A, B, '#f15929')
      const p3 = cercle(A, 5, '#f15929')
      const p4 = polygone(D, B, C)
      p4.color = colorToLatexOrHTML('#f15929')
      // p4.hachures = false
      // p4.couleurDeRemplissage = colorToLatexOrHTML('#f15929')
      // p4.couleurDesHachures = colorToLatexOrHTML('#f15929')
      // p4.epaisseurDesHachures = 3
      const p5 = labelPoint(A, B, C)
      p5.color = colorToLatexOrHTML('#f15929')
      const p6 = droite(A, D, '(dd)', '#f15929')
      const p7 = codageAngleDroit(B, A, C, '#f15929', 0.4, 0.5, 1)
      p7.couleurDeRemplissage = colorToLatexOrHTML('#f15929')
      const p8 = codeSegment(D, B, '|||', '#f15929')
      const p9 = texteParPoint('mon texte', A, 'droite', '#f15929')
      const p10 = texteParPoint('$4\\times5$', B, 'gauche', '#f15929')
      const p11 = codageMilieu(A, D, '#f15929', 'xx', true)
      const p12 = codageMediatrice(B, C, '#f15929', 'oo')
      // const p13 = arc(C, A, 45, true, '#f15929', 'blue', 0.2)
      // const p13 = arc(C, A, 45, true, 'red', 'blue')
      // const p13 = codeAngle(C, A, 45, 0.8, 'X', '#f15929', 1, 1, 'blue', 1)
      const p13 = codeAngle(C, A, 45, 0.8, 'X', 'blue', 1, 1, '#f15929', 0.4)
      const p14 = codageBissectrice(C, D, B, '#f15929', 'oo')
      const p15 = nomVecteurParPosition('toto', -1, -1, 1, 10, '#f15929')
      const p16 = ellipse(A, 1, 2)
      p16.couleurDeRemplissage = colorToLatexOrHTML('#f15929')
      p16.color = colorToLatexOrHTML('#f15929')
      objetsEnonce.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16)

      texte += 'essai'
      paramsEnonce = { xmin: -6, ymin: -10, xmax: 6, ymax: 6, pixelsParCm: 20, scale: 1, mainlevee: false }
      texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)
      paramsEnonce = { xmin: -6, ymin: -10, xmax: 6, ymax: 6, pixelsParCm: 20, scale: 1, mainlevee: true }
      texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      listeQuestionsToContenu(this)
    }
  }
}
