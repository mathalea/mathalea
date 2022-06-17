import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListesSansChangerOrdre, texNombre, miseEnEvidence, texteEnCouleur, tableauColonneLigne, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Trouver l\'opposé d\'un nombre relatif'
export const dateDeModifImportante = '26/11/2021'

/**
* * Remplir un tableau en utilisant la notion d'opposé
* * 5R10-0
* @author Sébastien Lozano
* Ajout d'un paramètre pour afficher quelques fois le signe des nombres positif par Guillaume Valmont le 26/11/2021
*/

export default function TrouverOppose () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.besoinFormulaireCaseACocher = ['Afficher quelques fois le signe des nombres positifs']
  this.sup = 1
  if (this.debug) {
    this.nbQuestions = 1
  } else {
    this.nbQuestions = 1
  };

  this.titre = titre
  this.consigne = 'Compléter le tableau suivant.'

  this.nbCols = 1
  this.nbColsCorr = 1

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.debug) {
      typesDeQuestionsDisponibles = [1]
    } else {
      typesDeQuestionsDisponibles = [1]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus
    const listeSignesPositifs = combinaisonListes(['+', ''], 6 * this.nbQuestions)
    const listeSignes = combinaisonListes(['+', '-'], 6 * this.nbQuestions)

    for (let i = 0, texte, texteCorr, signePositif, indice = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let sup
      parseInt(this.sup) === 1 ? sup = false : sup = this.sup // Pour rester compatible avec l'ancien paramètre this.sup = 1 par défaut (et inutilisé)
      // une fonction pour générer un relatif et son opposé
      function nbRelatifEtSonOppose () {
        sup ? signePositif = listeSignesPositifs[indice] : signePositif = ''
        const nbNum = randint(0, 9) + randint(0, 9) / 10
        if (listeSignes[indice] === '+') {
          indice++
          return {
            nb: signePositif + texNombre(nbNum),
            opp: texNombre(-nbNum)
          }
        } else {
          indice++
          return {
            nb: texNombre(-nbNum),
            opp: signePositif + texNombre(nbNum)
          }
        }
      }
      const nbLigneNombres = ['\\text{Nombre}']
      const nbLigneNombresCorr = ['\\text{Nombre}']
      const nbLigneNombresOpp = []
      const nbLigneNombresOppCorr = []
      let nb
      for (let k = 0; k < 6; k++) {
        nb = nbRelatifEtSonOppose()
        if (randint(0, 1) === 1) {
          nbLigneNombres[k + 1] = ''
          nbLigneNombresCorr[k + 1] = miseEnEvidence(nb.nb)
          nbLigneNombresOpp.push(nb.opp)
          nbLigneNombresOppCorr.push(nb.opp)
        } else {
          nbLigneNombres.push(nb.nb)
          nbLigneNombresCorr.push(nb.nb)
          nbLigneNombresOpp[k] = ''
          nbLigneNombresOppCorr[k] = miseEnEvidence(nb.opp)
        }
      };

      const enonces = []
      enonces.push({
        enonce: `${tableauColonneLigne(nbLigneNombres, ['\\text{Opposé du nombre}'], nbLigneNombresOpp)}`,
        question: '',
        correction: `${tableauColonneLigne(nbLigneNombresCorr, ['\\text{Opposé du nombre}'], nbLigneNombresOppCorr)}`
      })
      enonces.push({
        enonce: 'énoncé type 2',
        question: '',
        correction: `${texteEnCouleur('correction type2')}`
      })

      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
        case 2:
          texte = `${enonces[1].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
