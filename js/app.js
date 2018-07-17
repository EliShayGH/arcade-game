// Enemies our player must avoid
const Enemy = function(x, y) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 500)
};

Enemy.prototype.move = function(dt) {

    this.x *= dt;
    this.y *= dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.move = function () {

    if(this.pressedKey === 'left' && this.x > 0) {
        this.x -= 100;
    }

    if(this.pressedKey === 'right' && this.x < 400) {
        this.x += 100;
    }

    if(this.pressedKey === 'up' && this.y > 0) {
        this.y -= 100;
    }

    if(this.pressedKey === 'down' && this.y > 400) {
        this.y += 100;
    }

    this.pressedKey = null;
    // the game won reset the game
    if (this.y < 0) {
        this.reset();
    }

    allEnemies.forEach(function(enemy) {
        if ((this.x >= enemy.x - 45 && this.x <= enemy.x + 45) ||
            (this.y >= enemy.y - 25 && this.y <= enemy.y + 25)) {
                this.reset();
            }
        }
    });
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.input = function (key) {
    this.pressedKey = key;
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

const allEnemies = [];
let player = new Player();

(function setEnemies() {
    allEnemies.push(new Enemy(0, 20));
    allEnemies.push(new Enemy(0, 100));
    allEnemies.push(new Enemy(0, 150));
    allEnemies.push(new Enemy(0, 240));
    allEnemies.push(new Enemy(0, 300));
}());

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
