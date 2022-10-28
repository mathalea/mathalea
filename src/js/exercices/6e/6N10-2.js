import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texNombrec, calcul, miseEnEvidence } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Décomposer un nombre décimal (nombre de..., chiffre des..., partie entière, partie décimale)'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * Des questions sur le nombre ou le chiffre de centaines, de dizaines, de dixièmes, de centièmes...
 * @author Rémi Angot
 * Ajout de l'interactivité, de l'export AMC et du paramétrage par Jean-Claude Lhote (15/10/2021)
 * Référence 6N10-2
 * Relecture : Décembre 2021 par EE
 */
export const uuid = '6ea89'
export const ref = '6N10-2'
export default function DecompositionNombreDecimal () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Compléter les phrases suivantes.'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 7

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    switch (parseInt(this.sup)) {
      case 1:
        typesDeQuestionsDisponibles = [3, 4, 5, 6, 7, 8]
        break
      case 2:
        typesDeQuestionsDisponibles = [9, 10, 11, 12]
        break
      case 3:
        typesDeQuestionsDisponibles = [1, 2]
        break
      case 4:
        typesDeQuestionsDisponibles = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        break
      case 5:
        typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8]
        break
      case 6:
        typesDeQuestionsDisponibles = [1, 2, 9, 10, 11, 12]
        break
      default:
        typesDeQuestionsDisponibles = [
          1,
          2,
          choice([3, 4, 5]),
          choice([6, 7, 8]),
          choice([9, 10]),
          choice([11, 12])
        ] // sans chevauchement ou avec chevauchement
        break
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    // calcul ne semble pas marcher avec 7 chiffres significatifs
    this.consigne = 'Compléter les phrases suivantes.'
    for (
      let i = 0, m, c, d, u, di, ci, mi, n, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (i % typesDeQuestionsDisponibles.length === 0) {
        m = randint(1, 9) // le nombre sera le même tant qu'on peut poser des questions dessus, s'il y a trop de questions, on choisit un autre nombre
        c = randint(0, 9, [m])
        d = randint(0, 9, [m, c])
        u = randint(0, 9, [m, c, d])
        di = randint(0, 9, [m, c, d, u])
        ci = randint(0, 9, [m, c, d, u, di])
        mi = randint(1, 9, [m, c, d, u, di, ci])
        n =
          m.toString() +
          '~' +
          c.toString() +
          d.toString() +
          u.toString() +
          ',' +
          di.toString() +
          ci.toString() +
          mi
      }
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `La partie entière du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(texNombrec(m * 1000 + c * 100 + d * 10 + u))}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, m * 1000 + c * 100 + d * 10 + u)
          this.autoCorrection[i].reponse.param.digits = 5
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 2:
          texte = `La partie décimale du nombre $${n}$ est : `
          texteCorr =
            texte + `$${miseEnEvidence(texNombrec(di / 10 + ci / 100 + mi / 1000))}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, calcul(di / 10 + ci / 100 + mi / 1000))
          this.autoCorrection[i].reponse.param.digits = 6
          this.autoCorrection[i].reponse.param.decimals = 4
          break
        case 3:
          texte = `Le chiffre des dizaines du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(d)}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, d)
          this.autoCorrection[i].reponse.param.digits = 1
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 4:
          texte = `Le chiffre des centaines du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(c)}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, c)
          this.autoCorrection[i].reponse.param.digits = 1
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 5:
          texte = `Le chiffre des milliers du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(m)}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, m)
          this.autoCorrection[i].reponse.param.digits = 1
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 6:
          texte = `Le chiffre des dixièmes du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(di)}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, di)
          this.autoCorrection[i].reponse.param.digits = 1
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 7:
          texte = `Le chiffre des centièmes du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(ci)}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, ci)
          this.autoCorrection[i].reponse.param.digits = 1
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 8:
          texte = `Le chiffre des millièmes du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(mi)}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, mi)
          this.autoCorrection[i].reponse.param.digits = 1
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 9:
          texte = `Le nombre de dizaines du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(texNombrec(d + c * 10 + m * 100))}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, calcul(d + c * 10 + m * 100))
          this.autoCorrection[i].reponse.param.digits = 6
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 10:
          texte = `Le nombre de centaines du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(texNombrec(c + m * 10))}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, calcul(c + m * 10))
          this.autoCorrection[i].reponse.param.digits = 6
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 11:
          texte = `Le nombre de dixièmes du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(texNombrec(di + u * 10 + d * 100 + c * 1000 + m * 10000))}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, calcul(di + u * 10 + d * 100 + c * 1000 + m * 10000))
          this.autoCorrection[i].reponse.param.digits = 6
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        case 12:
          texte = `Le nombre de centièmes du nombre $${n}$ est : `
          texteCorr = texte + `$${miseEnEvidence(texNombrec(ci + di * 10 + u * 100 + d * 1000 + c * 10000 + m * 100000))}$`
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          setReponse(this, i, ci + di * 10 + u * 100 + d * 1000 + c * 10000 + m * 100000)
          this.autoCorrection[i].reponse.param.digits = 6
          this.autoCorrection[i].reponse.param.decimals = 0
          break
      }

      texteCorr += '.'
      if (!this.interactif) texte += '$\\ldots\\ldots\\ldots\\ldots$'
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
  this.besoinFormulaireNumerique = ['Choix de questions', 7, "1 : 'Chiffre des'\n2 : 'Nombre de'\n3 : Partie entière ou partie décimale\n4 : 'Chiffre des' ou 'nombre de'\n5 : 'Chiffre des' ou partie entière ou partie décimale\n6 : 'Nombre de' ou partie entière ou partie décimale\n7 : Mélange"]
}
