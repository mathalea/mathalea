import Exercice from '../Exercice.js'
import { randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, ecritureParentheseSiMoins, lettreDepuisChiffre, listeQuestionsToContenuSansNumero, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'

export const titre = 'Utiliser la simple distributivité'

export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Développer en utilisant la distributivité simple
 *
 * * La lettre peut être x, y, z, t, a, b ou c
 * *
 * * Forme de développement case1:  k(ax+b)
 * * Forme de développement case2: (ax+b)×k
 * * Forme de développement case3: kx(ax+b)
 * * Forme de développement case4: (ax+b)×kx
 * * Forme de développement case5: k(ax+b)+c
 * * Forme de développement case6: c+k(ax+b)
 *
 * Niveau de difficulté :
 * * 1 : Multiplication par un entier positif, tous les termes sont positifs
 * * 2 : Multiplication par un facteur positif et les termes sont relatifs
 * * 3 : Multiplication par un facteur relatif et les termes sont relatifs
 * *
 * * Refactoring 21/12/2012
 * @author Rémi Angot et Mickael Guironnet
 * 4L10 et 3L11
 */
export const uuid = '77a62'
export const ref = '3L11'
export default function ExerciceDevelopper () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 3 // difficulté
  this.sup2 = 1 // consigne
  this.sup3 = 8 // forme de développement
  this.sup4 = false
  this.titre = titre
  this.interactifType = interactifType
  this.interactifReady = interactifReady
  this.nbQuestions = 6
  this.spacing = 2
  this.spacingCorr = 2
  this.nbColsCorr = 1
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.sup = parseInt(this.sup) // difficulté
    this.sup2 = parseInt(this.sup2) // consigne
    this.sup3 = parseInt(this.sup3) // forme de développement

    this.consigne = this.sup2 === 1 ? 'Développer' : 'Développer et réduire'
    if (this.nbQuestions > 1 && !context.isDiaporama) this.consigne += ' les expressions suivantes'
    this.consigne += '.'

    let lettre = ['x', 'y', 'z', 't', 'a', 'b', 'c']
    if (this.interactif || this.sup4) lettre = ['x']

    let typesDeQuestionsDisponibles = ['k(ax+b)', '(ax+b)×k', 'kx(ax+b)', '(ax+b)×kx', 'k(ax+b)+c', 'c+k(ax+b)']
    if (this.sup3 === 1) typesDeQuestionsDisponibles = ['k(ax+b)']
    if (this.sup3 === 2) typesDeQuestionsDisponibles = ['(ax+b)×k']
    if (this.sup3 === 3) typesDeQuestionsDisponibles = ['kx(ax+b)']
    if (this.sup3 === 4) typesDeQuestionsDisponibles = ['(ax+b)×kx']
    if (this.sup3 === 5) typesDeQuestionsDisponibles = ['k(ax+b)+c']
    if (this.sup3 === 6) typesDeQuestionsDisponibles = ['c+k(ax+b)']
    if (this.sup3 === 7) typesDeQuestionsDisponibles = ['k(ax+b)', '(ax+b)×k']
    if (this.sup3 === 8) typesDeQuestionsDisponibles = ['k(ax+b)', '(ax+b)×k', 'kx(ax+b)', '(ax+b)×kx']
    if (this.sup3 === 9) typesDeQuestionsDisponibles = ['k(ax+b)', '(ax+b)×k', 'kx(ax+b)', '(ax+b)×kx', 'k(ax+b)+c', 'c+k(ax+b)']

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const typesDeQuestions = listeTypeDeQuestions[i]
      const k = randint(2, 11) * (this.sup === 3 ? choice([-1, 1]) : 1)
      const a = randint(1, 9, [Math.abs(k)]) * (this.sup >= 2 ? choice([-1, 1]) : 1)
      const b = randint(1, 9, [Math.abs(k), Math.abs(a)]) * (this.sup >= 2 ? choice([-1, 1]) : 1)
      const inconnue = choice(lettre)
      const c = randint(2, 9, [Math.abs(k), Math.abs(a), Math.abs(b)]) * (this.sup >= 2 ? choice([-1, 1]) : 1)
      switch (typesDeQuestions) {
        case 'k(ax+b)':
          // ne pas écrire 1x
          texte = `$${lettreDepuisChiffre(i + 1)}=${k}(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})$<br>
          $\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}\\times ${ecritureParentheseSiMoins((a === 1 ? '' : (a === -1 ? '-' : a)) + inconnue)}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}$`
          reponse = `${k * a}${inconnue}${ecritureAlgebrique(k * b)}`
          texteCorr += `<br>Et si on réduit l'expression, on obtient : <br> $${lettreDepuisChiffre(i + 1)}=${reponse}$.`
          break
        case '(ax+b)×k':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(k)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(k)}$<br>
          $\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}\\times ${ecritureParentheseSiMoins((a === 1 ? '' : (a === -1 ? '-' : a)) + inconnue)}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}$`
          reponse = `${k * a}${inconnue}${ecritureAlgebrique(k * b)}`
          texteCorr += `<br>Et si on réduit l'expression, on obtient : <br> $${lettreDepuisChiffre(i + 1)}=${reponse}$.`
          break
        case '(ax+b)×kx':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiMoins(k + inconnue)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiMoins(k + inconnue)}$<br>
          $\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}${inconnue}\\times ${ecritureParentheseSiMoins((a === 1 ? '' : (a === -1 ? '-' : a)) + inconnue)}+${ecritureParentheseSiMoins(k + inconnue)}\\times${ecritureParentheseSiNegatif(b)}$`
          reponse = `${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}`
          texteCorr += `<br>Et si on réduit l'expression, on obtient : <br> $${lettreDepuisChiffre(i + 1)}=${reponse}$.`
          break
        case 'kx(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=${k}${inconnue}(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}${inconnue}(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})$<br>
          $\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}${inconnue}\\times ${ecritureParentheseSiMoins((a === 1 ? '' : (a === -1 ? '-' : a)) + inconnue)} + ${ecritureParentheseSiMoins(k + inconnue)}\\times ${ecritureParentheseSiNegatif(b)}$`
          reponse = `${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}`
          texteCorr += `<br>Et si on réduit l'expression, on obtient : <br> $${lettreDepuisChiffre(i + 1)}=${reponse}$.`
          break
        case 'k(ax+b)+c':
          texte = `$${lettreDepuisChiffre(i + 1)}=${k}(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})${ecritureAlgebrique(c)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})${ecritureAlgebrique(c)}$<br>
          $\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}\\times${ecritureParentheseSiMoins((a === 1 ? '' : (a === -1 ? '-' : a)) + inconnue)}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}${ecritureAlgebrique(c)}$`
          reponse = `${k * a}${inconnue}${ecritureAlgebrique(k * b)}${ecritureAlgebrique(c)} = ${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}`
          texteCorr += `<br>Et si on réduit l'expression, on obtient : <br> $${lettreDepuisChiffre(i + 1)}=${reponse}$.`
          if (this.sup2 === 1) {
            reponse = [`${k * a}${inconnue}${ecritureAlgebrique(k * b)}${ecritureAlgebrique(c)}`, `${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}`]
          }
          break
        case 'c+k(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=${c}${ecritureAlgebrique(k)}(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${c}${ecritureAlgebrique(k)}(${a === 1 ? '' : (a === -1 ? '-' : a)}${inconnue}${ecritureAlgebrique(b)})$<br>
          $\\phantom{${lettreDepuisChiffre(i + 1)}}=${c}${ecritureAlgebrique(k)}\\times${ecritureParentheseSiMoins((a === 1 ? '' : (a === -1 ? '-' : a)) + inconnue)}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}$`
          reponse = `${c}${ecritureAlgebrique(k * a)}${inconnue}${ecritureAlgebrique(k * b)} = ${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}`
          texteCorr += `<br>Et si on réduit l'expression, on obtient : <br> $${lettreDepuisChiffre(i + 1)}=${reponse}$.`
          if (this.sup2 === 1) {
            reponse = [`${k * a}${inconnue}${ecritureAlgebrique(k * b)}${ecritureAlgebrique(c)}`, `${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}`]
          }
          break
      }
      if (this.sup2 === 1) {
        setReponse(this, i, reponse)
      } else {
        setReponse(this, i, reponse, { formatInteractif: 'formeDeveloppee' })
      }
      texte += ajouteChampTexteMathLive(this, i, 'inline largeur 75 nospacebefore', { texte: `$${sp(3)} =$` })

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, ' 1 : Multiplication par un entier positif, tous les termes sont positifs\n2 : Multiplication par un facteur positif\n3 : Multiplication par un facteur relatif\n']
  this.besoinFormulaire2Numerique = ['Consigne', 2, '1 : Développer, \n2 : Développer et réduire']
  this.besoinFormulaire3Numerique = ['Forme de développement', 9, '1 : k(ax+b)\n2 : (ax+b)×k\n3 : kx(ax+b)\n4 : (ax+b)×kx\n5 : k(ax+b)+c\n6 : c+k(ax+b)\n7 : Mélange(1 et 2)\n8 : Mélange (1, 2, 3 et 4)\n9 :Mélange (tous les cas)']
  this.besoinFormulaire4CaseACocher = ['$x$ est la seule lettre utilisée']
}
