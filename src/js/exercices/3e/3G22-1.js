import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texNombre, texNombrec } from '../../modules/outils.js'
export const titre = 'Agrandissement et réduction'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export default function agrandissement () {
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

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4', 'type5'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, V1, V2, A1, A2, l1, l2, k, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          V1 = randint(2, 20)
          k = randint(2, 20) / 10
          V2 = V1 * k * k * k
          texte = `Un solide a un volume de $${V1}$ cm³.`
          texte += k > 1 ? ' On l’agrandit ' : ' On le réduit '

          texte += ` à l'échelle $${texNombrec(k)}$. <br>Quel est le volume du nouveau solide ?` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les volumes sont multipliés par $k^3$.'
          texteCorr += '<br>Dans notre exercice, on'
          texteCorr += k > 1 ? ' agrandit ' : ' réduit '
          texteCorr += `un solide à l'échelle $${texNombrec(k)}$.`
          texteCorr += `<br>Le volume obtenu est donc multiplié par $${texNombrec(k)}^3$.`
          texteCorr += `<br>Le volume obtenu est donc $V=${V1}\\times ${texNombrec(k)}^3=${texNombrec(V2)} ~cm^3$.`
          break
        case 'type2':
          V1 = randint(2, 20)
          l1 = randint(2, 20)
          A1 = randint(2, 20)
          k = randint(2, 20) / 10

          l2 = l1 * k
          A2 = A1 * k * k
          V2 = V1 * k * k * k
          texte = `Une figure a une aire de $${A1}$ cm². `
          texte += k > 1 ? ' On l\'agrandit ' : ' On la réduit '
          texte += `et l’aire obtenue est de $${texNombrec(A1 * k ** 2)}$ cm².`
          texte += '<br> Quel est le coefficient '
          texte += k > 1 ? ' d\'agrandissement ? ' : ' de réduction ? '
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les aires sont multipliées par $k^2$.'
          texteCorr += '<br>Dans notre exercice, en appelant $k$ le coefficient'
          texteCorr += k > 1 ? ' d\'agrandissement' : ' de réduction'
          texteCorr += `, on a l'égalité :  $${texNombrec(A2)}=k^2\\times${texNombrec(A1)}.$`
          texteCorr += `<br>On en déduit que : $k^2=\\dfrac{${texNombrec(A2)}}{${texNombre(A1)}}=${texNombrec(A2 / A1)}$.`
          texteCorr += `<br>$k$ est un nombre positif, on peut conclure que : $k=\\sqrt{${texNombrec(A2 / A1)}}=${texNombrec(k)}$.`
          texteCorr += '<br>L\'échelle '
          texteCorr += k > 1 ? ' d\'agrandissement' : ' de réduction'
          texteCorr += `est donc $k=${texNombrec(k)}$ `
          break
        case 'type3':
          V1 = randint(2, 20)
          l1 = randint(2, 20)
          A1 = randint(2, 20)
          k = randint(1, 20, 10)
          k = k / 10
          l2 = l1 * k
          A2 = A1 * k * k
          V2 = V1 * k * k * k
          texte = `Sur une figure, on relève une longueur de $${l1}~cm$. <br>`
          texte += k > 1 ? ' On agrandit ' : ' On réduit '
          texte += `cette figure et la longueur obtenue mesure alors $${texNombrec(l2)}~cm$.`
          texte += '<br> Quelle est l\'échelle '
          texte += k > 1 ? ' d\'agrandissement ? ' : ' de réduction ? '
          texteCorr = 'Dans cette situation, la longueur dont on connaît la mesure a été multipliée par '
          texteCorr += `$k=\\dfrac{${texNombrec(l2)}}{${texNombrec(l1)}}= ${texNombrec(k)}$.<br>`
          texteCorr += 'Comme $k'
          texteCorr += k > 1 ? ' >' : ' <'
          texteCorr += '1$, on en déduit qu\'il s\'agit d\'un'
          texteCorr += k > 1 ? 'agrandissement' : 'e réduction'
          texteCorr += ` à l'échelle $${texNombrec(k)}$.`
          break
        case 'type4':
          V1 = randint(10, 120)
          l1 = randint(2, 20)
          A1 = randint(2, 20)
          k = randint(1, 20, 10)
          k = k / 10
          l2 = l1 * k
          A2 = A1 * k * k
          V2 = V1 * k * k * k
          texte = `Sur une figure, on relève la mesure d'un angle :  de $\\widehat{ABC}=${V1} °$. <br>`
          texte += k > 1 ? ' On agrandit ' : ' On réduit '
          texte += `cette figure à l'échelle $${texNombrec(k)}$.`
          texte += '<br> Déterminer la mesure de l\'angle $\\widehat{A\'B\'C\'}$ de la figure '
          texte += k > 1 ? '  agrandie. ' : ' réduite. '
          texteCorr = 'On sait que dans un agrandissement ou une réduction à l\'échelle $k$,  '
          texteCorr += 'les longueurs sont toutes multipliées par $k$.<br> Par contre, les mesures d\'angles ne sont pas modifiées.<br>'
          texteCorr += `<br>On en déduit : $\\widehat{A'B'C'}=\\widehat{ABC}=${V1} °$`

          break
        case 'type5':
          V1 = randint(2, 20)
          l1 = randint(2, 20)
          A1 = randint(2, 20)
          k = randint(2, 20) / 10

          l2 = l1 * k
          A2 = A1 * k * k
          V2 = V1 * k * k * k
          texte = `Une figure a une aire de $${A1}$ cm². `
          texte += k > 1 ? ' On l\'agrandit ' : ' On la réduit '
          texte += `à l'échelle $k=${texNombrec(k)}$.`
          texte += '<br> Calculer l\'aire de la figure  '
          texte += k > 1 ? ' agrandie. ' : ' réduite. '
          texteCorr = 'On sait que dans une réduction ou un agrandissement de rapport $k$, les aires sont multipliées par $k^2$.'
          texteCorr += '<br>Dans notre exercice, en appelant $A$ l\'aire '
          texteCorr += k > 1 ? ' agrandie, ' : ' réduite, '
          texteCorr += `on a l'égalité :  $A=${texNombrec(k)}^2\\times${texNombrec(A1)}.$`
          texteCorr += `<br>D'où :  $A=${texNombrec(k ** 2 * A1)}~ cm^2$`
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
