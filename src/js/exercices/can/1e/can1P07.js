import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texNombre, tableauColonneLigne } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Déterminer une probabilté dans un tableau d’effectifs'
export const dateDePublication = '06/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora

*/
export const uuid = '1b057'
export const ref = 'can1P07'
export default function CalculProbaTableauEff () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions = 1
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, reponse, tableau, choix, F, V, T, FinterV, texte, texteCorr; i < this.nbQuestions && cpt < 50;) {
      // On choisit les probas de l'arbre
      F = randint(27, 80)
      V = randint(41, 70)
      FinterV = randint(5, 20)
      T = randint(160, 180)
      choix = choice([true, false])
      tableau = tableauColonneLigne(['', 'F', '\\overline{F}', '\\text{Total}'],
        ['V', '\\overline{V}', '\\text{Total}'],
        [`${texNombre(FinterV, 2)}`, `${texNombre(V - FinterV, 2)}`, `${texNombre(V, 2)}`, `${texNombre(F - FinterV)}`, `${texNombre(T - F - V + FinterV)}`, `${texNombre(T - V)}`, `${texNombre(F)}`, `${texNombre(T - F)}`, `${texNombre(T)}`])
      texte = `Dans ce tableau, on note  :<br> 

      $F$ : « La personne est une fille » et $V$ : « La personne a plus de $20$ ans ».<br>

      On choisit une personne au hasard.<br>
      
      `
      switch (choice([1, 2, 3, 4, 5, 6, 7, 8])) { //
        case 1:// p(F)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P(F)=$ '
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Déterminer $P(F)$. `
            }
          } else {
            if (this.interactif) {
              texte += '<br>Quelle est la probabilté de choisir une fille ?'
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Quelle est la probabilté de choisir une fille ?<br>`
            }
          }
          texteCorr = ` $P(F)=\\dfrac{\\text{Nombre de filles}}{\\text{Nombre  de personnes au total}}=\\dfrac{${texNombre(F)}}{${texNombre(T)}}$ 
      `
          reponse = new FractionX(F, T)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 2:// p(FinterV)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P(F\\cap V)=$ '
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Déterminer $P(F\\cap V)$. `
            }
          } else {
            if (this.interactif) {
              texte += '<br>Quelle est la probabilté de choisir une fille qui a plus de $20$ ans ?'
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Quelle est la probabilté de choisir une fille qui a plus de $20$ ans ?<br>`
            }
          }
          texteCorr = ` La probabilté est donnée par : <br>
          $P(F\\cap V)=\\dfrac{\\text{Nombre de filles de plus de 20 ans}}{\\text{Nombre  de personnes au total}}=\\dfrac{${texNombre(F)}}{${texNombre(T)}}$ 
      `
          reponse = new FractionX(FinterV, T)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 3:// p_V(F)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P_V(F)=$ '
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Déterminer $P_V(F)$. `
            }
          } else {
            texte += `${choix
            ? `<br>
            
            Quelle est la probabilté de choisir une fille sachant qu’elle a plus de $20$ ans ?`
          : `<br>
          
          La personne choisie a plus de $20$ ans. Quelle est la probabilté que ce soit une fille ?`}`
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          }
          texteCorr = `La probabilté est donnée par : <br>
          $P_V(F)=\\dfrac{\\text{Nombre de filles de plus de 20 ans}}{\\text{Nombre  de personnes de plus de 20 ans}}=\\dfrac{${texNombre(FinterV)}}{${texNombre(V)}}$ 
      `
          reponse = new FractionX(FinterV, V)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 4:// p(FinterVbarre))
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P(F\\cap\\overline{V})=$ '
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Déterminer $P(F\\cap\\overline{V})$. `
            }
          } else {
            if (this.interactif) {
              texte += '<br>Quelle est la probabilté de choisir une fille de moins de $20$ ans ?'
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Quelle est la probabilté de choisir une fille de moins de $20$ ans ?<br>`
            }
          }
          texteCorr = `La probabilté est donnée par : <br>
          $P(F\\cap\\overline{V})=\\dfrac{\\text{Nombre de filles de moins de 20 ans}}{\\text{Nombre  total de personnes}}=\\dfrac{${texNombre(F - FinterV)}}{${texNombre(T)}}$ 
      `
          reponse = new FractionX(F - FinterV, T)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 5:// p_Vbarre(Fbarre)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P_{\\overline{V}}(\\overline{F})=$ '
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Déterminer $P_{\\overline{V}}(\\overline{F})$. `
            }
          } else {
            texte += `${choix
              ? `<br>
              
              Quelle est la probabilté de choisir un garçon sachant qu’il a moins de $20$ ans ?`
            : `<br>
            
            La personne choisie a moins de $20$ ans. Quelle est la probabilté que ce soit un garçon ?`}`
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          }
          texteCorr = `La probabilté est donnée par : <br>
          $P_{\\overline{V}}(\\overline{F})=\\dfrac{\\text{Nombre de garçons de moins de 20 ans}}{\\text{Nombre  de personnes de moins de 20 ans}}=\\dfrac{${texNombre(T - F - V + FinterV)}}{${texNombre(T - V)}}$ 
      `
          reponse = new FractionX(T - F - V + FinterV, T - V)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 6:// p_F(V)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P_{F}(V)=$ '
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `
            
            Déterminer $P_{F}(V)$. `
            }
          } else {
            texte += `${choix
                ? `<br>
                
                Quelle est la probabilté de choisir une personne de plus de $20$ ans sachant que c’est une fille ?`
              : `<br>
              
              La personne choisie est une fille. Quelle est la probabilté qu’elle ait plus de $20$ ans  ?`}`
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          }

          texteCorr = `La probabilté est donnée par : <br>
          $P_{F}(V)=\\dfrac{\\text{Nombre de filles de plus de 20 ans}}{\\text{Nombre  de filles}}=\\dfrac{${texNombre(FinterV)}}{${texNombre(F)}}$ 
      `
          reponse = new FractionX(FinterV, F)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 7:// p_Farre(V)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P_{\\overline{F}}(V)=$ '
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Déterminer $P_{\\overline{F}}(V)$. `
            }
          } else {
            texte += `${choix
                ? `<br>
                
                Quelle est la probabilté de choisir une personne de plus de $20$ ans sachant que c’est un garçon ?`
              : `<br>
              
              La personne choisie est un garçon. Quelle est la probabilté qu’il ait plus de $20$ ans  ?`}`
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          }

          texteCorr = `La probabilté est donnée par : <br>
          $P_{\\overline{F}}(V)=\\dfrac{\\text{Nombre de garçons de plus de 20 ans}}{\\text{Nombre  de garçons}}=\\dfrac{${texNombre(V - FinterV)}}{${texNombre(T - F)}}$ 
      `
          reponse = new FractionX(V - FinterV, T - F)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 8:// p(Vbarre)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P(\\overline{V})=$ '
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Déterminer $P(\\overline{V})$. `
            }
          } else {
            if (this.interactif) {
              texte += '<br>Quelle est la probabilté de choisir une personne de moins de $20$ ans ?'
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else {
              texte += `<br>
            
            Quelle est la probabilté de choisir une personne de moins de $20$ ans<br>`
            }
          }
          texteCorr = ` $P(\\overline{V})=\\dfrac{\\text{Nombre de personnes de moins de 20 ans}}{\\text{Nombre  de personnes au total}}=\\dfrac{${texNombre(T - V)}}{${texNombre(T)}}$ 
      `
          reponse = new FractionX(T - V, T)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break
      }
      if (this.questionJamaisPosee(i, F, V)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
