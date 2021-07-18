import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, lampeMessage, texteEnCouleur, texteEnCouleurEtGras, calcul, texPrix, prenomF } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Problème - de plus de moins'
export const interactifReady = true
export const interactifType = 'numerique'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Description didactique de l'exercice
 * @author Laurence CANDILLE
 * Référence 6C22
 * publié le 10/7/2021
*/
export default function ProblemesDePlusEtDeMoins () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactif = true

  const nombreDecimales = function (n) {
    let r, e
    if (n === 0) {
      r = randint(40, 70)
      e = randint(10, 30)
    }
    if (n === 1) {
      r = calcul((randint(40, 60) * 100 + randint(1, 9) * 10) / 100) // évite de retomber dans le cas n=0 par ex  4200/100
      e = calcul((randint(10, 20) * 100 + randint(1, 9) * 10) / 100)
    }
    if (n === 2) {
      r = calcul((randint(40, 60) * 100 + randint(1, 9) * 10 + randint(1, 9)) / 100)
      e = calcul((randint(10, 20) * 100 + randint(1, 9) * 10 + randint(1, 9)) / 100)
    }
    return [r, e]
  }
  this.nouvelleVersion = function () {
    const n = parseInt(this.sup) - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.introduction = lampeMessage({
      titre: 'Calculatrice interdite.',
      texte: 'Résoudre le problème suivant au brouillon et écrire la réponse dans la case, ne pas préciser "€" ni "euros" ...',
      couleur: 'nombres'
    })
    const typeQuestionsDisponibles = ['deplus', 'demoins', 'deplus'] // On créé 2 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    let r, e // argent de Romane et écart
    let m // argent de Malika
    let somme // argent total
    let prenom1, prenom2 // choix aleatoire des prenoms des filles
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      prenom1 = prenomF()
      prenom2 = prenomF()
      while (prenom2 === prenom1) {
        prenom2 = prenomF()
      }
      [r, e] = nombreDecimales(n)
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'deplus':
          m = r - e
          somme = m + r

          texte = `<br> ${prenom2} dit à ${prenom1}  : "J'ai ${texPrix(r)}€ soit ${texPrix(e)}€ de plus que toi."<br>`
          if (!context.isAmc) {
            texte += 'Combien d\'argent en tout possèdent les deux filles ?<br>Les deux filles possèdent en tout : '
            texte += ajouteChampTexte(this, i) + '  €'
          } else {
            texte += 'Combien d\'argent en euros possèdent en tout les deux filles ?<br>'
          }
          texteCorr = `D'après l'énoncé ${prenom2} a : ${texPrix(r)}€<br>${prenom2}  a ${texPrix(e)}€`
          texteCorr += texteEnCouleurEtGras(' de plus ')
          texteCorr += `que ${prenom1} signifie que ${prenom1} a ${texPrix(e)}€`
          texteCorr += texteEnCouleurEtGras(' de moins ')
          texteCorr += `que ${prenom2} . <br>${prenom1} a donc : ${texPrix(r)}€ - ${texPrix(e)}€ = ${texPrix(m)}€`
          texteCorr += `<br>${texPrix(r)}€ + ${texPrix(m)}€ = ${texPrix(somme)}€`
          texteCorr += texteEnCouleur(`<br>Les deux filles possèdent en tout : ${texPrix(somme)}€`)
          setReponse(this, i, somme)

          break
        case 'demoins':
          m = r + e
          somme = m + r

          texte = `<br> ${prenom2} dit à ${prenom1} : "J'ai ${texPrix(r)}€ soit ${texPrix(e)}€ de moins que toi."<br>`
          if (!context.isAmc) {
            texte += 'Combien d\'argent en tout possèdent les deux filles ?<br>Les deux filles possèdent en tout :'
            texte += ajouteChampTexte(this, i) + '  €'
          } else {
            texte += 'Combien d\'argent en euros possèdent en tout les deux filles ?<br>'
          }
          texteCorr = `D'après l'énoncé ${prenom2} a : ${texPrix(r)}€<br>${prenom2}  a ${texPrix(e)}€`
          texteCorr += texteEnCouleurEtGras(' de moins ')
          texteCorr += `que ${prenom1} signifie que ${prenom1} a ${texPrix(e)}€`
          texteCorr += texteEnCouleurEtGras(' de plus ')
          texteCorr += `que ${prenom2} . <br>${prenom1} a donc : ${texPrix(r)}€ + ${texPrix(e)}€ = ${texPrix(m)}€`
          texteCorr += `<br>${texPrix(r)}€ + ${texPrix(m)}€ = ${texPrix(somme)}€`
          texteCorr += texteEnCouleur(`<br>Les deux filles possèdent en tout : ${texPrix(somme)}€`)
          setReponse(this, i, somme)
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Valeurs entières\n2 : Une décimale\n3 : Deux décimales']
}
