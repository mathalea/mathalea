import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { calcul, arrondi, htmlConsigne, lettreDepuisChiffre, combinaisonListes, listeQuestionsToContenu, randint, stringNombre, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { droiteGraduee2, mathalea2d } from '../../modules/2d.js'

export const titre = 'Lire labscisse décimale dun point (niveau 2)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDeModificationImportante = '01/02/2022'

/**
 * Exercice calqué sur lire abscisse fractionnaire sauf que le résultat attendu est en écriture décimale.
 * demis, quart, cinquièmes dixièmes et centièmes
 * @author Jean-Claude Lhote
 * Référence 6N30-1
 */
export default function LireAbscisseDecimaleBis2d () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Lire labscisse de chacun des points suivants et donner le résultat sous la forme dun nombre en écriture décimale.'
  this.nbQuestions = 3
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = '1-2-3-4-5-6'
  this.interactif = false
  this.niveau = 6

  this.nouvelleVersion = function (numeroExercice) {
    // numeroExercice est 0 pour l'exercice 1
    let QuestionsDisponibles
    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = [1, 2, 3, 4, 5, 6]
    } else {
      if (this.sup instanceof Number) { // Si c'est un nombre c'est qu'il y a qu'un type de question
        QuestionsDisponibles = Array(this.nbQuestion).fill(parseInt(this.sup))
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(1, 6, parseInt(QuestionsDisponibles[i])) // parseInt en fait un entiers
        }
      }
    }

    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    const typesDeQuestions = combinaisonListes(QuestionsDisponibles, this.nbQuestions)
    const d = []
    this.contenu = htmlConsigne(this.consigne)
    for (let i = 0, abs0, l1, l2, l3, x1, x2, x3, x11, x22, x33, xA, xB, xC, pas1, pas2, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      l1 = lettreDepuisChiffre(i * 3 + 1)
      l2 = lettreDepuisChiffre(i * 3 + 2)
      l3 = lettreDepuisChiffre(i * 3 + 3)
      if (context.isAmc) {
        this.autoCorrection[i] = { propositions: [{ statut: 4, feedback: '' }] }
      }
      switch (typesDeQuestions[i]) {
        case 3:
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 2
          break
        case 4: // Placer des quarts sur un axe
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 4
          break

        case 5: // Placer des cinquièmes
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 5
          break

        case 6: // Placer des huitièmes
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 8
          break

        case 1: // Placer des
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 10
          break
        case 2: // Placer des centièmes
          abs0 = this.niveau === 2 ? arrondi(randint(-80, 80) / 10, 1) : arrondi(randint(0, 50) / 10, 1)
          pas1 = 10
          pas2 = 10
          break
      }
      x1 = randint(0, 1)
      x2 = randint(2, 3)
      x3 = randint(4, 5)
      x11 = randint(1, pas2 - 1)
      x22 = randint(1, pas2 - 1)
      x33 = randint(1, pas2 - 1)

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
        labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(calcul(abs0 + 1 / pas1))}`]],
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
          [0, `${stringNombre(abs0)}`],
          [xA, stringNombre(calcul(xA / pas1 + abs0))],
          [xB, stringNombre(calcul(xB / pas1 + abs0))],
          [xC, stringNombre(calcul(xC / pas1 + abs0))]
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
  this.besoinFormulaireTexte = [
    'Choix des subdivisions',
    'Nombres séparés par des tirets\n1 : dixièmes\n2 : Centièmes\n3 : Demis\n4 : Quarts\n5 : cinquièmes\n6 : huitièmes'
  ]
}
