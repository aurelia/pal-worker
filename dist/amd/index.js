define(['exports', './aurelia-pal-worker'], function (exports, _aureliaPalWorker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaPalWorker).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaPalWorker[key];
      }
    });
  });
});