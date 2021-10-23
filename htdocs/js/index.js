(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Resize = /*#__PURE__*/function () {
  function Resize() {
    var _this = this;

    _classCallCheck(this, Resize);

    this._size = {
      width: 0,
      height: 0
    };
    this._oldSize = {
      width: 0,
      height: 0
    };
    this._updateList = [];
    window.addEventListener('resize', function (e) {
      return _this._resize(e);
    });

    this._resize();
  }
  /* 
    * リサイズ後に実行する関数を追加
    * @param fn {Function} - 実行する関数
  */


  _createClass(Resize, [{
    key: "Size",
    get: function get() {
      return this._size;
    }
  }, {
    key: "OldSize",
    get: function get() {
      return this._oldSize;
    }
  }, {
    key: "add",
    value: function add(fn) {
      this._updateList.push(fn);
    }
    /* 
      * リサイズ後に実行する関数を削除
      * @param fn {Function} - 削除する関数
    */

  }, {
    key: "remove",
    value: function remove(fn) {
      var list = [];

      for (var val in this._updateList) {
        if (this._updateList[val] != fn) {
          list.push(this._updateList[val]);
        }
      }

      this._updateList = list;
    }
    /* 
      * リサイズイベントを実行
    */

  }, {
    key: "update",
    value: function update() {
      this._resize();
    }
  }, {
    key: "_resize",
    value: function _resize(e) {
      this._oldSize.width = this._size.width;
      this._oldSize.height = this._size.height;
      this._size.width = window.innerWidth;
      this._size.height = window.innerHeight; // this._size.width = document.documentElement.clientWidth;
      // this._size.height = document.documentElement.clientHeight;

      for (var _ref in this._updateList) {
        var _ref2 = _slicedToArray(_ref, 2);

        var val = _ref2[0];
        var i = _ref2[1];

        this._updateList[val]();
      }
    }
  }]);

  return Resize;
}();

module.exports = new Resize();

},{}],2:[function(require,module,exports){
/* index.js */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resize = require('../assets/js/libs/Resize');

var App = function App() {
  _classCallCheck(this, App);
};

(function () {
  var app = new App();
})();

},{"../assets/js/libs/Resize":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzL2xpYnMvUmVzaXplLmpzIiwic3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBTSxNO0FBVUosb0JBQWM7QUFBQTs7QUFBQTs7QUFDWixTQUFLLEtBQUwsR0FBYTtBQUNYLE1BQUEsS0FBSyxFQUFFLENBREk7QUFFWCxNQUFBLE1BQU0sRUFBRTtBQUZHLEtBQWI7QUFJQSxTQUFLLFFBQUwsR0FBZ0I7QUFDZCxNQUFBLEtBQUssRUFBRSxDQURPO0FBRWQsTUFBQSxNQUFNLEVBQUU7QUFGTSxLQUFoQjtBQUtBLFNBQUssV0FBTCxHQUFtQixFQUFuQjtBQUVBLElBQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQUMsQ0FBRDtBQUFBLGFBQU8sS0FBSSxDQUFDLE9BQUwsQ0FBYSxDQUFiLENBQVA7QUFBQSxLQUFsQzs7QUFDQSxTQUFLLE9BQUw7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7OztTQTNCRSxlQUFXO0FBQ1QsYUFBTyxLQUFLLEtBQVo7QUFDRDs7O1NBRUQsZUFBYztBQUNaLGFBQU8sS0FBSyxRQUFaO0FBQ0Q7OztXQXNCRCxhQUFJLEVBQUosRUFBUTtBQUNKLFdBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixFQUF0QjtBQUNIO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7V0FDRSxnQkFBTyxFQUFQLEVBQVc7QUFDVCxVQUFJLElBQUksR0FBRyxFQUFYOztBQUNBLFdBQUksSUFBSSxHQUFSLElBQWUsS0FBSyxXQUFwQixFQUFpQztBQUMvQixZQUFHLEtBQUssV0FBTCxDQUFpQixHQUFqQixLQUF5QixFQUE1QixFQUFnQztBQUM5QixVQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQVY7QUFDRDtBQUNGOztBQUNELFdBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNEO0FBRUQ7QUFDRjtBQUNBOzs7O1dBQ0Usa0JBQVM7QUFDUCxXQUFLLE9BQUw7QUFDRDs7O1dBRUQsaUJBQVEsQ0FBUixFQUFXO0FBQ1QsV0FBSyxRQUFMLENBQWMsS0FBZCxHQUFzQixLQUFLLEtBQUwsQ0FBVyxLQUFqQztBQUNBLFdBQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsS0FBSyxLQUFMLENBQVcsTUFBbEM7QUFFQSxXQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLE1BQU0sQ0FBQyxVQUExQjtBQUNBLFdBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsTUFBTSxDQUFDLFdBQTNCLENBTFMsQ0FPVDtBQUNBOztBQUVBLHVCQUFtQixLQUFLLFdBQXhCLEVBQXFDO0FBQUE7O0FBQUEsWUFBNUIsR0FBNEI7QUFBQSxZQUF4QixDQUF3Qjs7QUFDakMsYUFBSyxXQUFMLENBQWlCLEdBQWpCO0FBQ0g7QUFDRjs7Ozs7O0FBSUgsTUFBTSxDQUFDLE9BQVAsR0FBaUIsSUFBSSxNQUFKLEVBQWpCOzs7QUN4RUE7QUFDQTs7OztBQUVBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQywwQkFBRCxDQUF0Qjs7SUFFTSxHLEdBQ0osZUFBYztBQUFBO0FBRWIsQzs7QUFHSCxDQUFDLFlBQVc7QUFDVixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUosRUFBWjtBQUNELENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjbGFzcyBSZXNpemUge1xuXG4gIGdldCBTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgZ2V0IE9sZFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29sZFNpemU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9zaXplID0ge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9XG4gICAgdGhpcy5fb2xkU2l6ZSA9IHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlTGlzdCA9IFtdO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChlKSA9PiB0aGlzLl9yZXNpemUoZSkpO1xuICAgIHRoaXMuX3Jlc2l6ZSgpO1xuICB9XG5cbiAgLyogXG4gICAgKiDjg6rjgrXjgqTjgrrlvozjgavlrp/ooYzjgZnjgovplqLmlbDjgpLov73liqBcbiAgICAqIEBwYXJhbSBmbiB7RnVuY3Rpb259IC0g5a6f6KGM44GZ44KL6Zai5pWwXG4gICovXG4gIGFkZChmbikge1xuICAgICAgdGhpcy5fdXBkYXRlTGlzdC5wdXNoKGZuKTtcbiAgfVxuXG4gIC8qIFxuICAgICog44Oq44K144Kk44K65b6M44Gr5a6f6KGM44GZ44KL6Zai5pWw44KS5YmK6ZmkXG4gICAgKiBAcGFyYW0gZm4ge0Z1bmN0aW9ufSAtIOWJiumZpOOBmeOCi+mWouaVsFxuICAqL1xuICByZW1vdmUoZm4pIHtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvcihsZXQgdmFsIGluIHRoaXMuX3VwZGF0ZUxpc3QpIHtcbiAgICAgIGlmKHRoaXMuX3VwZGF0ZUxpc3RbdmFsXSAhPSBmbikge1xuICAgICAgICBsaXN0LnB1c2godGhpcy5fdXBkYXRlTGlzdFt2YWxdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlTGlzdCA9IGxpc3Q7XG4gIH1cblxuICAvKiBcbiAgICAqIOODquOCteOCpOOCuuOCpOODmeODs+ODiOOCkuWun+ihjFxuICAqL1xuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICBfcmVzaXplKGUpIHtcbiAgICB0aGlzLl9vbGRTaXplLndpZHRoID0gdGhpcy5fc2l6ZS53aWR0aDtcbiAgICB0aGlzLl9vbGRTaXplLmhlaWdodCA9IHRoaXMuX3NpemUuaGVpZ2h0O1xuXG4gICAgdGhpcy5fc2l6ZS53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgdGhpcy5fc2l6ZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBcbiAgICAvLyB0aGlzLl9zaXplLndpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIC8vIHRoaXMuX3NpemUuaGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIGZvcihsZXQgW3ZhbCxpXSBpbiB0aGlzLl91cGRhdGVMaXN0KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxpc3RbdmFsXSgpO1xuICAgIH1cbiAgfVxuICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUmVzaXplKCk7IiwiLyogaW5kZXguanMgKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBSZXNpemUgPSByZXF1aXJlKCcuLi9hc3NldHMvanMvbGlicy9SZXNpemUnKTtcblxuY2xhc3MgQXBwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgXG4gIH1cbn1cblxuKGZ1bmN0aW9uKCkge1xuICBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG59KSgpOyJdfQ==
