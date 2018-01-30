QUnit.test( "The deck should have 52 cards in it after it is initialized", function (assert ) {
  var deck = initializeDeck();
  assert.equal( deck.length, 52, "The deck has 52 cards in it." );
});

QUnit.test( "A randomly generated number is exclusive of the maximum value", function (assert ) {
  var number = randomInt(0, 52);
  assert.ok( number < 52, "The number must be less than the max (not equal)." );
});

QUnit.test( "A randomly generated number is inclusive of the minimum value", function (assert ) {
  var number = randomInt(0, 52);
  assert.ok( number >= 0, "The number must be greater than or equal to the min." );
});

QUnit.test( "The cards should be dealt out in 4 rows", function (assert ) {
  var field = document.getElementById("field");
  var rows = field.getElementsByTagName("tr");
  assert.equal( rows.length, 4, "There are 4 rows of cards." );
});

QUnit.test( "Each row should have 13 cards", function (assert ) {
  var field = document.getElementById("field");
  var rows = field.getElementsByTagName("tr");
  assert.equal( rows[0].childNodes.length, 13, "Each row has 13 cards." );
});

QUnit.test( "A created card should be face down", function (assert ) {
  var card = createCardInUI();
  assert.equal( card.innerHTML, "&nbsp;", "A card is face down when initialized" );
});

QUnit.test( "A card shows its value when it is turned face up", function (assert ) {
  var card = createCardInUI();
  turnCardFaceUp(card, 0, 0);
  assert.notEqual( card.innerHTML, "&nbsp;", "The card is turned face up." );
});

QUnit.test( "A card hides its value when it is turned face down", function (assert ) {
  var card1 = createCardInUI();
  var card2 = createCardInUI();
  faceUp = [card1, card2];
  turnCardsFaceDown();
  assert.equal( card1.innerHTML, "&nbsp;", "The card is turned face down." );
});

QUnit.test( "When a card is turned face up, it is added to a face up list", function (assert ) {
  faceUp = [];
  var card = createCardInUI();
  turnCardFaceUp(card, 0, 0);
  assert.equal( faceUp.length, 1, "The card is added to the list of face up cards." );
});

QUnit.test( "When two cards are clicked, it adds 1 to the number of turns", function (assert ) {
  var card1 = createCardInUI();
  card1.innerHTML = "K";
  card1.style.backgroundImage = makeImageUrl(0);
  var card2 = createCardInUI();
  faceUp = [card1];
  turns = 0;
  cardClicked(card2, 0, 1);
  assert.equal( turns, 1, "The number of turns is increased by 1." );
});

QUnit.test( "Clicking on the same card twice in a row is not valid", function (assert ) {
  var card1 = createCardInUI();
	card1.innerHTML = "K";
	card1.style.backgroundImage = makeImageUrl(0);
  faceUp = [card1];
  assert.notOk( validClick(card1), "The same card cannot be clicked twice in a row." );
});

QUnit.test( "Clicking on a card when there are already 2 face up is not valid", function (assert ) {
  var card1 = createCardInUI();
	card1.innerHTML = "K";
	card1.style.backgroundImage = makeImageUrl(0);
  var card2 = createCardInUI();
	card2.innerHTML = "Q";
	card2.style.backgroundImage = makeImageUrl(1);
  var card3 = createCardInUI();
	card3.innerHTML = "J";
	card3.style.backgroundImage = makeImageUrl(2);
  faceUp = [card1, card2];
  assert.notOk( validClick(card3), "Three cards cannot be face up at a time." );
});

QUnit.test( "An ace is displayed as an A", function (assert ) {
  var value = toPrintableValue(1);
  assert.equal( value, "A", "An ace has a printable value of A." );
});

QUnit.test( "A jack is displayed as a J", function (assert ) {
  var value = toPrintableValue(11);
  assert.equal( value, "J", "A jack has a printable value of J." );
});

QUnit.test( "A queen is displayed as a Q", function (assert ) {
  var value = toPrintableValue(12);
  assert.equal( value, "Q", "A queen has a printable value of Q." );
});

QUnit.test( "A king is displayed as an K", function (assert ) {
  var value = toPrintableValue(13);
  assert.equal( value, "K", "A king has a printable value of K." );
});

