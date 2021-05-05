import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,simplification_de_fraction_avec_etapes,prenom,tex_fraction,numAlpha} from '../../modules/outils.js'


export const titre = 'Calculer des probabilités dans une expérience aléatoire à une épreuve'

/**
 * Calculs de probabilités sur une expérience aléatoire à une épreuve.
 * @Auteur Jean-Claude Lhote
 * Référence 5S21
 */
export default function fonctions_probabilite1() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "";
	this.nbQuestions = 4;
	this.nbQuestionsModifiable = true;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	sortieHtml ? this.spacing = 2 : this.spacing = 1;
	sortieHtml ? this.spacingCorr = 3 : this.spacingCorr = 1;
	this.sup = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		let liste_index_disponibles = [0, 1, 2, 3, 4, 5, 6];
		let liste_index = combinaisonListes(liste_index_disponibles, this.nbQuestions);
		let liste_de_lieux_choses = [['le frigo', 'yaourts'], ['le frigo', 'desserts lactés'], ['une urne', 'boules'], ['une urne', 'jetons'], ['un paquet de bonbons', 'nounours'], ['un tiroir de la commode', 't-shirts'], ['un tas de jetons de poker', 'jetons']];
		let qualites = [[]];
		qualites[0] = ['à la fraise', 'à la vanille', 'à l\'abricot', 'à l\'ananas', 'à la cerise'];
		qualites[1] = ['au chocolat', 'à la vanille', 'au café', 'à la pistache', 'au caramel'];
		qualites[2] = ['rouges', 'vertes', 'bleues', 'noires', 'blanches'];
		qualites[3] = ['gris', 'cyans', 'roses', 'jaunes', 'violets'];
		qualites[4] = ['rouges', 'verts', 'bleus', 'noirs', 'jaunes'];
		qualites[5] = ['rouges', 'verts', 'bleus', 'noirs', 'blancs'];
		qualites[6] = ['rouges', 'verts', 'bleus', 'noirs', 'jaunes'];
		for (let i = 0, p, m, q, somme, quidam, index1, lieu, objet, article, pronom, n = [], texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			index1 = liste_index[i];
			if (index1 == 2) { article = `une`; pronom = `elles`; }
			else { article = `un`; pronom = `eux`; }
			quidam = prenom();
			lieu = liste_de_lieux_choses[index1][0];
			objet = liste_de_lieux_choses[index1][1];
			n[0] = randint(2, 5);
			n[1] = randint(1, 6) + 1;
			n[2] = randint(1, 3) * 2;
			n[3] = randint(1, 4) + 2;
			n[4] = randint(2, 5);

			somme = n[0] + n[1] + n[2] + n[3] + n[4];
			m = randint(0, 4);
			p = randint(0, 4, [m]);
			q = randint(0, 4, [p, m]);

			texte = `Dans ${lieu} il y a ${somme} ${objet}. ${n[0]} sont ${qualites[index1][0]}, ${n[1]} sont ${qualites[index1][1]}, ${n[2]} sont ${qualites[index1][2]}, ${n[3]} sont ${qualites[index1][3]} et ${n[4]} sont ${qualites[index1][4]}.<br> `;
			texte += `${quidam} choisit au hasard l'${article} d'entre ${pronom}.<br> `;
			texte += numAlpha(0) + ` Quelle est la probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][m]} ?<br>`;
			texte += numAlpha(1) + ` Quelle est la probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][p]} ?<br>`;
			texte += numAlpha(2) + ` Quelle est la probabilité que son choix ne tombe pas sur l'${article} des ${objet} ${qualites[index1][q]} ?<br>`;
			texte += numAlpha(3) + ` Quelle est la probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][m]} ou ${qualites[index1][p]}?<br>`;
			texteCorr = `On est dans une situation d’équiprobabilité donc la probabilité est donnée par le quotient du nombre de cas favorables par le nombre de cas au total.<br>`;
			texteCorr += numAlpha(0) + ` Il y a ${n[m]} ${objet} ${qualites[index1][m]} et il y a ${somme} ${objet} possibles. La probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][m]} est :<br> $${tex_fraction(n[m], somme)}${simplification_de_fraction_avec_etapes(n[m], somme)}$.<br>`;
			texteCorr += numAlpha(1) + ` Il y a ${n[p]} ${objet} ${qualites[index1][p]} et il y a ${somme} ${objet} possibles. La probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][p]} est :<br> $${tex_fraction(n[p], somme)}${simplification_de_fraction_avec_etapes(n[p], somme)}$.<br>`;
			texteCorr += numAlpha(2) + ` Il y a ${n[q]} ${objet} ${qualites[index1][q]}, donc il y a ${somme} $-$ ${n[q]} $=$ ${somme - n[q]} autres ${objet} et il y a ${somme} ${objet} possibles. La probabilité que son choix ne tombe pas sur l'${article} des ${objet} ${qualites[index1][q]} est :<br> $${tex_fraction(somme - n[q], somme)}${simplification_de_fraction_avec_etapes(somme - n[q], somme)}$.<br>`;
			texteCorr += numAlpha(3) + ` La probabilité d'un événement est la somme des probabilités des issues qui le composent. Donc la probabilité que son choix tombe sur l'${article} des ${objet} ${qualites[index1][m]} ou ${qualites[index1][p]} est :<br> $${tex_fraction(n[m], somme)}+${tex_fraction(n[p], somme)}=${tex_fraction(n[p] + n[m], somme)}${simplification_de_fraction_avec_etapes(n[p] + n[m], somme)}$.<br>`;
			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
	};
}
