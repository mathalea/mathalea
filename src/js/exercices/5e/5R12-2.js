import Exercice from '../Exercice.js'
import { listeQuestionsToContenuSansNumero, creerCouples, randint, calcul, lettreDepuisChiffre, texNombre, shuffle2tableaux } from '../../modules/outils.js'
import { mathalea2d, point, repere, labelPoint, tracePoint } from '../../modules/2d.js'

export const titre = 'Déterminer les coordonnées (relatives) d\'un point'

/**
 * Lire les coordonnées d'un point du plan avec une précision allant de l'unité à 0,25.
 * @author Jean-Claude Lhote
 * Références 5R12-2
 */
export default function ReperagePointDuPlan () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1
  this.sup2 = true
  this.quartDePlan = false
  this.listePackages = 'tkz-euclide'

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let texte, texteCorr
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    let listePoints = []
    const points = []
    let xmin, xmax, ymin, ymax
    const k = Math.pow(2, parseInt(this.sup) - 1)
    const nom = []
    const objets2d = []
    if (this.quartDePlan) {
      xmin = 0; ymin = 0; xmax = 10; ymax = 10
    } else {
      xmin = -5; ymin = -5; xmax = 5; ymax = 5
    }
    const listeAbs = []; const listeOrd = []
    for (let i = calcul(xmin + 1 / k); i < calcul(xmax - (parseInt(this.sup) - 1) / k); i = calcul(i + 1 / k)) {
      listeAbs.push(i)
    }
    for (let i = calcul(ymin + 1 / k); i < calcul(ymax - (parseInt(this.sup) - 1) / k); i = calcul(i + 1 / k)) {
      listeOrd.push(i)
    }
    let X0 = false; let Y0 = false
    listePoints = creerCouples(listeAbs, listeOrd, 10 * k)
    for (let l = 0, lettre = randint(1, 20); l < 5; l++) {
      nom.push(lettreDepuisChiffre(l + lettre))
    } for (let j = 0; j < 5; j++) {
      points.push(point(listePoints[j][0], listePoints[j][1], nom[j], 'above left'))
      if (points[j].x === 0) { X0 = true }
      if (points[j].y === 0) { Y0 = true }
    }
    if (!X0) { points[0].x = 0 }
    if (!Y0) { points[1].y = 0 }
    shuffle2tableaux(points, nom)

    texte = 'Déterminer les coordonnées des points'
    texteCorr = 'Les coordonnées des points sont :<br>'
    for (let i = 0; i < 4; i++) {
      texte += ` $${nom[i]}$,`
      texteCorr += ` $${nom[i]}(${texNombre(points[i].x)};${texNombre(points[i].y)})$, `
    }
    texte += ` $${nom[4]}$.<br>`
    texteCorr += ` $${nom[4]}(${texNombre(points[4].x)};${texNombre(points[4].y)})$.`
    if (this.sup2) {
      objets2d.push(repere({
        xMin: xmin - 1,
        yMin: ymin - 1,
        xMax: xmax + 1,
        yMax: ymax + 1,
        grilleSecondaire: true,
        grilleSecondaireDistance: 1 / k,
        grilleSecondaireXMin: xmin - 1,
        grilleSecondaireYMin: ymin - 1,
        grilleSecondaireXMax: xmax + 1,
        grilleSecondaireYMax: ymax + 1
      }))
    } else {
      objets2d.push(repere({ xMin: xmin - 1, yMin: ymin - 1, xMax: xmax + 1, yMax: ymax + 1 }))
    }
    for (let i = 0; i < 5; i++) {
      objets2d.push(points[i], tracePoint(points[i], 'red'), labelPoint(points[i]))
    }
    texte += '<br>' + mathalea2d({ xmin: xmin - 1, ymin: ymin - 1, xmax: xmax + 1, ymax: ymax + 1, pixelsParCm: 30, scale: 0.75 }, objets2d)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, "1 : Coordonnées entières\n2 : Coordonnées 'en demis'\n3 : Coordonnées 'en quarts'"]
  this.besoinFormulaire2CaseACocher = ['Grille de lecture']
}
