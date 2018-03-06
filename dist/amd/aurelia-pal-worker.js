define(['exports', 'aurelia-pal'], function (exports, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._PLATFORM = exports._DOM = exports._FEATURE = undefined;
  exports._ensureFunctionName = _ensureFunctionName;
  exports._ensurePerformance = _ensurePerformance;
  exports._ensureCustomEvent = _ensureCustomEvent;
  exports.initialize = initialize;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

    var startOffset = Date.now ? Date.now() : +new Date();
    var _entries = [];
    var _marksIndex = {};

    function _filterEntries(key, value) {
      var i = 0,
          n = _entries.length,
          result = [];
      for (; i < n; i++) {
        if (_entries[i][key] == value) {
          result.push(_entries[i]);
        }
      }
      return result;
    }

    function _clearEntries(type, name) {
      var i = _entries.length,
          entry;
      while (i--) {
        entry = _entries[i];
        if (entry.entryType == type && (name === void 0 || entry.name == name)) {
          _entries.splice(i, 1);
        }
      }
    };

    if (!self.performance.mark) {
      self.performance.mark = self.performance.webkitMark || function (name) {
        var mark = {
          name: name,
          entryType: "mark",
          startTime: self.performance.now(),
          duration: 0
        };

        _entries.push(mark);
        _marksIndex[name] = mark;
      };
    }

    if (!self.performance.measure) {
      self.performance.measure = self.performance.webkitMeasure || function (name, startMark, endMark) {
        startMark = _marksIndex[startMark].startTime;
        endMark = _marksIndex[endMark].startTime;

        _entries.push({
          name: name,
          entryType: "measure",
          startTime: startMark,
          duration: endMark - startMark
        });
      };
    }

    if (!self.performance.getEntriesByType) {
      self.performance.getEntriesByType = self.performance.webkitGetEntriesByType || function (type) {
        return _filterEntries("entryType", type);
      };
    }

    if (!self.performance.getEntriesByName) {
      self.performance.getEntriesByName = self.performance.webkitGetEntriesByName || function (name) {
        return _filterEntries("name", name);
      };
    }

    if (!self.performance.clearMarks) {
      self.performance.clearMarks = self.performance.webkitClearMarks || function (name) {
        _clearEntries("mark", name);
      };
    }

    if (!self.performance.clearMeasures) {
      self.performance.clearMeasures = self.performance.webkitClearMeasures || function (name) {
        _clearEntries("measure", name);
      };
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

  function na(name) {
    throw new self.DOMException(name + ' is not available in a service/web worker');
  }

  var _DOM = exports._DOM = {
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
});