import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, range1, combinaisonListesSansChangerOrdre, texNombrec, texFraction, contraindreValeur, compteOccurences } from '../../modules/outils.js'
export const titre = 'Donner l’écriture décimale d’un nombre à partir de différents textes'

export const dateDeModifImportante = '15/01/2022' // Ajout de paramètres

/**
 * Écriture décimale à partir de différentes manières de l'énoncé
 *
 * * 3 unités, 5 dixièmes et 8 centièmes
 * * 3 unités et 5 centièmes
 * * 5 dixièmes
 * * 128/10
 * * 8+5/100+7/100
 * @author Rémi Angot
 * Référence 6N23-4
 * Relecture et ajout de paramètres : Janvier 2022 par EE
 */

export default function NombreDecimalOraliseDeDifferentesManieres () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Donner l'écriture décimale de chaque nombre."
  this.nbQuestions = 5
  this.besoinFormulaireTexte = ['Type des textes', ' Choix séparés par des tirets\n1 : 3 unités, 5 dixièmes et 8 centièmes\n2 : 3 unités et 5 centièmes\n3 : 5 dixièmes\n4 : 128/10\n5 : 8+5/100+7/100\n6 : Mélange']
  this.sup = 6

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typesDeQuestionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = range1(5)
    } else {
      if (typeof (this.sup) === 'number') { // Je n'ai jamais réussi à rentrer dans ce test.
        this.sup = Math.max(Math.min(parseInt(this.sup), 6), 1)
        typesDeQuestionsDisponibles[0] = this.sup
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 6, parseInt(typesDeQuestionsDisponibles[i]), 6)
        }
      }
    }
    console.log(this.sup)
    console.log(typesDeQuestionsDisponibles)
    if (compteOccurences(typesDeQuestionsDisponibles, 6) > 0) typesDeQuestionsDisponibles = range1(5) // Teste si l'utilisateur a choisi tout

    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, c, n, choix; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 9)
      b = randint(2, 9, a)
      c = randint(2, 9, [a, b])
      switch (listeTypeDeQuestions[i]) {
        case 1: // 3 unités, 5 dixièmes et 8 centièmes
          texte = `${a} unités, ${b} dixièmes et ${c} centièmes`
          texteCorr = `$${a}+${texFraction(b, 10)}+${texFraction(c, 100)}=${texNombrec(a + b / 10 + c / 100)}$`
          break
        case 2: // 3 unités et 5 centièmes
          texte = `${a} unités et ${c} centièmes`
          texteCorr = `$${a}+${texFraction(c, 100)}=${texNombrec(a + c / 100)}$`
          break
        case 3: // 5 dixièmes / centièmes ou millièmes
          choix = randint(1, 3)
          if (choix === 1) {
            texte = `${a} dixièmes`
            texteCorr = `$${texFraction(a, 10)}=${texNombrec(a / 10)}$`
          }
          if (choix === 2) {
            texte = `${a} centièmes`
            texteCorr = `$${texFraction(a, 100)}=${texNombrec(a / 100)}$`
          }
          if (choix === 3) {
            texte = `${a} millièmes`
            texteCorr = `$${texFraction(a, 1000)}=${texNombrec(a / 1000)}$`
          }
          break
        case 4: // 128/10
          n = a * 100 + b * 10 + c
          choix = randint(1, 3)
          if (choix === 1) {
            texte = `$${texFraction(n, 10)}$`
            texteCorr = `$${texFraction(n, 10)}=${texNombrec(n / 10)}$`
          }
          if (choix === 2) {
            texte = `$${texFraction(n, 100)}$`
            texteCorr = `$${texFraction(n, 100)}=${texNombrec(n / 100)}$`
          }
          if (choix === 1) {
            texte = `$${texFraction(n, 1000)}$`
            texteCorr = `$${texFraction(n, 1000)}=${texNombrec(n / 1000)}$`
          }
          break
        case 5: // 8+5/100+7/100
          choix = randint(1, 2)
          if (choix === 1) {
            texte = `$${a}+${texFraction(b, 100)}+${texFraction(c, 100)}$`
            texteCorr = `$${a}+${texFraction(b, 100)}+${texFraction(c, 100)}=${a}+${texFraction(b + c, 100)}=${texNombrec(a + (b + c) / 100)}$`
          }
          if (choix === 2) {
            texte = `$${a}+${texFraction(b, 10)}+${texFraction(c, 10)}$`
            texteCorr = `$${a}+${texFraction(b, 10)}+${texFraction(c, 10)}=${a}+${texFraction(b + c, 10)}=${a}+${texNombrec((b + c) / 10)}=${texNombrec(a + (b + c) / 10)}$`
          }
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        if (!context.isHtml && i === 0) {
          texteCorr = '\\setlength\\itemsep{2em}' + texteCorr
        } // espacement entre les questions
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
