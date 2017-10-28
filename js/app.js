
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Initial x and y position
    // y uses same values as player's pos y
    this.x = -100;
    this.y = (Math.floor(Math.random() * 3) + 1) * 83 - Math.floor(83/3) - 1;

    // enemy speed: 100, 200, 300 or 400
    this.speed = (Math.floor(Math.random() * 4) + 1) * 100;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 600) {
      this.x += this.speed * dt;
    } else {
      // remove Enemy from allEnemies array if moved out of canvas
      allEnemies.splice(allEnemies.indexOf(this),1);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};



// Player class
var Player = function() {

  this.sprite = 'images/char-boy.png';
  this.x = startx;
  this.y = starty;

};

// Update the player's position
Player.prototype.update = function(x,y) {
  this.x = x;
  this.y = y;
};

// Draw the player on the screen
// TODO: is it worth creating a subclass just because of 1 method is the same?
Player.prototype.render = function() {

 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Called if one of the up/down/left/right key is pressed
// Updates player position accordingly
Player.prototype.handleInput = function(key) {
//console.log(`${this.x}/${this.y}`);
  switch (key) {

    case 'up':
      if (this.y > 100) {
        this.update(this.x, this.y - 83);
      }
      else { // WIN === water reached
        this.update(startx,starty);
        console.log('WIN!');
      }
      break;

    case 'down':
      if (this.y < 310) {
        this.update(this.x, this.y + 83);
      }
      break;

    case 'left':
      if (this.x > 0) {
        this.update(this.x - 101, this.y);
      }
      break;

    case 'right':
      if (this.x < 400) {
          this.update(this.x + 101, this.y);
      }
      break;
  }
};


// Start position of player
var startx = 2 * 101;
var starty = 4 * 83 + Math.floor(83/3*2);

// Array storing all enemy objects
var allEnemies = [];

// Player object
var player = new Player();

// Creates a new enemy every second
// TODO: option to vary or create game levels
window.setInterval(createEnemy, 1000);

function createEnemy() {
  allEnemies.push(new Enemy());
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
