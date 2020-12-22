const Speed = {
  LOW: 500,
  MEDIUM: 300,
  FAST: 200,
  FASTEST: 100
}
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
const _table = document.querySelector('#table') // The game zone in the document
const tableX = _table.clientWidth // The client width
const tableY = _table.clientHeight // The client height
const xDiv = 40 // The number of squares or steps on x axis
const yDiv = Math.floor((xDiv * tableY) / tableX) // The number of squares or steps on y axis
const STEPX = Math.floor(tableX / xDiv) // Step value on x axis
const STEPY = Math.floor(tableY / yDiv) // Step value in y axis

export {Speed, Levels, _table, tableX, tableY, STEPX, STEPY, xDiv, yDiv}