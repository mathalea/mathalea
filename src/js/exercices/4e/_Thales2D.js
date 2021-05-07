import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,calcul,texNombrec,creerNomDePolygone,texNombre,creerBoutonMathalea2d} from '../../modules/outils.js'
import {point,pointSurSegment,pointAdistance,polygone,triangle2points2longueurs,homothetie,similitude,texteParPoint,longueur,angle,angleOriente,mathalea2d} from '../../modules/2d.js'


/**
 * Calcul de longueurs avec le théorème de Thalès
 * @Auteur Rémi Angot
 * Utilisée dans 4G30 et 3G20
*/
export default function Thales2D() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer des longueurs avec le théorème de Thalès";
  this.consigne = "";
  this.nbQuestions = 1;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.sup = 1; // Triangles imbriqués / configuration papillon / les 2
  this.vspace = -0.5; // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF

  this.nouvelleVersion = function (numeroExercice) {
    this.qcm=['4G30',[],'Calcul de longueur avec Thales',4]
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let liste_de_noms_de_polygones = [];
    let premiereQuestionPapillon = randint(0, 1); // Pour alterner les configurations et savoir par laquelle on commence
let reponse

    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {

      if ((i + 1) % 3 == 0) { // Toutes les 3 questions, on repart à zéro sur les noms des polygones
        liste_de_noms_de_polygones = [];
      }
      let nomDesPoints = creerNomDePolygone(5, liste_de_noms_de_polygones);
      liste_de_noms_de_polygones.push(nomDesPoints);
      let nomA = nomDesPoints[0];
      let nomB = nomDesPoints[1];
      let nomC = nomDesPoints[2];
      let nomM = nomDesPoints[3];
      let nomN = nomDesPoints[4];
      let ab = randint(5, 10);
      let ac = randint(5, 10, ab);
      let bc = randint(Math.max(ab - ac, ac - ab) + 1, ab + ac - 1, [ab, ac]); // Pas de triangle isocèle ou équilatéral
      let A = point(0, 0, nomA);
      let B = pointAdistance(A, ab, nomB);
      let ABC = triangle2points2longueurs(A, B, ac, bc);
      ABC.id = `M2D_${numeroExercice}_${i}_1`;
      let C = ABC.listePoints[2];
      C.nom = nomC;
      let k = calcul(randint(3, 8, 5) / 10);
      if (this.sup == 2) {

        k *= -1;
        this.vspace = -.5; // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF
      }
      if (this.sup == 3 && ((i + premiereQuestionPapillon) % 2 == 0)) {
        k *= -1;
        this.vspace = -.5; // Monter un peu l'énoncé pour gagner de la place dans la sortie PDF
      }
      let M = homothetie(A, C, k);
      let N = homothetie(B, C, k);
      let MNC = polygone(M, N, C);
      MNC.id = `M2D_${numeroExercice}_${i}_2`;
      let m = pointSurSegment(M, N, -.5);
      let n = pointSurSegment(N, M, -.5);
      let marqueNomM = texteParPoint(nomM, m);
      let marqueNomN = texteParPoint(nomN, n);
      let a = pointSurSegment(A, B, -.5);
      let b = pointSurSegment(B, A, -.5);
      let marqueNomA = texteParPoint(nomA, a);
      let marqueNomB = texteParPoint(nomB, b);
      let c;
      if (k < 0) {
        if (angle(A, C, N) < angle(N, C, A)) {
          c = similitude(A, C, -angleOriente(A, C, N) / 2, 1 / longueur(A, C));
        } else {
          c = similitude(A, C, -angleOriente(N, C, A) / 2, 1 / longueur(A, C) * 0.5);
        }
      } else {
        c = similitude(A, C, -180 + angleOriente(A, C, B) / 2, 1 / longueur(A, C) * .5);
      }
      let marqueNomC = texteParPoint(nomC, c);




      if (!sortieHtml) {
        texte = '\\begin{minipage}{.5\\linewidth}\n';
      } else {
        texte = '';
      }
      texte += `Sur la figure suivante, $${nomA + nomC}=${ac}~\\text{cm}$, $${nomA + nomB}=${ab}~\\text{cm}$, $${nomC + nomM}=${texNombrec(Math.abs(k) * ac)}~\\text{cm}$, $${nomC + nomN}=${texNombrec(Math.abs(k) * bc)}~\\text{cm}$ et $(${nomA + nomB})//(${nomM + nomN})$.<br>`;
      texte += `Calculer $${nomM + nomN}$ et $${nomC + nomB}$.<br><br>`;
      if (!sortieHtml) {
        texte += '\\end{minipage}\n';
        texte += '\\begin{minipage}{.5\\linewidth}\n';
        texte += '\\centering';
      }
      texte += mathalea2d({
        xmin: Math.min(A.x, B.x, C.x, M.x, N.x) - 1.5,
        ymin: Math.min(A.y, B.y, C.y, M.y, N.y) - .8,
        xmax: Math.max(A.x, B.x, C.x, M.x, N.x) + 1.5,
        ymax: Math.max(A.y, B.y, C.y, M.y, N.y) + .8,
        scale: .5
      },

        ABC, MNC, marqueNomA, marqueNomB, marqueNomC, marqueNomM, marqueNomN
      );
      if (!sortieHtml) {
        texte += '\\end{minipage}\n';
      }

      let epaisseurTriangle = (k < 0) ? 2 : 6; // En cas de configuration papillon il est inutile de changer l'épaisseur
      let boutonAide_mathalea2d = creerBoutonMathalea2d(numeroExercice + '_' + i,
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
        'Mettre en couleur les 2 triangles');

      if (k > 0) {
        texteCorr = `Dans le triangle $${nomA + nomB + nomC}$ :
       <br> - $${nomM}\\in${"[" + nomC + nomA + "]"}$,
       <br> - $${nomN}\\in${"[" + nomC + nomB + "]"}$,
       <br> -  $(${nomA + nomB})//(${nomM + nomN})$,
       <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`;
      } else {
        texteCorr = `Les droites $(${nomA + nomM})$ et $(${nomB + nomN})$ sont sécantes en $${nomC}$ et $(${nomA + nomB})//(${nomM + nomN})$ <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`;
      }
      //texteCorr = `$(${nomA+nomB})//(${nomM+nomN})$, les points $${nomC}$, $${nomM}$, $${nomA}$ et $${nomC}$, $${nomN}$, $${nomB}$ sont alignés dans le même ordre  donc d'après le théorème de Thalès, les triangles $${nomA+nomB+nomC}$ et $${nomM+nomN+nomC}$ ont des longueurs proportionnelles.`;
      texteCorr += `<br><br>`;
      if (sortieHtml) {
        texteCorr += `$\\dfrac{\\color{red}${nomC + nomM}}{\\color{blue}${nomC + nomA}}=\\dfrac{\\color{red}${nomC + nomN}}{\\color{blue}${nomC + nomB}}=\\dfrac{\\color{red}${nomM + nomN}}{\\color{blue}${nomA + nomB}}$`;
      } else {
        texteCorr += `$\\dfrac{${nomC + nomM}}{${nomC + nomA}}=\\dfrac{${nomC + nomN}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${nomA + nomB}}$`;
      }
      texteCorr += `<br><br>`;
      texteCorr += `$\\dfrac{${texNombrec(Math.abs(k) * ac)}}{${texNombre(ac)}}=\\dfrac{${texNombrec(Math.abs(k) * bc)}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${texNombre(ab)}}$`;
      texteCorr += `<br><br>`;
      texteCorr += `$${nomM + nomN}=\\dfrac{${texNombrec(Math.abs(k) * ac)}\\times${texNombre(ab)}}{${texNombre(ac)}}=${texNombrec(Math.abs(k) * ab)}$ cm`;
      texteCorr += `<br><br>`;
      texteCorr += `$${nomC + nomB}=\\dfrac{${texNombrec(Math.abs(k) * bc)}\\times${texNombre(ac)}}{${texNombrec(Math.abs(k) * ac)}}=${texNombrec(bc)}$ cm`;

      if (sortieHtml) {
        texte += `<br><div style="display: inline-block;margin-top:20px;">${boutonAide_mathalea2d}</div>`;
      }


      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
        this.qcm[1].push([texte, [texteCorr,calcul(bc)], {digits:4,decimals:2,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:10}])
        }
       cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ['Configuration', 3, '1 : Triangles imbriqués\n2 : Papillon\n3 : Les deux'];
}
