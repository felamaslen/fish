/**
 * Tanks component
 */

import { List as list } from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import PureControllerView from './PureControllerView';
import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  ButtonGroup, Button
} from 'reactstrap';
import { aTanksRequested } from '../actions/TanksActions';

export class Tanks extends PureControllerView {
  componentWillMount() {
    this.dispatchAction(aTanksRequested());
  }
  render() {
    return (
      <div className='tanks'>
        <h4>Tanks</h4>
        <ListGroup>
        {this.props.tanks.map((tank, key) => {
          return (
            <ListGroupItem key={key} active={this.props.activeTank === key}>
              <ListGroupItemHeading>
                <span>{tank.get('name')} </span>
                <ButtonGroup>
                  <Button color='info'>Edit</Button>
                  <Button color='danger'>Delete</Button>
                </ButtonGroup>
              </ListGroupItemHeading>
              <ListGroupItemText>
                <span>Volume:</span>
                <span>{tank.get('volume')}</span>
              </ListGroupItemText>
            </ListGroupItem>
          );
        })}
        </ListGroup>
      </div>
    );
  }
}

Tanks.propTypes = {
  tanks: PropTypes.instanceOf(list),
  activeTank: PropTypes.number
};

