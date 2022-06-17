import { choice, combinaisonListes, listeQuestionsToContenu, randint, texNombre } from '../../modules/outils.js'
import Exercice from '../Exercice.js'

export const titre = 'Convertir des durées'

/**
 * Conversions de durées.
 * * 1 : H vers min ou H ou min ou Hmin vers s
 * * 2 : h vers j-h
 * * 3 : s vers h min s
 * * 4 : h vers semaines j h
 * * 5 : toutes les conversions
 * @author Rémi Angot
 * Référence 6D10
 */
export default function ConversionsDeDurees () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 5
  this.titre = titre
  this.consigne = 'Convertir'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 2
  this.nbQuestions = 5

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const listeSousTypeDeQuestionV1 = combinaisonListes(
      [1, 2, 3, 4],
      this.nbQuestions
    )
    const listeSousTypeDeQuestionV2 = combinaisonListes(
      [0, 1, 2],
      this.nbQuestions
    )
    let typesDeQuestions = []
    if (this.sup < 5) {
      typesDeQuestions = combinaisonListes([this.sup], this.nbQuestions)
    }
    if (parseInt(this.sup) === 5) {
      typesDeQuestions = combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    }

    for (
      let i = 0, h, m, s, j, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (typesDeQuestions[i] === 1) {
        const sousTypeDeQuestion = listeSousTypeDeQuestionV1[i]
        if (sousTypeDeQuestion === 1) {
          h = randint(2, 11)
          texte = `$${h}~\\text{h en minutes.}$`
          texteCorr = `$${h}~\\text{h} = ${h}\\times60~~\\text{min} = ${texNombre(
              h * 60
            )}~\\text{min}$`
        }
        if (sousTypeDeQuestion === 2) {
          h = choice([1, 2, 10, 20])
          texte = `$${h}~\\text{h en secondes.}$`
          texteCorr = `$${h}~\\text{h} = ${h}\\times3~600~\\text{s} = ${texNombre(
              h * 3600
            )}~\\text{s}$`
        }
        if (sousTypeDeQuestion === 3) {
          m = randint(2, 59)
          texte = `$${m}~\\text{min en secondes.}$`
          texteCorr = `$${m}~\\text{min} = ${m}\\times60~\\text{s} = ${texNombre(
              m * 60
            )}~\\text{s}$`
        }
        if (sousTypeDeQuestion === 4) {
          h = randint(1, 2)
          m = randint(2, 59)
          texte = `$${h}~\\text{h}~${m}~\\text{min en secondes.}$`
          texteCorr = `$${h}~\\text{h}~${m}~\\text{min} = ${h}\\times3~600~\\text{s} + ${m}\\times60~\\text{s} = ${texNombre(
              h * 3600
            )}+${texNombre(m * 60)}~\\text{s} = ${texNombre(
              h * 3600 + m * 60
            )}~\\text{s}$`
        }
      }
      if (typesDeQuestions[i] === 2) {
        j = randint(1, 6)
        h = randint(1, 23)
        texte = `$${texNombre(h + 24 * j)}~\\text{h en jours et heures.}$`
        texteCorr = `$${texNombre(
            h + 24 * j
          )}~\\text{h} = ${j}\\times24~\\text{h} + ${h}~\\text{h} = ${j}~\\text{j}~${h}~\\text{h}$`
      }

      if (typesDeQuestions[i] === 3) {
        h = listeSousTypeDeQuestionV2[i]
        m = randint(1, 59)
        s = randint(1, 59)
        if (h > 0) {
          texte = `$${texNombre(
              h * 3600 + m * 60 + s
            )}~\\text{s en heures, minutes et secondes.}$`
          texteCorr = `$${texNombre(
              h * 3600 + m * 60 + s
            )}~\\text{s} = ${texNombre(h * 3600)}~\\text{s}+${
              m * 60 + s
            }~\\text{s} =${h}~\\text{h}+${m}\\times60~\\text{s}+${s}~\\text{s}=${h}~\\text{h}~${m}~\\text{min}~${s}~\\text{s}$`
        } else {
          texte = `$${texNombre(m * 60 + s)}~\\text{s en heures, minutes et secondes.}$`
          texteCorr = `$${texNombre(
              m * 60 + s
            )}~\\text{s} = ${m}\\times60~\\text{s}+${s}~\\text{s}=${m}~\\text{min}~${s}~\\text{s}$`
        }
      }
      if (typesDeQuestions[i] === 4) {
        s = randint(1, 9) // nombre de semaines
        j = randint(1, 6)
        h = randint(1, 23)
        texte = `$${texNombre(
            h + 24 * j + 24 * 7 * s
          )}~\\text{h en semaines jours et heures.}$`
        if (s > 1) {
          // pour la gestion du pluriel de semaines
          texteCorr = `$${texNombre(h + 24 * j + 24 * 7 * s)}~\\text{h} = ${
              j + 7 * s
            }\\times24~\\text{h} + ${h}~\\text{h} = ${
              j + 7 * s
            }~\\text{j}~${h}~\\text{h} = ${s}\\times7~\\text{j} + ${j}~\\text{j}~${h}~\\text{h} = ${s}~\\text{semaines}~${j}~\\text{j}~${h}~\\text{h}$`
        } else {
          texteCorr = `$${texNombre(h + 24 * j + 24 * 7 * s)}~\\text{h} = ${
              j + 7 * s
            }\\times24~\\text{h} + ${h}~\\text{h} = ${
              j + 7 * s
            }~\\text{j}~${h}~\\text{h} = ${s}\\times7~\\text{j} + ${j}~\\text{j}~${h}~\\text{h} = ${s}~\\text{semaine}~${j}~\\text{j}~${h}~\\text{h}$`
        }
      }
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
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    5,
    '1 : Conversions en secondes ou minutes\n2 : Conversions en jours-heures\n3 : Conversions en heures-minutes-secondes\n4 : Conversions en semaines-jours-heures\n5 : Mélange'
  ]
}
