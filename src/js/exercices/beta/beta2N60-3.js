import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, ecritureParentheseSiNegatif, ecritureAlgebriqueSauf1, rienSi1, abs, choice, texNombre, randint, ecritureAlgebrique } from '../../modules/outils.js'
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
  this.spacingCorr = 1.5 // Interligne des réponses
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE2']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['typeE3']
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3']
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

            texteCorr = `On sait que : $${texNombre(Math.floor(100 * rac) / 100, 2)} ${choix1[0]} \\sqrt{${a}} ${choix2[0]} ${texNombre(Math.ceil(100 * rac) / 100, 2)}$. <br>
            En multipliant par ${m > 0 ? `$${m}> 0$ ` : `$${m}< 0 $`}, le sens des inégalités ${m > 0 ? 'ne change pas' : 'change'}. <br>
            On obtient donc :  $${m}\\times ${texNombre(Math.floor(100 * rac) / 100, 2)} ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`}  ${m}\\times \\sqrt{${a}} ${m > 0 ? `${choix2[0]}` : `${choix2[1]}`} ${m}\\times ${texNombre(Math.ceil(100 * rac) / 100, 2)}$, 
            soit $ ${texNombre(m * Math.floor(100 * rac) / 100, 2)}${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${m}\\sqrt{${a}} ${m > 0 ? `${choix2[0]}` : `${choix2[1]}`}  ${texNombre(m * Math.ceil(100 * rac) / 100, 2)}$.<br>
            Puis, en ${p > 0 ? 'ajoutant' : 'retranchant'} $${abs(p)}$, on obtient : $ ${texNombre(m * Math.floor(100 * rac) / 100, 2)} ${ecritureAlgebrique(p)} ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${m}\\sqrt{${a}} ${ecritureAlgebrique(p)}${m > 0 ? `${choix2[0]}` : `${choix2[1]}`}  ${texNombre(m * Math.ceil(100 * rac) / 100, 2)} ${ecritureAlgebrique(p)}$, soit : 
            $ ${texNombre(m * Math.floor(100 * rac) / 100 + p, 2)}  ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${m}\\sqrt{${a}} ${ecritureAlgebrique(p)}${m > 0 ? `${choix2[0]}` : `${choix2[1]}`} ${texNombre(m * Math.ceil(100 * rac) / 100 + p, 2)} $.`
            if (m < 0) {
              texteCorr += `<br>
           Ainsi,  $ ${texNombre(m * Math.ceil(100 * rac) / 100 + p, 2)}  ${choix2[0]} ${m}\\sqrt{${a}} ${ecritureAlgebrique(p)} ${choix1[0]} ${texNombre(m * Math.floor(100 * rac) / 100 + p, 2)}  $.`
            }
          }
          break
        case 'typeE2':
          {
            const a = randint(-10, 10, 0)
            const b = a + randint(1, 10, 0)
            const m = randint(-10, 10, [0, 1])
            const p = randint(-10, 10, 0)
            const choix1 = choice([['<', '>'], ['\\leqslant', '\\geqslant']])
            const choix2 = choice([['<', '>'], ['\\leqslant', '\\geqslant']])
            texte = `Donner l'encadrement le plus précis possible de $${rienSi1(m)}x${ecritureAlgebrique(p)}$ pour $${a} ${choix1[0]} x ${choix2[0]} ${b}$. `
            texteCorr = `On sait que : $${a} ${choix1[0]} x ${choix2[0]} ${b}$. <br>
            En multipliant par ${m > 0 ? `$${m}> 0$ ` : `$${m}< 0 $`}, le sens des inégalités ${m > 0 ? 'ne change pas' : 'change'}. <br>
            On obtient donc :  $${m}\\times ${ecritureParentheseSiNegatif(a)} ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`}  ${m}\\times x ${m > 0 ? `${choix2[0]}` : `${choix2[1]}`} ${m}\\times ${ecritureParentheseSiNegatif(b)}$, 
            soit $ ${texNombre(m * a)}${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${rienSi1(m)}x ${m > 0 ? `${choix2[0]}` : `${choix2[1]}`}  ${texNombre(m * b)}$.<br>
            Puis, en ${p > 0 ? 'ajoutant' : 'retranchant'} $${abs(p)}$, on obtient : $ ${texNombre(m * a)} ${ecritureAlgebrique(p)} ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${rienSi1(m)}x ${ecritureAlgebrique(p)}${m > 0 ? `${choix2[0]}` : `${choix2[1]}`}  ${texNombre(m * b)} ${ecritureAlgebrique(p)}$, soit : 
            $ ${texNombre(m * a + p)}  ${m > 0 ? `${choix1[0]}` : `${choix1[1]}`} ${rienSi1(m)}x ${ecritureAlgebrique(p)}${m > 0 ? `${choix2[0]}` : `${choix2[1]}`} ${texNombre(m * b + p)} $.`
            if (m < 0) {
              texteCorr += `<br>
           Ainsi,  $ ${texNombre(m * b + p, 2)}  ${choix2[0]} ${rienSi1(m)}x ${ecritureAlgebrique(p)} ${choix1[0]} ${texNombre(m * a + p)}  $.`
            }
          }
          break

        case 'typeE3':
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
                    texte += `Démontrer que  $${m * b + p * d} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebrique(p)}y ${choix1[0]} ${m * a + p * c}$.<br>
              `
                  }
                }
              }
            }
            if (m > 0 && p > 0) {
              texteCorr = `En multipliant par $${m}>0$, on ne change pas le sens des inégalités. <br>
              On obtient  : $${m}\\times ${ecritureParentheseSiNegatif(a)} ${choix1[0]} ${m}\\times x ${choix1[0]} ${m}\\times ${ecritureParentheseSiNegatif(b)}$, soit  $${m * a} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * b}$.<br>
              De même, en multipliant par $${p}>0$, on ne change pas le sens des inégalités. <br>
              On obtient  : $${p}\\times ${ecritureParentheseSiNegatif(c)} ${choix1[0]} ${p}\\times y ${choix1[0]} ${p}\\times ${ecritureParentheseSiNegatif(d)}$, soit  $${p * c} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * d}$. <br>
              Ainsi, on a : $\\begin{cases}    ${m * a} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * b}\\\\    ${p * c} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * d}     \\end{cases} $.<br>
              Ces inégalités sont de même sens, en faisant les sommes, on obtient : $${m * a + p * c} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * b + p * d}$.`
            } else {
              if (m > 0 && p < 0) {
                texteCorr = `En multipliant par $${m}>0$, on ne change pas le sens des inégalités. <br>
                On obtient  : $${m}\\times ${ecritureParentheseSiNegatif(a)} ${choix1[0]} ${m}\\times x ${choix1[0]} ${m}\\times ${ecritureParentheseSiNegatif(b)}$, soit  $${m * a} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * b}$.<br>
                En multipliant par $${p}<0$, on change  le sens des inégalités. <br>
                On obtient  : $${p}\\times ${ecritureParentheseSiNegatif(c)} ${choix1[1]} ${p}\\times y ${choix1[1]} ${p}\\times ${ecritureParentheseSiNegatif(d)}$, soit  $${p * c} ${choix1[1]} ${rienSi1(p)}y ${choix1[1]} ${p * d}$. <br>
                Ainsi, on a : $\\begin{cases}    ${m * a} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * b}\\\\    ${p * d} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * c}     \\end{cases} $.<br>
                Ces inégalités sont de même sens, en faisant les sommes, on obtient : $${m * a + p * d} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * b + p * c}$.`
              } else {
                if (m < 0 && p > 0) {
                  texteCorr = `En multipliant par $${m}<0$, on  change le sens des inégalités. <br>
                  On obtient  : $${m}\\times ${ecritureParentheseSiNegatif(a)} ${choix1[1]} ${m}\\times x ${choix1[1]} ${m}\\times ${ecritureParentheseSiNegatif(b)}$, soit  $${m * a} ${choix1[1]} ${rienSi1(m)}x ${choix1[1]} ${m * b}$.<br>
                 En multipliant par $${p}>0$, on ne change pas le sens des inégalités. <br>
                  On obtient  : $${p}\\times ${ecritureParentheseSiNegatif(c)} ${choix1[0]} ${p}\\times y ${choix1[0]} ${p}\\times ${ecritureParentheseSiNegatif(d)}$, soit  $${p * c} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * d}$. <br>
                  Ainsi, on a : $\\begin{cases}    ${m * b} ${choix1[0]} ${rienSi1(m)}x ${choix1[0]} ${m * a}\\\\    ${p * c} ${choix1[0]} ${rienSi1(p)}y ${choix1[0]} ${p * d}     \\end{cases} $.<br>
                  Ces inégalités sont de même sens, en faisant les sommes, on obtient : $${m * b + p * c} ${choix1[0]} ${rienSi1(m)}x${ecritureAlgebriqueSauf1(p)}y ${choix1[0]} ${m * a + p * d}$.`
                } else {
                  if (m < 0 && p < 0) {
                    texteCorr = `En multipliant par $${m}<0$, on  change le sens des inégalités. <br>
                  On obtient  : $${m}\\times ${ecritureParentheseSiNegatif(a)} ${choix1[1]} ${m}\\times x ${choix1[1]} ${m}\\times ${ecritureParentheseSiNegatif(b)}$, soit  $${m * a} ${choix1[1]} ${rienSi1(m)}x ${choix1[1]} ${m * b}$.<br>
                  De même, en multipliant par $${p}<0$, on  change  le sens des inégalités. <br>
                  On obtient  : $${p}\\times ${ecritureParentheseSiNegatif(c)} ${choix1[1]} ${p}\\times y ${choix1[1]} ${p}\\times ${ecritureParentheseSiNegatif(d)}$, soit  $${p * c} ${choix1[1]} ${rienSi1(p)}y ${choix1[1]} ${p * d}$. <br>
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
