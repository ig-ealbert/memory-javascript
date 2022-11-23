const deck = initializeDeck();
let faceUp = [];
let turns = 0;
let remainingCards = 52;
dealDeck();

function initializeDeck() {
  const deck = [];
  let availableCards = setupOrderedDeck();
  while (availableCards.length > 0) {
    const randomCard = randomInt(0, availableCards.length);
    deck.push(availableCards[randomCard]);
    availableCards.splice(randomCard, 1);
  }
  return deck;
}

function setupOrderedDeck() {
  const deckInProgress = [];
  for (let i = 1; i < 14; i++) { // 1 = ace, 11 = jack, 12 = queen, 13 = king
    for (let j = 0; j < 4; j++) { // 0 = hearts, 1 = diamonds, 2 = clubs, 3 = spades
      deckInProgress.push({value: i, suit: j});
    }
  }
  return deckInProgress;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function dealDeck() {
  const field = document.getElementById("field");
  for (let i = 0; i < 4; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 13; j++) {
      const uiCard = createCardInUI();
      const td = document.createElement("td");
      td.appendChild(uiCard);
      row.appendChild(td);
    }
    field.appendChild(row);
  }
}

function createCardInUI() {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = "&nbsp;";
  div.style.backgroundImage = makeImageUrl(4);
  div.onclick = function() {
    const td = this.parentNode;
    cardClicked(this, td.parentNode.rowIndex, td.cellIndex);
  }
  return div;
}

function cardClicked(card, row, column) {
  if (validClick(card)) {
    turnCardFaceUp(card, row, column);
    if (faceUp.length === 2) {
      turns++;
    }
    if (checkForMatch()) {
      processMatch();
    }
    else if (faceUp.length === 2){
      processNotMatch();
    }
  }
}

function validClick(card) {
  if (faceUp.length === 0) {
    return true;
  }
  else if (faceUp.length === 2) {
    return false;
  }
  else {
    return faceUp[0] != card;
  }
}

function turnCardFaceUp(card, row, column) {
  const index = (row * 13) + column;
  const value = deck[index].value;
  const suit = deck[index].suit;
  card.innerHTML = toPrintableValue(value);
  card.style.backgroundImage = makeImageUrl(suit);
  faceUp.push(card);
}

function toPrintableValue(numericValue) {
  const numbers = [1, 11, 12, 13];
  const symbols = ["A", "J", "Q", "K"];
  const index = numbers.indexOf(numericValue);
  if (index !== -1) {
    return symbols[index];
  }
  else return numericValue;
}

function makeImageUrl(suit) {
  const images = ["Hearts.png", "Diamonds.png", "Clubs.png", "Spades.png", "CardBack.png"];
  const url = images[suit];
  return `url('${url}')`;
}

function checkForMatch() {
  return faceUp.length === 2 && faceUp[0].innerHTML === faceUp[1].innerHTML;
}

function processMatch() {
  setTimeout(function() {
    removeCardsFromUI();
    internallyTrackMatch();
    checkForGameEnd();
    faceUp = [];
  }, 600);
}

function processNotMatch() {
  setTimeout(function() {
    turnCardsFaceDown();
    faceUp = [];
  }, 600);
}

function removeCardsFromUI() {
  faceUp[0].parentNode.classList.add("whiteborder");
  faceUp[1].parentNode.classList.add("whiteborder");
  faceUp[0].classList.add("hidden");
  faceUp[1].classList.add("hidden");
}

function internallyTrackMatch() {
  remainingCards = remainingCards - 2;
}

function turnCardsFaceDown() {
  faceUp[0].innerHTML = "&nbsp;";
  faceUp[1].innerHTML = "&nbsp;";
  faceUp[0].style.backgroundImage = makeImageUrl(4);
  faceUp[1].style.backgroundImage = makeImageUrl(4);
}

function checkForGameEnd() {
  if (remainingCards === 0) {
    updateMessage(`You won in ${turns} turns!`);
    updateButtonsForEndGame();
  }
}

function updateMessage(result) {
  const message = document.getElementById("message");
  message.innerHTML = result;
}

function updateButtonsForEndGame() {
  const resetButton = document.getElementById("restartGame");
  resetButton.classList.add("greenBorder");
}
