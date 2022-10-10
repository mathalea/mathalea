
/**
* Renvoie un tableau (somme des termes positifs, somme des termes négatifs)
* @author Rémi Angot
*/
export function sommeDesTermesParSigne (liste) {
  let sommeDesPositifs = 0; let sommeDesNegatifs = 0
  for (let i = 0; i < liste.length; i++) {
    if (liste[i] > 0) {
      sommeDesPositifs += liste[i]
    } else {
      sommeDesNegatifs += liste[i]
    }
  }
  return [sommeDesPositifs, sommeDesNegatifs]
}
/**
 * prend une liste de nombres relatifs et la retourne avec les positifs au début et les négatifs à la fin.
 * @param {array} liste la liste de nombres à trier
 */
export function triePositifsNegatifs (liste) {
  const positifs = []
  const negatifs = []
  for (let i = 0; i < liste.length; i++) {
    if (liste[i] > 0) positifs.push(liste[i])
    else negatifs.push(liste[i])
  }
  return positifs.concat(negatifs)
}
/**
* Donne une liste d'entiers relatifs dont on connait la somme.
* @example > listeEntiersSommeConnue(4,10,-2)
* < [1,-2,6,5]
* @param {int} nbElements Nombre d'éléments de la liste
* @param {int} total Somme des éléments de la liste (peut être un nombre négatif)
* @param {int} [valMin = 1] Valeur minimale de chaque élément (peut être un nombre négatif)
* @return {Array} Liste d'entiers relatifs
* @author Frédéric PIOU
*/
export function listeEntiersSommeConnue (nbElements, total, valMin = 1) {
  const liste = []
  liste.push(randint(valMin, total - (nbElements - 1) * valMin))
  for (let j = 1; j < nbElements - 1; j++) {
    liste.push(randint(liste[j - 1] + valMin, total - (nbElements - j - 1) * valMin))
  }
  liste.push(total)
  for (let j = nbElements - 1; j > 0; j--) {
    liste[j] = liste[j] - liste[j - 1]
  }
  return liste
}

/**
 * @class
 * @classdesc Classe Relatif - Méthodes utiles sur les relatifs
 * @param {...any} relatifs est un paramètre du reste
 * @author Sébastien Lozano
 */
