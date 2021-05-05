import Exercice from '../ClasseExercice.js';
import {homothetie,codeAngle,longueur,tracePoint,barycentre,milieu,latexParPoint, mathalea2d, point, polygone, rotation, codageAngleDroit, nommePolygone, segment, texteSurSegment, droite, projectionOrtho, pointSurSegment, texteParPoint, afficheMesureAngle } from '../../modules/2d.js';
import { calcul, texFraction, quatrieme_proportionnelle, texNombre, arrondi, texNombre2,texte_en_couleur_et_gras, listeQuestionsToContenu, randint, creerNomDePolygone, choice } from '../../modules/outils.js';


export const amcReady = true

export const titre = 'Calculer un angle dans un triangle rectangle en utilisant la trigonométrie'

/**
 * @auteur Jean-Claude Lhote à partir de 3G30-1 de Rémi Angot
 * 3G31 Exercice remplaçant l'exercice initial utilisant MG32
 * Calculer une longueur en utilisant l'un des trois rapport trigonométrique.
 * * Si this.level=4 alors seul le cosinus sera utilisé.
 * Mars 2021
 */
export default function Calcul_de_longueur() {
    Exercice.call(this)
    this.titre = titre;
    this.nbQuestions = 1;
    this.nbQuestionsModifiable = false;
    this.nbCols = 1;
    this.nbColsCorr = 1;
    this.sup = false
    this.correctionDetailleeDisponible=true
    this.correctionDetaillee=false

    if (sortieHtml) {
        this.spacing = 0;
        this.spacingCorr = 0;
    } else {
        this.spacing = 2;
        this.spacingCorr = 2;
    }

    this.nouvelleVersion = function () {
        this.listeQuestions = []
        this.listeCorrections = []
    /*********************************************************/
    // On ajoute cette ligne pour AMC
    if (this.level!=4){
    this.qcm = ['3G31', [], "Calculs d'angle avec la trigonométrie",5]
    }
    else {
        this.qcm = ['4G41', [], "Calculs d'angle avec la trigonométrie",5]  
    }
    /**********************************************************/
let mEp,mEp2
if (this.sup) mEp='<br>'
else mEp=''
if (this.correctionDetaillee) mEp2='<br>'
else mEp2=''
        let nom = creerNomDePolygone(3)
        let texte = '', texteCorr = '', objets_enonce = [], objets_correction = [], choix_rapport_trigo;
        let ab, bc, ac, angleABC
        if (this.level == 4) {
            choix_rapport_trigo = choice(['Acos'])
        }
        else {
            choix_rapport_trigo = choice(['Acos', 'Asin', 'Atan'])
        }
        angleABC = randint(35, 55)
 
        if (!sortieHtml&&this.sup) {
            texte += '\\begin{minipage}{.6\\linewidth}\n'
        }
        switch (choix_rapport_trigo) {
            case 'Acos': // AB=BCxcos(B)
                bc = arrondi(randint(100, 150)/10,1)
                ab = arrondi(randint(40,(bc-2)*10)/10,1)
                angleABC = Math.round(Math.acos(ab/bc)*180/Math.PI)
                ac = arrondi(calcul(bc * Math.sin(Math.acos(ab/bc))),1)
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,${mEp} $${nom[1] + nom[2]}=${texNombre2(bc)}$ cm et $${nom[0]+nom[1]}=${texNombre2(ab)}$ cm.<br>`
                texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.`
                break
            case 'Asin':
                bc = randint(100, 150)/10
                ac = randint(40,(bc-2)*10)/10
                angleABC = Math.round(Math.asin(ac/bc)*180/Math.PI)
                ab = calcul(bc * Math.cos(Math.asin(ac/bc)))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,${mEp} $${nom[1] + nom[2]}=${texNombre2(bc)}$ cm et $${nom[0]+nom[2]}=${texNombre2(ac)}$ cm.<br>`
                texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.`
                break
            case 'Atan':
                ab = randint(40,100)/10
                ac = randint(40,100)/10
                angleABC = Math.round(Math.atan(ac/ab)*180/Math.PI)
                bc = calcul(ab / Math.cos(Math.atan(ac/ab)))
                texte += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$,${mEp} $${nom[0] + nom[1]}=${texNombre2(ab)}$ cm et  $${nom[0]+nom[2]}=${texNombre2(ac)}$ cm.<br>`
                texte += `Calculer $\\widehat{${nom}}$ à $1 \\degree$ près.`
                break
        }

        if (!sortieHtml&&this.sup) {
            texte += '\n\\end{minipage}\n'
        }
        let ratioerreur=randint(80,120,100)/100
        let a = point(0, 0)
        let b = point(ab*ratioerreur, 0)
        let bb= point(ab,0)
        let c = point(0, ac/ratioerreur)
        let cb =point(0,ac)
        let p1 = polygone(a, b, c)
        let p3 =polygone(a,bb,cb)
        //p1.isVisible = false
        let alpha= randint(0, 360)
        let p2 = rotation(p1, a,alpha)
        let p4= rotation(p3,a,alpha)
        let A = p2.listePoints[0]
        let B = p2.listePoints[1]
        let C = p2.listePoints[2]
        let Bb = p4.listePoints[1]
        let Cb = p4.listePoints[2]
        
        let codage = codageAngleDroit(B, A, C)
        let codageb= codageAngleDroit(Bb,A,Cb)
        A.nom = nom[0], B.nom = nom[1], C.nom = nom[2];
        let nomme = nommePolygone(p2, nom),codeangle
        let nommeb =nommePolygone(p4,nom),codeangleb

       let hypo = segment(Cb, Bb)
        hypo.epaisseur = 2
        hypo.color = 'blue'
     //   codageAngle.epaisseur = 3
      //  codageAngle2.epaisseur = 3
      codeangle=codeAngle(A,B,C,2)
      codeangleb=codeAngle(A,Bb,Cb,2)
      
      let M1=milieu(A,B)
      let M2=milieu(A,C)
      let M3=milieu(B,C)
      let G=barycentre(p2)
      let M1b=milieu(A,Bb)
      let M2b=milieu(A,Cb)
      let M3b=milieu(Bb,Cb)
      let Gb=barycentre(p4)
      let m3=homothetie(M3,G,1+1.5/longueur(G,M3))
      let m1=homothetie(M1,M3,1+1.5/longueur(M3,M1))
      let m2=homothetie(M2,M3,1+1.5/longueur(M3,M2))
      let m4
      m1.positionLabel='center'
      m2.positionLabel='center'
      m3.positionLabel='center'
      let m3b=homothetie(M3b,Gb,1+1.5/longueur(Gb,M3b))
      let m1b=homothetie(M1b,M3b,1+1.5/longueur(M3b,M1b))
      let m2b=homothetie(M2b,M3b,1+1.5/longueur(M3b,M2b))
      let m4b
      m1b.positionLabel='center'
      m2b.positionLabel='center'
      m3b.positionLabel='center'

      let t1,t2,t3,t1b,t2b,t3b
      switch (choix_rapport_trigo) {
        case 'Acos': // AB=BCxcos(B)
            t3=latexParPoint(`${texNombre2(bc)} \\text{ cm}`,m3,'black',120,12,'')
            t2=latexParPoint(`${texNombre2(ab)} \\text{ cm}`,m1,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G))
            m4.positionLabel='center'
            t1=latexParPoint(`?`,m4,'black',50,12,'')
            t3b=latexParPoint(`${texNombre2(bc)} \\text{ cm}`,m3b,'black',120,12,'')
            t2b=latexParPoint(`${texNombre2(ab)} \\text{ cm}`,m1b,'black',120,12,'')
            m4b=homothetie(Gb,Bb,2.7/longueur(Bb,Gb))
            m4b.positionLabel='center'
            t1b=latexParPoint(`?`,m4b,'black',50,12,'')
            break
        case 'Asin':
            t3=latexParPoint(`${texNombre2(bc)} \\text{ cm}`,m3,'black',120,12,'')
            t2=latexParPoint(`${texNombre2(ac)} \\text{ cm}`,m2,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G))
            m4.positionLabel='center'
            t1=latexParPoint(`?`,m4,'black',100,12,'')
            t3b=latexParPoint(`${texNombre2(bc)} \\text{ cm}`,m3b,'black',120,12,'')
            t2b=latexParPoint(`${texNombre2(ac)} \\text{ cm}`,m2b,'black',120,12,'')
            m4b=homothetie(Gb,Bb,2.7/longueur(Bb,Gb))
            m4b.positionLabel='center'
            t1b=latexParPoint(`?`,m4b,'black',100,12,'')
            break
        case 'Atan':
            t1=latexParPoint(`${texNombre2(ab)} \\text{ cm}`,m1,'black',120,12,'')
            t2=latexParPoint(`${texNombre2(ac)} \\text{ cm}`,m2,'black',120,12,'')
            m4=homothetie(G,B,2.7/longueur(B,G))
            m4.positionLabel='center'
            t3=latexParPoint(`?`,m4,'black',100,12,'')
            t1b=latexParPoint(`${texNombre2(ab)} \\text{ cm}`,m1b,'black',120,12,'')
            t2b=latexParPoint(`${texNombre2(ac)} \\text{ cm}`,m2b,'black',120,12,'')
            m4b=homothetie(Gb,Bb,2.7/longueur(Bb,Gb))
            m4b.positionLabel=''
            t3b=latexParPoint(`?`,m4b,'black',100,12,'')
            break
            }

        objets_enonce.push(p2, codage, nomme,t1,t2,t3,codeangle)
        objets_correction.push(p4, codageb, nommeb, t1b, t2b, t3b, hypo,codeangleb)

        let params_enonce = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 3, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 17, scale: 0.37, mainlevee: true,amplitude:0.4 }
        let params_correction = { xmin: Math.min(A.x, B.x, C.x) - 4, ymin: Math.min(A.y, B.y, C.y) - 4, xmax: Math.max(A.x, B.x, C.x) + 3, ymax: Math.max(A.y, B.y, C.y) + 2, pixelsParCm: 20, scale: .5, mainlevee: false }
        if (!sortieHtml&&this.sup) {
            texte += '\\begin{minipage}{.4\\linewidth}\n'
        }
        if (this.sup) {
            texte += mathalea2d(params_enonce, objets_enonce) + '<br>'
        }
        if (this.correctionDetaillee){
            if (!sortieHtml) texteCorr+='\\begin{minipage}{.5\\linewidth}\n'
            texteCorr += mathalea2d(params_correction, objets_correction)+'<br>'
            if (!sortieHtml) texteCorr+='\n\\end{minipage}\n'
            
        }    
        if (!sortieHtml&&this.sup) {
            texte += '\n\\end{minipage}\n'
        }
        if (this.correctionDetaillee&&!sortieHtml) texteCorr+='\\begin{minipage}{.5\\linewidth}\n'
        switch (choix_rapport_trigo) {
            case 'Acos': // AB=BCxcos(B)
                texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, ${mEp2}le cosinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`
                texteCorr += `$\\cos\\left(\\widehat{${nom}}\\right)=\\dfrac{${nom[0] + nom[1]}}{${nom[1] + nom[2]}}$.<br>`
                texteCorr += `Avec les données numériques :<br>`;
                texteCorr += `$\\cos\\left(\\widehat{${nom}}\\right)=${texFraction(texNombre2(ab),texNombre2(bc))}$<br>`;
                texteCorr += `$\\widehat{${nom}}=\\arccos(${texFraction(texNombre2(ab),texNombre2(bc))})\\approx ${angleABC}\\degree$<br>`;

                break
            case 'Asin':
                texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$ ${mEp2},le sinus de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texteCorr += `$\\sin \\left(\\widehat{${nom}}\\right)=${texFraction(nom[0] + nom[2], nom[1] + nom[2])}$<br>`;
                texteCorr += `Avec les données numériques :<br>`;
                texteCorr += `$\\sin\\left(\\widehat{${nom}}\\right)=${texFraction(texNombre2(ac),texNombre2(bc))}$<br>`;
                texteCorr += `$\\widehat{${nom}}=\\arcsin(${texFraction(texNombre2(ac),texNombre2(bc))})\\approx ${angleABC}\\degree$<br>`;

                break
            case 'Atan':
                texteCorr += `Dans le triangle $${nom}$ rectangle en $${nom[0]}$, ${mEp2}la tangente de l'angle $\\widehat{${nom}}$ est défini par :<br>`;
                texteCorr += `$\\tan \\left(\\widehat{${nom}}\\right)=${texFraction(nom[0] + nom[2], nom[0] + nom[1])}$<br>`;
                texteCorr += `Avec les données numériques :<br>`;
                texteCorr += `$\\tan\\left(\\widehat{${nom}}\\right)=${texFraction(texNombre2(ac),texNombre2(ab))}$<br>`;
                texteCorr += `$\\widehat{${nom}}=\\arctan\\left(${texFraction(texNombre2(ac),texNombre2(ab))}\\right) \\approx ${angleABC} \\degree $ <br>`;
console.log(texteCorr)
                break
                  }
                  if (this.correctionDetaillee&&!sortieHtml) texteCorr+='\n\\end{minipage}\n'

        /*****************************************************/
        // Pour AMC
        this.qcm[1][0] = [texte, [texteCorr,angleABC,4],{digits:2,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:1}]
        /****************************************************/
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        listeQuestionsToContenu(this); // On envoie l'exercice à la fonction de mise en page
    };

    this.besoinFormulaireCaseACocher = ['Figure à main levée', false];
}  

    