import ISnakeCell from "../models/ISnakeCell";

export function didSnakeRunInTail(
  snakeBody: ISnakeCell[],
  snakeHead: ISnakeCell
) {
  for (let i = 0; i < snakeBody.length; i++) {
    let snakeBodyCell = snakeBody[i];
    if (snakeBodyCell.x === snakeHead.x && snakeBodyCell.y === snakeHead.y) {
      return true;
    }
  }

  return false;
}

export function returnNewSnakeHeaadAfterHitWall(
  snakeBodyPart: ISnakeCell,
  snakeFieldWidth: number,
  snakeFieldHeight: number
): ISnakeCell {
  //Horizontal
  if (snakeBodyPart.y < 0) {
    snakeBodyPart = { x: snakeBodyPart.x, y: snakeFieldWidth - 1 };
  } else if (snakeBodyPart.y > snakeFieldWidth - 1) {
    snakeBodyPart = { x: snakeBodyPart.x, y: 0 };
  } // Vertical
  else if (snakeBodyPart.x < 0) {
    snakeBodyPart = { x: snakeFieldHeight - 1, y: snakeBodyPart.y };
  } else if (snakeBodyPart.x > snakeFieldHeight - 1) {
    snakeBodyPart = { x: 0, y: snakeBodyPart.y };
  }

  return snakeBodyPart;
}
