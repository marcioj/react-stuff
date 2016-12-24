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

var JTextField = createJavaComponentClass({
  javaClass: javax.swing.JTextField
});

function alert(msg) {
  javax.swing.JOptionPane.showMessageDialog(null, msg);
}

var App = React.createClass({
  getInitialState() {
    return {
      msg: 'Hello',
    };
  },
  updateText() {
    this.setState({ msg: this.refs.textField.text });
  },
  render() {
    return (
      <JFrame>
        <JLabel text={this.state.msg} />
        <JTextField text={this.state.msg} ref="textField" onChange={this.updateText.bind(this)} />
        <JButton text={this.state.msg} />
      </JFrame>
    )
  }
});

render(<App />);
