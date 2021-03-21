import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,calcul,tex_nombrec,tex_nombre,tex_fraction} from "/modules/outils.js"
/**
 * Calculer 10, 20, 30, 40 ou 50% d'un nombre
 * @Auteur Rémi Angot + Jean-claude Lhote
 * 6N33-1
 * Ajout niveau 2 + 1 correction différente cgrolleau 03/2021
 */
export default function Pourcentage_d_un_nombre() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculer le pourcentage d'un nombre de tête";
  this.nb_questions = 5;
  this.consigne = "Calculer";
  this.spacing = 2;
  this.spacing_corr = 3.5;
  this.nb_cols = 2;
  this.nb_cols_corr = 1;
  this.sup = 1;
  this.nouvelle_version = function () {
    var liste_pourcentages = [];
	this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    for (
      let i = 0, p, n, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;
    ) {
		switch (parseInt(this.sup)) { //niveu de difficulté.
			case 1: 
				liste_pourcentages = [10, 20, 30, 40, 50];
				n = choice([randint(2, 9), randint(2, 9) * 10, randint(1, 9) * 10 + randint(1, 2)]);
				break;
			case 2: //niveau 2 : ajout de 25%, 60% et 90% + possibilité d'avoir n'importe quel multiple de 4 entre 4 et 200
				liste_pourcentages = [10, 20, 25, 30, 40, 50, 60, 90];
				n = choice([randint(2, 9), randint(2, 9) * 10, randint(1, 9) * 10 + randint(1, 2), randint(1, 50)*4 ]); 
				break;
		}
		p = choice(liste_pourcentages);
		texte = `$${p}~\\%~\\text{de }${n}$`;
		switch (p) {
			case 50 :
				texte_corr = `$${p}~\\%~\\text{de }${n}=${n}\\div${2} = 
					${tex_nombre(Algebrite.eval(n / 2))}$`; // calcul de n/2 si p = 50%
			break;
			case 25 :
				texte_corr = `$${p}~\\%~\\text{de }${n}=${n}\\div${4} = 
					${tex_nombre(Algebrite.eval(n / 4))}$`; // calcul de n/4 si p = 25%
			break;
			default :
				texte_corr = `$${p}~\\%~\\text{de }${n}=${tex_fraction(
					p,
					100
					)}\\times${n}=(${p}\\times${n})\\div100=${tex_nombre(
					p * n
				)}\\div100=${tex_nombre(Algebrite.eval((p * n) / 100))}$`;
				if (this.sup2) {
					texte_corr += `<br>$${p}~\\%~\\text{de }${n}=${tex_fraction(
					p,
					100
					)}\\times${n}=(${n}\\div100)\\times${p}=${tex_nombrec(
					calcul(n / 100)
					)}\\times${p}=${tex_nombre(Algebrite.eval((p * n) / 100))}$`;
					texte_corr += `<br>$${p}~\\%~\\text{de }${n}=${tex_fraction(
						p,
						100
						)}\\times${n}=${tex_nombrec(calcul(p / 100))}\\times${n}=${tex_nombre(
						Algebrite.eval((p * n) / 100)
						)}$`;
					if (p === 60) {
						texte_corr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $50~\\%~\\text{de }${n}$
						plus $10 ~\\%~\\text{de }${n} $ soit la moitié de $ ${n} \\text{ plus } 10 ~\\%~\\text{de }${n} $ :
						$${p}~\\%~\\text{de }${n}=${n}\\div${2} + ${n}\\div${10} =  ${tex_nombre(calcul(n * 0.6))}$`;
					} else if (p === 90) {
						texte_corr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $${n}$
						moins $10 ~\\%~\\text{de }${n} $ :
						$${p}~\\%~\\text{de }${n}=${n} - ${n}\\div${10} =  ${tex_nombre(calcul(n * 0.9))}$`;
					} else if (p > 10) {
						texte_corr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $ ${calcul(p/10)} $ fois $ 10 ~\\%~\\text{de }${n} $ :
						$${p}~\\%~\\text{de }${n}= ${calcul(p/10)} \\times ${n}\\div${10} =  ${tex_nombre(calcul((p * n) / 100))}$`;
					}
				}
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
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    2,
    "1 : pourcentages 10, 20, 30, 40, 50 \n 2: pourcentages 10, 20, 25, 30, 40, 50, 60, 90",
  ];
  this.besoin_formulaire2_case_a_cocher = ["Plusieurs méthodes"];
}
