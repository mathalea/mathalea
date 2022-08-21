import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, lettreDepuisChiffre, arrondi, texNombre, sp, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale } from '../../modules/outils.js'
import { droiteGraduee2, labelPoint, point, tracePoint } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Lire l\'abscisse relative d\'un point'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
* Lire l'abscisse décimale d'un point
* @author Jean-Claude Lhote et Rémi Angot
* Référence 5R11
*/
export default function LireAbscisseRelative () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Lire l'abscisse de chacun des points suivants."
  this.nbQuestions = 3
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 4
  this.listePackages = 'tkz-euclide'
  const changeCoord = function (x, abs0, pas1) {
    return (abs0 + (x - abs0) * 3 * pas1)
  }

  this.nouvelleVersion = function (numeroExercice) {
    let typesDeQuestions
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let objets = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    if (this.sup === 4) { typesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions) } else { typesDeQuestions = combinaisonListes([parseInt(this.sup)], this.nbQuestions) }

    for (let i = 0, abs0, l1, l2, l3, x1, x2, x3, x11, x22, x33, pas1, pas2, abs1, abs2, abs3, A, B, C, texte, texteCorr; i < this.nbQuestions; i++) {
      objets = []
      l1 = lettreDepuisChiffre(i * 3 + 1)
      l2 = lettreDepuisChiffre(i * 3 + 2)
      l3 = lettreDepuisChiffre(i * 3 + 3)
      switch (typesDeQuestions[i]) {
        case 1: // Placer des décimaux relatifs sur un axe (1 décimale)
          abs0 = randint(-6, -3)
          pas1 = 1
          pas2 = 10
          break

        case 2: // Placer des décimaux relatifs sur un axe (2 décimales)
          abs0 = calcul(randint(-4, -2) / 10)
          pas1 = 10
          pas2 = 10
          break

        case 3: // Placer des décimaux relatifs sur un axe (3 décimales)
          abs0 = calcul(randint(-6, -2) / 100)
          pas1 = 100
          pas2 = 10
          break
      }
      x1 = randint(0, 2); x2 = randint(3, 4); x3 = randint(5, 6)
      x11 = randint(1, 9); x22 = randint(1, 9); x33 = randint(1, 3)
      abs1 = arrondi(abs0 + x1 / pas1 + x11 / pas1 / pas2, typesDeQuestions[i]) // le type de questions est égal au nombre de décimales.
      abs2 = arrondi(abs0 + x2 / pas1 + x22 / pas1 / pas2, typesDeQuestions[i])
      abs3 = arrondi(abs0 + x3 / pas1 + x33 / pas1 / pas2, typesDeQuestions[i])
      objets.push(droiteGraduee2({
        Unite: 3 * pas1,
        Min: abs0,
        Max: abs0 + 6.9 / pas1,
        x: abs0,
        y: 0,
        thickSecDist: 1 / pas2 / pas1,
        thickSec: true,
        labelsPrincipaux: true,
        thickDistance: 1 / pas1
      }))

      A = point(changeCoord(abs1, abs0, pas1), 0, l1, 'above')
      B = point(changeCoord(abs2, abs0, pas1), 0, l2, 'above')
      C = point(changeCoord(abs3, abs0, pas1), 0, l3, 'above')
      objets.push(tracePoint(A, B, C), labelPoint(A, B, C))

      texte = mathalea2d({ xmin: abs0 - 0.5, xmax: abs0 + 22, ymin: -1, ymax: 1, scale: 0.75 }, objets)
      if (!context.isAmc && this.interactif) {
        texte += `${l1}(` + ajouteChampTexteMathLive(this, 3 * i, 'largeur10 inline', { texteApres: '  )' }) + sp(20)
        texte += ajouteChampTexteMathLive(this, 3 * i + 1, 'largeur10 inline', { texte: `${l2}(`, texteApres: '  )' }) + sp(20)
        texte += ajouteChampTexteMathLive(this, 3 * i + 2, 'largeur10 inline', { texte: `${l3}(`, texteApres: '  )' })
        setReponse(this, 3 * i, abs1)
        setReponse(this, 3 * i + 1, abs2)
        setReponse(this, 3 * i + 2, abs3)
      } else {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [
            {
              type: 'AMCNum',
              propositions: [{
                texte: texteCorr,
                statut: '',
                reponse: {
                  texte: `abscisse de ${l1}`,
                  valeur: abs1,
                  param: {
                    digits: nombreDeChiffresDe(abs1),
                    decimals: nombreDeChiffresDansLaPartieDecimale(abs1),
                    signe: true,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: `abscisse de ${l2}`,
                  valeur: abs2,
                  param: {
                    digits: nombreDeChiffresDe(abs2),
                    decimals: nombreDeChiffresDansLaPartieDecimale(abs2),
                    signe: true,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: `abscisse de ${l3}`,
                  valeur: abs3,
                  param: {
                    digits: nombreDeChiffresDe(abs3),
                    decimals: nombreDeChiffresDansLaPartieDecimale(abs3),
                    signe: true,
                    approx: 0
                  }
                }
              }]
            }
          ]
        }
      }
      texteCorr = mathalea2d({ xmin: abs0 - 0.5, xmax: abs0 + 22, ymin: -1, ymax: 1, scale: 0.75 },
        droiteGraduee2({
          Unite: 3 * pas1,
          Min: abs0,
          Max: abs0 + 6.9 / pas1,
          x: abs0,
          y: 0,
          thickSecDist: 1 / pas2 / pas1,
          thickSec: true,
          labelsPrincipaux: true,
          thickDistance: 1 / pas1,
          labelPointTaille: 10,
          labelPointLargeur: 20 + 5 * typesDeQuestions[i],
          pointListe: [[abs1, `${l1}(${texNombre(abs1)})`], [abs2, `${l2}(${texNombre(abs2)})`], [abs3, `${l3}(${texNombre(abs3)})`]]
        }))
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Nombre relatif à une décimale\n2 : Nombre relatif à deux décimales\n3 : Nombre relatif à trois décimales\n4 : Mélange']
}
