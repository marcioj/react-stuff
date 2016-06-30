var ReactInjection = require('react/lib/ReactInjection');
var ReactDefaultBatchingStrategy = require('react/lib/ReactDefaultBatchingStrategy');
var JavaReconcileTransaction = require('./reconcileTransaction');
var components = require('./component');
var ReactJavaBaseComponent = components.ReactJavaBaseComponent;

function inject() {
  // ReactInjection.NativeComponent.injectTextComponentClass(ReactTextComponent);
  ReactInjection.NativeComponent.injectGenericComponentClass(ReactJavaBaseComponent);
  ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
  ReactInjection.Updates.injectReconcileTransaction(JavaReconcileTransaction);
}

module.exports = { inject };
