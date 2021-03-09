import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, tex_nombre, tex_nombrec } from "/modules/outils.js"
import { texteSurSegment, pointAdistance,polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d } from '../../modules/2d.js';
/**
 * Propose de calculer la hauteur d'une falaise en utilisant les angles de vue depuis deux positions d'un bateau sans s'en approcher.
 * @Auteur Jean-Claude Lhote
 * Référence 3G32-3
*/
export default function Calculs_trigonometriques3() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer la hauteur d'une falaise";
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
    let distance, alfa,baita, beta, alpha, taille, A, B, H, S, objets = [], p
    if (sortie_html) {
      alfa='α'
      baita='β'
    }
    else {
      alfa='\\alpha'
      baita='\\beta'
    }

    for (let i = 0, texte, texte_corr,cpt = 0; i < this.nb_questions && cpt < 50;) {
        objets=[]
          alpha = randint(25, 45)
          beta = Math.tan(alpha * Math.PI / 180) * Math.tan((alpha + 1) * Math.PI / 180) / (Math.tan((alpha + 1) * Math.PI / 180) - Math.tan(alpha * Math.PI / 180))
          distance = randint(5, 10)
          taille = beta * distance
          A = point(0, 0, 'A')
          B = pointAdistance(A, 5, 0, 'B')
          H = pointAdistance(A, 12, 0, 'H')
          S = pointAdistance(H, 7, 90, 'S')
          p = polygoneAvecNom(A, B, H, S)
          objets.push(p[1], p[0], segment(S, B), codageAngleDroit(A, H, S))
      if (sortie_html){
          objets.push(afficheMesureAngle(H, A, S, 'black', 2, `${alfa}`), afficheMesureAngle(H, B, S, 'black', 2, `${baita}`))
      }
      else {
        objets.push(afficheMesureAngle(H, A, S, 'black', 2, `$${alfa}$`), afficheMesureAngle(H, B, S, 'black', 2, `$${baita}$`))

      }
          objets.push(texteSurSegment(`${tex_nombre(distance)} m`, A, B, 'black', -0.5), texteParPosition(`h`, milieu(H, S).x + 0.5, milieu(H, S).y, 0, 'black', 2, "middle", true))

          texte = `Un observateur sur un bateau s'approche d'une falaise dont il veut mesurer la hauteur.<br>`;
          texte += `Il jette l'ancre puis constate qu'il voit la falaise sous un angle de $${alpha}\\degree$.<br>`
          texte += `Il se rapproche ensuite de la falaise jusqu'à la voir sous un angle de $${alpha + 5}\\degree$.<br>`
          texte += `Il constate qu'entre ses deux mesures, il s'est rapproché de la falaise de $${distance}$ m.<br>`
          if (this.sup) {
            texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets);
            texte += `<br>Exprimer $h$ en fonction de $BH$ et $${alfa}$ puis en fonction de $AH$ et $${baita}$.<br>`
            texte += `En déduire $BH$ en fonction de $AB$, $${alfa}$ et $${baita}$.<br>`
            texte += `Exprimer $HS$ en fonction de $AB$, $${alfa}$ et $${baita}$.<br>`
          }
          texte += `Quelle est la hauteur de la falaise ?<br>`
          texte += `A quelle distance du pied de la falaise se trouve l'observateur lors du deuxième relevé ?<br>`
          texte += `Arrondir les résultats au mètre près. (On supposera le point d'observation au niveau de l'eau)`
          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 8, pixelsParCm: 20, scale: 1 }, objets)
          texte_corr += `<br>Dans le triangle $BHS$ rectangle en $H$, $\\tan(${baita})=\\dfrac{h}{BH}$.<br>D'où $h=BH\\times \\tan(${baita})$.<br>`
          texte_corr += `<br>Dans le triangle $AHS$ rectangle en $H$, $\\tan(${alfa})=\\dfrac{h}{AH}$.<br>D'où $h=AH\\times \\tan(${alfa})$.<br>`
          texte_corr += `Or $AH=AB+BH$ donc $h=(AB+BH)\\times \\tan(${alfa})$.<br>`
          texte_corr += `On en déduit que $BH\\times \\tan(${baita})=(AB+BH)\\times \\tan(${alfa})$ soit $BH\\times \\tan(${baita})=AB\\times \\tan(${alfa})+BH\\times \\tan(${alfa})$.<br>`
          texte_corr += `D'où $AB\\times \\tan(${alfa})=BH\\times \\tan(${baita})-BH\\times \\tan(${alfa})=BH\\times (\\tan(${baita})-\\tan(${alfa}))$.<br>`
          texte_corr += `Et $BH=\\dfrac{AB\\times \\tan(${alfa})}{\\tan(${baita})-\\tan(${alfa})}$.<br>`
          texte_corr += `Ainsi $h=BH\\times \\tan(${baita})=\\dfrac{AB\\times \\tan(${alfa})\\times \\tan(${baita})}{\\tan(${baita})-\\tan(${alfa})}$.<br>`
          texte_corr += `Application numérique : <br>`
          texte_corr += `$h=\\dfrac{${distance}\\times \\tan(${alpha})\\times \\tan(${alpha + 5})}{\\tan(${alpha + 5})-\\tan(${alpha})}\\approx ${Math.round(taille)}$ m.<br>`
          texte_corr += `$BH=\\dfrac{${distance}\\times \\tan(${alpha})}{\\tan(${alpha + 5})-\\tan(${alpha})}\\approx ${tex_nombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m.<br>`
          texte_corr += `La hauteur de la falaise est de $${Math.round(taille)}$ m et l'observateur se trouve à $${tex_nombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m de celle-ci lors du deuxième relevé.<br>`;
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

