var { ReactJavaBaseComponent } = require('./component');

var createJavaComponentClass = function(viewConfig) {
  var Constructor = function(element) {
    this._currentElement = element;
    this._topLevelWrapper = null;
    this._hostParent = null;
    this._hostContainerInfo = null;
    this._rootNodeID = null;
    this._renderedChildren = null;
    this._nativeComponent = null;
  };
  Constructor.displayName = viewConfig.uiViewClassName;
  Constructor.viewConfig = viewConfig;
  Constructor.propTypes = viewConfig.propTypes;
  Constructor.prototype = new ReactJavaBaseComponent(viewConfig);
  Constructor.prototype.constructor = Constructor;

  return Constructor;
};

module.exports = createJavaComponentClass;
