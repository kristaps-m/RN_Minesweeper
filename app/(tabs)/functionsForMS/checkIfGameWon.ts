import IOneCell from "../../../components/models/IOneCell";

export default function checkIfGameWon(
  theGameField: IOneCell[][],
  minesInGame: number
) {
  let gameCellsRevealed = 0;

  for (let row = 0; row < theGameField.length; row++) {
    for (let col = 0; col < theGameField.length; col++) {
      if (theGameField[row][col].isRevealed) {
        gameCellsRevealed++;
      }
    }
  }
  // 8 == 2
  return (
    theGameField[0].length * theGameField.length - gameCellsRevealed ===
    minesInGame
  );
}
