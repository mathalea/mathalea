import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,range1,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,mise_en_evidence,liste_des_diviseurs} from "/modules/outils.js"
/**
 * Plusieurs type de calcul avec priorités opératoires/ relatifs/ puissances
 *
 * Sans parenthèses :
 * * a²+b*c
 * * a+b²*c 
 * * a²+b+c*d
 * 
 * * a²*b+c
 * * a*b²+c
 * * a²+b+c
 * * a+b²+c
 * * a+b+c²
 * * a+b²+c*d
 * * a+b+c²*d
 * * a+b+c*d²
 * * a²*b+c*d
 * * a*b+c*d²
 *
 * Avec parenthèses :
 * * a²*(b+c)
 * * a*(b²+c*d)
 * * (a+b+c²)*d
 * * d²(a+b+c)
 * 
 * * a*(b²+c)
 * * a*(b+c²)
 * * (a²+b)*c
 * * (a+b²)*c
 * * (a+b)*c²
 * * a²*(b+c)*d
 * * a*(b²+c)*d
 * * a*(b+c²)*d
 * * a*(b+c)*d²
 * * a²*b*(c+d)
 * * a*b²*(c+d)
 * * a*b*(c²+d)
 * * a*b*(c+d²)
 * * a²*(b+c*d)
 * * a*(b+c²*d)
 * * a*(b+c*d²)
 * * a²+(b+c)
 * * a+(b²+c)
 * * a+(b+c²)
 * * (a²+b+c)*d
 * * (a+b²+c)*d
 * @Auteur Mireille Gain
 * Référence 4C34
 * Date 2021-01-23
 */
