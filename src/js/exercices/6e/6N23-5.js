/* global mathalea */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texFraction, calcul, choice, texNombre2, shuffle2tableaux } from '../../modules/outils.js'
import { fraction } from '../../modules/Fractions.js'
import { gestionQcmInteractif, propositionsQcm } from '../../modules/gestionQcm.js'

export const amcReady = true

export const titre = 'Sens de l’écriture fractionnaire'

/**
 * Donner la fraction correspondant à un nombre ou à un calcul
 * @Auteur Jean-Claude Lhote
 * Ref 6N23-5
 * Publié le 10/03/2021
 */
export default function SensDeLaFraction () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 4
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function (numeroExercice) {
    this.numeroExercice = numeroExercice
    this.qcm = ['6N23-5', [], "Sens de l'écriture fractionnaire", 1]
    let tabrep, tabicone
    this.listeQuestions = []
    this.listeCorrections = []
    const typeDeQuestionsDisponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, a, b, f, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''

      switch (listeTypeDeQuestions[i]) {
        case 1:
          a = randint(10, 25)
          b = randint(10, 25, a)
          texte = `Le quotient de $${a}$ par $${b}$ s'écrit en écriture fractionnaire : $${texFraction(
              '\\phantom{00000}',
              '\\phantom{00000}'
            )}$`
          texteCorr = `Le quotient de $${a}$ par $${b}$ s'écrit $${texFraction(a, b)}$.`
          tabrep = [`$${texFraction(a, b)}$`, `$${texFraction(b, a)}$`, `$${texFraction(Math.abs(a - b), b)}$`, `$${texFraction(a + b, b)}$`, `$${texFraction(a * 10, b)}$`]
          tabicone = [1, 0, 0, 0, 0]
          break

        case 2:
          a = randint(10, 25)
          b = randint(10, 25, a)
          texte = `Le nombre qui, multiplié par $${b}$, donne $${a}$ s'écrit en écriture fractionnaire : $${texFraction(
              '\\phantom{00000}',
              '\\phantom{00000}'
            )}$`
          texteCorr = `Le nombre qui, multiplié par $${b}$, donne $${a}$ s'écrit $${texFraction(a, b)}$.`
          tabrep = [`$${texFraction(a, b)}$`, `$${texFraction(b, a)}$`, `$${texFraction(Math.abs(a - b), b)}$`, `$${texFraction(a + b, b)}$`, `$${texFraction(a * 10, b)}$`]
          tabicone = [1, 0, 0, 0, 0]
          break

        case 3:
          a = randint(10, 25)
          b = randint(10, 25, a)
          texte = `$${a}\\div ${b}$ s'écrit en écriture fractionnaire : $${texFraction(
              '\\phantom{00000}',
              '\\phantom{00000}'
            )}$`
          texteCorr = `$${a}\\div ${b}$ s'écrit  $${texFraction(a, b)}$.`
          tabrep = [`$${texFraction(a, b)}$`, `$${texFraction(b, a)}$`, `$${texFraction(Math.abs(a - b), b)}$`, `$${texFraction(a + b, b)}$`, `$${texFraction(a * 10, b)}$`]
          tabicone = [1, 0, 0, 0, 0]
          break

        case 4:

          a = randint(1, 5) * 2 + 1
          b = choice([2, 4, 5, 10])
          a += b
          if (Number.isInteger(a / b)) {
            a++
          }
          f = fraction(a, b)

          texte = `Le nombre $${texNombre2(calcul(a / b))}$ s'écrit en écriture fractionnaire : $${texFraction(
            '\\phantom{00000}',
            '\\phantom{00000}'
          )}$`
          texteCorr = `Le nombre $${texNombre2(calcul(a / b))}$ s'écrit  $${f.fractionDecimale().texFraction}$`
          if (f.fractionDecimale().texFraction !== f.texFractionSimplifiee) {
            texteCorr += ` ou $${f.texFractionSimplifiee}$.`
          } else texte += '.'
          tabrep = [`$${f.fractionDecimale().texFraction}$`, `$${texFraction(b, a)}$`, `$${texFraction(a, b * 10)}$`, `$${texFraction(a * 10, b)}$`, `$${texFraction(Math.floor(a / b), fraction(calcul((a / b - Math.floor(a / b))) * 100, 100).fractionDecimale().num)}$`]
          tabicone = [1, 0, 0, 0, 0]
          break
      }
      shuffle2tableaux(tabrep, tabicone)
      if (this.modeQcm && !mathalea.sortieAMC) {
        texteCorr = ''
        texte = texte.replace(`$${texFraction('\\phantom{00000}', '\\phantom{00000}')}$`, '')
        this.tableauSolutionsDuQcm[i] = tabicone
        texte += '<br>' + propositionsQcm(numeroExercice, i, tabrep, tabicone).texte
        texteCorr += '<br>' + propositionsQcm(numeroExercice, i, tabrep, tabicone).texteCorr
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        this.qcm[1].push([`${texte}. \n `,
          tabrep,
          tabicone])
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
    gestionQcmInteractif(this)
  }

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
}
