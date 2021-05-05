import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes} from '../../modules/outils.js'
import Choisir_expression_litterale from './_Choisir_expression_litterale.js';

export const titre = 'Déterminer la dernière opération à effectuer dans une expression numérique'

/**
 * Référence 5L14-6
 * Déterminer la dernière opération à effectuer dans une expression numérique
 * @author Sébastien Lozano
 */
export default function Determiner_derniere_operation_exp_num() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.consigne = "";
	this.nbQuestions = 4;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.sup = true;
	this.sup2 = false; // si false alors utilisation de nombres entiers, si true alors utilisation de nombres à un chiffre après la virgule.
	this.titre = titre

	this.nouvelleVersion = function () {
		let type_de_questions_disponibles
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		type_de_questions_disponibles = [5] //expressions complexes
		let expf, expn, expc, decimal = 1, nbval, nb_operations, resultats, last_op
		let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions)
		if (this.sup2) decimal = 10;
		for (let i = 0, texte, texteCorr, val1, val2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			nb_operations = parseInt(liste_type_de_questions[i])
			val1 = randint(2, 5)
			val2 = randint(6, 9)
			//resultats=Choisir_expression_litteraleBis(nb_operations,decimal,val1,val2)
			resultats = Choisir_expression_litterale(nb_operations, decimal, val1, val2, this.sup)
			expf = resultats[0]
			expn = resultats[1]
			expc = resultats[2]
			nbval = resultats[3]
			last_op = resultats[4];
			let str = expc.split('=');

			switch (liste_type_de_questions[i]) {
				case 5:
					if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
					this.consigne = `Déterminer la dernière opération à effectuer .`
					texte = `$${str[1]}$`
					//texte=`${expn}`
					if (this.debug) {
						texte += `<br><br>=====CORRECTION======<br>`;
						texte += `$`
						for (let l = 1; l < str.length - 1; l++) {
							texte += `${str[l]}=`
						};
						texte += `${str[str.length - 1]}`
						texte += `<br>$\\textbf{La dernière opération dans $${str[1]}$ est donc une ${last_op}.}$`;
						texteCorr = ``;
					} else {
						texteCorr = `$`
						for (let l = 1; l < str.length - 1; l++) {
							texteCorr += `${str[l]}=`
						};
						texteCorr += `${str[str.length - 1]}`
						texteCorr += `<br>$\\textbf{La dernière opération dans $${str[1]}$ est donc une ${last_op}.}$`;
					};

					break;

			}
			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	}
	this.besoin_formulaire2_case_a_cocher = ["Avec décimaux.", false]
	this.besoinFormulaireCaseACocher = ["Avec le signe × devant les parenthèses", true]

}

