export class Element2D {
    constructor(parentFigure) {
        this.parentFigure = parentFigure;
        this.id = this.parentFigure.lastId++;
        this.parentFigure.dictionnary[this.id] = this;
        this.group = [];
        this.childs = [];
        this.parents = [];
        this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.isVisible = true;
        this._color = 'black';
        this._fill = 'none';
        this._thickness = 2;
        this._opacity = 1;
        this._fillOpacity = 1;
        this._dashed = false;
        this.draggable = true;
        this._exist = true;
    }
    addChild(child) {
        this.childs.push(child);
        child.parents.push(this);
    }
    removeChild(child) {
        const index = this.childs.indexOf(child);
        if (index > -1) {
            this.childs.splice(index, 1);
        }
        const index2 = child.parents.indexOf(this);
        if (index2 > -1) {
            child.parents.splice(index2, 1);
        }
    }
    notifyAllChilds() {
        if (this.childs.length > 40) {
            console.log('Nombre de dépendances élevée pour ', this);
        }
        for (const element of this.childs) {
            element.update();
        }
    }
    hide(changeIsVisible = true) {
        for (const e of this.group) {
            e.hide(changeIsVisible);
        }
        if (this.g.children.length > 0) {
            for (const line of Array.from(this.g.children)) {
                line.setAttribute('visibility', 'hidden');
            }
        }
        else {
            this.g.setAttribute('visibility', 'hidden');
        }
        if (changeIsVisible)
            this.isVisible = false;
    }
    show(changeIsVisible = true) {
        if (!changeIsVisible && !this.isVisible)
            return;
        for (const e of this.group) {
            e.show(changeIsVisible);
        }
        if (this.g.children.length > 0) {
            for (const line of Array.from(this.g.children)) {
                line.setAttribute('visibility', 'visible');
            }
        }
        else {
            this.g.setAttribute('visibility', 'visible');
        }
        if (changeIsVisible)
            this.isVisible = true;
    }
    set exist(arg) {
        try {
            let allParentsExist = true;
            for (const parent of this.parents) {
                if (!parent.exist) {
                    allParentsExist = false;
                    break;
                }
            }
            this._exist = arg && allParentsExist;
            (this._exist && this.isVisible)
                ? this.show(false)
                : this.hide(false);
            for (const e of this.childs) {
                e.exist = this._exist && e.exist;
                if (e instanceof Element2D && e.isVisible)
                    this._exist ? e.show(false) : e.hide(false);
            }
        }
        catch (error) {
            console.log('Erreur dans Element2d.exist()', error);
            this.exist = false;
        }
    }
    get exist() {
        return this._exist;
    }
    get color() {
        return this._color;
    }
    set color(color) {
        for (const e of this.group) {
            e.color = color;
        }
        if (this.g.children.length > 0) {
            for (const line of Array.from(this.g.children)) {
                line.setAttribute('stroke', color);
            }
        }
        else {
            this.g.setAttribute('stroke', color);
        }
        this._color = color;
    }
    get thickness() {
        return this._thickness;
    }
    set thickness(thickness) {
        for (const e of this.group) {
            e.thickness = thickness;
        }
        if (this.g.children.length > 0) {
            for (const line of Array.from(this.g.children)) {
                line.setAttribute('stroke-width', `${thickness}`);
            }
        }
        else {
            this.g.setAttribute('stroke-width', `${thickness}`);
        }
        this._thickness = thickness;
    }
    get fill() {
        return this._fill || 'none';
    }
    set fill(fill) {
        if (this.g.children.length > 0) {
            for (const line of Array.from(this.g.children)) {
                line.setAttribute('fill', `${fill}`);
            }
        }
        else {
            this.g.setAttribute('fill', `${fill}`);
        }
        this._fill = fill;
    }
    get opacity() {
        return this._opacity;
    }
    set opacity(opacity) {
        if (this.g.children.length > 0) {
            for (const line of Array.from(this.g.children)) {
                line.setAttribute('opacity', `${opacity}`);
            }
        }
        else {
            this.g.setAttribute('opacity', `${opacity}`);
        }
        this._opacity = opacity;
    }
    get fillOpacity() {
        return this._fillOpacity;
    }
    set fillOpacity(fillOpacity) {
        if (this.g.children.length > 0) {
            for (const line of Array.from(this.g.children)) {
                line.setAttribute('fill-opacity', `${fillOpacity}`);
            }
        }
        else {
            this.g.setAttribute('fill-opacity', `${fillOpacity}`);
        }
        this._fillOpacity = fillOpacity;
    }
    get dashed() {
        return this._dashed;
    }
    set dashed(isDashed) {
        for (const e of this.group) {
            e.dashed = isDashed;
        }
        if (isDashed) {
            this.g.setAttribute('stroke-dasharray', '4 3');
        }
        else {
            this.g.removeAttribute('stroke-dasharray');
        }
        this._dashed = isDashed;
    }
    get latex() {
        return '';
    }
    get tikzOptions() {
        const arrayOptions = [];
        if (this.color !== 'black')
            arrayOptions.push(`color = ${this.color}`);
        if (this.thickness !== 1)
            arrayOptions.push(`line width = ${this.thickness}`);
        if (this.fill !== 'none')
            arrayOptions.push(`fill = ${this.fill}`);
        if (this.opacity !== undefined)
            arrayOptions.push(`opacity = ${this.opacity}`);
        if (this.fillOpacity !== undefined)
            arrayOptions.push(`fill opacity = ${this.fillOpacity}`);
        if (this.dashed)
            arrayOptions.push('dashed');
        let txtOptions = '';
        if (arrayOptions)
            txtOptions = `[${arrayOptions.join(', ')}]`;
        return txtOptions;
    }
    select() {
        this.parentFigure.selectedElements.push(this);
        if (this.g.children.length > 0) {
            for (const line of Array.from(this.g.children)) {
                line.setAttribute('stroke', 'purple');
                line.setAttribute('stroke-width', '5');
            }
        }
        else {
            this.g.setAttribute('stroke', 'purple');
            this.g.setAttribute('stroke-width', '5');
        }
    }
    unSelect() {
        this.parentFigure.selectedElements = this.parentFigure.selectedElements.filter((e) => e !== this);
        this.color = this._color;
        this.thickness = this._thickness;
    }
    setVisibleOnMouseOver() {
        this.g.classList.add('onlyOver');
        this.g.setAttribute('opacity', '0');
    }
    endVisibleOnlyOver() {
        this.g.classList.remove('onlyOver');
        this.g.removeAttribute('opacity');
    }
}
//# sourceMappingURL=Element2D.js.map