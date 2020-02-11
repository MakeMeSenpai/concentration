// assigns our html button into a js var
var resetButton = document.getElementById("reset-button");

// names our squares
var colors = [];
for (var i = 0; i < 10; i++) {
    colors.push('square-' + i);
}

// simulates our squares in java
//el reference to a DOM element. In our case a div.game-square.
function GameSquare(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    // listens for click type events
    this.el.addEventListener("click", this, false);
    this.setColor(color);
}

// handles the event, accepting click event
GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
        case "click":
        if (this.isOpen || this.isLocked) {
            return;
        }
        this.isOpen = true;
        this.el.classList.add('flip');
        checkGame(this);
    }
}

// resets our game
GameSquare.prototype.reset = function() {
    this.isOpen = false;
    this.isLocked = false;
    this.el.classList.remove('flip');
}

function randomizeColors() {
    var randomColors = getSomeColors();
    gameSquares.forEach(function(gameSquare) {
        var color = randomColors.splice(random(randomColors.length), 1)[0];
        gameSquare.setColor(color);
    });
}

function clearGame() {
    gameSquares.forEach(function(gameSquare) {
        gameSquare.reset();
    });
    setTimeout(function() {
        randomizeColors();
    }, 500);
}

// locks our cards in place if colors clicked are the same
var firstSquare = null;

GameSquare.prototype.lock = function() {
    this.isLocked = true;
    this.isOpen = true;
}

function checkGame(gameSquare) {
    if (firstSquare === null) {
        firstSquare = gameSquare;
        return
    }

    if (firstSquare.color === gameSquare.color) {
        firstSquare.lock();
        gameSquare.lock();
    } else {
        var a = firstSquare;
        var b = gameSquare;
        setTimeout(function() {
        a.reset();
        b.reset();
        firstSquare = null;
        }, 400);
    }
    firstSquare = null;
}

// assigns random colors
function random(n) {
    return Math.floor(Math.random() * n);
}

/* this.el : Is the game square div.
this.el.children[0] : the game square's child, the "drawer" div.
this.el.children[0].children[1] : the second child of the drawer div, this should be the color square.*/
GameSquare.prototype.setColor = function(color) {
    this.el.children[0].children[1].classList.remove(this.color);
    this.color = color;
    this.el.children[0].children[1].classList.add(color);
}

function getSomeColors() {
    var colorscopy = colors.slice();
    var randomColors = [];
    for (var i = 0; i < 8; i++) {
        var index = random(colorscopy.length);
        randomColors.push(colorscopy.splice(index, 1)[0]);
    }
    return randomColors.concat(randomColors.slice());
}

//the game
function setupGame() {
    var array = document.getElementsByClassName("game-square");
    var randomColors = getSomeColors();             // Get an array of 8 random color pairs
    for (var i = 0; i < array.length; i++) {  
        var index = random(randomColors.length);      // Get a random index
        var color = randomColors.splice(index, 1)[0]; // Get the color at that index
        // Use that color to initialize the GameSquare
        gameSquares.push(new GameSquare(array[i], color));
    }
}

setupGame();