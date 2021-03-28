import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu_sans_numero, lettre_depuis_chiffre } from "/modules/outils.js"
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Exercice exemple";
    this.consigne = "";
    this.nb_questions = 10;
    this.nb_cols = 2; // Uniquement pour la sortie LaTeX
    this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
    this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
    this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
    this.video = "" // Id YouTube ou url

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées

        for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            // Boucle principale où i+1 correspond au numéro de la question

            texte = `$${lettre_depuis_chiffre(i + 1)} = ${i + 1}$`
            texte_corr = `$${lettre_depuis_chiffre(i + 1)} = ${i + 1}$`

            if (this.liste_questions.indexOf(texte) == -1) {
                // Si la question n'a jamais été posée, on en crée une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu_sans_numero(this);
    };
    // this.besoin_formulaire_numerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];

}

// python3 modules/exercices_to_json.py pour faire apparaitre l'exercice dans le menu

