import { listeQuestionsToContenu, randint, combinaisonListes, ecritureAlgebrique, calcul, texRacineCarree, ecritureParentheseSiNegatif, texNombre, fractionSimplifiee, texFraction } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
import Exercice from '../Exercice.js'
export const titre = 'Résoudre des équations avec logarithmes'
const drteParab = l => l.length === 2 ? `${l[0]}x${ecritureAlgebrique(l[1])}` : `${l[0]}x^2${ecritureAlgebrique(l[1])}x${ecritureAlgebrique(l[2])}`
const EgalEnviron = (v, d = 3) => ((Math.abs(v) * 10 ** d) % 1 > 0 ? '\\approx' : '=') + texNombre(calcul(v, 3))

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function EquationAvecUnLogarithme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Résoudre dans $\\mathbb{R}$ les équations suivantes :'
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1.5)
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = ['lnu=lnv', '2lnu=lnv', 'lnu+lnv=lnw']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    const Txtsimplifier = '<br>L\'équation étant du type $\\ln(a)=\\ln(b)$, nous pouvons enlever les logarithmes des 2 côtés de l\'égalité :'
    const TxtConclusion = '<br>$\\underline{\\text{Conclusion}}$ :'
    for (let i = 0, texte, texteCorr, droites, c, a, b, nbelt, formule, u, v, x1, x2, etape, faux, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      droites = []
      c = []
      for (let j = 0; j < 3; j++) {
        a = randint(-10, 10, [0, -1, 1]) // on génère 3 équations de droites ax+b
        b = randint(-10, 10, 0)
        c.push(a, b)
        droites.push(`${a}x${ecritureAlgebrique(b)}`)
      }

      switch (listeTypeDeQuestions[i]) {
        case 'lnu=lnv': // Equation du type ln(u)=ln(v)
          nbelt = 2 // 2 éléments u et v
          // Enoncé
          texte = `$\\ln(${droites[0]})=\\ln(${droites[1]})$`
          formule = Txtsimplifier
          u = [c[0], c[1]] // u et v sont des droites
          v = [c[2], c[3]]
          break
        case '2lnu=lnv': // Equation du type 2.ln(u) = ln(v)
          nbelt = 2 // 2 éléments u et v
          texte = `$2\\ln(${droites[0]})=\\ln(${droites[1]})$`
          formule = '<br>Ecrivons le côté gauche sous la forme $\\ln(a)$ en utilisant la propriété $n.\\ln(a)=\\ln(a^n)$ :'
          formule += `<br>$\\ln[(${droites[0]})^2]=\\ln(${droites[1]})$`
          formule += Txtsimplifier
          formule += `<br>$(${droites[0]})^2=${droites[1]}$`
          u = [c[0] * c[0], 2 * c[0] * c[1], c[1] * c[1]] // u est une parabole
          v = [c[2], c[3]] // v est une droite
          formule += `<br>Comme $(${droites[0]})^2=${drteParab(u)}$, l'équation s'écrit :`
          break
        case 'lnu+lnv=lnw': // Equation du type ln(u) + ln(v) = ln(w)
          nbelt = 3 // 3 éléments u, v et w
          texte = `$\\ln(${droites[0]})+\\ln(${droites[1]})=\\ln(${droites[2]})$`
          formule = '<br>Ecrivons le côté gauche sous la forme $\\ln(a)$ en utilisant la propriété $\\ln(u)+\\ln(v)=\\ln(uv)$ :'
          formule += `<br>$\\ln[(${droites[0]})(${droites[1]})]=\\ln(${droites[2]})$`
          formule += Txtsimplifier
          formule += `<br>$(${droites[0]})(${droites[1]})=${droites[2]}$`
          u = [c[0] * c[2], c[0] * c[3] + c[1] * c[2], c[1] * c[3]] // u est une parabole
          v = [c[4], c[5]] // v est une droite
          formule += `<br>Comme $(${droites[0]})(${droites[1]})=${drteParab(u)}$, l'équation s'écrit :`
          break
      }
      texteCorr = `Cette équation n'a un sens que si : $${droites[0]} > 0$ et $${droites[1]} > 0$ ` +
        (nbelt === 2 ? '' : ` et $${droites[2]} > 0$`)
      texteCorr += formule
      texteCorr += `<br>$${drteParab(u)}=${drteParab(v)}$`
      if (u.length === 3) { // équation du 2e degré
        a = [u[0], u[1] - v[0], u[2] - v[1]]
        texteCorr += '<br>En passant tous les termes d\'un même côté :'
        texteCorr += `<br>$${drteParab(a)}=0$`
        b = a[1] ** 2 - 4 * a[0] * a[2]
        texteCorr += `<br>Son discriminant vaut $\\Delta = ${b}$`
        if (b > 0) { // On a a priori 2 solutions
          texteCorr += '$> 0$'
          x1 = (-a[1] - Math.sqrt(b)) / 2 / a[0]
          x2 = (-a[1] + Math.sqrt(b)) / 2 / a[0]
          texteCorr += '<br>D\'où 2 solutions '
          texteCorr += `$x_1=\\dfrac{${ecritureAlgebrique(-a[1])}-${texRacineCarree(b)}}{2\\times ${ecritureParentheseSiNegatif(a[0])}}${EgalEnviron(x1, 3)}$`
          texteCorr += ` et $x_2=\\dfrac{${ecritureAlgebrique(-a[1])}+${texRacineCarree(b)}}{2\\times ${ecritureParentheseSiNegatif(a[0])}}${EgalEnviron(x2)}$`
          // On va vérifier si les solutions conviennent
          // eslint-disable-next-line no-unused-vars
          etape = [x1, x2].forEach((v, i) => {
            texteCorr += `<br>Vérifions si $x_${i + 1}$ est bien dans le domaine de définition de l'équation : `
            faux = false
            for (let j = 0; j < 3; j++) {
              const resultat = c[2 * j] * v + c[2 * j + 1]
              texteCorr += `<br>$${c[2 * j]}x_${i + 1}${ecritureAlgebrique(c[2 * j + 1])}${EgalEnviron(resultat)}`
              if (c[2 * j] * v + c[2 * j + 1] > 0) {
                texteCorr += '> 0$'
              } else {
                texteCorr += '\\leq 0$ ce qui n\'est pas possible.'
                faux = true
                break
              }
            }
            texteCorr += `${TxtConclusion} La valeur $x_${i + 1}$ ` + (faux ? 'ne convient pas' : '$\\textbf{\\text{convient}}$')
          })
        } else if (b === 0) { // a priori 1 seule solution
          x1 = -a[1] / 2 / a[0]
          texteCorr += '<br>Ce qui donne 1 solution '
          texteCorr += `$x_1=\\dfrac{${ecritureAlgebrique(-a[1])}}{2\\times ${ecritureParentheseSiNegatif(a[0])}}${EgalEnviron(x1)}$`
          texteCorr += '<br>Vérifions si cette solution est bien dans le domaine de définition de l\'équation : '
          faux = false
          // On va vérifier si la solution convient
          for (let j = 0; j < 3; j++) {
            texteCorr += `<br>$${c[2 * j]}x_${i + 1}${ecritureAlgebrique(c[2 * j + 1])}${EgalEnviron(c[2 * j] * v + c[2 * j + 1])}`
            if (c[2 * j] * v + c[2 * j + 1] > 0) {
              texteCorr += ' > 0$'
            } else {
              texteCorr += '\\leq 0$ ce qui n\'est pas possible.'
              faux = true
              break
            }
          }
          texteCorr += `${TxtConclusion} La valeur $x_1$ ` + (faux ? 'ne convient pas' : '$\\textbf{\\text{convient}}$')
        } else { // pas de solution
          texteCorr += '$< 0$'
          texteCorr += `${TxtConclusion} L'équation n'a donc pas de solution réelle.`
        }
      } else { // Equation 1er degré
        a = [u[0] - v[0], v[1] - u[1]]
        texteCorr += `<br>Ce qui donne : $${a[0]}x=${a[1]}$`
        if (a[0] === 0) { // 0.x = b
          if (a[1] === 0) { // 0.x = 0
            texteCorr += `${TxtConclusion} Tous les réels du domaine de définition sont solutions de l'équation.`
          } else {
            texteCorr += `${TxtConclusion} L'équation n'a pas de solution.`
          }
        } else { // a.x = b avec a non nul
          x1 = fractionSimplifiee(a[1], a[0])
          x2 = a[1] / a[0] // valeur approchée
          texteCorr += `<br>Vérifions si la solution $x=${texFraction(x1[0], x1[1])}$ est bien dans le domaine de définition de l'équation : `
          faux = false
          // On va vérifier si la solution convient
          for (let j = 0; j < 2; j++) {
            const resultat = c[2 * j] * x2 + c[2 * j + 1]
            texteCorr += `<br>$${c[2 * j]}\\times${texFraction(x1[0], x1[1])}${ecritureAlgebrique(c[2 * j + 1])}${EgalEnviron(resultat)}`
            if (c[2 * j] * x2 + c[2 * j + 1] > 0) {
              texteCorr += '> 0$'
            } else {
              texteCorr += '\\leq 0$ ce qui n\'est pas possible.'
              faux = true
              break
            }
          }
          texteCorr += `${TxtConclusion} La valeur ` + (faux ? 'ne convient pas' : '$\\textbf{\\text{convient}}$')
        }
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}

// python3 list-to-js.py pour faire apparaître l'exercice dans le menu
