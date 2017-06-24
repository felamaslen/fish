/**
 * React component to display a simple header at the top of the page
 */

import React from 'react';
import PureControllerView from './PureControllerView';
import { APP_TITLE } from '../config';

export class Header extends PureControllerView {
  render() {
    return (
      <div id="header">
        <h1>{APP_TITLE}</h1>
      </div>
    );
  }
}
