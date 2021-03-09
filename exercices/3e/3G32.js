import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, num_alpha,arrondi, calcul, tex_nombre, tex_nombrec, arrondi_virgule } from "/modules/outils.js"
import { texteSurSegment, tracePoint,labelPoint,projectionOrtho, pointAdistance,droite, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d } from '../../modules/2d.js';
import {point3d,vecteur3d,sphere3d,arete3d,rotationV3d,demicercle3d,homothetie3d} from "/modules/3d.js"
/**
 * Propose de calculer la largeur d'une rivière
 * @Auteur Jean-Claude Lhote
 * Référence 3G32
*/
export default function Calculs_trigonometriques() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer la largeur d'une rivière";
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
            alpha = randint(25, 65)
            j=0
            beta = alpha+randint(2,5)
            distance=randint(7,15)*10
            taille=Math.round(distance*(Math.tan(beta*Math.PI/180)-Math.tan(alpha*Math.PI/180)))
            A = point(0, 7, 'A')
            B = point(0, 0, 'B')
            C = point(7, 0, 'C')
            S = point(12,0, 'S')
            p = polygoneAvecNom(A, B, C,S)
            R = polygoneAvecNom(point(7,-1),point(12,-1),point(12,8),point(7,8))
            R[0].color='blue'
            R[0].couleurDeRemplissage='blue'
            R[0].opaciteDeRemplissage=0.5
            R[0].opacite=0.5
            objets.push(p[1], p[0],R[0], segment(A, C),  codageAngleDroit(A, B, C))
            objets.push(afficheMesureAngle(B,A,C, 'black', 1, `${alfa}`), afficheMesureAngle(B,A,S, 'black', 2, `${baita}`))
            objets.push(texteSurSegment(`${tex_nombre(distance)} m`, A, B, 'black', -0.5), texteParPosition(`l`, milieu(C, S).x, milieu(C, S).y+0.5, 0, 'black', 2, "middle", true))
  
            texte = `Un géomètre veut mesurer la largeur d'une rivière.<br>`
            texte+=`Pour cela, il remarque une souche notée $S$ sur la rive opposée.<br>`;
            texte += `Il a placé un cône sur sa rive en face de la souche, son emplacement est noté $C$.<br>`
            texte+=`Ensuite il s'est éloigné de la berge en restant aligné avec la souche $S$ et le cône $C$ jusqu'à un endroit où il place un bâton noté $B$.<br>`
            texte+=`Du bâton, il effectue un quart de tour et s'éloigne d'une distance de $${distance}$ m jusqu'à son appareil de mesure noté $A$.<br>`
            texte+=`A l'aide de son appareil, il mesure l'angle $\\widehat{BAC}$ noté $${alfa}$  et l'angle $\\widehat{BAS}$ noté $${baita}$.<br>`
            if (this.sup) {
              texte+=`${num_alpha(j)}Exprimer $BC$ en fonction de $AB$ et de $${alfa}$.<br>`
              j++
              texte+=`${num_alpha(j)}Exprimer $BS$ en fonction de $AB$ et de $${baita}$.<br>`
              j++
            }
            texte+=`${num_alpha(j)}Exprimer $CS$ en fonction de $AB$, de $${alfa}$ et de $${baita}$.<br>`
            j++
            texte+=`${num_alpha(j)}Calculer la largeur de la rivière au mètre près sachant que $${alfa}=${alpha}\\degree$ et $${baita}=${beta}\\degree$.<br>`
            texte+=mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets)+'<br>';
            j=0
            texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets)+'<br>'
            if (this.sup) {
              texte_corr+=`${num_alpha(j)}Dans le triangle $ABC$ rectangle en $B$ on a : $\\tan(${alfa})=\\dfrac{BC}{AB}$ d'où $BC=AB\\times \\tan(${alfa})$.<br>`
              j++
              texte_corr+=`${num_alpha(j)}Dans le triangle $ABS$ rectangle en $B$ on a : $\\tan(${baita})=\\dfrac{BS}{AB}$ d'où $BS=AB\\times \\tan(${baita})$.<br>`
              j++
            }
            texte_corr+=`${num_alpha(j)}Comme $BS=AB\\times \\tan(${baita})$ et $BC=AB\\times \\tan(${alfa})$, alors $CS=AB\\times (\\tan(${baita})-\\tan(${alfa}))$.<br>`
            j++
            texte_corr+=`${num_alpha(j)}Donc $CS=${distance}\\times (\\tan(${beta})-\\tan(${alpha}))\\approx ${taille}$ m.<br>`

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

