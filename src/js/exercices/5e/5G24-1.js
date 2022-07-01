import Exercice from '../Exercice.js'
import { point, pointAdistance, rotation, similitude, translation, vecteur, barycentre, codageSegment, codageAngle, nommePolygone, mathalea2d, triangle2points2longueurs, longueur, angle, polygone } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes, randint, choisitLettresDifferentes, shuffleLettres } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
export const titre = 'Triangles égaux et côtés homologues'

/**
 * Deux triangles égaux sont codés, il faut reconnaître les côtés homologues
 * @author Rémi Angot
 * Référence 5G24-1
*/
export default function TrianglesEgaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Compléter les phrases suivantes.'
  this.nbQuestions = 3
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.video = '' // Id YouTube ou url
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const zoom = context.vue === 'diap' ? 0.5 : 1

    let typeQuestionsDisponibles = ['rotation', 'similitude', 'rotation2', 'similitude2', 'rotation3', 'similitude3']
    if (this.nbQuestions === 3) {
      typeQuestionsDisponibles = ['similitude', 'rotation2', 'similitude3']
    } else if (this.nbQuestions === 4) {
      typeQuestionsDisponibles = ['rotation', 'rotation2', 'similitude2', 'rotation3', 'similitude3']
    }
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      let l1 = randint(40, 70)
      let l2 = randint(40, 80, l1)
      let l3 = randint(40, l1 + l2 - 10, [l1, l2])
      l1 /= 10
      l2 /= 10
      l3 /= 10
      const A = point(0, 0)
      const B = pointAdistance(A, l1)
      const p1 = triangle2points2longueurs(A, B, l2, l3)
      const C = p1.listePoints[2]
      const O = barycentre(p1)
      const v = vecteur(longueur(A, B) + 2, 0)
      const O2 = translation(O, v)
      // const p2 = similitude(p1, O2, randint(160, 200), 1)
      let p2, D, E, F, code1, code2, code3, code4, code5, code6, codeA1, codeA2, codeA3, codeA4, codeA5, codeA6, nom1, nom2, nommeP1, nommeP2, Anom, Bnom, Cnom, Dnom, Enom, Fnom
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'rotation':
          p2 = rotation(p1, A, angle(C, A, B) + randint(10, 100))
          D = p2.listePoints[0]
          E = p2.listePoints[1]
          F = p2.listePoints[2]
          code1 = codageSegment(A, B, '|')
          code2 = codageSegment(D, E, '|')
          code3 = codageSegment(B, C, '||')
          code4 = codageSegment(E, F, '||')
          code5 = codageSegment(C, A, '|||')
          code6 = codageSegment(F, D, '|||')
          codeA1 = codageAngle(A, B, C)
          codeA2 = codageAngle(D, E, F)
          codeA3 = codageAngle(B, C, A, 0.8, 'X')
          codeA4 = codageAngle(E, F, D, 0.8, 'X')
          codeA5 = codageAngle(C, A, B, 0.8, '||')
          codeA6 = codageAngle(F, D, E, 0.8, '||')
          nom1 = choisitLettresDifferentes(3)
          nom1 = nom1 + ' ' + choisitLettresDifferentes(2, nom1)
          nom1 = nom1.replaceAll(',', '')
          nommeP1 = nommePolygone(polygone(A, B, C, D, E, F), nom1)
          Anom = nom1[0]
          Bnom = nom1[1]
          Cnom = nom1[2]
          Dnom = nom1[0]
          Enom = nom1[4]
          Fnom = nom1[5]
          texte = `Ci-dessous les triangles $${shuffleLettres(Anom + Bnom + Cnom)}$ et $${shuffleLettres(Dnom + Enom + Fnom)}$ sont égaux.<br>`
          texte += `$[${Anom + Bnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Bnom + Cnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Cnom + Anom}]$ et ............ sont homologues.<br>`
          texte += mathalea2d({
            xmin: Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 3,
            ymin: Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 3,
            xmax: Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 3,
            ymax: Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 3,
            scale: 0.5,
            zoom
          },
          p1, p2, code1, code2, code3, code4, code5, code6, codeA1, codeA2, codeA3, codeA4, codeA5, codeA6, nommeP1)
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'similitude':
          p2 = similitude(p1, O2, randint(160, 200), 1)
          D = p2.listePoints[0]
          E = p2.listePoints[1]
          F = p2.listePoints[2]
          code1 = codageSegment(A, B, '|')
          code2 = codageSegment(D, E, '|')
          code3 = codageSegment(B, C, '||')
          code4 = codageSegment(E, F, '||')
          code5 = codageSegment(C, A, '|||')
          code6 = codageSegment(F, D, '|||')
          codeA1 = codageAngle(A, B, C)
          codeA2 = codageAngle(D, E, F)
          codeA3 = codageAngle(B, C, A, 0.8, 'X')
          codeA4 = codageAngle(E, F, D, 0.8, 'X')
          codeA5 = codageAngle(C, A, B, 0.8, '||')
          codeA6 = codageAngle(F, D, E, 0.8, '||')
          nom1 = choisitLettresDifferentes(3)
          nom2 = choisitLettresDifferentes(3, nom1)
          Anom = nom1[0]
          Bnom = nom1[1]
          Cnom = nom1[2]
          Dnom = nom2[0]
          Enom = nom2[1]
          Fnom = nom2[2]
          nommeP1 = nommePolygone(p1, nom1)
          nommeP2 = nommePolygone(p2, nom2)
          texte = `Ci-dessous les triangles $${shuffleLettres(Anom + Bnom + Cnom)}$ et $${shuffleLettres(Dnom + Enom + Fnom)}$ sont égaux.<br>`
          texte += `$[${Anom + Bnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Bnom + Cnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Cnom + Anom}]$ et ............ sont homologues.<br>`
          texte += mathalea2d({
            xmin: Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 3,
            ymin: Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 3,
            xmax: Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 3,
            ymax: Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 3,
            scale: 0.5,
            zoom
          },
          p1, p2, code1, code2, code3, code4, code5, code6, codeA1, codeA2, codeA3, codeA4, codeA5, codeA6, nommeP1, nommeP2)
          break
        case 'rotation2':
          p2 = rotation(p1, A, angle(C, A, B) + randint(10, 100))
          D = p2.listePoints[0]
          E = p2.listePoints[1]
          F = p2.listePoints[2]
          code1 = codageSegment(A, B, '|')
          code2 = codageSegment(D, E, '|')
          code3 = codageSegment(B, C, '||')
          code4 = codageSegment(E, F, '||')
          code5 = codageSegment(C, A, '|||')
          code6 = codageSegment(F, D, '|||')
          codeA1 = codageAngle(A, B, C)
          codeA2 = codageAngle(D, E, F)
          codeA3 = codageAngle(B, C, A, 0.8, 'X')
          codeA4 = codageAngle(E, F, D, 0.8, 'X')
          codeA5 = codageAngle(C, A, B, 0.8, '||')
          codeA6 = codageAngle(F, D, E, 0.8, '||')
          nom1 = choisitLettresDifferentes(3)
          nom1 = nom1 + ' ' + choisitLettresDifferentes(2, nom1)
          nom1 = nom1.replaceAll(',', '')
          nommeP1 = nommePolygone(polygone(A, B, C, D, E, F), nom1)
          Anom = nom1[0]
          Bnom = nom1[1]
          Cnom = nom1[2]
          Dnom = nom1[0]
          Enom = nom1[4]
          Fnom = nom1[5]
          texte = `Ci-dessous les triangles $${shuffleLettres(Anom + Bnom + Cnom)}$ et $${shuffleLettres(Dnom + Enom + Fnom)}$ sont égaux.<br>`
          texte += `$[${Anom + Bnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Bnom + Cnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Cnom + Anom}]$ et ............ sont homologues.<br>`
          texte += mathalea2d({
            xmin: Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 3,
            ymin: Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 3,
            xmax: Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 3,
            ymax: Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 3,
            scale: 0.5,
            zoom
          },
          p1, p2, code1, code2, code3, code4, codeA1, codeA2, nommeP1)
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'similitude2':
          p2 = similitude(p1, O2, randint(160, 200), 1)
          D = p2.listePoints[0]
          E = p2.listePoints[1]
          F = p2.listePoints[2]
          code1 = codageSegment(A, B, '|')
          code2 = codageSegment(D, E, '|')
          code3 = codageSegment(B, C, '||')
          code4 = codageSegment(E, F, '||')
          code5 = codageSegment(C, A, '|||')
          code6 = codageSegment(F, D, '|||')
          codeA1 = codageAngle(A, B, C)
          codeA2 = codageAngle(D, E, F)
          codeA3 = codageAngle(B, C, A, 0.8, 'X')
          codeA4 = codageAngle(E, F, D, 0.8, 'X')
          codeA5 = codageAngle(C, A, B, 0.8, '||')
          codeA6 = codageAngle(F, D, E, 0.8, '||')
          nom1 = choisitLettresDifferentes(3)
          nom2 = choisitLettresDifferentes(3, nom1)
          Anom = nom1[0]
          Bnom = nom1[1]
          Cnom = nom1[2]
          Dnom = nom2[0]
          Enom = nom2[1]
          Fnom = nom2[2]
          nommeP1 = nommePolygone(p1, nom1)
          nommeP2 = nommePolygone(p2, nom2)
          texte = `Ci-dessous les triangles $${shuffleLettres(Anom + Bnom + Cnom)}$ et $${shuffleLettres(Dnom + Enom + Fnom)}$ sont égaux.<br>`
          texte += `$[${Anom + Bnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Bnom + Cnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Cnom + Anom}]$ et ............ sont homologues.<br>`
          texte += mathalea2d({
            xmin: Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 3,
            ymin: Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 3,
            xmax: Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 3,
            ymax: Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 3,
            scale: 0.5,
            zoom
          },
          p1, p2, code1, code2, code3, code4, codeA1, codeA2, nommeP1, nommeP2)
          break
        case 'rotation3':
          p2 = rotation(p1, A, angle(C, A, B) + randint(10, 100))
          D = p2.listePoints[0]
          E = p2.listePoints[1]
          F = p2.listePoints[2]
          code1 = codageSegment(A, B, '|')
          code2 = codageSegment(D, E, '|')
          code3 = codageSegment(B, C, '||')
          code4 = codageSegment(E, F, '||')
          code5 = codageSegment(C, A, '|||')
          code6 = codageSegment(F, D, '|||')
          codeA1 = codageAngle(A, B, C)
          codeA2 = codageAngle(D, E, F)
          codeA3 = codageAngle(B, C, A, 0.8, 'X')
          codeA4 = codageAngle(E, F, D, 0.8, 'X')
          codeA5 = codageAngle(C, A, B, 0.8, '||')
          codeA6 = codageAngle(F, D, E, 0.8, '||')
          nom1 = choisitLettresDifferentes(3)
          nom1 = nom1 + ' ' + choisitLettresDifferentes(2, nom1)
          nom1 = nom1.replaceAll(',', '')
          nommeP1 = nommePolygone(polygone(A, B, C, D, E, F), nom1)
          Anom = nom1[0]
          Bnom = nom1[1]
          Cnom = nom1[2]
          Dnom = nom1[0]
          Enom = nom1[4]
          Fnom = nom1[5]
          texte = `Ci-dessous les triangles $${shuffleLettres(Anom + Bnom + Cnom)}$ et $${shuffleLettres(Dnom + Enom + Fnom)}$ sont égaux.<br>`
          texte += `$[${Anom + Bnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Bnom + Cnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Cnom + Anom}]$ et ............ sont homologues.<br>`
          texte += mathalea2d({
            xmin: Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 3,
            ymin: Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 3,
            xmax: Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 3,
            ymax: Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 3,
            scale: 0.5,
            zoom
          },
          p1, p2, code1, code2, codeA1, codeA2, codeA5, codeA6, nommeP1)
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'similitude3':
          p2 = similitude(p1, O2, randint(160, 200), 1)
          D = p2.listePoints[0]
          E = p2.listePoints[1]
          F = p2.listePoints[2]
          code1 = codageSegment(A, B, '|')
          code2 = codageSegment(D, E, '|')
          code3 = codageSegment(B, C, '||')
          code4 = codageSegment(E, F, '||')
          code5 = codageSegment(C, A, '|||')
          code6 = codageSegment(F, D, '|||')
          codeA1 = codageAngle(A, B, C)
          codeA2 = codageAngle(D, E, F)
          codeA3 = codageAngle(B, C, A, 0.8, 'X')
          codeA4 = codageAngle(E, F, D, 0.8, 'X')
          codeA5 = codageAngle(C, A, B, 0.8, '||')
          codeA6 = codageAngle(F, D, E, 0.8, '||')
          nom1 = choisitLettresDifferentes(3)
          nom2 = choisitLettresDifferentes(3, nom1)
          Anom = nom1[0]
          Bnom = nom1[1]
          Cnom = nom1[2]
          Dnom = nom2[0]
          Enom = nom2[1]
          Fnom = nom2[2]
          nommeP1 = nommePolygone(p1, nom1)
          nommeP2 = nommePolygone(p2, nom2)
          texte = `Ci-dessous les triangles $${shuffleLettres(Anom + Bnom + Cnom)}$ et $${shuffleLettres(Dnom + Enom + Fnom)}$ sont égaux.<br>`
          texte += `$[${Anom + Bnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Bnom + Cnom}]$ et ............ sont homologues.<br>`
          texte += `$[${Cnom + Anom}]$ et ............ sont homologues.<br>`
          texte += mathalea2d({
            xmin: Math.min(A.x, B.x, C.x, D.x, E.x, F.x) - 3,
            ymin: Math.min(A.y, B.y, C.y, D.y, E.y, F.y) - 3,
            xmax: Math.max(A.x, B.x, C.x, D.x, E.x, F.x) + 3,
            ymax: Math.max(A.y, B.y, C.y, D.y, E.y, F.y) + 3,
            scale: 0.5,
            zoom
          },
          p1, p2, code1, code2, codeA1, codeA2, codeA5, codeA6, nommeP1, nommeP2)
          break
      }
      texteCorr = `$[${Anom + Bnom}]$ et $[${Dnom + Enom}]$ sont homologues.<br>`
      texteCorr += `$[${Bnom + Cnom}]$ et $[${Enom + Fnom}]$ sont homologues.<br>`
      texteCorr += `$[${Cnom + Anom}]$ et $[${Fnom + Dnom}]$ sont homologues.<br>`
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
