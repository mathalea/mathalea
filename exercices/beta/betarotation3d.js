import Exercice from '../ClasseExercice.js';
import { point, point3d, tracePoint, rotationV3d,rotation3d,droite3d, mathalea2d, segment, demiDroite } from '/modules/2d.js'
/**
 * Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.
 *
 * Niveau de difficulté 1 :
 * * division par 2, 3 , 4 ou 5
 * * division par 6 à 9
 * * un 0 dans le quotient
 *
 * Niveau de difficulté 2 :
 * * division par 11, 12, 15, 25
 * * division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
 * * division par un multiple de 10 et un 0 dans le quotient
 * @Auteur Rémi Angot
 * Référence 6C11
 */
export default function Rotation_3d() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Rotation3d";
    this.consigne = "";
    this.spacing = 2;
    sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1); //Important sinon opidiv n'est pas joli
    this.nb_questions = 1;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let v = math.matrix([0, 0, 5])
        let A = point(0, 0), B = point(5, 0)
        let C = point(0, 8)
        let D=point3d(7,0,0)
        let d=droite3d(D,v)
        let t = [], objets = []
        let M = point3d(5, 0, 0)
        let P = []
        for (let i = 0; i <= 18; i++) {
            P.push(rotation3d(M, d, i * 20))
        }
        for (let i = 0; i <= 18; i++) {
            t[i] = tracePoint(P[i].p2d)
            objets.push(t[i])
        }
        for (let j = 1; j <= 18; j++) {
            objets.push(segment(P[j - 1].p2d, P[j].p2d))
            objets.push(segment(D.p2d, P[j].p2d))
            objets.push(segment(C, P[j].p2d))
        }
        objets.push(demiDroite(A, B), demiDroite(A, rotationV3d(M, v, 90).p2d))
        this.contenu = mathalea2d({ xmin: -6, ymin: -5, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.7 }, objets)

    }
};

