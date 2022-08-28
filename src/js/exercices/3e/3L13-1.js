import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureParentheseSiNegatif, signe, abs, pgcd, texFractionReduite, miseEnEvidence, texFraction, lampeMessage } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import FractionEtendue from '../../modules/FractionEtendue.js'
export const titre = 'Équation du premier degré (utilisant la distributivité)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = false // AMC : pour l'instant on ne peut pas tester une réponse parfois décimale parfois fractionnaire

/**
* Équation du premier degré
* * Type 1 : ax+b=cx+d
* * Type 2 : k(ax+b)=cx+d
* * Type 3 : k-(ax+b)=cx+d
* * Tous les types
* @author Rémi Angot
* Rendre interactif Laurence Candille
* 3L13-1
*/
export const uuid = '1802d'
export const ref = '3L13-1'
export default function ExerciceEquation1Tiret2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les équations suivantes :'
  this.spacing = 2
  this.interactifType = 'mathLive'
  context.isHtml ? this.spacingCorr = 3 : this.spacingCorr = 2
  this.correctionDetailleeDisponible = true
  if (!context.isHtml) {
    this.correctionDetaillee = false
  }
  this.nbQuestions = 3
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    if (this.interactif) {
      this.introduction = lampeMessage({
        titre: '',
        texte: `Résoudre les équations au brouillon et écrire les solutions dans les cases.<br> On rappelle qu'il faut donner une solution exacte (par exemple $${texFraction(1, 3)})$ plutôt qu'une valeur aprrochée (comme 0,3333).`,
        couleur: 'nombres'
      })
    }
    let listeTypeDeQuestions = ['ax+b=cx+d', 'k(ax+b)=cx+d', 'k-(ax+b)=cx+d']
    listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    for (let i = 0, a, b, c, d, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(-9, 9, 0)
      b = randint(-9, 9, 0)
      c = randint(-9, 9, 0)
      d = randint(-9, 9, 0)
      k = randint(2, 9)
      if (listeTypeDeQuestions[i] === 'ax+b=cx+d') {
        if (c === a) { c = randint(1, 9, [a]) } // sinon on arrive à une division par 0
        if (!this.sup && a < c) {
          c = randint(1, 9)
          a = randint(c + 1, 15) // a sera plus grand que c pour que a-c>0
        }
        texte = `$${rienSi1(a)}x${ecritureAlgebrique(b)}=${rienSi1(c)}x${ecritureAlgebrique(d)}$<br>`
        texteCorr = texte
        if (this.interactif) {
          texte += '$x =$' + ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br><br>'
          setReponse(this, i, new FractionEtendue(d - b, a - c), { formatInteractif: 'fractionEgale' })
        }
        if (this.correctionDetaillee) {
          if (c > 0) {
            texteCorr += `On soustrait $${rienSi1(c)}x$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${rienSi1(-1 * c)}x$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(a)}x${ecritureAlgebrique(b)}${miseEnEvidence(signe(-1 * c) + rienSi1(abs(c)) + 'x')}=${c}x+${d}${miseEnEvidence(signe(-1 * c) + rienSi1(abs(c)) + 'x')}$<br>`
        texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(b)}=${d}$<br>`
        if (this.correctionDetaillee) {
          if (b > 0) {
            texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-1 * b))}=${d}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
        texteCorr += `$${rienSi1(a - c)}x=${d - b}$<br>`

        if (this.correctionDetaillee) { texteCorr += `On divise les deux membres par $${a - c}$.<br>` }
        texteCorr += `$${rienSi1(a - c)}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}=${d - b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}$<br>`
        texteCorr += `$x=${texFraction(d - b, a - c)}$`
        if (pgcd(abs(d - b), abs(a - c)) > 1 || (a - c) < 0) {
          texteCorr += `<br>$x=${texFractionReduite(d - b, a - c)}$`
        }
        texteCorr += `<br> La solution est $${texFractionReduite(d - b, a - c)}$.`
      }

      if (listeTypeDeQuestions[i] === 'k(ax+b)=cx+d') {
        if (c === k * a) { c = randint(1, 9, [a]) } // sinon on arrive à une division par 0
        texte = `$${k}(${rienSi1(a)}x${ecritureAlgebrique(b)})=${rienSi1(c)}x${ecritureAlgebrique(d)}$<br>`
        texteCorr = texte
        if (this.interactif) {
          texte += '$x =$' + ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br><br>'
          setReponse(this, i, new FractionEtendue(d - k * b, a * k - c), { formatInteractif: 'fractionEgale' })
        }
        if (this.correctionDetaillee) {
          texteCorr += 'On développe le membre de gauche.<br>'
        }
        texteCorr += `$${k * a}x${ecritureAlgebrique(k * b)}=${rienSi1(c)}x${ecritureAlgebrique(d)}$<br>`
        if (this.correctionDetaillee) {
          if (c > 0) {
            texteCorr += `On soustrait $${rienSi1(c)}x$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${rienSi1(-1 * c)}x$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${k * a}x${ecritureAlgebrique(k * b)}${miseEnEvidence(signe(-1 * c) + rienSi1(abs(c)) + 'x')}=${c}x${ecritureAlgebrique(d)}${miseEnEvidence(signe(-1 * c) + rienSi1(abs(c)) + 'x')}$<br>`
        texteCorr += `$${rienSi1(k * a - c)}x${ecritureAlgebrique(k * b)}=${d}$<br>`
        if (this.correctionDetaillee) {
          if (k * b > 0) {
            texteCorr += `On soustrait $${k * b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-k * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(k * a - c)}x${ecritureAlgebrique(k * b)}${miseEnEvidence(ecritureAlgebrique(-k * b))}=${d}${miseEnEvidence(ecritureAlgebrique(-k * b))}$<br>`
        texteCorr += `$${rienSi1(k * a - c)}x=${d - k * b}$<br>`

        if (this.correctionDetaillee) { texteCorr += `On divise les deux membres par $${k * a - c}$.<br>` }
        texteCorr += `$${rienSi1(k * a - c)}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(k * a - c))}=${d - k * b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(k * a - c))}$<br>`
        texteCorr += `$x=${texFraction(d - k * b, k * a - c)}$`
        if (pgcd(abs(d - k * b), abs(k * a - c)) > 1 || (k * a - c) < 0) {
          texteCorr += `<br>$x=${texFractionReduite(d - k * b, k * a - c)}$`
        }
        texteCorr += `<br> La solution est $${texFractionReduite(d - k * b, k * a - c)}$.`
      }

      if (listeTypeDeQuestions[i] === 'k-(ax+b)=cx+d') {
        if (c === -a) { c = randint(-9, 9, [0, a]) } // sinon on arrive à une division par 0
        texte = `$${k}-(${rienSi1(a)}x${ecritureAlgebrique(b)})=${rienSi1(c)}x${ecritureAlgebrique(d)}$<br>`
        texteCorr = texte
        if (this.interactif) {
          texte += '$x =$' + ajouteChampTexteMathLive(this, i, 'inline largeur25') + '<br><br>'
          setReponse(this, i, new FractionEtendue(k - b - d, a + c), { formatInteractif: 'fractionEgale' })
        }
        if (this.correctionDetaillee) {
          texteCorr += 'On développe le membre de gauche.<br>'
        }
        texteCorr += `$${k}${ecritureAlgebrique(-a)}x${ecritureAlgebrique(-b)}=${rienSi1(c)}x${ecritureAlgebrique(d)}$<br>`
        texteCorr += `$${rienSi1(-a)}x${ecritureAlgebrique(k - b)}=${rienSi1(c)}x${ecritureAlgebrique(d)}$<br>`

        // On reprend le cas ax+b=cx+d en changeant les valeurs de a et b
        a = -a
        b = k - b

        if (this.correctionDetaillee) {
          if (c > 0) {
            texteCorr += `On soustrait $${rienSi1(c)}x$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${rienSi1(-1 * c)}x$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(a)}x${ecritureAlgebrique(b)}${miseEnEvidence(signe(-1 * c) + rienSi1(abs(c)) + 'x')}=${c}x+${d}${miseEnEvidence(signe(-1 * c) + rienSi1(abs(c)) + 'x')}$<br>`
        texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(b)}=${d}$<br>`
        if (this.correctionDetaillee) {
          if (b > 0) {
            texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-1 * b))}=${d}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
        texteCorr += `$${rienSi1(a - c)}x=${d - b}$<br>`

        if (this.correctionDetaillee) { texteCorr += `On divise les deux membres par $${a - c}$.<br>` }
        texteCorr += `$${rienSi1(a - c)}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}=${d - b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}$<br>`
        texteCorr += `$x=${texFraction(d - b, a - c)}$`
        if (pgcd(abs(d - b), abs(a - c)) > 1 || (a - c) < 0) {
          texteCorr += `<br>$x=${texFractionReduite(d - b, a - c)}$`
        }
        texteCorr += `<br> La solution est $${texFractionReduite(d - b, a - c)}$.`
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte) // replace(/1x/g,'x')); //remplace 1x par x
        this.listeCorrections.push(texteCorr) // .replace(/1x/g,'x')); //remplace 1x par x
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
