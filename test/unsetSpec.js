var expect = require('chai').expect;
var unset = require('../unset');

var originalSetTimeout = setTimeout;

function wait(n) {
  return new Promise(function (resolve) {
    originalSetTimeout(resolve, n);
  });
}

describe('unset', () => {
  describe('setTimeout', () => {
    it('behaves the same as setTimeout', () => {
      var setTimeoutCalled = false;

      unset.set();

      setTimeout(() => {
        setTimeoutCalled = true;
      }, 10);

      return wait(11).then(function () {
        expect(setTimeoutCalled).to.be.true;
      });
    });

    it("clearTimeout works", () => {
      var setTimeoutCalled = false;

      unset.set();

      var timeout = setTimeout(() => {
        setTimeoutCalled = true;
      }, 20);

      return wait(10).then(function () {
        clearTimeout(timeout);
        return wait(11).then(function () {
          expect(setTimeoutCalled).to.be.false;
        });
      });
    });

    it("doesn't call the callback if after unset is called", () => {
      var setTimeoutCalled = false;

      unset.set();

      setTimeout(() => {
        setTimeoutCalled = true;
      }, 20);

      return wait(10).then(function () {
        unset.unset();
        return wait(11).then(function () {
          expect(setTimeoutCalled).to.be.false;
        });
      });
    });
  });

  describe('setInterval', () => {
    it('behaves the same as setInterval', () => {
      var callbacks = 0;

      unset.set();

      setInterval(() => {
        callbacks++;
      }, 10);

      return wait(35).then(function () {
        expect(callbacks).to.equal(3);
      });
    });

    it('clearInterval works', () => {
      var callbacks = 0;

      unset.set();

      var interval = setInterval(() => {
        callbacks++;
      }, 10);

      return wait(35).then(function () {
        expect(callbacks).to.equal(3);
        clearInterval(interval);
        return wait(20);
      }).then(function () {
        expect(callbacks).to.equal(3);
      });
    });

    it("doesn't call callback after unset is called", () => {
      var callbacks = 0;

      unset.set();

      setInterval(() => {
        callbacks++;
      }, 10);

      return wait(35).then(function () {
        expect(callbacks).to.equal(3);
        unset.unset();
        return wait(20);
      }).then(function () {
        expect(callbacks).to.equal(3);
      });
    });
  });
});
