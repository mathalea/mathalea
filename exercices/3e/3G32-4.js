import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, num_alpha,arrondi, calcul, tex_nombre, tex_nombrec, arrondi_virgule } from "/modules/outils.js"
import { texteSurSegment, tracePoint,labelPoint,projectionOrtho, pointAdistance,droite, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d } from '../../modules/2d.js';
import {point3d,vecteur3d,sphere3d,arete3d,rotationV3d,demicercle3d,homothetie3d} from "/modules/3d.js"
/**
 * Propose de calculer la hauteur d'une montagne à partir de deux relevés d'angle 
 * @Auteur Jean-Claude Lhote
 * Référence 3G32-4
*/
export default function Calculs_trigonometriques4() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer la hauteur d\'une montagne";
  this.consigne = "";
  this.nb_cols = 1; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
  this.sup = true;
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.nb_questions = 1
  this.spacing_corr=2
  this.spacing=2

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let distance, hauteur,alfa,baita, beta, alpha, teta, taille, index, A, B, O, H, S, C,M,R,R2,Axe,normalV,normalH,P,HP,Sph,OP,PoleNord,PoleSud, objets = [], p
    let type_de_questions_disponibles
    if (sortie_html) {
      alfa='α'
      baita='β'
    }
    else {
      alfa='\\alpha'
      baita='\\beta'
    }
  
    for (let i = 0, texte, texte_corr,j, cpt = 0; i < this.nb_questions && cpt < 50;) {
        objets=[]
          alpha = randint(25, 45)
          j=0
          beta = alpha+randint(1,3)
          taille = randint(20,50)*100
          distance = Math.round(taille*Math.sin((beta-alpha)*Math.PI/180)/Math.sin(alpha*Math.PI/180)/Math.sin(beta*Math.PI/180))
          taille=Math.round(distance*Math.sin(alpha*Math.PI/180)*Math.sin(beta*Math.PI/180)/Math.sin((beta-alpha)*Math.PI/180))
          A = point(0, 0, 'A')
          B = pointAdistance(A, 5, 0, 'B')
          H = pointAdistance(A, 12, 0, 'H')
          S = pointAdistance(H, 7, 90, 'S')
          C = projectionOrtho(B, droite(A, S), 'C')
          p = polygoneAvecNom(A, B, H, S, C)
          objets.push(p[1], p[0], segment(C, B), segment(S, B), codageAngleDroit(A, H, S),codageAngleDroit(B,C,S))
          objets.push(afficheMesureAngle(H, A, S, 'black', 2, `${alfa}`), afficheMesureAngle(H, B, S, 'black', 2, `${baita}`))
         
          objets.push(texteSurSegment(`${tex_nombre(distance)} m`, A, B, 'black', -0.5), texteParPosition(`h`, milieu(H, S).x + 0.5, milieu(H, S).y, 0, 'black', 2, "middle", true))

          texte = `Un voyageur approche d'une montagne. Il aimerait en calculer la hauteur.<br>`;
          texte += `Pour cela, il utilise un théodolite en un point $A$ qui lui permet de mesurer l'angle $${alfa}$ vertical formé par le sommet $S$ de la montagne, le point $A$ et la base de la montagne $H$.<br>`
          texte += `Il parcourt ensuite $${distance}$ m en direction de la montagne et effectue une nouvelle mesure de l'angle $${baita}$ en un point $B$.<br>`
          texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>On donne : $${alfa}=${alpha}\\degree$, $${baita}=${beta}\\degree$ et $AB=${distance}$ m.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets)+'<br>';

          if (this.sup) {
            texte += `${num_alpha(j)}Exprimer la mesure de l'angle $\\widehat{BSH}$ en fonction de $${baita}$.<br>`
            texte += `${num_alpha(j+1)}Exprimer la mesure de l'angle $\\widehat{ASH}$ en fonction de $${alfa}$.<br>`
            j+=2
          }
          texte+=`${num_alpha(j)}Montrer que $\\widehat{BSC}=${baita}-${alfa}$.<br>`
          j++
          if (this.sup) {
            texte+=`${num_alpha(j)}Dans le triangle $BCS$ exprimer $BS$ en fonction de $BC$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}Exprimer $BS$ en fonction de $BC$.<br>`
          }
          j++
          if (this.sup) {
            texte+=`${num_alpha(j)}Dans le triangle $ABC$, exprimer $BC$ en fonction de $AB$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}Exprimer $BC$ en fonction de $AB$.<br>`
          }
          j++
          if (this.sup){
            texte+=`${num_alpha(j)}En déduire $h$ en fonction de $BS$ puis en fonction de $BC$ enfin en fonction de $AB$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}En déduire $h$ en fonction de $AB$.<br>`
          }
          j++
          texte += `${num_alpha(j)}Quelle est la hauteur de la montagne (arrondir au mètre près) ?<br>`
          texte += `On supposera le point d'observation au niveau du sol.`
          j=0
          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 0.5 }, objets)+'<br>'
          if (this.sup) {
            texte_corr += `${num_alpha(j)}Dans le triangle $BHS$ rectangle en $H$, les angles aigus sont complémentaires donc $\\widehat{BSH}=90-${baita}$.<br>`
            texte_corr += `${num_alpha(j+1)}Dans le triangle $AHS$ rectangle en $H$, pour la même raison $\\widehat{ASH}=90-${alfa}$.<br>`
            j+=2
          }
          texte_corr+=`${num_alpha(j)}On sait que $\\widehat{BSH}=90-${baita}$ et $\\widehat{ASH}=90-${alfa}$.<br>Donc $\\widehat{BSC}=\\widehat{ASH}-\\widehat{BSH}=90-${alfa}-(90-${baita})=\\cancel{90}-${alfa}-\\cancel{90}+${baita}=${baita}-${alfa}$.<br>`
          j++
            texte_corr+=`${num_alpha(j)}Dans le triangle $BCS$ rectangle en $C$, $\\sin(\\widehat{BSC})=\\dfrac{BC}{BS}$ d'où $BS=\\dfrac{BC}{\\sin(\\widehat{BSC})}=\\dfrac{BC}{\\sin(${baita}-${alfa})}$.<br>`
          j++
            texte_corr+=`${num_alpha(j)}Dans le triangle $ABC$ rectangle en $C$, $\\sin(\\widehat{BAC})=\\dfrac{BC}{AB}$ d'où $BC=AB\\times \\sin(\\widehat{BAC})=AB\\times \\sin(${alfa})$.<br>`
          j++

            texte_corr+=`${num_alpha(j)}Dans le triangle $BHS$ rectangle en $H$, $h=BS\\times \\sin(${baita})=\\dfrac{BC}{\\sin(${baita}-${alfa})}\\times \\sin(${baita})=\\dfrac{AB\\times \\sin(${alfa})}{\\sin(${baita}-${alfa})}\\times \\sin(${baita})$<br>`

          j++
          texte_corr += `${num_alpha(j)}Application numérique : $h=\\dfrac{${distance}\\times \\sin(${alpha})}{\\sin(${beta}-${alpha})}\\times \\sin(${beta})$`
          texte_corr  +=`$=\\dfrac{${distance}\\times \\sin(${alpha})\\times \\sin(${beta})}{\\sin(${beta-alpha})}\\approx ${Math.round(taille)}$ m.<br>`
  
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_case_a_cocher = ['Afficher un schéma et des questions intermédiaires'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

