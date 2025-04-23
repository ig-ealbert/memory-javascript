import { cardInfo } from "@/types/cardInfo";

export function isCardInArray(card: cardInfo, array: cardInfo[]) {
  for (const oneCard of array) {
    if (card.value === oneCard.value && card.suit === oneCard.suit) {
      return true;
    }
  }
  return false;
}
