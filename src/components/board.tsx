'use client'
import React from "react";
import Card from "./card";
import { CARD_FLIP_DELAY } from "@/constants";
import { initializeDeck } from "@/lib/deck";
import { isCardInArray } from "@/lib/contains";
import { boardProps } from "@/types/boardProps";
import { cardInfo } from "@/types/cardInfo";
import { deckInfo } from "@/types/deckInfo";

export default function Board(props: boardProps) {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [deck] = React.useState<deckInfo>(initializeDeck());
  const [faceUpCard, setFaceUpCard] = React.useState<cardInfo[]>([]);
  const [hiddenCards, setHiddenCards] = React.useState<cardInfo[]>([]);
  React.useEffect(checkForWin, [hiddenCards]);
  const [moves, setMoves] = React.useState<number>(0);

  function handleCardClick(card: cardInfo) {
    if (faceUpCard.length > 1) {
      return;
    }
    const newFaceUpCard = faceUpCard.slice();
    newFaceUpCard.push(card);
    setFaceUpCard(newFaceUpCard);
    if (faceUpCard.length) {
      setMoves(moves + 1);
      if (card.value === faceUpCard[0].value) {
        // remove the cards after a delay
        setTimeout(() => setHiddenCards(hiddenCards.concat(newFaceUpCard)), CARD_FLIP_DELAY);
      }
      // turn cards face down after a delay
      setTimeout(() => setFaceUpCard([]), CARD_FLIP_DELAY);
    }
    else {
      setFaceUpCard([card]);
    }
  }

  function checkForWin() {
    if (hiddenCards.length === 52) {
      props.setMessage(`You win in ${moves} moves!`);
    }
  }

  return (
  <table>
    <tbody>
      {rows.map((row) => (
        <tr key={`row${row}`}>
          {cols.map((col) => (
            <td key={`column${col}`}>
              <Card value={deck[(row * cols.length) + col].value} 
                suit={deck[(row * cols.length) + col].suit}
                isFaceUp={isCardInArray(deck[(row * cols.length) + col], faceUpCard)}
                isHidden={isCardInArray(deck[(row * cols.length) + col], hiddenCards)}
                onClick={handleCardClick}></Card>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  )
}
