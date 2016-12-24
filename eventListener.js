var EventListener = {
  isEventName(name) {
    return /^on/.test(name);
  },
  add(nativeComponent, name, handler) {
    // TODO handle this in a better way
    if (name === 'onClick') {
      nativeComponent.addMouseListener(new java.awt.event.MouseAdapter({
        mouseClicked: handle
      }));
    } else if (name === 'onChange') {
      nativeComponent.document.addDocumentListener(new javax.swing.event.DocumentListener({
        insertUpdate: handler,
        removeUpdate: handler,
        changedUpdate: () => { }
      }));
    }
  },
  remove() {
    // TODO
  }
};

module.exports = EventListener;
