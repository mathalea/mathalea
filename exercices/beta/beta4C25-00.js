import Exercice from '../ClasseExercice.js';
import {enleve_element_bis, liste_de_question_to_contenu, randint, choice, combinaison_listes_sans_changer_ordre, prenomF, prenomM, prenom, texte_en_couleur_et_gras } from "/modules/outils.js"
import { fraction, listeFractions} from "/modules/Fractions.js"

/**
 * Problèmes additifs et de comparaion sur les rationnels
 * 4C25-0
 * @author Sébastien Lozano
 */
export default function Problemes_additifs_fractions_bis() {
    "use strict";
    Exercice.call(this); // Héritage de la classe Exercice()
    this.debug = false;
    this.sup = 1;
    this.video=""
    if (this.debug) {
        this.nb_questions = 2;
    } else {
        this.nb_questions = 2;
    }
    this.titre = "Re-Problèmes additifs et de comparaison sur les rationnels";
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
        let denoms_amis = [
            [40, 2, 20, 4, 10, 5, 8],
            [60, 2, 30, 3, 20, 4, 15, 5, 12, 6, 10],
            [80, 2, 40, 4, 20, 5, 16, 8, 10],
        ];
        let p1, p2, p3; // les 3 prénoms
        let currentDate
        let currentAnnee
        let listefrac,listefrac2,denominateurCommun,frac_meme_denom,frac_meme_denom_rangees,frac_rangees
            // le tableau d'objets contenant tout le necesssaire, fractions, énoncé, question ... pour les problème avec 4 fractions
        let pb_4_f = [],pb_3_f =[];
            // les numérateurs et dénominateurs des 4 fractions attention les trois premières doivent être inférieures à 1/3 si on veut qu'elles soient toutes positives !
            // et on veut des fractions distinctes
        let n1, n2, n3, d1, d2, d3,F1, F2, F3,F4;
        let n4, d4; // en plus parce qu'il y a 4 fractions
            // on choisit un tableau de dénominateurs qui vont bien
        let denoms_cool_4 ;
        for (
            let i = 0,denoms_cool_3 =[],texte, texte_corr, cpt = 0;
            i < this.nb_questions && cpt < 50;

        ) {

            //======================================================
            //======== 		AVEC 3 FRACTIONS			  	========
            //======================================================

            // le tableau d'objets contenant tout le necesssaire, fractions, énoncé, question ... pour les problème avec 3 fractions
            pb_3_f = [];
            // les numérateurs et dénominateurs des 3 fractions attention les deux premières doivent être inférieures à 1/2 si on veut qu'elles soient toutes positives !
            // et on veut des fractions distinctes !
            
            
            // on choisit un tableau de dénominateurs qui vont bien
            denoms_cool_3 = denoms_amis[randint(0, denoms_amis.length - 1)];
            F1 = fraction(1, 2)
            F2 = fraction(1, 2)
            F3 = fraction(1, 2)
            while (
                F1.num == F2.num ||
                F1.num == F3.num ||
                F2.num == F3.num ||
                F1.superieurlarge(fraction(1, 2)) ||
                F2.superieurlarge(fraction(1, 2))
            ) {
                n1 = randint(1, 6);
                d1 = choice(denoms_cool_3);
                n2 = randint(2, 10, n1); //on évite n1 pour pouvoir retrouver le texte de la plus grande fraction
                d2 = choice(denoms_cool_3, d1);
                n3 = d1 * d2 - n1 * d2 - n2 * d1; //la somme des trois vaut 1 !
                d3 = d1 * d2;
                F1 = fraction(n1, d1).simplifie()
                F2 = fraction(n2, d2).simplifie()
                F3 = fraction(n3, d3).simplifie()

            }
            //======================================================
            //========= indice 0 le triathlon des neiges  ==========
            //======================================================
            pb_3_f.push({
                prenoms: [prenomM()],
                fractions: [F1,"VTT",F2,"ski de fond",F3,"pied"],
                enonce: ``,
                question: `Pour quelle discipline, la distance est-elle la plus grande ?`,
                correction: ``,
            });

            // les 3 prénomns doivent être distincts
   
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
                fractions: [F1,p1,F2,p2,F3,p3],
                enonce: ``,
                question: `Qui a été élue ?`,
                correction: ``,
            });
            currentDate = new Date();
            currentAnnee = currentDate.getFullYear();

            //======================================================
            //====== énoncé indice 0 le triathlon des neiges  ======
            //======================================================
            pb_3_f[0].enonce += `Le triathlon des neiges de la vallée des loups comprend trois épreuves qui s'enchaînent : VTT, ski de fond et course à pied.`;
            pb_3_f[0].enonce += `<br>${pb_3_f[0].prenoms[0]}, un passionné de cette épreuve, s'entraîne régulièrement sur le même circuit. `;
            pb_3_f[0].enonce += `<br>À chaque entraînement, il parcourt le circuit de la façon suivante : $${pb_3_f[0].fractions[0].texFraction}$ à ${pb_3_f[0].fractions[1]}, `;
            pb_3_f[0].enonce += `$${pb_3_f[0].fractions[2].texFraction}$ à ${pb_3_f[0].fractions[3]} et le reste à ${pb_3_f[0].fractions[5]}.`;

            //======================================================
            //=========== énoncé indice 1 Miss Math		 ===========
            //======================================================
            pb_3_f[1].enonce = `À l'élection de Miss Math ${currentAnnee}, ${pb_3_f[1].fractions[1]} a remporté $${pb_3_f[1].fractions[0].texFraction}$ des suffrages, `;
            pb_3_f[1].enonce += `${pb_3_f[1].fractions[3]} $${pb_3_f[1].fractions[2].texFraction}$ et `;
            pb_3_f[1].enonce += `${pb_3_f[1].fractions[5]} tous les autres.`;

            //======================================================
            //=========== 		Correction Commune  	 ===========
            //======================================================
            listefrac = listeFractions(F1, F2, F3)
            frac_meme_denom = enleve_element_bis(listefrac.listeMemeDenominateur)
            frac_meme_denom_rangees = enleve_element_bis(listefrac.listeRangeeMemeDenominateur)
            frac_rangees = enleve_element_bis(listefrac.listeRangee)
            denominateurCommun = listefrac.listeMemeDenominateur[0].den
            for (let i = 0; i < 2; i++) {
                pb_3_f[
                    i
                ].correction = `Il s'agit d'un problème additif. Il va être necessaire de réduire les fractions au même dénominateur pour les additionner, les soustraire ou les comparer.<br>`;
                if (listefrac.liste[0].den == listefrac.liste[1].den) {
                    pb_3_f[i].correction += `Les fractions de l'énoncé ont déjà le même dénominateur.<br>`;
                }
                else {
                    pb_3_f[i].correction += `Réduisons les fractions de l'énoncé au même dénominateur :  `;

                    pb_3_f[i].correction += `$${listefrac.liste[0].texFraction}$ `
                    if (listefrac.liste[0].den!==denominateurCommun) pb_3_f[i].correction +=`$= ${listefrac.listeMemeDenominateur[0].texFraction}$ et `
                    else  pb_3_f[i].correction +=` et `
                    pb_3_f[i].correction += `$${listefrac.liste[1].texFraction}$ `
                    if (listefrac.liste[1].den!==denominateurCommun)  pb_3_f[i].correction+=`$= ${listefrac.listeMemeDenominateur[1].texFraction}$.<br>`
                    else pb_3_f[i].correction+=`.<br>`

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
                pb_3_f[i].correction += `${pb_3_f[i].fractions[5]} : <br>`;
                pb_3_f[
                    i
                ].correction += `$1-${pb_3_f[i].fractions[0].texFraction}-${pb_3_f[i].fractions[2].texFraction} = `;
                pb_3_f[
                    i
                ].correction += `${fraction(denominateurCommun, denominateurCommun).texFraction}-${listefrac.listeMemeDenominateur[0].texFraction}-${listefrac.listeMemeDenominateur[1].texFraction} = `;
                pb_3_f[
                    i
                ].correction += `\\dfrac{${denominateurCommun}-${listefrac.listeMemeDenominateur[0].num}-${listefrac.listeMemeDenominateur[1].num}}{${denominateurCommun}} = `;
                pb_3_f[i].correction += `${fraction(denominateurCommun - listefrac.listeMemeDenominateur[0].num - listefrac.listeMemeDenominateur[1].num, denominateurCommun).texFraction}`;
                if (!(denominateurCommun == F3.den)) {
                    pb_3_f[
                        i
                    ].correction += ` = ${pb_3_f[i].fractions[4].texFraction}$`;
                } else {
                    pb_3_f[i].correction += `$`;
                }
            }

            //======================================================
            //==== Conclusion indice 0 le triathlon des neiges  ====
            //======================================================
            pb_3_f[0].correction += `<br>${pb_3_f[0].prenoms[0]} fait donc $${pb_3_f[0].fractions[0].texFraction}$ à ${pb_3_f[0].fractions[1]}, `;
            pb_3_f[0].correction += `$${pb_3_f[0].fractions[2].texFraction}$ à ${pb_3_f[0].fractions[3]} et `;
            pb_3_f[0].correction += `$${pb_3_f[0].fractions[4].texFraction}$ à ${pb_3_f[0].fractions[5]}.`;

            pb_3_f[0].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
            pb_3_f[0].correction += `${pb_3_f[0].prenoms[0]} fait donc $${frac_meme_denom[0].texFraction}$ à ${pb_3_f[0].fractions[1]}, `;
            pb_3_f[0].correction += `$${frac_meme_denom[1].texFraction}$ à ${pb_3_f[0].fractions[3]} et `;
            pb_3_f[0].correction += `$${frac_meme_denom[2].texFraction}$ à ${pb_3_f[0].fractions[5]}.`;

            //let frac_rangees,frac_meme_denom_rangees;
            if (
                F1.egal(F2) &&
                F1.egal(F3)
            ) {
                pb_3_f[0].correction += `<br> ${texte_en_couleur_et_gras(
                    `Les trois fractions sont équivalentes, ${pb_3_f[0].prenoms[0]} parcours donc la même distance dans les trois disciplines.`
                )}`;
            } else {
                pb_3_f[0].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $${frac_meme_denom_rangees[0].texFraction}$, $${frac_meme_denom_rangees[1].texFraction}$, $${frac_meme_denom_rangees[2].texFraction}$.`;

                pb_3_f[0].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $${frac_rangees[0].texFraction}$, $${frac_rangees[1].texFraction}$, $${frac_rangees[2].texFraction}$.`;

                pb_3_f[0].correction += `<br> ${texte_en_couleur_et_gras(
                    `C'est donc à ${pb_3_f[0].fractions[
                    pb_3_f[0].fractions.indexOf(frac_rangees[2]) + 1
                    ]
                    } que ${pb_3_f[0].prenoms[0]} fait la plus grande distance.`
                )}`;
            }

            //======================================================
            //======== 		Conclusion indice 1 Miss Math  	========
            //======================================================
            pb_3_f[1].correction += `<br>${pb_3_f[1].fractions[1]} a donc remporté $${pb_3_f[1].fractions[0].texFraction}$, `;
            pb_3_f[1].correction += `${pb_3_f[1].fractions[3]} a remporté $${pb_3_f[1].fractions[2].texFraction}$ et `;
            pb_3_f[1].correction += `${pb_3_f[1].fractions[5]} $${pb_3_f[1].fractions[4].texFraction}$.`;

            pb_3_f[1].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
            pb_3_f[1].correction += `${pb_3_f[1].fractions[1]} remporte donc $${frac_meme_denom[0].texFraction}$, `;
            pb_3_f[1].correction += `${pb_3_f[1].fractions[3]} $${frac_meme_denom[1].texFraction}$ et `;
            pb_3_f[1].correction += `${pb_3_f[1].fractions[5]} $${frac_meme_denom[2].texFraction}$.`;

            if (
                F1.egal(F2) &&
                F1.egal(F3)
            ) {
                pb_3_f[1].correction += `<br> ${texte_en_couleur_et_gras(
                    `Les trois fractions sont équivalentes, les trois candidates ont donc remporté le même nombre de suffrages.`
                )}`;
            } else {
                pb_3_f[1].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $${frac_meme_denom_rangees[0].texFraction}$, $${frac_meme_denom_rangees[1].texFraction}$, $${frac_meme_denom_rangees[2].texFraction}$.`;


                pb_3_f[1].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $${frac_rangees[0].texFraction}$, $${frac_rangees[1].texFraction}$, $${frac_rangees[2].texFraction}$.`;

                pb_3_f[1].correction += `<br> ${texte_en_couleur_et_gras(
                    `C'est donc ${pb_3_f[1].fractions[
                    pb_3_f[1].fractions.indexOf(frac_rangees[2]) + 1
                    ]
                    } qui a été élue.`
                )}`;
            }

            //======================================================
            //======== 		AVEC 4 FRACTIONS			  	========
            //======================================================
            pb_4_f = [];
            denoms_cool_4 = denoms_amis[randint(2, denoms_amis.length - 1)]

            F1 = fraction(1, 3)
            F2 = fraction(1, 3)
            F3 = fraction(1, 3)
            F4 = fraction(1, 3)
            while (
                F1.num == F2.num ||
                F1.num == F3.num ||
                F1.num == F4.num ||
                F2.num == F3.num ||
                F2.num == F4.num ||
                F3.num == F4.num ||
                F1.superieurlarge(fraction(1, 3)) ||
                F2.superieurlarge(fraction(1, 3)) ||
                F3.superieurlarge(fraction(1, 3))
            ) {
                n1 = randint(1, 5);
                d1 = choice(denoms_cool_4);
                n2 = randint(1, 11, n1); //on évite n1 pour pouvoir retrouver le texte de la plus grande fraction
                d2 = choice(denoms_cool_4);
                n3 = randint(1, 17, [n1, n2]); //on évite n1 et n2 pour pouvoir retrouver le texte de la plus grande fraction
                d3 = choice(denoms_cool_4);
                n4 = d1 * d2 * d3 - n1 * d2 * d3 - n2 * d1 * d3 - n3 * d1 * d2; //la somme des quatre vaut 1 !
                d4 = d1 * d2 * d3;
                F1 = fraction(n1, d1).simplifie()
                F2 = fraction(n2, d2).simplifie()
                F3 = fraction(n3, d3).simplifie()
                F4 = fraction(n4, d4).simplifie()
            }

            //======================================================
            //=========== 		indice 0 le mandala		 ===========
            //======================================================
            pb_4_f.push({
                //
                prenoms: [prenom()],
                fractions: [F1,"carmin",F2,"ocre jaune",F3,"turquoise",F4,"pourpre"],
                enonce: ``,
                question: `Quelle est elle la couleur qui recouvre le plus de surface ?`,
                correction: ``
            });

            //======================================================
            //===========		indice 1 le jardin	 	 ===========
            //======================================================
            pb_4_f.push({
                // indice 1 le jardin
                prenoms: [],
                fractions: [F1,"la culture des légumes",F2,"la culture des plantes aromatiques",F3,"une serre servant aux semis",F4,"la culture des fraisiers"],
                enonce: ``,
                question: `Quelle est la culture qui occupe le plus de surface ?`,
                correction: ``
            });

            //======================================================
            //===========	indice 2 le stade		 	 ===========
            //======================================================
            pb_4_f.push({
                // indice 2 le stade
                prenoms: [],
                fractions: [F1,"le pays organisateur",F2,"l'ensemble des supporters des deux équipes en jeu",F3,"les sponsors et officiels",F4,"les places en vente libre"],
                enonce: ``,
                question: `Quelle est la catégorie la plus importante dans le stade ?`,
                correction: ``
            });

            //======================================================
            //===========	énoncé indice 0 le mandala 	 ===========
            //======================================================
            pb_4_f[0].enonce = `${pb_4_f[0].prenoms[0]} colorie un mandala selon les proportions suivantes :  $${pb_4_f[0].fractions[0].texFraction}$ en ${pb_4_f[0].fractions[1]}, `;
            pb_4_f[0].enonce += `$${pb_4_f[0].fractions[2].texFraction}$ en  ${pb_4_f[0].fractions[3]}, `;
            pb_4_f[0].enonce += `$${pb_4_f[0].fractions[4].texFraction}$ en  ${pb_4_f[0].fractions[5]} et `;
            pb_4_f[0].enonce += `le reste en ${pb_4_f[0].fractions[7]}.`;

            //======================================================
            //===========	énoncé indice 1 le jardin 	 ===========
            //======================================================
            pb_4_f[1].enonce = `Un jardin est aménagé selon les proportions suivantes :  $${pb_4_f[1].fractions[0].texFraction}$ par ${pb_4_f[1].fractions[1]}, `;
            pb_4_f[1].enonce += `$${pb_4_f[1].fractions[2].texFraction}$ par  ${pb_4_f[1].fractions[3]}, `;
            pb_4_f[1].enonce += `$${pb_4_f[1].fractions[4].texFraction}$ par  ${pb_4_f[1].fractions[5]} et `;
            pb_4_f[1].enonce += `le reste par ${pb_4_f[1].fractions[7]}.`;

            //======================================================
            //===========	énoncé indice 2 le stade 	 ===========
            //======================================================
            pb_4_f[2].enonce = `Pour chaque match, les places du stade sont mises en vente dans les proportions suivantes :  $${pb_4_f[2].fractions[0].texFraction}$ pour ${pb_4_f[2].fractions[1]}, `;
            pb_4_f[2].enonce += `$${pb_4_f[2].fractions[2].texFraction}$ pour  ${pb_4_f[2].fractions[3]}, `;
            pb_4_f[2].enonce += `$${pb_4_f[2].fractions[4].texFraction}$ pour  ${pb_4_f[2].fractions[5]} et `;
            pb_4_f[2].enonce += `le reste pour ${pb_4_f[2].fractions[7]}.`;

            //======================================================
            //=========== 		Correction Commune  	 ===========
            //======================================================
            listefrac2 = listeFractions(F1, F2, F3, F4)
            frac_meme_denom = enleve_element_bis(listefrac2.listeMemeDenominateur)
            frac_meme_denom_rangees = enleve_element_bis(listefrac2.listeRangeeMemeDenominateur)
            frac_rangees = enleve_element_bis(listefrac2.listeRangee)
            denominateurCommun = listefrac2.listeMemeDenominateur[0].den
            for (let i = 0; i < 3; i++) {
                pb_4_f[
                    i
                ].correction = `Il s'agit d'un problème additif. Il va être necessaire de réduire les fractions au même dénominateur pour les additionner, les soustraire ou les comparer.<br>`;

                if (listefrac2.liste[0].den == denominateurCommun && listefrac2.liste[1].den==denominateurCommun &&listefrac2.liste[2].den==denominateurCommun) {
                    pb_4_f[i].correction += `Les fractions de l'énoncé ont déjà le même dénominateur.`;
                }
                else {
                    pb_4_f[i].correction += `Réduisons les fractions de l'énoncé au même dénominateur :  `;
                    pb_4_f[i].correction += `$${listefrac2.liste[0].texFraction}$ `
                    if (listefrac2.liste[0].den!=denominateurCommun) pb_4_f[i].correction += `$= ${listefrac2.listeMemeDenominateur[0].texFraction}$ ; `;
                    else pb_4_f[i].correction += ` ; `
                    pb_4_f[i].correction += `$${listefrac2.liste[1].texFraction}$ `
                    if (listefrac2.liste[1].den!=denominateurCommun) pb_4_f[i].correction += `$= ${listefrac2.listeMemeDenominateur[1].texFraction}$ et `;
                    else pb_4_f[i].correction += ` et `
                    pb_4_f[i].correction += `$${listefrac2.liste[2].texFraction}$ `
                    if (listefrac2.liste[2].den!=denominateurCommun) pb_4_f[i].correction +=`$= ${listefrac2.listeMemeDenominateur[2].texFraction}$.<br>`;
                    else pb_4_f[i].correction +=`.<br>`

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
                pb_4_f[i].correction += `${pb_4_f[i].fractions[5]} : <br>`;
                pb_4_f[
                    i
                ].correction += `$1-${pb_4_f[i].fractions[0].texFraction}-${pb_4_f[i].fractions[2].texFraction}-${pb_4_f[i].fractions[4].texFraction} = `;
                pb_4_f[
                    i
                ].correction += `\\dfrac{${denominateurCommun}}{${denominateurCommun}}-${frac_meme_denom[0].texFraction}-${frac_meme_denom[1].texFraction}-${frac_meme_denom[2].texFraction} = `;
                pb_4_f[
                    i
                ].correction += `\\dfrac{${denominateurCommun}-${frac_meme_denom[0].num}-${frac_meme_denom[1].num}-${frac_meme_denom[2].num}}{${denominateurCommun}} = `;
                pb_4_f[i].correction += `${frac_meme_denom[3].texFraction}`;
                if (frac_meme_denom[3].den != pb_4_f[i].fractions[6].den) {
                    pb_4_f[
                        i
                    ].correction += ` = ${pb_4_f[i].fractions[6].texFraction}$`;
                } else {
                    pb_4_f[i].correction += `$`;
                }
            }

            //======================================================
            //=========== Conclusion indice 0 le mandala ===========
            //======================================================

            pb_4_f[0].correction += `<br>Le mandala est donc colorié de la façon suivante : $${pb_4_f[0].fractions[0].texFraction}$ en ${pb_4_f[0].fractions[1]}, `;
            pb_4_f[0].correction += `$${pb_4_f[0].fractions[2].texFraction}$ en ${pb_4_f[0].fractions[3]}, `;
            pb_4_f[0].correction += `$${pb_4_f[0].fractions[4].texFraction}$ en ${pb_4_f[0].fractions[5]} et `;
            pb_4_f[0].correction += `$${pb_4_f[0].fractions[6].texFraction}$ en ${pb_4_f[0].fractions[7]}.`;

            pb_4_f[0].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
            pb_4_f[0].correction += `le mandala est donc colorié de la façon suivante : $${frac_meme_denom[0].texFraction}$ en ${pb_4_f[0].fractions[1]}, `;
            pb_4_f[0].correction += `$${frac_meme_denom[1].texFraction}$ en ${pb_4_f[0].fractions[3]}, `;
            pb_4_f[0].correction += `$${frac_meme_denom[2].texFraction}$ en ${pb_4_f[0].fractions[5]} et `;
            pb_4_f[0].correction += `$${frac_meme_denom[3].texFraction}$ en ${pb_4_f[0].fractions[7]}.`;

            if (
                pb_4_f[0].fractions[0].egal(pb_4_f[0].fractions[2]) &&
                pb_4_f[0].fractions[0].egal(pb_4_f[0].fractions[4]) &&
                pb_4_f[0].fractions[0].egal(pb_4_f[0].fractions[6]) 
            ) {
                pb_4_f[0].correction += `<br> ${texte_en_couleur_et_gras(
                    `Les quatre fractions sont équivalentes, ${pb_4_f[0].prenoms[0]} colorie donc la même surface avec les quatre couleurs.`
                )}`;
            } else {
                pb_4_f[0].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $${frac_meme_denom_rangees[0].texFraction}$, $${frac_meme_denom_rangees[1].texFraction}$, $${frac_meme_denom_rangees[2].texFraction}$, $${frac_meme_denom_rangees[3].texFraction}$.`;

                pb_4_f[0].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $${frac_rangees[0].texFraction}$, $${frac_rangees[1].texFraction}$, $${frac_rangees[2].texFraction}$, $${frac_rangees[3].texFraction}$.`;

                pb_4_f[0].correction += `<br> ${texte_en_couleur_et_gras(
                    `C'est donc en ${pb_4_f[0].fractions[
                    pb_4_f[0].fractions.indexOf(frac_rangees[3]) + 1
                    ]
                    } que le mandala est le plus recouvert.`
                )}`;
            }

            //======================================================
            //=========== Conclusion indice 1 le jardin	 ===========
            //======================================================
            pb_4_f[1].correction += `<br>Le jardin est donc occupé de la façon suivante : $${pb_4_f[1].fractions[0].texFraction}$ par ${pb_4_f[1].fractions[1]}, `;
            pb_4_f[1].correction += `$${pb_4_f[1].fractions[2].texFraction}$ par ${pb_4_f[1].fractions[3]}, `;
            pb_4_f[1].correction += `$${pb_4_f[1].fractions[4].texFraction}$ par ${pb_4_f[1].fractions[5]} et `;
            pb_4_f[1].correction += `$${pb_4_f[1].fractions[6].texFraction}$ par ${pb_4_f[1].fractions[7]}.`;

            pb_4_f[1].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
            pb_4_f[1].correction += `le jardin est donc occupé de la façon suivante : $${frac_meme_denom[0].texFraction}$ par ${pb_4_f[1].fractions[1]}, `;
            pb_4_f[1].correction += `$${frac_meme_denom[1].texFraction}$ par ${pb_4_f[1].fractions[3]}, `;
            pb_4_f[1].correction += `$${frac_meme_denom[2].texFraction}$ par ${pb_4_f[1].fractions[5]} et `;
            pb_4_f[1].correction += `$${frac_meme_denom[3].texFraction}$ par ${pb_4_f[1].fractions[7]}.`;

            //let frac_rangees,frac_meme_denom_rangees;
            if (
                pb_4_f[1].fractions[0].egal(pb_4_f[1].fractions[2]) &&
                pb_4_f[1].fractions[0].egal(pb_4_f[1].fractions[4]) &&
                pb_4_f[1].fractions[0].egal(pb_4_f[1].fractions[6]) 
            ) {
                pb_4_f[1].correction += `<br> ${texte_en_couleur_et_gras(
                    `Les quatre fractions sont équivalentes, la même surface du jardin est donc occupée par les quatre cultures.`
                )}`;
            } else {
                pb_4_f[1].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $${frac_meme_denom_rangees[0].texFraction}$, $${frac_meme_denom_rangees[1].texFraction}$, $${frac_meme_denom_rangees[2].texFraction}$, $${frac_meme_denom_rangees[3].texFraction}$.`;
                pb_4_f[1].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $${frac_rangees[0].texFraction}$, $${frac_rangees[1].texFraction}$, $${frac_rangees[2].texFraction}$, $${frac_rangees[3].texFraction}$.`;

                pb_4_f[1].correction += `<br> ${texte_en_couleur_et_gras(
                    `C'est donc par ${pb_4_f[1].fractions[pb_4_f[1].fractions.indexOf(frac_rangees[3])+1]}
                     que le jardin est le plus occupé.`
                )}`;
            }

            //======================================================
            //=========== Conclusion indice 2 le stade	 ===========
            //======================================================
            pb_4_f[2].correction += `<br>Le stade est donc occupé de la façon suivante : $${pb_4_f[2].fractions[0].texFraction}$ pour ${pb_4_f[2].fractions[1]}, `;
            pb_4_f[2].correction += `$${pb_4_f[2].fractions[2].texFraction}$ pour ${pb_4_f[2].fractions[3]}, `;
            pb_4_f[2].correction += `$${pb_4_f[2].fractions[4].texFraction}$ pour ${pb_4_f[2].fractions[5]} et `;
            pb_4_f[2].correction += `$${pb_4_f[2].fractions[6].texFraction}$ pour ${pb_4_f[2].fractions[7]}.`;

            pb_4_f[2].correction += `<br> Avec les mêmes dénominateurs pour pouvoir comparer, `;
            pb_4_f[2].correction += `le stade est donc occupé de la façon suivante : $${frac_meme_denom[0].texFraction}$ pour ${pb_4_f[2].fractions[1]}, `;
            pb_4_f[2].correction += `$${frac_meme_denom[1].texFraction}$ pour ${pb_4_f[2].fractions[3]}, `;
            pb_4_f[2].correction += `$${frac_meme_denom[2].texFraction}$ pour ${pb_4_f[2].fractions[5]} et `;
            pb_4_f[2].correction += `$${frac_meme_denom[3].texFraction}$ pour ${pb_4_f[2].fractions[7]}.`;

            //let frac_rangees,frac_meme_denom_rangees;
            if (
                pb_4_f[2].fractions[0].egal(pb_4_f[2].fractions[2]) &&
                pb_4_f[2].fractions[0].egal(pb_4_f[2].fractions[4]) &&
                pb_4_f[2].fractions[0].egal(pb_4_f[2].fractions[6]) 
            ) {
                pb_4_f[2].correction += `<br> ${texte_en_couleur_et_gras(
                    `Les quatre fractions sont équivalentes, chaque catégorie a donc la même importance dans le stade.`
                )}`;
            } else {

                pb_4_f[2].correction += `<br>Nous pouvons alors ranger ces fractions dans l'ordre croissant : $${frac_meme_denom_rangees[0].texFraction}$, $${frac_meme_denom_rangees[1].texFraction}$, $${frac_meme_denom_rangees[2].texFraction}$, $${frac_meme_denom_rangees[3].texFraction}$.`;
                pb_4_f[2].correction += `<br>Enfin, nous pouvons ranger les fractions de l'énoncé et la fraction calculée dans l'ordre croissant : $${frac_rangees[0].texFraction}$, $${frac_rangees[1].texFraction}$, $${frac_rangees[2].texFraction}$, $${frac_rangees[3].texFraction}$.`;
                pb_4_f[2].correction += `<br> ${texte_en_couleur_et_gras(
                    `C'est donc pour ${pb_4_f[2].fractions[
                    pb_4_f[2].fractions.indexOf(frac_rangees[3]) + 1
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

