/* eslint-disable camelcase */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, ecritureNombreRelatif, texte_en_couleur_et_gras, Relatif } from '../../modules/outils.js'

export const titre = 'Signe d’un produit ou d’un quotient de nombres relatifs'

/**
 * Signe d'un produit ou d'on quotient de relatifs
 * Plusieurs niveaux 2, 3 ou 4 factieurs, un quotient de 2 nombres, 1  nombre sur un produit de deux nombres, un prooduit de 2 nombres sur un nombre, un quotient de produit de 2 nombres
 * 4C10-0 exercice parent de 4C10-1 et 4C10-2
 * 4C10-0 contient tous les cas
 * Dans ces exercices je me servais de this.beta pour faire passer l'exo de beta.html à mathalea.html
 * this.beta pouvait prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug

 * @author Sébastien Lozano
 */
export default function Signe_produit_quotient_relatifs () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Donner le signe des expressions numériques.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestionsModifiable = false
  this.sup = 1

  let type_de_questions_disponibles

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup) // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
    if (this.exo === this.beta + '4C10-1') {
      // signe d'un produit
      switch (this.sup) {
        case 1: // 2 facteurs
          type_de_questions_disponibles = [1, 1, 1]
          // this.nbQuestions = type_de_questions_disponibles.length;
          this.nbQuestions = 3
          break
        case 2: // 3 facteurs
          type_de_questions_disponibles = [2, 2, 2]
          // this.nbQuestions = type_de_questions_disponibles.length;
          this.nbQuestions = 3
          break
        case 3: // 4 facteurs
          type_de_questions_disponibles = [3, 3, 3]
          // this.nbQuestions = type_de_questions_disponibles.length;
          this.nbQuestions = 3
          break
        case 4: // Mélange
          type_de_questions_disponibles = [1, 2, 3]
          this.nbQuestions = type_de_questions_disponibles.length
          break
      }
    } else if (this.exo === this.beta + '4C10-2') {
      // signe d'un quotient
      switch (this.sup) {
        case 1: // quotient de 2 nombres
          type_de_questions_disponibles = [4, 4, 4]
          // this.nbQuestions = type_de_questions_disponibles.length;
          this.nbQuestions = 3
          break
        case 2: // quotient d'1 nombre sur un produit de 2 nombres
          type_de_questions_disponibles = [5, 5, 5]
          // this.nbQuestions = type_de_questions_disponibles.length;
          this.nbQuestions = 3
          break
        case 3: // quotient d'1 produit de 2 nombres sur 1 nombre
          type_de_questions_disponibles = [6, 6, 6]
          // this.nbQuestions = type_de_questions_disponibles.length;
          this.nbQuestions = 3
          break
        case 4: // quotient de 2 produits de 2 nombres
          type_de_questions_disponibles = [7, 7, 7]
          // this.nbQuestions = type_de_questions_disponibles.length;
          this.nbQuestions = 3
          break
        case 5: // Mélange
          type_de_questions_disponibles = [4, 5, 6, 7]
          this.nbQuestions = type_de_questions_disponibles.length
          break
      }
    } else {
      // signe d'un produit et/ou d'un quotient
      type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7]
      this.nbQuestions = type_de_questions_disponibles.length
    }

    // let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = type_de_questions_disponibles // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on ne choisit que des nombres compris entre 1 et 20
      const nbMax = 20
      // Le tableau des relatifs necessaires, il m'en faut max 4 !
      const num = new Relatif(
        randint(-1, 1, [0]) * randint(1, nbMax),
        randint(-1, 1, [0]) * randint(1, nbMax),
        randint(-1, 1, [0]) * randint(1, nbMax),
        randint(-1, 1, [0]) * randint(1, nbMax)
      )

      switch (listeTypeDeQuestions[i]) {
        case 1: // 2 facteurs
          texte = `$ ${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(num.relatifs[1])} $`
          texteCorr = `$ ${ecritureNombreRelatif(num.relatifs[0])} $ est ${num.getSigneString()[0]} et $ ${ecritureNombreRelatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}.`
          texteCorr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1]
          )}`
          texteCorr += `<br>Donc $ ${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(num.relatifs[0], num.relatifs[1])
          )}.`
          break
        case 2: // 3 facteurs
          texte = `$ ${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )} \\times ${ecritureNombreRelatif(num.relatifs[2])} $`
          texteCorr = `$ ${ecritureNombreRelatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecritureNombreRelatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}`
          texteCorr += ` et $ ${ecritureNombreRelatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`
          texteCorr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`
          texteCorr += `<br>Donc $ ${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[2]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`
          break
        case 3: // 4 facteurs
          texte = `$ ${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[2]
          )} \\times ${ecritureNombreRelatif(num.relatifs[3])} $`
          texteCorr = `$ ${ecritureNombreRelatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecritureNombreRelatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}, `
          texteCorr += `$ ${ecritureNombreRelatif(num.relatifs[2])} $ est ${num.getSigneString()[2]} et $ ${ecritureNombreRelatif(num.relatifs[3])} $ est ${num.getSigneString()[3]}.`
          texteCorr += `<br> ${num.setRegleSigneProduit(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2],
            num.relatifs[3]
          )}`
          texteCorr += `<br>Donc $ ${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[2]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[3]
          )} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2],
              num.relatifs[3]
            )
          )}.`
          break
        case 4: // quotient de 2 nombres
          texte = `$ \\dfrac{${ecritureNombreRelatif(
            num.relatifs[0]
          )}}{${ecritureNombreRelatif(num.relatifs[1])}} $`
          texteCorr = `$ ${ecritureNombreRelatif(num.relatifs[0])} $ est ${num.getSigneString()[0]} et $ ${ecritureNombreRelatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}.`
          texteCorr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1]
          )}`
          texteCorr += `<br>Donc $ \\dfrac{${ecritureNombreRelatif(
            num.relatifs[0]
          )}}{${ecritureNombreRelatif(
            num.relatifs[1]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(num.relatifs[0], num.relatifs[1])
          )}.`
          break
        case 5: // quotient d'1 nombre sur un produit de 2 nombres
          texte = `$ \\dfrac{${ecritureNombreRelatif(
            num.relatifs[0]
          )}}{${ecritureNombreRelatif(
            num.relatifs[1]
          )} \\times ${ecritureNombreRelatif(num.relatifs[2])}} $`
          texteCorr = `$ ${ecritureNombreRelatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecritureNombreRelatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}`
          texteCorr += ` et $ ${ecritureNombreRelatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`
          texteCorr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`
          texteCorr += `<br>Donc $ \\dfrac{${ecritureNombreRelatif(
            num.relatifs[0]
          )}}{${ecritureNombreRelatif(
            num.relatifs[1]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[2]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`
          break
        case 6: // quotient d'1 produit de 2 nombres sur 1 nombre
          texte = `$ \\dfrac{${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )}}{${ecritureNombreRelatif(num.relatifs[2])}} $`
          texteCorr = `$ ${ecritureNombreRelatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecritureNombreRelatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}`
          texteCorr += ` et $ ${ecritureNombreRelatif(
            num.relatifs[2]
          )} $ est ${num.getSigneString()[2]}.`
          texteCorr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2]
          )}`
          texteCorr += `<br>Donc $ \\dfrac{${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )}}{${ecritureNombreRelatif(
            num.relatifs[2]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2]
            )
          )}.`
          break
        case 7: // quotient de 2 produits de 2 nombres
          texte = `$ \\dfrac{${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )}}{${ecritureNombreRelatif(
            num.relatifs[2]
          )} \\times ${ecritureNombreRelatif(num.relatifs[3])}} $`
          texteCorr = `$ ${ecritureNombreRelatif(num.relatifs[0])} $ est ${num.getSigneString()[0]}, $ ${ecritureNombreRelatif(num.relatifs[1])} $ est ${num.getSigneString()[1]}, `
          texteCorr += `$ ${ecritureNombreRelatif(num.relatifs[2])} $ est ${num.getSigneString()[2]} et $ ${ecritureNombreRelatif(num.relatifs[3])} $ est ${num.getSigneString()[3]}.`
          texteCorr += `<br> ${num.setRegleSigneQuotient(
            num.relatifs[0],
            num.relatifs[1],
            num.relatifs[2],
            num.relatifs[3]
          )}`
          texteCorr += `<br>Donc $ \\dfrac{${ecritureNombreRelatif(
            num.relatifs[0]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[1]
          )}}{${ecritureNombreRelatif(
            num.relatifs[2]
          )} \\times ${ecritureNombreRelatif(
            num.relatifs[3]
          )}} $ est ${texte_en_couleur_et_gras(
            num.getSigneProduitString(
              num.relatifs[0],
              num.relatifs[1],
              num.relatifs[2],
              num.relatifs[3]
            )
          )}.`
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
