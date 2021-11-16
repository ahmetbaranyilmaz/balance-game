import { createContext, useEffect, useState } from 'react'
import { random } from '../utils/Random'

export const GameContext = createContext()

const dropSpeed = 2
const directionSpeed = 5
const poleWidth = 1000
const minWeight = 1
const maxWeight = 10
const bendingSpeed = 0.02
const maxBendingPerc = 30
const maxWeightDiff = 20
const iterationSpeed = 100
const maxTilt = 280
const poleTop = 700

export const GameContextProvider = ({ children }) => {
  let [shapes, setShapes] = useState([])
  let [isPaused, setPauseState] = useState(false)
  let [gdirection, setDirection] = useState(0)
  let [tilt, setTilt] = useState(0)
  let [balance, setBalance] = useState(0)

  let [gactiveShapes, setActiveShapes] = useState([])
  let [gpassiveShapes, setPassiveShapes] = useState([])

  useEffect(() => {
    const createShape = (
      side,
      shape = random('shape'),
      weight = random('weight'),
      color = random('color')
    ) => {
      if (!['triangle', 'circle', 'square'].includes(shape))
        throw new Error("shape must be 'triangle', 'circle' or 'square'")
      if (weight < minWeight || weight > maxWeight)
        throw new Error(`weight must be in ${minWeight} and ${maxWeight}`)
      if (!['red', 'green', 'blue'].includes(color))
        throw new Error('color must be red, green or blue')
      if (!['left', 'right'].includes(side))
        throw new Error("side must be 'left' or 'right'")

      return {
        active: true,
        shape,
        weight,
        color,
        side,
        size: 50,
        x:
          Math.floor(Math.random() * (poleWidth / 2 - 50)) +
          (side === 'right' ? poleWidth / 2 : 0),
        y: 0
      }
    }

    let calculateBalance = () => {
      let innerBalance = 0
      shapes.forEach((object) => {
        if (object.active) return
        let perc =
          (object.x + object.size / 2 - poleWidth / 2) / (poleWidth / 2)
        innerBalance += object.weight * perc
      })
      return innerBalance
    }

    let innerTilt = 0
    let direction = 0

    const update = () => {
      let passiveShapes = shapes.filter((el) => !el.active)
      let activeShapes = shapes.filter((el) => el.active)
      let player = activeShapes.find((el) => el.side === 'left')

      if (activeShapes.length === 0) {
        shapes.push(createShape('left'))
        shapes.push(createShape('right'))
      }

      if (player) {
        if (player.x <= 450 && player.x >= 0) {
          player.x = player.x + direction * directionSpeed
        }
      }

      let innerBalance = calculateBalance()
      innerTilt += bendingSpeed * (innerBalance / 1)

      shapes.forEach((object) => {
        if (object.active) object.y = object.y + dropSpeed
        let collisionYDiff = (innerTilt / maxBendingPerc) * maxTilt
        let perc =
          (object.x + object.size / 2 - poleWidth / 2) / (poleWidth / 2)
        let collusionY = poleTop + collisionYDiff * perc
        if (object.y + object.size > collusionY) object.active = false
      })

      if (innerTilt > 30 || innerTilt < -30) {
        setShapes([])
        shapes = []
        activeShapes = []
        passiveShapes = []
        setActiveShapes([])
        setPassiveShapes([])
        setTilt(0)
        innerTilt = 0
        setBalance(0)
        innerBalance = 0
        direction = 0
        setDirection(0)
        isPaused = false
        setPauseState(false)
      } else {
        setActiveShapes(activeShapes)
        setPassiveShapes(passiveShapes)
        setBalance(innerBalance)
        setTilt(innerTilt)
        setDirection(direction)
      }
    }

    const keyDown = (e) => {
      let key = e.code
      if (key === 'ArrowLeft') direction = -1
      if (key === 'ArrowRight') direction = +1
      if (key === 'Space') isPaused = !isPaused
    }

    const keyUp = (e) => {
      direction = 0
    }

    document.addEventListener('keydown', keyDown)
    document.addEventListener('keyup', keyUp)

    setInterval(() => {
      if (isPaused) return
      update()
    }, 1000 / iterationSpeed)
  }, [])

  const contextValue = {
    activeShapes: gactiveShapes,
    passiveShapes: gpassiveShapes,
    tilt
  }

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
