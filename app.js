document.addEventListener('DOMContentLoaded', () => {
  //card names and images

  const gridSize = 12;
  const cardArray = [
    // originals
    {name: 'flower', img: 'images/flower.jpg'},
    {name: 'ghost', img: 'images/ghost.jpg'},
    {name: 'yoshi', img: 'images/yoshi.jpg'},
    {name: 'luigi', img: 'images/luigi.jpg'},
    {name: 'mario', img: 'images/mario.jpg'},
    {name: 'star', img: 'images/star.jpg'},
    // twins
    {name: 'flower', img: 'images/flower.jpg'},
    {name: 'ghost', img: 'images/ghost.jpg'},
    {name: 'yoshi', img: 'images/yoshi.jpg'},
    {name: 'luigi', img: 'images/luigi.jpg'},
    {name: 'mario', img: 'images/mario.jpg'},
    {name: 'star', img: 'images/star.jpg'},
  ];

  // Other variables

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const messageDisplay = document.querySelector('#message');
  const newGame= document.querySelector('#newGame');
  let flipable = true;


  // Give a random order to the group of cards in each refresh
  cardArray.sort(() => 0.5 - Math.random());

  // Create a grid of cards. Each card have a twin and the attributes source, id, class, and action on click

  function createBoard() {
    for (let i = 0; i < gridSize; i++) {
      let card = document.createElement('img');
      card.setAttribute('src', 'images/back.jpg');
      card.setAttribute('data-id', i);
      card.setAttribute('class', 'image');
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    } 
  }

  //Check for matches between two flipped cards

  function checkForMatch() {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
      //alert('You found a match');
      cards[optionOneId].setAttribute('src', 'images/white.png');
      cards[optionTwoId].setAttribute('src', 'images/white.png');
      cardsWon.push(optionOneId, optionTwoId);
    } else {
      cards[optionOneId].setAttribute('src', 'images/back.jpg');
      cards[optionTwoId].setAttribute('src', 'images/back.jpg');
    }
    cardsChosen =[]
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length / 2;
    if (cardsWon.length / 2 === cardArray.length / 2) {
      messageDisplay.textContent = 'Congratulations! You won!';
      newGame.addEventListener('click', cleanBoard);
      newGame.setAttribute('visibility', 'visible')
    };
    flipable = true;
  }

  function cleanBoard() {
    let oldimages = document.getElementsByClassName("image");
    oldimages.forEach(card.remove())
    createBoard();
  }

  // Click on a card flip it showing the image it contains.

  function flipCard() {
    let cardId = this.getAttribute('data-id');
    if (cardId === cardsChosenId[0] || cardsWon.includes(cardId) || flipable == false){
      return
    }
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      flipable = false;
      setTimeout(checkForMatch, 500);
    };
  }

  createBoard();

})

// BUGS:
// Corrected! Click twice in the same image makes match with it self. -> No more.
// Corrected! Click again in a already done match gives more score. -> No more.
// Corrected! Ended game generate an alert -> Generates a new random grid.
// Corrected! Generate grid images in the same order -> Randomize the images order.
// Corrected! No animation on flipping -> css transiton and transform.
// Corrected! Background size changes at zoom -> No more.
// Corrected! Multiple clicks generate a bug. -> No more.
// Corrected! Show alerts on match, errors, and win. -> No more.
// Always shows the same images.
