import IOneCell from "../../../components/models/IOneCell";

export default function countMinesAroundOneCell(
  realRow: number,
  realCol: number,
  theGameField: IOneCell[][]
) {
  let minesAroundTheCell = 0;
  // (5,5) OR // (3,3)0,0
  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      if (
        row + realRow >= 0 &&
        row + realRow < theGameField.length &&
        col + realCol >= 0 &&
        col + realCol < theGameField[0].length
      ) {
        if (theGameField[row + realRow][col + realCol].isMine) {
          minesAroundTheCell++;
        }
      }
    }
  }

  return minesAroundTheCell;
}
