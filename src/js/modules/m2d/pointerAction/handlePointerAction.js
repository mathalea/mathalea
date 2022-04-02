import { actionStartDrag as startDrag } from './drag';
import { newPoint } from './newPoint';
import { newSegment, actionNewSegmentMessage } from './newSegment';
import { setOptions } from './setOptions';
import { newPerpendicular, actionNewPerpendicularMessage } from './newPerpendicular';
import { newLine, actionNewLineMessage } from './newLine';
import { actionNewPerpendicularBissectorMessage, newPerpendicularBissector } from './newPerpendicularBissector';
import { actionNewAngleBissectorMessage, newAngleBissector } from './newAngleBissector';
import { newIntersection } from './newIntersection';
import { actionNewCirclePointMessage, newCirclePoint } from './newCirclePoint';
import { actionNewPolygonMessage, newPolygon } from './newPolygon';
import { actionNewCircleRadiusMessage, newCircleRadius } from './newCircleRadius';
import { actionErasetMessage, erase } from './erase';
import { actionNewRayMessage, newRay } from './newRay';
import { actionNewVectorMessage, newVector } from './newVector';
import { actionNewParallelMessage, newParallel } from './newParallel';
import { actionHideMessage, hide } from './hide';
import { newPointByCoords } from './newPointByCoords';
import { newReflectAboutPoint, actionNewReflectAboutPointMessage } from './newReflectAboutPoint';
import { newRotation, actionNewRotationMessage } from './newRotation';
import { newCircleByDistanceAndCenter, actionCircleByDistanceAndCenterMessage } from './newCircleByDistanceAndCenter';
import { actionNewMiddleMessage, newMiddle } from './newMiddle';
import { actionNewPointOnMessage, newPointOn } from './newPointOn';
import { Point } from '../elements/points/Point';
import { Circle } from '../elements/lines/Circle';
import { Line } from '../elements/lines/Line';
import { Polygon } from '../elements/lines/Polygon';
import { TextByPosition } from '../elements/texts/TextByPosition';
import { actionNewReflectionOverLineMessage, newReflectionOverLine } from './newReflectionOverLine';
import { actionNewHomothetieMessage, newHomothetie } from './newHomothetie';
import { newMarkAngle, actionNewMarkAngleMessage } from './newMarkAngle';
import { actionNewTranslationBy2PointseMessage, newTranslationBy2Points } from './newTranslationBy2Points';
import { actionNewRegularPolygonMessage, newRegularPolygon } from './newRegularPolygon';
export function handlePointerAction(figure, event) {
    const [pointerX, pointerY] = figure.getPointerCoord(event);
    const clickedElements = getClickedElements(figure, pointerX, pointerY);
    if (figure.pointerAction === 'freePoint')
        newPoint(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'pointOn')
        newPointOn(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'pointByCoords')
        newPointByCoords(figure);
    else if (figure.pointerAction === 'middle')
        newMiddle(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'drag')
        startDrag(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'erase')
        erase(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'hide')
        hide(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'segment')
        newSegment(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'line')
        newLine(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'ray')
        newRay(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'vector')
        newVector(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'circlePoint')
        newCirclePoint(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'circleRadius')
        newCircleRadius(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'circleByDistanceAndCenter')
        newCircleByDistanceAndCenter(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'perpendicularBissector')
        newPerpendicularBissector(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'angleBissector')
        newAngleBissector(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'perpendicular')
        newPerpendicular(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'parallel')
        newParallel(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'intersectionLL')
        newIntersection(figure, pointerX, pointerY);
    else if (figure.pointerAction === 'polygon')
        newPolygon(clickedElements.points);
    else if (figure.pointerAction === 'regularPolygon')
        newRegularPolygon(clickedElements.points);
    else if (figure.pointerAction === 'reflectAboutPoint')
        newReflectAboutPoint(clickedElements);
    else if (figure.pointerAction === 'rotation')
        newRotation(clickedElements);
    else if (figure.pointerAction === 'setOptions')
        setOptions(figure, pointerX, pointerY, figure.pointerSetOptions);
    else if (figure.pointerAction === 'reflectionOverLine')
        newReflectionOverLine(clickedElements);
    else if (figure.pointerAction === 'homothetie')
        newHomothetie(clickedElements);
    else if (figure.pointerAction === 'translation')
        newTranslationBy2Points(clickedElements);
    else if (figure.pointerAction === 'markAngle')
        newMarkAngle(clickedElements.points);
}
export function initMessageAction(figure, pointerAction) {
    if (pointerAction === 'drag')
        figure.displayMessage('');
    else if (pointerAction === 'erase')
        actionErasetMessage(figure);
    else if (pointerAction === 'hide')
        actionHideMessage(figure);
    else if (pointerAction === 'freePoint')
        figure.displayMessage('Cliquer pour créer un nouveau point');
    else if (pointerAction === 'pointOn')
        actionNewPointOnMessage(figure);
    else if (pointerAction === 'middle')
        actionNewMiddleMessage(figure);
    else if (pointerAction === 'segment')
        actionNewSegmentMessage(figure);
    else if (pointerAction === 'circlePoint')
        actionNewCirclePointMessage(figure);
    else if (pointerAction === 'circleRadius')
        actionNewCircleRadiusMessage(figure);
    else if (pointerAction === 'circleByDistanceAndCenter')
        actionCircleByDistanceAndCenterMessage(figure);
    else if (pointerAction === 'perpendicularBissector')
        actionNewPerpendicularBissectorMessage(figure);
    else if (pointerAction === 'angleBissector')
        actionNewAngleBissectorMessage(figure);
    else if (pointerAction === 'line')
        actionNewLineMessage(figure);
    else if (pointerAction === 'ray')
        actionNewRayMessage(figure);
    else if (pointerAction === 'vector')
        actionNewVectorMessage(figure);
    else if (pointerAction === 'perpendicular')
        actionNewPerpendicularMessage(figure);
    else if (pointerAction === 'parallel')
        actionNewParallelMessage(figure);
    else if (pointerAction === 'intersectionLL')
        figure.displayMessage('Cliquer sur l\'élément sur lequel appliquer le nouveau style');
    else if (pointerAction === 'polygon')
        actionNewPolygonMessage(figure);
    else if (pointerAction === 'regularPolygon')
        actionNewRegularPolygonMessage(figure);
    else if (pointerAction === 'reflectAboutPoint')
        actionNewReflectAboutPointMessage(figure);
    else if (pointerAction === 'rotation')
        actionNewRotationMessage(figure);
    else if (pointerAction === 'reflectionOverLine')
        actionNewReflectionOverLineMessage(figure);
    else if (pointerAction === 'homothetie')
        actionNewHomothetieMessage(figure);
    else if (pointerAction === 'translation')
        actionNewTranslationBy2PointseMessage(figure);
    else if (pointerAction === 'markAngle')
        actionNewMarkAngleMessage(figure);
}
function getClickedElements(figure, pointerX, pointerY, distanceInPixels = 15) {
    const points = [];
    const texts = [];
    const lines = [];
    const polygons = [];
    const circles = [];
    for (const e of figure.set) {
        if (e.isVisible && (e instanceof Line || e instanceof Circle || e instanceof Point || e instanceof Polygon || e instanceof TextByPosition) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < distanceInPixels) {
            if (e instanceof Point)
                points.push(e);
            if (e instanceof TextByPosition)
                texts.push(e);
            if (e instanceof Line)
                lines.push(e);
            if (e instanceof Polygon)
                polygons.push(e);
            if (e instanceof Circle)
                circles.push(e);
        }
    }
    return { points, texts, lines, polygons, circles, all: [...points, ...texts, ...polygons, ...lines, ...circles], figure };
}
//# sourceMappingURL=handlePointerAction.js.map