/**
 *  Enemies the player must avoid 
 * @param {type} x   -- HTML Canvas starting X postion
 * @param {type} y   -- HTML Canvas starting Y position
 * @param {type} pace -- speed at which this enemy moves across screen 
 * @returns {Enemy} 
 */
var Enemy = function (x, y, pace) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.pace = pace;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/**
 * Update the enemy position across the screen and also check for collisions 
 * between the player and this enemy objects. Note this is called for each 
 * enemy.
 *  
 * @param {type} dt
 * @returns {undefined}
 */
Enemy.prototype.update = function (dt) {


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // move the enemy bug across screen left-to-right across screen
    // if off-screen on rt restart left side. 
    this.x += this.pace * dt;
    if (this.x > 500) {
        this.x = 0;
    }

    // See if the bugs hit the player. 
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.initialize = function (x, y) {
    this.x = x;
    this.y = y;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/**
 * 
 * @param {type} x  -- player initial x position on HTML Canvas game board. 
 * @param {type} y  -- player initial y position on HTML Canvas game board. 
 * @returns {Person}
 */
var Person = function () {
    this.sprite = 'images/char-boy.png';
};

/**
 *  Draws player position on the screen.
 * @returns {undefined}
 */
Person.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Method to update players position, however not needed as this is 
 * being handled by the handleInput method. 
 * @param {type} dt
 * @returns {undefined}
 */
Person.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Handled by the handleInput method. 
};

/**
 * Method to set the player's starting position. 
 * 
 * @returns {undefined}
 */
Person.prototype.setStartPos = function() {
    this.x = 200;
    this.y = 400;
    
};

/**
 * Handles the user input and moves the player accordingly across the HTML
 * Canvas game board. This implementation of the game uses the kybd arrow keys.
 * 
 * @param {type} key  -- kybd key which was depressed to move the player. 
 * @returns {undefined}
 */
Person.prototype.handleInput = function (key) {
    if ('up' === key) {

        if (this.y === 0) {
            window.alert("You WON!");
            player.setStartPos();
        } else {
            this.y -= 100;
        }
    } else if ('down' === key) {
        if (this.y < 400) {
            this.y += 100;
        }
    } else if ('left' === key) {
        if (this.x > 50) {
            this.x -= 100;
        }
    } else if ('right' === key) {
        if (this.x <= 300) {
            this.x += 100;
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
allEnemies.push(new Enemy(200, 100, 100));
allEnemies.push(new Enemy(0, 200, 50));
allEnemies.push(new Enemy(0, 325, 150));

var player = new Person();
player.setStartPos();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * Method to detect if an enemy collided with the player on the HTML Canvas game
 * board. If a collision is detected the player will be returned to the starting
 * position. 
 * 
 * @param {type} bug   - enemy bug 
 * @returns {undefined}
 */
var checkCollision = function (bug) {

    if (player.y + 130 >= bug.y + 85 &&      // player on top of bug moving down
            player.y + 85 <= bug.y + 130 &&  // player below bug 
            player.x + 25 <= bug.x + 100 &&  // player in front of bug
            player.x + 30 >= bug.x ) {       // player behind bug && moving rt.
       player.setStartPos(); 
    }

};