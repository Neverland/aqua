(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Aqua = require('./lib/Aqua');

var _Aqua2 = _interopRequireDefault(_Aqua);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _Aqua2.default; /**
                                   * @file index.js
                                   * @author ienix(guoaimin01@baidu.com)
                                   *
                                   * @since 2017/7/14
                                   */

},{"./lib/Aqua":2}],2:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}(); /**
      * @file Aqua.js
      * @author ienix(guoaimin01@baidu.com)
      *
      * @since 2017/7/14
      */

var _index = require('../option/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Aqua = function () {
    function Aqua() {
        var setting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Aqua);

        var option = {
            version: '0.0.1',
            debug: false,
            setting: setting,
            $methodList: [],
            $methodCount: 0,
            $plugin: {}
        };

        _extends({}, this, _index2.default, option);

        this.initialize();
    }

    _createClass(Aqua, [{
        key: 'initialize',
        value: function initialize() {
            var _this = this,
                _arguments = arguments;

            ['method', 'error', 'mockup'].forEach(function (property) {
                var handler = _this[property];

                if (!handler) {
                    handler = function handler() {
                        return _this.placeholder.apply(_this, _arguments);
                    };
                }

                if ('object' === (typeof handler === 'undefined' ? 'undefined' : _typeof(handler))) {
                    _this['$' + property] || (_this['$' + property] = handler);
                }
            });

            this.scanMethod();
            this.$registerMethod();
        }
    }, {
        key: '$defaultData',
        value: function $defaultData(method, param) {
            var data = {
                method: method,
                support: false,
                message: 'The method `' + method + '` is not support!',
                data: {}
            };

            if (this.debug) {
                data = this.$mockup.apply(this, arguments);
            }

            return data;
        }
    }, {
        key: '$registerMethod',
        value: function $registerMethod() {
            var _this2 = this;

            this.$methodList.forEach(function (methodName) {
                _this2.$method[methodName] = _this2.placeholder(methodName);
            });
        }
    }, {
        key: '$excute',
        value: function $excute(method, param) {
            if (this.debug) {
                return Promise.resolve(this.$defaultData.apply(this, arguments));
            }

            if (this.$methodList.indexOf(method) !== -1) {
                return this.$method.apply(this, arguments);
            }
        }
    }, {
        key: 'scanMethod',
        value: function scanMethod() {
            if ('object' === _typeof(this.$method)) {
                return false;
            }

            this.$methodList = Object.keys(this.$method);
            this.$methodCount = this.$methodList.length;
        }
    }, {
        key: 'placeholder',
        value: function placeholder() {
            return this.$defaultData.apply(this, arguments);
        }
    }], [{
        key: 'use',
        value: function use() {}
    }]);

    return Aqua;
}();

exports.default = Aqua;

},{"../option/index":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @file index
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2017/7/14
 */

exports.default = {
  TIMEOUT: 10,
  RETRY: true,
  RETRY_COUNT: 3,
  CLIENT: true,
  BROWSER: false
};

},{}]},{},[1]);
