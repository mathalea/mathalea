// Exercices de 6ème déclinés en cycle3
function Ecrire_entiers_cycle3(){
    Ecrire_nombres_entiers.call(this)
    this.sup=1
    this.sup2=0
}
function Division_cycle3(){
    Divisions_euclidiennes.call(this)
    this.sup=0
}
function Exercice_tables_d_additions_cycle3() {
    Exercice_tables_d_additions.call(this,10)
}
function Exercice_labyrinthe_multiplesCM() {
    Exercice_labyrinthe_multiples.call(this)
    this.niveau='CM'
  }