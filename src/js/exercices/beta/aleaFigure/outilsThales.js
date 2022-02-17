import { Vector } from "./elements";
import { GraphicView } from "./GraphicView";
import { aleaName } from "../../../modules/outilsMathjs.js";
export class AleaThalesConfig extends GraphicView {
    constructor() {
        super(-5, -5, 5, 5);
        this.classicConfig = undefined;
        this.AOB = false;
        this.OAB = false;
        this.new();
    }
    new() {
        this.geometric = [];
        let O, A, B;
        if (this.AOB) {
            [O, A, B] = this.addRectPoint(); // Trois points non alignés et formant un triangle OAB rectangle en O
        }
        else if (this.OAB) {
            [A, O, B] = this.addRectPoint(); // Trois points non alignés et formant un triangle OAB rectangle en A
        }
        else {
            [O, A, B] = this.addNotAlignedPoint(); // Trois points non alignés
        }
        // M est un point de (OA)
        const M = this.addPointAligned(O, A)[2]; // C'est le troisième point de la sortie addPointAligned
        // On ajoute les droites (OB) et (AB) pour ne pas gêner le point M
        const dOB = this.addLine(O, B);
        const dAB = this.addLine(A, B);
        // Exemple d'un vecteur créé à partir de deux points
        const vO = new Vector(O.x, O.y);
        const vA = new Vector(A.x, A.y);
        const vM = new Vector(M.x, M.y);
        const vOA = vA.sub(vO);
        const vOM = vM.sub(vO);
        // On remplace le point M par son symétrique par rapport à O si besoin
        if (this.classicConfig !== undefined && ((this.classicConfig && vOA.dot(vOM) < 0) || (!this.classicConfig && vOA.dot(vOM) > 0))) {
            Object.assign(M, this.addHomothetic(O, -1, M)[0]);
        }
        else if (this.classicConfig === undefined) {
            this.classicConfig = this.classicConfig && vOA.dot(vOM) > 0 ? true : false;
        }
        this.k = (vOA.dot(vOM) < 0 ? -1 : 1) * this.distance(O, M) / this.distance(O, A);
        // On crée une parallèle à (AB)
        const dMN = this.addParallelLine(M, dAB)[1]; // C'est la seconde parallèle de addParalleleLine
        // On ajoute le point d'intersection de (OA) et (MN)
        const [N] = this.addIntersectLine(dMN, dOB); // C'est un tableau pour prévoir l'intersection de cercles par exemple
        // On commence par nommer les points et les droites
        const aleaNames = aleaName(5); // Nommage aléatoire des points
        // const aleaNames = ['O', 'A', 'B', 'M', 'N'] // Pour le debuggage
        const points = [O, A, B, M, N];
        points.forEach((x, i) => { x.name = aleaNames[i]; });
        // On nomme les droites à partir des noms des points
        dAB.name = A.name + B.name; // L'ordre des lettres est conservé
        dMN.aleaName(M, N); // L'ordre des lettres est aléatoirisé
        this.geometric = [O, A, B, M, N];
    }
    /**
     * Set dimensions
     * @example
     * this.setDimensions(0.5) - > rectangle half height from the setting xmin, ymin and xmax
     * this.setDimensions(7,5) - > rectangle width=7 and height=5
     * this.setdimensions(0,0,7,6) - > xmin, ymin, xmax, ymax
     * @param args
     */
    setDimensions(...args) {
        switch (args.length) {
            case 1: {
                this.ratio = args[0];
                this.ymax = this.xmax * this.ratio;
                this.width = this.xmax - this.xmin;
                this.height = this.ymax - this.ymin;
                break;
            }
            case 2:
            case 3: {
                this.width = args[0];
                this.height = args[1];
                this.xmin = 0;
                this.ymin = 0;
                this.xmax = this.width;
                this.ymax = this.height;
                this.ratio = this.height / this.width;
                break;
            }
            case 4: {
                this.xmin = args[0];
                this.ymin = args[1];
                this.xmax = args[2];
                this.ymax = args[3];
                this.width = this.xmax - this.xmin;
                this.height = this.ymax - this.ymin;
                this.ratio = this.height / this.width;
                break;
            }
        }
    }
}
