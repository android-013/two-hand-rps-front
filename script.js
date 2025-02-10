// DOM Elements
const autoLeftHand = document.getElementById("auto-left-hand");
const autoRightHand = document.getElementById("auto-right-hand");
const playButton = document.getElementById("play-button");
const withdrawLeftButton = document.getElementById("withdraw-left-button");
const withdrawRightButton = document.getElementById("withdraw-right-button");
const resultDiv = document.getElementById("result");

// Game State
let playerLeftChoice = null;
let playerRightChoice = null;
let autoLeftChoice = null;
let autoRightChoice = null;

// Choices
const choices = ["rock", "paper", "scissors"];

// Event Listeners for Player Choices
document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", (e) => {
    const hand = e.target.getAttribute("data-hand");
    const choice = e.target.getAttribute("data-choice");

    if (hand === "left") {
      playerLeftChoice = choice;
    } else if (hand === "right") {
      playerRightChoice = choice;
    }

    // Enable Play button if both hands are chosen
    if (playerLeftChoice && playerRightChoice) {
      playButton.disabled = false;
    }
  });
});

// Play Button
playButton.addEventListener("click", () => {
  // Randomly select auto choices
  autoLeftChoice = choices[Math.floor(Math.random() * choices.length)];
  autoRightChoice = choices[Math.floor(Math.random() * choices.length)];

  // Display auto choices
  autoLeftHand.textContent = autoLeftChoice;
  autoRightHand.textContent = autoRightChoice;

  // Change buttons to withdraw options
  playButton.classList.add("hidden");
  withdrawLeftButton.classList.remove("hidden");
  withdrawRightButton.classList.remove("hidden");
});

// Withdraw Buttons
withdrawLeftButton.addEventListener("click", () => withdrawHand("left"));
withdrawRightButton.addEventListener("click", () => withdrawHand("right"));

// Withdraw Hand Logic
function withdrawHand(hand) {
  // Player withdraws a hand
  if (hand === "left") {
    playerLeftChoice = null;
  } else if (hand === "right") {
    playerRightChoice = null;
  }

  // Auto randomly withdraws a hand
  const autoWithdraw = Math.random() < 0.5 ? "left" : "right";
  if (autoWithdraw === "left") {
    autoLeftChoice = null;
  } else {
    autoRightChoice = null;
  }

  // Determine remaining hands
  const playerRemainingHand = playerLeftChoice || playerRightChoice;
  const autoRemainingHand = autoLeftChoice || autoRightChoice;

  // Determine the winner
  if (!playerRemainingHand || !autoRemainingHand) {
    resultDiv.textContent = "Invalid game state!";
    return;
  }

  const winner = determineWinner(playerRemainingHand, autoRemainingHand);
  resultDiv.textContent = winner === "draw" ? "It's a draw!" : `${winner} wins!`;

  // Reset game state
  resetGame();
}

// Determine Winner Logic
function determineWinner(player, auto) {
  if (player === auto) return "draw";
  if (
    (player === "rock" && auto === "scissors") ||
    (player === "paper" && auto === "rock") ||
    (player === "scissors" && auto === "paper")
  ) {
    return "Player";
  }
  return "Auto";
}

// Reset Game
function resetGame() {
  playerLeftChoice = null;
  playerRightChoice = null;
  autoLeftChoice = null;
  autoRightChoice = null;

  autoLeftHand.textContent = "?";
  autoRightHand.textContent = "?";

  withdrawLeftButton.classList.add("hidden");
  withdrawRightButton.classList.add("hidden");
  playButton.classList.remove("hidden");
  playButton.disabled = true;
}