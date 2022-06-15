import Exercice from '../Exercice.js'
import Decimal from 'decimal.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texNombre, texPrix } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Calculer une proportion ou appliquer un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true // Pour en bénéficier avec le générateur AMC
export const amcType = 'AMCNum' // Les réponses sont des valeurs numériques à encoder
export const dateDePublication = '9/12/2021'

/**
* Problèmes de proportions
*
* * Situations variées : spectacle, cadeau, réserve
*
* * Déterminer l'effectif de la sous population
* * Calculer une proportion
* * Retrouver l'effectif de la population totale'
* * Mélange des 3 types de problèmes
* @author Florence Tapiero
* * ajout de lignes pour l'export AMC par Jean-Claude Lhote
* 2S10-1
*/
export default function Proportions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 4 // type de questions
  this.spacing = 1
  this.spacingCorr = 2

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // Cette ligne doit être ajoutée afin de vider les précédentes valeurs pour AMC
    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = ['sous-population']
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = ['proportion']
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = ['population-totale']
    }
    if (this.sup === 4) {
      typesDeQuestionsDisponibles = ['sous-population', 'proportion', 'population-totale']
    }
    const situationsDisponibles = ['spectacle', 'cadeau', 'réserve']
    // const situationsDisponibles = ['cadeau'] pour test de chaque situation
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const typesDeSituations = combinaisonListes(situationsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let prénom, espèces
    for (let i = 0, texte, texteCorr, sous, sous2, totale, taux, p, reponse, paramAMC, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typesDeSituations[i]) {
        case 'spectacle':
          // Le nombre de spectateurs doit être entier
          // Multiple de 50 et multiple de 2%
          // Multiple de 20 et multiple de 5%
          // Multiple de 100 et n%
          switch (randint(1, 3)) {
            case 1:
              totale = 50 * randint(2, 60)
              taux = 2 * randint(3, 30)
              break
            case 2:
              totale = 20 * randint(5, 150)
              taux = 5 * randint(1, 16)
              break
            case 3:
              totale = 100 * randint(1, 30)
              taux = randint(10, 80)
              break
          }
          p = new Decimal(taux).div(100)
          sous = p.mul(totale)
          sous2 = sous.mul(-1).plus(totale)
          switch (listeTypeDeQuestions[i]) {
            case 'sous-population':
              switch (randint(1, 2)) {
                case 1:
                  texte = `$${texNombre(totale, 0)}$ personnes assistent à un concert. $${taux}~\\%$ ont moins de $18$ ans. <br>Calculer le nombre de personnes mineures dans le public.`
                  texteCorr = `Pour appliquer une proportion à une valeur, on multiplie celle-ci par la proportion $p$. <br>Comme $${taux}~\\%$ des $${texNombre(totale, 0)}$ personnes sont mineures, le nombre de personnes mineures est donné par :`
                  texteCorr += `<br>$\\dfrac{${taux}}{100} \\times ${texNombre(totale, 0)} = ${texNombre(p, 2)} \\times ${texNombre(totale, 0)}=${texNombre(sous, 2)}$`
                  texteCorr += `<br>Il y a donc $${texNombre(sous)}$ personnes mineures dans le public.`
                  reponse = sous
                  break
                case 2:
                  texte = `$${texNombre(totale, 0)}$ personnes assistent à un concert. $${taux}~\\%$ ont moins de $18$ ans. <br>Calculer le nombre de personnes majeures dans le public.`
                  texteCorr = `<br>On commence par déterminer la proportion de personnes majeures avec ce calcul : <br> $100-${taux}=${100 - taux}$.`
                  texteCorr += 'Pour appliquer une proportion à une valeur, on multiplie celle-ci par la proportion $p$.'
                  texteCorr += `<br>Comme $${100 - taux}~\\%$ des $${texNombre(totale, 0)}$ personnes sont majeures, le nombre de personnes majeures est donné par :`
                  texteCorr += `<br>$\\dfrac{${100 - taux}}{100} \\times ${texNombre(totale, 0)} = ${texNombre(p.mul(-1).add(1))} \\times ${texNombre(totale, 0)} = ${texNombre(sous2, 2)}$`
                  texteCorr += `<br>Il y a donc $${texNombre(sous2, 2)}$ personnes majeures dans le public.`
                  reponse = sous2
                  break
              }
              paramAMC = { digits: 4, decimals: 0, signe: false, approx: 0 } // on mets 4 chiffres même si la plupart des réponses n'en ont que 3 pour ne pas contraindre les réponses
              break
            case 'population-totale':
              texte = `Lors d'un concert, il y a $${texNombre(sous, 2)}$ spectacteurs de plus de $60$ ans, ce qui représente $${taux}~\\%$ du public. <br>Combien de spectateurs ont assisté au concert ?`
              texteCorr = `Soit $x$ le nombre total de spectateur. <br> Comme $${taux}~\\%$ de $x$ est égal à $${texNombre(sous, 2)}$, on a :`
              texteCorr += `<br>$\\begin{aligned}
              \\dfrac{${taux}}{100} \\times x &= ${texNombre(sous, 2)} \\\\\\
              ${texNombre(p, 2)} \\times x &= ${texNombre(sous, 2)} \\\\
              x &= \\dfrac{${texNombre(sous, 2)}}{${texNombre(p, 2)}} \\\\
              x &= ${texNombre(totale, 0)}
              \\end{aligned}$`
              texteCorr += `<br>Il y avait donc $${texNombre(totale, 0)}$ spectateurs.`
              reponse = totale
              paramAMC = { digits: 4, decimals: 0, signe: false, approx: 0 } // Le nombre attendu a bien 4 chiffres maxi
              break
            case 'proportion':
              texte = `Parmi les $${texNombre(totale, 0)}$ spectacteurs d'un concert, $${texNombre(sous, 2)}$ ont moins de $18$ ans. <br>Calculer la proportion des personnes mineures dans le public en pourcentage.`
              texteCorr = `La proportion $p$ est donnée par le quotient : $\\dfrac{${texNombre(sous, 2)}}{${texNombre(totale, 0)}} = ${texNombre(p, 2)}$.`
              texteCorr += `<br>$${texNombre(p, 2)}=\\dfrac{${texNombre(taux, 0)}}{100}$. Il y a donc $${taux}~\\%$ de personnes mineures dans le public.`
              reponse = taux
              paramAMC = { digits: 2, decimals: 0, signe: false, approx: 0 } // Le taux est ici inférieur à 100%
              break
          }
          break
        case 'cadeau' :
          switch (randint(1, 3)) {
            case 1:
              totale = 50 * randint(1, 3, 2)
              taux = 2 * randint(3, 17)
              break
            case 2:
              totale = 20 * randint(2, 8, 5)
              taux = 5 * randint(2, 7)
              break
            case 3:
              totale = 10 * randint(1, 15)
              taux = 10 * randint(1, 3)
              break
          }
          p = new Decimal(taux).div(100)
          sous = p.mul(totale)
          sous2 = sous.mul(-1).plus(totale)
          prénom = choice(['Frédéric', 'Brice', 'Marion', 'Christelle', 'Léo', 'Gabriel', 'Maël', 'Louise', 'Lina', 'Mia', 'Rose', 'Mohamed', 'Mehdi', 'Rayan', 'Karim', 'Yasmine', 'Noûr', 'Kaïs', 'Louna', 'Nora', 'Fatima', 'Nora', 'Nadia', 'Sohan', 'Timothée', 'Jamal'])
          switch (listeTypeDeQuestions[i]) {
            case 'sous-population':
              texte = `Le cadeau commun que nous souhaitons faire à ${prénom} coûte $${texPrix(totale)}$ €. Je participe à hauteur de $${taux}~\\%$ du prix total. <br>Combien ai-je donné pour le cadeau de ${prénom} ?`
              texteCorr = `Pour appliquer une proportion à une valeur, on multiplie celle-ci par la proportion $p$. <br>Comme ma participation représente $${taux}~\\%$ de $${texPrix(totale)}$, j'ai donné :`
              texteCorr += `<br>$\\dfrac{${taux}}{100} \\times ${texNombre(totale, 0)} = ${texNombre(p, 2)} \\times ${texNombre(totale, 0)}=${texNombre(sous, 2)}$`
              texteCorr += `<br>Ma participation au cadeau est de $${texPrix(sous)}$ €.`
              reponse = sous
              paramAMC = { digits: 3, decimals: 0, signe: false, approx: 0 } // la participation n'a que 2 chiffres mais on ne contraint pas la réponse
              break
            case 'population-totale':
              texte = `Pour le cadeau de ${prénom}, j'ai donné $${texPrix(sous)}$ €. Cela représente $${taux}~\\%$ du prix total du cadeau. <br>Quel est le montant du cadeau ?`
              texteCorr = `Soit $x$ le montant du cadeau. <br> Comme $${taux}~\\%$ de $x$ est égal à $${texPrix(sous)}$, on a :`
              texteCorr += `<br>$\\begin{aligned}
              \\dfrac{${taux}}{100} \\times x &= ${sous} \\\\\\
              ${texNombre(p, 2)} \\times x &= ${sous} \\\\
              x &= \\dfrac{${texPrix(sous, 2)}}{${texNombre(p, 2)}} \\\\
              x &= ${texPrix(totale)}
              \\end{aligned}$`
              texteCorr += `<br>Le cadeau coûte $${texPrix(totale)}$ €.`
              reponse = totale
              paramAMC = { digits: 3, decimals: 0, signe: false, approx: 0 }
              break
            case 'proportion':
              texte = `Le cadeau commun que nous souhaitons faire à ${prénom} coûte $${texPrix(totale)}$ €. Je participe à hauteur de $${texPrix(sous)}$ €. <br>Calculer la proportion de ma participation sur le prix total du cadeau.`
              texteCorr = `La proportion $p$ est donnée par le quotient : $\\dfrac{${texPrix(sous)}}{${texPrix(totale)}} = ${texNombre(p, 2)}$.`
              texteCorr += `<br>$${texNombre(p, 2)}=\\dfrac{${texNombre(taux, 0)}}{100}$. J'ai donc donné $${taux}~\\%$ du montant total du cadeau.`
              reponse = taux
              paramAMC = { digits: 2, decimals: 0, signe: false, approx: 0 } // Le taux est ici inférieur à 100%
              break
          }
          break
        case 'réserve' :
          switch (randint(1, 3)) {
            case 1:
              totale = 50 * randint(10, 60)
              taux = 2 * randint(3, 20)
              break
            case 2:
              totale = 20 * randint(25, 150)
              taux = 5 * randint(1, 9)
              break
            case 3:
              totale = 100 * randint(5, 30)
              taux = randint(8, 40)
              break
          }
          p = new Decimal(taux).div(100)
          sous = p.mul(totale)
          sous2 = sous.mul(-1).plus(totale)
          // espèce = choice(['pic noir', 'pipit farlouse', 'bruant des roseaux']) au singulier, inutile à priori
          espèces = choice(['pics noir', 'pipits farlouse', 'bruants des roseaux'])
          switch (listeTypeDeQuestions[i]) {
            case 'sous-population':
              texte = `Une réserve de protection d'oiseaux contient $${texNombre(totale, 0)}$ individus d'oiseaux. On dénombre $${taux}~\\%$ de ${espèces}.<br>Quel est le nombre de ${espèces} ?`
              texteCorr = `Pour appliquer une proportion à une valeur, on multiplie celle-ci par la proportion $p$. <br>Comme les ${espèces} représentent $${taux}~\\%$ de $${texNombre(totale, 0)}$, leur nombre est donné par :`
              texteCorr += `<br>$\\dfrac{${taux}}{100} \\times ${texNombre(totale, 0)} = ${texNombre(p, 2)} \\times ${texNombre(totale, 0)}=${texNombre(sous, 2)}$`
              texteCorr += `<br>Il y a $${texNombre(sous, 2)}$ ${espèces} dans la réserve.`
              reponse = sous
              paramAMC = { digits: 4, decimals: 0, signe: false, approx: 0 } // on mets 4 chiffres même si la plupart des réponses n'en ont que 3 pour ne pas contraindre les réponses

              break
            case 'population-totale':
              texte = `Dans une réserve de protection d'oiseaux, il y a $${texNombre(sous, 2)}$ ${espèces}, ce qui représente $${taux}~\\%$ du nombre total d'oiseaux. <br>Quel est le nombre d'oiseaux de cette réserve ?`
              texteCorr = `Soit $x$ le nombre d'oiseaux. <br> Comme $${taux}~\\%$ de $x$ est égal à $${texNombre(sous, 2)}$, on a :`
              texteCorr += `<br>$\\begin{aligned}
                \\dfrac{${taux}}{100} \\times x &= ${texNombre(sous, 2)} \\\\\\
                ${texNombre(p, 2)} \\times x &= ${texNombre(sous, 2)} \\\\
                x &= \\dfrac{${texNombre(sous, 2)}}{${texNombre(p, 2)}} \\\\
                x &= ${texNombre(totale, 0)}
                \\end{aligned}$`
              texteCorr += `<br>Il y a $${texNombre(totale, 0)}$ oiseaux dans la réserve.`
              reponse = totale
              paramAMC = { digits: 4, decimals: 0, signe: false, approx: 0 } // population à 4 chiffres (souvent)

              break
            case 'proportion':
              texte = `Une réserve de protection d'oiseaux contient $${texNombre(totale, 0)}$ individus d'oiseaux. On dénombre $${texNombre(sous, 2)}$ ${espèces}. <br>Calculer la proportion de ${espèces} dans la réserve.`
              texteCorr = `La proportion $p$ est donnée par le quotient : $\\dfrac{${texNombre(sous, 2)}}{${texNombre(totale, 0)}} = ${texNombre(p, 2)}$.`
              texteCorr += `<br>$${texNombre(p, 2)}=\\dfrac{${texNombre(taux, 0)}}{100}$. Le pourcentage de ${espèces} dans la réserve est donc de $${taux}~\\%$.`
              reponse = taux
              paramAMC = { digits: 2, decimals: 0, signe: false, approx: 0 } // Le taux est ici inférieur à 100%
              break
          }
          break
      }
      setReponse(this, i, reponse, paramAMC)
      if (context.isAmc && listeTypeDeQuestions[i] === 'proportion') {
        this.autoCorrection[i].reponse.textePosition = 'left'
        this.autoCorrection[i].reponse.texte = '\\\\En \\% : '
      }
      texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline')
      // à cause de ajouteChampTexteMathLive qui inclus un Id unique, toutes les questions sont différentes, comparer les textes ne suffit plus
      if (this.questionJamaisPosee(i, taux, totale, sous)) { // on utilise donc cette fonction basée sur les variables aléatoires pour éviter les doublons
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Déterminer l\'effectif d\'une sous-population \n2 : Calculer une proportion en pourcentage\n3 : Calculer l\'effectif de la population totale \n4 : Mélange']
}
