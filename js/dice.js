// Dice Functions
const diceArray = ['assets/dice/dice1.png', 'assets/dice/dice2.png', 'assets/dice/dice3.png', 'assets/dice/dice4.png', 'assets/dice/dice5.png', 'assets/dice/dice6.png'];
const diceButton = document.getElementById('rollDice');
const diceOne = document.getElementById('diceOne');
const diceTwo = document.getElementById('diceTwo');


let diceOneValue;
let diceTwoValue;

function rollDice() {
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
            // Store values and +1 for array index
            diceOneValue = diceArray.indexOf(diceOne.getAttribute('src')) + 1;
            diceTwoValue = diceArray.indexOf(diceTwo.getAttribute('src')) + 1;
            console.log(diceOneValue);
            console.log(diceTwoValue);
        }
    }
    roll();
}
diceButton.addEventListener('click', rollDice);


