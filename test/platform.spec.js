import {MockWorker} from './mockworker';
import {_PLATFORM} from '../src/platform';

describe('PLATFORM', () => {
  let mockWorker;

  beforeEach(() => {
    mockWorker = new MockWorker(new Function(), {
      key: '_PLATFORM',
      palObject: _PLATFORM
    });

    mockWorker.init({
      postMessage: jasmine.createSpy('postMessage')
    });
  });

  it('should have location', () => {
    expect(mockWorker._PLATFORM.location).toBe(window.location);
  });

  it('should have addEventListener', () => {
    expect(mockWorker._PLATFORM.addEventListener).toBeDefined();
    expect(typeof mockWorker._PLATFORM.addEventListener).toBe('function');
  });

  it('should have removeEventListener', () => {
    expect(mockWorker._PLATFORM.removeEventListener).toBeDefined();
    expect(typeof mockWorker._PLATFORM.removeEventListener).toBe('function');
  });

  it('should have performance', () => {
    expect(mockWorker._PLATFORM.performance).toBeDefined();
    expect(mockWorker._PLATFORM.performance).toBe(window.performance);
  });
});
