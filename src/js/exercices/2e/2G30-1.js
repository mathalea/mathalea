import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texFraction, texFractionReduite, pgcd, ecritureParentheseSiNegatif, unSiPositifMoinsUnSinon } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = "Déterminer le coefficient directeur d'une droite"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * 2G30-1, ex 2G50
*/
export const uuid = '1ea16'
export const ref = '2G30-1'
export default function CoefficientDirecteurDeDroite () {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const typeQuestionsDisponibles = ['Droite oblique', 'Droite oblique', 'Droite oblique', 'Droite oblique', 'Droite verticale'] // On créé 2 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, xA, yA, xB, yB, n, d, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      if (!this.interactif) {
        this.consigne = "Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal.  Déterminer, s'il existe et en l'expliquant, le coefficient directeur de la droite $\\bm{(AB)}$,"
      } else {
        this.consigne = "Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal.  Déterminer, s'il existe et en l'expliquant, le coefficient directeur de la droite $\\bm{(AB)}$, écrire 'non' si la droite n'a pas de coefficicient directeur,"
      }
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'Droite oblique':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = randint(-5, 5, xA)
          yB = randint(-5, 5)
          n = yB - yA
          d = xB - xA

          texte = `avec $A(${xA};${yA})$ et $B(${xB};${yB})$. `
          texteCorr = 'On observe que $ x_B\\neq x_A$.'
          texteCorr += "<br>La droite $(AB)$ n'est donc pas verticale."
          texteCorr += '<br>On peut donc calculer le coefficient directeur de la droite.'
          texteCorr += "<br>On sait d'après le cours : $m=\\dfrac{y_B-y_A}{x_B-x_A}$."
          texteCorr += `<br>On applique avec les données de l'énoncé : $m=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=${texFraction(n, d)}`
          if ((pgcd(n, d) !== 1 || d === 1 || d < 0) && n !== 0) {
            texteCorr += `=${texFractionReduite(n, d)}`
          }
          texteCorr += '$'
          setReponse(this, i, texFractionReduite(n, d))
          if (context.isAmc) {
            n = unSiPositifMoinsUnSinon(n) * unSiPositifMoinsUnSinon(d) * Math.abs(n)
            d = Math.abs(d)
            this.autoCorrection[i] = {
              enonce: `Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal. Soit $A(${xA};${yA})$ et $B(${xB};${yB})$.<br>Déterminer, s'il existe, le coefficient directeur de la droite $\\bm{(AB)}$ sous la forme d'une fraction irréductible (coder deux fois zéro si le coefficient n'existe pas).<br>`,
              propositions: [
                {
                  type: 'qcmMono',
                  propositions: [{
                    texte: 'Le coefficient existe',
                    statut: true,
                    feedback: "On observe que $ x_B\\neq x_A$, donc la droite n'est pas verticale et elle a un coefficient directeur."
                  },
                  {
                    texte: "Le coefficient n'existe pas",
                    statut: false,
                    feedback: "On observe que $ x_B\\neq x_A$, donc la droite n'est pas verticale et elle a un coefficient directeur."
                  }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [{
                    texte: texteCorr,
                    statut: '',
                    reponse: {
                      texte: 'numérateur',
                      valeur: n,
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
                      texte: 'dénominateur',
                      valeur: d,
                      param: {
                        digits: 1,
                        decimals: 0,
                        signe: false,
                        approx: 0
                      }
                    }
                  }]
                }
              ]
            }
          }
          break
        case 'Droite verticale':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = xA
          yB = randint(-5, 5)
          n = yB - yA
          d = xB - xA

          texte = `avec $A(${xA};${yA})$ et $B(${xB};${yB})$. `
          texteCorr = 'On observe que $ x_B = x_A$.'
          texteCorr += '<br>La droite $(AB)$ est donc verticale.'
          texteCorr += "<br>Elle n'admet donc pas de coefficient directeur."
          setReponse(this, i, ['non', '\\times'])
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal. Soit $A(${xA};${yA})$ et $B(${xB};${yB})$.<br>Déterminer, s'il existe, le coefficient directeur de la droite $\\bm{(AB)}$ sous la forme d'une fraction irréductible (coder deux fois zéro si le coefficient n'existe pas).<br>`,
              propositions: [
                {
                  type: 'qcmMono',
                  propositions: [{
                    texte: 'Le coefficient existe',
                    statut: false,
                    feedback: "On observe que $ x_B = x_A$, donc la droite est verticale et elle n'a pas de coefficient directeur."
                  },
                  {
                    texte: "Le coefficient n'existe pas",
                    statut: true,
                    feedback: "On observe que $ x_B\\neq x_A$, donc la droite n'est pas verticale et elle a un coefficient directeur."
                  }
                  ]
                },
                {
                  type: 'AMCNum',
                  propositions: [{
                    texte: texteCorr,
                    statut: '',
                    reponse: {
                      texte: 'numérateur',
                      valeur: 0,
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
                    texte: texteCorr,
                    statut: '',
                    reponse: {
                      texte: 'dénominateur',
                      valeur: 0,
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

          break
      }
      if (!this.interactif) {
        this.consigne = "Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal.  Déterminer, s'il existe et en l'expliquant, le coefficient directeur de la droite $\\bm{(AB)}$,"
      } else {
        this.consigne = "Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal.  Déterminer, s'il existe et en l'expliquant, le coefficient directeur de la droite $\\bm{(AB)}$, écrire 'non' si la droite n'a pas de coefficicient directeur,"
      }
      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, xA, yA, xB, yB)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
