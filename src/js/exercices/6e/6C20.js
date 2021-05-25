import Operation from '../../modules/operations.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre, nombreDeChiffresDansLaPartieEntiere, nombreDeChiffresDansLaPartieDecimale } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const amcReady = true
export const amcType = 4 // Question numérique
export const interactifReady = true
export const interactifType = ' '

export const titre = 'Additions et soustractions de nombres décimaux'

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
 * @author Rémi Angot
 * Référence 6C20
 */
export default function AdditionnerSoustrairesDecimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady
  this.interactifReady = interactifReady
  this.amcType = amcType
  this.consigne = 'Poser et effectuer les calculs suivants.'
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon les opérations posées ne sont pas jolies
  this.nbQuestions = 4
  this.sup = 3
  this.tailleDiaporama = 100
  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
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

    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1: // xxx-xx,x
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          b = calcul(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10)
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          reponse = calcul(a - b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break
        case 2: // xxx-xx,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          b = calcul(
            randint(5, 9) * 10 +
            randint(6, 9) +
            randint(1, 9) / 10 +
            randint(1, 9) / 100
          )
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          reponse = calcul(a - b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break
        case 3: // xxx,x-xxx
          a = calcul(
            randint(5, 9) * 100 +
            randint(2, 5) * 10 +
            randint(1, 9) +
            randint(1, 9) / 10
          )
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9)
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          reponse = calcul(a - b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break
        case 4: // x0x-xx9,x
          a = calcul(randint(5, 9) * 100 + randint(1, 5))
          b = calcul(
            randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10
          )
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          reponse = calcul(a - b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break
        case 5: // xxx+xx,x
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          b = calcul(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10)
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          reponse = calcul(a + b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break
        case 6: // xxx+xx,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          b = calcul(
            randint(5, 9) * 10 +
            randint(6, 9) +
            randint(1, 9) / 10 +
            randint(1, 9) / 100
          )
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          reponse = calcul(a + b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break
        case 7: // xxx,x+xxx
          a = calcul(
            randint(5, 9) * 100 +
            randint(2, 5) * 10 +
            randint(1, 9) +
            randint(1, 9) / 10
          )
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9)
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          reponse = calcul(a + b)

          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break
        case 8: // x0x+xx9,x
          a = calcul(randint(5, 9) * 100 + randint(1, 5))
          b = calcul(
            randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10
          )
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          reponse = calcul(a + b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break
      }
      setReponse(this, i, reponse)
      if (this.interactif && context.isHtml) texte += '$~=$' + ajouteChampTexte(this, i)
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{texte: texteCorr, statut: ''}]
        this.autoCorrection[i].reponse = { valeur: reponse, param: { digits: nombreDeChiffresDansLaPartieEntiere(reponse) + nombreDeChiffresDansLaPartieDecimale(reponse) + 2, decimals: nombreDeChiffresDansLaPartieDecimale(reponse) + 1, signe: false, exposantNbChiffres: 0 } }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        // this.qcm[1].push([texte, [texteCorr, reponse], { digits: 0, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }])
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Additions de décimaux\n2: Soustraction de décimaux\n3 : Additions et soustraction de décimaux']
}
