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
