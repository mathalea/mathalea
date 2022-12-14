import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, lampeMessage, prenomF, prenomM, calcul, texPrix, texteEnCouleurEtGras, numAlpha, nombreDeChiffresDansLaPartieDecimale, sp, choice, arrondi } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Augmenter ou diminuer d\'un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDePublication = '23/07/21'
export const dateDeModifImportante = '15/03/2022'

/**
 * Description didactique de l'exercice
 * augmenter ou diminuer un prix d'un pourcentage,
 * le calcul intermédiaire du montant de l'augmentation ou de la baisse est demandé
 * Quatre niveaux :
 * - 1 valeurs entières et 10%, 20%...;
 * - 2 Comme le 1 mais avec 25% et 75% en plus ;
 * - 3 valeurs entières et 13%, 28%...;
 * - 4 valeurs décimale comme 13,5%...;
 * @author Laurence CANDILLE (Rajout de 25% et 50% par Eric Elter)
 * Référence 6P13
 * Date de Publication : 23/07/2021
 * Relecture : Novembre 2021 par EE
*/
export const uuid = '064ce'
export const ref = '6P13'
export default function AugmenterEtReduireDunPourcentage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactifType = 'mathLive'
  this.listePackages = 'bclogo'

  this.nouvelleVersion = function () {
    const n = this.sup - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.introduction = (this.interactif && context.isHtml)
      ? lampeMessage({
        titre: 'Calculatrice autorisée.',
        texte: 'Écrire les réponses dans les cases sans arrondir, ne pas préciser "€" ni "euros" ...',
        couleur: 'nombres'
      })
      : ''
    const typeQuestionsDisponibles = ['augmentation', 'réduction'] // On créé 2 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    let billet, loyer // prix du billet, loyer de l'appart
    let pr, pa // pourcentage réduction, pourcentage augmentation
    let mr, ma // montant réduction, montant augmentation
    let final1, final2 // prix final 1 , prix final 2
    let prenom1, prenom2 // choix aleatoire des prenoms
    function nombreDecimales (n) {
      if (n === 0) {
        pr = randint(1, 6) * 10
        pa = randint(1, 3) * 10
      } else if (n === 1) {
        pr = choice([10, 20, 25, 30, 50, 60, 70, 75])
        pa = choice([10, 20, 25, 30])
      } else if (n === 2) {
        pr = randint(21, 39, [30])
        pa = randint(2, 9)
      } else {
        pr = calcul((randint(40, 60) * 100 + randint(1, 9) * 10) / 100)
        pa = calcul((randint(1, 9) * 10 + randint(1, 9)) / 10)
      }
    }

    for (let i = 0, texte, texteCorr, enonceInit, enonceAMC, propositionsAMC, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      prenom1 = prenomM()
      prenom2 = prenomF()
      billet = arrondi(2 * randint(50, 100), 0)
      loyer = arrondi(2 * randint(251, 449, [300, 350, 400]), 0)

      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'réduction':
          nombreDecimales(n)
          mr = calcul(pr * billet / 100)
          final1 = calcul(billet - mr)
          texte = `Un billet d'avion coûte ${billet} €. ${prenom1} bénéficie d'une réduction de $${pr} \\%$.`
          enonceInit = texte
          enonceAMC = (this.interactif && context.isHtml) ? `${numAlpha(0)} Le montant de la réduction est :` : `${numAlpha(0)} Calculer le montant de la réduction.`
          texte = enonceInit + '<br>' + enonceAMC
          texte += (this.interactif && context.isHtml) ? ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline', { texteApres: ' €' }) : ''
          texte += '<br>'
          if (!context.isAmc) {
            setReponse(this, 2 * i, mr, { formatInteractif: 'calcul' })
          } else {
            propositionsAMC = [
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: texteCorr,
                    reponse: {
                      texte: enonceAMC,
                      valeur: [mr],
                      param: {
                        digits: 5,
                        decimals: 2,
                        signe: false,
                        approx: 0,
                        exposantNbChiffres: 0
                      }
                    }
                  }
                ]
              }
            ]
          }
          enonceAMC = (this.interactif && context.isHtml) ? `${numAlpha(1)} Finalement, ${prenom1} paiera son billet :` : `${numAlpha(1)} Calculer le prix du billet de ${prenom1}.`
          texte += enonceAMC
          texte += (this.interactif && context.isHtml) ? ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline', { texteApres: ' €' }) : ''
          if (!context.isAmc) {
            setReponse(this, 2 * i + 1, final1)
          } else {
            propositionsAMC.push(
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: '',
                    reponse: {
                      texte: enonceAMC,
                      valeur: [final1],
                      param: {
                        digits: 5,
                        decimals: 2,
                        signe: false,
                        approx: 0,
                        exposantNbChiffres: 0
                      }
                    }
                  }
                ]
              }
            )
          }
          texteCorr = `${numAlpha(0)} Le montant de la réduction est : $${billet} € \\times ${pr} \\div 100$` + sp(1)
          texteCorr += nombreDeChiffresDansLaPartieDecimale(mr) < 3 ? '$ =$' : '$ \\approx$'
          texteCorr += texteEnCouleurEtGras(` $${texPrix(mr)}$ €.<br>`)
          texteCorr += `${numAlpha(1)} Finalement, ${prenom1} paiera son billet : $${billet} € - ${texPrix(mr)} € =$` + sp(1)
          texteCorr += texteEnCouleurEtGras(`$${texPrix(final1)}$ €.`)
          break
        case 'augmentation':
          nombreDecimales(n)
          calcul(ma = pa * loyer / 100)
          calcul(final2 = loyer + ma)

          enonceInit = `Le loyer de l'appartement de ${prenom2} coûte ${loyer} €. Au 1er janvier, il augmente de $${pa} \\%$.`
          enonceAMC = (this.interactif && context.isHtml) ? `${numAlpha(0)} Le montant de l'augmentation est :` : `${numAlpha(0)} Calculer le montant de l'augmentation.`
          texte = enonceInit + '<br>' + enonceAMC
          texte += (this.interactif && context.isHtml) ? ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline', { texteApres: ' €' }) : ''
          texte += '<br>'
          if (!context.isAmc) {
            setReponse(this, 2 * i, ma)
          } else {
            propositionsAMC = [
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: texteCorr,
                    reponse: {
                      texte: enonceAMC,
                      valeur: [ma],
                      param: {
                        digits: 5,
                        decimals: 2,
                        signe: false,
                        approx: 0,
                        exposantNbChiffres: 0
                      }
                    }
                  }
                ]
              }
            ]
          }
          enonceAMC = (this.interactif && context.isHtml) ? `${numAlpha(1)} Finalement, ${prenom2} paiera son loyer :` : `${numAlpha(1)} Calculer le montant du loyer de ${prenom2}.`
          texte += enonceAMC
          texte += (this.interactif && context.isHtml) ? ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline', { texteApres: ' €' }) : ''
          if (!context.isAmc) {
            setReponse(this, 2 * i + 1, final2)
          } else {
            propositionsAMC.push(
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: texteCorr,
                    reponse: {
                      texte: enonceAMC,
                      valeur: [final2],
                      param: {
                        digits: 5,
                        decimals: 2,
                        signe: false,
                        approx: 0,
                        exposantNbChiffres: 0
                      }
                    }
                  }
                ]
              }
            )
          }
          texteCorr = `${numAlpha(0)} Le montant de l'augmentation est :     $${loyer} € \\times ${pa} \\div 100$` + sp(1)
          texteCorr += nombreDeChiffresDansLaPartieDecimale(ma) < 3 ? '$ =$' : '$ \\approx$'
          texteCorr += texteEnCouleurEtGras(` $${texPrix(ma)}$ €.<br>`)
          texteCorr += `${numAlpha(1)} Finalement, ${prenom2} paiera son loyer : $${loyer} € + ${texPrix(ma)} € =$` + sp(1)
          texteCorr += texteEnCouleurEtGras(`$${texPrix(final2)}$ €.`)
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: enonceInit,
            options: { multicols: true, barreseparation: true }, // facultatif. Par défaut, multicols est à false. Ce paramètre provoque un multicolonnage (sur 2 colonnes par défaut) : pratique quand on met plusieurs AMCNum. !!! Attention, cela ne fonctionne pas, nativement, pour AMCOpen. !!!
            propositions: propositionsAMC
          }
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Valeurs entières et 10%, 20%...\n2 : Valeurs entières et 10%, 20%... mais aussi 25% et 50%\n3 : Valeurs entières et 4%, 23%...\n4 : Une décimale comme 34,5%']
}
