import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, shuffle2tableaux } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Lectures d\'images et d\'antécédents depuis un tableau de valeurs'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @author Rémi Angot
 * Référence 3F10
*/
export default function ImageAntecedentDepuisTableauOuFleche () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestions = 4

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const a = randint(-20, 20)
    const b = randint(-20, 20, [a])
    const c = randint(-20, 20, [a, b])
    const d = randint(-20, 20, [a, b, c])
    const e = randint(-20, 20, [a, b, c, d])
    const f = randint(-20, 20, [a, b, c, d, e])
    // a->b ; c->d ; e->d ; d->a ; f->c
    const ligneX = [a, c, e, d, f]
    const ligneY = [b, d, d, a, c]
    shuffle2tableaux(ligneX, ligneY) // mélange les 2 lignes de la même manière
    this.introduction = "Voici un tableau de valeurs d'une fonction $f$ : "
    this.introduction += '<br><br>'
    this.introduction += `$\\def\\arraystretch{1.5}\\begin{array}{|l|c|c|c|c|c|}
    \\hline
    x & ${ligneX[0]} & ${ligneX[1]} & ${ligneX[2]} & ${ligneX[3]} & ${ligneX[4]} \\\\
    \\hline
    f(x) & ${ligneY[0]} & ${ligneY[1]} & ${ligneY[2]} & ${ligneY[3]} & ${ligneY[4]} \\\\
    \\hline
    \\end{array}
    $
    `
    let texte = `Quelle est l'image de $${a}$ par la fonction $f$ ?`
    let texteCorr = `L'image de $${a}$ par la fonction $f$ est $${b}$, on note $f(${a})=${b}$.`
    setReponse(this, 0, b)
    texte += ajouteChampTexteMathLive(this, 0)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    texte = `Quelle est l'image de $${c}$ par la fonction $f$ ?`
    texteCorr = `L'image de $${c}$ par la fonction $f$ est $${d}$, on note $f(${c})=${d}$.`
    texte += ajouteChampTexteMathLive(this, 1)
    setReponse(this, 1, d)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    let texte3 = `Déterminer le(s) antécédent(s) de $${a}$ par la fonction $f$.`
    const texteCorr3 = `$${a}$ a un seul antécédent par la fonction $f$ qui est $${d}$, on note $f(${d})=${a}$.`
    setReponse(this, 2, d)
    texte3 += ajouteChampTexteMathLive(this, 2)

    let texte4 = `Déterminer le(s) antécédent(s) de $${d}$ par la fonction $f$.`
    const texteCorr4 = `$${d}$ a deux antécédents par la fonction $f$ qui sont $${c}$ et $${e}$, on note $f(${c})=f(${e})=${d}$.`
    setReponse(this, 3, [`${c};${e}`, `${e};${c}`], { formatInteractif: 'texte' })
    texte4 += ajouteChampTexteMathLive(this, 3)

    if (choice([true, false])) { // Une fois sur 2 on inverse les questions 3 et 4
      this.listeQuestions.push(texte3)
      this.listeCorrections.push(texteCorr3)
      this.listeQuestions.push(texte4)
      this.listeCorrections.push(texteCorr4)
    } else {
      this.listeQuestions.push(texte4)
      this.listeCorrections.push(texteCorr4)
      this.listeQuestions.push(texte3)
      this.listeCorrections.push(texteCorr3)
    }

    texte = `Recopier et compléter : $f(${c})=\\ldots$`
    texteCorr = `$f(${c})=${d}$`
    texte += ajouteChampTexteMathLive(this, 4)
    setReponse(this, 4, [`f(${c})=${d}`, `${d}`], { formatInteractif: 'texte' })
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    texte = `Recopier et compléter : $f(\\ldots)=${c}$`
    texteCorr = `$f(${f})=${c}$`
    texte += ajouteChampTexteMathLive(this, 5)
    setReponse(this, 5, [`f(${f})=${c}`, `${f}`], { formatInteractif: 'texte' })
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    if (this.interactif && context.isHtml) this.introduction = this.introduction + "<br><br> <em>S'il y a plusieurs réponses, séparer-les avec le point-virgule</em>.<br>"

    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
