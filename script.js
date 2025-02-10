let playerChoices = { left: "", right: "" };
let autoChoices = { left: "", right: "" };
let withdrawnHand = { player: "", auto: "" };
let resultDisplay = document.getElementById("result");
let isPlaying = false;

const autoLeftDisplay = document.getElementById("auto-left");
const autoRightDisplay = document.getElementById("auto-right");
const choiceBtns = document.querySelectorAll(".choice-btn");
const withdrawLeftBtn = document.getElementById("withdraw-left");
const withdrawRightBtn = document.getElementById("withdraw-right");
const playBtn = document.getElementById("playBtn");

// Player selects choices for both hands
choiceBtns.forEach(button => {
    button.addEventListener("click", () => {
        if (isPlaying) return;
        let hand = button.dataset.hand; // "left" or "right"
        playerChoices[hand] = button.innerHTML;
        button.classList.add("selected"); // Highlight selected
    });
});

// Start Game
playBtn.addEventListener("click", async () => {
    if (isPlaying) return;
    if (!playerChoices.left || !playerChoices.right) {
        resultDisplay.textContent = "Select moves for both hands!";
        return;
    }

    isPlaying = true;
    playBtn.disabled = true;
    resultDisplay.textContent = "Auto is choosing...";

    await showAutoChoiceAnimation(); // Simulate AI picking choices

    autoChoices.left = getRandomChoice();
    autoChoices.right = getRandomChoice();

    // Show Auto's moves
    autoLeftDisplay.innerHTML = autoChoices.left;
    autoRightDisplay.innerHTML = autoChoices.right;

    resultDisplay.textContent = "Choose a hand to withdraw!";
    enableWithdrawButtons();
});

// Withdraw a hand
withdrawLeftBtn.addEventListener("click", () => handleWithdrawal("left"));
withdrawRightBtn.addEventListener("click", () => handleWithdrawal("right"));

function handleWithdrawal(playerHand) {
    if (!isPlaying || withdrawnHand.player) return;

    withdrawnHand.player = playerHand;
    withdrawnHand.auto = Math.random() < 0.5 ? "left" : "right";

    document.getElementById(`auto-${withdrawnHand.auto}`).style.opacity = 0.5; // Dim withdrawn hand
    resultDisplay.textContent = "Determining winner...";
    
    setTimeout(determineWinner, 1000);
}

function getRandomChoice() {
    const choices = ["🪨", "📄", "✂️"];
    return choices[Math.floor(Math.random() * choices.length)];
}

async function showAutoChoiceAnimation() {
    const choices = ["🪨", "📄", "✂️"];
    for (let i = 0; i < 3; i++) {
        for (let choice of choices) {
            autoLeftDisplay.innerHTML = choice;
            autoRightDisplay.innerHTML = choice;
            await delay(100);
        }
    }
}

function determineWinner() {
    let playerFinalHand = withdrawnHand.player === "left" ? playerChoices.right : playerChoices.left;
    let autoFinalHand = withdrawnHand.auto === "left" ? autoChoices.right : autoChoices.left;

    if (playerFinalHand === autoFinalHand) {
        resultDisplay.textContent = "It's a draw!";
    } else if (
        (playerFinalHand === "🪨" && autoFinalHand === "✂️") ||
        (playerFinalHand === "📄" && autoFinalHand === "🪨") ||
        (playerFinalHand === "✂️" && autoFinalHand === "📄")
    ) {
        resultDisplay.textContent = "You win!";
    } else {
        resultDisplay.textContent = "You lose!";
    }

    resetGame();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function enableWithdrawButtons() {
    withdrawLeftBtn.disabled = false;
    withdrawRightBtn.disabled = false;
}

function resetGame() {
    setTimeout(() => {
        playerChoices = { left: "", right: "" };
        autoChoices = { left: "", right: "" };
        withdrawnHand = { player: "", auto: "" };
        autoLeftDisplay.innerHTML = "❔";
        autoRightDisplay.innerHTML = "❔";
        resultDisplay.textContent = "";

        playBtn.disabled = false;
        isPlaying = false;
    }, 2000);
}
