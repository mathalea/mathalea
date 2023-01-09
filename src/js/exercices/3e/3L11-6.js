import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, choice, combinaisonListes, randint, lettreDepuisChiffre, ecritureAlgebrique, rienSi1, miseEnEvidence, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Factoriser une expression complexe'
export const interactifReady = true
export const interactifType = 'mathLive'
// Il y a un problème avec l'ordre de la multiplication

/**
* Factoriser avec un facteur commun évident des expressions complexes
* Publié le 22/05/2021
* @author Lhote Jean-Claude
* 3L11-6
*/
export const uuid = '51360'
export const ref = '3L11-6'
export default function FactoriserUneExpression3e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.consigne = this.nbQuestions > 1 ? 'Factoriser les expressions suivantes.' : 'Factoriser l\'expression suivante.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    if (parseInt(this.sup) === 1) {
      typesDeQuestionsDisponibles = ['c(ax+b)+x(ax+b)', 'c(ax+b)-x(ax+b)', 'x(ax+b)+c(ax+b)', 'x(ax+b)-c(ax+b)']
    } else if (parseInt(this.sup) === 2) {
      typesDeQuestionsDisponibles = ['(ax+b)(cx+d)+(ax+b)(ex+f)', '(ax+b)(cx+d)-(ax+b)(ex+f)', '(cx+d)(ax+b)+(ax+b)(ex+f)', '(cx+d)(ax+b)-(ax+b)(ex+f)', '(ax+b)(cx+d)+(ex+f)(ax+b)', '(ax+b)(cx+d)-(ex+f)(ax+b)', '(cx+d)(ax+b)+(ex+f)(ax+b)', '(cx+d)(ax+b)-(ex+f)(ax+b)']
    } else {
      typesDeQuestionsDisponibles = ['c(ax+b)+x(ax+b)', 'c(ax+b)-x(ax+b)', 'x(ax+b)+c(ax+b)', 'x(ax+b)-c(ax+b)', '(ax+b)(cx+d)+(ax+b)(ex+f)', '(ax+b)(cx+d)-(ax+b)(ex+f)', '(cx+d)(ax+b)+(ax+b)(ex+f)', '(cx+d)(ax+b)-(ax+b)(ex+f)', '(ax+b)(cx+d)+(ex+f)(ax+b)', '(ax+b)(cx+d)-(ex+f)(ax+b)', '(cx+d)(ax+b)+(ex+f)(ax+b)', '(cx+d)(ax+b)-(ex+f)(ax+b)']
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, reponse, a, b, c, d, e, f, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(1, 3)
      b = randint(1, 5) * choice([-1, 1])
      c = randint(2, 5)
      d = randint(2, 5, c) * choice([-1, 1])
      e = randint(1, 6, c)
      f = randint(1, 5, Math.abs(d)) * choice([-1, 1])
      switch (listeTypeDeQuestions[i]) {
        case 'c(ax+b)+x(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)} = ${c}(${rienSi1(a)}x${ecritureAlgebrique(b)})+x(${rienSi1(a)}x${ecritureAlgebrique(b)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `${sp(2)}On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$\\phantom{ABC}=${miseEnEvidence(c, 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}+${miseEnEvidence('x', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}$`
            texteCorr += `<br>$\\phantom{ABC}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + '+x)', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}+x)$<br>`
          }
          reponse = [`(${c}+x)(${rienSi1(a)}x${ecritureAlgebrique(b)})`, `(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}+x)`]
          break
        case 'c(ax+b)-x(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)} = ${c}(${rienSi1(a)}x${ecritureAlgebrique(b)})-x(${rienSi1(a)}x${ecritureAlgebrique(b)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `${sp(2)}On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$\\phantom{ABC}=${miseEnEvidence(c, 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}-${miseEnEvidence('x', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}$`
            texteCorr += `<br>$\\phantom{ABC}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + '-x)', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}-x)$<br>`
          }
          reponse = [`(${c}-x)(${rienSi1(a)}x${ecritureAlgebrique(b)})`, `(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}-x)`]
          break
        case 'x(ax+b)+c(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)} = x(${rienSi1(a)}x${ecritureAlgebrique(b)})+${c}(${rienSi1(a)}x${ecritureAlgebrique(b)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `${sp(2)}On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$\\phantom{ABC}=${miseEnEvidence('x', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}+${miseEnEvidence(c, 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}$`
            texteCorr += `<br>$\\phantom{ABC}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(x+' + c + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(x+${c})$<br>`
          }
          reponse = [`(x+${c})(${rienSi1(a)}x${ecritureAlgebrique(b)})`, `(${rienSi1(a)}x${ecritureAlgebrique(b)})(x+${c})`]
          break
        case 'x(ax+b)-c(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)} = x(${rienSi1(a)}x${ecritureAlgebrique(b)})-${c}(${rienSi1(a)}x${ecritureAlgebrique(b)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `${sp(2)}On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$\\phantom{ABC}=${miseEnEvidence('x', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}-${miseEnEvidence(c, 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}$`
            texteCorr += `<br>$\\phantom{ABC}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(x-' + c + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(x-${c})$<br>`
          }
          reponse = [`(x-${c})(${rienSi1(a)}x${ecritureAlgebrique(b)})`, `(${rienSi1(a)}x${ecritureAlgebrique(b)})(x-${c})`]
          break
        case '(ax+b)(cx+d)+(ax+b)(ex+f)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})+(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(e)}x${ecritureAlgebrique(f)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}+${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '+' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(c + e) + 'x' + ecritureAlgebrique(d + f) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c + e}x${ecritureAlgebrique(d + f)})$<br>`
          }
          reponse = [`(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c + e}x${ecritureAlgebrique(d + f)})`, `(${c + e}x${ecritureAlgebrique(d + f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})`]
          break
        case '(ax+b)(cx+d)-(ax+b)(ex+f)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})-(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(e)}x${ecritureAlgebrique(f)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}-${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '-(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + '))', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '-' + rienSi1(e) + 'x' + ecritureAlgebrique(-f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(c - e) + 'x' + ecritureAlgebrique(d - f) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})$<br>`
          }
          reponse = [`(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})`, `(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})`]
          break
        case '(cx+d)(ax+b)+(ax+b)(ex+f)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${c}x${ecritureAlgebrique(d)})(${rienSi1(a)}x${ecritureAlgebrique(b)})+(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(e)}x${ecritureAlgebrique(f)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}+${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '+' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(c + e) + 'x' + ecritureAlgebrique(d + f) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c + e}x${ecritureAlgebrique(d + f)})$<br>`
          }
          reponse = [`(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c + e}x${ecritureAlgebrique(d + f)})`, `(${c + e}x${ecritureAlgebrique(d + f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})`]
          break
        case '(cx+d)(ax+b)-(ax+b)(ex+f)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${c}x${ecritureAlgebrique(d)})(${rienSi1(a)}x${ecritureAlgebrique(b)})-(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(e)}x${ecritureAlgebrique(f)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}-${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '-(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + '))', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '-' + rienSi1(e) + 'x' + ecritureAlgebrique(-f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(c - e) + 'x' + ecritureAlgebrique(d - f) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})$<br>`
          }
          reponse = [`(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})`, `(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})`]
          break
        case '(ax+b)(cx+d)+(ex+f)(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})+(${rienSi1(e)}x${ecritureAlgebrique(f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}+${miseEnEvidence('(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '+' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(c + e) + 'x' + ecritureAlgebrique(d + f) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c + e}x${ecritureAlgebrique(d + f)})$<br>`
          }
          reponse = [`(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c + e}x${ecritureAlgebrique(d + f)})`, `(${c + e}x${ecritureAlgebrique(d + f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})`]
          break
        case '(ax+b)(cx+d)-(ex+f)(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})-(${rienSi1(e)}x${ecritureAlgebrique(f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}-${miseEnEvidence('(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '-(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + '))', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '-' + rienSi1(e) + 'x' + ecritureAlgebrique(-f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(c - e) + 'x' + ecritureAlgebrique(d - f) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})$<br>`
          }
          reponse = [`(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})`, `(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})`]
          break
        case '(cx+d)(ax+b)+(ex+f)(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${c}x${ecritureAlgebrique(d)})(${rienSi1(a)}x${ecritureAlgebrique(b)})+(${rienSi1(e)}x${ecritureAlgebrique(f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}+${miseEnEvidence('(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '+' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(c + e) + 'x' + ecritureAlgebrique(d + f) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c + e}x${ecritureAlgebrique(d + f)})$<br>`
          }
          reponse = [`(${c + e}x${ecritureAlgebrique(d + f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})`, `(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c + e}x${ecritureAlgebrique(d + f)})`]
          break
        case '(cx+d)(ax+b)-(ex+f)(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${c}x${ecritureAlgebrique(d)})(${rienSi1(a)}x${ecritureAlgebrique(b)})-(${rienSi1(e)}x${ecritureAlgebrique(f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}-${miseEnEvidence('(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + ')', 'blue')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '-(' + rienSi1(e) + 'x' + ecritureAlgebrique(f) + '))', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + '-' + rienSi1(e) + 'x' + ecritureAlgebrique(-f) + ')', 'blue')}$`
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(c - e) + 'x' + ecritureAlgebrique(d - f) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})$<br>`
          }
          reponse = [`(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})(${rienSi1(a)}x${ecritureAlgebrique(b)})`, `(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(c - e)}x${ecritureAlgebrique(d - f)})`]
          break
      }
      texte += this.interactif ? (`<br>$${lettreDepuisChiffre(i + 1)} = $` + ajouteChampTexteMathLive(this, i, 'largeur75 inline nospacebefore')) : ''
      setReponse(this, i, reponse)

      if (this.questionJamaisPosee(i, reponse)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Type de facteur commun', 3, '1 : Facteurs non communs simples\n2 : Facteurs non communs de la forme ax + b\n3 : Mélange']
}
