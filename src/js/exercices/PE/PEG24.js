import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texteGras } from '../../modules/outils.js'
import { milieu, point, pointAdistance } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const titre = 'Réaliser le quotient de deux longueurs à la règle non graduée et au compas'

export const dateDePublication = '1/11/2021'

/**
 * @author Rémi Angot
 * Référence PEG24
*/
export const uuid = 'f9dd2'
export const ref = 'PEG24'
export default function QuotientDeDeuxLongueurs () {
  Exercice.call(this)
  this.typeExercice = 'IEP'
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.sup = 1

  this.nouvelleVersion = function (numeroExercice) {
    const anim = new Alea2iep()
    const unite = this.sup
    const a = this.sup2 === undefined ? randint(2, 5) : this.sup2
    const b = this.sup3 === undefined ? randint(2, 5, a) : this.sup3
    const monAngle = 40
    const u1 = point(1, 5)
    const u2 = point(u1.x + unite, u1.y)
    const um = milieu(u1, u2)
    const u1y1 = point(u1.x, u1.y - 0.1)
    const u1y2 = point(u1.x, u1.y + 0.1)
    const u2y1 = point(u2.x, u2.y - 0.1)
    const u2y2 = point(u2.x, u2.y + 0.1)
    const a1 = point(1, 4)
    const a2 = point(a1.x + a, a1.y)
    const am = milieu(a1, a2)
    const a1y1 = point(a1.x, a1.y - 0.1)
    const a1y2 = point(a1.x, a1.y + 0.1)
    const a2y1 = point(a2.x, a2.y - 0.1)
    const a2y2 = point(a2.x, a2.y + 0.1)
    const b1 = point(1, 3)
    const b2 = point(b1.x + b, b1.y)
    const bm = milieu(b1, b2)
    const b1y1 = point(b1.x, b1.y - 0.1)
    const b1y2 = point(b1.x, b1.y + 0.1)
    const b2y1 = point(b2.x, b2.y - 0.1)
    const b2y2 = point(b2.x, b2.y + 0.1)
    anim.traitRapide(u1, u2)
    anim.traitRapide(u1y1, u1y2)
    anim.traitRapide(u2y1, u2y2)
    anim.traitRapide(a1, a2)
    anim.traitRapide(a1y1, a1y2)
    anim.traitRapide(a2y1, a2y2)
    anim.traitRapide(b1, b2)
    anim.traitRapide(b1y1, b1y2)
    anim.traitRapide(b2y1, b2y2)
    anim.textePosition('u', um.x - 0.2, um.y + 0.8)
    anim.textePosition('a', am.x - 0.2, am.y + 0.8)
    anim.textePosition('b', bm.x - 0.2, bm.y + 0.8)
    const O = point(1, -2, 'O')
    const A = point(O.x + a, O.y, 'A')
    const M = point(O.x + (a / b) / unite, O.y, 'M')
    anim.regleMasquerGraduations()
    anim.regleDemiDroiteOriginePoint(O, M)
    anim.regleMasquer()
    anim.compasEcarter2Points(a1, a2)
    anim.pointCreer(O, { dx: -0.8, dy: 0.4 })
    anim.compasTracerArcCentrePoint(O, A)
    anim.compasMasquer()
    anim.pointCreer(A, { dx: -0.3, dy: -0.4 })
    const I = pointAdistance(O, unite, monAngle)
    const B = pointAdistance(O, b, monAngle)
    I.nom = 'I'
    B.nom = 'B'
    anim.regleDemiDroiteOriginePoint(O, B)
    anim.regleMasquer()
    anim.crayonMasquer()
    anim.compasEcarter2Points(u1, u2)
    anim.compasTracerArcCentrePoint(O, I)
    anim.pointCreer(I, { dx: -0.3, dy: 0.8 })
    anim.compasEcarter2Points(b1, b2)
    anim.compasTracerArcCentrePoint(O, B)
    anim.pointCreer(B, { dx: -0.3, dy: 0.8 })
    anim.compasMasquer()
    anim.regleSegment(B, A)
    anim.regleMasquer()
    anim.crayonMasquer()
    const m = anim.paralleleAuCompas(B, A, I)
    if (m.y > M.y) anim.regleSegment(I, M)
    anim.pointCreer(M, { dx: -0.3, dy: -0.4 })
    anim.regleSegment(O, M, { couleur: 'red', epaisseur: 3 })
    anim.regleMasquer()
    anim.crayonMasquer()

    const texte = 'À partir d\'un segment unité, d\'un segment de longueur $a$ et d\'un segment de longueur $b$, construire un segment de longueur $\\dfrac{a}{b}$.'
    let texteCorr = texteGras('Programme de construction :')
    texteCorr += '<br>On trace une demi-droite $[OA)$ telle que $OA = a$.'
    texteCorr += '<br>On trace une demi-droite de même origine $[OB)$ telle que $OB = b$.'
    texteCorr += '<br>On place le point $I$ sur $[OB)$ tel que $OI = 1u$.'
    texteCorr += '<br>On trace le segment $[BA]$.'
    texteCorr += '<br>On trace la parallèle à $(BA)$ passant par $I$.'
    texteCorr += '<br>Elle coupe $[OA)$ en $M$.'

    texteCorr += '<br><br>' + texteGras('Justification :')
    texteCorr += '<br> Les droites $(BA)$ et $(IM)$ sont parallèles donc d\'après le théorème de Thalès, on a  :'
    texteCorr += '<br> $\\dfrac{OM}{OA}=\\dfrac{OI}{OB}$ soit $\\dfrac{OM}{a}=\\dfrac{1}{b}$'
    texteCorr += '<br><br> Finalement, on a $OM=\\dfrac{a}{b}$.'
    texteCorr += anim.html(numeroExercice)

    this.listeQuestions = [texte]
    this.listeCorrections = [texteCorr]
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Longueur de l\'unité en cm', 10]
  this.besoinFormulaire2Numerique = ['Longueur de a en cm', 10, 'Valeur au hasard si laissé vide']
  this.besoinFormulaire3Numerique = ['Longueur de b en cm', 10, 'Valeur au hasard si laissé vide']
}
