import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { mathalea2d, tableau_de_variation } from '../../modules/2d.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, abs, pgcd, texFractionReduite, miseEnEvidence, texFraction, texSymbole } from '../../modules/outils.js'

export const titre = 'Résoudre inéquation produit ou quotient'

/**
 * Résoudre inéquation produit ou quotient
 * * Type 1 : (x+a)(x+b)<0
 * * Type 2 : (x+a)(x+b)(x+c)<0
 * * Type 3 : (ax+b)(cx+d)<0
 * * Type 4 : (x+a)/(x+b)<0
 * * Tous les types
 * @author Guillaume Valmont
 * 2N61-2
 */
export default function ExerciceInequation2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les inéquations suivantes'
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 2)
  this.correctionDetailleeDisponible = true
  if (!context.isHtml) {
    this.correctionDetaillee = false
  }
  this.sup = 1 // Choix du type d'inéquation
  this.nbQuestions = 5

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions
    switch (this.sup.toString()) {
      case '1':
        listeTypeDeQuestions = ['(x+a)(x+b)<0']
        break
      case '2':
        listeTypeDeQuestions = ['(x+a)(x+b)(x+c)<0']
        break
      case '3':
        listeTypeDeQuestions = ['(ax+b)(cx+d)<0']
        break
      case '4':
        listeTypeDeQuestions = ['(x+a)/(x+b)<0']
        break
      default:
        listeTypeDeQuestions = [
          '(x+a)(x+b)<0',
          '(x+a)(x+b)(x+c)<0',
          '(ax+b)(cx+d)<0',
          '(x+a)/(x+b)<0'
        ]
        break
    }
    listeTypeDeQuestions = combinaisonListes(
      listeTypeDeQuestions,
      this.nbQuestions
    )
    for (let i = 0, a, b, c, d, symboleInegalite, pGauche, pDroite, texte, ligne1, ligne2, ligne3, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(2, 13)
      b = randint(1, 13, a)
      c = randint(2, 13, [a, b])
      d = randint(1, 13, [a, b, c])
      switch (randint(1, 4)) {
        case 1:
          symboleInegalite = '<'
          pGauche = ']'
          pDroite = '['
          break
        case 2:
          symboleInegalite = '≤'
          pGauche = '['
          pDroite = ']'
          break
        case 3:
          symboleInegalite = '>'
          pGauche = ']'
          pDroite = '['
          break
        case 4:
          symboleInegalite = '≥'
          pGauche = '['
          pDroite = ']'
          break
      }
      a *= choice([-1, 1])
      b *= choice([-1, 1])
      c *= choice([-1, 1])
      d *= choice([-1, 1])

      if (listeTypeDeQuestions[i] === '(x+a)(x+b)<0') {
        texte = `$(x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})${texSymbole(symboleInegalite)}0$`
        texteCorr = texte + '<br>'
        texteCorr += `$x${ecritureAlgebrique(a)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-a}$ <br>`
        texteCorr += `$x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-b}$ <br>`
        texteCorr += 'On peut donc en déduire le tableau de signes suivant : <br>'
        if (Math.min(-a, -b) === -a) {
          ligne1 = ['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20]
          ligne2 = ['Line', 30, 'R/', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20]
        } else {
          ligne1 = ['Line', 30, 'R/', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20]
          ligne2 = ['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20]
        }
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -8.5, xmax: 30, ymax: 0.5 }, tableau_de_variation({
          tabInit: [
            [
              ['$x$', 2, 30], [`$x${ecritureAlgebrique(a)}$`, 2, 50], [`$x${ecritureAlgebrique(b)}$`, 2, 50], [`$(x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})$`, 2, 100]
            ],
            ['$-\\infty$', 30, `$${Math.min(-a, -b)}$`, 20, `$${Math.max(-a, -b)}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ['Line', 30, 'R/', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]],
          colorBackground: '',
          escpl: 3.5,
          delatcl: 0.8,
          lgt: 6,
          hauteurLignes: [15, 15, 15, 15]
        }))
        if ((symboleInegalite === '<' || symboleInegalite === '≤')) {
          texteCorr += `L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${Math.min(-a, -b)} , ${Math.max(-a, -b)} \\right${pDroite} $.`
        } else if ((symboleInegalite === '>' || symboleInegalite === '≥')) {
          texteCorr += `L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${Math.min(-a, -b)} \\right${pDroite} \\bigcup \\left${pGauche} ${Math.max(-a, -b)}, +\\infty \\right[ $.`
        }
      }
      if (listeTypeDeQuestions[i] === '(x+a)(x+b)(x+c)<0') {
        texte = `$(x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})(x${ecritureAlgebrique(c)})${texSymbole(symboleInegalite)}0$`
        texteCorr = texte + '<br>'
        texteCorr += `$x${ecritureAlgebrique(a)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-a}$ <br>`
        texteCorr += `$x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-b}$ <br>`
        texteCorr += `$x${ecritureAlgebrique(c)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-c}$ <br>`
        // On range les racines dans l'ordre croissant pour pouvoir les mettre dans l'ordre dans le tableau
        const racines = [-a, -b, -c].sort(function (a, b) { return a - b })
        const lignes = [-a, -b, -c]
        // Pour chaque ligne, on cherche la racine correspondante
        for (let j = 0; j < 3; j++) {
          for (let n = 0; n < 3; n++) {
            if (racines[n] === lignes[j]) {
              if (n === 0) {
                lignes[j] = ['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20, 'z', 0, '+', 20]
              } else if (n === 1) {
                lignes[j] = ['Line', 30, 'R/', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20]
              } else if (n === 2) {
                lignes[j] = ['Line', 30, 'R/', 0, '-', 20, 'z', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20]
              }
            }
          }
        }
        texteCorr += 'On peut donc en déduire le tableau de signes suivant : <br>'
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -10.5, xmax: 30, ymax: 0.5 }, tableau_de_variation({
          tabInit: [
            [
              ['$x$', 2, 30], [`$x${ecritureAlgebrique(a)}$`, 2, 50], [`$x${ecritureAlgebrique(b)}$`, 2, 50], [`$x${ecritureAlgebrique(c)}$`, 2, 50], [`$(x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})(x${ecritureAlgebrique(c)})$`, 2, 150]
            ],
            ['$-\\infty$', 30, `$${racines[0]}$`, 20, `$${racines[1]}$`, 20, `$${racines[2]}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [lignes[0], lignes[1], lignes[2], ['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]],
          colorBackground: '',
          escpl: 3.5,
          delatcl: 0.8,
          lgt: 10,
          hauteurLignes: [15, 15, 15, 15, 15]
        }))
        if ((symboleInegalite === '<' || symboleInegalite === '≤')) {
          texteCorr += `L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${racines[0]} \\right${pDroite} \\bigcup \\left${pGauche} ${racines[1]} , ${racines[2]} \\right${pDroite} $.`
        } else if ((symboleInegalite === '>' || symboleInegalite === '≥')) {
          texteCorr += `L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${racines[0]} , ${racines[1]} \\right${pDroite} \\bigcup \\left${pGauche} ${racines[2]}, +\\infty \\right[ $.`
        }
      }
      if (listeTypeDeQuestions[i] === '(ax+b)(cx+d)<0') {
        let valPetit, valGrand, exPetit, exGrand
        texte = `$(${a}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})${texSymbole(symboleInegalite)}0$`
        texteCorr = texte
        if (this.correctionDetaillee) {
          ecrireCorrectionDetaillee(a, b)
          ecrireCorrectionDetaillee(c, d)
          function ecrireCorrectionDetaillee (var1, var2) {
            texteCorr += `<br>$${var1}x${ecritureAlgebrique(var2)}${texSymbole('>')}0$ <br>`
            texteCorr += `$${var1}x${ecritureAlgebrique(var2)}${miseEnEvidence(ecritureAlgebrique(-1 * var2))}
            ${texSymbole('>')}${miseEnEvidence(ecritureAlgebrique(-1 * var2))}$<br>`
            texteCorr += `$${var1}x${texSymbole('>')}${-var2}$<br>`
            if (var1 < 0) {
              texteCorr += `$${var1}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1) +
                texSymbole('<'))}${-var2 + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}$<br>`
              texteCorr += `$x${texSymbole('<')}${texFraction(-var2, var1)}$`
              texteCorr += `<br>Donc $${var1}x${ecritureAlgebrique(var2)}${texSymbole('>')}0$ lorsque $x${texSymbole('<')} ${texFractionReduite(-var2, var1)}$`
            } else {
              texteCorr += `$${var1}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}
                ${texSymbole('>')}${-var2 + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}$<br>`
              if (pgcd(abs(var1), abs(-var2)) > 1) {
                texteCorr += `$x${texSymbole('>')} ${texFraction(-var2, var1)}$`
                texteCorr += `<br>Donc $${var1}x${ecritureAlgebrique(var2)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${texFractionReduite(-var2, var1)}$`
              } else {
                texteCorr += `Donc $${var1}x${ecritureAlgebrique(var2)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')} ${texFraction(-var2, var1)}$`
              }
            }
          }
        } else {
          if (a < 0) {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('<')} ${texFractionReduite(-b, a)}$`
          } else {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')} ${texFractionReduite(-b, a)}$`
          }
          if (c < 0) {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ lorsque $x${texSymbole('<')} ${texFractionReduite(-d, c)}$`
          } else {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')} ${texFractionReduite(-d, c)}$`
          }
        }
        texteCorr += '<br>On peut donc en déduire le tableau de signes suivant : <br>'
        if (-b / a < -d / c) {
          valPetit = texFractionReduite(-b, a)
          valGrand = texFractionReduite(-d, c)
          exPetit = `$${a}x${ecritureAlgebrique(b)}$`
          exGrand = `$${c}x${ecritureAlgebrique(d)}$`
          if (a > 0) {
            ligne1 = ['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20]
          } else {
            ligne1 = ['Line', 30, 'R/', 0, '+', 20, 'z', 20, '-', 20, 'z', 0, '-', 20]
          }
          if (c > 0) {
            ligne2 = ['Line', 30, 'R/', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20]
          } else {
            ligne2 = ['Line', 30, 'R/', 0, '+', 20, 'z', 0, '+', 20, 'z', 20, '-', 20]
          }
        } else {
          valGrand = texFractionReduite(-b, a)
          valPetit = texFractionReduite(-d, c)
          exGrand = `$${a}x${ecritureAlgebrique(b)}$`
          exPetit = `$${c}x${ecritureAlgebrique(d)}$`
          if (a > 0) {
            ligne2 = ['Line', 30, 'R/', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20]
          } else {
            ligne2 = ['Line', 30, 'R/', 0, '+', 20, 'z', 0, '+', 20, 'z', 20, '-', 20]
          }
          if (c > 0) {
            ligne1 = ['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20]
          } else {
            ligne1 = ['Line', 30, 'R/', 0, '+', 20, 'z', 20, '-', 20, 'z', 0, '-', 20]
          }
        }
        if (a * c > 0) {
          ligne3 = ['Line', 30, 'R/', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]
        } else {
          ligne3 = ['Line', 30, 'R/', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20]
        }
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -13, xmax: 30, ymax: 0.5 }, tableau_de_variation({
          tabInit: [
            [
              ['$x$', 3, 30], [exPetit, 3, 75], [exGrand, 3, 75], [`$(${a}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})$`, 3, 200]
            ],
            ['$-\\infty$', 30, `$${valPetit}$`, 20, `$${valGrand}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ligne3],
          colorBackground: '',
          escpl: 3.5,
          delatcl: 0.8,
          lgt: 8,
          hauteurLignes: [15, 15, 15, 15]
        }))
        if ((symboleInegalite === '<' || symboleInegalite === '≤')) {
          texteCorr += `L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${valPetit} , ${valGrand} \\right${pDroite} $.`
        } else if ((symboleInegalite === '>' || symboleInegalite === '≥')) {
          texteCorr += `L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${valPetit} \\right${pDroite} \\bigcup \\left${pGauche} ${valGrand}, +\\infty \\right[ $.`
        }
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
  this.besoinFormulaireNumerique = [
    "Type d'inéquations",
    5,
    '1: (x+a)(x+b)<0\n2: (x+a)(x+b)(x+c)<0\n3: (ax+b)(cx+d)<0\n4: (x+a)/(x+b)<0\n5: Tous les types précédents'
  ]
}
