import IOneCell from "../../../components/models/IOneCell";

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
      };

      tempRow.push(theOneCell);
    }
    resultArray.push(tempRow);
  }

  return resultArray;
}
