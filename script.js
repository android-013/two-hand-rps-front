const choices = ["rock", "paper", "scissors"];
const autoLeftHand = document.getElementById("auto-left-hand");
const autoRightHand = document.getElementById("auto-right-hand");
const playButton = document.getElementById("play-button");
const withdrawLeftButton = document.getElementById("withdraw-left-button");
const withdrawRightButton = document.getElementById("withdraw-right-button");
const playAgainButton = document.getElementById("play-again-button");
const resultDisplay = document.getElementById("result");

let playerLeftChoice = null;
let playerRightChoice = null;
let autoLeftChoice = null;
let autoRightChoice = null;

// Event listeners for player choices
document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const hand = button.getAttribute("data-hand");
    const choice = button.getAttribute("data-choice");
    if (hand === "left") {
      playerLeftChoice = choice;
    } else if (hand === "right") {
      playerRightChoice = choice;
    }
    button.classList.add("selected");
  });
});

// Play button logic
playButton.addEventListener("click", () => {
  if (playerLeftChoice && playerRightChoice) {
    // Auto chooses random moves
    autoLeftChoice = choices[Math.floor(Math.random() * 3)];
    autoRightChoice = choices[Math.floor(Math.random() * 3)];
    autoLeftHand.textContent = autoLeftChoice;
    autoRightHand.textContent = autoRightChoice;

    // Switch buttons
    playButton.classList.add("hidden");
    withdrawLeftButton.classList.remove("hidden");
    withdrawRightButton.classList.remove("hidden");
  } else {
    alert("Please select moves for both hands!");
  }
});

// Withdraw buttons logic
withdrawLeftButton.addEventListener("click", () => withdrawHand("left"));
withdrawRightButton.addEventListener("click", () => withdrawHand("right"));

function withdrawHand(playerWithdrawnHand) {
  // Auto randomly withdraws a hand
  const autoWithdrawnHand = Math.random() < 0.5 ? "left" : "right";

  // Determine remaining hands
  const playerRemainingHand = playerWithdrawnHand === "left" ? "right" : "left";
  const autoRemainingHand = autoWithdrawnHand === "left" ? "right" : "left";

  // Compare remaining hands to determine the winner
  const playerRemainingChoice = playerRemainingHand === "left" ? playerLeftChoice : playerRightChoice;
  const autoRemainingChoice = autoRemainingHand === "left" ? autoLeftChoice : autoRightChoice;

  const winner = determineWinner(playerRemainingChoice, autoRemainingChoice);

  // Display result
  resultDisplay.textContent = winner === "player" ? "You Win!" : winner === "auto" ? "Auto Wins!" : "It's a Tie!";
  resultDisplay.classList.remove("hidden");

  // Show play again button
  withdrawLeftButton.classList.add("hidden");
  withdrawRightButton.classList.add("hidden");
  playAgainButton.classList.remove("hidden");
}

// Play again button logic
playAgainButton.addEventListener("click", () => {
  resetGame();
});

// Reset game function
function resetGame() {
  playerLeftChoice = null;
  playerRightChoice = null;
  autoLeftChoice = null;
  autoRightChoice = null;
  autoLeftHand.textContent = "?";
  autoRightHand.textContent = "?";
  resultDisplay.classList.add("hidden");
  playAgainButton.classList.add("hidden");
  playButton.classList.remove("hidden");
  document.querySelectorAll(".choice").forEach(button => button.classList.remove("selected"));
}

// Determine winner function
function determineWinner(playerChoice, autoChoice) {
  if (playerChoice === autoChoice) return "tie";
  if (
    (playerChoice === "rock" && autoChoice === "scissors") ||
    (playerChoice === "paper" && autoChoice === "rock") ||
    (playerChoice === "scissors" && autoChoice === "paper")
  ) {
    return "player";
  } else {
    return "auto";
  }
}