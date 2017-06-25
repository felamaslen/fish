/**
 * This is run whenever an action is called by a view, and decides which
 * reducer to run based on the action given.
 */

import {
  TANKS_REQUESTED, TANKS_RECEIVED,

  TANK_EDIT_MODAL_OPENED, TANK_EDIT_MODAL_EDITED,
  TANK_EDIT_MODAL_REMOVED,

  TANK_EDIT_REQUESTED,
  TANK_RECEIVED,
  TANK_DELETE_REQUESTED, TANK_DELETE_RECEIVED
} from '../constants/actions';

import {
  rRequestTanks, rReceiveTanks,
  rTankEditModalOpen, rTankEditModalEdit, rTankEditModalRemove,
  rRequestEditTank, rReceiveTank,
  rRequestDeleteTank, rReceiveDeleteTank
} from './TanksReducer';

export default (reduction, action) => {
  switch (action.type) {
  case TANKS_REQUESTED:
    return rRequestTanks(reduction);
  case TANKS_RECEIVED:
    return rReceiveTanks(reduction, action.payload);

  case TANK_EDIT_MODAL_OPENED:
    return rTankEditModalOpen(reduction, action.payload);
  case TANK_EDIT_MODAL_EDITED:
    return rTankEditModalEdit(reduction, action.payload);
  case TANK_EDIT_MODAL_REMOVED:
    return rTankEditModalRemove(reduction);

  case TANK_EDIT_REQUESTED:
    return rRequestEditTank(reduction);
  case TANK_RECEIVED:
    return rReceiveTank(reduction, action.payload);
  case TANK_DELETE_REQUESTED:
    return rRequestDeleteTank(reduction, action.payload);
  case TANK_DELETE_RECEIVED:
    return rReceiveDeleteTank(reduction, action.payload);

  default:
    // By default, the reduction is simply returned unchanged.
    return reduction;
  }
};

