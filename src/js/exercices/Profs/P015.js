import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { point } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
import { randint, enumerate, enumerateSansPuceSansNumero, infoMessage, texteGras } from '../../modules/outils'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '../03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

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
  // this.pasDeVersionLatex = true // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.sup = 1
  this.sup2 = true
  this.typeExercice = 'IEP'
  this.listePackages = ['bclogo', 'yhmath']

  this.nouvelleVersion = function () {
    const type = parseInt(this.sup)
    const anim = new Alea2iep()
    // anim.taille(1200, 1200)
    anim.translationX = 4
    anim.translationY = 20
    // vitesse pour l'anim
    anim.vitesse = 50 // 1000
    anim.xMax = 20
    anim.yMax = 20
    let texte
    texte = texteGras('PROGRAMME DE CONSTRUCTION')
    // On factorise
    /**
     *
     * @param {number} nbPieces nombre de pieces du puzzle
     * @param {string} type type parmi oiseau, tangram, samLoyd
     * @param {number} nbFig numero de la sihlouette tiré au hasard
     * @returns un string
     */
    const texteMessage = (nbPieces, type) => {
      let nbFig
      switch (type) {
        case 'oiseau':
        case 'tangram':
          nbFig = randint(1, 12)
          break
        case 'samLoyd':
          nbFig = randint(1, 5)
          break
      }
      let sortie = enumerateSansPuceSansNumero([
        `Découper les ${nbPieces} pièces délimitées par les lignes rouges.`,
        'Construire la silhouette proposée.'
      ], 1.5)
      if (context.isHtml) {
        sortie += `<img class="ui middle aligned image" src="assets/puzzlesGeom/img/${type}${nbFig}.png"/>`
      } else {
        sortie += ` \\href{https://coopmaths.fr/assets/puzzlesGeom/img/${type}${nbFig}.png}{Cliquer pour la voir en ligne}`
      }
      return sortie
    }

    /**
     *
     * @param {string} version v1 ou v2
     */
    const samLoyd = (version) => {
      // Adaptation de la taille de la fenêtre
      anim.taille(600, 600)
      anim.image('assets/puzzlesGeom/img/samLoydQuadrillage.png', point(-4, 19))
      // Les points
      let A, B, C, D, E, F, G, H, I
      switch (version) {
        case 'v1':
          A = point(-2.35, 15.70, 'A')
          B = point(1, 17.35, 'B')
          C = point(6.01, 7.35, 'C')
          D = point(-2.35, 7.35, 'D')
          E = point(-2.35, 10.7, 'E')
          F = point(-2.35, 14, 'F')
          G = point(1, 14, 'G')
          H = point(1, 9, 'H')
          I = point(4.31, 10.7, 'I')
          break
        case 'v2':
          A = point(2.675, 17.35, 'A')
          B = point(6.025, 17.35, 'B')
          break
      }
      // On trace les points
      anim.pointCreer(A, { dx: -0.7, dy: 0.7 })
      anim.pointCreer(B, { dy: 0.7 })
      anim.pointCreer(C, { dy: -0.2 })
      anim.pointCreer(D, { dy: -0.2 })
      anim.pointCreer(E, { dx: -0.7, dy: 0.7 })
      anim.pointCreer(F, { dx: -0.7, dy: 0.7 })
      anim.pointCreer(G, { dy: 0.7 })
      anim.pointCreer(H, { dy: 0.7 })
      anim.pointCreer(I, { dy: 0.7 })
      // On trace les segments
      anim.regleMasquerGraduations()
      anim.regleSegment(A, B, { couleur: 'red', epaisseur: 4 })
      anim.regleSegment(B, C, { couleur: 'red', epaisseur: 4 })
      anim.regleSegment(C, D, { couleur: 'red', epaisseur: 4 })
      anim.regleSegment(D, A, { couleur: 'red', epaisseur: 4 })
      anim.regleSegment(F, G, { couleur: 'red', epaisseur: 4 })
      anim.regleSegment(G, H, { couleur: 'red', epaisseur: 4 })
      anim.regleSegment(D, I, { couleur: 'red', epaisseur: 4 })
      anim.regleSegment(E, I, { couleur: 'red', epaisseur: 4 })
      anim.regleMasquer()
      anim.crayonMasquer()

      texte += enumerate([
        'Placer les points $A$, $B$, $C$, $D$, $E$, $F$, $G$ et $H$.',
        'Tracer en rouge les segments $[AB]$, $[BC]$, $[CD]$, $[DA]$, $[FG]$, $[GH]$, $[DI]$, $[EI]$ '
      ], 1)
      texte += infoMessage({
        titre: `Sam Loyd ${version} !`,
        texte: texteMessage(5, 'samLoyd'),
        couleur: 'nombres'
      })
    }

    switch (type) {
      case 1: {
        // Adaptation de la taille de la fenêtre
        anim.taille(1200, 1200)
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
        let myArcCommand
        context.isHtml === true ? myArcCommand = '\\overgroup' : myArcCommand = '\\wideparen'
        texte += enumerate([
          'Tracer deux droites perpendiculaires $(\\Delta)$ et $(\\Delta \')$, elles se coupent en $O$.',
          'Tracer le cercle de centre $O$ et de rayon 7 cm.',
          'Ce cercle coupe $(\\Delta)$ en $A$, à gauche de $O$, et $C$.',
          'Ce cercle coupe $(\\Delta \')$ en $B$, au dessus de $O$, et $D$.',
          'Tracer les demi-droites $[AB)$ et $[CB)$',
          `Le cercle de centre $A$ et de rayon $AC$ coupe $[AB)$ en $F$, tracer en rouge l'arc $${myArcCommand}{FC}$.`,
          `Le cercle de centre $C$ et de rayon $AC$ coupe $[CB)$ en $E$, tracer en rouge l'arc $${myArcCommand}{EA}$.`,
          `Tracer en rouge l'arc $${myArcCommand}{EF}$ de centre $B$ et de rayon $BE$. Il coupe $(\\Delta ')$ en $H$.`,
          'Le cercle de centre $D$ et de rayon $BE$ coupe le segment $[BD]$ en $G$.',
          'Le cercle de centre $G$ et de rayon $BE$ coupe le segment $[AC]$ en $L$ et $K$.<br> L est à gauche de $O$.',
          'Effacer $[OG]$ et le noms des points.',
          `Tracer en rouge $[AC]$, $[LG]$, $[GK]$, $[GD]$, $[OH]$, $[AF]$, $[CE]$ et l'arc $${myArcCommand}{AC}$ de centre $O$ situé sous le point $O$.`
        ], 1)
        texte += infoMessage({
          titre: 'Les oiseaux sortent de l\'oeuf, c\'est bien connu !',
          texte: texteMessage(9, 'oiseau'),
          couleur: 'nombres'
        })
      }
        break
      case 2: {
        // Adaptation de la taille de la fenêtre
        anim.taille(1200, 1200)
        // Les points
        const A = point(-2, 11, 'A')
        const B = point(12, 11, 'B')
        const C = point(12, -3, 'C')
        const D = point(-2, -3, 'D')
        anim.regleModifierLongueur()
        // [AB]
        anim.pointCreer(A, { dx: -0.8 })
        anim.regleDroite(A, B, { longueur: 14 })
        anim.regleMasquer()
        anim.pointCreer(B)
        // [AD]
        anim.equerreMontrer()
        anim.equerreDeplacer(A)
        anim.equerreRotation(270)
        anim.regleMontrer()
        anim.regleDeplacer(A)
        anim.regleRotation(270)
        anim.equerreMasquer()
        anim.regleDroite(A, D, { longueur: 14 })
        anim.regleMasquer()
        anim.pointCreer(D, { dx: -0.8 })
        // [DC]
        anim.equerreMontrer()
        anim.equerreDeplacer(D)
        anim.equerreRotation(0)
        anim.regleMontrer()
        anim.regleDeplacer(D)
        anim.regleRotation(0)
        anim.equerreMasquer()
        anim.regleDroite(D, C, { longueur: 14 })
        anim.regleMasquer()
        anim.pointCreer(C)
        // [CB]
        anim.regleMontrer()
        anim.regleDeplacer(C)
        anim.regleRotation(90)
        anim.regleDroite(C, B, { longueur: 14 })
        anim.regleMasquer()
        // Diagonale [BD]
        anim.regleDroite(D, B)
        // les points E,F,G
        const E = point(1.5, 0.5, 'E')
        const F = point(5, 4, 'F')
        const G = point(8.5, 7.5, 'G')
        anim.crayonDeplacer(E)
        anim.pointCreer(E, { dx: -0.8, dy: 0.8 })
        anim.crayonDeplacer(F)
        anim.pointCreer(F, { dx: -0.8, dy: 0.2 })
        anim.crayonDeplacer(G)
        anim.pointCreer(G, { dx: -0.8, dy: 0.8 })
        // Les points H et J
        const H = point(5, -3, 'H')
        const J = point(12, 4, 'J')
        anim.regleMontrer()
        anim.regleRotation(0)
        anim.crayonMontrer()
        anim.crayonDeplacer(H)
        anim.regleMasquer()
        anim.pointCreer(H, { dy: -0.2 })
        anim.regleDeplacer(C)
        anim.regleRotation(90)
        anim.regleMontrer()
        anim.crayonDeplacer(J)
        anim.regleMasquer()
        anim.pointCreer(J)
        anim.regleDeplacer(H)
        anim.regleRotation(45)
        anim.regleSegment(H, J)
        anim.regleMasquer()
        // le point I
        anim.regleDeplacer(A)
        anim.regleRotation(-45)
        const I = point(8.5, 0.5, 'I')
        anim.regleMontrer()
        anim.crayonMontrer()
        anim.crayonDeplacer(I)
        anim.pointCreer(I)
        anim.regleMasquer()
        anim.regleSegment(A, B, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(B, C, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(C, D, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(D, A, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(D, B, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(A, I, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(H, J, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(E, H, { couleur: 'red', epaisseur: 4 })
        anim.regleSegment(G, I, { couleur: 'red', epaisseur: 4 })
        anim.regleMasquer()
        anim.crayonMasquer()
        texte += enumerate([
          'Tracer un carré ABCD de 14 cm de côté.',
          'Placer $E$, $F$ et $G$ sur $[DB]$ tels que $DE=EF=FG=GB$.',
          'Placer $H$ au milieu de $[CD]$.',
          'Placer $J$ au milieu de $[BC]$.',
          'La diagonale $[AC]$ coupe $[HJ]$ en $I$',
          'Tracer en rouge $[AB]$, $[BC]$, $[CD]$, $[DA]$, $[DB]$, $[AI]$, $[HJ]$, $[EH]$, $[GI]$.'
        ], 1)
        texte += infoMessage({
          titre: 'Toute sorte de personnage peut sortir de ce drôle de carré, c\'est bien connu !',
          texte: texteMessage(7, 'tangram'),
          couleur: 'nombres'
        })
      }
        break
      case 3:
        samLoyd('v1')
        break
      case 4:
        samLoyd('v2')
        break
    }

    if (this.sup2) {
      texte += anim.htmlBouton(this.numeroExercice)
    }
    this.contenu = texte
  }
  this.besoinFormulaireNumerique = ['Type de puzzle', 4, '1 : Oeuf magique\n 2 : Tangram\n 3 : Sam Loyd \n 4 : Sam Loyd bis']
  this.besoinFormulaire2CaseACocher = ['Animation disponible']
}
