import Exercice from '../../Exercice.js'
import { calcul, choice, texNombrec, randint, texNombre, texFractionReduite, texteEnCouleur } from '../../../modules/outils.js'
export const titre = 'Déterminer (ou calculer avec) un pourcentage de proportion'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function PoucentageP2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur25 inline'
  this.nouvelleVersion = function () {
    const listeCarac = [['filles', 'Elles'], ['garçons', 'Ils'], ['sportifs', 'Ils'], ['musiciens', 'Ils']]
    const listeCarac2 = [['maisons', 'T2'], ['maisons', 'T3'], ['appartements', 'T2'], ['appartements', 'T3']
    ]
    let a, b, c, n, d, carac, carac2
    switch (choice(['a', 'b'])) { //, 'b'
      case 'a':
        if (choice([true, false])) {
          a = choice([20, 40])
          b = choice([4, 8, 16])
          carac = choice(listeCarac)
          n = carac[0]
          d = carac[1]
          this.question = ` Dans un groupe de $${a}$ enfants, $${b}$  sont des ${n}.<br>
      ${d} représentent ..... % du groupe.`
          this.optionsChampTexte = { texteApres: '%' }
          this.correction = `La proportion de ${n} est donnée par $\\dfrac{${b}}{${a}}=${texFractionReduite(b, a)}=${texNombrec(b / a)}$, soit $${texNombrec((b / a) * 100)}$%.`
          this.reponse = calcul((b / a) * 100)
        } else {
          a = choice([30, 60])
          b = choice([6, 12, 18, 24])
          carac = choice(listeCarac)
          n = carac[0]
          d = carac[1]
          this.question = ` Dans un groupe de $${a}$ enfants, $${b}$  sont des ${n}.<br>
          ${d} représentent ..... % du groupe.`
          this.optionsChampTexte = { texteApres: '%' }
          this.correction = `La proportion de ${n} est donnée par $\\dfrac{${b}}{${a}}=${texFractionReduite(b, a)}=${texNombrec(b / a)}$, soit $${texNombrec((b / a) * 100)}$%.`
          this.reponse = calcul((b / a) * 100)
        }
        break
      case 'b':
        a = calcul(randint(1, 5) * 1000)
        b = calcul(randint(1, 8) * 10)
        c = calcul(randint(1, 8) * 10)
        carac2 = choice(listeCarac2)
        n = carac2[0]
        d = carac2[1]
        this.question = `Une ville compte $${texNombre(a)}$ logements. Parmi ces logements, $${b}$ %  sont des ${n} et $${c}$ % de ceux-ci sont des ${d}.<br>
        Quel est le nombre de ${d} dans cette ville ?`
        this.optionsChampTexte = { texteApres: '' }
        this.correction = `Les ${n}  représentent $${b}$ %  des logements.<br>
        Il y en a donc : $${texNombrec(b / 100)}\\times ${texNombre(a)}=${texNombrec(b * a / 100)}$.<br>
        Dans cette ville, il y a  $${texNombrec(b * a / 100)}$ ${n}.<br>
        Parmi ces ${n}, il y a $${c}$ % de ${d}.<br>
        $${c}$ % de $${texNombrec(b * a / 100)}=${texNombrec(c / 100)}\\times ${b * a / 100}=${texNombrec(c * b * a / 10000)}$.<br>
        Il y a donc $${texNombrec(c * b * a / 10000)}$ ${n} de type ${d} dans cette ville.
        `
        this.correction += texteEnCouleur(`
        <br> Mentalement : <br>
                Prendre $10$ % d'une quantité revient à la diviser par $10$. <br>
       Pour calculer $20$ %, $30$ %, $40$ %, .... d'une quantité, on 
       commence par calculer  $10$ % de cette quantité en la divisant par $10$, puis on multiplie 
       par $2$ ce résultat si on veut en calculer $20$ %, par $3$ si on veut en calculer $30$ %, ....<br>
                           `)
        this.reponse = calcul(c * b * a / 10000)
        break
    }
  }
}
