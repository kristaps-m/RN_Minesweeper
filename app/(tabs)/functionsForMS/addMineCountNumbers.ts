import IOneCell from "../../../components/models/IOneCell";
import countMinesAroundOneCell from "./countMinesAroundOneCell";

// if field is 9 x 9, active cell = 5:5, to check...:
/*
  [(4,4) (4,5) (3,6)
   (5,4) (5,5) (5,6)  ... cordinates around cell (5,5)
   (6,4) (6,5) (6,6)]
   */
export default function addMineCountNumbers(theGameField: IOneCell[][]) {
  for (let row = 0; row < theGameField.length; row++) {
    for (let col = 0; col < theGameField[0].length; col++) {
      if (theGameField[row][col].isMine === false) {
        theGameField[row][col].minesCount = countMinesAroundOneCell(
          row,
          col,
          theGameField
        );
      }
    }
  }

  return theGameField;
}
