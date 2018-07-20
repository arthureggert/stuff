const uuid = require('uuid/v4')
const {fabric} = require('fabric-webpack')

const ARROW_WIDTH = 65
const TASK_WIDTH = 100
const QTY_TASKS = 5

const canvas = new fabric.Canvas('canvas')

const _createArrowHead = (points) => {
  const headLength = 10
  const x1 = points[0]
  const y1 = points[1]
  const x2 = points[2]
  const y2 = points[3]
  const dx = x2 - x1
  const dy = y2 - y1
  const angle = (Math.atan2(dy, dx)) * (180 / Math.PI) + 90

  const triangleConfig = {
    angle: angle,
    fill: 'black',
    top: y2,
    left: x2,
    height: headLength,
    width: headLength,
    originX: 'center',
    originY: 'center',
    selectable: false
  }
  canvas.add(new fabric.Triangle(triangleConfig))
}

const _createLineArrow = (points) => {
  const lineConfig = {
    strokeWidth: 2,
    stroke: 'black',
    originX: 'center',
    originY: 'center',
    hasControls: false,
    hasBorders: false,
    hasRotatingPoint: false,
    hoverCursor: 'default',
    selectable: false
  }
  canvas.add(new fabric.Line(points, lineConfig))
}

const createArrow = (x1, y1, x2, y2) => {
  x2 = x2 || x1 + (ARROW_WIDTH - 3)//pixel diff
  y2 = y2 || y1
  const points = [x1, y1, x2, y2]
  _createLineArrow(points)
  _createArrowHead(points)
}

const _createReact = (top, left) => {
  const rectConfig = {
    top: top,
    left: left,
    width: 100,
    height: 50,
    fill: '#fff',
    stroke: 'black',
    strokeWidth: 2
  }
  return new fabric.Rect(rectConfig)
}

const _createText = (text, left, top) => {
  const textConfig = {
    left,
    top,
    fontSize: 15,
    originX: 'center',
    originY: 'center'
  }
  return new fabric.Text(text, textConfig)
}

const createTask = (text, top, left) => {
  const group = new fabric.Group([], {top, left})
  group.add(_createReact(0, 0))
  group.add(_createText(text, 50, 25))
  canvas.add(group)
}

for (let i = 0; i <= QTY_TASKS; i++) {
  const yPoint = (ARROW_WIDTH + TASK_WIDTH) * i
  createTask(`Task${i + 1}`, 10, yPoint)
  if (i < QTY_TASKS) {
    const middle = ((50 + 10) + 10) / 2
    const xPoint = 100 + yPoint
    createArrow(xPoint, middle)
  }
}

const svg = canvas.toSVG({suppressPreamble: true}, (tag) => {
  if (tag.startsWith('<g ')) {
    const modelId = uuid()
    return `<g model-id="${modelId}" ${tag.substring(3)}`
  }
  return tag
})

console.log(svg)
