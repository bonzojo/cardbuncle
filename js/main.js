const gridSquares = document.querySelectorAll('.gridSquare');

// Variables to track selected cards
let selectedCards = [];

// Drag handlers
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.getAttribute('data-index'));
    event.target.classList.add('dragging');
}
function handleDragEnd(event) {
    event.target.classList.remove('dragging');
}
function handleDragOver(event) {
    event.preventDefault();
}
// Handle drop event for grid squares
function handleDrop(event) {
    event.preventDefault();
    
    const itemType = event.dataTransfer.getData('type'); // Get the type of item being dragged ('card' or 'dice')
    const gridSquare = event.currentTarget;

    // Handle dropping cards
    if (itemType === 'card') {
        const cardIndex = event.dataTransfer.getData('text/plain');
        const cardData = deck[cardIndex];

        if (gridSquare.querySelector('.card-container')) {
            // Return the card to the deck
            return;
            
        }

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.setAttribute('data-card-index', cardIndex); // Store index for reference
        cardContainer.addEventListener('click', handleCardClick); // Add click handler
        cardPlace.play();
        const cardImg = document.createElement('img');
        cardImg.setAttribute('src', cardData.img);
        cardImg.setAttribute('data-card-id', cardIndex); 
        cardImg.setAttribute('draggable', 'false'); // Prevent dragging

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

    // Handle dropping dice
    } else if (itemType === 'dice') {
        const diceId = event.dataTransfer.getData('text/plain');
    
        // Check if the dice is already used
        if (diceUsed[diceId]) {
            return; // Prevent using the dice again
        }
    
        diceUsed[diceId] = true;
    
        // Hide the dice image
        const diceElement = document.getElementById(diceId);
        if (diceElement) {
            diceElement.style.display = 'none';
        }
    
        // Check if there's a card on the gridSquare to update its value
        const cardContainer = gridSquare.querySelector('.card-container');
        if (cardContainer) {
            const cardValueElement = cardContainer.querySelector('.card-value');
            if (cardValueElement) {
                const diceValue = diceValues[diceId];
                cardValueElement.textContent = diceValue; // Update the card value with the dice value
                buff.play();
            }
        }
    }
}

function handleCardClick(event) {
    const cardContainer = event.currentTarget;

    // Deselect if already selected
    if (selectedCards.includes(cardContainer)) {
        cardContainer.classList.remove('selected');
        selectedCards = selectedCards.filter(card => card !== cardContainer);
        return;
    }

    // Select the card
    cardContainer.classList.add('selected');
    selectedCards.push(cardContainer);
    select.play();

    // Check if two cards are selected
    if (selectedCards.length === 2) {
        const [card1, card2] = selectedCards;
        const cardValue1 = card1.querySelector('.card-value').textContent;
        const cardValue2 = card2.querySelector('.card-value').textContent;
        const cardIndex1 = card1.getAttribute('data-card-index');
        const cardIndex2 = card2.getAttribute('data-card-index');
        const cardData1 = deck[cardIndex1];
        const cardData2 = deck[cardIndex2];

        // Compare values and suits
        if (cardValue1 === cardValue2 && cardData1.suit === cardData2.suit) {
            poof.play();

            const smokeCloud1 = document.createElement('div');
            const smokeCloud2 = document.createElement('div');
            smokeCloud1.className = 'smoke-cloud';
            smokeCloud2.className = 'smoke-cloud';

            const rect1 = card1.getBoundingClientRect();
            const rect2 = card2.getBoundingClientRect();

            const centerX1 = rect1.left + (rect1.width / 4);
            const centerY1 = rect1.top + (rect1.height / 4);
            const centerX2 = rect2.left + (rect2.width / 4);
            const centerY2 = rect2.top + (rect2.height / 4);

            smokeCloud1.style.position = 'absolute';
            smokeCloud1.style.left = `${centerX1}px`;
            smokeCloud1.style.top = `${centerY1}px`;
            smokeCloud1.style.transform = 'translate(-50%, -50%)';
            
            smokeCloud2.style.position = 'absolute';
            smokeCloud2.style.left = `${centerX2}px`;
            smokeCloud2.style.top = `${centerY2}px`;
            smokeCloud2.style.transform = 'translate(-50%, -50%)';

            document.body.appendChild(smokeCloud1);
            document.body.appendChild(smokeCloud2);

            card1.parentElement.removeChild(card1);
            card2.parentElement.removeChild(card2);

            rollDice();

            setTimeout(() => {
                document.body.removeChild(smokeCloud1);
                document.body.removeChild(smokeCloud2);
            }, 1000);
        } else {
            // Deselect if values or suits don't match
            setTimeout(() => {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
            }, 500);
        }

        selectedCards = [];
    }
}

gridSquares.forEach(gridSquare => {
    gridSquare.addEventListener('dragover', handleDragOver);
    gridSquare.addEventListener('drop', handleDrop);
});

// Start Again?
const reshuffle = document.getElementById('startAgain');

function resetGame() {

    diceOne.style.display = 'inline-block';
    diceTwo.style.display = 'inline-block';
    diceOne.setAttribute('src', './assets/dice/dice1.png');
    diceTwo.setAttribute('src', './assets/dice/dice1.png');
    diceValues = { diceOne: 1, diceTwo: 1 };
    diceUsed = { diceOne: false, diceTwo: false };

    gridSquares.forEach(square => {
        const cardContainer = square.querySelector('.card-container');
        if (cardContainer) {
            square.removeChild(cardContainer);
        }
    });

    shuffleDeck(deck);
    renderDeckStack();
}

reshuffle.addEventListener('click', resetGame);