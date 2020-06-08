

/**
 * Calculs de probabilités sur une expérience aléatoire à deux épreuves
 * @Auteur Jean-Claude Lhote
 */
function fonctions_probabilite2(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des probabilités dans une expérience aléatoire à deux épreuves";
	this.consigne = "";
	this.nb_questions = 2;
	this.nb_questions_modifiable = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html? this.spacing = 2 : this.spacing = 1.5; 
	sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.sup=1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_index_disponibles=[0,1,2,3];
		let liste_index=combinaison_listes(liste_index_disponibles,this.nb_questions)
		let qualites=[[]];
		let Initiale=[];
		let Couleurs=[`red`,`green`,`blue`,`gray`,`brown`,`orange`,`magenta`,`pink`,`black`,`lightgray`];
		qualites[0]=['à la fraise','à la vanille','à l\'abricot','à la cerise','à la banane'];
		qualites[1]=['trèfle','carreau','coeur','pique'];
		qualites[2]=['rouges','vertes','bleues','noires','blanches'];
		qualites[3]=['gris','cyans','roses','jaunes','violets'];
		qualites[4]=['rouges','verts','bleus','noirs','jaunes'];
		qualites[5]=['rouges','verts','bleus','noirs','blancs'];
		qualites[6]=['rouges','verts','bleus','noirs','jaunes'];
		for (let i = 0,p,q,r,somme1,somme2,quidame,quidam,n=[],m=[],fra1=[],fra2=[],p1=[],p2=[],p3=[],den,trouve,texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) {
			quidame=prenomF();
			quidam=prenomM();
			switch (liste_index[i]) {
				case 0 :
					Initiale[0]=`F`;
					Initiale[1]=`V`;
					Initiale[2]=`A`;
					Initiale[3]=`C`;
					Initiale[4]=`B`;
					p=randint(0,4);
					q=randint(0,4,[p]);
					r=randint(0,4,[p,q]);
					n[p]=randint(2,5);
					n[q]=randint(1,6)+2;
					n[r]=randint(1,3)*2;

										// n[3]=randint(1,4)+2;
					// n[4]=randint(2,5);
					somme1=n[p]+n[q]+n[r];// +n[3]+n[4];
					texte = `Dans le frigo il y a ${somme1} yaourts. ${n[p]} sont ${qualites[0][p]}, ${n[q]} sont ${qualites[0][q]} et ${n[r]} sont ${qualites[0][r]}.<br>`;//  ${n[3]} sont ${qualites[index1][3]} et ${n[4]} sont ${qualites[index1][4]}.<br> `;
					texte += `${quidame} en choisit un au hasard. Son frère ${quidam} en choisit un au hasard à son tour.<br>`;
					texte += num_alpha(0)+` Combien d'issues possède cette experience aléatoire ? donne un exemple d'issue.<br>`
					texte += num_alpha(1)+` Est-ce une expérience en situation d'équiprobabilité ? Justifie.<br>`
					texte += num_alpha(2)+` Calcule la probabilité que ${quidame} et ${quidam} aient choisi tous les deux un yaourt ${qualites[0][p]}.<br>`;
					texte += num_alpha(3)+` Calcule la probabilité qu'ils aient choisi des yaourts aux parfums identiques.<br>`;
					texte += num_alpha(4)+` Calcule la probabilité qu'ils aient choisi des yaourts aux parfums différents.<br>`;
					texte_corr =``;
					texte_corr +=num_alpha(0)+` ${quidame} peut avoir choisi un yaourt ${qualites[0][p]}, ${qualites[0][q]} ou ${qualites[0][r]}. Une fois qu'elle a choisi, et comme il y a au moins 2 yaourts de chaque sorte, ${quidam} a les mêmes 3 possibilités. Il y a donc $3\\times3=9$ issues possibles.<br>`
					texte_corr += `Par exemple : ${quidame} a pris un yaourt ${qualites[0][p]} et ${quidam} un yaourt ${qualites[0][q]}. Ce qu'on peut noter (${Initiale[p]},${Initiale[q]}).<br>`;
					texte_corr += `Les 9 issues sont : `;
					for (const j of [p,q,r])
						for (const k of [p,q,r])
							texte_corr += `(${Initiale[j]},${Initiale[k]}) `;
					texte_corr+=`<br>`
					if (n[0]==n[1]&&n[1]==n[2]) {
						texte_corr += num_alpha(1)+` Comme le nombre de yaourts de chaque sorte est le même, alors ${quidame} a la même probabilité de choisir n'importe quel parfum, mais ensuite son frère aura un yaourt de moins de l'un des parfums. Il est donc moins probable qu'il choisisse le même parfum que sa soeur que l'un des deux autres parfums.<br>`;
						texte_corr += `l\'issue (${Initiale[p]},${Initiale[p]}) est donc moins probable que l'issue (${Initiale[p]},${Initiale[q]}). Ce n'est donc pas une situation d'équiprobabilité.`;
					}
					else {
						texte_corr+=num_alpha(1)+` Comme le nombre de yaourt est différent d'un parfum à l'autre, ${quidame} n'a pas la même probabilité de choisir n'importe quel parfum. On en déduit qu' il est impossible que les issues (${Initiale[p]},${Initiale[p]}), (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}) aient la même probabilité.<br>`;
					}
					texte_corr += num_alpha(2)+` Il y a ${n[p]} yaourts ${qualites[0][p]}, et ${somme1} yaourts en tout, la probabilité que ${quidame} choisisse un yaourt ${qualites[0][p]} est de : $${tex_fraction(n[p],somme1)}${simplification_de_fraction_avec_etapes(n[p],somme1)}$.<br>`;
					texte_corr += `Ensuite il reste ${n[p]-1} yaourts ${qualites[0][p]} pour ${quidam} sur un total de ${somme1-1} yaourts.<br> La probabilité qu'il choisisse à son tour et dans ces conditions ce parfum est de $${tex_fraction(n[p]-1,somme1-1)}${simplification_de_fraction_avec_etapes(n[p]-1,somme1-1)}$.<br>`;
					texte_corr += `La probabilité de l'issue (${Initiale[p]},${Initiale[p]}) est le produit de ces deux probabilités, donc : $${tex_fraction(n[p],somme1)}\\times${tex_fraction(n[p]-1,somme1-1)}=${tex_fraction(n[p]*(n[p]-1),somme1*(somme1-1))}${simplification_de_fraction_avec_etapes(n[p]*(n[p]-1),somme1*(somme1-1))}$.<br>`;
					texte_corr += num_alpha(3)+` a probabilité des issues (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}) peuvent être calculées de la même façon qu'au 3) :<br>`;
					texte_corr += `$${tex_fraction(n[q],somme1)}\\times${tex_fraction(n[q]-1,somme1-1)}=${tex_fraction(n[q]*(n[q]-1),somme1*(somme1-1))}$.<br>`;
					texte_corr += `$${tex_fraction(n[r],somme1)}\\times${tex_fraction(n[r]-1,somme1-1)}=${tex_fraction(n[r]*(n[r]-1),somme1*(somme1-1))}$.<br>`;
					texte_corr += `La probabilité qu'ils choisissent le même parfum est la somme des probabilités des issues (${Initiale[p]},${Initiale[p]}), (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}), soit :<br>`;
					texte_corr += `$${tex_fraction(n[p]*(n[p]-1),somme1*(somme1-1))}+${tex_fraction(n[q]*(n[q]-1),somme1*(somme1-1))}+${tex_fraction(n[r]*(n[r]-1),somme1*(somme1-1))}=${tex_fraction(n[p]*(n[p]-1)+n[q]*(n[q]-1)+n[r]*(n[r]-1),somme1*(somme1-1))}${simplification_de_fraction_avec_etapes(n[p]*(n[p]-1)+n[q]*(n[q]-1)+n[r]*(n[r]-1),somme1*(somme1-1))}$<br>`;
					texte_corr += num_alpha(4)+` choisir des parfums différents est l'événement contraire de l'événement dont on a calculé la probabilité à la question 4).<br>`;
					fra1=fraction_simplifiee(n[p]*(n[p]-1)+n[q]*(n[q]-1)+n[r]*(n[r]-1),somme1*(somme1-1));
					texte_corr += `La probabilité de cet événement est donc : $1-${tex_fraction(fra1[0],fra1[1])}=${tex_fraction(fra1[1],fra1[1])}-${tex_fraction(fra1[0],fra1[1])}=${tex_fraction(fra1[1]-fra1[0],fra1[1])}${simplification_de_fraction_avec_etapes(fra1[1]-fra1[0],fra1[1])}$`;
					break;
				case 1 :
					p=randint(0,3);
					if (randint(0,1)==0) q=32;
					else q=52;
					r=Math.floor(q/33);
					Initiale[0]=choice([`sept`,`huit`,`neuf`,`dix`,`valet`,`roi`,`as`]);
					Initiale[1]=choice([`deux`,`trois`,`quatre`,`cinq`,`six`,`sept`,`huit`,`neuf`,`dix`,`valet`,`roi`,`as`]);
					texte =`On considère l'expérience consistant à tirer deux cartes dans un jeu de ${q} cartes.<br>`;
					texte +=`Partie 1 : On effectue le tirage de la deuxième carte après remise de la première dans le jeu.<br>`;
					texte +=num_alpha(0)+` Quelle est la probabilité de tirer 2 cartes de la même couleur (Rouge/Rouge ou Noire/Noire)?<br>`;
					texte +=num_alpha(1)+` Quelle est la probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r]==`valet`||Initiale[r]==`roi`) texte+=`s`;
					texte +=` ?<br>`;
					texte +=num_alpha(2)+` Quelle est la probabilité de tirer 2 carte de ${qualites[1][p]} ?<br>`;
					texte +=`Partie 2 : On effectue le tirage de la deuxième carte sans remise de la première dans le jeu.<br>`;
					texte +=`	Reprendre les 3 questions de la partie 1 dans cette nouvelle expérience.`
					texte_corr =`Partie 1.<br>	`;
					texte_corr+=num_alpha(0)+` On ne s'intéresse ici qu'au tirage de la deuxième carte. En effet pour réaliser l'événement, il faudra que cette carte soit de la même couleur que la première. Il y a deux couleurs rouge et noire et le nombre de carte rouge est le même que le nombre de carte noire : ${q/2}.<br>`;
					texte_corr +=`	La probabilité que la deuxième carte soit de la même couleur que la première est donc : $${tex_fraction(q/2,q)}=${tex_fraction(1,2)}$.<br>`;
					texte_corr +=num_alpha(1)+` Il y a 4 ${Initiale[r]}`;
					if (Initiale[r]==`valet`||Initiale[r]==`roi`) texte+=`s`;	
					texte_corr +=` dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${Initiale[r]} est donc de $${tex_fraction(4,q)}=${tex_fraction_reduite(4,q)}$.<br>`;
					texte_corr +=`	Comme la deuxième carte est tirée dans le jeu complet (après remise de la première) la probabilité de tirer un ${Initiale[r]} est la même pour cette carte.<br>`;
					texte_corr +=`	La probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r]==`valet`||Initiale[r]==`roi`) texte+=`s`;
					texte_corr +=` est donc : $${tex_fraction_reduite(4,q)}\\times${tex_fraction_reduite(4,q)}=${tex_fraction_reduite(16,q*q)}$.<br>`;
					texte_corr +=num_alpha(2)+` Il y a ${q/4} cartes de ${qualites[1][p]} dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${qualites[1][p]} est donc de $${tex_fraction(q/4,q)}=${tex_fraction(1,4)}$.<br>`;
					texte_corr +=`	Comme la deuxième carte est tirée dans le jeu complet (après remise de la première) la probabilité de tirer un ${qualites[1][p]} est la même pour cette carte.<br>`;								
					texte_corr +=`	La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1,4)}\\times${tex_fraction(1,4)}=${tex_fraction(1,16)}$.<br>`;
					texte_corr +=`Partie 2.<br>`;
					texte_corr+= num_alpha(0)+` On ne s'intéresse ici qu'au tirage de la deuxième carte. En effet pour réaliser l'événement, il faudra que cette carte soit de la même couleur que la première. Il y a maintenant une carte en moins dans la couleur désirée soit  ${q/2-1} et il y a une carte en moins dans le jeu soit ${q-1}.<br>`;
					texte_corr +=`	La probabilité que la deuxième carte soit de la même couleur que la première est donc : $${tex_fraction(q/2-1,q-1)}$.<br>`;
					texte_corr +=num_alpha(1)+` Il y a 4 ${Initiale[r]}`;
					if (Initiale[r]==`valet`||Initiale[r]==`roi`) texte+=`s`;	
					texte_corr +=` dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${Initiale[r]} est donc de $${tex_fraction(4,q)}=${tex_fraction_reduite(4,q)}$.<br>`;
					texte_corr +=`	Pour que l'événement se réalise la deuxième carte est tirée dans les ${q-1} cartes restantes dans lesquelles il manque un ${Initiale[r]}.<br>`;
					texte_corr +=`	La probabilité de tirer un deuxième ${Initiale[r]} est donc : $${tex_fraction(3,q-1)}$`;
					if (q==52) texte_corr+=`$=${tex_fraction(1,17)}$.`
					texte_corr +=`<br> La probabilité de tirer 2 ${Initiale[r]}`;
					if (Initiale[r]==`valet`||Initiale[r]==`roi`) texte+=`s`;
					texte_corr +=` est donc : $${tex_fraction_reduite(4,q)}\\times${tex_fraction_reduite(3,q-1)}=${tex_fraction_reduite(12,q*(q-1))}$.<br>`;
					texte_corr +=num_alpha(2)+` Il y a ${q/4} cartes de ${qualites[1][p]} dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${qualites[1][p]} est donc de $${tex_fraction(q/4,q)}=${tex_fraction(1,4)}$.<br>`;
					texte_corr +=`	Pour que l'événement se réalise la deuxième carte est tirée dans les ${q-1} cartes restantes dans lesquelles il manque un ${qualites[1][p]}.<br>`;								
					texte_corr +=`	La probabilité de tirer un deuxième ${qualites[1][p]} est donc : $${tex_fraction(q/4-1,q-1)}$`;
					if (q==52) texte_corr+=`$=${tex_fraction(4,17)}$<br>La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1,4)}\\times${tex_fraction(4,17)}=${tex_fraction(1,17)}$.`;
					else texte_corr+=`<br>La probabilité de tirer 2 ${qualites[1][p]}s est donc $${tex_fraction(1,4)}\\times${tex_fraction_reduite(7,31)}=${tex_fraction(7,124)}$`;
					break;
				case 2 :
					n[0]=randint(2,5);m[0]=randint(2,5);
					n[1]=randint(1,6)+1;m[1]=randint(1,6)+1;
					n[2]=randint(1,3)*2;m[2]=randint(1,3)*2;
					n[3]=randint(1,4)+2;m[3]=randint(1,4)+2;
					n[4]=randint(2,5);m[4]=randint(2,5);
					somme1=n[0]+n[1]+n[2]+n[3]+n[4];
					somme2=m[0]+m[1]+m[2]+m[3]+m[4];	
					r=randint(0,4);
					p=randint(0,4,[r]);
					q=randint(0,4,[p,r]);
					texte=`Dans sa commode, ${quidam} a mis dans le premier tiroir des paires de chaussettes. Il y a `;
					for (let j=0;j<3;j++){
						texte+=`${n[j]} paires de chaussettes ${qualites[2][j]}, `;
					}
					texte+=`${n[3]} paires de chaussettes ${qualites[2][3]} et ${n[4]} paires de chaussettes ${qualites[2][4]}.<br>`;
					texte+=`Dans le deuxième tiroir, ${quidam} a mis des T-shirt. Il y a `;
					for (let j=0;j<3;j++){
						texte+=`${m[j]} T-shirts ${qualites[5][j]}, `;
					}
					texte+=`${m[3]} T-shirts ${qualites[5][3]} et ${m[4]} T-shirts ${qualites[5][4]}.<br>`;
					texte+=`Un matin, il y a une panne de courant et ${quidam} prend au hasard une paire de chaussettes dans le premier tiroir et un T-shirt dans le deuxième.<br>`;
					texte +=num_alpha(0)+` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt ${qualites[2][r]} ?<br>`;
					texte +=num_alpha(1)+` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt de la même couleur ?<br>`;			
					texte +=num_alpha(2)+` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt de couleurs différentes ?`;
					texte_corr=num_alpha(0)+` Il y a ${n[r]} paires de chaussettes ${qualites[2][r]} et il y a ${somme1} paires de chaussettes possibles. `;
					texte_corr+=`La probabilité de chosir une paire de chaussettes ${qualites[2][r]} est de : $${tex_fraction(n[r],somme1)}${simplification_de_fraction_avec_etapes(n[r],somme1)}$.<br>`;
					texte_corr+=`Il y a ${m[r]} T-shirts ${qualites[5][r]} et il y a ${somme2} T-shirts possibles. `;
					texte_corr+=`La probabilité de chosir un des T-shirt ${qualites[5][r]} est de : $${tex_fraction(m[r],somme2)}${simplification_de_fraction_avec_etapes(m[r],somme2)}$.<br>`;
					texte_corr+=`${quidam} a donc $${tex_fraction_reduite(m[r],somme2)}$ de `;
					fra1=fraction_simplifiee(n[r],somme1);
					fra2=fraction_simplifiee(m[r],somme2);
					if (fra1[0]==1) texte_corr+= `une chance `;
					else texte_corr+=`$${fra1[0]}$ chances `;
					texte_corr+=`sur $${fra1[1]}$ de choisir des chaussettes et un T-shirt ${qualites[5][r]}.<br>`;
					texte_corr+=`Soit $${tex_fraction_reduite(m[r],somme2)}\\times${tex_fraction_reduite(n[r],somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${tex_fraction(fra1[0]*fra2[0],fra1[1]*fra2[1])}${simplification_de_fraction_avec_etapes(fra1[0]*fra2[0],fra1[1]*fra2[1])}$.<br>`;
					p1=fraction_simplifiee(fra1[0]*fra2[0],fra1[1]*fra2[1]);
					fra1=fraction_simplifiee(n[p],somme1);
					fra2=fraction_simplifiee(m[p],somme2);
					texte_corr+=num_alpha(1)+` La probabilité de chosir une paire de chaussettes ${qualites[2][p]} est de : $${tex_fraction(n[p],somme1)}${simplification_de_fraction_avec_etapes(n[p],somme1)}$ et `;
					texte_corr+=`la probabilité de chosir l'un des T-shirt ${qualites[5][p]} est de : $${tex_fraction(m[p],somme2)}${simplification_de_fraction_avec_etapes(m[p],somme2)}$.<br>`;
					texte_corr+=`Donc la probabilité de chosir des chaussettes un T-shirt ${qualites[5][p]} est de : $${tex_fraction_reduite(m[p],somme2)}\\times${tex_fraction_reduite(n[p],somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${tex_fraction(fra1[0]*fra2[0],fra1[1]*fra2[1])}${simplification_de_fraction_avec_etapes(fra1[0]*fra2[0],fra1[1]*fra2[1])}$.<br>`;
					p2=fraction_simplifiee(fra1[0]*fra2[0],fra1[1]*fra2[1]);
					fra1=fraction_simplifiee(n[q],somme1);
					fra2=fraction_simplifiee(m[q],somme2);
					texte_corr+=`La probabilité de chosir une paire de chaussettes ${qualites[2][q]} est de : $${tex_fraction(n[q],somme1)}${simplification_de_fraction_avec_etapes(n[q],somme1)}$ et `;
					texte_corr+=`la probabilité de chosir l'un des T-shirt ${qualites[5][q]} est de : $${tex_fraction(m[q],somme2)}${simplification_de_fraction_avec_etapes(m[q],somme2)}$.<br>`;
					texte_corr+=`Donc la probabilité de chosir des chaussettes un T-shirt ${qualites[5][q]} est de : $${tex_fraction_reduite(m[q],somme2)}\\times${tex_fraction_reduite(n[q],somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${tex_fraction(fra1[0]*fra2[0],fra1[1]*fra2[1])}${simplification_de_fraction_avec_etapes(fra1[0]*fra2[0],fra1[1]*fra2[1])}$.<br>`;
					p3=fraction_simplifiee(fra1[0]*fra2[0],fra1[1]*fra2[1]);
					texte_corr +=`On en déduit que la probabilité de choisir des chaussettes et un T-shirt de la même couleur est :<br>`;
					texte_corr +=`$${tex_fraction(p1[0],p1[1])}+${tex_fraction(p2[0],p2[1])}+${tex_fraction(p3[0],p3[1])}=`;
					if 	(p1[1]==p2[1]&&p2[1]==p3[1]) {
						texte_corr+=`\\dfrac{${p1[0]}+${p2[0]}+${p3[0]}}{${p1[1]}}=${tex_fraction(p1[0]+p2[0]+p3[0],p1[1])}${simplification_de_fraction_avec_etapes(p1[0]+p2[0]+p3[0],p1[1])}$<br>`;
						fra1=fraction_simplifiee(p1[0]+p2[0]+p3[0],p1[1]);
					}
					else {
						den=ppcm(p1[1],ppcm(p2[1],p3[1]));
						let e=den/p1[1],f=den/p2[1],g=den/p3[1];
						texte_corr+=`${tex_fraction(p1[0]*e,den)}+${tex_fraction(p2[0]*f,den)}+${tex_fraction(p3[0]*g,den)}=${tex_fraction(p1[0]*e+p2[0]*f+p3[0]*g,den)}${simplification_de_fraction_avec_etapes(p1[0]*e+p2[0]*f+p3[0]*g,den)}$<br>`;
						fra1=fraction_simplifiee(p1[0]*e+p2[0]*f+p3[0]*g,den);
					}
					texte_corr+=num_alpha(2)+` L'événement \"choisir des chaussettes et un T-shirt de couleurs différentes\" est l'événement contraire de l'événement \"choisir des chaussettes et un T-shirt de même couleur\".<br>`;
					texte_corr+=`Donc sa probabilité est : $1-${tex_fraction(fra1[0],fra1[1])}=\\dfrac{${fra1[1]}-${fra1[0]}}{${fra1[1]}}=${tex_fraction(fra1[1]-fra1[0],fra1[1])}${simplification_de_fraction_avec_etapes(fra1[1]-fra1[0],fra1[1])}$<br>`;
					break;
				case 3 :
					quidam=prenomM();
					quidame=prenomF();
					p=choice([4,6,8,10,12]);
					q=choice([4,6,8,10,12],[p]);
					n[0]=Math.min(p,q); // petit dé de quidam
					m[0]=Math.max(p,q); // grand dé de quidam
					p1[0]=n[0]*m[0]; // nombre de couples pour quidam
					p=choice([4,6,8,12]);
					q=choice([4,6,8,12],[p]);
					n[1]=Math.min(p,q); // petit dé de quidame
					m[1]=Math.max(p,q); // grand dé de quidame
					p1[1]=n[1]*m[1] // nombre de couples pour quidame
					somme1=n[0]+m[0]; // maximum pour quidam
					somme2=n[1]+m[1]; // maximum pour quidame
					r=Math.min(somme1,somme2) // Plus grand résultat commun.
					for (let j=0;j<n[0]+m[0]-1;j++) fra1[j]=0; 
					for (let j=1;j<=n[0];j++) {
						for (let k=1;k<=m[0];k++){
							fra1[j+k-2]++; // numérateurs de probas pour quidam = nombre d'occurences des différents résultats possibles
						}
					}
					for (let j=0;j<n[1]+m[1]-1;j++) fra2[j]=0; 
					for (let j=1;j<=n[1];j++) {
						for (let k=1;k<=m[1];k++){
							fra2[j+k-2]++; // numérateurs de probas pour quidame = nombre d'occurences des différents résultats possibles
						}
					}
					for (let j=0;j<r-1;j++) {
						p2[j]=fra2[j]/p1[1]-fra1[j]/p1[0]; // différence entre les probas de l'un et de l'autre (positif si Quidame a plus de chance...)
					}

					texte=`${quidam} dispose d'un dé à ${n[0]} faces numérotées de 1 à ${n[0]} et d'un dé à ${m[0]} faces numérotées de 1 à ${m[0]}.<br>`;
					texte+=`Il lance ses deux dés et en fait la somme.<br>`;
					texte+=num_alpha(0)+` Reporte dans un tableau les issues possibles de cette expérience aléatoire et leurs probabilités respectives.<br>`;
					texte+=num_alpha(1)+` ${quidame} dispose d'un dé à ${n[1]} faces numérotées de 1 à ${n[1]} et d'un dé à ${m[1]} faces numérotées de 1 à ${m[1]}.<br>`;
					texte+=`Elle décide de proposer un défi à ${quidam} : \"On choisit un nombre cible entre 2 et ${r}, on lance nos deux dés en même temps. Le premier dont la somme des dés est la cible a gagné.\"<br>`;
					texte+=num_alpha(2)+` ${quidam} qui connaît les probabilités calculées au 1) propose alors de choisir ${n[0]+1} comme nombre cible. Il pense avoir plus de chances de gagner que ${quidame}. A-t-il raison ?<br>`;
					texte+=`Si oui, quel nombre doit choisir ${quidame} pour avoir un défi qui lui soit favorable et si non, y a-t-il un meilleur choix pour ${quidam} ?<br>`;
					texte+=num_alpha(3)+` Y a-t-il un nombre cible qui donne un jeu équitable où chacun aura la même probabilité de gagner ?<br>`;
					texte+=`$\\textit {Exercice inspiré des problèmes DuDu (mathix.org)}$`;
					texte_corr=num_alpha(0)+` les différents résultats de l\'éxpérience de ${quidam} sont présentés dans cette table :<br>`;
					// tableau d'addition des dé
					texte_corr+='$\\def\\arraystretch{1.5}\\begin{array}{|c';  
					for (let j=0;j<=m[0];j++)	texte_corr+=`|c`;
					texte_corr+='} \\hline  \\text{Dé 1/Dé 2}';
					for (let j=1;j<=m[0];j++) 	texte_corr+=`&`+j;
					for (let k=1;k<=n[0];k++) {
						texte_corr+=` \\\\\\hline `+k;
						for (let j=1;j<=m[0];j++) texte_corr+=`& \\textcolor {${Couleurs[(j+k)%10]}}{${j+k}}`;
					}
					texte_corr+=`\\\\\\hline\\end{array}$<br>`
					// fin du tableau
					texte_corr+=`Les probabilités de chaque issue sont données par ce tableau :<br>`;
					// tableau des probas
					texte_corr+='$\\def\\arraystretch{2.5}\\begin{array}{|c';  
					for (let j=1;j<=somme1;j++)	texte_corr+=`|c`;
					texte_corr+='} \\hline  \\text{résultats}';
					for (let j=2;j<=somme1;j++) 	texte_corr+=`&`+j;
					texte_corr+=` \\\\\\hline \\text{Probabilité}`;
					for (let j=2;j<=somme1;j++) texte_corr+=`& \\textcolor {${Couleurs[j%10]}}`+`{\\dfrac{${fra1[j-2]}}{${p1[0]}}}`;
					
					texte_corr+=`\\\\\\hline\\end{array}$<br>`
					// fin du tableau
					texte_corr+=num_alpha(1)+` Les probabilités en ce qui concerne ${quidame} sont données par le tableau ci-dessous :<br>`;
					// tableau des probas pour quidame
					texte_corr+='$\\def\\arraystretch{2.5}\\begin{array}{|c';  
					for (let j=1;j<=somme2;j++)	texte_corr+=`|c`;
					texte_corr+='} \\hline  \\text{Résultats}';
					for (let j=2;j<=somme2;j++) 	texte_corr+=`&`+j;
					texte_corr+=` \\\\\\hline \\text{Probabilité}`;
					for (let j=2;j<=somme2;j++) texte_corr+=`& \\textcolor {${Couleurs[j%10]}}`+`{\\dfrac{${fra2[j-2]}}{${p1[1]}}}`;
					texte_corr+=`\\\\\\hline\\end{array}$<br>`

					texte_corr+= `La probabilité qu'a ${quidame} de faire ${n[0]+1} est : $\\textcolor {${Couleurs[(n[0]+1)%10]}}{${tex_fraction(fra2[n[0]-1],p1[1])}}${simplification_de_fraction_avec_etapes(fra2[n[0]-1],p1[1])}$.<br>`;
					texte_corr+=`La probabilité qu'a ${quidam} de faire ${n[0]+1} est : $\\textcolor {${Couleurs[(n[0]+1)%10]}}{${tex_fraction(fra1[n[0]-1],p1[0])}}${simplification_de_fraction_avec_etapes(fra1[n[0]-1],p1[0])}$.<br>`;
					if (p2[n[0]-1]>0) {// Si quidame a plus de chance de gagner avec le choix de quidam
						texte_corr+=`${quidam} se trompe en croyant avoir plus de chances de gagner car $${tex_fraction_reduite(fra2[n[0]-1],p1[1])}>${tex_fraction_reduite(fra1[n[0]-1],p1[0])}$.<br>`
						// choix du nombre cible qui favorise quidam
						trouve=false;
						for(let j=r-2;j>=0;j--){
							if (p2[j]<0) {
								texte_corr+=num_alpha(2)+` ${quidam} aurait du choisir ${j+2} comme nombre cible.<br> Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j+2)%10]}}{${tex_fraction(fra1[j],p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j],p1[0])}$ et celle de ${quidame} serait de $\\textcolor {${Couleurs[(j+2)%10]}}{${tex_fraction(fra2[j],p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j],p1[1])}$.<br>`
								trouve=true;
							}
							if (trouve==true) break;
						}
						if (trouve==false) {
							texte_corr+=num_alpha(2)+` Il n'existe pas de choix qui permette à ${quidam} d'avoir plus de chance que ${quidame} de gagner.`
						}
					}
					else // quidam a plus de chances de gagner
					if (p2[n[0]-1]<0)	{
						texte_corr+=`${quidam} a raison de penser avoir plus de chances de gagner car $${tex_fraction_reduite(fra2[n[0]-1],p1[1])}<${tex_fraction_reduite(fra1[n[0]-1],p1[0])}$.<br>`
						// choix du nombre cible qui favorise quidame
						trouve=false;
						for(let j=r-2;j>=0;j--){
							if (p2[j]>0) {
								texte_corr+=num_alpha(2)+` ${quidame} devrait choisir ${j+2} comme nombre cible.<br>Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j+2)%10]}}{${tex_fraction(fra2[j],p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j],p1[1])}$<br>Celle de ${quidam} serait de $\\textcolor {${Couleurs[(j+2)%10]}}{${tex_fraction(fra1[j],p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j],p1[0])}$ et $${tex_fraction_reduite(fra1[j],p1[0])}<${tex_fraction(fra2[j],p1[1])}.$<br>`
								trouve=true;
							}
							if (trouve==true) break;
						}
						if (trouve==false) {
							texte_corr+=num_alpha(2)+` Il n'existe pas de choix qui permette à ${quidame} d'avoir plus de chance que ${quidam} de gagner.<br>`
						}
					}

						// Ils ont autant de chances de gagner l'un que l'autre
					else {
						texte_corr+=`${quidam} et ${quidame} ont autant de chances de gagner car ils ont tous deux la même probabilité de faire ${n[0]+1}, ce qui répond à la question ${num_alpha(3)}.<br>`			
						// choix du nombre cible qui favorise quidam
						trouve=false;
						for(let j=r-2;j>=0;j--){
							if (p2[j]<0) {
								texte_corr+=num_alpha(2)+` ${quidam} aurait du choisir ${j+2} comme nombre cible.<br> Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j+2)%10]}}{${tex_fraction(fra1[j],p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j],p1[0])}$ et celle de ${quidame} serait de $\\textcolor {${Couleurs[(j+2)%10]}}{${tex_fraction(fra2[j],p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j],p1[1])}$.<br>`
								trouve=true;
							}
							if (trouve==true) break;
						}
						if (trouve==false) {
							texte_corr+=num_alpha(2)+` Il n'existe pas de choix qui permette à ${quidam} d'avoir plus de chance que ${quidame} de gagner.<br>`
						}
					}
					if (p2[n[0]-1]==0) {
						texte_corr+=num_alpha(3)+` Il a été déjà répondu à cette question à la question ${num_alpha(1)}.<br>`;
					}
					else { // choix de la cible pour un jeu équitable
						trouve=false;
						for(let j=r-2;j>=0;j--){
							if (p2[j]==0) {
								texte_corr+=num_alpha(3)+` En choisissant ${j+2} comme cible, ${quidam} et ${quidame} ont la même probabilité de gagner.<br>
								Pour ${quidam} la probabilité est : $\\textcolor {${Couleurs[(j+2)%10]}}{${tex_fraction(fra1[j],p1[0])}}${simplification_de_fraction_avec_etapes(fra1[j],p1[0])}$ tout comme pour ${quidame} : $\\textcolor {${Couleurs[(j+2)%10]}}{${tex_fraction(fra2[j],p1[1])}}${simplification_de_fraction_avec_etapes(fra2[j],p1[1])}$.<br>`
								trouve=true;
							}
							if (trouve==true) break;
						}
						if (trouve==false) {
							texte_corr+=num_alpha(3)+` Il n'existe pas de choix qui permette à ${quidam}et à ${quidame} d'avoir la même probabilité de gagner car : <br>`;
							for (let j=2;j<r/2;j++) {
								texte_corr+=`$\\textcolor {${Couleurs[(j)%10]}}{${tex_fraction(fra1[j-2],p1[0])}}\\ne \\textcolor {${Couleurs[(j)%10]}}{${tex_fraction(fra2[j-2],p1[1])}}$ ; `;
							}
							texte_corr+=`et $\\textcolor {${Couleurs[(r/2)%10]}}{${tex_fraction(fra1[r/2],p1[0])}}\\ne \\textcolor {${Couleurs[(r/2)%10]}}{${tex_fraction(fra2[r/2],p1[1])}}$.`;
						}
					}
					break;
				}
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
 */
