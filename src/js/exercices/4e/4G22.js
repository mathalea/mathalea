import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice, enleveElement } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { calcul, texNombre, texNombrec } from '../../modules/outils/texNombres.js'
import { creerNomDePolygone } from '../../modules/outils/strings.js'
export const titre = 'Résoudre des problèmes utilisant le théorème de Pythagore'

/**
 * Problèmes utilisant le théorème de Pythagore ou sa réciproque et des propriétés des quadrilatères particuliers.
 *
 * * Dans un losange, on connaît la longueur du côté et une diagonale, il faut calculer l'autre.
 * * Dans un rectangle on connaît la longueur et une diagonale, il faut calculer la largeur.
 * * Dans un rectangle on connaît la longueur et la largeur, il faut calculer la diagonale.
 * * Est-ce qu'un parallélogramme est un losange ? On peut démontrer que les diagonales sont perpendiculaires ou pas.
 * * Est-ce qu'un parallélogramme est un rectangle ? On peut démontrer qu'il possède un angle droit ou pas .
 * @author Rémi Angot
 * 4G22
 */
export const uuid = 'b18e8'
export const ref = '4G22'
export default function ProblemesPythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.sup = 3
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1.5)

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    this.sup = parseInt(this.sup)
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [
        'losange',
        'rectangle_diagonale_connue',
        'rectangle_diagonale_a_trouver'
      ]
    } else if (this.sup === 2) {
      if (this.nbQuestions > 2) {
        typesDeQuestionsDisponibles = [
          'parallelogramme_est_losange',
          'parallelogramme_n_est_pas_losange',
          'parallelogramme_est_rectangle',
          'parallelogramme_n_est_pas_rectangle'
        ]
      } else {
        typesDeQuestionsDisponibles = [
          choice(['parallelogramme_est_losange', 'parallelogramme_n_est_pas_losange']),
          choice(['parallelogramme_est_rectangle', 'parallelogramme_n_est_pas_rectangle'])
        ]
      }
    } else {
      if (this.nbQuestions >= 5) {
        typesDeQuestionsDisponibles = [
          'losange',
          'rectangle_diagonale_connue',
          'rectangle_diagonale_a_trouver',
          'parallelogramme_est_losange',
          'parallelogramme_n_est_pas_losange',
          'parallelogramme_est_rectangle',
          'parallelogramme_n_est_pas_rectangle'
        ]
      } else {
        typesDeQuestionsDisponibles = [
          'losange',
          'rectangle_diagonale_connue',
          'rectangle_diagonale_a_trouver',
          choice(['parallelogramme_est_losange', 'parallelogramme_n_est_pas_losange']),
          choice(['parallelogramme_est_rectangle',
            'parallelogramme_n_est_pas_rectangle'])
        ]
      }
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    const listeTripletsPythagoriciens = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [7, 24, 25],
      [8, 15, 17],
      [9, 12, 15],
      [9, 40, 41],
      [10, 24, 26],
      [11, 60, 61],
      [12, 16, 20],
      [12, 35, 37],
      [13, 84, 85],
      [14, 48, 50],
      [15, 20, 25],
      [15, 36, 39],
      [16, 30, 34],
      [16, 63, 65],
      [18, 24, 30],
      [18, 80, 82],
      [20, 21, 29],
      [20, 48, 52],
      [21, 28, 35],
      [21, 72, 75],
      [24, 32, 40],
      [24, 45, 51],
      [24, 70, 74],
      [25, 60, 65],
      [27, 36, 45],
      [28, 45, 53],
      [28, 96, 100],
      [30, 40, 50],
      [30, 72, 78],
      [32, 60, 68],
      [33, 44, 55],
      [33, 56, 65],
      [35, 84, 91],
      [36, 48, 60],
      [36, 77, 85],
      [39, 52, 65],
      [39, 80, 89],
      [40, 42, 58],
      [40, 75, 85],
      [42, 56, 70],
      [45, 60, 75],
      [48, 55, 73],
      [48, 64, 80],
      [51, 68, 85],
      [54, 72, 90],
      [57, 76, 95],
      [60, 63, 87],
      [60, 80, 100],
      [65, 72, 97]
    ]
    let listeNomsQuadrilateres = ['L', 'M', 'N', 'O']
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (i % 3 === 0) listeNomsQuadrilateres = ['LMNOQD'] // lettres à éviter
      const nomQuadrilatere = creerNomDePolygone(4, listeNomsQuadrilateres)
      listeNomsQuadrilateres.push(nomQuadrilatere)
      const A = nomQuadrilatere[0]
      const B = nomQuadrilatere[1]
      const C = nomQuadrilatere[2]
      const D = nomQuadrilatere[3]
      const O = 'O'
      const triplet = choice(listeTripletsPythagoriciens)
      enleveElement(listeTripletsPythagoriciens, triplet) // Supprime le triplet pour les prochaines questions
      let a = triplet[0]
      let b = triplet[1]
      let c = triplet[2]
      if (
        listeTypeDeQuestions[i] === 'parallelogramme_n_est_pas_losange' ||
        listeTypeDeQuestions[i] === 'parallelogramme_n_est_pas_rectangle'
      ) {
        do {
          c = triplet[2] + randint(-3, 3, [0]) // on change la valeur de c
          while (a ** 2 + b ** 2 === c ** 2) {
          // si par hasard (est-ce possible ?) on retombe sur un triplet pythagoricien on change les valeurs
            c += randint(-3, 3, [0]) // on change la valeur de c
            b += randint(-3, 3, [0]) // on change la valeur de b
          }
        } while (c <= a || c <= b || c >= a + b)
      }
      if (a > 9 && choice([true, true, true, false])) {
        // le plus souvent on utilise des décimaux
        a = calcul(a / 10)
        b = calcul(b / 10)
        c = calcul(c / 10)
      }

      switch (listeTypeDeQuestions[i]) {
        case 'losange':
          texte = `$${nomQuadrilatere}$ est un losange de centre $O$ tel que $${A + B
            }=${texNombre(c)}$ cm et $${A + C}=${texNombre(2 * a)}$ cm.<br>`
          texte += `Calculer $${D + B}$.`

          if (context.isHtml) {
            texteCorr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id="mtg32svg#6"/><text x="185.5" y="32.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><text x="220.5" y="134.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><line x1="190.5" y1="43.44" x2="216.5" y2="129.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="144.54431444308477" y="133.14525664249953" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="190.5" y1="43.44" x2="163.54431444308477" y2="129.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="183.54431444308474" y="234.14525664249953" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><line x1="216.5" y1="129.44" x2="189.54431444308474" y2="215.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="189.54431444308474" y1="215.14525664249953" x2="163.54431444308477" y2="129.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><g  id=""><line x1="208.86483613904568" y1="86.9074753482156" x2="199.2927218660596" y2="89.80137036097884" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="207.7072781339404" y1="83.07862963902116" x2="198.13516386095432" y2="85.9725246517844" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="207.19175809011574" y1="175.70062312711323" x2="197.652449829911" y2="172.70035681946817" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="208.39186461317377" y1="171.88489982303136" x2="198.85255635296903" y2="168.8846335153863" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="171.1794783040391" y1="171.67778129428393" x2="180.75159257702518" y2="168.78388628152072" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="172.33703630914437" y1="175.50662700347834" x2="181.90915058213045" y2="172.61273199071513" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="181.19175809011574" y1="89.70062312711323" x2="171.652449829911" y2="86.7003568194682" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="182.39186461317377" y1="85.88489982303133" x2="172.85255635296903" y2="82.8846335153863" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><text x="176.02215722154236" y="144.29262832124977" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text><g  id=""><line x1="198.79500694133887" y1="129.34145667941502" x2="198.84383529950412" y2="120.56860695961849" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(255,0,0);"/><line x1="190.0709855797076" y1="120.51977860145324" x2="198.84383529950412" y2="120.56860695961849" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(255,0,0);"/></g><line x1="190.5" y1="43.44" x2="190.02215722154236" y2="129.29262832124977" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="189.54431444308474" y2="215.14525664249953" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="163.54431444308477" y2="129.14525664249953" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="216.5" y2="129.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g  id=""><line x1="193.7768798113023" y1="89.9214712483418" x2="186.74527741024002" y2="82.81115707290796" style="stroke-width:1;stroke:rgb(255,0,0);" /><line x1="186.70592152305426" y1="89.88211536115601" x2="193.81623569848807" y2="82.85051296009375" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="193.2990370328447" y1="175.77409956959156" x2="186.2674346317824" y2="168.66378539415774" style="stroke-width:1;stroke:rgb(255,0,0);" /><line x1="186.22807874459664" y1="175.7347436824058" x2="193.33839292003046" y2="168.7031412813435" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="176.75540701760488" y1="134.21886503698207" x2="176.81106464702222" y2="124.21901992676723" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="203.28890742547983" y1="124.36639160551746" x2="203.2332497960625" y2="134.3662367157323" style="stroke-width:1;stroke:rgb(255,0,0);" /></g></svg></p>`
          } else {
            texteCorr = ''
          }
          texteCorr += `$${nomQuadrilatere}$ est un losange donc ses diagonales se coupent en leur milieu : $${A + O
            }=${A + C}\\div2=${texNombre(2 * a)}\\div2=${texNombre(
              a
            )}$ cm.<br>`
          texteCorr += `On sait que les diagonales d'un losange se coupent perpendiculairement donc $${A + O + B
            }$ est un triangle rectangle en $O$.<br>`
          texteCorr += `D'après le théorème de Pythagore, on a : $${A + O}^2+${O + B
            }^2=${A + B}^2$.<br>`
          texteCorr += `Donc $${O + B}^2=${A + B}^2-${A + O}^2=${texNombre(
            c
          )}^2-${texNombre(a)}^2=${texNombrec(b ** 2)}$.<br>`
          texteCorr += `On a alors $${O + B}=\\sqrt{${texNombrec(
            b ** 2
          )}}=${texNombre(b)}$ cm.<br>`
          texteCorr += `Finalement comme $O$ est aussi le milieu de $[${D + B
            }]$ : $${D + B}=2\\times ${O + B}=2\\times${texNombre(
              b
            )}=${texNombrec(2 * b)}$ cm.`
          break

        case 'rectangle_diagonale_connue':
          texte = `$${nomQuadrilatere}$ est un rectangle tel que $${A + B
            }=${texNombre(a)}$ cm et $${A + C}=${texNombre(c)}$ cm.<br>`
          texte += `Calculer $${B + C}$.`
          if (context.isHtml) {
            texteCorr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id=""/><text x="113.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="276.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><g id=""/><g id=""/><text x="276.5" y="138.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><text x="111.5" y="141.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><polygon points="126.500,53.440 272.500,53.440 272.500,124.440 126.500,124.440 " style="stroke-width:1;stroke:rgb(0,0,0);fill:none"  id=""/><g  id=""><line x1="142.5" y1="53.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="126.5" y1="69.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="272.5" y1="69.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="256.5" y1="53.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="256.5" y1="124.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="272.5" y1="108.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="126.5" y1="108.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="142.5" y1="124.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><line x1="126.5" y1="53.44" x2="272.5" y2="124.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/></svg></svg></p>`
          } else {
            texteCorr = ''
          }
          texteCorr += `$${nomQuadrilatere}$ est un rectangle donc il possède 4 angles droits et $${A + B + C
            }$ est un triangle rectangle en $${B}$.<br>`
          texteCorr += `D'après le théorème de Pythagore, on a : $${A + B}^2+${B + C
            }^2=${A + C}^2$.<br>`
          texteCorr += `Donc $${B + C}^2=${A + C}^2-${A + B}^2=${texNombre(
            c
          )}^2-${texNombre(a)}^2=${texNombre(b ** 2)}$.<br>`
          texteCorr += `Finalement, $${B + C}=\\sqrt{${texNombrec(
            b ** 2
          )}}=${texNombre(b)}$ cm.`
          break

        case 'rectangle_diagonale_a_trouver':
          texte = `$${nomQuadrilatere}$ est un rectangle tel que $${A + B
            }=${texNombre(a)}$ cm et $${B + C}=${texNombre(b)}$ cm.<br>`
          texte += `Calculer $${A + C}$.`
          if (context.isHtml) {
            texteCorr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id=""/><text x="113.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="276.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><g id=""/><g id=""/><text x="276.5" y="138.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><text x="111.5" y="141.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><polygon points="126.500,53.440 272.500,53.440 272.500,124.440 126.500,124.440 " style="stroke-width:1;stroke:rgb(0,0,0);fill:none"  id=""/><g  id=""><line x1="142.5" y1="53.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="126.5" y1="69.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="272.5" y1="69.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="256.5" y1="53.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="256.5" y1="124.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="272.5" y1="108.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="126.5" y1="108.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="142.5" y1="124.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><line x1="126.5" y1="53.44" x2="272.5" y2="124.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/></svg></svg></p>`
          } else {
            texteCorr = ''
          }
          texteCorr += `$${nomQuadrilatere}$ est un rectangle donc il possède 4 angles droits et $${A + B + C
            }$ est un triangle rectangle en $${B}$.<br>`
          texteCorr += `D'après le théorème de Pythagore, on a : $${A + C}^2=${A + B
            }^2+${B + C}^2=${texNombrec(a)}^2+${texNombrec(b)}^2=${texNombrec(
              c ** 2
            )}$.<br>`
          texteCorr += `Finalement, $${A + C}=\\sqrt{${texNombrec(
            c ** 2
          )}}=${texNombre(c)}$ cm.`
          break

        case 'parallelogramme_est_losange':
          texte = `$${nomQuadrilatere}$ est un parallélogramme de centre $O$ tel que $${A + O
            }=${texNombre(a)}$ cm, $${A + B}=${texNombre(c)}$ cm et $${B + O
            }=${texNombre(b)}$ cm.<br>`
          texte += `$${nomQuadrilatere}$ est-il un losange ?`
          if (context.isHtml) {
            texteCorr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
          } else {
            texteCorr = ''
          }
          texteCorr += `Dans le triangle $${A + O + B
            }$, le plus grand côté est $[${A + B}]$.<br>`
          texteCorr += `$${A + B}^2=${texNombre(c)}^2=${texNombrec(
            c ** 2
          )}$<br>`
          texteCorr += `$${A + O}^2+${O + B}^2=${texNombre(a)}^2+${texNombre(
            b
          )}^2=${texNombrec(a ** 2 + b ** 2)}$<br>`
          texteCorr += `On constate que $${A + B}^2=${A + O}^2+${O + B
            }^2$, l'égalité de Pythagore est vérifiée donc $${A + O + B
            }$ est rectangle en $O$.<br>`
          texteCorr += `Finalement, comme $${nomQuadrilatere}$ est un parallélogramme qui a ses diagonales perpendiculaires alors c'est aussi un losange.`
          break

        case 'parallelogramme_n_est_pas_losange':
          texte = `$${nomQuadrilatere}$ est un parallélogramme de centre $O$ tel que $${A + O
            }=${texNombre(a)}$ cm, $${A + B}=${texNombre(c)}$ cm et $${B + O
            }=${texNombre(b)}$ cm.<br>`
          texte += `$${nomQuadrilatere}$ est-il un losange ?`
          if (context.isHtml) {
            texteCorr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
          } else {
            texteCorr = ''
          }
          texteCorr += `Dans le triangle $${A + O + B
            }$, le plus grand côté est $[${A + B}]$.<br>`
          texteCorr += `$${A + B}^2=${texNombre(c)}^2=${texNombrec(
            c ** 2
          )}$<br>`
          texteCorr += `$${A + O}^2+${O + B}^2=${texNombre(a)}^2+${texNombre(
            b
          )}^2=${texNombrec(a ** 2 + b ** 2)}$<br>`
          texteCorr += `On constate que $${A + B}^2\\not=${A + O}^2+${O + B
            }^2$, l'égalité de Pythagore n'est pas vérifiée donc $${A + O + B
            }$ n'est pas un triangle rectangle.<br>`
          texteCorr += `Si $${nomQuadrilatere}$ était un losange alors ses diagonales devraient être perpendiculaires et $${A + O + B
            }$ devrait être un triangle rectangle.<br>`
          texteCorr += `Finalement comme $${A + O + B
            }$ n'est pas un triangle rectangle, $${nomQuadrilatere}$ n'est pas un losange.`
          break

        case 'parallelogramme_est_rectangle':
          texte = `$${nomQuadrilatere}$ est un parallélogramme de centre $O$ tel que $${A + B
            }=${texNombre(a)}$ cm, $${A + C}=${texNombre(c)}$ cm et $${B + C
            }=${texNombre(b)}$ cm.<br>`
          texte += `$${nomQuadrilatere}$ est-il un rectangle ?`
          if (context.isHtml) {
            texteCorr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
          } else {
            texteCorr = ''
          }
          texteCorr += `Dans le triangle $${A + B + C
            }$, le plus grand côté est $[${A + C}]$.<br>`
          texteCorr += `$${A + C}^2=${texNombre(c)}^2=${texNombrec(
            c ** 2
          )}$<br>`
          texteCorr += `$${A + B}^2+${B + C}^2=${texNombre(a)}^2+${texNombre(
            b
          )}^2=${texNombrec(a ** 2 + b ** 2)}$<br>`
          texteCorr += `On constate que $${A + C}^2=${A + B}^2+${B + C
            }^2$, l'égalité de Pythagore est vérifiée donc $${A + B + C
            }$ est rectangle en $${B}$.<br>`
          texteCorr += `Finalement, comme $${nomQuadrilatere}$ est un parallélogramme qui a un angle droit en $${B}$ alors c'est aussi un rectangle.`
          break

        case 'parallelogramme_n_est_pas_rectangle':
          texte = `$${nomQuadrilatere}$ est un parallélogramme de centre $O$ tel que $${A + B
            }=${texNombre(a)}$ cm, $${A + C}=${texNombre(c)}$ cm et $${B + C
            }=${texNombre(b)}$ cm.<br>`
          texte += `$${nomQuadrilatere}$ est-il un rectangle ?`
          if (context.isHtml) {
            texteCorr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
          } else {
            texteCorr = ''
          }
          texteCorr += `Dans le triangle $${A + B + C
            }$, le plus grand côté est $[${A + C}]$.<br>`
          texteCorr += `$${A + C}^2=${texNombre(c)}^2=${texNombrec(
            c ** 2
          )}$<br>`
          texteCorr += `$${A + B}^2+${B + C}^2=${texNombre(a)}^2+${texNombre(
            b
          )}^2=${texNombrec(a ** 2 + b ** 2)}$<br>`
          texteCorr += `On constate que $${A + C}^2\\not=${A + B}^2+${B + C
            }^2$, l'égalité de Pythagore n'est pas vérifiée donc $${A + B + C
            }$ n'est pas rectangle en $${B}$.<br>`
          texteCorr += `Finalement, comme $${nomQuadrilatere}$ n'a pas d'angle droit en $${B}$ ce n'est pas un rectangle.`
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Sens direct ou réciproque/contraposée', 3, '1 : Sens direct\n2 : Réciproque/contraposée\n3 : Mélange']
}
