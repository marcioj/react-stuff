var JFrame = javax.swing.JFrame
var JLabel = javax.swing.JLabel
var JOptionPane = javax.swing.JOptionPane
var MouseAdapter = java.awt.event.MouseAdapter

javax.swing.SwingUtilities.invokeLater(function() {
  var frame = new JFrame("HelloWorldSwing");
  frame.setLayout(new java.awt.FlowLayout())
  frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

  //Add the ubiquitous "Hello World" label.
  var label1 = new JLabel("Hello");
  label1.addMouseListener(new MouseAdapter({
    mouseClicked: function () {
      JOptionPane.showMessageDialog(null, 'hello');
    }
  }))
  frame.add(label1);

  var label2 = new JLabel("World");
  label2.addMouseListener(new MouseAdapter({
    mouseClicked: function () {
      JOptionPane.showMessageDialog(null, 'hello');
    }
  }))
  frame.add(label2);

  //Display the window.
  frame.pack();
  frame.setVisible(true);
  frame.setLocationRelativeTo(null);
});
