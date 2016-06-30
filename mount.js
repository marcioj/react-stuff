var instantiateReactComponent = require('react/lib/instantiateReactComponent');
var ReactInstanceHandles = require('react/lib/ReactInstanceHandles');
var ReactUpdates = require('react/lib/ReactUpdates');
var DefaultInjection = require('./injection');

DefaultInjection.inject();

function render(
  nextElement, // ReactElement description.
  callback // optional callback for when mount is complete
) {

  // the first thing you'll want to do in here is confirm that they passed in a
  // valid ReactElement. The implementation of this is the same across renderers
  // with the exception of the error message through when the invariant fails.
  // invariants.isValidElement(nextElement);

  // For this tiny renderer, we do not have a target element to render into,
  // though many renderers have this concern. In this scenario you should
  // consider applying a `warning` or `invariant` to that argument to ensure the
  // consumer has an educational experience in development mode. A key objective
  // of writing a renderer is to make interacting with the host system simpler.
  // A given renderer should seek to help its’ users to avoid simple mistakes
  // such as passing in a non-existent DOM node.
  //
  // @example:
  //   warning.isValidTargetElement(targetElement);

  // Appendix 1: Rerendering A Top Level Element
  // https://github.com/iamdustan/tiny-react-renderer/tree/master/appendix/1-Rendering-A-Top-Level-Element.md
  //
  // If there is a target element or the opportunity to reuse a previous render
  // call, you would look up the previous element and reconcile from there.

  // Woohoo! The consumer has now made it to the point where we’re interacting
  // with React internals! Since any application can have multiple roots, we
  // want to get an identifier from the `ReactInstanceHandles` component.
  //
  // Next we instantiate a new ReactComponent from the ReactElement passed in.
  const rootId = ReactInstanceHandles.createReactRootID(0);
  const component = instantiateReactComponent(nextElement);

  // The initial render is currently synchronous, but any updates that happen
  // during rendering, in componentWillMount or componentDidMount, will be
  // batched according to the current batching strategy.
  //
  // Note: there is ongoing research for creating an incremental reconciler
  // which may impact this aspect of renderer creation.
  //
  // Assuming you’ve read the [React Reconciliation Algorithm](https://facebook.github.io/react/docs/reconciliation.html) article on
  // the React docs, this may be familiar. The “public” API for accomplishing
  // this is done with a batching strategy and transaction. React provides
  // default implementations for both of these and do not require any effort
  // from us other than calling them.
  ReactUpdates.batchedUpdates(() => {
    // Two points to React for using object pooling internally and being good
    // stewards of garbage collection and memory pressure.
    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(() => {
      // the `component` here is an instance of your
      // `ReactCustomRendererComponent` class. To be 100% honest, I’m not
      // certain if the method signature is enforced by React core or if it is
      // renderer specific. This is following the ReactDOM renderer. The
      // important piece is that we pass our transaction and rootId through, in
      // addition to any other contextual information needed.
      component.mountComponent(
        transaction,
        rootId,
        {_idCounter: 0},
        {}
      );
      if (callback) {
        callback(component.getPublicInstance());
      }
    });
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  });
};

// Congratulations! You’ve done it! You have a React renderer! Though so far
// we haven’t done anything interesting. For that we need to implement our
// ReactComponent class. For that you’ll head over to `./component.js`. See you
// there!
module.exports = render;
