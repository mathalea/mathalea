import Exercice from '../ClasseExercice.js';
import {tex_nombrec,texte_gras,liste_de_question_to_contenu,randint,arrondi,calcul,choisit_lettres_differentes,lettre_depuis_chiffre,tex_nombre} from "/modules/outils.js"
import {cercle, codeSegments, pointAdistance, codageAngleDroit,afficheMesureAngle,afficheLongueurSegment,point,labelPoint,similitude,polygoneAvecNom,tracePoint,segment,traceCompas,dansLaCibleCarree,cibleCarree,rotation,longueur,mathalea2d,milieu,pointIntersectionCC} from "/modules/2d.js"


/**
 * Construction de symétrique avec dispositif d'auto-correction aléatoire
 * Ref 5G11-3
 * @Auteur Jean-Claude Lhote
 * Publié le 30/11/2020
 */
export default function Constructions_parallelogrammes_particuliers() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Construire des quadrilatères particuliers";
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
        let nom=`$${noms[0]+noms[1]+noms[2]+noms[3]}$`
        let A,B,C,D,O,p,d1,d2,c1,c4,dd1,dd2,dd3,dd4,alpha,tri,t1,t2,t3
        let objets_enonce=[],objets_correction=[],result2,result1,cible1,cible2,cible3,cellule1,cellule2,cellule3,result3
       let type_de_question
        if (this.sup<5) type_de_question=parseInt(this.sup)
        else type_de_question=randint(1,4)
        this.consigne = `Construire le quadrilatère $${nom}$  et déterminer sa nature.<br>L'ordre des points est donné en tournant dans le sens inverse des aiguilles d'une montre.`;

        switch (type_de_question){
            case 1:
                A=point(0,0,noms[0])
                c1=randint(40,50) //AB
                c4=calcul(randint(40,60,c1)/10) //AD
                c1=calcul(c1/10)
                d1=10*(Math.abs(c4-c1)+2)
                d2=10*(c1+c4-3)
                d1=calcul(randint(Math.min(d1,d2),Math.max(d1,d2))/10) //BD
                B=pointAdistance(A,c1,randint(-30,30),noms[1])
                D=pointIntersectionCC(cercle(A,c4),cercle(B,d1),noms[3])
                O=milieu(B,D,noms[4])
                C=rotation(A,O,180,noms[2])
                texte=`${nom} est un parallélogramme tel que `
                texte+=`$${noms[0]+noms[1]}=${tex_nombre(c1)}$cm, $${noms[0]+noms[3]}=${tex_nombre(c4)}$cm, $${noms[1]+noms[3]}=${tex_nombre(d1)}$cm.<br>`
                texte+=`Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
                objets_enonce.push(tracePoint(A,B),labelPoint(A,B))

                texte_corr+=`Comme ${nom} est un parallélogramme, ses diagonales se coupent en leur milieu.<br>`
                texte_corr+=`Soit $${noms[4]}$ le milieu de $[${noms[1]+noms[3]}]$. $${noms[2]}$ est le symétrique de $${noms[0]}$ par rapport à $${noms[4]}$.`
                texte_corr+=`Construisons tout d'abord le triangle $${noms[0]+noms[1]+noms[3]}$.<br>Puis $${noms[4]}$, le milieu de $[${noms[1]+noms[3]}]$ et enfin le point $${noms[2]}$.<br>`
                if (longueur(B,D)!=longueur(A,C)) {
                    texte_corr+=`Comme $${noms[0]+noms[3]}\\ne ${noms[0]+noms[1]}$ et que $${noms[0]+noms[2]}\\ne ${noms[3]+noms[1]}$, le paralélogramme ${nom} n'est ni un losange, ni un rectangle.<br>`
                    texte_corr+=`${nom} est un paraléllogramme quelconque.<br>`
                }
                else {
                    texte_corr+=`Comme $$${noms[0]+noms[2]} = ${noms[3]+noms[1]}$ et que $${noms[0]+noms[3]}\\ne ${noms[0]+noms[1]}$, le paralélogramme ${nom} est un rectangle.<br>` 
                }
                objets_correction.push(afficheLongueurSegment(A,B,'black',-0.5),afficheLongueurSegment(A,D,'black',0.5))
                t1=traceCompas(A,D,15)
                t2=traceCompas(B,D,15)
                t3=traceCompas(O,C,20)
                tri=polygoneAvecNom(A,B,D)
            break
            case 2:
                O=point(0,0,noms[4])
                c1=randint(25,35)*2 //AC
                c4=calcul(randint((c1+4)/2,45)/5) //BD
                c1=calcul(c1/10)
                alpha=randint(100,130)

                A=pointAdistance(O,c1/2,randint(-30,30),noms[0])
                B=similitude(A,O,alpha,c4/c1,noms[1])
                D=rotation(B,O,180,noms[3])
                C=rotation(A,O,180,noms[2])
                console.log (O,A,B,C,D)
                texte=`${nom} est un parallélogramme de centre $${noms[4]}$ tel que `
                texte+=`$${noms[0]+noms[2]}=${tex_nombre(c1)}$cm, $${noms[1]+noms[3]}=${tex_nombre(c4)}$cm et $\\widehat{${noms[0]+noms[4]+noms[1]}}=${alpha}\\degree$  dans le sens inverse des aiguilles d'une montre.<br>`
                texte+=`Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
                objets_enonce.push(tracePoint(A,O),labelPoint(A,O))

                texte_corr+=`Comme ${nom} est un parallélogramme, ses diagonales se coupent en leur milieu $${noms[4]}$.<br>`
                texte_corr+=`$${noms[2]}$ est le symétrique de $${noms[0]}$ par rapport à $${noms[4]}$. La distance ${noms[4]+noms[1]} est égale à la moitié de ${noms[1]+noms[3]}.<br>`
                texte_corr+=`Construisons tout d'abord le point $${noms[2]}$ symétrique de $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
                texte_corr+=`Construisons ensuite un angle $\\widehat{${noms[0]+noms[4]+noms[1]}}$ de mesure $${alpha}\\degree$ dans le sens inverse des aiguilles d'une montre.<br>Puis le point $${noms[1]}$ sur $[${noms[4]}x)$ et son symétrique $${noms[3]}$ par rapport à $${noms[4]}$ situés tous les deux à $${tex_nombrec(arrondi(c4/2))}$cm de $${noms[4]}$.<br>`
 
            break
            case 3:
                A=point(0,0,noms[0])
                c1=randint(51,80) //AB
                c4=calcul(randint(30,50)/10) //AD
                c1=calcul(c1/10)
 
                B=pointAdistance(A,c1,randint(-30,30),noms[1])
                D=similitude(B,A,90,c4/c1,noms[3])
                O=milieu(B,D,noms[4])
                C=rotation(A,O,180,noms[2])
                texte=`${nom} est un parallélogramme tel que `
                texte+=`$${noms[0]+noms[1]}=${tex_nombre(c1)}$cm, $${noms[0]+noms[3]}=${tex_nombre(c4)}$cm, $${noms[1]+noms[3]}=${noms[0]+noms[2]}$.<br>`
                texte+=`Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
                objets_enonce.push(tracePoint(A,B),labelPoint(A,B))

                texte_corr+=`Comme ${nom} est un parallélogramme, ses diagonales se coupent en leur milieu et comme de plus elles ont la même longueur, ${texte_gras(nom)} ${texte_gras(' est donc un rectangle')}.<br>`
                texte_corr+=`Soit $${noms[4]}$ le milieu de $[${noms[1]+noms[3]}]$. $${noms[2]}$ est le symétrique de $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
                texte_corr+=`Construisons tout d'abord le triangle $${noms[0]+noms[1]+noms[3]}$ puis $${noms[4]}$, le milieu de $[${noms[1]+noms[3]}]$ et enfin le point $${noms[2]}$.<br>`
                objets_correction.push(afficheLongueurSegment(A,B,'black',-0.5),afficheLongueurSegment(A,D,'black',0.5))
                t1=traceCompas(A,D,15)
                t2=traceCompas(B,D,15)
                t3=traceCompas(O,C,20)
                tri=polygoneAvecNom(A,B,D)
   
            break
            case 4:
                A=point(0,0,noms[0])
                c1=randint(30,60) //AB
                c4=calcul(randint(30,40)/10) //BD
                c1=calcul(c1/10)
 
                B=pointAdistance(A,c1,randint(-30,30),noms[1])
                D=pointIntersectionCC(cercle(A,c1),cercle(B,c4),noms[3])
                O=milieu(B,D,noms[4])
                C=rotation(A,O,180,noms[2])

                texte=`${nom} est un parallélogramme tel que `
                texte+=`$${noms[0]+noms[1]}=${tex_nombre(c1)}$cm, $${noms[1]+noms[3]}=${tex_nombre(c4)}$cm, $[${noms[0]+noms[2]}]\\perp [${noms[1]+noms[3]}]$.<br>`
                texte+=`Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
                objets_enonce.push(tracePoint(A,B),labelPoint(A,B))

                texte_corr+=`Comme ${nom} est un parallélogramme dont les diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ sont perpendiculaires, ${nom}${texte_gras(' est un losange')}.<br>`
                texte_corr+=`Il en résulte que le triangle $${noms[0]+noms[1]+noms[3]}$ est isoclèle en $${noms[0]}$.<br>`
                texte_corr+=`Construisons tout d'abord le triangle $${noms[0]+noms[1]+noms[3]}$ puis $${noms[4]}$, le milieu de $[${noms[1]+noms[3]}]$ et enfin le point $${noms[2]}$.<br>`
                objets_correction.push(afficheLongueurSegment(A,B,'black',-0.5),afficheLongueurSegment(A,D,'black',0.5))
                t1=traceCompas(A,D,15)
                t2=traceCompas(B,D,15)
                t3=traceCompas(O,C,20)
                tri=polygoneAvecNom(A,B,D)
            break
            
        }
        p=polygoneAvecNom(A,B,C,D)
        let xMin, yMin, xMax, yMax
		xMin = Math.min(A.x, B.x,C.x,D.x)-2;
		yMin = Math.min(A.y, B.y,C.y,D.y)-2;
		xMax = Math.max(A.x, B.x,C.x,D.x)+2;
        yMax = Math.max(A.y, B.y,C.y,D.y)+2;

        cellule1=celluleAlea(3)
        cellule2=celluleAlea(3)
        cellule3=celluleAlea(3)
        result1= dansLaCibleCarree(B.x, B.y, 3, 0.6, cellule3);
        result2 = dansLaCibleCarree(C.x, C.y, 3, 0.6, cellule1);
        result3= dansLaCibleCarree(D.x, D.y, 3, 0.6, cellule2);
        cible1 = cibleCarree({ x: result1[0], y: result1[1], rang: 3, num:"" });
        cible1.taille = 0.6;
        cible1.color = 'grey';
        cible1.opacite = 0.7;
        cible2 = cibleCarree({ x: result2[0], y: result2[1], rang: 3, num:"" });
        cible2.taille = 0.6;
        cible2.color = 'grey';
        cible2.opacite = 0.7;
        cible3 = cibleCarree({ x: result3[0], y: result3[1], rang: 3, num:"" });
        cible3.taille = 0.6;
        cible3.color = 'grey';
        cible3.opacite = 0.7;
        dd1=segment(O,A)
        dd2=segment(O,B)
        dd3=segment(O,C)
        dd4=segment(O,D)
        switch (type_de_question){
            case 1:
                texte_corr+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 25, scale: 1 }, objets_correction,t1,t2,tri[0],tri[1],afficheLongueurSegment(D,B))
                objets_enonce.push(cible3,cible2)
                objets_correction.push(p[0],p[1],t3)
                objets_correction.push(cible3,cible2,dd1,dd2,dd3,dd4,labelPoint(O),codeSegments("||","red",A,O,O,C),codeSegments("|||","blue",B,O,O,D))
           break
            case 2:
                texte_corr+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 25, scale: 1 }, codeSegments("||","red",A,O,O,C),t3,dd1,dd3,dd2,afficheMesureAngle(A,O,B,'black',1,alpha+'°'),tracePoint(A,O,C),labelPoint(A,O,C))
                objets_enonce.push(cible3,cible2,cible1)
                objets_correction.push(p[0],p[1],t3)
                objets_correction.push(cible3,cible2,cible1,dd1,dd2,dd3,dd4,labelPoint(O),codeSegments("||","red",A,O,O,C),codeSegments("|||","blue",B,O,O,D),afficheMesureAngle(A,O,B,'black',1,alpha+'°'))
    
            break
            case 3:
                texte_corr+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 25, scale: 1 }, objets_correction,tri[0],tri[1],afficheLongueurSegment(D,B),t1,t2)
                objets_enonce.push(cible3,cible2)
                objets_correction.push(p[0],p[1],t3)
                objets_correction.push(cible3,cible2,dd1,dd2,dd3,dd4,labelPoint(O),codeSegments("||","red",A,O,O,C),codeSegments("||","red",B,O,O,D))

            break
            case 4:
                texte_corr+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 25, scale: 1 }, objets_correction,tri[0],tri[1],afficheLongueurSegment(D,B),t2,traceCompas(A,B,60),traceCompas(A,D,60))
                objets_enonce.push(cible3,cible2)
                objets_correction.push(p[0],p[1],t3)
                objets_correction.push(codageAngleDroit(A,O,D),cible3,cible2,dd1,dd2,dd3,dd4,labelPoint(O),codeSegments("||","red",A,O,O,C),codeSegments("|||","blue",B,O,O,D))
            break
            
        }
        texte+=mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 25, scale: 1 }, objets_enonce)
        texte_corr+= mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 25, scale: 1 }, objets_correction)

 
         // Préparation de la figure aléatoire et des objets 2d utiles

