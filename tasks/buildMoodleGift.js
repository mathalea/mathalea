const fs = require("fs")
const path = require('path')

require = require('esm')(module) // permet d'importer des fichiers avec export default dans nodejs
exercices = require("../src/js/modules/dictionnaireDesExercicesAleatoires.js").default

const mathAleaURL = 'https://coopmaths.fr/' // ne pas oublier le / final

const now = new Date()

const date = {
    // US: now.getFullYear() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0'),
    FR: now.getDate().toString().padStart(2, '0') + '/' + (now.getMonth() + 1).toString().padStart(2, '0') + '/' + now.getFullYear()
}

let gift = `// Export de Mathalea pour Moodle au format GIFT
// Créé le ${date.FR}`

for (const [id, exercice] of Object.entries(exercices)) {
    if(exercice?.interactifReady) {
        try {
            gift += exportExerciceAsGift(id, exercice)
        } catch(e) {
            console.error(`Erreur lors de l'export de l'exercice ${id} : ${e}`)
        }
    }
}


const exportPath = path.resolve(__dirname, '..', 'src', 'assets', 'gift', `mathalea.gift.txt`) 

fs.writeFileSync(exportPath, gift)

console.log(`Export de Mathalea pour Moodle au format GIFT terminé.`)
console.log(`Le fichier est disponible dans le dossier assets/gift/mathalea.gift.txt`)

function exportExerciceAsGift(id, exercice) {
    let c = s => s.replace(/[~=#{}:]/g, '\\$&'); // échappement des caratères spéciaux pour les GIFT

    const categorie = 'Mathalea/' + exercice.url.match(/^\/exercices\/(.+)\/.+$/)[1]
    const titre = `Mathalea - ${exercice.titre} (${exercice.name})`
    return `

$CATEGORY: ${categorie}

:: ${c(titre)} ::
<script src\\="${c(mathAleaURL)}assets/externalJs/moodle.js" type\\="module"></script>
<mathalea-moodle ex\\="${c(exercice.name)}" />
{
    =%100%100|*=%90%90|*=%80%80|*=%75%75|*=%66.66667%66.666|*=%60%60|*=%50%50|*=%40%40|*=%33.33333%33.333|*=%30%30|*=%25%25|*=%20%20|*=%16.66667%16.666|*=%14.28571%14.2857|*=%12.5%12.5|*=%11.11111%11.111|*=%10%10|*=%5%5|*=%0%0|*
    #### <script src\\="${c(mathAleaURL)}assets/externalJs/moodle.js" type\\="module"></script>
    <mathalea-moodle ex\\="${c(id)}" correction />
}`

    // Remarque en vrac : Il est théoriquement possible que le titre et le nom du fichier soit différent
}