import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListesSansChangerOrdre } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { numAlpha, sp, texteEnCouleurEtGras } from '../../modules/outils/contextSensitif.js'
import { listeDesDiviseurs } from '../../modules/outils/premiers.js'
import { contraindreValeur } from '../../modules/outils/comparateurs.js'
export const titre = 'Résoudre des problèmes avec recherche de diviseurs communs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Description didactique de l'exercice
 * 3 problèmes : Trouver le nombre maximal de groupes, de bouquets ou de corbeilles
 * en cherchant le plus grand diviseur commun de deux nombres.
 * Donner ensuite la composition de chaque groupe, bouquet ou corbeille.
 * @author Laurence Candille et Jean-Claude Lhote (pour l'export AMC)
 * Référence 3A12-1
 * Date août 2021
*/
export const uuid = '8c05e'
export const ref = '3A12-1'
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestionsModifiable = true
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactifType = 'mathLive'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let QuestionsDisponibles = [] // 3 problèmes différents
    let listeQuestions = []

    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = [1, 2, 3]
    } else {
      if (!isNaN(this.sup)) { // Si c'est un nombre c'est qu'il y a qu'un problème
        QuestionsDisponibles[0] = contraindreValeur(1, 3, parseInt(this.sup), 1)
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        // this.nbQuestions = QuestionsDisponibles.length
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(1, 3, parseInt(QuestionsDisponibles[i]), 1) // parseInt en fait un tableau d'entiers
        }
      }
    }

    listeQuestions = combinaisonListesSansChangerOrdre(QuestionsDisponibles, this.nbQuestions)
    const nombrePremier = [2, 3, 5, 7, 11]

    for (let i = 0, texte, texteSansQuestions, texteA, texteB, texteC, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objet = randint(30, 39) // objet représente : le nombre max de bouquets, de corbeilles ou de groupes
      const a = randint(0, 4)
      const var1 = nombrePremier[a] // var 1 est le nbre d iris, de croissants ou de garçons
      const b = randint(0, 4, [a])
      const var2 = nombrePremier[b] // var 2 est le nbre de roses, de brioches ou de filles
      switch (listeQuestions[i]) {
        case 1:
          if (this.interactif && !context.isAmc) {
            texte = `Un fleuriste dispose de ${var1 * objet} iris et de ${var2 * objet} roses. <br>`
            texte += 'Il veut, en utilisant toutes ses fleurs, réaliser un maximum de bouquets '
            texte += 'contenant tous le même nombre diris et le même nombre de roses. <br>'
            texte += 'Donner le nombre maximal de bouquets que le fleuriste peut réaliser '
            texte += 'et la composition du bouquet.<br><br>'
            texteA = numAlpha(0) + `Nombre maximal de bouquets :${sp(20)}`
            texte += texteA
            texte += ajouteChampTexteMathLive(this, 3 * i, 'inline largeur25') + '<br><br>'
            texteCorr = numAlpha(0)
            texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
            texteCorr += `${sp(2)}- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
            texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet}.<br>`
            texteCorr += ' Le nombre maximal de bouquets est donc : ' + texteEnCouleurEtGras(`${objet}`) + '.<br><br>'
            setReponse(this, 3 * i, objet)

            texteB = numAlpha(1) + `Nombre d'iris dans chaque bouquet :${sp(8)}`
            texte += texteB
            texte += ajouteChampTexteMathLive(this, 3 * i + 1, 'inline largeur25') + '<br><br>'
            texteCorr += numAlpha(1) + ` $${var1 * objet} \\div ${objet} = ${var1}$<br>`
            texteCorr += 'Le nombre d\'iris dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var1}`) + '.<br><br>'
            setReponse(this, 3 * i + 1, var1)

            texteC = numAlpha(2) + ' Nombre de roses dans chaque bouquet :'
            texte += texteC
            texte += ajouteChampTexteMathLive(this, 3 * i + 2, 'inline largeur25') + '<br>'
            texteCorr += numAlpha(2) + ` $${var2 * objet} \\div ${objet} = ${var2}$<br>`
            texteCorr += 'Le nombre de roses dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var2}`) + '.<br><br>'
            setReponse(this, 3 * i + 2, var2)
          } else {
            texte = `Un fleuriste dispose de ${var1 * objet} iris et de ${var2 * objet} roses. <br>`
            texte += 'Il veut, en utilisant toutes ses fleurs, réaliser un maximum de bouquets '
            texte += 'contenant tous le même nombre d\'iris et le même nombre de roses. <br><br>'
            texteSansQuestions = texte
            texteA = numAlpha(0) + 'Quel est le nombre maximal de bouquets ?<br><br>'
            texte += texteA
            texteCorr = numAlpha(0)
            texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
            texteCorr += `${sp(2)}- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
            texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet}.<br>`
            texteCorr += ' Le nombre maximal de bouquets est donc : ' + texteEnCouleurEtGras(`${objet}`) + '.<br><br>'

            texteB = numAlpha(1) + 'Quel est le nombre d\'iris dans chaque bouquet ?<br><br>'
            texte += texteB
            texteCorr += numAlpha(1) + ` $${var1 * objet} \\div ${objet} = ${var1}$<br>`
            texteCorr += 'Le nombre d\'iris dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var1}`) + '.<br><br>'

            texteC = numAlpha(2) + 'Quel est le nombre de roses dans chaque bouquet ?<br><br>'
            texte += texteC
            texteCorr += numAlpha(2) + ` $${var2 * objet} \\div ${objet} = ${var2}$<br>`
            texteCorr += 'Le nombre de roses dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var2}`) + '.<br><br>'
          }
          break
        case 2:
          if (this.interactif && !context.isAmc) {
            texte = `Un professeur organise une sortie pédagogique au Futuroscope pour ses élèves de 3ème. Il est accompagné de ${var1 * objet} garçons et de ${var2 * objet} filles. <br>`
            texte += 'Il souhaite répartir tous les élèves en réalisant un maximum de groupes '
            texte += 'contenant tous le même nombre de garçons et le même nombre de filles. <br>'
            texte += 'Donner le nombre maximal de groupes que le professeurs peut réaliser '
            texte += 'et la composition de chaque groupe.<br><br>'
            texteA = numAlpha(0) + `Nombre maximal de groupes :${sp(26)}`
            texte += texteA
            texte += ajouteChampTexteMathLive(this, 3 * i, 'inline largeur25') + '<br><br>'
            texteCorr = numAlpha(0)
            texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
            texteCorr += `${sp(2)}- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
            texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet}.<br>`
            texteCorr += ' Le nombre maximal de groupes est donc : ' + texteEnCouleurEtGras(`${objet}`) + '.<br><br>'
            setReponse(this, 3 * i, objet)

            texteB = numAlpha(1) + 'Nombre de garçons dans chaque groupe :'
            texte += texteB
            texte += ajouteChampTexteMathLive(this, 3 * i + 1, 'inline largeur25') + '<br><br>'
            texteCorr += numAlpha(1) + ` $${var1 * objet} \\div ${objet} = ${var1}$<br>`
            texteCorr += 'Le nombre de garçons dans chaque groupe est :' + texteEnCouleurEtGras(` ${var1}`) + '.<br><br>'
            setReponse(this, 3 * i + 1, var1)

            texteC = numAlpha(2) + ` Nombre de filles dans chaque groupe :${sp(6)}`
            texte += texteC
            texte += ajouteChampTexteMathLive(this, 3 * i + 2, 'inline largeur25') + '<br>'
            texteCorr += numAlpha(2) + ` $${var2 * objet} \\div ${objet} = ${var2}$<br>`
            texteCorr += 'Le nombre de filles dans chaque groupe est :' + texteEnCouleurEtGras(` ${var2}`) + '.<br><br>'
            setReponse(this, 3 * i + 2, var2)
          } else {
            texte = `Un professeur organise une sortie pédagogique au Futuroscope pour ses élèves de 3ème. Il est accompagné de ${var1 * objet} garçons et de ${var2 * objet} filles. <br>`
            texte += 'Il souhaite répartir tous les élèves en réalisant un maximum de groupes '
            texte += 'contenant tous le même nombre de garçons et le même nombre de filles. <br><br>'
            texteSansQuestions = texte
            texteA = numAlpha(0) + 'Quel est le nombre maximal de groupes ?<br><br>'
            texte += texteA
            texteCorr = numAlpha(0)
            texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
            texteCorr += `${sp(2)}- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
            texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet}.<br>`
            texteCorr += ' Le nombre maximal de groupes est donc : ' + texteEnCouleurEtGras(`${objet}`) + '.<br><br>'

            texteB = numAlpha(1) + 'Quel est le nombre de garçons dans chaque groupe ?<br><br>'
            texte += texteB
            texteCorr += numAlpha(1) + ` $${var1 * objet} \\div ${objet} = ${var1}$<br>`
            texteCorr += 'Le nombre de garçons dans chaque groupe est :' + texteEnCouleurEtGras(` ${var1}`) + '.<br><br>'

            texteC = numAlpha(2) + 'Quel est le nombre de filles dans chaque groupe ?<br><br>'
            texte += texteC
            texteCorr += numAlpha(2) + ` $${var2 * objet} \\div ${objet} = ${var2}$<br>`
            texteCorr += 'Le nombre de filles dans chaque groupe est :' + texteEnCouleurEtGras(` ${var2}`) + '.<br><br>'
          }
          break
        default: // si un utilisateur saisit 4 ou une valeur erronée renvoie par défaut vers le prbme 3
          if (this.interactif && !context.isAmc) {
            texte = `Un boulanger dispose de ${var1 * objet} croissants et de ${var2 * objet} brioches. <br>`
            texte += 'Il veut, en utilisant toutes ses viennoiseries, réaliser un maximum de corbeilles '
            texte += 'contenant toutes le même nombre de croissants et le même nombre de brioches. <br>'
            texte += 'Donner le nombre maximal de corbeilles que le boulanger peut réaliser '
            texte += 'et la composition de chaque corbeille.<br><br>'
            texteA = numAlpha(0) + 'Nombre maximal de corbeilles :' + `${sp(30)}`
            texte += texteA
            texte += ajouteChampTexteMathLive(this, 3 * i, 'inline largeur25') + '<br><br>'
            texteCorr = numAlpha(0)
            texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
            texteCorr += `${sp(2)};- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
            texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet}.<br>`
            texteCorr += ' Le nombre maximal de corbeilles est donc : ' + texteEnCouleurEtGras(`${objet}`) + '.<br><br>'
            setReponse(this, 3 * i, objet)

            texteB = numAlpha(1) + 'Nombre de croissants dans chaque corbeille :'
            texte += texteB
            texte += ajouteChampTexteMathLive(this, 3 * i + 1, 'inline largeur25') + '<br><br>'
            texteCorr += numAlpha(1) + ` $${var1 * objet} \\div ${objet} = ${var1}$<br>`
            texteCorr += 'Le nombre de croissants dans chaque corbeille est :' + texteEnCouleurEtGras(` ${var1}`) + '.<br><br>'
            setReponse(this, 3 * i + 1, var1)

            texteC = numAlpha(2) + ` Nombre de brioches dans chaque corbeille :${sp(2)}`
            texte += texteC
            texte += ajouteChampTexteMathLive(this, 3 * i + 2, 'inline largeur25') + '<br>'
            texteCorr += numAlpha(2) + ` $${var2 * objet} \\div ${objet} = ${var2}$<br>`
            texteCorr += 'Le nombre de brioches dans chaque corbeille est :' + texteEnCouleurEtGras(` ${var2}`) + '.<br><br>'
            setReponse(this, 3 * i + 2, var2)
          } else {
            texte = `Un boulanger dispose de ${var1 * objet} croissants et de ${var2 * objet} brioches. <br>`
            texte += 'Il veut, en utilisant toutes ses viennoiseries, réaliser un maximum de corbeilles '
            texte += 'contenant toutes le même nombre de croissants et le même nombre de brioches. <br><br>'
            texteSansQuestions = texte
            texteA = numAlpha(0) + 'Quel est le nombre maximal de corbeilles ?<br><br>'
            texte += texteA
            texteCorr = numAlpha(0)
            texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
            texteCorr += `${sp(2)}- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
            texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet}.<br>`
            texteCorr += ' Le nombre maximal de corbeilles est donc : ' + texteEnCouleurEtGras(`${objet}`) + '.<br><br>'

            texteB = numAlpha(1) + 'Quel est le nombre de croissants dans chaque corbeille ?<br><br>'
            texte += texteB
            texteCorr += numAlpha(1) + ` $${var1 * objet} \\div ${objet} = ${var1}$<br>`
            texteCorr += 'Le nombre de croissants dans chaque corbeille est :' + texteEnCouleurEtGras(` ${var1}`) + '.<br><br>'

            texteC = numAlpha(2) + 'Quel est le nombre de brioches dans chaque corbeille ?<br><br>'
            texte += texteC
            texteCorr += numAlpha(2) + ` $${var2 * objet} \\div ${objet} = ${var2}$<br>`
            texteCorr += 'Le nombre de brioches dans chaque corbeille est :' + texteEnCouleurEtGras(` ${var2}`) + '.<br><br>'
          }
          break
      } // fin du switch
      if (this.questionJamaisPosee(i, var1, var2, objet)) {
        console.log(texteA, texteB, texteC)
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: '',
            enonceAvant: false,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: texteSansQuestions + '<br>' + texteA,
                    valeur: objet,
                    param: {
                      digits: 2,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: texteB,
                    valeur: var1,
                    param: {
                      digits: 2,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: texteC,
                    valeur: var2,
                    param: {
                      digits: 2,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        }
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    } // fin du for

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : Fleuriste\n2 : Professeur\n3 : Boulanger\n']
}
