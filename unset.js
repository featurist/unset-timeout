var window = require('global');

var originalSetTimeout = window.setTimeout;
var originalSetInterval = window.setInterval;

var timeouts = [];
var intervals = [];

module.exports.set = function () {
  window.setTimeout = setTimeout;
  window.setInterval = setInterval;
};

module.exports.unset = function (options) {
  for(var t = 0; t < timeouts.length; t++) {
    clearTimeout(timeouts[t]);
  }
  for(var i = 0; i < intervals.length; i++) {
    clearInterval(intervals[i]);
  }

  window.setTimeout = originalSetTimeout;
  window.setInterval = originalSetInterval;
};

function setTimeout(fn, ms) {
  var id = originalSetTimeout(fn, ms);

  timeouts.push(id);

  return id;
}

function setInterval(fn, ms) {
  var id = originalSetInterval(fn, ms);

  intervals.push(id);

  return id;
}
