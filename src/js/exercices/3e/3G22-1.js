import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { listeQuestionsToContenu, combinaisonListes, randint, texNombre } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import Grandeur from '../../modules/Grandeur.js'
export const titre = 'Agrandissement et réduction'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon rendu interactif par JC Lhote + utilisation de decimal.js
 * Référence
*/
export const uuid = 'a0ad1'
export const ref = '3G22-1'
export default function Agrandissement () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 3 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4', 'type5', 'type1I', 'type5I', 'type6'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, V1, V2, A1, A2, l1, l2, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      k = new Decimal(randint(1, 20, 10)).div(10)
      V1 = randint(10, 120) // Les données de départ sont entières, on n'utilise pas Decimal() ici
      l1 = randint(2, 20)
      A1 = randint(2, 20)
      V2 = k.pow(3).mul(V1) // k et les données d'arrivée sont des instances de Decimal()
      A2 = k.pow(2).mul(A1)
      l2 = k.mul(l1)
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': // calcul de V2 connaissant V1 et k
          texte = `Un solide a un volume de $${V1}$ cm³.`
          texte += k.gt(1) ? ' On l\'agrandit ' : ' On le réduit '
          texte += ` à l'échelle $${texNombre(k, 1)}$. <br>Quel est le volume du nouveau solide ?` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les volumes sont multipliés par $k^3$.'
          texteCorr += '<br>Dans notre exercice, on'
          texteCorr += k.gt(1) ? ' agrandit ' : ' réduit '
          texteCorr += `un solide à l'échelle $${texNombre(k, 1)}$.`
          texteCorr += `<br>Le volume obtenu est donc multiplié par $${texNombre(k, 1)}^3$.`
          texteCorr += `<br>Le volume obtenu est donc $V=${V1}\\times ${texNombre(k, 1)}^3=${texNombre(V2, 3)} ~cm^3$.`
          setReponse(this, i, new Grandeur(V2, 'cm^3'), { formatInteractif: 'unites' })
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline unites[Longueurs,Aires,Volumes]')
          break
        case 'type1I': // calcul de V1 connaissant V2 et k
          texte = 'Un solide a été '
          texte += k.gt(1) ? 'agrandi ' : 'réduit '
          texte += ` à l'échelle $${texNombre(k, 1)}$. Le volume final est $${texNombre(V2, 3)}$  cm³.<br>Quel est le volume du solide initial ?` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les volumes sont multipliés par $k^3$.'
          texteCorr += '<br>Dans notre exercice, on'
          texteCorr += k.gt(1) ? ' agrandit ' : ' réduit '
          texteCorr += `un solide à l'échelle $${texNombre(k, 1)}$.`
          texteCorr += `<br>Le volume obtenu est donc multiplié par $${texNombre(k, 1)}^3$.`
          texteCorr += `<br>Le volume initial est donc $V=\\dfrac{${texNombre(V2, 3)}}{${texNombre(k, 1)}^3}=${V1} ~cm^3$.`
          setReponse(this, i, new Grandeur(V1, 'cm^3'), { formatInteractif: 'unites' })
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline unites[Longueurs,Aires,Volumes]')
          break

        case 'type2':// Calcul de k connaissant A1 et A2
          texte = `Une figure a une aire de $${A1}$ cm². `
          texte += k.gt(1) ? ' On l\'agrandit ' : ' On la réduit '
          texte += `et l'aire obtenue est de $${texNombre(A2, 2)}$ cm².`
          texte += '<br> Quel est le coefficient '
          texte += k.gt(1) ? ' d\'agrandissement ? ' : ' de réduction ? '
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les aires sont multipliées par $k^2$.'
          texteCorr += '<br>Dans notre exercice, en appelant $k$ le coefficient'
          texteCorr += k.gt(1) ? ' d\'agrandissement' : ' de réduction'
          texteCorr += `, on a l'égalité :  $${texNombre(A2, 2)}=k^2\\times${A1}.$`
          texteCorr += `<br>On en déduit que : $k^2=\\dfrac{${texNombre(A2, 2)}}{${A1}}=${texNombre(A2.div(A1), 2)}$.`
          texteCorr += `<br>$k$ est un nombre positif, on peut conclure que : $k=\\sqrt{${texNombre(A2.div(A1), 2)}}=${texNombre(k, 1)}$.`
          texteCorr += '<br>Le coefficient'
          texteCorr += k.gt(1) ? ' d\'agrandissement' : ' de réduction'
          texteCorr += ` est donc $k=${texNombre(k, 1)}$.`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')

          setReponse(this, i, k)
          break
        case 'type3':// calcul de k connaissant l1 et l2
          texte = `Sur une figure, on relève une longueur de $${l1}$ cm. <br>`
          texte += k.gt(1) ? ' On agrandit ' : ' On réduit '
          texte += `cette figure et la longueur obtenue mesure alors $${texNombre(l2, 1)}$ cm.`
          texte += '<br> Quelle est l\'échelle '
          texte += k.gt(1) ? ' d\'agrandissement ? ' : ' de réduction ? '
          texteCorr = 'Dans cette situation, la longueur dont on connaît la mesure a été multipliée par '
          texteCorr += `$k=\\dfrac{${texNombre(l2, 1)}}{${l1}}= ${texNombre(k, 1)}$.<br>`
          texteCorr += 'Comme $k'
          texteCorr += k.gt(1) ? ' >' : ' <'
          texteCorr += '1$, on en déduit qu\'il s\'agit d\'un'
          texteCorr += k.gt(1) ? ' agrandissement' : 'e réduction'
          texteCorr += ` à l'échelle $${texNombre(k, 1)}$.`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          setReponse(this, i, k)

          break
        case 'type4':// Calcul de k connaissant V1 et V2
          texte = `Un solide a un volume de $${V1}$ cm³.`
          texte += k.gt(1) ? ' On l\'agrandit ' : ' On le réduit '
          texte += `et le solide obtenu a un volume de $${texNombre(V2, 3)}$ cm³.`
          texte += '<br> Quel est le coefficient '
          texte += k.gt(1) ? ' d\'agrandissement ? ' : ' de réduction ? '
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les volumes sont multipliées par $k^3$.'
          texteCorr += '<br>Dans notre exercice, en appelant $k$ le coefficient'
          texteCorr += k.gt(1) ? ' d\'agrandissement' : ' de réduction'
          texteCorr += `, on a l'égalité :  $${texNombre(V2, 3)}=k^3\\times${V1}.$`
          texteCorr += `<br>On en déduit que : $k^3=\\dfrac{${texNombre(V2, 3)}}{${V1}}=${texNombre(V2.div(V1), 3)}$.`
          texteCorr += `<br>On peut conclure que : $k=\\sqrt[3]{${texNombre(V2.div(V1), 3)}}=${texNombre(k, 1)}$.`
          texteCorr += '<br>L\'échelle '
          texteCorr += k.gt(1) ? ' d\'agrandissement' : ' de réduction'
          texteCorr += ` est donc $k=${texNombre(k, 1)}$ `
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')

          setReponse(this, i, k)
          break

        case 'type6':// conservation de angles k et V1 (angle) donné
          texte = `Sur une figure, on relève la mesure d'un angle : $\\widehat{ABC}=${V1} °$. <br>`
          texte += k.gt(1) ? ' On agrandit ' : ' On réduit '
          texte += `cette figure à l'échelle $k=${texNombre(k, 1)}$.`
          texte += '<br> Déterminer la mesure de l\'angle $\\widehat{A\'B\'C\'}$ de la figure '
          texte += k.gt(1) ? '  agrandie. ' : ' réduite. '
          texteCorr = 'On sait que dans un agrandissement ou une réduction à l\'échelle $k$,  '
          texteCorr += 'les longueurs sont toutes multipliées par $k$.<br> Par contre, les mesures d\'angles ne sont pas modifiées.<br>'
          texteCorr += `<br>On en déduit : $\\widehat{A'B'C'}=\\widehat{ABC}=${V1} °$.`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline collège')
          setReponse(this, i, k)
          setReponse(this, i, new Grandeur(V1, '°'), { formatInteractif: 'unites' })

          break
        case 'type5': // Calcul de A2 connaissant k et A1
          texte = `Une figure a une aire de $${A1}$ cm². `
          texte += k.gt(1) ? ' On l\'agrandit ' : ' On la réduit '
          texte += `à l'échelle $k=${texNombre(k, 1)}$.`
          texte += '<br> Calculer l\'aire de la figure  '
          texte += k.gt(1) ? ' agrandie. ' : ' réduite. '
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les aires sont multipliées par $k^2$.'
          texteCorr += '<br>Dans notre exercice, en appelant $A$ l\'aire '
          texteCorr += k.gt(1) ? ' agrandie, ' : ' réduite, '
          texteCorr += `on a l'égalité :  $A=${texNombre(k, 1)}^2\\times${A1}.$`
          texteCorr += `<br>D'où :  $A=${texNombre(A2, 2)}$ cm²`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline unites[Longueurs,Aires,Volumes]')
          setReponse(this, i, new Grandeur(A2, 'cm^2'), { formatInteractif: 'unites' })

          break
        case 'type5I': // Calcul de A1 connaissant k et A2
          texte = 'Une figure a été '
          texte += k.gt(1) ? 'agrandie ' : 'réduite '
          texte += `à l'échelle $k=${texNombre(k, 1)}$. L'aire de la figure obtenue est $${texNombre(A2, 2)}$ cm².`
          texte += '<br> Calculer l\'aire de la figure initiale. '
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les aires sont multipliées par $k^2$.'
          texteCorr += '<br>Dans notre exercice, en appelant $A$ l\'aire de la figure initiale, '
          texteCorr += `on a l'égalité :  $${texNombre(A2, 2)}=${texNombre(k, 1)}^2\\times A.$`
          texteCorr += `<br>D'où :  $A=\\dfrac{${texNombre(A2, 2)}}{${texNombre(k, 1)}^2}=${A1}$ cm²`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline unites[Longueurs,Aires,Volumes]')
          setReponse(this, i, new Grandeur(A1, 'cm^2'), { formatInteractif: 'unites' })

          break
      }

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, k, l1, A1, V1)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
