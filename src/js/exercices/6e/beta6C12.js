import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, range, randint, texteEnCouleurEtGras, listeDesDiviseurs, sp, numAlpha, contraindreValeur, choice, arrondi, prenomF, rangeMinMax, texNombre, texNombre3, troncature, estentier, compteOccurences, enleveDoublonNum2, combinaisonListes } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
export const titre = 'Résoudre des problèmes de prix'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Description didactique de l'exercice
 * A partir d'un prix, proposer différentes questions qui permettent de répondre, selon les questions,
 * soit de tête (*10), soit après un calcul posé (multiplication, addition ou soustraction),
 * soit après un calcul avec calculatrice (division)
 * Chacune de ces questions indépendantes trouve de l'intérêt par le choix de l'opération à effectuer
 * et donc à donner du sens à chacune des opérations.
 * @author Eric Elter
 * Référence 6G14 (choix modifiable) - Exercice aisément adaptable pour les CM.
 * Date octobre 2021
*/
export default function Questions6G14 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestionsModifiable = true
  this.nbQuestions = 1
  this.sup = 9
  this.sup2 = false
  this.sup3 = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactifType = 'mathLive'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const nombrePremier = [2, 3, 5, 7, 11]

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let QuestionsDisponibles = []
      // let listeQuestionsX = []

      if (!this.sup) { // Si aucune liste n'est saisie
        QuestionsDisponibles = rangeMinMax(1, 8)
      } else {
        if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
          QuestionsDisponibles[0] = contraindreValeur(1, 9, this.sup, 9)
        } else {
          QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
          for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
            QuestionsDisponibles[i] = contraindreValeur(1, 9, parseInt(QuestionsDisponibles[i]), 9) // parseInt en fait un tableau d'entiers
          }
        }
      }
      console.log(QuestionsDisponibles)
      if (compteOccurences(QuestionsDisponibles, 9) > 0) QuestionsDisponibles = rangeMinMax(1, 8) // Teste si l'utilisateur a choisi tout
      console.log(QuestionsDisponibles)
      enleveDoublonNum2(QuestionsDisponibles)
      console.log(QuestionsDisponibles)
      //
      if (this.sup2) QuestionsDisponibles = combinaisonListes(QuestionsDisponibles, QuestionsDisponibles.length)
      const objet = randint(30, 39) // objet représente : le nombre max de bouquets, de corbeilles ou de groupes
      const a = randint(0, 4)
      const var1 = nombrePremier[a] // var 1 est le nbre d iris, de croissants ou de garçons
      const b = randint(0, 4, [a])
      const var2 = nombrePremier[b] // var 2 est le nbre de roses, de brioches ou de filles
      const Chiffres = range(9, [0])
      const TabPrixUnitaire = []
      const TabAutrePrix = []
      for (let kk = 0; kk < 3; kk++) {
        TabPrixUnitaire[kk] = choice(Chiffres, TabPrixUnitaire)
        TabAutrePrix[kk] = choice(Chiffres, TabAutrePrix)
      }
      let PrixUnitaire
      let AutrePrix
      let PrixReduction
      if (this.sup3) {
        PrixUnitaire = arrondi(10 * choice([1, 2]) + TabPrixUnitaire[0], 0)
        AutrePrix = arrondi(10 * TabAutrePrix[0] + TabAutrePrix[1], 0)
        PrixReduction = arrondi(choice(rangeMinMax(5, arrondi(PrixUnitaire / 2, 0)), 0))
      } else {
        PrixUnitaire = arrondi(10 * choice([1, 2]) + TabPrixUnitaire[0] + 0.1 * TabPrixUnitaire[1] + 0.01 * TabPrixUnitaire[2])
        AutrePrix = arrondi(10 * choice([1, 2]) + TabAutrePrix[0] + 0.1 * TabAutrePrix[1] + 0.01 * TabAutrePrix[2])
        PrixReduction = arrondi(choice(rangeMinMax(101, arrondi(50 * PrixUnitaire, 0))) / 100, 2)
      }
      const quidame = prenomF()
      const FamilleH = ['père', 'frère', 'cousin', 'grand-père', 'oncle', 'voisin']
      const Personnage1 = choice(FamilleH)
      const FamilleF = ['mère', 'sœur', 'cousine', 'grand-mère', 'tante', 'voisine']
      const Personnage2 = choice(FamilleF)
      const Objets = [
        'un', 'jeu vidéo', 'jeux vidéo',
        'un', 'pantalon', 'pantalons',
        'un', 'livre', 'livres'
      ]
      const NbArticles = choice(rangeMinMax(3, 9))
      const NbArticles2 = choice(rangeMinMax(3, 9), [NbArticles])
      const NbArticles3 = choice(rangeMinMax(11, 19), [NbArticles + NbArticles2, NbArticles2 + NbArticles2]) - NbArticles2
      const NbArticles4 = choice(rangeMinMax(3, 9), [NbArticles, NbArticles2, NbArticles3])
      const NbArticles5 = choice(rangeMinMax(3, 9), [NbArticles, NbArticles2, NbArticles3, NbArticles4]) + NbArticles4
      const DixOuCent = choice([10, 100])
      const Nbpartage = choice(rangeMinMax(2, 8))
      texte = `${quidame} repère un article dans un magazine de publicité à ${texNombre3(PrixUnitaire)}${sp()}€. <br><br>`
      texteCorr = ''
      // listeQuestions[0] = 1 // A SUPPRIMER
      for (let kk = 0; kk < QuestionsDisponibles.length; kk++) {
        switch (QuestionsDisponibles[kk]) {
          case 1:
            if (this.interactif && !context.isAmc) {
              texte = `${quidame} repère un article dans un magazine de publicité à $${texNombre(PrixUnitaire)}$ toto${sp()}€. <br>`
              texte += 'Il veut, en utilisant toutes ses fleurs, réaliser un maximum de bouquets '
              texte += 'contenant tous le même nombre d’iris et le même nombre de roses. <br>'
              texte += 'Donner le nombre maximal de bouquets que le fleuriste peut réaliser '
              texte += 'et la composition du bouquet.<br><br>'
              texte += numAlpha(kk + 1) + `Nombre maximal de bouquets :${sp(20)}`
              texte += ajouteChampTexteMathLive(this, 3 * i, 'inline largeur25') + '<br><br>'
              texteCorr += numAlpha(0)
              texteCorr += `- Les diviseurs de ${var1 * objet} sont : ${listeDesDiviseurs(var1 * objet).join(', ')}.<br>`
              texteCorr += `${sp(2)}- Les diviseurs de ${var2 * objet} sont : ${listeDesDiviseurs(var2 * objet).join(', ')}.<br>`
              texteCorr += `${objet} est le plus grand nombre qui divise à la fois ${var1 * objet} et ${var2 * objet}.<br>`
              texteCorr += ' Le nombre maximal de bouquets est donc : ' + texteEnCouleurEtGras(`${objet}`) + '.<br><br>'
              setReponse(this, 3 * i, objet)

              texte += numAlpha(1) + `Nombre d’iris dans chaque bouquet :${sp(8)}`
              texte += ajouteChampTexteMathLive(this, 3 * i + 1, 'inline largeur25') + '<br><br>'
              texteCorr += numAlpha(1) + ` $${var1 * objet} \\div ${objet} = ${var1}$ et <br>`
              texteCorr += 'Le nombre d’iris dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var1}`) + '.<br><br>'
              setReponse(this, 3 * i + 1, var1)

              texte += numAlpha(2) + ' Nombre de roses dans chaque bouquet :'
              texte += ajouteChampTexteMathLive(this, 3 * i + 2, 'inline largeur25') + '<br>'
              texteCorr += numAlpha(2) + ` $${var2 * objet} \\div ${objet} = ${var2}$<br>`
              texteCorr += 'Le nombre de roses dans chaque bouquet est :' + texteEnCouleurEtGras(` ${var2}`) + '.<br><br>'
              setReponse(this, 3 * i + 2, var2)
            } else {
              texte += numAlpha(kk) + `Quel serait le prix de ${DixOuCent} articles à ${texNombre3(PrixUnitaire)}${sp()}€ l'unité${sp()}?<br><br>`
              texteCorr += numAlpha(kk)
              texteCorr += ` $${DixOuCent} \\times ${texNombre3(PrixUnitaire)} = ${texNombre3(DixOuCent * PrixUnitaire)}$<br>`
              texteCorr += `Le prix de ${DixOuCent} articles serait de ${texNombre3(DixOuCent * PrixUnitaire)}${sp()}€.<br><br>`
            }
            break
          case 2:
            texte += numAlpha(kk) + `Quel serait le prix de ${NbArticles} articles à ${texNombre3(PrixUnitaire)}${sp()}€ l'unité${sp()}?<br><br>`
            texteCorr += numAlpha(kk)
            texteCorr += ` $${NbArticles} \\times ${texNombre3(PrixUnitaire)} = ${texNombre3(arrondi(NbArticles * PrixUnitaire))}$<br>`
            texteCorr += `Le prix de ${NbArticles} articles serait de ${texNombre3(arrondi(NbArticles * PrixUnitaire))}${sp()}€.<br><br>`
            break
          case 3:
            texte += numAlpha(kk) + `Si ${quidame} achetait un seul article à ${texNombre3(PrixUnitaire)}${sp()}€ ainsi que d'autres articles pour ${texNombre(AutrePrix)}${sp()}€, quel serait le prix final${sp()}?<br><br>`
            texteCorr += numAlpha(kk)
            texteCorr += ` $${PrixUnitaire} + ${texNombre3(AutrePrix)} = ${texNombre3(PrixUnitaire + AutrePrix)}$<br>`
            texteCorr += `Si ${quidame} achetait un seul article à ${texNombre3(PrixUnitaire)}${sp()}€ ainsi que d'autres articles pour ${texNombre(AutrePrix)}${sp()}€, `
            texteCorr += `le prix final serait de ${texNombre3(PrixUnitaire + AutrePrix)}${sp()}€.<br><br>`
            break
          case 4:
            texte += numAlpha(kk) + `${quidame} dispose d'un bon de réduction de ${texNombre3(PrixReduction)}${sp()}€. Si ${quidame} achetait un seul article à ${texNombre(PrixUnitaire)}${sp()}€, quel somme d'argent paierait ${quidame} au final${sp()}?<br><br>`
            texteCorr += numAlpha(kk)
            texteCorr += ` $${PrixUnitaire} - ${texNombre3(PrixReduction)} = ${texNombre3(PrixUnitaire - PrixReduction)}$<br>`
            texteCorr += `Grâce à son bon de réduction, ${quidame} ne paierait que ${texNombre3(PrixUnitaire - PrixReduction)}${sp()}€.<br><br>`
            break
          case 5:
            texte += numAlpha(kk) + `Si ${quidame} achetait ${NbArticles2} articles à ${PrixUnitaire}${sp()}€ l'unité et son ${Personnage1} en achetait ${NbArticles3} de plus, quelle somme paierait-ils à eux deux${sp()}?<br><br>`
            texteCorr += numAlpha(kk + 1)
            texteCorr += ` $${NbArticles2} + ${NbArticles3} = ${NbArticles2 + NbArticles3}$<br>`
            texteCorr += `${quidame} et son ${Personnage1} achèteraient ${NbArticles2 + NbArticles3} articles.<br>`
            texteCorr += `$${NbArticles2 + NbArticles3} \\times ${texNombre3(PrixUnitaire)} = ${texNombre3(arrondi((NbArticles2 + NbArticles3) * PrixUnitaire))}$<br>`
            texteCorr += `Si ${quidame} et son ${Personnage1} achetaient ${NbArticles2 + NbArticles3} articles à ${texNombre3(PrixUnitaire)}${sp()}€ l'unité, `
            texteCorr += `le prix final serait de ${texNombre3(arrondi((NbArticles2 + NbArticles3) * PrixUnitaire))}${sp()}€.<br><br>`
            break
          case 6:
            texte += numAlpha(kk) + `Si ${quidame} achetait ${NbArticles5} articles à ${PrixUnitaire}${sp()}€ l'unité mais que sa ${Personnage2} lui propose de lui en rembourser ${NbArticles4}, quelle somme ${quidame} dépenserait-elle${sp()}?<br><br>`
            texteCorr += numAlpha(kk)
            texteCorr += `$${NbArticles5} - ${NbArticles4} = ${NbArticles5 - NbArticles4}$<br>`
            texteCorr += `${quidame} ne payerait que ${NbArticles5 - NbArticles4} articles.<br>`
            texteCorr += `$${NbArticles5 - NbArticles4} \\times ${texNombre3(PrixUnitaire)} = ${texNombre3(arrondi((NbArticles5 - NbArticles4) * PrixUnitaire))}$<br>`
            texteCorr += `Si ${quidame} achetait ${NbArticles5} articles à ${PrixUnitaire}${sp()}€ l'unité mais que sa ${Personnage2} lui propose de lui en rembourser ${NbArticles4}, `
            texteCorr += `${quidame} dépenserait ${texNombre3(arrondi((NbArticles5 - NbArticles4) * PrixUnitaire))}${sp()}€.<br><br>`
            break
          case 7 :
            texte += numAlpha(kk) + `Si ${quidame} décidait d'acheter cet article à ${PrixUnitaire}${sp()}€ avec 9 amis, quelle somme équitable minimale devraient-ils, chacun, donner${sp()}?<br><br>`
            texteCorr += numAlpha(kk)
            texteCorr += '$1 + 9 = 10$<br>'
            texteCorr += 'Le partage se ferait entre 10 personnes.<br>'
            if (this.sup3) {
              texteCorr += `$${PrixUnitaire} \\div 10 = ${texNombre3(arrondi(PrixUnitaire / 10, 3))}$<br>`
              texteCorr += `Si ${quidame} partageait cet article avec 9 amis, chacun donnerait équitablement ${texNombre3(arrondi(PrixUnitaire / 10, 3))}${sp()}€.<br><br>`
            } else {
              texteCorr += `$${PrixUnitaire} \\div 10 \\approx ${texNombre3(arrondi(PrixUnitaire / 10, 3))}$ et $${texNombre3(troncature(arrondi(PrixUnitaire / 10, 3), 2))} < ${texNombre(arrondi(PrixUnitaire / 10, 3))} < ${texNombre(troncature(arrondi(PrixUnitaire / 10, 3) + 0.01, 2))}$<br>`
              texteCorr += `Si ${quidame} partageait cet article avec ${Nbpartage} camarades, chacun donnerait équitablement au moins ${texNombre3(troncature(arrondi(PrixUnitaire / 10, 3) + 0.01, 2))}${sp()}€.<br><br>`
            } break
          case 8 :
            texte += numAlpha(kk) + `Si ${quidame} décidait d'acheter cet article à ${PrixUnitaire}${sp()}€ avec ${Nbpartage} camarades, quelle somme équitable minimale devraient-ils, chacun, donner${sp()}?<br><br>`
            texteCorr += numAlpha(kk)
            texteCorr += `$1 + ${Nbpartage} = ${Nbpartage + 1}$<br>`
            texteCorr += `Le partage se ferait entre ${Nbpartage + 1} personnes.<br>`
            if (estentier(arrondi(PrixUnitaire * 100, 0) / (Nbpartage + 1))) {
              texteCorr += `$${PrixUnitaire} \\div ${Nbpartage + 1} = ${texNombre3(arrondi(PrixUnitaire / (Nbpartage + 1), 3))}$<br>`
              texteCorr += `Si ${quidame} partageait cet article avec ${Nbpartage} camarades, chacun donnerait équitablement ${texNombre3(arrondi(PrixUnitaire / (Nbpartage + 1), 3))}${sp()}€.<br><br>`
            } else {
              texteCorr += `$${PrixUnitaire} \\div ${Nbpartage + 1} \\approx ${texNombre3(arrondi(PrixUnitaire / (Nbpartage + 1), 3))}$ et $${texNombre3(troncature(arrondi(PrixUnitaire / (Nbpartage + 1), 3), 2))} < ${texNombre(arrondi(PrixUnitaire / (Nbpartage + 1), 3))} < ${texNombre(troncature(arrondi(PrixUnitaire / (Nbpartage + 1), 3) + 0.01, 2))}$<br>`
              texteCorr += `Si ${quidame} partageait cet article avec ${Nbpartage} camarades, chacun donnerait équitablement au moins ${texNombre3(troncature(arrondi(PrixUnitaire / (Nbpartage + 1), 3) + 0.01, 2))}${sp()}€.<br><br>`
            }
            break
        } // fin du switch
      }
      if (this.questionJamaisPosee(i, var1, var2, objet)) {
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'a) ',
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
                    texte: 'b) ',
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
                    texte: 'c) ',
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
  this.besoinFormulaireTexte = ['Choix des questions', 'Nombres séparés par des tirets\n1 : Multiplication du prix par 10 ou 100\n2 : Multiplication du prix par un entier entre 3 et 9\n3 : Somme du prix avec un autre prix\n4 : Différence du prix avec un autre prix\n5 : Prix de la somme de deux quantités différentes du même article\n6 : Prix de la différence de deux quantités différentes du même article\n7 : Division du prix par 10\n8 : Division du prix par un entier entre 3 et 9\n9 : Toutes les questions\n']
  this.besoinFormulaire2CaseACocher = ['Ordre aléatoire des questions']
  this.besoinFormulaire3CaseACocher = ['Prix unitaire entier']
}
