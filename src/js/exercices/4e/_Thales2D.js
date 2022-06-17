import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, calcul, texNombrec, creerNomDePolygone, texNombre, creerBoutonMathalea2d, nombreDeChiffresDansLaPartieEntiere, texteGras } from '../../modules/outils.js'
import { point, pointSurSegment, pointAdistance, polygone, triangle2points2longueurs, homothetie, similitude, texteParPoint, longueur, angle, angleOriente, mathalea2d } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur'

export const amcReady = true
export const amcType = 'AMCOpenNum✖︎2'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Calculer des longueurs avec le théorème de Thalès'

/**
 * Calcul de longueurs avec le théorème de Thalès
 * @author Rémi Angot
 * Utilisée dans 4G30 et 3G20
*/
export default function Thales2D () {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1 // Triangles imbriqués / configuration papillon / les 2
  this.vspace = -0.5 // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF

  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeDeNomsDePolygones = []
    this.autoCorrection = []
    if (this.level === 4) {
      this.sup = 1
    }
    const premiereQuestionPapillon = randint(0, 1) // Pour alterner les configurations et savoir par laquelle on commence
    let reponse, reponse2

    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // this.autoCorrection[i] = {}
      if (i % 3 === 0) { // Toutes les 3 questions, on repart à zéro sur les noms des polygones
        listeDeNomsDePolygones = ['QD']
      }
      const nomDesPoints = creerNomDePolygone(5, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(nomDesPoints)
      const nomA = nomDesPoints[0]
      const nomB = nomDesPoints[1]
      const nomC = nomDesPoints[2]
      const nomM = nomDesPoints[3]
      const nomN = nomDesPoints[4]
      const ab = randint(5, 10)
      const ac = randint(5, 10, ab)
      const bc = randint(Math.max(ab - ac, ac - ab) + 1, ab + ac - 1, [ab, ac]) // Pas de triangle isocèle ou équilatéral
      const A = point(0, 0, nomA)
      const B = pointAdistance(A, ab, nomB)
      const ABC = triangle2points2longueurs(A, B, ac, bc)
      ABC.id = `M2D_${numeroExercice}_${i}_1`
      const C = ABC.listePoints[2]
      C.nom = nomC
      let k = calcul(randint(3, 8, 5) / 10)
      if (parseInt(this.sup) === 2) {
        k *= -1
        this.vspace = -0.5 // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF
      }
      if (parseInt(this.sup) === 3 && ((i + premiereQuestionPapillon) % 2 === 0)) {
        k *= -1
        this.vspace = -0.5 // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF
      }
      const M = homothetie(A, C, k)
      const N = homothetie(B, C, k)
      const MNC = polygone(M, N, C)
      MNC.id = `M2D_${numeroExercice}_${i}_2`
      const m = pointSurSegment(M, N, -0.5)
      const n = pointSurSegment(N, M, -0.5)
      const marqueNomM = texteParPoint(nomM, m, 'milieu', 'black', 1, 'middle', true)
      const marqueNomN = texteParPoint(nomN, n, 'milieu', 'black', 1, 'middle', true)
      const a = pointSurSegment(A, B, -0.5)
      const b = pointSurSegment(B, A, -0.5)
      const marqueNomA = texteParPoint(nomA, a, 'milieu', 'black', 1, 'middle', true)
      const marqueNomB = texteParPoint(nomB, b, 'milieu', 'black', 1, 'middle', true)
      let c
      if (k < 0) {
        if (angle(A, C, N) < angle(N, C, A)) {
          c = similitude(A, C, -angleOriente(A, C, N) / 2, 1 / longueur(A, C))
        } else {
          c = similitude(A, C, -angleOriente(N, C, A) / 2, 1 / longueur(A, C) * 0.5)
        }
      } else {
        c = similitude(A, C, -180 + angleOriente(A, C, B) / 2, 1 / longueur(A, C) * 0.5)
      }
      const marqueNomC = texteParPoint(nomC, c, 'milieu', 'black', 1, 'middle', true)

      texte = `Sur la figure suivante, $${nomA + nomC}=${ac}~\\text{cm}$, $${nomA + nomB}=${ab}~\\text{cm}$, $${nomC + nomM}=${texNombrec(Math.abs(k) * ac)}~\\text{cm}$, $${nomC + nomN}=${texNombrec(Math.abs(k) * bc)}~\\text{cm}$ et $(${nomA + nomB})//(${nomM + nomN})$.<br>`
      if (!this.interactif) {
        texte += `Calculer $${nomM + nomN}$ et $${nomC + nomB}$.<br><br>`
      }

      texte += mathalea2d({
        xmin: Math.min(A.x, B.x, C.x, M.x, N.x) - 1.5,
        ymin: Math.min(A.y, B.y, C.y, M.y, N.y) - 0.8,
        xmax: Math.max(A.x, B.x, C.x, M.x, N.x) + 1.5,
        ymax: Math.max(A.y, B.y, C.y, M.y, N.y) + 0.8,
        scale: 0.5
      },

      ABC, MNC, marqueNomA, marqueNomB, marqueNomC, marqueNomM, marqueNomN
      )

      const epaisseurTriangle = (k < 0) ? 2 : 6 // En cas de configuration papillon il est inutile de changer l'épaisseur
      const boutonAideMathalea2d = creerBoutonMathalea2d(numeroExercice + '_' + i,
        `if (!document.getElementById('M2D_${numeroExercice}_${i}_1').dataset.colorie == true || (document.getElementById('M2D_${numeroExercice}_${i}_1').dataset.colorie == 'false')){
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.stroke = 'blue';
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.stroke = 'red';
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.opacity = .5;
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.strokeWidth = ${epaisseurTriangle};
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.strokeWidth = 2;
          document.getElementById('M2D_${numeroExercice}_${i}_1').dataset.colorie = true;
          document.getElementById('btnMathALEA2d_${numeroExercice}_${i}').classList.add('active');
        } else {
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.stroke = 'black';
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.stroke = 'black';
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.strokeWidth = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.strokeWidth = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_1').dataset.colorie = false;
          document.getElementById('btnMathALEA2d_${numeroExercice}_${i}').classList.remove('active');
  
        }
        `,
        'Mettre en couleur les 2 triangles')

      if (k > 0) {
        texteCorr = `Dans le triangle $${nomA + nomB + nomC}$ :
       <br> $\\leadsto$ $${nomM}\\in${'[' + nomC + nomA + ']'}$,
       <br> $\\leadsto$ $${nomN}\\in${'[' + nomC + nomB + ']'}$,
       <br> $\\leadsto$  $(${nomA + nomB})//(${nomM + nomN})$,
       <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`
      } else {
        texteCorr = `Les droites $(${nomA + nomM})$ et $(${nomB + nomN})$ sont sécantes en $${nomC}$ et $(${nomA + nomB})//(${nomM + nomN})$ <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`
      }
      texteCorr += '<br><br>'
      if (context.isHtml) {
        texteCorr += `$\\dfrac{\\color{red}${nomC + nomM}}{\\color{blue}${nomC + nomA}}=\\dfrac{\\color{red}${nomC + nomN}}{\\color{blue}${nomC + nomB}}=\\dfrac{\\color{red}${nomM + nomN}}{\\color{blue}${nomA + nomB}}$`
      } else {
        texteCorr += `$\\dfrac{${nomC + nomM}}{${nomC + nomA}}=\\dfrac{${nomC + nomN}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${nomA + nomB}}$`
      }
      texteCorr += '<br><br>'
      texteCorr += `$\\dfrac{${texNombrec(Math.abs(k) * ac)}}{${texNombre(ac)}}=\\dfrac{${texNombrec(Math.abs(k) * bc)}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${texNombre(ab)}}$`
      texteCorr += '<br><br>'
      if (this.correctionDetaillee) {
        texteCorr += texteGras(`Calcul de ${nomM + nomN} : `)
        texteCorr += '<br><br>'
        texteCorr += `On utilise l'égalité $\\dfrac{${texNombrec(Math.abs(k) * ac)}}{${texNombre(ac)}}=\\dfrac{${nomM + nomN}}{${texNombre(ab)}}$.`
        texteCorr += '<br><br>'
        texteCorr += 'Les produits en croix sont égaux,'
        texteCorr += '<br><br>'
        texteCorr += `donc $${texNombrec(Math.abs(k) * ac)}\\times ${texNombre(ab)}=${nomM + nomN}\\times ${texNombre(ac)}$.`
        texteCorr += '<br><br>'
        texteCorr += `On divise les deux membres par $${texNombre(ac)}$.`
        texteCorr += '<br><br>'
      }
      texteCorr += `$${nomM + nomN}=\\dfrac{${texNombrec(Math.abs(k) * ac)}\\times${texNombre(ab)}}{${texNombre(ac)}}=${texNombrec(Math.abs(k) * ab)}$ cm`
      reponse = Math.abs(k) * ab
      texteCorr += '<br><br>'
      if (this.correctionDetaillee) {
        texteCorr += texteGras(`Calcul de ${nomC + nomB} : `)
        texteCorr += '<br><br>'
        texteCorr += `On utilise l'égalité $\\dfrac{${texNombrec(Math.abs(k) * bc)}}{${nomC + nomB}}=\\dfrac{${texNombrec(Math.abs(k) * ac)}}{${texNombre(ac)}}$.`
        texteCorr += '<br><br>'
        texteCorr += 'Les produits en croix sont égaux,'
        texteCorr += '<br><br>'
        texteCorr += `donc $${texNombrec(Math.abs(k) * ac)}\\times ${nomC + nomB}=${texNombre(ac)}\\times ${texNombrec(Math.abs(k) * bc)}$.`
        texteCorr += '<br><br>'
        texteCorr += `On divise les deux membres par $${texNombrec(Math.abs(k) * ac)}$.`
        texteCorr += '<br><br>'
      }
      texteCorr += `$${nomC + nomB}=\\dfrac{${texNombrec(Math.abs(k) * bc)}\\times${texNombre(ac)}}{${texNombrec(Math.abs(k) * ac)}}=${texNombrec(bc)}$ cm`
      reponse2 = bc
      if (context.isHtml) {
        texte += `<br><div style="display: inline-block;margin-top:20px;">${boutonAideMathalea2d}</div>`
      }

      if (this.interactif && context.isHtml) {
        texte += '<br><br><em>Il faut saisir une unité.</em>'
        texte += `<br><br>$${nomM + nomN} = $`
        setReponse(this, i * 2, new Grandeur(calcul(Math.abs(k) * ab), 'cm'), { formatInteractif: 'unites' }) // 2 réponses par question donc 2i et 2i + 1 ainsi elles restent ordonnées
        texte += ajouteChampTexteMathLive(this, i * 2, 'unites[longueurs] inline largeur25')
        texte += `<br>$${nomC + nomB} = $`
        texte += ajouteChampTexteMathLive(this, i * 2 + 1, 'unites[longueurs] inline largeur25')
        setReponse(this, i * 2 + 1, new Grandeur(bc, 'cm'), { formatInteractif: 'unites' })
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [{ texte: texteCorr, statut: 4, feedback: '' }],
            reponse: { texte: `$\\hspace{21pt}${nomM + nomN}$`, valeur: reponse, param: { digits: Math.max(2, nombreDeChiffresDansLaPartieEntiere(reponse)) + 1, decimals: 1, approx: 0, signe: false, exposantNbChiffres: 0 } },
            reponse2: { texte: `$\\hspace{21pt}${nomC + nomB}$`, valeur: reponse2, param: { digits: Math.max(2, nombreDeChiffresDansLaPartieEntiere(reponse2)) + 1, decimals: 1, approx: 0, signe: false, exposantNbChiffres: 0 } }
          }
        }
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Configuration', 3, '1 : Triangles imbriqués\n2 : Papillon\n3 : Mélange']
}
