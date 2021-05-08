import Exercice from '../ClasseExercice.js'
import { listeNombresPremiersStrictJusqua, shuffle2tableaux, choice, listeQuestionsToContenu, randint, troncature, calcul, texNombre, miseEnEvidence, texFraction } from '../../modules/outils.js';
export const amcReady = true

export const titre = 'Arrondir une valeur'

/**
 * * Encadrer_puis_arrondir_une_valeur
 * * 6N31-3
 * @author Mireille Gain, s'inspirant de 6N31-1 de Sébastien Lozano
 */

export default function Arrondir_une_valeur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre;

  this.nbQuestions = 3
  this.nbCols = 3
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = false
	this.qcmDisponible = true
	this.modeQcm = false
  sortieHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 3.5)

  this.nouvelleVersion = function () {
    if (!this.modeQcm) {
      this.consigne = "Encadrer chaque nombre à l'unité, puis au dixième, puis au centième.<br>Dans chaque cas, mettre ensuite en évidence son arrondi."
    } else {
      this.consigne = "Quelles sont les encadrements où la valeur orange est la valeur arrondie du nombre à l'unité, au dixième et au centième"
    }
    this.qcm = ['6N31-3', [], "Valeur arrondie du nombre à l'unité, au dixième et au centième", 2, { ordered: true, vertical: true }]
    let tabrep = []; let tabicone=[]; let pre_tabrep=[]; let  pre_tabicone = []
		let espace = '';
    if (sortieHtml) {
		 if (this.qcm[4].vertical === true) {
        espace = '<br>';
      }
      else {
        espace = '&emsp;';
      }
    } else {
      if (this.qcm[4].vertical === true) {
        space = '\\\\';
      } else {
		  espace = '\\qquad';
      }
    }
    this.listeQuestions = []
    this.listeCorrections = []
    let m, c, d, u, di, ci, mi, me, ce, de, n, den, num, nb, rac

    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      tabrep.length = 0, tabicone.length = 0, pre_tabrep.length = 0, pre_tabicone.length = 0
      if (this.sup == 1) {
        m = randint(0, 9)
        c = randint(0, 9)
        d = randint(0, 9)
        u = randint(0, 9)
        di = randint(1, 9)
        ci = randint(1, 9)
        mi = randint(1, 9, 5)
        me = randint(0, 1)
        ce = randint(0, 1)
        de = randint(0, 1)
        n = me * m * 1000 + ce * c * 100 + de * d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001)
        nb = texNombre(n)
      } else if (this.sup == 2) {
        den = choice([7, 9, 11, 13])
        num = randint(1, 50, [7, 9, 11, 13, 14, 18, 21, 22, 26, 27, 28, 33, 35, 36, 39, 42, 44, 45, 49])
        n = num / den
        nb = texFraction(num, den)
        di = 10 * (troncature(n - troncature(n, 0), 1))
        ci = 100 * (troncature(n - troncature(n, 1), 2))
        mi = 1000 * (troncature(n - troncature(n, 2), 3))
      } else if (this.sup == 3) {
        rac = randint(2, 300, [listeNombresPremiersStrictJusqua(300)])
        n = Math.sqrt(rac)
        nb = `\\sqrt{${rac}}`
        di = 10 * (troncature(n - troncature(n, 0), 1))
        ci = 100 * (troncature(n - troncature(n, 1), 2))
        mi = 1000 * (troncature(n - troncature(n, 2), 3))
      }

      texte = `$${nb}$`
      
        if (this.sup == 1) texte += '';
      else if (this.sup == 2) texte += `$\\phantom{1234567}Quand~on~écrit~sur~la~calculatrice~ ${num}\\div ${den}, ~elle~renvoie : ${texNombre(n)}$`
        else if (this.sup == 3) texte += `$\\phantom{1234567}Quand~on~écrit~sur~la~calculatrice~ ${nb}, ~elle~renvoie : ${texNombre(n)}$`
      
      texteCorr = "Encadrement et arrondi à l'unité : "
      if (di < 5) {
        texteCorr += `$\\phantom{1234567}${miseEnEvidence(texNombre(troncature(n, 0)))} < ${nb} < ${texNombre(troncature(n + 1, 0))}$`
      pre_tabrep[0] = `$${miseEnEvidence(texNombre(troncature(n, 0)))} < ${nb} < ${texNombre(troncature(n + 1, 0))}$`
      pre_tabrep[1] = `$${texNombre(troncature(n, 0))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 1, 0)))}$`
      pre_tabicone = [1, 0]
      if (choice([false, true])) {
          shuffle2tableaux(pre_tabrep, pre_tabicone)
      }
        tabrep.push(pre_tabrep[0], pre_tabrep[1])
      tabicone.push(pre_tabicone[0], pre_tabicone[1])
      } else {
        texteCorr += `$\\phantom{1234567}${texNombre(troncature(n, 0))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 1, 0)))}$`
        pre_tabrep[0] = `$${texNombre(troncature(n, 0))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 1, 0)))}$`
        pre_tabrep[1] = `$${miseEnEvidence(texNombre(troncature(n, 0)))} < ${nb} < ${texNombre(troncature(n + 1, 0))}$`
        pre_tabicone = [1, 0]
        if (choice([false, true])) {
          shuffle2tableaux(pre_tabrep, pre_tabicone)
        }
        tabrep.push(pre_tabrep[0], pre_tabrep[1])
        tabicone.push(pre_tabicone[0], pre_tabicone[1])
      }

      texteCorr += '<br>Encadrement et arrondi au dixième : ';
      if (ci < 5) {
        texteCorr += `$\\phantom{123}${miseEnEvidence(texNombre(troncature(n, 1)))} < ${nb} < ${texNombre(troncature(n + 0.1, 1))}$`
        pre_tabrep[0] = `$${miseEnEvidence(texNombre(troncature(n, 1)))} < ${nb} < ${texNombre(troncature(n + 0.1, 1))}$`
        pre_tabrep[1] = `$${texNombre(troncature(n, 1))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.1, 1)))}$`
        pre_tabicone = [1, 0]
        if (choice([false, true])) {
          shuffle2tableaux(pre_tabrep, pre_tabicone)
        }
        tabrep.push(pre_tabrep[0], pre_tabrep[1])
        tabicone.push(pre_tabicone[0], pre_tabicone[1])
      } else {
        texteCorr += `$\\phantom{123}${texNombre(troncature(n, 1))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.1, 1)))}$`
        pre_tabrep[0] = `$${texNombre(troncature(n, 1))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.1, 1)))}$`
        pre_tabrep[1] = `$${miseEnEvidence(texNombre(troncature(n, 1)))} < ${nb} < ${texNombre(troncature(n + 0.1, 1))}$`
        pre_tabicone = [1, 0]
        if (choice([false, true])) {
          shuffle2tableaux(pre_tabrep, pre_tabicone)
        }
        tabrep.push(pre_tabrep[0], pre_tabrep[1])
        tabicone.push(pre_tabicone[0], pre_tabicone[1])
      }

      texteCorr += '<br>Encadrement et arrondi au centième : $~$';
      if (mi < 5) {
        texteCorr += `$${miseEnEvidence(texNombre(troncature(n, 2)))} < ${nb} < ${texNombre(troncature(n + 0.01, 2))}$`
        pre_tabrep[0] = `$${miseEnEvidence(texNombre(troncature(n, 2)))} < ${nb} < ${texNombre(troncature(n + 0.01, 2))}$`
        pre_tabrep[1] = `$${texNombre(troncature(n, 2))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.01, 2)))}$`
        pre_tabicone = [1, 0]
        if (choice([false, true])) {
          shuffle2tableaux(pre_tabrep, pre_tabicone)
        }
        tabrep.push(pre_tabrep[0], pre_tabrep[1])
        tabicone.push(pre_tabicone[0], pre_tabicone[1])
      } else {
        texteCorr += `$${texNombre(troncature(n, 2))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.01, 2)))}$`
        pre_tabrep[0] = `$${texNombre(troncature(n, 2))} < ${nb} < ${miseEnEvidence(texNombre(troncature(n + 0.01, 2)))}$`
        pre_tabrep[1] = `$${miseEnEvidence(texNombre(troncature(n, 2)))} < ${nb} < ${texNombre(troncature(n + 0.01, 2))}$`
        pre_tabicone = [1, 0]
        if (choice([false, true])) {
          shuffle2tableaux(pre_tabrep, pre_tabicone)
        }
        tabrep.push(pre_tabrep[0], pre_tabrep[1])
        tabicone.push(pre_tabicone[0], pre_tabicone[1])
      }
      if (this.modeQcm && !mathalea.sortieAMC) {
        texte += '<br><br>Réponses possibles : <br>  ';
        texteCorr = ''
        // shuffle2tableaux(tabrep, tabicone);
        for (let i = 0; i < 6; i++) {
          texte += `$\\square\\;$ ${tabrep[i]}` + espace  
         if (tabicone[i] == 1) {
            texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace
         } else {
            texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace
         }
        }
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte) // Sinon on enregistre la question dans listeQuestions
        this.listeCorrections.push(texteCorr) // On fait pareil pour la correction
        this.qcm[1].push([`Quels sont les encadrements où la valeur orange est l'arrondi de ${texte} ?\\\\ \n Réponses possibles`,
          tabrep.slice(),
          tabicone.slice()])
        tabrep.length = 0
        tabicone.length = 0
        i++ // On passe à la question suivante
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  };
  this.besoinFormulaireNumerique = ['Type de nombre', 2, '1 : Nombre décimal\n 2 : Fraction']
  this.besoinFormulaire2CaseACocher = ['Affichage de la valeur donnée à la calculatrice', false]
}
