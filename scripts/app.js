window.addEventListener("DOMContentLoaded", () => {
  let gameEnding = false;
  let dealerHand = [];
  let playerHand = [];
  let points = 0;
  let aceCards = 0;

  const dealerHandGrab = document.getElementById("dealer-hand");
  const playerHandGrab = document.getElementById("player-hand");
  let dealButton = document.getElementById("deal-button");
  let hitButton = document.getElementById("hit-button");
  let standButton = document.getElementById("stand-button");
  let resetButton = document.getElementById("reset-button");

  //====== SHUFFLING DECK ======
  const shuffleDeck = (deck) => {
    deck.sort(() => Math.random() - 0.5);
  };

  //====== MAKING THE DECK =====
  const makeDeck = () => {
    let deck = [];
    const suits = ["clubs", "spades", "hearts", "diamonds"];

    for (let i = 0; i < suits.length; i++) {
      const suit = suits[i];
      for (let rank = 1; rank <= 13; rank++) {
        //cards
        const card = {
          rank: rank,
          suit: suit,
        };
        deck.push(card);
      }
    }
    shuffleDeck(deck);
    return deck;
  };

  //====== ADDING SCORES UP ======
  const scoreCalculation = (deck) => {
    points = 0;
    aceCards = 0;

    // find the card from deck array (a card gets pushed into deck when deal button is hit) and add points based on the rank number in card object
    for (let i = 0; i < deck.length; i++) {
      const cardInPlay = deck[i];
      if (cardInPlay["rank"] > 1 && cardInPlay["rank"] < 11) {
        points = points + cardInPlay["rank"];
      } else if (cardInPlay["rank"] >= 11) {
        points = points + 10;
      } else if (cardInPlay["rank"] === 1) {
        aceCards++;
        points = points + 11;
      }
    }
    //if your score is over 21 and you have aces, make that ace 1 point rather than 11
    while (points > 21 && aceCards > 0) {
      points = points - 10;
      aceCards--;
    }
    return points;
  };

  // ====== BUSTING ======
  const bust = () => {
    const playerScore = scoreCalculation(playerHand);
    const dealerScore = scoreCalculation(dealerHand);

    if (playerScore > 21) {
      document.getElementById("messages").textContent =
        "Player busts! The dealer wins. Press 'Reset to play again";
      gameEnding = true;
    } else if (dealerScore > 21) {
      document.getElementById("messages").textContent =
        "Dealer busts. You win! Press 'Reset' to play again";
      gameEnding = true;
    }
  };

  // ====== GETTING IMAGES TO DISPLAY ======
  const imageSources = (card) => {
    const cardImg = document.createElement("img");
    if (card["rank"] === 1) {
      cardImg.src = `images/ace_of_${card["suit"]}.png`;
    } else if (card["rank"] === 11) {
      cardImg.src = `images/jack_of_${card["suit"]}.png`;
    } else if (card["rank"] === 12) {
      cardImg.src = `images/queen_of_${card["suit"]}.png`;
    } else if (card["rank"] === 13) {
      cardImg.src = `images/king_of_${card["suit"]}.png`;
    } else {
      cardImg.src = `images/${card["rank"]}_of_${card["suit"]}.png`;
    }
    return cardImg;
  };

  // ====== APPENDING IMAGES TO HANDS, APPENDING SCORES TO DEALER AND PLAYER ======
  const appendToDisplay = () => {
    //puts card currently in playerHand array into player-hand on page
    playerHandGrab.innerHTML = "";
    for (let i = 0; i < playerHand.length; i++) {
      const card = playerHand[i];
      const cardInDeckPlayer = imageSources(card);
      playerHandGrab.appendChild(cardInDeckPlayer);
    }
    //puts card currently in dealerHand array into dealer-hand on page
    dealerHandGrab.innerHTML = "";
    for (let i = 0; i < dealerHand.length; i++) {
      const card = dealerHand[i];
      const cardInDeckDealer = imageSources(card);
      dealerHandGrab.appendChild(cardInDeckDealer);
    }

    //calculate the player and dealer scores and put them on the page
    let playerScore = scoreCalculation(playerHand);
    document.getElementById("player-points").textContent = playerScore;
    let dealerScore = scoreCalculation(dealerHand);
    document.getElementById("dealer-points").textContent = dealerScore;
  };

  //====== SCORE RESULTS ======
  const compareScores = () => {
    const playerScore = scoreCalculation(playerHand);
    const dealerScore = scoreCalculation(dealerHand);

    //appends message to display depending on points calculated
    if (playerScore >= 21 && dealerScore >= 17 && playerScore >= dealerScore) {
      document.getElementById("messages").textContent =
        "Player Wins! Press 'Reset' to play again";
      gameEnding = true;
    } else if (dealerScore > playerScore) {
      document.getElementById("messages").textContent =
        "Dealer Wins! Press 'Reset' to play again";
      gameEnding = true;
    } else if (dealerScore < playerScore) {
      document.getElementById("messages").textContent =
        "Player Wins! Press 'Reset' to play again";
      gameEnding = true;
    } else if (dealerScore > 21) {
      document.getElementById("messages").textContent =
        "Player Wins! Press 'Reset' to play again";
      gameEnding = true;
    } else if (dealerScore === playerScore) {
      document.getElementById("messages").textContent =
        "It's a Draw! Press 'Reset' to play again";
      gameEnding = true;
    }
    bust();
  };

  // ============ BUTTON DOM MANIPULATION ============

  // ====== DEAL BUTTON ======
  const cardInHand = (cardDeck, handOfUser) => {
    const cardObj = cardDeck.pop();
    handOfUser.push(cardObj);
  };
  //on clicking the deal button, deal to the player and dealer and check to see if calculated points add up to 21
  dealButton.addEventListener("click", () => {
    dealButton.setAttribute("disabled", true);
    //Puts two cards in player-hand
    cardInHand(makeDeck(), playerHand);
    cardInHand(makeDeck(), playerHand);
    const playerScore = scoreCalculation(playerHand);
    //Puts two cards in dealer-hand
    cardInHand(makeDeck(), dealerHand);
    cardInHand(makeDeck(), dealerHand);
    const dealerScore = scoreCalculation(dealerHand);
    if (playerScore === 21 && dealerScore < 21) {
      document.getElementById("messages").textContent =
        "Player has 21 points! Player wins! Press 'Reset' to play again";
      gameEnding = true;
    }
    appendToDisplay();
  });

  //====== HIT BUTTON ======
  //on clicking the hit button, deal to the player and check if anyone has busted over 21
  hitButton.addEventListener("click", () => {
    cardInHand(makeDeck(), playerHand);
    bust();
    appendToDisplay();
    //if the game has ended, disable the hit and stand buttons
    if (gameEnding) {
      hitButton.setAttribute("disabled", true);
      standButton.setAttribute("disabled", true);
    }
  });

  // ====== STAND BUTTON ======
  //on clicking the stand button, the dealer must draw a card as long as they are under 17 points and updates their points
  standButton.addEventListener("click", () => {
    let dealerPoints = scoreCalculation(dealerHand);
    while (dealerPoints < 17) {
      cardInHand(makeDeck(), dealerHand);
      dealerPoints = scoreCalculation(dealerHand);
    }
    compareScores();
    appendToDisplay();
    if (gameEnding) {
      hitButton.setAttribute("disabled", true);
      standButton.setAttribute("disabled", true);
    }
  });

  //====== RESET BUTTON ======
  //on clicking the reset button will simply reload the page
  resetButton.addEventListener("click", () => {
    location.reload();
  });
});
