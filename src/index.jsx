import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import Window from './window/Window';

ReactDOM.render(
  <Window />,
  document.getElementById('app'),
);

module.hot.accept();
