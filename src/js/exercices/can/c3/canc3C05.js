import { context } from '../../../modules/context.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
import { choice, listeQuestionsToContenu, randint, texNombre, texteEnCouleur } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Déterminer si un nombre est pair (V/F)'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'
export const dateDePublication = '20/11/2021'

/*!
 * @author Jean-Claude Lhote
 * Référence canc3C05
 */
export const uuid = 'd0287'
export const ref = 'canc3C05'
export default function PariteDunNombre () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let a, b, c, d, e, f, g, texte, texteCorr
    switch (choice([1, 2, 3, 4, 5])) {
      case 1:
        a = randint(10, 20) * 10
        b = randint(0, 9)
        c = randint(30, 60) * 10
        d = randint(1, 9)
        e = a + b
        f = c + d
        g = e + f
        texte = `Le nombre $${e}+${f}$ est-il pair ?`
        this.canEnonce = texte
        texteCorr = `$${e}$ est un nombre ${e % 2 === 0 ? 'pair' : 'impair'} car il a $${b}$ comme chiffre des unités.<br>`
        texteCorr += `$${f}$ est un nombre ${f % 2 === 0 ? 'pair' : 'impair'} car il a $${d}$ comme chiffre des unités.<br>`
        texteCorr += `La somme ${e % 2 === 0 && f % 2 === 0 ? 'de deux nombres pairs' : e % 2 === 1 && f % 2 === 1 ? 'de deux nombres impairs' : 'd\'un nombre impair et d\'un nombre pair'} est ${g % 2 === 0 ? 'paire' : 'impaire'}.<br>`
        texteCorr += texteEnCouleur(`Mentalement on peut ajouter seulement les chiffres des unités des deux nombres : $${b}+${d}=${b + d}$`)
        texteCorr += `<br>Donc le nombre $${e}+${f}$ est ${g % 2 === 0 ? 'pair' : 'impair'}.`
        break
      case 2:
        a = randint(10, 20) * 10
        b = randint(1, 9)
        c = randint(10, 20) * 10
        d = randint(1, 4) * 2 + 1
        if (choice([true, false])) {
          e = a + b
          f = c + d
        } else {
          f = a + b
          e = c + d
        }
        g = e * f
        texte = `Le nombre $${e}\\times ${f}$ est-il pair ?`
        this.canEnonce = texte
        texteCorr = `$${e}\\times ${f}$ est un nombre ${g % 2 === 0 ? 'pair' : 'impair'}.<br>En effet, son chiffre des unités s'obtient en multipliant le chiffre des unités de ${e} et celui de ${f}.<br>`
        texteCorr += `Donc le chiffre des unités de $${e} \\times ${f}$ est celui de $${e % 10}\\times ${f % 10}=${b * d}$ soit $${g % 10}$.<br>`
        break
      case 3:
        a = choice([randint(101, 109) * 4, randint(111, 119) * 4, randint(121, 129) * 4])
        b = choice([0, 2])
        e = a + b
        g = e >> 1
        texte = `Le nombre $${e}\\div 2$ est-il pair ?`
        this.canEnonce = texte
        texteCorr = `On va retirer le plus grand multiple de 20 possible de $${e}$ :<br>`
        texteCorr += `Dans ${e} il va $${Math.floor(e / 20)}\\times 20=${e - e % 20}$ et il reste ${e % 20}.<br>`
        texteCorr += `Si on divise $${e % 20}$ par $2$ on trouve $${texNombre((e % 20) / 2)}$ qui est un nombre ${g % 2 === 0 ? 'pair' : 'impair'}.<br>`
        texteCorr += `Or, $${e}\\div 2= (${e - e % 20} + ${e % 20})\\div 2 =${(e - e % 20) >> 1} + ${(e % 20) >> 1}=${e >> 1}$.<br>`
        texteCorr += `Donc le nombre $${e}\\div 2$ est ${g % 2 === 0 ? 'pair' : 'impair'}.`
        break
      case 4:
        a = randint(10, 20) * 10
        b = randint(0, 9)
        c = randint(30, 60) * 10
        d = randint(1, 9)
        e = a + b
        f = c + d
        g = f - e
        texte = `Le nombre $${f}-${e}$ est-il pair ?`
        this.canEnonce = texte
        texteCorr = `$${f}$ est un nombre ${f % 2 === 0 ? 'pair' : 'impair'} car il a $${d}$ comme chiffre des unités.<br>`
        texteCorr += `$${e}$ est un nombre ${e % 2 === 0 ? 'pair' : 'impair'} car il a $${b}$ comme chiffre des unités.<br>`
        texteCorr += `La différence ${e % 2 === 0 && f % 2 === 0 ? 'de deux nombres pairs' : e % 2 === 1 && f % 2 === 1 ? 'de deux nombres impairs' : 'd\'un nombre impair et d\'un nombre pair'} est ${g % 2 === 0 ? 'paire' : 'impaire'}.<br>`
        texteCorr += texteEnCouleur(`Mentalement on peut soustraire les chiffres des unités des deux nombres ${d < b ? '(en empruntant une dizaine à $' + f + '$) ' : ''} : $${d < b ? d + 10 : d} - ${b}=${g % 10}$`)
        texteCorr += `<br>Donc le nombre $${f}-${e}$ est ${g % 2 === 0 ? 'pair' : 'impair'}.`
        break
      case 5:
        a = randint(3, 7)
        b = a % 2 === 0 ? randint(1, 4) * 2 + 1 : randint(2, 9)
        g = b
        texte = `Le nombre $${b}`
        for (let i = 1; i < a; i++) {
          texte += `\\times ${b}`
        }
        texte += '$ est-il pair ?'
        this.canEnonce = texte
        if (b % 2 === 0) {
          texteCorr = `$${b}$ est un nombre pair. Le produit de deux nombres pairs est un nombre pair.<br>`
          texteCorr += 'Ainsi, les multiplications successives donnent toujours un résultat pair.<br>'
          texteCorr += `Donc ${texte.replace('L', 'l').replace('est-il', 'est').replace('?', '')}.`
        } else {
          texteCorr = `$${b}$ est un nombre impair. Le produit de deux nombres impairs est un nombre impair.<br>`
          texteCorr += 'Ainsi, les multiplications successives donnent toujours un résultat impair.<br>'
          texteCorr += `Donc ${texte.replace('L', 'l').replace('est-il', 'est').replace('?', '').replace('pair', 'impair')}.`
        }
        break
    }
    this.autoCorrection[0] = {
      enonce: texte,
      options: { horizontal: true },
      propositions: [
        {
          texte: 'Oui',
          statut: g % 2 === 0
        },
        {
          texte: 'Non',
          statut: g % 2 === 1
        }
      ]
    }
    const monQcm = propositionsQcm(this, 0)
    if (!context.isAmc) {
      texte += monQcm.texte
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
    this.canReponseACompleter = monQcm.texte
  }
}
