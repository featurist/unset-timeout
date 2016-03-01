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
  return new Promise(function(success){
    var interval = originalSetInterval(function(){
      if(unsetTimeout.timeouts === 0 && unsetTimeout.intervals === 0) {
        originalClearInterval(interval);
        window.setTimeout = originalSetTimeout;
        window.clearTimeout = originalClearTimeout;
        window.setInterval = originalSetInterval;
        window.clearInterval = originalClearInterval;
        success();
      }
    }, 10);
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

  return originalSetInterval(function () {
    unsetTimeout.intervals--;
    fn();
  }, ms);
}

function clearInterval(id) {
  unsetTimeout.intervals--;
  originalClearInterval(id);
}
