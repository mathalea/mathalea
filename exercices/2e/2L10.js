import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,tex_fraction_reduite,tex_fraction} from "/modules/outils.js"

/**
 * Développer avec les 3 identités remarquables
* @auteur Jean-Claude Lhote
* 2L10
*/
export default function Developper_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Développer avec les identités remarquables";
    this.consigne = "Développer les expressions suivantes.";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 5;
    this.sup = 1;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
        [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
        [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]];
        let type_de_questions_disponibles = [];
        if (this.sup == 1) {
            type_de_questions_disponibles = [1, 2, 3]; // coef de x = 1
        }
        else if (this.sup == 2) {
            type_de_questions_disponibles = [4, 5, 6]; // coef de x > 1
        }
        else { type_de_questions_disponibles = [7, 8, 9]; } // coef de x relatif

        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, type_de_questions, fraction = [], ds, ns; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            a = randint(1, 9);
            b = randint(2, 9);
            fraction = choice(liste_fractions);
            ns = fraction[0];
            ds = fraction[1];
            switch (type_de_questions) {
                case 1:
                    texte = `$(x+${a})^2$`; // (x+a)²
                    texte_corr = `$(x+${a})^2=x^2+2 \\times ${a} \\times x+${a}^2=x^2+${2 * a}x+${a * a}$`;
                    break;
                case 2:
                    texte = `$(x-${a})^2$`; // (x-a)²
                    texte_corr = `$(x-${a})^2=x^2-2 \\times ${a} \\times x+${a}^2=x^2-${2 * a}x+${a * a}$`;
                    break;
                case 3:
                    texte = `$(x-${a})(x+${a})$`; // (x-a)(x+a)
                    texte_corr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a * a}$`;
                    break;
                case 4:
                    texte = `$(${b}x+${a})^2$`; //(bx+a)²  b>1
                    texte_corr = `$(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2+${2 * b * a}x+${a * a}$`;
                    break;
                case 5:
                    texte = `$(${b}x-${a})^2$`; //(bx-a)² b>1
                    texte_corr = `$(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2-${2 * b * a}x+${a * a}$`;
                    break;
                case 6:
                    texte = `$(${b}x-${a})(${b}x+${a})$`; //(bx-a)(bx+a) b>1
                    texte_corr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b * b}x^2-${a * a}$`;
                    break;
                case 7:
                    texte = `$\\left(${tex_fraction(ns, ds)}x+${a}\\right)^2$`; // (kx+a)² k rationnel 
                    texte_corr = `$\\left(${tex_fraction(ns, ds)}x+${a}\\right)^2=\\left(${tex_fraction(ns, ds)}x\\right)^2+2 \\times ${tex_fraction(ns, ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns, ds)}x+${a}\\right)^2=${tex_fraction(ns * ns, ds * ds)}x^2+${tex_fraction_reduite(ns * 2 * a, ds)}x+${a * a}$`;
                    break;
                case 8:
                    texte = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)^2$`; // (kx-a)² k rationnel 
                    texte_corr = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)^2=\\left(${tex_fraction(ns, ds)}x\\right)^2-2 \\times ${tex_fraction(ns, ds)}x \\times ${a} + ${a}^2=${tex_fraction(ns * ns, ds * ds)}x^2-${tex_fraction_reduite(ns * 2 * a, ds)}x+${a * a}$`;
                    break;
                case 9:
                    //  (bx-a)(bx+a) avec a entier et b rationnel simple
                    texte = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)$`; // b>1
                    texte_corr = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)=\\left(${tex_fraction(ns, ds)}x\\right)^2-${a}^2=${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}$`;
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
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x relatif'];
}
