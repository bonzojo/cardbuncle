// Element Selectors for How To Play
const witButton = document.getElementById('whatIsThis');
const witDescription = document.getElementById('witContainer');

// Add click event listener to htp button
witButton.addEventListener('click', function(){
    if(witDescription.style.display === 'none'){
        witDescription.style.display = 'block';
    } else {
        witDescription.style.display = 'none';
    }
});

// Dice Functions
const diceArray = ['assetts/dice/dice1.png', 'assetts/dice/dice2.png', 'assetts/dice/dice3.png', 'assetts/dice/dice4.png', 'assetts/dice/dice5.png', 'assetts/dice/dice6.png'];
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
        }
    }
    roll();
}
diceButton.addEventListener('click', rollDice);



// Define suits and values
const transparentReverse = [
    { name: 'Reverse', img: 'assetts/cards/CardReverse.png'},
    { name: 'Transparent', img: 'assetts/cards/CardTransparent'},
]
const suits = [
    { name: 'Dragon', img: 'assetts/cards/DragonCard.png'},
    { name: 'Kraken', img: 'assetts/cards/KrakenCard.png'},
    { name: 'Unicorn', img: 'assetts/cards/UnicornCard.png'},
    { name: 'fairy', img: 'assetts/cards/FairyCard.png'},
    { name: 'Gargoyle', img: 'assetts/cards/GargoyleCard.png'},
    { name: 'Gryphon', img: 'assetts/cards/GryphonCard.png'},
    { name: 'Joker', img: 'assetts/cards/JokerCard.png'},
    { name: 'Mermaid', img: 'assetts/cards/MermaidCard.png'}
];
const values = ['1','2','3','4','5','6','7'];

// Initialise empty array to hold the deck of cards
let deck = [];

// Create the deck
for (const suit of suits) {
    for (const value of values) {
        deck.push({ suit: suit.name, value: value, img: suit.img});
    }
}

// Shuffle the deck
const shuffleDeck = (deck) => {
    for (let i = deck.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Shuffle Board button - temp
const shuffleBtn = document.getElementById('refreshBoard');
shuffleBtn.addEventListener('click', () => {
    // Remove old elements
    gridSquares.forEach(gridSquare => {
        while (gridSquare.firstChild) {
            gridSquare.removeChild(gridSquare.firstChild);
        }
    });

    shuffleDeck(deck);
    generateBoard();

})

// Get Grid Squares id
const gridSquares = document.querySelectorAll('.gridSquare')

function generateBoard() {
    gridSquares.forEach((gridSquare, index) => {

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        const cardImg = document.createElement('img');
        cardImg.setAttribute('src', deck[index].img);

        const cardValue = document.createElement('div');
        cardValue.classList.add('card-value');
        cardValue.textContent= deck[index].value;

        cardContainer.appendChild(cardImg);
        cardContainer.appendChild(cardValue);

        gridSquare.innerHTML = '';
        gridSquare.appendChild(cardContainer);
        

    })
}

shuffleDeck(deck)
console.log(deck);