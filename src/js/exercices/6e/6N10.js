import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, listeQuestionsToContenu, texNombre, combinaisonListes, choice, nombreEnLettres, shuffle, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Écrire un nombre entier en chiffres ou en lettres'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC

export const interactifReady = true
export const interactifType = 'mathLive'

// Gestion de la date de publication initiale
export const dateDePublication = '19/09/2021'
export const dateDeModifImportante = '14/09/2022'

/**
 * Écrire en chiffres ou en lettres un nombre entier inférieur à 1 000 000.
 * Avec des paramètres sur le nombre de chiffres des nombres voulus
 * Avec des paramètres sur la présence obligatoire de nombres avec 80 (et ses copains qui n'aiment pas mettre de S dans leur vin) et avec 100 (et ses copains comme ceux de 80)
 * @author Eric Elter
 * Référence 6N10
 * Relecture : Novembre 2021 par EE
*/
export const uuid = '0688e'
export const ref = '6N10'
export default function ÉcrirePetitsNombresEntiers () {
  Exercice.call(this)
  this.nbQuestions = 5

  this.besoinFormulaireTexte = ['Type de nombres', 'Choix séparés par des tirets\n2 : À deux chiffres\n3 : À trois chiffres\n4 : À quatre chiffres\n5 : À cinq chiffres\n6 : À six chiffres\n7 : À neuf chiffres\n8 : À douze chiffres']
  this.sup = 4 // Valeur du paramètre par défaut
  this.besoinFormulaire2Texte = ['Demande particulière', 'Choix séparés par des tirets\n0 : Aucune demande particulière.\n1 : Au moins un nombre se termine par 80.\n2 : Au moins un nombre contient entre 81 et 99.\n3 : Au moins un nombre se termine par un multiple de 100.\n4 : Au moins un nombre commence par mille.\n5 : Au moins un nombre ne possèdant ni centaines ou ni centaines de mille.']
  this.sup2 = 0 // Valeur du paramètre par défaut
  this.besoinFormulaire3Numerique = ['Type d\'exercices', 3, '1 : Écrire en lettres un nombre donné en chiffres\n2 : Écrire en chiffres un nombre donné en lettres\n3 : Passer d\'une écriture à l\'autre']
  this.sup3 = 1 // Valeur du paramètre par défaut

  this.nbCols = 1
  this.nbColsCorr = 1
  this.tailleDiaporama = 3
  this.video = ''

  this.nouvelleVersion = function () {
    let typeDeConsigne = []
    if (parseInt(this.sup3) === 1) {
      this.consigne = 'Écrire le nombre en lettres.'
      typeDeConsigne = combinaisonListes([1], this.nbQuestions)
    }
    if (parseInt(this.sup3) === 2) {
      this.consigne = 'Écrire le nombre en chiffres.'
      typeDeConsigne = combinaisonListes([2], this.nbQuestions)
      if (this.interactif) this.consigne = 'Écrire le nombre en chiffres sans oublier les espaces.'
    }
    if (parseInt(this.sup3) === 3) {
      this.consigne = 'Passer de l\'écriture en chiffres à celle en lettres et inversement.'
      typeDeConsigne = combinaisonListes([1, 2], this.nbQuestions)
    }
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let QuestionsDisponibles = []
    let listeQuestions = []
    let OptionsDisponibles = [] // Pour envisager les cas particuliers demandés 80, 81... 99 et 100, 200.. 900.
    let listeOptions = []

    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = [2, 3, 4, 5, 6, 7, 8]
    } else {
      if (typeof (this.sup) === 'number') { // Je n'ai jamais réussi à rentrer dans ce test.
        this.sup = Math.max(Math.min(parseInt(this.sup), 8), 2)
        QuestionsDisponibles[0] = this.sup
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(2, 8, parseInt(QuestionsDisponibles[i]), 2)
        }
      }
    }
    if (!this.sup2) { // Si aucune liste n'est saisie
      OptionsDisponibles = [0]
    } else {
      if (typeof (this.sup2) === 'number') { // Je n'ai jamais réussi à rentrer dans ce test. Ah si, quand on met l'URl dans un navigateur ?
        this.sup2 = Math.max(Math.min(parseInt(this.sup2), 5), 0)
        OptionsDisponibles[0] = this.sup2
      } else {
        OptionsDisponibles = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < OptionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          OptionsDisponibles[i] = Math.max(Math.min(parseInt(OptionsDisponibles[i]), 5), 0) // parseInt en fait un tableau d'entiers comprise entre 2 et 6
        }
      }
    }
    for (let i = OptionsDisponibles.length; i < this.nbQuestions; i++) { // on finit de remplir le tableau par des zéros (aucune demande particulière)
      OptionsDisponibles[i] = 0
    }

    listeQuestions = combinaisonListes(QuestionsDisponibles, this.nbQuestions)
    listeOptions = shuffle(OptionsDisponibles)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let NombreAEcrire // Comme la valeur sera modifiée, on la déclare avec let
      switch (listeOptions[i]) {
        case 0 :
          if (listeQuestions[i] < 7) {
            NombreAEcrire = randint(1 + Math.pow(10, listeQuestions[i] - 1), Math.pow(10, listeQuestions[i]) - 1)
          } else if (listeQuestions[i] === 7) {
            NombreAEcrire = randint(1 + Math.pow(10, 8), Math.pow(10, 9) - 1)
          } else {
            NombreAEcrire = randint(1 + Math.pow(10, 11), Math.pow(10, 12) - 1)
          }
          if (!context.isHtml) {
            this.canEnonce = `Écrire le nombre en chiffres.


            ${nombreEnLettres(NombreAEcrire)}`
            this.correction = this.listeCorrections[0]
            this.canReponseACompleter = ''
          }
          break
        case 1 : // Se termine par 80
          if (listeQuestions[i] < 7) {
            NombreAEcrire = 80 + 100 * Math.trunc(randint(1 + Math.pow(10, listeQuestions[i] - 3), Math.pow(10, listeQuestions[i] - 2) - 1)) // Se termine par 80
          } else if (listeQuestions[i] === 7) {
            NombreAEcrire = 80 + 100 * Math.trunc(randint(1 + Math.pow(10, 6), Math.pow(10, 7) - 1))
          } else {
            NombreAEcrire = 80 + 100 * Math.trunc(randint(1 + Math.pow(10, 9), Math.pow(10, 10) - 1))
          }
          if (!context.isHtml) {
            this.canEnonce = `Écrire le nombre en chiffres.


            ${nombreEnLettres(NombreAEcrire)}`
            this.correction = this.listeCorrections[0]
            this.canReponseACompleter = ''
          }
          break
        case 2 : // Contient 80 et quelques
          if (listeQuestions[i] < 5) {
            NombreAEcrire = 80 + randint(1, 19) + 100 * Math.trunc(randint(1 + Math.pow(10, listeQuestions[i] - 3), Math.pow(10, listeQuestions[i] - 2) - 1)) // Se termine par 80
          } else if (listeQuestions[i] < 7) { // Pour mettre aussi 80 et quelques dans la classe des milliers
            if (choice([true, false])) {
              NombreAEcrire = Math.pow(10, 3) * (80 + randint(1, 19) + 100 * Math.trunc(randint(1 + Math.pow(10, listeQuestions[i] - 6), Math.pow(10, listeQuestions[i] - 5) - 1))) + randint(0, 999)
            } else {
              NombreAEcrire = 80 + randint(1, 19) + 100 * Math.trunc(randint(1 + Math.pow(10, listeQuestions[i] - 3), Math.pow(10, listeQuestions[i] - 2) - 1)) // Se termine par 80
            }
          } else if (listeQuestions[i] === 7) { // Pour mettre aussi 80 et quelques dans la classe des millions
            if (choice([1, 2, 3]) === 3) {
              NombreAEcrire = Math.pow(10, 6) * (80 + randint(1, 19) + 100 * randint(1, 9)) + randint(0, 999999)
            } else if (choice([true, false])) {
              NombreAEcrire = Math.pow(10, 6) * randint(101, 999) + Math.pow(10, 3) * (80 + randint(1, 19) + 100 * Math.trunc(randint(11, 99))) + randint(0, 999)
            } else {
              NombreAEcrire = Math.pow(10, 3) * randint(100001, 999999) + (80 + randint(1, 19) + 100 * randint(1, 9))
            }
          } else { // Pour mettre aussi 80 et quelques dans la classe des milliards
            if (choice([1, 2, 3, 4]) === 4) {
              NombreAEcrire = Math.pow(10, 9) * (80 + randint(1, 19) + 100 * randint(1, 9)) + randint(0, 999999999)
            } else if (choice([1, 2, 3]) === 3) {
              NombreAEcrire = Math.pow(10, 9) * randint(101, 999) + Math.pow(10, 6) * (80 + randint(1, 19) + 100 * randint(1, 9)) + randint(0, 999999)
            } else if (choice([true, false])) {
              NombreAEcrire = Math.pow(10, 6) * randint(100001, 999999) + Math.pow(10, 3) * (80 + randint(1, 19) + 100 * randint(1, 9)) + randint(0, 999)
            } else {
              NombreAEcrire = Math.pow(10, 3) * randint(100000001, 999999999) + 80 + randint(1, 19) + 100 * randint(1, 9)
            }
          }
          if (!context.isHtml) {
            this.canEnonce = `Écrire le nombre en chiffres.


            ${nombreEnLettres(NombreAEcrire)}`
            this.correction = this.listeCorrections[0]
            this.canReponseACompleter = ''
          }
          break
        case 3 : // Se termine par 100
          if (listeQuestions[i] < 7) {
            NombreAEcrire = 100 * Math.trunc(10 * randint(1 + Math.pow(10, Math.max(listeQuestions[i] - 4, -1)), Math.pow(10, Math.max(listeQuestions[i] - 3, 0)) - 1) + randint(2, 8)) // Ne pas mettre 9 à la place de 8, sinon on pourrait obtenir 10 pour des nombres à 3 chiffres
          } else if (listeQuestions[i] === 7) {
            NombreAEcrire = 100 * (randint(Math.pow(10, 5), Math.pow(10, 6)) * 10 + randint(2, 9))
          } else {
            NombreAEcrire = 100 * (randint(Math.pow(10, 8), Math.pow(10, 9)) * 10 + randint(2, 9))
          }
          if (!context.isHtml) {
            this.canEnonce = `Écrire le nombre en chiffres.


            ${nombreEnLettres(NombreAEcrire)}`
            this.correction = this.listeCorrections[0]
            this.canReponseACompleter = ''
          }
          break
        case 4 : // Commence par mille.... (et non un-mille...)
          NombreAEcrire = 1000 + randint(1, 999)
          break
        case 5 : // Pas de centaines ou pas de centaines de mille
          if (listeQuestions[i] === 7) {
            NombreAEcrire = Math.trunc(Math.pow(10, 7) * randint(1, 9)) + randint(1, 99999)
          } else if (listeQuestions[i] > 3) {
            NombreAEcrire = 1000 * (randint(Math.pow(10, listeQuestions[i] - 4), Math.pow(10, listeQuestions[i] - 3) - 1)) + randint(1, 99)
          } else {
            NombreAEcrire = randint(1 + Math.pow(10, 1), Math.pow(10, 2) - 1)
          }
          if (!context.isHtml) {
            this.canEnonce = `Écrire le nombre en chiffres.


            ${nombreEnLettres(NombreAEcrire)}`
            this.correction = this.listeCorrections[0]
            this.canReponseACompleter = ''
          }
          break
      }

      if (typeDeConsigne[i] === 1) {
        setReponse(this, i, nombreEnLettres(NombreAEcrire))
        if (context.vue !== 'diap') texte = `$${texNombre(NombreAEcrire)} ${!this.interactif ? ' : \\dotfill $' : '$ <br>' + ajouteChampTexteMathLive(this, i)}`
        else texte = `$${texNombre(NombreAEcrire)}$`
        if (context.vue !== 'diap') texteCorr = `$${texNombre(NombreAEcrire)}$ : ${nombreEnLettres(NombreAEcrire)}`
        else texteCorr = `${nombreEnLettres(NombreAEcrire)}`
      } else {
        setReponse(this, i, texNombre(NombreAEcrire), { formatInteractif: 'texte' })
        if (context.vue !== 'diap') texte = `${nombreEnLettres(NombreAEcrire)} ${!this.interactif ? ' : $\\dotfill$' : ' <br>' + ajouteChampTexteMathLive(this, i, 'college6eme')}`
        else texte = `${nombreEnLettres(NombreAEcrire)}`
        if (context.vue !== 'diap') texteCorr = `${nombreEnLettres(NombreAEcrire)} : $${texNombre(NombreAEcrire)}$`
        else texteCorr = `$${texNombre(NombreAEcrire)}$`
      }

      if (context.isAmc) {
        this.autoCorrection[i] =
        {
          enonce: texte + '<br>',
          propositions: [
            {
              texte: texteCorr,
              statut: 1, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
              sanscadre: true
            }
          ]
        }
      }

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
