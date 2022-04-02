import { Measure } from './Measure';
export class RandomNumber extends Measure {
    constructor(figure, min, max, listeAEviter = []) {
        if (min > max) {
            const minTemp = min;
            min = max;
            max = minTemp;
        }
        const range = max - min;
        let rand = Math.random() * range;
        if (typeof listeAEviter === 'number') {
            listeAEviter = [listeAEviter];
        }
        if (listeAEviter.length > 0) {
            while (listeAEviter.indexOf(min + rand) !== -1) {
                rand = Math.random() * range;
            }
        }
        super(figure);
        this.listeAEviter = listeAEviter;
        this.range = range;
        this.min = min;
        this.max = max;
        this.value = min + rand;
    }
    update() {
        try {
            let rand = Math.random() * this.range;
            if (this.listeAEviter.length > 0) {
                while (this.listeAEviter.indexOf(this.min + rand) !== -1) {
                    rand = Math.random() * this.range;
                }
            }
            this.value = this.min + rand;
        }
        catch (error) {
            console.log('Erreur dans RandomNumber.update()', error);
            this.exist = false;
        }
        this.notifyAllChilds();
    }
}
//# sourceMappingURL=randomNumber.js.map