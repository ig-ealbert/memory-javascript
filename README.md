# Memory Game

This is the Memory card game implemented in Next.js/TypeScript with tests written in Jest.

I am disappointed that Jest does not have `structuredClone`.

The deck of 52 cards is dealt face down. The player may flip two cards face up each turn by clicking on them. If the face values (Ace-King) match, the cards are removed. If the values do not match, the cards are flipped face down again. The goal is the remove all of the cards in the least number of moves possible. Remembering what cards have previously been flipped and where is the key!

![](GameScreenshot.png)

## Running the Game

```
npm run dev
```

## Running the Unit Tests

```
npm run test
```

## Supported Browsers

- Chrome
- Firefox
