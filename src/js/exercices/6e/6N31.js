import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, texPrix, sp } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
export const titre = 'Comparer des nombres décimaux'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
 * Comparer deux nombres décimaux
 *
 * Les types de comparaisons sont :
 * * ab ? ba
 * * aa,bb ? aa,cc
 * * a,b  a,cc avec b>c
 * * 0,ab 0,ba
 * * 0,a0b 0,b0a
 * * a,b a,b0
 * * 0,0ab 0,0a0b
 * * a,bb  a,ccc avec b>c
 * * a+1,bb  a,cccc avec cccc>bb
 *
 * aa, bb, cc correspondent à des nombres à 2 chiffres (ces 2 chiffres pouvant être distincts)
 * @author Rémi Angot
 * 6N31
 * Ajout AMC : Janvier 2022 par EE
 */
export default function ComparerDecimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Compléter avec le signe < , > ou =.'
  this.nbQuestions = 8
  this.nbCols = 2
  this.nbColsCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typesDeQuestionsDisponibles = [
      choice([1, 4, 5]),
      2,
      2,
      3,
      6,
      7,
      8,
      9
    ] // une seule question du type inversion de chiffres (1,4,5)
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      let x
      let y
      let a
      let b
      let c
      let zeroInutile = false

      switch (listeTypeDeQuestions[i]) {
        case 1: // ab ba
          a = randint(1, 9)
          b = randint(1, 9, a)
          x = a * 10 + b
          y = b * 10 + a
          break
        case 2: // aa,bb aa,cc
          a = randint(1, 99)
          b = randint(11, 99)
          c = randint(11, 99)
          x = calcul(a + b / 100)
          y = calcul(a + c / 100)
          break
        case 3: // a,b  a,cc avec b>c
          a = randint(1, 99)
          b = randint(1, 8)
          c = randint(1, b * 10)
          x = calcul(a + b / 10)
          y = calcul(a + c / 100)
          break
        case 4: // 0,ab 0,ba
          a = randint(1, 9)
          b = randint(1, 9, a)
          x = calcul((a * 10 + b) / 100)
          y = calcul((b * 10 + a) / 100)
          break
        case 5: // 0,a0b 0,b0a
          a = randint(1, 9)
          b = randint(1, 9, a)
          x = calcul((a * 100 + b) / 1000)
          y = calcul((b * 100 + a) / 1000)
          break
        case 6: // a,b a,b0
          a = randint(11, 999)
          while (a % 10 === 0) {
            // pas de nombre divisible par 10
            a = randint(11, 999)
          }
          x = calcul(a / 10)
          y = x
          zeroInutile = true
          break
        case 7: // 0,0ab 0,0a0b
          a = randint(1, 9)
          b = randint(1, 9)
          x = calcul(a / 100 + b / 1000)
          y = calcul(a / 100 + b / 10000)
          break
        case 8: // a,bb  a,ccc avec b>c
          a = randint(11, 99)
          b = randint(11, 99)
          c = randint(100, b * 10)
          x = calcul(a + b / 100)
          y = calcul(a + c / 1000)
          if (randint(1, 2) === 1) {
            [x, y] = [y, x]
          }
          break
        case 9: // a+1,bb  a,cccc avec cccc>bb
          a = randint(11, 98)
          b = randint(11, 99)
          c = randint(b * 100, 10000)
          x = calcul(a + 1 + b / 100)
          y = calcul(a + c / 10000)
          if (randint(1, 2) === 1) {
            [x, y] = [y, x]
          }
          break
      }

      texte = `$${texNombre(x)}${sp(3)}\\ldots\\ldots${sp(3)}${texNombre(y)}$`
      if (parseFloat(x) > parseFloat(y)) {
        texteCorr = `$${texNombre(x)} > ${texNombre(y)}$`
      } else if (parseFloat(x) < parseFloat(y)) {
        texteCorr = `$${texNombre(x)} < ${texNombre(y)}$`
      } else {
        texteCorr = `$${texNombre(x)} = ${texNombre(y)}$`
      }

      if (zeroInutile) {
        if (randint(1, 2) === 1) {
          texte = `$${texPrix(x)}${sp(3)}\\ldots\\ldots${sp(3)}${texNombre(y)}$`
          if (parseFloat(x) > parseFloat(y)) {
            texteCorr = `$${texPrix(x)} > ${texNombre(y)}$`
          } else if (parseFloat(x) < parseFloat(y)) {
            texteCorr = `$${texPrix(x)} < ${texNombre(y)}$`
          } else {
            texteCorr = `$${texPrix(x)} = ${texNombre(y)}$`
          }
        } else {
          texte = `$${texNombre(x)}${sp(3)}\\ldots\\ldots${sp(3)}${texPrix(y)}$`
          if (parseFloat(x) > parseFloat(y)) {
            texteCorr = `$${texNombre(x)} > ${texPrix(y)}$`
          } else if (parseFloat(x) < parseFloat(y)) {
            texteCorr = `$${texNombre(x)} < ${texPrix(y)}$`
          } else {
            texteCorr = `$${texNombre(x)} = ${texPrix(y)}$`
          }
        }
      }
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [{ texte: texteCorr, statut: 3, feedback: '', sanscadre: true }]
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
}
