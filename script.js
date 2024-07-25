const playButton = document.getElementById("playButton");
const loadingIndicator = document.querySelector(".loading"); 
const gameCountSpan = document.getElementById('gameCount'); 
const progressBarFill = document.querySelector(".progress-fill"); // Get progress bar element

playButton.addEventListener("click", () => {
  loadingIndicator.style.display = "block"; 

  // Simulate loading progress (replace with actual fetch logic)
  let progress = 0;
  const interval = setInterval(() => {
    progress += 5; // Increment progress by 5%
    progressBarFill.style.width = `${progress}%`; 
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 100); // Update progress every 100 milliseconds

  fetch("redirect.json")
    .then((response) => response.json())
    .then((data) => {
      loadingIndicator.style.display = "none"; 
      const randomIndex = Math.floor(Math.random() * data.games.length);
      const randomGameLink = data.games[randomIndex];

      // Only redirect if the game link is not empty
      if (randomGameLink.trim() !== "") {
        window.location.href = randomGameLink;
      } else {
        // Redirect to error page if the game link is empty
        window.location.href = "error.html";
      }
    })
    .catch((error) => {
      loadingIndicator.style.display = "none"; 
      window.location.href = "error.html"; 
    });
});

// Count and display the number of games
fetch("redirect.json")
  .then((response) => response.json())
  .then((data) => {
    const gameCount = data.games.filter((game) => game.trim() !== "").length; 
    gameCountSpan.textContent = `There are ${gameCount} games`; 
  });
