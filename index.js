var retry = require('trytryagain');
var originalSetTimeout = window.setTimeout;
var originalClearTimeout = window.clearTimeout;
var originalSetInterval = window.setInterval;
var originalClearInterval = window.clearInterval;

beforeEach(function () {
  window.unsetTimeout = {
    timeouts: 0,
    intervals: 0
  };
  window.setTimeout = setTimeout;
  window.clearTimeout = clearTimeout;
  window.setInterval = setInterval;
  window.clearInterval = clearInterval;
});

afterEach(function () {
  return retry(function() {
    if(unsetTimeout.timeouts > 0 || unsetTimeout.intervals > 0) {
      var error = new Error('This has test has started at least one delayed function that is yet to complete');
      error.pendingTimeouts = unsetTimeout.timeouts;
      error.pendingIntervals = unsetTimeout.intervals;
      throw error;
    }
    window.setTimeout = originalSetTimeout;
    window.clearTimeout = originalClearTimeout;
    window.setInterval = originalSetInterval;
    window.clearInterval = originalClearInterval;
  });
});

function setTimeout(fn, ms) {
  unsetTimeout.timeouts++;

  return originalSetTimeout(function () {
    unsetTimeout.timeouts--;
    fn();
  }, ms);
}

function clearTimeout(id) {
  unsetTimeout.timeouts--;
  originalClearTimeout(id);
}

function setInterval(fn, ms) {
  unsetTimeout.intervals++;

  return originalSetInterval(fn, ms);
}

function clearInterval(id) {
  unsetTimeout.intervals--;
  originalClearInterval(id);
}

