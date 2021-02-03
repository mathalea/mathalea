import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, choice, combinaison_listes, tex_nombre } from "/modules/outils.js"
import Operation from '/modules/operations.js';
/**
 * Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.
 *
 * Niveau de difficulté 1 :
 * * division par 2, 3 , 4 ou 5
 * * division par 6 à 9
 * * un 0 dans le quotient
 *
 * Niveau de difficulté 2 :
 * * division par 11, 12, 15, 25
 * * division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
 * * division par un multiple de 10 et un 0 dans le quotient
 * @Auteur Rémi Angot
 * Référence 6C11
 */
export default function Operations_posees() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Opérations posées";
    this.consigne = "";
    this.spacing = 2;
    sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1); //Important sinon opidiv n'est pas joli
    this.nb_questions = 1;
    this.nb_questions_modifiable = false
    this.sup = 1;
    this.sup2 = "1234.5-789.2"
    this.sup3 = 0;
    this.liste_packages = "xlop";

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let nombres=[1234.5,789.2]
        let operandes = String(this.sup2).split("-")
        nombres[0]=parseFloat(operandes[0]);
        nombres[1]=parseFloat(operandes[1])

        let a = nombres[0]
        let b = nombres[1]
        switch (parseInt(this.sup)) {
            case 1: // addition
                this.contenu = Operation({ operande1: a, operande2: b, type: 'addition' })
                break;
            case 2: // soustraction
                this.contenu = Operation({ operande1: a, operande2: b, type: 'soustraction' })
                break;
            case 3: // multiplication
                this.contenu = Operation({ operande1: a, operande2: b, type: 'multiplication' })
                break;
            case 4: // division euclidienne
                this.contenu = Operation({ operande1: a, operande2: b, type: 'divisionE', precision: 0 })
                break;
            case 5: // division
                this.contenu = Operation({ operande1: a, operande2: b, type: 'division', precision: parseInt(this.sup3) })
                break;
        }
    };
    this.besoin_formulaire_numerique = ["Opération", 5, "1 : Addition\n2 : Soustraction\n3 : Multiplication\n4 : Division euclidienne\n5 : Division décimale"];
    this.besoin_formulaire2_texte = ["Deux nombres séparés par un tiret(séparateur décimal = le point)"]
    this.besoin_formulaire3_numerique = ["Nombre de chiffres après la virgule pour le quotient"]
}

