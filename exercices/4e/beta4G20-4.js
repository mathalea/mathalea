import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,troncature,calcul,tex_nombre,tex_nombrec,tex_prix} from "/modules/outils.js";
/**
 * Description didactique de l'exercice : Calculer_une_expression_litterale_type_pythagore
 * @Auteur Mireille Gain
 * Référence : 4G20-4
*/
export default function Calculer_une_expression_litterale_pythagore() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer la racine carrée de (x² +/- y²)";
  this.consigne = "Dans chaque cas, calculer a² + b² et a² - b²; puis donner la racine carrée de chaque résultat, en valeur exacte puis en valeur arrondie au centième.";
  this.nb_questions = 2;
  this.nb_cols = 3;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 5;
  this.video = "" ;

  this.nouvelle_version = function () {
    this.liste_questions = []; 
    this.liste_corrections = []; 
    let a, b, n,s,d,racs,racd,ciracs,ciracd,miracs, miracd;
    let type_de_questions_disponibles = ['type1','type2'];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
    
      switch (liste_type_de_questions[i]) {        
          
        case 'type1': 
        a = randint(3,12);
        n = randint(5,9);
        b = calcul(n*0.1);
      break

      case 'type2': 
        a = randint(3,12);
        n = randint(1,5);
        b = calcul(1+n*0.1);
      break
      }

s = calcul(a*a+b*b);
d = calcul(a*a-b*b);
racs = Math.sqrt(s);
racd = Math.sqrt(d);
ciracs = troncature(racs-troncature(racs,1),2);
ciracd = troncature(racd-troncature(racd,1),2);
miracs = troncature(racs-troncature(racs,2),3);
miracd = troncature(racd-troncature(racd,2),3);

  texte = `$\\phantom{12}a = ${a} \\phantom{12}et \\phantom{12}b = ${tex_nombre(b)}$`;

  texte_corr = `$\\begin{aligned}a^2 + b^2&
   = ${tex_nombre(a)} \\times ${tex_nombre(a)} + ${tex_nombre(b)} \\times ${tex_nombre(b)} 
   \\\\&= ${a*a} + ${tex_nombrec(b*b)} 
   \\\\&= ${tex_nombre((a*a + b*b))}\\end{aligned}$`;
  texte_corr += `<br>$\\sqrt{${tex_nombrec(a*a+b*b)}}$`;

  if (1000*miracs < 5) {
    texte_corr += `$\\phantom{1}≈\\phantom{1}${tex_prix(troncature(racs, 2))}$`;
  } else {
    texte_corr += `$\\phantom{1}≈\\phantom{1}${tex_prix(troncature(racs+0.01,2))}$`;
  }

  texte_corr += `<br><br>$\\begin{aligned}a^2 - b^2& 
  = ${tex_nombre(a)} \\times ${tex_nombre(a)} - ${tex_nombre(b)} \\times ${tex_nombre(b)} 
  \\\\&= ${tex_nombrec(a*a)} - ${tex_nombrec(b*b)} 
  \\\\&= ${tex_nombrec(a*a - b*b)}\\end{aligned}$`;
  texte_corr += `<br>$\\sqrt{${tex_nombrec(a*a-b*b)}}$`;  

  if (1000*miracd < 5) {
    texte_corr += `$\\phantom{1}≈\\phantom{1}${tex_prix(troncature(racd, 2))}$`;
  } else {
    texte_corr += `$\\phantom{1}≈\\phantom{1}${tex_prix(troncature((racd+0.01), 2))}$`;
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

}
