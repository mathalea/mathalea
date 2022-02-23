import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint, prenom, texPrix, texNombre, texNombrec, miseEnEvidence, texMasse } from '../../modules/outils.js'
import { mathalea2d, tableau } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Résoudre des problèmes de proportionnalité dans un tableau avec la linéarité'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Résoudre un problème de proportionnalité avec linéarité via tableau
 * @Mireille Gain, 30 mai 2021
 * Référence 6P11-2
*/export default function ProportionnaliteParLineariteTableau () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'On considère que les situations suivantes, sauf cas flagrant, sont des situations de proportionnalité. <br>On demande de les résoudre à l\'aide d\'un tableau.'
  this.nbQuestions = 5
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 4 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = [1, 1, 1, 1, 4]
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = [2, 2, 2, 2, 4]
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = [3, 3, 3, 3, 4]
    } else if (this.sup === 4) {
      typeDeQuestionsDisponibles = [1, 2, 3, 2, 4]
    }

    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    let np, cm, ng, o, pp, pg, pu, tp, index, a
    const fruits = [
      ['pêches', 0.24],
      ['noix', 0.29],
      ['cerises', 0.31],
      ['pommes', 0.12],
      ['framboises', 0.75],
      ['fraises', 0.37],
      ['citrons', 0.08],
      ['bananes', 0.09]
    ]

    const objets = [
      ['billes', 0.1],
      ['bonbons', 0.1],
      ['bougies', 1.2],
      ['crayons', 0.5],
      ['gâteaux', 1.3],
      ['gommes', 0.4],
      ['stickers', 0.2],
      ['cahiers', 1.4]
    ]

    for (let i = 0, texte, texteCorr, monTableau, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = choice([1, 2, 3])
      // Boucle principale où i+1 correspond au numéro de la question

      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 1: // multiplication
          if (a === 1) {
            index = randint(0, 7)
            np = randint(1, 10)
            cm = randint(2, 7)
            ng = np * cm
            pp = np * randint(8, 9) * ([objets[index][1]]) / 10
            pg = cm * pp
            o = choice([objets[index][0]])
            texte = `${prenom()} achète ${np} ${o} pour ${texPrix(pp)} €. Combien faudrait-il payer pour en acheter ${ng} ? `
            monTableau = tableau({
              largeurTitre: 9,
              hauteur: 2,
              ligne1: [`\\text{Nombre de ${o}}`, np, ng],
              ligne2: ['\\text{Prix (en euros)}', `${texPrix(pp)}`, `${miseEnEvidence(texPrix(pg))}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\times' + cm)}`]]
            })
            setReponse(this, i, pg)
          } else if (a === 2) {
            index = randint(0, 7)
            np = randint(1, 10)
            cm = randint(2, 7)
            ng = np * cm
            pp = np * fruits[index][1]
            pg = cm * pp
            o = choice([fruits[index][0]])
            texte = `${prenom()} achète ${texMasse(pp)} kg de ${o} pour ${texPrix(np)} €. Quelle masse pourrait être achetée avec ${ng} € ? `
            monTableau = tableau({
              largeurTitre: 9,
              hauteur: 2,
              ligne1: [`\\text{Prix des ${o} (en euros)}`, np, ng],
              ligne2: [`\\text{Masse des ${o} (en kg)}`, `${texMasse(pp)}`, `${miseEnEvidence(texMasse(pg))}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\times' + cm)}`]]
            })
            setReponse(this, i, pg)
          } else if (a === 3) {
            index = randint(0, 7)
            np = randint(1, 10)
            cm = randint(2, 7)
            ng = np * cm
            pp = np * randint(11, 48) / 10
            pg = cm * pp
            texte = `${np} objets occupent un volume de $${texNombre(pp)}$ cm³. Quel volume serait occupé par ${ng} de ces objets ? `
            monTableau = tableau({
              largeurTitre: 9,
              hauteur: 2,
              ligne1: ['\\text{Nombre d\'objets}', np, ng],
              ligne2: ['\\text{Volume des objets (en cm³)}', `${texNombre(pp)}`, `${miseEnEvidence(texNombrec(pg))}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\times' + cm)}`]]
            })
            setReponse(this, i, pg)
          }
          texteCorr = mathalea2d({ xmin: -1, xmax: 16, ymin: 0, ymax: 7.5, scale: 0.7, style: 'display: block' }, monTableau)
          break

        case 2: // division
          if (a === 1) {
            index = randint(0, 7)
            np = randint(1, 10)
            cm = randint(2, 7)
            ng = np * cm
            pp = np * randint(8, 9) / 10
            pg = cm * pp
            o = choice([objets[index][0]])
            texte = `${prenom()} achète ${ng} ${o} pour ${texPrix(pg)} €. Combien faudrait-il payer pour en acheter ${np} ? `
            monTableau = tableau({
              hauteur: 2,
              ligne1: [`\\text{Nombre de ${o}}`, ng, np],
              ligne2: ['\\text{Prix (en euros)}', `${texPrix(pg)}`, `${miseEnEvidence(texPrix(pp))}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\div' + cm)}`]],
              largeurTitre: 9
            })
            setReponse(this, i, pp)
          } else if (a === 2) {
            np = randint(1, 10)
            cm = randint(2, 7)
            ng = np * cm
            pp = np * randint(40, 60)
            pg = cm * pp
            texte = `${prenom()} peint une surface de $${pg}$ m² en ${ng} jours. Quelle surface serait peinte en ${np} jours ? `
            monTableau = tableau({
              largeurTitre: 9,
              hauteur: 2,
              ligne1: ['\\text{Durée (en jours)}', ng, np],
              ligne2: ['\\text{Surface peinte (en m²)}', `${texNombre(pg)}`, `${miseEnEvidence(texNombre(pp))}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\div' + cm)}`]]
            })
            setReponse(this, i, pp)
          } else if (a === 3) {
            index = randint(0, 7)
            np = randint(1, 10)
            cm = randint(2, 7)
            ng = np * cm
            pp = np * fruits[index][1]
            pg = cm * pp
            o = choice([fruits[index][0]])
            texte = `${prenom()} achète ${texMasse(pg)} kg de ${o} pour ${texPrix(ng)} €. Quelle masse pourrait être achetée avec ${np} € ? `
            monTableau = tableau({
              largeurTitre: 9,
              hauteur: 2,
              ligne1: [`\\text{Prix des ${o} (en euros)}`, ng, np],
              ligne2: [`\\text{Masse des ${o} (en kg)}`, `${texMasse(pg)}`, `${miseEnEvidence(texMasse(pp))}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\div' + cm)}`]]
            })
            setReponse(this, i, pp)
          }
          texteCorr = mathalea2d({ xmin: -1, xmax: 16, ymin: 0, ymax: 7.5, scale: 0.7, style: 'display: block' }, monTableau)
          break

        case 3: // passage par l'unité
          if (a === 1) {
            index = randint(0, 7)
            pu = randint(1, 19) * ([objets[index][1]]) / 10
            np = randint(2, 10)
            pp = pu * np
            ng = randint(2, 10, np)
            pg = pu * ng
            o = choice([objets[index][0]])
            texte = `${prenom()} achète ${np} ${o} pour ${texPrix(pp)} €. Combien faudrait-il payer pour en acheter ${ng} ? `
            monTableau = tableau({
              hauteur: 2,
              ligne1: [`\\text{Nombre de ${o}}`, np, 1, ng],
              ligne2: ['\\text{Prix (en euros)}', `${texPrix(pp)}`, `${miseEnEvidence(texPrix(pu))}`, `${miseEnEvidence(texPrix(pg))}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\div' + np)}`], [2, 3, `${miseEnEvidence('\\times' + ng)}`]],
              largeurTitre: 9
            })
            setReponse(this, i, pg)
          } else if (a === 2) {
            pu = randint(40, 60)
            np = randint(2, 10)
            pp = pu * np
            ng = randint(2, 10, np)
            pg = pu * ng
            texte = `${prenom()} peint une surface de $${pp}$ m² en ${np} jours. Quelle surface serait peinte en ${ng} jours ? `
            monTableau = tableau({
              largeurTitre: 9,
              hauteur: 2,
              ligne1: ['\\text{Durée (en jours)}', np, 1, ng],
              ligne2: ['\\text{Surface peinte (en m²)}', `${pp}`, `${miseEnEvidence(pu)}`, `${miseEnEvidence(pg)}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\div' + np)}`], [2, 3, `${miseEnEvidence('\\times' + ng)}`]]
            })
            setReponse(this, i, pg)
          } else if (a === 3) {
            index = randint(0, 7)
            pu = randint(8, 12) * fruits[index][1] / 10
            np = randint(2, 10)
            pp = pu * np
            ng = randint(2, 10, np)
            pg = pu * ng
            o = choice([fruits[index][0]])
            texte = `${prenom()} achète ${texMasse(pp)} kg de ${o} pour ${texPrix(np)} €. Quelle masse pourrait être achetée avec ${ng} € ? `
            monTableau = tableau({
              largeurTitre: 9,
              hauteur: 2,
              ligne1: [`\\text{Prix des ${o} (en euros)}`, np, 1, ng],
              ligne2: [`\\text{Masse des ${o} (en kg)}`, `${texMasse(pp)}`, `${miseEnEvidence(texMasse(pu))}`, `${miseEnEvidence(texMasse(pg))}`],
              flecheHaut: [[1, 2, `${miseEnEvidence('\\div' + np)}`], [2, 3, `${miseEnEvidence('\\times' + ng)}`]]
            })
            setReponse(this, i, pg)
          }
          texteCorr = mathalea2d({ xmin: -1, xmax: 19, ymin: 0, ymax: 7.5, scale: 0.7, style: 'display: block' }, monTableau)

          break

        case 4: // Non proportionnalité
          if (a === 1) {
            tp = randint(120, 165) / 100
            np = randint(10, 14)
            cm = randint(2, 4)
            ng = np * cm
            texte = `${prenom()} mesure $${texNombre(tp)}$ m à ${np} ans. Quelle sera sa taille à ${ng} ans ?`
            texteCorr = 'On ne peut pas savoir car la taille n\'est pas proportionnelle à l\'âge.'
          } else if (a === 2) {
            tp = randint(30, 45)
            np = randint(10, 13)
            cm = randint(2, 5)
            ng = np * cm
            texte = `${prenom()} pèse $${texNombre(tp)}$ kg à ${np} ans. Quelle sera son poids à ${ng} ans ?`
            texteCorr = 'On ne peut pas savoir car le poids (plus précisément la masse) n\'est pas proportionnel à l\'âge.'
          } else if (a === 3) {
            tp = randint(35, 39)
            np = randint(10, 13)
            cm = randint(2, 5)
            ng = np * cm
            texte = `${prenom()} chausse du $${texNombre(tp)}$ à ${np} ans. Quelle sera sa pointure à ${ng} ans ?`
            texteCorr = 'On ne peut pas savoir car la pointure n\'est pas proportionnelle à l\'âge.'
          }

          setReponse(this, i, 'non')
      }
      if (!this.interactif) {
        this.consigne = 'On considère que les situations suivantes, sauf cas flagrant, sont des situations de proportionnalité. <br>On demande de les résoudre à l\'aide d\'un tableau.'
      } else {
        this.consigne = 'On considère que les situations suivantes, sauf cas flagrant, sont des situations de proportionnalité. <br>Attention à donner le résultat avec le bon format : deux chiffres après la virgule si c\'est un prix, trois si c\'est une masse; écrire "non" si ce n\'est pas une situation de proportionnalité.'
      }
      texte += ajouteChampTexteMathLive(this, i)
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Multiplication\n2 : Division\n3 : Passage par l\'unité\n4 : Mélange']
}
