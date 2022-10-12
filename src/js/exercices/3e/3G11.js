import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { segment } from '../../modules/2d/segment.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { homothetie } from '../../modules/2d/transformations.js'
import { tracePoint } from '../../modules/2d/tracePoint.js'
import { labelPoint } from '../../modules/2d/labelPoint.js'
import { texNombre } from '../../modules/outils/texNombres.js'
import { longueur } from '../../modules/2d/calculs.js'
import Alea2iep from '../../modules/Alea2iep.js'
import { choisitLettresDifferentes, lettreDepuisChiffre } from '../../modules/outils/lettres.js'
import { cibleCarree, dansLaCibleCarree } from '../../modules/2d/cibles.js'
import { arcenciel } from '../../modules/outils/couleurs.js'
export const titre = 'Construire l\'image d\'un point par une homothetie avec cible auto-corrective'

/**
* Construction d'images par homothétie avec dispositif d'auto-correction aléatoire
* Ref 3G11
* @author Jean-Claude Lhote
* Publié le 30/11/2020
*/
export const uuid = '18e25'
export const ref = '3G11'
export default function ConstruireHomothetiePoint3e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 3
  this.typeExercice = 'IEP'

  this.nouvelleVersion = function (numeroExercice) {
    let nontrouve, assezloin, cible, s
    const anim = new Alea2iep()
    const k = randint(-4, 4, [0, -2, 2]) / 2
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let result = [0, 0]; let texteCorr = ''; const nbpoints = parseInt(this.sup)
    const celluleAlea = function (rang) {
      const lettre = lettreDepuisChiffre(randint(1, rang))
      const chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    const O = point(0, 0, 'O')
    const noms = choisitLettresDifferentes(nbpoints, 'QO', true)
    this.consigne = `Construire l'image des points $${noms[0]}$`
    for (let i = 1; i < nbpoints - 1; i++) {
      this.consigne += `, $${noms[i]}$`
    }
    this.consigne += ` et $${noms[nbpoints - 1]}$ par l'homothétie de centre $O$`
    this.consigne += ` et de rapport $${texNombre(k)}$.`
    const cibles = []; const M = []; const N = []; const objetsEnonce = []; const objetsCorrection = [] // cibles, M point marqués, N symétrique de M
    const cellules = []
    let xMin, yMin, xMax, yMax;
    [xMin, yMin, xMax, yMax] = [0, 0, 0, 0]
    for (let i = 0; i < nbpoints; i++) { // On place les cibles.
      N.push(point(randint(-60, 60, 0) / 10, randint(-60, 60, 0) / 10, noms[i] + "'"))
      nontrouve = true
      while (longueur(N[i], O) < 3 || nontrouve) {
        nontrouve = true
        if (longueur(N[i], O) < 3) {
          N[i].x = randint(-60, 60, 0) / 10
          N[i].y = randint(-60, 60, 0) / 10
        } else {
          assezloin = true
          for (let j = 0; j < i; j++) {
            if (longueur(N[i], N[j]) < 4.5) { assezloin = false }
          }
          if (assezloin === false) { // éloigner les points donc les grilles
            N[i].x = randint(-60, 60, 0) / 10
            N[i].y = randint(-60, 60, 0) / 10
          } else { nontrouve = false }
        }
      }
    }

    objetsEnonce.push(tracePoint(O), labelPoint(O))
    objetsCorrection.push(tracePoint(O), labelPoint(O))

    for (let i = 0; i < nbpoints; i++) {
      cellules.push(celluleAlea(4))
      result = dansLaCibleCarree(N[i].x, N[i].y, 4, 0.6, cellules[i])
      cible = cibleCarree({ x: result[0], y: result[1], rang: 4, num: i + 1, taille: 0.6, color: '#f15929' })
      cible.opacite = 0.7
      cibles.push(cible)
    }
    for (let i = 0; i < nbpoints; i++) {
      M.push(homothetie(N[i], O, 1 / k, noms[i]))

      objetsEnonce.push(tracePoint(M[i]), labelPoint(M[i]), cibles[i])
      objetsCorrection.push(tracePoint(M[i], N[i]), labelPoint(M[i], N[i]), cibles[i])
      if (k < 0) {
        s = segment(M[i], N[i])
      } else {
        if (k < 1) {
          s = segment(O, M[i])
        } else {
          s = segment(O, N[i])
        }
      }
      s.color = arcenciel(i)
      objetsCorrection.push(s)
      texteCorr += `$${noms[i]}'$, l'image du point $${noms[i]}$ est dans la case ${cellules[i]} de la grille ${i + 1}.<br>`
    }

    for (let i = 0; i < nbpoints; i++) {
      xMin = Math.min(xMin, N[i].x - 3, M[i].x - 3)
      yMin = Math.min(yMin, N[i].y - 3, M[i].y - 3)
      xMax = Math.max(xMax, N[i].x + 3, M[i].x + 3)
      yMax = Math.max(yMax, N[i].y + 3, M[i].y + 3)
    }
    context.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
    anim.xMin = xMin
    anim.xMax = xMax
    anim.yMin = yMin
    anim.yMax = yMax

    anim.recadre(xMin, yMax)

    anim.pointCreer(O)
    for (let i = 0; i < nbpoints; i++) {
      anim.pointCreer(M[i])
      anim.homothetiePoint(M[i], O, k, '', { positionTexte: { x: 2, y: -1 } })
    }
    this.listeQuestions.push(mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.5 }, objetsEnonce))
    this.listeCorrections.push(texteCorr + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.5 }, objetsCorrection) + (context.isHtml ? anim.html(numeroExercice) : ''))
    listeQuestionsToContenu(this)

    //  let nonchoisi,coords=[],x,y,objetsEnonce=[],objetsCorrection=[],nomd,label_pos
  }
  this.besoinFormulaireNumerique = ['Nombre de points (1 à 5)', 5]
  // this.besoinFormulaire2CaseACocher = ["Avec des points de part et d'autre"];
}
