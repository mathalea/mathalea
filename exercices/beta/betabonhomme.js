import Exercice from '../ClasseExercice.js';
import { mathalea2d } from '/modules/2d.js'
import {point3d,cylindre3d,sphere3d,vecteur3d,translation3d,cone3d,cercle3d} from "/modules/3d.js"

export default function bonhomme_de_neige() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "bonhomme de neige";
    this.consigne = "";
    this.spacing = 2;
    this.nb_questions = 1;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let objets=[]
        let normal=vecteur3d(0,0,1)
        let normal2=vecteur3d(0,-0.2,0)
        let normal3=vecteur3d(0,-0.15,0.05)
        let normal4=vecteur3d(0,-0.15,-0.05)
        let normal6=vecteur3d(0,-1,0)
        let R1=vecteur3d(5,0,0)
        let R2=vecteur3d(3,0,0)
        let R3=vecteur3d(1.5,0,0)
        let C1=point3d(0,0,5)
        let C2=point3d(0,0,12)
        let C3=point3d(0,0,16)
        let S1=sphere3d(C1,5,3,7)
        let S2=sphere3d(C2,3,3,7)
        let S3=sphere3d(C3,1,3,7)
        let rayon1=vecteur3d(0.3,0,0)
        let rayon2=vecteur3d(0.2,0,0)
        let cyl1=cylindre3d(point3d(0,-2.5,14.5),translation3d(point3d(0,-2.5,14.5),normal3),normal3,rayon1,rayon1)         
        let cyl2=cylindre3d(point3d(0,-3,13),translation3d(point3d(0,-3,13),normal2),normal2,rayon1,rayon1)       
        let cyl3=cylindre3d(point3d(0,-2.5,11),translation3d(point3d(0,-2.5,11),normal4),normal4,rayon1,rayon1)       
        let cercle1=cercle3d(point3d(-0.5,-1.5,16.5),normal6,rayon2,true)
        let cercle2=cercle3d(point3d(0.5,-1.5,16.5),normal6,rayon2,true)
        cercle1.couleurDeRemplissage='black'
        cercle2.couleurDeRemplissage='black'
        
        let cone=cone3d(point3d(0,-1.5,16),translation3d(point3d(0,-1.5,16),normal6),normal6,rayon1)
        objets.push(S1,S2,S3,cyl1,cyl2,cyl3,cone,cercle1,cercle2)
        this.contenu = mathalea2d({ xmin: -6, ymin: -1, xmax: 6, ymax: 20, pixelsParCm: 20, scale: 0.7 }, objets)

    }
};

