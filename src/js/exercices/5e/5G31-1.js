import ConstructibiliteDesTriangles from './_Constructibilite_des_triangles.js'

export const titre = 'Constructibilité des triangles via les angles'

/**
 * Vocabulaire des triangles
 * 5G31-1
 * @author Sébastien Lozano
 */
export const uuid = 'bcbe1'
export const ref = '5G31-1'
export default function ConstructibiliteDesTrianglesAngles () {
  this.beta = ''// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
  this.exo = this.beta + '5G31-1'
  this.titre = titre
  ConstructibiliteDesTriangles.call(this)
};
