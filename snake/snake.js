var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var blockSize = 20;
var wiedthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

var score = 0;

var circle = function(x, y, r, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

var drawBorder = function() {
    ctx.fillStyle = "#efecea";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
}

var showScore = function() {
    $("#score").text("Score:" + score);
}

var gameOver = function() {
    clearInterval(intervalID);
    ctx.font = "60px Comic Sans Ms";
    ctx.fillStyle = "Turquoise";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over!", width / 2, height / 2);
}

var Block = function(col, row) {
    this.col = col;
    this.row = row;
}

Block.prototype.drawSquare = function(color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function(color) {
    var x = this.col * blockSize + blockSize / 2;
    var y = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(x, y, blockSize / 2, true);
};

Block.prototype.equal = function(otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

var Snake = function() {
    this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
    this.direction = "right";
    this.nextDirection = "right";
}

Snake.prototype.draw = function() {
    for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("#94d5f5");
    }
};

Snake.prototype.move = function() {
    var head = this.segments[0];
    var newHead;

    this.direction = this.nextDirection;

    if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    } else if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } 

    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if (newHead.equal(apple.position)) {
        score++;
        apple.move();
    } else {
        this.segments.pop();
    }
};

Snake.prototype.checkCollision = function(head) {
    var leftCollistion = (head.col === 0);
    var topCollision = (head.row === 0);
    var rightCollision = (head.col === wiedthInBlocks - 1);
    var bottomCollision = (head.row === heightInBlocks - 1);

    var wallCollision = leftCollistion || topCollision || rightCollision || bottomCollision;

    var selfCollision = false;

    for (var i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }

    return wallCollision || selfCollision;
};

var direction = {
    32: "space",
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

$("body").keydown(function(event) {
    var newDirection = direction[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
})

Snake.prototype.setDirection = function(newDirection) {
    if (this.direction === "left" && newDirection === "right") {
        return;
    } else if (this.direction === "up" && newDirection === "up") {
        return;
    } else if (this.direction === "right" && newDirection === "right") {
        return;
    } else if (this.direction === "down" && newDirection === "down") {
        return;
    }

    this.nextDirection = newDirection;
};

var Apple = function() {
    this.position = new Block(10, 10);
}

Apple.prototype.draw = function() {
    this.position.drawCircle("LimeGreen");
};

Apple.prototype.move = function() {
    var randomCol = Math.floor(Math.random() * (wiedthInBlocks - 2)) + 1;
    var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
};

var apple = new Apple();
var snake = new Snake();

var intervalID = setInterval(function(event) {
    ctx.clearRect(0, 0, width, height);
    showScore();
    snake.draw();
    snake.move();
    apple.draw();
    drawBorder();
}, 100);
