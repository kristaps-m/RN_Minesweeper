import ISnakeCell from "../models/ISnakeCell";
import didSnakeRunInTail from "./colisionDetection";

export default function generateFoodCordinates(
  snakeField: string[][],
  snakeTailBody: ISnakeCell[]
): ISnakeCell {
  let w = snakeField[0].length; // 15?
  let h = snakeField.length; // 9?
  console.log(`w ${w}, h ${h}`);
  let isInside = true;
  let result: ISnakeCell = { x: h - 1, y: w - 1 };
  while (isInside) {
    let fieldW = Math.floor(Math.random() * (w - 3)) + 1;
    let fieldH = Math.floor(Math.random() * (h - 3)) + 1;
    if (!didSnakeRunInTail(snakeTailBody, { x: fieldH, y: fieldW })) {
      isInside = false;
      result = { x: fieldH, y: fieldW };
    }
  }

  return result;
}
