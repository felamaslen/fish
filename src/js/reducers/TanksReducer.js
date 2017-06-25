/**
 * Tanks reducers
 */

import { List as list, Map as map } from 'immutable';
import buildMessage from '../messageBuilder';
import {
  EF_API_LIST_TANKS, EF_API_EDIT_TANK, EF_API_DELETE_TANK
} from '../constants/effects';

export const rRequestTanks = reduction => {
  return reduction.set('effects', reduction.get('effects').push(
    buildMessage(EF_API_LIST_TANKS)
  ));
};
export const rReceiveTanks = (reduction, response) => {
  if (response.error) {
    return reduction;
  }
  return reduction
  .setIn(['appState', 'tanks', 'list'], list(response.data.tanks).map(tank => map(tank)))
  .setIn(['appState', 'tanks', 'active'], -1);
};

export const rTankEditModalOpen = (reduction, id) => {
  let editing = null;
  if (id) {
    editing = reduction
    .getIn(['appState', 'tanks', 'list'])
    .find(tank => tank.get('id') === id);
  }
  else {
    editing = map({
      id: null,
      name: '',
      volume: 0
    });
  }
  return reduction.setIn(['appState', 'tanks', 'editing'], editing);
};
export const rTankEditModalEdit = (reduction, props) => {
  let newEditing = reduction.getIn(['appState', 'tanks', 'editing']);
  for (const prop in props) {
    newEditing = newEditing.set(prop, props[prop]);
  }
  return reduction.setIn(['appState', 'tanks', 'editing'], newEditing);
};
export const rTankEditModalRemove = reduction => {
  return reduction.setIn(['appState', 'tanks', 'editing'], map.of());
};

export const rRequestEditTank = reduction => {
  return reduction
  .set('effects', reduction.get('effects').push(
    buildMessage(EF_API_EDIT_TANK, reduction.getIn(['appState', 'tanks', 'editing']))
  ));
};

export const rReceiveTank = (reduction, tank) => {
  const oldTanks = reduction.getIn(['appState', 'tanks', 'list']);
  const tankKey = oldTanks.findIndex(item => item.get('id') === tank.get('id'));
  let newTanks;
  if (tankKey > -1) {
    newTanks = oldTanks.set(tankKey, tank);
  }
  else {
    newTanks = oldTanks.push(tank);
  }
  return reduction
  .setIn(['appState', 'tanks', 'editing'], map.of())
  .setIn(['appState', 'tanks', 'list'], newTanks);
};

export const rRequestDeleteTank = (reduction, id) => {
  return reduction
  .set('effects', reduction.get('effects').push(
    buildMessage(EF_API_DELETE_TANK, id)
  ));
};
export const rReceiveDeleteTank = (reduction, id) => {
  const oldTanks = reduction.getIn(['appState', 'tanks', 'list']);
  const newTanks = oldTanks.delete(oldTanks.findIndex(tank => tank.get('id') === id));
  return reduction.setIn(['appState', 'tanks', 'list'], newTanks);
};

