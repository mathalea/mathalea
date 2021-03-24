import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,calcul} from "/modules/outils.js"
/**
 * Priorités opératoires, placer les parenthèses.
 * @Auteur Cédric Grolleau
 * Référence 6C33-1
 */
export default function Priorites() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Parenthèses manquantes";
  this.consigne = "Si besoin, ajoute des parenthèses pour rendre l'égalité correcte. <br\> S'il y a plusieurs fois la même égalité trouve des solutions différentes.";
  this.nb_questions = 2;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.spacing = 3;
  this.spacing_corr = 3;
  
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    var liste_questions_disponibles = [], liste_type_de_questions, texte, texte_corr, a, b, c, d, i, e,
		m, n, f, l, g, k, p, prevchoice, choice, cpt = 0; //
	texte = "";
	texte_corr = "";
    for (i = 0 ; i < this.nb_questions && cpt < 50; ) {
		e = randint(1,3);
		m = randint(1,3);
		n = randint(1,6);
		f = randint(1,4);
		l = randint(1,4);
		g = randint(2,3);
		k = calcul(f*e);
		c = calcul(m*e);
		a = calcul(n*c);
		b = calcul(k*c);
		d = calcul(c*e*l);
		prevchoice = [];
		texte = "";
		texte_corr ="";
		for (p =0; p<3 ; p++) {
			choice = randint(0,6,prevchoice);
			prevchoice.push(choice);
			switch (choice) {
				case 0:
				texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a+b/c+(d/e+f)*g)} $ <br\> `;
				texte_corr += `$${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a+b/c+(d/e+f)*g)} $<br\>`;
				break;
				case 1:
				texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a+b)/c+d/e+f*g)}  $<br\>`;
				texte_corr += `$ (${a} + ${b}) \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a+b)/c+d/e+f*g)} $<br\>`;
				break;
				case 2:
				texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a+b/c+d/e+f)*g)} $<br\>`;
				texte_corr += `$ ( ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} ) \\times ${g} = ${calcul((a+b/c+d/e+f)*g)} $<br\>`;
				break;
				case 3:
				texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a+b/c+d)/e+f*g)} $<br\>`;
				texte_corr += `$ (${a} + ${b} \\div ${c} + ${d}) \\div ${e} + ${f} \\times ${g} = ${calcul((a+b/c+d)/e+f*g)} $<br\>`;
				break;
				case 4:
				texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(((a+b)/c+d/e+f)*g)} $<br\>`;
				texte_corr += `$ ((${a} + ${b}) \\div ${c} + ${d} \\div ${e} + ${f}) \\times ${g} = ${calcul(((a+b)/c+d/e+f)*g)} $<br\>`;
				break;
				case 5:
				texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a+(b/c+d)/e+f*g)} $<br\>`;
				texte_corr += `$ ${a} + ( ${b} \\div ${c} + ${d} ) \\div ${e} + ${f} \\times ${g} = ${calcul(a+(b/c+d)/e+f*g)} $<br\>`;
				break;
				case 6:
				texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a+b/c+d/e+f*g)} $ <br\> `;
				texte_corr += `$${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a+b/c+d/e+f*g)} $<br\>`;
				break;
			}
				
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
}

