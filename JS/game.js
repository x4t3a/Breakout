
var game = (function() {
	var canvas = document.getElementById('game_canvas')
	var ctx = canvas.getContext('2d');
	var ball = {
		r : 13,
		x : 100, dx : 1,
		y : 100, dy : 1,
		move : function() {
			ball.x += ball.dx;
			ball.y += ball.dy;
		},
		checkWalls : function() {
			// maybe it's wise to check this way:
			//	x + dx < r
			//	x + dx > w - r
			if ((ball.x < ball.r) || (ball.x > canvas.width - ball.r)) {
				ball.dx = -ball.dx;
			}
			if ((ball.y < ball.r) || (ball.y > canvas.height - ball.r)) {
				ball.dy = -ball.dy;
			}
		},
		changeSpeed : function(ddx, ddy) {
		},
		draw : function() {
			ctx.beginPath();
			ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
			ctx.fillStyle = '#b4e40f';
			ctx.fill();
			ctx.closePath();
		},
	};
	var paddle = {
		w : 37, h : 12,
		y : canvas.height - 100,
		x : canvas.width / 2, dx : 0.9,
		moveRight : false, moveLeft : false,
		keyDownHandler : function(e) {
			if (39 == e.keyCode) {
				paddle.moveRight = true;
			} else if (37 == e.keyCode) {
				paddle.moveLeft = true;
			}
		},
		keyUpHandler : function(e) {
			if (39 == e.keyCode) {
				paddle.moveRight = false;
			} else if (37 == e.keyCode) {
				paddle.moveLeft = false;
			}
		},
		init : function() {
			document.addEventListener("keydown", paddle.keyDownHandler, false);
			document.addEventListener("keyup", paddle.keyUpHandler, false);
		},
		move : function() {
			if (paddle.moveRight) {
				paddle.x += paddle.dx;
			}
			if (paddle.moveLeft) {
				paddle.x -= paddle.dx;
			}
		},
		draw : function() {
			ctx.beginPath();
			ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
			ctx.fillStyle = '#000';
			ctx.fill();
			ctx.closePath();
		},
	};
	var priv = {
		run : function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ball.move();
			paddle.move();
			ball.checkWalls();
			ball.draw();
			paddle.draw();
		},
	};
	var pub = {
		run : function() {
			paddle.init();
			setInterval(priv.run, 10);
		},
	};
	return pub;
}());

