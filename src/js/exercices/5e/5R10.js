import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { calcul, listeQuestionsToContenu, randint, ecritureParentheseSiMoins, texNombrec, texNombre, arrondi, choice, combinaisonListes } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'

export const interactifReady = true
export const interactifType = ''
export const amcReady = true
export const amcType = 4
export const titre = 'Trouver le terme manquant d’une somme de nombres relatifs'

/**
 * Additions à trou dans les relatifs
 *
 *  @author Jean-Claude Lhote à partir de CM000 de Rémi Angot
 * Référence 5R10
 */
export default function Terme_inconnu_de_somme () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 5
  this.sup = 1
  this.sup3 = 1
  this.sup2 = 20 // additions|additions à trous|soustractions|soustractions à trous|mélange sans trou|mélange avec trou
  this.titre = titre
  this.consigne = 'Calcule le terme manquant'
  this.spacing = 2
  this.interactif = false
  this.interactifReady = interactifReady
  this.amcType = amcType
  this.amcReady = amcReady

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let decimal
    let inconnue
    if (this.sup == 1) {
      decimal = 1
    } else {
      decimal = 10
    }
    for (let i = 0, a, b, texte, texteCorr, cpt = 0; i < this.nbQuestions;) {
      if (!context.isAmc) {
        a = arrondi(randint(4 * decimal, this.sup2 * decimal) / decimal, 1)
        b = arrondi(randint(2 * decimal, this.sup2 * decimal) / decimal, 1)
      } else {
        a = arrondi(randint(4 * decimal, 20 * decimal) / decimal, 1)
        b = arrondi(randint(2 * decimal, 20 * decimal) / decimal, 1)
      }
      if (this.sup3 == 1) {
        inconnue = ' \\ldots\\ldots '
      } else {
        inconnue = ` ${choice(['x', 'y', 'z', 'a', 't', 'n'])} `
      }
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `$${texNombre(a)} + ${inconnue} = ${texNombre(b)}$`
          if (this.interactif && !context.isAmc) {
            texte = `$${texNombre(a)} + $${ajouteChampTexte(this, i, { texte: '' })}$ = ${texNombre(b)}$`
          }
          texteCorr = `$${texNombre(a)} + ${ecritureParentheseSiMoins(texNombrec(b - a))} = ${texNombre(b)}$`
          texteCorr += `. En effet : $${texNombre(b)}-${texNombre(a)}=${texNombrec(b - a)}$`

          break

        case 2:
          texte = `$${inconnue} + ${texNombre(a)}  = ${texNombre(b)}$`
          if (this.interactif && !context.isAmc) {
            texte = `${ajouteChampTexte(this, i, { texte: '' })}$ + ${texNombre(a)} = ${texNombre(b)}$`
          }
          texteCorr = `$${ecritureParentheseSiMoins(texNombrec(b - a))} + ${texNombre(a)} = ${texNombre(b)}$`
          texteCorr += `. En effet : $${texNombre(b)}-${texNombre(a)}=${texNombrec(b - a)}$`
          break

        case 3:
          texte = `$${texNombre(b)} = ${inconnue} + ${texNombre(a)} $`
          if (this.interactif && !context.isAmc) {
            texte = `$${texNombre(b)} = $${ajouteChampTexte(this, i, { texte: '' })}$ + ${texNombre(a)}$`
          }
          texteCorr = `$${texNombre(b)}=${ecritureParentheseSiMoins(texNombrec(b - a))} + ${texNombre(a)}$`
          texteCorr += `. En effet : $${texNombre(b)}-${texNombre(a)}=${texNombrec(b - a)}$`
          break

        case 4:
          texte = `$${texNombre(b)} = ${texNombre(a)} + ${inconnue}$`
          if (this.interactif && !context.isAmc) {
            texte = `$ ${texNombre(b)} = ${texNombre(a)} + $${ajouteChampTexte(this, i, { texte: '' })}`
          }
          texteCorr = `$${texNombre(b)}=${texNombre(a)} + ${ecritureParentheseSiMoins(texNombrec(b - a))}$`
          texteCorr += `. En effet : $${texNombre(b)}-${texNombre(a)}=${texNombrec(b - a)}$`
          break
      }

      if (context.isDiaporama) {
        texte = texte.replace('= \\dotfill', '')
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        setReponse(this, i, b - a, { signe: true })
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Nombres entiers\n2 : Nombres décimaux']
  this.besoinFormulaire2Numerique = ['Valeur maximale', 9999]
  this.besoinFormulaire3Numerique = ["Type d'égalité", 2, '1 : Égalité à trou\n2 : Équation']
}
