document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play-button");
    const playerLeft = document.getElementById("player-left");
    const playerRight = document.getElementById("player-right");
    const autoLeft = document.getElementById("auto-left");
    const autoRight = document.getElementById("auto-right");
    const resultText = document.getElementById("result-text");

    const choices = ["rock", "paper", "scissors"];

    function getRandomChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineWinner(player, auto) {
        if (player === auto) return "It's a tie!";
        if (
            (player === "rock" && auto === "scissors") ||
            (player === "paper" && auto === "rock") ||
            (player === "scissors" && auto === "paper")
        ) {
            return "You win!";
        }
        return "Auto wins!";
    }

    playButton.addEventListener("click", () => {
        // Auto selects moves
        const autoMoveLeft = getRandomChoice();
        const autoMoveRight = getRandomChoice();

        // Display auto moves
        autoLeft.textContent = autoMoveLeft;
        autoRight.textContent = autoMoveRight;

        // Get player moves
        const playerMoveLeft = playerLeft.value;
        const playerMoveRight = playerRight.value;

        // Simulate hand withdrawal (randomly pick one hand)
        const playerFinalMove = Math.random() < 0.5 ? playerMoveLeft : playerMoveRight;
        const autoFinalMove = Math.random() < 0.5 ? autoMoveLeft : autoMoveRight;

        // Determine winner
        resultText.textContent = determineWinner(playerFinalMove, autoFinalMove);
    });
});
