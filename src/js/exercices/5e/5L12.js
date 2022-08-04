import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, range1, combinaisonListes, rienSi1, calcul, texNombrec, lettreDepuisChiffre, texNombre } from '../../modules/outils.js'

export const titre = 'Réduire une expression littérale'

/**
* Réduire une expression
*
* * ax+bx+c
* * ax+b+x+c
* * ax^2+bx+c+dx^2+x
* * a+x+b+c+dx
* * ax+y+bx+c+dy
* * ax+b-cx
* @author Rémi Angot
* 5L12
*/
export default function ReduireUneExpressionLitterale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Réduire les expressions suivantes'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 9 // valeur maximale des coefficients
  this.sup2 = false // avec des nombres décimaux

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typesDeQuestionsDisponibles = range1(7)
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let a, b, c, d
      if (this.sup2) {
        a = calcul(randint(2, this.sup) + randint(1, 9) / 10)
        b = choice([calcul(randint(2, 9) + randint(1, 9) / 10), calcul(randint(2, 9) + randint(1, 9) / 10 + randint(1, 9) / 100)])
        c = calcul(randint(2, this.sup) + randint(1, 9) / 10)
        d = choice([calcul(randint(2, 9) + randint(1, 9) / 10), calcul(randint(2, 9) + randint(1, 9) / 10 + randint(1, 9) / 100)])
      } else {
        a = randint(2, this.sup)
        b = randint(2, this.sup)
        c = randint(2, this.sup)
        d = randint(2, this.sup)
      }
      switch (listeTypeDeQuestions[i]) {
        case 1: // ax+bx+c
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}x+${texNombre(c)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}x+${texNombre(c)}=${texNombre(calcul(a + b))}x+${texNombre(c)}$`
          break
        case 2: // ax+b+x+c
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}+x+${texNombre(c)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}+x+${texNombre(c)}=${texNombre(calcul(a + 1))}x+${texNombre(calcul(b + c))}$`
          break
        case 3: // ax^2+bx+c+dx^2+x
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x^2+${texNombre(b)}x+${texNombre(c)}+${texNombre(d)}x^2+x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x^2+${texNombre(b)}x+${texNombre(c)}+${texNombre(d)}x^2+x=${texNombre(calcul(a + d))}x^2+${texNombre(calcul(b + 1))}x+${texNombre(c)}$`
          break
        case 4: // a+x+b+c+dx
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}+x+${texNombre(b)}+${texNombre(c)}+${texNombre(d)}x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}+x+${texNombre(b)}+${texNombre(c)}+${texNombre(d)}x=${texNombrec(1 + d)}x+${texNombrec(a + b + c)}$`
          break
        case 5: // ax+y+bx+c+dy
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+y+${texNombre(b)}x+${texNombre(c)}+${texNombre(d)}y$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+y+${texNombre(b)}x+${texNombre(c)}+${texNombre(d)}y=${texNombrec(a + b)}x+${texNombrec(1 + d)}y+${texNombre(c)}$`
          break
        case 6: // ax+b-cx
          if (c > a) {
            [a, c] = [c, a] // pour s'assurer que a-c est positif
          }
          if (c === a) {
            a++
          }
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}-${texNombre(c)}x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}-${texNombre(c)}x=${texNombrec(a - c)}x+${texNombre(b)}$`
          break
        case 7: // ax-cx
          if (c > a) {
            [a, c] = [c, a] // pour s'assurer que a-c est positif
          }
          if (c === a) {
            a++
          }
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x-${texNombre(c)}x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x-${texNombre(c)}x=${rienSi1(a - c)}x$`
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale des coefficients', 999]
  this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
}
