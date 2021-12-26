const fs = require('fs')
const dictionnaire = JSON.parse(fs.readFileSync('src/js/modules/dictionnaireCrpe.json', 'utf8'))
let html = '<div>'
for (const key in dictionnaire) {
  html += `\n\t<a>${key}</a><br>`
}
html += '\n</div>'
console.log(html)
