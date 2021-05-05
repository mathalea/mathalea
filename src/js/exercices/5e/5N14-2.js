import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,enleveElement,choice,compareFractions,shuffle,miseEnEvidence,tex_fraction} from '../../modules/outils.js'
import Algebrite from 'algebrite'

export const titre = 'Comparer quatre fractions (dénominateurs multiples) et un nombre entier'

/**
* 4 fractions aux dénominateurs multiples et un nombre entier sont donnés, il faut les classer dans l'ordre croissant ou décroissant
*
* Pour la correction, les fractions sont toute écrites avec un dénominateur commun avant d'être classées
* @Auteur Rémi Angot
* 5N14-2
*/
export default function Exercice_comparer_quatre_fractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Ranger les nombres suivants dans l'ordre croissant."
  this.spacing = 2
  sortieHtml ? this.spacingCorr = 4 : this.spacingCorr = 2.5
  this.nbQuestions = 2
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (let i = 0, denominateurs, n1, d1, n2, d2, n3, d3, n4, d4, k, texte = '', texteCorr = ''; i < this.nbQuestions; i++) {
      const liste_denominateurs = [[12, 2, 3, 4, 6], [16, 2, 4, 8], [18, 2, 3, 6, 9], [20, 2, 4, 5, 10], [24, 2, 3, 4, 8, 12], [30, 2, 3, 5, 6]]
      denominateurs = choice(liste_denominateurs)
      d1 = denominateurs[0]
      enleveElement(denominateurs, d1)
      d2 = choice(denominateurs)
      enleveElement(denominateurs, d2)
      d3 = choice(denominateurs)
      d4 = choice(denominateurs)
      k = randint(1, 3)
      n1 = randint(1, 10)
      n2 = randint(1, 10)
      n3 = randint(1, 10)
      n4 = choice([d4 + randint(1, 3), d4 * 2 + randint(1, 2)], randint(1, 10))
      // [num,den,calcul de mise au même dénominateur, num qui correspond au denominateur commun]
      while (((n1 / d1 - n2 / d2) * (n1 / d1 - n3 / d3) * (n1 / d1 - n4 / d4) * (n2 / d2 - n3 / d3) * (n2 / d3 - n4 / d4) * (n3 / d3 - n4 / d4) < 0.1) || (n1 % d1 === 0) || (n2 % d2 === 0) || (n3 % d3 === 0) || (n4 % d4 === 0)) {
        n1 = randint(1, 11)
        n2 = randint(1, 11)
        n3 = randint(1, 11)
        n4 = randint(1, 11)
      }
      const tableau_fractions = [[n1, d1, `$${tex_fraction(n1, d1)}$`, `$${tex_fraction(n1, d1)}$`]]
      tableau_fractions.push([n2, d2, `$${tex_fraction(n2, d2)}=${tex_fraction(n2 + miseEnEvidence('\\times ' + Algebrite.eval(d1 / d2)), d2 + miseEnEvidence('\\times ' + Algebrite.eval(d1 / d2)))}=${tex_fraction(Algebrite.eval(n2 * d1 / d2), d1)}$`, `$${tex_fraction(Algebrite.eval(n2 * d1 / d2), d1)}$`])
      tableau_fractions.push([n3, d3, `$${tex_fraction(n3, d3)}=${tex_fraction(n3 + miseEnEvidence('\\times ' + Algebrite.eval(d1 / d3)), d3 + miseEnEvidence('\\times ' + Algebrite.eval(d1 / d3)))}=${tex_fraction(Algebrite.eval(n3 * d1 / d3), d1)}$`, `$${tex_fraction(Algebrite.eval(n3 * d1 / d3), d1)}$`])
      tableau_fractions.push([n4, d4, `$${tex_fraction(n4, d4)}=${tex_fraction(n4 + miseEnEvidence('\\times ' + Algebrite.eval(d1 / d4)), d4 + miseEnEvidence('\\times ' + Algebrite.eval(d1 / d4)))}=${tex_fraction(Algebrite.eval(n4 * d1 / d4), d1)}$`, `$${tex_fraction(Algebrite.eval(n4 * d1 / d4), d1)}$`])
      tableau_fractions.push([k, 1, `$${k}=${tex_fraction(d1 * k, d1)}$`, `$${tex_fraction(k * d1, d1)}$`])
      tableau_fractions.sort(compareFractions)
      const tableau_fractions_enonce = shuffle(tableau_fractions)
      texte = ''
      for (let j = 0; j < tableau_fractions_enonce.length; j++) {
        if (tableau_fractions_enonce[j][1] === 1) {
          texte += `$${tableau_fractions_enonce[j][0]}\\quad\\text{;}\\quad$`
        } else {
          texte += `$${tex_fraction(tableau_fractions_enonce[j][0], tableau_fractions_enonce[j][1])}\\quad\\text{;}\\quad$`
        }
      }
      texte = texte.substring(0, texte.length - 19) + '$' // Enlève les 21 derniers caractères (pour le ; de la fin)
      tableau_fractions.sort(compareFractions)
      texteCorr = ''
      for (let j = 0; j < tableau_fractions_enonce.length; j++) {
        texteCorr += tableau_fractions_enonce[j][2]
        texteCorr += '<br>'
      }
      for (let j = 0; j < tableau_fractions.length; j++) {
        texteCorr += tableau_fractions[j][3]
        if (j < tableau_fractions.length - 1) {
          texteCorr += '$\\quad<\\quad$'
        }
      }
      texteCorr += '<br>'
      let texte_conclusion = ''
      for (let j = 0; j < tableau_fractions.length; j++) {
        if (tableau_fractions[j][1] === 1) {
          texte_conclusion += `$${tableau_fractions[j][0]}\\quad<\\quad$`
        } else {
          texte_conclusion += `$${tex_fraction(tableau_fractions[j][0], tableau_fractions[j][1])}\\quad<\\quad$`
        }
      }
      texteCorr += 'Finalement : $\\quad$ ' + texte_conclusion.substring(0, texte_conclusion.length - 12) + '$'
      texte = texte.replaceAll('$$', ' ')
      texteCorr = texte.replaceAll('$$', ' ')
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
