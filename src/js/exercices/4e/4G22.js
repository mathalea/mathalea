import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, combinaisonListes, calcul, texNombrec, creerNomDePolygone, texNombre } from '../../modules/outils.js'
import { RedactionPythagore } from './_pythagore.js'
export const titre = 'Résoudre des problèmes utilisant le théorème de Pythagore'

/**
 * Problèmes utilisant le théorème de Pythagore ou sa réciproque et des propriétés des quadrilatères particuliers.
 *
 * * Dans un losange, on connaît la longueur du côté et une diagonale, il faut calculer l'autre.
 * * Dans un rectangle on connaît la longueur et une diagonale, il faut calculer la largeur.
 * * Dans un rectangle on connaît la longueur et la largeur, il faut calculer la diagonale.
 * * Est-ce qu'un parallélogramme est un losange ? On peut démontrer que les diagonales sont perpendiculaires ou pas.
 * * Est-ce qu'un parallélogramme est un rectangle ? On peut démontrer qu'il possède un angle droit ou pas .
 * @author Rémi Angot (Factorisation de la rédaction de Pythagore par Eric Elter)
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

          texteCorr = `$${nomQuadrilatere}$ est un losange donc ses diagonales se coupent en leur milieu : $${A + O
            }=${A + C}\\div2=${texNombre(2 * a)}\\div2=${texNombre(
              a
            )}$ cm.<br>`
          texteCorr += `On sait que les diagonales d'un losange se coupent perpendiculairement donc $${A + O + B
            }$ est un triangle rectangle en $O$.<br>`
          texteCorr += RedactionPythagore('O', B, A, false, b, a, c)
          texteCorr += `<br>Finalement comme $O$ est aussi le milieu de $[${D + B
            }]$ : $${D + B}=2\\times ${O + B}=2\\times${texNombre(
              b
            )}=${texNombrec(2 * b)}$ cm.`
          break

        case 'rectangle_diagonale_connue':
          texte = `$${nomQuadrilatere}$ est un rectangle tel que $${A + B
            }=${texNombre(a)}$ cm et $${A + C}=${texNombre(c)}$ cm.<br>`
          texte += `Calculer $${B + C}$.`
          texteCorr = `$${nomQuadrilatere}$ est un rectangle donc il possède 4 angles droits .`
          texteCorr += RedactionPythagore(B, A, C, false, b, a, c)
          break

        case 'rectangle_diagonale_a_trouver':
          texte = `$${nomQuadrilatere}$ est un rectangle tel que $${A + B
            }=${texNombre(a)}$ cm et $${B + C}=${texNombre(b)}$ cm.<br>`
          texte += `Calculer $${A + C}$.`
          texteCorr = `$${nomQuadrilatere}$ est un rectangle donc il possède 4 angles droits `
          texteCorr += RedactionPythagore(B, A, C, true, b, a, c)
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
