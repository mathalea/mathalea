import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, calcul, choisitLettresDifferentes, lettreDepuisChiffre } from '../../modules/outils.js'
import { point, tracePoint, pointAdistance, labelPoint, droite, droiteParPointEtPerpendiculaire, codageMediatrice, segmentAvecExtremites, cercle, pointIntersectionLC, dansLaCibleCarree, cibleCarree, homothetie, similitude, texteParPoint, mathalea2d } from '../../modules/2d.js'
export const titre = 'Construire des médiatrices avec cible auto-corrective'

/**
 * Construction de médiatrices avec dispositif d'auto-correction aléatoire
 * Ref 6G25
 * @author Jean-Claude Lhote
 * Publié le 30/11/2020
 */
export default function Construire_mediatrices_6e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let result = [0, 0]; let texteCorr = ''; let texte = ''; let num1; let num2

    const celluleAlea = function (rang) {
      const lettre = lettreDepuisChiffre(randint(1, rang))
      const chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    const noms = choisitLettresDifferentes(4, 'QI', true)
    texte = `Construire la médiatrice $(d_1)$ du segment $[${noms[0]}${noms[1]}]$ et la médiatrice $(d_2)$ du segment $[${noms[2]}${noms[3]}]$.<br>`
    texte += 'Prolonger les droites $(d_1)$ et $(d_2)$ pour obtenir leur point d\'intersection.<br>'
    const marks = ['/', '//', '///', 'x', 'o', 'S', 'V']
    const I = point(0, 0, 'I')
    const A = pointAdistance(I, randint(3, 6))
    const B = similitude(A, I, randint(65, 150), randint(8, 15) / 10)
    const medA = droite(I, A, '(d_1)'); const medB = droite(I, B, '(d_2)')

    const dA = droiteParPointEtPerpendiculaire(A, medA)
    const dB = droiteParPointEtPerpendiculaire(B, medB)
    medA.color = 'blue'
    medB.color = 'green'
    const cA = cercle(A, calcul(randint(25, 40) / 20))
    const cB = cercle(B, calcul(randint(45, 60) / 20))
    const A1 = pointIntersectionLC(dA, cA, noms[0], 1)
    const A2 = pointIntersectionLC(dA, cA, noms[1], 2)
    const B1 = pointIntersectionLC(dB, cB, noms[2], 1)
    const B2 = pointIntersectionLC(dB, cB, noms[3], 2)
    const sA = segmentAvecExtremites(A1, A2)
    const sB = segmentAvecExtremites(B1, B2)
    sA.color = 'black'
    sB.color = 'black'

    let cible; const objetsEnonce = []; const objetsCorrection = []; let cellule
    let xMin, yMin, xMax, yMax
    const nomA1 = texteParPoint(noms[0], homothetie(A1, A2, 1.1), 'milieu', 'black', 1, '', true)
    const nomA2 = texteParPoint(noms[1], homothetie(A2, A1, 1.1), 'milieu', 'black', 1, '', true)
    const nomB1 = texteParPoint(noms[2], homothetie(B1, B2, 1.1), 'milieu', 'black', 1, '', true)
    const nomB2 = texteParPoint(noms[3], homothetie(B2, B1, 1.1), 'milieu', 'black', 1, '', true)

    cellule = celluleAlea(6)
    result = dansLaCibleCarree(I.x, I.y, 6, 0.6, cellule)
    cible = cibleCarree({ x: result[0], y: result[1], rang: 6, taille: 0.6 })
    cible.taille = 0.6
    cible.color = 'orange'
    cible.opacite = 0.7

    objetsEnonce.push(cible, sA, sB, nomA1, nomA2, nomB1, nomB2)
    objetsCorrection.push(cible, sA, sB, tracePoint(I), labelPoint(I), nomA1, nomA2, nomB1, nomB2)
    objetsCorrection.push(medA, medB, codageMediatrice(A1, A2, 'blue', marks[1]), codageMediatrice(B1, B2, 'green', marks[2]))

    //      objetsCorrection.push(segment(M[i],N[i],arcenciel(i)),codageMediatrice(M[i],N[i],arcenciel(i+5),marks[i]))
    //      objetsCorrection.push(traceCompas(A1,N[i],20),traceCompas(B,N[i],20))
    texteCorr += `Le point $I$ d'intersection des deux médiatrices est dans la case ${cellule} de la grille.<br>`
    xMin = Math.min(A1.x - 1, A2.x - 1, B1.x - 1, B2.x - 1, I.x - 4)
    yMin = Math.min(A1.y - 1, A2.y - 1, B1.y - 1, B2.y - 1, I.y - 4)
    xMax = Math.max(A1.x + 1, A2.x + 1, B1.x + 1, B2.x + 1, I.x + 4)
    yMax = Math.max(A1.y + 1, A2.y + 1, B1.y + 1, B2.y + 1, I.y + 4)

    context.fenetreMathalea2d = [xMin, yMin, xMax, yMax]

    this.listeQuestions.push(texte + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objetsEnonce))
    this.listeCorrections.push(texteCorr + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objetsCorrection))
    listeQuestionsToContenu(this)
  }
}
