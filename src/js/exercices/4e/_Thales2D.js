import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, calcul, texNombrec, creerNomDePolygone, texNombre, creerBoutonMathalea2d, nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils.js'
import { point, pointSurSegment, pointAdistance, polygone, triangle2points2longueurs, homothetie, similitude, texteParPoint, longueur, angle, angleOriente, mathalea2d } from '../../modules/2d.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import Grandeur from '../../modules/Grandeur'
export const amcReady = true
export const amcType = 5
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Calcul de longueurs avec le théorème de Thalès
 * @author Rémi Angot
 * Utilisée dans 4G30 et 3G20
*/
export default function Thales2D () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = 'Calculer des longueurs avec le théorème de Thalès'
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1 // Triangles imbriqués / configuration papillon / les 2
  this.vspace = -0.5 // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeDeNomsDePolygones = []
    const premiereQuestionPapillon = randint(0, 1) // Pour alterner les configurations et savoir par laquelle on commence
    let reponse

    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // this.autoCorrection[i] = {}
      if ((i + 1) % 3 === 0) { // Toutes les 3 questions, on repart à zéro sur les noms des polygones
        listeDeNomsDePolygones = []
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
      const marqueNomM = texteParPoint(nomM, m)
      const marqueNomN = texteParPoint(nomN, n)
      const a = pointSurSegment(A, B, -0.5)
      const b = pointSurSegment(B, A, -0.5)
      const marqueNomA = texteParPoint(nomA, a)
      const marqueNomB = texteParPoint(nomB, b)
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
      const marqueNomC = texteParPoint(nomC, c)

      if (!context.isHtml) {
        texte = '\\begin{minipage}{.5\\linewidth}\n'
      } else {
        texte = ''
      }
      texte += `Sur la figure suivante, $${nomA + nomC}=${ac}~\\text{cm}$, $${nomA + nomB}=${ab}~\\text{cm}$, $${nomC + nomM}=${texNombrec(Math.abs(k) * ac)}~\\text{cm}$, $${nomC + nomN}=${texNombrec(Math.abs(k) * bc)}~\\text{cm}$ et $(${nomA + nomB})//(${nomM + nomN})$.<br>`
      if (!this.interactif) {
        texte += `Calculer $${nomM + nomN}$ et $${nomC + nomB}$.<br><br>`
      }
      if (!context.isHtml) {
        texte += '\\end{minipage}\n'
        texte += '\\begin{minipage}{.5\\linewidth}\n'
        texte += '\\centering'
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

      if (!context.isHtml) {
        texte += '\\end{minipage}\n'
      }

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
       <br> - $${nomM}\\in${'[' + nomC + nomA + ']'}$,
       <br> - $${nomN}\\in${'[' + nomC + nomB + ']'}$,
       <br> -  $(${nomA + nomB})//(${nomM + nomN})$,
       <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`
      } else {
        texteCorr = `Les droites $(${nomA + nomM})$ et $(${nomB + nomN})$ sont sécantes en $${nomC}$ et $(${nomA + nomB})//(${nomM + nomN})$ <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`
      }
      // texteCorr = `$(${nomA+nomB})//(${nomM+nomN})$, les points $${nomC}$, $${nomM}$, $${nomA}$ et $${nomC}$, $${nomN}$, $${nomB}$ sont alignés dans le même ordre  donc d'après le théorème de Thalès, les triangles $${nomA+nomB+nomC}$ et $${nomM+nomN+nomC}$ ont des longueurs proportionnelles.`;
      texteCorr += '<br><br>'
      if (context.isHtml) {
        texteCorr += `$\\dfrac{\\color{red}${nomC + nomM}}{\\color{blue}${nomC + nomA}}=\\dfrac{\\color{red}${nomC + nomN}}{\\color{blue}${nomC + nomB}}=\\dfrac{\\color{red}${nomM + nomN}}{\\color{blue}${nomA + nomB}}$`
      } else {
        texteCorr += `$\\dfrac{${nomC + nomM}}{${nomC + nomA}}=\\dfrac{${nomC + nomN}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${nomA + nomB}}$`
      }
      texteCorr += '<br><br>'
      texteCorr += `$\\dfrac{${texNombrec(Math.abs(k) * ac)}}{${texNombre(ac)}}=\\dfrac{${texNombrec(Math.abs(k) * bc)}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${texNombre(ab)}}$`
      texteCorr += '<br><br>'
      texteCorr += `$${nomM + nomN}=\\dfrac{${texNombrec(Math.abs(k) * ac)}\\times${texNombre(ab)}}{${texNombre(ac)}}=${texNombrec(Math.abs(k) * ab)}$ cm`
      texteCorr += '<br><br>'
      texteCorr += `$${nomC + nomB}=\\dfrac{${texNombrec(Math.abs(k) * bc)}\\times${texNombre(ac)}}{${texNombrec(Math.abs(k) * ac)}}=${texNombrec(bc)}$ cm`
      reponse = bc
      if (context.isHtml) {
        texte += `<br><div style="display: inline-block;margin-top:20px;">${boutonAideMathalea2d}</div>`
      }

      if (this.interactif && context.isHtml) {
        texte += '<br><br><em>Il faut saisir une unité.</em>'
        texte += `<br><br>$${nomM + nomN} = $`
        setReponse(this, i * 2, new Grandeur(calcul(Math.abs(k) * ab), 'cm'), { formatInteractif: 'longueur' }) // 2 réponses par question donc 2i et 2i + 1 ainsi elles restent ordonnées
        texte += ajouteChampTexteMathLive(this, i * 2, 'longueur')
        texte += `$${nomC + nomB} = $`
        texte += ajouteChampTexteMathLive(this, i * 2 + 1, 'longueur')
        setReponse(this, i * 2 + 1, new Grandeur(bc, 'cm'), { formatInteractif: 'longueur' })
        console.log(this.autoCorrection)
        console.log(new Grandeur(bc, 'cm'))
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [{ texte: texteCorr, statut: 4, feedback: '' }],
            reponse: { valeur: reponse, param: { digits: Math.max(2, nombreDeChiffresDansLaPartieEntiere(reponse)) + 1, decimals: 1, signe: false, exposantNbChiffres: 0 } }
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
  this.besoinFormulaireNumerique = ['Configuration', 3, '1 : Triangles imbriqués\n2 : Papillon\n3 : Les deux']
}
