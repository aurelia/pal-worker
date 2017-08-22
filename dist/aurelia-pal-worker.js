import {initializePAL,isInitialized} from 'aurelia-pal';

export function _ensureFunctionName(): void {
  // Fix Function#name on browsers that do not support it (IE):
  function test() {}

  if (!test.name) {
    Object.defineProperty(Function.prototype, 'name', {
      get: function() {
        let name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
        // For better performance only parse once, and then cache the
        // result through a new accessor for repeated access.
        Object.defineProperty(this, 'name', { value: name });
        return name;
      }
    });
  }
}

export function _ensurePerformance(): void {
  // performance polyfill. Copied from https://gist.github.com/paulirish/5438650

  // https://gist.github.com/paulirish/5438650
  // @license http://opensource.org/licenses/MIT
  // copyright Paul Irish 2015

  if ('performance' in self === false) {
    self.performance = {};
  }

  Date.now = (Date.now || function() {
    return new Date().getTime();
  });

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

export function _ensureCustomEvent(): void {
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

_FEATURE.shadowDOM = (function() {
  return false;
})();

_FEATURE.scopedCSS = (function() {
  return false;
})();

_FEATURE.htmlTemplateElement = (function() {
  return false;
})();

_FEATURE.mutationObserver = (function() {
  return false;
})();

function na(name) {
  throw new self.DOMException(`${name} is not available in a service/web worker`);
}

/**
* Represents the core APIs of the DOM.
*/
export const _DOM = {
  boundary: 'aurelia-dom-boundary',
  addEventListener(eventName: string, callback: Function, capture?: boolean): void {
    na('addEventListener');
  },
  removeEventListener(eventName: string, callback: Function, capture?: boolean): void {
    na('removeEventListener');
  },
  adoptNode(node: Node) {
    na('adoptNode');
  },
  createElement(tagName: string): Element {
    na('createElement');
  },
  createAttribute(name: string): Attr {
    na('createAttribute');
  },
  createTextNode(text) {
    na('createTextNode');
  },
  createComment(text) {
    na('createComment');
  },
  createDocumentFragment(): DocumentFragment {
    na('createDocumentFragment');
  },
  createTemplateElement(): HTMLTemplateElement {
    na('createTemplateElement');
  },
  createMutationObserver(callback: Function): MutationObserver {
    na('createMutationObserver');
  },
  createCustomEvent(eventType: string, options: Object): CustomEvent {
    na('createCustomEvent');
  },
  dispatchEvent(evt): void {
    na('getComputedStyle');
  },
  getComputedStyle(element: Element) {
    na('getComputedStyle');
  },
  getElementById(id: string): Element {
    na('getElementById');
  },
  querySelectorAll(query: string) {
    na('querySelectorAll');
  },
  nextElementSibling(element: Node): Element {
    na('nextElementSibling');
  },
  createTemplateFromMarkup(markup: string): Element {
    na('createTemplateFromMarkup');
  },
  appendNode(newNode: Node, parentNode?: Node): void {
    na('appendNode');
  },
  replaceNode(newNode: Node, node: Node, parentNode?: Node): void {
    na('replaceNode');
  },
  removeNode(node: Node, parentNode?: Node): void {
    na('removeNode');
  },
  injectStyles(styles: string, destination?: Element, prepend?: boolean): Node {
    na('injectStyles');
  }
};

export const _PLATFORM = {
  location: self.location,
  addEventListener(eventName: string, callback: Function, capture: boolean): void {
    self.global.addEventListener(eventName, callback, capture);
  },
  removeEventListener(eventName: string, callback: Function, capture: boolean): void {
    self.global.removeEventListener(eventName, callback, capture);
  },
  performance: self.performance
};

/**
* Initializes the PAL with the Worker-targeted implementation.
*/
export function initialize(): void {
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

    (function(global) {
      global.console = global.console || {};
      let con = global.console;
      let prop;
      let method;
      let empty = {};
      let dummy = function() {};
      let properties = 'memory'.split(',');
      let methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
         'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
         'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
      while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
      while (method = methods.pop()) if (!con[method]) con[method] = dummy;
    })(platform.global);

    if (platform.global.console && typeof console.log === 'object') {
      ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function(method) {
        console[method] = this.bind(console[method], console);
      }, Function.prototype.call);
    }
  });
}
