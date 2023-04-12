import Exercice from '../../Exercice.js'
import { round, min } from 'mathjs'
import { context } from '../../../modules/context.js'
import Hms from '../../../modules/Hms.js'
import { listeQuestionsToContenu, shuffle, choice, sp, texNombre } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import Grandeur from '../../../modules/Grandeur.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import ClasseCan2023 from './_Canc3a.js'
export const titre = 'CAN CM2 sujet 2023'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '03/04/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '57239'
export const ref = 'canc3a-2023'
/**
 * Aléatoirisation du sujet 2023 de CAN CM2
 * @author Sébastien LOZANO
 * Référence canc3a-2023
*/

function compareNombres (a, b) {
  return a - b
}

export default function SujetCAN2023CM2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 30
  this.nbCols = 1
  this.nbColsCorr = 1
  this.comment = `Cet exercice fait partie des annales des Courses aux nombres.<br>
  Il est composé de 30 questions réparties de la façon suivante :<br>
  les 10 premières questions parfois communes à plusieurs niveaux font appels à des questions automatisées élémentaires et les 20 suivantes (qui ne sont pas rangées dans un ordre de difficulté) sont un peu plus « coûteuses » cognitivement.<br>
  Par défaut, les questions sont rangées dans le même ordre que le sujet officiel avec des données aléatoires. Ainsi, en cliquant sur « Nouvelles données », on obtient une nouvelle course aux nombres avec des données différentes.
  En choisissant un nombre de questions différents de 30, on fabrique une « mini » course aux nombres qui respecte la proportion de nombre de questions élémentaires par rapport aux autres.
  Par exemple, en choisissant 20 questions, la course aux nombres sera composée de 7 questions automatisées élémentaires choisies aléatoirement dans les 10 premières questions du sujet officiel puis de 13 autres questions choisies aléatoirement parmi les 20 autres questions du sujet officiel.`
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 8 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(-nbQ1).sort(compareNombres)//
    const typeQuestionsDisponiblesNiv2 = shuffle([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).slice(-nbQ2).sort(compareNombres)//
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))
    // const typeQuestionsDisponibles = [30] // Pour n'avoir que la question en cours de dev
    // On crée un objet avec lesméthodes can2023
    const myCan = new ClasseCan2023()
    // On crée un objet necessaire à liaison des deux questions sur la vitesse
    const vitesseCommunePourQ21Q22 = myCan.vitesseCommune()

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[i]) {
        case 1:{
          const produit = myCan.produitDeDeuxFacteurs(4, 9, 4, 9)
          texte = produit.texte
          texteCorr = produit.texteCorr
          setReponse(this, index, produit.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else {
            texte += context.isHtml ? '$\\ldots$' : ''
          }
          nbChamps = 1
          this.listeCanEnonces.push(produit.canEnonce)
          this.listeCanReponsesACompleter.push(produit.canReponseACompleter)
        }
          break

        case 2: {
          const somme = myCan.ajouterDizaineMoinsUn()
          texte = somme.texte
          texteCorr = somme.texteCorr
          setReponse(this, index, somme.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else {
            texte += context.isHtml ? '$\\ldots$' : ''
          }
          nbChamps = 1
          this.listeCanEnonces.push(somme.canEnonce)
          this.listeCanReponsesACompleter.push(somme.canReponseACompleter)
        }
          break

        case 3:{
          const figureProduit = myCan.denombrementProduit()
          texte = figureProduit.texte
          texteCorr = figureProduit.texteCorr
          setReponse(this, index, figureProduit.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          this.listeCanEnonces.push(figureProduit.canEnonce)
          this.listeCanReponsesACompleter.push(figureProduit.canReponseACompleter)
        }
          break

        case 4:{
          const moitieDouble = myCan.moitieDouble()
          texte = moitieDouble.texte
          texteCorr = moitieDouble.texteCorr
          setReponse(this, index, moitieDouble.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else {
            texte += context.isHtml ? '$\\ldots$' : ''
          }
          nbChamps = 1
          this.listeCanEnonces.push(moitieDouble.canEnonce)
          this.listeCanReponsesACompleter.push(moitieDouble.canReponseACompleter)
        }
          break

        case 5:{
          const axe = myCan.lectureAbscisseEntiere()
          texte = axe.texte
          texteCorr = axe.texteCorr
          setReponse(this, index, axe.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          this.listeCanEnonces.push(axe.canEnonce)
          this.listeCanReponsesACompleter.push(axe.canReponseACompleter)
        }
          break

        case 6: {
          const facteursDUnProduit = myCan.trouverLesFacteursDUnProduit()
          texte = facteursDUnProduit.texte
          texteCorr = facteursDUnProduit.texteCorr
          setReponse(this, index, facteursDUnProduit.reponse, { formatInteractif: 'texte' })
          if (this.interactif && !context.isAmc) {
            texte += '<br>Écrire le deux nombres dans l\'ordre croissant séparés par un point virgule.'
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline')
          }
          nbChamps = 1
          this.listeCanEnonces.push(facteursDUnProduit.canEnonce)
          this.listeCanReponsesACompleter.push(facteursDUnProduit.canReponseACompleter)
        }
          break

        case 7:{
          const sommeDeDurees = myCan.sommeDeDurees()
          texte = sommeDeDurees.texte
          texteCorr = sommeDeDurees.texteCorr
          setReponse(this, index, new Hms({ hour: a + 1, minute: sommeDeDurees.reponse }), { formatInteractif: 'hms' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'clavierHms inline') }
          nbChamps = 1
          this.listeCanEnonces.push(sommeDeDurees.canEnonce)
          this.listeCanReponsesACompleter.push(sommeDeDurees.canReponseACompleter)
        }
          break

        case 8:{
          const partages = myCan.partages()
          texte = partages.texte
          texteCorr = partages.texteCorr
          setReponse(this, index, partages.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          this.listeCanEnonces.push(partages.canEnonce)
          this.listeCanReponsesACompleter.push(partages.canReponseACompleter)
        }
          break

        case 9:{
          const ordreDeGrandeur = myCan.ordreDeGrandeur()
          texte = ordreDeGrandeur.texte
          texteCorr = ordreDeGrandeur.texteCorr
          setReponse(this, index, new Grandeur(ordreDeGrandeur.reponse, ordreDeGrandeur.reponseUnite), { formatInteractif: 'unites' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15 longueur') }
          nbChamps = 1
          this.listeCanEnonces.push(ordreDeGrandeur.canEnonce)
          this.listeCanReponsesACompleter.push(ordreDeGrandeur.canReponseACompleter)
        }
          break

        case 10:{
          const ecrireUnNombreEnChiffre = myCan.ecrireUnNombreEnChiffres()
          texte = ecrireUnNombreEnChiffre.texte
          texteCorr = ecrireUnNombreEnChiffre.texteCorr
          setReponse(this, index, ecrireUnNombreEnChiffre.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          this.listeCanEnonces.push(ecrireUnNombreEnChiffre.canEnonce)
          this.listeCanReponsesACompleter.push(ecrireUnNombreEnChiffre.canReponseACompleter)
        }
          break

        case 11:{
          let dePlusDeMoins
          if (choice([true, false])) {
            dePlusDeMoins = myCan.dePlusDeMoins('billes')
          } else {
            dePlusDeMoins = myCan.dePlusDeMoins('ages')
          }
          texte = dePlusDeMoins.texte
          texteCorr = dePlusDeMoins.texteCorr
          setReponse(this, index, dePlusDeMoins.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', dePlusDeMoins.champTexteApres)
          } else {
            texte += dePlusDeMoins.texteApres
          }
          nbChamps = 1
          this.listeCanEnonces.push(dePlusDeMoins.canEnonce)
          this.listeCanReponsesACompleter.push(dePlusDeMoins.canReponseACompleter)
        }
          break

        case 12:{
          const ecritureDecimaleProduitEntierParDixiemesOuCentiemes = myCan.ecritureDecimaleProduitEntierParDixiemesOuCentiemes()
          texte = ecritureDecimaleProduitEntierParDixiemesOuCentiemes.texte
          texteCorr = ecritureDecimaleProduitEntierParDixiemesOuCentiemes.texte
          setReponse(this, index, ecritureDecimaleProduitEntierParDixiemesOuCentiemes.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          this.listeCanEnonces.push(ecritureDecimaleProduitEntierParDixiemesOuCentiemes.canEnonce)
          this.listeCanReponsesACompleter.push(ecritureDecimaleProduitEntierParDixiemesOuCentiemes.canReponseACompleter)
        }
          break

        case 13:{
          const lectureAbscisseEntiereOrigineZero = myCan.lectureAbscisseEntiereOrigineZero()
          texte = lectureAbscisseEntiereOrigineZero.texte
          texteCorr = lectureAbscisseEntiereOrigineZero.texteCorr
          setReponse(this, index, lectureAbscisseEntiereOrigineZero.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          this.listeCanEnonces.push(lectureAbscisseEntiereOrigineZero.canEnonce)
          this.listeCanReponsesACompleter.push(lectureAbscisseEntiereOrigineZero.canReponseACompleter)
        }
          break

        case 14:{
          const trouverUnTermeDecimalInconnu = myCan.trouverUnTermeDecimalInconnu()
          texte = trouverUnTermeDecimalInconnu.texte
          texteCorr = trouverUnTermeDecimalInconnu.texteCorr
          setReponse(this, index, trouverUnTermeDecimalInconnu.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          this.listeCanEnonces.push(trouverUnTermeDecimalInconnu.canEnonce)
          this.listeCanReponsesACompleter.push(trouverUnTermeDecimalInconnu.canReponseACompleter)
        }
          break

        case 15:{
          const decomposerUnNombreATroisChiffresEnDizainesUnites = myCan.decomposerUnNombreATroisChiffresEnDizainesUnites()
          texte = decomposerUnNombreATroisChiffresEnDizainesUnites.texte
          texteCorr = decomposerUnNombreATroisChiffresEnDizainesUnites.texteCorr
          setReponse(this, index, decomposerUnNombreATroisChiffresEnDizainesUnites.reponse, { formatInteractif: 'texte' })
          if (this.interactif && !context.isAmc) {
            texte += '<br>Écrire le nombre de dizaines puis d\'unités dans cet ordre séparés par un point virgule.<br>'
            texte += ajouteChampTexteMathLive(this, index, 'largeur6 inline')
            // texte += ajouteChampTexteMathLive(this, index, 'largeur6 inline', { texteApres: sp(5) + 'unites.' })
          }
          nbChamps = 1
          this.listeCanEnonces.push(decomposerUnNombreATroisChiffresEnDizainesUnites.canEnonce)
          this.listeCanReponsesACompleter.push(decomposerUnNombreATroisChiffresEnDizainesUnites.canReponseACompleter)
        }
          break

        case 16:{
          const determinerUneFractionAPartirDUneFigure = myCan.determinerUneFractionAPartirDUneFigure()
          texte = determinerUneFractionAPartirDUneFigure.texte
          texteCorr = determinerUneFractionAPartirDUneFigure.texteCorr
          setReponse(this, index, determinerUneFractionAPartirDUneFigure.reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          this.listeCanEnonces.push(determinerUneFractionAPartirDUneFigure.canEnonce)
          this.listeCanReponsesACompleter.push(determinerUneFractionAPartirDUneFigure.canReponseACompleter)
        }
          break

        case 17:{
          const determinerUnQuotient = myCan.determinerUnQuotient()
          texte = determinerUnQuotient.texte
          texteCorr = determinerUnQuotient.texteCorr
          setReponse(this, index, determinerUnQuotient.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          this.listeCanEnonces.push(determinerUnQuotient.canEnonce)
          this.listeCanReponsesACompleter.push(determinerUnQuotient.canReponseACompleter)
        }
          break

        case 18:{
          let proportionnaliteParAddition
          if (choice([true, false])) {
            proportionnaliteParAddition = myCan.proportionnaliteParAddition('pieces')
          } else {
            proportionnaliteParAddition = myCan.proportionnaliteParAddition('cahiers')
          }
          texte = proportionnaliteParAddition.texte
          texteCorr = proportionnaliteParAddition.texteCorr
          setReponse(this, index, proportionnaliteParAddition.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += `${ajouteChampTexteMathLive(this, index, 'inline largeur15')} ${proportionnaliteParAddition.uniteInteractif} .`
          } else {
            texte += ` $\\ldots$ ${proportionnaliteParAddition.uniteInteractif}.`
          }
          nbChamps = 1
          this.listeCanEnonces.push(proportionnaliteParAddition.canEnonce)
          this.listeCanReponsesACompleter.push(proportionnaliteParAddition.canReponseACompleter)
        }
          break

        case 19:{
          const determinerUnNombreDUnitesDeLongueur = myCan.determinerUnNombreDUnitesDeLongueur()
          texte = determinerUnNombreDUnitesDeLongueur.texte
          texteCorr = determinerUnNombreDUnitesDeLongueur.texteCorr
          setReponse(this, index, determinerUnNombreDUnitesDeLongueur.reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif && !context.isAmc) {
            texte += '<br>' + ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'u.l.'
          }
          nbChamps = 1
          this.listeCanEnonces.push(determinerUnNombreDUnitesDeLongueur.canEnonce)
          this.listeCanReponsesACompleter.push(determinerUnNombreDUnitesDeLongueur.canReponseACompleter)
        }
          break

        case 20:{
          const multiplierParCinq = myCan.multiplierParCinq()
          texte = multiplierParCinq.texte
          texteCorr = multiplierParCinq.texteCorr
          setReponse(this, index, multiplierParCinq.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          this.listeCanEnonces.push(multiplierParCinq.canEnonce)
          this.listeCanReponsesACompleter.push(multiplierParCinq.canReponseACompleter)
        }
          break

        case 21:{
          const proportionnaliteEtVitesse = myCan.proportionnaliteEtVitesse('premiere', vitesseCommunePourQ21Q22)
          texte = proportionnaliteEtVitesse.texte
          texteCorr = proportionnaliteEtVitesse.texteCorr
          setReponse(this, index, proportionnaliteEtVitesse.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km'
          }
          nbChamps = 1
          this.listeCanEnonces.push(proportionnaliteEtVitesse.canEnonce)
          this.listeCanReponsesACompleter.push(proportionnaliteEtVitesse.canReponseACompleter)
        }
          break

        case 22:{
          const proportionnaliteEtVitesse = myCan.proportionnaliteEtVitesse('seconde', vitesseCommunePourQ21Q22)
          texte = proportionnaliteEtVitesse.texte
          texteCorr = proportionnaliteEtVitesse.texteCorr
          setReponse(this, index, proportionnaliteEtVitesse.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km'
          }
          nbChamps = 1
          this.listeCanEnonces.push(proportionnaliteEtVitesse.canEnonce)
          this.listeCanReponsesACompleter.push(proportionnaliteEtVitesse.canReponseACompleter)
        }
          break

        case 23:{
          const dansNCombienDeFoisP = myCan.dansNCombienDeFoisP()
          texte = dansNCombienDeFoisP.texte
          texteCorr = dansNCombienDeFoisP.texteCorr
          setReponse(this, index, dansNCombienDeFoisP.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          this.listeCanEnonces.push(dansNCombienDeFoisP.canEnonce)
          this.listeCanReponsesACompleter.push(dansNCombienDeFoisP.canReponseACompleter)
        }
          break

        case 24:{
          const determinerUnNombreDeDizainesDansUnEntierATroisChiffres = myCan.determinerUnNombreDeDizainesDansUnEntierATroisChiffres()
          texte = determinerUnNombreDeDizainesDansUnEntierATroisChiffres.texte
          texteCorr = determinerUnNombreDeDizainesDansUnEntierATroisChiffres.texteCorr
          setReponse(this, index, determinerUnNombreDeDizainesDansUnEntierATroisChiffres.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          this.listeCanEnonces.push(determinerUnNombreDeDizainesDansUnEntierATroisChiffres.canEnonce)
          this.listeCanReponsesACompleter.push(determinerUnNombreDeDizainesDansUnEntierATroisChiffres.canReponseACompleter)
        }
          break

        case 25:{
          const tracerUneFigureAireDonneeEnFonctionUniteAire = myCan.tracerUneFigureAireDonneeEnFonctionUniteAire('cm2')
          texte = tracerUneFigureAireDonneeEnFonctionUniteAire.texte
          texteCorr = tracerUneFigureAireDonneeEnFonctionUniteAire.texteCorr
          setReponse(this, index, tracerUneFigureAireDonneeEnFonctionUniteAire.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15', { texteApres: sp(5) + 'petits carreaux.' })
          }
          nbChamps = 1
          this.listeCanEnonces.push(tracerUneFigureAireDonneeEnFonctionUniteAire.canEnonce)
          this.listeCanReponsesACompleter.push(tracerUneFigureAireDonneeEnFonctionUniteAire.canReponseACompleter)
        }
          break

        case 26:{
          const nombreDeDixiemesDansUnDecimal = myCan.nombreDeDixiemesDansUnDecimal()
          texte = nombreDeDixiemesDansUnDecimal.texte
          texteCorr = nombreDeDixiemesDansUnDecimal.texteCorr
          setReponse(this, index, nombreDeDixiemesDansUnDecimal.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += `${ajouteChampTexteMathLive(this, index, 'inline largeur15', { texte: `<br>Dans $${texNombre(nombreDeDixiemesDansUnDecimal.nombre, 2)}$ il y a`, texteApres: sp(5) + 'dixièmes en tout.' })}`
          }
          nbChamps = 1
          this.listeCanEnonces.push(nombreDeDixiemesDansUnDecimal.canEnonce)
          this.listeCanReponsesACompleter.push(nombreDeDixiemesDansUnDecimal.canReponseACompleter)
        }
          break

        case 27:{
          const proportionnaliteEtDiviseur = choice([true, false]) === true ? myCan.proportionnaliteEtDiviseur('stylos') : myCan.proportionnaliteEtDiviseur('cahiers')
          texte = proportionnaliteEtDiviseur.texte
          texteCorr = proportionnaliteEtDiviseur.texteCorr
          setReponse(this, index, proportionnaliteEtDiviseur.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15', { texteApres: ' centimes' })
          }
          nbChamps = 1
          this.listeCanEnonces.push(proportionnaliteEtDiviseur.canEnonce)
          this.listeCanReponsesACompleter.push(proportionnaliteEtDiviseur.canReponseACompleter)
        }
          break

        case 28:{
          const trouverUneDimensionAgrandieOuReduite = choice([true, false]) === true ? myCan.trouverUneDimensionAgrandieOuReduite('agrandissement') : myCan.trouverUneDimensionAgrandieOuReduite('reduction')
          texte = trouverUneDimensionAgrandieOuReduite.texte
          texteCorr = trouverUneDimensionAgrandieOuReduite.texteCorr
          setReponse(this, index, trouverUneDimensionAgrandieOuReduite.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15', { texteApres: ' cm' })
          }
          nbChamps = 1
          this.listeCanEnonces.push(trouverUneDimensionAgrandieOuReduite.canEnonce)
          this.listeCanReponsesACompleter.push(trouverUneDimensionAgrandieOuReduite.canReponseACompleter)
        }
          break

        case 29:{
          const ajouterDeuxDecimaux = myCan.ajouterDeuxDecimaux()
          texte = ajouterDeuxDecimaux.texte
          texteCorr = ajouterDeuxDecimaux.texteCorr
          setReponse(this, index, ajouterDeuxDecimaux.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15', { texte: '$=$' })
          }
          nbChamps = 1
          this.listeCanEnonces.push(ajouterDeuxDecimaux.canEnonce)
          this.listeCanReponsesACompleter.push(ajouterDeuxDecimaux.canReponseACompleter)
        }
          break

        case 30:{
          const nombreDeCombinaisons = choice([true, false]) === true ? myCan.nombreDeCombinaisons('entreePlatDessert') : myCan.nombreDeCombinaisons('platDessert')
          texte = nombreDeCombinaisons.texte
          texteCorr = nombreDeCombinaisons.texteCorr
          setReponse(this, index, nombreDeCombinaisons.reponse, { formatInteractif: 'calcul' })
          if (this.interactif && !context.isAmc) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15', { texteApres: `${sp(2)} repas` })
          }
          nbChamps = 1
          this.listeCanEnonces.push(nombreDeCombinaisons.canEnonce)
          this.listeCanReponsesACompleter.push(nombreDeCombinaisons.canReponseACompleter)
        }
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
