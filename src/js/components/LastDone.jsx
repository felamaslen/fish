/**
 * Component for a "last done" item, e.g. last feed
 */

import React from 'react';
import PropTypes from 'prop-types';
import PureControllerView from './PureControllerView';
import { Button } from 'reactstrap';
import { aLastDoneUpdated } from '../actions/LastActions';

export class LastDone extends PureControllerView {
  render() {
    if (!this.props.tankId) {
      return null;
    }

    let value;
    if (this.props.value) {
      value = this.props.value;
    }
    else {
      value = 'Never! O.o';
    }

    return (
      <div>
        <h4>{this.props.title}</h4>
        <p>{value}</p>
        <p>
          <Button color='info' onClick={() => {
            this.dispatchAction(aLastDoneUpdated(this.props.item, this.props.tankId));
          }}>Update</Button>
        </p>
      </div>
    );
  }
}

LastDone.propTypes = {
  item: PropTypes.string,
  tankId: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};

