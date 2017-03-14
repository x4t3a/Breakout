;
// /JS/constants is a dependee for /JS/game.js

const CONST = (function() {
    return {
        KEYS: {
            ARROW_LEFT: 37,
            ARROW_RIGHT: 39,
            PAUSE: 19,
        },
        PADDLE: {
            COLOR: '#000',
            HEIGHT: 12,
            WIDTH: 37,
            SPEED: 1.69,
        },
        BALL: {
            RADIUS: 13,
            POSITION: {
                X: 100,
                Y: 100,
            },
            SPEED: {
                X: 1.97,
                Y: 1.97,
            },
        }
    };
}());


