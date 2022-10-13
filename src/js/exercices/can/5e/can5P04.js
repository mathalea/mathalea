import { choice } from '../../../modules/outils/arrays.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { calcul, texNombrec } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer avec une proportion'
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
export const uuid = 'eb6bc'
export const ref = 'can5P04'
export default function PoucentageP1 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let b, caractere

    switch (choice(['a', 'b', 'c', 'd', 'e', 'f'])) {
      case 'a':
        b = randint(3, 7) * 5
        caractere = choice(['des lunettes', 'un frère', 'un chien', 'un abonnement à une revue', 'une licence à l’UNSS', 'un sac à roulette'])
        this.question = `$\\dfrac{1}{5}$ des élèves d'une classe de $${b}$ élèves a ${caractere}.<br>
        
              Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `On calcule d'abord $\\dfrac{1}{5}$ de $${b}$ .<br>
        $\\dfrac{1}{5}\\times ${b}=\\dfrac{${b}}{5}=${texNombrec(b / 5)}$.<br>
        $${texNombrec(b / 5)}$ élèves ont ${caractere} .<br>
          Le nombre d'élèves  n'en ayant pas est donc donné par : $${b}-${texNombrec(b / 5)}=${texNombrec(b - b / 5)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Pour calculer $\\dfrac{1}{5}$ d'une quantité, on la divise par $5$. <br>
          Ainsi, $\\dfrac{1}{5}\\times ${b}=${b}\\div 5=${b / 5}$.`)
        this.reponse = calcul(4 * b / 5)
        break
      case 'b':
        b = randint(3, 6) * 6
        caractere = choice(['des lunettes', 'un frère', ' un chien', 'un abonnement à une revue', 'une licence à l’UNSS', 'un sac à roulette'])
        this.question = `$\\dfrac{1}{6}$ des élèves d'une classe de $${b}$ élèves a ${caractere}.<br>

            Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `On calcule d'abord $\\dfrac{1}{6}$ de $${b}$ .<br>
        $\\dfrac{1}{6}\\times ${b}=\\dfrac{${b}}{6}=${texNombrec(b / 6)}$.<br>
        $${texNombrec(b / 6)}$ élèves ont ${caractere} .<br>
          Le nombre d'élèves  n'en ayant pas est donc donné par : $${b}-${texNombrec(b / 6)}=${texNombrec(b - b / 6)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Pour calculer $\\dfrac{1}{6}$ d'une quantité, on la divise par $6$. <br>
          Ainsi, $\\dfrac{1}{6}\\times ${b}=${b}\\div 6=${b / 6}$.`)
        this.reponse = calcul(5 * b / 6)
        break
      case 'c':
        b = randint(2, 5) * 7
        caractere = choice(['des lunettes', 'un frère', 'un chien', 'un abonnement à une revue', 'une licence à l’UNSS', 'un sac à roulette'])
        this.question = `$\\dfrac{1}{7}$ d'une classe de $${b}$ élèves a ${caractere}.<br>

        Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `On calcule d'abord $\\dfrac{1}{7}$ de $${b}$ .<br>
        $\\dfrac{1}{7}\\times ${b}=\\dfrac{${b}}{7}=${texNombrec(b / 7)}$.<br>
        $${texNombrec(b / 7)}$ élèves ont ${caractere} .<br>
          Le nombre d'élèves  n'en ayant pas est donc donné par : $${b}-${texNombrec(b / 7)}=${texNombrec(b - b / 7)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Pour calculer $\\dfrac{1}{7}$ d'une quantité, on la divise par $7$. <br>
          Ainsi, $\\dfrac{1}{7}\\times ${b}=${b}\\div 7=${b / 7}$.`)
        this.reponse = calcul(6 * b / 7)
        break
      case 'd':
        b = randint(3, 9) * 4
        caractere = choice(['des lunettes', 'un frère', 'un chien', 'un abonnement à une revue', 'une licence à l’UNSS', 'un sac à roulette'])
        this.question = `$\\dfrac{1}{4}$ d'une classe de $${b}$ élèves a ${caractere}.<br>

            Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `On calcule d'abord $\\dfrac{1}{4}$ de $${b}$ .<br>
            $\\dfrac{1}{4}\\times ${b}=\\dfrac{${b}}{4}=${texNombrec(b / 4)}$.<br>
            $${texNombrec(b / 4)}$ élèves ont ${caractere} .<br>
              Le nombre d'élèves  n'en ayant pas est donc donné par : $${b}-${texNombrec(b / 4)}=${texNombrec(b - b / 4)}$`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
              Pour calculer $\\dfrac{1}{4}$ d'une quantité, on la divise par $4$. <br>
              Ainsi, $\\dfrac{1}{4}\\times ${b}=${b}\\div 4=${b / 4}$.`)
        this.reponse = calcul(3 * b / 4)
        break
      case 'e':
        b = randint(3, 7) * 5
        caractere = choice(['des lunettes', 'un frère', 'un chien', 'un abonnement à une revue', 'une licence à l’UNSS', 'un sac à roulette'])
        this.question = `$20 \\%$  des élèves d'une classe de $${b}$ élèves ont ${caractere}.<br>
              Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `On calcule d'abord $20 \\%$  de $${b}$ .<br>
             Prendre $20 \\%$  d'une quantité revient à en prendre le cinquième, c'est-à-dire à la diviser par $5$.<br>
              $20\\%$  de $${b}$ est égal à $\\dfrac{${b}}{5}=${texNombrec(b / 5)}$.<br>
                            $${texNombrec(b / 5)}$ élèves ont ${caractere} .<br>
                Le nombre d'élèves  n'en ayant pas est donc donné par : $${b}-${texNombrec(b / 5)}=${texNombrec(b - b / 5)}$`
        this.reponse = calcul(8 * b / 10)
        break
      case 'f':
        b = randint(3, 9) * 4
        caractere = choice(['des lunettes', 'un frère', 'un chien', 'un abonnement à une revue', 'une licence à l’UNSS', 'un sac à roulette'])
        this.question = `$25\\%$  des élèves d'une classe de $${b}$ élèves ont ${caractere}.<br>

                  Quel est le nombre d'élèves n'en ayant pas ?`
        this.correction = `On calcule d'abord $25 \\%$  de $${b}$ .<br>
                  Prendre $25 \\%$  d'une quantité revient à en prendre le quart, c'est-à-dire à la diviser par $4$.<br>
                   $25 \\%$  de $${b}$ est égal à $\\dfrac{${b}}{4}=${texNombrec(b / 4)}$.<br>
                                 $${texNombrec(b / 4)}$ élèves ont ${caractere} .<br>
                     Le nombre d'élèves  n'en ayant pas est donc donné par : $${b}-${texNombrec(b / 4)}=${texNombrec(b - b / 4)}$`
        this.reponse = calcul(b - 0.25 * b)
        break
    }
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
