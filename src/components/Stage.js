import Drop from './Drop'
import TeeterTotter from './TeeterTotter'
import { GameContext } from '../contexts/GameContext'
import { useContext } from 'react'

function Stage() {
  const { activeShapes, passiveShapes, tilt } = useContext(GameContext)
  return (
    <div className="stage">
      <Drop activeShapes={activeShapes} />
      <TeeterTotter passiveShapes={passiveShapes} tilt={tilt} />
    </div>
  )
}

export default Stage
