import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu, randint, combinaisonListes,
 Relatif, lettreDepuisChiffre, ecritureNombreRelatif,
 texte_en_couleur_et_gras} from '../../modules/outils.js'
export const titre = 'Multiplications et quotients de relatifs : signe avec une lettre'

/**
* Effectuer des multiplications de relatifs dans un tableau à double entrée
*
* @Auteur Cédric GROLLEAU
* 4C10-6
*/
export default function Exercice_tableau_multiplications_relatifs() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 3;
  this.titre = titre;
  this.consigne = '';
  this.correctionDetailleeDisponible = true;
  this.correctionDetaillee = false;
  this.spacing = 2;
  this.nbQuestions = 3;
  this.nbQuestionsModifiable = true;

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup);
	this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles;
	switch (this.sup) {
        case 1: // multiplications
          type_de_questions_disponibles = [1];
          break;
        case 2: // Quotient
          type_de_questions_disponibles = [2];
          break;
        case 3: // multiplications et quotients
          type_de_questions_disponibles = [1, 2];
          break;
        case 4: // avec puissances
          type_de_questions_disponibles = [3, 4];
          break;
		case 5: // mélange
          type_de_questions_disponibles = [1, 2, 3, 4];
          break;
     }
	let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);
	for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
		// on ne choisit que des nombres compris entre 1 et 20
		let nbMax = 20;
		// Le tableau des relatifs necessaires, il m'en faut max 5 !
		let num = new Relatif(
		randint(-1, 1, [0]) * randint(1, nbMax),
		randint(-1, 1, [0]) * randint(1, nbMax),
		randint(-1, 1, [0]) * randint(1, nbMax),
		randint(-1, 1, [0]) * randint(1, nbMax),
		randint(-1, 1, [0]) * randint(1, nbMax)
		);
		let lettre_tab = ['n','x','y','a','m'];
		let lettre = lettre_tab[randint(0, lettre_tab.length-1)];
		let nom_expression = lettreDepuisChiffre(i + 1);
		let signe_expression = randint(-1, 1, [0]);
		let nb_termes = liste_type_de_questions[i] == 1 ? randint(3, 5) : randint(4, 6);
		let place_lettre = randint(0, nb_termes-1);
		let liste_nombres = num.relatifs.slice(0,nb_termes-1);
		let liste_termes = [];
		for (let indice=0 ; indice < liste_nombres.length; indice++ ) {
			liste_termes.push(ecritureNombreRelatif(liste_nombres[indice]));
		}
		liste_termes.splice(place_lettre,0,lettre);
		let calcul = "";
		let signe_lettre, calcul_nombres;
		texte = `Donne le signe de $ ${lettre} $ pour que ${nom_expression} soit ${signe_expression==-1 ? 'negatif' : 'positif'}. <br>`;
		texteCorr = `${texte_en_couleur_et_gras("Supposons que " + lettre + " soit positif : ")}`; 
		switch (liste_type_de_questions[i]) {
			case 1: // multiplications
				calcul += `${liste_termes[0]} `;
				for (let k=1; k<nb_termes ; k++) {
					calcul += `\\times ${liste_termes[k]}`
				}
				texte += ` ${nom_expression} = $ ${calcul} $ <br>`;
				if (this.correctionDetaillee) {
					//texteCorr += `<br> $ ${ecritureNombreRelatif(liste_nombres[0])} $ est ${num.getSigneString()[0]}`;
					//for (let k=1; k<nb_termes-2 ; k++) {
					//	texteCorr += `  , $ ${ecritureNombreRelatif(liste_nombres[k])} $ est ${num.getSigneString()[k]}`
					//}
					//texteCorr += `  et $ ${ecritureNombreRelatif(liste_nombres[parseInt(nb_termes-2)])} $ est ${num.getSigneString()[parseInt(nb_termes-2)]}`;
					liste_nombres.push(1);
					texteCorr += `<br> ${num.setRegleSigneProduit(...liste_nombres)}`;
					texteCorr += `<br><br> Donc si ${texte_en_couleur_et_gras(lettre +" est positif","black")} $ ${calcul} $ est ${texte_en_couleur_et_gras(num.getSigneProduitString(...liste_nombres),"black")}.`;
					texteCorr += `<br><br> ${texte_en_couleur_et_gras("Supposons maintenant que " + lettre + " soit négatif : ")}`;
					//texteCorr += ` $ ${ecritureNombreRelatif(liste_nombres[0])} $ est ${num.getSigneString()[0]}`;
					//for (let k=1; k<nb_termes-1 ; k++) {
					//	texteCorr += `  , $ ${ecritureNombreRelatif(liste_nombres[k])} $ est ${num.getSigneString()[k]} `
					//}
					//texteCorr += ` et ${lettre} est négatif.`;
					liste_nombres.push(-1);
					texteCorr += `<br><br> ${num.setRegleSigneProduit(...liste_nombres)}`;
					texteCorr += `<br><br> Donc si ${texte_en_couleur_et_gras(lettre +" est négatif","black")} $ ${calcul} $ est ${texte_en_couleur_et_gras(num.getSigneProduitString(...liste_nombres),"black")}.`;
					texteCorr += `<br><br> ${texte_en_couleur_et_gras("Conclusion :")} <br>` + texte_en_couleur_et_gras(`Il faut donc que $ ${lettre} $ soit ${signe_expression == num.getSigneProduitNumber(...liste_nombres) ? 'négatif' : 'positif'} pour que ${nom_expression} soit ${signe_expression==-1 ? 'négatif' : 'positif'}`,"black");				
				} else {
					texteCorr = `<br> Il faut que $ ${lettre} $ soit ${signe_expression == num.getSigneProduitNumber(...liste_nombres) ? 'positif' : 'négatif'} pour que ${nom_expression} soit ${signe_expression==-1 ? 'négatif' : 'positif'}.`;
				}
				break;				
			case 2: // quotient de 2 produits
				calcul += '\\dfrac {' + liste_termes[0];
				let nb_num = randint(2, nb_termes-2);
				for (let k=1; k<nb_num+1 ; k++) {
					calcul += `\\times ${liste_termes[k]}`
				}
				calcul += '}{' + liste_termes[nb_num+1];
				for (let denom=nb_num+2; denom<nb_termes ; denom++) {
					calcul += `\\times ${liste_termes[denom]}`
				}
				calcul += '}';
				texte += ` ${nom_expression} = $ ${calcul} $ <br>`;
				if (this.correctionDetaillee) {
					//texteCorr += `$ ${ecritureNombreRelatif(liste_nombres[0])} $ est ${num.getSigneString()[0]}`;
					//for (let k=1; k<nb_termes-1 ; k++) {
					//	texteCorr += `  et $ ${ecritureNombreRelatif(liste_nombres[k])} $ est ${num.getSigneString()[k]}`
					//}
					texteCorr += `<br> ${num.setRegleSigneQuotient(...liste_nombres)}`;
					texteCorr += `<br><br> Donc si ${texte_en_couleur_et_gras(lettre+" est positif","black")} $ ${calcul} $ est ${texte_en_couleur_et_gras(num.getSigneProduitString(...liste_nombres),"black")}.`;
					texteCorr += `<br><br> ${texte_en_couleur_et_gras("Supposons maintenant que " + lettre + " soit négatif : ")}`
					//$ ${ecritureNombreRelatif(liste_nombres[0])} $ est ${num.getSigneString()[0]}`;
					//for (let k=1; k<nb_termes-1 ; k++) {
					//	texteCorr += `  et $ ${ecritureNombreRelatif(liste_nombres[k])} $ est ${num.getSigneString()[k]}`
					//}
					liste_nombres.push(-1);
					texteCorr += `<br> ${num.setRegleSigneQuotient(...liste_nombres)}`;
					texteCorr += `<br><br> Donc si ${texte_en_couleur_et_gras(lettre+" est négatif","black")} $ ${calcul} $ est ${texte_en_couleur_et_gras(num.getSigneProduitString(...liste_nombres),"black")}.`;
					texteCorr += `<br><br> ${texte_en_couleur_et_gras("Conclusion :")} <br>` + texte_en_couleur_et_gras(`Il faut donc que $ ${lettre} $ soit ${signe_expression == num.getSigneProduitNumber(...liste_nombres) ? 'négatif' : 'positif'} pour que ${nom_expression} soit ${signe_expression==-1 ? 'négatif' : 'positif'}`,"black");				
				} else {
					texteCorr = `<br> Il faut que $ ${lettre} $ soit ${signe_expression == num.getSigneProduitNumber(...liste_nombres) ? 'positif' : 'négatif'} pour que ${nom_expression} soit ${signe_expression==-1 ? 'négatif' : 'positif'}.`;
				}
				break;
			case 3: // produit avec plusieurs fois la lettre
				signe_lettre = randint(-1, 1, [0]);
				texte = `Donne le signe de ${nom_expression} si $ ${lettre} $ est ${signe_lettre==-1 ? 'négatif' : 'positif'}. <br>`;
				texteCorr = '';
				let nb_lettres = randint(1,3);
				place_lettre = randint(0, nb_termes-1);
				for (let k=0; k<nb_lettres;k++) {
				  liste_termes.splice(place_lettre,0,lettre);
				}
				calcul += `${liste_termes[0]} `;
				for (let k=1; k<nb_termes+nb_lettres ; k++) {
					calcul += `\\times ${liste_termes[k]}`
				}
				calcul_nombres = `${liste_nombres[0]} `;
				for (let k=1; k<nb_termes-1 ; k++) {
					calcul_nombres += `\\times ${liste_nombres[k]}`
				}
				texte += ` ${nom_expression} = $ ${calcul} $ <br>`;
				if (this.correctionDetaillee) {
					if (nb_lettres==1 || nb_lettres==3) {
						texteCorr += `On trouve ${nb_lettres+1} fois le facteur $ ${lettre} $.<br> Or ${nb_lettres+1} est pair donc leur produit sera positif.`;
						texteCorr += `<br>Le signe de l'expression a donc le signe de : $ ${calcul_nombres} $`;
						texteCorr += `<br><br> ${num.setRegleSigneProduit(...liste_nombres)}`;
						texteCorr += '<br><br>' + texte_en_couleur_et_gras(`Donc ${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} quelque soit le signe de $ ${lettre} $.`,"black");
					} else {
						texteCorr += `On trouve ${nb_lettres+1} fois le facteur $ ${lettre} $. <br> Or ${nb_lettres+1} est impair donc leur produit est du signe de $ ${lettre} $ soit ${signe_lettre==-1 ? 'négatif' : 'positif'}.`;
						if (signe_lettre==-1) {
							texteCorr += `<br>Le signe de l'expression a donc le signe opposé à : $ ${calcul_nombres} $`;
							texteCorr += `<br><br> ${num.setRegleSigneProduit(...liste_nombres)}`;
							liste_nombres.push(-1);
							texteCorr += '<br><br>' + texte_en_couleur_et_gras(`Donc ${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} quand $ ${lettre} $ est ${signe_lettre==-1 ? 'négatif' : 'positif'}.`,"black");
						} else {
							texteCorr += `<br>Le signe de l'expression a donc le signe opposé à : $ ${calcul_nombres} $`;
							texteCorr += `<br><br> ${num.setRegleSigneProduit(...liste_nombres)}`;
							texteCorr += '<br><br>' + texte_en_couleur_et_gras(`Donc ${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} quand $ ${lettre} $ est ${signe_lettre==-1 ? 'négatif' : 'positif'}.`,"black");
						}					
					}		
				} else {
					if (nb_lettres==1 || nb_lettres==3) {
						texteCorr = `${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} quelque soit le signe de $ ${lettre} $.<br>`;
					} else {
						if (signe_lettre==-1) {
							liste_nombres.push(-1);
							texteCorr = `${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} si $ ${lettre} $ est négatif.<br>`;
						} else {
							texteCorr = `${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} si $ ${lettre} $ est positif.<br>`;
						}
					}
				}
				break;
			case 4: // produit avec plusieurs fois la lettre
				signe_lettre = randint(-1, 1, [0]);
				texte = `Donne le signe de ${nom_expression} si $ ${lettre} $ est ${signe_lettre==-1 ? 'négatif' : 'positif'}. <br>`;
				texteCorr = '';
				let exp_lettre = randint(2,7);
				if (place_lettre==0) {
						calcul += liste_termes[0]+ "^{" + exp_lettre +"}";
					} else {
						calcul += liste_termes[0];
					}
				for (let k=1; k<nb_termes ; k++) {
					if (k==place_lettre) {
						calcul += '\\times ' + liste_termes[k]+ "^{" + exp_lettre +"}";
					} else {
						calcul += '\\times ' + liste_termes[k];
					}
				}
				calcul_nombres = `${liste_nombres[0]} `;
				for (let k=1; k<nb_termes-1 ; k++) {
					calcul_nombres += `\\times ${liste_nombres[k]}`
				}
				texte += ` ${nom_expression} = $ ${calcul} $ <br>`;
				if (this.correctionDetaillee) {
					if (exp_lettre % 2 == 0) {
						texteCorr += `On trouve ${exp_lettre} fois le facteur $ ${lettre} $.<br> Or ${exp_lettre} est pair donc leur produit sera positif.`;
						texteCorr += `<br>Le signe de l'expression a donc le signe de : $ ${calcul_nombres} $`;
						texteCorr += `<br><br> ${num.setRegleSigneProduit(...liste_nombres)}`;
						texteCorr += '<br><br>' + texte_en_couleur_et_gras(`Donc ${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} quelque soit le signe de $ ${lettre} $.`,"black");
					} else {
						texteCorr += `On trouve ${exp_lettre} fois le facteur $ ${lettre} $. <br> Or ${exp_lettre} est impair donc leur produit est du signe de $ ${lettre} $ soit ${signe_lettre==-1 ? 'négatif' : 'positif'}.`;
						if (signe_lettre==-1) {
							texteCorr += `<br>Le signe de l'expression a donc le signe opposé à : $ ${calcul_nombres} $`;
							texteCorr += `<br><br> ${num.setRegleSigneProduit(...liste_nombres)}`;
							liste_nombres.push(-1);
							texteCorr += '<br><br>' + texte_en_couleur_et_gras(`Donc ${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} quand $ ${lettre} $ est ${signe_lettre==-1 ? 'négatif' : 'positif'}.`,"black");
						} else {
							texteCorr += `<br>Le signe de l'expression a donc le signe opposé à : $ ${calcul_nombres} $`;
							texteCorr += `<br><br> ${num.setRegleSigneProduit(...liste_nombres)}`;
							texteCorr += '<br><br>' + texte_en_couleur_et_gras(`Donc ${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} quand $ ${lettre} $ est ${signe_lettre==-1 ? 'négatif' : 'positif'}.`,"black");
						}					
					}		
				} else {
					if (exp_lettre % 2 == 0) {
						texteCorr = `${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} quelque soit le signe de $ ${lettre} $.<br>`;
					} else {
						if (signe_lettre==-1) {
							liste_nombres.push(-1);
							texteCorr = `${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} si $ ${lettre} $ est négatif.<br>`;
						} else {
							texteCorr = `${nom_expression} est ${num.getSigneProduitString(...liste_nombres)} si $ ${lettre} $ est positif.<br>`;
						}
					}
				}
				break;	
		}
		if (this.listeQuestions.indexOf(texte) == -1) {
		// Si la question n'a jamais été posée, on en créé une autre
		this.listeQuestions.push(texte);
		this.listeCorrections.push(texteCorr);
		i++;
		}
		cpt++;
    }
	listeQuestionsToContenu(this);
  }
  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    3,
    '1 : Multiplications\n2 : Quotients \n3 : Multiplications et quotients \n4 : Multiplications avec plusieurs fois la lettre (dont puissances) \n5 : Mélange ',
  ];
}


