import Exercice from '../Exercice.js'
import { randint } from '../../modules/outils/entiers.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texteGras } from '../../modules/outils/contextSensitif.js'
import { similitude } from '../../modules/2d/transformations.js'
import { pointAdistance, pointSurSegment } from '../../modules/2d/pointSur.js'
import { longueur } from '../../modules/2d/calculs.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const titre = 'Tracer une racine au compas et à la règle non graduée à l\'aide du théorème de Pythagore'

export const dateDePublication = '1/11/2021'

/**
 * @author Rémi Angot
 * Référence PEG22
*/
export const uuid = 'b752a'
export const ref = 'PEG22'
export default function RacineCarrAvecTheoremePythagore () {
  Exercice.call(this)
  this.typeExercice = 'IEP'
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.sup = 2

  this.nouvelleVersion = function (numeroExercice) {
    let AB, BC, r
    AB = randint(2, 5)
    BC = randint(2, 5)
    if (this.sup === 1) {
      r = AB * AB + BC * BC
    } else {
      r = AB * AB + BC * BC + 1
    }
    while (r === 9 || r === 16 || r === 25 || r === 10 || r === 17 || r === 26) {
      AB = randint(2, 5)
      BC = randint(2, 5)
      r = AB * AB + BC * BC + 1
    }
    const anim = new Alea2iep()
    const distance = 1
    const u1 = point(1, 5)
    const u2 = point(u1.x + distance, u1.y)
    const u1y1 = point(u1.x, u1.y - 0.1)
    const u1y2 = point(u1.x, u1.y + 0.1)
    const u2y1 = point(u2.x, u2.y - 0.1)
    const u2y2 = point(u2.x, u2.y + 0.1)
    anim.traitRapide(u1, u2)
    anim.traitRapide(u1y1, u1y2)
    anim.traitRapide(u2y1, u2y2)
    anim.epaisseur = 1
    anim.regleMasquerGraduations()
    anim.textePosition('u', u1.x + 0.4, u1.y + 0.8)
    const A = point(3, 0, 'A')
    const B = point(A.x + AB * distance, 0, 'B')
    const C = point(B.x, BC * distance, 'C')
    anim.regleMasquerGraduations()
    anim.regleDroite(A, B)
    anim.regleMasquer()
    anim.crayonMasquer()
    anim.compasEcarter2Points(u1, u2)
    anim.pointCreer(A, { dx: -0.3, dy: -0.2 })
    const Ax = [A]
    for (let i = 1; i <= AB + 1; i++) {
      Ax.push(pointAdistance(A, distance * i, 0))
      anim.compasTracerArcCentrePoint(Ax[i - 1], Ax[i])
      if (i === AB) {
        anim.pointCreer(B, { tempo: 10, dx: 0.2, dy: -0.2 })
      }
    }
    anim.mediatriceAuCompas(Ax[AB - 1], Ax[AB + 1], { coderFigure: false, longueur1: 3.5, longueur2: -3.5 })
    anim.crayonMasquer()
    const Bx = [B]
    anim.compasEcarter2Points(u1, u2)
    for (let i = 1; i <= BC; i++) {
      Bx.push(pointAdistance(B, distance * i, 90))
      anim.compasTracerArcCentrePoint(Bx[i - 1], Bx[i])
    }
    anim.compasMasquer()
    anim.pointCreer(C, { dx: 0.2, dy: 0.4 })
    if (this.sup === 1) {
      anim.epaisseur = 3
      anim.regleSegment(A, C, { color: 'red' })
      anim.regleMasquer()
      anim.codageAngleDroit(A, B, C)
      anim.crayonMasquer()
    }
    if (this.sup > 1) {
      anim.regleDemiDroiteOriginePoint(A, C)
      anim.regleMasquer()
      anim.crayonMasquer()
      const C1 = pointSurSegment(C, A, 2)
      const C2 = pointSurSegment(C, A, -2)
      anim.compasEcarter(2)
      anim.compasTracerArcCentrePoint(C, C1)
      anim.compasTracerArcCentrePoint(C, C2)
      anim.mediatriceAuCompas(C1, C2, { coderFigure: false, longueur1: 3.5, longueur2: -3.5 })
      anim.compasEcarter2Points(u1, u2)
      const D = similitude(A, C, -90, 1 / longueur(A, C))
      D.nom = 'D'
      anim.compasTracerArcCentrePoint(C, D)
      anim.compasMasquer()
      anim.pointCreer(D, { dx: 0, dy: 0.5 })
      anim.epaisseur = 3
      anim.regleSegment(A, D, { couleur: 'red' })
      anim.regleSegment(D, C)
      anim.regleSegment(C, B)
      anim.regleSegment(B, A)
      anim.regleSegment(A, C)
      anim.regleMasquer()
      anim.codageAngleDroit(A, B, C)
      anim.codageAngleDroit(A, C, D)
      anim.crayonMasquer()
    }

    const texte = `En utilisant le théorème de Pythagore, tracer un segment de longueur $\\sqrt{${r}}u$ avec un compas et une règle non graduée.`
    let texteCorr = texteGras('Programme de construction :')
    if (this.sup === 1) {
      texteCorr += `<br>On remarque que $${r}=${AB}^2+${BC}^2$`
      texteCorr += `<br>On trace un segment $[AB]$ tel que $AB=${AB}u$.`
      texteCorr += '<br>On trace la perpendiculaire à $(AB)$ passant par $B$ (pour cela on choisit 2 points $M$ et $N$ sur $[AB)$ tels que $B$ soit le milieu de $[MN]$ puis on trace la médiatrice de $[MN]$).'
      texteCorr += `<br>On place le point $C$ sur cette perpendiculaire tel que $BC=${BC}u$.`
      texteCorr += '<br>On trace $[AC]$.'
      texteCorr += '<br><br>' + texteGras('Justification :')
      texteCorr += '<br> Le triangle $ABC$ est rectangle en $B$, donc d\'après le théorème de Pythagore, on a :'
      texteCorr += `<br> $AC^2=AB^2+BC^2=${AB}^2+${BC}^2=${r}$.`
      texteCorr += `<br> Finalement, on a $AC=\\sqrt{${r}}$.`
    }
    if (this.sup === 2) {
      texteCorr += `<br>On remarque que $${r}=${AB}^2+${BC}^2+1$`
      texteCorr += `<br>On trace un triangle $ABC$ rectangle en $B$ tel que $AB=${AB}u$ et $BC=${BC}u$.`
      texteCorr += '<br>On trace la perpendiculaire à $(AC)$ passant par $C$ (pour cela on choisit 2 points $M$ et $N$ sur $(AC)$ tels que $C$ soit le milieu de $[MN]$ puis on trace la médiatrice de $[MN]$).'
      texteCorr += '<br>On place le point $D$ sur cette perpendiculaire tel que $CD=1u$.'
      texteCorr += '<br>On trace $[AD]$.'
      texteCorr += '<br><br>' + texteGras('Justification :')
      texteCorr += '<br> Le triangle $ABC$ est rectangle en $B$, donc d\'après le théorème de Pythagore, on a :'
      texteCorr += `<br> $AC^2=AB^2+BC^2=${AB}^2+${BC}^2=${r - 1}$.`
      texteCorr += '<br> Le triangle $ACD$ est rectangle en $C$, donc d\'après le théorème de Pythagore, on a :'
      texteCorr += `<br> $AD^2=AC^2+CD^2=${r - 1}+1^2=${r}$.`
      texteCorr += `<br> Finalement, on a $AD=\\sqrt{${r}}$.`
    }

    texteCorr += anim.html(numeroExercice)

    this.listeQuestions = [texte]
    this.listeCorrections = [texteCorr]
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Avec un seul triangle, \n2 : Nécessite de construire 2 triangles']
}
