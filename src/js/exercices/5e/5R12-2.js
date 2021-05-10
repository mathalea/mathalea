import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenuSansNumero, creerCouples, randint, shuffle, calcul, lettreDepuisChiffre, texNombre } from '../../modules/outils.js'
import { SVG_tracer_point, SVG_repere, Latex_repere } from '../../modules/macroSvgJs.js'
import { SVG } from '@svgdotjs/svg.js'

export const titre = 'Déterminer les coordonnées (relatives) d’un point'

/**
 * Lire les coordonnées d'un point du plan avec une précision allant de l'unité à 0,25.
 * @Auteur Jean-Claude Lhote
 * Références 5R12-2
 */
export default function Reperage_point_du_plan () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Donner les coordonnées des points représentés'
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1
  this.sup2 = true
  this.quart_de_plan = false
  this.listePackages = 'tkz-euclide'

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    let liste_points = []; let points = []
    let grille, w, h, k, xmin, xmax, ymin, ymax, shiftxnom, shiftynom
    h = Math.round(window.innerHeight * 0.7)
    w = h
    k = Math.pow(2, parseInt(this.sup) - 1)
    const nom = []
    grille = this.sup2
    if (this.quart_de_plan) {
      xmin = 0; ymin = 0; xmax = 10; ymax = 10
    } else {
      xmin = -5; ymin = -5; xmax = 5; ymax = 5
    }
    const liste_abs = []; const liste_ord = []
    for (let i = calcul(xmin + 1 / k); i < calcul(xmax - (parseInt(this.sup) - 1) / k); i = calcul(i + 1 / k)) {
      liste_abs.push(i)
    }
    for (let i = calcul(ymin + 1 / k); i < calcul(ymax - (parseInt(this.sup) - 1) / k); i = calcul(i + 1 / k)) {
      liste_ord.push(i)
    }
    let X0 = false; let Y0 = false
    liste_points = creerCouples(liste_abs, liste_ord, 10 * k)
    for (let j = 0; j < 5; j++) {
      points.push(liste_points[j])
      if (points[j][0] == 0) { X0 = true }
      if (points[j][1] == 0) { Y0 = true }
    }
    if (!X0) { points[0][0] = 0 }
    if (!Y0) { points[1][1] = 0 }
    points = shuffle(points)

    for (let l = 0, lettre = randint(1, 20); l < 5; l++) { nom.push(lettreDepuisChiffre(l + lettre)) }
    if (sortieHtml) {
      const id_unique = `${Date.now()}`
      const id_du_div = `div_svg${numeroExercice}${id_unique}`
      this.consigne = `<div id="${id_du_div}" style="height: ${h}px"></div>`
      if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé

      // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
      window.SVGExist[id_du_div] = setInterval(function () {
        if ($(`#${id_du_div}`).length) {
          $(`#${id_du_div}`).html('') // Vide le div pour éviter les SVG en doublon
          const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 520, 520).size('100%', '100%')
          const AxesXY = SVG_repere(mon_svg, xmin, xmax, ymin, ymax, k, k, 500, 500, grille)
          for (let i = 0; i < 5; i++) {
            if (points[i][0] == 0 || points[i][0] == 0.25) { shiftxnom = 20 } else { shiftxnom = 0 }
            shiftynom = 0
            if (points[i][1] == -0.5) { shiftynom = 10 }
            if (points[i][1] == -0.25) { shiftynom = 20 }
            SVG_tracer_point(mon_svg, calcul(20 + (points[i][0] - xmin) * 480 / (xmax - xmin)), calcul(480 - (points[i][1] - ymin) * 480 / (ymax - ymin)), nom[i], 'blue', -10 + shiftxnom, 10 + shiftynom, [true, AxesXY[0], AxesXY[1]])
          }
          clearInterval(SVGExist[id_du_div]) // Arrête le timer
        }
      }, 100) // Vérifie toutes les 100ms
    } else { // sortie Latex
      texte = '\\begin{tikzpicture}'
      texte += Latex_repere(xmin, xmax, ymin, ymax, k, k, grille)
      for (let i = 0; i < 5; i++) {
        texte += `\n\t \\tkzDefPoint(${points[i][0]},${points[i][1]}){A}`
        texte += '\n\t \\tkzDrawPoint[shape=cross out,color=blue,size=6](A)'
        texte += `\n\t \\tkzLabelPoint[above right=3pt,fill=white,fill opacity=0.7,text opacity=1,inner sep=0](A){$${nom[i]}$}`
      }
      texte += '\n\t \\end{tikzpicture}'
      this.listeQuestions.push(texte)

      texteCorr = '\\begin{tikzpicture}'
      texteCorr += Latex_repere(xmin, xmax, ymin, ymax, k, k, grille)
      for (let i = 0; i < 5; i++) {
        texteCorr += `\n\t \\tkzDefPoint(${points[i][0]},${points[i][1]}){A}`
        texteCorr += '\n\t \\tkzDrawPoint[shape=cross out,color=blue,size=6](A)'
        texteCorr += `\n\t \\tkzLabelPoint[above right=3pt,fill=white,fill opacity=0.7,text opacity=1,inner sep=0](A){$${nom[i]}$}`
        texteCorr += '\n\t \\tkzPointShowCoord(A)'
      }
      texteCorr += '\n\t \\end{tikzpicture}'
      this.listeCorrections.push(texteCorr)
    }

    texte = 'Déterminer les coordonnées des points'
    texteCorr = 'Les coordonnées des points sont :<br>'
    for (let i = 0; i < 4; i++) {
      texte += ` $${nom[i]}$,`
      texteCorr += ` $${nom[i]}(${texNombre(points[i][0])};${texNombre(points[i][1])})$, `
    }
    texte += ` $${nom[4]}$.`
    texteCorr += ` $${nom[4]}(${texNombre(points[4][0])};${texNombre(points[4][1])})$.`
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, "1 : Coordonnées entières\n2 : Coordonnées 'en demis'\n3 : Coordonnées 'en quarts'"]
  this.besoinFormulaire2CaseACocher = ['Grille de lecture']
}
