import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint, listeQuestionsToContenu, combinaisonListes, texteGras } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const titre = 'Déterminer le dernier chiffre d’un calcul'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum' // Question numérique

/**
* Trouver le dernier chiffre d'un calcul (somme, produit, différence)
* @author Erwan DUPLESSY
* 6C34
*/

export default function DernierChiffre () {
  Exercice.call(this)
  this.sup = 3
  this.titre = titre
  this.consigne = 'Pour chaque calcul, déterminer le dernier chiffre du résultat.'
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 2 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 2// Le nombre de colonne pour la correction LaTeX
  this.tailleDiaporama = 3
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.video = '' // Id YouTube ou url
  this.correctionDetailleeDisponible = true
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  this.sup = 1 // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    let typeDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['somme']
    }
    if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['somme', 'produit']
    }
    if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['somme', 'produit', 'difference']
    }
    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, a = 0, b = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.contenuCorrection = ''
      switch (listeTypeDeQuestions[i]) {
        case 'somme':
          a = randint(11, 999)
          b = randint(11, 999)
          texte = `$ ${a} + ${b}$`
          texteCorr = ''
          if (this.correctionDetaillee) {
            texteCorr += `Le dernier chiffre de $${a} + ${b}$ est le dernier chiffre de $${a % 10} + ${b % 10}$. `
            texteCorr += `Or : $${a % 10} + ${b % 10} = ${a % 10 + b % 10} $<br>`
          }
          texteCorr += texteGras(`Le dernier chiffre de $${a} + ${b}$ est : $${(b + a) % 10}$.`)
          setReponse(this, i, (b + a) % 10)

          break
        case 'produit':
          a = randint(11, 999)
          b = randint(11, 999)
          texte = `$${a} \\times ${b}$`
          texteCorr = ''
          if (this.correctionDetaillee) {
            texteCorr += `Le dernier chiffre de $${a} \\times ${b}$ est le dernier chiffre de $${a % 10} \\times ${b % 10}$. `
            texteCorr += `Or : $${a % 10} \\times ${b % 10} = ${(a % 10) * (b % 10)} $<br>`
          }
          texteCorr += texteGras(`Le dernier chiffre de $${a} \\times ${b}$ est : $${(b * a) % 10}$.`)
          setReponse(this, i, (b * a) % 10)
          break

        case 'difference':
          b = randint(11, 999)
          a = randint(b + 1, b + 999)
          texte = `$ ${a} - ${b}$`
          texteCorr = ''
          if (this.correctionDetaillee) {
            if (a % 10 - b % 10 >= 0) {
              texteCorr += `Le dernier chiffre de $${a} - ${b}$ est égal à : $${a % 10} - ${b % 10} = ${(a % 10) - (b % 10)}$. <br>`
            } else {
              texteCorr += `Comme  $${a % 10} < ${b % 10}$, on doit faire la soustraction : $${(a % 10) + 10} - ${b % 10} = ${((a % 10) + 10) - (b % 10)}$. <br>`
            }
          }
          texteCorr += texteGras(`Le dernier chiffre de $${a} - ${b}$ est : $${(a - b) % 10}$.`)
          setReponse(this, i, (a - b) % 10)
          break
      }

      if (context.isHtml && this.interactif) texte += '<br>Le chiffre des unités est : ' + ajouteChampTexteMathLive(this, i, 'largeur10 inline')
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte.substring(0, texte.length - 1) + '~=$<br>Le chiffre des unités est : '
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
        this.autoCorrection[i].reponse.param.digits = 1
        this.autoCorrection[i].reponse.param.decimals = 0
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Sommes\n2 : Sommes et produits\n3 : Sommes, produits et différences']
}
