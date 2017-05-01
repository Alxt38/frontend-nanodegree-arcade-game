// Enemies our player must avoid
var Enemy = function () {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    
    this.x+=100 *dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.initialize = function( x,  y) {
  this.x = x;
  this.y = y;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Person = function () {
    this.sprite = 'images/char-boy.png';
};
Person.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Person.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
Person.prototype.handleInput = function ( key) {
    if ('up' === key) {
        
        if (this.y === 0) {
            window.alert("You WON!");
            this.initialize();
        } else {
            this.y-= 100;
        }
    } else if ('down' === key) {
        if (this.y < 400) {
            this.y += 100;
        } 
    } else if ('left' === key) {
        if (this.x > 50) {
            this.x-= 100;
        } 
    } else if ('right' === key) {
        if (this.x <= 300) {
            this.x+= 100;
        }
    }
};

Person.prototype.initialize = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
var e1 = new Enemy();
e1.initialize(0,100);
allEnemies.push(e1);
var e2 = new Enemy();
e2.initialize(0,200);
allEnemies.push(e2);

var player = new Person();
player.initialize();


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
