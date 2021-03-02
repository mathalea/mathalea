import Exercice from '../ClasseExercice.js';
import { mathalea2d, point, polygone,rotation, codageAngleDroit, nommePolygone, segment, texteSurSegment, droite, projectionOrtho, pointSurSegment, texteParPoint, afficheMesureAngle  } from "/modules/2d.js";
import {export_QCM_AMC, calcul,tex_fraction,quatrieme_proportionnelle,tex_nombre,arrondi,texte_en_couleur_et_gras,liste_de_question_to_contenu, randint, creerNomDePolygone, choice } from "/modules/outils.js";


/**
 * @auteur Jean-Claude Lhote à partir de 3G30-1 de Rémi Angot
 * 3G30 Exercice remplaçant l'exercice initial utilisant MG32
 * Calculer une longueur en utilisant l'un des trois rapport trigonométrique.
 * * Si this.level=4 alors seul le cosinus sera utilisé.
 * Mars 2021
 */
export default function Calcul_de_longueur() {
    Exercice.call(this)
    this.titre = "Calculer une longueurs dans un triangle rectangle en utilisant la trigonométrie";
    this.nb_questions = 1; 
    this.nb_questions_modifiable = false;
    this.nb_cols = 1; 
    this.nb_cols_corr = 2;
    this.sup = 1
    /*********************************************************/
// On ajoute cette ligne pour AMC
this.QCM=['3G30',[],'Calculs de longueurs avec la trigonométrie']
/**********************************************************/
    if (sortie_html){
        this.spacing = 4;
        this.spacing_corr = 4;
    } else {
        this.spacing = 2;
        this.spacing_corr = 2;
    }

    this.nouvelle_version = function () {
    this.liste_questions = [] 
    this.liste_corrections = []
        let type_de_question
    if (this.sup==3) {
        type_de_question=randint(1,2)
    }
    else {
        type_de_question=parseInt(this.sup)
    }
    let nom = creerNomDePolygone(3)
    let texte = '', texte_corr = '', objets_enonce = [], objets_correction = [], choix_rapport_trigo;
    let ab,bc,ac,angleABC,angleABCr
    if( this.level==4) {
        choix_rapport_trigo = choice(['cosinus'])
    }
    else {
        choix_rapport_trigo = choice(['cosinus','sinus','tangente'])
    }
    angleABC=randint(20,70)
    angleABCr=angleABC*Math.PI/180
    if (!sortie_html){
        texte += '\\begin{minipage}{.6\\linewidth}\n'
        texte_corr+='\\begin{minipage}{.6\\linewidth}\n'
    }
    switch (type_de_question){
        case 1:
            switch (choix_rapport_trigo){
                case 'cosinus' : // AB=BCxcos(B)
                bc=randint(10,15)
                ab=calcul(bc*Math.cos(angleABCr))
                ac=calcul(bc*Math.sin(angleABCr))
                texte+=`Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[1]+nom[2]}=${bc}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte+=`Calculer $${nom[0]+nom[1]}$ à $0,1$ cm près.`
                texte_corr=`Dans le triangle $${nom}$ rectangle en $${nom[0]}$, le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
                texte_corr+=`$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0]+nom[1]}}{${nom[1]+nom[2]}}$.<br>`
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\cos\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(nom[0]+nom[1],bc)}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ','red')}<br>`;
                texte_corr += `$${nom[0]+nom[1]}=${quatrieme_proportionnelle(
                  `\\cos\\left(${angleABC}\\degree\\right)`,
                  bc,
                  "\\color{red}{1}"
                )}$<br>`; 
                texte_corr += `Soit $${nom[0]+nom[1]}\\approx${tex_nombre(arrondi(ab,1))}$ cm.`;

                break
                case 'sinus' :
                    bc=randint(10,15)
                    ab=calcul(bc*Math.cos(angleABCr))
                    ac=calcul(bc*Math.sin(angleABCr))
                    texte+=`Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[1]+nom[2]}=${bc}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                    texte+=`Calculer $${nom[0]+nom[2]}$ à $0,1$ cm près.`
                    texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                    texte_corr += `$\\sin \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0]+nom[2],nom[1]+nom[2])}$<br>`;
                    texte_corr += `Avec les données numériques :<br>`;
                    texte_corr += `$\\dfrac{\\sin\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(nom[0]+nom[2],bc)}$<br>`;
                    texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ','red')}<br>`;
                    texte_corr += `$${nom[0]+nom[2]}=${quatrieme_proportionnelle("\\color{red}{1}",bc,`\\sin\\left(${angleABC}\\degree\\right)`)}$<br>`;
                    texte_corr += `Soit $${nom[0]+nom[2]}\\approx${tex_nombre(arrondi(ac,1))}$ cm.`;
              
                break
                case 'tangente' : 
                ab=randint(5,10)
                ac=calcul(ab*Math.tan(angleABCr))
                bc=calcul(ab/Math.cos(angleABCr))
                texte+=`Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[0]+nom[1]}=${ab}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte+=`Calculer $${nom[0]+nom[2]}$ à $0,1$ cm près.`
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texte_corr += `$\\tan \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0]+nom[2],nom[0]+nom[1])}$<br>`;
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\tan\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(nom[0]+nom[2],ab)}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ','red')}<br>`;
                texte_corr += `$${nom[0]+nom[2]}=${quatrieme_proportionnelle("\\color{red}{1}",ab,`\\tan\\left(${angleABC}\\degree\\right)`)}$<br>`;
                texte_corr += `Soit $${nom[0]+nom[2]}\\approx${tex_nombre(arrondi(ac,1))}$ cm.`;
          
                break
            }
        break

        case 2:
            switch (choix_rapport_trigo){
                case 'cosinus' :
                    ab=randint(5,10)
                    bc=calcul(ab/Math.cos(angleABCr))
                    ac=calcul(bc*Math.sin(angleABCr))
                    texte+=`Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[0]+nom[1]}=${ab}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                    texte+=`Calculer $${nom[1]+nom[2]}$ à $0,1$ cm près.`
                    texte_corr=`Dans le triangle $${nom}$ rectangle en $${nom[0]}$, le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
                    texte_corr+=`$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0]+nom[1]}}{${nom[1]+nom[2]}}$.<br>`
                    texte_corr += `Avec les données numériques :<br>`;
                    texte_corr += `$\\dfrac{\\cos\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(ab,nom[1]+nom[2])}$<br>`;
                    texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ','red')}<br>`;
                    texte_corr += `$${nom[1]+nom[2]}=${quatrieme_proportionnelle(`\\cos\\left(${angleABC}\\degree\\right)`,ab,"\\color{red}{1}")}$<br>`;
                    texte_corr += `Soit $${nom[1]+nom[2]}\\approx${tex_nombre(arrondi(bc,1))}$ cm.`;
    
                break
                case 'sinus' :
                    ac=randint(5,10)
                    bc=calcul(ac/Math.sin(angleABCr))
                    ab=calcul(bc*Math.cos(angleABCr))
                    texte+=`Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[0]+nom[2]}=${ac}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                    texte+=`Calculer $${nom[1]+nom[2]}$ à $0,1$ cm près.`
                    texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                    texte_corr += `$\\sin \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0]+nom[2],nom[1]+nom[2])}$<br>`;
                    texte_corr += `Avec les données numériques :<br>`;
                    texte_corr += `$\\dfrac{\\sin\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(ac,nom[1]+nom[2])}$<br>`;
                    texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ','red')}<br>`;
                    texte_corr += `$${nom[1]+nom[2]}=${quatrieme_proportionnelle(`\\sin\\left(${angleABC}\\degree\\right)`,ac,"\\color{red}{1}")}$<br>`;
                    texte_corr += `Soit $${nom[1]+nom[2]}\\approx${tex_nombre(arrondi(bc,1))}$ cm.`;
    
                break
                case 'tangente' : 
                ac=randint(5,10)
                bc=calcul(ac/Math.sin(angleABCr))
                ab=calcul(bc*Math.cos(angleABCr))
                texte+=`Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[0]+nom[2]}=${ac}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte+=`Calculer $${nom[0]+nom[1]}$ à $0,1$ cm près.`
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texte_corr += `$\\tan \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0]+nom[2],nom[0]+nom[1])}$<br>`;
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\tan\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(ac,nom[0]+nom[1])}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ','red')}<br>`;
                texte_corr += `$${nom[0]+nom[1]}=${quatrieme_proportionnelle("\\color{red}{1}",ac,`\\tan\\left(${angleABC}\\degree\\right)`)}$<br>`;
                texte_corr += `Soit $${nom[0]+nom[1]}\\approx${tex_nombre(arrondi(ab,1))}$ cm.`;
    
                break
            }

        break
    }
    if (!sortie_html){
        texte += '\n\\end{minipage}\n'
        texte_corr += '\n\\end{minipage}\n'
    }
    let a = point (0,0)
    let b = point(ab,0)
    let c = point(0,ac)
    let p1 = polygone(a,b,c) 
    //p1.isVisible = false
    let p2 = rotation(p1,a,randint(0,360))
    let A = p2.listePoints[0]
    let B = p2.listePoints[1]
    let C = p2.listePoints[2]
    let codage = codageAngleDroit(B,A,C)
    A.nom = nom[0], B.nom = nom[1], C.nom = nom[2];
    let nomme = nommePolygone(p2, nom)
    let t1 = texteSurSegment('hypoténuse',C,B)
    let t2, t3, codageAngle, codageAngle2;
    if (sortie_html) {
        t2 = texteSurSegment("adjacent à ⍺",B,A)
        t3 = texteSurSegment("opposé à ⍺",A,C)
        codageAngle = afficheMesureAngle(A,B,C,'red',1.5,'⍺')
        codageAngle2 = afficheMesureAngle(A,C,B,'red',1.5,'𝛽')
    } else {
        t2 = texteSurSegment("adjacent à $\\alpha$",B,A)
        t3 = texteSurSegment("opposé à $\\alpha$",A,C)
        codageAngle = afficheMesureAngle(A,B,C,'red',1.5,'$\\alpha$')
        codageAngle2 = afficheMesureAngle(A,C,B,'red',1.5,'$\\beta$')
    }
    let hypo = segment(C,B)
    hypo.epaisseur = 2
    hypo.color = 'blue'
    codageAngle.epaisseur = 3
    codageAngle2.epaisseur = 3
    let d = droite(B,C)
    d.isVisible = false
    let H = projectionOrtho(A,d)
    H.nom = 'H'
    let pointNomH = pointSurSegment(H,A,-.5)
    H.nom = nom[3];
    if (sortie_html) {
    }
    else {
    }
    let hypo3 = segment(A,B)
    hypo3.epaisseur = 2
    hypo3.color = 'blue'

    objets_enonce.push(p2, codage, nomme)
    objets_correction.push(p2, codage, nomme, t1, t2, t3, hypo, codageAngle)

    let params_enonce = { xmin : Math.min(A.x,B.x,C.x)-1, ymin : Math.min(A.y,B.y,C.y)-1, xmax : Math.max(A.x,B.x,C.x)+1, ymax : Math.max(A.y,B.y,C.y)+1, pixelsParCm: 20, scale: .5, mainlevee: false}
    let params_correction = { xmin : Math.min(A.x,B.x,C.x)-1, ymin : Math.min(A.y,B.y,C.y)-1, xmax : Math.max(A.x,B.x,C.x)+1, ymax : Math.max(A.y,B.y,C.y)+1, pixelsParCm: 20, scale: .5, mainlevee: false}
    if (!sortie_html){
        texte += '\\begin{minipage}{.4\\linewidth}\n'
        texte_corr += '\\begin{minipage}{.4\\linewidth}\n'
    }
    texte += mathalea2d(params_enonce, objets_enonce)+'<br>'
    texte_corr += mathalea2d(params_correction, objets_correction)
    if (!sortie_html){
        texte += '\n\\end{minipage}\n'
        texte_corr += '\n\\end{minipage}\n'
    }

    
    /*****************************************************/
    // Pour AMC
    this.QCM[1][0]=[texte,[texte_corr],[4]]
    this.codeAMC=export_QCM_AMC(this.QCM)
    /****************************************************/
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  
    this.besoin_formulaire_numerique = ['Type de questions',3,'1 : Calcul facile\n2 : Calcul moins facile\n3 : Au hasard'];
}  