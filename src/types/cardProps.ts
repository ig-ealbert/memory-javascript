import { cardInfo } from "./cardInfo";

export type cardProps = {
  value: number,
  suit: number,
  isFaceUp: boolean,
  isHidden: boolean,
  onClick: (card: cardInfo) => void,
};
