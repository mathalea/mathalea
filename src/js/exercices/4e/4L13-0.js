import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, prenom, texteEnCouleur } from '../../modules/outils.js'
import { point, segment, codageCarre, polygoneRegulierParCentreEtRayon, nommePolygone, afficheCoteSegment, codageSegments, mathalea2d } from '../../modules/2d.js'
export const titre = 'Mettre en équation un problème sans objectif de résolution'

/**
 * Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue afin de mettre en équation un problème
 * à partir de figure géométriques élémentaires
 * * 4L13-0
 * @author Sébastien Lozano
 */
export default function MettreEnEquationSansResoudre () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.sup = 1
  if (this.debug) {
    this.nbQuestions = 9
  } else {
    this.nbQuestions = 2
  };

  this.titre = titre
  this.consigne = "Donner une équation qui permet de résoudre le problème.<br>On ne demande pas de résoudre l'équation."

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  // context.isHtml? this.spacing = 3 : this.spacing = 2;
  // context.isHtml? this.spacingCorr = 3 : this.spacingCorr = 2;

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.debug) {
      typesDeQuestionsDisponibles = [1]
    } else {
      typesDeQuestionsDisponibles = [1, 2]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    typesDeQuestionsDisponibles = [1]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    // let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // une fonction pour dire le nom du polygone
      function myPolyName (n) {
        const sortie = {
          article: '',
          name: '',
          nameParSommets: ''
        }
        switch (n) {
          case 3:
            sortie.article = 'du '
            sortie.name = 'triangle équilatéral'
            sortie.nameParSommets = 'ABC'
            break
          case 4:
            sortie.article = 'du '
            sortie.name = 'carré'
            sortie.nameParSommets = 'ABCD'
            break
          case 5:
            sortie.article = 'du '
            sortie.name = 'pentagone régulier'
            sortie.nameParSommets = 'ABCDE'
            break
          case 6:
            sortie.article = 'de l\''
            sortie.name = 'hexagone régulier'
            sortie.nameParSommets = 'ABCDEF'
            break
          case 7:
            sortie.article = 'de l\''
            sortie.name = 'heptagone régulier'
            sortie.nameParSommets = 'ABCDEFG'
            break
          case 8:
            sortie.article = 'de l\''
            sortie.name = 'octogone régulier'
            sortie.nameParSommets = 'ABCDEFGH'
            break
        }
        return sortie
      }

      // on choisit le nombre de côtés su polygone
      const n = randint(3, 8)
      // on choisit un nom pour la variable
      const variables = ['t', 'u', 'v', 'w', 'y', 'z']
      const inc = variables[randint(0, variables.length - 1)]
      // on choisit une unité
      const unites = ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km']
      const unite = unites[randint(0, unites.length - 1)]
      // on prépare le polygone
      const po = polygoneRegulierParCentreEtRayon(point(0, 0), 4, n)
      po.opacite = 0.5
      po.epaisseur = 2
      // on pépare la côte
      const s = segment(po.listePoints[0], po.listePoints[1])
      s.styleExtremites = '<->'
      // on fait un test pour coder les angles droits du carré
      let anglesDroitsIfIsCarre
      if (n === 4) {
        anglesDroitsIfIsCarre = codageCarre(po)
      } else {
        anglesDroitsIfIsCarre = {}
      };
      // on finit les appels
      const mesAppels = [
        po,
        codageSegments('X', 'blue', po.listePoints),
        afficheCoteSegment(s, `${inc}`, 1, 'red', 2, 0.5, 'black'),
        nommePolygone(po, myPolyName(n).nameParSommets),
        anglesDroitsIfIsCarre
      ]
      // on prépare l'objet polygone
      const polygone = {
        nb_cotes: n,
        unite: unite,
        article: myPolyName(n).article,
        nom: myPolyName(n).name,
        let_cote: inc,
        perimetre: randint(200, 500),
        fig: mathalea2d(
          {
            xmin: -7,
            ymin: -5,
            xmax: 7,
            ymax: 5,
            pixelsParCm: 20,
            scale: 0.5// 0.7
          },
          mesAppels
        )
      }

      const enonces = []
      enonces.push({
        enonce: `On considère la figure suivante où l'unité est le $${polygone.unite}$.<br>${prenom()} se demande pour quelle valeur de ${polygone.let_cote}, exprimée en $${polygone.unite}$, le périmètre ${polygone.article}${polygone.nom} est égal à $${polygone.perimetre}$ $${polygone.unite}$ .<br> ${polygone.fig}`,
        question: '',
        correction: `La figure est un ${polygone.nom}, il a donc ${polygone.nb_cotes} côtés de même longueur.<br>
        Cette longueur est notée ${polygone.let_cote}, le périmètre de la figure, exprimé en fonction de ${polygone.let_cote}, vaut donc $${polygone.nb_cotes}\\times$ ${polygone.let_cote}.<br>
        D'après l'énoncé, ce périmètre vaut $${polygone.perimetre}$ $${polygone.unite}$.<br>
        L'équation suivante permet donc de résoudre le problème : <br>
        ${texteEnCouleur(`$${polygone.nb_cotes}\\times$ ${polygone.let_cote} $= ${polygone.perimetre}$.`)}`
      })
      // pour être sûr d'avoir deux figures différentes
      const p = randint(3, 8, [n])
      polygone.nb_cotes = p
      enonces.push({
        enonce: `On considère la figure suivante où l'unité est le $${polygone.unite}$.<br>${prenom()} se demande pour quelle valeur de ${polygone.let_cote}, exprimée en $${polygone.unite}$, le périmètre ${polygone.article}${polygone.nom} est égal à $${polygone.perimetre}$ $${polygone.unite}$ .<br> ${polygone.fig}`,
        question: '',
        correction: `La figure est un ${polygone.nom}, il a donc ${polygone.nb_cotes} côtés de même longueur.<br>
        Cette longueur est notée ${polygone.let_cote}, le périmètre de la figure, exprimé en fonction de ${polygone.let_cote}, vaut donc $${polygone.nb_cotes}\\times$ ${polygone.let_cote}.<br>
        D'après l'énoncé, ce périmètre vaut $${polygone.perimetre}$ $${polygone.unite}$.<br>
        L'équation suivante permet donc de résoudre le problème : <br>
        ${texteEnCouleur(`$${polygone.nb_cotes}\\times$ ${polygone.let_cote} $= ${polygone.perimetre}$.`)}`
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
}
