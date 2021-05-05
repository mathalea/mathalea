/* eslint-disable camelcase */

import Exercice from '../ClasseExercice.js'
import { shuffle2tableaux, export_QCM_AMC, texNombre2, listeQuestionsToContenu, randint, choice, combinaisonListes, abs, pgcd, miseEnEvidence, tex_fraction, texFractionReduite } from '../../modules/outils.js'
import Algebrite from 'algebrite'

export const amcReady = true

export const titre = 'Additionner ou soustraire deux fractions (dénominateurs multiples)'

/**
* Effectuer l'addition ou la soustraction de deux fractions dont un dénominateur est un multiple de l'autre.
*
* Le résultat de la soustraction sera toujours positif.
*
* Le coefficient est paramétrable, par défaut il est inférieur à 11.
*
* On peut paramétrer de n'avoir que des soustractions.
* @Auteur Rémi Angot
* 5N20
*/
export default function Exercice_additionner_ou_soustraire_des_fractions_5e (max = 11) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max // Correspond au facteur commun
  this.sup2 = false // Si true alors il n'y aura que des soustractions
  this.titre = titre
  this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée"
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.sup2 = 3
  /** ************ modeQcm disponible dans Mathalea ***********************/
  this.qcmDisponible = true
  this.modeQcm = false
  /***********************************************************************/

  this.nouvelleVersion = function () {
    this.qcm = ['5N20', [], 'Additionner ou soustraire deux fractions (dénominateurs multiples)', 1]
    if (this.level == 6) this.qcm[0] = '6C23'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let liste_type_de_questions
    if (this.sup2 == 1) {
      liste_type_de_questions = combinaisonListes(['+'], this.nbQuestions)
    }
    if (this.sup2 == 2) {
      liste_type_de_questions = combinaisonListes(['-'], this.nbQuestions)
    }
    if (this.sup2 == 3) {
      liste_type_de_questions = combinaisonListes(['+', '-'], this.nbQuestions)
    }

    /** ************* Pour QCM html/latex hors AMC *****************************/
    let tabrep; let tabicone = [1, 0, 0, 0]
    let espace = ''
    if (sortieHtml) {
		  espace = '&emsp;'
    } else {
		  espace = '\\qquad'
    }
    /**************************************************************************/

    for (let i = 0, a, b, c, d, k, texte, texteCorr; i < this.nbQuestions; i++) {
      texteCorr = ''
      // les numérateurs
      a = randint(1, 9)
      // les dénominateurs
      b = randint(2, 9, a)
      while (b == a) {
        b = randint(2, 9) // pas de fraction avec numérateur et dénominateur égaux
      }
      if (this.sup > 1) {
        k = randint(2, this.sup)
      } else k = 1
      d = b * k
      if (liste_type_de_questions[i] == '-') {
        c = choice([randint(1, b * k), randint(b * k, 9 * k)])
      } else {
        c = randint(1, 19, d)
      }
      if (liste_type_de_questions[i] == '+') { // une addition
        /** ***************** Choix des réponses du QCM ***********************************/
        tabrep = [`$${texFractionReduite(a * d + c * b, b * d)}$`, `$${tex_fraction(a + c, b + d)}$`, `$${tex_fraction(a + c, b * d)}$`, `$${tex_fraction(a * c, b * d)}$`]
        tabicone = [1, 0, 0, 0]
        /*************************************************************************/
        const ordre_des_fractions = randint(1, 2)
        if (ordre_des_fractions == 1) {
          texte = `$${tex_fraction(a, b)}+${tex_fraction(c, d)}=$`
          /** ****************** AMC question/questionmult ********************************/
          this.qcm[1].push([`$${tex_fraction(a, b)}+${tex_fraction(c, d)}=$\\\\ \n Réponses possibles`,
            tabrep,
            tabicone])
          /*******************************************************************************/
        } else {
          texte = `$${tex_fraction(c, d)}+${tex_fraction(a, b)}=$`
          /** ****************** AMC question/questionmult ******************************/
          this.qcm[1].push([`$${tex_fraction(c, d)}+${tex_fraction(a, b)}=$\\\\ \n Réponses possibles`,
            tabrep,
            tabicone])
          /*******************************************************************************/
        }

        if (this.modeQcm && !mathalea.sortieAMC) { //  pour Mathalea & Mathalealatex pas pour AMC ******/
          texte += `<br><br>Réponses possibles : ${espace}  `
          shuffle2tableaux(tabrep, tabicone)
          for (let i = 0; i < 4; i++) {
					  texte += `$\\square\\;$ ${tabrep[i]}` + espace
					 if (tabicone[i] == 1) {
					   texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace
					 } else {
					   texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace
					 }
				   }
        } else {
          if (ordre_des_fractions == 1) {
            texteCorr = `$${tex_fraction(a, b)}+${tex_fraction(c, d)}=`

            if (this.level != 6) {
              texteCorr += `${tex_fraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}+${tex_fraction(c, d)}=${tex_fraction(a * k, b * k)}+${tex_fraction(c, d)}=`
            }
            texteCorr += `${tex_fraction(a * k + '+' + c, d)}=${tex_fraction(a * k + c, d)}$`
          } else {
            texteCorr = `$${tex_fraction(c, d)}+${tex_fraction(a, b)}=`
            if (this.level != 6) {
						 texteCorr += `${tex_fraction(c, d)}+${tex_fraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}=${tex_fraction(c, d)}+${tex_fraction(a * k, b * k)}=`
            }
            texteCorr += `${tex_fraction(c + '+' + a * k, d)}=${tex_fraction(a * k + c, d)}$`
          }
          // Est-ce que le résultat est simplifiable ?
          const s = pgcd(a * k + c, d)
          if (s != 1) {
            texteCorr += `$=${tex_fraction(Algebrite.eval((a * k + c) / s) + miseEnEvidence('\\times ' + s), Algebrite.eval(d / s) + miseEnEvidence('\\times ' + s))}=${tex_fraction(Algebrite.eval((a * k + c) / s), Algebrite.eval(d / s))}$`
          }
        }
      } else { // une soustraction
        /** ***************** Choix des réponses du QCM ***********************************/
        tabrep = [`$${texFractionReduite(Math.abs(a * d - c * b), Math.abs(b * d))}$`, `$${tex_fraction(Math.abs(a - c), Math.abs(b - d))}$`, `$${tex_fraction(Math.abs(a - c), b * d)}$`, `$${tex_fraction(a * c, b * d)}$`]
        tabicone = [1, 0, 0, 0]
        /*********************************************************************************/
        if ((a / b) > (c / d)) {
          texte = `$${tex_fraction(a, b)}-${tex_fraction(c, d)}=$`
          this.qcm[1].push([`$${tex_fraction(a, b)}-${tex_fraction(c, d)}=$\\\\ \n Réponses possibles`,
            tabrep,
            tabicone])
        } else {
          texte = texte = `$${tex_fraction(c, d)}-${tex_fraction(a, b)}=$`
          /** ****************** AMC question/questionmult ******************************/
          this.qcm[1].push([`$${tex_fraction(c, d)}-${tex_fraction(a, b)}=$\\\\ \n Réponses possibles`,
            tabrep,
            tabicone])
          /*****************************************************************************/
        }
        if ((a / b) > (c / d)) {
          if (this.modeQcm && !mathalea.sortieAMC) {
            texte += `<br><br>Réponses possibles : ${espace}  `
            shuffle2tableaux(tabrep, tabicone)
            for (let i = 0; i < 4; i++) {
						  texte += `$\\square\\;$ ${tabrep[i]}` + espace
						 if (tabicone[i] == 1) {
						   texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace
						 } else {
						   texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace
						 }
					   }
          } else {
            texteCorr = `$${tex_fraction(a, b)}-${tex_fraction(c, d)}=`
            if (this.level != 6) {
              texteCorr += `${tex_fraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}-${tex_fraction(c, d)}=${tex_fraction(a * k, b * k)}-${tex_fraction(c, d)}=`
            }
            texteCorr += `${tex_fraction(a * k + '-' + c, d)}=${tex_fraction(a * k - c, d)}$`
          }
        } else {
          if (this.modeQcm && !mathalea.sortieAMC) {
            texte += `<br>	Réponses possibles : ${espace}  `
            shuffle2tableaux(tabrep, tabicone)
            for (let i = 0; i < 4; i++) {
						  texte += `$\\square\\;$ ${tabrep[i]}` + espace
						 if (tabicone[i] == 1) {
						   texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace
						 } else {
						   texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace
						 }
					   }
          } else {
            texteCorr = `$${tex_fraction(c, d)}-${tex_fraction(a, b)}=`
            if (this.level != 6) {
              texteCorr += `${tex_fraction(c, d)}-${tex_fraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}=${tex_fraction(c, d)}-${tex_fraction(a * k, b * k)}=${tex_fraction(c + '-' + a * k, d)}=`
            }
            texteCorr += `${tex_fraction(c - a * k, d)}$`
          }
        }
        // Est-ce que le résultat est simplifiable ?
        const s = pgcd(a * k - c, d)
        if (!this.modeQcm) {
          if (abs(a * k - c) % d == 0) { // si la fraction peut-être un nombre entier
            texteCorr += `$=${Algebrite.eval((abs(a * k - c)) / d)}$`
          } else if (s != 1) {
            texteCorr += `$=${tex_fraction(Algebrite.eval((abs(a * k - c)) / s) + miseEnEvidence('\\times ' + s), Algebrite.eval(d / s) + miseEnEvidence('\\times ' + s))}=${tex_fraction(Algebrite.eval((abs(a * k - c)) / s), Algebrite.eval(d / s))}$`
          }
        }
      }

	  texte = texte.replaceAll('$$', ' ')
	  texteCorr = texteCorr.replaceAll('$$', ' ')
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = ['Valeur maximale du coefficient multiplicateur', 99999]
  this.besoin_formulaire2_numerique = ['Types de calculs ', 3, '1 : Additions\n2 : Soustractions\n3 : Additions et soustractions']
}
