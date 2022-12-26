import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes2, texNombre, texteEnCouleurEtGras, rangeMinMax, combinaisonListes, choice, range, contraindreValeur, enleveElementNo, enleveElement, numAlpha } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { max, min, mod } from 'mathjs'
export const titre = "Trouver le vocabulaire associé aux termes de l'égalité issue de la division euclidienne"

export const amcReady = true
export const amcType = 'qcmMult'
export const interactifReady = true
export const interactifType = 'mathLive'

// Gestion de la date de publication initiale
export const dateDePublication = '25/10/2021'

/**
 * Détermination du vocabulaire associé à l'égalité issue de la division euclidienne
 *
 * @author Eric ELTER
 * Référence 6C11-2
 */
export const uuid = '4e35d'
export const ref = '6C11-2'
export default function VocabulaireDivisionEuclidienne () {
  Exercice.call(this)
  this.titre = titre
  this.spacing = 1
  this.nbQuestions = 5
  this.sup = 1
  this.sup2 = 1
  this.sup3 = 1
  this.sup4 = 3

  this.nouvelleVersion = function () {
    this.consigne = 'En utilisant le vocabulaire associé à la division euclidienne, détermine, '
    this.consigne += this.nbQuestions === 1 ? "pour l'égalité proposée, " : 'pour chaque égalité proposée, '
    this.consigne += 'le mot adapté au nombre désigné.'
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const QuestionsDisponibles = range(3)
    if (this.sup) {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        enleveElementNo(QuestionsDisponibles, contraindreValeur(-1, 3, this.sup - 1, -1))
      } else {
        const QuestionsDisponibles2 = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles2.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          if (QuestionsDisponibles.length > 2) {
            enleveElement(QuestionsDisponibles, contraindreValeur(-1, 3, parseInt(QuestionsDisponibles2[i]) - 1, -1))
          }
        }
      }
    }
    const ChoixReponses = ['dividende', 'diviseur', 'quotient', 'reste']
    const ChoixQuestions = this.sup2 === 2 ? combinaisonListes2(QuestionsDisponibles, this.nbQuestions) : combinaisonListes(QuestionsDisponibles, this.nbQuestions)
    let ReponsesCorrectes = []
    const Nbutilises = []
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      Nbutilises[0] = 0
      Nbutilises[1] = randint(5, 99)
      switch (this.sup4) {
        case 1 :
          Nbutilises[2] = randint(4, Nbutilises[1] - 1)
          Nbutilises[3] = randint(Nbutilises[2], Nbutilises[1] - 1)
          break
        case 2 :
          Nbutilises[2] = randint(5, 99, [Nbutilises[1]])
          Nbutilises[3] = randint(4, min(Nbutilises[2], Nbutilises[1]) - 1)
          break
        default :
          if (randint(0, 1) === 0) {
            Nbutilises[2] = randint(4, Nbutilises[1] - 1)
            Nbutilises[3] = randint(Nbutilises[2], Nbutilises[1] - 1)
          } else {
            Nbutilises[2] = randint(5, 99, [Nbutilises[1]])
            Nbutilises[3] = randint(4, min(Nbutilises[2], Nbutilises[1]) - 1)
          }
          Nbutilises[2] = randint(5, 99, [Nbutilises[1]])
          Nbutilises[3] = randint(4, max(Nbutilises[2], Nbutilises[1]) - 1, [min(Nbutilises[2], Nbutilises[1])])
          break
      }
      Nbutilises[0] = Nbutilises[2] * Nbutilises[1] + Nbutilises[3]
      const TabCorrection = []
      TabCorrection[0] = `$${texNombre(Nbutilises[0])}$ est le dividende`
      TabCorrection[1] = ''
      TabCorrection[2] = ''
      TabCorrection[3] = `$${Nbutilises[3]}$ est le reste`
      const TabEgaliteDivEuclidienne = []
      TabEgaliteDivEuclidienne[0] = `$${texNombre(Nbutilises[0])} = ${Nbutilises[1]} \\times ${Nbutilises[2]} + ${Nbutilises[3]}$`
      TabEgaliteDivEuclidienne[1] = `$${texNombre(Nbutilises[0])} = ${Nbutilises[3]} + ${Nbutilises[1]} \\times ${Nbutilises[2]}$`
      TabEgaliteDivEuclidienne[2] = `$${Nbutilises[1]} \\times ${Nbutilises[2]} + ${Nbutilises[3]} = ${texNombre(Nbutilises[0])}$`
      TabEgaliteDivEuclidienne[3] = `$${Nbutilises[3]} + ${Nbutilises[1]} \\times ${Nbutilises[2]} = ${texNombre(Nbutilises[0])}$`
      let EgaliteDivEuclidienne
      switch (this.sup3) {
        case 1 :
          EgaliteDivEuclidienne = TabEgaliteDivEuclidienne[0]
          break
        case 2 :
          EgaliteDivEuclidienne = TabEgaliteDivEuclidienne[choice(rangeMinMax(1, 3))]
          break
        default :
          EgaliteDivEuclidienne = TabEgaliteDivEuclidienne[choice(range(3))]
          break
      }
      texte = 'Dans ' + EgaliteDivEuclidienne + `, quel nom porte $${texNombre(Nbutilises[ChoixQuestions[i]])}$ lorsque l'égalité est associée à une division euclidienne ?<br>`
      if (Nbutilises[3] < Nbutilises[1]) {
        if (Nbutilises[3] < Nbutilises[2]) {
          texteCorr = `$${Nbutilises[3]}$ est inférieur à $${Nbutilises[1]}$ et à $${Nbutilises[2]}$ donc l'égalité ` + EgaliteDivEuclidienne + ' peut être associée à deux divisions euclidiennes différentes :<br>'
          TabCorrection[1] = `$${Nbutilises[1]}$ est le diviseur`
          TabCorrection[2] = `$${Nbutilises[2]}$ est le quotient`
          texteCorr += numAlpha(0) + `soit la division euclidienne de $ ${texNombre(Nbutilises[0])} $ par $ ${Nbutilises[1]} $. Alors, `
          for (let kk = 0; kk < 3; kk++) {
            texteCorr += kk === ChoixQuestions[i] ? texteEnCouleurEtGras(TabCorrection[kk]) : TabCorrection[kk]
            texteCorr += kk < 2 ? ', ' : ' et '
          }
          texteCorr += ChoixQuestions[i] === 3 ? texteEnCouleurEtGras(TabCorrection[3]) : TabCorrection[3]
          texteCorr += '.<br>'
          TabCorrection[1] = `$${Nbutilises[1]}$ est le quotient`
          TabCorrection[2] = `$${Nbutilises[2]}$ est le diviseur`
          TabCorrection[ChoixQuestions[i]] = texteEnCouleurEtGras(TabCorrection[ChoixQuestions[i]])
          texteCorr += numAlpha(1) + `soit la division euclidienne de $ ${texNombre(Nbutilises[0])} $ par $ ${Nbutilises[2]} $. Alors, `
          for (let kk = 0; kk < 3; kk++) {
            texteCorr += kk === ChoixQuestions[i] ? texteEnCouleurEtGras(TabCorrection[kk]) : TabCorrection[kk]
            texteCorr += kk < 2 ? ', ' : ' et '
          }
          texteCorr += ChoixQuestions[i] === 3 ? texteEnCouleurEtGras(TabCorrection[3]) : TabCorrection[3]
          texteCorr += '.<br>'
          if (mod(ChoixQuestions[i], 3) === 0) {
            ReponsesCorrectes = [ChoixReponses[ChoixQuestions[i]]]
          } else {
            ReponsesCorrectes = ['diviseur', 'quotient']
          }
        } else {
          texteCorr = `$${Nbutilises[3]}$ est inférieur à $${Nbutilises[1]}$ mais pas à $${Nbutilises[2]}$ donc l'égalité ` + EgaliteDivEuclidienne + ' est associée à'
          TabCorrection[1] = `$${Nbutilises[1]}$ est le diviseur`
          TabCorrection[2] = `$${Nbutilises[2]}$ est le quotient`
          texteCorr += ` la division euclidienne de $ ${texNombre(Nbutilises[0])} $ par $ ${Nbutilises[1]} $. Alors, `
          for (let kk = 0; kk < 3; kk++) {
            texteCorr += kk === ChoixQuestions[i] ? texteEnCouleurEtGras(TabCorrection[kk]) : TabCorrection[kk]
            texteCorr += kk < 2 ? ', ' : ' et '
          }
          texteCorr += ChoixQuestions[i] === 3 ? texteEnCouleurEtGras(TabCorrection[3]) : TabCorrection[3]
          texteCorr += '.<br>'
          ReponsesCorrectes = [ChoixReponses[ChoixQuestions[i]]]
        }
      } else {
        texteCorr = `$${Nbutilises[3]}$ est inférieur à $${Nbutilises[2]}$ mais pas à $${Nbutilises[1]}$ donc l'égalité ` + EgaliteDivEuclidienne + ' est associée à'
        TabCorrection[1] = `$${Nbutilises[1]}$ est le quotient`
        TabCorrection[2] = `$${Nbutilises[2]}$ est le diviseur`
        texteCorr += ` la division euclidienne de $ ${texNombre(Nbutilises[0])} $ par $ ${Nbutilises[2]} $. Alors, `
        for (let kk = 0; kk < 3; kk++) {
          texteCorr += kk === ChoixQuestions[i] ? texteEnCouleurEtGras(TabCorrection[kk]) : TabCorrection[kk]
          texteCorr += kk < 2 ? ', ' : ' et '
        }
        texteCorr += ChoixQuestions[i] === 3 ? texteEnCouleurEtGras(TabCorrection[3]) : TabCorrection[3]
        texteCorr += '.<br>'
        ReponsesCorrectes = [ChoixReponses[(3 - ChoixQuestions[i]) === 0 ? 3 : ((3 - ChoixQuestions[i]) % 3)]]
      }
      if (this.questionJamaisPosee(i, ...Nbutilises)) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (this.interactif) {
          texte += '<br>' + ajouteChampTexteMathLive(this, i, 'largeur 20 inline')
        }
        setReponse(this, i, ReponsesCorrectes, { formatInteractif: 'ignorerCasse' })
        if (context.isAmc) {
          //   this.autoCorrection[i].propositions = [{ texte: this.listeCorrections[i], statut: '1' }] // Ici, une seule ligne pour chaque zone de texte

          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: 'dividende',
              statut: ReponsesCorrectes.includes('dividende')
            },
            {
              texte: 'diviseur',
              statut: ReponsesCorrectes.includes('diviseur')
            },
            {
              texte: 'quotient',
              statut: ReponsesCorrectes.includes('quotient')
            },
            {
              texte: 'reste',
              statut: ReponsesCorrectes.includes('reste')
            }
          ]
          this.autoCorrection[i].options = {
            ordered: false
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
  this.besoinFormulaireTexte = ['Choix des mots à enlever',
    "(Nombres séparés par des tirets)\nAu maximum, seuls les deux premiers entiers non nuls différents seront retenus.\n0 : Pour enlever aucun mot\n1 : Pour enlever 'dividende' du choix des mots\n2 : Pour enlever 'diviseur' du choix des mots\n3 : Pour enlever 'quotient' du choix des mots\n4 : Pour enlever 'reste' du choix des mots"
  ]
  this.besoinFormulaire2Numerique = [
    'Choix sur les mots à trouver',
    2,
    '1 : Les mots à trouver sont répartis au hasard, mais de façon cyclique.\n2 : Les mots à trouver sont tous présents et répartis au hasard mais les mots ne sont pas répartis forcément équitablement.'
  ]
  this.besoinFormulaire3Numerique = [
    "Choix sur l'égalité",
    2,
    '1 : Égalité classique (a=bq+r ou a=qb+r)\n2 : Égalité moins classique (par exemple, a=r+bq ou qb+r=a)\n3 : Mélange'
  ]
  this.besoinFormulaire4Numerique = [
    'Choix sur le nombre de divisions euclidiennes associées à chaque égalité',
    3,
    '1 : Une seule division euclidienne associée\n2 : Deux divisions euclidiennes associées\n3 : Mélange'
  ]
}
