import Exercice_Thales from '../3e/3G20-2.js'

// 4G30-1
export default function Thales_4eme() {
  //Dans cette version, pas de configuration papillon reservée aux 3èmes.
  Exercice_Thales.call(this);
  this.titre = "Calculer des longueurs avec la propriété de Thalès (MG32)";
  this.quatrieme = true;
  sortie_html ? this.spacing = 2 : this.spacing = 1;
}
