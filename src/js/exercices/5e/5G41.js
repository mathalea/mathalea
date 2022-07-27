import Exercice from '../Exercice.js'
import { texNombre, choice, texteGras, listeQuestionsToContenu, randint, arrondi, calcul, choisitLettresDifferentes, lettreDepuisChiffre, texNombre, miseEnEvidence } from '../../modules/outils.js'
import { cercle, demiDroite, droite, cercleCentrePoint, pointIntersectionDD, codageSegments, texteParPosition, pointAdistance, codageAngleDroit, afficheMesureAngle, afficheLongueurSegment, point, labelPoint, similitude, polygoneAvecNom, tracePoint, segment, traceCompas, dansLaCibleCarree, cibleCarree, rotation, longueur, mathalea2d, milieu, pointIntersectionCC } from '../../modules/2d.js'

export const titre = 'Construire des quadrilatères particuliers'

/**
 * Construction de quadrilatères avec dispositif d'auto-correction aléatoire
 * Ref 4G41
 * @author Jean-Claude Lhote
 * Publié le 3/02/2020
 */
export default function ConstructionsParallelogrammesParticuliers () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.correctionDetaillee = false
  this.correctionDetailleeDisponible = true
  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let texte = ''; let texteCorr = ''
    const celluleAlea = function (rang) {
      const lettre = lettreDepuisChiffre(randint(1, rang))
      const chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    const noms = choisitLettresDifferentes(5, 'QO', true) // on choisit 5 lettres, les 4 premières sont les sommets, la 5e est le centre
    const nom = `$${noms[0] + noms[1] + noms[2] + noms[3]}$`
    let A, B, C, D, O, d1, d2, c1, c2, c3, c4, alpha, tri, t1, t2, t3, t4, t5, dd1, dd2
    const objetsEnonce = []; const objetsCorrection = []
    let typesDeQuestionsDisponibles
    let xm, ym, xM, yM
    if (this.sup === 1) typesDeQuestionsDisponibles = [1, 2, 3]
    else if (this.sup === 2) typesDeQuestionsDisponibles = [4, 5, 6, 7]
    else typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7]

    const typeDeQuestion = choice(typesDeQuestionsDisponibles)
    switch (typeDeQuestion) {
      case 1:
        A = point(0, 0, noms[0])
        c1 = randint(20, 25) * 2 // AB
        c4 = calcul(randint(20, 30, c1 / 2) / 5) // AD
        c1 = calcul(c1 / 10)
        d1 = 5 * (Math.abs(c4 - c1) + 2)
        d2 = 5 * (c1 + c4 - 3)
        d1 = calcul(randint(Math.min(d1, d2), Math.max(d1, d2)) / 5) // BD
        B = pointAdistance(A, c1, randint(-30, 30), noms[1])
        D = pointIntersectionCC(cercle(A, c4), cercle(B, d1), noms[3])
        O = milieu(B, D, noms[4])
        C = rotation(A, O, 180, noms[2])
        texte = `${nom} est un parallélogramme tel que `
        texte += `$${noms[0] + noms[1]}=${texNombre(c1)}$ cm, $${noms[0] + noms[3]}=${texNombre(c4)}$ cm, $${noms[1] + noms[3]}=${texNombre(d1)}$ cm.<br>`
        texte += `Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
        objetsEnonce.push(tracePoint(A, B), labelPoint(A, B))
        if (this.correctionDetaillee) {
          texteCorr += `Comme ${nom} est un parallélogramme, ses diagonales se coupent en leur milieu.<br>`
          texteCorr += `Soit $${noms[4]}$ le milieu de $[${noms[1] + noms[3]}]$. $${noms[2]}$ est le symétrique de $${noms[0]}$ par rapport à $${noms[4]}$.`
          texteCorr += `Construisons tout d'abord le triangle $${noms[0] + noms[1] + noms[3]}$.<br>Puis $${noms[4]}$, le milieu de $[${noms[1] + noms[3]}]$ et enfin le point $${noms[2]}$.<br>`
        }
        if (longueur(B, D) !== longueur(A, C)) {
          texteCorr += `Comme $${noms[0] + noms[3]}\\ne ${noms[0] + noms[1]}$ et que $${noms[0] + noms[2]}\\ne ${noms[3] + noms[1]}$, le paralélogramme ${nom} n'est ni un losange, ni un rectangle.<br>`
          texteCorr += `${nom} ${texteGras('est un simple paraléllogramme')}.<br>`
        } else {
          texteCorr += `Comme $$${noms[0] + noms[2]} = ${noms[3] + noms[1]}$ et que $${noms[0] + noms[3]}\\ne ${noms[0] + noms[1]}$, le paralélogramme ${nom} est un rectangle.<br>`
        }
        objetsCorrection.push(afficheLongueurSegment(A, B, 'black', -0.5), afficheLongueurSegment(A, D, 'black', 0.5))
        t1 = traceCompas(A, D, 15)
        t2 = traceCompas(B, D, 15)
        t3 = traceCompas(O, C, 20)
        tri = polygoneAvecNom(A, B, D)
        xm = Math.min(A.x, B.x, D.x) - 0.8
        ym = Math.min(A.y, B.y, D.y) - 0.8
        xM = Math.max(A.x, B.x, D.x) + 0.8
        yM = Math.max(A.y, B.y, D.y) + 0.8
        break
      case 2:
        O = point(0, 0, noms[4])
        c1 = randint(25, 35) * 2 // AC
        c4 = calcul(randint((c1 + 4) / 2, 45) / 5) // BD
        c1 = calcul(c1 / 10)
        alpha = randint(100, 130)

        A = pointAdistance(O, c1 / 2, randint(-30, 30), noms[0])
        B = similitude(A, O, alpha, c4 / c1, noms[1])
        D = rotation(B, O, 180, noms[3])
        C = rotation(A, O, 180, noms[2])
        texte = `${nom} est un parallélogramme de centre $${noms[4]}$ tel que `
        texte += `$${noms[0] + noms[2]}=${texNombre(c1)}$ cm, $${noms[1] + noms[3]}=${texNombre(c4)}$ cm et $\\widehat{${noms[0] + noms[4] + noms[1]}}=${alpha}\\degree$  dans le sens inverse des aiguilles d'une montre.<br>`
        texte += `Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
        objetsEnonce.push(tracePoint(A, O), labelPoint(A, O))
        if (this.correctionDetaillee) {
          texteCorr += `Comme ${nom} est un parallélogramme, ses diagonales se coupent en leur milieu $${noms[4]}$.<br>`
          texteCorr += `$${noms[2]}$ est le symétrique de $${noms[0]}$ par rapport à $${noms[4]}$. La distance ${noms[4] + noms[1]} est égale à la moitié de ${noms[1] + noms[3]}.<br>`
          texteCorr += `Construisons tout d'abord le point $${noms[2]}$ symétrique de $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
          texteCorr += `Construisons ensuite un angle $\\widehat{${noms[0] + noms[4] + 'x'}}$ de mesure $${alpha}\\degree$ dans le sens inverse des aiguilles d'une montre.<br>`
          texteCorr += `Puis le point $${noms[1]}$ sur $[${noms[4]}x)$ et son symétrique $${noms[3]}$ par rapport à $${noms[4]}$ situés tous les deux à $${texNombre(arrondi(c4 / 2))}$ cm de $${noms[4]}$.<br>`
        }
        xm = Math.min(A.x, B.x, C.x) - 0.8
        ym = Math.min(A.y, B.y, C.y) - 0.8
        xM = Math.max(A.x, B.x, C.x) + 0.8
        yM = Math.max(A.y, B.y, C.y) + 0.8
        break
      case 3:
        A = point(0, 0, noms[0])
        c1 = randint(26, 40) * 2 // AB
        c4 = calcul(randint(15, 25) / 5) // AD
        c1 = calcul(c1 / 10)

        B = pointAdistance(A, c1, randint(-30, 30), noms[1])
        D = similitude(B, A, 90, c4 / c1, noms[3])
        O = milieu(B, D, noms[4])
        C = rotation(A, O, 180, noms[2])
        texte = `${nom} est un parallélogramme tel que `
        texte += `$${noms[0] + noms[1]}=${texNombre(c1)}$ cm, $${noms[0] + noms[3]}=${texNombre(c4)}$ cm, $${noms[1] + noms[3]}=${noms[0] + noms[2]}$.<br>`
        texte += `Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
        objetsEnonce.push(tracePoint(A, B), labelPoint(A, B))

        texteCorr += `Comme ${nom} est un parallélogramme, ses diagonales se coupent en leur milieu et comme de plus elles ont la même longueur, ${texteGras(nom)} ${texteGras(' est donc un rectangle')}.<br>`
        if (this.correctionDetaillee) {
          texteCorr += `Soit $${noms[4]}$ le milieu de $[${noms[1] + noms[3]}]$. $${noms[2]}$ est le symétrique de $${noms[0]}$ par rapport à $${noms[4]}$.<br>`
          texteCorr += `Construisons tout d'abord le triangle $${noms[0] + noms[1] + noms[3]}$ puis $${noms[4]}$ au milieu de $[${noms[1] + noms[3]}]$.<br>`
          texteCorr += `Les quatre sommets de ${nom} sont sur le cercle de centre $${noms[4]}$ passant par $${noms[0]}$. $[${noms[0]}${noms[2]}]$ et $[${noms[1]}${noms[3]}]$ sont des diamètres de ce cercle.<br>`
        }
        objetsCorrection.push(afficheLongueurSegment(A, B, 'black', -0.5), afficheLongueurSegment(A, D, 'black', 0.5))
        t1 = cercleCentrePoint(O, A)
        t1.color = 'gray'
        t1.opacite = 0.5
        t3 = traceCompas(O, C, 20)
        tri = polygoneAvecNom(A, B, D)
        xm = Math.min(A.x, B.x, D.x) - 0.8
        ym = Math.min(A.y, B.y, D.y) - 0.8
        xM = Math.max(A.x, B.x, D.x) + 0.8
        yM = Math.max(A.y, B.y, D.y) + 0.8

        break
      case 4:
        A = point(0, 0, noms[0])
        c1 = randint(15, 30) // AB
        c4 = calcul(randint(15, 20, c1) / 5) // BD
        c1 = calcul(c1 / 5)

        B = pointAdistance(A, c1, randint(-30, 30), noms[1])
        D = pointIntersectionCC(cercle(A, c1), cercle(B, c4), noms[3])
        O = milieu(B, D, noms[4])
        C = rotation(A, O, 180, noms[2])

        texte = `${nom} est un parallélogramme tel que `
        texte += `$${noms[0] + noms[1]}=${texNombre(c1)}$ cm, $${noms[1] + noms[3]}=${texNombre(c4)}$ cm, $[${noms[0] + noms[2]}]\\perp [${noms[1] + noms[3]}]$.<br>`
        texte += `Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
        objetsEnonce.push(tracePoint(A, B), labelPoint(A, B))

        texteCorr += `Comme ${nom} est un parallélogramme dont les diagonales $[${noms[0] + noms[2]}]$ et $[${noms[1] + noms[3]}]$ sont perpendiculaires, ${nom}${texteGras(' est un losange')}.<br>`
        if (this.correctionDetaillee) {
          texteCorr += `Il en résulte que le triangle $${noms[0] + noms[1] + noms[3]}$ est isoclèle en $${noms[0]}$.<br>`
          texteCorr += `Construisons tout d'abord le triangle $${noms[0] + noms[1] + noms[3]}$ puis $${noms[4]}$, le milieu de $[${noms[1] + noms[3]}]$ et enfin le point $${noms[2]}$.<br>`
        }
        objetsCorrection.push(afficheLongueurSegment(A, B, 'black', -0.5), afficheLongueurSegment(A, D, 'black', 0.5))
        t1 = traceCompas(A, D, 15)
        t2 = traceCompas(B, D, 15)
        t3 = traceCompas(O, C, 20)
        tri = polygoneAvecNom(A, B, D)
        xm = Math.min(A.x, B.x, D.x) - 0.8
        ym = Math.min(A.y, B.y, D.y) - 0.8
        xM = Math.max(A.x, B.x, D.x) + 0.8
        yM = Math.max(A.y, B.y, D.y) + 0.8
        break
      case 5:
        A = point(0, 0, noms[0])
        c1 = randint(20, 35) * 2 // AC
        c4 = calcul(randint((c1 - 4) / 2, 35) / 5) // AD
        c1 = calcul(c1 / 10)
        alpha = randint(95, 120)
        B = pointAdistance(A, c1, randint(-30, 30), noms[1])
        D = similitude(B, A, alpha, c4 / c1, noms[3])
        O = milieu(B, D, noms[4])
        C = rotation(A, O, 180, noms[2])
        texte = `${nom} est un parallélogramme de centre $${noms[4]}$ tel que `
        texte += `$${noms[0] + noms[1]}=${texNombre(c1)}$ cm, $${noms[0] + noms[3]}=${texNombre(c4)}$ cm et $\\widehat{${noms[1] + noms[2] + noms[3]}}=${alpha}\\degree$  dans le sens inverse des aiguilles d'une montre.<br>`
        texte += `Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
        objetsEnonce.push(tracePoint(A, B), labelPoint(A, B))
        if (this.correctionDetaillee) {
          texteCorr += `Comme ${nom} est un parallélogramme, ses angles opposés ont la même mesure, donc $\\widehat{${noms[3] + noms[0] + noms[1]}}=${alpha}\\degree$.<br>`
          texteCorr += `Construisons tout d'abord le triangle $${noms[0] + noms[1] + noms[3]}$.<br>`
          texteCorr += `Puis le point $${noms[2]}$ symétrique  de $${noms[0]}$ par rapport à $${noms[4]}$, milieu de $[${noms[1] + noms[3]}]$.<br>`
        }
        texteCorr += `Comme ${nom} est un parallélogramme qui ne possède pas d'angle droit et que ses côtés consécutifs sont de longueurs différentes, ${texteGras('c\'est un simple parallélogramme')}.<br>`
        t1 = traceCompas(A, D, 15)
        t2 = traceCompas(A, B, 15)
        t3 = traceCompas(O, C, 20)
        tri = polygoneAvecNom(A, B, D)
        xm = Math.min(A.x, B.x, D.x) - 0.8
        ym = Math.min(A.y, B.y, D.y) - 0.8
        xM = Math.max(A.x, B.x, D.x) + 0.8
        yM = Math.max(A.y, B.y, D.y) + 0.8
        break
      case 6:
        A = point(0, 0, noms[0])
        c1 = randint(20, 35) * 2 // AC
        c2 = randint(15, 20) * 2 // AO
        c3 = calcul(c1 + randint(5, 10) * 2) - c2 // BO
        c1 = calcul(c1 / 10)
        c2 = calcul(c2 / 10)
        c3 = calcul(c3 / 10)

        B = pointAdistance(A, c1, randint(-30, 30), noms[1])
        O = pointIntersectionCC(cercle(A, c2), cercle(B, c3), noms[4])
        C = rotation(A, O, 180, noms[2])
        D = rotation(B, O, 180, noms[3])
        texte = `${nom} est un parallélogramme de centre $${noms[4]}$ tel que `
        texte += `$${noms[0] + noms[1]}=${texNombre(c1)}$ cm, $${noms[4] + noms[2]}=${texNombre(c2)}$ cm et $${noms[4] + noms[3]}=${texNombre(c3)}$ cm.<br>`
        texte += `Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
        objetsEnonce.push(tracePoint(A, B), labelPoint(A, B))
        if (this.correctionDetaillee) {
          texteCorr += `Comme ${nom} est un parallélogramme, ses diagonales se coupent en leur milieu $${noms[4]}$.<br>`
          texteCorr += `On en déduit que $${noms[0] + noms[4]}=${noms[4] + noms[2]}=${texNombre(c2)}$ cm et que $${noms[1] + noms[4]}=${noms[4] + noms[3]}=${texNombre(c3)}$ cm.<br>`
          texteCorr += `Construisons tout d'abord le triangle $${noms[0] + noms[1] + noms[4]}$.<br>`
          texteCorr += `Puis les points $${noms[2]}$ et $${noms[3]}$ symétriques respectifs de $${noms[0]}$ et $${noms[1]}$ par rapport à $${noms[4]}$.<br>`
        }
        if (c1 * c1 !== (c2 * c2 + c3 * c3)) {
          texteCorr += `le triangle $${noms[0] + noms[1] + noms[4]}$ n'est pas un triangle rectangle, donc les diagonales ne sont pas perpendiculaires.<br>`
          if (c2 === c3) texteCorr += `Les diagonales ont la même longueur. ${nom} est un parallélogramme dont les diagonales sont de même longueur, ${texteGras('c\'est donc un rectangle')}.<br>`
          else texteCorr += `De plus elles n'ont pas la même longueur, donc ${nom} ${texteGras('est un simple parallélogramme')}.<br>`
        } else {
          texteCorr += `Le triangle $${noms[0] + noms[1] + noms[4]}$ est un triangle rectangle, donc les diagonales sont perpendiculaires.<br>`
          if (c2 === c3) texteCorr += `de plus les diagonales ont même longueur. ${nom} est un parallélogramme dont les diagonales sont perpendiculaires et de même longueur, ${texteGras('c\'est donc un carré')}.<br>`
        }
        t1 = traceCompas(A, O, 20)
        t2 = traceCompas(B, O, 20)
        t3 = traceCompas(O, C, 30)
        t4 = traceCompas(O, D, 30)

        tri = polygoneAvecNom(A, B, O)
        xm = Math.min(A.x, B.x, O.x) - 0.8
        ym = Math.min(A.y, B.y, O.y) - 0.8
        xM = Math.max(A.x, B.x, O.x) + 0.8
        yM = Math.max(A.y, B.y, O.y) + 0.8
        break
      case 7:
        A = point(0, 0, noms[0])
        c1 = calcul(randint(30, 40) / 5) // AC
        c2 = randint(25, 40)// angle OAB
        c3 = randint(30, 45, c2) // angle OCB

        C = pointAdistance(A, c1, randint(-30, 30), noms[2])
        O = milieu(A, C, noms[4])
        B = rotation(C, A, c2)
        dd1 = droite(A, B)
        D = rotation(A, C, -c3)
        dd2 = droite(C, D)
        B = pointIntersectionDD(dd1, dd2, noms[1])
        D = rotation(B, O, 180, noms[3])
        texte = `${nom} est un parallélogramme de centre $${noms[4]}$ tel que `
        texte += `$${noms[0] + noms[2]}=${texNombre(c1)}$ cm.<br>$\\widehat{${noms[4] + noms[0] + noms[1]}}=${c2}\\degree$  dans le sens inverse des aiguilles d'une montre.<br>$\\widehat{${noms[4] + noms[2] + noms[1]}}=${c3}\\degree$  dans le sens des aiguilles d'une montre.<br>`
        texte += `Construire le parallélogramme ${nom} et préciser si c'est un paraléllogramme particulier.<br>`
        objetsEnonce.push(tracePoint(A, C), labelPoint(A, C))
        if (this.correctionDetaillee) {
          texteCorr += `Comme ${nom} est un parallélogramme, ses côtés opposés sont parallèles.<br>`
          texteCorr += `La diagonale $[${noms[0]}${noms[2]}]$ forme des angles $\\widehat{${noms[4] + noms[0] + noms[1]}}$ et $\\widehat{${noms[4] + noms[2] + noms[3]}}$ alternes-internes égaux.<br>`
          texteCorr += `De même les angles $\\widehat{${noms[4] + noms[0] + noms[3]}}$ et $\\widehat{${noms[4] + noms[2] + noms[1]}}$ sont alternes-internes égaux eux aussi.<br>`
          texteCorr += `On en déduit que $\\widehat{${noms[4] + noms[0] + noms[3]}}=\\widehat{${noms[4] + noms[2] + noms[1]}}=${miseEnEvidence(c3, 'red')}\\degree$ et que $\\widehat{${noms[4] + noms[0] + noms[1]}}=\\widehat{${noms[4] + noms[2] + noms[3]}}=${miseEnEvidence(c2, 'blue')}\\degree$.<br>`
          texteCorr += `Construisons tout d'abord le triangle $${noms[0] + noms[1] + noms[2]}$.<br>`
          texteCorr += `Puis le points $${noms[3]}$ symétrique de $${noms[1]}$ par rapport à $${noms[4]}$.<br>`
        }

        texteCorr += `Le triangle $${noms[0] + noms[1] + noms[2]}$ n'est pas un triangle isocèle car ses angles ne sont pas égaux.<br>`
        texteCorr += `De plus dans ce triangle  l'angle $\\widehat{${noms[0] + noms[1] + noms[2]}}$ mesure $${180 - c2 - c3}\\degree$ donc ${nom} ${texteGras('est un simple parallélogramme')}.<br>`
        t1 = afficheMesureAngle(O, A, B, 'blue', 1, texNombre(c2) + '°')
        t2 = afficheMesureAngle(O, C, B, 'red', 1, texNombre(c3) + '°')
        t3 = traceCompas(O, D, 30)
        t5 = tracePoint(O)
        t5.style = '+'
        objetsCorrection.push(t1, t2)
        tri = polygoneAvecNom(A, B, C)
        xm = Math.min(A.x, B.x, C.x) - 0.8
        ym = Math.min(A.y, B.y, C.y) - 0.8
        xM = Math.max(A.x, B.x, C.x) + 0.8
        yM = Math.max(A.y, B.y, C.y) + 0.8
        break
    }
    const p = polygoneAvecNom(A, B, C, D)

    const xMin = Math.min(A.x, B.x, C.x, D.x) - 2
    const yMin = Math.min(A.y, B.y, C.y, D.y) - 2
    const xMax = Math.max(A.x, B.x, C.x, D.x) + 2
    const yMax = Math.max(A.y, B.y, C.y, D.y) + 2

    const cellule1 = celluleAlea(5)
    const cellule2 = celluleAlea(5)
    const cellule3 = celluleAlea(5)
    const result1 = dansLaCibleCarree(B.x, B.y, 5, 0.3, cellule3)
    const result2 = dansLaCibleCarree(C.x, C.y, 5, 0.3, cellule1)
    const result3 = dansLaCibleCarree(D.x, D.y, 5, 0.3, cellule2)
    const cible1 = cibleCarree({ x: result1[0], y: result1[1], rang: 5, num: '', taille: 0.4 })
    cible1.taille = 0.3
    cible1.color = 'gray'
    cible1.opacite = 0.7
    const cible2 = cibleCarree({ x: result2[0], y: result2[1], rang: 5, num: '', taille: 0.4 })
    cible2.taille = 0.3
    cible2.color = 'gray'
    cible2.opacite = 0.7
    const cible3 = cibleCarree({ x: result3[0], y: result3[1], rang: 5, num: '', taille: 0.4 })
    cible3.taille = 0.3
    cible3.color = 'gray'
    cible3.opacite = 0.7
    dd1 = segment(O, A)
    dd2 = segment(O, B)
    const dd3 = segment(O, C)
    const dd4 = segment(O, D)

    switch (typeDeQuestion) {
      case 1:
        if (this.correctionDetaillee) texteCorr += mathalea2d({ xmin: xm, ymin: ym, xmax: xM, ymax: yM, pixelsParCm: 25, scale: 1 }, objetsCorrection, t1, t2, tri[0], tri[1], afficheLongueurSegment(D, B)) + '<br>'
        objetsEnonce.push(cible3, cible2)
        objetsCorrection.push(p[0], p[1], t3)
        objetsCorrection.push(cible3, cible2, dd1, dd2, dd3, dd4, labelPoint(O), codageSegments('||', 'red', A, O, O, C), codageSegments('|||', 'blue', B, O, O, D), afficheLongueurSegment(O, B))
        break
      case 2:
        if (this.correctionDetaillee) texteCorr += mathalea2d({ xmin: xm, ymin: ym, xmax: xM, ymax: yM, pixelsParCm: 25, scale: 1 }, codageSegments('||', 'red', A, O, O, C), t3, dd1, dd3, dd2, afficheMesureAngle(A, O, B, 'black', 1, alpha + '°'), tracePoint(A, O, C), labelPoint(A, O, C), texteParPosition('x', B.x - 0.5, B.y), afficheLongueurSegment(A, O), afficheLongueurSegment(O, C)) + '<br>'
        objetsEnonce.push(cible3, cible2, cible1)
        objetsCorrection.push(p[0], p[1], t3, afficheLongueurSegment(O, D))
        objetsCorrection.push(cible3, cible2, cible1, dd1, dd2, dd3, dd4, labelPoint(O), codageSegments('||', 'red', A, O, O, C), codageSegments('|||', 'blue', B, O, O, D), afficheMesureAngle(A, O, B, 'black', 1, alpha + '°'))

        break
      case 3:
        if (this.correctionDetaillee) texteCorr += mathalea2d({ xmin: xm, ymin: ym, xmax: xM, ymax: yM, pixelsParCm: 25, scale: 1 }, objetsCorrection, tri[0], tri[1], codageAngleDroit(D, A, B)) + '<br>'
        objetsEnonce.push(cible3, cible2)
        objetsCorrection.push(p[0], p[1], t1, t3)
        objetsCorrection.push(cible3, cible2, dd1, dd2, dd3, dd4, labelPoint(O), codageSegments('||', 'red', A, O, O, C), codageSegments('||', 'red', B, O, O, D))

        break
      case 4:
        if (this.correctionDetaillee) texteCorr += mathalea2d({ xmin: xm, ymin: ym, xmax: xM, ymax: yM, pixelsParCm: 25, scale: 1 }, objetsCorrection, tri[0], tri[1], afficheLongueurSegment(D, B), t2, traceCompas(A, B, 60), traceCompas(A, D, 60)) + '<br>'
        objetsEnonce.push(cible3, cible2)
        objetsCorrection.push(p[0], p[1], t3, afficheLongueurSegment(O, B))
        objetsCorrection.push(codageAngleDroit(A, O, D), cible3, cible2, dd1, dd2, dd3, dd4, labelPoint(O), codageSegments('||', 'red', A, O, O, C), codageSegments('|||', 'blue', B, O, O, D))
        break
      case 5:
        if (this.correctionDetaillee) texteCorr += mathalea2d({ xmin: xm, ymin: ym, xmax: xM, ymax: yM, pixelsParCm: 25, scale: 1 }, tri[0], tri[1], demiDroite(A, B), demiDroite(A, D), afficheMesureAngle(B, A, D, 'black', 1, alpha + '°'), afficheLongueurSegment(A, B), afficheLongueurSegment(A, D)) + '<br>'
        objetsEnonce.push(cible3, cible2)
        objetsCorrection.push(p[0], p[1], t3)
        objetsCorrection.push(cible3, cible2, dd1, dd2, dd3, dd4, labelPoint(O), codageSegments('||', 'red', A, O, O, C), codageSegments('|||', 'blue', B, O, O, D), afficheMesureAngle(B, A, D, 'black', 1, alpha + '°'), afficheLongueurSegment(B, A), afficheLongueurSegment(A, D), afficheLongueurSegment(C, B), afficheLongueurSegment(D, C))

        break
      case 6:
        if (this.correctionDetaillee) texteCorr += mathalea2d({ xmin: xm, ymin: ym, xmax: xM, ymax: yM, pixelsParCm: 25, scale: 1 }, objetsCorrection, tri[0], tri[1], afficheLongueurSegment(B, A), afficheLongueurSegment(O, B), afficheLongueurSegment(A, O), t1, t2, t5) + '<br>'
        objetsEnonce.push(cible3, cible2)
        objetsCorrection.push(p[0], p[1], t3, t4)
        objetsCorrection.push(cible3, cible2, dd1, dd2, dd3, dd4, labelPoint(O), codageSegments('||', 'red', A, O, O, C), codageSegments('|||', 'blue', B, O, O, D))
        break
      case 7:
        if (this.correctionDetaillee) texteCorr += mathalea2d({ xmin: xm, ymin: ym, xmax: xM, ymax: yM, pixelsParCm: 25, scale: 1 }, objetsCorrection, tri[0], tri[1], afficheLongueurSegment(C, O), afficheLongueurSegment(O, A), labelPoint(O), t5, codageSegments('||', 'red', A, O, O, C)) + '<br>'
        objetsEnonce.push(cible3, cible1)
        objetsCorrection.push(p[0], p[1], t3)
        objetsCorrection.push(cible3, t1, t2, t3, cible1, dd1, dd2, dd3, dd4, labelPoint(O), codageSegments('||', 'red', A, O, O, C), codageSegments('|||', 'blue', B, O, O, D), afficheMesureAngle(O, A, D, 'red', 1, texNombre(c3) + '°'), afficheMesureAngle(O, C, D, 'blue', 1, texNombre(c2) + '°'))
        break
    }
    texte += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 25, scale: 1 }, objetsEnonce)
    texteCorr += mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 25, scale: 1 }, objetsCorrection)

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de diffculté', 3, '1 : Figures faciles\n2 : Figures plus difficiles\n3 : Mélange']
  // this.besoinFormulaire2CaseACocher = ["Avec des points de part et d'autre"];
}
