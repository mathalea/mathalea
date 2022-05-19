import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, choice, ecritureAlgebrique, texNombrec, texFractionReduite, ecritureParentheseSiNegatif, rienSi1 } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Donner la nature dune suite (formule explicite)'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function NatureSuiteEx () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []

    let texte, texteCorr, a, b, u, d
    const nomSuite = ['u', 'v', 'w']
    const s = choice(nomSuite)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3, 4])) { //
        case 1 :// suite arithmétique simple
          a = randint(1, 10) * choice([-1, 1])
          // u = randint(1, 10) * choice([-1, 1])
          b = randint(1, 10) * choice([-1, 1])

          if (this.interactif) {
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${rienSi1(a)}n${ecritureAlgebrique(b)} $.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `arithmétique de raison $${a}$`,
                  statut: true
                },
                {
                  texte: `arithmétique de raison $${b}$`,
                  statut: false
                },
                {
                  texte: `géométrique de raison $${a}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${a}n${ecritureAlgebrique(b)} $.<br>
          Quelle est la nature de cette suite ? Donner sa raison et son premier terme.`
          }

          texteCorr = `L'expression est de la forme $${s}_n=${s}_0+nr$ avec $${s}_0=${b}$ et $r=${a}$.<br>
        On en déduit que $(${s}_n)$ est une suite arithmétique de raison $${a}$ et de premier terme $${s}_0=${a}$.`

          break
        case 2 :// suite arithmétique avec fraction

          b = randint(1, 10) * choice([-1, 1])
          d = randint(2, 10)
          a = calcul(d * randint(1, 10) * choice([-1, 1]))
          if (this.interactif) {
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =\\dfrac{${a}n${ecritureAlgebrique(b)}}{${d}}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `arithmétique de raison $${texNombrec(a / d)}$`,
                  statut: true
                },
                {
                  texte: `arithmétique de raison $${a}$`,
                  statut: false
                },
                {
                  texte: `géométrique de raison $${texNombrec(a / d)}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =\\dfrac{${a}n${ecritureAlgebrique(b)}}{${d}}$.<br>
          Quelle est la nature de cette suite ? Donner sa raison et son premier terme.`
          }
          if (b < 0) {
            texteCorr = `$${s}_{n} =\\dfrac{${a}n${ecritureAlgebrique(b)}}{${d}}=${texFractionReduite(a, d)}n${texFractionReduite(b, d)}$.<br> `
          } else { texteCorr = `$${s}_{n} =\\dfrac{${a}n${ecritureAlgebrique(b)}}{${d}}=${texFractionReduite(a, d)}n+${texFractionReduite(b, d)}$.<br> ` }

          texteCorr += `Cette dernière expression est de la forme $${s}_n=${s}_0+nr$ avec $${s}_0=${texFractionReduite(b, d)}$ et $r=${texFractionReduite(a, d)}$.<br>
        On en déduit que $(${s}_n)$ est une suite arithmétique de raison $${texFractionReduite(a, d)}$ et de premier terme $${s}_0=${texFractionReduite(b, d)}$.`

          break
        case 3 :// suite geométrique simple
          a = randint(-10, 10, [-1, 0])
          // u = randint(1, 10) * choice([-1, 1])
          b = randint(-10, 10, [-1, 0, 1, a])
          texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =`
          if (a === 1) { texte += `${ecritureParentheseSiNegatif(b)}^n$` } else { texte += `${a}\\times${ecritureParentheseSiNegatif(b)}^n$` };

          if (this.interactif) {
            texte += `<br>Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `géométrique de raison $${b}$`,
                  statut: true
                },
                {
                  texte: `arithmétique de raison $${b}$`,
                  statut: false
                },
                {
                  texte: `géométrique de raison $${a}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte += ' <br>Quelle est la nature de cette suite ? Donner sa raison et son premier terme.'
          }
          if (a === 1) {
            texteCorr = `$${s}_{n+1} = ${ecritureParentheseSiNegatif(b)}^{n+1}=${ecritureParentheseSiNegatif(b)}\\times \\underbrace{ ${ecritureParentheseSiNegatif(b)}^{n}}_{${s}_{n}}=${ecritureParentheseSiNegatif(b)}\\times ${s}_{n}$.
         `
          } else {
            texteCorr = `$${s}_{n+1} =${a}\\times ${ecritureParentheseSiNegatif(b)}^{n+1}=${ecritureParentheseSiNegatif(b)}\\times \\underbrace{${ecritureParentheseSiNegatif(a)}\\times ${ecritureParentheseSiNegatif(b)}^{n}}_{${s}_{n}}=${ecritureParentheseSiNegatif(b)}\\times ${s}_{n}$.
         `
          };
          texteCorr += `  <br>        
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $${b}$ et de premier terme $${s}_0=${a}\\times ${ecritureParentheseSiNegatif(b)}^0=${a}$.`

          break

        case 4 :// suite geométrique avec quotient
          a = randint(-10, 10, [-1, 0])
          // u = randint(1, 10) * choice([-1, 1])
          b = randint(2, 10, a)
          texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =\\dfrac{${a}}{${b}^n}$.`

          if (this.interactif) {
            texte += `<br>Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `géométrique de raison $\\dfrac{1}{${b}}$`,
                  statut: true
                },
                {
                  texte: `arithmétique de raison $${b}$`,
                  statut: false
                },
                {
                  texte: `géométrique de raison $${a}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte += ' <br>Quelle est la nature de cette suite ? Donner sa raison et son premier terme.'
          }

          texteCorr = `$${s}_{n+1} =\\dfrac{${a}}{${b}^{n+1}}=\\dfrac{1}{${b}}\\times \\underbrace{\\dfrac{${a}}{${b}^n}}_{${s}_{n}}=\\dfrac{1}{${b}}\\times ${s}_n$`
          texteCorr += `  <br>        
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $\\dfrac{1}{${b}}$ et de premier terme $${s}_{0} =\\dfrac{${a}}{${b}^0}=${a}$.`

          break
      }

      if (this.questionJamaisPosee(i, u, a)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
