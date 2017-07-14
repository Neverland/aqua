define(['exports', './lib/aqua'], function (exports, _aqua) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aqua2 = _interopRequireDefault(_aqua);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _aqua2.default;
});
define(['exports', './option'], function (exports, _option) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _option2 = _interopRequireDefault(_option);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

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

            _extends({}, this, _option2.default, option);

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
});
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    TIMEOUT: 10,
    RETRY: true,
    RETRY_COUNT: 3,
    CLIENT: true,
    BROWSER: false
  };
});