// Enemies our player must avoid
const Enemy = function(x, y) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 500));
};

Enemy.prototype.update = function(dt) {

    if (this.x <= 500) {
        this.x += this.speed * dt;
    } //else - the enemy arrived to the end of the screen

    else {
    this.x = -50;
}
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function () {

    if(this.pressedKey === 'left' && this.x > 0) {
        this.x -= 100;
    }

    if(this.pressedKey === 'right' && this.x < 400) {
        this.x += 100;
    }

    if(this.pressedKey === 'up' && this.y > 0) {
        this.y -= 90;
    }

    if(this.pressedKey === 'down' && this.y < 400) {
        this.y += 90;
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
    });
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {
    this.pressedKey = e;
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

const allEnemies = [];
let player = new Player();

(function setEnemies() {
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
