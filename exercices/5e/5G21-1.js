import Constructibilite_des_triangles from './_Constructibilite_des_triangles.js'

/**
 * Vocabulaire des triangles 
 * 5G21-1
 * Mise à jour le 2021-01-25
 * @author Sébastien Lozano
 */
export default function Constructibilite_des_triangles_longueurs() {
	Constructibilite_des_triangles.call(this);
	this.beta = ``;// ici this.beta peut prendre la valeur 'beta' ou '', tous les autres this.beta sont devenus des this.debug
	this.exo = this.beta + `5G21-1`;
	this.titre = "Constructibilité des triangles via les longueurs";
};

