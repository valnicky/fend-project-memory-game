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
  
	$container = $('.container'),
	$scorePanel = $('.score-panel'),
	$rating = $('.fa-star'),
	$moves = $('.moves'),
	$timer = $('.timer'),
	$restart = $('.restart'),
	$deck = $('.deck'),
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


function init(){
	let allCards = shuffle(images);
	$deck.empty();
	match = 0;
	moves = 0;
	$moves.text('0');
	for(let i = 0; i< allCards.length; i++){
		$deck.append($('<li class="card"><i class="fa fa-" + allCards[i]+ "></i></li>'));
	
	}
	addCardListener();
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
