import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, egal, randint, shuffle, shuffle2tableaux, combinaisonListesSansChangerOrdre, nombreAvecEspace, texteEnCouleur, modalPdf, listeDiviseurs, contraindreValeur } from '../../modules/outils.js'

export const titre = 'Comprendre le vocabulaire : division euclidienne, diviseurs, multiples'

/**
 * Division Euclidienne; diviseurs, multiples, critères de divisibilité
 * Exercice bilan
 * @author Sébastien Lozano
 * Référence 3A10
 */
export default function DivisionEuclidienneMultiplesDiviseursCriteres () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  // pas de différence entre la version html et la version latex pour la consigne
  this.consigne = ''
  // context.isHtml ? this.spacing = 3 : this.spacing = 2;
  context.isHtml ? this.spacing = 1 : this.spacing = 2
  // context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1;
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 2
  this.nbQuestions = 5
  // this.correctionDetailleeDisponible = true;
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = '3'
  this.sup2 = '10'
  this.sup3 = 13
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false

  this.nouvelleVersion = function (numeroExercice) {
    const nbChiffresMax = combinaisonListesSansChangerOrdre(this.sup.toString().split('-'), this.nbQuestions)
    const nbDiviseursMax = combinaisonListesSansChangerOrdre(this.sup2.toString().split('-'), this.nbQuestions)
    this.sup3 = contraindreValeur(2, 16, parseFloat(this.sup3), 10)

    for (let i = 0; i < this.nbQuestions; i++) {
      nbChiffresMax[i] = contraindreValeur(1, 5, parseFloat(nbChiffresMax[i]), 2)
    }
    for (let i = 0; i < this.nbQuestions; i++) {
      nbDiviseursMax[i] = contraindreValeur(2, parseInt(this.sup3), parseFloat(nbDiviseursMax[i]), 6)
    }

    if (context.isHtml) { // les boutons d'aide uniquement pour la version html
      // this.boutonAide = '';
      this.boutonAide = modalPdf(numeroExercice, 'assets/pdf/FicheArithmetique-3A10.pdf', 'Aide mémoire sur la division euclidienne (Sébastien Lozano)', 'Aide mémoire')
      // this.boutonAide += modalVideo('conteMathsNombresPremiers','https://coopmaths.fr/videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
    } else { // sortie LaTeX
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées

    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]
    // let typesDeQuestionsDisponibles = [1];
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, M, listeDiviseursM, nbDiviseursM, n1, n2, p1, p2, rgDiviseur, typeDeQuestion, multiplicateurs, multiples, textes, textesCorr, candidatsDiviseurs, dividende, diviseur, quotient, reste, diviseurs, quotients, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typeDeQuestion = listeTypeDeQuestions[i]

      switch (typeDeQuestion) {
        case 1: // plus grand reste dans une division euclidienne
          diviseur = randint(2, 99)
          texte = `Dire quel est le plus grand reste possible dans une division euclidienne par ${diviseur}.`
          texteCorr = `Si on divise par ${diviseur}, il ne peut pas rester plus de ${diviseur - 1}, sinon c'est qu'on peut encore ajouter au moins 1 fois ${diviseur} dans le dividende et donc 1 au quotient.`
          break
        case 2: // quotient et reste d'une division euclidienne donnée
          diviseur = randint(2, 99)
          dividende = randint(1001, 99999)
          quotient = Math.trunc(dividende / diviseur)
          reste = dividende % diviseur

          texte = `On a ${nombreAvecEspace(dividende)}=${nombreAvecEspace(diviseur)}$\\times$${nombreAvecEspace(quotient)} $+$ ${nombreAvecEspace(reste)}`
          texte += '<br>'
          texte += `Écrire le quotient et le reste de la division euclidienne de ${nombreAvecEspace(dividende)} par ${diviseur}.`
          texteCorr = `Dans la division euclidienne de ${nombreAvecEspace(dividende)} par ${diviseur}, le quotient vaut ${nombreAvecEspace(quotient)} et le reste ${reste}.`
          break
        case 3: // caractérisation des multiples et diviseurs par le reste de la division euclidienne
          dividende = randint(101, 9999)
          if (listeDiviseurs(dividende).length % 2 === 0) { // si il y a un nombre pair de diviseurs on prend le (n/2+1) eme
            rgDiviseur = listeDiviseurs(dividende).length / 2 + 1 // rang du diviseur choisi
          } else { // il y a nbre impair de diviseurs on prend le ((n-1)/2 +1) eme
            rgDiviseur = (listeDiviseurs(dividende).length - 1) / 2 + 1
          }
          diviseur = listeDiviseurs(dividende)[rgDiviseur - 1] // on choisit le diviseur central de dividende, ATTENTION rang des tableaux commence à 0
          candidatsDiviseurs = [diviseur - 1, diviseur, diviseur + 1] // on prend l'entier précédent et le successeur de ce diviseur

          // Faut-il que je conditionne pour éviter le diviseur 1 ?
          candidatsDiviseurs = shuffle(candidatsDiviseurs) // on mélange le tableau
          texte = 'Les trois divisions euclidiennes suivantes sont exactes : <br>'
          texte += `${nombreAvecEspace(dividende)} = ${nombreAvecEspace(candidatsDiviseurs[0])}$\\times$${nombreAvecEspace(Math.trunc(dividende / candidatsDiviseurs[0]))} $+$ ${nombreAvecEspace(dividende % candidatsDiviseurs[0])}`
          texte += '<br>'
          texte += `${nombreAvecEspace(dividende)} = ${nombreAvecEspace(candidatsDiviseurs[1])}$\\times$${nombreAvecEspace(Math.trunc(dividende / candidatsDiviseurs[1]))} $+$ ${nombreAvecEspace(dividende % candidatsDiviseurs[1])}`
          texte += '<br>'
          texte += `${nombreAvecEspace(dividende)} = ${nombreAvecEspace(candidatsDiviseurs[2])}$\\times$${nombreAvecEspace(Math.trunc(dividende / candidatsDiviseurs[2]))} $+$ ${nombreAvecEspace(dividende % candidatsDiviseurs[2])}`
          texte += '<br>'
          texte += `Sans calculer, dire si les nombres ${nombreAvecEspace(candidatsDiviseurs[0])}; ${nombreAvecEspace(candidatsDiviseurs[1])}; ${nombreAvecEspace(candidatsDiviseurs[2])} sont des diviseurs de ${nombreAvecEspace(dividende)}. Justifier.`
          texteCorr = ''
          if (egal(dividende % candidatsDiviseurs[0], 0)) { // egal() est une fonction de JC pour éviter les problèmes de virgule flottante
            texteCorr += `Le reste de la division euclienne de ${nombreAvecEspace(dividende)} par ${nombreAvecEspace(candidatsDiviseurs[0])} vaut 0 donc ${nombreAvecEspace(candidatsDiviseurs[0])} est un diviseur de ${nombreAvecEspace(dividende)}.`
          } else {
            texteCorr += `Le reste de la division euclienne de ${nombreAvecEspace(dividende)} par ${nombreAvecEspace(candidatsDiviseurs[0])} ne vaut pas 0 donc ${nombreAvecEspace(candidatsDiviseurs[0])} n'est pas un diviseur de ${nombreAvecEspace(dividende)}.`
          }
          texteCorr += '<br>'
          if (egal(dividende % candidatsDiviseurs[1], 0)) { // egal() est une fonction de JC pour éviter les problèmes de virgule flottante
            texteCorr += `Le reste de la division euclienne de ${nombreAvecEspace(dividende)} par ${nombreAvecEspace(candidatsDiviseurs[1])} vaut 0 donc ${nombreAvecEspace(candidatsDiviseurs[1])} divise ${nombreAvecEspace(dividende)}.`
          } else {
            texteCorr += `Le reste de la division euclienne de ${nombreAvecEspace(dividende)} par ${nombreAvecEspace(candidatsDiviseurs[1])} ne vaut pas 0 donc ${nombreAvecEspace(candidatsDiviseurs[1])} ne divise pas ${nombreAvecEspace(dividende)}.`
          }
          texteCorr += '<br>'
          if (egal(dividende % candidatsDiviseurs[2], 0)) { // egal() est une fonction de JC pour éviter les problèmes de virgule flottante
            texteCorr += `Le reste de la division euclienne de ${nombreAvecEspace(dividende)} par ${nombreAvecEspace(candidatsDiviseurs[2])} vaut 0 donc ${nombreAvecEspace(dividende)} est divisible par ${nombreAvecEspace(candidatsDiviseurs[2])}.`
          } else {
            texteCorr += `Le reste de la division euclienne de ${nombreAvecEspace(dividende)} par ${nombreAvecEspace(candidatsDiviseurs[2])} ne vaut pas 0 donc ${nombreAvecEspace(dividende)} n'est pas divisible par ${nombreAvecEspace(candidatsDiviseurs[2])}.`
          }
          texteCorr += '<br>'
          break
        case 4: // vocabulaire diviseurs et multiples
          // on déclare des tableaux utiles
          diviseurs = []
          multiplicateurs = []
          multiples = []
          quotients = []
          textes = []
          textesCorr = []
          // on tire au hasard 4 diviseurs différents entre 2 et 999 et 4 multiplicateurs différents entre 2 et 9
          diviseurs = [randint(2, 999), randint(2, 999, [diviseurs[0]]), randint(2, 999, [diviseurs[0], diviseurs[1]]), randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2]])]
          multiplicateurs = [randint(2, 9), randint(2, 9, [multiplicateurs[0]]), randint(2, 9, [multiplicateurs[0], multiplicateurs[1]]), randint(2, 9, [multiplicateurs[0], multiplicateurs[1], multiplicateurs[2]])]
          // on calcule les multiples
          for (let j = 0; j < 4; j++) {
            multiples[j] = diviseurs[j] * multiplicateurs[j]
            quotients[j] = multiples[j] / diviseurs[j]
            diviseurs[j] = nombreAvecEspace(diviseurs[j])
            multiples[j] = nombreAvecEspace(multiples[j])
            quotients[j] = nombreAvecEspace(quotients[j])
          };
          // on crée les phrases
          textes[0] = `${diviseurs[0]} $\\ldots\\ldots\\ldots\\ldots$ ${multiples[0]}`
          textesCorr[0] = `${diviseurs[0]} est un diviseur de ${multiples[0]} car ${multiples[0]}=${diviseurs[0]}$\\times$${quotients[0]}.`
          textes[1] = `${diviseurs[1]} $\\ldots\\ldots\\ldots\\ldots$ ${multiples[1]}`
          textesCorr[1] = `${diviseurs[1]} est un diviseur de ${multiples[1]} car ${multiples[1]}=${diviseurs[1]}$\\times$${quotients[1]}.`
          textes[2] = `${multiples[2]} $\\ldots\\ldots\\ldots\\ldots$ ${diviseurs[2]}`
          textesCorr[2] = `${multiples[2]} est un multiple de ${diviseurs[2]} car ${multiples[2]}=${diviseurs[2]}$\\times$${quotients[2]}.`
          textes[3] = `${multiples[3]} $\\ldots\\ldots\\ldots\\ldots$ ${diviseurs[3]}`
          textesCorr[3] = `${multiples[3]} est un multiple de ${diviseurs[3]} car ${multiples[3]}=${diviseurs[3]}$\\times$${quotients[3]}.`
          // on ajoute deux cas ni multiple ni diviseur
          // on choisit deux nombres
          n1 = nombreAvecEspace(randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2], diviseurs[3]]))
          p1 = nombreAvecEspace(randint(2, 999, [diviseurs[0], diviseurs[1], diviseurs[2], diviseurs[3], n1]))
          // on choisit un autre qui n'est pas dans la liste des diviseurs de n1
          n2 = nombreAvecEspace(randint(2, 999, listeDiviseurs(n1)))
          p2 = nombreAvecEspace(randint(2, 999, listeDiviseurs(p1)))
          textes[4] = `${n1} $\\ldots\\ldots\\ldots\\ldots$ ${n2}`
          textesCorr[4] = `${n1} n'est ni un multiple, ni un diviseur de ${n2} car ${n1}=${n2}$\\times$${Math.trunc(n1 / n2)}+${texteEnCouleur(n1 % n2)} et ${n2}=${n1}$\\times$${Math.trunc(n2 / n1)}+${texteEnCouleur(n2 % n1)}.`
          textes[5] = `${p2} $\\ldots\\ldots\\ldots\\ldots$ ${p1}`
          textesCorr[5] = `${p2} n'est ni un multiple, ni un diviseur de ${p1} car ${p1}=${p2}$\\times$${Math.trunc(p1 / p2)}+${texteEnCouleur(p1 % p2)} et ${p2}=${p1}$\\times$${Math.trunc(p2 / p1)}+${texteEnCouleur(p2 % p1)}.`
          // on mélange pour que l'ordre change!
          shuffle2tableaux(textes, textesCorr)
          texte = 'Après avoir testé avec la calculatrice, compléter chaque phrase avec "est un diviseur de" ou "est un multiple de" ou "n\'est ni un diviseur, ni un multiple de".'
          texte += '<br>'
          texteCorr = ''
          for (let j = 0; j < 5; j++) {
            texte += textes[j]
            texte += '<br>'
            texteCorr += textesCorr[j]
            texteCorr += '<br>'
          };
          texte += textes[5]
          // texte +=`<br>`;
          texteCorr += textesCorr[5]
          texteCorr += '<br>'
          break
        case 5:
          if (nbDiviseursMax[i] > 10) { // les nombres de 2 chiffres ayant plus de 10 diviseurs étant peu nombreux, on force au moins 3 chiffres.
            nbChiffresMax[i] = Math.max(nbChiffresMax[i], 3)
          }
          do {
            M = randint(10 ** (nbChiffresMax[i] - 1), 10 ** nbChiffresMax[i] - 1)
            listeDiviseursM = listeDiviseurs(M)
            nbDiviseursM = listeDiviseursM.length
          } while (nbDiviseursM < Math.max(2, nbDiviseursMax[i] - 3) || nbDiviseursM > nbDiviseursMax[i])
          texte = `Écrire la liste de tous les diviseurs de ${M}.`
          texteCorr = `Pour trouver la liste des diviseurs de ${M}, on cherche tous les produits de deux facteurs qui donnent ${M}, en écrivant toujours le plus petit facteur en premier.<br>`
          texteCorr += `Il est suffisant de chercher des diviseurs inférieurs au plus grand nombre dont le carré est inférieur à ${M}, par exemple ici, ${Math.trunc(Math.sqrt(M))}$\\times$${Math.trunc(Math.sqrt(M))} = ${Math.trunc(Math.sqrt(M)) * Math.trunc(Math.sqrt(M))}<${M}`
          texteCorr += ` et ${Math.trunc(Math.sqrt(M)) + 1}$\\times$${Math.trunc(Math.sqrt(M)) + 1} = ${(Math.trunc(Math.sqrt(M)) + 1) * (Math.trunc(Math.sqrt(M)) + 1)}>${M} donc il suffit d'arrêter la recherche de facteurs à ${Math.trunc(Math.sqrt(M))}.`
          if (this.correctionDetaillee) {
            context.isHtml ? texteCorr += '<hr>' : texteCorr += '\\par \\hrulefill \\par'
            texteCorr += `$\\textbf{Preuve du propos précédent}$ <br>
            Supposons que ${M} soit le produit de deux entiers p$\\times$q avec p < q :`
            if (context.isHtml) {
              texteCorr += `<br>- si p$\\times$p > ${M}, c'est que q$\\times$q < ${M}, sinon p$\\times$q ne peut être égal à ${M}.<br>
              - mais, dans ce cas, p serait supérieur à q sinon p$\\times$q serait inférieur à ${M} ce qui ne doit pas être le cas.<br>`
            } else {
              texteCorr += `\\begin{itemize}
              \\item si p$\\times$p > ${M}, c'est que q$\\times$q < ${M}, sinon p$\\times$q ne peut être égal à ${M}.
              \\item mais, dans ce cas, p serait supérieur à q sinon p$\\times$q serait inférieur à ${M} ce qui ne doit pas être le cas.
              \\end{itemize}`
            }
            texteCorr += `Donc il est bien suffisant d'arrêter la recherche lorsque le carré de p dépasse ${M}.`
            context.isHtml ? texteCorr += '<hr>' : texteCorr += '\\par \\hrulefill \\par'
          }
          context.isHtml ? texteCorr += '<br>' : texteCorr += '\\par'
          if (listeDiviseursM.length % 2 === 0) { // si il y a un nombre pair de diviseurs
            for (let m = 0; m < (listeDiviseursM.length / 2); m++) {
              texteCorr += '' + listeDiviseursM[m] + '$\\times$' + listeDiviseursM[(listeDiviseursM.length - m - 1)] + ` = ${M}<br>`
            };
          } else {
            for (let m = 0; m < ((listeDiviseursM.length - 1) / 2); m++) {
              texteCorr += '' + listeDiviseursM[m] + '$\\times$' + listeDiviseursM[(listeDiviseursM.length - m - 1)] + ` = ${M}<br>`
            };
            texteCorr += '' + listeDiviseursM[(listeDiviseursM.length - 1) / 2] + '$\\times$' + listeDiviseursM[(listeDiviseursM.length - 1) / 2] + ` = ${M}<br>`
          };
          texteCorr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${M}.<br>`
          texteCorr += `La liste des diviseurs de ${M} est donc `
          texteCorr += '1'
          for (let w = 1; w < listeDiviseursM.length; w++) {
            texteCorr += ' ; ' + listeDiviseursM[w]
          };
          texteCorr += '.'
          break
      };

      if (this.questionJamaisPosee(i, typeDeQuestion, texte)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Nombres de chiffres de l\'entier de la question 5']
  this.besoinFormulaire2Texte = ['Nombre maximum de diviseurs de l\'entier de la question 5']
}
