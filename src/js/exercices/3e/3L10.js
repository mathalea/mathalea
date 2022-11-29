import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, combinaisonListes, lettreDepuisChiffre, printlatex, listeQuestionsToContenuSansNumero, rangeMinMax, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const titre = 'Supprimer les parenthèses puis réduire une expression'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Donner l'opposé d'une expression.
 *
 * Ajout des différents cas de 4 à 10 par Mickael Guironnet
 * @author Rémi Angot
 * 3L10
 */
export const uuid = '603a8'
export const ref = '3L10'
export default function OpposeExpression () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Supprimer les parenthèses et réduire les expressions suivantes.'
  this.spacing = context.isHtml ? 3 : 2
  this.spacing = context.isHtml ? 3 : 2
  this.nbQuestions = 6
  this.sup = '1-2-3-4'
  this.tailleDiaporama = 3
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let listeTypeDeQuestions = []
    if (!this.sup || (typeof (this.sup) === 'number' && this.sup === 0) || this.sup === '0') { // Si aucune liste n'est saisie
      listeTypeDeQuestions = rangeMinMax(1, 10)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeTypeDeQuestions[0] = contraindreValeur(1, 10, this.sup, 1)
      } else {
        listeTypeDeQuestions = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeTypeDeQuestions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeTypeDeQuestions[i] = contraindreValeur(1, 10, parseInt(listeTypeDeQuestions[i]), 2) // parseInt en fait un tableau d'entiers
        }
      }
    }
    listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, c, d, e, f, reponse, cpt = 0; i < this.nbQuestions && cpt < 50; cpt++) {
      a = randint(-9, 9, 0)
      b = randint(-9, 9, 0)
      c = randint(-11, 11, 0)
      d = randint(-11, 11, 0)
      e = randint(-11, 11, 0)
      f = randint(-11, 11, 0)
      switch (listeTypeDeQuestions[i]) {
        case 1 : // '-(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=-(${printlatex(
            `${a}x+(${b})`
          )})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${-a}*x+(${-b})`)}$`
          reponse = `${printlatex(`${-a}*x+(${-b})`)}$`
          break
        case 2 : // '(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${printlatex(
            `${a}x+(${b})`
          )})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${a}*x+(${b})`)}$`
          reponse = `${printlatex(`${a}*x+(${b})`)}$`
          break
        case 3 : // '-(ax2+bx+c)':
          texte = `$${lettreDepuisChiffre(i + 1)}=-(${printlatex(
            `${a}x^2+(${b})x+(${c})`
          )})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${-a}x^2+(${-b})x+(${-c})`)}$`
          reponse = `${printlatex(`${-a}x^2+(${-b})x+(${-c})`)}$`
          break
        case 4 : // '(ax2+bx+c)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${printlatex(
            `${a}x^2+(${b})x+(${c})`
          )})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${a}x^2+(${b})x+(${c})`)}$`
          reponse = `${printlatex(`${a}x^2+(${b})x+(${c})`)}$`
          break
        case 5 : // '(ax+b)-(cx+d)':
          texte = `$${lettreDepuisChiffre(i + 1)}= (${printlatex(`${a}x+(${b})`)}) - (${printlatex(`${c}x+(${d})`)})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${a}x+(${b})`)} ${-c < 0 ? '' : '+'} ${printlatex(`${-c}x+(${-d})`)}$
          <br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${a - c}x+(${b - d})`)}$`
          reponse = `${printlatex(`${a - c}x+(${b - d})`)}$`
          break
        case 6 : // '-(ax+b)+(cx+d)':
          texte = `$${lettreDepuisChiffre(i + 1)}= -(${printlatex(`${a}x+(${b})`)}) + (${printlatex(`${c}x+(${d})`)})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${-a}x+(${-b})`)} ${c < 0 ? '' : '+'} ${printlatex(`${c}x+(${d})`)}$
          <br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=  ${printlatex(`${-a + c}x+(${-b + d})`)}$`
          reponse = `${printlatex(`${-a + c}x+(${-b + d})`)}$`
          break
        case 7 : // '(ax+b)-(cx2+dx+e)':
          texte = `$${lettreDepuisChiffre(i + 1)}= (${printlatex(`${a}x+(${b})`)}) - (${printlatex(`${c}x^2+(${d}x)+(${e})`)})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${a}x+(${b})`)} ${-c < 0 ? '' : '+'} ${printlatex(`${-c}x^2+(${-d}x)+(${-e})`)}$
          <br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${-c}x^2+(${a - d}x)+(${b - e})`)}$`
          reponse = `${printlatex(`${-c}x^2+(${a - d}x)+(${b - e})`)}$`
          break
        case 8 : // '-(ax+b)+(cx2+dx+e)':
          texte = `$${lettreDepuisChiffre(i + 1)}= -(${printlatex(`${a}x+(${b})`)}) + (${printlatex(`${c}x^2+(${d})x+(${e})`)})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${-a}x+(${-b})`)} ${c < 0 ? '' : '+'} ${printlatex(`${c}x^2+(${d})x+(${e})`)}$
          <br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${c}x^2+(${-a + d}x)+(${-b + e})`)}$`
          reponse = `${printlatex(`${c}x^2+(${-a + d}x)+(${-b + e})`)}$`
          break
        case 9 : // '(ax2+bx+c)-(dx2+ex+f)'
          texte = `$${lettreDepuisChiffre(i + 1)}= (${printlatex(`${a}x^2+(${b}x)+(${c})`)}) - (${printlatex(`${d}x^2+(${e}x)+(${f})`)})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${a}x^2+(${b}x)+(${c})`)} ${-d < 0 ? '' : '+'} ${printlatex(`${-d}x^2+(${-e}x)+(${-f})`)}$
          <br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${a - d}x^2+(${b - e})x+(${c - f})`)}$`
          reponse = `${printlatex(`${a - d}x^2+(${b - e}x)+(${c - f})`)}$`
          break
        case 10 : // '-(ax2+bx+c)+(dx2+ex+f)'
          texte = `$${lettreDepuisChiffre(i + 1)}= -(${printlatex(`${a}x^2+(${b}x)+(${c})`)}) + (${printlatex(`${d}x^2+(${e}x)+(${f})`)})$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${-a}x^2+(${-b}x)+(${-c})`)} ${d < 0 ? '' : '+'} ${printlatex(`${d}x^2+(${e}x)+(${f})`)}$
          <br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${printlatex(`${-a + d}x^2+(${-b + e}x)+(${-c + f})`)}$`
          reponse = `${printlatex(`${-a + d}x^2+(${-b + e}x)+(${-c + f})`)}$`
          break
      }
      if (this.interactif) {
        texte += '$ = $' + ajouteChampTexteMathLive(this, i, 'inline largeur75')
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        setReponse(this, i, reponse)
        i++
      }
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireTexte = ['Type de question',
  `0 : Mélange
1 : '-(ax+b)'
2 : '+(ax+b)'
3 : '-(ax2+bx+c)'
4 : '+(ax2+bx+c)'
5 : '+(ax+b)-(cx+d)'
6 : '-(ax+b)+(cx+d)'
7 : '+(ax+b)-(cx2+dx+e)'
8 : '-(ax+b)+(cx2+dx+e)'
9 : '+(ax2+bx+c)-(dx2+ex+f)'
10 : '-(ax2+bx+c)+(dx2+ex+f)'`
  ]
}
