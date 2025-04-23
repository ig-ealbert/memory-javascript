import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { initializeDeck, setupOrderedDeck } from "./deck";

describe("Initialize deck", () => {
  it("Creates a deck with 52 cards", () => {
    const deck = initializeDeck();
    assert.strictEqual(deck.length, 52);
  });

  it("Shuffles the deck", () => {
    const deck = initializeDeck();
    assert.notDeepStrictEqual(deck, setupOrderedDeck());
  });
});
