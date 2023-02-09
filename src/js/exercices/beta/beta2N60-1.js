import Exercice from '../Exercice.js'
import Decimal from 'decimal.js'
import FractionX from '../../modules/FractionEtendue.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, combinaisonListes, pgcd, texteGras, prenomF, itemize, sp, reduireAxPlusB, texPrix, ecritureParentheseSiNegatif, miseEnEvidence, rienSi1, abs, choice, texNombre, randint, ecritureAlgebrique } from '../../modules/outils.js'
import { polygone, codageAngleDroit, milieu, labelPoint, point, segment, texteParPosition } from '../../modules/2d.js'
export const titre = 'Modéliser un problème par une inéquation.'
/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export default function ModeliseInequations () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 4
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.spacing = 1.5 // Interligne des questions
  this.spacingCorr = 1.5// Interligne des réponses
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3']// 'typeE1', 'typeE2',
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE4', 'typeE5', 'typeE6']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['typeE7', 'typeE8']
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4', 'typeE5', 'typeE6', 'typeE7', 'typeE8']
    }
    //
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1'://
          { const a = randint(20, 30) //
            const b = randint(a + 5, 50) //
            const c = new Decimal(randint(20, 35)).div(100)
            const d = new Decimal(randint(15, c - 1)).div(100)
            texte = `  Une société de location de véhicules particulièrs propose deux tarifs :<br>
              $\\bullet$ Tarif A : un forfait de $${a}$ € et $${texNombre(c, 2)}$ € par km parcouru ;<br>
              $\\bullet$  Tarif B : un forfait de $${b}$ € et $${texNombre(d, 2)}$ € par km parcouru ;<br>
                      À partir de combien de km (arrondi à l'unité), le tarif B est-il plus intéressant que le tarif A ?<br>`
            texteCorr = `En notant $x$, le nombre de km parcourus, on a :<br>
              $\\bullet$ Avec le tarif A, le prix à payer est : $${reduireAxPlusB(c, a)}$ ;<br>
              $\\bullet$  Avec le tarif B, le prix à payer est : $${reduireAxPlusB(d, b)}$ ;<br>
                       Le tarif B est plus avantageux que le tarif A lorsque $x$ vérifie : $${reduireAxPlusB(d, b)} < ${reduireAxPlusB(c, a)}$.<br>
                       On résout cette inéquation : <br>
              $\\begin{aligned}
              ${texNombre(d, 2)}x+${b}&<${texNombre(c, 2)}x+${a}\\\\
              ${texNombre(d, 2)}x+${b}-${miseEnEvidence(texNombre(c, 2))}${miseEnEvidence('\\textit{x}')}&< ${texNombre(c, 2)}x-${miseEnEvidence(texNombre(c, 2))}${miseEnEvidence('\\textit{x}')}+${a}\\\\
                     ${texNombre(d - c)}x+${b}&<${a}\\\\
              ${texNombre(d - c, 2)}x+${b}-${miseEnEvidence(texNombre(b))}&<${a}-${b}\\\\
              ${texNombre(d - c, 2)}x&<${a - b}\\\\
      \\dfrac{${texNombre(d - c, 2)}x}{${miseEnEvidence(texNombre(d - c, 2))}}&>\\dfrac{${a - b}}{${miseEnEvidence(texNombre(d - c, 2))}}${sp(7)} \\text{On divise par } ${texNombre(d - c, 2)} <0\\\\
      x&>\\dfrac{${abs(a - b)}}{${texNombre(abs(d - c), 2)}}  
      \\end{aligned}$<br>`
            if (Math.round((a - b) / (d - c)) === (a - b) / (d - c)) {
              texteCorr += `Comme $\\dfrac{${abs(a - b)}}{${texNombre(abs(d - c), 2)}}= ${texNombre((a - b) / (d - c), 2)}$, c'est donc pour une distance minimale de  $${texNombre(Math.ceil((a - b) / (d - c)) + 1, 0)}$ km que le tarif B est plus intéressant que le tarif A.      
             `
            } else {
              texteCorr += ` Comme $\\dfrac{${abs(a - b)}}{${texNombre(abs(d - c), 2)}}\\simeq ${texNombre((a - b) / (d - c), 2)}$, c'est donc pour une distance minimale de  $${Math.ceil((a - b) / (d - c))}$ km que le tarif B est plus intéressant que le tarif A.
                              `
            }
          }
          break

        case 'typeE2':
          {
            const quidam = prenomF()
            const b = randint(90, 120) //
            const a = new Decimal(randint(15, 25)).div(100)
            const budget = randint(20, 35) * 10 //

            texte = ` Pour la location mensuelle d'un véhicule, une entreprise propose le tarif suivant :<br>
            Forfait de $${b}$ € quelque soit le nombre de km parcourus, puis un supplément par kilomètre parcouru de $${texNombre(a, 2)}$ €. <br>
            
            ${quidam} loue une voiture à cette société. Elle a un budget de $${budget}$ € et ne veut pas le dépasser.<br>
                      Quel est le nombre maximum de km qu'elle pourra parcourir sans dépasser son budget ?
                                   `
            texteCorr = `En notant $x$, le nombre de km parcourus, le coût pour la location mensuelle est donné par : $${reduireAxPlusB(a, b)}$.<br>
            Le budget de ${quidam} étant de  $${budget}$ €, le nombre de km $x$ qu'elle pourra parcourir doit vérifier $${reduireAxPlusB(a, b)}<${budget}$.<br>
            $\\begin{aligned}
            ${reduireAxPlusB(a, b)}&<${budget}\\\\
            ${texNombre(a, 2)}x+${b}-${miseEnEvidence(b)}&< ${budget}x-${miseEnEvidence(b)}\\\\
            ${texNombre(a, 2)}x&<${budget - b}\\\\
            x&<\\dfrac{${budget - b}}{${texNombre(a, 2)}}             
    \\end{aligned}$<br>`

            texteCorr += `Comme $\\dfrac{${budget - b}}{${texNombre(a, 2)}}${Math.round((budget - b) / a) === (budget - b) / a ? '=' : '\\simeq'} ${texNombre((budget - b) / a, 2)}$, ${quidam} pourra faire au maximum  $${Math.floor((budget - b) / a)}$ km pendant le mois avec son budget de $${budget}$ €.      
       `
          }
          break
        case 'typeE3':
          { const PB = new Decimal(randint(7, 25, [10, 20])).div(2)// prix billet
            const EM = randint(70, 150) // nombre entrée matin
            const RT = randint(200, 400) * 10 // recette totale
            texte = ` À la mi-journée la recette d'un musée s'élève à $${texNombre(PB * EM, 2)}$ € pour $${EM}$ entrées. Le prix de l'entrée est unique.<br>
                Quel doit être le minimum d'entrées en deuxième partie de journée pour que la recette de la journée soit au moins égale à celle de la veille qui s'élevait à $${texNombre(RT)}$ € ?<br>
                Résoudre ce problème en écrivant et résolvant une inéquation modélisant la situation.
                                       `
            texteCorr = `Le montant du billet d'entrée est donné par $${texNombre(PB * EM, 2)}${sp(1)} € \\div ${EM}=${texPrix(PB, 2)}$ €.<br>

                En notant $x$ le nombre d'entrées en deuxième partie de journée, on obtient : $${texNombre(PB * EM, 2)} +${texNombre(PB, 2)}\\times x\\geqslant ${texNombre(RT)}$.<br>

                $\\begin{aligned}
                ${texNombre(PB * EM, 2)} +${texNombre(PB, 2)} x&\\geqslant ${texNombre(RT)}\\\\
                ${texNombre(PB * EM, 2)} +${texNombre(PB, 2)}x-${miseEnEvidence(texNombre(PB * EM, 2))}&\\geqslant ${texNombre(RT)}-${miseEnEvidence(texNombre(PB * EM, 2))}\\\\ 
                ${texNombre(PB, 2)}x&\\geqslant ${texNombre(RT - PB * EM, 2)}\\\\  
                x&\\geqslant \\dfrac{${texNombre(RT - PB * EM, 2)}}{${texNombre(PB, 2)}}\\\\        
    \\end{aligned}$<br>
  Comme  $\\dfrac{${texNombre(RT - PB * EM, 2)}}{${texNombre(PB, 2)}}${Math.round((RT - PB * EM) / PB) === (RT - PB * EM) / PB ? '=' : '\\simeq'} ${texNombre((RT - PB * EM) / PB, 1)}$, 
  il faudra au minimum ${Math.round((RT - PB * EM) / PB) === (RT - PB * EM) / PB ? `$${texNombre((RT - PB * EM) / PB, 0)}$` : `$${texNombre((RT - PB * EM) / PB + 1, 0)}$`} entrées pour que la recette de la journée soit au moins égale à celle de la veille.  
               
              `
          }
          break

        case 'typeE4':

          {
            const choix = choice([true, false])
            const l = randint(3, 10)// largeur
            const L = l + randint(3, 10)// longueur

            const P = choice([['au tiers', 3], ['au quart', 4], ['à la moitié', 2], ['au dixième', 10], ['au cinquième', 5]])
            const f = new FractionX(L * l / 2, P[1] * l / 2 + l / 2).simplifie()
            const f2 = new FractionX(l * L, l * P[1] + l).simplifie()
            const A = point(0, 0, 'A', 'below')
            const B = point(10, 0, 'B', 'below')
            const C = point(10, 6, 'C')
            const M = point(4, 0, 'M', 'below')
            const D = point(0, 6, 'D')
            const objets = []
            const poly1 = polygone([A, M, D], 'black')
            const poly2 = polygone([C, M, B], 'black')
            poly1.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            poly2.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            objets.push(segment(A, B), segment(B, C), segment(D, A), segment(C, D), labelPoint(A, B, C, D, M), poly1, poly2)
            objets.push(texteParPosition('x', milieu(A, M).x, milieu(A, M).y - 0.7, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`${texNombre(l)}`, milieu(A, D).x - 0.5, milieu(A, D).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`${texNombre(L)}`, milieu(C, D).x, milieu(C, D).y + 0.5, 'milieu', 'black', 1, 'middle', true))

            texte = ` Soit $ABCD$ un rectangle tel que $AB=${l}$ et $BC=${L}$.<br>
            $M$ est un point du segment $[AB]$. On note $AM=x$.<br>
            Pour quelles valeurs de $x$ l'aire du triangle $AMD$ est-elle ${choix ? 'au plus' : 'au moins'} égale ${P[0]} de l'aire du triangle $CMB$ ?<br>
              `
            texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 12, ymax: 8, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.5, style: 'margin: auto' }, objets)
            texteCorr = ` L'aire du triangle $AMD$ est : ${l % 2 === 0 ? `$\\dfrac{x\\times ${l}}{2}=${texNombre(l / 2, 0)}x$` : `$\\dfrac{x\\times ${l}}{2}$`}. <br>
            Comme $MB=${L}-x$, l'aire du triangle $CMB$ est : ${l % 2 === 0 ? `$\\dfrac{(${L}-x)\\times ${l}}{2}=${texNombre(l / 2, 0)}(${L}-x)$` : `$\\dfrac{(${L}-x)\\times ${l}}{2}$`}. <br>
            Le problème revient donc à déterminer les valeurs de $x$ telles que : $${l % 2 === 0 ? `${texNombre(l / 2, 0)}x` : `\\dfrac{${l}x}{2}`} ${choix ? '\\leqslant' : '\\geqslant'} ${l % 2 === 0 ? `\\dfrac{1}{${P[1]}}\\times ${texNombre(l / 2, 0)}(${L}-x)` : `\\dfrac{1}{${P[1]}}\\times \\dfrac{${l}(${L}-x)}{2}`}$. <br>`
            if (l % 2 === 0) {
              texteCorr += `$\\begin{aligned}
            ${texNombre(l / 2, 0)}x &${choix ? '\\leqslant' : '\\geqslant'}  \\dfrac{${texNombre(l / 2, 0)}(${L}-x)}{${P[1]}}${sp(7)}\\\\`
              texteCorr += ` ${texNombre(l / 2, 0)}x \\times ${P[1]}&${choix ? '\\leqslant' : '\\geqslant'} \\dfrac{${texNombre(l / 2, 0)}(${L}-x)}{${P[1]}}\\times ${P[1]} ${sp(7)}\\text{ On  multiplie par ${P[1]}, le sens de l'inéquation ne change pas.}\\\\`
              texteCorr += ` ${texNombre(P[1] * l / 2, 0)}x &${choix ? '\\leqslant' : '\\geqslant'}  ${texNombre(l / 2, 0)}(${L}-x)\\\\`
              texteCorr += ` ${texNombre(P[1] * l / 2, 0)}x &${choix ? '\\leqslant' : '\\geqslant'}  ${texNombre(L * l / 2, 0)}-${texNombre(l / 2, 0)}x\\\\`
              texteCorr += ` ${texNombre(P[1] * l / 2, 0)}x +${texNombre(l / 2, 0)}x&${choix ? '\\leqslant' : '\\geqslant'}  ${texNombre(L * l / 2, 0)}\\\\`
              texteCorr += ` ${texNombre(P[1] * l / 2 + l / 2, 0)}x &${choix ? '\\leqslant' : '\\geqslant'}  ${texNombre(L * l / 2, 0)}\\\\`
              texteCorr += ` x &${choix ? '\\leqslant' : '\\geqslant'}  ${f.texFraction}\\\\`

              texteCorr += '\\end{aligned}$<br>'
              texteCorr += `L'aire du triangle $AMD$ est ${choix ? 'au plus' : 'au moins'} égale ${P[0]} de l'aire du triangle $CMB$ pour $x\\in ${choix ? `\\left[0\\,;\\,${f.texFraction}\\right]` : `\\left[${f.texFraction}\\,;\\,${L}\\right]`}$`
            } else {
              texteCorr += `$\\begin{aligned}
              \\dfrac{${l} x}{2} &${choix ? '\\leqslant' : '\\geqslant'} \\dfrac{${l}(${L}-x)}{${2 * P[1]}}\\\\`
              texteCorr += `\\dfrac{${l} x}{2} \\times ${2 * P[1]}&${choix ? '\\leqslant' : '\\geqslant'} \\dfrac{${l}(${L}-x)}{${texNombre(P[1] * 2, 0)}}\\times ${2 * P[1]} ${sp(7)}\\text{ On multiplie par ${2 * P[1]}, le sens des inégalités ne change pas.}\\\\`
              texteCorr += ` ${texNombre(l * P[1], 0)}x &${choix ? '\\leqslant' : '\\geqslant'} ${l}(${L}-x)\\\\`
              texteCorr += ` ${texNombre(l * P[1], 0)}x &${choix ? '\\leqslant' : '\\geqslant'} ${l * L}-${l}x\\\\`
              texteCorr += ` ${texNombre(l * P[1], 0)}x +${l}x&${choix ? '\\leqslant' : '\\geqslant'} ${l * L}\\\\`
              texteCorr += ` ${texNombre(l * P[1] + l, 0)}x &${choix ? '\\leqslant' : '\\geqslant'} ${l * L}\\\\`
              texteCorr += ` x &${choix ? '\\leqslant' : '\\geqslant'}  ${f2.texFraction}\\\\`

              texteCorr += '\\end{aligned}$<br>'
              texteCorr += `L'aire du triangle $AMD$ est ${choix ? 'au plus' : 'au moins'} égale ${P[0]} de l'aire du triangle $CMB$ pour $x\\in ${choix ? `\\left[0\\,;\\,${f.texFraction}\\right]` : `\\left[${f.texFraction}\\,;\\,${L}\\right]`}$`
            }
          }
          break

        case 'typeE5':

          {
            const a = randint(8, 15)// longueur en bas
            const b = randint(2, 6)// longueur ajoutée à x
            const P = randint(50, 70)
            const A = point(0, 0, 'A')
            const B = point(10, 0, 'B')
            const C = point(10, 6, 'C')
            const D = point(0, 6, 'D')
            const E = point(0, 2, 'E')
            const F = point(-2, 2, 'F')
            const G = point(-2, 0, 'G')
            const segmentEA = segment(A, E)
            segmentEA.pointilles = 2
            const objets = []
            const poly = polygone([A, B, C, D, E, F, G], 'black')

            poly.couleurDeRemplissage = colorToLatexOrHTML('lightgray')

            objets.push(poly, segmentEA)
            objets.push(texteParPosition('x', milieu(G, F).x - 0.5, milieu(G, F).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition('x', milieu(G, A).x, milieu(G, A).y - 0.5, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`x+${texNombre(b)}`, milieu(B, C).x + 1, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`${texNombre(a)}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'milieu', 'black', 1, 'middle', true)
            )

            texte = ` On considère la figure ci-dessous. <br>
            Quelles sont les valeurs possibles de $x$ pour que le périmètre de la figure soit supérieur à $${P}$ cm.<br>
              `
            texte += mathalea2d({ xmin: -3, ymin: -1, xmax: 12, ymax: 8, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.5, style: 'margin: auto' }, objets)
            texteCorr = `Le périmètre de la figure est : $x+${a}+(x+${b})+${a}+${b}+x+x=4x+${2 * b + 2 * a}$.<br>
            Le périmètre de la figure doit être supérieur à $${P}$, on cherche $x$ tel que : <br>

             `
            texteCorr += `$\\begin{aligned}
            4x+${2 * b + 2 * a} &>${P}\\\\
            4x &>${P}-${2 * b + 2 * a}\\\\
            4x&>${P - 2 * b - 2 * a}\\\\
            x&>\\dfrac{${P - 2 * b - 2 * a}}{4}`
            texteCorr += '\\end{aligned}$<br>'

            texteCorr += `Comme $\\dfrac{${P - 2 * b - 2 * a}}{4}=${texNombre((P - 2 * b - 2 * a) / 4, 2)}$, $x$ doit être supérieur à $${texNombre((P - 2 * b - 2 * a) / 4, 2)}$ pour que le périmètre de la figure soit supérieur à $${P}$.

             `
          }
          break

        case 'typeE6':

          {
            const a = randint(1, 3)// côté carré
            const b = choice([6, 8, 10, 12])// hauteur triangle
            const Aire = randint(50, 70)
            const f = new FractionX(Aire - a ** 2, a + b / 2).simplifie()
            const A = point(0, 0, 'A')
            const B = point(8, 0, 'B')
            const C = point(10, 0, 'C')
            const D = point(10, 2, 'D')
            const E = point(8, 2, 'E')
            const F = point(4, 8, 'F')
            const G = point(0, 2, 'G')
            const H = point(4, 2, 'H')
            const segmentFH = segment(F, H)
            segmentFH.pointilles = 2
            const objets = []
            const poly1 = polygone([A, B, E, G], 'black')
            poly1.couleurDeRemplissage = colorToLatexOrHTML('#7dbdd8')
            const poly2 = polygone([B, C, D, E], 'black')
            poly2.couleurDeRemplissage = colorToLatexOrHTML('#e1ac66')
            const poly3 = polygone([G, E, F], 'black')
            poly3.couleurDeRemplissage = colorToLatexOrHTML('#75ee7e')
            objets.push(poly1, poly2, poly3, segmentFH, codageAngleDroit(F, H, E))
            objets.push(texteParPosition('x', milieu(A, B).x, milieu(A, B).y - 0.7, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`${texNombre(a)}`, milieu(G, A).x - 0.8, milieu(G, A).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`${texNombre(a)}`, milieu(B, C).x, milieu(B, C).y - 0.7, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`${texNombre(b)}`, milieu(F, H).x + 0.5, milieu(F, H).y, 'milieu', 'black', 1, 'middle', true)
            )

            texte = ` On considère la figure ci-dessous sur laquelle les longueurs sont en cm. <br>
            Quelles sont les valeurs possibles de $x$ pour que l'aire de cette  figure dépasse  $${Aire}$ cm$^2$ ?<br>
            Résoudre ce problème en le modélisant par une inéquation.
              `
            texte += mathalea2d({ xmin: -3, ymin: -1, xmax: 12, ymax: 9, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.5, style: 'margin: auto' }, objets)
            texteCorr = `La figure est constituée d'un rectangle, d'un carré et d'un triangle.<br>
           $\\bullet$  L'aire du rectangle est : $${a}\\times x=${rienSi1(a)}x$.<br>
           $\\bullet$  L'aire du carré est : $${a}\\times ${a}=${a ** 2}$.<br>
           $\\bullet$  L'aire du triangle est : $\\dfrac{${b}\\times x}{2}=${texNombre(b / 2, 0)}x$.<br>
Le problème revient donc à trouver les valeurs de $x$ vérifiant : $${rienSi1(a)}x+${a ** 2}+${texNombre(b / 2, 0)}x>${Aire}$, soit $${texNombre(a + b / 2, 0)}x+${a ** 2}>${Aire}$.

             `
            texteCorr += `$\\begin{aligned}
            ${texNombre(a + b / 2, 0)}x+${a ** 2} &>${Aire}\\\\
            ${texNombre(a + b / 2, 0)}x &>${Aire}-${a ** 2}\\\\
            ${texNombre(a + b / 2, 0)}x &>${Aire - a ** 2}\\\\
            x&>\\dfrac{${Aire - a ** 2}}{${texNombre(a + b / 2, 0)}}`
            texteCorr += '\\end{aligned}$<br>'
            if (pgcd(Aire - a ** 2, a + b / 2) === 1) {
              texteCorr += `$x$ doit être supérieur à $\\dfrac{${Aire - a ** 2}}{${texNombre(a + b / 2, 0)}}$ cm pour que l'aire  de la figure dépasse $${Aire}$ cm$^2$.
            `
            } else {
              texteCorr += `Comme $\\dfrac{${Aire - a ** 2}}{${texNombre(a + b / 2, 0)}}=${f.texFraction}$, $x$ doit être supérieur à $${f.texFraction}$ cm pour que l'aire  de la figure dépasse $${Aire}$ cm$^2$.
             `
            }
          }
          break

        case 'typeE7':
          {
            const a = randint(-10, 10, [-1, 0, 1])
            const b = randint(-10, 10, [-1, 0, 1])
            const c = randint(2, 10)
            const res = randint(-20, 20, 0)
            const f = new FractionX(res - b * c, c * a).simplifie()
            const choix = choice([['strictement supérieur', '>', '<'], ['strictement inférieur', '<', '>'], ['inférieur ou égal ', '\\leqslant', '\\geqslant'], ['supérieur ou égal ', '\\geqslant', '\\leqslant']])
            texte = ` ${texteGras('Voici un programme de calcul :')} `
            texte += itemize(['Choisir un nombre', `Multiplier ce nombre par $${a}$`, `Ajouter $${b}$`, `Multiplier le résultat par $${c}$`])
            texte += `Quels nombres doit-on choisir au départ pour obtenir un nombre ${choix[0]} à $${res}$.<br>
               `

            texteCorr = `En notant $x$ le nombre choisi au départ, on obtient  :<br>
          $\\bullet$ Multiplier ce nombre par $${a}$ : ${sp(6)}$${a}\\times x=${a}x$ ;<br>
          $\\bullet$ Ajouter $${b}$ : ${sp(6)}$${a}x${ecritureAlgebrique(b)}$ ; <br>
          $\\bullet$ Multiplier le résultat par $${c}$ :${sp(6)}$${c}\\times (${a}x${ecritureAlgebrique(b)})=${texNombre(c * a)}x${ecritureAlgebrique(b * c)}$.<br>
          On cherche $x$ tel que : <br>`
            texteCorr += `$\\begin{aligned}
         ${texNombre(c * a)}x${ecritureAlgebrique(b * c)} &${choix[1]}${res}\\\\
         ${texNombre(c * a)}x &${choix[1]}${res}${ecritureAlgebrique(-b * c)}\\\\`
            texteCorr += ` x &${c * a > 0 ? `${choix[1]}` : `${choix[2]}`}\\dfrac{${res - b * c}}{${texNombre(c * a)}}\\\\`
            texteCorr += '\\end{aligned}$<br>'
            if (pgcd(res - b * c, c * a) === 1) {
              texteCorr += `On doit choisir $x${c * a > 0 ? `${choix[1]}` : `${choix[2]}`}${f.texFraction}$ pour obtenir un nombre ${choix[0]} à $${res}$. .
            `
            } else {
              texteCorr += `Comme $\\dfrac{${res - b * c}}{${texNombre(c * a)}}=${f.texFraction}$, on doit choisir $x${c * a > 0 ? `${choix[1]}` : `${choix[2]}`}${f.texFraction}$ pour obtenir un nombre ${choix[0]} à $${res}$.
             `
            }
          }
          break

        case 'typeE8':
          {
            const a = randint(-10, 10, 0)

            const b = randint(-10, 10, 0)
            const f = new FractionX(b * b, a - 2 * b).simplifie()
            const choix = choice([['strictement supérieur', '>', '<'], ['strictement inférieur', '<', '>'], ['inférieur ou égal ', '\\leqslant', '\\geqslant'], ['supérieur ou égal ', '\\geqslant', '\\leqslant']])
            texte = `On donne les deux programmes de calcul suivants :<br>
            ${texteGras('Programme 1 :')}<br>
                   `
            texte += itemize(['Choisir un nombre', `Ajouter $${a}$`, 'Multiplier le résultat par le nombre choisi au départ'])
            texte += `<br>
            ${texteGras('Programme 2 :')}<br>
                        `
            texte += itemize(['Choisir un nombre', `Ajouter $${b}$`, 'Prendre le carré du résultat'])
            texte += `<br>Déterminer les nombres que l'on  doit entrer dans ces deux programmes pour qu'au final le résultat obtenu 
            avec le programme 1 soit ${choix[0]} à celui obtenu avec le programme 2.<br><br>`
            texteCorr = `En notant $x$ le nombre choisi au départ : <br>
            On obtient avec le ${texteGras('programme 1 :')} <br>
            $\\bullet$ Ajouter $${a}$ : ${sp(5)} $x+${ecritureParentheseSiNegatif(a)}$ ;<br>
            $\\bullet$ Multiplier le résultat par le nombre choisi au départ: ${sp(5)} $x\\times(x${ecritureAlgebrique(a)})=x^2${a > 0 ? '+' : '-'}${rienSi1(abs(a))}x$.<br>
                   On obtient avec le ${texteGras('programme 2 :')} <br>
        $\\bullet$ Ajouter $${b}$ :${sp(5)} $x+${ecritureParentheseSiNegatif(b)}$ ;<br>
        $\\bullet$ Prendre le carré du résultat :${sp(5)} $(x${ecritureAlgebrique(b)})^2=x^2${ecritureAlgebrique(2 * b)}x+${(b * b)}$.<br>
                    
        Les nombres $x$ que l'on  doit entrer dans les deux programmes pour qu'au final le résultat obtenu avec le programme 1 soit ${choix[0]} à celui obtenu avec le programme 2 vérifient : <br>
        $\\begin{aligned}
        x^2${a > 0 ? '+' : '-'}${rienSi1(abs(a))}x & ${choix[1]} x^2${ecritureAlgebrique(2 * b)}x+${b * b}\\\\
 ${rienSi1(a)}x & ${choix[1]} ${ecritureAlgebrique(2 * b)}x+${b * b}\\\\
 ${2 * b > 0 ? `${rienSi1(a)}x- ${2 * b}x` : `${rienSi1(a)}x- (${2 * b}x)`}& ${choix[1]} ${b * b}\\\\
 ${rienSi1(a - 2 * b)}x& ${choix[1]} ${b * b}\\\\`
            if (a - 2 * b === 1) { texteCorr += '' } else { texteCorr += ` x &${a - 2 * b > 0 ? `${choix[1]}` : `${choix[2]}`}\\dfrac{${b * b}}{${a - 2 * b}}\\\\` }
            texteCorr += '\\end{aligned}$<br>'
            if (pgcd(b * b, a - 2 * b) === 1) {
              texteCorr += `On doit choisir $x${a - 2 * b > 0 ? `${choix[1]}` : `${choix[2]}`}${f.texFraction}$ pour que le résultat obtenu 
  avec le programme 1 soit ${choix[0]} à celui obtenu avec le programme 2.
`
            } else {
              texteCorr += `Comme $\\dfrac{${b * b}}{${a - 2 * b}}=${f.texFraction}$, on doit choisir $x${a - 2 * b > 0 ? `${choix[1]}` : `${choix[2]}`}${f.texFraction}$ pour que le résultat obtenu 
  avec le programme 1 soit ${choix[0]} à celui obtenu avec le programme 2.`
            }
          }

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
  this.besoinFormulaireNumerique = ['Choix des questions', 4, '1 : Situation concrète\n2 : Situation géométrique\n3 : Programme de calcul\n4 : Mélange des cas précédents']
}
