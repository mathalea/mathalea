import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu, combinaisonListes, prenomPronom, premiereLettreEnMajuscule, texNombre } from '../../modules/outils.js'
import Decimal from 'decimal.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const interactifReady = true
export const interactifType = 'qcm'
export const titre = 'Utiliser les ordres de grandeur pour vérifier ses résultats'

export const dateDePublication = '23/05/2022'

/**
 * @author Guillaume Valmont
 * Référence 4C36
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 5
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const problemes = [
      {
        intitule: 'la distance entre la Terre et la Lune',
        puissanceDe10: 5,
        unite: 'km'
      },
      {
        intitule: 'le rayon de la Terre',
        puissanceDe10: 3,
        unite: 'km'
      },
      {
        intitule: 'la hauteur d\'un immeuble',
        puissanceDe10: 2,
        unite: 'm'
      },
      {
        intitule: 'la longueur d\'un smartphone',
        puissanceDe10: -1,
        unite: 'm'
      },
      {
        intitule: 'la longueur d\'une fourmi',
        puissanceDe10: -3,
        unite: 'm'
      },
      {
        intitule: 'la masse d\'un camion',
        puissanceDe10: 4,
        unite: 'kg'
      },
      {
        intitule: 'la masse d\'une voiture',
        puissanceDe10: 3,
        unite: 'kg'
      },
      {
        intitule: 'la masse d\'une pomme',
        puissanceDe10: -1,
        unite: 'kg'
      },
      {
        intitule: 'le volume d\'une bouteille d\'eau',
        puissanceDe10: 0,
        unite: 'L'
      },
      {
        intitule: 'le volume d\'une bouteille d\'eau',
        puissanceDe10: 0,
        unite: 'dm³'
      },
      {
        intitule: 'le volume d\'une bouteille d\'eau',
        puissanceDe10: -3,
        unite: 'm³'
      },
      {
        intitule: 'le volume d\'une bouteille d\'eau',
        puissanceDe10: 3,
        unite: 'mm³'
      },
      {
        intitule: 'la superficie d\'une salle de classe',
        puissanceDe10: 1,
        unite: 'm²'
      },
      {
        intitule: 'la surface d\'une table',
        puissanceDe10: 0,
        unite: 'm²'
      }
    ]
    const justesseResultats = combinaisonListes([-1, 0, 1], this.nbQuestions)
    for (let i = 0, texte, texteCorr, resultatObtenu, puissanceObtenue, remarque, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const prenom = prenomPronom()
      const probleme = problemes[randint(0, problemes.length - 1)]
      resultatObtenu = new Decimal(randint(101, 499)).div(100)
      let QCMPossible = false
      let QCMImpossible = true
      switch (justesseResultats[i]) {
        case 1:
          puissanceObtenue = probleme.puissanceDe10 + 2
          remarque = 'Ce qui est beaucoup trop !'
          break
        case 0:
          puissanceObtenue = probleme.puissanceDe10
          remarque = 'Ce qui correspond bien à l\'ordre de grandeur qu\'on pouvait attendre'
          QCMPossible = true
          QCMImpossible = false
          break
        case -1:
          puissanceObtenue = probleme.puissanceDe10 - 2
          remarque = 'Ce qui est trop peu !'
          break
      }
      resultatObtenu = resultatObtenu.times(10 ** puissanceObtenue)
      texte = `${prenom[0]} a calculé ${probleme.intitule} et a obtenu $${texNombre(resultatObtenu)}$ ${probleme.unite}.<br>Que penser de ce résultat ?`
      texteCorr = `${premiereLettreEnMajuscule(prenom[1])} a obtenu un résultat de l'ordre de $10^{${puissanceObtenue}}$ ${probleme.unite}. `
      texteCorr += remarque
      if (justesseResultats[i] !== 0) texteCorr += `<br>${premiereLettreEnMajuscule(probleme.intitule)} serait plutôt de l'ordre de grandeur de $10^{${probleme.puissanceDe10}}$ ${probleme.unite}.`

      this.autoCorrection[i] = {
        enonce: texte,
        propositions: [
          {
            texte: 'C\'est possible',
            statut: QCMPossible, // true ou false pour indiquer si c'est une bonne réponse (true)
            feedback: '' // qui s'affichera si la réponse est juste ou s'il n'y a qu'une erreur
          },
          {
            texte: 'C\'est impossible !',
            statut: QCMImpossible, // true ou false pour indiquer si c'est une bonne réponse (true)
            feedback: ''
          }
        ],
        options: {
          ordered: true, // (true si les réponses doivent rester dans l'ordre ci-dessus, false s'il faut les mélanger),
          vertical: true, // facultatif. true : si on veut une présentation en plusieurs colonnes. false : valeur par défaut, les cases à cocher sont à la suite, toutes sur une colonne. Exercice-témoin : can5A01
          nbCols: 2 // Le nb de colonnes si vertical est true. Sans effet si vertical est false.
        }
      }
      const monQcm = propositionsQcm(this, i) // Les deux paramètres sont obligatoires et désignent, respectivement, l'exercice appelant, le numéro de la question dans la programmation de l'exercice.
      if (this.interactif) {
        texte += monQcm.texte // enonce est l'énoncé global de l'exercice
        texteCorr += '<br>' + monQcm.texteCorr // texteCorr est la correction globale de l'exercice
      }
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
