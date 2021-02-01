import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,Triangles} from "/modules/outils.js"
import {point,mediatrice,codageMediatrice,constructionMediatrice,bissectrice,codageBissectrice,constructionBissectrice,polygone,nommePolygone,rotation,similitude,medianeTriangle,centreGraviteTriangle,hauteurTriangle,codageHauteurTriangle,codageMedianeTriangle,mathalea2d} from "/modules/2d.js"
/**
 * 5G22
 * @Auteur Jean-Claude Lhote
 * Les droites remarquables du triangle : hauteurs médiatrices....médianes et bissectrices
 */
export default function DroiteRemarquableDuTriangle() {
	Exercice.call(this); // Héritage de la classe Exercice()

	this.titre = "Déterminer la nature d'une droite remarquable";
	this.consigne = 'Définir'
	this.spacing = 2;
	this.nb_questions = 1
	this.nb_cols = 1
	this.nb_cols_corr = 1
	this.sup = 1

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let triangles = [], sommets = [[]], A = [], B = [], C = [], t = [], d = [], n = [], c = [], objets = [], A0, B0, C0, tri, G
		let type_de_questions_disponibles, liste_type_de_questions
		if (this.sup == 1) type_de_questions_disponibles = [1, 2]
		if (this.sup == 2) type_de_questions_disponibles = [3, 4]
		if (this.sup == 3) type_de_questions_disponibles = [1, 2, 3, 4]
		liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
		for (let i = 0, a, angle, rapport, texte, texte_corr; i < this.nb_questions; i++) {// this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			triangles[i] = new Triangles();
			sommets[i] = triangles[i].getSommets(false);

			A0 = point(3, randint(1, 2))
			B0 = point(6, randint(1, 2))
			angle = choice([50, 60, 70, 75, 80, 100, 110, 120])
			rapport = randint(7, 13) / 10
			C0 = similitude(B0, A0, angle, rapport)
			tri = polygone(A0, B0, C0)
			G = centreGraviteTriangle(A0, B0, C0)
			a = randint(0, 30) * 12 - 180
			A[i] = rotation(A0, G, a, sommets[i][0], 'below left')
			B[i] = rotation(B0, G, a, sommets[i][1], 'below right')
			C[i] = rotation(C0, G, a, sommets[i][2], 'above')
			t[i] = polygone(A[i], B[i], C[i])
			n[i] = nommePolygone(t[i], `${sommets[i][0]}${sommets[i][1]}${sommets[i][2]}`)
			switch (liste_type_de_questions[i]) {
				case 1:
					d[i] = hauteurTriangle(C[i], B[i], A[i], 'blue')
					d[i].epaisseur = 1
					c[i] = codageHauteurTriangle(C[i], B[i], A[i])
					objets[i] = [A[i], B[i], C[i], t[i], d[i], n[i], c[i]]
					texte_corr = `La droite tracée est la hauteur issue de $${sommets[i][0]}$ dans le triangle ${triangles[i].getNom()}.<br>`
					texte_corr += mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: .5, pixelsParCm: 20 }, ...objets[i])
					break
				case 2:
					d[i] = mediatrice(A[i], B[i], true, 'blue')
					d[i].epaisseur = 1
					c[i] = codageMediatrice(A[i], B[i])
					objets[i] = [A[i], B[i], C[i], t[i], d[i], n[i], c[i]]
					texte_corr = `La droite tracée est la médiatrice du segment [$${sommets[i][0]}${sommets[i][1]}]$.<br>`
					texte_corr += mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: .5, pixelsParCm: 20 }, ...objets[i], constructionMediatrice(A[i], B[i], true, 'gray', '×', '||', 'blue', 1))
					break
				case 3:
					d[i] = medianeTriangle(C[i], B[i], A[i], 'blue')
					d[i].epaisseur = 1
					c[i] = codageMedianeTriangle(C[i], B[i], A[i], color = 'black', mark = '//')
					objets[i] = [A[i], B[i], C[i], t[i], d[i], n[i], c[i]]
					texte_corr = `La droite tracée est la médiane issue de $${sommets[i][0]}$ dans le triangle ${triangles[i].getNom()}.<br>`
					texte_corr += mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: .5, pixelsParCm: 20 }, ...objets[i])
					break
				case 4:
					d[i] = bissectrice(A[i], B[i], C[i], 'blue')
					d[i].epaisseur = 1
					c[i] = codageBissectrice(A[i], B[i], C[i])
					objets[i] = [A[i], B[i], C[i], t[i], d[i], n[i], c[i]]
					texte_corr = `La droite tracée est la bissectrice de l'angle $\\widehat{${sommets[i][0]}${sommets[i][1]}${sommets[i][2]}}$.<br>`
					texte_corr += mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: .5, pixelsParCm: 20 }, ...objets[i], constructionBissectrice(A[i], B[i], C[i], detail = false, color = 'red', mark = '×', tailleLosange = 3, couleurBissectrice = 'blue', epaiseurBissectrice = 1))
					break

			}

			texte = `Quelle est la nature de la droite tracée en bleu pour le triangle ${triangles[i].getNom()} ?<br>` + mathalea2d({ xmin: -3, ymin: -3, xmax: 8, ymax: 8, scale: .5, pixelsParCm: 20 }, ...objets[i])

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
			}
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Type de droites', 3, "1 : Hauteurs et Médiatrices\n2 : Médianes et Bissectrices\n3 : Toutes les droites"]
}
