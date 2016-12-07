'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._PLATFORM = exports._DOM = exports._FEATURE = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports._ensureFunctionName = _ensureFunctionName;
exports._ensurePerformance = _ensurePerformance;
exports._ensureCustomEvent = _ensureCustomEvent;
exports.initialize = initialize;

var _aureliaPal = require('aurelia-pal');

function _ensureFunctionName() {
  function test() {}

  if (!test.name) {
    Object.defineProperty(Function.prototype, 'name', {
      get: function get() {
        var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];

        Object.defineProperty(this, 'name', { value: name });
        return name;
      }
    });
  }
}

function _ensurePerformance() {
  // @license http://opensource.org/licenses/MIT
  if ('performance' in self === false) {
    self.performance = {};
  }

  Date.now = Date.now || function () {
    return new Date().getTime();
  };

  if ('now' in self.performance === false) {
    (function () {
      var nowOffset = Date.now();

      if (performance.timing && performance.timing.navigationStart) {
        nowOffset = performance.timing.navigationStart;
      }

      self.performance.now = function now() {
        return Date.now() - nowOffset;
      };
    })();
  }
}

function _ensureCustomEvent() {
  if (!self.CustomEvent || typeof self.CustomEvent !== 'function') {
    var _CustomEvent = function _CustomEvent(event, _ref) {
      var _ref$bubbles = _ref.bubbles,
          bubbles = _ref$bubbles === undefined ? false : _ref$bubbles,
          _ref$cancelable = _ref.cancelable,
          cancelable = _ref$cancelable === undefined ? false : _ref$cancelable,
          _ref$detail = _ref.detail,
          detail = _ref$detail === undefined ? false : _ref$detail;

      var evt = new self.CustomEvent(event, bubbles, cancelable, detail);

      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    _CustomEvent.prototype = self.Event.prototype;
    self.CustomEvent = _CustomEvent;
  }
}

var _FEATURE = exports._FEATURE = {};

_FEATURE.shadowDOM = function () {
  return false;
}();

_FEATURE.scopedCSS = function () {
  return false;
}();

_FEATURE.htmlTemplateElement = function () {
  return false;
}();

_FEATURE.mutationObserver = function () {
  return false;
}();

var _DOM = exports._DOM = {
  boundary: 'aurelia-dom-boundary',
  addEventListener: function addEventListener(eventName, callback, capture) {
    throw new self.DOMException('addEventListener is not available in a service/web worker');
  },
  removeEventListener: function removeEventListener(eventName, callback, capture) {
    throw new self.DOMException('removeEventListener is not available in a service/web worker');
  },
  adoptNode: function adoptNode(node) {
    throw new self.DOMException('adoptNode is not available in a service/web worker');
  },
  createElement: function createElement(tagName) {
    throw new self.DOMException('createElement is not available in a service/web worker');
  },
  createTextNode: function createTextNode(text) {
    throw new self.DOMException('createTextNode is not available in a service/web worker');
  },
  createComment: function createComment(text) {
    throw new self.DOMException('createComment is not available in a service/web worker');
  },
  createDocumentFragment: function createDocumentFragment() {
    throw new self.DOMException('createDocumentFragment is not available in a service/web worker');
  },
  createMutationObserver: function createMutationObserver(callback) {
    throw new self.DOMException('createMutationObserver is not available in a service/web worker');
  },
  createCustomEvent: function createCustomEvent(eventType, options) {
    throw new self.DOMException('createCustomEvent is not available in a service/web worker');
  },
  dispatchEvent: function dispatchEvent(evt) {
    throw new self.DOMException('getComputedStyle is not available in a service/web worker');
  },
  getComputedStyle: function getComputedStyle(element) {
    throw new self.DOMException('getComputedStyle is not available in a service/web worker');
  },
  getElementById: function getElementById(id) {
    throw new self.DOMException('getElementById is not available in a service/web worker');
  },
  querySelectorAll: function querySelectorAll(query) {
    throw new self.DOMException('querySelectorAll is not available in a service/web worker');
  },
  nextElementSibling: function nextElementSibling(element) {
    throw new self.DOMException('nextElementSibling is not available in a service/web worker');
  },
  createTemplateFromMarkup: function createTemplateFromMarkup(markup) {
    throw new self.DOMException('createTemplateFromMarkup is not available in a service/web worker');
  },
  appendNode: function appendNode(newNode, parentNode) {
    throw new self.DOMException('appendNode is not available in a service/web worker');
  },
  replaceNode: function replaceNode(newNode, node, parentNode) {
    throw new self.DOMException('replaceNode is not available in a service/web worker');
  },
  removeNode: function removeNode(node, parentNode) {
    throw new self.DOMException('removeNode is not available in a service/web worker');
  },
  injectStyles: function injectStyles(styles, destination, prepend) {
    throw new self.DOMException('injectStyles is not available in a service/web worker');
  }
};

var _PLATFORM = exports._PLATFORM = {
  location: self.location,
  addEventListener: function addEventListener(eventName, callback, capture) {
    self.global.addEventListener(eventName, callback, capture);
  },
  removeEventListener: function removeEventListener(eventName, callback, capture) {
    self.global.removeEventListener(eventName, callback, capture);
  },

  performance: self.performance
};

function initialize() {
  if (_aureliaPal.isInitialized) {
    return;
  }

  _ensurePerformance();
  _ensureCustomEvent();
  _ensureFunctionName();

  (0, _aureliaPal.initializePAL)(function (platform, feature, dom) {
    Object.assign(platform, _PLATFORM);
    Object.assign(feature, _FEATURE);
    Object.assign(dom, _DOM);

    (function (global) {
      global.console = global.console || {};
      var con = global.console;
      var prop = void 0;
      var method = void 0;
      var empty = {};
      var dummy = function dummy() {};
      var properties = 'memory'.split(',');
      var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
      while (prop = properties.pop()) {
        if (!con[prop]) con[prop] = empty;
      }while (method = methods.pop()) {
        if (!con[method]) con[method] = dummy;
      }
    })(platform.global);

    if (platform.global.console && _typeof(console.log) === 'object') {
      ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function (method) {
        console[method] = this.bind(console[method], console);
      }, Function.prototype.call);
    }
  });
}