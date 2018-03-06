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

  const startOffset = Date.now ? Date.now() : + (new Date);
  const _entries = [];
  const _marksIndex = {};

  function _filterEntries(key, value) {
    var i = 0, n = _entries.length, result = [];
    for (; i < n; i++) {
      if (_entries[i][key] == value) {
        result.push(_entries[i]);
      }
    }
    return result;
  }

  function _clearEntries(type, name) {
    var i = _entries.length, entry;
    while (i--) {
      entry = _entries[i];
      if (entry.entryType == type && (name === void 0 || entry.name == name)) {
        _entries.splice(i, 1);
      }
    }
  };

  if (!self.performance.mark) {
    self.performance.mark = self.performance.webkitMark || function (name) {
      const mark = {
        name,
        entryType: "mark",
        startTime: self.performance.now(),
        duration: 0
      };

      _entries.push(mark);
      _marksIndex[name] = mark;
    };
  }


  if (!self.performance.measure) {
    self.performance.measure = self.performance.webkitMeasure || function (name, startMark, endMark) {
      startMark = _marksIndex[startMark].startTime;
      endMark = _marksIndex[endMark].startTime;

      _entries.push({
        name,
        entryType: "measure",
        startTime: startMark,
        duration: endMark - startMark
      });
    };
  }


  if (!self.performance.getEntriesByType) {
    self.performance.getEntriesByType = self.performance.webkitGetEntriesByType || function (type) {
      return _filterEntries("entryType", type);
    };
  }


  if (!self.performance.getEntriesByName) {
    self.performance.getEntriesByName = self.performance.webkitGetEntriesByName || function (name) {
      return _filterEntries("name", name);
    };
  }


  if (!self.performance.clearMarks) {
    self.performance.clearMarks = self.performance.webkitClearMarks || function (name) {
      _clearEntries("mark", name);
    };
  }


  if (!self.performance.clearMeasures) {
    self.performance.clearMeasures = self.performance.webkitClearMeasures || function (name) {
      _clearEntries("measure", name);
    };
}
}
