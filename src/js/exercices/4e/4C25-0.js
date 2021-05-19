import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {fractionSimplifiee,listeQuestionsToContenu,randint,choice,combinaisonListesSansChangerOrdre,calcul,prenomF,prenomM,prenom,texteEnCouleurEtGras} from '../../modules/outils.js'
const Algebrite = require('algebrite')

//import {fraction,ListeFraction} from '../../modules/Fractions.js'

export const titre = 'Problèmes additifs et de comparaison sur les rationnels'

/**
 * Problèmes additifs et de comparaion sur les rationnels
 * 4C25-0
 * Mise à jour le 2021-01-30
 * @author Sébastien Lozano
 */
export default function Problemes_additifs_fractions() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nbQuestions = 5;
  } else {
    this.nbQuestions = 2;
  }
  this.titre = titre;
  this.consigne = `Justifier vos réponses aux problèmes suivants.`;

  this.nbCols = 1;
  this.nbColsCorr = 1;
  //this.nbQuestionsModifiable = false;
  context.isHtml ? (this.spacing = 2) : (this.spacing = 1.5);
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 1.15);

  let typesDeQuestionsDisponibles;

  /**
 * @class ListeFraction
 * @classdesc Classe Fraction - Méthodes utiles sur les collections de fractions
 * @author Sébastien Lozano
 */

