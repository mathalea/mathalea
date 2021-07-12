import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureParentheseSiNegatif, signe, abs, pgcd, texFractionReduite, miseEnEvidence, texFraction, texSymbole } from '../../modules/outils.js'

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
    for (let i = 0, a, b, c, d, symboleInegalite, symboleInegaliteOppose, inegaliteStricte, pGauche, pDroite, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(2, 13)
      b = randint(1, 13, a)
      c = randint(1, 13, [a, b])
      d = randint(1, 13, [a, b, c])
      switch (randint(1, 4)) {
        case 1:
          symboleInegalite = '<'
          symboleInegaliteOppose = '>'
          inegaliteStricte = true
          break
        case 2:
          symboleInegalite = '≤'
          symboleInegaliteOppose = '≥'
          inegaliteStricte = false
          break
        case 3:
          symboleInegalite = '>'
          symboleInegaliteOppose = '<'
          inegaliteStricte = true
          break
        case 4:
          symboleInegalite = '≥'
          symboleInegaliteOppose = '≤'
          inegaliteStricte = false
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
        texteCorr += `On peut donc en déduire le tableau de signes suivant : <br> $
        \\def\\arraystretch{1.5}
        \\begin{array}{|c|c c c c c c c|}
        \\hline
        x                                                      & -\\infty &   & ${Math.min(-a, -b)} &   & ${Math.max(-a, -b)} &   & +\\infty \\\\ \\hline
        x${ecritureAlgebrique(-Math.min(-a, -b))}              &          & - &           0         &   &                     & + &          \\\\ \\hline
        x${ecritureAlgebrique(-Math.max(-a, -b))}              &          & - &                     &   &           0         & + &          \\\\ \\hline
        (x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)}) &          & + &           0         & - &           0         & + &          \\\\ \\hline
        \\end{array} $ <br>`
        if (inegaliteStricte) {
          pGauche = ']'
          pDroite = '['
        } else {
          pGauche = '['
          pDroite = ']'
        }
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
        const racines = [-a, -b, -c].sort(function (a, b) { return a - b })
        texteCorr += `On peut donc en déduire le tableau de signes suivant : <br> $
        \\def\\arraystretch{1.5}
        \\begin{array}{|c|c c c c c c c c c|}
        \\hline
        x                                                                                &-\\infty& &${racines[0]}& &${racines[1]}& &${racines[2]}& &+\\infty\\\\ \\hline
        x${ecritureAlgebrique(-racines[0])}                                              &        &-&      0      & &             & &             &+&        \\\\ \\hline
        x${ecritureAlgebrique(-racines[1])}                                              &        &-&             & &      0      & &             &+&        \\\\ \\hline
        x${ecritureAlgebrique(-racines[2])}                                              &        &-&             & &             & &      0      &+&        \\\\ \\hline
        (x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})(x${ecritureAlgebrique(c)})&        &-&      0      &+&      0      &-&      0      &+&        \\\\ \\hline
        \\end{array} $ <br>`
        if (inegaliteStricte) {
          pGauche = ']'
          pDroite = '['
        } else {
          pGauche = '['
          pDroite = ']'
        }
        if ((symboleInegalite === '<' || symboleInegalite === '≤')) {
          texteCorr += `L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${racines[0]} \\right${pDroite} \\bigcup \\left${pGauche} ${racines[1]} , ${racines[2]} \\right${pDroite} $.`
        } else if ((symboleInegalite === '>' || symboleInegalite === '≥')) {
          texteCorr += `L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${racines[0]} , ${racines[1]} \\right${pDroite} \\bigcup \\left${pGauche} ${racines[2]}, +\\infty \\right[ $.`
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
