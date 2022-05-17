import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { point, mathalea2d, tracePoint, segment, colorToLatexOrHTML, droite, polygone, cercle, labelPoint, codageAngleDroit, codeSegment, texteParPoint, codageMediatrice, codageMilieu, codeAngle, codageBissectrice, nomVecteurParPosition, ellipse, arc, constructionBissectrice, codageHauteurTriangle, codageMedianeTriangle, afficheLongueurSegment, texteSurSegment, vecteur, pointIntersectionLC, texteSurArc } from '../../modules/2d.js'
export const titre = 'Calculer un angle, déduit de figures simples'
export const interactifType = 'mathLive'
export const interactifReady = true

export const dateDePublication = '03/05/2022'

/**
 *
 * Calculer un angle à partir de figures simples
 * Ref 6G23-5
 * @author Eric Elter
 * Publié le 03/05/2021
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
      const A = point(0, 0, 'A')
      const B = point(0, 5, 'B')
      const C = point(5, 0, 'C')
      const D = point(5, 5, 'D')
      const E = point(7, 1, 'E')
      const p1 = tracePoint(A, B, D, E, '#f15929')
      p1.style = 'x'
      p1.epaisseur = 1
      const p2 = segment(A, B, '#f15929')
      const p3 = cercle(A, 5, 'blue')
      const p4 = polygone(D, E, C)
      p4.color = colorToLatexOrHTML('#f15929')
      // p4.hachures = false
      // p4.couleurDeRemplissage = colorToLatexOrHTML('#f15929')
      // p4.couleurDesHachures = colorToLatexOrHTML('#f15929')
      // p4.epaisseurDesHachures = 3
      const p5 = labelPoint(A, B, C, D, E)
      p5.color = colorToLatexOrHTML('#f15929')
      const p6 = droite(A, D, '(dd)', '#f15929')
      const p7 = codageAngleDroit(B, A, C, '#f15929', 0.3, 0.5, 1, '#f15929')
      const p8 = codeSegment(D, B, '|||', '#f15929')
      const p9 = texteParPoint('mon texte', A, 'droite', '#f15929')
      const p10 = texteParPoint('$4\\times5$', B, 'gauche', '#f15929')
      const p11 = codageMilieu(A, D, '#f15929', 'xx', true)
      const p12 = codageMediatrice(B, C, '#f15929', 'oo')
      const p13a = arc(C, A, 45, true, '#f15929', '#f15929', 0.2)
      p13a.hachures = false
      console.log(p13a.angle)
      const p13b = arc(C, A, -217, true, '#f15929', '#f15929', 0.2)
      p13b.hachures = true
      // const p13 = arc(C, A, 45, true, 'red', 'blue')
      // const p13 = codeAngle(C, A, 45, 0.8, 'X', '#f15929', 1, 1, 'blue', 1)
      const p13 = codeAngle(C, A, 45, 0.8, 'X', 'blue', 1, 1, '#f15929', 0.4)
      const p14 = codageBissectrice(C, D, B, '#f15929', 'oo')
      const p15 = nomVecteurParPosition('toto', -1, -1, 1, 10, '#f15929')
      const p16 = ellipse(A, 1, 2)
      p16.couleurDeRemplissage = colorToLatexOrHTML('#f15929')
      p16.color = colorToLatexOrHTML('#f15929')
      // const p17 = cibleCarree({ x: -3, y: 0, rang: 5, num: 8, taille: 0.6, color: '#f15929' })
      // const p17 = cibleCarree({ x: -2, y: 0, rang: 6, num: 15, taille: 0.6, color: '#f15929' })
      // const p18 = cibleRonde({ x: -1, y: 1, rang: 6, num: 8, taille: 0.5, color: '#f15929' })
      // const p18b = cibleCouronne({ x: 3, y: 3, taille: 4, taille2: 2, depart: 20, nbDivisions: 5, nbSubDivisions: 3, semi: true, label: true, color: '#f15929' })
      const p19a = constructionBissectrice(B, C, D, true, '#f15929', 'ooo', 2, '#f15929', 1, '#f15929')
      // const p19a = bissectrice(B, C, D, '#f15929')
      // const p19a = traceCompas(B, C)
      const p19 = codageHauteurTriangle(E, D, C, '#f15929')
      const p20 = codageMedianeTriangle(D, C, '#f15929')
      const p21 = afficheLongueurSegment(C, D, '#f15929', 0.1, 'km')
      const p22 = texteSurSegment('JCL', B, C, '#f15929', 0.4, false)
      const p23 = vecteur(A, C)
      const p24 = tracePoint(pointIntersectionLC(p6, p3, 'K', 1))
      const p25 = texteSurSegment('Rémi', D, E, '#f15929', 0.4, true)
      const p26 = texteSurArc('MathALEA', D, E, 70, '#f15929')
      objetsEnonce.push(p1, p2, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p19, p20, p21, p22)
      // objetsEnonce.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11)
      // objetsEnonce.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11)
      objetsEnonce.push(p23.representant(A, '#f15929'), p24, p13a, p13b, p16, p19a, p25, p26)
      // objetsEnonce.push(p1, p5, p26)
      texte += 'essai'
      paramsEnonce = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false, amplitude: 0.5 }
      texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)
      paramsEnonce = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 0.5 }
      texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      listeQuestionsToContenu(this)
    }
  }
}
