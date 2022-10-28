import React from 'react';
import ReactDOM from 'react-dom/client';
import FCA from './fca.js';

import './css/styles.css';
import './css/global.css';
import './css/auth.css';
import './font/font.css';
import './css/loading.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FCA/>
  </React.StrictMode>
);
