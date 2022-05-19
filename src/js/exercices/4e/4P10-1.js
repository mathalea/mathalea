import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListesSansChangerOrdre, calcul, prenom, texteEnCouleur, texteGras, texPrix, numAlpha } from '../../modules/outils.js'
import { point, segment, repere, courbe, mathalea2d } from '../../modules/2d.js'
export const titre = 'Résoudre un problème de proportionnalité à laide dun graphique'

/**
 * fork de 4P10-1 par Jean-Claude Lhote
 */

export default function GraphiquesEtProportionnalite2 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  if (this.debug) {
    this.nbQuestions = 2
  } else {
    this.nbQuestions = 1
  };

  this.titre = titre
  this.consigne = ''
  this.spacingCorr = 2

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  // context.isHtml? this.spacingCorr = 3 : this.spacingCorr = 2;

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.debug) {
      typesDeQuestionsDisponibles = [1]
    } else {
      typesDeQuestionsDisponibles = [1]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    // typesDeQuestionsDisponibles=[1];

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on prévoit un peu d'aléatoire pour les prix unitaires
      const prixUnitaireOranges = choice([1.2, 1.4, 1.6, 1.8])
      const prixUnitaireBaguettes = choice([0.6, 0.8, 1.2])
      // on prévoit un tableau avec des situations
      const situations = [
        { lieu: 'l\'épicerie', prenom: prenom(), articles: 'oranges', art_articles: 'd\'oranges', prix_unitaire: prixUnitaireOranges, qte: 'poids', qte_max: 10, qte2: 3, unite: 'kg d\'', legendeX: 'poids en kg', legendeY: 'prix en €', fig: {}, figureCorr: {} },
        { lieu: 'la boulangerie', prenom: prenom(), articles: 'baguettes', art_articles: 'de baguettes', prix_unitaire: prixUnitaireBaguettes, qte: 'nombre', qte_max: 10, qte2: 3, unite: '', legendeX: 'quantité', legendeY: 'prix en €', fig: {}, figureCorr: {} }
      ]
      // on en choisit une
      const situation = situations[randint(0, situations.length - 1)]
      let r
      const xscale = 1
      const yscale = choice([1, 2, 5])
      // pour aléatoiriser un peu le pas sur l'axe des prix
      let stepAxeSecondaire
      if (yscale === 1) stepAxeSecondaire = choice([0.5, 0.2, 0.25])
      else stepAxeSecondaire = 1
      // on finit les appels
      const mesAppels = [
        r = repere({
          xmin: 0,
          ymin: 0,
          ymax: Math.floor((situation.qte_max * situation.prix_unitaire + yscale) / yscale) * yscale,
          xmax: situation.qte_max,
          xscale: xscale,
          yscale: yscale,
          legendeX: situation.legendeX,
          legendeY: situation.legendeY,
          grilleSecondaireVisible: true,
          grilleSecondaireDistance: stepAxeSecondaire, // 0.2,
          positionLegendeY: [0.3, Math.floor((situation.qte_max * situation.prix_unitaire + yscale) / yscale) * yscale + 0.4 * yscale]
        })
      ]
      const f = x => calcul(situation.prix_unitaire * x)
      mesAppels.push(f, courbe(f, 0, situation.qte_max, 'black', 1.5, r))
      // on prépare l'objet figure
      const fig = mathalea2d(
        {
          xmin: -xscale,
          ymin: -0.5,
          xmax: situation.qte_max / xscale + 3,
          ymax: (situation.qte_max * situation.prix_unitaire + yscale) / yscale + 1,
          pixelsParCm: 40
        },
        mesAppels
      )
      situation.fig = fig

      // on prépare les appels supplémentaires pour la correction
      const mesAppelsCorr = mesAppels
      const A = point(situation.qte_max, 0)
      const B = point(situation.qte_max, calcul(situation.qte_max * situation.prix_unitaire / yscale))
      const s1 = segment(A, B, 'red')
      s1.epaisseur = 2
      s1.pointilles = true
      s1.styleExtremites = '->'
      const C = point(0, calcul(situation.qte_max * situation.prix_unitaire / yscale))
      const s2 = segment(B, C, 'red')
      s2.epaisseur = 2
      s2.pointilles = true
      s2.styleExtremites = '->'

      const D = point(situation.qte2, 0)
      const E = point(situation.qte2, calcul(situation.qte2 * situation.prix_unitaire / yscale))
      const s3 = segment(D, E, 'blue')
      s3.epaisseur = 2
      s3.pointilles = true
      s3.styleExtremites = '->'
      const F = point(0, calcul(situation.qte2 * situation.prix_unitaire / yscale))
      const s4 = segment(E, F, 'blue')
      s4.epaisseur = 2
      s4.pointilles = true
      s4.styleExtremites = '->'

      // on ajoute les appels pour la correction
      mesAppelsCorr.push(
        s1,
        s2,
        s3,
        s4
      )

      // on prépare l'objet figure correction
      const figureCorr = mathalea2d(
        {
          xmin: -xscale,
          ymin: -0.5,
          xmax: situation.qte_max / xscale + 3,
          ymax: (situation.qte_max * situation.prix_unitaire + 4) / yscale + 1,
          pixelsParCm: 40
        },
        mesAppelsCorr
      )
      situation.figureCorr = figureCorr

      // un compteur pour les sous-questions
      let k = 0
      let kCorr = 0

      const enonces = []
      enonces.push({
        enonce: `
          À ${situation.lieu}, ${situation.prenom} utilise le graphique ci-dessous pour indiquer le prix de ses ${situation.articles} en fonction du ${situation.qte} ${situation.art_articles}.
          <br>${situation.fig}
          ${numAlpha(k++)} Justifier que c'est une situation de proportionnalité à l'aide du graphique.
          <br> ${numAlpha(k++)} Quel est le prix de $${situation.qte_max}$ ${situation.unite}  ${situation.articles}?
          <br> ${numAlpha(k++)} Quel est le prix de $${situation.qte2}$ ${situation.unite}  ${situation.articles}?
          `,
        // question:``,
        correction: `
        <br> ${numAlpha(kCorr++)} Ce graphique est une droite qui passe par l'origine.
        <br> ${texteEnCouleur('C\'est donc bien le graphique d\'une situation de proportionnalité.')}

        <br> ${numAlpha(kCorr++)} Par lecture graphique, en utilisant les pointillés rouges du graphe ci-dessous, ${texteEnCouleur(`$${situation.qte_max}$ ${situation.unite}  ${situation.articles} coûtent $${texPrix(calcul(situation.qte_max * situation.prix_unitaire))}$ €.`)}
        <br> ${situation.figureCorr}
        <br> ${numAlpha(kCorr++)} Pour $${situation.qte2}$ ${situation.unite}  ${situation.articles}, la lecture graphique est moins facile, nous allons détailler deux méthodes.
        <br><br> ${texteGras('Première méthode par lecture graphique :')} 
        <br> Il faut prendre en compte que chaque petit carreau représente $${texPrix(stepAxeSecondaire * yscale)}$ € et utiliser les pointillés bleus.
        <br><br> ${texteGras('Seconde méthode en calculant une quatrième proportionnelle :')}
        <br> $${situation.qte_max}$ ${situation.unite}  ${situation.articles} coûtent $${texPrix(calcul(situation.qte_max * situation.prix_unitaire))}$ €
        donc $${situation.qte2}$ ${situation.unite}  ${situation.articles} coûtent : <br> $(${texPrix(calcul(situation.qte_max * situation.prix_unitaire))}$ € $\\div ${situation.qte_max}$ ${situation.articles} $)\\times (${situation.qte2}$ ${situation.articles})  $= ${texPrix(calcul(situation.qte2 * situation.prix_unitaire))}$ €
        <br><br>${texteEnCouleur(`Quelle que soit la méthode utilisée, ${situation.qte2} ${situation.unite}  ${situation.articles} coûtent $${texPrix(calcul(situation.qte2 * situation.prix_unitaire))}$ €.`)}
        `
      })
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`
          // texte = `${fig}`;
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
}
