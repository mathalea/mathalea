import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import { randint, calcul, miseEnEvidence } from '../../../modules/outils.js'
export const titre = 'Déterminer un antécédent avec la racine carrée'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '1/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Retrouver l'ancédédent (un carré parfait) d'un nombre par une fonction avec racine carrée
 * @author Gilles Mora
 * Référence can2F05
*/
export const uuid = '82d4a'
export const ref = 'can2F05'
export default function AntecedentFonctionRacine () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const m = randint(2, 5)
    const p = calcul(randint(1, 4) * m)
    const a = calcul(randint(5, 10) * m)
    const maFraction = fraction(a - p, m)
    this.question = `Déterminer l'antécédent de $${a}$ 
    par la fonction $f$ définie sur $\\mathbb{R}_+$ par : $f(x)=${m}\\sqrt{x}+${p}$.`
    this.correction = `L'antécédent de $${a}$ (s'il existe) par la fonction $f$ est la solution de l'équation $f(x)=${a}$.<br>
Pour résoudre cette équation, on isole la racine carrée dans le membre de gauche.<br>

    $\\begin{aligned}
    ${m}\\sqrt{x}+${p}&=${a}\\\\
    ${m}\\sqrt{x}+${p}${miseEnEvidence(-p)}&=${a}${miseEnEvidence(-p)}\\\\
    \\dfrac{${m}\\sqrt{x}}{${miseEnEvidence(m)}}&=\\dfrac{${a - p}}{${miseEnEvidence(m)}}\\\\
    \\sqrt{x}&=${maFraction.texFractionSimplifiee}{\\text{ On cherche le nombre dont la racine carrée vaut }}${maFraction.texFractionSimplifiee} \\\\
    x&=${maFraction.texFractionSimplifiee ** 2}
    \\end{aligned}$
    `
    this.reponse = maFraction.texFractionSimplifiee ** 2
  }
}
