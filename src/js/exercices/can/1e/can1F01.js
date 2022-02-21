import Exercice from '../../Exercice.js'
import { randint, reduireAxPlusB, texteCentre, ecritureAlgebrique, sp, listeQuestionsToContenuSansNumero } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Déterminer les coordonnées sommet parabole à partir de la forme canonique'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '1/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Trouver les coordonnées du sommet d'une parabole donnée par sa forme canonique.
 * @author Gilles Mora
 * Référence can1F01
*/
export default function CoordonneesSommetParabole () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'

  this.nouvelleVersion = function () {
    const a = randint(-10, 10, [0, -1, 1])
    const b = randint(-5, 5, 0)
    const c = randint(-5, 5)
    if (c === 0) {
      this.listeQuestions = [`Les coordonnées du sommet de la parabole représentant 
    la fonction $f$ définie sur $\\mathbb{R}$ 
    par $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2$ sont  :
    ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
    ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
      if (b > 0) {
        this.listeCorrections = [`On reconnaît la forme canonique d'une fonction polynôme du second degré : 
        ${texteCentre('$f(x)=a(x-\\alpha)^2+\\beta$')}Sous cette forme les coordonnées du sommet de la parabole qui représente la fonction $f$ sont : 
    $(\\alpha;\\beta)$.
    ${texteCentre(` $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2=${reduireAxPlusB(0, a)}(x-(\\underbrace{-${b}}_{\\alpha}))^2+0$`)}.
     Ainsi, $\\alpha=-${b}$ et $\\beta=${c}$ et on en déduit que les coordonnées du sommet de la parabole sont : $(-${b};${c})$.`]
      } else {
        this.listeCorrections = [`On reconnaît la forme canonique d'une fonction polynôme du second degré : 
        ${texteCentre('$f(x)=a(x-\\alpha)^2+\\beta$')} Sous cette forme les coordonnées du sommet de la parabole qui représente la fonction $f$ sont : 
  $(\\alpha;\\beta)$.
  ${texteCentre(`$f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2$`)}
     Puisque $\\alpha=${-b}$ et $\\beta=${c}$, on en déduit que les coordonnées du sommet de la parabole sont : $(${-b};${c})$.`]
      }
    } else {
      this.listeQuestions = [`Les coordonnées du sommet de la parabole représentant 
    la fonction $f$ définie sur $\\mathbb{R}$ 
    par     $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$ sont  :
    ${texteCentre(`$\\Bigg($ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(5)} ;
    ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(5)} $\\Bigg)$`)}`]
      if (b > 0) {
        this.listeCorrections = [`On reconnaît la forme canonique d'une fonction polynôme du second degré : 
        ${texteCentre('$f(x)=a(x-\\alpha)^2+\\beta$')} Sous cette forme les coordonnées du sommet de la parabole qui représente la fonction $f$ sont : 
        $(\\alpha;\\beta)$.
        ${texteCentre(`$f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}
        =${reduireAxPlusB(0, a)}(x-(\\underbrace{-${b}}_{\\alpha}))^2${ecritureAlgebrique(c)}$`)}
        Ainsi, $\\alpha=-${b}$ et $\\beta=${c}$ et on en déduit que les coordonnées du sommet de la parabole sont : $(${-b};${c})$.`]
      } else {
        this.listeCorrections = [`On reconnaît la forme canonique d'une fonction polynôme du second degré : 
        ${texteCentre('$f(x)=a(x-\\alpha)^2+\\beta$')}  Sous cette forme les coordonnées du sommet de la parabole qui représente la fonction $f$ sont : 
        $(\\alpha;\\beta)$.
        ${texteCentre(`$f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$`)}
         Puisque $\\alpha=${-b}$ et $\\beta=${c}$, on en déduit que les coordonnées du sommet de la parabole sont : $(${-b};${c})$.`]
      }
    }
    setReponse(this, 0, -b)
    setReponse(this, 1, c)
    listeQuestionsToContenuSansNumero(this)
  }
}
