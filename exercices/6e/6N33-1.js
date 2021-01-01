import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,calcul,tex_nombrec,tex_nombre,tex_fraction} from "/modules/outils.js"
/**
 * Calculer 10, 20, 30, 40 ou 50% d'un nombre
 * @Auteur Rémi Angot + Jean-claude Lhote
 * 6N33-1
 */
export default function Pourcentage_d_un_nombre() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer le pourcentage d'un nombre de tête";
  this.nb_questions = 5;
  this.consigne = "Calculer";
  this.spacing = 2;
  this.spacing_corr = 2.5;
  this.nb_cols = 2;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    liste_pourcentages = [10, 20, 30, 40, 50];

    for (
      let i = 0, p, n, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      p = choice(liste_pourcentages);
      n = choice([
        randint(2, 9),
        randint(2, 9) * 10,
        randint(1, 9) * 10 + randint(1, 2),
      ]);
      texte = `$${p}~\\%~\\text{de }${n}$`;
      if (p == 50) {
        texte_corr = `$${p}~\\%~\\text{de }${n}=${n}\\div${2}=${tex_nombre(
          Algebrite.eval(n / 2)
        )}$`; // calcul de n/2 si p = 50%
      } else {
        texte_corr = `$${p}~\\%~\\text{de }${n}=${tex_fraction(
          p,
          100
        )}\\times${n}=(${p}\\times${n})\\div100=${tex_nombre(
          p * n
        )}\\div100=${tex_nombre(Algebrite.eval((p * n) / 100))}$`;
        //		texte_corr += `$\\phantom {Blanc}${p}~\\%~\\text{de }${n}=${tex_fraction(p,100)}\\times${n}=\\dfrac{${p}\\times${n}}{100}=${tex_fraction(p*n,100)}=${tex_nombre(Algebrite.eval(p*n/100))}$`
        if (this.sup2)
          texte_corr += `<br>$${p}~\\%~\\text{de }${n}=${tex_fraction(
            p,
            100
          )}\\times${n}=(${n}\\div100)\\times${p}=${tex_nombrec(
            calcul(n / 100)
          )}\\times${p}=${tex_nombre(Algebrite.eval((p * n) / 100))}$`;
        //		texte_corr += `$\\phantom {Blanc}${p}~\\%~\\text{de }${n}=${tex_fraction(p,100)}\\times${n}=${tex_fraction(n,100)}\\times${p}=${tex_nombrec(calcul(n/100))}\\times${p}=${tex_nombre(Algebrite.eval(p*n/100))}$<br>`
        if (this.sup2)
          texte_corr += `<br>$${p}~\\%~\\text{de }${n}=${tex_fraction(
            p,
            100
          )}\\times${n}=${tex_nombrec(calcul(p / 100))}\\times${n}=${tex_nombre(
            Algebrite.eval((p * n) / 100)
          )}$`;
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
  //	this.besoin_formulaire_numerique = ['Valeur maximale',99999];
  this.besoin_formulaire2_case_a_cocher = ["Plusieurs méthodes"];
}
