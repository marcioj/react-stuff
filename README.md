# react-java

The goal of this project is make this code

```js
const JFrame = javax.swing.JFrame
const JLabel = javax.swing.JLabel

javax.swing.SwingUtilities.invokeLater({
  run: function() {
    let frame = new JFrame("HelloWorldSwing");
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    //Add the ubiquitous "Hello World" label.
    let label = new JLabel("Hello World");
    frame.getContentPane().add(label);

    //Display the window.
    frame.pack();
    frame.setVisible(true);
    frame.setLocationRelativeTo(null);
  }
});
```

run in this way

```jsx
import { JFrame, JLabel, invokeLater } from 'react-java';
import React from 'react';

let App = React.createClass({
  render() {
    <JFrame>
      <JLabel>Hello World</JLabel>
    </JFrame>
  }
})

invokeLater(<App/>);
```
