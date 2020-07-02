/**
 *  =========[ SNAKE GAME ]==========
 * Just for fun. Play with your keyboard (up, down, left, right)
 * Author: @joecamer , @Dy05
 * I allow you to use this code. It's 100% opensource
 * If you wanted to collaborate, then you are welcome
 *
 * All what I want is a little star
 * For second release by @Dy05.
 * Adding pause with Echap key and Restart game option withou any Style :-P
 */
const _table = document.querySelector('#table') // The game zone in the document
const tableX = _table.clientWidth // The client width
const tableY = _table.clientHeight // The client height
const xDiv = 40 // The number of squares or steps on x axis
const yDiv = Math.floor((xDiv * tableY) / tableX) // The number of squares or steps on y axis
const STEPX = Math.floor(tableX / xDiv) // Step value on x axis
const STEPY = Math.floor(tableY / yDiv) // Step value in y axis
// Directions values
const Direction = {
    LEFT: 4,
    RIGHT: 6,
    TOP: 8,
    BOTTOM: 2
}
// Differents speeds (in ms)
const Speed = {
    LOW: 500,
    MEDIUM: 300,
    FAST: 200,
    FASTEST: 100
}
// Levels
const Levels = [
    {
        title: 'Easy',
        speed: Speed.LOW,
        score: 5
    },
    {
        title: 'Normal',
        speed: Speed.MEDIUM,
        score: 10
    },
    {
        title: 'Hard',
        speed: Speed.FAST,
        score: 15
    },
    {
        title: 'Very Hard',
        speed: Speed.FASTEST,
        score: 20
    }
]

let isPaused
let isFinished = false
let scoreDom = document.querySelector('#score')
let state = {
    scoresInternal: 0,
    scoresListener: function (val) {
        scoreDom.innerHTML = `${val} ${val > 1 ? 'points' : 'point'}`
    },
    set scores(val) {
        this.scoresInternal = val
        this.scoresListener(val)
    },
    get scores() {
        return this.scoresInternal
    },
    registerListener: function (listener) {
        this.scoresListener = listener
    }
}

let scoreList = []

class Snake {

    constructor(props) {
        this.level = props.level - 1 || 1
        this.initializeComponents()
    }

    initializeComponents() {
        if (isPaused === undefined) {
            isPaused = false
        } else {
            document.querySelectorAll('.block').forEach(elmt => elmt.remove())
        }
        this.mouse = new Point()
        document.querySelector('#level').innerHTML = Levels[this.level].title
        this.direction = Direction.RIGHT
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
            this.blocks.push(new Block({position: {x: 0, y: STEPY}, range: i + 1}))
        }

    }

    gameOver() {

        const gameOver_box = document.querySelector("#gameOver-box")
        const yesBtn = document.querySelector("#yesBtn")
        const noBtn = document.querySelector("#noBtn")
        const answers = {
            yes: () => {
                state.scores = 0
                this.initializeComponents()
                this.start()
                isFinished = false
                renew()
            },
            no: () => {
                this.stop()
                isFinished = true
                renew()
            }
        }
        const renew = () => {
            gameOver_box.classList.remove("animate__bounceIn")
            gameOver_box.classList.add("animate__bounceOut")
            yesBtn.removeEventListener('click', answers.yes)
            noBtn.removeEventListener('click', answers.no)
        }

        this.stop()

        yesBtn.addEventListener('click', answers.yes)
        noBtn.addEventListener('click', answers.no)

        gameOver_box.className = "gb-visible animate__animated animate__bounceIn"

    }

    walk() {

        const alignedX = this.mouse.position.x === this.blocks[0].position.x
        const alignedY = this.mouse.position.y === this.blocks[0].position.y

        if (alignedX && alignedY) {
            this.increase()
            this.mouse.updatePosition()
            state.scores = state.scores + Levels[this.level].score
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
                        break
                    case Direction.RIGHT:
                        position = {
                            x: b.position.x + STEPX,
                            y: b.position.y
                        }
                        this.blocks[0].el.style.transform = 'rotate(-90deg)'
                        break
                    case Direction.TOP:
                        position = {
                            x: b.position.x,
                            y: b.position.y - STEPY
                        }
                        this.blocks[0].el.style.transform = 'rotate(180deg)'
                        break
                    case Direction.BOTTOM:
                        position = {
                            x: b.position.x,
                            y: b.position.y + STEPY
                        }
                        this.blocks[0].el.style.transform = 'rotate(-360deg)'
                        break
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
            position: this.blocks[this.blocks.length - 1]._position
        }))
    }

    start() {
        this.launch()
        this.play()
        document.body.addEventListener('keydown', event => {
            if (event.keyCode === 27) {
                if (!isFinished) {
                    if (isPaused) {
                        this.pauseStop()
                    } else {
                        this.pauseStart()
                    }
                }
            }
        })
    }

    play() {

        document.body.addEventListener('keydown', this.keyboardControlEvent)

        this.timer = setInterval(() => {
            const maxX = STEPX * 2
            const maxY = STEPY * 2
            const hx = this.blocks[0].position.x + maxX
            const hy = this.blocks[0].position.y + maxY
            const d = this.direction

            if ((hx >= tableX && d === Direction.RIGHT) || (hx <= maxX && d === Direction.LEFT) || (hy >= tableY && d === Direction.BOTTOM) || (hy <= maxY && d === Direction.TOP)) {
                this.gameOver()
            } else {
                let touched = false
                let count = 1

                while (!touched && count < this.blocks.length) {
                    touched = (this.blocks[count].position.x === this.blocks[0].position.x) && (this.blocks[count].position.y === this.blocks[0].position.y)
                    count++
                }

                if (touched) {
                    this.gameOver()
                } else {
                    this.walk()
                }

            }
        }, Levels[this.level].speed)
    }

    pauseStop() {
        // Ici on peut creer un div ou une bonne alert qui met le score avec le bouton qui active le confirm
        isPaused = false

        document.querySelector("#pause-box").animate([
            {
                visibility: "visible",
                opacity: 1
            },
            {
                visibility: "hidden",
                opacity: 0
            }
        ], {
            fill: "both",
            duration: 300,
            easing: "ease-in"
        })

        this.play()
    }

    pauseStart() {
        isPaused = true
        this.stop()

        document.querySelector("#pause-box").animate([
            {
                visibility: "hidden",
                opacity: 0
            },
            {
                visibility: "visible",
                opacity: 1
            }
        ], {
            fill: "both",
            duration: 300,
            easing: "ease-in"
        })
    }

    stop() {
        document.body.removeEventListener('keydown', this.keyboardControlEvent)
        clearInterval(this.timer)
    }

    launch() {
        document.body.addEventListener('keydown', this.keyboardControlEvent)
    }

    keyboardControlEvent = (event) => {
        switch (event.keyCode) {

            case 37:
                if (this.direction !== Direction.RIGHT) {

                    this.direction = Direction.LEFT
                }
                break
            case 38:
                if (this.direction !== Direction.BOTTOM) {
                    this.direction = Direction.TOP
                }
                break
            case 39:
                if (this.direction !== Direction.LEFT) {
                    this.direction = Direction.RIGHT
                }
                break
            case 40:
                if (this.direction !== Direction.TOP) {
                    this.direction = Direction.BOTTOM
                }
                break
        }
    }

}

class Block {

    constructor(props = {}) {
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

class Point {

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