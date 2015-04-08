// Enemies our player must avoid
var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = this.getYPos();
    this.speed = this.getSpeed();
    this.height = 50;
    this.width = 50;
    return this;

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var move = Math.floor(this.speed * dt);
    if(this.x + move > 500) {
        this.x = -100;
        this.y = this.getYPos();
        this.speed = this.getSpeed();
    }
    else {
      this.x += move;
    }

}

Enemy.prototype.getSpeed = function() {

    // Generate a random number between 100 and 300 to
    // repsent the enemy speed.
    return (Math.floor(Math.random() * (300 - 100) + 100));

}

Enemy.prototype.getYPos = function() {

    // Randomly place the enemy on one of the
    // 3 grey areas.
    yPos = Math.floor(Math.random() * (3 - 0) + 1);
    yPos = ((yPos * 83) - 13);
    return yPos;

}


Enemy.prototype.render = function() {

    // Draw the enemy as it's x/y coordinates.
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

var Player = function() {

    this.sprite = "images/char-boy.png";
    this.height = 50;
    this.width = 50;
    this.reset();
    return this;

};

Player.prototype.reset = function() {

    // Place the player at this x/y start postiion.
    this.x = 200;
    this.y = 400;

};

Player.prototype.isCollision = function() {

    // Determine collision.

    var collision = false;
    var self = this;

    allEnemies.forEach(function(enemy) {

        if(self.x < enemy.x + enemy.width && self.x + self.width > enemy.x && self.y < enemy.y + enemy.height && self.y + self.height > enemy.y) {

            collision = true;

        }

    });

    return collision;

};

Player.prototype.update  = function() {

    // Keep the player from moving off the canvas and check for collision.

    if(this.x < 0) {
        this.x = 0;
    }
    else if(this.x > 400) {
        this.x = 400;
    }
    else if(this.y < 0) {
        this.y = 0;
    }
    else if(this.y > 400) {
        this.y = 400;
    }

    if(this.isCollision()) {
        this.reset();
    }

};

Player.prototype.render = function() {

    // Draw the player at its x/y coordinates.
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(keyCode) {

    // Move the player depending on which arrow key was
    // pressed.  Ignore all other keys.
    switch(keyCode) {

        case 'left':
            this.x -= 30;
            break;

        case 'up':
            this.y -= 30;
            break;

        case 'right':
            this.x += 30;
            break;

        case 'down':
            this.y += 30;
            break;

        default:
            break;

    };

};

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
// Total number of enemies that can appear at 1 time.
var totalEnemies = 5;
// Array to hold all the enemies.
var allEnemies = [];

for(var i=0;i<totalEnemies;i++) {

    // Instantiate the enemies and push into array.
    allEnemies.push(new Enemy());

}
// Instantiate the player.
var player = new Player();
