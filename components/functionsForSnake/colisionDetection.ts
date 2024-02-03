import ISnakeCell from "../models/ISnakeCell";

export default function didSnakeRunInTail(
  snakeBody: ISnakeCell[],
  snakeHead: ISnakeCell
) {
  for (let i = 0; i < snakeBody.length; i++) {
    let snakeBodyCell = snakeBody[i];
    if (
      snakeBodyCell.x === snakeHead.x &&
      snakeBodyCell.y === snakeBodyCell.y
    ) {
      return true;
    }
  }

  return false;
}
