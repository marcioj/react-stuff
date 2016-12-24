var ReactMultiChild = require('react/lib/ReactMultiChild');
var EventListener = require('./eventListener');

// TODO remove this
function inspect(obj) {
  var str = '';
  for (var key in obj) {
    str += key + ': ' + obj[key] + ',\n';
  }
  str = '{ ' + str + ' }';
  print(str);
}

function updateNativeComponent(nativeComponent, props, update) {
  for (var key in props) {
    if (key === 'children') { continue; }
    var value = props[key];
    if (EventListener.isEventName(key)) {
      EventListener.add(nativeComponent, key, value);
    } else {
      var setter = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
      nativeComponent[setter](value);
    }
  }
}

function ReactJavaBaseComponent(viewConfig) {
  this.viewConfig = viewConfig;
  if (!this.viewConfig.setupNativeComponent) {
    this.viewConfig.setupNativeComponent = () => { };
  }
  print("constructor")
};

ReactJavaBaseComponent.prototype = Object.assign(
  {
    // a nice symmetry to [TODO: React Lifecycle Methods] exists here.
    // these are the required methods to implement. You may additionally provide
    // custom implementations of other lifecycle methods or any arbitrary
    // methods that are private to your implementation.
    getPublicInstance() {
      return this._nativeComponent;
    },
    mountComponent(transaction, nativeParent, nativeContainerInfo, context) {
      print("mountComponent")

      this._nativeComponent = new this.viewConfig.javaClass();

      this.initializeChildren(
        this._currentElement.props.children,
        this._nativeComponent,
        transaction,
        context
      );

      // each property and value is applied as a setter
      // so <Foo message="hello" /> will call this._nativeComponent.setMessage("hello")
      var props = this._currentElement.props;
      updateNativeComponent(this._nativeComponent, props);

      this.viewConfig.setupNativeComponent.call(null, this._nativeComponent);

      this.node = this._currentElement;

      return this._nativeComponent;
    },
    initializeChildren: function (children, containerTag, transaction, context) {
      var mountImages = this.mountChildren(this._currentElement.props.children, transaction, context);
      for (var i = 0; i < mountImages.length; i++) {
        var image = mountImages[i];
        containerTag.add(image);
      }
    },
    receiveComponent(nextElement, transaction, context) {
      //print("receiveComponent")
      var prevElement = this._currentElement;
      this._currentElement = nextElement;

      // TODO diff props
      javax.swing.SwingUtilities.invokeLater(() => {
        updateNativeComponent(this._nativeComponent, nextElement.props);
      });

      // this.updateChildren comes from ReactMultiChild.Mixin
      this.updateChildren(nextElement.props.children, transaction, context);
    },
    unmountComponent() {
      print("unmountComponent")
    },
    // implement both of these for now. React <= 15.0 uses getNativeNode, but
    // that is confusing. Host environment is more accurate and will be used
    // going forward
    getNativeNode() { },
    getHostNode() { }
  },
  ReactMultiChild.Mixin
);

module.exports = { ReactJavaBaseComponent };
