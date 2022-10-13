import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { ecritureAlgebrique } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { reduireAxPlusB } from '../../modules/outils/reductions.js'
import { numAlpha } from '../../modules/outils/contextSensitif.js'

import { texNombre } from '../../modules/outils/texNombres.js'
import { tableauDeVariation } from '../../modules/2d/tableauDeVariation.js'
import Decimal from 'decimal.js/decimal.mjs'
export const dateDePublication = '01/10/2022'
export const titre = 'Dresser et utiliser le tableau de signes d\'une fonction affine en lien avec son sens de variation'

/**
* @author Gilles Mora
* 2F10-7
*/

export const uuid = '46bec'
export const ref = '2F10-7'
export default function SignefonctionaffineVariation () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2 // On complète le nb de questions
  this.nbCols = 1
  this.nbColsCorr = 1
  this.video = ''
  this.spacing = 1.75
  this.spacingCorr = 1.75
  this.sup = 1
  this.listePackages = ['tkz-tab']
  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    this.sup = parseInt(this.sup)
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['Signes1']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['Signes2']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['Signes1', 'Signes2']
    }
    const nomF = [
      ['f'], ['g'], ['h'], ['u'],
      ['v'], ['w']
    ]
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, b, nom, sol, ligne1, choix, x, y, x1, x2, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;) { // on rajoute les variables dont on a besoin
      switch (listeTypeQuestions[i]) {
        case 'Signes1':
          choix = choice([0, 1])
          if (choix === 0) {
            nom = choice(nomF)
            a = choice([1, 2, 5, 10]) * choice([-1, 1])// coefficient a de la fonction affine
            b = randint(1, 15) * choice([-1, 1])// coefficient b de la fonction affine
            sol = new Decimal(-b).div(a)

            texte = `Une fonction affine $${nom}$  définie sur $\\mathbb R$ est strictement ${a > 0 ? 'croissante' : 'décroissante'}. De plus $${nom}(${texNombre(sol, 1)})=0$.<br>
        ${numAlpha(0)} Dresser son tableau de signes sur $\\mathbb R$.<br>
        ${numAlpha(1)} Donner une fonction $${nom}$ vérifiant les conditions précédentes.`
            texteCorr = `${numAlpha(0)} $${nom}$ est une fonction affine. Elle s'écrit donc sous la forme $${nom}(x)=ax+b$. <br>
        Puisque $${nom}$ est strictement ${a > 0 ? 'croissante' : 'décroissante'} sur $\\mathbb R$, les images sont ${a > 0 ? 'd\'abord négatives, puis positives' : 'd\'abord positives, puis négatives'}.<br>
        Sachant que $${nom}$ s'annule en $${texNombre(sol, 1)}$, le changement de signe intervient donc en $x=${texNombre(sol, 1)}$. <br>
        On obtient ainsi le tableau de signes suivant : <br>
         `
            if (a > 0) {
              ligne1 = ['Line', 10, '', 0, '-', 20, 'z', 20, '+']
            } else {
              ligne1 = ['Line', 10, '', 0, '+', 20, 'z', 20, '-']
            }

            texteCorr += mathalea2d({ xmin: -0.5, ymin: -5.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
              tabInit: [
                [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 1.5, 10], [`$${nom}(x)$`, 2, 50]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                ['$-\\infty$', 20, `$${texNombre(sol, 1)}$`, 20, '$+\\infty$', 30]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [ligne1],
              colorBackground: '',
              espcl: 3.5, // taille en cm entre deux antécédents
              deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 5, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))

            texteCorr += `<br> ${numAlpha(1)} La fonction doit vérifier les trois conditions : <br>
        $\\bullet$ être une fonction affine ; <br>
        $\\bullet$ être strictement ${a > 0 ? 'croissante' : 'décroissante'} ;<br>
        $\\bullet$ s'annuler en $${texNombre(sol, 1)}$.<br>
       Comme $${nom}$ est une fonction ${a > 0 ? 'croissante' : 'décroissante'}, on doit choisir un coefficient directeur 
       $a$ ${a > 0 ? 'positif' : 'négatif'}.<br>
       Prenons ${a > 0 ? '$a=1$' : '$a=-1$'}.<br>
       $${nom}$ est alors de la forme : $${nom}(x)=${a > 0 ? '' : '-'}x + b$.<br>
       On cherche maintenant $b$ : <br>
       Comme on sait que : $${nom}(${texNombre(sol, 1)})=0$, on en déduit :
        $${nom}(${texNombre(sol, 1)})=${a > 0 ? `${texNombre(sol, 1)}` : `${texNombre(-sol, 1)}`}   + b=0$.<br>
       d'où $b=${a > 0 ? `${texNombre(-sol, 1)}` : `${texNombre(sol, 1)}`}$.<br>
       On obtient la fonction $${nom}$ définie par $${nom}(x)=${a > 0 ? '' : '-'}x${a > 0 ? `${ecritureAlgebrique(-sol, 1)}` : `${ecritureAlgebrique(sol, 1)}`}$.<br>
       En partant d'une autre valeur pour $a$, on aurait obtenu une autre expression pour $${nom}$.<br>
       Il existe une infinité de fonctions qui possèdent ces trois propriétés. <br>
       Toutes les fonctions de la forme $${nom}(x)= k\\times\\left( ${a > 0 ? '' : '-'}x${a > 0 ? `${ecritureAlgebrique(-sol, 1)}` : `${ecritureAlgebrique(sol, 1)}`}\\right)$ avec $k$ un réel non-nul est solution de l'exercice.
       
       `
          }
          if (choix === 1) {
            nom = choice(nomF)
            a = randint(-5, 5, 0)// coefficient b de la fonction affine
            b = a * randint(-9, 9, 0)// coefficient a de la fonction affine
            sol = -b / a
            x = randint(-10, 10, sol)
            y = a * x + b

            texte = `Une fonction affine $${nom}$  définie sur $\\mathbb R$ vérifie $${nom}(${texNombre(sol, 1)})=0$ et $${nom}(${x})=${y}$.<br>
           Dresser son tableau de signes sur $\\mathbb R$. Justifier.
         `
            if (x > sol) {
              texteCorr = ` $${nom}$ est une fonction affine (non constante, puisque $${nom}(${x})\\neq ${nom}(${texNombre(sol, 1)})$), elle 
          est donc soit strictement croissante, soit strictement décroissante.<br>
         On observe que $${sol}<${x}$ implique ${a > 0 ? `$${nom}(${sol}) < ${nom}(${x})$` : `$${nom}(${sol}) > ${nom}(${x})$`}.<br>
          Les images et les antécédents sont donc rangés ${a > 0 ? 'dans le même ordre' : 'dans l\'ordre inverse'}.<br>
          On en déduit que la fonction $${nom}$ est${a > 0 ? 'croissante' : 'décroissante'} sur $\\mathbb R$.<br>
          Les images sont donc ${a > 0 ? 'd\'abord négatives, puis positives' : 'd\'abord positives, puis négatives'}.<br>
          Sachant que $${nom}$ s'annule en $${texNombre(sol, 1)}$, le changement de signe intervient donc en $x=${texNombre(sol, 1)}$. <br>
          On obtient ainsi le tableau de signes suivant : <br>
           `
            } else {
              texteCorr = ` $${nom}$ est une fonction affine (non constante, puisque $${nom}(${x})\\neq ${nom}(${texNombre(sol, 1)})$), elle 
           est donc soit strictement croissante, soit strictement décroissante.<br>
           On observe que $${x}<${sol}$ implique ${a > 0 ? `$${nom}(${x}) < ${nom}(${sol})$` : `$${nom}(${x}) > ${nom}(${sol})$`}.<br>
          Les images et les antécédents sont donc rangés ${a > 0 ? 'dans le même ordre' : 'dans l\'ordre inverse'}.<br>
          On en déduit que la fonction $${nom}$ est${a > 0 ? 'croissante' : 'décroissante'} sur $\\mathbb R$.<br>
                  
           Les images sont ${a > 0 ? 'd\'abord négatives, puis positives' : 'd\'abord positives, puis négatives'}.<br>
           Sachant que $${nom}$ s'annule en $${texNombre(sol, 1)}$, le changement de signe intervient donc en $x=${texNombre(sol, 1)}$. <br>
           On obtient ainsi le tableau de signes suivant : <br>
            `
            }
            if (a > 0) {
              ligne1 = ['Line', 10, '', 0, '-', 20, 'z', 20, '+']
            } else {
              ligne1 = ['Line', 10, '', 0, '+', 20, 'z', 20, '-']
            }

            texteCorr += mathalea2d({ xmin: -0.5, ymin: -5.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
              tabInit: [
                [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                  ['$x$', 1.5, 10], [`$${nom}(x)$`, 2, 50]
                ],
                // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
                ['$-\\infty$', 20, `$${texNombre(sol, 1)}$`, 20, '$+\\infty$', 30]
              ],
              // tabLines ci-dessous contient les autres lignes du tableau.
              tabLines: [ligne1],
              colorBackground: '',
              espcl: 3.5, // taille en cm entre deux antécédents
              deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
              lgt: 5, // taille de la première colonne en cm
              hauteurLignes: [15, 15]
            }))
          }
          break
        case 'Signes2':

          a = randint(-5, 5, 0)// coefficient b de la fonction affine
          b = a * randint(-6, 6, 0)// coefficient a de la fonction affine
          sol = -b / a
          nom = choice(nomF)
          if (choice([true, false])) {
            x1 = randint(sol + 1, 10)
            x2 = randint(sol + 1, 10, x1)
          } else {
            x1 = randint(-10, sol - 1)
            x2 = randint(-10, sol - 1, x1)
          }
          texte = `On donne le tableau de signes d'une fonction affine  $${nom}$  définie sur $\\mathbb R$ :<br>`
          if (a > 0) {
            ligne1 = ['Line', 10, '', 0, '-', 20, 'z', 20, '+']
          } else {
            ligne1 = ['Line', 10, '', 0, '+', 20, 'z', 20, '-']
          }

          texte += mathalea2d({ xmin: -0.5, ymin: -5.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 1.5, 10], [`$${nom}(x)$`, 2, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              ['$-\\infty$', 20, `$${texNombre(sol, 1)}$`, 20, '$+\\infty$', 30]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 3.5, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 5, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))
          texte += `<br> ${numAlpha(0)} Donner le sens de varitions de $${nom}$ sur $\\mathbb R$.<br>
        ${numAlpha(1)} Comparer $${nom}(${x1})$ et $${nom}(${x2})$.`
          texteCorr = `${numAlpha(0)} D'après le tableau de signes, les images sont  ${a > 0 ? 'd\'abord négatives, puis positives' : 'd\'abord positives, puis négatives'}.<br>
        On en déduit que la fonction $${nom}$ est ${a > 0 ? 'strictement croissante' : 'strictement décroissante'} sur $\\mathbb R$.<br>`
          texteCorr += `${numAlpha(1)} Comme $${nom}$ est une fonction affine ${a > 0 ? 'strictement croissante' : 'strictement décroissante'}, 
          les antécédents et les images sont rangées ${a > 0 ? 'dans le même ordre' : 'dans l\'ordre inverse'}. <br>
         `
          if (x2 > x1) {
            texteCorr += ` Comme $${x1} < ${x2}$, alors  ${a > 0 ? `$${nom}(${x1}) < ${nom}(${x2})$` : `$${nom}(${x1}) > ${nom}(${x2})$`}
         `
          } else {
            texteCorr += ` Comme $${x2} < ${x1}$, alors  ${a > 0 ? `$${nom}(${x2}) < ${nom}(${x1})$` : `$${nom}(${x2}) > ${nom}(${x1})$`}
          `
          }
          break
      }
      if (this.questionJamaisPosee(i, this.sup, a, b)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Types de question ', 3, '1 : Donner le tableau de signes.\n2 : Utiliser le tableau de signes.\n3 : Mélange.']
}
