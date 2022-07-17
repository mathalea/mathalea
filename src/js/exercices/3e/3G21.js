import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, listeQuestionsToContenuSansNumero, randint, lettreDepuisChiffre, texNombre, miseEnEvidence, texFraction, creerBoutonMathalea2d, contraindreValeur, choice } from '../../modules/outils.js'
import { angleOriente, homothetie, mathalea2d, point, pointSurSegment, polygone, rotation, texteParPoint } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride' // type de question AMC
export const dateDeModificationImportante = '03/04/2022'

export const titre = 'Démontrer que deux droites sont ou ne sont pas parallèles avec le théorème de Thalès'

/**
 * Reciproque_Thales
 * @author Jean-Claude Lhote
 * 18/10/21 passage de MG32 à MathALEA2D par Rémi Angot
 * 3G21
 */
export default function ReciproqueThales () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  context.isHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 1)
  context.isHtml ? (this.spacing = 2) : (this.spacing = 1.5)
  this.nbCols = 1
  this.nbColsCorr = 1
  this.quatrieme = false
  this.sup = 1
  this.sup2 = 3
  this.sup3 = 3
  this.listePackages = 'tkz-euclide'

  // coefficient de l'homothétie compris entre -0,8 et -0,2 ou entre 0,2 et 0,8 pour éviter les constructions trop serrées
  this.nouvelleVersion = function (numeroExercice) {
    this.autoCorrections = []
    this.listeQuestions = []
    this.listeCorrections = []
    this.sup = contraindreValeur(1, 3, parseInt(this.sup), 1)
    this.sup2 = contraindreValeur(1, 3, parseInt(this.sup2), 1)
    this.sup3 = contraindreValeur(1, 3, parseInt(this.sup3), 3)
    const lettre1 = randint(1, 26) // aleatoirisation du nom des points
    const s1 = lettreDepuisChiffre(lettre1)
    const lettre2 = randint(1, 26, [lettre1])
    const s2 = lettreDepuisChiffre(lettre2)
    const lettre3 = randint(1, 26, [lettre1, lettre2])
    const s3 = lettreDepuisChiffre(lettre3)
    const lettre4 = randint(1, 26, [lettre1, lettre2, lettre3])
    const s4 = lettreDepuisChiffre(lettre4)
    const lettre5 = randint(1, 26, [lettre1, lettre2, lettre3, lettre4])
    const s5 = lettreDepuisChiffre(lettre5)
    let x2 = randint(2, 4)
    let y2 = randint(3, 5)
    let x3 = randint(5, 6)
    let y3 = randint(-2, 1)
    let k = new Decimal(randint(2, 8)).div(10)
    k = this.sup3 === 2 ? k.mul(-1) : this.sup3 === 3 ? k.mul(randint(-1, 1, [0])) : k
    let k2
    if (this.sup2 === 1) { k2 = k.mul(1) } else if (this.sup2 === 3) { k2 = k.mul(choice([1, 1.1])) } else { k2 = k.mul(choice([0.9, 1.1])) }

    if (this.quatrieme) {
      k = k.abs()
      k2 = k2.abs()
    }
    let dist24
    let dist12 = new Decimal(x2 * x2 + y2 * y2).sqrt().round()
    let dist13 = new Decimal(x3 * x3 + y3 * y3).sqrt().round()
    while (dist12.eq(dist13)) {
      // éviter les triangles isocèles imbriqués qui ne nécéssitent aucun calcul.
      x2 = randint(2, 4)
      y2 = randint(3, 5)
      x3 = randint(5, 6)
      y3 = randint(-2, 1)
      dist12 = new Decimal(x2 * x2 + y2 * y2).sqrt().round()
      dist13 = new Decimal(x3 * x3 + y3 * y3).sqrt().round()
    }
    const dist15 = k.abs().mul(dist13)
    const dist14 = k2.abs().mul(dist12)
    let dist35

    if (k < 0) {
      dist35 = dist13.plus(dist15)
      dist24 = dist12.plus(dist14)
    } else {
      dist35 = dist13.sub(dist15)
      dist24 = dist12.sub(dist14)
    }

    let texte, texteCorr
    // On ne garde qu'une approximation au dixième pour l'exercice
    // mise en texte avec 1 chiffre après la virgule pour énoncé
    const s13 = texNombre(dist13, 3)
    const s12 = texNombre(dist12, 3)
    const s15 = texNombre(dist15, 3)
    const s14 = texNombre(dist14, 3)
    const s24 = texNombre(dist24, 3)
    const s35 = texNombre(dist35, 3)
    const A = point(0, 0)
    const B = point(x2, y2)
    const C = point(x3, y3)
    const t1 = polygone([A, B, C])
    t1.id = `M2D_${numeroExercice}_t1`
    const M = homothetie(B, A, k)
    const N = homothetie(C, A, k)
    const t2 = polygone([A, M, N])
    t2.id = `M2D_${numeroExercice}_t2`
    const m = pointSurSegment(M, N, -0.5)
    const n = pointSurSegment(N, M, -0.5)
    const marqueNomM = texteParPoint(s4, m, 'milieu', 'black', 1, 'middle', true)
    const marqueNomN = texteParPoint(s5, n, 'milieu', 'black', 1, 'middle', true)
    const c = pointSurSegment(C, B, -0.5)
    const b = pointSurSegment(B, C, -0.5)
    const marqueNomC = texteParPoint(s3, c, 'milieu', 'black', 1, 'middle', true)
    const marqueNomB = texteParPoint(s2, b, 'milieu', 'black', 1, 'middle', true)
    const xMin = Math.min(A.x, B.x, C.x, M.x, N.x) - 1
    const xMax = Math.max(A.x, B.x, C.x, M.x, N.x) + 1
    const yMin = Math.min(A.y, B.y, C.y, M.y, N.y) - 1
    const yMax = Math.max(A.y, B.y, C.y, M.y, N.y) + 1
    let a
    if (k.isNeg()) {
      const demiangle = angleOriente(N, A, B) / 2
      const a2 = pointSurSegment(A, N, 0.5)
      a = rotation(a2, A, demiangle)
    } else {
      a = pointSurSegment(A, N, -0.5)
    }
    const marqueNomA = texteParPoint(s1, a)
    if (context.isHtml) {
      if (this.sup === 1) {
        // AM,AB,AN,AC sont donnés pas de calculs intermédiaires
        texte = `Dans la figure ci-dessous, $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s5}=${s15}$ cm et $${s1 + s4}=${s14}$ cm.<br>`
        texteCorr = ''
      } else if (this.sup === 2) {
        // AN n'est pas donné, il faut le calculer avant.
        texte = `Dans la figure ci-dessous, $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s3 + s5}=${s35}$ cm et $${s2 + s4}=${s24}$ cm.<br>`
        texteCorr = ''
        if (k.isPos()) {
          // triangles imbriqués
          texteCorr +=
            'On sait que ' +
            `$${s1 + s5}=${s1 + s3}-${s3 + s5}=${s13}-${s35}=${s15}$` +
            ' cm.<br>'
          texteCorr +=
            'On sait aussi que ' +
            `$${s1 + s4}=${s1 + s2}-${s2 + s4}=${s12}-${s24}=${s14}$` +
            ' cm.<br>'
        } else {
          // papillon
          texteCorr +=
            'On sait que ' +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            ' cm.<br>'
          texteCorr +=
            'On sait aussi que ' +
            `$${s1 + s4}=${s2 + s4}-${s1 + s2}=${s24}-${s12}=${s14}$` +
            ' cm.<br>'
        }
      } else if (randint(1, 2) === 1) {
        // triangles imbriqués sans figure
        texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2}]$ et $${s5} \\in [${s1 + s3}]$. <br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`
        texteCorr = ''
      } else {
        // papillon sans figure
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.<br>`
        texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`
        texteCorr = ''
      }
      texte += `Les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont-elles parallèles ? ${ajouteChampTexteMathLive(this, 0, 'largeur15 inline')}<br>`

      texteCorr += `D'une part, on a : $\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s12}}{${s14}}=\\dfrac{${s12}\\times${miseEnEvidence(
        s15
      )}}{${s14}\\times${miseEnEvidence(s15)}}=\\dfrac{
        ${texNombre(dist12 * dist15, 3)}}
        {${s14}\\times${s15}}
      $.`
      texteCorr += `<br>D'autre part, on a : $\\dfrac{${s1 + s3}}{${s1 + s5}}=\\dfrac{${s13}}{${s15}}=\\dfrac{${s13}\\times${miseEnEvidence(
        s14
      )}}{${s15}\\times${miseEnEvidence(s14)}}=\\dfrac{${texNombre(dist13 * dist14, 3)}}
        {${s14}\\times${s15}}
      $.`

      if (!k.eq(k2)) {
        if (!context.isAmc) setReponse(this, 0, 'non')
        // droites non parallèles
        texteCorr += `<br>D'où : $\\dfrac{${s1 + s2}}{${s1 + s4}}\\not=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`
        texteCorr += `Donc d'après le théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ ne sont pas parallèles.<br>`
      } else {
        if (!context.isAmc) setReponse(this, 0, 'oui')
        // droites parallèles
        texteCorr += `<br>D'où : $\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`
        if (k.isPos()) { texteCorr += `De plus, $${s1}$, $${s4}$, $${s2}$ et $${s1}$, $${s5}$, $${s3}$ sont alignés dans le même ordre.<br>` } else { texteCorr += `De plus, $${s4}$, $${s1}$, $${s2}$ et $${s5}$, $${s1}$, $${s3}$ sont alignés dans le même ordre.<br>` }
        texteCorr += `Donc d'après la réciproque du théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont parallèles.<br>`
      }

      if (this.sup !== 3) {
        texte += mathalea2d({ xmin: xMin, xMax: xMax, ymin: yMin, ymax: yMax }, t1, t2, marqueNomA, marqueNomB, marqueNomC, marqueNomM, marqueNomN)
      }

      const epaisseurTriangle = (k < 0) ? 2 : 6 // En cas de configuration papillon il est inutile de changer l'épaisseur
      const boutonAideMathalea2d = creerBoutonMathalea2d(numeroExercice,
        `if (document.getElementById('M2D_${numeroExercice}_t1').dataset.colorie == undefined || (document.getElementById('M2D_${numeroExercice}_t1').dataset.colorie == 'false')){
          document.getElementById('M2D_${numeroExercice}_t1').style.stroke = 'blue';
          document.getElementById('M2D_${numeroExercice}_t2').style.stroke = 'red';
          document.getElementById('M2D_${numeroExercice}_t1').style.opacity = .5;
          document.getElementById('M2D_${numeroExercice}_t1').style.strokeWidth = ${epaisseurTriangle};
          document.getElementById('M2D_${numeroExercice}_t2').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_t2').style.strokeWidth = 2;
          document.getElementById('M2D_${numeroExercice}_t1').dataset.colorie = 'dejaEnCouleur';
          document.getElementById('btnMathALEA2d_${numeroExercice}').classList.add('active');
        } else {
          document.getElementById('M2D_${numeroExercice}_t1').style.stroke = 'black';
          document.getElementById('M2D_${numeroExercice}_t2').style.stroke = 'black';
          document.getElementById('M2D_${numeroExercice}_t1').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_t1').style.strokeWidth = 1;
          document.getElementById('M2D_${numeroExercice}_t2').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_t2').style.strokeWidth = 1;
          document.getElementById('M2D_${numeroExercice}_t1').dataset.colorie = 'false';
          document.getElementById('btnMathALEA2d_${numeroExercice}').classList.remove('active');
  
        }
        `,
        'Mettre en couleur les 2 triangles')

      if (context.isHtml) {
        texte += `<br><div style="display: inline-block;margin-top:20px;">${boutonAideMathalea2d}</div>`
      }

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      if (this.sup < 3) {
        listeQuestionsToContenu(this)
      } else {
        this.typeExercice = ''
        listeQuestionsToContenuSansNumero(this)
      }
    } else {
      // sortie Latex
      texteCorr = ''
      if (this.sup === 1) {
        // niveau 1 : Calcul direct
        texte =
          '\\begin{minipage}{.7 \\linewidth} \\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
        texte += `\n\t \\item ${s1 + s2}=${s12} cm \n\t \\item ${s1 + s3}=${s13} cm\n\t \\item ${s1 + s5}=${s15} cm\n\t \\item ${s1 + s4}=${s14} cm.<br>`
        texte +=
          '\\end{itemize}  ' +
          `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>` +
          '. \\end{minipage}'
      } else if (this.sup === 2) {
        // niveau 2 : Calcul intermédiaire nécessaire
        texte =
          '\\begin{minipage}{.7 \\linewidth} \\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
        texte += `\n\t \\item ${s1 + s2} = ${s12} cm\n\t \\item ${s1 + s3} = ${s13} cm\n\t \\item ${s3 + s5} = ${s35} cm\n\t \\item ${s2 + s4} = ${s24} cm.<br>`
        texte +=
          '\\end{itemize}  ' +
          `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>` +
          '. \\end{minipage}'
        if (k.isPos()) {
          // triangles imbriqués
          texteCorr +=
            'On sait que ' +
            `$${s1 + s5}=${s1 + s3}-${s3 + s5}=${s13}-${s35}=${s15}$` +
            ' cm.<br>'
          texteCorr +=
            'On sait aussi que ' +
            `$${s1 + s4}=${s1 + s2}-${s2 + s4}=${s12}-${s24}=${s14}$` +
            ' cm.<br>'
        } else { // papillon
          texteCorr +=
            'On sait que ' +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            ' cm.<br>'
          texteCorr +=
            'On sait aussi que ' +
            `$${s1 + s4}=${s2 + s4}-${s1 + s2}=${s24}-${s12}=${s14}$` +
            ' cm.<br>'
        } // énoncé sans figure
      } else if (randint(1, 2) === 1) {
        // triangles imbriqués
        texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2}]$ et $${s5} \\in [${s1 + s3}]$ <br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`
        texte += `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>`
      } else {
        // papillon
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.<br>`
        texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`
        texte += `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>`
      }

      if (this.sup < 3) {
        // on ne fait la figure que si niveau < 3
        texte += '\\begin{minipage}{0.3 \\linewidth}'
        // dessin de la figure
        texte += '\n \\begin{tikzpicture}[scale=0.7]' // Balise début de figure
        texte +=
          '\n\t \\tkzDefPoints{0/0/' +
          s1 +
          ',' +
          x3 +
          '/' +
          y3 +
          '/' +
          s3 +
          ',' +
          x2 +
          '/' +
          y2 +
          '/' +
          s2 +
          '}' // Placer les points du triangle principal
        texte += '\n\t \\tkzDrawPolygon(' + s1 + ',' + s2 + ',' + s3 + ')' // Trace le triangle principal

        // Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
        texte +=
          '\n\t \\tkzDefPointBy[homothety=center ' +
          s1 +
          ' ratio ' +
          k +
          '](' +
          s2 +
          ')' +
          '\t\\tkzGetPoint{' +
          s4 +
          '}' // Place le premier point du triangle image
        texte +=
          '\n\t \\tkzDefPointBy[homothety=center ' +
          s1 +
          ' ratio ' +
          k +
          '](' +
          s3 +
          ')' +
          '\t\\tkzGetPoint{' +
          s5 +
          '}' // Place le deuxième point du triangle image
        texte += '\n\t \\tkzDrawSegment(' + s4 + ',' + s5 + ')' // Trace le segment
        if (k > 0) {
          texte += '\n\t \\tkzLabelPoints[left](' + s1 + ')' // nomme les points
          texte += '\n\t \\tkzLabelPoints[above left](' + s2 + ',' + s4 + ')' // nomme les points
          texte += '\n\t \\tkzLabelPoints[below](' + s3 + ',' + s5 + ')' // nomme les points

          // Nomme les points au dessus avec above, dessous avec below...
        } else {
          // position papillon -> position du nom inversée et nécessité de tracer le triangle secondaire
          texte += '\n\t \\tkzLabelPoints[below](' + s1 + ')' // nomme les points
          texte += '\n\t \\tkzLabelPoints[below](' + s3 + ',' + s4 + ')' // nomme les points
          texte += '\n\t \\tkzLabelPoints[above](' + s2 + ',' + s5 + ')' // nomme les points
          texte += '\n\t \\tkzDrawPolygon(' + s1 + ',' + s4 + ',' + s5 + ')' // Trace le triangle secondaire
        }
        texte += '\n \\end{tikzpicture}' // Balise de fin de figure
        texte += '\\end{minipage}'
      }
      this.listeQuestions.push(texte) // on envoie la question

      // correction
      texteCorr += `D'une part on a $\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s12}}{${s14}}=\\dfrac{${s12}\\times${miseEnEvidence(
        s15
      )}}{${s14}\\times${miseEnEvidence(s15)}}=${texFraction(
        texNombre(dist12 * dist15, 3),
        texNombre(dist14 * dist15, 4)
      )}$`
      texteCorr += `<br>D'autre part on a $\\dfrac{${s1 + s3}}{${s1 + s5}}=\\dfrac{${s13}}{${s15}}=\\dfrac{${s13}\\times${miseEnEvidence(
        s14
      )}}{${s15}\\times${miseEnEvidence(s14)}}=${texFraction(
        texNombre(dist13 * dist14, 3),
        texNombre(dist14 * dist15, 4)
      )}$`

      if (!k.eq(k2)) {
        // droites pas parallèles
        texteCorr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}\\not=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`
        texteCorr += `Donc d'après le théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ ne sont pas parallèles.<br>`
        this.autoCorrection = [{
          enonce: texte,
          propositions:
          [
            {
              type: 'AMCOpen',
              propositions: [{ texte: texteCorr, statut: 6, feedback: '' }]
            },
            {
              type: 'qcmMono',
              options: { ordered: true },
              propositions: [
                {
                  texte: 'Oui',
                  statut: false
                },
                {
                  texte: 'Non',
                  statut: true
                },
                {
                  texte: 'Je ne sais pas',
                  statut: false
                }

              ]
            }
          ]
        }]
      } else {
        // droites parallèles
        texteCorr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`
        if (k.isPos()) { texteCorr += `$${s1}$,$${s4}$,$${s2}$ et $${s1}$,$${s5}$,$${s3}$ sont alignés dans le même ordre.<br>` } else { texteCorr += `$${s4}$,$${s1}$,$${s2}$ et $${s5}$,$${s1}$,$${s3}$ sont alignés dans le même ordre.<br>` }
        texteCorr += `Donc d'après la réciproque du théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont parallèles.<br>`
        this.autoCorrection = [{
          enonce: texte,
          propositions:
          [
            {
              type: 'AMCOpen',
              propositions: [{ texte: texteCorr, statut: 6, feedback: '' }]
            },
            {
              type: 'qcmMono',
              options: { ordered: true },
              propositions: [
                {
                  texte: 'Oui',
                  statut: true
                },
                {
                  texte: 'Non',
                  statut: false
                },
                {
                  texte: 'Je ne sais pas',
                  statut: false
                }

              ]
            }
          ]
        }]
      }
      this.listeCorrections.push(texteCorr)

      listeQuestionsToContenuSansNumero(this)
    }
  }

  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    3,
    ' 1 : Cas simple \n 2 : Complication \n 3 : Sans figure'
  ]
  this.besoinFormulaire2Numerique = [
    'Réciproque ou contraposée',
    3,
    ' 1 : Réciproque \n 2 : Contraposée \n 3 : Mélange'
  ]
  this.besoinFormulaire3Numerique = [
    'Triangles emboîtés ou papillon',
    3,
    ' 1 : Triangles emboîtés \n 2 : Papillon \n 3 : L\'un des deux au hasard'
  ]
}
