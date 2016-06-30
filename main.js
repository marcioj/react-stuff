require('./polyfill');

var React = require('react');
var render = require('./mount');
var createJavaComponentClass = require('./createJavaComponentClass');

var JFrame = createJavaComponentClass({
  javaClass: javax.swing.JFrame,
  setupNativeComponent: function (nativeComponent) {
    nativeComponent.setLayout(new java.awt.FlowLayout());
    nativeComponent.setDefaultCloseOperation(javax.swing.JFrame.EXIT_ON_CLOSE);
    nativeComponent.pack();
    nativeComponent.setVisible(true);
    nativeComponent.setLocationRelativeTo(null);
  }
});

// TODO should this be a text component?
var JLabel = createJavaComponentClass({
  javaClass: javax.swing.JLabel
});

var JButton = createJavaComponentClass({
  javaClass: javax.swing.JButton
});

var App = React.createClass({
  getInitialState() {
    return {
      msg1: 'Hello',
      msg2: 'world'
    };
  },
  showDialog(msg) {
    javax.swing.JOptionPane.showMessageDialog(null, 'you clicked in ' + msg);
  },
  render() {
    return (
      <JFrame>
        <JLabel text={this.state.msg1} onclick={this.showDialog.bind(null, this.state.msg1)} />
        <JLabel text={this.state.msg2} onclick={this.showDialog.bind(null, this.state.msg2)} />
        <JButton text={this.state.msg2} />
      </JFrame>
    )
  }
});

render(<App />);
