import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, minToHoraire, minToHour, prenomF, prenom } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
import Hms from '../../modules/Hms'

export const titre = 'Calculer des durées ou déterminer un horaire'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true // pour définir que l'exercice peut servir à AMC
export const amcType = 'AMCHybride'

export const dateDeModifImportante = '02/01/2022' // Correction détaillée

/**
 * Problèmes où il faut calculer la durée d'un évèbement ou un horaire.
 * Paramétrage possible :
 * * 1 : calculs de durées
 * * 2 : calculer l'heure de début
 * * 3 : calculer l'heure de fin
 * * 4 : mélange des 3 types précédents
 * @author Rémi Angot
 * Référence 6D12
 */
export const uuid = 'e960d'
export const ref = '6D12'
export default function CalculsDeDureesOuHoraires () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.sup = 4
  this.spacing = 2
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacingCorr = 2

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const typeDeContexte = combinaisonListes(
      [1, 2, 3, 4, 5],
      this.nbQuestions
    )
    let typesDeQuestions // 1 : calcul de durées // 2 : calcul de l'horaire de début // 3 : calcul de l'horaire de fin // 4 : mélange

    if (this.sup < 4) {
      // que des questions de niveau 1 ou que des questions de niveau 2
      typesDeQuestions = combinaisonListes([this.sup], this.nbQuestions)
    } else {
      // un mélange équilibré de questions
      typesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions)
    }

    const reponses = []
    for (let i = 0, d1, h1, m1, d2, h2, m2, d, h, m, texte, texteCorr, texteInteractif, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // d1 : heure de début (h1 heures m1 min)
      // d2 : heure de fin (h2 heures m2 min)
      // d : durée
      if (typeDeContexte[i] === 1) {
        h1 = randint(20, 22)
        m1 = randint(35, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + 2
        m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = parseInt(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `La diffusion d'un film commence à ${d1} et se termine à ${d2}. Combien de temps a duré ce film ?`
          texteCorr = `${d1}$\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${(h2 - h1 - 1) % 24}~\\text{h}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `Le film dure ${d}.`
          texteInteractif = 'Le film dure'
          reponses[i] = d
        }
        if (typesDeQuestions[i] === 2) {
          texte = `Un film dure ${d} et commence à ${d1}. À quelle heure se terminera-t-il ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += `= ${d2}`
          texteCorr += '<br>'
          texteCorr += `Le film terminera à ${d2}.`
          texteInteractif = 'Le film terminera à'
          reponses[i] = d2
        }
        if (typesDeQuestions[i] === 3) {
          texte = `Un film de ${d} termine à ${d2}. À quelle heure a-t-il commencé ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0) texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `Le film a commencé à ${d1}.`
          texteInteractif = 'Le film a commencé à'
          reponses[i] = d1
        }
      }

      if (typeDeContexte[i] === 2) {
        h1 = randint(20, 23)
        m1 = randint(35, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + 1
        m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        while (d < 27 || d > 75 || d === 60) {
          h1 = randint(20, 23)
          m1 = randint(35, 58)
          d1 = h1 * 60 + m1
          h2 = h1 + 2
          m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2
          d = d2 - d1
        }
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = parseInt(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `Sur son service de streaming favori, ${prenom()} commence à regarder une série à ${d1} et celle-ci se termine à ${d2}. Combien de temps a duré l'épisode ?`
          texteCorr = `${d1}$\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${((h2 - h1 - 1) > 0) ? `${(h2 - h1 - 1) % 24}~\\text{h}` : ''}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `La série a duré ${d}.`
          reponses[i] = d
          texteInteractif = 'La série a duré'
        }
        if (typesDeQuestions[i] === 2) {
          texte = `${prenom()} allume son ordinateur à ${d1} pour regarder une série de ${d}. À quelle heure la série s'achèvera-t-elle ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += `= ${d2}`
          texteCorr += '<br>'
          texteCorr += `La série s'achèvera à ${d2}.`
          reponses[i] = d2
          texteInteractif = 'La série s\'achèvera à'
        }
        if (typesDeQuestions[i] === 3) {
          texte = `${prenom()} termine de regarder une série de ${d} à ${d2}. À quelle heure la série a-t-elle commencé ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0) texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `Elle a commencé à ${d1}.`
          reponses[i] = d1
          texteInteractif = 'La série a commencé à'
        }
      }

      if (typeDeContexte[i] === 3) {
        h1 = randint(8, 21)
        m1 = randint(1, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + randint(1, 2)
        m2 = randint(1, 59) // pas forcément de retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = parseInt(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `Une émission télévisée est diffusée de ${d1} à ${d2}. Combien de temps dure-t-elle ?`
          texteCorr = `${d1}$\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${((h2 - h1 - 1) > 0) ? `${(h2 - h1 - 1) % 24}~\\text{h}` : ''}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `L'émission dure ${d}.`
          reponses[i] = d
          texteInteractif = 'L\'émission dure'
        }
        if (typesDeQuestions[i] === 2) {
          texte = `Une émission télévisée de ${d} commence à ${d1}. À quelle heure s'achèvera-t-elle ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += `= ${d2}`
          texteCorr += '<br>'
          texteCorr += `L'émission s'achèvera à ${d2}.`
          reponses[i] = d2
          texteInteractif = 'L\'émission s\'achèvera à'
        }
        if (typesDeQuestions[i] === 3) {
          texte = `À ${d2}, ${prenom()} termine de regarder une émission de ${d}. À quelle heure l'émission a-t-elle commencé ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0) texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `L'émission a commencé à ${d1}.`
          texteInteractif = 'L\'émission a commencé à'
        }
      }

      if (typeDeContexte[i] === 4) {
        h1 = randint(13, 16)
        m1 = randint(1, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + randint(1, 2)
        m2 = randint(1, 58) // pas forcément de retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        while (d < 27 || d > 75 || d === 60) {
          h1 = randint(13, 16)
          m1 = randint(35, 58)
          d1 = h1 * 60 + m1
          h2 = h1 + randint(1, 2)
          m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2
          d = d2 - d1
        }
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = parseInt(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `Un papa regarde la compétition de gymnastique de sa fille  de ${d1} à ${d2}. Quelle est la durée de cette compétition ?`
          texteCorr = `${d1}$\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${((h2 - h1 - 1) > 0) ? `${(h2 - h1 - 1) % 24}~\\text{h}` : ''}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `La compétition dure ${d}.`
          reponses[i] = d
          texteInteractif = 'La compétition dure'
        }
        if (typesDeQuestions[i] === 2) {
          texte = `Une compétition de gymnastique commence à ${d1} et dure ${d}. À quelle heure sera-t-elle terminée ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += `= ${d2}`
          texteCorr += '<br>'
          texteCorr += `La compétition terminera à ${d2}.`
          reponses[i] = d2
          texteInteractif = 'La compétition terminera à'
        }
        if (typesDeQuestions[i] === 3) {
          texte = `Une compétition de gymnastique qui se termine à ${d2} a duré ${d}. À quelle heure a-t-elle commencé ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0) texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `La compétition a commencé à ${d1}.`
          reponses[i] = d1
          texteInteractif = 'La compétition a commencé à'
        }
      }

      if (typeDeContexte[i] === 5) {
        h1 = randint(8, 15)
        m1 = randint(25, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + randint(2, 5)
        m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        while (d < 27 || d > 75 || d === 60) {
          h1 = randint(20, 23)
          m1 = randint(35, 58)
          d1 = h1 * 60 + m1
          h2 = h1 + 2
          m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2
          d = d2 - d1
        }
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = parseInt(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `Un train part à ${d1} et arrive à destination à ${d2}. Quelle est la durée du trajet ?`
          texteCorr = `${d1}$\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${((h2 - h1 - 1) > 0) ? `${(h2 - h1 - 1) % 24}~\\text{h}` : ''}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `Le trajet dure ${d}.`
          reponses[i] = d
          texteInteractif = 'Le trajet dure'
        }
        if (typesDeQuestions[i] === 2) {
          texte = `${prenomF()} monte dans le train à ${d1} pour un trajet qui doit durer ${d}. À quelle heure arrivera-t-elle ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += `= ${d2}`
          texteCorr += '<br>'
          texteCorr += `Elle arrivera à ${d2}.`
          reponses[i] = d2
          texteInteractif = 'Elle arrivera à'
        }
        if (typesDeQuestions[i] === 3) {
          texte = `Un train arrive en gare à ${d2} après un trajet de ${d}. À quelle heure le voyage a-t-il commencé ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0) texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `Le voyage a commencé à ${d1}.`
          reponses[i] = d1
          texteInteractif = 'Le voyage a commencé à'
        }
      }
      if (context.isAmc) {
        this.autoCorrection[i] =
          {
            enonce: 'Dans chacun des encadrés, montrer une démarche ou un calcul et répondre par une phrase.<br>',
            enonceAvant: false,
            enonceAvantUneFois: true,
            melange: false,
            propositions: [
              {
                type: 'AMCOpen',
                propositions: [
                  {
                    texte: ' ',
                    statut: 3, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                    feedback: '',
                    enonce: texte + '<br>', // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
                    sanscadre: false // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                  }
                ]
              }
            ]
          }
      }
      if (this.interactif) {
        texte += `<div>${texteInteractif} : <span contenteditable="true" id="saisieEx${numeroExercice}Q${i}" style="display: inline-block;
        text-align: center; width: 70px; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;"> &nbsp;</span>
        <span id="feedbackEx${numeroExercice}Q${i}"></span></div>`
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    this.correctionInteractive = (i) => {
      const spanSaisie = document.querySelector(`#exercice${numeroExercice} #saisieEx${numeroExercice}Q${i}`)
      const saisie = Hms.fromString(spanSaisie.innerText)
      const spanFeedback = document.querySelector(`#exercice${numeroExercice} #feedbackEx${numeroExercice}Q${i}`)
      if (saisie.isEqual(Hms.fromString(reponses[i]))) {
        spanFeedback.innerText = '😎'
        return 'OK'
      } else {
        spanFeedback.innerText = '☹️'
        return 'KO'
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    4,
    "1 : Calcul de durées\n2 : Calcul de l'horaire de fin\n3 : Calcul de l'horaire de début\n4 : Mélange"
  ]
}
