const gridSquares = document.querySelectorAll('.gridSquare')

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

    // Check if the grid square is occupied with a card
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

// If this is a deck card then add the card
//
    const cardImg = document.createElement('img');
    cardImg.setAttribute('src', cardData.img); //<--- Trying to access this with the dice

// instead if it is a dice, update the cards value
//

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