function Lecture_expression_fonctions_affines(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une fonction affine";
	this.consigne = "Donner l'expression des fonctions représentées";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html? this.spacing = 2 : this.spacing = 1; 
	sortie_html? this.spacing_corr = 2 : this.spacing_corr = 1;
	this.sup=1;
	this.lineaire=false;

	
	this.nouvelle_version = function(numero_de_l_exercice){ // numero_de_l_exercice est 0 pour l'exercice 1
	let k=Math.pow(2,parseInt(this.sup)-1);
	this.liste_questions=[];
	this.liste_corrections=[];
	this.contenu = ''; // Liste de questions
	this.contenu_correction = ''; // Liste de questions corrigées
	let h=Math.round(window.innerHeight*0.7) //pour déterminer la hauteur du div 
	let liste_droites=[];
	let OrdX0;
	let Pente=[];
	if (!this.lineaire) {
		Pente.push(randint(-2*k,2*k));
		Pente.push(randint(-2*k,2*k,[Pente[0]]));
		Pente.push(randint(-2*k,2*k,[Pente[0],Pente[1]]));
		Pente.push(randint(-2*k,2*k,[Pente[0],Pente[1],Pente[2]]));
		Pente.push(randint(-2*k,2*k,[Pente[0],Pente[1],Pente[2],Pente[3]]));
	}
	else {
		Pente.push(randint(-3*k,3*k,[0]));
		Pente.push(randint(-3*k,3*k,[Pente[0],0]));
		Pente.push(randint(-3*k,3*k,[Pente[0],Pente[1],0]));
		Pente.push(randint(-3*k,3*k,[Pente[0],Pente[1],Pente[2],0]));
		Pente.push(randint(-3*k,3*k,[Pente[0],Pente[1],Pente[2],Pente[3],0]));	
	}

	for (let i=0;i<5;i++) {
		if (this.lineaire) OrdX0=0;
		else OrdX0= randint(-1+Pente[i]/k,1+Pente[i]/k)
		liste_droites.push([OrdX0,Pente[i]/k])
	}

	if (sortie_html) {
		let id_unique = `${Date.now()}`
		let id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
		this.consigne = `<div id="${id_du_div}" style="width: ${h}px; height: ${h}px; display : table "></div>`;
		if (!window.SVGExist) {window.SVGExist = {}} // Si SVGExist n'existe pas on le créé
		// SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
		window.SVGExist[id_du_div] = setInterval(function() {
			if ($(`#${id_du_div}`).length ) {
				$(`#${id_du_div}`).html("");//Vide le div pour éviter les SVG en doublon
				const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, 500, 500).size('100%','100%')

			SVG_repere(mon_svg,-5,5,-5,5,k,k,500,500,true );
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[0][0],liste_droites[0][1],'blue','d1');
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[1][0],liste_droites[1][1],'red','d2');
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[2][0],liste_droites[2][1],'green','d3');
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[3][0],liste_droites[3][1],'brown','d4');
			SVG_Tracer_droite(mon_svg,500,500,-5,5,-5,5,liste_droites[4][0],liste_droites[4][1],'purple','d5');
			clearInterval(SVGExist[id_du_div]);//Arrête le timer
			}

		}, 100); // Vérifie toutes les 100ms



	}
	else { //sortie Latex 
		let texte =`\\begin{tikzpicture}`;
		texte += Latex_repere(-5,5,-5,5,k,k,true);
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[0][0],liste_droites[0][1],'blue','d_1');
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[1][0],liste_droites[1][1],'red','d_2');
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[2][0],liste_droites[2][1],'green','d_3');
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[3][0],liste_droites[3][1],'brown','d_4');
		texte += Latex_Tracer_droite(-5,5,-5,5,liste_droites[4][0],liste_droites[4][1],'purple','d_5');
		texte +=`\n\t \\end{tikzpicture}`;
		this.liste_questions.push(texte);
	}
	for (i=0;i<5;i++) {
	this.liste_questions.push(`Déterminer l'expression de la fonction $f_${i+1}$ représentée par la droite $d_${i+1}$.`)
	if (this.lineaire||liste_droites[i][0]==0) this.liste_corrections.push(`La droite $d_${i+1}$ passe par l'origine et son coefficient directeur est $${tex_nombre(liste_droites[i][1])}$. Elle représente la fonction linéaire $f_${i+1}(x)=${reduire_ax_plus_b(liste_droites[i][1],0)}$.`)
		else this.liste_corrections.push(`La droite $d_${i+1}$ passe par le point de coordonnées $(0;${liste_droites[i][0]})$ et son coefficient directeur est $${tex_nombre(liste_droites[i][1])}$. Elle représente la fonction affine $f_${i+1}(x)=${reduire_ax_plus_b(liste_droites[i][1],liste_droites[i][0])}$.`)
	
	}
		
		liste_de_question_to_contenu_sans_numero(this); 
		if (!this.lineaire) this.contenu_correction = `Il s’agit de fonctions affines, elles sont donc de la forme $f(x)=ax+b$, $b$ étant l’ordonnée à l’origine et $a$ la pente de la droite.\n` + this.contenu_correction;
			else this.contenu_correction = `Il s’agit de fonctions linéaires, elles sont donc de la forme $f(x)=ax$, $a$ étant la pente de la droite.\n`  + this.contenu_correction;	
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Coefficient directeur entier\n2 : Coefficient directeur 'en demis'\n3 : Coefficient directeur 'en quarts'"];
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
*/
function Image_fonction_algebrique(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer l'image d'un nombre par une fonction d'après sa forme algébrique";
	this.consigne = "";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 4; // niveau de difficulté

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup==1) {
			type_de_questions_disponibles = ['ax+b','ax-b','-ax+b','-ax-b'];
		} 
		if (this.sup==2) {
			type_de_questions_disponibles = ['ax2+bx+c','ax2+c','ax2+bx','-ax2+bx-c','-ax2-bx-c','-ax2-bx+c','-ax2-bx'];
		}
		if (this.sup==3) {
			type_de_questions_disponibles = ['a/cx+d','ax+b/cx+d'];
		}
		if (this.sup==4) {
			type_de_questions_disponibles = ['(ax+b)(cx+d)','(ax+b)2'];
		}
		if (this.sup==5) {
			type_de_questions_disponibles = ['ax+b','ax-b','-ax+b','ax2+bx+c','-ax2+bx-c','-ax2-bx','a/cx+d','ax+b/cx+d','(ax+b)(cx+d)','(ax+b)2'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_signes_de_x = combinaison_listes([true,false],this.nb_questions); 
		for (let i = 0, texte, texte_corr, a, b, c, d, expression, nomdef, x, cpt=0; i < this.nb_questions && cpt<50; ) {
			x = randint(1,12);
			if (liste_de_signes_de_x[i]) {
				x = -1*x;
			}
			a = randint(2,11);
			b = randint(2,11);
			c = randint(2,11);
			nomdef = lettre_minuscule_depuis_chiffre(6+i) // on commence par f puis on continue dans l'ordre alphabétique
			switch (liste_type_de_questions[i]){
				case 'ax+b': 
					expression = `${a}x+${b}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}+${b}=${a*x}+${b}=${a*x+b}$`
				break;
				case 'ax-b': 
					expression = `${a}x-${b}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}-${b}=${a*x}-${b}=${a*x-b}$`
				break;
				case '-ax+b': 
					expression = `-${a}x+${b}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}+${b}=${-1*a*x}+${b}=${-1*a*x+b}$`
				break;
				case '-ax-b': 
					expression = `-${a}x-${b}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}-${b}=${-1*a*x}-${b}=${-1*a*x-b}$`
				break;
				case 'ax2+bx+c': 
					expression = `${a}x^2+${b}x+${c}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}+${c}=${a}\\times${x*x}${ecriture_algebrique(b*x)}+${c}=${a*x*x}${ecriture_algebrique(b*x)}+${c}=${a*x*x+b*x+c}$`
				break;
				case 'ax2+c': 
					expression = `${a}x^2+${c}`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${c}=${a}\\times${x*x}+${c}=${a*x*x}+${c}=${a*x*x+c}$`
				break;
				case 'ax2+bx': 
					expression = `${a}x^2+${b}x`
					texte_corr = `$${nomdef}(${x})=${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}=${a}\\times${x*x}${ecriture_algebrique(b*x)}=${a*x*x}${ecriture_algebrique(b*x)}=${a*x*x+b*x}$`
				break;
				case '-ax2+bx-c': 
					expression = `-${a}x^2+${b}x-${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2+${b}\\times ${ecriture_parenthese_si_negatif(x)}-${c}=-${a}\\times${x*x}${ecriture_algebrique(b*x)}-${c}=${-1*a*x*x}${ecriture_algebrique(b*x)}-${c}=${-1*a*x*x+b*x-c}$`
				break;
				case '-ax2-bx-c': 
					expression = `-${a}x^2-${b}x-${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}-${c}=-${a}\\times${x*x}${ecriture_algebrique(-1*b*x)}-${c}=${-1*a*x*x}${ecriture_algebrique(-1*b*x)}-${c}=${-1*a*x*x-b*x-c}$`
				break;
				case '-ax2-bx+c': 
					expression = `-${a}x^2-${b}x+${c}`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}+${c}=-${a}\\times${x*x}${ecriture_algebrique(-1*b*x)}+${c}=${-1*a*x*x}${ecriture_algebrique(-1*b*x)}+${c}=${-1*a*x*x-b*x+c}$`
				break;
				case '-ax2-bx': 
					expression = `-${a}x^2-${b}x`
					texte_corr = `$${nomdef}(${x})=-${a}\\times ${ecriture_parenthese_si_negatif(x)}^2-${b}\\times ${ecriture_parenthese_si_negatif(x)}=-${a}\\times${x*x}${ecriture_algebrique(-1*b*x)}=${-1*a*x*x}${ecriture_algebrique(-1*b*x)}=${-1*a*x*x-b*x}$`
				break;
				case 'a/cx+d': 
					d = randint(1,11)
					while (c*x+d==0){
						c=randint(2,11)
					}
					expression = `\\dfrac{${a}}{${c}x+${d}}`
					texte_corr = `$${nomdef}(${x})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x)}+${d}}=\\dfrac{${a}}{${c*x}+${d}}=\\dfrac{${a}}{${c*x+d}}=${tex_fraction_reduite(a,c*x+d)}$`
				break;
				case 'ax+b/cx+d': 
					d = randint(1,11)
					while (c*x+d==0){
						c=randint(2,11)
					}
					while (a*x+b==0){
						a=randint(2,11)
					}
					expression = `\\dfrac{${a}x+${b}}{${c}x+${d}}`
					texte_corr = `$${nomdef}(${x})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x)}+${b}}{${c}\\times${ecriture_parenthese_si_negatif(x)}+${d}}=\\dfrac{${a*x}+${b}}{${c*x}+${d}}=\\dfrac{${a*x+b}}{${c*x+d}}=${tex_fraction_reduite(a*x+b,c*x+d)}$`
				break;
				case '(ax+b)(cx+d)': 
					a = randint (-4,4,[0,1,-1])
					b = randint (-4,4,[0])
					c = randint (-4,4,[0,1,-1])
					d = randint (-4,4,[0])
					x = randint (-2,2,[0])

					expression = `(${a}x${ecriture_algebrique(b)})(${c}x${ecriture_algebrique(d)})`
					texte_corr = `$${nomdef}(${x})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(d)}\\right)=(${a*x}${ecriture_algebrique(b)})(${c*x}${ecriture_algebrique(d)})=${a*x+b}\\times${ecriture_parenthese_si_negatif(c*x+d)}=${(a*x+b)*(c*x+d)}$`
				break;
				case '(ax+b)2': 
					a = randint (-4,4,[0,-1,1])
					b = randint (-4,4,[0])
					c = randint (-4,4,[0,-1,1])
					d = randint (-4,4,[0])
					x = randint (-2,2,[0])

					expression = `(${a}x${ecriture_algebrique(b)})^2`
					texte_corr = `$${nomdef}(${x})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x)}${ecriture_algebrique(b)}\\right)^2=(${a*x}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a*x+b)}^2=${(a*x+b)*(a*x+b)}$`
				break;
			}

			texte = `On considère la fonction $${nomdef}$ définie par $${nomdef}(x):x\\mapsto ${expression}$. Calculer $${nomdef}(${x})$.`
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',5,'1 : Fonctions affines\n2 : Polynome du second degré\n3 : Quotient\n4 : Produit \n5 : Mélange'];
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
*/
function Tableau_de_valeurs(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Compléter un tableau de valeurs";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	this.sup = 5; // niveau de difficulté
	this.correction_detaillee_disponible = true;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup==1) {
			type_de_questions_disponibles = ['ax+b','ax'];
		} 
		if (this.sup==2) {
			type_de_questions_disponibles = ['ax2+bx+c','ax2+c','ax2+bx'];
		} 
		if (this.sup==3) {
			type_de_questions_disponibles = ['a/cx+d','ax+b/cx+d'];
		}
		if (this.sup==4) {
			type_de_questions_disponibles = ['(ax+b)(cx+d)','(ax+b)2'];
		}
		if (this.sup==5) {
			type_de_questions_disponibles = ['ax+b','ax','ax2+bx+c','ax2+c','ax2+bx','a/cx+d','ax+b/cx+d','(ax+b)(cx+d)','(ax+b)2']
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_x = combinaison_listes([[-3,0,3],[-2,0,2],[1,2,5],[-3,6,9]],this.nb_questions); 
		for (let i = 0, texte, texte_corr, a, b, c, d,x1, x2, x3, expression, nomdef, ligne2, calculs="", cpt=0; i < this.nb_questions && cpt<50; ) {
			nomdef = lettre_minuscule_depuis_chiffre(6+i) // on commence par f puis on continue dans l'ordre alphabétique
			x1=liste_de_x[i][0];
			x2=liste_de_x[i][1];
			x3=liste_de_x[i][2];
			switch (liste_type_de_questions[i]){
				case 'ax+b': 
					a = randint(-10,10,[0,-1,1])
					b = randint(-10,10,[0])
					expression = `${a}x${ecriture_algebrique(b)}`
					ligne2 = `${nomdef}(x) & ${a*liste_de_x[i][0]+b} & ${a*liste_de_x[i][1]+b} & ${a*liste_de_x[i][2]+b} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}=${a*x1}${ecriture_algebrique(b)}=${a*x1+b}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}=${a*x2}${ecriture_algebrique(b)}=${a*x2+b}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}=${a*x3}${ecriture_algebrique(b)}=${a*x3+b}$<br>`
				break;
				case 'ax': 
					a = randint(-10,10,[0,-1,1])
					expression = `${a}x`
					ligne2 = `${nomdef}(x) & ${a*liste_de_x[i][0]} & ${a*liste_de_x[i][1]} & ${a*liste_de_x[i][2]} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}=${a*x1}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}=${a*x2}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}=${a*x3}$<br>`
				break;
				case 'ax2+bx+c':
					a = randint(-3,3,[0,-1,1])
					b = randint(-5,5,[0,-1,1])
					c = randint(-10,10,[0])
					expression = `${a}x^2${ecriture_algebrique(b)}x${ecriture_algebrique(c)}`
					ligne2 = `${nomdef}(x) & ${a*liste_de_x[i][0]**2+b*liste_de_x[i][0]+c} & ${a*liste_de_x[i][1]**2+b*liste_de_x[i][1]+c} & ${a*liste_de_x[i][2]**2+b*liste_de_x[i][2]+c} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(c)}=${a}\\times${x1**2}${ecriture_algebrique(b*x1)}${ecriture_algebrique(c)}=${a*x1**2+b*x1+c}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(c)}=${a}\\times${x2**2}${ecriture_algebrique(b*x2)}${ecriture_algebrique(c)}=${a*x2**2+b*x2+c}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(c)}=${a}\\times${x3**2}${ecriture_algebrique(b*x3)}${ecriture_algebrique(c)}=${a*x3**2+b*x3+c}$<br>`
				break;
				case 'ax2+c':
					a = randint(-4,4,[0,-1,1])
					c = randint(-10,10,[0])
					expression = `${a}x^2${ecriture_algebrique(c)}`
					ligne2 = `${nomdef}(x) & ${a*liste_de_x[i][0]**2+c} & ${a*liste_de_x[i][1]**2+c} & ${a*liste_de_x[i][2]**2+c} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(c)}=${a}\\times${x1**2}${ecriture_algebrique(c)}=${a*x1**2+c}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(c)}=${a}\\times${x2**2}${ecriture_algebrique(c)}=${a*x2**2+c}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(c)}=${a}\\times${x3**2}${ecriture_algebrique(c)}=${a*x3**2+c}$<br>`
				break;
				case 'ax2+bx':
					a = randint(-3,3,[0,-1,1])
					b = randint(-5,5,[0,-1,1])
					c = randint(-10,10,[0])
					expression = `${a}x^2${ecriture_algebrique(b)}x`
					ligne2 = `${nomdef}(x) & ${a*liste_de_x[i][0]**2+b*liste_de_x[i][0]} & ${a*liste_de_x[i][1]**2+b*liste_de_x[i][1]} & ${a*liste_de_x[i][2]**2+b*liste_de_x[i][2]} \\\\\n`
					calculs = `$${nomdef}(${x1})=${a}\\times${ecriture_parenthese_si_negatif(x1)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x1)}=${a}\\times${x1**2}${ecriture_algebrique(b*x1)}=${a*x1**2+b*x1}$<br>`
					calculs += `$${nomdef}(${x2})=${a}\\times${ecriture_parenthese_si_negatif(x2)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x2)}=${a}\\times${x2**2}${ecriture_algebrique(b*x2)}=${a*x2**2+b*x2}$<br>`
					calculs += `$${nomdef}(${x3})=${a}\\times${ecriture_parenthese_si_negatif(x3)}^2${ecriture_algebrique(b)}\\times${ecriture_parenthese_si_negatif(x3)}=${a}\\times${x3**2}${ecriture_algebrique(b*x3)}=${a*x3**2+b*x3}$<br>`
				break;
				case 'a/cx+d': 
					a = randint(-10,10,[0])
					c = randint(-10,10,[0,-1,1])
					d = randint(-10,10,[0])
					while (c*x1+d==0 || c*x2+d==0 || c*x3+d==0){
						c = randint(-10,10,[0,-1,1])
					}
					expression = `\\dfrac{${a}}{${c}x${ecriture_algebrique(d)}}`
					ligne2 = `${nomdef}(x) & ${tex_fraction_reduite(a,c*liste_de_x[i][0]+d)} & ${tex_fraction_reduite(a,c*liste_de_x[i][1]+d)} & ${tex_fraction_reduite(a,c*liste_de_x[i][2]+d)} \\\\\n`
					calculs = `$${nomdef}(${x1})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c*x1}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c*x1+d}}`
						if (pgcd(a,c*x1+d)==1){
							calculs +='$<br><br>'
						} else {
							calculs += '='+tex_fraction_reduite(a,c*x1+d)+'$<br><br>'
						}
					calculs += `$${nomdef}(${x2})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c*x2}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c*x2+d}}`
						if (pgcd(a,c*x2+d)==1){
							calculs +='$<br><br>'
						} else {
							calculs += '='+tex_fraction_reduite(a,c*x2+d)+'$<br><br>'
						}
					calculs += `$${nomdef}(${x3})=\\dfrac{${a}}{${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c*x3}${ecriture_algebrique(d)}}=\\dfrac{${a}}{${c*x3+d}}`
						if (pgcd(a,c*x3+d)==1){
							calculs +='$<br><br>'
						} else {
							calculs += '='+tex_fraction_reduite(a,c*x3+d)+'$<br><br>'
						}
				break;
				case 'ax+b/cx+d': 
					a = randint(-10,10,[0,1,-1])
					b = randint(-10,10,[0])
					c = randint(-10,10,[0,-1,1])
					d = randint(-10,10,[0])
					while (c*x1+d==0 || c*x2+d==0 || c*x3+d==0){
						c = randint(-10,10,[0,-1,1])
					}
					expression = `\\dfrac{${a}x${ecriture_algebrique(b)}}{${c}x${ecriture_algebrique(d)}}`
					ligne2 = `${nomdef}(x) & ${tex_fraction_reduite(a*liste_de_x[i][0]+b,c*liste_de_x[i][0]+d)} & ${tex_fraction_reduite(a*liste_de_x[i][1]+b,c*liste_de_x[i][1]+d)} & ${tex_fraction_reduite(a*liste_de_x[i][2]+b,c*liste_de_x[i][2]+d)} \\\\\n`
					calculs = `$${nomdef}(${x1})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}}=\\dfrac{${a*x1}${ecriture_algebrique(b)}}{${c*x1}${ecriture_algebrique(d)}}=\\dfrac{${a*x1+b}}{${c*x1+d}}`
						if (pgcd(a*x1+b,c*x1+d)==1){
							calculs +='$<br><br>'
						} else {
							calculs += '='+tex_fraction_reduite(a*x1+b,c*x1+d)+'$<br><br>'
						}
					calculs += `$${nomdef}(${x2})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}}=\\dfrac{${a*x2}${ecriture_algebrique(b)}}{${c*x2}${ecriture_algebrique(d)}}=\\dfrac{${a*x2+b}}{${c*x2+d}}`
						if (pgcd(a*x2+b,c*x2+d)==1){
							calculs +='$<br><br>'
						} else {
							calculs += '='+tex_fraction_reduite(a*x2+b,c*x2+d)+'$<br><br>'
						}
					calculs += `$${nomdef}(${x3})=\\dfrac{${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}}{${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}}=\\dfrac{${a*x3}${ecriture_algebrique(b)}}{${c*x3}${ecriture_algebrique(d)}}=\\dfrac{${a*x3+b}}{${c*x3+d}}`
						if (pgcd(a*x3+b,c*x3+d)==1){
							calculs +='$<br><br>'
						} else {
							calculs += '='+tex_fraction_reduite(a*x3+b,c*x3+d)+'$<br><br>'
						}
				break;
				case '(ax+b)(cx+d)': 
					a = randint(-5,5,[0,1,-1])
					b = randint(-5,5,[0])
					c = randint(-3,3,[0,-1,1])
					d = randint(-3,3,[0])
					if (a<0 && b<0 && c<0 && d<0) {
						d=randint(1,3)
					}
					expression = `(${a}x${ecriture_algebrique(b)})(${c}x${ecriture_algebrique(d)})`
					ligne2 = `${nomdef}(x) & ${(a*liste_de_x[i][0]+b)*(c*liste_de_x[i][0]+d)} & ${(a*liste_de_x[i][1]+b)*(c*liste_de_x[i][1]+d)} & ${(a*liste_de_x[i][2]+b)*(c*liste_de_x[i][2]+d)} \\\\\n`
					calculs = `$${nomdef}(${x1})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(d)}\\right)=(${a*x1}${ecriture_algebrique(b)})(${c*x1}${ecriture_algebrique(d)})=${a*x1+b}\\times ${ecriture_parenthese_si_negatif(c*x1+d)}=${(a*x1+b)*(c*x1+d)}$<br>`
					calculs += `$${nomdef}(${x2})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(d)}\\right)=(${a*x2}${ecriture_algebrique(b)})(${c*x2}${ecriture_algebrique(d)})=${a*x2+b}\\times ${ecriture_parenthese_si_negatif(c*x2+d)}=${(a*x2+b)*(c*x2+d)}$<br>`
					calculs += `$${nomdef}(${x3})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}\\right)\\left(${c}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(d)}\\right)=(${a*x3}${ecriture_algebrique(b)})(${c*x3}${ecriture_algebrique(d)})=${a*x3+b}\\times ${ecriture_parenthese_si_negatif(c*x3+d)}=${(a*x3+b)*(c*x3+d)}$<br>`
				break;
				case '(ax+b)2': 
					a = randint(-3,3,[0,1,-1])
					b = randint(-3,3,[0])
					expression = `(${a}x${ecriture_algebrique(b)})^2`
					ligne2 = `${nomdef}(x) & ${(a*liste_de_x[i][0]+b)**2} & ${(a*liste_de_x[i][1]+b)**2} & ${(a*liste_de_x[i][2]+b)**2} \\\\\n`
					calculs = `$${nomdef}(${x1})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x1)}${ecriture_algebrique(b)}\\right)^2=(${a*x1}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a*x1+b)}^2=${(a*x1+b)**2}$<br>`
					calculs += `$${nomdef}(${x2})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x2)}${ecriture_algebrique(b)}\\right)^2=(${a*x2}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a*x2+b)}^2=${(a*x2+b)**2}$<br>`
					calculs += `$${nomdef}(${x3})=\\left(${a}\\times${ecriture_parenthese_si_negatif(x3)}${ecriture_algebrique(b)}\\right)^2=(${a*x3}${ecriture_algebrique(b)})^2=${ecriture_parenthese_si_negatif(a*x3+b)}^2=${(a*x3+b)**2}$<br>`
				
				break;
			}


			texte = `On considère la fonction $${nomdef}$ définie par $${nomdef}(x):x\\mapsto ${expression}$. Compléter le tableau de valeurs suivant.`
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
			if (this.correction_detaillee){
				texte_corr += '<br><br>';
				texte_corr += calculs;	
			}
			


			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		this.nb_questions==1 ? liste_de_question_to_contenu_sans_numero(this) : liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',5,'1 : Fonctions affines\n2 : Polynome du second degré\n3 : Quotient\n4 : Produit \n5 : Mélange'];
}

/**
* @auteur Jean-Claude Lhote
*/
function Double_distributivite()
{
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Utiliser la double distributivité";
	this.consigne = "Développer et réduire les expressions suivantes.";
	this.nb_cols = 1 ;
	this.nb_cols_corr = 1 ;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup = 1 ;

	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = [1,2] ;
		if (this.sup==2) {
			type_de_questions_disponibles = [3,4]
		}
		if (this.sup==3) {
			type_de_questions_disponibles = [1,2,3,4]
		}


		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, texte, texte_corr, cpt=0, a, b, c, d,type_de_questions; i < this.nb_questions && cpt<50 ;) {
			type_de_questions = liste_type_de_questions[i];
			a= randint(2,9);
			b = randint(2,9);
			c = randint(2,9,[a]);
			d = randint(2,9,[b]);
			switch(type_de_questions){
			case 1 : //(x+b)(x+d)
				b = randint(2,10)
				d = randint(2,12)
				texte = `$(x+${b})(x+${d})$`
				texte_corr = `$(x+${b})(x+${d})=x^2+${b}x+${d}x+${b*d}=x^2+${b+d}x+${b*d}$`
				break;
			case 2 : //(ax+b)(cx+d)
				texte = `$(${a}x+${b})(${c}x+${d})$`
				texte_corr = `$(${a}x+${b})(${c}x+${d})=${a*c}x^2+${a*d}x+${b*c}x+${b*d}=${a*c}x^2+${a*d+b*c}x+${b*d}$`
				break;
			case 3 ://(ax-b)(cx+d)
				texte = `$(${a}x-${b})(${c}x+${d})$`
				texte_corr = `$(${a}x-${b})(${c}x+${d})=${a*c}x^2+${d*a}x-${b*c}x-${b*d}=${a*c}x^2+${d*a}x-${b*c}x-${b*d}$`;
				break;
			case 4 ://(ax-b)(cx-d)
				texte = `$(${a}x-${b})(${c}x-${d})$`
				texte_corr = `$(${a}x-${b})(${c}x-${d})=${a*c}x^2-${a*d}x-${b*c}x+${b*d}=${a*c}x^2-${a*d+b*c}x+${b*d}$`
				break;
			}
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : (x+a)(x+b) et (ax+b)(cx+d)\n 2 : (ax-b)(cx+d) et (ax-b)(cx-d)\n 3 : Tous les types'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Developper_Identites_remarquables2()
{
	'use strict';
Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Développer avec les identités remarquables";
	this.consigne = "Développer les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup=1 ;

	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
 		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
 		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		let type_de_questions_disponibles = [];
		if(this.sup==1){
		    type_de_questions_disponibles = [1,2,3] // coef de x = 1
        }
        else if (this.sup==2) {
		    type_de_questions_disponibles = [4,5,6]  // coef de x > 1
        }
        else {type_de_questions_disponibles = [7,8,9]}  // coef de x relatif
		
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, texte, texte_corr, cpt=0, a, b, type_de_questions,fraction=[],ds,ns; i < this.nb_questions && cpt<50 ;) {
			type_de_questions = liste_type_de_questions[i];
			a= randint(1,9);
			b = randint(2,9);
			fraction = choice(liste_fractions);
			ns=fraction[0]
			ds=fraction[1]
			switch(type_de_questions){
			case 1 :
				texte = `$(x+${a})^2$`; // (x+a)²
				texte_corr = `$(x+${a})^2=x^2+2 \\times ${a} \\times x+${a}^2=x^2+${2*a}x+${a*a}$` ; 
				break;
			case 2 :
			texte = `$(x-${a})^2$`  // (x-a)²
				texte_corr = `$(x-${a})^2=x^2-2 \\times ${a} \\times x+${a}^2=x^2-${2*a}x+${a*a}$` ; 
				break;
			case 3 :
				texte = `$(x-${a})(x+${a})$`    // (x-a)(x+a)
				texte_corr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a*a}$` ; 
				break;
			case 4 :
				texte = `$(${b}x+${a})^2$`; //(bx+a)²  b>1
			    texte_corr = `$(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b*b}x^2+${2*b*a}x+${a*a}$`;
				break;
			case 5 :
				texte = `$(${b}x-${a})^2$`; //(bx-a)² b>1
			    texte_corr = `$(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b*b}x^2-${2*b*a}x+${a*a}$`;
				break;
			case 6 :
				texte = `$(${b}x-${a})(${b}x+${a})$`; //(bx-a)(bx+a) b>1
			    texte_corr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b*b}x^2-${a*a}$`;
                break;
			case 7 :
				texte = `$\\left(${tex_fraction(ns,ds)}x+${a}\\right)^2$`; // (kx+a)² k rationnel 
				texte_corr = `$\\left(${tex_fraction(ns,ds)}x+${a}\\right)^2=\\left(${tex_fraction(ns,ds)}x\\right)^2+2 \\times ${tex_fraction(ns,ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns,ds)}x+${a}\\right)^2=${tex_fraction(ns*ns,ds*ds)}x^2+${tex_fraction_reduite(ns*2*a,ds)}x+${a*a}$`;
				break;
			case 8 :
				texte = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)^2$`; // (kx-a)² k rationnel 
				texte_corr = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)^2=\\left(${tex_fraction(ns,ds)}x\\right)^2-2 \\times ${tex_fraction(ns,ds)}x \\times ${a} + ${a}^2=${tex_fraction(ns*ns,ds*ds)}x^2-${tex_fraction_reduite(ns*2*a,ds)}x+${a*a}$`;
				break;
			case 9 :
				//  (bx-a)(bx+a) avec a entier et b rationnel simple
				texte = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)$`; // b>1
				texte_corr = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)=\\left(${tex_fraction(ns,ds)}x\\right)^2-${a}^2=${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}$`;
				break;
			}
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x relatif'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Developper_Identites_remarquables3()
{
	'use strict';
Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Développer (a-b)(a+b)";
	this.consigne = "Développer les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup=1 ;


	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		for (let i = 0,ns,ds ,texte, texte_corr, cpt=0, a, b,fraction=[]; i < this.nb_questions && cpt<50 ;) {
			if(this.sup==1){
				a= randint(1,9);	 // coef de x est égal à 1
				texte = `$(x-${a})(x+${a})$`    // (x-a)(x+a)
				texte_corr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a*a}$` ; 
			}
			else if (this.sup==2) {
				a= randint(1,9)  // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
				b = randint(2,9);
				texte = `$(${b}x-${a})(${b}x+${a})$`; // b>1
			    texte_corr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b*b}x^2-${a*a}$`;
			}
			else {   //  (bx-a)(bx+a) avec a entier et b rationnel simple
				a= randint(1,9);
				fraction = choice(liste_fractions);
				ns=fraction[0]
				ds=fraction[1]
				texte = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)$`; // b>1
				texte_corr = `$\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)=\\left(${tex_fraction(ns,ds)}x\\right)^2-${a}^2=${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}$`;
				}
			
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Factoriser_Identites_remarquables3()
{
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Factoriser a²-b²";
	this.consigne = "Factoriser les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup=1 ;

	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
 		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
 		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		for (let i = 0, texte, texte_corr, cpt=0, a, b, ns,ds,fraction=[] ; i < this.nb_questions && cpt<50 ;) {
			if(this.sup==1){
				a= randint(1,9);	 // coef de x est égal à 1
				texte = `$x^2-${a*a}$`    // (x-a)(x+a)
				texte_corr = `$x^2-${a*a}=x^2-${a}^2=(x-${a})(x+${a})$` ; 
			}
			else if (this.sup==2) {
				a= randint(1,9)  // (bx-a)(bx+a) avec a et b entier positifs entre 1 et 9,  b différent de 1
				b = randint(2,9);
				texte = `$${b*b}x^2-${a*a}$`; // b>1
			    texte_corr = `$${b*b}x^2-${a*a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`;
			}
			else {   //  (bx-a)(bx+a) avec a entier et b rationnel simple
				a= randint(1,9);
				fraction = choice(liste_fractions);
				ns=fraction[0]
				ds=fraction[1]
				texte = `$${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}$`; // b>1
				   texte_corr = `$${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}=\\left(${tex_fraction(ns,ds)}x\\right)^2-${a}^2=\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)$`;
		
			}  
				
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'] ;
}

/**
* @auteur Jean-Claude Lhote
*/
function Factoriser_Identites_remarquables2()
{
	'use strict';
Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Factoriser avec les identités remarquables";
	this.consigne = "Factoriser les expressions suivantes.";
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1 ;
	this.spacing_corr = 1 ;
	this.nb_questions = 5 ;
	this.sup = 1 ;

	this.nouvelle_version = function(numero_de_l_exercice) {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		let type_de_questions_disponibles = [];
		if(this.sup==1){
		    type_de_questions_disponibles = [1,2,3] // coef de x = 1
        }
        else if (this.sup==2) {
		    type_de_questions_disponibles = [4,5,6]  // coef de x > 1
        }
        else {type_de_questions_disponibles = [7,8,9]}  // coef de x rationnel
		
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, texte, texte_corr, cpt=0, a, b ,fraction=[],ns,ds,type_de_questions; i < this.nb_questions && cpt<50 ;) {
			type_de_questions = liste_type_de_questions[i];
			a= randint(1,9);
			b = randint(2,9);
			fraction = choice(liste_fractions);
			ns=fraction[0]
			ds=fraction[1]
        	switch(type_de_questions){
			case 1 :
				texte = `$x^2+${2*a}x+${a*a}$`; // (x+a)²
				texte_corr = `$x^2+${2*a}x+${a*a}=x^2+2 \\times ${a} \\times x+${a}^2=(x+${a})^2$` ; 
				break;
			case 2 :
			texte = `$x^2-${2*a}x+${a*a}$`  // (x-a)²
				texte_corr = `$x^2-${2*a}x+${a*a}=(x-${a})^2=x^2-2 \\times ${a} \\times x+${a}^2=(x-${a})^2$` ; 
				break;
			case 3 :
				texte = `$x^2-${a*a}$`    // (x-a)(x+a)
				texte_corr = `$x^2-${a*a}=x^2-${a}^2=(x-${a})(x+${a})$` ; 
				break;
			case 4 :
				texte = `$${b*b}x^2+${2*b*a}x+${a*a}$`; //(bx+a)²  b>1
			    texte_corr = `$${b*b}x^2+${2*b*a}x+${a*a}=(${b}x)^2+2 \\times ${b}x \\times {a} + ${a}^2=(${b}x+${a})^2$`;
				break;
			case 5 :
				texte = `$${b*b}x^2-${2*b*a}x+${a*a}$`; //(bx-a)² b>1
			    texte_corr = `$${b*b}x^2-${2*b*a}x+${a*a}=(${b}x)^2-2 \\times ${b}x \\times {a} + ${a}^2=(${b}x-${a})^2$`;
				break;
			case 6 :
				texte = `$${b*b}x^2-${a*a}$`; //(bx-a)(bx+a) b>1
			    texte_corr = `$${b*b}x^2-${a*a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`;
                break;
            case 7 :
		
				texte = `$${tex_fraction(ns*ns,ds*ds)}x^2+${tex_fraction(2*ns*a,ds)}x+${a*a}$`; // (kx+a)² k rationnel 
				texte_corr = `$${tex_fraction(ns*ns,ds*ds)}x^2+${tex_fraction(ns*2*a,ds)}x+${a*a}=\\left(${tex_fraction(ns,ds)}x\\right)^2+2 \\times ${tex_fraction(ns,ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns,ds)}x+${a}\\right)^2$`;
				break;
			case 8 :
				texte = `$${tex_fraction(ns*ns,ds*ds)}x^2-${tex_fraction(2*ns*a,ds)}x+${a*a}$`; // (kx-a)² k rationnel 
				texte_corr = `$${tex_fraction(ns*ns,ds*ds)}x^2-${tex_fraction(ns*2*a,ds)}x+${a*a}=\\left(${tex_fraction(ns,ds)}x\\right)^2-2 \\times ${tex_fraction(ns,ds)}x \\times ${a} + ${a}^2=\\left(${tex_fraction(ns,ds)}x-${a}\\right)^2$`;
				break;
			case 9 :
				//  (bx-a)(bx+a) avec a entier et b rationnel simple
				texte = `$${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}$`; // b>1
				texte_corr = `$${tex_fraction(ns*ns,ds*ds)}x^2-${a*a}=\\left(${tex_fraction(ns,ds)}x\\right)^2-${a}^2=\\left(${tex_fraction(ns,ds)}x-${a}\\right)\\left(${tex_fraction(ns,ds)}x+${a}\\right)$`;
				break;
			}
			if (this.liste_questions.indexOf(texte)==-1) {
				 // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Coefficient de x égal à 1\n 2 : Coefficient de x supérieur à 1\n 3 : Coefficient de x rationnel'] ;
}

/**
* @auteur Jean-Claude Lhote
* Tout est dans le nom de la fonction.
*/
function Resoudre_une_equation_produit_nul(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre une équation produit nul";
	this.consigne = "Résoudre les équations suivantes";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; 
	sortie_html ? this.spacing_corr=2 : this.spacing_corr=1.5
	this.spacing = 1
	
	
	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
 		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
 		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		let liste_type_de_questions=[]
		switch (parseInt(this.sup)) {
			case 1: liste_type_de_questions=combinaison_listes([1,2],this.nb_questions);
				break;
			case 2: liste_type_de_questions=combinaison_listes([3,4],this.nb_questions);
				break;
			case 3: liste_type_de_questions=combinaison_listes([5,6],this.nb_questions);
				break;
			case 4: liste_type_de_questions=combinaison_listes([1,2,3,4,5,6],this.nb_questions);

		}
		for (let i = 0, a, b, c, d,fraction1,fraction2,ns1,ns2,ds1,ds2, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;) {
			fraction1 = choice(liste_fractions);
			ns1=fraction1[0]
			ds1=fraction1[1]
			fraction2 = choice(liste_fractions);
			ns2=fraction2[0]
			ds2=fraction2[1]
			switch (liste_type_de_questions[i]) {
			case 1: b = randint(1,20); // (x+a)(x+b)=0 avec a et b entiers
					d = randint(1,20,[b])
					texte = `$(x+${b})(x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(x+${b})(x+${d})=0$`
					texte_corr +='<br> Soit '+`$x+${b}=0$`+' ou '+`$x+${d}=0$`
					texte_corr += '<br> Donc '+`$x=${0-b}$`+' ou '+`$x=${0-d}$`
				break;
			case 2: b = randint(1,20); // (x-a)(x+b)=0 avec a et b entiers
					d = randint(1,20,[b])
					texte = `$(x-${b})(x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(x-${b})(x+${d})=0$`
					texte_corr += '<br> Soit '+`$x-${b}=0$`+' ou  '+`$x+${d}=0$`
					texte_corr += '<br> Donc '+`$x=${b}$`+' ou '+`$x=${0-d}$`
				break;
				
			case 3: a = randint(2,6); 	//(ax+b)(cx+d)=0  avec b/a et d/c entiers.
					b = Math.round(randint(1,5)*a);
					c = randint(2,6,[a]);
					d = Math.round(randint(1,5)*c);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr += '<br> Soit '+`$${a}x+${b}=0$`+' ou '+`$${c}x+${d}=0$`
					texte_corr += '<br> Donc '+`$${a}x=${0-b}$`+' ou '+`$${c}x=${0-d}$`
					texte_corr += '<br> Donc '+`$x=-${tex_fraction(b,a)}$`+' ou '+`$x=-${tex_fraction(d,c)}$`
					texte_corr += '<br> Donc '+`$x=${0-b/a}$`+' ou '+`$x=${0-d/c}$`
				break;
			case 4: a = randint(2,6); 	//(ax+b)(cx-d)=0  avec b/a et d/c entiers.
					b = Math.round(randint(1,5)*a);
					c = randint(2,6,[a]);
					d = Math.round(randint(1,5)*c);
					texte = `$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr += '<br> Soit '+`$${a}x+${b}=0$`+' ou '+`$${c}x-${d}=0$`
					texte_corr += '<br> Donc '+`$${a}x=${0-b}$`+' ou '+`$${c}x=${d}$`
					texte_corr += '<br> Donc '+`$x=-${tex_fraction(b,a)}$`+' ou '+`$x=${tex_fraction(d,c)}$`
					texte_corr += '<br> Donc '+`$x=${0-b/a}$`+' ou '+`$x=${d/c}$`
				break;
			case 5:
					a = randint(2,9);	//(ax+b)(cx+d)=0 	avec b/a et d/c quelconques.
					b = randint(1,20,[a]);
					c = randint(2,9,[a]);
					d = randint(1,20,[b,c]);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr += '<br> Soit '+`$${a}x+${b}=0$`+' ou '+`$${c}x+${d}=0$`
					texte_corr += '<br> Donc '+`$${a}x=${0-b}$`+' ou '+`$${c}x=${0-d}$`
					texte_corr += '<br> Donc '+`$x=-${tex_fraction(b,a)}$`
					if (tex_fraction(b,a)!=tex_fraction_reduite(b,a)) {texte_corr+=`$=-${tex_fraction_reduite(b,a)}$`}
					texte_corr+=' ou '+`$x=-${tex_fraction(d,c)}$`
					if (tex_fraction(d,c)!=tex_fraction_reduite(d,c)) {texte_corr+=`$=-${tex_fraction_reduite(d,c)}$`}
				break;
			case 6:
					a = randint(2,9);	//(ax+b)(cx-d)=0 	avec b/a et d/c quelconques.
					b = randint(1,20,[a]);
					c = randint(2,9,[a]);
					d = randint(1,20,[b,c]);
					texte = `$(${a}x+${b})(${c}x+${d})=0$`
					texte_corr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
					texte_corr += '<br>'+`$(${a}x+${b})(${c}x-${d})=0$`
					texte_corr += '<br> Soit '+`$${a}x+${b}=0$`+' ou '+`$${c}x-${d}=0$`
					texte_corr += '<br> Donc '+`$${a}x=${0-b}$`+' ou '+`$${c}x=${d}$`
					texte_corr += '<br> Donc '+`$x=-${tex_fraction(b,a)}$`
					if (tex_fraction(b,a)!=tex_fraction_reduite(b,a)) {texte_corr+=`$=-${tex_fraction_reduite(b,a)}$`}
					texte_corr+=' ou '+`$x=${tex_fraction(d,c)}$`
					if (tex_fraction(d,c)!=tex_fraction_reduite(d,c)) {texte_corr+=`$=${tex_fraction_reduite(d,c)}$`}
					
				break;
		}
		if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,'1 : Coefficient de x = 1\n 2 : Coefficient de x>1 et solutions entières\n 3 : Solutions rationnelles\n 4 : Mélange des 3 autres niveaux'];
}

/**
* @auteur Jean-Claude Lhote
*/

function Resoudre_une_equation_x2_egal_A(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre une équation du second degré";
	this.consigne = "Résoudre les équations suivantes";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; 
	sortie_html ? this.spacing_corr=2 : this.spacing_corr=1.5
	this.spacing = 1
	
	
	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_fractions = [[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],
		[1,6],[5,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,8],[3,8],[5,8],[7,8],
		[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,10],[3,10],[7,10],[9,10]]
		   let liste_type_de_questions=[]
		switch (parseInt(this.sup)) {
			case 1: liste_type_de_questions=combinaison_listes([1],this.nb_questions);
				break;
			case 2: liste_type_de_questions=combinaison_listes([2],this.nb_questions);
				break;
			case 3: liste_type_de_questions=combinaison_listes([3],this.nb_questions);
				break;
			case 4: liste_type_de_questions=combinaison_listes([1,2,3],this.nb_questions);

		}
		for (let i = 0,fraction,ns,ds, a,  texte, texte_corr, cpt = 0; i < this.nb_questions && cpt<50;) {

			switch (liste_type_de_questions[i]) {
			case 1: a = randint(1,20); // x²=a*a donc x=a ou -a.
				texte = `$x^2=${a*a}$`
				texte_corr = `$x^2=${a*a}$ équivaut à $x = \\sqrt{${a*a}}$ ou $x = -\\sqrt{${a*a}}$<br>Soit $x = ${a}$ ou $x = -${a}$<br>`
				texte_corr += `Il est équivalent de résoudre $x^2 - ${a*a}=0$ c'est à dire $x^2 - ${a}^{2}=0$ <br>Soit $(x - ${a})(x + ${a})=0$ qui donne les deux solutions ci-dessus. `
				break;
			case 2: // x²=(ns*ns)/(ds*ds) solutions rationnelles
				fraction = choice(liste_fractions);
				ns=fraction[0]
				ds=fraction[1]
				texte = `$x^2=\\dfrac{${ns*ns}}{${ds*ds}}$`
				texte_corr = `$x^2=\\dfrac{${ns*ns}}{${ds*ds}}$ équivaut à $x = \\sqrt{\\dfrac{${ns*ns}}{${ds*ds}}}$ ou $x = -\\sqrt{\\dfrac{${ns*ns}}{${ds*ds}}}$<br>Soit $x = \\dfrac{${ns}}{${ds}}$ ou $x = -\\dfrac{${ns}}{${ds}}$<br>`
				texte_corr += `Il est équivalent de résoudre $x^2 - \\dfrac{${ns*ns}}{${ds*ds}}=0$ c'est à dire $x^2 - (\\dfrac{${ns}}{${ds}})^{2}=0$<br>Soit $(x - \\dfrac{${ns}}{${ds}})(x + \\dfrac{${ns}}{${ds}})=0$ qui donne les deux solutions ci-dessus. `
				break;
				
			case 3: a = randint(2,50,[4,9,16,25,36,49]); 	//solution irrationnelles
					texte = `$x^2=${a}$`
					texte_corr = `$x^2=${a}$ équivaut à $x = \\sqrt{${a}}$ ou $x = -\\sqrt{${a}}$<br>`
					texte_corr += `Il est équivalent de résoudre $x^2 - ${a}=0$  c'est à dire $x^2 - (\\sqrt{${a}})^{2}=0$<br>Soit $(x - \\sqrt{${a}})(x + \\sqrt{${a}})=0$ qui donne les deux solutions ci-dessus. `
				break;

		}
		if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,'1 : solutions entières\n 2 : solutions rationnelles\n 3 : Solutions irrationnelles\n 4 : Mélange des 3 autres niveaux'];
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
 
function fonction_notion_vocabulaire(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Fonctions : Notion et vocabulaire"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =``;
	this.consigne += "Lorsqu'un nombre $\\textit{x}$ entre dans une machine mathématique , celle-ci renvoie à la sortie un nombre appelé $\\textit{image de x}$.<br>";
	this.consigne += "On dit que le nombre de départ est un $\\textit{antécédent}$ du nombre qu'on trouve à la sortie.<br>";
	this.consigne += "Ces machines sont appelées $\\textit{fonctions}$, on a l'habitude de leur donner des noms $\\textit{f}$ ou $\\textit{g}$ ou $\\textit{h} \\ldots$";
	this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 4;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	var num_ex = '3F1-act'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {		
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
		var hauteur_svg = 100;
	} else { // sortie LaTeX

	};
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheFonctions-3F1-act.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")		
			this.bouton_aide += modal_video('conteMathsFonctions','videos/Fonctions.mp4','Petit conte mathématique','Intro Vidéo');
//			if (detect_safari_chrome_browser()) {// si c'est safari ou chrome
				this.consigne += machine_maths_video(`videos/machineMathsIntro.mp4`);
			// } else {
			// 	let id_unique = `_consigne_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons		
			// 	let id_du_div = `div_svg${id_unique}`;
			// 	this.consigne += `<div id="${id_du_div}" style="width: ${pourcentage}; height: ${hauteur_svg}px; display : table "></div>`;
			// 	SVG_machine_maths(id_du_div,400,hauteur_svg,'machine\\,maths','---','Procédé','de\\,calcul','antécédent','x','image','y');
			// };
		} else { // sortie LaTeX
			// this.consigne += `machine Tikz HEX #F15929 équivaut à rgb(241,89,41)<br>`;
			this.consigne += tikz_machine_maths('maths','---',`Proc\\acute{e}d\\acute{e}`,'de\\,calcul',`ant\\acute{e}c\\acute{e}dent`,`\\textit{x}`,`image`,`\\textit{y}`);	
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, x,y,z, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
				
				if (sortie_html) {
					var id_unique = `${num_ex}_${i}_${Date.now()}`
					var id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
					var id_du_div_diag = `div_svg_diag${numero_de_l_exercice}${id_unique}`;
					var id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
				}
	
				switch (type_de_questions) {
					case 1 : // périmètre d'un carré de côté x			
						var j = 0; // pour la sous-numérotation
						// question
						if (sortie_html){
							texte = `La $\\mathbf{machine\\,f}$ renvoie le `+katex_Popup(`périmètre`,`Rappel`,`Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés`)+` d'un carré de côté $x$`;
						} else {
							texte = `La $\\mathbf{machine\\,f}$ renvoie le \\textbf{périmètre} \\footnote{\\textbf{Rappel :} Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés} d'un carré de côté $x$`;
						}
						texte += `<br>`;
						// machine						
						x = randint(2,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html) {
							//texte += `<br>`;
							// if (detect_safari_chrome_browser()) {// si c'est safari ou chrome
								texte += machine_maths_video(`videos/machineMaths-g.mp4`);
							// } else {
							// 	texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							// 	SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, f','---','périmètre','d\'un \\, carré','carré \\, de','côté \\,'+x+' \\, cm','périmètre','??? \\, cm');							
							// };
						} else { // sortie Latex avec Tikz
							texte += tikz_machine_maths('f','---',`P\\acute{e}rim\\grave{e}tre`,`d'un\\,carr\\acute{e}`,`carr\\acute{e}\\,de`,`c\\hat{o}t\\acute{e}\\,${x}\\,cm`,`P\\acute{e}rim\\grave{e}tre`,`???\\,cm`);
						};
						// sous question a/						
						if (sortie_html){
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
							texte += katex_Popup('avec le mot image','Image','La valeur du périmètre est l\'image de la valeur du côté')+`<br>`;
							texte_corr = num_alpha(j)+`Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire $${x}+${x}+${x}+${x} = 4\\times ${x} = ${4*x}$ cm.<br>`;
							texte_corr += `On dit que ${4*x} est l'image de ${x} par la fonction f.<br>`;						
							j++;//incrémente la sous question	
						} else { //sortie LaTeX
							texte += `\\begin{enumerate}[itemsep=1em]`;
							texte += `\\item Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse avec le mot \\textbf{image} \\footnote{\\textbf{Image :} La valeur du périmètre est l\'image de la valeur du côté}`;														
							texte_corr =`\\begin{enumerate}[itemsep=1em]`;
							texte_corr += `\\item Si le côté vaut ${x} cm alors la machine renvoie le périmètre d'un carré de côté ${x} cm, c'est à dire $${x}+${x}+${x}+${x} = 4\\times ${x} = ${4*x}$ cm.<br>`;
							texte_corr += `On dit que ${4*x} est l'image de ${x} par la fonction f.`;						
						};

						// sous question b/	
						y = randint(2,99,[x]);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
							texte += num_alpha(j)+` Combien vaut le côté si la machine renvoie  ${4*y} cm ? Formuler la réponse `;
							texte += katex_Popup('avec le mot antécédent','Antécédent','un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre')+`<br>`;
							texte_corr += num_alpha(j)+`Si la machine renvoie un périmètre de ${4*y} cm alors le côté du carré vaut $${4*y}\\div 4 = ${y}$ cm.<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${4*y} par la fonction f.<br>`;						
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\item Combien vaut la longueur du côté si la machine renvoie  ${4*y} cm ? Formuler la réponse avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent de la valeur d\'un périmètre est une valeur du côté qui a pour image ce périmètre}`;
							texte_corr += `\\item Si la machine renvoie un périmètre de ${4*y} cm alors le côté du carré vaut $${4*y}\\div 4 = ${y}$ cm.<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${4*y} par la fonction f.`;						
						};			

						// sous question c/
						z = randint(2,99,[x,y]);//augmenter les possibles pour éviter les questions déjà posées?						
						if (sortie_html){
							texte += num_alpha(j)+` Quelle est l'image de ${z} par la `; 
							texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');														
							texte += ` $f$ ? &Eacute;crire la réponse sous la forme `;
							texte += katex_Popup('$\\mathbf{f('+z+')=\\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>')+`<br>`;
							texte_corr += num_alpha(j)+`L'image de ${z} par la fonction f vaut $f(${z})=4\\times ${z}=${4*z}$.<br>`;
							j++;//incrémente la sous question	
						} else { // sortie LaTeX
							texte += `\\item Quelle est l'image de ${z} par la \\textbf{fonction f} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques}`;														
							texte += ` ? \\'{E}crire la réponse sous la forme $\\mathbf{f(${z})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;
							texte_corr += `\\ item L'image de ${z} par la fonction f vaut $f(${z})=4\\times ${z}=${4*z}$.<br>`;		
						};

						// sous question d/
						if (sortie_html) {
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
							texte_corr += num_alpha(j)+`Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ce qui est équivalent à $4\\times x$ .<br>`;
							j++;//incrémente la sous question	
 						} else { // sortie LaTeX
							texte += `\\item   Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
							texte_corr += `\\item  Si le côté vaut $x$ la machine renvoie $x+x+x+x$ ce qui est équivalent à $4\\times x$ .<br>`;			
						};

						// sous question e/
						if (sortie_html) {
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-1)+` sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui triple `;
							texte += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag_3F1_act_mono(id_du_div_diag,800,100,'f','x',[['3','3x']]);
							texte_corr += num_alpha(j)+`C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
							 texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag_3F1_act_mono(id_du_div_corr,800,100,'f','x',[['4','4x']]);
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item   \\'{E}crire la réponse à la question d/ sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui triple <br> `;
							texte += tikz_machine_diag(`f`,`x`,[[`\\times 3`,`3x`]]);
							texte_corr += `\\item  C'est une machine qui quadruple, donc sous forme de diagramme.<br>`;
							texte_corr += tikz_machine_diag(`f`,`x`,[[`\\times 4`,`4x`]]);
						};

						// sous question f/
						if (sortie_html) {
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-2)+` sous la forme `;
							texte += katex_Popup('$\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire <b>f(4)=16</b>')+`<br>`;							
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item   \\'{E}crire la réponse à la question d/ sous la forme $\\mathbf{f(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f(4)=16}$}`;							
							texte_corr += `\\item  L'image de $x$ par la fonction f vaut $4\\times x$ donc $f(x)=4\\times x$.<br>`;		
						};

						// sous question g/
						if (sortie_html){
							texte += num_alpha(j)+` En utilisant la forme `;
							texte += katex_Popup('$\\mathbf{f:\\textbf{\\textit{x}}\\longmapsto \\ldots}$','Notation','4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f:4\\longmapsto 16}$');							
							texte+=  `écrire la réponse à la question `+num_alpha(j-3)+`<br>`;
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction f vaut $4\\times x$ donc $f:x\\longmapsto 4\\times x$.<br>`;												
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item   En utilisant la forme $\\mathbf{f:\\textbf{\\textit{x}}\\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction f peut s\'écrire $\\mathbf{f:4\\longmapsto 16}$},`;							
							texte+= ` écrire la réponse à la question d/`;
							texte_corr += `\\item  L'image de $x$ par la fonction f vaut $4\\times x$ donc $f:x\\longmapsto 4\\times x$.`;	
							texte += `\\end{enumerate}`;
							texte_corr += `\\end{enumerate}`;							
						};
						break;			
					case 2 : // aire d'un carré de côté x
						var j = 0; // pour la sous-numérotation
						if (sortie_html) {
							texte = `La $\\textbf{machine\\,g}$ renvoie `+katex_Popup('l\'aire','Rappel','L\'aire d\'un carré est égale au produit de la longueur de son côté par lui-même.')+` d'un carré de côté $x$`;			
						} else {
							texte = `La $\\textbf{machine\\,g}$ renvoie \\textbf{l\'aire} \\footnote{\\textbf{Rappel :} L\'aire d\'un carré est égale au produit de la longueur de son côté par lui-même.} d'un carré de côté $x$`;			
						}
						texte += `<br>`;
						// machine
						x = randint(2,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html) {
							//texte += `<br>`;
							//if (detect_safari_chrome_browser()) {// si c'est safari ou chrome
								texte += machine_maths_video(`videos/machineMaths-f.mp4`);
							// } else {
							// 	texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							// 	SVG_machine_maths(id_du_div,400,hauteur_svg,'machine\\,g','---','aire','d\'un \\, carré','carré \\, de','côté \\, '+x+'\\, cm','aire','??? \\, cm^2');							
							// };
						} else { // sortie Latex avec Tikz
							//texte += `figure Tikz<br>`;
							texte += tikz_machine_maths('g','---',`Aire`,`d'un\\,carr\\acute{e}`,`carr\\acute{e}\\,de`,`c\\hat{o}t\\acute{e}\\,${x}\\,cm`,`Aire`,`???\\,cm^2`);
						};
						// sous question a/	
						if (sortie_html){
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
							texte += katex_Popup('avec le mot image','Image','la valeur de l\'aire est l\'image de la valeur du côté')+`<br>`;
							texte_corr = num_alpha(j)+`Si le côté vaut ${x} cm alors la machine renvoie l'aire d'un carré de côté ${x} cm, c'est à dire $${x}\\times ${x}=${x*x}\\,cm^2$.<br>`;
							texte_corr += `On dit que ${x*x} est l'image de ${x} par la fonction g.<br>`;						
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\begin{enumerate}[itemsep=1em]`;
							texte += `\\item  Que renvoie la machine si le côté vaut  ${x}  cm ? Formuler la réponse `;
							texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image :} La valeur de l\'aire est l\'image de la valeur du côté.}<br>`;
							texte_corr = `\\begin{enumerate}[itemsep=1em]`;
							texte_corr += `\\item Si le côté vaut ${x} cm alors la machine renvoie l'aire d'un carré de côté ${x} cm, c'est à dire $${x}\\times ${x}=${x*x}\\,cm^2$.<br>`;
							texte_corr += `On dit que ${x*x} est l'image de ${x} par la fonction g.<br>`;									
						};
						
						// sous question b/	
						y = randint(2,99,[x]);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
							texte += num_alpha(j)+` Combien vaut le côté si la machine renvoie  ${y*y} cm<sup>2</sup> ? Formuler la réponse `;
							texte += katex_Popup('avec le mot antécédent','Antécédent','un antécédent de la valeur d\'une aire est une valeur du côté qui a pour image cette aire')+`<br>`;
							texte_corr += num_alpha(j)+`Si la machine renvoie une aire de $${y*y}\\,cm^2$ alors le côté du carré vaut $\\sqrt{${y*y}}=${y}\\,cm$.<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${y*y} par la fonction g.<br>`;						
							j++;//incrémente la sous question	
						} else { //sortie LaTeX
							texte += `\\item  Combien vaut la longueur du côté si la machine renvoie  ${y*y} $cm^2$ ? Formuler la réponse `;
							texte += `avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent de la valeur d\'une aire est une valeur du côté qui a pour image cette aire}<br>`;
							texte_corr += `\\item Si la machine renvoie une aire de $${y*y}\\,cm^2$ alors le côté du carré vaut $\\sqrt{${y*y}}=${y}\\,cm$.<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${y*y} par la fonction g.<br>`;						
						};														
						
						// sous question c/
						z = randint(2,99,[x,y]);//augmenter les possibles pour éviter les questions déjà posées?							
						if (sortie_html){
							texte += num_alpha(j)+` Quelle est l'image de ${z} par la `; 
							texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');														
							texte += ` $g$ ? &Eacute;crire la réponse sous la forme `;
							texte += katex_Popup('$\\mathbf{g('+z+')=\\ldots}$','Notation','4 a pour image 16 par la fonction g peut s\'écrire <b>g(4)=16</b>')+`<br>`;
							texte_corr += num_alpha(j)+`L'image de ${z} par la fonction g vaut $g(${z})=${z}\\times ${z}=${z*z}$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  Quelle est l'image de ${z} par la `; 
							texte += `\\textbf{fonction g} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques.}`;														
							texte += ` ? \\'{E}crire la réponse sous la forme `;
							texte += `$\\mathbf{g(${z})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire \\textbf{g(4)=16}}<br>`;
							texte_corr += `\\item L'image de ${z} par la fonction g vaut $g(${z})=${z}\\times ${z}=${z*z}$.<br>`;
						};
						
						// sous question d/
						if (sortie_html) {
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
							texte_corr += num_alpha(j)+`Si le côté vaut $x$ la machine renvoie $x\\times x$ ce qui est équivalent à $x^2$ .<br>`;
							j++;//incrémente la sous question	
						} else {
							texte += `\\item  Que renvoie la machine si le côté vaut $x$ cm ?<br>`;
							texte_corr += `\\item Si le côté vaut $x$ la machine renvoie $x\\times x$ ce qui est équivalent à $x^2$ .<br>`;
						};

						// sous question e/
						if (sortie_html) {
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-1)+` sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui double `;
							texte += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag_3F1_act_mono(id_du_div_diag,800,100,'g','x',[['2','2x']]);
							texte_corr += num_alpha(j)+`C'est une machine qui multiplie un nombre par lui-même, donc sous forme de diagramme.<br>`;
							texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;
							SVG_machine_diag_3F1_act_mono(id_du_div_corr,800,100,'g','x',[['x','x²']]);
							j++;//incrémente la sous question
						} else {
							texte += `\\item  \\'{E}crire la réponse à la question d/ sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui double <br>`;
							texte += tikz_machine_diag(`g`,`x`,[[`\\times 2`,`2x`]]);
							texte_corr += `\\item C'est une machine qui multiplie un nombre par lui-même, donc sous forme de diagramme.<br>`;
							texte_corr += tikz_machine_diag(`g`,`x`,[[`\\times x`,`x^2`]]);
						};

						// sous question f/
						if (sortie_html){
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-2)+` sous la forme `;
							texte += katex_Popup('$\\mathbf{g(\\textbf{\\textit{x}})=\\ldots}$','Notation','4 a pour image 16 par la fonction g peut s\'écrire <b>g(4)=16</b>')+`<br>`;							
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction g vaut $x\\times x = x^2$ donc $g(x)=x\\times x=x^2$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  \\'{E}crire la réponse à la question d/ sous la forme `;
							texte += `$\\mathbf{g(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire \\textbf{g(4)=16}}<br>`;							
							texte_corr += `\\item L'image de $x$ par la fonction g vaut $x\\times x = x^2$ donc $g(x)=x\\times x=x^2$.<br>`;
						};

						// sous question g/
						if (sortie_html){							
							texte += num_alpha(j)+` En utilisant la forme `;
							texte += katex_Popup('$\\mathbf{g:\\textbf{\\textit{x}} \\longmapsto \\ldots}$','Notation','4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g:4\\longmapsto 16}$');							
							texte+= ` écrire la réponse à la question `+num_alpha(j-3)+`<br>`;
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction g vaut $x\\times x=x^2$ donc $g:x\\longmapsto x\\times x=x^2$.<br>`;												
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  En utilisant la forme `;
							texte += `$\\mathbf{g:\\textbf{\\textit{x}} \\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction g peut s\'écrire $\\mathbf{g:4\\longmapsto 16}$'}`;							
							texte+= ` écrire la réponse à la question d/ <br>`;
							texte_corr += `\\item L'image de $x$ par la fonction g vaut $x\\times x=x^2$ donc $g:x\\longmapsto x\\times x=x^2$.<br>`;												
							texte += `\\end{enumerate}`;
							texte_corr += `\\end{enumerate}`;
						};						
						break;			
					case 3 : // somme de 1 et du triple de x
						var j = 0; // pour la sous-numérotation
						// consigne
						texte = `La $\\mathbf{machine\\,h}$ renvoie la somme du triple de du nombre de départ et de 1.`;						
						texte += `<br>`;
						// machine
						x = randint(2,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html) {
							//texte += `<br>`;
							//if (detect_safari_chrome_browser()) {// si c'est safari ou chrome
								texte += machine_maths_video(`videos/machineMaths-h.mp4`);
							// } else {
							// 	texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							// 	SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, h','---','multiplier \\, par \\, 3','ajouter \\, 1','nombre \\, de','départ \\, '+x,'nombre \\, de','sortie \\, ?');
							// };
						} else { // sortie Latex avec Tikz
							texte += tikz_machine_maths('h','---',`Multiplier\\,par\\,3`,`Ajouter\\,1`,`nombre\\,de`,`d\\acute{e}part\\,${x}`,`nombre\\,de`,`sortie\\,?`);
						};
						// sous question a/
						if (sortie_html){
							texte += num_alpha(j)+` Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
							texte += katex_Popup('avec le mot image','Image','l\'image de la valeur à la sortie de la machine')+`<br>`;
							texte_corr = num_alpha(j)+`Si le nombre de départ vaut ${x} alors la machine renvoie $3\\times${x} + 1 = ${3*x+1}$<br>`;
							texte_corr += `On dit que ${3*x+1} est l'image de ${x} par la fonction g.<br>`;						
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\begin{enumerate}[itemsep=1em]`;
							texte += `\\item  Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
							texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image :} L\'image de la valeur à la sortie de la machine.}<br>`;
							texte_corr = `\\begin{enumerate}[itemsep=1em]`;
							texte_corr += `\\item Si le nombre de départ vaut ${x} alors la machine renvoie $3\\times${x} + 1 = ${3*x+1}$<br>`;
							texte_corr += `On dit que ${3*x+1} est l'image de ${x} par la fonction g.<br>`;						
						};

						// sous question b/
						y = randint(2,99,[x]);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
							texte += num_alpha(j)+` Combien vaut le nombre de départ si la machine renvoie  ${3*y+1} ? Formuler la réponse `;
							texte += katex_Popup('avec le mot antécédent','Antécédent','un antécédent d\'une valeur de sortie est une valeur du nombre de départ dont l\'image est ce nombre de sortie')+`<br>`;
							texte_corr += num_alpha(j)+`Si la machine renvoie $${3*y+1}$ alors le nombre de départ vaut $(${3*y+1}-1)\\div 3=${y}$<br>`;
							texte_corr += `On dit que ${y} est <b>un</b> antécédent de ${3*y+1} par la fonction g.<br>`;						
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\item  Combien vaut le nombre de départ si la machine renvoie  ${3*y+1} ? Formuler la réponse `;
							texte += `avec le mot \\textbf{antécédent} \\footnote{\\textbf{Antécédent :} Un antécédent d\'une valeur de sortie est une valeur du nombre de départ dont l\'image est ce nombre de sortie.}<br>`;
							texte_corr += `\\item Si la machine renvoie $${3*y+1}$ alors le nombre de départ vaut $(${3*y+1}-1)\\div 3=${y}$<br>`;
							texte_corr += `On dit que ${y} est \\textbf{un} antécédent de ${3*y+1} par la fonction g.<br>`;						
						};														

						// sous question c/
						z = randint(2,99,[x,y]);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
							texte += num_alpha(j)+` Quelle est l'image de ${-z} par la `; 
							texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');														
							texte += ` $h$ ? &Eacute;crire la réponse sous la forme `;
							texte += katex_Popup('$\\mathbf{h('+(-z)+')=\\ldots}$','Notation','4 a pour image 16 par la fonction h peut s\'écrire <b>h(4)=16</b>')+`<br>`;
							texte_corr += num_alpha(j)+`L'image de ${-z} par la fonction h vaut $h(${-z})=3\\times (${-z})+1=${-3*z+1}$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  Quelle est l'image de ${-z} par la `; 
							texte += `\\textbf{fonction h} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques}`;														
							texte += ` ? \\'{E}crire la réponse sous la forme `;
							texte += `$\\mathbf{h(${-z})=\\ldots}$ \\footnote{\\textbf{Notation : } 4 a pour image 16 par la fonction h peut s\'écrire \\textbf{h(4)=16}}<br>`;
							texte_corr += `\\item L'image de ${-z} par la fonction h vaut $h(${-z})=3\\times (${-z})+1=${-3*z+1}$.<br>`;
						};

						// sous question d/
						if (sortie_html) {
							texte += num_alpha(j)+` Que renvoie la machine si le côté vaut $x$ ?<br>`;
							texte_corr += num_alpha(j)+`Si le côté vaut $x$ la machine renvoie $3\\times x + 1$ ce qui est équivalent à $3x + 1$ .<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  Que renvoie la machine si le côté vaut $x$ ?<br>`;
							texte_corr += `\\item Si le côté vaut $x$ la machine renvoie $3\\times x + 1$ ce qui est équivalent à $3x + 1$ .<br>`;
							j++;//incrémente la sous question
						};

						// sous question e/
						if (sortie_html) {
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-1)+` sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui double puis qui ajoute 5 `;
							texte += `<div id="${id_du_div_diag}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;						 
							SVG_machine_diag_3F12(id_du_div_diag,800,100,'h','x',[['2','2x'],['5','2x+5']]);
							texte_corr += num_alpha(j)+`C'est une machine qui triple un nombre et ajoute 1, donc sous forme de diagramme.<br>`;
							texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;							
							SVG_machine_diag_3F12(id_du_div_corr,800,100,'h','x',[['3','3x'],['1','3x+1']]);
							j++;//incrémente la sous question
						} else {
							texte += `\\item  \\'{E}crire la réponse à la question d/ sous forme de diagramme.<br>`;
							texte += `Voici le diagramme d'une machine qui double puis qui ajoute 5 <br>`;
							texte += tikz_machine_diag(`h`,`x`,[[`\\times 2`,`2x`],[`+5`,`2x+5`]]);
							texte_corr += `\\item C'est une machine qui triple un nombre et ajoute 1, donc sous forme de diagramme.<br>`;
							texte_corr += tikz_machine_diag(`h`,`x`,[[`\\times 3`,`3x`],[`+1`,`3x+1`]]);
						};

						// sous question f/
						if (sortie_html){
							texte += num_alpha(j)+` &Eacute;crire la réponse à la question `+num_alpha(j-2)+` sous la forme `;
							texte += katex_Popup('$\\mathbf{h(\\textbf{\\textit{x}})=\\ldots}$','Notation','4 a pour image 16 par la fonction h peut s\'écrire <b>h(4)=16</b>')+`<br>`;							
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction h vaut $3\\times x + 1 = 3x + 1$ donc $h(x)=3\\times x + 1$ soit $h(x) = 3x + 1$.<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  \\'{E}crire la réponse à la question d/ sous la forme `;
							texte += `$\\mathbf{h(\\textbf{\\textit{x}})=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction h peut s\'écrire \\textbf{h(4)=16}}<br>`;							
							texte_corr += `\\item L'image de $x$ par la fonction h vaut $3\\times x + 1 = 3x + 1$ donc $h(x)=3\\times x + 1$ soit $h(x) = 3x + 1$.<br>`;
						};
						
						// sous question g/
						if (sortie_html){							
							texte += num_alpha(j)+` En utilisant la forme `;
							texte += katex_Popup('$\\mathbf{h:\\textbf{\\textit{x}} \\longmapsto \\ldots}$','Notation','4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h:4\\longmapsto16}$');
							texte+= ` écrire la réponse à la question `+num_alpha(j-3)+`<br>`;
							texte_corr += num_alpha(j)+`L'image de $x$ par la fonction h vaut $3\\times x +1= 3x + 1$ donc $h : x \\longmapsto 3\\times x + 1$ soit $h : x \\longmapsto 3x + 1$.<br>`;												
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item  En utilisant la forme `;
							texte += `$\\mathbf{h:\\textbf{\\textit{x}} \\longmapsto \\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction h peut s\'écrire $\\mathbf{h:4\\longmapsto16}$}`;
							texte+= ` écrire la réponse à la question d/<br>`;
							texte_corr += `\\item L'image de $x$ par la fonction h vaut $3\\times x +1= 3x + 1$ donc $h : x \\longmapsto 3\\times x + 1$ soit $h : x \\longmapsto 3x + 1$.<br>`;												
							texte += `\\end{enumerate}`;
							texte_corr += `\\end{enumerate}`;
						};						
						break;
					case 4 : // nombre de diviseurs de x entier
						var j = 0; // pour la sous-numérotation
						// consigne
						texte = `La $\\mathbf{machine\\,d}$, qui n'accepte que des nombres entiers positifs, renvoie le nombre de diviseurs du nombre de départ.`;
						texte += `<br>`;
						// machine
						x = randint(2,51);//augmenter les possibles pour éviter les questions déjà posées?						
						if (sortie_html) {
							//texte += `<br>`;
							//if (detect_safari_chrome_browser()) {// si c'est safari ou chrome
								texte += machine_maths_video(`videos/machineMaths-d.mp4`);
							// } else {
							// 	texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							// 	SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, d','---','nombre \\enspace total','de  \\, diviseurs','nombre \\, de','départ \\,'+x,'nombre \\, de',' diviseurs');														
							// };
						} else { // sortie Latex avec Tikz
							//texte += `figure Tikz<br>`;
							texte += tikz_machine_maths('d','---',`nombre \\, total`,`de \\, diviseurs`,`nombre\\,de`,`d\\acute{e}part\\,${x}`,`nombre \\, de`,`diviseurs`);
						};
						// sous question a/
						if (sortie_html) {
							texte += num_alpha(j)+` Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
							texte += katex_Popup('avec le mot image','Image','l\'image de la valeur à la sortie de la machine')+`<br>`;
							texte_corr = num_alpha(j)+`Pour trouver la liste des diviseurs de ${x} on cherche tous les produits de deux facteurs qui donnent ${x}<br>`;
							j++;//incrémente la sous question
						} else { //sortie LaTeX
							texte += `\\begin{enumerate}[itemsep=1em]`;
							texte += `\\item Que renvoie la machine si le nombre de départ vaut  ${x} ? Formuler la réponse `;
							texte += `avec le mot \\textbf{image} \\footnote{\\textbf{Image : } L\'image de la valeur à la sortie de la machine}<br>`;
							texte_corr = `\\begin{enumerate}[itemsep=1em]`;
							texte_corr += `\\item Pour trouver la liste des diviseurs de ${x} on cherche tous les produits de deux facteurs qui donnent ${x}<br>`;
						};
						if (liste_diviseurs(x).length%2==0) {//si il y a un nombre pair de diviseurs
							for (let m = 0; m<(liste_diviseurs(x).length/2); m++){
								texte_corr += `$`+liste_diviseurs(x)[m]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-m-1)]+`$<br>`;
							};
						} else {
							for (let m = 0; m<((liste_diviseurs(x).length-1)/2); m++){
								texte_corr += `$`+liste_diviseurs(x)[m]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-m-1)]+`$<br>`;
							};
							texte_corr += `$`+liste_diviseurs(x)[(liste_diviseurs(x).length-1)/2]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-1)/2]+`$<br>`;
						};
						texte_corr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${x}<br>`;
						texte_corr += `La liste des diviseurs de ${x} est donc `+liste_diviseurs(x)+`; Cette liste compte `+liste_diviseurs(x).length+` nombres. <br>`;
						texte_corr += `Donc `+liste_diviseurs(x).length+` est l'image de ${x} par la fonction d.<br>`;	
					
						// sous question b/
						x = randint(1,9);//augmenter les possibles pour éviter les questions déjà posées?
						if (sortie_html) {
							texte += num_alpha(j)+` Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ?<br>`;
							texte_corr += num_alpha(j)+`Si la machine renvoie 2 alors le nombre de départ  a exactement 2 diviseurs, tous les`;
							texte_corr += katex_Popup('nombres premiers','Nombre premier','Un nombre entier est un <b>nombre premier</b> si il a exactement deux diviseurs, 1 et lui-même.');					
						 	texte_corr += `conviennent.<br>`;
						 	texte_corr += `2 est premier donc 2 est <b>un</b> antécédent de 2 par la fonction d.<br>`;						
						 	texte_corr += `7 est premier donc 7 est <b>un autre</b> antécédent de 2 par la fonction d.<br>`;	
						 	j++;//incrémente la sous question
						} else {
						 	texte += `\\item Quelle est une valeur possible du nombre de départ si la machine renvoie  2 ?<br>`;
						 	texte_corr += ` \\item Si la machine renvoie 2 alors le nombre de départ  a exactement 2 diviseurs, tous les`;
						 	texte_corr += `\\textbf{nombres premiers} \\footnote{\\textbf{Nombre premier :} Un nombre entier est un \\textbf{nombre premier} si il a exactement deux diviseurs, 1 et lui-même.}`;
							texte_corr += `conviennent.<br>`;
							texte_corr += `2 est premier donc 2 est \\textbf{un} antécédent de 2 par la fonction d.<br>`;						
						 	texte_corr += `7 est premier donc 7 est \\textbf{un autre} antécédent de 2 par la fonction d.<br>`;	
						};				
				
						// sous question c/
						x = randint(51,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html){
						 	texte += num_alpha(j)+` Quelle est l'image de ${x} par la `; 
						 	texte += katex_Popup('fonction','Vocabulaire','<b>fonction</b> est le nom que l\'on donne à ces machines mathématiques');														
						 	texte += ` $d$ ? &Eacute;crire la réponse sous la forme `;
						 	texte += katex_Popup('$\\mathbf{d('+(x)+')=\\ldots}$','Notation','4 a pour image 16 par la fonction d peut s\'écrire <b>d(4)=16</b>')+`<br>`;
						 	texte_corr += num_alpha(j)+`Pour trouver l'image de ${x} on peut par exemple chercher tous ses diviseurs et les compter<br>`;
							j++;//incrémente la sous question
						} else { // sortie LaTeX
							texte += `\\item Quelle est l'image de ${x} par la `; 
							texte += `\\textbf{fonction d} \\footnote{\\textbf{Vocabulaire :} \\textit{fonction} est le nom que l\'on donne à ces machines mathématiques.}`;														
							texte += ` ? \\'{E}crire la réponse sous la forme `;
							texte += `$\\mathbf{d('+(x)+')=\\ldots}$ \\footnote{\\textbf{Notation :} 4 a pour image 16 par la fonction d peut s\'écrire \\textbf{d(4)=16}}<br>`;
							texte_corr += `\\item Pour trouver l'image de ${x} on peut par exemple chercher tous ses diviseurs et les compter<br>`;
						};
						if (liste_diviseurs(x).length%2==0) {//si il y a un nombre pair de diviseurs
							for (let m = 0; m<(liste_diviseurs(x).length/2); m++){
								texte_corr += `$`+liste_diviseurs(x)[m]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-m-1)]+`$<br>`;
							};
						} else {
							for (let m = 0; m<((liste_diviseurs(x).length-1)/2); m++){
							   texte_corr += `$`+liste_diviseurs(x)[m]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-m-1)]+`$<br>`;
						   };
						   texte_corr += `$`+liste_diviseurs(x)[(liste_diviseurs(x).length-1)/2]+`\\times`+liste_diviseurs(x)[(liste_diviseurs(x).length-1)/2]+`$<br>`;
					   };
					   texte_corr += `La liste des diviseurs de ${x} est donc `+liste_diviseurs(x)+`; Cette liste compte `+liste_diviseurs(x).length+` nombres.<br>`;
					   texte_corr += `Donc `+liste_diviseurs(x).length+` est l'image de ${x} par la fonction d.<br>`;	

						// sous question d/
						if (sortie_html) {
							texte += num_alpha(j)+` Peut-on trouver deux antécédents de 3 par la fonction d ?<br>`;
							texte_corr += num_alpha(j)+`Il faut trouver des nombres qui ont exactement 3 diviseurs.<br>`;
							j++;//incrémente la sous question
						} else {
							texte += `\\item  Peut-on trouver deux antécédents de 3 par la fonction d ?<br>`;
							texte_corr += `\\item Il faut trouver des nombres qui ont exactement 3 diviseurs.<br>`;
						}	
						texte_corr += `La liste des diviseurs de 9 est `+liste_diviseurs(9)+`; Cette liste compte `+liste_diviseurs(9).length+` nombres, `;
						texte_corr += `donc 9 est un antécédent de 3 par la fonction d.<br>`;
						texte_corr += `La liste des diviseurs de 25 est `+liste_diviseurs(25)+`; Cette liste compte `+liste_diviseurs(25).length+` nombres, `;
						texte_corr += `donc 25 est un antécédent de 3 par la fonction d.<br>`;
						texte_corr += `Tu peux en trouver d'autres, qu'ont ils de commun ?`
						if (!sortie_html) {
							texte += `\\end{enumerate}`;
							texte_corr += `\\end{enumerate}`;						
						};
						break;																
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
	this.sup = 1 ; 
	this.titre = "Fonctions : Calculs d'images"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =``;
	 // pas de différence entre la version html et la version latex pour la consigne
	 this.consigne +=`Calcule les images avec la méthode demandée.`;

	 sortie_html ? this.spacing = 3 : this.spacing = 2;
	 sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
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
	 this.nouvelle_version = function(numero_de_l_exercice){
		 let type_de_questions;
		 if (sortie_html) { // les boutons d'aide uniquement pour la version html
//			 this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheFonctions-3F1-act.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")		
//			 this.bouton_aide += modal_video('videoTest','videos/Fonctions.mp4','Petit conte mathématique','Intro Vidéo');
		 }
		 this.liste_questions = []; // Liste de questions
		 this.liste_corrections = []; // Liste de questions corrigées
 
		 let type_de_questions_disponibles = [];
		 if (this.sup==1){
			type_de_questions_disponibles = [1]; // prog de calcul
		} else if (this.sup==2){
			type_de_questions_disponibles = [2]; // diagramme
		} else if (this.sup==3){
			type_de_questions_disponibles = [3]; // f(x) = ...
		} else if (this.sup==4){
			type_de_questions_disponibles = [4]; // f : x ---> ...
		} else if (this.sup==5){
			type_de_questions_disponibles = [1,2,3,4]; // mélange
		};
		 //let type_de_questions_disponibles = [1];
		 let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);
 
			 for (let i = 0, a, b, c, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				 type_de_questions = liste_type_de_questions[i];

				 if (sortie_html) {
					let id_unique = `${num_ex}_${i}_${Date.now()}`
					var id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
					var id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
				 }
				 // on part sur de l'affine avec coeff positifs, on verra ensuite
				 a = randint(2,9); 
				 b = randint(2,9);
				 c = randint(2,9);
	 
				 switch (type_de_questions) {
					case 1 :
						var j = 0; // pour la sous-numérotation
						texte = `On donne le programme de calcul suivant qui correspond à une certaine fonction :`;
						texte_corr =`Avec ce programme de calcul :`
						if (sortie_html) {
							texte +=`
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
							texte += num_alpha(j)+` Appliquer ce programme de calcul au nombre ${c}<br>`;
							texte_corr +=`<br>`+num_alpha(j)+`
							<br>
							<div class="ui compact warning message">		
							<p>							
							- On choisit le nombre ${c}<br>
							- On multiplie ce nombre par ${a} : ${a}$\\times$ ${c} = ${a*c}<br>
							- On ajoute ${b} au résultat obtenu : ${a*c}+${b}=${a*c+b}<br>
							</p>
							</div>
							<br>							
							`;
							j++;
							// sous-question b/
							texte += num_alpha(j)+` Traduire ce calcul par une phrase contenant le mot image`;
							texte_corr += num_alpha(j)+`L'image de ${c} par cette fonction vaut ${a*c+b}`;
							texte_corr += `<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par cette fonction`;
						} else {
							 texte += tex_cadre_par_orange(itemize([`Choisir un nombre`,`Multiplier ce nombre par ${a}`,`Ajouter ${b} au résultat obtenu`]));							
							// sous-question a/
							texte += tex_enumerate([`Appliquer ce programme de calcul au nombre ${c}`,`Traduire ce calcul par une phrase contenant le mot image`],this.spacing);
							//texte_corr += 
							texte_corr += tex_enumerate([tex_cadre_par_orange(itemize([`On choisit le nombre ${c}`,`On multiplie ce nombre par ${a} : $${a} \\times ${c} = ${a*c}$ `,`On ajoute ${b} au résultat obtenu : $${a*c}+${b}=${a*c+b}$`])),`L'image de ${c} par cette fonction vaut ${a*c+b}<br>On peut aussi dire que ${a*c+b} est l'image de ${c} par cette fonction`],this.spacing);							
						};			
						break;
					case 2 :
						var j = 0; // pour la sous-numérotation
						// les variables a,b,c changent sans refaire un appel à randint
						texte = `Soit $f$ la fonction définie par l'expression algébrique $f(x)=$ ${a}$x+$${b}<br>`;
						if (sortie_html) {
							// sous-question a/
							texte += num_alpha(j)+` Calculer l'image de ${c}`;
							texte +=`<br>`;
							texte_corr = num_alpha(j)+` Calculons l'image par $f$ de $x= ${c}$ :`;							
							texte_corr += `<br>$f(${mise_en_evidence('\\textit{\\textbf{x}}')})= ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$`;
							texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a}\\times ${mise_en_evidence(c)}+${b}$`;
							texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a*c}+${b}$`;
							texte_corr += `<br>$f(${mise_en_evidence(c)})= ${a*c+b}$`;
							j++;
							//sous question b/
							texte += num_alpha(j)+` Traduire ce calcul par une phrase contenant le mot image`;
							texte_corr += `<br>`+num_alpha(j)+` L'image de ${c} par la fonction $f$ vaut ${a*c+b}`;
							texte_corr += `<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $f$`;
						} else {
							// sous-question a/ et b/
							texte += tex_enumerate([`Calculer l'image de ${c}`,`Traduire ce calcul par une phrase contenant le mot image`],this.spacing);
							texte_corr = tex_enumerate([`Calculons l'image par $f$ de $x= ${c}$ :
							<br>$f(${mise_en_evidence('\\textit{\\textbf{x}}')})= ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a}\\times ${mise_en_evidence(c)}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a*c}+${b}$
							<br>$f(${mise_en_evidence(c)})= ${a*c+b}$`,`L'image de ${c} par la fonction $f$ vaut ${a*c+b}
							<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $f$`
							],this.spacing);
						};
						break;
					case 3 :
						var j = 0; // pour la sous-numérotation
						// les variables a,b,c changent sans refaire un appel à randint
						texte = `Soit $g$ la fonction définie par $g:x\\longmapsto$ ${a}$x+$${b}<br>`;
						if (sortie_html) {
							// sous-question a/
							texte += num_alpha(j)+` Calculer l'image de ${c}`;
							texte +=`<br>`;
							texte_corr = num_alpha(j)+` Calculons l'image par $g$ de $x= ${c}$ :`;
							texte_corr += `<br>$g:${mise_en_evidence('\\textit{\\textbf{x}}')}\\longmapsto ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$`;
							texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a}\\times${mise_en_evidence(c)}+${b}$`;
							texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a*c}+${b}$`;
							texte_corr += `<br>$g:${mise_en_evidence(c)}\\longmapsto ${a*c+b}$`;
							j++;
							//sous question b/
							texte += num_alpha(j)+` Traduire ce calcul par une phrase contenant le mot image`;
							texte_corr += `<br>`+num_alpha(j)+` L'image de ${c} par la fonction $g$ vaut ${a*c+b}`;
							texte_corr += `<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $g$`;
						} else {
							// sous-question a/ et b/
							texte += tex_enumerate([`Calculer l'image de ${c}`,`Traduire ce calcul par une phrase contenant le mot image`],this.spacing);
							texte_corr = tex_enumerate([`Calculons l'image par $g$ de $x= ${c}$ :
							<br>$g:${mise_en_evidence('\\textit{\\textbf{x}}')}\\longmapsto ${a} ${mise_en_evidence('\\textit{\\textbf{x}}')}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a}\\times ${mise_en_evidence(c)}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a*c}+${b}$
							<br>$g:${mise_en_evidence(c)}\\longmapsto ${a*c+b}$`,`L'image de ${c} par la fonction $g$ vaut ${a*c+b}
							<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $g$`
							],this.spacing);
						};
						break;
					case 4 :
						texte = ``;
						texte_corr = ``;
						texte_corr += `Calculer avec un diagramme `;
						var j = 0; // pour la sous-numérotation
						// les variables a,b,c changent sans refaire un appel à randint
						texte += `Soit la fonction $h$ définie par le diagramme `;
						if (sortie_html) {
							// sous-question a/
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;					 
							SVG_machine_diag_3F12(id_du_div,800,100,'h','x',[[''+a,a+'x'],[''+b,a+'x+'+b]]);					 
						 	texte += num_alpha(j)+` Calculer l'image de ${c}`;
							texte +=`<br>`;
							texte_corr +=`<br>`;
							texte_corr += num_alpha(j)+` Calculons l'image par $h$ de $x=$ ${c} :`;
							texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; display : table "></div>`;
							SVG_machine_diag_3F12(id_du_div_corr,800,100,'h',''+c,[[''+a,''+(a*c)],[''+b,''+(a*c+b)]]);
						 	j++;
						//sous question b/
						 	texte += num_alpha(j)+` Traduire ce calcul par une phrase contenant le mot image`;
						 	texte_corr += `<br>`+num_alpha(j)+` L'image de ${c} par la fonction $h$ vaut ${a*c+b}`;
						 	texte_corr += `<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $h$`;
						} else {
						 	texte += `<br>`+tikz_machine_diag(`h`,`x`,[[`\\times `+a,a+`x`],[`+`+b,a+`x+`+b]]);
						// sous-question a/ et b/
						 	texte += tex_enumerate([`Calculer l'image de ${c}`,`Traduire ce calcul par une phrase contenant le mot image`],this.spacing);
						 	texte_corr = tex_enumerate(
						 		[`Calculons l'image par $g$ de $x=$ ${c} :<br>`+tikz_machine_diag(`h`,c,[[`\\times `+a,(a*c)],[`+`+b,(a*c+b)]]),
						 		`L'image de ${c} par la fonction $g$ vaut ${a*c+b}
						 	<br> On peut aussi dire que ${a*c+b} est l'image de ${c} par la fonction $g$`
						 		],this.spacing);
						};
						break;						 
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
					this.liste_questions.push(texte);
					this.liste_corrections.push(texte_corr);
					i++;
				}
				cpt++
			}	
	
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : &Agrave; partir d'un programme de calcul\n2 : &Agrave; partir de l'expression algébrique sous forme f(x) = ...\n3 : &Agrave; partir de l'expression algébrique sous forme f : x --> ...\n4 : &Agrave; partir d'un diagramme\n5 : Mélange"]; 
 };  

 /**
  * 3F-test test de la bibliotheque d3.js
  */

  function svglibs() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Tests biblilothèques animations"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =``;
	// Message Bug SVG qui ne s'affiche pas dans la correction sans rafraichir
	if (sortie_html) {
		this.consigne = `
		<div class="ui compact warning message">		
			<p>
			<i class="exclamation triangle icon"></i>
			ATTENTION BUG CONNU<br>
			Sous Safari et Edge les animations dysfonctionnent
			</p>
			</div>
			<br>
		`;
	}	
	this.consigne += "tests biblios";
	this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 1;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	var num_ex = 'svglibs'; // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

	if (sortie_html) {		
		// let id_unique = `_consigne_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons		
		// let id_du_div = `div_svg${id_unique}`;
		var pourcentage = '100%'; // pour l'affichage des svg. On a besoin d'une variable globale
		var hauteur_svg = 100;
		this.consigne += `
		<a href="https://www.datavis.fr/index.php?page=transition" target="_blank">https://www.datavis.fr/index.php?page=transition</a>
		<br><a href="https://www.pixijs.com/" target="_blank">https://www.pixijs.com/</a>
		<br><a href="https://d3js.org/" target="_blank">https://d3js.org/</a>
		`;
		this.consigne += `<br>Ne pas mettre d'appel aux fonction de mathalea_outils.js avant l'appel de this.nouvelle_version() c'est à dire ici!!!`
		
	} else { // sortie LaTeX
		

	};
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheFonctions-3F1-act.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")		
			//this.bouton_aide += modal_video('videoTest','videos/Fonctions.mp4','Petit conte mathématique','Intro Vidéo');
			if (detect_safari_chrome_browser()) {// si c'est safari ou chrome
				this.consigne += machine_maths_video(`videos/machineMaths-h-1.mp4`);
			} else {
				let id_unique = `_consigne_${num_ex}_${Date.now()}`; // on formatte avec le numéro de l'exercice pour éviter les doublons		
				let id_du_div = `div_svg${id_unique}`;
				this.consigne += `<div id="${id_du_div}" style="width: ${pourcentage}; height: ${hauteur_svg}px; display : table "></div>`;
				//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine\\,maths','---','Procédé','de\\,calcul','antécédent','x','image','y');
				//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, f','---','périmètre','d\'un \\, carré','côté \\, du','carré','périmètre','??? \\, cm');
				//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine\\,g','---','aire','d\'un \\, carré','côté \\, du','carré','aire','??? \\, cm^2');
				//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, h','---','multiplier \\, par \\, 3','ajouter \\, 1','nombre \\, de','départ \\, ','nombre \\, de','sortie \\, ?');														
				SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, d','---','nombre \\enspace total','de  \\, diviseurs','nombre \\, de','départ','nombre \\, de',' diviseurs');

			};
			
		} else { // sortie LaTeX
			// this.consigne += `machine Tikz HEX #F15929 équivaut à rgb(241,89,41)<br>`;
			this.consigne += tikz_machine_maths('maths','---',`Proc\\acute{e}d\\acute{e}`,'de\\,calcul',`ant\\acute{e}c\\acute{e}dent`,`\\textit{x}`,`image`,`\\textit{y}`);
	
	
		};
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		//let type_de_questions_disponibles = [1,2,3,4];
		let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, x, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
				
				if (sortie_html) {
					var id_unique = `${num_ex}_${i}_${Date.now()}`
					var id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
					//var id_du_div_diag = `div_svg_diag${numero_de_l_exercice}${id_unique}`;
					var id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
					//texte = machine_maths_video(`videos/machineMaths-h-1.mp4`);
				}
	
				switch (type_de_questions) {
					case 1 : // périmètre d'un carré de côté x			
						var j = 0; // pour la sous-numérotation
						// question
						if (sortie_html){
							texte += `La $\\mathbf{machine\\,f}$ renvoie le `+katex_Popup(`périmètre`,`Rappel`,`Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés`)+` d'un carré de côté $x$`;
						} else {
							texte = `La $\\mathbf{machine\\,f}$ renvoie le \\textbf{périmètre} \\footnote{\\textbf{Rappel :} Le périmètre d'un polygone est égal à la somme des longueurs de ses côtés} d'un carré de côté $x$`;
						}
						texte += `<br>`;
						// machine						
						x = randint(2,99);//augmenter les possibles pour éviter les questions déjà posées?	
						if (sortie_html) {
							//texte += `<br>`;
							texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							texte_corr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; height: ${hauteur_svg}px; display : table "></div>`;
							//SVG_machine_maths(id_du_div,400,hauteur_svg,'machine \\, f','---','périmètre','d\'un \\, carré','carré \\, de','côté \\,'+x+' \\, cm','périmètre','??? \\, cm');							
						} else { // sortie Latex avec Tikz
							//texte += tikz_machine_maths('f','---',`P\\acute{e}rim\\grave{e}tre`,`d'un\\,carr\\acute{e}`,`carr\\acute{e}\\,de`,`c\\hat{o}t\\acute{e}\\,${x}\\,cm`,`P\\acute{e}rim\\grave{e}tre`,`???\\,cm`);
						};

						break;			
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
  * 3Tests tests de fonctions
  */

 function tester_des_fonctions() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Tests de fonctions"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =``;
	this.consigne += "tests fonctions";
	this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 1;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;


	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		//let type_de_questions_disponibles = [1,2,3,4];
		let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, x, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
				

				switch (type_de_questions) {
					case 1 : // 
						texte =``;
						//texte +=`katexPopup2`+ katex_Popup2(numero_de_l_exercice+i*3,2,`trébuchet`,`https://sitetab3.ac-reims.fr/ec-fayl-billot-elem/-wp-/wp-content/uploads/2018/01/`,`https://sitetab3.ac-reims.fr/ec-fayl-billot-elem/-wp-/wp-content/uploads/2018/01/balancoire-a-bascule-trebuchet-baskul-768x768.jpg`);
						texte +=`<br> katextPopup3 modal long : `;
						texte += katex_Popup3(numero_de_l_exercice+1,1,"énergie",`Définition : énergie (grandeur physique)`,`C’est le produit de la puissance électrique (Watt) par le temps (s) et se mesure en Joule (J).<br>1 J=1 W × 1 s.<br>Cependant pour mesurer des énergies plus importantes on utilise plutôt le kiloWattheure (kWh).<br>1 kWh=1000 W × 1 h.`);
						texte += `<br> katexPopup3 image : `;
						texte += katex_Popup3(numero_de_l_exercice+2,2,`trebuchet`,`https://sitetab3.ac-reims.fr/ec-fayl-billot-elem/-wp-/wp-content/uploads/2018/01/`,`https://sitetab3.ac-reims.fr/ec-fayl-billot-elem/-wp-/wp-content/uploads/2018/01/balancoire-a-bascule-trebuchet-baskul-768x768.jpg`);
						texte_corr = `texte corr`;

						break;			
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
 * 3A10 - Division Euclidienne; diviseurs, multiples, critères de divisibilité
 * Exercice bilan
 * @author Sébastien Lozano
 */
 
function DivisionEuclidienne_multiplesDiviseurs_Criteres(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Division Euclidienne - Diviseurs - Multiples"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =`Divisions euclidiennes - Diviseurs - Multiples.`;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 5;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A10.pdf","Aide mémoire sur la division euclidienne (Sébastien Lozano)","Aide mémoire")		
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4,5];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];

				var dividende;
				var diviseur;
				var quotient;
				var reste;				
	
				switch (type_de_questions) {
					case 1 : // plus grand reste dans une division euclidienne
						diviseur = randint(2,99);
						texte = `Dire quel est le plus grand reste possible dans une division euclidienne par ${diviseur}.`;
						texte_corr = `Si on divise par ${diviseur}, il ne peut pas rester plus de ${diviseur - 1}, sinon c'est qu'on peut encore ajouter au moins 1 fois ${diviseur} dans le dividende et donc 1 au quotient.`;
						break;		
					case 2 : // quotient et reste d'une division euclidienne donnée
						diviseur = randint(2,99);
						dividende = randint(1001,99999);
						quotient = Math.trunc(dividende/diviseur);
						reste = dividende%diviseur;

						texte = `On a ${nombre_avec_espace(dividende)}=${nombre_avec_espace(diviseur)}$\\times$${nombre_avec_espace(quotient)} $+$ ${nombre_avec_espace(reste)}`;
						texte += `<br>`;
						texte += `Écrire le quotient et le reste de la division euclidienne de ${nombre_avec_espace(dividende)} par ${diviseur}.` ;
						texte_corr = `Dans la division euclidienne de ${nombre_avec_espace(dividende)} par ${diviseur}, le quotient vaut ${nombre_avec_espace(quotient)} et le reste ${reste}.`;
						break;	
					case 3 : // caractérisation des multiples et diviseurs par le reste de la division euclidienne
						dividende = randint(101,9999);
						let rg_diviseur; // rang du diviseur choisi
						if (liste_diviseurs(dividende).length%2==0) {//si il y a un nombre pair de diviseurs on prend le (n/2+1) eme
							rg_diviseur = liste_diviseurs(dividende).length/2+1;
						} else { // il y a nbre impair de diviseurs on prend le ((n-1)/2 +1) eme
							rg_diviseur = (liste_diviseurs(dividende).length-1)/2 +1;							
						}
						diviseur = liste_diviseurs(dividende)[rg_diviseur-1]; // on choisit le diviseur central de dividende, ATTENTION rang des tableaux commence à 0 
						let candidats_diviseurs = [diviseur-1,diviseur,diviseur+1]; // on prend l'entier précédetn et le successeur de ce diviseur
						// Faut-il que je conditionne pour éviter le diviseur 1 ?
						candidats_diviseurs=shuffle(candidats_diviseurs); // on mélange le tableau
						texte = 'Les trois divisions euclidiennes suivantes sont exactes : <br>';
						texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[0])}$\\times$${nombre_avec_espace(Math.trunc(dividende/candidats_diviseurs[0]))} $+$ ${nombre_avec_espace(dividende%candidats_diviseurs[0])}`;
						texte += `<br>`;
						texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[1])}$\\times$${nombre_avec_espace(Math.trunc(dividende/candidats_diviseurs[1]))} $+$ ${nombre_avec_espace(dividende%candidats_diviseurs[1])}`;
						texte += `<br>`;
						texte += `${nombre_avec_espace(dividende)} = ${nombre_avec_espace(candidats_diviseurs[2])}$\\times$${nombre_avec_espace(Math.trunc(dividende/candidats_diviseurs[2]))} $+$ ${nombre_avec_espace(dividende%candidats_diviseurs[2])}`;
						texte += `<br>`;
						texte += `Sans calculer, dire si les nombres ${nombre_avec_espace(candidats_diviseurs[0])}; ${nombre_avec_espace(candidats_diviseurs[1])}; ${nombre_avec_espace(candidats_diviseurs[2])} sont des diviseurs de ${nombre_avec_espace(dividende)}. Justifier.`;
						texte_corr =``;
						if (dividende%candidats_diviseurs[0]==0) {
							texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[0])} vaut 0 donc ${nombre_avec_espace(candidats_diviseurs[0])} est un diviseur de ${nombre_avec_espace(dividende)}`;							
						} else {
							texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[0])} ne vaut pas 0 donc ${nombre_avec_espace(candidats_diviseurs[0])} n'est pas un diviseur de ${nombre_avec_espace(dividende)}`;							
						}
						texte_corr += `<br>`;
						if (dividende%candidats_diviseurs[1]==0) {
							texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[1])} vaut 0 donc ${nombre_avec_espace(candidats_diviseurs[1])} divise ${nombre_avec_espace(dividende)}`;							
						} else {
							texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[1])} ne vaut pas 0 donc ${nombre_avec_espace(candidats_diviseurs[1])} ne divise pas ${nombre_avec_espace(dividende)}`;							
						}
						texte_corr += `<br>`;
						if (dividende%candidats_diviseurs[1]==0) {
							texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[2])} vaut 0 donc ${nombre_avec_espace(dividende)} est divisible par ${nombre_avec_espace(candidats_diviseurs[2])}`;							
						} else {
							texte_corr += `Le reste de la division euclienne de ${nombre_avec_espace(dividende)} par ${nombre_avec_espace(candidats_diviseurs[2])} ne vaut pas 0 donc ${nombre_avec_espace(dividende)} n'est pas divisible par ${nombre_avec_espace(candidats_diviseurs[2])}`;							
						}
						texte_corr += `<br>`;						
						break;
					case 4 : // vocabulaire diviseurs et multiples
						// on déclare des tableaux utiles 
						let diviseurs=[];
						let multiplicateurs=[];
						let multiples=[];
						let quotients=[];
						let textes=[];
						let textes_corr=[];
						// on tire au hasard 4 diviseurs différents entre 2 et 999 et 4 multiplicateurs différents entre 2 et 9 
						diviseurs = [randint(2,999),randint(2,999,[diviseurs[0]]),randint(2,999,[diviseurs[0],diviseurs[1]]),randint(2,999,[diviseurs[0],diviseurs[1],diviseurs[2]])];
						multiplicateurs = [randint(2,9),randint(2,9,[multiplicateurs[0]]),randint(2,9,[multiplicateurs[0],multiplicateurs[1]]),randint(2,9,[multiplicateurs[0],multiplicateurs[1],multiplicateurs[2]])];
						// on calcule les multiples
						for (let j = 0; j<4; j++) {
							multiples[j]=diviseurs[j]*multiplicateurs[j];
							quotients[j]=multiples[j]/diviseurs[j];
							diviseurs[j]=nombre_avec_espace(diviseurs[j]);
							multiples[j]=nombre_avec_espace(multiples[j]);							
							quotients[j]=nombre_avec_espace(quotients[j]);
						};						
						// on crée les phrases 
						textes[0]=`${diviseurs[0]} $\\ldots\\ldots\\ldots\\ldots$ ${multiples[0]}`;
						textes_corr[0]=`${diviseurs[0]} est un diviseur de ${multiples[0]} car ${multiples[0]}=${diviseurs[0]}$\\times$${quotients[0]}`;
						textes[1]=`${diviseurs[1]} $\\ldots\\ldots\\ldots\\ldots$ ${multiples[1]}`;
						textes_corr[1]=`${diviseurs[1]} est un diviseur de ${multiples[1]} car ${multiples[1]}=${diviseurs[1]}$\\times$${quotients[1]}`;
						textes[2]=`${multiples[2]} $\\ldots\\ldots\\ldots\\ldots$ ${diviseurs[2]}`;
						textes_corr[2]=`${multiples[2]} est un multiple de ${diviseurs[2]} car ${multiples[2]}=${diviseurs[2]}$\\times$${quotients[2]}`;
						textes[3]=`${multiples[3]} $\\ldots\\ldots\\ldots\\ldots$ ${diviseurs[3]}`;
						textes_corr[3]=`${multiples[3]} est un multiple de ${diviseurs[3]} car ${multiples[3]}=${diviseurs[3]}$\\times$${quotients[3]}`;
						// on ajoute deux cas ni multiple ni diviseur
						// on choisit deux nombres
						let n1 = nombre_avec_espace(randint(2,999,[diviseurs[0],diviseurs[1],diviseurs[2],diviseurs[3]]));
						let p1 = nombre_avec_espace(randint(2,999,[diviseurs[0],diviseurs[1],diviseurs[2],diviseurs[3],n1]));
						// on choisit un autre qui n'est pas dans la liste des diviseurs de n1
						let n2 = nombre_avec_espace(randint(2,999,liste_diviseurs(n1)));
						let p2 = nombre_avec_espace(randint(2,999,liste_diviseurs(p1)));
						textes[4]=`${n1} $\\ldots\\ldots\\ldots\\ldots$ ${n2}`;
						textes_corr[4]=`${n1} n'est ni un multiple ni un diviseur de ${n2}`;
						textes[5]=`${p2} $\\ldots\\ldots\\ldots\\ldots$ ${p1}`;
						textes_corr[5]=`${p2} n'est ni un multiple ni un diviseur de ${p1}`;
						// on mélange pour que l'ordre change!
						shuffle2tableaux(textes,textes_corr);
						texte = `Avec la calculatrice, compléter chaque phrase avec le mot "est un diviseur de" ou "est un multiple de" ou "n'est ni une diviseur ni un multiple de".`;
						texte+= `<br>`;
						texte_corr =``;
						for (let j = 0; j<6; j++) {
							texte += textes[j];
							texte +=`<br>`;
							texte_corr += textes_corr[j];
							texte_corr +=`<br>`;
						};
						break;
					case 5 : // liste des diviseurs
						// on définit un tableau pour les choix du nombre dont on veut les diviseurs
						// 3 parmis 2,99 y compris les premiers et 1 parmis les entiers à 3 chiffres ayant au moins 8 diviseurs, il y en a 223 !
						let tableau_de_choix = [];
						tableau_de_choix =[randint(2,99),randint(2,99,[tableau_de_choix[0]]),randint(2,99,[tableau_de_choix[0],tableau_de_choix[1]]),randint(2,99,[tableau_de_choix[0],tableau_de_choix[1],tableau_de_choix[2]])];
						let tableau_de_choix_3chiffres =[];
						for (let m=101; m<999; m++) {
							if (liste_diviseurs(m).length>8) {
								tableau_de_choix_3chiffres.push(m);
							};
						};
						// on ajoute un nombre à trois chiffre avec au moins 8 diviseurs dans les choix possibles
						let rg_Nb_3chiffres = randint(0,(tableau_de_choix_3chiffres.length-1));
						tableau_de_choix.push(tableau_de_choix_3chiffres[rg_Nb_3chiffres]);											
						let N; // on déclare le nombre dont on va chercher les diviseurs
						let rg_N; // pour tirer le rang du nombre dans le tableau des choix
						rg_N = randint(0,(tableau_de_choix.length-1));
						N = tableau_de_choix[rg_N];
						texte = `Écrire la liste de tous les diviseurs de ${N}.`;
						// texte_corr = `Pour trouver la liste des diviseurs de ${N} on cherche tous les produits de deux facteurs qui donnent ${N}<br>`;
						// if (liste_diviseurs(N).length%2==0) {//si il y a un nombre pair de diviseurs
						// 	for (let m = 0; m<(liste_diviseurs(N).length/2); m++){
						// 		texte_corr += ``+liste_diviseurs(N)[m]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-m-1)]+`<br>`;
						// 	};
						// } else {
						// 	for (let m = 0; m<((liste_diviseurs(N).length-1)/2); m++){
						// 		texte_corr += ``+liste_diviseurs(N)[m]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-m-1)]+`<br>`;
						// 	};
						// 	texte_corr += ``+liste_diviseurs(N)[(liste_diviseurs(N).length-1)/2]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-1)/2]+`<br>`;
						// };
						// texte_corr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${N}<br>`;
						// texte_corr += `La liste des diviseurs de ${N} est donc `;
						// texte_corr += `1`;
						// for (let w = 1; w<liste_diviseurs(N).length; w++) {
						// 	texte_corr += `; `+liste_diviseurs(N)[w];
						// };

						texte_corr = `Pour trouver la liste des diviseurs de ${N} on cherche tous les produits de deux facteurs qui donnent ${N}. En écrivant toujours le plus petit facteur en premier.<br>`;
						texte_corr += `Il est suffisant de chercher des diviseurs inférieurs au plus grand nombre dont le carré vaut ${N}, par exemple ici, ${Math.trunc(Math.sqrt(N))}$\\times$${Math.trunc(Math.sqrt(N))} = ${Math.trunc(Math.sqrt(N))*Math.trunc(Math.sqrt(N))}<${N}`;
						texte_corr += ` et ${Math.trunc(Math.sqrt(N))+1}$\\times$${Math.trunc(Math.sqrt(N))+1} = ${(Math.trunc(Math.sqrt(N))+1)*(Math.trunc(Math.sqrt(N))+1)}>${N} donc il suffit d'arrêter la recherche de facteur à ${Math.trunc(Math.sqrt(N))}.`;
						texte_corr += ` En effet, si ${N} est le produit de deux entiers p$\\times$q avec p < q alors si p$\\times$p > ${N} c'est que q$\\times$q < ${N} mais dans ce cas p serait supérieur à q sinon p$\\times$q serait inférieur à ${N} ce qui ne doit pas être le cas.<br>`
						if (liste_diviseurs(N).length%2==0) {//si il y a un nombre pair de diviseurs
							for (let m = 0; m<(liste_diviseurs(N).length/2); m++){
								texte_corr += ``+liste_diviseurs(N)[m]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-m-1)]+` = ${N}<br>`;
							};
						} else {
							for (let m = 0; m<((liste_diviseurs(N).length-1)/2); m++){
								texte_corr += ``+liste_diviseurs(N)[m]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-m-1)]+`<br>`;
							};
							texte_corr += ``+liste_diviseurs(N)[(liste_diviseurs(N).length-1)/2]+`$\\times$`+liste_diviseurs(N)[(liste_diviseurs(N).length-1)/2]+` = ${N}<br>`;
						};
						texte_corr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${N}.<br>`;
						texte_corr += `La liste des diviseurs de ${N} est donc `;
						texte_corr += `1`;
						for (let w = 1; w<liste_diviseurs(N).length; w++) {
							texte_corr += `; `+liste_diviseurs(N)[w];
						};
						texte_corr += `.`;
						break;							
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
function Premier_ou_pas(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Primalité ou pas"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =`Justifier que les nombres suivants sont premiers ou pas.`;
	//this.consigne += `<br>`;	
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 5;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A11.pdf","Aide mémoire sur les nombres premiers (Sébastien Lozano)","Aide mémoire")		
			this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique - Les Nombres Premiers','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,6,7];
		type_de_questions_disponibles=shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);
		
		let string_rappel = `Cette liste des nombres premiers inférieurs à 100 pourra être utile : <br>`+crible_eratosthene_n(100)[0];
		for (let k=1;k<crible_eratosthene_n(100).length;k++) {
			string_rappel +=`, `+crible_eratosthene_n(100)[k];
		};
		string_rappel +=`.`;
		if (sortie_html) {
			this.introduction =`
			<br>
			<div class="ui compact warning message">		
			<p>`+string_rappel+`
			</p>
			</div>
			<br>`;
		} else {
			this.introduction = tex_cadre_par_orange(string_rappel);							
		};

			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {

				type_de_questions = liste_type_de_questions[i];
				
				var N; // le nombre de la question
	
				switch (type_de_questions) {
					case 1 : // nombre pair
						N=2*randint(51,4999);
						texte = nombre_avec_espace(N);						
						texte_corr = `Comme ${nombre_avec_espace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même,<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;		
					case 2 : // Multiple de 3
						let sum=0; // pour la valeur de la somme;
						N=3*randint(34,3333);
						texte = nombre_avec_espace(N);
						texte_corr = `Comme `+ N.toString().charAt(0);
						sum = Number(N.toString().charAt(0));
						for (let k=1; k<N.toString().length; k++) {
							texte_corr += ` + `+N.toString().charAt(k);
							sum +=Number(N.toString().charAt(k));
						};					
						texte_corr += ` = ${sum} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même,<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;	
					case 3 : // Multiple de 5
						N=5*randint(20,1999);
						texte = nombre_avec_espace(N);
						texte_corr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length-1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
						texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même,<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;	
					case 4 : // Multiple de 7
						let N_longueur; // pour la taille du string N
						let N1; // pour la repetiton du critère
						let N1_longueur; // pour la taille du string N1
						let sum1; // pour la somme de la répétition du critère
						N=7*randint(15,1428);
						texte = nombre_avec_espace(N);
						N_longueur = N.toString().length;
						texte_corr = ` 7 divise ${nombre_avec_espace(N)}, en effet : `;
						texte_corr += `<br>`;
						N1 = N;
						N1_longueur = N_longueur;
						sum1 = Number(N1.toString().substring(0,N1_longueur-1))+5*Number(N1.toString().charAt(N1_longueur-1));
						while (sum1 >=56 ) {
							texte_corr += `${N1.toString().substring(0,N1_longueur-1)} + 5$\\times$${N1.toString().charAt(N1_longueur-1)}`;
							texte_corr += ` = ${Number(N1.toString().substring(0,N1_longueur-1))+5*Number(N1.toString().charAt(N1_longueur-1))}`;
							texte_corr += `<br>`;
							N1 = sum1;
							N1_longueur = N1.toString().length;
							sum1 = Number(N1.toString().substring(0,N1_longueur-1))+5*Number(N1.toString().charAt(N1_longueur-1));
						};
						// texte_corr = `Comme ${N.toString().substring(0,N_longueur-1)}-5$\\times$${N.toString().charAt(N_longueur-1)}`;
						// texte_corr += ` = ${Number(N.toString().substring(0,N_longueur-1))+5*Number(N.toString().charAt(N_longueur-1))} est un multiple de 7 alors 7 divise ${N} aussi, `;
						texte_corr += `Comme ${N1.toString().substring(0,N1_longueur-1)} + 5$\\times$${N1.toString().charAt(N1_longueur-1)} = ${sum1} est un multiple de 7 alors 7 divise ${N} aussi `;
						texte_corr += `qui admet donc au moins trois diviseurs : 1, 7 et lui-même,<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;
					case 5 : // multiple de 11
						let even_sum; // pour la somme des chiffres de rang impair
						let odd_sum; // pour la somme des chiffres de rang pair
						N=11*randint(10,909);
						texte = nombre_avec_espace(N);
						texte_corr = `D'une part, la somme des chiffres de rang impair de ${nombre_avec_espace(N)} vaut `;
						if (Number(N.toString().length)%2==0) { // si N a un nombre pair de chiffres
							even_sum = Number(N.toString().charAt(1));
							texte_corr += N.toString().charAt(1);
							for (let k=3; k<N.toString().length; k++) {
								if (k%2==1) {
								texte_corr += ` + `+N.toString().charAt(k);
								even_sum += Number(N.toString().charAt(k));
								};
							};
							texte_corr += ` = `+even_sum+ ` <br> `;
						} else { // sinon N a un nombre impair de chiffres
							even_sum = Number(N.toString().charAt(0));
							texte_corr += N.toString().charAt(0);
							for (let m=1; m<N.toString().length; m++) {
								if (m%2==0) {
								texte_corr += ` + `+N.toString().charAt(m);
								even_sum += Number(N.toString().charAt(m));
								};

							};
							texte_corr += ` = `+even_sum+ `<br> `;
						};
						texte_corr += `d'autre part, la somme des chiffres de rang pair de ${nombre_avec_espace(N)} vaut `;
						if (Number(N.toString().length)%2==0) { // si N a un nombre pair de chiffres
							odd_sum = Number(N.toString().charAt(0));
							texte_corr += N.toString().charAt(0);
							for (let k=1; k<N.toString().length; k++) {
								if (k%2==0) {
								texte_corr += ` + `+N.toString().charAt(k);
								odd_sum += Number(N.toString().charAt(k));
								};
							};
							texte_corr += ` = `+odd_sum+ ` <br> `;
						} else { // sinon N a un nombre impair de chiffres
							odd_sum = Number(N.toString().charAt(1));
							texte_corr += N.toString().charAt(1);
							for (let m=3; m<N.toString().length; m++) {
								if (m%2==1) {
								texte_corr += ` + `+N.toString().charAt(m);
								odd_sum += Number(N.toString().charAt(m));
								};

							};
							texte_corr += ` = `+odd_sum+ `<br> `;
						};
						texte_corr += `la différence entre la somme des chiffres de rangs pairs et celle des chiffres de rangs impairs vaut `;
						if ((odd_sum-even_sum)==0) {
							texte_corr += `${odd_sum-even_sum}, `;

						} else {
							texte_corr += `${Math.abs(odd_sum-even_sum)} qui est un multiple de 11, `;
						};
						texte_corr+= `<br>`;
						texte_corr += ` cela signifie que ${nombre_avec_espace(N)} est divisible par 11, il admet donc au moins trois diviseurs qui sont 1, 11 et lui-même,`;
						texte_corr += `<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;
					case 6 : // produit de deux nombres premiers inférieurs à 100
						// rang du premier facteur premier
						let r1 = randint(0,crible_eratosthene_n(100).length-1);
						// rang du second facteur premier
						let r2 = randint(0,crible_eratosthene_n(100).length-1);
						let prime1 = crible_eratosthene_n(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
						let prime2 = crible_eratosthene_n(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
						N=prime1+`$\\times$`+prime2;
						texte = N;
						texte_corr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
						if (prime1==prime2) {
							texte_corr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1*prime2)}`;
						} else {
							texte_corr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1*prime2)}`;
						};
						texte_corr +=`<br> ${N} n'est donc pas premier.`; 
						break;
					case 7 : // nombre premier inférieur à 529
						// rang du nombre premier choisi
						let r = randint(0,crible_eratosthene_n(529).length-1);
						N=crible_eratosthene_n(529)[r]; //on choisit un nombre premier inférieur à 529
						texte = N+``;
						let tab_premiers_a_tester = crible_eratosthene_n(Math.trunc(Math.sqrt(N)));
						texte_corr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
						texte_corr += tab_premiers_a_tester[0];
						for (let k=1;k<tab_premiers_a_tester.length;k++) {
							texte_corr += `, `+tab_premiers_a_tester[k];
						};
						texte_corr += `.`;
						texte_corr += `<br> Aucun de ces nombres premiers ne divise ${N}.`;
						texte_corr +=`<br> ${N} est donc un nombre premier.`; 
						break;								
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
 * 3A11-1 justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 11, sous forme d'un produit de deux nombres premiers inférieurs à 100
 * et un nombre premier inferieur à 529
 * variante de 3A-11 avec les critères par 7 et 11 en plus
 * @author Sébastien Lozano
 */
