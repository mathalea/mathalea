import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, numAlpha, randint } from '../../modules/outils.js'
import Trinome from '../../modules/Trinome.js'
export const titre = 'Étude complète de paraboles'
export const interactifReady = false

export const dateDePublication = '27/10/2022'

/**
 * Sommet, forme canonique et points d'intersection avec l'axe des abscisses
 * @author Rémi Angot
*/
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
    const x2 = x1 + 2 * randint(1, 4)
    const p = new Trinome()
    p.defFormeFactorisee(a, x1, x2)
    let question1 = `Dans le plan rapporté à un repère, on considère la parabole $(P)$ d'équation $y=${p.tex}$.`
    question1 += `<br><br>${numAlpha(0)} Déterminer les coordonnées du sommet $S$ de la parabole $(P)$.`
    question1 += `<br><br>${numAlpha(1)} En déduire la forme canonique et les variations de la fonction $f$ associée au polynome $(P)$.`
    let correction1 = `${numAlpha(0)} On cherche la forme canonique de $${p.tex}$ avec $a=${p.a.simplifie().texFraction}$, $b=${p.b.simplifie().texFraction}$ et $c=${p.c.simplifie().texFraction}$.`
    correction1 += `<br><br> $\\alpha = \\dfrac{-b}{2a}=\\dfrac{${p.b.simplifie().oppose().texFraction}}{${p.a.multiplieEntier(2).simplifie().texFraction}}=${p.alpha.simplifie().texFraction}$`
    correction1 += `<br><br> $\\beta = f(\\alpha) = f\\left(${p.alpha.simplifie().texFraction} \\right)=${p.texCalculImage(p.alpha.simplifie())}$`
    correction1 += `<br><br> Le sommet de cette parabole a donc pour coordonnées $\\left(${p.alpha.simplifie().texFraction} \\,;\\, ${p.beta.simplifie().texFraction}\\right)$.`

    correction1 += `<br><br>${numAlpha(1)} On a donc $${p.tex} = ${p.texFormeCanonique}$ avec $a ${p.a.s === 1 ? '>' : '<'} 0$ d'où le tableau de variations : `
    p.defFormeFactorisee2(randint(-2, 2, [-1, 0, 1]), randint(-5, 5, 0), randint(-5, 5, 0), randint(-5, 5, 0), randint(-5, 5, 0))
    const question2 = `La parabole d'équation $y = ${p.tex}$ coupe-t-elle l'axe des abscisses ? Si oui, déterminer les coordonnées de ces points.`
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
