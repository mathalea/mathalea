import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,calcul,choisit_lettres_differentes,lettre_depuis_chiffre,choice} from "/modules/outils.js"
import {point,labelPoint,similitude,polygoneAvecNom,tracePoint,demiDroite,segment,traceCompas,dansLaCibleCarree,cibleCarree,rotation,longueur,mathalea2d} from "/modules/2d.js"
import { codeSegments, pointAdistance } from './../../modules/2d.js';


/**
 * Construction de symétrique avec dispositif d'auto-correction aléatoire
 * Ref 5G11-3
 * @Auteur Jean-Claude Lhote
 * Publié le 30/11/2020
 */
export default function Constructions_parallelogrammes() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Construire des parallélogrammes avec dispositif d'auto-correction";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
    this.sup = 1;
    this.correction_detaillee=false
    this.correction_detaillee_disponible=true
	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let texte="",texte_corr = "";
        let celluleAlea = function (rang) {
			let lettre = lettre_depuis_chiffre(randint(1, rang));
			let chiffre = Number(randint(1, rang)).toString();
			return lettre + chiffre;
		};
        // On prépare la figure...
		let noms = choisit_lettres_differentes(5, 'QO', true); // on choisit 5 lettres, les 4 premières sont les sommets, la 5e est le centre
        let type_de_question
        if (this.sup<5) type_de_question=parseInt(this.sup)
        else type_de_question=randint(1,4)
        let nom=`$${noms[0]+noms[1]+noms[2]+noms[3]}$`
        let A,B,C,D,O,p,d1,d2,d3,d4,c1,c2,c3,c4,dd1,dd2
        let objets_enonce=[],objets_correction=[],result,cible,cellule
        // Préparation de la figure aléatoire et des objets 2d utiles
        O=point(0,0,noms[4])
        A=pointAdistance(O,calcul(randint(30,50)/10),randint(0,179)*choice([-1,1]),noms[0])
        C=rotation(A,O,180,noms[2])
        B=similitude(A,O,randint(30,60)*choice([-1,1]),randint(3,8,5)*choice([-1,1])/5,noms[1])
        D=rotation(B,O,180,noms[3])
        p=polygoneAvecNom(A,B,C,D)
        d1=segment(O,A)
        d2=segment(O,B)
        d3=segment(O,C)
        d4=segment(O,D)
        c1=segment(A,B)
        c2=segment(B,C)
        c3=segment(C,D)
        c4=segment(D,A)
        dd1=demiDroite(B,A)
        dd2=demiDroite(B,C)
        cellule=celluleAlea(5)
        result = dansLaCibleCarree(C.x, C.y, 5, 0.6, cellule);
        cible = cibleCarree({ x: result[0], y: result[1], rang: 5, num:"" });
        cible.taille = 0.6;
        cible.color = 'grey';
        cible.opacite = 0.7;


        switch (type_de_question) {
            case 1: // deux côtés consécutifs
                this.consigne = `Construire le parallélogramme ${nom}.`;
                texte_corr=`Plusieurs constructions sont possibles :<br>`
                if (this.correction_detaillee){
                texte_corr+=`- En utilisant l'égalité des longueurs : $${noms[0]+noms[1]}=${noms[3]+noms[2]}$ et $${noms[2]+noms[1]}=${noms[3]+noms[0]}$.<br>`
                texte_corr+=`- En traçant la parallèle à $(${noms[0]+noms[1]})$ passant par $${noms[3]}$ et la parallèle à $(${noms[3]+noms[0]})$ passant par $${noms[1]}$.<br>`
                texte_corr+=`- En utilisant la propriété des diagonales qui se coupent en leur milieu.<br>`
                texte_corr+=`Nous avons choisi la première méthode qui nous semble la plus efficace ici.<br>`
                texte_corr+=`Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`
            }
                else {
                    texte_corr+=`En voici une utilisant l'égalité des longueurs : $${noms[0]+noms[1]}=${noms[3]+noms[2]}$ et $${noms[2]+noms[1]}=${noms[3]+noms[0]}$.<br>`
                    texte_corr+=`Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`
                }
                c1.styleExtremites='-|'
                c4.styleExtremites='|-'
                objets_enonce.push(c1,c4,labelPoint(D,A,B),cible)
                objets_correction.push(p[0],p[1],cible,traceCompas(D,C,30),traceCompas(B,C,30),codeSegments("||",'red',A,B,D,C),codeSegments("///",'blue',A,D,B,C))
            break
            case 2: // trois sommets consécutifs
                this.consigne = `Construire le parallélogramme ${nom}.`;
                texte_corr=`Plusieurs constructions sont possibles :<br>`
                if (this.correction_detaillee){
                texte_corr+=`- En utilisant l'égalité des longueurs : $${noms[0]+noms[1]}=${noms[3]+noms[2]}$ et $${noms[2]+noms[1]}=${noms[3]+noms[0]}$.<br>`
                texte_corr+=`- En traçant la parallèle à $(${noms[0]+noms[1]})$ passant par $${noms[3]}$ et la parallèle à $(${noms[3]+noms[0]})$ passant par $${noms[1]}$.<br>`
                texte_corr+=`- En utilisant la propriété des diagonales qui se coupent en leur milieu.<br>`
                texte_corr+=`Nous avons choisi la première méthode qui nous semble la plus efficace ici.<br>`
                texte_corr+=`Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`
                }
                else {
                    texte_corr+=`En voici une utilisant l'égalité des longueurs : $${noms[0]+noms[1]}=${noms[3]+noms[2]}$ et $${noms[2]+noms[1]}=${noms[3]+noms[0]}$.<br>`
                    texte_corr+=`Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`
                }
                c1.styleExtremites='-|'
                c4.styleExtremites='|-'
                objets_enonce.push(tracePoint(A,B,D),labelPoint(D,A,B),cible)
                objets_correction.push(p[0],p[1],cible,traceCompas(D,C,30),traceCompas(B,C,30))
 
            break
            case 3: // deux sommmets consécutifs plus le centre
             this.consigne = `Construire le parallélogramme ${nom} de centre ${noms[4]}.`;
        
            break
            case 4: // Un angle formé par deux demi-droites et le centre
              this.consigne = `Construire le parallélogramme $${nom} de centre ${noms[4]}.`;
        
            break
            
        }
		let xMin, yMin, xMax, yMax
		xMin = Math.min(A.x, B.x,C.x,D.x)-3;
		yMin = Math.min(A.y, B.y,C.y,D.y)-3;
		xMax = Math.max(A.x, B.x,C.x,D.x)+3;
		yMax = Math.max(A.y, B.y,C.y,D.y)+3;

		this.liste_questions.push(texte+mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_enonce));
		this.liste_corrections.push(texte_corr + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_correction));
		liste_de_question_to_contenu(this);

	};
	this.besoin_formulaire_numerique = ['Type de questions', 5, "1 : Deux côtés consécutifs\n2 : Trois sommets consécutifs\n3 : Deux sommets consécutifs et le centre\n4 : Un angle et le centre\n5 : Une des configuration au hasard"];
	// this.besoin_formulaire2_case_a_cocher = ["Avec des points de part et d'autre"];	
}
