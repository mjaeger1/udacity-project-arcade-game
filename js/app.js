
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // initial x and y position
    this.x = -100;
    this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 20;
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
  console.log(`${this.x}/${this.y}`);

};

// Update the player's position
Player.prototype.update = function() {

};

// Draw the player on the screen
// TODO: is it worth creating a subclass just because of 1 method is the same?
Player.prototype.render = function() {

 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Called if one of the up/down/left/right key is pressed
Player.prototype.handleInput = function(key) {

  switch (key) {
    case 'up':

      // WHY DOESN'T THIS WORK???
      // this.y > 100 ? this.y - 83 : starty;
      if (this.y > 100) {
        this.y -= 83;
      }
      else {
        this.x = startx;
        this.y = starty;
      }
      // console.log(`${this.x}/${this.y}`);
      break;

    case 'down':
      if (this.y < 300) {
        this.y += 83;
      }
      // console.log(`${this.x}/${this.y}`);
      break;

    case 'left':
      if (this.x > 0) {
        this.x -= 101;
      }
      // console.log(`${this.x}/${this.y}`);
      break;

    case 'right':
      if (this.x < 400) {
        this.x += 101;
      }
      // console.log(`${this.x}/${this.y}`);
      break;

    default:
  }




};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// start position of player
var startx = 2 * 101;
var starty = 4 * 83 + 83/2;


var allEnemies = [];
var player = new Player();



// creates a new enemy every second
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