QUnit.test( "Any number from 2 to 9 is displayed as that number", function (assert ) {
  var value = randomInt(2, 9);
  var print = toPrintableValue(value);
  assert.equal( print, value, "A number is displayed as that number." );
});

QUnit.test( "The hearts suit uses the hearts image", function (assert ) {
  var suit = 0;
  var image = makeImageUrl(suit);
  assert.equal( image, "url('Hearts.png')", "An appropriate image is chosen for the suit." );
});

QUnit.test( "The diamonds suit uses the diamonds image", function (assert ) {
  var suit = 1;
  var image = makeImageUrl(suit);
  assert.equal( image, "url('Diamonds.png')", "An appropriate image is chosen for the suit." );
});

QUnit.test( "The clubs suit uses the clubs image", function (assert ) {
  var suit = 2;
  var image = makeImageUrl(suit);
  assert.equal( image, "url('Clubs.png')", "An appropriate image is chosen for the suit." );
});

QUnit.test( "The spades suit uses the spades image", function (assert ) {
  var suit = 3;
  var image = makeImageUrl(suit);
  assert.equal( image, "url('Spades.png')", "An appropriate image is chosen for the suit." );
});

QUnit.test( "A face down card uses the card back image", function (assert ) {
  var suit = 4;
  var image = makeImageUrl(suit);
  assert.equal( image, "url('CardBack.png')", "A face down card shows the back of the card." );
});

QUnit.test( "Two cards match if their values are the same and suits are different", function (assert ) {
  var card1 = createCardInUI();
	card1.innerHTML = "K";
	card1.style.backgroundImage = makeImageUrl(0);
  var card2 = createCardInUI();
	card2.innerHTML = "K";
	card2.style.backgroundImage = makeImageUrl(1);
  faceUp = [card1, card2];
  assert.ok( checkForMatch(), "The cards match because they have the same value." );
});

QUnit.test( "Two cards do not match if their values are different", function (assert ) {
  var card1 = createCardInUI();
	card1.innerHTML = "Q";
	card1.style.backgroundImage = makeImageUrl(0);
  var card2 = createCardInUI();
	card2.innerHTML = "K";
	card2.style.backgroundImage = makeImageUrl(1);
  faceUp = [card1, card2];
  assert.notOk( checkForMatch(), "The cards do not match because they have different values." );
});

QUnit.test( "When two cards match, they are removed from the board", function (assert ) {
  var td1 = document.createElement("td");
  var card1 = createCardInUI();
	card1.innerHTML = "K";
	card1.style.backgroundImage = makeImageUrl(0);
  td1.appendChild(card1);
  var td2 = document.createElement("td");
  var card2 = createCardInUI();
	card2.innerHTML = "K";
	card2.style.backgroundImage = makeImageUrl(1);
  td2.appendChild(card2);
  faceUp = [card1, card2];
  removeCardsFromUI();
  assert.ok( card1.classList.contains("hidden"), "The cards are removed from the board." );
});

QUnit.test( "The number of remaining cards is reduced by 2 after a match is found", function (assert ) {
  internallyTrackMatch();
  assert.equal( remainingCards, 50, "The match is internally tracked." );
});

QUnit.test( "If two cards do not match, both are turned face down", function (assert ) {
  var card1 = createCardInUI();
	card1.innerHTML = "Q";
	card1.style.backgroundImage = makeImageUrl(0);
  var card2 = createCardInUI();
	card2.innerHTML = "K";
	card2.style.backgroundImage = makeImageUrl(1);
  faceUp = [card1, card2];
  turnCardsFaceDown();
  assert.equal( card1.style.backgroundImage, "url(\"CardBack.png\")", "The cards are turned face down." );
});

QUnit.test( "The game ends when no face down cards remain", function (assert ) {
  remainingCards = 0;
  turns = 50;
  checkForGameEnd();
  var message = document.getElementById("message");
  assert.equal( message.innerHTML, "You won in 50 turns!", "A win message is displayed." );
});

QUnit.test( "The reset button should be highlighted when the game is over", function (assert ) {
  updateButtonsForEndGame();
  var resetButton = document.getElementById("restartGame");
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});
