import { simplificationDeFractionAvecEtapes, texFractionReduite } from '../../../modules/outils/arrayFractions.js'
import { choice } from '../../../modules/outils/arrays.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { calcul, texNombre, texNombrec } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
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
export const dateDeModifImportante = '19/12/2021'
export const uuid = 'bd5d1'
export const ref = 'can5P02'
export default function PoucentageP2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const listeCarac = [['filles', 'Elles'], ['garçons', 'Ils'], ['sportifs', 'Ils'], ['musiciens', 'Ils']]
    const listeCarac2 = [['maisons', 'T2'], ['maisons', 'T3'], ['appartements', 'T2'], ['appartements', 'T3']
    ]
    let a, b, c, n, d, carac, carac2, choix
    switch (choice(['a', 'b', 'c', 'd'])) { //,
      case 'a':
        if (choice([true, false])) {
          a = choice([20, 40])
          b = choice([4, 8, 16])
          carac = choice(listeCarac)
          n = carac[0]
          d = carac[1]
          this.question = ` Dans un groupe de $${a}$ enfants, $${b}$  sont des ${n}.<br>
      ${d} représentent ..... $\\%$ du groupe.`
          this.optionsChampTexte = { texteApres: '%' }
          this.correction = `La proportion de ${n} est donnée par $\\dfrac{${b}}{${a}}=${texFractionReduite(b, a)}=${texNombrec(b / a)}$, soit $${texNombrec((b / a) * 100)}$ $\\%$.`
          this.reponse = calcul((b / a) * 100)
        } else {
          a = choice([30, 60])
          b = choice([6, 12, 18, 24])
          carac = choice(listeCarac)
          n = carac[0]
          d = carac[1]
          this.question = ` Dans un groupe de $${a}$ enfants, $${b}$  sont des ${n}.<br>
          ${d} représentent ..... $\\%$ du groupe.`
          this.optionsChampTexte = { texteApres: '%' }
          this.correction = `La proportion de ${n} est donnée par $\\dfrac{${b}}{${a}}=${texFractionReduite(b, a)}=${texNombrec(b / a)}$, soit $${texNombrec((b / a) * 100)}$ $\\%$.`
          this.reponse = calcul((b / a) * 100)
        }
        this.canEnonce = 'Compléter.'
        this.canReponseACompleter = this.question//
        break
      case 'b':
        a = calcul(randint(1, 5) * 1000)
        b = calcul(randint(1, 8) * 10)
        c = calcul(randint(1, 8) * 10)
        carac2 = choice(listeCarac2)
        n = carac2[0]
        d = carac2[1]
        this.question = `Une ville compte $${texNombre(a)}$ logements.<br> 
        Parmi ces logements, $${b}$ %  sont des ${n} et $${c}$ % de ceux-ci sont des ${d}.<br>

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
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = ''
        break

      case 'c':

        a = calcul(randint(1, 12) * 10)
        b = calcul(a * randint(1, 6) / 10)
        c = (b / a) * 100
        choix = choice([true, false])
        this.question = `Le prix d'un article coûtant $${a}$ euros ${choix ? 'baisse' : 'augmente'} de $${b}$ euros.<br>

          Quel est le pourcentage ${choix ? 'de réduction' : 'd’augmentation'} de ce prix ?`
        this.optionsChampTexte = { texteApres: '%' }
        this.correction = `${choix ? 'La réduction' : 'L’augmentation'} est $${b}$ euros sur un total de $${a}$ euros.<br>
          Le pourcentage  ${choix ? 'de baisse' : 'd’augmentation'} est donné par le quotient : $\\dfrac{${b}}{${a}}${simplificationDeFractionAvecEtapes(b, a)}=${texNombrec(b / a)}= ${texNombrec((b / a) * 100)}\\%$.
          `
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Calculez $10 \\%$ du prix. <br>${choix ? 'La réduction' : 'L’augmentation'} est un multiple de $10 \\%$.
             `)
        this.reponse = c
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = '$\\ldots$ $\\%$'
        break
      case 'd':

        a = choice([20, 25, 10, 50])
        b = randint(10, 30)
        choix = choice([true, false])
        this.question = ` Une ${choix ? ' réduction' : 'augmentation'} de $${a}~\\%$  d'un article entraîne une ${choix ? 'réduction' : 'augmentation'} du prix de $${b}$ €.<br>

          Quel était le prix de cet article avant ${choix ? '  la réduction' : 'l’augmentation'} ?  `
        this.optionsChampTexte = { texteApres: '€' }
        if (a === 25) {
          this.correction = ` $25~\\%$ du prix représente $${b}$ €, donc $100~\\%$ du prix représente $4$ fois plus que $${b}$ € (car $4\\times 25=100$).<br>
        Le prix de l'article était  donc : $4\\times${b}=${4 * b}$ €. `
        }
        if (a === 20) {
          this.correction = ` $20~\\%$ du prix représente $${b}$ €, donc $100~\\%$ du prix représente $5$ fois plus que $${b}$ € (car $5\\times 20=100$).<br>
          Le prix de l'article était donc : $5\\times${b}=${5 * b}$ €.  `
        }
        if (a === 10) {
          this.correction = ` $10~\\%$ du prix représente $${b}$ €, donc $100~\\%$ du prix représente $10$ fois plus que $${b}$ € (car $10\\times 10=100$).<br>
          Le prix de l'article était donc : $10\\times${b}=${10 * b}$ €.  `
        }
        if (a === 50) {
          this.correction = ` $50~\\%$ du prix représente $${b}$ €, donc $100~\\%$ du prix représente $2$ fois plus que $${b}$ € (car $2\\times 50=100$).<br>
           Le prix de l'article était donc : $2\\times${b}=${2 * b}$ €.  `
        }
        this.reponse = calcul(100 * b / a)
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = '$\\ldots$ €'
        break
    }
  }
}
