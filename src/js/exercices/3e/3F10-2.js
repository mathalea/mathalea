import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, rangeMinMax, ecritureAlgebrique, choice, calcul, texNombre, miseEnEvidence, sp } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const titre = 'Calculs d’images fonctions'

/**
* Répndre à des questions sur les fonctions.
*
* @author Jean-Claude Lhote
* 3F10-1
*/
export default function VocabulaireNotationsFonctions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 2
  this.consigne = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.spacing = 2
  this.nbQuestions = 3
  this.nbQuestionsModifiable = true
  this.interactif = true

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    switch (this.sup) {
      case 1:
        typesDeQuestionsDisponibles = ['linéaire']
        break
      case 2:
        typesDeQuestionsDisponibles = ['affine']
        break
      case 3:
        typesDeQuestionsDisponibles = ['polynome']
        break
      case 4:
        typesDeQuestionsDisponibles = ['fraction']
        break
      case 5:
        typesDeQuestionsDisponibles = ['linéaire', 'affine', 'polynome', 'fraction']
        break
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const sousChoix = combinaisonListes(rangeMinMax(0, 4), this.nbQuestions) // pour choisir aléatoirement des questions dans chaque catégorie
    for (let i = 0, texte, texteCorr, x, y, m, n, enonce, reponses = [], tagImage, ant, img, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on ne choisit que des nombres compris entre 1 et 20
      x = randint(-9, 9, [0, 1, -1])
      y = randint(-9, 9, x)
      m = randint(0, 2) + 2
      n = choice([2, 4, 5])
      tagImage = true
      switch (listeTypeDeQuestions[i]) {
        case 'linéaire':
          switch (sousChoix[i]) {
            case 0:
              enonce = `Soit $f$ la fonction qui à $x$ associe $${m}x$. ${sp(5)} Quel est l'antécédent de $${m * x}$ ?<br><br>`
              reponses[i] = x
              img = m * x
              tagImage = false
              break
            case 1:
              enonce = `Soit $f: x \\longmapsto ${m}x$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = m * x
              ant = x
              break
            case 2:
              enonce = `Soit $f$ la fonction définie par $f(x)=\\dfrac{${m}}{${n}}x$. ${sp(5)} Quelle est l'image de $${n * x}$ ?<br><br>`
              ant = n * x
              reponses[i] = m * x
              break
            case 3:
              enonce = `Soit $f$ la fonction telle que $f(x)=\\dfrac{${m}}{${n}}x$. ${sp(5)} Quel est l'antécédent de $${m * x}$ ?<br><br>`
              img = m * x
              reponses[i] = n * x
              tagImage = false
              break
            case 4:
              enonce = `Soit $f: x \\longmapsto ${-m}x$. ${sp(5)} Quel est l'antécédent de $${m * x}$ ?<br><br>`
              img = m * x
              reponses[i] = -x
              tagImage = false
              break
          }
          break
        case 'affine':
          switch (sousChoix[i]) {
            case 0:
              enonce = `Soit $f$ la fonction qui à $x$ associe $${m}x+${n}$. ${sp(5)} Quel est l'antécédent de $${m * x + n}$ ?<br><br>`
              img = m * x + n
              reponses[i] = x
              tagImage = false
              break
            case 1:
              enonce = `Soit $f: x \\longmapsto ${m}x+${n}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              ant = x
              reponses[i] = m * x + n
              break
            case 2:
              enonce = `Soit $f$ la fonction définie par $f(x)=\\dfrac{${m}}{${n}}x${ecritureAlgebrique(y)}$. ${sp(5)} Quelle est l'image de $${n * x}$ ?<br><br>`
              ant = n * x
              reponses[i] = m * x + y
              break
            case 3:
              enonce = `Soit $f$ la fonction telle que $f(x)=\\dfrac{${m}}{${n}}x${ecritureAlgebrique(y)}$. ${sp(5)} Quel est l'antécédent de $${m * x - y}$ ?<br><br>`
              img = m * x - y
              reponses[i] = n * x
              tagImage = false
              break
            case 4:
              enonce = `Soit $f: x \\longmapsto ${-m}x${ecritureAlgebrique(y)}$. ${sp(5)} Quel est l'antécédent de $${m * x + y}$ ?<br><br>`
              img = m * x + y
              reponses[i] = -x
              tagImage = false
              break
          }
          break
        case 'polynome':
          ant = x
          switch (sousChoix[i]) {
            case 0:
              enonce = `Soit $f: x \\longmapsto x^2+${m}x+${n}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = x ** 2 + m * x + n
              break

            case 1:
              enonce = `Soit $f(x)=x^2-${m}x+${n}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = x ** 2 - m * x + n
              break

            case 2:
              enonce = `Soit $f$ la fonction qui à $x$ associe $${m}x^2+${n}x$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = m * x ** 2 + n * x
              break
            case 3:
              enonce = `Soit $f: x \\longmapsto ${m}x^2+${n}x${ecritureAlgebrique(y)}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = m * x ** 2 + n * x + y
              break
            case 4:
              enonce = `Soit $f(x)=${m}x^2-${n}x${ecritureAlgebrique(-y)}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = m * x ** 2 - n * x - y
              break
          }
          break
        case 'fraction':
          ant = x
          switch (sousChoix[i] % 4) {
            case 0:
              m = n - x
              enonce = `Soit $f$ la fonction qui à $x$ associe $\\dfrac{x}{x${ecritureAlgebrique(m)}}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = calcul(x / n)
              break
            case 1:
              m = n - x
              enonce = `Soit $f$ telle que $f(x)=\\dfrac{${m}x}{x${ecritureAlgebrique(m)}}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = calcul(m * x / (x + m))
              break
            case 2:
              m = n - x
              enonce = `Soit $f$ telle que $f(x)=\\dfrac{${m}x^2+${n}x}{x^2${ecritureAlgebrique(m)}x}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = calcul((m * x ** 2 + n * x) / (x ** 2 + m * x))
              break
            case 3:
              m = x - n
              enonce = `Soit $f: x \\longmapsto \\dfrac{x${ecritureAlgebrique(-m)}}{x^2${ecritureAlgebrique(-2 * m)}x+${m * m}}$. ${sp(5)} Quelle est l'image de $${x}$ ?<br><br>`
              reponses[i] = calcul(1 / n)
              break
          }
          break
      }

      if (this.interactif) {
        if (tagImage) {
          texte = enonce + ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: `$f(${ant})=$` })
        } else {
          texte = enonce + ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: '$f($', texteApres: `$)=${img}$` })
        }
        if (tagImage) {
          texteCorr = `$f(${miseEnEvidence(ant)})=${texNombre(reponses[i])}$`
        } else {
          texteCorr = `$f(${reponses[i]})=${miseEnEvidence(img)}$`
        }
      }

      setReponse(this, i, reponses[i])
      if (this.questionJamaisPosee(i, listeTypeDeQuestions[i], x, y, sousChoix[i])) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Choix des questions',
    5,
    '1 : Fonction linéaire\n2 : Fonction affine \n3 : Polynome de degré 2 \n4 : Fonction rationnelle \n5 : Mélange de tout '
  ]
}
