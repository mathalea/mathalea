import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, calcul, choisitLettresDifferentes, lettreDepuisChiffre, arcenciel } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, droite, codageMediatrice, segment, traceCompas, dansLaCibleCarree, cibleCarree, translation, homothetie, symetrieAxiale, distancePointDroite, longueur } from '../../modules/2d.js'
export const titre = 'Construire le symétrique d\'un point avec cible auto-corrective'

/**
 * Construction de symétrique avec dispositif d'auto-correction aléatoire
 * Ref 6G24-3
 * @author Jean-Claude Lhote
 * Publié le 30/11/2020
 */
export default function ConstruireSymetriquePoint6e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 3
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let result = [0, 0]; let texteCorr = ''; const nbpoints = parseInt(this.sup); let nontrouve; let assezloin; let cible
    const celluleAlea = function (rang) {
      const lettre = lettreDepuisChiffre(randint(1, rang))
      const chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    const a = randint(-10, 10); const b = randint(-10, 10, a)
    const d = droite(a, b, 0, '(d)')
    const A = translation(point(0, 0), homothetie(d.directeur, point(0, 0), -0.5))
    const B = translation(point(0, 0), homothetie(d.directeur, point(0, 0), 0.5))
    const marks = ['/', '//', '///', 'x', 'o', 'S', 'V']
    const noms = choisitLettresDifferentes(nbpoints, 'Q', true)
    this.consigne = `Construire le symétrique des points $${noms[0]}$`
    for (let i = 1; i < nbpoints - 1; i++) {
      this.consigne += `, $${noms[i]}$`
    }
    this.consigne += ` et $${noms[nbpoints - 1]}$ par rapport à $(d)$.`
    const cibles = []; const M = []; const N = []; const objetsEnonce = []; const objetsCorrection = [] // cibles, M point marqués, N symétrique de M
    const cellules = []
    let xMin, yMin, xMax, yMax
    [xMin, yMin, xMax, yMax] = [0, 0, 0, 0]
    for (let i = 0; i < nbpoints; i++) { // On place les cibles.
      N.push(point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[i] + "'"))
      nontrouve = true
      while (distancePointDroite(N[i], d) < 3 || nontrouve) {
        nontrouve = true
        if (distancePointDroite(N[i], d) < 3) {
          N[i].x = calcul(randint(-80, 80, 0) / 10)
          N[i].y = calcul(randint(-80, 80, 0) / 10)
        } else {
          assezloin = true
          for (let j = 0; j < i; j++) {
            if (longueur(N[i], N[j]) < 4.5) assezloin = false
          }
          if (assezloin === false) { // éloigner les points donc les grilles
            N[i].x = calcul(randint(-80, 80, 0) / 10)
            N[i].y = calcul(randint(-80, 80, 0) / 10)
          } else nontrouve = false
        }
      }
    }

    objetsEnonce.push(d)
    objetsCorrection.push(d, tracePoint(A, B))

    for (let i = 0; i < nbpoints; i++) {
      cellules.push(celluleAlea(4))
      result = dansLaCibleCarree(N[i].x, N[i].y, 4, 0.6, cellules[i])
      cible = cibleCarree({ x: result[0], y: result[1], rang: 4, num: i + 1, taille: 0.6, color: 'orange' })
      cible.taille = 0.6
      cible.opacite = 0.7
      cibles.push(cible)
    }
    for (let i = 0; i < nbpoints; i++) {
      M.push(symetrieAxiale(N[i], d, noms[i]))
      objetsEnonce.push(tracePoint(M[i]), labelPoint(M[i]), cibles[i])
      objetsCorrection.push(tracePoint(M[i], N[i]), labelPoint(M[i], N[i]), cibles[i])
      objetsCorrection.push(segment(M[i], N[i], arcenciel(i)), codageMediatrice(M[i], N[i], arcenciel(i + 5), marks[i]))
      objetsCorrection.push(traceCompas(A, N[i], 20), traceCompas(B, N[i], 20))
      texteCorr += `$${noms[i]}'$, le symétrique du point $${noms[i]}$ est dans la case ${cellules[i]} de la grille ${i + 1}.<br>`
    }

    for (let i = 0; i < nbpoints; i++) {
      xMin = Math.min(xMin, N[i].x - 3, M[i].x - 3)
      yMin = Math.min(yMin, N[i].y - 3, M[i].y - 3)
      xMax = Math.max(xMax, N[i].x + 3, M[i].x + 3)
      yMax = Math.max(yMax, N[i].y + 3, M[i].y + 3)
    }

    context.fenetreMathalea2d = [xMin, yMin, xMax, yMax]

    this.listeQuestions.push(mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objetsEnonce))
    this.listeCorrections.push(texteCorr + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objetsCorrection))
    listeQuestionsToContenu(this)

    //  let nonchoisi,coords=[],x,y,objetsEnonce=[],objetsCorrection=[],nomd,label_pos
  }
  this.besoinFormulaireNumerique = ['Nombre de points (1 à 5)', 5]
  // this.besoinFormulaire2CaseACocher = ["Avec des points de part et d'autre"];
}
