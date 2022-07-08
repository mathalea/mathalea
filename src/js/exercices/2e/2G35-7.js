import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, abs, reduireAxPlusB, texFractionReduite, ecritureAlgebrique, pgcd } from '../../modules/outils.js'
import { repere, droite, segment, tracePoint, labelPoint, point, mathalea2d } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
import Decimal from 'decimal.js'
export const titre = "Lecture graphique des coefficients d'une équation réduite "
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
/**
 2G35-7, ex 2G50-2

*/
export default function lecturegraphiquedeaetb (numeroExercice) {
  Exercice.call(this)

  this.consigne = 'Equation réduite de droite et représentation graphique '
  this.nbQuestions = 3// On complète le nb de questions
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 3
  this.video = ''
  this.spacing = 1
  this.spacingCorr = 1
  this.spacingCorr = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    // let typesDeQuestionsDisponibles = []
    // typesDeQuestionsDisponibles = []// On complète selon le nb de cas dans l'exo (switch)

    // const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, a, b, r, f, c, d, s1, s2, t, l, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;) { // on rajoute les variables dont on a besoin
      if (this.sup === 1) {
        a = randint(-4, 4) // coefficient directeur
        b = randint(-5, 5) // ordonnée à l'origine
        if (a === 0 && b === 0) {
          a = 1
        }// On évite la situation de double nullité
        r = repere()// On définit le repère
        c = droite(a, -1, b) // On définit l'objet qui tracera la courbe dans le repère
        c.color = 'red'
        c.epaisseur = 2
        texte = 'A partir de la représentation graphique de la droite ci-dessous, donner par lecture graphique son équation réduite.<br>'
        texte += mathalea2d({
          xmin: -8,
          ymin: -8,
          xmax: 8,
          ymax: 8,
          scale: 0.5
        }, r, f, c)// On trace le graphique
        if (a === 0) {
          texteCorr = 'On observe que la droite est horizontale. '
          texteCorr += `<br>La droite est l'ensemble des points ayant comme ordonnée : $${b}$ `
          texteCorr += `<br>L'équation réduite de cette droite est donc : $y=${b}$`
        } else {
          texteCorr = 'On sait que l\'équation réduite d\'une droite non verticale est de la forme : $y= ax+b$ avec $a$ et $b$ deux réels non tous deux nuls.<br>'
          texteCorr += 'Le premier coefficient à lire graphiquement est $b$, l\'ordonnée à l\'origine de la droite.<br>'
          texteCorr += 'C\'est l\'ordonnée du point d\'intersection de la droite avec l\'axe des ordonnées.<br>'
          texteCorr += `On lit ici que le point $(0;${b}) \\in (d)$.<br>`
          texteCorr += `On peut alors conclure que l'ordonnée à l'origine est : $b=${b}$. <br>`
          texteCorr += 'On peut lire ensuite le coefficient directeur $a$ de la droite $(d)$.<br>'
          texteCorr += 'On sait que $a=\\dfrac{\\text{Dénivelé vertical}}{\\text{Déplacement horizontal}}$'
          texteCorr += `<br>En lisant le déplacement vertical correspondant à un déplacement horizontal d'une unité, on lit : <br>$a=\\dfrac{\\text{Dénivelé vertical}}{1}=${a}$`
          texteCorr += '<br>On peut en déduire que l\'équation réduite de la droite $(d)$ est :'

          texteCorr += `$y=${reduireAxPlusB(a, b)}$`
        }
        if (b + a < -5 || b + a > 5) {
          s1 = segment(-2, b - 2 * a, -1, b - 2 * a, 'blue')
          s2 = segment(-1, b - 2 * a, -1, b - a, 'blue')

          s1.epaisseur = 4
          s2.epaisseur = 4
          const A = point(0, b, 'A')
          t = tracePoint(A, 'blue') // Variable qui trace les points avec une croix
          l = labelPoint(A)// Variable qui trace les nom s A et B
          l.color = 'blue'
          if (a !== 0) {
            texteCorr += mathalea2d({
              xmin: -8,
              ymin: -8,
              xmax: 8,
              ymax: 8,
              scale: 0.5
            }, r, s1, s2, t, l, c)
          }
        } else {
          s1 = segment(0, b, 1, b, 'blue')
          s2 = segment(1, b, 1, b + a, 'blue')

          s1.epaisseur = 4
          s2.epaisseur = 4
          const A = point(0, b, 'A')
          t = tracePoint(A, 'blue') // Variable qui trace les points avec une croix
          l = labelPoint(A)// Variable qui trace les nom s A et B
          l.color = 'blue'
          if (a !== 0) {
            texteCorr += mathalea2d({
              xmin: -8,
              ymin: -8,
              xmax: 8,
              ymax: 8,
              scale: 0.5
            }, r, s1, s2, t, l, c)
          }
        }
        // On trace le graphique
        setReponse(this, i, 'y=' + reduireAxPlusB(a, b))
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte + '<br>',
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'coefficient directeur',
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
                  statut: '',
                  reponse: {
                    texte: "ordonnée à l'origine",
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
        }
      } else { // cas du coeff directeur fractionnaire
        a = randint(-5, 5, [0]) // numérateur coefficient directeur non nul
        b = randint(-5, 5) // ordonnée à l'origine
        d = randint(2, 5, 3) // dénominateur coefficient directeur
        if (a === 0 && b === 0) {
          a = 1
          d = 3
        }// On évite la situation de double nullité

        r = repere()// On définit le repère
        c = droite(a / d, -1, b) // On définit l'objet qui tracera la courbe dans le repère
        c.color = 'red'
        c.epaisseur = 2// On définit l'objet qui tracera la courbe dans le repère

        texte = 'A partir de la représentation graphique de la droite ci-dessous, donner par lecture graphique son équation réduite.<br>'
        texte += mathalea2d({
          xmin: -6,
          ymin: -6,
          xmax: 6,
          ymax: 6,
          scale: 0.5
        }, r, c)// On trace le graphique
        if (a === 0) {
          texteCorr = 'On observe que la droite est horizontale. '
          texteCorr += `<br>La droite est l'ensemble des points ayant comme ordonnée : $${b}$ `
          texteCorr += `<br>L'équation réduite de cette droite est donc : $y=${b}$`
        } else {
          texteCorr = 'On sait que l\'équation réduite d\'une droite non verticale est de la forme : $y= ax+b$ avec $a$ et $b$ deux réels non tous deux nuls.<br>'
          texteCorr += 'Le premier coefficient à lire graphiquement est $b$, l\'ordonnée à l\'origine de la droite.<br>'
          texteCorr += 'C\'est l\'ordonnée du point d\'intersection de la droite avec l\'axe des ordonnées.<br>'
          texteCorr += `On lit ici que : $A(0;${b}) \\in (d)$.<br>`
          texteCorr += `On peut alors conclure que l'ordonnée à l'origine est : $b=${b}$. <br>`
          texteCorr += 'On peut lire ensuite le coefficient directeur $a$ de la droite $(d)$.<br>'
          texteCorr += 'On sait que $a=\\dfrac{\\text{Dénivelé vertical}}{\\text{Déplacement horizontal}}$'
          texteCorr += '<br>On cherche un déplacement horizontal correspondant à un déplacement vertical entier.'
          texteCorr += `<br>On lit que pour un déplacement vers la droite de ${d} unités, il faut `

          if (a > 0) { texteCorr += 'monter de ' }
          if (a < 0) { texteCorr += 'descendre de ' }
          texteCorr += `${abs(a)} unités.`
          texteCorr += `<br>Il vient : $a=\\dfrac{${a}}{${d}}`
          if (pgcd(a, d) !== 1) {
            texteCorr += `=${texFractionReduite(a, d)}`
          }
          texteCorr += '$'

          texteCorr += '<br>On peut en déduire que l\'équation réduite de la droite $(d)$ est : $y= '
          if (a === d) {
            texteCorr += `x${b !== 0 ? ecritureAlgebrique(b) : ''}`
          } else if (a === -d) {
            texteCorr += `-x${b !== 0 ? ecritureAlgebrique(b) : ''}`
          } else {
            texteCorr += `${texFractionReduite(a, d)}x`
            if (b !== 0) { texteCorr += `${ecritureAlgebrique(b)}=${reduireAxPlusB(new Decimal(a).div(d), b)}` }
          }

          texteCorr += '$.'

          if (a > 0) {
            s1 = segment(0, b - a, -d, b - a, 'blue')
            s1.epaisseur = 4
            s2 = segment(0, b - a, 0, b, 'blue')
          }
          if (a < 0) {
            s1 = segment(0, b, d, b, 'blue')
            s1.epaisseur = 4
            s2 = segment(d, b - abs(a), d, b, 'blue')
          }
          s2.epaisseur = 4
          const A = point(0, b, 'A')
          t = tracePoint(A, 'red') // Variable qui trace les points avec une croix
          l = labelPoint(A)// Variable qui trace les nom s A et B
          l.color = 'red'
          if (a !== 0) {
            texteCorr += mathalea2d({
              xmin: -6,
              ymin: -10,
              xmax: 6,
              ymax: 10,
              scale: 0.5
            }, r, s1, s2, t, l, c)
          }// On trace le graphique
          setReponse(this, i, 'y=' + reduireAxPlusB(new Decimal(a).div(d), b))
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: texte + '<br>',
              propositions: [
                {
                  type: 'AMCNum',
                  propositions: [{
                    texte: texteCorr,
                    statut: '',
                    reponse: {
                      texte: 'coefficient directeur',
                      valeur: new Decimal(a).div(d).toString(),
                      param: {
                        digits: 3,
                        decimals: 2,
                        signe: true,
                        approx: 0
                      }
                    }
                  }]
                },
                {
                  type: 'AMCNum',
                  propositions: [{
                    statut: '',
                    reponse: {
                      texte: "ordonnée à l'origine",
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
          }
        }
      }
      texte += ajouteChampTexteMathLive(this, i)
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
  this.besoinFormulaireNumerique = ['Types de question ', 2, '1 : Valeurs entières.\n2 : Valeurs fractionnaires.']
}
