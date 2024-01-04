export default interface IOneCell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  minesCount: number;
  isFlaged: boolean;
}
