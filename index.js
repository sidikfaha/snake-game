const _table = document.querySelector('#table')
const tableX = _table.clientWidth
const tableY = _table.clientHeight
const xDiv = 30
const yDiv = Math.floor((30 * tableY) / tableX)
const STEPX = Math.floor(tableX / xDiv)
const STEPY = Math.floor(tableY / yDiv)
const Direction = {
    LEFT: 4,
    RIGHT: 6,
    TOP: 8,
    BOTTOM: 2
}
const Speed = {
    LOW: 700,
    MEDIUM: 500,
    FAST: 300,
    FASTEST: 200
}
const Levels = [{
        title: 'Facile',
        speed: Speed.LOW,
        score: 1
    },
    {
        title: 'Moyen',
        speed: Speed.MEDIUM,
        score: 2
    },
    {
        title: 'Difficile',
        speed: Speed.FAST,
        score: 3
    },
    {
        title: 'Compliqué',
        speed: Speed.FASTEST,
        score: 4
    }
]
const colors = {
    PRIMARY: 'orange',
    DEFAULT: 'lightgray',
    ACCENT: 'red'
}


let pointX = 0
let pointY = 0
let scores = 0

class Snake {

    constructor(props) {
        this.level = props.level - 1 || 1
        this.dot = new Point()
        this.initializeComponenets()

        this.start()
    }

    initializeComponenets() {
        this.direction = Direction.RIGHT;
        this.blocks = [
            new Block({
                position: {
                    x: STEPX,
                    y: STEPY
                },
                isFirst: true
            })
        ]

        for (let i = 0; i < this.level * 2; i++) {
            this.blocks.push(new Block({position: {x: 0, y: STEPY}, range: i +1}))
        }

    }

    walk() {

        const alignedX = this.dot.position.x === this.blocks[0].position.x
        const alignedY = this.dot.position.y === this.blocks[0].position.y

        if ( alignedX && alignedY ) {
            this.increase()
            this.dot.updatePosition()
            scores += Levels[this.level].score

            document.querySelector('#score').innerHTML = `${scores} ${scores > 1 ? 'points' : 'point'}`

            console.log('Nice !')
        }

        this.blocks.forEach(_ => {
            _table.appendChild(_.el)
        })
        this.blocks.forEach((b, i) => {
            let position

            if (i === 0) {

                switch (this.direction) {
                    case Direction.LEFT:
                        position = {
                            x: b.position.x - STEPX,
                            y: b.position.y
                        }
                        this.blocks[0].el.style.transform = 'rotate(90deg)'
                        break;
                    case Direction.RIGHT:
                        position = {
                            x: b.position.x + STEPX,
                            y: b.position.y
                        }
                        this.blocks[0].el.style.transform = 'rotate(-90deg)'
                        break;
                    case Direction.TOP:
                        position = {
                            x: b.position.x,
                            y: b.position.y - STEPY
                        }
                        this.blocks[0].el.style.transform = 'rotate(180deg)'
                        break;
                    case Direction.BOTTOM:
                        position = {
                            x: b.position.x,
                            y: b.position.y + STEPY
                        }
                        this.blocks[0].el.style.transform = 'rotate(-360deg)'
                        break;
                }

            } else {
                position = {
                    x: this.blocks[i - 1]._position.x,
                    y: this.blocks[i - 1]._position.y,
                }
            }

            b.updatePosition(position)
        })

    }

    increase() {
        this.blocks.push(new Block({
            position: this.blocks[this.blocks.length - 1]._position,
            range: this.blocks.length
        }))
    }

    start() {
        this.timer = setInterval(_ => {
            const maxX = STEPX * 2
            const maxY = STEPY * 2
            const hx = this.blocks[0].position.x + maxX
            const hy = this.blocks[0].position.y + maxY
            const d = this.direction

            if ((hx >= tableX && d === Direction.RIGHT) || (hx <= maxX && d === Direction.LEFT) || (hy >= tableY && d === Direction.BOTTOM) || (hy <= maxY && d === Direction.TOP)) {
                alert('Game over !')
                this.stop()
            } else {
                let touched = false
                let count = 1

                while (!touched && count < this.blocks.length) {
                    touched = (this.blocks[count].position.x === this.blocks[0].position.x) && (this.blocks[count].position.y === this.blocks[0].position.y)
                    count++
                }

                if (touched) {
                    alert('Game over !')
                    this.stop()
                } else {
                    this.walk()
                }

            }
        }, Levels[this.level].speed)

    }

    stop(){
        clearInterval(this.timer)
    }


}

class Block {

    constructor(props = {}) {
        this.sizeX = STEPX
        this.sizeY = STEPY
        this.position = props.position
        this.isFirst = props.isFirst ? props.isFirst : false
        this.range = props.range ? props.range : -1

        this.initializeComponenets()
    }

    initializeComponenets() {
        this.el = document.createElement('span')
        this.el.className = 'block'
        this.el.style.width = this.sizeX  + 'px'
        this.el.style.height = this.sizeY  + 'px'

        if (this.isFirst) { this.el.classList.add('is-first') } 

        if (this.range > 0) {
            this.el.innerText = this.range
        } else if (this.range == 0) {
            this.el.innerText = 'x'
        }

        this._position = {
            x: 0,
            y: 0
        }

        this.el.style.top = this.position.y  + 'px'
        this.el.style.left = this.position.x  + 'px'
    }

    updatePosition(position) {
        this._position = this.position // Saving last position
        this.position = position // Overridding actual position

        // Updating element on front-end
        this.el.style.top = this.position.y  + 'px'
        this.el.style.left = this.position.x  + 'px'
    }

}

class Point {

    constructor() {
        this.el = document.createElement('span')
        this.position = {x: 0, y: 0}
        
        this.initializeComponenets()
    }

    initializeComponenets() {
        this.el.style.width = STEPX + 'px'
        this.el.style.height = STEPY + 'px'
        
        this.el.className = 'block point'

        this.updatePosition()

        _table.appendChild(this.el)

    }

    updatePosition() {
        this.position = {x: Math.round(Math.random() * (xDiv-1)) * STEPX, y: Math.round(Math.random() * (yDiv - 1)) * STEPY}

        this.el.style.top = this.position.y + 'px'
        this.el.style.left = this.position.x + 'px'

        console.log(this.position)
    }

}

const launtch = _ => {
    
    const snake = new Snake({
        level: 4
    })

    document.body.addEventListener('keydown', event => {
        switch (event.keyCode) {

            case 37:
                if (snake.direction !== Direction.RIGHT){

                    snake.direction = Direction.LEFT
                } 
                break
            case 38:
                if (snake.direction !== Direction.BOTTOM)
                {
                    snake.direction = Direction.TOP
                } 
                break
            case 39:
                if (snake.direction !== Direction.LEFT) {
                    snake.direction = Direction.RIGHT
                } 
                break
            case 40:
                if (snake.direction !== Direction.TOP)
                {
                    snake.direction = Direction.BOTTOM
                } 
                break
        }
    })

}

window.onload = launtch

console.log(xDiv)