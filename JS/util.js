;
// /JS/util.js is a dependee for: /JS/game.js

var util = (function() {
    const keys = {
        axises: ['x', 'y', 'z', 't'],
        sides: ['left', 'right', 'rear', 'front'],
    };

    // VarArgKeysCtor returns variadic object constructor.
    // For example:
    //     var Point = VarArgKeysCtor(['x', 'y', 'z']);
    //     d1 = new Point(1.4)           // d1 === {x: 1.4}
    //     d2 = new Point(2.5, 3.6)      // d2 === {x: 2.5, y: 3.6}
    //     d3 = new Point(3.6, 4.7, 5.8) // d3 === {x: 3.6, y: 4.7, z: 5.8}
    function VarArgKeysCtor(obj_keys) {
        return function() {
            const len = Math.min(arguments.length, obj_keys.length);
            for (var i = 0; i < len; ++i) {
                this[obj_keys[i]] = arguments[i];
            }
        }
    };

    function turn(obj, key) {
        switch (typeof obj[key]) {
            case 'boolean': {
                obj[key] = !obj[key];
            } break;
            case 'number': {
                obj[key] = -obj[key];
            } break;
        }
    };

    return {
        Point: VarArgKeysCtor(keys.axises),
        Sides: VarArgKeysCtor(keys.sides),
        turn: turn,
    };
})();


