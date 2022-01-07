import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, reduireAxPlusB, ecritureParentheseSiNegatif, ecritureAlgebrique, ecritureAlgebriqueSauf1 } from '../../modules/outils.js'
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
    typesDeQuestionsDisponibles = [1]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, e, k = [], typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      a = randint(-8, 8, [0, 1, -1])
      b = randint(-8, 8, [0])
      c = randint(-8, 8, [0])

      switch (typesDeQuestions) {
        case 1:// Cas f(x)=ax+b
          texte = `<b>a.</b> Déterminer, en expliquant, si la fonction $f$ définie sur  $D=\\mathbb{R}$, par $f(x)=${reduireAxPlusB(a, b)}$,`
          texte += ' est paire, impaire, ou ni l\'un, ni l\'autre. <br>'
          texte += '<b>b.</b> En déduire des éventuelles propriétés graphiques de la représentation graphique de $f$.<br>' // f(x)=ax + b
          texteCorr = `<b>a.</b> On étudie la partité de la fonction $f$, définie sur  $D=\\mathbb{R}$ par $f(x)=${reduireAxPlusB(a, b)}$.<br>`
          texteCorr += '$\\bullet$ <b> Vérification de la symétrie du domaine :</b><br>'
          texteCorr += '$D=\\mathbb{R}$, en conséquence, pour tout $x\\in D$, $-x\\in D$.<br>'
          texteCorr += 'Le domaine de définition est bien symétrique par rapport à $0$.<br>'
          texteCorr += '$\\bullet$ <b> Etude la parité :</b><br>'
          texteCorr += 'Soit $x\\in D$.<br> Comme $-x\\in D$, on peut calculer : $f(-x)$.<br>'
          texteCorr += `$f(-x)=${ecritureAlgebriqueSauf1(a)}\\times (-x) ${ecritureAlgebrique(b)}$<br>`
          texteCorr += `$f(-x)=${reduireAxPlusB(-a, b)}$<br>`
          texteCorr += 'On observe que $f(-x)\\neq f(x)$ mais aussi que $f(-x)\\neq -f(x)$.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += '<b>Autre méthode :</b> <br>On aurait pu aussi trouver un contre exemple :<br>'
          texteCorr += `$f(1)=${a}+${ecritureParentheseSiNegatif(b)}=${a + b}$ alors que $f(-1)=-${ecritureParentheseSiNegatif(a)}${ecritureAlgebrique(b)}=${-a + b}$<br>`
          texteCorr += '$f(1)$ et $f(-1)$ ne sont ni égaux, ni opposés.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += 'Attention avec cette deuxième méthode :<br>'
          texteCorr += 'Un contre-exemple suffit à prouver qu\'une propriété est fausse, comme ici.<br>'
          texteCorr += 'Mais un exemple ne suffit pas à prouver qu\'une propriété est vraie.<br>'
          texteCorr += '<b>b.</b>  La fonction n\'étant ni paire, ni impaire, on ne peut pas déduire de symétries sur sa courbe représentative'

          bonneReponse = 'non'
          break
        case 2:// Cas f(x)=ax^2+b
          texte = ` Soit $f$ la fonction définie sur  $D=\\mathbb{R}$, par $f(x)=${a}x^2${ecritureAlgebrique(b)}x${ecritureAlgebrique(c)}.$` // f(x)=ax + b
          texteCorr = ` $f(x)=${reduireAxPlusB(a, b)}$.<br>`
          texteCorr += 'On observe que la fonction est définie sur $D=\\mathbb{R}$.<br>'
          texteCorr += 'En conséquence, pour tout $x\\in D$, $-x\\in D$.<br>'
          texteCorr += 'Le domaine de définition est bien symétrique par rapport à $0$.<br>'
          texteCorr += 'Soit $x\\in D$.<br> Comme $-x\\in D$, on peut calculer : $f(-x)$.<br>'
          texteCorr += `$f(-x)=${a}(-x)^2${ecritureAlgebrique(b)}\\times (-x)${ecritureAlgebrique(c)}.$<br>`
          texteCorr += `ce qui donne : $f(-x)=${a}x^2${ecritureAlgebrique(-b)}\\times x${ecritureAlgebrique(c)}.$<br>`
          texteCorr += 'On observe que $f(-x)\\neq f(x)$ mais aussi que $f(-x)\\neq -f(x)$.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += '<b>Autre méthode :<b> <br>On aurait pu aussi trouver un contre exemple :<br>'
          texteCorr += `$f(1)=${a}+${ecritureParentheseSiNegatif(b)}+${ecritureParentheseSiNegatif(c)}=${a + b + c}$ alors que $f(-1)=${ecritureParentheseSiNegatif(a)}${ecritureAlgebrique(-b)}+${ecritureParentheseSiNegatif(c)}=${a - b + c}$<br>`
          texteCorr += '$f(1)$ et $f(-1)$ ne sont ni égaux, ni opposés.<br>'
          texteCorr += 'On peut conclure que $f$ est ni paire, ni impaire.<br>'
          texteCorr += 'Attention avec cette deuxième méthode :<br>'
          texteCorr += 'Un contre-exemple suffit à prouver qu\'une propriété est fausse, comme ici.<br>'
          texteCorr += 'Mais un exemple ne suffit pas à prouver qu\'une propriété est vraie.<br>'

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
