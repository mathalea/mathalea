import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { miseEnEvidence } from '../../modules/outils/contextSensitif.js'
import { texNombre } from '../../modules/outils/texNombres.js'
export const titre = 'Passer de la base dix à une autre base et inversement'

/**
* Passer d'une écriture en base 10 à l'écriture dans une autre base ou inversement
* référence PEA11
* * Convertir en base 10
* * Convertir vers une base entre 2 et 7
* * Trouver le plus grand nombre à 3 ou 4 chiffres d'une base ainsi que son successeur et le convertir en base 10 ou le plus petit et son prédecesseur
*
* @author Rémi Angot
*/
export const uuid = '8dbda'
export const ref = 'PEA11'
export default function PasserDUneBaseA1Autre () {
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

    let typesDeQuestionsDisponibles = ['vers_base_10', choice(['vers_base_n_3_chiffres', 'vers_base_n_4_chiffres']), choice(['plus_grand_4_chiffres', 'plus_grand_3_chiffres', 'plus_petit_4_chiffres', 'plus_petit_3_chiffres'])]
    if (this.nbQuestions > 3) {
      typesDeQuestionsDisponibles = ['vers_base_10', 'vers_base_n_3_chiffres', 'vers_base_n_4_chiffres', 'plus_grand_4_chiffres', 'plus_grand_3_chiffres', 'plus_petit_4_chiffres', 'plus_petit_3_chiffres']
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, b, n, m, chiffre1, chiffre2, chiffre3, chiffre4, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      b = randint(2, 7)
      switch (listeTypeDeQuestions[i]) {
        case 'vers_base_10':
          n = randint(1, b - 1) * 10 + randint(0, b - 1)
          m = randint(1, b - 1) * 1000 + randint(0, b - 1) * 100 + randint(0, b - 1) * 10 + randint(0, b - 1)
          texte = `Les nombres $(${n})_${b}$ et $(${m})_${b}$ sont écrits en base ${b}. Exprimer leur écriture en base dix.`
          texteCorr = `$(${n})_${b}=${n.toString()[0]}\\times${b}+${n.toString()[1]}=${parseInt(n, b)}$`
          texteCorr += `<br>$(${m})_${b}=${m.toString()[0]}\\times${b}^3+${m.toString()[1]}\\times${b}^2+${m.toString()[2]}\\times${b}+${m.toString()[3]}=${parseInt(m, b)}$`
          break
        case 'vers_base_n_3_chiffres':
          chiffre1 = randint(1, b - 1)
          chiffre2 = randint(0, b - 1)
          chiffre3 = randint(0, b - 1)
          n = chiffre1 * b ** 2 + chiffre2 * b + chiffre3
          texte = `Écrire en base ${b} le nombre dont l'écriture décimale est ${n}.`
          texteCorr = `$${n}=${b}\\times${Math.floor(n / b)}+${miseEnEvidence(n % b)}$`
          texteCorr += `<br>$${Math.floor(n / b)}=${b}\\times${miseEnEvidence(chiffre1)}+${miseEnEvidence(chiffre2)}$`
          texteCorr += `<br> Finalement $${n}=(${chiffre1}${chiffre2}${chiffre3})_${b}$`
          break
        case 'vers_base_n_4_chiffres':
          chiffre1 = randint(1, b - 1)
          chiffre2 = randint(0, b - 1)
          chiffre3 = randint(0, b - 1)
          chiffre4 = randint(0, b - 1)
          n = chiffre1 * b ** 3 + chiffre2 * b ** 2 + chiffre3 * b + chiffre4
          texte = `Écrire en base ${b} le nombre dont l'écriture décimale est ${n}.`
          texteCorr = `$${n}=${b}\\times${Math.floor(n / b)}+${miseEnEvidence(n % b)}$`
          texteCorr += `<br>$${Math.floor(n / b)}=${b}\\times${Math.floor(Math.floor(n / b) / b)}+${miseEnEvidence(Math.floor(n / b) % b)}$`
          texteCorr += `<br>$${Math.floor(Math.floor(n / b) / b)}=${b}\\times${miseEnEvidence(chiffre1)}+${miseEnEvidence(chiffre2)}$`
          texteCorr += `<br> Finalement $${n}=(${chiffre1}${chiffre2}${chiffre3}${chiffre4})_${b}$`
          break
        case 'plus_grand_4_chiffres':
          texte = `Quel est le plus grand nombre à 4 chiffres que l'on peut écrire en base ${b} ?`
          texte += `<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base dix de ces 2 nombres.`
          texteCorr = `En base ${b} les chiffres sont 0`
          for (let i = 1; i < b; i++) {
            texteCorr += `, ${i}`
          }
          texteCorr += ` donc le plus grand nombre à 4 chiffres est $(${b - 1}${b - 1}${b - 1}${b - 1})_${b}$ et son successeur immédiat est $(10000)_${b}$.`
          texteCorr += `<br> $(10000)_${b}=1\\times${b}^4=${texNombre(b ** 4)}$ donc $(${b - 1}${b - 1}${b - 1}${b - 1})_${b}=${b ** 4}-1=${texNombre(b ** 4 - 1)}$.`
          break
        case 'plus_grand_3_chiffres':
          texte = `Quel est le plus grand nombre à 3 chiffres que l'on peut écrire en base ${b} ?`
          texte += `<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base dix de ces 2 nombres.`
          texteCorr = `En base ${b} les chiffres sont 0`
          for (let i = 1; i < b; i++) {
            texteCorr += `, ${i}`
          }
          texteCorr += ` donc le plus grand nombre à 3 chiffres est $(${b - 1}${b - 1}${b - 1})_${b}$ et son successeur immédiat est $(1000)_${b}$.`
          texteCorr += `<br> $(1000)_${b}=1\\times${b}^3=${texNombre(b ** 3)}$ donc $(${b - 1}${b - 1}${b - 1})_${b}=${b ** 3}-1=${texNombre(b ** 3 - 1)}$.`
          break
        case 'plus_petit_4_chiffres':
          texte = `Quel est le plus petit nombre à 4 chiffres que l'on peut écrire en base ${b}.`
          texte += `<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base dix de ces 2 nombres.`
          texteCorr = `En base ${b} les chiffres sont 0`
          for (let i = 1; i < b; i++) {
            texteCorr += `, ${i}`
          }
          texteCorr += ` donc le plus petit nombre à 4 chiffres est $(1000)_${b}$ et son prédécesseur immédiat est $(${b - 1}${b - 1}${b - 1})_${b}$.`
          texteCorr += `<br> $(1000)_${b}=1\\times${b}^3=${texNombre(b ** 3)}$ donc $(${b - 1}${b - 1}${b - 1})_${b}=${b ** 3}-1=${texNombre(b ** 3 - 1)}$.`
          break
        case 'plus_petit_3_chiffres':
          texte = `Quel est le plus petit nombre à 3 chiffres que l'on peut écrire en base ${b}.`
          texte += `<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base dix de ces 2 nombres.`
          texteCorr = `En base ${b} les chiffres sont 0`
          for (let i = 1; i < b; i++) {
            texteCorr += `, ${i}`
          }
          texteCorr += ` donc le plus petit nombre à 3 chiffres est $(100)_${b}$ et son prédécesseur immédiat est $(${b - 1}${b - 1})_${b}$.`
          texteCorr += `<br> $(100)_${b}=1\\times${b}^2=${texNombre(b ** 2)}$ donc $(${b - 1}${b - 1})_${b}=${b ** 2}-1=${texNombre(b ** 2 - 1)}$.`
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
