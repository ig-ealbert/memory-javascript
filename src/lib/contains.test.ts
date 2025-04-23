import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { isCardInArray } from "./contains";

describe("Does array contain card", () => {
  const cardInfo = {
    value: 1,
    suit: 0,
  };

  it("Finds card in array", () => {
    const isFound = isCardInArray(cardInfo, [cardInfo]);
    assert.ok(isFound);
  });

  it("Fails to find card in array", () => {
    const isFound = isCardInArray(cardInfo, []);
    assert.ok(!isFound);
  });

  it("Fails to find card with different suit and same value", () => {
    const isFound = isCardInArray(cardInfo, [{ value: 1, suit: 1 }]);
    assert.ok(!isFound);
  });

  it("Fails to find card with same suit and different value", () => {
    const isFound = isCardInArray(cardInfo, [{ value: 2, suit: 0 }]);
    assert.ok(!isFound);
  });
});
