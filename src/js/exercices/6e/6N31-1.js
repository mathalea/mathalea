import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, shuffle, combinaisonListesSansChangerOrdre, calcul, texNombre, miseEnEvidence } from '../../modules/outils.js'

export const titre = 'Encadrer un décimal par deux entiers consécutifs'

/**
 * * Encadrer_un_decimal_par_deux_entiers_consecutifs
 * * 6N31-1
 * @author Sébastien Lozano
 */
export const uuid = '3e083'
export const ref = '6N31-1'
export default function EncadrerUnDecimalParDeuxEntiersConsecutifs () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.beta = false
  this.sup = 1
  if (this.beta) {
    this.nbQuestions = 3
  } else {
    this.nbQuestions = 3
  };

  this.consigne = 'Encadrer chaque nombre proposé par deux nombres entiers consécutifs.'

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.beta) {
      typesDeQuestionsDisponibles = [0, 1, 2]
    } else {
      // typesDeQuestionsDisponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      typesDeQuestionsDisponibles = shuffle([0, 1, 2])
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const m = randint(1, 9)
      const c = randint(1, 9)
      const d = randint(1, 9)
      const u = randint(1, 9)
      const di = randint(1, 9)
      const ci = randint(1, 9)
      const mi = randint(1, 9)

      // pour les situations, autant de situations que de cas dans le switch !

      const enonces = []
      // for (let k=0;k<3;k++) {
      enonces.push({
        enonce: `
          $\\ldots < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < \\ldots$`,
        question: '',
        correction: `$${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$`
      })
      enonces.push({
        enonce: `
          $\\ldots < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))} < \\ldots$`,
        question: '',
        correction: `$${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))} < ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$`
      })
      enonces.push({
        enonce: `
          $\\ldots < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))} < \\ldots$`,
        question: '',
        correction: `$${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))} < ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$`
      })

      // };
      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
        case 1:
          texte = `${enonces[1].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
        case 2:
          texte = `${enonces[2].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          break
      };
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
