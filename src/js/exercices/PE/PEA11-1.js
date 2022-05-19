import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, valeurBase, texNombre, nombreAvecEspace, miseEnEvidence } from '../../modules/outils.js'
export const titre = 'Passer de la base 12 ou 16 à la base 10 et inversement'

/**
* Passer d'une écriture en base 10 à l'écriture dans une autre base ou inversement
* référence PEA11-1
* * Convertir en base 10
* * Convertir vers une base entre 2 et 7
* * Trouver le plus grand nombre à 3 ou 4 chiffres d'une base ainsi que son successeur et le convertir en base 10 ou le plus petit et son prédecesseur
*
* @author Rémi Angot
*/
export default function PasserDeLaBase12Ou16ALaBase10 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = ['vers_base_10', 'vers_base_n_3_chiffres']
    if (this.nbQuestions === 3) {
      typesDeQuestionsDisponibles.push(choice(['vers_base_n_4_chiffres', 'plus_grand_4_chiffres', 'plus_petit_4_chiffres', 'plus_petit_3_chiffres']))
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const b = choice([12, 16])
    if (b === 12) {
      this.introduction = 'Les symboles que lon utilise en base 12 sont les dix chiffres habituels, la lettre A pour désigner 10 unités et la lettre B pour désigner 11 unités.'
    } else {
      this.introduction = 'Les symboles que lon utilise en base 16 sont les dix chiffres habituels, la lettre A pour désigner 10 unités, B pour 11 unités, C pour 12 unités, D pour 13 unités, '
      this.introduction += 'E pour 14 unités et F pour 15 unités.'
    }
    for (let i = 0, texte, texteCorr, n, m, chiffre1, chiffre2, chiffre3, chiffre4, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'vers_base_10':
          if (b === 12) {
            n = choice([choice(['A', 'B']) + randint(0, 9), randint(1, 9) + choice(['A', 'B']), choice(['A', 'B']) + choice(['A', 'B'])])
            m = choice(['A', 'B', randint(1, 9)]) + choice(['A', 'B', randint(0, 9)]) + choice(['A', 'B', randint(0, 9)]) + choice(['A', 'B', randint(0, 9)])
          }
          if (b === 16) {
            n = choice(['A', 'B', 'C', 'D', 'E', 'F', randint(1, 9).toString()]) + choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
            m = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) + choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) + choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
          }
          texte = `Les nombre $(${n})_{${b}}$ et $(${m})_{${b}}$ sont écrits en base ${b}. Donner leur écriture en base 10.`
          texteCorr = `$(${n})_{${b}}=${valeurBase(n.toString()[0])}\\times${b}+${valeurBase(n.toString()[1])}=${texNombre(parseInt(n, b))}$`
          if (b === 12) { // m est un nombre à 4 chiffres
            texteCorr += `<br>$(${m})_{${b}}=${valeurBase(m.toString()[0])}\\times${b}^3+${valeurBase(m.toString()[1])}\\times${b}^2+${valeurBase(m.toString()[2])}\\times${b}+${valeurBase(m.toString()[3])}=${texNombre(parseInt(m, b))}$`
          } else { // m est un nombre à 3 chiffres
            texteCorr += `<br>$(${m})_{${b}}=${valeurBase(m.toString()[0])}\\times${b}^2+${valeurBase(m.toString()[1])}\\times${b}+${valeurBase(m.toString()[2])}=${texNombre(parseInt(m, b))}$`
          }
          break
        case 'vers_base_n_3_chiffres':
          if (b === 12) {
            chiffre1 = choice(['A', 'B', randint(1, 9).toString()])
            chiffre2 = choice(['A', 'B', randint(0, 9).toString()])
            chiffre3 = choice(['A', 'B', randint(1, 9).toString()])
          } else {
            chiffre1 = choice(['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
            chiffre2 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
            chiffre3 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
          }
          n = valeurBase(chiffre1) * b ** 2 + valeurBase(chiffre2) * b + valeurBase(chiffre3)
          texte = `Écrire en base ${b} le nombre ${nombreAvecEspace(n)}.`
          texteCorr = `$${texNombre(n)}=${b}\\times${Math.floor(n / b)}+${miseEnEvidence(n % b)}$`
          texteCorr += `<br>$${Math.floor(n / b)}=${b}\\times${miseEnEvidence(valeurBase(chiffre1))}+${miseEnEvidence(valeurBase(chiffre2))}$`
          texteCorr += `<br> Finalement $${texNombre(n)}=(${chiffre1}${chiffre2}${chiffre3})_{${b}}$`
          break
        case 'vers_base_n_4_chiffres':
          if (b === 12) {
            chiffre1 = choice(['A', 'B', randint(1, 9).toString()])
            chiffre2 = choice(['A', 'B', randint(0, 9).toString()])
            chiffre3 = choice(['A', 'B', randint(1, 9).toString()])
            chiffre4 = choice(['A', 'B', randint(1, 9).toString()])
          } else {
            chiffre1 = choice(['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
            chiffre2 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
            chiffre3 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
            chiffre4 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
          }
          n = valeurBase(chiffre1) * b ** 3 + valeurBase(chiffre2) * b ** 2 + valeurBase(chiffre3) * b + valeurBase(chiffre4)
          texte = `Écrire en base ${b} le nombre ${nombreAvecEspace(n)}.`
          texteCorr = `$${texNombre(n)}=${b}\\times${Math.floor(n / b)}+${miseEnEvidence(n % b)}$`
          texteCorr += `<br>$${texNombre(Math.floor(n / b))}=${b}\\times${Math.floor(Math.floor(n / b) / b)}+${miseEnEvidence(Math.floor(n / b) % b)}$`
          texteCorr += `<br>$${texNombre(Math.floor(Math.floor(n / b) / b))}=${b}\\times${miseEnEvidence(valeurBase(chiffre1))}+${miseEnEvidence(valeurBase(chiffre2))}$`
          texteCorr += `<br> Finalement $${texNombre(n)}=(${chiffre1}${chiffre2}${chiffre3}${chiffre4})_{${b}}$`
          break
        case 'plus_grand_4_chiffres':
          texte = `Quel est le plus grand nombre à 4 chiffres que l'on peut écrire en base ${b}.`
          texte += `<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`
          if (b === 12) {
            texteCorr = `En base ${b} le plus grand chiffre est $B$`
            texteCorr += ` donc le plus grand nombre à 4 chiffres est $(BBBB)_{${b}}$ et son successeur immédiat est $(10000)_{${b}}$.`
            texteCorr += `<br> $(10000)_{${b}}=1\\times${b}^4=${texNombre(b ** 4)}$ donc $(BBBB)_{${b}}=${b ** 4}-1=${texNombre(b ** 4 - 1)}$.`
          } else {
            texteCorr = `En base ${b} le plus grand chiffre est $F$`
            texteCorr += ` donc le plus grand nombre à 4 chiffres est $(FFFF)_{${b}}$ et son successeur immédiat est $(10000)_{${b}}$.`
            texteCorr += `<br> $(10000)_{${b}}=1\\times${b}^4=${texNombre(b ** 4)}$ donc $(FFFF)_{${b}}=${b ** 4}-1=${texNombre(b ** 4 - 1)}$.`
          }
          break
        case 'plus_grand_3_chiffres':
          texte = `Quel est le plus grand nombre à 3 chiffres que l'on peut écrire en base ${b}.`
          texte += `<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`
          if (b === 12) {
            texteCorr = `En base ${b} le plus grand chiffre est $B$`
            texteCorr += ` donc le plus grand nombre à 3 chiffres est $(BBB)_{${b}}$ et son successeur immédiat est $(1000)_{${b}}$.`
            texteCorr += `<br> $(1000)_{${b}}=1\\times${b}^3=${texNombre(b ** 3)}$ donc $(BBB)_{${b}}=${b ** 3}-1=${texNombre(b ** 3 - 1)}$.`
          } else {
            texteCorr = `En base ${b} le plus grand chiffre est $F$`
            texteCorr += ` donc le plus grand nombre à 3 chiffres est $(FFF)_{${b}}$ et son successeur immédiat est $(1000)_{${b}}$.`
            texteCorr += `<br> $(1000)_{${b}}=1\\times${b}^3=${texNombre(b ** 3)}$ donc $(FFF)_{${b}}=${b ** 3}-1=${texNombre(b ** 3 - 1)}$.`
          }
          break
        case 'plus_petit_4_chiffres':
          texte = `Quel est le plus petit nombre à 4 chiffres que l'on peut écrire en base ${b}.`
          texte += `<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`
          if (b === 12) {
            texteCorr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $B$`
            texteCorr += ` donc le plus petit nombre à 4 chiffres est $(1000)_{${b}}$ et son prédécesseur immédiat est $(BBB)_{${b}}$.`
            texteCorr += `<br> $(1000)_{${b}}=1\\times${b}^3=${texNombre(b ** 3)}$ donc $(BBB)_{${b}}=${b ** 3}-1=${texNombre(b ** 3 - 1)}$.`
          } else {
            texteCorr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $F$`
            texteCorr += ` donc le plus petit nombre à 4 chiffres est $(1000)_{${b}}$ et son prédécesseur immédiat est $(FFF)_{${b}}$.`
            texteCorr += `<br> $(1000)_{${b}}=1\\times${b}^3=${texNombre(b ** 3)}$ donc $(FFF)_{${b}}=${b ** 3}-1=${texNombre(b ** 3 - 1)}$.`
          }
          break
        case 'plus_petit_3_chiffres':
          texte = `Quel est le plus petit nombre à 3 chiffres que l'on peut écrire en base ${b}.`
          texte += `<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`
          if (b === 12) {
            texteCorr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $B$`
            texteCorr += ` donc le plus petit nombre à 3 chiffres est $(100)_{${b}}$ et son prédécesseur immédiat est $(BB)_{${b}}$.`
            texteCorr += `<br> $(100)_{${b}}=1\\times${b}^2=${texNombre(b ** 2)}$ donc $(BB)_{${b}}=${b ** 2}-1=${texNombre(b ** 2 - 1)}$.`
          } else {
            texteCorr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $F$`
            texteCorr += ` donc le plus petit nombre à 3 chiffres est $(100)_{${b}}$ et son prédécesseur immédiat est $(FF)_{${b}}$.`
            texteCorr += `<br> $(100)_{${b}}=1\\times${b}^2=${texNombre(b ** 2)}$ donc $(FF)_{${b}}=${b ** 2}-1=${texNombre(b ** 2 - 1)}$.`
          }
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
}