/*
        switch (type_de_question) {
            case 1: // deux côtés consécutifs
                this.consigne = `Construire le parallélogramme $${nom}$.`;
                texte_corr=`Plusieurs constructions sont possibles :<br>`
                if (this.correction_detaillee){
                texte_corr+=`- En utilisant l'égalité des longueurs : $${noms[0]+noms[1]}=${noms[3]+noms[2]}$ et $${noms[2]+noms[1]}=${noms[3]+noms[0]}$.<br>`
                texte_corr+=`- En traçant la parallèle à $(${noms[0]+noms[1]})$ passant par $${noms[3]}$ et la parallèle à $(${noms[3]+noms[0]})$ passant par $${noms[1]}$.<br>`
                texte_corr+=`- En utilisant la propriété des diagonales qui se coupent en leur milieu.<br>`
                texte_corr+=`Nous avons choisi la première méthode qui nous semble la plus efficace ici.<br>`
            }
                else {
                    texte_corr+=`En voici une utilisant l'égalité des longueurs : $${noms[0]+noms[1]}=${noms[3]+noms[2]}$ et $${noms[2]+noms[1]}=${noms[3]+noms[0]}$.<br>`
                }
                texte_corr+=`Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`

                c1.styleExtremites='-|'
                c4.styleExtremites='|-'
                objets_enonce.push(c1,c4,labelPoint(D,A,B),cible)
                objets_correction.push(p[0],p[1],cible,traceCompas(D,C,30),traceCompas(B,C,30),codeSegments("||",'red',A,B,D,C),codeSegments("///",'blue',A,D,B,C))
            break
            case 2: // trois sommets consécutifs
                this.consigne = `Construire le parallélogramme $${nom}$.`;
                texte_corr=`Plusieurs constructions sont possibles :<br>`
                if (this.correction_detaillee){
                texte_corr+=`- En utilisant l'égalité des longueurs : $${noms[0]+noms[1]}=${noms[3]+noms[2]}$ et $${noms[2]+noms[1]}=${noms[3]+noms[0]}$.<br>`
                texte_corr+=`- En traçant la parallèle à $(${noms[0]+noms[1]})$ passant par $${noms[3]}$ et la parallèle à $(${noms[3]+noms[0]})$ passant par $${noms[1]}$.<br>`
                texte_corr+=`- En utilisant la propriété des diagonales qui se coupent en leur milieu.<br>`
                texte_corr+=`Nous avons choisi la première méthode qui nous semble la plus efficace ici.<br>`
                }
                else {
                    texte_corr+=`En voici une utilisant l'égalité des longueurs : $${noms[0]+noms[1]}=${noms[3]+noms[2]}$ et $${noms[2]+noms[1]}=${noms[3]+noms[0]}$.<br>`
                }
                texte_corr+=`Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`
                objets_enonce.push(tracePoint(A,B,D),labelPoint(D,A,B),cible)
                objets_correction.push(p[0],p[1],cible,traceCompas(D,C,30),traceCompas(B,C,30),codeSegments("||",'red',A,B,D,C),codeSegments("///",'blue',A,D,B,C))
 
            break
            case 3: // deux sommmets consécutifs plus le centre
             this.consigne = `Construire le parallélogramme $${nom}$ de centre $${noms[4]}$.`;
             texte_corr+=`O est le centre de symétrie du parallélogramme $${nom}$.<br>`
             if (this.correction_detaillee){
                texte_corr+=`Le point $${noms[3]}$ est le symétrique du point $${noms[1]}$ par rapport à $${noms[4]}$.<br>`
                texte_corr+=`Le point $${noms[2]}$ est le symétrique du point $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
                }
                texte_corr+=`Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible 1.<br>`
                texte_corr+=`Le point $${noms[3]}$ se trouve dans la case ${cellule2} de la cible 2.<br>`
                objets_enonce.push(tracePoint(A,B,O),labelPoint(O,A,B),cible,cible2)
                objets_correction.push(p[0],p[1],labelPoint(O),cible,cible2,d1,d2,d3,d4,codeSegments("||","red",A,O,O,C),codeSegments("|||","blue",B,O,O,D))
        
            break
            case 4: // Un angle formé par deux demi-droites et le centre
              this.consigne = `Construire le parallélogramme $${nom}$ de centre ${noms[4]}.`;
              texte+=`Le point $${noms[3]}$ est sur la demi-droite $[${noms[0]}x)$ et le point $${noms[1]}$ est sur la demi-droite $[${noms[0]}y)$.<br>`
              if (this.correction_detaillee){
                texte_corr+=`Le point $${noms[2]}$ est le symétrique du point $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
                texte_corr+=`La symétrique de la droite $(${noms[0]+noms[1]})$ par rapport à $${noms[4]}$ est la droite passant par $${noms[2]}$ parallèle à $(${noms[0]+noms[1]})$.<br>`
                texte_corr+=`La symétrique de la droite $(${noms[0]+noms[3]})$ par rapport à $${noms[4]}$ est la droite passant par $${noms[2]}$ parallèle à $(${noms[0]+noms[3]})$.<br>`
                }
                texte_corr+=`Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible 1.<br>`
                texte_corr+=`Le point $${noms[3]}$ se trouve dans la case ${cellule2} de la cible 2.<br>`
                objets_enonce.push(dd1,dd2,tracePoint(O),labelPoint(O,A),texteParPoint('x',similitude(D,A,4,1.3)),texteParPoint('y',similitude(B,A,4,1.3)),cible,cible2,cible3)
                objets_correction.push(dd1,dd2,dd3,dd4,p[0],p[1],tracePoint(O),labelPoint(O),cible,cible2,cible3,d1,d3,codeSegments("||","red",A,O,O,C))
            
        
            break
            
        }
*/

		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu(this);

	};
	this.besoin_formulaire_numerique = ['Type de questions', 5, "1 : parallélogramme 2 côtés 1 diagonale\n2 : Parallélogramme 2 diagonales et angle au centre\n3 : Deux sommets consécutifs et le centre\n4 : Un angle et le centre\n5 : Une des configuration au hasard"];
	// this.besoin_formulaire2_case_a_cocher = ["Avec des points de part et d'autre"];	
}
