var unset = require('./unset');

beforeEach(function () {
  unset.capture();
});

afterEach(function () {
  return unset.verify();
});
