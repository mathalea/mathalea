import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,calcul,creerNomDePolygone, tex_nombre} from "/modules/outils.js"
import {point,labelPoint,polygone,similitude,codageAngleDroit,mathalea2d} from "/modules/2d.js"
import { longueur, angle } from '../../modules/2d.js';


/**
 * Deux triangles rectangles accolés, on connait deux longueurs et un angle, il faut déterminer tous les autres angles
 * @Auteur Rémi Angot
 * 3G31-1
 * Février 2021 
*/
export default function MonSuperExerciceTropBeau() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer toutes les mesures d'angle d'une figure complexe";
  this.consigne = "Calculer la mesure de tous les angles de cette figure";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
  this.spacing_corr = 3;
  //this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  //this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['BA-AD-BAC']; // On créé 3 types de questions
    let texte, texte_corr;

    let B = point(0,0,'','below')
    let A = point(randint(4,7),0,'','below')
    let C = point(0,randint(3,7),'','above')
    let t1 = polygone(A,B,C)
    let c1 = codageAngleDroit(A,B,C)
    let D = similitude(C,A,-90,calcul(randint(7,12)/10),'','right')
    let t2 = polygone(C,A,D)
    let c2 = codageAngleDroit(C,A,D)
    let nom = creerNomDePolygone(4)
    A.nom = nom[0]
    B.nom = nom[1]
    C.nom = nom[2]
    D.nom = nom[3]
    let labels = labelPoint(A,B,C,D)

    texte = mathalea2d({xmin : -1 , ymin : -1, xmax : D.x+1, ymax : math.max(C.y,D.y)+1},t1, t2, c1, c2,labels );


    switch (type_de_questions_disponibles[0]) { // Suivant le type de question, le contenu sera différent
    case 'BA-AD-BAC': 
        let BA = longueur(B,A);
        let AD = math.ceil(longueur(A,D));
        let BAC = math.ceil(angle(B,A,C));
        let AC = calcul(BA/math.cos(Math.radians(BAC)),1);
        let ACD = Math.round(Math.degres(Math.atan(AD/AC)));
        texte += `<br>On a $${B.nom+A.nom} = ${BA}$ cm, $${A.nom+D.nom} = ${AD}$ cm et $\\widehat{${B.nom+A.nom+C.nom}}=${BAC}°$.`
        texte_corr = `$${C.nom+B.nom+A.nom}$ est rectangle en $${B.nom}$ donc $\\cos\\left(\\widehat{${B.nom+A.nom+C.nom}}\\right)=\\dfrac{${B.nom+A.nom}}{${A.nom+C.nom}}$ `;
        texte_corr += `soit $\\cos(${BAC}°)=\\dfrac{${BA}}{${A.nom+C.nom}}$ et $${A.nom+C.nom}=\\dfrac{${BA}}{\\cos(${BAC}°)}\\approx${tex_nombre(AC)}$ cm.`
        texte_corr += `<br><br>$${C.nom+A.nom+D.nom}$ est rectangle en $${A.nom}$ donc $\\tan\\left(\\widehat{${A.nom+C.nom+D.nom}}\\right)=\\dfrac{${A.nom+D.nom}}{${A.nom+C.nom}}$ `;
        texte_corr += `soit $\\tan\\left(\\widehat{${A.nom+C.nom+D.nom}}\\right)\\approx\\dfrac{${AD}}{${tex_nombre(AC)}}$ et $\\widehat{${A.nom+C.nom+D.nom}}\\approx${ACD}$°.`
        texte_corr += `<br><br>La somme des angles d'un triangle est égale à 180° donc $\\widehat{${B.nom+C.nom+A.nom}}=180°-90°-${BAC}°=${90-BAC}°$.`
        texte_corr += `<br>De même, $\\widehat{${C.nom+D.nom+A.nom}}\\approx 180°-90°-${ACD}°\\approx${90-ACD}°$.`

        break;
    case 'type2': 
        texte = `Question ${i+1} de type 2`;
        texte_corr = `Correction ${i+1} de type 2`;
        break;
    case 'type3': // Table de 200
        texte = `Question ${i+1} de type 2`;
        texte_corr = `Correction ${i+1} de type 2`;
        break;
        
    }
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}


