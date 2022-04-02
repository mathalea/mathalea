export function arrondi(nombre, precision = 10) {
    try {
        return (Math.round(nombre * 10 ** precision) / 10 ** precision);
    }
    catch (error) {
        return NaN;
    }
}
//# sourceMappingURL=round.js.map