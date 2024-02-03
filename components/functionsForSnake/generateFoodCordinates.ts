export default function generateFoodCordinates(snakeField: string[][]): {
  x: number;
  y: number;
} {
  let w = snakeField[0].length;
  let h = snakeField.length;
  let rw = Math.floor(Math.random() * w);
  let rh = Math.floor(Math.random() * h);

  return { x: rw, y: rh };
}
