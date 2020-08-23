function Terme_d_une_suite_definie_explicitement(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer les termes d'une suite définie de façon explicite";
	this.consigne = "Une suite étant donnée, calculer le terme demandé.";
	this.nb_questions = 4;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Vide la liste de questions
		this.liste_corrections = []; // Vide la liste de questions corrigées

        this.sup == 1
        ? (type_de_questions_disponibles = [1, 2, 2, 3])
        : (type_de_questions_disponibles = [4, 4, 5, 6]);
        let liste_type_de_questions = combinaison_listes(
            type_de_questions_disponibles,
            this.nb_questions
        ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
  
        for (
            let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, k;
            i < this.nb_questions && cpt < 50;
  
        ) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
            case 1: // fonction affine
                a = randint(1, 7);
                b = randint(1, 10);
                k = randint(0, 20)

                texte = "Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = ${a}n+${b}$."
                texte += "Calculer $u_${k}$."

                texte_corr = "Dans l'expression de $u_n$, on remplasse $n$ par ${k}, on obtient : $u_${k} = ${a*k+b}$"

                break;
            case 2: // polynôme de degré 2
                q = randint(5, 9) * 100 + randint(2, 5) * 10 + randint(5, 9);
                b = randint(6, 9);
                break;
            case 3: // polynôme de degré 3
                if (randint(1, 2) == 1) {
                    q = randint(2, 9) * 1000 + randint(2, 9) * 100 + randint(2, 9);
                } else {
                    q = randint(2, 9) * 1000 + randint(2, 9) * 10 + randint(2, 9);
                }
                b = randint(7, 9);
                break;
            case 4: // fonction homographique
                q = randint(1, 5) * 100 + randint(1, 5) * 10 + randint(1, 5);
                b = choice([11, 12, 15, 25]);
                break;
            }
            r = randint(0, b - 1); //reste inférieur au diviseur
            a = b * q + r;
            texte = `$${tex_nombre(a)}\\div${b}$`;
            if (r == 0) {
              sortie_html
                ? (texte_corr = `$${tex_nombre(a)}\\div${b}=${q}$`)
                : (texte_corr = `$\\opidiv[voperation=top]{${a}}{${b}}$\\\\\\\\$${tex_nombre(
                    a
                  )}\\div${b}=${q}$`);
            } else {
              sortie_html
                ? (texte_corr = `$${tex_nombre(a)}=${b}\\times${q}+${r}$`)
                : (texte_corr = `$\\opidiv[voperation=top]{${a}}{${b}}$\\\\\\\\$${tex_nombre(
                    a
                  )}=${b}\\times${q}+${r}$`);
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
        this.besoin_formulaire_numerique = [
          "Niveau de difficulté",
          2,
          "1 : Quotient inférieur à 10\n2: Quotient à 2 chiffres",
        ];
      }
        
}