function Premier_ou_pas_critere_par7_par11(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Primalité ou pas - Variante avec les critères de divisibilité par 7 et par 11"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne = `Justifier que les nombres suivants sont premiers ou pas.`;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 7;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A11.pdf","Aide mémoire sur les nombres premiers (Sébastien Lozano)","Aide mémoire")		
			this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique - Les Nombres Premiers','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4,5,6,7];
		type_de_questions_disponibles=shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

		let string_rappel_b = `Ces critères de divisibilité pourront être utiles :`;
		if (sortie_html) {
			string_rappel_b += `<br>`;
			string_rappel_b += `- Un nombre est divisible par 7 si la somme de son nombre de dizaines et de cinq fois son chiffre des unités l’est.<br>`;
			string_rappel_b += `- Un nombre est divisible par 11 si la différence entre la somme de ses chiffres de rangs pairs et la somme de ses chiffres de rangs impairs est nulle ou égale à un multiple de 11.`;
			string_rappel_b+= `<br> <br>`;
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
		for (let k=1;k<crible_eratosthene_n(100).length;k++) {
			string_rappel_b +=`, `+crible_eratosthene_n(100)[k];
		};
		string_rappel_b +=`.`;
		if (sortie_html) {
			this.introduction =`
			<br>
			<div class="ui compact warning message">		
			<p>`+string_rappel_b+`
			</p>
			</div>
			<br>`;
		} else {
			this.introduction = tex_cadre_par_orange(string_rappel_b);	
		};	
			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
				
				var N; // le nombre de la question
	
				switch (type_de_questions) {
					case 1 : // nombre pair
						N=2*randint(51,4999);
						texte = nombre_avec_espace(N);						
						texte_corr = `Comme ${nombre_avec_espace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même,<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;		
					case 2 : // Multiple de 3
						let sum=0; // pour la valeur de la somme;
						N=3*randint(34,3333);
						texte = nombre_avec_espace(N);
						texte_corr = `Comme `+ N.toString().charAt(0);
						sum = Number(N.toString().charAt(0));
						for (let k=1; k<N.toString().length; k++) {
							texte_corr += ` + `+N.toString().charAt(k);
							sum +=Number(N.toString().charAt(k));
						};					
						texte_corr += ` = ${sum} est un multiple de 3 donc ${nombre_avec_espace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même,<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;	
					case 3 : // Multiple de 5
						N=5*randint(20,1999);
						texte = nombre_avec_espace(N);
						texte_corr = `Comme le dernier chiffre de ${nombre_avec_espace(N)} est un ${N.toString().charAt(N.toString().length-1)} alors ${nombre_avec_espace(N)} est divisible par 5, `;
						texte_corr += `il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même,<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;	
					case 4 : // Multiple de 7
						let N_longueur; // pour la taille du string N
						let N1; // pour la repetiton du critère
						let N1_longueur; // pour la taille du string N1
						let sum1; // pour la somme de la répétition du critère
						N=7*randint(15,1428);
						texte = nombre_avec_espace(N);
						N_longueur = N.toString().length;
						texte_corr = ` 7 divise ${nombre_avec_espace(N)}, en effet : `;
						texte_corr += `<br>`;
						N1 = N;
						N1_longueur = N_longueur;
						sum1 = Number(N1.toString().substring(0,N1_longueur-1))+5*Number(N1.toString().charAt(N1_longueur-1));
						while (sum1 >=56 ) {
							texte_corr += `${N1.toString().substring(0,N1_longueur-1)} + 5$\\times$${N1.toString().charAt(N1_longueur-1)}`;
							texte_corr += ` = ${Number(N1.toString().substring(0,N1_longueur-1))+5*Number(N1.toString().charAt(N1_longueur-1))}`;
							texte_corr += `<br>`;
							N1 = sum1;
							N1_longueur = N1.toString().length;
							sum1 = Number(N1.toString().substring(0,N1_longueur-1))+5*Number(N1.toString().charAt(N1_longueur-1));
						};
						// texte_corr = `Comme ${N.toString().substring(0,N_longueur-1)}-5$\\times$${N.toString().charAt(N_longueur-1)}`;
						// texte_corr += ` = ${Number(N.toString().substring(0,N_longueur-1))+5*Number(N.toString().charAt(N_longueur-1))} est un multiple de 7 alors 7 divise ${N} aussi, `;
						texte_corr += `Comme ${N1.toString().substring(0,N1_longueur-1)} + 5$\\times$${N1.toString().charAt(N1_longueur-1)} = ${sum1} est un multiple de 7 alors 7 divise ${N} aussi `;
						texte_corr += `qui admet donc au moins trois diviseurs : 1, 7 et lui-même,<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;
					case 5 : // multiple de 11
						let even_sum; // pour la somme des chiffres de rang impair
						let odd_sum; // pour la somme des chiffres de rang pair
						N=11*randint(10,909);
						texte = nombre_avec_espace(N);
						texte_corr = `D'une part, la somme des chiffres de rang impair de ${nombre_avec_espace(N)} vaut `;
						if (Number(N.toString().length)%2==0) { // si N a un nombre pair de chiffres
							even_sum = Number(N.toString().charAt(1));
							texte_corr += N.toString().charAt(1);
							for (let k=3; k<N.toString().length; k++) {
								if (k%2==1) {
								texte_corr += ` + `+N.toString().charAt(k);
								even_sum += Number(N.toString().charAt(k));
								};
							};
							texte_corr += ` = `+even_sum+ ` <br> `;
						} else { // sinon N a un nombre impair de chiffres
							even_sum = Number(N.toString().charAt(0));
							texte_corr += N.toString().charAt(0);
							for (let m=1; m<N.toString().length; m++) {
								if (m%2==0) {
								texte_corr += ` + `+N.toString().charAt(m);
								even_sum += Number(N.toString().charAt(m));
								};

							};
							texte_corr += ` = `+even_sum+ `<br> `;
						};
						texte_corr += `d'autre part, la somme des chiffres de rang pair de ${nombre_avec_espace(N)} vaut `;
						if (Number(N.toString().length)%2==0) { // si N a un nombre pair de chiffres
							odd_sum = Number(N.toString().charAt(0));
							texte_corr += N.toString().charAt(0);
							for (let k=1; k<N.toString().length; k++) {
								if (k%2==0) {
								texte_corr += ` + `+N.toString().charAt(k);
								odd_sum += Number(N.toString().charAt(k));
								};
							};
							texte_corr += ` = `+odd_sum+ ` <br> `;
						} else { // sinon N a un nombre impair de chiffres
							odd_sum = Number(N.toString().charAt(1));
							texte_corr += N.toString().charAt(1);
							for (let m=3; m<N.toString().length; m++) {
								if (m%2==1) {
								texte_corr += ` + `+N.toString().charAt(m);
								odd_sum += Number(N.toString().charAt(m));
								};

							};
							texte_corr += ` = `+odd_sum+ `<br> `;
						};
						texte_corr += `la différence entre la somme des chiffres de rangs pairs et celle des chiffres de rangs impairs vaut `;
						if ((odd_sum-even_sum)==0) {
							texte_corr += `${odd_sum-even_sum}, `;

						} else {
							texte_corr += `${Math.abs(odd_sum-even_sum)} qui est un multiple de 11, `;
						};
						texte_corr+= `<br>`;
						texte_corr += ` cela signifie que ${nombre_avec_espace(N)} est divisible par 11, il admet donc au moins trois diviseurs qui sont 1, 11 et lui-même,`;
						texte_corr += `<br> ${nombre_avec_espace(N)} n'est donc pas premier.`;
						break;
					case 6 : // produit de deux nombres premiers inférieurs à 100
						// rang du premier facteur premier
						let r1 = randint(0,crible_eratosthene_n(100).length-1);
						// rang du second facteur premier
						let r2 = randint(0,crible_eratosthene_n(100).length-1);
						let prime1 = crible_eratosthene_n(100)[r1]; // on tire un nombre premier inférieur à 100, il n'y en a que 25!
						let prime2 = crible_eratosthene_n(100)[r2]; // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
						N=prime1+`$\\times$`+prime2;
						texte = N;
						texte_corr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `;
						if (prime1==prime2) {
							texte_corr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombre_avec_espace(prime1*prime2)}`;
						} else {
							texte_corr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombre_avec_espace(prime1*prime2)}`;
						};
						texte_corr +=`<br> ${N} n'est donc pas premier.`; 
						break;
					case 7 : // nombre premier inférieur à 529
						// rang du nombre premier choisi
						let r = randint(0,crible_eratosthene_n(529).length-1);
						N=crible_eratosthene_n(529)[r]; //on choisit un nombre premier inférieur à 529
						texte = N+``;;
						let tab_premiers_a_tester = crible_eratosthene_n(Math.trunc(Math.sqrt(N)));
						texte_corr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est à dire par les nombres `;
						texte_corr += tab_premiers_a_tester[0];
						for (let k=1;k<tab_premiers_a_tester.length;k++) {
							texte_corr += `, `+tab_premiers_a_tester[k];
						};
						texte_corr += `.`;
						texte_corr += `<br> Aucun de ces nombres premiers ne divise ${N}.`;
						texte_corr +=`<br> ${N} est donc un nombre premier.`; 
						break;								
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
 
function Decomposition_facteurs_premiers(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Décomposition en facteurs premiers d'un entier"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =`&Agrave; l'aide de la calculatrice, décomposer pas à pas les nombres entiers en produit de facteurs premiers.`;	
	this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 3;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A11.pdf","Aide mémoire sur les nombres premiers (Sébastien Lozano)","Aide mémoire")		
			this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique - Les Nombres Premiers','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3];
		type_de_questions_disponibles=shuffle(type_de_questions_disponibles); // on mélange l'ordre des questions
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

		let string_rappel = `Cette liste des nombres premiers inférieurs à 100 pourra être utile : <br>`+crible_eratosthene_n(100)[0];
		for (let k=1;k<crible_eratosthene_n(100).length;k++) {
			string_rappel +=`, `+crible_eratosthene_n(100)[k];
		};
		string_rappel +=`.`;
		if (sortie_html) {
			this.introduction =`
			<br>
			<div class="ui compact warning message">		
			<p>`+string_rappel+`
			</p>
			</div>
			<br>`;
		} else {
			this.introduction = tex_cadre_par_orange(string_rappel);							
		};

			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];				
	
				switch (type_de_questions) {
					case 1 : // 3 à 5 facteurs premiers max compris entre 0 et 30, de multiplicité 1,2 ou 3 max
						// on fixe le nombre de facteurs premier entre 3 et 5
						let nb_de_premiers = randint(3,5);						
						// on fixe la limite pour le choix des premiers
						let max_premier = 11;
						// on fixe le rang max pour le choix des premiers
						let rg_max = crible_eratosthene_n(max_premier).length-1;					
						// on choisit les rangs pour les nombres premiers
						let tab_rangs = [];
						let tab_rangs_exclus = [];
						for (let k=0;k<(nb_de_premiers);k++) {
							for (let m=0;m<k;m++) {
								tab_rangs_exclus.push(tab_rangs[m]);
							}
							tab_rangs[k] = randint(0,rg_max,tab_rangs_exclus);
						};
						// on choisit les premiers
						let tab_premiers = [];
						for (let k=0; k<tab_rangs.length; k++) {
							tab_premiers[k] = crible_eratosthene_n(max_premier)[tab_rangs[k]];
						};
						// on range les facteurs premiers dans l'ordre croissant
						tab_premiers.sort(function(a,b){
							return a-b;
						});
						// on choisit les multiplicités
						let tab_multiplicites = [];
						for (let k=0; k<tab_rangs.length; k++) {
							tab_multiplicites[k] = randint(1,2);
						};
						// yapluka écrire le nombre dans l'énoncé et sa décomposition dans la correction
						texte = `À l'aide de la calculatrice, décomposer `;
						let nombre_a_decomposer=1;
						for (let k=0; k<tab_rangs.length; k++) {
							for (let m=0; m<tab_multiplicites[k]; m++) {
								nombre_a_decomposer = nombre_a_decomposer*tab_premiers[k];
							};
						};
						let racine_premier_1 = Math.trunc(Math.sqrt(nombre_a_decomposer)); 
						texte += `$${tex_nombre(nombre_a_decomposer)}$ en produit de facteurs premiers.`;
						// correction						
						texte_corr = `Nous allons successivement tester la divisibilité de $${tex_nombre(nombre_a_decomposer)}$ par tous les nombres premiers inférieurs à `;						
						texte_corr += `$${tex_nombre(nombre_a_decomposer)}$ en commençant par 2, 3, 5, 7, ...<br>`;
						texte_corr = `Il est suffisant de tester la divisibilité de $${tex_nombre(nombre_a_decomposer)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${tex_nombre(nombre_a_decomposer)}}$ c'est à dire inférieurs à $${tex_nombre(racine_premier_1)}$.<br>`;
						texte_corr += `Ce sont les nombres de la liste : $`;
						texte_corr += crible_eratosthene_n(racine_premier_1)[0];
						for (let k=1;k<crible_eratosthene_n(racine_premier_1).length;k++) {
							texte_corr += `; `+crible_eratosthene_n(racine_premier_1)[k];
						};
						texte_corr += `.$<br>`;		
						var liste_facteurs_premiers = obtenir_liste_facteurs_premiers(nombre_a_decomposer);
						var quotient_intermediaire = nombre_a_decomposer;
						for (let k=0;k<liste_facteurs_premiers.length;k++) {
							texte_corr += `$${tex_nombre(quotient_intermediaire)}\\div${mise_en_evidence(liste_facteurs_premiers[k])} = ${tex_nombre(quotient_intermediaire/liste_facteurs_premiers[k])}$<br>`;
							quotient_intermediaire = quotient_intermediaire/liste_facteurs_premiers[k];
						};	
						texte_corr +=`Finalement on obtient la décomposition suivante : $ ${tex_nombre(nombre_a_decomposer)} = `;
						if (tab_multiplicites[0]==1) {
							texte_corr += `${tab_premiers[0]}`;							
						} else {
							texte_corr += `${tab_premiers[0]}^{${tab_multiplicites[0]}}`;
						};
						for (let k=1; k<tab_premiers.length;k++) {
							if (tab_multiplicites[k]==1) {
								texte_corr += `\\times ${tab_premiers[k]}`;
								//console.log('typeof : '+typeof tab_multiplicites[k]);
							} else {
								texte_corr += `\\times ${tab_premiers[k]}^{${tab_multiplicites[k]}}`;
							};							
						};
						texte_corr += `$`;
						break;		
					case 2 : // deux premiers compris entre 30 et 100 de multiplicité 1
						// on choisit un rang différent pour chaque premier entre 30 et 100
						let r1 = randint(0,premiers_entre_bornes(30,100).length-1);
						let r2 = randint(0,premiers_entre_bornes(30,100).length-1,r1);
						let premier1 = premiers_entre_bornes(30,100)[r1];			
						let premier2 = premiers_entre_bornes(30,100)[r2];
						if (premier1>premier2) { // on inverse p1 et p2 si p1 est supérieur à p2
							let p = premier1;
							premier1=premier2;
							premier2=p;
						};						
						texte = `À l'aide de la calculatrice, décomposer $${tex_nombre(premier1*premier2)}$ en produit de facteurs premiers.`;
						let racine_prem = Math.trunc(Math.sqrt(premier1*premier2));
						texte_corr = `Il est suffisant de tester la divisibilité de $${tex_nombre(premier1*premier2)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${tex_nombre(premier1*premier2)}}$ c'est à dire inférieurs à $${tex_nombre(racine_prem)}$.<br>`;
						texte_corr += `Ce sont les nombres de la liste suivante : <br>$`;
						texte_corr += crible_eratosthene_n(racine_prem)[0];
						for (let k=1;k<crible_eratosthene_n(racine_prem).length;k++) {
							texte_corr += `; `+crible_eratosthene_n(racine_prem)[k];
						};
						texte_corr += `.$<br>`;						
						liste_facteurs_premiers = obtenir_liste_facteurs_premiers(premier1*premier2);
						quotient_intermediaire = premier1*premier2;
						for (let k=0;k<liste_facteurs_premiers.length;k++) {
							texte_corr += `$${tex_nombre(quotient_intermediaire)}\\div${mise_en_evidence(liste_facteurs_premiers[k])} = ${tex_nombre(quotient_intermediaire/liste_facteurs_premiers[k])}$<br>`;
							quotient_intermediaire = quotient_intermediaire/liste_facteurs_premiers[k];
						};
						texte_corr += ` D'où $${tex_nombre(premier1*premier2)} = ${tex_nombre(premier1)}\\times${tex_nombre(premier2)}$.`;
						break;	
					case 3 : // un gros premier entre 1000 et 2000			
						// on choisit un rang pour le nombre premier entre 1000 et 2000
						let r = randint(0,premiers_entre_bornes(1000,2000).length-1);
						let premier = premiers_entre_bornes(1000,2000)[r];			
						let racine_premier = Math.trunc(Math.sqrt(premier));
						texte = `À l'aide de la calculatrice, décomposer $${tex_nombre(premier)}$ en produit de facteurs premiers.`;
						texte_corr = `En testant la divisibilité de $${tex_nombre(premier)}$ par tous les nombres premiers inférieurs ou égaux à $${racine_premier}$`;
						texte_corr += ` c'est à dire les nombre de la liste $`;
						texte_corr += crible_eratosthene_n(racine_premier)[0];
						for (let k=1;k<crible_eratosthene_n(racine_premier).length;k++) {
							texte_corr += `; `+crible_eratosthene_n(racine_premier)[k];
						};
						texte_corr += `$, `;
						texte_corr += `on se rend compte que $${tex_nombre(premier)}$ est un nombre premier donc `;
						texte_corr +=`$${tex_nombre(premier)} = ${tex_nombre(premier)}$.`;
						break;	
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
 
function Lister_Diviseurs_Par_Decomposition_facteurs_premiers(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Compter/lister les diviseurs d'un entier à partir de sa décomposition en facteurs premiers."; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =`Sans la calculatrice, compter/lister les diviseurs d'un entier à partir de sa décomposition en facteurs premiers.`;
	this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 2;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A11.pdf","Aide mémoire sur les nombres premiers (Sébastien Lozano)","Aide mémoire")		
			this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique - Les Nombres Premiers','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
				
	
				switch (type_de_questions) {
					case 1 : // lister/compter les diviseurs d'un entier à partir de sa décomposition en facteurs premiers			
						texte = `Lister/compter les diviseurs d'un entier à partir de sa décomposition en facteurs premiers`;
						//let premiers_dispos = premiers_entre_bornes(2,11);
						// on fixe le nombre de facteurs premier à 3
						let nb_de_premiers_b = randint(3,3);						
						// on fixe la limite pour le choix des premiers
						let max_premier_b = 11;
						// on fixe le rang max pour le choix des premiers
						let rg_max_b = crible_eratosthene_n(max_premier_b).length-1;					
						// on choisit les rangs pour les nombres premiers
						let tab_rangs_b = [];
						let tab_rangs_exclus_b = [];
						for (let k=0;k<(nb_de_premiers_b);k++) {
							for (let m=0;m<k;m++) {
								tab_rangs_exclus_b.push(tab_rangs_b[m]);
							}
							tab_rangs_b[k] = randint(0,rg_max_b,tab_rangs_exclus_b);
						};
						// on choisit les premiers
						let tab_premiers_b = [];
						for (let k=0; k<tab_rangs_b.length; k++) {
							tab_premiers_b[k] = crible_eratosthene_n(max_premier_b)[tab_rangs_b[k]];
						};
						// on range les facteurs premiers dans l'ordre croissant
						tab_premiers_b.sort(function(a,b){
							return a-b;
						});
						// on choisit les multiplicités
						let tab_multiplicites_b = [];
						for (let k=0; k<tab_rangs_b.length; k++) {
							tab_multiplicites_b[k] = randint(1,2);
						};
						texte = ``;
						let nombre_a_decomposer_b=1;
						for (let k=0; k<tab_rangs_b.length; k++) {
							for (let m=0; m<tab_multiplicites_b[k]; m++) {
								nombre_a_decomposer_b = nombre_a_decomposer_b*tab_premiers_b[k];
							};
						};
						texte += `La décomposition en facteurs premiers de $${tex_nombre(nombre_a_decomposer_b)}$ est : $`;
						if (tab_multiplicites_b[0]==1) {
							texte += `${tab_premiers_b[0]}`;							
						} else {
							texte += `${tab_premiers_b[0]}^{${tab_multiplicites_b[0]}}`;
						};
						for (let k=1; k<tab_premiers_b.length;k++) {
							if (tab_multiplicites_b[k]==1) {
								texte += `\\times ${tab_premiers_b[k]}`;
							} else {
								texte += `\\times ${tab_premiers_b[k]}^{${tab_multiplicites_b[k]}}`;
							};							
						};
						texte += `$, <br>`;
						texte +=num_alpha(0)+` Compléter le tableau ci-dessous.`;
						// on crée le tableau des entetes de lignes et des colonnes
						let ent_lignes = [];
						let contenu_lignes=[];
						let ent_colonnes = [`\\times`];
						// les entetes des lignes
						for (let k=0;k<tab_multiplicites_b[0]+1;k++) {
							ent_lignes.push(tab_premiers_b[0]+`^{`+k+`}`);
						};
						// les entetes des colonnes 
						for (let m=0;m<tab_multiplicites_b[1]+1;m++) {
							for (let l=0;l<tab_multiplicites_b[2]+1;l++) {
								ent_colonnes.push(tab_premiers_b[1]+`^{`+m+`}\\times`+tab_premiers_b[2]+`^{`+l+`}`);
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
						for (let l=0;l<(tab_multiplicites_b[0]+1);l++) {
							for (let c=1;c<(tab_multiplicites_b[1]+1)*(tab_multiplicites_b[2]+1)+1;c++) {
								//contenu_lignes.push(`l : `+l+`, c : `+Number(c));
								contenu_lignes.push(``);
							};
						};						
						texte += `<br>`;
						texte += tab_C_L(ent_colonnes,ent_lignes,contenu_lignes);
						texte += `<br>`;
						texte +=num_alpha(1)+` En déduire le nombre de diviseurs de $${tex_nombre(nombre_a_decomposer_b)}$.<br>`;
						texte +=num_alpha(2)+` Enfin, dresser la liste des diviseurs de $${tex_nombre(nombre_a_decomposer_b)}$.<br>`;						
						// correction
						texte_corr = `Avec la décomposition en facteurs premiers de $${tex_nombre(nombre_a_decomposer_b)}$ qui est : $`;
						if (tab_multiplicites_b[0]==1) {
							texte_corr += `${tab_premiers_b[0]}`;							
						} else {
							texte_corr += `${tab_premiers_b[0]}^{${tab_multiplicites_b[0]}}`;
						};
						for (let k=1; k<tab_premiers_b.length;k++) {
							if (tab_multiplicites_b[k]==1) {
								texte_corr += `\\times ${tab_premiers_b[k]}`;
							} else {
								texte_corr += `\\times ${tab_premiers_b[k]}^{${tab_multiplicites_b[k]}}`;
							};							
						};
						texte_corr += `$, <br>`;
						texte_corr += num_alpha(0)+` Le tableau donne :`;
						// on crée le tableau des entetes de lignes et des colonnes
						let ent_lignes_corr = [];
						let ent_lignes_corr_res = [];
						let contenu_lignes_corr = [];
						//let contenu_lignes_corr_res = [];
						let ent_colonnes_corr = [`\\times`];
						let ent_colonnes_corr_res = [1];
						// les entetes des lignes
						for (let k=0;k<tab_multiplicites_b[0]+1;k++) {
							ent_lignes_corr.push(tab_premiers_b[0]+`^{`+k+`}`);
							ent_lignes_corr_res.push(tab_premiers_b[0]**k);							
						};						
						// les entetes des colonnes 
						for (let m=0;m<tab_multiplicites_b[1]+1;m++) {
							for (let l=0;l<tab_multiplicites_b[2]+1;l++) {
								ent_colonnes_corr.push(tab_premiers_b[1]+`^{`+m+`}\\times`+tab_premiers_b[2]+`^{`+l+`}`);
								ent_colonnes_corr_res.push(tab_premiers_b[1]**m*tab_premiers_b[2]**l);
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
						for (let l=0;l<(tab_multiplicites_b[1]+1)*(tab_multiplicites_b[2]+1)+1;l++) {
							for (let c=1;c<(tab_multiplicites_b[0]+2);c++) {
								//contenu_lignes_corr.push(`l : `+l+`, c : `+Number(c));								
								contenu_lignes_corr.push(ent_lignes_corr[l]+`\\times`+ent_colonnes_corr[c]+`=`+mise_en_evidence(tex_nombre(ent_lignes_corr_res[l]*ent_colonnes_corr_res[c])));																
							};
						};
						texte_corr += `<br>`;
						texte_corr += tab_C_L(ent_colonnes_corr,ent_lignes_corr,contenu_lignes_corr);
						texte_corr += `<br><br>`;
						texte_corr +=num_alpha(1)+` $${tex_nombre(nombre_a_decomposer_b)}$ a donc `;
						texte_corr += `$(${tab_multiplicites_b[0]}+1)\\times(${tab_multiplicites_b[1]}+1)\\times(${tab_multiplicites_b[2]}+1) = `;
						texte_corr += `${tab_multiplicites_b[0]+1}\\times${tab_multiplicites_b[1]+1}\\times${tab_multiplicites_b[2]+1} = `;
						texte_corr += `${(tab_multiplicites_b[0]+1)*(tab_multiplicites_b[1]+1)*(tab_multiplicites_b[2]+1)}$ diviseurs.<br>`;
						texte_corr += `En effet, dans la décomposition apparait : `;
						texte_corr += ` <br> - Le facteur premier $${tab_premiers_b[0]}$ avec la multiplicité $${tab_multiplicites_b[0]}$`;
						texte_corr += `, le facteur $${tab_premiers_b[0]}$ apparait donc sous les formes : `;
						for (let k=0;k<tab_multiplicites_b[0];k++) {
							texte_corr += `$${tab_premiers_b[0]}^{`+k+`}$ ou `;
						};
						texte_corr += `$${tab_premiers_b[0]}^{`+tab_multiplicites_b[0]+`}$ d'où le facteur $(${tab_multiplicites_b[0]}+1)$.`;

						texte_corr += ` <br> - Le facteur premier $${tab_premiers_b[1]}$ avec la multiplicité $${tab_multiplicites_b[1]}$`;
						texte_corr += `, le facteur $${tab_premiers_b[1]}$ apparait donc sous les formes : `;
						for (let k=0;k<tab_multiplicites_b[1];k++) {
							texte_corr += `$${tab_premiers_b[1]}^{`+k+`}$ ou `;
						};
						texte_corr += `$${tab_premiers_b[1]}^{`+tab_multiplicites_b[1]+`}$ d'où le facteur $(${tab_multiplicites_b[1]}+1)$.`;

						texte_corr += ` <br> - Le facteur premier $${tab_premiers_b[2]}$ avec la multiplicité $${tab_multiplicites_b[2]}$`;
						texte_corr += `, le facteur $${tab_premiers_b[2]}$ apparait donc sous les formes : `;
						for (let k=0;k<tab_multiplicites_b[2];k++) {
							texte_corr += `$${tab_premiers_b[2]}^{`+k+`}$ ou `;
						};
						texte_corr += `$${tab_premiers_b[2]}^{`+tab_multiplicites_b[2]+`}$ d'où le facteur $(${tab_multiplicites_b[2]}+1)$.`;

						texte_corr += `<br>`;
						texte_corr +=num_alpha(2)+` Enfin, voici la liste des $${(tab_multiplicites_b[0]+1)*(tab_multiplicites_b[1]+1)*(tab_multiplicites_b[2]+1)}$ diviseurs de $${tex_nombre(nombre_a_decomposer_b)}$ issus du tableau ci-dessus : `;
						texte_corr += `$1`;
						for (let w = 1; w<liste_diviseurs(nombre_a_decomposer_b).length; w++) {
							texte_corr += `\\text{; }`+tex_nombre(liste_diviseurs(nombre_a_decomposer_b)[w]);
						};
						texte_corr += `.$`;
						break;		
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
 
function Fractions_irreductibles(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Fractions irréductibles"; 
	// pas de différence entre la version html et la version latex pour la consigne
	this.consigne =`Décomposer une fraction et son inverse à partir des décompositons en facteurs premiers.`;
	this.consigne += `<br>`;
	sortie_html ? this.spacing = 4 : this.spacing = 3;
	sortie_html ? this.spacing_corr = 4: this.spacing_corr = 3;
	this.nb_questions = 1;
	//this.correction_detaillee_disponible = true;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A12.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")					
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		//let type_de_questions_disponibles = [1,2,3,4];
		let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);

			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
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
				candidats_premiers_communs = premiers_entre_bornes(2,13);
				// on fixe le nombre de divisuers premiers communs
				nb_div_prem_communs = 4;
				// on initialise le tableau des diviseurs premiers communs
				premiers_communs = [];
				// on initialise le tableau des rangs
				r=[];
				// on initialise le tableau des rangs déjà choisis
				r_exclus=[];
				// on complète le tableau des rangs des rangs des diviseurs premiers choisis
				for (let k=0;k<nb_div_prem_communs;k++) {
					for(let m=0;m<k;m++) {
						r_exclus.push(r[m]);
					};					
					r[k]=randint(0,candidats_premiers_communs.length-1,r_exclus);
				};
				// on complète le tableau des diviseurs premiers communs
				for (let k=0;k<nb_div_prem_communs;k++) {
					premiers_communs.push(candidats_premiers_communs[r[k]]);
				};
				// on initialise et on complète le tableau des multiplicités des diviseurs premiers communs
				multiplicites_premiers_communs = [];
				for (let k=0;k<nb_div_prem_communs;k++) {
					multiplicites_premiers_communs.push(randint(0,2));
				};
				// on supprime les diviseurs premiers de multiplicité 0 et leur multiplicité
				let idx = multiplicites_premiers_communs.indexOf(0);
				while (idx != -1) {
					premiers_communs.splice(idx,1);
					multiplicites_premiers_communs.splice(idx,1);
					idx = multiplicites_premiers_communs.indexOf(0);
				};
				// on initialise le tableau des diviseurs du premier et du second nombre avec les diviseurs premiers communs
				tab_nb1=[];
				tab_nb2=[];
				for (let k=0;k<premiers_communs.length;k++) {
					tab_nb1[k]=premiers_communs[k];
					tab_nb2[k]=premiers_communs[k];
				};								
				// on initialise les tableaux de multiplicité, ils sont les mêmes mais on pourrait vouloir qu'ils soient différents
				multiplicites_nb1=[];
				multiplicites_nb2=[];
				for (let k=0;k<premiers_communs.length;k++) {
					multiplicites_nb1[k]=multiplicites_premiers_communs[k];
					multiplicites_nb2[k]=multiplicites_premiers_communs[k];
				};				
				// on ajoute un facteur premier distinct pour chaque nombre plus petit que 30
				r_ex = randint(0,premiers_entre_bornes(2,30).length-1);
				nb1_dist = premiers_entre_bornes(2,30)[r_ex];				
				nb2_dist = premiers_entre_bornes(2,30)[randint(0,premiers_entre_bornes(2,30).length-1,r_ex)];				
				// on ajoute nb1_dist, nb2_dist dans les tableaux des diviseurs premiers du premier et du second nombre 
				// nb1
				let bool = false;
				let n = 0;
				while (n < tab_nb1.length && bool!=true) {
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
				for (let k=0;k<tab_nb1.length;k++) {
					tab_prem_mult_nb1[k]={'prem': tab_nb1[k],'mult':multiplicites_nb1[k]};
				};
				let tab_prem_mult_nb2 = [];
				for (let k=0;k<tab_nb2.length;k++) {
					tab_prem_mult_nb2[k]={'prem': tab_nb2[k],'mult':multiplicites_nb2[k]};
				};
				// on range selon prem croissant
				tab_prem_mult_nb1.sort(function(a,b){
					return a.prem>b.prem;
				});
				tab_prem_mult_nb2.sort(function(a,b){
					return a.prem>b.prem;
				});
				// on initialise nb1 et nb2 et on les calcule à partir des tableaux 				
				nb1=1;
				for (let k=0;k<tab_nb1.length;k++) {
				 	nb1=nb1*tab_prem_mult_nb1[k].prem**tab_prem_mult_nb1[k].mult;
				};
				nb2=1;
				for (let k=0;k<tab_nb2.length;k++) {
					nb2=nb2*tab_prem_mult_nb2[k].prem**tab_prem_mult_nb2[k].mult;	
			   };

				switch (type_de_questions) {
					case 1 : // décomposition de A
						texte = num_alpha(0)+` Décomposer $A = ${tex_nombre(nb1)}$ en produit de facteurs premiers : `;
						texte_corr =num_alpha(0)+` La décomposition en produit de facteurs premier de $A = `;
						switch (tab_prem_mult_nb1[0].mult) {
							case 1 :
								texte_corr += `${tab_prem_mult_nb1[0].prem}`;
								break;
							default :
								texte_corr += `${tab_prem_mult_nb1[0].prem}^{${tab_prem_mult_nb1[0].mult}}`;
								break;
						};
						for (let k=1; k<tab_nb1.length;k++) {
							switch (tab_prem_mult_nb1[k].mult) {
								case 1 :
									texte_corr += `\\times${tab_prem_mult_nb1[k].prem}`;
									break;
								default :
									texte_corr += `\\times${tab_prem_mult_nb1[k].prem}^{${tab_prem_mult_nb1[k].mult}}`;
									break;
							};						
						};
						texte_corr += `$.`;
					//	break;		
					//case 2 : // décomposition de B 	
						texte += `<br>`+num_alpha(1)+` Décomposer $B = ${tex_nombre(nb2)}$ en produit de facteurs premiers : `;
						texte_corr += `<br>`+num_alpha(1)+` La décomposition en produit de facteurs premier de $B = `;
						switch (tab_prem_mult_nb2[0].mult) {
							case 1 :
								texte_corr += `${tab_prem_mult_nb2[0].prem}`;
								break;
							default :
								texte_corr += `${tab_prem_mult_nb2[0].prem}^{${tab_prem_mult_nb2[0].mult}}`;
								break;
						};
						for (let k=1; k<tab_nb2.length;k++) {
							switch (tab_prem_mult_nb2[k].mult) {
								case 1 :
									texte_corr += `\\times${tab_prem_mult_nb2[k].prem}`;
									break;
								default :
									texte_corr += `\\times${tab_prem_mult_nb2[k].prem}^{${tab_prem_mult_nb2[k].mult}}`;
									break;
							};						
						};
						texte_corr += `$.`;
					//	break;	
					//case 3 : // reduction de A sur B 			
						texte += `<br>`+num_alpha(2)+` Rendre la fraction $\\dfrac{A}{B} = \\dfrac{${tex_nombre(nb1)}}{${tex_nombre(nb2)}}$ irréductible `;
						texte += ` à l'aide des décompositions obtenues au `+num_alpha(0)+` et au `+num_alpha(1);
						texte_corr += `<br>`+num_alpha(2)+` $\\dfrac{A}{B} = \\dfrac{${tex_nombre(nb1)}}{${tex_nombre(nb2)}} = `;
						texte_corr += `\\dfrac{`;
						texte_corr += `\\cancel{`+decomp_fact_prem_array(nb1/nb1_dist)[0]+`}`;
						for (let k=1;k<decomp_fact_prem_array(nb1/nb1_dist).length;k++) {
							texte_corr += `\\times \\cancel{`+decomp_fact_prem_array(nb1/nb1_dist)[k]+`}`
						};
						texte_corr += `\\times ${nb1_dist}}{`;
						texte_corr += `\\cancel{`+decomp_fact_prem_array(nb1/nb1_dist)[0]+`}`;
						for (let k=1;k<decomp_fact_prem_array(nb1/nb1_dist).length;k++) {
							texte_corr += `\\times \\cancel{`+decomp_fact_prem_array(nb1/nb1_dist)[k]+`}`
						};
						texte_corr += `\\times ${nb2_dist}} = `;						
						texte_corr += `\\dfrac{${nb1_dist}}{${nb2_dist}}$.`;
					//	break;	
					//case 4 : // reduction de B sur A 			
						texte += `<br>`+num_alpha(3)+` Rendre la fraction $\\dfrac{B}{A} = \\dfrac{${tex_nombre(nb2)}}{${tex_nombre(nb1)}}$ irréductible`;
						texte += ` à l'aide des décompositions obtenues au `+num_alpha(0)+` et au `+num_alpha(1);
						texte += warn_message(`Une observation judicieuse et argumentée pourra faire gagner du temps!`);
						texte_corr += `<br>`+num_alpha(3)+` $\\dfrac{B}{A}$ est l'inverse de $\\dfrac{A}{B}$ donc $\\dfrac{B}{A} = \\dfrac{${tex_nombre(nb2)}}{${tex_nombre(nb1)}} = `;
						texte_corr += `\\dfrac{`;
						texte_corr += `\\cancel{`+decomp_fact_prem_array(nb1/nb1_dist)[0]+`}`;
						for (let k=1;k<decomp_fact_prem_array(nb1/nb1_dist).length;k++) {
							texte_corr += `\\times \\cancel{`+decomp_fact_prem_array(nb1/nb1_dist)[k]+`}`
						};
						texte_corr += `\\times ${nb2_dist}}{`;
						texte_corr += `\\cancel{`+decomp_fact_prem_array(nb1/nb1_dist)[0]+`}`;
						for (let k=1;k<decomp_fact_prem_array(nb1/nb1_dist).length;k++) {
							texte_corr += `\\times \\cancel{`+decomp_fact_prem_array(nb1/nb1_dist)[k]+`}`
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
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
 
function PPCM_Engrenages(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Engrenages"; 
	// pas de différence entre la version html et la version latex pour la consigne
	//this.consigne =`Déterminer au bout de combien de tours les deux roues seront toutes les deux revenues à leur position initiale.`;
	this.consigne =``;
	//this.consigne += `<br>`;
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
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
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		if (sortie_html) { // les boutons d'aide uniquement pour la version html
			//this.bouton_aide = '';
			this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FicheArithmetique-3A13.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")		
			//this.bouton_aide += modal_video('conteMathsNombresPremiers','videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
		} else { // sortie LaTeX
		};

		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4];
		//let type_de_questions_disponibles = [1];
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions);
		this.introduction = lampe_message(
			`Arithmétique des engrenages`,
			`Boîte de vitesse, transmission de vélo, de moto, perceuse electrique, tout ça fonctionne avec des engrenages! Mais au fait, comment ça marche, les engrenages?`,
			`nombres`
			);
		if (sortie_html) {						
			this.introduction += warn_message(`Attention, les roues ci-dessous ne comportent pas le nombre de dents de l'énoncé!`);
			this.introduction += `<div id="${num_ex}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`;					 							
			SVG_engrenages(num_ex,200,200);						
		};
			for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
				type_de_questions = liste_type_de_questions[i];
				
				if (sortie_html) {
					let id_unique = `${num_ex}_${i}_${Date.now()}`
					var id_du_div = `div_svg${numero_de_l_exercice}${id_unique}`;
					//var id_du_div_corr = `div_svg_corr${numero_de_l_exercice}${id_unique}`;
				 }

				 var nb_dents_r1;
				 var nb_dents_r2;

				switch (type_de_questions) {
					case 1 : // avec de petits nombres on calcule les mutliples
						nb_dents_r1 = randint(5,30);
						nb_dents_r2 = randint(5,30,nb_dents_r1);
						texte = `La roue n$\\degree$1 possède $${nb_dents_r1}$ dents et la roue n$\\degree$2 en a $${nb_dents_r2}$ dents.`;
						texte += `<br>`+num_alpha(0)+` Écrire la liste des multiples de $${nb_dents_r1}$ et de $${nb_dents_r2}$.`
						if (ppcm(nb_dents_r1,nb_dents_r2)==(nb_dents_r1*nb_dents_r2)) {
							texte += `<br>Pourquoi peut-on en déduire que ${nb_dents_r1} et ${nb_dents_r2} sont des `;
							texte += katex_Popup2(
								numero_de_l_exercice+1,
								1,
								"nombres premiers entre eux ?",
								`Définition : Nombres premiers entre eux`,
								`Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que \\textbf{les nombres a et b sont premiers entre eux}.`
							);
						};
						texte += `<br>`+num_alpha(1)+` En déduire le nombre de tours de chaque roue avant le retour à leur position initiale.`						
						texte_corr = num_alpha(0)+` Liste des premiers multiples de $${nb_dents_r1}$ : <br>`;
						// on va faire en sorte de toujours avoir un nombre de multiples multiple de 5
						let nb_marge = 5-(ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1)%5;
						let k_max = (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1+nb_marge);						
						for (let k=1;k<k_max+1;k++) {
							texte_corr += `$${k}\\times${nb_dents_r1} = `;
							if (k==(ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1)) {
								texte_corr += mise_en_evidence(tex_nombre(k*nb_dents_r1));
								texte_corr += `$ ; `;
							} else {
								texte_corr += `${tex_nombre(k*nb_dents_r1)}$ ; `;
							};
							if (k%5==0) {
								texte_corr += `<br>`;
							}
						};
						texte_corr += `$\\ldots$ `;
						texte_corr += `<br>`;
						texte_corr += ` Liste des premiers multiples de ${nb_dents_r2} : <br>`;
						// on va faire en sorte de toujours avoir un nombre de multiples multiple de 5
						nb_marge = 5-(ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2)%5;
						k_max = (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2+nb_marge);
						for (let k=1;k<k_max+1;k++) {							
							texte_corr += `$${k}\\times${nb_dents_r2} = `;
							if (k==(ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2)) {
								texte_corr += mise_en_evidence(tex_nombre(k*nb_dents_r2));
								texte_corr += `$ ; `;
							} else {
								texte_corr += `${tex_nombre(k*nb_dents_r2)}$ ; `;
							};
							if (k%5==0) {
								texte_corr += `<br>`;
							}
						};
						texte_corr += `$\\ldots$ `;
						texte_corr += `<br>`;
						texte_corr += `Le plus petit multiple commun à $${nb_dents_r1}$ et $${nb_dents_r2}$ vaut donc $ppcm(${nb_dents_r1},${nb_dents_r2}) = ${ppcm(nb_dents_r1,nb_dents_r2)}$.`
						texte_corr += `<br>`+num_alpha(1)+` Chaque roue doit tourner de $ppcm(${nb_dents_r1},${nb_dents_r2})=${tex_nombre(ppcm(nb_dents_r1,nb_dents_r2))}$ dents.`;
						texte_corr += `<br> Cela correspond à $(${ppcm(nb_dents_r1,nb_dents_r2)}\\text{ dents})\\div (${nb_dents_r1}\\text{ dents/tour}) = ${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1}$`;
						if (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1==1) {
							texte_corr += ` tour `;
						} else {
							texte_corr += ` tours `;
						};						
						texte_corr +=`pour la roue n$\\degree$1.`
						texte_corr += `<br>Cela correspond à $(${ppcm(nb_dents_r1,nb_dents_r2)}\\text{ dents})\\div (${nb_dents_r2}\\text{ dents/tour}) = ${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2}$`;
						if (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2==1) {
							texte_corr += ` tour `;
						} else {
							texte_corr += ` tours `;
						};				
						texte_corr += `pour la roue n$\\degree$2.`
						break;		
					case 2 : // avec de plus grands nombre, c'est mieux de décomposer en facteurs premiers
						nb_dents_r1 = randint(31,80);
						nb_dents_r2 = randint(31,80,nb_dents_r1);
						texte = `La roue n$\\degree$1 possède $${nb_dents_r1}$ dents et la roue n$\\degree$2 en a $${nb_dents_r2}$ dents.`;
						texte += `<br>`+num_alpha(0)+` Décomposer $${nb_dents_r1}$ et $${nb_dents_r2}$ en produit de facteurs premiers.`;
						if (ppcm(nb_dents_r1,nb_dents_r2)==(nb_dents_r1*nb_dents_r2)) {
							texte += `<br>Pourquoi peut-on en déduire que ${nb_dents_r1} et ${nb_dents_r2} sont des `;
							texte += katex_Popup2(
								numero_de_l_exercice+2,
								1,
								"nombres premiers entre eux",
								`Définition : Nombres premiers entre eux`,
								`Étant donnés deux nombres entiers a et b, lorsque $ppcm(a,b)=a\\times b$, on dit que \\textbf{les nombres a et b sont premiers entre eux}.`
							);
						};
						texte += `<br>`+num_alpha(1)+` En déduire le nombre de tours de chaque roue avant le retour à leur position initiale.`;
						texte_corr = `Pour un nombre de dents plus élevé, il est plus commode d'utiliser les décompositions en produit de facteurs premiers.`
						texte_corr += `<br>`+num_alpha(0)+` Décomposition de $${nb_dents_r1}$ en produit de facteurs premiers :  $${nb_dents_r1} = ${decomposition_facteurs_premiers(nb_dents_r1)}$.`;
						texte_corr += `<br> Décomposition de $${nb_dents_r2}$ en produit de facteurs premiers :  $${nb_dents_r2} = ${decomposition_facteurs_premiers(nb_dents_r2)}$.`;
						texte_corr += `<br> D'où $ppcm(${nb_dents_r1},${nb_dents_r2})= ${decomposition_facteurs_premiers(ppcm(nb_dents_r1,nb_dents_r2))}$.<br>`;						
						texte_corr += `<br>`+num_alpha(1)+` Chaque roue doit tourner de $ppcm(${nb_dents_r1},${nb_dents_r2})=${tex_nombre(ppcm(nb_dents_r1,nb_dents_r2))}$ dents.`;
						texte_corr += `<br> Cela correspond à $(${tex_nombre(ppcm(nb_dents_r1,nb_dents_r2))}\\text{ dents})\\div (${nb_dents_r1}\\text{ dents/tour}) = ${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1}$`;
						if (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1==1) {
							texte_corr += ` tour `;
						} else {
							texte_corr += ` tours `;
						};						
						texte_corr +=`pour la roue n$\\degree$1.`;						
						texte_corr += `<br> Cela correspond à $(${tex_nombre(ppcm(nb_dents_r1,nb_dents_r2))}\\text{ dents})\\div (${nb_dents_r2}\\text{ dents/tour}) = ${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2}$`;
						if (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2==1) {
							texte_corr += ` tour `;
						} else {
							texte_corr += ` tours `;
						};						
						texte_corr +=`pour la roue n$\\degree$2.`
						break;		
					case 3 : // déterminer le nombre de dents d'une roue connaissant l'autre et le nombre de tours necessaires à la re-synchro
						nb_dents_r1 = randint(5,80);
						nb_dents_r2 = randint(5,80,nb_dents_r1);						
						texte = `La roue n$\\degree$2 a maintenant $${nb_dents_r2}$ dents.`;
						texte += ` Déterminer le nombre de dents de la roue n$\\degree$1 qui ferait $${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1}$ `;
						if (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1==1) {
							texte += ` tour `;
						} else {
							texte += ` tours `;
						};	
						texte += ` pendant que la roue n$\\degree$2 en fait $${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2}$.`
						texte_corr = `Puisque la roue n$\\degree$2, qui a $${nb_dents_r2}$ dents, fait $${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2}$ `;
						if (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r2==1) {
							texte_corr += ` tour `;
						} else {
							texte_corr += ` tours `;
						};	
						texte_corr +=`, cela représente $${tex_nombre(ppcm(nb_dents_r1,nb_dents_r2))}$ dents.`;
						texte_corr += `<br>La roue n$\\degree$1 doit donc aussi tourner de $${tex_nombre(ppcm(nb_dents_r1,nb_dents_r2))}$ dents, ceci en $${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1}$ `;
						if (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1==1) {
							texte_corr += ` tour `;
						} else {
							texte_corr += ` tours `;
						};							
						texte_corr += `.`;
						texte_corr += `<br> on obtient donc $(${tex_nombre(ppcm(nb_dents_r1,nb_dents_r2))}\\text{ dents})\\div (${ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1}\\text{`;
						if (ppcm(nb_dents_r1,nb_dents_r2)/nb_dents_r1==1) {
							texte_corr += ` tour `;
						} else {
							texte_corr += ` tours `;
						};
						texte_corr += `}) = ${nb_dents_r1} \\text{ dents/tour}.$`
						texte_corr += `<br>La roue n$\\degree$1 a donc : $${nb_dents_r1}$ dents.`;
						break;		
				};
			
				if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
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
*/
function Image_graphique(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire l'image d'un nombre à partir d'un graphique"
	this.consigne = ""
	this.sup = 3;
	this.spacing = 1;
	sortie_html ? this.spacing_corr =3 : this.spacing_corr = 1 ;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [800,600];
	this.pas_de_version_LaTeX = false;
	this.nb_cols = 1;
	this.liste_packages = 'pgfplots';


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		let codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAAEL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFAeKkeuFHrhEBzy4UeuFHs#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAAA4AAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8AAAAAAQ4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBCb52yLQ5WAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wAAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AAAAAAAOAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADgAAAQUAAQAAAAcAAAAJAP####8AAAAAAQ4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAQEAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAduYmdyYWR4AAIyMAAAAAFANAAAAAAAAAAAABEA#####wAHbmJncmFkeQACMjAAAAABQDQAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAUR3JhZHVhdGlvbkF4ZXNSZXBlcmUAAAAbAAAACAAAAAMAAAAKAAAADwAAABD#####AAAAAQATQ0Fic2Npc3NlT3JpZ2luZVJlcAAAAAARAAVhYnNvcgAAAAr#####AAAAAQATQ09yZG9ubmVlT3JpZ2luZVJlcAAAAAARAAVvcmRvcgAAAAoAAAALAAAAABEABnVuaXRleAAAAAr#####AAAAAQAKQ1VuaXRleVJlcAAAAAARAAZ1bml0ZXkAAAAK#####wAAAAEAEENQb2ludERhbnNSZXBlcmUAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADgAAABMAAAAWAAAAABEAAAAAAA4AAAEFAAAAAAoAAAANAAAAAA4AAAASAAAADgAAABQAAAAOAAAAEwAAABYAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADQAAAAAOAAAAEwAAAA4AAAAVAAAADAAAAAARAAAAFgAAAA4AAAAPAAAADwAAAAARAAAAAAAOAAABBQAAAAAXAAAAGQAAAAwAAAAAEQAAABYAAAAOAAAAEAAAAA8AAAAAEQAAAAAADgAAAQUAAAAAGAAAABv#####AAAAAQAIQ1NlZ21lbnQAAAAAEQEAAAAAEAAAAQABAAAAFwAAABoAAAAXAAAAABEBAAAAABAAAAEAAQAAABgAAAAcAAAABAAAAAARAQAAAAALAAFXAMAUAAAAAAAAwDQAAAAAAAAFAAE#3FZ4mrzfDgAAAB3#####AAAAAgAIQ01lc3VyZVgAAAAAEQAGeENvb3JkAAAACgAAAB8AAAARAAAAABEABWFic3cxAAZ4Q29vcmQAAAAOAAAAIP####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUBAAAAEQBmZmYAAAAfAAAADgAAAA8AAAAfAAAAAgAAAB8AAAAfAAAAEQAAAAARAAVhYnN3MgANMiphYnNvci1hYnN3MQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEgAAAA4AAAAhAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAACMAAAAOAAAAEwAAABkBAAAAEQBmZmYAAAAkAAAADgAAAA8AAAAfAAAABQAAAB8AAAAgAAAAIQAAACMAAAAkAAAABAAAAAARAQAAAAALAAFSAEAgAAAAAAAAwCAAAAAAAAAFAAE#0RtOgbToHwAAAB7#####AAAAAgAIQ01lc3VyZVkAAAAAEQAGeUNvb3JkAAAACgAAACYAAAARAAAAABEABW9yZHIxAAZ5Q29vcmQAAAAOAAAAJwAAABkBAAAAEQBmZmYAAAAmAAAADgAAABAAAAAmAAAAAgAAACYAAAAmAAAAEQAAAAARAAVvcmRyMgANMipvcmRvci1vcmRyMQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEwAAAA4AAAAoAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAABIAAAAOAAAAKgAAABkBAAAAEQBmZmYAAAArAAAADgAAABAAAAAmAAAABQAAACYAAAAnAAAAKAAAACoAAAAr#####wAAAAIADENDb21tZW50YWlyZQAAAAARAWZmZgAAAAAAAAAAAEAYAAAAAAAAAAAAHwsAAf###wAAAAEAAAAAAAAAAQAAAAAAAAAAAAsjVmFsKGFic3cxKQAAABkBAAAAEQBmZmYAAAAtAAAADgAAAA8AAAAfAAAABAAAAB8AAAAgAAAAIQAAAC0AAAAbAAAAABEBZmZmAAAAAAAAAAAAQBgAAAAAAAAAAAAkCwAB####AAAAAQAAAAAAAAABAAAAAAAAAAAACyNWYWwoYWJzdzIpAAAAGQEAAAARAGZmZgAAAC8AAAAOAAAADwAAAB8AAAAGAAAAHwAAACAAAAAhAAAAIwAAACQAAAAvAAAAGwAAAAARAWZmZgDAIAAAAAAAAD#wAAAAAAAAAAAAJgsAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIxKQAAABkBAAAAEQBmZmYAAAAxAAAADgAAABAAAAAmAAAABAAAACYAAAAnAAAAKAAAADEAAAAbAAAAABEBZmZmAMAcAAAAAAAAAAAAAAAAAAAAAAArCwAB####AAAAAgAAAAEAAAABAAAAAAAAAAAACyNWYWwob3JkcjIpAAAAGQEAAAARAGZmZgAAADMAAAAOAAAAEAAAACYAAAAGAAAAJgAAACcAAAAoAAAAKgAAACsAAAAz#####wAAAAEABUNGb25jAP####8AAWYACC0yKngqeCszAAAADQD#####AAAAAQAMQ01vaW5zVW5haXJlAAAADQIAAAANAgAAAAFAAAAAAAAAAP####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAAeAAAAAAAAAAFACAAAAAAAAAABeAAAAAQA#####wEAAAAAEAABeAAAAAAAAAAAAEAIAAAAAAAABQABQC8BAyKX1IIAAAAEAAAAGAD#####AAJ4MQAAAAoAAAA2AAAAEQD#####AAJ5MQAFZih4MSn#####AAAAAQAOQ0FwcGVsRm9uY3Rpb24AAAA1AAAADgAAADcAAAAWAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAADgAAADcAAAAOAAAAOP####8AAAACAA1DTGlldURlUG9pbnRzAP####8AAAD#AAIAAAA5AAAB9AABAAAANgAAAAQAAAA2AAAANwAAADgAAAA5#####wAAAAEAFUNQb2ludExpZUxpZXVQYXJQdExpZQD#####AAAAAAAQAAFNAAAAAAAAAAAAQAgAAAAAAAAJAAG##CuHsx36wAAAADq##CuHsx36wAAAAAMA#####wEAAAABEAAAAQABAAAAOwA#8AAAAAAAAAAAAAMA#####wEAAAABEAAAAQABAAAAOwE#8AAAAAAAAP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAEAAAAPAAAACIA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAUAAAA9AAAAFwD#####AAAAAAAQAAABAQEAAAA7AAAAPgAAABcA#####wAAAAAAEAAAAQEBAAAAOwAAAD8AAAAO##########8="

		let a, b, c, d, x1, x2, x3, fx1, fx2, fx3, expression_f, numa, dena, numb, denb, numc, denc, ymax ;

		function initialise_variables() { 
			if (sortie_html){ // repère -10 || 10
				x1 = randint(-6,-3);
				x2 = randint(x1+3,2);
				x3 = randint(x2+2,8);
				fx1 = randint(-5,5);
				fx2 = randint(-6,6);
				fx3 = randint(-5,5);
				d = randint(-5,5);
				c = randint(-5,5);
				ymax = 7;
			} else { // repère -5 || 5
				x1 = randint(-4,-2);
				x2 = randint(-1,2,[0]);
				x3 = randint(3,4);
				fx1 = randint(-4,4);
				fx2 = randint(-4,4);
				fx3 = randint(-4,4);
				d = randint(-3,3);
				c = randint(-3,3);
				ymax = 4;
			}
		};

		initialise_variables();


		texte = `On a tracé ci-dessous la courbe représentative de la fonction $f$.<br>`

		if (this.sup==1) {

			a = calcul((fx2-fx1)/(x2-x1));
			b = calcul(fx1 - a*x1);
			expression_f = `${a}*x+(${b})`;

			texte += `Déterminer par lecture graphique les images de $${x1}$ et de $${x2}$ par cette fonction $f$.<br><br>`
			texte_corr = `L'image de $${x1}$ est $${fx1}$, on note $f(${x1})=${fx1}$.<br>`
			texte_corr += `L'image de $${x2}$ est $${fx2}$, on note $f(${x2})=${fx2}$.`

		}

		if (this.sup==2) {
			[[numa,dena],[numb,denb]]=resol_sys_lineaire_2x2(x1,x3,fx1,fx3,c)
			while (dena==0 || denb==0 || numa==0 ){
				x1 = randint(-6,-3);
				x3 = randint(1,6);
				fx1 = randint(-5,5);
				fx3 = randint(-6,6);
				d = randint(-10,10);

				[[numa,dena],[numb,denb]]=resol_sys_lineaire_2x2(x1,x3,fx1,fx3,c)
			}
			a = numa/dena;
			b = numb/denb;
			x2 = 0;
			fx2 = c;

			expression_f = `${a}*x^2+(${b})*x+(${c})`;
		}

		if (this.sup==3) {
			[[numa,dena],[numb,denb],[numc,denc]]=resol_sys_lineaire_3x3(x1,x2,x3,fx1,fx2,fx3,d)
			let [extremum1,extremum2] = cherche_min_max_f ([numa/dena,numb/denb,numc/denc,d])
			while (dena==0 || denb==0 || denc==0 || abs(extremum1[1])>ymax || abs(extremum2[1])>ymax) {
				initialise_variables();
				[[numa,dena],[numb,denb],[numc,denc]]=resol_sys_lineaire_3x3(x1,x2,x3,fx1,fx2,fx3,d)
				if (cherche_min_max_f([numa/dena,numb/denb,numc/denc,d])==[]) {
					[extremum1,extremum2] = [[0,999],[0,999]]
				} else {
					[extremum1,extremum2] = cherche_min_max_f([numa/dena,numb/denb,numc/denc,d])
				}
			}
			a = numa/dena;
			b = numb/denb;
			c = numc/denc;

			expression_f = `${a}*x^3+(${b})*x^2+(${c})*x+(${d})`;
		}

		if (this.sup==2 || this.sup==3){
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

	this.besoin_formulaire_numerique = ['Type de fonctions',3,"1 : Affine\n2 : Polynome du 2nd degré\n3 : Polynome du 3e degré"];

}

/**
* Un graphique étant tracé, déterminer les antécédents de nombres donnés.
* La fonction est un polynome de degré 1, 2 ou 3 et les nombres des questions ne sont que des entiers.
*
* @Auteur Rémi Angot
*/
function Antecedent_graphique(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lire les antécédents d'un nombre à partir d'un graphique"
	this.consigne = ""
	this.sup = 2;
	this.spacing = 1;
	sortie_html ? this.spacing_corr =3 : this.spacing_corr = 1 ;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.type_exercice = 'MG32';
	this.taille_div_MG32 = [800,600];
	this.pas_de_version_LaTeX = false;
	this.nb_cols = 1;
	this.liste_packages = 'pgfplots';


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		this.contenu = ''; // Liste de questions
		this.contenu_correction = ''; // Liste de questions corrigées
		let codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAAEL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFAeKkeuFHrhEBzy4UeuFHs#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAAA4AAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8AAAAAAQ4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBCb52yLQ5WAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wAAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AAAAAAAOAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADgAAAQUAAQAAAAcAAAAJAP####8AAAAAAQ4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAQEAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAduYmdyYWR4AAIyMAAAAAFANAAAAAAAAAAAABEA#####wAHbmJncmFkeQACMjAAAAABQDQAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAUR3JhZHVhdGlvbkF4ZXNSZXBlcmUAAAAbAAAACAAAAAMAAAAKAAAADwAAABD#####AAAAAQATQ0Fic2Npc3NlT3JpZ2luZVJlcAAAAAARAAVhYnNvcgAAAAr#####AAAAAQATQ09yZG9ubmVlT3JpZ2luZVJlcAAAAAARAAVvcmRvcgAAAAoAAAALAAAAABEABnVuaXRleAAAAAr#####AAAAAQAKQ1VuaXRleVJlcAAAAAARAAZ1bml0ZXkAAAAK#####wAAAAEAEENQb2ludERhbnNSZXBlcmUAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADgAAABMAAAAWAAAAABEAAAAAAA4AAAEFAAAAAAoAAAANAAAAAA4AAAASAAAADgAAABQAAAAOAAAAEwAAABYAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADQAAAAAOAAAAEwAAAA4AAAAVAAAADAAAAAARAAAAFgAAAA4AAAAPAAAADwAAAAARAAAAAAAOAAABBQAAAAAXAAAAGQAAAAwAAAAAEQAAABYAAAAOAAAAEAAAAA8AAAAAEQAAAAAADgAAAQUAAAAAGAAAABv#####AAAAAQAIQ1NlZ21lbnQAAAAAEQEAAAAAEAAAAQABAAAAFwAAABoAAAAXAAAAABEBAAAAABAAAAEAAQAAABgAAAAcAAAABAAAAAARAQAAAAALAAFXAMAUAAAAAAAAwDQAAAAAAAAFAAE#3FZ4mrzfDgAAAB3#####AAAAAgAIQ01lc3VyZVgAAAAAEQAGeENvb3JkAAAACgAAAB8AAAARAAAAABEABWFic3cxAAZ4Q29vcmQAAAAOAAAAIP####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUBAAAAEQBmZmYAAAAfAAAADgAAAA8AAAAfAAAAAgAAAB8AAAAfAAAAEQAAAAARAAVhYnN3MgANMiphYnNvci1hYnN3MQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEgAAAA4AAAAhAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAACMAAAAOAAAAEwAAABkBAAAAEQBmZmYAAAAkAAAADgAAAA8AAAAfAAAABQAAAB8AAAAgAAAAIQAAACMAAAAkAAAABAAAAAARAQAAAAALAAFSAEAgAAAAAAAAwCAAAAAAAAAFAAE#0RtOgbToHwAAAB7#####AAAAAgAIQ01lc3VyZVkAAAAAEQAGeUNvb3JkAAAACgAAACYAAAARAAAAABEABW9yZHIxAAZ5Q29vcmQAAAAOAAAAJwAAABkBAAAAEQBmZmYAAAAmAAAADgAAABAAAAAmAAAAAgAAACYAAAAmAAAAEQAAAAARAAVvcmRyMgANMipvcmRvci1vcmRyMQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEwAAAA4AAAAoAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAABIAAAAOAAAAKgAAABkBAAAAEQBmZmYAAAArAAAADgAAABAAAAAmAAAABQAAACYAAAAnAAAAKAAAACoAAAAr#####wAAAAIADENDb21tZW50YWlyZQAAAAARAWZmZgAAAAAAAAAAAEAYAAAAAAAAAAAAHwsAAf###wAAAAEAAAAAAAAAAQAAAAAAAAAAAAsjVmFsKGFic3cxKQAAABkBAAAAEQBmZmYAAAAtAAAADgAAAA8AAAAfAAAABAAAAB8AAAAgAAAAIQAAAC0AAAAbAAAAABEBZmZmAAAAAAAAAAAAQBgAAAAAAAAAAAAkCwAB####AAAAAQAAAAAAAAABAAAAAAAAAAAACyNWYWwoYWJzdzIpAAAAGQEAAAARAGZmZgAAAC8AAAAOAAAADwAAAB8AAAAGAAAAHwAAACAAAAAhAAAAIwAAACQAAAAvAAAAGwAAAAARAWZmZgDAIAAAAAAAAD#wAAAAAAAAAAAAJgsAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIxKQAAABkBAAAAEQBmZmYAAAAxAAAADgAAABAAAAAmAAAABAAAACYAAAAnAAAAKAAAADEAAAAbAAAAABEBZmZmAMAcAAAAAAAAAAAAAAAAAAAAAAArCwAB####AAAAAgAAAAEAAAABAAAAAAAAAAAACyNWYWwob3JkcjIpAAAAGQEAAAARAGZmZgAAADMAAAAOAAAAEAAAACYAAAAGAAAAJgAAACcAAAAoAAAAKgAAACsAAAAz#####wAAAAEABUNGb25jAP####8AAWYACC0yKngqeCszAAAADQD#####AAAAAQAMQ01vaW5zVW5haXJlAAAADQIAAAANAgAAAAFAAAAAAAAAAP####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAAeAAAAAAAAAAFACAAAAAAAAAABeAAAAAQA#####wEAAAAAEAABeAAAAAAAAAAAAEAIAAAAAAAABQABQC8BAyKX1IIAAAAEAAAAGAD#####AAJ4MQAAAAoAAAA2AAAAEQD#####AAJ5MQAFZih4MSn#####AAAAAQAOQ0FwcGVsRm9uY3Rpb24AAAA1AAAADgAAADcAAAAWAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAADgAAADcAAAAOAAAAOP####8AAAACAA1DTGlldURlUG9pbnRzAP####8AAAD#AAIAAAA5AAAB9AABAAAANgAAAAQAAAA2AAAANwAAADgAAAA5#####wAAAAEAFUNQb2ludExpZUxpZXVQYXJQdExpZQD#####AAAAAAAQAAFNAAAAAAAAAAAAQAgAAAAAAAAJAAG#fx#Yd2ToAAAAADq#fx#Yd2ToAAAAAAMA#####wEAAAABEAAAAQABAAAAOwA#8AAAAAAAAAAAAAMA#####wEAAAABEAAAAQABAAAAOwE#8AAAAAAAAP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAEAAAAPAAAACIA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAUAAAA9AAAAFwD#####AAAAAAAQAAABAQEAAAA7AAAAPgAAABcA#####wAAAAAAEAAAAQEBAAAAOwAAAD8AAAAO##########8="

		let a, b, c, d, x1, x2, x3, fx1, fx2, fx3, expression_f, numa, dena, numb, denb, numc, denc, ymax ;

		function initialise_variables() { 
			if (sortie_html){ // repère -10 || 10
				x1 = randint(-6,-3);
				x2 = randint(x1+3,2);
				x3 = randint(x2+2,8);
				fx1 = randint(-5,5);
				fx2 = randint(-6,6);
				fx3 = randint(-5,5);
				d = randint(-5,5);
				c = randint(-5,5);
				ymax = 7;
			} else { // repère -5 || 5
				x1 = randint(-4,-2);
				x2 = randint(-1,2,[0]);
				x3 = randint(3,4);
				fx1 = randint(-4,4);
				fx2 = randint(-4,4);
				fx3 = randint(-4,4);
				d = randint(-3,3);
				c = randint(-3,3);
				ymax = 4;
			}
		};

		initialise_variables();


		texte = `On a tracé ci-dessous la courbe représentative de la fonction $f$.<br>`

		if (this.sup==1) {

			a = calcul((fx2-fx1)/(x2-x1));
			b = calcul(fx1 - a*x1);
			expression_f = `${a}*x+(${b})`;

			texte += `Déterminer par lecture graphique les antécédents de $${fx1}$ et de $${fx2}$ par cette fonction $f$.<br><br>`
			texte_corr = `L'antécédent de $${fx1}$ est $${x1}$, on note $f(${x1})=${fx1}$.<br>`
			texte_corr += `L'antécédent de $${fx2}$ est $${x2}$, on note $f(${x2})=${fx2}$.`

		}

		if (this.sup==2) {
			if (randint(1,3)<3) { // une fois sur 3 il n'y a qu'un seul antécédent
				let x0 = randint(-2,2)
				let fx0 = randint(-4,4)
				a = randint(-3,3,0);
				texte += `Déterminer par lecture graphique les antécédents de $${fx0}$ par cette fonction $f$.<br><br>`
				texte_corr = `$${fx0}$ a un unique antécédent $${x0}$, on note $f(${x0})=${fx0}$.<br>`
				expression_f = `${a}*(x-(${x0}))^2+(${fx0})`;
			} else{
				fx3=fx1;
				[[numa,dena],[numb,denb]]=resol_sys_lineaire_2x2(x1,x3,fx1,fx3,c)
				while (dena==0 || denb==0 || numa==0 ){
					x1 = randint(-6,-3);
					x3 = randint(1,6);
					fx1 = randint(-5,5);
					fx3 = fx1;
					d = randint(-10,10);

					[[numa,dena],[numb,denb]]=resol_sys_lineaire_2x2(x1,x3,fx1,fx3,c)
				}
				a = numa/dena;
				b = numb/denb;
				x2 = 0;
				fx2 = c;	
				expression_f = `${a}*x^2+(${b})*x+(${c})`;
				texte += `Déterminer par lecture graphique les antécédents de $${fx1}$ par cette fonction $f$.<br><br>`
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

	this.besoin_formulaire_numerique = ['Type de fonctions',2,"1 : Affine\n2 : Polynome du 2nd degré"];

}
