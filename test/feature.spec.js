import {MockWorker} from './mockworker';
import {_FEATURE} from '../src/feature';

describe('FEATURE', () => {
  let mockWorker;

  beforeEach(() => {
    mockWorker = new MockWorker(new Function(), {
      key: '_FEATURE',
      palObject: _FEATURE
    });

    mockWorker.init({
      postMessage: jasmine.createSpy('postMessage')
    });
  });

  it('should return false for shadowDOM', () => {
    expect(mockWorker._FEATURE.shadowDOM).toBe(false);
  });

  it('should return false for scopedCSS', () => {
    expect(mockWorker._FEATURE.scopedCSS).toBe(false);
  });

  it('should return false for htmlTemplateElement', () => {
    expect(mockWorker._FEATURE.htmlTemplateElement).toBe(false);
  });

  it('should return false for mutationObserver', () => {
    expect(mockWorker._FEATURE.mutationObserver).toBe(false);
  });
});
