;
// /JS/util.js is a dependee for: /JS/game.js

var util = (function() {
    function VarArgPointCtor() {
        const axises = ['x', 'y', 'z', 't'];
        for (let i = 0; (i < arguments.length) && (i < axises.length); ++i) {
            this[axises[i]] = arguments[i];
        }
    };

    function VarArgSidesCtor() {
        const sides = ['left', 'right', 'rear', 'front'];
        for (let i = 0; (i < arguments.length) && (i < sides.length); ++i) {
            this[sides[i]] = arguments[i];
        }
    };

    return {
        Point: VarArgPointCtor,
        Sides: VarArgSidesCtor
    };
}());


