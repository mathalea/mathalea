import Exercice from '../../Exercice.js'
import { randint, calcul, choice, texNombrec, texNombre } from '../../../modules/outils.js'
export const titre = 'Pourcentage (évolution)'
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
export default function PoucentageE () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur11 inline'
  this.nouvelleVersion = function () {
    let a, b, n
    switch (choice(['a', 'b', 'c', 'd', 'e'])) { //,
      case 'a':
        a = calcul(randint(4, 13) * 5)
        n = choice(['pull', 'pantalon', 'tee-shirt', 'vêtement', 'blouson', 'sweat'])
        b = choice([10, 20])
        this.question = `Le prix d'un ${n} est $${a}$ €. Il baisse de $${b}$ %. <br>
        Quel est son nouveau prix ? `
        this.optionsChampTexte = { texteApres: '€' }
        this.correction = `On calcule d'abord le montant de la réduction. <br>
        Pour cela on calcule $${b}$ % de $${a}$ soit $${texNombrec(b / 100)}\\times ${a}=${texNombrec(b * a / 100)}$.<br>
         La réduction est donc de : $${texNombrec(b * a / 100)}$ €.<br>
         Le nouveau prix est :   $${a}-${texNombrec(b * a / 100)}= ${texNombrec(a - (b * a) / 100)} €.$`
        this.reponse = calcul(a - (b * a) / 100)
        break
      case 'b':
        a = calcul(randint(2, 6) * 10)
        n = choice(['pull', 'pantalon', 'tee-shirt', 'vêtement', 'blouson', 'sweat'])
        b = choice([5, 15])
        this.question = `Le prix d'un ${n} est $${a}$ €. Il baisse de $${b}$ %. <br>
        Quel est son nouveau prix ? `
        this.optionsChampTexte = { texteApres: '€' }
        this.correction = `On calcule d'abord le montant de la réduction. <br>
        Pour cela on calcule $${b}$ % de $${a}$ soit $${texNombrec(b / 100)}\\times ${a}=${texNombrec(b * a / 100)}$.<br>
         La réduction est donc de : $${texNombrec(b * a / 100)}$ €.<br>
         Le nouveau prix est :   $${a}-${texNombrec(b * a / 100)}= ${texNombrec(a - (b * a) / 100)} €.$`
        this.reponse = calcul(a - (b * a) / 100)
        break
      case 'c':
        a = calcul(randint(4, 13) * 5)
        n = choice(['pull', 'pantalon', 'tee-shirt', 'vêtement', 'blouson'])
        b = choice([10, 20])
        this.question = `Le prix d'un ${n} est $${a}$ €. Il augmente de $${b}$ %. <br>
        Quel est son nouveau prix ? `
        this.optionsChampTexte = { texteApres: '€' }
        this.correction = `On calcule d'abord le montant de l'augmentation. <br>
        Pour cela on calcule $${b}$ % de $${a}$ soit $${texNombrec(b / 100)}\\times ${a}=${texNombrec(b * a / 100)}$.<br>
         L'augmentation est donc de : $${texNombrec(b * a / 100)}$ €.<br>
         Le nouveau prix est :   $${a}+${texNombrec(b * a / 100)}= ${texNombrec(a + (b * a) / 100)} €.$`
        this.reponse = calcul(a + (b * a) / 100)
        break
      case 'd':
        a = calcul(randint(10, 20) * 1000)
        b = randint(1, 5)
        this.question = `Le prix d'une voiture est $${texNombre(a)}$ €. Il augmente de $${b}$ %. <br>
        Quel est son nouveau prix ? `
        this.optionsChampTexte = { texteApres: '€' }
        this.correction = `On calcule d'abord le montant de l'augmentation. <br>
        Pour cela on calcule $${b}$ % de $${a}$ soit $${texNombrec(b / 100)}\\times ${a}=${texNombrec(b * a / 100)}$.<br>
         L'augmentation est donc de : $${texNombrec(b * a / 100)}$ €.<br>
         Le nouveau prix est :   $${a}+${texNombrec(b * a / 100)}= ${texNombrec(a + (b * a) / 100)} €.$`
        this.reponse = calcul(a + (b * a) / 100)
        break
      case 'e':
        a = calcul(randint(10, 20) * 1000)
        b = randint(1, 5)
        this.question = `Le prix d'une voiture est $${texNombre(a)}$ €. Il baisse de $${b}$ %. <br>
          Quel est son nouveau prix ? `
        this.optionsChampTexte = { texteApres: '€' }
        this.correction = `On calcule d'abord le montant de la réduction. <br>
        Pour cela on calcule $${b}$ % de $${a}$ soit $${texNombrec(b / 100)}\\times ${a}=${texNombrec(b * a / 100)}$.<br>
         La réduction est donc de : $${texNombrec(b * a / 100)}$ €.<br>
         Le nouveau prix est :   $${a}-${texNombrec(b * a / 100)}= ${texNombrec(a - (b * a) / 100)} €.$`
        this.reponse = calcul(a - (b * a) / 100)
        break
    }
  }
}
