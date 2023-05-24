// Función para que la IA juegue una carta
function playAICard() {
  const aiHandElement = document.getElementById("ai-hand");
  const cards = aiHandElement.getElementsByClassName("card");

  // Estrategia: Jugar la carta más alta
  let selectedCardIndex = getHighestCardIndex(aiHand);

  // Estrategia: Jugar una carta del mismo palo que la última carta jugada por el jugador
  const lastPlayedCard = getLastPlayedCard();
  if (lastPlayedCard) {
    const sameSuitCards = getCardsBySuit(aiHand, getCardSuit(lastPlayedCard));
    if (sameSuitCards.length > 0) {
      selectedCardIndex = getHighestCardIndex(sameSuitCards);
    }
  }

  // Estrategia: Jugar una carta alta si hay muchas cartas del mismo palo en la mano
  const numSameSuitCards = countCardsBySuit(aiHand, getCardSuit(aiHand[selectedCardIndex]));
  if (numSameSuitCards > 2) {
    const highCards = getHighCards(sameSuitCards);
    if (highCards.length > 0) {
      selectedCardIndex = getHighestCardIndex(highCards);
    }
  }

  // Obtener la carta seleccionada
  const selectedCard = cards[selectedCardIndex];

  // Quitar la carta de la mano de la IA y agregar la clase "played" para mostrarla como jugada
  aiHand.splice(selectedCardIndex, 1);
  selectedCard.classList.add("played");

  // Actualizar el turno actual al jugador
  currentPlayer = "player";

  // Aquí puedes agregar la lógica adicional para el juego después de que la IA juegue una carta

  // Renderizar la mano de la IA actualizada
  renderAIHand();
}

// Función para obtener el índice de la carta más alta en una mano
function getHighestCardIndex(hand) {
  let highestCardIndex = 0;
  let highestCardValue = getCardValue(hand[0]);

  for (let i = 1; i < hand.length; i++) {
    const cardValue = getCardValue(hand[i]);
    if (cardValue > highestCardValue) {
      highestCardValue = cardValue;
      highestCardIndex = i;
    }
  }

  return highestCardIndex;
}

// Función para obtener el palo de una carta
function getCardSuit(card) {
  return card.split("de ")[1];
}

// Función para obtener el valor numérico de una carta
function getCardValue(card) {
  const cardValue = card.split(" ")[0];
  return parseInt(cardValue);
}

// Función para obtener las cartas de un palo específico en una mano
function getCardsBySuit(hand, suit) {
  return hand.filter(card => getCardSuit(card) === suit);
}

// Función para obtener las cartas altas de un conjunto de cartas
function getHighCards(cards) {
  return cards.filter(card => getCardValue(card) >= 10);
}

// Función para contar las cartas de un palo específico en una mano
function countCardsBySuit(hand, suit) {
  return getCardsBySuit(hand, suit).length;
}

// Función para obtener la última carta jugada por el jugador
function getLastPlayedCard() {
  const playerHandElement = document.getElementById("player-hand");
  const playedCards = playerHandElement.getElementsByClassName("played");
  if (playedCards.length > 0) {
    return playedCards[playedCards.length - 1].textContent;
  }
  return null;
}

// Dentro de la función startGame(), agrega la llamada a playAICard() después de renderAIHand()
function startGame() {
  // ...

  renderAIHand();
  playAICard();
}
