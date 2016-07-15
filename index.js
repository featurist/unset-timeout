var retry = require('trytryagain');

var originalSetTimeout = window.setTimeout;
var originalClearTimeout = window.clearTimeout;
var originalSetInterval = window.setInterval;
var originalClearInterval = window.clearInterval;

beforeEach(function () {
  window.setTimeout = setTimeout;
  window.clearTimeout = clearTimeout;
  window.setInterval = setInterval;
  window.clearInterval = clearInterval;
});

afterEach(function () {
  return retry(function () {
    if (Object.keys(timeouts).length !== 0 || Object.keys(intervals).length !== 0) {
      throw new Error('still waiting for setTimeouts to fire');
    }
  }).then(function () {
    window.setTimeout = originalSetTimeout;
    window.clearTimeout = originalClearTimeout;
    window.setInterval = originalSetInterval;
    window.clearInterval = originalClearInterval;
  });
});

var timeouts = {};
var intervals = {};

function setTimeout(fn, ms) {
  var id = originalSetTimeout(function () {
    delete timeouts[id];
    fn();
  }, ms);

  timeouts[id] = ms;

  return id;
}

function clearTimeout(id) {
  delete timeouts[id];
  originalClearTimeout(id);
}

function setInterval(fn, ms) {
  var id = originalSetInterval(function () {
    delete intervals[id];
    fn();
  }, ms);

  intervals[id] = ms;

  return id;
}

function clearInterval(id) {
  delete intervals[id];
  originalClearInterval(id);
}
