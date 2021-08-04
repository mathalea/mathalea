import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, arrondi, texNombre, inferieurouegal, superieurouegal, texteEnCouleurEtGras, miseEnEvidence, enleveDoublonNum } from '../../modules/outils.js'
import { antecedentInterpole, graphiqueInterpole, imageInterpolee, mathalea2d, point, repere2, segment, tracePoint } from '../../modules/2d.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
export const titre = 'Lecture graphique'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function LecturesGraphiques () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  this.nbQuestions = 4
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeFonctionsDisponibles = ['image', 'plusPetitAntécédent', 'plusGrandAntécédent', 'nombreAntécédents'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeFonctionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let mini = 4
    let maxi = -4
    let antecedentTrouve
    let enonceAMC = ''
    const reponses = []
    let antecedents = []
    let s = []
    const r = repere2({
      xMin: -5,
      yMin: -5,
      xMax: 5,
      yMax: 5,
      yUnite: 2,
      xUnite: 3,
      grilleSecondaire: true,
      grilleSecondaireYDistance: 0.1,
      grilleSecondaireXDistance: 0.1,
      grilleSecondaireXMin: -4.6,
      grilleSecondaireXMax: 4.6
    })
    const noeuds = []
    for (let x = -4, y = -5; x < 5; x += 1) {
      y = randint(-4, 4, y)
      noeuds.push([x, y])
      mini = Math.min(y, mini)
      maxi = Math.max(y, maxi)
    }
    const graph = graphiqueInterpole(noeuds, { repere: r, step: 0.05 })
    this.introduction = mathalea2d({ xmin: -15, ymin: -10, xmax: 15, ymax: 10, scale: 0.5 }, r, graph) + '<br>'

    for (let i = 0, x0, y0, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'image':
          x0 = randint(-4, 4) / 2
          k = 0
          while (x0 > noeuds[k + 1][0]) {
            k++
          }
          y0 = arrondi(imageInterpolee([[noeuds[k][0], noeuds[k][1]], [noeuds[k + 1][0], noeuds[k + 1][1]]], x0), 1)
          texte = `Lire graphiquement l'image de ${texNombre(x0)} par la fonction $f$ représentée ci-dessus.<br>Donner la réponse à 0,1 près.<br>`
          if (!context.isAmc) setReponse(this, i, y0)
          reponses[i] = y0
          texte += ajouteChampTexteMathLive(this, i)
          texteCorr = `$f(${texNombre(x0)})=${texNombre(y0)}$.`
          if (this.correctionDetaillee) {
            s[0] = segment(0, y0 * 2, x0 * 3, y0 * 2)
            s[0].pointilles = true
            s[0].color = 'blue'
            s[1] = segment(x0 * 3, y0 * 2, x0 * 3, 0)
            s[1].color = 'red'
            s[1].pointilles = true
            s[2] = tracePoint(point(x0 * 3, y0 * 2), 'red')
            texteCorr += mathalea2d({ xmin: -15, ymin: -Math.abs(y0) * 2 - 1, xmax: 15, ymax: Math.abs(y0) * 2 + 1, scale: 0.5 }, r, graph, s)
          }
          break
        case 'plusPetitAntécédent':
          antecedentTrouve = false
          while (!antecedentTrouve) {
            y0 = randint(mini * 10 + 2, maxi * 10 - 2) / 10
            k = 0
            while (k < noeuds.length && (y0 > Math.max(noeuds[k][1], noeuds[k + 1][1]) || y0 < Math.min(noeuds[k][1], noeuds[k + 1][1]))) {
              k++
            }
            if (k < noeuds.length) antecedentTrouve = true
          }
          x0 = antecedentInterpole([[noeuds[k][0], noeuds[k][1]], [noeuds[k + 1][0], noeuds[k + 1][1]]], y0)
          texte = `Lire graphiquement le plus petit antécédent de ${texNombre(y0)} par la fonction $f$ représentée ci-dessus.<br>Donner la réponse à 0,1 près.<br>`
          if (!context.isAmc) setReponse(this, i, arrondi(x0, 1))
          reponses[i] = arrondi(x0, 1)
          texte += ajouteChampTexteMathLive(this, i)
          texteCorr = `Le plus petit antécédent à $0,1$ près de $${texNombre(y0)}$ est $${miseEnEvidence(texNombre(arrondi(x0, 1)))}$.`
          if (this.correctionDetaillee) {
            s[0] = segment(-15, y0 * 2, 15, y0 * 2)
            s[0].pointilles = true
            s[0].color = 'blue'
            s[1] = segment(x0 * 3, y0 * 2, x0 * 3, 0)
            s[1].color = 'red'
            s[1].pointilles = true
            texteCorr += mathalea2d({ xmin: -15, ymin: -Math.abs(y0) * 2 - 1, xmax: 15, ymax: Math.abs(y0) * 2 + 1, scale: 0.5 }, r, graph, s)
          }
          break
        case 'plusGrandAntécédent':
          s = []
          antecedentTrouve = false
          while (!antecedentTrouve) {
            y0 = randint(mini * 10 + 2, maxi * 10 - 2) / 10
            k = noeuds.length - 1
            while (k > 0 && (y0 > Math.max(noeuds[k - 1][1], noeuds[k][1]) || y0 < Math.min(noeuds[k - 1][1], noeuds[k][1]))) {
              k--
            }
            if (k > 0) antecedentTrouve = true
          }
          x0 = antecedentInterpole([[noeuds[k - 1][0], noeuds[k - 1][1]], [noeuds[k][0], noeuds[k][1]]], y0)
          texte = `Lire graphiquement le plus grand antécédent de ${texNombre(y0)} par la fonction $f$ représentée ci-dessus.<br>Donner la réponse à 0,1 près.<br>`
          if (!context.isAmc) setReponse(this, i, arrondi(x0, 1))
          reponses[i] = arrondi(x0, 1)
          texte += ajouteChampTexteMathLive(this, i)
          texteCorr = `Le plus grand antécédent de $${texNombre(y0)}$ à $0,1$ près est $${miseEnEvidence(texNombre(arrondi(x0, 1)))}$.`
          if (this.correctionDetaillee) {
            s[0] = segment(-15, y0 * 2, 15, y0 * 2)
            s[0].pointilles = true
            s[0].color = 'blue'
            s[1] = segment(x0 * 3, y0 * 2, x0 * 3, 0)
            s[1].color = 'red'
            s[1].pointilles = true
            texteCorr += mathalea2d({ xmin: -15, ymin: -Math.abs(y0) * 2 - 1, xmax: 15, ymax: Math.abs(y0) * 2 + 1, scale: 0.5 }, r, graph, s)
          }
          break
        case 'nombreAntécédents':
          antecedents = []
          s = []
          antecedentTrouve = 0
          y0 = randint(mini * 10 + 2, maxi * 10 - 2) / 10
          k = 0
          while (k < noeuds.length - 1) {
            if (inferieurouegal(y0, Math.max(noeuds[k][1], noeuds[k + 1][1])) && superieurouegal(y0, Math.min(noeuds[k][1], noeuds[k + 1][1]))) {
              // il y a un antécédent sur l'intervalle [ymini,ymaxi]
              x0 = antecedentInterpole([[noeuds[k][0], noeuds[k][1]], [noeuds[k + 1][0], noeuds[k + 1][1]]], y0)
              antecedents.push(x0)
            }
            k++
          }
          antecedents = enleveDoublonNum(antecedents, 0.1)
          antecedentTrouve = antecedents.length
          texte = `Lire graphiquement le nombre d'antécédents de ${texNombre(y0)} par la fonction $f$ représentée ci-dessus.<br>`
          texte += ajouteChampTexteMathLive(this, i)
          switch (antecedentTrouve) {
            case 0:
              texteCorr = `$${texNombre(y0)}$ ${texteEnCouleurEtGras("ne possède pas d'antécédents")} sur $[-4;4]$.<br>`
              break
            case 1 :
              texteCorr = `$${texNombre(y0)}$ ${texteEnCouleurEtGras('possède un unique antécédent')} sur $[-4;4]$.<br>`
              texteCorr = `L'antécédent de $${texNombre(y0)}$ est à $0,1$ près $${texNombre(arrondi(antecedents[0], 1))}$.<br>`
              break
            default :
              texteCorr = `$${texNombre(y0)}$ possède $${miseEnEvidence(antecedentTrouve)}$ antécédents sur $[-4;4]$.<br>`
              texteCorr += `Les antécédent de $${texNombre(y0)}$ sont à $0,1$ près: `
              for (let l = 0; l < antecedentTrouve - 1; l++) {
                texteCorr += `$${texNombre(arrondi(antecedents[l], 1))}$ ; `
              }
              texteCorr += `$${texNombre(arrondi(antecedents[antecedentTrouve - 1], 1))}$.<br>`
              break
          }
          if (!context.isAmc) setReponse(this, i, antecedentTrouve)
          reponses[i] = antecedentTrouve
          if (this.correctionDetaillee) {
            s[0] = segment(-15, y0 * 2, 15, y0 * 2)
            s[0].pointilles = true
            s[0].color = 'blue'
            for (let l = 0; l < antecedentTrouve; l++) {
              s[l * 2 + 1] = tracePoint(point(antecedents[l] * 3, y0 * 2), 'red')
              s[l * 2 + 1].epaisseur = 2
              s[l * 2 + 2] = segment(antecedents[l] * 3, 0, antecedents[l] * 3, y0 * 2)
              s[l * 2 + 2].pointilles = true
              s[l * 2 + 2].color = 'red'
            }
            texteCorr += mathalea2d({ xmin: -15, ymin: -Math.abs(y0) * 2 - 1, xmax: 15, ymax: Math.abs(y0) * 2 + 1, scale: 0.5 }, r, graph, s)
          }
          break
      }
      graph.epaisseur = 2
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    if (context.isAmc) {
      enonceAMC = this.introduction
      for (let i = 0; i < this.nbQuestions; i++) {
        enonceAMC += `${i + 1}) ${this.listeQuestions[i]}<br>`
      }
      this.autoCorrection[0] = {
        enonce: enonceAMC,
        propositions: []
      }
      for (let i = 0; i < this.nbQuestions; i++) {
        if (listeTypeQuestions[i] === 'nombreAntécédents') {
          this.autoCorrection[0].propositions[i] =
          {
            type: 'AMCNum',
            propositions: [{
              texte: this.listeCorrections[i],
              statut: '',
              reponse: {
                texte: `${i + 1}`,
                valeur: reponses[i],
                param: {
                  digits: 1,
                  decimals: 0,
                  signe: false,
                  approx: 0
                }
              }
            }]
          }
        } else {
          this.autoCorrection[0].propositions[i] =
          {
            type: 'AMCNum',
            propositions: [{
              texte: this.listeCorrections[i],
              statut: '',
              reponse: {
                texte: `${i + 1}`,
                valeur: reponses[i],
                param: {
                  digits: 2,
                  decimals: 1,
                  signe: true,
                  approx: 0
                }
              }
            }]
          }
        }
      }
    } else listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
