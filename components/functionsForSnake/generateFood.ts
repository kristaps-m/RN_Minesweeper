export default function generateFood(snakeField: string[][]): string[][] {
  let w = snakeField[0].length;
  let h = snakeField.length;
  let rw = Math.floor(Math.random() * w);
  let rh = Math.floor(Math.random() * h);
  snakeField[rw][rh] = "O";

  return snakeField;
}
