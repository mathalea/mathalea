import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, num_alpha,arrondi, calcul, tex_nombre, tex_nombrec, arrondi_virgule } from "/modules/outils.js"
import { texteSurSegment, tracePoint,labelPoint,projectionOrtho, pointAdistance,droite, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d } from '../../modules/2d.js';
import {point3d,vecteur3d,sphere3d,arete3d,rotationV3d,demicercle3d,homothetie3d} from "/modules/3d.js"
/**
 * propose de mesurer la hauteur d'un objet en utilisant l'angle sous lequel on voit l'objet et la distance à l'objet. 
 * @Auteur Jean-Claude Lhote
 * Référence 3G32-2
*/
export default function Calculs_trigonometriques2() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer la hauteur d'un objet vu sous un angle donné";
  this.consigne = "";
  this.nb_cols = 1; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
  this.sup = true; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.nb_questions = 1
  this.spacing_corr=2
  this.spacing=2

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let objet = [['arbre', 'un', ''], ['immeuble', 'un', ''], ['éolienne', 'une', 'te'], ['coline', 'une', 'te']]
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
      // Boucle principale où i+1 correspond au numéro de la question

        objets=[]
          distance = randint(5, 300)
          hauteur = calcul(randint(150, 190) / 100)
          beta = Math.atan(hauteur / distance)
          alpha = randint(10, 50)
          teta = alpha * Math.PI / 180 - beta
          taille = arrondi(hauteur + distance * Math.tan(teta), 1)
          if (taille < 20) index = 0
          else if (taille < 50) index = 1
          else if (taille < 100) index = 2
          else index = 3
          A = point(0, 0, 'A')
          B = pointAdistance(A, 12, 0, 'B')
          O = pointAdistance(A, 3, 90, 'O')
          H = pointAdistance(B, 3, 90, 'H')
          S = pointAdistance(B, 9, 90, 'S')
          p = polygoneAvecNom(A, B, H, S, O)
          objets.push(p[1], p[0], segment(O, B), segment(O, H), codageAngleDroit(O, A, B), codageAngleDroit(A, B, H), codageAngleDroit(O, H, S))
          objets.push(afficheMesureAngle(B, O, S, 'black', 3, `${alfa}`), afficheMesureAngle(A, B, O, 'black', 2, `${baita}`), afficheMesureAngle(B, O, H, 'black', 2, `${baita}`))
          objets.push(texteSurSegment(`${tex_nombre(hauteur)} m`, O, A, 'black', -0.5), texteSurSegment(`${tex_nombre(distance)} m`, O, H))
          texte = `Un observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`;
          texte += `Cet${objet[index][2]} ${objet[index][0]} est situé à une distance de $${tex_nombre(distance)}$ m de l'observateur.<br>`
          texte += `l'oeil de l'observateur est situé à $${tex_nombre(hauteur)}$ m du sol.<br>`
          if (this.sup) {

            texte += `$O$ représente l'oeil de l'observateur, $[BS]$ représente cet${objet[index][2]} ${objet[index][0]}.<br>`

            texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 10, pixelsParCm: 20, scale: 0.5 }, objets);
            texte += `<br>Calculer d'abord l'angle $${baita}$.<br>`
            texte += `En déduire la mesure de l'angle $\\widehat{HOS}$.<br>`
            texte += `Calculer alors la longueur $HS$.<br>`
          }
          texte += `Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]} arrondie au mètre près.<br>`

          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 10, pixelsParCm: 20, scale: 0.5 }, objets)
          texte_corr += `<br>Dans le triangle $OHB$ rectangle en $H$, $\\tan(${baita})=\\dfrac{HB}{OH}$.<br>D'où $${baita}=\\arctan(\\dfrac{${tex_nombre(hauteur)}}{${tex_nombre(distance)}})\\approx ${arrondi_virgule(beta)}\\degree$.<br>`
          texte_corr += `$\\widehat{HOS}=${alfa}-${baita}\\approx ${arrondi_virgule(alpha - beta)}$.<br>`
          texte_corr += `$HS=OH\\times \\tan(\\widehat{HOS})\\approx ${distance}\\times \\tan(${arrondi_virgule(alpha - beta)})\\approx ${tex_nombrec(taille - hauteur)}$ m.<br>`
          texte_corr += `$BS=BH+HS=${tex_nombre(hauteur)}+${tex_nombrec(taille - hauteur)}=${tex_nombre(taille)}$ m.<br>`
          texte_corr += `Cet${objet[index][2]} ${objet[index][0]} mesure $${tex_nombre(Math.round(taille))}$ m de hauteur.`;

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

