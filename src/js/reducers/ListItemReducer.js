/**
 * ListItems reducers
 */

import { List as list, Map as map } from 'immutable';
import buildMessage from '../messageBuilder';
import {
  EF_API_LIST_LIST_ITEMS, EF_API_EDIT_LIST_ITEM, EF_API_DELETE_LIST_ITEM
} from '../constants/effects';

export const rRequestListItems = (reduction, table) => {
  if (reduction.getIn(['appState', 'loading'])) {
    return reduction;
  }
  return reduction
  .setIn(['appState', 'loading'], true)
  .set('effects', reduction.get('effects').push(
    buildMessage(EF_API_LIST_LIST_ITEMS, { table })
  ));
};
export const rReceiveListItems = (reduction, res) => {
  return reduction
  .setIn(['appState', 'loading'], false)
  .setIn(
    ['appState', res.table, 'list'],
    list(res.response.data[res.table]).map(item => map(item))
  )
  .setIn(['appState', res.table, 'active'], -1);
};

export const rListItemEditModalOpen = (reduction, res) => {
  let editing = null;
  if (res.id) {
    editing = reduction
    .getIn(['appState', res.table, 'list'])
    .find(item => item.get('id') === res.id);
  }
  else {
    editing = map(reduction.getIn(['appState', res.table, 'props']).map(item => {
      return [item.get('key'), item.get('defaultValue')(reduction)];
    })).set('id', null);
  }
  return reduction.setIn(['appState', res.table, 'editing'], editing);
};
export const rListItemEditModalEdit = (reduction, res) => {
  let newEditing = reduction.getIn(['appState', res.table, 'editing']);
  for (const prop in res.props) {
    newEditing = newEditing.set(prop, res.props[prop]);
  }
  return reduction.setIn(['appState', res.table, 'editing'], newEditing);
};
export const rListItemEditModalRemove = (reduction, table) => {
  return reduction.setIn(['appState', table, 'editing'], map.of());
};

export const rRequestEditListItem = (reduction, table) => {
  if (reduction.getIn(['appState', 'loading'])) {
    return reduction;
  }
  return reduction
  .setIn(['appState', 'loading'], true)
  .set('effects', reduction.get('effects').push(
    buildMessage(EF_API_EDIT_LIST_ITEM, {
      item: reduction.getIn(['appState', table, 'editing']),
      table
    })
  ));
};

export const rReceiveListItem = (reduction, res) => {
  const oldListItems = reduction.getIn(['appState', res.table, 'list']);
  const itemKey = oldListItems.findIndex(item => item.get('id') === res.item.get('id'));
  let newListItems;
  if (itemKey > -1) {
    newListItems = oldListItems.set(itemKey, res.item);
  }
  else {
    newListItems = oldListItems.push(res.item);
  }
  return reduction
  .setIn(['appState', 'loading'], false)
  .setIn(['appState', res.table, 'editing'], map.of())
  .setIn(['appState', res.table, 'list'], newListItems);
};

export const rRequestDeleteListItem = (reduction, res) => {
  if (reduction.getIn(['appState', 'loading'])) {
    return reduction;
  }
  return reduction
  .setIn(['appState', 'loading'], true)
  .set('effects', reduction.get('effects').push(
    buildMessage(EF_API_DELETE_LIST_ITEM, res)
  ));
};
export const rReceiveDeleteListItem = (reduction, res) => {
  let newReduction = reduction;
  const oldListItems = reduction.getIn(['appState', res.table, 'list']);
  const newListItems = oldListItems.delete(oldListItems.findIndex(item => item.get('id') === res.id));
  const oldActive = reduction.getIn(['appState', res.table, 'active']);

  if (res.table === 'tanks' && (
    oldActive > -1 && oldListItems.getIn([oldActive, 'id']) === res.id
  )) {
    newReduction = newReduction.setIn(['appState', 'water'], list.of());
  }

  return newReduction
  .setIn(['appState', 'loading'], false)
  .setIn(['appState', res.table, 'active'], -1)
  .setIn(['appState', res.table, 'list'], newListItems);
};

