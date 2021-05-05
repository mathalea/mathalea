import Exercice from '../ClasseExercice.js';
import {shuffle2tableaux,listeQuestionsToContenu,randint,choice,ecritureNombreRelatif,ecritureNombreRelatifc,ecritureAlgebrique,texNombre} from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Addition de deux entiers relatifs'

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
	this.titre = titre;
	this.consigne = 'Calculer';
	this.spacing = 2;
	this.qcmDisponible=true
	this.modeQcm=false

	this.nouvelleVersion = function () {
		this.qcm=['5R20',[],"tables et multiples de 10,100 et 1000",1]
		let espace =``;
		if (sortieHtml) {
		  espace = `&emsp;`;
		} else {
		  espace = `\\qquad`;
		}
		let tabrep,tabicone

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1, this.sup);
			b = randint(1, this.sup);
			k = choice([[-1, -1], [-1, 1], [1, -1]]); // Les deux nombres relatifs ne peuvent pas être tous les deux positifs
			a = a * k[0];
			b = b * k[1];
			if (this.sup2) {
				texte = `$ ${texNombre(a)}${ecritureAlgebrique(b)} = \\dotfill $`;
				texteCorr = `$ ${a}${ecritureAlgebrique(b)} = ${a + b} $`;
			} else {
				texte = '$ ' + ecritureNombreRelatif(a) + ' + ' + ecritureNombreRelatif(b) + ' = \\dotfill $';
				texteCorr = '$ ' + ecritureNombreRelatifc(a) + ' + ' + ecritureNombreRelatifc(b) + ' = ' + ecritureNombreRelatifc(a + b) + ' $';
			}
			tabrep=[`$${a+b}$`,`$${a-b}$`,`$${-a+b}$`,`$${-a-b}$`]
			tabicone=[1,0,0,0]
			if (this.modeQcm&&!mathalea.sortieAMC) {
				texteCorr=''
				texte+=`<br>  Réponses possibles : ${espace}  `
				shuffle2tableaux(tabrep, tabicone);
				for (let i=0; i<tabrep.length; i++) {
				  texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
				 if (tabicone[i]==1) {
				   texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
				 } else {
				   texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
				 }
			   }
			  }

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				this.qcm[1].push([`${texte}\n`,
				tabrep,
				tabicone])
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	};
	this.besoinFormulaireNumerique = ['Valeur maximale', 99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];
}
