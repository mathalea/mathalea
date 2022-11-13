import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, texteEnCouleur, ecritureParentheseSiNegatif, randint, choice, calcul } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Reconnaître des vecteurs colinéaires (V/F)'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '30/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = '2ba42'
export const ref = 'can2G12'
export default function VecteursColineairesVF () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    let ux, uy, vx, vy, k
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr, monQcm

    switch (choice([1, 2, 3, 4, 5])) { //
      case 1 :
        ux = calcul(randint(-3, 3, 0) * 2)
        uy = calcul(randint(-3, 3, [0, ux / 2]) * 2)
        k = calcul(choice([0.5, 1.5, 3, 2.5, 3.5]) * choice([-1, 1]))
        vx = k * ux
        vy = k * uy
        texte = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}\\begin{pmatrix}${ux} \\\\ ${uy} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}${vx} \\\\ ${vy} \\end{pmatrix}$<br>
        Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.canEnonce = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}(${ux}\\;;\\; ${uy})$ et $\\overrightarrow{v}(${vx}\\;;\\;${vy})$.<br>

        Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.autoCorrection[0] = {
          enonce: texte,
          propositions: [
            {
              texte: 'V',
              statut: ux * vy === uy * vx
            },
            {
              texte: 'F',
              statut: ux === 50
            }
          ],
          options: { ordered: true }
        }
        monQcm = propositionsQcm(this, 0)
        texte += monQcm.texte

        texteCorr = monQcm.texteCorr + `<br>Deux vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$
        sont colinéaires si et seulement si leur déterminant det($\\overrightarrow{u};\\overrightarrow{v})=0$.<br>
        Si  $\\overrightarrow{u}\\begin{pmatrix}x_{\\overrightarrow{u}} \\\\ x_{\\overrightarrow{v}} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}x_{\\overrightarrow{v}} \\\\ y_{\\overrightarrow{v}} \\end{pmatrix}$, 
        alors det$(\\overrightarrow{u};\\overrightarrow{v})=x_{\\overrightarrow{u}}\\times y_{\\overrightarrow{v}}-y_{\\overrightarrow{u}}\\times x_{\\overrightarrow{v}}$.<br>
        En utilisant les données de l'énoncé, on obtient : <br>
        det$(\\overrightarrow{u};\\overrightarrow{v})=
        ${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}-${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}
        =${ux * vy}-${ecritureParentheseSiNegatif(uy * vx)}=${ux * vy - uy * vx}
        $.<br>
        On en déduit que les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires.`
        texteCorr += texteEnCouleur(`
        <br> Mentalement : <br>
        On compare les produits en croix : $${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}=${ux * vy}$ et $${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}=${uy * vx}$.<br>
        Ils sont égaux, donc les vecteurs sont colinéaires.
         `)
        break
      case 2 :
        vx = calcul(randint(-3, 3, 0) * 2)
        vy = calcul(randint(-3, 3, [0, vx / 2]) * 2)
        k = calcul(choice([0.5, 1.5, 3, 2.5, 3.5]) * choice([-1, 1]))
        ux = k * vx
        uy = k * vy
        texte = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}\\begin{pmatrix}${ux} \\\\ ${uy} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}${vx} \\\\ ${vy} \\end{pmatrix}$<br>
        Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.canEnonce = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}(${ux}\\;;\\; ${uy})$ et $\\overrightarrow{v}(${vx}\\;;\\;${vy})$.<br>
       
        Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.autoCorrection[0] = {
          enonce: texte,
          propositions: [
            {
              texte: 'V',
              statut: ux * vy === uy * vx
            },
            {
              texte: 'F',
              statut: ux === 50
            }
          ],
          options: { ordered: true }
        }
        monQcm = propositionsQcm(this, 0)
        texte += monQcm.texte

        texteCorr = monQcm.texteCorr + `<br>Deux vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$
        sont colinéaires si et seulement si leur déterminant det($\\overrightarrow{u};\\overrightarrow{v})=0$.<br>
        Si  $\\overrightarrow{u}\\begin{pmatrix}x_{\\overrightarrow{u}} \\\\ x_{\\overrightarrow{v}} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}x_{\\overrightarrow{v}} \\\\ y_{\\overrightarrow{v}} \\end{pmatrix}$, 
        alors det$(\\overrightarrow{u};\\overrightarrow{v})=x_{\\overrightarrow{u}}\\times y_{\\overrightarrow{v}}-y_{\\overrightarrow{u}}\\times x_{\\overrightarrow{v}}$.<br>
        En utilisant les données de l'énoncé, on obtient : <br>
        det$(\\overrightarrow{u};\\overrightarrow{v})=
        ${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}-${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}
        =${ux * vy}-${ecritureParentheseSiNegatif(uy * vx)}=${ux * vy - uy * vx}
        $.<br>
        On en déduit que les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires.`
        texteCorr += texteEnCouleur(`
        <br> Mentalement : <br>
        On compare les produits en croix : $${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}=${ux * vy}$ et $${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}=${uy * vx}$.<br>
        Ils sont égaux, donc les vecteurs sont colinéaires.
         `)
        break

      case 3 :
        ux = calcul(randint(-3, 3, 0) * 2)
        uy = calcul(randint(-3, 3, [0, ux / 2]) * 2)
        k = calcul(choice([0.5, 1.5, 3, 2.5, 3.5]) * choice([-1, 1]))
        vx = k * ux
        vy = k * uy + 1
        texte = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}\\begin{pmatrix}${ux} \\\\ ${uy} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}${vx} \\\\ ${vy} \\end{pmatrix}$<br>
            Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.canEnonce = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}(${ux}\\;;\\; ${uy})$ et $\\overrightarrow{v}(${vx}\\;;\\;${vy})$.<br>

            Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.autoCorrection[0] = {
          enonce: texte,
          propositions: [
            {
              texte: 'V',
              statut: ux === 100
            },
            {
              texte: 'F',
              statut: ux * vy !== uy * vx
            }
          ],
          options: { ordered: true }
        }
        monQcm = propositionsQcm(this, 0)
        texte += monQcm.texte

        texteCorr = monQcm.texteCorr + `<br>Deux vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$
            sont colinéaires si et seulement si leur déterminant det($\\overrightarrow{u};\\overrightarrow{v})=0$.<br>
            Si  $\\overrightarrow{u}\\begin{pmatrix}x_{\\overrightarrow{u}} \\\\ x_{\\overrightarrow{v}} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}x_{\\overrightarrow{v}} \\\\ y_{\\overrightarrow{v}} \\end{pmatrix}$, 
            alors det$(\\overrightarrow{u};\\overrightarrow{v})=x_{\\overrightarrow{u}}\\times y_{\\overrightarrow{v}}-y_{\\overrightarrow{u}}\\times x_{\\overrightarrow{v}}$.<br>
            En utilisant les données de l'énoncé, on obtient : <br>
            det$(\\overrightarrow{u};\\overrightarrow{v})=
            ${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}-${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}
            =${ux * vy}-${ecritureParentheseSiNegatif(uy * vx)}=${ux * vy - uy * vx}
            $.<br>
            On en déduit que les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ ne sont pas colinéaires.`
        texteCorr += texteEnCouleur(`
            <br> Mentalement : <br>
            On compare les produits en croix : $${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}=${ux * vy}$ et $${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}=${uy * vx}$.<br>
            Ils ne sont pas égaux, donc les vecteurs ne sont pas colinéaires.
             `)
        break

      case 4 :
        ux = calcul(randint(-3, 3, 0) * 2)
        uy = calcul(randint(-3, 3, [0, ux / 2]) * 2)
        k = calcul(choice([0.5, 1.5, 3, 2.5, 3.5]) * choice([-1, 1]))
        vx = k * ux + 1
        vy = k * uy
        texte = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}\\begin{pmatrix}${ux} \\\\ ${uy} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}${vx} \\\\ ${vy} \\end{pmatrix}$<br>
            Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.canEnonce = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}(${ux}\\;;\\; ${uy})$ et $\\overrightarrow{v}(${vx}\\;;\\;${vy})$.<br>

            Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.autoCorrection[0] = {
          enonce: texte,
          propositions: [
            {
              texte: 'V',
              statut: ux === 100
            },
            {
              texte: 'F',
              statut: ux * vy !== uy * vx
            }
          ],
          options: { ordered: true }
        }
        monQcm = propositionsQcm(this, 0)
        texte += monQcm.texte

        texteCorr = monQcm.texteCorr + `<br>Deux vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$
            sont colinéaires si et seulement si leur déterminant det($\\overrightarrow{u};\\overrightarrow{v})=0$.<br>
            Si  $\\overrightarrow{u}\\begin{pmatrix}x_{\\overrightarrow{u}} \\\\ x_{\\overrightarrow{v}} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}x_{\\overrightarrow{v}} \\\\ y_{\\overrightarrow{v}} \\end{pmatrix}$, 
            alors det$(\\overrightarrow{u};\\overrightarrow{v})=x_{\\overrightarrow{u}}\\times y_{\\overrightarrow{v}}-y_{\\overrightarrow{u}}\\times x_{\\overrightarrow{v}}$.<br>
            En utilisant les données de l'énoncé, on obtient : <br>
            det$(\\overrightarrow{u};\\overrightarrow{v})=
            ${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}-${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}
            =${ux * vy}-${ecritureParentheseSiNegatif(uy * vx)}=${ux * vy - uy * vx}
            $.<br>
            On en déduit que les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ ne sont pas colinéaires.`
        texteCorr += texteEnCouleur(`
            <br> Mentalement : <br>
            On compare les produits en croix : $${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}=${ux * vy}$ et $${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}=${uy * vx}$.<br>
            Ils ne sont pas égaux, donc les vecteurs ne sont pas colinéaires.
             `)
        break
      case 5 :
        ux = calcul(randint(-3, 3, 0) * 2)
        uy = calcul(randint(-3, 3, [0, ux / 2]) * 2)
        k = calcul(choice([0.5, 1.5, 3, 2.5, 3.5]) * choice([-1, 1]))
        vx = k * ux
        vy = k * uy * (-1)
        texte = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}\\begin{pmatrix}${ux} \\\\ ${uy} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}${vx} \\\\ ${vy} \\end{pmatrix}$<br>
            Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.canEnonce = `Dans un repère, on considère les vecteurs $\\overrightarrow{u}(${ux}\\;;\\; ${uy})$ et $\\overrightarrow{v}(${vx}\\;;\\;${vy})$.<br>
        
            Les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ sont colinéaires. `
        this.autoCorrection[0] = {
          enonce: texte,
          propositions: [
            {
              texte: 'V',
              statut: ux === 100
            },
            {
              texte: 'F',
              statut: ux * vy !== uy * vx
            }
          ],
          options: { ordered: true }
        }
        monQcm = propositionsQcm(this, 0)
        texte += monQcm.texte

        texteCorr = monQcm.texteCorr + `<br>Deux vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$
            sont colinéaires si et seulement si leur déterminant det($\\overrightarrow{u};\\overrightarrow{v})=0$.<br>
            Si  $\\overrightarrow{u}\\begin{pmatrix}x_{\\overrightarrow{u}} \\\\ x_{\\overrightarrow{v}} \\end{pmatrix}$ et $\\overrightarrow{v}\\begin{pmatrix}x_{\\overrightarrow{v}} \\\\ y_{\\overrightarrow{v}} \\end{pmatrix}$, 
            alors det$(\\overrightarrow{u};\\overrightarrow{v})=x_{\\overrightarrow{u}}\\times y_{\\overrightarrow{v}}-y_{\\overrightarrow{u}}\\times x_{\\overrightarrow{v}}$.<br>
            En utilisant les données de l'énoncé, on obtient : <br>
            det$(\\overrightarrow{u};\\overrightarrow{v})=
            ${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}-${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}
            =${ux * vy}-${ecritureParentheseSiNegatif(uy * vx)}=${ux * vy - uy * vx}
            $.<br>
            On en déduit que les vecteurs $\\overrightarrow{u}$ et $\\overrightarrow{v}$ ne sont pas colinéaires.`
        texteCorr += texteEnCouleur(`
            <br> Mentalement : <br>
            On compare les produits en croix : $${ecritureParentheseSiNegatif(ux)}\\times ${ecritureParentheseSiNegatif(vy)}=${ux * vy}$ et $${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vx)}=${uy * vx}$.<br>
            Ils ne sont pas égaux, donc les vecteurs ne sont pas colinéaires.
             `)
        break
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
    this.canREponseACompleter = monQcm.texte
  }
}
