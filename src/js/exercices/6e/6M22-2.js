/* eslint-disable camelcase */
import { pointAdistance, point, mathalea2d, arc, codeSegments, rotation, afficheLongueurSegment } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, arrondi, texNombre, calcul } from '../../modules/outils.js'

export const titre = 'Calculer périmètre et aire de portions de cercles/disques'

/**
 * 3 figures sont données, 1 quart de disque, un demi-disque et un 3-quarts de disque
 * * 1 : Calculer les périmètres
 * * 2 : Calculer les aires
 * * 3 : Calculer les périmètres et aires
 * Pas de version LaTeX
 * @author Rémi Angot
 * Rééférence 6M22-2
 */
export default function Perimetre_aire_et_portions_de_disques (pa = 3) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne =
    "Calculer le périmètre et l'aire de chacune des figures suivantes"
  this.sup = 3 // 1 : périmètre, 2 : aire, 3 : périmètres et aires
  this.spacing = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  // eslint-disable-next-line no-undef
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false

  this.nouvelleVersion = function (numeroExercice) {
    this.sup = parseInt(this.sup)
    this.listeCorrections = [] // Liste de questions corrigées
    this.listeQuestions = []
    this.autoCorrection = []
    const objetsEnonce = []
    let params
    const C1 = point(5, 10)
    const C2 = point(15, 10)
    const C3 = point(10, 5)
    let A1, B1, A2, B2, A3, B3
    let quartDeDisque, demiDisque, troisQuartDeDisque
    const r = randint(2, 5)
    const r2 = randint(2, 5, r)
    const r3 = randint(2, 5, [r, r2])
    const figure = randint(1, 2)
    let texteCorr
    if (this.sup === 1) {
      this.consigne = 'Calculer le périmètre de chacune des figures suivantes.'
    }
    if (this.sup === 2) {
      this.consigne = "Calculer l'aire de chacune des figures suivantes."
    }

    if (figure === 1) {
      params = { xmin: 4, ymin: -1, xmax: 20, ymax: 15, pixelsParCm: 20, scale: 0.75, mainlevee: false }
      A1 = pointAdistance(C1, r, 0)
      A2 = pointAdistance(C2, r2, 0)
      A3 = pointAdistance(C3, r3, 0)
      B1 = rotation(A1, C1, 90)
      B2 = rotation(A2, C2, 180)
      B3 = rotation(A3, C3, 270)
      quartDeDisque = arc(A1, C1, 90, true, 'white', 'black', 0.2)
      demiDisque = arc(A2, C2, 180, true, 'white', 'black', 0.2)
      troisQuartDeDisque = arc(A3, C3, 270, true, 'white', 'black', 0.2)
      objetsEnonce.push(quartDeDisque, demiDisque, troisQuartDeDisque,
        codeSegments('//', 'blue', A1, C1, C1, B1), codeSegments('O', 'green', A3, C3, C3, B3),
        afficheLongueurSegment(A1, C1), afficheLongueurSegment(A2, B2), afficheLongueurSegment(A3, C3))

      if (this.sup === 1) {
        // si on ne demande pas les aires
        texteCorr = `La première figure est un quart de disque, son périmètre est composé d'un quart de cercle de rayon ${r} cm et de 2 rayons qui ferment la figure.<br>`
        texteCorr += `$\\mathcal{P}_1=\\dfrac{1}{4}\\times2\\times${r}\\times\\pi+${r}+${r}=${texNombre(
          calcul(r / 2)
        )}\\pi+${2 * r}\\approx${texNombre(
          arrondi(calcul((r / 2) * Math.PI + 2 * r), 1)
        )}$ cm<br>`
        texteCorr += `La deuxième figure est un demi-disque, son périmètre est composé d'un demi-cercle de diamètre ${2 * r2
          } cm et d'un diamètre qui ferme la figure.<br>`
        texteCorr += `$\\mathcal{P}_2=\\dfrac{1}{2}\\times${2 * r2
          }\\times\\pi+${2 * r2}=${r2}\\pi+${2 * r2}\\approx${texNombre(
            arrondi(calcul(r2 * Math.PI + 2 * r2), 1)
          )}$ cm<br>`
        texteCorr += `La troisième figure est trois quarts d'un disque, son périmètre est composé de trois quarts d'un cercle de rayon ${r3} cm et 2 rayons qui ferment la figure.<br>`
        texteCorr += `$\\mathcal{P}_3=\\dfrac{3}{4}\\times2\\times${r3}\\times\\pi+${r3}+${r3}=${texNombre(
          calcul((6 * r3) / 4)
        )}\\pi+${2 * r3}\\approx${texNombre(
          arrondi(calcul(((6 * r3) / 4) * Math.PI + 2 * r3), 1)
        )}$ cm<br>`
      }

      if (this.sup === 2) {
        texteCorr = `La première figure est un quart de disque de rayon ${r} cm.<br>`
        texteCorr += `$\\mathcal{A}_1=\\dfrac{1}{4}\\times${r}\\times${r}\\times\\pi=${texNombre(
          calcul((r * r) / 4)
        )}\\pi\\approx${texNombre(
          arrondi(calcul(((r * r) / 4) * Math.PI), 1)
        )}~\\text{cm}^2$<br>`
        texteCorr += `La deuxième figure est la moitié d'un disque de diamètre ${2 * r2
          } cm donc de ${r2} cm de rayon.<br>`
        texteCorr += `$\\mathcal{A}_2=\\dfrac{1}{2}\\times${r2}\\times${r2}\\times\\pi=${texNombre(
          calcul((r2 * r2) / 2)
        )}\\pi\\approx${texNombre(
          arrondi(calcul(((r2 * r2) / 2) * Math.PI), 1)
        )}~\\text{cm}^2$<br>`
        texteCorr += `La troisième figure est trois quarts d'un disque de rayon ${r3} cm.<br>`
        texteCorr += `$\\mathcal{A}_3=\\dfrac{3}{4}\\times${r3}\\times${r3}\\times\\pi=${texNombre(
          calcul((3 / 4) * r3 * r3)
        )}\\pi\\approx${texNombre(
          arrondi(calcul((3 / 4) * r3 * r3 * Math.PI), 1)
        )}~\\text{cm}^2$`
      }

      if (this.sup === 3) {
        texteCorr = `La première figure est un quart de disque, son périmètre est composé d'un quart de cercle de rayon ${r} cm et de 2 rayons qui ferment la figure.<br>`
        texteCorr += `$\\mathcal{P}_1=\\dfrac{1}{4}\\times2\\times${r}\\times\\pi+${r}+${r}=${texNombre(
          calcul(r / 2)
        )}\\pi+${2 * r}\\approx${texNombre(
          arrondi(calcul((r / 2) * Math.PI + 2 * r), 1)
        )}$ cm<br>`
        texteCorr += `La deuxième figure est un demi-disque, son périmètre est composé d'un demi-cercle de diamètre ${2 * r2
          } cm et d'un diamètre qui ferme la figure.<br>`
        texteCorr += `$\\mathcal{P}_2=\\dfrac{1}{2}\\times${2 * r2
          }\\times\\pi+${2 * r2}=${r2}\\pi+${2 * r2}\\approx${texNombre(
            arrondi(calcul(r2 * Math.PI + 2 * r2), 1)
          )}$ cm<br>`
        texteCorr += `La troisième figure est trois quarts d'un disque, son périmètre est composé de trois quarts d'un cercle de rayon ${r3} cm et 2 rayons qui ferment la figure.<br>`
        texteCorr += `$\\mathcal{P}_3=\\dfrac{3}{4}\\times2\\times${r3}\\times\\pi+${r3}+${r3}=${texNombre(
          calcul((6 * r3) / 4)
        )}\\pi+${2 * r3}\\approx${texNombre(
          arrondi(calcul(((6 * r3) / 4) * Math.PI + 2 * r3), 1)
        )}$ cm<br>`
        texteCorr += `La première figure est un quart de disque de rayon ${r} cm.<br>`
        texteCorr += `$\\mathcal{A}_1=\\dfrac{1}{4}\\times${r}\\times${r}\\times\\pi=${texNombre(
          calcul((r * r) / 4)
        )}\\pi\\approx${texNombre(
          arrondi(calcul(((r * r) / 4) * Math.PI), 1)
        )}~\\text{cm}^2$<br>`
        texteCorr += `La deuxième figure est la moitié d'un disque de diamètre ${2 * r2
          } cm donc de ${r2} cm de rayon.<br>`
        texteCorr += `$\\mathcal{A}_2=\\dfrac{1}{2}\\times${r2}\\times${r2}\\times\\pi=${texNombre(
          calcul((r2 * r2) / 2)
        )}\\pi\\approx${texNombre(
          arrondi(calcul(((r2 * r2) / 2) * Math.PI), 1)
        )}~\\text{cm}^2$<br>`
        texteCorr += `La troisième figure est trois quarts d'un disque de rayon ${r3} cm.<br>`
        texteCorr += `$\\mathcal{A}_3=\\dfrac{3}{4}\\times${r3}\\times${r3}\\times\\pi=${texNombre(
          calcul((3 / 4) * r3 * r3)
        )}\\pi\\approx${texNombre(
          arrondi(calcul((3 / 4) * r3 * r3 * Math.PI), 1)
        )}~\\text{cm}^2$`
      }
    } else {
      params = { xmin: 4, ymin: -1, xmax: 20, ymax: 15, pixelsParCm: 20, scale: 0.75, mainlevee: false }
      A1 = pointAdistance(C1, r, 0)
      A2 = pointAdistance(C2, r2, 180)
      A3 = pointAdistance(C3, r3, 0)
      B1 = rotation(A1, C1, 90)
      B2 = rotation(A2, C2, 270)
      B3 = rotation(A3, C3, 180)
      quartDeDisque = arc(A1, C1, 90, true, 'white', 'black', 0.2)
      demiDisque = arc(A3, C3, -180, true, 'white', 'black', 0.2)
      troisQuartDeDisque = arc(A2, C2, 270, true, 'white', 'black', 0.2)
      objetsEnonce.push(quartDeDisque, demiDisque, troisQuartDeDisque,
        codeSegments('//', 'blue', A1, C1, C1, B1), codeSegments('O', 'green', A2, C2, C2, B2),
        afficheLongueurSegment(A1, C1), afficheLongueurSegment(B3, A3), afficheLongueurSegment(A2, C2))
      texteCorr = `La première figure est un quart de cercle de rayon ${r} cm auquel il faut ajouter les 2 rayons qui ferment la figure.<br>`

      if (this.sup === 1) {
        texteCorr = `La première figure est un quart de disque, son périmètre est composé d'un quart de cercle de rayon ${r} cm et de 2 rayons qui ferment la figure.<br>`
        texteCorr += `$\\mathcal{P}_1=\\dfrac{1}{4}\\times2\\times${r}\\times\\pi+${r}+${r}=${texNombre(
          calcul(r / 2)
        )}\\pi+${2 * r}\\approx${texNombre(
          arrondi(calcul((r / 2) * Math.PI + 2 * r), 1)
        )}$ cm<br>`
        texteCorr += `La deuxième figure est trois quarts d'un disque, son périmètre est composé de trois quarts d'un cercle de rayon ${r2} cm et 2 rayons qui ferment la figure.<br>`
        texteCorr += `$\\mathcal{P}_2=\\dfrac{3}{4}\\times2\\times${r2}\\times\\pi+${r2}+${r2}=${texNombre(
          (6 / 4) * r2
        )}\\pi+${2 * r2}\\approx${texNombre(
          arrondi(calcul((6 / 4) * r2 * Math.PI + 2 * r2), 1)
        )}$ cm<br>`
        texteCorr += `La troisième figure est un demi-disque, son périmètre est composé d'un demi-cercle de diamètre ${2 * r3
          } cm et d'un diamètre qui ferme la figure.<br>`
        texteCorr += `$\\mathcal{P}_3=\\dfrac{1}{2}\\times${2 * r3
          }\\times\\pi+${2 * r3}=${r3}\\pi+${2 * r3}\\approx${texNombre(
            arrondi(calcul(r3 * Math.PI + 2 * r3), 1)
          )}$ cm<br>`
      }

      if (this.sup === 2) {
        texteCorr = `La première figure est un quart de disque de rayon ${r} cm.<br>`
        texteCorr += `$\\mathcal{A}_1=\\dfrac{1}{4}\\times${r}\\times${r}\\times\\pi=${texNombre(
          calcul((r * r) / 4)
        )}\\pi\\approx${texNombre(
          arrondi(calcul(((r * r) / 4) * Math.PI), 1)
        )}~\\text{cm}^2$<br>`
        texteCorr += `La deuxième figure est trois quarts d'un disque rayon ${r2} cm.<br>`
        texteCorr += `$\\mathcal{A}_2=\\dfrac{3}{4}\\times${r2}\\times${r2}\\times\\pi=${texNombre(
          (3 / 4) * r2 * r2
        )}\\pi\\approx${texNombre(
          arrondi(calcul((3 / 4) * r2 * r2 * Math.PI), 1)
        )}~\\text{cm}^2$<br>`
        texteCorr += `La troisième figure est un demi-cercle de diamètre ${2 * r3
          } cm donc de rayon ${r3} cm.<br>`
        texteCorr += `$\\mathcal{A}_3=\\dfrac{1}{2}\\times${r3}\\times${r3}\\times\\pi=${(r3 * r3) / 2
          }\\pi\\approx${texNombre(
            arrondi(calcul(((r3 * r3) / 2) * Math.PI), 1)
          )}~\\text{cm}^2$<br>`
      }

      if (this.sup === 3) {
        texteCorr = `La première figure est un quart de disque, son périmètre est composé d'un quart de cercle de rayon ${r} cm et de 2 rayons qui ferment la figure.<br>`
        texteCorr += `$\\mathcal{P}_1=\\dfrac{1}{4}\\times2\\times${r}\\times\\pi+${r}+${r}=${texNombre(
          calcul(r / 2)
        )}\\pi+${2 * r}\\approx${texNombre(
          arrondi(calcul((r / 2) * Math.PI + 2 * r), 1)
        )}$ cm<br>`
        texteCorr += `La deuxième figure est trois quarts d'un disque, son périmètre est composé de trois quarts d'un cercle de rayon ${r2} cm et 2 rayons qui ferment la figure.<br>`
        texteCorr += `$\\mathcal{P}_2=\\dfrac{3}{4}\\times2\\times${r2}\\times\\pi+${r2}+${r2}=${texNombre(
          (6 / 4) * r2
        )}\\pi+${2 * r2}\\approx${texNombre(
          arrondi(calcul((6 / 4) * r2 * Math.PI + 2 * r2), 1)
        )}$ cm<br>`
        texteCorr += `La troisième figure est un demi-disque, son périmètre est composé d'un demi-cercle de diamètre ${2 * r3
          } cm et d'un diamètre qui ferme la figure.<br>`
        texteCorr += `$\\mathcal{P}_3=\\dfrac{1}{2}\\times${2 * r3
          }\\times\\pi+${2 * r3}=${r3}\\pi+${2 * r3}\\approx${texNombre(
            arrondi(calcul(r3 * Math.PI + 2 * r3), 1)
          )}$ cm<br>`
        texteCorr += `La première figure est un quart de disque de rayon ${r} cm.<br>`
        texteCorr += `$\\mathcal{A}_1=\\dfrac{1}{4}\\times${r}\\times${r}\\times\\pi=${texNombre(
          calcul((r * r) / 4)
        )}\\pi\\approx${texNombre(
          arrondi(calcul(((r * r) / 4) * Math.PI), 1)
        )}~\\text{cm}^2$<br>`
        texteCorr += `La deuxième figure est trois quarts d'un disque rayon ${r2} cm.<br>`
        texteCorr += `$\\mathcal{A}_2=\\dfrac{3}{4}\\times${r2}\\times${r2}\\times\\pi=${texNombre(
          (3 / 4) * r2 * r2
        )}\\pi\\approx${texNombre(
          arrondi(calcul((3 / 4) * r2 * r2 * Math.PI), 1)
        )}~\\text{cm}^2$<br>`
        texteCorr += `La troisième figure est un demi-cercle de diamètre ${2 * r3
          } cm donc de rayon ${r3} cm.<br>`
        texteCorr += `$\\mathcal{A}_3=\\dfrac{1}{2}\\times${r3}\\times${r3}\\times\\pi=${(r3 * r3) / 2
          }\\pi\\approx${texNombre(
            arrondi(calcul(((r3 * r3) / 2) * Math.PI), 1)
          )}~\\text{cm}^2$<br>`
      }
    }
    this.listeQuestions.push(mathalea2d(params, objetsEnonce))
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }

  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Périmètres\n2 : Aires\n3 : Les deux']
}
