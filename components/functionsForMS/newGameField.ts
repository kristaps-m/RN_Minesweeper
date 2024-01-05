import IOneCell from "../models/IOneCell";

// one argument then field = square ELSE two arguments
// GRL:number,GCL: number (Game Row Lenght, Game Column Length)
export default function generateNewGameFieldWithOnecellObjects(
  GRL: number,
  GCL: number
) {
  let resultArray = [];
  for (let row = 0; row < GRL; row++) {
    let tempRow = [];
    for (let col = 0; col < GCL; col++) {
      let theOneCell: IOneCell = {
        row: row,
        col: col,
        isMine: false,
        isRevealed: false,
        minesCount: 0,
        isFlaged: false,
        key: `${row}+${col}`,
      };

      tempRow.push(theOneCell);
    }
    resultArray.push(tempRow);
  }

  return resultArray;
}
