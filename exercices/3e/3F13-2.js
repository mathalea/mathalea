import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,texte_en_couleur_et_gras,cesar} from "/modules/outils.js"
import {point,polygoneRegulier,repere2,graphiqueInterpole,mathalea2d,} from "/modules/2d.js"
/**
 * @Auteur Jean-Claude Lhote
 * publié le  15/11/2020
 * ref 3F13-2
 */
export default function Premier_escape_game_mathalea() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Spécial escape game";
	this.consigne = "Trouver le mot de passe.";
	this.nb_questions = 1;
	sortie_html ? this.spacing_corr = 1 : this.spacing_corr = 1.5;
	sortie_html ? this.spacing = 1 : this.spacing = 1.5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.sup2 = "";
	this.pas_de_version_LaTeX = false;
	this.nouvelle_version = function () {
		let lettres = [], mots = ["BMDF", "OGNQ", "BUQP", "BAUP", "BXGE", "BDUJ", "MZSXQE", "BDUEYQ", "BMDFUQ", "HMXQGD", "OAGBXQ", "PDAUFQ", "DQXMFUAZ", "BMDMNAXQ", "MPPUFUAZ", "QJBAEMZF", "RAZOFUAZ", "OAYBXQJQ"];
		let alphabet = [];
		//		let coords=[]
		this.liste_questions = [];
		this.liste_corrections = [];
		let texte = '', texte_corr = '', f1, f2, f3, f4, p, r;
		// Initialisation des tableaux
		for (let i = 0; i < 26; i++) {
			alphabet.push(String.fromCharCode(65 + i));
		}
		for (let y = 0; y < 5; y++) {
			lettres.push(['*', '*', '*', '*', '*', '*']);
		}
		//		for (let y=0;y<5;y++) {
		//			for (let x=0;x<6;x++) {
		//				coords.push([0,0])
		//			}
		//		}
		// Le moment du choix
		let type = parseInt(this.sup);
		let mdp = cesar(mots[randint(0, 5) + (type - 1) * 6], 14);
		let absc = [], ord = [], car;
		if (this.sup2 == mdp)
			texte += `${texte_en_couleur_et_gras(`Bravo ! le mot de passe était bien le mot ${mdp}`, 'blue')}<br>`;
		else
			texte += `Min et Max sont dans un bateau.<br>La tempête fait rage.<br>Ils en voient de toutes les couleurs.<br>Les vagues et les creux sont immenses.<br>Soudain, Min et Max tombent à l'eau... à moins que ce ne soit le contraire ?<br>`;
		texte += "Taper le mot de passe dans la boite de dialogue correspondante des paramètres de l'exercice.<br>";
		texte_corr += `Le mot de passe comporte ${2 + 2 * type} lettres.`;
		if (this.sup2 == mdp)
			texte_corr += `${texte_en_couleur_et_gras(`<br>Bravo ! le mot de passe était bien le mot ${mdp}`, 'blue')}<br>`;

		for (let x = 0; x < type * 2 + 2; x++) {
			car = mdp[x];
			alphabet = alphabet.filter(item => item !== car);
			if (x % 2 == 0)
				absc.push(randint(0, 2));
			else
				absc.push(randint(3, 5));
			// Pour l'abscisse, pas de problème de doublons
			if (x % 2 == 0)
				ord.push(randint(0, 4)); // premier point, l'ordonnée n'est pas contrainte.
			else
				ord.push(randint(0, 4, ord[x - 1])); // pour le deuxième, on évite l'ordonnée précédente
			if (lettres[ord[x]][absc[x]] == '*')
				lettres[ord[x]][absc[x]] = car;
			else if (lettres[ord[x]][absc[x]] != car) {
				for (let i = 0; i < x; i++) {
					if (absc[i] == absc[x] && ord[i] == ord[x]) {
						ord[x] = (ord[x] + 1) % 5;
						i = 0;
					}
				}
				lettres[ord[x]][absc[x]] = car;
			}
		}
		for (let i = 0; i < type * 2 + 2; i++) {
			absc[i]++; // On corrige les coordonnées des points
			ord[i]++;
		}
		// On complète la grille de lettres
		alphabet = shuffle(alphabet);
		for (let x = 0; x < 6; x++) {
			for (let y = 0; y < 5; y++) {
				if (lettres[y][x] == '*' && alphabet.length > 0) {
					lettres[y][x] = alphabet.pop();
				}
			}
		}
		// On calcule les ordonnées de début et de fin de chaque courbe
		let ord0 = [0, 0, 0, 0], ord6 = [0, 0, 0, 0];

		for (let i = 0; i < type * 2 + 2; i += 2) {
			if (ord[i] > ord[i + 1]) {
				ord0[i / 2] = -2.34 + randint(0, 2);
				ord6[i / 2] = 8.17 - randint(0, 2);
			}
			else {
				ord6[i / 2] = -2.34 + randint(0, 2);
				ord0[i / 2] = 8.17 - randint(0, 2);
			}
		}
		r = repere2({ xMin: -1, yMin: -1, xMax: 7, yMax: 6, xUnite: 2 });
		switch (type) {
			case 1: //N&B
				p = polygoneRegulier(point(-1, -2), point(15, -2), 4);
				p.couleurDeRemplissage = 'gray';
				p.opacite = 0.2;
				f1 = graphiqueInterpole([[0, ord0[0]], [absc[0], ord[0]], [absc[1], ord[1]], [7, ord6[0]]], { repere: r, color: 'black', step: 0.1 });
				f2 = graphiqueInterpole([[0, ord0[1]], [absc[2], ord[2]], [absc[3], ord[3]], [7, ord6[1]]], { repere: r, color: 'white', step: 0.1 });
				f1.epaisseur = 2;
				f2.epaisseur = 2;
				texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 7, pixelsParCm: 30 }, p, r, f1, f2) + `<br>`;
				break;
			case 2: //RGB
				p = polygoneRegulier(point(-1, -2), point(15, -2), 4);
				p.opacite = 0.2;
				p.couleurDeRemplissage = 'gray';
				f1 = graphiqueInterpole([[0, ord0[0]], [absc[0], ord[0]], [absc[1], ord[1]], [7, ord6[0]]], { repere: r, color: 'red', step: 0.1 });
				f2 = graphiqueInterpole([[0, ord0[1]], [absc[2], ord[2]], [absc[3], ord[3]], [7, ord6[1]]], { repere: r, color: 'green', step: 0.1 });
				f3 = graphiqueInterpole([[0, ord0[2]], [absc[4], ord[4]], [absc[5], ord[5]], [7, ord6[2]]], { repere: r, color: 'blue', step: 0.1 });
				f1.epaisseur = 2;
				f2.epaisseur = 2;
				f3.pepaisseur = 2;
				texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 7, pixelsParCm: 30 }, p, r, f1, f2, f3) + `<br>`;
				break;
			case 3: //CJMN
				p = polygoneRegulier(point(-1, -2), point(15, -2), 4);
				p.opacite = 0.2;
				p.couleurDeRemplissage = 'gray';
				f1 = graphiqueInterpole([[0, ord0[0]], [absc[0], ord[0]], [absc[1], ord[1]], [7, ord6[0]]], { repere: r, color: 'cyan', step: 0.1 });
				f2 = graphiqueInterpole([[0, ord0[1]], [absc[2], ord[2]], [absc[3], ord[3]], [7, ord6[1]]], { repere: r, color: 'yellow', step: 0.1 });
				f3 = graphiqueInterpole([[0, ord0[2]], [absc[4], ord[4]], [absc[5], ord[5]], [7, ord6[2]]], { repere: r, color: 'magenta', step: 0.1 });
				f4 = graphiqueInterpole([[0, ord0[3]], [absc[6], ord[6]], [absc[7], ord[7]], [7, ord6[3]]], { repere: r, color: 'black', step: 0.1 });
				f1.epaisseur = 2;
				f2.epaisseur = 2;
				f3.pepaisseur = 2;
				f4.epaisseur = 2;
				texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 7, pixelsParCm: 30 }, p, r, f1, f2, f3, f4) + `<br>`;
				break;
		}
		texte += `$\\begin{array}{|l|` + `c|`.repeat(6) + `}\n`;
		texte += `\\hline\n`;
		texte += ` `;
		for (let j = 0; j < 6; j++) {
			texte += ` & \\text{${j + 1}}`;
		}
		texte += `\\\\\\hline\n`;
		for (let i = 0; i < 5; i++) {
			texte += `\\text{${i + 1}}`;
			for (let j = 0; j < 6; j++) {
				texte += '& ' + lettres[i][j]; //valeur dans le tableau
			}
			texte += `\\\\\\hline\n`;
		}
		texte += `\\end{array}\n$`;
		texte += `<br>`;

		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu(this);

		//	this.besoin_formulaire2_numerique = ['Coefficient de réduction(problèmes de type1)', 3, '1 : Décimal\n 2 : Non décimal\n 3 : Décimal ou non'];
	};
	this.besoin_formulaire_numerique = ['Catégorie', 3, '1 : Noir & Blanc\n 2 : RGB\n 3 : CJMN'];
	this.besoin_formulaire2_texte = ['Quel est ton mot de passe ?', 1, 'Mot de passe (en majuscule):'];

}
