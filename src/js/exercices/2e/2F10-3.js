import Exercice2 from '../Exercice.js'
import { listeQuestionsToContenu, randint, reduireAxPlusB, choice, ecritureAlgebrique, ecritureParentheseSiNegatif, texFractionReduite } from '../../modules/outils.js'
import { repere2, droite, mathalea2d, point, tracePoint, labelPoint, texteParPosition } from '../../modules/2d.js'
import { min, max } from 'mathjs'

export const titre = 'Représentation graphique d’une fonction affine'

/**
* @author Stéphane Guyon
* 2F10-3
*/
export default class representerfonctionaffine extends Exercice2 {
  constructor () {
    super()
    // Chaîne de caractère sans point à la fin. C'est le titre de l'exercice qui sera affiché avec la référence dans le générateur d'exercices.
    //! On avait this.titre = titre et aucune erreur n'était détectée !
    //! Pourquoi le générateur fonctionne avec une chaîne vide ?
    this.titre = ''
    this.consigne = 'Représenter graphiquement la fonction affine $f$ définie sur $\\mathbb R$ par : '
    this.nbQuestions = 3 // On complète le nb de questions
    this.nbCols = 1
    this.nbColsCorr = 1
    this.tailleDiaporama = 3
    this.video = ''
    this.spacing = 1
    this.spacingCorr = 1
    this.sup = 1
    this.besoinFormulaireNumerique = ['Types de question ', 2, '1 : Valeurs entières\n2 : Valeurs fractionnaires.']
  }

  //! Maintenant qu'il n'y a plus de méthode nouvelleVersion dans Exercice, on peut placer correctement
  //! cette fonction pour en faire une méthode d'instance dans le prototype de l'exercice
  nouvelleVersion () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    // let typesDeQuestionsDisponibles = []
    // typesDeQuestionsDisponibles = [1, 2]// On complète selon le nb de cas dans l'exo (switch)

    // const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const o = texteParPosition('O', -0.5, -0.5, 'milieu', 'black', 1)

