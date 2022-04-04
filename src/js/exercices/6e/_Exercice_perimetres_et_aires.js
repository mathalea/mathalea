import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, combinaisonListes, arrondiVirgule, calcul, texNombrec, creerNomDePolygone, texNombre, arrondi, sp, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
import Grandeur from '../../modules/Grandeur.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Déterminer le périmètre et l'aire d'un carré, d'un rectangle, d'un triangle rectangle, d'un cercle
 *
 * * 1 : Carré, rectangle et triangle rectangle
 * * 2: Uniquement des cercles
 * * 3 : Les 4 sont demandés
 * @author Rémi Angot// modifié par Mireille Gain pour le support des décimaux
 * * Relecture EE : Décembre 2021
 */
export default function ExercicePerimetresEtAires (difficulte = 1) {
  // Calculer le périmètre et l'aire de figures
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = difficulte
  this.titre = "Calculs de périmètres et d'aires"
  this.consigne =
    'Pour chacune des figures, calculer son périmètre puis son aire (valeur exacte et si nécessaire, valeur approchée au dixième près).'
  this.spacing = 1
  this.nbQuestions = 4

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const reponses = []
    let resultat1, resultat2
    const tripletsPythagoriciens = [
      [3, 4, 5],
      [6, 8, 10],
      [15, 8, 17],
      [24, 10, 26],
      [5, 12, 13],
      [12, 16, 20],
      [21, 20, 29],
      [9, 40, 41]
    ]
    let typesDeQuestionsDisponibles = [
      'carre',
      'rectangle',
      'triangle_rectangle',
      'cercle'
    ]; let typesDeQuestions
    let partieDecimale1, partieDecimale2
    if (this.sup2) {
      partieDecimale1 = calcul(randint(1, 9) / 10)
      partieDecimale2 = calcul(randint(1, 9) / 10)
    } else {
      partieDecimale1 = 0
      partieDecimale2 = 0
    }

    if (this.sup === 1) {
      enleveElement(typesDeQuestionsDisponibles, 'cercle')
      this.nbCols = 1
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = ['cercle']
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let listeDeNomsDePolygones
    for (let i = 0, texte, texteCorr, cote, nomCarre, L, l, nomRectangle, a, b, c, nomTriangle, triplet, R, donneLeDiametre, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      if (i % 4 === 0) listeDeNomsDePolygones = ['QD']
      switch (typesDeQuestions) {
        case 'carre':
          cote = calcul(randint(2, 11) + partieDecimale1)
          nomCarre = creerNomDePolygone(4, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomCarre)
          if (choice([true, false])) {
            // 2 énoncés possibles équiprobables
            texte = `Un carré $${nomCarre}$ de $${texNombre(cote)}$ cm de côté .<br>` + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline longueur', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline longueur', { texte: '<br>' + sp(13) + 'Aire : ' })
          } else {
            texte = `Un carré $${nomCarre}$ tel que $${nomCarre[0] + nomCarre[1]} = ${texNombre(cote)}$ cm.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline longueur', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline longueur', { texte: '<br>' + sp(13) + 'Aire : ' })
          }

          texteCorr = `$\\mathcal{P}_{${nomCarre}}=4\\times${texNombre(cote)}~\\text{cm}=${texNombrec(4 * cote)}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}_{${nomCarre}}=${texNombre(cote)}~\\text{cm}\\times${texNombre(cote)}~\\text{cm}=${texNombrec(cote * cote)}~\\text{cm}^2$`
          resultat1 = calcul(4 * cote)
          resultat2 = calcul(cote * cote)
          break
        case 'rectangle':
          L = calcul(randint(3, 11) + partieDecimale2)
          l = randint(2, L - 1)
          nomRectangle = creerNomDePolygone(4, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomRectangle)
          if (choice([true, false])) {
            // 2 énoncés possibles équiprobables
            texte = `Un rectangle $${nomRectangle}$ de $${texNombre(L)}$ cm de longueur et de $${l}$ cm de largeur.<br>` + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline longueur', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline longueur', { texte: '<br>' + sp(13) + 'Aire : ' })
          } else {
            texte = `Un rectangle $${nomRectangle}$ tel que $${nomRectangle[0] + nomRectangle[1] + ' = ' + texNombre(L)}$ cm et $${nomRectangle[1] + nomRectangle[2] + ' = ' + l}$ cm.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline longueur', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline longueur', { texte: '<br>' + sp(13) + 'Aire : ' })
          }
          texteCorr = `$\\mathcal{P}_{${nomRectangle}}=(${texNombre(L)}~\\text{cm}+${l}~\\text{cm})\\times2=${texNombrec((L + l) * 2)}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}_{${nomRectangle}}=${texNombre(L)}~\\text{cm}\\times${l}~\\text{cm}=${texNombrec(L * l)}~\\text{cm}^2$`
          resultat1 = calcul(2 * L + 2 * l)
          resultat2 = calcul(L * l)
          break
        case 'triangle_rectangle':
          triplet = choice(tripletsPythagoriciens)
          enleveElement(tripletsPythagoriciens, triplet)
          a = calcul(triplet[0] * (1 + partieDecimale1))
          b = calcul(triplet[1] * (1 + partieDecimale1))
          c = calcul(triplet[2] * (1 + partieDecimale1))
          nomTriangle = creerNomDePolygone(3, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomTriangle)
          if (choice([true, false])) {
            texte = `Un triangle $${nomTriangle}$ rectangle en $${nomTriangle[1]}$ tel que $${nomTriangle[0] + nomTriangle[1] + ' = ' + texNombre(a)}$ cm, $${nomTriangle[1] + nomTriangle[2] + ' = ' + texNombre(b)}$ cm\
 et $${nomTriangle[0] + nomTriangle[2] + ' = ' + texNombre(c)}$ cm.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline longueur', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline longueur', { texte: '<br>' + sp(13) + 'Aire : ' })
          } else {
            texte = `Un triangle rectangle $${nomTriangle}$ a pour côtés : $${texNombre(a)}$ cm, $${texNombre(c)}$ cm et $${texNombre(b)}$ cm.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline longueur', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline longueur', { texte: '<br>' + sp(13) + 'Aire : ' })
          }

          texteCorr = `$\\mathcal{P}_{${nomTriangle}}=${texNombre(a)}~\\text{cm}+${texNombre(b)}
          ~\\text{cm}+${texNombre(c)}~\\text{cm}=${texNombre(a + b + c)}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}_{${nomTriangle}}=${texNombre(a)}~\\text{cm}\\times${texNombre(b)}~\\text{cm}\\div2=${texNombrec(a * b / 2)}~\\text{cm}^2$`
          resultat1 = calcul(a + b + c)
          resultat2 = calcul(a * b / 2)
          break
        case 'cercle':
          R = randint(3, 11)
          donneLeDiametre = choice([true, false])
          if (donneLeDiametre) {
            texte = `Un cercle de $${2 * R}$ cm de diamètre.` + '<br>' + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline longueur', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline longueur', { texte: '<br>' + sp(13) + 'Aire : ' })
            texteCorr = `Le diamètre est de $${2 * R}$ cm donc le rayon est de $${R}$ cm.<br>`
          } else {
            texte = `Un cercle de $${R}$ cm de rayon.` + sp(2) + ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline longueur', { texte: '<br>Périmètre : ' }) + '<br>' + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline longueur', { texte: '<br>' + sp(13) + 'Aire : ' })
            texteCorr = ''
          }

          texteCorr += `$\\mathcal{P}=2\\times${R}\\times\\pi~\\text{cm}=${2 * R}\\pi~\\text{cm}\\approx${arrondiVirgule(
            2 * R * Math.PI,
            1
          )}~\\text{cm}$<br>`
          texteCorr += `$\\mathcal{A}=${R}\\times${R}\\times\\pi~\\text{cm}^2=${R * R}\\pi~\\text{cm}^2\\approx${arrondiVirgule(
            R * R * Math.PI,
            1
          )}~\\text{cm}^2$`
          resultat1 = arrondi(2 * R * Math.PI, 1)
          resultat2 = arrondi(R * R * Math.PI, 1)
          break
      }

      if (reponses.indexOf(resultat1 * resultat2) === -1) {
        reponses.push(resultat1 * resultat2)
        if (!context.isAmc) {
          setReponse(this, 2 * i, new Grandeur(resultat1, 'cm'), { formatInteractif: 'longueur' })
          setReponse(this, 2 * i + 1, new Grandeur(resultat2, 'cm^2'), { formatInteractif: 'longueur' })
        } else {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'Périmètre',
                    valeur: resultat1,
                    param: {
                      digits: nombreDeChiffresDe(resultat1),
                      decimals: nombreDeChiffresDansLaPartieDecimale(resultat1),
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
                    texte: 'Aire',
                    valeur: resultat2,
                    param: {
                      digits: nombreDeChiffresDe(resultat2),
                      decimals: nombreDeChiffresDansLaPartieDecimale(resultat2),
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }]
          }
        }
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    3,
    '1 : Carré, rectangle et triangle rectangle\n2 : Cercles\n3 : Mélange'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des décimaux', false]
}
