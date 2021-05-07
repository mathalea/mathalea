import Exercice from '../ClasseExercice.js';
import { texFractionReduite, choice, texNombre, calcul,listeQuestionsToContenu, combinaisonListes, randint, arrondi, creerNomDePolygone } from '../../modules/outils.js'
import { mathalea2d, angle, point, droite, droiteVerticaleParPoint, cercle, pointIntersectionLC, polygone, projectionOrtho, segment, codageAngleDroit, labelPoint, longueur } from '../../modules/2d.js'


export const titre = 'Problème trigonométrique - Triangle rectangle inscrit dans un triangle rectangle'

/**
 * Calculer un angle pour pouvoir ensuite calculer une longueur avec 2 triangles rectangles imbriqués
 * @Auteur Rémi Angot
 * Référence 3G32-5
 * 2021-02-14
*/
export default function CalculsTrigo() {
    Exercice.call(this)
    this.titre = titre;
    this.nbQuestions = 1;
    this.nbQuestionsModifiable = false;
    this.nbCols = 1;
    this.nbColsCorr = 1;
    this.spacingCorr = 3;

    this.nouvelleVersion = function () {

        this.listeQuestions = [] // tableau contenant la liste des questions 
        this.listeCorrections = []

        let objets_enonce = [], objets_correction = [], params_enonce = {}, params_correction = {}, texte = '', texteCorr = '';
        let AD = randint(5,9)
        let AE = randint(AD+1,AD+4)
        let AC = randint(3,AD-1)
        let A = point(0,0,'A','below left')
        let C = point(AC,0,'C','below')
        let D = point(AD,0,'D','below right')
        let dDE = droiteVerticaleParPoint(D)
        let cAE = cercle(A,AE)
        let E = pointIntersectionLC(dDE,cAE,'E')
        E.positionLabel = 'right'
        let p = polygone(A,D,E)
        let dAE = droite(A,E)
        let B = projectionOrtho(C,dAE,'B','above left')
        let codage1 = codageAngleDroit(A,B,C)
        let codage2 = codageAngleDroit(A,D,E)
        let labels = labelPoint(A,B,C,D,E)
        let nomDesSommets = creerNomDePolygone(5)
        A.nom = nomDesSommets[0]
        B.nom = nomDesSommets[1]
        C.nom = nomDesSommets[2]
        D.nom = nomDesSommets[3]
        E.nom = nomDesSommets[4]
        let mirroir = choice([true,false])
        if (mirroir){
            B.x *=-1
            C.x *=-1
            D.x *=-1
            E.x *=-1
            A.positionLabel = 'below' 
            B.positionLabel = 'above'
            C.positionLabel = 'below'
            D.positionLabel = 'below'
            E.positionLabel = 'above'
        }
        let sBC = segment(B,C)

        objets_enonce = [p, sBC, codage1, codage2, labels]
        objets_correction = [p, sBC, codage1, codage2, labels]
        params_enonce = { xmin: -10, ymin: -1, xmax:10, ymax: E.y+1.5 , pixelsParCm: 20, scale: 1, mainlevee: false }
        params_correction = { xmin: -1, ymin: -1, xmax:D.x+1.5, ymax: E.y+1.5 , pixelsParCm: 20, scale: 1, mainlevee: false }
        texte += mathalea2d(params_enonce, objets_enonce)
        texte += `<br><br> $${A.nom+E.nom} = ${AE}~\\text{cm}$, $${A.nom+D.nom} = ${AD}~\\text{cm}$ et $${A.nom+C.nom} = ${AC}~\\text{cm}$.`
        texte += `<br> Calculer la longueur $${A.nom+B.nom}$ et donner une valeur approchée au millimètre près.`
        //texteCorr += mathalea2d(params_correction, objets_correction)
        texteCorr += `Dans le triangle $${A.nom+D.nom+E.nom}$ rectangle en $${D.nom}$ : `
        texteCorr += `<br>$\\cos(\\widehat{${D.nom+A.nom+E.nom}})=\\dfrac{${A.nom+D.nom}}{${A.nom+E.nom}}\\quad$ soit $\\quad\\cos(\\widehat{${D.nom+A.nom+E.nom}})=\\dfrac{${AD}}{${AE}}$,`
        texteCorr += `<br> d'où $\\widehat{${D.nom+A.nom+E.nom}}=\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\approx${texNombre(arrondi(angle(D,A,E),1))}\\degree$.`


        texteCorr += `<br><br>Dans le triangle $${A.nom+B.nom+C.nom}$ rectangle en $${B.nom}$ : `
        texteCorr += `<br>$\\cos(\\widehat{${B.nom+A.nom+C.nom}})=\\dfrac{${A.nom+B.nom}}{${A.nom+C.nom}}\\quad$ soit $\\quad\\cos(${texNombre(arrondi(angle(D,A,E),1))}\\degree)\\approx\\dfrac{${A.nom+B.nom}}{${AC}}$,`
        texteCorr += `<br> d'où $${A.nom+B.nom} \\approx ${AC} \\times \\cos(${texNombre(arrondi(angle(D,A,E),1))}\\degree)\\approx${texNombre(arrondi(longueur(A,B),1))}~\\text{cm}$.`
        
        texteCorr += `<br><br>On pouvait aussi écrire : $${A.nom+B.nom} = ${AC} \\times \\cos\\left(\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\right)=${AC}\\times\\dfrac{${AD}}{${AE}}=${texFractionReduite(AC*AD,AE)}$.`
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        listeQuestionsToContenu(this); // On envoie l'exercice à la fonction de mise en page
    };

}
