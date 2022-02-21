import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, range1, combinaisonListes, printlatex, calcul, texNombrec, lettreDepuisChiffre, texNombre, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const titre = 'Réduire une expression littérale (somme et produit)'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '11/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
* Réduire une expression
*
*    '0 : Mélange des types de questions',
*    '1 : ax+bx+c',
*    '2 : ax+b+x+c',
*    '3 : ax^2+bx+c+dx^2+x',
*    '4 : a+x+b+c+dx',
*    '5 : ax+y+bx+c+dy',
*    '6 : ax.bx',
*    '7 : ax+c',
*    '8 : ax.b',
*    '9 : ax+bx'
* @author Rémi Angot
* 5L12
*/
export default function ReduireUneExpressionLitterale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Réduire les expressions suivantes'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 9 // valeur maximale des coefficients
  this.sup2 = false // avec des nombres décimaux
  this.sup3 = '6-7-8-9' // Type de question

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let listeDesProblemes = []
    if (!this.sup3) { // Si aucune liste n'est saisie
      listeDesProblemes = range1(9)
    } else {
      if (typeof (this.sup3) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeDesProblemes[0] = contraindreValeur(1, 9, this.sup3, 1)
      } else {
        listeDesProblemes = this.sup3.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeDesProblemes.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeDesProblemes[i] = contraindreValeur(1, 9, parseInt(listeDesProblemes[i]), 1) // parseInt en fait un tableau d'entiers
        }
      }
    }
    const typesDeQuestionsDisponibles = listeDesProblemes
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
          reponse = printlatex(`${texNombre(calcul(a + b))}x+${texNombre(c)}`)
          break
        case 2: // ax+b+x+c
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}+x+${texNombre(c)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}+x+${texNombre(c)}=${texNombre(calcul(a + 1))}x+${texNombre(calcul(b + c))}$`
          reponse = printlatex(`${texNombre(calcul(a + 1))}x+${texNombre(calcul(b + c))}`)
          break
        case 3: // ax^2+bx+c+dx^2+x
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x^2+${texNombre(b)}x+${texNombre(c)}+${texNombre(d)}x^2+x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x^2+${texNombre(b)}x+${texNombre(c)}+${texNombre(d)}x^2+x=${texNombre(calcul(a + d))}x^2+${texNombre(calcul(b + 1))}x+${texNombre(c)}$`
          reponse = printlatex(`${texNombre(calcul(a + d))}x^2+${texNombre(calcul(b + 1))}x+${texNombre(c)}`)
          break
        case 4: // a+x+b+c+dx
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}+x+${texNombre(b)}+${texNombre(c)}+${texNombre(d)}x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}+x+${texNombre(b)}+${texNombre(c)}+${texNombre(d)}x=${texNombrec(1 + d)}x+${texNombrec(a + b + c)}$`
          reponse = printlatex(`${texNombrec(1 + d)}x+${texNombrec(a + b + c)}`)
          break
        case 5: // ax+y+bx+c+dy
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+y+${texNombre(b)}x+${texNombre(c)}+${texNombre(d)}y$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+y+${texNombre(b)}x+${texNombre(c)}+${texNombre(d)}y=${texNombrec(a + b)}x+${texNombrec(1 + d)}y+${texNombre(c)}$`
          reponse = printlatex(`${texNombrec(a + b)}x+${texNombrec(1 + d)}y+${texNombre(c)}`)
          break
        case 6: // ax . bx
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x\\times${texNombre(b)}x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x\\times${texNombre(b)}x=${texNombre(calcul(a * b))}x^2$`
          reponse = printlatex(`${texNombre(calcul(a * b))}x^2`)
          break
        case 7: // ax+c
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(c)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(c)}=${texNombre(a)}x+${texNombre(c)}$`
          reponse = printlatex(`${texNombre(a)}x+${texNombre(c)}`)
          break
        case 8: // ax . b
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x\\times${texNombre(b)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x\\times${texNombre(b)}=${texNombre(calcul(a * b))}x$`
          reponse = printlatex(`${texNombre(calcul(a * b))}x`)
          break
        case 9: // ax+bx
          texte = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${texNombre(a)}x+${texNombre(b)}x=${texNombre(a + b)}x$`
          reponse = printlatex(`${texNombre(calcul(a + b))}x`)
          break
      }
      setReponse(this, i, reponse, { formatInteractif: 'calcul' })
      texte += ajouteChampTexteMathLive(this, i)
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
  this.besoinFormulaire3Texte = [
    'Type de question', [
      '0 : Mélange des types de questions',
      '1 : ax+bx+c',
      '2 : ax+b+x+c',
      '3 : ax^2+bx+c+dx^2+x',
      '4 : a+x+b+c+dx',
      '5 : ax+y+bx+c+dy',
      '6 : ax.bx',
      '7 : ax+c',
      '8 : ax.b',
      '9 : ax+bx'
    ].join('\n')
  ]
}
