import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListesSansChangerOrdre, randint, arrondi, calcul, texNombrec, choice, texNombre, texPrix, range1, prenom, personne, miseEnEvidence, stringNombre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { afficheCoteSegment, codageSegments, homothetie, point, polygoneRegulier, segment, texteSurSegment } from '../../modules/2d.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import Decimal from 'decimal.js'
export const titre = 'CAN Spéciale année 2024'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '20/12/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export default function CourseAuxNombres2024 (numeroExercice) {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(12), this.nbQuestions)
    } else {
      if (typeof this.sup === 'number') {
        // Si c'est un nombre c'est qu'il y a qu'une seule question
        questions[0] = this.sup
        this.nbQuestions = 1
      } else {
        questions = this.sup.split('-') // Sinon on créé un tableau à partir des valeurs séparées par des -
        this.nbQuestions = questions.length
      }
    }
    for (let i = 0; i < questions.length; i++) {
      questions[i] = parseInt(questions[i]) - 1
    }
    const listeIndex = combinaisonListesSansChangerOrdre(questions, this.nbQuestions)
    const fruits2 = [
      ['pêches', 4.5, 10, 30],
      ['noix', 5.2, 4, 13],
      ['cerises', 6.4, 11, 20],
      ['pommes', 2.7, 20, 40],
      ['framboises', 10.5, 1, 5],
      ['fraises', 7.5, 5, 10],
      ['citrons', 1.8, 15, 30],
      ['bananes', 1.7, 15, 25]
    ]

    const typeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]//

    for (let i = 0, index = 0, nbChamps, reponse, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      // texNombre(n) permet d'écrire un nombre avec le bon séparateur décimal !! à utiliser entre $  $
      // calcul(expression) permet d'éviter les erreurs de javascript avec les approximations décimales
      // texNombrec(expression) fait les deux choses ci-dessus.
      switch (typeQuestionsDisponibles[listeIndex[i]]) { // Suivant le type de question, le contenu sera différent
        case 1:
          texte = `$${texNombre(2024)}\\times 2$`
          texteCorr = `$${texNombre(2024)}\\times 2=${texNombre(4048)}$`
          reponse = 4048
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 2:
          texte = `$${texNombre(2024)}\\div 2$`
          texteCorr = `$${texNombre(2024)}\\div 2=${texNombre(1012)}$`
          reponse = 1012
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break
        case 3:
          texte = `La moitié de $${texNombre(2024)}$.`
          texteCorr = `La moité de $${texNombre(2024)}$ est $${texNombre(2024)}\\div 2=${texNombre(1012)}$`
          reponse = 1012
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break
        case 4:
          texte = `Le quart de $${texNombre(2024)}$.`
          texteCorr = `Le quart de $${texNombre(2024)}$ est $${texNombre(2024)}\\div 4=${texNombre(506)}$`
          reponse = 506
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 5:
          {
            const a = randint(78, 299, [100, 200])
            texte = `$${texNombre(2024)}+${a}$`
            texteCorr = `$${texNombre(2024)}+${a}=${texNombre(a + 2024, 0)}$`
            reponse = 2024 + a
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
            nbChamps = 1
          }
          break

        case 6:
          {
            const a = randint(78, 299, [100, 200])
            texte = `$${texNombre(2024)}-${a}$`
            texteCorr = `$${texNombre(2024)}-${a}=${texNombre(2024 - a, 0)}$`
            reponse = 2024 - a
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
            nbChamps = 1
          }
          break
        case 7:
          {
            const a = randint(78, 299, [100, 200])
            texte = `$${a}-${texNombre(2024)}$`
            texteCorr = `$${a}-${texNombre(2024)}=${texNombre(a - 2024, 0)}$`
            reponse = a - 2024
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
            nbChamps = 1
          }
          break

        case 8:
          texte = `Écriture scientifique de $${texNombre(2024)}$.`
          texteCorr = `L'écriture scientique de $${texNombre(2024)}$ est $2,024\\times 10^{3}$.`
          reponse = '2,024\\times 10^{3}'
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 9:
          {
            const calc = [10, 100, 1000]
            const calc1 = choice(calc)
            texte = ` $${texNombre(2024)}\\times ${calc1}$`
            texteCorr = `$${texNombre(2024)}\\times ${calc1}=${texNombre(2024 * calc1, 0)}$`
            reponse = arrondi(calc1 * 2024, 0)
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
            nbChamps = 1
          }
          break

        case 10:
          {
            const a = new Decimal(1).div(choice([10, 100, 1000]))
            texte = ` $${texNombre(2024)}\\times ${texNombre(a, 3)}$`
            texteCorr = `$${texNombre(2024)}\\times ${texNombre(a, 3)}=${texNombre(2024 * a, 3)}$`
            reponse = arrondi(a * 2024, 3)
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
            nbChamps = 1
          }
          break
        case 11:
          {
            const a = new Decimal(2024).div(choice([10, 100, 1000]))
            const calc = [10, 100, 1000]
            const calc1 = choice(calc)
            const choix = choice([true, false])
            if (choix === true) {
              reponse = arrondi(a * calc1, 3)
              texte = `$${texNombre(a, 3)}\\times ${texNombre(calc1)}$`

              texteCorr = ` $${texNombre(a, 3)}\\times ${texNombre(calc1)}=${texNombre(a * calc1, 3)}$ `
              setReponse(this, index, reponse, { formatInteractif: 'calcul' })
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
              }
            } else {
              const a = new Decimal(2024).div(choice([10, 100, 1000]))
              const calc = [10, 100, 1000]
              const calc1 = choice(calc)
              const calc2 = new Decimal(1).div(calc1)
              reponse = arrondi(a * calc2, 6)
              texte = `$${texNombre(a, 3)}\\times ${texNombre(calc2)}$`
              texteCorr = ` $${texNombre(a, 3)}\\times ${texNombre(calc2)}=${texNombre(a * calc2, 6)}$ `
              setReponse(this, index, reponse, { formatInteractif: 'calcul' })
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
              }
            }

            nbChamps = 1
          }
          break
        case 12:
          {
            const choix = choice([true, false])

            if (choix === true) {
              reponse = 20.24
              texte = `$${texNombre(2024)}$ cm  $=$`

              texteCorr = `
          Comme $1$ m $=100$ cm, alors $1$ cm $=0,01$ m.<br>
          Ainsi  $${texNombre(2024)}$ cm$=${texNombre(2024 / 100, 2)}$ m.  `
              setReponse(this, index, reponse, { formatInteractif: 'calcul' })
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm'
              } else { texte += '  $\\ldots$ m' }
            } else {
              reponse = 202400
              texte = `$${texNombre(2024)}$ m  $=$ `
              texteCorr = ` Comme $1$ m $=100$ cm,  alors $${texNombre(2024)}$ m$=${texNombre(202400)}$ cm.`
              setReponse(this, index, reponse, { formatInteractif: 'calcul' })
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
              } else { texte += '  $\\ldots$ cm' }
            }

            nbChamps = 1
          }
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
