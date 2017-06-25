/**
 * Tanks component
 */

import { List as list, Map as map } from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import PureControllerView from './PureControllerView';
import {
  ListGroup, ListGroupItem,
  ButtonGroup, Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Col
} from 'reactstrap';
import {
  aTanksRequested,
  aTankEditModalOpened, aTankEditModalEdited, aTankEditModalRemoved,
  aTankEditRequested, aTankDeleteRequested
} from '../actions/TanksActions';

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
            <ListGroupItem key={tank.get('id')} active={this.props.activeTank === key}>
              <h5 className='item-list-title'>
                <span>{tank.get('name')}</span>
                <ButtonGroup>
                  <Button color='info' onClick={() => {
                    this.dispatchAction(aTankEditModalOpened(tank.get('id')));
                  }}>Edit</Button>
                  <Button color='danger' onClick={() => {
                    this.dispatchAction(aTankDeleteRequested(tank.get('id')));
                  }}>Delete</Button>
                </ButtonGroup>
              </h5>
              <div>
                <div>
                  <span>Volume:</span>
                  <span>{tank.get('volume')}</span>
                </div>
              </div>
            </ListGroupItem>
          );
        })}
        </ListGroup>
        <Button color='info' onClick={() => {
          this.dispatchAction(aTankEditModalOpened(null));
        }}>Add tank</Button>
        <Modal isOpen={this.props.editing.size > 0}
          toggle={() => this.dispatchAction(aTankEditModalRemoved())}>
          <ModalHeader>
            <span>Editing tank #{this.props.editing.get('id')}</span>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for='name' sm={2}>Name</Label>
                <Col sm={10}>
                  <Input value={this.props.editing.get('name')} onChange={evt => {
                    this.dispatchAction(aTankEditModalEdited({ name: evt.target.value }));
                  }} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='volume' sm={2}>Volume</Label>
                <Col sm={10}>
                  <Input value={this.props.editing.get('volume')} onChange={evt => {
                    this.dispatchAction(aTankEditModalEdited({ volume: evt.target.value }));
                  }} type='number' step='1' />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={() => {
              this.dispatchAction(aTankEditModalRemoved());
            }}>nope.avi</Button>
            <Button color='primary' onClick={() => {
              this.dispatchAction(aTankEditRequested());
            }}>Do et</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Tanks.propTypes = {
  tanks: PropTypes.instanceOf(list),
  activeTank: PropTypes.number,
  editing: PropTypes.instanceOf(map)
};

