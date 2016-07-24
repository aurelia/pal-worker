export class MockWorker {
  constructor(Worker = window.Worker, { key, palObject }) {
    this.path = this.getWorkerURL();
    this.worker = new Worker(this.path);
    this[key] = palObject;
  }

  init(context) {
    context.onmessage = e => {
      context.postMessage('Received message');
    };
  }

  /**
    Create URL string (path) to file which contents are stored in DOM Blob object

    Reference:
      https://w3c.github.io/FileAPI/#dfn-createObjectURL
  */
  getWorkerURL() {
    return URL.createObjectURL(new Blob([
      `(${this.init})(this)`
    ], {
      type: 'text/javascript'
    }));
  }

  /**
    Cleanup: terminate web worker & release reference

    Reference:
      https://w3c.github.io/FileAPI/#dfn-revokeObjectURL
  */
  terminate() {
      this && this.terminate();

    if(this.path) {
      URL.revokeObjectURL(this.path);
    }
  }
};