    //! Changement à reporter dans la nouvelle version
    // on rajoute les nouvelles variables dont on a besoin dans l'exercice dans la boucle
    let a, b, r, c, d, tA, lA, tB, lB, xA, yA, lC, texte, texteCorr
    //! Fin changement
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // typesDeQuestions = listeTypeDeQuestions[i]
      if (this.sup === 1) {
        a = randint(0, 3) * choice([-1, 1])// coefficient a de la fonction affine
        b = randint(0, 3) * choice([-1, 1])// coefficient b de la fonction affine

        if (a === 0 && b === 0) { // On évite la fonction nulle
          a = 1
        }
        c = droite(a, -1, b)
        c.color = 'red'
        c.epaisseur = 2
        xA = randint(1, 3) * choice([-1, 1])// Abscisse de A
        yA = a * xA + b// Ordonnée de A
        r = repere2({
          xMin: -6,
          yMin: min(-8, yA - 2),
          xMax: 6,
          yMax: max(8, yA + 2)
        })

        const B = point(xA, yA, 'B')
        const A = point(0, b, 'A')

        tA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
        tB = tracePoint(B, 'red') // Variable qui trace les points avec une croix
        lA = labelPoint(A, 'red')// Variable qui trace les nom s A et B
        lB = labelPoint(B, 'red')// Variable qui trace les nom s A et B

        tA.taille = 5
        tA.epaisseur = 2

        tB.taille = 5
        tB.epaisseur = 2
        texte = `Représenter graphiquement la fonction affine $f$ définie sur $\\mathbb R$ par $f(x)=${reduireAxPlusB(a, b)}$ <br>`
        if (a !== 0) {
          texteCorr = 'On sait que la représentation graphique d\'une fonction affine est une droite.<br>'
          texteCorr += 'Il suffit donc de déterminer les coordonnées de deux points pour pouvoir représenter $f$.<br>'
          texteCorr += `Comme $f(0)=${b}$, on a  $A(0;${b}) \\in \\mathcal{C_f}$.<br>`
          texteCorr += 'On cherche un deuxième point, et on prend un antécédent au hasard :<br>'
          texteCorr += `Soit $x=${xA}$ :<br>`
          texteCorr += `On calcule : $f(${xA})=${a} \\times ${ecritureParentheseSiNegatif(xA)}${ecritureAlgebrique(b)}=${yA}$<br>`
          texteCorr += `On en déduit que $B(${xA};${yA}) \\in \\mathcal{C_f}$.`
        } else {
          texteCorr = 'On oberve que $f$ est une fonction constante<br>'
          texteCorr += `Sa représentation graphique est donc une droite parallèle à l'axe des abscisses, d'équation $y=${b}$.<br>`
        }
        texteCorr += mathalea2d({
          xmin: -6,
          ymin: min(-8, yA - 2),
          xmax: 6,
          ymax: max(8, yA + 2)
        }, lA, lB, r, c, tA, tB, o)
      }
      if (this.sup === 2) { // cas du coeff directeur fractionnaire
        a = randint(-5, 5, [0]) // numérateur coefficient directeur non nul
        b = randint(-5, 5) // ordonnée à l'origine
        d = randint(2, 5, [a, 2 * a, -a, -2 * a]) // dénominateur coefficient directeur non multiple du numérateur pour éviter nombre entier
        if (a === 0 && b === 0) {
          a = 1
          d = 3
        }// On évite la situation de double nullité
        xA = d // Abscisse de A
        yA = a / d * xA + b// Ordonnée de A

        const B1 = point(xA, yA, 'B')
        const A1 = point(0, b, 'A')
        // const f = point(xA / 2, (b + yA) / 2)
        r = repere2({
          xMin: -8,
          yMin: -10,
          xMax: 8,
          yMax: 8
        })// On définit le repère
        c = droite(a / d, -1, b)
        c.color = 'red'
        c.epaisseur = 2
        //! Afin d'alléger considérablement les questions, il faut mettre la partie fixe de la consigne dans this.consigne
        //! pour ne laisser que la partie dynamique ici.
        // TODO: Pour l'instant on a un bug car le this.consigne est toujours repris dans chaque question.
        console.log(texte)
        texte = `$f(x)=${texFractionReduite(a, d)}x ${ecritureAlgebrique(b)}$ <br>`
        console.log(texte)
        texteCorr = 'On sait que la représentation graphique d\'une fonction affine est une droite.<br>'
        texteCorr += 'Il suffit donc de déterminer les coordonnées de deux points pour pouvoir représenter $f$.<br>'
        texteCorr += `Comme $f(0)=${b}$, on a : $A(0;${b}) \\in \\mathcal{C_f}$.<br>`
        texteCorr += 'On cherche un deuxième point, et on prend un antécédent qui facilite les calculs :<br>'
        texteCorr += `Par exemple $x=${xA}$ :<br>`
        texteCorr += `On calcule : $f(${xA})=${texFractionReduite(a, d)} \\times ${ecritureParentheseSiNegatif(xA)}${ecritureAlgebrique(b)}=${yA}$<br>`
        texteCorr += `On en déduit que $B(${xA};${yA}) \\in \\mathcal{C_f}$.`

        tA = tracePoint(A1, 'red') // Variable qui trace les points avec une croix
        lA = labelPoint(A1, 'red')// Variable qui trace les nom s A et B
        tB = tracePoint(B1, 'red') // Variable qui trace les points avec une croix
        lB = labelPoint(B1, 'red')// Variable qui trace les nom s A et B
        // lC = labelPoint(f, 'C_f')// Variable qui trace les nom s A et B
        texteCorr += mathalea2d({
          xmin: -8,
          ymin: -10,
          xmax: 8,
          ymax: 8

        }, r, c, tA, lA, tB, lB, lC, o)
        // On trace le graphique
      }

      if (this.questionJamaisPosee(i, this.sup, a, b)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
