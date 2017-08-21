/**
* Represents the core APIs of the DOM.
*/
export const _DOM = {
  boundary: 'aurelia-dom-boundary',
  addEventListener(eventName: string, callback: Function, capture?: boolean): void {
    throw new self.DOMException('addEventListener is not available in a service/web worker');
  },
  removeEventListener(eventName: string, callback: Function, capture?: boolean): void {
    throw new self.DOMException('removeEventListener is not available in a service/web worker');
  },
  adoptNode(node: Node) {
    throw new self.DOMException('adoptNode is not available in a service/web worker');
  },
  createElement(tagName: string): Element {
    throw new self.DOMException('createElement is not available in a service/web worker');
  },
  createAttribute(name: string): Attr {
    throw new self.DOMException('createAttribute is not available in a service/web worker');
  },
  createTextNode(text) {
    throw new self.DOMException('createTextNode is not available in a service/web worker');
  },
  createComment(text) {
    throw new self.DOMException('createComment is not available in a service/web worker');
  },
  createDocumentFragment(): DocumentFragment {
    throw new self.DOMException('createDocumentFragment is not available in a service/web worker');
  },
  createMutationObserver(callback: Function): MutationObserver {
    throw new self.DOMException('createMutationObserver is not available in a service/web worker');
  },
  createCustomEvent(eventType: string, options: Object): CustomEvent {
    throw new self.DOMException('createCustomEvent is not available in a service/web worker');
  },
  dispatchEvent(evt): void {
    throw new self.DOMException('getComputedStyle is not available in a service/web worker');
  },
  getComputedStyle(element: Element) {
    throw new self.DOMException('getComputedStyle is not available in a service/web worker');
  },
  getElementById(id: string): Element {
    throw new self.DOMException('getElementById is not available in a service/web worker');
  },
  querySelectorAll(query: string) {
    throw new self.DOMException('querySelectorAll is not available in a service/web worker');
  },
  nextElementSibling(element: Node): Element {
    throw new self.DOMException('nextElementSibling is not available in a service/web worker');
  },
  createTemplateFromMarkup(markup: string): Element {
    throw new self.DOMException('createTemplateFromMarkup is not available in a service/web worker');
  },
  appendNode(newNode: Node, parentNode?: Node): void {
    throw new self.DOMException('appendNode is not available in a service/web worker');
  },
  replaceNode(newNode: Node, node: Node, parentNode?: Node): void {
    throw new self.DOMException('replaceNode is not available in a service/web worker');
  },
  removeNode(node: Node, parentNode?: Node): void {
    throw new self.DOMException('removeNode is not available in a service/web worker');
  },
  injectStyles(styles: string, destination?: Element, prepend?: boolean): Node {
    throw new self.DOMException('injectStyles is not available in a service/web worker');
  }
};
