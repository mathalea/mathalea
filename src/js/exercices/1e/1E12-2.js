import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, numAlpha, randint } from '../../modules/outils.js'
import Trinome from '../../modules/Trinome.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { tableauDeVariation } from '../../modules/TableauDeVariation.js'
export const titre = 'Étude complète de paraboles'
export const interactifReady = false

export const dateDePublication = '27/10/2022'

/**
 * Sommet, forme canonique et points d'intersection avec l'axe des abscisses
 * @author Rémi Angot
*/
export const uuid = 'e6718'
export const ref = '1E12-2'
export default class EtudeParabole extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1
    this.nbQuestionsModifiable = false
  }

  nouvelleVersion () {
    const a = randint(-4, 4, [-1, 0, 1])
    // x1 + x2 doit être pair pour n'avoir que des nombres entiers dans les différentes formes
    const x1 = randint(-5, 5, 0)
    const x2 = x1 + 2 * randint(1, 4, -x1) // Pas de racines symétriques pour avoir un alpha non nul
    const p = new Trinome()
    p.defFormeFactorisee(a, x1, x2)
    let question1 = `Dans le plan rapporté à un repère, on considère la parabole $(P)$ d'équation $y=${p.tex}$.`
    question1 += `<br><br>${numAlpha(0)} Déterminer la forme canonique de $f(x) = ${p.tex}$.`
    question1 += `<br><br>${numAlpha(1)} En déduire les coordonnées du sommet de la parabole et les variations de la fonction $f$ associée au polynôme $(P)$.`
    let correction1 = `${numAlpha(0)} On cherche la forme canonique de $${p.tex}$ avec $a=${p.a.simplifie().texFraction}$, $b=${p.b.simplifie().texFraction}$ et $c=${p.c.simplifie().texFraction}$.`
    correction1 += '<br><br> On sait que $f(x)(x-\\alpha)^2+\\beta$ avec $\\alpha = \\dfrac{-b}{2a}$ et $\\beta=f(\\alpha)$.'
    correction1 += `<br><br> $\\alpha = \\dfrac{-b}{2a}=\\dfrac{${p.b.simplifie().oppose().texFraction}}{${p.a.multiplieEntier(2).simplifie().texFraction}}=${p.alpha.simplifie().texFraction}$`
    correction1 += `<br><br> $\\beta = f(\\alpha) = f\\left(${p.alpha.simplifie().texFraction} \\right)=${p.texCalculImage(p.alpha.simplifie())}$`
    correction1 += `<br><br> On a donc $f(x) = ${p.texFormeCanonique}$.`
    correction1 += `<br><br>${numAlpha(1)} Le sommet de cette parabole a donc pour coordonnées $\\left(${p.alpha.simplifie().texFraction} \\,;\\, ${p.beta.simplifie().texFraction}\\right)$.`

    correction1 += `<br><br>$f(x) = ${p.texFormeCanonique}$ avec $a ${p.a.s === 1 ? '>' : '<'} 0$ d'où le tableau de variations : `

    let variations
    if (a > 0) {
      variations = ['Var', 30, '+/', 10, `-/$${p.beta.simplifie().texFraction}$`, 10, '+/']
    } else {
      variations = ['Var', 30, '-/', 10, `+/$${p.beta.simplifie().texFraction}$`, 10, '-/']
    }
    correction1 += '<br><br>' + mathalea2d({ xmin: -0.5, ymin: -5.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
      tabInit: [
        [
          // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
          ['$x$', 2, 30], [`$${p.tex}$`, 2, 50]],
        // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
        ['$-\\infty$', 30, `${p.alpha}`, 30, '$+\\infty$', 30]
      ],
      // tabLines ci-dessous contient les autres lignes du tableau.
      tabLines: [variations],
      colorBackground: '',
      espcl: 3.5, // taille en cm entre deux antécédents
      deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
      lgt: 8, // taille de la première colonne en cm
      hauteurLignes: [12, 25]
    }))

    p.defFormeFactorisee2(randint(-2, 2, [-1, 0, 1]), randint(-5, 5, 0), randint(-5, 5, 0), randint(-5, 5, 0), randint(-5, 5, 0))
    const question2 = `La parabole d'équation $y = ${p.tex}$ coupe-t-elle l'axe des abscisses ? Si oui, déterminer les coordonnées de ce(s) point(s).`
    let correction2 = `S'il existe un point d'intersection $M(x\\,;\\,y)$ entre la parabole et l'axe des abscisses alors $y=${p.tex} = 0$.`
    correction2 += `<br><br>On calcule le discriminant de ce trinôme : $\\Delta = ${p.texCalculDiscriminantSansResultat}$.`
    correction2 += `<br><br>$\\Delta = ${p.discriminant.simplifie().texFraction}$`
    correction2 += '<br><br>$\\Delta$ est strictement positif donc cette équation admet deux solutions.'
    correction2 += `<br><br>$${p.texCalculRacine1}$`
    correction2 += `<br><br>$${p.texCalculRacine2}$`
    correction2 += `<br><br>La parabole coupe donc l'axe des abscisses en deux points de coordonnées $\\left(${p.x1.simplifie().texFraction} \\,;\\, 0 \\right)$ et  $\\left(${p.x2.simplifie().texFraction} \\,;\\, 0 \\right)$.`

    this.listeQuestions = [question1, question2]
    this.listeCorrections = [correction1, correction2]
    listeQuestionsToContenu(this)
  }
}
