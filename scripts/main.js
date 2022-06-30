/*
 PSEUDO CODE/NOTES:

 - When the player clicks stay, the dealer gets their turn and flips up their card. If the dealer's cards equal 16 or less, they have to add a card to the deck. If their two cards equal 17 or less, they have to stay

 - If the player's cards add up to over 21, then it is a bust and it's game over

J/Q/K: 10 points
2-10: value on card
Ace: 1 or 11

*/
// window.addEventListener("DOMContentLoaded", () => {
//   // Execute after page load
// });

//====== MAKING THE DECK ====== COMMENT
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "ace", "jack", "king", "queen"];
// const points = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    // pointValue: rank > 10 ? 10 : rank,
    pointValue: 1,
    //TODO
  };
  //Pushes the card object inside of the deck array
  deck.push(card);
};
//Iterate through the items in suits and ranks arrays and pass them into makeDeck() to assign the values to their keys, making 52 cards
for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}
// console.log(deck[card.pointValue]); BUG

console.log(deck);

//====== SHUFFLE DECK ====== COMMENT
//logic: sort through all the cards in the deck array and put them in random order
const shuffleDeck = () => {
  deck.sort(() => Math.random() - 0.5);
};

shuffleDeck();

// ====== HIT BUTTON ====== COMMENT
const hit = () => {
  //Creates the card images
  const cardImgHit = document.createElement("img");
  const cardImgHit2 = document.createElement("img");

  //Randomly sorts the ranks and suits arrays
  ranks.sort(() => Math.random() - 0.5);
  const suitRandPlayer = suits[Math.floor(Math.random() * suits.length)];
  const suitRandDealer = suits[Math.floor(Math.random() * suits.length)];

  //Randomizes the sources of the images
  cardImgHit.src = `images/${ranks[0]}_of_${suitRandPlayer}.png`;
  cardImgHit2.src = `images/${ranks[1]}_of_${suitRandDealer}.png`;

  //Appends the random images onto the deck displays
  document.getElementById("player-hand").append(cardImgHit);
  document.getElementById("dealer-hand").append(cardImgHit2);

  // ======= POINTS SHOW WHEN CARDS ARE PICKED ======
};

//Hit button even listener
document.getElementById("hit-button").addEventListener("click", hit);

//==========================

// ====== DEAL BUTTON ====== COMMENT
//When the "Deal" button is clicked, deal 4 times. Once to the player, once to the dealer, then the player and then to the dealer.
const deal = () => {
  //Creates the card images
  const cardImgDealer = document.createElement("img");
  const cardImgDealPlayer = document.createElement("img");
  const cardImgDealPlayer2 = document.createElement("img");

  //Randomly sorts the arrays of the ranks and suits for each card image
  ranks.sort(() => Math.random() - 0.5);
  const suitRandPlayer = suits[Math.floor(Math.random() * suits.length)];
  const suitRandPlayer2 = suits[Math.floor(Math.random() * suits.length)];
  const suitRandDealer = suits[Math.floor(Math.random() * suits.length)];

  // Changes the sources of the images at random so cards appear randomly
  cardImgDealer.src = `images/${ranks[2]}_of_${suitRandDealer}.png`;
  cardImgDealPlayer.src = `images/${ranks[1]}_of_${suitRandPlayer}.png`;
  cardImgDealPlayer2.src = `images/${ranks[0]}_of_${suitRandPlayer2}.png`;

  //Appends the images to the div dealer-hand and player-hand to show up when the deal button is clicked
  document
    .getElementById("player-hand")
    .append(cardImgDealPlayer, cardImgDealPlayer2);
  document.getElementById("dealer-hand").append(cardImgDealer);
};

//The deal button event listener
document.getElementById("deal-button").addEventListener("click", deal);
