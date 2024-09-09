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

const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

shuffleDeck(deck);

function renderDeckStack() {
    const deckStackContainer = document.querySelector('.deckStack');

    // Append each card
    deck.forEach((card, index) => {
        const cardElement = document.createElement('img');

        // Set the source to the reverse image
        cardElement.setAttribute('src', card.reverse);
        cardElement.setAttribute('alt', `${card.suit} ${card.value}`);
        cardElement.classList.add('deck-card');

        cardElement.setAttribute('draggable', 'true');
        cardElement.setAttribute('data-index', index);

        // Event listeners
        cardElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('type', 'card');
            event.dataTransfer.setData('text/plain', index.toString());
            cardGrab.play(); 
        });
        cardElement.addEventListener('dragend', handleDragEnd);

        // Offset for stack effect
        cardElement.style.top = `${index * 2}px`;  
        cardElement.style.left = `${index * 2}px`; 

        cardElement.style.zIndex = index; 

        deckStackContainer.appendChild(cardElement);
    });
}

// Shuffle and render the deck stack
shuffleDeck(deck);
renderDeckStack();