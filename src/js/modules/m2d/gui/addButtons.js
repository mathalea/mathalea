export function addButtons(figure) {
    const body = document.querySelector('body');
    const btnDrag = document.createElement('button');
    btnDrag.innerHTML = 'Drag';
    const btnNewPoint = document.createElement('button');
    btnNewPoint.innerHTML = 'Nouveau point';
    const btnNewSegment = document.createElement('button');
    btnNewSegment.innerHTML = 'Segment';
    const btnNewPerpendicular = document.createElement('button');
    btnNewPerpendicular.innerHTML = 'Perpendicular';
    const btnZoomPlus = document.createElement('button');
    btnZoomPlus.innerHTML = '+';
    const btnZoomMinus = document.createElement('button');
    btnZoomMinus.innerHTML = '-';
    const btnRed = document.createElement('button');
    btnRed.style.backgroundColor = 'red';
    btnRed.style.width = '20px';
    btnRed.style.height = '20px';
    const btnGreen = document.createElement('button');
    btnGreen.style.backgroundColor = 'green';
    btnGreen.style.width = '20px';
    btnGreen.style.height = '20px';
    if (body) {
        body.appendChild(btnDrag);
        body.appendChild(btnNewPoint);
        body.appendChild(btnNewSegment);
        body.appendChild(btnNewPerpendicular);
        body.appendChild(btnRed);
        body.appendChild(btnGreen);
        body.appendChild(btnZoomMinus);
        body.appendChild(btnZoomPlus);
    }
    btnDrag.addEventListener('click', () => {
        figure.pointerAction = 'drag';
    });
    btnNewPoint.addEventListener('click', () => {
        figure.pointerAction = 'pointLibre';
    });
    btnNewSegment.addEventListener('click', () => {
        figure.pointerAction = 'segment';
    });
    btnNewPerpendicular.addEventListener('click', () => {
        figure.pointerAction = 'droitePerpendiculaire';
    });
    btnZoomPlus.addEventListener('click', () => {
        figure.pixelsPerUnit += 10;
        for (const e of figure.set) {
            e.update();
        }
    });
    btnRed.addEventListener('click', () => {
        figure.displayMessage('Cliquer sur l\'élément que vous souhaitez mettre en couleur');
        figure.pointerAction = 'setColor';
        figure.pointerSetOptions.color = 'red';
    });
    btnGreen.addEventListener('click', () => {
        figure.displayMessage('Cliquer sur l\'élément que vous souhaitez mettre en couleur');
        figure.pointerAction = 'setColor';
        figure.pointerSetOptions.color = 'green';
    });
}
//# sourceMappingURL=addButtons.js.map