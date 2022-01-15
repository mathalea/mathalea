import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, range1, combinaisonListesSansChangerOrdre, texNombrec, texFraction, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale, calcul } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Donner l’écriture décimale d’un nombre à partir de différents textes'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Écriture décimale à partir de différentes manière de l'énoncé
 *
 * * 3 unités, 5 dixièmes et 8 centièmes
 * * 3 unités et 5 centièmes
 * * 5 dixièmes
 * * 128/10
 * * 8+5/100+7/100
 * @author Rémi Angot
 * Référence 6N23-4
 * Ajout Interactivité et AMC : Janvier 2022 par EE
 */
export default function NombreDecimalOraliseDeDifferentesManieres () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Donner l'écriture décimale de chaque nombre."
  this.nbQuestions = 5

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typesDeQuestionsDisponibles = range1(5)
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, c, reponseAMC, n, choix; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 9)
      b = randint(2, 9, a)
      c = randint(2, 9, [a, b])
      switch (listeTypeDeQuestions[i]) {
        case 1: // 3 unités, 5 dixièmes et 8 centièmes
          texte = `${a} unités, ${b} dixièmes et ${c} centièmes`
          reponseAMC = calcul(a + b / 10 + c / 100)
          texteCorr = `$${a}+${texFraction(b, 10)}+${texFraction(c, 100)}=${texNombrec(reponseAMC)}$`
          break
        case 2: // 3 unités et 5 centièmes
          texte = `${a} unités et ${c} centièmes`
          reponseAMC = calcul(a + c / 100)
          texteCorr = `$${a}+${texFraction(c, 100)}=${texNombrec(reponseAMC)}$`
          break
        case 3: // 5 dixièmes / centièmes ou millièmes
          choix = randint(1, 3)
          if (choix === 1) {
            texte = `${a} dixièmes`
            reponseAMC = calcul(a / 10)
            texteCorr = `$${texFraction(a, 10)}=${texNombrec(reponseAMC)}$`
          }
          if (choix === 2) {
            texte = `${a} centièmes`
            reponseAMC = calcul(a / 100)
            texteCorr = `$${texFraction(a, 100)}=${texNombrec(reponseAMC)}$`
          }
          if (choix === 3) {
            texte = `${a} millièmes`
            reponseAMC = calcul(a / 1000)
            texteCorr = `$${texFraction(a, 1000)}=${texNombrec(reponseAMC)}$`
          }
          break
        case 4: // 128/10
          n = a * 100 + b * 10 + c
          choix = randint(1, 3)
          if (choix === 1) {
            texte = `$${texFraction(n, 10)}$`
            reponseAMC = calcul(n / 10)
            texteCorr = `$${texFraction(n, 10)}=${texNombrec(reponseAMC)}$`
          }
          if (choix === 2) {
            texte = `$${texFraction(n, 100)}$`
            reponseAMC = calcul(n / 100)
            texteCorr = `$${texFraction(n, 100)}=${texNombrec(reponseAMC)}$`
          }
          if (choix === 1) {
            texte = `$${texFraction(n, 1000)}$`
            reponseAMC = calcul(n / 1000)
            texteCorr = `$${texFraction(n, 1000)}=${texNombrec(reponseAMC)}$`
          }
          break
        case 5: // 8+5/100+7/100
          choix = randint(1, 2)
          if (choix === 1) {
            texte = `$${a}+${texFraction(b, 100)}+${texFraction(c, 100)}$`
            reponseAMC = calcul(a + (b + c) / 100)
            texteCorr = `$${a}+${texFraction(b, 100)}+${texFraction(c, 100)}=${a}+${texFraction(b + c, 100)}=${texNombrec(reponseAMC)}$`
          }
          if (choix === 2) {
            texte = `$${a}+${texFraction(b, 10)}+${texFraction(c, 10)}$`
            reponseAMC = calcul(a + (b + c) / 10)
            texteCorr = `$${a}+${texFraction(b, 10)}+${texFraction(c, 10)}=${a}+${texFraction(b + c, 10)}=${a}+${texNombrec((b + c) / 10)}=${texNombrec(reponseAMC)}$`
          }
          break
      }
      const choixDigit = randint(0, 1)
      setReponse(this, i, reponseAMC, { digits: nombreDeChiffresDe(reponseAMC) + randint(choixDigit, choixDigit + 1), decimals: nombreDeChiffresDansLaPartieDecimale(reponseAMC) + choixDigit, signe: false })
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        if (!context.isHtml && i === 0) {
          texteCorr = '\\setlength\\itemsep{2em}' + texteCorr
        } // espacement entre les questions
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
