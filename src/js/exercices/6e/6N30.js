import { combinaisonListes, listeQuestionsToContenu, randint, calcul, htmlConsigne, lettreDepuisChiffre, texNombre } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { droiteGraduee2, mathalea2d } from '../../modules/2d.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'

export const titre = 'Lire l’abscisse décimale d’un point'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
 * Lire l'abscisse décimale d'un point
 * @author Jean-Claude Lhote et Rémi Angot
 * référence 6N30
 */
export default function LireAbscisseDecimale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Lire l'abscisse de chacun des points suivants."
  this.nbQuestions = 3
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1
  this.listePackages = 'tkz-euclide'
  this.interactif = false
  this.nouvelleVersion = function (numeroExercice) {
    this.autoCorrection = []
    // numeroExercice est 0 pour l'exercice 1
    let typesDeQuestions
    this.listeQuestions = []
    this.listeCorrections = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    if (parseInt(this.sup) === 4) { typesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions) } else {
      typesDeQuestions = combinaisonListes(
        [parseInt(this.sup)],
        this.nbQuestions
      )
    }

    this.contenu = htmlConsigne(this.consigne)
    for (let i = 0, d = [], abs0, l1, l2, l3, x1, x2, x3, x11, x22, x33, xA, xB, xC, pas1, pas2, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      l1 = lettreDepuisChiffre(i * 3 + 1)
      l2 = lettreDepuisChiffre(i * 3 + 2)
      l3 = lettreDepuisChiffre(i * 3 + 3)
      this.autoCorrection[3 * i] = { propositions: [{ statut: 4, feedback: '' }] }
      this.autoCorrection[3 * i + 1] = { propositions: [{ statut: 4, feedback: '' }] }
      this.autoCorrection[3 * i + 2] = { propositions: [{ statut: 4, feedback: '' }] }
      switch (typesDeQuestions[i]) {
        case 1: // Placer des décimaux sur un axe (1 décimale)
          abs0 = randint(0, 9)
          pas1 = 1
          pas2 = 10
          break

        case 2: // Placer des décimaux sur un axe (2 décimales)
          abs0 = randint(0, 90) / 10
          pas1 = 10
          pas2 = 10
          break

        case 3: // Placer des décimaux sur un axe (3 décimales)
          abs0 = randint(0, 990) / 100
          pas1 = 100
          pas2 = 10
          break
      }
      x1 = randint(0, 2)
      x2 = randint(3, 4)
      x3 = randint(5, 6)
      x11 = randint(1, 9)
      x22 = randint(1, 9)
      x33 = randint(1, 3)
      xA = calcul(x1 + x11 / pas2)
      xB = calcul(x2 + x22 / pas2)
      xC = calcul(x3 + x33 / pas2)
      d[2 * i] = droiteGraduee2({
        Unite: 4,
        Min: 0,
        Max: 7.1,
        axeStyle: '->',
        pointTaille: 5,
        pointStyle: 'x',
        labelsPrincipaux: false,
        thickSec: true,
        thickSecDist: 1 / pas2,
        labelListe: [[0, `${texNombre(abs0)}`], [1, `${texNombre(calcul(abs0 + 1 / pas1))}`]],
        pointListe: [[xA, l1], [xB, l2], [xC, l3]]
      })
      d[2 * i + 1] = droiteGraduee2({
        Unite: 4,
        Min: 0,
        Max: 7.1,
        axeStyle: '->',
        pointTaille: 5,
        pointStyle: 'x',
        labelsPrincipaux: false,
        thickSec: true,
        thickSecDist: 1 / pas2,
        labelListe: [
          [0, `${texNombre(abs0)}`],
          [xA, texNombre(calcul(xA / pas1 + abs0))],
          [xB, texNombre(calcul(xB / pas1 + abs0))],
          [xC, texNombre(calcul(xC / pas1 + abs0))]
        ],
        pointListe: [[xA, l1], [xB, l2], [xC, l3]]

      })

      texte = mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1, pixelsParCm: 20, scale: 0.5 }, d[2 * i])
      texteCorr = mathalea2d({ xmin: -2, ymin: -2, xmax: 30, ymax: 2, pixelsParCm: 20, scale: 0.5 }, d[2 * i + 1])

      if (this.interactif && context.isHtml) {
        setReponse(this, 3 * i, calcul(xA / pas1 + abs0))
        setReponse(this, 3 * i + 1, calcul(xB / pas1 + abs0))
        setReponse(this, 3 * i + 2, calcul(xC / pas1 + abs0))
        texte += l1 + ajouteChampTexteMathLive(this, 3 * i)
        texte += l2 + ajouteChampTexteMathLive(this, 3 * i + 1)
        texte += l3 + ajouteChampTexteMathLive(this, 3 * i + 2)
      } else {
        if (context.isAmc) {
          this.autoCorrection[i].enonce = texte
          this.autoCorrection[i].propositions[0].texte = texteCorr
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
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    4,
    '1 : Un chiffre après la virgule\n2 : Deux chiffres après la virgule \n3 : Trois chiffres après la virgule\n4 : Mélange'
  ]
}
