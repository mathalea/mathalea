import Operation from '../../modules/operations.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre, nombreDeChiffresDansLaPartieEntiere, nombreDeChiffresDansLaPartieDecimale } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { grille, seyes } from '../../modules/2d.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
export const amcReady = true
export const amcType = 'AMCNum' // Question numérique
export const interactifType = 'mathLive'
export const interactifReady = true

export const titre = 'Effectuer additions et soustractions de nombres décimaux'
export const dateDeModifImportante = '01/04/2023'

/**
 * Additions et soustractions de nombres décimaux
 * * xxx-xx,x
 * * xxx-xx,xx
 * * xxx,x-xxx
 * * x0x-xx9,x
 * * xxx+xx,x
 * * xxx+xx,xx
 * * xxx,x+xxx
 * * x0x+xx9,x
 * @author Rémi Angot (Modifié par EE pour modifier le nb de décimales des termes)
 * Référence 6C20
 */
export const uuid = '01873'
export const ref = '6C20'
export default function AdditionnerSoustrairesDecimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Poser et effectuer les calculs suivants.'
  this.listePackages = 'xlop'
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon les opérations posées ne sont pas jolies
  this.nbQuestions = 4
  this.sup = 3
  this.sup2 = 3
  this.sup3 = 4
  this.tailleDiaporama = 3
  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestions, reponse
    const typesAdditions = combinaisonListes(
      [5, 6, 7, 8],
      this.nbQuestions
    )
    const typesSoustractions = combinaisonListes(
      [1, 2, 3, 4],
      this.nbQuestions
    )
    let listeTypeDeQuestions = []
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes([5, 6, 7, 8], this.nbQuestions)
    } else if (this.sup === 2) {
      listeTypeDeQuestions = combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    } else {
      for (let i = 0; i < this.nbQuestions; i++) {
        this.autoCorrection[i] = {}
        if (i + 1 <= this.nbQuestions / 2) {
          // première moitié sont des additions mais si c'est impair on prendra plus de soustractions
          listeTypeDeQuestions.push(typesAdditions[i])
        } else {
          listeTypeDeQuestions.push(typesSoustractions[i])
        }
      }
    }

    let grilletxt
    if (this.sup2 < 3) {
      const g = (this.sup2 < 3 ? grille(0, 0, 5, 5, 'gray', 0.7) : '')
      const carreaux = (this.sup2 === 2 ? seyes(0, 0, 5, 5) : '')
      const sc = (this.sup2 === 2 ? 0.8 : 0.5)
      const params = { xmin: 0, ymin: 0, xmax: 5, ymax: 5, pixelsParCm: 20, scale: sc }
      grilletxt = '<br>' + mathalea2d(params, g, carreaux)
    } else {
      grilletxt = ''
    }
    for (let i = 0, aleaTermes, texte, texteCorr, cpt = 0, a, b; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      aleaTermes = this.sup3 < 4 ? this.sup3 : randint(1, 3)
      switch (typesDeQuestions) {
        case 1: // xxx-xx,x ou xx,x-xx,x ou xx,x-x,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          if (aleaTermes > 1) a = calcul(a / 10)
          b = calcul(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10)
          if (aleaTermes > 2) b = calcul(b / 10)
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          texte += grilletxt
          reponse = calcul(a - b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction', style: 'display: inline-block' })
          texteCorr += Operation({ operande1: a, operande2: b, type: 'soustraction', style: 'display: inline-block', methodeParCompensation: false })
          break
        case 2: // xxx-xx,xx ou xx,xx-xx,xx ou xx,xx-x,xxx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          if (aleaTermes > 1) a = calcul((a + randint(1, 4) * 1000) / 100)
          b = calcul(
            randint(5, 9) * 10 +
            randint(6, 9) +
            randint(1, 9) / 10 +
            randint(1, 9) / 100
          )
          if (aleaTermes > 2) b = calcul(b / 10)
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          texte += grilletxt
          reponse = calcul(a - b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction', style: 'display: inline-block' })
          texteCorr += Operation({ operande1: a, operande2: b, type: 'soustraction', style: 'display: inline-block', methodeParCompensation: false })
          break
        case 3: // xxx,x-xxx ou xxx,x-xxx,x ou xxx,x-xx,xx
          a = calcul(
            randint(5, 9) * 100 +
            randint(2, 5) * 10 +
            randint(1, 9) +
            randint(1, 9) / 10
          )
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9)
          if (aleaTermes > 1) b = calcul((b + randint(1, 4) * 1000) / Math.pow(10, aleaTermes - 1))
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          texte += grilletxt
          reponse = calcul(a - b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction', style: 'display: inline-block' })
          texteCorr += Operation({ operande1: a, operande2: b, type: 'soustraction', style: 'display: inline-block', methodeParCompensation: false })
          break
        case 4: // x0x-xx9,x ou x0x,x-xx9,x ou x0x,x-x9,xx
          a = calcul(randint(5, 9) * 100 + randint(1, 5))
          if (aleaTermes > 1) a = calcul((a + randint(1, 9) / 10))
          b = calcul(randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10)
          if (aleaTermes > 2) b = calcul(randint(1, 9) * 10 + 9 + randint(1, 9) / 10 + randint(1, 9) / 100)
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          texte += grilletxt
          reponse = calcul(a - b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction', style: 'display: inline-block' })
          texteCorr += Operation({ operande1: a, operande2: b, type: 'soustraction', style: 'display: inline-block', methodeParCompensation: false })
          break
        case 5: // xxx+xx,x ou xx,x+xx,x ou xx,x+x,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          if (aleaTermes > 1) a = calcul(a / 10)
          b = calcul(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10)
          if (aleaTermes > 2) b = calcul(b / 10)
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texte += grilletxt
          reponse = calcul(a + b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition', style: 'display: inline-block' })
          break
        case 6: // xxx+xx,xx ou xx,xx+xx,xx ou xx,xx+x,xxx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          if (aleaTermes > 1) a = calcul((a + randint(1, 4) * 1000) / 100)
          b = calcul(
            randint(5, 9) * 10 +
          randint(6, 9) +
          randint(1, 9) / 10 +
          randint(1, 9) / 100
          )
          if (aleaTermes > 2) b = calcul(b / 10)
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texte += grilletxt
          reponse = calcul(a + b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition', style: 'display: inline-block' })
          break
        case 7: // xxx,x+xxx ou xxx,x+xxx,x ou xxx,x+xx,xx
          a = calcul(
            randint(5, 9) * 100 +
          randint(2, 5) * 10 +
          randint(1, 9) +
          randint(1, 9) / 10
          )
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9)
          if (aleaTermes > 1) b = calcul((b + randint(1, 4) * 1000) / Math.pow(10, aleaTermes - 1))
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texte += grilletxt
          reponse = calcul(a + b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition', style: 'display: inline-block' })
          break
        case 8: // x0x+xx9,x ou x0x,x+xx9,x ou x0x,x+x9,xx
          a = calcul(randint(5, 9) * 100 + randint(1, 5))
          if (aleaTermes > 1) a = calcul((a + randint(1, 9) / 10))
          b = calcul(randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10)
          if (aleaTermes > 2) b = calcul(randint(1, 9) * 10 + 9 + randint(1, 9) / 10 + randint(1, 9) / 100)
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texte += grilletxt
          reponse = calcul(a + b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition', style: 'display: inline-block' })
          break
      }
      setReponse(this, i, reponse)
      if (this.interactif && context.isHtml) texte += '$~=$' + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
        this.autoCorrection[i].reponse.param = { digits: nombreDeChiffresDansLaPartieEntiere(reponse) + nombreDeChiffresDansLaPartieDecimale(reponse) + 2, decimals: nombreDeChiffresDansLaPartieDecimale(reponse) + 1, signe: false, exposantNbChiffres: 0 }
      }
      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Additions de décimaux\n2 : Soustractions de décimaux\n3 : Mélange']
  this.besoinFormulaire2Numerique = [
    'Type de cahier',
    3,
    ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
  ]
  this.besoinFormulaire3Numerique = ['Type de termes', 4, '1 : Un entier et un décimal\n2 : Deux décimaux ayant même nombre de décimales\n3 : Deux décimaux n\'ayant pas le même nombre de décimales\n4 : Au hasard']
}
