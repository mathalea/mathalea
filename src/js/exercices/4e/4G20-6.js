import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, arrondiVirgule, randint } from '../../modules/outils.js'
export const titre = 'Encadrer une racine carrée et en donner une valeur approchée'

/**
 * Encadrer une racine carrée et en donner une valeur approchée
 * @author Guillaume Valmont
 * Référence 4G20-6
 * Date de publication : 08/08/2021
*/
export default function CalculValeurApprocheeRacineCarree () {
  Exercice.call(this)
  this.nbQuestions = 6

  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100
  this.video = ''
  this.besoinFormulaireNumerique = ['Avec ou sans calculatrice', 3, '1 : Avec calculatrice\n2 : Sans calculatrice\n3 : L\'un ou l\'autre']
  this.sup = 3

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.sup = parseInt(this.sup)
    let listeAvecOuSansCalculatrice
    if (this.sup === 1) {
      listeAvecOuSansCalculatrice = ['avec']
    } else if (this.sup === 2) {
      listeAvecOuSansCalculatrice = ['sans']
    } else {
      listeAvecOuSansCalculatrice = ['avec', 'sans']
    }
    listeAvecOuSansCalculatrice = combinaisonListes(listeAvecOuSansCalculatrice, this.nbQuestions)
    const typeQuestionsDisponibles = ['unite', 'dixieme', 'centieme']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, type, a, reponse, pasReponse, reponseG, reponseD, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeAvecOuSansCalculatrice[i] === 'avec') {
        do {
          a = randint(1, 300)
        } while (Math.sqrt(a) === Math.floor(Math.sqrt(a))) // On fait en sorte que a ne soit pas un carré parfait
        switch (listeTypeQuestions[i]) {
          case 'unite':
            type = 'à l\'unité'
            reponse = arrondiVirgule(Math.sqrt(a), 0)
            reponseG = arrondiVirgule(Math.floor(Math.sqrt(a)), 0)
            reponseD = arrondiVirgule(Math.ceil(Math.sqrt(a)), 0)
            break
          case 'dixieme':
            type = 'au dixième'
            reponse = arrondiVirgule(Math.sqrt(a), 1)
            reponseG = arrondiVirgule(Math.floor(Math.sqrt(a) * 10) / 10, 1)
            reponseD = arrondiVirgule(Math.ceil(Math.sqrt(a) * 10) / 10, 1)
            break
          case 'centieme':
            type = 'au centième'
            reponse = arrondiVirgule(Math.sqrt(a), 2)
            reponseG = arrondiVirgule(Math.floor(Math.sqrt(a) * 100) / 100, 2)
            reponseD = arrondiVirgule(Math.ceil(Math.sqrt(a) * 100) / 100, 2)
            break
        }
        if (reponse === reponseG) pasReponse = reponseD
        else pasReponse = reponseG
        texte = `Encadrer $\\sqrt{${a}}$ ${type} près et en donner une valeur approchée ${type} près.`
        texteCorr = `$\\sqrt{${a}} \\simeq ${arrondiVirgule(Math.sqrt(a), 6)}$.<br>`
        texteCorr += `Or $${reponseG} < ${arrondiVirgule(Math.sqrt(a), 6)} < ${reponseD}$,<br>`
        texteCorr += `et $${arrondiVirgule(Math.sqrt(a), 6)}$ est plus proche de $${reponse}$ que de $${pasReponse}$.<br>`
        texteCorr += `Donc la valeur approchée ${type} près de $\\sqrt{${a}}$ est $${reponse}$.`
      } else if (listeAvecOuSansCalculatrice[i] === 'sans') {
        do {
          a = randint(1, 144)
        } while (Math.sqrt(a) === Math.floor(Math.sqrt(a))) // On fait en sorte que a ne soit pas un carré parfait
        texte = `Sans utiliser de calculatrice, encadrer $\\sqrt{${a}}$ entre deux nombres entiers.`
        reponseG = Math.floor(Math.sqrt(a))
        reponseD = Math.ceil(Math.sqrt(a))
        texteCorr = `$${reponseG}^2 = ${reponseG ** 2}$ et $${reponseD}^2 = ${reponseD ** 2}$.<br>`
        texteCorr += `Or $${reponseG ** 2} < ${a} < ${reponseD ** 2}$,<br>`
        texteCorr += `donc $\\sqrt{${reponseG ** 2}} < \\sqrt{${a}} < \\sqrt{${reponseD ** 2}}$,<br>`
        texteCorr += `enfin $${reponseG} < \\sqrt{${a}} < ${reponseD}$.`
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
