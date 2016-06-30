const CallbackQueue = require('react/lib/CallbackQueue');
const PooledClass = require('react/lib/PooledClass');
const Transaction = require('react/lib/Transaction');

/**
 * Provides a `CallbackQueue` queue for collecting `onDOMReady` or analogous
 * callbacks during the performing of the transaction.
 */
const ON_RENDERER_READY_QUEUEING = {
  /**
   * Initializes the internal firmata `connected` queue.
   */
  initialize: function() {
    this.reactMountReady.reset();
  },

  /**
   * After Hardware is connected, invoke all registered `ready` callbacks.
   */
  close: function() {
    this.reactMountReady.notifyAll();
  },
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
const TRANSACTION_WRAPPERS = [ON_RENDERER_READY_QUEUEING];

function JavaReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = CallbackQueue.getPooled(null);
}

const Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap procedures.
   */
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  },

  /**
   * @return {object} The queue to collect `ready` callbacks with.
   */
  getReactMountReady: function() {
    return this.reactMountReady;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function() {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  },
};

Object.assign(
  JavaReconcileTransaction.prototype,
  Transaction.Mixin,
  JavaReconcileTransaction,
  Mixin
);

PooledClass.addPoolingTo(JavaReconcileTransaction);

module.exports = JavaReconcileTransaction;
