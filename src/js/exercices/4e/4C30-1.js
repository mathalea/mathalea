import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Encadrer avec des puissances de 10'

/**
 * Encadrer par des puissances de 10
 * 4C30-1
 * @author Sébastien Lozano (Modifications apportées par Eric Elter)
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
    if (this.level === 2) {
      this.sup = 5
    }
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
          puissance_inf_num: signe === 1 ? `${texNombre(10 ** i)}` : `${texNombre(-1 * 10 ** (i + 1))}`,
          puissance_sup_num: signe === 1 ? `${texNombre(10 ** (i + 1))}` : `${texNombre(-1 * 10 ** i)}`
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
      if (listeTypeDeQuestions[i] < 7) { // nombre entier positif
        texte = this.interactif
          ? ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline', { texteApres: sp(10) }) + `$\\leqslant ${entPos[listeTypeDeQuestions[i] - 1].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          : `$\\dots\\dots\\dots${sp(1)}\\leqslant ${entPos[listeTypeDeQuestions[i] - 1].val}\\leqslant${sp(1)}\\dots\\dots\\dots$`
        setReponse(this, 2 * i, entPos[listeTypeDeQuestions[i] - 1].puissance_inf, { formatInteractif: 'puissance' })
        setReponse(this, 2 * i + 1, entPos[listeTypeDeQuestions[i] - 1].puissance_sup, { formatInteractif: 'puissance' })
        texteCorr = `$${entPos[listeTypeDeQuestions[i] - 1].puissance_inf} \\leqslant ${entPos[listeTypeDeQuestions[i] - 1].val} \\leqslant ${entPos[listeTypeDeQuestions[i] - 1].puissance_sup}$`
        texteCorr += ` car $${entPos[listeTypeDeQuestions[i] - 1].puissance_inf} = ${entPos[listeTypeDeQuestions[i] - 1].puissance_inf_num}$ et $${entPos[listeTypeDeQuestions[i] - 1].puissance_sup} = ${entPos[listeTypeDeQuestions[i] - 1].puissance_sup_num}.$`
      } else if (listeTypeDeQuestions[i] < 11) { // nombre décimal positif
        texte = this.interactif
          ? ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline', { texteApres: sp(10) }) + `$\\leqslant ${decPos[listeTypeDeQuestions[i] - 7].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          : `$\\dots\\dots\\dots${sp(1)}\\leqslant ${decPos[listeTypeDeQuestions[i] - 7].val}\\leqslant${sp(1)}\\dots\\dots\\dots$`
        setReponse(this, 2 * i, decPos[listeTypeDeQuestions[i] - 7].puissance_inf, { formatInteractif: 'puissance' })
        setReponse(this, 2 * i + 1, decPos[listeTypeDeQuestions[i] - 7].puissance_sup, { formatInteractif: 'puissance' })
        texteCorr = `$${decPos[listeTypeDeQuestions[i] - 7].puissance_inf} \\leqslant ${decPos[listeTypeDeQuestions[i] - 7].val} \\leqslant ${decPos[listeTypeDeQuestions[i] - 7].puissance_sup}$`
        texteCorr += ` car $${decPos[listeTypeDeQuestions[i] - 7].puissance_inf} = ${decPos[listeTypeDeQuestions[i] - 7].puissance_inf_num}$ et $${decPos[listeTypeDeQuestions[i] - 7].puissance_sup} = ${decPos[listeTypeDeQuestions[i] - 7].puissance_sup_num}.$`
      } else { // nombre décimal positif inferieur à 1
        texte = this.interactif
          ? ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline', { texteApres: sp(10) }) + `$\\leqslant ${decPosInfUn[listeTypeDeQuestions[i] - 11].val}\\leqslant $` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          : `$\\dots\\dots\\dots${sp(1)}\\leqslant ${decPosInfUn[listeTypeDeQuestions[i] - 11].val}\\leqslant${sp(1)}\\dots\\dots\\dots$`
        setReponse(this, 2 * i, decPosInfUn[listeTypeDeQuestions[i] - 11].puissance_inf, { formatInteractif: 'puissance' })
        setReponse(this, 2 * i + 1, decPosInfUn[listeTypeDeQuestions[i] - 11].puissance_sup, { formatInteractif: 'puissance' })
        texteCorr = `$${decPosInfUn[listeTypeDeQuestions[i] - 11].puissance_inf} \\leqslant ${decPosInfUn[listeTypeDeQuestions[i] - 11].val} \\leqslant ${decPosInfUn[listeTypeDeQuestions[i] - 11].puissance_sup}$`
        texteCorr += ` car $${decPosInfUn[listeTypeDeQuestions[i] - 11].puissance_inf} = ${decPosInfUn[listeTypeDeQuestions[i] - 11].puissance_inf_num}$ et $${decPosInfUn[listeTypeDeQuestions[i] - 11].puissance_sup} = ${decPosInfUn[listeTypeDeQuestions[i] - 11].puissance_sup_num}.$`
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
