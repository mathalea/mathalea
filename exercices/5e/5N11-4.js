import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes, randint, calcul, tex_nombre, tex_prix, arrondi} from "/modules/outils.js"
/**
 * Déterminer une valeur approchée d'un pourcentage à l'aide de la calculatrice
 * @Auteur Rémi Angot
 * Référence 5N11-4
 * 2021-02-06
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Exprimer une fractions sous la forme d'une valeur approchée d'un pourcentage";
  this.consigne = "À l'aide de la calculatrice, donner une valeur approchée au centième près du quotient puis l'écrire sous la forme d'un pourcentage à l'unité près.";
  this.nb_questions = 6;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let denominateur_disponibles = [100,200,300,1000]; 
    let liste_type_de_questions = combinaison_listes(denominateur_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    if (this.sup == 2) {
        this.consigne = "À l'aide de la calculatrice, donner une valeur approchée au millième près du quotient puis l'écrire sous la forme d'un pourcentage au dixième près.";
    }
    for (let i = 0, texte, texte_corr, num, den, cpt = 0; i < this.nb_questions && cpt < 50;) {
        den = randint(10,liste_type_de_questions[i])
        num = randint(1,den-8)
        while (calcul(num/den)==arrondi(num/den,4)) {
            den = randint(10,liste_type_de_questions[i])
            num = randint(1,den-8)
        }
        texte = `$\\dfrac{${num}}{${den}}\\approx \\ldots\\ldots\\ldots $ soit environ $\\ldots\\ldots\\ldots~\\%$`
        if (this.sup == 1) {
            texte_corr = `$\\dfrac{${num}}{${den}}\\approx ${tex_prix(calcul(num/den,2))} $ soit environ $${calcul(calcul(num/den,2)*100)}~\\%$ $\\left(\\text{car } ${tex_prix(calcul(num/den,2))}=\\dfrac{${calcul(calcul(num/den,2)*100)}}{100}\\right)$.`
        }
        if (this.sup == 2) {
            texte_corr = `$\\dfrac{${num}}{${den}}\\approx ${tex_nombre(calcul(num/den,3))} $ soit environ $${tex_nombre(calcul(num/den*100,1))}~\\%$ $\\left(\\text{car } ${tex_nombre(calcul(num/den,3))}=\\dfrac{${tex_nombre(calcul(num/den*100,1))}}{100}\\right)$.`
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
  this.besoin_formulaire_numerique = ['Niveau de précision',2,"1 : Donner un pourcentage à l'unité près\n2 : Donner un pourcentage au dixième près"];
}


