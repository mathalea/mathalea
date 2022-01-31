import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, combinaisonListes, lettreDepuisChiffre, printlatex, listeQuestionsToContenuSansNumero, rienSi1 } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Développer des carrés avec la double distributivité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '12/12/2021'

/**
* Utiliser la double distributivité pour développer (a+b)² ou (a-b)²
*
* @author Rémi Angot
* 3L11-7
*/
export default function CarreDoubleDistributivite () {
  Exercice.call(this)
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Développer et réduire les expressions suivantes.'
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2
  this.sup = true
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = ['(ax+b)2', '(b+ax)2', '(ax-b)2', '(b-ax)2']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, reponse, a, b, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(1, 11, 0)
      b = randint(1, 11, 0)
      switch (listeTypeDeQuestions[i]) {
        case '(ax+b)2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}x+${b})^2`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}x+${b})^2`)}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`(${a}x+${b})*(${a}x+${b})`)}$`
          if (this.sup) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${rienSi1(a)}x \\times ${rienSi1(a)}x + ${rienSi1(a)}x \\times ${b} + ${b} \\times ${rienSi1(a)}x  + ${b} \\times ${b}$`
          }
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${a * a}x^2 + ${a * b}x + ${a * b}x + ${b * b}`)}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${a * a}x^2 + ${2 * a * b}x + ${b * b}`)}$`
          reponse = printlatex(`${a * a}x^2 + ${2 * a * b}x + ${b * b}`)
          break
        case '(b+ax)2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}+${a}x)^2`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}+${a}x)^2`)}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`(${b}+${a}x)*(${b}+${a}x)`)}$`
          if (this.sup) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${b} \\times ${b} +  ${b} \\times ${rienSi1(a)}x +  ${rienSi1(a)}x \\times ${b}  + ${rienSi1(a)}x \\times ${rienSi1(a)}x $`
          }
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${b * b} + ${a * b}x + ${a * b}x + ${a * a}x^2`)}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${a * a}x^2 + ${2 * a * b}x + ${b * b}`)}$`
          reponse = printlatex(`${a * a}x^2 + ${2 * a * b}x + ${b * b}`)
          break
        case '(ax-b)2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}x-${b})^2`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${a}x-${b})^2`)}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`(${a}x-${b})*(${a}x-${b})`)}$`
          if (this.sup) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${rienSi1(a)}x \\times ${rienSi1(a)}x + ${rienSi1(a)}x \\times (${-b}) + (${-b}) \\times ${rienSi1(a)}x  + (${-b}) \\times (${-b})$`
          }
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${a * a}x^2 - ${a * b}x - ${a * b}x + ${b * b}`)}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${a * a}x^2 - ${2 * a * b}x + ${b * b}`)}$`
          reponse = printlatex(`${a * a}x^2 - ${2 * a * b}x + ${b * b}`)
          break
        case '(b-ax)2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}-${a}x)^2`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`(${b}-${a}x)^2`)}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`(${b}-${a}x)*(${b}-${a}x)`)}$`
          if (this.sup) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}= ${b} \\times ${b} +  ${b} \\times (-${rienSi1(a)}x) +  (-${rienSi1(a)}x) \\times ${b}  + (-${rienSi1(a)}x) \\times (-${rienSi1(a)}x) $`
          }
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${b * b} - ${a * b}x - ${a * b}x + ${a * a}x^2`)}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${printlatex(`${a * a}x^2 - ${2 * a * b}x + ${b * b}`)}$`
          reponse = printlatex(`${a * a}x^2 - ${2 * a * b}x + ${b * b}`)
          break
      }
      if (!context.isAmc && this.interactif) {
        setReponse(this, i, reponse)
        texte += `<br>$${lettreDepuisChiffre(i + 1)} = $` + ajouteChampTexteMathLive(this, i, 'largeur75 inline')
      }
      if (this.questionJamaisPosee(a, b, listeTypeDeQuestions[i])) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireCaseACocher = ['Écrire toutes les multiplications dans la correction']
}
