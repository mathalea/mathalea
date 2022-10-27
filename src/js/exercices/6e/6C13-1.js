import Exercice from '../Exercice.js'
import { listeQuestionsToContenuSansNumero, randint, combinaisonListes, numAlpha, rangeMinMax, contraindreValeur } from '../../modules/outils.js'
export const titre = 'Vocabulaires liés aux 4 opérations'

/**
 * Exercice sur le vocabulaire : somme, différence, produit, quotient...
 * @author Mickael Guironnet
 */
export default function VocabulaireSur4Operations () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 0
  this.spacing = 2

  this.nouvelleVersion = function () {
    let typesDeQuestionsDisponibles = []
    if (!this.sup || this.sup === '0') { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = rangeMinMax(1, 14)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre, c'est que le nombre a été saisi dans la barre d'adresses
        this.sup === 0 ? typesDeQuestionsDisponibles = rangeMinMax(1, 14) : typesDeQuestionsDisponibles = contraindreValeur(1, 14, this.sup, 4)
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '5', '2','toto','45']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 14, parseInt(typesDeQuestionsDisponibles[i]), randint(1, 14)) // parseInt en fait un tableau d'entiers
        }
      }
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, a, b, reste, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 10)
      b = randint(2, 10, [a])
      if (a < b) { [a, b] = [b, a] }
      texte = ''
      texteCorr = ''
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a} + ${b}$", comment s'appellent les nombres $${a}$ et $${b}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a} + ${b}$", $${a}$ et $${b}$ s'appellent des termes.`
          break
        case 2:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a} + ${b} = ${a + b}$", comment s'appelle le nombre $${a + b}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a} + ${b} = ${a + b}$", $${a + b}$ s'appelle la somme de $${a}$ et $${b}$.`
          break
        case 3:
          texte +=
            numAlpha(i) +
            `Quelle est la somme de $${a}$ et $${b}$ ?`
          texteCorr += numAlpha(i) + `La somme de $${a}$ et $${b}$ est $${a + b}$.`
          break
        case 4:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a} - ${b}$", comment s'appellent les nombres $${a}$ et $${b}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a} - ${b}$", $${a}$ et $${b}$ s'appellent des termes.`
          break
        case 5:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a} - ${b} = ${a - b}$", comment s'appelle le nombre $${a - b}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a} - ${b} = ${a - b}$", $${a - b}$ s'appelle la différence entre $${a}$ et $${b}$.`
          break
        case 6:
          texte +=
            numAlpha(i) +
            `Quelle est la différence entre $${a}$ et $${b}$ ?`
          texteCorr += numAlpha(i) + `La différence entre $${a}$ et $${b}$ est $${a - b}$.`
          break
        case 7:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a} \\times ${b}$", comment s'appellent les nombres $${a}$ et $${b}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a} \\times ${b}$", $${a}$ et $${b}$ s'appellent des facteurs.`
          break
        case 8:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a} \\times ${b} = ${a * b}$", comment s'appelle le nombre $${a * b}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a} \\times ${b} = ${a * b}$", $${a * b}$ s'appelle le produit de $${a}$ et $${b}$.`
          break
        case 9:
          texte +=
            numAlpha(i) +
            `Quel est le produit de $${a}$ et $${b}$ ?`
          texteCorr += numAlpha(i) + `Le produit de $${a}$ et $${b}$ est $${a * b}$.`
          break
        case 10:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a * b} \\div ${b}$", comment s'appelle le nombre $${a * b}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a * b} \\div ${b}$", $${a * b}$ s'appelle le dividende.`
          break
        case 11:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a * b} \\div ${b}$", comment s'appelle le nombre $${b}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a * b} \\div ${b}$", $${b}$ s'appelle le diviseur.`
          break
        case 12:
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a * b} \\div ${b} = ${a}$", comment s'appelle le nombre $${a}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a * b} \\div ${b} = ${a}$", $${a}$ s'appelle le quotient de  $${a * b}$ par $${b}$.`
          break
        case 13:
          reste = randint(1, b, [b])
          texte +=
            numAlpha(i) +
            `Dans l'expression "$${a * b + reste} = ${b} \\times ${a} + ${reste} $", comment s'appelle le nombre $${reste}$?`
          texteCorr += numAlpha(i) + `Dans l'expression "$${a * b + reste} = ${b} \\times ${a} + ${reste} $", $${reste}$ s'appelle le reste du quotient de  $${a * b}$ par $${b}$.`
          break
        case 14:
          texte +=
            numAlpha(i) +
            `Quel est le quotient de $${a * b}$ par $${b}$ ?`
          texteCorr += numAlpha(i) + `Le quotient de $${a * b}$ par $${b}$ est $${a}$.`
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
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireTexte = ['Type de question',
    `0 : Mélange
     1 : Addition (terme)
     2 : Addition (somme)
     3 : Addition (calcul)
     4 : Soustraction (terme)
     5 : Soustraction (différence)
     6 : Soustraction (calcul)
     7 : Multiplication (facteur)
     8 : Multiplication (produit)
     9 : Multiplication (calcul)
     10 : Division (dividende)
     11 : Division (diviseur)
     12 : Division (quotient)
     13 : Division (reste)
     14 : Division (calcul)`
  ]
}
