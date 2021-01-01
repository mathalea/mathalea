import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,choice,ecriture_nombre_relatif,ecriture_nombre_relatifc,ecriture_algebrique,ecriture_algebriquec,signe,tex_nombrecoul,somme_des_termes_par_signe,trie_positifs_negatifs,lettre_depuis_chiffre} from "/modules/outils.js"



/**
* Effectuer la somme ou la différence de deux nombres relatifs
*
* * On peut paramétrer les distances à zéro qui sont par défaut inférieures à 20
* * On peut utiliser des écritures simplifiées (ce qui n'est pas le cas par défaut)
* @Auteur Rémi Angot modifications par Jean-Claude Lhote
* Référence 5R22
*/
export default function Exercice_additions_et_soustraction_de_relatifsV2(max = 20) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max;
	this.sup2 = false; // écriture simplifiée
	this.titre = "Additions et soustractions de nombres relatifs";
	this.consigne = 'Calculer';
	this.spacing = 2;
	this.spacing_corr = 1;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.nb_questions = 5;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let relatifs;
		let sommes_signees;
		for (let i = 0, a, b, c, d, e, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			relatifs = [];
			sommes_signees = [];
			a = -1;
			b = choice([-1, 1]);
			if (a == -1 & b == -1)
				c = 1; // On s'assure que les 3 premières termes n'ont pas le même signe
			else
				c = choice([-1, 1]);
			a = randint(1, this.sup) * a;
			b = randint(1, this.sup) * b;
			c = randint(1, this.sup) * c;
			d = randint(1, this.sup) * choice([-1, 1]);
			e = randint(1, this.sup) * choice([-1, 1]);
			let s1 = choice([-1, 1]);
			let s2 = choice([-1, 1]);
			let s3, s4;
			if (s1 == 1 & s2 == 1) { // On s'assure que les 3 premières opérations ne sont pas identiques
				s3 = -1;
			} else if (s1 == -1 & s2 == -1) {
				s3 = 1;
			} else {
				s3 = choice([-1, 1]);
			}
			s4 = choice([-1, 1]);
			if (this.sup2) {
				texte = `$ ${lettre_depuis_chiffre(i + 1)} = ${a}${ecriture_algebrique(b)}${ecriture_algebrique(c)}${ecriture_algebrique(d)}${ecriture_algebrique(e)} = \\dotfill $`;
				if (!sortie_html) {
					texte += `<br>$ ${lettre_depuis_chiffre(i + 1)} = \\dotfill $`;
				}
				relatifs = trie_positifs_negatifs([a, b, c, d, e]);
				texte_corr = `$ ${lettre_depuis_chiffre(i + 1)}\\textbf{=}~${tex_nombrecoul(a)}${ecriture_algebriquec(b)}${ecriture_algebriquec(c)}${ecriture_algebriquec(d)}${ecriture_algebriquec(e)}\\\\\\phantom{A }\\textbf{=}~`;
				if (somme_des_termes_par_signe([a, b, c, d, e])[0] != 0 && somme_des_termes_par_signe([a, b, c, d, e])[1] != 0) {
					texte_corr += `${tex_nombrecoul(relatifs[0])}${ecriture_algebriquec(relatifs[1])}${ecriture_algebriquec(relatifs[2])}${ecriture_algebriquec(relatifs[3])}${ecriture_algebriquec(relatifs[4])}\\\\\\phantom{A }\\textbf{=}~`;
					texte_corr += `${tex_nombrecoul(somme_des_termes_par_signe([a, b, c, d, e])[0])}${ecriture_algebriquec(somme_des_termes_par_signe([a, b, c, d, e])[1])}\\\\\\phantom{A }\\textbf{=}~`;
					texte_corr += `${tex_nombrecoul(a + b + c + d + e)} $`;
				}

				else if (somme_des_termes_par_signe([a, b, c, d, e])[0] != 0)
					texte_corr += `${tex_nombrecoul(somme_des_termes_par_signe([a, b, c, d, e])[0])}$`;
				else
					texte_corr += `${ecriture_algebriquec(somme_des_termes_par_signe([a, b, c, d, e])[1])}$`;
			}
			else {
				texte = `$ ${lettre_depuis_chiffre(i + 1)} =  ${ecriture_nombre_relatif(a)}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)} = \\dotfill $`;
				if (!sortie_html) {
					texte += `<br>$ ${lettre_depuis_chiffre(i + 1)} = \\dotfill $`;
				}
				texte_corr = `$ ${lettre_depuis_chiffre(i + 1)} =  ${a}${signe(s1)}${ecriture_nombre_relatif(b)}${signe(s2)}${ecriture_nombre_relatif(c)}${signe(s3)}${ecriture_nombre_relatif(d)}${signe(s4)}${ecriture_nombre_relatif(e)}$`;
				texte_corr += `<br>$ \\phantom{A}= ${ecriture_nombre_relatifc(a)}+${ecriture_nombre_relatifc(s1 * b)}+${ecriture_nombre_relatifc(s2 * c)}+${ecriture_nombre_relatifc(s3 * d)}+${ecriture_nombre_relatifc(s4 * e)} $`;

				relatifs = trie_positifs_negatifs([a, s1 * b, s2 * c, s3 * d, s4 * e]);

				if (relatifs[0] > 0 & relatifs[4] < 0) {
					texte_corr += `<br>$ \\phantom{A}= ${ecriture_nombre_relatifc(relatifs[0])}+${ecriture_nombre_relatifc(relatifs[1])}+${ecriture_nombre_relatifc(relatifs[2])}+${ecriture_nombre_relatifc(relatifs[3])}+${ecriture_nombre_relatifc(relatifs[4])} $`;
				}
				sommes_signees = somme_des_termes_par_signe([relatifs[0], relatifs[1], relatifs[2], relatifs[3], relatifs[4]]);
				if (sommes_signees[0] != 0 && sommes_signees[1] != 0) {
					texte_corr += `<br>$ \\phantom{A}= ${ecriture_nombre_relatifc(sommes_signees[0])}+${ecriture_nombre_relatifc(sommes_signees[1])} $`;
					texte_corr += `<br>$ \\phantom{A}= ${ecriture_algebriquec(a + s1 * b + s2 * c + s3 * d + s4 * e)} $<br>`;
				}

				else if (sommes_signees[0] != 0)
					texte_corr += `<br>$ \\phantom{A}=${ecriture_algebriquec(sommes_signees[0])}$`;
				else
					texte_corr += `<br>$ \\phantom{A}=${ecriture_algebriquec(sommes_signees[1])}$<br>`;
			}

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu_sans_numero(this);
	};
	this.besoin_formulaire_numerique = ['Valeur maximale', 99999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des écritures simplifiées'];
}
