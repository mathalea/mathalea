import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes} from "/modules/outils.js"



/**
 * 2N22
 * @Auteur Stéphane Guyon
 */
export default function valeur_absolue() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Utiliser la notion de valeur absolue d'une quantité";
    this.consigne = "Déterminer la valeur du nombre proposé :";
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, a, b, c, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    a = randint(1, 150) * choice([-1, 1]);


                    texte = `$\\vert ${a}\\vert = \\dots$`;
                    if (a > 0) { texte_corr = `$\\vert ${a}\\vert = ${a}$`; }
                    else { texte_corr = `$\\vert ${a}\\vert = ${-a}$`; }



                    break;
                case 2:

                    a = randint(1, 5);


                    texte = `$\\vert \\pi - ${a}\\vert = \\dots$`;
                    if (a > 3) { texte_corr = `On a : $\\pi - ${a}<0 $ donc $\\vert \\pi - ${a}\\vert = ${a}-\\pi$`; }
                    else { texte_corr = `On a : $\\pi - ${a}>0 $ donc $\\vert \\pi - ${a}\\vert = \\pi - ${a}$`; }



                    break;
                case 3:

                    a = randint(2, 5);
                    b = randint(2, 7, 4);
                    c = Math.sqrt(b);

                    texte = `$\\vert \\sqrt{${b}} - ${a}\\vert = \\dots $`;

                    if (c > a) {
                        texte_corr = `On a : $${b} > ${a * a}$ donc $\\sqrt{${b}} > ${a}$ <br>
                        $\\sqrt{${b}}- ${a}$ est donc un nombre positif, il en resulte que  $\\vert \\sqrt{${b}} - ${a}\\vert = \\sqrt{${b}} - ${a}$`;
                    }
                    else {
                        texte_corr = `On a : $${b}< ${a * a}$ donc $\\sqrt{${b}} < ${a}$ <br>
                        $\\sqrt{${b}}- ${a}$ est donc un nombre négatif, il en resulte que  $\\vert \\sqrt{${b}} -${a}\\vert = ${a}-\\sqrt{${b}}  $`;
                    }



                    break;

            }
            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    };

}
