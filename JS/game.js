;
// /JS/game.js depends on: /JS/util.js

var game = (function() {
    var cvs = document.getElementById('game_canvas');
    var ctx = cvs.getContext('2d');
    var canvas = {
        draw: function() {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            canvas.drawBall();
            canvas.drawBricks();
            canvas.drawPaddle();
        },
        drawBall: function() {
            ctx.beginPath();
            ctx.arc(ball.position.x, ball.position.y, ball.size, 0, Math.PI * 2);
            ctx.fillStyle = '#b4e40f';
            ctx.fill();
            ctx.closePath();
        },
        drawBricks: function() {
            ctx.beginPath();
            for (var row = 0; row < bricks.dims.x; ++row) {
                for (var col = 0; col < bricks.dims.y; ++col) {
                    var fill = 0x6A7A8A;
                    switch (bricks.bricks[row][col].hp) {
                        case 0: {} break;
                        case 1: {
                            fill -= 0x2A3A4A;
                        }
                        case 2: {
                            fill -= 0xAAA;
                        }
                        default: {
                            ctx.rect(bricks.bricks[row][col].position.y,
                                     bricks.bricks[row][col].position.x,
                                     bricks.size.x,
                                     bricks.size.y);
                            ctx.fillStyle = '#b' + fill.toString();
                            ctx.fill();
                        } break;
                    }
                }
            }
            ctx.closePath();
        },
        drawPaddle: function() {
            ctx.beginPath();
            ctx.rect(paddle.position.x, paddle.position.y,
                     paddle.size.x, paddle.size.y);
            ctx.fillStyle = CONST.PADDLE.COLOR;
            ctx.fill();
            ctx.closePath();
        },
    };

    var paddle = {
        // fields:
        needMove: new util.Sides(false, false),
        position: new util.Point(cvs.width / 2, cvs.height - 100),
        size: new util.Point(CONST.PADDLE.WIDTH, CONST.PADDLE.HEIGHT),
        speed: new util.Point(CONST.PADDLE.SPEED),

        // methods:
        keyDownHandler: function(e) {
            switch (e.keyCode) {
                case CONST.KEYS.ARROW_LEFT: {
                    paddle.needMove.left = true;
                } break;
                case CONST.KEYS.ARROW_RIGHT: {
                    paddle.needMove.right = true;
                } break;
                default: {} break;
            }
        },
        keyUpHandler: function(e) {
            switch (e.keyCode) {
                case CONST.KEYS.ARROW_LEFT: {
                    paddle.needMove.left = false;
                } break;
                case CONST.KEYS.ARROW_RIGHT: {
                    paddle.needMove.right = false;
                } break;
                default: {} break;
            }
        },
        init: function() {
            document.addEventListener("keydown", paddle.keyDownHandler, false);
            document.addEventListener("keyup", paddle.keyUpHandler, false);
        },
        move: function() {
            if ((paddle.needMove.left) &&
                (paddle.position.x > 0)) {
                paddle.position.x -= paddle.speed.x;
            } else if ((paddle.needMove.right) &&
                       (paddle.position.x + paddle.size.x < cvs.width)) {
                paddle.position.x += paddle.speed.x;
            }
        },
    }; 

    var bricks = {
        // fields:
        bricks: [],
        dims: new util.Point(5, 3),
        size: new util.Point(70, 30),

        // methods:
        init: function() {
            var position = new util.Point(185, 100);
            var step = new util.Point(90, 45);
            for (var row = 0; row < bricks.dims.x; ++row) {
                bricks.bricks[row] = [];
                for (var col = 0; col < bricks.dims.y; ++col) {
                    // TODO: propper ctor
                    bricks.bricks[row][col] = {
                        // fast deep-copy
                        position: JSON.parse(JSON.stringify(position)),
                        hp : 2
                    };
                    position.x += step.x;
                }
                position.x = 185;
                position.y += step.y;
            }
        },
    };

    var ball = {
        // fields:
        position: new util.Point(CONST.BALL.POSITION.X, CONST.BALL.POSITION.Y),
        size: CONST.BALL.RADIUS,
        speed: new util.Point(CONST.BALL.SPEED.X, CONST.BALL.SPEED.Y),

        // methods:
        move : function() {
            ball.position.x += ball.speed.x;
            ball.position.y += ball.speed.y;
        },
        // maybe it's wise to check this way:
        //    x + dx < r
        //    x + dx > w - r
        // TODO: interception of a brick and the ball
        checkBricks: function() {
            // this way indexing is not affected if we remove an element
            for (var i = bricks.bricks.length -1; i > -1; --i) {
                if ((ball.position.x < ball.size) ||
                    (ball.position.x > cvs.width - ball.size)) {
                    ball.speed.x = -ball.speed.x;
                }
                if ((ball.position.y < ball.size) ||
                    (ball.position.y > cvs.height - ball.size)) {
                    ball.speed.y = -ball.speed.y;
                }
            }
        },
        checkPaddle: function() {
            if ((ball.position.x + ball.size >= paddle.position.x) &&
                (ball.position.x + ball.size <= paddle.position.x + paddle.size.x) &&
                (ball.position.y + ball.size >= paddle.position.y)) {
                    ball.speed.x = -ball.speed.x;
                    ball.speed.y = -ball.speed.y;
            }
        },
        checkWalls: function() {
            if ((ball.position.x < ball.size) ||
                (ball.position.x > cvs.width - ball.size)) {
                ball.speed.x = -ball.speed.x;
            }
            if ((ball.position.y < ball.size) ||
                (ball.position.y > cvs.height - ball.size)) {
                ball.speed.y = -ball.speed.y;
            }
        },
        check: function() {
            ball.checkPaddle();
            ball.checkWalls();
        },
    };

    var priv = {
        // fields:
        run: true,

        // methods:
        handler: function(e) {
            switch (e.keyCode) {
                case CONST.KEYS.PAUSE: {
                    priv.run = !priv.run;
                } break;
                default: {} break;
            }
        },
        init: function() {
            document.addEventListener("keydown", priv.handler, false);
        },
        logic: function() {
            if (priv.run) {
                canvas.draw();
                ball.move();
                paddle.move();
                ball.check();
            }
        },
    };

    function game() {
        priv.init();
        paddle.init();
        bricks.init();
        setInterval(priv.logic, 10);
    };

    return game;
}());


