/* eslint-disable camelcase */
import { mathalea2d, codageAngleDroit, codeSegments, pointAdistance, polygoneAvecNom, point, translation, vecteur, rotation, similitude, afficheLongueurSegment } from '../../modules/2d.js'
import Exercice from '../ClasseExercice.js'
import { liste_de_question_to_contenu, randint, tex_nombre, creerNomDePolygone, calcul } from '../../modules/outils.js'

export const titre = 'Périmètres et aires carrés, rectangles et triangles rectangles'

/**
 * Un carré, un rectangle et un triangle rectangle sont tracés.
 *
 * Il faut calculer les aires et périmètres.
 *
 * Pas de version LaTeX
 * @Auteur Rémi Angot
 * Référence 6M11-1
 */
export default function Perimetre_ou_aire_de_carres_rectangles_triangles () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Calculer le périmètre et l'aire des 3 figures suivantes"
  this.spacing = 2
  this.nb_cols = 1
  this.nb_cols_corr = 1

  // eslint-disable-next-line no-undef
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 2)
  this.nb_questions = 1
  this.nb_questions_modifiable = false

  this.nouvelle_version = function (numero_de_l_exercice) {
    let texte = ''; let texte_corr = ''
    const nom = creerNomDePolygone(11, 'Q')
    this.liste_questions = []
    this.liste_corrections = [] // Liste de questions corrigées
    const c = randint(2, 6)
    const L = randint(2, 5)
    const l = randint(2, 5, L)
    const a = randint(2, 5)
    const b = randint(2, 5)
    const c2 = Math.sqrt(a * a + b * b)
    const pIJK = calcul(a + b + c2, 1)
    const A = point(0, 0, nom[0])
    const B = rotation(point(c, 0), A, randint(-15, 15), nom[1])
    const C = rotation(A, B, -90, nom[2])
    const D = rotation(B, A, 90, nom[3])
    const carre = polygoneAvecNom(A, B, C, D)
    const E = point(8, 0, nom[4])
    const F = pointAdistance(E, L, randint(-15, 15), nom[5])
    const G = similitude(E, F, -90, l / L, nom[6])
    const H = translation(G, vecteur(F, E), nom[7])
    const rectangle = polygoneAvecNom(E, F, G, H)
    const I = point(15, 0, nom[8])
    const J = pointAdistance(I, a, randint(-25, 25), nom[9])
    const K = similitude(I, J, -90, b / a, nom[10])
    const triangle = polygoneAvecNom(I, J, K)
    texte = mathalea2d({ xmin: -2, xmax: 22, ymin: -3, ymax: 7, pixelsParCm: 20, scale: 0.75, mainlevee: false },
      carre, codageAngleDroit(A, B, C), codageAngleDroit(A, D, C), codageAngleDroit(D, C, B), codageAngleDroit(B, A, D), codeSegments('//', 'blue', [A, B, C, D, A]), afficheLongueurSegment(B, A),
      rectangle, codageAngleDroit(E, F, G), codageAngleDroit(F, G, H), codageAngleDroit(G, H, E), codageAngleDroit(H, E, F), codeSegments('/', 'red', E, F, G, H), codeSegments('||', 'blue', F, G, H, E), afficheLongueurSegment(F, E), afficheLongueurSegment(G, F),
      triangle, codageAngleDroit(I, J, K), afficheLongueurSegment(J, I), afficheLongueurSegment(K, J), afficheLongueurSegment(I, K)
    )

    texte_corr = `$\\mathcal{P}_{${nom[0] + nom[1] + nom[2] + nom[3]}}=${c}~\\text{cm}+${c}~\\text{cm}+${c}~\\text{cm}+${c}~\\text{cm}=${4 * c
      }~\\text{cm}$`
    texte_corr += `<br>$\\mathcal{A}_{${nom[0] + nom[1] + nom[2] + nom[3]}}=${c}~\\text{cm}\\times${c}~\\text{cm}=${c * c
      }~\\text{cm}^2$`
    texte_corr += `<br>$\\mathcal{P}_{${nom[4] + nom[5] + nom[6] + nom[7]}}=${L}~\\text{cm}+${l}~\\text{cm}+${L}~\\text{cm}+${l}~\\text{cm}=${2 * L + 2 * l
      }~\\text{cm}$`
    texte_corr += `<br>$\\mathcal{A}_{${nom[4] + nom[5] + nom[6] + nom[7]}}=${L}~\\text{cm}\\times${l}~\\text{cm}=${L * l
      }~\\text{cm}^2$`
    texte_corr += `<br>$\\mathcal{P}_{${nom[8] + nom[9] + nom[10]}}=${a}~\\text{cm}+${b}~\\text{cm}+${tex_nombre(
      c2.toFixed(1)
    )}~\\text{cm}=${tex_nombre(pIJK)}~\\text{cm}$`
    texte_corr += `<br>$\\mathcal{A}_{${nom[8] + nom[9] + nom[10]}}=${a}~\\text{cm}\\times${b}~\\text{cm}\\div2=${tex_nombre(
      calcul((a * b) / 2)
    )}~\\text{cm}^2$`

    this.liste_questions.push(texte)
    this.liste_corrections.push(texte_corr)
    liste_de_question_to_contenu(this)
  }

  // this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Périmètres\n\
  // 2 : Aires\n3 : Périmètres et aires"];
}
