import { Figure } from './Figure';
import { loadJson } from './load';
const figure = new Figure();
const body = document.querySelector('body');
const texteLatex = document.createElement('pre');
const btnLatex = document.createElement('button');
btnLatex.innerHTML = 'Obtenir LaTeX';
btnLatex.addEventListener('click', () => {
    texteLatex.innerHTML = figure.latex;
});
if (body) {
    body.appendChild(figure.svg);
    body.appendChild(btnLatex);
    body.appendChild(texteLatex);
}
figure.svg.style.margin = 'auto';
figure.svg.style.display = 'block';
figure.svg.style.border = 'solid';
const save = { "3": { "className": "Point", "arguments": [-5.033333333333333, 0.43333333333333357], "thickness": 3, "color": "blue" }, "7": { "className": "Point", "arguments": [1.5, 0.2333333333333334], "thickness": 3, "color": "blue" }, "11": { "className": "Point", "arguments": [6.433333333333334, 2.8], "thickness": 3, "color": "blue" }, "15": { "className": "Segment", "arguments": [3, 7], "color": "black", "thickness": 1, "dashed": false }, "16": { "className": "CircleCenterPoint", "arguments": [3, 11], "thickness": 1, "color": "black" }, "18": { "className": "Point", "arguments": [100, 100], "thickness": 3, "color": "blue" }, "21": { "className": "CircleCenterRadius", "arguments": [7, 2], "thickness": 1, "color": "black" }, "23": { "className": "Point", "arguments": [100, 100], "thickness": 3, "color": "blue" } };
loadJson(save, figure);
//# sourceMappingURL=main.js.map