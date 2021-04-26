import { mathalea2d, pointAdistance, polygoneAvecNom, point, parallelogramme2points1hauteur, afficheLongueurSegment, projectionOrtho , milieu, droite, segment, codageAngleDroit} from '../../modules/2d.js';
import { creerNomDePolygone } from '../../modules/outils.js';
import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,choice,texte_en_couleur_et_gras} from "/modules/outils.js"


/**
* Deux parallélogrammes sont tracés, on connait les 2 côté et une hauteur.
*
* Il faut calculer leurs aires.
*
* Pas de version LaTeX
* @Auteur Rémi Angot
* 5M10
*/
export default function Aire_du_parallelogramme() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Aire du parallélogramme";
	this.consigne = "Calculer l'aire des 3 parallélogrammes suivants (les longueurs sont données en cm).";
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 1;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
  
	this.nb_questions_modifiable = false;
	let cadre = function (p,params){
		let xmin=0,xmax=0,ymin=0,ymax=0
		for (let i=0;i<4;i++){
			xmin=Math.min(xmin,p[0].listePoints[i].x-1)
			ymin=Math.min(ymin,p[0].listePoints[i].y-1)
			xmax=Math.max(xmax,p[0].listePoints[i].x+1)
			ymax=Math.max(ymax,p[0].listePoints[i].y+1)
		}
		params.xmin=xmin
		params.xmax=xmax
		params.ymin=ymin
		params.ymax=ymax
		return params
	}

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_corrections = []; // Liste de questions corrigées
		this.liste_questions=[]
		let texte='',params
        let nom=creerNomDePolygone(12,'Q')
		let objets_enonce=[]
		let c1 = randint(3, 7);
		let h1 = randint(2, 4);
		let c2 = randint(3, 7);
		let h2 = randint(2, 7);
		let c3 = randint(3, 10);
		let h3 = randint(2, 4);
        let A1,A2,A3,B1,B2,B3,P1,P2,P3,H1,H2,H3,I1,I2,I3,s1,s2,s3,C1,C2,C3
        A1 = point(0,0,nom[0])
        B1 = pointAdistance(A1,c1,randint(-20,20),nom[1])
	      P1=parallelogramme2points1hauteur(nom.slice(0,4),A1,B1,h1)
		  C1=P1[0].listePoints[2]
		  I1=milieu(A1,B1)
		  H1=projectionOrtho(I1,droite(P1[0].listePoints[3],P1[0].listePoints[2]))
		  s1=segment(I1,H1)
		  s1.pointilles=2
		   A2 = point (0,0)
        B2=pointAdistance(A2,c2,randint(-20,20),nom[5])
        P2=parallelogramme2points1hauteur(nom.slice(4,8),A2,B2,h2)
		C2=P2[0].listePoints[2]
		I2=milieu(A2,B2)
		H2=projectionOrtho(I2,droite(P2[0].listePoints[3],P2[0].listePoints[2]))
		s2=segment(I2,H2)
		s2.pointilles=2
		A3 = point (0,0)
        B3 = pointAdistance(A3,c3,randint(-20,20),nom[9])
        P3=parallelogramme2points1hauteur(nom.slice(8,12),A3,B3,h3)
		C3=P3[0].listePoints[2]
		I3=milieu(A3,B3)
		H3=projectionOrtho(I3,droite(P3[0].listePoints[3],P3[0].listePoints[2]))
		s3=segment(I3,H3)
		s3.pointilles=2
	    params={xmin:0,xmax:0,ymin:0,ymax:0,pixelsParCm:20,scale:0.5,mainlevee:false}
		params=cadre(P1,params)
		texte+=	mathalea2d(params,P1[0],P1[1],afficheLongueurSegment(B1,A1),afficheLongueurSegment(C1,B1),afficheLongueurSegment(I1,H1),s1,codageAngleDroit(A1,I1,H1),codageAngleDroit(C1,H1,I1))
		params={xmin:0,xmax:0,ymin:0,ymax:0,pixelsParCm:20,scale:0.5,mainlevee:false}
		params=cadre(P2,params)
		texte+=	mathalea2d(params,P2[0],P2[1],afficheLongueurSegment(B2,A2),afficheLongueurSegment(C2,B2),afficheLongueurSegment(I2,H2),s2,codageAngleDroit(A2,I2,H2),codageAngleDroit(C2,H2,I2))
		params={xmin:0,xmax:0,ymin:0,ymax:0,pixelsParCm:20,scale:0.5,mainlevee:false}
		params=cadre(P3,params)
		texte+='br'+mathalea2d(params,P3[0],P3[1],afficheLongueurSegment(B3,A3),afficheLongueurSegment(C3,B3),afficheLongueurSegment(I3,H3),s3,codageAngleDroit(A3,I3,H3),codageAngleDroit(C3,H3,I3))
		
		
		let texte_corr = `Dans chaque parallélogramme, le segment en pointillés est ${texte_en_couleur_et_gras("perpendiculaire")} à deux côtés opposés, c'est donc une ${texte_en_couleur_et_gras("hauteur")}.<br>`;
		texte_corr += `Pour obtenir l'aire, il faut multiplier cette ${texte_en_couleur_et_gras("hauteur")} par la longueur de la ${texte_en_couleur_et_gras("base")} correspondante.`;
		texte_corr += "<br><br>";
		texte_corr += `$\\mathcal{A}_{${nom.slice(0,4)}}=${c1}~\\text{cm}\\times  ${h1}~\\text{cm}=${c1 * h1}~\\text{cm}^2$`;
		texte_corr += `<br>$\\mathcal{A}_{${nom.slice(4,8)}}=${c2}~\\text{cm}\\times  ${h2}~\\text{cm}=${c2 * h2}~\\text{cm}^2$`;
		texte_corr += `<br>$\\mathcal{A}_{${nom.slice(8,12)}}=${c3}~\\text{cm}\\times  ${h3}~\\text{cm}=${c3 * h3}~\\text{cm}^2$`;

        this.liste_questions.push(texte)
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu_sans_numero(this);
	};

	// 	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Périmètres\n\
	// 2 : Aires\n3 : Périmètres et aires"];
}
