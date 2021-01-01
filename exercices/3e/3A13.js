import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes_sans_changer_ordre,tex_nombre,mise_en_evidence,decomposition_facteurs_premiers,modal_pdf,katex_Popup2,num_alpha,warn_message,lampe_message,SVG_engrenages,ppcm} from "/modules/outils.js"
/**
 * 3A13 - PPCM_Engrenages
 * les deux on besoin de la def partielle serie : stlX
 * pb dans la sortie LaTeX, revoir comment user de la fonction katex_Popup2() pour affichage d'une note hors texte!
 * @author Sébastien Lozano
 */
export default function PPCM_Engrenages() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Engrenages";
	// pas de différence entre la version html et la version latex pour la consigne
	//this.consigne =`Déterminer au bout de combien de tours les deux roues seront toutes les deux revenues à leur position initiale.`;
	this.consigne = ``;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 2 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 4;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = 'bclogo';

	var num_ex = '3A13'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
	} else { // sortie LaTeX
	};
	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A13.pdf", "Aide mémoire sur les fonctions (Sébastien Lozano)", "Aide mémoire");
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);
		let txt_intro = `Boîte de vitesse, transmission de vélo, de moto, perceuse electrique, tout ça fonctionne avec des engrenages! Mais au fait, comment ça marche, les engrenages?`;
		if (sortie_html) {
			txt_intro += warn_message(`Attention, les roues ci-dessous ne comportent pas le nombre de dents de l'énoncé!`, `nombres`, `Coup de pouce`);
			txt_intro += `<div id="${num_ex}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
			//this.introduction += warn_message(`Attention, les roues ci-dessous ne comportent pas le nombre de dents de l'énoncé!`, `nombres`, `Coup de pouce`);
			//this.introduction += `<div id="${num_ex}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
			SVG_engrenages(num_ex, 200, 200);
		};

		this.introduction = lampe_message({
			titre: `Arithmétique des engrenages`,
			texte: txt_intro,
			couleur: `nombres`
		});

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			if (sortie_html) {
				let id_unique = `${num_ex}_${i}_${Date.now()}`;
				//var id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
			}

			var nb_dents_r1;
			var nb_dents_r2;
			let txt_popup = `Étant donnés deux nombres entiers a et b, lorsque le plus petit multiple commun à $a$ et $b$ vaut $a \\times b$ ( $ppcm(a,b)=a\\times b$ ), on dit que `;
			//txt_popup += texte_gras('les nombres a et b sont premiers entre eux');
			if (sortie_html) {
				txt_popup += '<b>les nombres a et b sont premiers entre eux</b>';
			} else {
				txt_popup += '$\\textbf{les nombres a et b sont premiers entre eux}$';
			};

			switch (type_de_questions) {
				case 1: // avec de petits nombres on calcule les mutliples
					nb_dents_r1 = randint(5, 30);
					nb_dents_r2 = randint(5, 30, nb_dents_r1);
					texte = `La roue n$\\degree$1 possède $${nb_dents_r1}$ dents et la roue n$\\degree$2 a $${nb_dents_r2}$ dents.`;
					texte += `<br>` + num_alpha(0) + ` Écrire la liste des multiples de $${nb_dents_r1}$ et de $${nb_dents_r2}$.`;
					if (ppcm(nb_dents_r1, nb_dents_r2) == (nb_dents_r1 * nb_dents_r2)) {
						texte += `<br>Pourquoi peut-on en déduire que ${nb_dents_r1} et ${nb_dents_r2} sont des `;
						// let txt_popup = `Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que `;
						// //txt_popup += texte_gras('les nombres a et b sont premiers entre eux');
						// if (sortie_html) {
						// 	txt_popup += '<b>les nombres a et b sont premiers entre eux</b>';
						// } else {
						// 	txt_popup += '$\\textbf{les nombres a et b sont premiers entre eux}$';
						// };
						//${texte_gras('les nombres a et b sont premiers entre eux')}.`;
						texte += katex_Popup2(
							numero_de_l_exercice + 1,
							1,
							"nombres premiers entre eux ?",
							`Définition : Nombres premiers entre eux`,
							txt_popup
						);
					};
					texte += `<br>` + num_alpha(1) + ` En déduire le nombre de tours de chaque roue avant le retour à leur position initiale.`;
					texte_corr = num_alpha(0) + ` Liste des premiers multiples de $${nb_dents_r1}$ : <br>`;
					// on va faire en sorte de toujours avoir un nombre de multiples multiple de 5
					let nb_marge = 5 - (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1) % 5;
					let k_max = (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1 + nb_marge);
					for (let k = 1; k < k_max + 1; k++) {
						texte_corr += `$${k}\\times${nb_dents_r1} = `;
						if (k == (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1)) {
							texte_corr += mise_en_evidence(tex_nombre(k * nb_dents_r1));
							texte_corr += `$ ; `;
						} else {
							texte_corr += `${tex_nombre(k * nb_dents_r1)}$ ; `;
						};
						if (k % 5 == 0) {
							texte_corr += `<br>`;
						}
					};
					texte_corr += `$\\ldots$ `;
					texte_corr += `<br>`;
					texte_corr += ` Liste des premiers multiples de ${nb_dents_r2} : <br>`;
					// on va faire en sorte de toujours avoir un nombre de multiples multiple de 5
					nb_marge = 5 - (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2) % 5;
					k_max = (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2 + nb_marge);
					for (let k = 1; k < k_max + 1; k++) {
						texte_corr += `$${k}\\times${nb_dents_r2} = `;
						if (k == (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2)) {
							texte_corr += mise_en_evidence(tex_nombre(k * nb_dents_r2));
							texte_corr += `$ ; `;
						} else {
							texte_corr += `${tex_nombre(k * nb_dents_r2)}$ ; `;
						};
						if (k % 5 == 0) {
							texte_corr += `<br>`;
						}
					};
					texte_corr += `$\\ldots$ `;
					texte_corr += `<br>`;
					texte_corr += `Le plus petit multiple commun à $${nb_dents_r1}$ et $${nb_dents_r2}$ vaut donc $ppcm(${nb_dents_r1},${nb_dents_r2}) = ${ppcm(nb_dents_r1, nb_dents_r2)}$.`;
					texte_corr += `<br>`;
					if (ppcm(nb_dents_r1, nb_dents_r2) == (nb_dents_r1 * nb_dents_r2)) {
						texte_corr += `Le $ppcm(` + nb_dents_r1 + `;` + nb_dents_r2 + `)=` + nb_dents_r1 + `\\times` + nb_dents_r2 + `$ donc $${nb_dents_r1}$ et $${nb_dents_r2}$ sont des `;
						texte_corr += katex_Popup2(
							numero_de_l_exercice + 2,
							1,
							"nombres premiers entre eux.",
							`Définition : Nombres premiers entre eux`,
							txt_popup //`Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que ${texte_gras('les nombres a et b sont premiers entre eux')}.`
						);
					};
					texte_corr += `<br><br>` + num_alpha(1) + ` Chaque roue doit tourner de $ppcm(${nb_dents_r1},${nb_dents_r2})=${tex_nombre(ppcm(nb_dents_r1, nb_dents_r2))}$ dents.`;
					texte_corr += `<br> Cela correspond à $(${ppcm(nb_dents_r1, nb_dents_r2)}\\text{ dents})\\div (${nb_dents_r1}\\text{ dents/tour}) = ${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1}$`;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `pour la roue n$\\degree$1.`;
					texte_corr += `<br>Cela correspond à $(${ppcm(nb_dents_r1, nb_dents_r2)}\\text{ dents})\\div (${nb_dents_r2}\\text{ dents/tour}) = ${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2}$`;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `pour la roue n$\\degree$2.`;
					break;
				case 2: // avec de plus grands nombre, c'est mieux de décomposer en facteurs premiers
					nb_dents_r1 = randint(31, 80);
					nb_dents_r2 = randint(31, 80, nb_dents_r1);
					texte = `La roue n$\\degree$1 possède $${nb_dents_r1}$ dents et la roue n$\\degree$2 a $${nb_dents_r2}$ dents.`;
					texte += `<br>` + num_alpha(0) + ` Décomposer $${nb_dents_r1}$ et $${nb_dents_r2}$ en produit de facteurs premiers.`;
					if (ppcm(nb_dents_r1, nb_dents_r2) == (nb_dents_r1 * nb_dents_r2)) {
						texte += `<br>Pourquoi peut-on en déduire que ${nb_dents_r1} et ${nb_dents_r2} sont des `;
						texte += katex_Popup2(
							numero_de_l_exercice + 3,
							1,
							"nombres premiers entre eux",
							`Définition : Nombres premiers entre eux`,
							txt_popup //`Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que ${texte_gras('les nombres a et b sont premiers entre eux')}.`
						);
					};
					texte += `<br>` + num_alpha(1) + ` En déduire le nombre de tours de chaque roue avant le retour à leur position initiale.`;
					texte_corr = `Pour un nombre de dents plus élevé, il est plus commode d'utiliser les décompositions en produit de facteurs premiers.`;
					texte_corr += `<br>` + num_alpha(0) + ` Décomposition de $${nb_dents_r1}$ en produit de facteurs premiers :  $${nb_dents_r1} = ${decomposition_facteurs_premiers(nb_dents_r1)}$.`;
					texte_corr += `<br> Décomposition de $${nb_dents_r2}$ en produit de facteurs premiers :  $${nb_dents_r2} = ${decomposition_facteurs_premiers(nb_dents_r2)}$.`;
					texte_corr += `<br> D'où $ppcm(${nb_dents_r1},${nb_dents_r2})= ${decomposition_facteurs_premiers(ppcm(nb_dents_r1, nb_dents_r2))}$.<br>`;
					if (ppcm(nb_dents_r1, nb_dents_r2) == (nb_dents_r1 * nb_dents_r2)) {
						texte_corr += `Le $ppcm(` + nb_dents_r1 + `;` + nb_dents_r2 + `)=` + nb_dents_r1 + `\\times` + nb_dents_r2 + `$ donc $${nb_dents_r1}$ et $${nb_dents_r2}$ sont des `;
						texte_corr += katex_Popup2(
							numero_de_l_exercice + 4,
							1,
							"nombres premiers entre eux.",
							`Définition : Nombres premiers entre eux`,
							txt_popup //`Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que ${texte_gras('les nombres a et b sont premiers entre eux')}.`
						);
					};
					texte_corr += `<br><br>` + num_alpha(1) + ` Chaque roue doit tourner de $ppcm(${nb_dents_r1},${nb_dents_r2})=${tex_nombre(ppcm(nb_dents_r1, nb_dents_r2))}$ dents.`;
					texte_corr += `<br> Cela correspond à $(${tex_nombre(ppcm(nb_dents_r1, nb_dents_r2))}\\text{ dents})\\div (${nb_dents_r1}\\text{ dents/tour}) = ${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1}$`;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `pour la roue n$\\degree$1.`;
					texte_corr += `<br> Cela correspond à $(${tex_nombre(ppcm(nb_dents_r1, nb_dents_r2))}\\text{ dents})\\div (${nb_dents_r2}\\text{ dents/tour}) = ${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2}$`;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `pour la roue n$\\degree$2.`;
					break;
				case 3: // déterminer le nombre de dents d'une roue connaissant l'autre et le nombre de tours necessaires à la re-synchro
					nb_dents_r1 = randint(5, 80);
					nb_dents_r2 = randint(5, 80, nb_dents_r1);
					texte = `La roue n$\\degree$2 a maintenant $${nb_dents_r2}$ dents.`;
					texte += ` Déterminer le nombre de dents de la roue n$\\degree$1 qui ferait $${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1}$ `;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1 == 1) {
						texte += ` tour `;
					} else {
						texte += ` tours `;
					};
					texte += ` pendant que la roue n$\\degree$2 en fait $${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2}$.`;
					texte_corr = `Puisque la roue n$\\degree$2, qui a $${nb_dents_r2}$ dents, fait $${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2}$ `;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `, cela représente $${tex_nombre(ppcm(nb_dents_r1, nb_dents_r2))}$ dents.`;
					texte_corr += `<br>La roue n$\\degree$1 doit donc aussi tourner de $${tex_nombre(ppcm(nb_dents_r1, nb_dents_r2))}$ dents, ceci en $${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1}$ `;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `.`;
					texte_corr += `<br> on obtient donc $(${tex_nombre(ppcm(nb_dents_r1, nb_dents_r2))}\\text{ dents})\\div (${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1}\\text{`;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `}) = ${nb_dents_r1} \\text{ dents/tour}.$`;
					texte_corr += `<br>La roue n$\\degree$1 a donc : $${nb_dents_r1}$ dents.`;
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}

		liste_de_question_to_contenu(this);
	};
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}
