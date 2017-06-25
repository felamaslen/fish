/**
 * Tanks component
 */

import { List as list } from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import PureControllerView from './PureControllerView';
import { aTanksRequested } from '../actions/TanksActions';

export class Tanks extends PureControllerView {
  componentWillMount() {
    this.dispatchAction(aTanksRequested());
  }
  render() {
    return (
      <div className='tanks'>
        <ul>
        {this.props.tanks.map((tank, key) => {
          return (
            <li key={key}>
              <h4>{tank.get('name')}</h4>
              <div className='properties'>
                <ul>
                  <li>
                    <span>Volume:</span>
                    <span>{tank.get('volume')}</span>
                  </li>
                </ul>
              </div>
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
}

Tanks.propTypes = {
  tanks: PropTypes.instanceOf(list)
};

