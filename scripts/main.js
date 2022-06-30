/*
 PSEUDO CODE/NOTES:

 - player 1 is dealt 2 cards up at the start. Then, after that, the dealer is given 2 cards and one of them is facing down
 if (player clicks deal button) {
    show 2 cards in their deck
    dealer shows 2 cards, one up and one with the back showing
 }

 - When the player clicks hit, the player is given another card next to their other cards
 element.onclick = add another card to their deck

 - When the player clicks stay, the dealer gets their turn and flips up their card. If the dealer's cards equal 16 or less, they have to add a card to the deck. If their two cards equal 17 or less, they have to stay

 - If the player's cards add up to over 21, then it is a bust and it's game over

J/Q/K: 10 points
2-10: value on card
Ace: 1 or 11

*/
// window.addEventListener("DOMContentLoaded", () => {
//   // Execute after page load
// });

//====== MAKING THE DECK ======
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const makeDeck = (rank, suit) => {
  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};
for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

console.log(deck);

//====== SHUFFLE DECK ======
//logic: sort through all the cards in the deck list and put them
const shuffleDeck = () => {
  deck.sort(() => Math.random() - 0.5);
};

shuffleDeck();

// ====== HIT BUTTON ======
const hit = () => {
  const cardImgHit = document.createElement("img");
  const cardImgHit2 = document.createElement("img");

  ranks.sort(() => Math.random() - 0.5);

  cardImgHit.src = `images/${ranks[0]}_of_${suits[0]}.png`;
  cardImgHit2.src = "images/3_of_clubs.png";

  document.getElementById("player-hand").append(cardImgHit);
  document.getElementById("dealer-hand").append(cardImgHit2);
};

document.getElementById("hit-button").addEventListener("click", hit);

// ====== DEAL BUTTON ======
//When the "Deal" button is clicked, deal 4 times. Once to the player, once to the dealer, then the player and then to the dealer.
const deal = () => {
  const cardImgDeal = document.createElement("img");
  const cardImgDealPlayer = document.createElement("img");
  const cardImgDealPlayer2 = document.createElement("img");

  cardImgDeal.src = "images/2_of_diamonds.png";
  cardImgDealPlayer.src = "images/2_of_hearts.png";
  cardImgDealPlayer2.src = "images/2_of_spades.png";

  document
    .getElementById("player-hand")
    .append(cardImgDealPlayer, cardImgDealPlayer2);
  document.getElementById("dealer-hand").append(cardImgDeal);
};

document.getElementById("deal-button").addEventListener("click", deal);
