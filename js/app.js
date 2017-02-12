var React = require('react');
var Render = require('react-dom').render;

var LoginApp = require('./components/LoginApp.react.js');


// Render FluxApp Controller View
Render(
  <LoginApp />,
  document.getElementById('main')
);
