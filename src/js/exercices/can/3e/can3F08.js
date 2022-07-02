import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import { randint, texFraction, miseEnEvidence, abs, ecritureAlgebrique, texFractionReduite, egal, calcul, texteCentre } from '../../../modules/outils.js'
import { mathalea2d, repere2, texteParPosition, segment, droite } from '../../../modules/2d.js'
export const titre = 'Lire graphiquement une fonction affine*'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora (2F10-02)
 * Référence
*/
export default function LectureGraphiqueFonctionAffine2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'calcul'
  this.nouvelleVersion = function () {
    const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
    let s1, s2, t
    const a = randint(-5, 5, [0, 4]) // numérateut coefficient directeur non nul
    const b = randint(-2, 2) // ordonnée à l'origine
    const d = randint(2, 5, [-a, a, 2 * a, -2 * a]) // dénominateur coefficient directeur non multiple du numérateur pour éviter nombre entier
    const r = repere2()// On définit le repère
    const c = droite(a / d, -1, b)
    const maFraction = fraction(a, d)

    c.color = 'red'
    c.epaisseur = 2
    this.question = '$f$ est une fonction affine définie par $f(x)=...$<br>'
    this.question += `${mathalea2d({
        xmin: -7,
        ymin: -7,
        xmax: 7,
        ymax: 7,
pixelsParCm: 15,
scale: 0.6,
style: 'margin: auto'
        }, r, c, o)}`// On trace le graphique

    this.reponse = [`${texFractionReduite(a, d)}x${ecritureAlgebrique(b)}`]
    if (egal(a * 1000 / d, Math.round(a * 1000 / d))) {
      this.reponse.push(`${calcul(a / d)}x${ecritureAlgebrique(b)}`)
    }
    this.correction = `<br> $f$ est de la forme 
    $f(x)=ax+b$ avec $a$ le coefficient directeur de la droite (inclinaison de la droite par rapport à l'horizontale) 
    et $b$ l'ordonnée à l'origine (ordonnée du point d'intersection entre la droite et l'axe des ordonnées).<br>
    L'ordonnée à l'origine  est $b=${b}$ et :`
    this.correction += texteCentre(`$a=\\dfrac{\\text{Dénivelé vertical}}{\\text{Déplacement horizontal}}=
    ${texFraction(miseEnEvidence(a, 'red'), miseEnEvidence(d, 'green'))}$`)
    this.correction += `On en déduit que la fonction $f$ est définie par : $f(x)=${maFraction.texFractionSimplifiee}x${ecritureAlgebrique(b)}$.`
    if (a > 0) {
      s1 = segment(0, b - a, -d, b - a, 'green')
      s2 = segment(0, b - a, 0, b, 'red')
    }
    if (a < 0) {
      s1 = segment(d, b, 0, b, 'green')
      s2 = segment(d, b, d, b - abs(a), 'red')
    }
    s2.epaisseur = 2
    s1.epaisseur = 2
    s2.styleExtremites = '->'
    s1.styleExtremites = '<-'
    if (a !== 0) {
      this.correction += `${mathalea2d({
        xmin: -7,
        ymin: -7,
        xmax: 7,
        ymax: 7,
        pixelsParCm: 15,
        scale: 0.6,
        style: 'margin: auto'
        }, r, s1, s2, t, c, o)}`
    }// On trace le graphique
  }
}
