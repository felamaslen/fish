/**
 * Tank actions
 */

import buildMessage from '../messageBuilder';

import {
  TANKS_REQUESTED, TANKS_RECEIVED,

  TANK_EDIT_MODAL_OPENED, TANK_EDIT_MODAL_EDITED,
  TANK_EDIT_MODAL_REMOVED,

  TANK_EDIT_REQUESTED, TANK_RECEIVED,
  TANK_DELETE_REQUESTED, TANK_DELETE_RECEIVED
} from '../constants/actions';

export const aTanksRequested = () => buildMessage(TANKS_REQUESTED);
export const aTanksReceived = response => buildMessage(TANKS_RECEIVED, response);

export const aTankEditModalOpened = id => buildMessage(TANK_EDIT_MODAL_OPENED, id);
export const aTankEditModalEdited = props => buildMessage(TANK_EDIT_MODAL_EDITED, props);
export const aTankEditModalRemoved = () => buildMessage(TANK_EDIT_MODAL_REMOVED);

export const aTankEditRequested = () => buildMessage(TANK_EDIT_REQUESTED);
export const aTankReceived = tank => buildMessage(TANK_RECEIVED, tank);
export const aTankDeleteRequested = id => buildMessage(TANK_DELETE_REQUESTED, id);
export const aTankDeleteReceived = id => buildMessage(TANK_DELETE_RECEIVED, id);

