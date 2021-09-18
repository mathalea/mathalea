import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, listeQuestionsToContenu, texNombre,combinaisonListes,choice,nombreEnLettres} from '../../modules/outils.js'
import math, { randomInt } from 'mathjs'
export const titre = 'Écrire un petit nombre entier en chiffres ou en lettres'

/**
 * Ecrire en chiffres ou en lettres un nombre entier inférieur à 1 000 000.
 * Avec des paramètres sur le nombre de chiffres des nombres voulus
 * Avec des paramètres sur la présence obligatoire de nombres avec 80 (et ses copains qui n'aiment pas mettre de S dans leur vin) et avec 100 (et ses copains comme ceux de 80) 
 * Inspiration de 3A14 et de 6N10
 * @author Eric Elter (Deseux) - C'est mon premier exo : soyez tolérant. 
 * Référence c3N10-1
 * Septembre 2021 (j'espère !)
*/
export default function C3N101 () {
  Exercice.call(this)
  this.consigne = 'Calcule'
  this.nbQuestions = 5

  this.besoinFormulaireTexte = ['Type de nombres',' Choix séparés par des tirets\n2 : À deux chiffres\n3 : À trois chiffres\n4 : À quatre chiffres\n5 : À cinq chiffres\n6 : À six chiffres']
  this.sup = 4 // Valeur du paramètre par défaut
  this.besoinFormulaire2Texte = ['Demande particulière',' Choix séparés par des tirets\n0 : Aucune demande particulière.\n1 : Au moins un nombre contient 80.\n2 : Au moins un nombre contient entre 81 et 99.\n3 : Au moins un nombre contient un multiple de 100.']
  this.sup2 = 0 // Valeur du paramètre par défaut
  this.besoinFormulaire3Numerique = ['Type d\'exercices', 3, '1 : Écrire en lettres un nombre donné en chiffres\n2 : Écrire en chiffres un nombre donné en lettres\n3 : Passer d\'une écriture à l\'autre']
  this.sup3 = 2 // Valeur du paramètre par défaut
 
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 100
  this.video = ''

  this.nouvelleVersion = function () {
    let typeDeConsigne = []
    if (parseInt(this.sup3) === 1) {
      this.consigne = 'Écrire le nombre en chiffres.'
      typeDeConsigne = combinaisonListes([1], this.nbQuestions)
    }
    if (parseInt(this.sup3) === 2) {
      this.consigne = 'Écrire le nombre en lettres.'
      typeDeConsigne = combinaisonListes([2], this.nbQuestions)
    }
    if (parseInt(this.sup3) === 3) {
      this.consigne = 'Passer de l\'écriture en chiffres à celle en lettres et inversement.'
      typeDeConsigne = combinaisonListes([1, 2], this.nbQuestions)
    }
    this.listeQuestions = []
    this.listeCorrections = []

    let QuestionsDisponibles = []
    let listeQuestions = []
    let OptionsDisponibles = [] // Pour envisager les cas particuliers demandés 80, 81... 99 et 100, 200.. 900.
    let listeOptions = []
    
    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = [2, 3, 4, 5, 6]
    } else {
      if (typeof (this.sup) === 'number') { // Je n'ai jamais réussi à rentrer dans ce test.
        this.sup = Math.max(Math.min(parseInt(this.sup),6),2)
        QuestionsDisponibles[0] = this.sup
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = Math.max(Math.min(parseInt(QuestionsDisponibles[i]),6),2) // parseInt en fait un tableau d'entiers comprise entre 2 et 6
        }
      }
    }

    if (!this.sup2) { // Si aucune liste n'est saisie
      OptionsDisponibles = [0]
    } else {
      if (typeof (this.sup2) === 'number') { // Je n'ai jamais réussi à rentrer dans ce test. Ah si, quand on met l'URl dans un navigateur ?
        this.sup2 = Math.max(Math.min(parseInt(this.sup2),3),0)
        OptionsDisponibles[0] = this.sup2
      } else {
        OptionsDisponibles = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < OptionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          OptionsDisponibles[i] = Math.max(Math.min(parseInt(OptionsDisponibles[i]),3),0) // parseInt en fait un tableau d'entiers comprise entre 2 et 6
        }
      }
    }
    for (let i = OptionsDisponibles.length; i < this.nbQuestions; i++) { // on finit de remplir le tableau par des zéros (aucune demande particulière)
      OptionsDisponibles[i] = 0
    }
    

    listeQuestions = combinaisonListes(QuestionsDisponibles, this.nbQuestions)
    listeOptions = combinaisonListes(OptionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const a = randint(1, 12) // Comme la valeur ne sera pas modifiée, on la déclare avec const
      let NombreAEcrire // Comme la valeur sera modifiée, on la déclare avec let
      switch(listeOptions[i]) {
        case 0 :
          NombreAEcrire = randint(1+Math.pow(10,listeQuestions[i]-1),Math.pow(10,listeQuestions[i])-1)
          break
        case 1 :
          NombreAEcrire = 80 + 100*Math.trunc(randint(1+Math.pow(10,listeQuestions[i]-3),Math.pow(10,listeQuestions[i]-2)-1))  // Se termine par 80
          break
          case 2 :
            NombreAEcrire = 80 + randint(1,19)+ 100*Math.trunc(randint(1+Math.pow(10,listeQuestions[i]-3),Math.pow(10,listeQuestions[i]-2)-1))  // Se termine par 80
            if (listeQuestions[i]>4) { // Pour mettre aussi 80 et quelques dans la classe des milliers
              if (choice([true,false])) {
                NombreAEcrire = 1000*(80+ randint(1,19)+ 100*Math.trunc(randint(1+Math.pow(10,listeQuestions[i]-6),Math.pow(10,listeQuestions[i]-5)-1)))+randint(0,999)
              }
            }
            break
          case 3 :
            NombreAEcrire = 100 * Math.trunc(randint(1+Math.pow(10,Math.max(listeQuestions[i]-3,0)),Math.pow(10,Math.max(listeQuestions[i]-2,1))-1))
            if (listeQuestions[i]>5) { 
              if (choice([true,false])) {
                NombreAEcrire = randint(2,9)*100000+randint(101,999)
              }
            }
            break  
      }
      
      if (typeDeConsigne[i] === 1) {
        if (!context.isDiaporama) texte = `$${texNombre(NombreAEcrire)}$ : \\dotfill`
        else texte = `$${texNombre(NombreAEcrire)}$`
        if (!context.isDiaporama) texteCorr = `$${texNombre(NombreAEcrire)}$ : ${nombreEnLettres(NombreAEcrire)}`
        else texteCorr = `${nombreEnLettres(NombreAEcrire)}`
      } else  {
        if (!context.isDiaporama) texte = `${nombreEnLettres(NombreAEcrire)} : \\dotfill`
        else texte = `${nombreEnLettres(NombreAEcrire)}`
        if (!context.isDiaporama) texteCorr = `${nombreEnLettres(NombreAEcrire)} : $${texNombre(NombreAEcrire)}$`
        else texteCorr = `$${texNombre(NombreAEcrire)}$`
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
