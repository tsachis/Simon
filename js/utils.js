var utils = function () {
    return {
        getRandomInt: function (start, end) {
            return start + Math.floor((Math.random() * end) + 1);
        },
        shuffleArray: function (o) {
            for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },
        createIntArray: function (size) {
            var arr = [];
            for (var i = 1; i <= size; i++) {
                arr.push(i);
            }
            return arr;
        }
    }
} ();