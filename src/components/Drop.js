import React from 'react'

function Drop({ activeShapes = [] }) {
  return (
    <div className="boxes">
      {activeShapes.map(({ shape, color, x, y, weight }, i) => {
        return (
          <div
            className={`box ${shape}`}
            style={{ left: x, top: y, background: color }}
            key={`drop-${i}`}
          >
            {weight}
          </div>
        )
      })}
    </div>
  )
}

export default Drop
