//How To Play
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



// Define suits and values
const transparentReverse = [
    { name: 'Reverse', img: 'assets/cards/CardReverse.png'},
    { name: 'Transparent', img: 'assets/cards/CardTransparent'},
]
// Define suits and values
const suits = [
    { name: 'Dragon', img: 'assets/cards/DragonCard.png', reverse: 'assets/cards/CardReverse.png'},
    { name: 'Kraken', img: 'assets/cards/KrakenCard.png', reverse: 'assets/cards/CardReverse.png'},
    { name: 'Unicorn', img: 'assets/cards/UnicornCard.png', reverse: 'assets/cards/CardReverse.png'},
    { name: 'Fairy', img: 'assets/cards/FairyCard.png', reverse: 'assets/cards/CardReverse.png'},
    { name: 'Gargoyle', img: 'assets/cards/GargoyleCard.png', reverse: 'assets/cards/CardReverse.png'},
    { name: 'Gryphon', img: 'assets/cards/GryphonCard.png', reverse: 'assets/cards/CardReverse.png'},
    { name: 'Joker', img: 'assets/cards/JokerCard.png', reverse: 'assets/cards/CardReverse.png'},
    { name: 'Mermaid', img: 'assets/cards/MermaidCard.png', reverse: 'assets/cards/CardReverse.png'}
];

const values = ['1', '2', '3', '4', '5', '6'];
const gridSquares = document.querySelectorAll('.gridSquare')

let deck = [];

// Create the deck
for (const suit of suits) {
    for (const value of values) {
        deck.push({ suit: suit.name, value: value, img: suit.img, reverse: suit.reverse });
    }
}

// Shuffle the deck
const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function renderDeckStack() {
    const deckStackContainer = document.querySelector('.deckStack');

    deckStackContainer.innerHTML = ' '; 

    // append each card
    deck.forEach((card, index) => {
        const cardElement = document.createElement('img');

        // Set the source to the reverse image
        cardElement.setAttribute('src', card.reverse);
        cardElement.setAttribute('alt', `${card.suit} ${card.value}`);
        cardElement.classList.add('deck-card'); // Add a class for styling

        cardElement.setAttribute('draggable', 'true');
        cardElement.setAttribute('data-index', index);

        //event listeners
        cardElement.addEventListener('dragstart', handleDragStart);
        cardElement.addEventListener('dragend', handleDragEnd);

        // offset for stack effect
        cardElement.style.top = `${index * 2}px`;  // Adjust the '2px' for desired vertical spacing
        cardElement.style.left = `${index * 2}px`; // Adjust the '2px' for desired horizontal spacing

        cardElement.style.zIndex = index; 

        deckStackContainer.appendChild(cardElement);
    });
}

//Drag handlers
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.getAttribute('data-index'));
    event.target.classList.add('dragging');
}

function handleDragEnd(event) {
    event.target.classList.remove('dragging');
}

function handleDragOver(event) {
    event.preventDefault();

    const gridSquare = event.currentTarget;

    // Check if the grid square is occupied
    if (gridSquare.querySelector('.card-container')) {
        gridSquare.classList.add('occupied');
        event.dataTransfer.dropEffect = 'none'; 
    } else {
        gridSquare.classList.remove('occupied');
        event.dataTransfer.dropEffect = 'move'; 
    }
}
function handleDragLeave(event) {
    const gridSquare = event.currentTarget;
    gridSquare.classList.remove('occupied');
}


function handleDrop(event) {
    event.preventDefault();
    const cardIndex = event.dataTransfer.getData('text/plain');
    const cardData = deck[cardIndex];

    const gridSquare = event.currentTarget;

    if (gridSquare.querySelector('.card-container')) {
        // Return the card to the deck
        deck.push({
            suit: cardData.suit,
            value: cardData.value,
            img: cardData.img,
            reverse: cardData.reverse
        });

        return;
    }

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const cardImg = document.createElement('img');
    cardImg.setAttribute('src', cardData.img);

    const cardValue = document.createElement('div');
    cardValue.classList.add('card-value');
    cardValue.textContent = cardData.value;

    cardContainer.appendChild(cardImg);
    cardContainer.appendChild(cardValue);
    gridSquare.appendChild(cardContainer);

    // Remove the card from the deck stack
    const deckStackContainer = document.querySelector('.deckStack');
    const deckCard = deckStackContainer.querySelector(`img[data-index='${cardIndex}']`);
    if (deckCard) deckStackContainer.removeChild(deckCard);
}

// drag event handlers
gridSquares.forEach(gridSquare => {
    gridSquare.addEventListener('dragover', handleDragOver);
    gridSquare.addEventListener('dragleave', handleDragLeave);
    gridSquare.addEventListener('drop', handleDrop);
});
// Shuffle and render the deck stack
shuffleDeck(deck);
renderDeckStack();
console.log(deck);
