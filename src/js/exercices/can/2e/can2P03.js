import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice, arrondi } from '../../../modules/outils.js'
import { number, fraction, add, subtract } from 'mathjs'
import { Arbre, texProba } from '../../../modules/arbres.js'
import { mathalea2d } from '../../../modules/2d.js'
import { ajouteChampFractionMathLive, ajouteChampTexteMathLive, setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Arbre de probabilité'
export const dateDePublication = "25/12/2021"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady=true
export const amcTpe='AMCNum'

/**
 * On donne un arbre de probabilité et on doit calculer une probabilité partielle manquante
 * @author Jean-Claude Lhote
 * Référence can2P03
*/
export default function CalculProbaArbre2e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions=1
  this.nbQuestionsModifiable
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  
  
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0,cpt=0,pA,pAC,pBC,omega,texte,texteCorr,objets,pC; i<this.nbQuestions&& cpt<50;){
      objets = []
      // On choisit les probas de l'arbre
      pA = number(randint(2,8)/10)
      pAC = number(randint(2,8)/10)
      pBC = number(randint(2,8)/10)
      // On définit l'arbre complet
    omega = new Arbre({
      racine: true,
      rationnel: false,
      nom: '',
      proba: 1,
      visible: false,
      alter: '',
      enfants: [
        new Arbre(
          {
            rationnel: false,
            nom: 'A',
            proba: pA,
            enfants: [new Arbre(
              {
                rationnel: false,
                nom: 'C',
                proba: pAC
              }),
            new Arbre(
              {
                rationnel: false,
                nom: '\\bar C',
                proba: number(1-pAC)
              })
            ]
          }),
        new Arbre({
          rationnel: false,
          nom: '\\bar A',
          proba: number(1-pA),
          enfants: [new Arbre({
            rationnel: false,
            nom: 'C',
            proba: pBC,
            visible: false,
            alter: 'x'
          }),
          new Arbre({
            rationnel: false,
            nom: '\\bar C',
            proba: number(1-pBC),
            visible: false,
            alter: ''
          })
          ]
        })
      ]
    })
    
    omega.setTailles() // On calcule les tailles des arbres.
    objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
    pC = omega.getProba('C',false) // on calcule P(C) décimale.
    texte = `On donne l\'arbre de probabilités ci dessous et $P(C)=${texProba(pC)}$.`
    texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7}, ...objets)
    texte += `$x=$ ${(this.interactif || !context.isHtml) ? ajouteChampTexteMathLive(this,i,'largeur10 inline') : '\\ldots'}`
    texteCorr =''
    texteCorr += `$x=${texProba(pBC)}$`
    setReponse(this,i,pBC)
    if (this.questionJamaisPosee(i,pA,pAC,pBC)){
      this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
  i++
    }
    cpt++
  }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
}
