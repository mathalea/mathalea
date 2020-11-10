

/**
 * Calculs de probabilités sur une expérience aléatoire à deux épreuves
 * @Auteur Jean-Claude Lhote
 * 3S20
 */
function fonctions_probabilite2() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des probabilités dans une expérience aléatoire à deux épreuves";
	this.consigne = "";
	this.nb_questions = 2;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html ? this.spacing = 2 : this.spacing = 1.5;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.sup = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_index_disponibles = [0, 1, 2, 3];
		let liste_index = combinaison_listes(liste_index_disponibles, this.nb_questions)
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
		for (let i = 0, p, q, r, somme1, somme2, quidame, quidam, n = [], m = [], fra1 = [], fra2 = [], p1 = [], p2 = [], p3 = [], den, trouve, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
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
					somme1 = n[p] + n[q] + n[r];// +n[3]+n[4];
					texte = `Dans le frigo il y a ${somme1} yaourts. ${n[p]} sont ${qualites[0][p]}, ${n[q]} sont ${qualites[0][q]} et ${n[r]} sont ${qualites[0][r]}.<br>`;//  ${n[3]} sont ${qualites[index1][3]} et ${n[4]} sont ${qualites[index1][4]}.<br> `;
					texte += `${quidame} en choisit un au hasard. Son frère ${quidam} en choisit un au hasard à son tour.<br>`;
					texte += num_alpha(0) + ` Combien d'issues possède cette experience aléatoire ? donne un exemple d'issue.<br>`
					texte += num_alpha(1) + ` Est-ce une expérience en situation d'équiprobabilité ? Justifie.<br>`
					texte += num_alpha(2) + ` Calcule la probabilité que ${quidame} et ${quidam} aient choisi tous les deux un yaourt ${qualites[0][p]}.<br>`;
					texte += num_alpha(3) + ` Calcule la probabilité qu'ils aient choisi des yaourts aux parfums identiques.<br>`;
					texte += num_alpha(4) + ` Calcule la probabilité qu'ils aient choisi des yaourts aux parfums différents.<br>`;
					texte_corr = ``;
					texte_corr += num_alpha(0) + ` ${quidame} peut avoir choisi un yaourt ${qualites[0][p]}, ${qualites[0][q]} ou ${qualites[0][r]}. Une fois qu'elle a choisi, et comme il y a au moins 2 yaourts de chaque sorte, ${quidam} a les mêmes 3 possibilités. Il y a donc $3\\times3=9$ issues possibles.<br>`
					texte_corr += `Par exemple : ${quidame} a pris un yaourt ${qualites[0][p]} et ${quidam} un yaourt ${qualites[0][q]}. Ce qu'on peut noter (${Initiale[p]},${Initiale[q]}).<br>`;
					texte_corr += `Les 9 issues sont : `;
					for (const j of [p, q, r])
						for (const k of [p, q, r])
							texte_corr += `(${Initiale[j]},${Initiale[k]}) `;
					texte_corr += `<br>`
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
					if (randint(0, 1) == 0) q = 32;
					else q = 52;
					r = Math.floor(q / 33);
					Initiale[0] = choice([`sept`, `huit`, `neuf`, `dix`, `valet`, `roi`, `as`]);
					Initiale[1] = choice([`deux`, `trois`, `quatre`, `cinq`, `six`, `sept`, `huit`, `neuf`, `dix`, `valet`, `roi`, `as`]);
					texte = `On considère l'expérience consistant à tirer deux cartes dans un jeu de ${q} cartes.<br>`;
					texte += `Partie 1 : On effectue le tirage de la deuxième carte après remise de la première dans le jeu.<br>`;
					texte += num_alpha(0) + ` Quelle est la probabilité de tirer 2 cartes de la même couleur (Rouge/Rouge ou Noire/Noire)?<br>`;
					texte += num_alpha(1) + ` Quelle est la probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`) texte += `s`;
					texte += ` ?<br>`;
					texte += num_alpha(2) + ` Quelle est la probabilité de tirer 2 carte de ${qualites[1][p]} ?<br>`;
					texte += `Partie 2 : On effectue le tirage de la deuxième carte sans remise de la première dans le jeu.<br>`;
					texte += `	Reprendre les 3 questions de la partie 1 dans cette nouvelle expérience.`
					texte_corr = `Partie 1.<br>	`;
					texte_corr += num_alpha(0) + ` On ne s'intéresse ici qu'au tirage de la deuxième carte. En effet pour réaliser l'événement, il faudra que cette carte soit de la même couleur que la première. Il y a deux couleurs rouge et noire et le nombre de carte rouge est le même que le nombre de carte noire : ${q / 2}.<br>`;
					texte_corr += `	La probabilité que la deuxième carte soit de la même couleur que la première est donc : $${tex_fraction(q / 2, q)}=${tex_fraction(1, 2)}$.<br>`;
					texte_corr += num_alpha(1) + ` Il y a 4 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`) texte += `s`;
					texte_corr += ` dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${Initiale[r]} est donc de $${tex_fraction(4, q)}=${tex_fraction_reduite(4, q)}$.<br>`;
					texte_corr += `	Comme la deuxième carte est tirée dans le jeu complet (après remise de la première) la probabilité de tirer un ${Initiale[r]} est la même pour cette carte.<br>`;
					texte_corr += `	La probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`) texte += `s`;
					texte_corr += ` est donc : $${tex_fraction_reduite(4, q)}\\times${tex_fraction_reduite(4, q)}=${tex_fraction_reduite(16, q * q)}$.<br>`;
					texte_corr += num_alpha(2) + ` Il y a ${q / 4} cartes de ${qualites[1][p]} dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${qualites[1][p]} est donc de $${tex_fraction(q / 4, q)}=${tex_fraction(1, 4)}$.<br>`;
					texte_corr += `	Comme la deuxième carte est tirée dans le jeu complet (après remise de la première) la probabilité de tirer un ${qualites[1][p]} est la même pour cette carte.<br>`;
					texte_corr += `	La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1, 4)}\\times${tex_fraction(1, 4)}=${tex_fraction(1, 16)}$.<br>`;
					texte_corr += `Partie 2.<br>`;
					texte_corr += num_alpha(0) + ` On ne s'intéresse ici qu'au tirage de la deuxième carte. En effet pour réaliser l'événement, il faudra que cette carte soit de la même couleur que la première. Il y a maintenant une carte en moins dans la couleur désirée soit  ${q / 2 - 1} et il y a une carte en moins dans le jeu soit ${q - 1}.<br>`;
					texte_corr += `	La probabilité que la deuxième carte soit de la même couleur que la première est donc : $${tex_fraction(q / 2 - 1, q - 1)}$.<br>`;
					texte_corr += num_alpha(1) + ` Il y a 4 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`) texte += `s`;
					texte_corr += ` dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${Initiale[r]} est donc de $${tex_fraction(4, q)}=${tex_fraction_reduite(4, q)}$.<br>`;
					texte_corr += `	Pour que l'événement se réalise la deuxième carte est tirée dans les ${q - 1} cartes restantes dans lesquelles il manque un ${Initiale[r]}.<br>`;
					texte_corr += `	La probabilité de tirer un deuxième ${Initiale[r]} est donc : $${tex_fraction(3, q - 1)}$`;
					if (q == 52) texte_corr += `$=${tex_fraction(1, 17)}$.`
					texte_corr += `<br> La probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r] == `valet` || Initiale[r] == `roi`) texte += `s`;
					texte_corr += ` est donc : $${tex_fraction_reduite(4, q)}\\times${tex_fraction_reduite(3, q - 1)}=${tex_fraction_reduite(12, q * (q - 1))}$.<br>`;
					texte_corr += num_alpha(2) + ` Il y a ${q / 4} cartes de ${qualites[1][p]} dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${qualites[1][p]} est donc de $${tex_fraction(q / 4, q)}=${tex_fraction(1, 4)}$.<br>`;
					texte_corr += `	Pour que l'événement se réalise la deuxième carte est tirée dans les ${q - 1} cartes restantes dans lesquelles il manque un ${qualites[1][p]}.<br>`;
					texte_corr += `	La probabilité de tirer un deuxième ${qualites[1][p]} est donc : $${tex_fraction(q / 4 - 1, q - 1)}$`;
					if (q == 52) texte_corr += `$=${tex_fraction(4, 17)}$<br>La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1, 4)}\\times${tex_fraction(4, 17)}=${tex_fraction(1, 17)}$.`;
					else texte_corr += `<br>La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1, 4)}\\times${tex_fraction_reduite(7, 31)}=${tex_fraction(7, 124)}$`;
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
					if (fra1[0] == 1) texte_corr += `une chance `;
					else texte_corr += `$${fra1[0]}$ chances `;
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
						let e = den / p1[1], f = den / p2[1], g = den / p3[1];
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
					p1[1] = n[1] * m[1] // nombre de couples pour quidame
					somme1 = n[0] + m[0]; // maximum pour quidam
					somme2 = n[1] + m[1]; // maximum pour quidame
					r = Math.min(somme1, somme2) // Plus grand résultat commun.
					for (let j = 0; j < n[0] + m[0] - 1; j++) fra1[j] = 0;
					for (let j = 1; j <= n[0]; j++) {
						for (let k = 1; k <= m[0]; k++) {
							fra1[j + k - 2]++; // numérateurs de probas pour quidam = nombre d'occurences des différents résultats possibles
						}
					}
					for (let j = 0; j < n[1] + m[1] - 1; j++) fra2[j] = 0;
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
					for (let j = 0; j <= m[0]; j++)	texte_corr += `|c`;
					texte_corr += '} \\hline  \\text{Dé 1/Dé 2}';
					for (let j = 1; j <= m[0]; j++) 	texte_corr += `&` + j;
					for (let k = 1; k <= n[0]; k++) {
						texte_corr += ` \\\\\\hline ` + k;
						for (let j = 1; j <= m[0]; j++) texte_corr += `& \\textcolor {${Couleurs[(j + k) % 10]}}{${j + k}}`;
					}
					texte_corr += `\\\\\\hline\\end{array}$<br>`
					// fin du tableau
					texte_corr += `Les probabilités de chaque issue sont données par ce tableau :<br>`;
					// tableau des probas
					texte_corr += '$\\def\\arraystretch{2.5}\\begin{array}{|c';
					for (let j = 1; j <= somme1; j++)	texte_corr += `|c`;
					texte_corr += '} \\hline  \\text{résultats}';
					for (let j = 2; j <= somme1; j++) 	texte_corr += `&` + j;
					texte_corr += ` \\\\\\hline \\text{Probabilité}`;
					for (let j = 2; j <= somme1; j++) texte_corr += `& \\textcolor {${Couleurs[j % 10]}}` + `{\\dfrac{${fra1[j - 2]}}{${p1[0]}}}`;

					texte_corr += `\\\\\\hline\\end{array}$<br>`
					// fin du tableau
					texte_corr += num_alpha(1) + ` Les probabilités en ce qui concerne ${quidame} sont données par le tableau ci-dessous :<br>`;
					// tableau des probas pour quidame
					texte_corr += '$\\def\\arraystretch{2.5}\\begin{array}{|c';
					for (let j = 1; j <= somme2; j++)	texte_corr += `|c`;
					texte_corr += '} \\hline  \\text{Résultats}';
					for (let j = 2; j <= somme2; j++) 	texte_corr += `&` + j;
					texte_corr += ` \\\\\\hline \\text{Probabilité}`;
					for (let j = 2; j <= somme2; j++) texte_corr += `& \\textcolor {${Couleurs[j % 10]}}` + `{\\dfrac{${fra2[j - 2]}}{${p1[1]}}}`;
					texte_corr += `\\\\\\hline\\end{array}$<br>`

					texte_corr += `La probabilité qu'a ${quidame} de faire ${n[0] + 1} est : $\\textcolor {${Couleurs[(n[0] + 1) % 10]}}{${tex_fraction(fra2[n[0] - 1], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[n[0] - 1], p1[1])}$.<br>`;
					texte_corr += `La probabilité qu'a ${quidam} de faire ${n[0] + 1} est : $\\textcolor {${Couleurs[(n[0] + 1) % 10]}}{${tex_fraction(fra1[n[0] - 1], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[n[0] - 1], p1[0])}$.<br>`;
					if (p2[n[0] - 1] > 0) {// Si quidame a plus de chance de gagner avec le choix de quidam
						texte_corr += `${quidam} se trompe en croyant avoir plus de chances de gagner car $${tex_fraction_reduite(fra2[n[0] - 1], p1[1])}>${tex_fraction_reduite(fra1[n[0] - 1], p1[0])}$.<br>`
						// choix du nombre cible qui favorise quidam
						trouve = false;
						for (let j = r - 2; j >= 0; j--) {
							if (p2[j] < 0) {
								texte_corr += num_alpha(2) + ` ${quidam} aurait du choisir ${j + 2} comme nombre cible.<br> Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra1[j], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j], p1[0])}$ et celle de ${quidame} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra2[j], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j], p1[1])}$.<br>`
								trouve = true;
							}
							if (trouve == true) break;
						}
						if (trouve == false) {
							texte_corr += num_alpha(2) + ` Il n'existe pas de choix qui permette à ${quidam} d'avoir plus de chance que ${quidame} de gagner.`
						}
					}
					else // quidam a plus de chances de gagner
						if (p2[n[0] - 1] < 0) {
							texte_corr += `${quidam} a raison de penser avoir plus de chances de gagner car $${tex_fraction_reduite(fra2[n[0] - 1], p1[1])}<${tex_fraction_reduite(fra1[n[0] - 1], p1[0])}$.<br>`
							// choix du nombre cible qui favorise quidame
							trouve = false;
							for (let j = r - 2; j >= 0; j--) {
								if (p2[j] > 0) {
									texte_corr += num_alpha(2) + ` ${quidame} devrait choisir ${j + 2} comme nombre cible.<br>Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra2[j], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j], p1[1])}$<br>Celle de ${quidam} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra1[j], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j], p1[0])}$ et $${tex_fraction_reduite(fra1[j], p1[0])}<${tex_fraction(fra2[j], p1[1])}.$<br>`
									trouve = true;
								}
								if (trouve == true) break;
							}
							if (trouve == false) {
								texte_corr += num_alpha(2) + ` Il n'existe pas de choix qui permette à ${quidame} d'avoir plus de chance que ${quidam} de gagner.<br>`
							}
						}

						// Ils ont autant de chances de gagner l'un que l'autre
						else {
							texte_corr += `${quidam} et ${quidame} ont autant de chances de gagner car ils ont tous deux la même probabilité de faire ${n[0] + 1}, ce qui répond à la question ${num_alpha(3)}.<br>`
							// choix du nombre cible qui favorise quidam
							trouve = false;
							for (let j = r - 2; j >= 0; j--) {
								if (p2[j] < 0) {
									texte_corr += num_alpha(2) + ` ${quidam} aurait du choisir ${j + 2} comme nombre cible.<br> Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra1[j], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j], p1[0])}$ et celle de ${quidame} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra2[j], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j], p1[1])}$.<br>`
									trouve = true;
								}
								if (trouve == true) break;
							}
							if (trouve == false) {
								texte_corr += num_alpha(2) + ` Il n'existe pas de choix qui permette à ${quidam} d'avoir plus de chance que ${quidame} de gagner.<br>`
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
								Pour ${quidam} la probabilité est : $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra1[j], p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j], p1[0])}$ tout comme pour ${quidame} : $\\textcolor {${Couleurs[(j + 2) % 10]}}{${tex_fraction(fra2[j], p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j], p1[1])}$.<br>`
								trouve = true;
							}
							if (trouve == true) break;
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
	}
};


/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @Auteur Jean-Claude Lhote
 * Référence : 3F21
 */
function Lecture_expression_fonctions_affines() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une fonction affine";
	this.consigne = "Donner l'expression des fonctions représentées";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html ? this.spacing = 2 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.sup = 1;
	this.sup2 =3
	this.lineaire = false;
	this.liste_packages = 'tkz-euclide';


	this.nouvelle_version = function (numero_de_l_exercice) { // numero_de_l_exercice est 0 pour l'exercice 1
		let k = Math.pow(2, parseInt(this.sup) - 1);
		let nb_droites=parseInt(this.sup2)
		this.liste_questions = [];
		this.liste_corrections = [];
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		let h = Math.round(window.innerHeight * 0.7) //pour déterminer la hauteur du div 
		let liste_droites = [];
		let OrdX0;
		let Pente = [];
		if (!this.lineaire) {
			Pente.push(randint(-2 * k, 2 * k));
			Pente.push(randint(-2 * k, 2 * k, [Pente[0]]));
			Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1]]));
			Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1], Pente[2]]));
			Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1], Pente[2], Pente[3]]));
		}
		else {
			Pente.push(randint(-3 * k, 3 * k, [0]));
			Pente.push(randint(-3 * k, 3 * k, [Pente[0], 0]));
			Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], 0]));
			Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], Pente[2], 0]));
			Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], Pente[2], Pente[3], 0]));
		}

		for (let i = 0; i < 5; i++) {
			if (this.lineaire) OrdX0 = 0;
			else OrdX0 = randint(-1 + Pente[i] / k, 1 + Pente[i] / k)
			liste_droites.push([OrdX0, Pente[i] / k])
		}

		if (sortie_html) {
			const mon_svg = SVG().viewbox(0, 0, 500, 500).size('100%', '100%')
			SVG_repere(mon_svg, -5, 5, -5, 5, k, k, 500, 500, true);
			SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[0][0], liste_droites[0][1], 'blue', 'd1');
			if (nb_droites>1) SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[1][0], liste_droites[1][1], 'red', 'd2');
			if (nb_droites>2) SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[2][0], liste_droites[2][1], 'green', 'd3');
			if (nb_droites>3) SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[3][0], liste_droites[3][1], 'brown', 'd4');
			if (nb_droites>4) SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[4][0], liste_droites[4][1], 'purple', 'd5');
			this.consigne = `<div style="width: 50%; display : table ">${mon_svg.svg()}</div>`;



		}
		else { //sortie Latex 
			let texte = `\\begin{tikzpicture}`;
			texte += Latex_repere(-5, 5, -5, 5, k, k, true);
			texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[0][0], liste_droites[0][1], 'blue', 'd_1');
			if (nb_droites>1) texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[1][0], liste_droites[1][1], 'red', 'd_2');
			if (nb_droites>2) texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[2][0], liste_droites[2][1], 'green', 'd_3');
			if (nb_droites>3) texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[3][0], liste_droites[3][1], 'brown', 'd_4');
			if (nb_droites>4) texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[4][0], liste_droites[4][1], 'purple', 'd_5');
			texte += `\n\t \\end{tikzpicture}`;
			this.liste_questions.push(texte);
		}
		for (i = 0; i < nb_droites; i++) {
			this.liste_questions.push(`Déterminer l'expression de la fonction $f_${i + 1}$ représentée par la droite $d_${i + 1}$.`)
			if (this.lineaire || liste_droites[i][0] == 0) this.liste_corrections.push(`La droite $d_${i + 1}$ passe par l'origine et son coefficient directeur est $${tex_nombre(liste_droites[i][1])}$.<br>Elle représente la fonction linéaire $f_${i + 1}(x)=${reduire_ax_plus_b(liste_droites[i][1], 0)}$.`)
			else this.liste_corrections.push(`La droite $d_${i + 1}$ passe par le point de coordonnées $(0;${liste_droites[i][0]})$ et son coefficient directeur est $${tex_nombre(liste_droites[i][1])}$.<br>Elle représente la fonction affine $f_${i + 1}(x)=${reduire_ax_plus_b(liste_droites[i][1], liste_droites[i][0])}$.`)

		}

		liste_de_question_to_contenu_sans_numero(this);
		if (!this.lineaire) this.contenu_correction = `Il s’agit de fonctions affines, elles sont donc de la forme $f(x)=ax+b$, $b$ étant l’ordonnée à l’origine et $a$ la pente de la droite.\n` + this.contenu_correction;
		else this.contenu_correction = `Il s’agit de fonctions linéaires, elles sont donc de la forme $f(x)=ax$, $a$ étant la `+katex_Popup2(numero_de_l_exercice,1,`pente`,`pente d'une droite`,`La pente (le a de y=ax ou y=ax+b) d'une droite donne le taux d'accroissement de y par rapport à x : lorsque x augmente de 1, alors y augmente de a.`)+` de la droite.\n` + this.contenu_correction ;
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, "1 : Coefficient directeur entier\n2 : Coefficient directeur 'en demis'\n3 : Coefficient directeur 'en quarts'"];
	this.besoin_formulaire2_numerique =['Nombre de droites (1 à 5)',5];
}


/**
* Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique
*
* * Niveau 1 : Fonctions affines
* * Niveau 2 : Polynôme du second degré
* * Niveau 3 : Quotients de fonctions affines
* * Niveau 4 : (ax+b)(cx+d)
* * Niveau 5 : Mélange 
* @Auteur Rémi Angot
* 3F12-2
*/
function Image_fonction_algebrique() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique";
	this.consigne = "";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 5; // niveau de difficulté

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup == 1) {
			type_de_questions_disponibles = ['ax+b', 'ax-b', '-ax+b', '-ax-b'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['ax2+bx+c', 'ax2+c', 'ax2+bx', '-ax2+bx-c', '-ax2-bx-c', '-ax2-bx+c', '-ax2-bx'];
		}
		if (this.sup == 3) {
			type_de_questions_disponibles = ['a/cx+d', 'ax+b/cx+d'];
		}
		if (this.sup == 4) {
			type_de_questions_disponibles = ['(ax+b)(cx+d)', '(ax+b)2'];
		}
		if (this.sup == 5) {
			type_de_questions_disponibles = ['ax+b', 'ax-b', '-ax+b', 'ax2+bx+c', '-ax2+bx-c', '-ax2-bx', 'a/cx+d', 'ax+b/cx+d', '(ax+b)(cx+d)', '(ax+b)2'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_signes_de_x = combinaison_listes([true, false], this.nb_questions);
		for (let i = 0, texte, texte_corr, a, b, c, d, expression, nomdef, x, cpt = 0; i < this.nb_questions && cpt < 50;) {
			x = randint(1, 12);
			if (liste_de_signes_de_x[i]) {
				x = -1 * x;
			}
			a = randint(2, 11);
			b = randint(2, 11);
			c = randint(2, 11);
			nomdef = lettre_minuscule_depuis_chiffre(6 + i) // on commence par f puis on continue dans l'ordre alphabétique
			switch (liste_type_de_questions[i]) {
				case 'ax+b':
					expression = `${a}x+${b}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}+${b}=${a * x}+${b}=${a * x + b}$`
					break;
				case 'ax-b':
					expression = `${a}x-${b}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}-${b}=${a * x}-${b}=${a * x - b}$`
					break;
				case '-ax+b':
					expression = `-${a}x+${b}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}+${b}=${-1 * a * x}+${b}=${-1 * a * x + b}$`
					break;
				case '-ax-b':
					expression = `-${a}x-${b}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}-${b}=${-1 * a * x}-${b}=${-1 * a * x - b}$`
					break;
				case 'ax2+bx+c':
					expression = `${a}x^2+${b}x+${c}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}+${c}=${a}\\times${x * x}${ecriture_algebrique(b * x)}+${c}=${a * x * x}${ecriture_algebrique(b * x)}+${c}=${a * x * x + b * x + c}$`
					break;
				case 'ax2+c':
					expression = `${a}x^2+${c}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${c}=${a}\\times${x * x}+${c}=${a * x * x}+${c}=${a * x * x + c}$`
					break;
				case 'ax2+bx':
					expression = `${a}x^2+${b}x`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}=${a}\\times${x * x}${ecriture_algebrique(b * x)}=${a * x * x}${ecriture_algebrique(b * x)}=${a * x * x + b * x}$`
					break;
				case '-ax2+bx-c':
					expression = `-${a}x^2+${b}x-${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}-${c}=-${a}\\times${x * x}${ecriture_algebrique(b * x)}-${c}=${-1 * a * x * x}${ecriture_algebrique(b * x)}-${c}=${-1 * a * x * x + b * x - c}$`
					break;
				case '-ax2-bx-c':
					expression = `-${a}x^2-${b}x-${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}-${c}=-${a}\\times${x * x}${ecriture_algebrique(-1 * b * x)}-${c}=${-1 * a * x * x}${ecriture_algebrique(-1 * b * x)}-${c}=${-1 * a * x * x - b * x - c}$`
					break;
				case '-ax2-bx+c':
					expression = `-${a}x^2-${b}x+${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}+${c}=-${a}\\times${x * x}${ecriture_algebrique(-1 * b * x)}+${c}=${-1 * a * x * x}${ecriture_algebrique(-1 * b * x)}+${c}=${-1 * a * x * x - b * x + c}$`
					break;
				case '-ax2-bx':
					expression = `-${a}x^2-${b}x`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}=-${a}\\times${x * x}${ecriture_algebrique(-1 * b * x)}=${-1 * a * x * x}${ecriture_algebrique(-1 * b * x)}=${-1 * a * x * x - b * x}$`
					break;
				case 'a/cx+d':
					d = randint(1, 11)
					while (c * x + d == 0) {
						c = randint(2, 11)
					}
					expression = `\\dfrac{${a}}{${c}x+${d}}`
					texte_corr = `$${nomdef}(${x})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x)}+${d}}=\\dfrac{${a}}{${c * x}+${d}}=\\dfrac{${a}}{${c * x + d}}=${tex_fraction_reduite(a, c * x + d)}$`
					break;
				case 'ax+b/cx+d':
					d = randint(1, 11)
					while (c * x + d == 0) {
						c = randint(2, 11)
					}
					while (a * x + b == 0) {
						a = randint(2, 11)
					}
					expression = `\\dfrac{${a}x+${b}}{${c}x+${d}}`
					texte_corr = `$${nomdef}(${x})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x)}+${b}}{${c}\\times${ecriture_parenthese_si_negatif(x)}+${d}}=\\dfrac{${a * x}+${b}}{${c * x}+${d}}=\\dfrac{${a * x + b}}{${c * x + d}}=${tex_fraction_reduite(a * x + b, c * x + d)}$`
					break;
				case '(ax+b)(cx+d)':
					a = randint(-4, 4, [0, 1, -1])
					b = randint(-4, 4, [0])
					c = randint(-4, 4, [0, 1, -1])
					d = randint(-4, 4, [0])
					x = randint(-2, 2, [0])

					expression = `(${a}x${ecriture_algebrique(b)})(${c}x${ecriture_algebrique(d)})`
					texte_corr = `$${nomdef}(${x})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(d)}\\right)=(${a * x}${ecriture_algebrique(b)})(${c * x}${ecriture_algebrique(d)})=${a * x + b}\\times${ecriture_parenthese_si_negatif(c * x + d)}=${(a * x + b) * (c * x + d)}$`
					break;
				case '(ax+b)2':
					a = randint(-4, 4, [0, -1, 1])
					b = randint(-4, 4, [0])
					c = randint(-4, 4, [0, -1, 1])
					d = randint(-4, 4, [0])
					x = randint(-2, 2, [0])

					expression = `(${a}x${ecriture_algebrique(b)})^2`
					texte_corr = `$${nomdef}(${x})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(b)}\\right)^2=(${a * x}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a * x + b)}^2=${(a * x + b) * (a * x + b)}$`
					break;
			}

			texte = `On considère la fonction $${nomdef}$ définie par $${nomdef}:x\\mapsto ${expression}$. Calculer $${nomdef}(${x})$.`


			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 5, '1 : Fonctions affines\n2 : Polynome du second degré\n3 : Quotient\n4 : Produit \n5 : Mélange'];
}



/**
* Réduire des expressions lorsque c'est possible
*
* @Auteur Rémi Angot
* 3L11-2
*/
function Reduction_si_possible() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Réduire une expression";
	this.consigne = "Réduire les expressions suivantes, si cela est possible.";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['ax+b', 'ax+bx', 'ax+bx2', 'ax*b','b*ax','ax+b+cx+d','b+ax+d+cx','ax+b+x'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, c, d, cpt = 0; i < this.nb_questions && cpt < 50;) {
			a = randint(-11,11,0);
			b = randint(-11,11,[0,a]);
			c = randint(-11,11,[0]);
			d = randint(-11,11,0)
			switch (liste_type_de_questions[i]) {
				case 'ax+b':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x+(${b})`)}$`;
					texte_corr = texte
					break;
				case 'ax+bx':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x+(${b}*x)`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x+(${b}*x)`)}=${printlatex(`${a+b}x`)}$`;
					break;
				case 'ax+bx2':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x+(${b}*x^2)`)}$`;
					texte_corr = texte
					break;
				case 'ax*b':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x`)}\\times${ecriture_parenthese_si_negatif(b)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x`)}\\times${ecriture_parenthese_si_negatif(b)}=${printlatex(`${a*b}*x`)}$`;
					break;
				case 'b*ax':
					a = randint(1,11);
					texte = `$${lettre_depuis_chiffre(i+1)}=${b}\\times${printlatex(`${a}*x`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${b}\\times${printlatex(`${a}*x`)}=${printlatex(`${b*a}*x`)}$`;
					break;
				case 'ax+b+cx+d':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x+(${b})+(${c})*x+(${d})`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x+(${b})+(${c})*x+(${d})`)}`;
					if (b+d==0) {
						if (a+c==0) {
							texte_corr += `=0$`
						} else {
							texte_corr += `=${printlatex(`${a+c}*x`)}$`
						}
					} else {
						if (a+c==0) {
							texte_corr += `=${b+d}$`	
						} else {
							texte_corr += `=${printlatex(`${a+c}*x+(${b+d})`)}$`	
						}
					}
					break;
				case 'b+ax+d+cx':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${b}+(${a})*x+(${d})+(${c})*x`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${b}+(${a})*x+(${d})+(${c})*x`)}`;
					if (b+d==0) {
						if (a+c==0) {
							texte_corr += `=0$`
						} else {
							texte_corr += `=${printlatex(`${a+c}*x`)}$`
						}
					} else {
						if (a+c==0) {
							texte_corr += `=${b+d}$`	
						} else {
							texte_corr += `=${printlatex(`${a+c}*x+(${b+d})`)}$`	
						}
					}
					break;
					case 'ax+b+x':
					a = randint(-11,11,[0,-1])
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x+(${b})+x`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${a}*x+(${b})+x`)}=${printlatex(`${a+1}*x+(${b})`)}$`
					break;
				
			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
}


/**
* Utiliser la simple ou la double distributivité et réduire l'expression
*
* @Auteur Rémi Angot
* 3L11-3
*/
function Distributivite_simple_double_reduction() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Utiliser la distributivité (simple ou double) et réduire";
	this.consigne = "Développer et réduire les expressions suivantes.";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['cx+e(ax+b)','ex+(ax+b)(cx+d)','e+(ax+b)(cx+d)','e-(ax+b)(cx+d)','(ax*b)(cx+d)','e(ax+b)-(d+cx)'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, a, b, c, d, e, cpt = 0; i < this.nb_questions && cpt < 50;) {
			a = randint(-11,11,0);
			b = randint(-11,11,0);
			c = randint(-11,11,0);
			d = randint(-11,11,0);
			e = randint(-11,11,0);
			switch (liste_type_de_questions[i]) {
				case 'cx+e(ax+b)':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${c}*x+(${e})*(${a}*x+(${b}))`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${c}*x+(${e})*(${a}*x+(${b}))`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${c}*x+(${e*a})*x+(${e*b})`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${c+e*a}*x+(${e*b})`)}$`;
					break;
				case 'ex+(ax+b)(cx+d)':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${e}*x+(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${e}*x+(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${e}*x+(${a*c})*x^2+(${a*d})*x+(${b*c})*x+(${b*d})`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${a*c}*x^2+(${e+b*c+a*d})*x+(${b*d})`)}$`;
					break;
				case 'e+(ax+b)(cx+d)':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${e}+(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${e}+(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${e}+(${a*c})*x^2+(${a*d})*x+(${b*c})*x+(${b*d})`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${a*c}*x^2+(${b*c+a*d})*x+(${e+b*d})`)}$`;
					break;
				case 'e-(ax+b)(cx+d)':
					texte = `$${lettre_depuis_chiffre(i+1)}=${e}-${printlatex(`(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=${e}-${printlatex(`(${a}*x+(${b}))*(${c}x+(${d}))`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${e}-(${printlatex(`(${a*c})*x^2+(${a*d})*x+(${b*c})*x+(${b*d})`)})$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${e}+(${-1*a*c})*x^2+(${-1*a*d})*x+(${-1*b*c})*x+(${-1*b*d})`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${-1*a*c}*x^2+(${-1*b*c-a*d})*x+(${e-b*d})`)}$`;
					break;
				case '(ax*b)(cx+d)':
					a = randint (-3,3,[0]);
					b = randint (2,3);
					texte = `$${lettre_depuis_chiffre(i+1)}=(${printlatex(`${a}*x`)}\\times${b})(${printlatex(`${c}*x+(${d})`)})$`;
					texte_corr = `$${lettre_depuis_chiffre(i+1)}=(${printlatex(`${a}*x`)}\\times${b})(${printlatex(`${c}*x+(${d})`)})$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${a*b}*x`)}\\times(${printlatex(`${c}*x+(${d})`)})$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`${a*b*c}*x^2+(${a*b*d})*x`)}$`;
					break;
				case 'e(ax+b)-(d+cx)':
					texte = `$${lettre_depuis_chiffre(i+1)}=${e}(${printlatex(`${a}*x+(${b})`)})-(${printlatex(`${d}+(${c})*x`)})$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`(${e*a})*x+(${e*b})`)}-(${printlatex(`${d}+(${c})*x`)})$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`(${e*a})*x+(${e*b})+(${-d})+(${-c})*x`)}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${printlatex(`(${e*a-c})*x+(${e*b-d})`)}$`;
					break;
				
				
			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
}

/**
* Utiliser la simple ou la double distributivité et réduire l'expression
*
* @Auteur Rémi Angot
* 3L11-4
*/
function Factoriser_par_nombre_ou_x() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Factoriser une expression";
	this.consigne = "Factoriser les expressions suivantes.";
	this.nb_questions = 8;
	this.nb_cols = 2;
	this.nb_cols_corr = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['ka+nkb','-ka+nkb','nka+mkb','nka-mkb','nkx+mkx2','nkx-mkx2','nx2+x','nx2+mx'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, n, m, couplenm, k, cpt = 0; i < this.nb_questions && cpt < 50;) {
			k = choice([2,3,5,7,11]);
			couplenm=choice([[2,3],[3,4],[2,5],[3,5],[4,5],[5,6],[2,7],[3,7],[4,7],[5,7],[6,7],[3,8],[5,8],[7,8],[2,9],[4,9],[5,9],[7,9],[8,9],[3,10],[7,10],[9,10]]); // n et m sont premiers entre eux
			n = couplenm[0];
			m = couplenm[1];
			switch (liste_type_de_questions[i]) {
				case 'ka+nkb':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${k}*a+(${n*k})*b`)}$`;
					texte_corr = texte;
					if (n>0) {
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}a+${k}\\times${n}b$`;
					} else {
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}a-${k}\\times${abs(n)}b$`;
					}
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}(${printlatex(`a+(${n})*b`)})$`;
					break;
				case '-ka+nkb':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${-k}*a+(${n*k})*b`)}$`;
					texte_corr = texte;
					if (n>0) {
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${-k}a+${k}\\times${n}b$`;
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}(${printlatex(`-a+${n}*b`)})$`;
					} else {
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${-k}a+(${-k})\\times${-n}b$`;
						texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${-k}(${printlatex(`a+(${-n})*b`)})$`;
					}
					break;
				case 'nka+mkb':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${n*k}*a+(${m*k})*b`)}$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}\\times${n}a+${k}\\times${m}b$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}(${n}a+${m}b)$`;
					break;
				case 'nka-mkb':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${n*k}*a-(${m*k})*b`)}$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}\\times${n}a-${k}\\times${m}b$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}(${n}a-${m}b)$`;
					break;
				case 'nkx+mkx2':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${n*k}*x+(${m*k})*x^2`)}$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}x\\times${n}+${k}x\\times${m}x$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}x(${n}+${m}x)$`;
					break;
				case 'nkx-mkx2':
					texte = `$${lettre_depuis_chiffre(i+1)}=${printlatex(`${n*k}*x-(${m*k})*x^2`)}$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}x\\times${n}-${k}x\\times${m}x$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=${k}x(${n}-${m}x)$`;
					break;
				case 'nx2+x':
					texte = `$${lettre_depuis_chiffre(i+1)}=${n}x^2+x$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=x\\times ${n}x+x\\times 1$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=x(${n}x+1)$`;
					break;
				case 'nx2+mx':
					texte = `$${lettre_depuis_chiffre(i+1)}=${n}x^2+${m}x$`;
					texte_corr = texte;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=x\\times ${n}x+x\\times ${m}$`;
					texte_corr += `<br>$\\phantom{${lettre_depuis_chiffre(i+1)}}=x(${n}x+${m})$`;
					break;
				
				
			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
}

/**
* Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique
*
* * Niveau 1 : Fonctions affines
* * Niveau 2 : Polynôme du second degré
* * Niveau 3 : Quotients de fonctions affines
* * Niveau 4 : (ax+b)(cx+d)
* * Niveau 5 : Mélange 
* @Auteur Rémi Angot
* 3F12-3
*/
function Tableau_de_valeurs() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Compléter un tableau de valeurs";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	this.sup = 5; // niveau de difficulté
	this.correction_detaillee_disponible = true;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup == 1) {
			type_de_questions_disponibles = ['ax+b', 'ax'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['ax2+bx+c', 'ax2+c', 'ax2+bx'];
		}
		if (this.sup == 3) {
			type_de_questions_disponibles = ['a/cx+d', 'ax+b/cx+d'];
		}
		if (this.sup == 4) {
			type_de_questions_disponibles = ['(ax+b)(cx+d)', '(ax+b)2'];
		}
		if (this.sup == 5) {
			type_de_questions_disponibles = ['ax+b', 'ax', 'ax2+bx+c', 'ax2+c', 'ax2+bx', 'a/cx+d', 'ax+b/cx+d', '(ax+b)(cx+d)', '(ax+b)2']
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_x = combinaison_listes([[-3, 0, 3], [-2, 0, 2], [1, 2, 5], [-3, 6, 9]], this.nb_questions);
		for (let i = 0, texte, texte_corr, a, b, c, d, x1, x2, x3, expression, nomdef, ligne2, calculs = "", cpt = 0; i < this.nb_questions && cpt < 50;) {
			nomdef = lettre_minuscule_depuis_chiffre(6 + i) // on commence par f puis on continue dans l'ordre alphabétique
			x1 = liste_de_x[i][0];
			x2 = liste_de_x[i][1];
			x3 = liste_de_x[i][2];
			switch (liste_type_de_questions[i]) {
				case 'ax+b':
					a = randint(-10, 10, [0, -1, 1])
					b = randint(-10, 10, [0])
					expression = `${a}x${ecriture_algebrique(b)}`
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0] + b} & ${a * liste_de_x[i][1] + b} & ${a * liste_de_x[i][2] + b} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}=${a * x1}${ecriture_algebrique(b)}=${a * x1 + b}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}=${a * x2}${ecriture_algebrique(b)}=${a * x2 + b}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}=${a * x3}${ecriture_algebrique(b)}=${a * x3 + b}$<br>`
					break;
				case 'ax':
					a = randint(-10, 10, [0, -1, 1])
					expression = `${a}x`
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0]} & ${a * liste_de_x[i][1]} & ${a * liste_de_x[i][2]} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}=${a * x1}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}=${a * x2}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}=${a * x3}$<br>`
					break;
				case 'ax2+bx+c':
					a = randint(-3, 3, [0, -1, 1])
					b = randint(-5, 5, [0, -1, 1])
					c = randint(-10, 10, [0])
					expression = `${a}x^2${ecriture_algebrique(b)}x${ecriture_algebrique(c)}`
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0] ** 2 + b * liste_de_x[i][0] + c} & ${a * liste_de_x[i][1] ** 2 + b * liste_de_x[i][1] + c} & ${a * liste_de_x[i][2] ** 2 + b * liste_de_x[i][2] + c} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(c)}=${a}\\times${x1 ** 2}${ecriture_algebrique(b * x1)}${ecriture_algebrique(c)}=${a * x1 ** 2 + b * x1 + c}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(c)}=${a}\\times${x2 ** 2}${ecriture_algebrique(b * x2)}${ecriture_algebrique(c)}=${a * x2 ** 2 + b * x2 + c}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(c)}=${a}\\times${x3 ** 2}${ecriture_algebrique(b * x3)}${ecriture_algebrique(c)}=${a * x3 ** 2 + b * x3 + c}$<br>`
					break;
				case 'ax2+c':
					a = randint(-4, 4, [0, -1, 1])
					c = randint(-10, 10, [0])
					expression = `${a}x^2${ecriture_algebrique(c)}`
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0] ** 2 + c} & ${a * liste_de_x[i][1] ** 2 + c} & ${a * liste_de_x[i][2] ** 2 + c} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(c)}=${a}\\times${x1 ** 2}${ecriture_algebrique(c)}=${a * x1 ** 2 + c}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(c)}=${a}\\times${x2 ** 2}${ecriture_algebrique(c)}=${a * x2 ** 2 + c}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(c)}=${a}\\times${x3 ** 2}${ecriture_algebrique(c)}=${a * x3 ** 2 + c}$<br>`
					break;
				case 'ax2+bx':
					a = randint(-3, 3, [0, -1, 1])
					b = randint(-5, 5, [0, -1, 1])
					c = randint(-10, 10, [0])
					expression = `${a}x^2${ecriture_algebrique(b)}x`
					ligne2 = `${nomdef}(x) & ${a * liste_de_x[i][0] ** 2 + b * liste_de_x[i][0]} & ${a * liste_de_x[i][1] ** 2 + b * liste_de_x[i][1]} & ${a * liste_de_x[i][2] ** 2 + b * liste_de_x[i][2]} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x1)}=${a}\\times${x1 ** 2}${ecriture_algebrique(b * x1)}=${a * x1 ** 2 + b * x1}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x2)}=${a}\\times${x2 ** 2}${ecriture_algebrique(b * x2)}=${a * x2 ** 2 + b * x2}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x3)}=${a}\\times${x3 ** 2}${ecriture_algebrique(b * x3)}=${a * x3 ** 2 + b * x3}$<br>`
					break;
				case 'a/cx+d':
					a = randint(-10, 10, [0])
					c = randint(-10, 10, [0, -1, 1])
					d = randint(-10, 10, [0])
					while (c * x1 + d == 0 || c * x2 + d == 0 || c * x3 + d == 0) {
						c = randint(-10, 10, [0, -1, 1])
					}
					expression = `\\dfrac{${a}}{${c}x${ecriture_algebrique(d)}}`
					ligne2 = `${nomdef}(x) & ${tex_fraction_reduite(a, c * liste_de_x[i][0] + d)} & ${tex_fraction_reduite(a, c * liste_de_x[i][1] + d)} & ${tex_fraction_reduite(a, c * liste_de_x[i][2] + d)} \\\\\n`
					calculs = `$${nomdef}(${x1})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x1}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x1 + d}}`
					if (pgcd(a, c * x1 + d) == 1) {
						calculs += '$<br><br>'
					} else {
						calculs += '=' + tex_fraction_reduite(a, c * x1 + d) + '$<br><br>'
					}
					calculs += `$${nomdef}(${x2})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x2}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x2 + d}}`
					if (pgcd(a, c * x2 + d) == 1) {
						calculs += '$<br><br>'
					} else {
						calculs += '=' + tex_fraction_reduite(a, c * x2 + d) + '$<br><br>'
					}
					calculs += `$${nomdef}(${x3})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x3}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c * x3 + d}}`
					if (pgcd(a, c * x3 + d) == 1) {
						calculs += '$<br><br>'
					} else {
						calculs += '=' + tex_fraction_reduite(a, c * x3 + d) + '$<br><br>'
					}
					break;
				case 'ax+b/cx+d':
					a = randint(-10, 10, [0, 1, -1])
					b = randint(-10, 10, [0])
					c = randint(-10, 10, [0, -1, 1])
					d = randint(-10, 10, [0])
					while (c * x1 + d == 0 || c * x2 + d == 0 || c * x3 + d == 0) {
						c = randint(-10, 10, [0, -1, 1])
					}
					expression = `\\dfrac{${a}x${ecriture_algebrique(b)}}{${c}x${ecriture_algebrique(d)}}`
					ligne2 = `${nomdef}(x) & ${tex_fraction_reduite(a * liste_de_x[i][0] + b, c * liste_de_x[i][0] + d)} & ${tex_fraction_reduite(a * liste_de_x[i][1] + b, c * liste_de_x[i][1] + d)} & ${tex_fraction_reduite(a * liste_de_x[i][2] + b, c * liste_de_x[i][2] + d)} \\\\\n`
					calculs = `$${nomdef}(${x1})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}}=\\dfrac{${a * x1}${ecriture_algebrique(b)}}{${c * x1}${ecriture_algebrique(d)}}=\\dfrac{${a * x1 + b}}{${c * x1 + d}}`
					if (pgcd(a * x1 + b, c * x1 + d) == 1) {
						calculs += '$<br><br>'
					} else {
						calculs += '=' + tex_fraction_reduite(a * x1 + b, c * x1 + d) + '$<br><br>'
					}
					calculs += `$${nomdef}(${x2})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}}=\\dfrac{${a * x2}${ecriture_algebrique(b)}}{${c * x2}${ecriture_algebrique(d)}}=\\dfrac{${a * x2 + b}}{${c * x2 + d}}`
					if (pgcd(a * x2 + b, c * x2 + d) == 1) {
						calculs += '$<br><br>'
					} else {
						calculs += '=' + tex_fraction_reduite(a * x2 + b, c * x2 + d) + '$<br><br>'
					}
					calculs += `$${nomdef}(${x3})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}}=\\dfrac{${a * x3}${ecriture_algebrique(b)}}{${c * x3}${ecriture_algebrique(d)}}=\\dfrac{${a * x3 + b}}{${c * x3 + d}}`
					if (pgcd(a * x3 + b, c * x3 + d) == 1) {
						calculs += '$<br><br>'
					} else {
						calculs += '=' + tex_fraction_reduite(a * x3 + b, c * x3 + d) + '$<br><br>'
					}
					break;
				case '(ax+b)(cx+d)':
					a = randint(-5, 5, [0, 1, -1])
					b = randint(-5, 5, [0])
					c = randint(-3, 3, [0, -1, 1])
					d = randint(-3, 3, [0])
					if (a < 0 && b < 0 && c < 0 && d < 0) {
						d = randint(1, 3)
					}
					expression = `(${a}x${ecriture_algebrique(b)})(${c}x${ecriture_algebrique(d)})`
					ligne2 = `${nomdef}(x) & ${(a * liste_de_x[i][0] + b) * (c * liste_de_x[i][0] + d)} & ${(a * liste_de_x[i][1] + b) * (c * liste_de_x[i][1] + d)} & ${(a * liste_de_x[i][2] + b) * (c * liste_de_x[i][2] + d)} \\\\\n`
					calculs = `$${nomdef}(${x1})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}\\right)=(${a * x1}${ecriture_algebrique(b)})(${c * x1}${ecriture_algebrique(d)})=${a * x1 + b}\\times ${ecriture_parenthese_si_negatif(c * x1 + d)}=${(a * x1 + b) * (c * x1 + d)}$<br>`
					calculs += `$${nomdef}(${x2})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}\\right)=(${a * x2}${ecriture_algebrique(b)})(${c * x2}${ecriture_algebrique(d)})=${a * x2 + b}\\times ${ecriture_parenthese_si_negatif(c * x2 + d)}=${(a * x2 + b) * (c * x2 + d)}$<br>`
					calculs += `$${nomdef}(${x3})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}\\right)=(${a * x3}${ecriture_algebrique(b)})(${c * x3}${ecriture_algebrique(d)})=${a * x3 + b}\\times ${ecriture_parenthese_si_negatif(c * x3 + d)}=${(a * x3 + b) * (c * x3 + d)}$<br>`
					break;
				case '(ax+b)2':
					a = randint(-3, 3, [0, 1, -1])
					b = randint(-3, 3, [0])
					expression = `(${a}x${ecriture_algebrique(b)})^2`
					ligne2 = `${nomdef}(x) & ${(a * liste_de_x[i][0] + b) ** 2} & ${(a * liste_de_x[i][1] + b) ** 2} & ${(a * liste_de_x[i][2] + b) ** 2} \\\\\n`
					calculs = `$${nomdef}(${x1})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}\\right)^2=(${a * x1}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a * x1 + b)}^2=${(a * x1 + b) ** 2}$<br>`
					calculs += `$${nomdef}(${x2})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}\\right)^2=(${a * x2}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a * x2 + b)}^2=${(a * x2 + b) ** 2}$<br>`
					calculs += `$${nomdef}(${x3})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}\\right)^2=(${a * x3}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a * x3 + b)}^2=${(a * x3 + b) ** 2}$<br>`

					break;
			}


			texte = `On considère la fonction $${nomdef}$ définie par $${nomdef}:x\\mapsto ${expression}$. Compléter le tableau de valeurs suivant.`
			texte_corr = ''
			texte += `<br><br>`
			if (sortie_html) {
				texte += `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|}\n`
			} else {
				texte += `$\\begin{array}{|l|c|c|c|}\n`
			}

			texte += `\\hline\n`
			texte += `x & ${liste_de_x[i][0]} & ${liste_de_x[i][1]} & ${liste_de_x[i][2]} \\\\\n`
			texte += `\\hline\n`
			texte += `${nomdef}(x) & \\phantom{-10} & \\phantom{-10} & \\phantom{-10} \\\\\n`
			texte += `\\hline\n`
			texte += `\\end{array}\n$`


			if (sortie_html) {
				texte_corr = `$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|}\n`
			} else {
				texte_corr = `$\\begin{array}{|l|c|c|c|}\n`
			}

			texte_corr += `\\hline\n`;
			texte_corr += `x & ${liste_de_x[i][0]} & ${liste_de_x[i][1]} & ${liste_de_x[i][2]} \\\\\n`;
			texte_corr += `\\hline\n`;
			texte_corr += ligne2;
			texte_corr += `\\hline\n`;
			texte_corr += `\\end{array}\n$`;
			if (this.correction_detaillee) {
				texte_corr += '<br><br>';
				texte_corr += calculs;
			}




			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		this.nb_questions == 1 ? liste_de_question_to_contenu_sans_numero(this) : liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 5, '1 : Fonctions affines\n2 : Polynome du second degré\n3 : Quotient\n4 : Produit \n5 : Mélange'];
}

/**
 * Développer des expressions de la forme(ax+ou-b)(cx+ou-d)
* @auteur Jean-Claude Lhote
* 3L11-1
*/
function Double_distributivite() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Utiliser la double distributivité";
	this.consigne = "Développer et réduire les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	this.spacing_corr = 1;
	this.nb_questions = 5;
	this.sup = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = [1, 2];
		if (this.sup == 2) {
			type_de_questions_disponibles = [3, 4]
		}
		if (this.sup == 3) {
			type_de_questions_disponibles = [1, 2, 3, 4]
		}


		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
		for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, type_de_questions; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];
			a = randint(2, 9);
			b = randint(2, 9);
			c = randint(2, 9, [a]);
			d = randint(2, 9, [b]);
			switch (type_de_questions) {
				case 1: //(x+b)(x+d)
					b = randint(2, 10)
					d = randint(2, 12)
					texte = `$(x+${b})(x+${d})$`
					texte_corr = `$(x+${b})(x+${d})=x^2+${b}x+${d}x+${b * d}=x^2+${b + d}x+${b * d}$`
					break;
				case 2: //(ax+b)(cx+d)
					texte = `$(${a}x+${b})(${c}x+${d})$`
					texte_corr = `$(${a}x+${b})(${c}x+${d})=${a * c}x^2+${a * d}x+${b * c}x+${b * d}=${a * c}x^2+${a * d + b * c}x+${b * d}$`
					break;
				case 3://(ax-b)(cx+d)
					texte = `$(${a}x-${b})(${c}x+${d})$`
					if (egal(a*d-b*c,0)) 
					texte_corr = `$(${a}x-${b})(${c}x+${d})=${a * c}x^2+${d * a}x-${b * c}x-${b * d}=${printlatex(`${a * c}*x^2-${b * d}`)}$`;
					else texte_corr = `$(${a}x-${b})(${c}x+${d})=${a * c}x^2+${d * a}x-${b * c}x-${b * d}=${printlatex(`${a * c}*x^2+(${d * a-b * c})*x-${b * d}`)}$`;
					break;
				case 4://(ax-b)(cx-d)
					texte = `$(${a}x-${b})(${c}x-${d})$`
					texte_corr = `$(${a}x-${b})(${c}x-${d})=${a * c}x^2-${a * d}x-${b * c}x+${b * d}=${a * c}x^2-${a * d + b * c}x+${b * d}$`
					break;
			}
			if (this.liste_questions.indexOf(texte) == -1) {
				// Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : (x+a)(x+b) et (ax+b)(cx+d)\n 2 : (ax-b)(cx+d) et (ax-b)(cx-d)\n 3 : Tous les types'];
}

/**
 * Développer (ax-b)(ax+b)
* @auteur Jean-Claude Lhote
* 3L12-1
*/
function Developper_Identites_remarquables3() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Développer (a-b)(a+b)";
	this.consigne = "Développer les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	this.spacing_corr = 1;
	this.nb_questions = 5;
	this.sup = 2;


	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
		[1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
		[1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
		for (let i = 0, ns, ds, texte, texte_corr, cpt = 0, a, b, fraction = []; i < this.nb_questions && cpt < 50;) {
			if (this.sup == 1) {
				a = randint(1, 9);	 // coef de x est égal à 1
				texte = `$(x-${a})(x+${a})$`    // (x-a)(x+a)
				texte_corr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a * a}$`;
			}
			else if (this.sup == 2) {
				a = randint(1, 9)  // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
				b = randint(2, 9);
				texte = `$(${b}x-${a})(${b}x+${a})$`; // b>1
				texte_corr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b * b}x^2-${a * a}$`;
			}
			else {   //  (bx-a)(bx+a) avec a entier et b rationnel simple
				a = randint(1, 9);
				fraction = choice(liste_fractions);
				ns = fraction[0]
				ds = fraction[1]
				texte = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)$`; // b>1
				texte_corr = `$\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)=\\left(${tex_fraction(ns, ds)}x\\right)^2-${a}^2=${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}$`;
			}

			if (this.liste_questions.indexOf(texte) == -1) {
				// Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'];
}

/**
 * Factoriser a²-b²
* @auteur Jean-Claude Lhote
* 3L12
*/
function Factoriser_Identites_remarquables3() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Factoriser a²-b²";
	this.consigne = "Factoriser les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	this.spacing_corr = 1;
	this.nb_questions = 5;
	this.sup = 2;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
		[1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
		[1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
		for (let i = 0, texte, texte_corr, cpt = 0, a, b, ns, ds, fraction = []; i < this.nb_questions && cpt < 50;) {
			if (this.sup == 1) {
				a = randint(1, 9);	 // coef de x est égal à 1
				texte = `$x^2-${a * a}$`    // (x-a)(x+a)
				texte_corr = `$x^2-${a * a}=x^2-${a}^2=(x-${a})(x+${a})$`;
			}
			else if (this.sup == 2) {
				a = randint(1, 9)  // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
				b = randint(2, 9);
				texte = `$${b * b}x^2-${a * a}$`; // b>1
				texte_corr = `$${b * b}x^2-${a * a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`;
			}
			else {   //  (bx-a)(bx+a) avec a entier et b rationnel simple
				a = randint(1, 9);
				fraction = choice(liste_fractions);
				ns = fraction[0]
				ds = fraction[1]
				texte = `$${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}$`; // b>1
				texte_corr = `$${tex_fraction(ns * ns, ds * ds)}x^2-${a * a}=\\left(${tex_fraction(ns, ds)}x\\right)^2-${a}^2=\\left(${tex_fraction(ns, ds)}x-${a}\\right)\\left(${tex_fraction(ns, ds)}x+${a}\\right)$`;

			}

			if (this.liste_questions.indexOf(texte) == -1) {
				// Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'];
}



/**
* Équation du premier degré
* * Type 1 : ax+b=cx+d
* * Type 2 : k(ax+b)=cx+d
* * Type 3 : k-(ax+b)=cx+d
* * Tous les types
* @Auteur Rémi Angot
* 3L13-1
*/
function Exercice_equation1_2(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Équation du premier degré (utilisant la distributivité)"
	this.consigne = 'Résoudre les équations suivantes'
	this.spacing = 2;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.correction_detaillee_disponible = true;
	if (!sortie_html) {
		this.correction_detaillee = false;
	}
	this.nb_questions = 3;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_type_de_questions = ['ax+b=cx+d','k(ax+b)=cx+d','k-(ax+b)=cx+d'];
		liste_type_de_questions = combinaison_listes(liste_type_de_questions,this.nb_questions)
		for (let i = 0, a, b, c, d, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(-9,9,0);
			b = randint(-9,9,0);
			c = randint(-9,9,0);
			d = randint(-9,9,0);
			k = randint(2,9)
			if (liste_type_de_questions[i]=='ax+b=cx+d') {
				if (c==a) {c = randint(1,9,[a])} // sinon on arrive à une division par 0
				if (!this.sup && a<c) {
					c = randint(1,9)
					a = randint(c+1,15) // a sera plus grand que c pour que a-c>0
				}
				texte = `$${rien_si_1(a)}x${ecriture_algebrique(b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					if (c>0) {
						texte_corr += `On soustrait $${rien_si_1(c)}x$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${rien_si_1(-1*c)}x$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(a)}x${ecriture_algebrique(b)}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}=${c}x+${d}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}$<br>`;
				texte_corr += `$${rien_si_1(a-c)}x${ecriture_algebrique(b)}=${d}$<br>`
				if (this.correction_detaillee) {
					if (b>0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-1*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(a-c)}x${ecriture_algebrique(b)}${mise_en_evidence(ecriture_algebrique(-1*b))}=${d}${mise_en_evidence(ecriture_algebrique(-1*b))}$<br>`
				texte_corr += `$${rien_si_1(a-c)}x=${d-b}$<br>`

				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${a-c}$.<br>`}
				texte_corr += `$${rien_si_1(a-c)}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a-c))}=${d-b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a-c))}$<br>`
				texte_corr += `$x=${tex_fraction(d-b,a-c)}$`
				if (pgcd(abs(d-b),abs(a-c))>1 || (a-c)<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(d-b,a-c)}$`
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(d-b,a-c)}$.`
			}

			if (liste_type_de_questions[i]=='k(ax+b)=cx+d') {
				if (c==k*a) {c = randint(1,9,[a])} // sinon on arrive à une division par 0
				texte = `$${k}(${rien_si_1(a)}x${ecriture_algebrique(b)})=${rien_si_1(c)}x${ecriture_algebrique(d)}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					texte_corr += 'On développe le membre de gauche.<br>'
				}
				texte_corr += `$${k*a}x${ecriture_algebrique(k*b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$<br>`;
				if (this.correction_detaillee) {
					if (c>0) {
						texte_corr += `On soustrait $${rien_si_1(c)}x$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${rien_si_1(-1*c)}x$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${k*a}x${ecriture_algebrique(k*b)}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}=${c}x${ecriture_algebrique(d)}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}$<br>`;
				texte_corr += `$${rien_si_1(k*a-c)}x${ecriture_algebrique(k*b)}=${d}$<br>`
				if (this.correction_detaillee) {
					if (k*b>0) {
						texte_corr += `On soustrait $${k*b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-k*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(k*a-c)}x${ecriture_algebrique(k*b)}${mise_en_evidence(ecriture_algebrique(-k*b))}=${d}${mise_en_evidence(ecriture_algebrique(-k*b))}$<br>`
				texte_corr += `$${rien_si_1(k*a-c)}x=${d-k*b}$<br>`

				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${k*a-c}$.<br>`}
				texte_corr += `$${rien_si_1(k*a-c)}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(k*a-c))}=${d-k*b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(k*a-c))}$<br>`
				texte_corr += `$x=${tex_fraction(d-k*b,k*a-c)}$`
				if (pgcd(abs(d-k*b),abs(k*a-c))>1 || (k*a-c)<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(d-k*b,k*a-c)}$`
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(d-k*b,k*a-c)}$.`
			}

			if (liste_type_de_questions[i]=='k-(ax+b)=cx+d') {
				if (c==-a) {c = randint(-9,9,[0,a])} // sinon on arrive à une division par 0
				texte = `$${k}-(${rien_si_1(a)}x${ecriture_algebrique(b)})=${rien_si_1(c)}x${ecriture_algebrique(d)}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					texte_corr += 'On développe le membre de gauche.<br>'
				}
				texte_corr += `$${k}${ecriture_algebrique(-a)}x${ecriture_algebrique(-b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$<br>`;
				texte_corr += `$${rien_si_1(-a)}x${ecriture_algebrique(k-b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$<br>`;
				
				//On reprend le cas ax+b=cx+d en changeant les valeurs de a et b
				a = -a;
				b = k-b;

				if (this.correction_detaillee) {
					if (c>0) {
						texte_corr += `On soustrait $${rien_si_1(c)}x$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${rien_si_1(-1*c)}x$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(a)}x${ecriture_algebrique(b)}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}=${c}x+${d}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}$<br>`;
				texte_corr += `$${rien_si_1(a-c)}x${ecriture_algebrique(b)}=${d}$<br>`
				if (this.correction_detaillee) {
					if (b>0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-1*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(a-c)}x${ecriture_algebrique(b)}${mise_en_evidence(ecriture_algebrique(-1*b))}=${d}${mise_en_evidence(ecriture_algebrique(-1*b))}$<br>`
				texte_corr += `$${rien_si_1(a-c)}x=${d-b}$<br>`

				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${a-c}$.<br>`}
				texte_corr += `$${rien_si_1(a-c)}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a-c))}=${d-b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a-c))}$<br>`
				texte_corr += `$x=${tex_fraction(d-b,a-c)}$`
				if (pgcd(abs(d-b),abs(a-c))>1 || (a-c)<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(d-b,a-c)}$`
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(d-b,a-c)}$.`
			}
				
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte)//replace(/1x/g,'x')); //remplace 1x par x
				this.liste_corrections.push(texte_corr) //.replace(/1x/g,'x')); //remplace 1x par x
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
}


/**
 * Résolution d'équations de type (ax+b)(cx+d)=0
* @auteur Jean-Claude Lhote
* Tout est dans le nom de la fonction.
* 3L14
*/
function Resoudre_une_equation_produit_nul() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre une équation produit nul";
	this.consigne = "Résoudre les équations suivantes";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1.5
	this.spacing = 1


	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
		[1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
		[1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
		let liste_type_de_questions = []
		switch (parseInt(this.sup)) {
			case 1: liste_type_de_questions = combinaison_listes([1, 2], this.nb_questions);
				break;
			case 2: liste_type_de_questions = combinaison_listes([3, 4], this.nb_questions);
				break;
			case 3: liste_type_de_questions = combinaison_listes([5, 6], this.nb_questions);
				break;
			case 4: liste_type_de_questions = combinaison_listes([1, 2, 3, 4, 5, 6], this.nb_questions);

		}
		for (let i = 0, a, b, c, d, fraction1, fraction2, ns1, ns2, ds1, ds2, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			fraction1 = choice(liste_fractions);
			ns1 = fraction1[0]
			ds1 = fraction1[1]
			fraction2 = choice(liste_fractions);
			ns2 = fraction2[0]
			ds2 = fraction2[1]
			switch (liste_type_de_questions[i]) {
				case 1: b = randint(1, 20); // (x+a)(x+b)=0 avec a et b entiers
					d = randint(1, 20, [b])
					texte = `$(x+${b})(x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>' + `$(x+${b})(x+${d})=0$`
					texte_corr += '<br> Soit ' + `$x+${b}=0$` + ' ou ' + `$x+${d}=0$`
					texte_corr += '<br> Donc ' + `$x=${0 - b}$` + ' ou ' + `$x=${0 - d}$`
					break;
				case 2: b = randint(1, 20); // (x-a)(x+b)=0 avec a et b entiers
					d = randint(1, 20, [b])
					texte = `$(x-${b})(x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>' + `$(x-${b})(x+${d})=0$`
					texte_corr += '<br> Soit ' + `$x-${b}=0$` + ' ou  ' + `$x+${d}=0$`
					texte_corr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$x=${0 - d}$`
					break;

				case 3: a = randint(2, 6); 	//(ax+b)(cx+d)=0  avec b/a et d/c entiers.
					b = Math.round(randint(1, 5) * a);
					c = randint(2, 6, [a]);
					d = Math.round(randint(1, 5) * c);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`
					texte_corr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${0 - d}$`
					texte_corr += '<br> Donc ' + `$x=-${tex_fraction(b, a)}$` + ' ou ' + `$x=-${tex_fraction(d, c)}$`
					texte_corr += '<br> Donc ' + `$x=${0 - b / a}$` + ' ou ' + `$x=${0 - d / c}$`
					break;
				case 4: a = randint(2, 6); 	//(ax+b)(cx-d)=0  avec b/a et d/c entiers.
					b = Math.round(randint(1, 5) * a);
					c = randint(2, 6, [a]);
					d = Math.round(randint(1, 5) * c);
					texte = `$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>' + `$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x-${d}=0$`
					texte_corr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${d}$`
					texte_corr += '<br> Donc ' + `$x=-${tex_fraction(b, a)}$` + ' ou ' + `$x=${tex_fraction(d, c)}$`
					texte_corr += '<br> Donc ' + `$x=${0 - b / a}$` + ' ou ' + `$x=${d / c}$`
					break;
				case 5:
					a = randint(2, 9);	//(ax+b)(cx+d)=0 	avec b/a et d/c quelconques.
					b = randint(1, 20, [a]);
					c = randint(2, 9, [a]);
					d = randint(1, 20, [b, c]);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>' + `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x+${d}=0$`
					texte_corr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${0 - d}$`
					texte_corr += '<br> Donc ' + `$x=-${tex_fraction(b, a)}$`
					if (tex_fraction(b, a) != tex_fraction_reduite(b, a)) { texte_corr += `$=-${tex_fraction_reduite(b, a)}$` }
					texte_corr += ' ou ' + `$x=-${tex_fraction(d, c)}$`
					if (tex_fraction(d, c) != tex_fraction_reduite(d, c)) { texte_corr += `$=-${tex_fraction_reduite(d, c)}$` }
					break;
				case 6:
					a = randint(2, 9);	//(ax+b)(cx-d)=0 	avec b/a et d/c quelconques.
					b = randint(1, 20, [a]);
					c = randint(2, 9, [a]);
					d = randint(1, 20, [b, c]);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>' + `$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr += '<br> Soit ' + `$${a}x+${b}=0$` + ' ou ' + `$${c}x-${d}=0$`
					texte_corr += '<br> Donc ' + `$${a}x=${0 - b}$` + ' ou ' + `$${c}x=${d}$`
					texte_corr += '<br> Donc ' + `$x=-${tex_fraction(b, a)}$`
					if (tex_fraction(b, a) != tex_fraction_reduite(b, a)) { texte_corr += `$=-${tex_fraction_reduite(b, a)}$` }
					texte_corr += ' ou ' + `$x=${tex_fraction(d, c)}$`
					if (tex_fraction(d, c) != tex_fraction_reduite(d, c)) { texte_corr += `$=${tex_fraction_reduite(d, c)}$` }

					break;
			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				// alert(this.liste_questions)
				// alert(this.liste_corrections)
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 : Coefficient de x = 1\n 2 : Coefficient de x>1 et solutions entières\n 3 : Solutions rationnelles\n 4 : Mélange des 3 autres niveaux'];
}

/**
 * Résoudre une équation de type x²=a
* @auteur Jean-Claude Lhote
* 3L15
*/

function Resoudre_une_equation_x2_egal_A() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre une équation du second degré";
	this.consigne = "Résoudre les équations suivantes";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1.5
	this.spacing = 1


	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
		[1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
		[1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
		let liste_type_de_questions = []
		switch (parseInt(this.sup)) {
			case 1: liste_type_de_questions = combinaison_listes([1], this.nb_questions);
				break;
			case 2: liste_type_de_questions = combinaison_listes([2], this.nb_questions);
				break;
			case 3: liste_type_de_questions = combinaison_listes([3], this.nb_questions);
				break;
			case 4: liste_type_de_questions = combinaison_listes([1, 2, 3], this.nb_questions);

		}
		for (let i = 0, fraction, ns, ds, a, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

			switch (liste_type_de_questions[i]) {
				case 1: a = randint(1, 20); // x²=a*a donc x=a ou -a.
					texte = `$x^2=${a * a}$`
					texte_corr = `$x^2=${a * a}$ équivaut à $x = \\sqrt{${a * a}}$ ou $x = -\\sqrt{${a * a}}$<br>Soit $x = ${a}$ ou $x = -${a}$<br>`
					texte_corr += `Il est équivalent de résoudre $x^2 - ${a * a}=0$ c'est à dire $x^2 - ${a}^{2}=0$ <br>Soit $(x - ${a})(x + ${a})=0$ qui donne les deux solutions ci-dessus. `
					break;
				case 2: // x²=(ns*ns)/(ds*ds) solutions rationnelles
					fraction = choice(liste_fractions);
					ns = fraction[0]
					ds = fraction[1]
					texte = `$x^2=\\dfrac{${ns * ns}}{${ds * ds}}$`
					texte_corr = `$x^2=\\dfrac{${ns * ns}}{${ds * ds}}$ équivaut à $x = \\sqrt{\\dfrac{${ns * ns}}{${ds * ds}}}$ ou $x = -\\sqrt{\\dfrac{${ns * ns}}{${ds * ds}}}$<br>Soit $x = \\dfrac{${ns}}{${ds}}$ ou $x = -\\dfrac{${ns}}{${ds}}$<br>`
					texte_corr += `Il est équivalent de résoudre $x^2 - \\dfrac{${ns * ns}}{${ds * ds}}=0$ c'est à dire $x^2 - (\\dfrac{${ns}}{${ds}})^{2}=0$<br>Soit $(x - \\dfrac{${ns}}{${ds}})(x + \\dfrac{${ns}}{${ds}})=0$ qui donne les deux solutions ci-dessus. `
					break;

				case 3: a = randint(2, 50, [4, 9, 16, 25, 36, 49]); 	//solution irrationnelles
					texte = `$x^2=${a}$`
					texte_corr = `$x^2=${a}$ équivaut à $x = \\sqrt{${a}}$ ou $x = -\\sqrt{${a}}$<br>`
					texte_corr += `Il est équivalent de résoudre $x^2 - ${a}=0$  c'est à dire $x^2 - (\\sqrt{${a}})^{2}=0$<br>Soit $(x - \\sqrt{${a}})(x + \\sqrt{${a}})=0$ qui donne les deux solutions ci-dessus. `
					break;

			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				// alert(this.liste_questions)
				// alert(this.liste_corrections)
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 : solutions entières\n 2 : solutions rationnelles\n 3 : Solutions irrationnelles\n 4 : Mélange des 3 autres niveaux'];
}

/**
 * 3F1-act - Notion de fonction - vocabulaire
 * L’objectif de revenir sur l'introduction de la notion de fonction et son vocabulaire
 * On base l'exercice sur des calculs simples de type périmètres, aires, double, triple, nombre de diviseurs
 * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
 * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
 * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
 * @Auteur Sébastien Lozano
 */

function fonction_notion_vocabulaire() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Fonctions : Notion et vocabulaire";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Étudier différents procédés de calcul.`;
	// this.consigne += "Lorsqu'un nombre $\\textit{x}$ entre dans une machine mathématique , celle-ci renvoie à la sortie un nombre appelé $\\textit{image de x}$.<br>";
	// this.consigne += "On dit que le nombre de départ est un $\\textit{antécédent}$ du nombre qu'on trouve à la sortie.<br>";
	// this.consigne += "Ces machines sont appelées $\\textit{fonctions}$, on a l'habitude de leur donner des noms $\\textit{f}$ ou $\\textit{g}$ ou $\\textit{h} \\ldots$";
	// this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 4;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = `bclogo`;

	var num_ex = '3F1-act'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
		var hauteur_svg = 100;
	} else { // sortie LaTeX

	};
	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		this.introduction = lampe_message({
			titre : `Introduction`,
			texte : `Lorsqu'un nombre $\\textit{x}$ entre dans une machine mathématique , celle-ci renvoie à la sortie un nombre appelé $\\textit{image de x}$.<br>
				On dit que le nombre de départ est un $\\textit{antécédent}$ du nombre qu'on trouve à la sortie.<br>
				Ces machines sont appelées $\\textit{fonctions}$, on a l'habitude de leur donner des noms $\\textit{f}$ ou $\\textit{g}$ ou $\\textit{h} \\ldots$
				<br>`,
			couleur : `nombres`
		});

		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheFonctions-3F1-act.pdf", "Aide mémoire sur les fonctions (Sébastien Lozano)", "Aide mémoire")
			this.bouton_aide += modal_video('conteMathsFonctions', 'videos/Fonctions.mp4', 'Petit conte mathématique', 'Intro Vidéo');
			this.introduction += machine_maths_video(`videos/machineMathsIntro.mp4`);
		} else { // sortie LaTeX
			this.introduction += tikz_machine_maths('maths', '---', `Proc\\acute{e}d\\acute{e}`, 'de\\,calcul', `ant\\acute{e}c\\acute{e}dent`, `\\textit{x}`, `image`, `\\textit{y}`);
		};
		for (let i = 0, x, y, z, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			if (sortie_html) {
				var id_unique = `${num_ex}_${i}_${Date.now()}`
				var id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
				var id_du_div_diag = `div_svg_diag${numero_de_l_exercice}${id_unique}`;
				var id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
			}
			let txt_info;

			switch (type_de_questions) {
				case 1: // périmètre d'un carré de côté x			
					var j = 0; // pour la sous-numérotation
					// question
					if (sortie_html) {
						texte = `La $\\mathbf{machine\\,f}$ renvoie le ` + katex_Popup(`périmètre`, `Rappel`, `Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés`) + ` d'un carré de côté $x$`;
					} else {
						texte = `La $\\mathbf{machine\\,f}$ renvoie le \\textbf{périmètre} \\footnote{\\textbf{Rappel :} Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés} d'un carré de côté $x$`;
					}
					texte += `<br>`;
					// machine						
					x = randint(2, 99);//augmenter les possibles pour éviter les questions déjà posées?	
					if (sortie_html) {
						texte += machine_maths_video(`videos/machineMaths-f.mp4`);
					} else { // sortie Latex avec Tikz
						texte += tikz_machine_maths('f', '---', `P\\acute{e}rim\\grave{e}tre`, `d'un\\,carr\\acute{e}`, `carr\\acute{e}\\,de`, `c\\hat{o}t\\acute{e}\\,${x}\\,cm`, `P\\acute{e}rim\\grave{e}tre`, `???\\,cm`);
					};
					// sous question a/						
					if (sortie_html) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
						texte += katex_Popup('avec le mot image', 'Image', 'La valeur du périmètre est l\'image de la valeur du côté') + `<br>`;
						texte_corr = num_alpha(j) + ` Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire $${x}+${x}+${x}+${x} = 4\\times ${x} = ${4 * x}$ cm.<br>`;
						texte_corr += `On dit que ${4 * x} est l'image de ${x} par la fonction f.<br>`;
						j++;//incrémente la sous question	
					} else { //sortie LaTeX
						texte += `\\begin{enumerate}[itemsep=1em]`;
						texte += `\\item Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse avec le mot \\textbf{image} \\footnote{\\textbf{Image :} La valeur du périmètre est l\'image de la valeur du côté}`;
						texte_corr = `\\begin{enumerate}[itemsep=1em]`;
						texte_corr += `\\item Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire $${x}+${x}+${x}+${x} = 4\\times ${x} = ${4 * x}$ cm.<br>`;
						texte_corr += `On dit que ${4 * x} est l'image de ${x} par la fonction f.`;
					};

					// sous question b/	
					y = randint(2, 99, [x]);//augmenter les possibles pour éviter les questions déjà posées?	
					if (sortie_html) {
						texte += num_alpha(j) + ` Combien vaut le côté si la machine renvoie  ${4 * y} cm ? Formuler la réponse `;
						texte += katex_Popup('avec le mot antécédent', 'Antécédent', 'un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre') + `<br>`;
						texte_corr += num_alpha(j) + ` Si la machine renvoie un périmètre de ${4 * y} cm alors le côté du carré vaut $${4 * y}\\div 4 = ${y}$ cm.<br>`;
						texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${4 * y} par la fonction f.<br>`;
						j++;//incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\item Combien vaut la longueur du côté si la machine renvoie  ${4 * y} cm ? Formuler la réponse avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre}`;
						texte_corr += `\\item Si la machine renvoie un périmètre de ${4 * y} cm alors le côté du carré vaut $${4 * y}\\div 4 = ${y}$ cm.<br>`;
						texte_corr += `On dit que ${y} est \\textbf{un} antécédent de ${4 * y} par la fonction f.`;
					};

					// sous question c/
					z = randint(2, 99, [x, y]);//augmenter les possibles pour éviter les questions déjà posées?						
					if (sortie_html) {
						texte += num_alpha(j) + ` Quelle est l'image de ${z} par la `;
						texte += katex_Popup('fonction', 'Vocabulaire', '<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');
						texte += ` $\\mathbf{f}$ ? &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{f(' + z + ')=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>') + `<br>`;
						texte_corr += num_alpha(j) + ` L'image de ${z} par la fonction f vaut $f(${z})=4\\times ${z}=${4 * z}$.<br>`;
						j++;//incrémente la sous question	
					} else { // sortie LaTeX
						texte += `\\item Quelle est l'image de ${z} par la \\textbf{fonction f} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques}`;
						texte += ` ? \\'{E}crire la réponse sous la forme $\\mathbf{f(${z})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;
						texte_corr += `\\ item L'image de ${z} par la fonction f vaut $f(${z})=4\\times ${z}=${4 * z}$.`;
					};

					// sous question d/
					if (sortie_html) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut $x$ cm ?`;
						texte += ` &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>') + `<br>`;
						texte_corr += num_alpha(j) + ` Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ce qui est équivalent à $4\\times x$ .<br>`;						
						texte_corr += ` L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.<br>`;
						j++;//incrémente la sous question	
					} else { // sortie LaTeX
						texte += `\\item   Que renvoie la machine si le côté vaut $x$ cm ?`;
						texte_corr += `\\item  Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ce qui est équivalent à $4\\times x$ .`;
						texte += ` \\'{E}crire la réponse sous la forme $\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;
					 	texte_corr += ` L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.`;
					};

					// sous question e/
					txt_info =  `Voici le diagramme d'une machine qui triple `;
					if (sortie_html) {
						texte += num_alpha(j) + ` Comme dans l’exemple ci-dessous, écrire le diagramme de la fonction $\\mathbf{f}$.<br>`;
						//texte += `Voici le diagramme d'une machine qui triple `;
						//texte += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						txt_info += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F1_act_mono(id_du_div_diag, 800, 100, 't', 'x', [['3', '3x']]);
						texte_corr += num_alpha(j) + ` C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
						texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F1_act_mono(id_du_div_corr, 800, 100, 'f', 'x', [['4', '4x']]);
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item   \\'{E}crire la réponse à la question d/ sous forme de diagramme, comme dans l’exemple ci-dessous.<br>`;
						//texte += `Voici le diagramme d'une machine qui triple <br> `;
						//texte += tikz_machine_diag(`f`, `x`, [[`\\times 3`, `3x`]]);
						txt_info += '<br>'+tikz_machine_diag(`t`, `x`, [[`\\times 3`, `3x`]]);
						texte_corr += `\\item  C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
						texte_corr += tikz_machine_diag(`f`, `x`, [[`\\times 4`, `4x`]]);
					};
					texte += info_message({
						titre:'Exemple',
						texte:txt_info,
						couleur:'nombres'
					});

					// // sous question f/
					// if (sortie_html) {
					// 	texte += num_alpha(j) + ` &Eacute;crire la réponse à la question ` + num_alpha(j - 2) + ` sous la forme `;
					// 	texte += katex_Popup('$\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>') + `<br>`;
					// 	texte_corr += num_alpha(j) + ` L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.<br>`;
					// 	j++;//incrémente la sous question
					// } else { // sortie LaTeX
					// 	texte += `\\item   \\'{E}crire la réponse à la question d/ sous la forme $\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;
					// 	texte_corr += `\\item  L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.`;
					// };

					// sous question g/
					if (sortie_html) {
						texte += num_alpha(j) + ` Ecrire maintenant la fonction f en utilisant la forme  `;
						texte += katex_Popup('$\\mathbf{f:\\textbf{\\textit{x}}\\longmapsto \\ldots}$', 'Notation', '4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f:4\\longmapsto 16}$');
						//texte += `écrire la réponse à la question ` + num_alpha(j - 3) + `<br>`;
						texte_corr += num_alpha(j) + ` L'image de $x$ par la fonction f vaut $4\\times x$ donc $f:x\\longmapsto 4\\times x$.<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item   Ecrire maintenant la fonction f en utilisant la forme $\\mathbf{f:\\textbf{\\textit{x}}\\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f:4\\longmapsto 16}$},`;
						//texte += ` écrire la réponse à la question d/`;
						texte_corr += `\\item  L'image de $x$ par la fonction f vaut $4\\times x$ donc $f:x\\longmapsto 4\\times x$.`;
						texte += `\\end{enumerate}`;
						texte_corr += `\\end{enumerate}`;
					};
					break;
				case 2: // aire d'un carré de côté x
					var j = 0; // pour la sous-numérotation
					if (sortie_html) {
						texte = `La $\\textbf{machine\\,g}$ renvoie ` + katex_Popup('l\'aire', 'Rappel', 'L\'aire d\'un carré est égale au produit de la longueur de son côté par lui-même.') + ` d'un carré de côté $x$`;
					} else {
						texte = `La $\\textbf{machine\\,g}$ renvoie \\textbf{l\'aire} \\footnote{\\textbf{Rappel :} L\'aire d\'un carré est égale au produit de la longueur de son côté par lui-même.} d'un carré de côté $x$`;
					}
					texte += `<br>`;
					// machine
					x = randint(2, 99);//augmenter les possibles pour éviter les questions déjà posées?	
					if (sortie_html) {
						texte += machine_maths_video(`videos/machineMaths-g.mp4`);
					} else { // sortie Latex avec Tikz
						texte += tikz_machine_maths('g', '---', `Aire`, `d'un\\,carr\\acute{e}`, `carr\\acute{e}\\,de`, `c\\hat{o}t\\acute{e}\\,${x}\\,cm`, `Aire`, `???\\,cm^2`);
					};
					// sous question a/	
					if (sortie_html) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
						texte += katex_Popup('avec le mot image', 'Image', 'la valeur de l\'aire est l\'image de la valeur du côté') + `<br>`;
						texte_corr = num_alpha(j) + ` Si le côté vaut ${x} cm alors la machine renvoie l'aire d'un carré de côté ${x} cm, c'est à dire $${x}\\times ${x}=${tex_nombre(x * x)}\\,cm^2$.<br>`;
						texte_corr += `On dit que ${nombre_avec_espace(x * x)} est l'image de ${x} par la fonction g.<br>`;
						j++;//incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\begin{enumerate}[itemsep=1em]`;
						texte += `\\item  Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
						texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image :} La valeur de l\'aire est l\'image de la valeur du côté.}`;
						texte_corr = `\\begin{enumerate}[itemsep=1em]`;
						texte_corr += `\\item Si le côté vaut ${x} cm alors la machine renvoie l'aire d'un carré de côté ${x} cm, c'est à dire $${x}\\times ${x}=${tex_nombre(x * x)}\\,cm^2$.<br>`;
						texte_corr += `On dit que ${nombre_avec_espace(x * x)} est l'image de ${x} par la fonction g.`;
					};

					// sous question b/	
					y = randint(2, 99, [x]);//augmenter les possibles pour éviter les questions déjà posées?	
					if (sortie_html) {
						texte += num_alpha(j) + ` Combien vaut le côté si la machine renvoie  ${nombre_avec_espace(y * y)} cm<sup>2</sup> ? Formuler la réponse `;
						texte += katex_Popup('avec le mot antécédent', 'Antécédent', 'un antécédent de la valeur d\'une aire est une valeur du côté qui a pour image cette aire') + `<br>`;
						texte_corr += num_alpha(j) + ` Si la machine renvoie une aire de $${tex_nombre(y * y)}\\,cm^2$ alors le côté du carré vaut $\\sqrt{${tex_nombre(y * y)}}=${y}\\,cm$.<br>`;
						texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${y * y} par la fonction g.<br>`;
						j++;//incrémente la sous question	
					} else { //sortie LaTeX
						texte += `\\item  Combien vaut la longueur du côté si la machine renvoie  ${nombre_avec_espace(y * y)} $cm^2$ ? Formuler la réponse `;
						texte += `avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent de la valeur d\'une aire est une valeur du côté qui a pour image cette aire}`;
						texte_corr += `\\item Si la machine renvoie une aire de $${tex_nombre(y * y)}\\,cm^2$ alors le côté du carré vaut $\\sqrt{${tex_nombre(y * y)}}=${y}\\,cm$.<br>`;
						texte_corr += `On dit que ${y} est \\textbf{un} antécédent de ${nombre_avec_espace(y * y)} par la fonction g.`;
					};

					// sous question c/
					z = randint(2, 99, [x, y]);//augmenter les possibles pour éviter les questions déjà posées?							
					if (sortie_html) {
						texte += num_alpha(j) + ` Quelle est l'image de ${z} par la `;
						texte += katex_Popup('fonction', 'Vocabulaire', '<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');
						texte += ` $g$ ? &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{g(' + z + ')=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction g peut s\'écrire <b>g(4)=16</b>') + `<br>`;
						texte_corr += num_alpha(j) + ` L'image de ${z} par la fonction g vaut $g(${z})=${z}\\times ${z}=${tex_nombre(z * z)}$.<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  Quelle est l'image de ${z} par la `;
						texte += `\\textbf{fonction g} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques.}`;
						texte += ` ? \\'{E}crire la réponse sous la forme `;
						texte += `$\\mathbf{g(${z})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire \\textbf{g(4)=16}}`;
						texte_corr += `\\item L'image de ${z} par la fonction g vaut $g(${z})=${z}\\times ${z}=${tex_nombre(z * z)}$.`;
					};

					// sous question d/
					if (sortie_html) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
						texte_corr += num_alpha(j) + ` Si le côté vaut $x$ la machine renvoie $x\\times x$ ce qui est équivalent à $x^2$ .<br>`;
						j++;//incrémente la sous question	
					} else {
						texte += `\\item  Que renvoie la machine si le côté vaut $x$ cm ?`;
						texte_corr += `\\item Si le côté vaut $x$ la machine renvoie $x\\times x$ ce qui est équivalent à $x^2$ .`;
					};

					// sous question e/
					txt_info =  `Voici le diagramme d'une machine qui double `;
					if (sortie_html) {
						texte += num_alpha(j) + ` &Eacute;crire la réponse à la question ` + num_alpha(j - 1) + ` sous forme de diagramme.<br>`;
						// texte += `Voici le diagramme d'une machine qui double `;
						// texte += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						txt_info += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F1_act_mono(id_du_div_diag, 800, 100, 'g', 'x', [['2', '2x']]);
						texte_corr += num_alpha(j) + ` C'est une machine qui multiplie un nombre par lui-même, donc sous forme de diagramme.<br>`;
						texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F1_act_mono(id_du_div_corr, 800, 100, 'g', 'x', [['x', 'x²']]);
						j++;//incrémente la sous question
					} else {
						texte += `\\item  \\'{E}crire la réponse à la question d/ sous forme de diagramme.<br>`;
						// texte += `Voici le diagramme d'une machine qui double <br>`;
						// texte += tikz_machine_diag(`g`, `x`, [[`\\times 2`, `2x`]]);
						txt_info += '<br>'+tikz_machine_diag(`g`, `x`, [[`\\times 2`, `2x`]]);
						texte_corr += `\\item C'est une machine qui multiplie un nombre par lui-même, donc sous forme de diagramme.<br>`;
						texte_corr += tikz_machine_diag(`g`, `x`, [[`\\times x`, `x^2`]]);
					};
					texte += info_message({
						titre:'Exemple',
						texte:txt_info,
						couleur:'nombres'
					});

					// sous question f/
					if (sortie_html) {
						texte += num_alpha(j) + ` &Eacute;crire la réponse à la question ` + num_alpha(j - 2) + ` sous la forme `;
						texte += katex_Popup('$\\mathbf{g(\\textbf{\\textit{x}})=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction g peut s\'écrire <b>g(4)=16</b>') + `<br>`;
						texte_corr += num_alpha(j) + ` L'image de $x$ par la fonction g vaut $x\\times x = x^2$ donc $g(x)=x\\times x=x^2$.<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  \\'{E}crire la réponse à la question d/ sous la forme `;
						texte += `$\\mathbf{g(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire \\textbf{g(4)=16}}`;
						texte_corr += `\\item L'image de $x$ par la fonction g vaut $x\\times x = x^2$ donc $g(x)=x\\times x=x^2$.`;
					};

					// sous question g/
					if (sortie_html) {
						texte += num_alpha(j) + ` En utilisant la forme `;
						texte += katex_Popup('$\\mathbf{g:\\textbf{\\textit{x}} \\longmapsto \\ldots}$', 'Notation', '4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g:4\\longmapsto 16}$');
						texte += ` écrire la réponse à la question ` + num_alpha(j - 3) + `<br>`;
						texte_corr += num_alpha(j) + ` L'image de $x$ par la fonction g vaut $x\\times x=x^2$ donc $g:x\\longmapsto x\\times x=x^2$.<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  En utilisant la forme `;
						texte += `$\\mathbf{g:\\textbf{\\textit{x}} \\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g:4\\longmapsto 16}$'}`;
						texte += ` écrire la réponse à la question d/ `;
						texte_corr += `\\item L'image de $x$ par la fonction g vaut $x\\times x=x^2$ donc $g:x\\longmapsto x\\times x=x^2$.`;
						texte += `\\end{enumerate}`;
						texte_corr += `\\end{enumerate}`;
					};
					break;
				case 3: // somme de 1 et du triple de x
					var j = 0; // pour la sous-numérotation
					// consigne
					texte = `La $\\mathbf{machine\\,h}$ renvoie la somme du triple du nombre de départ et de 1.`;
					texte += `<br>`;
					// machine
					x = randint(2, 99);//augmenter les possibles pour éviter les questions déjà posées?	
					if (sortie_html) {
						texte += machine_maths_video(`videos/machineMaths-h.mp4`);
					} else { // sortie Latex avec Tikz
						texte += tikz_machine_maths('h', '---', `Multiplier\\,par\\,3`, `Ajouter\\,1`, `nombre\\,de`, `d\\acute{e}part\\,${x}`, `nombre\\,de`, `sortie\\,?`);
					};
					// sous question a/
					if (sortie_html) {
						texte += num_alpha(j) + ` Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
						texte += katex_Popup('avec le mot image', 'Image', 'l\'image de la valeur à la sortie de la machine') + `<br>`;
						texte_corr = num_alpha(j) + ` Si le nombre de départ vaut ${x} alors la machine renvoie $3\\times${x} + 1 = ${3 * x + 1}$<br>`;
						texte_corr += `On dit que ${3 * x + 1} est l'image de ${x} par la fonction g.<br>`;
						j++;//incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\begin{enumerate}[itemsep=1em]`;
						texte += `\\item  Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
						texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image :} L\'image de la valeur à la sortie de la machine.}`;
						texte_corr = `\\begin{enumerate}[itemsep=1em]`;
						texte_corr += `\\item Si le nombre de départ vaut ${x} alors la machine renvoie $3\\times${x} + 1 = ${3 * x + 1}$<br>`;
						texte_corr += `On dit que ${3 * x + 1} est l'image de ${x} par la fonction g.`;
					};

					// sous question b/
					y = randint(2, 99, [x]);//augmenter les possibles pour éviter les questions déjà posées?	
					if (sortie_html) {
						texte += num_alpha(j) + ` Combien vaut le nombre de départ si la machine renvoie  ${3 * y + 1} ? Formuler la réponse `;
						texte += katex_Popup('avec le mot antécédent', 'Antécédent', 'un antécédent d\'une valeur de sortie est une valeur du nombre de départ dont l\'image est ce nombre de sortie') + `<br>`;
						texte_corr += num_alpha(j) + ` Si la machine renvoie $${3 * y + 1}$ alors le nombre de départ vaut $(${3 * y + 1}-1)\\div 3=${y}$<br>`;
						texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${3 * y + 1} par la fonction g.<br>`;
						j++;//incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\item  Combien vaut le nombre de départ si la machine renvoie  ${3 * y + 1} ? Formuler la réponse `;
						texte += `avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent d\'une valeur de sortie est une valeur du nombre de départ dont l\'image est ce nombre de sortie.}`;
						texte_corr += `\\item Si la machine renvoie $${3 * y + 1}$ alors le nombre de départ vaut $(${3 * y + 1}-1)\\div 3=${y}$<br>`;
						texte_corr += `On dit que ${y} est \\textbf{un} antécédent de ${3 * y + 1} par la fonction g.`;
					};

					// sous question c/
					z = randint(2, 99, [x, y]);//augmenter les possibles pour éviter les questions déjà posées?	
					if (sortie_html) {
						texte += num_alpha(j) + ` Quelle est l'image de ${-z} par la `;
						texte += katex_Popup('fonction', 'Vocabulaire', '<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');
						texte += ` $h$ ? &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{h(' + (-z) + ')=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction h peut s\'écrire <b>h(4)=16</b>') + `<br>`;
						texte_corr += num_alpha(j) + ` L'image de ${-z} par la fonction h vaut $h(${-z})=3\\times (${-z})+1=${-3 * z + 1}$.<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  Quelle est l'image de ${-z} par la `;
						texte += `\\textbf{fonction h} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques}`;
						texte += ` ? \\'{E}crire la réponse sous la forme `;
						texte += `$\\mathbf{h(${-z})=\\ldots}$ \\footnote{\\textbf{Notation : } 4 a pour image 16 par la fonction h peut s\'écrire \\textbf{h(4)=16}}`;
						texte_corr += `\\item L'image de ${-z} par la fonction h vaut $h(${-z})=3\\times (${-z})+1=${-3 * z + 1}$.`;
					};

					// sous question d/
					if (sortie_html) {
						texte += num_alpha(j) + ` Que renvoie la machine si le côté vaut $x$ ?<br>`;
						texte_corr += num_alpha(j) + ` Si le côté vaut $x$ la machine renvoie $3\\times x + 1$ ce qui est équivalent à $3x + 1$ .<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  Que renvoie la machine si le côté vaut $x$ ?`;
						texte_corr += `\\item Si le côté vaut $x$ la machine renvoie $3\\times x + 1$ ce qui est équivalent à $3x + 1$ .`;
						j++;//incrémente la sous question
					};

					// sous question e/
					txt_info = `Voici le diagramme d'une machine qui double puis qui ajoute 5 `;
					if (sortie_html) {
						texte += num_alpha(j) + ` &Eacute;crire la réponse à la question ` + num_alpha(j - 1) + ` sous forme de diagramme.<br>`;
						// texte += `Voici le diagramme d'une machine qui double puis qui ajoute 5 `;
						// texte += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						txt_info += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F12(id_du_div_diag, 800, 100, 'h', 'x', [['2', '2x'], ['5', '2x+5']]);
						texte_corr += num_alpha(j) + ` C'est une machine qui triple un nombre et ajoute 1, donc sous forme de diagramme.<br>`;
						texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F12(id_du_div_corr, 800, 100, 'h', 'x', [['3', '3x'], ['1', '3x+1']]);
						j++;//incrémente la sous question
					} else {
						texte += `\\item  \\'{E}crire la réponse à la question d/ sous forme de diagramme.<br>`;
						// texte += `Voici le diagramme d'une machine qui double puis qui ajoute 5 <br>`;
						// texte += tikz_machine_diag(`h`, `x`, [[`\\times 2`, `2x`], [`+5`, `2x+5`]]);
						txt_info +='<br>'+tikz_machine_diag(`h`, `x`, [[`\\times 2`, `2x`], [`+5`, `2x+5`]]);
						texte_corr += `\\item C'est une machine qui triple un nombre et ajoute 1, donc sous forme de diagramme.<br>`;
						texte_corr += tikz_machine_diag(`h`, `x`, [[`\\times 3`, `3x`], [`+1`, `3x+1`]]);
					};
					texte += info_message({
						titre:'Exemple',
						texte:txt_info,
						couleur:'nombres'
					});

					// sous question f/
					if (sortie_html) {
						texte += num_alpha(j) + ` &Eacute;crire la réponse à la question ` + num_alpha(j - 2) + ` sous la forme `;
						texte += katex_Popup('$\\mathbf{h(\\textbf{\\textit{x}})=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction h peut s\'écrire <b>h(4)=16</b>') + `<br>`;
						texte_corr += num_alpha(j) + ` L'image de $x$ par la fonction h vaut $3\\times x + 1 = 3x + 1$ donc $h(x)=3\\times x + 1$ soit $h(x) = 3x + 1$.<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  \\'{E}crire la réponse à la question d/ sous la forme `;
						texte += `$\\mathbf{h(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction h peut s\'écrire \\textbf{h(4)=16}}`;
						texte_corr += `\\item L'image de $x$ par la fonction h vaut $3\\times x + 1 = 3x + 1$ donc $h(x)=3\\times x + 1$ soit $h(x) = 3x + 1$.`;
					};

					// sous question g/
					if (sortie_html) {
						texte += num_alpha(j) + ` En utilisant la forme `;
						texte += katex_Popup('$\\mathbf{h:\\textbf{\\textit{x}} \\longmapsto \\ldots}$', 'Notation', '4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h:4\\longmapsto16}$');
						texte += ` écrire la réponse à la question ` + num_alpha(j - 3) + `<br>`;
						texte_corr += num_alpha(j) + ` L'image de $x$ par la fonction h vaut $3\\times x +1= 3x + 1$ donc $h : x \\longmapsto 3\\times x + 1$ soit $h : x \\longmapsto 3x + 1$.<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item  En utilisant la forme `;
						texte += `$\\mathbf{h:\\textbf{\\textit{x}} \\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h:4\\longmapsto16}$}`;
						texte += ` écrire la réponse à la question d/`;
						texte_corr += `\\item L'image de $x$ par la fonction h vaut $3\\times x +1= 3x + 1$ donc $h : x \\longmapsto 3\\times x + 1$ soit $h : x \\longmapsto 3x + 1$.`;
						texte += `\\end{enumerate}`;
						texte_corr += `\\end{enumerate}`;
					};
					break;
				case 4: // nombre de diviseurs de x entier
					var j = 0; // pour la sous-numérotation
					// consigne
					texte = `La $\\mathbf{machine\\,d}$, qui n'accepte que des nombres entiers positifs, renvoie le nombre de diviseurs du nombre de départ.`;
					texte += `<br>`;
					// machine
					x = randint(2, 51);//augmenter les possibles pour éviter les questions déjà posées?						
					if (sortie_html) {
						texte += machine_maths_video(`videos/machineMaths-d.mp4`);
					} else { // sortie Latex avec Tikz
						texte += tikz_machine_maths('d', '---', `nombre \\, total`, `de \\, diviseurs`, `nombre\\,de`, `d\\acute{e}part\\,${x}`, `nombre \\, de`, `diviseurs`);
					};
					// sous question a/
					if (sortie_html) {
						texte += num_alpha(j) + ` Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
						texte += katex_Popup('avec le mot image', 'Image', 'l\'image de la valeur à la sortie de la machine') + `<br>`;
						texte_corr = num_alpha(j) + ` Pour trouver la liste des diviseurs de ${x} on cherche tous les produits de deux facteurs qui donnent ${x}<br>`;
						j++;//incrémente la sous question
					} else { //sortie LaTeX
						texte += `\\begin{enumerate}[itemsep=1em]`;
						texte += `\\item Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
						texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image : } L\'image de la valeur à la sortie de la machine}`;
						texte_corr = `\\begin{enumerate}[itemsep=1em]`;
						texte_corr += `\\item Pour trouver la liste des diviseurs de ${x} on cherche tous les produits de deux facteurs qui donnent ${x}<br>`;
					};
					if (liste_diviseurs(x).length % 2 == 0) {//si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(x).length / 2); m++) {
							texte_corr += `$` + liste_diviseurs(x)[m] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - m - 1)] + `$<br>`;
						};
					} else {
						for (let m = 0; m < ((liste_diviseurs(x).length - 1) / 2); m++) {
							texte_corr += `$` + liste_diviseurs(x)[m] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - m - 1)] + `$<br>`;
						};
						texte_corr += `$` + liste_diviseurs(x)[(liste_diviseurs(x).length - 1) / 2] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - 1) / 2] + `$<br>`;
					};
					texte_corr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${x}<br>`;
					texte_corr += `La liste des diviseurs de ${x} est donc ` + liste_diviseurs(x) + `; Cette liste compte ` + liste_diviseurs(x).length + ` nombres. <br>`;
					texte_corr += `Donc ` + liste_diviseurs(x).length + ` est l'image de ${x} par la fonction d.`;
					if (sortie_html) {
						texte_corr += `<br>`;
					};

					// sous question b/
					x = randint(1, 9);//augmenter les possibles pour éviter les questions déjà posées?
					if (sortie_html) {
						//texte += num_alpha(j) + ` Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ?<br>`;
						texte += num_alpha(j) + ` Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ? En existe-t-il plusieurs ?<br>`;
						texte_corr += num_alpha(j) + ` Si la machine renvoie 2 alors le nombre de départ  a exactement 2 diviseurs, tous les`;
						texte_corr += katex_Popup('nombres premiers', 'Nombre premier', 'Un nombre entier est un <b>nombre premier</b> si il a exactement deux diviseurs, 1 et lui-même.');
						texte_corr += `conviennent.<br>`;
						texte_corr += `2 est premier donc 2 est <b>un</b> antécédent de 2 par la fonction d.<br>`;
						texte_corr += `7 est premier donc 7 est <b>un autre</b> antécédent de 2 par la fonction d.<br>`;
						j++;//incrémente la sous question
					} else {
						//texte += `\\item Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ?`;
						texte += `\\item Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ? En existe-til plusieurs ?`;
						texte_corr += ` \\item Si la machine renvoie 2 alors le nombre de départ  a exactement 2 diviseurs, tous les`;
						texte_corr += `\\textbf{nombres premiers} \\footnote{\\textbf{Nombre premier :} Un nombre entier est un \\textbf{nombre premier} si il a exactement deux diviseurs, 1 et lui-même.}`;
						texte_corr += `conviennent.<br>`;
						texte_corr += `2 est premier donc 2 est \\textbf{un} antécédent de 2 par la fonction d.<br>`;
						texte_corr += `7 est premier donc 7 est \\textbf{un autre} antécédent de 2 par la fonction d.`;
					};

					// sous question c/
					x = randint(51, 99);//augmenter les possibles pour éviter les questions déjà posées?	
					if (sortie_html) {
						texte += num_alpha(j) + ` Quelle est l'image de ${x} par la `;
						texte += katex_Popup('fonction', 'Vocabulaire', '<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');
						texte += ` $d$ ? &Eacute;crire la réponse sous la forme `;
						texte += katex_Popup('$\\mathbf{d(' + (x) + ')=\\ldots}$', 'Notation', '4 a pour image 16 par la fonction d peut s\'écrire <b>d(4)=16</b>') + `<br>`;
						texte_corr += num_alpha(j) + ` Pour trouver l'image de ${x} on peut par exemple chercher tous ses diviseurs et les compter<br>`;
						j++;//incrémente la sous question
					} else { // sortie LaTeX
						texte += `\\item Quelle est l'image de ${x} par la `;
						texte += `\\textbf{fonction d} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques.}`;
						texte += ` ? \\'{E}crire la réponse sous la forme `;
						texte += `$\\mathbf{d(` + (x) + `)=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction d peut s\'écrire \\textbf{d(4)=16}}`;
						texte_corr += `\\item Pour trouver l'image de ${x} on peut par exemple chercher tous ses diviseurs et les compter<br>`;
					};
					if (liste_diviseurs(x).length % 2 == 0) {//si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(x).length / 2); m++) {
							texte_corr += `$` + liste_diviseurs(x)[m] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - m - 1)] + `$<br>`;
						};
					} else {
						for (let m = 0; m < ((liste_diviseurs(x).length - 1) / 2); m++) {
							texte_corr += `$` + liste_diviseurs(x)[m] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - m - 1)] + `$<br>`;
						};
						texte_corr += `$` + liste_diviseurs(x)[(liste_diviseurs(x).length - 1) / 2] + `\\times` + liste_diviseurs(x)[(liste_diviseurs(x).length - 1) / 2] + `$<br>`;
					};
					texte_corr += `La liste des diviseurs de ${x} est donc `;
					texte_corr += liste_diviseurs(x)[0];
					for (let k = 1; k < liste_diviseurs(x).length; k++) {
						texte_corr += ` ; ` + liste_diviseurs(x)[k];
					};
					texte_corr += ` ; Cette liste compte ` + liste_diviseurs(x).length + ` nombres.<br> `;
					texte_corr += `Donc ` + liste_diviseurs(x).length + ` est l'image de ${x} par la fonction d.`;
					if (sortie_html) {
						texte_corr += `<br>`;
					};

					// sous question d/
					if (sortie_html) {
						// texte += num_alpha(j) + ` Peut-on trouver deux antécédents de 3 par la fonction d ?<br>`;
						texte += num_alpha(j) + ` Peut-on trouver plusieurs antécédents de 3 par la fonction d ? Qu'ont-ils de commun ?<br>`;
						texte_corr += num_alpha(j) + ` Il faut trouver des nombres qui ont exactement 3 diviseurs.<br>`;
						j++;//incrémente la sous question
					} else {
						//texte += `\\item  Peut-on trouver deux antécédents de 3 par la fonction d ?`;
						texte += `\\item  Peut-on trouver plusieurs antécédents de 3 par la fonction d ? Qu'ont-ils de commun ?`;
						texte_corr += `\\item Il faut trouver des nombres qui ont exactement 3 diviseurs.<br>`;
					}
					texte_corr += `La liste des diviseurs de 9 est `;
					texte_corr += liste_diviseurs(9)[0];
					for (let k = 1; k < liste_diviseurs(9).length; k++) {
						texte_corr += ` ; ` + liste_diviseurs(9)[k];
					};
					texte_corr += ` ; Cette liste compte ` + liste_diviseurs(9).length + ` nombres, `;
					texte_corr += `donc 9 est un antécédent de 3 par la fonction d.<br>`;
					texte_corr += `La liste des diviseurs de 25 est `;
					texte_corr += liste_diviseurs(25)[0];
					for (let k = 1; k < liste_diviseurs(25).length; k++) {
						texte_corr += ` ; ` + liste_diviseurs(25)[k];
					};
					texte_corr += ` ; Cette liste compte ` + liste_diviseurs(25).length + ` nombres, `;
					texte_corr += `donc 25 est un antécédent de 3 par la fonction d.<br>`;
					texte_corr += `Tu peux en trouver d'autres, qu'ont ils de commun ?`
					if (!sortie_html) {
						texte += `\\end{enumerate}`;
						texte_corr += `\\end{enumerate}`;
					};
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}

		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
};

/**
 * 3F12 Notion de fonction - Vocabulaire
 * Déterminer à partir de plusieurs modes de représentation l'image d'un nombre
 * @author Sébastien LOZANO
 */

function fonctions_calculs_d_images() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Fonctions : Calculs d'images";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = ``;
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne += `Calcule les images avec la méthode demandée.`;

	sortie_html ? this.spacing = 2 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 4;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 5;

	var num_ex = '3F12'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
	} else { // sortie LaTeX

	};
	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//			 this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheFonctions-3F1-act.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")		
			//			 this.bouton_aide += modal_video('videoTest','videos/Fonctions.mp4','Petit conte mathématique','Intro Vidéo');
		}
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup == 1) {
			type_de_questions_disponibles = [1]; // prog de calcul
		} else if (this.sup == 2) {
			type_de_questions_disponibles = [2]; // diagramme
		} else if (this.sup == 3) {
			type_de_questions_disponibles = [3]; // f(x) = ...
		} else if (this.sup == 4) {
			type_de_questions_disponibles = [4]; // f : x ---> ...
		} else if (this.sup == 5) {
			type_de_questions_disponibles = [1, 2, 3, 4]; // mélange
		};
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		for (let i = 0, a, b, c, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			if (sortie_html) {
				let id_unique = `${num_ex}_${i}_${Date.now()}`
				var id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
				var id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
			}
			// on part sur de l'affine avec coeff positifs, on verra ensuite
			a = randint(2, 9);
			b = randint(2, 9);
			c = randint(2, 9);

			switch (type_de_questions) {
				case 1:
					var j = 0; // pour la sous-numérotation
					texte = `On donne le programme de calcul suivant qui correspond à une certaine fonction :`;
					texte_corr = `Avec ce programme de calcul :`
					if (sortie_html) {
						texte += `
							<br>
							<div class="ui compact warning message">		
							<p>							
							- Choisir un nombre<br>
							- Multiplier ce nombre par ${a}<br>
							- Ajouter ${b} au résultat obtenu<br>
							</p>
							</div>
							<br>`;
						// sous-question a/
						texte += num_alpha(j) + ` Appliquer ce programme de calcul au nombre ${c}<br>`;
						texte_corr += `<br>` + num_alpha(j) + `
							<br>
							<div class="ui compact warning message">		
							<p>							
							- On choisit le nombre ${c}<br>
							- On multiplie ce nombre par ${a} : ${a}$\\times$ ${c} = ${a * c}<br>
							- On ajoute ${b} au résultat obtenu : ${a * c}+${b}=${a * c + b}<br>
							</p>
							</div>
							<br>							
							`;
						j++;
						// sous-question b/
						texte += num_alpha(j) + ` Traduire ce calcul par une phrase contenant le mot image`;
						texte_corr += num_alpha(j) + `L'image de ${c} par cette fonction vaut ${a * c + b}`;
						texte_corr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par cette fonction`;
					} else {
						texte += tex_cadre_par_orange(itemize([`Choisir un nombre`, `Multiplier ce nombre par ${a}`, `Ajouter ${b} au résultat obtenu`]));
						// sous-question a/
						texte += tex_enumerate([`Appliquer ce programme de calcul au nombre ${c}`, `Traduire ce calcul par une phrase contenant le mot image`], this.spacing);
						//texte_corr += 
						texte_corr += tex_enumerate([tex_cadre_par_orange(itemize([`On choisit le nombre ${c}`, `On multiplie ce nombre par ${a} : $${a} \\times ${c} = ${a * c}$ `, `On ajoute ${b} au résultat obtenu : $${a * c}+${b}=${a * c + b}$`])), `L'image de ${c} par cette fonction vaut ${a * c + b}<br>On peut aussi dire que ${a * c + b} est l'image de ${c} par cette fonction`], this.spacing);
					};
					break;
				case 2:
					var j = 0; // pour la sous-numérotation
					// les variables a,b,c changent sans refaire un appel à randint
					texte = `Soit $f$ la fonction définie par l'expression algébrique $f(x)=$ ${a}$x+$${b}`;
					if (sortie_html) {
						// sous-question a/
						texte += `<br>` + num_alpha(j) + ` Calculer l'image de ${c}`;
						texte += `<br>`;
						texte_corr = num_alpha(j) + ` Calculons l'image par $f$ de $x= ${c}$ :`;
						texte_corr += `<br>$f(${mise_en_evidence('\\textit{\\textbf{x}}')})= ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$`;
						texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a}\\times ${mise_en_evidence(c)}+${b}$`;
						texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a * c}+${b}$`;
						texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a * c + b}$`;
						j++;
						//sous question b/
						texte += num_alpha(j) + ` Traduire ce calcul par une phrase contenant le mot image`;
						texte_corr += `<br>` + num_alpha(j) + ` L'image de ${c} par la fonction $f$ vaut ${a * c + b}`;
						texte_corr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $f$`;
					} else {
						// sous-question a/ et b/
						texte += tex_enumerate([`Calculer l'image de ${c}`, `Traduire ce calcul par une phrase contenant le mot image`], this.spacing);
						texte_corr = tex_enumerate([`Calculons l'image par $f$ de $x= ${c}$ :
							<br>$f(${mise_en_evidence('\\textit{\\textbf{x}}')})= ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a}\\times ${mise_en_evidence(c)}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a * c}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a * c + b}$`, `L'image de ${c} par la fonction $f$ vaut ${a * c + b}
							<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $f$`
						], this.spacing);
					};
					break;
				case 3:
					var j = 0; // pour la sous-numérotation
					// les variables a,b,c changent sans refaire un appel à randint
					texte = `Soit $g$ la fonction définie par $g:x\\longmapsto$ ${a}$x+$${b}`;
					if (sortie_html) {
						// sous-question a/
						texte += `<br>` + num_alpha(j) + ` Calculer l'image de ${c}`;
						texte += `<br>`;
						texte_corr = num_alpha(j) + ` Calculons l'image par $g$ de $x= ${c}$ :`;
						texte_corr += `<br>$g:${mise_en_evidence('\\textit{\\textbf{x}}')}\\longmapsto ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$`;
						texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a}\\times${mise_en_evidence(c)}+${b}$`;
						texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a * c}+${b}$`;
						texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a * c + b}$`;
						j++;
						//sous question b/
						texte += num_alpha(j) + ` Traduire ce calcul par une phrase contenant le mot image`;
						texte_corr += `<br>` + num_alpha(j) + ` L'image de ${c} par la fonction $g$ vaut ${a * c + b}`;
						texte_corr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`;
					} else {
						// sous-question a/ et b/
						texte += tex_enumerate([`Calculer l'image de ${c}`, `Traduire ce calcul par une phrase contenant le mot image`], this.spacing);
						texte_corr = tex_enumerate([`Calculons l'image par $g$ de $x= ${c}$ :
							<br>$g:${mise_en_evidence('\\textit{\\textbf{x}}')}\\longmapsto ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a}\\times ${mise_en_evidence(c)}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a * c}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a * c + b}$`, `L'image de ${c} par la fonction $g$ vaut ${a * c + b}
							<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`
						], this.spacing);
					};
					break;
				case 4:
					texte = ``;
					texte_corr = ``;
					texte_corr += `Calculer avec un diagramme `;
					var j = 0; // pour la sous-numérotation
					// les variables a,b,c changent sans refaire un appel à randint
					texte += `Soit la fonction $h$ définie par le diagramme `;
					if (sortie_html) {
						// sous-question a/
						texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
						SVG_machine_diag_3F12(id_du_div, 800, 100, 'h', 'x', [['' + a, a + 'x'], ['' + b, a + 'x+' + b]]);
						texte += num_alpha(j) + ` Calculer l'image de ${c}`;
						texte += `<br>`;
						texte_corr += `<br>`;
						texte_corr += num_alpha(j) + ` Calculons l'image par $h$ de $x=$ ${c} :`;
						texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; display : table "></div>`;
						SVG_machine_diag_3F12(id_du_div_corr, 800, 100, 'h', '' + c, [['' + a, '' + (a * c)], ['' + b, '' + (a * c + b)]]);
						j++;
						//sous question b/
						texte += num_alpha(j) + ` Traduire ce calcul par une phrase contenant le mot image`;
						texte_corr += `<br>` + num_alpha(j) + ` L'image de ${c} par la fonction $h$ vaut ${a * c + b}`;
						texte_corr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $h$`;
					} else {
						texte += `<br>` + tikz_machine_diag(`h`, `x`, [[`\\times ` + a, a + `x`], [`+` + b, a + `x+` + b]]);
						// sous-question a/ et b/
						texte += tex_enumerate([`Calculer l'image de ${c}`, `Traduire ce calcul par une phrase contenant le mot image`], this.spacing);
						texte_corr = tex_enumerate(
							[`Calculons l'image par $g$ de $x=$ ${c} :<br>` + tikz_machine_diag(`h`, c, [[`\\times ` + a, (a * c)], [`+` + b, (a * c + b)]]),
							`L'image de ${c} par la fonction $g$ vaut ${a * c + b}
						 	<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`
							], this.spacing);
					};
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}

		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Règle à travailler', 5, "1 : &Agrave; partir d'un programme de calcul\n2 : &Agrave; partir de l'expression algébrique sous forme f(x) = ...\n3 : &Agrave; partir de l'expression algébrique sous forme f : x --> ...\n4 : &Agrave; partir d'un diagramme\n5 : Mélange"];
};

/**
 * 3A10 - Division Euclidienne; diviseurs, multiples, critères de divisibilité
 * Exercice bilan
 * @author Sébastien Lozano
 */

function DivisionEuclidienne_multiplesDiviseurs_Criteres() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Division Euclidienne - Diviseurs - Multiples";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Divisions euclidiennes - Diviseurs - Multiples.`;
	//sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing = 1 : this.spacing = 2;
	//sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 2;
	this.nb_questions = 5;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A10.pdf", "Aide mémoire sur la division euclidienne (Sébastien Lozano)", "Aide mémoire")
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4, 5];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			var dividende;
			var diviseur;
			var quotient;
			var reste;

			switch (type_de_questions) {
				case 1: // plus grand reste dans une division euclidienne
					diviseur = randint(2, 99);
					texte = `Dire quel est le plus grand reste possible dans une division euclidienne par ${diviseur}.`;
					texte_corr = `Si on divise par ${diviseur}, il ne peut pas rester plus de ${diviseur - 1}, sinon c'est qu'on peut encore ajouter au moins 1 fois ${diviseur} dans le dividende et donc 1 au quotient.`;
					break;
				case 2: // quotient et reste d'une division euclidienne donnée
					diviseur = randint(2, 99);
					dividende = randint(1001, 99999);
					quotient = Math.trunc(dividende / diviseur);
					reste = dividende % diviseur;

					texte = `On a ${nombre_avec_espace(dividende)}=${nombre_avec_espace(diviseur)}$\\times$${nombre_avec_espace(quotient)} $+$ ${nombre_avec_espace(reste)}`;
					texte += `<br>`;
					texte += `Écrire le quotient et le reste de la division euclidienne de ${nombre_avec_espace(dividende)} par ${diviseur}.`;
					texte_corr = `Dans la division euclidienne de ${nombre_avec_espace(dividende)} par ${diviseur}, le quotient vaut ${nombre_avec_espace(quotient)} et le reste ${reste}.`;
					break;
				case 3: // caractérisation des multiples et diviseurs par le reste de la division euclidienne
					dividende = randint(101, 9999);
					let rg_diviseur; // rang du diviseur choisi
					if (liste_diviseurs(dividende).length % 2 == 0) {//si il y a un nombre pair de diviseurs on prend le (n/2+1) eme
						rg_diviseur = liste_diviseurs(dividende).length / 2 + 1;
					} else { // il y a nbre impair de diviseurs on prend le ((n-1)/2 +1) eme
						rg_diviseur = (liste_diviseurs(dividende).length - 1) / 2 + 1;
					}
					diviseur = liste_diviseurs(dividende)[rg_diviseur - 1]; // on choisit le diviseur central de dividende, ATTENTION rang des tableaux commence à 0 
					let candidats_diviseurs = [diviseur - 1, diviseur, diviseur + 1]; // on prend l'entier précédent et le successeur de ce diviseur
					// Faut-il que je conditionne pour éviter le diviseur 1 ?
					candidats_diviseurs = shuffle(candidats_diviseurs); // on mélange le tableau
					texte = 'Les trois divisions euclidiennes suivantes sont exactes : <br>';
					texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[0])}$\\times$${nombre_avec_espace(Math.trunc(dividende / candidats_diviseurs[0]))} $+$ ${nombre_avec_espace(dividende % candidats_diviseurs[0])}`;
					texte += `<br>`;
					texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[1])}$\\times$${nombre_avec_espace(Math.trunc(dividende / candidats_diviseurs[1]))} $+$ ${nombre_avec_espace(dividende % candidats_diviseurs[1])}`;
					texte += `<br>`;
					texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[2])}$\\times$${nombre_avec_espace(Math.trunc(dividende / candidats_diviseurs[2]))} $+$ ${nombre_avec_espace(dividende % candidats_diviseurs[2])}`;
					texte += `<br>`;
					texte += `Sans calculer, dire si les nombres ${nombre_avec_espace(candidats_diviseurs[0])}; ${nombre_avec_espace(candidats_diviseurs[1])}; ${nombre_avec_espace(candidats_diviseurs[2])} sont des diviseurs de ${nombre_avec_espace(dividende)}. Justifier.`;
					texte_corr = ``;
					if (egal(dividende % candidats_diviseurs[0],0)) { //egal() est une fonction de JC pour éviter les problèmes de virgule flottante
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[0])} vaut 0 donc ${nombre_avec_espace(candidats_diviseurs[0])} est un diviseur de ${nombre_avec_espace(dividende)}`;
					} else {
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[0])} ne vaut pas 0 donc ${nombre_avec_espace(candidats_diviseurs[0])} n'est pas un diviseur de ${nombre_avec_espace(dividende)}`;
					}
					texte_corr += `<br>`;
					if (egal(dividende % candidats_diviseurs[1],0)) { //egal() est une fonction de JC pour éviter les problèmes de virgule flottante
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[1])} vaut 0 donc ${nombre_avec_espace(candidats_diviseurs[1])} divise ${nombre_avec_espace(dividende)}`;
					} else {
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[1])} ne vaut pas 0 donc ${nombre_avec_espace(candidats_diviseurs[1])} ne divise pas ${nombre_avec_espace(dividende)}`;
					}
					texte_corr += `<br>`;
					if (egal(dividende % candidats_diviseurs[2],0)) { //egal() est une fonction de JC pour éviter les problèmes de virgule flottante
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[2])} vaut 0 donc ${nombre_avec_espace(dividende)} est divisible par ${nombre_avec_espace(candidats_diviseurs[2])}`;
					} else {
						texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[2])} ne vaut pas 0 donc ${nombre_avec_espace(dividende)} n'est pas divisible par ${nombre_avec_espace(candidats_diviseurs[2])}`;
					}
					texte_corr += `<br>`;
					break;
				case 4: // vocabulaire diviseurs et multiples
					// on déclare des tableaux utiles 
					let diviseurs = [];
					let multiplicateurs = [];
					let multiples = [];
					let quotients = [];
					let textes = [];
					let textes_corr = [];
					// on tire au hasard 4 diviseurs différents entre 2 et 999 et 4 multiplicateurs différents entre 2 et 9 
					diviseurs = [randint(2, 999), randint(2, 999, [diviseurs[0]]), randint(2, 999, [diviseurs[0], diviseurs[1]]), randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2]])];
					multiplicateurs = [randint(2, 9), randint(2, 9, [multiplicateurs[0]]), randint(2, 9, [multiplicateurs[0], multiplicateurs[1]]), randint(2, 9, [multiplicateurs[0], multiplicateurs[1], multiplicateurs[2]])];
					// on calcule les multiples
					for (let j = 0; j < 4; j++) {
						multiples[j] = diviseurs[j] * multiplicateurs[j];
						quotients[j] = multiples[j] / diviseurs[j];
						diviseurs[j] = nombre_avec_espace(diviseurs[j]);
						multiples[j] = nombre_avec_espace(multiples[j]);
						quotients[j] = nombre_avec_espace(quotients[j]);
					};
					// on crée les phrases 
					textes[0] = `${diviseurs[0]} $\\ldots\\ldots\\ldots\\ldots$ ${multiples[0]}`;
					textes_corr[0] = `${diviseurs[0]} est un diviseur de ${multiples[0]} car ${multiples[0]}=${diviseurs[0]}$\\times$${quotients[0]}`;
					textes[1] = `${diviseurs[1]} $\\ldots\\ldots\\ldots\\ldots$ ${multiples[1]}`;
					textes_corr[1] = `${diviseurs[1]} est un diviseur de ${multiples[1]} car ${multiples[1]}=${diviseurs[1]}$\\times$${quotients[1]}`;
					textes[2] = `${multiples[2]} $\\ldots\\ldots\\ldots\\ldots$ ${diviseurs[2]}`;
					textes_corr[2] = `${multiples[2]} est un multiple de ${diviseurs[2]} car ${multiples[2]}=${diviseurs[2]}$\\times$${quotients[2]}`;
					textes[3] = `${multiples[3]} $\\ldots\\ldots\\ldots\\ldots$ ${diviseurs[3]}`;
					textes_corr[3] = `${multiples[3]} est un multiple de ${diviseurs[3]} car ${multiples[3]}=${diviseurs[3]}$\\times$${quotients[3]}`;
					// on ajoute deux cas ni multiple ni diviseur
					// on choisit deux nombres
					let n1 = nombre_avec_espace(randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2], diviseurs[3]]));
					let p1 = nombre_avec_espace(randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2], diviseurs[3], n1]));
					// on choisit un autre qui n'est pas dans la liste des diviseurs de n1
					let n2 = nombre_avec_espace(randint(2, 999, liste_diviseurs(n1)));
					let p2 = nombre_avec_espace(randint(2, 999, liste_diviseurs(p1)));
					textes[4] = `${n1} $\\ldots\\ldots\\ldots\\ldots$ ${n2}`;
					textes_corr[4] = `${n1} n'est ni un multiple ni un diviseur de ${n2} car ${n1}=${n2}$\\times$${Math.trunc(n1/n2)}+${texte_en_couleur(n1%n2)} et ${n2}=${n1}$\\times$${Math.trunc(n2/n1)}+${texte_en_couleur(n2%n1)}`;
					textes[5] = `${p2} $\\ldots\\ldots\\ldots\\ldots$ ${p1}`;
					textes_corr[5] = `${p2} n'est ni un multiple ni un diviseur de ${p1} car ${p1}=${p2}$\\times$${Math.trunc(p1/p2)}+${texte_en_couleur(p1%p2)} et ${p2}=${p1}$\\times$${Math.trunc(p2/p1)}+${texte_en_couleur(p2%p1)}`;
					// on mélange pour que l'ordre change!
					shuffle2tableaux(textes, textes_corr);
					texte = `Avec la calculatrice, compléter chaque phrase avec "est un diviseur de" ou "est un multiple de" ou "n'est ni un diviseur ni un multiple de".`;
					texte += `<br>`;
					texte_corr = ``;
					for (let j = 0; j < 5; j++) {
						texte += textes[j];
						texte += `<br>`;
						texte_corr += textes_corr[j];
						texte_corr += `<br>`;
					};
					texte += textes[5];
					//texte +=`<br>`;
					texte_corr += textes_corr[5];
					texte_corr += `<br>`;
					break;
				case 5: // liste des diviseurs
					// on définit un tableau pour les choix du nombre dont on veut les diviseurs
					// 3 parmis 2,99 y compris les premiers et 1 parmis les entiers à 3 chiffres ayant au moins 8 diviseurs, il y en a 223 !
					let tableau_de_choix = [];
					tableau_de_choix = [randint(2, 99), randint(2, 99, [tableau_de_choix[0]]), randint(2, 99, [tableau_de_choix[0], tableau_de_choix[1]]), randint(2, 99, [tableau_de_choix[0], tableau_de_choix[1], tableau_de_choix[2]])];
					let tableau_de_choix_3chiffres = [];
					for (let m = 101; m < 999; m++) {
						if (liste_diviseurs(m).length > 8) {
							tableau_de_choix_3chiffres.push(m);
						};
					};
					// on ajoute un nombre à trois chiffre avec au moins 8 diviseurs dans les choix possibles
					let rg_Nb_3chiffres = randint(0, (tableau_de_choix_3chiffres.length - 1));
					tableau_de_choix.push(tableau_de_choix_3chiffres[rg_Nb_3chiffres]);
					let N; // on déclare le nombre dont on va chercher les diviseurs
					let rg_N; // pour tirer le rang du nombre dans le tableau des choix
					rg_N = randint(0, (tableau_de_choix.length - 1));
					N = tableau_de_choix[rg_N];
					texte = `Écrire la liste de tous les diviseurs de ${N}.`;
					texte_corr = `Pour trouver la liste des diviseurs de ${N} on cherche tous les produits de deux facteurs qui donnent ${N}. En écrivant toujours le plus petit facteur en premier.<br>`;
					texte_corr += `Il est suffisant de chercher des diviseurs inférieurs au plus grand nombre dont le carré vaut ${N}, par exemple ici, ${Math.trunc(Math.sqrt(N))}$\\times$${Math.trunc(Math.sqrt(N))} = ${Math.trunc(Math.sqrt(N)) * Math.trunc(Math.sqrt(N))}<${N}`;
					texte_corr += ` et ${Math.trunc(Math.sqrt(N)) + 1}$\\times$${Math.trunc(Math.sqrt(N)) + 1} = ${(Math.trunc(Math.sqrt(N)) + 1) * (Math.trunc(Math.sqrt(N)) + 1)}>${N} donc il suffit d'arrêter la recherche de facteur à ${Math.trunc(Math.sqrt(N))}.`;
					texte_corr += ` En effet, si ${N} est le produit de deux entiers p$\\times$q avec p < q alors si p$\\times$p > ${N} c'est que q$\\times$q < ${N} mais dans ce cas p serait supérieur à q sinon p$\\times$q serait inférieur à ${N} ce qui ne doit pas être le cas.<br>`
					if (liste_diviseurs(N).length % 2 == 0) {//si il y a un nombre pair de diviseurs
						for (let m = 0; m < (liste_diviseurs(N).length / 2); m++) {
							texte_corr += `` + liste_diviseurs(N)[m] + `$\\times$` + liste_diviseurs(N)[(liste_diviseurs(N).length - m - 1)] + ` = ${N}<br>`;
						};
					} else {
						for (let m = 0; m < ((liste_diviseurs(N).length - 1) / 2); m++) {
							texte_corr += `` + liste_diviseurs(N)[m] + `$\\times$` + liste_diviseurs(N)[(liste_diviseurs(N).length - m - 1)] + `<br>`;
						};
						texte_corr += `` + liste_diviseurs(N)[(liste_diviseurs(N).length - 1) / 2] + `$\\times$` + liste_diviseurs(N)[(liste_diviseurs(N).length - 1) / 2] + ` = ${N}<br>`;
					};
					texte_corr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${N}.<br>`;
					texte_corr += `La liste des diviseurs de ${N} est donc `;
					texte_corr += `1`;
					for (let w = 1; w < liste_diviseurs(N).length; w++) {
						texte_corr += ` ; ` + liste_diviseurs(N)[w];
					};
					texte_corr += `.`;
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}

		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
};

/**
 * 3A11 justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 11, sous forme d'un produit de deux nombres premiers inférieurs à 100
 * et un nombre premier inferieur à 529
 * dans cet exo on n'utilise pas les critères par 7 et 11
 * @author Sébastien Lozano
 */
function Premier_ou_pas() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Primalité ou pas";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Justifier que les nombres suivants sont premiers ou pas. Penser aux critères de divisibilité.`;
	//sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing = 1 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 2;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.nb_questions_modifiable = false;
	// console.log(Number(this.sup)==1);
	// if (Number(this.sup)==1) {
	// 	this.nb_questions = 4;
	// } else {
	// 	this.nb_questions = 5;
	// }
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A11.pdf", "Aide mémoire sur les nombres premiers (Sébastien Lozano)", "Aide mémoire")
			this.bouton_aide += modal_video('conteMathsNombresPremiers', 'videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles;// = [1, 2, 3, 6, 7];
		if (Number(this.sup)==1) {
			this.nb_questions = 4;
			type_de_questions_disponibles = [1, 2, 3, 8];			
		} else {
			this.nb_questions = 5;
			type_de_questions_disponibles = [1, 2, 3, 6, 7];			
		}
		type_de_questions_disponibles = shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		let string_rappel = `Cette liste des nombres premiers inférieurs à 100 pourra être utile : <br>` + crible_eratosthene_n(100)[0];
		for (let k = 1; k < crible_eratosthene_n(100).length; k++) {
			string_rappel += `, ` + crible_eratosthene_n(100)[k];
		};
		string_rappel += `.`;

		this.introduction = warn_message(string_rappel, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

			type_de_questions = liste_type_de_questions[i];

			var N; // le nombre de la question
			let r;
			let tab_premiers_a_tester;

			switch (type_de_questions) {
				case 1: // nombre pair
					N = 2 * randint(51, 4999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ${nombre_avec_espace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 2: // Multiple de 3
					let sum = 0; // pour la valeur de la somme;
					N = 3 * randint(34, 3333); // on initialise avant la boucle car on a peut être de la chance
					while ( (N % 2 == 0) || (N % 5 == 0)) {
						N = 3 * randint(34, 3333);
					};
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ` + N.toString().charAt(0);
					sum = Number(N.toString().charAt(0));
					for (let k = 1; k < N.toString().length; k++) {
						texte_corr += ` + ` + N.toString().charAt(k);
						sum += Number(N.toString().charAt(k));
					};
					texte_corr += ` = ${sum} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 3: // Multiple de 5
					N = 5 * randint(20, 1999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length - 1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
					texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 4: // Multiple de 7
					let N_longueur; // pour la taille du string N
					let N1; // pour la repetiton du critère
					let N1_longueur; // pour la taille du string N1
					let sum1; // pour la somme de la répétition du critère
					N = 7 * randint(15, 1428);
					texte = nombre_avec_espace(N);
					N_longueur = N.toString().length;
					texte_corr = ` 7 divise ${nombre_avec_espace(N)}, en effet : `;
					texte_corr += `<br>`;
					N1 = N;
					N1_longueur = N_longueur;
					sum1 = Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1));
					while (sum1 >= 56) {
						texte_corr += `${N1.toString().substring(0, N1_longueur - 1)} + 5$\\times$${N1.toString().charAt(N1_longueur - 1)}`;
						texte_corr += ` = ${Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1))}`;
						texte_corr += `<br>`;
						N1 = sum1;
						N1_longueur = N1.toString().length;
						sum1 = Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1));
					};
					texte_corr += `Comme ${N1.toString().substring(0, N1_longueur - 1)} + 5$\\times$${N1.toString().charAt(N1_longueur - 1)} = ${sum1} est un multiple de 7 alors 7 divise ${N} aussi `;
					texte_corr += `qui admet donc au moins trois diviseurs : 1, 7 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 5: // multiple de 11
					let even_sum; // pour la somme des chiffres de rang impair
					let odd_sum; // pour la somme des chiffres de rang pair
					N = 11 * randint(10, 909);
					texte = nombre_avec_espace(N);
					texte_corr = `D'une part, la somme des chiffres de rang impair de ${nombre_avec_espace(N)} vaut `;
					if (Number(N.toString().length) % 2 == 0) { // si N a un nombre pair de chiffres
						even_sum = Number(N.toString().charAt(1));
						texte_corr += N.toString().charAt(1);
						for (let k = 3; k < N.toString().length; k++) {
							if (k % 2 == 1) {
								texte_corr += ` + ` + N.toString().charAt(k);
								even_sum += Number(N.toString().charAt(k));
							};
						};
						texte_corr += ` = ` + even_sum + ` <br> `;
					} else { // sinon N a un nombre impair de chiffres
						even_sum = Number(N.toString().charAt(0));
						texte_corr += N.toString().charAt(0);
						for (let m = 1; m < N.toString().length; m++) {
							if (m % 2 == 0) {
								texte_corr += ` + ` + N.toString().charAt(m);
								even_sum += Number(N.toString().charAt(m));
							};

						};
						texte_corr += ` = ` + even_sum + `<br> `;
					};
					texte_corr += `d'autre part, la somme des chiffres de rang pair de ${nombre_avec_espace(N)} vaut `;
					if (Number(N.toString().length) % 2 == 0) { // si N a un nombre pair de chiffres
						odd_sum = Number(N.toString().charAt(0));
						texte_corr += N.toString().charAt(0);
						for (let k = 1; k < N.toString().length; k++) {
							if (k % 2 == 0) {
								texte_corr += ` + ` + N.toString().charAt(k);
								odd_sum += Number(N.toString().charAt(k));
							};
						};
						texte_corr += ` = ` + odd_sum + ` <br> `;
					} else { // sinon N a un nombre impair de chiffres
						odd_sum = Number(N.toString().charAt(1));
						texte_corr += N.toString().charAt(1);
						for (let m = 3; m < N.toString().length; m++) {
							if (m % 2 == 1) {
								texte_corr += ` + ` + N.toString().charAt(m);
								odd_sum += Number(N.toString().charAt(m));
							};

						};
						texte_corr += ` = ` + odd_sum + `<br> `;
					};
					texte_corr += `la différence entre la somme des chiffres de rangs pairs et celle des chiffres de rangs impairs vaut `;
					if ((odd_sum - even_sum) == 0) {
						texte_corr += `${odd_sum - even_sum}, `;

					} else {
						texte_corr += `${Math.abs(odd_sum - even_sum)} qui est un multiple de 11, `;
					};
					texte_corr += `<br>`;
					texte_corr += ` cela signifie que ${nombre_avec_espace(N)} est divisible par 11, il admet donc au moins trois diviseurs qui sont 1, 11 et lui-même,`;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 6: // produit de deux nombres premiers inférieurs à 100
					// rang du premier facteur premier
					let r1 = randint(0, crible_eratosthene_n(100).length - 1);
					// rang du second facteur premier
					let r2 = randint(0, crible_eratosthene_n(100).length - 1);
					let prime1 = crible_eratosthene_n(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
					let prime2 = crible_eratosthene_n(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
					N = prime1 + `$\\times$` + prime2;
					texte = N;
					texte_corr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
					if (prime1 == prime2) {
						texte_corr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					} else {
						texte_corr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					};
					texte_corr += texte_en_couleur_et_gras(`${N} = ` + nombre_avec_espace(prime1 * prime2) + ` n'est donc pas premier.`);
					break;
				case 7: // nombre premier inférieur à 529
					// rang du nombre premier choisi
					r = randint(0, crible_eratosthene_n(529).length - 1);
					N = crible_eratosthene_n(529)[r]; //on choisit un nombre premier inférieur à 529
					texte = N + ``;
					tab_premiers_a_tester = crible_eratosthene_n(Math.trunc(Math.sqrt(N)));
					//texte_corr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr = `En effectuant la division euclidienne de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr += tab_premiers_a_tester[0];
					for (let k = 1; k < tab_premiers_a_tester.length; k++) {
						texte_corr += `, ` + tab_premiers_a_tester[k];
					};
					//texte_corr += `.`;
					// texte_corr += `<br> Aucun de ces nombres premiers ne divise ${N}, `;
					texte_corr += `, le reste n'est jamais nul.`;
					// texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
					texte_corr += `<br>`+texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
					break;
				case 8: // nombre premier inférieur à 100 pour permettre les tests de divisibilité sans calculatrice
					// rang du nombre premier choisi
					r = randint(0, crible_eratosthene_n(100).length - 1);
					N = crible_eratosthene_n(100)[r]; //on choisit un nombre premier inférieur à 529
					texte = N + ``;
					tab_premiers_a_tester = crible_eratosthene_n(Math.trunc(Math.sqrt(N)));
					//texte_corr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr = `En effectuant la division euclidienne de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr += tab_premiers_a_tester[0];
					for (let k = 1; k < tab_premiers_a_tester.length; k++) {
						texte_corr += `, ` + tab_premiers_a_tester[k];
					};
					//texte_corr += `.`;
					// texte_corr += `<br> Aucun de ces nombres premiers ne divise ${N}, `;
					texte_corr += `, le reste n'est jamais nul.`;
					// texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
					texte_corr += `<br>`+texte_en_couleur_et_gras(nombre_avec_espace(N) + ` est donc un nombre premier.`);
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}

		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Difficulté',2,"1 : Sans Calculatrice\n2 : Avec calculatrice"]; 
};

/**
 * 3A11-1 justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 11, sous forme d'un produit de deux nombres premiers inférieurs à 100
 * et un nombre premier inferieur à 529
 * variante de 3A11 avec les critères par 7 et 11 en plus
 * @author Sébastien Lozano
 */
function Premier_ou_pas_critere_par7_par11() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Primalité ou pas - Variante avec les critères de divisibilité par 7 et par 11";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Justifier que les nombres suivants sont premiers ou pas. Penser aux critères de divisibilité.`;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 7;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 2;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A11.pdf", "Aide mémoire sur les nombres premiers (Sébastien Lozano)", "Aide mémoire")
			this.bouton_aide += modal_video('conteMathsNombresPremiers', 'videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7];
		type_de_questions_disponibles = shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		let string_rappel_b = `Ces critères de divisibilité pourront être utiles :`;
		if (sortie_html) {
			string_rappel_b += `<br>`;
			string_rappel_b += `- Un nombre est divisible par 7 si la somme de son nombre de dizaines et de cinq fois son chiffre des unités l’est.<br>`;
			string_rappel_b += `- Un nombre est divisible par 11 si la différence entre la somme de ses chiffres de rangs pairs et la somme de ses chiffres de rangs impairs est nulle ou égale à un multiple de 11.`;
			string_rappel_b += `<br> <br>`;
		} else {
			string_rappel_b += itemize([
				`Un nombre est divisible par 7 si la somme de son nombre de dizaines et de cinq fois son chiffre des unités l’est.`,
				`Un nombre est divisible par 11 si la différence entre la somme de ses chiffres de rangs pairs et la somme de ses chiffres de rangs impairs est nulle ou égale à un multiple de 11.`
			]);
			string_rappel_b += `\\par\\vspace{0.5cm}`;
		};
		string_rappel_b += `Ainsi que cette liste des nombres premiers inférieurs à 100 : `;
		if (sortie_html) {
			string_rappel_b += `<br>`;
		} else {
			string_rappel_b += `\\par\\vspace{0.25cm}`;
		};
		string_rappel_b += crible_eratosthene_n(100)[0];
		for (let k = 1; k < crible_eratosthene_n(100).length; k++) {
			string_rappel_b += `, ` + crible_eratosthene_n(100)[k];
		};
		string_rappel_b += `.`;

		this.introduction = warn_message(string_rappel_b, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			var N; // le nombre de la question

			switch (type_de_questions) {
				case 1: // nombre pair
					N = 2 * randint(51, 4999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ${nombre_avec_espace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 2: // Multiple de 3
					let sum = 0; // pour la valeur de la somme;
					N=3*randint(34,3333);// on initialise avant la boucle car on a peut être de la chance
					while ( (N % 2 == 0) || (N % 5 == 0)) {
						N = 3 * randint(34, 3333);
					};
					texte = nombre_avec_espace(N);
					texte_corr = `Comme ` + N.toString().charAt(0);
					sum = Number(N.toString().charAt(0));
					for (let k = 1; k < N.toString().length; k++) {
						texte_corr += ` + ` + N.toString().charAt(k);
						sum += Number(N.toString().charAt(k));
					};
					texte_corr += ` = ${sum} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 3: // Multiple de 5
					N = 5 * randint(20, 1999);
					texte = nombre_avec_espace(N);
					texte_corr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length - 1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
					texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 4: // Multiple de 7
					let N_longueur; // pour la taille du string N
					let N1; // pour la repetiton du critère
					let N1_longueur; // pour la taille du string N1
					let sum1; // pour la somme de la répétition du critère
					N = 7 * randint(15, 1428);
					texte = nombre_avec_espace(N);
					N_longueur = N.toString().length;
					texte_corr = ` 7 divise ${nombre_avec_espace(N)}, en effet : `;
					texte_corr += `<br>`;
					N1 = N;
					N1_longueur = N_longueur;
					sum1 = Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1));
					while (sum1 >= 56) {
						texte_corr += `${N1.toString().substring(0, N1_longueur - 1)} + 5$\\times$${N1.toString().charAt(N1_longueur - 1)}`;
						texte_corr += ` = ${Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1))}`;
						texte_corr += `<br>`;
						N1 = sum1;
						N1_longueur = N1.toString().length;
						sum1 = Number(N1.toString().substring(0, N1_longueur - 1)) + 5 * Number(N1.toString().charAt(N1_longueur - 1));
					};
					texte_corr += `Comme ${N1.toString().substring(0, N1_longueur - 1)} + 5$\\times$${N1.toString().charAt(N1_longueur - 1)} = ${sum1} est un multiple de 7 alors 7 divise ${N} aussi `;
					texte_corr += `qui admet donc au moins trois diviseurs : 1, 7 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 5: // multiple de 11
					let even_sum; // pour la somme des chiffres de rang impair
					let odd_sum; // pour la somme des chiffres de rang pair
					N = 11 * randint(10, 909);
					texte = nombre_avec_espace(N);
					texte_corr = `D'une part, la somme des chiffres de rang impair de ${nombre_avec_espace(N)} vaut `;
					if (Number(N.toString().length) % 2 == 0) { // si N a un nombre pair de chiffres
						even_sum = Number(N.toString().charAt(1));
						texte_corr += N.toString().charAt(1);
						for (let k = 3; k < N.toString().length; k++) {
							if (k % 2 == 1) {
								texte_corr += ` + ` + N.toString().charAt(k);
								even_sum += Number(N.toString().charAt(k));
							};
						};
						texte_corr += ` = ` + even_sum + ` <br> `;
					} else { // sinon N a un nombre impair de chiffres
						even_sum = Number(N.toString().charAt(0));
						texte_corr += N.toString().charAt(0);
						for (let m = 1; m < N.toString().length; m++) {
							if (m % 2 == 0) {
								texte_corr += ` + ` + N.toString().charAt(m);
								even_sum += Number(N.toString().charAt(m));
							};

						};
						texte_corr += ` = ` + even_sum + `<br> `;
					};
					texte_corr += `d'autre part, la somme des chiffres de rang pair de ${nombre_avec_espace(N)} vaut `;
					if (Number(N.toString().length) % 2 == 0) { // si N a un nombre pair de chiffres
						odd_sum = Number(N.toString().charAt(0));
						texte_corr += N.toString().charAt(0);
						for (let k = 1; k < N.toString().length; k++) {
							if (k % 2 == 0) {
								texte_corr += ` + ` + N.toString().charAt(k);
								odd_sum += Number(N.toString().charAt(k));
							};
						};
						texte_corr += ` = ` + odd_sum + ` <br> `;
					} else { // sinon N a un nombre impair de chiffres
						odd_sum = Number(N.toString().charAt(1));
						texte_corr += N.toString().charAt(1);
						for (let m = 3; m < N.toString().length; m++) {
							if (m % 2 == 1) {
								texte_corr += ` + ` + N.toString().charAt(m);
								odd_sum += Number(N.toString().charAt(m));
							};

						};
						texte_corr += ` = ` + odd_sum + `<br> `;
					};
					texte_corr += `la différence entre la somme des chiffres de rangs pairs et celle des chiffres de rangs impairs vaut `;
					if ((odd_sum - even_sum) == 0) {
						texte_corr += `${odd_sum - even_sum}, `;

					} else {
						texte_corr += `${Math.abs(odd_sum - even_sum)} qui est un multiple de 11, `;
					};
					texte_corr += `<br>`;
					texte_corr += ` cela signifie que ${nombre_avec_espace(N)} est divisible par 11, il admet donc au moins trois diviseurs qui sont 1, 11 et lui-même, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(N) + ` n'est donc pas premier.`);
					break;
				case 6: // produit de deux nombres premiers inférieurs à 100
					// rang du premier facteur premier
					let r1 = randint(0, crible_eratosthene_n(100).length - 1);
					// rang du second facteur premier
					let r2 = randint(0, crible_eratosthene_n(100).length - 1);
					let prime1 = crible_eratosthene_n(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
					let prime2 = crible_eratosthene_n(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
					N = prime1 + `$\\times$` + prime2;
					texte = N;
					texte_corr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
					if (prime1 == prime2) {
						texte_corr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					} else {
						texte_corr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1 * prime2)}, `;
					};
					texte_corr += texte_en_couleur_et_gras(`${N} = ` + nombre_avec_espace(prime1 * prime2) + ` n'est donc pas premier.`);
					break;
				case 7: // nombre premier inférieur à 529
					// rang du nombre premier choisi
					let r = randint(0, crible_eratosthene_n(529).length - 1);
					N = crible_eratosthene_n(529)[r]; //on choisit un nombre premier inférieur à 529
					texte = N + ``;;
					let tab_premiers_a_tester = crible_eratosthene_n(Math.trunc(Math.sqrt(N)));
					texte_corr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
					texte_corr += tab_premiers_a_tester[0];
					for (let k = 1; k < tab_premiers_a_tester.length; k++) {
						texte_corr += `, ` + tab_premiers_a_tester[k];
					};
					texte_corr += `.`;
					texte_corr += `<br> Aucun de ces nombres premiers ne divise ${N}, `;
					texte_corr += texte_en_couleur_et_gras(nombre_avec_espace(Number(N)) + ` n'est donc pas premier.`);
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}

		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
};

/**
 * 3A11-2 - Decomposition_facteurs_premiers
 * Décomposer un nombre en facteurs premiers et compter son nombre de diviseurs à partir d'un tableau
 * plusieurs type de nombres à décomposer
 * type 1 : 3 à 5 facteurs premiers max, multiplicités 0,1,2 ou 3 max à préciser
 * type 2 : un produit de deux premiers entre 30 et 100, multiplicité 1 ... suffisamment de possibilités?
 * type 3 : un gros premiers au delà de 1000 et inférieur à 2 000  
 * @author Sébastien Lozano
 */

function Decomposition_facteurs_premiers() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Décomposition en facteurs premiers d'un entier";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `À l'aide de la calculatrice, décomposer pas à pas les nombres entiers en produit de facteurs premiers.`;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 3;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A11.pdf", "Aide mémoire sur les nombres premiers (Sébastien Lozano)", "Aide mémoire")
			this.bouton_aide += modal_video('conteMathsNombresPremiers', 'videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3];
		type_de_questions_disponibles = shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		let string_rappel = `Cette liste des nombres premiers inférieurs à 100 pourra être utile : <br>` + crible_eratosthene_n(100)[0];
		for (let k = 1; k < crible_eratosthene_n(100).length; k++) {
			string_rappel += `, ` + crible_eratosthene_n(100)[k];
		};
		string_rappel += `.`;

		this.introduction = warn_message(string_rappel, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			switch (type_de_questions) {
				case 1: // 3 à 5 facteurs premiers max compris entre 0 et 30, de multiplicité 1,2 ou 3 max
					// on fixe le nombre de facteurs premier entre 3 et 5
					let nb_de_premiers = randint(3, 5);
					// on fixe la limite pour le choix des premiers
					let max_premier = 11;
					// on fixe le rang max pour le choix des premiers
					let rg_max = crible_eratosthene_n(max_premier).length - 1;
					// on choisit les rangs pour les nombres premiers
					let tab_rangs = [];
					let tab_rangs_exclus = [];
					for (let k = 0; k < (nb_de_premiers); k++) {
						for (let m = 0; m < k; m++) {
							tab_rangs_exclus.push(tab_rangs[m]);
						}
						tab_rangs[k] = randint(0, rg_max, tab_rangs_exclus);
					};
					// on choisit les premiers
					let tab_premiers = [];
					for (let k = 0; k < tab_rangs.length; k++) {
						tab_premiers[k] = crible_eratosthene_n(max_premier)[tab_rangs[k]];
					};
					// on range les facteurs premiers dans l'ordre croissant
					tab_premiers.sort(function (a, b) {
						return a - b;
					});
					// on choisit les multiplicités
					let tab_multiplicites = [];
					for (let k = 0; k < tab_rangs.length; k++) {
						tab_multiplicites[k] = randint(1, 2);
					};
					// yapluka écrire le nombre dans l'énoncé et sa décomposition dans la correction
					texte = `À l'aide de la calculatrice, décomposer `;
					let nombre_a_decomposer = 1;
					for (let k = 0; k < tab_rangs.length; k++) {
						for (let m = 0; m < tab_multiplicites[k]; m++) {
							nombre_a_decomposer = nombre_a_decomposer * tab_premiers[k];
						};
					};
					let racine_premier_1 = Math.trunc(Math.sqrt(nombre_a_decomposer));
					texte += `$${tex_nombre(nombre_a_decomposer)}$ en produit de facteurs premiers.`;
					// correction						
					texte_corr = `Nous allons successivement tester la divisibilité de $${tex_nombre(nombre_a_decomposer)}$ par tous les nombres premiers inférieurs à `;
					texte_corr += `$${tex_nombre(nombre_a_decomposer)}$ en commençant par 2, 3, 5, 7, ...<br>`;
					texte_corr = `Il est suffisant de tester la divisibilité de $${tex_nombre(nombre_a_decomposer)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${tex_nombre(nombre_a_decomposer)}}$ c'est à dire inférieurs à $${tex_nombre(racine_premier_1)}$.<br>`;
					texte_corr += `Ce sont les nombres de la liste : <br>`;
					texte_corr += crible_eratosthene_n(racine_premier_1)[0] + ` ; `;
					for (let k = 1; k < crible_eratosthene_n(racine_premier_1).length; k++) {
						texte_corr += crible_eratosthene_n(racine_premier_1)[k];
						if (k != crible_eratosthene_n(racine_premier_1).length - 1) {
							texte_corr += ` ; `;
						} else {
							texte_corr += `.`;
						}
						if (k % 15 == 0) {
							texte_corr += `<br>`;
						}
					};
					texte_corr += `<br>`;
					var liste_facteurs_premiers = obtenir_liste_facteurs_premiers(nombre_a_decomposer);
					var quotient_intermediaire = nombre_a_decomposer;
					for (let k = 0; k < liste_facteurs_premiers.length; k++) {
						texte_corr += `$${tex_nombre(quotient_intermediaire)}\\div${mise_en_evidence(liste_facteurs_premiers[k])} = ${tex_nombre(quotient_intermediaire / liste_facteurs_premiers[k])}$<br>`;
						quotient_intermediaire = quotient_intermediaire / liste_facteurs_premiers[k];
					};
					texte_corr += `Finalement on obtient la décomposition suivante : $ ${tex_nombre(nombre_a_decomposer)} = `;
					if (tab_multiplicites[0] == 1) {
						texte_corr += `${tab_premiers[0]}`;
					} else {
						texte_corr += `${tab_premiers[0]}^{${tab_multiplicites[0]}}`;
					};
					for (let k = 1; k < tab_premiers.length; k++) {
						if (tab_multiplicites[k] == 1) {
							texte_corr += `\\times ${tab_premiers[k]}`;
						} else {
							texte_corr += `\\times ${tab_premiers[k]}^{${tab_multiplicites[k]}}`;
						};
					};
					texte_corr += `$`;
					break;
				case 2: // deux premiers compris entre 30 et 100 de multiplicité 1
					// on choisit un rang différent pour chaque premier entre 30 et 100
					let r1 = randint(0, premiers_entre_bornes(30, 100).length - 1);
					let r2 = randint(0, premiers_entre_bornes(30, 100).length - 1, r1);
					let premier1 = premiers_entre_bornes(30, 100)[r1];
					let premier2 = premiers_entre_bornes(30, 100)[r2];
					if (premier1 > premier2) { // on inverse p1 et p2 si p1 est supérieur à p2
						let p = premier1;
						premier1 = premier2;
						premier2 = p;
					};
					texte = `À l'aide de la calculatrice, décomposer $${tex_nombre(premier1 * premier2)}$ en produit de facteurs premiers.`;
					let racine_prem = Math.trunc(Math.sqrt(premier1 * premier2));
					texte_corr = `Il est suffisant de tester la divisibilité de $${tex_nombre(premier1 * premier2)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${tex_nombre(premier1 * premier2)}}$ c'est à dire inférieurs à $${tex_nombre(racine_prem)}$.<br>`;
					texte_corr += `Ce sont les nombres de la liste suivante : <br>$`;
					texte_corr += crible_eratosthene_n(racine_prem)[0];
					for (let k = 1; k < crible_eratosthene_n(racine_prem).length; k++) {
						texte_corr += `; ` + crible_eratosthene_n(racine_prem)[k];
					};
					texte_corr += `.$<br>`;
					liste_facteurs_premiers = obtenir_liste_facteurs_premiers(premier1 * premier2);
					quotient_intermediaire = premier1 * premier2;
					for (let k = 0; k < liste_facteurs_premiers.length; k++) {
						texte_corr += `$${tex_nombre(quotient_intermediaire)}\\div${mise_en_evidence(liste_facteurs_premiers[k])} = ${tex_nombre(quotient_intermediaire / liste_facteurs_premiers[k])}$<br>`;
						quotient_intermediaire = quotient_intermediaire / liste_facteurs_premiers[k];
					};
					texte_corr += ` D'où $${tex_nombre(premier1 * premier2)} = ${tex_nombre(premier1)}\\times${tex_nombre(premier2)}$.`;
					break;
				case 3: // un gros premier entre 1000 et 2000			
					// on choisit un rang pour le nombre premier entre 1000 et 2000
					let r = randint(0, premiers_entre_bornes(1000, 2000).length - 1);
					let premier = premiers_entre_bornes(1000, 2000)[r];
					let racine_premier = Math.trunc(Math.sqrt(premier));
					texte = `À l'aide de la calculatrice, décomposer $${tex_nombre(premier)}$ en produit de facteurs premiers.`;
					texte_corr = `En testant la divisibilité de $${tex_nombre(premier)}$ par tous les nombres premiers inférieurs ou égaux à $${racine_premier}$`;
					texte_corr += ` c'est à dire les nombre de la liste $`;
					texte_corr += crible_eratosthene_n(racine_premier)[0];
					for (let k = 1; k < crible_eratosthene_n(racine_premier).length; k++) {
						texte_corr += `; ` + crible_eratosthene_n(racine_premier)[k];
					};
					texte_corr += `$, `;
					texte_corr += `on se rend compte que $${tex_nombre(premier)}$ est un nombre premier donc `;
					texte_corr += `$${tex_nombre(premier)} = ${tex_nombre(premier)}$.`;
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}

		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
};

/**
 * 3A11-3 - Lister/Compter les diviseurs d'un entier à partir de sa decomposition en facteurs premiers 
 * @author Sébastien Lozano
 */

function Lister_Diviseurs_Par_Decomposition_facteurs_premiers() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Compter/lister les diviseurs d'un entier à partir de sa décomposition en facteurs premiers.";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Sans la calculatrice, compter/lister les diviseurs d'un entier à partir de sa décomposition en facteurs premiers.`;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 2 : this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.nb_questions = 2;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A11.pdf", "Aide mémoire sur les nombres premiers (Sébastien Lozano)", "Aide mémoire")
			this.bouton_aide += modal_video('conteMathsNombresPremiers', 'videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];


			switch (type_de_questions) {
				case 1: // lister/compter les diviseurs d'un entier à partir de sa décomposition en facteurs premiers			
					texte = `Lister/compter les diviseurs d'un entier à partir de sa décomposition en facteurs premiers`;
					//let premiers_dispos = premiers_entre_bornes(2,11);
					// on fixe le nombre de facteurs premier à 3
					let nb_de_premiers_b = randint(3, 3);
					// on fixe la limite pour le choix des premiers
					let max_premier_b = 11;
					// on fixe le rang max pour le choix des premiers
					let rg_max_b = crible_eratosthene_n(max_premier_b).length - 1;
					// on choisit les rangs pour les nombres premiers
					let tab_rangs_b = [];
					let tab_rangs_exclus_b = [];
					for (let k = 0; k < (nb_de_premiers_b); k++) {
						for (let m = 0; m < k; m++) {
							tab_rangs_exclus_b.push(tab_rangs_b[m]);
						}
						tab_rangs_b[k] = randint(0, rg_max_b, tab_rangs_exclus_b);
					};
					// on choisit les premiers
					let tab_premiers_b = [];
					for (let k = 0; k < tab_rangs_b.length; k++) {
						tab_premiers_b[k] = crible_eratosthene_n(max_premier_b)[tab_rangs_b[k]];
					};
					// on range les facteurs premiers dans l'ordre croissant
					tab_premiers_b.sort(function (a, b) {
						return a - b;
					});
					// on choisit les multiplicités
					let tab_multiplicites_b = [];
					for (let k = 0; k < tab_rangs_b.length; k++) {
						tab_multiplicites_b[k] = randint(1, 2);
					};
					texte = ``;
					let nombre_a_decomposer_b = 1;
					for (let k = 0; k < tab_rangs_b.length; k++) {
						for (let m = 0; m < tab_multiplicites_b[k]; m++) {
							nombre_a_decomposer_b = nombre_a_decomposer_b * tab_premiers_b[k];
						};
					};
					texte += `La décomposition en facteurs premiers de $${tex_nombre(nombre_a_decomposer_b)}$ est : $`;
					if (tab_multiplicites_b[0] == 1) {
						texte += `${tab_premiers_b[0]}`;
					} else {
						texte += `${tab_premiers_b[0]}^{${tab_multiplicites_b[0]}}`;
					};
					for (let k = 1; k < tab_premiers_b.length; k++) {
						if (tab_multiplicites_b[k] == 1) {
							texte += `\\times ${tab_premiers_b[k]}`;
						} else {
							texte += `\\times ${tab_premiers_b[k]}^{${tab_multiplicites_b[k]}}`;
						};
					};
					texte += `$, <br>`;
					texte += num_alpha(0) + ` Compléter le tableau ci-dessous.`;
					if (!sortie_html) {
						texte += `$\\medskip$`;
					};
					// on crée le tableau des entetes de lignes et des colonnes
					let ent_lignes = [];
					let contenu_lignes = [];
					let ent_colonnes = [`\\times`];
					// les entetes des lignes
					for (let k = 0; k < tab_multiplicites_b[0] + 1; k++) {
						ent_lignes.push(`\\phantom{plusLarge}` + tab_premiers_b[0] + `^{` + k + `}\\phantom{plusLarge}`);
					};
					// les entetes des colonnes 
					for (let m = 0; m < tab_multiplicites_b[1] + 1; m++) {
						for (let l = 0; l < tab_multiplicites_b[2] + 1; l++) {
							ent_colonnes.push(tab_premiers_b[1] + `^{` + m + `}\\times` + tab_premiers_b[2] + `^{` + l + `}`);
						};
					};
					// tableau pour la permutation circulaire
					let tab_temp;
					// on y affecte les lignes
					tab_temp = ent_lignes;
					// on supprime le x de l'entete des colonnes
					ent_colonnes.shift();
					// on affecte ça aux lignes;
					ent_lignes = ent_colonnes;
					// on remet le x en colonnes et on ajoute le reste
					ent_colonnes = [`\\times`].concat(tab_temp);
					// le contenu des lignes
					for (let l = 0; l < (tab_multiplicites_b[0] + 1); l++) {
						for (let c = 1; c < (tab_multiplicites_b[1] + 1) * (tab_multiplicites_b[2] + 1) + 1; c++) {
							//contenu_lignes.push(`l : `+l+`, c : `+Number(c));
							contenu_lignes.push(``);
						};
					};
					texte += `<br>`;
					texte += tab_C_L(ent_colonnes, ent_lignes, contenu_lignes);
					if (!sortie_html) {
						texte += `$\\medskip$`;
					};
					texte += `<br>`;
					texte += num_alpha(1) + ` En déduire le nombre de diviseurs de $${tex_nombre(nombre_a_decomposer_b)}$.<br>`;
					texte += num_alpha(2) + ` Enfin, dresser la liste des diviseurs de $${tex_nombre(nombre_a_decomposer_b)}$.<br>`;

					// correction
					texte_corr = `Avec la décomposition en facteurs premiers de $${tex_nombre(nombre_a_decomposer_b)}$ qui est : $`;
					if (tab_multiplicites_b[0] == 1) {
						texte_corr += `${tab_premiers_b[0]}`;
					} else {
						texte_corr += `${tab_premiers_b[0]}^{${tab_multiplicites_b[0]}}`;
					};
					for (let k = 1; k < tab_premiers_b.length; k++) {
						if (tab_multiplicites_b[k] == 1) {
							texte_corr += `\\times ${tab_premiers_b[k]}`;
						} else {
							texte_corr += `\\times ${tab_premiers_b[k]}^{${tab_multiplicites_b[k]}}`;
						};
					};
					texte_corr += `$, <br>`;
					texte_corr += num_alpha(0) + ` Le tableau donne :`;
					// on crée le tableau des entetes de lignes et des colonnes
					let ent_lignes_corr = [];
					let ent_lignes_corr_res = [];
					let contenu_lignes_corr = [];
					//let contenu_lignes_corr_res = [];
					let ent_colonnes_corr = [`\\times`];
					let ent_colonnes_corr_res = [1];
					// les entetes des lignes
					for (let k = 0; k < tab_multiplicites_b[0] + 1; k++) {
						ent_lignes_corr.push(tab_premiers_b[0] + `^{` + k + `}`);
						ent_lignes_corr_res.push(tab_premiers_b[0] ** k);
					};
					// les entetes des colonnes 
					for (let m = 0; m < tab_multiplicites_b[1] + 1; m++) {
						for (let l = 0; l < tab_multiplicites_b[2] + 1; l++) {
							ent_colonnes_corr.push(tab_premiers_b[1] + `^{` + m + `}\\times` + tab_premiers_b[2] + `^{` + l + `}`);
							ent_colonnes_corr_res.push(tab_premiers_b[1] ** m * tab_premiers_b[2] ** l);
						};
					};
					// tableaux pour les permutations circulaires
					let tab_temp_corr;
					let tab1_temp_corr;
					// on y affecte les lignes
					tab_temp_corr = ent_lignes_corr;
					tab1_temp_corr = ent_lignes_corr_res;
					// on supprime le x de l'entete des colonnes
					ent_colonnes_corr.shift();
					ent_colonnes_corr_res.shift();
					// on affecte ça aux lignes;
					ent_lignes_corr = ent_colonnes_corr;
					ent_lignes_corr_res = ent_colonnes_corr_res;
					// on remet le x en colonnes et on ajoute le reste
					ent_colonnes_corr = [`\\times`].concat(tab_temp_corr);
					ent_colonnes_corr_res = [1].concat(tab1_temp_corr);
					// le contenu des lignes
					for (let l = 0; l < (tab_multiplicites_b[1] + 1) * (tab_multiplicites_b[2] + 1) + 1; l++) {
						for (let c = 1; c < (tab_multiplicites_b[0] + 2); c++) {
							//contenu_lignes_corr.push(`l : `+l+`, c : `+Number(c));								
							contenu_lignes_corr.push(ent_lignes_corr[l] + `\\times` + ent_colonnes_corr[c] + `=` + mise_en_evidence(tex_nombre(ent_lignes_corr_res[l] * ent_colonnes_corr_res[c])));
						};
					};
					texte_corr += `<br>`;
					texte_corr += tab_C_L(ent_colonnes_corr, ent_lignes_corr, contenu_lignes_corr);
					texte_corr += `<br>`;
					texte_corr += num_alpha(1) + ` $${tex_nombre(nombre_a_decomposer_b)}$ a donc `;
					texte_corr += `$(${tab_multiplicites_b[0]}+1)\\times(${tab_multiplicites_b[1]}+1)\\times(${tab_multiplicites_b[2]}+1) = `;
					texte_corr += `${tab_multiplicites_b[0] + 1}\\times${tab_multiplicites_b[1] + 1}\\times${tab_multiplicites_b[2] + 1} = `;
					texte_corr += `${(tab_multiplicites_b[0] + 1) * (tab_multiplicites_b[1] + 1) * (tab_multiplicites_b[2] + 1)}$ diviseurs.<br>`;
					texte_corr += `En effet, dans la décomposition apparait : `;
					texte_corr += ` <br> - Le facteur premier $${tab_premiers_b[0]}$ avec la multiplicité $${tab_multiplicites_b[0]}$`;
					texte_corr += `, le facteur $${tab_premiers_b[0]}$ apparait donc sous les formes : `;
					for (let k = 0; k < tab_multiplicites_b[0]; k++) {
						texte_corr += `$${tab_premiers_b[0]}^{` + k + `}$ ou `;
					};
					texte_corr += `$${tab_premiers_b[0]}^{` + tab_multiplicites_b[0] + `}$ d'où le facteur $(${tab_multiplicites_b[0]}+1)$.`;

					texte_corr += ` <br> - Le facteur premier $${tab_premiers_b[1]}$ avec la multiplicité $${tab_multiplicites_b[1]}$`;
					texte_corr += `, le facteur $${tab_premiers_b[1]}$ apparait donc sous les formes : `;
					for (let k = 0; k < tab_multiplicites_b[1]; k++) {
						texte_corr += `$${tab_premiers_b[1]}^{` + k + `}$ ou `;
					};
					texte_corr += `$${tab_premiers_b[1]}^{` + tab_multiplicites_b[1] + `}$ d'où le facteur $(${tab_multiplicites_b[1]}+1)$.`;

					texte_corr += ` <br> - Le facteur premier $${tab_premiers_b[2]}$ avec la multiplicité $${tab_multiplicites_b[2]}$`;
					texte_corr += `, le facteur $${tab_premiers_b[2]}$ apparait donc sous les formes : `;
					for (let k = 0; k < tab_multiplicites_b[2]; k++) {
						texte_corr += `$${tab_premiers_b[2]}^{` + k + `}$ ou `;
					};
					texte_corr += `$${tab_premiers_b[2]}^{` + tab_multiplicites_b[2] + `}$ d'où le facteur $(${tab_multiplicites_b[2]}+1)$.`;
					texte_corr += `<br>`;
					texte_corr += num_alpha(2) + ` Enfin, voici la liste des $${(tab_multiplicites_b[0] + 1) * (tab_multiplicites_b[1] + 1) * (tab_multiplicites_b[2] + 1)}$ diviseurs de $${tex_nombre(nombre_a_decomposer_b)}$ issus du tableau ci-dessus : `;
					texte_corr += `$1`;
					for (let w = 1; w < liste_diviseurs(nombre_a_decomposer_b).length; w++) {
						texte_corr += `\\text{ ; }` + tex_nombre(liste_diviseurs(nombre_a_decomposer_b)[w]);
					};
					texte_corr += `.$`;
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}

		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
};

/**
 * 3A12 - Fractions irreductibles
 * @author Sébastien Lozano
 */

function Fractions_irreductibles() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1;
	this.titre = "Fractions irréductibles";
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Rendre irréductible une fraction et son inverse à partir des décompositons en produit de facteurs premiers.`;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 4 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 4 : this.spacing_corr = 2;
	this.nb_questions = 1;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function (numero_de_l_exercice) {
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A12.pdf", "Aide mémoire sur les fonctions (Sébastien Lozano)", "Aide mémoire")
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		//let type_de_questions_disponibles = [1,2,3,4];
		let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions);

		this.introduction = warn_message(`À la question ` + num_alpha(3) + ` une observation judicieuse et argumentée pourra faire gagner du temps!`, `nombres`, `Coup de pouce`);

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			var nb_div_prem_communs; // nombre de diviseurs premiers communs
			var candidats_premiers_communs; // tableau des candidats premiers communs
			var premiers_communs; // tableau des diviseurs premiers communs
			var multiplicites_premiers_communs; // tableau des multiplicités des diviseurs premiers communs 
			var r; // tableau pour le choix des rangs des diviseurs premiers communs
			var r_exclus; // tableau pour la boucle de creation de r				
			var nb1_dist; // diviseur unique du premier nombre 
			var nb2_dist; // divisuer unique du second nombre
			var r_ex; // pour exlcure le rang de nb1
			var tab_nb1; // tableau pour les diviseurs de nb1
			var tab_nb2; // tableau pour les diviseurs de nb2
			var multiplicites_nb1;
			var multiplicites_nb2;
			var nb1; // nbre 1
			var nb2; // nbre 2

			// on fixe le tableau de choix
			candidats_premiers_communs = premiers_entre_bornes(2, 13);
			// on fixe le nombre de divisuers premiers communs
			nb_div_prem_communs = 4;
			// on initialise le tableau des diviseurs premiers communs
			premiers_communs = [];
			// on initialise le tableau des rangs
			r = [];
			// on initialise le tableau des rangs déjà choisis
			r_exclus = [];
			// on complète le tableau des rangs des rangs des diviseurs premiers choisis
			for (let k = 0; k < nb_div_prem_communs; k++) {
				for (let m = 0; m < k; m++) {
					r_exclus.push(r[m]);
				};
				r[k] = randint(0, candidats_premiers_communs.length - 1, r_exclus);
			};
			// on complète le tableau des diviseurs premiers communs
			for (let k = 0; k < nb_div_prem_communs; k++) {
				premiers_communs.push(candidats_premiers_communs[r[k]]);
			};
			// on initialise et on complète le tableau des multiplicités des diviseurs premiers communs
			multiplicites_premiers_communs = [];
			for (let k = 0; k < nb_div_prem_communs; k++) {
				multiplicites_premiers_communs.push(randint(0, 2));
			};
			// on supprime les diviseurs premiers de multiplicité 0 et leur multiplicité
			let idx = multiplicites_premiers_communs.indexOf(0);
			while (idx != -1) {
				premiers_communs.splice(idx, 1);
				multiplicites_premiers_communs.splice(idx, 1);
				idx = multiplicites_premiers_communs.indexOf(0);
			};
			// on initialise le tableau des diviseurs du premier et du second nombre avec les diviseurs premiers communs
			tab_nb1 = [];
			tab_nb2 = [];
			for (let k = 0; k < premiers_communs.length; k++) {
				tab_nb1[k] = premiers_communs[k];
				tab_nb2[k] = premiers_communs[k];
			};
			// on initialise les tableaux de multiplicité, ils sont les mêmes mais on pourrait vouloir qu'ils soient différents
			multiplicites_nb1 = [];
			multiplicites_nb2 = [];
			for (let k = 0; k < premiers_communs.length; k++) {
				multiplicites_nb1[k] = multiplicites_premiers_communs[k];
				multiplicites_nb2[k] = multiplicites_premiers_communs[k];
			};
			// on ajoute un facteur premier distinct pour chaque nombre plus petit que 30
			r_ex = randint(0, premiers_entre_bornes(2, 30).length - 1);
			nb1_dist = premiers_entre_bornes(2, 30)[r_ex];
			nb2_dist = premiers_entre_bornes(2, 30)[randint(0, premiers_entre_bornes(2, 30).length - 1, r_ex)];
			// on ajoute nb1_dist, nb2_dist dans les tableaux des diviseurs premiers du premier et du second nombre 
			// nb1
			let bool = false;
			let n = 0;
			while (n < tab_nb1.length && bool != true) {
				if (nb1_dist == tab_nb1[n]) {// si le diviseur premier est déjà présent on incrémente sa multiplicité
					multiplicites_nb1[n]++;
					bool = true;
				};
				n++;
			};
			// on teste la valeur de sortie de bool et on ajoute la nouvelle valeur si necessaire
			if (!bool) {// il n'est pas présent on l'ajoute avec la multipplicité 1
				tab_nb1.push(nb1_dist);
				multiplicites_nb1.push(1);
				bool = true;
			};
			// nb2
			bool = false;
			n = 0;
			while (n < tab_nb2.length && !bool) {
				if (nb2_dist == tab_nb2[n]) {// si le diviseur premier est déjà présent on incrémente sa multiplicité
					multiplicites_nb2[n]++;
					bool = true;
				};
				n++;
			};
			// on teste la valeur de sortie de bool et on ajoute la nouvelle valeur si necessaire
			if (!bool) {// il n'est pas présent on l'ajoute avec la multipplicité 1
				tab_nb2.push(nb2_dist);
				multiplicites_nb2.push(1);
				bool = true;
			};
			// on crée un tableau associatif à partir des deux tableaux tab_ni et multiplicites_ni
			let tab_prem_mult_nb1 = [];
			for (let k = 0; k < tab_nb1.length; k++) {
				tab_prem_mult_nb1[k] = { 'prem': tab_nb1[k], 'mult': multiplicites_nb1[k] };
			};
			let tab_prem_mult_nb2 = [];
			for (let k = 0; k < tab_nb2.length; k++) {
				tab_prem_mult_nb2[k] = { 'prem': tab_nb2[k], 'mult': multiplicites_nb2[k] };
			};
			// on range selon prem croissant
			tab_prem_mult_nb1.sort(function (a, b) {
				return a.prem > b.prem;
			});
			tab_prem_mult_nb2.sort(function (a, b) {
				return a.prem > b.prem;
			});
			// on initialise nb1 et nb2 et on les calcule à partir des tableaux 				
			nb1 = 1;
			for (let k = 0; k < tab_nb1.length; k++) {
				nb1 = nb1 * tab_prem_mult_nb1[k].prem ** tab_prem_mult_nb1[k].mult;
			};
			nb2 = 1;
			for (let k = 0; k < tab_nb2.length; k++) {
				nb2 = nb2 * tab_prem_mult_nb2[k].prem ** tab_prem_mult_nb2[k].mult;
			};

			switch (type_de_questions) {
				case 1: // décomposition de A
					texte = num_alpha(0) + ` Décomposer $A = ${tex_nombre(nb1)}$ en produit de facteurs premiers : `;
					texte_corr = num_alpha(0) + ` La décomposition en produit de facteurs premier de $A = `;
					switch (tab_prem_mult_nb1[0].mult) {
						case 1:
							texte_corr += `${tab_prem_mult_nb1[0].prem}`;
							break;
						default:
							texte_corr += `${tab_prem_mult_nb1[0].prem}^{${tab_prem_mult_nb1[0].mult}}`;
							break;
					};
					for (let k = 1; k < tab_nb1.length; k++) {
						switch (tab_prem_mult_nb1[k].mult) {
							case 1:
								texte_corr += `\\times${tab_prem_mult_nb1[k].prem}`;
								break;
							default:
								texte_corr += `\\times${tab_prem_mult_nb1[k].prem}^{${tab_prem_mult_nb1[k].mult}}`;
								break;
						};
					};
					texte_corr += `$.`;
					//	break;		
					//case 2 : // décomposition de B 	
					texte += `<br>` + num_alpha(1) + ` Décomposer $B = ${tex_nombre(nb2)}$ en produit de facteurs premiers : `;
					texte_corr += `<br>` + num_alpha(1) + ` La décomposition en produit de facteurs premier de $B = `;
					switch (tab_prem_mult_nb2[0].mult) {
						case 1:
							texte_corr += `${tab_prem_mult_nb2[0].prem}`;
							break;
						default:
							texte_corr += `${tab_prem_mult_nb2[0].prem}^{${tab_prem_mult_nb2[0].mult}}`;
							break;
					};
					for (let k = 1; k < tab_nb2.length; k++) {
						switch (tab_prem_mult_nb2[k].mult) {
							case 1:
								texte_corr += `\\times${tab_prem_mult_nb2[k].prem}`;
								break;
							default:
								texte_corr += `\\times${tab_prem_mult_nb2[k].prem}^{${tab_prem_mult_nb2[k].mult}}`;
								break;
						};
					};
					texte_corr += `$.`;
					//	break;	
					//case 3 : // reduction de A sur B 			
					texte += `<br>` + num_alpha(2) + ` Rendre la fraction $\\dfrac{A}{B} = \\dfrac{${tex_nombre(nb1)}}{${tex_nombre(nb2)}}$ irréductible `;
					if (sortie_html) {
						texte += ` à l'aide des décompositions obtenues au ` + num_alpha(0) + ` et au ` + num_alpha(1);
					} else {
						texte += ` à l'aide des questions ` + num_alpha(0) + ` et ` + num_alpha(1);
					};
					texte_corr += `<br>` + num_alpha(2) + ` $\\dfrac{A}{B} = \\dfrac{${tex_nombre(nb1)}}{${tex_nombre(nb2)}} = `;
					texte_corr += `\\dfrac{`;
					texte_corr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texte_corr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`
					};
					texte_corr += `\\times ${nb1_dist}}{`;
					texte_corr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texte_corr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`
					};
					texte_corr += `\\times ${nb2_dist}} = `;
					texte_corr += `\\dfrac{${nb1_dist}}{${nb2_dist}}$.`;
					//	break;	
					//case 4 : // reduction de B sur A 			
					texte += `<br>` + num_alpha(3) + ` Rendre la fraction $\\dfrac{B}{A} = \\dfrac{${tex_nombre(nb2)}}{${tex_nombre(nb1)}}$ irréductible`;
					if (sortie_html) {
						texte += ` à l'aide des décompositions obtenues au ` + num_alpha(0) + ` et au ` + num_alpha(1);
					} else {
						texte += ` à l'aide des questions ` + num_alpha(0) + ` et ` + num_alpha(1);
					};
					texte_corr += `<br>` + num_alpha(3) + ` $\\dfrac{B}{A}$ est l'inverse de $\\dfrac{A}{B}$ donc $\\dfrac{B}{A} = \\dfrac{${tex_nombre(nb2)}}{${tex_nombre(nb1)}} = `;
					texte_corr += `\\dfrac{`;
					texte_corr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texte_corr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`
					};
					texte_corr += `\\times ${nb2_dist}}{`;
					texte_corr += `\\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[0] + `}`;
					for (let k = 1; k < decomp_fact_prem_array(nb1 / nb1_dist).length; k++) {
						texte_corr += `\\times \\cancel{` + decomp_fact_prem_array(nb1 / nb1_dist)[k] + `}`
					};
					texte_corr += `\\times ${nb1_dist}} = `;
					texte_corr += `\\dfrac{${nb2_dist}}{${nb1_dist}}$.`;
					//	break;	
					//case 5 : // calculer le produit A/B x B/A et réduire. Remarque?
					// texte += `<br>`+num_alpha(4)+` Combien alculer le produit de $\\dfrac{A}{B} = \\dfrac{${tex_nombre(nb1)}}{${tex_nombre(nb2)}}$ et de $\\dfrac{B}{A} = \\dfrac{${tex_nombre(nb2)}}{${tex_nombre(nb1)}}$.`;
					// texte += `<br>Donner le résultat sous forme de fraction irréductible.`
					//texte += `<br>`+num_alpha(4)+` Remarque ?`
					//texte_corr += `<br>`+num_alpha(4)+' corr type 5';
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			};
			cpt++
		};
		liste_de_question_to_contenu(this);
	};
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
};

/**
 * 3A13 - PPCM_Engrenages
 * les deux on besoin de la def partielle serie : stlX
 * pb dans la sortie LaTeX, revoir comment user de la fonction katex_Popup2() pour affichage d'une note hors texte!
 * @author Sébastien Lozano
 */

function PPCM_Engrenages() {
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
			this.bouton_aide = modal_pdf(numero_de_l_exercice, "pdf/FicheArithmetique-3A13.pdf", "Aide mémoire sur les fonctions (Sébastien Lozano)", "Aide mémoire")
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
			titre : `Arithmétique des engrenages`,
			texte : txt_intro,
			couleur : `nombres`
		});

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			type_de_questions = liste_type_de_questions[i];

			if (sortie_html) {
				let id_unique = `${num_ex}_${i}_${Date.now()}`
				var id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
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
					texte += `<br>` + num_alpha(0) + ` Écrire la liste des multiples de $${nb_dents_r1}$ et de $${nb_dents_r2}$.`
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
					texte += `<br>` + num_alpha(1) + ` En déduire le nombre de tours de chaque roue avant le retour à leur position initiale.`
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
							txt_popup//`Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que ${texte_gras('les nombres a et b sont premiers entre eux')}.`
						);
					};
					texte_corr += `<br><br>` + num_alpha(1) + ` Chaque roue doit tourner de $ppcm(${nb_dents_r1},${nb_dents_r2})=${tex_nombre(ppcm(nb_dents_r1, nb_dents_r2))}$ dents.`;
					texte_corr += `<br> Cela correspond à $(${ppcm(nb_dents_r1, nb_dents_r2)}\\text{ dents})\\div (${nb_dents_r1}\\text{ dents/tour}) = ${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1}$`;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r1 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `pour la roue n$\\degree$1.`
					texte_corr += `<br>Cela correspond à $(${ppcm(nb_dents_r1, nb_dents_r2)}\\text{ dents})\\div (${nb_dents_r2}\\text{ dents/tour}) = ${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2}$`;
					if (ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2 == 1) {
						texte_corr += ` tour `;
					} else {
						texte_corr += ` tours `;
					};
					texte_corr += `pour la roue n$\\degree$2.`
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
							txt_popup//`Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que ${texte_gras('les nombres a et b sont premiers entre eux')}.`
						);
					};
					texte += `<br>` + num_alpha(1) + ` En déduire le nombre de tours de chaque roue avant le retour à leur position initiale.`;
					texte_corr = `Pour un nombre de dents plus élevé, il est plus commode d'utiliser les décompositions en produit de facteurs premiers.`
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
							txt_popup//`Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que ${texte_gras('les nombres a et b sont premiers entre eux')}.`
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
					texte_corr += `pour la roue n$\\degree$2.`
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
					texte += ` pendant que la roue n$\\degree$2 en fait $${ppcm(nb_dents_r1, nb_dents_r2) / nb_dents_r2}$.`
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
					texte_corr += `}) = ${nb_dents_r1} \\text{ dents/tour}.$`
					texte_corr += `<br>La roue n$\\degree$1 a donc : $${nb_dents_r1}$ dents.`;
					break;
			};

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}

		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
};


/**
* Un graphique étant tracé, déterminer l'image de nombres donnés.
* La fonction est un polynome de degré 1, 2 ou 3 et les nombres des questions ne sont que des entiers.
*
* @Auteur Rémi Angot
* 3F12-4
*/
function Image_graphique() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire l'image d'un nombre à partir d'un graphique"
	this.consigne = ""
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
		let codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAAEL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFAeKkeuFHrhEBzy4UeuFHs#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAAA4AAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8AAAAAAQ4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBCb52yLQ5WAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wAAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AAAAAAAOAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADgAAAQUAAQAAAAcAAAAJAP####8AAAAAAQ4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAQEAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAduYmdyYWR4AAIyMAAAAAFANAAAAAAAAAAAABEA#####wAHbmJncmFkeQACMjAAAAABQDQAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAUR3JhZHVhdGlvbkF4ZXNSZXBlcmUAAAAbAAAACAAAAAMAAAAKAAAADwAAABD#####AAAAAQATQ0Fic2Npc3NlT3JpZ2luZVJlcAAAAAARAAVhYnNvcgAAAAr#####AAAAAQATQ09yZG9ubmVlT3JpZ2luZVJlcAAAAAARAAVvcmRvcgAAAAoAAAALAAAAABEABnVuaXRleAAAAAr#####AAAAAQAKQ1VuaXRleVJlcAAAAAARAAZ1bml0ZXkAAAAK#####wAAAAEAEENQb2ludERhbnNSZXBlcmUAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADgAAABMAAAAWAAAAABEAAAAAAA4AAAEFAAAAAAoAAAANAAAAAA4AAAASAAAADgAAABQAAAAOAAAAEwAAABYAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADQAAAAAOAAAAEwAAAA4AAAAVAAAADAAAAAARAAAAFgAAAA4AAAAPAAAADwAAAAARAAAAAAAOAAABBQAAAAAXAAAAGQAAAAwAAAAAEQAAABYAAAAOAAAAEAAAAA8AAAAAEQAAAAAADgAAAQUAAAAAGAAAABv#####AAAAAQAIQ1NlZ21lbnQAAAAAEQEAAAAAEAAAAQABAAAAFwAAABoAAAAXAAAAABEBAAAAABAAAAEAAQAAABgAAAAcAAAABAAAAAARAQAAAAALAAFXAMAUAAAAAAAAwDQAAAAAAAAFAAE#3FZ4mrzfDgAAAB3#####AAAAAgAIQ01lc3VyZVgAAAAAEQAGeENvb3JkAAAACgAAAB8AAAARAAAAABEABWFic3cxAAZ4Q29vcmQAAAAOAAAAIP####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUBAAAAEQBmZmYAAAAfAAAADgAAAA8AAAAfAAAAAgAAAB8AAAAfAAAAEQAAAAARAAVhYnN3MgANMiphYnNvci1hYnN3MQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEgAAAA4AAAAhAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAACMAAAAOAAAAEwAAABkBAAAAEQBmZmYAAAAkAAAADgAAAA8AAAAfAAAABQAAAB8AAAAgAAAAIQAAACMAAAAkAAAABAAAAAARAQAAAAALAAFSAEAgAAAAAAAAwCAAAAAAAAAFAAE#0RtOgbToHwAAAB7#####AAAAAgAIQ01lc3VyZVkAAAAAEQAGeUNvb3JkAAAACgAAACYAAAARAAAAABEABW9yZHIxAAZ5Q29vcmQAAAAOAAAAJwAAABkBAAAAEQBmZmYAAAAmAAAADgAAABAAAAAmAAAAAgAAACYAAAAmAAAAEQAAAAARAAVvcmRyMgANMipvcmRvci1vcmRyMQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEwAAAA4AAAAoAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAABIAAAAOAAAAKgAAABkBAAAAEQBmZmYAAAArAAAADgAAABAAAAAmAAAABQAAACYAAAAnAAAAKAAAACoAAAAr#####wAAAAIADENDb21tZW50YWlyZQAAAAARAWZmZgAAAAAAAAAAAEAYAAAAAAAAAAAAHwsAAf###wAAAAEAAAAAAAAAAQAAAAAAAAAAAAsjVmFsKGFic3cxKQAAABkBAAAAEQBmZmYAAAAtAAAADgAAAA8AAAAfAAAABAAAAB8AAAAgAAAAIQAAAC0AAAAbAAAAABEBZmZmAAAAAAAAAAAAQBgAAAAAAAAAAAAkCwAB####AAAAAQAAAAAAAAABAAAAAAAAAAAACyNWYWwoYWJzdzIpAAAAGQEAAAARAGZmZgAAAC8AAAAOAAAADwAAAB8AAAAGAAAAHwAAACAAAAAhAAAAIwAAACQAAAAvAAAAGwAAAAARAWZmZgDAIAAAAAAAAD#wAAAAAAAAAAAAJgsAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIxKQAAABkBAAAAEQBmZmYAAAAxAAAADgAAABAAAAAmAAAABAAAACYAAAAnAAAAKAAAADEAAAAbAAAAABEBZmZmAMAcAAAAAAAAAAAAAAAAAAAAAAArCwAB####AAAAAgAAAAEAAAABAAAAAAAAAAAACyNWYWwob3JkcjIpAAAAGQEAAAARAGZmZgAAADMAAAAOAAAAEAAAACYAAAAGAAAAJgAAACcAAAAoAAAAKgAAACsAAAAz#####wAAAAEABUNGb25jAP####8AAWYACC0yKngqeCszAAAADQD#####AAAAAQAMQ01vaW5zVW5haXJlAAAADQIAAAANAgAAAAFAAAAAAAAAAP####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAAeAAAAAAAAAAFACAAAAAAAAAABeAAAAAQA#####wEAAAAAEAABeAAAAAAAAAAAAEAIAAAAAAAABQABQC8BAyKX1IIAAAAEAAAAGAD#####AAJ4MQAAAAoAAAA2AAAAEQD#####AAJ5MQAFZih4MSn#####AAAAAQAOQ0FwcGVsRm9uY3Rpb24AAAA1AAAADgAAADcAAAAWAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAADgAAADcAAAAOAAAAOP####8AAAACAA1DTGlldURlUG9pbnRzAP####8AAAD#AAIAAAA5AAAB9AABAAAANgAAAAQAAAA2AAAANwAAADgAAAA5#####wAAAAEAFUNQb2ludExpZUxpZXVQYXJQdExpZQD#####AAAAAAAQAAFNAAAAAAAAAAAAQAgAAAAAAAAJAAG##CuHsx36wAAAADq##CuHsx36wAAAAAMA#####wEAAAABEAAAAQABAAAAOwA#8AAAAAAAAAAAAAMA#####wEAAAABEAAAAQABAAAAOwE#8AAAAAAAAP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAEAAAAPAAAACIA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAUAAAA9AAAAFwD#####AAAAAAAQAAABAQEAAAA7AAAAPgAAABcA#####wAAAAAAEAAAAQEBAAAAOwAAAD8AAAAO##########8="

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


		texte = `On a tracé ci-dessous la courbe représentative de la fonction $f$.<br>`

		if (this.sup == 1) {

			a = calcul((fx2 - fx1) / (x2 - x1));
			b = calcul(fx1 - a * x1);
			expression_f = `${a}*x+(${b})`;

			texte += `Déterminer par lecture graphique les images de $${x1}$ et de $${x2}$ par cette fonction $f$.<br><br>`
			texte_corr = `L'image de $${x1}$ est $${fx1}$, on note $f(${x1})=${fx1}$.<br>`
			texte_corr += `L'image de $${x2}$ est $${fx2}$, on note $f(${x2})=${fx2}$.`

		}

		if (this.sup == 2) {
			[[numa, dena], [numb, denb]] = resol_sys_lineaire_2x2(x1, x3, fx1, fx3, c)
			while (dena == 0 || denb == 0 || numa == 0) {
				x1 = randint(-6, -3);
				x3 = randint(1, 6);
				fx1 = randint(-5, 5);
				fx3 = randint(-6, 6);
				d = randint(-10, 10);

				[[numa, dena], [numb, denb]] = resol_sys_lineaire_2x2(x1, x3, fx1, fx3, c)
			}
			a = numa / dena;
			b = numb / denb;
			x2 = 0;
			fx2 = c;

			expression_f = `${a}*x^2+(${b})*x+(${c})`;
		}

		if (this.sup == 3) {
			[[numa, dena], [numb, denb], [numc, denc]] = resol_sys_lineaire_3x3(x1, x2, x3, fx1, fx2, fx3, d)
			let [extremum1, extremum2] = cherche_min_max_f([numa / dena, numb / denb, numc / denc, d])
			while (dena == 0 || denb == 0 || denc == 0 || abs(extremum1[1]) > ymax || abs(extremum2[1]) > ymax) {
				initialise_variables();
				[[numa, dena], [numb, denb], [numc, denc]] = resol_sys_lineaire_3x3(x1, x2, x3, fx1, fx2, fx3, d)
				if (cherche_min_max_f([numa / dena, numb / denb, numc / denc, d]) == []) {
					[extremum1, extremum2] = [[0, 999], [0, 999]]
				} else {
					[extremum1, extremum2] = cherche_min_max_f([numa / dena, numb / denb, numc / denc, d])
				}
			}
			a = numa / dena;
			b = numb / denb;
			c = numc / denc;

			expression_f = `${a}*x^3+(${b})*x^2+(${c})*x+(${d})`;
		}

		if (this.sup == 2 || this.sup == 3) {
			texte += `Déterminer par lecture graphique les images de $${x1}$, de $${x2}$ et de $${x3}$ par cette fonction $f$.<br><br>`
			texte_corr = `L'image de $${x1}$ est $${fx1}$, on note $f(${x1})=${fx1}$.<br>`
			texte_corr += `L'image de $${x2}$ est $${fx2}$, on note $f(${x2})=${fx2}$.<br>`
			texte_corr += `L'image de $${x3}$ est $${fx3}$, on note $f(${x3})=${fx3}$.<br>`
		}

		if (!sortie_html) {
			texte += "\n\n"
			texte += tex_graphique(expression_f);
		}

		this.MG32codeBase64 = codeBase64
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "f", "${expression_f}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      `

		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu_sans_numero(this);
	}

	this.besoin_formulaire_numerique = ['Type de fonctions', 3, "1 : Affine\n2 : Polynome du 2nd degré\n3 : Polynome du 3e degré"];

}

/**
* Un graphique étant tracé, déterminer les antécédents de nombres donnés.
* La fonction est un polynome de degré 1, 2 ou 3 et les nombres des questions ne sont que des entiers.
*
* @Auteur Rémi Angot
* 3F13
*/
function Antecedent_graphique() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire les antécédents d'un nombre à partir d'un graphique"
	this.consigne = ""
	this.sup = 2;
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
		let codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAAEL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFAeKkeuFHrhEBzy4UeuFHs#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAAA4AAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8AAAAAAQ4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBCb52yLQ5WAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wAAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AAAAAAAOAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADgAAAQUAAQAAAAcAAAAJAP####8AAAAAAQ4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAQEAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAduYmdyYWR4AAIyMAAAAAFANAAAAAAAAAAAABEA#####wAHbmJncmFkeQACMjAAAAABQDQAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAUR3JhZHVhdGlvbkF4ZXNSZXBlcmUAAAAbAAAACAAAAAMAAAAKAAAADwAAABD#####AAAAAQATQ0Fic2Npc3NlT3JpZ2luZVJlcAAAAAARAAVhYnNvcgAAAAr#####AAAAAQATQ09yZG9ubmVlT3JpZ2luZVJlcAAAAAARAAVvcmRvcgAAAAoAAAALAAAAABEABnVuaXRleAAAAAr#####AAAAAQAKQ1VuaXRleVJlcAAAAAARAAZ1bml0ZXkAAAAK#####wAAAAEAEENQb2ludERhbnNSZXBlcmUAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADgAAABMAAAAWAAAAABEAAAAAAA4AAAEFAAAAAAoAAAANAAAAAA4AAAASAAAADgAAABQAAAAOAAAAEwAAABYAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADQAAAAAOAAAAEwAAAA4AAAAVAAAADAAAAAARAAAAFgAAAA4AAAAPAAAADwAAAAARAAAAAAAOAAABBQAAAAAXAAAAGQAAAAwAAAAAEQAAABYAAAAOAAAAEAAAAA8AAAAAEQAAAAAADgAAAQUAAAAAGAAAABv#####AAAAAQAIQ1NlZ21lbnQAAAAAEQEAAAAAEAAAAQABAAAAFwAAABoAAAAXAAAAABEBAAAAABAAAAEAAQAAABgAAAAcAAAABAAAAAARAQAAAAALAAFXAMAUAAAAAAAAwDQAAAAAAAAFAAE#3FZ4mrzfDgAAAB3#####AAAAAgAIQ01lc3VyZVgAAAAAEQAGeENvb3JkAAAACgAAAB8AAAARAAAAABEABWFic3cxAAZ4Q29vcmQAAAAOAAAAIP####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUBAAAAEQBmZmYAAAAfAAAADgAAAA8AAAAfAAAAAgAAAB8AAAAfAAAAEQAAAAARAAVhYnN3MgANMiphYnNvci1hYnN3MQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEgAAAA4AAAAhAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAACMAAAAOAAAAEwAAABkBAAAAEQBmZmYAAAAkAAAADgAAAA8AAAAfAAAABQAAAB8AAAAgAAAAIQAAACMAAAAkAAAABAAAAAARAQAAAAALAAFSAEAgAAAAAAAAwCAAAAAAAAAFAAE#0RtOgbToHwAAAB7#####AAAAAgAIQ01lc3VyZVkAAAAAEQAGeUNvb3JkAAAACgAAACYAAAARAAAAABEABW9yZHIxAAZ5Q29vcmQAAAAOAAAAJwAAABkBAAAAEQBmZmYAAAAmAAAADgAAABAAAAAmAAAAAgAAACYAAAAmAAAAEQAAAAARAAVvcmRyMgANMipvcmRvci1vcmRyMQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEwAAAA4AAAAoAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAABIAAAAOAAAAKgAAABkBAAAAEQBmZmYAAAArAAAADgAAABAAAAAmAAAABQAAACYAAAAnAAAAKAAAACoAAAAr#####wAAAAIADENDb21tZW50YWlyZQAAAAARAWZmZgAAAAAAAAAAAEAYAAAAAAAAAAAAHwsAAf###wAAAAEAAAAAAAAAAQAAAAAAAAAAAAsjVmFsKGFic3cxKQAAABkBAAAAEQBmZmYAAAAtAAAADgAAAA8AAAAfAAAABAAAAB8AAAAgAAAAIQAAAC0AAAAbAAAAABEBZmZmAAAAAAAAAAAAQBgAAAAAAAAAAAAkCwAB####AAAAAQAAAAAAAAABAAAAAAAAAAAACyNWYWwoYWJzdzIpAAAAGQEAAAARAGZmZgAAAC8AAAAOAAAADwAAAB8AAAAGAAAAHwAAACAAAAAhAAAAIwAAACQAAAAvAAAAGwAAAAARAWZmZgDAIAAAAAAAAD#wAAAAAAAAAAAAJgsAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIxKQAAABkBAAAAEQBmZmYAAAAxAAAADgAAABAAAAAmAAAABAAAACYAAAAnAAAAKAAAADEAAAAbAAAAABEBZmZmAMAcAAAAAAAAAAAAAAAAAAAAAAArCwAB####AAAAAgAAAAEAAAABAAAAAAAAAAAACyNWYWwob3JkcjIpAAAAGQEAAAARAGZmZgAAADMAAAAOAAAAEAAAACYAAAAGAAAAJgAAACcAAAAoAAAAKgAAACsAAAAz#####wAAAAEABUNGb25jAP####8AAWYACC0yKngqeCszAAAADQD#####AAAAAQAMQ01vaW5zVW5haXJlAAAADQIAAAANAgAAAAFAAAAAAAAAAP####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAAeAAAAAAAAAAFACAAAAAAAAAABeAAAAAQA#####wEAAAAAEAABeAAAAAAAAAAAAEAIAAAAAAAABQABQC8BAyKX1IIAAAAEAAAAGAD#####AAJ4MQAAAAoAAAA2AAAAEQD#####AAJ5MQAFZih4MSn#####AAAAAQAOQ0FwcGVsRm9uY3Rpb24AAAA1AAAADgAAADcAAAAWAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAADgAAADcAAAAOAAAAOP####8AAAACAA1DTGlldURlUG9pbnRzAP####8AAAD#AAIAAAA5AAAB9AABAAAANgAAAAQAAAA2AAAANwAAADgAAAA5#####wAAAAEAFUNQb2ludExpZUxpZXVQYXJQdExpZQD#####AAAAAAAQAAFNAAAAAAAAAAAAQAgAAAAAAAAJAAG#fx#Yd2ToAAAAADq#fx#Yd2ToAAAAAAMA#####wEAAAABEAAAAQABAAAAOwA#8AAAAAAAAAAAAAMA#####wEAAAABEAAAAQABAAAAOwE#8AAAAAAAAP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAEAAAAPAAAACIA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAUAAAA9AAAAFwD#####AAAAAAAQAAABAQEAAAA7AAAAPgAAABcA#####wAAAAAAEAAAAQEBAAAAOwAAAD8AAAAO##########8="

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


		texte = `On a tracé ci-dessous la courbe représentative de la fonction $f$.<br>`

		if (this.sup == 1) {

			a = calcul((fx2 - fx1) / (x2 - x1));
			b = calcul(fx1 - a * x1);
			expression_f = `${a}*x+(${b})`;

			texte += `Déterminer par lecture graphique les antécédents de $${fx1}$ et de $${fx2}$ par cette fonction $f$.<br><br>`
			texte_corr = `L'antécédent de $${fx1}$ est $${x1}$, on note $f(${x1})=${fx1}$.<br>`
			texte_corr += `L'antécédent de $${fx2}$ est $${x2}$, on note $f(${x2})=${fx2}$.`

		}

		if (this.sup == 2) {
			if (randint(1, 4) < 2) { // une fois sur 4 il n'y a qu'un seul antécédent
				let x0 = randint(-2, 2)
				let fx0 = randint(-4, 4)
				if (!sortie_html) {
					fx0 = randint(-2, 2)
				}
				a = randint(-3, 3, 0);
				texte += `Déterminer par lecture graphique le (ou les) antécédent(s) de $${fx0}$ par cette fonction $f$.<br><br>`
				texte_corr = `$${fx0}$ a un unique antécédent $${x0}$, on note $f(${x0})=${fx0}$.<br>`
				expression_f = `${a}*(x-(${x0}))^2+(${fx0})`;
			} else {
				fx3 = fx1;
				[[numa, dena], [numb, denb]] = resol_sys_lineaire_2x2(x1, x3, fx1, fx3, c)
				while (dena == 0 || denb == 0 || numa == 0) {
					x1 = randint(-4, -1);
					x3 = randint(1, 4);
					sortie_html ? fx1 = randint(-7, 7) : fx1 = randint(-3, 3);
					fx3 = fx1;
					sortie_html ? c = randint(-6, 6) : c = randint(-4, 4);

					[[numa, dena], [numb, denb]] = resol_sys_lineaire_2x2(x1, x3, fx1, fx3, c)
				}
				a = numa / dena;
				b = numb / denb;
				x2 = 0;
				fx2 = c;
				expression_f = `${a}*x^2+(${b})*x+(${c})`;
				texte += `Déterminer par lecture graphique le (ou les) antécédent(s) de $${fx1}$ par cette fonction $f$.<br><br>`
				texte_corr = `$${fx1}$ a deux antécédents $${x1}$ et $${x3}$, on note $f(${x1})=f(${x3})=${fx1}$.<br>`
			}
		}


		if (!sortie_html) {
			texte += "\n\n"
			texte += tex_graphique(expression_f);
		}

		this.MG32codeBase64 = codeBase64
		this.MG32code_pour_modifier_la_figure = `
	        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "f", "${expression_f}");
	        mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        mtg32App.display("MG32svg${numero_de_l_exercice}");
	      `

		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu_sans_numero(this);
	}

	this.besoin_formulaire_numerique = ['Type de fonctions', 2, "1 : Affine\n2 : Polynome du 2nd degré"];

}
/**
* Problèmes calculs d'aire et de volumes utilisant l'effet d'une réduction sur les aires et les volumes 
* @auteur Jean-Claude Lhote
* 3G22
*/
function Agrandissement_reduction() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Connaître les effets des agrandissements/réductions sur les aires et les volumes";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	sortie_html ? this.spacing_corr = 3.5 : this.spacing_corr = 1.5
	sortie_html ? this.spacing = 2.5 : this.spacing = 1.5
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.quatrieme = false;
	this.sup = 1; // 
	this.sup2 =1;
	this.pas_de_version_LaTeX = false;


	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = [];
		this.liste_corrections = [];
		let texte, texte_corr, r, r2, h1, h2, h3, c, c2; 
	//	if (sortie_html) {
			this.type_exercice = 'MG32';
			this.taille_div_MG32 = [600, 700];
			let codeBase64
			let choix
			if (this.sup == 1) choix = randint(1, 3)
			else if (this.sup == 2) choix = randint(4,5)
			else choix = randint(1, 5)
			switch (choix) {
				case 1: // calcul de l'aire de base, du volume d'une pyramide à base carrée. puis, calcul de la section, du volume de la petite pyramide et du volume du tronc
					c = calcul(randint(30, 60) / 10)
					h1 = calcul(randint(12, 20) / 2)
					h2 = randint(3, Math.floor(h1) - 1)
					if (this.sup2<3)
						if (this.sup2==1) // on veut un coefficient de réduction décimal à 1 chiffre après la virgule
							while (calcul(h2/h1)!=arrondi(h2/h1,1)) {
								c = calcul(randint(30, 60) / 10)
								h1 = calcul(randint(12, 20) / 2)
								h2 = randint(3, Math.floor(h1) - 1)
							}
						else // coefficient qui peut être décimal avec plus d'un chiffre ou rationnel non décimal.
							while (calcul(h2/h1)==arrondi(h2/h1,1)) {
								c = calcul(randint(30, 60) / 10)
								h1 = calcul(randint(12, 20) / 2)
								h2 = randint(3, Math.floor(h1) - 1)
							}
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAANmcmH###8BAP8BAAAAAAAAAAAFHAAAAtIAAAAAAAAAAAAAAAEAAAE1#####wAAAAEACkNDYWxjQ29uc3QA#####wACcGkAFjMuMTQxNTkyNjUzNTg5NzkzMjM4NDb#####AAAAAQAKQ0NvbnN0YW50ZUAJIftURC0Y#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAAAAEAIAAAAAAAAAAAAAAAAAAAFAAFAgBQAAAAAAEBzyFHrhR64#####wAAAAEAB0NDYWxjdWwA#####wAFbWluaTEAAzAuNQAAAAE#4AAAAAAAAAAAAAMA#####wAFbWF4aTEAATMAAAABQAgAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAHQ3Vyc2V1cgAAAAUAAAAFAAAAAwAAAAIAAAADAAAAAf####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQAAAAAEAQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQEAAAAEAAAAAAAQAAAAwAgAAAAAAAA#8AAAAAAAAAUAAUBPAAAAAAAAAAAABf####8AAAABAAtDSG9tb3RoZXRpZQAAAAAEAAAAAf####8AAAABAApDT3BlcmF0aW9uA#####8AAAABAA9DUmVzdWx0YXRWYWxldXIAAAACAAAACAEAAAAJAAAAAgAAAAkAAAAD#####wAAAAEAC0NQb2ludEltYWdlAAAAAAQBAAAAAA0AAk8xAMAQAAAAAAAAQBAAAAAAAAAFAAAAAAYAAAAHAAAABwAAAAAEAAAAAQAAAAgDAAAACAEAAAABP#AAAAAAAAAAAAAJAAAAAgAAAAgBAAAACQAAAAMAAAAJAAAAAgAAAAoAAAAABAEAAAAADQACSTIAwAAAAAAAAABACAAAAAAAAAUAAAAABgAAAAn#####AAAAAQAIQ1NlZ21lbnQBAAAABAAAAAAAEAAAAQEBAAAAAQAAAAYAAAAGAQAAAAQAAAAAARAAAmsxAMAAAAAAAAAAQAAAAAAAAAABAAE#2973ve973wAAAAv#####AAAAAgAPQ01lc3VyZUFic2Npc3NlAQAAAAQABHpvb20AAAAIAAAACgAAAAz#####AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAQAAAAQBAAAAAAAAAAAAAAAAwBgAAAAAAAAAAAAMDwAB####AAAAAQAAAAIAAAABAAAAAAAAAAAAAAAAAgAAAA0AAAADAP####8AAWMAATMAAAABQAgAAAAAAAAAAAACAP####8AAAAAAQ8AAU8AP#AAAAAAAABACAAAAAAAAAUAAUBukAAAAAAAQILsKPXCj1wAAAAFAP####8BAAAAABAAAAEAAQAAABABQACWu5jH4oIAAAACAP####8AAAAAAQ8AAk8yAQUAAUCBLAAAAAAAQHn4UeuFHrgAAAACAP####8AAAAAAQ8AAk8zAQUAAUCBJAAAAAAAQH44UeuFHrgAAAAFAP####8BAAAAABAAAAEAAQAAABMBQACWu5jH4oIAAAACAP####8AAAAAAQ8AAk80AQUAAUCBFAAAAAAAQIIcKPXCj1wAAAAFAP####8BAAAAABAAAAEAAQAAABUBQACWu5jH4oL#####AAAAAQARQ1N5bWV0cmllQ2VudHJhbGUA#####wAAABL#####AAAAAQAFQ0ZvbmMA#####wAEemVybwANYWJzKHQpPDAuMDAwMQAAAAgE#####wAAAAIACUNGb25jdGlvbgD#####AAAAAgARQ1ZhcmlhYmxlRm9ybWVsbGUAAAAAAAAAAT8aNuLrHEMtAAF0AAAABQD#####AQAAAAEQAAABAAEAAAASAD#wAAAAAAAAAAAABgD#####AAAAAAEPAAJKMgEFAADAQAAAAAAAAAAAABn#####AAAAAQAMQ1RyYW5zbGF0aW9uAP####8AAAASAAAAGgAAAAoA#####wEAAAAAEAAAAQUAAAAAEwAAABv#####AAAAAQAJQ0NlcmNsZU9BAP####8Af39#AQEAAAATAAAAHP####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAUAAAAHf####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8BAAAAAA0AAkkzAQUAAQAAAB7#####AAAAAQAPQ1BvaW50TGllQ2VyY2xlAP####8AAAAAAQsAAkszAQEAAUAYJx+keskRAAAAHQAAAAsA#####wAAAAAAEAAAAQABAAAAEgAAABoAAAALAP####8AAAAAABAAAAEAAQAAABMAAAAfAAAACwD#####AAAAAAAQAAABAAEAAAATAAAAIP####8AAAACABNDTWVzdXJlQW5nbGVPcmllbnRlAP####8ACGFuZ3RoZXRhAAAAHwAAABMAAAAgAAAAAwD#####AAV0aGV0YQAIYW5ndGhldGEAAAAJAAAAJAAAAAMA#####wADeCcxAApzaW4odGhldGEpAAAAEAMAAAAJAAAAJQAAAAMA#####wADeCcyAApjb3ModGhldGEpAAAAEAQAAAAJAAAAJf####8AAAACABNDTWFycXVlQW5nbGVPcmllbnRlAP####8AfwAAAAIAAAAAQDWKaKSo2fMAAAAfAAAAEwAAACAB#####wAAAAEADENCaXNzZWN0cmljZQD#####AX8AAAAQAAABAQEAAAAfAAAAEwAAACAAAAAGAP####8BfwAAABAAAAEFAAFAebYKC41k5QAAACn#####AAAAAgAGQ0xhdGV4AP####8AfwAAAMAUAAAAAAAAwCYAAAAAAAAAAAAqEQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAClx2YXJ0aGV0YSAAAAAKAP####8BAAAAABAAAAEFAAAAABoAAAAX#####wAAAAEAEkNBcmNEZUNlcmNsZURpcmVjdAD#####AH9#fwEBAAAAEgAAABoAAAAsAAAAFgD#####AAAAAAEPAAJLMgEBAAE#wCNHf8Ds#QAAAC0AAAALAP####8AAAAAABAAAAEAAQAAABIAAAAuAAAAFwD#####AAZhbmdwaGkAAAAaAAAAEgAAAC4AAAADAP####8AA3BoaQAGYW5ncGhpAAAACQAAADAAAAAHAP####8AAAAVAAAAEAQAAAAJAAAAMQAAAAMA#####wADeScxABQtY29zKHRoZXRhKSpzaW4ocGhpKQAAAAgBAAAAAQAAAAAAAAAAAAAACAIAAAAQBAAAAAkAAAAlAAAAEAMAAAAJAAAAMQAAAAMA#####wADeScyABNzaW4odGhldGEpKnNpbihwaGkpAAAACAIAAAAQAwAAAAkAAAAlAAAAEAMAAAAJAAAAMQAAABgA#####wAAAP8AAgAAAABAN1LlDbOjogAAABoAAAASAAAALgEAAAAZAP####8BAAD#ABAAAAEBAQAAABoAAAASAAAALgAAAAYA#####wEAAP8AEAAAAQUAAUB8Mk4l1syCAAAANgAAABoA#####wAAAP8AwBAAAAAAAADAFAAAAAAAAAAAADcRAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHXHZhcnBoaQAAAAUA#####wEAAAABEAAAAQABAAAAFQA#8AAAAAAAAAAAAAYA#####wAAAAABDwACSjQBBQABwEoAAAAAAAAAAAA5AAAAEwD#####AGZmZgABAAAAFQAAADoAAAAWAP####8BAAAAABAAAAEFAAE#8JfpunkCYQAAADsAAAAFAP####8BAAAAABAAAAEAAQAAADwAQACWu5jH4oL#####AAAAAQAQQ0ludERyb2l0ZURyb2l0ZQD#####AQAAAAAQAAABBQAAAAAWAAAAPQAAABQA#####wAAABYAAAA7AAAAFQD#####AQAAAAENAAJJNAEFAAEAAAA######wAAAAIAB0NSZXBlcmUA#####wAAAAABAQAAABUAAABAAAAAOgAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAAAoA#####wEAAAAAEAAAAQUAAAAAOgAAADIAAAAHAP####8AAAA+AAAAEAQAAAAJAAAAMQAAAAoA#####wEAAAAAEAAAAQUAAAAAPAAAAEP#####AAAAAgANQ0xpZXVEZVBvaW50cwD#####AAB#fwEBAAAARAAAAGQAAAAAADwAAAAFAAAAPAAAAD0AAAA+AAAAQwAAAET#####AAAAAQAIQ1ZlY3RldXIA#####wAAAP8AEAAAAQABAAAAFQAAAEIA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAEAAAAQUAAAAAQQAAAAkAAAAmAAAACQAAADMAAAAgAP####8BAAAAABAAAAEFAAAAAEEAAAAJAAAAJwAAAAkAAAA0AAAAHwD#####AP8AAAAQAAABAAEAAAAVAAAARwAAAAAfAP####8AAH8AABAAAAEAAQAAABUAAABIAAAAAB4A#####wBmZmYBAQAAAEcAAABkAAAAAAAgAAAABgAAACAAAAAkAAAAJQAAACYAAAAzAAAAR#####8AAAABAAxDU3VyZmFjZUxpZXUA#####wB#f38AAAAFAAAASwAAACEA#####wB#f38AAAAFAAAARQAAAAMA#####wACaDEAAjEwAAAAAUAkAAAAAAAAAAAAAwD#####AAJoMgABMwAAAAFACAAAAAAAAAAAAAMA#####wACaDMABWgxLWgyAAAACAEAAAAJAAAATgAAAAkAAABP#####wAAAAEACUNMb25ndWV1cgD#####AAAAEgAAABr#####AAAAAgAMQ0NvbW1lbnRhaXJlAP####8A#wAAAf####8QQIA8AAAAAABAdGhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABFpPT03#####AAAAAgAJQ0NlcmNsZU9SAP####8B#wAAAAEAAAAQAAAAAT#wAAAAAAAAAAAAABQA#####wAAABEAAABTAAAAFQD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAFQAAAAVAP####8B#wAAABAAAkkiAAAAAAAAAAAAQAgAAAAAAAAFAAEAAABUAAAABwD#####AAAAEAAAAAkAAAANAAAACgD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAVgAAAFf#####AAAAAQAOQ1BvaW50TGllUG9pbnQA#####wEAAAAACwACSTEAwBAAAAAAAABAEAAAAAAAAAUAAAAAWP####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAADQAAAQABAAAAEAAAAFn#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAQAAABAAEAAAAQAAAAWgAAABMA#####wEAAAAAAQAAABAAAABZAAAAFAD#####AAAAWwAAAFwAAAAVAP####8BAAAAAAsAAkoxAMAoAAAAAAAAwBAAAAAAAAAFAAIAAABdAAAAHQD#####AICAgAEBAAAAEAAAAFkAAABeAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAAAAAAIAD#####AQAAAAAPAAFLAEAQAAAAAAAAwC4AAAAAAAAFAAAAAF8AAAABAAAAAAAAAAAAAAAQBAAAAAkAAAAxAAAAIAD#####AQAAAAAPAAFJAMAmAAAAAAAAwC4AAAAAAAAFAAAAAF8AAAAJAAAAJgAAAAkAAAAzAAAAIAD#####AQAAAAAPAAFKAEAUAAAAAAAAwCwAAAAAAAAFAAAAAF8AAAAJAAAAJwAAAAkAAAA0#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wEAAAAADQAAAQEBAAAAEAAAAGEAAAAoAP####8BAAAAAA0AAAEBAQAAABAAAABiAAAAKAD#####AQAAAAANAAABAQEAAAAQAAAAYAAAAB8A#####wH#AAAAEAAAAQABAAAAEAAAAGEAAAAAHwD#####AQB#AAAQAAABAAEAAAAQAAAAYgAAAAAfAP####8BAAD#ABAAAAEAAQAAABAAAABgAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AAAA#wH#####DUB+IAAAAAAAQIQQAAAAAAACAczM#wAAAAAAAAAAAAAAAQAAAAAAAAAAABMoTyxJLEosSykgaW52aXNpYmxlAAAAAAAJAAAAZAAAAGEAAABiAAAAZQAAAGgAAABgAAAAZwAAAGYAAABj#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wAAAP8B#####w1AfpAAAAAAAECE4AAAAAAAAgHMzP8AAAAAAAAAAAAAAAEAAAAAAAAAAAARKE8sSSxKLEspIHZpc2libGUAAAAAAAkAAABkAAAAYQAAAGIAAABlAAAAaAAAAGAAAABnAAAAZgAAAGMA#####wAAAAEAEUNQb2ludFBhckFic2Npc3NlAP####8B#wAAABAAAkUiAAAAAAAAAAAAQAgAAAAAAAAFAAAAABAAAABhAAAACAMAAAAJAAAADwAAAAFAAAAAAAAAAAAAACUA#####wEAAAAADwABRQEFAAAAAGsAAAAMAP####8ABGFiczEAAAAQAAAAYQAAAGwAAAADAP####8AAWEABjIqYWJzMQAAAAgCAAAAAUAAAAAAAAAAAAAACQAAAG0AAAArAP####8B#wD#ABAAAAEFAAAAABAAAABiAAAACQAAAG0AAAAlAP####8BAAAAABAAAAEFAAAAAG8AAAASAP####8AAAAQAAAAcAAAAAoA#####wEAAAAADwABQgDAAAAAAAAAAEAIAAAAAAAABQAAAABsAAAAcQAAABIA#####wAAAHIAAABwAAAACgD#####AQAAAAAPAAFDAAAAAAAAAAAAQAAAAAAAAAAFAAAAAHAAAABzAAAAEgD#####AAAAcgAAAGwAAAAKAP####8BAAAAAA8AAUEAwBwAAAAAAAA#8AAAAAAAAAUAAAAAbAAAAHUAAAASAP####8AAAByAAAAdgAAAAoA#####wEAAAAADwABRADAMwAAAAAAAMAyAAAAAAAABQAAAAB0AAAAdwAAAAsA#####wAAAAAAEAAAAQEBAAAAcgAAAHQAAAALAP####8AAAAAABAAAAEBAQAAAHQAAAB4AAAACwD#####AAAAAAAQAAABAQEAAAB4AAAAdgAAAAsA#####wAAAAAAEAAAAQEBAAAAdgAAAHIAAAAXAP####8ABWFuZzEzAAAAcgAAAHYAAAB0AAAAFwD#####AAVhbmcxNAAAAHQAAAB2AAAAeAAAABcA#####wAFYW5nMTcAAAB0AAAAcgAAAHgAAAAXAP####8ABWFuZzE4AAAAeAAAAHIAAAB2AAAAFwD#####AAZhbmcxMTEAAAB4AAAAdAAAAHYAAAAXAP####8ABmFuZzExMgAAAHYAAAB0AAAAcgAAABcA#####wAGYW5nMTE1AAAAdgAAAHgAAAByAAAAFwD#####AAZhbmcxMTYAAAByAAAAeAAAAHQAAAAmAP####8BAAAAAAsAAAEBAQAAAHYAAAByAAAAJgD#####AQAAAAANAAABAQEAAAByAAAAdAAAACYA#####wEAAAAADQAAAQEBAAAAdAAAAHgAAAAmAP####8BAAAAAA0AAAEBAQAAAHgAAAB2AAAAKwD#####Af8AAAAQAAJTIgAAAAAAAAAAAEAIAAAAAAAABQAAAAAQAAAAYAAAAAkAAABOAAAAJQD#####AQAAAAAPAAFTAMAiAAAAAAAAwDIAAAAAAAAFAAAAAIkAAAAMAP####8ABWFiczE1AAAAEAAAAGAAAACKAAAAAwD#####AAFoAAVhYnMxNQAAAAkAAACLAAAACwD#####AAAAAAAQAAABAQEAAACKAAAAdgAAAAsA#####wAAAAAAEAAAAQEBAAAAigAAAHIAAAALAP####8AAAAAABAAAAEBAQAAAIoAAAB0AAAACwD#####AAAAAAAQAAABAQEAAACKAAAAeAAAABcA#####wAFYW5nMTIAAACKAAAAdgAAAHIAAAAXAP####8ABWFuZzE1AAAAeAAAAHYAAACKAAAAAwD#####AAlTQVZpc2libGUAHzEvemVybyhhbmcxMithbmcxMythbmcxNCthbmcxNSkAAAAIAwAAAAE#8AAAAAAAAP####8AAAABAA5DQXBwZWxGb25jdGlvbgAAABgAAAAIAAAAAAgAAAAACAAAAAAJAAAAkQAAAAkAAAB9AAAACQAAAH4AAAAJAAAAkgAAAAcA#####wAAAIoAAAAJAAAAkwAAAAoA#####wH#AP8AEAAAAQUAAAAAdgAAAJQAAAALAP####8BAAAAABAAAAEAAgAAAIoAAACVAAAAFwD#####AAVhbmcxNgAAAIoAAAByAAAAdAAAABcA#####wAFYW5nMTkAAAB2AAAAcgAAAIoAAAADAP####8ACVNCVmlzaWJsZQAfMS96ZXJvKGFuZzE2K2FuZzE3K2FuZzE4K2FuZzE5KQAAAAgDAAAAAT#wAAAAAAAAAAAALAAAABgAAAAIAAAAAAgAAAAACAAAAAAJAAAAlwAAAAkAAAB#AAAACQAAAIAAAAAJAAAAmAAAAAcA#####wAAAIoAAAAJAAAAmQAAAAoA#####wH#AP8AEAAAAQUAAAAAcgAAAJoAAAALAP####8BAAAAABAAAAEAAgAAAIoAAACbAAAAFwD#####AAZhbmcxMTAAAACKAAAAdAAAAHgAAAAXAP####8ABmFuZzExMwAAAHIAAAB0AAAAigAAAAMA#####wAJU0NWaXNpYmxlACMxL3plcm8oYW5nMTEwK2FuZzExMSthbmcxMTIrYW5nMTEzKQAAAAgDAAAAAT#wAAAAAAAAAAAALAAAABgAAAAIAAAAAAgAAAAACAAAAAAJAAAAnQAAAAkAAACBAAAACQAAAIIAAAAJAAAAngAAAAcA#####wAAAIoAAAAJAAAAnwAAAAoA#####wH#AP8AEAAAAQUAAAAAdAAAAKAAAAALAP####8BAAAAABAAAAEAAgAAAIoAAAChAAAAFwD#####AAZhbmcxMTQAAACKAAAAeAAAAHYAAAAXAP####8ABmFuZzExNwAAAHQAAAB4AAAAigAAAAMA#####wAJU0RWaXNpYmxlACMxL3plcm8oYW5nMTE0K2FuZzExNSthbmcxMTYrYW5nMTE3KQAAAAgDAAAAAT#wAAAAAAAAAAAALAAAABgAAAAIAAAAAAgAAAAACAAAAAAJAAAAowAAAAkAAACDAAAACQAAAIQAAAAJAAAApAAAAAcA#####wAAAIoAAAAJAAAApQAAAAoA#####wH#AP8AEAAAAQUAAAAAeAAAAKYAAAALAP####8BAAAAABAAAAEAAgAAAIoAAACnAAAAHAD#####AQAAAAANAAJXMQEFAAAAAI8AAACFAAAADAD#####AAVhYnMxMQAAAHYAAAByAAAAqf####8AAAABAA5DVGVzdEV4aXN0ZW5jZQD#####AAZUZXN0QUIAAACqAAAAAwD#####AAlBQlZpc2libGUADDEvKDEtVGVzdEFCKQAAAAgDAAAAAT#wAAAAAAAAAAAACAEAAAABP#AAAAAAAAAAAAAJAAAAqwAAAAcA#####wAAAIoAAAAJAAAArAAAAAoA#####wH#AAAAEAAAAQUAAAAAdgAAAK0AAAALAP####8BAAAAABAAAAEAAgAAAK4AAAByAAAAHAD#####AQAAAAANAAJXMgEFAAAAAJAAAACGAAAADAD#####AAVhYnMxMgAAAHIAAAB0AAAAsAAAAC0A#####wAGdGVzdEJDAAAAsQAAAAMA#####wAJQkNWaXNpYmxlAAwxLygxLXRlc3RCQykAAAAIAwAAAAE#8AAAAAAAAAAAAAgBAAAAAT#wAAAAAAAAAAAACQAAALIAAAAHAP####8AAACKAAAACQAAALMAAAAKAP####8B#wD#ABAAAAEFAAAAAHIAAAC0AAAACwD#####AQAAAAAQAAABAAIAAAC1AAAAdAAAABwA#####wEAAAAADQACVzMBBQAAAACHAAAAjQAAAAwA#####wAFYWJzMTMAAAB0AAAAeAAAALcAAAAtAP####8ABlRlc3RDRAAAALgAAAADAP####8ACUNEVmlzaWJsZQAMMS8oMS1UZXN0Q0QpAAAACAMAAAABP#AAAAAAAAAAAAAIAQAAAAE#8AAAAAAAAAAAAAkAAAC5AAAABwD#####AAAAigAAAAkAAAC6AAAACgD#####Af8A#wAQAAABBQAAAAB0AAAAuwAAAAsA#####wEAAAAAEAAAAQACAAAAvAAAAHgAAAAcAP####8BAAAAAA0AAlc0AQUAAAAAjgAAAIgAAAAMAP####8ABWFiczE0AAAAeAAAAHYAAAC+AAAALQD#####AAZUZXN0REEAAAC#AAAAAwD#####AAlEQVZpc2libGUADDEvKDEtVGVzdERBKQAAAAgDAAAAAT#wAAAAAAAAAAAACAEAAAABP#AAAAAAAAAAAAAJAAAAwAAAAAcA#####wAAAIoAAAAJAAAAwQAAAAoA#####wH#AP8AEAAAAQUAAAAAeAAAAMIAAAALAP####8BAAAAABAAAAEAAgAAAMMAAAB2#####wAAAAEADkNPYmpldER1cGxpcXVlAP####8AAAAAAAAArwAAAC4A#####wAAAAAAAAC2AAAALgD#####AAAAAAAAAJYAAAAuAP####8AAAAAAAAAnAAAAC4A#####wAAAAAAAACiAAAALgD#####AAAAAAAAAL0AAAAuAP####8AAAAAAAAAxAAAAC4A#####wAAAAAAAACoAAAAKwD#####AAAAAAEQAAJPJwBACAAAAAAAAEAAAAAAAAAABQAAAAAQAAAAYAAAAAkAAABQAAAACwD#####Af8AAAAQAAABAAEAAACJAAAAawAAAAcA#####wAAAIkAAAAJAAAAkwAAAAcA#####wAAAIkAAAAJAAAArAAAAAcA#####wAAAIkAAAAJAAAAswAAAAcA#####wAAAIkAAAAJAAAAugAAAAcA#####wAAAIkAAAAJAAAAwQAAAAsA#####wAAAAAAEAAAAQEBAAAAEAAAAHT#####AAAAAQAQQ0Ryb2l0ZVBhcmFsbGVsZQD#####Af8AAAAQAAABAQEAAADNAAAA1AAAAAsA#####wH#AAAAEAAAAQEBAAAAEAAAAHIAAAAvAP####8B#wAAABAAAAEBAQAAAM0AAADWAAAABwD#####AAAAiQAAAAkAAACZAAAABwD#####AAAAiQAAAAkAAACfAAAABwD#####AAAAiQAAAAkAAACl#####wAAAAEACUNQb2x5Z29uZQD#####ANjY2AEBAAAABQAAAHYAAAByAAAAdAAAAHgAAAB2#####wAAAAEAEENTdXJmYWNlUG9seWdvbmUA#####wB#f38AAAAFAAAA2wAAAAcA#####wAAABAAAAABP#B64UeuFHsAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACKAAAA3QAAACMA#####wAAAAAAwDQAAAAAAADAJgAAAAAAAAAAAN4QAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAADI0dTAAAAFAD#####AAAA1AAAAFMAAAAVAP####8BAAAAABAAAUYAAAAAAAAAAABACAAAAAAAAAUAAQAAAOAAAAAVAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAA4AAAACsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAABAAAADhAAAAAT#gAAAAAAAAAAAABwD#####AAAAEAAAAAgDAAAAEAQAAAAJAAAAMQAAAAFAAAAAAAAAAAAAAAsA#####wAAAAAAEAAAAQEBAAAAEAAAAOMAAAASAP####8AAAAQAAAA4wAAAAoA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAM0AAADmAAAACwD#####AAAAAAAQAAABAQEAAADNAAAA5wAAAAsA#####wAAAAAAEAAAAQEBAAAAeAAAAHIAAAALAP####8AAAAAABAAAAEBAQAAAHYAAAB0AAAAFAD#####AAAAZQAAAFMAAAAVAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAA6wAAABUA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAADrAAAABwD#####AAAAEAAAAAgDAAAAEAAAAAAQBAAAAAkAAAAxAAAAAUAAAAAAAAAAAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA7AAAAO4AAAASAP####8AAAAQAAAA7wAAAAoA#####wEAAAAAEAAAAEAIAAAAAAAAAAAAAAAAAAAFAAAAAOMAAADwAAAACwD#####AAAAAAAQAAABAQEAAADvAAAAEAAAAAsA#####wAAAAAAEAAAAQEBAAAA4wAAAPEAAAALAP####8AAAAAABAAAAEBAQAAAPEAAADvAAAAMAD#####AAAAAAEBAAAABQAAAO8AAAAQAAAA4wAAAPEAAADvAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAzQAAAPAAAAASAP####8AAADNAAAA9gAAAAoA#####wEAAAAAEAAAAEAIAAAAAAAAAAAAAAAAAAAFAAAAAOcAAAD3AAAACwD#####AAAAAAAQAAABAQEAAAD2AAAAzQAAAAsA#####wAAAAAAEAAAAQEBAAAA5wAAAPgAAAALAP####8AAAAAABAAAAEBAQAAAPgAAAD2AAAAMAD#####AAAAAAEBAAAABQAAAPYAAADNAAAA5wAAAPgAAAD2AAAABwD#####AAAAiQAAAAgDAAAACQAAAE8AAAAJAAAATgAAAAoA#####wEAAAAAEAACQycAQCQAAAAAAADAMAAAAAAAAAUAAAAAdAAAAP0AAAAHAP####8AAACJAAAACAMAAAAJAAAATwAAAAkAAABOAAAACgD#####AQAAAAAQAAJCJwBAJAAAAAAAAMAAAAAAAAAABQAAAAByAAAA#wAAAAoA#####wEAAAAAEAACQScAwDgAAAAAAAC#8AAAAAAAAAUAAAAAdgAAAP8AAAAKAP####8BAAAAABAAAkQnAMA6AAAAAAAAwCYAAAAAAAAFAAAAAHgAAAD#AAAAMAD#####AAAAAAEBAAAABQAAAQEAAAEAAAAA#gAAAQIAAAEBAAAAMQD#####AP8AAAAAAAUAAAEDAAAACwD#####AP8AAAAQAAABAQEAAAEBAAAA#gAAAAsA#####wD#AAAAEAAAAQEBAAABAgAAAQAAAAAKAP####8B#wAAABAAAkEyAAAAAAAAAAAAQAgAAAAAAAAFAAAAAQEAAADQAAAACgD#####Af8AAAAQAAJCMgAAAAAAAAAAAEAIAAAAAAAABQAAAAEAAAAA0AAAAAsA#####wD#AAAAEAAAAQACAAABBwAAAQgAAAAKAP####8B#wAAABAAAkIzAAAAAAAAAAAAQAgAAAAAAAAFAAAAAQAAAADRAAAACgD#####Af8AAAAQAAJDMwAAAAAAAAAAAEAIAAAAAAAABQAAAAD+AAAA0QAAAAsA#####wD#AAAAEAAAAQACAAABCgAAAQsAAAAKAP####8B#wAAABAAAkM0AAAAAAAAAAAAQAgAAAAAAAAFAAAAAP4AAADSAAAACgD#####Af8AAAAQAAJENAAAAAAAAAAAAEAIAAAAAAAABQAAAAECAAAA0gAAAAsA#####wD#AAAAEAAAAQACAAABDQAAAQ4AAAAKAP####8B#wAAABAAAkQzAAAAAAAAAAAAQAgAAAAAAAAFAAAAAQIAAADTAAAACgD#####Af8AAAAQAAJBMwAAAAAAAAAAAEAIAAAAAAAABQAAAAEBAAAA0wAAAAsA#####wD#AAAAEAAAAQACAAABEAAAAREAAAArAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAQAAAAdgAAAAE#8ZmZmZmZmgAAACsA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAABAAAAB0AAAAAT#xmZmZmZmaAAAAKwD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAEAAAAHIAAAABP#GZmZmZmZoAAAArAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAQAAAAeAAAAAE#8ZmZmZmZmgAAACMA#####wAAAAAAwBgAAAAAAADAIgAAAAAAAAAAARMQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAABQQAAACMA#####wAAAAAAwBgAAAAAAADAHAAAAAAAAAAAARUQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAABQgAAACMA#####wAAAAAAwBwAAAAAAADAIAAAAAAAAAAAARQQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAABQwAAACMA#####wAAAAAAwBgAAAAAAADAJAAAAAAAAAAAARYQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAABRAAAACsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAM0AAAEBAAAAAT#0zMzMzMzNAAAAKwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAzQAAAQAAAAABP#TMzMzMzM0AAAArAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADNAAABAgAAAAE#9MzMzMzMzQAAACsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAM0AAAD+AAAAAT#0zMzMzMzNAAAAIwD#####AAAAAADAFAAAAAAAAMAmAAAAAAAAAAABGxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAJBJwAAACMA#####wAAAAAAwAgAAAAAAADAIAAAAAAAAAAAARwQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAACQicAAAAjAP####8AAAAAAMAYAAAAAAAAwCAAAAAAAAAAAAEeEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAkMnAAAAIwD#####AAAAAADAHAAAAAAAAMAiAAAAAAAAAAABHRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAJEJwAAACsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAIkAAADNAAAAAT#zMzMzMzMzAAAADgD#####AAAAzQAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAOcAAAEkAAAAEgD#####AAAAzQAAASMAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAElAAABJgAAACMA#####wAAAAAAwAgAAAAAAADAKgAAAAAAAAAAAScQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAEI0dPJwAAAA4A#####wAAABAAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADjAAABKQAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAASoAAAEmAAAAIwD#####AAAAAADAEAAAAAAAAMAxAAAAAAAAAAABKxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAMjR0######AAAAAQAHQ01pbGlldQD#####AQAAAAAPAAFHAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHQAAAByAAAAKwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAEAAAAS0AAAABP#MzMzMzMzMAAAANAP####8AAAAAAQAAAS4SAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAACAAAADwAAADIA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAM0AAACJAAAAMgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAEAAAAM0AAAANAP####8AAAAAAMAqAAAAAAAAwCIAAAAAAAAAAAExEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAFAAAAANAP####8AAAAAAMAmAAAAAAAAwBgAAAAAAAAAAAEwEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAE8AAAALAP####8AAAAAABAAAAEBAQAAABAAAACKAAAAUf##########"
					if (!sortie_html) texte = `\\begin{minipage}{0.65 \\linewidth} \n\t`
					else texte=``
					texte += `SABCD est une pyramide à base carrée de hauteur SO${sp()}=${sp()}${tex_nombre(h1)}${sp()}cm et de côté de base ${tex_nombre(c)}${sp()}cm.<br>`
					texte += ` Le point O' est situé sur la hauteur [SO] à ${h2}${sp()}cm de S.`
					texte += `<br>Un plan parallèle à la face ABCD passant par O' coupe la pyramide en formant la section A'B'C'D'.<br>`
					if (!sortie_html) texte +=`La figure n'est pas en vraie grandeur.<br>`
					texte += num_alpha(0) + ` Calculer l'` + katex_Popup2(numero_de_l_exercice + i * 4, 1, "aire de base de la pyramide", `Formule : Aire d'un carré de côté c`, `$Aire=\\text{c}$${exposant(2)}`) + `.<br>`
					texte += num_alpha(1) + ` Calculer le ` + katex_Popup2(numero_de_l_exercice + i * 4 + 1, 1, "volume de la pyramide", `Formule : volume d'une pyramide d'aire de base $B$ et de hauteur h`, `$Volume= \\dfrac{B \\times \\text{h}}{3}$`) + ` SABCD.<br>`
					texte += num_alpha(2) + ` En déduire l'aire de la ` + katex_Popup2(numero_de_l_exercice + i * 4 + 2, 1, "section", `Définition : section plane d'un solide`, `La section d'un solide par un plan est une figure plane.<br>Dans le cas d'une section d'une pyramide par un plan parallèle à sa base, cette section est un polygone qui est une réduction de la base.<br>Dans une réduction de coefficient k, les aires sont multipliées par k${exposant(2)} et les volumes sont multipliés par k${exposant(3)}.`) + ` A'B'C'D' sachant que SO'${sp()}=${sp()}${h2}${sp()}cm.<br>`
					texte += num_alpha(3) + ` Calculer le volume de la pyramide SA'B'C'D'.<br>`
					texte += num_alpha(4) + ` Calculer le volume du tronc de la pyramide (partie de la pyramide située entre la base et la section).`
					if (sortie_html) texte += `<br>Le point O peut être déplacé et on peut changer l'angle de vue &#x3C6; `
					else texte+=`\n\t \\end{minipage} \n\t \\begin{minipage}{0.35 \\linewidth} \n\t \\begin{tikzpicture}[scale=0.8] \n\t
					\\definecolor{hhhhhh}{rgb}{0,0,0}
					\\definecolor{phphph}{rgb}{0.5,0.5,0.5}
					\\definecolor{dpdpdp}{rgb}{0.85,0.85,0.85}
					\\definecolor{ofofof}{rgb}{0.5,0.5,0.5}
					\\definecolor{ffhhhh}{rgb}{1,0,0}
					\\clip (9.38,0) rectangle (0,14.47);
					\\fill[color=black] (4.578,2.328) circle (0.063);
					\\draw [color=black , dotted, line width = 0.4](6.773,0.916)--(8.236,3.174);
					\\draw [color=black , dotted, line width = 0.4](8.236,3.174)--(2.384,3.739);
					\\draw [color=black , dotted, line width = 0.4](2.384,3.739)--(0.921,1.481);
					\\draw [color=black , dotted, line width = 0.4](0.921,1.481)--(6.773,0.916);
					\\draw [color=black , dotted, line width = 0.4](4.578,13.458)--(0.921,1.481);
					\\draw [color=black , dotted, line width = 0.4](4.578,13.458)--(6.773,0.916);
					\\draw [color=black , dotted, line width = 0.4](4.578,13.458)--(8.236,3.174);
					\\draw [color=black , dotted, line width = 0.4](4.578,13.458)--(2.384,3.739);
					\\draw [color=black , line width = 0.8](0.921,1.481)--(6.773,0.916);
					\\draw [color=black , line width = 0.8](6.773,0.916)--(8.236,3.174);
					\\draw [color=black , line width = 0.8](4.578,13.458)--(0.921,1.481);
					\\draw [color=black , line width = 0.8](4.578,13.458)--(6.773,0.916);
					\\draw [color=black , line width = 0.8](4.578,13.458)--(8.236,3.174);
					\\fill[color=black] (4.578,6.501) circle (0.063);
					\\draw [color=black , dotted, line width = 0.4](4.578,2.328)--(8.236,3.174);
					\\draw [color=dpdpdp , dotted, line width = 0.4](0.921,1.481)--(6.773,0.916)--(8.236,3.174)--(2.384,3.739)--(0.921,1.481)--cycle;
					\\fill [color = ofofof, opacity = 0.2](0.921,1.481)--(6.773,0.916)--(8.236,3.174)--(2.384,3.739)--(0.921,1.481)--cycle;
					\\node at (3.891, 14.198) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {\\textbf{S}};
					\\draw [color=black , dotted, line width = 0.4](4.578,2.328)--(5.065,2.44);
					\\fill[color=black] (5.065,6.614) circle (0.063);
					\\draw [color=black , dotted, line width = 0.4](4.578,6.501)--(5.065,6.614);
					\\draw [color=black , dotted, line width = 0.4](2.384,3.739)--(6.773,0.916);
					\\draw [color=black , dotted, line width = 0.4](0.921,1.481)--(8.236,3.174);
					\\draw [color=black , dotted, line width = 0.4](4.578,2.789)--(4.578,2.328);
					\\draw [color=black , dotted, line width = 0.4](5.065,2.44)--(5.065,2.902);
					\\draw [color=black , dotted, line width = 0.4](5.065,2.902)--(4.578,2.789);
					\\draw [color=black , dotted, line width = 0.4](4.578,2.789)--(4.578,2.328)--(5.065,2.44)--(5.065,2.902)--(4.578,2.789)--cycle;
					\\draw [color=black , dotted, line width = 0.4](4.578,6.963)--(4.578,6.501);
					\\draw [color=black , dotted, line width = 0.4](5.065,6.614)--(5.065,7.075);
					\\draw [color=black , dotted, line width = 0.4](5.065,7.075)--(4.578,6.963);
					\\draw [color=black , dotted, line width = 0.4](4.578,6.963)--(4.578,6.501)--(5.065,6.614)--(5.065,7.075)--(4.578,6.963)--cycle;
					\\draw [color=black , dotted, line width = 0.4](2.292,5.972)--(5.95,5.619)--(6.864,7.031)--(3.207,7.383)--(2.292,5.972)--cycle;
					\\fill [color = ffhhhh, opacity = 0.2](2.292,5.972)--(5.95,5.619)--(6.864,7.031)--(3.207,7.383)--(2.292,5.972)--cycle;
					\\draw [color=ffhhhh , dotted, line width = 0.4](2.292,5.972)--(6.864,7.031);
					\\draw [color=ffhhhh , dotted, line width = 0.4](3.207,7.383)--(5.95,5.619);
					\\draw [color=ffhhhh , line width = 0.8](2.292,5.972)--(5.95,5.619);
					\\draw [color=ffhhhh , line width = 0.8](5.95,5.619)--(6.864,7.031);
					\\node at (0.305, 1.74) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {A};
					\\node at (6.742, 1.057) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {B};
					\\node at (8.32, 3.571) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {C};
					\\node at (1.914, 4.255) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {D};
					\\node at (1.544, 6.407) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {A'};
					\\node at (6.205, 5.667) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {B'};
					\\node at (7.112, 7.564) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {C'};
					\\node at (2.201, 7.992) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {D'};
					\\node at (3.935, 5.466) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {\\textbf{O'}};
					\\node at (4.247, 2.292) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {\\textbf{O}};
					\\draw [color=black , dotted, line width = 0.4](4.578,2.328)--(4.578,13.458);
					\\end{tikzpicture} \n\t \\end{minipage}`
					texte_corr = num_alpha(0) + ` L'aire de base de la pyramide est : $${tex_nombre(c)}^2$ cm${exposant(2)} $= ${tex_nombrec(c * c)}$ cm${exposant(2)}.<br>`
					texte_corr += num_alpha(1) + ` Le volume de la pyramide est : $\\dfrac{A_\\text{base} \\times \\text{hauteur}}{3}$ cm${exposant(3)} $= \\dfrac{${tex_nombrec(c * c)}\\times ${tex_nombre(h1)}}{3}$ cm${exposant(3)} $\\approx ${tex_nombrec(arrondi(c * c * h1 / 3))}$ cm${exposant(3)}.<br>`
					texte_corr += num_alpha(2) + ` La section est une réduction de la base de coefficient $\\dfrac{${h2}}{${tex_nombre(h1)}}`
					if (!Number.isInteger(h1) || pgcd(h2, h1) > 1) texte_corr += `=${tex_fraction_reduite(h2 * 10, h1 * 10)}$.<br>`
					else texte_corr += `.$<br>`
					texte_corr += `Dans une réduction de coefficient k, les aires sont multipliés par k${exposant(2)}.<br>`
					texte_corr += `Donc son aire est $\\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^2 \\times ${tex_nombre(c * c)}$ cm${exposant(2)} $=${tex_fraction_reduite(arrondi(h2 * h2 * 100 * c * c), arrondi(h1 * h1 * 100))}$ cm${exposant(2)} $\\approx ${tex_nombrec(arrondi(h2 * h2 * c * c / h1 / h1, 2))}$ cm${exposant(2)}.<br>`
					texte_corr += num_alpha(3) + ` Dans une réduction de coefficient k, les volumes sont multipliés par k ${exposant(3)}.<br>`
					texte_corr += `Donc le volume de la pyramide SA'B'C'D' est : $\\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^3 \\times \\dfrac{${tex_nombrec(c * c * h1)}}{3}$ cm${exposant(3)} $\\approx ${tex_nombrec(arrondi(h2 ** 3 * c * c / h1 ** 2 / 3))}$ cm${exposant(3)}.<br>`
					texte_corr += num_alpha(4) + ` Le volume du tronc de la pyramide est : `
					texte_corr += `$V_\\text{SABCD} - V_\\text{SA'B'C'D'}$<br>Soit : <br>$${tex_nombrec(arrondi(c * c * h1 / 3))}$ cm${exposant(3)}$ - ${tex_nombrec(arrondi(h2 ** 3 * c * c / h1 ** 2 / 3))}$ cm${exposant(3)}$ \\approx ${tex_nombrec(arrondi(c * c * h1 / 3 - h2 ** 3 * c * c / h1 ** 2 / 3, 2))}$ cm${exposant(3)}.<br>`
					texte_corr += `Ce qui représente $${tex_fraction_reduite((h1 ** 3 - h2 ** 3) * 1000, (h1 ** 3) * 1000)}$ du volume de SABCD.`

					this.MG32codeBase64 = codeBase64
					this.MG32code_pour_modifier_la_figure = `
							mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c", "${c}");
							mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h1", "${h1}");
							mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h2", "${h2}");
							mtg32App.calculate("MG32svg${numero_de_l_exercice}");
							mtg32App.display("MG32svg${numero_de_l_exercice}");
							`
					break;
				case 2: // calcul de l'aire de base, du volume d'un cône. puis, calcul de la section, du volume du cône réduit et du volume du tronc
					r = calcul(randint(12, 35) / 10)
					h1 = calcul(randint(12, 20) / 2)
					h2 = randint(3, Math.floor(h1) - 1)
					if (this.sup2<3)
					if (this.sup2==1) // coefficient de réduction décimal
						while (calcul(h2/h1)!=arrondi(h2/h1,1)) {
							r = calcul(randint(12, 35) / 10)
							h1 = calcul(randint(12, 20) / 2)
							h2 = randint(3, Math.floor(h1) - 1)
						}
					else //coefficient de réduction rationnel
						while (calcul(h2/h1)==arrondi(h2/h1,1)) {
							r = calcul(randint(12, 35) / 10)
							h1 = calcul(randint(12, 20) / 2)
							h2 = randint(3, Math.floor(h1) - 1)
						}	
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAANmcmH###8BAP8BAAAAAAAAAAAFHAAAAtIAAAAAAAAAAAAAAAAAAAET#####wAAAAEACkNDYWxjQ29uc3QA#####wACcGkAFjMuMTQxNTkyNjUzNTg5NzkzMjM4NDb#####AAAAAQAKQ0NvbnN0YW50ZUAJIftURC0Y#####wAAAAEAD0NWYXJpYWJsZUJvcm5lZQD#####AANhbmc#6SH7VEQtGAAAAAAAAAAAQBkh+1RELRg#qZmZmZmZmgAAATAABDIqcGkABDAuMDX#####AAAAAQAKQ1BvaW50QmFzZQD#####AQAAAAAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAUB#eAAAAAAAQHqoUeuFHrj#####AAAAAQAHQ0NhbGN1bAD#####AAVtaW5pMQADMC4yAAAAAT#JmZmZmZmaAAAABAD#####AAVtYXhpMQABMgAAAAFAAAAAAAAAAP####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####AAdDdXJzZXVyAAAABQAAAAUAAAADAAAAAwAAAAQAAAAC#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAAAAAAUBAAAAABAAAAEAAQAAAAIBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAQAAAAUBAAAAABAAAADACAAAAAAAAD#wAAAAAAAABQABQEuAAAAAAAAAAAAG#####wAAAAEAC0NIb21vdGhldGllAAAAAAUAAAAC#####wAAAAEACkNPcGVyYXRpb24D#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAMAAAAJAQAAAAoAAAADAAAACgAAAAT#####AAAAAQALQ1BvaW50SW1hZ2UAAAAABQEAAAAADQACTzEAwBAAAAAAAABAEAAAAAAAAAUAAAAABwAAAAgAAAAIAAAAAAUAAAACAAAACQMAAAAJAQAAAAE#8AAAAAAAAAAAAAoAAAADAAAACQEAAAAKAAAABAAAAAoAAAADAAAACwAAAAAFAQAAAAANAAJJNQDAAAAAAAAAAEAIAAAAAAAABQAAAAAHAAAACv####8AAAABAAhDU2VnbWVudAEAAAAFAQAAAAAQAAABAQEAAAACAAAABwAAAAcBAAAABQEAAAABEAACazEAwAAAAAAAAABAAAAAAAAAAAEAAT#ZmZmZmZmaAAAADP####8AAAACAA9DTWVzdXJlQWJzY2lzc2UBAAAABQAEem9vbQAAAAkAAAALAAAADf####8AAAABAA9DVmFsZXVyQWZmaWNoZWUBAAAABQEAAAAAAAAAAAAAAADAGAAAAAAAAAAAAA0PAAH###8AAAABAAAAAgAAAAEAAAAAAAAAAAAAAAACAAAADgAAAAMA#####wH#AAAAEAABWgAAAAAAAAAAAEAIAAAAAAAABQABQHmoAAAAAABAd2hR64UeuAAAAAgA#####wAAABAAAAAKAAAADgAAAAYA#####wH#AAABEAAAAQEBAAAAEAA#8AAAAAAAAAAAAAcA#####wH#AAAAEAABTQAAAAAAAAAAAEAIAAAAAAAABQABwEgAAAAAAAAAAAASAAAACwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAEwAAABEAAAADAP####8BAAAAAQ8AAk8yAQUAAUCA3AAAAAAAQICEKPXCj1wAAAAGAP####8BAAAAARAAAAEAAQAAABUAP#AAAAAAAAAAAAAHAP####8BAAAAAQ8AAkoyAQUAAMBAAAAAAAAAAAAAFv####8AAAABAAlDTG9uZ3VldXIA#####wAAABUAAAAXAAAAAwD#####AAAAAAAPAAFPAMAyAAAAAAAAwCgAAAAAAAAFAAFAYnAAAAAAAEB4mFHrhR64AAAABgD#####AQAAAAAQAAABAAEAAAAZAUAD6BRQ79ycAAAABwD#####Af8AAAAQAAJJIgAAAAAAAAAAAEAIAAAAAAAABQABQDF7TwMpFiAAAAAaAAAABAD#####AAJoMQACMTAAAAABQCQAAAAAAAAAAAAEAP####8AAmgyAAE0AAAAAUAQAAAAAAAAAAAABAD#####AAFyAAMzLjUAAAABQAwAAAAAAAD#####AAAAAQARQ1N5bWV0cmllQ2VudHJhbGUA#####wAAABUAAAADAP####8BAAAAAQ8AAk8zAQUAAUCSQgAAAAAAQHe4UeuFHrcAAAAGAP####8BAAAAABAAAAEAAQAAACABQAPoFFDv3JwAAAADAP####8BAAAAAQsAAk80AQUAAUCSVgAAAAAAQH5YUeuFHrgAAAAGAP####8BAAAAABAAAAEAAQAAACIBQAPoFFDv3JwAAAAQAP####8AAAAZAAAACwD#####AQB#AAALAAJXNADANQAAAAAAAMAUAAAAAAAABQAAAAAXAAAAH#####8AAAABAAxDVHJhbnNsYXRpb24A#####wAAABUAAAAXAAAACwD#####AQAAAAALAAJXNwBAAAAAAAAAAAAAAAAAAAAABQAAAAAgAAAAJv####8AAAABAAlDQ2VyY2xlT0EA#####wF#f38BAQAAACAAAAAn#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAACEAAAAo#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADQACSTMBBQABAAAAKf####8AAAABAA9DUG9pbnRMaWVDZXJjbGUA#####wEAAAABCwACSzMBAQABQBX9VSbZZwcAAAAo#####wAAAAIAE0NNZXN1cmVBbmdsZU9yaWVudGUA#####wAIYW5ndGhldGEAAAAqAAAAIAAAACsAAAAEAP####8ABXRoZXRhAAhhbmd0aGV0YQAAAAoAAAAsAAAABAD#####AAN4JzEACnNpbih0aGV0YSn#####AAAAAgAJQ0ZvbmN0aW9uAwAAAAoAAAAtAAAABAD#####AAN4JzIACmNvcyh0aGV0YSkAAAAXBAAAAAoAAAAtAAAAFQD#####AQAAAAALAAJXMQDAAAAAAAAAAEAAAAAAAAAABQABQBNc46k8Cu8AAAAoAAAAFgD#####AAVhbmdsZQAAACoAAAAgAAAAMP####8AAAABABJDQXJjRGVDZXJjbGVEaXJlY3QA#####wF#f38BAQAAABUAAAAXAAAAJQAAABUA#####wEAAAABCwACSzIBAQABP8B#LK14eQYAAAAyAAAAFgD#####AAZhbmdwaGkAAAAXAAAAFQAAADMAAAAEAP####8AA3BoaQAGYW5ncGhpAAAACgAAADQAAAAEAP####8AA3knMQAULWNvcyh0aGV0YSkqc2luKHBoaSkAAAAJAQAAAAEAAAAAAAAAAAAAAAkCAAAAFwQAAAAKAAAALQAAABcDAAAACgAAADUAAAAEAP####8AA3knMgATc2luKHRoZXRhKSpzaW4ocGhpKQAAAAkCAAAAFwMAAAAKAAAALQAAABcDAAAACgAAADX#####AAAAAQAXQ01lc3VyZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAABcAAAAVAAAAJQAAAAQA#####wAEcGxhdAAGSjJPMlc0AAAACgAAADgAAAAEAP####8ABWRyb2l0AAZwbGF0LzIAAAAJAwAAAAoAAAA5AAAAAUAAAAAAAAAAAAAADAD#####AQAAAAAQAAABAAEAAAAVAAAAFwAAAAwA#####wEAAAAAEAAAAQABAAAAIAAAACoAAAAMAP####8BAAAAABAAAAEAAQAAACAAAAAr#####wAAAAIAE0NNYXJxdWVBbmdsZU9yaWVudGUA#####wF#AAAAAgAAAABAOLK7zEtlnQAAACoAAAAgAAAAKwH#####AAAAAQAMQ0Jpc3NlY3RyaWNlAP####8BfwAAABAAAAEBAQAAACoAAAAgAAAAKwAAAAcA#####wF#AAAAEAAAAQUAAUB5tgoLjWTlAAAAP#####8AAAACAAZDTGF0ZXgA#####wF#AAAAwBQAAAAAAADAJgAAAAAAAAAAAEARAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKXHZhcnRoZXRhIAAAAAwA#####wEAAAAAEAAAAQABAAAAFQAAADMAAAAIAP####8AAAAiAAAAFwQAAAAKAAAANQAAABoA#####wEAAP8AAgAAAABAN1LlDbOjogAAABcAAAAVAAAAMwEAAAAbAP####8BAAD#ABAAAAEBAQAAABcAAAAVAAAAMwAAAAcA#####wEAAP8AEAAAAQUAAUB3uGBZxKE1AAAARQAAABwA#####wEAAP8AAAAAAAAAAADAFAAAAAAAAAAAAEYRAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAHXHZhcnBoaQAAAAQA#####wABawAIc2luKHBoaSkAAAAXAwAAAAoAAAA1AAAABAD#####AAp0ZXN0UGhpTnVsACcxLygocGhpPTApKyhhYnMocGhpLXBsYXQpPDAuMDAwMDAwMDAxKSkAAAAJAwAAAAE#8AAAAAAAAAAAAAkAAAAACQgAAAAKAAAANQAAAAEAAAAAAAAAAAAAAAkEAAAAFwAAAAAJAQAAAAoAAAA1AAAACgAAADkAAAABPhEuC+gm1pUAAAAIAP####8AAAAZAAAACgAAAEkAAAAGAP####8BAAAAARAAAAEAAQAAACIAP#AAAAAAAAAAAAAHAP####8BAAAAAQsAAko0AQUAAcBLgAAAAAAAAAAASwAAABIA#####wFmZmYAAQAAACIAAABMAAAAFQD#####AQAAAAAQAAABBQABP#CX6bp5AmEAAABNAAAABgD#####AQAAAAAQAAABAAEAAABOAEAD6BRQ79yc#####wAAAAEAEENJbnREcm9pdGVEcm9pdGUA#####wEAAAAAEAAAAQUAAAAAIwAAAE8AAAATAP####8AAAAjAAAATQAAABQA#####wEAAAAADQACSTQBBQABAAAAUf####8AAAACAAdDUmVwZXJlAP####8AAAAAAQEAAAAiAAAAUgAAAEwAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAALAP####8BAAAAABAAAAEFAAAAAEwAAABDAAAACAD#####AAAAUAAAABcEAAAACgAAADUAAAALAP####8BAAAAABAAAAEFAAAAAE4AAABV#####wAAAAIADUNMaWV1RGVQb2ludHMA#####wEAf38BAQAAAFYAAABkAAAAAABOAAAABQAAAE4AAABPAAAAUAAAAFUAAABW#####wAAAAEACENWZWN0ZXVyAP####8BAAD#ABAAAAEAAQAAACIAAABUAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABAAAAEFAAAAAFMAAAAKAAAALgAAAAoAAAA2AAAAIQD#####AQAAAAAQAAABBQAAAABTAAAACgAAAC8AAAAKAAAANwAAACAA#####wH#AAAAEAAAAQABAAAAIgAAAFkAAAAAIAD#####AQB#AAAQAAABAAEAAAAiAAAAWgAAAAAfAP####8BZmZmAQEAAABZAAAAZAAAAAAAKwAAAAYAAAArAAAALAAAAC0AAAAuAAAANgAAAFn#####AAAAAQAMQ1N1cmZhY2VMaWV1AP####8Bf39#AAAABQAAAF0AAAAiAP####8Bf39#AAAABQAAAFcAAAASAP####8B#wAAAQEAAAAZAAAAG#####8AAAABAA1DRGVtaURyb2l0ZU9BAP####8B#wAAAA0AAAEBAQAAABAAAAAT#####wAAAAEADkNQb2ludExpZVBvaW50AP####8B#wAAABAAAVUAQCAAAAAAAADAKgAAAAAAAAUAAAAAFAAAAA0A#####wABdQAAABAAAAATAAAAYv####8AAAABABFDUG9pbnRQYXJBYnNjaXNzZQD#####Af8AAAAQAAJJMgAAAAAAAAAAAEAIAAAAAAAABQAAAAAZAAAAGwAAAAoAAABjAAAAJAD#####AQAAAAALAAJJMQDAEAAAAAAAAEAQAAAAAAAABQAAAABk#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAANAAABAAEAAAAZAAAAZf####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAABkAAABmAAAAEgD#####AQAAAAABAAAAGQAAAGUAAAATAP####8AAABnAAAAaAAAABQA#####wEAAAAACwACSjEAwCgAAAAAAADAEAAAAAAAAAUAAgAAAGkAAAAeAP####8AgICAAQEAAAAZAAAAZQAAAGoAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAAhAP####8BAAAAAA8AAUkAP#AAAAAAAABAEAAAAAAAAAUAAAAAawAAAAoAAAAuAAAACgAAADYAAAAhAP####8BAAAAAA8AAUoBBQAAAABrAAAACgAAAC8AAAAKAAAANwAAACMA#####wEAAAAADQAAAQEBAAAAGQAAAGwAAAAhAP####8BAAAAAA8AAUsAQBAAAAAAAADALgAAAAAAAAUAAAAAawAAAAEAAAAAAAAAAAAAABcEAAAACgAAADUAAAAjAP####8BAAAAAA0AAAEBAQAAABkAAABvAAAAIwD#####AQAAAAANAAABAQEAAAAZAAAAbQAAACAA#####wH#AAAAEAAAAQABAAAAGQAAAGwAAAAAIAD#####AQB#AAAQAAABAAEAAAAZAAAAbQAAAAAgAP####8BAAD#ABAAAAEAAQAAABkAAABvAP####8AAAABAA9DU3ltZXRyaWVBeGlhbGUA#####wAAAHD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wEAAP8B#####w1AfcAAAAAAAECCQAAAAAAAAgHMzP8AAAAAAAAAAAAAAAEAAAAAAAAAAAATKE8sSSxKLEspIGludmlzaWJsZQAAAAAACQAAAHEAAABuAAAAcAAAAHIAAABzAAAAdAAAAG0AAABsAAAAb#####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8BAAD#Af####8NQH5wAAAAAABAgxgAAAAAAAIBzMz#AAAAAAAAAAAAAAABAAAAAAAAAAAAEShPLEksSixLKSB2aXNpYmxlAAAAAAAJAAAAcQAAAG4AAABwAAAAcgAAAHMAAAB0AAAAbQAAAGwAAABvAAAAAB4A#####wCAgIABAQAAABkAAABsAAAAbQAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAACEA#####wHY2NgAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAGsAAAAKAAAAHgAAAAEAAAAAAAAAAAAAACEA#####wEAAAAAEAABQgAAAAAAAAAAAEAIAAAAAAAABQAAAAB4AAAACgAAAB4AAAABAAAAAAAAAAAAAAAkAP####8BAAAAAA8AAUEBBQAAAAB6AAAADQD#####AARhYnMxAAAAGQAAAGwAAAB7AAAABAD#####AANSYXkABGFiczEAAAAKAAAAfAAAACUA#####wEAAAAAEAAAAQUAAAAAGQAAAGwAAAAJAgAAAAoAAAB9AAAAFwQAAAAKAAAAMQAAACUA#####wEAAAAAEAAAAQUAAAAAGQAAAG0AAAAJAgAAAAoAAAB9AAAAFwMAAAAKAAAAMQAAABEA#####wAAABkAAAB+AAAACwD#####AQAAAAAQAAABBQAAAAB#AAAAgAAAAB8A#####wB#f38BAQAAAIEAAAB4AQAAAAAwAAAABgAAADAAAAAxAAAAfgAAAH8AAACAAAAAgQAAACIA#####wD##wAAAAAFAAAAggAAACEA#####wEAAAAAEAAAAQUAAAAAawAAAAEAAAAAAAAAAAAAAAkBAAAAAQAAAAAAAAAAAAAACgAAAH0AAAASAP####8BAAAAAQEAAAAZAAAAhAAAABMA#####wAAAHEAAACFAAAAFAD#####AQAAAAAQAAABBQABAAAAhgAAAAsA#####wH#AP8AEAAAAQUAAAAAhwAAAEoAAAALAP####8B#wD#ABAAAAEFAAAAAIgAAAAkAAAADAD#####AQAAAAAQAAABAAIAAACIAAAAiQAAAAcA#####wEAAAAAEAAAAQUAAT+0tjyl3q+#AAAAiv####8AAAABAA5DT2JqZXREdXBsaXF1ZQD#####AAAAAAAAAIoAAAANAP####8AAWEAAAAZAAAAbAAAAHsAAAAhAP####8BZmZmABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAB4AAAACQIAAAAKAAAAjQAAABcEAAAACgAAAAEAAAAJAgAAAAoAAACNAAAAFwMAAAAKAAAAAQAAAB4A#####wDm5uYAAQAAABkAAABsAAAAbwAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAACEA#####wEAAAAAEAACUyIAwDkAAAAAAADALgAAAAAAAAUAAAAAjwAAAAEAAAAAAAAAAAAAAAoAAAAcAAAAJAD#####AQAAAAAPAAFTAMBEgAAAAAAAwCIAAAAAAAAFAAAAAJAAAAANAP####8ABWFiczExAAAAGQAAAGoAAACRAAAABAD#####AAFzAAVhYnMxMQAAAAoAAACSAAAAKwD#####AAAAAAAAAJH#####AAAAAQAOQ1Rlc3RFeGlzdGVuY2UA#####wAIRXhpc3REZXMAAACSAAAABAD#####AAp0ZXN0U0VnYWxPAA4xLygxLUV4aXN0RGVzKQAAAAkDAAAAAT#wAAAAAAAAAAAACQEAAAABP#AAAAAAAAAAAAAKAAAAlQAAAAgA#####wAAABkAAAAKAAAAlgAAAAQA#####wADeScwAAtrXjIqUmF5XjIvcwAAAAkDAAAACQL#####AAAAAQAKQ1B1aXNzYW5jZQAAAAoAAABIAAAAAUAAAAAAAAAAAAAALQAAAAoAAAB9AAAAAUAAAAAAAAAAAAAACgAAAJMAAAAEAP####8AA3gnMAAUcmFjKFJheV4yLXknMF4yL2teMikAAAAXEgAAAAkBAAAALQAAAAoAAAB9AAAAAUAAAAAAAAAAAAAACQMAAAAtAAAACgAAAJgAAAABQAAAAAAAAAAAAAAtAAAACgAAAEgAAAABQAAAAAAAAAAAAAAhAP####8B#wAAABAAAAEFAAAAAGsAAAAKAAAAmQAAAAoAAACYAAAACwD#####Af8AAAAQAAABBQAAAACaAAAAdQAAAAYA#####wEAAAAAEAAAAQEBAAAAmgA#8zMzMzMzMwAAAAYA#####wEAAAAAEAAAAQEBAAAAmwA#8zMzMzMzMwAAABMA#####wAAAJ0AAACFAAAAFAD#####AQAAAAAQAAABBQACAAAAngAAABMA#####wAAAJwAAACFAAAAFAD#####AQAAAAAQAAABBQACAAAAoAAAABgA#####wEAAAABAQAAABkAAACfAAAAoQAAABUA#####wEAAAAACwACVzMAwCQAAAAAAABAGAAAAAAAAAUAAT#T+ibKoaWlAAAAov####8AAAABAA1DUG9pbnRQcm9qZXRlAP####8BAAAAAAsAAlcyAMAuAAAAAAAAQBQAAAAAAAAFAAAAAKMAAABmAAAAJQD#####AQAAAAALAAJXNQDAIAAAAAAAAEAgAAAAAAAABQAAAACkAAAAo#####8AAAABAA1DRm9uY3Rpb24zVmFyAAAAAAkCAAAACQcAAAAKAAAANQAAAAEAAAAAAAAAAAAAAAkGAAAACgAAADUAAAAKAAAAOgAAAAoAAABIAAAACQEAAAABAAAAAAAAAAAAAAAKAAAASAAAAAQA#####wAIdGVzdFNpbnQAFjEvKGFicyhzKTw9YWJzKGspKlJheSkAAAAJAwAAAAE#8AAAAAAAAAAAAAkGAAAAFwAAAAAKAAAAkwAAAAkCAAAAFwAAAAAKAAAASAAAAAoAAAB9AAAADAD#####AAAAAAAQAAABAAIAAACRAAAAmgAAAAwA#####wAAAAAAEAAAAQACAAAAkQAAAJsAAAAMAP####8Bf39#ABAAAAEAAQAAAJEAAAClAAAABwD#####AQAAAAALAAJXNgEFAAE#6TBqC7jF5AAAAKkAAAAfAP####8Bf39#AAEAAACqAAAAUAAAAAAAowAAAAUAAACjAAAApAAAAKUAAACpAAAAqv####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUA#####wDY2NgAAACrAAAAAUAkAAAAAAAAAAAAqgAAAAIAAACqAAAAqwAAAB8A#####wEAAAAAAgAAAKUAAAB4AAAAAACjAAAAAwAAAKMAAACkAAAApQAAAAgA#####wAAABkAAAAKAAAApgAAAAsA#####wH#AP8AEAAAAQUAAAAAkQAAAK4AAAAMAP####8Bf39#ABAAAAEAAQAAAK8AAACBAAAAMAD#####AH9#fwAAALAAAAABQDUAAAAAAAAAAAAwAAAABwAAADAAAAAxAAAAfgAAAH8AAACAAAAAgQAAALAAAAAHAP####8Bf39#ABAAAAEFAAE#6MY8Xi4nRgAAALAAAAAfAP####8Bf39#AAEAAACyAAAAUAEAAAAAMAAAAAgAAAAwAAAAMQAAAH4AAAB#AAAAgAAAAIEAAACwAAAAsgAAADAA#####wB#f38AAACzAAAAAUAkAAAAAAAAAAAAsgAAAAIAAACyAAAAswAAACsA#####wAAAAAAAACtAAAACAD#####AAAAkQAAAAoAAACmAAAACwD#####Af8AAAAQAAABBQAAAACBAAAAtgAAAB8A#####wEAAAAAAgAAALcAAABkAQAAAAAwAAAABwAAADAAAAAxAAAAfgAAAH8AAACAAAAAgQAAALcAAAArAP####8AAAAAAAAAuAAAAAsA#####wH#AAAAEAAAAQUAAAAAhAAAAJcAAAASAP####8BAAAAAAIAAAAZAAAAugAAABUA#####wEAAAAAEAAAAQUAAUACcpnT3JQVAAAAuwAAAAwA#####wF#f38AEAAAAQABAAAAGQAAALwAAAAHAP####8Bf39#ABAAAAEFAAE#6c331KusFwAAAL0AAAASAP####8Bf39#AAEAAAAZAAAAvgAAADAA#####wB#f38AAAC9AAAAAUA0AAAAAAAAAAAAvAAAAAIAAAC8AAAAvQAAADAA#####wB#f38AAAC#AAAAAUAkAAAAAAAAAAAAvgAAAAIAAAC+AAAAvwAAACsA#####wAAAAAAAAC7AAAADAD#####AQAAAAAQAAABAAIAAACJAAAAkQAAAAcA#####wF#f38AEAAAAQUAAT#B0fQhYRklAAAAwwAAAAYA#####wF#f38AEAAAAQABAAAAxAE#8zMzMzMzMwAAAAwA#####wEAAAAAEAAAAQACAAAAkQAAAIgAAAAdAP####8Bf39#ABAAAAEFAAAAAMUAAADGAAAADAD#####AX9#fwAQAAABAAEAAADEAAAAxwAAADAA#####wB#f38AAADIAAAAAUAkAAAAAAAAAAAAxAAAAAQAAADEAAAAxQAAAMcAAADIAAAADAD#####AX9#fwAQAAABAAEAAACRAAAAiwAAADAA#####wB#f38AAADKAAAAAUAkAAAAAAAAAAAAiwAAAAIAAACLAAAAygAAACsA#####wAAAAAAAADDAAAAKwD#####AAAAAAAAAMYAAAAMAP####8BAAAAABAAAAEBAQAAAJEAAACO#####wAAAAIAFUNMaWV1T2JqZXRQYXJWYXJpYWJsZQD#####AL29vQAAAM4AAAABQDkAAAAAAAAAAAABAAAAAwAAAAEAAACOAAAAzgAAACEA#####wAAAAAAEAACTycAwDkAAAAAAADAKgAAAAAAAAUAAAAAjwAAAAEAAAAAAAAAAAAAAAkBAAAACgAAABwAAAAKAAAAHf####8AAAABABBDRHJvaXRlUGFyYWxsZWxlAP####8B5ubmABAAAAEAAQAAANAAAABuAAAADAD#####AObm5gAQAAABAAEAAACRAAAAfgAAAB0A#####wGkpKQAEAACUCIAAAAAAAAAAABACAAAAAAAAAUAAAAA0QAAANIAAAAyAP####8B5ubmABAAAAEAAQAAANAAAABxAAAADAD#####AObm5gAQAAABAAEAAAB#AAAAkQAAAB0A#####wGkpKQAEAACUSIAwDsAAAAAAADAIgAAAAAAAAUAAAAA1AAAANUAAAARAP####8AAADQAAAA0wAAAAsA#####wGkpKQAEAACUCcAAAAAAAAAAABACAAAAAAAAAUAAAAA1gAAANcAAAAfAP####8ApKSkAQEAAADYAAAAeAEAAAAAKwAAAB4AAAArAAAALAAAAC0AAAAuAAAALwAAADYAAAA3AAAAbAAAAG0AAABuAAAAcQAAAHgAAAB6AAAAewAAAHwAAAB9AAAAfgAAAH8AAACPAAAAkAAAAJEAAADQAAAA0QAAANIAAADTAAAA1AAAANUAAADWAAAA1wAAANgAAAAiAP####8A#wAAAAAABQAAANkAAAATAP####8AAABnAAAAYAAAABQA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAADbAAAAFAD#####Af8AAAAQAAJKIgAAAAAAAAAAAEAIAAAAAAAABQACAAAA2wAAAB4A#####wDm5uYAAQAAABkAAAAbAAAA3QAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAACAAxDQ29tbWVudGFpcmUA#####wH#AAAB#####xBAf7gAAAAAAEB7KFHrhR64AgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAEWk9PTQAAAAgA#####wAAABkAAAABP#B64UeuFHsAAAALAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAACRAAAA4AAAADMA#####wAAAAAAwDQAAAAAAADAKAAAAAAAAAAAAOEQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAABUwAAABMA#####wAAABoAAACFAAAAFAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAOMAAAAUAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAA4wAAAAwA#####wAAAAAAEAAAAQEBAAAAkAAAAOUAAAAGAP####8BAAAAARAAAAEBAQAAANABP#AAAAAAAAAAAAAdAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADnAAAA5gAAAAwA#####wB#f38AEAAAAQEBAAAA0AAAAOgAAAAMAP####8AAAAAABAAAAEBAQAAABkAAADlAAAADAD#####AAAAAAAQAAABAQEAAAAZAAAAkf####8AAAACAAlDQ2VyY2xlT1IA#####wEAAAABAQAAANAAAAABP9mZmZmZmZoAAAAAEwD#####AAAA6QAAAOwAAAAUAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAA7QAAABQA#####wAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAADtAAAAEwD#####AAAA6wAAAOwAAAAUAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAA8AAAABQA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAADwAAAACAD#####AAAA0AAAABcEAAAACgAAADUAAAALAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAADyAAAA8wAAABEA#####wAAANAAAAD0AAAACwD#####AQAAAAAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAAAA7gAAAPUAAAAMAP####8AAAAAABAAAAEBAQAAAPQAAADQAAAADAD#####AAAAAAAQAAABAQEAAADQAAAA7gAAAAwA#####wAAAAAAEAAAAQEBAAAA7gAAAPYAAAAMAP####8AAAAAABAAAAEBAQAAAPYAAAD0#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAEBAAAABQAAAPQAAADQAAAA7gAAAPYAAAD0AAAAEQD#####AAAA0AAAAO4AAAALAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAZAAAA#AAAAAsA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAABkAAAD1AAAAEQD#####AAAAGQAAAP4AAAALAP####8BAAAAABAAAABACAAAAAAAAAAAAAAAAAAABQAAAAD9AAAA#wAAAAwA#####wAAAAAAEAAAAQEBAAAA#gAAABkAAAAMAP####8AAAAAABAAAAEBAQAAABkAAAD9AAAADAD#####AAAAAAAQAAABAQEAAAD9AAABAAAAAAwA#####wAAAAAAEAAAAQEBAAABAAAAAP4AAAA1AP####8AAAAAAQEAAAAFAAAA#gAAABkAAAD9AAABAAAAAP4AAAAGAP####8BAAAAARAAAAEBAQAAABABP#AAAAAAAAAAAAA0AP####8BAAAAAQEAAAAQAAAAAT#JmZmZmZmaAAAAABMA#####wAAAQYAAAEHAAAAFAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAQgAAAAUAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAABCAAAAAwA#####wH#AAAAEAAAAQABAAABCgAAAQn#####AAAAAQAHQ01pbGlldQD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA0AAAAJAAAAA2AP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAZAAAA0AAAAA4A#####wEAAAAAwCoAAAAAAADAHAAAAAAAAAAAAQwQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAACAAAAHQAAADYA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHkAAAAZAAAADgD#####AQAAAADAHAAAAAAAAAAAAAAAAAAAAAABDxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAAeAAAABAD#####AAJoMwAFaDEtaDIAAAAJAQAAAAoAAAAcAAAACgAAAB0AAAAOAP####8BAAAAAMA1AAAAAAAAwCIAAAAAAAAAAAENEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAQAAAREAAAAY##########8="
					if (!sortie_html) texte = `\\begin{minipage}{0.7 \\linewidth} \n\t`
					else texte=``
					texte += `Un cône a pour rayon ${tex_nombre(r)}${sp()}cm et pour hauteur SO${sp()}=${sp()}${tex_nombre(h1)}${sp()}cm.<br>Le point O' est situé sur la hauteur [SO] à ${h2}${sp()}cm de S.<br>`
					texte += `Un plan parallèle à la base passant par O' coupe le cône.<br>`
					texte += `On obtient ainsi une section ` + katex_Popup2(numero_de_l_exercice + i * 4, 1, "semblable", `Définition : Figures semblables`, `Se dit de deux figures/solides qui ont les mêmes formes, les mêmes angles mais pas nécessairement les mêmes mesures.<br>Les représentations d'une même figure à deux échelles différentes sont des figures semblables.`) + ` à la base et un cône réduit semblable au grand cône.<br>`
					if (!sortie_html) texte +=`La figure n'est pas en vraie grandeur.<br>`
					texte += num_alpha(0) + ` Calculer l'` + katex_Popup2(numero_de_l_exercice + i * 4 + 1, 1, "aire de base du cône", `Formule : Aire du disque de rayon R`, `$Aire=\\pi \\times \\text{R}^{2}$`) + `.<br>`
					texte += num_alpha(1) + ` Calculer le ` + katex_Popup2(numero_de_l_exercice + i * 4 + 2, 1, "volume du cône", `Formule : Volume d'un cône de rayon R et de hauteur h`, `$Volume= \\dfrac{\\pi \\times \\text{R}^{2} \\times \\text{h}}{3}$`) + `.<br>`
					texte += num_alpha(2) + ` En déduire l'aire de la ` + katex_Popup2(numero_de_l_exercice + i * 4 + 3, 1, "section", `Définition : Section plane d'un solide`, `La section d'un solide par un plan est une figure plane.<br>Dans le cas d'une section d'un cône par un plan parallèle à sa base, cette section est un disque qui est une réduction de la base.<br>Dans une réduction de coefficient k, les aires sont multipliées par k${exposant(2)} et les volumes sont multipliés par k${exposant(3)}.`) + ` sachant que SO'${sp()}=${sp()}${h2}${sp()}cm.<br>`
					texte += num_alpha(3) + ` Calculer le volume du cône de hauteur SO'.<br>`
					texte += num_alpha(4) + ` Calculer le volume du tronc de cône (partie du cône située entre la base et la section).`
					if (sortie_html) texte += `<br>Le point O peut être déplacé et on peut changer l'angle de vue &#x3C6; `
					else texte+=`\n\t \\end{minipage} \n\t \\begin{minipage}{0.3 \\linewidth} \n\t \\begin{tikzpicture}[scale=0.7] \n\t 
					\\definecolor{hhhhhh}{rgb}{0,0,0}
					\\definecolor{phphph}{rgb}{0.5,0.5,0.5}
					\\definecolor{ofofof}{rgb}{0.5,0.5,0.5}
					\\definecolor{ffffhh}{rgb}{1,1,0}
					\\definecolor{enenen}{rgb}{0.9,0.9,0.9}
					\\definecolor{dpdpdp}{rgb}{0.85,0.85,0.85}
					\\definecolor{bdbdbd}{rgb}{0.74,0.74,0.74}
					\\definecolor{alalal}{rgb}{0.64,0.64,0.64}
					\\definecolor{ffhhhh}{rgb}{1,0,0}
					\\clip (40.89,0) rectangle (0,22.58);
					\\fill[color=black] (4.609,10.281) circle (0.063);
					\\node at (3.828, 10.531) [align=left,inner sep = 0pt, outer sep = 0pt,below right,black,font= \\sf \\fontsize {0.438cm} {0.547cm} \\selectfont] {$\\text{O}$};
					\\draw [color=ofofof , dotted, line width = 0.4](1.513,9.062)--(1.679,9)--(1.853,8.942)--(2.035,8.887)--(2.224,8.836)--(2.419,8.788)--(2.621,8.745)--(2.827,8.706)--(3.039,8.672)--(3.255,8.642)--(3.475,8.616)--(3.698,8.595)--(3.923,8.578)--(4.15,8.567)--(4.379,8.559)--(4.608,8.557)--(4.837,8.559)--(5.065,8.566)--(5.292,8.578)--(5.518,8.595)--(5.741,8.616)--(5.96,8.641)--(6.176,8.671)--(6.388,8.706)--(6.595,8.745)--(6.796,8.788)--(6.992,8.835)--(7.181,8.886)--(7.363,8.941)--(7.537,8.999)--(7.703,9.062)--(7.861,9.127)--(8.01,9.196)--(8.15,9.267)--(8.279,9.342)--(8.399,9.419)--(8.509,9.498)--(8.607,9.579)--(8.695,9.663)--(8.772,9.748)--(8.837,9.834)--(8.891,9.922)--(8.932,10.011)--(8.962,10.1)--(8.98,10.19)--(8.987,10.281)--(8.981,10.371)--(8.963,10.461)--(8.933,10.55)--(8.891,10.639)--(8.838,10.727)--(8.773,10.813)--(8.696,10.899)--(8.609,10.982)--(8.51,11.063)--(8.401,11.143)--(8.281,11.22)--(8.152,11.294)--(8.012,11.366)--(7.863,11.435)--(7.706,11.5)--(7.54,11.562)--(7.365,11.621)--(7.184,11.676)--(6.995,11.727)--(6.799,11.774)--(6.598,11.817)--(6.391,11.856)--(6.18,11.891)--(5.964,11.921)--(5.744,11.947)--(5.521,11.968)--(5.296,11.984)--(5.069,11.996)--(4.84,12.003)--(4.611,12.006)--(4.382,12.003)--(4.154,11.996)--(3.926,11.984)--(3.701,11.968)--(3.478,11.947)--(3.258,11.921)--(3.042,11.891)--(2.831,11.857)--(2.624,11.818)--(2.422,11.775)--(2.227,11.728)--(2.038,11.677)--(1.856,11.622)--(1.682,11.563)--(1.515,11.501)--(1.358,11.436)--(1.209,11.367)--(1.069,11.295)--(0.939,11.221)--(0.819,11.144)--(0.71,11.065)--(0.611,10.983)--(0.524,10.9)--(0.447,10.815)--(0.382,10.728)--(0.328,10.64)--(0.286,10.552)--(0.256,10.462)--(0.238,10.372)--(0.232,10.282)--(0.238,10.192)--(0.256,10.102)--(0.286,10.012)--(0.327,9.923)--(0.381,9.836)--(0.446,9.749)--(0.522,9.664)--(0.61,9.581)--(0.708,9.499)--(0.818,9.42)--(0.937,9.343)--(1.067,9.268)--(1.207,9.197)--(1.355,9.128)--cycle;
					
					\\fill[color = ffffhh, opacity = 0.2](1.513,9.062)--(1.679,9)--(1.853,8.942)--(2.035,8.887)--(2.224,8.836)--(2.419,8.788)--(2.621,8.745)--(2.827,8.706)--(3.039,8.672)--(3.255,8.642)--(3.475,8.616)--(3.698,8.595)--(3.923,8.578)--(4.15,8.567)--(4.379,8.559)--(4.608,8.557)--(4.837,8.559)--(5.065,8.566)--(5.292,8.578)--(5.518,8.595)--(5.741,8.616)--(5.96,8.641)--(6.176,8.671)--(6.388,8.706)--(6.595,8.745)--(6.796,8.788)--(6.992,8.835)--(7.181,8.886)--(7.363,8.941)--(7.537,8.999)--(7.703,9.062)--(7.861,9.127)--(8.01,9.196)--(8.15,9.267)--(8.279,9.342)--(8.399,9.419)--(8.509,9.498)--(8.607,9.579)--(8.695,9.663)--(8.772,9.748)--(8.837,9.834)--(8.891,9.922)--(8.932,10.011)--(8.962,10.1)--(8.98,10.19)--(8.987,10.281)--(8.981,10.371)--(8.963,10.461)--(8.933,10.55)--(8.891,10.639)--(8.838,10.727)--(8.773,10.813)--(8.696,10.899)--(8.609,10.982)--(8.51,11.063)--(8.401,11.143)--(8.281,11.22)--(8.152,11.294)--(8.012,11.366)--(7.863,11.435)--(7.706,11.5)--(7.54,11.562)--(7.365,11.621)--(7.184,11.676)--(6.995,11.727)--(6.799,11.774)--(6.598,11.817)--(6.391,11.856)--(6.18,11.891)--(5.964,11.921)--(5.744,11.947)--(5.521,11.968)--(5.296,11.984)--(5.069,11.996)--(4.84,12.003)--(4.611,12.006)--(4.382,12.003)--(4.154,11.996)--(3.926,11.984)--(3.701,11.968)--(3.478,11.947)--(3.258,11.921)--(3.042,11.891)--(2.831,11.857)--(2.624,11.818)--(2.422,11.775)--(2.227,11.728)--(2.038,11.677)--(1.856,11.622)--(1.682,11.563)--(1.515,11.501)--(1.358,11.436)--(1.209,11.367)--(1.069,11.295)--(0.939,11.221)--(0.819,11.144)--(0.71,11.065)--(0.611,10.983)--(0.524,10.9)--(0.447,10.815)--(0.382,10.728)--(0.328,10.64)--(0.286,10.552)--(0.256,10.462)--(0.238,10.372)--(0.232,10.282)--(0.238,10.192)--(0.256,10.102)--(0.286,10.012)--(0.327,9.923)--(0.381,9.836)--(0.446,9.749)--(0.522,9.664)--(0.61,9.581)--(0.708,9.499)--(0.818,9.42)--(0.937,9.343)--(1.067,9.268)--(1.207,9.197)--(1.355,9.128)(1.513,9.062);
					\\draw [color=black , line width = 0.8](4.609,21.776)--(8.937,10.54);
					\\draw [color=black , line width = 0.8](4.609,21.776)--(0.282,10.54);
					\\draw [color=dpdpdp , line width = 0.4](4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776)--(4.609,21.776);
					
					\\draw [color=dpdpdp , line width = 0.4](4.129,20.528)--(4.126,20.52)--(4.124,20.511)--(4.123,20.503)--(4.123,20.495)--(4.124,20.486)--(4.126,20.478)--(4.129,20.47)--(4.133,20.461)--(4.137,20.453)--(4.143,20.445)--(4.149,20.437)--(4.156,20.429)--(4.164,20.422)--(4.173,20.414)--(4.183,20.407)--(4.194,20.399)--(4.205,20.392)--(4.217,20.386)--(4.23,20.379)--(4.244,20.373)--(4.258,20.366)--(4.273,20.361)--(4.289,20.355)--(4.305,20.35)--(4.322,20.344)--(4.339,20.34)--(4.357,20.335)--(4.376,20.331)--(4.395,20.327)--(4.414,20.324)--(4.433,20.32)--(4.453,20.318)--(4.473,20.315)--(4.494,20.313)--(4.515,20.311)--(4.535,20.31)--(4.556,20.309)--(4.578,20.308)--(4.599,20.308)--(4.62,20.308)--(4.641,20.308)--(4.662,20.309)--(4.683,20.31)--(4.704,20.311)--(4.725,20.313)--(4.745,20.315)--(4.766,20.318)--(4.785,20.32)--(4.805,20.324)--(4.824,20.327)--(4.843,20.331)--(4.861,20.335)--(4.879,20.34)--(4.897,20.344)--(4.913,20.35)--(4.93,20.355)--(4.945,20.361)--(4.96,20.366)--(4.975,20.373)--(4.988,20.379)--(5.001,20.386)--(5.013,20.392)--(5.025,20.399)--(5.035,20.407)--(5.045,20.414)--(5.054,20.422)--(5.062,20.429)--(5.07,20.437)--(5.076,20.445)--(5.082,20.453)--(5.086,20.461)--(5.09,20.47)--(5.093,20.478)--(5.095,20.486)--(5.096,20.495)--(5.096,20.503)--(5.095,20.511)--(5.093,20.52)--(5.09,20.528);
					
					\\draw [color=dpdpdp , line width = 0.4](3.648,19.279)--(3.642,19.263)--(3.639,19.246)--(3.637,19.229)--(3.637,19.213)--(3.639,19.196)--(3.643,19.179)--(3.648,19.163)--(3.656,19.146)--(3.665,19.13)--(3.676,19.114)--(3.689,19.098)--(3.703,19.082)--(3.72,19.067)--(3.738,19.052)--(3.757,19.037)--(3.778,19.023)--(3.801,19.009)--(3.826,18.995)--(3.851,18.982)--(3.879,18.969)--(3.907,18.957)--(3.937,18.945)--(3.969,18.934)--(4.001,18.923)--(4.035,18.913)--(4.07,18.903)--(4.105,18.894)--(4.142,18.886)--(4.18,18.878)--(4.218,18.871)--(4.257,18.865)--(4.297,18.859)--(4.338,18.854)--(4.378,18.85)--(4.42,18.846)--(4.462,18.843)--(4.504,18.841)--(4.546,18.84)--(4.588,18.839)--(4.631,18.839)--(4.673,18.84)--(4.715,18.841)--(4.757,18.843)--(4.799,18.846)--(4.84,18.85)--(4.881,18.854)--(4.922,18.859)--(4.962,18.865)--(5.001,18.871)--(5.039,18.878)--(5.077,18.886)--(5.113,18.894)--(5.149,18.903)--(5.184,18.913)--(5.218,18.923)--(5.25,18.934)--(5.281,18.945)--(5.311,18.957)--(5.34,18.969)--(5.367,18.982)--(5.393,18.995)--(5.417,19.009)--(5.44,19.023)--(5.462,19.037)--(5.481,19.052)--(5.499,19.067)--(5.515,19.082)--(5.53,19.098)--(5.543,19.114)--(5.554,19.13)--(5.563,19.146)--(5.57,19.163)--(5.576,19.179)--(5.58,19.196)--(5.582,19.213)--(5.582,19.229)--(5.58,19.246)--(5.577,19.263)--(5.571,19.279);
					
					\\draw [color=dpdpdp , line width = 0.4](3.167,18.031)--(3.159,18.006)--(3.153,17.981)--(3.151,17.956)--(3.151,17.931)--(3.154,17.906)--(3.159,17.881)--(3.168,17.856)--(3.179,17.832)--(3.193,17.807)--(3.209,17.783)--(3.228,17.759)--(3.25,17.736)--(3.275,17.712)--(3.302,17.69)--(3.331,17.668)--(3.363,17.646)--(3.397,17.625)--(3.434,17.604)--(3.472,17.584)--(3.513,17.565)--(3.556,17.547)--(3.601,17.529)--(3.648,17.512)--(3.697,17.496)--(3.748,17.481)--(3.8,17.466)--(3.853,17.453)--(3.908,17.441)--(3.965,17.429)--(4.022,17.418)--(4.081,17.409)--(4.141,17.4)--(4.202,17.393)--(4.263,17.386)--(4.325,17.381)--(4.388,17.377)--(4.451,17.373)--(4.514,17.371)--(4.578,17.37)--(4.641,17.37)--(4.705,17.371)--(4.768,17.373)--(4.831,17.377)--(4.894,17.381)--(4.956,17.386)--(5.017,17.393)--(5.078,17.4)--(5.138,17.409)--(5.196,17.418)--(5.254,17.429)--(5.31,17.441)--(5.365,17.453)--(5.419,17.466)--(5.471,17.481)--(5.522,17.496)--(5.57,17.512)--(5.617,17.529)--(5.662,17.547)--(5.705,17.565)--(5.746,17.584)--(5.785,17.604)--(5.822,17.625)--(5.856,17.646)--(5.888,17.668)--(5.917,17.69)--(5.944,17.712)--(5.968,17.736)--(5.99,17.759)--(6.009,17.783)--(6.026,17.807)--(6.04,17.832)--(6.051,17.856)--(6.059,17.881)--(6.065,17.906)--(6.068,17.931)--(6.068,17.956)--(6.066,17.981)--(6.06,18.006)--(6.052,18.031);
					
					\\draw [color=dpdpdp , line width = 0.4](2.686,16.782)--(2.675,16.749)--(2.668,16.716)--(2.664,16.683)--(2.665,16.649)--(2.668,16.616)--(2.676,16.583)--(2.687,16.549)--(2.702,16.517)--(2.72,16.484)--(2.743,16.452)--(2.768,16.42)--(2.797,16.389)--(2.83,16.358)--(2.866,16.327)--(2.905,16.298)--(2.948,16.269)--(2.993,16.241)--(3.042,16.214)--(3.094,16.187)--(3.148,16.162)--(3.205,16.137)--(3.265,16.113)--(3.328,16.091)--(3.393,16.069)--(3.46,16.049)--(3.53,16.03)--(3.601,16.012)--(3.675,15.995)--(3.75,15.98)--(3.827,15.966)--(3.905,15.953)--(3.985,15.942)--(4.066,15.932)--(4.148,15.923)--(4.23,15.916)--(4.314,15.91)--(4.398,15.906)--(4.482,15.903)--(4.567,15.901)--(4.652,15.901)--(4.736,15.903)--(4.821,15.906)--(4.905,15.91)--(4.988,15.916)--(5.071,15.923)--(5.153,15.932)--(5.234,15.942)--(5.314,15.953)--(5.392,15.966)--(5.469,15.98)--(5.544,15.995)--(5.617,16.012)--(5.689,16.03)--(5.758,16.049)--(5.826,16.069)--(5.891,16.091)--(5.953,16.113)--(6.013,16.137)--(6.071,16.162)--(6.125,16.187)--(6.177,16.214)--(6.226,16.241)--(6.271,16.269)--(6.314,16.298)--(6.353,16.327)--(6.389,16.358)--(6.421,16.389)--(6.451,16.42)--(6.476,16.452)--(6.498,16.484)--(6.517,16.517)--(6.532,16.549)--(6.543,16.583)--(6.55,16.616)--(6.554,16.649)--(6.554,16.683)--(6.551,16.716)--(6.544,16.749)--(6.533,16.782);
					
					\\draw [color=dpdpdp , line width = 0.4](2.205,15.534)--(2.192,15.492)--(2.182,15.451)--(2.178,15.409)--(2.178,15.367)--(2.183,15.326)--(2.193,15.284)--(2.207,15.243)--(2.225,15.202)--(2.248,15.161)--(2.276,15.121)--(2.308,15.081)--(2.344,15.042)--(2.385,15.003)--(2.43,14.965)--(2.479,14.928)--(2.532,14.892)--(2.589,14.857)--(2.65,14.823)--(2.715,14.79)--(2.783,14.758)--(2.854,14.727)--(2.929,14.698)--(3.008,14.669)--(3.089,14.643)--(3.173,14.617)--(3.26,14.593)--(3.349,14.571)--(3.441,14.55)--(3.535,14.531)--(3.631,14.513)--(3.729,14.497)--(3.829,14.483)--(3.93,14.47)--(4.032,14.46)--(4.136,14.451)--(4.24,14.443)--(4.345,14.438)--(4.451,14.434)--(4.556,14.432)--(4.662,14.432)--(4.768,14.434)--(4.874,14.438)--(4.979,14.443)--(5.083,14.451)--(5.187,14.46)--(5.289,14.47)--(5.39,14.483)--(5.49,14.497)--(5.588,14.513)--(5.684,14.531)--(5.778,14.55)--(5.869,14.571)--(5.959,14.593)--(6.046,14.617)--(6.13,14.643)--(6.211,14.669)--(6.289,14.698)--(6.364,14.727)--(6.436,14.758)--(6.504,14.79)--(6.569,14.823)--(6.63,14.857)--(6.687,14.892)--(6.74,14.928)--(6.789,14.965)--(6.834,15.003)--(6.874,15.042)--(6.911,15.081)--(6.943,15.121)--(6.97,15.161)--(6.994,15.202)--(7.012,15.243)--(7.026,15.284)--(7.036,15.326)--(7.04,15.367)--(7.041,15.409)--(7.036,15.451)--(7.027,15.492)--(7.014,15.534);
					
					\\draw [color=dpdpdp , line width = 0.4](1.724,14.285)--(1.708,14.236)--(1.697,14.186)--(1.692,14.136)--(1.692,14.086)--(1.698,14.036)--(1.709,13.986)--(1.726,13.936)--(1.748,13.887)--(1.776,13.838)--(1.809,13.79)--(1.848,13.742)--(1.891,13.695)--(1.94,13.648)--(1.994,13.603)--(2.053,13.559)--(2.117,13.515)--(2.185,13.473)--(2.258,13.432)--(2.336,13.392)--(2.417,13.354)--(2.503,13.317)--(2.593,13.282)--(2.687,13.248)--(2.785,13.216)--(2.886,13.185)--(2.99,13.157)--(3.097,13.13)--(3.207,13.105)--(3.32,13.082)--(3.435,13.061)--(3.553,13.041)--(3.673,13.024)--(3.794,13.009)--(3.917,12.996)--(4.041,12.985)--(4.166,12.977)--(4.292,12.97)--(4.419,12.966)--(4.546,12.964)--(4.673,12.964)--(4.8,12.966)--(4.927,12.97)--(5.053,12.977)--(5.178,12.985)--(5.302,12.996)--(5.425,13.009)--(5.546,13.024)--(5.666,13.041)--(5.783,13.061)--(5.899,13.082)--(6.011,13.105)--(6.122,13.13)--(6.229,13.157)--(6.333,13.185)--(6.434,13.216)--(6.531,13.248)--(6.625,13.282)--(6.715,13.317)--(6.801,13.354)--(6.883,13.392)--(6.961,13.432)--(7.034,13.473)--(7.102,13.515)--(7.166,13.559)--(7.225,13.603)--(7.279,13.648)--(7.328,13.695)--(7.371,13.742)--(7.41,13.79)--(7.443,13.838)--(7.47,13.887)--(7.493,13.936)--(7.51,13.986)--(7.521,14.036)--(7.527,14.086)--(7.527,14.136)--(7.522,14.186)--(7.511,14.236)--(7.494,14.285);
					
					\\draw [color=dpdpdp , line width = 0.4](1.243,13.037)--(1.224,12.979)--(1.212,12.921)--(1.206,12.862)--(1.206,12.804)--(1.213,12.745)--(1.226,12.687)--(1.245,12.629)--(1.271,12.572)--(1.304,12.515)--(1.342,12.458)--(1.387,12.403)--(1.438,12.348)--(1.495,12.294)--(1.558,12.241)--(1.627,12.189)--(1.701,12.139)--(1.781,12.089)--(1.866,12.041)--(1.957,11.995)--(2.052,11.95)--(2.152,11.907)--(2.257,11.866)--(2.367,11.827)--(2.481,11.789)--(2.598,11.754)--(2.72,11.72)--(2.845,11.689)--(2.974,11.66)--(3.105,11.633)--(3.24,11.608)--(3.377,11.586)--(3.516,11.566)--(3.658,11.548)--(3.801,11.533)--(3.946,11.52)--(4.092,11.51)--(4.239,11.503)--(4.387,11.497)--(4.535,11.495)--(4.684,11.495)--(4.832,11.497)--(4.98,11.503)--(5.127,11.51)--(5.273,11.52)--(5.418,11.533)--(5.561,11.548)--(5.702,11.566)--(5.842,11.586)--(5.979,11.608)--(6.113,11.633)--(6.245,11.66)--(6.374,11.689)--(6.499,11.72)--(6.62,11.754)--(6.738,11.789)--(6.852,11.827)--(6.961,11.866)--(7.066,11.907)--(7.167,11.95)--(7.262,11.995)--(7.353,12.041)--(7.438,12.089)--(7.518,12.139)--(7.592,12.189)--(7.661,12.241)--(7.724,12.294)--(7.781,12.348)--(7.831,12.403)--(7.876,12.458)--(7.915,12.515)--(7.947,12.572)--(7.973,12.629)--(7.993,12.687)--(8.006,12.745)--(8.013,12.804)--(8.013,12.862)--(8.007,12.921)--(7.994,12.979)--(7.975,13.037);
					
					\\draw [color=dpdpdp , line width = 0.4](0.763,11.788)--(0.741,11.722)--(0.726,11.656)--(0.719,11.589)--(0.72,11.522)--(0.727,11.455)--(0.742,11.389)--(0.765,11.323)--(0.795,11.257)--(0.832,11.192)--(0.876,11.127)--(0.927,11.064)--(0.985,11.001)--(1.05,10.939)--(1.122,10.879)--(1.201,10.819)--(1.286,10.762)--(1.377,10.705)--(1.474,10.651)--(1.578,10.598)--(1.687,10.547)--(1.801,10.498)--(1.921,10.45)--(2.047,10.405)--(2.177,10.362)--(2.311,10.322)--(2.45,10.283)--(2.593,10.248)--(2.74,10.214)--(2.89,10.183)--(3.044,10.155)--(3.201,10.13)--(3.36,10.107)--(3.522,10.087)--(3.686,10.07)--(3.851,10.055)--(4.018,10.044)--(4.186,10.035)--(4.355,10.029)--(4.525,10.026)--(4.694,10.026)--(4.864,10.029)--(5.032,10.035)--(5.201,10.044)--(5.368,10.055)--(5.533,10.07)--(5.697,10.087)--(5.859,10.107)--(6.018,10.13)--(6.175,10.155)--(6.328,10.183)--(6.479,10.214)--(6.626,10.248)--(6.769,10.283)--(6.908,10.322)--(7.042,10.362)--(7.172,10.405)--(7.297,10.45)--(7.417,10.498)--(7.532,10.547)--(7.641,10.598)--(7.744,10.651)--(7.842,10.705)--(7.933,10.762)--(8.018,10.819)--(8.097,10.879)--(8.168,10.939)--(8.234,11.001)--(8.292,11.064)--(8.343,11.127)--(8.387,11.192)--(8.424,11.257)--(8.454,11.323)--(8.476,11.389)--(8.491,11.455)--(8.499,11.522)--(8.499,11.589)--(8.492,11.656)--(8.478,11.722)--(8.456,11.788);
					
					\\draw [color=dpdpdp , line width = 0.4](0.282,10.54)--(0.257,10.465)--(0.241,10.391)--(0.233,10.315)--(0.233,10.24)--(0.242,10.165)--(0.259,10.09)--(0.284,10.016)--(0.318,9.942)--(0.359,9.869)--(0.409,9.796)--(0.467,9.724)--(0.532,9.654)--(0.605,9.585)--(0.686,9.516)--(0.775,9.45)--(0.87,9.385)--(0.973,9.322)--(1.082,9.26)--(1.199,9.2)--(1.321,9.143)--(1.45,9.088)--(1.586,9.035)--(1.726,8.984)--(1.872,8.936)--(2.024,8.89)--(2.18,8.847)--(2.341,8.807)--(2.506,8.769)--(2.676,8.734)--(2.849,8.703)--(3.025,8.674)--(3.204,8.648)--(3.386,8.626)--(3.57,8.606)--(3.756,8.59)--(3.944,8.577)--(4.133,8.567)--(4.323,8.561)--(4.514,8.557)--(4.705,8.557)--(4.895,8.561)--(5.085,8.567)--(5.274,8.577)--(5.462,8.59)--(5.648,8.606)--(5.833,8.626)--(6.015,8.648)--(6.194,8.674)--(6.37,8.703)--(6.543,8.734)--(6.712,8.769)--(6.878,8.807)--(7.039,8.847)--(7.195,8.89)--(7.346,8.936)--(7.493,8.984)--(7.633,9.035)--(7.768,9.088)--(7.897,9.143)--(8.02,9.2)--(8.136,9.26)--(8.246,9.322)--(8.349,9.385)--(8.444,9.45)--(8.532,9.516)--(8.613,9.585)--(8.687,9.654)--(8.752,9.724)--(8.81,9.796)--(8.859,9.869)--(8.901,9.942)--(8.934,10.016)--(8.96,10.09)--(8.977,10.165)--(8.985,10.24)--(8.986,10.315)--(8.978,10.391)--(8.962,10.465)--(8.937,10.54);
					
					\\draw [color=black , line width = 0.8](0.282,10.54)--(0.265,10.49)--(0.251,10.441)--(0.241,10.391)--(0.235,10.341)--(0.232,10.291)--(0.233,10.242)--(0.238,10.192)--(0.246,10.142)--(0.259,10.092)--(0.274,10.043)--(0.294,9.994)--(0.317,9.944)--(0.343,9.896)--(0.373,9.847)--(0.407,9.799)--(0.444,9.751)--(0.485,9.704)--(0.529,9.657)--(0.576,9.611)--(0.627,9.566)--(0.681,9.52)--(0.739,9.476)--(0.8,9.432)--(0.864,9.389)--(0.931,9.347)--(1.001,9.305)--(1.074,9.265)--(1.15,9.225)--(1.229,9.186)--(1.311,9.148)--(1.396,9.111)--(1.483,9.075)--(1.573,9.039)--(1.665,9.005)--(1.76,8.972)--(1.857,8.94)--(1.957,8.91)--(2.059,8.88)--(2.163,8.851)--(2.269,8.824)--(2.377,8.798)--(2.487,8.773)--(2.598,8.75)--(2.712,8.727)--(2.827,8.706)--(2.943,8.687)--(3.061,8.669)--(3.18,8.652)--(3.3,8.636)--(3.421,8.622)--(3.544,8.609)--(3.667,8.597)--(3.791,8.587)--(3.916,8.579)--(4.041,8.572)--(4.167,8.566)--(4.293,8.561)--(4.419,8.559)--(4.546,8.557)--(4.673,8.557)--(4.799,8.559)--(4.926,8.561)--(5.052,8.566)--(5.178,8.572)--(5.303,8.579)--(5.428,8.587)--(5.552,8.597)--(5.675,8.609)--(5.797,8.622)--(5.919,8.636)--(6.039,8.652)--(6.158,8.669)--(6.276,8.687)--(6.392,8.706)--(6.507,8.727)--(6.62,8.75)--(6.732,8.773)--(6.842,8.798)--(6.95,8.824)--(7.056,8.851)--(7.16,8.88)--(7.262,8.91)--(7.361,8.94)--(7.459,8.972)--(7.554,9.005)--(7.646,9.039)--(7.736,9.075)--(7.823,9.111)--(7.908,9.148)--(7.99,9.186)--(8.069,9.225)--(8.145,9.265)--(8.218,9.305)--(8.288,9.347)--(8.355,9.389)--(8.419,9.432)--(8.48,9.476)--(8.537,9.52)--(8.592,9.566)--(8.643,9.611)--(8.69,9.657)--(8.734,9.704)--(8.775,9.751)--(8.812,9.799)--(8.846,9.847)--(8.876,9.896)--(8.902,9.944)--(8.925,9.994)--(8.945,10.043)--(8.96,10.092)--(8.972,10.142)--(8.981,10.192)--(8.985,10.242)--(8.986,10.291)--(8.984,10.341)--(8.978,10.391)--(8.968,10.441)--(8.954,10.49)--(8.937,10.54);
					
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(1.513,9.062);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(2.419,8.788);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(3.475,8.616);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(4.608,8.557);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(5.741,8.616);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(6.796,8.788);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(7.703,9.062);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(8.399,9.419);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(8.837,9.834);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(8.987,10.281);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(8.838,10.727);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(8.401,11.143);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(7.706,11.5);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(6.799,11.774);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(5.744,11.947);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(4.611,12.006);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(3.478,11.947);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(2.422,11.775);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(1.515,11.501);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(0.819,11.144);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(0.382,10.728);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(0.232,10.282);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(0.381,9.836);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(0.818,9.42);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.609,21.776)--(1.513,9.062);
					\\fill[color=black] (4.609,17.178) circle (0.063);
					\\node at (3.609, 17.46) [align=left,inner sep = 0pt, outer sep = 0pt,below right,black,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {$\\text{O'}$};
					\\draw [color=enenen , line width = 0.4](4.609,21.776)--(4.213,10.125);
					\\draw [color=enenen , line width = 0.4](1.541,11.491)--(4.609,21.776);
					\\draw [color=alalal , dotted, line width = 0.4](2.887,17.055)--(2.905,17.02)--(2.929,16.985)--(2.956,16.951)--(2.989,16.917)--(3.025,16.885)--(3.066,16.853)--(3.111,16.821)--(3.16,16.791)--(3.213,16.762)--(3.27,16.734)--(3.33,16.707)--(3.394,16.682)--(3.461,16.658)--(3.531,16.635)--(3.604,16.614)--(3.68,16.594)--(3.758,16.576)--(3.839,16.559)--(3.921,16.544)--(4.006,16.531)--(4.092,16.519)--(4.179,16.51)--(4.268,16.502)--(4.358,16.496)--(4.448,16.492)--(4.539,16.489)--(4.629,16.489)--(4.72,16.49)--(4.811,16.493)--(4.901,16.498)--(4.99,16.505)--(5.078,16.514)--(5.165,16.524)--(5.251,16.537)--(5.334,16.55)--(5.416,16.566)--(5.496,16.583)--(5.573,16.602)--(5.647,16.623)--(5.719,16.645)--(5.788,16.668)--(5.854,16.693)--(5.916,16.719)--(5.975,16.746)--(6.03,16.775)--(6.081,16.805)--(6.128,16.835)--(6.171,16.867)--(6.21,16.899)--(6.245,16.932)--(6.275,16.966)--(6.301,17)--(6.322,17.035)--(6.339,17.07)--(6.351,17.106)--(6.358,17.141)--(6.36,17.177)--(6.358,17.213)--(6.351,17.249)--(6.339,17.284)--(6.323,17.32)--(6.302,17.354)--(6.277,17.389)--(6.247,17.423)--(6.212,17.456)--(6.174,17.488)--(6.131,17.52)--(6.084,17.55)--(6.033,17.58)--(5.978,17.609)--(5.919,17.636)--(5.857,17.662)--(5.792,17.687)--(5.723,17.71)--(5.652,17.732)--(5.577,17.753)--(5.5,17.772)--(5.421,17.789)--(5.339,17.805)--(5.256,17.819)--(5.17,17.832)--(5.083,17.842)--(4.995,17.851)--(4.906,17.858)--(4.816,17.863)--(4.726,17.866)--(4.635,17.868)--(4.544,17.868)--(4.453,17.865)--(4.363,17.861)--(4.273,17.855)--(4.184,17.847)--(4.097,17.838)--(4.011,17.826)--(3.926,17.813)--(3.843,17.798)--(3.763,17.782)--(3.684,17.764)--(3.608,17.744)--(3.535,17.723)--(3.465,17.7)--(3.398,17.676)--(3.334,17.651)--(3.273,17.624)--(3.216,17.596)--(3.163,17.567)--(3.114,17.537)--(3.068,17.506)--(3.027,17.474)--(2.991,17.441)--(2.958,17.408)--(2.93,17.374)--(2.907,17.339)--(2.888,17.304)--(2.874,17.269)--(2.864,17.233)--(2.859,17.197)--(2.859,17.161)--(2.864,17.126)--cycle;
					
					\\fill[color = ffhhhh, opacity = 0.2](2.887,17.055)--(2.905,17.02)--(2.929,16.985)--(2.956,16.951)--(2.989,16.917)--(3.025,16.885)--(3.066,16.853)--(3.111,16.821)--(3.16,16.791)--(3.213,16.762)--(3.27,16.734)--(3.33,16.707)--(3.394,16.682)--(3.461,16.658)--(3.531,16.635)--(3.604,16.614)--(3.68,16.594)--(3.758,16.576)--(3.839,16.559)--(3.921,16.544)--(4.006,16.531)--(4.092,16.519)--(4.179,16.51)--(4.268,16.502)--(4.358,16.496)--(4.448,16.492)--(4.539,16.489)--(4.629,16.489)--(4.72,16.49)--(4.811,16.493)--(4.901,16.498)--(4.99,16.505)--(5.078,16.514)--(5.165,16.524)--(5.251,16.537)--(5.334,16.55)--(5.416,16.566)--(5.496,16.583)--(5.573,16.602)--(5.647,16.623)--(5.719,16.645)--(5.788,16.668)--(5.854,16.693)--(5.916,16.719)--(5.975,16.746)--(6.03,16.775)--(6.081,16.805)--(6.128,16.835)--(6.171,16.867)--(6.21,16.899)--(6.245,16.932)--(6.275,16.966)--(6.301,17)--(6.322,17.035)--(6.339,17.07)--(6.351,17.106)--(6.358,17.141)--(6.36,17.177)--(6.358,17.213)--(6.351,17.249)--(6.339,17.284)--(6.323,17.32)--(6.302,17.354)--(6.277,17.389)--(6.247,17.423)--(6.212,17.456)--(6.174,17.488)--(6.131,17.52)--(6.084,17.55)--(6.033,17.58)--(5.978,17.609)--(5.919,17.636)--(5.857,17.662)--(5.792,17.687)--(5.723,17.71)--(5.652,17.732)--(5.577,17.753)--(5.5,17.772)--(5.421,17.789)--(5.339,17.805)--(5.256,17.819)--(5.17,17.832)--(5.083,17.842)--(4.995,17.851)--(4.906,17.858)--(4.816,17.863)--(4.726,17.866)--(4.635,17.868)--(4.544,17.868)--(4.453,17.865)--(4.363,17.861)--(4.273,17.855)--(4.184,17.847)--(4.097,17.838)--(4.011,17.826)--(3.926,17.813)--(3.843,17.798)--(3.763,17.782)--(3.684,17.764)--(3.608,17.744)--(3.535,17.723)--(3.465,17.7)--(3.398,17.676)--(3.334,17.651)--(3.273,17.624)--(3.216,17.596)--(3.163,17.567)--(3.114,17.537)--(3.068,17.506)--(3.027,17.474)--(2.991,17.441)--(2.958,17.408)--(2.93,17.374)--(2.907,17.339)--(2.888,17.304)--(2.874,17.269)--(2.864,17.233)--(2.859,17.197)--(2.859,17.161)--(2.864,17.126)(2.887,17.055);
					\\node at (3.922, 22.559) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {S};
					\\draw [color=black , dotted, line width = 0.4](4.609,21.776)--(8.987,10.281);
					\\draw [color=ofofof , dotted, line width = 0.4](4.609,17.178)--(6.36,17.178);
					\\draw [color=black , dotted, line width = 0.4](4.609,10.281)--(8.987,10.281);
					\\draw [color=black , dotted, line width = 0.4](4.609,10.281)--(4.609,21.776);
					\\draw [color=black , dotted, line width = 0.4](4.609,17.546)--(4.609,17.178);
					\\draw [color=black , dotted, line width = 0.4](4.609,17.178)--(5.009,17.178);
					\\draw [color=black , dotted, line width = 0.4](5.009,17.178)--(5.009,17.546);
					\\draw [color=black , dotted, line width = 0.4](5.009,17.546)--(4.609,17.546);
					\\draw [color=black , dotted, line width = 0.4](4.609,17.546)--(4.609,17.178)--(5.009,17.178)--(5.009,17.546)--(4.609,17.546)--cycle;
					\\draw [color=black , dotted, line width = 0.4](4.609,10.649)--(4.609,10.281);
					\\draw [color=black , dotted, line width = 0.4](4.609,10.281)--(5.009,10.281);
					\\draw [color=black , dotted, line width = 0.4](5.009,10.281)--(5.009,10.649);
					\\draw [color=black , dotted, line width = 0.4](5.009,10.649)--(4.609,10.649);
					\\draw [color=black , dotted, line width = 0.4](4.609,10.649)--(4.609,10.281)--(5.009,10.281)--(5.009,10.649)--(4.609,10.649)--cycle;
					\\end{tikzpicture} \n\t \\end{minipage}`
					
					texte_corr = num_alpha(0) + ` L'aire de base du cône est : $\\pi \\times R^2$ cm${exposant(2)} $= \\pi \\times ${tex_nombre(r)}^2$ cm${exposant(2)} $= ${tex_nombrec(r * r)}\\pi$ cm${exposant(2)} $\\approx ${tex_nombrec(arrondi(r * r * Math.PI))}$ cm${exposant(2)}.<br>`
					texte_corr += num_alpha(1) + ` Le volume du cône est $\\dfrac{A_\\text{base}}{3}\\times \\text{hauteur}$ cm${exposant(3)} $= \\dfrac{${tex_nombrec(r * r)}\\pi}{3} \\times ${tex_nombre(h1)}$ cm${exposant(3)} $= \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)} $\\approx ${tex_nombrec(arrondi(r * r * h1 * Math.PI / 3))}$ cm${exposant(3)}.<br>`
					texte_corr += num_alpha(2) + ` La section est une réduction de la base de coefficient $\\dfrac{${tex_nombre(h2)}}{${tex_nombre(h1)}}`
					if (!Number.isInteger(h1) || pgcd(h2, h1) > 1) texte_corr += `=${tex_fraction_reduite(h2 * 10, h1 * 10)}$.<br>`
					else texte_corr += `.$<br>`
					texte_corr += `Dans une réduction de coefficient k, les aires sont multipliés par k${exposant(2)}.<br>`
					texte_corr += `Donc son aire est $\\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^2 \\times ${tex_nombrec(r * r)}\\pi$ cm${exposant(2)} $=${tex_fraction_reduite(arrondi(h2 * h2 * 100 * r * r), arrondi(h1 * h1 * 100))}\\pi$ cm${exposant(2)} $\\approx${tex_nombrec(arrondi(h2 * h2 * r * r * Math.PI / h1 / h1))}$ cm${exposant(2)}.<br>`
					texte_corr += num_alpha(3) + ` Dans une réduction de coefficient k, les volumes sont multipliés par k${exposant(3)}.<br>`
					texte_corr += `Donc le volume du cône de hauteur SO' est : $\\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^3 \\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)} $\\approx ${tex_nombrec(arrondi(Math.PI * h2 ** 3 * r * r / h1 ** 2 / 3))}$ cm${exposant(3)} '.<br>`
					texte_corr += num_alpha(4) + ` Le volume du tronc de cône est : `
					texte_corr += `$V_\\text{Cône} - V_\\text{CôneRéduit}$<br>Soit : <br>$\\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)}$ - \\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^3 \\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)} `
					texte_corr += `$ = \\left(1-\\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^3\\right)\\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)} `
					texte_corr += `$ = \\left(1-\\dfrac{${fraction_simplifiee(h2 * 10, h1 * 10)[0] ** 3}}{${fraction_simplifiee(h2 * 10, h1 * 10)[1] ** 3}}\\right)\\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)} `
					texte_corr += `$ = \\dfrac{${fraction_simplifiee(h2 * 10, h1 * 10)[1] ** 3 - fraction_simplifiee(h2 * 10, h1 * 10)[0] ** 3}}{${fraction_simplifiee(h2 * 10, h1 * 10)[1] ** 3}}\\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)} `
					texte_corr += `$ \\approx ${tex_nombrec(arrondi((fraction_simplifiee(h2 * 10, h1 * 10)[1] ** 3 - fraction_simplifiee(h2 * 10, h1 * 10)[0] ** 3) * r * r * h1 * Math.PI / (fraction_simplifiee(h2 * 10, h1 * 10)[1] ** 3 * 3)))}$ cm${exposant(3)}<br>`
					this.MG32codeBase64 = codeBase64
					this.MG32code_pour_modifier_la_figure = `
							 mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r", "${r}");
							 mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h1", "${h1}");
							 mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h2", "${h2}");							 
							 mtg32App.calculate("MG32svg${numero_de_l_exercice}");
							 mtg32App.display("MG32svg${numero_de_l_exercice}");
							 `
					break;
				case 3: // calcul de l'aire de base, du volume d'une pyramide à base triangulaire. puis, calcul de la section, du volume de la petite pyramide et du volume du tronc
					c = calcul(randint(30, 60) / 10)
					c2 = calcul(randint(30, 60) / 10)
					h1 = calcul(randint(12, 20) / 2)
					h2 = randint(3, Math.floor(h1) - 1)
					if (this.sup2<3)
					if (this.sup2==1) // coefficient de réduction décimal
						while (calcul(h2/h1)!=arrondi(h2/h1,1)) {
							c = calcul(randint(30, 60) / 10)
							c2 = calcul(randint(30, 60) / 10)
							h1 = calcul(randint(12, 20) / 2)
							h2 = randint(3, Math.floor(h1) - 1)
						}
					else //coefficient de réduction rationnel
						while (calcul(h2/h1)==arrondi(h2/h1,1)) {
							c = calcul(randint(30, 60) / 10)
							c2 = calcul(randint(30, 60) / 10)
							h1 = calcul(randint(12, 20) / 2)
							h2 = randint(3, Math.floor(h1) - 1)
						}	
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAANmcmH###8BAP8BAAAAAAAAAAAFHAAAAtIAAAAAAAAAAAAAAAEAAAEg#####wAAAAEACkNDYWxjQ29uc3QA#####wACcGkAFjMuMTQxNTkyNjUzNTg5NzkzMjM4NDb#####AAAAAQAKQ0NvbnN0YW50ZUAJIftURC0Y#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAAEAAAAEAIAAAAAAAAAAAAAAAAAAAFAAFAf2gAAAAAAEB5uFHrhR64#####wAAAAEAB0NDYWxjdWwA#####wAFbWluaTEAAzAuMgAAAAE#yZmZmZmZmgAAAAMA#####wAFbWF4aTEAATMAAAABQAgAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAHQ3Vyc2V1cgAAAAUAAAAFAAAAAwAAAAIAAAADAAAAAf####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQAAAAAEAQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQEAAAAEAAAAAAAQAAAAwAgAAAAAAAA#8AAAAAAAAAUAAUBMgAAAAAAAAAAABf####8AAAABAAtDSG9tb3RoZXRpZQAAAAAEAAAAAf####8AAAABAApDT3BlcmF0aW9uA#####8AAAABAA9DUmVzdWx0YXRWYWxldXIAAAACAAAACAEAAAAJAAAAAgAAAAkAAAAD#####wAAAAEAC0NQb2ludEltYWdlAAAAAAQBAAAAAA0AAk82AMAQAAAAAAAAQBAAAAAAAAAFAAAAAAYAAAAHAAAABwAAAAAEAAAAAQAAAAgDAAAACAEAAAABP#AAAAAAAAAAAAAJAAAAAgAAAAgBAAAACQAAAAMAAAAJAAAAAgAAAAoAAAAABAEAAAAADQACSTUAwAAAAAAAAABACAAAAAAAAAUAAAAABgAAAAn#####AAAAAQAIQ1NlZ21lbnQBAAAABAAAAAAAEAAAAQEBAAAAAQAAAAYAAAAGAQAAAAQAAAAAARAAAmsxAMAAAAAAAAAAQAAAAAAAAAABAAE#0xZ0xZ0xZwAAAAv#####AAAAAgAPQ01lc3VyZUFic2Npc3NlAQAAAAQABHpvb20AAAAIAAAACgAAAAz#####AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAQAAAAQBAAAAAAAAAAAAAAAAwBgAAAAAAAAAAAAMDwAB####AAAAAQAAAAIAAAABAAAAAAAAAAAAAAAAAgAAAA0AAAADAP####8AAmMnAAE0AAAAAUAQAAAAAAAAAAAAAwD#####AAJoMQACMTAAAAABQCQAAAAAAAAAAAADAP####8AAmgyAAE0AAAAAUAQAAAAAAAAAAAAAwD#####AAJoMwAFaDEtaDIAAAAIAQAAAAkAAAAQAAAACQAAABEAAAADAP####8AAWMAATMAAAABQAgAAAAAAAAAAAACAP####8AAAAAAA8AAU8AwCgAAAAAAABAEAAAAAAAAAUAAUBrEAAAAAAAQH3YUeuFHrgAAAAFAP####8BAAAAABAAAAEAAQAAABQBP#MzMzMzMzMAAAACAP####8BAAAAAQ8AAk8yAQUAAUCBFAAAAAAAQGPQo9cKPXEAAAACAP####8BAAAAAQ8AAk8zAQUAAUCBJAAAAAAAQG3wo9cKPXEAAAAFAP####8BAAAAABAAAAEAAQAAABcBP#MzMzMzMzMAAAACAP####8BAAAAAQ8AAk80AQUAAUCBHAAAAAAAQHS4UeuFHrgAAAAFAP####8BAAAAABAAAAEAAQAAABkBP#MzMzMzMzMAAAAFAP####8BAAAAARAAAAEAAQAAABYAP#AAAAAAAAAAAAAGAP####8BAAAAAQ8AAkoyAQUAAMBCAAAAAAAAAAAAG#####8AAAABAAlDQ2VyY2xlT0EA#####wB#f38BAQAAABYAAAAc#####wAAAAEADENUcmFuc2xhdGlvbgD#####AAAAFgAAABwAAAAKAP####8BAAAAABAAAAEFAAAAABcAAAAeAAAADgD#####AH9#fwEBAAAAFwAAAB######AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAAGAAAACD#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAENAAJJMwEFAAEAAAAh#####wAAAAEAD0NQb2ludExpZUNlcmNsZQD#####AAAAAAEPAAJLMgEBAAFAAGSoGqf0lgAAAB0AAAASAP####8AAAAAAQ8AAkszAQEAAUAWHME9jCZzAAAAIAAAAAsA#####wAAAAAAEAAAAQABAAAAFgAAABwAAAALAP####8AAAAAABAAAAEAAQAAABYAAAAjAAAACwD#####AAAAAAAQAAABAAEAAAAXAAAAIgAAAAsA#####wAAAAAAEAAAAQABAAAAFwAAACT#####AAAAAgATQ01lc3VyZUFuZ2xlT3JpZW50ZQD#####AAZhbmdwaGkAAAAcAAAAFgAAACMAAAATAP####8AB2FuZ3RldGEAAAAiAAAAFwAAACQAAAADAP####8AA3BoaQAGYW5ncGhpAAAACQAAACkAAAADAP####8ABXRoZXRhAAdhbmd0ZXRhAAAACQAAACoAAAAHAP####8AAAAZ#####wAAAAIACUNGb25jdGlvbgQAAAAJAAAAKwAAAAMA#####wADeCcxAApzaW4odGhldGEpAAAAFAMAAAAJAAAALAAAAAMA#####wADeScxABQtY29zKHRoZXRhKSpzaW4ocGhpKQAAAAgBAAAAAQAAAAAAAAAAAAAACAIAAAAUBAAAAAkAAAAsAAAAFAMAAAAJAAAAKwAAAAMA#####wADeCcyAApjb3ModGhldGEpAAAAFAQAAAAJAAAALAAAAAMA#####wADeScyABNzaW4odGhldGEpKnNpbihwaGkpAAAACAIAAAAUAwAAAAkAAAAsAAAAFAMAAAAJAAAAK#####8AAAACABNDTWFycXVlQW5nbGVPcmllbnRlAP####8AAAD#AAIAAAAAQDzMlF2JcmgAAAAcAAAAFgAAACMB#####wAAAAEADENCaXNzZWN0cmljZQD#####AQAA#wAQAAABAQEAAAAcAAAAFgAAACMAAAAGAP####8BAAD#ABAAAAEFAAFAgM#j0J2QXQAAADP#####AAAAAgAGQ0xhdGV4AP####8AAAD#AMAQAAAAAAAAwBQAAAAAAAAAAAA0EQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAB1x2YXJwaGkAAAAVAP####8AfwAAAAIAAAAAQDxTDia4t4kAAAAiAAAAFwAAACQBAAAAFgD#####AX8AAAAQAAABAQEAAAAiAAAAFwAAACQAAAAGAP####8BfwAAABAAAAEFAAFAfSZmyCoB2wAAADcAAAAXAP####8AfwAAAMAUAAAAAAAAwCYAAAAAAAAAAAA4EQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAClx2YXJ0aGV0YSAAAAAFAP####8BAAAAARAAAAEAAQAAABkAP#AAAAAAAAAAAAAGAP####8AAAAAAQ8AAko0AQUAAcBGLhR64UewAAAAOgAAAA4A#####wBmZmYAAQAAABkAAAA7AAAAEgD#####AQAAAAAQAAABBQABP#CX6bp5AmEAAAA8AAAABQD#####AQAAAAAQAAABAAEAAAA9AD#zMzMzMzMz#####wAAAAEAEENJbnREcm9pdGVEcm9pdGUA#####wEAAAAAEAAAAQUAAAAAGgAAAD4AAAAQAP####8AAAAaAAAAPAAAABEA#####wEAAAABDQACSTQBBQABAAAAQP####8AAAACAAdDUmVwZXJlAP####8AAAAAAQEAAAAZAAAAQQAAADsAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAAKAP####8BAAAAABAAAAEFAAAAADsAAAAtAAAABwD#####AAAAPwAAABQEAAAACQAAACsAAAAKAP####8BAAAAABAAAAEFAAAAAD0AAABE#####wAAAAIADUNMaWV1RGVQb2ludHMA#####wAAf38BAQAAAEUAAABkAAAAAAA9AAAABQAAAD0AAAA+AAAAPwAAAEQAAABF#####wAAAAEACENWZWN0ZXVyAP####8AAAD#ABAAAAEAAQAAABkAAABDAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABAAAAEFAAAAAEIAAAAJAAAALgAAAAkAAAAvAAAAHAD#####AQAAAAAQAAABBQAAAABCAAAACQAAADAAAAAJAAAAMQAAABsA#####wD#AAAAEAAAAQABAAAAGQAAAEgAAAAAGwD#####AAB#AAAQAAABAAEAAAAZAAAASQAAAAAaAP####8AZmZmAQEAAABIAAAAZAAAAAAAJAAAAAYAAAAkAAAAKgAAACwAAAAuAAAALwAAAEj#####AAAAAQAMQ1N1cmZhY2VMaWV1AP####8Af39#AAAABQAAAEwAAAAdAP####8Af39#AAAABQAAAEYAAAACAP####8BAAAAAA8AAVoAAAAAAAAAAABACAAAAAAAAAUAAUB2qAAAAAAAQFEhR64UeuIAAAAFAP####8BAAAAARAAAAEBAQAAAE8BP#AAAAAAAAAAAAAPAP####8AAAAXAAAAIgAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAE8AAABR#####wAAAAEADUNEZW1pRHJvaXRlT0EA#####wH#AAAADQAAAQEBAAAATwAAAFIAAAAFAP####8B#wAAARAAAAEAAQAAAE8AP#AAAAAAAAD#####AAAAAQALQ1NpbWlsaXR1ZGUA#####wAAAE8AAAABQFaAAAAAAAAAAAABP9MzMzMzMzMAAAAKAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABSAAAAVQAAAB8A#####wAAAE######AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAAAAAAAT#TMzMzMzMzAAAACgD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAUgAAAFcAAAALAP####8B#wAAABAAAAEAAQAAAFYAAABY#####wAAAAIADENDb21tZW50YWlyZQD#####AP8AAAH#####EEB#qAAAAAAAQHpoUeuFHrgCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAARaT09N#####wAAAAEABUNGb25jAP####8ABHplcm8ADWFicyh0KTwwLjAwMDEAAAAIBAAAABQA#####wAAAAIAEUNWYXJpYWJsZUZvcm1lbGxlAAAAAAAAAAE#Gjbi6xxDLQABdAAAAAcA#####wAAABQAAAABP+AAAAAAAAAAAAAHAP####8AAABPAAAACQAAAA0AAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABSAAAAXf####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAPAAFVAMAQAAAAAAAAwDcAAAAAAAIFAAAAAF7#####AAAAAQAJQ0xvbmd1ZXVyAP####8AAABPAAAAX#####8AAAACAAlDQ2VyY2xlT1IA#####wEAAAABAQAAABQAAAABP#AAAAAAAAAAAAAAEAD#####AAAAFQAAAGEAAAARAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAYgAAABEA#####wEAAAAADwACSTIAAAAAAAAAAABACAAAAAAAAAUAAQAAAGIAAAAkAP####8BAAAAAAsAAkkxAMAQAAAAAAAAQBAAAAAAAAAFAAAAAGT#####AAAAAQAJQ0Ryb2l0ZUFCAP####8BAAAAAA0AAAEAAQAAABQAAABl#####wAAAAEAFkNEcm9pdGVQZXJwZW5kaWN1bGFpcmUA#####wEAAAAAEAAAAQABAAAAFAAAAGYAAAAOAP####8BAAAAAAEAAAAUAAAAZQAAABAA#####wAAAGcAAABoAAAAEQD#####AQAAAAALAAJKMQDAKAAAAAAAAMAQAAAAAAAABQACAAAAaQAAABkA#####wCAgIABAQAAABQAAABlAAAAagAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAAAAABwA#####wEAAAAADwABSwBAEAAAAAAAAMA3AAAAAAAABQAAAABrAAAAAQAAAAAAAAAAAAAAFAQAAAAJAAAAKwAAABwA#####wEAAAAADwABSQDAEAAAAAAAAD#wAAAAAAAABQAAAABrAAAACQAAAC4AAAAJAAAALwAAABwA#####wEAAAAADwABSgEFAAAAAGsAAAAJAAAAMAAAAAkAAAAxAAAAHgD#####AQAAAAANAAABAQEAAAAUAAAAbQAAAB4A#####wEAAAAADQAAAQEBAAAAFAAAAG4AAAAeAP####8BAAAAAA0AAAEBAQAAABQAAABsAAAAGwD#####Af8AAAAQAAABAAEAAAAUAAAAbQAAAAAbAP####8BAH8AABAAAAEAAQAAABQAAABuAAAAABsA#####wEAAP8AEAAAAQABAAAAFAAAAGwA#####wAAAAEAEUNQb2ludFBhckFic2Npc3NlAP####8BAAAAAA8AAUEAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAAG0AAAAJAAAAEwAAACkA#####wEAAAAADwABQgAAAAAAAAAAAEAIAAAAAAAABQAAAAAUAAAAbgAAAAkAAAAPAAAAKQD#####AQAAAAAPAAFTAAAAAAAAAAAAQAgAAAAAAAAFAAAAABQAAABsAAAACQAAABAAAAApAP####8AAAAAAA8AAk8nAAAAAAAAAAAAQAgAAAAAAAAFAAAAABQAAABsAAAACQAAABIAAAALAP####8AAAAAABAAAAEBAQAAAHUAAAAUAAAACwD#####AAAAAAAQAAABAQEAAAAUAAAAdgAAAAsA#####wAAAAAAEAAAAQEBAAAAdgAAAHUAAAALAP####8AAAAAABAAAAEBAQAAAHcAAAB1AAAACwD#####AAAAAAAQAAABAQEAAAB3AAAAdgAAAAcA#####wAAAHcAAAAIAwAAAAkAAAARAAAACQAAABAAAAAKAP####8BAAAAAA8AAkEnAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHUAAAB+AAAACgD#####AQAAAAAPAAJCJwAAAAAAAAAAAEAIAAAAAAAABQAAAAB2AAAAfgAAAAsA#####wAAAAAAEAAAAQEBAAAAfwAAAHgAAAALAP####8AAAAAABAAAAEBAQAAAHgAAACAAAAACwD#####AAAAAAAQAAABAQEAAAB#AAAAgAAAAAQA#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAQAAAAMAAAB2AAAAdQAAABQAAAAWAAAAAIQBAAAAABAAAAEAAQAAABQAAAB1AAAAdgAAAAYAAAAAhAEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAAIUAAAATAQAAAIQABGFuZzEAAAB2AAAAdQAAABQAAAAEAP####8AF01lc3VyZSBkJ2FuZ2xlIG9yaWVudMOpAAAAAgAAAAEAAAADAAAAFAAAAHUAAAB3AAAAFgAAAACIAQAAAAAQAAABAAEAAAB3AAAAdQAAABQAAAAGAAAAAIgBAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzBQABQGk+QpYO3ckAAACJAAAAEwEAAACIAARhbmcyAAAAFAAAAHUAAAB3AAAABAD#####ABdNZXN1cmUgZCdhbmdsZSBvcmllbnTDqQAAAAIAAAABAAAAAwAAAHcAAAB1AAAAdgAAABYAAAAAjAEAAAAAEAAAAQABAAAAdgAAAHUAAAB3AAAABgAAAACMAQAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwUAAUBpPkKWDt3JAAAAjQAAABMBAAAAjAAEYW5nMwAAAHcAAAB1AAAAdgAAAAMA#####wAEc29tQQAOYW5nMSthbmcyK2FuZzMAAAAIAAAAAAgAAAAACQAAAIcAAAAJAAAAiwAAAAkAAACPAAAAAwD#####AAlTQXZpc2libGUADDEvemVybyhzb21BKQAAAAgDAAAAAT#wAAAAAAAA#####wAAAAEADkNBcHBlbEZvbmN0aW9uAAAAWwAAAAkAAACQAAAABwD#####AAAAdwAAAAkAAACRAAAACgD#####Af8AAAANAAJBMQAAAAAAAAAAAEAIAAAAAAAABQAAAAB1AAAAkgAAAAsA#####wAAAAAAEAAAAQACAAAAdwAAAJMAAAAEAP####8AF01lc3VyZSBkJ2FuZ2xlIG9yaWVudMOpAAAAAgAAAAEAAAADAAAAdwAAAHYAAAAUAAAAFgAAAACVAQAAAAAQAAABAAEAAAAUAAAAdgAAAHcAAAAGAAAAAJUBAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzBQABQGk+QpYO3ckAAACWAAAAEwEAAACVAARhbmc0AAAAdwAAAHYAAAAUAAAABAD#####ABdNZXN1cmUgZCdhbmdsZSBvcmllbnTDqQAAAAIAAAABAAAAAwAAAHUAAAB2AAAAdwAAABYAAAAAmQEAAAAAEAAAAQABAAAAdwAAAHYAAAB1AAAABgAAAACZAQAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwUAAUBpPkKWDt3JAAAAmgAAABMBAAAAmQAEYW5nNQAAAHUAAAB2AAAAdwAAAAQA#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAQAAAAMAAAAUAAAAdgAAAHUAAAAWAAAAAJ0BAAAAABAAAAEAAQAAAHUAAAB2AAAAFAAAAAYAAAAAnQEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAAJ4AAAATAQAAAJ0ABGFuZzYAAAAUAAAAdgAAAHUAAAADAP####8ABHNvbUIADmFuZzQrYW5nNSthbmc2AAAACAAAAAAIAAAAAAkAAACYAAAACQAAAJwAAAAJAAAAoAAAAAMA#####wAJU0J2aXNpYmxlAAwxL3plcm8oc29tQikAAAAIAwAAAAE#8AAAAAAAAAAAACoAAABbAAAACQAAAKEAAAAHAP####8AAAB3AAAACQAAAKIAAAAKAP####8BAAAAAA0AAkIxAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHYAAACjAAAACwD#####AAAAAAAQAAABAAIAAAB3AAAApAAAAAQA#####wAXTWVzdXJlIGQnYW5nbGUgb3JpZW50w6kAAAACAAAAAQAAAAMAAAB3AAAAFAAAAHUAAAAWAAAAAKYBAAAAABAAAAEAAQAAAHUAAAAUAAAAdwAAAAYAAAAApgEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMFAAFAaT5Clg7dyQAAAKcAAAATAQAAAKYABGFuZzcAAAB3AAAAFAAAAHUAAAAEAP####8AF01lc3VyZSBkJ2FuZ2xlIG9yaWVudMOpAAAAAgAAAAEAAAADAAAAdQAAABQAAAB2AAAAFgAAAACqAQAAAAAQAAABAAEAAAB2AAAAFAAAAHUAAAAGAAAAAKoBAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzBQABQGk+QpYO3ckAAACrAAAAEwEAAACqAARhbmc4AAAAdQAAABQAAAB2AAAABAD#####ABdNZXN1cmUgZCdhbmdsZSBvcmllbnTDqQAAAAIAAAABAAAAAwAAAHYAAAAUAAAAdwAAABYAAAAArgEAAAAAEAAAAQABAAAAdwAAABQAAAB2AAAABgAAAACuAQAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwUAAUBpPkKWDt3JAAAArwAAABMBAAAArgAFYW5nMTAAAAB2AAAAFAAAAHcAAAADAP####8ABHNvbU8AD2FuZzcrYW5nOCthbmcxMAAAAAgAAAAACAAAAAAJAAAAqQAAAAkAAACtAAAACQAAALEAAAADAP####8ACVNPdmlzaWJsZQAMMS96ZXJvKHNvbU8pAAAACAMAAAABP#AAAAAAAAAAAAAqAAAAWwAAAAkAAACyAAAABwD#####AAAAdwAAAAkAAACzAAAACgD#####AQAAAAANAAJPMQAAAAAAAAAAAEAIAAAAAAAABQAAAAAUAAAAtAAAAAsA#####wAAAAAAEAAAAQACAAAAdwAAALUAAAAnAP####8BAAAAABAAAAEAAQAAAHYAAAAUAAAAJwD#####AQAAAAAQAAABAAEAAAB1AAAAFAAAACcA#####wEAAAAAEAAAAQABAAAAdgAAAHUAAAALAP####8AAAAAABAAAAEBAQAAAHcAAAAUAAAAGAD#####AQAAAAAQAAJ3MQAAAAAAAAAAAEAIAAAAAAAABQAAAAC4AAAAfQAAAAwA#####wAEYWJzMQAAAHYAAAB3AAAAu#####8AAAABAA5DVGVzdEV4aXN0ZW5jZQD#####AAZ0ZXN0T0EAAAC8AAAAAwD#####AAlPQXZpc2libGUADDEvKDEtdGVzdE9BKQAAAAgDAAAAAT#wAAAAAAAAAAAACAEAAAABP#AAAAAAAAAAAAAJAAAAvQAAABgA#####wEAAAAAEAACdzIAAAAAAAAAAABACAAAAAAAAAUAAAAAtgAAALkAAAAMAP####8ABGFiczIAAAAUAAAAdwAAAL8AAAArAP####8ABnRlc3RBQgAAAMAAAAADAP####8ACUFCdmlzaWJsZQAMMS8oMS10ZXN0QUIpAAAACAMAAAABP#AAAAAAAAAAAAAIAQAAAAE#8AAAAAAAAAAAAAkAAADBAAAAGAD#####AQAAAAAQAAJ3MwAAAAAAAAAAAEAIAAAAAAAABQAAAAB8AAAAtwAAAAwA#####wAEYWJzMwAAAHUAAAB3AAAAwwAAACsA#####wAGdGVzdE9CAAAAxAAAAAMA#####wAJT0J2aXNpYmxlAAwxLygxLXRlc3RPQikAAAAIAwAAAAE#8AAAAAAAAAAAAAgBAAAAAT#wAAAAAAAAAAAACQAAAMUAAAAHAP####8AAAB3AAAACQAAAL4AAAAKAP####8BAAAAABAAAkEyAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHUAAADHAAAACwD#####AAAAAAAQAAABAAIAAADIAAAAFAAAAAcA#####wAAAHcAAAAJAAAAwgAAAAoA#####wEAAAAAEAACQjIAAAAAAAAAAABACAAAAAAAAAUAAAAAdgAAAMoAAAALAP####8BAAAAABAAAAEAAgAAAMsAAAB1AAAABwD#####AAAAdwAAAAkAAADGAAAACgD#####AQAAAAAQAAJCMwAAAAAAAAAAAEAIAAAAAAAABQAAAAB2AAAAzQAAAAsA#####wAAAAAAEAAAAQACAAAAzgAAABQAAAAKAP####8BAAAAABAAAkE0AAAAAAAAAAAAQAgAAAAAAAAFAAAAAH8AAADKAAAACwD#####AAAAAAAQAAABAAIAAADQAAAAgAAAAAoA#####wEAAAAAEAACQjQAAAAAAAAAAABACAAAAAAAAAUAAAAAgAAAAM0AAAALAP####8AAAAAABAAAAEAAgAAANIAAAB4AAAACgD#####AQAAAAAQAAJPNQAAAAAAAAAAAEAIAAAAAAAABQAAAAB4AAAAxwAAAAsA#####wAAAAAAEAAAAQACAAAA1AAAAH######AAAAAQAOQ0NlbnRyZUdyYXZpdGUA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAH8AAAB4AAAAgAAAAAcA#####wAAANYAAAABP#TMzMzMzM0AAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAB#AAAA1wAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHgAAADXAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAgAAAANcAAAAhAP####8AAAAAAMAkAAAAAAAAwCQAAAAAAAAAAADYEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAABCNHQScAAAAhAP####8AAAAAAMAAAAAAAAAAwBgAAAAAAAAAAADaEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAABCNHQicAAAAhAP####8AAAAAAD#wAAAAAAAAwDEAAAAAAAAAAADZEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAABCNHTycAAAAsAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAB1AAAAFAAAAHYAAAAHAP####8AAADeAAAAAT#zMzMzMzMzAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAdQAAAN8AAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAB2AAAA3wAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAABQAAADfAAAAIQD#####AAAAAADAOQAAAAAAAMAoAAAAAAAAAAAAdRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAMjR0EAAAAhAP####8AAAAAAMAQAAAAAAAAwCAAAAAAAAAAAADhEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAyNHQgAAACEA#####wAAAAAAwBgAAAAAAADAIgAAAAAAAAAAAOIQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAADI0dPAAAACgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAbgAAAFwAAAAKAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABtAAAAXAAAAAsA#####wB#f38AEAAAAQEBAAAAFAAAAOYAAAAPAP####8AAAAUAAAA5wAAAAsA#####wB#f38AEAAAAQEBAAAA5wAAABQAAAAPAP####8AAAAUAAAA5gAAAAoA#####wF#f38AEAAAAEAIAAAAAAAAAAAAAAAAAAAFAAAAAOcAAADrAAAACwD#####AH9#fwAQAAABAQEAAADnAAAA7AAAAAsA#####wB#f38AEAAAAQEBAAAA7AAAAOb#####AAAAAQAJQ1BvbHlnb25lAP####8Af39#AQEAAAAFAAAA5gAAABQAAADnAAAA7AAAAOYAAAAKAP####8Bf39#ABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAB4AAAA6wAAAAoA#####wF#f38AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHgAAADpAAAACwD#####AH9#fwAQAAABAQEAAAB4AAAA8AAAAA8A#####wAAAHgAAADxAAAACwD#####AH9#fwAQAAABAQEAAADxAAAAeAAAAA8A#####wAAAHgAAADwAAAACgD#####AX9#fwAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAAAA8QAAAPUAAAALAP####8Af39#ABAAAAEBAQAAAPEAAAD2AAAACwD#####AH9#fwAQAAABAQEAAAD2AAAA8AAAAC0A#####wB#f38BAQAAAAUAAADwAAAAeAAAAPEAAAD2AAAA8AAAAAoA#####wF#f38AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAGwAAABcAAAADwD#####AAAAFAAAAPoAAAAKAP####8Bf39#ABAAAABACAAAAAAAAAAAAAAAAAAABQAAAADmAAAA+wAAAAsA#####wB#f38AEAAAAQEBAAAA+gAAABQAAAALAP####8Af39#ABAAAAEBAQAAAOYAAAD8AAAACwD#####AH9#fwAQAAABAQEAAAD8AAAA+gAAAC0A#####wB#f38BAQAAAAUAAAD6AAAAFAAAAOYAAAD8AAAA+gAAAA8A#####wAAABQAAADnAAAACgD#####AX9#fwAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAAAA+gAAAQEAAAALAP####8Af39#ABAAAAEBAQAAAPoAAAECAAAACwD#####AH9#fwAQAAABAQEAAAECAAAA5wAAAC0A#####wB#f38BAQAAAAUAAADnAAAAFAAAAPoAAAECAAAA5wAAAAoA#####wF#f38AEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHgAAAD7AAAADwD#####AAAAeAAAAQYAAAAKAP####8Bf39#ABAAAABACAAAAAAAAAAAAAAAAAAABQAAAADwAAABBwAAAAsA#####wB#f38AEAAAAQEBAAABBgAAAHgAAAALAP####8Af39#ABAAAAEBAQAAAPAAAAEIAAAACwD#####AH9#fwAQAAABAQEAAAEIAAABBgAAAC0A#####wB#f38BAQAAAAUAAAEGAAAAeAAAAPAAAAEIAAABBgAAAA8A#####wAAAHgAAADxAAAACgD#####AX9#fwAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAAABBgAAAQ0AAAALAP####8Af39#ABAAAAEBAQAAAQYAAAEOAAAACwD#####AH9#fwAQAAABAQEAAAEOAAAA8QAAAC0A#####wB#f38BAQAAAAUAAADxAAAAeAAAAQYAAAEOAAAA8QAAAC0A#####wD#AAABAQAAAAQAAAB#AAAAgAAAAHgAAAB######wAAAAEAEENTdXJmYWNlUG9seWdvbmUA#####wD#AAAAAAAFAAABEgAAAC0A#####wAAfwABAQAAAAQAAAB1AAAAdgAAABQAAAB1AAAALgD#####AAAA#wAAAAUAAAEUAAAACgD#####AQAA#wAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAdwAAAPsAAAAhAP####8AAAAAAMAwAAAAAAAAwCIAAAAAAAAAAAEWEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAyNHUwAAACkA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAHgAAAB3AAAAAT#TMzMzMzMzAAAAKQD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAFAAAAHgAAAABP9mZmZmZmZoAAAANAP####8AAAAAAMAoAAAAAAAAwB#######+AAAAEYEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAQAAABEAAAANAP####8AAAAAAMAuAAAAAAAAwCAAAAAAAAAAAAEZEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAQAAABIAAAApAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAB1AAAAFAAAAAE#2ZmZmZmZmgAAACkA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAABQAAAB2AAAAAT#jMzMzMzMzAAAADQD#####AAAAAADAHAAAAAAAAMA2AAAAAAAAAAABHBAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAATAAAADQD#####AAAAAAC#8AAAAAAAAMAzAAAAAAAAAAABHRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAIAAAAPAAAAYP##########"
					if (!sortie_html) texte = `\\begin{minipage}{0.7 \\linewidth} \n\t`
					else texte=``
					texte += `SOAB est une pyramide à base triangulaire de hauteur SO${sp()}=${sp()}${tex_nombre(h1)}${sp()}cm.<br> Sa base est un triangle OAB rectangle en O tel que OA${sp()}=${sp()}${tex_nombre(c)}${sp()}cm et OB${sp()}=${sp()}${tex_nombre(c2)}${sp()}cm.<br>`
					texte += ` Le point O' est situé sur la hauteur [SO] à ${h2}${sp()}cm de S.`
					texte += `<br>Un plan parallèle à la face OAB passant par O' coupe la pyramide en formant la section O'A'B'.<br>`
					if (!sortie_html) texte +=`La figure n'est pas en vraie grandeur.<br>`
					texte += num_alpha(0) + ` Calculer l'` + katex_Popup2(numero_de_l_exercice + i * 4, 1, "aire de base de la pyramide", `Formule : Aire d'un triangle rectangle`, `$Aire=\\dfrac{\\text{c}\\times\\text{c'}}{2}$`) + `.<br>`
					texte += num_alpha(1) + ` Calculer le ` + katex_Popup2(numero_de_l_exercice + i * 4 + 1, 1, "volume de la pyramide", `Formule : volume d'une pyramide d'aire de base $B$ et de hauteur h`, `$Volume= \\dfrac{B \\times \\text{h}}{3}$`) + ` SOAB.<br>`
					texte += num_alpha(2) + ` En déduire l'aire de la ` + katex_Popup2(numero_de_l_exercice + i * 4 + 2, 1, "section", `Définition : section plane d'un solide`, `La section d'un solide par un plan est une figure plane.<br>Dans le cas d'une section d'une pyramide par un plan parallèle à sa base, cette section est un polygone qui est une réduction de la base.<br>Dans une réduction de coefficient k, les aires sont multipliées par k${exposant(2)} et les volumes sont multipliés par k${exposant(3)}.`) + ` O'A'B' sachant que SO'${sp()}=${sp()}${h2}${sp()}cm.<br>`
					texte += num_alpha(3) + ` Calculer le volume de la pyramide SO'A'B'.<br>`
					texte += num_alpha(4) + ` Calculer le volume du tronc de la pyramide (partie de la pyramide située entre la base et la section).`
					if (sortie_html) texte += `<br>Le point O peut être déplacé et on peut changer l'angle de vue &#x3C6; `
					else texte+=`\n\t \\end{minipage} \n\t \\begin{minipage}{0.3 \\linewidth} \n\t \\begin{tikzpicture}[scale=0.8]
					\\definecolor{hhhhhh}{rgb}{0,0,0}
					\\definecolor{phphph}{rgb}{0.5,0.5,0.5}
					\\definecolor{ofofof}{rgb}{0.5,0.5,0.5}
					\\definecolor{ffhhhh}{rgb}{1,0,0}
					\\definecolor{hhofhh}{rgb}{0,0.5,0}
					\\definecolor{hhhhff}{rgb}{0,0,1}
					\\clip (8.05,0) rectangle (0,12.08);
					\\fill[color=black] (3.878,2.24) circle (0.054);
					\\node at (3.341, 2.562) [align=left,inner sep = 0pt, outer sep = 0pt,below right,black,font= \\sf \\fontsize {0.376cm} {0.47cm} \\selectfont] {$\\text{O}$};
					\\fill[color=black] (3.878,7.567) circle (0.054);
					\\node at (3.663, 7.889) [align=left,inner sep = 0pt, outer sep = 0pt,below right,black,font= \\sf \\fontsize {0.376cm} {0.47cm} \\selectfont] {$\\text{O'}$};
					\\draw [color=black , dotted, line width = 0.4](1.822,1.235)--(3.878,2.24);
					\\draw [color=black , dotted, line width = 0.4](3.878,2.24)--(6.791,0.978);
					\\draw [color=black , dotted, line width = 0.4](6.791,0.978)--(1.822,1.235);
					\\draw [color=black , dotted, line width = 0.4](3.878,11.118)--(1.822,1.235);
					\\draw [color=black , dotted, line width = 0.4](3.878,11.118)--(6.791,0.978);
					\\draw [color=black , dotted, line width = 0.4](3.055,7.165)--(3.878,7.567);
					\\draw [color=black , dotted, line width = 0.4](3.878,7.567)--(5.043,7.062);
					\\draw [color=black , dotted, line width = 0.4](3.055,7.165)--(5.043,7.062);
					\\draw [color=black , line width = 0.8](3.878,11.118)--(1.822,1.235);
					\\draw [color=black , line width = 0.8](3.878,11.118)--(6.791,0.978);
					\\draw [color=black , dotted, line width = 0.4](3.878,11.118)--(3.878,2.24);
					\\draw [color=black , line width = 0.8](3.055,7.165)--(5.043,7.062);
					\\node at (2.345, 7.43) [align=left,below right ,black,,font= \\sf \\fontsize {0.403cm} {0.503cm} \\selectfont] {\\textbf{A'}};
					\\node at (5.278, 7.27) [align=left,below right ,black,,font= \\sf \\fontsize {0.403cm} {0.503cm} \\selectfont] {\\textbf{B'}};
					\\node at (1.178, 1.584) [align=left,below right ,black,,font= \\sf \\fontsize {0.403cm} {0.503cm} \\selectfont] {\\textbf{A}};
					\\node at (7.155, 1.145) [align=left,below right ,black,,font= \\sf \\fontsize {0.403cm} {0.503cm} \\selectfont] {\\textbf{B}};
					\\draw [color=ofofof , dotted, line width = 0.4](3.878,2.24)--(4.242,2.083);
					\\draw [color=ofofof , dotted, line width = 0.4](3.535,2.073)--(3.878,2.24);
					\\draw [color=ofofof , dotted, line width = 0.4](3.535,2.073)--(3.899,1.915);
					\\draw [color=ofofof , dotted, line width = 0.4](3.899,1.915)--(4.242,2.083);
					\\draw [color=ofofof , dotted, line width = 0.4](4.242,2.083)--(3.878,2.24)--(3.535,2.073)--(3.899,1.915)--(4.242,2.083)--cycle;
					\\draw [color=ofofof , dotted, line width = 0.4](3.878,7.567)--(4.242,7.409);
					\\draw [color=ofofof , dotted, line width = 0.4](3.535,7.399)--(3.878,7.567);
					\\draw [color=ofofof , dotted, line width = 0.4](3.535,7.399)--(3.899,7.241);
					\\draw [color=ofofof , dotted, line width = 0.4](3.899,7.241)--(4.242,7.409);
					\\draw [color=ofofof , dotted, line width = 0.4](4.242,7.409)--(3.878,7.567)--(3.535,7.399)--(3.899,7.241)--(4.242,7.409)--cycle;
					\\draw [color=ofofof , dotted, line width = 0.4](3.878,2.684)--(3.878,2.24);
					\\draw [color=ofofof , dotted, line width = 0.4](4.242,2.083)--(4.242,2.526);
					\\draw [color=ofofof , dotted, line width = 0.4](4.242,2.526)--(3.878,2.684);
					\\draw [color=ofofof , dotted, line width = 0.4](3.878,2.684)--(3.878,2.24)--(4.242,2.083)--(4.242,2.526)--(3.878,2.684)--cycle;
					\\draw [color=ofofof , dotted, line width = 0.4](3.878,2.684)--(3.535,2.517);
					\\draw [color=ofofof , dotted, line width = 0.4](3.535,2.517)--(3.535,2.073);
					\\draw [color=ofofof , dotted, line width = 0.4](3.535,2.073)--(3.878,2.24)--(3.878,2.684)--(3.535,2.517)--(3.535,2.073)--cycle;
					\\draw [color=ofofof , dotted, line width = 0.4](3.878,8.011)--(3.878,7.567);
					\\draw [color=ofofof , dotted, line width = 0.4](4.242,7.409)--(4.242,7.853);
					\\draw [color=ofofof , dotted, line width = 0.4](4.242,7.853)--(3.878,8.011);
					\\draw [color=ofofof , dotted, line width = 0.4](3.878,8.011)--(3.878,7.567)--(4.242,7.409)--(4.242,7.853)--(3.878,8.011)--cycle;
					\\draw [color=ofofof , dotted, line width = 0.4](3.878,8.011)--(3.535,7.843);
					\\draw [color=ofofof , dotted, line width = 0.4](3.535,7.843)--(3.535,7.399);
					\\draw [color=ofofof , dotted, line width = 0.4](3.535,7.399)--(3.878,7.567)--(3.878,8.011)--(3.535,7.843)--(3.535,7.399)--cycle;
					\\draw [color=ffhhhh , dotted, line width = 0.4](3.055,7.165)--(5.043,7.062)--(3.878,7.567)--(3.055,7.165)--cycle;
					\\fill [color = ffhhhh, opacity = 0.2](3.055,7.165)--(5.043,7.062)--(3.878,7.567)--(3.055,7.165)--cycle;
					\\draw [color=hhofhh , dotted, line width = 0.4](1.822,1.235)--(6.791,0.978)--(3.878,2.24)--(1.822,1.235)--cycle;
					\\fill [color = hhhhff, opacity = 0.2](1.822,1.235)--(6.791,0.978)--(3.878,2.24)--(1.822,1.235)--cycle;
					\\node at (3.395, 11.857) [align=left,below right ,black,,font= \\sf \\fontsize {0.403cm} {0.503cm} \\selectfont] {\\textbf{S}};
					\\end{tikzpicture} \n\t \\end{minipage}`
					
					texte_corr = num_alpha(0) + ` L'aire de base de la pyramide est : $\\dfrac{${tex_nombre(c)}\\times${tex_nombre(c2)}}{2}$ cm${exposant(2)} $= ${tex_nombrec(c * c2 / 2)}$ cm${exposant(2)}.<br>`
					texte_corr += num_alpha(1) + ` Le volume de la pyramide est : $\\dfrac{A_\\text{base} \\times \\text{hauteur}}{3}$ cm${exposant(3)} $= \\dfrac{${tex_nombrec(c * c2 / 2)}\\times ${tex_nombre(h1)}}{3}$ cm${exposant(3)} $\\approx ${tex_nombrec(arrondi(c * c2 * h1 / 6))}$ cm${exposant(3)}.<br>`
					texte_corr += num_alpha(2) + ` La section est une réduction de la base de coefficient $\\dfrac{${h2}}{${tex_nombre(h1)}}`
					if (!Number.isInteger(h1) || pgcd(h2, h1) > 1) texte_corr += `=${tex_fraction_reduite(h2 * 10, h1 * 10)}$.<br>`
					else texte_corr += `.$<br>`
					texte_corr += `Dans une réduction de coefficient k, les aires sont multipliés par k${exposant(2)}.<br>`
					texte_corr += `Donc son aire est $\\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^2 \\times ${tex_nombre(c * c2 / 2)}$ cm${exposant(2)} $=${tex_fraction_reduite(arrondi(h2 * h2 * 100 * c * c2), arrondi(h1 * h1 * 200))}$ cm${exposant(2)} $\\approx ${tex_nombrec(arrondi(h2 * h2 * c * c2 / h1 / h1 / 2, 2))}$ cm${exposant(2)}.<br>`
					texte_corr += num_alpha(3) + ` Dans une réduction de coefficient k, les volumes sont multipliés par k${exposant(3)}.<br>`
					texte_corr += `Donc le volume de la pyramide SO'A'B' est : $\\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^3 \\times \\dfrac{${tex_nombrec(c * c2 * h1 / 2)}}{3}$ cm${exposant(3)} $\\approx ${tex_nombrec(arrondi(h2 ** 3 * c * c2 / h1 ** 2 / 6))}$ cm${exposant(3)} '.<br>`
					texte_corr += num_alpha(4) + ` Le volume du tronc de la pyramide est : `
					texte_corr += `$V_\\text{SABCD} - V_\\text{SA'B'C'D'}$<br>Soit : <br>$${tex_nombrec(arrondi(c * c2 * h1 / 6))}$ cm${exposant(3)}$ - ${tex_nombrec(arrondi(h2 ** 3 * c * c2 / h1 ** 2 / 6))}$ cm${exposant(3)}$ \\approx ${tex_nombrec(arrondi(c * c2 * h1 / 6 - h2 ** 3 * c * c2 / h1 ** 2 / 6, 2))}$ cm${exposant(3)}.<br>`
					texte_corr += `Ce qui représente $${tex_fraction_reduite(1000 * (h1 ** 3 - h2 ** 3), 1000 * h1 ** 3)}$ du volume de SABCD.`

					this.MG32codeBase64 = codeBase64
					this.MG32code_pour_modifier_la_figure = `
							mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c", "${c}");
							mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h1", "${h1}");
							mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h2", "${h2}");
							mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "c'", "${c2}");							
							mtg32App.calculate("MG32svg${numero_de_l_exercice}");
							mtg32App.display("MG32svg${numero_de_l_exercice}");
							`
					break;
				case 4: // Un tronc de cône étant donné (seau), calcul de la hauteur du cône dont il est issu, de son volume, puis du volume du seau. Lecture graphique du volume d'eau à mi hauteur et calcul de ce volume
	
					r = calcul(randint(15, 20) / 10)
					r2 = calcul(randint(11, r * 10 - 3) / 10)
					h3 = calcul(randint(10, 15) / 5)
					h2 = calcul(r2 * h3 / (r - r2))
					h1 = calcul(h2 + h3)
					while (calcul(h2/h1)!=arrondi(h2/h1,1)||calcul((h3/2+h2)/h1)!=arrondi((h3/2+h2)/h1,1)) { // on impose des coefficients de réduction décimaux dans cet exercice.
							r = calcul(randint(15, 20) / 10)
							r2 = calcul(randint(11, r * 10 - 3) / 10)
							h3 = calcul(randint(10, 15) / 5)
							h2 = calcul(r2 * h3 / (r - r2))
							h1 = calcul(h2 + h3)
					}
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+qPXDAANmcmH###8BAP8BAAAAAAAAAAAFHAAAAtIAAAAAAAAAAAAAAAEAAAE8#####wAAAAEACkNDYWxjQ29uc3QA#####wACcGkAFjMuMTQxNTkyNjUzNTg5NzkzMjM4NDb#####AAAAAQAKQ0NvbnN0YW50ZUAJIftURC0Y#####wAAAAEACkNQb2ludEJhc2UA#####wEAAAAAEAAAAEAIAAAAAAAAAAAAAAAAAAAFAABAIwAAAAAAAEB7iFHrhR64#####wAAAAEAB0NDYWxjdWwA#####wAFbWluaTMAAzAuMgAAAAE#yZmZmZmZmgAAAAMA#####wAFbWF4aTMAATIAAAABQAAAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAHQ3Vyc2V1cgAAAAUAAAAFAAAAAwAAAAIAAAADAAAAAf####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQAAAAAEAQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQEAAAAEAQAAAAAQAAAAwAgAAAAAAAA#8AAAAAAAAAUAAUBLgAAAAAAAAAAABf####8AAAABAAtDSG9tb3RoZXRpZQAAAAAEAAAAAf####8AAAABAApDT3BlcmF0aW9uA#####8AAAABAA9DUmVzdWx0YXRWYWxldXIAAAACAAAACAEAAAAJAAAAAgAAAAkAAAAD#####wAAAAEAC0NQb2ludEltYWdlAAAAAAQBAAAAAA0AAk8xAMAQAAAAAAAAQBAAAAAAAAAFAAAAAAYAAAAHAAAABwAAAAAEAAAAAQAAAAgDAAAACAEAAAABP#AAAAAAAAAAAAAJAAAAAgAAAAgBAAAACQAAAAMAAAAJAAAAAgAAAAoAAAAABAEAAAAADQACSTEAwAAAAAAAAABACAAAAAAAAAUAAAAABgAAAAn#####AAAAAQAIQ1NlZ21lbnQBAAAABAAAAAAAEAAAAQEBAAAAAQAAAAYAAAAGAQAAAAQAAAAAARAAAmsxAMAAAAAAAAAAQAAAAAAAAAABAAE#0p5BKeQSngAAAAv#####AAAAAgAPQ01lc3VyZUFic2Npc3NlAQAAAAQABHpvb20AAAAIAAAACgAAAAz#####AAAAAQAPQ1ZhbGV1ckFmZmljaGVlAQAAAAQBAAAAAAAAAAAAAAAAwBgAAAAAAAAAAAAMDwAB####AAAAAQAAAAIAAAABAAAAAAAAAAAAAAAAAgAAAA0AAAADAP####8ABVJtaW5pAAIxNQAAAAFALgAAAAAAAAAAAAMA#####wAFUm1heGkAAjIwAAAAAUA0AAAAAAAAAAAAAwD#####AAZSbWF4aScAB1JtYXhpLTUAAAAIAQAAAAkAAAAQAAAAAUAUAAAAAAAAAAAAAwD#####AAVIbWF4aQACMzAAAAABQD4AAAAAAAAAAAADAP####8ABUhtaW5pAAIyMAAAAAFANAAAAAAAAAAAAAIA#####wAAAAAAEAAAAEAIAAAAAAAAAAAAAAAAAAAFAABAbJAAAAAAAECANCj1wo9cAAAAAwD#####AARwYXM0AAExAAAAAT#wAAAAAAAAAAAAAwD#####AAhwYXNncmFkNAABNQAAAAFAFAAAAAAAAAAAAAQA#####wAHQ3Vyc2V1cgAAAA4AAAAHAAAABQAAABMAAAASAAAAFQAAABYAAAAUAAAABQAAAAAXAQAAAAAQAAABAAEAAAAUAT#wAAAAAAAAAAAABgEAAAAXAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAEBhgAAAAAAAAAAAGAAAAAMAAAAAFwAHbmJncmFkMAAdaW50KChIbWF4aS1IbWluaSkvcGFzNCswLjUpKzEAAAAIAP####8AAAACAAlDRm9uY3Rpb24CAAAACAAAAAAIAwAAAAgBAAAACQAAABIAAAAJAAAAEwAAAAkAAAAVAAAAAT#gAAAAAAAAAAAAAT#wAAAAAAAAAAAAAwAAAAAXAApuYmdyYWRwYXMwACFpbnQoKEhtYXhpLUhtaW5pKS9wYXNncmFkNCswLjUpKzEAAAAIAAAAAA4CAAAACAAAAAAIAwAAAAgBAAAACQAAABIAAAAJAAAAEwAAAAkAAAAWAAAAAT#gAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEAC0NQb2ludENsb25lAAAAABcBAAAAAAsAAk8xAMA4AAAAAAAAP#AAAAAAAAABAAAAABQAAAALAQAAABcAAAAAABAAAAEAAQAAABwAAAAZ#####wAAAAEAFkNEcm9pdGVQZXJwZW5kaWN1bGFpcmUAAAAAFwEAAAAAEAAAAQABAAAAHAAAAB0AAAAGAAAAABcBAAAAAAsAAkoxAMA2AAAAAAAAwC4AAAAAAAABAAG#vhkUx7D9WQAAAB4AAAAHAAAAABcAAAAcAAAACAMAAAAJAAAAFQAAAAgBAAAACQAAABIAAAAJAAAAEwAAAAoAAAAAFwEAAAAACwACSTEAAAAAAAAAAABAAAAAAAAAAAEAAAAAGQAAACD#####AAAAAgAHQ1JlcGVyZQAAAAAXAAAAAAEBAAAAHAAAACEAAAAfAAAAAAAACQAAABMAAAABAAAAAAAAAAAAAAAJAAAAFQAAAAE#8AAAAAAAAAAAAAYAAAAAFwEAAAAACwACVzEAwCAAAAAAAADAOwAAAAAAAAUAAT#hGDFObkU6AAAAHf####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUBAAAAFwAAAAAAAAAjAAAACQAAABoAAAAjAAAAAgAAACMAAAAj#####wAAAAIACENNZXN1cmVYAAAAABcABGFic3cAAAAiAAAAIwAAAAMAAAAAFwAHYWJzd0FycgAjaW50KGFic3cqMTAwMDAwMDAwMCswLjUpLzEwMDAwMDAwMDAAAAAIAwAAAA4CAAAACAAAAAAIAgAAAAkAAAAlAAAAAUHNzWUAAAAAAAAAAT#gAAAAAAAAAAAAAUHNzWUAAAAAAAAADQAAAAAXAQAAAAAAAAAAAAAAAEAYAAAAAAAAAAAAIwsAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAAkAAAAmAAAAEgEAAAAXAAAAAAAAACcAAAAJAAAAGwAAACMAAAAEAAAAIwAAACUAAAAmAAAAJ#####8AAAABAA1DUG9pbnRCYXNlRW50AQAAABcAAAAAARAAAlQzAAAAAAAAAAAAQAgAAAAAAAABAAEAAAAiQCAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABMAAAAJAAAAEgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABMAAAAAFwAFbWVzYWIAAAAiAAAAKQAAAAMBAAAAFwACaDUAJGludChtZXNhYioxMDAwMDAwMDAwKzAuNSkvMTAwMDAwMDAwMAAAAAgDAAAADgIAAAAIAAAAAAgCAAAACQAAACoAAAABQc3NZQAAAAAAAAABP+AAAAAAAAAAAAABQc3NZQAAAAAAAAANAQAAABcAAAAAAAAAAAAAAAAAwCAAAAAAAAAAAAApDwAB####AAAAAQAAAAIAAAABAAAAAAAAAAAABUJIID0gAAMgY20JAAAAKwAAAAMA#####wAGUm1pbmknAAIxMAAAAAFAJAAAAAAAAAAAAAIA#####wAAAAAAEAAAAEAIAAAAAAAAAAAAAAAAAAAFAABAbLAAAAAAAEB9eFHrhR64AAAAAwD#####AARwYXMyAAExAAAAAT#wAAAAAAAAAAAAAwD#####AAhwYXNncmFkMgABNQAAAAFAFAAAAAAAAAAAAAQA#####wAHQ3Vyc2V1cgAAAA4AAAAHAAAABQAAAC0AAAARAAAALwAAADAAAAAuAAAABQAAAAAxAQAAAAAQAAABAAEAAAAuAT#wAAAAAAAAAAAABgEAAAAxAAAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAEBhgAAAAAAAAAAAMgAAAAMAAAAAMQAHbmJncmFkMAAfaW50KChSbWF4aSctUm1pbmknKS9wYXMyKzAuNSkrMQAAAAgAAAAADgIAAAAIAAAAAAgDAAAACAEAAAAJAAAAEQAAAAkAAAAtAAAACQAAAC8AAAABP+AAAAAAAAAAAAABP#AAAAAAAAAAAAADAAAAADEACm5iZ3JhZHBhczAAI2ludCgoUm1heGknLVJtaW5pJykvcGFzZ3JhZDIrMC41KSsxAAAACAAAAAAOAgAAAAgAAAAACAMAAAAIAQAAAAkAAAARAAAACQAAAC0AAAAJAAAAMAAAAAE#4AAAAAAAAAAAAAE#8AAAAAAAAAAAAA8AAAAAMQEAAAAACwACTzEAwDgAAAAAAAA#8AAAAAAAAAEAAAAALgAAAAsBAAAAMQAAAAAAEAAAAQABAAAANgAAADMAAAAQAAAAADEBAAAAABAAAAEAAQAAADYAAAA3AAAABgAAAAAxAQAAAAALAAJKMQDANgAAAAAAAMAuAAAAAAAAAQABv74ZFMew#VkAAAA4AAAABwAAAAAxAAAANgAAAAgDAAAACQAAAC8AAAAIAQAAAAkAAAARAAAACQAAAC0AAAAKAAAAADEBAAAAAAsAAkkxAAAAAAAAAAAAQAAAAAAAAAABAAAAADMAAAA6AAAAEQAAAAAxAAAAAAEBAAAANgAAADsAAAA5AAAAAAAACQAAAC0AAAABAAAAAAAAAAAAAAAJAAAALwAAAAE#8AAAAAAAAAAAAAYAAAAAMQEAAAAACwACVzEAwCAAAAAAAADAOwAAAAAAAAUAAT#hGDFObkU6AAAANwAAABIBAAAAMQAAAAAAAAA9AAAACQAAADQAAAA9AAAAAgAAAD0AAAA9AAAAEwAAAAAxAARhYnN3AAAAPAAAAD0AAAADAAAAADEAB2Fic3dBcnIAI2ludChhYnN3KjEwMDAwMDAwMDArMC41KS8xMDAwMDAwMDAwAAAACAMAAAAOAgAAAAgAAAAACAIAAAAJAAAAPwAAAAFBzc1lAAAAAAAAAAE#4AAAAAAAAAAAAAFBzc1lAAAAAAAAAA0AAAAAMQEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAD0LAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAJAAAAQAAAABIBAAAAMQAAAAAAAABBAAAACQAAADUAAAA9AAAABAAAAD0AAAA#AAAAQAAAAEEAAAAUAQAAADEAAAAAARAAAVQAAAAAAAAAAABACAAAAAAAAAEAAQAAADxAFAAAAAAAAAAAAAAAAAAAAAAAAAAJAAAALQAAAAkAAAARAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwAAAAAxAAVtZXNhYgAAADwAAABDAAAAAwEAAAAxAAJyMwAkaW50KG1lc2FiKjEwMDAwMDAwMDArMC41KS8xMDAwMDAwMDAwAAAACAMAAAAOAgAAAAgAAAAACAIAAAAJAAAARAAAAAFBzc1lAAAAAAAAAAE#4AAAAAAAAAAAAAFBzc1lAAAAAAAAAA0BAAAAMQAAAAAAAAAAAAAAAADAIAAAAAAAAAAAAEMPAAH###8AAAABAAAAAgAAAAEAAAAAAAAAAAAFQkEgPSAAAyBjbQkAAABFAAAAAgD#####AAAAAAAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAEBs8AAAAAAAQHo4UeuFHrgAAAADAP####8ABW1pbmkxAAVSbWluaQAAAAkAAAAPAAAAAwD#####AAVtYXhpMQAFUm1heGkAAAAJAAAAEAAAAAMA#####wAEcGFzMQABMQAAAAE#8AAAAAAAAAAAAAMA#####wAIcGFzZ3JhZDEAATUAAAABQBQAAAAAAAAAAAAEAP####8AB0N1cnNldXIAAAAOAAAABwAAAAUAAABIAAAASQAAAEoAAABLAAAARwAAAAUAAAAATAEAAAAAEAAAAQABAAAARwE#8AAAAAAAAAAAAAYBAAAATAAAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAABAYYAAAAAAAAAAAE0AAAADAAAAAEwAB25iZ3JhZDAAHWludCgobWF4aTEtbWluaTEpL3BhczErMC41KSsxAAAACAAAAAAOAgAAAAgAAAAACAMAAAAIAQAAAAkAAABJAAAACQAAAEgAAAAJAAAASgAAAAE#4AAAAAAAAAAAAAE#8AAAAAAAAAAAAAMAAAAATAAKbmJncmFkcGFzMAAhaW50KChtYXhpMS1taW5pMSkvcGFzZ3JhZDErMC41KSsxAAAACAAAAAAOAgAAAAgAAAAACAMAAAAIAQAAAAkAAABJAAAACQAAAEgAAAAJAAAASwAAAAE#4AAAAAAAAAAAAAE#8AAAAAAAAAAAAA8AAAAATAEAAAAACwACTzEAwDgAAAAAAAA#8AAAAAAAAAEAAAAARwAAAAsBAAAATAAAAAAAEAAAAQABAAAAUQAAAE4AAAAQAAAAAEwBAAAAABAAAAEAAQAAAFEAAABSAAAABgAAAABMAQAAAAALAAJKMQDANgAAAAAAAMAuAAAAAAAAAQABv74ZFMew#VkAAABTAAAABwAAAABMAAAAUQAAAAgDAAAACQAAAEoAAAAIAQAAAAkAAABJAAAACQAAAEgAAAAKAAAAAEwBAAAAAAsAAkkxAAAAAAAAAAAAQAAAAAAAAAABAAAAAE4AAABVAAAAEQAAAABMAAAAAAEBAAAAUQAAAFYAAABUAAAAAAAACQAAAEgAAAABAAAAAAAAAAAAAAAJAAAASgAAAAE#8AAAAAAAAAAAAAYAAAAATAEAAAAACwACVzEAwCAAAAAAAADAOwAAAAAAAAUAAT#hGDFObkU6AAAAUgAAABIBAAAATAAAAAAAAABYAAAACQAAAE8AAABYAAAAAgAAAFgAAABYAAAAEwAAAABMAARhYnN3AAAAVwAAAFgAAAADAAAAAEwAB2Fic3dBcnIAI2ludChhYnN3KjEwMDAwMDAwMDArMC41KS8xMDAwMDAwMDAwAAAACAMAAAAOAgAAAAgAAAAACAIAAAAJAAAAWgAAAAFBzc1lAAAAAAAAAAE#4AAAAAAAAAAAAAFBzc1lAAAAAAAAAA0AAAAATAEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAFgLAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAJAAAAWwAAABIBAAAATAAAAAAAAABcAAAACQAAAFAAAABYAAAABAAAAFgAAABaAAAAWwAAAFwAAAAUAQAAAEwAAAAAARAAAlQxAAAAAAAAAAAAQAgAAAAAAAABAAEAAABXQBQAAAAAAAAAAAAAAAAAAAAAAAAACQAAAEgAAAAJAAAASQAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABMAAAAATAAFbWVzYWIAAABXAAAAXgAAAAMBAAAATAACcjIAJGludChtZXNhYioxMDAwMDAwMDAwKzAuNSkvMTAwMDAwMDAwMAAAAAgDAAAADgIAAAAIAAAAAAgCAAAACQAAAF8AAAABQc3NZQAAAAAAAAABP+AAAAAAAAAAAAABQc3NZQAAAAAAAAANAQAAAEwAAAAAAAAAAAAAAAAAwCAAAAAAAAAAAABeDwAB####AAAAAQAAAAIAAAABAAAAAAAAAAAABEhMID0AAyBjbQkAAABgAAAAAwD#####AAJoMwAFaDUvMTAAAAAIAwAAAAkAAAArAAAAAUAkAAAAAAAAAAAAAwD#####AAJyJwAFcjMvMTAAAAAIAwAAAAkAAABFAAAAAUAkAAAAAAAAAAAAAwD#####AAFyAAVyMi8xMAAAAAgDAAAACQAAAGAAAAABQCQAAAAAAAAAAAADAP####8AAmgyAAxyJypoMy8oci1yJykAAAAIAwAAAAgCAAAACQAAAGMAAAAJAAAAYgAAAAgBAAAACQAAAGQAAAAJAAAAYwAAAAIA#####wAAAAABDAABUwDALgAAAAAAAMAiAAAAAAAABQABQFugAAAAAABAfOhR64UeuAAAAAcA#####wAAAGYAAAAJAAAAZQAAAAcA#####wAAAGYAAAAJAAAADQAAAAMA#####wAISGVhdU1pbmkAATAAAAABAAAAAAAAAAAAAAACAP####8AAAAAABAAAABACAAAAAAAAAAAAAAAAAAABQAAQGxQAAAAAABAgfwo9cKPXAAAAAMA#####wAEcGFzNQABMQAAAAE#8AAAAAAAAAAAAAQA#####wAHQ3Vyc2V1cgAAAAoAAAAGAAAABAAAAGkAAAArAAAAawAAAGoAAAAFAAAAAGwBAAAAABAAAAEAAQAAAGoBP#AAAAAAAAAAAAAGAQAAAGwAAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAQGGAAAAAAAAAAABtAAAAAwAAAABsAAduYmdyYWQwAB1pbnQoKGg1LUhlYXVNaW5pKS9wYXM1KzAuNSkrMQAAAAgAAAAADgIAAAAIAAAAAAgDAAAACAEAAAAJAAAAKwAAAAkAAABpAAAACQAAAGsAAAABP+AAAAAAAAAAAAABP#AAAAAAAAAAAAAPAAAAAGwBAAAAAAsAAk8xAMA4AAAAAAAAP#AAAAAAAAABAAAAAGoAAAALAQAAAGwAAAAAABAAAAEAAQAAAHAAAABuAAAAEAAAAABsAQAAAAAQAAABAAEAAABwAAAAcQAAAAYAAAAAbAEAAAAACwACSjEAwDYAAAAAAADALgAAAAAAAAEAAb++GRTHsP1ZAAAAcgAAAAcAAAAAbAAAAHAAAAAIAwAAAAkAAABrAAAACAEAAAAJAAAAKwAAAAkAAABpAAAACgAAAABsAQAAAAALAAJJMQAAAAAAAAAAAEAAAAAAAAAAAQAAAABuAAAAdAAAABEAAAAAbAAAAAABAQAAAHAAAAB1AAAAcwAAAAAAAAkAAABpAAAAAQAAAAAAAAAAAAAACQAAAGsAAAABP#AAAAAAAAAAAAAGAAAAAGwBAAAAAAsAAlcxAMAgAAAAAAAAwDsAAAAAAAAFAAE#4RgxTm5FOgAAAHEAAAASAQAAAGwAAAAAAAAAdwAAAAkAAABvAAAAdwAAAAIAAAB3AAAAdwAAABQBAAAAbAAAAAABEAACVDIAAAAAAAAAAABACAAAAAAAAAEAAQAAAHZAIAAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAaQAAAAkAAAArAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwAAAABsAAVtZXNhYgAAAHYAAAB5AAAAAwEAAABsAAJoZQAkaW50KG1lc2FiKjEwMDAwMDAwMDArMC41KS8xMDAwMDAwMDAwAAAACAMAAAAOAgAAAAgAAAAACAIAAAAJAAAAegAAAAFBzc1lAAAAAAAAAAE#4AAAAAAAAAAAAAFBzc1lAAAAAAAAAA0BAAAAbAAAAAAAAAAAAAAAAADAIAAAAAAAAAAAAHkPAAH###8AAAABAAAAAgAAAAEAAAAAAAAAAAARIEhhdXRldXIgZCdlYXUgPSAAAyBjbQkAAAB7AAAAAwD#####AAhIZWF1TWF4aQACaDUAAAAJAAAAKwAAAAMA#####wAFbWluaTIAC0hlYXVNaW5pKjEwAAAACAIAAAAJAAAAaQAAAAFAJAAAAAAAAAAAAAMA#####wAFbWF4aTIACEhlYXVNYXhpAAAACQAAAH0AAAADAP####8ABHBhczMAATEAAAABP#AAAAAAAAAAAAADAP####8ACHBhc2dyYWQzAAE1AAAAAUAUAAAAAAAAAAAAAwD#####AAJoMQAFaDIraDMAAAAIAAAAAAkAAABlAAAACQAAAGL#####AAAAAgAMQ0NvbW1lbnRhaXJlAP####8AAAAAAMAxAAAAAAAAwCgAAAAAAAAAAABmEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAyNHUwAAAAMA#####wAEaGVhdQAFaGUvMTAAAAAIAwAAAAkAAAB7AAAAAUAkAAAAAAAAAAAABQD#####AQAAAAAQAAABAQEAAABmAD#qqqqqqqqrAAAABgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAcBGMzMzMzMpAAAAhQAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAIYAAABo#####wAAAAEADkNQb2ludExpZVBvaW50AP####8B#wAAAQwAAkknAQUAAAAAhwAAAAoA#####wEAAAABCgABQgEFAAAAAIgAAABnAAAACwD#####AAAAAAAQAAABAQEAAABmAAAAif####8AAAABABFDUG9pbnRQYXJBYnNjaXNzZQD#####AQAAAAAQAAJFMQAAAAAAAAAAAEAIAAAAAAAABQAAAABmAAAAiAAAAAgAAAAACQAAAGUAAAAJAAAAhP####8AAAABAAVDRm9uYwD#####AAFmACFwaS8zKigoeCtoMileMyoocicvaDIpXjItcideMipoMikAAAAIAgAAAAgDAAAACQAAAAAAAAABQAgAAAAAAAAAAAAIAQAAAAgC#####wAAAAEACkNQdWlzc2FuY2UAAAAIAP####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAAJAAAAZQAAAAFACAAAAAAAAAAAABkAAAAIAwAAAAkAAABjAAAACQAAAGUAAAABQAAAAAAAAAAAAAAIAgAAABkAAAAJAAAAYwAAAAFAAAAAAAAAAAAAAAkAAABlAAF4AAAABwD#####AAAAZgAAAAkAAACCAAAACgD#####AQAAAAEKAAFIAQUAAAAAiAAAAI0AAAALAP####8AAAAAABAAAAEBAQAAAIkAAACOAAAAFgD#####AAAAAAEKAAFFAQUAAAAAiwAAAAwA#####wAEYWJzMQAAAIkAAACOAAAAkAAAAAMA#####wABeAAMYWJzMSooaDEtaDIpAAAACAIAAAAJAAAAkQAAAAgBAAAACQAAAIIAAAAJAAAAZQAAAAMA#####wABeQAEZih4Kf####8AAAABAA5DQXBwZWxGb25jdGlvbgAAAIwAAAAJAAAAkgAAAAIA#####wAAAAABDAABTwDAKAAAAAAAAEAQAAAAAAAABQABQGsAAAAAAABAdwAAAAAAAAAAAAUA#####wEAAAAAEAAAAQABAAAAlAE#6qqqqqqqqwAAAAYA#####wAAAAABDAABSQDAEAAAAAAAAEAQAAAAAAAABQABQFImZmZmZmYAAACV#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAAMAAABAAEAAACUAAAAlgAAABAA#####wEAAAABEAAAAQABAAAAlAAAAJUAAAAGAP####8AAAAAAQwAAUoAwCYAAAAAAAAAAAAAAAAAAAUAAcAt87ZFocrzAAAAmAAAABwA#####wEAAAAADAAAAQABAAAAlAAAAJkAAAARAP####8AgICAAQEAAACUAAAAlgAAAJkAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP+AAAAAAAAAAAAABP#AAAAAAAAAAAAADAP####8AB25iZ3JhZHgAATYAAAABQBgAAAAAAAAAAAADAP####8AB25iZ3JhZHkAAjMwAAAAAUA+AAAAAAAA#####wAAAAEAE0NBYnNjaXNzZU9yaWdpbmVSZXAA#####wAFYWJzb3IAAACb#####wAAAAEAE0NPcmRvbm5lZU9yaWdpbmVSZXAA#####wAFb3Jkb3IAAACb#####wAAAAEACkNVbml0ZXhSZXAA#####wAGdW5pdGV4AAAAm#####8AAAABAApDVW5pdGV5UmVwAP####8ABnVuaXRleQAAAJv#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####AAAAAAAQAAABBQAAAACbAAAACQAAAJ4AAAAJAAAAnwAAACEA#####wAAAAAAEAAAAQUAAAAAmwAAAAgAAAAACQAAAJ4AAAAJAAAAoAAAAAkAAACfAAAAIQD#####AAAAAAAQAAABBQAAAACbAAAACQAAAJ4AAAAIAAAAAAkAAACfAAAACQAAAKEAAAAHAP####8AAACiAAAACQAAAJwAAAAKAP####8AAAAAABAAAAEFAAAAAKMAAAClAAAABwD#####AAAAogAAAAkAAACdAAAACgD#####AAAAAAAQAAABBQAAAACkAAAApwAAAAsA#####wEAAAAAEAAAAQABAAAAowAAAKYAAAALAP####8BAAAAABAAAAEAAQAAAKQAAACoAAAABgD#####AAAAAAAKAAFXAMAUAAAAAAAAwDQAAAAAAAAFAAE#3EE7izAqegAAAKkAAAATAP####8ABnhDb29yZAAAAJsAAACrAAAAAwD#####AAVhYnN3MQAGeENvb3JkAAAACQAAAKwAAAASAP####8AZmZmAAAAqwAAAAkAAACcAAAAqwAAAAIAAACrAAAAqwAAAAMA#####wAFYWJzdzIADTIqYWJzb3ItYWJzdzEAAAAIAQAAAAgCAAAAAUAAAAAAAAAAAAAACQAAAJ4AAAAJAAAArQAAACEA#####wEAAAAAEAAAAQUAAAAAmwAAAAkAAACvAAAACQAAAJ######AAAAAgAGQ0xhdGV4AP####8BAAAAAAAAAAAAAAAAQBgAAAAAAAAAAACwCgAB####AAAAAQAAAAAAAAABAAAAAAAAAAAAC1xWYWx7YWJzdzJ9AAAABgD#####AQAAAAAKAAFSAEAgAAAAAAAAwCAAAAAAAAAFAAE#0RtOgbToHwAAAKr#####AAAAAgAIQ01lc3VyZVkA#####wAGeUNvb3JkAAAAmwAAALIAAAADAP####8ABW9yZHIxAAZ5Q29vcmQAAAAJAAAAswAAABIA#####wBmZmYAAACyAAAACQAAAJ0AAACyAAAAAgAAALIAAACyAAAAAwD#####AAVvcmRyMgANMipvcmRvci1vcmRyMQAAAAgBAAAACAIAAAABQAAAAAAAAAAAAAAJAAAAnwAAAAkAAAC0AAAAIQD#####AQAAAAAQAAABBQAAAACbAAAACQAAAJ4AAAAJAAAAtgAAACIA#####wFmZmYAwBwAAAAAAAC#8AAAAAAAAAAAALcKAAH###8AAAACAAAAAQAAAAEAAAAAAAAAAAALXFZhbHtvcmRyMn0AAAAhAP####8BAAAAABAAAAEFAAAAAJsAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAhAP####8AAAAAABAAAAEFAAAAAJsAAAAIAQAAAAkAAACCAAAACQAAAGUAAAABAAAAAAAAAAAAAAALAP####8BAAAAABAAAAEAAQAAALkAAAC6AAAABgD#####AQAAAAAMAAJ4MQEFAAE#4499lAf4#gAAALsAAAATAP####8AB3hDb29yZDEAAACbAAAAvAAAAAMA#####wACeDEAB3hDb29yZDEAAAAJAAAAvQAAAAMA#####wACeTEABWYoeDEpAAAAGwAAAIwAAAAJAAAAvgAAACEA#####wEAAAAAEAAAAQUAAAAAmwAAAAkAAAC+AAAACQAAAL######AAAAAgANQ0xpZXVEZVBvaW50cwD#####AAAA#wACAAAAwAAAAfQAAQAAALwAAAAFAAAAvAAAAL0AAAC+AAAAvwAAAMD#####AAAAAQANQ0RlbWlEcm9pdGVPQQD#####AAAAAAANAAABAAEAAACUAAAAlgAAACEA#####wAAAAAAEAAAAQUAAAAAmwAAAAFACAAAAAAAAAAAAAEAAAAAAAAAAAAAABUA#####wAAAAAAwDYAAAAAAABAOwAAAAAAAAAAAMMOAAH###8AAAACAAAAAAAAAAEAAAAAAAAAAAASTml2ZWF1IGQnZWF1IGVuIGRtAAAAIQD#####AAAAAAAQAAABBQAAAACbAAAAAQAAAAAAAAAAAAAAAUAsAAAAAAAAAAAAJQD#####AAAAAAANAAABAAEAAACUAAAAmQAAAAMA#####wAEeG1pbgABMAAAAAEAAAAAAAAAAAAAAAMA#####wAEeG1heAABMwAAAAFACAAAAAAAAAAAAAMA#####wAEeW1pbgABMAAAAAEAAAAAAAAAAAAAAAMA#####wAEeW1heAACMzAAAAABQD4AAAAAAAAAAAAhAP####8AAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzAgAAAACbAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAwD#####AAJkeAALeG1heC14bWluKzEAAAAIAAAAAAgBAAAACQAAAMgAAAAJAAAAxwAAAAE#8AAAAAAAAAAAAAMA#####wACZHkAC3ltYXgteW1pbisxAAAACAAAAAAIAQAAAAkAAADKAAAACQAAAMkAAAABP#AAAAAAAAAAAAAhAP####8AAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzAgAAAACbAAAACQAAAMcAAAABAAAAAAAAAAAAAAAhAP####8AAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzAgAAAACbAAAACQAAAMgAAAABAAAAAAAAAAAAAAAhAP####8AAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzAgAAAACbAAAAAQAAAAAAAAAAAAAACQAAAMkAAAAhAP####8AAAAAABAAAAAAAAAAAAAAAD#jMzMzMzMzAgAAAACbAAAAAQAAAAAAAAAAAAAACQAAAMoAAAALAP####8AAAAAABAAAAEAAQAAAM4AAADPAAAABgD#####AAAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwIAAT#Ifmt08DKRAAAA0v####8AAAABAAxDVHJhbnNsYXRpb24A#####wAAAMsAAADQAAAACgD#####AQAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwIAAAAA0wAAANQAAAAmAP####8AAADQAAAA0QAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMCAAAAANUAAADWAAAACwD#####AX9#fwAQAAABAQEAAADVAAAA1wAAABIA#####wB#f38AAADYAAAACQAAAMwAAADTAAAABAAAANMAAADVAAAA1wAAANgAAAALAP####8AAAAAABAAAAEAAQAAANEAAADQAAAABgD#####AAAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwIAAT#AzbwzbwzcAAAA2gAAACYA#####wAAAMsAAADOAAAACgD#####AAAAAAAQAAAAAAAAAAAAAAA#4zMzMzMzMwIAAAAA2wAAANwAAAAmAP####8AAADOAAAAzwAAAAoA#####wEAAAAAEAAAAAAAAAAAAAAAP+MzMzMzMzMCAAAAAN0AAADeAAAACwD#####AX9#fwAQAAABAQEAAADdAAAA3wAAABIA#####wB#f38AAADgAAAACQAAAM0AAADbAAAABAAAANsAAADdAAAA3wAAAOAAAAAhAP####8BAAAAABAAAAEFAAAAAJsAAAABP+AAAAAAAAAAAAABQD4AAAAAAAD#####AAAAAQAUQ1RyYW5zbGF0aW9uUGFyQ29vcmQA#####wAAAJsAAAABP#AAAAAAAAAAAAABAAAAAAAAAAAAAAAKAP####8BAAAAABAAAAEFAAAAAOIAAADjAAAACgD#####AQAAAAAQAAABBQAAAADkAAAA4wAAAAsA#####wB#f38AEAAAAQEBAAAAlgAAAOIAAAAKAP####8Af39#ABAAAAEFAAAAAJYAAADjAAAACgD#####AH9#fwAQAAABBQAAAADnAAAA4wAAAAsA#####wB#f38AEAAAAQEBAAAA5wAAAOQAAAALAP####8Af39#ABAAAAEBAQAAAOgAAADlAAAAFQD#####AAAAAABAKgAAAAAAAMAAAAAAAAAAAAAAxQ4AAf###wAAAAAAAAACAAAAAQAAAAAAAAAAABFWb2x1bWUgZCdlYXUgZW4gTAAAAAUA#####wEAAAAAEAAAAQEBAAAAiQE#6qqqqqqqq#####8AAAABAAlDTG9uZ3VldXIA#####wAAAGYAAACI#####wAAAAIACUNDZXJjbGVPUgD#####AQAAAAEBAAAAiQAAAAgDAAAACAIAAAAJAAAAZAAAAAkAAABlAAAACQAAAIIA#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAOwAAADu#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAEAAAAQUAAQAAAO8AAAArAP####8BAAAAABAAAAEFAAIAAADvAAAAAwD#####AAFrAAMxLzQAAAAIAwAAAAE#8AAAAAAAAAAAAAFAEAAAAAAAAP####8AAAABABJDQXJjRGVDZXJjbGVEaXJlY3QA#####wEAAAABAQAAAIkAAADwAAAA8f####8AAAABAA9DUG9pbnRMaWVDZXJjbGUA#####wEAAAAAEAAAAQUAAT#LQPMykWXjAAAA8#####8AAAABAA1DUG9pbnRQcm9qZXRlAP####8BAAAAABAAAAEFAAAAAPQAAADsAAAABwD#####AAAA9QAAAAkAAADyAAAACgD#####AQAAAAAQAAABBQAAAAD0AAAA9gAAACQA#####wAAAAABAQAAAPcAAAAyAAAAAAD0AAAABAAAAPQAAAD1AAAA9gAAAPf#####AAAAAQAPQ1N5bWV0cmllQXhpYWxlAP####8AAADsAAAACgD#####AQAAAAAQAAABBQAAAAD3AAAA+QAAACQA#####wAAAAAAAQAAAPoAAAA8AAAAAAD0AAAABQAAAPQAAAD1AAAA9gAAAPcAAAD6AAAABwD#####AAAAZgAAAAgDAAAACQAAAIIAAAAJAAAAZQAAAAoA#####wEAAAAAEAAAAQUAAAAA8AAAAPwAAAAKAP####8BAAAAABAAAAEFAAAAAPEAAAD8#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAEBAAAAjgAAAP0AAAAtAP####8BAAAAABAAAAEFAAE#5ntWGuQ8wgAAAP8AAAAFAP####8BAAAAABAAAAEBAQAAAI4BP+qqqqqqqqsAAAAuAP####8BAAAAABAAAAEFAAAAAQAAAAEBAAAABwD#####AAABAgAAAAkAAADyAAAACgD#####AQAAAAAQAAABBQAAAAEAAAABAwAAACQA#####wAAAAAAAQAAAQQAAAB4AAAAAAEAAAAABAAAAQAAAAECAAABAwAAAQQAAAALAP####8AAAAAABAAAAEAAQAAAPEAAAD+AAAACwD#####AAAAAAAQAAABAAEAAADwAAAA#QAAABUA#####wAAAAAAwBgAAAAAAADAAAAAAAAAAAAAAI4MAAAAAAACAAAAAQAAAAEAAAAAAAAAAAADI0dIAAAAFQD#####AAAAAABAFAAAAAAAAMAAAAAAAAAAAAAA#QwAAf###wAAAAAAAAABAAAAAQAAAAAAAAAAAAMjR0wAAAALAP####8AAAAAABAAAAEAAQAAAI4AAAD9AAAACwD#####AAAAAAAQAAABAQEAAACJAAAA8AAAABUA#####wAAAAAAwCQAAAAAAABACAAAAAAAAAAAAJAMAAAAAAACAAAAAQAAAAEAAAAAAAAAAAADI0dFAAAABQD#####AQAAAAAQAAABAQEAAACQAT#qqqqqqqqr#####wAAAAEAEENJbnREcm9pdGVEcm9pdGUA#####wEAAAAAEAAAAQUAAAABDQAAAQf#####AAAAAQARQ1N5bWV0cmllQ2VudHJhbGUA#####wAAAJAAAAAKAP####8BAAAAABAAAAEFAAAAAQ4AAAEPAAAALAD#####AQAAAAEBAAAAkAAAAQ4AAAEQAAAALQD#####AQAAAAAQAAABBQABP9E+5jRTgJoAAAERAAAALgD#####AQAAAAAQAAABBQAAAAESAAABDQAAAAcA#####wAAARMAAAAJAAAA8gAAAAoA#####wEAAAAAEAAAAQUAAAABEgAAARQAAAAkAP####8AAAD#AQEAAAEVAAAAPAAAAAABEgAAAAQAAAESAAABEwAAARQAAAEVAAAALwD#####AAABDQAAAAoA#####wEAAP8AEAAAAQUAAAABFQAAARcAAAAkAP####8AAAD#AAEAAAEYAAAAPAAAAAABEgAAAAUAAAESAAABEwAAARQAAAEVAAABGP####8AAAABABFDU3VyZmFjZURldXhMaWV1eAD#####AAB#fwAAAAUAAAD7AAABGQAAADMA#####wAAAP8AAAAFAAABFgAAARkAAAAhAP####8AfwAAABAAAAEFAAAAAJsAAAAJAAAAkgAAAAEAAAAAAAAAAAAAACEA#####wAAAP8ADgABTQDAHAAAAAAAAMA0AAAAAAAABQAAAACbAAAACQAAAJIAAAAJAAAAkwAAACEA#####wAAAP8AEAAAAQUAAAAAmwAAAAEAAAAAAAAAAAAAAAkAAACTAAAAIgD#####AAAA#wDAJgAAAAAAAAAAAAAAAAAAAAABHgwAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAARWKHgpAAAACwD#####AAAAAAAQAAABAQEAAAEeAAABHQAAAAsA#####wAAAAAAEAAAAQEBAAABHQAAARwAAAALAP####8AAAAAABAAAAEBAQAAAJAAAAEOAAAAFQD#####AQAAAABAIAAAAAAAAD#wAAAAAAAAAAABDg4AAAAAAAAAAAABAAAAAQAAAAAAAAAAAAFGAAAAFQD#####AQAAAAH#####DkAwAAAAAAAAQCgAAAAAAAABAf#MzAAAAAAAAAAAAAAAAQAAAAAAAAAAABNDYXB0dXJlciBsZSBwb2ludCBFAAAACwD#####AAAAAAAQAAABAAEAAABmAAAA8AAAAAsA#####wAAAAAAEAAAAQABAAAAZgAAAPEAAAAiAP####8AAAAAAf####8OQCgAAAAAAABASYAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAdFxiZWdpbnthcnJheX17bH0Ke0JBID0gXFZhbHtyJ30gfQpcXCB7eCA9IEJFIFxhcHByb3ggXFZhbHt4fSBcO2RtfQpcXCB7eSA9IFYoeCkgXGFwcHJveCBcVmFse3l9IFw7IGRtXjN9ClxlbmR7YXJyYXl9#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wAAAP8B#####wxAeYAAAAAAAEAYAAAAAAAAAgHMzP8AAAAAAAAAAAAAAAEAAAAAAAAAAAAGVm9pciBTAAAAAAAEAAAAigAAASUAAAEmAAAAgwD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####wxAfiAAAAAAAEAYAAAAAAAAAgHMzP8AAAAAAAAAAAAAAAEAAAAAAAAAAAAIQ2FjaGVyIFMAAAAAAAUAAABmAAAAigAAASUAAAEmAAAAgwAAABUA#####wEAAAAAAAAAAAAAAABAGAAAAAAAAAAAAKsKAAAAAAABAAAAAAAAAAEAAAAAAAAAAAALI1ZhbChhYnN3MSkAAAASAP####8AZmZmAAABKgAAAAkAAACcAAAAqwAAAAQAAACrAAAArAAAAK0AAAEqAAAAFQD#####AWZmZgDAJAAAAAAAAL#wAAAAAAAAAAAAsgoAAAAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIxKQAAABIA#####wBmZmYAAAEsAAAACQAAAJ0AAACyAAAABAAAALIAAACzAAAAtAAAASwAAAAVAP####8AZmZmAMAQAAAAAAAAP#AAAAAAAAAAAACUCgAAAAAAAgAAAAAAAAABAAAAAAAAAAAAATAAAAAVAP####8B#wAAAMA0AAAAAAAAwCYAAAAAAAAAAACIEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAyNHVQAAABUA#####wAAAAAAwCwAAAAAAADAIgAAAAAAAAAAAIkQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAADI0dCAAAAFQD#####AAAAAABACAAAAAAAAMAmAAAAAAAAAAAA8BAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAMjR0EAAAAiAP####8AfwAAAAAAAAAAAAAAQBgAAAAAAAAAAAEcEgAB####AAAAAQAAAAAAAAABAAAAAAAAAAAAAXgAAAAVAP####8A#wAAAf####8QQCUAAAAAAABAfDhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABiNHWk9PTQAAAAMA#####wAIdGVzdGNvbmUABHI9cicAAAAICAAAAAkAAABkAAAACQAAAGMAAAACAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQFqgAAAAAABAgxwo9cKPXAAAAAcA#####wAAAGYAAAAJAAABNAAAAAoA#####wAAAAABEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAATUAAAE2AAAAAwD#####AAtDb25lVmlzaWJsZQAKMS90ZXN0Y29uZQAAAAgDAAAAAT#wAAAAAAAAAAAACQAAATQAAAAHAP####8AAABmAAAACQAAATgAAAAKAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAE1AAABOQAAABUA#####wAAAAABAAABOhAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAClJbCBuJ3kgYSBwYXMgZGUgY8O0bmUgZGFucyBjZXMgY29uZGl0aW9ucwAAAO3##########w=="
					if (!sortie_html) texte = `\\begin{minipage}{0.7 \\linewidth} \n\t`
					else texte=``
					texte += `Un seau a la forme d'un tronc de cône.<br>`
					texte += `Sa hauteur intérieure est de ${tex_nombre(h3)}${sp()}dm, sa petite base a un dimaètre intérieur de ${tex_nombre(r2 * 2)}${sp()}dm et sa grande base (l'ouverture) a un diamètre intérieur de ${tex_nombre(r * 2)}${sp()}dm.<br>`
					if (!sortie_html) texte +=`La figure n'est pas en vraie grandeur.<br>`
					texte += num_alpha(0) + ` Calculer la hauteur du cône obtenu en prolongeant les bords du seau.<br>`
					texte += num_alpha(1) + ` En déduire le volume de ce cône.<br>`
					texte += num_alpha(2) + ` En déduire le volume total du seau.<br>`
					if (sortie_html) texte += `Dans ces deux prochaines questions, on considère qu'on remplit le seau à mi-hauteur d'eau.<br>`
					else texte += num_alpha(3) + ` On remplit le seau à mi-hauteur d'eau. Calculer le volume d'eau correspondant.`
					if (sortie_html) {
						texte += num_alpha(3) + ` Par lecture graphique, après avoir correctement paramétré la figure, lire le volume d'eau correspondant.<br>`
						texte += num_alpha(4) + ` Retrouver ce résultat par le calcul.<br>`
					}
					if (sortie_html) texte += `<br>On peut déplacer le cône avec S et modifier les valeurs avec leurs curseurs respectifs.`
					else texte+=`\n\t \\end{minipage} \n\t \\begin{minipage}{0.3 \\linewidth} \n\t \\begin{tikzpicture}[scale=0.8]
\\definecolor{hhhhhh}{rgb}{0,0,0}
\\definecolor{phphph}{rgb}{0.5,0.5,0.5}
\\definecolor{ffffff}{rgb}{1,1,1}
\\definecolor{hhhhff}{rgb}{0,0,1}
\\definecolor{hhofof}{rgb}{0,0.5,0.5}
\\clip (7.96,0) rectangle (0,12.29);
\\fill[color=black] (3.836,0.278) circle (0.053);
\\node at (3.331, 0.65) [align=left,below right ,black,,font= \\sf \\fontsize {0.398cm} {0.498cm} \\selectfont] {\\textbf{S}};
\\draw [color=black , dotted, line width = 0.4](3.836,0.278)--(3.836,8.678);
\\draw [color=black , dotted, line width = 0.4](3.836,8.678)--(3.836,11.478);
\\fill[color=black] (3.836,9.678) circle (0.053);
\\draw [color=black , dotted, line width = 0.4](5.336,8.678)--(5.333,8.702)--(5.323,8.726)--(5.308,8.75)--(5.287,8.773)--(5.259,8.796)--(5.226,8.819)--(5.187,8.841)--(5.143,8.862)--(5.093,8.883)--(5.038,8.902)--(4.978,8.921)--(4.913,8.939)--(4.844,8.956)--(4.771,8.971)--(4.694,8.986)--(4.613,8.999)--(4.529,9.011)--(4.443,9.021)--(4.354,9.03)--(4.262,9.038)--(4.169,9.044)--(4.075,9.048)--(3.98,9.051)--(3.884,9.053)--(3.788,9.053)--(3.692,9.051)--(3.596,9.048)--(3.502,9.044)--(3.409,9.038)--(3.318,9.03)--(3.228,9.021)--(3.142,9.011)--(3.058,8.999)--(2.977,8.986)--(2.9,8.971)--(2.827,8.956)--(2.758,8.939)--(2.693,8.921)--(2.634,8.902)--(2.579,8.883)--(2.529,8.862)--(2.484,8.841)--(2.445,8.819)--(2.412,8.796)--(2.385,8.773)--(2.363,8.75)--(2.348,8.726)--(2.339,8.702)--(2.336,8.678);

\\draw [color=black , line width = 0.4](5.336,8.678)--(5.334,8.658)--(5.327,8.638)--(5.317,8.619)--(5.302,8.599)--(5.283,8.58)--(5.26,8.56)--(5.233,8.542)--(5.202,8.523)--(5.167,8.505)--(5.128,8.488)--(5.086,8.471)--(5.04,8.455)--(4.99,8.439)--(4.938,8.424)--(4.882,8.41)--(4.823,8.396)--(4.762,8.383)--(4.698,8.371)--(4.631,8.36)--(4.562,8.35)--(4.492,8.341)--(4.419,8.333)--(4.345,8.325)--(4.269,8.319)--(4.192,8.314)--(4.114,8.31)--(4.035,8.307)--(3.955,8.304)--(3.876,8.303)--(3.796,8.303)--(3.716,8.304)--(3.637,8.307)--(3.558,8.31)--(3.48,8.314)--(3.403,8.319)--(3.327,8.325)--(3.252,8.333)--(3.18,8.341)--(3.109,8.35)--(3.04,8.36)--(2.973,8.371)--(2.909,8.383)--(2.848,8.396)--(2.789,8.41)--(2.734,8.424)--(2.681,8.439)--(2.632,8.455)--(2.586,8.471)--(2.543,8.488)--(2.505,8.505)--(2.47,8.523)--(2.439,8.542)--(2.412,8.56)--(2.389,8.58)--(2.37,8.599)--(2.355,8.619)--(2.344,8.638)--(2.338,8.658)--(2.336,8.678);

\\draw [color=black , line width = 0.4](5.836,11.478)--(5.833,11.504)--(5.825,11.53)--(5.811,11.556)--(5.792,11.582)--(5.768,11.608)--(5.738,11.633)--(5.703,11.657)--(5.663,11.682)--(5.618,11.705)--(5.568,11.728)--(5.513,11.751)--(5.454,11.772)--(5.39,11.793)--(5.322,11.813)--(5.25,11.832)--(5.174,11.85)--(5.094,11.867)--(5.011,11.883)--(4.925,11.898)--(4.836,11.911)--(4.744,11.924)--(4.649,11.935)--(4.552,11.945)--(4.454,11.954)--(4.353,11.961)--(4.251,11.967)--(4.149,11.972)--(4.045,11.975)--(3.94,11.978)--(3.836,11.978)--(3.731,11.978)--(3.627,11.975)--(3.523,11.972)--(3.42,11.967)--(3.318,11.961)--(3.218,11.954)--(3.119,11.945)--(3.022,11.935)--(2.928,11.924)--(2.836,11.911)--(2.746,11.898)--(2.66,11.883)--(2.577,11.867)--(2.497,11.85)--(2.421,11.832)--(2.349,11.813)--(2.281,11.793)--(2.218,11.772)--(2.158,11.751)--(2.104,11.728)--(2.054,11.705)--(2.009,11.682)--(1.969,11.657)--(1.934,11.633)--(1.904,11.608)--(1.879,11.582)--(1.86,11.556)--(1.847,11.53)--(1.838,11.504)--(1.836,11.478)--(1.838,11.452)--(1.847,11.426)--(1.86,11.4)--(1.879,11.374)--(1.904,11.349)--(1.934,11.324)--(1.969,11.299)--(2.009,11.275)--(2.054,11.251)--(2.104,11.228)--(2.158,11.206)--(2.218,11.184)--(2.281,11.164)--(2.349,11.144)--(2.421,11.125)--(2.497,11.107)--(2.577,11.09)--(2.66,11.074)--(2.746,11.059)--(2.836,11.045)--(2.928,11.033)--(3.022,11.021)--(3.119,11.011)--(3.218,11.003)--(3.318,10.995)--(3.42,10.989)--(3.523,10.984)--(3.627,10.981)--(3.731,10.979)--(3.836,10.978)--(3.94,10.979)--(4.045,10.981)--(4.149,10.984)--(4.251,10.989)--(4.353,10.995)--(4.454,11.003)--(4.552,11.011)--(4.649,11.021)--(4.744,11.033)--(4.836,11.045)--(4.925,11.059)--(5.011,11.074)--(5.094,11.09)--(5.174,11.107)--(5.25,11.125)--(5.322,11.144)--(5.39,11.164)--(5.454,11.184)--(5.513,11.206)--(5.568,11.228)--(5.618,11.251)--(5.663,11.275)--(5.703,11.299)--(5.738,11.324)--(5.768,11.349)--(5.792,11.374)--(5.811,11.4)--(5.825,11.426)--(5.833,11.452);

\\draw [color=black , line width = 0.4](2.336,8.678)--(1.836,11.478);
\\draw [color=black , line width = 0.4](5.336,8.678)--(5.836,11.478);
\\node at (3.729, 11.531) [align=left,left ,black,,font= \\sf \\fontsize {0.292cm} {0.365cm} \\selectfont] {\\textbf{H}};
\\node at (5.915, 11.531) [align=left,right ,black,fill=ffffff,,font= \\sf \\fontsize {0.292cm} {0.365cm} \\selectfont] {\\textbf{L}};
\\draw [color=black , line width = 0.4](3.836,11.478)--(5.836,11.478);
\\draw [color=black , dotted, line width = 0.4](3.836,8.678)--(5.336,8.678);
\\node at (3.623, 9.599) [align=left,left ,black,,font= \\sf \\fontsize {0.292cm} {0.365cm} \\selectfont] {\\textbf{E}};
\\draw [color=hhhhff , dotted, line width = 0.4](5.514,9.678)--(5.512,9.701)--(5.505,9.723)--(5.493,9.745)--(5.476,9.767)--(5.455,9.789)--(5.429,9.81)--(5.399,9.831)--(5.364,9.852)--(5.325,9.872)--(5.282,9.891)--(5.234,9.91)--(5.183,9.928)--(5.128,9.946)--(5.069,9.963)--(5.007,9.979)--(4.941,9.994)--(4.872,10.008)--(4.8,10.022)--(4.726,10.034)--(4.649,10.045)--(4.57,10.056)--(4.488,10.065)--(4.405,10.073)--(4.32,10.08)--(4.234,10.086)--(4.147,10.091)--(4.058,10.094)--(3.97,10.096)--(3.88,10.098)--(3.791,10.098)--(3.702,10.096)--(3.613,10.094)--(3.525,10.091)--(3.437,10.086)--(3.351,10.08)--(3.266,10.073)--(3.183,10.065)--(3.102,10.056)--(3.022,10.045)--(2.945,10.034)--(2.871,10.022)--(2.799,10.008)--(2.73,9.994)--(2.665,9.979)--(2.602,9.963)--(2.543,9.946)--(2.488,9.928)--(2.437,9.91)--(2.389,9.891)--(2.346,9.872)--(2.307,9.852)--(2.272,9.831)--(2.242,9.81)--(2.216,9.789)--(2.195,9.767)--(2.178,9.745)--(2.167,9.723)--(2.159,9.701)--(2.157,9.678);

\\draw [color=hhhhff , line width = 0.4](5.514,9.678)--(5.512,9.656)--(5.505,9.634)--(5.493,9.611)--(5.476,9.589)--(5.455,9.568)--(5.429,9.546)--(5.399,9.525)--(5.364,9.505)--(5.325,9.485)--(5.282,9.465)--(5.234,9.446)--(5.183,9.428)--(5.128,9.41)--(5.069,9.394)--(5.007,9.378)--(4.941,9.362)--(4.872,9.348)--(4.8,9.335)--(4.726,9.322)--(4.649,9.311)--(4.57,9.301)--(4.488,9.292)--(4.405,9.283)--(4.32,9.276)--(4.234,9.271)--(4.147,9.266)--(4.058,9.262)--(3.97,9.26)--(3.88,9.259)--(3.791,9.259)--(3.702,9.26)--(3.613,9.262)--(3.525,9.266)--(3.437,9.271)--(3.351,9.276)--(3.266,9.283)--(3.183,9.292)--(3.102,9.301)--(3.022,9.311)--(2.945,9.322)--(2.871,9.335)--(2.799,9.348)--(2.73,9.362)--(2.665,9.378)--(2.602,9.394)--(2.543,9.41)--(2.488,9.428)--(2.437,9.446)--(2.389,9.465)--(2.346,9.485)--(2.307,9.505)--(2.272,9.525)--(2.242,9.546)--(2.216,9.568)--(2.195,9.589)--(2.178,9.611)--(2.167,9.634)--(2.159,9.656)--(2.157,9.678);

\\fill[color = hhofof, opacity = 0.33](5.336,8.678)--(5.334,8.658)--(5.327,8.638)--(5.317,8.619)--(5.302,8.599)--(5.283,8.58)--(5.26,8.56)--(5.233,8.542)--(5.202,8.523)--(5.167,8.505)--(5.128,8.488)--(5.086,8.471)--(5.04,8.455)--(4.99,8.439)--(4.938,8.424)--(4.882,8.41)--(4.823,8.396)--(4.762,8.383)--(4.698,8.371)--(4.631,8.36)--(4.562,8.35)--(4.492,8.341)--(4.419,8.333)--(4.345,8.325)--(4.269,8.319)--(4.192,8.314)--(4.114,8.31)--(4.035,8.307)--(3.955,8.304)--(3.876,8.303)--(3.796,8.303)--(3.716,8.304)--(3.637,8.307)--(3.558,8.31)--(3.48,8.314)--(3.403,8.319)--(3.327,8.325)--(3.252,8.333)--(3.18,8.341)--(3.109,8.35)--(3.04,8.36)--(2.973,8.371)--(2.909,8.383)--(2.848,8.396)--(2.789,8.41)--(2.734,8.424)--(2.681,8.439)--(2.632,8.455)--(2.586,8.471)--(2.543,8.488)--(2.505,8.505)--(2.47,8.523)--(2.439,8.542)--(2.412,8.56)--(2.389,8.58)--(2.37,8.599)--(2.355,8.619)--(2.344,8.638)--(2.338,8.658)--(2.336,8.678)--(2.157,9.678)--(2.159,9.656)--(2.167,9.634)--(2.178,9.611)--(2.195,9.589)--(2.216,9.568)--(2.242,9.546)--(2.272,9.525)--(2.307,9.505)--(2.346,9.485)--(2.389,9.465)--(2.437,9.446)--(2.488,9.428)--(2.543,9.41)--(2.602,9.394)--(2.665,9.378)--(2.73,9.362)--(2.799,9.348)--(2.871,9.335)--(2.945,9.322)--(3.022,9.311)--(3.102,9.301)--(3.183,9.292)--(3.266,9.283)--(3.351,9.276)--(3.437,9.271)--(3.525,9.266)--(3.613,9.262)--(3.702,9.26)--(3.791,9.259)--(3.88,9.259)--(3.97,9.26)--(4.058,9.262)--(4.147,9.266)--(4.234,9.271)--(4.32,9.276)--(4.405,9.283)--(4.488,9.292)--(4.57,9.301)--(4.649,9.311)--(4.726,9.322)--(4.8,9.335)--(4.872,9.348)--(4.941,9.362)--(5.007,9.378)--(5.069,9.394)--(5.128,9.41)--(5.183,9.428)--(5.234,9.446)--(5.282,9.465)--(5.325,9.485)--(5.364,9.505)--(5.399,9.525)--(5.429,9.546)--(5.455,9.568)--(5.476,9.589)--(5.493,9.611)--(5.505,9.634)--(5.512,9.656)--(5.514,9.678)--cycle;
\\fill[color = hhhhff, opacity = 0.33](5.514,9.678)--(5.512,9.701)--(5.505,9.723)--(5.493,9.745)--(5.476,9.767)--(5.455,9.789)--(5.429,9.81)--(5.399,9.831)--(5.364,9.852)--(5.325,9.872)--(5.282,9.891)--(5.234,9.91)--(5.183,9.928)--(5.128,9.946)--(5.069,9.963)--(5.007,9.979)--(4.941,9.994)--(4.872,10.008)--(4.8,10.022)--(4.726,10.034)--(4.649,10.045)--(4.57,10.056)--(4.488,10.065)--(4.405,10.073)--(4.32,10.08)--(4.234,10.086)--(4.147,10.091)--(4.058,10.094)--(3.97,10.096)--(3.88,10.098)--(3.791,10.098)--(3.702,10.096)--(3.613,10.094)--(3.525,10.091)--(3.437,10.086)--(3.351,10.08)--(3.266,10.073)--(3.183,10.065)--(3.102,10.056)--(3.022,10.045)--(2.945,10.034)--(2.871,10.022)--(2.799,10.008)--(2.73,9.994)--(2.665,9.979)--(2.602,9.963)--(2.543,9.946)--(2.488,9.928)--(2.437,9.91)--(2.389,9.891)--(2.346,9.872)--(2.307,9.852)--(2.272,9.831)--(2.242,9.81)--(2.216,9.789)--(2.195,9.767)--(2.178,9.745)--(2.167,9.723)--(2.159,9.701)--(2.157,9.678)--(2.157,9.678)--(2.159,9.656)--(2.167,9.634)--(2.178,9.611)--(2.195,9.589)--(2.216,9.568)--(2.242,9.546)--(2.272,9.525)--(2.307,9.505)--(2.346,9.485)--(2.389,9.465)--(2.437,9.446)--(2.488,9.428)--(2.543,9.41)--(2.602,9.394)--(2.665,9.378)--(2.73,9.362)--(2.799,9.348)--(2.871,9.335)--(2.945,9.322)--(3.022,9.311)--(3.102,9.301)--(3.183,9.292)--(3.266,9.283)--(3.351,9.276)--(3.437,9.271)--(3.525,9.266)--(3.613,9.262)--(3.702,9.26)--(3.791,9.259)--(3.88,9.259)--(3.97,9.26)--(4.058,9.262)--(4.147,9.266)--(4.234,9.271)--(4.32,9.276)--(4.405,9.283)--(4.488,9.292)--(4.57,9.301)--(4.649,9.311)--(4.726,9.322)--(4.8,9.335)--(4.872,9.348)--(4.941,9.362)--(5.007,9.378)--(5.069,9.394)--(5.128,9.41)--(5.183,9.428)--(5.234,9.446)--(5.282,9.465)--(5.325,9.485)--(5.364,9.505)--(5.399,9.525)--(5.429,9.546)--(5.455,9.568)--(5.476,9.589)--(5.493,9.611)--(5.505,9.634)--(5.512,9.656)--(5.514,9.678)--cycle;
\\draw [color=black , dotted, line width = 0.4](3.836,9.678)--(5.514,9.678);
\\draw [color=black , line width = 0.4](3.836,0.278)--(5.336,8.678);
\\draw [color=black , line width = 0.4](3.836,0.278)--(2.336,8.678);
\\node at (3.411, 8.97) [align=left,below right ,black,,font= \\sf \\fontsize {0.398cm} {0.498cm} \\selectfont] {\\textbf{B}};
\\node at (5.362, 9.023) [align=left,below right ,black,,font= \\sf \\fontsize {0.398cm} {0.498cm} \\selectfont] {\\textbf{A}};
\\fill[color=black] (3.836,0.278) circle (0.053);
\\end{tikzpicture} \n\t \\end{minipage}`
					texte_corr = num_alpha(0) + ` Les triangles SBA et SHL sont semblables car les droites (BA) et (HL) sont parallèles dans le plan du triangle SHL.<br>`
					texte_corr += ` La tangente de l'angle $\\widehat{HSL}$ est égale dans le triangle SHL à $\\dfrac{\\text{HL}}{\\text{SH}}$ et dans le triangle SBA à $\\dfrac{\\text{BA}}{\\text{SB}}$.<br>`
					texte_corr += ` d'où $\\dfrac{\\text{HL}}{\\text{SH}}=\\dfrac{\\text{BA}}{\\text{SH}-\\text{BH}}$ `
					texte_corr += ` et l'égalité des produits en croix nous donne : $\\text{HL}\\left(\\text{SH}-\\text{BH} \\right) =\\text{BA}\\times \\text{SH}$.<br>`
					texte_corr += ` Soit avec les données numériques : $${tex_nombre(r)}\\left(\\text{SH}-${tex_nombre(h3)}\\right)=${tex_nombre(r2)}\\times \\text{SH}$.<br>`
					texte_corr += `On en déduit que SH$\\left(${tex_nombre(r)}-${tex_nombre(r2)}\\right)=${tex_nombre(r)}\\times${tex_nombre(h3)}$.<br>`
					texte_corr += `D'où SH $=\\dfrac{${tex_nombrec(r * h3)}}{${tex_nombrec(r - r2)}}=${tex_nombre(h1)}$ dm ( SB = $${tex_nombre(h2)}$ dm).<br>`

					texte_corr += num_alpha(1) + ` Le volume du cône est $\\dfrac{A_\\text{base}}{3}\\times \\text{hauteur}$ dm${exposant(3)} $= \\dfrac{${tex_nombrec(r * r)}\\pi}{3} \\times ${tex_nombre(h1)}$ dm${exposant(3)} $= \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ dm${exposant(3)} $\\approx ${tex_nombrec(arrondi(r * r * h1 * Math.PI / 3))}$ dm${exposant(3)}.<br>`
					texte_corr += num_alpha(2) + ` Le seau est un tronc de cône. Pour calculer son volume, on va calculer le volume du cône réduit de hauteur SB et le soustraire du volume du cône de hauteur SH.<br>`
					texte_corr += ` Le cône de hauteur SB est une réduction du cône de hauteur SH. Le coefficient de cette réduction est : $\\dfrac{${tex_nombre(r2)}}{${tex_nombre(r)}}`
					if (!Number.isInteger(r) || pgcd(r2 * 10, r * 10) > 1) texte_corr += `=${tex_fraction_reduite(arrondi(r2 * 10), arrondi(r * 10))}$.<br>`
					else texte_corr += `.$<br>`
					texte_corr += `Dans une réduction de coefficient k, les volumes sont multipliés par k${exposant(3)}.<br>`
					texte_corr += `Donc le volume du cône de hauteur SB est : $\\left(${tex_fraction_reduite(arrondi(r2 * 10), arrondi(r * 10))}\\right)^3 \\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ dm${exposant(3)} $\\approx ${tex_nombrec(arrondi(Math.PI * h2 ** 3 * r * r / h1 ** 2 / 3))}$ dm${exposant(3)} '.<br>`
					texte_corr += `Le volume du tronc de cône est : `
					texte_corr += `$V_\\text{Cône} - V_\\text{CôneRéduit}$<br>Soit : <br>$\\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ dm${exposant(3)}$ - \\left(${tex_fraction_reduite(arrondi(r2 * 10), arrondi(r * 10))}\\right)^3 \\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ dm${exposant(3)} `
					texte_corr += `$ = \\left(1-\\left(${tex_fraction_reduite(arrondi(r2 * 10), arrondi(r * 10))}\\right)^3\\right)\\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ dm${exposant(3)} `
					texte_corr += `$ = \\left(1-\\dfrac{${fraction_simplifiee(arrondi(r2 * 10), arrondi(r * 10))[0] ** 3}}{${fraction_simplifiee(arrondi(r2 * 10), arrondi(r * 10))[1] ** 3}}\\right)\\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ dm${exposant(3)} `
					texte_corr += `$ = \\dfrac{${fraction_simplifiee(arrondi(r2 * 10), arrondi(r * 10))[1] ** 3 - fraction_simplifiee(arrondi(r2 * 10), arrondi(r * 10))[0] ** 3}}{${fraction_simplifiee(arrondi(r2 * 10), arrondi(r * 10))[1] ** 3}}\\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ dm${exposant(3)} `
					texte_corr += `$ \\approx ${tex_nombrec(arrondi((fraction_simplifiee(arrondi(r2 * 10), arrondi(r * 10))[1] ** 3 - fraction_simplifiee(arrondi(r2 * 10), arrondi(r * 10))[0] ** 3) * r * r * h1 * Math.PI / (fraction_simplifiee(arrondi(r2 * 10), arrondi(r * 10))[1] ** 3 * 3)))}$ dm${exposant(3)}<br>`
					c = h3 / 2
					if (sortie_html) {
						texte_corr += num_alpha(3) + ` Il faut fixer HL à ${tex_nombrec(r*10)} cm ; BA à ${tex_nombrec(r2*10)} cm ; BH à ${tex_nombrec(h3*10)} cm et la hauteur d'eau à ${tex_nombrec((h1 - h2) *5)} cm.<br>`
						texte_corr += `La lecture de $ y = V(x)$ nous donne un volume d'au d'environ ${tex_nombrec(arrondi(Math.PI * (((c + h2) ** 3) * ((r2 / h2) ** 2) - (r2 ** 2) * h2) / 3, 1))} dm${exposant(3)} soit environ ${tex_nombrec(arrondi(Math.PI * (((c + h2) ** 3) * ((r2 / h2) ** 2) - (r2 ** 2) * h2) / 3, 1))} litres d'eau.<br>`
						texte_corr += num_alpha(4)
					}
					else texte_corr += num_alpha(3)
					texte_corr += ` Nous allons déterminer le volume du cône de hauteur SE, puis nous soustrairons le volume du cône de hauteur SB pour obtenir le volume d'eau.<br>`
					texte_corr += ` Le cône de hauteur SE est une réduction du cône de hauteur SH. Le coefficient de cette réduction est : $\\dfrac{${tex_nombre((h1 + h2) / 2)}}{${tex_nombrec(h1)}}`
					if (!Number.isInteger(c+h2) || pgcd(h1 * 100, (c + h2) *100) > 1) texte_corr += `=${tex_fraction_reduite(calcul((c + h2) * 100),calcul( h1 * 100))}$.<br>`
					else texte_corr += `.$<br>`
					texte_corr += `Donc le volume $V$ du cône de hauteur SE est : $\\left(${tex_fraction_reduite(calcul((h1 + h2) * 50),calcul( h1 * 100))}\\right)^3 \\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ dm${exposant(3)} $\\approx ${tex_nombrec(arrondi(Math.PI * r * r * (h2 + c) ** 3 / (h1 ** 2) / 3))}$ dm${exposant(3)}.<br>`
					texte_corr += `Notons $V'$ le volume du cône de hauteur SB calculé à la question ` + num_alpha(2) + `<br> Le volume d'eau est donc : `

					texte_corr += `$V-V' \\approx ${tex_nombrec(arrondi(Math.PI * r * r * (h2 + c) ** 3 / (h1 ** 2) / 3))}$ dm${exposant(3)}$ - ${tex_nombrec(arrondi(Math.PI * h2 ** 3 * r * r / h1 ** 2 / 3))}$ dm${exposant(3)} $\\approx ${tex_nombre(calcul(Math.PI * r * r * (h2 + c) ** 3 / (h1 ** 2) / 3 - Math.PI * h2 ** 3 * r * r / h1 ** 2 / 3, 1))}$ dm${exposant(3)}.<br>`
					this.MG32codeBase64 = codeBase64
											 this.MG32code_pour_modifier_la_figure = `
												 mtg32App.calculate("MG32svg${numero_de_l_exercice}");
												 mtg32App.display("MG32svg${numero_de_l_exercice}");
												 ` 	
					break;
				case 5: // Un problème avec un cône Vanille Chocolat.
					r = calcul(randint(20, 28) / 10)
					h1 = calcul(randint(20, 28) / 2)
					h2 = randint(1,3)

					if (this.sup2<3)
					if (this.sup2==1) // coefficient de réduction décimal
						while (calcul(h2/h1)!=arrondi(h2/h1,1)) {
							r = calcul(randint(20, 28) / 10)
							h1 = calcul(randint(20, 28) / 2)
							h2 = randint(1,3)
						}
					else //coefficient de réduction rationnel
						while (calcul(h2/h1)==arrondi(h2/h1,1)) {
							r = calcul(randint(20, 28) / 10)
							h1 = calcul(randint(20, 28) / 2)
							h2 = randint(1,3)
						}	
					r2 = calcul(r*h2/h1)
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAANmcmH###8BAP8BAAAAAAAAAAAFKgAAAuAAAAAAAAAAAAAAAAAAAAET#####wAAAAEACkNDYWxjQ29uc3QA#####wACcGkAFjMuMTQxNTkyNjUzNTg5NzkzMjM4NDb#####AAAAAQAKQ0NvbnN0YW50ZUAJIftURC0Y#####wAAAAEAD0NWYXJpYWJsZUJvcm5lZQD#####AANhbmc#6SH7VEQtGAAAAAAAAAAAQBkh+1RELRg#qZmZmZmZmgAAATAABDIqcGkABDAuMDX#####AAAAAQAKQ1BvaW50QmFzZQD#####AQAAAAAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAUB#eAAAAAAAQHqoUeuFHrj#####AAAAAQAHQ0NhbGN1bAD#####AAVtaW5pMQADMC4yAAAAAT#JmZmZmZmaAAAABAD#####AAVtYXhpMQABMgAAAAFAAAAAAAAAAP####8AAAABABRDSW1wbGVtZW50YXRpb25Qcm90bwD#####AAdDdXJzZXVyAAAABQAAAAUAAAADAAAAAwAAAAQAAAAC#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAAAAAAUBAAAAABAAAAEAAQAAAAIBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAQAAAAUBAAAAABAAAADACAAAAAAAAD#wAAAAAAAABQABQEuAAAAAAAAAAAAG#####wAAAAEAC0NIb21vdGhldGllAAAAAAUAAAAC#####wAAAAEACkNPcGVyYXRpb24D#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAMAAAAJAQAAAAoAAAADAAAACgAAAAT#####AAAAAQALQ1BvaW50SW1hZ2UAAAAABQEAAAAADQACTzEAwBAAAAAAAABAEAAAAAAAAAUAAAAABwAAAAgAAAAIAAAAAAUAAAACAAAACQMAAAAJAQAAAAE#8AAAAAAAAAAAAAoAAAADAAAACQEAAAAKAAAABAAAAAoAAAADAAAACwAAAAAFAQAAAAANAAJJNQDAAAAAAAAAAEAIAAAAAAAABQAAAAAHAAAACv####8AAAABAAhDU2VnbWVudAEAAAAFAQAAAAAQAAABAQEAAAACAAAABwAAAAcBAAAABQEAAAABEAACazEAwAAAAAAAAABAAAAAAAAAAAEAAT#aw32sN9rDAAAADP####8AAAACAA9DTWVzdXJlQWJzY2lzc2UBAAAABQAEem9vbQAAAAkAAAALAAAADf####8AAAABAA9DVmFsZXVyQWZmaWNoZWUBAAAABQEAAAAAAAAAAAAAAADAGAAAAAAAAAAAAA0PAAH###8AAAABAAAAAgAAAAEAAAAAAAAAAAAAAAACAAAADgAAAAMA#####wH#AAAAEAABWgAAAAAAAAAAAEAIAAAAAAAABQABQHmoAAAAAABAd2hR64UeuAAAAAgA#####wAAABAAAAAKAAAADgAAAAYA#####wH#AAABEAAAAQEBAAAAEAA#8AAAAAAAAAAAAAcA#####wH#AAAAEAABTQAAAAAAAAAAAEAIAAAAAAAABQABwEgAAAAAAAAAAAASAAAACwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAEwAAABEAAAADAP####8BAAAAAQ8AAk8yAQUAAUCA3AAAAAAAQICEKPXCj1wAAAAGAP####8BAAAAARAAAAEAAQAAABUAP#AAAAAAAAAAAAAHAP####8BAAAAAQ8AAkoyAQUAAMBAAAAAAAAAAAAAFv####8AAAABAAlDTG9uZ3VldXIA#####wAAABUAAAAXAAAAAwD#####AAAAAAAPAAFPAMAYAAAAAAAAQCQAAAAAAAAFAAFAYpAAAAAAAEBIQo9cKPXDAAAABgD#####AQAAAAAQAAABAAEAAAAZAUAD6BRQ79ycAAAABwD#####Af8AAAAQAAJJIgAAAAAAAAAAAEAIAAAAAAAABQABQDF7TwMpFiAAAAAaAAAABAD#####AAJoMQACMTAAAAABQCQAAAAAAAAAAAAEAP####8AAmgyAAE0AAAAAUAQAAAAAAAAAAAABAD#####AAFyAAMzLjUAAAABQAwAAAAAAAD#####AAAAAQARQ1N5bWV0cmllQ2VudHJhbGUA#####wAAABUAAAADAP####8BAAAAAQ8AAk8zAQUAAUCSQgAAAAAAQHe4UeuFHrcAAAAGAP####8BAAAAABAAAAEAAQAAACABQAPoFFDv3JwAAAADAP####8BAAAAAQsAAk80AQUAAUCSVgAAAAAAQH5YUeuFHrgAAAAGAP####8BAAAAABAAAAEAAQAAACIBQAPoFFDv3JwAAAAQAP####8AAAAZAAAACwD#####AQB#AAALAAJXNADANQAAAAAAAMAUAAAAAAAABQAAAAAXAAAAH#####8AAAABAAxDVHJhbnNsYXRpb24A#####wAAABUAAAAXAAAACwD#####AQAAAAALAAJXNwBAAAAAAAAAAAAAAAAAAAAABQAAAAAgAAAAJv####8AAAABAAlDQ2VyY2xlT0EA#####wF#f38BAQAAACAAAAAn#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAACEAAAAo#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADQACSTMBBQABAAAAKf####8AAAABAA9DUG9pbnRMaWVDZXJjbGUA#####wEAAAABCwACSzMBAQABQBX9VSbZZwcAAAAo#####wAAAAIAE0NNZXN1cmVBbmdsZU9yaWVudGUA#####wAIYW5ndGhldGEAAAAqAAAAIAAAACsAAAAEAP####8ABXRoZXRhAAhhbmd0aGV0YQAAAAoAAAAsAAAABAD#####AAN4JzEACy1zaW4odGhldGEp#####wAAAAEADENNb2luc1VuYWlyZf####8AAAACAAlDRm9uY3Rpb24DAAAACgAAAC0AAAAEAP####8AA3gnMgALLWNvcyh0aGV0YSkAAAAXAAAAGAQAAAAKAAAALQAAABUA#####wEAAAAACwACVzEAwAAAAAAAAABAAAAAAAAAAAUAAUATXOOpPArvAAAAKAAAABYA#####wAFYW5nbGUAAAAqAAAAIAAAADD#####AAAAAQASQ0FyY0RlQ2VyY2xlRGlyZWN0AP####8Bf39#AQEAAAAVAAAAFwAAACUAAAAVAP####8BAAAAAQsAAksyAQEAAT+3ICjs75hDAAAAMgAAABYA#####wAGYW5ncGhpAAAAFwAAABUAAAAzAAAABAD#####AANwaGkACXBpK2FuZ3BoaQAAAAkAAAAACgAAAAAAAAAKAAAANAAAAAQA#####wADeScxABNjb3ModGhldGEpKnNpbihwaGkpAAAACQIAAAAYBAAAAAoAAAAtAAAAGAMAAAAKAAAANQAAAAQA#####wADeScyABQtc2luKHRoZXRhKSpzaW4ocGhpKQAAABcAAAAJAgAAABgDAAAACgAAAC0AAAAYAwAAAAoAAAA1#####wAAAAEAF0NNZXN1cmVBbmdsZUdlb21ldHJpcXVlAP####8AAAAXAAAAFQAAACUAAAAEAP####8ABHBsYXQABkoyTzJXNAAAAAoAAAA4AAAABAD#####AAVkcm9pdAAGcGxhdC8yAAAACQMAAAAKAAAAOQAAAAFAAAAAAAAAAAAAAAwA#####wEAAAAAEAAAAQABAAAAFQAAABcAAAAMAP####8BAAAAABAAAAEAAQAAACAAAAAqAAAADAD#####AQAAAAAQAAABAAEAAAAgAAAAK#####8AAAACABNDTWFycXVlQW5nbGVPcmllbnRlAP####8BfwAAAAIAAAAAQDiyu8xLZZ0AAAAqAAAAIAAAACsB#####wAAAAEADENCaXNzZWN0cmljZQD#####AX8AAAAQAAABAQEAAAAqAAAAIAAAACsAAAAHAP####8BfwAAABAAAAEFAAFAebYKC41k5QAAAD######AAAAAgAGQ0xhdGV4AP####8BfwAAAMAUAAAAAAAAwCYAAAAAAAAAAABAEQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAClx2YXJ0aGV0YSAAAAAMAP####8BAAAAABAAAAEAAQAAABUAAAAzAAAACAD#####AAAAIgAAABgEAAAACgAAADUAAAAbAP####8BAAD#AAIAAAAAQDdS5Q2zo6IAAAAXAAAAFQAAADMBAAAAHAD#####AQAA#wAQAAABAQEAAAAXAAAAFQAAADMAAAAHAP####8BAAD#ABAAAAEFAAFAd7hgWcShNQAAAEUAAAAdAP####8BAAD#AAAAAAAAAAAAwBQAAAAAAAAAAABGEQAAAAAAAQAAAAEAAAABAAAAAAAAAAAAB1x2YXJwaGkAAAAEAP####8AAWsACHNpbihwaGkpAAAAGAMAAAAKAAAANQAAAAQA#####wAKdGVzdFBoaU51bAAnMS8oKHBoaT0wKSsoYWJzKHBoaS1wbGF0KTwwLjAwMDAwMDAwMSkpAAAACQMAAAABP#AAAAAAAAAAAAAJAAAAAAkIAAAACgAAADUAAAABAAAAAAAAAAAAAAAJBAAAABgAAAAACQEAAAAKAAAANQAAAAoAAAA5AAAAAT4RLgvoJtaVAAAACAD#####AAAAGQAAAAoAAABJAAAABgD#####AQAAAAEQAAABAAEAAAAiAD#wAAAAAAAAAAAABwD#####AQAAAAELAAJKNAEFAAHAS4AAAAAAAAAAAEsAAAASAP####8BZmZmAAEAAAAiAAAATAAAABUA#####wEAAAAAEAAAAQUAAT#wl+m6eQJhAAAATQAAAAYA#####wEAAAAAEAAAAQABAAAATgBAA+gUUO#cnP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAABAAAAEFAAAAACMAAABPAAAAEwD#####AAAAIwAAAE0AAAAUAP####8BAAAAAA0AAkk0AQUAAQAAAFH#####AAAAAgAHQ1JlcGVyZQD#####AAAAAAEBAAAAIgAAAFIAAABMAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAAAAAACwD#####AQAAAAAQAAABBQAAAABMAAAAQwAAAAgA#####wAAAFAAAAAYBAAAAAoAAAA1AAAACwD#####AQAAAAAQAAABBQAAAABOAAAAVf####8AAAACAA1DTGlldURlUG9pbnRzAP####8BAH9#AQEAAABWAAAAZAAAAAAATgAAAAUAAABOAAAATwAAAFAAAABVAAAAVv####8AAAABAAhDVmVjdGV1cgD#####AQAA#wAQAAABAAEAAAAiAAAAVAD#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####AQAAAAAQAAABBQAAAABTAAAACgAAAC4AAAAKAAAANgAAACIA#####wEAAAAAEAAAAQUAAAAAUwAAAAoAAAAvAAAACgAAADcAAAAhAP####8B#wAAABAAAAEAAQAAACIAAABZAAAAACEA#####wEAfwAAEAAAAQABAAAAIgAAAFoAAAAAIAD#####AWZmZgEBAAAAWQAAAGQAAAAAACsAAAAGAAAAKwAAACwAAAAtAAAALgAAADYAAABZ#####wAAAAEADENTdXJmYWNlTGlldQD#####AX9#fwAAAAUAAABdAAAAIwD#####AX9#fwAAAAUAAABXAAAAEgD#####Af8AAAEBAAAAGQAAABv#####AAAAAQANQ0RlbWlEcm9pdGVPQQD#####Af8AAAANAAABAQEAAAAQAAAAE#####8AAAABAA5DUG9pbnRMaWVQb2ludAD#####Af8AAAAQAAFVAEAgAAAAAAAAwCoAAAAAAAAFAAAAABQAAAANAP####8AAXUAAAAQAAAAEwAAAGL#####AAAAAQARQ1BvaW50UGFyQWJzY2lzc2UA#####wH#AAAAEAACSTIAAAAAAAAAAABACAAAAAAAAAUAAAAAGQAAABsAAAAKAAAAYwAAACUA#####wEAAAAACwACSTEAwBAAAAAAAABAEAAAAAAAAAUAAAAAZP####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAADQAAAQABAAAAGQAAAGX#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAQAAABAAEAAAAZAAAAZgAAABIA#####wEAAAAAAQAAABkAAABlAAAAEwD#####AAAAZwAAAGgAAAAUAP####8BAAAAAAsAAkoxAMAoAAAAAAAAwBAAAAAAAAAFAAIAAABpAAAAHwD#####AICAgAEBAAAAGQAAAGUAAABqAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAAAAAAIgD#####AQAAAAAPAAFJAD#wAAAAAAAAQBAAAAAAAAAFAAAAAGsAAAAKAAAALgAAAAoAAAA2AAAAIgD#####AQAAAAAPAAFKAQUAAAAAawAAAAoAAAAvAAAACgAAADcAAAAkAP####8BAAAAAA0AAAEBAQAAABkAAABsAAAAIgD#####AQAAAAAPAAFLAEAQAAAAAAAAwC4AAAAAAAAFAAAAAGsAAAABAAAAAAAAAAAAAAAYBAAAAAoAAAA1AAAAJAD#####AQAAAAANAAABAQEAAAAZAAAAbwAAACQA#####wEAAAAADQAAAQEBAAAAGQAAAG0AAAAhAP####8B#wAAABAAAAEAAQAAABkAAABsAAAAACEA#####wEAfwAAEAAAAQABAAAAGQAAAG0AAAAAIQD#####AQAA#wAQAAABAAEAAAAZAAAAbwD#####AAAAAQAPQ1N5bWV0cmllQXhpYWxlAP####8AAABw#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8BAAD#Af####8NQH3AAAAAAABAgkAAAAAAAAIBzMz#AAAAAAAAAAAAAAABAAAAAAAAAAAAEyhPLEksSixLKSBpbnZpc2libGUAAAAAAAkAAABxAAAAbgAAAHAAAAByAAAAcwAAAHQAAABtAAAAbAAAAG######AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AQAA#wH#####DUB+cAAAAAAAQIMYAAAAAAACAczM#wAAAAAAAAAAAAAAAQAAAAAAAAAAABEoTyxJLEosSykgdmlzaWJsZQAAAAAACQAAAHEAAABuAAAAcAAAAHIAAABzAAAAdAAAAG0AAABsAAAAbwAAAAAfAP####8AgICAAQEAAAAZAAAAbAAAAG0AAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAAiAP####8B2NjYABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABrAAAACgAAAB4AAAABAAAAAAAAAAAAAAAiAP####8BAAAAABAAAUIAAAAAAAAAAABACAAAAAAAAAUAAAAAeAAAAAoAAAAeAAAAAQAAAAAAAAAAAAAAJQD#####AQAAAAAPAAFBAQUAAAAAegAAAA0A#####wAEYWJzMQAAABkAAABsAAAAewAAAAQA#####wADUmF5AARhYnMxAAAACgAAAHwAAAAmAP####8BAAAAABAAAAEFAAAAABkAAABsAAAACQIAAAAKAAAAfQAAABgEAAAACgAAADEAAAAmAP####8BAAAAABAAAAEFAAAAABkAAABtAAAACQIAAAAKAAAAfQAAABgDAAAACgAAADEAAAARAP####8AAAAZAAAAfgAAAAsA#####wEAAAAAEAAAAQUAAAAAfwAAAIAAAAAgAP####8Af39#AQEAAACBAAAAeAEAAAAAMAAAAAYAAAAwAAAAMQAAAH4AAAB#AAAAgAAAAIEAAAAjAP####8A##8AAAAABQAAAIIAAAAiAP####8BAAAAABAAAAEFAAAAAGsAAAABAAAAAAAAAAAAAAAJAQAAAAEAAAAAAAAAAAAAAAoAAAB9AAAAEgD#####AQAAAAEBAAAAGQAAAIQAAAATAP####8AAABxAAAAhQAAABQA#####wEAAAAAEAAAAQUAAQAAAIYAAAALAP####8B#wD#ABAAAAEFAAAAAIcAAABKAAAACwD#####Af8A#wAQAAABBQAAAACIAAAAJAAAAAwA#####wEAAAAAEAAAAQACAAAAiAAAAIkAAAAHAP####8BAAAAABAAAAEFAAE#tLY8pd6vvwAAAIr#####AAAAAQAOQ09iamV0RHVwbGlxdWUA#####wAAAAAAAACKAAAADQD#####AAFhAAAAGQAAAGwAAAB7AAAAIgD#####AWZmZgAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAeAAAAAkCAAAACgAAAI0AAAAYBAAAAAoAAAABAAAACQIAAAAKAAAAjQAAABgDAAAACgAAAAEAAAAfAP####8A5ubmAAEAAAAZAAAAbAAAAG8AAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAAAAAAiAP####8BAAAAABAAAlMiAMA5AAAAAAAAwC4AAAAAAAAFAAAAAI8AAAABAAAAAAAAAAAAAAAKAAAAHAAAACUA#####wEAAAAADwABUwDARIAAAAAAAMAiAAAAAAAABQAAAACQAAAADQD#####AAVhYnMxMQAAABkAAABqAAAAkQAAAAQA#####wABcwAFYWJzMTEAAAAKAAAAkgAAACwA#####wAAAAAAAACR#####wAAAAEADkNUZXN0RXhpc3RlbmNlAP####8ACEV4aXN0RGVzAAAAkgAAAAQA#####wAKdGVzdFNFZ2FsTwAOMS8oMS1FeGlzdERlcykAAAAJAwAAAAE#8AAAAAAAAAAAAAkBAAAAAT#wAAAAAAAAAAAACgAAAJUAAAAIAP####8AAAAZAAAACgAAAJYAAAAEAP####8AA3knMAALa14yKlJheV4yL3MAAAAJAwAAAAkC#####wAAAAEACkNQdWlzc2FuY2UAAAAKAAAASAAAAAFAAAAAAAAAAAAAAC4AAAAKAAAAfQAAAAFAAAAAAAAAAAAAAAoAAACTAAAABAD#####AAN4JzAAFHJhYyhSYXleMi15JzBeMi9rXjIpAAAAGBIAAAAJAQAAAC4AAAAKAAAAfQAAAAFAAAAAAAAAAAAAAAkDAAAALgAAAAoAAACYAAAAAUAAAAAAAAAAAAAALgAAAAoAAABIAAAAAUAAAAAAAAAAAAAAIgD#####Af8AAAAQAAABBQAAAABrAAAACgAAAJkAAAAKAAAAmAAAAAsA#####wH#AAAAEAAAAQUAAAAAmgAAAHUAAAAGAP####8BAAAAABAAAAEBAQAAAJoAP#MzMzMzMzMAAAAGAP####8BAAAAABAAAAEBAQAAAJsAP#MzMzMzMzMAAAATAP####8AAACdAAAAhQAAABQA#####wEAAAAAEAAAAQUAAgAAAJ4AAAATAP####8AAACcAAAAhQAAABQA#####wEAAAAAEAAAAQUAAgAAAKAAAAAZAP####8BAAAAAQEAAAAZAAAAnwAAAKEAAAAVAP####8BAAAAAAsAAlczAMAkAAAAAAAAQBgAAAAAAAAFAAE#0#omyqGlpQAAAKL#####AAAAAQANQ1BvaW50UHJvamV0ZQD#####AQAAAAALAAJXMgDALgAAAAAAAEAUAAAAAAAABQAAAACjAAAAZgAAACYA#####wEAAAAACwACVzUAwCAAAAAAAABAIAAAAAAAAAUAAAAApAAAAKP#####AAAAAQANQ0ZvbmN0aW9uM1ZhcgAAAAAJAgAAAAkHAAAACgAAADUAAAABAAAAAAAAAAAAAAAJBgAAAAoAAAA1AAAACgAAADoAAAAKAAAASAAAAAkBAAAAAQAAAAAAAAAAAAAACgAAAEgAAAAEAP####8ACHRlc3RTaW50ABYxLyhhYnMocyk8PWFicyhrKSpSYXkpAAAACQMAAAABP#AAAAAAAAAAAAAJBgAAABgAAAAACgAAAJMAAAAJAgAAABgAAAAACgAAAEgAAAAKAAAAfQAAAAwA#####wAAAAAAEAAAAQACAAAAkQAAAJoAAAAMAP####8AAAAAABAAAAEAAgAAAJEAAACbAAAADAD#####AX9#fwAQAAABAAEAAACRAAAApQAAAAcA#####wEAAAAACwACVzYBBQABP+kwagu4xeQAAACpAAAAIAD#####AX9#fwABAAAAqgAAAFAAAAAAAKMAAAAFAAAAowAAAKQAAAClAAAAqQAAAKr#####AAAAAgASQ0xpZXVPYmpldFBhclB0TGllAP####8A2NjYAAAAqwAAAAFAJAAAAAAAAAAAAKoAAAACAAAAqgAAAKsAAAAgAP####8BAAAAAAIAAAClAAAAeAAAAAAAowAAAAMAAACjAAAApAAAAKUAAAAIAP####8AAAAZAAAACgAAAKYAAAALAP####8B#wD#ABAAAAEFAAAAAJEAAACuAAAADAD#####AX9#fwAQAAABAAEAAACvAAAAgQAAADEA#####wB#f38AAACwAAAAAUA1AAAAAAAAAAAAMAAAAAcAAAAwAAAAMQAAAH4AAAB#AAAAgAAAAIEAAACwAAAABwD#####AX9#fwAQAAABBQABP+jGPF4uJ0YAAACwAAAAIAD#####AX9#fwABAAAAsgAAAFABAAAAADAAAAAIAAAAMAAAADEAAAB+AAAAfwAAAIAAAACBAAAAsAAAALIAAAAxAP####8Af39#AAAAswAAAAFAJAAAAAAAAAAAALIAAAACAAAAsgAAALMAAAAsAP####8AAAAAAAAArQAAAAgA#####wAAAJEAAAAKAAAApgAAAAsA#####wH#AAAAEAAAAQUAAAAAgQAAALYAAAAgAP####8BAAAAAAIAAAC3AAAAZAEAAAAAMAAAAAcAAAAwAAAAMQAAAH4AAAB#AAAAgAAAAIEAAAC3AAAALAD#####AAAAAAAAALgAAAALAP####8B#wAAABAAAAEFAAAAAIQAAACXAAAAEgD#####AQAAAAACAAAAGQAAALoAAAAVAP####8BAAAAABAAAAEFAAFAAnKZ09yUFQAAALsAAAAMAP####8Bf39#ABAAAAEAAQAAABkAAAC8AAAABwD#####AX9#fwAQAAABBQABP+nN99SrrBcAAAC9AAAAEgD#####AX9#fwABAAAAGQAAAL4AAAAxAP####8Af39#AAAAvQAAAAFANAAAAAAAAAAAALwAAAACAAAAvAAAAL0AAAAxAP####8Af39#AAAAvwAAAAFAJAAAAAAAAAAAAL4AAAACAAAAvgAAAL8AAAAsAP####8AAAAAAAAAuwAAAAwA#####wEAAAAAEAAAAQACAAAAiQAAAJEAAAAHAP####8Bf39#ABAAAAEFAAE#wdH0IWEZJQAAAMMAAAAGAP####8Bf39#ABAAAAEAAQAAAMQBP#MzMzMzMzMAAAAMAP####8BAAAAABAAAAEAAgAAAJEAAACIAAAAHgD#####AX9#fwAQAAABBQAAAADFAAAAxgAAAAwA#####wF#f38AEAAAAQABAAAAxAAAAMcAAAAxAP####8Af39#AAAAyAAAAAFAJAAAAAAAAAAAAMQAAAAEAAAAxAAAAMUAAADHAAAAyAAAAAwA#####wF#f38AEAAAAQABAAAAkQAAAIsAAAAxAP####8Af39#AAAAygAAAAFAJAAAAAAAAAAAAIsAAAACAAAAiwAAAMoAAAAsAP####8AAAAAAAAAwwAAACwA#####wAAAAAAAADGAAAADAD#####AQAAAAAQAAABAQEAAACRAAAAjv####8AAAACABVDTGlldU9iamV0UGFyVmFyaWFibGUA#####wC9vb0AAADOAAAAAUA5AAAAAAAAAAAAAQAAAAMAAAABAAAAjgAAAM4AAAAiAP####8AAAAAABAAAk8nAMA5AAAAAAAAwCoAAAAAAAAFAAAAAI8AAAABAAAAAAAAAAAAAAAJAQAAAAoAAAAcAAAACgAAAB3#####AAAAAQAQQ0Ryb2l0ZVBhcmFsbGVsZQD#####Aebm5gAQAAABAAEAAADQAAAAbgAAAAwA#####wDm5uYAEAAAAQABAAAAkQAAAH4AAAAeAP####8BpKSkABAAAlAiAAAAAAAAAAAAQAgAAAAAAAAFAAAAANEAAADSAAAAMwD#####Aebm5gAQAAABAAEAAADQAAAAcQAAAAwA#####wDm5uYAEAAAAQABAAAAfwAAAJEAAAAeAP####8BpKSkABAAAlEiAMA7AAAAAAAAwCIAAAAAAAAFAAAAANQAAADVAAAAEQD#####AAAA0AAAANMAAAALAP####8BpKSkABAAAlAnAAAAAAAAAAAAQAgAAAAAAAAFAAAAANYAAADXAAAAIAD#####AKSkpAEBAAAA2AAAAHgBAAAAACsAAAAeAAAAKwAAACwAAAAtAAAALgAAAC8AAAA2AAAANwAAAGwAAABtAAAAbgAAAHEAAAB4AAAAegAAAHsAAAB8AAAAfQAAAH4AAAB#AAAAjwAAAJAAAACRAAAA0AAAANEAAADSAAAA0wAAANQAAADVAAAA1gAAANcAAADYAAAAIwD#####AP8AAAAAAAUAAADZAAAAEwD#####AAAAZwAAAGAAAAAUAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAA2wAAABQA#####wH#AAAAEAACSiIAAAAAAAAAAABACAAAAAAAAAUAAgAAANsAAAAfAP####8A5ubmAAEAAAAZAAAAGwAAAN0AAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABP#AAAAAAAAAAAAABP#AAAAAAAAD#####AAAAAgAMQ0NvbW1lbnRhaXJlAP####8B#wAAAf####8QQH+4AAAAAABAeyhR64UeuAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABFpPT00AAAAIAP####8AAAAZAAAAAT#weuFHrhR7AAAACwD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAkQAAAOAAAAA0AP####8AAAAAAMA0AAAAAAAAwCgAAAAAAAAAAADhEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAVMAAAATAP####8AAAAaAAAAhQAAABQA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAADjAAAAFAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAOMAAAAMAP####8AAAAAABAAAAEBAQAAAJAAAADlAAAABgD#####AQAAAAEQAAABAQEAAADQAT#wAAAAAAAAAAAAHgD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA5wAAAOYAAAAMAP####8Af39#ABAAAAEBAQAAANAAAADoAAAADAD#####AAAAAAAQAAABAQEAAAAZAAAA5QAAAAwA#####wAAAAAAEAAAAQEBAAAAGQAAAJH#####AAAAAgAJQ0NlcmNsZU9SAP####8BAAAAAQEAAADQAAAAAT#ZmZmZmZmaAAAAABMA#####wAAAOkAAADsAAAAFAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAO0AAAAUAP####8AAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAA7QAAABMA#####wAAAOsAAADsAAAAFAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAPAAAAAUAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAA8AAAAAgA#####wAAANAAAAAYBAAAAAoAAAA1AAAACwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAA8gAAAPMAAAARAP####8AAADQAAAA9AAAAAsA#####wEAAAAAEAAAAEAIAAAAAAAAAAAAAAAAAAAFAAAAAO4AAAD1AAAADAD#####AAAAAAAQAAABAQEAAAD0AAAA0AAAAAwA#####wAAAAAAEAAAAQEBAAAA0AAAAO4AAAAMAP####8AAAAAABAAAAEBAQAAAO4AAAD2AAAADAD#####AAAAAAAQAAABAQEAAAD2AAAA9P####8AAAABAAlDUG9seWdvbmUA#####wAAAAABAQAAAAUAAAD0AAAA0AAAAO4AAAD2AAAA9AAAABEA#####wAAANAAAADuAAAACwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAGQAAAPwAAAALAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAZAAAA9QAAABEA#####wAAABkAAAD+AAAACwD#####AQAAAAAQAAAAQAgAAAAAAAAAAAAAAAAAAAUAAAAA#QAAAP8AAAAMAP####8AAAAAABAAAAEBAQAAAP4AAAAZAAAADAD#####AAAAAAAQAAABAQEAAAAZAAAA#QAAAAwA#####wAAAAAAEAAAAQEBAAAA#QAAAQAAAAAMAP####8AAAAAABAAAAEBAQAAAQAAAAD+AAAANgD#####AAAAAAEBAAAABQAAAP4AAAAZAAAA#QAAAQAAAAD+AAAABgD#####AQAAAAEQAAABAQEAAAAQAT#wAAAAAAAAAAAANQD#####AQAAAAEBAAAAEAAAAAE#yZmZmZmZmgAAAAATAP####8AAAEGAAABBwAAABQA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAAEIAAAAFAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAQgAAAAMAP####8B#wAAABAAAAEAAQAAAQoAAAEJ#####wAAAAEAB0NNaWxpZXUA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAANAAAACQAAAANwD#####Af8AAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAGQAAANAAAAAOAP####8BAAAAAMAqAAAAAAAAwBwAAAAAAAAAAAEMEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAgAAAB0AAAA3AP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAB5AAAAGQAAAA4A#####wEAAAAAwBwAAAAAAAAAAAAAAAAAAAAAAQ8QAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAACAAAAHgAAAAQA#####wACaDMABWgxLWgyAAAACQEAAAAKAAAAHAAAAAoAAAAdAAAADgD#####AQAAAADANQAAAAAAAMAiAAAAAAAAAAABDRAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAEAAAERAAAAGP##########"
					if (!sortie_html) texte = `\\begin{minipage}{0.7 \\linewidth} \n\t`
					else texte=``
					texte += `Un cône de glace d'une marque célèbre a pour rayon ${tex_nombre(r)}${sp()}cm et pour hauteur SO${sp()}=${sp()}${tex_nombre(h1)}${sp()}cm.<br>`
					texte+=`Le fabricant a coulé au fond de ce cône du chocolat sur une hauteur SO' de ${h2}${sp()}cm.<br>`
					texte += num_alpha(0) + ` Calculer le volume total du cône.<br>`					
					texte += num_alpha(1) + ` En déduire le volume de chocolat présent dans le fond du cône.<br>`
					texte += num_alpha(2) + ` Déduire des deux premières questions le volume de glace permettant de remplir le cône.<br>`
					texte += num_alpha(3) + ` Si la glace avait été mise dans le cône avant le chocolat, quelle serait la hauteur atteinte par la glace dans le cône ?<br>`
					texte += num_alpha(4) + ` Quelle serait alors l'épaisseur de chocolat au dessus de la glace ?<br>`
					if (sortie_html) texte += `Le point O peut être déplacé et on peut changer l'angle de vue &#x3C6; `
					else texte+=`\n\t \\end{minipage} \n\t \\begin{minipage}{0.3 \\linewidth} \n\t \\begin{tikzpicture}[scale=0.8]
					\\definecolor{hhhhhh}{rgb}{0,0,0}
					\\definecolor{phphph}{rgb}{0.5,0.5,0.5}
					\\definecolor{ofofof}{rgb}{0.5,0.5,0.5}
					\\definecolor{ffffhh}{rgb}{1,1,0}
					\\definecolor{enenen}{rgb}{0.9,0.9,0.9}
					\\definecolor{dpdpdp}{rgb}{0.85,0.85,0.85}
					\\definecolor{bdbdbd}{rgb}{0.74,0.74,0.74}
					\\definecolor{alalal}{rgb}{0.64,0.64,0.64}
					\\definecolor{ffhhhh}{rgb}{1,0,0}
					\\clip (40.89,0) rectangle (0,22.58);
					\\fill[color=black] (4.641,21.063) circle (0.063);
					\\node at (4.234, 20.625) [align=left,inner sep = 0pt, outer sep = 0pt,below right,black,font= \\sf \\fontsize {0.438cm} {0.547cm} \\selectfont] {$\\text{O}$};
					\\draw [color=ofofof , dotted, line width = 0.4](7.847,20.165)--(7.675,20.12)--(7.495,20.076)--(7.306,20.036)--(7.111,19.998)--(6.909,19.964)--(6.7,19.932)--(6.486,19.903)--(6.267,19.878)--(6.043,19.856)--(5.816,19.837)--(5.585,19.821)--(5.351,19.809)--(5.116,19.8)--(4.88,19.795)--(4.642,19.793)--(4.405,19.795)--(4.169,19.8)--(3.933,19.809)--(3.7,19.821)--(3.469,19.836)--(3.242,19.855)--(3.018,19.877)--(2.799,19.903)--(2.584,19.931)--(2.376,19.963)--(2.173,19.998)--(1.978,20.035)--(1.789,20.076)--(1.609,20.119)--(1.437,20.165)--(1.273,20.213)--(1.119,20.263)--(0.974,20.316)--(0.84,20.371)--(0.716,20.427)--(0.603,20.486)--(0.5,20.546)--(0.409,20.607)--(0.33,20.67)--(0.263,20.734)--(0.207,20.798)--(0.164,20.863)--(0.133,20.929)--(0.114,20.996)--(0.108,21.062)--(0.114,21.128)--(0.132,21.195)--(0.163,21.261)--(0.206,21.326)--(0.262,21.391)--(0.329,21.454)--(0.408,21.517)--(0.499,21.578)--(0.601,21.638)--(0.714,21.697)--(0.838,21.753)--(0.972,21.808)--(1.117,21.861)--(1.271,21.911)--(1.434,21.96)--(1.606,22.005)--(1.787,22.049)--(1.975,22.089)--(2.17,22.127)--(2.373,22.161)--(2.581,22.193)--(2.795,22.222)--(3.015,22.247)--(3.238,22.269)--(3.466,22.288)--(3.696,22.304)--(3.93,22.316)--(4.165,22.325)--(4.402,22.33)--(4.639,22.332)--(4.876,22.33)--(5.113,22.325)--(5.348,22.316)--(5.581,22.304)--(5.812,22.289)--(6.04,22.27)--(6.263,22.248)--(6.483,22.222)--(6.697,22.194)--(6.906,22.162)--(7.108,22.127)--(7.304,22.09)--(7.492,22.049)--(7.672,22.006)--(7.845,21.96)--(8.008,21.912)--(8.162,21.862)--(8.307,21.809)--(8.441,21.754)--(8.565,21.698)--(8.679,21.639)--(8.781,21.579)--(8.872,21.518)--(8.951,21.455)--(9.019,21.391)--(9.074,21.327)--(9.117,21.262)--(9.149,21.196)--(9.167,21.129)--(9.174,21.063)--(9.167,20.997)--(9.149,20.93)--(9.118,20.864)--(9.075,20.799)--(9.02,20.734)--(8.952,20.671)--(8.873,20.608)--(8.782,20.547)--(8.68,20.487)--(8.567,20.428)--(8.443,20.372)--(8.309,20.317)--(8.164,20.264)--(8.01,20.214)--cycle;
					
					\\fill[color = ffffhh, opacity = 0.2](7.847,20.165)--(7.675,20.12)--(7.495,20.076)--(7.306,20.036)--(7.111,19.998)--(6.909,19.964)--(6.7,19.932)--(6.486,19.903)--(6.267,19.878)--(6.043,19.856)--(5.816,19.837)--(5.585,19.821)--(5.351,19.809)--(5.116,19.8)--(4.88,19.795)--(4.642,19.793)--(4.405,19.795)--(4.169,19.8)--(3.933,19.809)--(3.7,19.821)--(3.469,19.836)--(3.242,19.855)--(3.018,19.877)--(2.799,19.903)--(2.584,19.931)--(2.376,19.963)--(2.173,19.998)--(1.978,20.035)--(1.789,20.076)--(1.609,20.119)--(1.437,20.165)--(1.273,20.213)--(1.119,20.263)--(0.974,20.316)--(0.84,20.371)--(0.716,20.427)--(0.603,20.486)--(0.5,20.546)--(0.409,20.607)--(0.33,20.67)--(0.263,20.734)--(0.207,20.798)--(0.164,20.863)--(0.133,20.929)--(0.114,20.996)--(0.108,21.062)--(0.114,21.128)--(0.132,21.195)--(0.163,21.261)--(0.206,21.326)--(0.262,21.391)--(0.329,21.454)--(0.408,21.517)--(0.499,21.578)--(0.601,21.638)--(0.714,21.697)--(0.838,21.753)--(0.972,21.808)--(1.117,21.861)--(1.271,21.911)--(1.434,21.96)--(1.606,22.005)--(1.787,22.049)--(1.975,22.089)--(2.17,22.127)--(2.373,22.161)--(2.581,22.193)--(2.795,22.222)--(3.015,22.247)--(3.238,22.269)--(3.466,22.288)--(3.696,22.304)--(3.93,22.316)--(4.165,22.325)--(4.402,22.33)--(4.639,22.332)--(4.876,22.33)--(5.113,22.325)--(5.348,22.316)--(5.581,22.304)--(5.812,22.289)--(6.04,22.27)--(6.263,22.248)--(6.483,22.222)--(6.697,22.194)--(6.906,22.162)--(7.108,22.127)--(7.304,22.09)--(7.492,22.049)--(7.672,22.006)--(7.845,21.96)--(8.008,21.912)--(8.162,21.862)--(8.307,21.809)--(8.441,21.754)--(8.565,21.698)--(8.679,21.639)--(8.781,21.579)--(8.872,21.518)--(8.951,21.455)--(9.019,21.391)--(9.074,21.327)--(9.117,21.262)--(9.149,21.196)--(9.167,21.129)--(9.174,21.063)--(9.167,20.997)--(9.149,20.93)--(9.118,20.864)--(9.075,20.799)--(9.02,20.734)--(8.952,20.671)--(8.873,20.608)--(8.782,20.547)--(8.68,20.487)--(8.567,20.428)--(8.443,20.372)--(8.309,20.317)--(8.164,20.264)--(8.01,20.214)(7.847,20.165);
					\\draw [color=black , line width = 0.8](4.641,8.629)--(9.15,20.933);
					\\draw [color=black , line width = 0.8](4.641,8.629)--(0.131,20.933);
					\\draw [color=dpdpdp , line width = 0.4](4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629)--(4.641,8.629);
					
					\\draw [color=dpdpdp , line width = 0.4](4.14,10.025)--(4.138,10.019)--(4.137,10.013)--(4.137,10.007)--(4.138,10.001)--(4.14,9.995)--(4.143,9.99)--(4.146,9.984)--(4.151,9.978)--(4.156,9.972)--(4.163,9.966)--(4.17,9.961)--(4.178,9.955)--(4.187,9.95)--(4.196,9.944)--(4.207,9.939)--(4.218,9.934)--(4.23,9.929)--(4.243,9.924)--(4.256,9.92)--(4.27,9.915)--(4.285,9.911)--(4.301,9.907)--(4.317,9.903)--(4.333,9.899)--(4.35,9.896)--(4.368,9.892)--(4.386,9.889)--(4.405,9.886)--(4.424,9.884)--(4.443,9.881)--(4.463,9.879)--(4.483,9.877)--(4.504,9.875)--(4.524,9.874)--(4.545,9.872)--(4.566,9.871)--(4.587,9.871)--(4.609,9.87)--(4.63,9.87)--(4.651,9.87)--(4.673,9.87)--(4.694,9.871)--(4.715,9.871)--(4.736,9.872)--(4.757,9.874)--(4.778,9.875)--(4.798,9.877)--(4.818,9.879)--(4.838,9.881)--(4.857,9.884)--(4.876,9.886)--(4.895,9.889)--(4.913,9.892)--(4.931,9.896)--(4.948,9.899)--(4.965,9.903)--(4.981,9.907)--(4.996,9.911)--(5.011,9.915)--(5.025,9.92)--(5.038,9.924)--(5.051,9.929)--(5.063,9.934)--(5.074,9.939)--(5.085,9.944)--(5.094,9.95)--(5.103,9.955)--(5.111,9.961)--(5.119,9.966)--(5.125,9.972)--(5.13,9.978)--(5.135,9.984)--(5.138,9.99)--(5.141,9.995)--(5.143,10.001)--(5.144,10.007)--(5.144,10.013)--(5.143,10.019)--(5.142,10.025);
					
					\\draw [color=dpdpdp , line width = 0.4](3.639,11.421)--(3.635,11.409)--(3.633,11.397)--(3.634,11.385)--(3.636,11.373)--(3.639,11.361)--(3.645,11.35)--(3.652,11.338)--(3.661,11.326)--(3.672,11.315)--(3.685,11.303)--(3.699,11.292)--(3.715,11.281)--(3.733,11.27)--(3.752,11.259)--(3.773,11.249)--(3.796,11.239)--(3.82,11.229)--(3.845,11.219)--(3.872,11.21)--(3.9,11.201)--(3.93,11.193)--(3.96,11.184)--(3.993,11.176)--(4.026,11.169)--(4.06,11.162)--(4.096,11.155)--(4.132,11.149)--(4.169,11.143)--(4.207,11.138)--(4.246,11.133)--(4.286,11.128)--(4.326,11.124)--(4.367,11.121)--(4.408,11.118)--(4.45,11.115)--(4.492,11.113)--(4.534,11.112)--(4.577,11.111)--(4.619,11.11)--(4.662,11.11)--(4.705,11.111)--(4.747,11.112)--(4.789,11.113)--(4.831,11.115)--(4.873,11.118)--(4.914,11.121)--(4.955,11.124)--(4.995,11.128)--(5.035,11.133)--(5.074,11.138)--(5.112,11.143)--(5.149,11.149)--(5.186,11.155)--(5.221,11.162)--(5.255,11.169)--(5.289,11.176)--(5.321,11.184)--(5.352,11.193)--(5.381,11.201)--(5.409,11.21)--(5.436,11.219)--(5.462,11.229)--(5.486,11.239)--(5.508,11.249)--(5.529,11.259)--(5.548,11.27)--(5.566,11.281)--(5.582,11.292)--(5.596,11.303)--(5.609,11.315)--(5.62,11.326)--(5.629,11.338)--(5.636,11.35)--(5.642,11.361)--(5.646,11.373)--(5.648,11.385)--(5.648,11.397)--(5.646,11.409)--(5.643,11.421);
					
					\\draw [color=dpdpdp , line width = 0.4](3.138,12.817)--(3.132,12.799)--(3.13,12.781)--(3.13,12.763)--(3.133,12.745)--(3.139,12.728)--(3.147,12.71)--(3.158,12.692)--(3.172,12.675)--(3.188,12.657)--(3.207,12.64)--(3.228,12.623)--(3.252,12.607)--(3.279,12.59)--(3.308,12.574)--(3.339,12.559)--(3.373,12.544)--(3.409,12.529)--(3.447,12.514)--(3.487,12.5)--(3.53,12.487)--(3.574,12.474)--(3.62,12.462)--(3.669,12.45)--(3.718,12.439)--(3.77,12.428)--(3.823,12.418)--(3.878,12.409)--(3.933,12.4)--(3.991,12.392)--(4.049,12.384)--(4.108,12.378)--(4.169,12.372)--(4.23,12.367)--(4.292,12.362)--(4.354,12.358)--(4.417,12.355)--(4.481,12.353)--(4.545,12.352)--(4.609,12.351)--(4.673,12.351)--(4.737,12.352)--(4.8,12.353)--(4.864,12.355)--(4.927,12.358)--(4.989,12.362)--(5.051,12.367)--(5.113,12.372)--(5.173,12.378)--(5.232,12.384)--(5.291,12.392)--(5.348,12.4)--(5.404,12.409)--(5.458,12.418)--(5.511,12.428)--(5.563,12.439)--(5.613,12.45)--(5.661,12.462)--(5.707,12.474)--(5.751,12.487)--(5.794,12.5)--(5.834,12.514)--(5.872,12.529)--(5.908,12.544)--(5.942,12.559)--(5.973,12.574)--(6.002,12.59)--(6.029,12.607)--(6.053,12.623)--(6.074,12.64)--(6.093,12.657)--(6.11,12.675)--(6.123,12.692)--(6.134,12.71)--(6.143,12.728)--(6.148,12.745)--(6.151,12.763)--(6.151,12.781)--(6.149,12.799)--(6.144,12.817);
					
					\\draw [color=dpdpdp , line width = 0.4](2.637,14.213)--(2.63,14.189)--(2.626,14.165)--(2.627,14.141)--(2.631,14.117)--(2.638,14.094)--(2.649,14.07)--(2.664,14.046)--(2.682,14.023)--(2.704,14)--(2.729,13.977)--(2.758,13.955)--(2.79,13.932)--(2.825,13.911)--(2.864,13.889)--(2.906,13.869)--(2.95,13.848)--(2.998,13.828)--(3.049,13.809)--(3.103,13.791)--(3.16,13.773)--(3.219,13.756)--(3.28,13.739)--(3.345,13.723)--(3.411,13.708)--(3.48,13.694)--(3.55,13.681)--(3.623,13.668)--(3.698,13.657)--(3.774,13.646)--(3.852,13.636)--(3.931,13.627)--(4.011,13.619)--(4.093,13.612)--(4.176,13.606)--(4.259,13.601)--(4.343,13.597)--(4.428,13.594)--(4.513,13.592)--(4.598,13.591)--(4.683,13.591)--(4.769,13.592)--(4.854,13.594)--(4.938,13.597)--(5.022,13.601)--(5.106,13.606)--(5.188,13.612)--(5.27,13.619)--(5.35,13.627)--(5.43,13.636)--(5.507,13.646)--(5.584,13.657)--(5.658,13.668)--(5.731,13.681)--(5.802,13.694)--(5.87,13.708)--(5.937,13.723)--(6.001,13.739)--(6.063,13.756)--(6.122,13.773)--(6.178,13.791)--(6.232,13.809)--(6.283,13.828)--(6.331,13.848)--(6.376,13.869)--(6.418,13.889)--(6.456,13.911)--(6.491,13.932)--(6.523,13.955)--(6.552,13.977)--(6.577,14)--(6.599,14.023)--(6.617,14.046)--(6.632,14.07)--(6.643,14.094)--(6.651,14.117)--(6.655,14.141)--(6.655,14.165)--(6.652,14.189)--(6.645,14.213);
					
					\\draw [color=dpdpdp , line width = 0.4](2.136,15.609)--(2.127,15.579)--(2.123,15.549)--(2.123,15.519)--(2.128,15.489)--(2.137,15.46)--(2.151,15.43)--(2.17,15.401)--(2.192,15.371)--(2.22,15.343)--(2.251,15.314)--(2.287,15.286)--(2.327,15.258)--(2.371,15.231)--(2.42,15.204)--(2.472,15.178)--(2.528,15.153)--(2.588,15.128)--(2.651,15.104)--(2.719,15.081)--(2.789,15.059)--(2.863,15.037)--(2.94,15.017)--(3.02,14.997)--(3.104,14.978)--(3.189,14.96)--(3.278,14.944)--(3.369,14.928)--(3.462,14.914)--(3.557,14.9)--(3.654,14.888)--(3.753,14.877)--(3.854,14.867)--(3.956,14.858)--(4.059,14.851)--(4.164,14.844)--(4.269,14.839)--(4.374,14.836)--(4.481,14.833)--(4.587,14.832)--(4.694,14.832)--(4.801,14.833)--(4.907,14.836)--(5.013,14.839)--(5.118,14.844)--(5.222,14.851)--(5.325,14.858)--(5.427,14.867)--(5.528,14.877)--(5.627,14.888)--(5.724,14.9)--(5.819,14.914)--(5.912,14.928)--(6.003,14.944)--(6.092,14.96)--(6.178,14.978)--(6.261,14.997)--(6.341,15.017)--(6.418,15.037)--(6.492,15.059)--(6.563,15.081)--(6.63,15.104)--(6.693,15.128)--(6.753,15.153)--(6.809,15.178)--(6.862,15.204)--(6.91,15.231)--(6.954,15.258)--(6.994,15.286)--(7.03,15.314)--(7.062,15.343)--(7.089,15.371)--(7.112,15.401)--(7.13,15.43)--(7.144,15.46)--(7.153,15.489)--(7.158,15.519)--(7.159,15.549)--(7.154,15.579)--(7.146,15.609);
					
					\\draw [color=dpdpdp , line width = 0.4](1.634,17.005)--(1.624,16.969)--(1.619,16.933)--(1.62,16.897)--(1.626,16.861)--(1.637,16.826)--(1.653,16.79)--(1.676,16.755)--(1.703,16.72)--(1.735,16.685)--(1.773,16.651)--(1.816,16.617)--(1.864,16.584)--(1.917,16.551)--(1.975,16.519)--(2.038,16.488)--(2.105,16.458)--(2.177,16.428)--(2.254,16.399)--(2.334,16.371)--(2.419,16.345)--(2.508,16.319)--(2.6,16.294)--(2.696,16.27)--(2.796,16.248)--(2.899,16.227)--(3.005,16.207)--(3.114,16.188)--(3.226,16.17)--(3.341,16.154)--(3.457,16.14)--(3.576,16.126)--(3.697,16.114)--(3.819,16.104)--(3.943,16.095)--(4.068,16.087)--(4.194,16.081)--(4.321,16.077)--(4.449,16.074)--(4.577,16.072)--(4.705,16.072)--(4.832,16.074)--(4.96,16.077)--(5.087,16.081)--(5.213,16.087)--(5.338,16.095)--(5.462,16.104)--(5.585,16.114)--(5.705,16.126)--(5.824,16.14)--(5.941,16.154)--(6.055,16.17)--(6.167,16.188)--(6.276,16.207)--(6.382,16.227)--(6.485,16.248)--(6.585,16.27)--(6.681,16.294)--(6.774,16.319)--(6.862,16.345)--(6.947,16.371)--(7.028,16.399)--(7.104,16.428)--(7.176,16.458)--(7.243,16.488)--(7.306,16.519)--(7.364,16.551)--(7.417,16.584)--(7.465,16.617)--(7.508,16.651)--(7.546,16.685)--(7.578,16.72)--(7.606,16.755)--(7.628,16.79)--(7.644,16.826)--(7.656,16.861)--(7.662,16.897)--(7.662,16.933)--(7.657,16.969)--(7.647,17.005);
					
					\\draw [color=dpdpdp , line width = 0.4](1.133,18.4)--(1.121,18.359)--(1.116,18.317)--(1.116,18.275)--(1.123,18.233)--(1.136,18.192)--(1.156,18.15)--(1.181,18.109)--(1.213,18.068)--(1.251,18.028)--(1.295,17.988)--(1.346,17.948)--(1.402,17.91)--(1.464,17.872)--(1.531,17.834)--(1.604,17.798)--(1.683,17.762)--(1.767,17.728)--(1.856,17.694)--(1.95,17.662)--(2.049,17.63)--(2.152,17.6)--(2.26,17.571)--(2.372,17.544)--(2.489,17.518)--(2.609,17.493)--(2.733,17.469)--(2.86,17.448)--(2.99,17.427)--(3.124,17.408)--(3.26,17.391)--(3.399,17.376)--(3.539,17.362)--(3.682,17.35)--(3.827,17.339)--(3.973,17.33)--(4.12,17.323)--(4.268,17.318)--(4.417,17.314)--(4.566,17.313)--(4.715,17.313)--(4.864,17.314)--(5.013,17.318)--(5.161,17.323)--(5.309,17.33)--(5.455,17.339)--(5.599,17.35)--(5.742,17.362)--(5.883,17.376)--(6.021,17.391)--(6.157,17.408)--(6.291,17.427)--(6.421,17.448)--(6.548,17.469)--(6.672,17.493)--(6.793,17.518)--(6.909,17.544)--(7.021,17.571)--(7.129,17.6)--(7.233,17.63)--(7.331,17.662)--(7.425,17.694)--(7.515,17.728)--(7.598,17.762)--(7.677,17.798)--(7.75,17.834)--(7.818,17.872)--(7.88,17.91)--(7.936,17.948)--(7.986,17.988)--(8.03,18.028)--(8.068,18.068)--(8.1,18.109)--(8.126,18.15)--(8.145,18.192)--(8.158,18.233)--(8.165,18.275)--(8.166,18.317)--(8.16,18.359)--(8.148,18.4);
					
					\\draw [color=dpdpdp , line width = 0.4](0.632,19.796)--(0.619,19.749)--(0.612,19.701)--(0.613,19.653)--(0.62,19.605)--(0.636,19.558)--(0.658,19.51)--(0.687,19.463)--(0.724,19.417)--(0.767,19.37)--(0.818,19.325)--(0.875,19.28)--(0.939,19.235)--(1.01,19.192)--(1.087,19.149)--(1.17,19.108)--(1.26,19.067)--(1.356,19.028)--(1.458,18.989)--(1.565,18.952)--(1.678,18.916)--(1.797,18.882)--(1.92,18.849)--(2.048,18.817)--(2.181,18.787)--(2.319,18.759)--(2.46,18.732)--(2.606,18.707)--(2.755,18.684)--(2.907,18.663)--(3.063,18.643)--(3.221,18.625)--(3.382,18.609)--(3.545,18.595)--(3.71,18.583)--(3.877,18.573)--(4.045,18.565)--(4.215,18.559)--(4.385,18.555)--(4.555,18.553)--(4.726,18.553)--(4.896,18.555)--(5.066,18.559)--(5.236,18.565)--(5.404,18.573)--(5.571,18.583)--(5.736,18.595)--(5.899,18.609)--(6.06,18.625)--(6.219,18.643)--(6.374,18.663)--(6.527,18.684)--(6.676,18.707)--(6.821,18.732)--(6.963,18.759)--(7.1,18.787)--(7.233,18.817)--(7.361,18.849)--(7.485,18.882)--(7.603,18.916)--(7.716,18.952)--(7.823,18.989)--(7.925,19.028)--(8.021,19.067)--(8.111,19.108)--(8.194,19.149)--(8.272,19.192)--(8.342,19.235)--(8.406,19.28)--(8.464,19.325)--(8.514,19.37)--(8.558,19.417)--(8.594,19.463)--(8.623,19.51)--(8.646,19.558)--(8.661,19.605)--(8.669,19.653)--(8.669,19.701)--(8.663,19.749)--(8.649,19.796);
					
					\\draw [color=dpdpdp , line width = 0.4](0.131,21.192)--(0.116,21.138)--(0.108,21.085)--(0.109,21.031)--(0.118,20.977)--(0.135,20.924)--(0.16,20.87)--(0.193,20.818)--(0.234,20.765)--(0.283,20.713)--(0.34,20.662)--(0.404,20.611)--(0.476,20.561)--(0.556,20.512)--(0.643,20.464)--(0.737,20.418)--(0.838,20.372)--(0.946,20.327)--(1.06,20.284)--(1.181,20.242)--(1.308,20.202)--(1.441,20.163)--(1.58,20.126)--(1.724,20.091)--(1.874,20.057)--(2.028,20.025)--(2.188,19.995)--(2.351,19.967)--(2.519,19.941)--(2.69,19.917)--(2.865,19.895)--(3.044,19.875)--(3.225,19.857)--(3.408,19.841)--(3.594,19.828)--(3.782,19.816)--(3.971,19.807)--(4.162,19.8)--(4.353,19.796)--(4.545,19.794)--(4.737,19.794)--(4.928,19.796)--(5.12,19.8)--(5.31,19.807)--(5.499,19.816)--(5.687,19.828)--(5.873,19.841)--(6.056,19.857)--(6.238,19.875)--(6.416,19.895)--(6.591,19.917)--(6.762,19.941)--(6.93,19.967)--(7.094,19.995)--(7.253,20.025)--(7.407,20.057)--(7.557,20.091)--(7.701,20.126)--(7.84,20.163)--(7.973,20.202)--(8.1,20.242)--(8.221,20.284)--(8.336,20.327)--(8.444,20.372)--(8.545,20.418)--(8.639,20.464)--(8.725,20.512)--(8.805,20.561)--(8.877,20.611)--(8.942,20.662)--(8.998,20.713)--(9.047,20.765)--(9.088,20.818)--(9.121,20.87)--(9.146,20.924)--(9.163,20.977)--(9.172,21.031)--(9.173,21.085)--(9.165,21.138)--(9.15,21.192);
					
					\\draw [color=black , line width = 0.8](0.131,21.192)--(0.12,21.157)--(0.113,21.121)--(0.108,21.085)--(0.108,21.05)--(0.111,21.014)--(0.118,20.978)--(0.128,20.943)--(0.142,20.907)--(0.159,20.872)--(0.18,20.837)--(0.205,20.802)--(0.232,20.767)--(0.264,20.732)--(0.299,20.698)--(0.337,20.664)--(0.379,20.63)--(0.424,20.597)--(0.472,20.564)--(0.524,20.531)--(0.579,20.499)--(0.637,20.467)--(0.699,20.436)--(0.763,20.405)--(0.831,20.375)--(0.901,20.345)--(0.975,20.316)--(1.051,20.287)--(1.13,20.259)--(1.212,20.232)--(1.297,20.205)--(1.385,20.179)--(1.475,20.154)--(1.567,20.13)--(1.662,20.106)--(1.759,20.083)--(1.859,20.06)--(1.96,20.039)--(2.064,20.018)--(2.17,19.998)--(2.278,19.979)--(2.388,19.961)--(2.499,19.944)--(2.612,19.927)--(2.727,19.912)--(2.843,19.897)--(2.961,19.884)--(3.08,19.871)--(3.2,19.859)--(3.322,19.848)--(3.444,19.838)--(3.568,19.829)--(3.692,19.821)--(3.817,19.814)--(3.942,19.808)--(4.069,19.803)--(4.195,19.799)--(4.322,19.796)--(4.449,19.794)--(4.577,19.793)--(4.704,19.793)--(4.832,19.794)--(4.959,19.796)--(5.086,19.799)--(5.213,19.803)--(5.339,19.808)--(5.465,19.814)--(5.589,19.821)--(5.714,19.829)--(5.837,19.838)--(5.96,19.848)--(6.081,19.859)--(6.201,19.871)--(6.32,19.884)--(6.438,19.897)--(6.554,19.912)--(6.669,19.927)--(6.782,19.944)--(6.894,19.961)--(7.003,19.979)--(7.111,19.998)--(7.217,20.018)--(7.321,20.039)--(7.423,20.06)--(7.522,20.083)--(7.619,20.106)--(7.714,20.13)--(7.807,20.154)--(7.897,20.179)--(7.984,20.205)--(8.069,20.232)--(8.151,20.259)--(8.23,20.287)--(8.306,20.316)--(8.38,20.345)--(8.451,20.375)--(8.518,20.405)--(8.583,20.436)--(8.644,20.467)--(8.702,20.499)--(8.757,20.531)--(8.809,20.564)--(8.857,20.597)--(8.902,20.63)--(8.944,20.664)--(8.982,20.698)--(9.017,20.732)--(9.049,20.767)--(9.077,20.802)--(9.101,20.837)--(9.122,20.872)--(9.139,20.907)--(9.153,20.943)--(9.164,20.978)--(9.17,21.014)--(9.173,21.05)--(9.173,21.085)--(9.169,21.121)--(9.161,21.157)--(9.15,21.192);
					
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(7.847,20.165);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(6.909,19.964);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(5.816,19.837);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(4.642,19.793);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(3.469,19.836);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(2.376,19.963);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(1.437,20.165);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(0.716,20.427);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(0.263,20.734);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(0.108,21.062);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(0.262,21.391);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(0.714,21.697);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(1.434,21.96);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(2.373,22.161);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(3.466,22.288);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(4.639,22.332);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(5.812,22.289);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(6.906,22.162);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(7.845,21.96);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(8.565,21.698);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(9.019,21.391);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(9.174,21.063);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(9.02,20.734);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(8.567,20.428);
					\\draw [color=bdbdbd , dotted, line width = 0.4](4.641,8.629)--(7.847,20.165);
					\\fill[color=black] (4.641,13.603) circle (0.063);
					\\node at (3.641, 13.884) [align=left,inner sep = 0pt, outer sep = 0pt,below right,black,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {$\\text{O'}$};
					\\draw [color=enenen , line width = 0.4](4.641,8.629)--(5.051,20.948);
					\\draw [color=enenen , line width = 0.4](7.818,21.953)--(4.641,8.629);
					\\draw [color=alalal , dotted, line width = 0.4](6.424,13.512)--(6.405,13.486)--(6.381,13.46)--(6.352,13.435)--(6.319,13.411)--(6.281,13.386)--(6.239,13.363)--(6.192,13.34)--(6.142,13.318)--(6.087,13.296)--(6.028,13.276)--(5.966,13.256)--(5.899,13.237)--(5.83,13.219)--(5.757,13.203)--(5.682,13.187)--(5.603,13.172)--(5.522,13.159)--(5.439,13.147)--(5.353,13.136)--(5.266,13.126)--(5.177,13.118)--(5.086,13.111)--(4.994,13.105)--(4.901,13.1)--(4.808,13.097)--(4.714,13.095)--(4.62,13.095)--(4.526,13.096)--(4.432,13.098)--(4.339,13.102)--(4.246,13.107)--(4.155,13.114)--(4.065,13.121)--(3.977,13.13)--(3.89,13.141)--(3.805,13.152)--(3.723,13.165)--(3.643,13.179)--(3.566,13.194)--(3.491,13.21)--(3.42,13.227)--(3.352,13.245)--(3.288,13.265)--(3.227,13.285)--(3.17,13.306)--(3.117,13.328)--(3.068,13.35)--(3.023,13.373)--(2.983,13.397)--(2.947,13.421)--(2.916,13.446)--(2.889,13.472)--(2.867,13.497)--(2.85,13.523)--(2.838,13.549)--(2.83,13.576)--(2.827,13.602)--(2.83,13.628)--(2.837,13.655)--(2.849,13.681)--(2.866,13.707)--(2.888,13.732)--(2.914,13.758)--(2.945,13.782)--(2.981,13.807)--(3.021,13.831)--(3.065,13.854)--(3.114,13.876)--(3.167,13.898)--(3.223,13.919)--(3.284,13.939)--(3.348,13.959)--(3.416,13.977)--(3.487,13.994)--(3.561,14.011)--(3.638,14.026)--(3.718,14.04)--(3.8,14.053)--(3.885,14.064)--(3.972,14.074)--(4.06,14.084)--(4.15,14.091)--(4.241,14.098)--(4.333,14.103)--(4.427,14.107)--(4.52,14.109)--(4.614,14.11)--(4.709,14.11)--(4.802,14.108)--(4.896,14.105)--(4.989,14.101)--(5.081,14.095)--(5.171,14.088)--(5.261,14.08)--(5.348,14.07)--(5.434,14.059)--(5.518,14.047)--(5.599,14.034)--(5.677,14.019)--(5.753,14.004)--(5.826,13.987)--(5.896,13.969)--(5.962,13.95)--(6.024,13.931)--(6.083,13.91)--(6.138,13.889)--(6.189,13.867)--(6.236,13.844)--(6.279,13.82)--(6.317,13.796)--(6.351,13.771)--(6.38,13.746)--(6.404,13.721)--(6.423,13.695)--(6.438,13.669)--(6.448,13.643)--(6.453,13.617)--(6.453,13.59)--(6.448,13.564)--cycle;
					
					\\fill[color = ffhhhh, opacity = 0.2](6.424,13.512)--(6.405,13.486)--(6.381,13.46)--(6.352,13.435)--(6.319,13.411)--(6.281,13.386)--(6.239,13.363)--(6.192,13.34)--(6.142,13.318)--(6.087,13.296)--(6.028,13.276)--(5.966,13.256)--(5.899,13.237)--(5.83,13.219)--(5.757,13.203)--(5.682,13.187)--(5.603,13.172)--(5.522,13.159)--(5.439,13.147)--(5.353,13.136)--(5.266,13.126)--(5.177,13.118)--(5.086,13.111)--(4.994,13.105)--(4.901,13.1)--(4.808,13.097)--(4.714,13.095)--(4.62,13.095)--(4.526,13.096)--(4.432,13.098)--(4.339,13.102)--(4.246,13.107)--(4.155,13.114)--(4.065,13.121)--(3.977,13.13)--(3.89,13.141)--(3.805,13.152)--(3.723,13.165)--(3.643,13.179)--(3.566,13.194)--(3.491,13.21)--(3.42,13.227)--(3.352,13.245)--(3.288,13.265)--(3.227,13.285)--(3.17,13.306)--(3.117,13.328)--(3.068,13.35)--(3.023,13.373)--(2.983,13.397)--(2.947,13.421)--(2.916,13.446)--(2.889,13.472)--(2.867,13.497)--(2.85,13.523)--(2.838,13.549)--(2.83,13.576)--(2.827,13.602)--(2.83,13.628)--(2.837,13.655)--(2.849,13.681)--(2.866,13.707)--(2.888,13.732)--(2.914,13.758)--(2.945,13.782)--(2.981,13.807)--(3.021,13.831)--(3.065,13.854)--(3.114,13.876)--(3.167,13.898)--(3.223,13.919)--(3.284,13.939)--(3.348,13.959)--(3.416,13.977)--(3.487,13.994)--(3.561,14.011)--(3.638,14.026)--(3.718,14.04)--(3.8,14.053)--(3.885,14.064)--(3.972,14.074)--(4.06,14.084)--(4.15,14.091)--(4.241,14.098)--(4.333,14.103)--(4.427,14.107)--(4.52,14.109)--(4.614,14.11)--(4.709,14.11)--(4.802,14.108)--(4.896,14.105)--(4.989,14.101)--(5.081,14.095)--(5.171,14.088)--(5.261,14.08)--(5.348,14.07)--(5.434,14.059)--(5.518,14.047)--(5.599,14.034)--(5.677,14.019)--(5.753,14.004)--(5.826,13.987)--(5.896,13.969)--(5.962,13.95)--(6.024,13.931)--(6.083,13.91)--(6.138,13.889)--(6.189,13.867)--(6.236,13.844)--(6.279,13.82)--(6.317,13.796)--(6.351,13.771)--(6.38,13.746)--(6.404,13.721)--(6.423,13.695)--(6.438,13.669)--(6.448,13.643)--(6.453,13.617)--(6.453,13.59)--(6.448,13.564)(6.424,13.512);
					\\node at (3.953, 8.694) [align=left,below right ,black,,font= \\sf \\fontsize {0.469cm} {0.586cm} \\selectfont] {S};
					\\draw [color=black , dotted, line width = 0.4](4.641,8.629)--(9.174,21.063);
					\\draw [color=ofofof , dotted, line width = 0.4](4.641,13.603)--(6.454,13.603);
					\\draw [color=black , dotted, line width = 0.4](4.641,21.063)--(9.174,21.063);
					\\draw [color=black , dotted, line width = 0.4](4.641,21.063)--(4.641,8.629);
					\\draw [color=black , dotted, line width = 0.4](4.641,13.987)--(4.641,13.603);
					\\draw [color=black , dotted, line width = 0.4](4.641,13.603)--(5.041,13.603);
					\\draw [color=black , dotted, line width = 0.4](5.041,13.603)--(5.041,13.987);
					\\draw [color=black , dotted, line width = 0.4](5.041,13.987)--(4.641,13.987);
					\\draw [color=black , dotted, line width = 0.4](4.641,13.987)--(4.641,13.603)--(5.041,13.603)--(5.041,13.987)--(4.641,13.987)--cycle;
					\\draw [color=black , dotted, line width = 0.4](4.641,21.447)--(4.641,21.063);
					\\draw [color=black , dotted, line width = 0.4](4.641,21.063)--(5.041,21.063);
					\\draw [color=black , dotted, line width = 0.4](5.041,21.063)--(5.041,21.447);
					\\draw [color=black , dotted, line width = 0.4](5.041,21.447)--(4.641,21.447);
					\\draw [color=black , dotted, line width = 0.4](4.641,21.447)--(4.641,21.063)--(5.041,21.063)--(5.041,21.447)--(4.641,21.447)--cycle;
					\\end{tikzpicture} \n\t \\end{minipage}`
					texte_corr = num_alpha(0) + ` Le volume du cône est $\\\dfrac{A_\\text{base}}{3}\\times \\text{hauteur}$ cm${exposant(3)} $= \\dfrac{${tex_nombrec(r * r)}\\pi}{3} \\times ${tex_nombre(h1)}$ cm${exposant(3)} $= \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)} $\\approx ${tex_nombrec(arrondi(r * r * h1 * Math.PI / 3,3))}$ cm${exposant(3)}.<br>`
					texte_corr += num_alpha(1) + ` Le cône de chocolat est une réduction du cône complet. Le coefficient de réduction est $\\dfrac{${tex_nombre(h2)}}{${tex_nombre(h1)}}`
					if (!Number.isInteger(h1) || pgcd(h2, h1) > 1) texte_corr += `=${tex_fraction_reduite(h2 * 10, h1 * 10)}$.<br>`
					else texte_corr += `.$<br>`
					texte_corr += ` Dans une réduction de coefficient k, les volumes sont multipliés par k${exposant(3)}.<br>`
					texte_corr+= `Donc le volume du cône de hauteur SO' est : $\\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^3 \\times \\dfrac{${tex_nombrec(r * r * h1)}}{3}\\pi$ cm${exposant(3)} $ \\approx ${tex_nombrec(arrondi(Math.PI * h2 ** 3 * r * r / h1 ** 2 / 3,3))}$ cm${exposant(3)}.<br>`
					texte_corr += num_alpha(2) + ` Le volume de glace est la différence entre les deux volumes précédents :<br>`
					texte_corr += `$${tex_nombrec(arrondi(r * r * h1 * Math.PI / 3,3))}$ cm${exposant(3)}$ - ${tex_nombrec(arrondi(Math.PI * h2 ** 3 * r * r / h1 ** 2 / 3,3))}$ cm${exposant(3)} $ \\approx ${tex_nombrec(arrondi(r * r * h1 * Math.PI / 3-Math.PI * h2 ** 3 * r * r / h1 ** 2 / 3,2))}$ cm${exposant(3)}.<br>`
					texte_corr += num_alpha(3) + ` Si on verse la glace au fond du cône, on obtient une nouvelle réduction du cône complet.<br>`
					texte_corr += `Soit k\' le coefficient de cette réduction, on a : k\'${exposant(3)} $= 1- \\text{k}^3$`
					texte_corr +=`, d'où k\' `
					texte_corr += `$= \\sqrt[3]{1-{\\text{k}^3}}$.<br>`
					texte_corr += `Donc k\' = $\\sqrt[3]{1 - \\left(${tex_fraction_reduite(h2 * 10, h1 * 10)}\\right)^3} \\approx ${tex_nombre(arrondi(Math.cbrt(1-(h2/h1)**3),4))}$.<br>`
					texte_corr += `On en déduit que la hauteur de glace est approximativement : $${tex_nombre(arrondi(Math.cbrt(1-(h2/h1)**3),4))} \\times ${tex_nombre(h1)}$ cm $\\approx ${tex_nombre(arrondi(h1*Math.cbrt(1-(h2/h1)**3),4))}$ cm.<br>`
					texte_corr += num_alpha(4) + ` L'épaisseur de chocolat est alors de : $${tex_nombre(h1)}\\text{ cm}-${tex_nombre(arrondi(h1*Math.cbrt(1-(h2/h1)**3),4))} \\text{ cm}\\approx ${tex_nombre(arrondi(10*(h1-h1*Math.cbrt(1-(h2/h1)**3)),3))}$ mm !`
					this.MG32codeBase64 = codeBase64
					this.MG32code_pour_modifier_la_figure = `
							 mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "r", "${r}");
							 mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h1", "${h1}");
							 mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "h2", "${h2}");							 
							 mtg32App.calculate("MG32svg${numero_de_l_exercice}");
							 mtg32App.display("MG32svg${numero_de_l_exercice}");
							 `
					break;
			}


			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			liste_de_question_to_contenu(this);


	//	}

	}

	this.besoin_formulaire_numerique = ['Type d\'exercices', 3, '1 : Calcul d\' aire et de volumes\n 2 : Problème complexe\n 3 : Mélange'];
	this.besoin_formulaire2_numerique = ['Coefficient de réduction(problèmes de type1)', 3, '1 : Décimal\n 2 : Non décimal\n 3 : Décimal ou non'];

}
/**
 * Trouver les coordonnées d'un point transformé d'un autre par une des transformations du plan
 * @Auteur Jean-Claude Lhote
 * 3G10-1
 */
function Transformations_du_plan_et_coordonnees() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Trouver les coordonnées de l'image d'un point par une transformation du plan";
	this.consigne = "";
	this.pas_de_version_LaTeX = true;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; // 1 calcul de l'hypoténuse 2 calcul d'un côté de l'angle droit 
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;
	this.liste_packages = 'tkz-euclide';
	this.nouvelle_version = function (numero_de_l_exercice) {
	this.type_exercice = 'MG32';
	this.MG32editable=false;
	this.taille_div_MG32 = [700, 700];
	this.MG32codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wAAAAAEAACAEwAAgBIAAIAaAACBDAAAAAAFHAAAAtIAAAEBAAAAAAAAAAEAAAB9#####wAAAAEACkNDYWxjQ29uc3QA#####wACcGkAFjMuMTQxNTkyNjUzNTg5NzkzMjM4NDb#####AAAAAQAKQ0NvbnN0YW50ZUAJIftURC0Y#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAADgABTwDAKAAAAAAAAAAAAAAAAAAABQABQHXYAAAAAABAdjhR64UeuP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AAAAAAEOAAFJAMAYAAAAAAAAAAAAAAAAAAAFAAFAOQAAAAAAAAAAAAL#####AAAAAQAJQ0Ryb2l0ZUFCAP####8AAAAAABAAAAEAAQAAAAEAAAAD#####wAAAAEAFkNEcm9pdGVQZXJwZW5kaWN1bGFpcmUA#####wAAAAAAEAAAAQABAAAAAQAAAAT#####AAAAAQAJQ0NlcmNsZU9BAP####8BAAAAAAEAAAABAAAAA#####8AAAABABBDSW50RHJvaXRlQ2VyY2xlAP####8AAAAFAAAABv####8AAAABABBDUG9pbnRMaWVCaXBvaW50AP####8BAAAAABAAAAEFAAEAAAAHAAAACQD#####AAAAAAEOAAFKAMAoAAAAAAAAwBAAAAAAAAAFAAIAAAAH#####wAAAAIAB0NSZXBlcmUA#####wDm5uYAAQAAAAEAAAADAAAACQEBAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAE#8AAAAAAAAAAAAAE#8AAAAAAAAP####8AAAABAApDVW5pdGV4UmVwAP####8ABHVuaXQAAAAK#####wAAAAEAC0NIb21vdGhldGllAP####8AAAAB#####wAAAAEACkNPcGVyYXRpb24DAAAAAT#wAAAAAAAA#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAv#####AAAAAQALQ1BvaW50SW1hZ2UA#####wEAAAAAEAACVyIBAQAAAAADAAAADP####8AAAABAAlDTG9uZ3VldXIA#####wAAAAEAAAAN#####wAAAAEAB0NDYWxjdWwA#####wAHbmJncmFkeAACMjAAAAABQDQAAAAAAAAAAAARAP####8AB25iZ3JhZHkAAjIwAAAAAUA0AAAAAAAA#####wAAAAEAFENJbXBsZW1lbnRhdGlvblByb3RvAP####8AFEdyYWR1YXRpb25BeGVzUmVwZXJlAAAAGwAAAAgAAAADAAAACgAAAA8AAAAQ#####wAAAAEAE0NBYnNjaXNzZU9yaWdpbmVSZXAAAAAAEQAFYWJzb3IAAAAK#####wAAAAEAE0NPcmRvbm5lZU9yaWdpbmVSZXAAAAAAEQAFb3Jkb3IAAAAKAAAACwAAAAARAAZ1bml0ZXgAAAAK#####wAAAAEACkNVbml0ZXlSZXAAAAAAEQAGdW5pdGV5AAAACv####8AAAABABBDUG9pbnREYW5zUmVwZXJlAAAAABEAAAAAABAAAAEFAAAAAAoAAAAOAAAAEgAAAA4AAAATAAAAFgAAAAARAAAAAAAQAAABBQAAAAAKAAAADQAAAAAOAAAAEgAAAA4AAAAUAAAADgAAABMAAAAWAAAAABEAAAAAABAAAAEFAAAAAAoAAAAOAAAAEgAAAA0AAAAADgAAABMAAAAOAAAAFQAAAAwAAAAAEQAAABYAAAAOAAAADwAAAA8AAAAAEQAAAAAAEAAAAQUAAAAAFwAAABkAAAAMAAAAABEAAAAWAAAADgAAABAAAAAPAAAAABEAAAAAABAAAAEFAAAAABgAAAAb#####wAAAAEACENTZWdtZW50AAAAABEBAAAAABAAAAEAAQAAABcAAAAaAAAAFwAAAAARAQAAAAAQAAABAAEAAAAYAAAAHAAAAAQAAAAAEQEAAAAACwABVwDAFAAAAAAAAMA0AAAAAAAABQABP9xWeJq83w4AAAAd#####wAAAAIACENNZXN1cmVYAAAAABEABnhDb29yZAAAAAoAAAAfAAAAEQAAAAARAAVhYnN3MQAGeENvb3JkAAAADgAAACD#####AAAAAgASQ0xpZXVPYmpldFBhclB0TGllAQAAABEAZmZmAAAAHwAAAA4AAAAPAAAAHwAAAAIAAAAfAAAAHwAAABEAAAAAEQAFYWJzdzIADTIqYWJzb3ItYWJzdzEAAAANAQAAAA0CAAAAAUAAAAAAAAAAAAAADgAAABIAAAAOAAAAIQAAABYAAAAAEQEAAAAAEAAAAQUAAAAACgAAAA4AAAAjAAAADgAAABMAAAAZAQAAABEAZmZmAAAAJAAAAA4AAAAPAAAAHwAAAAUAAAAfAAAAIAAAACEAAAAjAAAAJAAAAAQAAAAAEQEAAAAACwABUgBAIAAAAAAAAMAgAAAAAAAABQABP9EbToG06B8AAAAe#####wAAAAIACENNZXN1cmVZAAAAABEABnlDb29yZAAAAAoAAAAmAAAAEQAAAAARAAVvcmRyMQAGeUNvb3JkAAAADgAAACcAAAAZAQAAABEAZmZmAAAAJgAAAA4AAAAQAAAAJgAAAAIAAAAmAAAAJgAAABEAAAAAEQAFb3JkcjIADTIqb3Jkb3Itb3JkcjEAAAANAQAAAA0CAAAAAUAAAAAAAAAAAAAADgAAABMAAAAOAAAAKAAAABYAAAAAEQEAAAAAEAAAAQUAAAAACgAAAA4AAAASAAAADgAAACoAAAAZAQAAABEAZmZmAAAAKwAAAA4AAAAQAAAAJgAAAAUAAAAmAAAAJwAAACgAAAAqAAAAK#####8AAAACAAxDQ29tbWVudGFpcmUAAAAAEQFmZmYAAAAAAAAAAABAGAAAAAAAAAAAAB8LAAH###8AAAABAAAAAAAAAAEAAAAAAAAAAAALI1ZhbChhYnN3MSkAAAAZAQAAABEAZmZmAAAALQAAAA4AAAAPAAAAHwAAAAQAAAAfAAAAIAAAACEAAAAtAAAAGwAAAAARAWZmZgAAAAAAAAAAAEAYAAAAAAAAAAAAJAsAAf###wAAAAEAAAAAAAAAAQAAAAAAAAAAAAsjVmFsKGFic3cyKQAAABkBAAAAEQBmZmYAAAAvAAAADgAAAA8AAAAfAAAABgAAAB8AAAAgAAAAIQAAACMAAAAkAAAALwAAABsAAAAAEQFmZmYAwCAAAAAAAAA#8AAAAAAAAAAAACYLAAH###8AAAACAAAAAQAAAAEAAAAAAAAAAAALI1ZhbChvcmRyMSkAAAAZAQAAABEAZmZmAAAAMQAAAA4AAAAQAAAAJgAAAAQAAAAmAAAAJwAAACgAAAAxAAAAGwAAAAARAWZmZgDAHAAAAAAAAAAAAAAAAAAAAAAAKwsAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIyKQAAABkBAAAAEQBmZmYAAAAzAAAADgAAABAAAAAmAAAABgAAACYAAAAnAAAAKAAAACoAAAArAAAAMwAAABEA#####wABeAABMwAAAAFACAAAAAAAAAAAABEA#####wABeQABMgAAAAFAAAAAAAAAAAAAABYA#####wAAAAAAEAABQQAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAADgAAADUAAAAOAAAANgAAABEA#####wACeDEAAi0z#####wAAAAEADENNb2luc1VuYWlyZQAAAAFACAAAAAAAAAAAABEA#####wACeTEAATIAAAABQAAAAAAAAAAAAAARAP####8AAngyAAEyAAAAAUAAAAAAAAAAAAAAEQD#####AAJ5MgABMQAAAAE#8AAAAAAAAAAAABYA#####wEAAAAAEAACTyIAwDEAAAAAAADAQQAAAAAAAAYAAAAACgAAAA4AAAA6AAAADgAAADv#####AAAAAQAJQ0Ryb2l0ZU9tAP####8BAAAAABAAAAEAAQAAAAoAAAA8AAAAAT#wAAAAAAAAAAAABAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAUAIKPXCj1wmAAAAPQAAABEA#####wAEYmlzMQABMQAAAAE#8AAAAAAAAAAAAAwA#####wAAADwAAAAOAAAAPwAAAA8A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAD4AAABAAAAABQD#####AAAAAAEQAAJkMQEAAT#szMzMzMzNAAAAPAAAAEEAAAADAP####8BAAAAARAAAAEAAQAAADwBP#AAAAAAAAAAAAAEAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABQFkAAAAAAAAAAABDAAAAEQD#####AAN4eCcAATEAAAABP#AAAAAAAAAAAAAMAP####8AAAA8AAAADgAAAEUAAAAPAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABEAAAARgAAAAUA#####wAAAAABEAABZADAEvfO2RaIAD#wAAAAAAAAAAE#7ChslIjsKgAAADwAAABHAAAAAwD#####AQAAAAEQAAABAAEAAAA8AD#wAAAAAAAAAAAABAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAcBYv######+AAAASQAAABEA#####wADeXknAAExAAAAAT#wAAAAAAAAAAAADAD#####AAAAPAAAAA4AAABLAAAADwD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAAAASgAAAEwAAAAFAP####8AAAAAARAAAmQnAQABP+zMzMzMzM0AAAA8AAAATQAAAB0A#####wEAAAAAEAAAAQABAAAACgAAADwAAAAcAAAAAT#wAAAAAAAAAAAABAD#####AQAAAAAQAAAAAAAAAAAAAABACAAAAAAAAAUAAUARrhR64UeuAAAATwAAABEA#####wAEYmlzMgABMQAAAAE#8AAAAAAAAAAAAAwA#####wAAADwAAAAOAAAAUQAAAA8A#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAFAAAABSAAAABQD#####AAAAAAEQAAJkMgEAAT#szMzMzMzNAAAAPAAAAFMAAAARAP####8ACUFmZmljaGVPJwABMQAAAAE#8AAAAAAAAAAAAAwA#####wAAAAEAAAABP#AAAAAAAAAAAAAPAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAA8AAAAVgAAAAwA#####wAAAAEAAAANAwAAAAE#8AAAAAAAAAAAAA4AAABVAAAADwD#####AAAAAAAOAAJPJwAAAAAAAAAAAEAIAAAAAAAACQAAAAA8AAAAWP####8AAAABAAhDVmVjdGV1cgD#####Af8AAAAQAAABAAIAAAABAAAAVwAAAAARAP####8ACkFmZmljaGVPTycAATEAAAABP#AAAAAAAAD#####AAAAAQARQ1BvaW50UGFyTXVsdFZlY3QA#####wEAAAAADgACTzMAQDkAAAAAAABACAAAAAAAAAMAAAAAAQAAAFoAAAANAwAAAAE#8AAAAAAAAAAAAA4AAABbAAAAHgD#####AP8AAAAQAAABAAIAAAABAAAAXAAAAAAfAP####8B#wAAABAAAAEFAAAAAAEAAABdAAAAAT#gAAAAAAAAAAAABgD#####Af8AAAAQAAABAAIAAABeAAAAXf####8AAAACAAlDQ2VyY2xlT1IA#####wH#AAAAAgAAAF4AAAABP8mZmZmZmZoAAAAACAD#####AAAAXwAAAGAAAAAJAP####8B#wAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAYQAAAAkA#####wH#AAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAABh#####wAAAAIABkNMYXRleAD#####AP8AAADAMgAAAAAAAMAxAAAAAAAAAAAAYxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABNcb3ZlcnJpZ2h0YXJyb3cge3Z9#####wAAAAEAEUNQb2ludFBhckFic2Npc3NlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAABAAAAAwAAAAFAJAAAAAAAAAAAAAcA#####wEAAAAAAQAAAAEAAABlAAAACAD#####AAAAVAAAAGYAAAAJAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAZwAAAAkA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAIAAABnAAAACAD#####AAAATgAAAGYAAAAJAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAagAAAAkA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAABqAAAACAD#####AAAAQgAAAGYAAAAJAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAbQAAAAkA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAABtAAAACAD#####AAAASAAAAGYAAAAJAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAcAAAAAkA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAFAAEAAABwAAAAGwD#####AAAAAAEAAAByEAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAyhkKQAAABsA#####wAAAAAAQAAAAAAAAADAGAAAAAAAAAAAAGwQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAEKGQnKQAAABsA#####wAAAAABAAAAbxAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAgoZCNMKDEpKQAAABsA#####wAAAAAAwDUAAAAAAABAFAAAAAAAAAAAAGkQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAIKGQjTCgyKSkAAAARAP####8AAnhCAAExAAAAAT#wAAAAAAAAAAAAEQD#####AAJ5QgABMQAAAAE#8AAAAAAAAAAAABEA#####wACeEMAATEAAAABP#AAAAAAAAAAAAARAP####8AAnlDAAExAAAAAT#wAAAAAAAAAAAAFgD#####AAAAAAAQAAFCAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAOAAAAdwAAAA4AAAB4AAAAFgD#####AAAAAAAQAAFDAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAOAAAAeQAAAA4AAAB6AAAADv##########"
	this.MG32codeBase64corr = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wAAAADEAACIuAAAgIkAAICKAAB9FwAAgCoAAH0TAAB9EgAAgCcAAIAoAAB9FAAAgK4AAIB8AACAhAAAgAsAAIAlAACAIAAAgA0AAIAOAACBWQAAgAwAAIDxAACBJwAAgHkAAIB7AACAegAAgCQAAIFxAACAbQAAgGoAAIC7AACAvAAAfR0AAH0eAACAgAAAgYMAAIAPAACAEwAAgBIAAIAXAACAFgAAgF4AAIBfAACAZQAAfRAAAIDrAACAEAAAgEgAAIAUAAB9KAAAgBoAAIAdAACA6QAAgVAAAIFRAACBDAAAgQ0AAIFSAACBUwAAgB4AAIAcAACAGwAAgBkAAIBgAACBIAAAgN4AAIDfAACBCgAAgOAAAIFDAACASQAAgEoAAIEXAACBGAAAgDMAAIB2AACA7AAAgO0AAIDYAACA2QAAgNoAAIDbAACAcgAAgXkAAIFiAACBZAAAgE0AAIAfAACAIgAAgCMAAIAhAACAxwAAgT0AAIELAACBBAAAgC0AAIFMAACAMAAAgSoAAIErAACALgAAgDEAAIDyAACBaQAAgWcAAIGlAACBdQAAgC8AAIA1AACAWQAAgFwAAH0KAAB9CwAAgUkAAIFLAAB9DgAAfQ8AAH0RAAB9FQAAfSQAAIBuAACAawAAgLAAAIFXAACAsQAAgVYAAICyAACBVAAAgLcAAIC4AACAswAAgPcAAIC0AACAtQAAgQYAAIEfAACBAgAAgY4AAIGPAACBAwAAgOMAAID2AACBBwAAgQkAAIEpAACBKAAAgOgAAIBvAACAcAAAgHQAAIBQAACA3QAAfRkAAH0YAACBbAAAgHEAAIFtAACBbgAAgXIAAIGGAAB9IwAAgQgAAIDkAACA5wAAgOUAAIDuAAB9KwAAfS0AAH0qAAB9LAAAgW8AAIFwAACBeAAAgXcAAH0mAACA8AAAfSUAAIEiAAB9KQAAfScAAIGjAACBpAAAfR8AAH0gAAB9IQAAfSIAAIBiAACAYwAAgGcAAIBoAACAaQAAgMkAAIBLAACArwAAgSwAAIDhAACA4gAAAAAFHAAAAtIAAAEBAAAAAQAAAAYAEHN5bcOpdHJpZSBheGlhbGUADFBvaW50CmRyb2l0ZQAAAAIAAAAGAAAAABr#####AAAAAQARQ0VsZW1lbnRHZW5lcmlxdWUAAAAAAAH#####AAAAAAAAAAAACf##########AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMv####8AAAABAApDQ29uc3RhbnRlQAAAAAAAAAAAAAABAP####8AAnkyAAExAAAAAj#wAAAAAAAAAAAAAQD#####AARiaXMxAAExAAAAAj#wAAAAAAAAAAAAAQD#####AAJ0MQABMQAAAAI#8AAAAAAAAAAAAAEA#####wADeFAxAAExAAAAAj#wAAAAAAAAAAAAAQD#####AAN5UDEAAi0x#####wAAAAEADENNb2luc1VuYWlyZQAAAAI#8AAAAAAAAP####8AAAABAA9DU3ltZXRyaWVBeGlhbGUA#####wAAAAH#####AAAAAQALQ1BvaW50SW1hZ2UB#####wAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAAAAAAI#####wAAAAEAB0NNaWxpZXUA#####wEAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAAAAAAJ#####wAAAAEACENTZWdtZW50Af####8AAAD#ABAAAAEAAQAAAAAAAAAKAAAABwH#####AAAA#wAQAAABAAEAAAAKAAAACf####8AAAACAAlDQ2VyY2xlT1IA#####wEAAP8AAQAAAAoAAAACP8mZmZmZmZoA#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAsAAAAN#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAHAAIAAAAOAAAABwD#####AQAAAAAQAAABAAEAAAAKAAAAD#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8AAAAAAA0AAAEBAQAAAAoAAAAQ#####wAAAAEACUNDZXJjbGVPQQD#####AAAAAAEBAAAACgAAAA8AAAAJAP####8AAAARAAAAEgAAAAoA#####wAAAP8AEgAAAQcAAgAAABP#####AAAAAQAMQ1RyYW5zbGF0aW9uAP####8AAAAKAAAADwAAAAUA#####wAAAP8AEgAAAQcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAf####8AAAD#AAEAAAAFAAAACgAAAA8AAAAWAAAAFAAAAAr#####AAAAAQAOQ01hcnF1ZVNlZ21lbnQB#####wD#AAAAAQAAAAALAAAADwH#####AP8AAAABAAAAAAwAAAABAAABoP####8AAAABAApDQ2FsY0NvbnN0AP####8AAnBpABYzLjE0MTU5MjY1MzU4OTc5MzIzODQ2AAAAAkAJIftURC0Y#####wAAAAEACkNQb2ludEJhc2UA#####wAAAAAADgABTwDAKAAAAAAAAAAAAAAAAAAABQABQHXYAAAAAABAdjhR64UeuP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAASAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AAAAAAEOAAFJAMAYAAAAAAAAAAAAAAAAAAAFAAFAOQAAAAAAAAAAAAL#####AAAAAQAJQ0Ryb2l0ZUFCAP####8AAAAAABAAAAEAAQAAAAEAAAADAAAACwD#####AAAAAAASAAABAAEAAAABAAAABAAAAAwA#####wEAAAAAAQAAAAEAAAADAAAACQD#####AAAABQAAAAYAAAAKAP####8BAAAAABIAAAEFAAEAAAAHAAAACgD#####AAAAAAEOAAFKAMAoAAAAAAAAwBAAAAAAAAAFAAIAAAAH#####wAAAAIAB0NSZXBlcmUA#####wDm5uYAAQAAAAEAAAADAAAACQEBAAAAAAIAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAI#8AAAAAAAAAAAAAI#8AAAAAAAAP####8AAAABAApDVW5pdGV4UmVwAP####8ABHVuaXQAAAAK#####wAAAAEAC0NIb21vdGhldGllAP####8AAAAB#####wAAAAEACkNPcGVyYXRpb24DAAAAAj#wAAAAAAAA#####wAAAAEAD0NSZXN1bHRhdFZhbGV1cgAAAAsAAAAFAP####8BAAAAABAAAlciAQEAAAAAAwAAAAz#####AAAAAQAJQ0xvbmd1ZXVyAP####8AAAABAAAADQAAAAEA#####wAHbmJncmFkeAACMjAAAAACQDQAAAAAAAAAAAABAP####8AB25iZ3JhZHkAAjIwAAAAAkA0AAAAAAAA#####wAAAAEAFENJbXBsZW1lbnRhdGlvblByb3RvAP####8AFEdyYWR1YXRpb25BeGVzUmVwZXJlAAAAGwAAAAgAAAADAAAACgAAAA8AAAAQ#####wAAAAEAE0NBYnNjaXNzZU9yaWdpbmVSZXAAAAAAEQAFYWJzb3IAAAAK#####wAAAAEAE0NPcmRvbm5lZU9yaWdpbmVSZXAAAAAAEQAFb3Jkb3IAAAAKAAAAFgAAAAARAAZ1bml0ZXgAAAAK#####wAAAAEACkNVbml0ZXlSZXAAAAAAEQAGdW5pdGV5AAAACv####8AAAABABBDUG9pbnREYW5zUmVwZXJlAAAAABEAAAAAABIAAAEFAAAAAAoAAAAZAAAAEgAAABkAAAATAAAAHwAAAAARAAAAAAASAAABBQAAAAAKAAAAGAAAAAAZAAAAEgAAABkAAAAUAAAAGQAAABMAAAAfAAAAABEAAAAAABIAAAEFAAAAAAoAAAAZAAAAEgAAABgAAAAAGQAAABMAAAAZAAAAFQAAABcAAAAAEQAAABYAAAAZAAAADwAAAAUAAAAAEQAAAAAAEgAAAQUAAAAAFwAAABkAAAAXAAAAABEAAAAWAAAAGQAAABAAAAAFAAAAABEAAAAAABIAAAEFAAAAABgAAAAbAAAABwAAAAARAQAAAAAQAAABAAEAAAAXAAAAGgAAAAcAAAAAEQEAAAAAEAAAAQABAAAAGAAAABwAAAATAAAAABEBAAAAAAsAAVcAwBQAAAAAAADANAAAAAAAAAUAAT#cVniavN8OAAAAHf####8AAAACAAhDTWVzdXJlWAAAAAARAAZ4Q29vcmQAAAAKAAAAHwAAAAEAAAAAEQAFYWJzdzEABnhDb29yZAAAABkAAAAg#####wAAAAIAEkNMaWV1T2JqZXRQYXJQdExpZQEAAAARAGZmZgAAAB8AAAAZAAAADwAAAB8AAAACAAAAHwAAAB8AAAABAAAAABEABWFic3cyAA0yKmFic29yLWFic3cxAAAAGAEAAAAYAgAAAAJAAAAAAAAAAAAAABkAAAASAAAAGQAAACEAAAAfAAAAABEBAAAAABIAAAEFAAAAAAoAAAAZAAAAIwAAABkAAAATAAAAIQEAAAARAGZmZgAAACQAAAAZAAAADwAAAB8AAAAFAAAAHwAAACAAAAAhAAAAIwAAACQAAAATAAAAABEBAAAAAAsAAVIAQCAAAAAAAADAIAAAAAAAAAUAAT#RG06BtOgfAAAAHv####8AAAACAAhDTWVzdXJlWQAAAAARAAZ5Q29vcmQAAAAKAAAAJgAAAAEAAAAAEQAFb3JkcjEABnlDb29yZAAAABkAAAAnAAAAIQEAAAARAGZmZgAAACYAAAAZAAAAEAAAACYAAAACAAAAJgAAACYAAAABAAAAABEABW9yZHIyAA0yKm9yZG9yLW9yZHIxAAAAGAEAAAAYAgAAAAJAAAAAAAAAAAAAABkAAAATAAAAGQAAACgAAAAfAAAAABEBAAAAABIAAAEFAAAAAAoAAAAZAAAAEgAAABkAAAAqAAAAIQEAAAARAGZmZgAAACsAAAAZAAAAEAAAACYAAAAFAAAAJgAAACcAAAAoAAAAKgAAACv#####AAAAAgAMQ0NvbW1lbnRhaXJlAAAAABEBZmZmAAAAAAAAAAAAQBgAAAAAAAAAAAAfCwAB####AAAAAQAAAAAAAAACAAAAAAAAAAAACyNWYWwoYWJzdzEpAAAAIQEAAAARAGZmZgAAAC0AAAAZAAAADwAAAB8AAAAEAAAAHwAAACAAAAAhAAAALQAAACMAAAAAEQFmZmYAAAAAAAAAAABAGAAAAAAAAAAAACQLAAH###8AAAABAAAAAAAAAAIAAAAAAAAAAAALI1ZhbChhYnN3MikAAAAhAQAAABEAZmZmAAAALwAAABkAAAAPAAAAHwAAAAYAAAAfAAAAIAAAACEAAAAjAAAAJAAAAC8AAAAjAAAAABEBZmZmAMAgAAAAAAAAP#AAAAAAAAAAAAAmCwAB####AAAAAgAAAAEAAAACAAAAAAAAAAAACyNWYWwob3JkcjEpAAAAIQEAAAARAGZmZgAAADEAAAAZAAAAEAAAACYAAAAEAAAAJgAAACcAAAAoAAAAMQAAACMAAAAAEQFmZmYAwBwAAAAAAAAAAAAAAAAAAAAAACsLAAH###8AAAACAAAAAQAAAAIAAAAAAAAAAAALI1ZhbChvcmRyMikAAAAhAQAAABEAZmZmAAAAMwAAABkAAAAQAAAAJgAAAAYAAAAmAAAAJwAAACgAAAAqAAAAKwAAADMAAAABAP####8AAXgAATMAAAACQAgAAAAAAAAAAAABAP####8AAXkAATIAAAACQAAAAAAAAAAAAAAfAP####8AAAAAABAAAUEAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAAA1AAAAGQAAADYAAAABAP####8AAngxAAItMwAAAAMAAAACQAgAAAAAAAAAAAABAP####8AAnkxAAEyAAAAAkAAAAAAAAAAAAAAAQD#####AAJ4MgABMgAAAAJAAAAAAAAAAAAAAAEA#####wACeTIAATEAAAACP#AAAAAAAAAAAAAfAP####8BAAAAABAAAk8iAMAxAAAAAAAAwEEAAAAAAAAGAAAAAAoAAAAZAAAAOgAAABkAAAA7#####wAAAAEACUNEcm9pdGVPbQD#####AQAAAAASAAABAAEAAAAKAAAAPAAAAAI#8AAAAAAAAAAAABMA#####wEAAAAAEgAAAAAAAAAAAAAAQAgAAAAAAAAFAAFACCj1wo9cJgAAAD0AAAABAP####8ABGJpczEAATEAAAACP#AAAAAAAAAAAAAXAP####8AAAA8AAAAGQAAAD8AAAAFAP####8BAAAAABIAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAA+AAAAQAAAABQA#####wAAAAABEAACZDEBAAI#7MzMzMzMzQAAADwAAABBAAAAEgD#####AQAAAAESAAABAAEAAAA8AT#wAAAAAAAAAAAAEwD#####AQAAAAASAAAAAAAAAAAAAABACAAAAAAAAAUAAUBZAAAAAAAAAAAAQwAAAAEA#####wADeHgnAAExAAAAAj#wAAAAAAAAAAAAFwD#####AAAAPAAAABkAAABFAAAABQD#####AQAAAAASAAAAAAAAAAAAAABACAAAAAAAAAUAAAAARAAAAEYAAAAUAP####8AAAAAARAAAWQAwBL3ztkWiAA#8AAAAAAAAAADP+wobJSI7CoAAAA8AAAARwAAABIA#####wEAAAABEgAAAQABAAAAPAA#8AAAAAAAAAAAABMA#####wEAAAAAEgAAAAAAAAAAAAAAQAgAAAAAAAAFAAHAWL#######gAAAEkAAAABAP####8AA3l5JwABMQAAAAI#8AAAAAAAAAAAABcA#####wAAADwAAAAZAAAASwAAAAUA#####wEAAAAAEgAAAAAAAAAAAAAAQAgAAAAAAAAFAAAAAEoAAABMAAAAFAD#####AAAAAAEQAAJkJwEAAz#szMzMzMzNAAAAPAAAAE0AAAAkAP####8BAAAAABIAAAEAAQAAAAoAAAA8AAAAAwAAAAI#8AAAAAAAAAAAABMA#####wEAAAAAEgAAAAAAAAAAAAAAQAgAAAAAAAAFAAFAEa4UeuFHrgAAAE8AAAABAP####8ABGJpczIAATEAAAACP#AAAAAAAAAAAAAXAP####8AAAA8AAAAGQAAAFEAAAAFAP####8BAAAAABIAAAAAAAAAAAAAAEAIAAAAAAAABQAAAABQAAAAUgAAABQA#####wAAAAABEAACZDIBAAI#7MzMzMzMzQAAADwAAABTAAAAAQD#####AAlBZmZpY2hlTycAATEAAAACP#AAAAAAAAAAAAAXAP####8AAAABAAAAAj#wAAAAAAAAAAAABQD#####AQAAAAASAAAAAAAAAAAAAABACAAAAAAAAAUAAAAAPAAAAFYAAAAXAP####8AAAABAAAAGAMAAAACP#AAAAAAAAAAAAAZAAAAVQAAAAUA#####wAAAAAADgACTycAAAAAAAAAAABACAAAAAAAAAkAAAAAPAAAAFj#####AAAAAQAIQ1ZlY3RldXIA#####wH#AAAAEAAAAQACAAAAAQAAAFcAAAAAAQD#####AApBZmZpY2hlT08nAAExAAAAAj#wAAAAAAAA#####wAAAAEAEUNQb2ludFBhck11bHRWZWN0AP####8BAAAAAA4AAk8zAEA5AAAAAAAAQAgAAAAAAAADAAAAAAEAAABaAAAAGAMAAAACP#AAAAAAAAAAAAAZAAAAWwAAACUA#####wD#AAAAEAAAAQACAAAAAQAAAFwAAAAAJgD#####Af8AAAASAAABBQAAAAABAAAAXQAAAAI#4AAAAAAAAAAAAAsA#####wH#AAAAEgAAAQACAAAAXgAAAF0AAAAIAP####8B#wAAAAIAAABeAAAAAj#JmZmZmZmaAAAAAAkA#####wAAAF8AAABgAAAACgD#####Af8AAAASAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAGEAAAAKAP####8B#wAAABIAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAYf####8AAAACAAZDTGF0ZXgA#####wD#AAAAwDIAAAAAAADAMQAAAAAAAAAAAGMQAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAATXG92ZXJyaWdodGFycm93IHt2ff####8AAAABABFDUG9pbnRQYXJBYnNjaXNzZQD#####AQAAAAASAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAAQAAAAMAAAACQCoAAAAAAAAAAAAMAP####8BAAAAAAEAAAABAAAAZQAAAAkA#####wAAAFQAAABmAAAACgD#####AQAAAAASAAAAAAAAAAAAAABACAAAAAAAAAUAAQAAAGcAAAAKAP####8BAAAAABIAAAAAAAAAAAAAAEAIAAAAAAAABQACAAAAZwAAAAkA#####wAAAE4AAABmAAAACgD#####AQAAAAASAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAGoAAAAKAP####8BAAAAABIAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAagAAAAkA#####wAAAEIAAABmAAAACgD#####AQAAAAASAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAG0AAAAKAP####8BAAAAABIAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAbQAAAAkA#####wAAAEgAAABmAAAACgD#####AQAAAAASAAAAAAAAAAAAAABACAAAAAAAAAUAAgAAAHAAAAAKAP####8BAAAAABIAAAAAAAAAAAAAAEAIAAAAAAAABQABAAAAcAAAACMA#####wAAAAAAwCIAAAAAAADAPQAAAAAAAAAAAHIQAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAIKGQjTCgzKSkAAAAjAP####8AAAAAAEAQAAAAAAAAwC########wAAABsEAAAAAAAAAAAAAAAAAACAAAAAAAAAAAABChkJykAAAAjAP####8AAAAAAEBHgAAAAAAAwEqAAAAAAAAAAABvEAAAAAAAAAAAAAAAAAACAAAAAAAAAAAACChkI0woMSkpAAAAIwD#####AAAAAADATgAAAAAAAMBDf#######AAAAaRAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAgoZCNMKDIpKQAAAAEA#####wACeEIAATEAAAACP#AAAAAAAAAAAAABAP####8AAnlCAAExAAAAAj#wAAAAAAAAAAAAAQD#####AAJ4QwABMQAAAAI#8AAAAAAAAAAAAAEA#####wACeUMAATEAAAACP#AAAAAAAAAAAAAfAP####8AAAAAABAAAUIAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAAB3AAAAGQAAAHgAAAAfAP####8AAAAAABAAAUMAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAAB5AAAAGQAAAHoAAAABAP####8AA3hBJwABNQAAAAJAFAAAAAAAAAAAAAEA#####wADeUEnAAEyAAAAAkAAAAAAAAAAAAAAAQD#####AAN4QicAATUAAAACQBQAAAAAAAAAAAABAP####8AA3lCJwABMwAAAAJACAAAAAAAAAAAAAEA#####wADeEMnAAE1AAAAAkAUAAAAAAAAAAAAAQD#####AAN5QycAATQAAAACQBAAAAAAAAAAAAABAP####8AAnQxAAExAAAAAj#wAAAAAAAAAAAAAQD#####AAJ0MgABMQAAAAI#8AAAAAAAAAAAAAEA#####wACdDMAATEAAAACP#AAAAAAAAAAAAABAP####8AAnQ0AAExAAAAAj#wAAAAAAAAAAAAAQD#####AAJ0NQABMQAAAAI#8AAAAAAAAAAAAAEA#####wACdDYAATEAAAACP#AAAAAAAAAAAAABAP####8AAnQ3AAExAAAAAj#wAAAAAAAAAAAAAQD#####AAJ0OAABMQAAAAI#8AAAAAAAAAAAAAEA#####wACdDkAATEAAAACP#AAAAAAAAAAAAABAP####8AA3QxMAABMQAAAAI#8AAAAAAAAAAAAAEA#####wADdDExAAExAAAAAj#wAAAAAAAAAAAAAQD#####AAN0MTIAATEAAAACP#AAAAAAAAAAAAABAP####8AA3QxMwABMQAAAAI#8AAAAAAAAAAAAAEA#####wADdDE0AAExAAAAAj#wAAAAAAAAAAAAAQD#####AAN4UDEAATEAAAACP#AAAAAAAAAAAAABAP####8AA3hQMgABMgAAAAJAAAAAAAAAAAAAAAEA#####wADeFAzAAEzAAAAAkAIAAAAAAAAAAAAAQD#####AAN4UDQAATQAAAACQBAAAAAAAAAAAAABAP####8AA3hQNQABNQAAAAJAFAAAAAAAAAAAAAEA#####wADeFA2AAE2AAAAAkAYAAAAAAAAAAAAAQD#####AAN4UDcAATcAAAACQBwAAAAAAAAAAAABAP####8AA3hQOAABOAAAAAJAIAAAAAAAAAAAAAEA#####wADeFA5AAE5AAAAAkAiAAAAAAAAAAAAAQD#####AAR4UDEwAAIxMAAAAAJAJAAAAAAAAAAAAAEA#####wAEeFAxMQACMTEAAAACQCYAAAAAAAAAAAABAP####8ABHhQMTIAAjEyAAAAAkAoAAAAAAAAAAAAAQD#####AAR4UDEzAAIxMwAAAAJAKgAAAAAAAAAAAAEA#####wAEeFAxNAACMTQAAAACQCwAAAAAAAAAAAABAP####8AA3lQMQACLTQAAAADAAAAAkAQAAAAAAAAAAAAAQD#####AAN5UDIAAi0xAAAAAwAAAAI#8AAAAAAAAAAAAAEA#####wADeVAzAAItNQAAAAMAAAACQBQAAAAAAAAAAAABAP####8AA3lQNAACLTEAAAADAAAAAj#wAAAAAAAAAAAAAQD#####AAN5UDUAAi0xAAAAAwAAAAI#8AAAAAAAAAAAAAEA#####wADeVA2AAItMQAAAAMAAAACP#AAAAAAAAAAAAABAP####8AA3lQOAACLTEAAAADAAAAAj#wAAAAAAAAAAAAAQD#####AAN5UDkAAi0xAAAAAwAAAAI#8AAAAAAAAAAAAAEA#####wAEeVAxMAACLTEAAAADAAAAAj#wAAAAAAAAAAAAAQD#####AAR5UDExAAItMQAAAAMAAAACP#AAAAAAAAAAAAABAP####8ABHlQMTIAAi0xAAAAAwAAAAI#8AAAAAAAAAAAAAEA#####wAEeVAxMwACLTEAAAADAAAAAj#wAAAAAAAAAAAAAQD#####AAR5UDE0AAItMQAAAAMAAAACP#AAAAAAAAAAAAAfAP####8B#wAAABIAAlAxAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAZAAAAkQAAABkAAACfAAAAHwD#####Af8AAAASAAJQMgAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAAJIAAAAZAAAAoAAAAB8A#####wH#AAAAEgACUDMAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAACTAAAAGQAAAKEAAAAfAP####8B#wAAABIAAlA0AAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAZAAAAlAAAABkAAACiAAAAHwD#####Af8AAAASAAJQNQAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAAJUAAAAZAAAAowAAAB8A#####wH#AAAAEgACUDYAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAACWAAAAGQAAAKQAAAABAP####8AA3lQNwACLTEAAAADAAAAAj#wAAAAAAAAAAAAHwD#####Af8AAAASAAJQNwAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAAJcAAAAZAAAAsgAAAB8A#####wH#AAAAEgACUDgAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAACYAAAAGQAAAKUAAAAfAP####8B#wAAABIAAlA5AAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAZAAAAmQAAABkAAACmAAAAHwD#####Af8AAAASAANQMTAAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAACaAAAAGQAAAKcAAAAfAP####8B#wAAABIAA1AxMQAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAAJsAAAAZAAAAqAAAAB8A#####wH#AAAAEgADUDEyAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAZAAAAnAAAABkAAACpAAAAHwD#####Af8AAAASAANQMTMAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAACdAAAAGQAAAKoAAAAfAP####8B#wAAABIAA1AxNAAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAAJ4AAAAZAAAAqwAAABcA#####wAAAAEAAAAYAwAAAAI#8AAAAAAAAAAAABkAAACDAAAABQD#####AAAA#wESAANQJzEAAAAAAAAAAABACAAAAAAAAAkAAAAArAAAALsAAAAXAP####8AAAABAAAAGAMAAAACP#AAAAAAAAAAAAAZAAAAhAAAAAUA#####wAAAP8BEgADUCcyAAAAAAAAAAAAQAgAAAAAAAAJAAAAAK0AAAC9AAAAFwD#####AAAAAQAAABgDAAAAAj#wAAAAAAAAAAAAGQAAAIUAAAAFAP####8AAAD#ARIAA1AnMwAAAAAAAAAAAEAIAAAAAAAACQAAAACuAAAAvwAAABcA#####wAAAAEAAAAYAwAAAAI#8AAAAAAAAAAAABkAAACGAAAABQD#####AAAA#wESAANQJzQAAAAAAAAAAABACAAAAAAAAAkAAAAArwAAAMEAAAAXAP####8AAAABAAAAGAMAAAACP#AAAAAAAAAAAAAZAAAAhwAAAAUA#####wAAAP8BEgADUCc1AAAAAAAAAAAAQAgAAAAAAAAJAAAAALAAAADDAAAAFwD#####AAAAAQAAABgDAAAAAj#wAAAAAAAAAAAAGQAAAIgAAAAFAP####8AAAD#ARIAA1AnNgAAAAAAAAAAAEAIAAAAAAAACQAAAACxAAAAxQAAABcA#####wAAAAEAAAAYAwAAAAI#8AAAAAAAAAAAABkAAACJAAAABQD#####AAAA#wESAANQJzcAAAAAAAAAAABACAAAAAAAAAkAAAAAswAAAMcAAAAXAP####8AAAABAAAAGAMAAAACP#AAAAAAAAAAAAAZAAAAigAAAAUA#####wAAAP8BEgADUCc4AAAAAAAAAAAAQAgAAAAAAAAJAAAAALQAAADJAAAAFwD#####AAAAAQAAABgDAAAAAj#wAAAAAAAAAAAAGQAAAIsAAAAFAP####8AAAD#ARIAA1AnOQAAAAAAAAAAAEAIAAAAAAAACQAAAAC1AAAAywAAABcA#####wAAAAEAAAAYAwAAAAI#8AAAAAAAAAAAABkAAACMAAAABQD#####AAAA#wESAARQJzEwAAAAAAAAAAAAQAgAAAAAAAAJAAAAALYAAADNAAAAFwD#####AAAAAQAAABgDAAAAAj#wAAAAAAAAAAAAGQAAAI0AAAAFAP####8AAAD#ARIABFAnMTEAAAAAAAAAAABACAAAAAAAAAkAAAAAtwAAAM8AAAAXAP####8AAAABAAAAGAMAAAACP#AAAAAAAAAAAAAZAAAAjgAAAAUA#####wAAAP8BEgAEUCcxMgAAAAAAAAAAAEAIAAAAAAAACQAAAAC4AAAA0QAAABcA#####wAAAAEAAAAYAwAAAAI#8AAAAAAAAAAAABkAAACPAAAABQD#####AAAA#wESAARQJzEzAAAAAAAAAAAAQAgAAAAAAAAJAAAAALkAAADTAAAAFwD#####AAAAAQAAABgDAAAAAj#wAAAAAAAAAAAAGQAAAJAAAAAFAP####8AAAD#ARIABFAnMTQAAAAAAAAAAABACAAAAAAAAAkAAAAAugAAANUAAAABAP####8AA3hPNQABNQAAAAJAFAAAAAAAAAAAAAEA#####wADeE82AAE1AAAAAkAUAAAAAAAAAAAAAQD#####AAN4TzcAATUAAAACQBQAAAAAAAAAAAABAP####8AA3hPOAABNQAAAAJAFAAAAAAAAAAAAAEA#####wADeE85AAE1AAAAAkAUAAAAAAAAAAAAAQD#####AAR4TzEwAAE1AAAAAkAUAAAAAAAAAAAAAQD#####AAR4TzExAAE1AAAAAkAUAAAAAAAAAAAAAQD#####AAR4TzEyAAE1AAAAAkAUAAAAAAAAAAAAAQD#####AAR4TzEzAAE1AAAAAkAUAAAAAAAAAAAAAQD#####AAR4TzE0AAE1AAAAAkAUAAAAAAAAAAAAAQD#####AAN5TzUAATUAAAACQBQAAAAAAAAAAAABAP####8AA3lPNgABNgAAAAJAGAAAAAAAAAAAAAEA#####wADeU83AAE3AAAAAkAcAAAAAAAAAAAAAQD#####AAN5TzgAATgAAAACQCAAAAAAAAAAAAABAP####8AA3lPOQABOQAAAAJAIgAAAAAAAAAAAAEA#####wAEeU8xMAACMTAAAAACQCQAAAAAAAAAAAABAP####8ABHlPMTEAAjExAAAAAkAmAAAAAAAAAAAAAQD#####AAR5TzEyAAIxMgAAAAJAKAAAAAAAAAAAAAEA#####wAEeU8xMwACMTMAAAACQCoAAAAAAAAAAAABAP####8ABHlPMTQAAjE0AAAAAkAsAAAAAAAAAAAAHwD#####Af8AAAASAAJPNQAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAANcAAAAZAAAA4QAAAB8A#####wH#AAAAEgACTzYAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAADYAAAAGQAAAOIAAAAfAP####8B#wAAABIAAk83AAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAZAAAA2QAAABkAAADjAAAAHwD#####Af8AAAASAAJPOAAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAANoAAAAZAAAA5AAAAB8A#####wEAAP8AEgACTzkAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAADbAAAAGQAAAOUAAAAfAP####8B#wAAABIAA08xMAAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAANwAAAAZAAAA5gAAAB8A#####wH#AAAAEgADTzExAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAZAAAA3QAAABkAAADnAAAAHwD#####Af8AAAASAANPMTIAAAAAAAAAAABACAAAAAAAAAkAAAAACgAAABkAAADeAAAAGQAAAOgAAAAfAP####8B#wAAABIAA08xMwAAAAAAAAAAAEAIAAAAAAAACQAAAAAKAAAAGQAAAN8AAAAZAAAA6QAAAB8A#####wH#AAAAEgADTzE0AAAAAAAAAAAAQAgAAAAAAAAJAAAAAAoAAAAZAAAA4AAAABkAAADqAAAABAD#####AAAAQgAAAAUA#####wAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAALwAAAD1AAAABgD#####AQAA#wASAAAAAAAAAAAAAABACAAAAAAAAAcAAAAAvAAAAPYAAAAHAP####8AAAD#ABAAAAEAAQAAALwAAAD3AAAABwD#####AAAA#wAQAAABAAEAAAD3AAAA9gAAAAgA#####wEAAP8AAQAAAPcAAAACP8mZmZmZmZoAAAAACQD#####AAAA+AAAAPoAAAAKAP####8AAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAABwABAAAA+wAAAAoA#####wAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAHAAIAAAD7AAAAGwD#####AA1DYXJyw6kgZGlyZWN0AAAABQAAAAIAAAACAAAA9wAAAP0AAAAHAAAAAP4BAAAAABAAAAEAAQAAAPcAAAD9AAAACwAAAAD+AAAAAAASAAABAQEAAAD3AAAA#wAAAAwAAAAA#gAAAAABAQAAAPcAAAD9AAAACQAAAAD+AAABAAAAAQEAAAAKAQAAAP4AAAD#ABIAAAEHAAIAAAECAAAADQAAAAD+AAAA9wAAAP0AAAAFAQAAAP4AAAD#ABIAAAEHAAAAAQMAAAEEAAAABwD#####AAAA#wAQAAABAAEAAAD3AAAA#QAAAAcA#####wAAAP8AEAAAAQABAAAA#QAAAQUAAAAHAP####8AAAD#ABAAAAEAAQAAAQUAAAEDAAAABwD#####AAAA#wAQAAABAAEAAAEDAAAA9wAAAA4A#####wAAAP8AAQAAAAUAAAD3AAAA#QAAAQUAAAEDAAAA9wAAAA8A#####wD#AAAAAQAAAAD4AAAADwD#####AP8AAAABAAAAAPkAAAAbAP####8AEHN5bcOpdHJpZSBheGlhbGUAAAASAAAABgAAAAIAAAC+AAAAVAAAAAEAAAABDQACeDMAATIAAAACQAAAAAAAAAAAAAABAAAAAQ0AAnkzAAExAAAAAj#wAAAAAAAAAAAAAQAAAAENAANiaXMAATEAAAACP#AAAAAAAAAAAAABAAAAAQ0AAXQAATEAAAACP#AAAAAAAAAAAAABAAAAAQ0AAnhQAAExAAAAAj#wAAAAAAAAAAAAAQAAAAENAAJ5UAACLTEAAAADAAAAAj#wAAAAAAAAAAAABAAAAAENAAAAVAAAAAUBAAABDQAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAL4AAAEUAAAABgAAAAENAQAA#wASAAAAAAAAAAAAAABACAAAAAAAAAcAAAAAvgAAARUAAAAHAQAAAQ0AAAD#ABAAAAEAAQAAAL4AAAEWAAAABwEAAAENAAAA#wAQAAABAAEAAAEWAAABFQAAAAgAAAABDQEAAP8AAQAAARYAAAACP8mZmZmZmZoAAAAACQAAAAENAAABFwAAARkAAAAKAAAAAQ0AAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAABwACAAABGgAAAAcAAAABDQEAAAAAEAAAAQABAAABFgAAARsAAAALAAAAAQ0AAAAAABIAAAEBAQAAARYAAAEcAAAADAAAAAENAAAAAAEBAAABFgAAARsAAAAJAAAAAQ0AAAEdAAABHgAAAAoAAAABDQAAAP8AEgAAAQcAAgAAAR8AAAANAAAAAQ0AAAEWAAABGwAAAAUAAAABDQAAAP8AEgAAAQcAAAABIAAAASEAAAAOAQAAAQ0AAAD#AAEAAAAFAAABFgAAARsAAAEiAAABIAAAARYAAAAPAQAAAQ0A#wAAAAEBAAABFwAAAA8BAAABDQD#AAAAAQEAAAEYAAAAGwD#####ABBzeW3DqXRyaWUgYXhpYWxlAAAAEgAAAAYAAAACAAAAwAAAAEgAAAABAAAAASYAAngzAAEyAAAAAkAAAAAAAAAAAAAAAQAAAAEmAAJ5MwABMQAAAAI#8AAAAAAAAAAAAAEAAAABJgADYmlzAAExAAAAAj#wAAAAAAAAAAAAAQAAAAEmAAF0AAExAAAAAj#wAAAAAAAAAAAAAQAAAAEmAAJ4UAABMQAAAAI#8AAAAAAAAAAAAAEAAAABJgACeVAAAi0xAAAAAwAAAAI#8AAAAAAAAAAAAAQAAAABJgAAAEgAAAAFAQAAASYAAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADAAAABLQAAAAYAAAABJgEAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAHAAAAAMAAAAEuAAAABwEAAAEmAAAA#wAQAAABAAEAAADAAAABLwAAAAcBAAABJgAAAP8AEAAAAQABAAABLwAAAS4AAAAIAAAAASYBAAD#AAEAAAEvAAAAAj#JmZmZmZmaAAAAAAkAAAABJgAAATAAAAEyAAAACgAAAAEmAAAA#wASAAAAAAAAAAAAAABACAAAAAAAAAcAAgAAATMAAAAHAAAAASYBAAAAABAAAAEAAQAAAS8AAAE0AAAACwAAAAEmAAAAAAASAAABAQEAAAEvAAABNQAAAAwAAAABJgAAAAABAQAAAS8AAAE0AAAACQAAAAEmAAABNgAAATcAAAAKAAAAASYAAAD#ABIAAAEHAAIAAAE4AAAADQAAAAEmAAABLwAAATQAAAAFAAAAASYAAAD#ABIAAAEHAAAAATkAAAE6AAAADgEAAAEmAAAA#wABAAAABQAAAS8AAAE0AAABOwAAATkAAAEvAAAADwEAAAEmAP8AAAABAwAAATAAAAAPAQAAASYA#wAAAAEDAAABMQAAABsA#####wAQc3ltw6l0cmllIGF4aWFsZQAAABIAAAAGAAAAAgAAAMIAAABOAAAAAQAAAAE#AAJ4MwABMgAAAAJAAAAAAAAAAAAAAAEAAAABPwACeTMAATEAAAACP#AAAAAAAAAAAAABAAAAAT8AA2JpcwABMQAAAAI#8AAAAAAAAAAAAAEAAAABPwABdAABMQAAAAI#8AAAAAAAAAAAAAEAAAABPwACeFAAATEAAAACP#AAAAAAAAAAAAABAAAAAT8AAnlQAAItMQAAAAMAAAACP#AAAAAAAAAAAAAEAAAAAT8AAABOAAAABQEAAAE#AAAA#wASAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAwgAAAUYAAAAGAAAAAT8BAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAABwAAAADCAAABRwAAAAcBAAABPwAAAP8AEAAAAQABAAAAwgAAAUgAAAAHAQAAAT8AAAD#ABAAAAEAAQAAAUgAAAFHAAAACAAAAAE#AQAA#wABAAABSAAAAAI#yZmZmZmZmgAAAAAJAAAAAT8AAAFJAAABSwAAAAoAAAABPwAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAHAAIAAAFMAAAABwAAAAE#AQAAAAAQAAABAAEAAAFIAAABTQAAAAsAAAABPwAAAAAAEgAAAQEBAAABSAAAAU4AAAAMAAAAAT8AAAAAAQEAAAFIAAABTQAAAAkAAAABPwAAAU8AAAFQAAAACgAAAAE#AAAA#wASAAABBwACAAABUQAAAA0AAAABPwAAAUgAAAFNAAAABQAAAAE#AAAA#wASAAABBwAAAAFSAAABUwAAAA4BAAABPwAAAP8AAQAAAAUAAAFIAAABTQAAAVQAAAFSAAABSAAAAA8BAAABPwD#AAAAAQIAAAFJAAAADwEAAAE#AP8AAAABAgAAAUr#####AAAAAQAJQ1JvdGF0aW9uAP####8AAADrAAAAAkBWgAAAAAAAAAAABQD#####AAAA#wASAAAAAAAAAAAAAABACAAAAAAAAAkAAAAAxAAAAVgAAAAHAP####8AAAD#ABAAAAEBAQAAAMQAAADr#####wAAAAIAGkNNYXJxdWVBbmdsZU9yaWVudGVEaXJlY3RlAP####8AAAD#AQEAAAABQDAAAAAAAAAAAADEAAAA6wAAAVkAAAAABwD#####AAAA#wAQAAABAQEAAADrAAABWf####8AAAABABJDQXJjRGVDZXJjbGVEaXJlY3QA#####wD#AAAAAQAAAOsAAADEAAABWQAAAA8A#####wD#AAAAAQEAAAFcAAAADwD#####AP8AAAABAQAAAVoAAAApAP####8AAADsAAAAAwAAAAJAVoAAAAAAAAAAAAUA#####wAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAMYAAAFgAAAABwD#####AAAA#wAQAAABAQEAAADGAAAA7AAAAAcA#####wAAAP8AEAAAAQEBAAAA7AAAAWEAAAAPAP####8A#wAAAAECAAABYwAAAA8A#####wD#AAAAAQIAAAFi#####wAAAAIAHENNYXJxdWVBbmdsZU9yaWVudGVJbmRpcmVjdGUA#####wAAAP8AAQAAAAFAMAAAAAAAAAAAAMYAAADsAAABYQH#####AAAAAQAUQ0FyY0RlQ2VyY2xlSW5kaXJlY3QA#####wD#AAAAAQAAAOwAAADGAAABYf####8AAAABABFDU3ltZXRyaWVDZW50cmFsZQD#####AAAA7QAAAAUA#####wAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAMgAAAFoAAAABwD#####AAAA#wAQAAABAQEAAADIAAAA7QAAAAcA#####wAAAP8AEAAAAQEBAAAA7QAAAWkAAAAPAP####8A#wAAAAEBAAABawAAAA8A#####wD#AAAAAQEAAAFqAAAADQD#####AAAAAQAAAO4AAAAFAP####8AAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADKAAABbgAAACUA#####wAAAP8AEAAAAQABAAAAygAAAW8BAAAAJQD#####AQAA#wAQAAABAAEAAAABAAAA7gEAAAAHAP####8A#wAAABAAAAEBAQAAAO4AAAFvAAAABwD#####AP8AAAAQAAABAQEAAAABAAAAygAAAAEA#####wACazEAATIAAAACQAAAAAAAAAAAAAABAP####8AAmsyAAItNAAAAAMAAAACQBAAAAAAAAAAAAAXAP####8AAADvAAAAGQAAAXQAAAAFAP####8AAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADMAAABdgAAAAcA#####wAAAP8AEAAAAQEBAAAA7wAAAXcAAAATAP####8B#wAAABIAAAAAAAAAAAAAAEAIAAAAAAAABQABP+TbfTXiMrkAAAF4AAAAIQD#####AP8AAAAAAXkAAAAYAP####8AAAACAAlDRm9uY3Rpb24AAAAAGQAAAXQAAAACP#AAAAAAAAAAAAF5AAAAAgAAAXkAAAF5AAAAFwD#####AAAA8AAAABgDAAAAAj#wAAAAAAAAAAAAGQAAAXUAAAAFAP####8AAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADOAAABewAAAAcA#####wAAAP8AEAAAAQEBAAABfAAAAPAAAAAHAP####8AAAD#ABAAAAEBAQAAAPAAAADOAAAAEwD#####Af8AAAASAAFMAAAAAAAAAAAAQAgAAAAAAAAFAAE#5DMPSjR2ZQAAAX4AAAAhAP####8A#wAAAAABfwAAABgAAAAALwAAAAAZAAABdQAAAAI#8AAAAAAAAAAAAX8AAAACAAABfwAAAX8AAAApAP####8AAADxAAAAAkBOAAAAAAAAAAAABQD#####AAAA#wASAAAAAAAAAAAAAABACAAAAAAAAAkAAAAA0AAAAYEAAAAHAP####8AAAD#ABAAAAEBAQAAANAAAADxAAAABwD#####AAAA#wAQAAABAQEAAADxAAABggAAACsA#####wD#AAAAAQAAAPEAAADQAAABggAAACoA#####wAAAP8BAQAAAAFAMAAAAAAAAAAAANAAAADxAAABggEAAAAPAP####8A#wAAAAEDAAABhAAAAA8A#####wD#AAAAAQMAAAGDAAAAKQD#####AAAA8gAAAAMAAAACQE4AAAAAAAAAAAAFAP####8AAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAACQAAAADSAAABiQAAAAcA#####wAAAP8AEAAAAQEBAAAA0gAAAPIAAAAHAP####8AAAD#ABAAAAEBAQAAAPIAAAGKAAAALQD#####AP8AAAABAAAA8gAAANIAAAGKAAAADwD#####AP8AAAABAgAAAYsAAAAPAP####8A#wAAAAECAAABjAAAACwA#####wAAAP8AAQAAAAFAMAAAAAAAAAAAANIAAADyAAABigEAAAApAP####8AAADzAAAAAkBeAAAAAAAAAAAABQD#####AAAA#wASAAAAAAAAAAAAAABACAAAAAAAAAkAAAAA1AAAAZEAAAAHAP####8AAAD#ABAAAAEBAQAAANQAAADzAAAABwD#####AAAA#wAQAAABAQEAAAGSAAAA8wAAACoA#####wAAAP8BAQAAAAFAMAAAAAAAAAAAANQAAADzAAABkgEAAAArAP####8A#wAAAAEAAADzAAAA1AAAAZIAAAApAP####8AAAD0AAAAAwAAAAJAXgAAAAAAAAAAAAUA#####wAAAP8AEgAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAANYAAAGXAAAABwD#####AAAA#wAQAAABAQEAAADWAAAA9AAAAAcA#####wAAAP8AEAAAAQEBAAAA9AAAAZgAAAAsAP####8AAAD#AAEAAAABQDAAAAAAAAAAAADWAAAA9AAAAZgBAAAALQD#####AP8AAAABAAAA9AAAANYAAAGY#####wAAAAEADUNUcmFuc1BhclZlY3QA#####wAAAXAAAAAFAP####8BAAD#ABIAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAABAAABnQAAACUA#####wAAAP8AEAAAAQABAAAAAQAAAZ4BAAAADv##########"

	this.liste_questions = [];
		this.liste_corrections = []; // Liste de questions corrigées
		let xA,yA,xB,yB,xC,yC,k=[],xO,yO,k1,k2
		let xP=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] // ces nombres sont juste là pour compter combien il y en a... ils seront remplacés plus tard par les coordonnées utiles ou pas.
		let yP=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] // comme pour t, je n'utiliserai pas le premier élément pour coller aux index.
		let xO5,xO6,xO7,xO8,xO9,xO10,xO11,xO12,xO13,xO14
		let yO5,yO6,yO7,yO8,yO9,yO10,yO11,yO12,yO13,yO14
		let bis1=0,bis2=0,xx=0,yy=0,AfficheO=0,AfficheOO=0,t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] // il y a 14 transformations mais je n'utilise pas t[0] pour coller avec les index.
		let texte=``,texte_corr=``,lettre1=[`A`,`B`,`C`],lettre2=[`O\'`,`A`,`B`] // si t[i]=0 alors la transformation concernée n'existe pas, si t[i]=1, on la dessine.
		let point=[[]]
		let transformation=parseInt(this.sup)-1
		let liste_type_de_questions=[[1,2,3,4],[1,2,3,4,7],[1,2,3,4,7,8],[1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,9,10,11,12,13,14]]
		let choix_transformation=combinaison_listes(liste_type_de_questions[transformation],3)
		for (let j=0;j<3;j++) 
		if (choix_transformation[j]==10) k[j]=choice([2,2,2,2,4,4,4,4,5,10])*randint(-1,1,[0]) // rapport d'homothétie < 1 (plus ou moins  0.5, 0.25, 0.2 ou 0,1 ) avec une fréquence divisée par 4 pour 0.2 et 0.1.
		else k[j]=choice([1,2,2,3,3,4,4,5,5,2.5])*randint(-1,1,[0]) // rapport d'homothétie >=1 (plus ou - 1,2,2.5, 3, 4 ou 5 avec des fréquences divisées par 2 pour 1 et 2.5) 

		xA=randint(-10,10) // Point A
		yA=randint(-10,10)
		xB=randint(-10,10,[xA]) // Point B
		yB=randint(-10,10)
		xC=randint(-10,10) // Point C
		yC=randint(-10,10,[yA,yB])
		xO=randint(-3,3,[0])  // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et point d'intersection des axes))
		yO=randint(-3,3,[0])
	
		point[0]=image_point_par_transformation(choix_transformation[0],[xA,yA],[xO,yO],[xO,yO],k[0])
		while (point[0][0]<-13 || point[0][0]>13 || point[0][1]<-13 || point [0][1]>14) { // on teste si A est dans la fenêtre sinon on en choisit un autre
			xA=randint(-10,10) // Point A
			yA=randint(-10,10)
			point[0]=image_point_par_transformation(choix_transformation[0],[xA,yA],[xO,yO],[xO,yO],k[0])
		}

		if (choix_transformation[1]>4) point[1]=image_point_par_transformation(choix_transformation[1],[xB,yB],[xA,yA],[xA,yA],k[1])
		else point[1]=image_point_par_transformation(choix_transformation[1],[xB,yB],[xO,yO]) // si c'est une symétrie, l'axe passe par O'
		while (point[1][0]<-13 || point[1][0]>13 || point[1][1]<-13 || point [1][1]>14) { // on teste si on est dans les clous, sinon on choisit un autre point B
			xB=randint(-10,10,[xA]) // Point B
			yB=randint(-10,10)
			if (choix_transformation[1]>4) point[1]=image_point_par_transformation(choix_transformation[1],[xB,yB],[xA,yA],[xA,yA],k[1])
			else point[1]=image_point_par_transformation(choix_transformation[1],[xB,yB],[xO,yO]) // si c'est une symétrie, l'axe passe par O'
		}
		if (choix_transformation[2]>4) point[2]=image_point_par_transformation(choix_transformation[2],[xC,yC],[xB,yB],[xB,yB],k[2])
		else point[2]=image_point_par_transformation(choix_transformation[2],[xC,yC],[xO,yO]) // si c'est une symétrie, l'axe passe par O'
		while (point[2][0]<-13 || point[2][0]>13 || point[2][1]<-13 || point [2][1]>14) { // on vérifie que C est dans le repère sinon on change le point C.
			xC=randint(-10,10) // Point C
			yC=randint(-10,10,[yA,yB])
			if (choix_transformation[2]>4) point[2]=image_point_par_transformation(choix_transformation[2],[xC,yC],[xB,yB],[xB,yB],k[2])
			else point[2]=image_point_par_transformation(choix_transformation[2],[xC,yC],[xO,yO]) // si c'est une symétrie, l'axe passe par O'
		}
		// les points sont choisis, on écrit l'énoncé	
		for (let i=0;i<3;i++) {
			switch (choix_transformation[i]){
				case 1 :
					bis1=1
					t[1]=1
					if (i==0) {
						xP[1]=xA
						yP[1]=yA
					}
					else if (i==1) {
						xP[1]=xB
						yP[1]=yB
					}
					else {
						xP[1]=xC
						yP[1]=yC
					}
					texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d_1)$.<br>`
					texte_corr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d_1)$ a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break

				case 2 :
					bis2=1
					t[2]=1
					if (i==0) {
						xP[2]=xA
						yP[2]=yA
					}
					else if (i==1) {
						xP[2]=xB
						yP[2]=yB
					}
					else {
						xP[2]=xC
						yP[2]=yC
					}
					texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d_2)$.<br>`
					texte_corr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d_2)$ a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break

				case 3 :
					xx=1
					t[3]=1
					if (i==0) {
						xP[3]=xA
						yP[3]=yA
					}
					else if (i==1) {
						xP[3]=xB
						yP[3]=yB
					}
					else {
						xP[3]=xC
						yP[3]=yC
					}					
					texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d)$.<br>`
					texte_corr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d)$ a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break

				case 4 :
					yy=1
					t[4]=1
					if (i==0) {
						xP[4]=xA
						yP[4]=yA
					}
					else if (i==1) {
						xP[4]=xB
						yP[4]=yB
					}	
					else {
						xP[4]=xC
						yP[4]=yC
					}					
					texte += `Donner les coordonnées du symétrique de $${lettre1[i]}$ par rapport à la droite $(d\')$.<br>`
					texte_corr += `Le symétrique de $${lettre1[i]}$ par rapport à $(d\')$ a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break
		
				case 5 :
					AfficheO=1
					t[5]=1
					if (i==0) {
						xP[5]=xA
						yP[5]=yA
						xO5=xO
						yO5=yO
					}
					else if (i==1) {
						xP[5]=xB
						yP[5]=yB
						xO5=xA
						yO5=yA
					}	
					else {
						xP[5]=xC
						yP[5]=yC
						xO5=xB
						yO5=yB
					}	
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens anti-horaire a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break

				case 6 :
					AfficheO=1
					t[6]=1
					if (i==0) {
						xP[6]=xA
						yP[6]=yA
						xO6=xO
						yO6=yO
					}
					else if (i==1) {
						xP[6]=xB
						yP[6]=yB
						xO6=xA
						yO6=yA
					}	
					else {
						xP[6]=xC
						yP[6]=yC
						xO6=xB
						yO6=yB
					}						
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 90° dans le sens horaire a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break
			
				case 7 :
					AfficheO=1
					t[7]=1
					if (i==0) {
						xP[7]=xA
						yP[7]=yA
						xO7=xO
						yO7=yO
					}
					else if (i==1) {
						xP[7]=xB
						yP[7]=yB
						xO7=xA
						yO7=yA
					}	
					else {
						xP[7]=xC
						yP[7]=yC
						xO7=xB
						yO7=yB
					}	
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par la symétrie de centre $${lettre2[i]}$ a pour coordonnées ($${tex_nombrec(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break
		
				case 11 :
					AfficheO=1
					t[11]=1
					if (i==0) {
						xP[11]=xA
						yP[11]=yA
						xO11=xO
						yO11=yO
					}
					else if (i==1) {
						xP[11]=xB
						yP[11]=yB
						xO11=xA
						yO11=yA
					}	
					else {
						xP[11]=xC
						yP[11]=yC
						xO11=xB
						yO11=yB
					}	
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens anti-horaire a pour coordonnées ($${tex_nombre(calcul(point[i][0],2))};${tex_nombre(calcul(point[i][1],2))}$).<br>`
				break

				case 12 :
					AfficheO=1
					t[12]=1
					if (i==0) {
						xP[12]=xA
						yP[12]=yA
						xO12=xO
						yO12=yO
					}
					else if (i==1) {
						xP[12]=xB
						yP[12]=yB
						xO12=xA
						yO12=yA
					}	
					else {
						xP[12]=xC
						yP[12]=yC
						xO12=xB
						yO12=yB
					}	
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 60° dans le sens horaire a pour coordonnées ($${tex_nombre(calcul(point[i][0],2))};${tex_nombre(calcul(point[i][1],2))}$).<br>`
				break
		
				case 13 :
					AfficheO=1
					
				case 12 :
					AfficheO=1
					t[13]=1
					if (i==0) {
						xP[13]=xA
						yP[13]=yA
						xO13=xO
						yO13=yO
					}
					else if (i==1) {
						xP[13]=xB
						yP[13]=yB
						xO13=xA
						yO13=yA
					}	
					else {
						xP[13]=xC
						yP[13]=yC
						xO13=xB
						yO13=yB
					}	
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens anti-horaire a pour coordonnées ($${tex_nombre(calcul(point[i][0],2))};${tex_nombre(calcul(point[i][1],2))}$).<br>`
				break

				case 14 :
					AfficheO=1
					t[14]=1
					if (i==0) {
						xP[14]=xA
						yP[14]=yA
						xO14=xO
						yO14=yO
					}
					else if (i==1) {
						xP[14]=xB
						yP[14]=yB
						xO14=xA
						yO14=yA
					}	
					else {
						xP[14]=xC
						yP[14]=yC
						xO14=xB
						yO14=yB
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par la rotation de centre $${lettre2[i]}$ et d'angle 120° dans le sens horaire a pour coordonnées ($${tex_nombre(calcul(point[i][0],2))};${tex_nombre(calcul(point[i][1],2))}$).<br>`
				break
			
				case 8 :
					AfficheO=1
					t[8]=1
					if (i==0) {
						xP[8]=xA
						yP[8]=yA
						xO8=xO
						yO8=yO
					}
					else if (i==1) {
						xP[8]=xB
						yP[8]=yB
						xO8=xA
						yO8=yA
					}	
					else {
						xP[8]=xC
						yP[8]=yC
						xO8=xB
						yO8=yB
					}
					// AfficheOO=1
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par la translation qui transforme O en ${lettre2[i]}.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par la translation qui transforme O en ${lettre2[i]} a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break
			
				case 9 :
					AfficheO=1
					t[9]=1
					k1=k[i]
					if (i==0) {
						xP[9]=xA
						yP[9]=yA
						xO9=xO
						yO9=yO
					}
					else if (i==1) {
						xP[9]=xB
						yP[9]=yB
						xO9=xA
						yO9=yA
					}	
					else {
						xP[9]=xC
						yP[9]=yC
						xO9=xB
						yO9=yB
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${tex_nombre(k[i])}$.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${tex_nombre(k[i])}$ a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break

				case 10 :
					AfficheO=1
					t[10]=1
					k2=k[i]
					if (i==0) {
						xP[10]=xA
						yP[10]=yA
						xO10=xO
						yO10=yO
					}
					else if (i==1) {
						xP[10]=xB
						yP[10]=yB
						xO10=xA
						yO10=yA
					}	
					else {
						xP[10]=xC
						yP[10]=yC
						xO10=xB
						yO10=yB
					}
					texte += `Donner les coordonnées de l'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${tex_fraction_reduite(1,k[i])}$.<br>`
					texte_corr += `L'image de $${lettre1[i]}$ par l'homothétie de centre $${lettre2[i]}$ et de rapport $${tex_fraction_reduite(1,k[i])}$ a pour coordonnées ($${tex_nombre(point[i][0])};${tex_nombre(point[i][1])}$).<br>`
				break
			}
		}
		if (sortie_html) {
			this.type_exercice = 'MG32'; // on pilote les figures ci-dessous
			/*
			booléens permettant l'affichage des éléments si =1 et le masquage si =0
		bis1 affiche la droite de coefficient directeur 1 passant par O'
			bis2 affiche la droite de coefficient directeur -1 passant par O'
			xx' affiche la droite horizontale passant par O'
			yy' affiche la droite verticale passant par O'
			AfficheO' affiche O' comme son nom l'indique.
			AfficheOO' affiche le vecteur OO' vecteur de translation
			
			*/

			this.MG32code_pour_modifier_la_figure = `
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y", "${yA}");	mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x", "${xA}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yB", "${yB}");	mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xB", "${xB}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yC", "${yC}");	mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xC", "${xC}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y2", "${yO}");	mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${xO}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "yy'", "${yy}"); mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "xx'", "${xx}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "bis1", "${bis1}");	mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "bis2", "${bis2}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "AfficheO\'", "${AfficheO}"); mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "AfficheOO\'", "${AfficheOO}");
			
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "x", "${xA}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "y", "${yA}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xB", "${xB}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yB", "${yB}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xC", "${xC}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yC", "${yC}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP1", "${xP[1]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP1", "${yP[1]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP2", "${xP[2]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP2", "${yP[2]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP3", "${xP[3]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP3", "${yP[3]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP4", "${xP[4]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP4", "${yP[4]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP5", "${xP[5]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP5", "${yP[5]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP6", "${xP[6]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP6", "${yP[6]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP7", "${xP[7]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP7", "${yP[7]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP8", "${xP[8]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP8", "${yP[8]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP9", "${xP[9]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP9", "${yP[9]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP10", "${xP[10]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP10", "${yP[10]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP11", "${xP[11]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP11", "${yP[11]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP12", "${xP[12]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP12", "${yP[12]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP13", "${xP[13]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP13", "${yP[13]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xP14", "${xP[14]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yP14", "${yP[14]}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO5", "${xO5}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO5", "${yO5}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO6", "${xO6}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO6", "${yO6}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO7", "${xO7}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO7", "${yO7}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO8", "${xO8}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO8", "${yO8}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO9", "${xO9}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO9", "${yO9}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO10", "${xO10}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO10", "${yO10}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO11", "${xO11}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO11", "${yO11}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO12", "${xO12}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO12", "${yO12}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO13", "${xO13}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO13", "${yO13}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xO14", "${xO14}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yO14", "${yO14}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t1", "${t[1]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t2", "${t[2]}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t3", "${t[3]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t4", "${t[4]}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t5", "${t[5]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t6", "${t[6]}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t7", "${t[7]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t8", "${t[8]}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t9", "${t[9]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t10", "${t[10]}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t11", "${t[11]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t12", "${t[12]}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t13", "${t[13]}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "t14", "${t[14]}");	
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "k1", "${k1}"); mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "k2", "${k2}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "y2", "${yO}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "x2", "${xO}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "yy'", "${yy}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "xx'", "${xx}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "bis1", "${bis1}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "bis2", "${bis2}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "AfficheO\'", "${AfficheO}");
			mtg32App.giveFormula2("MG32svgcorr${numero_de_l_exercice}", "AfficheOO\'", "${AfficheOO}");			
			mtg32App.calculate("MG32svg${numero_de_l_exercice}");
			mtg32App.display("MG32svg${numero_de_l_exercice}");
			mtg32App.calculate("MG32svgcorr${numero_de_l_exercice}");
			mtg32App.display("MG32svgcorr${numero_de_l_exercice}");
			`
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			liste_de_question_to_contenu_sans_numero(this)

		}
		else {
			texte = ``
			texte_corr=``
			this.liste_questions.push(texte) // on envoie la question
			this.liste_corrections.push(texte_corr)
			liste_de_question_to_contenu_sans_numero(this);
		}
		


	}
	this.besoin_formulaire_numerique = ['Transformations',5, '1 : Symétries axiales (6ème)\n 2 : Symétries axiales et centrales (5ème)\n 3 : Symétries et translations (4ème)\n 4 : Symétries, translations, rotations et homothéties\n 5 : Les mêmes plus des rotations compliquées\n'];

}

/**
* Passer d'une écriture en base 10 à l'écriture dans une autre base ou inversement
*
* * Convertir en base 10
* * Convertir vers une base entre 2 et 7
* * Trouver le plus grand nombre à 3 ou 4 chiffres d'une base ainsi que son successeur et le convertir en base 10 ou le plus petit et son prédecesseur
*
* @Auteur Rémi Angot
*/
function Passer_d_une_base_a_l_autre() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Passer de la base 10 à une autre base et inversement";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['vers_base_10',choice(['vers_base_n_3_chiffres','vers_base_n_4_chiffres']),choice(['plus_grand_4_chiffres','plus_grand_3_chiffres','plus_petit_4_chiffres','plus_petit_3_chiffres'])];
		if (this.nb_questions > 3) {
			type_de_questions_disponibles = ['vers_base_10','vers_base_n_3_chiffres','vers_base_n_4_chiffres','plus_grand_4_chiffres','plus_grand_3_chiffres','plus_petit_4_chiffres','plus_petit_3_chiffres'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, b, n, m, chiffre1, chiffre2, chiffre3, chiffre4, cpt = 0; i < this.nb_questions && cpt < 50;) {
			b = randint(2,7);
			switch (liste_type_de_questions[i]) {
				case 'vers_base_10':
					n = randint(1,b-1)*10+randint(0,b-1);
					m = randint(1,b-1)*1000+randint(0,b-1)*100+randint(0,b-1)*10+randint(0,b-1);
					texte = `Les nombre $(${n})_${b}$ et $(${m})_${b}$ sont écrits en base ${b}. Donner leur écriture en base 10.`;
					texte_corr = `$(${n})_${b}=${n.toString()[0]}\\times${b}+${n.toString()[1]}=${parseInt(n,b)}$`;
					texte_corr += `<br>$(${m})_${b}=${m.toString()[0]}\\times${b}^3+${m.toString()[1]}\\times${b}^2+${m.toString()[2]}\\times${b}+${m.toString()[3]}=${parseInt(m,b)}$`;
				break;
				case 'vers_base_n_3_chiffres':
					chiffre1 = randint(1,b-1);
					chiffre2 = randint(0,b-1);
					chiffre3 = randint(0,b-1);
					n = chiffre1*b**2+chiffre2*b+chiffre3;
					texte = `Écrire en base ${b} le nombre ${n}.`;
					texte_corr = `$${n}=${b}\\times${Math.floor(n/b)}+${mise_en_evidence(n%b)}$`;
					texte_corr += `<br>$${Math.floor(n/b)}=${b}\\times${mise_en_evidence(chiffre1)}+${mise_en_evidence(chiffre2)}$`;
					texte_corr += `<br> Finalement $${n}=(${chiffre1}${chiffre2}${chiffre3})_${b}$`
				break;
				case 'vers_base_n_4_chiffres':
					chiffre1 = randint(1,b-1);
					chiffre2 = randint(0,b-1);
					chiffre3 = randint(0,b-1);
					chiffre4 = randint(0,b-1);
					n = chiffre1*b**3+chiffre2*b**2+chiffre3*b+chiffre4;
					texte = `Écrire en base ${b} le nombre ${n}.`;
					texte_corr = `$${n}=${b}\\times${Math.floor(n/b)}+${mise_en_evidence(n%b)}$`;
					texte_corr += `<br>$${Math.floor(n/b)}=${b}\\times${Math.floor(Math.floor(n/b)/b)}+${mise_en_evidence(Math.floor(n/b)%b)}$`;
					texte_corr += `<br>$${Math.floor(Math.floor(n/b)/b)}=${b}\\times${mise_en_evidence(chiffre1)}+${mise_en_evidence(chiffre2)}$`;
					texte_corr += `<br> Finalement $${n}=(${chiffre1}${chiffre2}${chiffre3}${chiffre4})_${b}$`
				break;
				case 'plus_grand_4_chiffres':
					texte = `Quel est le plus grand nombre à 4 chiffres que l'on peut écrire en base ${b}.`;
					texte +=`<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					texte_corr = `En base ${b} les chiffres sont 0`;
					for (let i = 1; i < b; i++) {
						texte_corr += `, ${i}`
					}
					texte_corr += ` donc le plus grand nombre à 4 chiffres est $(${b-1}${b-1}${b-1}${b-1})_${b}$ et son successeur immédiat est $(10000)_${b}$.` 
					texte_corr += `<br> $(10000)_${b}=1\\times${b}^4=${tex_nombre(b**4)}$ donc $(${b-1}${b-1}${b-1}${b-1})_${b}=${b**4}-1=${tex_nombre(b**4-1)}$.`
				break;
				case 'plus_grand_3_chiffres':
					texte = `Quel est le plus grand nombre à 3 chiffres que l'on peut écrire en base ${b}.`;
					texte +=`<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					texte_corr = `En base ${b} les chiffres sont 0`;
					for (let i = 1; i < b; i++) {
						texte_corr += `, ${i}`
					}
					texte_corr += ` donc le plus grand nombre à 3 chiffres est $(${b-1}${b-1}${b-1})_${b}$ et son successeur immédiat est $(1000)_${b}$.` 
					texte_corr += `<br> $(1000)_${b}=1\\times${b}^3=${tex_nombre(b**3)}$ donc $(${b-1}${b-1}${b-1})_${b}=${b**3}-1=${tex_nombre(b**3-1)}$.`
				break;
				case 'plus_petit_4_chiffres':
					texte = `Quel est le plus petit nombre à 4 chiffres que l'on peut écrire en base ${b}.`;
					texte +=`<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					texte_corr = `En base ${b} les chiffres sont 0`;
					for (let i = 1; i < b; i++) {
						texte_corr += `, ${i}`
					}
					texte_corr += ` donc le plus petit nombre à 4 chiffres est $(1000)_${b}$ et son prédécesseur immédiat est $(${b-1}${b-1}${b-1})_${b}$.` 
					texte_corr += `<br> $(1000)_${b}=1\\times${b}^3=${tex_nombre(b**3)}$ donc $(${b-1}${b-1}${b-1})_${b}=${b**3}-1=${tex_nombre(b**3-1)}$.`
				break;
				case 'plus_petit_3_chiffres':
					texte = `Quel est le plus petit nombre à 3 chiffres que l'on peut écrire en base ${b}.`;
					texte +=`<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					texte_corr = `En base ${b} les chiffres sont 0`;
					for (let i = 1; i < b; i++) {
						texte_corr += `, ${i}`
					}
					texte_corr += ` donc le plus petit nombre à 3 chiffres est $(100)_${b}$ et son prédécesseur immédiat est $(${b-1}${b-1})_${b}$.` 
					texte_corr += `<br> $(100)_${b}=1\\times${b}^2=${tex_nombre(b**2)}$ donc $(${b-1}${b-1})_${b}=${b**2}-1=${tex_nombre(b**2-1)}$.`
				break;
				
			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
}


/**
* Passer d'une écriture en base 10 à l'écriture dans une autre base ou inversement
*
* * Convertir en base 10
* * Convertir vers une base entre 2 et 7
* * Trouver le plus grand nombre à 3 ou 4 chiffres d'une base ainsi que son successeur et le convertir en base 10 ou le plus petit et son prédecesseur
*
* @Auteur Rémi Angot
*/
function Passer_de_la_base_12_ou_16_a_la_10() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Passer de la base 12 ou 16 à la base 10 et inversement";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['vers_base_10','vers_base_n_3_chiffres']
		if (this.nb_questions==3) {
			type_de_questions_disponibles.push(choice(['vers_base_n_4_chiffres','plus_grand_4_chiffres','plus_petit_4_chiffres','plus_petit_3_chiffres']))
		}
		 
		
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let	b = choice([12,16]);
		if (b==12) {
			this.introduction = 'Les symboles que l’on utilise en base 12 sont les dix chiffres habituels, la lettre A pour désigner 10 unités et la lettre B pour désigner 11 unités.';
		} else {
			this.introduction = 'Les symboles que l’on utilise en base 16 sont les dix chiffres habituels, la lettre A pour désigner 10 unités, B pour 11 unités, C pour 12 unités, D pour 13 unités, ';
			this.introduction +='E pour 14 unités et F pour 15 unités.'
		}
		for (let i = 0, texte, texte_corr, n, m, chiffre1, chiffre2, chiffre3, chiffre4, cpt = 0; i < this.nb_questions && cpt < 50;) {
			switch (liste_type_de_questions[i]) {
				case 'vers_base_10':
					if (b==12) {
						n = choice([choice(['A','B'])+randint(0,9),randint(1,9)+choice(['A','B']),choice(['A','B'])+choice(['A','B'])]) 
						m = choice(['A','B',randint(1,9)])+choice(['A','B',randint(0,9)])+choice(['A','B',randint(0,9)])+choice(['A','B',randint(0,9)]);
					}	
					if (b==16) {
						n = choice(['A','B','C','D','E','F',randint(1,9).toString()])+choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9']);
						m = choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'])+choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'])+choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9']);
					}				
					texte = `Les nombre $(${n})_{${b}}$ et $(${m})_{${b}}$ sont écrits en base ${b}. Donner leur écriture en base 10.`;
					texte_corr = `$(${n})_{${b}}=${valeur_base(n.toString()[0])}\\times${b}+${valeur_base(n.toString()[1])}=${tex_nombre(parseInt(n,b))}$`;
					if (b==12) { //m est un nombre à 4 chiffres
						texte_corr += `<br>$(${m})_{${b}}=${valeur_base(m.toString()[0])}\\times${b}^3+${valeur_base(m.toString()[1])}\\times${b}^2+${valeur_base(m.toString()[2])}\\times${b}+${valeur_base(m.toString()[3])}=${tex_nombre(parseInt(m,b))}$`;
					} else { //m est un nombre à 3 chiffres
						texte_corr += `<br>$(${m})_{${b}}=${valeur_base(m.toString()[0])}\\times${b}^2+${valeur_base(m.toString()[1])}\\times${b}+${valeur_base(m.toString()[2])}=${tex_nombre(parseInt(m,b))}$`;
					}
				break;
				case 'vers_base_n_3_chiffres':
					if (b==12) {
						chiffre1 = choice(['A','B',randint(1,9).toString()])
						chiffre2 = choice(['A','B',randint(0,9).toString()])
						chiffre3 = choice(['A','B',randint(1,9).toString()])
					} else {
						chiffre1 = choice(['A','B','C','D','E','F','1','2','3','4','5','6','7','8','9']);
						chiffre2 = choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9']);
						chiffre3 = choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9']);
					}
					n = valeur_base(chiffre1)*b**2+valeur_base(chiffre2)*b+valeur_base(chiffre3);
					texte = `Écrire en base ${b} le nombre ${nombre_avec_espace(n)}.`;
					texte_corr = `$${tex_nombre(n)}=${b}\\times${Math.floor(n/b)}+${mise_en_evidence(n%b)}$`;
					texte_corr += `<br>$${Math.floor(n/b)}=${b}\\times${mise_en_evidence(valeur_base(chiffre1))}+${mise_en_evidence(valeur_base(chiffre2))}$`;
					texte_corr += `<br> Finalement $${tex_nombre(n)}=(${chiffre1}${chiffre2}${chiffre3})_{${b}}$`
				break;
				case 'vers_base_n_4_chiffres':
					if (b==12) {
						chiffre1 = choice(['A','B',randint(1,9).toString()])
						chiffre2 = choice(['A','B',randint(0,9).toString()])
						chiffre3 = choice(['A','B',randint(1,9).toString()])
						chiffre4 = choice(['A','B',randint(1,9).toString()])
					} else {
						chiffre1 = choice(['A','B','C','D','E','F','1','2','3','4','5','6','7','8','9']);
						chiffre2 = choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9']);
						chiffre3 = choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9']);
						chiffre4 = choice(['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9']);
					}
					n = valeur_base(chiffre1)*b**3+valeur_base(chiffre2)*b**2+valeur_base(chiffre3)*b+valeur_base(chiffre4);
					texte = `Écrire en base ${b} le nombre ${nombre_avec_espace(n)}.`;
					texte_corr = `$${tex_nombre(n)}=${b}\\times${Math.floor(n/b)}+${mise_en_evidence(n%b)}$`;
					texte_corr += `<br>$${tex_nombre(Math.floor(n/b))}=${b}\\times${Math.floor(Math.floor(n/b)/b)}+${mise_en_evidence(Math.floor(n/b)%b)}$`;
					texte_corr += `<br>$${tex_nombre(Math.floor(Math.floor(n/b)/b))}=${b}\\times${mise_en_evidence(valeur_base(chiffre1))}+${mise_en_evidence(valeur_base(chiffre2))}$`;
					texte_corr += `<br> Finalement $${tex_nombre(n)}=(${chiffre1}${chiffre2}${chiffre3}${chiffre4})_{${b}}$`
				break;
				case 'plus_grand_4_chiffres':
					texte = `Quel est le plus grand nombre à 4 chiffres que l'on peut écrire en base ${b}.`;
					texte +=`<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					if (b==12) {
						texte_corr = `En base ${b} le plus grand chiffre est $B$`
						texte_corr += ` donc le plus grand nombre à 4 chiffres est $(BBBB)_{${b}}$ et son successeur immédiat est $(10000)_{${b}}$.` 
						texte_corr += `<br> $(10000)_{${b}}=1\\times${b}^4=${tex_nombre(b**4)}$ donc $(BBBB)_{${b}}=${b**4}-1=${tex_nombre(b**4-1)}$.`
					} else {
						texte_corr = `En base ${b} le plus grand chiffre est $F$`
						texte_corr += ` donc le plus grand nombre à 4 chiffres est $(FFFF)_{${b}}$ et son successeur immédiat est $(10000)_{${b}}$.` 
						texte_corr += `<br> $(10000)_{${b}}=1\\times${b}^4=${tex_nombre(b**4)}$ donc $(FFFF)_{${b}}=${b**4}-1=${tex_nombre(b**4-1)}$.`
					}
				break;
				case 'plus_grand_3_chiffres':
					texte = `Quel est le plus grand nombre à 3 chiffres que l'on peut écrire en base ${b}.`;
					texte +=`<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					if (b==12) {
						texte_corr = `En base ${b} le plus grand chiffre est $B$`
						texte_corr += ` donc le plus grand nombre à 3 chiffres est $(BBB)_{${b}}$ et son successeur immédiat est $(1000)_{${b}}$.` 
						texte_corr += `<br> $(1000)_{${b}}=1\\times${b}^3=${tex_nombre(b**3)}$ donc $(BBB)_{${b}}=${b**3}-1=${tex_nombre(b**3-1)}$.`
					} else {
						texte_corr = `En base ${b} le plus grand chiffre est $F$`
						texte_corr += ` donc le plus grand nombre à 3 chiffres est $(FFF)_{${b}}$ et son successeur immédiat est $(1000)_{${b}}$.` 
						texte_corr += `<br> $(1000)_{${b}}=1\\times${b}^3=${tex_nombre(b**3)}$ donc $(FFF)_{${b}}=${b**3}-1=${tex_nombre(b**3-1)}$.`
					}
				break;
				case 'plus_petit_4_chiffres':
					texte = `Quel est le plus petit nombre à 4 chiffres que l'on peut écrire en base ${b}.`;
					texte +=`<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					if (b==12) {
						texte_corr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $B$`
						texte_corr += ` donc le plus petit nombre à 4 chiffres est $(1000)_{${b}}$ et son prédécesseur immédiat est $(BBB)_{${b}}$.` 
						texte_corr += `<br> $(1000)_{${b}}=1\\times${b}^3=${tex_nombre(b**3)}$ donc $(BBB)_{${b}}=${b**3}-1=${tex_nombre(b**3-1)}$.`
					} else {
						texte_corr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $F$`
						texte_corr += ` donc le plus petit nombre à 4 chiffres est $(1000)_{${b}}$ et son prédécesseur immédiat est $(FFF)_{${b}}$.` 
						texte_corr += `<br> $(1000)_{${b}}=1\\times${b}^3=${tex_nombre(b**3)}$ donc $(FFF)_{${b}}=${b**3}-1=${tex_nombre(b**3-1)}$.`
					}
				break;
				case 'plus_petit_3_chiffres':
					texte = `Quel est le plus petit nombre à 3 chiffres que l'on peut écrire en base ${b}.`;
					texte +=`<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					if (b==12) {
						texte_corr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $B$`
						texte_corr += ` donc le plus petit nombre à 3 chiffres est $(100)_{${b}}$ et son prédécesseur immédiat est $(BB)_{${b}}$.` 
						texte_corr += `<br> $(100)_{${b}}=1\\times${b}^2=${tex_nombre(b**2)}$ donc $(BB)_{${b}}=${b**2}-1=${tex_nombre(b**2-1)}$.`
					} else {
						texte_corr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $F$`
						texte_corr += ` donc le plus petit nombre à 3 chiffres est $(100)_{${b}}$ et son prédécesseur immédiat est $(FF)_{${b}}$.` 
						texte_corr += `<br> $(100)_{${b}}=1\\times${b}^2=${tex_nombre(b**2)}$ donc $(FF)_{${b}}=${b**2}-1=${tex_nombre(b**2-1)}$.`
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
		liste_de_question_to_contenu(this);
	}
}


/**
* Problèmes de variations en pourcentage
*
* * Situations variées : prix soldé ou augmenté, effectif d'un collège ou lycée, facture, population d'une ville
* 
* * Calculer le résultat d'une évolution 
* * Exprimer l'évolution en pourcentage
* * Retrouver la situation initiale
* * Mélange des 3 types de problèmes
* @Auteur Rémi Angot
* 3P10
*/
function Evolutions_en_pourcentage() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Variations en pourcentage";
	this.consigne = "";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 4; // type de questions

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = [];
		if (this.sup==1) {
			type_de_questions_disponibles = ['finale'];
		}
		if (this.sup==2) {
			type_de_questions_disponibles = ['evolution'];
		}
		if (this.sup==3) {
			type_de_questions_disponibles = ['initiale'];
		}
		if (this.sup==4) {
			type_de_questions_disponibles = ['finale','evolution','initiale'];
		}
		let type_de_situations_disponibles = ['prix','etablissement','facture','population'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_situations = combinaison_listes(type_de_situations_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, depart, arrive, taux, coeff, cpt = 0; i < this.nb_questions && cpt < 50;) {

			switch (liste_type_de_situations[i]) {
				case 'prix':
					depart = choice([calcul(randint(11,99)/10),randint(11,99),randint(11,99)*10]);
					taux = choice([10,20,30,40,60]);
					taux *= choice([-1,1]);
					coeff = tex_nombrec(1+taux/100)
					arrive = calcul(depart*(1+taux/100));
					switch (liste_type_de_questions[i]){
						case 'finale' :
						if (taux>0) {
							texte = `Un article coûtait $${tex_prix(depart)}$ € et son prix a augmenté de $${taux}~\\%$. Calculer son nouveau prix.`
							texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.`
							texte_corr += `<br>$${tex_prix(depart)}\\times ${coeff} = ${tex_prix(arrive)}$`
							texte_corr += `<br>Le nouveau prix de cet article est ${tex_prix(arrive)} €.`
						} else {
							texte = `Un article coûtait $${tex_prix(depart)}$ € et son prix est soldé à $${taux}~\\%$. Calculer son nouveau prix.`
							texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.`
							texte_corr += `<br>$${tex_prix(depart)}\\times ${coeff} = ${tex_prix(arrive)}$`
							texte_corr += `<br>Le nouveau prix de cet article est ${tex_prix(arrive)} €.`
						}
						break;
						case 'initiale' :
						if (taux>0) {
							texte = `Après une augmentation de $${taux}~\\%$ un article coûte maintenant $${tex_prix(arrive)}$ €. Calculer son prix avant l'augmentation.`
							texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100+taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par ${coeff}.`
							texte_corr += `<br>$${tex_prix(arrive)}\\div ${coeff} = ${tex_prix(depart)}$`
							texte_corr += `<br>Avant l'augmentation cet article coûtait ${tex_prix(depart)} €.`
						} else {
							texte = `Soldé à $${taux}~\\%$ un article coûte maintenant $${tex_prix(arrive)}$ €. Calculer son prix avant les soldes.`
							texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par ${coeff}.`
							texte_corr += `<br>$${tex_prix(arrive)}\\div ${coeff} = ${tex_prix(depart)}$`
							texte_corr += `<br>Avant les soldes cet article coûtait ${tex_prix(depart)} €.`
						}
						break;
						case 'evolution' :
						if (taux>0) {
							texte = `Un article qui coûtait $${tex_prix(depart)}$ € coûte maintenant $${tex_prix(arrive)}$ €. Exprimer l'augmentation du prix en pourcentage.`
							texte_corr = `$${tex_prix(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100+taux}~\\% = 100~\\%+${taux}~\\%$`
							texte_corr += `<br>Le prix a été multiplié par ${coeff}, il a donc augmenté de $${taux}~\\%$.`
						} else {
							texte = `Un article qui coûtait $${tex_prix(depart)}$ € coûte maintenant $${tex_prix(arrive)}$ €. Exprimer la réduction du prix en pourcentage.`
							texte_corr = `$${tex_prix(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100+taux}~\\% = 100~\\%${taux}~\\%$`
							texte_corr += `<br>Le prix a été multiplié par ${coeff}, il a donc diminué de $${abs(taux)}~\\%$.`
						}
						break;
					}
				break;
				case 'etablissement':
					//Le nombre d'élève doit être entier
					//Multiple de 50 et multiple de 2%
					//Multiple de 20 et multiple de 5%
					//Multiple de 100 et n%
					switch (randint(1,3)){
						case 1 : 
							depart = 50*randint(7,24);
							taux = 2*randint(1,5);
						break;
						case 2 : 
							depart = 20*randint(17,60);
							taux = 5*randint(1,3);
						break;
						case 3 : 
							depart = 100*randint(4,12);
							taux = randint(1,11);
						break;
					}
					arrive = calcul(depart*(1+taux/100));
					coeff = tex_nombrec(1+taux/100)
					let date = new Date()
					let cetteAnnee = date.getFullYear();
					let anneeDerniere = cetteAnnee-1;
					let etablissement = choice(['collège','lycée']);
					switch (liste_type_de_questions[i]){
						case 'finale' :
						if (taux>0) {
							texte = `Un ${etablissement} avait $${tex_nombre(depart)}$ élèves en ${anneeDerniere}. Depuis, le nombre d'élèves a augmenté de $${taux}~\\%$. Calculer le nombre d'élèves dans ce ${etablissement} cette année.`
							texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.`
							texte_corr += `<br>$${tex_nombre(depart)}\\times ${coeff} = ${tex_nombre(arrive)}$`
							texte_corr += `<br>Il y a maintenant ${string_nombre(arrive)} élèves dans ce ${etablissement}.`
						} else {
							texte = `Un ${etablissement} avait $${tex_nombre(depart)}$ élèves en ${anneeDerniere}. Depuis, le nombre d'élèves a diminué de $${abs(taux)}~\\%$. Calculer le nombre d'élèves dans ce ${etablissement} cette année.`
							texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.`
							texte_corr += `<br>$${tex_nombre(depart)}\\times ${coeff} = ${tex_nombre(arrive)}$`
							texte_corr += `<br>Il y a maintenant ${string_nombre(arrive)} élèves dans ce ${etablissement}.`
						}
						break;
						case 'initiale' :
						if (taux>0) {
							texte = `Depuis ${anneeDerniere} le nombre d'élèves d'un ${etablissement} a augmenté de $${taux}~\\%$. Il y a maintenant $${tex_nombre(arrive)}$ élèves. Calculer le nombre d'élèves en ${anneeDerniere} dans cet établissement.`
							texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.<br>Pour retrouver le nombre initial d'élèves, on va donc diviser le nombre actuel d'élèves par ${coeff}.`
							texte_corr += `<br>$${tex_nombre(arrive)}\\div ${coeff} = ${tex_nombre(depart)}$`
							texte_corr += `<br>En ${anneeDerniere}, il y avait ${string_nombre(depart)} élèves dans ce ${etablissement}.`
						} else {
							texte = `Depuis ${anneeDerniere} le nombre d'élèves d'un ${etablissement} a diminué de $${taux}~\\%$. Il y a maintenant $${tex_nombre(arrive)}$ élèves. Calculer le nombre d'élèves en ${anneeDerniere} dans cet établissement.`
							texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.<br>Pour retrouver le nombre initial d'élèves, on va donc diviser le nombre actuel d'élèves par ${coeff}.`
							texte_corr += `<br>$${tex_nombre(arrive)}\\div ${coeff} = ${tex_nombre(depart)}$`
							texte_corr += `<br>En ${anneeDerniere}, il y avait ${string_nombre(depart)} élèves dans ce ${etablissement}.`
						}
						break;
						case 'evolution' :
						texte = `En ${anneeDerniere}, il y avait $${tex_nombre(depart)}$ élèves dans un ${etablissement}. En ${cetteAnnee}, ils sont $${tex_nombre(arrive)}$. Exprimer la variation du nombre d'élèves de cet établissement en pourcentage.`
						if (taux>0) {
							texte_corr = `$${tex_nombre(arrive)}\\div ${tex_nombre(depart)} = ${coeff} =  ${100+taux}~\\% = 100~\\%+${taux}~\\%$`
							texte_corr += `<br>Le nombre d'élèves a été multiplié par ${coeff}, il a donc augmenté de $${taux}~\\%$.`
						} else {
							texte = `Un article qui coûtait $${tex_nombre(depart)}$ € coûte maintenant $${tex_nombre(arrive)}$ €. Exprimer la réduction du prix en pourcentage.`
							texte_corr = `$${tex_nombre(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100+taux}~\\% = 100~\\%${taux}~\\%$`
							texte_corr += `<br>Le nombre d'élèves a été multiplié par ${coeff}, il a donc diminué de $${abs(taux)}~\\%$.`
						}
						break;
					}
				break;
				case 'facture':
					depart = randint(700,1400);
					taux = randint(1,12);
					taux *= choice([-1,1]);
					coeff = tex_nombrec(1+taux/100)
					arrive = calcul(depart*(1+taux/100));
					let facture = choice(["ma facture annuelle d'électricité","ma facture annuelle de gaz","ma taxe d'habitation","mon ordinateur","mon vélo électrique"])
					switch (liste_type_de_questions[i]){
						case 'finale' :
						if (taux>0) {
							texte = `Le prix de ${facture} était de $${tex_prix(depart)}$ € l'année dernière et il a augmenté de $${taux}~\\%$. Calculer son nouveau prix.`
							texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.`
							texte_corr += `<br>$${tex_prix(depart)}\\times ${coeff} = ${tex_prix(arrive)}$`
							texte_corr += `<br>Le prix de ${facture} est maintenant de ${tex_prix(arrive)} €.`
						} else {
							texte = `Le prix de ${facture} était de $${tex_prix(depart)}$ € l'année dernière et il a diminué de $${abs(taux)}~\\%$. Calculer son nouveau prix.`
							texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.`
							texte_corr += `<br>$${tex_prix(depart)}\\times ${coeff} = ${tex_prix(arrive)}$`
							texte_corr += `<br>Le prix de ${facture} est maintenant de ${tex_prix(arrive)} €.`
						}
						break;
						case 'initiale' :
						if (taux>0) {
							texte = `Après une augmentation de $${taux}~\\%$ le prix de ${facture} est maintenant $${tex_prix(arrive)}$ €. Calculer son prix avant l'augmentation.`
							texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100+taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par ${coeff}.`
							texte_corr += `<br>$${tex_prix(arrive)}\\div ${coeff} = ${tex_prix(depart)}$`
							texte_corr += `<br>Avant l'augmentation le prix de ${facture} était de ${tex_prix(depart)} €.`
						} else {
							texte = `Après une diminution de $${abs(taux)}~\\%$ ${facture} coûte maintenant $${tex_prix(arrive)}$ €. Calculer son prix avant les soldes.`
							texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par ${coeff}.`
							texte_corr += `<br>$${tex_prix(arrive)}\\div ${coeff} = ${tex_prix(depart)}$`
							texte_corr += `<br>Avant la diminution le prix de ${facture} était de ${tex_prix(depart)} €.`
						}
						break;
						case 'evolution' :
						if (taux>0) {
							texte = `Le prix de ${facture} est passé de $${tex_prix(depart)}$ € à $${tex_prix(arrive)}$ €. Exprimer cette augmentation en pourcentage.`
							texte_corr = `$${tex_prix(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100+taux}~\\% = 100~\\%+${taux}~\\%$`
							texte_corr += `<br>Le prix a été multiplié par ${coeff}, il a donc augmenté de $${taux}~\\%$.`
						} else {
							texte = `Le prix de ${facture} est passé de $${tex_prix(depart)}$ € à $${tex_prix(arrive)}$ €. Exprimer cette diminution en pourcentage.`
							texte_corr = `$${tex_prix(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100+taux}~\\% = 100~\\%${taux}~\\%$`
							texte_corr += `<br>Le prix a été multiplié par ${coeff}, il a donc diminué de $${abs(taux)}~\\%$.`
						}
						break;
					}
				break;
				case 'population':
					depart = choice([randint(11,99)*1000,randint(11,99)*10000]);
					taux = randint(5,35);
					taux *= choice([-1,1]);
					coeff = tex_nombrec(1+taux/100)
					arrive = calcul(depart*(1+taux/100));
					let nb = randint(5,15);
					switch (liste_type_de_questions[i]){
						case 'finale' :
						if (taux>0) {
							texte = `Il y a ${nb} ans, la population d'une ville était de $${tex_nombre(depart)}$ habitants. Depuis, elle a augmenté de $${taux}~\\%$. Calculer le nombre d'habitants actuel de cette ville.`
							texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.`
							texte_corr += `<br>$${tex_nombre(depart)}\\times ${coeff} = ${tex_nombre(arrive)}$`
							texte_corr += `<br>La population de cette ville est maintenant de $${tex_nombre(arrive)}$ habitants.`
						} else {
							texte = `Il y a ${nb} ans, la population d'une ville était de $${tex_nombre(depart)}$ habitants. Depuis, elle a diminué de $${abs(taux)}~\\%$. Calculer le nombre d'habitants actuel de cette ville.`
							texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.`
							texte_corr += `<br>$${tex_nombre(depart)}\\times ${coeff} = ${tex_nombre(arrive)}$`
							texte_corr += `<br>La population de cette ville est maintenant de $${tex_nombre(arrive)}$ habitants.`
						}
						break;
						case 'initiale' :
						if (taux>0) {
							texte = `En ${nb} ans, la population d'une ville a augmenté de $${taux}~\\%$ et est maintenant $${tex_nombre(arrive)}$ habitants. Calculer sa population d'il y a ${nb} ans.`
							texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100+taux}~\\% = ${coeff}$.<br>Pour retrouver la population initiale, on va donc diviser le nombre d'habitants actuel par ${coeff}.`
							texte_corr += `<br>$${tex_nombre(arrive)}\\div ${coeff} = ${tex_nombre(depart)}$`
							texte_corr += `<br>Il y a ${nb} ans cette ville comptait $${tex_nombre(depart)}$ habitants.`
						} else {
							texte = `En ${nb} ans, la population d'une ville a diminué de $${abs(taux)}~\\%$ et est maintenant $${tex_nombre(arrive)}$ habitants. Calculer sa population d'il y a ${nb} ans.`
							texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100+taux}~\\% = ${coeff}$.<br>Pour retrouver la population initiale, on va donc diviser le nombre d'habitants actuel par ${coeff}.`
							texte_corr += `<br>$${tex_nombre(arrive)}\\div ${coeff} = ${tex_nombre(depart)}$`
							texte_corr += `<br>Il y a ${nb} ans cette ville comptait $${tex_nombre(depart)}$ habitants.`
						}
						break;
						case 'evolution' :
						if (taux>0) {
							texte = `En ${nb} ans, la population d'une ville est passé de $${tex_nombre(depart)}$ habitants à $${tex_nombre(arrive)}$. Exprimer cette augmentation en pourcentage.`
							texte_corr = `$${tex_nombre(arrive)}\\div ${tex_nombre(depart)} = ${coeff} =  ${100+taux}~\\% = 100~\\%+${taux}~\\%$`
							texte_corr += `<br>La population a été multipliée par ${coeff} elle a donc augmenté de $${abs(taux)}~\\%$.`
						} else {
							texte = `En ${nb} ans, la population d'une ville est passé de $${tex_nombre(depart)}$ habitants à $${tex_nombre(arrive)}$. Exprimer cette diminution en pourcentage.`
							texte_corr = `$${tex_nombre(arrive)}\\div ${tex_nombre(depart)} = ${coeff} =  ${100+taux}~\\% = 100~\\%${taux}~\\%$`
							texte_corr += `<br>La population a été multipliée par ${coeff} elle a donc diminué de $${abs(taux)}~\\%$.`
						}
						break;
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
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 : Déterminer le résultat après une variation en pourcentage\n2 : Exprimer une variation en pourcentage\n3 : Calculer la valeur initiale en connaissant la variation et la situation finale\n4 : Mélange des 3 types de problèmes'];
}


/**
* Déterminer le coefficient de proportionnalité associé à une évolution en pourcentage ou l'inverse
*
* 
* @Auteur Rémi Angot
* 3P10-1
*/
function Coefficient_evolution() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Coefficient multiplicateur d'une variation en pourcentage";
	this.consigne = "Compléter.";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let texte_aide = '- Augmenter un nombre de $t~\\%$ revient à le multiplier par $1+\\dfrac{t}{100}$.';
		texte_aide += '<br>'
		texte_aide += '<br>- Diminuer un nombre de $t~\\%$ revient à le multiplier par $1-\\dfrac{t}{100}$.'
		texte_aide += '<br>'
		texte_aide += '<br><b>Exemples</b> :'
		texte_aide += '<br>- Diminuer un nombre de $20~\\%$ revient à le multiplier par $1-\\dfrac{20}{100}=1-0,20=0,8$.'
		texte_aide += '<br><br>- Augmenter un nombre de $5~\\%$ revient à le multiplier par $1+\\dfrac{5}{100}=1+0,05=1,05$.'

		this.bouton_aide = modal_url(numero_de_l_exercice,'/aide/3P10');

		let type_de_questions_disponibles = [];
		if (this.sup==1) {
			type_de_questions_disponibles = ['coef+','coef-'];
		}
		if (this.sup==2) {
			type_de_questions_disponibles = ['taux+','taux-'];
		}
		if (this.sup==3) {
			type_de_questions_disponibles = ['coef+','coef-','taux+','taux-'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, taux, coeff, cpt = 0; i < this.nb_questions && cpt < 50;) {
			taux = choice([randint(1,9)*10,randint(1,9)]);
			switch (liste_type_de_questions[i]){
				case 'coef+' :
				texte = `Augmenter de $${taux}~\\%$ revient à multiplier par...`;
				coeff = tex_prix(calcul(1+taux/100));
				texte_corr = `Augmenter de $${taux}~\\%$ revient à multiplier par ${coeff} car $100~\\% + ${taux}~\\% = ${100+taux}~\\%$.`;
				break;
				case 'coef-' :
				texte = `Diminuer de $${taux}~\\%$ revient à multiplier par...`;
				coeff = tex_prix(calcul(1-taux/100));
				texte_corr = `Diminuer de $${taux}~\\%$ revient à multiplier par ${coeff} car $100~\\% - ${taux}~\\% = ${100-taux}~\\%$.`;
				break;
				case 'taux+' :
				coeff = tex_nombrec(1+taux/100);
				texte = `Multiplier par ${coeff} revient à...`;
				texte_corr = `Multiplier par ${coeff} revient à augmenter de $${taux}~\\%$ car $${coeff} = ${100+taux}~\\% = 100~\\% + ${taux}~\\%$.`;
				break;
				case 'taux-' :
				coeff = tex_nombrec(1-taux/100);
				texte = `Multiplier par ${coeff} revient à...`;
				texte_corr = `Multiplier par ${coeff} revient à diminuer de $${taux}~\\%$ car $${coeff} = ${100-taux}~\\% = 100~\\% - ${taux}~\\%$.`;
				break;
			}
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Déterminer le coefficient\n2 : Exprimer une variation en pourcentage\n3 : Mélange des 2 types de questions'];
}

/**
* Banque de problèmes utilisant le théorème de Thalès et différentes propriétés de géométrie
* @Auteur Rémi Angot
* 3G20-1
*/
function Problemes_Thales(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Problèmes avec le théorème de Thalès";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let texte='';
		let texte_corr='';
		let type_de_questions = randint(1,2);
		let A,B,C,D,M,N,x,k,y,p,p2,codage1,codage2,codage3,codage4,sMN,sBD,sCote,texte1,texte2,texte3,texte4,labels,BC,BD,MN
		

			switch (type_de_questions){
				case 1 :
				x = randint(6,10);
				k = calcul(randint(12,19)/10);
				y = calcul(randint(30,50)/10);
				[A,B,C,D,E]=creerNomDePolygone(5)
				texte = `On sait que $${A}${E}=${tex_nombre(x)}$ cm ; $${A}${D}=${tex_nombrec(k*x)}$ cm et $${E}${B}=${tex_nombre(y)}$ cm.<br>`;
				texte += `Calculer la valeur exacte de $${D}${C}$.`
				if (sortie_html) {
					// Pour le svg toutes les longueurs sont multipliées par 20
					let fig1 = `<div><svg width="450" height="300" viewBox="-40 -40 450 300" xmlns="http://www.w3.org/2000/svg">
					  <polygon points="0,0 ${calcul(k*x*20)},0 ${calcul(k*x*20)},${calcul(k*y*20)}  " fill="none" stroke="black" />
					  <line x1="${calcul(x*20)}" y1="0" x2="${calcul(x*20)}" y2="${calcul(y*20)}" stroke="black" /> //[BE]
					  <polyline points="${calcul(x*20-10)},0 ${calcul(x*20-10)},10 ${calcul(x*20)},10" fill="none" stroke="black" />  //Angle droit en E
					  <polyline points="${calcul(k*x*20-10)},0 ${calcul(k*x*20-10)},10 ${calcul(k*x*20)},10" fill="none" stroke="black" />  //Angle droit en D
					  <text x="-10" y="-10" text-anchor="middle" alignment-baseline="central">${A}</text> 
					  <text x="${calcul(x*20)}" y="-10" text-anchor="middle" alignment-baseline="central">${E}</text> 
					  <text x="${calcul(x*20)}" y="${calcul(y*20+10)}" text-anchor="middle" alignment-baseline="central">${B}</text> 
					  <text x="${calcul(k*x*20+10)}" y="-10" text-anchor="middle" alignment-baseline="central">${D}</text>
					  <text x="${calcul(k*x*20+10)}" y="${calcul(k*y*20+10)}" text-anchor="middle" alignment-baseline="central">${C}</text>
					</svg></div>`

					let fig2 = `<div><svg width="450" height="300" viewBox="-40 -260 450 300" xmlns="http://www.w3.org/2000/svg">
					  <polygon points="0,0 ${calcul(k*x*20)},0 ${calcul(k*x*20)},${calcul(-k*y*20)}  " fill="none" stroke="black" />
					  <line x1="${calcul(x*20)}" y1="0" x2="${calcul(x*20)}" y2="${calcul(-y*20)}" stroke="black" /> //[BE]
					  <polyline points="${calcul(x*20-10)},0 ${calcul(x*20-10)},-10 ${calcul(x*20)},-10" fill="none" stroke="black" />  //Angle droit en E
					  <polyline points="${calcul(k*x*20-10)},0 ${calcul(k*x*20-10)},-10 ${calcul(k*x*20)},-10" fill="none" stroke="black" />  //Angle droit en D
					  <text x="-10" y="-10" text-anchor="middle" alignment-baseline="central">${A}</text> 
					  <text x="${calcul(x*20)}" y="10" text-anchor="middle" alignment-baseline="central">${E}</text> 
					  <text x="${calcul(x*20)}" y="${calcul(-y*20-10)}" text-anchor="middle" alignment-baseline="central">${B}</text> 
					  <text x="${calcul(k*x*20+10)}" y="10" text-anchor="middle" alignment-baseline="central">${D}</text>
					  <text x="${calcul(k*x*20+10)}" y="${calcul(-k*y*20-10)}" text-anchor="middle" alignment-baseline="central">${C}</text>
					</svg></div>`					

					texte += choice([fig1,fig2])

					

				} else {
					let fig1 = `\\begin{tikzpicture}[scale=.6]
\\draw (0,0)--(${calcul(k*x)},0)--(${calcul(k*x)},${-k*y})--cycle;
\\draw (${x},0)--(${x},${-y});
\\draw (${x},0) rectangle ++(-.5,-.5);
\\draw (${calcul(k*x)},0) rectangle ++(-.5,-.5);
\\node [above left] at (0,0) {${A}};
\\node [above] at (${x},0) {${E}};
\\node [above right] at (${k*x},0) {${D}};
\\node [below right] at (${k*x},${-k*y}) {${C}};
\\node [below] at (${x},${-y}) {${B}};
\\end{tikzpicture}`

				let fig2 = `\\begin{tikzpicture}[scale=.6]
\\draw (0,0)--(${calcul(k*x)},0)--(${calcul(k*x)},${k*y})--cycle;
\\draw (${x},0)--(${x},${y});
\\draw (${x},0) rectangle ++(.5,.5);
\\draw (${calcul(k*x)},0) rectangle ++(.5,.5);
\\node [below left] at (0,0) {${A}};
\\node [below] at (${x},0) {${E}};
\\node [below right] at (${k*x},0) {${D}};
\\node [above right] at (${k*x},${k*y}) {${C}};
\\node [above] at (${x},${y}) {${B}};
\\end{tikzpicture}`

				texte += '<br>'+choice([fig1,fig2])

				}
					
				texte_corr = `Les droites $(${E}${B})$ et $(${D}${C})$ sont perpendiculaires à la même droite $(${A}${D})$, elles sont donc parallèles entre elles.`
				texte_corr += `<br>De plus les points $${A}$, $${E}$, $${D}$  et $${A}$, $${B}$, $${C}$ sont alignés dans cet ordre donc d'après le théorème de Thalès on a :`				
				texte_corr += `<br><br>$\\dfrac{${A}${E}}{${A}${D}}=\\dfrac{${E}${B}}{${D}${C}}=\\dfrac{${A}${B}}{${A}${C}}$`
				texte_corr += `<br><br>$\\dfrac{${tex_nombre(x)}}{${tex_nombrec(k*x)}}=\\dfrac{${tex_nombre(y)}}{${D}${C}}$`
				texte_corr += `<br><br>$${D}${C}=\\dfrac{${tex_nombrec(k*x)}\\times${tex_nombre(y)}}{${tex_nombre(x)}}=${tex_nombrec(k*y)}$`
				break;


				case 2 : 
					let [nomA,nomB,nomC,nomD] = creerNomDePolygone(4,['M','N'])
					BC = randint(2,6)
					BD = 2*BC
					MN = calcul(BD*choice([0.2,0.3,0.4]))
					A = point(0,4,nomA,'above')
					B = point(7,4,nomB,'above')
					C = point(7,0,nomC,'below')
					D = point(0,0,nomD,'below')
					p = polygone(A,B,C,D)
					codage1 = codageAngleDroit(D,A,B)
					codage2 = codageAngleDroit(A,B,C)
					codage3 = codageAngleDroit(B,C,D)
					codage4 = codageAngleDroit(C,D,A)
					M = pointSurSegment(A,B,longueur(A,B)/3,'M','above')
					N = pointSurSegment(A,D,longueur(A,D)/3,'N','left')
					sMN = segment(M,N)
					sBD = segment(B,D)
					sCote = segment(point(N.x-1.3,N.y),point(D.x-1.3,D.y))
					sCote.styleExtremites='<->'
					texte1 = texteParPoint('?',milieu(point(N.x-1.5,N.y),point(D.x-1.5,D.y)),'gauche')
					texte2 = texteSurSegment(nombre_avec_espace(BD)+' cm',B,D)
					texte3 = texteSurSegment(nombre_avec_espace(MN)+' cm',M,N)
					texte4 = texteSurSegment(nombre_avec_espace(BC)+' cm',B,C)

					labels = labelPoint(M,N,A,B,C,D)

					texte = `Sur la figure ci-dessous $${nomA+nomB+nomC+nomD}$ est un rectangle et $(MN)$ est parallèle à la diagonale $(${nomB+nomD})$.`
					texte += `<br>Calculer la longueur $${nomD+'N'}$ au millimètre près.<br><br>`
					texte += mathalea2d({
						xmin : -2,
						xmax : 9,
						ymin : -1.5,
						ymax : 5,
						scale : .8
					}, p,codage1,codage2,codage3,codage4,sMN,sBD,sCote,texte1,texte2,texte3,texte4,labels)

					texte_corr = `Dans le triangle $${nomA+nomB+nomD}$, $M$ est un point de $[${nomA+nomB}]$, $N$ est un point de $[${nomA+nomD}]$ et $(MN)$ est parallèle à $(${nomB+nomD})$ donc d'après le théorème de Thalès on a : `
					texte_corr += `<br><br> $${tex_fraction(nomA+'M',nomA+nomB)}=${tex_fraction(nomA+'N',nomA+nomD)}=${tex_fraction('MN',nomB+nomD)}$`
					texte_corr += `<br><br> $${tex_fraction(nomA+'M',nomA+nomB)}=${tex_fraction(nomA+'N',BC)}=${tex_fraction(tex_nombre(MN),tex_nombre(BD))}$`
					texte_corr += `<br><br> $${nomA}N = ${tex_fraction(BC+'\\times'+tex_nombre(MN),BD)}=${tex_nombre(arrondi(calcul(BC*MN/BD),1))}$ cm`
					texte_corr += `<br><br> Les points $${nomA}$, $N$ et $${nomD}$ sont alignés dans cet ordre donc $N${nomD}=${nomA+nomD}-${nomA}N= ${BC}-${tex_nombre(arrondi(calcul(BC*MN/BD),1))}=${tex_nombre(arrondi(calcul(BC-BC*MN/BD),1))}$ cm.`
				break;
				}
			
	this.liste_questions[0]=texte;
	this.liste_corrections[0]=texte_corr;
	liste_de_question_to_contenu(this);
	// this.besoin_formulaire_numerique = ['Type de questions',2,"1 : Donner l'égalité\n2 : Compléter une égalité avec une addition ou une soustraction"];
	// this.besoin_formulaire2_case_a_cocher = ['Sans figures']
	}
}
/**
 * 3G23 reconnaitre des triangles égaux
 * @author Jean-Claude Lhote et Sébastien Lozano
 */
function TrianglesSemblables() {
	'use strict'
	Exercice.call(this)
	this.beta = false;
	this.titre = "Reconnaître des triangles semblables dans différentes configurations";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.nouvelle_version = function(numero_de_l_exercice){
		let coeff=50
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let texte='';
		let texte_corr='';
		let type_de_questions = randint(1,1);
		switch (type_de_questions){
			case 1 :
				let trouve=false,aireABC,A,B,C,M,p,q,r,s,X,G,Gq,nom1,grid;
				// on génère le triangle ABC avec une contrainte sur son aire
				while (!trouve) {
				A=point(choice([0,3]),choice([0,3]),'A'); // le point A !
				B=point(choice([6,9]),choice([6,9]),'B'); // le point B !
				C=rotation(B,A,90,'C'); // le point C à partir de B par rotation autour de A!
				C.x+=choice([0,3,6]); // on décale l'abscise de C de 0, 3 ou 6 !
				C.y+=choice([-3,0,3]); // on décale l'abscise de C de -3, 0 ou 3 !
				p=polygone(A,B,C); // on trace le polygone ABC
				aireABC=aireTriangle(p); // Je savais bien que cette formule servirait un jour !
				if (aireABC<11&&aireABC>5) trouve=true;
				};
				G=barycentre(p); // le barycentre de ABC
				let angleChoisi1 = choice([0,90,270]); 
				p=rotation(p,G,angleChoisi1); // on tourne ABC de façon aléatoire autour de son barycentre
				p.couleurDeRemplissage='gray';//remplissage de ABC
				p.opaciteDeRemplissage=0.2;//0.5;//remplissage de ABC
				nom1=nommePolygone(p,'ABC',0.4); // on  nomme ABC en plaçant A,B et C à 0,4
				grid=grille(-3,-3,27,18, 'gray',0.4,1); // on trace une grille
				M=point(9,12); // un point M fixe pour tourner autour				
				q=rotation(p,M,90); // on fait tourner ABC autour de M de 90°
				// on a besoin de récupérer le polygone non tracé
				let q_non_trace = polygone(q.listePoints);
				Gq=barycentre(q); // on construit son barycentre
				//let angleChoisi2 = 270; 
				let angleChoisi2 = choice([0,90,180,270]); 
				r=rotation(q,Gq,angleChoisi2); // on fait tourner q encore autour de son barycentre
				X=milieu(r.listePoints[0],r.listePoints[1]); // on place le milieu des deux premiers points de la figure obtenue qui sont les images des points A et B initiaux	
				s=rotation(r,X,180); // on fait topurner r autour du milieu des deux extremites du plus grand côté
				r.couleurDeRemplissage='red'; // solution 1 en rouge
				r.opaciteDeRemplissage=0.2;//0.5; // 
				s.couleurDeRemplissage='blue'; //solution 2 en bleu
				s.opaciteDeRemplissage=0.2;//0.5; //
				// mes ajouts par rapport à la figure de JC				
				// on fixe une place pour D et E
				let D = r.listePoints[0];
				D.nom='D';
				let E = r.listePoints[1];
				E.nom='E';
				// on crée un tableau avec les noms proposé pour les points				
				let tabPointsNames= ['F','G','H','I'];				
				// on mélange le tableau 
				tabPointsNames=shuffle(tabPointsNames);
				//on place les deux solutions
				let I=r.listePoints[2];
				//I.nom='I';
				I.nom=tabPointsNames[0];
				let I1=rotation(I,X,180)
				//I1.nom='I1';
				I1.nom=tabPointsNames[1];
				// on place les mauvaises solutions
				let F = point(I1.x+1,I1.y+1);
				//F.nom='F';
				F.nom=tabPointsNames[2];
				let L = point(I.x-1,I.y-3);
				//L.nom='L';
				L.nom=tabPointsNames[3];
				//on trace le segment [DE] en pointillés pour que la figure soit plus lisible
				let sgmt_DE =  segment(D,E,'blue');
				sgmt_DE.pointilles = true;
				sgmt_DE.epaisseur=1.5;

				// on prépare la fenetre mathalea2d
				let fenetreMathalea2D = {xmin:-3,ymin:-3,xmax:27,ymax:18,pixelsParCm:20,scale:0.5}

				// on prépare les corrections
				let centre_rot = {
					sol1:pointIntersectionDD(droite(p.listePoints[1],E),droite(D,p.listePoints[0])),
					sol2:pointIntersectionDD(droite(E,p.listePoints[0]),droite(p.listePoints[1],D))
				};
				let vect_trans = {
					sol1:vecteur(p.listePoints[1],E),
					sol2:vecteur(p.listePoints[1],D)
				};
				let transformationAnimee = {
					sol1:``,
					//nature_sol1:``,
					sol2:``,
					//nature_sol2:``
				};
				// pour construire les droites et les centres passant par les centres de rotations
				let d,d1,d2,d3,d4,d5,J1,J2;
				switch (angleChoisi2) {
					case 0:
						transformationAnimee.sol1=rotationAnimee(p,M,90,'begin="0s" dur="4s" repeatCount="indefinite"');
						//transformationAnimee.nature_sol1=`rotation`;
						// la 1ere compo
						d= droite(M,Gq);
						d1=rotation(d,M,-45);
						d2=rotation(d,Gq,0);
						J1=pointIntersectionDD(d1,d2); // centre de la composée, ici l'angle vaut 90
						//2eme compo
						d3=droite(J1,X);
						d4=rotation(d3,J1,-45);
						d5=rotation(d3,X,90);
						J2=pointIntersectionDD(d4,d5);// centre après la seconde composition angle 270 à 2pi près						
						transformationAnimee.sol2=rotationAnimee(p,J2,-90,'begin="0s" dur="4s" repeatCount="indefinite"');
						//transformationAnimee.nature_sol2=`rotation`;
						break;
					case 90:						
						transformationAnimee.sol1=rotationAnimee(p,centre_rot.sol1,180,'begin="0s" dur="4s" repeatCount="indefinite"');
						//transformationAnimee.nature_sol1=`rotation`;
						transformationAnimee.sol2=translationAnimee(p,vect_trans.sol2,'begin="0s" dur="4s" repeatCount="indefinite"');
						//transformationAnimee.nature_sol2=`translation`;
						break;
					case 180:
						// la 1ere compo
						d= droite(M,Gq);
						d1=rotation(d,M,-45);
						d2=rotation(d,Gq,90);
						J1=pointIntersectionDD(d1,d2); // centre de la composée, ici l'angle vaut 270 à 2pi près
						//2eme compo
						d3=droite(J1,X);
						d4=rotation(d3,J1,-135);
						d5=rotation(d3,X,90);
						J2=pointIntersectionDD(d4,d5);// centre après la seconde composition angle 450 à 2pi près						
						transformationAnimee.sol1=rotationAnimee(p,J1,-90,'begin="0s" dur="4s" repeatCount="indefinite"');
						//transformationAnimee.nature_sol1=`rotation`;
						transformationAnimee.sol2=rotationAnimee(p,J2,90,'begin="0s" dur="4s" repeatCount="indefinite"');
						//transformationAnimee.nature_sol2=`rotation`;
						break;
					case 270:
						transformationAnimee.sol1=translationAnimee(p,vect_trans.sol1,'begin="0s" dur="4s" repeatCount="indefinite"');
						//transformationAnimee.nature_sol1=`translation`;						
						transformationAnimee.sol2=rotationAnimee(p,centre_rot.sol2,180,'begin="0s" dur="4s" repeatCount="indefinite"');
						//transformationAnimee.nature_sol2=`rotation`;
						break; 
				}
				// DE = AB
				let seg_DE_corr = segment(D,E,'blue');
				seg_DE_corr.epaisseur = 2;
				let seg_AB_corr = segment(p.listePoints[0],p.listePoints[1],'blue');
				seg_AB_corr.epaisseur = 2;
				//DI = AC ou EI1 = AC
				let seg_DI_corr = segment(D,I,'red');
				let seg_EI1_corr = segment(E,I1,'red');
				seg_DI_corr.epaisseur = 2;
				seg_EI1_corr.epaisseur = 2;
				let seg_AC_corr = segment(p.listePoints[0],p.listePoints[2],'red');
				seg_AC_corr.epaisseur = 2;
				//EI = BC ou DI1 = BC
				let seg_EI_corr = segment(E,I,'green');
				let seg_DI1_corr = segment(D,I1,'green');
				seg_EI_corr.epaisseur = 2;
				seg_DI1_corr.epaisseur = 2;
				let seg_BC_corr = segment(p.listePoints[1],p.listePoints[2],'green');				
				seg_BC_corr.epaisseur = 2;
				// angle ABC = DEI ou ABC = EDI1
				let ang_ABC = angleOriente(p.listePoints[0],p.listePoints[1],p.listePoints[2]);
				let ang_DEI = angleOriente(D,E,I);
				let ang_EDI1 = angleOriente(E,D,I1);
				// angle BCA = EID ou  BCA = DI1E
				let ang_BCA = angleOriente(p.listePoints[1],p.listePoints[2],p.listePoints[0]);
				let ang_EID = angleOriente(E,I,D);
				let ang_EI1D = angleOriente(E,I1,D);
				// angle CAB = IDE ou CAB = I1ED
				let ang_CAB = angleOriente(p.listePoints[2],p.listePoints[0],p.listePoints[1]);
				let ang_IDE = angleOriente(I,D,E);
				let ang_I1ED = angleOriente(I1,E,D);				

				let codages_correction = {
					sol1:[
						// les segments						
						seg_AB_corr,
						seg_DE_corr,						
						codeSegments('×', 'blue', p.listePoints[0], p.listePoints[1], D,E ),
						seg_AC_corr,
						seg_DI_corr,
						codeSegments('||', 'red', p.listePoints[0], p.listePoints[2], D,I ),
						seg_BC_corr,
						seg_EI_corr,						
						codeSegments('O', 'green', p.listePoints[1], p.listePoints[2], I,E ),
						//les angles
						arc(pointSurSegment(p.listePoints[1], p.listePoints[0], 0.8), p.listePoints[1], ang_ABC,true,'red'),
						arc(pointSurSegment(E, D, 0.8), E, ang_DEI,true,'red'),
						arc(pointSurSegment(p.listePoints[2], p.listePoints[1], 0.8), p.listePoints[2], ang_BCA,true,'blue'),
						arc(pointSurSegment(I, E, 0.8), I, ang_EID,true,'blue'),
						arc(pointSurSegment(p.listePoints[0], p.listePoints[2], 0.8), p.listePoints[0], ang_CAB,true,'green'),
						arc(pointSurSegment(D, I, 0.8), D, ang_IDE,true,'green')
					],
					sol2:[
						//les segments
						seg_AB_corr,
						seg_DE_corr,						
						codeSegments('×', 'blue', p.listePoints[0], p.listePoints[1], D,E ),
						seg_BC_corr,
						seg_DI1_corr,
						codeSegments('O', 'green', p.listePoints[1], p.listePoints[2], D,I1 ),
						seg_AC_corr,
						seg_EI1_corr,
						codeSegments('||', 'red', p.listePoints[0], p.listePoints[2], E,I1 ),
						// les angles
						arc(pointSurSegment(p.listePoints[1], p.listePoints[0], 0.8), p.listePoints[1], ang_ABC,true,'red'),
						arc(pointSurSegment(D, E, 0.8), D, ang_EDI1,true,'red'),
						arc(pointSurSegment(p.listePoints[2], p.listePoints[1], 0.8), p.listePoints[2], ang_BCA,true,'blue'),
						arc(pointSurSegment(I1, E, 0.8), I1, ang_EI1D,true,'blue'),
						arc(pointSurSegment(p.listePoints[0], p.listePoints[2], 0.8), p.listePoints[0], ang_CAB,true,'green'),
						arc(pointSurSegment(E, I1, 0.8), E, ang_I1ED,true,'green')
					]
				}

				// on crée un objet pour stocker les figures et les corrections
				let figures = {
					enonce:`
						Où placer le point M pour que les triangles ABC et DEM soient égaux ? 
						<br>En F ? En G? En H ? En I ?
						<br>
						${mathalea2d(
							fenetreMathalea2D,
							p,
							nom1,
							grid,
							tracePoint(D,E,I,I1,F,L),
							labelPoint(D,E,I,I1,F,L),
							sgmt_DE,
							//r,
							//s
						)}`,
					corr_solution1:`
						Les triangles $ABC$ et $DE${I.nom}$ ont les mêmes longueurs et les mêmes angles.
						<br> ${texte_en_couleur(`Donc le point ${I.nom} est un point qui convient`)}
						<br>
						${mathalea2d(
							fenetreMathalea2D,
							p,
							nom1,
							grid,
							tracePoint(D,E,I,I1,F,L),
							labelPoint(D,E,I,I1,F,L),
							sgmt_DE,
							r,
							//s,
							codages_correction.sol1
						)}`,
					corr_solution2:`
						Les triangles $ABC$ et $DE${I1.nom}$ ont les mêmes longueurs et les mêmes angles.		
						<br> ${texte_en_couleur(`Donc le point ${I1.nom} est un point qui convient`)}
						<br>
						${mathalea2d(
							fenetreMathalea2D,
							p,
							nom1,
							grid,
							tracePoint(D,E,I,I1,F,L),
							labelPoint(D,E,I,I1,F,L),
							sgmt_DE,
							//r,
							s,
							codages_correction.sol2
						)}`,
					corr_animmee_sol1:`
						Les triangles $ABC$ et $DE${I.nom}$ ont les mêmes longueurs et les mêmes angles.						
						<br> ${texte_en_couleur(`Donc le point ${I.nom} est un point qui convient`)}
						<br>						
						${mathalea2d(
							fenetreMathalea2D,
							p,
							nom1,
							grid,
							//tracePoint(D,E,I,I1,F,L),
							tracePoint(I1,F,L),
							//labelPoint(D,E,I,I1,F,L),
							labelPoint(I1,F,L),
							nommePolygone(r,'DE'+I.nom,0.4),
							//sgmt_DE,
							r,
							transformationAnimee.sol1,
							codages_correction.sol1
						)}`,
					corr_animmee_sol2:`
						Les triangles $ABC$ et $DE${I1.nom}$ ont les mêmes longueurs et les mêmes angles.
						<br> ${texte_en_couleur(`Donc le point ${I1.nom} est un point qui convient`)}
						<br>
						Une solution est donc le point ${I1.nom}
						<br>
						${mathalea2d(
							fenetreMathalea2D,
							p,
							nom1,
							grid,
							//tracePoint(D,E,I,I1,F,L),
							tracePoint(I,F,L),
							//labelPoint(D,E,I,I1,F,L),
							labelPoint(I,F,L),
							nommePolygone(s,'DE'+I1.nom,0.4),
							//sgmt_DE,
							//r,
							s,
							transformationAnimee.sol2,
							codages_correction.sol2
						)}`
				}
				//texte=mathalea2d({xmin:-3,ymin:-3,xmax:27,ymax:18,pixelsParCm:20,scale:0.5},p,nom1,grid,r,s)
				texte = `${figures.enonce}`;
				if (this.beta) {
					texte += `<br>${texte_gras(`===== Première solution ======`)}<br>${figures.corr_animmee_sol1}`;
					texte += `<br><br>${texte_gras(`===== Seconde solution ======`)}<br>${figures.corr_animmee_sol2}`;
				} else {
					texte_corr += `<br>${texte_gras(`===== Première solution ======`)}<br>${figures.corr_animmee_sol1}`;
					texte_corr += `<br><br>${texte_gras(`===== Seconde solution ======`)}<br>${figures.corr_animmee_sol2}`;
				}
				this.liste_questions[0]=texte;
				this.liste_corrections[0]=texte_corr;
				liste_de_question_to_contenu(this);
				break;
			
		}
	}
}

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @Auteur Rémi Angot
 * Référence 3F10
*/
function Image_antecedent_depuis_tableau_ou_fleche() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Lectures d'images et d'antécédents depuis un tableau de valeurs";
  this.consigne = "";
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nb_questions = 4;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
	let a = randint(-20,20);
	let b = randint(-20,20,[a]);
	let c = randint(-20,20,[a,b]);
	let d = randint(-20,20,[a,b,c]);
	let e = randint(-20,20,[a,b,c,d]);
	let f = randint(-20,20,[a,b,c,d,e]);
	// a->b ; c->d ; e->d ; d->a ; f->c
	let ligneX = [a,c,e,d,f]
	let ligneY = [b,d,d,a,c]
	shuffle2tableaux(ligneX,ligneY) // mélange les 2 lignes de la même manière
	this.introduction = "Voici un tableau de valeurs d'une fonction $f$ : "
	this.introduction += '<br><br>'
	this.introduction += `$\\def\\arraystretch{1.5}\\begin{array}{|l|c|c|c|c|c|}
	\\hline
	x & ${ligneX[0]} & ${ligneX[1]} & ${ligneX[2]} & ${ligneX[3]} & ${ligneX[4]} \\\\
	\\hline
	f(x) & ${ligneY[0]} & ${ligneY[1]} & ${ligneY[2]} & ${ligneY[3]} & ${ligneY[4]} \\\\
	\\hline
	\\end{array}
	$
	`
	let texte = `Quelle est l'image de $${a}$ par la fonction $f$ ?`
	let texte_corr = `L'image de $${a}$ par la fonction $f$ est $${b}$, on note $f(${a})=${b}$.`
	this.liste_questions.push(texte)
	this.liste_corrections.push(texte_corr)

	texte = `Quelle est l'image de $${c}$ par la fonction $f$ ?`
	texte_corr = `L'image de $${c}$ par la fonction $f$ est $${d}$, on note $f(${c})=${d}$.`
	this.liste_questions.push(texte)
	this.liste_corrections.push(texte_corr)

	let texte3 = `Déterminer le(s) antécédent(s) de $${a}$ par la fonction $f$.`
	let texte_corr3 = `$${a}$ a un seul antécédent par la fonction $f$ qui est $${d}$, on note $f(${d})=${a}$.`
	
	let texte4 = `Déterminer le(s) antécédent(s) de $${d}$ par la fonction $f$.`
	let texte_corr4 = `$${d}$ a deux antécédents par la fonction $f$ qui sont $${c}$ et $${e}$, on note $f(${c})=f(${e})=${d}$.`
	
	if (choice([true,false])) { // Une fois sur 2 on inverse les questions 3 et 4
		this.liste_questions.push(texte3)
		this.liste_corrections.push(texte_corr3)	
		this.liste_questions.push(texte4)
		this.liste_corrections.push(texte_corr4)	
	} else {
		this.liste_questions.push(texte4)
		this.liste_corrections.push(texte_corr4)	
		this.liste_questions.push(texte3)
		this.liste_corrections.push(texte_corr3)
	}

	texte = `Recopier et compléter : $f(${c})=\\ldots$`
	texte_corr = `$f(${c})=${d}$`
	this.liste_questions.push(texte)
	this.liste_corrections.push(texte_corr)

	texte = `Recopier et compléter : $f(\\ldots)=${c}$`
	texte_corr = `$f(${f})=${c}$`
	this.liste_questions.push(texte)
	this.liste_corrections.push(texte_corr)
	
	liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}


/** 
 * * Equations résolvantes pour le théorème de Thalès
 * * 3L13-2
 * @author Sébastien Lozano
 */

function Eq_resolvantes_Thales(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;	
	this.sup=1;
	if (this.debug) {
		this.nb_questions = 4;
	} else {
		this.nb_questions = 2;
	};
	this.sup2=false;	

	this.titre = "Equations résolvantes pour le théorème de Thalès";	
	this.consigne = `Résoudre les équations suivantes.`;	
	
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//this.nb_questions_modifiable = false;
	sortie_html? this.spacing = 2.5 : this.spacing = 1.5; 
	sortie_html? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

	let type_de_questions_disponibles;	

	this.nouvelle_version = function(numero_de_l_exercice){
		if (this.debug) {
			type_de_questions_disponibles = [0,1,2,3];			
		} else {
     		 type_de_questions_disponibles = shuffle([choice([0,1]),choice([2,3])]);      			
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		//let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		
		
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {

			// on a besoin d'un coeff pour le type de nombres
			let coeff;
			let nb_alea;
			let c_temp_case_3;
			while (c_temp_case_3%2 != 0 || c_temp_case_3%5 != 0) {
				c_temp_case_3 = randint(11,99)
			};
			this.sup = Number(this.sup); // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
			switch (this.sup) {
				case 1://entiers          
					coeff=[1,1,1];
					nb_alea=[randint(2,9),randint(2,9),randint(2,9,[3,6,7,9])];
					break;
				case 2://relatifs            
					coeff=[choice([1,-1]),choice([1,-1]),choice([1,-1])];
					nb_alea=[randint(2,9),randint(2,9),randint(1,9,[3,6,7,9])];
					break;
				case 3://décimaux            
					coeff=[0.1,0.1,0.1];
					nb_alea=[randint(11,99),randint(11,99),c_temp_case_3];
					break;
			};

			let params = {
				// a:tex_nombre(calcul(nb_alea[0]*coeff[0])),
				// b:tex_nombre(calcul(nb_alea[1]*coeff[1])),
				// c:tex_nombre(calcul(nb_alea[2]*coeff[2])),
				a:calcul(nb_alea[0]*coeff[0]),
				b:calcul(nb_alea[1]*coeff[1]),
				c:calcul(nb_alea[2]*coeff[2]),
				inc:choice(['x','y','GO','AB','z','GA','BU','ZO','ME'])
			}

			// pour les situations, autant de situations que de cas dans le switch !
			let situations = [
				{//case 0 --> x/b=a/c --> cx= ab
					eq:`\\dfrac{${params.inc}}{${tex_nombre(params.b)}}=\\dfrac{${tex_nombre(params.a)}}{${tex_nombre(params.c)}}`,
					a:params.a,
					b:params.b,
					c:params.c,
					inc:params.inc 
				},
				{//case 1 --> a/c=x/b --> cx=ab
					eq:`\\dfrac{${tex_nombre(params.a)}}{${tex_nombre(params.c)}}=\\dfrac{${params.inc}}{${tex_nombre(params.c)}}`,
					a:params.a,
					b:params.b,
					c:params.c,
					inc:params.inc 
				},
				{//case 2 -->b/x=c/a --> cx = ab
					eq:`\\dfrac{${tex_nombre(params.b)}}{${params.inc}}=\\dfrac{${tex_nombre(params.c)}}{${tex_nombre(params.a)}}`,
					a:params.a,
					b:params.b,
					c:params.c,
					inc:params.inc 
				},
				{//case 3 -->c/a=b/x --> cx = ab 
					eq:`\\dfrac{${tex_nombre(params.c)}}{${tex_nombre(params.a)}}=\\dfrac{${tex_nombre(params.b)}}{${params.inc}}`,
					a:params.a,
					b:params.b,
					c:params.c,
					inc:params.inc  
				},
			];

			let enonces = [];
			for (let k=0;k<situations.length;k++) {
				enonces.push({
					enonce:`
						$${situations[k].eq}$
					`,
					question:``,
					correction:`
						$${situations[k].eq}$<br>
						${texte_en_couleur_et_gras(`Les produits en croix sont égaux.`)}<br>
						$${tex_nombre(situations[k].c)}\\times ${situations[k].inc} = ${tex_nombre(situations[k].a)}\\times ${tex_nombre(situations[k].b)}$<br>
						${texte_en_couleur_et_gras(`On divise les deux membres par ${tex_nombre(situations[k].c)}`)}.<br>
						$\\dfrac{${tex_nombre(situations[k].c)}\\times ${situations[k].inc}}{${tex_nombre(situations[k].c)}}= \\dfrac{${tex_nombre(situations[k].a)}\\times ${tex_nombre(situations[k].b)}}{${tex_nombre(situations[k].c)}}$<br>
						${texte_en_couleur_et_gras(`On simplifie et on calcule.`)}<br>

						$${situations[k].inc}=${tex_nombre(calcul(Number(situations[k].b)*Number(situations[k].a)/Number(situations[k].c)))}$

					`
				});
			};
            
            // autant de case que d'elements dans le tableau des situations
			switch (liste_type_de_questions[i]){
				case 0 : 
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
						texte += `             `
						texte_corr = ``;	
					} else {
						texte_corr = `${enonces[0].correction}`;
					};
          			break;	
        		case 1 : 
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
						texte_corr = ``;	
					} else {
						texte_corr = `${enonces[1].correction}`;
					};
          			break;
        		case 2 : 
					texte = `${enonces[2].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
						texte_corr = ``;	
					} else {
						texte_corr = `${enonces[2].correction}`;
					};
          			break;				
        		case 3 : 
					texte = `${enonces[3].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
						texte_corr = ``;	
					} else {
						texte_corr = `${enonces[3].correction}`;
					};
					break;				
 			
			};			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);

	}
	this.besoin_formulaire_numerique = ['Type de nombres',3,"1 : Entiers naturels\n2 : Entiers relatifs\n3 : Décimaux"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec décimaux.",false]	
};

/** 
 * * Calcul mental autour des identités remarquables
 * * numéro de l'exo ex : 3N10-1
 * @author Sébastien Lozano
 */

function identites_calculs(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;	
	this.sup=1;
	if (this.debug) {
		this.nb_questions = 3;	
	} else {
		this.nb_questions = 3;
	};	

	this.titre = "Identités remarquables et calcul mental";	
	this.consigne = `Utilise les identités remarquables pour effectuer les calculs suivants de tête.`;	
	
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//this.nb_questions_modifiable = false;	
	sortie_html? this.spacing = 2.5 : this.spacing = 1.5; 
	sortie_html? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

	let type_de_questions_disponibles;	

	this.nouvelle_version = function(numero_de_l_exercice){
		if (this.debug) {
			type_de_questions_disponibles = [0,1,2];			
		} else {
				switch (Number(this.sup)) {
					case 1 :
						type_de_questions_disponibles = [0,0,0];//shuffle([choice([1,3]),choice([2,3]),0]);      			
						break;
					case 2 :
						type_de_questions_disponibles = [1,1,1];//shuffle([choice([1,3]),choice([2,3]),0]);      			
						break;
					case 3 : 
						type_de_questions_disponibles = [2,2,2];//shuffle([choice([1,3]),choice([2,3]),0]);      			
						break;
					case 4 :
						type_de_questions_disponibles = shuffle([0,1,2]);//shuffle([choice([1,3]),choice([2,3]),0]);      			
						break;
				}
     		 //type_de_questions_disponibles = [0,1,2];//shuffle([choice([1,3]),choice([2,3]),0]);      			
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		//let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		
		
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {


			// pour les situations, autant de situations que de cas dans le switch !
			let situations = [
				{//case 0 -->
				},
				{//case 1 -->
				},
				{//case 2 -->
				},
			];

			let enonces = [];
			for (let k=0;k<situations.length;k++) {
				enonces.push({
					enonce:`
					Type ${k} ${randint(1,999)}				
					`,
					question:``,
					correction:`
					Correction type ${k}
					`
				});
			};
            
            // autant de case que d'elements dans le tableau des situations
			switch (liste_type_de_questions[i]){
				case 0 : // carré d'une somme 
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
						texte += `             `
						texte_corr = ``;	
					} else {
						texte_corr = `${enonces[0].correction}`;
					};
          			break;	
        		case 1 : // carré d'une différence
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
						texte_corr = ``;	
					} else {
						texte_corr = `${enonces[1].correction}`;
					};
          			break;
        		case 2 : // Produit somme différence
					texte = `${enonces[2].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
						texte_corr = ``;	
					} else {
						texte_corr = `${enonces[2].correction}`;
					};
          			break;								
			};			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);

	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Carré d'une somme\n2 : Carré d'une différence\n3 : Produit de la somme et de la différence\n4 : Mélange"];
	//this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
};