export function Relatif (...relatifs) {
  // 'use strict'; pas de use strict avec un paramètre du reste
  this.relatifs = relatifs

  /**
     * * Récupère le signe de chaque relatif déclaré dans le paramètre du reste relatifs,
     * * Si 0 fait partie des relatifs on renvoie une erreur
     * @return {array} Renvoie un tableau de -1 ou 1
     * @example getSigneNumber(-1,-2,8,-9,4) renvoie [-1,-1,1,-1,1]
     */
  function getSigneNumber () {
    const signes = []
    try {
      // port du string interdit !
      relatifs.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
        if (element === 0) {
          throw new RangeError(`${element} a été exclu des valeurs possibles.`)
        }
      })
      // Quoi faire sans nombres ?
      if (relatifs.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      relatifs.forEach(function (element) {
        if (element < 0) {
          signes.push(-1)
        }
        if (element > 0) {
          signes.push(1)
        }
      })
    } catch (err) {
      console.log(err.message)
      console.log(err.stack)
    }
    return signes
  }

  /**
     * * Récupère le signe de chaque relatif déclaré dans le paramètre du reste relatifs
     * @return {array} Renvoie un tableau de strings valant 'négatif' ou 'positif'
     * @example getSigneNumber(-1,-2,8,-9,4) renvoie le tableau de strings [négatif,négatif,positif,négatif,positif]
    */
  function getSigneString () {
    const signesString = []
    const signes = getSigneNumber()
    signes.forEach(function (element) {
      if (element === -1) {
        signesString.push('négatif')
      }
      if (element === 1) {
        signesString.push('positif')
      }
    })
    return signesString
  }

  /**
     *
     * @param  {...any} n une liste de deux ou plus de nombres relatifs
     * @return {number} Renvoie le signe du produit des nombres de cette liste. 1 ou -1
     * @example getSigneProduitNumber(1,-4,-7) renvoie 1
     */

  function getSigneProduitNumber (...n) {
    let produit = 1
    try {
      // port du string interdit !
      n.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
        if (element === 0) {
          throw new RangeError(`${element} a été exclu des valeurs possibles.`)
        }
      })
      // Quoi faire sans nombres ?
      if (n.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      n.forEach(function (element) {
        produit = produit * element
      })
      if (produit < 0) {
        return -1
      }
      if (produit > 0) {
        return 1
      }
    } catch (err) {
      console.log(err.message)
      console.log(err.stack)
    }
  }

  /**
     *
     * @param  {...any} n une liste de deux ou plus de nombres relatifs
     * @return {string} Renvoie un string désignant le signe du produit des nombres de cette liste. postif1 ou négatif
     * @example getSigneProduitNumber(1,-4,-7) renvoie le string positif
     */

  function getSigneProduitString (...n) {
    const produit = getSigneProduitNumber(...n)
    if (produit === -1) {
      return 'négatif'
    }
    if (produit === 1) {
      return 'positif'
    }
  }

  /**
     *
     * @param  {...any} n une liste de deux ou plus de nombres relatifs
     * @return {string} Renvoie le nombre d'éléments négatifs des nombres de cette liste.
     * * la liste d'entiers doit être passé dans un tableau
     * @example getCardNegatifs([1,-4,-7]) renvoie 2
     * @example getCardNegatifs([4,-5,7,7,-8,-9]) renvoie 3
     */

  function getCardNegatifs ([...n]) {
    let card = 0
    try {
      // port du string interdit !
      n.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
        if (element === 0) {
          throw new RangeError(`${element} a été exclu des valeurs possibles.`)
        }
      })
      // Quoi faire sans nombres ?
      if (n.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      n.forEach(function (element) {
        if (element < 0) {
          card = card + 1
        }
      })
      return card
    } catch (err) {
      console.log(err.message)
    }
  }

  /**
     * Fonction locale
     * @param {integer} n un entier désignant le cardinal de facteurs négatifs dans un produit
     * @return un string au singulier ou au pluriel
     * @example orth_facteurs_negatifs(0) ou orth_facteurs_negatifs(1) renvoie 'facteur negatif'
     * @example orth_facteurs_negatifs(7) renvoie 'facteurs negatifs'
     */
  function orthographeFacteursNegatifs (n) {
    if (n >= 2) {
      return 'facteurs négatifs'
    } else {
      return 'facteur négatif'
    }
  }

  /**
     * @param  {...any} n une liste de deux ou plus de nombres relatifs qui constituent les facteurs du produit
     * @return {string} Renvoie la règle qui permet de justifier le signe d'un produit de relatifs adaptée à la liste passée en paramètre.
     * @example setRegleProduitFacteurs([1,-2,-8,5]) renvoie le string 'Il y a 2 facteurs négatifs, le nombre de facteurs négatifs est pair donc le produit est positif.'
     */

  function setRegleSigneProduit (...n) {
    try {
      // port du string interdit !
      n.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
      })
      // Quoi faire sans nombres ?
      if (n.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      if (n.length === 2) {
        if (getCardNegatifs(n) % 2 === 0) {
          return 'Les deux facteurs ont le même signe donc le produit est positif.'
        } else {
          return 'Les deux facteurs ont un signe différent donc le produit est négatif.'
        }
      } else if (n.length > 2) {
        if (getCardNegatifs(n) % 2 === 0) {
          if (getCardNegatifs(n) === 0) {
            return 'Tous les facteurs sont positifs donc le produit est positif.'
          } else {
            return `Il y a ${getCardNegatifs(n)} ${orthographeFacteursNegatifs(getCardNegatifs(n))}, le nombre de facteurs négatifs est pair donc le produit est positif.`
          }
        } else {
          return `Il y a ${getCardNegatifs(n)} ${orthographeFacteursNegatifs(getCardNegatifs(n))}, le nombre de facteurs négatifs est impair donc le produit est négatif.`
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  /**
   *
   * @param  {...any} num une liste de deux ou plus de nombres relatifs qui constituent les facteurs du numérateur
   * @param  {...any} den une liste de deux ou plus de nombres relatifs qui constituent les facteurs du dénominateur
   * @return {string} Renvoie la règle qui permet de justifier le signe d'un produit de relatifs adaptée à la liste passée en paramètre.
   * @example setRegleProduitQuotient([1,-2],[-8,5]) renvoie le string 'La somme des facteurs négatifs du numérateur et des facteurs négatifs du dénominateur vaut 2, ce nombre est pair donc le quotient est positif.'
   */

  function setRegleSigneQuotient (...n) {
    try {
      // port du string interdit !
      n.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
      })
      // Quoi faire sans nombres ?
      if (n.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      if (n.length === 2) {
        if (getCardNegatifs(n) % 2 === 0) {
          return 'Le numérateur et le dénominateur ont le même signe donc le quotient est positif.'
        } else {
          return 'Les numérateur et le dénominateur ont un signe différent donc le quotient est négatif.'
        }
      } else if (n.length > 2) {
        if (getCardNegatifs(n) % 2 === 0) {
          if (getCardNegatifs(n) === 0) {
            return 'Tous les facteurs du numérateur et tous les facteurs du dénominateur sont positifs donc le quotient est positif.'
          } else {
            // return `La somme du nombre de facteurs négatifs du numérateur et du nombre de facteurs négatifs du dénominateur vaut ${getCardNegatifs(n)}, ce nombre est pair donc le quotient est positif.`;
            return `Quand on compte les facteurs négatifs du numérateur et du dénominateur, on trouve ${getCardNegatifs(n)}, ce nombre est pair donc le quotient est positif.`
          }
        } else {
          // return `La somme du nombre de facteurs négatifs du numérateur et du nombre de facteurs négatifs du dénominateur vaut ${getCardNegatifs(n)}, ce nombre est impair donc le quotient est négatif.`;
          return `Quand on compte les facteurs négatifs du numérateur et du dénominateur, on trouve ${getCardNegatifs(n)}, ce nombre est impair donc le quotient est négatif.`
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  this.getSigneNumber = getSigneNumber
  this.getSigneString = getSigneString
  this.getSigneProduitNumber = getSigneProduitNumber
  this.getSigneProduitString = getSigneProduitString
  this.getCardNegatifs = getCardNegatifs
  this.setRegleSigneProduit = setRegleSigneProduit
  this.setRegleSigneQuotient = setRegleSigneQuotient
}
