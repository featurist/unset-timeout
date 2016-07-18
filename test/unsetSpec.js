var expect = require('chai').expect;
var unset = require('../unset');

describe('unset', () => {
  describe('setTimeout', () => {
    it('is called before the test timesout', () => {
      var setTimeoutCalled = false;
      unset.capture();
      setTimeout(() => {
        setTimeoutCalled = true;
      }, 10);
      return unset.verify().then(() => {
        expect(setTimeoutCalled).to.be.true;
      });
    });

    it('is not called before the test timesout', () => {
      var setTimeoutCalled = false;
      unset.capture();
      function runTimeout() {
        setTimeout(() => {
          setTimeoutCalled = true;
        }, 100);
      }
      runTimeout();
      return unset.verify({timeout: 5}).catch(e => {
        expect(setTimeoutCalled).to.be.false;
        expect(e.pendingTimeouts[0]).to.contain('runTimeout');
      });
    });
  });

  describe('setInterval', () => {
    it('is called before the test timesout', () => {
      unset.capture();
      var intervalId = setInterval(() => {
      }, 10);
      setTimeout(() => {
        clearInterval(intervalId);
      }, 100);
      return unset.verify();
    });

    it('is not called before the test timesout', () => {
      unset.capture();
      function runInterval() {
        var intervalId = setInterval(() => {
        }, 10);
      }
      runInterval();
      return unset.verify({timeout: 5}).catch(e => {
        expect(e.pendingIntervals[0]).to.contain('runInterval');
      });
    });
  });
});
