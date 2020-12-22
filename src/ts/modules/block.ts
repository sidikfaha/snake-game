import {STEPX, STEPY} from "./values";

export class Block {
    private readonly sizeX
    private readonly sizeY
    private position
    private readonly isFirst
    private el
    private _position

    constructor(props) {
        this.sizeX = STEPX
        this.sizeY = STEPY
        this.position = props.position
        this.isFirst = props.isFirst ? props.isFirst : false

        this.initializeComponents()
    }

    initializeComponents() {
        this.el = document.createElement('span')
        this.el.className = 'block'
        this.el.style.width = this.sizeX + 'px'
        this.el.style.height = this.sizeY + 'px'

        if (this.isFirst) {
            this.el.classList.add('is-first')
        } else {
            this.el.classList.add('is-body')
        }

        this._position = {
            x: 0,
            y: 0
        }

        this.el.style.top = this.position.y + 'px'
        this.el.style.left = this.position.x + 'px'
    }

    updatePosition(position) {
        this._position = this.position // Saving last position
        this.position = position // Overridding actual position

        // Updating element on front-end
        this.el.style.top = this.position.y + 'px'
        this.el.style.left = this.position.x + 'px'
    }

}