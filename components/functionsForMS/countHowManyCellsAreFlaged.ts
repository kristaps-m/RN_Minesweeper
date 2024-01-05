import IOneCell from "../models/IOneCell";

export default function countHowManyCellsAreFlaged(theGameField: IOneCell[][]) {
  let howManyCellsAreFlaged = 0;
  for (let row = 0; row < theGameField.length; row++) {
    for (let col = 0; col < theGameField[0].length; col++) {
      if (theGameField[row][col].isFlaged) {
        howManyCellsAreFlaged++;
      }
    }
  }

  return howManyCellsAreFlaged;
}
