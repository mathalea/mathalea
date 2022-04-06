import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, numAlpha, randint, sp, texteExposant } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Grandeur from '../../modules/Grandeur.js'
export const titre = 'Des claviers, en veux-tu, en voilà'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Conversions de volumes.
 *
 * Dans la correction, on ne voit qu`une multiplication ou qu`un division pour obtenir le résultat
 *
 * * 1 : Conversions en mètres-cubes avec des multiplications
 * * 2 : Conversions en mètres-cubes avec des divisions
 * * 3 : Conversions en mètres-cubes avec des multiplications ou divisions
 * * 4 : Conversions avec des multiplications ou divisions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot
 * Référence 6M31
 */
export default function DesClaviers () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (
      let i = 0,
        a,
        texte,
        texteCorr,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      this.autoCorrection[i] = {}
      a = randint(1, 1987)
      a = a + a
      texte = 'FONCTIONNEMENT ACTUEL <br>'
      texte += numAlpha(0) + 'Mettez une longueur égale à 10 m pour vérifier que c\'est correct : '
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, 0, 'largeur25 inline nospacebefore longueur')
        setReponse(this, 0, new Grandeur(10, 'm'), { formatInteractif: 'longueur' })
      }
      texte += `<br>${numAlpha(1)}Mettez une aire égale à 10 m${texteExposant(2)} pour vérifier que c'est correct : `
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, 1, 'largeur25 inline nospacebefore longueur')
        setReponse(this, 1, new Grandeur(10, 'm^2'), { formatInteractif: 'longueur' })
      }
      texte += `<br>${numAlpha(2)}Mettez un volume égal à 10 m${texteExposant(3)} pour vérifier que c'est correct : `
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, 2, 'largeur25 inline nospacebefore longueur')
        setReponse(this, 2, new Grandeur(10, 'm^3'), { formatInteractif: 'longueur' })
      }

      texte += '<br>Ces deux derniers claviers ont pour défaut de devoir taper sur x² et x³ pour mettre des unités d\'aires ou de volumes ou d\'utiliser l\'accent circonflexe pour la saisie. Pas intuitif pour des 6èmes.'
      texte += '<br><br>FONCTIONNEMENT NOUVEAU <br>'
      texte += `${numAlpha(3)}Ajout d'un clavier masse : <br>${sp(5)}Mettez une masse égale à 10 g pour vérifier que c'est correct : `
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, 3, 'largeur25 inline nospacebefore masse')
        setReponse(this, 3, new Grandeur(10, 'g'), { formatInteractif: 'longueur' })
      }
      texte += '<br><br>PROPOSITION 1 <br>'
      texte += `<br>Pour régler la difficulté de taper cm${texteExposant(2)} ou  cm${texteExposant(3)} pour des élèves, je propose d'utiliser des claviers dédiés comme ci-dessous.`
      texte += `<br>${numAlpha(4)}Mettez une aire égale à 10 m${texteExposant(2)} pour vérifier que c'est correct : `
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, 4, 'largeur25 inline nospacebefore aire')
        setReponse(this, 4, new Grandeur(10, 'm^2'), { formatInteractif: 'longueur' })
      }
      texte += `<br>${numAlpha(5)}Mettez un volume égal à 10 m${texteExposant(3)} pour vérifier que c'est correct : `
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, 5, 'largeur25 inline nospacebefore volume')
        setReponse(this, 5, new Grandeur(10, 'm^3'), { formatInteractif: 'longueur' })
      }
      texte += '<br>Avec cette proposition, vous remarquez aussi qu\'en cas de non-réponse, le commentaire est plus explicite et indique quel type d\'unité il manque.<br>'
      texte += `Ces claviers, comme cette dernière remarque, peuvent être une gène pour certains d'entre vous, qui trouveraient que mettre le bon clavier, c'est trop aider les élèves et que c'est à eux de faire le choix entre m, m${texteExposant(2)} et m${texteExposant(3)}. Je vous laisse faire votre avis et le donner ensuite.<br>`
      texte += '<br><br>PROPOSITION 2 <br>'
      texte += `<br>On peut décider qu'il n'y ait qu'un clavier, comme actuellement, mais avec le moyen de trouver sur le clavier cm, cm${texteExposant(2)} ou  cm${texteExposant(3)}.<br>`
      texte += '<br>Je vous propose alors deux choix :'
      texte += '<br>Choix 1 : Regardez le clavier associé à cette question :'
      texte += `<br>${numAlpha(6)}Mettez un volume égal à 10 cm${texteExposant(3)} pour vérifier que c'est correct : `
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, 6, 'largeur25 inline nospacebefore LAV3')
        setReponse(this, 6, new Grandeur(10, 'cm^3'), { formatInteractif: 'longueur' })
      }
      texte += '<br><br>Choix 2 : Regardez le clavier associé à cette question :'
      texte += `<br>${numAlpha(7)}Mettez un volume égal à 10 dm${texteExposant(2)} pour vérifier que c'est correct : `
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, 7, 'largeur25 inline nospacebefore LAV1')
        setReponse(this, 7, new Grandeur(10, 'dm^2'), { formatInteractif: 'longueur' })
      }
      texte += '<br><br>PROPOSITION 3<br>'
      texte += '<br>Libre à vous d\'être force de proposition (mixage, rajout, refonte des propositions précédentes) et on verra si c\'est possible.'
      texte += '<br>Comme j\'ai ajouté tonne et quintal dans le clavier masse, on peut imaginer ajouter les litres dans les volumes et les ares dans les aires. À vous de me dire !'
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n`a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
