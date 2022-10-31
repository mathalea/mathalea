import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeNombresPremiersStrictJusqua, shuffle2tableaux, choice, listeQuestionsToContenu, randint, troncature, calcul, texNombre, miseEnEvidence, texFraction, combinaisonListes } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { degCos } from '../../modules/fonctionsMaths.js'

export const amcReady = true
export const amcType = 'qcmMult' // type de question AMC
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Arrondir une valeur'

/**
 * * Encadrer_puis_arrondir_une_valeur
 * * 6N31-3
 * @author Mireille Gain, s'inspirant de 6N31-1 de Sébastien Lozano
 * Ajout Nouvel AMC : Janvier 2022 par EE
 */

export const uuid = 'ab793'
export const ref = '6N31-3'
export default function ArrondirUneValeur () {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.nbQuestions = 3
  this.nbCols = 2 // Valeur différente de 3 car sinon en Latex, 3 colonnes, c'est trop !
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 1
  this.spacingCorr = context.isHtml ? 2.5 : 3.5

  this.nouvelleVersion = function () {
    if (this.version === 3) {
      this.sup = 3
    } else if (this.version === 4) {
      this.sup = 4
    }
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.amcType = this.sup2 === 1 ? 'qcmMono' : 'AMCHybride'
    this.spacing = (this.interactif && this.sup === 2) ? 3 : 1
    this.autoCorrection = []
    if (!context.isAmc && !this.interactif) {
      this.consigne = 'Encadrer '
      this.consigne += this.nbQuestions > 1 ? 'chaque' : 'ce'
      this.consigne += " nombre à l'unité, puis au dixième, puis au centième.<br>Dans chaque cas, mettre ensuite en évidence son arrondi."
    } else {
      this.consigne = "Quels sont les encadrements où la valeur orange est la valeur arrondie du nombre à l'unité, au dixième et au centième ?"
    }

    const tabrep = []; const tabicone = []; const preTabRep = []; let preTabIcone = []
    let espace = ''
    if (context.isHtml) {
      espace = '<br>'
    } else {
      espace = '\\\\'
    }
    this.listeQuestions = []
    this.listeCorrections = []
    let m, c, d, u, di, ci, mi, me, ce, de, n, den, num, nb, rac, angle, v
    const listeTypeDeQuestion = this.sup < 5 ? combinaisonListes([this.sup], this.nbQuestions) : combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      switch (listeTypeDeQuestion[i]) {
        case 1:
          m = randint(0, 9)
          c = randint(0, 9)
          d = randint(0, 9)
          u = randint(2, 9)
          di = randint(1, 9)
          ci = randint(1, 9)
          mi = randint(1, 9, 5)
          me = randint(0, 1)
          ce = randint(0, 1)
          de = randint(0, 1)
          n = me * m * 1000 + ce * c * 100 + de * d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001)
          nb = texNombre(n)
          texte = `$${nb}$`

          break
        case 2:
          den = choice([7, 9, 11, 13])
          num = randint(1, 50, [7, 9, 11, 13, 14, 18, 21, 22, 26, 27, 28, 33, 35, 36, 39, 42, 44, 45, 49])
          n = num / den
          nb = texFraction(num, den)
          di = 10 * (troncature(n - troncature(n, 0), 1))
          ci = 100 * (troncature(n - troncature(n, 1), 2))
          mi = 1000 * (troncature(n - troncature(n, 2), 3))
          texte = `$${nb}$<br>($\\text{Quand~on~écrit~sur~la~calculatrice~} ${num}\\div ${den}, \\text{~elle~renvoie} : ${texNombre(n)}$.)`
          break
        case 3:
          rac = randint(2, 300, [listeNombresPremiersStrictJusqua(300)])
          n = Math.sqrt(rac)
          nb = `\\sqrt{${rac}}`
          di = 10 * (troncature(n - troncature(n, 0), 1))
          ci = 100 * (troncature(n - troncature(n, 1), 2))
          mi = 1000 * (troncature(n - troncature(n, 2), 3))
          texte = `$${nb}$<br>($\\text{Quand~on~écrit~sur~la~calculatrice~} ${nb}, \\text{~elle~renvoie} : ${texNombre(n)}$.)`
          break
        case 4:
          v = randint(11, 99) / 10
          angle = randint(1, 89, 60)
          if (choice([true, false])) {
            n = v * degCos(angle)
            nb = `${texNombre(v)}\\cos(${angle})`
            di = 10 * (troncature(n - troncature(n, 0), 1))
            ci = 100 * (troncature(n - troncature(n, 1), 2))
            mi = 1000 * (troncature(n - troncature(n, 2), 3))
          } else {
            n = v / degCos(angle)
            nb = `\\dfrac{${texNombre(v)}}{\\cos(${angle}\\degree)}`
            di = 10 * (troncature(n - troncature(n, 0), 1))
            ci = 100 * (troncature(n - troncature(n, 1), 2))
            mi = 1000 * (troncature(n - troncature(n, 2), 3))
          }
          texte = `$${nb}$<br>($\\text{Quand~on~écrit~sur~la~calculatrice~} ${nb}, \\text{~elle~renvoie} : ${texNombre(n)}$.)`
          break
      }

      texteCorr = "Encadrement et arrondi à l'unité : "
      if (di < 5) {
        texteCorr += `$\\phantom{1234567}${miseEnEvidence(texNombre(troncature(n, 0)))} < ${nb} < ${texNombre(troncature(n + 1, 0))}$`
        preTabRep[0] = `$${miseEnEvidence(texNombre(troncature(n, 0)))} < ${nb} < ${texNombre(troncature(n + 1, 0))}$`
        preTabRep[1] = `$${texNombre(troncature(n, 0))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 1, 0)))}$`
        preTabIcone = [true, false]
        if (choice([false, true])) {
          shuffle2tableaux(preTabRep, preTabIcone)
        }
        tabrep.push(preTabRep[0], preTabRep[1])
        tabicone.push(preTabIcone[0], preTabIcone[1])
      } else {
        texteCorr += `$\\phantom{1234567}${texNombre(troncature(n, 0))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 1, 0)))}$`
        preTabRep[0] = `$${texNombre(troncature(n, 0))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 1, 0)))}$`
        preTabRep[1] = `$${miseEnEvidence(texNombre(troncature(n, 0)))} < ${nb} < ${texNombre(troncature(n + 1, 0))}$`
        preTabIcone = [true, false]
        if (choice([false, true])) {
          shuffle2tableaux(preTabRep, preTabIcone)
        }
        tabrep.push(preTabRep[0], preTabRep[1])
        tabicone.push(preTabIcone[0], preTabIcone[1])
      }

      texteCorr += '<br>Encadrement et arrondi au dixième : '
      if (ci < 5) {
        texteCorr += `$\\phantom{123}${miseEnEvidence(texNombre(troncature(n, 1)))} < ${nb} < ${texNombre(troncature(n + 0.1, 1))}$`
        preTabRep[0] = `$${miseEnEvidence(texNombre(troncature(n, 1)))} < ${nb} < ${texNombre(troncature(n + 0.1, 1))}$`
        preTabRep[1] = `$${texNombre(troncature(n, 1))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.1, 1)))}$`
        preTabIcone = [true, false]
        if (choice([false, true])) {
          shuffle2tableaux(preTabRep, preTabIcone)
        }
        tabrep.push(preTabRep[0], preTabRep[1])
        tabicone.push(preTabIcone[0], preTabIcone[1])
      } else {
        texteCorr += `$\\phantom{123}${texNombre(troncature(n, 1))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.1, 1)))}$`
        preTabRep[0] = `$${texNombre(troncature(n, 1))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.1, 1)))}$`
        preTabRep[1] = `$${miseEnEvidence(texNombre(troncature(n, 1)))} < ${nb} < ${texNombre(troncature(n + 0.1, 1))}$`
        preTabIcone = [true, false]
        if (choice([false, true])) {
          shuffle2tableaux(preTabRep, preTabIcone)
        }
        tabrep.push(preTabRep[0], preTabRep[1])
        tabicone.push(preTabIcone[0], preTabIcone[1])
      }

      texteCorr += '<br>Encadrement et arrondi au centième : $~$'
      if (mi < 5) {
        texteCorr += `$${miseEnEvidence(texNombre(troncature(n, 2)))} < ${nb} < ${texNombre(troncature(n + 0.01, 2))}$`
        preTabRep[0] = `$${miseEnEvidence(texNombre(troncature(n, 2)))} < ${nb} < ${texNombre(troncature(n + 0.01, 2))}$`
        preTabRep[1] = `$${texNombre(troncature(n, 2))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.01, 2)))}$`
        preTabIcone = [true, false]
        if (choice([false, true])) {
          shuffle2tableaux(preTabRep, preTabIcone)
        }
        tabrep.push(preTabRep[0], preTabRep[1])
        tabicone.push(preTabIcone[0], preTabIcone[1])
      } else {
        texteCorr += `$${texNombre(troncature(n, 2))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.01, 2)))}$`
        preTabRep[0] = `$${texNombre(troncature(n, 2))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.01, 2)))}$`
        preTabRep[1] = `$${miseEnEvidence(texNombre(troncature(n, 2)))} < ${nb} < ${texNombre(troncature(n + 0.01, 2))}$`
        preTabIcone = [true, false]
        if (choice([false, true])) {
          shuffle2tableaux(preTabRep, preTabIcone)
        }
        tabrep.push(preTabRep[0], preTabRep[1])
        tabicone.push(preTabIcone[0], preTabIcone[1])
      }
      if (!context.isAmc || ((context.isAmc) && this.sup2 === 1)) {
        this.autoCorrection[i].enonce = `Quels sont les encadrements où la valeur orange est l'arrondi de ${texte} ?\\\\ \n Réponses possibles`
        this.autoCorrection[i].options = { vertical: true, ordered: true }
        this.autoCorrection[i].propositions = [
          {
            texte: tabrep[0],
            statut: tabicone[0],
            feedback: ''
          },
          {
            texte: tabrep[1],
            statut: tabicone[1],
            feedback: ''
          },
          {
            texte: tabrep[2],
            statut: tabicone[2],
            feedback: ''
          },
          {
            texte: tabrep[3],
            statut: tabicone[3],
            feedback: ''
          },
          {
            texte: tabrep[4],
            statut: tabicone[4],
            feedback: ''
          },
          {
            texte: tabrep[5],
            statut: tabicone[5],
            feedback: ''
          }
        ]
      }
      if (this.modeQcm && !context.isAmc) {
        texte += '<br><br>Réponses possibles : <br>  '
        texteCorr = ''
        // shuffle2tableaux(tabrep, tabicone);
        for (let i = 0; i < 6; i++) {
          texte += `$\\square\\;$ ${tabrep[i]}` + espace
          if (tabicone[i] === 1) {
            texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace
          } else {
            texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace
          }
        }
      }
      if ((context.isAmc) && this.sup2 !== 1) {
        this.autoCorrection[i] = {
          enonce: 'On s en moque !',
          enonceAvant: false,
          propositions: [
            {
              type: 'AMCOpen',
              propositions: [{ enonce: 'Encadrer ' + texte + " à l'unité et entourer son arrondi à l'unité.", statut: 1 }]
            },
            {
              type: 'AMCOpen',
              propositions: [{ enonce: 'Encadrer ' + texte + ' au dixième et entourer son arrondi au dixième.', statut: 1 }]
            },
            {
              type: 'AMCOpen',
              propositions: [{ enonce: 'Encadrer ' + texte + ' au centième et entourer son arrondi au centième.', statut: 1 }]
            }
          ]
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        if (this.interactif) {
          texte += propositionsQcm(this, i).texte
        }
        this.listeQuestions.push(texte) // Sinon on enregistre la question dans listeQuestions
        this.listeCorrections.push(texteCorr) // On fait pareil pour la correction
        tabrep.length = 0
        tabicone.length = 0
        i++ // On passe à la question suivante
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de nombres', 2, ' 1 : Nombres décimaux\n 2 : Fractions']
  if (context.isAmc) {
    this.besoinFormulaire2Numerique = ['Choix de sortie AMC', 2, ' 1 : QCM\n 2 : Questions ouvertes']
  }
}
