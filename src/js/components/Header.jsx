/**
 * React component to display a simple header at the top of the page
 */

import React from 'react';
import PureControllerView from './PureControllerView';
import { Navbar, NavbarBrand } from 'reactstrap';
import { APP_TITLE } from '../config';

export class Header extends PureControllerView {
  render() {
    return (
      <Navbar color='faded' light>
        <NavbarBrand href='.'>{APP_TITLE}</NavbarBrand>
      </Navbar>
    );
  }
}
