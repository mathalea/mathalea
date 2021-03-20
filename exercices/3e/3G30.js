import Exercice from '../ClasseExercice.js';
import {homothetie,codeAngle,repere2,longueur,tracePoint,barycentre,milieu,latexParPoint, mathalea2d, point, polygone, rotation, codageAngleDroit, nommePolygone, segment, texteSurSegment, droite, projectionOrtho, pointSurSegment, texteParPoint, afficheMesureAngle } from "/modules/2d.js";
import { export_QCM_AMC, calcul, tex_fraction, quatrieme_proportionnelle, tex_nombre, arrondi, texte_en_couleur_et_gras, liste_de_question_to_contenu, randint, creerNomDePolygone, choice } from "/modules/outils.js";


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
    this.nb_cols_corr = 1;
    this.sup = false
    this.correction_detaillee_disponible=true
    this.correction_detaillee=false

    if (sortie_html) {
        this.spacing = 0;
        this.spacing_corr = 0;
    } else {
        this.spacing = 2;
        this.spacing_corr = 2;
    }

    this.nouvelle_version = function () {
        this.liste_questions = []
        this.liste_corrections = []
        let reponse
    /*********************************************************/
    // On ajoute cette ligne pour AMC
    if (this.level!=4){
        this.QCM = ['3G30', [], 'Calculs de longueurs avec la trigonométrie',5]
    }
    else {
        this.QCM = ['4G40', [], 'Calculs de longueurs avec la trigonométrie',5]
    }
    /**********************************************************/

        let nom = creerNomDePolygone(3)
        let texte = '', texte_corr = '', objets_enonce = [], objets_correction = [], choix_rapport_trigo;
        let ab, bc, ac, angleABC, angleABCr
        if (this.level == 4) {
            choix_rapport_trigo = choice(['cosinus', 'invCosinus'])
        }
        else {
            choix_rapport_trigo = choice(['cosinus', 'sinus', 'tangente', 'invCosinus', 'invSinus', 'invTangente'])
        }
        angleABC = randint(35, 55)
        angleABCr = angleABC * Math.PI / 180
        if (!sortie_html&&this.sup) {
            texte += '\\begin{minipage}{.7\\linewidth}\n'
        }
        switch (choix_rapport_trigo) {
            case 'cosinus': // AB=BCxcos(B)
                bc = randint(10, 15)
                ab = calcul(bc * Math.cos(angleABCr))
                ac = calcul(bc * Math.sin(angleABCr))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[1] + nom[2]}=${bc}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte += `Calculer $${nom[0] + nom[1]}$ à $0,1$ cm près.<br>`
                break
            case 'sinus':
                bc = randint(10, 15)
                ab = calcul(bc * Math.cos(angleABCr))
                ac = calcul(bc * Math.sin(angleABCr))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[1] + nom[2]}=${bc}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte += `Calculer $${nom[0] + nom[2]}$ à $0,1$ cm près.<br>`
                break
            case 'tangente':
                ab = randint(7,10)
                ac = calcul(ab * Math.tan(angleABCr))
                bc = calcul(ab / Math.cos(angleABCr))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[0] + nom[1]}=${ab}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte += `Calculer $${nom[0] + nom[2]}$ à $0,1$ cm près.<br>`
                break
            case 'invCosinus':
                ab = randint(7,10)
                bc = calcul(ab / Math.cos(angleABCr))
                ac = calcul(bc * Math.sin(angleABCr))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[0] + nom[1]}=${ab}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte += `Calculer $${nom[1] + nom[2]}$ à $0,1$ cm près.<br>`
                break
            case 'invSinus':
                ac = randint(7,10)
                bc = calcul(ac / Math.sin(angleABCr))
                ab = calcul(bc * Math.cos(angleABCr))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[0] + nom[2]}=${ac}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte += `Calculer $${nom[1] + nom[2]}$ à $0,1$ cm près.<br>`
                break
            case 'invTangente':
                ac = randint(7,10)
                bc = calcul(ac / Math.sin(angleABCr))
                ab = calcul(bc * Math.cos(angleABCr))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> $${nom[0] + nom[2]}=${ac}$ cm et $\\widehat{${nom}}=${angleABC}\\degree$.<br>`
                texte += `Calculer $${nom[0] + nom[1]}$ à $0,1$ cm près.<br>`
                break
        }

        if (!sortie_html&&this.sup) {
            texte += '\n\\end{minipage}\n'
        }
        let a = point(0, 0)
        let b = point(ab, 0)
        let c = point(0, ac)
        let p1 = polygone(a, b, c)
        //p1.isVisible = false
        let p2 = rotation(p1, a, randint(0, 360))
        let A = p2.listePoints[0]
        let B = p2.listePoints[1]
        let C = p2.listePoints[2]
        let codage = codageAngleDroit(B, A, C)
        A.nom = nom[0], B.nom = nom[1], C.nom = nom[2];
        let nomme = nommePolygone(p2, nom),codeangle
       let hypo = segment(C, B)
        hypo.epaisseur = 2
        hypo.color = 'blue'
     //   codageAngle.epaisseur = 3
      //  codageAngle2.epaisseur = 3
      codeangle=codeAngle(A,B,C,2)
      let M1=milieu(A,B)
      let M2=milieu(A,C)
      let M3=milieu(B,C)
      let G=barycentre(p2)
      let m3=homothetie(M3,G,1+1.5/longueur(G,M3),'m3','center')
      let m1=homothetie(M1,M3,1+1.5/longueur(M3,M1),'m1','center')
      let m2=homothetie(M2,M3,1+1.5/longueur(M3,M2),'m2','center')
      let m4
      let t1,t2,t3
      switch (choix_rapport_trigo) {
        case 'cosinus': // AB=BCxcos(B)
            t3=latexParPoint(`${bc} \\text{ cm}`,m3,'black',120,12,'')
            t2=latexParPoint(`?`,m1,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G),'B2','center')
            t1=latexParPoint(`${angleABC}\\degree`,m4,'black',20,12,'')
            break
        case 'sinus':
            t3=latexParPoint(`${bc} \\text{ cm}`,m3,'black',120,12,'')
            t2=latexParPoint(`?`,m2,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G),'B2','center')
            t1=latexParPoint(`${angleABC}\\degree`,m4,'black',100,12,'')
            break
        case 'tangente':
            t1=latexParPoint(`${ab} \\text{ cm}`,m1,'black',120,12,'')
            t2=latexParPoint(`?`,m2,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G),'B2','center')
            t3=latexParPoint(`${angleABC}\\degree`,m4,'black',100,12,'')
            break
        case 'invCosinus':
            t1=latexParPoint(`${ab} \\text{ cm}`,m1,'black',120,12,'')
            t3=latexParPoint(`?`,m3,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G),'B2','center')
            t2=latexParPoint(`${angleABC}\\degree`,m4,'black',100,12,'')
            break
        case 'invSinus':
            t2=latexParPoint(`${ac} \\text{ cm}`,m2,'black',120,12,'')
            t3=latexParPoint(`?`,m3,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G),'B2','center')
            t1=latexParPoint(`${angleABC}\\degree`,m4,'black',100,12,'')
            break
        case 'invTangente':
            t2=latexParPoint(`${ac} \\text{ cm}`,m2,'black',120,12,'')
            t1=latexParPoint(`?`,m1,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G),'B2','center')
            t3=latexParPoint(`${angleABC}\\degree`,m4,'black',100,12,'')
            break
    }
        objets_enonce.push(p2, codage, nomme,t1,t2,t3,codeangle)
        objets_correction.push(p2, codage, nomme, t1, t2, t3, hypo,codeangle)

        let params_enonce = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 2, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 20, scale: 0.37, mainlevee: true,amplitude:0.4 }
        let params_correction = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 2, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 20, scale: .35, mainlevee: false }
        if (!sortie_html&&this.sup) {
            texte += '\\begin{minipage}{.3\\linewidth}\n'
        }
        if (this.sup) {
            texte += mathalea2d(params_enonce, objets_enonce) + '<br>'
        }
        if (!sortie_html&&this.correction_detaillee){
            texte_corr += '\\begin{minipage}{.4\\linewidth}\n'+mathalea2d(params_correction, objets_correction)+'\n\\end{minipage}\n'+'\\begin{minipage}{.7\\linewidth}\n'
            }
        if (!sortie_html&&this.sup) {
            texte += '\n\\end{minipage}\n'
        }
        switch (choix_rapport_trigo) {
            case 'cosinus': // AB=BCxcos(B)
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
                texte_corr += `$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0] + nom[1]}}{${nom[1] + nom[2]}}$.<br>`
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\cos\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(nom[0] + nom[1], bc)}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ', 'red')}<br>`;
                texte_corr += `$${nom[0] + nom[1]}=${quatrieme_proportionnelle("\\color{red}{1}",bc,`\\cos\\left(${angleABC}\\degree\\right)`)}$`;
                texte_corr += `soit $${nom[0] + nom[1]}\\approx${tex_nombre(arrondi(ab, 1))}$ cm.`;
reponse =arrondi(ab,1)
                break
            case 'sinus':
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texte_corr += `$\\sin \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0] + nom[2], nom[1] + nom[2])}$<br>`;
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\sin\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(nom[0] + nom[2], bc)}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ', 'red')}<br>`;
                texte_corr += `$${nom[0] + nom[2]}=${quatrieme_proportionnelle("\\color{red}{1}", bc, `\\sin\\left(${angleABC}\\degree\\right)`)}$`;
                texte_corr += `soit $${nom[0] + nom[2]}\\approx${tex_nombre(arrondi(ac, 1))}$ cm.`;
                reponse =arrondi(ac,1)
                break
            case 'tangente':
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texte_corr += `$\\tan \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0] + nom[2], nom[0] + nom[1])}$<br>`;
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\tan\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(nom[0] + nom[2], ab)}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ', 'red')}<br>`;
                texte_corr += `$${nom[0] + nom[2]}=${quatrieme_proportionnelle("\\color{red}{1}", ab, `\\tan\\left(${angleABC}\\degree\\right)`)}$`;
                texte_corr += `soit $${nom[0] + nom[2]}\\approx${tex_nombre(arrondi(ac, 1))}$ cm.`;
                reponse =arrondi(ac,1)
                break
            case 'invCosinus':
                texte_corr = `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
                texte_corr += `$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0] + nom[1]}}{${nom[1] + nom[2]}}$.<br>`
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\cos\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(ab, nom[1] + nom[2])}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ', 'red')}<br>`;
                texte_corr += `$${nom[1] + nom[2]}=${quatrieme_proportionnelle(`\\cos\\left(${angleABC}\\degree\\right)`, ab, "\\color{red}{1}")}$`;
                texte_corr += `soit $${nom[1] + nom[2]}\\approx${tex_nombre(arrondi(bc, 1))}$ cm.`;
                reponse =arrondi(bc,1)
                break
            case 'invSinus':
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texte_corr += `$\\sin \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0] + nom[2], nom[1] + nom[2])}$<br>`;
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\sin\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(ac, nom[1] + nom[2])}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ', 'red')}<br>`;
                texte_corr += `$${nom[1] + nom[2]}=${quatrieme_proportionnelle(`\\sin\\left(${angleABC}\\degree\\right)`, ac, "\\color{red}{1}")}$`;
                texte_corr += `soit $${nom[1] + nom[2]}\\approx${tex_nombre(arrondi(bc, 1))}$ cm.`;
                reponse =arrondi(bc,1)
                break
            case 'invTangente':
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,<br> la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texte_corr += `$\\tan \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0] + nom[2], nom[0] + nom[1])}$<br>`;
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\dfrac{\\tan\\left(${angleABC}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(ac, nom[0] + nom[1])}$<br>`;
                texte_corr += `${texte_en_couleur_et_gras('Les produits en croix sont égaux, donc ', 'red')}<br>`;
                texte_corr += `$${nom[0] + nom[1]}=${quatrieme_proportionnelle(`\\tan\\left(${angleABC}\\degree\\right)`, ac, "\\color{red}{1}")}$`;
                texte_corr += `soit $${nom[0] + nom[1]}\\approx${tex_nombre(arrondi(ab, 1))}$ cm.`;
                reponse =arrondi(ab,1)
                break
        }
if (!sortie_html&&this.correction_detaillee) {
    texte_corr+='\n\\end{minipage}\n'
}

        /*****************************************************/
        // Pour AMC
        this.QCM[1][0] = [texte, [texte_corr,reponse,4], {digits:3,decimals:1,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:1}]
        /****************************************************/
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };

    this.besoin_formulaire_case_a_cocher = ['Figure à main levée', false];
}  