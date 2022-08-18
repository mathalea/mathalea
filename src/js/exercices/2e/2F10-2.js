import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, reduireAxPlusB, abs, pgcd, texteEnCouleurEtGras, texFraction, miseEnEvidence, ecritureAlgebrique, texFractionReduite } from '../../modules/outils.js'
import { repere, droite, mathalea2d, point, tracePoint, segment, texteParPosition, latexParPoint, vecteur, translation, homothetie } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
import { colorToLatexOrHTML } from '../../modules/2dGeneralites.js'

export const titre = 'Lecture graphique d\'une fonction affine'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**

*/
export default function lecturefonctionaffine () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 3// On complète le nb de questions
  this.tailleDiaporama = 3
  this.video = ''
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.spacingCorr = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    // let typesDeQuestionsDisponibles = []
    // typesDeQuestionsDisponibles = [1, 2]// On complète selon le nb de cas dans l'exo (switch)
    const o = texteParPosition('O', -0.5, -0.5, 'milieu', 'black', 1)

    // const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    this.sup = parseInt(this.sup)
    for (let i = 0, A, a, b, d, r, f, c, t, l, s1, s2, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;) { // on rajoute les variables dont on a besoin
      // typesDeQuestions = listeTypeDeQuestions[i]
      r = repere()// On définit le repère

      if (this.sup === 1) {
        a = randint(0, 10)
        a = a - 5// coefficient directeur
        b = randint(0, 10)
        b = b - 5// ordonnée à l'origine
        if (a === 0 && b === 0) {
          a = 1
        }// On évite la fonction nulle
        c = droite(a, -1, b)
        c.color = colorToLatexOrHTML('red')
        c.epaisseur = 2
        texte = 'Déterminer graphiquement l\'expression algébrique de la fonction affine $f$ représentée ci-dessus :<br>'
        texte += mathalea2d({
          xmin: -6,
          ymin: -6,
          xmax: 6,
          ymax: 6,
          scale: 0.5

        }, r, c, o)// On trace le graphique
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: `$f(x)=${reduireAxPlusB(a, b)}$`,
                  statut: '',
                  reponse: {
                    texte: 'coefficient a de $y=ax+b$',
                    valeur: a,
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'valeur b de $y=ax+b$',
                    valeur: b,
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        } else if (this.interactif) {
          texte += '<br>$f(x) =$' + ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, `${reduireAxPlusB(a, b)}`)
        }

        texteCorr = 'On sait que l\'expression algébrique d\'une fonction affine est de la forme :$f(x)=ax+b$, avec $a$ et $b$ deux réels.<br>'
        texteCorr += 'Le premier coefficient qu\'on peut facilement lire graphiquement est $b$, l\'ordonnée à l\'origine de la droite.<br>'
        texteCorr += `On lit ici que le point $(0;${b}) \\in \\mathcal{C_f}$.<br>`
        texteCorr += `On peut alors conclure que l'ordonnée à l'origine est : $${b}$. <br>`
        texteCorr += 'On peut lire le coefficient directeur de la droite, en lisant le déplacement vertical correspondant à un déplacement horizontal d\'une unité .<br>'
        texteCorr += `On lit alors que le coefficient directeur de la droite est : $${a}$.<br>`
        texteCorr += ' On peut en déduire que l\'expression de la fonction $f$ est'

        texteCorr += `$f(x)=${reduireAxPlusB(a, b)}$<br>`
        texteCorr += mathalea2d({
          xmin: -6,
          ymin: -6,
          xmax: 6,
          ymax: 6,
          scale: 0.5
        }, r, c, o)// On trace le graphique
      }
      if (this.sup === 2) { // cas du coeff directeur fractionnaire
        a = randint(-5, 5, [0]) // numérateut coefficient directeur non nul
        b = randint(-5, 5) // ordonnée à l'origine
        d = randint(2, 5, [a, 2 * a]) // dénominateur coefficient directeur non multiple du numérateur pour éviter nombre entier
        r = repere()// On définit le repère
        c = droite(a / d, -1, b)
        c.color = colorToLatexOrHTML('red')
        c.epaisseur = 2
        texte = 'A partir de la représentation graphique de la droite ci-dessous, donner par lecture graphique son équation réduite'
        texte += mathalea2d({
          xmin: -6,
          ymin: -6,
          xmax: 6,
          ymax: 6,
          scale: 0.5

        }, r, c, o)// On trace le graphique

        texteCorr = 'On sait que l\'équation réduite d\'une droite non verticale est de la forme : $y= ax+b$ avec $a$ et $b$ deux réels non tous deux nuls.<br>'
        texteCorr += 'Le premier coefficient à lire graphiquement est $b$, l\'ordonnée à l\'origine de la droite.<br>'
        texteCorr += 'C\'est l\'ordonnée du point d\'intersection de la droite avec l\'axe des ordonnées.<br>'
        texteCorr += `On lit ici que : $A(0;${b}) \\in (d)$.<br>`
        texteCorr += `On peut alors conclure que l'ordonnée à l'origine est : $b=${b}$. <br>`
        texteCorr += 'On peut lire ensuite le coefficient directeur $a$ de la droite $(d)$.<br>'
        texteCorr += 'On sait que $a=\\dfrac{\\text{Dénivelé vertical}}{\\text{Déplacement horizontal}}$'
        texteCorr += '<br>On cherche un déplacement horizontal (en bleu) correspondant à un déplacement vertical entier (en vert).'
        texteCorr += `<br>On lit que pour un déplacement vers la droite de ${texteEnCouleurEtGras(d + ' unités', 'blue')}, il faut `
        if (a > 0) { texteCorr += 'monter de ' }
        if (a < 0) { texteCorr += 'descendre de ' }
        texteCorr += `${texteEnCouleurEtGras(Math.abs(a) + ' unités', 'green')}.`
        texteCorr += `<br>Il vient : $a=${texFraction(miseEnEvidence(a, 'green'), miseEnEvidence(d, 'blue'))}`
        f = pgcd(a, d)
        if (f !== 1) {
          if (a % d === 0) {
            texteCorr += `=${a / d}`
          } else {
            a /= f
            d /= f
            texteCorr += `=${texFraction(miseEnEvidence(a, 'green'), miseEnEvidence(d, 'blue'))}`
          }
        }
        texteCorr += '$'

        texteCorr += '<br>On peut en déduire que l\'équation réduite de la droite $(d)$ est : $y= '
        if (a === d) { texteCorr += 'x' }
        if (a === -d) { texteCorr += '-x' }
        if (a !== d & a !== -d) { texteCorr += `${texFractionReduite(a, d)}x` }

        if (b !== 0) { texteCorr += `${ecritureAlgebrique(b)}` }
        texteCorr += '$.<br>'
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: `$${texFractionReduite(a, d)}x${ecritureAlgebrique(b)}$`,
                  statut: '',
                  reponse: {
                    texte: 'numérateur (signé) n de $y=\\dfrac{n}{d}x+b$',
                    valeur: a,
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'dénominateur d de $y=\\dfrac{n}{d}x+b$',
                    valeur: d,
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'valeur b de $y=ax+b$',
                    valeur: b,
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        } else if (this.interactif && !context.isAmc) {
          texte += '<br>$y =$' + ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, `${texFractionReduite(a, d)}x${ecritureAlgebrique(b)}`)
        }
        if (a > 0) {
          s1 = segment(0, b - a, -d, b - a, 'blue')
          s2 = segment(0, b - a, 0, b, 'green')
        }
        if (a < 0) {
          s1 = segment(d, b, 0, b, 'blue')
          s2 = segment(d, b, d, b - abs(a), 'green')
        }
        s2.epaisseur = 2
        s1.epaisseur = 2
        s2.styleExtremites = '->'
        s1.styleExtremites = '<-'
        A = point(0, b)

        l = latexParPoint('A', translation(A, homothetie(vecteur(-a, d), A, 0.5 / Math.sqrt(a ** 2 + d ** 2)), 'A', 'center'), 'red', 10, 10, '') // Variable qui trace les points avec une croix
        t = tracePoint(A, 'red')// Variable qui trace les nom s A et B
        t.taille = 3
        t.epaisseur = 2
        // l.color = colorToLatexOrHTML('red')
        if (a !== 0) {
          texteCorr += mathalea2d({
            xmin: -8,
            ymin: -10,
            xmax: 8,
            ymax: 10,
            scale: 0.5

          }, r, s1, s2, t, l, c, o)
        }// On trace le graphique
      }

      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Types de question ', 2, '1 : Valeurs entières\n2 : Valeurs fractionnaires.']
}
