import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, combinaisonListes, choice, calcul, randint, texNombre, modalTexteCourt } from '../../modules/outils.js'
export const titre = 'Puissances de 10 et préfixes kilo, méga, giga, téra'

/**
 * Utiliser les puissances de 10 et les préfixes kilo, Méga, Giga, Téra
 * @author Rémi Angot
 * Référence 4C32-2
 * 2021-02-05
*/
export const uuid = 'fedae'
export const ref = '4C32-2'
export default function ConversionsPuissancesDe10 (numeroExercice) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Compléter :'
  this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  // this.tailleDiaporama = 3; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.correction_detaille_disponible = true
  this.correctionDetaillee = !!context.isHtml

  this.boutonAide = modalTexteCourt(numeroExercice,
    `Téra : mille-milliards $\\times10^{12}$<br>
Giga : milliard $\\times10^9$<br>
Méga : millions $\\times10^6$<br>
kilo : mille $\\times10^{3}$<br>
milli : millième $\\times10^{-3}$<br>
micro : millionième $\\times10^{-6}$<br>
nano : milliardième $\\times10^{-9}$<br>
`, 'Signification des préfixes'
  )
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = ['m>km', 'u>M', 'u>G', 'g>t', 'M>G', 'M>T', 'G>T', 'm>mm', 'm>um', 'm>nm'] // On créé 3 types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    const listeDeSens = combinaisonListes(['div', 'fois'], this.nbQuestions)
    for (let i = 0, a, n, unite, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      a = choice([calcul(randint(1, 9) + randint(1, 9) / 10), calcul(randint(11, 99) + randint(1, 9) / 10 + randint(1, 9) / 100), calcul(randint(11, 999) + randint(1, 9) / 10)], calcul(randint(10000, 99999) / 100))
      texte = ''
      texteCorr = ''
      switch (listeTypeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'm>km':
          n = randint(6, 12)
          if (listeDeSens[i] === 'div') {
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{m} = ${texNombre(a)}~\\ldots\\ldots~\\text{km}$`
            if (this.correctionDetaillee) {
              texteCorr += "Il faut $1~000$ m pour 1 km, on va donc diviser par $1~000$, c'est-à-dire multiplier par $10^{-3}$.<br>"
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{m} = ${texNombre(a)}\\times10^{${n - 3}}~\\text{km}$`
          }
          if (listeDeSens[i] === 'fois') {
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{km} = ${texNombre(a)}~\\ldots\\ldots~\\text{m}$`
            if (this.correctionDetaillee) {
              texteCorr += "$1~\\text{km}=1~000~\\text{km}$, on va donc multiplier par $1~000$, c'est-à-dire multiplier par $10^{3}$.<br>"
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{km} = ${texNombre(a)}\\times10^{${n + 3}}~\\text{m}$`
          }
          break
        case 'u>M':
          n = randint(11, 20)
          unite = choice([['W', 'watts'], ['Wh', 'watts-heure']])
          if (listeDeSens[i] === 'div') {
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{M${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `Il faut 1 million de ${unite[1]} pour 1 M${unite[0]}, on va donc diviser par 1 million, c'est-à-dire multiplier par $10^{-6}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{${unite[0]}} = ${texNombre(a)}\\times10^{${n - 6}}~\\text{M${unite[0]}}$`
          }
          if (listeDeSens[i] === 'fois') {
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `1 M${unite[0]} c'est un million de ${unite[1]}, on va donc multiplier par 1 million, c'est-à-dire multiplier par $10^{6}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${texNombre(a)}\\times10^{${n + 6}}~\\text{${unite[0]}}$`
          }
          break
        case 'u>G':
          unite = choice([['W', 'watts'], ['Wh', 'watts-heure']])
          if (listeDeSens[i] === 'div') {
            n = randint(13, 20)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{G${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `Il faut 1 milliard de ${unite[1]} pour 1 G${unite[0]}, on va donc diviser par 1 milliard, c'est-à-dire multiplier par $10^{-9}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{${unite[0]}} = ${texNombre(a)}\\times10^{${n - 9}}~\\text{G${unite[0]}}$`
          }
          if (listeDeSens[i] === 'fois') {
            n = randint(4, 10)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `1 G${unite[0]} c'est un milliard de ${unite[1]}, on va donc multiplier par 1 milliard, c'est-à-dire multiplier par $10^{9}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${texNombre(a)}\\times10^{${n + 9}}~\\text{${unite[0]}}$`
          }
          break
        case 'g>t':
          if (listeDeSens[i] === 'div') {
            n = randint(13, 20)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{g} = ${texNombre(a)}~\\ldots\\ldots~\\text{t}$`
            if (this.correctionDetaillee) {
              texteCorr += 'Il faut 1 million de grammes pour 1 tonne, on va donc diviser par 1 million, c\'est-à-dire multiplier par $10^{-6}$.<br>'
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{g} = ${texNombre(a)}\\times10^{${n - 6}}~\\text{t}$`
          }
          if (listeDeSens[i] === 'fois') {
            n = randint(4, 10)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{t} = ${texNombre(a)}~\\ldots\\ldots~\\text{g}$`
            if (this.correctionDetaillee) {
              texteCorr += 'Une tonne c\'est un million de grammes, on va donc multiplier par 1 million, c\'est-à-dire multiplier par $10^{6}$.<br>'
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{t} = ${texNombre(a)}\\times10^{${n + 6}}~\\text{g}$`
          }
          break
        case 'M>G':
          unite = choice([['W', 'watts'], ['Wh', 'watts-heure']])
          if (listeDeSens[i] === 'div') {
            n = randint(8, 12)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{G${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `Il faut mille-millions de ${unite[1]} pour faire 1 milliard de ${unite[1]}, on va donc diviser par mille, c'est-à-dire multiplier par $10^{-3}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${texNombre(a)}\\times10^{${n - 3}}~\\text{G${unite[0]}}$`
          }
          if (listeDeSens[i] === 'fois') {
            n = randint(4, 10)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{M${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `Un milliard de ${unite[1]} c'est mille-millions de ${unite[1]}, on va donc multiplier par mille, c'est-à-dire multiplier par $10^{3}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${texNombre(a)}\\times10^{${n + 3}}~\\text{M${unite[0]}}$`
          }
          break
        case 'M>T':
          unite = choice([['W', 'watts'], ['Wh', 'watts-heure']])
          if (listeDeSens[i] === 'div') {
            n = randint(9, 15)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{T${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `Il faut mille  méga-${unite[1]} pour faire un giga-${unite[1]} et mille giga-${unite[1]} pour faire un téra-${unite[1]}, on va donc diviser par un million, c'est-à-dire multiplier par $10^{-6}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{M${unite[0]}} = ${texNombre(a)}\\times10^{${n - 6}}~\\text{T${unite[0]}}$`
          }
          if (listeDeSens[i] === 'fois') {
            n = randint(4, 10)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{T${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{M${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `Un téra-${unite[1]} c'est mille giga-${unite[1]} donc un million de méga-${unite[1]}, on va donc multiplier par un million, c'est-à-dire multiplier par $10^{6}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{T${unite[0]}} = ${texNombre(a)}\\times10^{${n + 6}}~\\text{M${unite[0]}}$`
          }
          break
        case 'G>T':
          unite = choice([['W', 'watts'], ['Wh', 'watts-heure']])
          if (listeDeSens[i] === 'div') {
            n = randint(8, 12)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{T${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `Il faut mille-milliards de ${unite[1]} pour faire 1 T${unite[0]}, on va donc diviser par mille, c'est-à-dire multiplier par $10^{-3}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{G${unite[0]}} = ${texNombre(a)}\\times10^{${n - 3}}~\\text{T${unite[0]}}$`
          }
          if (listeDeSens[i] === 'fois') {
            n = randint(4, 10)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{T${unite[0]}} = ${texNombre(a)}~\\ldots\\ldots~\\text{G${unite[0]}}$`
            if (this.correctionDetaillee) {
              texteCorr += `Un téra-${unite[1]} c'est mille-milliards de ${unite[1]}, on va donc multiplier par mille, c'est-à-dire multiplier par $10^{3}$.<br>`
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{T${unite[0]}} = ${texNombre(a)}\\times10^{${n + 3}}~\\text{G${unite[0]}}$`
          }
          break
        case 'm>mm':
          n = randint(6, 12)
          if (listeDeSens[i] === 'div') {
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{mm} = ${texNombre(a)}~\\ldots\\ldots~\\text{m}$`
            if (this.correctionDetaillee) {
              texteCorr += "Il faut $1~000$ mm pour 1 m, on va donc diviser par $1~000$, c'est-à-dire multiplier par $10^{-3}$.<br>"
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{mm} = ${texNombre(a)}\\times10^{${n - 3}}~\\text{m}$`
          }
          if (listeDeSens[i] === 'fois') {
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{m} = ${texNombre(a)}~\\ldots\\ldots~\\text{mm}$`
            if (this.correctionDetaillee) {
              texteCorr += "$1~\\text{m}=1~000~\\text{mm}$, on va donc multiplier par $1~000$, c'est-à-dire multiplier par $10^{3}$.<br>"
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{m} = ${texNombre(a)}\\times10^{${n + 3}}~\\text{mm}$`
          }
          break
        case 'm>um':
          if (listeDeSens[i] === 'div') {
            n = randint(3, 10)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\mu\\text{m} = ${texNombre(a)}~\\ldots\\ldots~\\text{m}$`
            if (this.correctionDetaillee) {
              texteCorr += "Il faut un million de $\\mu\\text{m}$ pour 1 m, on va donc diviser par un million, c'est-à-dire multiplier par $10^{-6}$.<br>"
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\mu\\text{m} = ${texNombre(a)}\\times10^{${n - 6}}~\\text{m}$`
          }
          if (listeDeSens[i] === 'fois') {
            n = randint(3, 10, [6]) * (-1)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{m} = ${texNombre(a)}~\\ldots\\ldots~\\mu\\text{m}$`
            if (this.correctionDetaillee) {
              texteCorr += "Un mètre équivaut à un million de micro-mètres, on va donc multiplier par un million, c'est-à-dire multiplier par $10^{6}$.<br>"
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{m} = ${texNombre(a)}\\times10^{${n + 6}}~\\mu\\text{m}$`
          }
          break
        case 'm>nm':
          if (listeDeSens[i] === 'div') {
            n = randint(3, 8)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{nm} = ${texNombre(a)}~\\ldots\\ldots~\\text{m}$`
            if (this.correctionDetaillee) {
              texteCorr += "Il faut un milliard de nano-mètres pour 1 m, on va donc diviser par un milliard, c'est-à-dire multiplier par $10^{-9}$.<br>"
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{nm} = ${texNombre(a)}\\times10^{${n - 9}}~\\text{m}$`
          }
          if (listeDeSens[i] === 'fois') {
            n = randint(3, 12, [9, 11]) * (-1)
            texte = `$${texNombre(a)}\\times10^{${n}}~\\text{m} = ${texNombre(a)}~\\ldots\\ldots~\\text{nm}$`
            if (this.correctionDetaillee) {
              texteCorr += "Un mètre équivaut à un milliard de nano-mètres, on va donc multiplier par un milliard, c'est-à-dire multiplier par $10^{9}$.<br>"
            }
            texteCorr += `$${texNombre(a)}\\times10^{${n}}~\\text{m} = ${texNombre(a)}\\times10^{${n + 9}}~\\text{nm}$`
          }
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
    listeQuestionsToContenu(this)
  }
}
