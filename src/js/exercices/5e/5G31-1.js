import Constructibilite_des_triangles from './_Constructibilite_des_triangles.js';

export const titre = 'Constructibilité des triangles via les angles'

/**
 * Vocabulaire des triangles 
 * 5G31-1
 * @author Sébastien Lozano
 */
export default function Constructibilite_des_triangles_angles() {
	this.beta = ``;// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
	this.exo = this.beta + `5G31-1`;
	this.titre = titre;
	Constructibilite_des_triangles.call(this);
};

