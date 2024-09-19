//--------------------
// Globals
//--------------------

//Dice
const diceArray = ['assets/dice/dice1.png', 'assets/dice/dice2.png', 'assets/dice/dice3.png', 'assets/dice/dice4.png', 'assets/dice/dice5.png', 'assets/dice/dice6.png'];

const diceButton = document.getElementById('rollDice'); // Roll dice button

const diceOne = document.getElementById('diceOne');
const diceTwo = document.getElementById('diceTwo');

let diceValues = { diceOne: 1, diceTwo: 1 };
let diceUsed = { diceOne: false, diceTwo: false };

//Deck & Cards
const deckStack = document.querySelector('.deckStack');
let deck;
// Track the selected card
let selectedCard = null;
let isDragging = false;


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

//Board
const gridSquares = document.querySelectorAll('.gridSquare');

//--------------------
// Event Listeners
//--------------------

$(document).ready(function() {
    // Create Deck
    deck = createDeck(suits, values);
    renderDeckStack();


    console.log(deck);
});



//--------------------
// Functions
//--------------------

function createDeck(suits, values) {
    const deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            const uniqueId = `${suits[i].name[0]}-${values[j]}-${i * values.length + j}`;
            deck.push({
                id: uniqueId,
                suit: suits[i].name,
                value: values[j],
                img: suits[i].img,
                reverse: suits[i].reverse
            });
        }
    }
    shuffleDeck(deck);
    return deck;

}
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}
function renderDeckStack() {
    const deckStackContainer = document.querySelector('.deckStack');

    // Append each card
    deck.forEach((card, index) => {
        // Creates Img element
        const cardElement = document.createElement('img');

        // Set the source to the reverse image
        cardElement.setAttribute('src', card.reverse);
        cardElement.setAttribute('alt', `${card.suit} ${card.value}`);
        cardElement.classList.add('deck-card');
        cardElement.setAttribute('data-index', index);

        // Offset for stack effect
        cardElement.style.top = `${index * 2}px`;  
        cardElement.style.left = `${index * 2}px`; 

        cardElement.style.zIndex = index; 

        deckStackContainer.appendChild(cardElement);
    });
}


// Function to start dragging a card
function startDragging(event) {
    if (isDragging) return; // Prevent multiple selections
    selectedCard = event.target;
    selectedCard.classList.add('selected');
    isDragging = true;
}

// Function to update the position of the card
function dragCard(event) {
    if (!isDragging || !selectedCard) return;
    
    const x = event.clientX - selectedCard.clientWidth / 2;
    const y = event.clientY - selectedCard.clientHeight / 2;
    
    selectedCard.style.position = 'absolute';
    selectedCard.style.left = `${x}px`;
    selectedCard.style.top = `${y}px`;
}













//--------------------
// Sounds
//--------------------

//Initialize Sounds// Function to create a Howl object
function createSound(src, volume) {
    return new Howl({
      src: [src],
      volume: volume,
    });
  }
  
  // Initialize Sounds using the factory function
  const cardGrab = createSound('../assets/sfx/cardGrab.mp3', 0.2);
  const cardPlace = createSound('../assets/sfx/cardPlace.mp3', 0.1);
  const select = createSound('../assets/sfx/select.mp3', 0.2);
  const poof = createSound('../assets/sfx/poof.mp3', 0.8);
  const diceRoll = createSound('../assets/sfx/diceRoll.mp3', 0.2);
  const buff = createSound('../assets/sfx/buff.mp3', 0.1);
  const crystalHum = createSound('../assets/sfx/crystalHum.mp3', 0.4);