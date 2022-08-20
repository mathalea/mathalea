import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes } from '../../modules/outils.js'
import { point, segment, crochetD, crochetG, intervalle } from '../../modules/2d.js'

export const titre = 'Utiliser et comprendre les symboles $\\cup $ et $\\cap $ avec les intervalles de $\\mathbb{R}$'

/**
 * 2N11-2, ex 2N25
 * @author Stéphane Guyon
 */
export default function UnionEtIntersectionIntervallesDeR () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Répondre aux questions suivantes: :'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const X1 = point(0, 0)
    const X2 = point(12, 0)
    for (let i = 0, a, b, c, d, s, e, f, test, A, B, C, D, c1, c2, c3, c4, int, int1, int2, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      test = randint(1, 6)
      // variables qui alternent les ouvertures de crochets
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1: // Intersection de deux intervalles fermés disjoints
          a = randint(1, 15)
          e = a + 1
          b = randint(e, 25)
          e = b + 1
          c = randint(e, 35)
          e = c + 1
          d = randint(e, 45)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          A = point(2, 0, a)
          B = point(5, 0, b)
          C = point(6, 0, c)
          D = point(9, 0, d)
          if (test === 1) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 2) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 3) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 4) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 5) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 6) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', 0)
          int2 = intervalle(C, D, 'blue', 0)

          texte = 'Donner si possible, une écriture simplifiée de '
          if (test === 1) {
            texte += `$I=[${a};${b}]\\cap[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`
          }
          if (test === 2) {
            texte += `$I=]${a};${b}]\\cap[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $]${a};${b}]$ et dans $[${c};${d}]$.`
          }
          if (test === 3) {
            texte += `$I=[${a};${b}]\\cap]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $]${c};${d}]$.`
          }
          if (test === 4) {
            texte += `$I=[${a};${b}]\\cap[${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}[$.`
          }
          if (test === 5) {
            texte += `$I=[${a};${b}[\\cap[${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}[$.`
          }
          if (test === 6) {
            texte += `$I=]${a};${b}]\\cap]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}[$.`
          }
          texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
          texteCorr += `<br>Les deux ensembles sont disjoints, ils n'ont aucun élément en commun.<br>
                    $I=\\emptyset$`
          break
        case 2: // Union de deux intervalles fermés disjoints
          a = randint(1, 15)
          e = a + 1
          b = randint(e, 25)
          e = b + 1
          c = randint(e, 35)
          e = c + 1
          d = randint(e, 45)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          A = point(2, 0, a)
          B = point(5, 0, b)
          C = point(6, 0, c)
          D = point(9, 0, d)
          if (test === 1) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 2) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 3) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 4) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 5) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 6) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', 0)
          int2 = intervalle(C, D, 'blue', 0)
          texte = 'Donner si possible, une écriture simplifiée de Union Union'
          if (test === 1) {
            texte += `$I=[${a};${b}]\\cup[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$ ou bien $[${c};${d}]$, ou dans les deux.`
          }
          if (test === 2) {
            texte += `$I=]${a};${b}]\\cup[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $]${a};${b}]$ ou bien  $[${c};${d}]$ , ou dans les deux.`
          }
          if (test === 3) {
            texte += `$I=[${a};${b}]\\cup]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$ou bien  $]${c};${d}]$, ou dans les deux.`
          }
          if (test === 4) {
            texte += `$I=[${a};${b}]\\cup[${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $[${a};${b}]$ ou bien  $[${c};${d}[$, ou dans les deux.`
          }
          if (test === 5) {
            texte += `$I=[${a};${b}[\\cup[${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $[${a};${b}[$ ou bien  $[${c};${d}[$, ou dans les deux.`
          }
          if (test === 6) {
            texte += `$I=]${a};${b}]\\cup]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $]${a};${b}]$ ou bien  $]${c};${d}[$, ou dans les deux.`
          }
          texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'
          texteCorr += `<br>Les deux ensembles sont disjoints, ils n'ont aucun élément en commun.<br>
                    On ne peut pas simplifier l'écriture de $I$ qui s'écrit donc `
          if (test === 1) {
            texteCorr += `$I=[${a};${b}]\\cup[${c};${d}]$`
          }
          if (test === 2) {
            texteCorr += `$I=]${a};${b}]\\cup[${c};${d}]$`
          }
          if (test === 3) {
            texteCorr += `$I=[${a};${b}]\\cup]${c};${d}]$`
          }
          if (test === 4) {
            texteCorr += `$I=[${a};${b}]\\cup[${c};${d}[$`
          }
          if (test === 5) {
            texteCorr += `$I=[${a};${b}[\\cup[${c};${d}[$`
          }
          if (test === 6) {
            texteCorr += `$I=]${a};${b}]\\cup]${c};${d}]$`
          }
          break
        case 3:// Intersection de deux intervalles fermés avec intervalle fermé en commmun
          a = randint(1, 15)
          e = a + 4
          b = randint(29, 45)
          e = b - 1
          c = randint(16, e)
          e = b + 1
          d = randint(e, 65)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          A = point(2, 0, a)
          B = point(6, 0, b)
          C = point(5, 0, c)
          D = point(9, 0, d)
          if (test === 1) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 2) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 3) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 4) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 5) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 6) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', -0.1)
          int2 = intervalle(C, D, 'blue', 0.1)
          texte = 'Donner si possible, une écriture simplifiée de '
          if (test === 1) {
            texte += `$I=[${a};${b}]\\cap[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `$I=[${c};${b}]$`
          }
          if (test === 2) {
            texte += `$I=]${a};${b}]\\cap[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $]${a};${b}]$ et dans $[${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `$I=[${c};${b}]$`
          }
          if (test === 3) {
            texte += `$I=[${a};${b}]\\cap]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $]${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `$I=]${c};${b}]$`
          }
          if (test === 4) {
            texte += `$I=[${a};${b}[\\cap]${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `$I=]${c};${b}[$`
          }
          if (test === 5) {
            texte += `$I=[${a};${b}[\\cap[${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `$I=[${c};${b}[$`
          }
          if (test === 6) {
            texte += `$I=]${a};${b}]\\cap]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `$I=]${c};${b}]$`
          }

          break
        case 4:// Union de deux intervalles fermés avec intervalle fermé en commmun
          a = randint(1, 15)
          e = a + 4
          b = randint(29, 45)
          e = b - 1
          c = randint(16, e)
          e = b + 1
          d = randint(e, 65)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          A = point(2, 0, a)
          B = point(6, 0, b)
          C = point(5, 0, c)
          D = point(9, 0, d)
          if (test === 1) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 2) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 3) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 4) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 5) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 6) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', -0.1)
          int2 = intervalle(C, D, 'blue', 0.1)
          texte = 'Donner si possible, une écriture simplifiée de '
          if (test === 1) {
            texte += `$I=[${a};${b}]\\cup[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$ ou bien $[${c};${d}]$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `$I=[${a};${d}]$`
          }
          if (test === 2) {
            texte += `$I=]${a};${b}]\\cup[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $]${a};${b}]$ ou bien  $[${c};${d}]$ , ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `$I=]${a};${d}]$`
          }
          if (test === 3) {
            texte += `$I=[${a};${b}]\\cup]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$ou bien  $]${c};${d}]$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `$I=[${a};${d}]$`
          }
          if (test === 4) {
            texte += `$I=[${a};${b}[\\cup]${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $[${a};${b}[$ ou bien  $]${c};${d}[$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `$I=[${a};${d}[$`
          }
          if (test === 5) {
            texte += `$I=[${a};${b}[\\cup[${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $[${a};${b}[$ ou bien  $[${c};${d}[$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `$I=[${a};${d}[$`
          }
          if (test === 6) {
            texte += `$I=]${a};${b}]\\cup]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $]${a};${b}]$ ou bien  $]${c};${d}[$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `$I=]${a};${d}]$`
          }

          break
        case 5:// Intersection de deux intervalles fermés dont un inclus dans l'autre
          a = randint(1, 15)
          e = a + 15
          b = randint(e, 35)
          e = a + 1
          f = b - 10
          c = randint(e, f)
          e = c + 1
          d = randint(e, f)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          A = point(2, 0, a)
          B = point(9, 0, b)
          C = point(5, 0, c)
          D = point(7, 0, d)
          if (test === 1) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 2) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 3) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 4) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 5) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 6) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', -0.1)
          int2 = intervalle(C, D, 'blue', 0.1)
          texte = 'Donner si possible, une écriture simplifiée de'

          if (test === 1) {
            texte += ` $I=[${a};${b}] \\cap [${c};${d}].$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `On observe que $[${c};${d}]\\subset [${a};${b}]$ donc $I=[${c};${d}].$`
          }
          if (test === 2) {
            texte += `$I=]${a};${b}]\\cap[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $]${a};${b}]$ et dans $[${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `On observe que $[${c};${d}]\\subset ]${a};${b}]$ donc $I=[${c};${d}].$`
          }
          if (test === 3) {
            texte += `$I=[${a};${b}]\\cap]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $]${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `On observe que $]${c};${d}]\\subset [${a};${b}]$ donc $I=]${c};${d}].$`
          }
          if (test === 4) {
            texte += `$I=[${a};${b}[\\cap]${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `On observe que $]${c};${d}[\\subset [${a};${b}[$ donc $I=]${c};${d}[.$`
          }
          if (test === 5) {
            texte += `$I=[${a};${b}[\\cap[${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}[$ et dans $[${c};${d}[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `On observe que $[${c};${d}[\\subset [${a};${b}[$ donc $I=[${c};${d}[.$`
          }
          if (test === 6) {
            texte += `$I=]${a};${b}]\\cap]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += `On observe que $]${c};${d}]\\subset ]${a};${b}]$ donc $I=]${c};${d}].$`
          }

          break
        case 6:// Union de deux intervalles fermés dont un inclus dans l'autre
          a = randint(1, 15)
          e = a + 15
          b = randint(e, 35)
          e = a + 1
          f = b - 10
          c = randint(e, f)
          e = c + 1
          d = randint(e, f)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          A = point(2, 0, a)
          B = point(9, 0, b)
          C = point(5, 0, c)
          D = point(7, 0, d)
          if (test === 1) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 2) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 3) {
            c1 = crochetD(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 4) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 5) {
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetD(D, 'blue')
          }
          if (test === 6) {
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', -0.1)
          int2 = intervalle(C, D, 'blue', 0.1)
          texte = 'Donner si possible, une écriture simplifiée de'

          if (test === 1) {
            texte += `$I=[${a};${b}]\\cup[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$ ou bien $[${c};${d}]$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `On $[${c};${d}]\\subset [${a};${b}]$ donc $I=[${a};${b}].$`
          }
          if (test === 2) {
            texte += `$I=]${a};${b}]\\cup[${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $]${a};${b}]$ ou bien  $[${c};${d}]$ , ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `On $[${c};${d}]\\subset ]${a};${b}]$ donc $I=]${a};${b}].$`
          }
          if (test === 3) {
            texte += `$I=[${a};${b}]\\cup]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$ou bien  $]${c};${d}]$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `On $]${c};${d}]\\subset [${a};${b}]$ donc $I=[${a};${b}].$`
          }
          if (test === 4) {
            texte += `$I=[${a};${b}[\\cup]${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $[${a};${b}[$ ou bien  $]${c};${d}[$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `On $]${c};${d}[\\subset [${a};${b}[$ donc $I=[${a};${b}[].$`
          }
          if (test === 5) {
            texte += `$I=[${a};${b}[\\cup[${c};${d}[$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $[${a};${b}[$ ou bien  $[${c};${d}[$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `On $[${c};${d}]\\subset [${a};${b}[$ donc $I=[${a};${b}[.$`
          }
          if (test === 6) {
            texte += `$I=]${a};${b}]\\cup]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans  $]${a};${b}]$ ou bien  $]${c};${d}[$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'

            texteCorr += `On $]${c};${d}]\\subset ]${a};${b}]$ donc $I=]${a};${b}].$`
          }

          break
        case 7:// Intersection de deux intervalles avec infini
          a = randint(1, 15)
          e = a + 1
          b = randint(e, 25)
          e = b + 1
          c = randint(e, 35)
          e = c + 1
          d = randint(e, 45)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          B = point(5, 0, b)
          C = point(6, 0, c)
          D = point(10, 0, d)
          if (test === 1) {
            A = point(0, 0)
            D = point(10, 0, d)
            // c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 2) {
            A = point(0, 0)
            D = point(10, 0, d)
            // c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 3) {
            A = point(0, 0)
            D = point(10, 0, d)
            // c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 4) {
            A = point(0, 0, a)
            D = point(15, 0)
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetG(C, 'blue')
            // c4 = crochetD(D, 'blue')
          }
          if (test === 5) {
            A = point(0, 0, a)
            D = point(15, 0)
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetD(C, 'blue')
            // c4 = crochetD(D, 'blue')
          }
          if (test === 6) {
            A = point(0, 0, a)
            D = point(15, 0)
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            // c4 = crochetD(D, 'blue')
          }
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', 0)
          int2 = intervalle(C, D, 'blue', 0)

          texte = 'Donner si possible, une écriture simplifiée de'
          if (test === 1) {
            texte += ` $I=]-\\infty;${b}] \\cap [${c};${d}].$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $]-\\infty;${b}]$ et dans $[${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc aucun réel n\'appartient aux deux ensembles.<br>'
            texteCorr += '$I=\\emptyset$'
          }
          if (test === 2) {
            texte += ` $I=]-\\infty;${b}] \\cap [${c};${d}].$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $]-\\infty;${b}]$ et dans $[${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc aucun réel n\'appartient aux deux ensembles.<br>'
            texteCorr += '$I=\\emptyset$'
          }
          if (test === 3) {
            texte += `$I=]-\\infty;${b}]\\cap]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[$I=]-\\infty;${b}]$ et dans $]${c};${d}]$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc aucun réel n\'appartient aux deux ensembles.<br>'
            texteCorr += '$I=\\emptyset$'
          }
          if (test === 4) {
            texte += `$I=[${a};${b}[\\cap]${c};+\\infty[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}[$ et dans $]${c};+\\infty[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += '$I=\\emptyset$'
          }
          if (test === 5) {
            texte += `$I=[${a};${b}[\\cap[${c};+\\infty[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $[${a};${b}[$ et dans $[${c};+\\infty[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += '$I=\\emptyset$'
          }
          if (test === 6) {
            texte += `$I=]${a};${b}]\\cap]${c};+\\infty[$`
            texteCorr = `<br>On cherche les réels qui sont à la fois dans $]${a};${b}]$ et dans $]${c};+\\infty[$.`
            texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
            texteCorr += '$I=\\emptyset$'
          }
          break
        case 8:// Union de deux intervalles un fermé et l'autre semi fermé, et disjoints
          a = randint(1, 15)
          e = a + 1
          b = randint(e, 25)
          e = b + 1
          c = randint(e, 35)
          e = c + 1
          d = randint(e, 45)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          B = point(5, 0, b)
          C = point(6, 0, c)

          if (test === 1) {
            A = point(0, 0)
            D = point(10, 0, d)
            // c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 2) {
            A = point(0, 0)
            D = point(10, 0, d)
            // c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetD(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 3) {
            A = point(0, 0)
            D = point(10, 0, d)
            // c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            c4 = crochetG(D, 'blue')
          }
          if (test === 4) {
            A = point(0, 0, a)
            D = point(15, 0)
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetG(C, 'blue')
            // c4 = crochetD(D, 'blue')
          }
          if (test === 5) {
            A = point(0, 0, a)
            D = point(15, 0)
            c1 = crochetD(A, 'red')
            c2 = crochetD(B, 'red')
            c3 = crochetD(C, 'blue')
            // c4 = crochetD(D, 'blue')
          }
          if (test === 6) {
            A = point(0, 0, a)
            D = point(15, 0)
            c1 = crochetG(A, 'red')
            c2 = crochetG(B, 'red')
            c3 = crochetG(C, 'blue')
            // c4 = crochetD(D, 'blue')
          }
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', 0)
          int2 = intervalle(C, D, 'blue', 0)
          texte = 'Donner si possible, une écriture simplifiée de'
          if (test === 1) {
            texte += ` $I=]-\\infty;${b}] \\cup [${c};${d}].$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $]-\\infty;${b}]$ ou bien dans $[${c};${d}]$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc <br>'
            texteCorr += `$I=]-\\infty;${b}] \\cup [${c};${d}].$`
          }
          if (test === 2) {
            texte += ` $I=]-\\infty;${b}] \\cup [${c};${d}].$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $]-\\infty;${b}]$ ou bien dans $[${c};${d}]$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc <br>'
            texteCorr += `$I=]-\\infty;${b}] \\cup [${c};${d}].$`
          }

          if (test === 3) {
            texte += `$I=]-\\infty;${b}]\\cup]${c};${d}]$`
            texteCorr = `<br>On cherche les réels qui sont ou bien dans $]-\\infty;${b}]$ ou bien dans $[${c};${d}]$, ou dans les deux.`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc <br>'
            texteCorr += `$I=]-\\infty;${b}] \\cup [${c};${d}].$`
          }
          if (test === 4) {
            texte += `$I=[${a};${b}[\\cup]${c};+\\infty[$`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc <br>'
            texteCorr += `$I=[${a};${b}[\\cup]${c};+\\infty[$`
          }
          if (test === 5) {
            texte += `$I=[${a};${b}[\\cup[${c};+\\infty[$`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc <br>'
            texteCorr += `$I=[${a};${b}[\\cup[${c};+\\infty[$`
          }
          if (test === 6) {
            texte += `$I=]${a};${b}]\\cup]${c};+\\infty[$`
            texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'
            texteCorr += 'On observe que les deux intervalles sont disjoints donc <br>'
            texteCorr += `$I=[${a};${b}]\\cup]${c};+\\infty[$`
          }

          break
        case 9:
          a = randint(1, 15)
          e = a + 4
          b = randint(29, 45)
          e = b - 1
          c = randint(16, e)
          e = b + 1
          d = randint(e, 65)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          A = point(2, 0, a)
          B = point(6, 0, b)
          C = point(5, 0, c)
          D = point(9, 0, d)
          c1 = crochetG(A, 'red')
          c2 = crochetD(B, 'red')
          c3 = crochetD(C, 'blue')
          c4 = crochetG(D, 'blue')
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', -0.1)
          int2 = intervalle(C, D, 'blue', 0.1)
          texte = `Donner si possible, une écriture simplifiée de $I=]${a};${b}[ \\cap [${c};${d}].$`

          texteCorr = `<br>On cherche les réels qui sont à la fois dans $]${a};${b}[$ et dans $[${c};${d}]$.`
          texteCorr += '<br>On regarde la partie de l\'intervalle qui est coloriée à la fois en bleu et en rouge :<br>'
          texteCorr += `$I=[${c};${b}[$`
          break
        case 10:
          a = randint(1, 15)
          e = a + 4
          b = randint(29, 45)
          e = b - 1
          c = randint(16, e)
          e = b + 1
          d = randint(e, 65)
          s = segment(0, 0, 10, 0)
          s.styleExtremites = '->'

          A = point(2, 0, a)
          B = point(6, 0, b)
          C = point(5, 0, c)
          D = point(9, 0, d)
          c1 = crochetG(A, 'red')
          c2 = crochetD(B, 'red')
          c3 = crochetG(C, 'blue')
          c4 = crochetD(D, 'blue')
          int = intervalle(X1, X2, 'black', 0)
          int1 = intervalle(A, B, 'red', -0.1)
          int2 = intervalle(C, D, 'blue', 0.1)
          texte = `Donner si possible, une écriture simplifiée de $I=]${a};${b}[ \\cup ]${c};${d}[.$`

          texteCorr = `<br>On cherche les réels qui sont ou bien dans $]${a};${b}[$, ou bien dans $]${c};${d}[$.`
          texteCorr += '<br>On donc regarde la partie de l\'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>'
          texteCorr += `$I=]${a};${d}[$`
          break
      }
      texteCorr += mathalea2d({
        xmin: -2,
        ymin: -2,
        xmax: 15,
        ymax: 2
      }, int, int1, int2, c1, c2, c3, c4)
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
