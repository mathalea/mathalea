import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { fraction } from '../../modules/fractions.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { repere, texteParPosition, point, tracePoint, segment, droite, milieu, courbe } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes, reduireAxPlusB, texFractionReduite, prenom, texPrix, texteEnCouleur, texteGras, choice, sp, itemize, miseEnEvidence, texNombre, texNombrec, randint, numAlpha } from '../../modules/outils.js'
export const titre = 'Modéliser une situation à l\'aide d\'une fonction'

/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export default function ModeliserParUneFonction () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  // this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 3
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.spacing = 1.5 // Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE4']//, 'typeE2', 'typeE3', 'typeE4'
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE5', 'typeE6', 'typeE7', 'typeE8']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4', 'typeE5', 'typeE6', 'typeE7', 'typeE8']
    }
    //
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, b, c, d, e, N, r1, Ax, sAAx, km, o, A, v, nom, TexteX, TexteY, TexteVal1, TexteVal2, f, g, prix, objet, P, dec1, dec2, res, T, taux, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      const nomF = [
        ['f'], ['g'], ['h'], ['u'],
        ['v'], ['w']
      ]
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1':
          a = randint(10, 12)
          dec1 = choice([0, 0.25, 0.5, 0.75, 1])
          b = (new Decimal(randint(5, 6))).add(dec1)
          c = randint(25, 30)
          dec2 = choice([0, 0.25, 0.5, 0.75, 1])
          d = (new Decimal(randint(2, 3))).add(dec2)
          P = prenom()
          T = randint(30, 70)
          e = randint(25, 30)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          A = point(0.5 * (c - a) / (b - d), 0.1 * (a + b * (c - a) / (b - d)))
          Ax = point(A.x, 0)
          sAAx = segment(A, Ax)
          sAAx.epaisseur = 2
          sAAx.pointilles = 5
          TexteX = texteParPosition('Nombre de séances', 13, 0.5, 'milieu', 'black', 1.5)
          TexteY = texteParPosition('Prix (€)', 1, 11, 'milieu', 'black', 1.5)
          r1 = repere({
            xMin: 0,
            yMin: 0,
            yMax: 120,
            xMax: 30,
            xUnite: 0.5,
            yUnite: 0.1,
            thickHauteur: 0.1,
            xLabelMin: 1,
            yLabelMin: 10,
            xLabelMax: 29,
            yLabelMax: 110,
            yThickDistance: 10,
            axeXStyle: '->',
            axeYStyle: '->',
            grilleYDistance: 10

          })
          f = x => a + b * x
          g = x => c + d * x
          objet = mathalea2d({ xmin: -1, xmax: 30, ymin: -1, ymax: 12, pixelsParCm: 30, scale: 1, style: 'margin: auto' }, courbe(f, { repere: r1, color: 'blue', epaisseur: 2 })
            , courbe(g, { repere: r1, color: 'red', epaisseur: 2 }), TexteX, TexteY, r1, o, sAAx)
          texte = ` Dans une salle de sport, deux formules sont proposées :<br>
          ${texteGras('Formule A :')} abonnement mensuel de $${a}$ € puis $${texPrix(b)}$ € par séance ;<br>
          ${texteGras('Formule B :')} abonnement mensuel de $${c}$ € puis $${texPrix(d)}$ € par séance.<br>
          Le nombre de séances mensuelles ne peut exéder $${e}$. <br>
          On note $x$ le nombre de séances mensuelles d’un abonné, $f(x)$ le prix payé avec la formule A et $g(x)$ le prix payé avec la formule B.<br>
          ${numAlpha(0)} Donner l'ensemble de définition des fonctions $f$ et $g$.<br> 
          ${numAlpha(1)} Exprimer en fonction de $x$, $f(x)$, puis $g(x)$.<br> 
                    ${numAlpha(2)} ${P} choisit une formule mais ne veut pas dépenser plus de $${T}$ € pour un mois. Quelle formule lui conseiller s'il veut faire le maximum de séances de sport dans le mois ?<br>
                    ${numAlpha(3)} À partir de combien de séances mensuelles, la formule B est-elle plus avantageuse ?
                `

          texteCorr = `
          ${numAlpha(0)} Le nombre minimal de séances dans le mois est 0 et le nombre maximal est $${e}$, donc l'ensemble de définition des fonctions $f$ et $g$ est $[0\\,;\\,${e}]$.<br><br>
          ${numAlpha(1)} Les formules comprennent un abonnement fixe et un tarif particulier pour une séance. <br>
          Ainsi, le montant mensuel pour une formule est : Abonnement + Coût d'une séance $\\times$ Nombre de séances. <br>
           La fonction $f$ est définie par : $f(x)=${a}+${texPrix(b)}x$ et la fonction $g$ est définie par $g(x)=${c}+${texPrix(d)}x$.<br><br>
          ${numAlpha(2)} On cherche le nombre de séances maximum  que l'on peut faire avec $${T}$ € avec les formule A et B.<br>
          Pour la formule A, on cherche $x$ tel que $f(x)\\leqslant${T}$.<br>

$\\begin{aligned}
${a}+${texPrix(b)}x&\\leqslant${T}\\\\
${texPrix(b)}x&\\leqslant ${T}-${a}${sp(8)} \\text{(On retranche ${a} dans chaque membre)} \\\\
${texPrix(b)}x&\\leqslant ${T - a}\\\\
x&\\leqslant \\dfrac{${T - a}}{${texPrix(b)}}${sp(8)}\\text{(On divise par ${texPrix(b)} dans chaque membre)}
\\end{aligned}$
<br>
Le plus grand entier inférieur ou égal à $\\dfrac{${T - a}}{${texPrix(b)}}$ est $${Math.floor((T - a) / b)}$.<br>
Avec la formule A, ${P} pourra faire au maximum $${Math.floor((T - a) / b)}$ séances.<br><br>
Pour la formule B, on cherche $x$ tel que $g(x)\\leqslant${T}$.<br>

$\\begin{aligned}
${c}+${texPrix(d)}x&\\leqslant${T}\\\\
${texPrix(d)}x&\\leqslant ${T}-${c}${sp(8)} \\text{(On retranche ${c} dans chaque membre)} \\\\
${texPrix(d)}x&\\leqslant ${T - c}\\\\
x&\\leqslant \\dfrac{${T - c}}{${texPrix(d)}}${sp(8)} \\text{(On divise par ${texPrix(d)} dans chaque membre)}
\\end{aligned}$
<br>
Le plus grand entier inférieur ou égal à $\\dfrac{${T - c}}{${texPrix(d)}}$ est $${Math.floor((T - c) / d)}$.<br>
Avec la formule B, ${P} pourra faire au maximum $${Math.floor((T - c) / d)}$ séances.<br><br>`

          if (Math.floor((T - c) / d) === Math.floor((T - a) / b)) { texteCorr += `Les deux formules permettent autant de séances avec un budget de $${T}$ €.` } else {
            texteCorr += ` ${texteGras('Conclusion :')}  ${Math.floor((T - c) / d) > Math.floor((T - a) / b) ? 'La formule B ' : ', La formule A'} permet de faire plus de séances, elle est plus avanatgeuse pour ${P}.

<br><br>`
          }

          texteCorr += `   ${numAlpha(3)} La formule B est plus avantageuse que la formule A lorsque $g(x)$ est strictement inférieure à $f(x)$.<br>
            ${sp(8)} $\\begin{aligned}
            ${c}+${texPrix(d)}x&<${a}+${texPrix(b)}x\\\\
            ${texPrix(d)}x&< ${a}+${texPrix(b)}x-${c}${sp(8)}\\text{(On retranche ${c} dans chaque membre)} \\\\
            ${texPrix(d)}x-${texPrix(b)}x&< ${a - c}${sp(8)}\\text{(On retranche ${texPrix(b)}  }x\\text{ dans chaque membre)} \\\\
            ${texPrix(d - b)}x&<${a - c}\\\\
            x&> \\dfrac{${a - c}}{${texPrix(d - b)}}${sp(8)}\\text{(On divise par } ${texNombre(d - b, 2)}   < 0 \\text{ dans chaque membre)}\\\\
            x&> \\dfrac{${c - a}}{${texPrix(b - d)}} \\end{aligned}$<br>
            Le plus grand entier supérieur  à $\\dfrac{${c - a}}{${texPrix(b - d)}}$ est $${Math.floor((a - c) / (d - b)) + 1}$.<br>
            La formule B est plus intéressante que la formule A à partir de $${Math.floor((a - c) / (d - b)) + 1}$  séances.<br><br>
            On retrouve ce résultat avec un graphique : ci-dessous, on a tracé en bleu la représentation graphique de $f$ et en rouge celle de $g$.<br>
            La droite rouge passe bien en dessous de la bleue à partir de $x=${Math.floor((a - c) / (d - b)) + 1}$.
            ${objet}`

          break
        case 'typeE2':

          a = randint(80, 120) //
          c = new Decimal(randint(41, 65, [50, 60])).div(100)

          km = randint(7, 10) * 100
          prix = randint(200, 400)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          A = point(0.01 * (prix - a) / c, 0.01 * prix)
          Ax = point(A.x, 0)
          sAAx = segment(A, Ax)
          sAAx.epaisseur = 2
          sAAx.pointilles = 5
          TexteX = texteParPosition('km', 9, 0.5, 'milieu', 'black', 1.5)
          TexteY = texteParPosition('Prix (€)', 1.2, 5.5, 'milieu', 'black', 1.5)
          TexteVal1 = texteParPosition(`${texNombre((prix - a) / c, 0)} km`, 0.01 * (prix - a) / c, -0.8, 'milieu', 'black', 1.5)
          TexteVal2 = texteParPosition(`${texNombre(prix, 0)} €`, -1.5, prix * 0.01, 'milieu', 'black', 1.5)
          r1 = repere({
            xMin: 0,
            yMin: 0,
            yMax: 600,
            xMax: 1000,
            xUnite: 0.01,
            yUnite: 0.01,
            thickHauteur: 0.1,
            xLabelMin: 100,
            yLabelMin: 100,
            xLabelMax: 900,
            yLabelMax: 590,
            yThickDistance: 100,
            xThickDistance: 100,
            axeXStyle: '->',
            axeYStyle: '->',
            grilleYDistance: 100,
            grilleXDistance: 100
          })
          f = x => a + c * x
          g = x => prix
          objet = mathalea2d({ xmin: -2.5, xmax: 10, ymin: -1, ymax: 6, pixelsParCm: 30, scale: 1, style: 'margin: auto' }, courbe(f, { repere: r1, color: 'blue', epaisseur: 2 }), courbe(g, { repere: r1, color: 'red', epaisseur: 2 }), TexteX, TexteY
            , r1, o, sAAx, TexteVal1, TexteVal2)
          texte = `  Une société de location de véhicules particuliers propose le tarif suivant pour un week-end de location :<br>
          ${texteGras('TARIF WEEK-END :')}  forfait de $${a}$ € puis $${texNombre(c, 2)}$ € par km parcouru (dans la limite de $${texNombre(km, 0)}$ km).<br> 
          On note $x$ le nombre de km parcourus par un client au cours d'un week-end et on considère la fonction $T$ qui à chaque valeur de $x$ associe le prix payé par le client.<br>
          ${numAlpha(0)} Donner l'ensemble de définition de la fonction $T$.<br> 
          ${numAlpha(1)} Exprimer $T(x)$ en fonction de $x$.<br> 
          ${numAlpha(2)} Résoudre l'équation $T(x)=${prix}$.<br> 
          Interpréter ce résultat dans le contexte de l'exercice. `
          texteCorr = `  ${numAlpha(0)} On ne peut pas faire plus de $${texNombre(km)}$ km durant le week-end, ainsi l'ensemble de définition de la fonction $T$ est $[0\\,;\\,${km}]$.<br> 
          ${numAlpha(1)} Le tarif  comprend un forfait fixe et un tarif par km parcouru. <br>
          Ainsi, le montant de la location est  : Forfait + Coût d'un km $\\times$ Nombre de km parcourus, soit $T(x)=${a}+${texNombre(c, 2)}x$.<br>
          ${numAlpha(2)} On résout l'équation  $T(x)=${prix}$.<br> 
          $\\begin{aligned}
          ${a}+${texNombre(c, 2)}x&=${prix}\\\\
          ${texNombre(c, 2)}x&= ${prix}-${a}${sp(8)} \\text{(On retranche ${a} dans chaque membre)} \\\\
x&=\\dfrac{${prix - a}}{${texNombre(c, 2)}}${sp(8)}\\text{(On divise par ${texNombre(c, 2)} dans chaque membre)}
\\end{aligned}$<br>
L'équation a pour solution $\\dfrac{${prix - a}}{${texNombre(c, 2)}}$.<br>
Comme $\\dfrac{${prix - a}}{${texNombre(c, 2)}}\\simeq ${texNombre((prix - a) / c, 0)}$, on peut dire que lorsque le prix payé pour la location est $${prix}$ €, le client a parcouru $${texNombre((prix - a) / c, 0)}$ km durant le week-end.<br>
On retrouve ce résultat graphiquement. Ci-dessous, la droite bleue représente la fonction $f$. <br>

`
          texteCorr += `${objet}`

          break
        case 'typeE3':
          a = new Decimal(randint(2011, 2035)).div(10) //
          b = randint(30, 80)
          v = randint(70, 100) //
          c = randint((a + 1) * 100, 12) / 100
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          TexteX = texteParPosition('v (en km/h)', 12, 0.5, 'milieu', 'black', 1.5)
          TexteY = texteParPosition('d (en m)', 1.2, 9.5, 'milieu', 'black', 1.5)
          A = point(0.1 * Math.sqrt(a * b), 0.1 * b)
          Ax = point(A.x, 0)
          sAAx = segment(A, Ax)
          sAAx.epaisseur = 2
          sAAx.pointilles = 5
          TexteVal1 = texteParPosition(`${texNombre(Math.round(Math.sqrt(b * a), 0))} km/h`, A.x, -0.8, 'milieu', 'black', 1.5)
          TexteVal2 = texteParPosition(`${texNombre(b, 0)} m`, -1.5, A.y, 'milieu', 'black', 1.5)
          r1 = repere({
            xMin: 0,
            yMin: 0,
            yMax: 100,
            xMax: 130,
            xUnite: 0.1,
            yUnite: 0.1,
            thickHauteur: 0.1,
            xLabelMin: 10,
            yLabelMin: 10,
            xLabelMax: 120,
            yLabelMax: 90,
            yThickDistance: 10,
            xThickDistance: 10,
            axeXStyle: '->',
            axeYStyle: '->',
            grilleYDistance: 10,
            grilleXDistance: 10
          })
          f = x => x ** 2 / a
          g = x => b
          objet = mathalea2d({ xmin: -2.5, xmax: 14, ymin: -2, ymax: 10, pixelsParCm: 30, scale: 1, style: 'margin: auto' }, courbe(f, { repere: r1, color: 'blue', epaisseur: 2 }), courbe(g, { repere: r1, color: 'red', epaisseur: 2 }), TexteX, TexteY
            , r1, o, sAAx, TexteVal1, TexteVal2)
          texte = `  Sur toute sèche, la distance de freinage en mètres, d'une voiture est modélisée de la façon suivante : <br>
          En notant $v$ la vitesse du véhicule (en km/h), sa distance de freinage $d(v)$  (en m) est donnée par le carré de sa vitesse divisée par $${texNombre(a, 1)}$.<br>
          ${numAlpha(0)} Donner l'expression de $d(v)$ en fonction de $v$. <br> 
          ${numAlpha(1)} Calculer au mètre près, la distance de freinage de la voiture si elle roule à $${v}$ km/h.<br> 
                    ${numAlpha(2)} La distance de freinage est-elle proportionnelle à la vitesse ?<br>
                    ${numAlpha(3)}   La distance de freinage de cette voiture a été de $${b}$ m. Quelle était sa vitesse en km/h arrondie à l'unité ? `
          texteCorr = `${numAlpha(0)} Le carré de la vitesse est $v^2$, donc la fonction $d$ est définie par : $d(v)=\\dfrac{v^2}{${texNombre(a, 1)}}$. <br> 
          ${numAlpha(1)} $d(${v})=\\dfrac{${v}^2}{${texNombre(a, 1)}}\\simeq ${Math.round(v ** 2 / a, 0)}$. La distance de freinage est d'environ $${Math.round(v ** 2 / a, 0)}$.<br> 
                    ${numAlpha(2)} La distance de freinage n'est pas proportionnelle à la vitesse car la fonction $d$ n'est pas une fonction linéaire. Elle ne traduit pas une situation de proportionnalité.<br>
                    ${numAlpha(3)}   On cherche $v$ tel que $d(v)=${b}$.<br>
                    $\\begin{aligned}
\\dfrac{v^2}{${texNombre(a, 1)}}&=${b}\\\\
v^2&=${b} \\times ${texNombre(a, 2)} ${sp(8)} \\text{(On mutiplie par ${texNombre(a, 1)} dans chaque membre)} \\\\
v^2&= ${texNombre(b * a, 2)}\\\\
v&= -\\sqrt{${texNombre(b * a, 2)}} ${sp(8)} \\text{ou} ${sp(8)} v= \\sqrt{${texNombre(b * a, 2)}}${sp(8)}\\text{(deux nombres ont pour carré } ${texNombre(b * a, 2)} \\text{)}
\\end{aligned}$<br>
Puisque $v$ est un nombre positif, on en déduit $v= \\sqrt{${texNombre(b * a, 2)}}\\simeq ${Math.round(Math.sqrt(b * a), 0)}$.<br>
Lorsque la distance de freinage de la voiture est $${b}$ m, sa vitesse est alors d'environ $${Math.round(Math.sqrt(b * a), 0)}$ km/h.<br>
Voici la courbe représentative de la fonction $d$ avec la solution de la question lue graphiquement.<br>

       `
          texteCorr += `${objet}`
          break

        case 'typeE4':
          nom = choice(nomF)
          a = randint(6, 10) * 1000 //
          b = choice([40,50,80, 100])
          c = randint(71, 97) * 100 //

          texte = ` Le nombre d’abonnés à une revue dépend du prix de l’abonnement à cette revue, prix exprimé en euros.<br>
          On considère que l’on a la relation : <br>
          nombre d’abonnés $= ${a} - ${b} \\times$ prix de l'abonnement en euros.<br>
          Soit $${nom}$ la fonction qui donne le nombre d’abonnés en fonction du prix de l’abonnement annuel à cette revue.<br>
          ${numAlpha(0)} Déterminer l’expression algébrique de $${nom}$. Préciser la variable.<br>
          ${numAlpha(1)} Que peut-on dire du nombre d'abonnés lorsque le prix de l'abonnement augmente ?<br>
          ${numAlpha(2)} Expliquer pourquoi on ne peut pas fixer le prix de l’abonnement à $300$ €. Déterminer l'ensemble de définition de la fonction $${nom}$.<br>
          ${numAlpha(3)} Le directeur des abonnements souhaite $${c}$ abonnés à la revue. Quel doit être le prix de l’abonnement ?<br>
          ${numAlpha(5)} On obtient la recette en multipliant le nombre d'abonnés par le prix d'un abonnement. <br>
          Exprimer la recette en fonction du prix de l’abonnement.
                `

          texteCorr = `${numAlpha(0)} En notant $x$ la variable, l'expression algébrique de $${nom}$ est : $${nom}(x)=${a}-${b}x$.<br>
          ${numAlpha(1)} La relation $${nom}(x)=${a}-${b}x$ montre que lorsque le prix de l'abonnement $x$ augmente, le nombre d'abonnés $${nom}(x)$ diminue. <br>
          Plus précisément, à chaque hausse de $1$ €, le nombre d'abonnés diminue de $${b}$ (coefficient devant $x$). <br>
          ${numAlpha(2)} Pour un montant de l'abonnement à $300$ €, on obtient $f(300)=${a}-${b}\\times 300=${a-b*300}$.<br>
          On obtiendrait alors un nombre d'abonnés négatif ce qui est impossible. On ne peut donc pas fixer le montant de l'abonnement à $300$ €.<br>
          On cherche la valeur de $x$ donnant un nombre d'abonnés nul en résolvant l'équation $${nom}(x)=0$ :<br>
          $\\begin{aligned}
          ${a}-${b}x&=0\\\\
         - ${b}x&= -${a}${sp(8)} \\text{(On retranche ${a} dans chaque membre)} \\\\
x&=\\dfrac{${-a}}{${-b}}${sp(8)}\\text{(On divise par ${-b} dans chaque membre)}\\\\
x&=\\dfrac{${a}}{${b}}
\\end{aligned}$<br>

$\\dfrac{${a}}{${b}}\\simeq ${texNombre(a/b,2)}$



          ${numAlpha(3)} Le directeur des abonnements souhaite $${c}$ abonnés à la revue. Quel doit être le prix de l’abonnement ?<br>
          ${numAlpha(5)} On obtient la recette en multipliant le nombre d'abonnés par le prix d'un abonnement. <br>
          Exprimer la recette en fonction du prix de l’abonnement.
                `

          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Choix des questions', 3, '1 : Situations concrètes\n2 : Programmes de calculs\n3 : Mélange']
}
