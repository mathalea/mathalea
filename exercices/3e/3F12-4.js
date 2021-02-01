import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,abs,calcul,tex_graphique,resol_sys_lineaire_2x2,resol_sys_lineaire_3x3,cherche_min_max_f} from "/modules/outils.js"
/**
* Un graphique étant tracé, déterminer l'image de nombres donnés.
* La fonction est un polynome de degré 1, 2 ou 3 et les nombres des questions ne sont que des entiers.
*
* @Auteur Rémi Angot
* 3F12-4
*/
export default function Image_graphique() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire l'image d'un nombre à partir d'un graphique";
	this.consigne = "";
	this.sup = 3;
	this.spacing = 1;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 1;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [800, 600];
	this.pas_de_version_LaTeX = false;
	this.nb_cols = 1;
	this.liste_packages = 'pgfplots';


	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		let codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAAEL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFAeKkeuFHrhEBzy4UeuFHs#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAAA4AAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8AAAAAAQ4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBCb52yLQ5WAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wAAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AAAAAAAOAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADgAAAQUAAQAAAAcAAAAJAP####8AAAAAAQ4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAQEAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAduYmdyYWR4AAIyMAAAAAFANAAAAAAAAAAAABEA#####wAHbmJncmFkeQACMjAAAAABQDQAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAUR3JhZHVhdGlvbkF4ZXNSZXBlcmUAAAAbAAAACAAAAAMAAAAKAAAADwAAABD#####AAAAAQATQ0Fic2Npc3NlT3JpZ2luZVJlcAAAAAARAAVhYnNvcgAAAAr#####AAAAAQATQ09yZG9ubmVlT3JpZ2luZVJlcAAAAAARAAVvcmRvcgAAAAoAAAALAAAAABEABnVuaXRleAAAAAr#####AAAAAQAKQ1VuaXRleVJlcAAAAAARAAZ1bml0ZXkAAAAK#####wAAAAEAEENQb2ludERhbnNSZXBlcmUAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADgAAABMAAAAWAAAAABEAAAAAAA4AAAEFAAAAAAoAAAANAAAAAA4AAAASAAAADgAAABQAAAAOAAAAEwAAABYAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADQAAAAAOAAAAEwAAAA4AAAAVAAAADAAAAAARAAAAFgAAAA4AAAAPAAAADwAAAAARAAAAAAAOAAABBQAAAAAXAAAAGQAAAAwAAAAAEQAAABYAAAAOAAAAEAAAAA8AAAAAEQAAAAAADgAAAQUAAAAAGAAAABv#####AAAAAQAIQ1NlZ21lbnQAAAAAEQEAAAAAEAAAAQABAAAAFwAAABoAAAAXAAAAABEBAAAAABAAAAEAAQAAABgAAAAcAAAABAAAAAARAQAAAAALAAFXAMAUAAAAAAAAwDQAAAAAAAAFAAE#3FZ4mrzfDgAAAB3#####AAAAAgAIQ01lc3VyZVgAAAAAEQAGeENvb3JkAAAACgAAAB8AAAARAAAAABEABWFic3cxAAZ4Q29vcmQAAAAOAAAAIP####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUBAAAAEQBmZmYAAAAfAAAADgAAAA8AAAAfAAAAAgAAAB8AAAAfAAAAEQAAAAARAAVhYnN3MgANMiphYnNvci1hYnN3MQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEgAAAA4AAAAhAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAACMAAAAOAAAAEwAAABkBAAAAEQBmZmYAAAAkAAAADgAAAA8AAAAfAAAABQAAAB8AAAAgAAAAIQAAACMAAAAkAAAABAAAAAARAQAAAAALAAFSAEAgAAAAAAAAwCAAAAAAAAAFAAE#0RtOgbToHwAAAB7#####AAAAAgAIQ01lc3VyZVkAAAAAEQAGeUNvb3JkAAAACgAAACYAAAARAAAAABEABW9yZHIxAAZ5Q29vcmQAAAAOAAAAJwAAABkBAAAAEQBmZmYAAAAmAAAADgAAABAAAAAmAAAAAgAAACYAAAAmAAAAEQAAAAARAAVvcmRyMgANMipvcmRvci1vcmRyMQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEwAAAA4AAAAoAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAABIAAAAOAAAAKgAAABkBAAAAEQBmZmYAAAArAAAADgAAABAAAAAmAAAABQAAACYAAAAnAAAAKAAAACoAAAAr#####wAAAAIADENDb21tZW50YWlyZQAAAAARAWZmZgAAAAAAAAAAAEAYAAAAAAAAAAAAHwsAAf###wAAAAEAAAAAAAAAAQAAAAAAAAAAAAsjVmFsKGFic3cxKQAAABkBAAAAEQBmZmYAAAAtAAAADgAAAA8AAAAfAAAABAAAAB8AAAAgAAAAIQAAAC0AAAAbAAAAABEBZmZmAAAAAAAAAAAAQBgAAAAAAAAAAAAkCwAB####AAAAAQAAAAAAAAABAAAAAAAAAAAACyNWYWwoYWJzdzIpAAAAGQEAAAARAGZmZgAAAC8AAAAOAAAADwAAAB8AAAAGAAAAHwAAACAAAAAhAAAAIwAAACQAAAAvAAAAGwAAAAARAWZmZgDAIAAAAAAAAD#wAAAAAAAAAAAAJgsAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIxKQAAABkBAAAAEQBmZmYAAAAxAAAADgAAABAAAAAmAAAABAAAACYAAAAnAAAAKAAAADEAAAAbAAAAABEBZmZmAMAcAAAAAAAAAAAAAAAAAAAAAAArCwAB####AAAAAgAAAAEAAAABAAAAAAAAAAAACyNWYWwob3JkcjIpAAAAGQEAAAARAGZmZgAAADMAAAAOAAAAEAAAACYAAAAGAAAAJgAAACcAAAAoAAAAKgAAACsAAAAz#####wAAAAEABUNGb25jAP####8AAWYACC0yKngqeCszAAAADQD#####AAAAAQAMQ01vaW5zVW5haXJlAAAADQIAAAANAgAAAAFAAAAAAAAAAP####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAAeAAAAAAAAAAFACAAAAAAAAAABeAAAAAQA#####wEAAAAAEAABeAAAAAAAAAAAAEAIAAAAAAAABQABQC8BAyKX1IIAAAAEAAAAGAD#####AAJ4MQAAAAoAAAA2AAAAEQD#####AAJ5MQAFZih4MSn#####AAAAAQAOQ0FwcGVsRm9uY3Rpb24AAAA1AAAADgAAADcAAAAWAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAADgAAADcAAAAOAAAAOP####8AAAACAA1DTGlldURlUG9pbnRzAP####8AAAD#AAIAAAA5AAAB9AABAAAANgAAAAQAAAA2AAAANwAAADgAAAA5#####wAAAAEAFUNQb2ludExpZUxpZXVQYXJQdExpZQD#####AAAAAAAQAAFNAAAAAAAAAAAAQAgAAAAAAAAJAAG##CuHsx36wAAAADq##CuHsx36wAAAAAMA#####wEAAAABEAAAAQABAAAAOwA#8AAAAAAAAAAAAAMA#####wEAAAABEAAAAQABAAAAOwE#8AAAAAAAAP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAEAAAAPAAAACIA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAUAAAA9AAAAFwD#####AAAAAAAQAAABAQEAAAA7AAAAPgAAABcA#####wAAAAAAEAAAAQEBAAAAOwAAAD8AAAAO##########8=";

		let a, b, c, d, x1, x2, x3, fx1, fx2, fx3, expression_f, numa, dena, numb, denb, numc, denc, ymax;

		function initialise_variables() {
			if (sortie_html) { // repère -10 || 10
				x1 = randint(-6, -3);
				x2 = randint(x1 + 3, 2);
				x3 = randint(x2 + 2, 8);
				fx1 = randint(-5, 5);
				fx2 = randint(-6, 6);
				fx3 = randint(-5, 5);
				d = randint(-5, 5);
				c = randint(-5, 5);
				ymax = 7;
			} else { // repère -5 || 5
				x1 = randint(-4, -2);
				x2 = randint(-1, 2, [0]);
				x3 = randint(3, 4);
				fx1 = randint(-4, 4);
				fx2 = randint(-4, 4);
				fx3 = randint(-4, 4);
				d = randint(-3, 3);
				c = randint(-3, 3);
				ymax = 4;
			}
		};

		initialise_variables();


		let texte = `On a tracé ci-dessous la courbe représentative de la fonction $f$.<br>`,texte_corr="";

		if (this.sup == 1) {

			a = calcul((fx2 - fx1) / (x2 - x1));
			b = calcul(fx1 - a * x1);
			expression_f = `${a}*x+(${b})`;

			texte += `Déterminer par lecture graphique les images de $${x1}$ et de $${x2}$ par cette fonction $f$.<br><br>`;
			texte_corr = `L'image de $${x1}$ est $${fx1}$, on note $f(${x1})=${fx1}$.<br>`;
			texte_corr += `L'image de $${x2}$ est $${fx2}$, on note $f(${x2})=${fx2}$.`;

		}

		if (this.sup == 2) {
			[[numa, dena], [numb, denb]] = resol_sys_lineaire_2x2(x1, x3, fx1, fx3, c);
			while (dena == 0 || denb == 0 || numa == 0) {
				x1 = randint(-6, -3);
				x3 = randint(1, 6);
				fx1 = randint(-5, 5);
				fx3 = randint(-6, 6);
				d = randint(-10, 10);

				[[numa, dena], [numb, denb]] = resol_sys_lineaire_2x2(x1, x3, fx1, fx3, c);
			}
			a = numa / dena;
			b = numb / denb;
			x2 = 0;
			fx2 = c;

			expression_f = `${a}*x^2+(${b})*x+(${c})`;
		}

		if (this.sup == 3) {
			[[numa, dena], [numb, denb], [numc, denc]] = resol_sys_lineaire_3x3(x1, x2, x3, fx1, fx2, fx3, d);
			let [extremum1, extremum2] = cherche_min_max_f([numa / dena, numb / denb, numc / denc, d]);
			while (dena == 0 || denb == 0 || denc == 0 || abs(extremum1[1]) > ymax || abs(extremum2[1]) > ymax) {
				initialise_variables();
				[[numa, dena], [numb, denb], [numc, denc]] = resol_sys_lineaire_3x3(x1, x2, x3, fx1, fx2, fx3, d);
				if (cherche_min_max_f([numa / dena, numb / denb, numc / denc, d]) == []) {
					[extremum1, extremum2] = [[0, 999], [0, 999]];
				} else {
					[extremum1, extremum2] = cherche_min_max_f([numa / dena, numb / denb, numc / denc, d]);
				}
			}
			a = numa / dena;
			b = numb / denb;
			c = numc / denc;

			expression_f = `${a}*x^3+(${b})*x^2+(${c})*x+(${d})`;
		}

		if (this.sup == 2 || this.sup == 3) {
			texte += `Déterminer par lecture graphique les images de $${x1}$, de $${x2}$ et de $${x3}$ par cette fonction $f$.<br><br>`;
			texte_corr = `L'image de $${x1}$ est $${fx1}$, on note $f(${x1})=${fx1}$.<br>`;
			texte_corr += `L'image de $${x2}$ est $${fx2}$, on note $f(${x2})=${fx2}$.<br>`;
			texte_corr += `L'image de $${x3}$ est $${fx3}$, on note $f(${x3})=${fx3}$.<br>`;
		}

		if (!sortie_html) {
			texte += "\n\n";
			texte += tex_graphique(expression_f);
		}

		this.MG32codeBase64 = codeBase64;
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "f", "${expression_f}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      `;

		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu_sans_numero(this);
	};

	this.besoin_formulaire_numerique = ['Type de fonctions', 3, "1 : Affine\n2 : Polynome du 2nd degré\n3 : Polynome du 3e degré"];

}
