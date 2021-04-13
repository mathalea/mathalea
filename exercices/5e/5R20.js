import Exercice from '../ClasseExercice.js';
import {shuffle2tableaux,liste_de_question_to_contenu,randint,choice,ecriture_nombre_relatif,ecriture_nombre_relatifc,ecriture_algebrique,tex_nombre} from "/modules/outils.js"


/**
* Additionner deux relatifs inférieurs à la valeur maximale en paramètre qui est par défaut à 20.
*
* Paramètre supplémentaire ; utilisation des écritures simplifiées
* @Auteur Rémi Angot
* 5R20
*/
export default function Exercice_additions_relatifs(max = 20) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Addition de deux entiers relatifs";
	this.consigne = 'Calculer';
	this.spacing = 2;
	this.QCM_disponible=true
	this.ModeQCM=false

	this.nouvelle_version = function () {
		this.QCM=['5R20',[],"tables et multiples de 10,100 et 1000",1]
		let espace =``;
		if (sortie_html) {
		  espace = `&emsp;`;
		} else {
		  espace = `\\qquad`;
		}
		let tabrep,tabicone

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, k, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1, this.sup);
			b = randint(1, this.sup);
			k = choice([[-1, -1], [-1, 1], [1, -1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a * k[0];
			b = b * k[1];
			if (this.sup2) {
				texte = `$ ${tex_nombre(a)}${ecriture_algebrique(b)} = \\dotfill $`;
				texte_corr = `$ ${a}${ecriture_algebrique(b)} = ${a + b} $`;
			} else {
				texte = '$ ' + ecriture_nombre_relatif(a) + ' + ' + ecriture_nombre_relatif(b) + ' = \\dotfill $';
				texte_corr = '$ ' + ecriture_nombre_relatifc(a) + ' + ' + ecriture_nombre_relatifc(b) + ' = ' + ecriture_nombre_relatifc(a + b) + ' $';
			}
			tabrep=[`$${a+b}$`,`$${a-b}$`,`$${-a+b}$`,`$${-a-b}$`]
			tabicone=[1,0,0,0]
			if (this.ModeQCM&&!mathalea.sortieAMC) {
				texte_corr=''
				texte+=`<br>  Réponses possibles : ${espace}  `
				shuffle2tableaux(tabrep, tabicone);
				for (let i=0; i<tabrep.length; i++) {
				  texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
				 if (tabicone[i]==1) {
				   texte_corr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
				 } else {
				   texte_corr += `$\\square\\;$ ${tabrep[i]}` + espace ;
				 }
			   }
			  }

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				this.QCM[1].push([`${texte}\n`,
				tabrep,
				tabicone]) 
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	};
	this.besoin_formulaire_numerique = ['Valeur maximale', 99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];
}
