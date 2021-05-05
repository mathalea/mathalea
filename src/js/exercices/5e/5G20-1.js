import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,calcul,texEnumerate_sans_numero,texNombre,modalTexteLong,lampe_message,Triangles} from '../../modules/outils.js'

export const titre = 'Vocabulaire des triangles'

/**
 * Vocabulaire des triangles
 * 6G20-2 ; 5G20-1
 * @author Sébastien Lozano
 */
export default function Vocabulaire_des_triangles() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.consigne = "Donner la nature des triangles en justifiant.";
  this.sup = 1;
  this.sup2 = false;
  this.titre = titre;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.nbQuestionsModifiable = false;
  this.classe = 5;

  this.listePackages = `bclogo`;

  let type_de_questions_disponibles;

  this.nouvelleVersion = function (numeroExercice) {
    if (this.classe == 6) {
      if (this.sup == 1) {
        this.nbQuestions = 4;
      } else {
        //this.nbQuestions = 9;
        this.nbQuestions = 5;
      }
    } else if (this.classe == 5) {
      //this.nbQuestions = 11;
      this.nbQuestions = 5;
    }

    let texte_intro = ``;
    if (sortieHtml) {
      if (this.classe == 6) {
        texte_intro += `- Un <b>triangle quelconque</b> est un triangle qui ne présente aucune relation particulière entre ses angles ou ses côtés.`;
        texte_intro += `<br>`;
        texte_intro += `- Un <b>triangle isocèle</b> est un triangle qui a deux côtés de même longueur.`;
        texte_intro += `<br>`;
        texte_intro += `- Un <b>triangle équilatéral</b> est un triangle qui a trois côtés de même longueur.`;
        texte_intro += `<br>`;
        texte_intro += `- Un <b>triangle rectangle</b> est un triangle qui a un angle droit.`;
      } else if (this.classe == 5) {
        texte_intro += `- Un <b>triangle quelconque</b> est un triangle qui ne présente aucune relation particulière entre ses angles ou ses côtés.`;
        texte_intro += `<br>`;
        texte_intro += `- Un <b>triangle isocèle</b> est un triangle qui a deux côtés ou deux angles de même mesure.`;
        texte_intro += `<br>`;
        texte_intro += `- Un <b>triangle équilatéral</b> est un triangle qui a trois côtés ou trois angles de même mesure.`;
        texte_intro += `<br>`;
        texte_intro += `- Un <b>triangle rectangle</b> est un triangle qui a un angle droit.`;
      }
      // this.introduction = lampe_message({
      // 	titre : `Quelques définitions`,
      // 	texte : texte_intro,
      // 	couleur : `nombres`
      // });
      this.boutonAide = modalTexteLong(
        numeroExercice,
        //`<i class="lightbulb outline icon"></i> Quelques définitions`,
        `<i class="info circle icon"></i> Quelques définitions`,
        texte_intro,
        "Aide",
        "info circle"
      );
    } else {
      if (this.classe == 6) {
        texte_intro = texEnumerate_sans_numero(
          [
            `- Un \\textbf{triangle quelconque} est un triangle qui ne présente aucune relation particulière entre ses angles ou ses côtés.`,
            `- Un \\textbf{triangle isocèle} est un triangle qui a deux côtés de même longueur.`,
            `- Un \\textbf{triangle équilatéral} est un triangle qui a trois côtés de même longueur.`,
            `- Un \\textbf{triangle rectangle} est un triangle qui a un angle droit.`,
          ],
          1
        );
      } else if (this.classe == 5) {
        texte_intro = texEnumerate_sans_numero(
          [
            `- Un \\textbf{triangle quelconque} est un triangle qui ne présente aucune relation particulière entre ses angles ou ses côtés.`,
            `- Un \\textbf{triangle isocèle} est un triangle qui a deux côtés ou deux angles de même mesure.`,
            `- Un \\textbf{triangle équilatéral} est un triangle qui a trois côtés ou trois angles de même mesure.`,
            `- Un \\textbf{triangle rectangle} est un triangle qui a un angle droit.`,
          ],
          1
        );
      }

      this.introduction = lampe_message({
        titre: `Quelques définitions`,
        texte: texte_intro,
        couleur: `nombres`,
      });
    }

    if (this.classe == 6) {
      if (this.sup == 1) {
        type_de_questions_disponibles = [1, 3, 5, 7]; //6e facile isocèle, équilatéral et rectangle.
      } else if (this.sup == 2) {
        //type_de_questions_disponibles = [1,3,4,5,6,7,8,9]; //6e tout sauf par les angles
        type_de_questions_disponibles = [1, 4, 6, 8, 9]; //6e les autres cas sauf par les angles
      }
    } else if (this.classe == 5) {
      // type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9,10,11]; // 5e : on ajoute la caractéisation par les angles
      type_de_questions_disponibles = [
        choice([1, 2]),
        choice([3, 4, 10]),
        choice([5, 6, 11]),
        7,
        choice([8, 9]),
      ]; // 5e : tout sauf les basiques de 6e, on ajoute la caractéisation par les angles
    }
    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"


    //let listeTypeDeQuestions = type_de_questions_disponibles // Tous les types de questions sont posées --> à remettre comme ci dessus
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, l1, l2, l3, a1, a2, a3, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on fixe longueur min et max en cm
      let l_min = 2;
      let l_max = 20;
      // on fixe angle min et max en degré
      let a_min = 30;
      let a_max = 100;

      // on crée les triangles
      let triangle_quelconque = new Triangles();
      let triangle_isocele = new Triangles();
      let triangle_equilateral = new Triangles();
      let triangle_rectangle = new Triangles();
      let triangle_isocele_rectangle = new Triangles();
      let partieDecimale1, partieDecimale2, partieDecimale3;
      if (this.sup2) {
        partieDecimale1 = calcul(randint(1, 9) / 10 * randint(0, 1));
        partieDecimale2 = calcul(randint(1, 9) / 10 * randint(0, 1));
        partieDecimale3 = calcul(randint(1, 9) / 10 * randint(0, 1));
      }
      else {
        partieDecimale1 = 0;
        partieDecimale2 = 0;
        partieDecimale3 = 0;
      }
      switch (listeTypeDeQuestions[i]) {
        case 1: // triangle quelconque par les longueurs sans conversion
          while (!triangle_quelconque.isTrueTriangleLongueurs()) {
            l1 = randint(l_min, l_max);
            l2 = randint(l_min, l_max, l1);
            l3 = randint(l_min, l_max, [l1, l2]);
            triangle_quelconque.l1 = l1 + partieDecimale1;
            triangle_quelconque.l2 = l2 + partieDecimale2;
            triangle_quelconque.l3 = l3 + partieDecimale3;
          }

          texte = `${triangle_quelconque.getNom()} est un triangle tel que ${triangle_quelconque.getLongueurs()[0]} $= ${texNombre(triangle_quelconque.l1)}$ cm ; `;
          texte += `${triangle_quelconque.getLongueurs()[1]} $= ${texNombre(triangle_quelconque.l2)}$ cm et ${triangle_quelconque.getLongueurs()[2]} $= ${texNombre(
            triangle_quelconque.l3)}$ cm.`;
          texteCorr = `Les 3 côtés du triangle ${triangle_quelconque.getNom()} sont différents donc ${triangle_quelconque.getNom()} est un triangle quelconque.`;
          break;
        case 2: // triangle quelconque par les angles
          while (!triangle_quelconque.isTrueTriangleAngles()) {
            a1 = randint(a_min, a_max);
            a2 = randint(a_min, a_max, a1);
            a3 = randint(a_min, a_max, [a1, a2]);
            triangle_quelconque.a1 = a1;
            triangle_quelconque.a2 = a2;
            triangle_quelconque.a3 = a3;
          }

          texte = `${triangle_quelconque.getNom()} est un triangle tel que ${triangle_quelconque.getAngles()[0]} $= ${triangle_quelconque.a1}\\degree$ ; `;
          texte += ` ${triangle_quelconque.getAngles()[1]} $= ${triangle_quelconque.a2}\\degree$ et  ${triangle_quelconque.getAngles()[2]} $= ${triangle_quelconque.a3}\\degree$ .`;
          texteCorr = `Les 3 angles du triangle ${triangle_quelconque.getNom()} sont différents donc ${triangle_quelconque.getNom()} est un triangle quelconque.`;
          break;

        case 3: // triangle isocèle sans conversion
          while (!triangle_isocele.isTrueTriangleLongueurs()) {
            l1 = randint(l_min, l_max);
            l2 = randint(l_min, l_max, l1);
            triangle_isocele.l1 = l1 + partieDecimale1;
            triangle_isocele.l2 = l1 + partieDecimale1;
            triangle_isocele.l3 = l2 + partieDecimale2;
          }
          texte = `${triangle_isocele.getNom()} est un triangle tel que ${triangle_isocele.getLongueurs()[0]} $= ${texNombre(triangle_isocele.l1)}$ cm ; `;
          texte += `${triangle_isocele.getLongueurs()[1]} $= ${texNombre(triangle_isocele.l2)}$ cm et ${triangle_isocele.getLongueurs()[2]} $= ${texNombre(triangle_isocele.l3)}$ cm.`;
          texteCorr = `Les longueurs des côtés ${triangle_isocele.getCotes()[0]} et ${triangle_isocele.getCotes()[1]} du triangle ${triangle_isocele.getNom()} valent toutes les deux $${texNombre(triangle_isocele.l1)}$ cm donc ${triangle_isocele.getNom()} est un triangle isocèle en ${triangle_isocele.getSommets()[1]}.`;
          break;
        case 4: // triangle isocèle avec conversion
          while (!triangle_isocele.isTrueTriangleLongueurs()) {
            l1 = randint(l_min, l_max);
            l2 = randint(l_min, l_max, l1);
            triangle_isocele.l1 = l1 + partieDecimale1;
            triangle_isocele.l2 = l1 + partieDecimale1;
            triangle_isocele.l3 = l2 + partieDecimale2;
          }
          texte = `${triangle_isocele.getNom()} est un triangle tel que ${triangle_isocele.getLongueurs()[0]} $= ${triangle_isocele.l1 * 10}$ mm ; `;
          texte += `${triangle_isocele.getLongueurs()[1]} $= ${texNombre(triangle_isocele.l2)}$ cm et ${triangle_isocele.getLongueurs()[2]} $= ${texNombre(triangle_isocele.l3)}$ cm.`;
          texteCorr = `${triangle_isocele.getLongueurs()[0]} $= ${texNombre(triangle_isocele.l1 * 10)}$ mm $= ${texNombre(triangle_isocele.l1)}$ cm = ${triangle_isocele.getLongueurs()[1]}, ${triangle_isocele.getNom()} a donc deux côtés égaux, c'est un triangle isocèle en ${triangle_isocele.getSommets()[1]}.`;
          break;
        case 5: // triangle équilatéral sans conversion
          while (!triangle_equilateral.isTrueTriangleLongueurs()) {
            l1 = randint(l_min, l_max);
            triangle_equilateral.l1 = l1 + partieDecimale1;
            triangle_equilateral.l2 = l1 + partieDecimale1;
            triangle_equilateral.l3 = l1 + partieDecimale1;
          }
          texte = `${triangle_equilateral.getNom()} est un triangle tel que ${triangle_equilateral.getLongueurs()[0]} $= ${texNombre(triangle_equilateral.l1)}$ cm ; `;
          texte += `${triangle_equilateral.getLongueurs()[1]} $= ${texNombre(triangle_equilateral.l2)}$ cm et ${triangle_equilateral.getLongueurs()[2]} $= ${texNombre(triangle_equilateral.l3)}$ cm.`;
          texteCorr = `Les longeurs des trois côtés du triangle ${triangle_equilateral.getNom()} sont égales donc c'est un triangle équilatéral.`;
          break;
        case 6: // triangle équilatéral avec conversion
          while (!triangle_equilateral.isTrueTriangleLongueurs()) {
            l1 = randint(l_min, l_max);
            triangle_equilateral.l1 = l1 + partieDecimale1;
            triangle_equilateral.l2 = l1 + partieDecimale1;
            triangle_equilateral.l3 = l1 + partieDecimale1;
          }
          texte = `${triangle_equilateral.getNom()} est un triangle tel que ${triangle_equilateral.getLongueurs()[0]} $= ${texNombre(triangle_equilateral.l1)}$ cm ; `;
          texte += `${triangle_equilateral.getLongueurs()[1]} $= ${texNombre(triangle_equilateral.l2 * 10)}$ mm et ${triangle_equilateral.getLongueurs()[2]} $= ${texNombre(
            triangle_equilateral.l3 / 10
          )}$ dm.`;
          texteCorr = `${triangle_equilateral.getLongueurs()[1]} $= ${texNombre(triangle_equilateral.l2 * 10)}$ mm $= ${triangle_equilateral.l2}$ cm.`;
          texteCorr += `<br> ${triangle_equilateral.getLongueurs()[2]} $= ${texNombre(triangle_equilateral.l3 / 10)}$ dm $= ${texNombre(triangle_equilateral.l3)}$ cm.`;
          texteCorr += `<br> ${triangle_equilateral.getLongueurs()[0]} $= ${texNombre(triangle_equilateral.l1)}$ cm.`;
          texteCorr += `<br> Les longeurs des trois côtés du triangle ${triangle_equilateral.getNom()} sont égales donc c'est un triangle équilatéral.`;
          break;
        case 7: // triangle rectangle pas de conversion necessaire
          l1 = randint(l_min, l_max);
          triangle_rectangle.l1 = l1 + partieDecimale1;
          triangle_rectangle.l2 = randint(l_min, l_max, l1) + partieDecimale2;
          triangle_rectangle.a1 = 90;

          texte = `${triangle_rectangle.getNom()} est un triangle tel que ${triangle_rectangle.getLongueurs()[0]} $= ${texNombre(triangle_rectangle.l1)}$ cm ; `;
          texte += `${triangle_rectangle.getLongueurs()[1]} $= ${texNombre(triangle_rectangle.l2)}$ cm `;
          texte += `et `;
          if (this.classe == 6) {
            texte += ` qui a un angle droit en ${triangle_rectangle.getSommets()[1]}.`;
            texteCorr = `Le triangle ${triangle_rectangle.getNom()} a un angle droit en ${triangle_rectangle.getSommets()[1]} donc ${triangle_rectangle.getNom()} est rectangle en ${triangle_rectangle.getSommets()[1]}.`;
          } else {
            texte += `${triangle_rectangle.getAngles()[0]} $= ${triangle_rectangle.a1}\\degree$.`;
            texteCorr = `L'angle ${triangle_rectangle.getAngles()[0]} du triangle ${triangle_rectangle.getNom()} est un angle droit donc ${triangle_rectangle.getNom()} est rectangle en ${triangle_rectangle.getSommets()[1]}.`;
          }

          break;
        case 8: // triangle isocèle rectangle sans conversion
          l1 = randint(l_min, l_max);
          triangle_isocele_rectangle.l1 = l1 + partieDecimale1;
          triangle_isocele_rectangle.l2 = triangle_isocele_rectangle.l1;
          triangle_isocele_rectangle.a1 = 90;

          texte = `${triangle_isocele_rectangle.getNom()} est un triangle tel que ${triangle_isocele_rectangle.getLongueurs()[0]}$= ${texNombre(triangle_isocele_rectangle.l1)}$ cm ; `;
          texte += `${triangle_isocele_rectangle.getLongueurs()[1]} $= ${texNombre(triangle_isocele_rectangle.l2)}$ cm `;
          texte += `et `;
          if (this.classe == 6) {
            texte += `qui a un angle droit en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr = `Le triangle ${triangle_isocele_rectangle.getNom()} a un angle droit en ${triangle_isocele_rectangle.getSommets()[1]} donc ${triangle_isocele_rectangle.getNom()} est rectangle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr += `<br> ${triangle_isocele_rectangle.getLongueurs()[0]} $=$ ${triangle_isocele_rectangle.getLongueurs()[1]} $= ${texNombre(triangle_isocele_rectangle.l1)}$ cm donc ${triangle_isocele_rectangle.getNom()} est isocèle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr += `<br> Le triangle ${triangle_isocele_rectangle.getNom()} est donc isocèle et rectangle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
          } else {
            texte += `${triangle_isocele_rectangle.getAngles()[0]} $= ${triangle_isocele_rectangle.a1}\\degree$.`;
            texteCorr = `L'angle ${triangle_isocele_rectangle.getAngles()[0]} du triangle ${triangle_isocele_rectangle.getNom()} est un angle droit donc ${triangle_isocele_rectangle.getNom()} est rectangle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr += `<br> ${triangle_isocele_rectangle.getLongueurs()[0]} $=$ ${triangle_isocele_rectangle.getLongueurs()[1]} $= ${triangle_isocele_rectangle.l1}$ cm donc ${triangle_isocele_rectangle.getNom()} est isocèle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr += `<br> Le triangle ${triangle_isocele_rectangle.getNom()} est donc isocèle et rectangle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
          }
          break;
        case 9: // triangle isocèle rectangle avec conversion
          triangle_isocele_rectangle.l1 = randint(l_min, l_max) + partieDecimale1;
          triangle_isocele_rectangle.l2 = triangle_isocele_rectangle.l1;
          triangle_isocele_rectangle.a1 = 90;

          texte = `${triangle_isocele_rectangle.getNom()} est un triangle tel que ${triangle_isocele_rectangle.getLongueurs()[0]} $= ${texNombre(triangle_isocele_rectangle.l1 * 10)}$ mm ; `;
          texte += `${triangle_isocele_rectangle.getLongueurs()[1]} $= ${texNombre(triangle_isocele_rectangle.l2)}$ cm`;
          texte += ` et `;
          if (this.classe == 6) {
            texte += `qui a un angle droit en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr = `Le triangle ${triangle_isocele_rectangle.getNom()} a un angle droit en ${triangle_isocele_rectangle.getSommets()[1]} donc ${triangle_isocele_rectangle.getNom()} est rectangle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr += `<br> ${triangle_isocele_rectangle.getLongueurs()[0]} $= ${triangle_isocele_rectangle.l1 * 10}$ mm $= ${texNombre(triangle_isocele_rectangle.l1)}$ cm =${triangle_isocele_rectangle.getLongueurs()[1]} donc ${triangle_isocele_rectangle.getNom()} est isocèle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr += `<br> Le triangle ${triangle_isocele_rectangle.getNom()} est donc isocèle et rectangle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
          } else {
            texte += `${triangle_isocele_rectangle.getAngles()[0]} $= ${triangle_isocele_rectangle.a1}\\degree$.`;
            texteCorr = `L'angle ${triangle_isocele_rectangle.getAngles()[0]} du triangle ${triangle_isocele_rectangle.getNom()} est un angle droit donc ${triangle_isocele_rectangle.getNom()} est rectangle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr += `<br> ${triangle_isocele_rectangle.getLongueurs()[0]} $= ${texNombre(triangle_isocele_rectangle.l1 * 10)}$ mm $= ${texNombre(triangle_isocele_rectangle.l1)}$ cm =${triangle_isocele_rectangle.getLongueurs()[1]} donc ${triangle_isocele_rectangle.getNom()} est isocèle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
            texteCorr += `<br> Le triangle ${triangle_isocele_rectangle.getNom()} est donc isocèle et rectangle en ${triangle_isocele_rectangle.getSommets()[1]}.`;
          }
          break;
        case 10: // triangle isocèle par les angles
          a3 = -1;
          while (a3 < 0) {
            triangle_isocele.a1 = randint(a_min, a_max);
            triangle_isocele.a2 = triangle_isocele.a1;
            a3 = 180 - 2 * triangle_isocele.a1;
            triangle_isocele.a3 = a3;
          }
          texte = `${triangle_isocele.getNom()} est un triangle tel que ${triangle_isocele.getAngles()[0]} $= ${triangle_isocele.a1}\\degree$ ; `;
          texte += ` ${triangle_isocele.getAngles()[1]} $= ${triangle_isocele.a2}\\degree$ et  ${triangle_isocele.getAngles()[2]} $= ${triangle_isocele.a3}\\degree$ .`;
          texteCorr = `Le triangle ${triangle_isocele.getNom()} a deux angles égaux, ${triangle_isocele.getAngles()[0]} = ${triangle_isocele.getAngles()[1]} $= ${triangle_isocele.a1}\\degree$ donc ${triangle_isocele.getNom()} est un triangle isocèle en ${triangle_isocele.getSommets()[0]}.`;
          break;
        case 11: // triangle équilatéral par les angles
          triangle_equilateral.a1 = 60;
          triangle_equilateral.a2 = 60;
          triangle_equilateral.a3 = 60;

          texte = `${triangle_equilateral.getNom()} est un triangle tel que ${triangle_equilateral.getAngles()[0]} $= ${triangle_equilateral.a1}\\degree$ ; `;
          texte += ` ${triangle_equilateral.getAngles()[1]} $= ${triangle_equilateral.a2}\\degree$ et  ${triangle_equilateral.getAngles()[2]} $= ${triangle_equilateral.a3}\\degree$.`;
          texteCorr = `Le triangle ${triangle_equilateral.getNom()} a trois angles égaux, ${triangle_equilateral.getAngles()[0]} = ${triangle_equilateral.getAngles()[1]} = ${triangle_equilateral.getAngles()[2]} $= ${triangle_equilateral.a1}\\degree$ donc ${triangle_equilateral.getNom()} est un triangle équilateral.`;
          break;
      }
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };

  if (this.classe == 6) {
    this.besoinFormulaireNumerique = [
      "Niveau de difficulté",
      2,
      "1 : sans conversions de longueurs\n2 : avec conversions de longueurs",
    ];
  }
  this.besoin_formulaire2_case_a_cocher = ["Avec des décimaux", false];
}
