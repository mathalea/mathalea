import Exercice from '../Exercice.js'
import { choice, listeQuestionsToContenu, texteGras } from '../../modules/outils.js'
import { cercle, droite, longueur, milieu, point, pointAdistance, pointIntersectionLC } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const titre = 'Tracer une racine au compas et à la règle non graduée à l\'aide du théorème de la hauteur'

export const dateDePublication = '1/11/2021'

/**
 * @author Rémi Angot
 * Référence PEG21
*/
export const uuid = '838fb'
export const ref = 'PEG21'
export default function RacineCarrAvecTheoremeHauteur () {
  Exercice.call(this)
  this.typeExercice = 'IEP'
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false

  this.nouvelleVersion = function (numeroExercice) {
    const couplesPossibles = [[1, 5], [2, 3], [1, 7], [2, 4], [2, 5], [3, 4], [3, 5]]
    const couple = choice(couplesPossibles)
    const a = couple[0]
    const b = couple[1]
    const r = a * b
    const distance = 1
    const anim = new Alea2iep()
    const u1 = point(1, 5)
    const u2 = point(u1.x + distance, u1.y)
    const u1y1 = point(u1.x, u1.y - 0.1)
    const u1y2 = point(u1.x, u1.y + 0.1)
    const u2y1 = point(u2.x, u2.y - 0.1)
    const u2y2 = point(u2.x, u2.y + 0.1)
    anim.traitRapide(u1, u2)
    anim.traitRapide(u1y1, u1y2)
    anim.traitRapide(u2y1, u2y2)
    anim.regleMasquerGraduations()
    anim.textePosition('u', u1.x + 0.4, u1.y + 0.8)
    const A = point(3, 0, 'A')
    const B = point(A.x + a + b, 0, 'B')
    const H = point(A.x + a, 0, 'H')
    const h = point(H.x, H.y + 1)
    const maHauteur = droite(H, h)
    const monCercle = cercle(milieu(A, B), longueur(A, B) / 2)
    const C = pointIntersectionLC(maHauteur, monCercle)
    C.nom = 'C'
    anim.regleDroite(A, B)
    anim.regleMasquer()
    anim.pointCreer(A)
    anim.compasEcarter2Points(u1, u2)
    const Ax = [A]
    for (let i = 1; i <= a + b; i++) {
      Ax.push(pointAdistance(A, distance * i, 0))
      anim.compasTracerArcCentrePoint(Ax[i - 1], Ax[i])
    }
    anim.pointCreer(H)
    anim.pointCreer(B)
    anim.mediatriceAuCompas(Ax[a - 1], Ax[a + 1], { coderFigure: false, longueur1: 5, longueur2: -5 })
    anim.crayonMasquer()
    if ((a + b) % 2 === 0) {
      anim.compasEcarter2Points(Ax[(a + b) / 2], B)
    } else {
      anim.epaisseur = 1
      anim.mediatriceAuCompas(A, B, { coderFigure: false })
      anim.epaisseur = 2
      anim.compasEcarter2Points(milieu(A, B), B)
    }
    anim.compasTracerArc2Angles(0, 180)
    anim.compasMasquer()
    anim.pointsCreer(C)
    anim.regleSegment(H, C, { couleur: 'red', epaisseur: 3 })
    anim.regleMasquer()
    anim.crayonMasquer()
    const texte = `En utilisant le théorème de la hauteur, tracer un segment de longueur $\\sqrt{${r}}u$ avec le compas et une règle non graduée.`
    let texteCorr = texteGras('Programme de construction :')
    texteCorr += `<br>$${r}=${a}\\times ${b}$`
    texteCorr += `<br>On place 3 points $A$, $H$ et $B$ alignés tels que $AH = ${a}u$ et $BH = ${b}u$.`
    texteCorr += '<br>On trace la perpendiculaire à $(AB)$ passant par $H$ (pour cela on choisit 2 points $M$ et $N$ sur $[AB]$ tels que $H$ soit le milieu de $[MN]$ puis on trace la médiatrice de $[MN]$).'
    if ((a + b) % 2 === 0) {
      texteCorr += `<br> $AB = ${a + b}u$, il est facile de trouver le milieu de $[AB]$.`
    } else {
      texteCorr += `<br> $AB = ${a + b}u$, il faut tracer la médiatrice de $[AB]$ pour trouver son milieu.`
    }
    texteCorr += '<br>On trace un demi-cercle de diamètre $[AB]$.'
    texteCorr += '<br>On place le point $C$ à l\'intersection du cercle et de la perpendiculaire à $(AB)$ passant par $H$.'
    texteCorr += '<br><br>' + texteGras('Justification :')
    texteCorr += '<br> Le triangle $ABC$ est inscrit dans un cercle de diamètre $[AB]$, il est donc rectangle en $C$.'
    texteCorr += '<br> Les droites $(CH)$ et $(AB)$ sont perpendiculaires en $H$ donc $H$ est le pied de la hauteur relative à l\'hypoténuse du triangle $ABC$.'
    texteCorr += `<br> D'après le théorème de la hauteur, on a : $CH = \\sqrt{AH \\times HB}= \\sqrt{${a}u \\times ${b}u}=\\sqrt{${r}}u$.`
    texteCorr += anim.html(numeroExercice)

    this.listeQuestions = [texte]
    this.listeCorrections = [texteCorr]
    listeQuestionsToContenu(this)
  }
}
