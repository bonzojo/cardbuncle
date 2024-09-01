// Dice Functions
const diceArray = ['assets/dice/dice1.png', 'assets/dice/dice2.png', 'assets/dice/dice3.png', 'assets/dice/dice4.png', 'assets/dice/dice5.png', 'assets/dice/dice6.png'];
const diceButton = document.getElementById('rollDice');
const diceOne = document.getElementById('diceOne');
const diceTwo = document.getElementById('diceTwo');

let diceValues = { diceOne: 1, diceTwo: 1 };
let diceUsed = { diceOne: false, diceTwo: false };

function showDice() {
    diceOne.style.display = 'inline-block';
    diceTwo.style.display = 'inline-block'; 
}

function rollDice() {
    showDice();
    diceRoll.play();
    let interval = 0;
    const increment = 12;
    const maxSteps = 16;
    let currentStep = 0;

    function updateDice() {
        diceOne.setAttribute('src', diceArray[Math.floor(Math.random() * diceArray.length)]);
        diceTwo.setAttribute('src', diceArray[Math.floor(Math.random() * diceArray.length)]);
    }

    function roll() {
        if (currentStep < maxSteps) {
            updateDice();
            currentStep++;
            interval += increment;
            setTimeout(roll, interval);
        } else {
            diceValues = {
                diceOne: diceArray.indexOf(diceOne.getAttribute('src')) + 1,
                diceTwo: diceArray.indexOf(diceTwo.getAttribute('src')) + 1
            };
            diceUsed = { diceOne: false, diceTwo: false }; // Reset diceUsed state for new roll
        }
    }
    roll();
}

diceButton.addEventListener('click', rollDice);

// Add event listeners to the dice elements
diceOne.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('type', 'dice');
    event.dataTransfer.setData('text/plain', 'diceOne');
    crystalHum.play();
    gridSquares.forEach(square => square.classList.add('pulsing-glow'));

});
diceTwo.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('type', 'dice');
    event.dataTransfer.setData('text/plain', 'diceTwo');
    crystalHum.play();
    gridSquares.forEach(square => square.classList.add('pulsing-glow'));
});

diceOne.addEventListener('dragend', () => {
    crystalHum.stop();
    gridSquares.forEach(square => square.classList.remove('pulsing-glow'));
});
diceTwo.addEventListener('dragend', () => {
    crystalHum.stop();
    gridSquares.forEach(square => square.classList.remove('pulsing-glow'));
});
