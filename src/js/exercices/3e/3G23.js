/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choice, shuffle, texteEnCouleur, texteGras } from '../../modules/outils.js'
import { point, tracePoint, milieu, pointSurSegment, pointIntersectionDD, labelPoint, barycentre, droite, vecteur, segment, polygone, nommePolygone, aireTriangle, arc, rotation, translationAnimee, rotationAnimee, codageSegments, grille, angleOriente } from '../../modules/2d.js'
export const titre = 'Reconnaître des triangles égaux dans différentes configurations'

/**
 * 3G23 reconnaître des triangles égaux
 * @author Jean-Claude Lhote et Sébastien Lozano
 */
export default function TrianglesEgaux () {
  Exercice.call(this)
  this.debug = false
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte = ''
    let texteCorr = ''
    const typesDeQuestions = randint(1, 1)
    switch (typesDeQuestions) {
      case 1:
        let trouve = false; let aireABC; let A; let B; let C; let M; let p; let q; let r; let s; let X; let G; let Gq; let nom1; let grid
        // on génère le triangle ABC avec une contrainte sur son aire
        while (!trouve) {
          A = point(choice([0, 3]), choice([0, 3]), 'A') // le point A !
          B = point(choice([6, 9]), choice([6, 9]), 'B') // le point B !
          C = rotation(B, A, 90, 'C') // le point C à partir de B par rotation autour de A!
          C.x += choice([0, 3, 6]) // on décale l'abscise de C de 0, 3 ou 6 !
          C.y += choice([-3, 0, 3]) // on décale l'abscise de C de -3, 0 ou 3 !
          p = polygone(A, B, C) // on trace le polygone ABC
          aireABC = aireTriangle(p) // Je savais bien que cette formule servirait un jour !
          if (aireABC < 11 && aireABC > 5) { trouve = true }
        };
        G = barycentre(p) // le barycentre de ABC
        const angleChoisi1 = choice([0, 90, 270])
        p = rotation(p, G, angleChoisi1) // on tourne ABC de façon aléatoire autour de son barycentre
        p.couleurDeRemplissage = colorToLatexOrHTML('gray') // remplissage de ABC
        p.opaciteDeRemplissage = 0.2 // 0.5;//remplissage de ABC
        nom1 = nommePolygone(p, 'ABC', 0.4) // on  nomme ABC en plaçant A,B et C à 0,4
        grid = grille(-3, -3, 27, 18, 'gray', 0.4, 1) // on trace une grille
        M = point(9, 12) // un point M fixe pour tourner autour
        q = rotation(p, M, 90) // on fait tourner ABC autour de M de 90°

        // on a besoin de récupérer le polygone non tracé
        Gq = barycentre(q) // on construit son barycentre

        // let angleChoisi2 = 270;
        const angleChoisi2 = choice([0, 90, 180, 270])
        r = rotation(q, Gq, angleChoisi2) // on fait tourner q encore autour de son barycentre
        X = milieu(r.listePoints[0], r.listePoints[1]) // on place le milieu des deux premiers points de la figure obtenue qui sont les images des points A et B initiaux
        s = rotation(r, X, 180) // on fait topurner r autour du milieu des deux extremites du plus grand côté
        r.couleurDeRemplissage = colorToLatexOrHTML('red') // solution 1 en rouge
        r.opaciteDeRemplissage = 0.2 // 0.5; //
        s.couleurDeRemplissage = colorToLatexOrHTML('blue') // solution 2 en bleu
        s.opaciteDeRemplissage = 0.2 // 0.5; //

        // mes ajouts par rapport à la figure de JC
        // on fixe une place pour D et E
        const D = r.listePoints[0]
        D.nom = 'D'
        const E = r.listePoints[1]
        E.nom = 'E'
        // on crée un tableau avec les noms proposé pour les points
        let tabPointsNames = ['F', 'G', 'H', 'I']
        // on mélange le tableau
        tabPointsNames = shuffle(tabPointsNames)
        // on place les deux solutions
        const I = r.listePoints[2]
        // I.nom='I';
        I.nom = tabPointsNames[0]
        const I1 = rotation(I, X, 180)
        // I1.nom='I1';
        I1.nom = tabPointsNames[1]
        // on place les mauvaises solutions
        const F = point(I1.x + 1, I1.y + 1)
        // F.nom='F';
        F.nom = tabPointsNames[2]
        const L = point(I.x - 1, I.y - 3)
        // L.nom='L';
        L.nom = tabPointsNames[3]
        // on trace le segment [DE] en pointillés pour que la figure soit plus lisible
        const sgmt_DE = segment(D, E, 'blue')
        sgmt_DE.pointilles = 5
        sgmt_DE.epaisseur = 1.5

        // on prépare la fenetre mathalea2d
        const fenetreMathalea2D = { xmin: -3, ymin: -3, xmax: 27, ymax: 18, pixelsParCm: 20, scale: 0.5 }

        // on prépare les corrections
        const centre_rot = {
          sol1: pointIntersectionDD(droite(p.listePoints[1], E), droite(D, p.listePoints[0])),
          sol2: pointIntersectionDD(droite(E, p.listePoints[0]), droite(p.listePoints[1], D))
        }
        const vect_trans = {
          sol1: vecteur(p.listePoints[1], E),
          sol2: vecteur(p.listePoints[1], D)
        }
        const transformationAnimee = {
          sol1: '',
          // nature_sol1:``,
          sol2: ''
        }
        // pour construire les droites et les centres passant par les centres de rotations
        let d, d1, d2, d3, d4, d5, J1, J2
        switch (angleChoisi2) {
          case 0:
            transformationAnimee.sol1 = rotationAnimee(p, M, 90, 'begin="0s" dur="4s" repeatCount="indefinite"')
            // transformationAnimee.nature_sol1=`rotation`;
            // la 1ere compo
            d = droite(M, Gq)
            d1 = rotation(d, M, -45)
            d2 = rotation(d, Gq, 0)
            J1 = pointIntersectionDD(d1, d2) // centre de la composée, ici l'angle vaut 90

            // 2eme compo
            d3 = droite(J1, X)
            d4 = rotation(d3, J1, -45)
            d5 = rotation(d3, X, 90)
            J2 = pointIntersectionDD(d4, d5) // centre après la seconde composition angle 270 à 2pi près
            transformationAnimee.sol2 = rotationAnimee(p, J2, -90, 'begin="0s" dur="4s" repeatCount="indefinite"')
            // transformationAnimee.nature_sol2=`rotation`;
            break
          case 90:
            transformationAnimee.sol1 = rotationAnimee(p, centre_rot.sol1, 180, 'begin="0s" dur="4s" repeatCount="indefinite"')
            // transformationAnimee.nature_sol1=`rotation`;
            transformationAnimee.sol2 = translationAnimee(p, vect_trans.sol2, 'begin="0s" dur="4s" repeatCount="indefinite"')
            // transformationAnimee.nature_sol2=`translation`;
            break
          case 180:
            // la 1ere compo
            d = droite(M, Gq)
            d1 = rotation(d, M, -45)
            d2 = rotation(d, Gq, 90)
            J1 = pointIntersectionDD(d1, d2) // centre de la composée, ici l'angle vaut 270 à 2pi près

            // 2eme compo
            d3 = droite(J1, X)
            d4 = rotation(d3, J1, -135)
            d5 = rotation(d3, X, 90)
            J2 = pointIntersectionDD(d4, d5) // centre après la seconde composition angle 450 à 2pi près
            transformationAnimee.sol1 = rotationAnimee(p, J1, -90, 'begin="0s" dur="4s" repeatCount="indefinite"')
            // transformationAnimee.nature_sol1=`rotation`;
            transformationAnimee.sol2 = rotationAnimee(p, J2, 90, 'begin="0s" dur="4s" repeatCount="indefinite"')
            // transformationAnimee.nature_sol2=`rotation`;
            break
          case 270:
            transformationAnimee.sol1 = translationAnimee(p, vect_trans.sol1, 'begin="0s" dur="4s" repeatCount="indefinite"')
            // transformationAnimee.nature_sol1=`translation`;
            transformationAnimee.sol2 = rotationAnimee(p, centre_rot.sol2, 180, 'begin="0s" dur="4s" repeatCount="indefinite"')
            // transformationAnimee.nature_sol2=`rotation`;
            break
        }
        // DE = AB
        const seg_DE_corr = segment(D, E, 'blue')
        seg_DE_corr.epaisseur = 2
        const seg_AB_corr = segment(p.listePoints[0], p.listePoints[1], 'blue')
        seg_AB_corr.epaisseur = 2
        // DI = AC ou EI1 = AC
        const seg_DI_corr = segment(D, I, 'red')
        const seg_EI1_corr = segment(E, I1, 'red')
        seg_DI_corr.epaisseur = 2
        seg_EI1_corr.epaisseur = 2
        const seg_AC_corr = segment(p.listePoints[0], p.listePoints[2], 'red')
        seg_AC_corr.epaisseur = 2
        // EI = BC ou DI1 = BC
        const seg_EI_corr = segment(E, I, 'green')
        const seg_DI1_corr = segment(D, I1, 'green')
        seg_EI_corr.epaisseur = 2
        seg_DI1_corr.epaisseur = 2
        const seg_BC_corr = segment(p.listePoints[1], p.listePoints[2], 'green')
        seg_BC_corr.epaisseur = 2
        // angle ABC = DEI ou ABC = EDI1
        const ang_ABC = angleOriente(p.listePoints[0], p.listePoints[1], p.listePoints[2])
        const ang_DEI = angleOriente(D, E, I)
        const ang_EDI1 = angleOriente(E, D, I1)
        // angle BCA = EID ou  BCA = DI1E
        const ang_BCA = angleOriente(p.listePoints[1], p.listePoints[2], p.listePoints[0])
        const ang_EID = angleOriente(E, I, D)
        const ang_EI1D = angleOriente(E, I1, D)
        // angle CAB = IDE ou CAB = I1ED
        const ang_CAB = angleOriente(p.listePoints[2], p.listePoints[0], p.listePoints[1])
        const ang_IDE = angleOriente(I, D, E)
        const ang_I1ED = angleOriente(I1, E, D)

        const codages_correction = {
          sol1: [
            // les segments
            seg_AB_corr,
            seg_DE_corr,
            codageSegments('×', 'blue', p.listePoints[0], p.listePoints[1], D, E),
            seg_AC_corr,
            seg_DI_corr,
            codageSegments('||', 'red', p.listePoints[0], p.listePoints[2], D, I),
            seg_BC_corr,
            seg_EI_corr,
            codageSegments('O', 'green', p.listePoints[1], p.listePoints[2], I, E),
            // les angles
            arc(pointSurSegment(p.listePoints[1], p.listePoints[0], 0.8), p.listePoints[1], ang_ABC, true, 'red'),
            arc(pointSurSegment(E, D, 0.8), E, ang_DEI, true, 'red'),
            arc(pointSurSegment(p.listePoints[2], p.listePoints[1], 0.8), p.listePoints[2], ang_BCA, true, 'blue'),
            arc(pointSurSegment(I, E, 0.8), I, ang_EID, true, 'blue'),
            arc(pointSurSegment(p.listePoints[0], p.listePoints[2], 0.8), p.listePoints[0], ang_CAB, true, 'green'),
            arc(pointSurSegment(D, I, 0.8), D, ang_IDE, true, 'green')
          ],
          sol2: [
            // les segments
            seg_AB_corr,
            seg_DE_corr,
            codageSegments('×', 'blue', p.listePoints[0], p.listePoints[1], D, E),
            seg_BC_corr,
            seg_DI1_corr,
            codageSegments('O', 'green', p.listePoints[1], p.listePoints[2], D, I1),
            seg_AC_corr,
            seg_EI1_corr,
            codageSegments('||', 'red', p.listePoints[0], p.listePoints[2], E, I1),
            // les angles
            arc(pointSurSegment(p.listePoints[1], p.listePoints[0], 0.8), p.listePoints[1], ang_ABC, true, 'red'),
            arc(pointSurSegment(D, E, 0.8), D, ang_EDI1, true, 'red'),
            arc(pointSurSegment(p.listePoints[2], p.listePoints[1], 0.8), p.listePoints[2], ang_BCA, true, 'blue'),
            arc(pointSurSegment(I1, E, 0.8), I1, ang_EI1D, true, 'blue'),
            arc(pointSurSegment(p.listePoints[0], p.listePoints[2], 0.8), p.listePoints[0], ang_CAB, true, 'green'),
            arc(pointSurSegment(E, I1, 0.8), E, ang_I1ED, true, 'green')
          ]
        }

        // on crée un objet pour stocker les figures et les corrections
        const figures = {
          enonce: `
                        Où placer le point $M$ pour que les triangles $ABC$ et $DEM$ soient égaux ? 
                        <br>En $F$ ? En $G$? En $H$ ? En $I$ ?
                        <br>
                        ${mathalea2d(
                        fenetreMathalea2D,
                        p,
                        nom1,
                        grid,
                        tracePoint(D, E, I, I1, F, L),
                        labelPoint(D, E, I, I1, F, L),
                        sgmt_DE
                    )}`,
          corr_solution1: `
                        Les triangles $ABC$ et $DE${I.nom}$ ont les mêmes longueurs et les mêmes angles.
                        <br> ${texteEnCouleur(`Donc le point ${I.nom} est un point qui convient`)}
                        <br>
                        ${mathalea2d(
                        fenetreMathalea2D,
                        p,
                        nom1,
                        grid,
                        tracePoint(D, E, I, I1, F, L),
                        labelPoint(D, E, I, I1, F, L),
                        sgmt_DE,
                        r,
                        // s,
                        codages_correction.sol1
                    )}`,
          corr_solution2: `
                        Les triangles $ABC$ et $DE${I1.nom}$ ont les mêmes longueurs et les mêmes angles.
                        <br> ${texteEnCouleur(`Donc le point ${I1.nom} est un point qui convient`)}
                        <br>
                        ${mathalea2d(
                        fenetreMathalea2D,
                        p,
                        nom1,
                        grid,
                        tracePoint(D, E, I, I1, F, L),
                        labelPoint(D, E, I, I1, F, L),
                        sgmt_DE,
                        // r,
                        s,
                        codages_correction.sol2
                    )}`,
          corr_animmee_sol1: `
                        Les triangles $ABC$ et $DE${I.nom}$ ont les mêmes longueurs et les mêmes angles.
                        <br> ${texteEnCouleur(`Donc le point ${I.nom} est un point qui convient`)}
                        <br>
                        ${mathalea2d(
                        fenetreMathalea2D,
                        p,
                        nom1,
                        grid,
                        // tracePoint(D,E,I,I1,F,L),
                        tracePoint(I1, F, L),
                        // labelPoint(D,E,I,I1,F,L),
                        labelPoint(I1, F, L),
                        nommePolygone(r, 'DE' + I.nom, 0.4),
                        // sgmt_DE,
                        r,
                        transformationAnimee.sol1,
                        codages_correction.sol1
                    )}`,
          corr_animmee_sol2: `
                        Les triangles $ABC$ et $DE${I1.nom}$ ont les mêmes longueurs et les mêmes angles.
                        <br> ${texteEnCouleur(`Donc le point ${I1.nom} est un point qui convient`)}
                        <br>
                        Une solution est donc le point ${I1.nom}
                        <br>
                        ${mathalea2d(
                        fenetreMathalea2D,
                        p,
                        nom1,
                        grid,
                        // tracePoint(D,E,I,I1,F,L),
                        tracePoint(I, F, L),
                        // labelPoint(D,E,I,I1,F,L),
                        labelPoint(I, F, L),
                        nommePolygone(s, 'DE' + I1.nom, 0.4),
                        // sgmt_DE,
                        // r,
                        s,
                        transformationAnimee.sol2,
                        codages_correction.sol2
                    )}`
        }
        // texte=mathalea2d({xmin:-3,ymin:-3,xmax:27,ymax:18,pixelsParCm:20,scale:0.5},p,nom1,grid,r,s)
        texte = `${figures.enonce}`
        if (this.debug) {
          texte += `<br>${texteGras('===== Première solution ======')}<br>${figures.corr_animmee_sol1}`
          texte += `<br><br>${texteGras('===== Seconde solution ======')}<br>${figures.corr_animmee_sol2}`
        } else {
          texteCorr += `${texteGras('===== Première solution ======')}<br>${figures.corr_animmee_sol1}`
          texteCorr += `<br><br>${texteGras('===== Seconde solution ======')}<br>${figures.corr_animmee_sol2}`
        }
        this.listeQuestions[0] = texte
        this.listeCorrections[0] = texteCorr
        listeQuestionsToContenu(this)
        break
    }
  }
}
