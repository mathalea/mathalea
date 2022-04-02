export function randint(min, max, listeAEviter = []) {
    try {
        const range = max - min;
        let rand = Math.floor(Math.random() * (range + 1));
        if (typeof listeAEviter === 'number') {
            listeAEviter = [listeAEviter];
        }
        if (listeAEviter.length > 0) {
            while (listeAEviter.indexOf(min + rand) !== -1) {
                rand = Math.floor(Math.random() * (range + 1));
            }
        }
        return min + rand;
    }
    catch (error) {
        return NaN;
    }
}
//# sourceMappingURL=random.js.map