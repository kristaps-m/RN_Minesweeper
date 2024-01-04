import IOneCell from "../../../components/models/IOneCell";
import countAllMinesInsideGameField from "./countAllMinesInsideGameField";
import getRandomInt from "./getRandomInt";

export default function addMinesToField(
  howManyMines: number,
  theGameField: IOneCell[][]
) {
  let howManyMinesAdded = countAllMinesInsideGameField(theGameField);

  while (howManyMines !== howManyMinesAdded) {
    let randRow = getRandomInt(theGameField.length);
    let randCol = getRandomInt(theGameField[0].length);
    if (theGameField[randRow][randCol].isMine === false) {
      theGameField[randRow][randCol].isMine = true;
      howManyMinesAdded++;
    }
  }

  return theGameField;
}
