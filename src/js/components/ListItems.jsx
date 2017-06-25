/**
 * List items component
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
  aListItemsRequested,
  aListItemEditModalOpened, aListItemEditModalEdited, aListItemEditModalRemoved,
  aListItemEditRequested, aListItemDeleteRequested
} from '../actions/ListItemActions';

export class ListItems extends PureControllerView {
  listItemClick() {
    return null;
  }
  addButtonClick() {
    this.dispatchAction(this.actionModalOpened(null));
  }
  actionRequestItems() {
    return aListItemsRequested(this.props.table);
  }
  actionModalOpened(id) {
    return aListItemEditModalOpened(this.props.table, id);
  }
  actionModalClosed() {
    return aListItemEditModalRemoved(this.props.table);
  }
  actionModalEdited(props) {
    return aListItemEditModalEdited(this.props.table, props);
  }
  actionItemEdited() {
    return aListItemEditRequested(this.props.table);
  }
  actionItemDeleted(id) {
    return aListItemDeleteRequested(this.props.table, id);
  }
  getItemTitle() {
    return null;
  }
  render() {
    let modalHeaderText = '';
    if (this.props.editing.get('id')) {
      modalHeaderText = `Editing ${this.props.table} #${this.props.editing.get('id')}`;
    }
    else {
      modalHeaderText = `Adding item to ${this.props.table}`;
    }

    return (
      <div className={this.props.table}>
        <h4>{this.props.title}</h4>
        <ListGroup>
        {this.props.items.map((item, key) => {
          return (
            <ListGroupItem onClick={() => this.listItemClick(key)}
              key={item.get('id')} active={this.props.activeItem === key}>
              <h5 className='item-list-title'>
                <span>{this.getItemTitle(item)}</span>
                <ButtonGroup>
                  <Button color='info' onClick={evt => {
                    this.dispatchAction(this.actionModalOpened(item.get('id')));
                    evt.stopPropagation();
                  }}>Edit</Button>
                  <Button color='danger' onClick={evt => {
                    this.dispatchAction(this.actionItemDeleted(item.get('id')));
                    evt.stopPropagation();
                  }}>Delete</Button>
                </ButtonGroup>
              </h5>
              <div>
                <ul>
                {this.props.props.filter(prop => !prop.get('noList')).map((prop, propKey) => {
                  return <li key={propKey}>
                    {prop.get('name')}: {item.get(prop.get('key')).toString()}
                  </li>;
                })}
                </ul>
              </div>
            </ListGroupItem>
          );
        })}
        </ListGroup>
        <Button color='info' onClick={() => {
          this.addButtonClick();
        }}>Add {this.props.table}</Button>
        <Modal isOpen={this.props.editing.size > 0}
          toggle={() => this.dispatchAction(this.actionModalClosed())}>
          <ModalHeader>{modalHeaderText}</ModalHeader>
          <ModalBody>
            <Form>
              {this.props.props.map((prop, propKey) => {
                return (
                  <FormGroup key={propKey} row>
                    <Label for={prop.get('key')} sm={3}>{prop.get('name')}</Label>
                    <Col sm={9}>
                      <Input {...prop.get('inputProps').toJS()} onChange={evt => {
                        this.dispatchAction(this.actionModalEdited({ [prop.get('key')]: evt.target.value }));
                      }} name={prop.get('key')} value={this.props.editing.get(prop.get('key'))} />
                    </Col>
                  </FormGroup>
                );
              })}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={() => {
              this.dispatchAction(this.actionModalClosed());
            }}>nope.avi</Button>
            <Button color='primary' onClick={() => {
              this.dispatchAction(this.actionItemEdited());
            }}>Do et</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ListItems.propTypes = {
  table: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.instanceOf(list),
  activeItem: PropTypes.number,
  editing: PropTypes.instanceOf(map),
  props: PropTypes.instanceOf(list)
};

