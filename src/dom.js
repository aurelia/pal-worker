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
