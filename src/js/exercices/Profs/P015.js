import Exercice from '../Exercice.js'
import { point } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '06/03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const titre = 'Puzzles géométriques'

/**
 * Proposisiton des étapes de construction du puzzles géométriques type tangram, oeuf magique ...
 * @author Sébastien LOZANO
 * Référence P015
 */

export default function PuzzlesGeometriques () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.pasDeVersionLatex = true // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.sup = 1
  this.typeExercice = 'IEP'

  this.nouvelleVersion = function () {
    const type = parseInt(this.sup)
    const anim = new Alea2iep()
    switch (type) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
      case 1: {
        anim.taille(1200, 1200)
        anim.xMax = 15
        anim.translationX = 4
        anim.translationY = 20
        // vitesse pour l'anim
        anim.vitesse = 1000
        anim.xMax = 20
        anim.yMax = 20
        // Les points
        const A1 = point(-3, 4)
        const A = point(-2, 4, 'A')
        const O = point(5, 4, 'O')
        const C1 = point(13, 4)
        const C = point(12, 4, 'C')
        const B1 = point(5, 17, '(\\Delta \')')
        const B = point(5, 11, 'B')
        const D = point(5, -3, 'D')
        const D1 = point(5, -4)
        // On trace les perpendiculaires delta et delta'
        anim.regleModifierLongueur()
        anim.regleDroite(A1, C1, { longueur: 16 })
        anim.regleMasquer()
        anim.crayonMasquer()
        anim.textePoint('$(\\Delta)$', C1)
        anim.pointCreer(O, { dx: 0.2, dy: -0.2 })
        anim.equerreMontrer()
        anim.equerreDeplacer(O)
        anim.equerreRotation(180)
        anim.regleMontrer()
        anim.regleDeplacer(D1)
        anim.regleRotation(90)
        anim.equerreMasquer()
        anim.regleDroite(D1, B1, { longueur: 20 })
        anim.regleMasquer()
        anim.crayonMasquer()
        anim.textePoint('$(\\Delta \')$', B1)
        // On trace le cerlce
        anim.compasEcarterAvecRegle(7)
        anim.regleMasquer()
        anim.compasCercleCentrePoint(O, C)
        anim.compasMasquer()
        anim.pointCreer(A, { dx: 0.2, dy: -0.2 })
        anim.pointCreer(B, { dx: 0.2, dy: -0.2 })
        anim.pointCreer(C, { dx: 0.2, dy: -0.2 })
        anim.pointCreer(D, { dx: 0.2, dy: -0.2 })
        // On trace les demi droite d'arrêt
        // anim.regleDeplacer(A)
        anim.regleDemiDroiteOriginePoint(A, B, { longueur: 16 })
        anim.regleDemiDroiteOriginePoint(C, B, { longueur: 16 })
        anim.regleMasquer()
        anim.compasEcarter2Points(A, C)
        anim.compasTracerArc2Angles(0, 45, { couleur: 'red', epaisseur: 4 })
        const F = point(7.9, 13.9, 'F')
        anim.pointCreer(F, { dx: -0.2, dy: -0.5 })
        anim.compasEcarter2Points(C, A)
        anim.compasTracerArc2Angles(180, 135, { couleur: 'red', epaisseur: 4 })
        const E = point(2.1, 13.9, 'E')
        anim.pointCreer(E, { dx: -0.2, dy: -0.5 })
        anim.compasEcarter2Points(B, F)
        anim.compasTracerArc2Angles(45, 135, { couleur: 'red', epaisseur: 4 })
        const H = point(5, 15.1, 'H')
        anim.pointCreer(H, { dx: 0.2, dy: -0.5 })
        anim.compasDeplacer(D)
        anim.compasTracerArc2Angles(85, 95)
        const G = point(5, 1.1, 'G')
        anim.pointCreer(G, { dx: 0.2, dy: -0.2 })
        anim.compasDeplacer(G)
        anim.compasTracerArc2Angles(40, 140)
        anim.compasMasquer()
        const L = point(2.1, 4, 'L')
        anim.pointCreer(L, { dx: -0.2, dy: -0.2 })
        const K = point(7.9, 4, 'K')
        anim.pointCreer(K, { dx: 0.2, dy: -0.2 })
        anim.regleSegment(A, C, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(L, G, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(G, K, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(G, D, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(O, H, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(A, F, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(C, E, { couleur: 'red', epaisseur: 4 })
        anim.regleMasquer()
        anim.crayonMasquer()
        anim.compasDeplacer(O)
        anim.compasEcarter2Points(O, A)
        anim.compasTracerArc2Angles(180, 360, { couleur: 'red', epaisseur: 4 })
        anim.compasMasquer()
      }
        break

      case 2: {
        const O = point(7, 7, 'O')
        const A = point(4, 4, 'A')
        anim.pointCreer(O, { tempo: 0, dx: -0.5, dy: 0 }) // On déplace le label du point A vers la gauche
        anim.pointCreer(A)
        anim.compasMontrer()
        anim.compasDeplacer(A)
        anim.compasEcarter2Points(O, A)
        anim.compasCercleCentrePoint(O, A)
      }

        break
    }
    let texte
    texte = `
    - Tracer deux droites perpendiculaires $(\\Delta)$ et $(\\Delta ')$, elles se coupent en $O$.<br>
    - Tracer le cercle de centre $O$ et de rayon 7 cm.<br>
    - Ce cercle coupe $(\\Delta)$ en $A$, à gauche de $O$, et $C$.<br>
    - Ce cercle coupe $(\\Delta ')$ en $B$, au dessus de $O$, et $D$.<br>
    - Tracer les demi-droites $[AB)$ et $[CB)$<br>
    - Le cercle de centre $A$ et de rayon $AC$ coupe $[AB)$ en $F$, tracer en rouge l'arc $\\overgroup{FC}$.<br>
    - Le cercle de centre $C$ et de rayon $AC$ coupe $[CB)$ en $E$, tracer en rouge l'arc $\\overgroup{EA}$.<br>
    - Tracer en rouge l'arc $\\overgroup{EF}$ de centre $B$ et de rayon $BE$. Il coupe $(\\Delta ')$ en $H$<br>
    - Le cercle de centre $D$ et de rayon $BE$ coupe le segment $[BD]$ en $G$.<br>
    - Le cercle de centre $G$ et de rayon $BE$ coupe le segment $[AC]$ en L, à gauche de O, et K.<br>
    - Effacer $[OG]$ et le noms des points.<br>
    - Tracer en rouge $[AC]$, $[LG]$, $[GK]$, $[GD]$, $[OH]$, $[AF]$, $[CE]$ et l'arc $\\overgroup{AC}$ de centre $O$ situé sous le point $O$.<br>
    - Découper les 9 pièces délimitées pas les lignes rouges.
    - Construire l'une des silhouettes proposées.
    `
    texte += anim.htmlBouton(this.numeroExercice)
    this.contenu = texte
  }
  this.besoinFormulaireNumerique = ['Type de puzzle', 2, '1 : Oeuf magique\n 2 : Tangram']
} // Fin de l'exercice.
