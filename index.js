var installed = false;
var originalSetTimeout = window.setTimeout;
var originalSetInterval = window.setInterval;
var version = 0;

beforeEach(function () {
  window.setTimeout = setTimeout;
  window.setInterval = setInterval;
});

afterEach(function () {
  version++;
  window.setTimeout = originalSetTimeout;
  window.setInterval = originalSetInterval;
});

function setTimeout(fn, ms) {
  var thisVersion = version;
  return originalSetTimeout(function () {
    if (thisVersion == version) {
      fn();
    }
  }, ms);
}

function setInterval(fn, ms) {
  var thisVersion = version;
  return originalSetInterval(function () {
    if (thisVersion == version) {
      fn();
    }
  }, ms);
}
