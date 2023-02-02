import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, texteGras, sp, ecritureParentheseSiNegatif, ecritureAlgebriqueSauf1, rienSi1, abs, choice, texNombre, randint, ecritureAlgebrique } from '../../modules/outils.js'
export const titre = 'Utiliser les propriétés de conservation du sens d\'une inégalité'
/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export default function ProprietesInegalites () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 4
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.spacing = 1.5 // Interligne des questions
  this.spacingCorr = 2 // Interligne des réponses
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE2', 'typeE3']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['typeE4']
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4']
    }
    //
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1'://
          {
            const a = randint(2, 30, [4, 9, 16, 25])
            const rac = Math.sqrt(a)
            const m = randint(-10, 10, 0)
            const p = randint(-10, 10, 0)
            const choix1 = choice([['<', '>'], ['\\leqslant', '\\geqslant']])
            const choix2 = choice([['<', '>'], ['\\leqslant', '\\geqslant']])
            texte = ` Sachant que $${texNombre(Math.floor(100 * rac) / 100, 2)} ${choix1[0]} \\sqrt{${a}} ${choix2[0]} ${texNombre(Math.ceil(100 * rac) / 100, 2)}$, 
            encadrer le plus précisément possible  $${rienSi1(m)}\\sqrt{${a}}${ecritureAlgebrique(p)}$.
                `

            texteCorr = `${texteGras('Méthode :')} en partant de l'encadrement initial de $\\sqrt{${a}}$, 
on forme, avec des opérations successives, $${rienSi1(m)}\\sqrt{${a}}${ecritureAlgebrique(p)}$.<br>
$\\begin{aligned}
${texNombre(Math.floor(100 * rac) / 100, 2)}${choix1[0]}&\\sqrt{${a}}${choix2[0]}${texNombre(Math.ceil(100 * rac) / 100, 2)}\\\\`
            texteCorr += `${m}\\times ${texNombre(Math.floor(100 * rac) / 100, 2)}${m > 0 ? `${choix1[0]}` : `${choix1[1]}`}&${m}\\times \\sqrt{${a}} ${m > 0 ? `${choix2[0]}` : `${choix2[1]}`} ${m}\\times ${texNombre(Math.ceil(100 * rac) / 100, 2)}   ${sp(7)}\\text{ On multiplie par ${m > 0 ? `$${m}> 0$ ` : `$${m}< 0 $`}, le sens des inégalités ${m > 0 ? 'ne change pas' : 'change'}.}\\\\`
            texteCorr += `${texNombre(m * Math.floor(100 * rac) / 100, 2)}${m > 0 ? `${choix1[0]}` : `${choix1[1]}`}& ${m}\\sqrt{${a}} ${m > 0 ? `${choix2[0]}` : `${choix2[1]}`}${texNombre(m * Math.ceil(100 * rac) / 100, 2)} \\\\`
            texteCorr += `${texNombre(m * Math.floor(100 * rac) / 100, 2)} ${ecritureAlgebrique(p)}${m > 0 ? `${choix1[0]}` : `${choix1[1]}`}& ${m}\\sqrt{${a}} ${ecritureAlgebrique(p)} ${m > 0 ? `${choix2[0]}` : `${choix2[1]}`}  ${texNombre(m * Math.ceil(100 * rac) / 100, 2)} ${ecritureAlgebrique(p)} ${sp(7)}\\text{ On  ${p > 0 ? 'ajoute' : 'retranche'} ${abs(p)}.} \\\\`
            texteCorr += `${texNombre(m * Math.floor(100 * rac) / 100 + p, 2)}  ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`}&${m}\\sqrt{${a}} ${ecritureAlgebrique(p)}  ${m > 0 ? `${choix2[0]}` : `${choix2[1]}`} ${texNombre(m * Math.ceil(100 * rac) / 100 + p, 2)} \\\\`
            texteCorr += '\\end{aligned}$'
            if (m < 0) {
              texteCorr += `<br>
           Ainsi,  $ ${texNombre(m * Math.ceil(100 * rac) / 100 + p, 2)}  ${choix2[0]} ${m}\\sqrt{${a}} ${ecritureAlgebrique(p)} ${choix1[0]} ${texNombre(m * Math.floor(100 * rac) / 100 + p, 2)}  $.`
            }
          }
          break

        case 'typeE2':
          {
            const a = randint(-10, 10, 0)
            const m = randint(-10, 10, [0, 1])
            const p = randint(-10, 10, 0)
            const choix1 = choice([['<', '>'], ['\\leqslant', '\\geqslant'], ['>', '<'], ['\\geqslant', '\\leqslant']])
            texte = ` Si $x${choix1[0]} ${a}$, que peut-on dire de $${rienSi1(m)}x${ecritureAlgebrique(p)}$ ?
                `
            texteCorr = `${texteGras('Méthode :')} en partant de l'inégalité vérifiée par $x$, on forme, avec des opérations successives, $${rienSi1(m)}x${ecritureAlgebrique(p)}$.<br>
