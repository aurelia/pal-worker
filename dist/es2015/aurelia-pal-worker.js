import { initializePAL, isInitialized } from 'aurelia-pal';

export function _ensureFunctionName() {
  function test() {}

  if (!test.name) {
    Object.defineProperty(Function.prototype, 'name', {
      get: function () {
        let name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];

        Object.defineProperty(this, 'name', { value: name });
        return name;
      }
    });
  }
}

export function _ensurePerformance() {
  // @license http://opensource.org/licenses/MIT
  if ('performance' in self === false) {
    self.performance = {};
  }

  Date.now = Date.now || function () {
    return new Date().getTime();
  };

  if ('now' in self.performance === false) {
    let nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart;
    }

    self.performance.now = function now() {
      return Date.now() - nowOffset;
    };
  }
}

export function _ensureCustomEvent() {
  if (!self.CustomEvent || typeof self.CustomEvent !== 'function') {
    const CustomEvent = (event, { bubbles = false, cancelable = false, detail = false }) => {
      let evt = new self.CustomEvent(event, bubbles, cancelable, detail);

      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent.prototype = self.Event.prototype;
    self.CustomEvent = CustomEvent;
  }
}

export const _FEATURE = {};

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

export const _DOM = {
  boundary: 'aurelia-dom-boundary',
  addEventListener(eventName, callback, capture) {
    throw new self.DOMException('addEventListener is not available in a service/web worker');
  },
  removeEventListener(eventName, callback, capture) {
    throw new self.DOMException('removeEventListener is not available in a service/web worker');
  },
  adoptNode(node) {
    throw new self.DOMException('adoptNode is not available in a service/web worker');
  },
  createElement(tagName) {
    throw new self.DOMException('createElement is not available in a service/web worker');
  },
  createTextNode(text) {
    throw new self.DOMException('createTextNode is not available in a service/web worker');
  },
  createComment(text) {
    throw new self.DOMException('createComment is not available in a service/web worker');
  },
  createDocumentFragment() {
    throw new self.DOMException('createDocumentFragment is not available in a service/web worker');
  },
  createMutationObserver(callback) {
    throw new self.DOMException('createMutationObserver is not available in a service/web worker');
  },
  createCustomEvent(eventType, options) {
    throw new self.DOMException('createCustomEvent is not available in a service/web worker');
  },
  dispatchEvent(evt) {
    throw new self.DOMException('getComputedStyle is not available in a service/web worker');
  },
  getComputedStyle(element) {
    throw new self.DOMException('getComputedStyle is not available in a service/web worker');
  },
  getElementById(id) {
    throw new self.DOMException('getElementById is not available in a service/web worker');
  },
  querySelectorAll(query) {
    throw new self.DOMException('querySelectorAll is not available in a service/web worker');
  },
  nextElementSibling(element) {
    throw new self.DOMException('nextElementSibling is not available in a service/web worker');
  },
  createTemplateFromMarkup(markup) {
    throw new self.DOMException('createTemplateFromMarkup is not available in a service/web worker');
  },
  appendNode(newNode, parentNode) {
    throw new self.DOMException('appendNode is not available in a service/web worker');
  },
  replaceNode(newNode, node, parentNode) {
    throw new self.DOMException('replaceNode is not available in a service/web worker');
  },
  removeNode(node, parentNode) {
    throw new self.DOMException('removeNode is not available in a service/web worker');
  },
  injectStyles(styles, destination, prepend) {
    throw new self.DOMException('injectStyles is not available in a service/web worker');
  }
};

export const _PLATFORM = {
  location: self.location,
  addEventListener(eventName, callback, capture) {
    self.global.addEventListener(eventName, callback, capture);
  },
  removeEventListener(eventName, callback, capture) {
    self.global.removeEventListener(eventName, callback, capture);
  },
  performance: self.performance
};

export function initialize() {
  if (isInitialized) {
    return;
  }

  _ensurePerformance();
  _ensureCustomEvent();
  _ensureFunctionName();

  initializePAL((platform, feature, dom) => {
    Object.assign(platform, _PLATFORM);
    Object.assign(feature, _FEATURE);
    Object.assign(dom, _DOM);

    (function (global) {
      global.console = global.console || {};
      let con = global.console;
      let prop;
      let method;
      let empty = {};
      let dummy = function () {};
      let properties = 'memory'.split(',');
      let methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
      while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
      while (method = methods.pop()) if (!con[method]) con[method] = dummy;
    })(platform.global);

    if (platform.global.console && typeof console.log === 'object') {
      ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function (method) {
        console[method] = this.bind(console[method], console);
      }, Function.prototype.call);
    }
  });
}