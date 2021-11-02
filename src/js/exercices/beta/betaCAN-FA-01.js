import Exercice from '../Exercice.js'
import { randint, calcul, texFraction, miseEnEvidence, reduireAxPlusB } from '../../modules/outils.js'
import { courbe2, mathalea2d, point, repere2, tracePoint, texteParPosition, segment } from '../../modules/2d.js'
export const titre = 'Lecture graphique fonction affine niveau 1'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora (2F10-02)
 * Référence
*/
export default function LectureGraphiqueFonctionAffine1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const o = texteParPosition('O', -0.5, -0.5, 'milieu', 'black', 1)
    let s1, s2
    const a = randint(-4, 4, 0)
    const b = randint(-4, 4, 0)
    const xA = randint(-3, 3, [-1, 0])
    const yA = calcul(a * xA + b)
    const xB = xA + 1
    const yB = calcul(b + a * xB)
    const tA = tracePoint(point(xA, yA))
    const tB = tracePoint(point(xB, yB))

    tA.color = 'red'
    tB.color = 'red'

    const repere = repere2({ xMin: -8, yMin: -8, xMax: 8, yMax: 8 })
    this.formatInteractif = 'calcul'
    this.question = 'La droite ci-dessous représente une fonction affine $f$.<br>'
    this.question += `${mathalea2d({ xmin: -7, ymin: -7, xmax: 7, ymax: 7, pixelsParCm: 17, scale: 0.6 },
        repere, courbe2(x => a * x + b, { repere: repere, color: 'blue' }), o)}<br>Compléter : $f(x)=$`

    this.reponse = [`${a}x+${b}`]
    this.correction = `<br>$f$ est une fonction affine. On en déduit que son écriture algébrique est de la forme 
    $f(x)=ax+b$ avec $a$ le coefficient directeur de la droite (inclinaison de la droite par rapport à l'horizontale) et $b$ l'ordonnée à l'origine.<br>L'ordonnée à l'origine (ordonnée du point d'intersection entre la droite et l'axe des ordonnées) est $b=${b}$.<br>Le coefficient directeur de la droite est donné  par $a=\\dfrac{\\text{Dénivelé vertical}}{\\text{Déplacement horizontal}}=
    ${texFraction(miseEnEvidence(a, 'red'), miseEnEvidence(1, 'green'))}=${a}$ `
    if (a > 0) {
      s1 = segment(0, b, 1, b, 'green')
      s2 = segment(1, b, 1, a + b, 'red')
    }
    if (a < 0) {
      s1 = segment(0, b, 1, b, 'green')
      s2 = segment(1, b, 1, a + b, 'red')
    }
    s2.epaisseur = 2
    s1.epaisseur = 2
    s2.styleExtremites = '->'
    s1.styleExtremites = '->'
    if (a > 0) {
      this.correction += `${mathalea2d({ xmin: -7, ymin: -7, xmax: 7, ymax: 7, pixelsParCm: 17, scale: 0.6 },
        repere, courbe2(x => a * x + b, { repere: repere, color: 'blue' }), o, s1, s2,
         texteParPosition('1', 0.5, b - 0.5, 0, 'green', 1, 'middle', true)
       , texteParPosition(a, 1.5, b + a / 2, 0, 'red', 1, 'middle', true))}<br>`
    }
    if (a < 0) {
      this.correction += `${mathalea2d({ xmin: -7, ymin: -7, xmax: 7, ymax: 7, pixelsParCm: 17, scale: 0.5 },
        repere, courbe2(x => a * x + b, { repere: repere, color: 'blue' }), o, s1, s2,
         texteParPosition('1', 0.5, b + 0.5, 0, 'green', 1, 'middle', true)
       , texteParPosition(a, 1.5, b + a / 2, 0, 'red', 1, 'middle', true))}<br>`
    }
    this.correction += `On en déduit que la fonction $f$ est définie par $f(x)=${reduireAxPlusB(a, b)}$`
  }
}
