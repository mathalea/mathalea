import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Encadrer avec des puissances de 10'

/**
 * Encadrer par des puissances de 10
 * 4C30-1
 * @author Sébastien Lozano
 */
export default function PuissancesEncadrement () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 4
  this.nbQuestions = 6
  this.titre = titre

  this.consigne = 'Encadrer les nombres suivants par deux puissances de 10 d\'exposants consécutifs.'

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;

  let typesDeQuestionsDisponibles
  let signeChange

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup) // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
    signeChange = false
    switch (this.sup) {
      case 1: // nombre enier positif
        typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6]
        // this.nbQuestions = typesDeQuestionsDisponibles.length;
        // this.nbQuestions = 3;
        break
      case 2: // nombre décimal positif
        typesDeQuestionsDisponibles = [7, 8, 9, 10]
        // this.nbQuestions = typesDeQuestionsDisponibles.length;
        // this.nbQuestions = 3;
        break
      case 3: // nombre décimal positif inférieur à 1
        typesDeQuestionsDisponibles = [11, 12, 13, 14]
        // this.nbQuestions = typesDeQuestionsDisponibles.length;
        // this.nbQuestions = 3;
        break
      case 4: // Mélange
        typesDeQuestionsDisponibles = [
          choice([1, 2, 3]),
          choice([4, 5, 6]),
          choice([7, 8]),
          choice([9, 10]),
          choice([11, 12]),
          choice([13, 14])
        ]
        // this.nbQuestions = typesDeQuestionsDisponibles.length;
        break
      case 5: // Mélange
        typesDeQuestionsDisponibles = [
          choice([1, 2, 3]),
          choice([4, 5, 6]),
          choice([7, 8]),
          choice([9, 10]),
          choice([11, 12]),
          choice([13, 14])
        ]
        signeChange = true
        // this.nbQuestions = typesDeQuestionsDisponibles.length;
        break
    }

    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    // let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (
      let i = 0, signe, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // nombre entier positif, entre 1 et 10, puis 10 et 100 puis ....100 000 et 1 000 000
      const entPos = []
      const nombreEntier = []
      const nombreDecimal = []
      const nombreDecInfUn = []
      for (let i = 0; i < 6; i++) {
        signe = signeChange ? choice([-1, 1]) : 1
        entPos.push({
          val: `${texNombre(signe * randint(10 ** i + 1, 10 ** (i + 1) - 1))}`,
          puissance_inf: signe === 1 ? `10^{${i}}` : `-10^{${i + 1}}`,
          puissance_sup: signe === 1 ? `10^{${i + 1}}` : `-10^{${i}}`,
          puissance_inf_num: signe === 1 ? `${texNombre(10 ** i)}` : `$${texNombre(-1 * 10 ** (i + 1))}`,
          puissance_sup_num: signe === 1 ? `${texNombre(10 ** (i + 1))}` : `$${texNombre(-1 * 10 ** i)}`
        })
        nombreEntier.push(signe * randint(10 ** i + 1, 10 ** (i + 1)))
      }

      // nombre décimal positif 1 et 10 000 avec 1,2,3 puis 4 décimales
      const decPos = []
      for (let i = 0; i < 4; i++) {
        decPos.push({
          val: `${texNombre(calcul(signe * randint(10001, 99999) / 10 ** (4 - i)))}`,
          puissance_inf: signe === 1 ? `10^{${i}}` : `-10^{${i + 1}}`,
          puissance_sup: signe === 1 ? `10^{${i + 1}}` : `-10^{${i}}`,
          puissance_inf_num: signe === 1 ? `${texNombre(10 ** i)}` : `${texNombre(-1 * 10 ** (i + 1))}`,
          puissance_sup_num: signe === 1 ? `${texNombre(10 ** (i + 1))}` : `${texNombre(-1 * 10 ** i)}`
        })
        nombreDecimal.push(calcul(signe * randint(10001, 99999) / 10 ** (4 - i)))
      }
      // nombre décimal positif inférieur à 1, entre 0,1 et 1 puis entre 0,01 et 0,1 puis 0,001 et 0,0001
      const decPosInfUn = []
      for (let i = 0; i < 4; i++) {
        decPosInfUn.push({
          val: `${texNombre(calcul(signe * randint(10 ** (4 - i - 1) + 1, 10 ** (4 - i) - 1) / 10000))}`,
          puissance_inf: signe === 1 ? `10^{${-(i + 1)}}` : `-10^{${-i}}`,
          puissance_sup: signe === 1 ? `10^{${-i}}` : `-10^{${-(i + 1)}}`,
          puissance_inf_num: signe === 1 ? `${texNombre(calcul(10 ** -(i + 1)))}` : `${texNombre(calcul(-1 * 10 ** -i))}`,
          puissance_sup_num: signe === 1 ? `${texNombre(calcul(10 ** -i))}` : `${texNombre(calcul(-1 * 10 ** -(i + 1)))}`
        })
        nombreDecInfUn.push(calcul(randint(signe * 10 ** (4 - i - 1) + 1, 10 ** (4 - i)) / 10000))
      }

      switch (listeTypeDeQuestions[i]) {
        case 1: // nombre enier positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${entPos[0].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, entPos[0].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, entPos[0].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${entPos[0].puissance_inf} \\leqslant ${entPos[0].val} \\leqslant ${entPos[0].puissance_sup}$`
          texteCorr += ` car $${entPos[0].puissance_inf} = ${entPos[0].puissance_inf_num}$ et $${entPos[0].puissance_sup} = ${entPos[0].puissance_sup_num}$`
          break
        case 2: // nombre enier positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${entPos[1].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, entPos[1].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, entPos[1].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${entPos[1].puissance_inf} \\leqslant ${entPos[1].val} \\leqslant ${entPos[1].puissance_sup}$`
          texteCorr += ` car $${entPos[1].puissance_inf} = ${entPos[1].puissance_inf_num}$ et $${entPos[1].puissance_sup} = ${entPos[1].puissance_sup_num}$`
          break
        case 3: // nombre enier positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${entPos[2].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, entPos[2].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, entPos[2].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${entPos[2].puissance_inf} \\leqslant ${entPos[2].val} \\leqslant ${entPos[2].puissance_sup}$`
          texteCorr += ` car $${entPos[2].puissance_inf} = ${entPos[2].puissance_inf_num}$ et $${entPos[2].puissance_sup} = ${entPos[2].puissance_sup_num}$`
          break
        case 4: // nombre enier positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${entPos[3].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, entPos[3].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, entPos[3].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${entPos[3].puissance_inf} \\leqslant ${entPos[3].val} \\leqslant ${entPos[3].puissance_sup}$`
          texteCorr += ` car $${entPos[3].puissance_inf} = ${entPos[3].puissance_inf_num}$ et $${entPos[3].puissance_sup} = ${entPos[3].puissance_sup_num}$`
          break
        case 5: // nombre enier positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${entPos[4].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, entPos[4].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, entPos[4].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${entPos[4].puissance_inf} \\leqslant ${entPos[4].val} \\leqslant ${entPos[4].puissance_sup}$`
          texteCorr += ` car $${entPos[4].puissance_inf} = ${entPos[4].puissance_inf_num}$ et $${entPos[4].puissance_sup} = ${entPos[4].puissance_sup_num}$`
          break
        case 6: // nombre enier positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${entPos[5].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, entPos[5].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, entPos[5].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${entPos[5].puissance_inf} \\leqslant ${entPos[5].val} \\leqslant ${entPos[5].puissance_sup}$`
          texteCorr += ` car $${entPos[5].puissance_inf} = ${entPos[5].puissance_inf_num}$ et $${entPos[5].puissance_sup} = ${entPos[5].puissance_sup_num}$`
          break
        case 7: // nombre décimal positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${decPos[0].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, decPos[0].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, decPos[0].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${decPos[0].puissance_inf} \\leqslant ${decPos[0].val} \\leqslant ${decPos[0].puissance_sup}$`
          texteCorr += ` car $${decPos[0].puissance_inf} = ${decPos[0].puissance_inf_num}$ et $${decPos[0].puissance_sup} = ${decPos[0].puissance_sup_num}$`
          break
        case 8: // nombre décimal positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${decPos[1].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, decPos[1].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, decPos[1].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${decPos[1].puissance_inf} \\leqslant ${decPos[1].val} \\leqslant ${decPos[1].puissance_sup}$`
          texteCorr += ` car $${decPos[1].puissance_inf} = ${decPos[1].puissance_inf_num}$ et $${decPos[1].puissance_sup} = ${decPos[1].puissance_sup_num}$`
          break
        case 9: // nombre décimal positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${decPos[2].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, decPos[2].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, decPos[2].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${decPos[2].puissance_inf} \\leqslant ${decPos[2].val} \\leqslant ${decPos[2].puissance_sup}$`
          texteCorr += ` car $${decPos[2].puissance_inf} = ${decPos[2].puissance_inf_num}$ et $${decPos[2].puissance_sup} = ${decPos[2].puissance_sup_num}$`
          break
        case 10: // nombre décimal positif
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${decPos[3].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, decPos[3].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, decPos[3].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${decPos[3].puissance_inf} \\leqslant ${decPos[3].val} \\leqslant ${decPos[3].puissance_sup}$`
          texteCorr += ` car $${decPos[3].puissance_inf} = ${decPos[3].puissance_inf_num}$ et $${decPos[3].puissance_sup} = ${decPos[3].puissance_sup_num}$`
          break
        case 11: // nombre décimal positif inferieur à 1
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${decPosInfUn[0].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, decPosInfUn[0].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, decPosInfUn[0].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${decPosInfUn[0].puissance_inf} \\leqslant ${decPosInfUn[0].val} \\leqslant ${decPosInfUn[0].puissance_sup}$`
          texteCorr += ` car $${decPosInfUn[0].puissance_inf} = ${decPosInfUn[0].puissance_inf_num}$ et $${decPosInfUn[0].puissance_sup} = ${decPosInfUn[0].puissance_sup_num}$`
          break
        case 12: // nombre décimal positif inferieur à 1
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${decPosInfUn[1].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, decPosInfUn[1].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, decPosInfUn[1].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${decPosInfUn[1].puissance_inf} \\leqslant ${decPosInfUn[1].val} \\leqslant ${decPosInfUn[1].puissance_sup}$`
          texteCorr += ` car $${decPosInfUn[1].puissance_inf} = ${decPosInfUn[1].puissance_inf_num}$ et $${decPosInfUn[1].puissance_sup} = ${decPosInfUn[1].puissance_sup_num}$`
          break
        case 13: // nombre décimal positif inferieur à 1
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${decPosInfUn[2].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, decPosInfUn[2].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, decPosInfUn[2].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${decPosInfUn[2].puissance_inf} \\leqslant ${decPosInfUn[2].val} \\leqslant ${decPosInfUn[2].puissance_sup}$`
          texteCorr += ` car $${decPosInfUn[2].puissance_inf} = ${decPosInfUn[2].puissance_inf_num}$ et $${decPosInfUn[2].puissance_sup} = ${decPosInfUn[2].puissance_sup_num}$`
          break
        case 14: // nombre décimal positif inferieur à 1
          texte = ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$\\leqslant ${decPosInfUn[3].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline')
          setReponse(this, 2 * i, decPosInfUn[3].puissance_inf, { formatInteractif: 'puissance' })
          setReponse(this, 2 * i + 1, decPosInfUn[3].puissance_sup, { formatInteractif: 'puissance' })
          texteCorr = `$${decPosInfUn[3].puissance_inf} \\leqslant ${decPosInfUn[3].val} \\leqslant ${decPosInfUn[3].puissance_sup}$`
          texteCorr += ` car $${decPosInfUn[3].puissance_inf} = ${decPosInfUn[3].puissance_inf_num}$ et $${decPosInfUn[3].puissance_sup} = ${decPosInfUn[3].puissance_sup_num}$`
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
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
    4,
    '1 : Nombre entier positif\n2 : Nombre décimal positif\n3 : Nombre entier positif inférieur à 1\n4 : Mélange'
  ]
}
