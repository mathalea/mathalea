import ConstructibiliteDesTriangles from './_Constructibilite_des_triangles.js'

export const titre = 'Constructibilité des triangles via les longueurs'

/**
 * Vocabulaire des triangles
 * 5G21-1
 * Mise à jour le 2021-01-25
 * @author Sébastien Lozano
 */
export const uuid = 'f789c'
export const ref = '5G21-1'
export default function ConstructibiliteDesTrianglesLongueurs () {
  this.beta = ''// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
  this.exo = this.beta + '5G21-1'
  this.titre = titre
  ConstructibiliteDesTriangles.call(this)
};
