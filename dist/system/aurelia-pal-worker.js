'use strict';

System.register(['aurelia-pal'], function (_export, _context) {
  "use strict";

  var initializePAL, isInitialized, _typeof, _FEATURE, _DOM, _PLATFORM;

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

  _export('_ensureFunctionName', _ensureFunctionName);

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

  _export('_ensurePerformance', _ensurePerformance);

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

  _export('_ensureCustomEvent', _ensureCustomEvent);

  function na(name) {
    throw new self.DOMException(name + ' is not available in a service/web worker');
  }

  function initialize() {
    if (isInitialized) {
      return;
    }

    _ensurePerformance();
    _ensureCustomEvent();
    _ensureFunctionName();

    initializePAL(function (platform, feature, dom) {
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

  _export('initialize', initialize);

  return {
    setters: [function (_aureliaPal) {
      initializePAL = _aureliaPal.initializePAL;
      isInitialized = _aureliaPal.isInitialized;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _export('_FEATURE', _FEATURE = {});

      _export('_FEATURE', _FEATURE);

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
      _export('_DOM', _DOM = {
        boundary: 'aurelia-dom-boundary',
        addEventListener: function addEventListener(eventName, callback, capture) {
          na('addEventListener');
        },
        removeEventListener: function removeEventListener(eventName, callback, capture) {
          na('removeEventListener');
        },
        adoptNode: function adoptNode(node) {
          na('adoptNode');
        },
        createElement: function createElement(tagName) {
          na('createElement');
        },
        createAttribute: function createAttribute(name) {
          na('createAttribute');
        },
        createTextNode: function createTextNode(text) {
          na('createTextNode');
        },
        createComment: function createComment(text) {
          na('createComment');
        },
        createDocumentFragment: function createDocumentFragment() {
          na('createDocumentFragment');
        },
        createTemplateElement: function createTemplateElement() {
          na('createTemplateElement');
        },
        createMutationObserver: function createMutationObserver(callback) {
          na('createMutationObserver');
        },
        createCustomEvent: function createCustomEvent(eventType, options) {
          na('createCustomEvent');
        },
        dispatchEvent: function dispatchEvent(evt) {
          na('getComputedStyle');
        },
        getComputedStyle: function getComputedStyle(element) {
          na('getComputedStyle');
        },
        getElementById: function getElementById(id) {
          na('getElementById');
        },
        querySelectorAll: function querySelectorAll(query) {
          na('querySelectorAll');
        },
        nextElementSibling: function nextElementSibling(element) {
          na('nextElementSibling');
        },
        createTemplateFromMarkup: function createTemplateFromMarkup(markup) {
          na('createTemplateFromMarkup');
        },
        appendNode: function appendNode(newNode, parentNode) {
          na('appendNode');
        },
        replaceNode: function replaceNode(newNode, node, parentNode) {
          na('replaceNode');
        },
        removeNode: function removeNode(node, parentNode) {
          na('removeNode');
        },
        injectStyles: function injectStyles(styles, destination, prepend) {
          na('injectStyles');
        }
      });

      _export('_DOM', _DOM);

      _export('_PLATFORM', _PLATFORM = {
        location: self.location,
        addEventListener: function addEventListener(eventName, callback, capture) {
          self.global.addEventListener(eventName, callback, capture);
        },
        removeEventListener: function removeEventListener(eventName, callback, capture) {
          self.global.removeEventListener(eventName, callback, capture);
        },

        performance: self.performance
      });

      _export('_PLATFORM', _PLATFORM);
    }
  };
});