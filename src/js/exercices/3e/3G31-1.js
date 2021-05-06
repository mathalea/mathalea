import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,calcul,creerNomDePolygone,texNombre,choice} from '../../modules/outils.js'
import {point,labelPoint,polygone,similitude,codageAngleDroit,codeAngle,mathalea2d,afficheMesureAngle,afficheLongueurSegment,longueur,angle,texteSurSegment} from '../../modules/2d.js'


export const titre = 'Calculer toutes les mesures d’angle d’une figure complexe'

/**
 * Deux triangles rectangles accolés, on connait deux longueurs et un angle, il faut déterminer tous les autres angles
 * @Auteur Rémi Angot
 * 3G31-1
 * Février 2021 
*/
export default function MonSuperExerciceTropBeau() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Calculer la mesure de tous les angles de cette figure.";
  this.nbQuestions = 1;
  this.nbQuestionsModifiable = false;
  this.nbCols = 1; // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1; // Uniquement pour la sortie LaTeX
  this.spacingCorr = 3;
  this.correctionDetailleeDisponible = true;
  sortieHtml ? this.correctionDetaillee = true : this.correctionDetaillee = false;
  //this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  //this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_question =  choice(['BA-AD-BAC','BA-AD-ACB']);
    let texte, texteCorr;

    let B = point(0,0,'','below')
    let A = point(randint(4,7),0,'','below')
    let C = point(0,randint(3,7),'','above')
    let t1 = polygone(A,B,C)
    let t1c = polygone(A,B,C)
    t1c.color = 'blue'
    t1c.epaisseur = 3
    let c1 = codageAngleDroit(A,B,C)
    let D = similitude(C,A,-90,calcul(randint(7,12)/10),'','right')
    let t2 = polygone(C,A,D)
    let t2c = polygone(C,A,D)
    t2c.color = 'blue'
    t2c.epaisseur = 3
    let c2 = codageAngleDroit(C,A,D)
    let nom = creerNomDePolygone(4)
    A.nom = nom[0]
    B.nom = nom[1]
    C.nom = nom[2]
    D.nom = nom[3]
    let labels = labelPoint(A,B,C,D)
    let BA = longueur(B,A);
    let AD = Math.ceil(longueur(A,D),1);
    let BAC = Math.ceil(angle(B,A,C));
    let AC = calcul(BA/Math.cos(Math.radians(BAC)),1);
    let ACD = Math.round(degres(Math.atan(AD/AC)));
    let a1 = afficheMesureAngle(B,A,C,'black',1,BAC+'°');
    let a2 = afficheLongueurSegment(A,B)
    let a3 = afficheLongueurSegment(D,A)
    let a4 = afficheLongueurSegment(A,C)
    let a5 = codeAngle(A,C,D,1.2);
    a5.epaisseur = 2;
    let ACB = Math.ceil(angle(A,C,B));

    let liste_objets_mathalea = [t1, t2, c1, c2,labels]

    switch (type_de_question) { // Suivant le type de question, le contenu sera différent
    case 'BA-AD-BAC': 
        if (this.sup) {
          liste_objets_mathalea.push(a1, a2, a3)
        }
        texte = mathalea2d({xmin : -1 , ymin : -1, xmax : D.x+1, ymax : Math.max(C.y,D.y)+1},liste_objets_mathalea );
        if (!this.sup) {
          texte += `<br>On a $${B.nom+A.nom} = ${texNombre(BA)}$ cm, $${A.nom+D.nom} = ${texNombre(AD)}$ cm et $\\widehat{${B.nom+A.nom+C.nom}}=${BAC}°$.`
        }
        texteCorr = ''
        if (this.correctionDetaillee) {
          let texte1 = texteSurSegment('hypoténuse',C,A) 
          let texte2 = texteSurSegment('adjacent',A,B,'black',1)
          texteCorr += mathalea2d({xmin : -1 , ymin : -2, xmax : D.x+1, ymax : Math.max(C.y,D.y)+1},t1c,t2,c1,c2,a1,a2,labels,texte1,texte2 );
          texteCorr += '<br>'  
        }
        texteCorr += `$${C.nom+B.nom+A.nom}$ est rectangle en $${B.nom}$ donc $\\cos\\left(\\widehat{${B.nom+A.nom+C.nom}}\\right)=\\dfrac{${B.nom+A.nom}}{${A.nom+C.nom}}\\quad$ `;
        texteCorr += `soit $\\quad\\cos(${BAC}°)=\\dfrac{${texNombre(BA)}}{${A.nom+C.nom}}\\quad$ et $\\quad ${A.nom+C.nom}=\\dfrac{${texNombre(BA)}}{\\cos(${BAC}°)}\\approx${texNombre(AC)}$ cm.`
        if (this.correctionDetaillee) {
          let texte3 = texteSurSegment('adjacent',C,A) 
          let texte4 = texteSurSegment('opposé',A,D,'black')
          texteCorr += '<br><br>' + mathalea2d({xmin : -1 , ymin : -1, xmax : D.x+1, ymax : Math.max(C.y,D.y)+1},t1,t2c,c1,c2,a3,a4,a5,labels,texte3,texte4 );
        }
        texteCorr += `<br><br>$${C.nom+A.nom+D.nom}$ est rectangle en $${A.nom}$ donc $\\tan\\left(\\widehat{${A.nom+C.nom+D.nom}}\\right)=\\dfrac{${A.nom+D.nom}}{${A.nom+C.nom}}\\quad$ `;
        texteCorr += `soit $\\quad\\tan\\left(\\widehat{${A.nom+C.nom+D.nom}}\\right)\\approx\\dfrac{${texNombre(AD)}}{${texNombre(AC)}}\\quad$ et $\\quad\\widehat{${A.nom+C.nom+D.nom}}=\\text{arctan}\\left(\\dfrac{${texNombre(AD)}}{${texNombre(AC)}}\\right)\\approx${ACD}$°.`
        texteCorr += `<br><br>La somme des angles d'un triangle est égale à 180° donc $\\widehat{${B.nom+C.nom+A.nom}}=180°-90°-${BAC}°=${90-BAC}°$.`
        texteCorr += `<br>De même, $\\widehat{${C.nom+D.nom+A.nom}}\\approx 180°-90°-${ACD}°\\approx${90-ACD}°$.`
        break;
    case 'BA-AD-ACB': 
        AC = calcul(BA/Math.sin(Math.radians(ACB)),1);
        ACD = Math.round(degres(Math.atan(AD/AC)));
        a1 = afficheMesureAngle(A,C,B,'black',1,ACB+'°');
        if (this.sup) {
          liste_objets_mathalea.push(a1, a2, a3)
        }
        texte = mathalea2d({xmin : -1 , ymin : -1, xmax : D.x+1, ymax : Math.max(C.y,D.y)+1},liste_objets_mathalea );
        if (!this.sup) {
          texte += `<br>On a $${B.nom+A.nom} = ${texNombre(BA)}$ cm, $${A.nom+D.nom} = ${texNombre(AD)}$ cm et $\\widehat{${A.nom+C.nom+B.nom}}=${ACB}°$.`
        }
        texteCorr = ''
        if (this.correctionDetaillee) {
          let texte1 = texteSurSegment('hypoténuse',C,A) 
          let texte2 = texteSurSegment('opposé',A,B,'black',1)
          texteCorr += mathalea2d({xmin : -1 , ymin : -2, xmax : D.x+1, ymax : Math.max(C.y,D.y)+1},t1c,t2,c1,c2,a1,a2,labels,texte1,texte2 );
          texteCorr += '<br>'  
        }
        texteCorr += `$${C.nom+B.nom+A.nom}$ est rectangle en $${B.nom}$ donc $\\sin\\left(\\widehat{${A.nom+C.nom+B.nom}}\\right)=\\dfrac{${B.nom+A.nom}}{${A.nom+C.nom}}\\quad$ `;
        texteCorr += `soit $\\quad\\sin(${ACB}°)=\\dfrac{${texNombre(BA)}}{${A.nom+C.nom}}\\quad$ et $\\quad ${A.nom+C.nom}=\\dfrac{${texNombre(BA)}}{\\sin(${ACB}°)}\\approx${texNombre(AC)}$ cm.`
        if (this.correctionDetaillee) {
          let texte3 = texteSurSegment('adjacent',C,A) 
          let texte4 = texteSurSegment('opposé',A,D,'black')
          texteCorr += '<br><br>' + mathalea2d({xmin : -1 , ymin : -1, xmax : D.x+1, ymax : Math.max(C.y,D.y)+1},t1,t2c,c1,c2,a3,a4,a5,labels,texte3,texte4 );
        }
        texteCorr += `<br><br>$${C.nom+A.nom+D.nom}$ est rectangle en $${A.nom}$ donc $\\tan\\left(\\widehat{${A.nom+C.nom+D.nom}}\\right)=\\dfrac{${A.nom+D.nom}}{${A.nom+C.nom}}\\quad$ `;
        texteCorr += `soit $\\quad\\tan\\left(\\widehat{${A.nom+C.nom+D.nom}}\\right)\\approx\\dfrac{${texNombre(AD)}}{${texNombre(AC)}}\\quad$ et $\\quad\\widehat{${A.nom+C.nom+D.nom}}=\\text{arctan}\\left(\\dfrac{${texNombre(AD)}}{${texNombre(AC)}}\\right)\\approx${ACD}$°.`
        texteCorr += `<br><br>La somme des angles d'un triangle est égale à 180° donc $\\widehat{${B.nom+C.nom+A.nom}}=180°-90°-${BAC}°=${90-BAC}°$.`
        texteCorr += `<br>De même, $\\widehat{${C.nom+D.nom+A.nom}}\\approx 180°-90°-${ACD}°\\approx${90-ACD}°$.`
        break;
    }
    this.listeQuestions.push(texte);
    this.listeCorrections.push(texteCorr);
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireCaseACocher = ['Figure codée'];
}


