import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,range,combinaisonListes,arrondi,calcul,texNombrec,prenomF,prenomM,texNombre,miseEnEvidence,tex_prix} from '../../modules/outils.js'
export const titre = 'Reconnaître une situation de proportionnalité'

/**
 * Exercice sur la notion de proportionnalité (ou pas)
 * @Auteur Jean-Claude Lhote
 * référence 6P10
 */
export default function Proportionnalite_pas_proportionnalite() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Répondre aux questions posées en justifiant";
  sortieHtml ? this.spacing = 2 : this.spacing = 1.4;
  sortieHtml ? this.spacingCorr = 1.5 : this.spacingCorr = 1;
  this.nbQuestions = 5;
  this.nbColsCorr = 1;
  this.nbCols = 1;
  this.nbColsModifiable = false;
  this.nbColsCorrModifiable = false;
  this.sup=false

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let liste_index_disponibles = [0, 1, 2, 3, 4];
    let liste_index = combinaisonListes(
      liste_index_disponibles,
      this.nbQuestions
    );
    let liste_choix_disponibles
    if (this.sup) liste_choix_disponibles = [1, 2, 3, 4, 5];
    else liste_choix_disponibles=[1, 2, 3, 4, 5, 6];
    let liste_choix = combinaisonListes(
      liste_choix_disponibles,
      this.nbQuestions
    );
    let liste_de_lieux = [
      "dans un magasin de bricolage",
      "dans une animalerie",
      "au supermarché local",
      "à l'épicerie",
      "dans la boutique du musée",
    ];
    let liste_de_choses = [[]];
    let liste_de_prix_unit = [[]];
    let tirages = [[]];
    let index3 = [];
    let villes = ["Moscou", "Berlin", "Paris", "Bruxelles", "Rome", "Belgrade"];
    let verbes = [
      "double",
      "triple",
      "quadruple",
      "est multiplié par 5",
      "est multiplié par 6",
    ];
    liste_de_choses[0] = [
      "articles",
      "outils",
      "accessoires",
      "pièces d'outillage",
      "pinceaux",
      "ampoules",
      "tournevis",
      "spatules",
      "raccords de tuyaux",
    ];
    liste_de_choses[1] = [
      "poissons rouges",
      "canetons",
      "perruches",
      "phasmes",
      "colliers anti-puces",
      "souris",
      "lapereaux",
      "paquets de graines",
    ];
    liste_de_choses[2] = [
      "sets de tables",
      "verres",
      "assiettes",
      "os à macher",
      "dosettes de café",
      "packs de lait",
      "paquets de pâtes",
    ];
    liste_de_choses[3] = [
      "mangues",
      "ananas",
      "fruits de la passion",
      "melons",
      "paquets de madeleines de Commercy",
      "bergamottes",
      "bredeles",
      "pots de cancoillotte",
    ];
    liste_de_choses[4] = [
      "cartes",
      "livres",
      "gravures",
      "puzzles",
      "maquettes",
      "roches",
      "jeux de société",
    ];
    liste_de_prix_unit[0] = [5, 4, 1.25, 3, 0.5, 1.5, 2, 6, 4.5];
    liste_de_prix_unit[1] = [1.5, 7, 20, 2.5, 25, 2, 15, 8];
    liste_de_prix_unit[2] = [1.25, 1.5, 2, 0.5, 5, 4.5, 3];
    liste_de_prix_unit[3] = [2, 2.5, 1.25, 1.5, 4, 7, 12, 3];
    liste_de_prix_unit[4] = [0.5, 5, 7, 13.5, 10, 15, 20];

    for (
      let i = 0,
      x,
      y,
      z,
      pu,
      n,
      p,
      somme,
      prenoms,
      index1,
      index2,
      objet,
      met,
      texte,
      texteCorr,
      cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (liste_choix[i]) {
        case 1:
          index1 = liste_index[i];
          prenoms = [prenomF(), prenomM()];
          index2 = randint(0, liste_de_choses[index1].length - 1);
          objet = liste_de_choses[index1][index2];
          pu =
            liste_de_prix_unit[index1][index2] *
            (1 + randint(1, 2) * 0.2 * randint(-1, 1));
          y = randint(2, 5);
          somme = calcul(y * pu, 2);
          p = y * randint(2, 5);
          z = calcul(p * pu, 2);
          texte = `${prenoms[0]} achète ${liste_de_lieux[index1]} des ${objet}. `;
          texte += `Elle  repart avec ${y} ${objet} pour $${tex_prix(
            somme
          )}$€. ${prenoms[1]
            } achète quant à lui, au même endroit ${p} ${objet} pour $${tex_prix(
              z
            )}$€.<br>`;
          texte += `Le prix des ${objet} est-il proportionnel à la quantité achetée  ?<br>`;
          texteCorr = `${prenoms[0]} dépense $${miseEnEvidence(
            tex_prix(somme),
            "blue"
          )}$€.<br>`;
          texteCorr = `${prenoms[1]} a acheté  $${miseEnEvidence(
            texNombre(p / y)
          )}$ fois la quantité des ${objet} achetée par ${prenoms[0]
            } pour $${miseEnEvidence(
              tex_prix(somme),
              "blue"
            )}$€.<br>Il a payé $${tex_prix(z)}$€ $=${miseEnEvidence(
              texNombrec(p / y)
            )}\\times${miseEnEvidence(tex_prix(somme), "blue")}$€.<br>`;
          texteCorr += `A l'aide de ces données, on constate que le prix des ${objet} et leur quantité sont tous les deux multipliés par le même nombre, donc ces deux grandeurs sont proportionnelles.<br>`;
          break;
        case 2:
          index1 = liste_index[i];
          prenoms = [prenomF(), prenomM()];
          index2 = randint(0, liste_de_choses[index1].length - 1);
          objet = liste_de_choses[index1][index2];
          pu =
            liste_de_prix_unit[index1][index2] *
            (1 + randint(1, 2) * 0.2 * randint(-1, 1));
          y = randint(2, 5);
          somme = calcul(y * pu, 2);
          pu -= 0.1;
          p = y * randint(2, 5);
          z = calcul(p * pu, 2);
          texte = `${prenoms[0]} achète ${liste_de_lieux[index1]} des ${objet}. `;
          texte += `Elle a obtenu ${y} ${objet} pour $${tex_prix(somme)}$€. ${prenoms[1]
            } achète quant à lui, au même endroit ${p} ${objet} pour $${tex_prix(
              z
            )}$€.<br>`;
          texte += `Le prix des ${objet} est-il proportionnel à la quantité achetée  ?<br>`;
          texteCorr = `${prenoms[0]} dépense $${miseEnEvidence(
            tex_prix(somme),
            "blue"
          )}$€.<br>`;
          texteCorr = `${prenoms[1]} a acheté  $${miseEnEvidence(
            texNombrec(p / y)
          )}$ fois la quantité des ${objet} achetée par ${prenoms[0]
            } pour $${miseEnEvidence(
              tex_prix(somme),
              "blue"
            )}$€.<br>Il a payé $${tex_prix(z)}$€.<br>Mais $${miseEnEvidence(
              texNombrec(p / y)
            )}\\times${miseEnEvidence(tex_prix(somme), "blue")}$€ $=${tex_prix(
              calcul((p * somme) / y)
            )}$€.<br>`;
          texteCorr += `À l'aide de ces données, on constate que le prix unitaire des ${objet} n'est pas le même pour ${prenoms[0]} qui en a acheté $${y}$ que pour ${prenoms[1]} qui en a acheté ${p}, donc ces deux grandeurs ne sont pas proportionnelles.<br>`;
          break;
        case 3:
          prenoms = [prenomF(), prenomM()];
          x = randint(5, 20);
          y = randint(5, 20, x) * 100;
          x = x * 100;
          n = arrondi(calcul((x / 60) * (1 + randint(0, 2) * 0.2)), 0);
          p = arrondi(calcul((y / 60) * (1 + randint(0, 2) * 0.2)), 0);
          index1 = calcul(x / n); //vitesse fille
          index2 = calcul(y / p); //vitesse garçon

          texte = `${prenoms[0]} habite à $${texNombre(x)}$ m du collège. Elle met ${n} minutes pour s'y rendre depuis chez elle.<br>`;
          texte += `${prenoms[1]}, lui, habite à $${texNombre(y)}$ m du collège. Il met ${p} minutes pour s'y rendre depuis chez lui.<br>`;
          texte += `Le temps mis pour venir au collège est-il proportionnel à la distance du foyer au collège ?<br>`;
          texteCorr = `${prenoms[0]} parcourt chaque minute environ $${texNombrec(arrondi(index1, 1))}$ m.<br>`;
          texteCorr += `${prenoms[1]
            } parcourt chaque minute environ $${texNombrec(arrondi(index2, 1))}$ m.<br>`;
          if (index1 == index2)
            texteCorr += `Pour ces deux élèves le temps mis et la distance parcourue sont proportionnelles (si l'on compare leur vitesse moyenne)`;
          else
            texteCorr += `Pour ces deux élèves le temps mis et la distance parcourue ne sont pas proportionnelles (si l'on compare leur vitesse moyenne).<br>`;
          break;
        case 4:
          prenoms = [prenomF(), prenomM()];
          x = randint(5, 20);
          y = x + randint(25, 35);
          texte = `${prenoms[0]} vient d'avoir ${x} ans cette année. Son père ${prenoms[1]} vient de fêter  son ${y}ème anniversaire.<br>`;
          texte += `L'âge de son père est-il proportionnel à l'âge de ${prenoms[0]} ?<br>`;
          texteCorr = `Aujourd'hui la différence d'âge entre ${prenoms[0]
            } et ${prenoms[1]} est de ${y - x} ans.<br>`;
          texteCorr += `Dans ${x} années, ${prenoms[0]} aura ${2 * x
            } ans, c'est à dire le double d'aujourd'hui.<br>`;
          texteCorr += `Son père ${prenoms[1]} aura ${x + y
            } ans cette année-là.<br>Quand l'âge de ${prenoms[0]
            } double, l'âge de ${prenoms[1]} ne double pas, donc l'âge de ${prenoms[0]
            } et l'âge de son père ne sont pas propotionnels.<br>`;
          break;
        case 5:
          index1 = randint(0, 5);
          index2 = randint(0, 4);
          texte = `Une épidémie se répand dans la ville de ${villes[index1]}.<br>`;
          texte += `Le nombre de malades ${verbes[index2]} tous les ${index2 + 2
            } jours.<br>`;
          texte += `Le nombre de malades est-il proportionnel au nombre de jours passés depuis le début de l'épidémie ?<br>`;
          texteCorr = `Admettons qu'il y ait 10 malades le premier jour. Le ${1 + 2 + index2
            }ème jour il y aura $10 \\times ${index2 + 2} = ${10 * (index2 + 2)
            }$ malades.<br>`;
          texteCorr += `Entre le premier jour et le ${3 + index2
            }ème jour, le nombre de malades est multiplié par ${index2 + 2
            } mais le nombre de jours est multiplié par ${3 + index2}.<br>`;
          texteCorr += `Donc le nombre de malades n'est pas proportionnel au nombre de jours passés.<br>`;
          break;
        case 6:
          prenoms = [prenomF(), prenomM()];
          index1 = randint(0, 5);
          objet = liste_de_choses[4][index1];
          index2 = randint(0, 4);
          pu =
            liste_de_prix_unit[4][index1] *
            (1 + randint(1, 2) * 0.2 * randint(-1, 1));
          n = randint(2, 6);
          p = randint(0, 3);
          tirages[0] = [n, n * pu];
          tirages[1] = [n + 1, (n + 1) * pu];
          tirages[2] = [2 * n + 1, (2 * n + 1) * pu];
          tirages[3] = [3 * n + 3, (3 * n + 3) * pu];
          met = choice([true, false]);
          if (!met) tirages[p][1] -= 0.1;
          texte = `${prenoms[1]} relève les prix des ${objet} sur un catalogue par correspondance en fonction de la quantité saisie dans le panier<br>`;
          texte += `Il note les prix dans le tableau suivant :<br> <br>`;
          texte += `$\\def\\arraystretch{1.5}\\begin{array}{|c`; // construction du tableau des effectifs en un seul morceau
          for (let j = 0; j <= tirages.length; j++) texte += `|c`;
          texte += `|}\\hline  \\text{${objet}}`;
          for (let j = 0; j < tirages.length; j++) texte += `&${tirages[j][0]}`;
          texte += `\\\\\\hline \\text{Prix (en €})`;
          for (let j = 0; j < tirages.length; j++)
            texte += `&${tex_prix(arrondi(tirages[j][1], 2))}`;
          texte += `\\\\\\hline\\end{array}$<br> <br>`;
          texte += `Le prix des ${objet} est-il proportionnel à la quantité achetée ?<br>`;
          texteCorr = `Il faut calculer le prix unitaire des ${objet} dans chaque cas de figure :<br><br>`;
          if (met) index3 = range(3);
          else index3 = range(3, [p]);
          texteCorr += `$`;
          for (let j = 0; j < index3.length; j++) {
            texteCorr += `\\dfrac{${tex_prix(
              arrondi(tirages[index3[j]][1], 2)
            )}}{${tirages[index3[j]][0]}}=`;
          }
          texteCorr += `${tex_prix(pu)}$<br><br>`;
          if (!met) {
            texteCorr += `Mais $\\dfrac{${tex_prix(
              arrondi(tirages[p][1], 2)
            )}}{${tirages[p][0]}}=${tex_prix(
              arrondi(calcul(tirages[p][1] / tirages[p][0]), 2)
            )}$€/${objet.substring(0, objet.length - 1)}<br>`;
            texteCorr += `Le prix des ${objet} n'est pas proportionnel à leur nombre.<br>`;
          } else {
            texteCorr += `Le prix des ${objet} est bien proportionnel à leur nombre.<br>`;
          }
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
    listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
  };
  this.besoinFormulaireCaseACocher=['Sans tableau',false]
}

