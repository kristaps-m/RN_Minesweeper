import IOneCell from "../../../components/models/IOneCell";

// one argument then field = square ELSE two arguments
export default function generateNewGameFieldWithOnecellObjects(params: number) {
  let resultArray = [];
  for (let row = 0; row < params; row++) {
    let tempRow = [];
    for (let col = 0; col < params; col++) {
      let theOneCell: IOneCell = {
        row: row,
        col: col,
        isMine: false,
        isRevealed: false,
        minesCount: 0,
        isFlaged: false,
      };

      tempRow.push(theOneCell);
    }
    resultArray.push(tempRow);
  }

  return resultArray;
}
