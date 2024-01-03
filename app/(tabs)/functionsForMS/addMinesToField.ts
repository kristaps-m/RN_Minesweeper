import IOneCell from "../../../components/models/IOneCell";
import countMines from "./countMines";
import getRandomInt from "./getRandomInt";

// if field 10 * 10, them mines count = 10;
export default function addMinesToField(
  howManyMines: number,
  theGameField: IOneCell[][]
) {
  // let theGameField: oneCell[][] = [];
  let howManyMinesAdded = countMines(theGameField);

  while (howManyMines !== howManyMinesAdded) {
    // let randRow = getRandomInt(theGameField.length);
    // let randCol = getRandomInt(theGameField.length);
    let randRow = getRandomInt(theGameField.length);
    let randCol = getRandomInt(theGameField[0].length);
    if (theGameField[randRow][randCol].isMine === false) {
      theGameField[randRow][randCol].isMine = true;
      howManyMinesAdded++;
    }
  }

  return theGameField;
}