export default function Priorites_et_relatifs_et_puissances() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculs utilisant les priorités opératoires et les puissances";
  this.consigne = "Calculer :";
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 1;
  this.tailleDiaporama = 100;
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
  
    let liste_questions_disponibles
      liste_questions_disponibles = range1(7);
  
    let liste_type_de_questions = combinaison_listes(
      liste_questions_disponibles,
      this.nb_questions
    );
    for (
      let i = 0, texte, texte_corr, a, b, c, d,m, n, p, cpt = 0;
      i < this.nb_questions && cpt < 50;)      
    {
      a = randint(1, 7) * choice([-1, 1]);
      b = randint(1, 7) * choice([-1, 1]);
      c = randint(1, 7) * choice([-1, 1]);
      d = randint(1, 7) * choice([-1, 1]); 
      m = randint(1, 5) * choice([-1, 1]);  
      n = randint(1, 3) * (-1);  
      p = randint(1, 3) ;   
      switch (liste_type_de_questions[i]) {
        case 1: //a²+b*c
        texte = `$${ecriture_parenthese_si_negatif(a)+ "^2" + ecriture_algebrique(b) + "\\times" + ecriture_parenthese_si_negatif(c)}$`;
        texte_corr = `$${mise_en_evidence(ecriture_parenthese_si_negatif(a) + "^2") + ecriture_algebrique(b) + "\\times" + ecriture_parenthese_si_negatif(c)}
           =${a*a}${mise_en_evidence(ecriture_algebrique(b) + "\\times" + ecriture_parenthese_si_negatif(c))}
           =${a*a + ecriture_algebrique(b*c)}
          =${a*a + b * c}$`;
          break;
        
        case 2: //a+b²*c   
          texte = `$${a + ecriture_algebrique(p) + "^2" + "\\times" + ecriture_parenthese_si_negatif(c)}$`;
            texte_corr = `$${a+ mise_en_evidence(ecriture_algebrique(p) + "^2") + "\\times" + ecriture_parenthese_si_negatif(c)}
            =${a + ecriture_algebrique(p*p) + mise_en_evidence( "\\times" + ecriture_parenthese_si_negatif(c))}
            =${a + ecriture_algebrique(p*p*c)}
            =${a + p*p*c}$`;
            break;     

        case 3: //a²+b+c*d 
        texte = `$${ecriture_parenthese_si_negatif(a) + "^2" + ecriture_algebrique(b) + ecriture_algebrique(c) + "\\times" + ecriture_parenthese_si_negatif(d)}$`;
        texte_corr = `$${mise_en_evidence(ecriture_parenthese_si_negatif(a) + "^2") + ecriture_algebrique(b) + ecriture_algebrique(c) + "\\times" + ecriture_parenthese_si_negatif(d)}
           =${a*a + ecriture_algebrique(b) + mise_en_evidence(ecriture_algebrique(c) + "\\times" + ecriture_parenthese_si_negatif(d))}
           =${a*a + ecriture_algebrique(b)+ecriture_algebrique(c*d)}
          =${a*a + b + c * d}$`;
          break;              

        case 4: //a²*(b+c)
          texte = `$${ecriture_parenthese_si_negatif(n)}^2 \\times ( ${b + ecriture_algebrique(c)})$`;
          texte_corr = `$${mise_en_evidence(ecriture_parenthese_si_negatif(n) + "^2") + "\\times" + "(" + b+ ecriture_algebrique(c)+ ")"} 
             =${n*n + "\\times" + "(" + mise_en_evidence(b + ecriture_algebrique(c))+ ")"} 
             =${n*n + mise_en_evidence("\\times") + ecriture_parenthese_si_negatif(b+c)}
            =${n*n*(b+c)}$`;
            break;      

        case 5: //m*(n²+p*n)
            texte = `$${m} \\times ( ${ecriture_parenthese_si_negatif(n)}^2${ecriture_algebrique(p)}\\times${ecriture_parenthese_si_negatif(n)})$`;
            texte_corr = `$${m} \\times ( ${mise_en_evidence(ecriture_parenthese_si_negatif(n) + "^2")} ${ecriture_algebrique(p) + "\\times" + ecriture_parenthese_si_negatif(n)}
               =${m} \\times ( ${n*n} ${mise_en_evidence(ecriture_algebrique(p) + "\\times" + ecriture_parenthese_si_negatif(n))})
               =${m}\\times ( ${mise_en_evidence(n*n + ecriture_algebrique(p*n))})
               =${m}\\times ( ${n*n + p*n})
              =${m*(n*n+p*n)}$`;
              break;    

        case 6: //(a+b+c²)*d 
              texte = `$(${a + ecriture_algebrique(b) + "+"} ${ecriture_parenthese_si_negatif(c)}^2 ) \\times ${ecriture_parenthese_si_negatif(d)}$`;
              texte_corr = `$(${a + ecriture_algebrique(b) + "+"} ${mise_en_evidence(ecriture_parenthese_si_negatif(c) + "^2")} ) \\times ${ecriture_parenthese_si_negatif(d)}
                 =(${mise_en_evidence(a + ecriture_algebrique(b) + ecriture_algebrique(c*c))}) \\times ${ecriture_parenthese_si_negatif(d)}
                 =${a + b + c*c} \\times ${ecriture_parenthese_si_negatif(d)}
                =${(a+b+c*c)*d}$`;
                break;   

        case 7: //n²*(a+b+c)
                texte = `$${ecriture_parenthese_si_negatif(n)}^2 \\times ( ${a+ecriture_algebrique(b)+ecriture_algebrique(c)})$`;
                texte_corr = `$${mise_en_evidence(ecriture_parenthese_si_negatif(n) + "^2")} \\times ( ${a+ecriture_algebrique(b)+ecriture_algebrique(c)})
                   =${n*n} \\times ( ${mise_en_evidence(a+ecriture_algebrique(b)+ecriture_algebrique(c))})
                   =${n*n} \\times ${ecriture_parenthese_si_negatif(a+b+c)}
                  =${n*n*(a+b+c)}$`;
                  break;   

      }     
       if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
}
// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu