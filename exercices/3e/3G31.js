import Exercice from '../ClasseExercice.js';
import {homothetie,codeAngle,longueur,tracePoint,barycentre,milieu,latexParPoint, mathalea2d, point, polygone, rotation, codageAngleDroit, nommePolygone, segment, texteSurSegment, droite, projectionOrtho, pointSurSegment, texteParPoint, afficheMesureAngle } from "/modules/2d.js";
import { calcul, tex_fraction, quatrieme_proportionnelle, tex_nombre, arrondi, tex_nombre2,texte_en_couleur_et_gras, liste_de_question_to_contenu, randint, creerNomDePolygone, choice } from "/modules/outils.js";


/**
 * @auteur Jean-Claude Lhote à partir de 3G30-1 de Rémi Angot
 * 3G31 Exercice remplaçant l'exercice initial utilisant MG32
 * Calculer une longueur en utilisant l'un des trois rapport trigonométrique.
 * * Si this.level=4 alors seul le cosinus sera utilisé.
 * Mars 2021
 */
export default function Calcul_de_longueur() {
    Exercice.call(this)
    this.titre = "Calculer un angle dans un triangle rectangle en utilisant la trigonométrie";
    this.nb_questions = 1;
    this.nb_questions_modifiable = false;
    this.nb_cols = 1;
    this.nb_cols_corr = 2;
    this.sup = false
    this.correction_detaillee_disponible=true
    this.correction_detaillee=false

    if (sortie_html) {
        this.spacing = 4;
        this.spacing_corr = 4;
    } else {
        this.spacing = 2;
        this.spacing_corr = 2;
    }

    this.nouvelle_version = function () {
        this.liste_questions = []
        this.liste_corrections = []
    /*********************************************************/
    // On ajoute cette ligne pour AMC
    if (this.level!=4){
    this.QCM = ['3G31', [], "Calculs d'angle avec la trigonométrie"]
    }
    else {
        this.QCM = ['4G41', [], "Calculs d'angle avec la trigonométrie"]  
    }
    /**********************************************************/

        let nom = creerNomDePolygone(3)
        let texte = '', texte_corr = '', objets_enonce = [], objets_correction = [], choix_rapport_trigo;
        let ab, bc, ac, angleABC, angleABCr
        if (this.level == 4) {
            choix_rapport_trigo = choice(['Acos'])
        }
        else {
            choix_rapport_trigo = choice(['Acos', 'Asin', 'Atan'])
        }
        angleABC = randint(35, 55)
 
        if (!sortie_html) {
            texte += '\\begin{minipage}{.6\\linewidth}\n'
        }
        switch (choix_rapport_trigo) {
            case 'Acos': // AB=BCxcos(B)
                bc = arrondi(randint(100, 150)/10,1)
                ab = arrondi(randint(40,(bc-2)*10)/10,1)
                angleABC = Math.round(Math.acos(ab/bc)*180/Math.PI)
                ac = arrondi(calcul(bc * Math.sin(Math.acos(ab/bc))),1)
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[1] + nom[2]}=${tex_nombre2(bc)}$ cm et $${nom[0]+nom[1]}=${tex_nombre2(ab)}$ cm.<br>`
                texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.<br>`
                break
            case 'Asin':
                bc = randint(100, 150)/10
                ac = randint(40,(bc-2)*10)/10
                angleABC = Math.round(Math.asin(ac/bc)*180/Math.PI)
                ab = calcul(bc * Math.cos(Math.asin(ac/bc)))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[1] + nom[2]}=${tex_nombre2(bc)}$ cm et $${nom[0]+nom[2]}=${tex_nombre2(ac)}$ cm.<br>`
                texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.<br>`
                break
            case 'Atan':
                ab = randint(40,100)/10
                ac = randint(40,100)/10
                angleABC = Math.round(Math.atan(ac/ab)*180/Math.PI)
                bc = calcul(ab / Math.cos(Math.atan(ac/ab)))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, $${nom[0] + nom[1]}=${tex_nombre2(ab)}$ cm et  $${nom[0]+nom[2]}=${tex_nombre2(ac)}$ cm.<br>`
                texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.<br>`
                break
        }

        if (!sortie_html) {
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
      let m3=homothetie(M3,G,1+1.5/longueur(G,M3))
      let m1=homothetie(M1,M3,1+1.5/longueur(M3,M1))
      let m2=homothetie(M2,M3,1+1.5/longueur(M3,M2))

      let t1,t2,t3
      switch (choix_rapport_trigo) {
        case 'Acos': // AB=BCxcos(B)
            t3=latexParPoint(`${tex_nombre2(bc)} \\text{ cm}`,m3,'black',120,12,'')
            t2=latexParPoint(`${tex_nombre2(ab)} \\text{ cm}`,m1,'black',120,12,'')
            m2=homothetie(G,B,2.5/longueur(B,G))
            t1=latexParPoint(`?`,m2,'black',50,12,'')
            break
        case 'Asin':
            t3=latexParPoint(`${tex_nombre2(bc)} \\text{ cm}`,m3,'black',120,12,'')
            t2=latexParPoint(`${tex_nombre2(ac)} \\text{ cm}`,m2,'black',120,12,'')
            m1=homothetie(G,B,2.5/longueur(B,G))
            t1=latexParPoint(`?`,m1,'black',100,12,'')
            break
        case 'Atan':
            t1=latexParPoint(`${tex_nombre2(ab)} \\text{ cm}`,m1,'black',120,12,'')
            t2=latexParPoint(`${tex_nombre2(ac)} \\text{ cm}`,m2,'black',120,12,'')
            m3=homothetie(G,B,2.5/longueur(B,G))
            t3=latexParPoint(`?`,m3,'black',100,12,'')
            break
            }

        objets_enonce.push(p2, codage, nomme,t1,t2,t3,codeangle)
        objets_correction.push(p2, codage, nomme, t1, t2, t3, hypo,codeangle)

        let params_enonce = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 3, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 18, scale: 0.47, mainlevee: true,amplitude:0.4 }
        let params_correction = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 3, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 20, scale: .5, mainlevee: false }
        if (!sortie_html) {
            texte += '\\begin{minipage}{.4\\linewidth}\n'
        }
        if (this.sup) {
            texte += mathalea2d(params_enonce, objets_enonce) + '<br>'
        }
        if (this.correction_detaillee){
            texte_corr += mathalea2d(params_correction, objets_correction)+'<br>'
        }    
        if (!sortie_html) {
            texte += '\n\\end{minipage}\n'
        }
        switch (choix_rapport_trigo) {
            case 'Acos': // AB=BCxcos(B)
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
                texte_corr += `$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0] + nom[1]}}{${nom[1] + nom[2]}}$.<br>`
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\cos\\left(\\widehat{${nom}}\\right)=${tex_fraction(tex_nombre2(ab),tex_nombre2(bc))}$<br>`;
                texte_corr += `$\\widehat{${nom}}=\\arccos(${tex_fraction(tex_nombre2(ab),tex_nombre2(bc))})\\approx ${angleABC}\\degree$<br>`;

                break
            case 'Asin':
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texte_corr += `$\\sin \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0] + nom[2], nom[1] + nom[2])}$<br>`;
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\sin\\left(\\widehat{${nom}}\\right)=${tex_fraction(tex_nombre2(ac),tex_nombre2(bc))}$<br>`;
                texte_corr += `$\\widehat{${nom}}=\\arcsin(${tex_fraction(tex_nombre2(ac),tex_nombre2(bc))})\\approx ${angleABC}\\degree$<br>`;

                break
            case 'Atan':
                texte_corr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texte_corr += `$\\tan \\left(\\widehat{${nom}}\\right)=${tex_fraction(nom[0] + nom[2], nom[0] + nom[1])}$<br>`;
                texte_corr += `Avec les données numériques :<br>`;
                texte_corr += `$\\tan\\left(\\widehat{${nom}}\\right)=${tex_fraction(tex_nombre2(ac),tex_nombre2(ab))}$<br>`;
                texte_corr += `$\\widehat{${nom}}=\\arctan\\left(${tex_fraction(tex_nombre2(ac),tex_nombre2(ab))}\\right) \\approx ${angleABC} \\degree $ <br>`;
console.log(texte_corr)
                break
                  }


        /*****************************************************/
        // Pour AMC
        this.QCM[1][0] = [texte, [texte_corr], [4]]
        /****************************************************/
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };

    this.besoin_formulaire_case_a_cocher = ['Figure à main levée', false];
}  