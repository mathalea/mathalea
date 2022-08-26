import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML, fixeBordures } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, calcul, choisitLettresDifferentes, lettreDepuisChiffre } from '../../modules/outils.js'
import { point, tracePoint, pointAdistance, labelPoint, droite, droiteParPointEtPerpendiculaire, codageMediatrice, segmentAvecExtremites, cercle, pointIntersectionLC, dansLaCibleCarree, cibleCarree, homothetie, similitude, texteParPoint, positionLabelDroite, norme, translation, vecteur, symetrieAxiale } from '../../modules/2d.js'
export const titre = 'Construire des médiatrices avec cible auto-corrective'
export const amcReady = true
export const amcType = 'AMCOpen'
/**
 * Construction de médiatrices avec dispositif d'auto-correction aléatoire
 * Ref 6G25
 * @author Jean-Claude Lhote (Ajout AMC par Eric Elter)
 * Publié le 30/11/2020
 */
export default function ConstruireMediatrices6e () {
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
    this.autoCorrection = []
    let result = [0, 0]
    let texteCorr = ''
    let texte = ''

    const celluleAlea = function (rang) {
      const lettre = lettreDepuisChiffre(randint(1, rang))
      const chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    const noms = choisitLettresDifferentes(4, 'QI', true)
    texte = `Construire la médiatrice $(d)$ du segment $[${noms[0]}${noms[1]}]$ et la médiatrice $(d')$ du segment $[${noms[2]}${noms[3]}]$.<br>`
    texte += 'Prolonger les droites $(d)$ et $(d\')$ pour obtenir leur point d\'intersection.<br>'
    const marks = ['/', '//', '///', 'x', 'o', 'S', 'V']
    const I = point(0, 0, 'I')
    const A = pointAdistance(I, randint(3, 6))
    const B = similitude(A, I, randint(65, 150), randint(8, 15) / 10)
    const medA = droite(I, A)
    const medB = droite(I, B)

    const dA = droiteParPointEtPerpendiculaire(A, medA)
    const dB = droiteParPointEtPerpendiculaire(B, medB)
    medA.color = colorToLatexOrHTML('blue')
    medB.color = colorToLatexOrHTML('green')
    const cA = cercle(A, calcul(randint(25, 40) / 20))
    const cB = cercle(B, calcul(randint(45, 60) / 20))
    const A1 = pointIntersectionLC(dA, cA, noms[0], 1)
    const A2 = symetrieAxiale(A1, medA, noms[1])
    const B1 = pointIntersectionLC(dB, cB, noms[2], 1)
    const B2 = symetrieAxiale(B1, medB, noms[3])
    const sA = segmentAvecExtremites(A1, A2)
    const sB = segmentAvecExtremites(B1, B2)
    sA.color = colorToLatexOrHTML('black')
    sB.color = colorToLatexOrHTML('black')

    const objetsEnonce = []
    const objetsCorrection = []
    const nomA1 = texteParPoint(noms[0], translation(A1, homothetie(vecteur(A2, A1), A, 0.5 / norme(vecteur(A2, A1)))), 'milieu', 'black', 1, '', true)
    const nomA2 = texteParPoint(noms[1], translation(A2, homothetie(vecteur(A1, A2), A, 0.5 / norme(vecteur(A2, A1)))), 'milieu', 'black', 1, '', true)
    const nomB1 = texteParPoint(noms[2], translation(B1, homothetie(vecteur(B2, B1), A, 0.5 / norme(vecteur(B2, B1)))), 'milieu', 'black', 1, '', true)
    const nomB2 = texteParPoint(noms[3], translation(B2, homothetie(vecteur(B1, B2), A, 0.5 / norme(vecteur(B2, B1)))), 'milieu', 'black', 1, '', true)

    const cellule = celluleAlea(6)
    result = dansLaCibleCarree(I.x, I.y, 6, 0.6, cellule)
    const cible = cibleCarree({ x: result[0], y: result[1], rang: 6, taille: 0.6, color: '#f15929' })
    cible.opacite = 0.7

    objetsEnonce.push(cible, sA, sB, nomA1, nomA2, nomB1, nomB2)
    objetsCorrection.push(cible, sA, sB, tracePoint(I), labelPoint(I), nomA1, nomA2, nomB1, nomB2)
    objetsCorrection.push(medA, medB, codageMediatrice(A1, A2, 'blue', marks[1]), codageMediatrice(B1, B2, 'green', marks[2]))

    //      objetsCorrection.push(segment(M[i],N[i],arcenciel(i)),codageMediatrice(M[i],N[i],arcenciel(i+5),marks[i]))
    //      objetsCorrection.push(traceCompas(A1,N[i],20),traceCompas(B,N[i],20))
    texteCorr += `Le point $I$ d'intersection des deux médiatrices est dans la case ${cellule} de la grille.<br>`
    /* const xMin = Math.min(A1.x - 1, A2.x - 1, B1.x - 1, B2.x - 1, I.x - 4)
    const yMin = Math.min(A1.y - 1, A2.y - 1, B1.y - 1, B2.y - 1, I.y - 4)
    const xMax = Math.max(A1.x + 1, A2.x + 1, B1.x + 1, B2.x + 1, I.x + 4)
    const yMax = Math.max(A1.y + 1, A2.y + 1, B1.y + 1, B2.y + 1, I.y + 4)
    */
    // On appelle la fonction fixBordures qui va déterminer la fenêtre Mathalea2d.
    // Ici, la cible était un objet centré sur (cible.x, cible.y) et de taille 4, on crée deux points en diagonale
    // afin qu'elle soit prise en compte dans son intégralité avec les entêtes de lignes et de colonnes.
    const params = fixeBordures([nomA1, nomA2, nomB1, nomB2, point(cible.x - 2.5, cible.y - 2.5), point(cible.x + 2.5, cible.y + 2.5)])
    params.pixelsParCm = 20
    params.scale = 0.7
    objetsCorrection.push(texteParPoint('(d)', positionLabelDroite(medA, params), 'milieu', 'black', 1, 'middle', true))
    objetsCorrection.push(texteParPoint('(d\')', positionLabelDroite(medB, params), 'milieu', 'black', 1, 'middle', true))

    this.autoCorrection = [
      {
        enonce: texte + mathalea2d(params, objetsEnonce),
        propositions: [
          {
            texte: texteCorr + mathalea2d(params, objetsCorrection),
            statut: 3, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
            feedback: '',
            enonce: 'Texte écrit au dessus ou avant les cases à cocher', // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
            sanscadre: true // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève

          }
        ]
      }
    ]

    this.listeQuestions.push(texte + mathalea2d(params, objetsEnonce))
    this.listeCorrections.push(texteCorr + mathalea2d(params, objetsCorrection))
    listeQuestionsToContenu(this)
  }
}
