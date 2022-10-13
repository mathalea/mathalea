import Exercice from '../Exercice.js'
import { randint } from '../../modules/outils/entiers.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFraction } from '../../modules/outils/arrayFractions.js'
import { texteGras } from '../../modules/outils/contextSensitif.js'
import { pointAdistance } from '../../modules/2d/pointSur.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const titre = 'Partager un segment au compas et à la règle non graduée'

export const dateDePublication = '29/10/2021'

/**
 * Application du théorème de Thalès pour multiplier la longueur d'un segment par ue fraction
 * @author Rémi Angot
 * Référence PEG20
*/
export const uuid = '44b85'
export const ref = 'PEG20'
export default function PartageSegmentCompasRegle () {
  Exercice.call(this)
  this.typeExercice = 'IEP'
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false

  this.nouvelleVersion = function (numeroExercice) {
    const d = randint(3, 5)
    let n
    if (d === 4) n = randint(1, d + 2, [2, 4, 6])
    else n = randint(1, d + 2, d)
    const anim = new Alea2iep()
    const A = point(1, -2, 'A')
    const B = pointAdistance(A, randint(4, 7), randint(-10, 20))
    B.nom = 'B'
    anim.traitRapide(A, B)
    anim.pointCreer(A)
    anim.pointCreer(B)
    anim.partageSegment(A, B, n, d, { nom: 'M', nommerGraduations: true, distance: 2 })
    const texte = `Tracer un segment $[AB]$ puis placer le point $M$ sur $[AB ${(n < d) ? ']' : ')'}$ tel que $AM=${texFraction(n, d)}AB$ en utilisant uniquement le compas et la règle non graduée.`
    let texteCorr = texteGras('Programme de construction :')
    texteCorr += '<br>On trace une demi-droite $[Ax)$.'
    texteCorr += `<br>On place sur $[Ax)$ ${Math.max(n, d)} points régulièrement espacés nommés $A_1$, $A_2$...`
    texteCorr += `<br>On trace le segment $[A_${d}B]$ (car le dénominateur de la fraction est ${d}).`
    texteCorr += `<br>On trace la parallèle à $(A_${d}B)$ passant par $A_${n}$ (car le numérateur de la fraction est ${n}).`
    texteCorr += `<br>On place $M$ à l'intersection de cette parallèle et de $[AB ${(n < d) ? ']' : ')'}$.`
    texteCorr += '<br><br>' + texteGras('Justification :')
    texteCorr += `<br>Les droites $(A_${d}B)$ et $(A_${n}M)$ sont parallèles donc d'après le théorème de Thalès, on a :`
    texteCorr += `<br><br>$\\dfrac{AA_${n}}{AA_${d}}=\\dfrac{AM}{AB}$ donc $\\dfrac{${n}}{${d}}=\\dfrac{AM}{AB}$ et finalement $AM=${texFraction(n, d)}AB$. `
    texteCorr += anim.html(numeroExercice)

    this.listeQuestions = [texte]
    this.listeCorrections = [texteCorr]
    listeQuestionsToContenu(this)

    this.reponse = ''
    // this.listeQuestions.push(this.question)
    // this.listeCorrections.push()
    // listeQuestionsToContenu(this)
  }
}
