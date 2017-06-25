/**
 * This is run whenever an action is called by a view, and decides which
 * reducer to run based on the action given.
 */

import {
  TANKS_REQUESTED, TANKS_RECEIVED
} from '../constants/actions';

import {
  rRequestTanks, rReceiveTanks
} from './TanksReducer';

export default (reduction, action) => {
  switch (action.type) {
  case TANKS_REQUESTED:
    return rRequestTanks(reduction);
  case TANKS_RECEIVED:
    return rReceiveTanks(reduction, action.payload);

  default:
    // By default, the reduction is simply returned unchanged.
    return reduction;
  }
};

