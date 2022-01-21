
const monObjet = {
  a: 2,
  methode: function () {
    return 3
  }
}

/* const monObjet2 = { a: 67 }
// Ici ça ne fonctionne pas
monObjet2.prototype.maMethode = function () {
  return 'Lolo'
} */

const Objet3 = function (a) {
  this.a = a
  this.autreMethode = function (params) {
    return params
  }
}
Objet3.prototype.maMethode = function () {
  return 'Lolo'
}
// Objet3.autreMethode(9)
const monInstance1 = new Objet3(12)
monInstance1.maMethode()
monInstance1.autreMethode()

class Objet4 {
  b = 2 // Variable d'instance
    static c = 3 // Variable de class
  constructor (param) {
    
    this.a = param // Variable d'instance
  }

  methode () { // Méthode d'instance
    return "Je suis la methode d'instance définie dans la class"
  }

  static methodeStatic () {// Méthode de class
    return 'Je suis la methode (static) définie dans la class'
  }
}

Objet4.prototype.autreMethodeDinstance = function () {
    return 'Je suis une autre méthode d\'instance définie à l\'extérieur de la class grâce au prototype'
}

Objet4.autreMethodeStatic = function () {
    return 'Je suis une autre méthode statique définie à l\'extérieur de la class directement sur l\'objet'
}

const monInstance2 = new Objet4(1)
console.log(`monInstance2 : ${monInstance2}`)
console.log(`monInstance2.a : ${monInstance2.a}`)
console.log(`monInstance2.b : ${monInstance2.b}`)
console.log(`monInstance2.c : ${monInstance2.c}`) // -> undefined
console.log(`monInstance2.methode() : ${monInstance2.methode()}`)
console.log(`monInstance2.autreMethodeDinstance() : ${monInstance2.autreMethodeDinstance()}`)
// console.log(`monInstance2.methodeStatic() : ${monInstance2.methodeStatic()}`) // Uncaught TypeError: monInstance2.methodeStatic is not a function
// console.log(`monInstance2.autreMethodeStatic() : ${monInstance2.autreMethodeStatic()}`) // -> Uncaught TypeError: monInstance2.autreMethodeStatic is not a function


console.log(`Objet4 : ${Objet4}`)
console.log(`Objet4.a : ${Objet4.a}`) // -> undefined
console.log(`Objet4.b : ${Objet4.b}`) // -> undefined
console.log(`Objet4.c : ${Objet4.c}`)
// console.log(`Objet4.methode() : ${Objet4.methode()}`) // -> Uncaught TypeError: Objet4.methode is not a function
// console.log(`Objet4.autreMethodeDinstance() : ${Objet4.autreMethodeDinstance()}`) // -> Uncaught TypeError: Objet4.autreMethodeDinstance is not a function
console.log(`Objet4.methodeStatic() : ${Objet4.methodeStatic()}`)
console.log(`Objet4.autreMethodeStatic() : ${Objet4.autreMethodeStatic()}`) 

console.log('Arrêt')
