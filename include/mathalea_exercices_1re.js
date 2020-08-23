function Terme_d_une_suite_definie_explicitement(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer les termes d'une suite définie de façon explicite";
	this.consigne = "Une suite étant donnée, calculer le terme demandé.";
	this.nb_questions = 4;

	this.nouvelle_version = function(){
		this.liste_questions = []; // Vide la liste de questions
    this.liste_corrections = []; // Vide la liste de questions corrigées
  
    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b, k;
      i < this.nb_questions && cpt < 50;

      ) {
      // on déclare les variables utilisées dans la boucle
			// i correspond au numéro de la question -1
			// cpt est un compteur de fois où on génère une question déjà posées
			// pour éviter une boucle infinie, on limite à 50 le nombre d'essais pour générer une question jamais posée
      
      a = randint(1, 7);
      b = randint(1, 10);
      k = randint(0, 20)
			
			texte = "Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = ${a}n+${b}$."
      texte += "Calculer $u_${k}$."
			// énoncé 
			// Rappel ${a} permet de récupérer la valeur de a dans un littéral de gabarit définit entre accents graves
      
      "Dans l'expression de $u_n$, on remplasse $n$ par ${k}, on obtient : $u_${k} = ${a*k+b}$"
			// la correction de la question
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte); // Sinon on enregistre la question dans liste_questions
				this.liste_corrections.push(texte_corr); // On fait pareil pour la correction
				i++; // On passe à la question suivante
			}
			cpt++;	// Sinon on incrémente le compteur d'essai pour avoir une question nouvelle
		}
		liste_de_question_to_contenu(this); // La liste de question et la liste de la correction
		// sont transformés en chaine de caractère (avec une liste HTML ou LaTeX suivant le contexte)
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
	// On aurait pu ajouter un formulaire pour régler le niveau de difficulté à l'aide de l'attribut this.sup
}
