import Exercice from '../ClasseExercice.js'
import { liste_de_question_to_contenu, randint, calcul, choisit_lettres_differentes, lettre_depuis_chiffre, choice } from '../../modules/outils.js'
import { cercleCentrePoint, cercle, codeSegments, pointAdistance, pointIntersectionLC, texteParPosition, pointIntersectionCC, point, labelPoint, similitude, polygoneAvecNom, tracePoint, texteParPoint, homothetie, droite, segment, traceCompas, dansLaCibleCarree, cibleCarree, rotation, longueur, mathalea2d } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'

/**
 * Terminer la construction d'un parallélogramme
 * Ref 5G40
 * @Auteur Jean-Claude Lhote (exercice) et Rémi Angot (animations)
 * Publié le 30/11/2020
 */
export default function Constructions_parallelogrammes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = "Construire des parallélogrammes avec dispositif d'auto-correction"
  this.consigne = ''
  this.nb_questions = 1
  this.nb_questions_modifiable = false
  this.nb_cols = 1
  this.nb_cols_corr = 1
  this.sup = 5
  this.correction_detaillee = false
  this.correction_detaillee_disponible = true
  this.type_exercice = 'IEP'
  this.nouvelle_version = function (numeroExercice) {
    this.liste_questions = [] // Liste de questions
    this.liste_corrections = [] // Liste de questions corrigées
    let texte = ''
    let texte_corr = ''
    const celluleAlea = function (rang) {
      const lettre = lettre_depuis_chiffre(randint(1, rang))
      const chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    const noms = choisit_lettres_differentes(5, 'QO', true) // on choisit 5 lettres, les 4 premières sont les sommets, la 5e est le centre
    let type_de_question
    if (this.sup < 5) type_de_question = parseInt(this.sup)
    else type_de_question = randint(1, 4)
    const nom = `${noms[0] + noms[1] + noms[2] + noms[3]}`
    const objets_enonce = []
    const objets_correction = []
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
    const c2 = segment(B, C)
    const c3 = segment(C, D)
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

    switch (type_de_question) {
      case 1: // deux côtés consécutifs
        this.consigne = `Construire le parallélogramme $${nom}$.`
        texte_corr = 'Plusieurs constructions sont possibles :<br>'
        if (this.correction_detaillee) {
          texte_corr += `- En utilisant l'égalité des longueurs : $${noms[0] + noms[1]}=${noms[3] + noms[2]}$ et $${noms[2] + noms[1]}=${noms[3] + noms[0]}$.<br>`
          texte_corr += `- En traçant la parallèle à $(${noms[0] + noms[1]})$ passant par $${noms[3]}$ et la parallèle à $(${noms[3] + noms[0]})$ passant par $${noms[1]}$.<br>`
          texte_corr += '- En utilisant la propriété des diagonales qui se coupent en leur milieu.<br>'
          texte_corr += 'Nous avons choisi la première méthode qui nous semble la plus efficace ici.<br>'
        } else {
          texte_corr += `En voici une utilisant l'égalité des longueurs : $${noms[0] + noms[1]}=${noms[3] + noms[2]}$ et $${noms[2] + noms[1]}=${noms[3] + noms[0]}$.<br>`
        }
        texte_corr += `Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`

        c1.styleExtremites = '-|'
        c4.styleExtremites = '|-'
        P = polygoneAvecNom(D, A, B)
        objets_enonce.push(c1, c4, P[1], cible)
        objets_correction.push(p[0], p[1], cible, traceCompas(D, C, 30), traceCompas(B, C, 30), codeSegments('||', 'red', A, B, D, C), codeSegments('///', 'blue', A, D, B, C))
        animIEP.parallelogramme3sommetsConsecutifs(D, A, B, C.nom)
        break
      case 2: // trois sommets consécutifs
        this.consigne = `Construire le parallélogramme $${nom}$.`
        texte_corr = 'Plusieurs constructions sont possibles :<br>'
        if (this.correction_detaillee) {
          texte_corr += `- En utilisant l'égalité des longueurs : $${noms[0] + noms[1]}=${noms[3] + noms[2]}$ et $${noms[2] + noms[1]}=${noms[3] + noms[0]}$.<br>`
          texte_corr += `- En traçant la parallèle à $(${noms[0] + noms[1]})$ passant par $${noms[3]}$ et la parallèle à $(${noms[3] + noms[0]})$ passant par $${noms[1]}$.<br>`
          texte_corr += '- En utilisant la propriété des diagonales qui se coupent en leur milieu.<br>'
          texte_corr += 'Nous avons choisi la première méthode qui nous semble la plus efficace ici.<br>'
        } else {
          texte_corr += `En voici une utilisant l'égalité des longueurs : $${noms[0] + noms[1]}=${noms[3] + noms[2]}$ et $${noms[2] + noms[1]}=${noms[3] + noms[0]}$.<br>`
        }
        texte_corr += `Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible.<br>`
        P = polygoneAvecNom(D, A, B)
        animIEP.pointCreer(D, D.nom, 0)
        animIEP.pointCreer(A, A.nom, 0)
        animIEP.pointCreer(B, B.nom, 0)
        animIEP.regleSegment(D, A)
        animIEP.regleSegment(A, B)
        animIEP.regleMasquer(0)
        animIEP.crayonMasquer(0)
        animIEP.parallelogramme3sommetsConsecutifs(D, A, B, C.nom)
        objets_enonce.push(tracePoint(A, B, D), P[1], cible)
        objets_correction.push(p[0], p[1], cible, traceCompas(D, C, 30), traceCompas(B, C, 30), codeSegments('||', 'red', A, B, D, C), codeSegments('///', 'blue', A, D, B, C))

        break
      case 3: // deux sommmets consécutifs plus le centre
        this.consigne = `Construire le parallélogramme $${nom}$ de centre $${noms[4]}$.`
        texte_corr += `O est le centre de symétrie du parallélogramme $${nom}$.<br>`
        if (this.correction_detaillee) {
          texte_corr += `Le point $${noms[3]}$ est le symétrique du point $${noms[1]}$ par rapport à $${noms[4]}$.<br>`
          texte_corr += `Le point $${noms[2]}$ est le symétrique du point $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
        }
        texte_corr += `Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible 1.<br>`
        texte_corr += `Le point $${noms[3]}$ se trouve dans la case ${cellule2} de la cible 2.<br>`
        P = polygoneAvecNom(O, A, B)
        animIEP.parallelogramme2sommetsConsecutifsCentre(A, B, O)
        objets_enonce.push(tracePoint(A, B, O), P[1], cible, cible2)
        objets_correction.push(p[0], p[1], labelPoint(O), cible, cible2, d1, d2, d3, d4, codeSegments('||', 'red', A, O, O, C), codeSegments('|||', 'blue', B, O, O, D))

        break
      case 4: // Un angle formé par deux demi-droites et le centre
        this.consigne = `Construire le parallélogramme $${nom}$ de centre ${noms[4]}.`
        texte += `Le point $${noms[3]}$ est sur la demi-droite $[${noms[0]}x)$ et le point $${noms[1]}$ est sur la demi-droite $[${noms[0]}y)$.<br>`
        if (this.correction_detaillee) {
          texte_corr += `Le point $${noms[2]}$ est le symétrique du point $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
          texte_corr += `La symétrique de la droite $(${noms[0] + noms[1]})$ par rapport à $${noms[4]}$ est la droite passant par $${noms[2]}$ parallèle à $(${noms[0] + noms[1]})$.<br>`
          texte_corr += `La symétrique de la droite $(${noms[0] + noms[3]})$ par rapport à $${noms[4]}$ est la droite passant par $${noms[2]}$ parallèle à $(${noms[0] + noms[3]})$.<br>`
        }
        texte_corr += `Le point $${noms[2]}$ se trouve dans la case ${cellule} de la cible 1.<br>`
        texte_corr += `Le point $${noms[3]}$ se trouve dans la case ${cellule2} de la cible 2.<br>`
        animIEP.regleZoom(200)
        animIEP.equerreZoom(200)
        animIEP.parallelogrammeAngleCentre(D, A, B, O)
        objets_enonce.push(dd1, dd2, tracePoint(O), labelPoint(O, A), texteParPoint('x', pointIntersectionCC(cercleCentrePoint(A, D), cercle(D, 0.5), 1)), texteParPoint('y', similitude(B, A, 4, 1.3)), cible, cible2, cible3)
        objets_correction.push(dd1, dd2, dd3, dd4, p[0], p[1], tracePoint(O), labelPoint(O), cible, cible2, cible3, d1, d3, codeSegments('||', 'red', A, O, O, C))

        break
    }
    texte += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.5 }, objets_enonce)
    texte_corr += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.5 }, objets_correction)
    texte_corr += animIEP.htmlBouton(numeroExercice)
    this.liste_questions.push(texte)
    this.liste_corrections.push(texte_corr)
    liste_de_question_to_contenu(this)
  }
  this.besoin_formulaire_numerique = ['Type de questions', 5, '1 : Deux côtés consécutifs\n2 : Trois sommets consécutifs\n3 : Deux sommets consécutifs et le centre\n4 : Un angle et le centre\n5 : Une des configuration au hasard']
  // this.besoin_formulaire2_case_a_cocher = ["Avec des points de part et d'autre"];
}
