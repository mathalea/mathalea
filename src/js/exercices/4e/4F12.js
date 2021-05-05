import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,calcul,texNombrec,prenomF} from '../../modules/outils.js'
import {point,polyline,axes,labelX,labelY,grille,repere,courbe,courbeInterpolee,texteParPosition,mathalea2d} from '../../modules/2d.js'
export const titre = 'Problème s’appuyant sur la lecture d’une représentation graphique'

/**
 * Problème avec lecture de représentation graphique d'une fonction
 * @Auteur Rémi Angot
 * Référence 4F12
 */
export default function Exploiter_representation_graphique() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 1;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.nbQuestionsModifiable = false;
  this.sup = 4;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_probleme
    if (this.sup == 1) {
      type_de_probleme = "projectile"
    }
    if (this.sup == 2) {
      type_de_probleme = "velo"
    }
    if (this.sup == 3) {
      type_de_probleme = "temperature"
    }
    if (this.sup == 4) {
      type_de_probleme = choice(["temperature", "projectile", "velo"]);
    }
    let a, f, t1, l,l1, l2, g1, g2,g3, r, graphique, texte1, texte2,fille;
    switch (type_de_probleme) {
      case "projectile":
        // Parabole qui a pour zéro, 0 et 6,8 ou 10
        // Et qui a pour maximum un multiple de 5
        t1 = choice([6, 8, 10]);
        a = (1 / ((-t1 / 2) * (t1 / 2 - t1))) * choice([10, 15, 20, 25, 30]); // on divise par l'image du max et on multiplie par la valeur souhaitée
        f = (x) => calcul(-a * x * (x - t1));

        // Mettre des dixièmes de secondes à la place des secondes
        let xscale = choice([1, 0.1]);
        g1 = grille(-1, -1, t1 + 2, 8);
        g1.color = "black";
        g1.opacite = 1;
        g2 = grille(-1, -1, t1 + 2, 8, "gray", 0.2, 0.2);
        g3 = axes(0, 0, t1 + 1, 8);
        texte1 = texteParPosition("hauteur (en mètre)", 0.2, 7.3, "droite");
        l1 = labelX(0, calcul((t1 + 1) * xscale), 1, "black", -0.6, xscale);
        l2 = labelY(5, 35, 1, "black", -0.6, 5);
        graphique = courbe(f, 0, t1, "blue", 2, [1, 5]);
        texte2 = texteParPosition("temps (en s)", t1 + 0.5, 0.4, "droite");

        this.introduction =
          "On a représenté ci-dessous l’évolution de la hauteur d’un projectile lancé depuis le sol (en mètre) en fonction du temps (en seconde).";

        this.introduction +=
          "<br><br>" +
          mathalea2d(
            {
              xmin: -1,
              ymin: -1,
              xmax: t1 + 3,
              ymax: 8,
              pixelsParCm: 30,
              scale: .6,
            },
            g1,
            g2,
            g3,
            graphique,
            texte1,
            texte2,
            l1,
            l2
          );

        this.introduction +=
          "<br><br>" +
          "À l’aide de ce graphique, répondre aux questions suivantes :";

        this.listeQuestions.push(
          "Au bout de combien de temps le projectile retombe-t-il au sol ?"
        );
        this.listeCorrections.push(
          `Au bout de ${texNombrec(
            t1 * xscale
          )} s, le projectile retombe au sol car la courbe passe par le point de coordonnées $(${texNombrec(
            t1 * xscale
          )}~;~0)$.`
        );

        this.listeQuestions.push(
          "Quelle est la hauteur maximale atteinte par le projectile ?"
        );
        this.listeCorrections.push(
          `Le point le plus haut de la courbe a pour abscisse $${texNombrec(
            (t1 / 2) * xscale
          )}$ et pour ordonnée $${f(
            t1 / 2
          )}$ donc la hauteur maximale est de $${f(t1 / 2)}$ m.`
        );

        break;
      case 'velo':
        let v1 = randint(1, 4)
        let v2 = randint(1, 3, v1)
        let v3 = v1 + v2
        g1 = grille(-1, -1, 6, 8)
        g1.color = 'black'
        g1.opacite = 1
        g2 = grille(-1, -1, 6, 8, 'gray', .2, .2)
        g3 = axes(0, 0, 6, 7)
        texte1 = texteParPosition('distance (en km)', 0.2, 7.3, 'droite')
        l1 = labelX(0, 50, 1, 'black', -.6, 10)
        l2 = labelY(1, 6, 1, 'black', -.6, 1)
        texte2 = texteParPosition('temps (en min)', 6.5, 0.4, 'droite')
        let situation = randint(1, 3)
        let tempsPause
        let periodeRapide
        if (situation == 1) {
          l = polyline(point(0, 0), point(1, v1), point(2, v1 + v2), point(3, v1 + v2), point(4, 0))
          tempsPause = 20
          periodeRapide = 'de la 20e à la 30e minute'
        }
        if (situation == 2) {
          l = polyline(point(0, 0), point(1, v3), point(2, v3), point(3, v2), point(4, 0))
          tempsPause = 10
          periodeRapide = 'durant les 10 premières minutes'

        }
        if (situation == 3) {
          l = polyline(point(0, 0), point(1, v3), point(2, v2), point(3, v2), point(4, 0))
          tempsPause = 20
          periodeRapide = 'durant les 10 premières minutes'
        }
        l.epaisseur = 2
        l.color = 'blue'

        fille = prenomF()
        this.introduction = `${fille} fait du vélo avec son smartphone sur une voie-verte rectiligne qui part de chez elle. Une application lui permet de voir à quelle distance de chez elle, elle se trouve.`

        this.introduction += '<br><br>' + mathalea2d({
          xmin: -1,
          ymin: -1,
          xmax: 9,
          ymax: 8,
          pixelsParCm: 40,
        }, g1, g2, g3, l, texte1, texte2, l1, l2)

        this.introduction += '<br><br>' + 'À l’aide de ce graphique, répondre aux questions suivantes :'

        this.listeQuestions.push('Pendant combien de temps a-t-elle fait du vélo ?')
        this.listeCorrections.push(`Elle a fait du vélo pendant 40 minutes.`)

        this.listeQuestions.push('Quelle distance a-t-elle parcourue au total ?')
        this.listeCorrections.push(`Le point le plus loin de sa maison est à ${v3} km et ensuite elle revient chez elle, donc la distance totale est de ${2 * v3} km.`)

        this.listeQuestions.push(`Que se passe-t-il après ${tempsPause} minutes de vélo ?`)
        this.listeCorrections.push(`La distance reste constante alors qu'elle est sur un chemin rectiligne. Elle a donc fait une pause.`)

        this.listeQuestions.push('À quel moment a-t-elle été la plus rapide ?')
        this.listeCorrections.push(`Elle a été la plus rapide ${periodeRapide} où elle a effectué ${v3} km en 10 minutes.`)


        break;
      case "temperature":
        let hmin = randint(2, 4)
        let hmax = randint(12, 16)
        let tmin = randint(-5, 15)
        let tmax = tmin + randint(5, 12)

        r = repere({
          xmin: 0,
          ymin: tmin - 1,
          ymax: tmax + 2,
          xmax: 24,
          xscale: 2,
          legendeX: "Heure",
          legendeY: "Température (en °C)",
        });
        graphique = courbeInterpolee(
          [
            [-2, tmin + 2],
            [hmin, tmin],
            [hmax, tmax],
            [26, tmin + 2],
          ],
          "blue",
          2,
          r,
          0,
          24
        );
        this.introduction =
          "On a représenté ci-dessous l’évolution de la température sur une journée.";
        this.introduction +=
          "<br><br>" +
          mathalea2d(
            {
              xmin: -1,
              ymin: tmin - 2.5,
              xmax: 16,
              ymax: tmax + 3,
              pixelsParCm: 40,
            },
            r,
            graphique
          );

        this.introduction +=
          "<br><br>" +
          "À l’aide de ce graphique, répondre aux questions suivantes :";

        this.listeQuestions.push(
          "Quelle est la température la plus froide de la journée ?"
        );
        this.listeCorrections.push(`La température la plus basse est ${tmin}°C.`)

        this.listeQuestions.push(
          "Quelle est la température la plus chaude de la journée ?"
        );
        this.listeCorrections.push(`La température la plus élevée de la journée est ${tmax}°C.`)
        this.listeQuestions.push(
          "À quelle heure fait-il le plus chaud ?"
        );
        this.listeCorrections.push(`C'est à ${hmax} h qu'il fait le plus chaud.`)
        this.listeQuestions.push(
          "À quelle heure fait-il le plus froid ?"
        );
        this.listeCorrections.push(`C'est à ${hmin} h qu'il fait le plus froid.`)


        break;
    }

    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ['Choix du problème', 3, "1 : Projectile\n2 : Trajet à vélo\n3 : Température\n4 : Au hasard"];
}

