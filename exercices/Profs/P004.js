import Exercice from '../ClasseExercice.js';
import {randint,troncature,calcul,choisit_lettres_differentes} from "/modules/outils.js"
import {point,segment,droiteGraduee2,mathalea2d,} from "/modules/2d.js"

/**
 * Fonction permettant aux enseignants de proposer des feuilles à compléter pour la lecture d'abscisse décimale avec zoom
 * L'enseignant peut ajouter "à la main" les données qu'il souhaite
 * ref P004
 * @Auteur Jean-Claude Lhote
 */
export default function Feuille_de_zooms() {
  Exercice.call(this);
  this.nb_cols = 1;
  this.sup = 1;
  this.titre = "Droites graduées avec zoom";

  this.nouvelle_version = function () {
    this.contenu = "";
    let d1, d2, d3, texte = "", extremite, extreme, noms = [],xmin,origine,xmax;
    let x1 = 0, x2 = 0, x3 = 0, objets = [], fenetre, thickOff = 0,pA1,pA2,pB2,pB1,sA,sB;
    for (let n = 0; n < 8 / parseInt(this.sup); n++) {
      noms = choisit_lettres_differentes(5, 'QFN');
      objets.length = 0;
      if (this.sup == 1) {
        xmin = randint(5, 10) - 0.2;
        origine = Math.round(xmin + 0.2);
        extreme = calcul(origine + 9);
        thickOff = 0.1;
        xmax = origine + 9.2;

        x1 = calcul(xmin + 0.2 + randint(1, 5) + randint(2, 8) / 10);
        extremite = `->`;

        d1 = droiteGraduee2({
          x: 0, y: 3, Min: xmin, axePosition: 'H', Max: xmax + 0.2, thickSec: true, thickTer: false, Unite: 3, thickOffset: thickOff,
          thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 4, labelsPrincipaux: false,
          //labelListe: [[origine, `${tex_nombre(origine)}`], [extreme, `${tex_nombre(extreme)}`]],
          pointListe: [[x1, `${noms[1]}`], [Math.floor(x1), `${noms[0]}`], [Math.floor(x1 + 1), `${noms[2]}`]],
          pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
        });
        d2 = droiteGraduee2({
          x: Math.floor(x1) - xmin + 1.5, y: 0, Min: Math.floor(x1), axePosition: 'H', Max: Math.floor(x1 + 1), thickSec: true, thickTer: false, Unite: 20, thickOffset: thickOff,
          thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 4, labelsPrincipaux: false,
          pointListe: [[x1, `${noms[1]}`], [Math.floor(x1), `${noms[0]}`], [Math.floor(x1 + 1), `${noms[2]}`]],
          pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
        });

        pA1 = point((Math.floor(x1) - xmin) * 3, 3);
        pA2 = point(Math.floor(x1) - xmin + 1.5, 0);
        pB1 = point((Math.floor(x1) + 1 - xmin) * 3, 3);
        pB2 = point(Math.floor(x1) - xmin + 21.5, 0);
        sA = segment(pA1, pA2);
        sB = segment(pB1, pB2);
        sA.pointilles = true;
        sB.pointilles = true;
        objets.push(d1, d2, sA, sB);
        fenetre = { xmin: -1.5, xmax: 35, ymin: -1, ymax: 4.5, pixelsParCm: 25, scale: 0.5 };
      }
      else {
        xmin = randint(1, 15);
        xmax = xmin + 1;
        x1 = calcul(xmin + randint(2, 8) / 10 + randint(2, 8) / 100 + randint(2, 8) * 0.001);
        x2 = troncature(x1, 1);
        x21 = troncature(x1, 2);
        x3 = calcul(x2 + 0.1);
        x31 = calcul(x21 + 0.01);
        xmin = Math.floor(x2);
        xmax = xmin + 1;
        thickOff = 0.001;

        extremite = `->`;
        d1 = droiteGraduee2({
          x: 0, y: 6, Min: xmin, axePosition: 'H', Max: xmax, thickSec: true, thickTer: true, Unite: 30, thickDistance: 1, thickSecDist: 0.1, thickTerDist: 0.01, thickOffset: thickOff,
          thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 6, labelsPrincipaux: false,
          pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`]],
          pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 3, axeStyle: extremite
        });
        d2 = droiteGraduee2({
          x: 6.5, y: 3, Min: x2, axePosition: 'H', Max: x3, thickSec: true, thickTer: true, Unite: 200, thickSecDist: 0.01, thickTerDist: 0.001, thickDistance: 0.1, thickOffset: thickOff,
          thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 6, labelsPrincipaux: false,
          pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
          pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
        });
        d3 = droiteGraduee2({
          x: 6.5, y: 0, Min: x21, axePosition: 'H', Max: x31, thickSec: true, thickTer: false, Unite: 2000, thickSecDist: 0.001, thickOffset: thickOff,
          thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 6, labelsPrincipaux: false,
          pointListe: [[x1, `${noms[1]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
          pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
        });

        pA1 = point((x2 - xmin) * 30, 6);
        pA2 = point(6.5, 3);
        pB1 = point((x3 - xmin) * 30, 6);
        pB2 = point(26.5, 3);
        sA = segment(pA1, pA2);
        sB = segment(pB1, pB2);
        sA.pointilles = true;
        sB.pointilles = true;
        pC1 = point(6.5 + (x21 - x2) * 200, 3);
        pC2 = point(6.5, 0);
        pD1 = point(6.5 + (x31 - x2) * 200, 3);
        pD2 = point(26.5, 0);
        sC = segment(pC1, pC2);
        sD = segment(pD1, pD2);
        sC.pointilles = true;
        sD.pointilles = true;
        fenetre = { xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 7.5, pixelsParCm: 25, scale: 0.5 };
        objets.push(d1, d2, d3, sA, sB, sC, sD);

        let partent = Math.floor(x1);

      }
      texte = mathalea2d(fenetre, objets);

      this.contenu += texte;
      this.contenu += '<br>';
    }
  };
  this.besoin_formulaire_numerique = ['Nombre de zoom', 2, '1 : Un seul zoom\n2 : Deux niveaux de zoom'];

}
