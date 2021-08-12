import { combinaisonListes, listeQuestionsToContenu, randint } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'

export const titre = 'Additionner des durées'

/**
 * Additions de durées de différents :
 * * MS+MS=1hMS sans retenue sur les s
 * * MS+MS=1hMS avec retenue
 * * HM+HM avec retenue
 * * HMS+HMS avec retenue sur les min
 * * HMS+HMS avec retenues min et s
 * @author Rémi Angot
 * Référence 6D11
 */
export default function SommeDeDurees () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Compléter les égalités suivantes'
  this.sup = 1 // 2 niveaux de difficultés
  this.spacing = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let typesDeQuestions

    if (parseInt(this.sup) === 1) {
      typesDeQuestions = combinaisonListes([1, 3], this.nbQuestions)
    } else {
      typesDeQuestions = combinaisonListes(
        [1, 2, 3, 4, 5],
        this.nbQuestions
      )
    }
    for (let i = 0, h1, h2, m1, m2, s1, s2, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (typesDeQuestions[i] === 1) {
        s1 = randint(11, 39)
        s2 = randint(1, 20)
        m1 = randint(20, 59)
        m2 = randint(40, 59)
        texte = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`
        texteCorr = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}= ${m1 + m2}~\\text{min}~${s1 + s2}~\\text{s}= 1~\\text{h}~${m1 + m2 - 60}~\\text{min}~${s1 + s2}~\\text{s}$`
      }
      if (typesDeQuestions[i] === 2) {
        s1 = randint(21, 39)
        s2 = randint(40, 59)
        m1 = randint(20, 59)
        m2 = randint(40, 59)
        texte = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`
        texteCorr = `$${m1}~\\text{min}~${s1}~\\text{s}+${m2}~\\text{min}~${s2}~\\text{s}= ${m1 + m2}~\\text{min}~${s1 + s2}~\\text{s} = ${m1 + m2 + 1}~\\text{min}~${s1 + s2 - 60}~\\text{s} = 1~\\text{h}~${m1 + m2 - 60}~\\text{min}~${s1 + s2 - 60}~\\text{s}$`
      }
      if (typesDeQuestions[i] === 3) {
        h1 = randint(2, 12)
        h2 = randint(2, 11)
        m1 = randint(30, 50)
        m2 = randint(30, 50)
        texte = `$${h1}~\\text{h}~${m1}~\\text{min}+${h2}~\\text{h}~${m2}~\\text{min}=\\dotfill$`
        texteCorr = `$${h1}~\\text{h}~${m1}~\\text{min}+${h2}~\\text{h}~${m2}~\\text{min}= ${h1 + h2}~\\text{h}~${m1 + m2}~\\text{min} = ${h1 + h2 + 1}~\\text{h}~${m1 + m2 - 60}~\\text{min}$`
      }
      if (typesDeQuestions[i] === 4) {
        h1 = randint(2, 12)
        h2 = randint(2, 11)
        m1 = randint(30, 50)
        m2 = randint(30, 50)
        s1 = randint(2, 55)
        s2 = randint(1, 60 - s1 - 1)
        texte = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`
        texteCorr = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}= ${h1 + h2}~\\text{h}~${m1 + m2}~\\text{min}~${s1 + s2}~\\text{s} = ${h1 + h2 + 1}~\\text{h}~${m1 + m2 - 60}~\\text{min}~${s1 + s2}~\\text{s}$`
      }
      if (typesDeQuestions[i] === 5) {
        h1 = randint(2, 12)
        h2 = randint(2, 11)
        m1 = randint(30, 50)
        m2 = randint(30, 50)
        s1 = randint(2, 55)
        s2 = randint(60 - s1, 59)
        texte = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=\\dotfill$`
        texteCorr = `$${h1}~\\text{h}~${m1}~\\text{min}~${s1}~\\text{s}+${h2}~\\text{h}~${m2}~\\text{min}~${s2}~\\text{s}=`
        texteCorr += ` ${h1 + h2}~\\text{h}~${m1 + m2}~\\text{min}~${s1 + s2}~\\text{s} = ${h1 + h2}~\\text{h}~${m1 + m2 + 1}~\\text{min}~${s1 + s2 - 60}~\\text{s} =${h1 + h2 + 1}~\\text{h}~${m1 + m2 + 1 - 60}~\\text{min}~${s1 + s2 - 60}~\\text{s}$`
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.isDiaporama) {
          texte = texte.replace('=\\dotfill', '')
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2] // "1 : Additions simples\n2 : Additions avec d'��ventuelles conversions"]
}
