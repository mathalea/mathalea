function Extraire_un_carre_parfait_d_une_racine_carree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Extraire un carré parfait d'une racine carrée";
    this.consigne = " Ecrire le nombre proposé sous la forme $a\\sqrt{b}$ où $a$ est un entier et $b$ le plus petit entier possible:";
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 2; //

    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées

        for (let i = 0, a, b, c, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            let a = randint(2, 11)
            b = a * a
            c = randint(2, 7, [4])
            d = c * b
            if (this.sup == 1)
                texte = `Ecrire $\\sqrt{${d}}$ sous la forme $a\\sqrt{${c}}$ où $a$ est un entier:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
				On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
				$\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
            if (this.sup == 2)
                texte = `Ecrire $\\sqrt{${d}}$ sous la forme $a\\sqrt{b}$ où $a$ est un entier et $b$ le plus petit entier possible:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
				On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
				$\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    }
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : En donnat la racine carrée unité\n2 : Sans indication"];
}
function Simplifier_une_somme_de_racines_carrees() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Simplifier une somme de racine carrée";
    this.consigne = " Simplifier une somme de racine carrée"
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; //
    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées

        for (let i = 0, a1, a2, a3, b1, b2, b3, c, d1, d2, d3, f1, f2, f3, f, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

            let e1 = randint(2, 8) * choice([-1, 1]);
            let e2 = randint(2, 8) * choice([-1, 1]);
            let e3 = randint(2, 8) * choice([-1, 1]);
            let a1 = randint(2, 11)
            let a2 = randint(2, 11, [a1])
            let a3 = randint(2, 11, [a1, a2])
            let b1 = a1 * a1
            let b2 = a2 * a2
            let b3 = a3 * a3
            let c = randint(2, 11, [4, 8, 9])
            let d1 = c * b1
            let d2 = c * b2
            let d3 = c * b3
            let f1 = e1 * a1
            let f2 = e2 * a2
            let f3 = e3 * a3
            let f = f1 + f2 + f3

            texte = `Ecrire $A=${e1}\\sqrt{${d1}} ${ecriture_algebrique(e2)}\\sqrt{${d2}} ${ecriture_algebrique(e3)}\\sqrt{${d3}}$ sous la forme $a\\sqrt{${c}}$ où $a$ est un entier:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d1}, ${d2} et ${d3}. <br>
                On trouve $${d1}=${b1} \\times ${c}~~$, $~~${d2}=${b2} \\times ${c}~~$	et $${d3}=${b3} \\times ${c}$<br>
                On a donc  : $\\sqrt{${d1}}=\\sqrt{${a1}^{2} \\times ${c} }=${a1}\\times \\sqrt{${c}}$,
                $~~\\sqrt{${d2}}=\\sqrt{${a2}^{2} \\times ${c} }=${a2}\\times \\sqrt{${c}}~$ et
                $~\\sqrt{${d3}}=\\sqrt{${a3}^{2} \\times ${c} }=${a3}\\times \\sqrt{${c}}$<br>
                On en déduit que : $A=${e1}\\times${a1}\\times \\sqrt{${c}} ${ecriture_algebrique(e2)}\\times ${a2}\\times \\sqrt{${c}}${ecriture_algebrique(e3)}\\times ${a3}\\times \\sqrt{${c}}$<br>
                $A=${f1}\\times \\sqrt{${c}} ${ecriture_algebrique(f2)}\\times \\sqrt{${c}}${ecriture_algebrique(f3)}\\times \\sqrt{${c}}$		<br>
                $A=	(${f1}${ecriture_algebrique(f2)}${ecriture_algebrique(f3)})\\times \\sqrt{${c}} = ${f}\\sqrt{${c}}$`

            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    }
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : En donnat la racine carrée unité\n2 : Sans indication"];
}
function Existence_d_une_racine_caree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Existence d'une racine carrée";
    this.consigne = " Dire si le nombre proposé existe ou non, en justifiant."
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; //
    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7];
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, a, b, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:
                    let a = randint(2, 9);
                    texte = `$\\sqrt{\\sqrt{${a}}}$`;
                    texte_corr = `$\\sqrt{${a}}$ existe car ${a} est un nombre positif, donc $\\sqrt{\\sqrt{${a}}$ existe aussi.`;
                    break;
                case 2:
                    let b = randint(2, 9) * (-1);
                    texte = `$\\sqrt{${b}}$`;
                    texte_corr = `$\\sqrt{${b}}$ n'existe pas car ${b} est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. `;
                    break;
                case 3:
                    let c = randint(2, 9) * (-1);
                    let d = c * c;
                    texte = `$\\sqrt{\\left(${c}\\right)^{2}}$`;
                    texte_corr = `$\\sqrt{\\left(${c}\\right)^{2}}$ existe pas car $\\left(${c}\\right)^{2}=${d}$ est un nombre positif.`;
                    break;
                case 4:
                    let e = randint(2, 9);
                    texte = `$-\\sqrt{${e}}$`;
                    texte_corr = `$-\\sqrt{${e}}$ existe car ${e} est un nombre positif. Le signe - est placé devant le symbole radical, le nombre $-\\sqrt{${e}}$ est donc négatif. `;
                    break;
                case 5:
                    let f = randint(2, 9) * (-1);
                    let g = f * f;
                    texte = `$\\sqrt{-\\left(${f}\\right)^{2}}$`;
                    texte_corr = `$\\sqrt{-\\left(${f}\\right)^{2}}$ n'existe car $-\\left(${f}\\right)^{2}=-${g}$  est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. . `;
                    break;
                case 6:
                    let h = randint(2, 3);
                    texte = `$\\sqrt{${h}-\\pi}$`;
                    texte_corr = `$\\sqrt{${h}-\\pi}$ n'existe pas car $\\pi>3$ donc $${h}-\\pi$  est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. . `;
                    break;
                case 7:
                    let i = randint(4, 5);
                    texte = `$\\sqrt{${i}-\\pi}$`;
                    texte_corr = `$\\sqrt{${i}-\\pi}$ existe car $\\pi\\approx 3,14$ donc $${i}-\\pi$  est un nombre positif.`;
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
    }

}
function Extraire_un_carre_parfait_d_une_racine_carree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Extraire un carré parfait d'une racine carrée";
    this.consigne = " Ecrire le nombre proposé sous la forme $a\\sqrt{b}$ où $a$ est un entier et $b$ le plus petit entier possible:";
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 2; //

    this.nouvelle_version = function (numero_de_l_exercice) {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées

        for (let i = 0, a, b, c, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            a = randint(2, 11)
            b = a * a
            c = randint(2, 7, [4])
            d = c * b
            if (this.sup == 1)
                texte = `Ecrire $\\sqrt{ ${ d } } $ sous la forme $a\\sqrt{ ${ c } } $ où $a$ est un entier:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
                            On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
                            $\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
            if (this.sup == 2)
                texte = `Ecrire $\\sqrt{ ${ d } } $ sous la forme $a\\sqrt{ b } $ où $a$ est un entier et $b$ le plus petit entier possible:`
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d}, c'est ${b}.
                            On a donc la décomposition : $${d}=${c} \\times ${b}=${c} \\times ${a}^{2}$ qui permet d'écrire que
                            $\\sqrt{${d}}=\\sqrt{${a}^{2} \\times ${c} }=${a}\\times \\sqrt{${c}}$`
            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    }
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : En donnat la racine carrée unité\n2 : Sans indication"];
}
