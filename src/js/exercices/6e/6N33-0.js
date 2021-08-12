import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, pgcd, calcul, texNombrec, texNombre, texFraction } from '../../modules/outils.js'
import { mathalea2d } from '../../modules/2d.js'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Calculer la fraction d’une quantité'

/**
 * Calculer la fracton d'une quantité avec ou sans dessin.
 * @author Jean-Claude Lhote
 * référence 6N33-0
 */
export default function FractionDuneQuantite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 5
  this.consigne = 'Calculer'
  context.isHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 2)
  context.isHtml ? (this.spacing = 2) : (this.spacing = 2)
  this.sup = 1
  this.sup2 = true
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    let listeTypeDeQuestions = []
    const choixdenh = combinaisonListes([3, 4, 5, 10, 12, 20, 30], this.nbQuestions)
    const choixdent = combinaisonListes([20, 24, 30], this.nbQuestions)
    const choixdenb = combinaisonListes([4, 5, 10, 12], this.nbQuestions)

    if (this.sup < 5) { typesDeQuestionsDisponibles = [parseInt(this.sup)] } else { typesDeQuestionsDisponibles = [1, 2, 3, 4] }
    listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (
      let i = 0, den, num, choix, longueur, numIrred, denIrred, k, masse, frac, frac2, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;
    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1:
          den = choixdenh[i]
          num = randint(1, den - 1)
          frac = fraction(num, den)
          texte = `À combien de minutes correspondent $${frac.texFraction}$ d'heure ?<br>`
          if (this.sup2) {
            texte += 'cette fraction est représentée ci dessous :<br>'
            texte += mathalea2d({ xmin: 0, ymin: 0, xmax: 15, ymax: 5 }, frac.representation(2.5, 2.5, 2, 0, 'gateau', 'blue'))
          }
          texteCorr = `Comme l'heure est partagée en ${den} parts égales, chaque part représente $${texFraction(1, den)}$ d'heure, soit $${calcul(60 / den)}$ minutes.<br>`
          texteCorr += `Ici, il y a $${texFraction(num, den)}$ d'heure, ce qui représente $${num}$ fois plus, soit $${num}\\times${calcul(60 / den)}=${calcul(num * 60 / den)}$.<br>`
          texteCorr += `$${frac.texFraction}$ d'heure correspond donc à $${calcul(num * 60 / den)}$ minutes.`
          break
        case 2:
          den = choixdenh[i]
          num = randint(1, 3 * den, den)
          frac = fraction(num, den)
          texte = `À combien de minutes correspondent $${frac.texFraction}$ d'heure ?<br>`
          if (this.sup2) {
            texte += 'Cette fraction est représentée ci dessous :<br>'
            texte += mathalea2d({ xmin: 0, ymin: 0, xmax: 15, ymax: 5 }, frac.representation(2.5, 2.5, 2, 0, 'gateau', 'blue'))
          }
          texteCorr = `Comme l'heure est partagée en ${den} parts égales, chaque part représente $${texFraction(1, den)}$ d'heure, soit $${calcul(60 / den)}$ minutes.<br>`
          texteCorr += `Ici, il y a $${texFraction(num, den)}$ d'heure, ce qui représente $${num}$ fois plus, soit $${num}\\times${calcul(60 / den)}=${calcul(num * 60 / den)}$.<br>`
          texteCorr += `$${frac.texFraction}$ d'heure correspond donc à $${calcul(num * 60 / den)}$ minutes.`
          break
        case 3:
          masse = choice([120, 180, 240, 300])
          denIrred = choixdent[i]
          numIrred = (i * randint(1, denIrred - 1)) % denIrred
          while (pgcd(denIrred, numIrred) !== 1 || calcul(denIrred / numIrred) === 2) {
            denIrred = choixdent[i]
            numIrred = randint(1, denIrred - 1)
          }
          frac = fraction(numIrred, denIrred)
          frac2 = frac.entierMoinsFraction(1)
          texte = `Voici une tablette de chocolat dont la masse totale est de $${masse}$ grammes. Quelqu'un en a déjà consommé les $${frac.texFractionSimplifiee}$.<br>`
          choix = randint(1, 2)
          if (choix === 1) {
            texte += 'Quelle masse de chocoloat a-t-elle été consommée ?<br>'
            texteCorr = `Comme la tablette a une masse de $${masse}$ grammes, $${texFraction(1, denIrred)}$ de la tablette représente une masse de $${calcul(masse / denIrred)}$ grammes.<br>`
            texteCorr += `Ici, il y a $${frac.texFractionSimplifiee}$ de la tablette qui a été consommé, ce qui représente $${numIrred}$ fois plus, soit $${numIrred}\\times${calcul(masse / denIrred)}=${calcul(numIrred * masse / denIrred)}$.<br>`
            texteCorr += `La masse de chocolat consommée est $${calcul(numIrred * masse / denIrred)}$ grammes.`
          } else {
            texte += 'Quelle masse de chocolat reste-t-il ?<br>'
            texteCorr = `Comme la tablette a une masse de $${masse}$ grammes, $${texFraction(1, denIrred)}$ de la tablette représente une masse de $${calcul(masse / denIrred)}$ grammes.<br>`
            texteCorr += `Ici, il y a $${frac.texFractionSimplifiee}$ de la tablette qui a été consommé, ce qui représente $${numIrred}$ fois plus, soit $${numIrred}\\times${calcul(masse / denIrred)}=${calcul(numIrred * masse / denIrred)}$.<br>`
            texteCorr += `La masse de chocolat consommée est $${calcul(numIrred * masse / denIrred)}$ grammes.<br>`
            texteCorr += `Il reste donc : $${masse}-${calcul(numIrred * masse / denIrred)}=${calcul(masse - numIrred * masse / denIrred)}$ grammes de chocolat.<br>`
            texteCorr += `une autre façon de faire est d'utiliser la fraction restante : $${texFraction(denIrred, denIrred)}-${frac.texFractionSimplifiee}=${texFraction(denIrred - numIrred, denIrred)}$.<br>`
            texteCorr += `$${texFraction(denIrred - numIrred, denIrred)}$ de $${masse}$ grammes c'est $${denIrred - numIrred}$ fois $${calcul(masse / denIrred)}$ grammes.<br>`
            texteCorr += `Il reste donc : $${denIrred - numIrred}\\times${calcul(masse / denIrred)}=${(denIrred - numIrred) * masse / denIrred}$ grammes de chocolat.`
          }
          if (this.sup2) {
            texte += 'La tablette de chocolat est représentée ci dessous :<br>'
            texte += mathalea2d({ xmin: -0.5, ymin: -0.5, xmax: 5, ymax: 7 }, frac2.representationIrred(0, 0, 4, 0, 'baton', 'brown'))
          }
          break
        case 4:
          num = randint(1, den - 1)
          longueur = choice([120, 180, 240, 300])
          denIrred = choixdenb[i]
          numIrred = randint(1, denIrred - 1)
          while (pgcd(denIrred, numIrred) !== 1 || calcul(denIrred / numIrred) === 2) {
            denIrred = choice([2, 3, 4, 5, 10])
            numIrred = randint(1, denIrred - 1)
          }
          k = calcul(300 / denIrred)
          den = calcul(denIrred * k)
          num = calcul(numIrred * k)
          frac = fraction(num, den)
          texte = `Un bâton de $${texNombrec(longueur / 100)}$ mètre`
          if (longueur >= 200) texte += 's'
          texte += ` de longueur est coupé à $${frac.texFractionSimplifiee}$ de sa longueur.<br>`
          texte += 'Calculer la longueur de chacun des morceaux en mètres.<br>'
          if (this.sup2) {
            texte += 'Ce bâton est représenté ci dessous :<br>'
            texte += mathalea2d({ xmin: -0.5, ymin: 0, xmax: 10, ymax: 2 }, frac.representationIrred(0, 1, 8, 0, 'segment', 'blue', '0', `${texNombre(calcul(longueur / 100))}`))
          }
          texteCorr = `$${texFraction(1, denIrred)}$ de $${texNombrec(longueur / 100)}$ représente $${texNombrec(longueur / 100)} \\div ${denIrred} = ${texNombrec(longueur / 100 / denIrred)}$.<br>`
          texteCorr += `Le premier morceau du bâton correspondant à $${frac.texFractionSimplifiee}$ du bâton mesure : $${numIrred} \\times ${texNombrec(longueur / 100 / denIrred)}=${texNombrec(numIrred * longueur / 100 / denIrred)}$ m.<br>`
          texteCorr += `Le deuxième morceau mesure donc : $${texNombrec(longueur / 100)}-${texNombrec(numIrred * longueur / 100 / denIrred)}=${texNombrec(longueur / 100 - numIrred * longueur / 100 / denIrred)}$ m.`

          break
      }

      if (this.listeCorrections.indexOf(texteCorr) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ["Type d'exercices", 5, "1 : Heures & minutes (inférieur à 1h)\n2 : Heures & minutes (jusqu'à 3h)\n3 : tablettes de chocolat\n4 : Bâton cassé\n5 : Mélange"]
  this.besoinFormulaire2CaseACocher = ['Avec dessin', true]
}
