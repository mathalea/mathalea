import Exercice from '../Exercice.js'
import { randint } from '../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { calcul } from '../../modules/outils/texNombres.js'
export const titre = 'Parenthèses manquantes'

/**
 * Priorités opératoires, placer les parenthèses.
 * @author Cédric Grolleau
 * Référence 6C33-1
 */
export default function Priorites () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Si besoin, ajoute des parenthèses pour rendre l'égalité correcte. <br> S'il y a plusieurs fois la même égalité trouve des solutions différentes."
  this.nbQuestions = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 3
  this.spacingCorr = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte; let texteCorr; let a; let b; let c; let d; let i; let e
    let m; let n; let f; let l; let g; let k; let p; let prevchoice; let choice; let cpt = 0 //
    texte = ''
    texteCorr = ''
    for (i = 0; i < this.nbQuestions && cpt < 50;) {
      e = randint(1, 3)
      m = randint(1, 3)
      n = randint(1, 6)
      f = randint(1, 4)
      l = randint(1, 4)
      g = randint(2, 3)
      k = calcul(f * e)
      c = calcul(m * e)
      a = calcul(n * c)
      b = calcul(k * c)
      d = calcul(c * e * l)
      prevchoice = []
      texte = ''
      texteCorr = ''
      for (p = 0; p < 3; p++) {
        choice = randint(0, 6, prevchoice)
        prevchoice.push(choice)
        switch (choice) {
          case 0:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + b / c + (d / e + f) * g)} $ <br> `
            texteCorr += `$${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + b / c + (d / e + f) * g)} $<br>`
            break
          case 1:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a + b) / c + d / e + f * g)}  $<br>`
            texteCorr += `$ (${a} + ${b}) \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a + b) / c + d / e + f * g)} $<br>`
            break
          case 2:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a + b / c + d / e + f) * g)} $<br>`
            texteCorr += `$ ( ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} ) \\times ${g} = ${calcul((a + b / c + d / e + f) * g)} $<br>`
            break
          case 3:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a + b / c + d) / e + f * g)} $<br>`
            texteCorr += `$ (${a} + ${b} \\div ${c} + ${d}) \\div ${e} + ${f} \\times ${g} = ${calcul((a + b / c + d) / e + f * g)} $<br>`
            break
          case 4:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(((a + b) / c + d / e + f) * g)} $<br>`
            texteCorr += `$ ((${a} + ${b}) \\div ${c} + ${d} \\div ${e} + ${f}) \\times ${g} = ${calcul(((a + b) / c + d / e + f) * g)} $<br>`
            break
          case 5:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + (b / c + d) / e + f * g)} $<br>`
            texteCorr += `$ ${a} + ( ${b} \\div ${c} + ${d} ) \\div ${e} + ${f} \\times ${g} = ${calcul(a + (b / c + d) / e + f * g)} $<br>`
            break
          case 6:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + b / c + d / e + f * g)} $ <br> `
            texteCorr += `$${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + b / c + d / e + f * g)} $<br>`
            break
        }
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
