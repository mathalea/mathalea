import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, ecritureParentheseSiMoins, texNombrec, texNombre, arrondi, choice, combinaisonListes, nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'

export const interactifReady = true

export const amcReady = true
export const amcType = 'AMCNum'
export const interactifType = 'numerique'
export const titre = 'Trouver le terme manquant d’une somme de nombres relatifs'

/**
 * Additions à trou dans les relatifs
 *
 *  @author Jean-Claude Lhote à partir de CM000 de Rémi Angot
 * Référence 5R10
 */
export default function TermeInconnuDeSomme () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 5
  this.sup = 1
  this.sup3 = 1
  this.sup2 = 20 // additions|additions à trous|soustractions|soustractions à trous|mélange sans trou|mélange avec trou
  this.titre = titre
  this.consigne = 'Calculer le terme manquant.'
  this.spacing = 2
  this.interactif = false
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.amcType = amcType
  this.amcReady = amcReady

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let decimal
    let inconnue
    if (parseInt(this.sup) === 1) {
      decimal = 1
    } else {
      decimal = 10
    }
    for (let i = 0, a, b, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (!context.isAmc) {
        a = arrondi(randint(4 * decimal, this.sup2 * decimal) / decimal, 1)
        b = arrondi(randint(2 * decimal, this.sup2 * decimal) / decimal, 1)
      } else {
        a = arrondi(randint(4 * decimal, 20 * decimal) / decimal, 1)
        b = arrondi(randint(2 * decimal, 20 * decimal) / decimal, 1)
      }
      if (parseInt(this.sup3) === 1) {
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

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        setReponse(this, i, b - a, { signe: true, digits: Math.max(2, nombreDeChiffresDansLaPartieEntiere(b - a)), decimals: 0 })
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Nombres entiers\n2 : Nombres décimaux']
  this.besoinFormulaire2Numerique = ['Valeur maximale', 9999]
  this.besoinFormulaire3Numerique = ["Type d'égalités", 2, '1 : Égalités à trou\n2 : Équations']
}
