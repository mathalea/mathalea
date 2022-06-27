import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, choisitLettresDifferentes, lettreDepuisChiffre, choice, combinaisonListes } from '../../modules/outils.js'
import { cercleCentrePoint, cercle, codageSegments, pointAdistance, pointIntersectionCC, point, labelPoint, similitude, polygoneAvecNom, tracePoint, texteParPoint, droite, segment, traceCompas, dansLaCibleCarree, cibleCarree, rotation, mathalea2d } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'

export const titre = 'Construire des parallélogrammes avec dispositif d\'auto-correction'
export const dateDeModifImportante = '08/05/2022'

/**
 * Terminer la construction d'un parallélogramme
 * Ref 5G40
 * @author Jean-Claude Lhote (exercice) et Rémi Angot (animations)
 * Ajout de la possibilité de choisir le nombre de questions par Guillaume Valmont le 08/05/2022
 * Publié le 30/11/2020
 */
export default function ConstructionsParallelogrammes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 5
  this.correctionDetaillee = false
  this.correctionDetailleeDisponible = true
  this.typeExercice = 'IEP'
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let typeQuestionsDisponibles = [1, 2, 3, 4]
    if (this.sup < 5) typeQuestionsDisponibles = [parseInt(this.sup)]

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const celluleAlea = function (rang) {
        const lettre = lettreDepuisChiffre(randint(1, rang))
        const chiffre = Number(randint(1, rang)).toString()
        return lettre + chiffre
      }
      // On prépare la figure...
      const noms = choisitLettresDifferentes(5, 'QO', true) // on choisit 5 lettres, les 4 premières sont les sommets, la 5e est le centre
      const nom = `${noms[0] + noms[1] + noms[2] + noms[3]}`
      const objetsEnonce = []
      const objetsCorrection = []
      // Préparation de la figure aléatoire et des objets 2d utiles
      const O = point(0, 0, noms[4])
      const A = rotation(pointAdistance(O, calcul(randint(50, 70) / 10)), O, randint(0, 179) * choice([-1, 1]), noms[0])
      const C = rotation(A, O, 180, noms[2])
      const B = similitude(A, O, randint(40, 80) * choice([-1, 1]), randint(4, 7, 5) * choice([-1, 1]) / 5, noms[1])
      const D = rotation(B, O, 180, noms[3])
      const p = polygoneAvecNom(A, B, C, D)
      const d1 = segment(O, A)
      const d2 = segment(O, B)
      const d3 = segment(O, C)
      const d4 = segment(O, D)
      const c1 = segment(A, B)
      const c4 = segment(D, A)
      const dd1 = droite(A, B)
      const dd2 = droite(A, D)
      const dd3 = droite(C, D)
      const dd4 = droite(C, B)
      const cellule = celluleAlea(5)
      const cellule2 = celluleAlea(5)
      const cellule3 = celluleAlea(5)

      const result = dansLaCibleCarree(C.x, C.y, 5, 0.5, cellule)
      const result2 = dansLaCibleCarree(D.x, D.y, 5, 0.5, cellule2)
      const result3 = dansLaCibleCarree(B.x, B.y, 5, 0.5, cellule3)

      const cible = cibleCarree({ x: result[0], y: result[1], rang: 5, num: 1, taille: 0.5 })
      cible.color = 'gray'
      cible.opacite = 0.7
      const cible2 = cibleCarree({ x: result2[0], y: result2[1], rang: 5, num: 2, taille: 0.5 })
      cible2.color = 'gray'
      cible2.opacite = 0.7
      const cible3 = cibleCarree({ x: result3[0], y: result3[1], rang: 5, num: 3, taille: 0.5 })
      cible3.color = 'gray'
      cible3.opacite = 0.7
      const xMin = Math.min(A.x, B.x, C.x, D.x) - 3
      const yMin = Math.min(A.y, B.y, C.y, D.y) - 3
      const xMax = Math.max(A.x, B.x, C.x, D.x) + 3
      const yMax = Math.max(A.y, B.y, C.y, D.y) + 3

      let P
      const animIEP = new Alea2iep()
      animIEP.recadre(xMin, yMax) // Il faut recadrer en première étape pour bien calculer les coordonnées des points

      switch (listeTypeQuestions[i]) {
        case 1: // deux côtés consécutifs
          this.consigne = `Construire le parallélogramme $${nom}$.`
          texteCorr = 'Plusieurs constructions sont possibles :<br>'
          if (this.correctionDetaillee) {
            texteCorr += `- En utilisant l'égalité des longueurs : $${noms[0] + noms[1]}=${noms[3] + noms[2]}$ et $${noms[2] + noms[1]}=${noms[3] + noms[0]}$.<br>`
            texteCorr += `- En traçant la parallèle à $(${noms[0] + noms[1]})$ passant par $${noms[3]}$ et la parallèle à $(${noms[3] + noms[0]})$ passant par $${noms[1]}$.<br>`
            texteCorr += '- En utilisant la propriété des diagonales qui se coupent en leur milieu.<br>'
            texteCorr += 'Nous avons choisi la première méthode qui nous semble la plus efficace ici.<br>'
          } else {
            texteCorr += `En voici une utilisant l'égalité des longueurs : $${noms[0] + noms[1]}=${noms[3] + noms[2]}$ et $${noms[2] + noms[1]}=${noms[3] + noms[0]}$.<br>`
          }
          texteCorr += `Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`

          c1.styleExtremites = '-|'
          c4.styleExtremites = '|-'
          P = polygoneAvecNom(D, A, B)
          objetsEnonce.push(c1, c4, P[1], cible)
          objetsCorrection.push(p[0], p[1], cible, traceCompas(D, C, 30), traceCompas(B, C, 30), codageSegments('||', 'red', A, B, D, C), codageSegments('///', 'blue', A, D, B, C))
          animIEP.parallelogramme3sommetsConsecutifs(D, A, B, C.nom)
          break
        case 2: // trois sommets consécutifs
          this.consigne = `Construire le parallélogramme $${nom}$.`
          texteCorr = 'Plusieurs constructions sont possibles :<br>'
          if (this.correctionDetaillee) {
            texteCorr += `- En utilisant l'égalité des longueurs : $${noms[0] + noms[1]}=${noms[3] + noms[2]}$ et $${noms[2] + noms[1]}=${noms[3] + noms[0]}$.<br>`
            texteCorr += `- En traçant la parallèle à $(${noms[0] + noms[1]})$ passant par $${noms[3]}$ et la parallèle à $(${noms[3] + noms[0]})$ passant par $${noms[1]}$.<br>`
            texteCorr += '- En utilisant la propriété des diagonales qui se coupent en leur milieu.<br>'
            texteCorr += 'Nous avons choisi la première méthode qui nous semble la plus efficace ici.<br>'
          } else {
            texteCorr += `En voici une utilisant l'égalité des longueurs : $${noms[0] + noms[1]}=${noms[3] + noms[2]}$ et $${noms[2] + noms[1]}=${noms[3] + noms[0]}$.<br>`
          }
          texteCorr += `Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`
          P = polygoneAvecNom(D, A, B)
          animIEP.pointCreer(D, D.nom, 0)
          animIEP.pointCreer(A, A.nom, 0)
          animIEP.pointCreer(B, B.nom, 0)
          animIEP.regleSegment(D, A)
          animIEP.regleSegment(A, B)
          animIEP.regleMasquer(0)
          animIEP.crayonMasquer(0)
          animIEP.parallelogramme3sommetsConsecutifs(D, A, B, C.nom)
          objetsEnonce.push(tracePoint(A, B, D), P[1], cible)
          objetsCorrection.push(p[0], p[1], cible, traceCompas(D, C, 30), traceCompas(B, C, 30), codageSegments('||', 'red', A, B, D, C), codageSegments('///', 'blue', A, D, B, C))

          break
        case 3: // deux sommmets consécutifs plus le centre
          this.consigne = `Construire le parallélogramme $${nom}$ de centre $${noms[4]}$.`
          texteCorr += `O est le centre de symétrie du parallélogramme $${nom}$.<br>`
          if (this.correctionDetaillee) {
            texteCorr += `Le point $${noms[3]}$ est le symétrique du point $${noms[1]}$ par rapport à $${noms[4]}$.<br>`
            texteCorr += `Le point $${noms[2]}$ est le symétrique du point $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
          }
          texteCorr += `Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible 1.<br>`
          texteCorr += `Le point $${noms[3]}$ se trouve dans la case ${cellule2} de la cible 2.<br>`
          P = polygoneAvecNom(O, A, B)
          animIEP.parallelogramme2sommetsConsecutifsCentre(A, B, O)
          objetsEnonce.push(tracePoint(A, B, O), P[1], cible, cible2)
          objetsCorrection.push(p[0], p[1], labelPoint(O), cible, cible2, d1, d2, d3, d4, codageSegments('||', 'red', A, O, O, C), codageSegments('|||', 'blue', B, O, O, D))

          break
        case 4: // Un angle formé par deux demi-droites et le centre
          this.consigne = `Construire le parallélogramme $${nom}$ de centre ${noms[4]}.`
          texte += `Le point $${noms[3]}$ est sur la demi-droite $[${noms[0]}x)$ et le point $${noms[1]}$ est sur la demi-droite $[${noms[0]}y)$.<br>`
          if (this.correctionDetaillee) {
            texteCorr += `Le point $${noms[2]}$ est le symétrique du point $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
            texteCorr += `La symétrique de la droite $(${noms[0] + noms[1]})$ par rapport à $${noms[4]}$ est la droite passant par $${noms[2]}$ parallèle à $(${noms[0] + noms[1]})$.<br>`
            texteCorr += `La symétrique de la droite $(${noms[0] + noms[3]})$ par rapport à $${noms[4]}$ est la droite passant par $${noms[2]}$ parallèle à $(${noms[0] + noms[3]})$.<br>`
          }
          texteCorr += `Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible 1.<br>`
          texteCorr += `Le point $${noms[3]}$ se trouve dans la case ${cellule2} de la cible 2.<br>`
          animIEP.regleZoom(200)
          animIEP.equerreZoom(200)
          animIEP.parallelogrammeAngleCentre(D, A, B, O)
          objetsEnonce.push(dd1, dd2, tracePoint(O), labelPoint(O, A), texteParPoint('x', pointIntersectionCC(cercleCentrePoint(A, D), cercle(D, 0.5), 1)), texteParPoint('y', similitude(B, A, 4, 1.3)), cible, cible2, cible3)
          objetsCorrection.push(dd1, dd2, dd3, dd4, p[0], p[1], tracePoint(O), labelPoint(O), cible, cible2, cible3, d1, d3, codageSegments('||', 'red', A, O, O, C))

          break
      }
      texte = mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.5 }, objetsEnonce)
      texteCorr = mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.5 }, objetsCorrection)
      texteCorr += animIEP.htmlBouton(this.umeroExercice)
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Supprime b, c et d dans la ligne ci-dessus et remplace les par NombreAAjouter !
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de questions', 5, '1 : Deux côtés consécutifs\n2 : Trois sommets consécutifs\n3 : Deux sommets consécutifs et le centre\n4 : Un angle et le centre\n5 : Une des configuration au hasard']
  // this.besoinFormulaire2CaseACocher = ["Avec des points de part et d'autre"];
}
