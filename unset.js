var window = require('global');
var retry = require('trytryagain');
var PendingOperationsError = require('./pendingOperationsError');

var originalSetTimeout = window.setTimeout;
var originalClearTimeout = window.clearTimeout;
var originalSetInterval = window.setInterval;
var originalClearInterval = window.clearInterval;

module.exports.capture = function () {
  window.setTimeout = setTimeout;
  window.clearTimeout = clearTimeout;
  window.setInterval = setInterval;
  window.clearInterval = clearInterval;
};

module.exports.verify = function (options) {
  var timeout = options && options.timeout || 1000;
  return retry(function () {
    if (Object.keys(timeouts).length !== 0 || Object.keys(intervals).length !== 0) {
      throw new PendingOperationsError(
        'still waiting for setTimeouts to fire',
        Object.keys(timeouts).map(key => timeouts[key]),
        Object.keys(intervals).map(key => intervals[key])
      );
    }
  }, {
    timeout: timeout
  }).then(function () {
    window.setTimeout = originalSetTimeout;
    window.clearTimeout = originalClearTimeout;
    window.setInterval = originalSetInterval;
    window.clearInterval = originalClearInterval;
  });
};

var timeouts = {};
var intervals = {};

function setTimeout(fn, ms) {
  var id = originalSetTimeout(function () {
    delete timeouts[id];
    fn();
  }, ms);

  timeouts[id] = new Error().stack;

  return id;
}

function clearTimeout(id) {
  delete timeouts[id];
  originalClearTimeout(id);
}

function setInterval(fn, ms) {
  var id = originalSetInterval(function () {
    fn();
  }, ms);

  intervals[id] = new Error().stack;

  return id;
}

function clearInterval(id) {
  delete intervals[id];
  originalClearInterval(id);
}
