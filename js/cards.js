
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
        cardElement.classList.add('deck-card'); 

        cardElement.setAttribute('draggable', 'true');
        cardElement.setAttribute('data-index', index);

        //event listeners
        cardElement.addEventListener('dragstart', handleDragStart);
        cardElement.addEventListener('dragend', handleDragEnd);

        // offset for stack effect
        cardElement.style.top = `${index * 2}px`;  
        cardElement.style.left = `${index * 2}px`; 

        cardElement.style.zIndex = index; 

        deckStackContainer.appendChild(cardElement);
    });
}


// Shuffle and render the deck stack
shuffleDeck(deck);
renderDeckStack();
console.log(deck);
