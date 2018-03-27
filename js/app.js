/*
 * Create a list that holds all of your cards
 */
const cards1 = [{card: 1,
   img: "img/bugsBunny.png"
  },
  {card: 2,
   img: "img/lola.png"
  },
  {card: 3,
   img: "img/melissa.png"
  },
  {card: 4,
    img: "img/petunia.png"
  },
  {card: 5,
    img: "img/lucas.png"
  },
  {card: 6,
    img: "img/sylvester.png"
  },
  {card: 7,
    img: "img/piolin.png"
  },
  {card: 8,
    img: "img/taz.png"
  }];


  let checkCards = [];
  let counter = 1;
  //the counter to count the moves
  let moveCounter = 1; 
  //the seconds time
  let seconds = 0; 
  /*add to the tiles all the li items*/
  const tiles = document.querySelectorAll('.card');
  /*select the moves span*/
  const movesElem = document.querySelectorAll('.moves');
  /*select the restart btn*/
  const restart = document.querySelector('.fa-repeat');
   /*the deck of cards*/
  const deck = document.querySelector('.deck');


/*count the moves*/
  let moves = deck.addEventListener('click', () => {
    movesElem.forEach( e => {
      e.innerHTML = moveCounter;
    });
  });

  /*start the timer*/
  let isTimerRunning = false;
  let timer = document.querySelector('.timer');

  let startTimer = () => {
    seconds += 1;
    timer.innerText = seconds;
    clearInterval(startTimer);
  }

  /*remove the stars from the score*/
  let starCount = () => {
    console.log('moveCounter = ' + moveCounter);
    /*if the counter reaches 16 remove one star*/
    if (moveCounter === 16) { 
      document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');
       /*if the move-counter reaches 21 remove one star*/
    } else if (moveCounter === 21) {
      document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');/*user always gets one star*/
    }
  }

  /*set the score of stars*/
  let score = () => {
    /*select id score*/
    let scoreElem = document.querySelector('#score'); 
    /*select class stars*/
    const starList = document.querySelector('.stars');
    scoreElem.innerHTML = starList.innerHTML;
    // console.log(starList.innerHTML)
  }



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



 //shuffleCards
  let shuffleCards = () => {
    cardsTop = cards1.slice(0); /*shuffle cards first iteration */
    cardsBottom = cards1.slice(0); /*shuffle cards second iteration */
    cards = cardsTop.concat(cardsBottom); /* join the two arrays*/
    shuffle(cards); /*shuffle one last time the new array*/
  };

  /*assign the images*/
  let assignImg = () => {
    /*loop through all the cards*/
    for (i = 0 ; i < cards.length; i++) { 
      //select the child item then set the source randomly
      tiles[i].children.item(0).setAttribute('src', cards[i].img); 
      //set dataCard attr and then add it to the new array
      tiles[i].setAttribute('dataCard', cards[i].card); 
    }
  }

  let showCards = e => {
    const isTurned = e.target.getAttribute('data-clicked');  //if card is already turned
    const cardId = e.target.getAttribute('dataCard');  // assign id to variable
    const tagName = e.target.nodeName;

    if ( tagName === 'LI' && !isTurned ) {
        e.target.className += " open";
        setTimeout(() => {
          e.target.className += " show";
        }, 250);
    }

    if (isTurned === 'yes' || tagName === 'IMG') {
      console.log('this is an image.')
    } else if (cardId != null && cardId != undefined) {
      checkCards.push(cardId);
      console.log(checkCards);
    }
    e.target.setAttribute('data-clicked', 'yes'); //set data-clicked to see if the card has been turned
  }

  let foldCards = () => {
      setTimeout( () =>  {
        card2.className = 'card';
        card1.className = 'card';
      }, 440);
      setTimeout( () => {
        deck.style.pointerEvents = 'auto';
      }, 450);
  }

  //assign the values to the cards
  //console.log('counter: ' + counter);
  let assignValues = e => {
      if (counter === 1 && !e.target.getAttribute('.show') && e.target != deck && e.target.nodeName === 'LI') {
        card1 = e.target;
        counter++;
      } else if (counter === 2 && !e.target.getAttribute('.show') && e.target != deck && e.target.nodeName === 'LI') {
        card2 = e.target;
        counter = 1;
        starCount();
     }
  }

//match the cards
let matchCards = e => {
    if ( (checkCards.length %2) === 0 ) {
      const match1 = checkCards[checkCards.length - 2]; //2nd to last card on the array
      const match2 = checkCards[checkCards.length - 1]; //last card on the array
      const openCards = document.getElementsByClassName('open show'); // select elements with classes open and show

    //we check if the array is pair and if the cards match and if the target isn't deck
    if ( match1 === match2 && e.target != deck ) {
        card1.className += " match"; //add class match to the 2 variables
        card2.className += " match";
        moveCounter++; //increment the counters
        /*console.log('They match');*/
  //we check if the array length is pair, if the cards don't match and the target wasn't the deck element
    } else if ( checkCards.length % 2 === 0 && match1 != match2 && e.target != deck ) {
         // console.log(card1 + "-" + card2 + ' not a match');
          deck.style.pointerEvents = 'none';
          checkCards.splice(-2, 2); //remove the2 cards from the array
          card1.removeAttribute('data-clicked'); //removes the clicked flag when the cards don't match
          card2.removeAttribute('data-clicked'); //---||------||------||--------||-------||-----------
          foldCards(); //fold the cards
          moveCounter++; //increment the counter
    }
  }
} 



//when function is already running -> do not execute it again.
  let checkTimer = () => {
    if (isTimerRunning === false) {
      stopTimer = setInterval(startTimer, 1000);
      isTimerRunning = true; //time is running
    }
  }

/*when deck element is clicked*/
  deck.addEventListener('click', e => {  
      e.stopImmediatePropagation();
      e.preventDefault();
      checkTimer();
      showCards(e);
      assignValues(e);
      matchCards(e);
      showModal();
  });

  // startGame init
  let init = () => {
    shuffleCards();
    assignImg();
  }


 //Restart the game
  let restartGame = () => {
    /*select elements .fa class*/
    const stars = document.querySelectorAll('.fa'); 
    /*select elements .card class*/
    const cards = document.querySelectorAll('.card'); 
    /*select the cards shown*/
    const clearCards = document.querySelectorAll('.show'); 

    resetTimer();
    moveCounter = 1;
    movesElem[0].innerHTML = moveCounter;
    stars.forEach((e) => {
      e.classList += ' fa-star';
    });
    clearCards.forEach( e => {
        e.classList.remove('open', 'show', 'match');
        e.removeAttribute('data-clicked');
    });
    //check the values to an empty array and reset the array used 
    checkCards = []; 
    setTimeout(() => { /*to not to be visible delay for the reshuffle*/
      init();
    }, 500);
  }

  //game is restarted.
  restart.addEventListener('click', e => {
    restartGame(e);
  });

  //reset the timer counting
  var resetTimer = () => {
    clearInterval(stopTimer);
    seconds = 0; // reset seconds
    setTimeout(() => {timer.innerText = seconds;}, 150);
    isTimerRunning = false;
  }

  //all is loaded then run init --startGame
  document.addEventListener('DOMContentLoaded', init());