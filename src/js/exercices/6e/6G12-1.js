import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, arrondi, texNombre, texteEnCouleur, numAlpha, stringNombre } from '../../modules/outils.js'
import { point, tracePoint, pointSurDroite, pointIntersectionDD, labelPoint, droite, droiteParPointEtParallele, droiteParPointEtPerpendiculaire, segment, rotation, codageAngleDroit, afficheCoteSegment, grille, seyes, longueur } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC
export const titre = 'Tracer des parallèles et des perpendiculaires'

/**
 * Fonction générale pour exercices de constructions de parallèles et perpendiculaires
 * références 6G11, 6G12 et 6G12-1
 * Animation de la correction ajoutée le 16/04/2021
 * @author Jean-Claude Lhote  (AMC par Eric Elter en septembre 2021, ES6 par Loïc Geeraerts
 */

export const uuid = 'd14bc'
export const ref = '6G12-1'
export default class ParalleleEtPerpendiculaires extends Exercice {
//  'use strict'
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 1
    this.nbCols = 1
    this.nbColsCorr = 1
    this.sup = 1
    this.type = 3
    this.typeExercice = 'IEP'
    this.besoinFormulaire2CaseACocher = ['Avec auto-correction']
    this.sup2 = true

    this.besoinFormulaireNumerique = [
      'Type de cahier',
      3,
      ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
    ]
  }

  nouvelleVersion () {
    const typesDeQuestionsDisponibles = [this.type] // Le choix 1 ou 2 ou 3 : 1=perpendiculaires, 2=parallèles, 3=des perpendiculaires et des paralèlles
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let Xmin; let Xmax; let Ymin; let Ymax; const ppc = 20; let sc
    let anim

    let A
    let B
    let C
    let D
    let xE
    let E
    let F
    let CC
    let DD
    let EE
    let d
    let s1
    let s2
    let enonce
    let correction
    let dB
    let dC
    let dD
    let dE
    let g
    let lC
    let lD
    let lE
    let cB
    let cC
    let cD
    let cE
    let cF
    let cG
    let FF
    let BB
    let carreaux
    let k
    const objetsEnonce = []
    const objetsCorrection = []

    let p
    for (
      let i = 0, texte, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      anim = new Alea2iep()
      anim.equerreZoom(150)
      objetsEnonce.length = 0
      objetsCorrection.length = 0
      correction = ''
      if (this.sup === 2) { k = 0.8 } else { k = 0.5 }
      if (this.sup === 3) { this.sup2 = false } // Pour obliger à enlever l'auto-correction sur papier blanc, car elle est alors impossible. Pb néanmoins avec la case à cocher qui ni bouge pas (Pb soulevé dans le Slack)
      switch (listeTypeDeQuestions[i]) {
        case 1:
          A = point(0, 0, 'A', 'above left')
          B = point(10, randint(-4, 4, [-1, 0, 1]), 'B', 'above right')
          d = droite(A, B)
          d.isVisible = true
          C = point(randint(2, 3), randint(3, 4), 'C', 'above left')
          D = point(randint(7, 8), randint(-7, -6), 'D')
          dB = droiteParPointEtPerpendiculaire(B, d)
          xE = 11
          E = pointSurDroite(dB, 11, 'E', 'left')
          while (!Number.isInteger(E.y)) {
            xE++
            E = pointSurDroite(dB, xE, 'E', 'left')
          }
          F = point(E.x, B.y)
          s1 = segment(B, F, 'red')
          s1.epaisseur = 2
          s1.pointilles = 5
          s2 = segment(F, E, 'blue')
          s2.epaisseur = 2
          s2.pointilles = 5
          dC = droiteParPointEtPerpendiculaire(C, d)
          dD = droiteParPointEtPerpendiculaire(D, d)
          BB = rotation(A, B, 90)
          CC = pointIntersectionDD(dC, d, 'M', 'below right')
          DD = pointIntersectionDD(dD, d, 'N', 'above left')
          lC = arrondi(longueur(CC, A) * k, 1)
          lD = arrondi(longueur(DD, A) * k, 1)
          cB = codageAngleDroit(A, B, BB)
          cC = codageAngleDroit(C, CC, B)
          cD = codageAngleDroit(D, DD, B)
          if (this.sup2) {
            objetsCorrection.push(s1,
              s2,
              dC,
              dD,
              dB,
              cB,
              cC,
              cD,
              d,
              tracePoint(A, B, C, D, E, CC, DD),
              labelPoint(A, B, C, D, E, CC, DD),
              afficheCoteSegment(
                segment(A, CC),
              `${stringNombre(lC)} cm`,
              0.5,
              'red',
              1,
              0.5,
              'red'
              ),
              afficheCoteSegment(
                segment(A, DD),
              `${stringNombre(lD)} cm`,
              -0.5,
              'red',
              1,
              -0.5,
              'red'
              )
            )
          } else {
            objetsCorrection.push(dC,
              dD,
              dB,
              cB,
              cC,
              cD,
              d,
              tracePoint(A, B, C, D, E, CC, DD),
              labelPoint(A, B, C, D, E, CC, DD)
            )
          }
          objetsEnonce.push(
            tracePoint(A, B, C, D),
            labelPoint(A, B, C, D),
            d
          )
          if (context.isHtml) enonce = numAlpha(0) + ' Reproduire la figure ci-dessous.<br>'
          else enonce = numAlpha(0) + ' Utiliser un crayon à papier afin de pouvoir gommer si besoin.<br>'
          enonce +=
          numAlpha(1) +
          ' Tracer la droite perpendiculaire à $(AB)$ passant par $B$.<br>'
          enonce +=
          numAlpha(2) +
          ' Tracer la droite perpendiculaire à $(AB)$ passant par $C$ et nommer $M$ le point d\'intersection de cette droite avec la droite $(AB)$.<br>'
          enonce +=
          numAlpha(3) +
          ' Tracer la droite perpendiculaire à $(AB)$ passant par $D$ et nommer $N$ le point d\'intersection de cette droite avec la droite $(AB)$.<br>'
          if (this.sup2) {
            enonce +=
          numAlpha(4) +
          ' Mesurer ensuite les distances $AM$ et $AN$. Pour l\'auto-correction comparer ces mesures avec celles données dans la correction<br>'

            correction = `<br>$AM \\approx ${texNombre(
          lC
        )}$ cm et $AN \\approx ${texNombre(lD)}$ cm.<br>`
            correction += 'Pour la perpendiculaire en $B$, contrôle la position du point $E$.<br>'
          }
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, CC.y, DD.y) + 1)
          anim.recadre(Xmin - 3, Ymax)
          anim.pointsCreer(A, B, C, D)
          anim.regleDroite(A, B)
          anim.perpendiculaireRegleEquerre2points3epoint(A, B, B)
          anim.perpendiculaireRegleEquerre2points3epoint(A, B, C)
          anim.perpendiculaireRegleEquerre2points3epoint(A, B, D)
          break
        case 2:
          A = point(2, 0, 'A', 'below left')
          B = point(12, randint(-4, 4, 0), 'B')
          d = droite(A, B)
          d.isVisible = true
          C = point(0, randint(3, 4), 'C', 'above')
          D = point(randint(7, 8), randint(-7, -6), 'D', 'below right')
          E = point(randint(4, 5), randint(5, 6), 'E', 'below right')
          F = point(2, -3, 'F', 'left')

          dE = droiteParPointEtParallele(E, d)
          dC = droiteParPointEtParallele(C, d)
          dD = droiteParPointEtParallele(D, d)
          p = droite(A, F)
          p.isVisible = true
          CC = pointIntersectionDD(dC, p, 'M', 'above left')
          DD = pointIntersectionDD(dD, p, 'N', 'above left')
          EE = pointIntersectionDD(dE, p, 'O', 'above left')
          lC = arrondi(longueur(CC, A) * k, 1)
          lD = arrondi(longueur(DD, A) * k, 1)
          lE = arrondi(longueur(EE, A) * k, 1)
          if (this.sup2) {
            objetsCorrection.push(dC, dD, dE, d, p, tracePoint(A, B, C, D, E, F), labelPoint(A, B, C, D, E, F, CC, DD, EE), afficheCoteSegment(segment(A, CC), `${stringNombre(lC)} cm`, 0.2, 'red', 1, 0.5, 'red'), afficheCoteSegment(segment(DD, A), `${stringNombre(lD)} cm`, -0.2, 'green', 1, -0.5, 'green'), afficheCoteSegment(segment(A, EE), `${stringNombre(lE)} cm`, -0.2, 'blue', 1, -0.5, 'blue'))
          } else {
            objetsCorrection.push(dC, dD, dE, d, p, tracePoint(A, B, C, D, E, F), labelPoint(A, B, C, D, E, F, CC, DD, EE))
          }
          objetsEnonce.push(tracePoint(A, B, C, D, E, F), labelPoint(A, B, C, D, E, F), d, p)

          if (context.isHtml) enonce = numAlpha(0) + ' Reproduire la figure ci-dessous.<br>'
          else enonce = numAlpha(0) + ' Utiliser un crayon à papier afin de pouvoir gommer si besoin.<br>'
          enonce += numAlpha(1) + ' Tracer la droite parallèle à $(AB)$ passant par $C$ et nommer $M$, le point d\'intersection de cette droite avec la droite $(AF)$.<br>'
          enonce += numAlpha(2) + ' Tracer la droite parallèle à $(AB)$ passant par $D$ et nommer $N$, le point d\'intersection de cette droite avec la droite $(AF)$.<br>'
          enonce += numAlpha(3) + ' Tracer la droite parallèle à $(AB)$ passant par $E$ et nommer $O$, le point d\'intersection de cette droite avec la droite $(AF)$.<br>'
          if (this.sup2) {
            enonce += numAlpha(4) + ' Mesurer les distances $AM$, $AN$ et $AO$. Pour l\'auto-correction, comparer ces mesures avec celles données par  l\'ordinateur dans la correction.<br>'

            correction = `<br>$AM \\approx ${texNombre(
          lC
        )}$ cm, $AN \\approx ${texNombre(
          lD
        )}$ cm et $AO \\approx${texNombre(
          lE
        )}$ cm.<br>`
          }
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, F.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, F.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, F.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, F.y, EE.y, CC.y, DD.y) + 1)
          anim.recadre(Xmin - 3, Ymax)
          anim.pointsCreer(A, B, C, D, E)
          anim.regleDroite(A, B)
          anim.paralleleRegleEquerre2points3epoint(A, B, C)
          anim.paralleleRegleEquerre2points3epoint(A, B, D)
          anim.paralleleRegleEquerre2points3epoint(A, B, E)

          break
        case 3:
          A = point(0, 0, 'A', 'above left')
          B = point(10, randint(-4, 4, [-1, 0, 1]), 'B', 'above right')
          d = droite(A, B)
          d.isVisible = true
          C = point(randint(2, 3), randint(3, 4), 'C', 'above left')
          D = point(randint(7, 8), randint(-7, -6), 'D')
          dB = droiteParPointEtPerpendiculaire(B, d)
          xE = 11
          E = pointSurDroite(dB, 11, 'E', 'left')
          while (!Number.isInteger(E.y)) {
            xE++
            E = pointSurDroite(dB, xE, 'E', 'left')
          }
          F = point(E.x, B.y)
          dE = droiteParPointEtParallele(E, d)
          dD = droiteParPointEtParallele(D, d)
          dC = droiteParPointEtPerpendiculaire(C, d)
          BB = rotation(A, B, 90)
          CC = pointIntersectionDD(dC, d, 'M', 'below right')
          DD = pointIntersectionDD(dD, dB, 'N', 'above left')
          EE = pointIntersectionDD(dC, dE, 'O', 'above left')
          FF = pointIntersectionDD(dD, dC)

          lC = arrondi(longueur(CC, A) * k, 1)
          lD = arrondi(longueur(DD, A) * k, 1)
          lE = arrondi(longueur(EE, A) * k, 1)
          cB = codageAngleDroit(A, B, BB)
          cC = codageAngleDroit(C, CC, B)
          cD = codageAngleDroit(D, DD, B, 'red')
          cE = codageAngleDroit(B, E, EE, 'red')
          cF = codageAngleDroit(C, EE, E, 'red')
          cG = codageAngleDroit(C, FF, D, 'red')
          if (this.sup2) {
            objetsCorrection.push(dC, dD, dB, dE, cB, cC, cD, cE, cF, cG, d, tracePoint(A, B, C, D, E, CC, DD, EE), labelPoint(A, B, C, D, E, CC, DD, EE), afficheCoteSegment(
              segment(A, CC),
          `${stringNombre(lC)} cm`,
          0.5,
          'red',
          1,
          0.5,
          'red'
            ),
            afficheCoteSegment(
              segment(A, DD),
            `${stringNombre(lD)} cm`,
            0,
            'blue',
            1,
            -0.5,
            'blue'
            ),
            afficheCoteSegment(
              segment(A, EE),
            `${stringNombre(lE)} cm`,
            0,
            'green',
            1,
            -0.5,
            'green'
            ))
          } else {
            objetsCorrection.push(dC, dD, dB, dE, cB, cC, cD, cE, cF, cG, d, tracePoint(A, B, C, D, E, CC, DD, EE), labelPoint(A, B, C, D, E, CC, DD, EE))
          }
          objetsEnonce.push(tracePoint(A, B, C, D, E), labelPoint(A, B, C, D, E), d)
          if (context.isHtml) enonce = numAlpha(0) + ' Reproduire la figure ci-dessous.<br>'
          else enonce = numAlpha(0) + ' Utiliser un crayon à papier afin de pouvoir gommer si besoin.<br>'
          enonce += numAlpha(1) + ' Tracer la droite perpendiculaire à $(AB)$ passant par $B$.<br>'
          enonce += numAlpha(2) + ' Tracer la droite perpendiculaire à $(AB)$ passant par $C$ et nomme $M$, le point d\'intersection de cette droite avec la droite $(AB)$.<br>'
          enonce += numAlpha(3) + ' Tracer la droite parallèle à $(AB)$ passant par $D$ et nomme $N$, le point d\'intersection de cette droite avec la droite $(BE)$.<br>'
          enonce += numAlpha(4) + ' Tracer la droite parallèle à $(AB)$ passant par $E$ et nomme $O$, le point d\'intersection de cette droite avec la droite $(CM)$.<br>'
          if (this.sup2) {
            enonce += numAlpha(5) + ' Mesurer les distances $AM$, $AN$ et $AO$. Pour l\'auto-correction, comparer ces mesures avec celles données par  l\'ordinateur dans la correction.<br>'

            correction += `<br>$AM \\approx ${texNombre(
          lC
        )}$ cm, $AN \\approx ${texNombre(
          lD
        )}$ cm et $AO \\approx${texNombre(
          lE
        )}$ cm.<br>`
          }
          correction += `Les angles droits en rouge se justifient par la propriété :<br> ${texteEnCouleur('Si deux droites sont parallèles, alors toute droite perpendiculaire à l\'une est aussi perpendiculaire à l\'autre', 'red')}.<br>`
          correction += 'Vérifier les angles droits à l\'équerre.<br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, F.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, F.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, F.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, F.y, EE.y, CC.y, DD.y) + 1)
          anim.recadre(Xmin - 3, Ymax)
          anim.pointsCreer(A, B, C, D, E)
          anim.regleDroite(A, B)
          anim.perpendiculaireRegleEquerre2points3epoint(A, B, B)
          anim.perpendiculaireRegleEquerre2points3epoint(A, B, C)
          anim.paralleleRegleEquerre2points3epoint(A, B, D)
          anim.paralleleRegleEquerre2points3epoint(A, B, E)

          break
      }
      if (this.sup < 3) g = grille(Xmin, Ymin, Xmax, Ymax, 'gray', 0.7)
      else g = ''
      if (parseInt(this.sup) === 2) {
        sc = 0.8
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax)
      } else {
        sc = 0.5
        carreaux = ''
      }
      objetsEnonce.push(g, carreaux)
      objetsCorrection.push(g, carreaux)

      enonce += '<br>' + mathalea2d(
        {
          xmin: Xmin,
          ymin: Ymin,
          xmax: Xmax,
          ymax: Ymax,
          pixelsParCm: ppc,
          scale: sc
        },
        objetsEnonce
      )
      correction += mathalea2d(
        {
          xmin: Xmin,
          ymin: Ymin,
          xmax: Xmax,
          ymax: Ymax,
          pixelsParCm: ppc,
          scale: sc
        },
        objetsCorrection
      )
      /** ********************** AMC Open *****************************/
      this.autoCorrection[i] = {}
      this.autoCorrection[i].options = { ordered: false }
      this.autoCorrection[i].enonce = enonce + '<br>'
      this.autoCorrection[i].propositions = [
        {
          texte: correction,
          statut: 3,
          sanscadre: true
        }
      ]
      // this.autoCorrection = [{ enonce: enonce + '<br>', propositions: [{ texte: correction, statut: 3, sanscadre: true }] }]
      /****************************************************/
      correction += anim.htmlBouton(this.numeroExercice, i)
      if (this.listeQuestions.indexOf(texte) === -1) {
      // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(enonce + '<br>')
        this.listeCorrections.push(correction + '<br>')
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
