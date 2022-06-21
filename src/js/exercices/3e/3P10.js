import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, abs, calcul, texNombrec, texNombre, stringNombre, texPrix } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Variations en pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
* Problèmes de variations en pourcentage
*
* * Situations variées : prix soldé ou augmenté, effectif d'un collège ou lycée, facture, population d'une ville
*
* * Calculer le résultat d'une évolution
* * Exprimer l'évolution en pourcentage
* * Retrouver la situation initiale
* * Mélange des 3 types de problèmes
* @author Rémi Angot
* 3P10
*/
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
    for (let i = 0, texte, texteCorr, depart, arrive, taux, coeff, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typesDeSituations[i]) {
        case 'prix':
          depart = choice([calcul(randint(11, 99) / 10), randint(11, 99), randint(11, 99) * 10])
          taux = choice([10, 20, 30, 40, 60])
          taux *= choice([-1, 1])
          coeff = texNombrec(1 + taux / 100)
          arrive = calcul(depart * (1 + taux / 100))
          switch (listeTypeDeQuestions[i]) {
            case 'finale':
              if (taux > 0) {
                texte = `Un article coûtait $${texPrix(depart)}$ € et son prix a augmenté de $${taux}~\\%$. Calculer son nouveau prix.`
                texteCorr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`
                texteCorr += `<br>$${texPrix(depart)}\\times ${coeff} = ${texPrix(arrive)}$`
                texteCorr += `<br>Le nouveau prix de cet article est $${texPrix(arrive)}$ €.`
                reponse = arrive
              } else {
                texte = `Un article coûtait $${texPrix(depart)}$ € et son prix est soldé à $${taux}~\\%$. Calculer son nouveau prix.`
                texteCorr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`
                texteCorr += `<br>$${texPrix(depart)}\\times ${coeff} = ${texPrix(arrive)}$`
                texteCorr += `<br>Le nouveau prix de cet article est $${texPrix(arrive)}$ €.`
                reponse = arrive
              }
              break
            case 'initiale':
              if (taux > 0) {
                texte = `Après une augmentation de $${taux}~\\%$ un article coûte maintenant $${texPrix(arrive)}$ €. Calculer son prix avant l'augmentation.`
                texteCorr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par $${coeff}$.`
                texteCorr += `<br>$${texPrix(arrive)}\\div ${coeff} = ${texPrix(depart)}$`
                texteCorr += `<br>Avant l'augmentation cet article coûtait $${texPrix(depart)}$ €.`
                reponse = depart
              } else {
                texte = `Soldé à $${taux}~\\%$ un article coûte maintenant $${texPrix(arrive)}$ €. Calculer son prix avant les soldes.`
                texteCorr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par $${coeff}$.`
                texteCorr += `<br>$${texPrix(arrive)}\\div ${coeff} = ${texPrix(depart)}$`
                texteCorr += `<br>Avant les soldes cet article coûtait $${texPrix(depart)}$ €.`
                reponse = depart
              }
              break
            case 'evolution':
              if (taux > 0) {
                texte = `Un article qui coûtait $${texPrix(depart)}$ € coûte maintenant $${texPrix(arrive)}$ €. Exprimer l'augmentation du prix en pourcentage.`
                texteCorr = `$${texPrix(arrive)}\\div ${texPrix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%+${taux}~\\%$`
                texteCorr += `<br>Le prix a été multiplié par ${coeff}, il a donc augmenté de $${taux}~\\%$.`
                reponse = taux
              } else {
                texte = `Un article qui coûtait $${texPrix(depart)}$ € coûte maintenant $${texPrix(arrive)}$ €. Exprimer la réduction du prix en pourcentage.`
                texteCorr = `<br>$${texPrix(arrive)}\\div ${texPrix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%${taux}~\\%$`
                texteCorr += `<br>Le prix a été multiplié par $${coeff}$, il a donc diminué de $${abs(taux)}~\\%$.`
                reponse = abs(taux)
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
          arrive = calcul(depart * (1 + taux / 100))
          coeff = texNombrec(1 + taux / 100)
          date = new Date()
          cetteAnnee = date.getFullYear()
          anneeDerniere = cetteAnnee - 1
          etablissement = choice(['collège', 'lycée'])
          switch (listeTypeDeQuestions[i]) {
            case 'finale':
              if (taux > 0) {
                texte = `Un ${etablissement} avait $${texNombre(depart)}$ élèves en ${anneeDerniere}. Depuis, le nombre d'élèves a augmenté de $${taux}~\\%$. Calculer le nombre d'élèves dans ce ${etablissement} cette année.`
                texteCorr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`
                texteCorr += `<br>$${texNombre(depart)}\\times ${coeff} = ${texNombre(arrive)}$`
                texteCorr += `<br>Il y a maintenant $${texNombre(arrive)}$ élèves dans ce ${etablissement}.`
                reponse = arrive
              } else {
                texte = `Un ${etablissement} avait $${texNombre(depart)}$ élèves en ${anneeDerniere}. Depuis, le nombre d'élèves a diminué de $${abs(taux)}~\\%$. Calculer le nombre d'élèves dans ce ${etablissement} cette année.`
                texteCorr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`
                texteCorr += `<br>$${texNombre(depart)}\\times ${coeff} = ${texNombre(arrive)}$`
                texteCorr += `<br>Il y a maintenant $${texNombre(arrive)}$ élèves dans ce ${etablissement}.`
                reponse = arrive
              }
              break
            case 'initiale':
              if (taux > 0) {
                texte = `Depuis ${anneeDerniere} le nombre d'élèves d'un ${etablissement} a augmenté de $${taux}~\\%$. Il y a maintenant $${texNombre(arrive)}$ élèves. Calculer le nombre d'élèves en ${anneeDerniere} dans cet établissement.`
                texteCorr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le nombre initial d'élèves, on va donc diviser le nombre actuel d'élèves par $${coeff}$.`
                texteCorr += `<br>$${texNombre(arrive)}\\div ${coeff} = ${texNombre(depart)}$`
                texteCorr += `<br>En ${anneeDerniere}, il y avait ${stringNombre(depart)} élèves dans ce ${etablissement}.`
                reponse = depart
              } else {
                texte = `Depuis ${anneeDerniere} le nombre d'élèves d'un ${etablissement} a diminué de $${taux}~\\%$. Il y a maintenant $${texNombre(arrive)}$ élèves. Calculer le nombre d'élèves en ${anneeDerniere} dans cet établissement.`
                texteCorr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le nombre initial d'élèves, on va donc diviser le nombre actuel d'élèves par $${coeff}$.`
                texteCorr += `<br>$${texNombre(arrive)}\\div ${coeff} = ${texNombre(depart)}$`
                texteCorr += `<br>En ${anneeDerniere}, il y avait ${stringNombre(depart)} élèves dans ce ${etablissement}.`
                reponse = depart
              }
              break
            case 'evolution':
              texte = `En ${anneeDerniere}, il y avait $${texNombre(depart)}$ élèves dans un ${etablissement}. En ${cetteAnnee}, ils sont $${texNombre(arrive)}$. Exprimer la variation du nombre d'élèves de cet établissement en pourcentage.`
              if (taux > 0) {
                texteCorr = `$${texNombre(arrive)}\\div ${texNombre(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%+${taux}~\\%$`
                texteCorr += `<br>Le nombre d'élèves a été multiplié par $${coeff}$, il a donc augmenté de $${taux}~\\%$.`
                reponse = taux
              } else {
                texte = `Un article qui coûtait $${texNombre(depart)}$ € coûte maintenant $${texNombre(arrive)}$ €. Exprimer la réduction du prix en pourcentage.`
                texteCorr = `$${texNombre(arrive)}\\div ${texPrix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%${taux}~\\%$`
                texteCorr += `<br>Le nombre d'élèves a été multiplié par $${coeff}$, il a donc diminué de $${abs(taux)}~\\%$.`
                reponse = abs(taux)
              }
              break
          }
          break
        case 'facture':
          depart = randint(700, 1400)
          taux = randint(1, 12)
          taux *= choice([-1, 1])
          coeff = texNombrec(1 + taux / 100)
          arrive = calcul(depart * (1 + taux / 100))
          facture = choice(["ma facture annuelle d'électricité", 'ma facture annuelle de gaz', "ma taxe d'habitation", 'mon ordinateur', 'mon vélo électrique'])
          switch (listeTypeDeQuestions[i]) {
            case 'finale':
              if (taux > 0) {
                texte = `Le prix de ${facture} était de $${texPrix(depart)}$ € l'année dernière et il a augmenté de $${taux}~\\%$. Calculer son nouveau prix.`
                texteCorr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`
                texteCorr += `<br>$${texPrix(depart)}\\times ${coeff} = ${texPrix(arrive)}$`
                texteCorr += `<br>Le prix de ${facture} est maintenant de $${texPrix(arrive)}$ €.`
                reponse = arrive
              } else {
                texte = `Le prix de ${facture} était de $${texPrix(depart)}$ € l'année dernière et il a diminué de $${abs(taux)}~\\%$. Calculer son nouveau prix.`
                texteCorr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`
                texteCorr += `<br>$${texPrix(depart)}\\times ${coeff} = ${texPrix(arrive)}$`
                texteCorr += `<br>Le prix de ${facture} est maintenant de $${texPrix(arrive)}$ €.`
                reponse = arrive
              }
              break
            case 'initiale':
              if (taux > 0) {
                texte = `Après une augmentation de $${taux}~\\%$ le prix de ${facture} est maintenant $${texPrix(arrive)}$ €. Calculer son prix avant l'augmentation.`
                texteCorr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par $${coeff}$.`
                texteCorr += `<br>$${texPrix(arrive)}\\div${coeff} = ${texPrix(depart)}$`
                texteCorr += `<br>Avant l'augmentation le prix de ${facture} était de $${texPrix(depart)}$ €.`
                reponse = depart
              } else {
                texte = `Après une diminution de $${abs(taux)}~\\%$ ${facture} coûte maintenant $${texPrix(arrive)}$ €. Calculer son prix avant les soldes.`
                texteCorr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par $${coeff}$.`
                texteCorr += `<br>$${texPrix(arrive)}\\div ${coeff} = ${texPrix(depart)}$`
                texteCorr += `<br>Avant la diminution le prix de ${facture} était de $${texPrix(depart)}$ €.`
                reponse = depart
              }
              break
            case 'evolution':
              if (taux > 0) {
                texte = `Le prix de ${facture} est passé de $${texPrix(depart)}$ € à $${texPrix(arrive)}$ €. Exprimer cette augmentation en pourcentage.`
                texteCorr = `$${texPrix(arrive)}\\div ${texPrix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%+${taux}~\\%$`
                texteCorr += `<br>Le prix a été multiplié par $${coeff}$, il a donc augmenté de $${taux}~\\%$.`
                reponse = taux
              } else {
                texte = `Le prix de ${facture} est passé de $${texPrix(depart)}$ € à $${texPrix(arrive)}$ €. Exprimer cette diminution en pourcentage.`
                texteCorr = `$${texPrix(arrive)}\\div ${texPrix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%${taux}~\\%$`
                texteCorr += `<br>Le prix a été multiplié par $${coeff}$, il a donc diminué de $${abs(taux)}~\\%$.`
                reponse = abs(taux)
              }
              break
          }
          break
        case 'population':
          depart = choice([randint(11, 99) * 1000, randint(11, 99) * 10000])
          taux = randint(5, 35)
          taux *= choice([-1, 1])
          coeff = texNombrec(1 + taux / 100)
          arrive = calcul(depart * (1 + taux / 100))
          nb = randint(5, 15)
          switch (listeTypeDeQuestions[i]) {
            case 'finale':
              if (taux > 0) {
                texte = `Il y a ${nb} ans, la population d'une ville était de $${texNombre(depart)}$ habitants. Depuis, elle a augmenté de $${taux}~\\%$. Calculer le nombre d'habitants actuel de cette ville.`
                texteCorr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`
                texteCorr += `<br>$${texNombre(depart)}\\times ${coeff} = ${texNombre(arrive)}$`
                texteCorr += `<br>La population de cette ville est maintenant de $${texNombre(arrive)}$ habitants.`
              } else {
                texte = `Il y a ${nb} ans, la population d'une ville était de $${texNombre(depart)}$ habitants. Depuis, elle a diminué de $${abs(taux)}~\\%$. Calculer le nombre d'habitants actuel de cette ville.`
                texteCorr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`
                texteCorr += `<br>$${texNombre(depart)}\\times ${coeff} = ${texNombre(arrive)}$`
                texteCorr += `<br>La population de cette ville est maintenant de $${texNombre(arrive)}$ habitants.`
              }
              reponse = arrive
              break
            case 'initiale':
              if (taux > 0) {
                texte = `En ${nb} ans, la population d'une ville a augmenté de $${taux}~\\%$ et est maintenant $${texNombre(arrive)}$ habitants. Calculer sa population d'il y a ${nb} ans.`
                texteCorr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver la population initiale, on va donc diviser le nombre d'habitants actuel par $${coeff}$.`
                texteCorr += `<br>$${texNombre(arrive)}\\div ${coeff} = ${texNombre(depart)}$`
                texteCorr += `<br>Il y a $${texNombre(nb)}$ ans cette ville comptait $${texNombre(depart)}$ habitants.`
              } else {
                texte = `En ${nb} ans, la population d'une ville a diminué de $${abs(taux)}~\\%$ et est maintenant $${texNombre(arrive)}$ habitants. Calculer sa population d'il y a ${nb} ans.`
                texteCorr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver la population initiale, on va donc diviser le nombre d'habitants actuel par $${coeff}$.`
                texteCorr += `<br>$${texNombre(arrive)}\\div ${coeff} = ${texNombre(depart)}$`
                texteCorr += `<br>Il y a $${texNombre(nb)}$ ans cette ville comptait $${texNombre(depart)}$ habitants.`
              }
              reponse = depart
              break
            case 'evolution':
              if (taux > 0) {
                texte = `En ${nb} ans, la population d'une ville est passé de $${texNombre(depart)}$ habitants à $${texNombre(arrive)}$. Exprimer cette augmentation en pourcentage.`
                texteCorr = `$${texNombre(arrive)}\\div ${texNombre(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%+${taux}~\\%$`
                texteCorr += `<br>La population a été multipliée par $${coeff}$ elle a donc augmenté de $${abs(taux)}~\\%$.`
              } else {
                texte = `En ${nb} ans, la population d'une ville est passé de $${texNombre(depart)}$ habitants à $${texNombre(arrive)}$. Exprimer cette diminution en pourcentage.`
                texteCorr = `$${texNombre(arrive)}\\div ${texNombre(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%${taux}~\\%$`
                texteCorr += `<br>La population a été multipliée par $${coeff}$ elle a donc diminué de $${abs(taux)}~\\%$.`
              }
              reponse = abs(taux)
              break
          }
          break
      }
      setReponse(this, i, reponse)
      texte += ajouteChampTexteMathLive(this, i)
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Déterminer le résultat après une variation en pourcentage\n2 : Exprimer une variation en pourcentage\n3 : Calculer la valeur initiale en connaissant la variation et la situation finale\n4 : Mélange']
}
