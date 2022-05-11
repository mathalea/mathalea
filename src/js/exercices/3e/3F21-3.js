import Exercice from '../Exercice.js'
import { ecritureAlgebrique, listeQuestionsToContenu, calcul, randint, rienSi1, texNombre, stringNombre, sp, choice } from '../../modules/outils.js'
import { mathalea2d, repere2, cercle, point, segment, milieu, texteParPoint, droite } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = "Lire graphiquement les caractéristiques de la courbe représentative d'une fonction affine"
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Lire la pente et l'ordonnée à l'origine d'une droite pour en déduire la forme algébrique de la fonction affine
 * @author Rémi Angot
 * Référence
*/
export default function PenteEtOrdonneeOrigineDroite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestionsModifiable = false
  // this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const num = randint(-5, 5, 0)
    const den = randint(1, 2)
    const a = calcul(num / den)
    const b = randint(-4, 4, 0)
    let xMin
    context.isHtml ? xMin = -10 : xMin = -8
    const xMax = -xMin
    const yMin = xMin
    const yMax = -yMin

    const r = repere2({ xMin, yMin, xMax, yMax })
    const f = x => a * x + b

    const d = droite(a, -1, b)
    d.color = 'blue'
    d.epaisseur = 2
    const c = cercle(point(0, b), 0.8)
    c.color = '#f15929'
    c.epaisseur = 2
    let x0 = -7
    while (!Number.isInteger(f(x0)) || f(x0) <= yMin || f(x0) >= yMax || x0 === -2 || x0 === -1 || x0 === 0) {
      x0 += 1
    }
    const A = point(x0, f(x0))
    const B = point(x0 + 1, f(x0))
    const C = point(x0 + 1, f(x0 + 1))
    const s1 = segment(A, B)
    const s2 = segment(B, C)
    const M1 = milieu(A, B)
    const M2 = milieu(B, C)
    const t1 = texteParPoint('$1$', point(M1.x, M1.y + (a > 0 ? -0.4 : 0.4)))
    const t2 = texteParPoint(`$${texNombre(a)}$`, point(M2.x + 0.6, M2.y))
    t1.color = '#f15929'
    t2.color = '#f15929'

    s1.epaisseur = 3
    s1.pointilles = true
    s1.color = '#f15929'
    s2.epaisseur = 3
    s2.pointilles = true
    s2.color = '#f15929'

    const nomFonction = choice(['f', 'g', 'h', 'f_1', 'f_2', 'f_3'])

    this.introduction = `On a représenté ci-dessous une fonction affine $${nomFonction}$.<br><br>` + mathalea2d({ xmin: xMin, xmax: xMax, ymin: yMin, ymax: yMax }, r, d)
    this.consigneCorrection = mathalea2d({ xmin: xMin, xmax: xMax, ymin: yMin, ymax: yMax }, r, d, c, s1, s2, t1, t2)
    let question1 = `Quelle est l'ordonnée à l'origine de la fonction $${nomFonction}$ ?`
    question1 += ajouteChampTexteMathLive(this, 0, 'largeur15 inline ')
    let question2 = `Quel est le coefficient directeur de $${nomFonction}$ ?`
    question2 += ajouteChampTexteMathLive(this, 1, 'largeur15 inline ')
    let question3 = `En déduire l'expression algébrique de $${nomFonction}$.`
    question3 += ajouteChampTexteMathLive(this, 2, 'largeur15 inline nospacebefore', { texte: `$${sp(10)}${nomFonction} : x \\mapsto $` })

    setReponse(this, 0, b)
    setReponse(this, 1, [a, `\\frac{${num}}{${den}}`])
    setReponse(this, 2, `${stringNombre(a)}x+${b}`)
    if (den === 2) setReponse(this, 2, [`${stringNombre(a)}x+${b}`, `\\frac{${num}}{2}\\times x + ${b}`])

    const correction1 = `La droite coupe l'axe des ordonnées au point de coordonnées $(0;${b})$, l'ordonnée à l'origine est donc $${b}$.`
    let correction2 = `À chaque fois que l'on avance de 1 carreau, on ${a > 0 ? 'monte' : 'descend'} de $${texNombre(Math.abs(a))}$ ${Math.abs(a) >= 2 ? 'carreaux' : 'carreau'},`
    correction2 += ` le coefficient directeur est donc $${texNombre(a)}$.`
    let correction3 = `$${nomFonction}$ étant une fonction affine, on a $${nomFonction} : x \\mapsto ax + b$ avec $a$ le coefficient directeur (ou pente) et $b$ son ordonnée à l'origine.`
    correction3 += `<br>Finalement, $${nomFonction} : x \\mapsto ${rienSi1(a).toString().replace('.', ',')}x ${ecritureAlgebrique(b)}$.`
    this.listeQuestions.push(question1, question2, question3)
    this.listeCorrections.push(correction1, correction2, correction3)

    listeQuestionsToContenu(this)
  }
}
