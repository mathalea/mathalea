import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, lampeMessage, texteEnCouleur, texteEnCouleurEtGras, calcul, texPrix, prenomF, sp, miseEnEvidence } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Résoudre des problèmes de type : ... de plus ou ... de moins'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

// Gestion de la date de publication initiale
export const dateDePublication = '10/07/2021'

/**
 * Description didactique de l'exercice
 * @author Laurence CANDILLE
 * Référence 6C22
 * Relecture : Novembre 2021 par EE
*/
export const uuid = '99522'
export const ref = '6C22'
export default function ProblemesDePlusEtDeMoins () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Résoudre les problèmes suivants au brouillon et écrire les réponses dans les cases, ne pas préciser "€" ni "euros" ...'
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.listePackages = 'bclogo'

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
    this.autoCorrection = []
    if (this.interactif && context.isHtml) {
      this.consigne = this.nbQuestions > 1 ? 'Résoudre les problèmes suivants au brouillon et écrire les réponses dans les cases, ne pas préciser "€" ni "euros" ...' : 'Résoudre le problème suivant au brouillon et écrire la réponse dans la case, ne pas préciser "€" ni "euros" ...'
      this.introduction = lampeMessage({
        titre: 'Calculatrice interdite.',
        texte: '',
        couleur: 'nombres'
      })
    } else {
      this.consigne = this.nbQuestions > 1 ? 'Résoudre les problèmes suivants.' : 'Résoudre le problème suivant.'
      this.introduction = lampeMessage({
        titre: 'Calculatrice interdite.',
        texte: '',
        couleur: 'nombres'
      })
    }
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

          texte = `${prenom2} dit à ${prenom1}  : «${sp()}J'ai $${texPrix(r)}$ €, soit $${texPrix(e)}$ € de plus que toi.${sp()}»<br>`
          if (this.interactif && !context.isAmc) {
            texte += 'Combien d\'argent,  en tout, possèdent les deux filles ?'
            texte += '<br>Les deux filles possèdent,  en tout, '
            texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline nospacebefore', { texteApres: ' €' })
            setReponse(this, i, somme)
          } else {
            texte += 'Combien d\'argent en euros possèdent,  en tout, les deux filles ?<br>'
          }
          texteCorr = `D'après l'énoncé, ${prenom2} a $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ €`
          texteCorr += texteEnCouleurEtGras(' de plus ')
          texteCorr += `que ${prenom1} signifie que ${prenom1} a $${texPrix(e)}$ € `
          texteCorr += texteEnCouleurEtGras(' de moins ')
          texteCorr += `que ${prenom2}. <br>${prenom1} a donc : $${texPrix(r)}$ € - $${texPrix(e)}$ € = $${texPrix(m)}$ €.`
          texteCorr += `<br>$${texPrix(r)}$ € + $${texPrix(m)}$ € = $${texPrix(somme)}$ € `
          texteCorr += texteEnCouleur(`<br>Les deux filles possèdent,  en tout, $${miseEnEvidence(texPrix(somme))}$ €.`)

          break
        case 'demoins':
          m = r + e
          somme = m + r

          texte = `${prenom2} dit à ${prenom1} : «${sp()}J'ai $${texPrix(r)}$ €, soit $${texPrix(e)}$ € de moins que toi.${sp()}»<br>`
          if (this.interactif && !context.isAmc) {
            texte += 'Combien d\'argent,  en tout, possèdent les deux filles ?<br>Les deux filles possèdent,  en tout, :'
            texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline nospacebefore', { texteApres: ' €' })
            setReponse(this, i, somme)
          } else {
            texte += 'Combien d\'argent en euros possèdent,  en tout, les deux filles ?<br>'
          }
          texteCorr = `D'après l'énoncé, ${prenom2} a $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ €`
          texteCorr += texteEnCouleurEtGras(' de moins ')
          texteCorr += `que ${prenom1} signifie que ${prenom1} a $${texPrix(e)}$ € `
          texteCorr += texteEnCouleurEtGras(' de plus ')
          texteCorr += `que ${prenom2}. <br>${prenom1} a donc : $${texPrix(r)}$ € + $${texPrix(e)}$ € = $${texPrix(m)}$ €.`
          texteCorr += `<br>$${texPrix(r)}$ € + $${texPrix(m)}$ € = $${texPrix(somme)}$ € `
          texteCorr += texteEnCouleur(`<br>Les deux filles possèdent,  en tout, $${miseEnEvidence(texPrix(somme))}$ €.`)

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
