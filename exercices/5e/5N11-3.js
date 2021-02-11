import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes, randint, tex_nombre, choice, calcul} from "/modules/outils.js"
/**
 * Une fraction étant donnée, il faut l'écrire avec 100 au dénominateur puis donner son écriture sous forme de pourcentage.
 * @Auteur Rémi Angot
 * Référence 5N11-3
 * 2021-02-06
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Écrire une fraction sur 100 puis sous la forme d'un pourcentage";
  this.consigne = "Compléter";
  this.nb_questions = 6;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_denominateurs = [10,20,50,1000,2,4,5,200]; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_denominateurs,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, den, num, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        den = liste_type_de_questions[i]
        if (den == 2) {
            num = choice([1,3,5])
        } else if (den == 1000){
            num = 10 * randint(1,99)
        } else if (den == 200){
            num = 2 * randint(1,99)
        } else {
            num = randint(1,den-1)
        }
        texte = `$\\dfrac{${num}}{${tex_nombre(den)}}=\\dfrac{\\phantom{XXXXXX}}{}=\\dfrac{}{100}=\\ldots\\ldots\\%$`
        if (den<100){
            texte_corr = `$\\dfrac{${num}}{${tex_nombre(den)}}=\\dfrac{${num}{\\color{blue}\\times${calcul(100/den)}}}{${den}{\\color{blue}\\times${calcul(100/den)}}}=\\dfrac{${calcul(num*100/den)}}{100}=${calcul(num*100/den)}~\\%$`
        } else {
            texte_corr = `$\\dfrac{${num}}{${tex_nombre(den)}}=\\dfrac{${num}{\\color{blue}\\div${calcul(den/100)}}}{${den}{\\color{blue}\\div${calcul(den/100)}}}=\\dfrac{${calcul(num*100/den)}}{100}=${calcul(num*100/den)}~\\%$`
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
}


