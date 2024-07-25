const playButton = document.getElementById("playButton");
const loadingIndicator = document.querySelector(".loading"); 
const errorMessage = document.createElement('p'); // Create an error message element
errorMessage.style.color = 'red';
errorMessage.style.textAlign = 'center';

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
