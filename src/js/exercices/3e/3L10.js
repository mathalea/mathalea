import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, combinaisonListes, lettreDepuisChiffre, printlatex, listeQuestionsToContenuSansNumero, rangeMinMax, contraindreValeur, choice, reduirePolynomeDegre3 } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const titre = 'Supprimer les parenthèses puis réduire l\'expression'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCHybride'
export const amcReady = true

/**
 * Donner l'opposé d'une expression.
 *
 * Ajout des différents cas de 4 à 10 par Mickael Guironnet
 * @author Rémi Angot (AMC par Eric Elter)
 */
export const uuid = '603a8'
export const ref = '3L10'
export default function OpposeExpression () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.spacing = context.isHtml ? 3 : 2
  this.spacing = context.isHtml ? 3 : 2
  this.nbQuestions = 6
  this.sup = '1-2-3-4'
  this.tailleDiaporama = 3
  this.nouvelleVersion = function () {
    this.consigne = this.nbQuestions > 1 ? 'Supprimer les parenthèses et réduire les expressions suivantes.' : 'Supprimer les parenthèses et réduire l\'expression suivante.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let listeTypeDeQuestions = []
    const lettresPossibles = ['a', 'b', 'c', 'x', 'y', 'z']
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
    for (let i = 0, texte, texteCorr, a, b, c, d, e, f, choixLettre, reponse, reponse1, reponse2, reponse3, cpt = 0; i < this.nbQuestions && cpt < 50; cpt++) {
      a = randint(-9, 9, 0)
      b = randint(-9, 9, 0)
      c = randint(-11, 11, 0)
      d = randint(-11, 11, 0)
      e = randint(-11, 11, 0)
      f = randint(-11, 11, 0)
      choixLettre = choice(lettresPossibles)

      switch (listeTypeDeQuestions[i]) {
        case 1 : // '-(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=-(${printlatex(
            `${a}${choixLettre}+(${b})`
          )})$`
          texteCorr = texte
          // texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`${-a}*${choixLettre}+(${-b})`)}$`
          reponse1 = 0
          reponse2 = -a
          reponse3 = -b
          break
        case 2 : // '(ax+b)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${printlatex(
            `${a}${choixLettre}+(${b})`
          )})$`
          texteCorr = texte
          // texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*${choixLettre}+(${b})`)}$`
          reponse1 = 0
          reponse2 = a
          reponse3 = b
          break
        case 3 : // '-(ax2+bx+c)':
          texte = `$${lettreDepuisChiffre(i + 1)}=-(${printlatex(
            `${a}${choixLettre}^2+(${b})${choixLettre}+(${c})`
          )})$`
          texteCorr = texte
          // texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`${-a}${choixLettre}^2+(${-b})${choixLettre}+(${-c})`)}$`
          reponse1 = -a
          reponse2 = -b
          reponse3 = -c
          break
        case 4 : // '(ax2+bx+c)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${printlatex(
            `${a}${choixLettre}^2+(${b})${choixLettre}+(${c})`
          )})$`
          texteCorr = texte
          // texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}${choixLettre}^2+(${b})${choixLettre}+(${c})`)}$`
          reponse1 = a
          reponse2 = b
          reponse3 = c
          break
        case 5 : // '(ax+b)-(cx+d)':
          texte = `$${lettreDepuisChiffre(i + 1)}= (${printlatex(`${a}${choixLettre}+(${b})`)}) - (${printlatex(`${c}${choixLettre}+(${d})`)})$`
          texteCorr = texte
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${printlatex(`${a}${choixLettre}+(${b})`)} ${-c < 0 ? '' : '+'} ${printlatex(`${-c}${choixLettre}+(${-d})`)}$`
          reponse1 = 0
          reponse2 = a - c
          reponse3 = b - d
          break
        case 6 : // '-(ax+b)+(cx+d)':
          texte = `$${lettreDepuisChiffre(i + 1)}= -(${printlatex(`${a}${choixLettre}+(${b})`)}) + (${printlatex(`${c}${choixLettre}+(${d})`)})$`
          texteCorr = texte
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${printlatex(`${-a}${choixLettre}+(${-b})`)} ${c < 0 ? '' : '+'} ${printlatex(`${c}${choixLettre}+(${d})`)}$`
          reponse1 = 0
          reponse2 = c - a
          reponse3 = d - b
          break
        case 7 : // '(ax+b)-(cx2+dx+e)':
          texte = `$${lettreDepuisChiffre(i + 1)}= (${printlatex(`${a}${choixLettre}+(${b})`)}) - (${printlatex(`${c}${choixLettre}^2+(${d}${choixLettre})+(${e})`)})$`
          texteCorr = texte
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${printlatex(`${a}${choixLettre}+(${b})`)} ${-c < 0 ? '' : '+'} ${printlatex(`${-c}${choixLettre}^2+(${-d}${choixLettre})+(${-e})`)}$`
          reponse1 = -c
          reponse2 = a - d
          reponse3 = b - e
          break
        case 8 : // '-(ax+b)+(cx2+dx+e)':
          texte = `$${lettreDepuisChiffre(i + 1)}= -(${printlatex(`${a}${choixLettre}+(${b})`)}) + (${printlatex(`${c}${choixLettre}^2+(${d})${choixLettre}+(${e})`)})$`
          texteCorr = texte
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${printlatex(`${-a}${choixLettre}+(${-b})`)} ${c < 0 ? '' : '+'} ${printlatex(`${c}${choixLettre}^2+(${d})${choixLettre}+(${e})`)}$`
          reponse1 = c
          reponse2 = -a + d
          reponse3 = -b + e
          break
        case 9 : // '(ax2+bx+c)-(dx2+ex+f)'
          texte = `$${lettreDepuisChiffre(i + 1)}= (${printlatex(`${a}${choixLettre}^2+(${b}${choixLettre})+(${c})`)}) - (${printlatex(`${d}${choixLettre}^2+(${e}${choixLettre})+(${f})`)})$`
          texteCorr = texte
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${printlatex(`${a}${choixLettre}^2+(${b}${choixLettre})+(${c})`)} ${-d < 0 ? '' : '+'} ${printlatex(`${-d}${choixLettre}^2+(${-e}${choixLettre})+(${-f})`)}$`
          reponse1 = a - d
          reponse2 = b - e
          reponse3 = c - f
          break
        case 10 : // '-(ax2+bx+c)+(dx2+ex+f)'
          texte = `$${lettreDepuisChiffre(i + 1)}= -(${printlatex(`${a}${choixLettre}^2+(${b}${choixLettre})+(${c})`)}) + (${printlatex(`${d}${choixLettre}^2+(${e}${choixLettre})+(${f})`)})$`
          texteCorr = texte
          texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}= ${printlatex(`${-a}${choixLettre}^2+(${-b}${choixLettre})+(${-c})`)} ${d < 0 ? '' : '+'} ${printlatex(`${d}${choixLettre}^2+(${e}${choixLettre})+(${f})`)}$`
          reponse1 = -a + d
          reponse2 = -b + e
          reponse3 = -c + f
          break
      }
      texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${reduirePolynomeDegre3(0, reponse1, reponse2, reponse3, choixLettre)}$`
      reponse = `${reduirePolynomeDegre3(0, reponse1, reponse2, reponse3, choixLettre)}`

      // texte += '<br>' + listeTypeDeQuestions[i]
      if (!context.isAmc && this.interactif) {
        setReponse(this, i, reponse)
        texte += this.interactif ? (`<br>$${lettreDepuisChiffre(i + 1)} = $` + ajouteChampTexteMathLive(this, i, 'largeur75 inline nospacebefore')) : ''
      } else {
        this.autoCorrection[i] = {
          enonce: '',
          enonceAvant: false,
          options: { multicols: true, barreseparation: true },
          propositions: [
            {
              type: 'AMCOpen',
              propositions: [{
                texte: texteCorr,
                enonce: texte + '<br>',
                statut: 4
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: `valeur de $m$ dans $m${choixLettre}^2+n${choixLettre}+p$`,
                  valeur: reponse1,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: true,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: `valeur de $n$ dans $m${choixLettre}^2+n${choixLettre}+p$`,
                  valeur: reponse2,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: true,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: `valeur de $p$ dans $m${choixLettre}^2+n${choixLettre}+p$`,
                  valeur: reponse3,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: true,
                    approx: 0
                  }
                }
              }]
            }
          ]
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireTexte = ['Types de questions',
  `Nombres séparés par des tirets
0 : Mélange
1 : '-(ax+b)'
2 : '(ax+b)'
3 : '-(ax2+bx+c)'
4 : '(ax2+bx+c)'
5 : '(ax+b)-(cx+d)'
6 : '-(ax+b)+(cx+d)'
7 : '(ax+b)-(cx2+dx+e)'
8 : '-(ax+b)+(cx2+dx+e)'
9 : '(ax2+bx+c)-(dx2+ex+f)'
10 : '-(ax2+bx+c)+(dx2+ex+f)'`
  ]
}
