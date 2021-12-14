import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, texPrix } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Effectifs et proportions'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '9/12/2021'

/**
* Problèmes de proportions
*
* * Situations variées : spectacle, restaurant, bonbons
*
* * Déterminer l'effectif de la sous population
* * Calculer une proportion
* * Retrouver l'effectif de la population totale'
* * Mélange des 3 types de problèmes
* @author Florence Tapiero
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
    for (let i = 0, texte, texteCorr, sous, sous2, totale, taux, p, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
          p = calcul(taux / 100)
          sous = calcul(totale * p)
          sous2 = totale - sous
          switch (listeTypeDeQuestions[i]) {
            case 'sous-population':
              switch (randint(1, 2)) {
                case 1:
                  texte = `$${texNombre(totale)}$ personnes assistent à un concert. $${taux}~\\%$ ont moins de $18$ ans. <br>Calculer le nombre de personnes mineures dans le public.`
                  texteCorr = `Pour appliquer une proportion à une valeur, on multiplie celle-ci par la proportion $p$. <br>Comme $${taux}~\\%$ des $${texNombre(totale)}$ personnes sont mineures, le nombre de personnes mineures est donné par :`
                  texteCorr += `<br>$\\dfrac{${taux}}{100} \\times ${texNombre(totale)} = ${texNombre(p)} \\times ${texNombre(totale)}=${texNombre(sous)}$`
                  texteCorr += `<br>Il y a donc $${texNombre(sous)}$ personnes mineures dans le public.`
                  reponse = sous
                  break
                case 2:
                  texte = `$${texNombre(totale)}$ personnes assistent à un concert. $${taux}~\\%$ ont moins de $18$ ans. <br>Calculer le nombre de personnes majeures dans le public.`
                  texteCorr = `<br>On commence par déterminer la proportion de personnes majeures avec ce calcul : <br> $100-${taux}=${100 - taux}$.`
                  texteCorr += 'Pour appliquer une proportion à une valeur, on multiplie celle-ci par la proportion $p$.'
                  texteCorr += `<br>Comme $${100 - taux}~\\%$ des $${texNombre(totale)}$ personnes sont majeures, le nombre de personnes majeures est donné par :`
                  texteCorr += `<br>$\\dfrac{${100 - taux}}{100} \\times ${texNombre(totale)} = ${texNombre(calcul(1 - p))} \\times ${texNombre(totale)} = ${texNombre(sous2)}$`
                  texteCorr += `<br>Il y a donc $${texNombre(sous2)}$ personnes majeures dans le public.`
                  reponse = sous
                  break
              }
              break
            case 'population-totale':
              texte = `Lors d'un concert, il y a $${texNombre(sous)}$ spectacteurs de plus de $60$ ans, ce qui représente $${taux}~\\%$ du public. <br>Combien de spectateurs ont assisté au concert ?`
              texteCorr = `Soit $x$ le nombre total de spectateur. <br> Comme $${taux}~\\%$ de $x$ est égal à $${texNombre(sous)}$, on a :`
              texteCorr += `<br>$\\begin{aligned}
              \\dfrac{${taux}}{100} \\times x &= ${texNombre(sous)} \\\\\\
              ${texNombre(p)} \\times x &= ${texNombre(sous)} \\\\
              x &= \\dfrac{${texNombre(sous)}}{${texNombre(p)}} \\\\
              x &= ${texNombre(totale)}
              \\end{aligned}$`
              texteCorr += `<br>Il y avait donc $${texNombre(totale)}$ spectateurs.`
              reponse = totale
              break
            case 'proportion':
              texte = `Parmi les $${texNombre(totale)}$ spectacteurs d'un concert, $${texNombre(sous)}$ ont moins de $18$ ans. <br>Calculer la proportion des personnes mineures dans le public en pourcentage.`
              texteCorr = `La proportion $p$ est donnée par le quotient : $\\dfrac{${texNombre(sous)}}{${texNombre(totale)}} = ${texNombre(p)}$.`
              texteCorr += `<br>$${texNombre(p)}=\\dfrac{${texNombre(taux)}}{100}$. Il y a donc $${taux}~\\%$ de personnes mineures dans le public.`
              reponse = taux
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
          p = calcul(taux / 100)
          sous = calcul(totale * p)
          sous2 = totale - sous
          prénom = choice(['Frédéric', 'Brice', 'Marion', 'Christelle', 'Léo', 'Gabriel', 'Maël', 'Louise', 'Lina', 'Mia', 'Rose', 'Mohamed', 'Mehdi', 'Rayan', 'Karim', 'Yasmine', 'Noûr', 'Kaïs', 'Louna', 'Nora', 'Fatima', 'Nora', 'Nadia', 'Sohan', 'Timothée', 'Jamal'])
          switch (listeTypeDeQuestions[i]) {
            case 'sous-population':
              texte = `Le cadeau commun que nous souhaitons faire à ${prénom} coûte $${texPrix(totale)}$ €. Je participe à hauteur de $${taux}~\\%$ du prix total. <br>Combien ai-je donné pour le cadeau de ${prénom} ?`
              texteCorr = `Pour appliquer une proportion à une valeur, on multiplie celle-ci par la proportion $p$. <br>Comme ma participation représente $${taux}~\\%$ de $${texPrix(totale)}$, j'ai donné :`
              texteCorr += `<br>$\\dfrac{${taux}}{100} \\times ${texNombre(totale)} = ${texNombre(p)} \\times ${texNombre(totale)}=${texNombre(sous)}$`
              texteCorr += `<br>Ma participation au cadeau est de $${texPrix(sous)}$ €.`
              reponse = sous
              break
            case 'population-totale':
              texte = `Pour le cadeau de ${prénom}, j'ai donné $${texPrix(sous)}$ €. Cela représente $${taux}~\\%$ du prix total du cadeau. <br>Quel est le montant du cadeau ?`
              texteCorr = `Soit $x$ le montant du cadeau. <br> Comme $${taux}~\\%$ de $x$ est égal à $${texPrix(sous)}$, on a :`
              texteCorr += `<br>$\\begin{aligned}
              \\dfrac{${taux}}{100} \\times x &= ${sous} \\\\\\
              ${texNombre(p)} \\times x &= ${sous} \\\\
              x &= \\dfrac{${texPrix(sous)}}{${texNombre(p)}} \\\\
              x &= ${texPrix(totale)}
              \\end{aligned}$`
              texteCorr += `<br>Le cadeau coûte $${texPrix(totale)}$ €.`
              reponse = totale
              break
            case 'proportion':
              texte = `Le cadeau commun que nous souhaitons faire à ${prénom} coûte $${texPrix(totale)}$ €. Je participe à hauteur de $${texPrix(sous)}$ €. <br>Calculer la proportion de ma participation sur le prix total du cadeau.`
              texteCorr = `La proportion $p$ est donnée par le quotient : $\\dfrac{${texPrix(sous)}}{${texPrix}} = ${texNombre(p)}$.`
              texteCorr += `<br>$${texNombre(p)}=\\dfrac{${texNombre(taux)}}{100}$. J'ai donc donné $${taux}~\\%$ du montant total du cadeau.`
              reponse = taux
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
          p = calcul(taux / 100)
          sous = calcul(totale * p)
          sous2 = totale - sous
          // espèce = choice(['pic noir', 'pipit farlouse', 'bruant des roseaux']) au singulier, inutile à priori
          espèces = choice(['pics noir', 'pipits farlouse', 'bruants des roseaux'])
          switch (listeTypeDeQuestions[i]) {
            case 'sous-population':
              texte = `Une réserve de protection d'oiseaux contient $${texNombre(totale)}$ individus d'oiseaux. On dénombre $${taux}~\\%$ de ${espèces}.<br>Quel est le nombre de ${espèces} ?`
              texteCorr = `Pour appliquer une proportion à une valeur, on multiplie celle-ci par la proportion $p$. <br>Comme les ${espèces} représentent $${taux}~\\%$ de $${texNombre(totale)}$, leur nombre est donné par :`
              texteCorr += `<br>$\\dfrac{${taux}}{100} \\times ${texNombre(totale)} = ${texNombre(p)} \\times ${texNombre(totale)}=${texNombre(sous)}$`
              texteCorr += `<br>Il y a $${texNombre(sous)}$ ${espèces} dans la réserve.`
              reponse = sous
              break
            case 'population-totale':
              texte = `Dans une réserve de protection d'oiseaux, il y a $${texNombre(sous)}$ ${espèces}, ce qui représente $${taux}~\\%$ du nombre total d'oiseaux. <br>Quel est le nombre d'oiseaux de cette réserve ?`
              texteCorr = `Soit $x$ le nombre d'oiseaux. <br> Comme $${taux}~\\%$ de $x$ est égal à $${texNombre(sous)}$, on a :`
              texteCorr += `<br>$\\begin{aligned}
                \\dfrac{${taux}}{100} \\times x &= ${texNombre(sous)} \\\\\\
                ${texNombre(p)} \\times x &= ${texNombre(sous)} \\\\
                x &= \\dfrac{${texNombre(sous)}}{${texNombre(p)}} \\\\
                x &= ${texNombre(totale)}
                \\end{aligned}$`
              texteCorr += `<br>Il y a $${texNombre(totale)}$ oiseaux dans la réserve.`
              reponse = totale
              break
            case 'proportion':
              texte = `Une réserve de protection d'oiseaux contient $${texNombre(totale)}$ individus d'oiseaux. On dénombre $${texNombre(sous)}$ ${espèces}. <br>Calculer la proportion de ${espèces} dans la réserve.`
              texteCorr = `La proportion $p$ est donnée par le quotient : $\\dfrac{${texNombre(sous)}}{${texNombre(totale)}} = ${texNombre(p)}$.`
              texteCorr += `<br>$${texNombre(p)}=\\dfrac{${texNombre(taux)}}{100}$. Le pourcentage de ${espèces} dans la réserve est donc de $${taux}~\\%$.`
              reponse = taux
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Déterminer l\'effectif d\'une sous-population \n2 : Calculer une proportion en pourcentage\n3 : Calculer l\'effectif de la population totale \n4 : Mélange']
}
