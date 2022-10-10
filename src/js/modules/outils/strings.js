/**
* Créé un string aléatoire
*
* strRandom({
*  includeUpperCase: true,
*  includeNumbers: true,
*  length: 5,
*  startsWithLowerCase: true
* });
*
* // renvoie par exemple : "iL0v3"
*
* @Source https://www.equinode.com/blog/article/generer-une-chaine-de-caracteres-aleatoire-avec-javascript
*/
export function strRandom (o) {
  let a = 10
  const b = 'abcdefghijklmnopqrstuvwxyz'
  let c = ''
  let d = 0
  let e = '' + b
  if (o) {
    if (o.startsWithLowerCase) {
      c = b[Math.floor(Math.random() * b.length)]
      d = 1
    }
    if (o.length) {
      a = o.length
    }
    if (o.includeUpperCase) {
      e += b.toUpperCase()
    }
    if (o.includeNumbers) {
      e += '1234567890'
    }
  }
  for (; d < a; d++) {
    c += e[Math.floor(Math.random() * e.length)]
  }
  return c
}
/**
* Mélange les lettres d'un string
*
* @Example
* motMelange = shuffleLettres (mot)
* @Source https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
export function shuffleLettres (txt) {
  const array = txt.split('')
  return shuffle(array).join('')
}
/**
 * Créé un string de nbsommets caractères dans l'ordre alphabétique et en majuscule qui ne soit pas dans la liste donnée en 2e argument
 * @param {integer} nbsommets
 * @param {string[]} listeAEviter
 * @author Rémi Angot
 * Ajout des while pour s'assurer de bien avoir des lettres majuscules le 08/05/2022 par Guillaume Valmont
 **/
export function creerNomDePolygone (nbsommets, listeAEviter = []) {
  let premiersommet = randint(65, 90 - nbsommets)
  let polygone = ''
  if (listeAEviter === undefined) listeAEviter = []
  for (let i = 0; i < nbsommets; i++) {
    let augmentation = i
    while (premiersommet + augmentation > 90) augmentation -= 26
    while (premiersommet + augmentation < 65) augmentation += 26
    polygone += String.fromCharCode(premiersommet + augmentation)
  }

  if (listeAEviter.length < 26 - nbsommets - 1) { // On évite la liste à éviter si elle n'est pas trop grosse sinon on n'en tient pas compte
    let cpt = 0
    while (possedeUnCaractereInterdit(polygone, listeAEviter) && cpt < 20) {
      polygone = ''
      premiersommet = randint(65, 90 - nbsommets)
      for (let i = 0; i < nbsommets; i++) {
        polygone += String.fromCharCode(premiersommet + i)
      }
      cpt++ // Au bout de 20 essais on laisse tomber la liste à éviter
    }
  } else {
    console.log('Trop de questions donc plusieurs polygones peuvent avoir le même nom')
  }
  return polygone
}

/**
  * Vérifie dans un texte si un de ses caractères appartient à une liste à éviter
  * @author Rémi Angot
  */
export function possedeUnCaractereInterdit (texte, listeAEviter) {
  let result = false
  for (const motAeviter of listeAEviter) {
    for (let i = 0; i < motAeviter.length; i++) {
      if (texte.indexOf(motAeviter[i]) > -1) {
        result = true
      }
    }
  }
  return result
}
