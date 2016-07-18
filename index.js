var unset = require('./unset');

beforeEach(function () {
  unset.set();
});

afterEach(function () {
  unset.unset();
});
