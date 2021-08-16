import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListesSansChangerOrdre, randint, texteEnCouleurEtGras, listeDesDiviseurs } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Problème Les iris et les roses'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Description didactique de l'exercice
 * 3 problèmes : Trouver le nombre maximal de groupes, de bouquets ou de corbeilles
 * en cherchant le plus grand diviseur commun de deux nombres.
 * Donner ensuite la composition de chaque groupe, bouquet ou corbeille.
 * @author Laurence Candille
 * Référence 3A14
 * Date août 2021
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactif = true
  this.interactifType = 'mathLive'

  this.nouvelleVersion = function () {
    const n = parseInt(this.sup) - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = [1, 2, 3] // 3 problèmes différents
    const listeTypeQuestions = combinaisonListesSansChangerOrdre(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    const nombrePremier = [2, 3, 5, 7, 11]
    const objet = randint(30, 39)

    const a = randint(0, 4)
    const var1 = nombrePremier[a]
    const b = randint(0, 4, [a])
    const var2 = nombrePremier[b]
    let texte, texteCorr

    switch (listeTypeQuestions[n]) { // Suivant le type de question, le contenu sera différent
      case 1:
        if (this.interactif) {
          texte = `Un fleuriste dispose de ${var1 * objet} iris et de ${var2 * objet} roses. <br>`
          texte += 'Il veut, en utilisant toutes ses fleurs, réaliser un maximum de bouquets '
          texte += 'contenant tous le même nombre d’iris et le même nombre de roses. <br>'
          texte += 'Donner le nombre maximal de bouquets que le fleuriste peut réaliser '
          texte += 'et la composition du bouquet.<br><br>'
          texte += texteEnCouleurEtGras('a) ') + 'Nombre maximal de bouquets :&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;'
          texte += ajouteChampTexteMathLive(this, 0, 'inline largeur25') + '<br><br>'
          texteCorr = texteEnCouleurEtGras('a) ')
          texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
          texteCorr += `&ensp;&ensp;- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
          texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet} <br>`
          texteCorr += ' Le nombre maximal de bouquets est donc : ' + texteEnCouleurEtGras(`${objet}<br><br>`)
          setReponse(this, 0, objet)

          texte += texteEnCouleurEtGras('b) ') + 'Nombre d’iris dans chaque bouquet :&ensp;&ensp;&ensp;'
          texte += ajouteChampTexteMathLive(this, 1, 'inline largeur25') + '<br><br>'
          texteCorr += texteEnCouleurEtGras('b) ') + ` $${var1 * objet} \\div ${objet} = ${var1}$.<br>`
          texteCorr += 'Le nombre d’iris dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var1} <br><br>`)
          setReponse(this, 1, var1)

          texte += texteEnCouleurEtGras('c) ') + ' Nombre de roses dans chaque bouquet :'
          texte += ajouteChampTexteMathLive(this, 2, 'inline largeur25') + '<br>'
          texteCorr += texteEnCouleurEtGras('c) ') + ` $${var2 * objet} \\div ${objet} = ${var2}$.<br>`
          texteCorr += 'Le nombre de roses dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var2} <br>`)
          setReponse(this, 2, var2)
        } else {
          texte = `Un fleuriste dispose de ${var1 * objet} iris et de ${var2 * objet} roses. <br>`
          texte += 'Il veut, en utilisant toutes ses fleurs, réaliser un maximum de bouquets '
          texte += 'contenant tous le même nombre d’iris et le même nombre de roses. <br><br>'
          texte += texteEnCouleurEtGras('a) ') + 'Quel est le nombre maximal de bouquets ?<br><br>'
          texteCorr = texteEnCouleurEtGras('a) ')
          texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
          texteCorr += `&ensp;&ensp;- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
          texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet} <br>`
          texteCorr += ' Le nombre maximal de bouquets est donc : ' + texteEnCouleurEtGras(`${objet}<br><br>`)

          texte += texteEnCouleurEtGras('b) ') + 'Quel est le nombre d’iris dans chaque bouquet ?<br><br>'
          texteCorr += texteEnCouleurEtGras('b) ') + ` $${var1 * objet} \\div ${objet} = ${var1}$.<br>`
          texteCorr += 'Le nombre d’iris dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var1} <br><br>`)

          texte += texteEnCouleurEtGras('c) ') + ' Quel est le nombre de roses dans chaque bouquet ?<br><br>'
          texteCorr += texteEnCouleurEtGras('c) ') + ` $${var2 * objet} \\div ${objet} = ${var2}$.<br>`
          texteCorr += 'Le nombre de roses dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var2} <br>`)
        }
        break
      case 2:
        if (this.interactif) {
          texte = `Un professeur organise une sortie pédagogique au Futuroscope pour ses élèves de 3ème. Il est accompagné de ${var1 * objet} garçons et de ${var2 * objet} filles. <br>`
          texte += 'Il souhaite répartir tous les élèves en réalisant un maximum de groupes '
          texte += 'contenant tous le même nombre de garçons et le même nombre de filles. <br>'
          texte += 'Donner le nombre maximal de groupes que le professeurs peut réaliser '
          texte += 'et la composition de chaque groupe.<br><br>'
          texte += texteEnCouleurEtGras('a) ') + 'Nombre maximal de groupes :&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;'
          texte += ajouteChampTexteMathLive(this, 0, 'inline largeur25') + '<br><br>'
          texteCorr = texteEnCouleurEtGras('a) ')
          texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
          texteCorr += `&ensp;&ensp;- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
          texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet} <br>`
          texteCorr += ' Le nombre maximal de groupes est donc : ' + texteEnCouleurEtGras(`${objet}<br><br>`)
          setReponse(this, 0, objet)

          texte += texteEnCouleurEtGras('b) ') + 'Nombre de garçons dans chaque groupe :'
          texte += ajouteChampTexteMathLive(this, 1, 'inline largeur25') + '<br><br>'
          texteCorr += texteEnCouleurEtGras('b) ') + ` $${var1 * objet} \\div ${objet} = ${var1}$.<br>`
          texteCorr += 'Le nombre de garçons dans chaque groupe est :' + texteEnCouleurEtGras(` ${var1} <br><br>`)
          setReponse(this, 1, var1)

          texte += texteEnCouleurEtGras('c) ') + ' Nombre de filles dans chaque groupe :&ensp;&ensp;&ensp;'
          texte += ajouteChampTexteMathLive(this, 2, 'inline largeur25') + '<br>'
          texteCorr += texteEnCouleurEtGras('c) ') + ` $${var2 * objet} \\div ${objet} = ${var2}$.<br>`
          texteCorr += 'Le nombre de filles dans chaque groupe est :' + texteEnCouleurEtGras(` ${var2} <br>`)
          setReponse(this, 2, var2)
        } else {
          texte = `Un professeur organise une sortie pédagogique au Futuroscope pour ses élèves de 3ème. Il est accompagné de ${var1 * objet} garçons et de ${var2 * objet} filles. <br>`
          texte += 'Il souhaite répartir tous les élèves en réalisant un maximum de groupes '
          texte += 'contenant tous le même nombre de garçons et le même nombre de filles. <br><br>'
          texte += texteEnCouleurEtGras('a) ') + 'Quel est le nombre maximal de groupes ?<br><br>'
          texteCorr = texteEnCouleurEtGras('a) ')
          texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
          texteCorr += `&ensp;&ensp;- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
          texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet} <br>`
          texteCorr += ' Le nombre maximal de groupes est donc : ' + texteEnCouleurEtGras(`${objet}<br><br>`)

          texte += texteEnCouleurEtGras('b) ') + 'Quel est le nombre de garçons dans chaque groupe ?<br><br>'
          texteCorr += texteEnCouleurEtGras('b) ') + ` $${var1 * objet} \\div ${objet} = ${var1}$.<br>`
          texteCorr += 'Le nombre de garçons dans chaque groupe est :' + texteEnCouleurEtGras(` ${var1} <br><br>`)

          texte += texteEnCouleurEtGras('c) ') + ' Quel est le nombre de filles dans chaque groupe ?<br><br>'
          texteCorr += texteEnCouleurEtGras('c) ') + ` $${var2 * objet} \\div ${objet} = ${var2}$.<br>`
          texteCorr += 'Le nombre de filles dans chaque groupe est :' + texteEnCouleurEtGras(` ${var2} <br>`)
        }
        break
      case 3:
        if (this.interactif) {
          texte = `Un boulanger dispose de ${var1 * objet} croissants et de ${var2 * objet} brioches. <br>`
          texte += 'Il veut, en utilisant toutes ses viennoiseries, réaliser un maximum de corbeilles '
          texte += 'contenant toutes le même nombre de croissants et le même nombre de brioches. <br>'
          texte += 'Donner le nombre maximal de corbeilles que le boulanger peut réaliser '
          texte += 'et la composition de chaque corbeille.<br><br>'
          texte += texteEnCouleurEtGras('a) ') + 'Nombre maximal de corbeilles :&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;'
          texte += ajouteChampTexteMathLive(this, 0, 'inline largeur25') + '<br><br>'
          texteCorr = texteEnCouleurEtGras('a) ')
          texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
          texteCorr += `&ensp;&ensp;- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
          texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet} <br>`
          texteCorr += ' Le nombre maximal de corbeilles est donc : ' + texteEnCouleurEtGras(`${objet}<br><br>`)
          setReponse(this, 0, objet)

          texte += texteEnCouleurEtGras('b) ') + 'Nombre de croissants dans chaque corbeille :'
          texte += ajouteChampTexteMathLive(this, 1, 'inline largeur25') + '<br><br>'
          texteCorr += texteEnCouleurEtGras('b) ') + ` $${var1 * objet} \\div ${objet} = ${var1}$.<br>`
          texteCorr += 'Le nombre de croissants dans chaque corbeille est :' + texteEnCouleurEtGras(` ${var1} <br><br>`)
          setReponse(this, 1, var1)

          texte += texteEnCouleurEtGras('c) ') + ' Nombre de brioches dans chaque corbeille :&ensp;&ensp;'
          texte += ajouteChampTexteMathLive(this, 2, 'inline largeur25') + '<br>'
          texteCorr += texteEnCouleurEtGras('c) ') + ` $${var2 * objet} \\div ${objet} = ${var2}$.<br>`
          texteCorr += 'Le nombre de brioches dans chaque corbeille est :' + texteEnCouleurEtGras(` ${var2} <br>`)
          setReponse(this, 2, var2)
        } else {
          texte = `Un boulanger dispose de ${var1 * objet} croissants et de ${var2 * objet} brioches. <br>`
          texte += 'Il veut, en utilisant toutes ses viennoiseries, réaliser un maximum de corbeilles '
          texte += 'contenant toutes le même nombre de croissants et le même nombre de brioches. <br>'
          texte += texteEnCouleurEtGras('a) ') + 'Quel est le nombre maximal de corbeilles ?<br><br>'
          texteCorr = texteEnCouleurEtGras('a) ')
          texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
          texteCorr += `&ensp;&ensp;- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
          texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet} <br>`
          texteCorr += ' Le nombre maximal de corbeilles est donc : ' + texteEnCouleurEtGras(`${objet}<br><br>`)

          texte += texteEnCouleurEtGras('b) ') + 'Quel est le nombre de croissants dans chaque corbeille ?<br><br>'
          texteCorr += texteEnCouleurEtGras('b) ') + ` $${var1 * objet} \\div ${objet} = ${var1}$.<br>`
          texteCorr += 'Le nombre de croissants dans chaque corbeille est :' + texteEnCouleurEtGras(` ${var1} <br><br>`)

          texte += texteEnCouleurEtGras('c) ') + ' Quel est le nombre de brioches dans chaque corbeille ?<br><br>'
          texteCorr += texteEnCouleurEtGras('c) ') + ` $${var2 * objet} \\div ${objet} = ${var2}$.<br>`
          texteCorr += 'Le nombre de brioches dans chaque corbeille est :' + texteEnCouleurEtGras(` ${var2} <br>`)
        }
        break
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Problèmes', 3, '1 : Le fleuriste\n2 : Le professeur\n3 : Le boulanger']
}
