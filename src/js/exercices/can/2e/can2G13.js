import Exercice from '../../Exercice.js'
import { randint, choice, ecritureParentheseSiNegatif, texteEnCouleur, extraireRacineCarree, lettreMinusculeDepuisChiffre } from '../../../modules/outils.js'
export const titre = 'Calculer la norme d’un vecteur'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '6/12/2021'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Florence Tapiero
 * Référence can2G13
 * Date de publication décembre 2021
*/
export const uuid = '3a0e1'
export const ref = 'can2G13'
export default function NormeVecteur () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, nom, reduction
    switch (choice(['a'])) {
      case 'a':
        a = randint(-9, 9)
        b = randint(-6, 6, a)
        nom = lettreMinusculeDepuisChiffre(randint(11, 26, [15, 24, 25]))
        reduction = extraireRacineCarree(a ** 2 + b ** 2)
        if (a ** 2 + b ** 2 === 1 || a ** 2 + b ** 2 === 4 || a ** 2 + b ** 2 === 9 || a ** 2 + b ** 2 === 16 || a ** 2 + b ** 2 === 25 || a ** 2 + b ** 2 === 36 || a ** 2 + b ** 2 === 49 || a ** 2 + b ** 2 === 64 || a ** 2 + b ** 2 === 81 || a ** 2 + b ** 2 === 100) {
          this.question = `Dans un repère orthonormé du plan, on donne $\\overrightarrow{${nom}}(${a};${b})$ .<br>
        Déterminer la norme du vecteur $\\overrightarrow{${nom}}$.<br><br>
        Donner le résultat sous la forme $\\sqrt{a}$ ou d'un nombre entier le cas échéant.`
          this.optionsChampTexte = { texteApres: '' }
          this.correction = `D'après le cours, si $\\overrightarrow{u}(x;y)$ alors $\\| \\overrightarrow{u} \\|=\\sqrt{x^2+y^2}$. On a donc : <br><br>
          $ \\| \\overrightarrow{${nom}} \\|=
          \\sqrt{${ecritureParentheseSiNegatif(a)}^2+${ecritureParentheseSiNegatif(b)}^2}=
          \\sqrt{${a ** 2}+ ${b ** 2}}=
          \\sqrt{${a ** 2 + b ** 2}}=
          ${Math.sqrt(a ** 2 + b ** 2)}$.<br><br>`
          this.correction += texteEnCouleur(`Comme $${a ** 2 + b ** 2}$ est un carré parfait, on simplie la racine carrée.
           `)
          this.reponse = Math.sqrt(a ** 2 + b ** 2)
        } else {
          this.question = `Dans un repère orthonormé du plan, on donne $\\overrightarrow{${nom}}(${a};${b})$ .<br>
          Déterminer la norme du vecteur $\\overrightarrow{${nom}}$.<br><br>
          Donner le résultat sous la forme $\\sqrt{a}$ ou d'un nombre entier le cas échéant.`
          this.optionsChampTexte = { texteApres: '' }
          this.correction = `D'après le cours, si $\\overrightarrow{u}(x;y)$ alors $\\| \\overrightarrow{u} \\|=\\sqrt{x^2+y^2}$. On a donc : <br><br>
          $\\| \\overrightarrow{${nom}} \\| =
          \\sqrt{${ecritureParentheseSiNegatif(a)}^2+${ecritureParentheseSiNegatif(b)}^2}=
          \\sqrt{${a ** 2}+ ${b ** 2}}=
          \\sqrt{${a ** 2 + b ** 2}}$<br><br>`
          this.correction += texteEnCouleur(`Comme $${a ** 2 + b ** 2}$ n'est pas un carré parfait, on ne simplifie pas (la réponse doit être sous la forme $\\sqrt{a}$ ou d'un entier). <br>
          `)
          this.reponse = [`\\sqrt{${a ** 2 + b ** 2}}`, `${Math.sqrt(a ** 2 + b ** 2)}`]
          if (reduction[0] !== 1) {
            this.correction += texteEnCouleur(`Remarque : sous forme simplifiée, la réponse est $${reduction[0]}\\sqrt{${reduction[1]}}$ car $${a ** 2 + b ** 2}=${reduction[0]}^2 \\times ${reduction[1]}$.`)
          }
        }
        break
    }
  }
}
