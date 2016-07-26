import {MockWorker} from './mockworker';
import {_DOM} from '../src/dom';

describe('DOM', () => {
  let mockWorker;

  beforeEach(() => {
    mockWorker = new MockWorker(new Function(), {
      key: '_DOM',
      palObject: _DOM
    });

    mockWorker.init({
      postMessage: jasmine.createSpy('postMessage')
    });
  });

  it('should not be able to add an event listener', () => {
    expect(() => {
      mockWorker._DOM.addEventListener('event', new Function());
    })
    .toThrow(new DOMException('addEventListener is not available in a service/web worker'));
  });

  it('should not be able to remove an event listener', () => {
    expect(() => {
      mockWorker._DOM.removeEventListener('event', new Function());
    })
    .toThrow(new DOMException('removeEventListener is not available in a service/web worker'));
  });

  it('should not be able to adopt a node', () => {
    expect(() => {
      mockWorker._DOM.adoptNode({});
    })
    .toThrow(new DOMException('adoptNode is not available in a service/web worker'));
  });

  it('should not be able to create element', () => {
    expect(() => {
      mockWorker._DOM.createElement('input');
    })
    .toThrow(new DOMException('createElement is not available in a service/web worker'));
  });

  it('should not be able to create a text node', () => {
    expect(() => {
      mockWorker._DOM.createTextNode('text');
    })
    .toThrow(new DOMException('createTextNode is not available in a service/web worker'));
  });

  it('should not be able to create a comment', () => {
    expect(() => {
      mockWorker._DOM.createComment('comment');
    })
    .toThrow(new DOMException('createComment is not available in a service/web worker'));
  });

  it('should not be able to create a document fragment', () => {
    expect(() => {
      mockWorker._DOM.createDocumentFragment();
      })
      .toThrow(new DOMException('createDocumentFragment is not available in a service/web worker'));
  });

  it('should not be able to create a mutation observer', () => {
    expect(() => {
      mockWorker._DOM.createMutationObserver(new Function());
      })
      .toThrow(new DOMException('createMutationObserver is not available in a service/web worker'));
  });

  it('should not be able to create a custom event', () => {
    expect(() => {
      mockWorker._DOM.createCustomEvent('event', {});
    })
    .toThrow(new DOMException('createCustomEvent is not available in a service/web worker'));
  });

  it('should not be able to dispatch an event', () => {
    expect(() => {
      mockWorker._DOM.dispatchEvent({});
    })
    .toThrow(new DOMException('getComputedStyle is not available in a service/web worker'));
  });

  it('should not be able to get a computed style', () => {
    expect(() => {
      mockWorker._DOM.getComputedStyle({});
    })
    .toThrow(new DOMException('getComputedStyle is not available in a service/web worker'));
  });

  it('should not be able to get an element by id', () => {
    expect(() => {
      mockWorker._DOM.getElementById('#id');
    })
    .toThrow(new DOMException('getElementById is not available in a service/web worker'));
  });

  it('should not be able to query selector all', () => {
    expect(() => {
      mockWorker._DOM.querySelectorAll('query');
    })
    .toThrow(new DOMException('querySelectorAll is not available in a service/web worker'));
  });

  it('should not be able to get the next element sibling', () => {
    expect(() => {
      mockWorker._DOM.nextElementSibling({});
    })
    .toThrow(new DOMException('nextElementSibling is not available in a service/web worker'));
  });

  it('should not be able to create a template from markup', () => {
    expect(() => {
      mockWorker._DOM.createTemplateFromMarkup('markup');
    })
    .toThrow(new DOMException('createTemplateFromMarkup is not available in a service/web worker'));
  });

  it('should not be able to append a node', () => {
    expect(() => {
      mockWorker._DOM.appendNode({});
    })
    .toThrow(new DOMException('appendNode is not available in a service/web worker'));
  });

  it('should not be able to replace a node', () => {
    expect(() => {
      mockWorker._DOM.replaceNode({});
    })
    .toThrow(new DOMException('replaceNode is not available in a service/web worker'));
  });

  it('should not be able to remove a node', () => {
    expect(() => {
      mockWorker._DOM.removeNode({});
    })
    .toThrow(new DOMException('removeNode is not available in a service/web worker'));
  });

  it('should not be able to inject a style', () => {
    expect(() => {
      mockWorker._DOM.injectStyles('style');
    })
    .toThrow(new DOMException('injectStyles is not available in a service/web worker'));
  });
});
