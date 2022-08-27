import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, base10VersBaseN, baseNVersBase10 } from '../../modules/outils.js'
import Operation from '../../modules/operations.js'
export const titre = 'Multiplications dans d\'autres bases'
export const dateDePublication = '2/11/2021'

/**
* Multiplications dans une autre base
* référence PEA13
*
* @author Rémi Angot
*/

export const uuid = 'a7016'
export const ref = 'PEA13'
export default function MultiplicationsBaseN () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.video = 'pkp9e8XDH3M'
  this.consigne = 'Poser et effectuer les calculs suivants :'
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.pasDeVersionLatex = true
  this.spacingCorr = context.isHtml ? 2 : 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const base = (this.sup === undefined || this.sup < 3 || this.sup > 9) ? randint(3, 5) : this.sup
    if ([3, 4, 5].includes(base)) {
      this.listeQuestions[0] = `Écrire la table de Pythagore en base ${base}.`
      this.listeCorrections[0] = tableDePythagore(base)
    }
    const indicePremierCalcul = ([3, 4, 5].includes(base)) ? 1 : 0

    for (let i = indicePremierCalcul, texte, texteCorr, m, n, mb, nb, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const n1 = (base === 3) ? randint(0, 2) : randint(2, base - 1)
      const n2 = (base === 3) ? randint(1, 2) : randint(2, base - 1, n1)
      nb = n2 * 10 + n1
      n = baseNVersBase10(nb, base)
      const m1 = randint(1, base - 1)
      const m2 = randint(2, base - 1)
      const m3 = randint(2, base - 1)
      mb = m3 * 100 + m2 * 10 + m1
      n = baseNVersBase10(nb, base)
      m = baseNVersBase10(mb, base)
      mb = mb.toString()
      nb = nb.toString()
      texte = `$(${mb})_{${base}} \\times (${nb})_{${base}}$`
      if (parseInt(mb) < parseInt(nb)) [mb, nb] = [nb, mb]
      texteCorr = `En base ${base} :<br>` + Operation({ operande1: m, operande2: n, type: 'multiplication', base: base }) + '<br>'
      for (let ligne = nb.length - 1; ligne > -1; ligne--) {
        const retenue = []
        texteCorr += `Calcul de $${nb[ligne]}\\times${mb} :$ <br>`
        for (let colonne = 0; colonne < mb.length; colonne++) {
          const a = nb[ligne]
          const b = mb[mb.length - 1 - colonne]
          let abEnBaseN = base10VersBaseN(a * b, base)
          if (retenue[colonne - 1]) {
            abEnBaseN = base10VersBaseN(parseInt(a) * parseInt(b) + parseInt(retenue[colonne - 1]), base)
            texteCorr += `$\\qquad ${a} \\times ${b} + ${retenue[colonne - 1]} = ${parseInt(a) * parseInt(b) + parseInt(retenue[colonne - 1])} = (${abEnBaseN})_{${base}}  $`
          } else {
            texteCorr += `$\\qquad ${a} \\times ${b} = ${a * b} = (${abEnBaseN})_{${base}}  $`
          }
          if (a * b >= base) {
            texteCorr += `$\\quad$ On écrit ${abEnBaseN[abEnBaseN.length - 1]} et on retient ${abEnBaseN.slice(0, -1)}.<br>`
            retenue[colonne] = abEnBaseN.slice(0, -1).toString()
          } else {
            texteCorr += '<br>'
          }
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Choix de la base', 9, '3 à 9 (au hasard si laissé vide)']
}

const tableDePythagore = (n) => {
  switch (n) {
    case 3:
      return `$\\begin{array}{|c|c|c|}
      \\hline
      \\times & (1)_3 & (2)_3 \\\\
      \\hline
      (1)_3 & (1)_3 & (2)_3 \\\\
      \\hline
      (2)_3 & (2)_3 & (11)_3  \\\\
      \\hline
   \\end{array}$`
    case 4:
      return `$\\begin{array}{|c|c|c|c|}
    \\hline
    \\times & (1)_4 & (2)_4 & (3)_4 \\\\
    \\hline
    (1)_4 & (1)_4 & (2)_4 & (3)_4  \\\\
    \\hline
    (2)_4 & (2)_4 & (10)_4 & (12)_4 \\\\
    \\hline
    (3)_4 & (3)_4 & (12)_4 & (21)_4 \\\\
    \\hline
 \\end{array}$`
    case 5:
      return `$\\begin{array}{|c|c|c|c|c|}
    \\hline
    \\times & (1)_5 & (2)_5 & (3)_5 & (4)_5 \\\\
    \\hline
    (1)_5 & (1)_5 & (2)_5 & (3)_5 & (4)_5  \\\\
    \\hline
    (2)_5 & (2)_5 & (4)_5 & (11)_5 & (13)_5 \\\\
    \\hline
    (3)_5 & (3)_5 & (11)_5 & (14)_5 & (22)_5 \\\\
    \\hline
    (4)_5 & (4)_5 & (13)_5 & (22)_5 & (31)_5 \\\\
    \\hline
 \\end{array}$`
    default:
      return ''
  }
}