$\\begin{aligned}
x &${choix1[0]} ${a}\\\\`
            texteCorr += `${m}\\times x&${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${m}\\times ${ecritureParentheseSiNegatif(a)} ${sp(7)}\\text{ On multiplie par ${m > 0 ? `$${m}> 0$ ` : `$${m}< 0 $`}, le sens des inégalités ${m > 0 ? 'ne change pas' : 'change'}.}\\\\`
            texteCorr += `${m}x&${m > 0 ? `${choix1[0]}` : `${choix1[1]}`}${texNombre(m * a)}   \\\\`
            texteCorr += `${texNombre(m)}x ${ecritureAlgebrique(p)} &${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${texNombre(m * a)} ${ecritureAlgebrique(p)} ${sp(7)}\\text{ On  ${p > 0 ? 'ajoute' : 'retranche'} ${abs(p)}.}  \\\\`
            texteCorr += `${texNombre(m)}x ${ecritureAlgebrique(p)} &${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${texNombre(m * a + p)} `
            texteCorr += '\\end{aligned}$'
          }
          break
        case 'typeE3':
          {
            const a = randint(-10, 10, 0)
            const b = a + randint(1, 10, 0)
            const m = randint(-10, 10, [0, 1])
            const p = randint(-10, 10, 0)
            const choix1 = choice([['<', '>'], ['\\leqslant', '\\geqslant']])
            const choix2 = choice([['<', '>'], ['\\leqslant', '\\geqslant']])
            texte = ` Sachant que $${a} ${choix1[0]} x ${choix2[0]} ${b}$, 
            encadrer le plus précisément possible  $${rienSi1(m)}x${ecritureAlgebrique(p)}$.
                `

            texteCorr = `${texteGras('Méthode :')} en partant de l'encadrement initial de $x$, 
on forme, avec des opérations successives, $${rienSi1(m)}x${ecritureAlgebrique(p)}$.<br>
$\\begin{aligned}
${a} ${choix1[0]}  x &${choix2[0]} ${b}\\\\`
            texteCorr += `${m}\\times ${ecritureParentheseSiNegatif(a)} 
${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${m}\\times x &${m > 0 ? `${choix2[0]}` : `${choix2[1]}`} ${m}\\times ${ecritureParentheseSiNegatif(b)}   ${sp(7)}\\text{ On multiplie par ${m > 0 ? `$${m}> 0$ ` : `$${m}< 0 $`}, le sens des inégalités ${m > 0 ? 'ne change pas' : 'change'}.}\\\\`
            texteCorr += `${texNombre(m * a)}${m > 0 ? `${choix1[0]}` : `${choix1[1]}`}${rienSi1(m)}x &${m > 0 ? `${choix2[0]}` : `${choix2[1]}`}  ${texNombre(m * b)}   \\\\`
            texteCorr += `${texNombre(m * a)} ${ecritureAlgebrique(p)} ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${rienSi1(m)}x ${ecritureAlgebrique(p)} &${m > 0 ? `${choix2[0]}` : `${choix2[1]}`}  ${texNombre(m * b)} ${ecritureAlgebrique(p)} ${sp(7)}\\text{ On  ${p > 0 ? 'ajoute' : 'retranche'} ${abs(p)}.}  \\\\`
            texteCorr += `${texNombre(m * a + p)}  ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${rienSi1(m)}x ${ecritureAlgebrique(p)}&${m > 0 ? `${choix2[0]}` : `${choix2[1]}`} ${texNombre(m * b + p)}   \\\\`
            texteCorr += '\\end{aligned}$'
            if (m < 0) {
              texteCorr += `<br>
           Ainsi,  $ ${texNombre(m * b + p, 2)}  ${choix2[0]} ${rienSi1(m)}x ${ecritureAlgebrique(p)} ${choix1[0]} ${texNombre(m * a + p)}  $.`
            }
          }
          break

        case 'typeE4':
          {
            const a = randint(-10, 10, 0)
            const b = a + randint(1, 10, 0)
            const c = randint(-10, 10, 0)
            const d = c + randint(1, 10, 0)
            const m = randint(-10, 10, [0, 1])
            const p = randint(-10, 10, [0, 1])
            const choix1 = choice([['<', '>'], ['\\leqslant', '\\geqslant']])
            texte = `Soit $x$ et $y$ deux réels tels que $${a} ${choix1[0]} x ${choix1[0]} ${b}$ et $${c} ${choix1[0]} y ${choix1[0]} ${d}$.<br>`
            if (m > 0 && p > 0) {
              texte += `Démontrer que  $${m * a + p * c} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * b + p * d}$.`
            } else {
              if (m > 0 && p < 0) {
                texte += `Démontrer que  $${m * a + p * d} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * b + p * c}$.`
              } else {
                if (m < 0 && p > 0) {
                  texte += `Démontrer que  $${m * b + p * c} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * a + p * d}$.`
                } else {
                  if (m < 0 && p < 0) {
                    texte += `Démontrer que  $${m * b + p * d} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * a + p * c}$.<br>
              `
                  }
                }
              }
            }

            texteCorr = `On commence par encadrer $${rienSi1(m)}x$, puis on encadre $${p}y$.<br>`
            if (m > 0 && p > 0) {
              texteCorr += ` $\\begin{aligned}
              ${a} ${choix1[0]}  x &${choix1[0]} ${b}\\\\`
              texteCorr += `${m}\\times ${ecritureParentheseSiNegatif(a)} ${choix1[0]} ${m}\\times x &${choix1[0]} ${m}\\times ${ecritureParentheseSiNegatif(b)} ${sp(7)} \\text{ On multiplie par } ${m} > 0 \\text{, le sens des inégalités ne change pas.}\\\\`
              texteCorr += `${m * a} ${choix1[0]} ${rienSi1(m)}x& ${choix1[0]} ${m * b}\\\\`
              texteCorr += '\\end{aligned}$'
              texteCorr += `<br>De même, <br>
               $\\begin{aligned}
               ${c} ${choix1[0]} y& ${choix1[0]} ${d}\\\\`
              texteCorr += `${p}\\times ${ecritureParentheseSiNegatif(c)} ${choix1[0]} ${p}\\times y &${choix1[0]} ${p}\\times ${ecritureParentheseSiNegatif(d)} ${sp(7)} \\text{ On multiplie par } ${p} > 0 \\text{, le sens des inégalités ne change pas.}\\\\`
              texteCorr += `${p * c} ${choix1[0]} ${rienSi1(p)}y& ${choix1[0]} ${p * d}\\\\`
              texteCorr += '\\end{aligned}$'
              texteCorr += `<br>
              Ainsi, on a : $\\begin{cases}    ${m * a} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * b}\\\\    ${p * c} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * d}     \\end{cases} $.<br>
              Ces inégalités sont de même sens, en faisant les sommes, on obtient : $${m * a + p * c} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * b + p * d}$.`
            } else {
              if (m > 0 && p < 0) {
                texteCorr += ` $\\begin{aligned}
                ${a} ${choix1[0]}  x &${choix1[0]} ${b}\\\\`
                texteCorr += `${m}\\times ${ecritureParentheseSiNegatif(a)} ${choix1[0]} ${m}\\times x &${choix1[0]} ${m}\\times ${ecritureParentheseSiNegatif(b)} ${sp(7)} \\text{ On multiplie par } ${m} > 0 \\text{, le sens des inégalités ne change pas.}\\\\`
                texteCorr += `${m * a} ${choix1[0]} ${rienSi1(m)}x& ${choix1[0]} ${m * b}\\\\`
                texteCorr += '\\end{aligned}$'
                texteCorr += `<br>De même, <br>
                 $\\begin{aligned}
                 ${c} ${choix1[0]} y &${choix1[0]} ${d}\\\\`
                texteCorr += `${p}\\times ${ecritureParentheseSiNegatif(c)} ${choix1[1]} ${p}\\times y &${choix1[1]} ${p}\\times ${ecritureParentheseSiNegatif(d)} ${sp(7)} \\text{ On multiplie par } ${p} < 0 \\text{, le sens des inégalités change.}\\\\`
                texteCorr += `${p * c} ${choix1[1]} ${rienSi1(p)}y& ${choix1[1]} ${p * d}\\\\`
                texteCorr += '\\end{aligned}$'
                texteCorr += `<br>
                                Ainsi, on a : $\\begin{cases}    ${m * a} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * b}\\\\    ${p * d} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * c}     \\end{cases} $.<br>
                Ces inégalités sont de même sens, en faisant les sommes, on obtient : $${m * a + p * d} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * b + p * c}$.`
              } else {
                if (m < 0 && p > 0) {
                  texteCorr += ` $\\begin{aligned}
                  ${a} ${choix1[0]}  x &${choix1[0]} ${b}\\\\`
                  texteCorr += `${m}\\times ${ecritureParentheseSiNegatif(a)} ${choix1[1]} ${m}\\times x &${choix1[1]} ${m}\\times ${ecritureParentheseSiNegatif(b)} ${sp(7)} \\text{ On multiplie par } ${m} < 0 \\text{, le sens des inégalités change.}\\\\`
                  texteCorr += `${m * a} ${choix1[1]} ${rienSi1(m)}x& ${choix1[1]} ${m * b}\\\\`
                  texteCorr += '\\end{aligned}$'
                  texteCorr += `<br>De même, <br>
                   $\\begin{aligned}
                   ${c} ${choix1[0]} y &${choix1[0]} ${d}\\\\`
                  texteCorr += `${p}\\times ${ecritureParentheseSiNegatif(c)} ${choix1[0]} ${p}\\times y &${choix1[0]} ${p}\\times ${ecritureParentheseSiNegatif(d)} ${sp(7)} \\text{ On multiplie par } ${p} > 0 \\text{, le sens des inégalités ne change pas.}\\\\`
                  texteCorr += ` 
                  ${p * c} ${choix1[0]} ${rienSi1(p)}y& ${choix1[0]} ${p * d}\\\\`
                  texteCorr += '\\end{aligned}$'
                  texteCorr += `<br>
                  Ainsi, on a : $\\begin{cases}    ${m * b} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * a}\\\\    ${p * c} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * d}     \\end{cases} $.<br>
                  Ces inégalités sont de même sens, en faisant les sommes, on obtient : $${m * b + p * c} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * a + p * d}$.`
                } else {
                  if (m < 0 && p < 0) {
                    texteCorr += ` $\\begin{aligned}
                    ${a} ${choix1[0]}  x &${choix1[0]} ${b}\\\\`
                    texteCorr += `${m}\\times ${ecritureParentheseSiNegatif(a)} ${choix1[1]} ${m}\\times x &${choix1[1]} ${m}\\times ${ecritureParentheseSiNegatif(b)} ${sp(7)} \\text{ On multiplie par } ${m} < 0 \\text{, le sens des inégalités change.}\\\\`
                    texteCorr += ` 
                    ${m * a} ${choix1[1]} ${rienSi1(m)}x& ${choix1[1]} ${m * b}\\\\`
                    texteCorr += '\\end{aligned}$'
                    texteCorr += `<br>De même, <br>
                    $\\begin{aligned}
                    ${c} ${choix1[0]} y &${choix1[0]} ${d}\\\\`
                    texteCorr += `${p}\\times ${ecritureParentheseSiNegatif(c)} ${choix1[1]} ${p}\\times y &${choix1[1]} ${p}\\times ${ecritureParentheseSiNegatif(d)} ${sp(7)} \\text{ On multiplie par } ${p} < 0 \\text{, le sens des inégalités change.}\\\\`
                    texteCorr += ` 
                   ${p * c} ${choix1[1]} ${rienSi1(p)}y& ${choix1[1]} ${p * d}\\\\`
                    texteCorr += '\\end{aligned}$'
                    texteCorr += `<br>                   
                  Ainsi, on a : $\\begin{cases}    ${m * b} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * a}\\\\    ${p * d} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * c}     \\end{cases} $.<br>
                  Ces inégalités sont de même sens, en faisant les sommes, on obtient : $${m * b + p * d} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * a + p * c}$.`
                  }
                }
              }
            }
          }
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Choix des questions', 4, '1 : Encadrer des expressions avec des racines carrées\n2 : Encadrer une expression avec une inconnue\n3 : Encadrer une expression avec deux inconnues\n4 : Mélange des cas précédents']
}
