import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes_sans_changer_ordre,calcul,prenomF,prenomM,prenom,texte_en_couleur_et_gras} from "/modules/outils.js"
import {fraction,listeFractions,ListeFraction} from "/modules/Fractions.js"
/**
 * Problèmes additifs et de comparaion sur les rationnels
 * 4C25-0
 * @author Sébastien Lozano
 */
export default function Problemes_additifs_fractions() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.debug = false;
  this.sup = 1;
  if (this.debug) {
    this.nb_questions = 5;
  } else {
    this.nb_questions = 2;
  }
  this.titre = "Problèmes additifs et de comparaison sur les rationnels";
  this.consigne = `Justifier vos réponses aux problèmes suivants.`;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? (this.spacing = 2) : (this.spacing = 1.5);
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 1.15);

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    if (this.debug) {
      type_de_questions_disponibles = [1, 2, 3, 4, 5];
    } else {
      type_de_questions_disponibles = [choice([1, 2]), choice([3, 4, 5])];
    }

    //let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      // on aura besoin des méthodes de la classe Fraction()
      let frac = new ListeFraction();
      // on récupère les dénominateurs qui vont bien
      //let denoms_amis = frac.denominateurs_amis;
      //C'est mieux avec ceux là, l'algo trouve plus rapidement une solution avec les contraintes à ajouter dans mathsalea_outils.js quand ça sera possible.
      let denoms_amis = [
        [40, 2, 20, 4, 10, 5, 8],
        [60, 2, 30, 3, 20, 4, 15, 5, 12, 6, 10],
        [80, 2, 40, 4, 20, 5, 16, 8, 10],
      ];
      // on aura besoin de ranger tout ça !
      let frac_rangees, frac_meme_denom_rangees;

      //======================================================
      //======== 		AVEC 3 FRACTIONS			  	========
      //======================================================

      // le tableau d'objets contenant tout le necesssaire, fractions, énoncé, question ... pour les problème avec 3 fractions
      let pb_3_f = [];
      // les numérateurs et dénominateurs des 3 fractions attention les deux premières doivent être inférieures à 1/2 si on veut qu'elles soient toutes positives !
      // et on veut des fractions distinctes !
      let F1,F2,F3,nt1, nt2, nt3, dt1, dt2, dt3;
      let n1, n2, n3, d1, d2, d3;
      // on choisit un tableau de dénominateurs qui vont bien
      let denoms_cool_3 = denoms_amis[randint(0, denoms_amis.length - 1)];
      F1=fraction(1,2)
      F2=fraction(1,2)
      F3=fraction(1,2)
      while (
        F1.num == F2.num ||
        F1.num == F3.num ||
        F2.num == F3.num ||
        F1.superieurlarge(fraction(1,2)) ||
        F2.superieurlarge(fraction(1,2))
      ) {
        n1 = randint(1, 6);
        d1 = choice(denoms_cool_3);
        n2 = randint(2, 10, [n1]); //on évite n1 pour pouvoir retrouver le texte de la plus grande fraction
        d2 = choice(denoms_cool_3, [d1]);
        n3 = d1 * d2 - n1 * d2 - n2 * d1; //la somme des trois vaut 1 !
        d3 = d1 * d2;
        F1=fraction(n1,d1).simplifie()
        F2=fraction(n2.d2).simplifie()
        F3=fraction(n3,d3).simplifie()
        
        /*
        nt1 = frac.fraction_simplifiee(n1, d1)[0];
        dt1 = frac.fraction_simplifiee(n1, d1)[1];
        nt2 = frac.fraction_simplifiee(n2, d2)[0];
        dt2 = frac.fraction_simplifiee(n2, d2)[1];
        nt3 = frac.fraction_simplifiee(n3, d3)[0];
        dt3 = frac.fraction_simplifiee(n3, d3)[1];
        */

      }

      //======================================================
      //========= indice 0 le triathlon des neiges  ==========
      //======================================================
      pb_3_f.push({
        prenoms: [prenomM()],
        fractionsSimp: [F1,"VTT",F2,"ski de fond",F3,"pied"],
        fractionsB: {
          f1: F1,
          cat1: "VTT",
          f2: F2,
          cat2: "ski de fond",
          f3: F3,
          cat3: "pied"
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
      pb_3_f.push({
        prenoms: [],
        fractionsSimp: [F1, p1, F2, p2, F3, p3],
        fractionsB: {
          f1: F1,
          cat1: p1,
          f2: F2,
          cat2: p2,
          f3: F3,
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
      pb_3_f[0].enonce += `Le triathlon des neiges de la vallée des loups comprend trois épreuves qui s'enchaînent : VTT, ski de fond et course à pied.`;
      pb_3_f[0].enonce += `<br>${pb_3_f[0].prenoms[0]}, un passionné de cette épreuve, s'entraîne régulièrement sur le même circuit. `;
      pb_3_f[0].enonce += `<br>À chaque entraînement, il parcourt le circuit de la façon suivante : $${pb_3_f[0].fractionsB.f1.texFraction}$ à ${pb_3_f[0].fractionsB.cat1}, `;
      pb_3_f[0].enonce += `$${pb_3_f[0].fractionsB.f2.texFraction}$ à ${pb_3_f[0].fractionsB.cat2} et le reste à ${pb_3_f[0].fractionsB.cat3}.`;

      //======================================================
      //=========== énoncé indice 1 Miss Math		 ===========
      //======================================================
      pb_3_f[1].enonce = `À l'élection de Miss Math ${currentAnnee}, ${pb_3_f[1].fractionsB.cat1} a remporté $${pb_3_f[1].fractionsB.f1.texFraction}$ des suffrages, `;
      pb_3_f[1].enonce += `${pb_3_f[1].fractionsB.cat2} $${pb_3_f[1].fractionsB.f2.texFraction}$ et `;
      pb_3_f[1].enonce += `${pb_3_f[1].fractionsB.cat3} tous les autres.`;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      let frac_meme_denom;
      for (let i = 0; i < 2; i++) {
        pb_3_f[
          i
        ].correction = `Il s'agit d'un problème additif. Il va être necessaire de réduire les fractions au même dénominateur pour les additionner, les soustraire ou les comparer.<br>`;

        if (!(F1.den == F2.den)) {
          pb_3_f[
            i
          ].correction += `Réduisons les fractions de l'énoncé au même dénominateur :  `;
          frac_meme_denom = listeFractions(F1,F2,F3).listeMemeDenominateur
          if (frac_meme_denom[0].egal(F1)) {
            pb_3_f[
              i
            ].correction += `$${pb_3_f[i].fractionsB.f1.texFraction}$ et `;
            pb_3_f[
              i
            ].correction += `$${pb_3_f[i].fractionsB.f2.texFraction} = ${frac_meme_denom[1].texFraction}$.<br>`;
          } else if (frac_meme_denom[0].egal(f2)) {
            pb_3_f[
              i
            ].correction += `$${pb_3_f[i].fractionsB.f1.texFraction} = ${frac_meme_denom[0]/texFraction}$ et `;
            pb_3_f[
              i
            ].correction += `$${pb_3_f[i].fractionsB.f2.texFraction}$<br>`;
          } else {
            pb_3_f[
              i
            ].correction += `$${pb_3_f[i].fractionsB.f1.texFraction} = ${frac_meme_denom[0].texFraction}$ et `;
            pb_3_f[
              i
            ].correction += `$${pb_3_f[i].fractionsB.f2.texFraction} = ${frac_meme_denom[1].texFraction}$.<br>`;
          }
        } else {
          frac_meme_denom = listeFractions(fpb_3_f[i].fractionsB.f1,pb_3_f[i].fractionsB.f2,pb_3_f[i].fractionsB.f3).liste_meme_denominateur
          pb_3_f[
            i
          ].correction += `Les fractions de l'énoncé ont déjà le même dénominateur.`;
        }
      }

      //======================================================
      //==== Correction indice 0 le triathlon des neiges  ====
      //======================================================
      pb_3_f[0].correction += `Calculons alors la distance à `;

      //======================================================
      //======== 		Correction indice 1 Miss Math  	========
      //======================================================
      pb_3_f[1].correction += `Calculons d'abord la fraction des suffrages remportés par `;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      for (let i = 0; i < 2; i++) {
        pb_3_f[i].correction += `${pb_3_f[i].fractionsB.cat3} : <br>`;
        pb_3_f[
          i
        ].correction += `$1-${pb_3_f[i].fractionsB.f1.texFraction}-${pb_3_f[i].fractionsB.f2.texFraction} = `;
        pb_3_f[
          i
        ].correction += `${fraction(frac_meme_denom[0].den,frac_meme_denom[0].den).texFraxction}-${frac_meme_denom[0].texFraction}-${frac_meme_denom[1].texFraction} = `;
        pb_3_f[
          i
        ].correction += `\\dfrac{${frac_meme_denom[0].den}-${frac_meme_denom[0].num}-${frac_meme_denom[1].num}}{${frac_meme_denom[0].den}} = `;
        pb_3_f[i].correction += `${fraction(frac_meme_denom[0].den - frac_meme_denom[0].num - frac_meme_denom[1].num,frac_meme_denom[0].den).texFraction}`;
        if (!(frac_meme_denom[0].den == pb_3_f[0].fractionsB.f3.den)) {
          pb_3_f[
            i
          ].correction += ` = ${pb_3_f[i].fractionsB.f3.texFraction}$`;
        } else {
          pb_3_f[i].correction += `$`;
        }
      }

      //======================================================
      //==== Conclusion indice 0 le triathlon des neiges  ====
      //======================================================
      pb_3_f[0].correction += `<br>${pb_3_f[0].prenoms[0]} fait donc $${pb_3_f[0].fractionsB.f1.texFraction}$ à ${pb_3_f[0].fractionsB.cat1}, `;
      pb_3_f[0].correction += `$${pb_3_f[0].fractionsB.f2.texFraction}$ à ${pb_3_f[0].fractionsB.cat2} et `;
      pb_3_f[0].correction += `$${pb_3_f[0].fractionsB.f3.texFraction}$ à ${pb_3_f[0].fractionsB.cat3}.`;

      pb_3_f[0].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_3_f[0].correction += `${pb_3_f[0].prenoms[0]} fait donc $${frac_meme_denom[0].texFraction}$ à ${pb_3_f[0].fractionsB.cat1}, `;
      pb_3_f[0].correction += `$${frac_meme_denom[1].texFraction}$ à ${pb_3_f[0].fractionsB.cat2} et `;
      pb_3_f[0].correction += `$${frac_meme_denom[2].texFraction}$ à ${pb_3_f[0].fractionsB.cat3}.`;

      //let frac_rangees,frac_meme_denom_rangees;
      if (
        calcul(nt1 / dt1) == calcul(nt2 / dt2) &&
        calcul(nt1 / dt1) == calcul(nt3 / dt3)
      ) {
        pb_3_f[0].correction += `<br> ${texte_en_couleur_et_gras(
          `Les trois fractions sont équivalentes, ${pb_3_f[0].prenoms[0]} parcours donc la même distance dans les trois disciplines.`
        )}`;
      } else {
        frac_meme_denom_rangees = listeFractions(F1,F2,F3).listeRangeeMemeDenominateur
        pb_3_f[0].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $${frac_meme_denom_rangees[0].texFraction}$, $${frac_meme_denom_rangees[1].texFraction}$, $${frac_meme_denom_rangees[2].texFraction}$.`;

        frac_rangees =  listeFractions(F1,F2,F3).listeRangee

        pb_3_f[0].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $${frac_rangees[0].texFraction}$, $${frac_rangees[1].texFraction}$, $${frac_rangees[2].texFraction}$.`;

        pb_3_f[0].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc à ${pb_3_f[0].fractionsSimp[
          pb_3_f[0].fractionsSimp.indexOf(frac_rangees[2]) + 2
          ]
          } que ${pb_3_f[0].prenoms[0]} fait la plus grande distance.`
        )}`;
      }

      //======================================================
      //======== 		Conclusion indice 1 Miss Math  	========
      //======================================================
      pb_3_f[1].correction += `<br>${pb_3_f[1].fractionsB.cat1} a donc remporté $${pb_3_f[1].fractionsB.f1.texFraction}$, `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat2} a remporté $${pb_3_f[1].fractionsB.f2.texFraction}$ et `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat3} $${pb_3_f[1].fractionsB.f3.texFraction}$.`;

      pb_3_f[1].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat1} remporte donc $${frac_meme_denom[0].texFraction}$, `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat2} $${frac_meme_denom[1].texFraction}$ et `;
      pb_3_f[1].correction += `${pb_3_f[1].fractionsB.cat3} $${frac_meme_denom[2].texFraction}$.`;

      if (
        calcul(nt1 / dt1) == calcul(nt2 / dt2) &&
        calcul(nt1 / dt1) == calcul(nt3 / dt3)
      ) {
        pb_3_f[1].correction += `<br> ${texte_en_couleur_et_gras(
          `Les trois fractions sont équivalentes, les trois candidates ont donc remporté le même nombre de suffrages.`
        )}`;
      } else {
        frac_meme_denom_rangees = listeFractions(pb_3_f[1].fractionsB.f1,pb_3_f[1].fractionsB.f1,pb_3_f[1].fractionsB.f1).listeRangeeMemeDenominateur
        pb_3_f[1].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $${frac_meme_denom_rangees[0].texFraction}$, $${frac_meme_denom_rangees[1].texFraction}$, $${frac_meme_denom_rangees[2].texFraction}$.`;

        frac_rangees = listeFractions(pb_3_f[1].fractionsB.f1,pb_3_f[1].fractionsB.f1,pb_3_f[1].fractionsB.f1).listeRangee

        pb_3_f[1].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$.`;

        pb_3_f[1].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc ${pb_3_f[1].fractionsSimp[
          pb_3_f[1].fractionsSimp.indexOf(frac_rangees[4]) + 2
          ]
          } qui a été élue.`
        )}`;
      }

      //======================================================
      //======== 		AVEC 4 FRACTIONS			  	========
      //======================================================

      // le tableau d'objets contenant tout le necesssaire, fractions, énoncé, question ... pour les problème avec 4 fractions
      let pb_4_f = [];
      // les numérateurs et dénominateurs des 4 fractions attention les trois premières doivent être inférieures à 1/3 si on veut qu'elles soient toutes positives !
      // et on veut des fractions distinctes
      let nq1, nq2, nq3, nq4, dq1, dq2, dq3, dq4;
      let n4, d4; // en plus parce qu'il y a 4 fractions
      // on choisit un tableau de dénominateurs qui vont bien
      let denoms_cool_4 = denoms_amis[randint(2, denoms_amis.length - 1)];
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
        d1 = choice(denoms_cool_4);
        n2 = randint(1, 11, [n1]); //on évite n1 pour pouvoir retrouver le texte de la plus grande fraction
        d2 = choice(denoms_cool_4);
        n3 = randint(1, 17, [n1, n2]); //on évite n1 et n2 pour pouvoir retrouver le texte de la plus grande fraction
        d3 = choice(denoms_cool_4);
        n4 = d1 * d2 * d3 - n1 * d2 * d3 - n2 * d1 * d3 - n3 * d1 * d2; //la somme des quatre vaut 1 !
        d4 = d1 * d2 * d3;

        nq1 = frac.fraction_simplifiee(n1, d1)[0];
        dq1 = frac.fraction_simplifiee(n1, d1)[1];
        nq2 = frac.fraction_simplifiee(n2, d2)[0];
        dq2 = frac.fraction_simplifiee(n2, d2)[1];
        nq3 = frac.fraction_simplifiee(n3, d3)[0];
        dq3 = frac.fraction_simplifiee(n3, d3)[1];
        nq4 = frac.fraction_simplifiee(n4, d4)[0];
        dq4 = frac.fraction_simplifiee(n4, d4)[1];
      }

      //======================================================
      //=========== 		indice 0 le mandala		 ===========
      //======================================================
      pb_4_f.push({
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
      pb_4_f.push({
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
      pb_4_f.push({
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
      pb_4_f[0].enonce = `${pb_4_f[0].prenoms[0]} colorie un mandala selon les proportions suivantes :  $\\dfrac{${pb_4_f[0].fractionsB.f1[0]}}{${pb_4_f[0].fractionsB.f1[1]}}$ en ${pb_4_f[0].fractionsB.cat1}, `;
      pb_4_f[0].enonce += `$\\dfrac{${pb_4_f[0].fractionsB.f2[0]}}{${pb_4_f[0].fractionsB.f2[1]}}$ en  ${pb_4_f[0].fractionsB.cat2}, `;
      pb_4_f[0].enonce += `$\\dfrac{${pb_4_f[0].fractionsB.f3[0]}}{${pb_4_f[0].fractionsB.f3[1]}}$ en  ${pb_4_f[0].fractionsB.cat3} et `;
      pb_4_f[0].enonce += `le reste en ${pb_4_f[0].fractionsB.cat4}.`;

      //======================================================
      //===========	énoncé indice 1 le jardin 	 ===========
      //======================================================
      pb_4_f[1].enonce = `Un jardin est aménagé selon les proportions suivantes :  $\\dfrac{${pb_4_f[1].fractionsB.f1[0]}}{${pb_4_f[1].fractionsB.f1[1]}}$ par ${pb_4_f[1].fractionsB.cat1}, `;
      pb_4_f[1].enonce += `$\\dfrac{${pb_4_f[1].fractionsB.f2[0]}}{${pb_4_f[1].fractionsB.f2[1]}}$ par  ${pb_4_f[1].fractionsB.cat2}, `;
      pb_4_f[1].enonce += `$\\dfrac{${pb_4_f[1].fractionsB.f3[0]}}{${pb_4_f[1].fractionsB.f3[1]}}$ par  ${pb_4_f[1].fractionsB.cat3} et `;
      pb_4_f[1].enonce += `le reste par ${pb_4_f[1].fractionsB.cat4}.`;

      //======================================================
      //===========	énoncé indice 2 le stade 	 ===========
      //======================================================
      pb_4_f[2].enonce = `Pour chaque match, les places du stade sont mises en vente dans les proportions suivantes :  $\\dfrac{${pb_4_f[2].fractionsB.f1[0]}}{${pb_4_f[2].fractionsB.f1[1]}}$ pour ${pb_4_f[2].fractionsB.cat1}, `;
      pb_4_f[2].enonce += `$\\dfrac{${pb_4_f[2].fractionsB.f2[0]}}{${pb_4_f[2].fractionsB.f2[1]}}$ pour  ${pb_4_f[2].fractionsB.cat2}, `;
      pb_4_f[2].enonce += `$\\dfrac{${pb_4_f[2].fractionsB.f3[0]}}{${pb_4_f[2].fractionsB.f3[1]}}$ pour  ${pb_4_f[2].fractionsB.cat3} et `;
      pb_4_f[2].enonce += `le reste pour ${pb_4_f[2].fractionsB.cat4}.`;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================

      //let frac_meme_denom;
      for (let i = 0; i < 3; i++) {
        pb_4_f[
          i
        ].correction = `Il s'agit d'un problème additif. Il va être necessaire de réduire les fractions au même dénominateur pour les additionner, les soustraire ou les comparer.<br>`;

        if (!(dq1 == dq2 && dq1 == dq3)) {
          pb_4_f[i].correction += `${!(
            dq1 == dq2 && dq1 == dq3
          )} - ${dq1} - ${dq2} - ${dq3} - Réduisons les fractions de l'énoncé au même dénominateur :  `;
          frac_meme_denom = frac.reduceSameDenominateur(
            pb_4_f[i].fractionsB.f1[0],
            pb_4_f[i].fractionsB.f1[1],
            pb_4_f[i].fractionsB.f2[0],
            pb_4_f[i].fractionsB.f2[1],
            pb_4_f[i].fractionsB.f3[0],
            pb_4_f[i].fractionsB.f3[1],
            pb_4_f[i].fractionsB.f4[0],
            pb_4_f[i].fractionsB.f4[1]
          );
          if (frac_meme_denom[1] == dq1) {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f1[0]}}{${pb_4_f[i].fractionsB.f1[1]}}$, `;
          } else {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f1[0]}}{${pb_4_f[i].fractionsB.f1[1]}} = \\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$, `;
          }
          if (frac_meme_denom[1] == dq2) {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f2[0]}}{${pb_4_f[i].fractionsB.f2[1]}}$ et `;
          } else {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f2[0]}}{${pb_4_f[i].fractionsB.f2[1]}} = \\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ et `;
          }
          if (frac_meme_denom[1] == dq3) {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f3[0]}}{${pb_4_f[i].fractionsB.f3[1]}}$.<br>`;
          } else {
            pb_4_f[
              i
            ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f3[0]}}{${pb_4_f[i].fractionsB.f3[1]}} = \\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$.<br>`;
          }
        } else {
          frac_meme_denom = frac.reduceSameDenominateur(
            pb_4_f[i].fractionsB.f1[0],
            pb_4_f[i].fractionsB.f1[1],
            pb_4_f[i].fractionsB.f2[0],
            pb_4_f[i].fractionsB.f2[1],
            pb_4_f[i].fractionsB.f3[0],
            pb_4_f[i].fractionsB.f3[1],
            pb_4_f[i].fractionsB.f4[0],
            pb_4_f[i].fractionsB.f4[1]
          );
          pb_4_f[
            i
          ].correction += `Les fractions de l'énoncé ont déjà le même dénominateur : `;
          pb_4_f[
            i
          ].correction += `$\\dfrac{${pb_4_f[i].fractionsB.f1[0]}}{${pb_4_f[i].fractionsB.f1[1]}}$, $\\dfrac{${pb_4_f[i].fractionsB.f2[0]}}{${pb_4_f[i].fractionsB.f2[1]}}$ et $\\dfrac{${pb_4_f[i].fractionsB.f3[0]}}{${pb_4_f[i].fractionsB.f3[1]}}$.<br>`;
        }
      }

      //======================================================
      //===========	Correction indice 0 le mandala==========
      //======================================================
      pb_4_f[0].correction += `Calculons alors la fraction du mandala recouverte en `;

      //======================================================
      //===========	Correction indice 1 le jardin===========
      //======================================================
      pb_4_f[1].correction += `Calculons d'abord la fraction du jardin occupée par `;

      //======================================================
      //===========	énoncé indice 2 le stade 	 ===========
      //======================================================
      pb_4_f[2].correction += `Calculons d'abord la fraction du stade occupée par `;

      //======================================================
      //=========== 		Correction Commune  	 ===========
      //======================================================
      for (let i = 0; i < 3; i++) {
        pb_4_f[i].correction += `${pb_4_f[i].fractionsB.cat3} : <br>`;
        pb_4_f[
          i
        ].correction += `$1-\\dfrac{${pb_4_f[i].fractionsB.f1[0]}}{${pb_4_f[i].fractionsB.f1[1]}}-\\dfrac{${pb_4_f[i].fractionsB.f2[0]}}{${pb_4_f[i].fractionsB.f2[1]}}-\\dfrac{${pb_4_f[i].fractionsB.f3[0]}}{${pb_4_f[i].fractionsB.f3[1]}} = `;
        pb_4_f[
          i
        ].correction += `\\dfrac{${frac_meme_denom[1]}}{${frac_meme_denom[1]}}-\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}-\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}-\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}} = `;
        pb_4_f[
          i
        ].correction += `\\dfrac{${frac_meme_denom[1]}-${frac_meme_denom[0]}-${frac_meme_denom[2]}-${frac_meme_denom[4]}}{${frac_meme_denom[1]}} = `;
        pb_4_f[i].correction += `\\dfrac{${frac_meme_denom[1] -
          frac_meme_denom[0] -
          frac_meme_denom[2] -
          frac_meme_denom[4]
          }}{${frac_meme_denom[1]}}`;
        if (!(frac_meme_denom[1] == pb_4_f[0].fractionsB.f4[1])) {
          pb_4_f[
            i
          ].correction += ` = \\dfrac{${pb_4_f[i].fractionsB.f4[0]}}{${pb_4_f[i].fractionsB.f4[1]}}$`;
        } else {
          pb_4_f[i].correction += `$`;
        }
      }

      //======================================================
      //=========== Conclusion indice 0 le mandala ===========
      //======================================================

      pb_4_f[0].correction += `<br>Le mandala est donc colorié de la façon suivante : $\\dfrac{${pb_4_f[0].fractionsB.f1[0]}}{${pb_4_f[0].fractionsB.f1[1]}}$ en ${pb_4_f[0].fractionsB.cat1}, `;
      pb_4_f[0].correction += `$\\dfrac{${pb_4_f[0].fractionsB.f2[0]}}{${pb_4_f[0].fractionsB.f2[1]}}$ en ${pb_4_f[0].fractionsB.cat2}, `;
      pb_4_f[0].correction += `$\\dfrac{${pb_4_f[0].fractionsB.f3[0]}}{${pb_4_f[0].fractionsB.f3[1]}}$ en ${pb_4_f[0].fractionsB.cat3} et `;
      pb_4_f[0].correction += `$\\dfrac{${pb_4_f[0].fractionsB.f4[0]}}{${pb_4_f[0].fractionsB.f4[1]}}$ en ${pb_4_f[0].fractionsB.cat4}.`;

      pb_4_f[0].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_4_f[0].correction += `le mandala est donc colorié de la façon suivante : $\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ en ${pb_4_f[0].fractionsB.cat1}, `;
      pb_4_f[0].correction += `$\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ en ${pb_4_f[0].fractionsB.cat2}, `;
      pb_4_f[0].correction += `$\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$ en ${pb_4_f[0].fractionsB.cat3} et `;
      pb_4_f[0].correction += `$\\dfrac{${frac_meme_denom[6]}}{${frac_meme_denom[7]}}$ en ${pb_4_f[0].fractionsB.cat4}.`;

      //let frac_rangees,frac_meme_denom_rangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb_4_f[0].correction += `<br> ${texte_en_couleur_et_gras(
          `Les quatre fractions sont équivalentes, ${pb_4_f[0].prenoms[0]} colorie donc la même surface avec les quatre couleurs.`
        )}`;
      } else {
        frac_meme_denom_rangees = frac.sortFractions(
          frac_meme_denom[0],
          frac_meme_denom[1],
          frac_meme_denom[2],
          frac_meme_denom[3],
          frac_meme_denom[4],
          frac_meme_denom[5],
          frac_meme_denom[6],
          frac_meme_denom[7]
        );
        pb_4_f[0].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${frac_meme_denom_rangees[0]}}{${frac_meme_denom_rangees[1]}}$, $\\dfrac{${frac_meme_denom_rangees[2]}}{${frac_meme_denom_rangees[3]}}$, $\\dfrac{${frac_meme_denom_rangees[4]}}{${frac_meme_denom_rangees[5]}}$, $\\dfrac{${frac_meme_denom_rangees[6]}}{${frac_meme_denom_rangees[7]}}$.`;

        frac_rangees = frac.sortFractions(
          pb_4_f[0].fractionsB.f1[0],
          pb_4_f[0].fractionsB.f1[1],
          pb_4_f[0].fractionsB.f2[0],
          pb_4_f[0].fractionsB.f2[1],
          pb_4_f[0].fractionsB.f3[0],
          pb_4_f[0].fractionsB.f3[1],
          pb_4_f[0].fractionsB.f4[0],
          pb_4_f[0].fractionsB.f4[1]
        );

        pb_4_f[0].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$, $\\dfrac{${frac_rangees[6]}}{${frac_rangees[7]}}$.`;

        pb_4_f[0].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc en ${pb_4_f[0].fractionsSimp[
          pb_4_f[0].fractionsSimp.indexOf(frac_rangees[6]) + 2
          ]
          } que le mandala est le plus recouvert.`
        )}`;
      }

      //======================================================
      //=========== Conclusion indice 1 le jardin	 ===========
      //======================================================
      pb_4_f[1].correction += `<br>Le jardin est donc occupé de la façon suivante : $\\dfrac{${pb_4_f[1].fractionsB.f1[0]}}{${pb_4_f[1].fractionsB.f1[1]}}$ par ${pb_4_f[1].fractionsB.cat1}, `;
      pb_4_f[1].correction += `$\\dfrac{${pb_4_f[1].fractionsB.f2[0]}}{${pb_4_f[1].fractionsB.f2[1]}}$ par ${pb_4_f[1].fractionsB.cat2}, `;
      pb_4_f[1].correction += `$\\dfrac{${pb_4_f[1].fractionsB.f3[0]}}{${pb_4_f[1].fractionsB.f3[1]}}$ par ${pb_4_f[1].fractionsB.cat3} et `;
      pb_4_f[1].correction += `$\\dfrac{${pb_4_f[1].fractionsB.f4[0]}}{${pb_4_f[1].fractionsB.f4[1]}}$ par ${pb_4_f[1].fractionsB.cat4}.`;

      pb_4_f[1].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_4_f[1].correction += `le jardin est donc occupé de la façon suivante : $\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ par ${pb_4_f[1].fractionsB.cat1}, `;
      pb_4_f[1].correction += `$\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ par ${pb_4_f[1].fractionsB.cat2}, `;
      pb_4_f[1].correction += `$\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$ par ${pb_4_f[1].fractionsB.cat3} et `;
      pb_4_f[1].correction += `$\\dfrac{${frac_meme_denom[6]}}{${frac_meme_denom[7]}}$ par ${pb_4_f[1].fractionsB.cat4}.`;

      //let frac_rangees,frac_meme_denom_rangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb_4_f[1].correction += `<br> ${texte_en_couleur_et_gras(
          `Les quatre fractions sont équivalentes, la même surface du jardin est donc occupée par les quatre cultures.`
        )}`;
      } else {
        frac_meme_denom_rangees = frac.sortFractions(
          frac_meme_denom[0],
          frac_meme_denom[1],
          frac_meme_denom[2],
          frac_meme_denom[3],
          frac_meme_denom[4],
          frac_meme_denom[5],
          frac_meme_denom[6],
          frac_meme_denom[7]
        );
        pb_4_f[1].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${frac_meme_denom_rangees[0]}}{${frac_meme_denom_rangees[1]}}$, $\\dfrac{${frac_meme_denom_rangees[2]}}{${frac_meme_denom_rangees[3]}}$, $\\dfrac{${frac_meme_denom_rangees[4]}}{${frac_meme_denom_rangees[5]}}$, $\\dfrac{${frac_meme_denom_rangees[6]}}{${frac_meme_denom_rangees[7]}}$.`;

        frac_rangees = frac.sortFractions(
          pb_4_f[1].fractionsB.f1[0],
          pb_4_f[1].fractionsB.f1[1],
          pb_4_f[1].fractionsB.f2[0],
          pb_4_f[1].fractionsB.f2[1],
          pb_4_f[1].fractionsB.f3[0],
          pb_4_f[1].fractionsB.f3[1],
          pb_4_f[1].fractionsB.f4[0],
          pb_4_f[1].fractionsB.f4[1]
        );

        pb_4_f[1].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$, $\\dfrac{${frac_rangees[6]}}{${frac_rangees[7]}}$.`;

        pb_4_f[1].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc par ${pb_4_f[1].fractionsSimp[
          pb_4_f[1].fractionsSimp.indexOf(frac_rangees[6]) + 2
          ]
          } que le jardin est le plus occupé.`
        )}`;
      }

      //======================================================
      //=========== Conclusion indice 2 le stade	 ===========
      //======================================================
      pb_4_f[2].correction += `<br>Le stade est donc occupé de la façon suivante : $\\dfrac{${pb_4_f[2].fractionsB.f1[0]}}{${pb_4_f[2].fractionsB.f1[1]}}$ pour ${pb_4_f[2].fractionsB.cat1}, `;
      pb_4_f[2].correction += `$\\dfrac{${pb_4_f[2].fractionsB.f2[0]}}{${pb_4_f[2].fractionsB.f2[1]}}$ pour ${pb_4_f[2].fractionsB.cat2}, `;
      pb_4_f[2].correction += `$\\dfrac{${pb_4_f[2].fractionsB.f3[0]}}{${pb_4_f[2].fractionsB.f3[1]}}$ pour ${pb_4_f[2].fractionsB.cat3} et `;
      pb_4_f[2].correction += `$\\dfrac{${pb_4_f[2].fractionsB.f4[0]}}{${pb_4_f[2].fractionsB.f4[1]}}$ pour ${pb_4_f[2].fractionsB.cat4}.`;

      pb_4_f[2].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
      pb_4_f[2].correction += `le stade est donc occupé de la façon suivante : $\\dfrac{${frac_meme_denom[0]}}{${frac_meme_denom[1]}}$ pour ${pb_4_f[2].fractionsB.cat1}, `;
      pb_4_f[2].correction += `$\\dfrac{${frac_meme_denom[2]}}{${frac_meme_denom[3]}}$ pour ${pb_4_f[2].fractionsB.cat2}, `;
      pb_4_f[2].correction += `$\\dfrac{${frac_meme_denom[4]}}{${frac_meme_denom[5]}}$ pour ${pb_4_f[2].fractionsB.cat3} et `;
      pb_4_f[2].correction += `$\\dfrac{${frac_meme_denom[6]}}{${frac_meme_denom[7]}}$ pour ${pb_4_f[2].fractionsB.cat4}.`;

      //let frac_rangees,frac_meme_denom_rangees;
      if (
        calcul(nq1 / dq1) == calcul(nq2 / dq2) &&
        calcul(nq1 / dq1) == calcul(nq3 / dq3) &&
        calcul(nq1 / dq1) == calcul(nq4 / dq4)
      ) {
        pb_4_f[2].correction += `<br> ${texte_en_couleur_et_gras(
          `Les quatre fractions sont équivalentes, chaque catégorie a donc la même importance dans le stade.`
        )}`;
      } else {
        frac_meme_denom_rangees = frac.sortFractions(
          frac_meme_denom[0],
          frac_meme_denom[1],
          frac_meme_denom[2],
          frac_meme_denom[3],
          frac_meme_denom[4],
          frac_meme_denom[5],
          frac_meme_denom[6],
          frac_meme_denom[7]
        );
        pb_4_f[2].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $\\dfrac{${frac_meme_denom_rangees[0]}}{${frac_meme_denom_rangees[1]}}$, $\\dfrac{${frac_meme_denom_rangees[2]}}{${frac_meme_denom_rangees[3]}}$, $\\dfrac{${frac_meme_denom_rangees[4]}}{${frac_meme_denom_rangees[5]}}$, $\\dfrac{${frac_meme_denom_rangees[6]}}{${frac_meme_denom_rangees[7]}}$.`;

        frac_rangees = frac.sortFractions(
          pb_4_f[2].fractionsB.f1[0],
          pb_4_f[2].fractionsB.f1[1],
          pb_4_f[2].fractionsB.f2[0],
          pb_4_f[2].fractionsB.f2[1],
          pb_4_f[2].fractionsB.f3[0],
          pb_4_f[2].fractionsB.f3[1],
          pb_4_f[2].fractionsB.f4[0],
          pb_4_f[2].fractionsB.f4[1]
        );

        pb_4_f[2].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $\\dfrac{${frac_rangees[0]}}{${frac_rangees[1]}}$, $\\dfrac{${frac_rangees[2]}}{${frac_rangees[3]}}$, $\\dfrac{${frac_rangees[4]}}{${frac_rangees[5]}}$, $\\dfrac{${frac_rangees[6]}}{${frac_rangees[7]}}$.`;

        pb_4_f[2].correction += `<br> ${texte_en_couleur_et_gras(
          `C'est donc pour ${pb_4_f[2].fractionsSimp[
          pb_4_f[2].fractionsSimp.indexOf(frac_rangees[6]) + 2
          ]
          } que le nombre de places est le plus important.`
        )}`;
      }

      switch (liste_type_de_questions[i]) {
        case 1: // Triathlon des neiges --> VTT, ski de fond, course
          texte = `${pb_3_f[0].enonce} <br> ${pb_3_f[0].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_3_f[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_3_f[0].correction}`;
          }
          break;
        case 2: //Miss Math --> Noémie, Samia, Alexia
          texte = `${pb_3_f[1].enonce} <br> ${pb_3_f[1].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_3_f[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_3_f[1].correction}`;
          }
          break;
        case 3: // Mandala --> carmin, ocre jaune, turquoise, pourpre
          texte = `${pb_4_f[0].enonce} <br> ${pb_4_f[0].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_4_f[0].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_4_f[0].correction}`;
          }
          break;
        case 4: // Jardin --> légumes, plantes aromatiques, semis, fraisiers
          texte = `${pb_4_f[1].enonce} <br> ${pb_4_f[1].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_4_f[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_4_f[1].correction}`;
          }
          break;
        case 5: // Stade --> pays organisatuers, supporters, sponsors, vente libre
          texte = `${pb_4_f[2].enonce} <br> ${pb_4_f[2].question}`;
          if (this.debug) {
            texte += `<br>`;
            texte += `<br> ${pb_4_f[2].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${pb_4_f[2].correction}`;
          }
          break;
      }
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : nombre enier positif\n2 : nombre décimal positif\n3 : nombre enier positif inférieur à un\n4 : Mélange"];
}

