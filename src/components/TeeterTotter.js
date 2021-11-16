import React from 'react'

function TeeterTotter({ passiveShapes = [], tilt = 0 }) {
  return (
    <div>
      <div className="tilt" style={{ transform: `rotate(${tilt}deg)` }}>
        {tilt}
        <div className="boxes">
          {passiveShapes.map(({ shape, color, x, y, weight }, i) => {
            return (
              <div
                className={`box ${shape}`}
                style={{ left: x, top: y, background: color }}
                key={`ground-${i}`}
              >
                {weight}
              </div>
            )
          })}
        </div>
        <div className="ground" />
      </div>
      <div className="balancingTriangle" />
    </div>
  )
}

export default TeeterTotter
