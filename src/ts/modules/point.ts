import {_table, STEPX, STEPY, xDiv, yDiv} from "./values"

export class Point {
    private readonly el
    private position

    constructor() {
        this.el = document.createElement('span')
        this.position = {x: 0, y: 0}

        this.initializeComponents()
    }

    initializeComponents() {
        this.el.style.width = STEPX + 'px'
        this.el.style.height = STEPY + 'px'
        this.el.className = 'block mouse'
        this.updatePosition()
        _table.appendChild(this.el)
    }

    updatePosition() {
        this.position = {
            x: Math.round(Math.random() * (xDiv - 1)) * STEPX,
            y: Math.round(Math.random() * (yDiv - 1)) * STEPY
        }

        this.el.style.top = this.position.y + 'px'
        this.el.style.left = this.position.x + 'px'
        console.log(this.position)
    }

}