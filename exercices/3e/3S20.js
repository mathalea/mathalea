import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,fraction_simplifiee,tex_fraction_reduite,simplification_de_fraction_avec_etapes,prenomF,prenomM,tex_fraction,num_alpha,ppcm,} from "/modules/outils.js"



/**
 * Calculs de probabilités sur une expérience aléatoire à deux épreuves
 * @Auteur Jean-Claude Lhote
 * 3S20
 */
export default function fonctions_probabilite2() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des probabilités dans une expérience aléatoire à deux épreuves";
	this.consigne = "";
	this.nb_questions = 2;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html ? this.spacing = 2 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.sup = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_index_disponibles = [0, 1, 2, 3];
		let liste_index = combinaison_listes(liste_index_disponibles, this.nb_questions);
		let qualites = [[]];
		let Initiale = [];
		let Couleurs = [`red`, `green`, `blue`, `gray`, `brown`, `orange`, `magenta`, `pink`, `black`, `lightgray`];
		qualites[0] = ['à la fraise', 'à la vanille', 'à l\'abricot', 'à la cerise', 'à la banane'];
		qualites[1] = ['trèfle', 'carreau', 'coeur', 'pique'];
		qualites[2] = ['rouges', 'vertes', 'bleues', 'noires', 'blanches'];
		qualites[3] = ['gris', 'cyans', 'roses', 'jaunes', 'violets'];
		qualites[4] = ['rouges', 'verts', 'bleus', 'noirs', 'jaunes'];
		qualites[5] = ['rouges', 'verts', 'bleus', 'noirs', 'blancs'];
		qualites[6] = ['rouges', 'verts', 'bleus', 'noirs', 'jaunes'];
		for (let i = 0, p, q, r,e,f,g, somme1, somme2, quidame, quidam, n = [], m = [], fra1 = [], fra2 = [], p1 = [], p2 = [], p3 = [], den, trouve, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			quidame = prenomF();
			quidam = prenomM();
			switch (liste_index[i]) {
				case 0:
					Initiale[0] = `F`;
					Initiale[1] = `V`;
					Initiale[2] = `A`;
					Initiale[3] = `C`;
					Initiale[4] = `B`;
					p = randint(0, 4);
					q = randint(0, 4, [p]);
					r = randint(0, 4, [p, q]);
					n[p] = randint(2, 5);
					n[q] = randint(1, 6) + 2;
					n[r] = randint(1, 3) * 2;

					// n[3]=randint(1,4)+2;
					// n[4]=randint(2,5);
					somme1 = n[p] + n[q] + n[r]; // +n[3]+n[4];
					texte = `Dans le frigo il y a ${somme1} yaourts. ${n[p]} sont ${qualites[0][p]}, ${n[q]} sont ${qualites[0][q]} et ${n[r]} sont ${qualites[0][r]}.<br>`; //  ${n[3]} sont ${qualites[index1][3]} et ${n[4]} sont ${qualites[index1][4]}.<br> `;
					texte += `${quidame} en choisit un au hasard. Son frère ${quidam} en choisit un au hasard à son tour.<br>`;
					texte += num_alpha(0) + ` Combien d'issues possède cette experience aléatoire ? donne un exemple d'issue.<br>`;
					texte += num_alpha(1) + ` Est-ce une expérience en situation d'équiprobabilité ? Justifie.<br>`;
					texte += num_alpha(2) + ` Calcule la probabilité que ${quidame} et ${quidam} aient choisi tous les deux un yaourt ${qualites[0][p]}.<br>`;
					texte += num_alpha(3) + ` Calcule la probabilité qu'ils aient choisi des yaourts aux parfums identiques.<br>`;
					texte += num_alpha(4) + ` Calcule la probabilité qu'ils aient choisi des yaourts aux parfums différents.<br>`;
					texte_corr = ``;
					texte_corr += num_alpha(0) + ` ${quidame} peut avoir choisi un yaourt ${qualites[0][p]}, ${qualites[0][q]} ou ${qualites[0][r]}. Une fois qu'elle a choisi, et comme il y a au moins 2 yaourts de chaque sorte, ${quidam} a les mêmes 3 possibilités. Il y a donc $3\\times3=9$ issues possibles.<br>`;
					texte_corr += `Par exemple : ${quidame} a pris un yaourt ${qualites[0][p]} et ${quidam} un yaourt ${qualites[0][q]}. Ce qu'on peut noter (${Initiale[p]},${Initiale[q]}).<br>`;
					texte_corr += `Les 9 issues sont : `;
					for (let j of [p, q, r])
						for (let k of [p, q, r])
							texte_corr += `(${Initiale[j]},${Initiale[k]}) `;
					texte_corr += `<br>`;
					if (n[0] == n[1] && n[1] == n[2]) {
						texte_corr += num_alpha(1) + ` Comme le nombre de yaourts de chaque sorte est le même, alors ${quidame} a la même probabilité de choisir n'importe quel parfum, mais ensuite son frère aura un yaourt de moins de l'un des parfums. Il est donc moins probable qu'il choisisse le même parfum que sa soeur que l'un des deux autres parfums.<br>`;
						texte_corr += `l\'issue (${Initiale[p]},${Initiale[p]}) est donc moins probable que l'issue (${Initiale[p]},${Initiale[q]}). Ce n'est donc pas une situation d'équiprobabilité.`;
					}
					else {
						texte_corr += num_alpha(1) + ` Comme le nombre de yaourt est différent d'un parfum à l'autre, ${quidame} n'a pas la même probabilité de choisir n'importe quel parfum. On en déduit qu' il est impossible que les issues (${Initiale[p]},${Initiale[p]}), (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}) aient la même probabilité.<br>`;
					}
					texte_corr += num_alpha(2) + ` Il y a ${n[p]} yaourts ${qualites[0][p]}, et ${somme1} yaourts en tout, la probabilité que ${quidame} choisisse un yaourt ${qualites[0][p]} est de : $${tex_fraction(n[p], somme1)}${simplification_de_fraction_avec_etapes(n[p], somme1)}$.<br>`;
					texte_corr += `Ensuite il reste ${n[p] - 1} yaourts ${qualites[0][p]} pour ${quidam} sur un total de ${somme1 - 1} yaourts.<br> La probabilité qu'il choisisse à son tour et dans ces conditions ce parfum est de $${tex_fraction(n[p] - 1, somme1 - 1)}${simplification_de_fraction_avec_etapes(n[p] - 1, somme1 - 1)}$.<br>`;
					texte_corr += `La probabilité de l'issue (${Initiale[p]},${Initiale[p]}) est le produit de ces deux probabilités, donc : $${tex_fraction(n[p], somme1)}\\times${tex_fraction(n[p] - 1, somme1 - 1)}=${tex_fraction(n[p] * (n[p] - 1), somme1 * (somme1 - 1))}${simplification_de_fraction_avec_etapes(n[p] * (n[p] - 1), somme1 * (somme1 - 1))}$.<br>`;
					texte_corr += num_alpha(3) + ` a probabilité des issues (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}) peuvent être calculées de la même façon qu'au 3) :<br>`;
					texte_corr += `$${tex_fraction(n[q], somme1)}\\times${tex_fraction(n[q] - 1, somme1 - 1)}=${tex_fraction(n[q] * (n[q] - 1), somme1 * (somme1 - 1))}$.<br>`;
					texte_corr += `$${tex_fraction(n[r], somme1)}\\times${tex_fraction(n[r] - 1, somme1 - 1)}=${tex_fraction(n[r] * (n[r] - 1), somme1 * (somme1 - 1))}$.<br>`;
					texte_corr += `La probabilité qu'ils choisissent le même parfum est la somme des probabilités des issues (${Initiale[p]},${Initiale[p]}), (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}), soit :<br>`;
					texte_corr += `$${tex_fraction(n[p] * (n[p] - 1), somme1 * (somme1 - 1))}+${tex_fraction(n[q] * (n[q] - 1), somme1 * (somme1 - 1))}+${tex_fraction(n[r] * (n[r] - 1), somme1 * (somme1 - 1))}=${tex_fraction(n[p] * (n[p] - 1) + n[q] * (n[q] - 1) + n[r] * (n[r] - 1), somme1 * (somme1 - 1))}${simplification_de_fraction_avec_etapes(n[p] * (n[p] - 1) + n[q] * (n[q] - 1) + n[r] * (n[r] - 1), somme1 * (somme1 - 1))}$<br>`;
					texte_corr += num_alpha(4) + ` choisir des parfums différents est l'événement contraire de l'événement dont on a calculé la probabilité à la question 4).<br>`;
					fra1 = fraction_simplifiee(n[p] * (n[p] - 1) + n[q] * (n[q] - 1) + n[r] * (n[r] - 1), somme1 * (somme1 - 1));
					texte_corr += `La probabilité de cet événement est donc : $1-${tex_fraction(fra1[0], fra1[1])}=${tex_fraction(fra1[1], fra1[1])}-${tex_fraction(fra1[0], fra1[1])}=${tex_fraction(fra1[1] - fra1[0], fra1[1])}${simplification_de_fraction_avec_etapes(fra1[1] - fra1[0], fra1[1])}$`;
					break;
				case 1:
					p = randint(0, 3);
					if (randint(0, 1) == 0)
						q = 32;
					else
						q = 52;
					r = Math.floor(q / 33);
					Initiale[0] = choice([`sept`, `huit`, `neuf`, `dix`, `valet`, `roi`, `as`]);
					Initiale[1] = choice([`deux`, `trois`, `quatre`, `cinq`, `six`, `sept`, `huit`, `neuf`, `dix`, `valet`, `roi`, `as`]);
					texte = `On considère l'expérience consistant à tirer deux cartes dans un jeu de ${q} cartes.<br>`;
					texte += `Partie 1 : On effectue le tirage de la deuxième carte après remise de la première dans le jeu.<br>`;
					texte += num_alpha(0) + ` Quelle est la probabilité de tirer 2 cartes de la même couleur (Rouge/Rouge ou Noire/Noire)?<br>`;
					texte += num_alpha(1) + ` Quelle est la probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`)
						texte += `s`;
					texte += ` ?<br>`;
					texte += num_alpha(2) + ` Quelle est la probabilité de tirer 2 carte de ${qualites[1][p]} ?<br>`;
					texte += `Partie 2 : On effectue le tirage de la deuxième carte sans remise de la première dans le jeu.<br>`;
					texte += `	Reprendre les 3 questions de la partie 1 dans cette nouvelle expérience.`;
					texte_corr = `Partie 1.<br>	`;
					texte_corr += num_alpha(0) + ` On ne s'intéresse ici qu'au tirage de la deuxième carte. En effet pour réaliser l'événement, il faudra que cette carte soit de la même couleur que la première. Il y a deux couleurs rouge et noire et le nombre de carte rouge est le même que le nombre de carte noire : ${q / 2}.<br>`;
					texte_corr += `	La probabilité que la deuxième carte soit de la même couleur que la première est donc : $${tex_fraction(q / 2, q)}=${tex_fraction(1, 2)}$.<br>`;
					texte_corr += num_alpha(1) + ` Il y a 4 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`)
						texte += `s`;
					texte_corr += ` dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${Initiale[r]} est donc de $${tex_fraction(4, q)}=${tex_fraction_reduite(4, q)}$.<br>`;
					texte_corr += `	Comme la deuxième carte est tirée dans le jeu complet (après remise de la première) la probabilité de tirer un ${Initiale[r]} est la même pour cette carte.<br>`;
					texte_corr += `	La probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`)
						texte += `s`;
					texte_corr += ` est donc : $${tex_fraction_reduite(4, q)}\\times${tex_fraction_reduite(4, q)}=${tex_fraction_reduite(16, q * q)}$.<br>`;
					texte_corr += num_alpha(2) + ` Il y a ${q / 4} cartes de ${qualites[1][p]} dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${qualites[1][p]} est donc de $${tex_fraction(q / 4, q)}=${tex_fraction(1, 4)}$.<br>`;
					texte_corr += `	Comme la deuxième carte est tirée dans le jeu complet (après remise de la première) la probabilité de tirer un ${qualites[1][p]} est la même pour cette carte.<br>`;
					texte_corr += `	La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1, 4)}\\times${tex_fraction(1, 4)}=${tex_fraction(1, 16)}$.<br>`;
					texte_corr += `Partie 2.<br>`;
					texte_corr += num_alpha(0) + ` On ne s'intéresse ici qu'au tirage de la deuxième carte. En effet pour réaliser l'événement, il faudra que cette carte soit de la même couleur que la première. Il y a maintenant une carte en moins dans la couleur désirée soit  ${q / 2 - 1} et il y a une carte en moins dans le jeu soit ${q - 1}.<br>`;
					texte_corr += `	La probabilité que la deuxième carte soit de la même couleur que la première est donc : $${tex_fraction(q / 2 - 1, q - 1)}$.<br>`;
					texte_corr += num_alpha(1) + ` Il y a 4 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`)
						texte += `s`;
					texte_corr += ` dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${Initiale[r]} est donc de $${tex_fraction(4, q)}=${tex_fraction_reduite(4, q)}$.<br>`;
					texte_corr += `	Pour que l'événement se réalise la deuxième carte est tirée dans les ${q - 1} cartes restantes dans lesquelles il manque un ${Initiale[r]}.<br>`;
					texte_corr += `	La probabilité de tirer un deuxième ${Initiale[r]} est donc : $${tex_fraction(3, q - 1)}$`;
					if (q == 52)
						texte_corr += `$=${tex_fraction(1, 17)}$.`;
					texte_corr += `<br> La probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`)
						texte += `s`;
					texte_corr += ` est donc : $${tex_fraction_reduite(4, q)}\\times${tex_fraction_reduite(3, q - 1)}=${tex_fraction_reduite(12, q * (q - 1))}$.<br>`;
					texte_corr += num_alpha(2) + ` Il y a ${q / 4} cartes de ${qualites[1][p]} dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${qualites[1][p]} est donc de $${tex_fraction(q / 4, q)}=${tex_fraction(1, 4)}$.<br>`;
					texte_corr += `	Pour que l'événement se réalise la deuxième carte est tirée dans les ${q - 1} cartes restantes dans lesquelles il manque un ${qualites[1][p]}.<br>`;
					texte_corr += `	La probabilité de tirer un deuxième ${qualites[1][p]} est donc : $${tex_fraction(q / 4 - 1, q - 1)}$`;
					if (q == 52)
						texte_corr += `$=${tex_fraction(4, 17)}$<br>La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1, 4)}\\times${tex_fraction(4, 17)}=${tex_fraction(1, 17)}$.`;
					else
						texte_corr += `<br>La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1, 4)}\\times${tex_fraction_reduite(7, 31)}=${tex_fraction(7, 124)}$`;
					break;
				case 2:
					n[0] = randint(2, 5); m[0] = randint(2, 5);
					n[1] = randint(1, 6) + 1; m[1] = randint(1, 6) + 1;
					n[2] = randint(1, 3) * 2; m[2] = randint(1, 3) * 2;
					n[3] = randint(1, 4) + 2; m[3] = randint(1, 4) + 2;
					n[4] = randint(2, 5); m[4] = randint(2, 5);
					somme1 = n[0] + n[1] + n[2] + n[3] + n[4];
					somme2 = m[0] + m[1] + m[2] + m[3] + m[4];
					r = randint(0, 4);
					p = randint(0, 4, [r]);
					q = randint(0, 4, [p, r]);
					texte = `Dans sa commode, ${quidam} a mis dans le premier tiroir des paires de chaussettes. Il y a `;
					for (let j = 0; j < 3; j++) {
						texte += `${n[j]} paires de chaussettes ${qualites[2][j]}, `;
					}
					texte += `${n[3]} paires de chaussettes ${qualites[2][3]} et ${n[4]} paires de chaussettes ${qualites[2][4]}.<br>`;
					texte += `Dans le deuxième tiroir, ${quidam} a mis des T-shirt. Il y a `;
					for (let j = 0; j < 3; j++) {
						texte += `${m[j]} T-shirts ${qualites[5][j]}, `;
					}
					texte += `${m[3]} T-shirts ${qualites[5][3]} et ${m[4]} T-shirts ${qualites[5][4]}.<br>`;
					texte += `Un matin, il y a une panne de courant et ${quidam} prend au hasard une paire de chaussettes dans le premier tiroir et un T-shirt dans le deuxième.<br>`;
					texte += num_alpha(0) + ` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt ${qualites[2][r]} ?<br>`;
					texte += num_alpha(1) + ` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt de la même couleur ?<br>`;
					texte += num_alpha(2) + ` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt de couleurs différentes ?`;
					texte_corr = num_alpha(0) + ` Il y a ${n[r]} paires de chaussettes ${qualites[2][r]} et il y a ${somme1} paires de chaussettes possibles. `;
					texte_corr += `La probabilité de chosir une paire de chaussettes ${qualites[2][r]} est de : $${tex_fraction(n[r], somme1)}${simplification_de_fraction_avec_etapes(n[r], somme1)}$.<br>`;
					texte_corr += `Il y a ${m[r]} T-shirts ${qualites[5][r]} et il y a ${somme2} T-shirts possibles. `;
					texte_corr += `La probabilité de chosir un des T-shirt ${qualites[5][r]} est de : $${tex_fraction(m[r], somme2)}${simplification_de_fraction_avec_etapes(m[r], somme2)}$.<br>`;
					texte_corr += `${quidam} a donc $${tex_fraction_reduite(m[r], somme2)}$ de `;
					fra1 = fraction_simplifiee(n[r], somme1);
					fra2 = fraction_simplifiee(m[r], somme2);
					if (fra1[0] == 1)
						texte_corr += `une chance `;
					else
						texte_corr += `$${fra1[0]}$ chances `;
					texte_corr += `sur $${fra1[1]}$ de choisir des chaussettes et un T-shirt ${qualites[5][r]}.<br>`;
					texte_corr += `Soit $${tex_fraction_reduite(m[r], somme2)}\\times${tex_fraction_reduite(n[r], somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${tex_fraction(fra1[0] * fra2[0], fra1[1] * fra2[1])}${simplification_de_fraction_avec_etapes(fra1[0] * fra2[0], fra1[1] * fra2[1])}$.<br>`;
					p1 = fraction_simplifiee(fra1[0] * fra2[0], fra1[1] * fra2[1]);
					fra1 = fraction_simplifiee(n[p], somme1);
					fra2 = fraction_simplifiee(m[p], somme2);
					texte_corr += num_alpha(1) + ` La probabilité de chosir une paire de chaussettes ${qualites[2][p]} est de : $${tex_fraction(n[p], somme1)}${simplification_de_fraction_avec_etapes(n[p], somme1)}$ et `;
					texte_corr += `la probabilité de chosir l'un des T-shirt ${qualites[5][p]} est de : $${tex_fraction(m[p], somme2)}${simplification_de_fraction_avec_etapes(m[p], somme2)}$.<br>`;
					texte_corr += `Donc la probabilité de chosir des chaussettes un T-shirt ${qualites[5][p]} est de : $${tex_fraction_reduite(m[p], somme2)}\\times${tex_fraction_reduite(n[p], somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${tex_fraction(fra1[0] * fra2[0], fra1[1] * fra2[1])}${simplification_de_fraction_avec_etapes(fra1[0] * fra2[0], fra1[1] * fra2[1])}$.<br>`;
					p2 = fraction_simplifiee(fra1[0] * fra2[0], fra1[1] * fra2[1]);
					fra1 = fraction_simplifiee(n[q], somme1);
					fra2 = fraction_simplifiee(m[q], somme2);
					texte_corr += `La probabilité de chosir une paire de chaussettes ${qualites[2][q]} est de : $${tex_fraction(n[q], somme1)}${simplification_de_fraction_avec_etapes(n[q], somme1)}$ et `;
					texte_corr += `la probabilité de chosir l'un des T-shirt ${qualites[5][q]} est de : $${tex_fraction(m[q], somme2)}${simplification_de_fraction_avec_etapes(m[q], somme2)}$.<br>`;
					texte_corr += `Donc la probabilité de chosir des chaussettes un T-shirt ${qualites[5][q]} est de : $${tex_fraction_reduite(m[q], somme2)}\\times${tex_fraction_reduite(n[q], somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${tex_fraction(fra1[0] * fra2[0], fra1[1] * fra2[1])}${simplification_de_fraction_avec_etapes(fra1[0] * fra2[0], fra1[1] * fra2[1])}$.<br>`;
					p3 = fraction_simplifiee(fra1[0] * fra2[0], fra1[1] * fra2[1]);
					texte_corr += `On en déduit que la probabilité de choisir des chaussettes et un T-shirt de la même couleur est :<br>`;
					texte_corr += `$${tex_fraction(p1[0], p1[1])}+${tex_fraction(p2[0], p2[1])}+${tex_fraction(p3[0], p3[1])}=`;
					if (p1[1] == p2[1] && p2[1] == p3[1]) {
						texte_corr += `\\dfrac{${p1[0]}+${p2[0]}+${p3[0]}}{${p1[1]}}=${tex_fraction(p1[0] + p2[0] + p3[0], p1[1])}${simplification_de_fraction_avec_etapes(p1[0] + p2[0] + p3[0], p1[1])}$<br>`;
						fra1 = fraction_simplifiee(p1[0] + p2[0] + p3[0], p1[1]);
					}
					else {
						den = ppcm(p1[1], ppcm(p2[1], p3[1]));
						e = den / p1[1], f = den / p2[1], g = den / p3[1];
						texte_corr += `${tex_fraction(p1[0] * e, den)}+${tex_fraction(p2[0] * f, den)}+${tex_fraction(p3[0] * g, den)}=${tex_fraction(p1[0] * e + p2[0] * f + p3[0] * g, den)}${simplification_de_fraction_avec_etapes(p1[0] * e + p2[0] * f + p3[0] * g, den)}$<br>`;
						fra1 = fraction_simplifiee(p1[0] * e + p2[0] * f + p3[0] * g, den);
					}
					texte_corr += num_alpha(2) + ` L'événement \"choisir des chaussettes et un T-shirt de couleurs différentes\" est l'événement contraire de l'événement \"choisir des chaussettes et un T-shirt de même couleur\".<br>`;
					texte_corr += `Donc sa probabilité est : $1-${tex_fraction(fra1[0], fra1[1])}=\\dfrac{${fra1[1]}-${fra1[0]}}{${fra1[1]}}=${tex_fraction(fra1[1] - fra1[0], fra1[1])}${simplification_de_fraction_avec_etapes(fra1[1] - fra1[0], fra1[1])}$<br>`;
					break;
				case 3:
					quidam = prenomM();
					quidame = prenomF();
					p = choice([4, 6, 8, 10, 12]);
					q = choice([4, 6, 8, 10, 12], [p]);
					n[0] = Math.min(p, q); // petit dé de quidam
					m[0] = Math.max(p, q); // grand dé de quidam
					p1[0] = n[0] * m[0]; // nombre de couples pour quidam
					p = choice([4, 6, 8, 12]);
					q = choice([4, 6, 8, 12], [p]);
					n[1] = Math.min(p, q); // petit dé de quidame
					m[1] = Math.max(p, q); // grand dé de quidame
					p1[1] = n[1] * m[1]; // nombre de couples pour quidame
					somme1 = n[0] + m[0]; // maximum pour quidam
					somme2 = n[1] + m[1]; // maximum pour quidame
					r = Math.min(somme1, somme2); // Plus grand résultat commun.
					for (let j = 0; j < n[0] + m[0] - 1; j++)
						fra1[j] = 0;
					for (let j = 1; j <= n[0]; j++) {
						for (let k = 1; k <= m[0]; k++) {
							fra1[j + k - 2]++; // numérateurs de probas pour quidam = nombre d'occurences des différents résultats possibles
						}
					}
					for (let j = 0; j < n[1] + m[1] - 1; j++)
						fra2[j] = 0;
					for (let j = 1; j <= n[1]; j++) {
						for (let k = 1; k <= m[1]; k++) {
							fra2[j + k - 2]++; // numérateurs de probas pour quidame = nombre d'occurences des différents résultats possibles
						}
					}
					for (let j = 0; j < r - 1; j++) {
						p2[j] = fra2[j] / p1[1] - fra1[j] / p1[0]; // différence entre les probas de l'un et de l'autre (positif si Quidame a plus de chance...)
					}

					texte = `${quidam} dispose d'un dé à ${n[0]} faces numérotées de 1 à ${n[0]} et d'un dé à ${m[0]} faces numérotées de 1 à ${m[0]}.<br>`;
					texte += `Il lance ses deux dés et en fait la somme.<br>`;
					texte += num_alpha(0) + ` Reporte dans un tableau les issues possibles de cette expérience aléatoire et leurs probabilités respectives.<br>`;
					texte += num_alpha(1) + ` ${quidame} dispose d'un dé à ${n[1]} faces numérotées de 1 à ${n[1]} et d'un dé à ${m[1]} faces numérotées de 1 à ${m[1]}.<br>`;
					texte += `Elle décide de proposer un défi à ${quidam} : \"On choisit un nombre cible entre 2 et ${r}, on lance nos deux dés en même temps. Le premier dont la somme des dés est la cible a gagné.\"<br>`;
					texte += num_alpha(2) + ` ${quidam} qui connaît les probabilités calculées au 1) propose alors de choisir ${n[0] + 1} comme nombre cible. Il pense avoir plus de chances de gagner que ${quidame}. A-t-il raison ?<br>`;
					texte += `Si oui, quel nombre doit choisir ${quidame} pour avoir un défi qui lui soit favorable et si non, y a-t-il un meilleur choix pour ${quidam} ?<br>`;
					texte += num_alpha(3) + ` Y a-t-il un nombre cible qui donne un jeu équitable où chacun aura la même probabilité de gagner ?<br>`;
					texte += `$\\textit {Exercice inspiré des problèmes DuDu (mathix.org)}$`;
					texte_corr = num_alpha(0) + ` les différents résultats de l\'éxpérience de ${quidam} sont présentés dans cette table :<br>`;
					// tableau d'addition des dé
					texte_corr += '$\\def\\arraystretch{1.5}\\begin{array}{|c';
					for (let j = 0; j <= m[0]; j++)
						texte_corr += `|c`;
					texte_corr += '} \\hline  \\text{Dé 1/Dé 2}';
					for (let j = 1; j <= m[0]; j++)
						texte_corr += `&` + j;
					for (let k = 1; k <= n[0]; k++) {
						texte_corr += ` \\\\\\hline ` + k;
						for (let j = 1; j <= m[0]; j++)
							texte_corr += `& \\textcolor {${Couleurs[(j + k) % 10]}}{${j + k}}`;
					}
					texte_corr += `\\\\\\hline\\end{array}$<br>`;
					// fin du tableau
					texte_corr += `Les probabilités de chaque issue sont données par ce tableau :<br>`;
					// tableau des probas
					texte_corr += '$\\def\\arraystretch{2.5}\\begin{array}{|c';
					for (let j = 1; j <= somme1; j++)
						texte_corr += `|c`;
					texte_corr += '} \\hline  \\text{résultats}';
					for (let j = 2; j <= somme1; j++)
						texte_corr += `&` + j;
					texte_corr += ` \\\\\\hline \\text{Probabilité}`;
					for (let j = 2; j <= somme1; j++)
						texte_corr += `& \\textcolor {${Couleurs[j % 10]}}` + `{\\dfrac{${fra1[j - 2]}}{${p1[0]}}}`;

					texte_corr += `\\\\\\hline\\end{array}$<br>`;
					// fin du tableau
					texte_corr += num_alpha(1) + ` Les probabilités en ce qui concerne ${quidame} sont données par le tableau ci-dessous :<br>`;
					// tableau des probas pour quidame
					texte_corr += '$\\def\\arraystretch{2.5}\\begin{array}{|c';
					for (let j = 1; j <= somme2; j++)
						texte_corr += `|c`;
					texte_corr += '} \\hline  \\text{Résultats}';
					for (let j = 2; j <= somme2; j++)
						texte_corr += `&` + j;
					texte_corr += ` \\\\\\hline \\text{Probabilité}`;
					for (let j = 2; j <= somme2; j++)
						texte_corr += `& \\textcolor {${Couleurs[j % 10]}}` + `{\\dfrac{${fra2[j - 2]}}{${p1[1]}}}`;
					texte_corr += `\\\\\\hline\\end{array}$<br>`;

					texte_corr += `La probabilité qu'a ${quidame} de faire ${n[0] + 1} est : $\\textcolor {${Couleurs[(n[0] + 1) % 10]}}{${tex_fraction(fra2[n[0] - 1], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[n[0] - 1], p1[1])}$.<br>`;
					texte_corr += `La probabilité qu'a ${quidam} de faire ${n[0] + 1} est : $\\textcolor {${Couleurs[(n[0] + 1) % 10]}}{${tex_fraction(fra1[n[0] - 1], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[n[0] - 1], p1[0])}$.<br>`;
					if (p2[n[0] - 1] > 0) { // Si quidame a plus de chance de gagner avec le choix de quidam
						texte_corr += `${quidam} se trompe en croyant avoir plus de chances de gagner car $${tex_fraction_reduite(fra2[n[0] - 1], p1[1])}>${tex_fraction_reduite(fra1[n[0] - 1], p1[0])}$.<br>`;
						// choix du nombre cible qui favorise quidam
						trouve = false;
						for (let j = r - 2; j >= 0; j--) {
							if (p2[j] < 0) {
								texte_corr += num_alpha(2) + ` ${quidam} aurait du choisir ${j + 2} comme nombre cible.<br> Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra1[j], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j], p1[0])}$ et celle de ${quidame} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra2[j], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j], p1[1])}$.<br>`;
								trouve = true;
							}
							if (trouve == true)
								break;
						}
						if (trouve == false) {
							texte_corr += num_alpha(2) + ` Il n'existe pas de choix qui permette à ${quidam} d'avoir plus de chance que ${quidame} de gagner.`;
						}
					}
					else // quidam a plus de chances de gagner
						if (p2[n[0] - 1] < 0) {
							texte_corr += `${quidam} a raison de penser avoir plus de chances de gagner car $${tex_fraction_reduite(fra2[n[0] - 1], p1[1])}<${tex_fraction_reduite(fra1[n[0] - 1], p1[0])}$.<br>`;
							// choix du nombre cible qui favorise quidame
							trouve = false;
							for (let j = r - 2; j >= 0; j--) {
								if (p2[j] > 0) {
									texte_corr += num_alpha(2) + ` ${quidame} devrait choisir ${j + 2} comme nombre cible.<br>Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra2[j], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j], p1[1])}$<br>Celle de ${quidam} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra1[j], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j], p1[0])}$ et $${tex_fraction_reduite(fra1[j], p1[0])}<${tex_fraction(fra2[j], p1[1])}.$<br>`;
									trouve = true;
								}
								if (trouve == true)
									break;
							}
							if (trouve == false) {
								texte_corr += num_alpha(2) + ` Il n'existe pas de choix qui permette à ${quidame} d'avoir plus de chance que ${quidam} de gagner.<br>`;
							}
						}


						// Ils ont autant de chances de gagner l'un que l'autre
						else {
							texte_corr += `${quidam} et ${quidame} ont autant de chances de gagner car ils ont tous deux la même probabilité de faire ${n[0] + 1}, ce qui répond à la question ${num_alpha(3)}.<br>`;
							// choix du nombre cible qui favorise quidam
							trouve = false;
							for (let j = r - 2; j >= 0; j--) {
								if (p2[j] < 0) {
									texte_corr += num_alpha(2) + ` ${quidam} aurait du choisir ${j + 2} comme nombre cible.<br> Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra1[j], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j], p1[0])}$ et celle de ${quidame} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra2[j], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j], p1[1])}$.<br>`;
									trouve = true;
								}
								if (trouve == true)
									break;
							}
							if (trouve == false) {
								texte_corr += num_alpha(2) + ` Il n'existe pas de choix qui permette à ${quidam} d'avoir plus de chance que ${quidame} de gagner.<br>`;
							}
						}
					if (p2[n[0] - 1] == 0) {
						texte_corr += num_alpha(3) + ` Il a été déjà répondu à cette question à la question ${num_alpha(1)}.<br>`;
					}
					else { // choix de la cible pour un jeu équitable
						trouve = false;
						for (let j = r - 2; j >= 0; j--) {
							if (p2[j] == 0) {
								texte_corr += num_alpha(3) + ` En choisissant ${j + 2} comme cible, ${quidam} et ${quidame} ont la même probabilité de gagner.<br>
								Pour ${quidam} la probabilité est : $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra1[j], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j], p1[0])}$ tout comme pour ${quidame} : $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra2[j], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j], p1[1])}$.<br>`;
								trouve = true;
							}
							if (trouve == true)
								break;
						}
						if (trouve == false) {
							texte_corr += num_alpha(3) + ` Il n'existe pas de choix qui permette à ${quidam}et à ${quidame} d'avoir la même probabilité de gagner car : <br>`;
							for (let j = 2; j < r / 2; j++) {
								texte_corr += `$\\textcolor {${Couleurs[(j) % 10]}}{${tex_fraction(fra1[j - 2], p1[0])}}\\ne \\textcolor {${Couleurs[(j) % 10]}}{${tex_fraction(fra2[j - 2], p1[1])}}$ ; `;
							}
							texte_corr += `et $\\textcolor {${Couleurs[(r / 2) % 10]}}{${tex_fraction(fra1[r / 2], p1[0])}}\\ne \\textcolor {${Couleurs[(r / 2) % 10]}}{${tex_fraction(fra2[r / 2], p1[1])}}$.`;
						}
					}
					break;
			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	};
}
