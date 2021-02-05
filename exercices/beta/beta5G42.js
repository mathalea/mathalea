import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,choisit_lettres_differentes} from "/modules/outils.js"
import { mathalea2d,point,codeSegments,segment, polygoneAvecNom,codageAngleDroit,labelPoint,similitude, } from '/modules/2d.js';
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function demonstrations_parallelogrammes() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Nature de parallélogrammes";
  this.consigne = "";
  this.nb_questions = 7;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 50; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['type1','type2','type3','type4','type5','type6','type7']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0,objets,O,A,B,C,D,p,a1,a2,t1,t2,t3,t4,s1,s2,s3,s4,d1,d2, texte, texte_corr,noms,nom,prop1,prop2,type,def,centre, cpt = 0; i < this.nb_questions && cpt < 50;) {
      noms=choisit_lettres_differentes(5,'Q')
      nom=`$${noms[0]+noms[1]+noms[2]+noms[3]}$`
      centre=`$${noms[4]}$`
      objets=[]
      O=point(0,0,noms[4],'above left')
      A=point(3,0,noms[0])
      B=similitude(A,O,80+randint(0,20),0.8+randint(1,40)/100,noms[1])
      C=similitude(A,O,180,0.9+randint(1,20)/100,noms[2])
      D=similitude(B,O,180,0.9+randint(1,20)/100,noms[3])
      p=polygoneAvecNom(A,B,C,D)
      s1=segment(A,B)
      s2=segment(B,C)
      s3=segment(C,D)
      s4=segment(D,A)
      d1=segment(A,C)
      d2=segment(B,D)
      s1.color='blue'
      s3.color='blue'
      s2.color='red'
      s4.color='red'
      objets.push(s1,s2,s3,s4,p[1])
        // Boucle principale où i+1 correspond au numéro de la question
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': // rectangle 1
          def=`ses diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ ont la même longueur`
          prop1=`a des diagonales de même longueur`
          prop2=`$${noms[0]+noms[2]}=${noms[1]+noms[3]}$`
          type=`rectangle`
          t2=codeSegments('||','red',B,O,O,D)
          t1=codeSegments('||','red',A,O,O,C)
          objets.push(t1,t2,d1,d2) 
          break;
        case 'type2': // losange 1
        def=`ses diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ sont perpendiculaires`
        prop1=`a des diagonales perpendiculaires`
        prop2=`$[${noms[0]+noms[2]}]\\perp[${noms[1]+noms[3]}]$`
        type=`losange`
        t1=codeSegments('||','red',A,O,O,C)
        t2=codageAngleDroit(A,O,D)
        t3=codeSegments('|||','blue',B,O,O,D)
        t4=labelPoint(O)    
        objets.push(t1,t2,t3,t4,d1,d2)   
          break;
        case 'type3': // carré 1
        prop2=`$[${noms[0]+noms[2]}]\\perp[${noms[1]+noms[3]}]$ et $${noms[0]+noms[2]}=${noms[1]+noms[3]}$`
        def=`ses diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ ont la même longueur et sont perpendiculaires`
        prop1=`a des diagonales perpendiculaires et de même longueur`
        t1=codeSegments('||','red',A,O,O,C)
        t2=codageAngleDroit(A,O,D)
        t3=codeSegments('||','red',B,O,O,D)
        t4=labelPoint(O)     
        objets.push(t1,t2,t3,t4,d1,d2)  
        type=`carré`
          break;
          case 'type4': //losange 2
          prop2=`$${noms[0]+noms[1]}=${noms[1]+noms[2]}$`
          def=`ses côtés $[${noms[0]+noms[1]}]$ et $[${noms[1]+noms[2]}]$ ont la même longueur`
          prop1=`a deux côtés consécutifs de même longueur`
          type=`losange`
          t3=codeSegments('O','green',A,B,B,C)
          objets.push(t3)      
            break;
          case 'type5': // rectangle 2
          prop2=`$[${noms[0]+noms[1]}]\\perp[${noms[1]+noms[2]}]$`
          def=`ses côtés $[${noms[0]+noms[1]}]$ et $[${noms[1]+noms[2]}]$ sont perpendiculaires`
          prop1=`a deux côtés consécutifs perpendiculaires`
          t3=codageAngleDroit(A,B,C)
          objets.push(t3)      
          type=`rectangle`
            break;
            case 'type6': // carré 2
            prop2=`$[${noms[0]+noms[1]}]\\perp[${noms[1]+noms[2]}]$ et $${noms[0]+noms[1]}=${noms[1]+noms[2]}$`
          def=`ses côtés $[${noms[0]+noms[1]}]$ et $[${noms[1]+noms[2]}]$ sont perpendiculaires et de même longueur`
          prop1=`a deux côtés consécutifs perpendiculaires et de même longueur`
          t2=codeSegments('O','green',A,B,B,C)
          t3=codageAngleDroit(A,B,C)
          objets.push(t2,t3)
          type=`carré`
            break;
            case 'type7': // carré 3
            prop2=`$[${noms[0]+noms[1]}]\\perp[${noms[1]+noms[2]}]$ et $[${noms[0]+noms[2]}]\\perp[${noms[1]+noms[3]}]$`           
          def=`ses côtés $[${noms[0]+noms[1]}]$ et $[${noms[1]+noms[2]}]$ sont perpendiculaires et ses diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ aussi`
          prop1=`a deux côtés consécutifs perpendiculaires et des diagonales perpendiculaires`
          type=`carré`
          t1=codageAngleDroit(A,O,B)
          t2=codageAngleDroit(A,B,C)
          t4=labelPoint(O)  
          objets.push(t1,t2,t4,d1,d2)     
            break;

      }
      texte = `${nom} est un parallélogramme tel que ${def}.<br>`;
      texte+=`Déterminer la nature de ${nom} en justifiant la réponse.`
      texte_corr=`Les segments de même couleur sont parallèles sur le schéma suivant :<br>`
      texte_corr+=mathalea2d({xmin:-5,ymin:-4.5,xmax:5,ymax:4.5,pixelsParCm:20,scale:0.5,mainlevee:true,amplitude:0.7},objets)+'<br>'
      texte_corr+=`On sait que ${prop2}.<br>`
      texte_corr += `Si un parralélogramme ${prop1}, alors c'est un ${type}.<br>`;
      texte_corr +=`${nom} est donc un ${type}.`

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
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

