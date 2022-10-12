import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { abs } from '../../modules/outils/nombres.js'
import { texNombre, texPrix } from '../../modules/outils/texNombres.js'
import Decimal from 'decimal.js/decimal.mjs'
import { stringNombre } from '../../modules/outils/stringNombre.js'
export const titre = 'Variations en pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '06/01/2022'

/**
* Problèmes de variations en pourcentage
*
* * Situations variées : prix soldé ou augmenté, effectif d'un collège ou lycée, facture, population d'une ville
*
* * Calculer le résultat d'une évolution
* * Exprimer l'évolution en pourcentage
* * Retrouver la situation initiale
* * Mélange des 3 types de problèmes
* @author Rémi Angot + Florence Tapiero (correction version seconde)
* 2S12-1
*/
export const uuid = '12444'
export const ref = '2S11-2'
export default function EvolutionsEnPourcentage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 4 // type de questions

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = ['finale']
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = ['evolution']
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = ['initiale']
    }
    if (this.sup === 4) {
      typesDeQuestionsDisponibles = ['finale', 'evolution', 'initiale']
    }
    const situationsDisponibles = ['prix', 'etablissement', 'facture', 'population']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const typesDeSituations = combinaisonListes(situationsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let date, cetteAnnee, anneeDerniere, etablissement, facture, nb
    for (let i = 0, texte, texteCorr, depart, arrive, taux, tauxDec, coeff, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typesDeSituations[i]) {
        case 'prix':
          depart = choice([new Decimal(randint(11, 99)).div(10), new Decimal(randint(11, 99)), new Decimal(randint(11, 99)).mul(10)])
          taux = randint(5, 60) * choice([-1, 1])
          tauxDec = new Decimal(taux).div(100)
          coeff = tauxDec.plus(1)
          arrive = depart.mul(coeff)
          switch (listeTypeDeQuestions[i]) {
            case 'finale':
              if (taux > 0) {
                texte = `Un article coûtait $${texPrix(depart)}$ € et son prix a augmenté de $${taux}~\\%$. Calculer son nouveau prix.`
                texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $1 + \\dfrac{${taux}}{100} = 1+ ${texNombre(tauxDec, 2)} = ${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$${texPrix(depart)}\\times ${texNombre(coeff, 2)} = ${texPrix(arrive)}$`
                texteCorr += `<br>Le nouveau prix de cet article est $${texPrix(arrive)}$ €.`
                reponse = arrive
              } else {
                texte = `Un article coûtait $${texPrix(depart)}$ € et son prix est soldé à $${taux}~\\%$. Calculer son nouveau prix.`
                texteCorr = `Diminuer de $${abs(taux)}~\\%$ revient à multiplier par $1 - \\dfrac{${abs(taux)}}{100} = 1- ${texNombre(tauxDec.abs(), 2)} = ${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$${texPrix(depart)}\\times ${texNombre(coeff, 2)} = ${texPrix(arrive)}$`
                texteCorr += `<br>Le nouveau prix de cet article est $${texPrix(arrive)}$ €.`
                reponse = arrive
              }
              break
            case 'initiale':
              if (taux > 0) {
                texte = `Après une augmentation de $${taux}~\\%$ un article coûte $${texPrix(arrive)}$ €. Calculer son prix avant l'augmentation.`
                texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $1 + \\dfrac{${taux}}{100} = 1+ ${texNombre(tauxDec, 2)} = ${texNombre(coeff, 2)}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par $${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$\\dfrac{${texPrix(arrive)}}{${texNombre(coeff, 2)}}  = ${texPrix(depart)}$`
                texteCorr += `<br>Avant l'augmentation cet article coûtait $${texPrix(depart)}$ €.`
                reponse = depart
              } else {
                texte = `Soldé à $${abs(taux)}~\\%$ un article coûte $${texPrix(arrive)}$ €. Calculer son prix avant les soldes.`
                texteCorr = `Diminuer de $${abs(taux)}~\\%$ revient à multiplier par $1 - \\dfrac{${abs(taux)}}{100} = 1- ${texNombre(tauxDec.abs(), 2)} = ${texNombre(coeff, 2)}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par $${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$\\dfrac{${texPrix(arrive)}}{${texNombre(coeff, 2)}}  = ${texPrix(depart)}$`
                texteCorr += `<br>Avant les soldes cet article coûtait $${texPrix(depart)}$ €.`
                reponse = depart
              }
              break
            case 'evolution':
              if (taux > 0) {
                texte = `Un article qui coûtait $${texPrix(depart)}$ € coûte maintenant $${texPrix(arrive)}$ €. Calculer le taux d'évolution du prix en pourcentage.`
                texteCorr = 'On utilise la formule du cours qui exprime le taux d\'évolution $t$ en fonction de la valeur initiale $V_i$ et la valeur finale $V_f$: $t=\\dfrac{V_f-V_i}{V_i}$.'
                texteCorr += `<br><br>Ici : $t=\\dfrac{${texPrix(arrive)}-${texPrix(depart)}}{${texPrix(depart)}}=${texNombre(tauxDec, 2)}=\\dfrac{${taux}}{100}$.`
                texteCorr += `<br>Le prix a donc augmenté de $${taux}~\\%$.`
                texteCorr += '<br>Méthode 2 : On arrive aussi au même résultat en passant par le coefficient multiplicateur égal à $\\dfrac{V_f}{V_i}$ :'
                texteCorr += `<br><br>$\\dfrac{${texPrix(arrive)}}{${texPrix(depart)}} = ${texNombre(coeff, 2)} =  1 + ${texNombre(tauxDec, 2)} = 1 + \\dfrac{${taux}}{100}$.`
                reponse = taux
              } else {
                texte = `Un article qui coûtait $${texPrix(depart)}$ € coûte maintenant $${texPrix(arrive)}$ €. Calculer le taux d'évolution du prix en pourcentage.`
                texteCorr = 'On utilise la formule du cours qui exprime le taux d\'évolution $t$ en fonction de la valeur initiale $V_i$ et la valeur finale $V_f$: $t=\\dfrac{V_f-V_i}{V_i}$.'
                texteCorr += `<br><br>Ici : $t=\\dfrac{${texPrix(arrive)}-${texPrix(depart)}}{${texPrix(depart)}}=${texNombre(tauxDec, 2)}=\\dfrac{${taux}}{100}$.`
                texteCorr += `<br>Le prix a donc diminué de $${abs(taux)}~\\%$.`
                texteCorr += '<br>Méthode 2 : On arrive aussi au même résultat en passant par le coefficient multiplicateur égal à $\\dfrac{V_f}{V_i}$ :'
                texteCorr += `<br><br>$\\dfrac{${texPrix(arrive)}}{${texPrix(depart)}} = ${texNombre(coeff, 2)} =  1 - ${texNombre(tauxDec.abs(), 2)} = 1 - \\dfrac{${abs(taux)}}{100}$.`
                reponse = taux
              }
              break
          }
          break
        case 'etablissement':
          // Le nombre d'élève doit être entier
          // Multiple de 50 et multiple de 2%
          // Multiple de 20 et multiple de 5%
          // Multiple de 100 et n%
          switch (randint(1, 3)) {
            case 1:
              depart = 50 * randint(7, 24)
              taux = 2 * randint(1, 5)
              break
            case 2:
              depart = 20 * randint(17, 60)
              taux = 5 * randint(1, 3)
              break
            case 3:
              depart = 100 * randint(4, 12)
              taux = randint(1, 11)
              break
          }
          tauxDec = new Decimal(taux).div(100)
          coeff = tauxDec.plus(1)
          arrive = coeff.mul(depart)
          date = new Date()
          cetteAnnee = date.getFullYear()
          anneeDerniere = cetteAnnee - 1
          etablissement = choice(['collège', 'lycée'])
          switch (listeTypeDeQuestions[i]) {
            case 'finale':
              if (taux > 0) {
                texte = `Un ${etablissement} avait $${texNombre(depart, 0)}$ élèves en ${anneeDerniere}. Depuis, le nombre d'élèves a augmenté de $${taux}~\\%$. Calculer le nombre d'élèves dans ce ${etablissement} cette année.`
                texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $1 + \\dfrac{${taux}}{100} = 1+ ${texNombre(tauxDec, 2)} = ${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$${texNombre(depart, 0)}\\times ${texNombre(coeff, 2)} = ${texNombre(arrive, 0)}$`
                texteCorr += `<br>Il y a maintenant ${stringNombre(arrive, 0)} élèves dans ce ${etablissement}.`
                reponse = arrive
              } else {
                texte = `Un ${etablissement} avait $${texNombre(depart, 0)}$ élèves en ${anneeDerniere}. Depuis, le nombre d'élèves a diminué de $${abs(taux)}~\\%$. Calculer le nombre d'élèves dans ce ${etablissement} cette année.`
                texteCorr = `Diminuer de $${abs(taux)}~\\%$ revient à multiplier par $1 - \\dfrac{${abs(taux)}}{100} = 1- ${texNombre(tauxDec.abs(), 2)} = ${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$${texNombre(depart, 0)}\\times ${texNombre(coeff, 2)} = ${texNombre(arrive, 0)}$`
                texteCorr += `<br>Il y a maintenant ${stringNombre(arrive, 0)} élèves dans ce ${etablissement}.`
                reponse = arrive
              }
              break
            case 'initiale':
              if (taux > 0) {
                texte = `Depuis ${anneeDerniere} le nombre d'élèves d'un ${etablissement} a augmenté de $${taux}~\\%$. Il y a maintenant $${texNombre(arrive, 2)}$ élèves. Calculer le nombre d'élèves en ${anneeDerniere} dans cet établissement.`
                texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $1 + \\dfrac{${taux}}{100} = 1+ ${texNombre(tauxDec, 2)} = ${texNombre(coeff, 2)}$.<br>Pour retrouver le nombre initial d'élèves, on va donc diviser le nombre actuel d'élèves par $${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$\\dfrac{${texNombre(arrive, 0)}}{${texNombre(coeff, 2)}}  = ${texNombre(depart, 0)}$`
                texteCorr += `<br>En ${anneeDerniere}, il y avait ${stringNombre(depart, 0)} élèves dans ce ${etablissement}.`
                reponse = depart
              } else {
                texte = `Depuis ${anneeDerniere} le nombre d'élèves d'un ${etablissement} a diminué de $${taux}~\\%$. Il y a maintenant $${texNombre(arrive, 2)}$ élèves. Calculer le nombre d'élèves en ${anneeDerniere} dans cet établissement.`
                texteCorr = `Diminuer de $${abs(taux)}~\\%$ revient à multiplier par $1 - \\dfrac{${abs(taux)}}{100} = 1- ${texNombre(tauxDec.abs(), 2)} = ${texNombre(coeff, 2)}$..<br>Pour retrouver le nombre initial d'élèves, on va donc diviser le nombre actuel d'élèves par $${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$\\dfrac{${texNombre(arrive, 0)}}{${texNombre(coeff, 2)}}  = ${texNombre(depart, 0)}$`
                texteCorr += `<br>En ${anneeDerniere}, il y avait ${stringNombre(depart, 0)} élèves dans ce ${etablissement}.`
                reponse = depart
              }
              break
            case 'evolution':
              texte = `En ${anneeDerniere}, il y avait $${texNombre(depart, 0)}$ élèves dans un ${etablissement}. En ${cetteAnnee}, ils sont $${texNombre(arrive, 2)}$. Déterminer le taux d'évolution du nombre d'élèves de cet établissement en pourcentage.`
              if (taux > 0) {
                texteCorr = 'On utilise la formule du cours qui exprime le taux d\'évolution $t$ en fonction de la valeur initiale $V_i$ et la valeur finale $V_f$: $t=\\dfrac{V_f-V_i}{V_i}$.'
                texteCorr += `<br><br>Ici : $t=\\dfrac{${texNombre(arrive, 2)}-${texNombre(depart, 0)}}{${texPrix(depart)}}=${texNombre(tauxDec, 2)}=\\dfrac{${taux}}{100}$.`
                texteCorr += `<br>Le nombre d'élèves a donc augmenté de $${taux}~\\%$.`
                texteCorr += '<br>Méthode 2 : On arrive aussi au même résultat en passant par le coefficient multiplicateur égal à $\\dfrac{V_f}{V_i}$ :'
                texteCorr += `</br><br>$\\dfrac{${texNombre(arrive, 2)}}{${texNombre(depart, 0)}} = ${texNombre(coeff, 2)} =  1 + ${texNombre(tauxDec, 2)} = 1 + \\dfrac{${taux}}{100}$.`
                reponse = taux
              } else {
                texteCorr = 'On utilise la formule du cours qui exprime le taux d\'évolution $t$ en fonction de la valeur initiale $V_i$ et la valeur finale $V_f$: $t=\\dfrac{V_f-V_i}{V_i}$.'
                texteCorr += `<br><br>Ici : $t=\\dfrac{${texNombre(arrive, 2)}-${texNombre(depart, 0)}}{${texPrix(depart)}}=${texNombre(tauxDec, 2)}=\\dfrac{${taux}}{100}$.`
                texteCorr += `<br>Le nombre d'élèves a donc diminué de $${abs(taux)}~\\%$.`
                texteCorr += '<br>Méthode 2 : On arrive aussi au même résultat en passant par le coefficient multiplicateur égal à $\\dfrac{V_f}{V_i}$ :'
                texteCorr += `</br><br>$\\dfrac{${texNombre(arrive, 2)}}{${texNombre(depart, 0)}} = ${texNombre(coeff, 2)} =  1 - ${texNombre(tauxDec.abs(), 2)} = 1 - \\dfrac{${abs(taux)}}{100}$.`
                reponse = taux
              }
              break
          }
          break
        case 'facture':
          depart = randint(700, 1400)
          taux = randint(2, 30) * choice([-1, 1])
          tauxDec = new Decimal(taux).div(100)
          coeff = tauxDec.plus(1)
          arrive = coeff.mul(depart)
          facture = choice(["ma facture annuelle d'électricité", 'ma facture annuelle de gaz', "ma taxe d'habitation", 'mon ordinateur', 'mon vélo électrique'])
          switch (listeTypeDeQuestions[i]) {
            case 'finale':
              if (taux > 0) {
                texte = `Le prix de ${facture} était de $${texPrix(depart)}$ € l'année dernière et il a augmenté de $${taux}~\\%$. Calculer son nouveau prix.`
                texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $1 + \\dfrac{${taux}}{100} = 1+ ${texNombre(tauxDec, 2)} = ${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$${texPrix(depart)}\\times ${texNombre(coeff, 2)} = ${texPrix(arrive)}$`
                texteCorr += `<br>Le prix de ${facture} est maintenant de $${texPrix(arrive)}$ €.`
                reponse = arrive
              } else {
                texte = `Le prix de ${facture} était de $${texPrix(depart)}$ € l'année dernière et il a diminué de $${abs(taux)}~\\%$. Calculer son nouveau prix.`
                texteCorr = `Diminuer de $${abs(taux)}~\\%$ revient à multiplier par $1 - \\dfrac{${abs(taux)}}{100} = 1- ${texNombre(tauxDec.abs(), 2)} = ${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$${texPrix(depart)}\\times ${texNombre(coeff, 2)} = ${texPrix(arrive)}$.`
                texteCorr += `<br>Le prix de ${facture} est maintenant de $${texPrix(arrive)}$ €.`
                reponse = arrive
              }
              break
            case 'initiale':
              if (taux > 0) {
                texte = `Après une augmentation de $${taux}~\\%$ le prix de ${facture} est maintenant $${texPrix(arrive)}$ €. Calculer son prix avant l'augmentation.`
                texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $1 + \\dfrac{${taux}}{100} = 1+ ${texNombre(tauxDec, 2)} = ${texNombre(coeff, 2)}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par $${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$\\dfrac{${texPrix(arrive)}}{${texNombre(coeff, 2)}}  = ${texPrix(depart)}$`
                texteCorr += `<br>Avant l'augmentation le prix de ${facture} était de $${texPrix(depart)}$ €.`
                reponse = depart
              } else {
                texte = `Après une diminution de $${abs(taux)}~\\%$ ${facture} coûte maintenant $${texPrix(arrive)}$ €. Calculer son prix avant la diminution.`
                texteCorr = `Diminuer de $${abs(taux)}~\\%$ revient à multiplier par $1 - \\dfrac{${abs(taux)}}{100} = 1- ${texNombre(tauxDec.abs(), 2)} = ${texNombre(coeff, 2)}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par $${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$\\dfrac{${texPrix(arrive)}}{${texNombre(coeff, 2)}}  = ${texPrix(depart)}$.`
                texteCorr += `<br>Avant la diminution le prix de ${facture} était de $${texPrix(depart)}$ €.`
                reponse = depart
              }
              break
            case 'evolution':
              if (taux > 0) {
                texte = `Le prix de ${facture} est passé de $${texPrix(depart)}$ € à $${texPrix(arrive)}$ €. Calculer le taux d'évolution du prix en pourcentage.`
                texteCorr = 'On utilise la formule du cours qui exprime le taux d\'évolution $t$ en fonction de la valeur initiale $V_i$ et la valeur finale $V_f$: $t=\\dfrac{V_f-V_i}{V_i}$.'
                texteCorr += `<br><br>Ici : $t=\\dfrac{${texPrix(arrive)}-${texPrix(depart)}}{${texPrix(depart)}}=${texNombre(tauxDec, 2)}=\\dfrac{${taux}}{100}$.`
                texteCorr += `<br>Le prix a donc augmenté de $${taux}~\\%$.`
                texteCorr += '<br>Méthode 2 : On arrive aussi au même résultat en passant par le coefficient multiplicateur égal à $\\dfrac{V_f}{V_i}$ :'
                texteCorr += `<br><br>$\\dfrac{${texPrix(arrive)}}{${texPrix(depart)}} = ${texNombre(coeff, 2)} =  1 + ${texNombre(tauxDec, 2)} = 1 + \\dfrac{${taux}}{100}$.`
                reponse = taux
              } else {
                texte = `Le prix de ${facture} est passé de $${texPrix(depart)}$ € à $${texPrix(arrive)}$ €. Calculer le taux d'évolution du prix en pourcentage.`
                texteCorr = 'On utilise la formule du cours qui exprime le taux d\'évolution $t$ en fonction de la valeur initiale $V_i$ et la valeur finale $V_f$: $t=\\dfrac{V_f-V_i}{V_i}$.'
                texteCorr += `<br><br>Ici : $t=\\dfrac{${texPrix(arrive)}-${texPrix(depart)}}{${texPrix(depart)}}=${texNombre(tauxDec, 2)}=\\dfrac{${taux}}{100}$.`
                texteCorr += `<br>Le prix a donc diminué de $${abs(taux)}~\\%$.`
                texteCorr += '<br>Méthode 2 : On arrive aussi au même résultat en passant par le coefficient multiplicateur égal à $\\dfrac{V_f}{V_i}$ :'
                texteCorr += `<br><br>$\\dfrac{${texPrix(arrive)}}{${texPrix(depart)}} = ${texNombre(coeff, 2)} =  1 - ${texNombre(tauxDec.abs(), 2)} = 1 - \\dfrac{${abs(taux)}}{100}$.`
                reponse = taux
              }
              break
          }
          break
        case 'population':
          depart = choice([randint(11, 99) * 1000, randint(11, 99) * 10000])
          taux = randint(5, 35) * choice([-1, 1])
          tauxDec = new Decimal(taux).div(100)
          coeff = tauxDec.plus(1)
          arrive = coeff.mul(depart)
          nb = randint(5, 15)
          switch (listeTypeDeQuestions[i]) {
            case 'finale':
              if (taux > 0) {
                texte = `Il y a ${nb} ans, la population d'une ville était de $${texNombre(depart, 0)}$ habitants. Depuis, elle a augmenté de $${taux}~\\%$. Calculer le nombre d'habitants actuel de cette ville.`
                texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $1 + \\dfrac{${taux}}{100} = 1+ ${texNombre(tauxDec, 2)} = ${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$${texNombre(depart, 0)}\\times ${texNombre(coeff, 2)} = ${texNombre(arrive, 2)}$`
                texteCorr += `<br>La population de cette ville est maintenant de $${texNombre(arrive, 2)}$ habitants.`
              } else {
                texte = `Il y a ${nb} ans, la population d'une ville était de $${texNombre(depart, 0)}$ habitants. Depuis, elle a diminué de $${abs(taux)}~\\%$. Calculer le nombre d'habitants actuel de cette ville.`
                texteCorr = `Diminuer de $${abs(taux)}~\\%$ revient à multiplier par $1 - \\dfrac{${abs(taux)}}{100} = 1- ${texNombre(tauxDec.abs(), 2)} = ${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$${texNombre(depart, 0)}\\times ${texNombre(coeff, 2)} = ${texNombre(arrive, 2)}$.`
                texteCorr += `<br>La population de cette ville est maintenant de $${texNombre(arrive, 2)}$ habitants.`
              }
              reponse = arrive
              break
            case 'initiale':
              if (taux > 0) {
                texte = `En ${nb} ans, la population d'une ville a augmenté de $${taux}~\\%$. Il y a maintenant $${texNombre(arrive, 2)}$ habitants. Calculer sa population d'il y a ${nb} ans.`
                texteCorr = `Augmenter de $${taux}~\\%$ revient à multiplier par $1 + \\dfrac{${taux}}{100} = 1+ ${texNombre(tauxDec, 2)} = ${texNombre(coeff, 2)}$.<br>Pour retrouver la population initiale, on va donc diviser le nombre d'habitants actuel par $${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$\\dfrac{${texNombre(arrive, 2)}}{${texNombre(coeff, 2)}}  = ${texNombre(depart, 0)}$`
                texteCorr += `<br>Il y a ${nb} ans cette ville comptait $${texNombre(depart, 0)}$ habitants.`
              } else {
                texte = `En ${nb} ans, la population d'une ville a diminué de $${abs(taux)}~\\%$. Il y a maintenant $${texNombre(arrive, 2)}$ habitants. Calculer sa population d'il y a ${nb} ans.`
                texteCorr = `Diminuer de $${abs(taux)}~\\%$ revient à multiplier par $1 - \\dfrac{${abs(taux)}}{100} = 1- ${texNombre(tauxDec.abs(), 2)} = ${texNombre(coeff, 2)}$.<br>Pour retrouver la population initiale, on va donc diviser le nombre d'habitants actuel par $${texNombre(coeff, 2)}$.`
                texteCorr += `<br>$\\dfrac{${texNombre(arrive, 2)}}{${texNombre(coeff, 2)}}  = ${texNombre(depart, 0)}$.`
                texteCorr += `<br>Il y a ${nb} ans cette ville comptait $${texNombre(depart, 0)}$ habitants.`
              }
              reponse = depart
              break
            case 'evolution':
              if (taux > 0) {
                texte = `En ${nb} ans, la population d'une ville est passé de $${texNombre(depart, 0)}$ à $${texNombre(arrive, 2)}$ habitants. Calculer le taux d'évolution de la population de cette ville en pourcentage.`
                texteCorr = 'On utilise la formule du cours qui exprime le taux d\'évolution $t$ en fonction de la valeur initiale $V_i$ et la valeur finale $V_f$: $t=\\dfrac{V_f-V_i}{V_i}$.'
                texteCorr += `<br><br>Ici : $t=\\dfrac{${texNombre(arrive, 2)}-${texNombre(depart, 0)}}{${texPrix(depart)}}=${texNombre(tauxDec, 2)}=\\dfrac{${taux}}{100}$.`
                texteCorr += `<br>La population a donc augmenté de $${abs(taux)}~\\%$.`
                texteCorr += '<br>Méthode 2 : On arrive aussi au même résultat en passant par le coefficient multiplicateur égal à $\\dfrac{V_f}{V_i}$ :'
                texteCorr += `<br><br>$\\dfrac{${texNombre(arrive, 2)}}{${texNombre(depart, 0)}} = ${texNombre(coeff, 2)} =  1 + ${texNombre(tauxDec, 2)} = 1 + \\dfrac{${taux}}{100}$.`
              } else {
                texte = `En ${nb} ans, la population d'une ville est passé de $${texNombre(depart, 0)}$ à $${texNombre(arrive, 2)}$ habitants. Calculer le taux d'évolution de la population de cette ville en pourcentage.`
                texteCorr = 'On utilise la formule du cours qui exprime le taux d\'évolution $t$ en fonction de la valeur initiale $V_i$ et la valeur finale $V_f$: $t=\\dfrac{V_f-V_i}{V_i}$.'
                texteCorr += `<br><br>Ici : $t=\\dfrac{${texNombre(arrive, 2)}-${texNombre(depart, 0)}}{${texPrix(depart)}}=${texNombre(tauxDec, 2)}=\\dfrac{${taux}}{100}$.`
                texteCorr += `<br>La population a donc diminué de $${abs(taux)}~\\%$.`
                texteCorr += '<br>Méthode 2 : On arrive aussi au même résultat en passant par le coefficient multiplicateur égal à $\\dfrac{V_f}{V_i}$ :'
                texteCorr += `<br><br>$\\dfrac{${texNombre(arrive, 2)}}{${texNombre(depart, 0)}} = ${texNombre(coeff, 2)} =  1 - ${texNombre(tauxDec.abs(), 2)} = 1 - \\dfrac{${abs(taux)}}{100}$.`
              }
              reponse = taux
              break
          }
          break
      }
      setReponse(this, i, reponse)
      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, depart, taux, typesDeSituations[i])) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Déterminer le résultat après une évolution en pourcentage\n2 : Calculer un taux d\'évolution\n3 : Calculer la valeur initiale en connaissant le taux d\'évolution et la valeur finale\n4 : Mélange']
}
