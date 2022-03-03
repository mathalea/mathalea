import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, reduireAxPlusB, ecritureParentheseSiNegatif, ecritureAlgebrique, ecritureAlgebriqueSauf1, fractionSimplifiee } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'

export const titre = 'Etudier la parité d\'une fonction.'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/**
 * Reconnaître parité fonction
* @author Stéphane Guyon
* 2F20
*/
export default function EtudierPariteFonction () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.video = ''
  this.consigne = ''
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []
    let bonneReponse
    typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, e, k, i1, i2 = [], typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      a = randint(-8, 8, [0, 1, -1]) // Pour définir fonctions
      b = randint(-8, 8, [0]) // Pour définir fonctions
      c = randint(-8, 8, [0]) // Pour définir fonctions
      i1 = randint(1, 10) // pour définir un intervalle symétrique
      i2 = randint(1, 10, [i1])// pour définir un intervalle non-symétrique
      // i3 = math.max(i1, i2)

      switch (typesDeQuestions) {
        case 1:// Cas f(x)=ax+b
          texte = `<b>a.</b> Déterminer, en expliquant, si la fonction $f$ définie sur  $D=\\mathbb{R}$, par $f(x)=${reduireAxPlusB(a, b)}$,`
          texte += '<br> est paire, impaire, ou ni l\'une, ni l\'autre. <br>'
          texte += '<b>b.</b> En déduire des éventuelles propriétés graphiques de la représentation graphique de $f$.<br>' // f(x)=ax + b
          texteCorr = `<b>a.</b> On étudie la partité de la fonction $f$, définie sur  $D=\\mathbb{R}$ par $f(x)=${reduireAxPlusB(a, b)}$.<br>`
          texteCorr += '$\\bullet$ <b> Vérification de la symétrie du domaine :</b><br>'
          texteCorr += '$D=\\mathbb{R}$, en conséquence, pour tout $x\\in D$, $-x\\in D$.<br>'
          texteCorr += 'Le domaine de définition est bien symétrique par rapport à $0$.<br>'
          texteCorr += '$\\bullet$ <b> Etude la parité :</b><br>'
          texteCorr += 'Soit $x\\in D$.<br>'
          texteCorr += '$\\quad\\diamond$ On calcule $f(-x)$ :<br>'
          texteCorr += `$f(-x)=${ecritureAlgebriqueSauf1(a)}\\times (-x) ${ecritureAlgebrique(b)}=${reduireAxPlusB(-a, b)}$<br>`
          texteCorr += 'On observe que $f(-x)\\neq f(x)$ , la fonction $f$ n\'est donc pas paire.<br>'
          texteCorr += '$\\quad\\diamond$  On calcule maintenant $-f(x)$ :<br>'
          texteCorr += `$-f(x)=-(${reduireAxPlusB(a, b)})=${reduireAxPlusB(-a, -b)}$<br>`
          texteCorr += 'On observe alors que $f(-x)\\neq -f(x)$, la fonction $f$ n\'est donc pas impaire.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += '<b>Autre méthode :</b> <br>On aurait pu aussi trouver un contre exemple :<br>'
          texteCorr += `$f(1)=${a}+${ecritureParentheseSiNegatif(b)}=${a + b}$ alors que $f(-1)=-${ecritureParentheseSiNegatif(a)}${ecritureAlgebrique(b)}=${-a + b}$<br>`
          texteCorr += '$f(1)$ et $f(-1)$ ne sont ni égaux, ni opposés.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += 'Attention avec cette deuxième méthode :<br>'
          texteCorr += 'Un contre-exemple suffit à prouver qu\'une propriété est fausse, comme ici.<br>'
          texteCorr += 'Mais un exemple ne suffit pas à prouver qu\'une propriété est vraie.<br><br>'
          texteCorr += '<b>b.</b>  La fonction n\'étant ni paire, ni impaire, on ne peut pas déduire de symétries sur sa courbe représentative'

          bonneReponse = 'non'
          break
        case 2:// Cas f(x)=ax^2+bx+c
          texte = `Soit $f$ la fonction définie sur  $D=\\mathbb{R}$, par $f(x)=${a}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)}.$`
          texte += '<br><b>a.</b> Déterminer, en expliquant, si la fonction $f$ est paire, impaire, ou ni l\'une, ni l\'autre. <br>'
          texte += '<br><b>b.</b> En déduire des éventuelles propriétés graphiques de la représentation graphique de $f$.<br>'
          texteCorr = ` <b>a.</b>$f(x)=${a}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)}.$<br>`
          texteCorr += '<b>Vérification de la symétrie du domaine de définition :</b><br>'
          texteCorr += 'On observe que la fonction est définie sur $D=\\mathbb{R}$.<br>'
          texteCorr += 'En conséquence, pour tout $x\\in D$, $-x\\in D$.<br>'
          texteCorr += 'Le domaine de définition est bien symétrique par rapport à $0$.<br>'
          texteCorr += '<b>Etude de la parité :</b><br>'
          texteCorr += 'Soit $x\\in D$.<br>'
          texteCorr += '$\\quad\\diamond$ On calcule $f(-x)$ :<br>'
          texteCorr += `$f(-x)=${a}(-x)^2${ecritureAlgebrique(b)}\\times (-x)${ecritureAlgebrique(c)}=${a}x^2${ecritureAlgebriqueSauf1(-b)}x${ecritureAlgebrique(c)}.$<br>`
          texteCorr += 'On observe que $f(-x)\\neq f(x)$ , la fonction $f$ n\'est donc pas paire.<br>'
          texteCorr += '$\\quad\\diamond$  On calcule maintenant $-f(x)$ :<br>'
          texteCorr += `$-f(x)=-(${a}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)})=${-a}x^2${ecritureAlgebrique(-b)}x${ecritureAlgebrique(-c)}$<br>`
          texteCorr += 'On observe alors que $f(-x)\\neq -f(x)$, la fonction $f$ n\'est donc pas impaire.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += '<b>Autre méthode :</b> <br>On aurait pu aussi trouver un contre exemple :<br>'
          texteCorr += `$f(1)=${a}\\times 1^2${ecritureAlgebrique(b)}\\times 1${ecritureAlgebrique(c)}=${a + b + c}$<br>`
          texteCorr += `$f(-1)=${a}\\times (-1)^2${ecritureAlgebrique(b)}\\times (-1)${ecritureAlgebrique(c)}=${a} ${ecritureAlgebrique(-b)} ${ecritureAlgebrique(c)} =${a - b + c}$<br>`
          texteCorr += '$f(1)$ et $f(-1)$ ne sont ni égaux, ni opposés.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += 'Attention avec cette deuxième méthode :<br>'
          texteCorr += 'Un contre-exemple suffit à prouver qu\'une propriété est fausse, comme ici.<br>'
          texteCorr += 'Mais un exemple ne suffit pas à prouver qu\'une propriété est vraie.<br>'
          texteCorr += '<br><b>b.</b>  La fonction n\'étant ni paire, ni impaire, on ne peut pas déduire de symétries sur sa courbe représentative'

          bonneReponse = 'non'
          break
        case 3:// Cas f(x)=ax^2+c sur R
          texte = `Soit $f$ la fonction définie sur  $D=[${-i1};${i1}]$ , par $f(x)=${a}x^2${ecritureAlgebrique(c)}.$`
          texte += '<br><b>a.</b> Déterminer, en expliquant, si la fonction $f$ est paire, impaire, ou ni l\'une, ni l\'autre. <br>'
          texte += '<br><b>b.</b> En déduire des éventuelles propriétés graphiques de la représentation graphique de $f$.<br>'
          texteCorr = ` <b>a.</b>$f(x)=${a}x^2${ecritureAlgebrique(c)}.$<br>`
          texteCorr += '<b>Vérification de la symétrie du domaine de définition :</b><br>'
          texteCorr += `On observe que la fonction est définie sur $D=[${-i1};${i1}]$ .<br>`
          texteCorr += 'En conséquence, pour tout $x\\in D$, $-x\\in D$.<br>'
          texteCorr += 'Le domaine de définition est bien symétrique par rapport à $0$.<br>'
          texteCorr += '<b>Etude de la parité :</b><br>'
          texteCorr += 'Soit $x\\in D$.<br>'
          texteCorr += '$\\quad\\diamond$ On calcule $f(-x)$ :<br>'
          texteCorr += `$f(-x)=${a}(-x)^2${ecritureAlgebrique(c)}=${a}x^2${ecritureAlgebrique(c)}.$<br>`
          texteCorr += 'On observe que pour tout $x\\in D$$, $f(-x)= f(x)$ , la fonction $f$ est donc paire.<br>'
          texteCorr += '<br><b>b.</b>  La fonction étant paire, sa courbe représentative admet une symétrie par rapport à l\'axe des ordonnées.'

          bonneReponse = 'paire'
          break
        case 4:// Cas f(x)=ax^2+c sur I non-symétrique
          texte = `Soit $f$ la fonction définie sur  $D=[${-i2};${i1}]$ par $f(x)=${a}x^2${ecritureAlgebrique(c)}.$`
          texte += '<br><b>a.</b> Déterminer, en expliquant, si la fonction $f$ est paire, impaire, ou ni l\'une, ni l\'autre. <br>'
          texte += '<br><b>b.</b> En déduire des éventuelles propriétés graphiques de la représentation graphique de $f$.<br>'
          texteCorr = ` <b>a.</b>$f(x)=${a}x^2${ecritureAlgebrique(c)}.$<br>`
          texteCorr += '<b>Vérification de la symétrie du domaine de définition :</b><br>'
          texteCorr += `On observe que la fonction est définie sur  $D=[${-i2};${i1}]$ qui n'est pas symétrique par rapport à $0$.<br>`
          if (i2 > i1) { texteCorr += `Par exemple, $x=${-i2} \\in D$, mais $-x=${i2} \\notin D$.<br>` } else { texteCorr += `Par exemple, $x=${i1} \\in D$, mais $-x=${-i1} \\notin D$.<br>` }
          texteCorr += 'En conséquence, il existe des réels dans $D$, dont l\'opposé n\'appartient pas à $D$.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += '<br><b>b.</b> La représentation graphique ne peut pas admettre de symétrie centrale par rapport à l\'origine, ni symétrie axiale par rapport à l\'axe des ordonnées.<br>'
          bonneReponse = 'non'
          break
        case 5:// Cas f(x)=1/ax
          texte = `<b>a.</b> Déterminer, en expliquant, si la fonction $f$ définie sur  $D=\\mathbb{R^{*}}$, par $f(x)=\\dfrac{${a}}{x}$,`
          texte += '<br> est paire, impaire, ou ni l\'une, ni l\'autre. <br>'
          texte += '<b>b.</b> En déduire des éventuelles propriétés graphiques de la représentation graphique de $f$.<br>' // f(x)=ax + b
          texteCorr = `<b>a.</b> On étudie la partité de la fonction $f$, définie sur  $D=\\mathbb{R}$ par $f(x)=\\dfrac{${a}}{x}$.<br>`
          texteCorr += '$\\bullet$ <b> Vérification de la symétrie du domaine :</b><br>'
          texteCorr += '$D=\\mathbb{R^{*}}$, en conséquence, pour tout $x\\in D$, $-x\\in D$.<br>'
          texteCorr += 'Le domaine de définition est bien symétrique par rapport à $0$.<br>'
          texteCorr += '$\\bullet$ <b> Etude la parité :</b><br>'
          texteCorr += 'Soit $x\\in D$.<br>'
          texteCorr += '$\\quad\\diamond$ On calcule $f(-x)$ :<br>'
          texteCorr += `$f(-x)=\\dfrac{${a}}{-x}`
          if (a > 0) { texteCorr += `=-\\dfrac{${a}}{x}$<br>` } else { texteCorr += `=\\dfrac{${-a}}{x}$<br>` }
          texteCorr += 'On observe que $f(-x)\\neq f(x)$ , la fonction $f$ n\'est donc pas paire.<br>'
          texteCorr += '$\\quad\\diamond$  On calcule maintenant $-f(x)$ :<br>'
          texteCorr += `$-f(x)=-\\dfrac{${a}}{x}`
          if (a < 0) { texteCorr += `=\\dfrac{${-a}}{x}$<br>` } else { texteCorr += '$<br>' }
          texteCorr += 'On observe alors que $f(-x)= -f(x)$, la fonction $f$ est donc impaire.<br>'
          texteCorr += '<b>b.</b>  La fonction $f$ étant impaire, on peut déduire que sa courbe représentative admet une symétrie centrale autour de l\'origine du repère.'

          bonneReponse = 'impaire'
          break
        case 6:// Cas f(x)=sqrt{ax^2+c}
          texte = 'Soit $f$ la fonction définie sur'
          if (b > 0) { texte += '$D=\\mathbb{R}$' } else { texte += `$]-\\infty;-\\sqrt{\\dfrac{${-b}}{${a}}}]\\cup [\\sqrt{${fractionSimplifiee(b, a)}};+\\infty[$` }
          texte += ` par $f(x)=\\sqrt{${a}x^2${ecritureAlgebrique(b)}}.$`
          texte += '<br><b>a.</b> Déterminer, en expliquant, si la fonction $f$ est paire, impaire, ou ni l\'une, ni l\'autre. <br>'
          texte += '<br><b>b.</b> En déduire des éventuelles propriétés graphiques de la représentation graphique de $f$.<br>'
          texteCorr = ` <b>a.</b>$f(x)=${a}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)}.$<br>`
          texteCorr += '<b>Vérification de la symétrie du domaine de définition :</b><br>'
          texteCorr += 'On observe que la fonction est définie sur $D=\\mathbb{R}$.<br>'
          texteCorr += 'En conséquence, pour tout $x\\in D$, $-x\\in D$.<br>'
          texteCorr += 'Le domaine de définition est bien symétrique par rapport à $0$.<br>'
          texteCorr += '<b>Etude de la parité :</b><br>'
          texteCorr += 'Soit $x\\in D$.<br>'
          texteCorr += '$\\quad\\diamond$ On calcule $f(-x)$ :<br>'
          texteCorr += `$f(-x)=${a}(-x)^2${ecritureAlgebrique(b)}\\times (-x)${ecritureAlgebrique(c)}=${a}x^2${ecritureAlgebriqueSauf1(-b)}x${ecritureAlgebrique(c)}.$<br>`
          texteCorr += 'On observe que $f(-x)\\neq f(x)$ , la fonction $f$ n\'est donc pas paire.<br>'
          texteCorr += '$\\quad\\diamond$  On calcule maintenant $-f(x)$ :<br>'
          texteCorr += `$-f(x)=-(${a}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)})=${-a}x^2${ecritureAlgebrique(-b)}x${ecritureAlgebrique(-c)}$<br>`
          texteCorr += 'On observe alors que $f(-x)\\neq -f(x)$, la fonction $f$ n\'est donc pas impaire.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += '<b>Autre méthode :</b> <br>On aurait pu aussi trouver un contre exemple :<br>'
          texteCorr += `$f(1)=${a}\\times 1^2${ecritureAlgebrique(b)}\\times 1${ecritureAlgebrique(c)}=${a + b + c}$<br>`
          texteCorr += `$f(-1)=${a}\\times (-1)^2${ecritureAlgebrique(b)}\\times (-1)${ecritureAlgebrique(c)}=${a} ${ecritureAlgebrique(-b)} ${ecritureAlgebrique(c)} =${a - b + c}$<br>`
          texteCorr += '$f(1)$ et $f(-1)$ ne sont ni égaux, ni opposés.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += 'Attention avec cette deuxième méthode :<br>'
          texteCorr += 'Un contre-exemple suffit à prouver qu\'une propriété est fausse, comme ici.<br>'
          texteCorr += 'Mais un exemple ne suffit pas à prouver qu\'une propriété est vraie.<br>'
          texteCorr += '<br><b>b.</b>  La fonction n\'étant ni paire, ni impaire, on ne peut pas déduire de symétries sur sa courbe représentative'

          bonneReponse = 'oui'
          break
      }
      if (this.interactif || context.isAmc) {
        this.autoCorrection[i] = {}
        this.autoCorrection[i].options = { ordered: true }
        this.autoCorrection[i].enonce = `${texte}\n`
        this.autoCorrection[i].propositions = [
          {
            texte: 'oui',
            statut: bonneReponse !== 'non'
          },
          {
            texte: 'non',
            statut: bonneReponse !== 'oui'
          },
          {
            texte: 'je ne sais pas',
            statut: false
          }
        ]
        if (this.interactif) {
          texte += propositionsQcm(this, i).texte
        }
      }
      if (this.questionJamaisPosee(i, k, a, b, c, d, e)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
