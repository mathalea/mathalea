import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, texPrix, texFraction, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const amcReady = true
export const titre = 'Résoudre des problèmes avec des calculs de pourcentages'

/**
 * Calculer le montant d'une réduction donnée en pourcentage d'un prix initial
 * @author Jean-Claude Lhote
 * Référence 6N33-3
 */
export const uuid = 'd67e9'
export const ref = '6N33-3'
export default function AppliquerUnPourcentage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.consigne = 'Calculer :'
  this.spacing = 2
  this.spacingCorr = 2
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const typesDeQuestionsDisponibles = [1, 2]
    const choix = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const listePourcentages = [10, 20, 30, 40, 50]
    const article = [['Un pull', 20, 40], ['Une chemise', 15, 35], ['Un pantalon', 30, 60], ['Un T-shirt', 15, 25], ['Une jupe', 20, 40]]
    const legume = [['Une aubergine', 100, 200], ['Un melon', 200, 300], ['Une tomate', 50, 100], ['Une betterave', 75, 100], ['Une carotte', 30, 50]]
    const listeIndex = [0, 1, 2, 3, 4]
    const prix = []; const pourcent = []; const masse = []
    const index = combinaisonListes(listeIndex, this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, montant, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      pourcent[i] = choice(listePourcentages)
      switch (choix[i]) {
        case 1:
          prix[i] = randint(article[index[i]][1], article[index[i]][2])
          montant = calcul((pourcent[i] * prix[i]) / 100)
          texte = `${article[index[i]][0]} coûtant $${prix[i]}$${sp()}€ bénéficie d'une réduction de $${pourcent[i]} ${sp()}${sp()}\\%$.<br>`
          texte += 'Quel est le montant en euro de cette réduction ?'
          texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ' €' })
          texteCorr = `On doit calculer $${pourcent[i]}${sp()}\\%$ de $${prix[i]}$${sp()}€ :<br>`
          texteCorr += `$${pourcent[i]}${sp()}\\%\\text{ de }${prix[i]}=${texFraction(pourcent[i], 100)}\\times${prix[i]}=(${pourcent[i]}\\times${prix[i]})\\div100=${texNombre(pourcent[i] * prix[i])}\\div100=${texNombre(montant)}$<br>`
          texteCorr += `Le montant de la réduction est de ${texPrix(montant)}${sp()}€.`
          setReponse(this, i, montant, { formatInteractif: 'calcul', digits: 5, decimals: 2, signe: false })
          break
        case 2:
          masse[i] = randint(legume[index[i]][1], article[index[i]][2])
          montant = calcul(masse[i] * pourcent[i] / 100)
          texte = `${legume[index[i]][0]} pesant $${masse[i]}$ grammes a eu une croissance de $${pourcent[i]} ${sp()}\\%$.<br>`
          texte += 'Quelle est la masse supplémentaire en grammes correspondant à cette croissance ?'
          texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ' g' })
          texteCorr = `On doit calculer $${pourcent[i]}${sp()}\\%$ de $${masse[i]}$ grammes :<br>`
          texteCorr += `$${pourcent[i]}${sp()}\\%\\text{ de }${masse[i]}=${texFraction(pourcent[i], 100)}\\times${masse[i]}=(${pourcent[i]}\\times${masse[i]})\\div100=${texNombre(pourcent[i] * masse[i])}\\div100=${texNombre(montant)}$<br>`
          texteCorr += `La masse a augmenté de $${texNombre(montant)}$ g.`
          setReponse(this, i, montant, { formatInteractif: 'calcul', digits: 4, decimals: 2, signe: false })
          break
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
