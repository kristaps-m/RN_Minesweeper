import IOneCell from "../models/IOneCell";

export default function checkIfGameWon(
  theGameField: IOneCell[][],
  minesInGame: number
) {
  let gameCellsRevealed = 0;

  for (let row = 0; row < theGameField.length; row++) {
    for (let col = 0; col < theGameField[0].length; col++) {
      if (theGameField[row][col].isRevealed) {
        gameCellsRevealed++;
      }
    }
  }

  return (
    theGameField[0].length * theGameField.length - gameCellsRevealed ===
    minesInGame
  );
}