function ListeFraction() {
  //'use strict'; pas de use strict avec un paramètre du reste
  /**
   * @constant {array} denominateurs_amis tableau de tableaux de dénominateurs qui vont bien ensemble pour les calculs
   * le tableau [12,2,3,4,6] faisait planter 4C25-0
   */
  //let denominateurs_amis = [[12,2,3,4,6],[16,2,4,8],[18,2,3,6,9],[20,2,4,5,10],[24,2,3,4,8,12],[30,2,3,5,6],[32,2,16,4,8],[36,2,18,4,9],[40,2,20,4,10,5,8]]
  let denominateurs_amis = [[16,2,4,8],[18,2,3,6,9],[20,2,4,5,10],[24,2,3,4,8,12],[30,2,3,5,6],[32,2,16,4,8],[36,2,18,4,9],[40,2,20,4,10,5,8]]

 /**
  * 
  * @param  {...any} fractions contient la liste des numérateurs et denominateurs dans l'ordre n1,d1,n2,d2, ... de deux ou plus de fractions
  * @return {array} renvoie un tableau avec les numérateurs et les dénominateurs triés selon la croissance des quotients [n_frac_min,d_frac_min,...,n_frac_max,d_frac_max]
  * @example sortFraction(1,2,1,5,1,4,1,3) renvoie [1,5,1,4,1,3,1,2] 
  */
 let sortFractions=function(...fractions) {
     try {		
         fractions.forEach(function(element) {
             if (typeof element != 'number') {
                 throw new TypeError(`${element} n'est pas un nombre !`);
             };
             if ( (fractions.indexOf(element)%2 == 1) && (element == 0)) {
                 throw new RangeError(`${element} est exclu des valeurs possibles pour les dénominateurs !`)
             };
         });	
         if (Math.floor(fractions.length/2) <= 1 ) {
             throw new Error(`Il faut au moins deux fractions !`);
         };
         if (fractions.length%2 != 0) {
             throw new Error(`Il faut un nombre pair de valeurs puisque q'une fraction est représentée par son numérateur et son dénominateur`);
         };
         let changed;
         do{
              changed = false;
              for (let i=0; i<(fractions.length-1); i+=2) {
                 if ((fractions[i]/fractions[i+1]) > (fractions[i+2]/fractions[i+3])) {
                     let tmp = [fractions[i],fractions[i+1]];
                     fractions[i]=fractions[i+2];
                     fractions[i+1] = fractions[i+3];
                     fractions[i+2] = tmp [0];
                     fractions[i+3] = tmp[1];
                     changed = true;
                 };
              };
         } while(changed);
         return fractions;
     }
     catch (e) {
         console.log(e.message);
     };
 };

 /**
  * fonction locale pour trouver le ppcm d'un nombre indeterminé d'entiers
  * @param  {integer} n parametre du reste contenant une liste d'entiers
  * * la liste d'entiers doit être passé dans un tableau
  * @return {number} renvoie le ppcm des nombres entiers passés dans le paramètre du reste n
  * @example ppcm(2,6,4,15) renvoie 60
  */
 function ppcm([...n]) {
     try {
          n.forEach(function(element) {
             if (typeof element != 'number') {
                 throw new TypeError(`${element} n'est pas un nombre !`);
             };
         });
         // Quoi faire sans nombres ?
         if (n.length == 0) {
             throw new Error(`C'est mieux avec quelques nombres !`)
         };
         return parseInt(Algebrite.run(`lcm(${n})`));

     }
     catch (e) {
         console.log(e.message);
     };
 };

 /**
  * 
  * @param  {...any} fractions contient la liste des numérateurs et des dénominateurs dans l'ordre n1,d1,n2,d2, ... de deux ou plus de fractions
  * @return {array} renvoie un tableau de numérateurs et de dénominateurs avec le même dénominateur dans l'ordre initial.
  * * Le dénominateur choisi est toujours le ppcm
  * * Les fractions ne sont pas réduites
  * @example reduceSameDenominateur(1,2,1,5,2,3) renvoie [15,30,6,30,20,30]
  */
  function reduceSameDenominateur(...fractions) {
     try {		
      fractions.forEach(function(element) {
             if (typeof element != 'number') {
                 throw new TypeError(`${element} n'est pas un nombre !`);
             };
             if ( (fractions.indexOf(element)%2 == 1) && (element == 0)) {
                 throw new RangeError(`${element} est exclu des valeurs possibles pour les dénominateurs !`)
             };
         });	
         if (Math.floor(fractions.length/2) <= 1 ) {
             throw new Error(`Il faut au moins deux fractions !`);
         };
         if (fractions.length%2 != 0) {
             throw new Error(`Il faut un nombre pair de valeurs puisque q'une fraction est représentée par son numérateur et son dénominateur`);
         };
         let denominateur_commun;
         let liste_denominateurs = [];
         for (let i=0; i<fractions.length-1; i+=2) {
             liste_denominateurs.push(fractions[i+1]);
         };
         denominateur_commun = ppcm(liste_denominateurs);
         let fractions_reduites = [];
         for (let i=0; i<fractions.length-1; i+=2) {
             //on calcule le nouveau numérateur
             fractions_reduites.push(fractions[i]*denominateur_commun/fractions[i+1]);
             fractions_reduites.push(denominateur_commun);
         };

         //return [fractions,'-',liste_denominateurs,'-',denominateur_commun,'-',fractions_reduites];
         return fractions_reduites;

     }
     catch (e) {
         console.log(e.message);
     };
 };

 this.sortFractions = sortFractions;
 this.reduceSameDenominateur = reduceSameDenominateur;
 this.denominateurs_amis = denominateurs_amis;
 this.fractionSimplifiee = fractionSimplifiee;
};

  this.nouvelleVersion = function () {
    if (this.debug) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4, 5];
    } else {
      typesDeQuestionsDisponibles = [choice([1, 2]), choice([3, 4, 5])];
    }

    //let listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // on aura besoin des méthodes de la classe Fraction()
      let frac = new ListeFraction();
      // on récupère les dénominateurs qui vont bien
      //let denomsAmis = frac.denominateurs_amis;
      //C'est mieux avec ceux là, l'algo trouve plus rapidement une solution avec les contraintes à ajouter dans mathsalea_outils.js quand ça sera possible.
      let denomsAmis = [
        [40, 2, 20, 4, 10, 5, 8],
        [60, 2, 30, 3, 20, 4, 15, 5, 12, 6, 10],
        [80, 2, 40, 4, 20, 5, 16, 8, 10],
      ];
      // on aura besoin de ranger tout ça !
      let fracRangees, fracMemeDenomRangees;

      //======================================================
      //======== 		AVEC 3 FRACTIONS			  	========
      //======================================================

      // le tableau d'objets contenant tout le necesssaire, fractions, énoncé, question ... pour les problème avec 3 fractions
      let pb3f = [];
      // les numérateurs et dénominateurs des 3 fractions attention les deux premières doivent être inférieures à 1/2 si on veut qu'elles soient toutes positives !
      // et on veut des fractions distinctes !
      let nt1, nt2, nt3, dt1, dt2, dt3;
      let n1, n2, n3, d1, d2, d3;
      // on choisit un tableau de dénominateurs qui vont bien
      let denomsCool3 = denomsAmis[randint(0, denomsAmis.length - 1)];
      while (
        nt1 == nt2 ||
        nt1 == nt3 ||
        nt2 == nt3 ||
        nt1 / dt1 >= 1 / 2 ||
        nt2 / dt2 >= 1 / 2
      ) {
        n1 = randint(1, 6);
        d1 = choice(denomsCool3);
        n2 = randint(2, 10, [n1]); //on évite n1 pour pouvoir retrouver le texte de la plus grande fraction
        d2 = choice(denomsCool3, [d1]);
        n3 = d1 * d2 - n1 * d2 - n2 * d1; //la somme des trois vaut 1 !
        d3 = d1 * d2;

        nt1 = frac.fractionSimplifiee(n1, d1)[0];
        dt1 = frac.fractionSimplifiee(n1, d1)[1];
        nt2 = frac.fractionSimplifiee(n2, d2)[0];
        dt2 = frac.fractionSimplifiee(n2, d2)[1];
        nt3 = frac.fractionSimplifiee(n3, d3)[0];
        dt3 = frac.fractionSimplifiee(n3, d3)[1];
      }

      //======================================================
      //========= indice 0 le triathlon des neiges  ==========
      //======================================================
      pb3f.push({
        prenoms: [prenomM()],
        fractionsSimp: [
          nt1,
          dt1,
          "VTT",
          nt2,
          dt2,
          "ski de fond",
          nt3,
          dt3,
          "pied",
        ],
        fractionsB: {
          f1: [nt1, dt1],
          cat1: "VTT",
          f2: [nt2, dt2],
          cat2: "ski de fond",
          f3: [nt3, dt3],
          cat3: "pied",
        },
        enonce: ``,
        question: `Pour quelle discipline, la distance est-elle la plus grande ?`,
        correction: ``,
      });

      // les 3 prénomns doivent être distincts
      let p1, p2, p3; // les 3 prénoms
      while (p1 == p2 || p1 == p3 || p2 == p3) {
        p1 = prenomF();
        p2 = prenomF();
        p3 = prenomF();
      }

      //======================================================
      //=========== 		indice 1 Miss Math		 ===========
      //======================================================
      pb3f.push({
        prenoms: [],
        fractionsSimp: [nt1, dt1, p1, nt2, dt2, p2, nt3, dt3, p3],
        fractionsB: {
          f1: [nt1, dt1],
          cat1: p1,
          f2: [nt2, dt2],
          cat2: p2,
          f3: [nt3, dt3],
          cat3: p3,
        },
        enonce: ``,
        question: `Qui a été élue ?`,
        correction: ``,
      });
      let currentDate = new Date();
      let currentAnnee = currentDate.getFullYear();

      //======================================================
      //====== énoncé indice 0 le triathlon des neiges  ======
      //======================================================
      pb3f[0].enonce += `Le triathlon des neiges de la vallée des loups comprend trois épreuves qui s'enchaînent : VTT, ski de fond et course à pied.`;
      pb3f[0].enonce += `<br>${pb3f[0].prenoms[0]}, un passionné de cette épreuve, s'entraîne régulièrement sur le même circuit. `;
      pb3f[0].enonce += `<br>À chaque entraînement, il parcourt le circuit de la façon suivante : $\\dfrac{${pb3f[0].fractionsB.f1[0]}}{${pb3f[0].fractionsB.f1[1]}}$ à ${pb3f[0].fractionsB.cat1}, `;
      pb3f[0].enonce += `$\\dfrac{${pb3f[0].fractionsB.f2[0]}}{${pb3f[0].fractionsB.f2[1]}}$ à ${pb3f[0].fractionsB.cat2} et le reste à ${pb3f[0].fractionsB.cat3}.`;

      //======================================================
      //=========== énoncé indice 1 Miss Math		 ===========
      //======================================================
      pb3f[1].enonce = `À l'élection de Miss Math ${currentAnnee}, ${pb3f[1].fractionsB.cat1} a remporté $\\dfrac{${pb3f[1].fractionsB.f1[0]}}{${pb3f[1].fractionsB.f1[1]}}$ des suffrages, `;
      pb3f[1].enonce += `${pb3f[1].fractionsB.cat2} $\\dfrac{${pb3f[1].fractionsB.f2[0]}}{${pb3f[1].fractionsB.f2[1]}}$ et `;
      pb3f[1].enonce += `${pb3f[1].fractionsB.cat3} tous les autres.`;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      let fracMemeDenom;
      for (let i = 0; i < 2; i++) {
        pb3f[
          i
        ].correction = `Il s'agit d'un problème additif. Il va être necessaire de réduire les fractions au même dénominateur pour les additionner, les soustraire ou les comparer.<br>`;

        if (!(dt1 == dt2)) {
          pb3f[
            i
          ].correction += `Réduisons les fractions de l'énoncé au même dénominateur :  `;
          fracMemeDenom = frac.reduceSameDenominateur(
            pb3f[i].fractionsB.f1[0],
            pb3f[i].fractionsB.f1[1],
            pb3f[i].fractionsB.f2[0],
            pb3f[i].fractionsB.f2[1],
            pb3f[i].fractionsB.f3[0],
            pb3f[i].fractionsB.f3[1]
          );
          if (fracMemeDenom[1] == dt1) {
            pb3f[
              i
            ].correction += `$\\dfrac{${pb3f[i].fractionsB.f1[0]}}{${pb3f[i].fractionsB.f1[1]}}$ et `;
            pb3f[
              i
            ].correction += `$\\dfrac{${pb3f[i].fractionsB.f2[0]}}{${pb3f[i].fractionsB.f2[1]}} = \\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}$.<br>`;
          } else if (fracMemeDenom[1] == dt2) {
            pb3f[
              i
            ].correction += `$\\dfrac{${pb3f[i].fractionsB.f1[0]}}{${pb3f[i].fractionsB.f1[1]}} = \\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}$ et `;
            pb3f[
              i
            ].correction += `$\\dfrac{${pb3f[i].fractionsB.f2[0]}}{${pb3f[i].fractionsB.f2[1]}}$<br>`;
          } else {
            pb3f[
              i
            ].correction += `$\\dfrac{${pb3f[i].fractionsB.f1[0]}}{${pb3f[i].fractionsB.f1[1]}} = \\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}$ et `;
            pb3f[
              i
            ].correction += `$\\dfrac{${pb3f[i].fractionsB.f2[0]}}{${pb3f[i].fractionsB.f2[1]}} = \\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}$.<br>`;
          }
        } else {
          fracMemeDenom = frac.reduceSameDenominateur(
            pb3f[i].fractionsB.f1[0],
            pb3f[i].fractionsB.f1[1],
            pb3f[i].fractionsB.f2[0],
            pb3f[i].fractionsB.f2[1],
            pb3f[i].fractionsB.f3[0],
            pb3f[i].fractionsB.f3[1]
          );
          pb3f[
            i
          ].correction += `Les fractions de l'énoncé ont déjà le même dénominateur.`;
        }
      }

      //======================================================
      //==== Correction indice 0 le triathlon des neiges  ====
      //======================================================
      pb3f[0].correction += `Calculons alors la distance à `;

      //======================================================
      //======== 		Correction indice 1 Miss Math  	========
      //======================================================
      pb3f[1].correction += `Calculons d'abord la fraction des suffrages remportés par `;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      for (let i = 0; i < 2; i++) {
        pb3f[i].correction += `${pb3f[i].fractionsB.cat3} : <br>`;
        pb3f[
          i
        ].correction += `$1-\\dfrac{${pb3f[i].fractionsB.f1[0]}}{${pb3f[i].fractionsB.f1[1]}}-\\dfrac{${pb3f[i].fractionsB.f2[0]}}{${pb3f[i].fractionsB.f2[1]}} = `;
        pb3f[
          i
        ].correction += `\\dfrac{${fracMemeDenom[1]}}{${fracMemeDenom[1]}}-\\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}-\\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}} = `;
        pb3f[
          i
        ].correction += `\\dfrac{${fracMemeDenom[1]}-${fracMemeDenom[0]}-${fracMemeDenom[2]}}{${fracMemeDenom[3]}} = `;
        pb3f[i].correction += `\\dfrac{${fracMemeDenom[1] - fracMemeDenom[0] - fracMemeDenom[2]
          }}{${fracMemeDenom[1]}}`;
        if (!(fracMemeDenom[1] == pb3f[0].fractionsB.f3[1])) {
          pb3f[
            i
          ].correction += ` = \\dfrac{${pb3f[i].fractionsB.f3[0]}}{${pb3f[i].fractionsB.f3[1]}}$`;
        } else {
          pb3f[i].correction += `$`;
        }
      }

      //======================================================
      //==== Conclusion indice 0 le triathlon des neiges  ====
      //======================================================
      pb3f[0].correction += `<br>${pb3f[0].prenoms[0]} fait donc $\\dfrac{${pb3f[0].fractionsB.f1[0]}}{${pb3f[0].fractionsB.f1[1]}}$ à ${pb3f[0].fractionsB.cat1}, `;
      pb3f[0].correction += `$\\dfrac{${pb3f[0].fractionsB.f2[0]}}{${pb3f[0].fractionsB.f2[1]}}$ à ${pb3f[0].fractionsB.cat2} et `;
      pb3f[0].correction += `$\\dfrac{${pb3f[0].fractionsB.f3[0]}}{${pb3f[0].fractionsB.f3[1]}}$ à ${pb3f[0].fractionsB.cat3}.`;

      pb3f[0].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb3f[0].correction += `${pb3f[0].prenoms[0]} fait donc $\\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}$ à ${pb3f[0].fractionsB.cat1}, `;
      pb3f[0].correction += `$\\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}$ à ${pb3f[0].fractionsB.cat2} et `;
      pb3f[0].correction += `$\\dfrac{${fracMemeDenom[4]}}{${fracMemeDenom[5]}}$ à ${pb3f[0].fractionsB.cat3}.`;

      //let fracRangees,fracMemeDenomRangees;
      if (
        calcul(nt1 / dt1) == calcul(nt2 / dt2) &&
        calcul(nt1 / dt1) == calcul(nt3 / dt3)
      ) {
        pb3f[0].correction += `<br> ${texteEnCouleurEtGras(
          `Les trois fractions sont équivalentes, ${pb3f[0].prenoms[0]} parcours donc la même distance dans les trois disciplines.`
        )}`;
      } else {
        fracMemeDenomRangees = frac.sortFractions(
          fracMemeDenom[0],
          fracMemeDenom[1],
          fracMemeDenom[2],
          fracMemeDenom[3],
          fracMemeDenom[4],
          fracMemeDenom[5]
        );
        pb3f[0].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${fracMemeDenomRangees[0]}}{${fracMemeDenomRangees[1]}}$, $\\dfrac{${fracMemeDenomRangees[2]}}{${fracMemeDenomRangees[3]}}$, $\\dfrac{${fracMemeDenomRangees[4]}}{${fracMemeDenomRangees[5]}}$.`;

        fracRangees = frac.sortFractions(
          pb3f[0].fractionsB.f1[0],
          pb3f[0].fractionsB.f1[1],
          pb3f[0].fractionsB.f2[0],
          pb3f[0].fractionsB.f2[1],
          pb3f[0].fractionsB.f3[0],
          pb3f[0].fractionsB.f3[1]
        );

        pb3f[0].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${fracRangees[0]}}{${fracRangees[1]}}$, $\\dfrac{${fracRangees[2]}}{${fracRangees[3]}}$, $\\dfrac{${fracRangees[4]}}{${fracRangees[5]}}$.`;

        pb3f[0].correction += `<br> ${texteEnCouleurEtGras(
          `C'est donc à ${pb3f[0].fractionsSimp[
          pb3f[0].fractionsSimp.indexOf(fracRangees[4]) + 2
          ]
          } que ${pb3f[0].prenoms[0]} fait la plus grande distance.`
        )}`;
      }

      //======================================================
      //======== 		Conclusion indice 1 Miss Math  	========
      //======================================================
      pb3f[1].correction += `<br>${pb3f[1].fractionsB.cat1} a donc remporté $\\dfrac{${pb3f[1].fractionsB.f1[0]}}{${pb3f[1].fractionsB.f1[1]}}$, `;
      pb3f[1].correction += `${pb3f[1].fractionsB.cat2} a remporté $\\dfrac{${pb3f[1].fractionsB.f2[0]}}{${pb3f[1].fractionsB.f2[1]}}$ et `;
      pb3f[1].correction += `${pb3f[1].fractionsB.cat3} $\\dfrac{${pb3f[1].fractionsB.f3[0]}}{${pb3f[1].fractionsB.f3[1]}}$.`;

      pb3f[1].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb3f[1].correction += `${pb3f[1].fractionsB.cat1} remporte donc $\\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}$, `;
      pb3f[1].correction += `${pb3f[1].fractionsB.cat2} $\\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}$ et `;
      pb3f[1].correction += `${pb3f[1].fractionsB.cat3} $\\dfrac{${fracMemeDenom[4]}}{${fracMemeDenom[5]}}$.`;

      if (
        calcul(nt1 / dt1) == calcul(nt2 / dt2) &&
        calcul(nt1 / dt1) == calcul(nt3 / dt3)
      ) {
        pb3f[1].correction += `<br> ${texteEnCouleurEtGras(
          `Les trois fractions sont équivalentes, les trois candidates ont donc remporté le même nombre de suffrages.`
        )}`;
      } else {
        fracMemeDenomRangees = frac.sortFractions(
          fracMemeDenom[0],
          fracMemeDenom[1],
          fracMemeDenom[2],
          fracMemeDenom[3],
          fracMemeDenom[4],
          fracMemeDenom[5]
        );
        pb3f[1].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${fracMemeDenomRangees[0]}}{${fracMemeDenomRangees[1]}}$, $\\dfrac{${fracMemeDenomRangees[2]}}{${fracMemeDenomRangees[3]}}$, $\\dfrac{${fracMemeDenomRangees[4]}}{${fracMemeDenomRangees[5]}}$.`;

        fracRangees = frac.sortFractions(
          pb3f[1].fractionsB.f1[0],
          pb3f[1].fractionsB.f1[1],
          pb3f[1].fractionsB.f2[0],
          pb3f[1].fractionsB.f2[1],
          pb3f[1].fractionsB.f3[0],
          pb3f[1].fractionsB.f3[1]
        );

        pb3f[1].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${fracRangees[0]}}{${fracRangees[1]}}$, $\\dfrac{${fracRangees[2]}}{${fracRangees[3]}}$, $\\dfrac{${fracRangees[4]}}{${fracRangees[5]}}$.`;

        pb3f[1].correction += `<br> ${texteEnCouleurEtGras(
          `C'est donc ${pb3f[1].fractionsSimp[
          pb3f[1].fractionsSimp.indexOf(fracRangees[4]) + 2
          ]
          } qui a été élue.`
        )}`;
      }

      //======================================================
      //======== 		AVEC 4 FRACTIONS			  	========
      //======================================================

      // le tableau d'objets contenant tout le necesssaire, fractions, énoncé, question ... pour les problème avec 4 fractions
      let pb4f = [];
      // les numérateurs et dénominateurs des 4 fractions attention les trois premières doivent être inférieures à 1/3 si on veut qu'elles soient toutes positives !
      // et on veut des fractions distinctes
      let nq1, nq2, nq3, nq4, dq1, dq2, dq3, dq4;
      let n4, d4; // en plus parce qu'il y a 4 fractions
      // on choisit un tableau de dénominateurs qui vont bien
      let denomsCool4 = denomsAmis[randint(2, denomsAmis.length - 1)];
      while (
        nq1 == nq2 ||
        nq1 == nq3 ||
        nq1 == nq4 ||
        nq2 == nq3 ||
        nq2 == nq4 ||
        nq3 == nq4 ||
        nq1 / dq1 >= 1 / 3 ||
        nq2 / dq2 >= 1 / 3 ||
        nq3 / dq3 >= 1 / 3
      ) {
        n1 = randint(1, 5);
        d1 = choice(denomsCool4);
        n2 = randint(1, 11, [n1]); //on évite n1 pour pouvoir retrouver le texte de la plus grande fraction
        d2 = choice(denomsCool4);
        n3 = randint(1, 17, [n1, n2]); //on évite n1 et n2 pour pouvoir retrouver le texte de la plus grande fraction
        d3 = choice(denomsCool4);
        n4 = d1 * d2 * d3 - n1 * d2 * d3 - n2 * d1 * d3 - n3 * d1 * d2; //la somme des quatre vaut 1 !
        d4 = d1 * d2 * d3;

        nq1 = frac.fractionSimplifiee(n1, d1)[0];
        dq1 = frac.fractionSimplifiee(n1, d1)[1];
        nq2 = frac.fractionSimplifiee(n2, d2)[0];
        dq2 = frac.fractionSimplifiee(n2, d2)[1];
        nq3 = frac.fractionSimplifiee(n3, d3)[0];
        dq3 = frac.fractionSimplifiee(n3, d3)[1];
        nq4 = frac.fractionSimplifiee(n4, d4)[0];
        dq4 = frac.fractionSimplifiee(n4, d4)[1];
      }

      //======================================================
      //=========== 		indice 0 le mandala		 ===========
      //======================================================
      pb4f.push({
        //
        prenoms: [prenom()],
        fractionsSimp: [
          nq1,
          dq1,
          "carmin",
          nq2,
          dq2,
          "ocre jaune",
          nq3,
          dq3,
          "turquoise",
          nq4,
          dq4,
          "pourpre",
        ],
        fractionsB: {
          f1: [nq1, dq1],
          cat1: "carmin",
          f2: [nq2, dq2],
          cat2: "ocre jaune",
          f3: [nq3, dq3],
          cat3: "turquoise",
          f4: [nq4, dq4],
          cat4: "pourpre",
        },
        enonce: ``,
        question: `Quelle est elle la couleur qui recouvre le plus de surface ?`,
        correction: ``,
      });

      //======================================================
      //===========		indice 1 le jardin	 	 ===========
      //======================================================
      pb4f.push({
        // indice 1 le jardin
        prenoms: [],
        fractionsSimp: [
          nq1,
          dq1,
          "la culture des légumes",
          nq2,
          dq2,
          "la culture des plantes aromatiques",
          nq3,
          dq3,
          "une serre servant aux semis",
          nq4,
          dq4,
          "la culture des fraisiers",
        ],
        fractionsB: {
          f1: [nq1, dq1],
          cat1: "la culture des légumes",
          f2: [nq2, dq2],
          cat2: "la culture des plantes aromatiques",
          f3: [nq3, dq3],
          cat3: "une serre servant aux semis",
          f4: [nq4, dq4],
          cat4: "la culture des fraisiers",
        },
        enonce: ``,
        question: `Quelle est la culture qui occupe le plus de surface ?`,
        correction: ``,
      });

      //======================================================
      //===========	indice 2 le stade		 	 ===========
      //======================================================
      pb4f.push({
        // indice 2 le stade
        prenoms: [],
        fractionsSimp: [
          nq1,
          dq1,
          "le pays organisateur",
          nq2,
          dq2,
          "l'ensemble des supporters des deux équipes en jeu",
          nq3,
          dq3,
          "les sponsors et officiels",
          nq4,
          dq4,
          "les places en vente libre",
        ],
        fractionsB: {
          f1: [nq1, dq1],
          cat1: "le pays organisateur",
          f2: [nq2, dq2],
          cat2: "l'ensemble des supporters des deux équipes en jeu",
          f3: [nq3, dq3],
          cat3: "les sponsors et officiels",
          f4: [nq4, dq4],
          cat4: "les places en vente libre",
        },
        enonce: ``,
        question: `Quelle est la catégorie la plus importante dans le stade ?`,
        correction: ``,
      });

      //======================================================
      //===========	énoncé indice 0 le mandala 	 ===========
      //======================================================
      pb4f[0].enonce = `${pb4f[0].prenoms[0]} colorie un mandala selon les proportions suivantes :  $\\dfrac{${pb4f[0].fractionsB.f1[0]}}{${pb4f[0].fractionsB.f1[1]}}$ en ${pb4f[0].fractionsB.cat1}, `;
      pb4f[0].enonce += `$\\dfrac{${pb4f[0].fractionsB.f2[0]}}{${pb4f[0].fractionsB.f2[1]}}$ en  ${pb4f[0].fractionsB.cat2}, `;
      pb4f[0].enonce += `$\\dfrac{${pb4f[0].fractionsB.f3[0]}}{${pb4f[0].fractionsB.f3[1]}}$ en  ${pb4f[0].fractionsB.cat3} et `;
      pb4f[0].enonce += `le reste en ${pb4f[0].fractionsB.cat4}.`;

      //======================================================
      //===========	énoncé indice 1 le jardin 	 ===========
      //======================================================
      pb4f[1].enonce = `Un jardin est aménagé selon les proportions suivantes :  $\\dfrac{${pb4f[1].fractionsB.f1[0]}}{${pb4f[1].fractionsB.f1[1]}}$ par ${pb4f[1].fractionsB.cat1}, `;
      pb4f[1].enonce += `$\\dfrac{${pb4f[1].fractionsB.f2[0]}}{${pb4f[1].fractionsB.f2[1]}}$ par  ${pb4f[1].fractionsB.cat2}, `;
      pb4f[1].enonce += `$\\dfrac{${pb4f[1].fractionsB.f3[0]}}{${pb4f[1].fractionsB.f3[1]}}$ par  ${pb4f[1].fractionsB.cat3} et `;
      pb4f[1].enonce += `le reste par ${pb4f[1].fractionsB.cat4}.`;

      //======================================================
      //===========	énoncé indice 2 le stade 	 ===========
      //======================================================
      pb4f[2].enonce = `Pour chaque match, les places du stade sont mises en vente dans les proportions suivantes :  $\\dfrac{${pb4f[2].fractionsB.f1[0]}}{${pb4f[2].fractionsB.f1[1]}}$ pour ${pb4f[2].fractionsB.cat1}, `;
      pb4f[2].enonce += `$\\dfrac{${pb4f[2].fractionsB.f2[0]}}{${pb4f[2].fractionsB.f2[1]}}$ pour  ${pb4f[2].fractionsB.cat2}, `;
      pb4f[2].enonce += `$\\dfrac{${pb4f[2].fractionsB.f3[0]}}{${pb4f[2].fractionsB.f3[1]}}$ pour  ${pb4f[2].fractionsB.cat3} et `;
      pb4f[2].enonce += `le reste pour ${pb4f[2].fractionsB.cat4}.`;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================

      //let fracMemeDenom;
      for (let i = 0; i < 3; i++) {
        pb4f[
          i
        ].correction = `Il s'agit d'un problème additif. Il va être necessaire de réduire les fractions au même dénominateur pour les additionner, les soustraire ou les comparer.<br>`;

        if (!(dq1 == dq2 && dq1 == dq3)) {
          //pb4f[i].correction += `${!(dq1 == dq2 && dq1 == dq3)} - ${dq1} - ${dq2} - ${dq3} - Réduisons les fractions de l'énoncé au même dénominateur :  `;
          pb4f[i].correction += `Réduisons les fractions de l'énoncé au même dénominateur :  `;
          fracMemeDenom = frac.reduceSameDenominateur(
            pb4f[i].fractionsB.f1[0],
            pb4f[i].fractionsB.f1[1],
            pb4f[i].fractionsB.f2[0],
            pb4f[i].fractionsB.f2[1],
            pb4f[i].fractionsB.f3[0],
            pb4f[i].fractionsB.f3[1],
            pb4f[i].fractionsB.f4[0],
            pb4f[i].fractionsB.f4[1]
          );
          if (fracMemeDenom[1] == dq1) {
            pb4f[
              i
            ].correction += `$\\dfrac{${pb4f[i].fractionsB.f1[0]}}{${pb4f[i].fractionsB.f1[1]}}$, `;
          } else {
            pb4f[
              i
            ].correction += `$\\dfrac{${pb4f[i].fractionsB.f1[0]}}{${pb4f[i].fractionsB.f1[1]}} = \\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}$, `;
          }
          if (fracMemeDenom[1] == dq2) {
            pb4f[
              i
            ].correction += `$\\dfrac{${pb4f[i].fractionsB.f2[0]}}{${pb4f[i].fractionsB.f2[1]}}$ et `;
          } else {
            pb4f[
              i
            ].correction += `$\\dfrac{${pb4f[i].fractionsB.f2[0]}}{${pb4f[i].fractionsB.f2[1]}} = \\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}$ et `;
          }
          if (fracMemeDenom[1] == dq3) {
            pb4f[
              i
            ].correction += `$\\dfrac{${pb4f[i].fractionsB.f3[0]}}{${pb4f[i].fractionsB.f3[1]}}$.<br>`;
          } else {
            pb4f[
              i
            ].correction += `$\\dfrac{${pb4f[i].fractionsB.f3[0]}}{${pb4f[i].fractionsB.f3[1]}} = \\dfrac{${fracMemeDenom[4]}}{${fracMemeDenom[5]}}$.<br>`;
          }
        } else {
          fracMemeDenom = frac.reduceSameDenominateur(
            pb4f[i].fractionsB.f1[0],
            pb4f[i].fractionsB.f1[1],
            pb4f[i].fractionsB.f2[0],
            pb4f[i].fractionsB.f2[1],
            pb4f[i].fractionsB.f3[0],
            pb4f[i].fractionsB.f3[1],
            pb4f[i].fractionsB.f4[0],
            pb4f[i].fractionsB.f4[1]
          );
          pb4f[
            i
          ].correction += `Les fractions de l'énoncé ont déjà le même dénominateur : `;
          pb4f[
            i
          ].correction += `$\\dfrac{${pb4f[i].fractionsB.f1[0]}}{${pb4f[i].fractionsB.f1[1]}}$, $\\dfrac{${pb4f[i].fractionsB.f2[0]}}{${pb4f[i].fractionsB.f2[1]}}$ et $\\dfrac{${pb4f[i].fractionsB.f3[0]}}{${pb4f[i].fractionsB.f3[1]}}$.<br>`;
        }
      }

      //======================================================
      //===========	Correction indice 0 le mandala==========
      //======================================================
      pb4f[0].correction += `Calculons alors la fraction du mandala recouverte en `;

      //======================================================
      //===========	Correction indice 1 le jardin===========
      //======================================================
      pb4f[1].correction += `Calculons d'abord la fraction du jardin occupée par `;

      //======================================================
      //===========	énoncé indice 2 le stade 	 ===========
      //======================================================
      pb4f[2].correction += `Calculons d'abord la fraction du stade occupée par `;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      for (let i = 0; i < 3; i++) {
        pb4f[i].correction += `${pb4f[i].fractionsB.cat3} : <br>`;
        pb4f[
          i
        ].correction += `$1-\\dfrac{${pb4f[i].fractionsB.f1[0]}}{${pb4f[i].fractionsB.f1[1]}}-\\dfrac{${pb4f[i].fractionsB.f2[0]}}{${pb4f[i].fractionsB.f2[1]}}-\\dfrac{${pb4f[i].fractionsB.f3[0]}}{${pb4f[i].fractionsB.f3[1]}} = `;
        pb4f[
          i
        ].correction += `\\dfrac{${fracMemeDenom[1]}}{${fracMemeDenom[1]}}-\\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}-\\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}-\\dfrac{${fracMemeDenom[4]}}{${fracMemeDenom[5]}} = `;
        pb4f[
          i
        ].correction += `\\dfrac{${fracMemeDenom[1]}-${fracMemeDenom[0]}-${fracMemeDenom[2]}-${fracMemeDenom[4]}}{${fracMemeDenom[1]}} = `;
        pb4f[i].correction += `\\dfrac{${fracMemeDenom[1] -
          fracMemeDenom[0] -
          fracMemeDenom[2] -
          fracMemeDenom[4]
          }}{${fracMemeDenom[1]}}`;
        if (!(fracMemeDenom[1] == pb4f[0].fractionsB.f4[1])) {
          pb4f[
            i
          ].correction += ` = \\dfrac{${pb4f[i].fractionsB.f4[0]}}{${pb4f[i].fractionsB.f4[1]}}$`;
        } else {
          pb4f[i].correction += `$`;
        }
      }

      //======================================================
      //=========== Conclusion indice 0 le mandala ===========
      //======================================================

      pb4f[0].correction += `<br>Le mandala est donc colorié de la façon suivante : $\\dfrac{${pb4f[0].fractionsB.f1[0]}}{${pb4f[0].fractionsB.f1[1]}}$ en ${pb4f[0].fractionsB.cat1}, `;
      pb4f[0].correction += `$\\dfrac{${pb4f[0].fractionsB.f2[0]}}{${pb4f[0].fractionsB.f2[1]}}$ en ${pb4f[0].fractionsB.cat2}, `;
      pb4f[0].correction += `$\\dfrac{${pb4f[0].fractionsB.f3[0]}}{${pb4f[0].fractionsB.f3[1]}}$ en ${pb4f[0].fractionsB.cat3} et `;
      pb4f[0].correction += `$\\dfrac{${pb4f[0].fractionsB.f4[0]}}{${pb4f[0].fractionsB.f4[1]}}$ en ${pb4f[0].fractionsB.cat4}.`;

      pb4f[0].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb4f[0].correction += `le mandala est donc colorié de la façon suivante : $\\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}$ en ${pb4f[0].fractionsB.cat1}, `;
      pb4f[0].correction += `$\\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}$ en ${pb4f[0].fractionsB.cat2}, `;
      pb4f[0].correction += `$\\dfrac{${fracMemeDenom[4]}}{${fracMemeDenom[5]}}$ en ${pb4f[0].fractionsB.cat3} et `;
      pb4f[0].correction += `$\\dfrac{${fracMemeDenom[6]}}{${fracMemeDenom[7]}}$ en ${pb4f[0].fractionsB.cat4}.`;

      //let fracRangees,fracMemeDenomRangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb4f[0].correction += `<br> ${texteEnCouleurEtGras(
          `Les quatre fractions sont équivalentes, ${pb4f[0].prenoms[0]} colorie donc la même surface avec les quatre couleurs.`
        )}`;
      } else {
        fracMemeDenomRangees = frac.sortFractions(
          fracMemeDenom[0],
          fracMemeDenom[1],
          fracMemeDenom[2],
          fracMemeDenom[3],
          fracMemeDenom[4],
          fracMemeDenom[5],
          fracMemeDenom[6],
          fracMemeDenom[7]
        );
        pb4f[0].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${fracMemeDenomRangees[0]}}{${fracMemeDenomRangees[1]}}$, $\\dfrac{${fracMemeDenomRangees[2]}}{${fracMemeDenomRangees[3]}}$, $\\dfrac{${fracMemeDenomRangees[4]}}{${fracMemeDenomRangees[5]}}$, $\\dfrac{${fracMemeDenomRangees[6]}}{${fracMemeDenomRangees[7]}}$.`;

        fracRangees = frac.sortFractions(
          pb4f[0].fractionsB.f1[0],
          pb4f[0].fractionsB.f1[1],
          pb4f[0].fractionsB.f2[0],
          pb4f[0].fractionsB.f2[1],
          pb4f[0].fractionsB.f3[0],
          pb4f[0].fractionsB.f3[1],
          pb4f[0].fractionsB.f4[0],
          pb4f[0].fractionsB.f4[1]
        );

        pb4f[0].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${fracRangees[0]}}{${fracRangees[1]}}$, $\\dfrac{${fracRangees[2]}}{${fracRangees[3]}}$, $\\dfrac{${fracRangees[4]}}{${fracRangees[5]}}$, $\\dfrac{${fracRangees[6]}}{${fracRangees[7]}}$.`;

        pb4f[0].correction += `<br> ${texteEnCouleurEtGras(
          `C'est donc en ${pb4f[0].fractionsSimp[
          pb4f[0].fractionsSimp.indexOf(fracRangees[6]) + 2
          ]
          } que le mandala est le plus recouvert.`
        )}`;
      }

      //======================================================
      //=========== Conclusion indice 1 le jardin	 ===========
      //======================================================
      pb4f[1].correction += `<br>Le jardin est donc occupé de la façon suivante : $\\dfrac{${pb4f[1].fractionsB.f1[0]}}{${pb4f[1].fractionsB.f1[1]}}$ par ${pb4f[1].fractionsB.cat1}, `;
      pb4f[1].correction += `$\\dfrac{${pb4f[1].fractionsB.f2[0]}}{${pb4f[1].fractionsB.f2[1]}}$ par ${pb4f[1].fractionsB.cat2}, `;
      pb4f[1].correction += `$\\dfrac{${pb4f[1].fractionsB.f3[0]}}{${pb4f[1].fractionsB.f3[1]}}$ par ${pb4f[1].fractionsB.cat3} et `;
      pb4f[1].correction += `$\\dfrac{${pb4f[1].fractionsB.f4[0]}}{${pb4f[1].fractionsB.f4[1]}}$ par ${pb4f[1].fractionsB.cat4}.`;

      pb4f[1].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb4f[1].correction += `le jardin est donc occupé de la façon suivante : $\\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}$ par ${pb4f[1].fractionsB.cat1}, `;
      pb4f[1].correction += `$\\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}$ par ${pb4f[1].fractionsB.cat2}, `;
      pb4f[1].correction += `$\\dfrac{${fracMemeDenom[4]}}{${fracMemeDenom[5]}}$ par ${pb4f[1].fractionsB.cat3} et `;
      pb4f[1].correction += `$\\dfrac{${fracMemeDenom[6]}}{${fracMemeDenom[7]}}$ par ${pb4f[1].fractionsB.cat4}.`;

      //let fracRangees,fracMemeDenomRangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb4f[1].correction += `<br> ${texteEnCouleurEtGras(
          `Les quatre fractions sont équivalentes, la même surface du jardin est donc occupée par les quatre cultures.`
        )}`;
      } else {
        fracMemeDenomRangees = frac.sortFractions(
          fracMemeDenom[0],
          fracMemeDenom[1],
          fracMemeDenom[2],
          fracMemeDenom[3],
          fracMemeDenom[4],
          fracMemeDenom[5],
          fracMemeDenom[6],
          fracMemeDenom[7]
        );
        pb4f[1].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${fracMemeDenomRangees[0]}}{${fracMemeDenomRangees[1]}}$, $\\dfrac{${fracMemeDenomRangees[2]}}{${fracMemeDenomRangees[3]}}$, $\\dfrac{${fracMemeDenomRangees[4]}}{${fracMemeDenomRangees[5]}}$, $\\dfrac{${fracMemeDenomRangees[6]}}{${fracMemeDenomRangees[7]}}$.`;

        fracRangees = frac.sortFractions(
          pb4f[1].fractionsB.f1[0],
          pb4f[1].fractionsB.f1[1],
          pb4f[1].fractionsB.f2[0],
          pb4f[1].fractionsB.f2[1],
          pb4f[1].fractionsB.f3[0],
          pb4f[1].fractionsB.f3[1],
          pb4f[1].fractionsB.f4[0],
          pb4f[1].fractionsB.f4[1]
        );

        pb4f[1].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${fracRangees[0]}}{${fracRangees[1]}}$, $\\dfrac{${fracRangees[2]}}{${fracRangees[3]}}$, $\\dfrac{${fracRangees[4]}}{${fracRangees[5]}}$, $\\dfrac{${fracRangees[6]}}{${fracRangees[7]}}$.`;

        pb4f[1].correction += `<br> ${texteEnCouleurEtGras(
          `C'est donc par ${pb4f[1].fractionsSimp[
          pb4f[1].fractionsSimp.indexOf(fracRangees[6]) + 2
          ]
          } que le jardin est le plus occupé.`
        )}`;
      }

      //======================================================
      //=========== Conclusion indice 2 le stade	 ===========
      //======================================================
      pb4f[2].correction += `<br>Le stade est donc occupé de la façon suivante : $\\dfrac{${pb4f[2].fractionsB.f1[0]}}{${pb4f[2].fractionsB.f1[1]}}$ pour ${pb4f[2].fractionsB.cat1}, `;
      pb4f[2].correction += `$\\dfrac{${pb4f[2].fractionsB.f2[0]}}{${pb4f[2].fractionsB.f2[1]}}$ pour ${pb4f[2].fractionsB.cat2}, `;
      pb4f[2].correction += `$\\dfrac{${pb4f[2].fractionsB.f3[0]}}{${pb4f[2].fractionsB.f3[1]}}$ pour ${pb4f[2].fractionsB.cat3} et `;
      pb4f[2].correction += `$\\dfrac{${pb4f[2].fractionsB.f4[0]}}{${pb4f[2].fractionsB.f4[1]}}$ pour ${pb4f[2].fractionsB.cat4}.`;

      pb4f[2].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb4f[2].correction += `le stade est donc occupé de la façon suivante : $\\dfrac{${fracMemeDenom[0]}}{${fracMemeDenom[1]}}$ pour ${pb4f[2].fractionsB.cat1}, `;
      pb4f[2].correction += `$\\dfrac{${fracMemeDenom[2]}}{${fracMemeDenom[3]}}$ pour ${pb4f[2].fractionsB.cat2}, `;
      pb4f[2].correction += `$\\dfrac{${fracMemeDenom[4]}}{${fracMemeDenom[5]}}$ pour ${pb4f[2].fractionsB.cat3} et `;
      pb4f[2].correction += `$\\dfrac{${fracMemeDenom[6]}}{${fracMemeDenom[7]}}$ pour ${pb4f[2].fractionsB.cat4}.`;

      //let fracRangees,fracMemeDenomRangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb4f[2].correction += `<br> ${texteEnCouleurEtGras(
          `Les quatre fractions sont équivalentes, chaque catégorie a donc la même importance dans le stade.`
        )}`;
      } else {
        fracMemeDenomRangees = frac.sortFractions(
          fracMemeDenom[0],
          fracMemeDenom[1],
          fracMemeDenom[2],
          fracMemeDenom[3],
          fracMemeDenom[4],
          fracMemeDenom[5],
          fracMemeDenom[6],
          fracMemeDenom[7]
        );
        pb4f[2].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${fracMemeDenomRangees[0]}}{${fracMemeDenomRangees[1]}}$, $\\dfrac{${fracMemeDenomRangees[2]}}{${fracMemeDenomRangees[3]}}$, $\\dfrac{${fracMemeDenomRangees[4]}}{${fracMemeDenomRangees[5]}}$, $\\dfrac{${fracMemeDenomRangees[6]}}{${fracMemeDenomRangees[7]}}$.`;

        fracRangees = frac.sortFractions(
          pb4f[2].fractionsB.f1[0],
          pb4f[2].fractionsB.f1[1],
          pb4f[2].fractionsB.f2[0],
          pb4f[2].fractionsB.f2[1],
          pb4f[2].fractionsB.f3[0],
          pb4f[2].fractionsB.f3[1],
          pb4f[2].fractionsB.f4[0],
          pb4f[2].fractionsB.f4[1]
        );

        pb4f[2].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${fracRangees[0]}}{${fracRangees[1]}}$, $\\dfrac{${fracRangees[2]}}{${fracRangees[3]}}$, $\\dfrac{${fracRangees[4]}}{${fracRangees[5]}}$, $\\dfrac{${fracRangees[6]}}{${fracRangees[7]}}$.`;

        pb4f[2].correction += `<br> ${texteEnCouleurEtGras(
          `C'est donc pour ${pb4f[2].fractionsSimp[
          pb4f[2].fractionsSimp.indexOf(fracRangees[6]) + 2
          ]
          } que le nombre de places est le plus important.`
        )}`;
      }

      switch (listeTypeDeQuestions[i]) {
        case 1: // Triathlon des neiges --> VTT, ski de fond, course
          texte = `${pb3f[0].enonce} <br> ${pb3f[0].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb3f[0].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${pb3f[0].correction}`;
          }
          break;
        case 2: //Miss Math --> Noémie, Samia, Alexia
          texte = `${pb3f[1].enonce} <br> ${pb3f[1].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb3f[1].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${pb3f[1].correction}`;
          }
          break;
        case 3: // Mandala --> carmin, ocre jaune, turquoise, pourpre
          texte = `${pb4f[0].enonce} <br> ${pb4f[0].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb4f[0].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${pb4f[0].correction}`;
          }
          break;
        case 4: // Jardin --> légumes, plantes aromatiques, semis, fraisiers
          texte = `${pb4f[1].enonce} <br> ${pb4f[1].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb4f[1].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${pb4f[1].correction}`;
          }
          break;
        case 5: // Stade --> pays organisatuers, supporters, sponsors, vente libre
          texte = `${pb4f[2].enonce} <br> ${pb4f[2].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb4f[2].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${pb4f[2].correction}`;
          }
          break;
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',4,"1 : nombre enier positif\n2 : nombre décimal positif\n3 : nombre enier positif inférieur à un\n4 : Mélange"];
}

