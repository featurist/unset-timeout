function PendingOperationsError(message, pendingTimeouts, pendingIntervals) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.pendingTimeouts = pendingTimeouts;
  this.pendingIntervals = pendingIntervals;
};

require('util').inherits(PendingOperationsError, Error);

module.exports = PendingOperationsError;
