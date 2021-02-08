import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint,arrondi,calcul,tex_nombre,tex_nombrec,arrondi_virgule} from "/modules/outils.js"
import { pointAdistance, polygoneAvecNom, afficheMesureAngle,codageAngleDroit,point,segment,texteParPosition,milieu,mathalea2d} from './../../modules/2d.js';
import { texteSurSegment } from '/modules/2d.js';
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
this.nb_questions=1

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let objet=[['arbre','un',''],['immeuble','un',''],['éolienne','une','te'],['montagne','une','te']]
    let distance,hauteur,beta,alpha,teta,taille,index,A,B,O,H,S,echelle,objets=[],p
    let type_de_questions_disponibles = ['type1','type2']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': 
              
        distance=randint(5,300)
        hauteur=calcul(randint(150,190)/100)
        beta=Math.atan(hauteur/distance)
        alpha=randint(10,50)
        teta=alpha*Math.PI/180-beta
        taille=arrondi(hauteur+distance*Math.tan(teta),1)
        if (taille<20) index=0
        else if (taille<50) index=1
        else if (taille<100) index=2
        else index=3
        A=point(0,0,'A')
        B=pointAdistance(A,12,0,'B')
        O=pointAdistance(A,3,90,'O')
        H=pointAdistance(B,3,90,'H')
        S=pointAdistance(B,9,90,'S')
        p=polygoneAvecNom(A,B,H,S,O)
        objets.push(p[1],p[0],segment(O,B),segment(O,H),codageAngleDroit(O,A,B),codageAngleDroit(A,B,H),codageAngleDroit(O,H,S))
        objets.push(afficheMesureAngle(B,O,S,'black',3,'α'),afficheMesureAngle(A,B,O,'black',2,'β'),afficheMesureAngle(B,O,H,'black',2,'β'))
        objets.push(texteSurSegment(`${tex_nombre(hauteur)} m`,O,A,'black',-0.5),texteSurSegment(`${tex_nombre(distance)} m`,O,H))
          texte = `On observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`;
          texte+=`Cet${objet[index][2]} ${objet[index][0]} est situé à une distance de $${tex_nombre(distance)}$ m de l'observateur.<br>`
          texte+=`l'oeil de l'observateur est situé à $${tex_nombre(hauteur)}$ m du sol.<br>`
          if (this.sup2) {

          texte+=`$O$ représente l'oeil de l'observateur, $[BS]$ représente cet${objet[index][2]} ${objet[index][0]}.<br>`

            texte+=`Le schéma ci-dessous n'est pas en vraie grandeur.<br>`+mathalea2d({xmin:-1,ymin:-1,xmax:14,ymax:11,pixelsParCm:20,scale:1},objets);
            texte+=`<br>Calculer d'abord l'angle $β$.<br>`
            texte+=`En déduire la mesure de l'angle $\\widehat{HOS}$.<br>`
            texte+=`Calculer alors la longueur $HS$.<br>`
          }
          texte+=`Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]} arrondie au mètre près.<br>`

          texte_corr=mathalea2d({xmin:-1,ymin:-1,xmax:14,ymax:11,pixelsParCm:20,scale:1},objets)
          texte_corr+=`<br>Dans le triangle $OHB$ rectangle en $H$, $tan(β)=\\dfrac{HB}{OH}$.<br>D'où $β=Atan(\\dfrac{${tex_nombre(hauteur)}}{${tex_nombre(distance)}})\\approx ${arrondi_virgule(beta)}\\degree$.<br>`
          texte_corr+=`$\\widehat{HOS}=α-β\\approx ${arrondi_virgule(alpha-beta)}$.<br>`
          texte_corr+=`$HS=OH\\times tan(\\widehat{HOS})\\approx ${distance}\\times tan(${arrondi_virgule(alpha-beta)})\\approx ${tex_nombrec(taille-hauteur)}$ m.<br>`
          texte_corr+=`$BS=BH+HS=${tex_nombre(hauteur)}+${tex_nombrec(taille-hauteur)}=${tex_nombre(taille)}$ m.<br>`
          texte_corr += `Cet${objet[index][2]} ${objet[index][0]} mesure $${tex_nombre(Math.round(taille))}$ m de hauteur.`;
          break;
        case 'type2': 
        alpha=randint(25,45)
        beta=Math.tan(alpha*Math.PI/180)*Math.tan((alpha+1)*Math.PI/180)/(Math.tan((alpha+1)*Math.PI/180)-Math.tan(alpha*Math.PI/180))
        distance=randint(5,10)
        taille=beta*distance
        A=point(0,0,'A')
        B=pointAdistance(A,5,0,'B')
        H=pointAdistance(A,12,0,'H')
        S=pointAdistance(H,7,90,'S')
        p=polygoneAvecNom(A,B,H,S)
        objets.push(p[1],p[0],segment(S,B),codageAngleDroit(A,H,S))
        objets.push(afficheMesureAngle(H,A,S,'black',2,'α'),afficheMesureAngle(H,B,S,'black',2,'β'))
        objets.push(texteSurSegment(`${tex_nombre(distance)} m`,A,B,'black',-0.5),texteParPosition(`h`,milieu(H,S).x+0.5,milieu(H,S).y,0,'black',2,"middle",true))

            texte = `Un observateur sur un bateau s'approche d'une falaise dont il veut mesurer la hauteur.<br>`;
            texte+=`Il jette l'ancre puis constate qu'il voit la falaise sous un angle de $${alpha}\\degree$.<br>`
            texte+=`Il se rapproche ensuite de la falaise jusqu'à la voir sous un angle de $${alpha+5}\\degree$.<br>`
            texte+=`Il constate qu'entre ses deux mesures, il s'est rapproché de la falaise de $${distance}$ m.<br>`
            if (this.sup2){
              texte+=`Le schéma ci-dessous n'est pas en vraie grandeur.<br>`+mathalea2d({xmin:-1,ymin:-1,xmax:14,ymax:11,pixelsParCm:20,scale:1},objets);
              texte+=`<br>Exprimer $\\bm{h}$ en fonction de $BH$ et $α$ puis en fonction de $AH$ et $β$.<br>`
              texte+=`En déduire $BH$ en fonction de $AB$, $α$ et $β$.<br>`
              texte+=`Exprimer $HS$ en fonction de $AB$, $α$ et $β$.<br>`
            }
            texte+=`Quelle est la hauteur de la falaise ?<br>`
            texte+=`A quelle distance du pied de la falaise se trouve l'observateur lors du deuxième relevé ?<br>`
            texte+=`Arrondir les résultats au mètre près. (On supposera le point d'observation au niveau de l'eau)`
            texte_corr=mathalea2d({xmin:-1,ymin:-1,xmax:14,ymax:11,pixelsParCm:20,scale:1},objets)
            texte_corr+=`<br>Dans le triangle $BHS$ rectangle en $H$, $tan(β)=\\dfrac{\\bm {h}}{BH}$.<br>D'où $\\bm {h}=BH\\times tan(β)$.<br>`
            texte_corr+=`<br>Dans le triangle $AHS$ rectangle en $H$, $tan(α)=\\dfrac{\\bm {h}}{AH}$.<br>D'où $\\bm {h}=AH\\times tan(α)$.<br>`
            texte_corr+=`Or $AH=AB+BH$ donc $\\bm {h}=(AB+BH)\\times tan(α)$.<br>`
            texte_corr+=`On en déduit que $BH\\times tan(β)=(AB+BH)\\times tan(α)$ soit $BH\\times tan(β)=AB\\times tan(α)+BH\\times tan(α)$.<br>`
            texte_corr+=`D'où $AB\\times tan(α)=BH\\times tan(β)-BH\\times tan(α)=BH\\times (tan(β)-tan(α))$.<br>`
            texte_corr+=`Et $BH=\\dfrac{AB\\times tan(α)}{tan(β)-tan(α)}$.<br>`
            texte_corr+=`Ainsi $\\bm {h}=BH\\times tan(β)=\\dfrac{AB\\times tan(α)\\times tan(β)}{tan(β)-tan(α)}$.<br>`
            texte_corr+=`Application numérique : <br>`
            texte_corr+=`$\\bm {h}=\\dfrac{${distance}\\times tan(${alpha})\\times tan(${alpha+5})}{tan(${alpha+5})-tan(${alpha})}\\approx ${Math.round(taille)}$ m.<br>`
            texte_corr += `$BH=\\dfrac{${distance}\\times tan(${alpha})}{tan(${alpha+5})-tan(${alpha})}\\approx ${tex_nombrec(Math.round(taille/Math.tan((alpha+5)*Math.PI/180)))}$ m.<br>`
            texte_corr += `La hauteur de la falaise est de $${Math.round(taille)}$ m et l'observateur se trouve à $${tex_nombrec(Math.round(taille/Math.tan((alpha+5)*Math.PI/180)))}$ m de celle-ci lors du deuxième relevé.<br>`;
          break;
        case 'type3': // Table de 200
            texte = `Question ${i+1} de type 2`;
            texte_corr = `Correction ${i+1} de type 2`;
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
  this.besoin_formulaire2_case_a_cocher =['Afficher un schéma et des questions intermédiaires'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

