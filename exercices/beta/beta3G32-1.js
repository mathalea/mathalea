import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, num_alpha,arrondi, calcul, tex_nombre, tex_nombrec, arrondi_virgule } from "/modules/outils.js"
import { texteSurSegment, projectionOrtho, pointAdistance,droite, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, texteParPosition, milieu, mathalea2d } from './../../modules/2d.js';
import { } from '/modules/2d.js';
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function Calculs_trigonometriques() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Problèmes utilisant la trigonométrie";
  this.consigne = "";
  this.nb_questions = 10;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.sup2 = false;
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.nb_questions = 1

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let objet = [['arbre', 'un', ''], ['immeuble', 'un', ''], ['éolienne', 'une', 'te'], ['montagne', 'une', 'te']]
    let distance, hauteur, beta, alpha, teta, taille, index, A, B, O, H, S, C, objets = [], p
    let type_de_questions_disponibles = ['type1', 'type2','type3']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr,j, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question

      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':

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
          objets.push(afficheMesureAngle(B, O, S, 'black', 3, 'α'), afficheMesureAngle(A, B, O, 'black', 2, 'β'), afficheMesureAngle(B, O, H, 'black', 2, 'β'))
          objets.push(texteSurSegment(`${tex_nombre(hauteur)} m`, O, A, 'black', -0.5), texteSurSegment(`${tex_nombre(distance)} m`, O, H))
          texte = `On observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`;
          texte += `Cet${objet[index][2]} ${objet[index][0]} est situé à une distance de $${tex_nombre(distance)}$ m de l'observateur.<br>`
          texte += `l'oeil de l'observateur est situé à $${tex_nombre(hauteur)}$ m du sol.<br>`
          if (this.sup2) {

            texte += `$O$ représente l'oeil de l'observateur, $[BS]$ représente cet${objet[index][2]} ${objet[index][0]}.<br>`

            texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 11, pixelsParCm: 20, scale: 1 }, objets);
            texte += `<br>Calculer d'abord l'angle $β$.<br>`
            texte += `En déduire la mesure de l'angle $\\widehat{HOS}$.<br>`
            texte += `Calculer alors la longueur $HS$.<br>`
          }
          texte += `Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]} arrondie au mètre près.<br>`

          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 11, pixelsParCm: 20, scale: 1 }, objets)
          texte_corr += `<br>Dans le triangle $OHB$ rectangle en $H$, $tan(β)=\\dfrac{HB}{OH}$.<br>D'où $β=Atan(\\dfrac{${tex_nombre(hauteur)}}{${tex_nombre(distance)}})\\approx ${arrondi_virgule(beta)}\\degree$.<br>`
          texte_corr += `$\\widehat{HOS}=α-β\\approx ${arrondi_virgule(alpha - beta)}$.<br>`
          texte_corr += `$HS=OH\\times tan(\\widehat{HOS})\\approx ${distance}\\times tan(${arrondi_virgule(alpha - beta)})\\approx ${tex_nombrec(taille - hauteur)}$ m.<br>`
          texte_corr += `$BS=BH+HS=${tex_nombre(hauteur)}+${tex_nombrec(taille - hauteur)}=${tex_nombre(taille)}$ m.<br>`
          texte_corr += `Cet${objet[index][2]} ${objet[index][0]} mesure $${tex_nombre(Math.round(taille))}$ m de hauteur.`;
          break;
        case 'type2':
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
          objets.push(afficheMesureAngle(H, A, S, 'black', 2, 'α'), afficheMesureAngle(H, B, S, 'black', 2, 'β'))
          objets.push(texteSurSegment(`${tex_nombre(distance)} m`, A, B, 'black', -0.5), texteParPosition(`h`, milieu(H, S).x + 0.5, milieu(H, S).y, 0, 'black', 2, "middle", true))

          texte = `Un observateur sur un bateau s'approche d'une falaise dont il veut mesurer la hauteur.<br>`;
          texte += `Il jette l'ancre puis constate qu'il voit la falaise sous un angle de $${alpha}\\degree$.<br>`
          texte += `Il se rapproche ensuite de la falaise jusqu'à la voir sous un angle de $${alpha + 5}\\degree$.<br>`
          texte += `Il constate qu'entre ses deux mesures, il s'est rapproché de la falaise de $${distance}$ m.<br>`
          if (this.sup2) {
            texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 11, pixelsParCm: 20, scale: 1 }, objets);
            texte += `<br>Exprimer $\\bm{h}$ en fonction de $BH$ et $α$ puis en fonction de $AH$ et $β$.<br>`
            texte += `En déduire $BH$ en fonction de $AB$, $α$ et $β$.<br>`
            texte += `Exprimer $HS$ en fonction de $AB$, $α$ et $β$.<br>`
          }
          texte += `Quelle est la hauteur de la falaise ?<br>`
          texte += `A quelle distance du pied de la falaise se trouve l'observateur lors du deuxième relevé ?<br>`
          texte += `Arrondir les résultats au mètre près. (On supposera le point d'observation au niveau de l'eau)`
          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 11, pixelsParCm: 20, scale: 1 }, objets)
          texte_corr += `<br>Dans le triangle $BHS$ rectangle en $H$, $tan(β)=\\dfrac{\\bm {h}}{BH}$.<br>D'où $\\bm {h}=BH\\times tan(β)$.<br>`
          texte_corr += `<br>Dans le triangle $AHS$ rectangle en $H$, $tan(α)=\\dfrac{\\bm {h}}{AH}$.<br>D'où $\\bm {h}=AH\\times tan(α)$.<br>`
          texte_corr += `Or $AH=AB+BH$ donc $\\bm {h}=(AB+BH)\\times tan(α)$.<br>`
          texte_corr += `On en déduit que $BH\\times tan(β)=(AB+BH)\\times tan(α)$ soit $BH\\times tan(β)=AB\\times tan(α)+BH\\times tan(α)$.<br>`
          texte_corr += `D'où $AB\\times tan(α)=BH\\times tan(β)-BH\\times tan(α)=BH\\times (tan(β)-tan(α))$.<br>`
          texte_corr += `Et $BH=\\dfrac{AB\\times tan(α)}{tan(β)-tan(α)}$.<br>`
          texte_corr += `Ainsi $\\bm {h}=BH\\times tan(β)=\\dfrac{AB\\times tan(α)\\times tan(β)}{tan(β)-tan(α)}$.<br>`
          texte_corr += `Application numérique : <br>`
          texte_corr += `$\\bm {h}=\\dfrac{${distance}\\times tan(${alpha})\\times tan(${alpha + 5})}{tan(${alpha + 5})-tan(${alpha})}\\approx ${Math.round(taille)}$ m.<br>`
          texte_corr += `$BH=\\dfrac{${distance}\\times tan(${alpha})}{tan(${alpha + 5})-tan(${alpha})}\\approx ${tex_nombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m.<br>`
          texte_corr += `La hauteur de la falaise est de $${Math.round(taille)}$ m et l'observateur se trouve à $${tex_nombrec(Math.round(taille / Math.tan((alpha + 5) * Math.PI / 180)))}$ m de celle-ci lors du deuxième relevé.<br>`;
          break;
        case 'type3': // Table de 200
          alpha = randint(25, 45)
          j=0
          beta = alpha+randint(1,5)
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
          objets.push(afficheMesureAngle(H, A, S, 'black', 2, `α`), afficheMesureAngle(H, B, S, 'black', 2, `β`))
          objets.push(texteSurSegment(`${tex_nombre(distance)} m`, A, B, 'black', -0.5), texteParPosition(`h`, milieu(H, S).x + 0.5, milieu(H, S).y, 0, 'black', 2, "middle", true))

          texte = `Un voyageur approche d'une montagne. Il aimerait en calculer la hauteur.<br>`;
          texte += `Pour cela, il utilise un théodolite en un point $A$ qui lui permet de mesurer l'angle $α$ vertical formé par le sommet $S$ de la montagne, le point $A$ et la base de la montagne $H$.<br>`
          texte += `Il parcourt ensuite $${distance}$ m en direction de la montagne et effectue une nouvelle mesure de l'angle $β$ en un point $B$.<br>`
          texte += `Le schéma ci-dessous n'est pas en vraie grandeur.<br>On donne : $α=${alpha}\\degree$, $β=${beta}\\degree$ et $AB=${distance}$ m.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 11, pixelsParCm: 20, scale: 1 }, objets)+'<br>';

          if (this.sup2) {
            texte += `${num_alpha(j)}Exprimer la mesure de l'angle $\\widehat{BSH}$ en fonction de $β$.<br>`
            texte += `${num_alpha(j+1)}Exprimer la mesure de l'angle $\\widehat{ASH}$ en fonction de $α$.<br>`
            j+=2
          }
          texte+=`${num_alpha(j)}Montrer que $\\widehat{BSC}=β-α$.<br>`
          j++
          if (this.sup2) {
            texte+=`${num_alpha(j)}Dans le triangle $BCS$ exprimer $BS$ en fonction de $BC$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}Exprimer $BS$ en fonction de $BC$.<br>`
          }
          j++
          if (this.sup2) {
            texte+=`${num_alpha(j)}Dans le triangle $ABC$, exprimer $BC$ en fonction de $AB$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}Exprimer $BC$ en fonction de $AB$.<br>`
          }
          j++
          if (this.sup2){
            texte+=`${num_alpha(j)}En déduire $\\bm {h}$ en fonction de $BS$ puis en fonction de $BC$ enfin en fonction de $AB$.<br>`
          }
          else {
            texte+=`${num_alpha(j)}En déduire $\\bm {h}$ en fonction de $AB$.<br>`
          }
          j++
          texte += `${num_alpha(j)}Quelle est la hauteur de la montagne (arrondir au mètre près) ?<br>`
          texte += `On supposera le point d'observation au niveau du sol.`
          j=0
          texte_corr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 11, pixelsParCm: 20, scale: 1 }, objets)+'<br>'
          if (this.sup2) {
            texte_corr += `${num_alpha(j)}Dans le triangle $BHS$ rectangle en $H$, les angles aigus sont complémentaires donc $\\widehat{BSH}=90-β$.<br>`
            texte_corr += `${num_alpha(j+1)}Dans le triangle $AHS$ rectangle en $H$, pour la même raison $\\widehat{ASH}=90-α$.<br>`
            j+=2
          }
          texte_corr+=`${num_alpha(j)}On sait que $\\widehat{BSH}=90-β$ et $\\widehat{ASH}=90-α$.<br>Donc $\\widehat{BSC}=\\widehat{ASH}-\\widehat{BSH}=90-α-(90-β)=\\cancel{90}-α-\\cancel{90}+β=β-α$.<br>`
          j++
            texte_corr+=`${num_alpha(j)}Dans le triangle $BCS$ rectangle en $C$, $sin(\\widehat{BSC})=\\dfrac{BC}{BS}$ d'où $BS=\\dfrac{BC}{sin(\\widehat{BSC})}=\\dfrac{BC}{sin(β-α)}$.<br>`
          j++
            texte_corr+=`${num_alpha(j)}Dans le triangle $ABC$ rectangle en $C$, $sin(\\widehat{BAC})=\\dfrac{BC}{AB}$ d'où $BC=AB\\times sin(\\widehat{BAC})=AB\\times sin(α)$.<br>`
          j++

            texte_corr+=`${num_alpha(j)}Dans le triangle $BHS$ rectangle en $H$, $\\bm {h}=BS\\times sin(β)=\\dfrac{BC}{sin(β-α)}\\times sin(β)=\\dfrac{AB\\times sin(α)}{sin(β-α)}\\times sin(β)$<br>`

          j++
          texte_corr += `${num_alpha(j)}Application numérique : $\\bm{h}=\\dfrac{${distance}\\times sin(${alpha})}{sin(${beta}-${alpha})}\\times sin(${beta})$`
          texte_corr  +=`$=\\dfrac{${distance}\\times sin(${alpha})\\times sin(${beta})}{sin(${beta-alpha})}\\approx ${Math.round(taille)}$ m.<br>`
          break;

      }

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
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3];
  this.besoin_formulaire2_case_a_cocher = ['Afficher un schéma et des questions intermédiaires'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

