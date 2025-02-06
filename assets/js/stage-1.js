// Predefined set of colors for the game
const colors = [
    '#FF5733', // red-orange
    '#33FF57', // green
    '#3357FF', // blue
    '#F1C40F', // yellow
    '#9B59B6', // purple
    '#BAF400', // my-color
    '#1ABC9C', // teal
    '#E74C3C', // red
    '#f2f2f2', // white
    '#3498DB'  // sky blue
  ];
  
  let targetColor = '';
  let score = 0;
  let highestScore = 0;
  
  // Grab DOM elements
  const colorBox = document.querySelector('[data-testid="colorBox"]');
  const optionsContainer = document.querySelector('.options-container');
  const gameStatus = document.querySelector('[data-testid="gameStatus"]');
  const scoreDisplay = document.querySelector('[data-testid="score"]');
  const newGameButton = document.querySelector('[data-testid="newGameButton"]');
  const highestScoreButton = document.querySelector('[data-testid="showHighestScore"]');
  
  // Function to generate a random color from the colors array
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  
  // Function to set up a new round of the game
  function setupGame() {
    // Reset game status text
    gameStatus.textContent = 'Make your guess';
    
    // Clear previous options if any
    optionsContainer.innerHTML = '';
  
    // Randomly choose a target color and set it as the background of the colorBox
    targetColor = getRandomColor();
    colorBox.style.backgroundColor = targetColor;
  
    // Generate 6 color options (one of them is the target color)
    const options = [];
    const correctAnswerIndex = Math.floor(Math.random() * 6);
    
    for (let i = 0; i < 6; i++) {
      if (i === correctAnswerIndex) {
        options.push(targetColor);
      } else {
        let wrongColor;
        do {
          wrongColor = getRandomColor();
        } while (wrongColor === targetColor);
        options.push(wrongColor);
      }
    }
    
    // Optional: Shuffle the options array further (if desired)
    options.sort(() => Math.random() - 0.5);
  
    // Create and append buttons for each color option
    options.forEach(color => {
      const btn = document.createElement('button');
      btn.style.backgroundColor = color;
      btn.setAttribute('data-testid', 'colorOption');
      btn.addEventListener('click', () => checkGuess(color));
      optionsContainer.appendChild(btn);
    });
  }
  
  // Function to check the player's guess
  function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
      gameStatus.textContent = 'Correct! 🎉';
      score += 10;
      if (score > highestScore) highestScore = score;
      scoreDisplay.textContent = `Score: ${score}`;
      colorBox.classList.add('correct');
    } else {
      gameStatus.textContent = 'Wrong! Try again.';
      score -= 10;
      scoreDisplay.textContent = `Score: ${score}`;
      colorBox.classList.add('wrong');
    }
    
    // After a brief delay, reset the game for the next round
    setTimeout(() => {
      colorBox.classList.remove('correct', 'wrong');
      setupGame();
    }, 500);
  }
  
  // Event listener for the New Game button – resets the score and starts over
  newGameButton.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameStatus.textContent = 'Make your guess';
    setupGame();
  });
  
  // Event listener for the Highest Score button – displays the highest score
  highestScoreButton.addEventListener('click', () => {
    alert(`Highest Score: ${highestScore}`);
  });
  
  // Initialize the game on page load
  setupGame();
  