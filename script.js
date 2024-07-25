const playButton = document.getElementById("playButton");
const loadingIndicator = document.querySelector(".loading"); 
const errorMessage = document.createElement('p'); // Create an error message element
errorMessage.style.color = 'red';
errorMessage.style.textAlign = 'center';
const gameCountSpan = document.getElementById('gameCount'); // Get the game count span

playButton.addEventListener("click", () => {
  loadingIndicator.style.display = "block"; 
  fetch("redirect.json")
    .then((response) => response.json())
    .then((data) => {
      loadingIndicator.style.display = "none";
      const randomIndex = Math.floor(Math.random() * data.games.length);
      const randomGameLink = data.games[randomIndex];
      window.location.href = randomGameLink;
    })
    .catch((error) => {
      loadingIndicator.style.display = "none"; 
      errorMessage.textContent = "Oops! Something went wrong. Please try again later.";
      document.body.appendChild(errorMessage); // Add the error message to the body
    });
});

// Count and display the number of games
fetch("redirect.json")
  .then((response) => response.json())
  .then((data) => {
    const gameCount = data.games.filter((game) => game.trim() !== "").length; 
    gameCountSpan.textContent = `There are ${gameCount} random games`; 
  });