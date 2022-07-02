import { mathalea2d, repere2, traceBarreHorizontale } from '../../../modules/2d.js'
import { prenom, randint } from '../../../modules/outils'
import Exercice from '../../Exercice.js'
export const titre = 'Lire un diagramme en barres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can6S01
 */
export default function LectureDiagrammeBarre () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  const valeurs = [['fruits', 'une corbeille', ['bananes', 'oranges', 'pommes']],
    ['voitures', 'un garage', ['berline', 'utilitaire', 'cross over']],
    ['vêtements', 'une armoire', ['chemises', 'T-shirts', 'pulls']]]
  const quidam = prenom()
  this.nouvelleVersion = function () {
    const objets = []

    const n = randint(0, 2)
    const a = randint(2, 10)
    const b = randint(2, 10, a)
    const c = randint(2, 10, [a, b])
    const r = repere2({
      grilleX: 'pointilles',
      grilleY: false,
      yThickListe: [],
      yLabelListe: [],
      xUnite: 1,
      xThickDistance: 1,
      yMax: 5,
      xMin: 0,
      xMax: 11,
      yMin: 0,
      axeYSyle: '',
      axeXStyle: '->',
      xLegende: `${valeurs[n][0]}`
    })
    objets.push(r)
    objets.push(traceBarreHorizontale(a, 1, valeurs[n][2][0], { epaisseur: 1, couleurDeRemplissage: 'blue', hachures: true }),
      traceBarreHorizontale(b, 2.5, valeurs[n][2][1], { epaisseur: 1, couleurDeRemplissage: 'red', hachures: true }),
      traceBarreHorizontale(c, 4, valeurs[n][2][2], { epaisseur: 1, couleurDeRemplissage: 'green', hachures: true }))
    this.reponse = a + b + c
    this.question = `${quidam} a compté les ${valeurs[n][0]} dans ${valeurs[n][1]}. Les effectifs sont représentés sur le diagramme ci-dessous.<br>`
    this.question += mathalea2d({ xmin: -5, xmax: 17, ymin: -1, ymax: 6, scale: 0.4 }, objets)
    this.question += `<br> Combien y a-t-il de ${valeurs[n][0]} en tout ?`
    this.correction = `Il y a $${a}+${b}+${c} = ${this.reponse}$ ${valeurs[n][0]} en tout.`
  }
}
