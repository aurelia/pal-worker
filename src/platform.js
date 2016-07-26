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
