import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, range, randint, texNombre, choice, egalOuApprox } from '../../modules/outils.js'

export const titre = 'Problèmes concret et pourcentages'

export default class ProblemesConcretsEtPourcentages extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 4 // Ici le nombre de questions
    this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
    this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne

  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  }

  nouvelleVersion () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const entreprises = ['La colossale', 'Fabrik2', 'RenovMax', 'VenteAToutPrix', 'Maison de demain', 'Les jardins d\'orient', 'Piquesous & compagnie']
    const nomActivité = ['appels', 'visites', 'ventes', 'devis', '€ de chiffre d\'affaire', '€ de marge']
    const minMaxCoeffNombres = [[5, 20, 100], [5, 100, 10], [12, 25, 4], [50, 100, 1], [50, 10000, 100], [5, 1000, 100]]
    const listeChoix = combinaisonListes(range(5), this.nbQuestions)
    const nombreObjectif = []
    console.log(listeChoix)
    for (let ii = 0; ii < this.nbQuestions; ii++) {
      nombreObjectif[ii] = randint(minMaxCoeffNombres[listeChoix[ii]][0], minMaxCoeffNombres[listeChoix[ii]][1]) * minMaxCoeffNombres[listeChoix[ii]][2]
    }
    const nombreRéalisé = []

    for (let ii = 0; ii < this.nbQuestions; ii++) {
      nombreRéalisé[ii] = randint(Math.round(nombreObjectif[ii] / 2), Math.round(nombreObjectif[ii] * 0.95))
    }
    for (let i = 0, ventes, rdv, marge1, marge2, chiffreAffaire1, chiffreAffaire2, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const indexChoix = listeChoix[i]
      const entreprise = choice(entreprises)

      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1:
          if (choice([true, false])) {
            texte = `Le manager de l'entreprise ${entreprise} a fixé comme objectif commercial de réaliser ${nombreObjectif[i]} ${nomActivité[indexChoix]} sur une période donnée.<br>`
            texte += `Sur cette période, l'équipe commerciale a réalisé ${nombreRéalisé[i]} ${nomActivité[indexChoix]}.<br>`
            texte += 'Quel est le pourcentage de l\'objectif atteint sur la période ?'
            texteCorr = 'Le pourcentage de l\'objectif atteint par l\'équipe est :<br>'
            texteCorr += `$\\dfrac{${nombreRéalisé[i]}}{${nombreObjectif[i]}}\\times ${100} ${egalOuApprox(100 * nombreRéalisé[i] / nombreObjectif[i], 2)} ${texNombre(100 * nombreRéalisé[i] / nombreObjectif[i], 2)}\\%$`
          } else {
            texte = `L'équipe commercial de l'entreprise ${entreprise} a réalisé ${nombreRéalisé[i]} ${nomActivité[indexChoix]}  sur une période donnée.<br>`
            texte += `Le manager de cette entreprisea fixé comme objectif commercial de réaliser ${nombreObjectif[i]} ${nomActivité[indexChoix]} sur cette période.<br>`
            texte += 'Quel est le pourcentage de l\'objectif atteint sur la période ?'
            texteCorr = 'Le pourcentage de l\'objectif atteint par l\'équipe commerciale est :<br>'
            texteCorr += `$\\dfrac{${nombreRéalisé[i]}}{${nombreObjectif[i]}}\\times ${100} ${egalOuApprox(100 * nombreRéalisé[i] / nombreObjectif[i], 2)} ${texNombre(100 * nombreRéalisé[i] / nombreObjectif[i], 2)}\\%$`
          }
          break

        case 2:
          ventes = randint(minMaxCoeffNombres[2][0], minMaxCoeffNombres[2][1]) * minMaxCoeffNombres[2][2]
          rdv = randint(minMaxCoeffNombres[2][0], minMaxCoeffNombres[2][1]) * minMaxCoeffNombres[2][2]
          ;[ventes, rdv] = [Math.min(ventes, rdv), Math.max(ventes, rdv)]
          texte = `Sur une période donnée, l'entreprise ${entreprise} a obtenu ${rdv} rendez-vous.<br>`
          texte += `Lors de ces rendez-vous, elle a réalisé ${ventes} ventes.<br>`
          texte += 'Quel est le pourcentage de transformation de ces rendez-vous ?'
          texteCorr = 'Le pourcentage de transformation des rendez-vous est de :<br>'
          texteCorr += `$\\dfrac{${ventes}}{${rdv}}\\times 100 ${egalOuApprox(ventes / rdv * 100, 2)} ${texNombre(ventes / rdv * 100, 2)}\\%$`
          break

        case 3:
          chiffreAffaire1 = randint(minMaxCoeffNombres[4][0], minMaxCoeffNombres[4][1])
          chiffreAffaire2 = randint(minMaxCoeffNombres[4][0], minMaxCoeffNombres[4][1], chiffreAffaire1)
          chiffreAffaire1 *= minMaxCoeffNombres[4][2]
          chiffreAffaire2 *= minMaxCoeffNombres[4][2]
          texte = `L'année dernière l'entreprise ${entreprise} a réalisé un chiffre d'affaire de ${chiffreAffaire1} €.<br>`
          texte += `Cette année, elle a réalisé un chiffre d'affaire de ${chiffreAffaire2} €.<br>`
          texte += 'Quel est le pourcentage d\'évolution du chiffre d\'affaire ?'
          texteCorr = 'Le pourcentage d\'évolution du chiffre d\'affaire est :<br>'
          texteCorr += `$(\\dfrac{${chiffreAffaire2}}{${chiffreAffaire1}}-1)\\times 100 = \\dfrac{${chiffreAffaire2}-${chiffreAffaire1}}{${chiffreAffaire1}}\\times 100 ${egalOuApprox(100 * chiffreAffaire2 / chiffreAffaire1, 2)} ${texNombre(100 * chiffreAffaire2 / chiffreAffaire1 - 100, 2)}\\%$`
          break

        case 4:
          marge1 = randint(minMaxCoeffNombres[5][0], minMaxCoeffNombres[5][1])
          marge2 = randint(minMaxCoeffNombres[5][0], minMaxCoeffNombres[5][1], marge1)
          marge1 *= minMaxCoeffNombres[5][2]
          marge2 *= minMaxCoeffNombres[5][2]
          texte = `L'année dernière l'entreprise ${entreprise} a réalisé une marge bénéficiare de ${marge1} €.<br>`
          texte += `Cette année, elle a réalisé une marge bénéficiaire de ${marge2} €.<br>`
          texte += 'Quel est le pourcentage d\'évolution de la marge ?'
          texteCorr = 'Le pourcentage d\'évolution de la marge est :<br>'
          texteCorr += `$(\\dfrac{${marge2}}{${marge1}}-1)\\times 100 = \\dfrac{${marge2}-${marge1}}{${marge1}}\\times 100 ${egalOuApprox(100 * marge2 / marge1, 2)} ${texNombre(100 * marge2 / marge1 - 100, 2)}\\%$`
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
