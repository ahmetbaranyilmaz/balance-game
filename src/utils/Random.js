const values = {
  color: ['red', 'green', 'blue'],
  shape: ['square', 'triangle', 'circle'],
  weight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

export const random = (key) => {
  return values[key][Math.floor(Math.random() * values[key].length)]
}
