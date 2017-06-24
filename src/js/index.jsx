/**
 * This is the entry point for the client app
 */

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

if (process.env.NODE_ENV !== 'test') {
  render(
    <App />,
    document.getElementById('root')
  );
}

