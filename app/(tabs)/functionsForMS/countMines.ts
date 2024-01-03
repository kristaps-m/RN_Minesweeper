import IOneCell from "../../../components/models/IOneCell";

export default function countMines(theGameField: IOneCell[][]) {
  let howManyMinesAdded = 0;
  for (let row = 0; row < theGameField.length; row++) {
    for (let col = 0; col < theGameField.length; col++) {
      if (theGameField[row][col].isMine) {
        howManyMinesAdded++;
      }
    }
  }

  return howManyMinesAdded;
}
