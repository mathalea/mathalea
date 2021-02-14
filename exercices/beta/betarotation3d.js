import Exercice from '../ClasseExercice.js';
import { mathalea2d,point,rotation,latexParPoint } from '/modules/2d.js'
import {point3d,polygone3d,rotation3d,droite3d} from "/modules/3d.js"
import {texcolors} from "/modules/outils.js"

export default function beta_rotation3d() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Rotation 3d de polygones";
    this.consigne = "";
    this.spacing = 2;
    this.nb_questions = 1;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let objets=[]
        let O=point3d(0,0,0)
        let C=point3d(0,-2,0)
        let A=point3d(0,5,0)
        let B=point3d(0,0,7)
        let P=polygone3d([C,A,B],'black')
        console.log(P.p2d)
        let Axex=droite3d(O,point3d(1,0,0))
        let Axey=droite3d(O,point3d(0,1,0))
        let Axez=droite3d(O,point3d(0,0,1))
        let p=[]
        Axex.p2d.isVisible=true
        Axey.p2d.isVisible=true
        Axez.p2d.isVisible=true
        for (let a=0;a<=360;a+=1) {
        p.push(rotation3d(P,Axey,a,texcolors(a)))
        }
        console.log(p[1].p2d)
        for (let k=0;k<p.length;k++){
            for (let j=0;j<p[k].p2d.length;j++){
                objets.push(p[k].p2d[j])
            }
        }
        objets.push(Axex.p2d,Axey.p2d,Axez.p2d)
        this.contenu = mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.7 }, objets)
        O = point(0,0)
        A = point(5,0)
        let points = []
        let textes = []
        for (let i=0 ; i<24 ; i++){
          points[i] = rotation(A,O,i*15+30)
          console.log(i,points)
          textes[i] = latexParPoint('$\\dfrac{\\pi^2}{4x}$',points[i])
        }
        this.contenu +=mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.7 }, textes)
    }
};

