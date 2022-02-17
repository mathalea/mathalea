import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texFraction, texNombrec, texNombre, calcul, decimalToScientifique, combinaisonListes, texFractionReduite } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
import { round } from 'mathjs'
export const titre = 'Calculer avec des nombres en écriture scientifique'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Calculer avec des nombres en écriture scientifique
 * @author Matthieu Devillers
 * 2N31-5
 */
export default function CalculerAvecEcritureScientifique () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.correctionDetailleeDisponible = true
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
  if (!context.isHtml) {
    this.correctionDetaillee = false
  }
  this.consigne = 'Calculer, en détaillant les étapes, puis exprimer le résultat sous forme scientifique. <br>'
  this.consigne += 'En cas de besoin, on arrondira la mantisse au centième près.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 3
  this.sup = 1
  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1] // Produit
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2] // Quotient
    } else if (this.sup === 3) {
      typesDeQuestionsDisponibles = [3] // Quotient de produits
    } else { typesDeQuestionsDisponibles = [1, 2, 3] } // Mélange des cas précédents
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, reponse, cpt = 0, a = [], b = [], c = [], n, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      n = 0
      while (n < 4) {
        c[n] = randint(-30, 30, [-1, 0, 1]) // initialise les exposants entiers relatifs
        b[n] = randint(11, 99)
        a[n] = randint(101, 999) // initialise les mantises avec chiffre des dixièmes non nul
        a[n] = calcul(a[n] / 100)
        b[n] = calcul(b[n] / 10)
        n++
      }
      texteCorr = '<br>'
      texte = ''
      switch (typesDeQuestions) {
        case 1:
          texte = `$ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} $\n` // a.10^n x b.10^m = ?
          if (this.correctionDetaillee) {
            texteCorr += `$ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} = \\left ( ${texNombrec(a[0])} \\times   ${texNombrec(b[0])} \\right ) \\times \\left ( 10^{${texNombrec(c[1])}} \\times 10^{${texNombrec(c[0])}} \\right ) $ <br>`
            texteCorr += `$\\phantom{ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} } = ${texNombrec(calcul(a[0] * b[0]))} \\times 10^{${texNombrec(c[1] + c[0])}} $ <br>`
            texteCorr += `$\\phantom{ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} } = ${texNombre(decimalToScientifique(calcul(a[0] * b[0]))[0])} \\times 10^{${decimalToScientifique(calcul(a[0] * b[0]))[1]}} \\times 10^{${texNombrec(c[1] + c[0])}} $ <br>`
            texteCorr += `$\\phantom{ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} } = ${texNombre(decimalToScientifique(calcul(a[0] * b[0]))[0])} \\times 10^{${calcul(decimalToScientifique(calcul(a[0] * b[0]))[1] + c[1] + c[0])}} $ <br>`
            texteCorr += `$\\phantom{ ${texNombrec(a[0])} \\times 10^{${texNombrec(c[0])}} \\times ${texNombrec(b[0])} \\times 10^{${texNombrec(c[1])}} } \\approx ${texNombre(round(decimalToScientifique(calcul(a[0] * b[0]))[0], 2))} \\times 10^{${calcul(decimalToScientifique(calcul(a[0] * b[0]))[1] + c[1] + c[0])}} $  (avec la mantisse arrondie au centième) <br>`
          } else { texteCorr += `$ ${texNombrec(calcul(a[0] * b[0]))} \\times 10^{${texNombre(calcul(c[0] + c[1]))} = 13 $` }
          reponse = `$ ${texNombrec(a[0] * b[0])} \\times 10^{${texNombre(c[0] + c[1])}} $`
          break
        case 2:
          texte = `Texte2 ${a[0]}` // b>1
          if (this.correctionDetaillee) {
            texteCorr += 'Correction Détaillée 2'
          } else { texteCorr += 'CorrTest2' }
          reponse = 'Test 2'
          break
        case 3:
          texte = `Texte3 ${b[0]}` // b<-1
          if (this.correctionDetaillee) {
            texteCorr += 'Correction détaillée 3'
          } else { texteCorr = texte + 'CorrTest3' }
          reponse = 'test 3'
          break
      }
      texte += ajouteChampTexteMathLive(this, i)
      setReponse(this, i, reponse)
      if (this.listeQuestions.indexOf(texte) === -1) {
      // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Produit\n 2 : Quotient\n 3 : Quotient de produits\n 4 : Mélange des cas précédents']
}
