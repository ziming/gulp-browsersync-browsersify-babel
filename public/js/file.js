'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ES2015 code here!

var names = ['john', 'jack'];

names.forEach(function (names) {
    return alert(name);
});

var MyClass = function () {
    function MyClass(name) {
        _classCallCheck(this, MyClass);

        this.name = name;
    }

    _createClass(MyClass, [{
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }]);

    return MyClass;
}();
//# sourceMappingURL=file.js.map
