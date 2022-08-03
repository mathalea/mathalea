import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, lettreDepuisChiffre } from '../../modules/outils.js'

export const titre = 'Somme des angles dans un triangle'

/**
* Déterminer la valeur d'un angle dans un triangle.
*
* Correction avec détails ou pas. 9 cas différents
* * On connaît 2 angles sur 3.
* * Dans un triangle rectangle, on connaît un angle aigu.
* * Dans un triangle isocèle, on connaît un angle à la base.
* * Dans un triangle isocèle, on connaît l'angle au sommet principal.
* * Quelle est la mesure d'un angle aigu dans un triangle rectangle qui a 2 angles égaux ?
* * Dans un triangle rectangle, un angle aigu mesure le double de l'autre.
* * Dans un triangle rectangle, un angle aigu mesure le quart de l'autre.
* * Dans un triangle rectangle, un angle aigu mesure 5 fois l'autre.
* * Un triangle a 3 angles égaux.
* * Dans un triangle rectangle, un angle mesure le tiers de l'autre.
* @author Jean-Claude Lhote
* Référence 5G31
*/
export default function ExerciceAnglesTriangles () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.titre = titre
  this.consigne = ''
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1.5
  context.isHtml ? this.spacing = 2 : this.spacing = 2
  this.nbQuestions = 5
  this.consigneModifiable = false
  this.correctionDetailleeDisponible = true
  this.nbCols = 1
  this.nbColsCorr = 1

  let typesDeQuestionsDisponibles
  const troisiemeAngle = function (a1, a2) {
    if (a1 + a2 <= 180) { return 180 - (a1 + a2) } else { return -1 }
  }

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    if (this.sup === 1) { typesDeQuestionsDisponibles = [1, 2, 4, 5, 9] } else if (this.sup === 2) { typesDeQuestionsDisponibles = [3, 6, 7, 8, 10, 11, 12] } else { typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    this.consigne = 'Calculer l\'angle demandé dans les triangles suivants :'
    let lettre1, lettre2, lettre3, s1, s2, s3, angle1, angle2
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      lettre1 = randint(1, 26) // aleatoirisation du nom des points
      lettre2 = randint(1, 26, [lettre1])
      s1 = lettreDepuisChiffre(lettre1)
      s2 = lettreDepuisChiffre(lettre2)
      lettre3 = randint(1, 24, [lettre1, lettre2])
      s3 = lettreDepuisChiffre(lettre3)
      if (this.correctionDetaillee) { texteCorr = 'Dans un triangle, la somme des angles est égale à $180\\degree$.<br>' } else { texteCorr = '' }
      switch (listeTypeDeQuestions[i]) {
        case 1: // triangle quelconque 2 angles connus
          angle1 = randint(10, 40)
          angle2 = randint(20, 100)
          texte = `$${s1 + s2 + s3}$ est un triangle quelconque. L'angle $\\widehat{${s1 + s2 + s3}}$ mesure $${angle1}\\degree$ et l'angle $\\widehat{${s2 + s1 + s3}}$ mesure $${angle2}\\degree$.<br>Quelle est la mesure de l'angle $\\widehat{${s2 + s3 + s1}}$ ?`
          if (this.correctionDetaillee) {
            texteCorr += `$\\widehat{${s1 + s2 + s3}} + \\widehat{${s2 + s3 + s1}} + \\widehat{${s2 + s1 + s3}}=180\\degree$<br>`
            texteCorr += `Donc $\\widehat{${s2 + s3 + s1}}=180- \\left(\\widehat{${s1 + s2 + s3}} + \\widehat{${s2 + s1 + s3}}\\right)$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s2 + s3 + s1}}$= $180\\degree-\\left(${angle1}\\degree+${angle2}\\degree\\right)=180\\degree-${angle1 + angle2}\\degree=${troisiemeAngle(angle1, angle2)}\\degree$.<br>`
          texteCorr += `L'angle $\\widehat{${s2 + s3 + s1}}$ mesure $${troisiemeAngle(angle1, angle2)}\\degree$.`
          break
        case 2: // Triangle rectangle Un angle aigu connu
          angle1 = 90
          angle2 = randint(5, 85)
          texte = `$${s1 + s2 + s3}$ est un triangle rectangle en $${s2}$ et l'angle $\\widehat{${s2 + s1 + s3}}$ mesure $${angle2}\\degree$.<br>Quelle est la mesure de l'angle $\\widehat{${s2 + s3 + s1}}$ ?`
          if (this.correctionDetaillee) {
            texteCorr += `Comme l'angle $\\widehat{${s1 + s2 + s3}}$ est droit, les angles $\\widehat{${s2 + s3 + s1}}$ et $\\widehat{${s2 + s1 + s3}}$ sont complémentaires.<br>`
            texteCorr += `On a donc : $\\widehat{${s2 + s3 + s1}}+ \\widehat{${s2 + s1 + s3}}=90\\degree$<br>D'où `
          }
          texteCorr += `$\\widehat{${s2 + s3 + s1}}=90\\degree-${angle2}\\degree=${90 - angle2}\\degree$<br>`
          texteCorr += `L'angle $\\widehat{${s2 + s3 + s1}}$ mesure $${90 - angle2}\\degree$.`
          break
        case 3: // triangle isocèle, angle au sommet principal connu
          angle1 = randint(10, 170)
          angle2 = (180 - angle1) / 2
          texte = `$${s1 + s2 + s3}$ est un triangle isocèle en $${s1}$. L'angle $\\widehat{${s2 + s1 + s3}}$ mesure $${angle1}\\degree$.<br>Quelle est la mesure de l'angle $\\widehat{${s2 + s3 + s1}}$ ?`

          if (this.correctionDetaillee) {
            texteCorr += 'Les angles à la base d\'un triangle isocèle sont de même mesure.<br>'
            texteCorr += `D'où $\\widehat{${s1 + s2 + s3}}=\\widehat{${s2 + s3 + s1}}$.<br>`
            texteCorr += `On a donc : $\\widehat{${s2 + s1 + s3}}+2\\times  \\widehat{${s2 + s3 + s1}}=180\\degree$.<br>`
            texteCorr += `Soit  $${angle1}\\degree+2\\times  \\widehat{${s2 + s3 + s1}}=180\\degree$.<br>`
            texteCorr += `D'où $2\\times  \\widehat{${s2 + s3 + s1}}=180\\degree-${angle1}\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s2 + s3 + s1}}=\\left(180\\degree-${angle1}\\degree\\right)\\div  2=${180 - angle1}\\degree\\div  2=${texNombre((180 - angle1) / 2)}\\degree$<br>`
          texteCorr += `L'angle $\\widehat{${s2 + s3 + s1}}$ mesure $${texNombre((180 - angle1) / 2)}\\degree$.`
          break
        case 4: // triangle isocèle, angle à la base connu
          angle2 = randint(10, 80)
          angle1 = 180 - angle2 * 2
          texte = `$${s1 + s2 + s3}$ est un triangle isocèle en $${s1}$. L'angle $\\widehat{${s1 + s2 + s3}}$ mesure $${angle2}\\degree$.<br>Quelle est la mesure de l'angle $\\widehat{${s2 + s1 + s3}}$ ?`

          if (this.correctionDetaillee) {
            texteCorr += 'Les deux angles à la base d\'un triangle isocèle sont égaux.<br>'
            texteCorr += `Donc $\\widehat{${s1 + s2 + s3}}=\\widehat{${s2 + s3 + s1}}=${angle2}\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s2 + s1 + s3}}=180\\degree-2\\times ${angle2}\\degree=180\\degree-${2 * angle2}\\degree=${180 - 2 * angle2}\\degree$.<br>`
          texteCorr += `L'angle $\\widehat{${s2 + s1 + s3}}$ mesure $${180 - 2 * angle2}\\degree$.`
          break
        case 5: // cas non aléatoires triangle rectangle isocèle
          angle1 = 90
          angle2 = 45
          texte = `$${s1 + s2 + s3}$ est un triangle rectangle en $${s2}$ et $\\widehat{${s2 + s1 + s3}}=\\widehat{${s2 + s3 + s1}}$.<br>Quelle est la mesure de l'angle $\\widehat{${s2 + s3 + s1}}$ ?`

          if (this.correctionDetaillee) {
            texteCorr += `Comme $\\widehat{${s2 + s1 + s3}}=\\widehat{${s2 + s3 + s1}}$,<br>`
            texteCorr += `on a : $2 \\times  \\widehat{${s2 + s1 + s3}} + 90\\degree=180\\degree$.<br>D'où `
            texteCorr += ` $2 \\times  \\widehat{${s2 + s1 + s3}}=180\\degree-90\\degree=90\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s2 + s1 + s3}}=90\\degree \\div  2=45\\degree$.<br>`
          texteCorr += `L'angle $\\widehat{${s2 + s1 + s3}}$ mesure $45\\degree$.`

          break
        case 6: // cas non aléatoires triangle rectangle 30,60,90
          texte = `$${s1 + s2 + s3}$ est un triangle rectangle en $${s1}$. L'angle $\\widehat{${s1 + s2 + s3}}$ mesure le double de l'angle $\\widehat{${s1 + s3 + s2}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1 + s2 + s3}}$ et $\\widehat{${s1 + s3 + s2}}$ ?`
          if (this.correctionDetaillee) {
            texteCorr += `Comme $\\widehat{${s1 + s2 + s3}}=2\\times \\widehat{${s1 + s3 + s2}}$ et comme $\\widehat{${s1 + s2 + s3}}$ et $\\widehat{${s1 + s3 + s2}}$ sont complémentaires,<br>`
            texteCorr += `on a : $2 \\times  \\widehat{${s1 + s3 + s2}} + \\widehat{${s1 + s3 + s2}}=90\\degree$.<br>D'où `
            texteCorr += ` $3 \\times  \\widehat{${s1 + s3 + s2}}=90\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s1 + s3 + s2}}=90\\degree \\div  3=30\\degree$.<br>`
          texteCorr += `$\\widehat{${s1 + s2 + s3}}=2\\times \\widehat{${s1 + s3 + s2}}=2\\times  30\\degree=60\\degree$<br>`
          texteCorr += `L'angle $\\widehat{${s1 + s3 + s2}}$ mesure $30\\degree$ et l'angle $\\widehat{${s1 + s2 + s3}}$ mesure $60\\degree$.`

          break
        case 7: // cas non aléatoires triangle rectangle 18,72,90
          texte = `$${s1 + s2 + s3}$ est un triangle rectangle en $${s1}$. L'angle $\\widehat{${s1 + s3 + s2}}$ mesure le quart de l'angle $\\widehat{${s1 + s2 + s3}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1 + s2 + s3}}$ et $\\widehat{${s1 + s3 + s2}}$ ?`
          if (this.correctionDetaillee) {
            texteCorr += `Comme $\\widehat{${s1 + s2 + s3}}=\\dfrac{\\widehat{${s1 + s3 + s2}}}{4}$, on a $\\widehat{${s1 + s3 + s2}}=4\\times \\widehat{${s1 + s2 + s3}}$.<br>`
            texteCorr += `De plus $\\widehat{${s1 + s2 + s3}}$ et $\\widehat{${s1 + s3 + s2}}$ sont complémentaires.<br>`
            texteCorr += `D'où : $4 \\times  \\widehat{${s1 + s2 + s3}} + \\widehat{${s1 + s2 + s3}}=90\\degree$.<br>D'où `
            texteCorr += ` $5 \\times  \\widehat{${s1 + s2 + s3}}=90\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s1 + s2 + s3}}=90\\degree \\div  5=18\\degree$.<br>`
          texteCorr += `$\\widehat{${s1 + s3 + s2}}=4\\times \\widehat{${s1 + s2 + s3}}=4\\times  18\\degree=72\\degree$.<br>`
          texteCorr += `L'angle $\\widehat{${s1 + s3 + s2}}$ mesure $72\\degree$ et l'angle $\\widehat{${s1 + s2 + s3}}$ mesure $18\\degree$.`
          break
        case 8: // cas non aléatoires triangle rectangle 15,75,90
          texte = `$${s1 + s2 + s3}$ est un triangle rectangle en $${s1}$. L'angle $\\widehat{${s1 + s2 + s3}}$ est cinq fois plus grand que l'angle $\\widehat{${s1 + s3 + s2}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1 + s2 + s3}}$ et $\\widehat{${s1 + s3 + s2}}$ ?`
          if (this.correctionDetaillee) {
            texteCorr += `$\\widehat{${s1 + s2 + s3}}=5\\times \\widehat{${s1 + s3 + s2}}$ et comme $\\widehat{${s1 + s2 + s3}}$ et $\\widehat{${s1 + s3 + s2}}$ sont complémentaires,<br>`
            texteCorr += ` on a : $5 \\times  \\widehat{${s1 + s3 + s2}} + \\widehat{${s1 + s3 + s2}}=90\\degree$.<br>D'où `
            texteCorr += ` $6 \\times  \\widehat{${s1 + s3 + s2}}=90\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s1 + s3 + s2}}=90\\degree \\div  6=15\\degree$<br>`
          texteCorr += `$\\widehat{${s1 + s2 + s3}}=5\\times \\widehat{${s1 + s3 + s2}}=5\\times  15\\degree=75\\degree$<br>`
          texteCorr += `L'angle $\\widehat{${s1 + s3 + s2}}$ mesure $15\\degree$ et l'angle $\\widehat{${s1 + s2 + s3}}$ mesure $75\\degree$.`
          break
        case 9: // cas non aléatoire triangle équilatéral
          texte = `$${s1 + s2 + s3}$ est un triangle dont les trois angles sont égaux. Quelles sont les mesures de ses angles ?`
          if (this.correctionDetaillee) {
            texteCorr += `De plus, $\\widehat{${s1 + s2 + s3}}=\\widehat{${s1 + s3 + s2}}=\\widehat{${s2 + s1 + s3}}$<br>`
            texteCorr += `D'où $3\\times \\widehat{${s1 + s2 + s3}}=180\\degree$.<br>`
            texteCorr += `D'où : $\\widehat{${s1 + s2 + s3}}=180\\degree\\div  3=60\\degree$.<br>`
          }
          texteCorr += `On a donc $\\widehat{${s1 + s2 + s3}}=\\widehat{${s1 + s3 + s2}}=\\widehat{${s2 + s1 + s3}}=60\\degree$.<br>`
          texteCorr += `Le triangle $${s1 + s2 + s3}$ est un triangle équilatéral.`
          break
        case 10: // cas non aléatoire triangle rectangle 22.5, 67.5,90
          texte = `$${s1 + s2 + s3}$ est un triangle rectangle en $${s1}$. L'angle $\\widehat{${s1 + s3 + s2}}$ mesure le tiers de l'angle $\\widehat{${s1 + s2 + s3}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1 + s2 + s3}}$ et $\\widehat{${s1 + s3 + s2}}$ ?`
          if (this.correctionDetaillee) {
            texteCorr += `Comme $\\widehat{${s1 + s2 + s3}}=\\dfrac{\\widehat{${s1 + s3 + s2}}}{3}$, on a $\\widehat{${s1 + s3 + s2}}=3\\times \\widehat{${s1 + s2 + s3}}$.<br>`
            texteCorr += `De plus $\\widehat{${s1 + s2 + s3}}$ et $\\widehat{${s1 + s3 + s2}}$ sont complémentaires.<br>`
            texteCorr += `D'où : $3 \\times  \\widehat{${s1 + s2 + s3}} + \\widehat{${s1 + s2 + s3}}=90\\degree$.<br>D'où `
            texteCorr += ` $4 \\times  \\widehat{${s1 + s2 + s3}}=90\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s1 + s2 + s3}}=90\\degree \\div  4=22,5\\degree$.<br>`
          texteCorr += `$\\widehat{${s1 + s3 + s2}}=3\\times \\widehat{${s1 + s2 + s3}}=3\\times  22,5\\degree=67,5\\degree$<br>`
          texteCorr += `L'angle $\\widehat{${s1 + s3 + s2}}$ mesure $67,5\\degree$ et l'angle $\\widehat{${s1 + s2 + s3}}$ mesure $22,5\\degree$.`
          break
        case 11: // cas non aléatoire triangle 67.5 , 67.5 , 45.
          texte = `$${s1 + s2 + s3}$ est un triangle isocèle en $${s1}$. L'angle $\\widehat{${s2 + s1 + s3}}$ mesure les deux tiers de l'angle $\\widehat{${s1 + s2 + s3}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1 + s2 + s3}}$, $\\widehat{${s1 + s3 + s2}}$ et $\\widehat{${s2 + s1 + s3}}$ ?`
          if (this.correctionDetaillee) {
            texteCorr += `Comme $\\widehat{${s2 + s1 + s3}}=\\dfrac{2\\times  \\widehat{${s1 + s3 + s2}}}{3}$, on a $\\widehat{${s1 + s3 + s2}}=\\dfrac{3\\times \\widehat{${s2 + s1 + s3}}}{2}$.<br>`
            texteCorr += `De plus $\\widehat{${s1 + s3 + s2}}$ et $\\widehat{${s1 + s2 + s3}}$ sont égaux, alors $\\widehat{${s1 + s2 + s3}}=\\dfrac{3\\times \\widehat{${s2 + s1 + s3}}}{2}$.<br>`
            texteCorr += `D'où : $\\dfrac{3 \\times  \\widehat{${s2 + s1 + s3}}}{2}\\times  2 + \\widehat{${s2 + s1 + s3}}=180\\degree$.<br>`
            texteCorr += `D'où : $3 \\times  \\widehat{${s2 + s1 + s3}} + \\widehat{${s2 + s1 + s3}}=180\\degree$.<br>D'où `
            texteCorr += ` $4 \\times  \\widehat{${s2 + s1 + s3}}=180\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s2 + s1 + s3}}=180\\degree \\div  4=45\\degree$.<br>`
          texteCorr += `$\\widehat{${s1 + s3 + s2}}=\\dfrac{3\\times \\widehat{${s2 + s1 + s3}}}{2}=\\dfrac{3\\times  45\\degree}{2}=\\dfrac{135\\degree}{2}=67,5\\degree$<br>`
          texteCorr += `L'angle $\\widehat{${s1 + s3 + s2}}$ mesure $67,5\\degree$, l'angle $\\widehat{${s1 + s2 + s3}}$ mesure $67,5\\degree$ et l'angle $\\widehat{${s2 + s1 + s3}}$ mesure $45\\degree$`
          break
        case 12: // cas non aléatoire triangle 72 , 72 , 36.
          texte = `$${s1 + s2 + s3}$ est un triangle isocèle en $${s1}$. L'angle $\\widehat{${s1 + s2 + s3}}$ mesure le double de l'angle $\\widehat{${s2 + s1 + s3}}$.<br>Quelles sont les mesures des angles $\\widehat{${s1 + s2 + s3}}$, $\\widehat{${s1 + s3 + s2}}$ et $\\widehat{${s2 + s1 + s3}}$ ?`
          if (this.correctionDetaillee) {
            texteCorr += `On a $\\widehat{${s1 + s2 + s3}}=2\\times  \\widehat{${s2 + s1 + s3}}$.<br>`
            texteCorr += `De plus $\\widehat{${s1 + s3 + s2}}$ et $\\widehat{${s1 + s2 + s3}}$ sont égaux, alors $\\widehat{${s1 + s3 + s2}}=2\\times \\widehat{${s2 + s1 + s3}}$.<br>`
            texteCorr += `D'où : $2 \\times  \\widehat{${s2 + s1 + s3}}\\times  2 + \\widehat{${s2 + s1 + s3}}=180\\degree$.<br>`
            texteCorr += `D'où : $4 \\times  \\widehat{${s2 + s1 + s3}} + \\widehat{${s2 + s1 + s3}}=180\\degree$.<br>D'où `
            texteCorr += ` $5 \\times  \\widehat{${s2 + s1 + s3}}=180\\degree$.<br>D'où `
          }
          texteCorr += `$\\widehat{${s2 + s1 + s3}}=180\\degree \\div  5=36\\degree$.<br>`
          texteCorr += `$\\widehat{${s1 + s3 + s2}}=2\\times \\widehat{${s2 + s1 + s3}}=2\\times  36\\degree=72\\degree$<br>`
          texteCorr += `L'angle $\\widehat{${s1 + s3 + s2}}$ mesure $72\\degree$, l'angle $\\widehat{${s1 + s2 + s3}}$ mesure $72\\degree$ et l'angle $\\widehat{${s2 + s1 + s3}}$ mesure $36\\degree$`
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
  this.besoinFormulaireNumerique = ['Niveau de difficuté', 3, ' 1 : Facile \n 2 : Difficile \n 3 : Mélange']
}
